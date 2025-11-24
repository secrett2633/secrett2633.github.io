---
title: "[Draft] PEP 671 - Syntax for late-bound function argument defaults"
excerpt: "Python Enhancement Proposal 671: 'Syntax for late-bound function argument defaults'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/671/
toc: true
toc_sticky: true
date: 2025-09-27 10:05:44+0900
last_modified_at: 2025-09-27 10:05:44+0900
published: true
---
> **원문 링크:** [PEP 671 - Syntax for late-bound function argument defaults](https://peps.python.org/pep-0671/)
>
> **상태:** Draft | **유형:** Standards Track | **작성일:** 24-Oct-2021

PEP 671 – 함수 인자 지연 바인딩 기본값 구문

## 초록 (Abstract)

함수 매개변수는 함수 정의 시점에 계산되어 저장되는 기본값을 가질 수 있습니다. 이 제안은 함수 호출 시점에 평가되는 표현식으로 정의되는 새로운 형태의 인자 기본값을 도입합니다.

## 동기 (Motivation)

선택적(optional) 함수 인자는 생략될 경우 종종 어떤 논리적인 기본값을 가집니다. 이 값이 다른 인자에 의존하거나, 함수 호출마다 다시 평가되어야 하는 경우, 현재는 함수 헤더(header)에 이를 명확하게 표현할 깔끔한 방법이 없습니다.

현재 이를 위해 사용되는 일반적인 방식들은 다음과 같습니다.

*   **매우 흔한 방법: `None`을 사용하고 함수 내에서 대체합니다.**

    ```python
    def bisect_right(a, x, lo=0, hi=None, *, key=None):
        if hi is None:
            hi = len(a)
    ```

*   **잘 알려진 방법: 고유한 커스텀 센티넬(sentinel) 객체를 사용합니다.**

    ```python
    _USE_GLOBAL_DEFAULT = object()
    def connect(timeout=_USE_GLOBAL_DEFAULT):
        if timeout is _USE_GLOBAL_DEFAULT:
            timeout = default_timeout
    ```

*   **드문 방법: 가변 인자(`star-args`)를 받은 후 유효성을 검사합니다.**

    ```python
    def add_item(item, *optional_target):
        if not optional_target:
            target = []
        else:
            target = optional_target[0]
    ```

이러한 각 방식은 `help(function)`이 실제 기본값을 보여주지 못한다는 문제점을 가지고 있습니다. 또한, 각각의 추가적인 문제점도 있습니다. `None`을 사용하는 방법은 `None` 자체가 유효한 함수 매개변수가 아닐 때만 유효하고, 커스텀 센티넬은 전역 상수(global constant)를 필요로 하며, 가변 인자를 사용하는 방법은 하나 이상의 인자가 제공될 수 있음을 암시합니다.

## 명세 (Specification)

함수 기본 인자는 새로운 `=>` 표기법을 사용하여 정의할 수 있습니다.

```python
def bisect_right(a, x, lo=0, hi=>len(a), *, key=None):
def connect(timeout=>default_timeout):
def add_item(item, target=>[]):
def format_time(fmt, time_t=>time.time()):
```

`=>` 뒤의 표현식은 검사를 위해 소스 코드 형태로 저장되며, 이를 평가하기 위한 바이트코드는 함수의 본문(body) 앞에 추가됩니다.

특히, 이 표현식은 함수가 정의된 스코프(scope)가 아닌, 함수의 런타임 스코프(run-time scope)에서 평가됩니다 (초기 바인딩된(early-bound) 기본값과는 다릅니다). 이를 통해 표현식이 다른 인자들을 참조할 수 있게 됩니다.

여러 개의 지연 바인딩(late-bound) 인자는 왼쪽에서 오른쪽으로 평가되며, 이전에 정의된 값들을 참조할 수 있습니다. 순서는 키워드 인자가 전달되는 순서와 관계없이 함수에 의해 정의됩니다.

```python
def prevref(word="foo", a=>len(word), b=>a//2): # 유효함
def selfref(spam=>spam): # UnboundLocalError 발생
def spaminate(sausage=>eggs + 1, eggs=>sausage - 1): # 혼란스러우므로 이렇게 하지 마세요
def frob(n=>len(items), items=[]): # 아래 참고
```

평가 순서는 왼쪽에서 오른쪽입니다. 그러나 구현체는 모든 전달된 인자와 초기 바인딩된 기본값을 처리하는 첫 번째 패스, 그리고 지연 바인딩된 기본값을 처리하는 두 번째 패스로 두 번의 패스를 선택할 수 있습니다. 그렇지 않으면 모든 인자는 엄격하게 왼쪽에서 오른쪽으로 할당됩니다.

### 제안되었으나 거부된 표기법 (Rejected choices of spelling)

이 문서에서는 `name=>expression` 이라는 단일 구문을 명시하고 있지만, 다른 표기법들도 가능했습니다. 다음 표기법들이 고려되었습니다.

```python
def bisect(a, hi=>len(a)):
def bisect(a, hi:=len(a)):
def bisect(a, hi?=len(a)):
def bisect(a, @hi=len(a)):
```

기본 인자들은 초기 바인딩이든 지연 바인딩이든 거의 동일하게 작동하므로, 선택된 `hi=>len(a)` 구문은 기존의 초기 바인딩 구문과 의도적으로 유사하게 설계되었습니다.

`:=` 구문이 거부된 한 가지 이유는 어노테이션(annotations)과의 동작 때문입니다. 어노테이션은 기본값 앞에 오므로, 모든 구문 옵션에서 이것이 어노테이션인지, 기본값인지, 또는 둘 다인지가 모호하지 않아야 합니다 (사람과 파서 모두에게). 대체 구문인 `target:=expr`는 `target:int=expr`에서 어노테이션이 실수로 생략된 것으로 잘못 해석될 위험이 있으며, 따라서 버그를 숨길 수 있습니다. 선택된 구문 `target=>expr`는 이러한 문제가 없습니다.

## 교육 방법 (How to Teach This)

초기 바인딩된 기본 인자는 항상 먼저 가르쳐야 합니다. 이들은 인자를 평가하는 더 간단하고 효율적인 방법이기 때문입니다. 이를 기반으로, 지연 바인딩 인자는 함수의 시작 부분에 있는 코드와 광범위하게 동일합니다.

```python
def add_item(item, target=>[]):
    # 유사한 의사 코드(pseudocode):
    # def add_item(item, target=<OPTIONAL>):
    #     if target was omitted:
    #         target = []
```

간단한 경험 법칙은 다음과 같습니다: "`target=expression`"은 함수가 정의될 때 평가되고, "`target=>expression`"은 함수가 호출될 때 평가됩니다. 어느 쪽이든, 호출 시점에 인자가 제공되면 기본값은 무시됩니다. 이것이 모든 미묘한 차이를 완전히 설명하지는 않지만, 여기서 중요한 구별(그리고 유사점)을 다루는 데는 충분합니다.

## 다른 제안과의 상호작용 (Interaction with other proposals)

[PEP 661](https://peps.python.org/pep-0661/)은 이 제안과 동일한 문제 중 하나를 해결하려고 합니다. 이 제안이 많은 일반적인 경우에 센티넬의 필요성을 제거하고자 하는 반면, [PEP 661](https://peps.python.org/pep-0661/)은 기본 인자의 센티넬 값 문서화를 개선하고자 합니다. [PEP 661](https://peps.python.org/pep-0661/)은 임의로 복잡한 함수에서 문서화를 개선할 수 있습니다 (주요 동기로 `traceback.print_exception`을 인용하며, 이는 두 인자가 모두 지정되거나 모두 지정되지 않아야 합니다). 반면, 이 제안을 통해 실제 기본값을 함수가 정의할 수 있다면 많은 일반적인 경우에 센티넬이 더 이상 필요하지 않을 것입니다. 또한, 전용 센티넬 객체는 딕셔너리 조회 키로 사용될 수 있지만, [PEP 671](https://peps.python.org/pep-0671/)은 여기에 적용되지 않습니다.

지연 평가(deferred evaluation)를 위한 일반적인 시스템이 때때로 제안되었습니다 (어노테이션에 특화된 [PEP 563](https://peps.python.org/pep-0563/) 및 [PEP 649](https://peps.python.org/pep-0649/)와 혼동해서는 안 됩니다). 표면적으로 지연 바인딩 인자 기본값이 유사한 성격인 것처럼 보일 수 있지만, 실제로는 관련이 없고 직교적인(orthogonal) 아이디어이며, 둘 다 언어에 가치를 더할 수 있습니다. 이 제안의 수락 또는 거부는 지연 평가 제안의 타당성에 영향을 미치지 않으며, 그 반대도 마찬가지입니다. (일반화된 지연 평가와 인자 기본값의 주요 차이점은 인자 기본값은 함수 실행이 시작될 때 항상 그리고 오직 그때만 평가되는 반면, 지연 표현식은 참조될 때만 실현된다는 점입니다.)

## 구현 세부 사항 (Implementation details)

다음 내용은 참조 구현(reference implementation)에 관한 것이며, 반드시 명세의 일부는 아닙니다.

인자 기본값(위치 인자 또는 키워드 인자)은 이미 유지되고 있는 값과 추가적인 정보 조각을 가집니다. 위치 인자의 경우, 추가 정보는 `__defaults_extra__` 튜플에 저장되고, 키워드 전용 인자의 경우 `__kwdefaults_extra__` 딕셔너리에 저장됩니다. 이 속성이 `None`이면, 모든 인자 기본값이 `None`인 것과 동일합니다.

지연 바인딩 기본값을 가진 각 매개변수에 대해, 특수 값인 `Ellipsis`가 값 플레이스홀더로 저장되고, 해당 추가 정보가 쿼리되어야 합니다. 만약 `None`이라면, 기본값은 실제로 `Ellipsis`입니다. 그렇지 않으면, 설명 문자열이며 실제 값은 함수가 시작될 때 계산됩니다.

지연 바인딩 기본값을 가진 매개변수가 생략되면, 함수는 매개변수가 바인딩되지 않은 상태로 시작됩니다. 함수는 새로운 옵코드 `QUERY_FAST/QUERY_DEREF`를 사용하여 지연 바인딩 기본값을 가진 각 매개변수를 테스트하고, 바인딩되지 않은 경우 원래 표현식을 평가합니다. 이 옵코드(빠른 로컬 변수(fast locals) 및 클로저 변수(closure variables)에만 사용 가능)는 주어진 로컬 변수가 값을 가지면 `True`를 스택에 푸시하고, 그렇지 않으면 `False`를 푸시합니다. 즉, `LOAD_FAST` 또는 `LOAD_DEREF`가 `UnboundLocalError`를 발생시키면 `False`를 푸시하고, 성공하면 `True`를 푸시합니다.

참조 대상이 인자 또는 초기 바인딩 기본값에서 값을 가지고 있는 한, 순서가 뒤바뀐 변수 참조가 허용됩니다.

## 비용 (Costs)

지연 바인딩 인자 기본값이 사용되지 않을 때 발생하는 비용은 다음과 같을 것으로 예상됩니다.

*   함수 객체에 두 개의 추가 포인터가 필요하며, 이들은 `NULL`이 될 것입니다.
*   코드 컴파일 및 함수 구성 시 추가적인 플래그 검사가 있습니다.
*   `Ellipsis`를 기본값으로 사용하는 경우, 지연 바인딩 기본값이 존재하는지 확인하기 위한 런타임 검증이 필요합니다.

이러한 비용은 최소화될 것으로 예상됩니다 (64비트 리눅스에서는 모든 함수 객체가 152바이트에서 168바이트로 증가합니다). 지연 바인딩 기본값이 사용되지 않을 때는 사실상 런타임 비용이 없습니다.

## 하위 호환성 (Backward incompatibility)

지연 바인딩 기본값이 사용되지 않는 경우 동작은 동일해야 합니다. `Ellipsis`가 발견되면 주의해야 합니다. 왜냐하면 그것이 `Ellipsis` 자체를 나타내지 않을 수도 있기 때문입니다. 그러나 그 외에는 도구들이 기존 코드를 변경되지 않은 것으로 인식해야 합니다.

## 참조 (References)

*   [https://github.com/rosuav/cpython/tree/pep-671](https://github.com/rosuav/cpython/tree/pep-671)

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되거나 CC0-1.0-Universal 라이선스 중 더 관대한 조건으로 제공됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.