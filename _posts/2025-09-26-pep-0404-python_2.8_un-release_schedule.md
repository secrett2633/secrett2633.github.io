---
title: "[Final] PEP 404 - Python 2.8 Un-release Schedule"
excerpt: "Python Enhancement Proposal 404: 'Python 2.8 Un-release Schedule'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/404/
toc: true
toc_sticky: true
date: 2025-09-26 21:27:55+0900
last_modified_at: 2025-09-26 21:27:55+0900
published: true
---
> **원문 링크:** [PEP 404 - Python 2.8 Un-release Schedule](https://peps.python.org/pep-0404/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 09-Nov-2011


# PEP 404 – Python 2.8 미출시 일정

*   **작성자:** Barry Warsaw <barry at python.org>
*   **상태:** Final
*   **유형:** Informational
*   **주제:** Release
*   **작성일:** 2011년 11월 9일
*   **Python 버전:** 2.8

## 초록 (Abstract)

이 문서는 Python 2.8의 "미개발(un-development)" 및 "미출시(un-release)" 일정에 대해 설명합니다.

## 미출시 관리자 및 팀 (Un-release Manager and Crew)

| 직책                     | 이름            |
| :----------------------- | :-------------- |
| 2.8 미출시 관리자        | Cardinal Biggles |

## 미출시 일정 (Un-release Schedule)

현재 미일정은 다음과 같습니다.

| 버전       | 날짜 |
| :--------- | :--- |
| 2.8 최종 | Never |

## 공식 선언 (Official pronouncement)

규칙 6번: 공식적인 Python 2.8 릴리스는 없습니다. 공식적인 Python 2.8 릴리스는 결코 없을 것입니다. 이는 "전(ex-)" 릴리스입니다. Python 2.7은 Python 2 개발 라인의 마지막입니다.

## 업그레이드 경로 (Upgrade path)

Python 2.7에서 공식적인 업그레이드 경로는 Python 3입니다.

## 이제 완전히 다른 이야기 (And Now For Something Completely Different)

진지하게 말하면, 공식적인 Python 2.8 릴리스가 없을 중요한 이유와 왜 Python 3로 마이그레이션(migrate)할 계획을 세워야 하는지에 대한 이유들이 있습니다.

이 문서가 작성될 당시, Python은 20년 이상 되었고, Guido와 커뮤니티는 그동안 많은 것을 배웠습니다. Guido의 Python 3에 대한 원래 개념은 주로 이전 버전에서 발생했던 문제점("warts")들을 제거하기 위해 언어를 변경하는 것이었습니다. Python 3는 완전한 재설계가 아니라 언어의 진화였으며, Python 2와의 완벽한 하위 호환성 유지는 명시적으로 배제되었지만, 불필요한 문법이나 의미론적 변경도 허용되지 않았습니다. 대부분의 경우, Python 2 코드는 Python 3로 비교적 쉽게 번역될 수 있으며, 때로는 2to3와 같은 도구에 의해 완전히 기계적으로 번역될 수도 있습니다 (또한, 2.7과 3.x 모두에서 수정 없이 실행될 비자명(non-trivial)한 언어의 하위 집합도 존재합니다).

여러 버전의 Python을 유지 관리하는 것이 Python 개발자들의 리소스에 상당한 부담을 주고, Python 3에 구현된 언어 및 라이브러리 개선 사항이 매우 중요하기 때문에, Python 2 계보는 Python 2.7로 마무리하기로 결정되었습니다. 따라서 모든 새로운 개발은 Python 3 개발 라인에서 이루어지며, 공식적인 Python 2.8 릴리스는 결코 없을 것입니다. 하지만 Python 2.7은 평소보다 더 긴 기간 동안 유지 관리될 것입니다.

다음은 Python 3의 중요한 개선 사항 중 일부를 요약한 것입니다. Python 2와 Python 3의 차이점에 대한 자세한 내용은 더 읽어볼 수 있으며, Python 2에서 Python 3로 포팅(porting)하는 데 도움이 되는 많은 좋은 가이드들도 있습니다.

### 1. 문자열과 바이트 (Strings and bytes)

Python 2의 기본적인 원래 문자열은 8비트 문자열이라고 불리며, Python 2에서 ASCII 텍스트와 바이트 시퀀스(byte sequences)라는 이중 역할을 수행합니다. Python 2에도 유니코드(unicode) 문자열 타입이 있었지만, 핵심 문자열 타입의 근본적인 모호성과 두 타입이 결합될 때 8비트 문자열에서 유니코드 객체로의 자동 강제 변환(automatic coercion)을 지원하는 Python 2의 기본 동작은 종종 `UnicodeError`를 유발했습니다. Python 3의 표준 문자열 타입은 유니코드 기반이며, Python 3는 전용 `bytes` 타입을 추가했지만, 결정적으로 `bytes`와 유니코드 문자열 간의 자동 강제 변환은 제공되지 않습니다. 암시적 강제 변환에 가장 가까운 것은 인코딩(encoding)이 명시적으로 지정되지 않은 경우 기본 인코딩(일반적으로 UTF-8)을 가정하는 몇 가지 텍스트 기반 API뿐입니다. 따라서 핵심 인터프리터(interpreter), I/O 라이브러리, 모듈 이름 등은 유니코드 문자열과 바이트의 구분을 명확히 합니다. Python 3의 유니코드 지원은 파일 시스템(filesystem)까지 확장되어 비(non-)ASCII 파일 이름이 기본적으로 지원됩니다.

이러한 문자열/바이트의 명확성은 많은 서드파티 라이브러리(third party libraries)와 애플리케이션(applications) 자체가 이러한 구분에 모호성을 가지고 있기 때문에 기존 코드를 Python 3로 전환하는 데 어려움을 주는 원인이 되기도 합니다. 하지만 일단 마이그레이션되면 대부분의 `UnicodeError`를 제거할 수 있습니다.

### 2. 숫자 (Numbers)

Python 2에는 두 가지 기본 정수 타입이 있습니다: 네이티브 머신 크기의 `int` 타입과 임의 길이의 `long` 타입. 이들은 Python 3에서 Python 2의 `long` 타입과 유사한 단일 `int` 타입으로 통합되었습니다.

또한, 이제 정수 나눗셈은 정수가 아닌 결과에 대해 부동 소수점(floating point) 숫자를 생성합니다.

### 3. 클래스 (Classes)

Python 2에는 종종 "클래식 클래스(classic classes)"와 "뉴스타일 클래스(new-style classes)"라고 불리는 두 가지 핵심 클래스 계층 구조가 있습니다. 후자는 내장된 기본 타입으로부터 상속받는 것과 같은 기능을 허용하고, `property` 내장 함수와 같은 디스크립터(descriptor) 기반 도구를 지원하며, 다중 상속(multiple inheritance)을 처리하기 위한 일반적으로 더 합리적이고 일관된 시스템을 제공합니다. Python 3는 클래식 클래스에 대한 지원을 완전히 중단할 기회를 제공했으며, 따라서 Python 3의 모든 클래스는 자동으로 뉴스타일 시맨틱(new-style semantics)을 사용합니다 (이제 이것은 오칭(misnomer)입니다). 이를 활성화하기 위해 명시적으로 `object`로부터 상속받거나 기본 메타타입(metatype)을 설정할 필요가 없습니다 (실제로 모듈 수준에서 기본 메타타입을 설정하는 것은 더 이상 지원되지 않으며, 기본 메타타입은 항상 `object`입니다).

메타클래스(metaclass)를 명시적으로 지정하는 메커니즘도 클래스 본문(class body)의 `__metaclass__` 매직(magic) 속성 대신 클래스 헤더 라인에서 `metaclass` 키워드 인자(keyword argument)를 사용하도록 변경되었습니다.

### 4. 다양한 표기법 (Multiple spellings)

Python 2에는 `repr()`과 백틱(` `), 또는 두 가지 불평등 연산자(`!=`와 `<>`)처럼 일부 구성 요소에 대해 여러 표기법이 존재하는 경우가 많습니다. 모든 경우에 Python 3는 정확히 하나의 표기법을 선택하고 다른 것을 제거했습니다 (예: `repr()`와 `!=`가 유지되었습니다).

### 5. 임포트 (Imports)

Python 3에서는 패키지 내의 암시적 상대 임포트(implicit relative imports)는 더 이상 사용할 수 없으며, 오직 절대 임포트(absolute imports)와 명시적 상대 임포트만 지원됩니다. 또한, 스타 임포트(star imports) (예: `from x import *`)는 모듈 레벨 코드에서만 허용됩니다.

또한, 표준 라이브러리의 일부 영역은 명명 체계(naming scheme)를 더 직관적으로 만들기 위해 재구성되었습니다. 거의 사용되지 않는 일부 내장 함수들은 표준 라이브러리 모듈로 재배치되었습니다.

### 6. 이터레이터와 뷰 (Iterators and views)

Python 2에서 구체적인 리스트(concrete lists)를 반환했던 많은 API가 Python 3에서는 이제 이터레이터(iterators) 또는 경량 뷰(lightweight views)를 반환합니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)으로 지정되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.