---
title: "[Withdrawn] PEP 469 - Migration of dict iteration code to Python 3"
excerpt: "Python Enhancement Proposal 469: 'Migration of dict iteration code to Python 3'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/469/
toc: true
toc_sticky: true
date: 2025-09-26 22:15:48+0900
last_modified_at: 2025-09-26 22:15:48+0900
published: true
---
> **원문 링크:** [PEP 469 - Migration of dict iteration code to Python 3](https://peps.python.org/pep-0469/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 18-Apr-2014

## PEP 469 – Python 3로의 `dict` 순회(Iteration) 코드 마이그레이션

**저자:** Alyssa Coghlan
**상태:** 철회됨 (Withdrawn)
**유형:** Standards Track
**작성일:** 2014년 4월 18일
**Python 버전:** 3.5

### 초록 (Abstract)

Python 3에서는 PEP 3106을 통해 내장 `dict` 및 매핑(mapping) API의 설계가 변경되었습니다. 이는 Python 2의 리스트 기반 및 이터레이터(iterator) 기반 API를 통합하고 메모리 효율적인 `set` 및 `multiset` 뷰(view) 기반 API로 대체한 것입니다. 이 새로운 `dict` 순회 방식은 Python 2.7의 `dict` 타입에도 새로운 순회 메서드 집합으로 추가되었습니다.

결과적으로, 애플리케이션이 Python 3로 전환될 때 마이그레이션해야 할 세 가지 종류의 `dict` 순회 방식이 존재합니다:

1.  **가변 스냅샷(mutable snapshots)으로서의 리스트:** `d.items()` → `list(d.items())`
2.  **이터레이터 객체(Iterator objects):** `d.iteritems()` → `iter(d.items())`
3.  **셋(set) 기반 동적 뷰(dynamic views):** `d.viewitems()` → `d.items()`

현재 Python 2의 모든 `dict` 순회 코드를 Python 2와 Python 3의 공통 부분집합(common subset)으로 안정적으로 변환하는 방법에 대한 널리 합의된 최선의 방법은 없으며, 특히 이식된 코드의 테스트 커버리지(test coverage)가 제한적일 때 더욱 그렇습니다. 이 PEP는 Python 2 순회 API에 접근할 수 있는 다양한 방법을 검토하고, Python 2.6+ 및 Python 3.0+의 공통 부분집합을 통해 해당 코드를 Python 3로 마이그레이션하는 데 사용할 수 있는 옵션들을 살펴봅니다.

또한 이 PEP는 Python 3.5에 추가될 수 있는 기능들이 있는지, 그리고 이전 버전 지원에 대한 걱정 없이 Python 3로 전환하는 애플리케이션 코드의 전환 프로세스를 완화할 수 있는지에 대한 질문도 고려합니다.

### PEP 철회 (PEP Withdrawal)

이 PEP의 두 번째 초안을 작성하면서, Python 2/3 혼합 매핑 코드의 가독성은 Python 3.5+에 변경사항을 추가하는 것보다 더 나은 헬퍼 함수(helper functions)를 통해 향상될 수 있다는 결론에 도달했습니다. 이 PEP의 주요 가치는 Python 2에서 Python 3로 매핑 순회 코드를 마이그레이션하는 권장 접근 방식에 대한 명확한 기록을 제공하고, 두 버전을 모두 지원하는 혼합 코드를 작성할 때 가독성과 유지보수성을 유지하는 방법을 제안하는 것입니다.

특히, 혼합 코드에서는 매핑 순회 메서드를 직접 호출하는 것을 피하고, 가능한 경우 내장 함수(builtin functions)에 의존하며, 순수한 Python 3 코드에서는 내장 함수와 매핑 메서드의 간단한 조합이 될 수 있지만 Python 2에서 정확히 동일한 의미를 얻기 위해 약간 다르게 처리해야 하는 경우를 위한 추가 헬퍼 함수를 사용할 것을 권장합니다. `pylint`와 같은 정적 코드 검사기(static code checkers)는 혼합 코드베이스에서 매핑 순회 메서드의 직접 사용에 대한 선택적 경고를 통해 확장될 수 있습니다.

### 매핑 순회 모델 (Mapping iteration models)

Python 2.7은 `dict` 인스턴스에서 키(keys), 값(values), 아이템(items)을 추출하기 위한 세 가지 메서드 집합을 제공하며, 이는 `dict` 타입의 18개 공개 메서드 중 9개를 차지합니다. Python 3에서는 `has_key` 메서드도 제거되어 11개 공개 메서드 중 3개로 합리화되었습니다.

#### 1. 가변 스냅샷(Lists as mutable snapshots)

이는 세 가지 `dict` 순회 스타일 중 가장 오래된 것으로, Python 2의 `d.keys()`, `d.values()`, `d.items()` 메서드에 의해 구현됩니다. 이 메서드들은 모두 메서드가 호출된 시점의 매핑 상태 스냅샷인 리스트를 반환합니다. 이는 다음과 같은 결과를 초래합니다:

*   원본 객체는 스냅샷의 순회에 영향을 주지 않고 자유롭게 변경될 수 있습니다.
*   스냅샷은 원본 객체와 독립적으로 수정될 수 있습니다.
*   스냅샷은 원본 매핑의 크기에 비례하는 메모리를 소비합니다.

Python 3에서 이러한 작업의 의미론적 동등물은 `list(d.keys())`, `list(d.values())`, `list(d.items())` 입니다.

#### 2. 이터레이터 객체 (Iterator objects)

Python 2.2에서 `dict` 객체는 당시 새로 도입된 이터레이터 프로토콜(iterator protocol)을 지원하게 되어, 딕셔너리에 저장된 키를 직접 순회할 수 있게 되었고, 한 번에 하나의 항목씩 딕셔너리 내용을 순회하기 위해 리스트를 만들 필요가 없어졌습니다. `iter(d)`는 키에 대한 이터레이터 객체에 직접 접근을 제공합니다.

Python 2는 `iter(d)`와 본질적으로 동의어인 `d.iterkeys()` 메서드와 `d.itervalues()`, `d.iteritems()` 메서드를 제공합니다. 이 이터레이터들은 기본 객체의 "라이브 뷰(live views)"를 제공하므로, 순회 중에 기본 객체의 키 집합이 변경되면 실패할 수 있습니다:

```python
>>> d = dict(a=1)
>>> for k in d:
...     del d[k]
...
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
RuntimeError: dictionary changed size during iteration
```

이터레이터로서, 이러한 객체에 대한 순회는 한 번만 수행됩니다. 이터레이터가 소진되면 다시 순회하려면 원본 매핑으로 돌아가야 합니다.

Python 3에서 매핑에 대한 직접 순회는 Python 2와 동일하게 작동합니다. 메서드 기반 동등물은 없으며, Python 3에서 `d.itervalues()` 및 `d.iteritems()`의 의미론적 동등물은 각각 `iter(d.values())` 및 `iter(d.items())` 입니다. `six` 및 `future.utils` 호환성 모듈은 Python 2와 3 모두에서 효율적인 이터레이터 의미론을 제공하는 `iterkeys()`, `itervalues()`, `iteritems()` 헬퍼 함수도 제공합니다.

#### 3. 셋 기반 동적 뷰 (Set based dynamic views)

Python 3에서 메서드 기반 API로 제공되는 모델은 셋 기반 동적 뷰(technically `values()` 뷰의 경우 `multisets`)입니다. Python 3에서 `d.keys()`, `d.values()`, `d.items()`에 의해 반환되는 객체는 Python 2에서처럼 현재 상태의 전체 스냅샷을 찍는 대신, 기본 객체의 현재 상태에 대한 "라이브 뷰"를 제공합니다. 이 변경은 많은 상황에서 안전하지만, 직접 순회 API와 마찬가지로 순회 중에 키를 추가하거나 제거하는 것을 피해야 다음과 같은 오류를 방지할 수 있습니다:

```python
>>> d = dict(a=1)
>>> for k, v in d.items():
...     del d[k]
...
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
RuntimeError: dictionary changed size during iteration
```

순회 API와 달리, 이러한 객체는 이터레이터가 아닌 이터러블(iterables)입니다. 즉, 여러 번 순회할 수 있으며, 매번 전체 기본 매핑을 순회합니다. 이러한 의미론은 Python 2.7에서도 `d.viewkeys()`, `d.viewvalues()`, `d.viewitems()` 메서드로 사용할 수 있습니다. `future.utils` 호환성 모듈은 Python 2.7 또는 Python 3.x에서 실행될 때 `viewkeys()`, `viewvalues()`, `viewitems()` 헬퍼 함수도 제공합니다.

### Python 3로 직접 마이그레이션 (Migrating directly to Python 3)

`2to3` 마이그레이션 도구는 위에서 설명한 의미론적 동등성에 따라 Python 3로의 직접 마이그레이션을 처리합니다:

*   `d.keys()` → `list(d.keys())`
*   `d.values()` → `list(d.values())`
*   `d.items()` → `list(d.items())`
*   `d.iterkeys()` → `iter(d.keys())`
*   `d.itervalues()` → `iter(d.values())`
*   `d.iteritems()` → `iter(d.items())`
*   `d.viewkeys()` → `d.keys()`
*   `d.viewvalues()` → `d.values()`
*   `d.viewitems()` → `d.items()`

순회를 위한 9개의 개별 매핑 메서드 대신, 이제 3개의 뷰 메서드만 있으며, 이는 Python 2.7에서 `dict` 메서드로 사용할 수 있는 모든 동작을 다루기 위해 두 가지 관련 내장 함수와 간단한 방식으로 결합됩니다. 많은 경우에 `d.keys()`는 단순히 `d`로 대체될 수 있지만, `2to3` 마이그레이션 도구는 이러한 대체를 시도하지 않습니다. 또한 `2to3` 마이그레이션 도구는 이러한 객체에 대한 바인딩된(bound) 또는 바인딩되지 않은(unbound) 메서드 참조를 마이그레이션하는 데 자동 지원을 제공하지 않습니다. API가 즉시 호출되는 경우에만 변환을 자동화합니다.

### Python 2와 3의 공통 부분집합으로 마이그레이션 (Migrating to the common subset of Python 2 and 3)

Python 2와 3의 공통 부분집합으로 마이그레이션할 때는 위 변환들이 일반적으로 적절하지 않습니다. 왜냐하면 이들 모두 Python 2에서 중복 리스트를 생성하거나, 적어도 일부 경우에 예상치 못한 다른 의미론을 가지거나, 또는 둘 다 발생하기 때문입니다.

Python 2와 3의 공통 부분집합에서 실행되는 대부분의 코드가 최소한 Python 2.6까지 지원하기 때문에, 매핑 순회 작업 변환에 권장되는 현재 접근 방식은 매핑 값과 매핑 아이템 튜플(item tuples)에 대한 효율적인 순회를 위한 두 가지 헬퍼 함수에 의존합니다:

*   `d.keys()` → `list(d)`
*   `d.values()` → `list(itervalues(d))`
*   `d.items()` → `list(iteritems(d))`
*   `d.iterkeys()` → `iter(d)`
*   `d.itervalues()` → `itervalues(d)`
*   `d.iteritems()` → `iteritems(d)`

`six`와 `future.utils` 모두 `itervalues()`와 `iteritems()`의 적절한 정의를 제공합니다 (본질적으로 중복되는 `iterkeys()` 정의와 함께). 사용자 정의 호환성 모듈에서 이러한 함수를 직접 정의하는 것도 비교적 간단합니다:

```python
try:
    dict.iteritems
except AttributeError:
    # Python 3
    def itervalues(d):
        return iter(d.values())
    def iteritems(d):
        return iter(d.items())
else:
    # Python 2
    def itervalues(d):
        return d.itervalues()
    def iteritems(d):
        return d.iteritems()
```

현재 가장 큰 가독성 손실은 Python 2에서 기본값이었던 리스트 기반 스냅샷이 실제로 필요한 코드를 변환할 때 발생합니다. 이 가독성 손실은 `listvalues` 및 `listitems` 헬퍼 함수를 제공함으로써 완화될 수 있으며, 영향을 받는 변환을 다음과 같이 단순화할 수 있습니다:

*   `d.values()` → `listvalues(d)`
*   `d.items()` → `listitems(d)`

해당 호환성 함수 정의는 이터레이터 counterpart만큼 간단합니다:

```python
try:
    dict.iteritems
except AttributeError:
    # Python 3
    def listvalues(d):
        return list(d.values())
    def listitems(d):
        return list(d.items())
else:
    # Python 2
    def listvalues(d):
        return d.values()
    def listitems(d):
        return d.items()
```

이러한 확장된 호환성 함수 집합을 사용하면 Python 2 코드는 "관용적인(idiomatic)" 혼합 2/3 코드로 다음과 같이 변환됩니다:

*   `d.keys()` → `list(d)`
*   `d.values()` → `listvalues(d)`
*   `d.items()` → `listitems(d)`
*   `d.iterkeys()` → `iter(d)`
*   `d.itervalues()` → `itervalues(d)`
*   `d.iteritems()` → `iteritems(d)`

이는 매핑 메서드와 내장 함수를 직접 사용하는 관용적인 순수 Python 3 코드와 가독성 측면에서 잘 비교됩니다:

*   `d.keys()` → `list(d)`
*   `d.values()` → `list(d.values())`
*   `d.items()` → `list(d.items())`
*   `d.iterkeys()` → `iter(d)`
*   `d.itervalues()` → `iter(d.values())`
*   `d.iteritems()` → `iter(d.items())`

이 접근 방식을 사용할 때, 혼합 코드는 매핑 메서드를 직접 호출하지 않고 항상 내장 함수나 헬퍼 함수를 호출하여 Python 2와 Python 3 모두에서 정확히 동일한 의미론을 보장한다는 점도 주목할 만합니다.

### Python 3에서 Python 2.7 공통 부분집합으로 마이그레이션 (Migrating from Python 3 to the common subset with Python 2.7)

대부분의 마이그레이션은 현재 Python 2에서 직접 Python 3로 또는 Python 2와 Python 3의 공통 부분집합으로 이루어지지만, Python 3에서 시작하여 사용자 요구 또는 Python 3에서 아직 사용할 수 없는 Python 2 라이브러리(Python 3로 포팅하거나 Python 3 호환 대체품을 만드는 것이 간단한 작업이 아님)에 접근하기 위해 나중에 Python 2 지원을 추가하는 새로운 프로젝트의 마이그레이션도 있습니다.

이러한 경우, Python 2.7 호환성만으로 충분한 경우가 많으며, `future.utils`가 제공하는 2.7+ 전용 뷰 기반 헬퍼 함수를 사용하면 Python 3 매핑 뷰 메서드에 대한 직접 접근을 Python 2.7과 Python 3 모두와 호환되는 코드로 대체할 수 있습니다 (이것은 변환 차트에서 Python 3 코드가 왼쪽에 있는 유일한 마이그레이션 차트입니다):

*   `d.keys()` → `viewkeys(d)`
*   `d.values()` → `viewvalues(d)`
*   `d.items()` → `viewitems(d)`
*   `list(d.keys())` → `list(d)`
*   `list(d.values())` → `listvalues(d)`
*   `list(d.items())` → `listitems(d)`
*   `iter(d.keys())` → `iter(d)`
*   `iter(d.values())` → `itervalues(d)`
*   `iter(d.items())` → `iteritems(d)`

Python 2에서 공통 부분집합으로의 마이그레이션과 마찬가지로, 혼합 코드가 매핑 메서드를 직접 호출하지 않고 내장 함수와 헬퍼 메서드만 호출하며, 후자가 Python 2와 Python 3 간의 의미론적 차이를 해결한다는 점에 유의하십시오.

### Python 3.5+에 대한 가능한 변경사항 (Possible changes to Python 3.5+)

기존 Python 2 코드를 Python 3로 마이그레이션하는 데 잠재적으로 도움이 될 수 있는 주요 제안은 Python 3 매핑 API에 일부 또는 모든 대체 순회 API를 복원하는 것입니다. 특히, 이 PEP의 초기 초안은 Python 2와 Python 3.5+의 공통 부분집합으로 마이그레이션할 때 다음 변환을 가능하게 할 것을 제안했습니다:

*   `d.keys()` → `list(d)`
*   `d.values()` → `list(d.itervalues())`
*   `d.items()` → `list(d.iteritems())`
*   `d.iterkeys()` → `d.iterkeys()`
*   `d.itervalues()` → `d.itervalues()`
*   `d.iteritems()` → `d.iteritems()`

이러한 메서드를 복원함으로써 Python 3에 추가되는 언어 복잡성을 완화할 수 있는 방법으로는 즉시 사용 중단(deprecate)하는 것과 `dir()` 함수에서 숨기거나 (또는 `pydoc`이 함수 사용 중단을 인식하도록 정의하는 방법까지) 포함되었습니다. 그러나 리스트 출력이 실제로 필요한 경우, 해당 제안의 최종 결과는 적절하게 정의된 헬퍼 함수보다 가독성이 떨어지며, 이터레이터 버전의 함수 및 메서드 형식은 가독성 관점에서 거의 동일합니다. 따라서, 중요한 것을 놓치지 않았다면, `listvalues()` 및 `listitems()` 헬퍼 함수는 Python 3.5+ 매핑 API에 추가할 수 있는 어떤 것보다 혼합 코드의 가독성을 향상시킬 것이며, Python 3 자체의 복잡성에 장기적인 영향을 미치지 않을 것으로 보입니다.

### 논의 (Discussion)

Python 3 마이그레이션이 5년이 지났음에도 불구하고 사용자들이 `dict` API 변경을 여전히 마이그레이션에 대한 중요한 장벽으로 여기고 있다는 사실은 이전에 권장되었던 접근 방식에 문제가 있음을 시사합니다. 이 PEP는 이러한 문제들을 탐색하고 이전의 조언(이러한 조언이 존재했다면)이 문제가 될 수 있는 경우를 격리하려고 시도합니다.

Twisted 개발자들의 피드백을 바탕으로 한 저의 평가에 따르면, `d.keys()`, `d.values()`, `d.items()`를 혼합 코드에서 사용하려고 할 때 문제가 발생할 가능성이 가장 큽니다. 표면적으로는 의미론적 차이를 무시해도 안전한 경우가 있을 것처럼 보이지만, 실제로는 "가변 스냅샷"에서 "동적 뷰"로의 변경은 충분히 중요하여 혼합 코드에는 리스트 또는 이터레이터 의미론의 사용을 강제하고, 뷰 의미론의 사용은 순수 Python 3 코드에 맡기는 것이 더 나을 것입니다.

이 접근 방식은 `2to3`가 순수 Python 3 코드를 대상으로 자동으로 변환하는 것처럼, Python 2와 Python 3의 공통 부분집합을 대상으로 하는 코드 현대화 스크립트에서 자동화할 수 있을 만큼 충분히 간단하고 안전한 규칙을 생성합니다.

### 감사 (Acknowledgements)

PyCon에서 Twisted 스프린트 테이블에 있던 분들께 이 아이디어(및 다른 여러 주제)에 대한 매우 활발한 토론에 감사드립니다. 특히 상황이 너무 격해졌을 때 중재자 역할을 해주신 Hynek Schlawack님께 감사드립니다. 이메일 피드백을 주신 JP Calderone과 Itamar Turner-Trauring, 그리고 PEP 초기 버전의 python-dev 검토에 참여해주신 분들께도 감사드립니다.

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)으로 지정되었습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.