---
title: "[Draft] PEP 806 - Mixed sync/async context managers with precise async marking"
excerpt: "Python Enhancement Proposal 806: 'Mixed sync/async context managers with precise async marking'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/806/
toc: true
toc_sticky: true
date: 2025-09-27 14:10:48+0900
last_modified_at: 2025-09-27 14:10:48+0900
published: true
---
> **원문 링크:** [PEP 806 - Mixed sync/async context managers with precise async marking](https://peps.python.org/pep-0806/)
>
> **상태:** Draft | **유형:** Standards Track | **작성일:** 05-Sep-2025

PEP 806 – 혼합 동기/비동기 컨텍스트 관리자 (정확한 비동기 표기법)

## 초록 (Abstract)

현재 Python에서는 `with` 또는 `async with` 문을 사용하여 여러 컨텍스트 관리자를 한 번에 처리할 수 있지만, 이들은 각각 동기(synchronous) 또는 비동기(asynchronous) 컨텍스트 관리자로만 구성되어야 합니다. 동기 컨텍스트 관리자와 비동기 컨텍스트 관리자를 함께 사용해야 하는 경우, 개발자는 깊게 중첩된 문장을 사용하거나 `AsyncExitStack`과 같은 위험한 우회 방법을 사용해야 했습니다.

이 PEP는 단일 `with` 문에서 동기 및 비동기 컨텍스트 관리자를 모두 허용하며, 개별 비동기 컨텍스트 관리자에 `async` 키워드를 접두사로 붙이는 방식을 제안합니다. 이 변경은 불필요한 중첩을 없애고 코드 가독성을 향상시키며, 비동기 코드의 명시성을 유지하면서 사용 편의성을 개선합니다.

## 동기 (Motivation)

최신 Python 애플리케이션은 동기 및 비동기 컨텍스트 관리자를 혼합하여 여러 리소스를 획득해야 하는 경우가 많습니다. 모든 컨텍스트 관리자가 동기이거나 모든 컨텍스트 관리자가 비동기인 경우에는 단일 문으로 여러 컨텍스트 관리자를 처리할 수 있지만, 둘을 혼합하면 "지옥의 계단(staircase of doom)"과 같은 과도한 들여쓰기가 발생합니다.

예시:
```python
async def process_data():
    async with acquire_lock() as lock:
        with temp_directory() as tmpdir:
            async with connect_to_db(cache=tmpdir) as db:
                with open('config.json', encoding='utf-8') as f:
                    # 실제 로직을 시작하기 전에 16칸 깊이로 들여쓰기 됨
                    config = json.load(f)
                    await db.execute(config['query'])
                    # ... 더 많은 처리
```
이러한 과도한 들여쓰기는 컨텍스트 관리자의 바람직한 의미에도 불구하고 사용을 저해합니다.

이 PEP가 적용되면 위 함수는 다음과 같이 작성할 수 있습니다:
```python
async def process_data():
    with (
        async acquire_lock() as lock,
        temp_directory() as tmpdir,
        async connect_to_db(cache=tmpdir) as db,
        open('config.json', encoding='utf-8') as f,
    ):
        config = json.load(f)
        await db.execute(config['query'])
        # ... 더 많은 처리
```
이 간결한 대안은 동기 및 비동기 컨텍스트 관리자 간에 전환할 때마다 새로운 수준의 들여쓰기를 강제하지 않습니다. 동시에, 기존 키워드만 사용하여 현재 구문보다 `async` 키워드로 비동기 코드를 더 정확하게 구별합니다.

`async with` 문의 사용이 중단되는 것을 제안하지 않으며, 단일 라인 문에서는 `async with`의 계속 사용을 지지합니다. 이는 `async`가 비동기 컨텍스트 관리자를 여는 각 라인의 첫 번째 비공백 토큰이 되도록 하기 위함입니다.

하지만 이 제안은 `with async some_ctx()`를 허용하여, 단일 코드 스타일의 강제보다는 일관된 구문 설계를 중요하게 생각합니다. 이는 스타일 가이드, 린터, 포매터 등에 의해 처리될 것으로 예상됩니다.

## 실제 영향 (Real-World Impact)

이 개선 사항은 Python 개발자들이 일상적으로 겪는 어려움을 해결합니다. 한 산업 코드베이스를 조사한 결과, 만 개 이상의 함수에 적어도 하나의 비동기 컨텍스트 관리자가 포함되어 있었으며, 이 중 19%는 동기 컨텍스트 관리자도 포함하고 있었습니다. 비동기 함수는 비동기 컨텍스트 관리자를 포함하는 것만큼 동기 컨텍스트 관리자를 약 3분의 2 정도 자주 포함합니다.

`with`와 `async with` 문을 모두 포함하는 함수의 39%는 제안된 구문으로 즉시 전환할 수 있었지만, 이는 동기 컨텍스트 관리자의 회피 및 '기각된 아이디어(Rejected Ideas)' 섹션에 나열된 우회책 사용으로 인한 느슨한 하한선입니다. 무작위 함수 샘플을 검사한 결과, 이 PEP가 수락된다면 컨텍스트 관리자를 포함하는 비동기 함수의 20%에서 50% 사이가 `with async`를 사용할 것으로 추정됩니다.

더 넓은 생태계에서는 이 비율이 5%에서 20% 범위로 낮아질 것으로 예상됩니다. 조사된 코드베이스는 Trio와 함께 구조화된 동시성을 사용하며, PEP 533 및 PEP 789에서 논의된 문제를 완화하기 위해 컨텍스트 관리자를 광범위하게 사용합니다.

## 이론적 근거 (Rationale)

비동기 데이터베이스 연결이나 API 클라이언트, 동기 파일 작업과 같은 혼합 동기/비동기 컨텍스트 관리자는 최신 Python 애플리케이션에서 흔히 사용됩니다. 현재 구문은 개발자에게 깊게 중첩된 코드 또는 `AsyncExitStack`과 같은 오류 발생 가능성이 있는 우회책 중에서 선택하도록 강요합니다.

이 PEP는 기존 패턴을 기반으로 한 최소한의 구문 변경으로 이 문제를 해결합니다. 개별 컨텍스트 관리자를 `async`로 표시할 수 있게 함으로써, 불필요한 중첩을 없애면서도 비동기 코드에 대한 Python의 명시적인 접근 방식을 유지합니다.

구현은 문법 설탕(syntactic sugar)으로, 런타임 오버헤드가 전혀 발생하지 않도록 합니다. 새로운 구문은 개발자가 현재 작성하는 것과 동일한 중첩된 `with` 및 `async with` 문으로 역변환(desugar)됩니다. 이 접근 방식은 새로운 프로토콜, 기존 컨텍스트 관리자에 대한 변경, 또는 이해해야 할 새로운 런타임 동작을 요구하지 않습니다.

## 명세 (Specification)

`with (..., async ...):` 구문은 현재의 다중 컨텍스트 `with` 문과 동일한 방식으로 컨텍스트 관리자 시퀀스로 역변환됩니다. 단, `async` 키워드가 접두사로 붙은 컨텍스트 관리자는 `__aenter__` / `__aexit__` 프로토콜을 사용합니다.

`with` 문만 수정됩니다. `async with async ctx():`는 문법 오류입니다.

`ast.withitem` 노드는 `ast.comprehension`의 기존 `is_async` 속성을 따라 새로운 `is_async` 정수 속성을 얻습니다. `async with` 문 항목의 경우, 이 속성은 항상 `1`입니다. 일반 `with` 문 항목의 경우, `async` 키워드가 있으면 속성이 `1`이고, 그렇지 않으면 `0`입니다. 이를 통해 AST는 기존 AST 처리 도구와의 하위 호환성을 유지하면서 어떤 컨텍스트 관리자가 비동기 프로토콜을 사용해야 하는지 정확하게 표현할 수 있습니다.

## 하위 호환성 (Backwards Compatibility)

이 변경은 완전히 하위 호환됩니다. 유일하게 관찰 가능한 차이점은 이전에 `SyntaxError`를 발생시키던 특정 구문이 이제 성공적으로 실행된다는 것입니다.

컨텍스트 관리자를 구현하는 라이브러리(표준 라이브러리 및 서드 파티)는 수정 없이 새로운 구문에서 작동합니다. 소스 코드와 직접 작동하는 라이브러리 및 도구는 새로운 구문과 마찬가지로 사소한 업데이트가 필요할 것입니다.

## 가르치는 방법 (How to Teach This)

`async with`와 함께 또는 직후에 "혼합 컨텍스트 관리자(mixed context managers)"를 소개하는 것을 권장합니다. 예를 들어, 튜토리얼은 다음을 다룰 수 있습니다:
*   **기본 컨텍스트 관리자:** 단일 `with` 문으로 시작합니다.
*   **다중 컨텍스트 관리자:** 현재의 쉼표 구문을 보여줍니다.
*   **비동기 컨텍스트 관리자:** `async with`를 소개합니다.
*   **혼합 컨텍스트:** "각 비동기 컨텍스트 관리자를 `async`로 표시합니다".

## 기각된 아이디어 (Rejected Ideas)

### 우회책: `as_acm()` 래퍼 (Workaround: an `as_acm()` wrapper)

동기 컨텍스트 관리자를 비동기 컨텍스트 관리자로 래핑하는 헬퍼 함수를 구현하는 것은 쉽습니다. 예를 들어:
```python
@contextmanager
async def as_acm(sync_cm):
    with sync_cm as result:
        await sleep(0)
        yield result

async with (
    acquire_lock(),
    as_acm(open('file')) as f,
):
    ...
```
이는 거의 모든 코드에 권장되는 우회책입니다. 그러나 취소를 허용하기 위해 비동기 런타임으로 다시 호출하는 것(예: `await sleep(0)` 실행)이 바람직하지 않은 경우가 있습니다. 다른 한편으로, `await sleep(0)`을 생략하면 구문적 `await` / `async for` / `async with`가 항상 비동기 런타임으로 다시 호출(또는 예외 발생)한다는 추이적 속성이 깨집니다. 현재 이 속성을 강제하는 코드베이스는 거의 없지만, 이는 교착 상태(deadlock)를 방지하는 데 필수적이며, 따라서 생태계의 더 깔끔한 기반을 선호합니다.

### 우회책: `AsyncExitStack` 사용 (Workaround: using `AsyncExitStack`)

`AsyncExitStack`은 동기 및/또는 비동기 컨텍스트 관리자의 명시적 진입을 허용하는 강력한 저수준 인터페이스를 제공합니다.
```python
async with contextlib.AsyncExitStack() as stack:
    await stack.enter_async_context(acquire_lock())
    f = stack.enter_context(open('file', encoding='utf-8'))
    ...
```
그러나 `AsyncExitStack`은 상당한 복잡성과 오류 가능성을 초래합니다. 구문적으로 컨텍스트 관리자를 사용하는 것이 보장하는 속성(예: '후입선출(last-in, first-out)' 순서)을 위반하기 쉽습니다.

### 우회책: `AsyncExitStack` 기반 헬퍼 (Workaround: AsyncExitStack -based helper)

`AsyncExitStack`의 직접적인 사용으로 인한 단점 중 일부를 피하는 `multicontext()` 래퍼를 구현할 수도 있습니다.
```python
async with multicontext(
    acquire_lock(),
    open('file'),
) as (f, _):
    ...
```
하지만 이 헬퍼는 `as` 절의 지역성을 깨뜨려, 의도치 않게 yield된 변수를 잘못 할당하기 쉽게 만듭니다 (코드 샘플에서와 같이). 또한 태그가 지정된 유니온(tagged union)과 같은 것을 사용하여 동기 컨텍스트 관리자와 비동기 컨텍스트 관리자를 구별해야 하거나(예: `async_ @ acquire_lock()` 작동) 또는 동기 및 비동기 컨텍스트 관리자 프로토콜을 모두 구현하는 객체에 대해 무엇을 할지 추측해야 합니다. 마지막으로, `contextlib.nested()`가 다중 인자 `with` 문을 선호하여 폐기된 이유가 되었던 예외 처리에 대한 오류 발생 가능성이 있는 의미를 가집니다.

### 구문: `async with sync_cm, async_cm:` 허용 (Syntax: allow `async with sync_cm, async_cm:`)

이 제안의 초기 초안은 적어도 하나의 비동기 컨텍스트 관리자가 있는 경우, 컨텍스트 관리자를 혼합할 때 전체 문장에 `async with`를 사용했습니다.
```python
# 기각된 접근 방식
async with (
    acquire_lock(),
    open('config.json') as f, # 실제로는 동기, 놀랍게도!
):
    ...
```
`async` 컨텍스트 관리자를 요구하는 것은 구문/스케줄러 링크를 유지하지만, 미래 코드 변경에 눈에 띄지 않는 제약을 가하는 대가를 치릅니다. 여러 컨텍스트 관리자 중 하나를 제거하면, 그것이 마지막 비동기 컨텍스트 관리자였을 경우 런타임 오류가 발생할 수 있습니다.

명시적인 것이 암시적인 것보다 낫습니다 (`Explicit is better than implicit`).

### 구문: 단일 라인 `with async ...` 금지 (Syntax: ban single-line `with async ...`)

제안된 구문은 제한될 수 있습니다. 예를 들어, `async`를 괄호로 묶인 다중 컨텍스트 `with` 문의 라인 첫 번째 토큰으로만 배치하도록 할 수 있습니다. 이것이 실제로 권장되는 사용 방식이며, 대부분의 사용이 이 패턴을 따를 것으로 예상됩니다.

`async with ctx():` 또는 `with async ctx():` 둘 중 하나를 작성할 수 있는 옵션은 모호성으로 인해 약간의 혼란을 야기할 수 있지만, 구문을 통해 선호하는 스타일을 강제하는 것은 Python을 배우는 것을 더 혼란스럽게 만들 것이라고 생각하며, 따라서 간단한 구문 규칙과 커뮤니티의 사용법에 대한 관습을 선호합니다.

예를 들어, 다음 코드 샘플 중 어느 시점(있다면)에서 구문이 허용되지 않아야 하는지는 명확하지 않다고 생각합니다:
```python
with (
    sync_context() as foo,
    async a_context() as bar,
):
    ...
with (
    sync_context() as foo,
    async a_context()
):
    ...
with (
    # sync_context() as foo,
    async a_context()
):
    ...
with (async a_context()):
    ...
with async a_context():
    ...
```

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.