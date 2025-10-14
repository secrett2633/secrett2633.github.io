---
title: "[Rejected] PEP 271 - Prefixing sys.path by command line option"
excerpt: "Python Enhancement Proposal 271: 'Prefixing sys.path by command line option'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/271/
toc: true
toc_sticky: true
date: 2025-09-26 17:51:56+0900
last_modified_at: 2025-09-26 17:51:56+0900
published: true
---
> **원문 링크:** [PEP 271 - Prefixing sys.path by command line option](https://peps.python.org/pep-0271/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 15-Aug-2001


# PEP 271 – `sys.path`에 명령줄 옵션으로 접두사 추가

*   **작성자:** Frédéric B. Giacometti
*   **상태:** 거부됨 (Rejected)
*   **유형:** 표준 트랙 (Standards Track)
*   **생성일:** 2001년 8월 15일
*   **Python 버전:** 2.2

## 초록 (Abstract)

현재, 추가적인 Python 모듈 검색 디렉터리를 정의하는 유일한 방법은 `PYTHONPATH` 환경 변수를 설정하는 것입니다. 이 PEP는 `PYTHONPATH`에 대한 대안으로 Python 명령에 `-P` 옵션을 도입할 것을 제안합니다.

## 배경 (Rationale)

이 제안의 핵심은 `PYTHONPATH` 환경 변수 사용의 불편함을 해결하고, 명령줄에서 직접 `sys.path`에 경로를 추가할 수 있는 유연성을 제공하는 것입니다.

*   **Unix 환경:**
    `python -P $SOMEVALUE`
    명령은 다음 환경 변수를 설정하고 Python을 실행하는 것과 동일하게 작동할 것입니다.
    `env PYTHONPATH=$SOMEVALUE python`

*   **Windows 2K 환경:**
    `python -P %SOMEVALUE%`
    명령은 다음 명령어와 (거의) 동일하게 작동할 것입니다.
    `set __PYTHONPATH=%PYTHONPATH% && set PYTHONPATH=%SOMEVALUE%\ && python && set PYTHONPATH=%__PYTHONPATH%`

## 기타 정보 (Other Information)

이 옵션은 `java -classpath` 옵션과 유사합니다.

## 이 옵션 사용 시점 (When to use this option)

이 옵션은 예를 들어 테스트 또는 빌드 스크립트에서 Python을 사용할 때, 더 쉽고 견고하게 경로를 설정하는 데 도움이 되도록 고안되었습니다. 환경 변수를 직접 조작하는 대신, 명령줄 인수로 명시적인 제어가 가능해지므로 스크립트의 재현성과 독립성을 높일 수 있습니다.

## 참조 구현 (Reference Implementation)

이 제안을 구현하는 패치는 SourceForge에서 이용 가능했습니다.

*   패치 다운로드: `http://sourceforge.net/tracker/download.php?group_id=5470&atid=305470&file_id=6916&aid=429614`
*   패치 토론: `http://sourceforge.net/tracker/?func=detail&atid=305470&aid=429614&group_id=5470`

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.