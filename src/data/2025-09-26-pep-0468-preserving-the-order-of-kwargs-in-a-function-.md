---
title: "[Final] PEP 468 - Preserving the order of **kwargs in a function."
excerpt: "Python Enhancement Proposal 468: 'Preserving the order of ** kwargs in a function.'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/468/
toc: true
toc_sticky: true
date: 2025-09-26 22:15:02+0900
last_modified_at: 2025-09-26 22:15:02+0900
published: true
---
> **원문 링크:** [PEP 468 - Preserving the order of **kwargs in a function.](https://peps.python.org/pep-0468/)
>
> ** 상태: ** Final | ** 유형: ** Standards Track | ** 작성일: ** 05-Apr-2014


## PEP 468 – 함수 내 `** kwargs` 순서 유지

### 개요 (Abstract)

함수 정의에서 ` **kwargs` 구문은 다른 이름 있는 매개변수에 해당하지 않는 모든 키워드 인자(keyword arguments)를 수집하도록 인터프리터에 지시합니다. 그러나 Python은 수집된 키워드 인자들이 함수에 전달된 순서를 보존하지 않았습니다. 특정 맥락에서는 이 순서가 중요할 수 있습니다. 이 PEP는 수집된 키워드 인자들이 함수 본문에서 정렬된 매핑(ordered mapping)으로 노출되어야 함을 규정합니다.

### 동기 (Motivation)

Python의 함수 정의 내 `** kwargs` 구문은 키워드 인자를 동적으로 처리하는 강력한 수단을 제공합니다. 이 구문의 일부 응용 분야(사용 사례 참조)에서는 수집된 키워드 인자에 적용되는 의미론(semantics)이 순서 보존을 요구합니다. 놀랍지 않게도, 이는 `OrderedDict`가 `dict`와 어떤 관계를 가지는지와 유사합니다.

기존에는 순서를 보존하려면 실제 함수 호출과 별개로 수동으로 처리해야 했습니다. 이는 `OrderedDict` 또는 2-튜플(tuple)의 이터러블(iterable)과 같은 정렬된 매핑을 구축한 다음, 이를 단일 인자로 함수에 전달하는 방식을 포함했습니다. 이 PEP에서 설명하는 기능을 통해 이러한 불필요한 반복적인 코드(boilerplate)는 더 이상 필요 없게 됩니다.

Alyssa (Nick) Coghlan은 일부 사용 사례에 대해 "이것들은 모두 오늘날에도 가능하지만, 키워드 인자를 사용해서는 안 됩니다. 제 생각에 해결해야 할 문제는 키워드 인자가 소스 코드에 명확한 순서를 가지고 있기 때문에 이러한 경우에 작동해야 할 것처럼 보인다는 것입니다. 작동하지 않는 유일한 이유는 인터프리터가 그 순서 정보를 버리기 때문입니다. 이는 언어 기능이 특정 상황에서 '매력적인 골칫거리(attractive nuisance)'가 되는 전형적인 사례입니다. 위 사용 사례에 대한 간단하고 명백한 해결책은 Python의 복잡한 인자 처리 방식을 확실히 이해하지 못한다면 명확하지 않은 이유로 실제로는 작동하지 않습니다."라고 잘 요약했습니다.

이러한 관찰은 수년간 이 제안이 나타난 것과 사람들이 `OrderedDict`의 생성자에 대해 혼란스러워했던 수많은 사례들에 의해 뒷받침됩니다.

### 사용 사례 (Use Cases)

Alyssa가 언급했듯이, `**kwargs`의 현재 동작은 순서가 중요할 것으로 예상되는 경우에 직관적이지 않습니다. 아래에 설명된 더 구체적인 경우 외에도, 일반적으로 "반복 순서를 제어하고 단일 호출에서 필드 이름과 값을 설정하려는 모든 것"이 잠재적으로 이점을 얻을 것입니다. 이는 정렬된 타입(ordered types)을 위한 팩토리(예: `__init__()`)의 경우에 중요합니다.

#### 직렬화 (Serialization)

`OrderedDict`는 정렬된 `kwargs`로부터 분명히 이점을 얻을 것입니다 (`__init__()` 및 `update()` 모두). 그러나 이 이점은 직렬화 API에도 확장됩니다:

직렬화 맥락에서, 우리가 배운 중요한 교훈 중 하나는 임의의 순서가 불필요한 차이(spurious diffs)를 최소화하려는 경우 문제가 되며, 정렬은 간단한 해결책이 아니라는 것입니다. `doctest`와 같은 도구는 불필요한 차이를 전혀 허용하지 않지만, 종종 정렬 기반의 해결책을 받아들입니다. 키-값 쌍의 표시 순서를 제어하기 위해 키워드 인자를 사용하는 것이 매우 바람직한 경우는 다음과 같습니다:
*   CLI 출력에서 `key:value` 쌍을 출력할 때
*   CSV에서 의미 있는 이름을 열 순서에 매핑할 때
*   XML에서 특정 순서로 속성 및 요소를 직렬화할 때
*   JSON 및 YAML과 같은 사람이 읽을 수 있는 형식에서 특정 순서로 맵 키를 직렬화할 때 (특히 소스 제어 하에 놓일 경우)

#### 디버깅 (Debugging)

Raymond Hettinger의 말에 따르면:

"인자가 생성된 순서대로 나타나면 디버깅이 더 쉬워집니다. 제가 아는 한, 이들을 뒤섞는 것은 아무런 목적에도 부합하지 않습니다."

#### 기타 사용 사례 (Other Use Cases)

*   Mock 객체 (Mock objects)
*   객체 표현 제어 (Controlling object presentation)
*   기본값을 지정할 수 있는 대체 `namedtuple()`
*   순서에 따른 인자 우선순위 지정 (Specifying argument priority by order)

### 우려 사항 (Concerns)

#### 성능 (Performance)

이미 언급했듯이, 정렬된 키워드 인자 아이디어는 여러 차례 제기되었습니다. 매번 동일한 반응에 부딪혔는데, 키워드 인자 순서 보존이 함수 호출 성능에 충분히 악영향을 미쳐서 할 가치가 없다는 것이었습니다. 그러나 Guido는 다음과 같이 언급했습니다:

"` **kwds`를 정렬하는 것은 여전히 열려 있지만, 이점을 얻지 못하는 함수 호출의 속도를 늦추지 않도록 신중한 설계 및 구현이 필요합니다."

아래에서 언급하겠지만, 복잡성을 증가시키는 대가로 이를 해결할 방법들이 있습니다. 궁극적으로 가장 간단한 접근 방식은 가장 합리적인 방식입니다: 수집된 키워드 인자를 `OrderedDict`에 팩(pack)하는 것입니다. 그러나 `OrderedDict`의 C 구현이 없으면 논의할 것이 많지 않았습니다. 이는 Python 3.5에서 변경되었습니다.

** 참고: ** Python 3.6에서는 `dict`가 순서 보존(order-preserving)을 합니다. 이는 성능 우려를 사실상 없앱니다.

#### 다른 Python 구현 (Other Python Implementations)

고려해야 할 또 다른 중요한 문제는 새로운 기능이 여러 Python 구현을 인지해야 한다는 것입니다. 언젠가는 각 구현이 정렬된 `kwargs`를 구현할 것으로 예상됩니다. 이와 관련하여 이 아이디어에 문제가 없는 것으로 보입니다. 주요 Python 구현에 대한 비공식 설문조사에 따르면 이 기능은 큰 부담이 되지 않을 것입니다.

### 명세 (Specification)

버전 3.6부터 Python은 함수에 전달된 키워드 인자의 순서를 보존합니다. 이를 위해 수집된 `kwargs`는 이제 정렬된 매핑(ordered mapping)이 될 것입니다. 이것이 반드시 `OrderedDict`를 의미하는 것은 아닙니다. CPython 3.6의 `dict`는 PyPy처럼 이제 순서가 보존됩니다.

이것은 정의에서 `** kwargs` 구문을 사용하여 지정되지 않은 키워드 인자들을 수집하는 함수에만 적용됩니다. 해당 키워드 인자들의 순서만 보존됩니다.

#### ` **`-언패킹(unpacking) 구문과의 관계

함수 호출의 `** ` 언패킹 구문은 이 제안과 특별한 관련이 없습니다. 언패킹을 통해 제공되는 키워드 인자는 현재와 동일하게 처리됩니다: 정의된 매개변수와 일치하는 것은 해당 위치로 수집되고, 나머지는 정렬된 `kwargs`로 수집됩니다 (다른 일치하지 않는 키워드 인자와 마찬가지로).

`dict`와 같이 정의되지 않은 순서의 매핑을 언패킹하는 것은 정상적으로 반복 순서를 보존합니다. 단지 그 순서가 정의되지 않은 상태로 유지될 뿐입니다. 언패킹된 키-값 쌍이 팩(pack)될 정렬된 매핑은 어떤 대체 순서도 제공할 수 없을 것입니다. 이는 놀라운 일이 아닙니다.

매핑을 언패킹하고 다시 팩하는 대신 함수 `kwargs`로 직접 전달하는 것에 대한 간략한 논의가 있었지만, 이는 이 제안의 범위를 벗어나며 아마도 좋은 아이디어도 아닙니다. (그 논의가 간략했던 이유가 있습니다.)

#### `inspect.Signature`와의 관계

`Signature` 객체는 변경될 필요가 없습니다. `inspect.BoundArguments`의 `kwargs` 매개변수 (`Signature.bind()` 및 `Signature.bind_partial()`에 의해 반환됨)는 `dict`에서 `OrderedDict`로 변경될 것입니다.

#### C-API

변경 없음.

#### 문법 (Syntax)

이 제안에 의해 추가되거나 변경되는 문법은 없습니다.

#### 하위 호환성 (Backward-Compatibility)

다음과 같은 변경 사항이 있습니다:

*   `kwargs`의 반복 순서가 이제 일관될 것입니다 (물론 위에서 설명한 경우 제외).

#### 참조 구현 (Reference Implementation)

CPython의 경우 할 일은 없습니다.

### 대안적 접근 방식 (Alternate Approaches)

#### Opt-out Decorator

이것은 현재 제안과 동일하지만, Python이 `functools` 모듈에 데코레이터(decorator)를 제공하여 수집된 키워드 인자가 `OrderedDict` 대신 일반 `dict`에 팩되도록 합니다.

**예측 (Prognosis):** 성능이 일부 특이한 경우에 현저하게 다르거나, 다른 하위 호환성 문제가 있어 달리 해결할 수 없는 경우에만 필요할 것입니다.

#### Opt-in Decorator

현재 상태는 변경되지 않을 것입니다. 대신 Python은 `functools`에 데코레이터를 제공하여 장식된 함수가 정렬된 키워드 인자를 받도록 등록하거나 표시할 것입니다. 호출 시 함수를 확인하는 성능 오버헤드는 미미할 것입니다.

**예측 (Prognosis):** 유일한 실제 단점은 래퍼(wrapper) 정의에 `kwargs`를 사용하고 래핑된 함수 호출에 `kwargs` 언패킹을 사용하여 키워드 인자를 완벽하게 보존하려는 함수 래퍼 팩토리(예: `functools.partial` 및 많은 데코레이터)의 경우입니다. 각 래퍼를 개별적으로 업데이트해야 하지만, `functools.wraps()`가 이를 자동으로 수행하도록 하면 도움이 될 것입니다.

#### `__kworder__`

키워드 인자의 순서는 호출 시 별도로 리스트(list)에 저장될 것입니다. 이 리스트는 함수 로컬(locals)에서 `__kworder__`에 바인딩될 것입니다.

**예측 (Prognosis):** 이 역시 래퍼 사례를 복잡하게 만듭니다.

#### 더 빠른 반복을 가진 컴팩트 `dict` (Compact dict with faster iteration)

Raymond Hettinger는 `dict`에 삽입 순서를 보존하는(`dict`의 첫 번째 삭제 전까지) `dict` 구현 아이디어를 제시했습니다. 이는 `kwargs`에 완벽하게 적합할 것입니다.

**예측 (Prognosis):** 이 아이디어는 실현 가능성과 시간 프레임 모두에서 여전히 불확실합니다.

**참고:** Python 3.6에는 이제 이 `dict` 구현이 있습니다.

#### `***kwargs`

이는 `**kwargs`와 상호 배타적인 병렬로 함수 시그니처(signature)에 새로운 형식을 추가할 것입니다. 새로운 구문 `***kwargs` (별표 3개에 유의)는 `kwargs`가 키워드 인자의 순서를 보존해야 함을 나타낼 것입니다.

**예측 (Prognosis):** 새로운 문법은 가장 심각한 상황에서만 Python에 추가됩니다. 다른 사용 가능한 해결책이 있는 경우, 새로운 문법은 정당화될 수 없습니다. 더욱이, 모든 옵트인(opt-in) 해결책과 마찬가지로, 새로운 문법은 통과(pass-through) 사례를 복잡하게 만들 것입니다.

#### `annotations`

이것은 데코레이터 접근 방식의 변형입니다. 함수를 표시하기 위해 데코레이터를 사용하는 대신, ` **kwargs`에 함수 어노테이션(annotation)을 사용할 것입니다.

** 예측 (Prognosis): ** 통과 복잡성 외에도, 어노테이션은 Python 코어 개발에서 적극적으로 권장되지 않았습니다. 순서 보존을 위한 옵트인에 어노테이션을 사용하는 것은 다른 애플리케이션 수준의 어노테이션 사용과 충돌할 위험이 있습니다.

#### `dict.__order__`

`dict` 객체는 `__order__`라는 새로운 속성을 가질 것이며, 기본값은 `None`이고 `kwargs`의 경우 인터프리터는 위에서 `__kworder__`에 대해 설명한 것과 동일한 방식으로 이를 사용할 것입니다.

** 예측 (Prognosis): ** `kwargs` 성능에는 영향을 미치지 않지만, 변경 사항은 상당히 침해적(intrusive)일 것입니다 (Python은 `dict`를 많이 사용합니다). 또한 래퍼의 경우 인터프리터는 `__order__`를 보존하도록 주의해야 할 것입니다.

#### `KWArgsDict.__order__`

이것은 `dict.__order__` 아이디어와 동일하지만, `kwargs`는 `__order__` 속성을 제공하는 새로운 최소 `dict` 서브클래스의 인스턴스가 될 것입니다. `dict`는 변경되지 않을 것입니다.

** 예측 (Prognosis): ** 단순히 `OrderedDict`로 전환하는 것이 덜 복잡하고 더 직관적인 변경입니다.

### 감사 (Acknowledgements)

유용한 피드백을 제공해준 Andrew Barnert와 과거 모든 이메일 스레드 참가자들에게 감사드립니다.

### 참고 문헌 (References)

 https://peps.python.org/pep-0468/
 https://mail.python.org/pipermail/python-ideas/2014-April/027512.html
 https://mail.python.org/pipermail/python-ideas/2009-April/004163.html
 https://mail.python.org/pipermail/python-dev/2007-February/071310.html
 https://mail.python.org/pipermail/python-dev/2012-December/123028.html
 https://mail.python.org/pipermail/python-dev/2012-December/123105.html
 https://mail.python.org/pipermail/python-dev/2013-May/126327.html
 https://mail.python.org/pipermail/python-ideas/2009-April/004163.html
 https://mail.python.org/pipermail/python-dev/2013-May/126404.html
 http://bugs.python.org/issue16991
 https://mail.python.org/pipermail/python-dev/2012-December/123100.html

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 있습니다.

> ⚠️ ** 알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.