---
title: "[Superseded] PEP 509 - Add a private version to dict"
excerpt: "Python Enhancement Proposal 509: 'Add a private version to dict'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/509/
toc: true
toc_sticky: true
date: 2025-09-26 22:55:06+0900
last_modified_at: 2025-09-26 22:55:06+0900
published: true
---
> **원문 링크:** [PEP 509 - Add a private version to dict](https://peps.python.org/pep-0509/)
>
> **상태:** Superseded | **유형:** Standards Track | **작성일:** 04-Jan-2016

# PEP 509 – dict에 Private 버전 추가

## 초록 (Abstract)
이 PEP는 내장 `dict` 타입에 새로운 private 버전을 추가할 것을 제안합니다. 이 버전은 각 딕셔너리 생성 시, 그리고 각 딕셔너리 변경 시마다 증가하여, 네임스페이스(namespace)에 대한 빠른 가드(guard)를 구현하는 데 사용됩니다.

## 배경 (Rationale)
Python에서 내장 `dict` 타입은 다양한 명령어에서 사용됩니다. 예를 들어, `LOAD_GLOBAL` 명령어는 전역 네임스페이스나 내장(builtins) 네임스페이스에서 변수를 찾습니다 (두 번의 `dict` 조회). Python은 `builtins` 네임스페이스, `globals` 네임스페이스, 타입 네임스페이스, 인스턴스 네임스페이스 등에서 `dict`를 활용합니다. (함수의) 로컬 네임스페이스는 일반적으로 배열로 최적화되지만, `dict`가 될 수도 있습니다.

Python은 거의 모든 것이 런타임에 수정될 수 있기 때문에 최적화하기 어렵습니다. 내장 함수, 함수 코드, 전역 변수, 로컬 변수 등이 변경될 수 있기 때문입니다. Python의 의미론(semantics)을 존중하면서 최적화를 구현하려면 "무언가가 변경될 때"를 감지해야 합니다. 이러한 검사를 "가드(guards)"라고 부릅니다.

최적화의 속도 향상은 가드 검사의 속도에 달려 있습니다. 이 PEP는 네임스페이스에 대한 빠른 가드를 구현하기 위해 딕셔너리에 private 버전을 추가할 것을 제안합니다.

대부분의 네임스페이스에서 딕셔너리 버전이 변경되지 않는 일반적인 경우, 딕셔너리 조회를 건너뛸 수 있습니다. 버전은 전역적으로(globally) 고유하므로, 버전을 확인하는 것만으로 네임스페이스 딕셔너리가 새 딕셔너리로 교체되지 않았는지 확인할 수 있습니다.

딕셔너리 버전이 변경되지 않을 때, 가드의 성능은 감시하는 딕셔너리 엔트리의 수에 의존하지 않습니다. 복잡도는 O(1)입니다.

최적화의 예시로, 전역 변수의 값을 함수 상수로 복사하는 것을 들 수 있습니다. 이 최적화는 전역 변수가 복사된 후 수정되었는지 확인하기 위해 전역 변수에 대한 가드를 필요로 합니다. 전역 변수가 수정되지 않으면, 함수는 캐시된 복사본을 사용합니다. 전역 변수가 수정되면, 함수는 일반 조회를 사용하고, 다음 함수 호출에 대한 가드 검사 오버헤드를 제거하기 위해 함수를 역최적화(deoptimize)할 수도 있습니다.

함수를 전문화하기 위한 가드의 구체적인 사용법과 Python 정적 최적화 도구에 대한 더 일반적인 배경은 [PEP 510 – Specialized functions with guards](https://peps.python.org/pep-0510/)를 참조하세요.

## 가드 예시 (Guard example)
가상의 `dict_get_version(dict)` 함수를 사용하여 딕셔너리 엔트리가 수정되었는지 (생성, 업데이트 또는 삭제) 확인하는 빠른 가드의 의사 코드(pseudo-code)는 다음과 같습니다.

```python
UNSET = object()

class GuardDictKey:
    def __init__(self, dict, key):
        self.dict = dict
        self.key = key
        self.value = dict.get(key, UNSET)
        self.version = dict_get_version(dict)

    def check(self):
        """딕셔너리 엔트리가 변경되지 않았고 딕셔너리가 교체되지 않았다면 True를 반환합니다."""
        # 딕셔너리의 버전을 읽습니다.
        version = dict_get_version(self.dict)
        if version == self.version:
            # 빠른 경로(Fast-path): 딕셔너리 조회 생략
            return True

        # 딕셔너리에서 값을 조회합니다.
        value = self.dict.get(self.key, UNSET)
        if value is self.value:
            # 다른 키가 수정되었습니다:
            # 새 딕셔너리 버전을 캐시합니다.
            self.version = version
            return True

        # 키가 수정되었습니다.
        return False
```


## `dict` 버전 활용 (Usage of the dict version)

### 메서드 호출 속도 향상 (Speedup method calls)
Yury Selivanov는 메서드 호출을 최적화하는 패치를 작성했습니다. 이 패치는 "ceval에 opcode별 캐시 구현" 패치에 의존하며, 이 패치는 `globals` 딕셔너리 또는 `builtins` 딕셔너리가 수정된 경우 캐시를 무효화하기 위해 딕셔너리 버전을 필요로 합니다.

캐시는 딕셔너리 버전이 전역적으로 고유해야 합니다. 예를 들어, `exec()` 함수를 `globals` 매개변수와 함께 사용하여 한 네임스페이스에서 함수를 정의하고 다른 네임스페이스에서 호출하는 것이 가능합니다. 이 경우 `globals` 딕셔너리가 교체되므로 캐시도 무효화되어야 합니다.

### 가드를 이용한 특수화된 함수 (Specialized functions using guards)
PEP 510은 가드를 사용한 특수화된 함수를 지원하는 API를 제안합니다. 이는 Python의 의미론을 깨지 않고 Python을 위한 정적 최적화 도구를 구현할 수 있게 합니다.

FAT Python 프로젝트의 `fatoptimizer`는 정적 Python 최적화 도구의 한 예입니다. 이 도구는 네임스페이스에 대한 가드를 필요로 하는 많은 최적화를 구현합니다.
*   순수(pure) `builtins` 호출: `len("abc")`를 `3`으로 대체하려면, `builtins.__dict__['len']`과 `globals()['len']`에 대한 가드가 필요합니다.
*   루프 언롤링(Loop unrolling): `for i in range(...): ...`와 같은 루프를 언롤링하려면, `builtins.__dict__['range']`와 `globals()['range']`에 대한 가드가 필요합니다.

### Pyjion
Pyjion의 두 주요 개발자 중 한 명인 Brett Cannon에 따르면, Pyjion은 최적화를 구현하기 위해 딕셔너리 버전의 이점을 얻을 수 있습니다. Pyjion은 CoreCLR (Microsoft .NET Core 런타임) 기반의 Python용 JIT 컴파일러입니다.

### Cython
Cython도 최적화를 구현하기 위해 딕셔너리 버전의 이점을 얻을 수 있습니다. Cython은 Python 프로그래밍 언어와 확장된 Cython 프로그래밍 언어 모두를 위한 최적화 정적 컴파일러입니다.

### Unladen Swallow
딕셔너리 버전이 명시적으로 언급되지는 않았지만, `globals` 및 `builtins` 조회 최적화는 Unladen Swallow 계획의 일부였습니다. (출처: Unladen Swallow ProjectPlan). Unladen Swallow는 LLVM으로 구현된 JIT 컴파일러를 추가한 CPython 2.6.1의 포크였습니다. 이 프로젝트는 2011년에 중단되었습니다.

## 변경 사항 (Changes)
`PyDictObject` 구조체에 C 타입 `PY_UINT64_T` (64비트 부호 없는 정수)를 가진 `ma_version_tag` 필드를 추가합니다. 또한 전역 딕셔너리 버전도 추가합니다.

딕셔너리가 생성될 때마다 전역 버전은 증가하고 딕셔너리 버전은 전역 버전으로 초기화됩니다.

딕셔너리 내용이 수정될 때마다 전역 버전은 증가하고 딕셔너리 버전으로 복사되어야 합니다. 내용을 수정할 수 있는 딕셔너리 메서드는 다음과 같습니다.
*   `clear()`
*   `pop(key)`
*   `popitem()`
*   `setdefault(key, value)`
*   `__delitem__(key)`
*   `__setitem__(key, value)`
*   `update(...)`

딕셔너리 메서드가 내용을 변경하지 않을 때 버전을 증가시킬지 여부는 Python 구현에 맡겨집니다. Python 구현은 가드에서 딕셔너리 조회를 피하기 위해 버전을 증가시키지 않기로 결정할 수 있습니다. 딕셔너리 메서드가 내용을 변경하지 않는 경우의 예시는 다음과 같습니다.
*   `clear()`: 딕셔너리가 이미 비어 있는 경우
*   `pop(key)`: 키가 존재하지 않는 경우
*   `popitem()`: 딕셔너리가 비어 있는 경우
*   `setdefault(key, value)`: 키가 이미 존재하는 경우
*   `__delitem__(key)`: 키가 존재하지 않는 경우
*   `__setitem__(key, value)`: 새 값이 현재 값과 동일한 경우
*   `update()`: 인자 없이 호출되거나 새 값이 현재 값과 동일한 경우

키를 이전 값과 동일한 새 값으로 설정하는 것도 딕셔너리 내용을 수정하는 작업으로 간주됩니다.

두 개의 서로 다른 빈 딕셔너리는 버전만으로 딕셔너리를 식별할 수 있도록 다른 버전을 가져야 합니다. 이는 딕셔너리에 대한 강력한 참조(strong reference)를 저장하지 않고도 네임스페이스가 교체되지 않았는지 가드에서 확인할 수 있게 합니다. 빌린 참조(borrowed reference)를 사용하는 것은 작동하지 않습니다. 이전 딕셔너리가 파괴되면 새 딕셔너리가 동일한 메모리 주소에 할당될 수 있기 때문입니다. 참고로 딕셔너리는 약한 참조(weak references)를 지원하지 않습니다.

버전 증가는 원자적(atomic)이어야 합니다. CPython에서는 GIL(Global Interpreter Lock)이 이미 `dict` 메서드를 보호하여 변경 사항을 원자적으로 만듭니다.

가상의 `dict_get_version(dict)` 함수를 사용하는 예시는 다음과 같습니다.
```python
>>> d = {}
>>> dict_get_version(d)
100
>>> d['key'] = 'value'
>>> dict_get_version(d)
101
>>> d['key'] = 'new value'
>>> dict_get_version(d)
102
>>> del d['key']
>>> dict_get_version(d)
103
```


이 필드는 정수 오버플로우(integer overflow) 후에 잘못될 수 있는 `version <= old_version` 대신 `version_tag == old_version_tag`를 사용하여 비교하도록 제안하기 위해 `ma_version` 대신 `ma_version_tag`로 명명되었습니다.

## 하위 호환성 (Backwards Compatibility)
`PyDictObject` 구조체는 안정적인 ABI(Application Binary Interface)의 일부가 아니며, 새 딕셔너리 버전이 Python 스코프에 노출되지 않으므로 변경 사항은 하위 호환됩니다.

## 구현 및 성능 (Implementation and Performance)
이 PEP를 구현하는 패치는 [issue #26058: PEP 509: Add ma_version_tag to PyDictObject](https://bugs.python.org/issue26058)에 포함되어 있습니다.

`pybench` 및 `timeit` 마이크로벤치마크에서 이 패치는 딕셔너리 작업에 오버헤드를 추가하지 않는 것으로 보입니다. 예를 들어, 다음 `timeit` 마이크로벤치마크는 변경 전후 모두 318나노초가 걸립니다.
```bash
python3.6 -m timeit 'd={1: 0}; d=0; d=0; d=0; del d; del d; d.clear()'
```


버전이 변경되지 않을 때 `PyDict_GetItem()`은 딕셔너리 조회에 14.8ns가 걸리는 반면, 가드 검사는 3.8ns만 걸립니다. 또한 가드는 여러 키를 감시할 수 있습니다. 예를 들어, 함수에서 10개의 전역 변수를 사용하는 최적화의 경우, 10번의 딕셔너리 조회는 148ns가 소요되지만, 버전이 변경되지 않을 때 가드는 여전히 3.8ns만 소요됩니다 (39배 빠름).

`fat` 모듈은 이러한 가드를 구현합니다. `fat.GuardDict`는 딕셔너리 버전을 기반으로 합니다.

## 정수 오버플로우 (Integer overflow)
구현은 버전을 저장하기 위해 C 타입 `PY_UINT64_T`를 사용합니다. 이는 64비트 부호 없는 정수입니다. C 코드는 `version++`를 사용합니다. C 표준에 따라 정수 오버플로우 시 버전은 0으로 래핑됩니다 (그리고 계속 증가합니다).

정수 오버플로우 후, 감시하던 딕셔너리 키가 수정되었음에도 불구하고 가드가 성공할 수 있습니다. 이 버그는 이전 가드 검사 이후 정확히 2^64번의 딕셔너리 생성 또는 수정이 있었을 때만 가드 검사에서 발생합니다.

딕셔너리가 1나노초마다 수정된다고 가정하면, 2^64번의 수정은 584년 이상 걸립니다. 32비트 버전을 사용하면 4초밖에 걸리지 않습니다. 그래서 32비트 시스템에서도 64비트 부호 없는 타입이 사용됩니다. C 레벨에서의 딕셔너리 조회는 14.8ns가 걸립니다.

584년에 한 번 발생하는 버그의 위험은 허용 가능합니다.

## 대안 (Alternatives)

### Python 레벨에서 읽기 전용 `__version__` 속성으로 버전 노출 (Expose the version at Python level as a read-only `__version__` property)
이 PEP의 첫 번째 버전은 딕셔너리 버전을 Python 레벨에서 읽기 전용 `__version__` 속성으로 노출하고, `collections.UserDict`에도 이 속성을 추가할 것을 제안했습니다 (이 타입은 `dict` API를 모방해야 하므로).

여기에는 여러 가지 문제가 있습니다.
*   일관성을 유지하고 예기치 않은 문제를 피하려면 모든 매핑(mapping) 타입에 버전을 추가해야 합니다. 실제로 버전은 `dict` 타입에서만 필요하므로, 새로운 매핑 타입을 구현하는 것은 이점 없이 추가 작업만 필요하게 됩니다.
*   모든 Python 구현이 이 새로운 속성을 구현해야 하며, 다른 구현들은 딕셔너리 버전을 전혀 사용하지 않을 수도 있는데 더 많은 작업을 부여하게 됩니다.
*   Python 레벨에서 딕셔너리 버전을 노출하면 성능에 대한 잘못된 가정을 초래할 수 있습니다. Python 레벨에서 `dict.__version__`을 확인하는 것은 딕셔너리 조회보다 빠르지 않습니다. Python에서 딕셔너리 조회는 48.7ns의 비용이 들고, 버전 확인은 47.5ns의 비용이 들므로 차이는 1.2ns (3%)에 불과합니다.
    ```bash
    $ python3.6 -m timeit -s 'd = {str(i):i for i in range(100)}' 'd["33"] == 33'
    10000000 loops, best of 3: 0.0487 usec per loop
    $ python3.6 -m timeit -s 'd = {str(i):i for i in range(100)}' 'd.__version__ == 100'
    10000000 loops, best of 3: 0.0475 usec per loop
    ```
   
*   `__version__`은 정수 오버플로우 시 래핑될 수 있습니다. 이는 오류를 유발하기 쉽습니다. `dict.__version__ <= guard_version`은 잘못되었고, 정수 오버플로우에 대한 버그 위험을 줄이기 위해 (실제로 정수 오버플로우가 발생할 가능성은 낮지만) `dict.__version__ == guard_version`을 대신 사용해야 합니다.

속성 이름에 대한 필수적인 'bikeshedding'(사소한 것에 대한 불필요한 논쟁)이 있었습니다.
*   `__cache_token__`: Alyssa Coghlan이 제안한 이름으로, `abc.get_cache_token()`에서 유래했습니다.
*   `__version__`
*   `__version_tag__`
*   `__timestamp__`

### 각 딕셔너리 엔트리에 버전 추가 (Add a version to each dict entry)
딕셔너리당 하나의 버전은 값이 예상보다 오래 살아있게 만들 수 있는 강력한 참조(strong reference)를 유지해야 합니다. 각 딕셔너리 엔트리에 버전을 추가하면, 가드는 값에 대한 강력한 참조를 피하기 위해 엔트리 버전 (단순한 정수)만 저장할 수 있습니다. 딕셔너리와 키에 대한 강력한 참조만 필요합니다.

변경 사항: `PyDictKeyEntry` 구조체에 `me_version_tag` 필드를 추가합니다. 이 필드는 C 타입 `PY_UINT64_T`를 가집니다. 키가 생성되거나 수정될 때, 엔트리 버전은 모든 변경 (생성, 수정, 삭제) 시 증가하는 딕셔너리 버전으로 설정됩니다.

가상의 `dict_get_version(dict)` 및 `dict_get_entry_version(dict)` 함수를 사용하여 딕셔너리 키가 수정되었는지 확인하는 빠른 가드의 의사 코드는 다음과 같습니다.

```python
UNSET = object()

class GuardDictKey:
    def __init__(self, dict, key):
        self.dict = dict
        self.key = key
        self.dict_version = dict_get_version(dict)
        self.entry_version = dict_get_entry_version(dict, key)

    def check(self):
        """딕셔너리 엔트리가 변경되지 않았고 딕셔너리가 교체되지 않았다면 True를 반환합니다."""
        # 딕셔너리의 버전을 읽습니다.
        dict_version = dict_get_version(self.dict)
        if dict_version == self.version: # 여기서 self.version 대신 self.dict_version이어야 할 것으로 보입니다 (원문 오류).
            # 빠른 경로(Fast-path): 딕셔너리 조회 생략
            return True

        # 엔트리 버전을 읽기 위해 딕셔너리에서 조회합니다.
        entry_version = get_dict_key_version(dict, key) # 여기서 get_dict_key_version 대신 dict_get_entry_version이어야 할 것으로 보입니다 (원문 오류).
        if entry_version == self.entry_version:
            # 다른 키가 수정되었습니다:
            # 새 딕셔너리 버전을 캐시합니다.
            self.dict_version = dict_version
            self.entry_version = entry_version
            return True

        # 키가 수정되었습니다.
        return False
```


이 옵션의 주요 단점은 메모리 사용량에 미치는 영향입니다. 이는 각 딕셔너리 엔트리의 크기를 증가시키므로, 오버헤드는 버킷(사용되든 안 되든 딕셔너리 엔트리)의 수에 따라 달라집니다. 예를 들어, 64비트 시스템에서는 각 딕셔너리 엔트리의 크기를 8바이트 증가시킵니다.

Python에서는 메모리 사용량이 중요하며, 이를 줄이는 추세입니다. 예시:
*   PEP 393 – Flexible String Representation
*   PEP 412 – Key-Sharing Dictionary

### 새로운 `dict` 하위 타입 추가 (Add a new dict subtype)
새로운 `verdict` 타입을 `dict`의 하위 타입으로 추가하는 것을 제안합니다. 가드가 필요할 때, `dict` 대신 네임스페이스 (모듈 네임스페이스, 타입 네임스페이스, 인스턴스 네임스페이스 등)에 `verdict`를 사용합니다.

가드가 사용되지 않을 때 오버헤드 (CPU, 메모리 사용량)를 추가하지 않도록 `dict` 타입은 변경하지 않고 둡니다.

기술적인 문제: CPython 코어를 포함하여 야생(wild)에는 정확한 `dict` 타입을 예상하는 많은 C 코드가 있습니다. 문제점:
*   `exec()`는 `globals` 및 `locals`에 `dict`를 필요로 합니다. 많은 코드가 `globals={}`를 사용합니다. 호출자가 `globals` 매개변수가 수정될 것으로 예상하기 때문에 `dict`를 `dict` 하위 타입으로 캐스팅하는 것은 불가능합니다 (`dict`는 가변(mutable)입니다).
*   C 함수는 객체가 `dict` 하위 타입인 경우 `PyObject_xxx()` 함수를 호출하는 대신 `PyDict_xxx()` 함수를 직접 호출합니다.
*   일부 함수가 정확한 `dict` 타입을 요구하는 반면, `PyDict_CheckExact()` 검사는 `dict` 하위 타입에서 실패합니다.
*   `Python/ceval.c`는 네임스페이스에 대한 `dict` 하위 타입을 완전히 지원하지 않습니다.

`exec()` 문제는 블로커(blocker) 문제입니다.

다른 문제점:
*   가비지 컬렉터(garbage collector)는 `dict` 인스턴스의 "untrack"를 위한 특별한 코드를 가지고 있습니다. `dict` 하위 타입이 네임스페이스에 사용되면 가비지 컬렉터가 일부 참조 순환(reference cycles)을 끊지 못할 수 있습니다.
*   일부 함수에는 `dict`에 대한 빠른 경로(fast-path)가 있으며, 이는 `dict` 하위 타입에서는 사용되지 않으므로 Python을 약간 느리게 만들 수 있습니다.

## 선행 연구 (Prior Art)

### 메서드 캐시 및 타입 버전 태그 (Method cache and type version tag)
2007년에 Armin Rigo는 메서드 캐시를 구현하는 패치를 작성했습니다. 이는 Python 2.6에 병합되었습니다. 이 패치는 "타입 속성 캐시 버전 태그"(`tp_version_tag`)와 타입에 "유효한 버전 태그" 플래그 (`PyTypeObject` 구조체)를 추가합니다.

타입 버전 태그는 Python 레벨에 노출되지 않습니다.

버전 태그는 C 타입 `unsigned int`를 가집니다. 캐시는 모든 타입이 공유하는 4096개의 엔트리로 구성된 전역 해시 테이블입니다. 캐시는 "빠르게 만들고, 확정적이며 낮은 메모리 사용량을 가지며, 무효화하기 쉽도록" 전역적입니다. 각 캐시 엔트리는 버전 태그를 가집니다. 전역 버전 태그는 다음 버전 태그를 생성하는 데 사용되며, 이 역시 C 타입 `unsigned int`를 가집니다.

기본적으로 타입은 버전 태그가 유효하지 않음을 나타내기 위해 "유효한 버전 태그" 플래그가 지워집니다. 타입의 첫 번째 메서드가 캐시될 때, 버전 태그와 "유효한 버전 태그" 플래그가 설정됩니다. 타입이 수정되면, 해당 타입과 그 서브클래스의 "유효한 버전 태그" 플래그가 지워집니다. 나중에 이러한 타입의 캐시 엔트리가 사용될 때, 해당 엔트리는 버전 태그가 오래되었기 때문에 제거됩니다.

정수 오버플로우 시 전체 캐시가 지워지고 전역 버전 태그는 0으로 재설정됩니다.

메서드 캐시 ([issue #1685986](https://bugs.python.org/issue1685986)) 및 Python 2.6용으로 업데이트된 Armin의 메서드 캐시 최적화 ([issue #1700288](https://bugs.python.org/issue1700288))를 참조하세요.

### Globals / builtins 캐시 (Globals / builtins cache)
2010년에 Antoine Pitrou는 `PyDictObject` 구조체 (`dict` 타입)에 private `ma_version` 필드를 추가하는 Globals / builtins 캐시 ([issue #10401](https://bugs.python.org/issue10401))를 제안했습니다. 이 필드는 C 타입 `Py_ssize_t`를 가집니다.

이 패치는 함수와 프레임에 "전역 및 내장 캐시"를 추가하고, `LOAD_GLOBAL` 및 `STORE_GLOBAL` 명령어를 캐시를 사용하도록 변경합니다.

`PyDictObject` 구조체에 대한 변경 사항은 이 PEP와 매우 유사합니다.

### Cached globals+builtins lookup (캐시된 전역+내장 조회)
2006년에 Andrea Griffini는 Cached globals+builtins lookup 최적화를 구현하는 패치를 제안했습니다. 이 패치는 `PyDictObject` 구조체 (`dict` 타입)에 private `timestamp` 필드를 추가하며, 이 필드는 C 타입 `size_t`를 가집니다.

python-dev 메일링 리스트의 토론: [About dictionary lookup caching (December 2006)](https://mail.python.org/pipermail/python-dev/2006-December/070285.html).

### Guard against changing dict during iteration (반복 중 딕셔너리 변경 방지)
2013년에 Serhiy Storchaka는 반복 중 딕셔너리 변경 방지 ([issue #19332](https://bugs.python.org/issue19332))를 제안했습니다. 이는 `PyDictObject` 구조체 (`dict` 타입)에 `ma_count` 필드를 추가하며, 이 필드는 C 타입 `size_t`를 가집니다. 이 필드는 딕셔너리가 수정될 때마다 증가합니다.

### PySizer
PySizer: Python용 메모리 프로파일러, Nick Smallbone의 Google Summer of Code 2005 프로젝트.

이 프로젝트는 CPython 2.4용 패치를 가지고 있으며, 딕셔너리 엔트리에 `key_time` 및 `value_time` 필드를 추가합니다. 이는 딕셔너리용 전역 프로세스 전체 카운터를 사용하며, 딕셔너리가 수정될 때마다 증가합니다. 이 시간은 자식 객체가 부모 객체에 처음 나타난 시기를 결정하는 데 사용됩니다.

## 논의 (Discussion)
메일링 리스트 토론 스레드.
*   [python-dev: Updated PEP 509](https://mail.python.org/pipermail/python-dev/2016-April/144062.html)
*   [python-dev: RFC: PEP 509: Add a private version to dict](https://mail.python.org/pipermail/python-dev/2016-April/143926.html)
*   [python-dev: PEP 509: Add a private version to dict (January 2016)](https://mail.python.org/pipermail/python-dev/2016-January/142999.html)
*   [python-ideas: RFC: PEP: Add dict.__version__ (January 2016)](https://mail.python.org/pipermail/python-ideas/2016-January/037746.html)

## 수락 (Acceptance)
이 PEP는 2016년 9월 7일 Guido van Rossum에 의해 수락되었습니다. 이 PEP의 구현은 이후 저장소에 커밋되었습니다.

## 저작권 (Copyright)
이 문서는 공용 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.