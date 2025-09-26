---
title: "[Final] PEP 552 - Deterministic pycs"
excerpt: "Python Enhancement Proposal 552: 'Deterministic pycs'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/552/
toc: true
toc_sticky: true
date: 2025-09-26 23:38:24+0900
last_modified_at: 2025-09-26 23:38:24+0900
published: true
---
> **원문 링크:** [PEP 552 - Deterministic pycs](https://peps.python.org/pep-0552/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 04-Sep-2017

# PEP 552 – 결정론적 `.pyc` 파일

## 개요
이 PEP는 `.pyc` 파일 형식을 확장하여, 파일의 결정론적(deterministic) 특성을 강화할 것을 제안합니다.

## 도입 배경 (Rationale)

**재현 가능한 빌드(Reproducible Build)의 중요성**
재현 가능한 빌드란 동일한 소스 코드를 빌드할 때, 빌드 환경이 다르더라도 항상 바이트 단위로 동일한 결과물이 생성되는 것을 의미합니다. 이는 보안에 매우 중요하며, Bazel과 같은 콘텐츠 기반 빌드 시스템에서 핵심적인 개념입니다. 이러한 시스템은 출력 파일의 내용이 입력 파일의 내용에 대한 결정론적 함수일 때 가장 효율적입니다.

**기존 `.pyc` 형식의 문제점**
현재 Python의 `.pyc` 파일 형식은 모듈의 마샬링(marshaled)된 코드 객체에 매직 넘버(magic number), 소스 타임스탬프(source timestamp), 그리고 소스 파일 크기를 접두사로 붙인 형태입니다. 여기서 '소스 타임스탬프'의 존재는 `.pyc` 파일이 입력 파일 내용만의 결정론적 함수가 아니라는 것을 의미합니다. 이는 소스 파일의 `mtime`(수정 시간)과 같은 변동성 있는 메타데이터에 의존하기 때문에, `.pyc` 파일이 적절한 재현성을 저해하는 요소가 됩니다.

**기존 배포자들의 어려움**
Python 코드 배포자들은 현재 다음과 같은 선택지들로 인해 어려움을 겪고 있습니다.
*   `.pyc` 파일을 배포하지 않고 캐싱(caching) 이점을 포기하는 방법.
*   `.pyc` 파일을 배포하지만 재현성을 잃는 방법.
*   모든 Python 소스 파일에 결정론적인 타임스탬프를 부여하는 복잡한 방법 (예: `cpython` 풀 리퀘스트 #296).
*   설치 시점에 `.pyc` 파일을 생성하는 것과 같이 위 방법들을 복합적으로 사용하는 방법.

이러한 선택지들은 모두 만족스럽지 못합니다.

**PEP 552의 제안**
이 PEP는 타임스탬프를 결정론적인 해시(hash) 값으로 대체하는 것을 제안합니다. 다만, 현재의 타임스탬프 기반 무효화(invalidation) 방법은 여전히 기본값으로 유지될 것입니다. 타임스탬프 기반 무효화는 비결정론적임에도 불구하고 많은 워크플로우와 사용 사례에서 잘 작동하기 때문입니다. 해시 기반 `.pyc` 형식은 모든 소스 파일을 읽고 해싱하는 비용을 발생시킬 수 있으며, 이는 단순히 타임스탬프를 확인하는 것보다 비쌉니다. 따라서, 현재로서는 주로 배포자나 고급 사용 사례에서 활용될 것으로 예상됩니다.

(참고: `.pyc` 파일을 비결정론적으로 만드는 다른 문제들도 있지만, 이 PEP에서는 다루지 않습니다.)

## 사양 (Specification)

**`.pyc` 헤더 확장**
`.pyc` 헤더는 현재 3개의 32비트 워드(word)로 구성되어 있습니다. 이 PEP에서는 이를 4개로 확장할 것을 제안합니다.
*   **첫 번째 워드:** 이전과 같이 바이트코드 및 `.pyc` 형식 버전을 나타내는 매직 넘버(magic number)입니다.
*   **두 번째 워드:** 새로운 개념의 워드로, 비트 필드(bit field)가 됩니다. 이 비트 필드의 내용에 따라 나머지 헤더의 해석 및 `.pyc`의 무효화 동작이 달라집니다.

**`.pyc` 형식 종류**

1.  **기존 타임스탬프 기반 `.pyc`:**
    *   비트 필드가 `0`인 경우, 이 `.pyc`는 전통적인 타임스탬프 기반 `.pyc`입니다.
    *   세 번째와 네 번째 워드는 각각 타임스탬프와 파일 크기가 됩니다.
    *   소스 파일의 메타데이터와 헤더의 메타데이터를 비교하여 무효화를 수행합니다.

2.  **해시 기반 `.pyc`:**
    *   비트 필드의 최하위 비트가 설정된 경우, 이 `.pyc`는 해시 기반 `.pyc`입니다.
    *   최하위 비트 다음의 비트는 `check_source` 플래그입니다.
    *   비트 필드 뒤에는 64비트의 소스 파일 해시가 따라옵니다.
    *   소스 파일 내용의 하드코딩된 키(hardcoded key)를 사용하는 SipHash를 사용합니다. (PEP 456을 통해 Python에 이미 SipHash 구현이 내장되어 있습니다.)
    *   해시의 보안은 주요 고려 사항이 아니지만, MD5와 같이 완전히 손상된 해시는 제어된 환경에서 Python 감사를 용이하게 하기 위해 피합니다.

**해시 기반 `.pyc`의 동작**

*   **`check_source` 플래그가 설정된 경우:**
    *   Python은 소스 파일을 해싱하고, 그 결과를 `.pyc`에 저장된 예상 해시와 비교하여 `.pyc`의 유효성을 판단합니다.
    *   만약 `.pyc`를 재생성해야 한다면, `check_source` 플래그가 설정된 해시 기반 `.pyc`로 다시 생성됩니다.

*   **`check_source` 플래그가 설정되지 않은 경우 (unset):**
    *   Python은 소스 파일의 해시를 확인하지 않고 `.pyc`를 로드합니다.
    *   이 경우, 외부 시스템(예: 로컬 Linux 배포판의 패키지 관리자)이 `.pyc` 파일의 최신 상태를 유지할 책임이 있다고 가정합니다.
    *   유효성 검사가 비활성화되어 있더라도, 해시 필드는 올바르게 설정되어 있어야 합니다. 이를 통해 대역 외(out-of-band) 일관성 검사기가 `.pyc`의 최신 상태를 확인할 수 있습니다.
    *   PEP 3147에서 규정한 대로, 해당 소스 파일이 없는 `.pyc`는 로드되지 않는 규칙은 해시 기반 `.pyc`에도 계속 적용됩니다.

**프로그래밍 API 지원**

*   `py_compile` 및 `compileall` 모듈의 프로그래밍 API는 해시 기반 `.pyc` 생성을 지원합니다.
*   `py_compile`은 새로운 `PycInvalidationMode` 열거형을 정의합니다.
    ```python
    class PycInvalidationMode(Enum):
        TIMESTAMP
        CHECKED_HASH
        UNCHECKED_HASH
    ```
*   `py_compile.compile`, `compileall.compile_dir`, `compileall.compile_file` 함수에 `invalidation_mode` 매개변수가 추가되며, `PycInvalidationMode` 열거형 값을 받습니다.

**`compileall` 도구 확장**

*   `compileall` 도구는 `--invalidation-mode`라는 새로운 명령줄 옵션으로 확장됩니다.
*   `--invalidation-mode`는 `timestamp` (기본값), `checked-hash`, `unchecked-hash` 세 가지 값을 가질 수 있으며, 이는 `PycInvalidationMode` 열거형의 값에 해당합니다.

**`importlib.util` 확장**

*   `importlib.util` 모듈은 바이트스트링 소스에 대해 `.pyc` 작성 코드가 사용하는 해시를 계산하는 `source_hash(source)` 함수로 확장됩니다.

**런타임 설정**

*   해시 기반 `.pyc` 무효화의 런타임 설정은 `--check-hash-based-pycs`라는 새로운 인터프리터 옵션으로 제공됩니다.
*   이 옵션은 `default`, `always`, `never` 세 가지 값을 가질 수 있는 삼중 상태(tristate) 옵션입니다.
    *   `default`: 해시 기반 `.pyc`의 `check_source` 플래그에 따라 무효화가 결정됩니다.
    *   `always`: `check_source` 비트 값에 관계없이 인터프리터가 무효화를 위해 항상 소스 파일을 해싱합니다.
    *   `never`: 인터프리터가 해시 기반 `.pyc`를 항상 유효하다고 가정합니다. 이 경우, `unchecked` 해시 기반 `.pyc`는 다시 `unchecked` 해시 기반 `.pyc`로 재생성됩니다.
*   타임스탬프 기반 `.pyc`는 `--check-hash-based-pycs` 옵션의 영향을 받지 않습니다.

## 참고 자료 (References)
*   Python Determinism: [http://benno.id.au/blog/2013/01/15/python-determinism](http://benno.id.au/blog/2013/01/15/python-determinism)
*   Bugzilla openSUSE: [http://bugzilla.opensuse.org/show_bug.cgi?id=1049186](http://bugzilla.opensuse.org/show_bug.cgi?id=1049186)

## 기여자 (Credits)
저자는 이 PEP 주제에 대한 유익한 대화를 나눠준 Gregory P. Smith, Christian Heimes, Steve Dower에게 감사를 표합니다.

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.