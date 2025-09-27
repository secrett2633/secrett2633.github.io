---
title: "[Withdrawn] PEP 645 - Allow writing optional types asx?"
excerpt: "Python Enhancement Proposal 645: 'Allow writing optional types asx?'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/645/
toc: true
toc_sticky: true
date: 2025-09-27 01:34:51+0900
last_modified_at: 2025-09-27 01:34:51+0900
published: true
---
> **원문 링크:** [PEP 645 - Allow writing optional types asx?](https://peps.python.org/pep-0645/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 25-Aug-2020

PEP 645 – `Optional` 타입 표기를 위한 `x?` 문법 허용 제안 (철회됨)

## 개요
이 문서는 `Optional[int]` 대신 `int?`와 같이 `?` 연산자를 사용하여 `Optional` 타입을 표기하는 새로운 문법을 추가할 것을 제안했습니다.

## PEP 철회 동기
PEP 604에서 도입된 `T | None` 표기법은 `Optional[T]`를 대체할 훌륭한 대안이며, 새로운 문법을 필요로 하지 않습니다. 또한, `T?`를 `T | None`의 의미로 사용하는 것은 TypeScript의 `NotRequired[T]`와는 대략적으로 일치하지 않아 혼란을 야기할 수 있다는 점이 지적되었습니다. 이러한 이유로, Typing-SIG 커뮤니티와 이 PEP의 스폰서가 합의하여 이 PEP는 철회되었습니다.

## 배경 (Motivation)
타입 힌트(Type Hints)는 Python 언어의 중요하고 강력한 부분이 되었습니다. 하지만 많은 타입 어노테이션(type annotation)은 장황하여 타입 어노테이션 사용에 상당한 마찰을 더합니다. 타입 문법을 개선함으로써 Python 코드에 타입을 추가하는 것을 더 간단하게 만들고 개발 경험을 향상시킬 수 있습니다. 이와 유사하게 `Union` 타입의 짧은 문법을 도입하기 위한 PEP도 승인되어 구현된 바 있습니다.

## 제안 근거 (Rationale)
Python의 타입은 상당히 장황할 수 있으며, 이는 타입 채택에 방해가 될 수 있습니다. PEP 604에서 `Union` 타입(`int | str` 등)에 대해 수행된 것처럼 타입을 더 인체공학적으로 만들면 새롭거나 기존 Python 코드에 타입을 추가하는 데 필요한 노력을 줄일 수 있습니다.

`Optional` 어노테이션(annotation)은 부분적으로 또는 완전히 타입이 지정된(typed) Python 코드베이스에서 자주 사용됩니다. 잘 타입이 지정된 5개의 오픈 소스 프로젝트를 표본으로 조사한 결과, 평균적으로 어노테이션의 7%가 하나 이상의 `Optional` 타입을 포함하고 있었습니다. 이는 문법 업데이트가 타입을 더 간결하게 만들고 코드 길이를 줄이며 가독성을 향상시킬 잠재력이 있음을 나타냅니다.

`Optional` 타입의 문법 간소화는 이전에 타입 힌트 커뮤니티 내에서 논의되었으며, 이러한 논의에서 `?`가 선호되는 연산자라는 합의가 있었습니다. Python에는 단항(unary) `?`에 대한 기본 지원이 없으며, 이는 런타임에 추가되어야 할 것입니다.

`?` 기호(sigil)를 Python 문법에 추가하는 것은 이전에 PEP 505에서도 제안되었으며, PEP 505는 현재 연기된(deferred) 상태입니다. PEP 505는 다음과 같은 연산자를 제안합니다:
*   "None coalescing" 이항(binary) 연산자 `??`
*   "None-aware attribute access" 연산자 `?.` ("maybe dot")
*   "None-aware indexing" 연산자 `?[]` ("maybe subscript")

만약 PEP 505가 미래에 승인되더라도, 이 PEP에서 제안된 타입 특정 `?`와는 충돌하지 않을 것입니다. 또한, `?`의 모든 사용이 개념적으로 관련되어 있기 때문에 Python 학습에 혼란을 주거나 빠른 시각적 이해에 방해가 되지 않을 것입니다.

제안된 후위(postfix) 연산자를 사용하는 문법은 C#, TypeScript, Swift와 같은 다른 타입 언어에서 발견되는 `Optional` 문법을 모방합니다. 이러한 언어들의 광범위한 채택과 인기는 Python 개발자들이 이미 이 문법에 익숙할 가능성이 높다는 것을 의미합니다.

```swift
// Swift에서의 Optional
var example: String?
``````csharp
// C#에서의 Optional
string? example;
```

이 문법을 추가하는 것은 `list`, `dict`, `None`과 같이 내장 타입을 어노테이션으로 사용하는 일반적인 패턴을 따르는 것입니다. 이는 `typing` 모듈에서 임포트(import)하지 않고도 더 많은 어노테이션을 Python 코드에 추가할 수 있게 할 것입니다.

## 명세 (Specification)
새로운 `Optional` 문법은 함수(function), 변수(variable), 속성(attribute) 및 매개변수(parameter) 어노테이션에 허용되어야 합니다.

```python
# 기존 방식
# def foo(x: Optional[int], y: Optional[str], z: Optional[list[int]): ...
# 제안된 방식
def foo(x: int?, y: str?, z: list[int]?): ...

# 기존 방식
# def bar(x: list[typing.Optional[int]]): ...
# 제안된 방식
def bar(x: list[int?]): ...
```

새로운 `Optional` 문법은 기존 `typing.Optional` 문법과 동등해야 합니다.

```python
typing.Optional[int] == int?
```

새로운 `Optional` 문법은 기존 `typing.Optional` 문법과 동일한 아이덴티티(identity)를 가져야 합니다.

```python
typing.Optional[int] is int?
```

또한 `None`과의 `Union`과도 동등해야 합니다.

```python
# 기존 문법
int? == typing.Union[int, None]
# 새 문법
int? == int | None
```

PEP 604에서 명세된 새로운 `Union` 문법이 `isinstance` 및 `issubclass`에서 지원되므로, 새로운 `Optional` 문법도 `isinstance` 및 `issubclass`에서 지원되어야 합니다.

```python
isinstance(1, int?) # True
issubclass(Child, Super?) # True
```

`?` 연산자가 다른 기능에 대해 오버로드될 수 있도록 새로운 던더(dunder) 메서드가 구현되어야 할 것입니다.

## 하위 호환성 (Backwards Compatibility)
`?`는 현재 Python 문법에서 사용되지 않으므로, 이 PEP는 완전히 하위 호환됩니다.

## 채택되지 않은 아이디어 (Rejected Ideas)
논의되었던 대안으로는 `?` 대신 `~` 연산자를 고려하거나, 접두사(prefix) 연산자(`?int`)를 사용하는 것이 있었습니다.

`?` 연산자가 다른 기능에 대해 오버로드될 수 있도록 새로운 던더(dunder) 메서드가 구현되어야 할 것입니다 [cite: 1].

## 하위 호환성 (Backwards Compatibility)
`?`는 현재 Python 문법에서 사용되지 않으므로, 이 PEP는 완전히 하위 호환됩니다 [cite: 1].

## 채택되지 않은 아이디어 (Rejected Ideas)
논의되었던 대안으로는 `?` 대신 `~` 연산자를 고려하거나, 접두사(prefix) 연산자(`?int`)를 사용하는 것이 있었습니다 [cite: 1].

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.