---
title: "[Final] PEP 626 - Precise line numbers for debugging and other tools."
excerpt: "Python Enhancement Proposal 626: 'Precise line numbers for debugging and other tools.'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/626/
toc: true
toc_sticky: true
date: 2025-09-27 00:29:42+0900
last_modified_at: 2025-09-27 00:29:42+0900
published: true
---
> **원문 링크:** [PEP 626 - Precise line numbers for debugging and other tools.](https://peps.python.org/pep-0626/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 15-Jul-2020


# PEP 626 – 디버깅 및 기타 도구를 위한 정밀한 줄 번호 (Precise line numbers for debugging and other tools)

**저자:** Mark Shannon
**BDFL-Delegate:** Pablo Galindo
**상태:** Final
**타입:** Standards Track
**생성일:** 2020년 7월 15일
**Python 버전:** 3.10

## 개요 (Abstract)

이 PEP는 Python이 트레이싱(tracing)이 활성화되었을 때, 실행된 모든 코드 라인에 대해 "line" 트레이싱 이벤트를 생성하고, 실행된 코드 라인에 대해서만 이벤트를 생성하도록 보장해야 한다고 명시합니다.

프레임 객체의 `f_lineno` 속성은 항상 예상된 줄 번호를 포함해야 합니다. 프레임 실행 중에는 현재 실행 중인 소스 코드의 줄 번호가 되어야 하며, 프레임이 완료된 후에는 마지막으로 실행된 소스 코드의 줄 번호가 되어야 합니다.

정확한 줄 번호를 보장하기 위한 부수적인 효과로, 일부 바이트코드는 의미 있는 줄 번호가 없는 "인공적인(artificial)" 것으로 표시되어야 합니다. 도구를 돕기 위해, 바이트코드와 소스 간의 매핑을 설명하는 새로운 `co_lines` 속성이 추가될 것입니다.

## 동기 (Motivation)

`sys.settrace` 및 관련 도구 사용자들은 모든 코드 라인에 대해 트레이싱 이벤트가 생성되며, 실제 코드에 대해서만 이벤트가 생성된다는 점을 신뢰할 수 있어야 합니다. 또한, `f_lineno`의 줄 번호가 정확하다고 가정할 수 있어야 합니다.

현재 구현은 대부분 이러한 역할을 수행하지만, 몇몇 경우에 실패합니다. 이는 도구에서 해결 방법을 필요로 하며, 다른 Python 구현체(alternative Python implementations)에 불편함을 줍니다. 이러한 보장은 CPython 구현자들에게도 장기적으로 이점을 제공하는데, 현재 동작은 명확하지 않고 몇몇 특이한 코너 케이스가 있기 때문입니다.

## 근거 (Rationale)

예상대로 줄 이벤트가 생성되도록 보장하기 위해, 현재 형태의 `co_lnotab` 속성은 더 이상 줄 번호 정보의 "진실의 원천(source of truth)"이 될 수 없습니다.

`co_lnotab` 속성을 수정하려고 시도하기보다는, 바이트코드 오프셋과 소스 코드 줄에 대한 이터레이터를 반환하는 새로운 `co_lines()` 메서드가 추가될 것입니다.

정확한 줄 번호 정보를 활성화하기 위해 바이트코드가 올바르게 주석(annotated) 처리되도록 보장하는 것은 일부 바이트코드가 인공적인 것으로 표시되어야 하며 줄 번호가 없어야 함을 의미합니다.

기존 도구를 손상시키지 않도록 주의해야 합니다. 최소한의 손상을 위해 `co_lnotab` 속성은 유지되지만, 필요할 때 지연 생성(lazily generated)됩니다.

## 명세 (Specification)

줄 이벤트와 `f_lineno` 속성은 숙련된 Python 사용자가 모든 경우에 기대하는 대로 작동해야 합니다.

### 트레이싱 (Tracing)

트레이싱은 호출(calls), 반환(returns), 예외(exceptions), 실행된 소스 코드 줄, 그리고 특정 상황에서는 실행된 명령어(instructions)에 대한 이벤트를 생성합니다. 이 PEP는 줄 이벤트에 대해서만 다룹니다.

트레이싱이 활성화되면 다음 경우에 줄 이벤트가 생성됩니다.
*   새로운 소스 코드 줄에 도달했을 때.
*   백워드 점프(backwards jump)가 발생했을 때 (예: List Comprehension에서와 같이 동일한 줄로 점프하더라도).

또한, 실행되지 않은 소스 코드 줄에 대해서는 줄 이벤트가 절대 생성되지 않습니다.

### 트레이싱 목적상 코드로 간주되는 것 (What is considered to be code for the purposes of tracing)

모든 표현식(expressions)과 표현식의 부분은 실행 가능한 코드(executable code)로 간주됩니다.
일반적으로 모든 구문(statements)도 실행 가능한 코드로 간주됩니다. 그러나 구문이 여러 줄에 걸쳐 있을 때, 구문의 어떤 부분이 실행 가능한 코드로 간주되는지 고려해야 합니다.

구문은 키워드와 표현식으로 구성됩니다. 모든 키워드가 직접적인 런타임 효과를 가지지는 않으므로, 모든 키워드가 실행 가능한 코드로 간주되지는 않습니다. 예를 들어, `else`는 `if` 문의 필수적인 부분이지만, `else`와 관련된 런타임 효과는 없습니다.

트레이싱 목적상 다음 키워드는 실행 가능한 코드로 간주되지 않습니다.
*   `del` – 삭제될 표현식은 실행 가능한 코드로 처리됩니다.
*   `else` – 런타임 효과 없음
*   `finally` – 런타임 효과 없음
*   `global` – 순수하게 선언적(declarative)
*   `nonlocal` – 순수하게 선언적

다른 모든 키워드는 실행 가능한 코드로 간주됩니다.

### 이벤트 시퀀스 예시 (Example event sequences)

다음 예시에서 이벤트는 "(이름)", `f_lineno` 쌍으로 표시됩니다.

**코드:**
```python
1. global x
2. x = a
```
생성되는 이벤트:
`"line" 2`

**코드:**
```python
1. try:
2.     pass
3. finally:
4.     pass
```
생성되는 이벤트:
`"line" 1`
`"line" 2`
`"line" 4`

**코드:**
```python
1. for (
2.     x) in [1]:
3.     pass
4. return
```
생성되는 이벤트:
`"line" 2` # evaluate
`"line" 1` # for
`"line" 2` # store to x
`"line" 3` # pass
`"line" 1` # for
`"line" 4` # return
`"return" 1`

### `f_lineno` 속성 (The f_lineno attribute)

프레임 객체가 생성될 때, `f_lineno` 속성은 함수나 클래스가 정의된 줄, 즉 `def` 또는 `class` 키워드가 나타나는 줄로 설정됩니다. 모듈의 경우 0으로 설정됩니다. `f_lineno` 속성은 트레이싱이 꺼져 있고 이벤트가 생성되지 않더라도, 실행될 줄 번호와 일치하도록 업데이트됩니다.

### 코드 객체의 새로운 `co_lines()` 메서드 (The new co_lines() method of code objects)

`co_lines()` 메서드는 바이트코드 범위의 줄 번호를 나타내는 값들의 튜플을 반환하는 이터레이터를 제공합니다. 각 튜플은 세 가지 값으로 구성됩니다.
*   `start` – 바이트코드 범위의 시작 오프셋 (포함)
*   `end` – 바이트코드 범위의 끝 오프셋 (제외)
*   `line` – 줄 번호, 또는 주어진 범위의 바이트코드에 줄 번호가 없는 경우 `None`

생성된 시퀀스는 다음 속성을 가집니다.
*   시퀀스의 첫 번째 범위는 `start`가 0입니다.
*   `(start, end)` 범위는 감소하지 않고 연속적입니다. 즉, 어떤 두 튜플 쌍에 대해 두 번째 튜플의 `start`는 첫 번째 튜플의 `end`와 같습니다.
*   어떤 범위도 역방향이 아닙니다. 즉, 모든 세 값 튜플에 대해 `end >= start`입니다.
*   시퀀스의 마지막 범위는 `end`가 바이트코드의 크기와 같습니다.
*   `line`은 양의 정수이거나 `None`입니다.

#### 0 너비 범위 (Zero width ranges)

`start == end`인 0 너비 범위가 허용됩니다. 0 너비 범위는 소스 코드에 존재하지만 바이트코드 컴파일러에 의해 제거된 줄에 사용됩니다.

### `co_linetable` 속성 (The co_linetable attribute)

`co_linetable` 속성은 줄 번호 정보를 저장합니다. 이 형식은 불투명하고(opaque) 명시되지 않으며 예고 없이 변경될 수 있습니다. 이 속성은 새로운 코드 객체 생성을 지원하기 위해서만 공개됩니다.

### `co_lnotab` 속성 (The co_lnotab attribute)

역사적으로 `co_lnotab` 속성은 바이트코드 오프셋에서 줄 번호로의 매핑을 담고 있었지만, 줄 번호가 없는 바이트코드를 지원하지 않습니다. 하위 호환성을 위해 `co_lnotab` 바이트 객체는 필요할 때 지연 생성됩니다. 줄 번호가 없는 바이트코드 범위의 경우, 이전 바이트코드 범위의 줄 번호가 사용됩니다.

`co_lnotab` 테이블을 파싱하는 도구는 가능한 한 빨리 새로운 `co_lines()` 메서드를 사용하도록 전환해야 합니다.

## 하위 호환성 (Backwards Compatibility)

`co_lnotab` 속성은 Python 3.10에서 Deprecated(더 이상 사용되지 않음)되고 Python 3.12에서 제거될 것입니다.

코드 객체의 `co_lnotab` 속성을 파싱하는 모든 도구는 3.12가 출시되기 전에 `co_lines()`를 사용하도록 전환해야 합니다. `sys.settrace`를 사용하는 도구는 수신하는 "line" 이벤트가 더 정확해지는 경우를 제외하고는 영향을 받지 않습니다.

### 트레이스 이벤트 시퀀스가 변경될 코드 예시 (Examples of code for which the sequence of trace events will change)

다음 예시에서 이벤트는 "(이름)", `f_lineno` 쌍으로 표시됩니다.

#### `if` 문 내의 `pass` 문 (pass statement in an if statement)

```python
0. def spam(a):
1.     if a:
2.         eggs()
3.     else:
4.         pass
```
`a`가 `True`인 경우 Python 3.9에서 생성되는 이벤트 시퀀스:
`"line" 1`
`"line" 2`
`"line" 4`
`"return" 4`

Python 3.10부터의 시퀀스는 다음과 같습니다:
`"line" 1`
`"line" 2`
`"return" 2`

#### 여러 개의 `pass` 문 (Multiple pass statements)

```python
0. def bar():
1.     pass
2.     pass
3.     pass
```
Python 3.9에서 생성되는 이벤트 시퀀스:
`"line" 3`
`"return" 3`

Python 3.10부터의 시퀀스는 다음과 같습니다:
`"line" 1`
`"line" 2`
`"line" 3`
`"return" 3`

## C API

C API 함수를 통한 프레임 객체의 `f_lineno` 속성 접근은 변경되지 않습니다. `f_lineno`는 `PyFrame_GetLineNumber`로 읽을 수 있습니다. `f_lineno`는 `PyObject_SetAttr` 및 유사 함수를 통해서만 설정할 수 있습니다.

기저 데이터 구조를 통해 `f_lineno`에 직접 접근하는 것은 금지됩니다.

## 프로세스 외부 디버거 및 프로파일러 (Out of process debuggers and profilers)

`py-spy`와 같은 프로세스 외부 도구는 C-API를 사용할 수 없으므로, 줄 번호 테이블을 직접 파싱해야 합니다. 줄 번호 테이블 형식은 예고 없이 변경될 수 있지만, 버그 수정을 위해 절대적으로 필요한 경우가 아니면 릴리스 중에는 변경되지 않습니다.

이러한 도구 구현에 필요한 작업을 줄이기 위해 다음 C 구조체와 유틸리티 함수가 제공됩니다. 이 함수들은 C-API의 일부가 아니므로, 사용해야 하는 모든 코드에 링크되어야 합니다.

```c
typedef struct addressrange {
    int ar_start;
    int ar_end;
    int ar_line;
    struct _opaque opaque;
} PyCodeAddressRange;

void PyLineTable_InitAddressRange(char *linetable, Py_ssize_t length, int firstlineno, PyCodeAddressRange *range);
int PyLineTable_NextAddressRange(PyCodeAddressRange *range);
int PyLineTable_PreviousAddressRange(PyCodeAddressRange *range);
```

`PyLineTable_InitAddressRange`는 줄 번호 테이블과 첫 번째 줄 번호에서 `PyCodeAddressRange` 구조체를 초기화합니다.
`PyLineTable_NextAddressRange`는 범위를 다음 엔트리로 진행시키고, 유효하면 0이 아닌 값을 반환합니다.
`PyLineTable_PreviousAddressRange`는 범위를 이전 엔트리로 되돌리고, 유효하면 0이 아닌 값을 반환합니다.

**참고:** `linetable`의 데이터는 변경 불가능하지만, 그 수명은 코드 객체에 따라 달라집니다. 안정적인 작동을 위해 `PyLineTable_InitAddressRange`를 호출하기 전에 `linetable`을 로컬 버퍼로 복사해야 합니다.

이 함수들은 C-API의 일부는 아니지만, CPython의 모든 미래 버전에서 제공될 것입니다. `PyLineTable_` 함수는 C-API를 호출하지 않으므로, 이들을 사용해야 하는 모든 도구에 안전하게 복사될 수 있습니다. `PyCodeAddressRange` 구조체는 변경되지 않지만, `_opaque` 구조체는 명세의 일부가 아니며 변경될 수 있습니다.

예를 들어, 다음 코드는 모든 주소 범위를 출력합니다.

```c
void print_address_ranges(char *linetable, Py_ssize_t length, int firstlineno) {
    PyCodeAddressRange range;
    PyLineTable_InitAddressRange(linetable, length, firstlineno, &range);
    while (PyLineTable_NextAddressRange(&range)) {
        printf("Bytecodes from %d (inclusive) to %d (exclusive) ", range.start, range.end);
        if (range.line < 0) { /* line < 0 means no line number */
            printf("have no line number\n");
        } else {
            printf("have line number %d\n", range.line);
        }
    }
}
```

## 성능 영향 (Performance Implications)

일반적으로 성능 변화는 없을 것입니다. 트레이싱 시에는 새로운 테이블 형식이 줄 번호 계산 속도를 고려하여 설계될 수 있으므로 프로그램이 약간 더 빠르게 실행될 수 있습니다. `pass` 문이 길게 연속되는 코드는 약간 느려질 수 있습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.