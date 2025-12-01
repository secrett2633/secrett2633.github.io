---
title: "[Active] PEP 290 - Code Migration and Modernization"
excerpt: "Python Enhancement Proposal 290: 'Code Migration and Modernization'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/290/
toc: true
toc_sticky: true
date: 2025-09-26 18:00:45+0900
last_modified_at: 2025-09-26 18:00:45+0900
published: true
---
> **원문 링크:** [PEP 290 - Code Migration and Modernization](https://peps.python.org/pep-0290/)
>
> **상태:** Active | **유형:** Informational | **작성일:** 06-Jun-2002

## PEP 290 – 코드 마이그레이션 및 현대화

*   **작성자:** Raymond Hettinger <python at rcn.com>
*   **상태:** Active (활성)
*   **유형:** Informational (정보성)
*   **생성일:** 2002년 6월 6일
*   **히스토리:** (없음)

---

### 목차

*   [요약 (Abstract)](#요약-abstract)
*   [배경 (Rationale)](#배경-rationale)
*   [새로운 항목을 위한 지침 (Guidelines for New Entries)](#새로운-항목을-위한-지침-guidelines-for-new-entries)
*   [마이그레이션 이슈 (Migration Issues)](#마이그레이션-이슈-migration-issues)
    *   [비교 연산자는 0 또는 1을 생성하는 단축키가 아닙니다 (Comparison Operators Not a Shortcut for Producing 0 or 1)](#비교-연산자는-0-또는-1을-생성하는-단축키가-아닙니다-comparison-operators-not-a-shortcut-for-producing-0-or-1)
*   [현대화 절차 (Modernization Procedures)](#현대화-절차-modernization-procedures)
    *   [Python 2.4 이상 (Python 2.4 or Later)](#python-24-이상-python-24-or-later)
        *   [리스트의 시작 부분에 삽입 및 제거 (Inserting and Popping at the Beginning of Lists)](#리스트의-시작-부분에-삽입-및-제거-inserting-and-popping-at-the-beginning-of-lists)
        *   [사용자 지정 정렬 단순화 (Simplifying Custom Sorts)](#사용자-지정-정렬-단순화-simplifying-custom-sorts)
        *   [람다(Lambda)의 일반적인 사용 대체 (Replacing Common Uses of Lambda)](#람다lambda의-일반적인-사용-대체-replacing-common-uses-of-lambda)
        *   [역방향 이터레이션 단순화 (Simplified Reverse Iteration)](#역방향-이터레이션-단순화-simplified-reverse-iteration)
    *   [Python 2.3 이상 (Python 2.3 or Later)](#python-23-이상-python-23-or-later)
        *   [문자열 멤버십 테스트 (Testing String Membership)](#문자열-멤버십-테스트-testing-string-membership)
        *   [`apply()`를 직접 함수 호출로 대체 (Replace apply() with a Direct Function Call)](#apply를-직접-함수-호출로-대체-replace-apply-with-a-direct-function-call)
    *   [Python 2.2 이상 (Python 2.2 or Later)](#python-22-이상-python-22-or-later)
        *   [딕셔너리 멤버십 테스트 (Testing Dictionary Membership)](#딕셔너리-멤버십-테스트-testing-dictionary-membership)
        *   [딕셔너리 순회 (Looping Over Dictionaries)](#딕셔너리-순회-looping-over-dictionaries)
        *   [`stat` 메서드 (stat Methods)](#stat-메서드-stat-methods)
        *   [`types` 모듈 의존성 줄이기 (Reduce Dependency on types Module)](#types-모듈-의존성-줄이기-reduce-dependency-on-types-module)
        *   [`__builtins__` 모듈과 충돌하는 변수 이름 피하기 (Avoid Variable Names that Clash with the __builtins__ Module)](#__builtins__-모듈과-충돌하는-변수-이름-피하기-avoid-variable-names-that-clash-with-the-__builtins__-module)
    *   [Python 2.1 이상 (Python 2.1 or Later)](#python-21-이상-python-21-or-later)
        *   [`whrandom` 모듈 사용 중단 (whrandom Module Deprecated)](#whrandom-모듈-사용-중단-whrandom-module-deprecated)
    *   [Python 2.0 이상 (Python 2.0 or Later)](#python-20-이상-python-20-or-later)
        *   [문자열 메서드 (String Methods)](#문자열-메서드-string-methods)
        *   [`startswith` 및 `endswith` 문자열 메서드 (startswith and endswith String Methods)](#startswith-및-endswith-문자열-메서드-startswith-and-endswith-string-methods)
        *   [`atexit` 모듈 (The atexit Module)](#atexit-모듈-the-atexit-module)
    *   [Python 1.5 이상 (Python 1.5 or Later)](#python-15-이상-python-15-or-later)
        *   [클래스 기반 예외 (Class-Based Exceptions)](#클래스-기반-예외-class-based-exceptions)
    *   [모든 Python 버전 (All Python Versions)](#모든-python-버전-all-python-versions)
        *   [`None` 테스트 (Testing for None)](#none-테스트-testing-for-none)
*   [저작권 (Copyright)](#저작권-copyright)

---

### 요약 (Abstract)

이 PEP는 새로운 버전의 Python이 설치될 때 Python 애플리케이션을 업데이트하기 위한 절차와 아이디어들을 모아 놓은 것입니다.

마이그레이션 팁은 발생 가능한 비호환성 영역을 강조하고, 이러한 차이점을 찾고 해결하는 방법에 대한 제안을 제공합니다. 현대화 절차는 이전 코드를 새로운 언어 기능을 활용하도록 업데이트하는 방법을 보여줍니다.

### 배경 (Rationale)

이 절차들의 저장소는 알려진 마이그레이션 이슈와 해당 이슈를 해결하기 위한 절차들의 목록 또는 체크리스트 역할을 합니다.

마이그레이션 이슈는 여러 가지 이유로 발생할 수 있습니다. 일부 구식 기능은 PEP 4의 지침에 따라 점진적으로 사용이 중단됩니다. 또한, 일부 코드는 버전 간에 변경될 수 있는 문서화되지 않은 동작에 의존합니다. 일부 코드는 나중에 버그로 밝혀진 동작에 의존할 수 있으며, 버그가 수정되면 해당 동작이 변경됩니다.

현대화 옵션은 새로운 버전의 Python이 이전에 사용 가능했던 것보다 향상된 명확성이나 더 높은 성능을 제공하는 기능을 추가할 때 발생합니다.

### 새로운 항목을 위한 지침 (Guidelines for New Entries)

커밋 접근 권한이 있는 개발자는 이 PEP를 직접 업데이트할 수 있습니다. 다른 개발자는 아이디어를 개발자에게 보내 포함 여부를 결정할 수 있습니다.

일관된 형식은 저장소를 사용하기 쉽게 만들지만, 명확성을 높이기 위해 섹션을 추가하거나 뺄 수 있습니다.

유지보수자가 잠재적 업데이트를 위해 코드를 찾는 데 도움이 되는 도구로 `grep` 패턴을 제공할 수 있습니다. 그러나 완전히 자동화된 검색/교체 방식의 정규 표현식은 권장되지 않습니다. 대신 각 코드 조각은 개별적으로 평가되어야 합니다.

`contra-indications` 섹션은 새로운 항목에서 가장 중요한 부분입니다. 이 섹션은 업데이트를 적용해서는 *안 되는* 알려진 상황을 나열합니다.

### 마이그레이션 이슈 (Migration Issues)

#### 비교 연산자는 0 또는 1을 생성하는 단축키가 아닙니다 (Comparison Operators Not a Shortcut for Producing 0 or 1)

Python 2.3 이전에는 비교 연산이 `True` 또는 `False` 대신 0 또는 1을 반환했습니다. 일부 코드는 부울(boolean) 값이 적절하지 않은 곳에서 0 또는 1을 생성하는 단축키로 이를 사용했을 수 있습니다. 예를 들면 다음과 같습니다.

```python
def identity(m=1):
    """Create and m-by-m identity matrix"""
    return [[i==j for i in range(m)] for j in range(m)]
```

Python 2.2에서 `identity(2)`를 호출하면 다음과 같이 출력됩니다.

```
[[1, 0], [0, 1]]
```

Python 2.3에서는 동일한 호출이 다음과 같이 출력됩니다.

```
[[True, False], [False, True]]
```

부울은 정수의 하위 클래스이므로, 행렬은 정상적으로 계산되지만 예상대로 출력되지 않을 수 있습니다. `list comprehension`은 다음과 같이 변경되어야 합니다.

```python
return [[int(i==j) for i in range(m)] for j in range(m)]
```

숫자가 아닌 `True` 또는 `False`를 예상하는 다른 애플리케이션에서 사용될 데이터를 저장할 때도 유사한 문제가 발생할 수 있습니다.

### 현대화 절차 (Modernization Procedures)

절차들은 현대화를 활용하는 데 필요한 Python 버전에 따라 그룹화됩니다.

#### Python 2.4 이상 (Python 2.4 or Later)

##### 리스트의 시작 부분에 삽입 및 제거 (Inserting and Popping at the Beginning of Lists)

Python의 리스트는 오른쪽에 `append` 및 `pop` 연산을 수행할 때 가장 좋은 성능을 발휘하도록 구현되어 있습니다. `pop(0)` 또는 `insert(0, x)`를 사용하면 전체 리스트에 대해 O(n) 데이터 이동이 발생합니다. 이러한 요구 사항을 해결하기 위해 Python 2.4는 `collections.deque()`라는 새로운 컨테이너를 도입했습니다. 이 컨테이너는 왼쪽과 오른쪽 모두에서 효율적인 `append` 및 `pop` 연산을 제공합니다 (이 경우 `getitem`/`setitem` 접근이 훨씬 느려진다는 trade-off가 있습니다). 이 새로운 컨테이너는 데이터 큐(queue)를 구현하는 데 특히 유용합니다.

**패턴 (Pattern):**

```python
c = list(data)    --> c = collections.deque(data)
c.pop(0)          --> c.popleft()
c.insert(0, x)    --> c.appendleft()
```

**위치 찾기 (Locating):**

```bash
grep pop(0
```

또는

```bash
grep insert(0
```

##### 사용자 지정 정렬 단순화 (Simplifying Custom Sorts)

Python 2.4에서는 리스트의 `sort` 메서드와 새로운 내장 함수 `sorted` 모두 정렬 키를 계산하기 위한 `key` 함수를 받습니다. 모든 비교에 적용되는 `cmp` 함수와 달리, `key` 함수는 각 레코드에 한 번만 적용됩니다. 이는 `cmp`보다 훨씬 빠르며, 일반적으로 코드가 적으면서도 더 읽기 쉽습니다. `key` 함수는 또한 정렬의 안정성(stability)을 유지합니다 (동일한 키를 가진 레코드는 원래 순서를 유지합니다).

**비교 함수를 사용한 원본 코드:**

```python
names.sort(lambda x,y: cmp(x.lower(), y.lower()))
```

**명시적인 데코레이션(decoration)을 사용한 대체 원본 코드:**

```python
tempnames = [(n.lower(), n) for n in names]
tempnames.sort()
names = [original for decorated, original in tempnames]
```

**key 함수를 사용한 수정된 코드:**

```python
names.sort(key=str.lower) # 대소문자를 구분하지 않는 정렬
```

**위치 찾기 (Locating):**

```bash
grep sort *.py
```

##### 람다(Lambda)의 일반적인 사용 대체 (Replacing Common Uses of Lambda)

Python 2.4에서 `operator` 모듈은 `itemgetter()`와 `attrgetter()`라는 두 가지 새로운 함수를 추가하여 `lambda` 키워드의 일반적인 사용을 대체할 수 있게 되었습니다. 새로운 함수는 더 빠르게 실행되며, 일부 개발자들은 가독성을 향상시킨다고 생각합니다.

**패턴 (Pattern):**

```python
lambda r: r[2]       --> itemgetter(2)
lambda r: r.myattr   --> attrgetter('myattr')
```

**일반적인 사용 사례:**

```python
sort(studentrecords, key=attrgetter('gpa'))   # 정렬 필드 설정
map(attrgetter('lastname'), studentrecords)   # 필드 추출
```

**위치 찾기 (Locating):**

```bash
grep lambda *.py
```

##### 역방향 이터레이션 단순화 (Simplified Reverse Iteration)

Python 2.4는 역방향 이터레이션을 위한 내장 함수 `reversed`를 도입했습니다. 기존의 역방향 이터레이션 방식은 장황함, 성능 문제(속도 및 메모리 소비), 그리고/또는 명확성 부족에 시달렸습니다. 선호되는 스타일은 시퀀스를 정방향으로 표현하고, 그 결과에 `reversed`를 적용한 다음, 결과로 생성된 빠르고 메모리 친화적인 이터레이터를 반복하는 것입니다.

**반개 구간(half-open interval)으로 표현된 원본 코드:**

```python
for i in range(n-1, -1, -1):
    print seqn[i]
```

**여러 단계로 역방향 처리된 대체 원본 코드:**

```python
rseqn = list(seqn)
rseqn.reverse()
for value in rseqn:
    print value
```

**슬라이싱 확장을 사용하여 표현된 대체 원본 코드:**

```python
for value in seqn[::-1]:
    print value
```

**`reversed` 함수를 사용한 수정된 코드:**

```python
for value in reversed(seqn):
    print value
```

#### Python 2.3 이상 (Python 2.3 or Later)

##### 문자열 멤버십 테스트 (Testing String Membership)

Python 2.3에서 `string2 in string1` 구문에서 `string2`의 길이 제한이 해제되었습니다. 이제 모든 길이의 문자열이 될 수 있습니다. 부분 문자열의 원본 문자열 내 위치에 신경 쓰지 않을 때, `in` 연산자를 사용하면 의미가 명확해집니다.

**패턴 (Pattern):**

```python
string1.find(string2) >= 0   --> string2 in string1
string1.find(string2) != -1  --> string2 in string1
```

##### `apply()`를 직접 함수 호출로 대체 (Replace apply() with a Direct Function Call)

Python 2.3에서 `apply()`는 `Pending Deprecation`으로 표시되었습니다. 이는 Python 1.6에서 함수 호출에 `*`와 ` **`가 도입되면서 `apply()`가 쓸모없게 되었기 때문입니다. 내장 함수 조회를 절약했기 때문에 직접 함수 호출은 항상 `apply()`보다 약간 빨랐습니다. 이제 `apply()`는 `warnings` 모듈을 사용하기 때문에 훨씬 더 느려졌습니다.

** 패턴 (Pattern):**

```python
apply(f, args, kwds)   --> f(*args, **kwds)
```

** 참고: ** `apply()`의 `Pending Deprecation`은 Python 2.3.3에서 제거되었습니다. 이는 Python 1.5.2까지의 이전 버전의 Python으로 작업해야 하는 사람들에게 어려움을 초래했기 때문이며, 당시에는 `apply()`를 대체할 방법이 없었습니다. 그러나 이 함수는 여전히 사용이 중단되었습니다.

#### Python 2.2 이상 (Python 2.2 or Later)

##### 딕셔너리 멤버십 테스트 (Testing Dictionary Membership)

딕셔너리 멤버십을 테스트할 때는 `has_key()` 메서드 대신 `'in'` 키워드를 사용하십시오. 결과는 더 짧고 읽기 쉬워집니다. 이 스타일은 리스트의 멤버십 테스트와 일관성을 이룹니다. `has_key`는 속성 검색을 필요로 하고 상대적으로 비용이 많이 드는 함수 호출을 사용하므로 결과적으로 약간 더 빠릅니다.

** 패턴 (Pattern): **

```python
if d.has_key(k):   --> if k in d:
```

** 금지 사항 (Contra-indications): **

일부 딕셔너리 형태의 객체는 `__contains__()` 메서드를 정의하지 않을 수 있습니다.

```python
if dictlike.has_key(k)
```

** 위치 찾기 (Locating): **

```bash
grep has_key
```

##### 딕셔너리 순회 (Looping Over Dictionaries)

딕셔너리를 순회할 때는 새로운 `iter` 메서드를 사용하십시오. `iter` 메서드는 모든 키, 값 또는 항목(키/값 쌍)의 완전한 사본을 포함하는 새로운 리스트 객체를 생성할 필요가 없기 때문에 더 빠릅니다. 필요한 키, 값 또는 항목만 선택하면 버려지는 객체 참조를 생성하는 시간을 절약할 수 있으며, 항목의 경우 두 번째 해시 조회 시간을 절약할 수 있습니다.

** 패턴 (Pattern): **

```python
for key in d.keys():           --> for key in d:
for value in d.values():       --> for value in d.itervalues():
for key, value in d.items():   --> for key, value in d.iteritems():
```

** 금지 사항 (Contra-indications): **

리스트가 필요한 경우 반환 유형을 변경하지 마십시오.

```python
def getids():
    return d.keys()
```

일부 딕셔너리 형태의 객체는 `iter` 메서드를 정의하지 않을 수 있습니다.

```python
for k in dictlike.keys():
```

이터레이터는 슬라이싱, 정렬 또는 기타 연산을 지원하지 않습니다.

```python
k = d.keys(); j = k[:]
```

딕셔너리 이터레이터는 딕셔너리 수정을 금지합니다.

```python
for k in d.keys():
    del[k]
```

##### `stat` 메서드 (stat Methods)

`stat` 상수 또는 인덱스를 새로운 `os.stat` 속성 및 메서드로 대체하십시오. `os.stat` 속성 및 메서드는 순서에 의존하지 않으며 `stat` 모듈을 가져올 필요가 없습니다.

** 패턴 (Pattern): **

```python
os.stat("foo")[stat.ST_MTIME]   --> os.stat("foo").st_mtime
os.stat("foo")[stat.ST_MTIME]   --> os.path.getmtime("foo")
```

** 위치 찾기 (Locating): **

```bash
grep os.stat
```

또는

```bash
grep stat.S
```

##### `types` 모듈 의존성 줄이기 (Reduce Dependency on types Module)

`types` 모듈은 미래에 사용이 중단될 가능성이 있습니다. 대신 내장 생성자 함수를 사용하십시오. 이들은 약간 더 빠를 수 있습니다.

** 패턴 (Pattern): **

```python
isinstance(v, types.IntType)       --> isinstance(v, int)
isinstance(s, types.StringTypes)   --> isinstance(s, basestring)
```

이 기술을 완전히 사용하려면 Python 2.3 이상이 필요하지만 (`basestring`은 Python 2.3에서 도입됨), 대부분의 경우 Python 2.2로 충분합니다.

** 위치 찾기 (Locating):**

```bash
grep types *.py | grep import
```

##### `__builtins__` 모듈과 충돌하는 변수 이름 피하기 (Avoid Variable Names that Clash with the __builtins__ Module)

Python 2.2에서는 `dict` 및 `file`에 대한 새로운 내장 유형이 추가되었습니다. 스크립트는 이러한 유형을 가리는 변수 이름을 할당하는 것을 피해야 합니다. 동일한 조언은 `list`와 같은 기존 내장 함수에도 적용됩니다.

**패턴 (Pattern):**

```python
file = open('myfile.txt')   --> f = open('myfile.txt')
dict = obj.__dict__         --> d = obj.__dict__
```

**위치 찾기 (Locating):**

```bash
grep 'file ' *.py
```

#### Python 2.1 이상 (Python 2.1 or Later)

##### `whrandom` 모듈 사용 중단 (whrandom Module Deprecated)

모든 랜덤 관련 메서드는 `random` 모듈이라는 한곳에 모였습니다.

**패턴 (Pattern):**

```python
import whrandom   --> import random
```

**위치 찾기 (Locating):**

```bash
grep whrandom
```

#### Python 2.0 이상 (Python 2.0 or Later)

##### 문자열 메서드 (String Methods)

`string` 모듈은 미래에 사용이 중단될 가능성이 있습니다. 대신 문자열 메서드를 사용하십시오. 이들은 더 빠르기도 합니다.

**패턴 (Pattern):**

```python
import string ; string.method(s, ...)   --> s.method(...)
c in string.whitespace                   --> c.isspace()
```

**위치 찾기 (Locating):**

```bash
grep string *.py | grep import
```

##### `startswith` 및 `endswith` 문자열 메서드 (startswith and endswith String Methods)

슬라이싱 대신 이 문자열 메서드를 사용하십시오. 슬라이스가 생성될 필요가 없으며 잘못 계산될 위험이 없습니다.

**패턴 (Pattern):**

```python
"foobar"[:3] == "foo"   --> "foobar".startswith("foo")
"foobar"[-3:] == "bar"  --> "foobar".endswith("bar")
```

##### `atexit` 모듈 (The atexit Module)

`atexit` 모듈은 프로그램 종료 시 실행될 여러 함수를 지원합니다. 또한, 매개변수화된 함수도 지원합니다. 불행하게도, 이 구현은 단일 종료 함수만 지원하는 `sys.exitfunc` 속성과 충돌합니다. `sys.exitfunc`에 의존하는 코드는 (라이브러리 모듈을 포함하여) 더 새롭고 다재다능한 `atexit` 모듈을 사용하기로 선택한 다른 모듈과 충돌할 수 있습니다.

**패턴 (Pattern):**

```python
sys.exitfunc = myfunc   --> atexit.register(myfunc)
```

#### Python 1.5 이상 (Python 1.5 or Later)

##### 클래스 기반 예외 (Class-Based Exceptions)

문자열 예외는 사용이 중단되었으므로, `Exception` 기본 클래스에서 파생하십시오. 구식 문자열 예외와 달리, 클래스 예외는 모두 다른 예외 또는 `Exception` 기본 클래스에서 파생됩니다. 이는 의미 있는 예외 그룹화를 가능하게 합니다. 또한 "`except Exception`" 절이 모든 예외를 잡을 수 있도록 합니다.

**패턴 (Pattern):**

```python
NewError = 'NewError'   --> class NewError(Exception): pass
```

**위치 찾기 (Locating):**

PyChecker를 사용하십시오.

#### 모든 Python 버전 (All Python Versions)

##### `None` 테스트 (Testing for None)

`None` 객체는 하나뿐이므로, 동일성(identity)으로 동등성(equality)을 테스트할 수 있습니다. 동일성 테스트는 동등성 테스트보다 약간 더 빠릅니다. 또한, 일부 객체 유형은 비교 연산자를 오버로드할 수 있으므로, 동등성 테스트가 훨씬 느릴 수 있습니다.

**패턴 (Pattern):**

```python
if v == None    --> if v is None:
if v != None    --> if v is not None:
```

**위치 찾기 (Locating):**

```bash
grep '== None'
```

또는

```bash
grep '!= None'
```

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.