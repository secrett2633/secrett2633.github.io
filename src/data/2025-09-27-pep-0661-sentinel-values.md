---
title: "[Deferred] PEP 661 - Sentinel Values"
excerpt: "Python Enhancement Proposal 661: 'Sentinel Values'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/661/
toc: true
toc_sticky: true
date: 2025-09-27 09:55:59+0900
last_modified_at: 2025-09-27 09:55:59+0900
published: true
---
> **원문 링크:** [PEP 661 - Sentinel Values](https://peps.python.org/pep-0661/)
>
> **상태:** Deferred | **유형:** Standards Track | **작성일:** 06-Jun-2021


# PEP 661 – Sentinel 값 (Sentinel Values)

-   **작성자** : Tal Einat
-   **논의처** : Discourse 스레드
-   **상태** : 연기됨 (Deferred)
-   **유형** : 표준 트랙 (Standards Track)
-   **생성일** : 2021년 6월 6일
-   **게시 이력** : 2021년 5월 20일, 2021년 6월 6일

## 개요 (Abstract)

프로그래밍에서 "sentinel 값"으로 흔히 알려진 고유한 플레이스홀더(placeholder) 값은 일반적입니다. 이는 다양한 용도로 사용됩니다. 예를 들어:

*   함수 인수의 기본값으로, 값이 주어지지 않았을 때 사용됩니다.
    ```python
    def foo(value=None):
        ...
    ```
*   함수에서 특정 항목을 찾지 못했거나 사용할 수 없을 때 반환 값으로 사용됩니다.
    ```python
    >>> "abc".find("d")
    -1
    ```
*   관계형 데이터베이스의 `NULL`이나 스프레드시트의 "N/A"("not available")와 같은 누락된 데이터를 나타낼 때 사용됩니다.

파이썬에는 특별한 값인 `None`이 있으며, 대부분의 경우 이러한 sentinel 값으로 사용되도록 의도되었습니다. 하지만 `None`이 해당 컨텍스트에서 유효한 값일 때 `None`과 구별되어야 하는 경우, 때때로 대체 sentinel 값이 필요합니다. 이러한 경우는 충분히 흔해서 지난 몇 년 동안 이러한 sentinel을 구현하기 위한 여러 관용구(idiom)가 생겨났지만, 표준화의 명확한 필요성이 느껴질 만큼은 흔하지 않았습니다. 그러나 `stdlib`의 일부를 포함하여 일반적인 구현 방식은 몇 가지 중요한 단점을 가지고 있습니다.

이 PEP는 `stdlib`에서 사용하고 공개적으로 제공될 sentinel 값을 정의하기 위한 유틸리티를 추가할 것을 제안합니다.

참고: `stdlib`의 모든 기존 sentinel을 이 방식으로 구현하도록 변경하는 것은 불필요하다고 판단되며, 변경 여부는 관리자의 재량에 달려 있습니다.

## 동기 (Motivation)

2021년 5월, `python-dev` 메일링 리스트에서 `traceback.print_exception`을 위한 sentinel 값을 더 잘 구현하는 방법에 대한 질문이 제기되었습니다. 기존 구현은 다음 일반적인 관용구를 사용했습니다.

```python
_sentinel = object()
```

그러나 이 `object`는 정보가 부족하고 너무 장황한 `repr`을 가지고 있어, 함수의 시그니처가 지나치게 길고 읽기 어렵게 만듭니다.

```python
>>> help(traceback.print_exception)
Help on function print_exception in module traceback:
print_exception(exc, /, value=<object object at 0x000002825DF09650>, tb=<object object at 0x000002825DF09650>, limit=None, file=None, chain=True)
```

또한, 논의에서 많은 기존 sentinel의 다른 두 가지 단점이 제기되었습니다.

*   일부는 고유한 타입을 가지고 있지 않아, 기본값으로 이러한 sentinel을 사용하는 함수에 대해 명확한 타입 시그니처를 정의하는 것이 불가능합니다.
*   복사되거나 역직렬화(unpickled)된 후에 예상치 못하게 동작합니다. 이는 별도의 인스턴스가 생성되어 `is`를 사용한 비교가 실패하기 때문입니다.

이어진 논의에서 Victor Stinner는 파이썬 표준 라이브러리에서 현재 사용되는 sentinel 값 목록을 제공했습니다. 이는 sentinel의 필요성이 상당히 일반적이며, `stdlib` 내에서도 다양한 구현 방법이 사용되고 있고, 이들 중 다수가 위에 언급된 세 가지 단점 중 적어도 하나를 겪고 있음을 보여주었습니다.

논의는 표준 구현 방법이 필요한지 또는 바람직한지, 언급된 단점이 중요한지, 어떤 종류의 구현이 좋을지에 대한 명확한 합의로 이어지지 않았습니다. 이 PEP의 저자는 개선 옵션을 제안하는 `bugs.python.org` (현재 GitHub 이슈)에 이슈를 생성했지만, 이는 몇몇 경우의 단일 문제적 측면에만 초점을 맞추었으며 어떠한 지지도 얻지 못했습니다.

커뮤니티의 의견을 더 명확하게 파악하기 위해 `discuss.python.org`에 설문조사가 생성되었습니다. 거의 2주간의 상당한 추가 논의와 39표의 투표 후에도 설문조사 결과는 결정적이지 않았습니다. 40%가 "현재 상태가 괜찮다 / 일관성이 필요 없다"에 투표했지만, 대부분의 투표자는 하나 이상의 표준화된 해결책에 투표했습니다. 특히, 37%의 투표자가 "새롭고 전용인 sentinel 팩토리/클래스/메타클래스를 일관되게 사용하고, `stdlib`에도 공개적으로 제공"을 선택했습니다.

이러한 혼합된 의견으로 인해, 이 PEP는 이 주제에 대한 결정을 촉진하기 위해 작성되었습니다.

이 PEP를 작업하고, 다양한 옵션과 구현을 반복하며, 논의를 계속하는 동안, 저자는 표준 라이브러리에 간단하고 좋은 구현이 있는 것이 `stdlib` 자체와 다른 곳에서 모두 유용할 것이라는 의견에 도달했습니다.

## 근거 (Rationale)

선택된 구현을 안내하는 기준은 다음과 같습니다.

*   **동작 일관성** : sentinel 객체는 `is` 연산자를 사용하여 비교할 때 항상 자신과 동일하게 간주되어야 하지만, 다른 어떤 객체와도 동일하게 간주되어서는 안 됩니다.
*   **간단한 생성** : sentinel 객체 생성은 간단하고 명확한 한 줄 코드여야 합니다.
*   **다중 sentinel 정의** : 필요한 만큼 많은 고유한 sentinel 값을 쉽게 정의할 수 있어야 합니다.
*   **명확하고 짧은 `repr`** : sentinel 객체는 명확하고 짧은 `repr`을 가져야 합니다.
*   **명확한 타입 시그니처** : sentinel에 대해 명확한 타입 시그니처를 사용할 수 있어야 합니다.
*   **복사/역직렬화 후 올바른 동작** : sentinel 객체는 복사 및/또는 역직렬화 후에 올바르게 동작해야 합니다.
*   **다중 파이썬 구현 지원** : 이러한 sentinel은 CPython 3.x 및 PyPy3에서 작동해야 하며, 이상적으로는 다른 파이썬 구현에서도 작동해야 합니다.
*   **간단한 구현 및 사용** : 구현 및 특히 사용에 있어서 가능한 한 간단하고 명확해야 합니다. 파이썬을 배울 때 또 다른 특별한 학습 대상이 되는 것을 피해야 합니다.
*   **쉬운 발견 및 사용** : 필요할 때 쉽게 찾고 사용할 수 있어야 하며, 코드를 읽을 때 일반적으로 문서를 찾아볼 필요성을 느끼지 않을 정도로 명확해야 합니다.

파이썬 표준 라이브러리에 많은 용례가 있으므로, `stdlib`가 다른 곳에서 사용 가능한 sentinel 객체 구현(예: `sentinels` 또는 `sentinel` PyPI 패키지)을 사용할 수 없기 때문에 표준 라이브러리에 구현이 있는 것이 유용할 것입니다.

기존 관용구 및 구현을 조사하고, 다양한 가능한 구현을 검토한 후, 이 모든 기준을 충족하는 구현이 작성되었습니다 (참조 구현 섹션 참조).

## 명세 (Specification)

새로운 `sentinellib` 모듈에 새로운 `Sentinel` 클래스가 추가될 예정입니다.

```python
>>> from sentinellib import Sentinel
>>> MISSING = Sentinel('MISSING')
>>> MISSING
MISSING
```

어떤 값이 이러한 sentinel인지 확인하는 것은 `None`에 권장되는 것처럼 `is` 연산자를 사용하여 수행되어야 합니다. `==`를 사용한 동일성 검사도 예상대로 작동하며, 객체가 자기 자신과 비교될 때만 `True`를 반환합니다. `if value is MISSING:`와 같은 동일성 검사는 `if value:` 또는 `if not value:`와 같은 부울 검사보다 일반적으로 사용되어야 합니다.

`Sentinel` 인스턴스는 "truthy"합니다. 즉, 부울 평가 시 `True`를 반환합니다. 이는 임의의 클래스의 기본값과 `Ellipsis`의 부울 값과 유사합니다. 이는 "falsy"한 `None`과는 다릅니다.

sentinel의 이름은 각 모듈 내에서 고유합니다. 특정 이름으로 sentinel이 이미 정의된 모듈에서 `Sentinel()`을 호출하면, 해당 이름의 기존 sentinel이 반환됩니다. 다른 모듈에서 동일한 이름으로 정의된 sentinel은 서로 구별됩니다.

`copy.copy()`를 사용하거나 직렬화(pickling) 및 역직렬화(unpickling)를 통해 sentinel 객체를 복사하면 동일한 객체가 반환됩니다.

`Sentinel()`은 단일 선택적 인수 `module_name`도 허용합니다. `Sentinel()`은 일반적으로 호출된 모듈을 자동으로 인식할 수 있으므로, 이 인수는 일반적으로 제공할 필요가 없습니다. `module_name`은 Jython이나 IronPython을 사용하는 경우와 같이 자동 인식이 의도한 대로 작동하지 않는 특이한 경우에만 제공되어야 합니다. 이는 `Enum` 및 `namedtuple`의 디자인과 유사합니다. 자세한 내용은 PEP 435를 참조하세요.

`Sentinel` 클래스는 서브클래싱 지원의 복잡성을 피하기 위해 서브클래스화될 수 없습니다.

sentinel 객체에 대한 순서 비교는 정의되지 않습니다.

### 타입 힌트 (Typing)

타입이 지정된 파이썬 코드에서 sentinel 사용을 명확하고 간단하게 만들기 위해, 타입 시스템에 sentinel 객체에 대한 특별한 경우를 추가할 것을 제안합니다.

sentinel 객체는 타입 표현식에서 자기 자신을 나타내는 데 사용될 수 있습니다. 이는 기존 타입 시스템에서 `None`이 처리되는 방식과 유사합니다. 예를 들어:

```python
from sentinels import Sentinel

MISSING = Sentinel('MISSING')

def foo(value: int | MISSING = MISSING) -> int:
    ...
```

더 공식적으로, 타입 체커는 `NAME = Sentinel('NAME')` 형식의 sentinel 생성을 새로운 sentinel 객체를 생성하는 것으로 인식해야 합니다. `Sentinel` 생성자에 전달된 이름이 객체가 할당된 이름과 일치하지 않으면 타입 체커는 오류를 발생시켜야 합니다.

이 구문을 사용하여 정의된 sentinel은 타입 표현식에서 사용될 수 있습니다. 이들은 단일 멤버인 sentinel 객체 자체를 가진 완전히 정적인 타입을 나타냅니다.

타입 체커는 `is` 및 `is not` 연산자를 사용하여 sentinel을 포함하는 유니온 타입(union type)을 좁히는(narrowing) 것을 지원해야 합니다.

```python
from sentinels import Sentinel
from typing import assert_type

MISSING = Sentinel('MISSING')

def foo(value: int | MISSING) -> None:
    if value is MISSING:
        assert_type(value, MISSING)
    else:
        assert_type(value, int)
```

타입 표현식에서의 사용을 지원하기 위해, `Sentinel` 클래스의 런타임 구현은 `__or__` 및 `__ror__` 메서드를 가져야 하며, `typing.Union` 객체를 반환해야 합니다.

## 하위 호환성 (Backwards Compatibility)

이 제안은 하위 호환성 문제에 영향을 미치지 않습니다.

## 교육 방법 (How to Teach This)

새로운 `stdlib` 모듈 및 기능에 대한 일반적인 문서 유형, 즉 `doc-strings`, 모듈 문서 및 "새로운 기능 (What's New)" 섹션으로 충분할 것입니다.

## 보안 영향 (Security Implications)

이 제안은 보안에 영향을 미치지 않습니다.

## 참조 구현 (Reference Implementation)

참조 구현은 전용 GitHub 리포지토리에서 찾을 수 있습니다.

간소화된 버전은 다음과 같습니다.

```python
_registry = {}

class Sentinel:
    """고유한 sentinel 값."""
    def __new__(cls, name, module_name=None):
        name = str(name)
        if module_name is None:
            # sys._getframemodulename(1) is a CPython-specific optimization
            # and not part of the public API. In a real stdlib implementation,
            # we'd likely use inspect or a similar mechanism for broader
            # compatibility. For this simplified example, we'll assume it works
            # or fall back to __name__.
            import sys
            module_name = sys._getframemodulename(1)
            if module_name is None:
                module_name = __name__

        registry_key = f'{module_name}-{name}'
        sentinel = _registry.get(registry_key, None)
        if sentinel is not None:
            return sentinel

        sentinel = super().__new__(cls)
        sentinel._name = name
        sentinel._module_name = module_name
        return _registry.setdefault(registry_key, sentinel)

    def __repr__(self):
        return self._name

    def __reduce__(self):
        return (
            self.__class__,
            (
                self._name,
                self._module_name,
            ),
        )
```

## 기각된 아이디어 (Rejected Ideas)

다양한 대안이 고려되었지만, 제안된 솔루션의 기준을 충족하지 못했거나 다른 단점을 가지고 있어 기각되었습니다.

### `NotGiven = object()` 사용

*   **문제점** : 동기(Motivation) 섹션에 언급된 모든 단점(읽기 어려운 `repr`, 고유한 타입 부재, 복사/역직렬화 후 예상치 못한 동작)을 겪습니다.

### `MISSING` 또는 `Sentinel`과 같은 단일 새 sentinel 값 추가

*   **문제점** : 이러한 값이 다양한 곳에서 사용될 수 있기 때문에, 특정 사용 사례에서 유효한 값이 아닐 것이라고 항상 확신할 수 없습니다. 반면, 전용의 고유한 sentinel 값은 잠재적인 엣지 케이스를 고려할 필요 없이 자신 있게 사용할 수 있습니다.
*   **문제점** : sentinel 값에 사용되는 컨텍스트에 특화된 의미 있는 이름과 `repr`을 제공할 수 없게 됩니다.
*   **투표 결과** : 설문조사에서 매우 인기가 없었습니다 (12%만 선택).

### 기존 `Ellipsis` sentinel 값 사용

*   **문제점** : `Ellipsis`의 원래 의도된 용도는 아니며 (비록 `pass` 대신 빈 클래스 또는 함수 블록을 정의하는 데 점점 더 많이 사용되지만), 전용의 고유한 값과는 달리 모든 경우에 자신 있게 사용될 수 없습니다.

### 단일 값을 가지는 `enum` 사용

*   **제안된 관용구** :
    ```python
    class NotGivenType(Enum):
        NotGiven = 'NotGiven'
    NotGiven = NotGivenType.NotGiven
    ```
*   **문제점** : 지나친 반복이 있으며, `repr`이 `<NotGivenType.NotGiven: 'NotGiven'>`와 같이 너무 깁니다. 더 짧은 `repr`을 정의할 수 있지만, 이는 더 많은 코드와 더 많은 반복을 요구합니다.
*   **투표 결과** : 설문조사의 9가지 옵션 중 가장 인기가 없었습니다 (단 한 표도 받지 못했습니다).

### sentinel 클래스 데코레이터 사용

*   **제안된 관용구** :
    ```python
    @sentinel
    class NotGivenType:
        pass
    NotGiven = NotGivenType()
    ```
*   **문제점** : 데코레이터 구현은 매우 간단하고 명확하지만, 관용구가 너무 장황하고 반복적이며 기억하기 어렵습니다.

### 클래스 객체 사용

*   **문제점** : 클래스는 본질적으로 싱글톤(singleton)이므로, 클래스를 sentinel 값으로 사용하는 것은 합리적이며 간단한 구현을 가능하게 합니다. 가장 간단한 버전은 `class NotGiven: pass`와 같습니다. 하지만 명확한 `repr`을 가지려면 메타클래스나 클래스 데코레이터가 필요합니다.
*   **문제점** : 이러한 방식으로 클래스를 사용하는 것은 특이하며 혼란을 줄 수 있습니다. 주석 없이는 코드의 의도를 이해하기 어려울 것입니다. 또한 이러한 sentinel이 호출 가능(callable)하는 등 예상치 못하고 바람직하지 않은 동작을 유발할 수 있습니다.

### 구현을 제공하지 않고 권장되는 "표준" 관용구 정의

*   **문제점** : 대부분의 기존 일반적인 관용구는 상당한 단점을 가지고 있습니다. 이러한 단점을 피하면서 명확하고 간결한 관용구는 아직 발견되지 않았습니다.
*   **투표 결과** : 이 주제에 대한 설문조사에서 관용구를 권장하는 옵션은 인기가 없었으며, 가장 많이 득표한 옵션도 25%의 투표자만 선택했습니다.

### `repr` 사용자 정의 허용

*   **문제점** : 기존 sentinel 값의 `repr`을 변경하지 않고 이 기능을 사용하는 데 유용했습니다. 그러나 추가적인 복잡성만큼의 가치가 없다고 판단되어 결국 기각되었습니다.

### 타입 힌트에 `typing.Literal` 사용

*   **문제점** : 논의에서 여러 사람이 제안했으며, 이 PEP가 처음에는 이 방향으로 진행되었습니다. 그러나 `Literal["MISSING"]`이 sentinel 값 `MISSING`에 대한 전방 참조(forward-reference)가 아니라 문자열 값 `"MISSING"`을 참조하여 잠재적인 혼란을 야기할 수 있다는 지적이 있었습니다.
*   **대안** : 단순히 bare name을 사용하는 것이 `None`이 설정한 선례와 잘 알려진 패턴을 따르며, import가 필요 없고 훨씬 짧다는 장점이 있습니다.

## 추가 참고 사항 (Additional Notes)

*   이 PEP와 초기 구현은 전용 GitHub 리포지토리에 작성되었습니다.
*   클래스 스코프(class scope)에서 정의된 sentinel의 경우, 잠재적인 이름 충돌을 피하기 위해 모듈 내 변수의 완전 한정 이름(fully-qualified name)을 사용해야 합니다. 전체 이름은 `repr`로 사용됩니다. 예를 들어:
    ```python
    >>> class MyClass:
    ...     NotGiven = Sentinel('MyClass.NotGiven')
    >>> MyClass.NotGiven
    MyClass.NotGiven
    ```
*   함수나 메서드에서 sentinel을 생성할 때 주의해야 합니다. 같은 모듈의 코드에 의해 생성된 같은 이름의 sentinel은 동일하기 때문입니다. 고유한 sentinel 객체가 필요한 경우, 반드시 고유한 이름을 사용해야 합니다.
*   sentinel의 "truthiness"(즉, 부울 값)에 대한 단일 바람직한 값은 없습니다. 때로는 부울 값이 `True`인 것이 유용하고, 때로는 `False`인 것이 유용합니다. 파이썬의 내장 sentinel 중 `None`은 `False`로 평가되지만, `Ellipsis` (일명 `...`)는 `True`로 평가됩니다.
*   `NotImplemented`의 부울 값은 `True`이지만, 파이썬 3.9부터 사용이 deprecated되었습니다 (deprecation 경고가 생성됩니다). 이 deprecation은 bpo-35712에 설명된 `NotImplemented`에 특정한 문제 때문입니다.
*   여러 개의 관련 sentinel 값을 정의하고, possibly 그들 사이에 정의된 순서를 가지려면 `Enum` 또는 유사한 것을 대신 사용해야 합니다.
*   `typing-sig` 메일링 리스트에서 이러한 sentinel의 타이핑에 대한 논의가 있었고, 다양한 옵션이 논의되었습니다.

## 미해결 문제 (Open Issues)

새로운 `stdlib` 모듈을 추가하는 것이 올바른 방법일까요? 이를 위한 논리적인 기존 모듈을 찾을 수 없었습니다. 그러나 새로운 `stdlib` 모듈은 신중하게 추가되어야 하므로, 완벽하게 적합하지 않더라도 기존 모듈을 선택하는 것이 더 나을 수도 있을까요?

---
**저작권** : 이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 관대한 라이선스 하에 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.