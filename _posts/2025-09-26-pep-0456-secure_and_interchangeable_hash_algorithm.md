---
title: "[Final] PEP 456 - Secure and interchangeable hash algorithm"
excerpt: "Python Enhancement Proposal 456: 'Secure and interchangeable hash algorithm'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/456/
toc: true
toc_sticky: true
date: 2025-09-26 22:05:49+0900
last_modified_at: 2025-09-26 22:05:49+0900
published: true
---
> **원문 링크:** [PEP 456 - Secure and interchangeable hash algorithm](https://peps.python.org/pep-0456/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 27-Sep-2013

## PEP 456 – 안전하고 상호 교환 가능한 해시 알고리즘 (Secure and interchangeable hash algorithm)

### 초록 (Abstract)

이 PEP는 해시 무작위화(hash randomization) 문제를 영구적으로 해결하기 위해 기본 문자열(string) 및 바이트(bytes) 해시 알고리즘으로 SipHash를 도입할 것을 제안합니다. 또한, 해시 코드를 통합하고 쉽게 상호 교환할 수 있도록 Python의 C 코드에 대한 수정 사항도 제안합니다.

### 도입 배경 (Rationale)

최근의 노력에도 불구하고, CPython은 여전히 해시 충돌 서비스 거부(DoS) 공격(hash collision DoS attacks)에 취약합니다. 현재의 해시 알고리즘과 그 무작위화는 공격에 대해 탄력적이지 않습니다. 적절한 암호화 해시 함수만이 비밀 무작위화 키(secret randomization keys)의 추출을 막을 수 있습니다. Python 기반 서비스에 대한 실제 공격 사례는 아직 보고되지 않았지만, 이 약점은 반드시 해결되어야 합니다. Jean-Philippe Aumasson과 Daniel J. Bernstein은 현재 구현의 시드(seed)를 복구하는 방법을 이미 시연했습니다.

또한, 현재의 해시 알고리즘은 하드코딩(hard-coded)되어 있으며, 바이트(bytes)와 세 가지 다른 유니코드 표현(UCS1, UCS2, UCS4)에 대해 여러 번 구현되어 있습니다. 이로 인해 임베더(embedders)가 인터프리터의 많은 부분을 패치하고 재컴파일하지 않고는 다른 구현으로 교체하는 것이 불가능합니다. 임베더는 더 적합한 해시 함수를 선택하기를 원할 수도 있습니다.

마지막으로, 현재의 구현 코드는 성능이 좋지 않습니다. 일반적인 경우 사이클당 1~2바이트만 처리합니다. 최신 64비트 프로세서에서는 코드를 쉽게 조정하여 한 번에 8바이트를 처리할 수 있습니다.

이 PEP는 문자열(strings) 및 바이트(bytes)의 해시 코드에 세 가지 주요 변경 사항을 제안합니다:

1.  **SipHash 도입**: 암호화 속성에도 불구하고 빠르고 작은 SipHash가 기본 해시 알고리즘으로 도입됩니다. 잘 알려진 보안 및 암호화 전문가들이 설계했기 때문에 가까운 미래에도 안전하다고 가정할 수 있습니다. 64비트 데이터 타입이 없는 플랫폼을 위해 기존 FNV 코드는 유지됩니다. 이 알고리즘은 사이클당 더 큰 청크(chunks)를 처리하도록 최적화되었습니다.
2.  **해시 함수 통합**: 문자열(strings) 및 바이트(bytes)의 해시 계산은 `Objects/object.c` 및 `Objects/unicodeobject.c`에 있는 여러 전문화된 구현 대신 단일 API 함수로 이동합니다. 이 함수는 `void` 포인터와 길이를 받아 해시를 반환합니다.
3.  **컴파일 시 알고리즘 선택**: 알고리즘은 컴파일 시 선택할 수 있습니다. FNV는 모든 플랫폼에서 존재함을 보장합니다. SipHash는 대부분의 최신 시스템에서 사용할 수 있습니다.

### 해시 함수 요구사항 (Requirements for a hash function)

새로운 해시 함수는 다음 요구사항을 충족해야 합니다:

*   1바이트부터 최대 `ssize_t` 값까지 임의로 큰 메모리 블록을 해시할 수 있어야 합니다.
*   32비트 플랫폼에서는 최소 32비트, 64비트 플랫폼에서는 최소 64비트를 생성해야 합니다.
*   `hash(memoryview)`를 지원하기 위해 정렬되지 않은 메모리(unaligned memory)의 해시를 지원해야 합니다.
*   입력 길이가 결과에 영향을 미치는 것이 강력히 권장됩니다. (예: `hash(b'\00') != hash(b'\x00\x00')`)

내부 인터페이스 코드는 길이가 0인 입력 및 반환 값 `-1`에 대한 특수 사례를 구현합니다. 길이가 0인 입력은 해시 값 `0`에 매핑되고, 출력 `-1`은 `-2`에 매핑됩니다.

### 수정된 FNV를 사용한 현재 구현 (Current implementation with modified FNV)

CPython은 현재 Fowler-Noll-Vo 해시 함수(FNV)의 변형을 사용합니다. 이 변형은 일반적인 문자열에 대한 해시 충돌의 양과 비용을 줄이기 위해 수정되었습니다. 문자열의 첫 번째 문자는 두 번 추가되는데, 첫 번째는 7비트 시프트(bit shift)와 함께 추가됩니다. 입력 문자열의 길이는 최종 값과 XOR-ed 됩니다. 원래 FNV 알고리즘에서 벗어난 두 가지 모두 짧은 문자열에 대한 해시 충돌의 양을 줄입니다.

최근 [issue13703]에 따라 해시 값을 무작위화하기 위한 시도로 무작위 접두사(prefix)와 접미사(suffix)가 추가되었습니다. 해시 비밀(hash secret)을 보호하기 위해 코드는 여전히 길이가 0인 입력에 대해 `0`을 반환합니다.

FNV는 암호화 속성이 없는 간단한 곱셈 및 XOR 알고리즘입니다. 무작위화는 초기 해시 코드의 일부가 아니었지만, oCERT-2011-003 [ocert]에서 설명된 바와 같이 해시 충돌 공격에 대한 방어책으로 추가되었습니다. FNV는 암호화 해시 알고리즘이 아니고 `dict` 구현은 사이드 채널 분석(side channel analysis)에 대해 강화되지 않았기 때문에, 무작위화 비밀은 원격 공격자에 의해 계산될 수 있습니다. 이 PEP의 작성자는 비암호화 해시 함수의 본질상 비밀을 숨기는 것이 불가능하다고 강력히 믿습니다.

### 검토된 해싱 알고리즘 (Examined hashing algorithms)

이 PEP의 작성자는 현대적이고 빠르며 최첨단으로 간주되는 여러 해싱 알고리즘을 연구했습니다.

*   **SipHash**: 128비트 시드(seed)와 64비트 출력을 가진 암호화 의사 난수 함수(cryptographic pseudo random function)입니다. 짧은 메시지에 대한 속도에 최적화되어 있으며, 네트워크 트래픽 인증 및 해시 플러딩 DoS 공격(hash-flooding DoS attacks) 방어와 같은 응용 분야를 목표로 합니다. Ruby, Perl, OpenDNS, Rust, Redis, FreeBSD 등에서 사용됩니다. SipHash는 속도와 보안의 최상의 조합을 제공합니다.
*   **MurmurHash**: Austin Appleby가 개발한 비암호화 키 기반 해시 함수(non-cryptographic keyed hash function)입니다. Murmur3은 최신이며 빠른 MurmurHash의 변형입니다. 그러나 Aumasson, Bernstein 및 Boßlet은 Murmur3이 해시 충돌 공격에 탄력적이지 않다는 것을 보여주었습니다.
*   **CityHash**: Geoff Pike와 Jyrki Alakuijala가 Google을 위해 개발한 비암호화 해시 함수입니다. MurmurHash와 마찬가지로 CityHash에서도 비슷한 취약점이 발견되었습니다.
*   **DJBX33A**: Daniel J. Bernstein의 매우 간단한 곱셈 및 덧셈 알고리즘입니다. 빠르고 설정 비용이 낮지만 해시 충돌 공격에 안전하지 않습니다. 작은 문자열 해싱 최적화에 적합할 수 있습니다.
*   **기타(Other)**: HMAC, MD5, SHA-1 또는 SHA-2와 같은 암호화 알고리즘은 너무 느리고 설정 및 마무리 비용이 높으므로 이 목적에 적합하지 않다고 간주되었습니다.

결론적으로, SipHash는 속도와 보안의 최상의 조합을 제공합니다. 다른 주요 프로젝트의 개발자들도 동일한 결론에 도달했습니다.

### 작은 문자열 최적화 (Small string optimization)

SipHash24와 같은 해시 함수는 초기화 및 마무리 코드가 비용이 많이 들어 매우 짧은 문자열의 경우 알고리즘 속도를 지배할 수 있습니다. 반면에 Python은 짧은 문자열의 해시 값을 매우 자주 계산합니다. 특히 작은 문자열 해싱을 위한 간단하고 빠른 함수는 성능에 측정 가능한 영향을 미칠 수 있습니다.

그러나 DJBX33A와 같은 빠른 함수는 SipHash24만큼 안전하지 않습니다. 약 5~7바이트에서 잘라내기(cutoff)를 설정하면 적절한 안전 마진과 속도 향상을 동시에 제공할 수 있습니다. PEP의 참조 구현은 `Py_HASH_CUTOFF`를 사용하여 이러한 잘라내기를 제공합니다. 이 최적화는 여러 가지 이유로 기본적으로 비활성화되어 있습니다.

### C API 추가 (C API additions)

모든 C API 확장 수정은 안정적인 API(stable API)의 일부가 아닙니다.

*   **hash secret**: `_Py_HashSecret_t` 타입이 SipHash에 필요한 두 개의 64비트 unsigned integer 키를 지원하도록 변경됩니다. 이는 모든 아키텍처에서 24바이트의 보장된 크기를 가진 유니온(union)으로 정의됩니다.
*   **hash function definition**: 해시 함수 포인터, 이름, 해시 값의 내부 크기, 시드 입력의 크기를 포함하는 `PyHash_FuncDef` 구조체가 추가됩니다.
*   **autoconf**: `configure` 스크립트에 새로운 테스트가 추가되어 정렬된 메모리 접근(aligned memory access)이 필요한 플랫폼을 감지합니다. 또한, `---with-hash-algorithm` 옵션을 통해 사용자가 컴파일 시 해시 알고리즘을 선택할 수 있도록 합니다.
*   **hash function selection**: `Py_HASH_ALGORITHM` 매크로의 값에 따라 내부적으로 사용될 해시 알고리즘이 정의됩니다. `Py_HASH_SIPHASH24`, `Py_HASH_FNV` 또는 `Py_HASH_EXTERNAL` 중 하나로 설정될 수 있습니다. `Py_HASH_EXTERNAL`은 제3자가 컴파일 시 자신만의 구현을 제공할 수 있도록 합니다.

### Python API 추가 (Python API addition)

*   **sys module**: `sys.hash_info` 구조 시퀀스에 활성 해시 알고리즘 및 그 속성을 반영하는 더 많은 필드가 추가됩니다. (예: `algorithm`, `hash_bits`, `seed_bits`, `cutoff`).

### C 코드의 필수 수정사항 (Necessary modifications to C code)

*   `_Py_HashBytes()` (`Objects/object.c`): 바이트(bytes), `memoryview`, `datetime` 클래스를 위한 해싱 코드를 제공하는 내부 헬퍼(helper) 함수입니다. 이 함수는 `Python/pyhash.c`로 이동하고 `PyHash_Func.hash()`를 통해 해시 함수를 사용하도록 수정됩니다. 함수의 시그니처(signature)는 첫 번째 인수로 `const void *`를 받도록 변경됩니다.
*   `bytes_hash()` (`Objects/bytesobject.c`), `memory_hash()` (`Objects/memoryobject.c`): `_Py_HashBytes`를 계속 사용하지만, 타입 캐스트(type cast) 없이 사용하도록 수정됩니다. `memory_hash()`는 향후 정렬되지 않은 메모리 세그먼트(unaligned memory segments)의 해시를 지원해야 하는 유일한 함수입니다.
*   `unicode_hash()` (`Objects/unicodeobject.c`): 유니코드(unicode)의 `tp_hash` 슬롯 함수를 제공합니다. `PyUnicode_GET_LENGTH`가 유니코드 문자열의 길이가 아닌 옥텟(octets) 단위의 크기를 반환하므로, 길이는 내부 유니코드 종류의 크기와 곱해져야 합니다.
*   `generic_hash()` (`Modules/_datetimemodule.c`): `date`, `time`, `datetime` 타입의 `tp_hash` 슬롯을 위한 `_Py_HashBytes`의 래퍼(wrapper) 역할을 합니다. `date`, `time`, `datetime` 타입 구조체의 데이터 멤버는 `void*` 정렬이 되어 있지 않아 `memcpy()`를 통해 정렬된 버퍼로 복사하여 해결할 수 있습니다.

### 성능 (Performance)

일반적으로 SipHash24를 사용하는 PEP 456 코드는 FNV를 사용하는 기존 코드만큼 빠릅니다. SipHash24는 최신 컴파일러, CPU 및 대형 L1 캐시를 더 잘 활용하는 것으로 보입니다. 여러 벤치마크는 Intel Core i5 및 Intel Core i7 프로세서와 같은 64비트 CPU에서 약간의 속도 향상을 보여줍니다. 32비트 빌드 및 AMD Athlon X2와 같은 구형 CPU에서의 벤치마크는 SipHash24에서 약간 더 느립니다. 성능 향상 또는 감소는 너무 작아서 어떤 애플리케이션 코드에도 영향을 미치지 않을 것으로 예상됩니다.

### 하위 호환성 (Backwards Compatibility)

이 수정 사항은 기존 API를 변경하지 않습니다.
문자열(strings) 및 바이트(bytes)에 대한 `hash()`의 출력은 달라집니다. ASCII 유니코드(Unicode)와 ASCII 바이트(bytes)에 대한 해시 값은 동일하게 유지됩니다.

### 해시 충돌 DoS에 대한 대체 방안 (Alternative counter measures against hash collision DoS)

과거에 해시 충돌에 대한 세 가지 대체 방안이 논의되었지만, 이 PEP의 주제는 아닙니다.

1.  **해시 충돌 카운트**: `dict`가 해시 충돌을 세어 너무 많은 충돌이 발생하면 예외를 발생시키는 방안입니다.
2.  **새로운 데이터 구조 도입**: 최악의 경우 `O(log n)` 동작을 가진 레드-블랙-트리(red-black-tree) 또는 접두사 트리(prefix trees, trie)와 같은 새로운 데이터 구조를 도입하여 해시 충돌 공격의 근본 원인을 제거하는 방안입니다.

### 논의 (Discussion)

*   **Pluggable (플러그인 방식)**: 이 PEP의 첫 번째 초안은 런타임에 해시 알고리즘을 플러그인 방식으로 만들었습니다. 하지만 여러 핵심 커미터(core committers)에 의해 불필요한 복잡성으로 간주되어 이후 버전에서는 컴파일 타임(compile time) 설정으로 변경되었습니다.
*   **Non-aligned memory access (정렬되지 않은 메모리 접근)**: SipHash24 구현은 정렬되지 않은 메모리 문제를 무시하므로 정수 타입의 정렬을 요구하는 아키텍처에서는 작동하지 않는다는 비판을 받았습니다. 이 PEP는 이러한 특수 사례를 의도적으로 무시하며, 이러한 플랫폼에서는 SipHash24를 지원하지 않습니다. X86, X86_64, ARMv6+와 같은 모든 주요 플랫폼은 최소한의 또는 전혀 속도 영향 없이 정렬되지 않은 메모리를 처리할 수 있습니다.
*   **ASCII str / bytes hash collision**: PEP 393 구현 이후, 바이트(bytes)와 ASCII 텍스트는 동일한 메모리 레이아웃을 가집니다. 따라서 새로운 해싱 API는 `hash("ascii string") == hash(b"ascii string")`이라는 불변성을 유지합니다. 동일한 해시 값은 해시 충돌을 초래하며, 이는 혼합된 키(mixed keys)를 가진 `dict` 및 `set`에 대해 약간의 속도 저하를 유발합니다. 이 PEP는 해시 값을 변경하지 않습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.