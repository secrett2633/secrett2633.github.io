import os
import re
import time
import traceback
from datetime import datetime
from typing import List, Dict, Any, Set
from urllib.parse import urljoin
from tenacity import retry, stop_after_attempt, wait_random, retry_if_exception_type
import requests
from bs4 import BeautifulSoup
from google import genai
from google.genai.types import GenerateContentConfig


# --- API 키 및 클라이언트 설정 ---
# 실행 전 환경변수 `GEMINI_API_KEY`를 설정해주세요.
if "GEMINI_API_KEY" not in os.environ:
    raise ValueError("GEMINI_API_KEY 환경변수가 설정되지 않았습니다.")

# API와 상호작용하기 위한 클라이언트 인스턴스 생성
client = genai.Client()

# --- 템플릿 및 프롬프트 정의 ---
# Jekyll 포스트 템플릿
CONTENT_TEMPLATE = """
---
title: "[{status}] PEP {pep_number} - {title}"
excerpt: "Python Enhancement Proposal {pep_number}: '{title}'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/{pep_number}/
toc: true
toc_sticky: true
date: {date_str}+0900
last_modified_at: {date_str}+0900
published: true
---
> **원문 링크:** [PEP {pep_number} - {title}]({link})
>
> **상태:** {status} | **유형:** {type} | **작성일:** {created}

{content}

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.
"""

# PEP 번역 프롬프트 (URL이 프롬프트 내에 제공될 것을 명시)
PEP_TRANSLATION_PROMPT = """
당신은 숙련된 Python 개발자이자 전문 기술 번역가입니다.
이어지는 메시지에 포함된 Python Enhancement Proposal (PEP) 문서 URL의 내용을 바탕으로, 한국어 사용자가 이해하기 쉽게 번역해주세요.

## 목표
Python 개발자들이 이 PEP의 제안 내용, 도입 배경, 그리고 실제 Python 사용에 미치는 영향을 명확하게 이해할 수 있도록 돕는 것입니다.

## 번역 및 작성 지침
1. **전문성 유지:** Python 생태계에서 통용되는 전문 용어를 정확하게 사용하세요.
2. **용어 처리:**
   - 널리 쓰이는 한국어 용어가 있다면 사용합니다.
   - 모호하거나 한국어보다 영어가 더 익숙한 용어는 영어 원문을 그대로 사용하거나 병기합니다. (예: `List Comprehension`, `Generator (제너레이터)`)
   - 코드 내의 키워드(예: `async`, `await`, `class`, `def`)나 변수명은 절대 번역하지 마세요.
3. **가독성:** 마크다운을 적극 활용하여 구조적으로 정리해주세요.
4. **번역 정확성:** 번역 정확성을 보장하기 위해 원문 내용을 빠짐없이 마크다운 형태로 번역해주세요.
"""


@retry(
    stop=stop_after_attempt(20),
    wait=wait_random(min=1, max=2),
    retry=retry_if_exception_type(Exception),
    reraise=True,
)
def fetch_pep_metadata(pep_url: str) -> Dict[str, Any]:
    """파일 생성을 위해 PEP의 제목, 번호 등 메타데이터만 스크래핑합니다."""
    print(f"Fetching metadata from: {pep_url}...")
    # ... (이전 코드와 동일, 변경 없음)
    response = requests.get(pep_url)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")
    pep_number_match = re.search(r"pep-(\d{4})", pep_url)
    pep_number = int(pep_number_match.group(1)) if pep_number_match else 0
    title_tag = soup.find("h1", class_="page-title")
    full_title = title_tag.get_text(strip=True) if title_tag else f"PEP {pep_number}"
    parts = full_title.split("–", 1)
    title = parts[1].strip() if len(parts) > 1 else full_title
    header_info = {}
    dl = soup.find("dl", class_="rfc2822 field-list simple")
    if dl:
        for dt, dd in zip(dl.find_all("dt"), dl.find_all("dd")):
            key = dt.get_text(strip=True).replace(":", "")
            value = dd.get_text(strip=True)
            header_info[key] = value
    return {
        "pep_number": pep_number,
        "url": pep_url,
        "title": title,
        "header": header_info,
    }


@retry(
    stop=stop_after_attempt(20),
    wait=wait_random(min=1, max=2),
    retry=retry_if_exception_type(Exception),
    reraise=True,
)
def translate_pep_with_url_context_tool(pep_url: str, model_name: str) -> str:
    """공식 문서의 'url_context' 도구를 사용하여 PEP 내용을 번역 및 정리합니다."""

    # 1. 사용할 도구를 정의합니다.
    tools = [{"url_context": {}}]

    # 2. 도구 설정을 포함하는 GenerateContentConfig 객체를 생성합니다.
    config = GenerateContentConfig(tools=tools)

    # 3. 프롬프트와 번역할 URL을 하나의 문자열로 결합합니다.
    # 모델은 이 문자열 내의 URL을 인식하고 'url_context' 도구를 사용하여 콘텐츠를 가져옵니다.
    full_prompt_with_url = (
        f"{PEP_TRANSLATION_PROMPT}\n\n"
        f"--- 아래 URL의 내용을 번역하고 정리해주세요 ---\n"
        f"{pep_url}"
    )

    print(f"Translating with url_context tool: {pep_url} using {model_name}...")

    # 4. client.models.generate_content를 사용하여 API를 호출합니다.
    response = client.models.generate_content(
        model=model_name,
        contents=full_prompt_with_url,
        config=config,
    )

    # 선택 사항: 모델이 어떤 URL을 참조했는지 확인
    # print(response.candidates[0].url_context_metadata)

    return response.text

def sanitize_filename(text: str) -> str:
    """파일 이름으로 사용할 수 있도록 문자열을 정리합니다."""
    sanitized = re.sub(r"[^\w\s\-.]", "", text)
    sanitized = re.sub(r"\s+", "_", sanitized)
    return sanitized.strip("_ ")


def save_post(result: Dict[str, Any]) -> None:
    """번역된 결과를 Jekyll 포스트 파일로 저장합니다."""
    # ... (이전 코드와 동일, 변경 없음)
    date_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    today = datetime.now()
    if not os.path.exists("_posts"):
        os.makedirs("_posts")
    pep_num = result["pep_number"]
    header = result["header"]
    content = CONTENT_TEMPLATE.format(
        pep_number=pep_num,
        title=result["title"],
        date_str=date_str,
        link=result["url"],
        status=header.get("Status", "N/A"),
        type=header.get("Type", "N/A"),
        created=header.get("Created", "N/A"),
        content=result["translated_content"],
    ).strip()
    safe_title = sanitize_filename(result["title"]).lower()
    file_name = f"{today.year}-{today.month:02d}-{today.day:02d}-pep-{pep_num:04d}-{safe_title}.md"
    file_path = os.path.join("_posts", file_name)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Saved: {file_path}")


def main() -> None:
    pep_urls = [
        "https://peps.python.org/pep-0000/",
    ]

    model_name = "gemini-2.5-flash"

    for url in pep_urls[:]:
        try:
            pep_metadata = fetch_pep_metadata(url)

            translated_content = translate_pep_with_url_context_tool(
                pep_url=url,
                model_name=model_name,
            )

            result_data = {**pep_metadata, "translated_content": translated_content}
            save_post(result_data)

        except Exception as e:
            print(f"Fatal error processing {url}: {e}")
            print(traceback.format_exc())
            continue


if __name__ == "__main__":
    main()
