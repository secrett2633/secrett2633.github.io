---
title: "[Final] PEP 515 - Underscores in Numeric Literals"
excerpt: "Python Enhancement Proposal 515: 'Underscores in Numeric Literals'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/515/
toc: true
toc_sticky: true
date: 2025-09-26 23:10:13+0900
last_modified_at: 2025-09-26 23:10:13+0900
published: true
---
> **원문 링크:** [PEP 515 - Underscores in Numeric Literals](https://peps.python.org/pep-0515/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 10-Feb-2016

## PEP 515 – 숫자 리터럴의 밑줄 (Underscores in Numeric Literals)

*   **작성자:** Georg Brandl, Serhiy Storchaka
*   **상태:** Final (최종)
*   **타입:** Standards Track (표준 트랙)
*   **생성일:** 2016년 2월 10일
*   **Python 버전:** 3.6

### 개요 및 제안 배경 (Abstract and Rationale)
이 PEP는 정수(integral), 부동 소수점(floating-point), 복소수(complex) 리터럴에서 숫자를 그룹화하기 위한 시각적 구분자로 밑줄(`_`)을 사용할 수 있도록 Python의 문법과 문자열-숫자 변환 생성자(number-from-string constructors)를 확장할 것을 제안합니다.

이는 다른 최신 프로그래밍 언어에서 흔히 볼 수 있는 기능으로, 긴 숫자 리터럴이나 16진수 표기법의 바이트(bytes) 또는 워드(words)처럼 값이 명확히 부분으로 나뉘어야 하는 리터럴의 가독성을 높이는 데 도움이 될 수 있습니다.

**예시:**
```python
# 천 단위로 숫자 그룹화
amount = 10_000_000.0

# 워드 단위로 16진수 주소 그룹화
addr = 0xCAFE_F00D

# 2진수 리터럴에서 니블(nibbles) 단위로 비트 그룹화
flags = 0b_0011_1111_0100_1110

# 문자열 변환 시에도 동일하게 적용
flags = int('0b_1111_0000', 2)
```


### 상세 사양 (Specification)

현재 제안된 내용은 숫자 리터럴에서 숫자 사이에 하나 또는 베이스 지정자(예: `0x`, `0b`) 뒤에 밑줄을 허용하는 것입니다. 이 밑줄은 어떤 의미론적(semantic) 의미도 가지지 않으며, 밑줄이 없는 것처럼 리터럴이 파싱됩니다.

#### 리터럴 문법 (Literal Grammar)
정수(integer), 부동 소수점(floating-point), 복소수(complex) 리터럴에서 밑줄 사용이 허용됩니다. 예를 들어, 정수 리터럴의 생성 규칙은 다음과 같이 확장됩니다:

*   `decinteger`: `nonzerodigit (["_"] digit)* | "0" (["_"] "0")*`
*   `bininteger`: `"0" ("b" | "B") (["_"] bindigit)+`
*   `octinteger`: `"0" ("o" | "O") (["_"] octdigit)+`
*   `hexinteger`: `"0" ("x" | "X") (["_"] hexdigit)+`

부동 소수점 및 복소수 리터럴에도 유사한 규칙이 적용됩니다.

#### 생성자 (Constructors)
밑줄 배치 규칙과 동일하게, 다음 생성자들에서 밑줄이 허용됩니다:

*   `int()` (모든 진법에서)
*   `float()`
*   `complex()`
*   `Decimal()`

#### 추가 변경 사항 (Further changes)
새로운 스타일의 숫자-문자열 서식 지정(number-to-string formatting) 언어도 확장되어, 현재 `,`만 지원되는 천 단위 구분자로 `_`를 사용할 수 있게 됩니다. 이는 가독성 높은 리터럴을 가진 코드를 쉽게 생성하는 데 사용될 수 있습니다. `b`, `x`, `o` 서식 지정자(format specifiers)의 경우, `_`는 4자리마다 그룹화하여 허용됩니다.

### 다른 언어의 사례 (Prior Art)
밑줄 그룹화를 허용하는 다른 언어들은 다양한 밑줄 배치 규칙을 구현하고 있습니다. 예를 들어, Ada, C#, C++14, D, Java, Julia, Perl 5, Ruby, Rust, Swift 등이 이 기능을 지원하며, 각 언어마다 허용되는 밑줄의 개수(단일 또는 연속)와 위치에 대한 규칙이 다릅니다.

### 대체 문법 (Alternative Syntax)

*   **밑줄 배치 규칙 (Underscore Placement Rules):** 밑줄 사용을 덜 제한적으로 허용하는 다양한 규칙들이 고려되었지만, 이 PEP의 문법은 일반적인 사용 사례를 포괄하고 스타일 가이드에서 권장하지 않을 문법을 허용하지 않도록 선택되었습니다.
*   **다른 구분자 (Different Separators):** 그룹화에 공백을 사용하거나 C++14에서 사용하는 아포스트로피(`'`)를 사용하는 방안도 논의되었지만, 예상치 못한 효과나 Python의 문자열 리터럴과의 충돌 등의 이유로 채택되지 않았습니다.

### 구현 (Implementation)
위에서 설명한 사양을 구현하는 예비 패치(preliminary patch)가 이슈 트래커에 게시되었습니다.

### 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.