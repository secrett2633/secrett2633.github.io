---
title: "[Final] PEP 508 - Dependency specification for Python Software Packages"
excerpt: "Python Enhancement Proposal 508: 'Dependency specification for Python Software Packages'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/508/
toc: true
toc_sticky: true
date: 2025-09-26 22:54:08+0900
last_modified_at: 2025-09-26 22:54:08+0900
published: true
---
> **원문 링크:** [PEP 508 - Dependency specification for Python Software Packages](https://peps.python.org/pep-0508/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 11-Nov-2015



---

# PEP 508: Python 소프트웨어 패키지 의존성 명세

## 개요
이 PEP(Python Enhancement Proposal)는 Python 패키지의 의존성(dependency)을 설명하는 언어를 정의합니다. 이 문서는 단일 의존성을 기술하는 데 중점을 두며, 다양한 종류의 의존성과 설치 시기는 상위 수준의 문제로 간주합니다. 목표는 `pip`과 같은 도구가 올바른 패키지를 찾도록 돕는 빌딩 블록을 제공하는 것입니다. 의존성 명세는 단순히 이름만 지정하는 느슨한 형태부터 특정 파일을 참조하는 매우 구체적인 형태까지 다양하며, 특정 플랫폼이나 Python 버전에만 적용되는 경우도 기술할 수 있습니다.

이 PEP에서 정의된 언어는 `pip`의 `requirements` 파일에서 이미 널리 사용되고 있는 간결한 라인 기반 형식입니다. 특히, URL을 통한 직접 참조 형식은 PEP 440에서 정의된 형식을 따릅니다.

## 도입 배경
Python 패키징 생태계에서 의존성 목록을 처리해야 하는 모든 명세는 승인된 PEP를 기반으로 해야 하지만, PEP 426은 대부분의 내용이 아직 구상 단계였습니다. 대신 PEP 508은 이미 존재하는 의존성 명세 구현체들을 채택합니다. 기존 구현체들은 이미 검증되었고 사용자 친화적이기 때문에, 이를 채택하는 것이 새로운 형식을 승인하는 것보다 훨씬 낫다고 판단되었습니다.

## 명세 (Specification)

### 예시 (Examples)
다음은 이름 기반 조회와 URL 기반 조회의 예시입니다.

*   **이름 기반 조회 (Name based lookup):**
    ```
    requests [security,tests] >= 2.8.1, == 2.8.* ; python_version < "2.7"
    ```
    이 예시는 `requests` 패키지의 `security` 및 `tests` "extra"를 포함하여 버전 2.8.1 이상, 2.8.x 버전을 요구하며, `python_version`이 2.7 미만인 환경에서만 유효합니다.

*   **URL 기반 조회 (URL based lookup):**
    ```
    pip @ https://github.com/pypa/pip/archive/1.3.1.zip#sha1=da9234ee9982d4bbb3c72346a6de940a148ea686
    ```
    이 예시는 특정 URL에서 `pip` 패키지를 직접 설치하도록 지정합니다.

### 개념 (Concepts)
의존성 명세는 항상 배포(distribution)의 이름을 지정합니다. 선택적 기능 활성화를 위한 `extras`를 포함할 수 있으며, `version limits`를 사용하여 설치될 버전을 제어하거나, 특정 아티팩트(artifact)의 URL을 지정할 수 있습니다. 마지막으로 `environment markers`를 사용하여 의존성을 조건부로 만들 수 있습니다.

### 문법 (Grammar)
의존성 명세는 ASCII 텍스트로 작성됩니다. PEP 508은 `parsley` 문법을 사용하여 정확한 문법을 제공하며, 이는 주석이나 여러 줄 지원과 같은 프레이밍(framing)을 제공하는 더 큰 시스템에 포함될 것으로 예상됩니다.

*   **버전 (Versions):** PEP 440 규칙에 따라 버전을 명세할 수 있습니다.
*   **Extras:** 배포의 선택적 구성 요소는 `extras` 필드를 사용하여 지정할 수 있습니다. 예를 들어, `requests[security]`는 `requests` 패키지 자체의 의존성 외에 `security` extra에 정의된 추가 의존성을 설치하게 합니다. 여러 `extras`가 나열되면 모든 의존성이 통합(union)됩니다.
*   **환경 마커 (Environment Markers):** 환경 마커는 특정 환경에서만 의존성 명세가 적용되도록 규칙을 제공합니다. 예를 들어, `argparse;python_version<"2.7"`은 `python_version`이 "2.7" 미만일 때만 `argparse`를 의존성으로 간주합니다. 마커 표현식은 `True` 또는 `False`로 평가되며, `False`일 경우 의존성 명세는 무시됩니다. 마커 언어는 임의의 코드 실행으로 인한 보안 취약성을 피하면서 안전하게 평가할 수 있도록 Python에서 영감을 받았습니다.

    다음은 환경 마커에 사용될 수 있는 변수 및 그에 해당하는 Python 값과 샘플 값입니다.

    | Marker 변수                  | Python 동등 값                       | 샘플 값                                                                                                                                           |
    | :--------------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
    | `os_name`                    | `os.name`                            | `posix`, `java`                                                                                                                                   |
    | `sys_platform`               | `sys.platform`                       | `linux`, `linux2`, `darwin`, `java1.8.0_51`                                                                                                       |
    | `platform_machine`           | `platform.machine()`                 | `x86_64`                                                                                                                                          |
    | `platform_python_implementation` | `platform.python_implementation()`   | `CPython`, `Jython`                                                                                                                               |
    | `platform_release`           | `platform.release()`                 | `3.14.1-x86_64-linode39`, `14.5.0`, `1.8.0_51`                                                                                                    |
    | `platform_system`            | `platform.system()`                  | `Linux`, `Windows`, `Java`                                                                                                                        |
    | `platform_version`           | `platform.version()`                 | `#1 SMP Fri Apr 25 13:07:35 EDT 2014`, `Java HotSpot(TM) 64-Bit Server VM, 25.51-b03, Oracle Corporation`, `Darwin Kernel Version 14.5.0`         |
    | `python_version`             | `'.'.join(platform.python_version_tuple()[:2])` | `3.4`, `2.7`                                                                                                                                      |
    | `python_full_version`        | `platform.python_version()`          | `3.4.0`, `3.5.0b1`                                                                                                                                |
    | `implementation_name`        | `sys.implementation.name`            | `cpython`                                                                                                                                         |
    | `implementation_version`     | `sys.implementation.version`에서 파생 | `3.4.0`, `3.5.0b1`                                                                                                                                |
    | `extra`                      | `specification`를 해석하는 컨텍스트에서 정의될 때를 제외하고는 에러 | `test`                                                                                                                                            |

    `extra` 변수는 특별하며, `wheel` 패키지의 `METADATA` 파일에서 특정 `extra`에 어떤 명세가 적용되는지를 알리는 데 사용됩니다.

## 하위 호환성 (Backwards Compatibility)
이 PEP의 대부분은 이미 널리 배포되어 있으므로 호환성 문제는 거의 없습니다. 그러나 몇 가지 차이점이 있습니다.

1.  **PEP 440 직접 참조:** 아직 널리 배포되지는 않았지만, 호환 가능하게 추가될 수 있도록 설계되었습니다.
2.  **PEP 426 마커와의 차이:** 특히 `wheel`과 `pip`에서 배포된 PEP 426 마커는 `python_full_version`과 같은 버전 비교를 다르게 처리합니다. 예를 들어, PEP 426에서는 "2.7.10"이 "2.7.9"보다 작게 처리되었으나, 이 PEP에서는 의도적으로 변경되었습니다. 또한, `~=`, `===`와 같은 새로운 연산자와 `platform_release`, `platform_system`, `implementation_name`, `implementation_version` 같은 새로운 변수가 도입되었습니다. 이 변수들은 이전 마커 구현에서는 에러를 발생시킬 수 있습니다.
3.  **PEP 345 괄호 요구사항:** PEP 345는 버전 명세 주위에 괄호를 요구했지만, PEP 508에서는 PEP 345 의존성 명세를 수용하기 위해 괄호를 허용하되, 새로 생성할 필요는 없습니다.

## 배경 (Rationale)
환경 마커에 의존하는 새로운 PEP들을 진행하기 위해, 최신 형태의 환경 마커를 포함하는 명세가 필요했습니다. 이 PEP는 현재 명세되지 않은 모든 구성 요소를 명확한 형태로 통합합니다. 요구사항 명세는 `setuptools`의 `pkg_resources` 문서에 있는 EBNF(Extended Backus-Naur Form)에서 채택되었는데, 이는 사실상의(de facto) 표준이 아닌 PEP로 명세된 표준에 의존하기 위함입니다.

## PEP 508 변경 사항 요약 (Summary of changes to PEP 508)
초기 구현 이후 피드백을 바탕으로 다음과 같은 변경 사항이 있었습니다.
*   `python_version`의 정의가 `platform.python_version()[:3]`에서 `'.'.join(platform.python_version_tuple()[:2])`로 변경되었습니다. 이는 향후 Python 버전에서 두 자리 주 버전 및 부 버전(예: 3.10)을 수용하기 위함입니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.