#!/usr/bin/env python3
"""
Google Indexing API를 사용한 자동 색인 등록 스크립트
GitHub Actions용으로 최적화됨
"""

import os
import json
import random
import time
import requests
from datetime import datetime
from typing import List, Dict, Any
import xml.etree.ElementTree as ET
from google.oauth2 import service_account
from googleapiclient.discovery import build
import logging

# 로깅 설정
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


class GoogleIndexingManager:
    def __init__(self, sitemap_urls: List[str]):
        self.sitemap_urls = sitemap_urls
        self.service = None
        self.credentials = None

    def setup_credentials(self) -> bool:
        """환경변수에서 Google 서비스 계정 인증 정보 설정"""
        try:
            # GitHub Secrets에서 JSON 키 가져오기
            service_account_json = os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON")

            if not service_account_json:
                logger.error(
                    "GOOGLE_SERVICE_ACCOUNT_JSON 환경변수가 설정되지 않았습니다."
                )
                return False

            # JSON 문자열을 딕셔너리로 파싱
            credentials_info = json.loads(service_account_json)

            # 서비스 계정 인증 정보 생성
            self.credentials = service_account.Credentials.from_service_account_info(
                credentials_info, scopes=["https://www.googleapis.com/auth/indexing"]
            )

            # Google Indexing API 서비스 생성
            self.service = build("indexing", "v3", credentials=self.credentials)

            logger.info("✓ Google API 인증 완료")
            return True

        except json.JSONDecodeError as e:
            logger.error(f"JSON 파싱 오류: {e}")
            return False
        except Exception as e:
            logger.error(f"인증 설정 실패: {e}")
            return False

    def fetch_sitemap_urls(self) -> List[str]:
        """여러 Sitemap에서 URL들을 추출하여 합치기"""
        all_urls = []

        for i, sitemap_url in enumerate(self.sitemap_urls, 1):
            try:
                logger.info(
                    f"Sitemap {i}/{len(self.sitemap_urls)} 가져오는 중: {sitemap_url}"
                )

                response = requests.get(sitemap_url, timeout=30)
                response.raise_for_status()

                # XML 파싱
                root = ET.fromstring(response.content)

                # 네임스페이스 처리
                namespace = {"ns": "http://www.sitemaps.org/schemas/sitemap/0.9"}

                sitemap_urls = []
                for url_element in root.findall(".//ns:url", namespace):
                    loc_element = url_element.find("ns:loc", namespace)
                    if loc_element is not None and loc_element.text:
                        sitemap_urls.append(loc_element.text.strip())

                all_urls.extend(sitemap_urls)
                logger.info(
                    f"✓ Sitemap {i}에서 {len(sitemap_urls)}개의 URL을 찾았습니다."
                )

            except requests.RequestException as e:
                logger.error(f"Sitemap {i} 가져오기 실패 ({sitemap_url}): {e}")
                continue
            except ET.ParseError as e:
                logger.error(f"Sitemap {i} XML 파싱 실패 ({sitemap_url}): {e}")
                continue
            except Exception as e:
                logger.error(
                    f"Sitemap {i} 처리 중 예상치 못한 오류 ({sitemap_url}): {e}"
                )
                continue

        # 중복 제거
        unique_urls = list(set(all_urls))
        logger.info(
            f"✓ 총 {len(all_urls)}개의 URL을 찾았고, 중복 제거 후 {len(unique_urls)}개의 고유 URL이 있습니다."
        )

        # 샘플 URL 로그
        if unique_urls:
            logger.info("샘플 URL들:")
            for i, url in enumerate(unique_urls[:3]):
                logger.info(f"  {i+1}: {url}")
            if len(unique_urls) > 3:
                logger.info(f"  ... 그리고 {len(unique_urls)-3}개 더")

        return unique_urls

    def select_random_urls(self, urls: List[str], count: int = 200) -> List[str]:
        """랜덤하게 지정된 개수만큼 URL 선택"""
        if not urls:
            return []

        # 요청할 URL 개수 결정
        actual_count = min(count, len(urls))

        # 랜덤 선택
        selected_urls = random.sample(urls, actual_count)

        logger.info(f"✓ {len(selected_urls)}개의 URL을 랜덤 선택했습니다.")
        return selected_urls

    def submit_url_for_indexing(self, url: str) -> Dict[str, Any]:
        """단일 URL을 색인 요청"""
        try:
            request_body = {"url": url, "type": "URL_UPDATED"}

            response = (
                self.service.urlNotifications().publish(body=request_body).execute()
            )

            return {"success": True, "url": url, "response": response}

        except Exception as e:
            logger.error(f"URL 색인 요청 실패 ({url}): {e}")
            return {"success": False, "url": url, "error": str(e)}

    def batch_submit_urls(
        self, urls: List[str], delay_seconds: float = 1.0
    ) -> Dict[str, Any]:
        """배치로 URL들을 색인 요청"""
        if not urls:
            return {
                "total": 0,
                "successful": 0,
                "failed": 0,
                "success_urls": [],
                "failed_urls": [],
            }

        logger.info(f"🚀 {len(urls)}개 URL의 색인 요청을 시작합니다...")

        results = {
            "total": len(urls),
            "successful": 0,
            "failed": 0,
            "success_urls": [],
            "failed_urls": [],
        }

        for i, url in enumerate(urls, 1):
            logger.info(f"[{i}/{len(urls)}] 처리 중: {url}")

            result = self.submit_url_for_indexing(url)

            if result["success"]:
                results["successful"] += 1
                results["success_urls"].append(url)
                logger.info("  ✓ 성공")
            else:
                results["failed"] += 1
                results["failed_urls"].append({"url": url, "error": result["error"]})
                logger.info(f"  ❌ 실패: {result['error']}")

            # API 제한을 위한 지연 (마지막 요청 제외)
            if i < len(urls):
                time.sleep(delay_seconds)

        return results

    def generate_summary_report(self, results: Dict[str, Any]) -> None:
        """결과 요약 보고서 출력"""
        success_rate = (
            (results["successful"] / results["total"] * 100)
            if results["total"] > 0
            else 0
        )

        print(f"\n{'='*50}")
        print("📊 색인 요청 결과 요약")
        print(f"{'='*50}")
        print(f"전체 URL 수:    {results['total']:>3}개")
        print(f"성공:          {results['successful']:>3}개")
        print(f"실패:          {results['failed']:>3}개")
        print(f"성공률:        {success_rate:>6.1f}%")
        print(f"{'='*50}")

        if results["failed_urls"]:
            print("\n❌ 실패한 URL들:")
            for failed in results["failed_urls"]:
                print(f"  • {failed['url']}")
                print(f"    오류: {failed['error']}")

        # GitHub Actions 환경에서 결과를 환경변수로 설정
        if os.environ.get("GITHUB_ACTIONS"):
            print(f"::set-output name=total::{results['total']}")
            print(f"::set-output name=successful::{results['successful']}")
            print(f"::set-output name=failed::{results['failed']}")
            print(f"::set-output name=success_rate::{success_rate:.1f}")

    def run(self, max_urls: int = 200, delay_seconds: float = 1.0) -> bool:
        """메인 실행 함수"""
        try:
            print("🔍 Google 색인 API 자동 등록을 시작합니다...\n")

            # 1. 인증 설정
            if not self.setup_credentials():
                return False

            # 2. Sitemap에서 URL 추출
            all_urls = self.fetch_sitemap_urls()
            if not all_urls:
                logger.error("사용 가능한 URL이 없습니다.")
                return False

            # 3. 랜덤 URL 선택
            selected_urls = self.select_random_urls(all_urls, max_urls)
            if not selected_urls:
                logger.error("선택된 URL이 없습니다.")
                return False

            # 4. 배치 색인 요청
            results = self.batch_submit_urls(selected_urls, delay_seconds)

            # 5. 결과 보고서
            self.generate_summary_report(results)

            print("\n🎉 색인 등록 작업이 완료되었습니다!")

            # 성공한 URL이 하나라도 있으면 성공으로 간주
            return results["successful"] > 0

        except Exception as e:
            logger.error(f"실행 중 오류 발생: {e}")
            return False


def main():
    """메인 함수"""
    # 설정값들
    SITEMAP_URLS = [
        "https://secrett2633.github.io/sitemaps/1.xml",
        "https://secrett2633.github.io/sitemaps/2.xml",
        "https://secrett2633.github.io/sitemaps/3.xml",
        "https://secrett2633.github.io/sitemaps/4.xml",
    ]
    MAX_URLS = int(os.environ.get("MAX_URLS", "200"))
    DELAY_SECONDS = float(os.environ.get("DELAY_SECONDS", "1.0"))

    logger.info(
        f"설정 - SITEMAP_URLS: {len(SITEMAP_URLS)}개, MAX_URLS: {MAX_URLS}, DELAY_SECONDS: {DELAY_SECONDS}"
    )

    # Google Indexing Manager 실행
    manager = GoogleIndexingManager(SITEMAP_URLS)
    success = manager.run(MAX_URLS, DELAY_SECONDS)

    # 종료 코드 반환 (GitHub Actions에서 성공/실패 판단용)
    exit_code = 0 if success else 1
    exit(exit_code)


if __name__ == "__main__":
    main()
