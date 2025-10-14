---
title: "[Draft] PEP 747 - Annotating Type Forms"
excerpt: "Python Enhancement Proposal 747: 'Annotating Type Forms'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/747/
toc: true
toc_sticky: true
date: 2025-09-27 13:35:04+0900
last_modified_at: 2025-09-27 13:35:04+0900
published: true
---
> **원문 링크:** [PEP 747 - Annotating Type Forms](https://peps.python.org/pep-0747/)
>
> **상태:** Draft | **유형:** Standards Track | **작성일:** 27-May-2024

PEP 747 – 타입 폼 어노테이션 (Annotating Type Forms)

## 요약 (Abstract)
PEP 747은 Python 타입 시스템에서 타입을 명시하는 표준화된 방법인 "타입 표현식(type expression)"에 의해 생성되는 "타입 폼(type form) 객체"를 정확하게 어노테이션(annotation)할 수 있도록 `typing.TypeForm`이라는 새로운 특수 폼(special form)을 도입합니다. 현재는 `object`와 같이 너무 광범위한 타입을 사용해야 하여 타입 안전성(type safety)이 저하되고 일부 활용 사례가 불가능했습니다. 이 PEP는 Python 문법을 변경하지 않으며, `TypeForm`의 올바른 사용은 런타임이 아닌 타입 체커(type checker)에 의해 강제됩니다.

## 도입 배경 (Motivation)
타입 표현식은 런타임에 평가될 때, `types.UnionType`, `builtins.str`, `types.GenericAlias`, `typing.TypeAliasType` 등과 같은 다양한 타입 폼 객체를 생성합니다. 이러한 객체들을 다루는 함수를 어노테이션할 방법이 없어, 개발자들은 `object`와 같은 포괄적인 타입을 사용해야 했습니다. 이는 타입 체커가 함수의 의도를 정확히 이해하지 못하게 하여, 런타임 타입 검사, 인트로스펙션(introspection), 메타프로그래밍과 같은 다양한 활용 사례를 어렵게 만들었습니다.

`TypeForm`은 이러한 한계를 해결하여, 함수가 타입 폼 객체를 받아들이고 이를 다룰 수 있음을 타입 체커에게 명확히 전달할 수 있게 합니다. 예를 들어, `trycast` 함수는 특정 값의 할당 가능성(assignability)을 검사하고, `TypeIs`와 함께 사용하여 커스텀 타입 좁히기(type narrowing) 동작을 정의할 수 있습니다.

### 왜 `type[C]`를 사용하지 않는가? (Why not type[C]?)
`type[C]`는 클래스 객체(예: `int`, `str`)만 허용하며, `Literal['hi']`나 `str | None`과 같은 다양한 타입 폼 객체들을 처리할 수 없습니다. `TypeForm`은 `type[C]`가 지원하지 않는 이러한 타입 표현식도 모두 포괄합니다.

### `TypeForm` 활용 사례 (TypeForm use cases)
다양한 Python 라이브러리에서 `TypeForm`의 이점을 얻을 수 있는 함수들이 확인되었습니다.
- **할당 가능성 검사기 (Assignability checkers):** 값이 특정 타입에 할당 가능한지 판단합니다.
  - 예시: `beartype.is_bearable`, `trycast.isassignable`, `typeguard.check_type`
- **변환기 (Converters):** 값이 특정 타입에 할당 가능하거나 강제 변환(coercible) 가능할 경우, 해당 타입으로 값을 변환합니다.
  - 예시: `cattrs.BaseConverter.structure`, `trycast.checkcast`, `typedload.load`, `pydantic.TypeAdapter(T).validate_python`
- **타입이 지정된 필드 정의 (Typed field definitions):**
  - 예시: `attrs.make_class`, `dataclasses.make_dataclass`

## 명세 (Specification)

타입 표현식이 런타임에 평가될 때의 결과값은 타입 폼 객체(type form object)입니다. 이 값은 타입 표현식에 제공된 정보를 인코딩하며, 해당 타입 표현식으로 설명되는 타입을 나타냅니다.

`TypeForm`은 타입 표현식에 사용될 때, 일련의 타입 폼 객체를 설명하는 특수 폼입니다. 단일 타입 인수를 받으며, 이 인수는 유효한 타입 표현식이어야 합니다. `TypeForm[T]`는 타입 `T` 또는 `T`에 할당 가능한 타입을 나타내는 모든 타입 폼 객체 집합을 설명합니다. 예를 들어, `TypeForm[str | None]`은 `str | None`에 할당 가능한 타입을 나타내는 모든 타입 폼 객체를 설명합니다.

```python
ok1: TypeForm[str | None] = str | None # OK
ok2: TypeForm[str | None] = str # OK
ok3: TypeForm[str | None] = None # OK
ok4: TypeForm[str | None] = Literal[None] # OK
ok5: TypeForm[str | None] = Optional[str] # OK
ok6: TypeForm[str | None] = "str | None" # OK
ok7: TypeForm[str | None] = Any # OK
err1: TypeForm[str | None] = str | int # Error
err2: TypeForm[str | None] = list[str | None] # Error
```

`TypeForm[object]`는 Python 타입 시스템의 모든 타입이 `object`에 할당 가능하므로, 모든 유효한 타입 표현식에서 평가된 모든 타입 폼 객체 집합을 설명합니다. `TypeForm[Any]`는 타입 인수가 정적으로 알려지지 않았지만 유효한 타입 폼 객체인 `TypeForm` 타입을 설명합니다. 타입 인수가 제공되지 않은 `TypeForm`은 `TypeForm[Any]`와 동일합니다.

### 암시적 `TypeForm` 평가 (Implicit TypeForm Evaluation)
정적 타입 체커는 유효한 타입 표현식을 만날 때, 해당 타입이 `T`에 할당 가능하면 이 표현식의 평가된 타입이 `TypeForm[T]`에 할당 가능하다고 간주해야 합니다.

### 유효한 타입 표현식 (Valid Type Expressions)
유효한 타입 표현식은 타입 표현식에 대한 모든 구문(syntactic), 의미(semantic), 및 문맥(contextual) 규칙을 따르는 표현식입니다. 유효하지 않은 타입 표현식은 `TypeForm` 타입으로 평가되어서는 안 됩니다.

### 명시적 `TypeForm` 평가 (Explicit TypeForm Evaluation)
`TypeForm`은 단일 인수를 받아 호출될 수 있는 함수로도 작동합니다. 타입 체커는 이 인수가 유효한 타입 표현식인지 검증해야 합니다. 런타임에는 `TypeForm(...)` 호출 가능 객체는 단순히 전달된 값을 반환합니다.

```python
x1 = TypeForm(str | None)
reveal_type(v1) # Revealed type is "TypeForm[str | None]"
x2 = TypeForm("list[int]")
revealed_type(v2) # Revealed type is "TypeForm[list[int]]"
x3 = TypeForm('type(1)') # Error: invalid type expression
```

### 할당 가능성 (Assignability)
`TypeForm`은 단일 타입 매개변수를 가지며 공변(covariant)입니다. 즉, `B`가 `A`에 할당 가능하면 `TypeForm[B]`는 `TypeForm[A]`에 할당 가능합니다.
`type[T]`는 `TypeForm[T]`의 서브타입(subtype)입니다.
`TypeForm`은 `object`의 서브타입이며, `object`의 모든 속성과 메서드를 가집니다.

## 하위 호환성 (Backward Compatibility)
이 PEP는 타입 표현식을 "값 표현식(value expression)" 문맥에서 평가할 때의 정적 타입 체커 동작을 명확히 합니다. `TypeForm` 타입 어노테이션이 없는 경우, 기존 타입 평가 동작은 유지되므로 하위 호환성 문제는 예상되지 않습니다.

## 교육 방법 (How to Teach This)
`TypeForm[]`은 타입 폼 객체의 타입을 나타내는 방법이며, 이는 타입의 런타임 표현입니다. `TypeForm`은 `type`과 유사하지만, `type`은 `int`, `str`과 같은 클래스 객체에만 호환됩니다. 반면 `TypeForm`은 대괄호(`list[int]`), 유니온 연산자(`int | None`), 특수 폼(`Any`, `LiteralString` 등)을 포함하여 유효한 타입 표현식으로 표현될 수 있는 모든 타입 폼을 수용합니다.

대부분의 프로그래머는 `TypeForm` 매개변수를 받거나 `TypeForm` 값을 반환하는 자신만의 함수를 정의하지 않을 것입니다. 대신, 타입 폼 객체를 디코딩하고 사용하는 방법을 아는 라이브러리 함수에 전달하는 것이 더 일반적입니다.

예를 들어, `trycast` 라이브러리의 `isassignable` 함수는 Python의 내장 `isinstance` 함수처럼 특정 타입의 형태와 값이 일치하는지 확인하는 데 사용될 수 있습니다. `isassignable`은 어떤 타입 폼 객체도 입력으로 받습니다.

```python
from trycast import isassignable
if isassignable(some_object, MyTypedDict): # OK: MyTypedDict is a TypeForm[]
    ...
```

## 고급 예시 (Advanced Examples)

### 타입 폼 객체 인트로스펙션 (Introspecting type form objects)
`typing.get_origin` 및 `typing.get_args`와 같은 함수는 일부 타입 폼 객체의 구성 요소를 추출하는 데 사용될 수 있습니다. `isinstance` 및 `is`도 다른 종류의 타입 폼 객체를 구별하는 데 사용할 수 있습니다.

### 타입 변수와 결합 (Combining with a type variable)
`TypeForm`은 동일한 함수 정의 내에서 다른 곳에 사용되는 타입 변수로 매개변수화될 수 있습니다.

### `type`과 결합 (Combining with type)
`TypeForm`과 `type` 모두 동일한 함수 정의 내에서 동일한 타입 변수로 매개변수화될 수 있습니다.

### `TypeIs` 및 `TypeGuard`와 결합 (Combining with TypeIs and TypeGuard)
타입 변수는 `TypeIs` 또는 `TypeGuard` 반환 타입에도 사용될 수 있습니다.

## 모든 `TypeForm`을 받아들일 때의 과제 (Challenges When Accepting All TypeForms)
임의의 `TypeForm`을 입력으로 받는 함수는 다양한 타입 폼 객체를 지원해야 하므로 작성하기 쉽지 않습니다. 새로운 특수 폼은 각 Python 버전마다 도입되며, 각각에 대한 특별한 처리가 필요할 수 있습니다. `eval()`을 사용하여 따옴표로 묶인 전방 참조(forward references)를 해결하는 것은 안전하게 사용하기 어렵습니다. `IntTree = list[int | 'IntTree']`와 같은 재귀 타입은 해결하기 어렵습니다. 사용자 정의 제네릭 타입은 비표준 동작을 도입할 수 있습니다.

## 참조 구현 (Reference Implementation)
Pyright (버전 1.1.379)는 `TypeForm`의 참조 구현을 제공합니다. Mypy 기여자들도 `TypeForm` 지원을 구현할 계획입니다. 런타임 구성 요소의 참조 구현은 `typing_extensions` 모듈에 제공됩니다.

## 거부된 아이디어 (Rejected Ideas)

### 다른 이름 (Alternative names)
`TypeObject`, `TypeType`, `TypeExpression`, `TypeExpr` 등 다른 이름들이 고려되었으나, 혼란을 야기할 수 있다는 이유로 거부되었습니다.

### `type[C]`의 범위 확장 (Widen type[C] to support all type expressions)
`type`은 클래스 객체를 설명하도록 설계되었기 때문에, `type`의 의미를 임의의 타입 폼 객체를 나타내도록 확장하는 것은 하위 호환성 문제를 일으키고 클래스 객체로 제한된 값 집합을 설명하는 방법을 제거할 것입니다.

### 임의의 어노테이션 표현식 허용 (Accept arbitrary annotation expressions)
`Final`과 같은 특정 특수 폼은 타입 한정자(type qualifier) 역할을 하며, 모든 어노테이션 문맥에서 사용될 수 있는 것은 아닙니다. `TypeForm`은 타입 표현식으로 제한되는데, 이는 할당 가능성 규칙이 타입에 대한 할당 가능성 규칙을 기반으로 하기 때문입니다. `Final[int]`가 `int`에 할당 가능한지 묻는 것은 무의미합니다.

### 타입 폼에 대한 패턴 매칭 (Pattern matching on type forms)
시그니처 내에서 타입 표현식의 내부를 패턴 매칭하려는 아이디어가 있었으나, 실제 사용 사례에서 모든 종류의 타입 표현식을 지원하는 것이 일반적이고, 제안된 구문이 충분히 정확하지 않다는 이유로 거부되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.