---
title: "[Final] PEP 307 - Extensions to the pickle protocol"
excerpt: "Python Enhancement Proposal 307: 'Extensions to the pickle protocol'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/307/
toc: true
toc_sticky: true
date: 2025-09-26 18:10:28+0900
last_modified_at: 2025-09-26 18:10:28+0900
published: true
---
> **원문 링크:** [PEP 307 - Extensions to the pickle protocol](https://peps.python.org/pep-0307/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 31-Jan-2003


# PEP 307 – pickle 프로토콜 확장

## 개요
이 PEP는 Python 2.3에서 도입된 새로운 pickle 프로토콜을 설명하며, 기존 `new-style` 객체들의 `pickle` 처리 문제를 해결하고 `pickle` 크기를 최적화합니다. 주로 API 변경 사항에 중점을 두지만, 일부 바이트 스트림 형식 세부 사항도 다룹니다. `pickle` 바이트 스트림 형식은 `pickletools.py` 모듈에 공식적으로 문서화되어 있습니다.

## 동기
Python 2.2에서 `new-style` 객체를 `pickle`하는 것은 비효율적이었고, `classic` 클래스 인스턴스에 비해 `pickle` 크기가 과도하게 커지는 문제가 있었습니다. 예를 들어, 간단한 `new-style` 객체의 `pickle` 크기는 `classic` 객체보다 훨씬 컸습니다 (33바이트 vs 86바이트). 이러한 비대화는 `new-style` 객체가 `pickle` 가능하려면 `__reduce__`를 사용해야 했기 때문입니다. 새로운 프로토콜(프로토콜 2)을 도입함으로써, 이 문제는 해결되어 `pickle` 크기가 크게 줄어듭니다 (위 예시에서 35바이트).

## 프로토콜 버전
기존 `pickle` 프로토콜은 텍스트 모드와 바이너리 모드로 구분되었습니다. 이제 텍스트 모드는 프로토콜 0, 바이너리 모드는 프로토콜 1로 명명됩니다. 이 PEP에서 새로 소개하는 프로토콜은 프로토콜 2입니다. `pickle` 프로토콜의 전통에 따라 프로토콜 2는 프로토콜 1의 상위 집합입니다.

- **프로토콜 식별**: 프로토콜 2 `pickle`은 시작 부분에 해당 프로토콜 버전을 나타내는 새로운 `opcode`를 포함합니다. 이는 이전 Python 버전에서 프로토콜 2 `pickle`을 `unpickle`하려고 할 경우 즉시 "알 수 없는 `opcode`" 예외를 발생시킵니다.
- **`protocol` 인자**: `pickle` 관련 함수, 메서드, 생성자에서 바이너리 모드를 나타내던 `bin` 인자는 `protocol`로 이름이 변경되었고, 이제 프로토콜 번호를 받습니다 (기본값은 0).
- **최고 프로토콜 버전**: `-1`을 `protocol` 인자로 전달하면 해당 구현이 지원하는 가장 높은 프로토콜 버전을 선택할 수 있습니다. `pickle` 및 `cPickle` 모듈은 `HIGHEST_PROTOCOL` 상수를 제공하여 모듈이 읽을 수 있는 가장 높은 프로토콜 번호를 확인할 수 있습니다.
- **`bin` 키워드 인자 경고**: `bin`을 키워드 인자로 전달하는 방식은 `PendingDeprecationWarning`이 발생하며 Python 2.4에서는 `DeprecationWarning`으로 격상될 예정입니다.

## 보안 문제
이전 Python 버전에서는 `unpickle` 시 `__safe_for_unpickling__` 속성이 1로 설정되었거나 `copy_reg.safe_constructors`에 등록된 함수만 호출하도록 하는 "안전 검사" 기능이 있었습니다. 그러나 이 기능은 잘못된 보안 의식을 줄 수 있으며, 실제로 Python 2.2 `pickle.py` 모듈의 버그로 인해 우회될 수 있었습니다.

Python 2.3부터는 이러한 모든 안전 검사가 공식적으로 제거되었고, 다음과 같은 경고로 대체됩니다.

**경고**: 신뢰할 수 없거나 인증되지 않은 소스에서 받은 데이터를 `unpickle`하지 마십시오.

이 경고는 안전 검사가 존재하는 이전 Python 버전에도 동일하게 적용됩니다.

## 확장된 `__reduce__` API
클래스가 `pickle`을 제어하기 위해 사용할 수 있는 여러 API가 있습니다. 가장 널리 사용되는 것은 `__getstate__`와 `__setstate__`이지만, 가장 강력한 것은 `__reduce__`입니다.

`__reduce__` 기능은 클래스에서 `__reduce__` 메서드나 `__reduce_ex__` 메서드를 구현하거나, `copy_reg`에 `reduce` 함수를 선언하여 제공할 수 있습니다. 반환 값은 동일하게 해석됩니다.

**중요**: `classic` 클래스 인스턴스의 `pickle`은 `__reduce__` 또는 `__reduce_ex__` 메서드를 찾지 않으므로, `classic` 클래스는 `__getinitargs__` 및/또는 `__getstate__`를 사용하여 `pickle`을 사용자 정의해야 합니다.

`__reduce__`는 문자열 또는 튜플을 반환해야 합니다.

- **문자열 반환**: 객체의 상태를 `pickle`하지 않고, 이름으로 참조되는 동등한 객체의 참조를 반환합니다. 반환되는 문자열은 객체의 로컬 이름이어야 합니다.
- **튜플 반환**: 길이가 2에서 5까지의 가변 크기 튜플입니다. 처음 두 항목(함수 및 인자)은 필수이며, 나머지 항목은 선택 사항입니다 (새로운 두 항목 포함).
    1.  **`function` (필수)**: 객체의 초기 버전을 생성하기 위해 호출되는 `callable` 객체입니다. 나중에 `state`를 추가하여 `pickle`된 상태를 완전히 재구성할 수 있습니다. 이 함수는 그 자체로 `pickle` 가능해야 합니다.
    2.  **`arguments` (필수)**: `function`에 대한 인자 목록을 제공하는 튜플입니다. `None`일 수도 있습니다 (Zope 2의 `ExtensionClass`를 위해 설계되었으나 `deprecated`).
    3.  **`state` (선택 사항, `new in this PEP`)**: 추가 상태입니다. `None`이 아니면 `state`가 `pickle`되고, `unpickle` 시 `obj.__setstate__(state)`가 호출됩니다. `__setstate__`가 정의되지 않으면 기본 구현은 `state`가 인스턴스 변수 이름을 값에 매핑하는 사전이라고 가정합니다.
    4.  **`listitems` (선택 사항, `new in this PEP`)**: `None`이 아니면 연속적인 리스트 항목을 생성하는 `iterator`여야 합니다. 이 항목들은 `pickle`되고 `obj.append(item)` 또는 `obj.extend(list_of_items)`를 사용하여 객체에 추가됩니다. 주로 리스트 서브클래스에 사용됩니다.
    5.  **`dictitems` (선택 사항, `new in this PEP`)**: `None`이 아니면 `(key, value)` 형태의 튜플로 구성된 연속적인 사전 항목을 생성하는 `iterator`여야 합니다. 이 항목들은 `pickle`되고 `obj[key] = value`를 사용하여 객체에 저장됩니다. 주로 딕셔너리 서브클래스에 사용됩니다.

**참고**: Python 2.3부터 `__reduce__`가 `None` 값을 가진 `state`를 반환할 때 `unpickle` 시 `__setstate__`는 호출되지 않습니다.

`__reduce__` 구현이 Python 2.2와 2.3 모두에서 작동해야 하는 경우, `pickle.format_version` 변수를 확인하여 `listitems` 및 `dictitems` 기능 지원 여부를 결정할 수 있습니다. 이 값이 `>= "2.0"`이면 지원됩니다.

## `__reduce_ex__` API
`__reduce__`를 구현할 때 프로토콜 버전을 아는 것이 유용할 때가 있습니다. 이를 위해 `__reduce__` 대신 `__reduce_ex__` 메서드를 구현할 수 있습니다. `__reduce_ex__`는 존재할 경우 `__reduce__`보다 우선적으로 호출되며, 단일 정수 인자로 프로토콜 버전을 받습니다.

`object` 클래스는 `__reduce__`와 `__reduce_ex__`를 모두 구현합니다. 하지만 서브클래스가 `__reduce__`만 오버라이드하고 `__reduce_ex__`는 오버라이드하지 않으면, `__reduce_ex__` 구현이 이를 감지하고 `__reduce__`를 호출합니다.

## `__reduce__` 구현이 없는 경우 `pickle` 사용자 정의
특정 클래스에 `__reduce__` 구현이 없는 경우, 세 가지 경우가 다르게 처리됩니다.

1.  **`classic` 클래스 인스턴스, 모든 프로토콜**:
    -   `__reduce__`는 사용되지 않습니다. 대신 `__getstate__`, `__setstate__`, `__getinitargs__` 메서드를 통해 `pickle`을 사용자 정의할 수 있습니다.
    -   **`__getstate__`**: 객체 자체를 참조하지 않고 객체의 상태를 나타내는 `pickle` 가능한 값을 반환해야 합니다. 기본 구현은 `self.__dict__`를 반환합니다.
    -   **`__setstate__`**: `__getstate__` (또는 기본 구현)에 의해 반환된 값으로 호출됩니다. 기본 구현은 `state`가 인스턴스 변수 이름을 값에 매핑하는 사전이라고 가정합니다.
    -   **`__getinitargs__`**: `__setstate__`를 호출하기 전에 새 객체를 생성해야 합니다. `__getinitargs__` 메서드가 있을 경우, 이 메서드가 반환하는 튜플을 인자 목록으로 사용하여 클래스 생성자를 호출하여 인스턴스가 생성됩니다.

2.  **`new-style` 클래스 인스턴스, 프로토콜 0 및 1**:
    -   Python 2.2와 동일하게 변경되지 않았습니다.
    -   `object`에서 상속받은 기본 `__reduce__` 구현이 사용됩니다. 이 기본 `__reduce__`는 `copy_reg._reconstructor`를 `callable`로, `(D, B, basestate)`를 인자로 사용합니다.
    -   `__getstate__` 및/또는 `__setstate__` 메서드를 정의하여 사용자 정의할 수 있습니다. `__getstate__`가 `None`과 같이 `false`로 간주되는 값을 반환하면 `state`는 `pickle`되지 않고 `__setstate__`는 호출되지 않습니다.
    -   `slots`가 있는 `new-style` 클래스 인스턴스는 `__getstate__` 메서드가 없으면 프로토콜 0 및 1로 `pickle`될 수 없습니다.
    -   `__getinitargs__`는 무시됩니다.

3.  **`new-style` 클래스 인스턴스, 프로토콜 2**:
    -   `object`에서 상속받은 기본 `__reduce__` 구현은 무시됩니다. 대신 다른 기본 구현이 사용되어 프로토콜 0 또는 1보다 `new-style` 클래스 인스턴스를 더 효율적으로 `pickle`할 수 있습니다.
    -   `__getstate__`, `__setstate__`, `__getnewargs__` 세 가지 특수 메서드를 사용하여 사용자 정의합니다. (`__getinitargs__`는 다시 무시됩니다.)
    -   **`__getstate__`**: `classic` 클래스와는 미묘한 차이가 있습니다. `new-style` 클래스의 `__getstate__`가 `None`을 반환하면 `unpickle` 시 `__setstate__`가 전혀 호출되지 않습니다.
    -   **`__setstate__`**: `__getstate__`가 반환하는 값 또는 위에서 설명한 기본 `state`로 호출됩니다.
    -   **`__getnewargs__`**: `__setstate__`를 호출하기 전에 새 객체를 생성해야 합니다. 프로토콜 2에서는 `C.__new__(C, *args)`와 같이 새 객체가 생성되도록 하는 새로운 `pickle` `opcode`가 사용됩니다. `args`는 `__getnewargs__` 메서드가 정의된 경우 반환되는 튜플입니다.

## `__newobj__` `unpickling` 함수
`__reduce__`가 반환하는 `unpickling` 함수(튜플의 첫 번째 항목)의 이름이 `__newobj__`인 경우, `pickle` 프로토콜 2에서는 특별한 처리가 이루어집니다. `__newobj__`라는 이름의 `unpickling` 함수는 `cls.__new__(cls, *args)`와 같은 의미를 갖는다고 가정합니다.

`pickle` 프로토콜 2는 이 이름의 `unpickling` 함수를 특별히 처리하여, `__newobj__`에 대한 참조를 `pickle`하지 않고 `cls.__new__(cls, *args)`를 반환하는 `pickle` `opcode`를 발행합니다. 이것이 프로토콜 2 `pickle`이 `classic` `pickle`보다 훨씬 작은 주된 이유입니다.

## 확장 레지스트리 (Extension Registry)
프로토콜 2는 `pickle` 크기를 줄이기 위한 새로운 메커니즘을 지원합니다. 클래스 인스턴스가 `pickle`될 때, 클래스의 전체 이름(모듈 이름, 패키지 이름, 클래스 이름 포함)이 `pickle`에 포함됩니다. 특히 많은 작은 `pickle`을 생성하는 애플리케이션의 경우, 이는 각 `pickle`에서 반복되어야 하는 많은 오버헤드를 유발합니다.

확장 레지스트리는 가장 자주 사용되는 이름을 작은 정수로 나타낼 수 있게 하여 매우 효율적으로 `pickle`됩니다. 1-255 범위의 확장 코드는 `opcode`를 포함하여 2바이트만 필요하며, 256-65535 범위는 `opcode`를 포함하여 3바이트만 필요합니다.

확장 레지스트리는 확장 코드와 이름 간의 매핑으로 정의됩니다. `unpickle`될 때 확장 코드는 객체를 생성하지만, 이 객체는 모듈 이름과 클래스(또는 함수) 이름으로 이름을 해석하여 얻습니다.

확장 코드 범위는 다음과 같이 제안됩니다.
- `0`: 예약됨 (사용되지 않음)
- `1` - `127`: Python 표준 라이브러리용
- `128` - `191`: Zope용
- `192` - `239`: 서드파티용
- `240` - `255`: 사적 사용 (할당되지 않음)
- `256` - `MAX` (2^31 - 1): 향후 할당용

### 확장 레지스트리 API
확장 레지스트리는 `copy_reg` 모듈의 private 전역 변수로 관리됩니다. 레지스트리를 조작하기 위해 다음 세 가지 함수가 정의됩니다.

-   **`add_extension(module, name, code)`**: 확장 코드를 등록합니다. `module`과 `name`은 문자열이어야 하며, `code`는 `1`부터 `MAX`까지의 정수여야 합니다.
-   **`remove_extension(module, name, code)`**: 이전에 등록된 `(module, name)`과 `code` 간의 매핑을 제거합니다.
-   **`clear_extension_cache()`**: 확장 코드 구현이 자주 명명되는 객체를 로드하는 속도를 높이기 위해 캐시를 사용할 수 있습니다. 이 메서드를 호출하여 캐시를 비울 수 있습니다.

## `copy` 모듈
전통적으로 `copy` 모듈은 `copy()` 및 `deepcopy()` 작업을 사용자 정의하기 위한 `pickle` API의 확장된 서브셋을 지원했습니다. Python 2.3에서는 `copy` 모듈에 여러 변경 사항이 적용됩니다.

-   `__reduce_ex__`가 지원됩니다 (항상 프로토콜 버전 2로 호출됨).
-   `__reduce__`의 4개 및 5개 인자 반환 값이 지원됩니다.
-   `__reduce__` 메서드를 찾기 전에 `pickle`과 마찬가지로 `copy_reg.dispatch_table`을 참조합니다.
-   `object`에서 `__reduce__` 메서드를 상속받은 경우, `pickle` 프로토콜 2와 동일한 API(`__getnewargs__`, `__getstate__`, `__setstate__`)를 사용하여 더 나은 구현으로 (무조건) 대체됩니다.

이러한 변경으로 인해 Python 2.2에서 `copy` 가능했던 일부 `new-style` 클래스가 Python 2.3에서는 `copy` 불가능할 수 있습니다. 이는 `__new__`가 오버라이드되고 클래스 인자 외에 하나 이상의 필수 인자를 가질 때 발생합니다. 이를 해결하려면 적절한 인자 튜플을 반환하는 `__getnewargs__` 메서드를 추가해야 합니다.

## Python `long`s `pickle`링
프로토콜 0과 1에서는 Python `long`s(`정수`)를 `pickle` 및 `unpickle`하는 데 자릿수에 따라 2차 시간 복잡도가 소요되었습니다. 프로토콜 2에서는 새로운 `opcode`가 선형 시간 복잡도로 `long`s를 `pickle` 및 `unpickle`할 수 있도록 지원합니다.

## `bool`s `pickle`링
프로토콜 2는 `True`와 `False`를 직접 `pickle`하기 위한 새로운 `opcode`를 도입합니다. 프로토콜 0과 1에서는 `bool`이 정수로 `pickle`되었고, 이는 `bool`당 4바이트를 소비했습니다. 새로운 `bool` `opcode`는 `bool`당 1바이트를 소비합니다.

## 작은 튜플 `pickle`링
프로토콜 2는 길이가 1, 2, 3인 튜플을 더 간결하게 `pickle`하기 위한 새로운 `opcode`를 도입합니다. 프로토콜 1에서는 빈 튜플을 더 간결하게 `pickle`하기 위한 `opcode`가 이전에 도입되었습니다.

## 대규모 리스트 및 딕셔너리 `pickle`링
프로토콜 1은 대규모 리스트와 딕셔너리를 "한 덩어리"로 `pickle`하여 `pickle` 크기를 최소화하지만, `unpickle` 시 `unpickle`되는 객체만큼 큰 임시 객체를 생성해야 했습니다. 프로토콜 2의 변경 사항 중 일부는 대규모 리스트와 딕셔너리를 최대 1000개의 요소로 구성된 조각으로 분할하여 `unpickle` 시 1000개의 요소를 담는 데 필요한 것보다 큰 임시 객체를 생성할 필요가 없도록 합니다.

---
This concludes the translation and summary of PEP 307.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.