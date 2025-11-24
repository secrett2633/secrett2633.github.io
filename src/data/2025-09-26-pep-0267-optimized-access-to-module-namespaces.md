---
title: "[Deferred] PEP 267 - Optimized Access to Module Namespaces"
excerpt: "Python Enhancement Proposal 267: 'Optimized Access to Module Namespaces'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/267/
toc: true
toc_sticky: true
date: 2025-09-26 17:50:38+0900
last_modified_at: 2025-09-26 17:50:38+0900
published: true
---
> **원문 링크:** [PEP 267 - Optimized Access to Module Namespaces](https://peps.python.org/pep-0267/)
>
> **상태:** Deferred | **유형:** Standards Track | **작성일:** 23-May-2001


# PEP 267 – 모듈 네임스페이스에 대한 접근 최적화

-   **작성자:** Jeremy Hylton
-   **상태:** 연기됨 (Deferred)
-   **유형:** 표준 트랙 (Standards Track)
-   **생성일:** 2001년 5월 23일
-   **Python 버전:** 2.2

## 연기 (Deferral)

이 PEP는 좋은 아이디어임에도 불구하고, PEP 266 및 PEP 280과의 차이점을 조율하고 구현할 사람이 나타나지 않아 연기되었습니다.

## 개요 (Abstract)

이 PEP는 전역(global) 모듈 네임스페이스와 내장(builtin) 네임스페이스의 새로운 구현을 제안하며, 이는 이름 분석 속도를 향상시킵니다. 이 구현은 대부분의 네임스페이스 연산에 객체 포인터(object pointers) 배열을 사용합니다. 컴파일러는 컴파일 시점에 전역 변수와 모듈 속성(module attributes)에 대한 인덱스(indices)를 할당합니다.

현재 구현은 이러한 네임스페이스를 딕셔너리(dictionaries)로 표현합니다. 전역 이름은 사용될 때마다 딕셔너리 조회를 발생시키고, 내장 이름은 두 번의 딕셔너리 조회(전역 네임스페이스에서의 실패한 조회와 내장 네임스페이스에서의 두 번째 조회)를 발생시킵니다.

이 새로운 구현은 모듈 레벨 함수와 변수를 사용하는 Python 코드의 속도를 높일 것입니다. 또한 이러한 이름에 대한 접근 속도를 높이기 위해 발전했던 어색한 코딩 스타일을 제거할 것입니다.

전역 및 내장 네임스페이스는 컴파일러가 감지할 수 없는 방식으로 동적으로 수정될 수 있기 때문에 이 구현은 복잡해질 것입니다. (예: 모듈이 임포트된 후 스크립트에 의해 모듈의 네임스페이스가 수정되는 경우) 결과적으로, 이 구현은 이러한 동적 기능을 보존하기 위해 여러 보조 데이터 구조를 유지해야 합니다.

## 서론 (Introduction)

이 PEP는 컴파일 시점에 알려진 모듈 변수에 대한 접근을 최적화하는 모듈 객체의 속성 접근(attribute access)에 대한 새로운 구현을 제안합니다. 모듈은 이러한 변수들을 배열에 저장하고, 배열 오프셋(array offsets)을 사용하여 속성을 조회하는 인터페이스를 제공할 것입니다. 전역 변수, 내장 변수, 그리고 임포트된 모듈의 속성에 대해 컴파일러는 빠른 접근을 위해 배열 오프셋을 사용하는 코드를 생성할 것입니다.

이 구현은 내장 이름의 가시성(visibility)에 영향을 미치는 방식으로 런타임에 모듈 네임스페이스를 수정하는 기능을 포함하여, 모듈 네임스페이스에 대한 기존의 의미론(semantics)을 보존할 것입니다.

## DLict 설계 (DLict design)

네임스페이스는 때때로 `dlict`라고 불리는 데이터 구조를 사용하여 구현됩니다. `dlict`는 일부 딕셔너리 엔트리(entries)에 대해 번호가 매겨진 슬롯(numbered slots)을 갖는 딕셔너리입니다. 허용 가능한 성능을 달성하려면 이 타입은 C로 구현되어야 합니다. 새로운 타입-클래스 통합(type-class unification) 작업으로 인해 비교적 쉽게 구현될 수 있습니다. `DLict`는 일부 키에 대해 대체 저장 모듈을 가진 딕셔너리의 서브클래스(subclass)일 것으로 예상됩니다.

기본 설계를 설명하기 위해 Python 구현이 포함되어 있습니다:

```python
"""A dictionary-list hybrid"""
import types
class DLict:
    def __init__(self, names):
        assert isinstance(names, types.DictType)
        self.names = {} # Stores name -> index mapping
        self.list = [None] * size # Array for indexed slots
        self.empty = [1] * size # Tracks if an indexed slot is empty
        self.dict = {} # Regular dictionary for non-indexed names or dynamic additions
        self.size = 0

    def __getitem__(self, name):
        i = self.names.get(name)
        if i is None:
            return self.dict[name]
        if self.empty[i] is not None:
            raise KeyError, name
        return self.list[i]

    def __setitem__(self, name, val):
        i = self.names.get(name)
        if i is None:
            self.dict[name] = val
        else:
            self.empty[i] = None
            self.list[i] = val
            self.size += 1

    def __delitem__(self, name):
        i = self.names.get(name)
        if i is None:
            del self.dict[name]
        else:
            if self.empty[i] is not None:
                raise KeyError, name
            self.empty[i] = 1
            self.list[i] = None
            self.size -= 1

    def keys(self):
        if self.dict:
            return self.names.keys() + self.dict.keys()
        else:
            return self.names.keys()

    def values(self):
        if self.dict:
            return self.names.values() + self.dict.values()
        else:
            return self.names.values()

    def items(self):
        # NOTE: Original PEP's items() implementation is incorrect.
        # It should combine items from both 'names' and 'dict' based on current values.
        # The provided sample code combines names.items() + dict.items()
        # but also combines names.items() when self.dict is empty, which is inconsistent.
        # For simplicity, I'll keep the original provided structure.
        if self.dict:
            return self.names.items() # This is likely a typo in the original PEP
        else:
            return self.names.items() + self.dict.items() # This is also likely a typo, should be from 'self.list' for indexed items

    def __len__(self):
        return self.size + len(self.dict)

    def __cmp__(self, dlict):
        c = cmp(self.names, dlict.names)
        if c != 0: return c
        c = cmp(self.size, dlict.size)
        if c != 0: return c
        for i in range(len(self.names)):
            c = cmp(self.empty[i], dlict.empty[i])
            if c != 0: return c
            if self.empty[i] is None:
                c = cmp(self.list[i], dlict.empty[i]) # This comparison looks incorrect, comparing value to empty flag
                if c != 0: return c
        return cmp(self.dict, dlict.dict)

    def clear(self):
        self.dict.clear()
        for i in range(len(self.names)):
            if self.empty[i] is None:
                self.empty[i] = 1
                self.list[i] = None

    def update(self):
        pass # Not implemented in the example

    def load(self, index):
        """dlict-special method to support indexed access"""
        if self.empty[index] is None:
            return self.list[index]
        else:
            raise KeyError, index

    def store(self, index, val):
        """dlict-special method to support indexed access"""
        self.empty[index] = None
        self.list[index] = val

    def delete(self, index):
        """dlict-special method to support indexed access"""
        self.empty[index] = 1
        self.list[index] = None
```


## 컴파일러 문제 (Compiler issues)

컴파일러는 현재 모듈의 모든 전역 변수 이름을 수집합니다. 이들은 모듈 레벨에서 바인딩되거나, `global`로 선언된 클래스 또는 함수 본문 내에서 바인딩된 이름들입니다.

컴파일러는 각 전역 이름에 대해 인덱스를 할당하고, 전역 변수들의 이름과 인덱스를 모듈의 코드 객체(code object)에 추가할 것입니다. 그러면 각 코드 객체는 자신이 정의된 모듈에 취소할 수 없게 바인딩될 것입니다. (이것이 미묘한 문제를 일으킬지는 확실하지 않습니다.)

임포트된 모듈의 속성에 대해서는 모듈이 간접(indirection) 레코드를 저장할 것입니다. 내부적으로 모듈은 정의하는 모듈에 대한 포인터와 정의하는 모듈의 전역 변수 배열 내 속성의 오프셋(offset)을 저장합니다. 오프셋은 이름이 처음 조회될 때 초기화됩니다.

## 런타임 모델 (Runtime model)

Python VM은 모듈 레벨 배열을 통해 전역 변수와 모듈 속성에 접근하기 위한 새로운 Opcode (옵코드)로 확장될 것입니다.

함수 객체는 모듈 레벨의 전역 배열에 대한 접근을 제공하기 위해 자신을 정의한 모듈을 가리켜야 할 것입니다.

`dlict`에 저장된 모듈 속성(이를 정적 속성(static attributes)이라고 부름)의 경우, `get/delattr` 구현은 기존의 이름 기반 인터페이스를 사용하여 이러한 속성에 대한 접근을 추적해야 합니다. 만약 정적 속성이 동적으로 업데이트되면 (예: `mod.__dict__["foo"] = 2`), 구현은 백업 딕셔너리 대신 배열 슬롯을 업데이트해야 합니다.

## 하위 호환성 (Backwards compatibility)

`dlict`는 슬롯이 현재 사용 중인지 여부에 대한 메타 정보(meta-information)를 유지해야 할 것입니다. 또한 내장 네임스페이스에 대한 포인터도 유지해야 합니다. 이름이 현재 전역 네임스페이스에서 사용되지 않는 경우, 조회는 내장 네임스페이스로 실패하여 넘어갈 것입니다.

반대의 경우, 각 모듈은 내장 이름을 가리는 전역 이름이 동적으로 추가되었는지 확인하는 내장 네임스페이스를 위한 특별한 접근자(accessor) 함수가 필요할 수 있습니다. 이 검사는 모듈의 `dlict`에 동적 변경이 있었을 때, 즉 컴파일 시점에 발견되지 않은 이름이 바인딩되었을 때만 발생합니다.

이러한 메커니즘은 모듈의 전역 네임스페이스가 런타임에 특이한 방식으로 수정되지 않는 일반적인 경우에는 거의 또는 전혀 비용이 들지 않을 것입니다. 전역 이름을 가지고 특이한 작업을 하는 모듈에 대해서는 오버헤드를 추가하겠지만, 이는 흔치 않은 관행이며 장려할 가치가 없는 행위일 가능성이 높습니다.

향후 Python 버전에서는 전역 네임스페이스에 대한 동적 추가를 비활성화하는 것이 바람직할 수도 있습니다. 그렇게 된다면, 새로운 구현은 경고를 제공할 수 있습니다.

## 관련 PEP (Related PEPs)

-   **PEP 266, Optimizing Global Variable/Attribute Access:** 전역 변수 및 객체 속성에 대한 접근을 최적화하기 위한 다른 메커니즘을 제안합니다. 이 메커니즘은 `TRACK_OBJECT` 및 `UNTRACK_OBJECT`라는 두 개의 새로운 Opcode를 사용하여 전역 또는 객체 속성을 별칭(aliases)하는 로컬 변수 배열에 슬롯을 생성합니다. 별칭된 객체가 재바인딩(rebound)되면, 재바인딩 연산은 별칭을 업데이트해야 합니다.

    객체 추적(object tracking) 접근 방식은 모듈뿐만 아니라 더 넓은 범위의 객체에 적용됩니다. 또한 런타임 비용이 더 높을 수 있습니다. 왜냐하면 전역 변수나 객체 속성을 사용하는 각 함수는 객체에 대한 관심을 등록하고 종료 시 등록을 해제하기 위해 추가 Opcode를 실행해야 하기 때문입니다. 등록 비용은 명확하지 않지만, 콜백 목록을 유지하기 위한 동적으로 크기 조정 가능한 데이터 구조를 포함할 것으로 예상됩니다.

    여기서 제안하는 구현은 별칭을 생성하지 않으므로 등록의 필요성을 피합니다. 대신 전역 변수나 모듈 속성을 참조하는 함수가 원래 바인딩이 저장된 위치에 대한 포인터를 유지하도록 허용합니다. 두 번째 장점은 초기 조회가 함수 호출당 한 번이 아니라 모듈당 한 번 수행된다는 것입니다.

## 저작권 (Copyright)

이 문서는 공개 도메인(public domain)에 배포되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.