---
title: "[Deferred] PEP 280 - Optimizing access to globals"
excerpt: "Python Enhancement Proposal 280: 'Optimizing access to globals'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/280/
toc: true
toc_sticky: true
date: 2025-09-26 17:55:42+0900
last_modified_at: 2025-09-26 17:55:42+0900
published: true
---
> **원문 링크:** [PEP 280 - Optimizing access to globals](https://peps.python.org/pep-0280/)
>
> **상태:** Deferred | **유형:** Standards Track | **작성일:** 10-Feb-2002

```


# PEP 280 – 전역(globals) 접근 최적화

*   **작성자:** Guido van Rossum
*   **상태:** 연기됨 (Deferred)
*   **유형:** 표준 트랙 (Standards Track)
*   **작성일:** 2002년 2월 10일
*   **Python 버전:** 2.3
*   **최종 수정일:** 2025년 2월 1일

## 연기 (Deferral)

이 PEP는 좋은 아이디어였지만, PEP 266 (Skip Montanaro의 "Optimizing Global Variable/Attribute Access") 및 PEP 267 (Jeremy Hylton의 "Optimized Access to Module Namespaces")과의 차이점을 명확히 정리할 작업자가 나타나지 않아 현재 연기된 상태입니다.

## 개요 (Abstract)

이 PEP는 모듈의 전역(globals) 접근을 최적화하기 위한 또 다른 접근 방식을 설명합니다. 이는 PEP 266과 PEP 267에 대한 대안을 제시합니다. 궁극적으로는 여러 접근 방식이 프로토타입으로 제작된 후, 그중 하나가 선택 및 구현될 것으로 예상되었습니다.

## 설명 (Description)

(참고: Jason Orendorff는 오래전에 Python 1.5 버전에서 이 아이디어를 구현해 본 적이 있다고 언급했습니다. 당시 그는 일반 Python보다 15% 느린 수준까지 만들었지만, 결국 포기했다고 합니다. 그의 구현에서 "cell"은 실제 일급 객체였고, "celldict"는 딕셔너리를 복사하고 수정한 버전이었습니다.)

이 PEP의 핵심은 `cell`이라는 매우 간단한 Python 객체와 `celldict`라는 매핑 객체를 사용하는 것입니다.

### `cell` 객체

`cell`은 다음 두 가지 포인터를 포함하는 간단한 Python 객체입니다.

*   `objptr`: 실제 Python 객체에 대한 포인터
*   `cellptr`: 다른 `cell` 객체에 대한 포인터 (내장(built-ins) 검색을 위해 `cell`을 연결하는 데 사용됨)

두 포인터 모두 `NULL`일 수 있습니다. Python으로 구현하면 다음과 같습니다.

```python
class cell(object):
    def __init__(self):
        self.objptr = NULL
        self.cellptr = NULL
```

`cellptr` 속성은 내장(built-ins)을 검색하기 위해 `cell`들을 연결하는 데 사용됩니다.

### `celldict` 객체

`celldict`는 문자열(모듈 전역 변수의 이름)을 객체(해당 전역 변수의 값)에 매핑하는 것으로, `cell` 딕셔너리를 사용하여 구현됩니다. Python으로 구현하면 다음과 같습니다.

```python
class celldict(object):
    def __init__(self):
        self.__dict = {} # dict of cells

    def getcell(self, key):
        c = self.__dict.get(key)
        if c is None:
            c = cell()
            self.__dict[key] = c
        return c

    def cellkeys(self):
        return self.__dict.keys()

    def __getitem__(self, key):
        c = self.__dict.get(key)
        if c is None:
            raise KeyError, key
        value = c.objptr
        if value is NULL:
            raise KeyError, key
        else:
            return value

    def __setitem__(self, key, value):
        c = self.__dict.get(key)
        if c is None:
            c = cell()
            self.__dict[key] = c
        c.objptr = value

    def __delitem__(self, key):
        c = self.__dict.get(key)
        if c is None or c.objptr is NULL:
            raise KeyError, key
        c.objptr = NULL

    # keys(), items(), values(), clear() 등의 다른 딕셔너리 메서드들도 유사하게 구현됨
    def keys(self):
        return [k for k, c in self.__dict.iteritems() if c.objptr is not NULL]
    def items(self):
        return [[k, c.objptr] for k, c in self.__dict.iteritems() if c.objptr is not NULL]
    def values(self):
        return [c.objptr for c in self.__dict.itervalues() if c.objptr is not NULL]
    def clear(self):
        for c in self.__dict.values():
            c.objptr = NULL
```
`objptr`가 `NULL`인 `cell`은 "비어 있는(empty)" `cell`이라고 합니다. `celldict`가 매핑으로 사용될 때는 이러한 비어 있는 `cell`이 존재하지 않는 것처럼 동작합니다. 하지만 한 번 추가된 `cell`은 `celldict`에서 삭제되지 않으며, `getcell()` 메서드를 사용하여 비어 있는 `cell`에 접근할 수 있습니다. `celldict` 구현은 `cellptr` 속성을 사용하지 않습니다.

### 모듈 구현 변경

모듈의 `__dict__`를 `celldict`로 사용하도록 모듈 구현을 변경합니다. 모듈의 `getattr`, `setattr`, `delattr` 연산은 이제 `celldict`의 `getitem`, `setitem`, `delitem`으로 매핑됩니다. `module.__dict__`와 `globals()`의 타입 변경이 유일한 하위 호환성 문제일 가능성이 높습니다.

모듈이 초기화될 때, `__builtins__`는 `__builtin__` 모듈의 `__dict__` (이 또한 `celldict`)에서 초기화됩니다. `__builtins__`의 각 `cell`에 대해 새 모듈의 `__dict__`는 `objptr`가 `NULL`인 `cell`을 추가하고, 이 `cell`의 `cellptr`는 `__builtins__`의 해당 `cell`을 가리킵니다.

의사 코드는 다음과 같습니다 (`rexec` 제외):

```python
import __builtin__

class module(object):
    def __init__(self):
        self.__dict__ = d = celldict()
        d['__builtins__'] = bd = __builtin__.__dict__
        for k in bd.cellkeys():
            c = self.__dict__.getcell(k)
            c.cellptr = bd.getcell(k)

    def __getattr__(self, k):
        try:
            return self.__dict__[k]
        except KeyError:
            raise IndexError, k

    def __setattr__(self, k, v):
        self.__dict__[k] = v

    def __delattr__(self, k):
        del self.__dict__[k]
```

### 컴파일러 및 VM 변경

컴파일러는 전역 변수 참조를 위해 `LOAD_GLOBAL_CELL <i>` (및 `STORE_GLOBAL_CELL <i>` 등) opcode를 생성합니다. 여기서 `<i>`는 `LOAD_CONST`의 상수 인덱스와 유사하게 단일 코드 객체 내에서만 의미를 가지는 작은 인덱스입니다. 코드 객체에는 `co_globals`라는 새로운 튜플이 추가되어 `<i>`로 인덱싱된 코드에서 참조되는 전역 변수 이름을 제공합니다.

코드 객체와 `celldict`로부터 함수 객체가 생성될 때, 함수 객체는 `celldict`에 코드 객체의 `co_globals`에 있는 이름에 해당하는 `cell`들을 요청하여 `cell` 포인터 배열을 생성합니다. `celldict`에 특정 이름에 대한 `cell`이 아직 없으면 빈 `cell`을 생성합니다. 이 `cell` 포인터 배열은 함수 객체에 `func_cells`로 저장됩니다.

VM이 `LOAD_GLOBAL_CELL <i>` 명령어를 실행하면, `func_cells`에서 `<i>`번 `cell`을 가져옵니다. 그런 다음 `cell`의 `PyObject` 포인터를 확인하고, `NULL`이 아니면 해당 값이 전역 값입니다. `NULL`인 경우 `cell`의 `cellptr`를 따라 다음 `cell`로 이동하고, 해당 `cell`의 `PyObject` 포인터를 확인합니다. 이것도 `NULL`이거나 두 번째 `cell`이 없으면 `NameError`가 발생합니다. `STORE_GLOBAL_CELL <i>`도 유사하게 작동하지만, `cellptr` 체인을 따르지 않고 항상 첫 번째 `cell`에 저장합니다.

함수의 전역 변수가 `celldict`가 아니어서 `func_cells`가 `NULL`인 경우를 위한 VM의 대체(fallback) 메커니즘도 있습니다. 이 경우 코드 객체의 `co_globals`가 `<i>`로 인덱싱되어 해당하는 전역 변수의 이름을 찾고, 이 이름이 함수의 `globals` 딕셔너리를 인덱싱하는 데 사용됩니다.

## 추가 아이디어 (Additional Ideas)

### 최적화된 `LOAD_GLOBAL_CELL`

*   `func_cells`를 `NULL` 포인터로 만들지 않고, 빈 `cell` 배열로 구성하여 `LOAD_GLOBAL_CELL`이 `NULL` 검사 없이 `func_cells`를 인덱싱할 수 있도록 합니다.
*   `cell`이 생성될 때 `c.cellptr`를 `c`와 같게 만들어 `LOAD_GLOBAL_CELL`이 `NULL` 검사 없이 `c.cellptr`를 항상 역참조할 수 있도록 합니다.

이 두 아이디어를 추가하면 `LOAD_GLOBAL_CELL`의 Python 의사 코드는 다음과 같습니다.

```python
def LOAD_GLOBAL_CELL(self, i): # self is the frame
    c = self.func_cells[i]
    obj = c.objptr
    if obj is not NULL:
        return obj # 기존 전역 변수
    return c.cellptr.objptr # 내장(built-in) 또는 NULL
```

### 내장(built-ins) 값의 적극적인 캐싱

내장(builtins)의 실제 값을 모듈 딕셔너리에 직접 저장하고, 단순히 `cell`에 대한 포인터만 저장하는 것보다 더 적극적으로 캐싱하는 방안입니다. 이는 다음 두 가지 목적을 가집니다.

1.  **접근 단순화 및 속도 향상:** 가장 일반적인 연산인 접근을 단순화하고 빠르게 합니다.
2.  **기존 극단적인 코너 케이스의 충실한 에뮬레이션 지원:** 기존 `builtins`의 변경이 모듈에 반영되는 방식을 더 정확하게 처리합니다.

기존 제안 방식에서는 모듈 딕셔너리가 처음 생성될 때 `builtins` 집합이 캡처되므로, 그 이후에 `builtins`에 대한 변경 사항이 모듈 딕셔너리에 반영되지 않는 문제가 발생할 수 있습니다. 예를 들어, `__builtin__.pachinko`와 같은 새로운 `builtin`이 런타임에 추가되면, 이미 초기화된 모듈에서는 이를 인식하지 못해 `NameError`가 발생할 수 있습니다.

이러한 `builtins`의 변경은 매우 드물기 때문에, `builtins` 변경 비용이 높아지더라도 전역 변수 및 `builtins` 참조 속도를 향상시키는 것이 더 중요합니다. 이 접근 방식에서는 `cell` 객체가 다음과 같이 변경됩니다.

```python
class cell(object):
    def __init__(self, obj=NULL, builtin=0):
        self.objptr = obj
        self.builtinflag = builtin
```
`builtinflag`는 `objptr`가 `builtins`에서 얻은 값을 포함할 때만 `True`입니다. 즉, `cell`이 캐시된 값으로 작동할 때만 `True`입니다. `builtinflag`가 `False`이면 `objptr`는 모듈 전역 변수의 값입니다 (`NULL`일 수 있음).

`celldict`는 다음과 같이 변경됩니다.

```python
class celldict(object):
    def __init__(self, builtindict=()):
        self.basedict = builtindict
        self.__dict = d = {}
        for k, v in builtindict.items():
            d[k] = cell(v, 1)

    def __getitem__(self, key):
        c = self.__dict.get(key)
        if c is None or c.objptr is NULL or c.builtinflag: # builtinflag 확인 추가
            raise KeyError, key
        return c.objptr

    def __setitem__(self, key, value):
        c = self.__dict.get(key)
        if c is None:
            c = cell()
            self.__dict[key] = c
        c.objptr = value
        c.builtinflag = 0 # 모듈 전역 변수이므로 builtinflag는 0

    def __delitem__(self, key):
        c = self.__dict.get(key)
        if c is None or c.objptr is NULL or c.builtinflag: # builtinflag 확인 추가
            raise KeyError, key
        c.objptr = NULL
        # 만약 삭제된 전역 변수와 동일한 이름의 built-in이 있다면
        # 해당 built-in 값을 다시 캐싱하여 노출시킵니다.
        if key in self.basedict:
            c.objptr = self.basedict[key]
            assert c.objptr is not NULL
            c.builtinflag = 1
        else:
            assert not c.builtinflag

    # keys(), items(), values(), clear() 등의 다른 딕셔너리 메서드들도 유사하게 변경됨
    def keys(self):
        return [k for k, c in self.__dict.iteritems() if c.objptr is not NULL and not c.builtinflag]
    def items(self):
        return [[k, c.objptr] for k, c in self.__dict.iteritems() if c.objptr is not NULL and not c.builtinflag]
    def values(self):
        return [c.objptr for c in self.__dict.itervalues() if c.objptr is not NULL and not c.builtinflag]
    def clear(self):
        for c in self.__dict.values():
            if not c.builtinflag:
                c.objptr = NULL
```
이러한 변경으로 `LOAD_GLOBAL_CELL`의 구현이 단순화되어 속도 이점을 얻을 수 있습니다.

```python
def LOAD_GLOBAL_CELL(self, i): # self is the frame
    c = self.func_cells[i]
    return c.objptr # NULL일 수 있음
```
이 방식에서는 `builtins`와 모듈 전역 변수에 대한 접근 속도가 동일해집니다.

`builtins`의 변경 사항을 `builtins`에서 초기화된 모듈 딕셔너리로 전파하는 비용이 수반됩니다. `builtins`는 모듈 (또는 모듈 딕셔너리)에 대한 약한 참조(weakrefs) 목록을 유지해야 합니다. `builtin` 딕셔너리에 변경이 발생하면 (새 키 추가, 기존 키 값 변경, 키 삭제 등), 모듈 딕셔너리 목록을 순회하며 해당 변경 사항을 반영합니다.

*   **`reflect_bltin_del(self, key)`:** `builtin`에서 키가 삭제될 때, 모듈 딕셔너리에서 해당 `cell`의 `objptr`를 `NULL`로 설정하고 `builtinflag`를 `0`으로 만듭니다.
*   **`reflect_bltin_new(self, key, value)`:** 새로운 `builtin` (키, 값) 쌍이 추가될 때, 모듈 딕셔너리에 해당 `cell`이 없으면 새로 생성하여 `builtin` 값을 캐싱합니다. `objptr`가 `NULL`이면 `builtin` 값을 복원합니다.
*   **`reflect_bltin_change(self, key, newvalue)`:** 기존 `builtin`의 값이 변경될 때, 모듈 딕셔너리에서 해당 `cell`의 `objptr`를 새로운 값으로 업데이트합니다.

## FAQ (자주 묻는 질문)

**Q: `__builtin__` 네임스페이스에 새로운 `builtins`를 설치하고 이미 로드된 모든 모듈에서 즉시 사용할 수 있도록 하는 것이 여전히 가능할까요? 또한, `open()`과 같은 `builtins`를 사용자 정의 복사본으로 재정의하여 모든 모듈에서 이전 것을 재정의하도록 하는 것이 가능할까요?**

A: 예, 이것이 이 설계의 핵심입니다. 원래 접근 방식에서는 `LOAD_GLOBAL_CELL`이 두 번째 `cell`에서 `NULL`을 찾으면 `__builtins__` 딕셔너리가 수정되었는지 다시 확인해야 합니다. Tim의 "더 적극적인(more aggressive)" 대안도 이를 처리합니다.

**Q: 새로운 스키마는 제한된 실행 모델(restricted execution model)과 어떻게 호환될까요?**

A: 제한된 실행 모델을 완벽하게 지원하도록 의도되었습니다.

**Q: 전역 변수가 삭제되면 어떻게 되나요?**

A: 모듈의 `celldict`는 해당 키에 대해 `objptr`가 `NULL`인 `cell`을 가집니다. "적극적인(aggressive)" 방식에서는 이것이 동일한 이름의 `builtin`을 드러내는지 확인하고, 그렇다면 해당 `builtin`의 값을 `cell`의 `objptr`에 복사하고 `builtinflag`를 `True`로 설정합니다.

**Q: `LOAD_GLOBAL_CELL`에 대한 C 코드는 어떻게 보일까요?**

A: "Additional ideas"의 처음 두 가지 항목을 통합한 첫 번째 버전은 다음과 같습니다.

```c
case LOAD_GLOBAL_CELL:
    cell = func_cells[oparg];
    x = cell->objptr;
    if (x == NULL) {
        x = cell->cellptr->objptr;
        if (x == NULL) {
            ... error recovery ...
            break;
        }
    }
    Py_INCREF(x);
    PUSH(x);
    continue;
```
Ka-Ping Yee의 아이디어에 따르면 다음과 같이 작성할 수도 있습니다.

```c
case LOAD_GLOBAL_CELL:
    cell = func_cells[oparg];
    x = cell->cellptr->objptr;
    if (x != NULL) {
        Py_INCREF(x);
        PUSH(x);
        continue;
    }
    ... error recovery ...
    break;
```
현대 CPU 아키텍처에서 이는 `builtins`에 대한 브랜치 수를 줄여 성능 향상을 가져올 수 있습니다.

적극적인(aggressive) 변형의 경우:

```c
case LOAD_GLOBAL_CELL:
    cell = func_cells[oparg];
    x = cell->objptr;
    if (x != NULL) {
        Py_INCREF(x);
        PUSH(x);
        continue;
    }
    ... error recovery ...
    break;
```

**Q: `func_cells` 배열이 없을 것으로 예상되는 모듈의 최상위 코드에서는 어떤 일이 발생하나요?**

A: 코드 분석을 수행하여 `func_cells` 배열을 생성하거나, `globals` 딕셔너리에서 `PyMapping_GetItem`을 사용하는 `LOAD_NAME`을 사용할 수 있습니다.

## 그래픽 (Graphics)

Ka-Ping Yee는 `import spam` 이후의 상태를 보여주는 그림을 제공했습니다.

`spam.py` 파일의 내용은 다음과 같습니다.

```python
import eggs
i = -2
max = 3
def foo(n):
    y = abs(i) + max
    return eggs.ham(y + n)
```
해당 그림은 [http://web.lfw.org/repo/cells.gif](http://web.lfw.org/repo/cells.gif)에서 볼 수 있습니다. 더 큰 버전은 [http://lfw.org/repo/cells-big.gif](http://lfw.org/repo/cells-big.gif)에 있으며, 원본 소스는 [http://lfw.org/repo/cells.ai](http://lfw.org/repo/cells.ai)에 있습니다.

## 비교 (Comparison)

이 섹션에는 세 가지 접근 방식(PEP 280, PEP 266, PEP 267)에 대한 비교가 추가될 수 있었습니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

---
**PEP 280**은 Python의 전역 변수 및 내장(built-ins) 접근 방식을 최적화하기 위해 `cell`과 `celldict`라는 새로운 데이터 구조를 제안했습니다. 이 제안은 모듈의 `__dict__`를 `celldict`로 대체하고, `LOAD_GLOBAL_CELL`과 같은 새로운 opcode를 도입하여 전역 변수 접근 속도를 향상시키는 것을 목표로 했습니다. 특히 "적극적인(aggressive)" 캐싱 방식을 통해 `builtins`의 변경이 모듈에 즉시 반영되도록 하면서도 접근 성능을 유지하려 했습니다. 그러나 이 PEP는 다른 관련 PEP들과의 차이점을 명확히 정리하는 작업의 부재로 인해 결국 연기되었습니다.

이 제안은 Python 내부 동작에 대한 깊은 이해를 바탕으로 성능 최적화를 시도했지만, 복잡성 증가와 하위 호환성 문제 (특히 `module.__dict__` 및 `globals()` 타입 변경)로 인해 도입되지 못했습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.