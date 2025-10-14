---
title: "[Rejected] PEP 297 - Support for System Upgrades"
excerpt: "Python Enhancement Proposal 297: 'Support for System Upgrades'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/297/
toc: true
toc_sticky: true
date: 2025-09-26 18:06:11+0900
last_modified_at: 2025-09-26 18:06:11+0900
published: true
---
> **원문 링크:** [PEP 297 - Support for System Upgrades](https://peps.python.org/pep-0297/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 19-Jul-2001



# PEP 297 – 시스템 업그레이드 지원

*   **작성자:** Marc-André Lemburg <mal at lemburg.com>
*   **상태:** Rejected (거부됨)
*   **유형:** Standards Track
*   **생성일:** 2001년 7월 19일
*   **Python 버전:** 2.6
*   **사후 이력:** (정보 없음)

## 거부 통지 (Rejection Notice)

이 PEP는 충분한 관심을 얻지 못하여 거부되었습니다.

## 개요 (Abstract)

이 PEP는 Python 표준 라이브러리의 일부를 전체 배포판을 다시 설치하거나 새로운 패치 수준 릴리스를 기다릴 필요 없이 업그레이드할 수 있도록 하는 전략을 제안합니다.

## 문제 (Problem)

현재 Python은 기본적으로 표준 라이브러리의 모듈이나 패키지를 오버라이딩(덮어쓰기)하는 것을 허용하지 않습니다. `PYTHONPATH` 환경 변수를 정의하여 (이 변수에 정의된 경로가 Python 표준 라이브러리 경로보다 앞에 추가됨) 이것이 가능하긴 하지만, 설정 변경 없이 이를 달성할 수 있는 표준적인 방법은 없습니다.

Python의 표준 라이브러리가 이제 `distutils`, `email`, `PyXML` 패키지와 같이 별도로도 사용 가능한 패키지들을 호스팅하기 시작하면서, Python 배포판과 독립적으로도 설치될 수 있는 이러한 패키지들을 Python 인터프리터의 새로운 패치 수준 릴리스를 기다릴 필요 없이 업그레이드할 수 있는 옵션이 바람직해졌습니다.

때로는 보안 문제에 대한 핫픽스(hot-fix)를 제공하는 것과 같이, 전체 Python 릴리스 사이클을 거치지 않고 표준 라이브러리의 모듈을 업데이트하는 것이 바람직할 수도 있습니다.

## 제안된 해결책 (Proposed Solutions)

이 PEP는 두 가지 다른, 그러나 반드시 상충되지는 않는 해결책을 제안합니다.

1.  `sys.path`에 새로운 표준 검색 경로 추가: `$stdlibpath/system-packages`를 `$stdlibpath` 항목 바로 앞에 추가합니다. 이는 인터프리터 시작 시 `sys.path`에 추가되는 기존의 `site-packages` (site add-on을 위한 `$stdlibpath/site-packages`) 항목을 보완합니다.
    이 새로운 표준 위치를 활용하려면, `distutils`는 타사 패키지(third-party packages)의 표준 위치인 `$stdlibpath/site-packages` 대신 `$stdlibpath/system-packages`에 특정 패키지를 설치하는 기능을 지원해야 할 것입니다.

2.  `distutils`를 조정하여 시스템 업그레이드를 위해 `$stdlibpath/site-packages` 대신 `$stdlibpath`에 직접 설치하도록 합니다.

첫 번째 해결책은 두 번째 해결책에 비해 몇 가지 장점이 있습니다.

*   업그레이드된 모듈을 쉽게 식별할 수 있습니다 (단지 `$stdlibpath/system-packages`를 확인).
*   업그레이드를 인터프리터의 나머지 설치에 영향을 주지 않고 제거할 수 있습니다.
*   패키지에서 모듈을 사실상 제거할 수 있습니다. 이는 Python이 패키지를 임포트(import)하는 방식 때문입니다. 즉, 최상위 패키지 디렉터리를 한 번 찾으면 이후의 모든 하위 모듈 임포트에서도 이 디렉터리에 머무릅니다.
*   이 접근 방식은 기존 설치 위에 덮어쓰는 방식보다 전반적으로 훨씬 깔끔한 설계입니다.

두 번째 접근 방식의 유일한 장점은 Python 인터프리터를 변경할 필요가 없으며, 이전 Python 버전에서도 작동한다는 것입니다.

두 해결책 모두 `distutils`의 변경을 요구합니다. 이러한 변경 사항은 패키지 작성자(package authors)가 구현할 수도 있지만, 제안된 동작을 활성화하는 표준적인 방법을 정의하는 것이 더 좋을 것입니다.

## 범위 (Scope)

*   **해결책 1:** Python 2.6 이상
*   **해결책 2:** `distutils`가 지원하는 모든 Python 버전

## 크레딧 (Credits)

없음

## 참고 자료 (References)

없음

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.