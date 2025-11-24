---
title: "[Rejected] PEP 3126 - Remove Implicit String Concatenation"
excerpt: "Python Enhancement Proposal 3126: 'Remove Implicit String Concatenation'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3126/
toc: true
toc_sticky: true
date: 2025-09-27 14:30:11+0900
last_modified_at: 2025-09-27 14:30:11+0900
published: true
---
> **원문 링크:** [PEP 3126 - Remove Implicit String Concatenation](https://peps.python.org/pep-3126/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 29-Apr-2007

PEP 3126 – 암시적 문자열 연결 제거 (Remove Implicit String Concatenation)

## 개요
이 문서는 Python 3000(Python 3의 초기 개발 단계 명칭)의 목표 중 하나인 불필요한 기능을 제거하여 언어를 단순화하는 데 기여하기 위해 작성되었습니다. Python은 C 언어에서 많은 파싱 규칙을 물려받았지만, 그 중 일부는 Python에 덜 유용하며 제거되어야 한다고 제안되었습니다.

PEP 3126은 리터럴(literal)의 인접성(adjacency)에만 기반한 암시적 문자열 연결(implicit string concatenation)을 제거할 것을 제안합니다.

**현재 (제안 전):**
```python
"abc" "def" == "abcdef"
```

**제안된 변경 후:**
개발자들은 문자열을 명시적으로 연결해야 합니다.
```python
"abc" + "def" == "abcdef"
```
또는 `join` 메서드를 사용할 수 있습니다.
```python
"".join(["abc", "def"]) == "abcdef"
```

## 상태: 거부됨 (Rejected)

이 PEP는 충분한 지지를 얻지 못했고, 제거하려는 기능이 그렇게 해롭지 않으며, 일부 사용 사례에서는 오히려 어려워질 수 있다는 이유로 거부되었습니다.

## 동기 (Motivation)
Python 3000의 목표 중 하나는 불필요한 기능을 제거하여 언어를 단순화하는 것입니다. 암시적 문자열 연결은 기존의 다른 기술들(`+` 연산자나 `"".join()`)을 사용하는 방향으로 제거되어야 합니다. 이는 문법(grammar)을 단순화하고 사용자가 Python에 대해 가지는 '머릿속 그림(mental picture)'을 단순화할 것입니다. 많은 현 Python 사용자들은 암시적 연결에 대해 알지 못하며, 아는 사용자 중 상당수는 이를 사용하지 않거나 의도적으로 피합니다. 이 기능을 알고 사용하는 사람들조차 암시적 연산자의 우선순위나 컴파일 시점/실행 시점 계산 조건에 대해 확신 있게 설명하기 어렵습니다.

## 문제점 (Problem)
암시적 문자열 연결은 겉보기보다 짧은 튜플(tuple)이나 리스트(list)를 초래하여 혼란스럽거나 심지어 조용한(silent) 오류를 유발할 수 있습니다.

**예시 1: `TypeError` 발생**
```python
def f(fmt, *args):
    print fmt % args

# 유효해 보이지만, 실제로는 "Bob"과 "Time for dinner"가 암시적으로 연결됩니다.
# f("User %s got a message %s", "Bob" "Time for dinner")
# Traceback (most recent call last):
#   ...
# TypeError: not enough arguments for format string
```
위 예시에서 `"Bob" "Time for dinner"`는 하나의 문자열 `"BobTime for dinner"`로 연결되어 `args` 튜플에 하나의 요소만 포함하게 됩니다. 따라서 포맷 문자열에 필요한 두 개의 인수가 제공되지 않아 `TypeError`가 발생합니다.

**예시 2: 조용한 오류 (Silent Error)**
```python
def g(arg1, arg2=None):
    pass # 실제로는 "arg1 on this linearg2 on this line", None으로 변환됨
g("arg1 on this line" "arg2 on this line")
```
이 경우, 두 문자열 리터럴이 암시적으로 연결되어 `g` 함수는 예상과 다른 단일 문자열 인수를 받게 됩니다. 이는 디버깅하기 어려운 조용한 오류를 야기할 수 있습니다.

**Jason Orendorff의 인용:**
Scons와 같은 빌드 시스템에서 파일명 리스트를 정의할 때 쉼표를 빼먹는 흔한 실수가 있습니다.
```python
sourceFiles = [
    'foo.c'
    'bar.c', # 쉼표 누락
    'q1000x.c'
]
```
이 경우 `'foo.cbar.c'` 파일을 찾을 수 없다는 오류가 발생하여 혼란을 줄 수 있습니다.

## 해결책 (Solution)
Python에서 문자열은 객체이며 `__add__` 연산자를 지원하므로, `+` 연산자를 사용하여 명시적으로 문자열을 연결할 수 있습니다.
```python
"abc" + "def"
```
리터럴의 경우, 이 덧셈 연산은 컴파일러에 의해 최적화될 수 있으며, CPython 컴파일러는 이미 그렇게 하고 있습니다.

다른 기존 대안으로는 여러 줄 문자열(triple-quoted strings)과 `join` 메서드가 있습니다.
```python
"""이 문자열은 여러 줄에 걸쳐 있습니다. 선행 공백을 제거하거나 재포맷하려면 Textwrap.dedent와 같은 것을 사용할 수 있습니다."""

>>> "".join(["empty", "string", "joiner"]) == "emptystringjoiner"
True
>>> " ".join(["space", "string", "joiner"]) == "space string joiner"
True
>>> "\n".join(["multiple", "lines"]) == "multiple\nlines" == ( """multiple
lines""") # 예시 오류: 원문 그대로 번역했지만, 실제로 """multiple\nlines"""와 일치하지 않습니다.
True
```

## 우려 사항 (Concerns)

### 연산자 우선순위 (Operator Precedence)
Guido van Rossum은 이 변경이 `%`와 같은 다른 문자열 연산자와의 몇 가지 엣지 케이스 때문에 PEP로 다루어져야 한다고 언급했습니다. (참고: `str %`는 PEP 3101 – Advanced String Formatting에 의해 제거될 수 있습니다.)

해결책은 괄호를 사용하여 우선순위를 명시하는 것입니다. 이는 현재도 사용 가능한 방법입니다.
```python
# 가장 명확하며, 현재 작동하고 계속 작동하며, 이미 최적화가 가능합니다.
("abc %s def" + "ghi") % var

# 현재 이미 작동합니다. 우선순위 때문에 최적화를 인식하기는 더 어렵지만, 의미는 변하지 않습니다.
"abc" + "def %s ghi" % var
```

**과거와 미래의 변경:**
```python
# 모듈러스(%)가 덧셈(+)보다 우선순위가 높기 때문에 이미 실패합니다.
# ("abc %s def" + "ghi" % var)

# 인접성(adjacency)이 모듈러스보다 우선순위가 높기 때문에 현재만 작동합니다.
# 이 기능은 더 이상 사용할 수 없게 될 것입니다.
# "abc %s" "def" % var

# 따라서 2 to 3 변환기는 이를 (이미 유효한):
# ("abc %s" + "def") % var
# 로 자동으로 대체할 수 있습니다.
```

### 긴 명령 (Long Commands)
SQL 쿼리와 같이 긴 명령을 가독성 있게 작성하는 데 암시적 연결이 사용되곤 했습니다.
```python
rows = self.executesql("select cities.city, state, country"
                       " from cities, venues, events, addresses"
                       " where cities.city like %s"
                       " and events.active = 1"
                       " and venues.address = addresses.id"
                       " and addresses.city = cities.id"
                       " and events.venue = venues.id", (city,))
```
대안으로는 여러 줄 문자열(triple-quoted strings), `+` 연산자, 그리고 `.join` 메서드가 있습니다.
```python
query="""select cities.city, state, country from cities, venues, events, addresses where cities.city like %s and events.active = 1" and venues.address = addresses.id and addresses.city = cities.id and events.venue = venues.id"""

query=( "select cities.city, state, country"
      + " from cities, venues, events, addresses"
      + " where cities.city like %s"
      + " and events.active = 1"
      + " and venues.address = addresses.id"
      + " and addresses.city = cities.id"
      + " and events.venue = venues.id"
      )

query="\n".join(["select cities.city, state, country",
                 " from cities, venues, events, addresses",
                 " where cities.city like %s",
                 " and events.active = 1",
                 " and venues.address = addresses.id",
                 " and addresses.city = cities.id",
                 " and events.venue = venues.id"])

# 위의 어떤 쿼리 문자열도 원래 방식과 동일하게 인라인(inline)으로 사용할 수 있습니다.
rows = self.executesql(query, (city,))
```

### 정규 표현식 (Regular Expressions)
복잡한 정규 표현식은 각 구성 요소가 다른 줄에 있고 주석이 뒤따르는 여러 암시적으로 연결된 문자열로 작성되기도 했습니다. `+` 연산자를 삽입할 수 있지만, 이는 정규 표현식의 가독성을 저해할 수 있습니다. 대안으로는 `re.VERBOSE` 옵션을 사용하거나 `+=`를 사용하여 정규 표현식을 구성하는 방법이 있습니다.
```python
# 암시적 연결에 의존하는 기존 관용구
r = ('a{20}' # Twenty A's
     'b{5}'  # Followed by Five B's
    )

# 기계적 대체 (이미 작동함)
r = ('a{20}' + # Twenty A's
     'b{5}'  # Followed by Five B's
    )

# re.VERBOSE 플래그와 함께 컴파일되는 여러 줄 문자열 (이미 작동함)
r = '''a{20} # Twenty A's
b{5} # Followed by Five B's
'''

# +=를 사용하여 구성 (이미 작동함)
r = 'a{20}' # Twenty A's
r += 'b{5}' # Followed by Five B's
```

### 국제화 (Internationalization)
`xgettext`와 같은 일부 국제화 도구는 암시적 연결에 대해 특별히 처리되어 왔지만, Python의 명시적 연결에 대해서는 그렇지 않습니다.
이러한 도구들은 (이미 유효한) `_("some string" + " and more of it")`와 같은 형태의 문자열을 추출하지 못하지만, `_("some string" " and more of it")`와 같은 형태에 대해서는 특별한 처리 기능이 있는 경우가 많습니다.

매우 긴 줄을 사용하거나 여러 줄 문자열을 사용하는 방법도 있지만, 이러한 해결책은 코드의 가독성을 일부 희생합니다.
```python
# 특정 길이 이상의 줄은 불편합니다.
_("some string and more of it")

# 공백 변경은 이상적이지 않습니다.
_("""Some string and more of it""")
_("""Some string
and more of it""")
_("Some string \
and more of it")
```
이 문제에 대한 좋은 단기적인 해결책은 없다고 언급되었습니다.

## 전환 (Transition)
제안된 새로운 구성(명시적 `+` 연산이나 `join` 메서드 사용)은 현재 Python에서도 유효하며 즉시 사용할 수 있습니다.
2 to 3 변환기(translator)는 `("str1" "str2")`와 같은 형태를 `("str1" + "str2")`로, `("line1" #comment "line2")`와 같은 형태를 `("line1" + #comments "line2")`로 기계적으로 변경하도록 만들 수 있습니다. 사용자가 다른 관용구를 사용하려면 Python 2에서도 이미 유효하므로, 변환기를 패치하는 대신 원본 소스에서 직접 편집할 수 있습니다.

## 열린 문제 (Open Issues)
외부 텍스트 추출 도구, 특히 `xgettext`를 더 잘 지원할 수 있는 방법이 있는가?

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.