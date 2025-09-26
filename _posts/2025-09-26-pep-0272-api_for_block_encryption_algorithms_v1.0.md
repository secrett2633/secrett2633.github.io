---
title: "[Final] PEP 272 - API for Block Encryption Algorithms v1.0"
excerpt: "Python Enhancement Proposal 272: 'API for Block Encryption Algorithms v1.0'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/272/
toc: true
toc_sticky: true
date: 2025-09-26 17:52:18+0900
last_modified_at: 2025-09-26 17:52:18+0900
published: true
---
> **원문 링크:** [PEP 272 - API for Block Encryption Algorithms v1.0](https://peps.python.org/pep-0272/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 18-Sep-2001

파이썬 PEP 272: 블록 암호화 알고리즘을 위한 API v1.0

## 개요
이 문서는 DES 또는 Rijndael과 같은 비밀 키(secret-key) 블록 암호화 알고리즘을 위한 표준 API를 정의합니다. 이를 통해 다양한 알고리즘 및 구현 간의 전환을 용이하게 합니다.

## 소개
암호화 알고리즘은 가변 키(key)에 따라 입력 데이터(평문, plaintext)를 변환하여 암호문(ciphertext)을 생성합니다. 이 변환은 키를 아는 경우에만 쉽게 되돌릴 수 있습니다. 키는 매우 큰 가능한 키 공간에서 선택된 비트(bit) 시퀀스입니다. 암호화 알고리즘에는 블록 암호(block ciphers)와 스트림 암호(stream ciphers)의 두 가지 유형이 있습니다.

블록 암호는 고정된 크기(자주 8 또는 16 바이트)의 멀티바이트 입력을 암호화하며, 다양한 피드백 모드(feedback modes)로 작동할 수 있습니다. 이 PEP에서 지원되는 피드백 모드는 다음과 같습니다:

| 숫자 | 상수        | 설명              |
|----|-------------|-------------------|
| 1  | `MODE_ECB`  | Electronic Code Book |
| 2  | `MODE_CBC`  | Cipher Block Chaining |
| 3  | `MODE_CFB`  | Cipher Feedback   |
| 5  | `MODE_OFB`  | Output Feedback   |
| 6  | `MODE_CTR`  | Counter           |

이러한 모드는 NIST 발행물 SP 800-38A에 설명된 대로 구현되어야 합니다. 처음 세 가지 피드백 모드에 대한 설명은 Bruce Schneier의 저서 Applied Cryptography에서도 찾을 수 있습니다.

참고로 숫자 4는 RFC 2440("OpenPGP Message Format")에 설명된 CFB의 변형인 `MODE_PGP`를 위해 예약되어 있습니다. 이 모드는 모든 블록 암호화에 필수적으로 요구될 만큼 중요하게 간주되지는 않지만, 지원하는 것은 좋은 추가 기능입니다.

엄밀히 말해 스트림 암호는 데이터를 비트 단위로 암호화합니다. 실제로 스트림 암호는 문자 단위로 작동합니다. 이 PEP는 블록 암호에 대한 인터페이스를 지정하는 것을 목표로 하며, 스트림 암호는 `block_size`를 1로 고정함으로써 여기에 설명된 인터페이스를 지원할 수 있습니다. 또한 피드백 모드는 스트림 암호에 적합하지 않으므로, 유일하게 합리적인 피드백 모드는 `ECB` 모드가 될 것입니다.

## 사양 (Specification)
암호화 모듈은 이 PEP에 설명된 것 외에 추가 함수, 메서드 및 속성을 추가할 수 있습니다. 그러나 모듈이 이 PEP 준수를 주장하려면 이 PEP에 설명된 모든 기능이 존재해야 합니다.

비밀 키(secret-key) 암호화 모듈은 다음 함수를 정의해야 합니다:

`new(key, mode, [IV], **kwargs)`

이 함수는 문자열 `key`에 포함된 비밀 키를 사용하고 위에 표에 있는 상수 중 하나여야 하는 피드백 모드 `mode`를 사용하여 암호화 객체(ciphering object)를 반환합니다.

`mode`가 `MODE_CBC` 또는 `MODE_CFB`인 경우, `IV`는 반드시 제공되어야 하며, 블록 크기와 동일한 길이의 문자열이어야 합니다. `IV` 값을 제공하지 않으면 `ValueError` 예외가 발생합니다.

알고리즘에 따라 모듈은 이 함수에 추가 키워드 인수(keyword arguments)를 지원할 수 있습니다. 이 PEP에서 지정하는 일부 키워드 인수도 있으며, 모듈은 추가 키워드 인수를 자유롭게 추가할 수 있습니다. 주어진 키워드에 대해 값이 제공되지 않으면 안전한 기본값(secure default value)이 사용되어야 합니다. 예를 들어, 알고리즘이 1에서 16 사이의 라운드(rounds) 수를 선택할 수 있고, 1라운드 암호화는 안전하지 않으며 8라운드 암호화가 안전하다고 여겨진다면, `rounds`의 기본값은 8 이상이어야 합니다. (모듈 구현자는 이 예에서 16과 같이 매우 느리지만 안전한 값을 선택할 수도 있습니다. 이 결정은 구현자에게 달려 있습니다).

다음 표는 이 PEP에 의해 정의된 키워드 인수들을 나열합니다:

| 키워드       | 의미                                                                    |
|------------|-------------------------------------------------------------------------|
| `counter`  | 카운터 블록을 반환하는 호출 가능한 객체 (`CTR` 모드 전용)                  |
| `rounds`   | 사용할 암호화 라운드 수                                                 |
| `segment_size` | 데이터 및 암호문 세그먼트의 크기 (비트 단위; `CFB` 모드 전용) |

`Counter` 피드백 모드는 출력을 생성하는 데 사용되는 카운터(counters)라고 불리는 입력 블록 시퀀스를 필요로 합니다. `mode`가 `MODE_CTR`일 때, `counter` 키워드 인수는 반드시 제공되어야 하며, 그 값은 함수나 메서드와 같은 호출 가능한 객체(callable object)여야 합니다. 이 호출 가능한 객체에 대한 연속적인 호출은 `block_size` 길이의 반복되지 않는 문자열 시퀀스를 반환해야 합니다. (NIST 발행물의 부록 B는 이러한 시퀀스를 생성하는 방법을 제공하지만, 이는 이 PEP의 범위를 벗어납니다).

`CFB` 모드는 `segment_size` 비트 길이의 평문 및 암호문 세그먼트에서 작동합니다. 따라서 이 모드를 사용할 때는 입력 및 출력 문자열의 길이가 `segment_size` 비트의 배수여야 합니다. `segment_size`는 1에서 `block_size` * 8 사이의 정수여야 합니다 (8을 곱하는 이유는 `block_size`가 바이트 단위로 측정되기 때문입니다). 이 매개변수의 기본값은 `block_size` * 8이어야 합니다. 구현자는 단순화를 위해 `segment_size`를 8의 배수로 제한할 수 있지만, 일반성을 위해 임의의 값을 지원하는 것이 권장됩니다.

비밀 키 암호화 모듈은 두 가지 변수를 정의해야 합니다:

*   `block_size`: 정수 값으로, 이 모듈이 암호화하는 블록의 크기를 바이트 단위로 측정합니다. 모든 피드백 모드에서 `encrypt()` 및 `decrypt()`에 전달되는 문자열의 길이는 블록 크기의 배수여야 합니다.
*   `key_size`: 정수 값으로, 이 모듈이 요구하는 키의 크기를 바이트 단위로 측정합니다. `key_size`가 `None`이면, 알고리즘은 가변 길이 키를 허용합니다. 이는 모듈이 임의의 길이의 키를 허용하거나, 16, 24, 또는 32 바이트와 같이 몇 가지 다른 가능한 길이를 가질 수 있음을 의미할 수 있습니다. 길이 0의 키(즉, null 문자열 `''`)는 가변 길이 키로 전달할 수 없습니다.

암호 객체(Cipher objects)는 두 가지 속성을 가져야 합니다:

*   `block_size`: 이 객체에 의해 암호화되는 블록의 크기와 동일한 정수 값입니다. 가변 블록 크기를 가진 알고리즘의 경우, 이 값은 이 객체에 대해 선택된 블록 크기와 같습니다.
*   `IV`: 암호 피드백 모드를 시작하는 데 사용될 초기 값(initial value)을 포함합니다. 항상 정확히 한 블록 길이의 문자열입니다. 문자열을 암호화하거나 복호화한 후, 이 값은 수정된 피드백 텍스트를 반영하도록 업데이트됩니다. 이는 읽기 전용이며, 새 값을 할당할 수 없습니다.

암호 객체는 다음 메서드를 요구합니다:

*   `decrypt(string)`: 객체의 키 종속 데이터와 적절한 피드백 모드를 사용하여 `string`을 복호화합니다. 문자열의 길이는 알고리즘의 블록 크기 또는 `CFB` 모드의 경우 세그먼트 크기의 정확한 배수여야 합니다. 평문(plaintext)을 포함하는 문자열을 반환합니다.
*   `encrypt(string)`: 객체의 키 종속 데이터와 적절한 피드백 모드를 사용하여 비어있지 않은 문자열을 암호화합니다. 문자열의 길이는 알고리즘의 블록 크기 또는 `CFB` 모드의 경우 세그먼트 크기의 정확한 배수여야 합니다. 암호문(ciphertext)을 포함하는 문자열을 반환합니다.

다음은 'DES'라는 모듈을 사용한 예시입니다:

```python
>>> import DES
>>> obj = DES.new('abcdefgh', DES.MODE_ECB)
>>> plaintext = "Guido van Rossum is a space alien."
>>> len(plaintext)
34
>>> obj.encrypt(plaintext)
Traceback (innermost last):
  File "<stdin>", line 1, in ?
ValueError: Strings for DES must be a multiple of 8 in length
>>> ciphertext = obj.encrypt(plaintext + 'XXXXXX') # 패딩 추가 (Add padding)
>>> ciphertext
'\021,\343Nq\214DY\337T\342pA\372\255\311s\210\363,\300j\330\250\312\347\342I\3215w\03561\303dgb/\006'
>>> obj.decrypt(ciphertext)
'Guido van Rossum is a space alien.XXXXXX'
```

## 변경 사항 (Changes)
*   **2002년 4월:** 스트림 암호에 대한 참조를 제거하고, PEP 제목을 변경했으며, 피드백 모드 상수에 `MODE_` 접두사를 붙였습니다. `PGP` 피드백 모드를 제거하고, `CTR` 및 `OFB` 피드백 모드를 추가했습니다. 숫자가 바이트 단위로 측정되는지 비트 단위로 측정되는지를 명확히 했습니다.
*   **2002년 9월:** "arbitrary-length" 대신 "variable-length keys"를 사용하여 키 길이 논의를 명확히 했습니다.

## 감사의 글 (Acknowledgements)
이 PEP에 대한 의견을 주신 python-crypto 목록 독자들에게 감사드립니다.

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain)에 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.