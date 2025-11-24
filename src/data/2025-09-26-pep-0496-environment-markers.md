---
title: "[Rejected] PEP 496 - Environment Markers"
excerpt: "Python Enhancement Proposal 496: 'Environment Markers'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/496/
toc: true
toc_sticky: true
date: 2025-09-26 22:40:36+0900
last_modified_at: 2025-09-26 22:40:36+0900
published: true
---
> **원문 링크:** [PEP 496 - Environment Markers](https://peps.python.org/pep-0496/)
>
> **상태:** Rejected | **유형:** Informational | **작성일:** 03-Jul-2015


# PEP 496 – 환경 마커 (Environment Markers) 번역 및 해설

## PEP 상태

이 PEP가 처음 초안으로 작성된 후, 환경 마커를 포함한 의존성 선언 구문을 완전히 명세화하기 위해 PEP 508이 개발 및 제출되었습니다. 그 결과, 이 PEP는 더 포괄적인 PEP 508에 찬성하여 `거부(Rejected)`되었습니다.

## 개요

`환경 마커(Environment Marker)`는 현재 실행 환경에 대한 조건을 설명합니다. 이는 특정 의존성이 특정 환경에서만 필요할 때, 그리고 Python 런타임 가용성을 넘어 추가적인 제약 조건이 있는 배포판의 지원 플랫폼을 나타낼 때 사용됩니다.

환경 마커는 PEP 345에서 처음 명세화되었습니다. PEP 426 (PEP 345를 대체할 예정이었던)은 마커에 대한 확장을 제안했습니다. 2.7.10 버전이 출시되었을 때, 단순한 어휘적 비교에 의존했기 때문에 이러한 확장조차 불충분해졌고, 이에 따라 이 PEP가 탄생하게 되었습니다.

## 배경 (Rationale)

많은 Python 패키지는 이식성을 염두에 두고 작성됩니다.

많은 패키지의 경우, 이는 광범위한 Python 릴리스를 지원하는 것을 목표로 합니다. 예를 들어, `argparse`와 같이 외부 라이브러리로 시작했지만 나중에 코어에 통합된 라이브러리에 의존하는 경우, 사용 중인 Python 버전에 따라 필요한 패키지 세트가 달라지므로 단일 요구 사항 세트를 지정하기 어렵습니다.

다른 패키지의 경우, 이식성을 위해 여러 운영 체제를 지원해야 합니다. 그러나 운영 체제 간의 상당한 차이로 인해 특정 의존성이 특정 플랫폼에서만 필요할 수 있습니다 (예: Windows에서만 `pywin32`에 의존하는 경우).

환경 마커는 개발자가 특정 환경에 특화된 요구 사항을 나열할 수 있도록 하여 요구 사항 목록에 더 많은 유연성을 제공하고자 합니다.

## 예시 (Examples)

다음은 `requirements.txt` 내에서 이러한 마커를 사용하는 몇 가지 예시입니다.

```
pywin32 >=1.0 ; sys_platform == 'win32'
unittest2 >=2.0,<3.0 ; python_version == '2.4' or python_version == '2.5'
backports.ssl_match_hostname >= 3.4 ; python_version < '2.7.9' or (python_version >= '3.0' and python_version < '3.4')
```

다음은 Windows를 사용할 때 런타임과 빌드 타임 모두에서 PyWin32를 요구하는 배포판의 `setup.py`에 포함된 조건부 메타데이터의 예시입니다.

```python
setup(
    install_requires=["pywin32 > 1.0 : sys.platform == 'win32'"],
    setup_requires=["pywin32 > 1.0 : sys.platform == 'win32'"]
)
```

## 마이크로 언어 (Micro-language)

이 마이크로 언어의 동작 방식은 다음과 같습니다.

*   문자열을 `==` 및 `in` 연산자(및 그 반대)로 비교합니다.
*   버전 번호를 문자열에 지원되는 연산자 외에 `<`, `<=`, `>=`, `>` 연산자로 비교합니다.

일반적인 부울 연산자 `and` 및 `or`를 사용하여 표현식을 결합할 수 있으며, 그룹화를 위해 괄호가 지원됩니다.

의사 문법(pseudo-grammar)은 다음과 같습니다.

```
MARKER: EXPR [(and|or) EXPR]*
EXPR: ("(" MARKER ")") | (STREXPR|VEREXPR)
STREXPR: STRING [STRCMPOP STREXPR]
STRCMPOP: ==|!=|in|not in
VEREXPR: VERSION [VERCMPOP VEREXPR]
VERCMPOP: (==|!=|<|>|<=|>=)
```

`SUBEXPR`은 Python 문자열(예: `'win32'`)이거나 아래 나열된 `Strings` 마커 변수 중 하나입니다.

`VEREXPR`은 PEP 440 버전 식별자이거나 아래 나열된 `Version number` 마커 변수 중 하나입니다. 버전 번호 간의 비교는 PEP 440 의미 체계를 사용하여 수행됩니다.

### 문자열 (Strings)

*   `os_name`: `os.name`
*   `sys_platform`: `sys.platform`
*   `platform_release`: `platform.release()`
*   `implementation_name`: `sys.implementation.name`
*   `platform_machine`: `platform.machine()`
*   `platform_python_implementation`: `platform.python_implementation()`

특정 문자열 값(예: Python 3.3 이전 버전의 `sys.implementation.name`)을 사용할 수 없는 경우, 해당 마커 변수는 빈 문자열과 동일하게 간주되어야 합니다.

특정 버전 번호 값(예: Python 3.3 이전 버전의 `sys.implementation.version`)을 사용할 수 없는 경우, 해당 마커 변수는 0과 동일하게 간주되어야 합니다.

### 버전 번호 (Version numbers)

*   `python_version`: `platform.python_version()[:3]`
*   `python_full_version`: 아래 정의 참조
*   `platform_version`: `platform.version()`
*   `implementation_version`: 아래 정의 참조

`python_full_version` 및 `implementation_version` 마커 변수는 다음 알고리즘에 따라 각각 `sys.version_info` 및 `sys.implementation.version`에서 파생됩니다.

```python
def format_full_version(info):
    version = '{0.major}.{0.minor}.{0.micro}'.format(info)
    kind = info.releaselevel
    if kind != 'final':
        version += kind[0] + str(info.serial)
    return version

python_full_version = format_full_version(sys.version_info)
implementation_version = format_full_version(sys.implementation.version)
```

`python_full_version`은 일반적으로 `sys.version.split()[0]`에 해당합니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.