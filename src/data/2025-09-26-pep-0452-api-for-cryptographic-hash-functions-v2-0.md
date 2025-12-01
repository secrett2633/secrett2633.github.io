---
title: "[Final] PEP 452 - API for Cryptographic Hash Functions v2.0"
excerpt: "Python Enhancement Proposal 452: 'API for Cryptographic Hash Functions v2.0'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/452/
toc: true
toc_sticky: true
date: 2025-09-26 22:03:16+0900
last_modified_at: 2025-09-26 22:03:16+0900
published: true
---
> **원문 링크:** [PEP 452 - API for Cryptographic Hash Functions v2.0](https://peps.python.org/pep-0452/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 15-Aug-2013

## PEP 452 – 암호화 해시 함수용 API v2.0 번역 및 정리

### 개요 (Abstract)

MD5 또는 SHA와 같은 암호화 해싱 알고리즘을 구현하는 여러 모듈이 존재합니다. 이 PEP는 이러한 알고리즘들을 위한 표준 API를 지정하여, 여러 구현체 간에 쉽게 전환할 수 있도록 하는 것을 목표로 합니다.

### 명세 (Specification)

모든 해싱 모듈은 동일한 인터페이스를 제공해야 합니다. 추가적인 메서드나 변수를 더할 수 있지만, 이 문서에 설명된 요소들은 항상 존재해야 합니다.

#### 해시 함수 모듈 정의:

1.  **`new([string])` (키가 없는 해시)**
    **`new(key, [string], [digestmod])` (키가 있는 해시)**
    새로운 해싱 객체를 생성하여 반환합니다.
    *   첫 번째 형식은 MD5나 SHA와 같이 키가 없는 해시에 사용됩니다.
    *   HMAC과 같이 키가 있는 해시의 경우, `key`는 사용할 키를 담은 `bytes-like object`를 포함하는 필수 매개변수입니다.
    *   두 경우 모두, 선택적 `string` 매개변수가 제공되면, `obj.update(string)`이 호출된 것처럼 객체의 초기 상태로 즉시 해싱됩니다.
    *   해싱 객체를 생성한 후에는 `update()` 메서드를 사용하여 임의의 바이트를 객체에 공급할 수 있으며, `digest()` 메서드를 호출하여 언제든지 해시 값을 얻을 수 있습니다.
    *   매개변수 이름은 `string`이지만, 해싱 객체는 8비트 데이터만 처리합니다. `key`와 `string` 모두 `bytes-like object` (예: `bytes`, `bytearray`)여야 합니다. Python 3.x에서는 텍스트(유니코드)는 더 이상 지원되지 않습니다.
    *   이 함수에 임의의 추가 키워드 인수를 추가할 수 있지만, 제공되지 않을 경우 합리적인 기본값이 사용되어야 합니다.

2.  **`digest_size` (모듈 변수)**
    정수 값으로, 이 모듈이 생성하는 해싱 객체가 생성하는 다이제스트(digest)의 크기를 바이트 단위로 나타냅니다. 가변 출력 크기를 가진 해시는 이 변수를 `None`으로 설정합니다.

#### 해싱 객체 요구 사항:

1.  **`digest_size` (객체 속성)**
    모듈 수준의 `digest_size` 변수와 동일하게, 해싱 객체가 생성하는 다이제스트의 크기를 바이트 단위로 측정합니다. 해시가 가변 출력 크기를 갖는 경우, 이 출력 크기는 해싱 객체가 생성될 때 선택되어야 하며, 이 속성에는 선택된 크기가 포함되어야 합니다. 따라서 이 속성에 `None`은 허용되지 않습니다.

2.  **`block_size`**
    정수 값 또는 `NotImplemented`입니다. 해시 알고리즘의 내부 블록 크기를 바이트 단위로 나타냅니다. `HMAC` 모듈에서 비밀 키를 `digest_size`로 채우거나 `digest_size`보다 길면 비밀 키를 해싱하는 데 사용됩니다. 해시 알고리즘에 대한 `HMAC` 알고리즘이 표준화되지 않은 경우 `NotImplemented`를 반환합니다.

3.  **`name`**
    텍스트 문자열 값으로, 해싱 알고리즘의 표준화된 소문자 이름입니다. 이 이름은 `hashlib.new`에 적합한 매개변수여야 합니다.

#### 해싱 객체 메서드 요구 사항:

1.  **`copy()`**
    이 해싱 객체의 독립적인 복사본을 반환합니다. 이 복사본에 대한 업데이트는 원래 객체에 영향을 미치지 않습니다.

2.  **`digest()`**
    이 해싱 객체의 해시 값을 8비트 데이터를 포함하는 `bytes`로 반환합니다. 이 함수에 의해 객체는 어떤 식으로든 변경되지 않으며, 이 함수를 호출한 후에도 객체를 계속 업데이트할 수 있습니다.

3.  **`hexdigest()`**
    이 해싱 객체의 해시 값을 16진수 숫자를 포함하는 문자열로 반환합니다. `a`부터 `f`까지의 숫자는 소문자를 사용해야 합니다. `.digest()` 메서드와 마찬가지로, 이 메서드는 객체를 변경해서는 안 됩니다.

4.  **`update(string)`**
    `bytes-like object`인 `string`을 해싱 객체의 현재 상태로 해싱합니다. `update()`는 해싱 객체의 수명 동안 여러 번 호출될 수 있습니다.

### 배경 (Rationale)

*   **`digest_size`는 바이트 단위:** 해시 알고리즘 크기는 보통 비트 단위로 인용되지만(`MD5`는 128비트 알고리즘), `digest_size`는 바이트 단위로 측정됩니다. 이는 파일에서 탐색하거나 출력 문자열의 길이를 계산하는 등 바이트 길이가 더 자주 필요하기 때문입니다. 비트 단위 크기가 필요한 소수의 사람들은 `digest_size`에 8을 곱해야 합니다.
*   **`update()` 메서드 이름 유지:** `update()` 메서드 이름을 `append()`로 변경하자는 제안이 있었지만, 이 메서드는 실제 해싱 객체의 현재 상태를 업데이트하는 역할을 하며, Python에 포함된 `md5` 및 `sha` 모듈에서 이미 `update()`를 사용하고 있으므로 이름을 변경하지 않는 것이 가장 간단하다고 판단되었습니다.
*   **키가 있는 해시의 생성자 인수 순서:** 키가 있는 해시의 생성자 인수는 `key`가 필수 매개변수이므로 일반적으로 필수가 먼저 오도록 `new(key, [string])` 순서가 결정되었습니다. 이는 `string` 매개변수가 첫 번째 위치에서 두 번째로 이동하는 것을 의미합니다.

### 버전 1.0에서 2.0으로의 변경 사항 (Changes from Version 1.0 to Version 2.0)

API for Cryptographic Hash Functions의 버전 2.0은 API의 일부 측면을 명확히 하고 최신 상태로 만들었습니다. 또한 사실상 표준으로 이미 대부분의 구현체에서 제공되던 측면을 공식화했습니다.

버전 2.0은 다음의 새로운 속성을 도입했습니다.

*   **`name`** : 이슈 18532에 의해 `name` 속성이 필수가 되었습니다.
*   **`block_size`** : 새로운 버전은 반환 값 `NotImplemented`가 `HMAC` 지원을 방지하도록 지정합니다.

버전 2.0은 Python 3.0에서 이진 데이터와 텍스트 데이터의 분리를 고려했습니다. `new()` 및 `update()`의 `string` 인수와 `key` 인수는 `bytes-like objects`여야 합니다. Python 2.x에서는 해싱 객체가 ASCII 전용 유니코드를 지원할 수도 있습니다. 인수의 실제 이름은 공용 API의 일부이므로 변경되지 않았습니다.

### 일반적인 해싱 알고리즘에 대한 권장 이름 (Recommended names for common hashing algorithms)

| Algorithm Variant | Recommended name |
| :---------------- | :--------------- |
| MD5               | `md5`            |
| RIPEMD-160        | `ripemd160`      |
| SHA-1             | `sha1`           |
| SHA-224           | `sha224`         |
| SHA-256           | `sha256`         |
| SHA-384           | `sha384`         |
| SHA-512           | `sha512`         |
| SHA-3-224         | `sha3_224`       |
| SHA-3-256         | `sha3_256`       |
| SHA-3-384         | `sha3_384`       |
| SHA-3-512         | `sha3_512`       |
| WHIRLPOOL         | `whirlpool`      |

### 변경 이력 (Changes)

*   2001-09-17: `clear()`를 `reset()`으로 이름 변경; 객체에 `digest_size` 속성 추가; `.hexdigest()` 메서드 추가.
*   2001-09-20: `reset()` 메서드 완전히 제거.
*   2001-09-28: 가변 크기 해시에 대해 `digest_size`를 `None`으로 설정.
*   2013-08-15: `block_size` 및 `name` 속성 추가; `string`이 실제로는 `bytes-like objects`를 의미함을 명확화.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.