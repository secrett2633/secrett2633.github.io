---
title: "[Final] PEP 409 - Suppressing exception context"
excerpt: "Python Enhancement Proposal 409: 'Suppressing exception context'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/409/
toc: true
toc_sticky: true
date: 2025-09-26 21:30:26+0900
last_modified_at: 2025-09-26 21:30:26+0900
published: true
---
> **원문 링크:** [PEP 409 - Suppressing exception context](https://peps.python.org/pep-0409/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 26-Jan-2012

PEP 409 – 예외 컨텍스트 억제 (Suppressing exception context)

## 개요 (Abstract)
PEP 3134의 미해결 문제 중 하나는 예외 컨텍스트를 억제하는 방법에 대한 것이었습니다. 현재는 이를 수행할 방법이 없으며, 이 PEP는 그 해결책을 제안합니다.

## 배경 (Rationale)
예외는 두 가지 주요 방식으로 발생합니다.
1.  **Python 자체에서 발생:** 버그가 있는 코드, 리소스 부족, 루프 종료 등.
2.  **수동으로 발생:** `raise` 문을 사용.

라이브러리나 커스텀 클래스를 작성할 때 예외를 발생시켜야 할 때가 있습니다. 또한, 하나의 예외를 다른 예외로 변경하는 것이 유용하거나 필요할 수 있습니다. 예를 들어, `dbf` 모듈에서 다음과 같은 코드를 생각해볼 수 있습니다.

```python
try:
    value = int(value)
except Exception:
    raise DbfError(...)
```

이 경우 `ValueError`, `TypeError` 또는 다른 어떤 원래 예외가 발생했는지는 중요하지 않습니다. 이 시점부터의 예외는 `DbfError`이며, 원래 예외는 더 이상 의미가 없습니다. 그러나 현재 시스템에서는 이 예외를 출력하면 두 예외가 모두 표시됩니다.

## 대안 (Alternatives)
여러 가지 가능성이 제안되었습니다.

*   `raise as NewException()`
    *   `as` 키워드를 재사용하여 혼동을 줄 수 있습니다. 원래 예외를 실제로 다시 발생시키는 것이 아니기 때문입니다.
*   `raise NewException() from None`
    *   기존의 예외 발생 원인을 명시적으로 선언하는 구문을 따릅니다.
*   `exc = NewException(); exc.__context__ = None; raise exc`
    *   이전 방법의 매우 장황한 표현입니다.
*   `raise NewException.no_context(...)`
    *   컨텍스트 억제를 클래스 메서드로 만듭니다.

위의 모든 옵션은 코어(core)에 대한 변경을 필요로 합니다.

## 제안 (Proposal)
두 번째 옵션, 즉 `raise NewException from None`을 제안합니다.

이 방법은 기존의 명시적으로 원인을 설정하는 패턴(`raise KeyError() from NameError()`)을 활용하면서도, 원인이 `None`이기 때문에 기본 예외 출력 루틴에서 이전 컨텍스트가 표시되지 않는다는 장점이 있습니다.

## 구현 논의 (Implementation Discussion)
**참고:** 이 PEP가 수락된 후, 더 깔끔한 구현 메커니즘이 PEP 415에서 제안되고 수락되었습니다. Python 3.3에서 실제로 사용된 구현에 대한 자세한 내용은 해당 PEP를 참조하세요.

현재 `__context__`와 `__cause__` 모두 `None`이 기본값입니다. `raise ... from None` (이는 `__cause__`를 `None`으로 설정)을 지원하려면 `__cause__`에 다른 기본값이 필요합니다. 이를 언어 수준에서 구현하기 위한 몇 가지 아이디어가 제시되었습니다.

*   **이전 예외 정보를 덮어쓰기:** (이슈를 회피하고 `__cause__`를 `None`으로 유지).
    *   부실한 오류 메시지로 인해 디버깅을 심각하게 방해할 수 있으므로 거부되었습니다.
*   **`__cause__`에 불리언 값 사용:** `False`를 기본값으로 하고, `from ...`이 명시적으로 연결된 예외 또는 `None`과 함께 사용될 때 대체됩니다.
    *   이는 `__cause__`에 두 가지 다른 객체 유형(하나는 불리언)을 사용하도록 권장하며, 불리언은 가능한 값의 전체 범위를 가질 수 없기(`True`는 절대 사용되지 않음) 때문에 거부되었습니다.
*   **특별한 예외 클래스 `__NoException__` 생성:**
    *   혼동을 줄 수 있고, 사용자가 실수로 발생시킬 수 있으며, `None`, `True`, `False`와 같은 진정으로 고유한 값이 아니기 때문에 거부되었습니다.
*   **기본값으로 `Ellipsis` 사용 (`...` 싱글톤):**
    *   채택되었습니다.
    *   `Ellipsis`는 영어에서 단어가 생략될 때 플레이스홀더로 흔히 사용됩니다. 이는 `__cause__`가 생략되었음을 알리는 신호로 작용하여, 더 자세한 내용은 `__context__`를 참조하도록 하는 데 도움이 됩니다.
    *   `Ellipsis`는 예외가 아니므로 발생시킬 수 없습니다.
    *   `Ellipsis`는 하나뿐이므로 사용되지 않는 값이 없습니다.
    *   오류 정보가 버려지지 않으므로, 기본 코드가 전체 예외 체인을 따르지 않더라도 커스텀 코드는 추적할 수 있습니다.

## 언어 세부 사항 (Language Details)
`raise Exception from None`을 지원하기 위해 `__context__`는 현재와 같이 유지되지만, `__cause__`는 `Ellipsis`로 시작하여 `raise Exception from None` 메서드가 사용될 때 `None`으로 변경됩니다.

| 형식 (form)                   | `__context__`        | `__cause__`                       |
| :---------------------------- | :------------------- | :-------------------------------- |
| `raise`                       | `None`               | `Ellipsis`                        |
| `reraise` (이전 예외 다시 발생) | `previous exception` | `Ellipsis`                        |
| `reraise from None`           | `previous exception` | `None`                            |
| `reraise from ChainedException` | `previous exception` | `explicitly chained exception`    |

기본 예외 출력 루틴은 다음과 같이 동작합니다.

*   `__cause__`가 `Ellipsis`인 경우, `__context__` (있는 경우)가 출력됩니다.
*   `__cause__`가 `None`인 경우, `__context__`는 출력되지 않습니다.
*   `__cause__`가 다른 어떤 값이라도, `__cause__`가 출력됩니다.

후자의 두 경우 모두 예외 체인 추적이 중단됩니다.

`__cause__`의 기본값이 이제 `Ellipsis`이고, `raise Exception from Cause`가 단순히 다음의 syntactic sugar (문법적 설탕) 이기 때문에:

```python
_exc = NewException()
_exc.__cause__ = Cause()
raise _exc
```

`Ellipsis`는 `None`과 마찬가지로 원인으로 허용됩니다.

```python
raise Exception from Ellipsis
```

## 패치 (Patches)
CPython에 이 기능을 구현하는 패치가 Issue 6210에 첨부되어 있습니다.

## 참조 (References)
`python-dev` 스레드에서의 논의 및 개선 사항이 있습니다.

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.