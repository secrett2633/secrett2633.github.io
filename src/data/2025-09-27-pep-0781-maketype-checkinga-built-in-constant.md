---
title: "[Draft] PEP 781 - MakeTYPE_CHECKINGa built-in constant"
excerpt: "Python Enhancement Proposal 781: 'MakeTYPE_CHECKINGa built-in constant'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/781/
toc: true
toc_sticky: true
date: 2025-09-27 13:57:36+0900
last_modified_at: 2025-09-27 13:57:36+0900
published: true
---
> **원문 링크:** [PEP 781 - MakeTYPE_CHECKINGa built-in constant](https://peps.python.org/pep-0781/)
>
> **상태:** Draft | **유형:** Standards Track | **작성일:** 24-Mar-2025


# PEP 781 – `TYPE_CHECKING`을 내장(Built-in) 상수로 만들기

## 개요
이 문서는 Python 3.15에 도입될 예정인 `PEP 781 – Make TYPE_CHECKING a built-in constant`에 대한 번역 및 요약본입니다. 이 PEP는 `TYPE_CHECKING`이라는 새로운 내장 변수를 추가하여, Python 코드에 타입 어노테이션(type annotations)을 작성하는 경험을 개선하는 것을 목표로 합니다. 이 변수는 정적 타입 체커(static type checker)가 코드를 분석할 때는 `True`로 평가되고, 일반적인 런타임 실행 중에는 `False`로 평가됩니다. 기존의 `typing.TYPE_CHECKING`과는 달리, 별도의 import 문이 필요 없다는 것이 주요 특징입니다.

## 도입 배경 (Motivation)

### 타입 어노테이션과 임포트(Import) 부담
PEP 484에서 정의된 타입 어노테이션은 Python 커뮤니티에서 널리 채택되었습니다. 하지만 타입 어노테이션이 완전히 적용된 코드는 필요한 이름을 스코프(scope)로 가져오기 위해 더 많은 임포트가 필요하며, 신중하게 설계하지 않으면 임포트 사이클(import cycles)을 유발할 수 있다는 문제가 있었습니다. 이러한 문제는 PEP 563 및 PEP 649를 통해 타입 어노테이션의 지연 평가(deferred evaluation) 메커니즘이 도입되면서 어느 정도 해소되었습니다. PEP 563에서 언급했듯이 "타입 힌트는 … 계산적으로 무료가 아니다"라는 점은 중요한 부분입니다. 이에 따라 처음에는 순환 임포트를 해결하는 데 도움을 주기 위해 `typing.TYPE_CHECKING` 상수가 도입되었습니다.

### `typing` 모듈 임포트의 성능 문제
명령줄 인터페이스, 애플리케이션 또는 핵심 라이브러리와 같이 시작 시간(startup time)이 중요한 상황에서, 개발자들은 런타임 실행에 필요 없는 모든 임포트 문을 `TYPE_CHECKING` 블록 내에 배치하거나, 특정 임포트를 함수 내로 지연시키곤 했습니다. 그러나 `typing` 모듈 자체를 임포트하는 데 최대 10ms가 소요될 수 있는데, 이는 Python이 초기화되는 시간보다 길 수 있습니다. `typing` 모듈을 임포트하는 데 걸리는 시간은 분명히 무시할 수 없는 수준입니다.

### 표준화된 접근 방식의 필요성
현재 개발자들은 `typing`에서 `TYPE_CHECKING`을 임포트하는 것을 피하기 위해 `TYPE_CHECKING = False`와 같은 모듈 수준 변수를 정의하거나 `if False: # TYPE_CHECKING`과 같은 코드를 사용합니다. 표준화된 방법을 제공하면 많은 도구가 동일한 동작을 일관되게 구현할 수 있습니다. 또한, 일부 정적 타입 체커가 로컬 상수(local constants)를 허용하지 않고 `typing.TYPE_CHECKING`만 인식하는 경우가 있으므로, 보장된 의미론(guaranteed semantics)을 가진 단일 동작으로 생태계 내의 서드파티 도구들을 표준화할 수 있게 됩니다.

## 제안 내용 (Specification)

### `TYPE_CHECKING` 내장 상수
PEP 781은 `TYPE_CHECKING`을 내장 상수(built-in constant)로 추가할 것을 제안합니다.
- `TYPE_CHECKING`의 런타임 값은 `False`입니다.
- `True`, `False`, `None`, `__debug__`와는 달리, `TYPE_CHECKING`은 실제 상수(real constant)가 아닙니다. 따라서 이 변수에 값을 할당해도 `SyntaxError`가 발생하지 않습니다.
- 정적 타입 체커는 `typing.TYPE_CHECKING`과 유사하게 `TYPE_CHECKING`을 `True`로 처리해야 합니다.

### `typing.TYPE_CHECKING`의 Deprecation
이 PEP가 채택되면, 새로운 내장 `TYPE_CHECKING` 상수가 권장되는 접근 방식이 됩니다.
- `typing.TYPE_CHECKING`을 임포트하는 것은 `deprecated`될 예정입니다.
- `typing` 모듈의 런타임 영향을 최소화하기 위해, 이 `deprecation`은 Python 3.13의 EOL(End of Life)이 예정된 2029년 10월 이후에나 `DeprecationWarning`을 발생시킬 것입니다.
- 대신, 타입 체커는 검사 대상 프로그램의 버전이 Python 3.14 이상으로 지정된 경우, 이러한 `deprecated` 사용에 대해 경고할 수 있습니다.

## 하위 호환성 (Backwards Compatibility)
`TYPE_CHECKING`은 할당을 금지하지 않으므로, 기존에 `TYPE_CHECKING`을 사용하던 코드는 계속 작동합니다.

```python
# 이 코드는 계속 작동합니다.
TYPE_CHECKING = False
from typing import TYPE_CHECKING
```
사용자는 Python 3.13 또는 이전 버전 사용을 중단한 후에 `TYPE_CHECKING`에 대한 할당을 제거할 수 있습니다.

## 교육 방법 (How to Teach This)
- 런타임에 타입 검사 전용 코드를 건너뛰려면 `if TYPE_CHECKING:`을 사용하세요.
- Python 3.14 이전 버전을 지원해야 하는 경우 `from typing import TYPE_CHECKING`을 사용하세요.
- `TYPE_CHECKING = False` 또는 `if False: # TYPE_CHECKING`와 같은 우회 방법(workarounds)은 계속 작동하지만 권장되지는 않습니다.

## 채택되지 않은 아이디어 (Rejected Ideas)

### 타입 검사 전용 코드 제거 (Eliminate type-checking-only code)
컴파일 시 타입 검사 전용 코드를 제거하기 위해 `__type_checking__`이라는 실제 상수(real constant)를 추가하는 방안이 고려되었습니다.
그러나 언어에 실제 상수를 추가하는 것은 언어의 복잡성을 증가시킵니다. 타입 검사 전용 코드를 제거함으로써 얻는 이점은 이러한 복잡성을 정당화하기에 충분하지 않다고 판단되었습니다.

### `import typing` 최적화 (Optimize import typing)
미래의 최적화를 통해 시작 시간 때문에 `typing` 모듈을 임포트하지 않아도 되는 경우가 생길 수 있습니다.
하지만 그러한 최적화가 이루어지더라도, 임베디드 시스템(embedded systems)이나 브라우저(browsers)에서 Python을 실행하는 경우와 같이 임포트를 최소화하는 것이 여전히 유용한 사용 사례가 있을 것입니다.
따라서 `typing` 모듈 외부에서 타입 검사 전용 코드를 건너뛰기 위한 상수를 정의하는 것은 여전히 가치가 있습니다.## PEP 781 – `TYPE_CHECKING`을 내장(Built-in) 상수로 만들기

### 개요
이 Python Enhancement Proposal (PEP) 781은 `TYPE_CHECKING`이라는 새로운 내장 변수를 Python에 추가하여 타입 어노테이션(type annotations)을 사용하는 Python 코드 작성 경험을 개선하는 것을 제안합니다. 이 변수는 코드가 정적 타입 체커(static type checker)에 의해 분석될 때는 `True`로 평가되며, 일반적인 런타임 실행 중에는 `False`로 평가됩니다. 기존의 `typing.TYPE_CHECKING`과 달리, 이 새로운 내장 상수는 별도의 `import` 문 없이 사용할 수 있다는 장점이 있습니다.

### 도입 배경 (Motivation)

#### 타입 어노테이션의 부상과 `import` 부담
PEP 484를 통해 Python에 도입된 타입 어노테이션은 널리 사용되고 있습니다. 하지만 완전히 어노테이션된 코드는 필요한 타입 이름을 스코프(scope)로 가져오기 위해 많은 `import` 문을 필요로 하며, 이는 신중하게 설계하지 않으면 `import cycle`을 유발할 수 있습니다. 이러한 문제를 해결하기 위해 PEP 563과 PEP 649는 타입 어노테이션의 지연 평가(deferred evaluation) 메커니즘을 도입했습니다. `PEP 563`이 지적했듯이 "타입 힌트는 … 계산적으로 무료가 아니다"라는 점은 중요하며, `typing.TYPE_CHECKING` 상수는 원래 순환 임포트를 해결하는 데 도움을 주기 위해 도입되었습니다.

#### `typing` 모듈 임포트의 성능 문제
명령줄 인터페이스(CLI), 애플리케이션 또는 핵심 라이브러리와 같이 시작 시간(startup time)이 중요한 시나리오에서, 개발자들은 런타임 실행에 필요 없는 모든 `import` 문을 `TYPE_CHECKING` 블록 내에 배치하거나 특정 `import`를 함수 내로 지연시키기도 합니다. 그러나 `typing` 모듈 자체를 임포트하는 데 최대 10밀리초(ms)가 소요될 수 있는데, 이는 Python 인터프리터가 초기화되는 시간보다 길 수 있습니다. `typing` 모듈 임포트에 소요되는 시간은 무시할 수 없는 오버헤드입니다.

#### 표준화된 접근 방식의 필요성
현재 개발자들은 `typing` 모듈에서 `TYPE_CHECKING`을 `import`하는 것을 피하기 위해 `TYPE_CHECKING = False`와 같은 모듈 수준 변수를 정의하거나 `if False: # TYPE_CHECKING`과 같은 코드를 사용합니다. 표준화된 `TYPE_CHECKING` 내장 상수를 제공함으로써, 다양한 도구들이 동일한 동작을 일관되게 구현할 수 있게 됩니다. 또한, 일부 정적 타입 체커는 로컬 상수(local constants)를 인식하지 못하고 `typing.TYPE_CHECKING`만 인식하는 경우가 있으므로, 보장된 의미론(guaranteed semantics)을 가진 단일 동작으로 생태계 내의 서드파티 도구들을 표준화할 수 있게 됩니다.

### 제안 내용 (Specification)

#### `TYPE_CHECKING` 내장 상수
PEP 781은 `TYPE_CHECKING`을 내장 상수(built-in constant)로 추가할 것을 제안합니다.
*   **런타임 값:** `TYPE_CHECKING`의 런타임 값은 항상 `False`입니다.
*   **할당 가능성:** `True`, `False`, `None`, `__debug__`와 같은 "진정한(real)" 상수와는 달리, `TYPE_CHECKING`은 실제 상수가 아닙니다. 따라서 이 변수에 값을 재할당해도 `SyntaxError`가 발생하지 않습니다.
*   **타입 체커 동작:** 정적 타입 체커는 `typing.TYPE_CHECKING`과 유사하게 `TYPE_CHECKING`을 `True`로 처리해야 합니다.

#### `typing.TYPE_CHECKING`의 Deprecation
이 PEP가 채택되면, 새로운 내장 `TYPE_CHECKING` 상수가 타입 검사 전용 코드에 권장되는 접근 방식이 됩니다.
*   **`deprecated` 예정:** `typing.TYPE_CHECKING`을 임포트하는 것은 `deprecated`될 예정입니다.
*   **경고 시점:** `typing` 모듈의 런타임 영향을 최소화하기 위해, 이 `deprecation`은 Python 3.13의 EOL(End of Life)이 예정된 2029년 10월 이후에야 `DeprecationWarning`을 발생시킬 것입니다.
*   **타입 체커 경고:** 대신, 타입 체커는 검사 대상 프로그램의 버전이 Python 3.14 이상으로 지정된 경우, `typing.TYPE_CHECKING`과 같은 `deprecated` 사용에 대해 경고할 수 있습니다.

### 하위 호환성 (Backwards Compatibility)
`TYPE_CHECKING`이 값 할당을 금지하지 않으므로, 기존에 `TYPE_CHECKING`을 사용하던 코드는 계속해서 문제없이 작동합니다.

```python
# 이 코드는 Python 3.14+에서도 계속 작동합니다.
TYPE_CHECKING = False
from typing import TYPE_CHECKING
```
사용자는 Python 3.13 또는 이전 버전 사용을 중단한 후에 `TYPE_CHECKING`에 대한 사용자 정의 할당을 제거할 수 있습니다.

### 교육 방법 (How to Teach This)
*   **타입 검사 전용 코드:** 런타임에 타입 검사 전용 코드를 건너뛰려면 `if TYPE_CHECKING:`을 사용하세요.
*   **이전 버전 지원:** Python 3.14 이전 버전을 지원해야 하는 경우에는 `from typing import TYPE_CHECKING`을 계속 사용해야 합니다.
*   **기존 우회 방법:** `TYPE_CHECKING = False` 또는 `if False: # TYPE_CHECKING`와 같은 기존의 우회 방법(workarounds)은 계속 작동하지만, 더 이상 권장되지 않습니다.

### 채택되지 않은 아이디어 (Rejected Ideas)

#### 타입 검사 전용 코드 제거 (Eliminate type-checking-only code)
컴파일 시 타입 검사 전용 코드를 완전히 제거하기 위해 `__type_checking__`이라는 "진정한" 상수를 추가하는 방안이 고려되었습니다.
그러나 언어에 실제 상수를 추가하는 것은 언어의 복잡성을 증가시킵니다. 타입 검사 전용 코드를 제거함으로써 얻는 이점은 이러한 언어 복잡성 증가를 정당화하기에 충분하지 않다고 판단되었습니다.

#### `import typing` 최적화 (Optimize import typing)
미래에는 `typing` 모듈 임포트의 시작 시간 오버헤드를 줄이는 최적화가 이루어져, `typing` 모듈 임포트를 피해야 할 필요가 줄어들 수도 있습니다.
하지만 그러한 최적화가 이루어지더라도, 임베디드 시스템(embedded systems)이나 브라우저(browsers)에서 Python을 실행하는 경우와 같이 `import`를 최소화하는 것이 여전히 유용한 사용 사례가 있을 것입니다.
따라서 `typing` 모듈 외부에서 타입 검사 전용 코드를 건너뛰기 위한 상수를 정의하는 것은 여전히 가치가 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.