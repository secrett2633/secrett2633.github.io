---
title: "[Final] PEP 3154 - Pickle protocol version 4"
excerpt: "Python Enhancement Proposal 3154: 'Pickle protocol version 4'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3154/
toc: true
toc_sticky: true
date: 2025-09-27 19:20:26+0900
last_modified_at: 2025-09-27 19:20:26+0900
published: true
---
> **원문 링크:** [PEP 3154 - Pickle protocol version 4](https://peps.python.org/pep-3154/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 11-Aug-2011

## PEP 3154 – Pickle 프로토콜 버전 4

*   **작성자:** Antoine Pitrou
*   **상태:** Final (최종)
*   **유형:** Standards Track (표준 트랙)
*   **생성일:** 2011년 8월 11일
*   **Python 버전:** 3.4

---

### 초록 (Abstract)

`pickle` 모듈을 사용하여 직렬화된 데이터는 Python 버전 간에 이식 가능해야 합니다. 또한, 최신 언어 기능과 구현별 기능도 지원해야 합니다. 이러한 이유로 `pickle` 모듈은 여러 프로토콜(현재 0부터 3까지)을 인식하며, 각 프로토콜은 다른 Python 버전에서 도입되었습니다. 낮은 번호의 프로토콜 버전을 사용하면 이전 Python 버전과 데이터를 교환할 수 있으며, 높은 번호의 프로토콜을 사용하면 최신 기능에 접근하고 때로는 더 효율적인 자원 사용(직렬화/역직렬화에 필요한 CPU 시간 및 데이터 전송에 필요한 디스크 크기/네트워크 대역폭)이 가능합니다.

### 도입 배경 (Rationale)

현재 최신 프로토콜인 프로토콜 3은 Python 3.0과 함께 등장했으며, 언어의 새로운 호환 불가능한 기능(주로 기본 Unicode 문자열 및 새로운 `bytes` 객체)을 지원합니다. 당시에는 다른 방식으로 프로토콜을 개선할 기회가 주어지지 않았습니다.

이 PEP는 새로운 pickle 프로토콜 버전에서 점진적인 개선 사항들을 추진하려는 시도입니다. 새로운 pickle 프로토콜의 도입은 드문 일이므로, 가능한 한 많은 개선 사항을 모으기 위해 PEP 프로세스가 활용되었습니다.

### 제안된 변경 사항 (Proposed changes)

#### 프레이밍 (Framing)

기존에는 스트림에서 객체를 역직렬화할 때( `loads()` 대신 `load()` 호출) 파일과 유사한 객체에서 많은 작은 `read()` 호출이 발생하여 잠재적으로 성능에 큰 영향을 미칠 수 있었습니다.

반면, 프로토콜 4는 바이너리 프레이밍 기능을 제공합니다. pickle의 일반적인 구조는 다음과 같습니다:

```
+------+------+
| 0x80 | 0x04 | 프로토콜 헤더 (2 bytes)
+------+------+-----------+
| OP   | FRAME opcode (1 byte)
+------+------+-----------+
| MM MM MM MM MM MM MM MM | 프레임 크기 (8 bytes, little-endian)
+------+------------------+
| .... | 첫 번째 프레임 내용 (M bytes)
+------+
| OP   | FRAME opcode (1 byte)
+------+------+-----------+
| NN NN NN NN NN NN NN NN | 프레임 크기 (8 bytes, little-endian)
+------+------------------+
| .... | 두 번째 프레임 내용 (N bytes)
+------+
etc.
```

구현을 단순하게 유지하기 위해 pickle opcode가 프레임 경계를 넘어가는 것은 금지됩니다. 피클러(pickler)는 그러한 pickle을 생성하지 않도록 주의하고, 언피클러(unpickler)는 이를 거부합니다. 또한, "마지막 프레임" 마커는 없습니다. 마지막 프레임은 단순히 `STOP` opcode로 끝나는 프레임입니다. 잘 작성된 C 구현은 프레이밍 계층에 추가적인 메모리 복사가 필요 없어 전반적인 (역)직렬화 효율성을 유지합니다.

**참고:** 피클러가 pickle 스트림을 프레임으로 분할하는 방법은 구현 세부 사항입니다. 예를 들어, 약 64 KiB에 도달하자마자 프레임을 "닫는" 것은 성능과 pickle 크기 오버헤드 모두에 합리적인 선택입니다.

#### 모든 opcode에 대한 바이너리 인코딩 (Binary encoding for all opcodes)

프로토콜 3에서 여전히 사용되는 `GLOBAL` opcode는 pickle 스트림에서 줄 바꿈(newlines)을 찾는 소위 "텍스트" 모드를 사용합니다. 이는 또한 바이너리 프레이밍의 구현을 복잡하게 만듭니다. 프로토콜 4는 `GLOBAL` opcode의 사용을 금지하고, 스택에서 피연산자를 가져오는 새로운 opcode인 `STACK_GLOBAL`로 대체합니다.

#### 더 많은 "조회 가능한" 객체 직렬화 (Serializing more “lookupable” objects)

기본적으로 pickle은 모듈-전역 함수와 클래스만 직렬화할 수 있습니다. 바인딩되지 않은 메서드(unbound methods)와 같은 다른 종류의 객체를 지원하는 것은 일반적인 요청입니다. 실제로 바인딩된 메서드(bound methods)와 같은 일부 객체에 대한 서드 파티 지원은 `multiprocessing` 모듈에 구현되어 있습니다.

PEP 3155의 `__qualname__` 속성은 이름으로 더 많은 객체를 조회할 수 있게 합니다. `STACK_GLOBAL` opcode가 점(dot)으로 구분된 이름을 허용하면 표준 pickle 구현이 이러한 모든 종류의 객체를 지원할 수 있게 됩니다.

#### 대형 객체를 위한 64비트 opcode (64-bit opcodes for large objects)

현재 프로토콜 버전은 다양한 내장 타입( `str`, `bytes`)의 객체 크기를 32비트 정수로 내보냅니다. 이는 대용량 데이터의 직렬화를 금지합니다. 매우 큰 `bytes` 및 `str` 객체를 지원하기 위해 새로운 opcode가 필요합니다.

#### `set` 및 `frozenset`을 위한 네이티브 opcode (Native opcodes for sets and frozensets)

많은 일반적인 내장 타입(예: `str`, `bytes`, `dict`, `list`, `tuple`)은 직렬화 및 역직렬화 시 자원 소비를 개선하기 위한 전용 opcode를 가지고 있습니다. 그러나 `set` 및 `frozenset`은 그렇지 않습니다. 이러한 opcode를 추가하는 것은 명백한 개선 사항입니다. 또한, 전용 `set` 지원은 자기 참조 `set`을 pickle할 수 없던 현재의 문제를 해결하는 데 도움이 될 수 있습니다 [2, cite: 1].

#### 키워드 인수로 `__new__` 호출 (Calling __new__ with keyword arguments)

현재, `__new__` 메서드가 키워드 전용 인수를 사용하도록 요구하는 클래스는 pickle될 수 없습니다(또는 오히려 역직렬화될 수 없습니다) [3, cite: 1]. 새로운 특수 메서드(`__getnewargs_ex__`)와 새로운 opcode(`NEWOBJ_EX`)가 모두 필요합니다. `__getnewargs_ex__` 메서드가 존재한다면, 두 개의 항목을 가진 튜플 `(args, kwargs)`를 반환해야 합니다. 여기서 첫 번째 항목은 위치 인수(positional arguments)의 튜플이고, 두 번째 항목은 클래스의 `__new__` 메서드에 대한 키워드 인수(keyword arguments)의 딕셔너리입니다.

#### 더 나은 문자열 인코딩 (Better string encoding)

짧은 `str` 객체는 현재 길이가 4바이트 정수로 인코딩되어 낭비가 심합니다. 1바이트 길이 접두사를 가진 특정 opcode는 많은 pickle의 크기를 줄일 것입니다.

#### 더 작은 메모화 (Smaller memoization)

`PUT` opcode는 스택의 최상단 항목이 메모 딕셔너리의 어느 항목에 메모화될지 선택하기 위한 명시적인 인덱스를 모두 필요로 합니다. 그러나 실제로는 이러한 숫자는 순차적으로 할당됩니다. 새로운 opcode인 `MEMOIZE`는 대신 스택의 최상단 항목을 메모 딕셔너리의 현재 크기와 동일한 인덱스에 저장합니다. 이는 모든 비원자적 데이터 타입에 대해 `PUT` opcode가 방출되므로 더 짧은 pickle을 가능하게 합니다.

### 새로운 opcode 요약 (Summary of new opcodes)

다음은 제안된 구현의 상태를 반영합니다:

*   **`FRAME`**: 새로운 프레임을 도입합니다 (8바이트 프레임 크기와 프레임 내용이 뒤따릅니다).
*   **`SHORT_BINUNICODE`**: 1바이트 크기 접두사(따라서 256바이트 미만)를 가진 UTF8 인코딩 `str` 객체를 스택에 푸시합니다.
*   **`BINUNICODE8`**: 8바이트 크기 접두사를 가진 UTF8 인코딩 `str` 객체(2^32바이트보다 긴 문자열로, `BINUNICODE`를 사용하여 직렬화할 수 없는 경우)를 스택에 푸시합니다.
*   **`BINBYTES8`**: 8바이트 크기 접두사를 가진 `bytes` 객체(2^32바이트보다 긴 `bytes` 객체로, `BINBYTES`를 사용하여 직렬화할 수 없는 경우)를 스택에 푸시합니다.
*   **`EMPTY_SET`**: 새로운 빈 `set` 객체를 스택에 푸시합니다.
*   **`ADDITEMS`**: 스택 최상단 항목들을 `set`에 추가합니다 (`EMPTY_SET`과 함께 사용).
*   **`FROZENSET`**: 스택 최상단 항목들로부터 `frozenset` 객체를 생성하고 스택에 푸시합니다.
*   **`NEWOBJ_EX`**: 스택 최상단 세 항목 `cls`, `args`, `kwargs`를 가져와 `cls.__new__(*args, **kwargs)` 호출 결과를 스택에 푸시합니다.
*   **`STACK_GLOBAL`**: 스택 최상단 두 항목 `module_name`과 `qualname`을 가져와 `module_name`이라는 모듈에서 점(dot)으로 구분된 `qualname`을 조회한 결과를 스택에 푸시합니다.
*   **`MEMOIZE`**: 스택 최상단 객체를 메모 딕셔너리에 메모 딕셔너리의 현재 크기와 동일한 인덱스로 저장합니다.

### 대안 아이디어 (Alternative ideas)

#### 프리페칭 (Prefetching)

Serhiy Storchaka는 알려진 pickle 청크를 명시적으로 선언하기 위해 프레이밍을 특별한 `PREFETCH` opcode(2 또는 4바이트 인수 포함)로 대체할 것을 제안했습니다. 대용량 데이터는 이러한 청크 외부에 pickle될 수 있습니다. 순진한(naïve) 언피클러는 `PREFETCH` opcode를 건너뛰고도 pickle을 제대로 디코딩할 수 있어야 하지만, 적절한 오류 처리를 위해서는 `PREFETCH` 길이가 opcode 경계에 해당하는지 확인해야 할 것입니다.

### 감사 (Acknowledgments)

*   Alexandre Vassalotti
*   Serhiy Storchaka
*   Stefan Mihaila

### 참고 자료 (References)

*   “pickle not 64-bit ready”: [http://bugs.python.org/issue11564](http://bugs.python.org/issue11564)
*   “Cannot pickle self-referencing sets”: [http://bugs.python.org/issue9269](http://bugs.python.org/issue9269)
*   “pickle/copyreg doesn't support keyword only arguments in __new__”: [http://bugs.python.org/issue4727](http://bugs.python.org/issue4727)
*   “pickle should support methods”: [http://bugs.python.org/issue9276](http://bugs.python.org/issue9276)
*   Lib/multiprocessing/forking.py: [http://hg.python.org/cpython/file/baea9f5f973c/Lib/multiprocessing/forking.py#l54](http://hg.python.org/cpython/file/baea9f5f973c/Lib/multiprocessing/forking.py#l54)
*   Implement PEP 3154, by Alexandre Vassalotti [http://bugs.python.org/issue17810](http://bugs.python.org/issue17810)
*   Implement PEP 3154, by Stefan Mihaila [http://bugs.python.org/issue15642](http://bugs.python.org/issue15642)

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.