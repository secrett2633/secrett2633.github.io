---
title: "[Draft] PEP 467 - Minor API improvements for binary sequences"
excerpt: "Python Enhancement Proposal 467: 'Minor API improvements for binary sequences'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/467/
toc: true
toc_sticky: true
date: 2025-09-26 22:14:25+0900
last_modified_at: 2025-09-26 22:14:25+0900
published: true
---
> **원문 링크:** [PEP 467 - Minor API improvements for binary sequences](https://peps.python.org/pep-0467/)
>
> **상태:** Draft | **유형:** Standards Track | **작성일:** 30-Mar-2014

## PEP 467 – 바이너리 시퀀스를 위한 사소한 API 개선 (Minor API improvements for binary sequences)

### 개요 (Abstract)
이 PEP는 `bytes` 및 `bytearray` 타입의 API에 작은 조정을 제안하여 바이너리 도메인(binary domain) 내에서 작업하는 것을 더 쉽게 만드는 것을 목표로 합니다. 주요 제안 내용은 다음과 같습니다:
*   `fromsize` 대체 생성자 추가
*   `fromint` 대체 생성자 추가
*   `getbyte` 바이트 검색 메서드 추가
*   `iterbytes` 대체 이터레이터 추가

마지막 두 가지(`getbyte` 및 `iterbytes`)는 `memoryview`에도 추가될 예정입니다.

### 배경 (Rationale)
Python 3 언어 사양의 초기 개발 과정에서, 임의의 바이너리 데이터를 위한 핵심 `bytes` 타입은 현재 `bytearray`라고 불리는 가변 타입으로 시작되었습니다. Python 3 시리즈 전반에 걸쳐 바이너리 도메인에서 작동하는 다른 측면들도 발전해 왔으며, 예를 들어 PEP 461이 있습니다.

### 동기 (Motivation)
Python 3와 `str` 및 `bytes`의 분리 이후, 프로그래밍의 작지만 중요한 영역인 와이어 포맷(wire format) 프로토콜은 다루기 다소 어려워졌고 훨씬 더 고통스러워졌습니다. 이 프로그래밍 영역은 바이너리 데이터와 ASCII 호환 텍스트 세그먼트(ASCII-encoded text)의 혼합으로 특징지어집니다. 새로운 생성자, 메서드 및 이터레이터의 추가는 새로운 와이어 포맷 코드를 작성하고 기존 코드를 업데이트하는 데 도움이 될 것입니다. 일반적인 사용 사례로는 dbf 및 pdf 파일 형식, 이메일 형식, FTP 및 HTTP 통신 등이 있습니다.

### 제안 내용 (Proposals)

#### 1. "개수 및 바이트 초기화 시퀀스" 생성자 명시적 추가 (Addition of explicit “count and byte initialised sequence” constructors)
기본 생성자(예: `bytes(1) -> b'\x00'`)를 통해 0으로 채워진 `bytes` 유사 객체를 생성하는 권장되지 않는 동작을 대체하기 위해, 이 PEP는 `bytes`와 `bytearray` 모두에 `fromsize`라는 명시적인 대체 생성자를 클래스 메서드로 추가할 것을 제안합니다. 첫 번째 인수는 개수(`count`)이며, 두 번째 인수는 사용할 채움 바이트(`fill byte`)이고 기본값은 `\x00`입니다.

예시:
```python
>>> bytes.fromsize(3)
b'\x00\x00\x00'
>>> bytearray.fromsize(3)
bytearray(b'\x00\x00\x00')
>>> bytes.fromsize(5, b'\x0a')
b'\x0a\x0a\x0a\x0a\x0a'
>>> bytearray.fromsize(5, fill=b'\x0a')
bytearray(b'\x0a\x0a\x0a\x0a\x0a')
```
`fromsize`는 단일 정수가 전달될 때 현재 생성자가 작동하는 방식과 동일하게 동작하지만, 필요할 경우 0이 아닌 채움 값을 허용합니다.

#### 2. "단일 바이트" 생성자 명시적 추가 (Addition of explicit “single byte” constructors)
텍스트 `chr` 함수의 바이너리 대응물로서, 이 PEP는 `bytes`와 `bytearray` 모두에 `fromint`라는 명시적인 대체 생성자를 클래스 메서드로 추가할 것을 제안합니다.

예시:
```python
>>> bytes.fromint(65)
b'A'
>>> bytearray.fromint(65)
bytearray(b'A')
```
이 메서드들은 0에서 255 (포함) 범위의 정수만 허용합니다.
범위를 벗어나는 값이나 잘못된 타입이 전달될 경우 `ValueError` 또는 `TypeError`가 발생합니다.

`ord` 빌트인 함수의 문서는 `bytes.fromint`가 바이너리 데이터의 주된 역 연산(primary inverse operation)이며, `chr`은 텍스트 데이터의 역 연산임을 명시적으로 기록하도록 업데이트될 것입니다. `bytearray.fromint`도 존재함이 언급될 것입니다.

동작상 `bytes.fromint(x)`는 현재 `bytes([x])`와 동일하며 (`bytearray`도 마찬가지), 새로운 표기법은 발견하기 쉽고 읽기 쉬울 것으로 예상됩니다 (특히 바이너리 시퀀스 타입의 인덱싱 연산과 함께 사용될 때). 별도의 메서드로서, 이 새로운 표기법은 `map`과 같은 고차 함수(higher order functions)와 더 잘 작동할 것입니다.

이 새로운 메서드들은 임의로 큰 정수를 임의로 긴 `bytes` 객체로 변환할 수 있는 기존 `int.to_bytes` 변환 메서드와 동일한 수준의 일반적인 정수 지원을 의도적으로 제공하지 않습니다. 단일 바이트에 맞는 양의 정수만 허용하는 제한은 바이트 순서 정보가 필요 없고 음수를 처리할 필요가 없음을 의미합니다. 새로운 메서드 문서는 임의의 정수 처리가 필요한 사용 사례에 대해 `int.to_bytes`를 참조하도록 안내할 것입니다.

#### 3. 단일 바이트를 검색하는 `getbyte` 메서드 추가 (Addition of “getbyte” method to retrieve a single byte)
이 PEP는 `bytes`, `bytearray`, `memoryview`에 항상 `bytes` 객체를 반환하는 `getbyte` 메서드를 추가할 것을 제안합니다.

예시:
```python
>>> b'abc'.getbyte(0)
b'a'
```
존재하지 않는 인덱스를 요청하면 `IndexError`가 발생합니다.

#### 4. `bytes` 객체를 생성하는 최적화된 이터레이터 메서드 추가 (Addition of optimised iterator methods that produce bytes objects)
이 PEP는 `bytes`, `bytearray`, `memoryview`에 정수 대신 길이가 1인 `bytes` 객체를 생성하는 최적화된 `iterbytes` 메서드를 추가할 것을 제안합니다.

예시:
```python
for x in data.iterbytes(): # x는 정수 대신 길이가 1인 `bytes` 객체
    # ...

>>> tuple(b"ABC".iterbytes())
(b'A', b'B', b'C')
```

### 설계 논의 (Design discussion)

#### 0으로 초기화된 시퀀스를 생성하기 위해 시퀀스 반복에 의존하지 않는 이유 (Why not rely on sequence repetition to create zero-initialised sequences?)
0으로 초기화된 시퀀스는 시퀀스 반복을 통해 생성할 수 있습니다.
```python
>>> b'\x00' * 3
b'\x00\x00\x00'
>>> bytearray(b'\x00') * 3
bytearray(b'\x00\x00\x00')
```
그러나 `bytearray` 타입이 처음 설계될 때도 마찬가지였으며, 타입 생성자에 명시적인 지원을 추가하기로 결정되었습니다. 그 후 변경 불가능한 `bytes` 타입은 PEP 3137에서 도입될 때 그 기능을 상속받았습니다. 이 PEP는 원래의 설계 결정을 재검토하는 것이 아니라, 사용자들이 바이너리 시퀀스 생성자의 현재 동작을 때때로 혼란스러워하기 때문에 표기법을 변경하는 것입니다. 특히, `bytes(x)` (여기서 `x`는 정수)가 이 PEP의 `bytes.fromint(x)` 제안처럼 동작해야 한다는 합리적인 주장이 있습니다. 두 동작을 별도의 클래스 메서드로 제공함으로써 이러한 모호성을 피합니다.

#### 현재 해결 방법 (Current Workarounds)
거의 10년이 지난 후에도 바이트 이터레이션(byte iteration)을 위한 최선의 해결책에 대한 합의는 없는 것으로 보입니다.

#### 원래 제안되었던 빌트인 함수 생략 (Omitting the originally proposed builtin function)
스티어링 위원회(Steering Council)에 제출되었을 때, 이 PEP는 `bytes.fromint`와 동일한 동작을 하는 `bchr` 빌트인 함수를 도입할 것을 제안하여 Python 2의 `ord` / `chr` / `unichr` 트리오를 다른 명명 체계(`ord` / `bchr` / `chr`)로 재현했습니다. SC는 동일한 작업을 수행하는 두 가지 방법을 제공할 만큼 이 기능이 충분히 자주 필요하다고 생각하지 않았으며, 특히 그중 하나가 새로운 빌트인 함수일 때는 더욱 그렇다고 지적했습니다. 따라서 이 제안 부분은 `bytes.fromint` 대체 생성자와 중복되므로 삭제되었습니다. 이 메서드를 자주 사용하는 개발자는 대신 자신만의 `bchr = bytes.fromint` 별칭을 정의할 수 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.