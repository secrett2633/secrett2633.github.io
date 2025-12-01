---
title: "[Withdrawn] PEP 460 - Add binary interpolation and formatting"
excerpt: "Python Enhancement Proposal 460: 'Add binary interpolation and formatting'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/460/
toc: true
toc_sticky: true
date: 2025-09-26 22:08:41+0900
last_modified_at: 2025-09-26 22:08:41+0900
published: true
---
> **원문 링크:** [PEP 460 - Add binary interpolation and formatting](https://peps.python.org/pep-0460/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 06-Jan-2014


# PEP 460 – 바이너리 보간 및 포매팅 추가 (Add binary interpolation and formatting)

*   **작성자** : Antoine Pitrou
*   **상태** : 철회됨 (Withdrawn)
*   **유형** : Standards Track
*   **생성일** : 2014년 1월 6일
*   **Python 버전** : 3.5

## 초록 (Abstract)

이 PEP는 `bytes` 및 `bytearray` 객체에 최소한의 포매팅 연산을 추가할 것을 제안합니다. 제안된 추가 기능은 다음과 같습니다:

*   `str` 객체의 `%` 포매팅과 유사한 문법으로, 단일 객체, 튜플 또는 `dict`를 인수로 받는 `bytes % ...` 및 `bytearray % ...` (퍼센트-포매팅).
*   `str.format()`과 유사한 문법으로, 위치(positional) 및 키워드(keyword) 인수를 받는 `bytes.format(...)` 및 `bytearray.format(...)` (중괄호-포매팅).
*   `str.format_map(...)`과 유사한 API를 가지며, `bytes.format()` 및 `bytearray.format()`과 동일한 포매팅 문법 및 의미론을 가진 `bytes.format_map(...)` 및 `bytearray.format_map(...)`.

## 배경 (Rationale)

Python 2에서는 `str % args` 및 `str.format(args)`를 통해 바이트 문자열(bytestrings)의 포매팅 및 보간이 가능했습니다. 이 기능은 프로토콜이 고정된 인코딩을 사용하는 것으로 알려져 있을 때 프로토콜 메시지를 조합하는 데 흔히 사용되었습니다.

Python 3는 일반적으로 텍스트를 유니코드(즉, `str` 객체, `bytes`가 아님)로 저장하고 조작하도록 요구합니다. 하지만, 어떤 경우에는 `bytes` 객체를 직접 조작하는 것이 합리적입니다. 일반적인 사용 사례는 바이너리 네트워크 프로토콜로, 여러 `bytes` 객체(일부는 리터럴, 일부는 계산된 값)를 보간하고 조합하여 완전한 프로토콜 메시지를 생성해야 할 수 있습니다. 예를 들어, HTTP 또는 SIP와 같은 프로토콜은 ASCII 이름과 다양하거나 때로는 불분명한 인코딩을 사용하는 불투명한 "텍스트" 값을 가진 헤더를 가집니다. 또한, 이러한 헤더 뒤에는 바이너리 본문이 올 수 있으며, 이는 청크로 나뉘고 ASCII 헤더와 트레일러로 꾸며질 수 있습니다.

바이너리 데이터를 축적하는 합리적으로 효율적인 방법(`bytearray` 객체 사용, `bytes.join` 메서드 또는 `io.BytesIO` 등)이 있지만, 이러한 방법 중 어느 것도 `%` 포매팅 또는 `{}` 포매팅 템플릿 및 포매팅 연산이 제공하는 것과 같은 가독성 있고 직관적인 코드를 생성하지 못합니다.

## 바이너리 포매팅 기능 (Binary formatting features)

### 지원되는 기능 (Supported features)

이 제안에서 `bytes` 및 `bytearray`에 대한 퍼센트-포매팅은 다음 기능을 지원합니다:

*   위치(position) 및 이름(name)으로 포매팅 인수를 조회합니다 (예: `%s` 및 `%(name)s`).
    *   `%s`는 주어진 값에 대해 `Py_buffer`를 얻으려고 시도하고, 실패하면 `__bytes__`를 호출합니다. 결과 바이너리 데이터는 문자열의 주어진 위치에 삽입됩니다. 이는 `bytes`, `bytearray`, `memoryview` 객체 (및 `pathlib`의 `path` 객체와 같은 몇 가지 다른 객체)에서 작동할 것으로 예상됩니다.
*   `%c`는 0에서 255 사이의 정수를 허용하며, 주어진 값의 바이트 하나를 삽입합니다.

`bytes` 및 `bytearray`에 대한 중괄호-포매팅은 다음 기능을 지원합니다:

*   `str.format()`에서 지원하는 모든 종류의 인수 조회 (명시적 위치 조회, 자동 증가 위치 조회, 키워드 조회, 속성 조회 등).
*   수정자(modifier)나 레이아웃(layout)이 지정되지 않은 경우 바이너리 데이터 삽입 (예: `{}`, `{0}`, `{name}`). 이는 퍼센트-포매팅의 `%s`와 동일한 의미론을 가집니다 (위 참조).
*   `c` 수정자는 0에서 255 사이의 정수를 허용하며, 주어진 값의 바이트 하나를 삽입합니다 (위의 `%c`와 동일).

### 지원되지 않는 기능 (Unsupported features)

`str` 객체의 포매팅(`%` 연산자 또는 `str.format()` 메서드)에 있는 다른 모든 기능은 지원되지 않습니다. 이러한 기능은 연산자 또는 메서드의 수신자를 텍스트로 처리하는 것을 의미하며, 이는 텍스트/바이트 분리(text / bytes separation)에 반합니다 (예를 들어, `%d`를 포맷 코드로 허용하는 것은 `bytes` 객체가 실제로 ASCII 호환 텍스트 문자열임을 의미합니다).

지원되지 않는 기능 중에는 대부분의 타입별 포맷 코드뿐만 아니라 패딩(padding) 또는 정렬(alignment)과 같은 다양한 레이아웃 지정자도 포함됩니다. 또한, `str` 객체는 `%s` 포맷 코드를 사용하더라도 포매팅 연산의 인수로 허용되지 않습니다.

`__format__`은 호출되지 않습니다.

## 비판 (Criticisms)

*   **개발 및 유지보수 비용:** Python 3.3에서는 ASCII 또는 latin-1로 인코딩하는 것이 `memcpy`만큼 빠르지만 (별도의 객체를 생성하더라도), 개발자들은 Python 3.4 이전 버전을 지원하려면 어쨌든 바이너리 포매팅의 부재를 해결해야 할 것입니다.
*   **성능:** `bytes.join()`은 `bytes` 문자열을 결합하는 데 `format`보다 지속적으로 빠릅니다 (이것이 사실인지 의문이 제기됨).
*   **대안:** 포매팅 함수는 내장 타입에 추가하는 대신 서드 파티 모듈(third party module)로 구현될 수 있습니다.

## 다른 제안 (Other proposals)

### 새로운 `type` 데이터 타입 (A new type datatype)

"네트워크 프로그래밍"에 특화된 새로운 데이터 타입을 생성하는 것이 제안되었습니다. 이 PEP의 작성자들은 이것이 역효과를 낳을 것이라고 믿습니다. Python 3는 이미 바이너리 데이터 조작을 위한 여러 주요 타입(`bytes`, `bytearray`, `memoryview`, `io.BytesIO`)을 가지고 있습니다.

또 다른 타입을 추가하는 것은 사용자에게 더 많은 혼란을 주고, 라이브러리 간의 상호 운용성을 더욱 어렵게 만들 것입니다 (필요한 변환으로 인해 잠재적으로 최적이 아닐 수도 있음).

더욱이, 하나의 타입이 아니라 두 개의 타입이 필요할 것입니다: 하나는 불변 타입(해싱을 허용하기 위해), 다른 하나는 가변 타입(네트워크 메시지 작업 시 효율적인 축적이 자주 필요하므로).

## 해결 (Resolution)

이 PEP는 `modulo` 연산자와 함께 `bytes` 객체를 위한 더욱 확장된 포매팅 언어를 도입하는 PEP 461의 승인으로 인해 폐기되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.