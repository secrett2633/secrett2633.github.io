---
title: "[Final] PEP 208 - Reworking the Coercion Model"
excerpt: "Python Enhancement Proposal 208: 'Reworking the Coercion Model'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/208/
toc: true
toc_sticky: true
date: 2025-09-26 16:20:00+0900
last_modified_at: 2025-09-26 16:20:00+0900
published: true
---
> **원문 링크:** [PEP 208 - Reworking the Coercion Model](https://peps.python.org/pep-0208/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 04-Dec-2000

PEP 208 – Coercion 모델 재작업 (Reworking the Coercion Model)

## 개요 (Abstract)

많은 Python 타입은 숫자 연산(numeric operations)을 구현합니다. 숫자 연산의 인자들이 서로 다른 타입일 경우, 인터프리터는 인자들을 공통 타입으로 `coercion`(강제 변환)하려고 시도합니다. 그런 다음 이 공통 타입을 사용하여 숫자 연산을 수행합니다.

이 PEP는 타입의 숫자 연산에 대한 인자들이 강제 변환되지 않아야 함을 나타내는 새로운 타입 플래그를 제안합니다. 제공된 타입을 지원하지 않는 연산은 새로운 싱글턴 객체를 반환하여 이를 나타냅니다. 이 타입 플래그를 설정하지 않는 타입은 이전 버전과의 호환성을 유지하는 방식으로 처리됩니다.

연산이 서로 다른 타입을 직접 처리하도록 허용하는 것은 인터프리터가 강제 변환을 수행하는 것보다 종종 더 간단하고, 유연하며, 빠릅니다.

## 도입 배경 (Rationale)

숫자 또는 관련 연산을 구현할 때, 단일 타입 피연산자(operand) 간의 연산(예: 정수 + 정수)뿐만 아니라, 연산의 개념을 다른 타입 조합(예: 정수 + float)으로 일반화하는 것이 바람직한 경우가 많습니다.

이러한 혼합 타입 상황에 대한 일반적인 접근 방식은 피연산자를 공통 타입으로 "끌어올린(lifting)" 다음(즉, `coercion`을 통해), 해당 타입의 피연산자 메서드를 실행 메커니즘으로 사용하는 것입니다. 그러나 이 전략에는 몇 가지 단점이 있습니다.

*   "끌어올리는(lifting)" 과정은 최소한 하나의 새로운 (임시) 피연산자 객체를 생성합니다.
*   `coercion` 메서드가 다음에 수행될 연산에 대해 알 수 없으므로, 연산별 `coercion`을 구현하는 것이 불가능합니다.
*   공통 타입을 사용할 수 없는 상황을 우아하게 해결할 방법이 없습니다.
*   `coercion` 메서드는 연산 메서드 자체보다 항상 먼저 호출되어야 합니다.

이러한 단점들은 이 기능을 필요로 하는 타입의 구현을 불가능하지는 않더라도 매우 번거롭게 만들므로, 이 상황에 대한 해결책이 분명히 필요합니다. 예를 들어, 절대적인 값인 `DateTime`과 상대적인 값인 `DateTimeDelta` 타입을 살펴보십시오. 상대적인 값을 절대적인 값에 항상 더하여 새로운 절대적인 값을 얻을 수 있습니다. 그러나 기존 `coercion` 메커니즘이 이 연산을 구현하는 데 사용할 수 있는 공통 타입은 없습니다.

현재 `PyInstance` 타입은 숫자 메서드에 다른 타입의 인자가 전달된다는 점에서 인터프리터에 의해 특별히 처리됩니다. 이 특별한 경우를 제거하면 인터프리터가 단순화되고 다른 타입이 인스턴스 타입처럼 동작하는 숫자 메서드를 구현할 수 있게 됩니다. 이는 `ExtensionClass`와 같은 확장 타입에 특히 유용합니다.

## 명세 (Specification)

중앙 집중식 `coercion` 메서드를 사용하는 대신, 서로 다른 피연산자 타입을 처리하는 과정은 단순히 연산 자체에 맡겨집니다. 연산이 주어진 피연산자 타입 조합을 처리할 수 없다고 판단하면, 특별한 싱글턴 객체를 반환하여 이를 나타낼 수 있습니다.

Python으로 작성된 "숫자"(숫자 프로토콜 또는 그 일부를 구현하는 모든 것)는 이미 이 전략의 첫 부분을 사용하고 있다는 점에 유의해야 합니다. 여기서 우리는 C 레벨 API에 초점을 맞춥니다.

거의 100%의 하위 호환성을 유지하기 위해, 새로운 전략에 대해 전혀 모르는 숫자(`old style numbers`)가 새로운 스키마를 기대하는 숫자(`new style numbers`)와 마찬가지로 잘 작동하도록 매우 주의해야 합니다. 또한, 바이너리 호환성(binary compatibility)은 필수적이며, 이는 숫자가 새로운 스타일 연산의 가용성을 나타내는 경우에만 인터프리터가 새로운 스타일 연산에 접근하고 사용할 수 있음을 의미합니다.

새로운 스타일 숫자(`new style number`)는 `Py_TPFLAGS_CHECKTYPES` 타입 플래그를 설정한 경우에만 인터프리터에 의해 그렇게 간주됩니다. `old style number`와 `new style number`의 주요 차이점은 숫자 슬롯 함수가 더 이상 동일한 타입의 인자를 전달받는다고 가정할 수 없다는 것입니다. `new style slots`는 모든 인자의 적절한 타입을 확인하고 필요한 변환을 직접 구현해야 합니다. 이는 타입 구현자에게 더 많은 작업을 유발하는 것처럼 보일 수 있지만, 실제로는 `old style coercion slot`과 동일한 종류의 루틴을 작성하는 것보다 더 어렵지 않습니다.

`new style slot`이 전달된 인자 타입 조합을 처리할 수 없다고 판단하면, 호출자에게 특별한 싱글턴인 `Py_NotImplemented`의 새 참조를 반환할 수 있습니다. 이렇게 하면 호출자는 특정 타입 조합에 대한 연산을 구현하는 슬롯을 찾을 때까지 다른 피연산자의 연산 슬롯을 시도하게 됩니다. 가능한 슬롯 중 어느 것도 성공하지 못하면 `TypeError`가 발생합니다.

구현을 이해하기 쉽게 만들기 위해 (전체 주제가 충분히 난해하기 때문에), 숫자 연산 처리에는 새로운 계층이 도입됩니다. 이 계층은 `old style` 및 `new style` 숫자의 가능한 모든 조합을 다룰 때 고려해야 할 모든 다른 경우를 처리합니다. 이는 `binary_op()` 및 `ternary_op()`라는 두 개의 정적 함수에 의해 구현되며, 이들은 `Objects/abstract.c`의 함수만 접근할 수 있는 내부 함수입니다. 숫자 API (`PyNumber_*`)는 이 새로운 계층에 쉽게 적응할 수 있습니다.

부가적으로 모든 숫자 슬롯은 `NULL` 검사를 할 수 있습니다(이것은 어쨌든 해야 하는 작업이므로 추가 기능에 대한 비용은 없습니다).

이 계층이 이진 연산(binary operation)을 실행하는 데 사용하는 스키마는 다음과 같습니다.

| `v`    | `w`    | 취해진 조치 (`Action taken`)              |
| :----- | :----- | :---------------------------------------- |
| `new`  | `new`  | `v.op(v,w)`, `w.op(v,w)`                 |
| `new`  | `old`  | `v.op(v,w)`, `coerce(v,w)`, `v.op(v,w)` |
| `old`  | `new`  | `w.op(v,w)`, `coerce(v,w)`, `v.op(v,w)` |
| `old`  | `old`  | `coerce(v,w)`, `v.op(v,w)`               |

표시된 조치 시퀀스는 연산이 성공하여 유효한 결과(!= `Py_NotImplemented`)가 반환되거나 예외가 발생할 때까지 왼쪽에서 오른쪽으로 실행됩니다. 예외는 호출 함수에 있는 그대로 반환됩니다. 슬롯이 `Py_NotImplemented`를 반환하면 시퀀스의 다음 항목이 실행됩니다.

`coerce(v,w)`는 `PyNumber_Coerce()` 호출을 통해 `old style nb_coerce` 슬롯 메서드를 사용합니다.

삼항 연산(ternary operations)은 몇 가지 더 많은 경우를 처리해야 합니다.

| `v`    | `w`    | `z`    | 취해진 조치 (`Action taken`)                               |
| :----- | :----- | :----- | :--------------------------------------------------------- |
| `new`  | `new`  | `new`  | `v.op(v,w,z)`, `w.op(v,w,z)`, `z.op(v,w,z)`                 |
| `new`  | `old`  | `new`  | `v.op(v,w,z)`, `z.op(v,w,z)`, `coerce(v,w,z)`, `v.op(v,w,z)` |
| `old`  | `new`  | `new`  | `w.op(v,w,z)`, `z.op(v,w,z)`, `coerce(v,w,z)`, `v.op(v,w,z)` |
| `old`  | `old`  | `new`  | `z.op(v,w,z)`, `coerce(v,w,z)`, `v.op(v,w,z)`               |
| `new`  | `new`  | `old`  | `v.op(v,w,z)`, `w.op(v,w,z)`, `coerce(v,w,z)`, `v.op(v,w,z)` |
| `new`  | `old`  | `old`  | `v.op(v,w,z)`, `coerce(v,w,z)`, `v.op(v,w,z)`               |
| `old`  | `new`  | `old`  | `w.op(v,w,z)`, `coerce(v,w,z)`, `v.op(v,w,z)`               |
| `old`  | `old`  | `old`  | `coerce(v,w,z)`, `v.op(v,w,z)`                             |

위에 언급된 것과 동일한 내용이며, 단 `coerce(v,w,z)`는 실제로는 다음을 수행합니다.

```python
if z != Py_None:
    coerce(v,w), coerce(v,z), coerce(w,z)
else: # treat z as absent variable
    coerce(v,w)
```

현재 구현은 이미 이 스키마를 사용합니다(삼항 슬롯은 `nb_pow(a,b,c)` 하나만 있습니다).

숫자 프로토콜은 시퀀스 연결(sequence concatenation)과 같은 다른 관련 작업에도 사용됩니다. 이러한 작업도 새로운 메커니즘을 통해 이점을 얻을 수 있습니다. 예를 들어, 문자열 연결을 살펴보겠습니다. 현재는 `string + string`만 가능합니다. 새로운 메커니즘을 사용하면 새로운 문자열과 유사한 타입이 `new_type + string` 및 `string + new_type`을 구현할 수 있으며, 이때 문자열은 `new_type`에 대해 아무것도 모르는 경우에도 가능합니다.

비교 연산 또한 `coercion`에 의존하므로 (정수와 float를 비교할 때마다 정수는 먼저 float로 변환된 다음 비교됩니다), 숫자 비교를 처리하기 위한 새로운 슬롯이 필요합니다.

```c
PyObject *nb_cmp(PyObject *v, PyObject *w)
```

이 슬롯은 두 객체를 비교하고 결과를 나타내는 정수 객체를 반환해야 합니다. 현재, 이 결과 정수는 -1, 0, 1만 가능합니다. 슬롯이 타입 조합을 처리할 수 없는 경우, `Py_NotImplemented`에 대한 참조를 반환할 수 있습니다.

숫자 비교는 새로운 숫자 프로토콜 API에 의해 처리됩니다.

```c
PyObject *PyNumber_Compare(PyObject *v, PyObject *w)
```

이 함수는 두 객체를 "숫자"로 비교하고 결과를 나타내는 정수 객체를 반환합니다. 현재 이 결과 정수는 -1, 0, 1만 가능합니다. 주어진 객체에 의해 연산을 처리할 수 없는 경우 `TypeError`가 발생합니다.

`PyObject_Compare()` API는 이 새로운 API를 사용하도록 적절히 조정되어야 합니다.

다른 변경 사항으로는 일부 내장 함수(예: `cmp()`)를 이 API를 사용하도록 조정하는 것이 포함됩니다. 또한 `PyNumber_CoerceEx()`는 `nb_coerce` 슬롯을 호출하기 전에 `new style numbers`를 확인해야 합니다. `new style numbers`는 `coercion slot`을 제공하지 않으므로 명시적으로 `coerce`될 수 없습니다.

## 참조 구현 (Reference Implementation)

Python의 CVS 버전에 대한 예비 패치는 Source Forge 패치 관리자를 통해 사용할 수 있습니다.

## 공헌 (Credits)

이 PEP와 패치는 Marc-André Lemburg의 작업에 크게 기반을 두고 있습니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.