---
title: "[Rejected] PEP 473 - Adding structured data to built-in exceptions"
excerpt: "Python Enhancement Proposal 473: 'Adding structured data to built-in exceptions'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/473/
toc: true
toc_sticky: true
date: 2025-09-26 22:19:47+0900
last_modified_at: 2025-09-26 22:19:47+0900
published: true
---
> **원문 링크:** [PEP 473 - Adding structured data to built-in exceptions](https://peps.python.org/pep-0473/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 29-Mar-2014

## PEP 473 – 내장 예외에 구조화된 데이터 추가

*   **작성자:** Sebastian Kreft <skreft at deezer.com>
*   **상태:** Rejected (거부됨)
*   **유형:** Standards Track
*   **생성일:** 2014년 3월 29일

---

### 요약 (Abstract)

`AttributeError`, `IndexError`, `KeyError`, `LookupError`, `NameError`, `TypeError`, `ValueError`와 같은 예외(Exception)들은 프로그래머가 디버깅하고 예외 발생 원인을 더 잘 이해하는 데 필요한 모든 정보를 제공하지 않습니다. 또한, 일부 경우 메시지 형식이 약간씩 달라 도구가 문제를 진단하기 위한 추가 정보를 자동으로 제공하기 매우 어렵습니다. 전자의 문제를 해결하고 후자의 기반을 마련하기 위해, 이러한 예외들이 문제가 된 엔티티(offending entity)와 영향을 받은 엔티티(affected entity)를 모두 포함하도록 확장할 것을 제안합니다.

### 배경 (Rationale)

이 PEP가 해결하고자 하는 주요 문제는 현재 오류 메시지가 충분히 명확하지 않고 예외 해결에 필요한 핵심 정보가 부족하다는 점입니다. 또한, 오류 메시지에 포함된 정보가 항상 동일한 형식이 아니므로, 서드파티 라이브러리가 오류에 대한 자동 진단을 제공하기 매우 어렵습니다.

이러한 자동화된 도구는 예를 들어 오타를 감지하거나 추가 디버그 정보를 표시하거나 로깅할 수 있습니다. 이는 테스트 실행 시나 장기 실행 애플리케이션에서 특히 유용할 수 있습니다.

이론적으로 이러한 라이브러리를 갖는 것이 가능하지만, 목표를 달성하기 위해 해킹(hacks)에 의존해야 합니다. 한 가지 예시는 `python-improved-exceptions` 입니다. 이 라이브러리는 바이트코드(byte-code)를 수정하여 잠재적으로 흥미로운 객체에 대한 참조를 유지하고, 오류 메시지를 파싱(parse)하여 타입(types)이나 이름(names)과 같은 정보를 추출합니다. 안타깝게도 이러한 접근 방식은 매우 취약하며 이식성이 없습니다.

유사한 제안이 `ImportError`에 대해 구현되었으며, 같은 방식으로 이 아이디어는 지지를 받았습니다. 또한, 거의 10년 전 Guido는에서 `KeyError`, `AttributeError`, `NameError`, `IndexError`와 같은 예외에서 영향을 받는 객체에 접근할 수 있는 깔끔한 API를 요청했습니다. 유사한 문제 및 제안 아이디어는 지난 한 해 동안 작성되었습니다. 다른 문제들도 생성되었지만, 지지를 받았음에도 불구하고 결국 포기되었습니다. 생성된 문제에 대한 참조는 다음과 같습니다:

*   `AttributeError`:,,,,
*   `IndexError`:,,
*   `KeyError`:,,
*   `LookupError`:
*   `NameError`:,,
*   `TypeError`:
*   `ValueError`:

개발을 진행하고 정보와 논의를 중앙 집중화하기 위해, 이 PEP는 위의 모든 논의와 아이디어를 요약하는 메타 이슈(meta-issue)가 되는 것을 목표로 합니다.

### 예시 (Examples)

#### `IndexError`

오류 메시지는 리스트의 길이(length)나 사용된 인덱스(index)를 참조하지 않습니다.

```python
a = [1, 2, 3, 4, 5]
a[5]
# IndexError: list index out of range
```

#### `KeyError`

관례적으로 키(key)는 오류 인자(argument)의 첫 번째 요소이지만, 영향을 받은 딕셔너리(dictionary)에 대한 다른 정보(키 타입, 크기 등)는 없습니다.

```python
b = {'foo': 1}
b['fo']
# KeyError: 'fo'
```

#### `AttributeError`

객체(object)의 타입(type)과 문제가 된 어트리뷰트(attribute)는 오류 메시지의 일부입니다. 하지만, 다른 형식들이 존재하며 정보가 항상 사용 가능한 것은 아닙니다. 더욱이, 객체 타입이 일부 경우 유용하더라도, Python의 동적인 특성을 고려할 때 객체 자체에 대한 참조가 훨씬 더 유용할 것입니다. 또한, 타입에 대한 참조는 완전히 정규화(fully qualified)되지 않았으며, 일부 경우 타입이 너무 일반적이어서 유용한 정보를 제공하기 어렵습니다. 예를 들어, 모듈(module)의 어트리뷰트에 접근하는 경우입니다.

```python
c = object()
c.foo
# AttributeError: 'object' object has no attribute 'foo'

import string
string.foo
# AttributeError: 'module' object has no attribute 'foo'

a = string.Formatter()
a.foo
# AttributeError: 'Formatter' object has no attribute 'foo'
```

#### `NameError`

오류 메시지는 일반적으로 이름(name)을 제공합니다.

```python
foo = 1
fo
# NameError: global name 'fo' is not defined
```

#### 기타 경우 (Other Cases)

대상 객체가 다른 표현식의 결과일 때 디버깅이 훨씬 더 어려워집니다. 예를 들어:

```python
a[b[c[0]]]
```

이 문제는 또한 opcode가 라인 번호 정보만 가지고 오프셋(offset)은 가지고 있지 않다는 사실과 관련이 있습니다. 이 제안은 이 경우에 도움이 되겠지만, 오프셋을 갖는 것만큼은 아닙니다.

### 제안 (Proposal)

`AttributeError`, `IndexError`, `KeyError`, `LookupError`, `NameError`, `TypeError`, `ValueError` 예외에 다음을 추가하여 확장할 것을 제안합니다:

*   `AttributeError`: `target` w, `attribute`
*   `IndexError`: `target` w, `key` w, `index` (key의 별칭(alias)으로)
*   `KeyError`: `target` w, `key` w
*   `LookupError`: `target` w, `key` w
*   `NameError`: `name`, `scope`?
*   `TypeError`: `unexpected_type`
*   `ValueError`: `unexpected_value` w

위첨자 'w'가 있는 어트리뷰트는 메모리 순환(memory cycles)을 방지하기 위해 `weak references`가 필요할 수 있습니다. 그러나 R. David Murray가 언급했듯이, 이는 불필요한 추가 복잡성을 더할 수 있습니다. 특히 내장(builtin) 타입은 `weak reference`를 지원하지 않기 때문에 더욱 그렇습니다.

(TODO(skreft): 코너 케이스 예시를 추가하여 확장.)

하위 호환성(backwards compatible)을 유지하기 위해 이러한 새로운 어트리뷰트(attribute)들은 선택 사항(optional)이며 키워드 전용(keyword only)으로 제공될 것입니다.

이 정보를 단순히 오류 메시지를 개선하는 것보다 추가하는 것을 제안하는 이유는 전자가 새로운 디버깅 프레임워크(framework) 및 도구를 허용하고, 미래에는 지연 생성(lazy generated) 메시지로 전환할 수 있기 때문입니다. 생성된 메시지는에서 논의되었지만, 현재 구현되지는 않았습니다. 이는 일부 리소스(resources)를 절약할 뿐만 아니라 메시지를 통일시킬 것입니다.

그런 다음 `stdlib` (표준 라이브러리)는 이러한 새로운 어트리뷰트를 사용하기 시작하도록 점진적으로 변경될 것입니다.

### 잠재적 활용 (Potential Uses)

자동화된 도구는 예를 들어 객체 내에서 유사한 키를 검색하여 다음과 같은 내용을 표시할 수 있습니다.

```python
a = {'foo': 1}
a['fo']
# KeyError: 'fo'. Did you mean 'foo'?

foo = 1
fo
# NameError: global name 'fo' is not defined. Did you mean 'foo'?
```

`TestRunner`가 표시할 수 있는 출력에 대해서는을 참조하세요.

### 성능 (Performance)

이러한 새로운 어트리뷰트를 채우는 데는 이미 사용 가능한 데이터를 가진 두 개의 추가 매개변수(parameters)만 필요하므로 영향은 미미할 것입니다. 그러나 다음 패턴이 이미 널리 퍼져 있으므로 `KeyError`에 대해서는 특별한 주의가 필요할 수 있습니다.

```python
try:
    a[foo] = a[foo] + 1
except:
    a[foo] = 0
```

또한, 이러한 객체들을 오류 자체에 저장하면에서 논의된 바와 같이 오류 메시지의 지연 생성(lazy generation)이 가능해집니다.

### 참조 (References)

*   Python Exceptions Improved (https://www.github.com/sk-/python-exceptions-improved)
*   ImportError needs attributes for module and file name (http://bugs.python.org/issue1559549)
*   Enhance exceptions by attaching some more information to them (https://mail.python.org/pipermail/python-ideas/2014-February/025601.html)
*   Specificity in AttributeError (https://mail.python.org/pipermail/python-ideas/2013-April/020308.html)
*   Add an 'attr' attribute to AttributeError (http://bugs.python.org/issue18156)
*   Add index attribute to IndexError (http://bugs.python.org/issue18162)
*   Add a 'key' attribute to KeyError (http://bugs.python.org/issue18163)
*   Add 'unexpected_type' to TypeError (http://bugs.python.org/issue18165)
*   'value' attribute for ValueError (http://bugs.python.org/issue18166)
*   making builtin exceptions more informative (http://bugs.python.org/issue1182143)
*   LookupError etc. need API to get the key (http://bugs.python.org/issue614557)
*   weakref - Weak References (https://docs.python.org/3/library/weakref.html)
*   Message by R. David Murray: Weak refs on exceptions? (http://bugs.python.org/issue18163#msg190791)

### 저작권 (Copyright)

이 문서는 공용 도메인(public domain)으로 지정되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.