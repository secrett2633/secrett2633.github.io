---
title: "[Rejected] PEP 642 - Explicit Pattern Syntax for Structural Pattern Matching"
excerpt: "Python Enhancement Proposal 642: 'Explicit Pattern Syntax for Structural Pattern Matching'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/642/
toc: true
toc_sticky: true
date: 2025-09-27 01:33:04+0900
last_modified_at: 2025-09-27 01:33:04+0900
published: true
---
> **원문 링크:** [PEP 642 - Explicit Pattern Syntax for Structural Pattern Matching](https://peps.python.org/pep-0642/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 26-Sep-2020


## PEP 642: 구조적 패턴 매칭을 위한 명시적 패턴 구문

### 초록 (Abstract)

이 PEP는 PEP 634의 구조적 패턴 매칭(structural pattern matching)에 대한 대체 구문 제안을 다룹니다. 이 제안은 모든 캡처 패턴(capture patterns)과 값 제약(value constraints)에 명시적인 접두사를 요구합니다. 또한, 제안된 매핑 패턴(mapping pattern) 구문과 더 밀접하게 일치하는 인스턴스 속성 패턴(instance attribute patterns)을 위한 새로운 전용 구문을 제안합니다.

결과적으로 PEP 634의 구문보다 더 장황하지만, 기존 방식보다는 훨씬 간결합니다.

예를 들어, 다음 `match` 문은 2개의 항목 시퀀스, "host"와 "port" 키를 가진 매핑, "host"와 "port" 속성을 가진 객체, 또는 "host:port" 문자열에서 "host"와 "port" 세부 정보를 추출합니다. 후자의 세 경우 "port"는 선택 사항으로 간주합니다.

```python
port = DEFAULT_PORT
match expr:
    case [as host, as port]:
        pass
    case {"host" as host, "port" as port}:
        pass
    case {"host" as host}:
        pass
    case object{.host as host, .port as port}:
        pass
    case object{.host as host}:
        pass
    case str{} as addr:
        host, __, optional_port = addr.partition(":")
        if optional_port:
            port = optional_port
    case __ as m:
        raise TypeError(f"Unknown address format: {m!r:.200}")
port = int(port)
```

이 PEP는 패턴 유형을 다음과 같이 분류할 것을 제안합니다.

*   **와일드카드 패턴 (wildcard pattern):** `__`
*   **그룹 패턴 (group patterns):** `(PTRN)`
*   **값 제약 패턴 (value constraint patterns):**
    *   동등성 제약 (equality constraints): `== EXPR`
    *   동일성 제약 (identity constraints): `is EXPR`
*   **구조적 제약 패턴 (structural constraint patterns):**
    *   시퀀스 제약 패턴 (sequence constraint patterns): `[PTRN, as NAME, PTRN as NAME]`
    *   매핑 제약 패턴 (mapping constraint patterns): `{EXPR: PTRN, EXPR as NAME}`
    *   인스턴스 속성 제약 패턴 (instance attribute constraint patterns): `CLS{.NAME, .NAME: PTRN, .NAME == EXPR, .NAME as NAME}`
    *   클래스 정의 제약 패턴 (class defined constraint patterns): `CLS(PTRN, PTRN, **{.NAME, .NAME: PTRN, .NAME == EXPR, .NAME as NAME})`
*   **OR 패턴 (OR patterns):** `PTRN | PTRN | PTRN`
*   **AS 패턴 (AS patterns):** `PTRN as NAME` (패턴 생략 시 `__` 의미)

이 접근 방식의 목표는 다음과 같습니다.

*   이름, 속성 조회, 리터럴 값 처리의 최적 기본 옵션을 미리 결정할 필요 없이, 패턴 매칭의 초기 형태를 개발 및 출시할 수 있도록 합니다.
*   패턴 매칭이 추상 구문 트리(Abstract Syntax Tree, AST) 수준에서 명시적으로 정의되도록 하여, 의미론(semantics)과 표면 구문(surface syntax) 사양을 명확하게 분리합니다.
*   "덕 타이핑(ducktyping)"을 위한 명확하고 간결한 구문을 정의하여, 일반 표현식에서도 동일한 객체에서 여러 속성을 더 쉽게 검색하는 방법으로 채택될 수 있습니다.

### 다른 PEP와의 관계 (Relationship with other PEPs)

이 PEP는 PEP 634에 의존하면서도 경쟁합니다. PEP 642의 저자는 `match` 문이 학습 과정에 추가적인 복잡성을 더하더라도 언어에 가치 있는 추가가 될 것이라는 점에는 동의하지만, "단순 이름(simple name) vs. 리터럴 또는 속성 조회"가 패턴 매칭에서 이름 바인딩(name binding)과 값 조회(value lookup) 작업 간의 적절한 구문적 구별을 제공한다는 생각에는 동의하지 않습니다.

이 PEP는 PEP 640의 정신(이름 바인딩을 건너뛰기 위한 와일드카드 패턴이 `match` 패턴뿐만 아니라 모든 곳에서 지원되어야 한다는 것)에는 동의하지만, 와일드카드 구문으로 `?` 대신 `__`를 제안합니다.

### 동기 (Motivation)

원래 PEP 622 (이후 PEP 634, PEP 635, PEP 636으로 분할됨)는 구문 설계에 명시되지 않은 필수적인 가정을 포함했습니다: 일반 표현식이나 기존 할당 대상 구문이 `match` 패턴에 사용되는 구문의 적절한 기반을 제공하지 못한다는 것입니다. PEP 642의 저자는 이러한 가정을 재검토하고, 할당 대상 구문을 기반으로 한 패턴 매칭 구문이 내재된 모순 없이 가능하다는 것을 보여주려 했습니다.

그러나 검토 과정에서 PEP 634의 구문 제안에 대한 의구심을 불러일으킬 만큼 중요한 모순들이 제기되었습니다. 이에 따라 이 PEP의 목표는 완전히 역전되었습니다. 즉, 할당과 패턴 매칭 간의 유사성을 강조하기보다는, 할당 대상 구문이 전혀 재사용되지 않도록 하여 기존 경험을 바탕으로 새로운 구조에 대해 잘못된 추론을 할 가능성을 줄이는 데 중점을 두게 되었습니다.

최종적으로, 이 PEP의 저자는 PEP 20의 "명시적인 것이 암시적인 것보다 낫다(Explicit is better than implicit).", "특별한 경우는 규칙을 깰 만큼 특별하지 않다(Special cases aren't special enough to break the rules).", "모호함에 직면했을 때, 추측하려는 유혹을 거부하라(In the face of ambiguity, refuse the temptation to guess)."라는 원칙을 깊이 고민했습니다. 명시적인 구문으로 시작하면 나중에 구문 단축키를 추가할 수 있지만, 약칭 형태만으로 시작하면 미래 릴리스에서 이러한 결정을 재검토할 방법이 없기 때문입니다.

### 명세 (Specification)

이 PEP는 PEP 634의 전체적인 `match`/`case` 문 구조와 의미론을 유지하지만, 사용자 의도가 패턴 매칭 컨텍스트에서 추론될 필요 없이 구체적인 구문에서 명시적으로 지정되도록 여러 변경 사항을 제안합니다.

제안된 추상 구문 트리(Abstract Syntax Tree, AST)에서도 의미론은 항상 명시적이며, 추론이 필요하지 않습니다.

#### The Match Statement

`match` 문은 `match` 키워드 뒤에 주어(subject) 표현식이 오고, 콜론(`:`)과 들여쓰기된 `case` 블록들이 이어지는 구조입니다.

```
match_stmt: "match" subject_expr ':' NEWLINE INDENT case_block+ DEDENT
```

`case` 블록은 `case` 키워드 뒤에 패턴이 오고, 선택적으로 `if` 가드(guard)가 붙은 후 콜론(`:`)과 블록이 이어집니다.

```
case_block: "case" (guarded_pattern | open_pattern) ':' block
guarded_pattern: closed_pattern 'if' named_expression
```

PEP 634와 마찬가지로, `match`와 `case`는 소프트 키워드(soft keywords)입니다. 즉, 다른 문법 컨텍스트에서는 예약어가 아니며, 변수나 인자 이름으로 사용될 수 있습니다.

PEP 634와 달리, 이 PEP에서는 패턴이 추상 구문 트리에서 새로운 종류의 노드로 명시적으로 정의됩니다. 이는 표면 구문이 기존 표현식 노드와 공유되더라도, 파서(parser)가 별개의 추상 노드를 방출한다는 의미입니다.

#### Match Semantics (매치 의미론)

이 PEP는 PEP 634에서 제안된 전반적인 패턴 매칭 의미론을 대부분 유지합니다.

패턴에 대한 제안된 구문은 크게 변경되었으며, 아래에서 자세히 설명합니다. 또한, `__match_args__`를 `None`으로 설정하는 모든 유형에 적용되도록 하여 내장 유형에 대한 특별한 경우 처리를 없애기 위해 클래스 정의 제약(class defined constraints, PEP 634의 클래스 패턴)의 의미론에 일부 변경 사항이 제안되었습니다.

#### Guards (가드)

이 PEP는 PEP 634에서 제안된 가드 절(guard clause) 의미론을 유지합니다. 그러나, 가드 절이 있을 경우 `case` 패턴이 `closed pattern`이어야 한다는 요구 사항을 추가하여 구문이 약간 변경되었습니다. 이는 패턴이 끝나고 가드 절이 시작되는 지점을 독자가 더 명확하게 이해할 수 있도록 합니다.

#### Irrefutable case blocks (반박 불가능한 case 블록)

이 PEP에서는 `capture pattern`이 `AS pattern`과 별개의 개념으로 더 이상 존재하지 않으므로, 반박 불가능한 `case` 블록의 정의가 PEP 634와 비교하여 약간 변경됩니다.

*   와일드카드 패턴은 반박 불가능합니다.
*   좌변이 반박 불가능한 AS 패턴은 반박 불가능합니다.
*   적어도 하나의 반박 불가능한 패턴을 포함하는 OR 패턴은 반박 불가능합니다.
*   괄호로 묶인 반박 불가능한 패턴은 반박 불가능합니다.
*   `case` 블록은 가드가 없고 그 패턴이 반박 불가능하면 반박 불가능한 것으로 간주됩니다.
*   `match` 문은 최대 하나의 반박 불가능한 `case` 블록을 가질 수 있으며, 이는 마지막에 와야 합니다.

#### Patterns (패턴)

패턴의 최상위 표면 구문은 다음과 같습니다.

```
open_pattern: # Pattern may use multiple tokens with no closing delimiter
    | as_pattern
    | or_pattern
as_pattern: [closed_pattern] pattern_as_clause
or_pattern: '|'.simple_pattern+
simple_pattern: # Subnode where "as" and "or" patterns must be parenthesised
    | closed_pattern
    | value_constraint
closed_pattern: # Require a single token or a closing delimiter in pattern
    | wildcard_pattern
    | group_pattern
    | structural_constraint
```

`open pattern`의 사용은 최상위 `case` 절과 `group pattern` 내에서 괄호로 묶였을 때로 제한됩니다.

패턴의 추상 구문은 어떤 요소가 서브패턴(subpatterns)이고 어떤 요소가 서브표현식(subexpressions) 또는 식별자(identifiers)인지 명시적으로 나타냅니다.

##### AS Patterns (AS 패턴)

`AS pattern`은 `as` 키워드 왼쪽에 있는 `closed pattern`을 주어(subject)와 매치합니다. 매치에 실패하면 `AS pattern`도 실패합니다. 성공하면 `AS pattern`은 주어를 `as` 키워드 오른쪽에 있는 이름에 바인딩하고 성공합니다.

패턴이 주어지지 않으면 와일드카드 패턴(`__`)이 암시됩니다. 혼동을 피하기 위해 이중 밑줄(`__`)은 캡처 대상(capture target)으로 허용되지 않습니다.

##### OR Patterns (OR 패턴)

두 개 이상의 패턴이 수직 막대(`|`)로 구분되면 이를 `OR pattern`이라고 합니다. `OR pattern`은 각 서브패턴을 순서대로 주어에 매치하여 성공하는 첫 번째 서브패턴에서 성공으로 간주됩니다. 모든 서브패턴이 실패하면 `OR pattern`도 실패합니다.

##### Value constraints (값 제약)

`value constraint`는 PEP 634의 `literal patterns`과 `value patterns`를 대체합니다.

*   **동등성 제약 (Equality constraints):** `== EXPR` 형식으로 작성되며, 주어 값이 주어진 `EXPR`과 동등한지 확인합니다.
*   **동일성 제약 (Identity constraints):** `is EXPR` 형식으로 작성되며, 주어 값이 `EXPR`과 정확히 같은 객체인지 확인합니다.

비교될 표현식은 대부분 단일 토큰(예: 이름, 문자열, 숫자, 내장 상수) 또는 닫는 구분자로 끝나야 하는 표현식으로 제한됩니다.

##### Wildcard Pattern (와일드카드 패턴)

와일드카드 패턴은 `__`로 작성되며 항상 성공합니다. PEP 634와 마찬가지로 어떤 이름도 바인딩하지 않습니다. PEP 634가 다른 언어와의 일관성을 위해 단일 밑줄(`_`)을 와일드카드 패턴으로 선택한 반면, 이 PEP는 이중 밑줄(`__`)을 선택합니다. `__`는 전체 언어에 걸쳐 일관성을 유지할 수 있는 더 명확한 경로를 가지고 있기 때문입니다.

##### Group Patterns (그룹 패턴)

`group pattern`은 괄호 `()`로 `open pattern`을 묶는 형태입니다. 추가적인 구문이 없으며, 추상 구문 트리에는 표현되지 않습니다. 이는 사용자가 의도된 그룹화를 강조하거나 문법이 `closed pattern`을 요구할 때 `open pattern`을 중첩할 수 있도록 합니다.

##### Structural constraints (구조적 제약)

`structural constraint`는 복합 객체에 대한 단언(assertion)을 만들고 그로부터 값을 추출하는 데 사용되는 패턴입니다. 이러한 패턴은 중첩된 `AS pattern`을 사용하거나 패턴 정의에 포함된 `pattern_as_clause` 요소를 통해 여러 값을 바인딩할 수 있습니다.

*   **Sequence constraints (시퀀스 제약):** `[]` 대괄호를 사용하여 시퀀스 내의 항목을 확인하고 선택적으로 추출할 수 있습니다. `collections.abc.Sequence`의 인스턴스가 아니거나 `str`, `bytes`, `bytearray` 인스턴스인 경우 실패합니다.
*   **Mapping constraints (매핑 제약):** `{}` 중괄호를 사용하여 시퀀스 내의 키와 값을 확인하고 값을 선택적으로 추출할 수 있습니다. `collections.abc.Mapping`의 인스턴스가 아닌 경우 실패합니다.
*   **Instance attribute constraints (인스턴스 속성 제약):** `CLS{.NAME, ...}` 형식으로 작성되며, 인스턴스의 타입을 확인하고 속성을 선택적으로 추출할 수 있습니다. `isinstance()`를 사용하여 `name_or_attr`의 인스턴스인지 확인합니다.
*   **Class defined constraints (클래스 정의 제약):** `name_or_attr()` 또는 `name_or_attr(positional_patterns, **{attrs_constraint_elements})` 형식으로 작성됩니다. 클래스에 공통 속성 시퀀스를 지정하고, 매번 속성 이름을 지정할 필요 없이 위치 기반으로 확인할 수 있도록 합니다. `__match_args__` 속성을 정의하는 유형만 클래스 정의 패턴에서 사용할 수 있습니다.

### 설계 논의 (Design Discussion)

#### 패턴 매칭에서 단순 이름의 명시적 한정자 요구 (Requiring explicit qualification of simple names in match patterns)

이 PEP의 첫 번째 버전은 PEP 634의 기본 전제, 즉 이터러블 언패킹(iterable unpacking) 구문이 패턴 매칭을 위한 새로운 구문을 정의하는 데 좋은 기반이 될 것이라는 점을 받아들였습니다. 그러나 검토 과정에서 이 핵심 가정에서 직접적으로 발생하는 두 가지 주요하고 한 가지 사소한 모호성 문제가 강조되었습니다.

세 번째 개정안은 이러한 문제를 해결하기 위해 이터러블 언패킹 구문과의 일치를 포기하고, 변수 조회를 제외한 모든 단순 이름 사용에 선행 시그널(sigil) 또는 키워드를 사용하여 한정할 것을 요구했습니다.

*   `as NAME`: 지역 변수 바인딩
*   `.NAME`: 속성 조회
*   `== NAME`: 변수 조회
*   `is NAME`: 변수 조회
*   다른 모든 사용: 변수 조회

이 접근 방식의 주요 장점은 패턴 내에서 단순 이름의 해석을 지역적인 활동으로 만든다는 것입니다. 선행 `as`는 이름 바인딩을, 선행 `.`은 속성 조회를 나타내며, 그 외의 모든 것은 변수 조회입니다.

#### 추측하려는 유혹에 저항하기 (Resisting the temptation to guess)

PEP 635는 다른 언어에서 패턴 매칭이 사용되는 방식을 살펴보고, 파이썬에서 패턴 매칭이 어떻게 사용될지에 대한 그럴듯한 예측을 하려고 시도했습니다. 이 PEP는 이러한 예측이 타당하다고 보지만, 미리 추측할 필요는 없다고 주장합니다. 대신, `as`, `==`, `is`와 같은 접두사 마커를 사용하여 사용자가 의도를 명시적으로 밝히도록 요구하는 더 명시적인 구문으로 시작하고, 몇 년 후 파이썬에서 패턴 매칭이 실제로 어떻게 사용되는지에 따라 상황을 재평가할 것을 제안합니다.

#### 로컬 변수의 속성 조회 캐싱과의 상호작용 (Interaction with caching of attribute lookups in local variables)

이 PEP와 PEP 634의 주요 변경 사항 중 하나는 동등성 제약 조회에 `== EXPR`를 사용하는 것입니다. PEP 634의 값 및 캡처 패턴 구문은 마커 접두사를 생략하므로, 로컬 변수를 사용하여 속성 조회를 대체하는 리팩토링 시 의미론적 동등성이 깨지는 문제가 발생할 수 있습니다. 이 PEP는 `== name`을 사용하여 결과를 값 제약으로 강제 해석하고, `as name`을 사용하여 이름 바인딩을 지정함으로써 이러한 리팩토링 시에도 원래의 의미론이 유지되도록 합니다.

#### 값 제약 접두사로 기존 비교 연산자 사용 (Using existing comparison operators as the value constraint prefix)

초기 버전에서는 `?`를 동등성 제약 접두사로, `?is`를 동일성 제약 접두사로 제안했으나, Steven D'Aprano는 기존 비교 연산자(`==` 및 `is`)를 대신 사용할 것을 제안했습니다. 이 PEP는 이 아이디어를 채택하여 새로운 기호를 도입하는 대신 기존 연산자를 활용합니다.

#### 와일드카드 패턴 마커로 `__` 사용 (Using __ as the wildcard pattern marker)

PEP 635는 와일드카드 패턴 마커로 `?`를 도입하는 것이 좋지 않다고 주장했습니다. PEP 634에서 `_`를 와일드카드 패턴으로 선택한 것 역시 국제화(i18n) 관련 사용 사례 등으로 인해 파이썬의 다른 부분과의 일관성을 유지하기 어렵다는 문제가 제기되었습니다.

이 PEP는 `__`를 와일드카드 패턴 마커로 제안합니다. `__`는 현재 파이썬 코드에서 "이 값이 필요하지 않음"을 나타내는 대안으로 사용될 수 있으며, `_`와 달리 다른 사용 사례가 부족하므로, 향후 `__`를 파이썬의 모든 곳에서 "이름 바인딩 건너뛰기"를 의미하는 일반적인 하드 키워드(hard keyword)로 만들 수 있는 그럴듯한 경로를 제공합니다. 또한, `__`로 시작하는 이름은 이미 언어 내부적으로 예약되어 있다는 점도 이러한 접근 방식과 일치합니다.

#### 추상 구문 트리에서 패턴을 명시적으로 표현 (Representing patterns explicitly in the Abstract Syntax Tree)

PEP 634는 `match` 문이 AST에서 어떻게 표현되어야 하는지 명시적으로 논의하지 않았습니다. 그 결과, PEP 634의 참조 구현은 패턴을 표현식 노드로 나타내는 중대한 설계 결함을 포함했습니다.

이 PEP는 AST에 새로운 명시적인 "pattern" 노드를 정의합니다. 이를 통해 패턴과 허용되는 서브노드를 AST 자체에 명시적으로 정의할 수 있으며, 새로운 기능을 구현하는 코드를 더 명확하게 만들고, C 컴파일러가 코드 생성기가 패턴을 처리하는지 표현식을 처리하는지 추적하는 데 더 많은 도움을 제공할 수 있도록 합니다.

#### 시퀀스 패턴 변경 (Changes to sequence patterns)

이 PEP는 PEP 634와 비교하여 시퀀스 패턴에 한 가지 주목할 만한 변경 사항을 적용합니다.

*   오직 대괄호 `[]` 형태의 시퀀스 패턴만 지원됩니다. 열린 형태(구분자 없음)나 튜플 스타일(괄호 `()`를 구분자로 사용) 시퀀스 패턴은 지원되지 않습니다.

이는 이터러블 언패킹 구문과의 일관성을 위해 원래 구문 제안에 포함되었던 구문 유연성을 더 이상 유지할 필요가 없다는 판단에 따른 것입니다.

#### 매핑 패턴 변경 (Changes to mapping patterns)

이 PEP는 PEP 634와 비교하여 매핑 패턴에 두 가지 주목할 만한 변경 사항을 적용합니다.

*   값 캡처는 `KEY as NAME`으로 작성됩니다.
*   더 넓은 범위의 키가 허용됩니다: 리터럴과 속성 참조뿐만 아니라 모든 "closed expression"이 허용됩니다.

첫 번째 변경 사항은 서브표현식이나 패턴의 오른쪽에 대상 이름이 있는 모든 바인딩 작업이 `as` 키워드를 사용하도록 보장하는 일환입니다. 두 번째 변경 사항은 기존 표현식 처리 메커니즘을 재사용하여 파서와 코드 생성기 코드를 단순화하기 위한 것입니다.

#### 클래스 패턴 변경 (Changes to class patterns)

이 PEP는 PEP 634와 비교하여 클래스 패턴에 여러 가지 주목할 만한 변경 사항을 적용합니다.

*   클래스 인스턴스화와의 구문적 일치는 오해의 소지가 있고 도움이 되지 않는 것으로 판단되어 폐기되었습니다. 대신, 매핑 패턴에서 영감을 받은 새로운 전용 구문이 도입되었습니다.
*   어떤 클래스에도 작동하는 단순한 덕 타이핑(ducktyping)을 위한 새로운 전용 구문이 도입되었습니다.
*   다양한 내장 및 표준 라이브러리 유형에 대한 특별한 경우 처리는 `__match_args__` 속성이 `None`으로 설정되어 있는지 확인하는 일반적인 검사로 보완됩니다.

이러한 변경 사항은 `as` 키워드를 사용하여 바인딩 작업을 명시하고, 패턴 내에서 단순 이름 사용에 접두사를 의무화하여 의도를 명확히 하는 데 중점을 둡니다. 또한, 클래스 패턴이 속성 일치에 초점을 맞추도록 하여 클래스 인스턴스화와의 혼동을 피하고, 파이썬에서 흔히 사용되는 덕 타이핑 검사를 더 쉽게 구현할 수 있도록 합니다.

### 보류된 아이디어 (Deferred Ideas)

이 PEP는 미래에 고려할 수 있는 몇 가지 아이디어를 제시합니다.

*   **추론된 값 제약 (Inferred value constraints):** 현재 이 PEP는 추론된 동등성 및 동일성 제약을 미래에 추가할 가능성을 배제하지 않습니다.
*   **일부 필수 괄호 선택 사항화 (Making some required parentheses optional):** 현재 PEP는 잠재적인 모호함에 직면했을 때 괄호를 필수로 요구하는 경향이 있지만, 나중에 제한을 완화하는 것은 하위 호환 가능한 변경이므로 개별 사례별로 검토할 수 있습니다.
*   **복소수 리터럴을 `closed expression`으로 허용 (Accepting complex literals as closed expressions):** 현재 복소수 리터럴은 괄호로 묶어야 사용 가능하지만, 파서 수준에서 직접 처리하는 방법이 논의 중입니다.
*   **패턴 매칭에서 부정 제약 허용 (Allowing negated constraints in match patterns):** `!= expr` 또는 `is not expr`와 같은 부정 제약을 허용하는 것이 논의되었으나, 충분히 자주 사용될지는 불분명하여 보류되었습니다.
*   **패턴 매칭에서 멤버십 확인 허용 (Allowing membership checks in match patterns):** `in container`와 같은 멤버십 확인 구문을 패턴 매칭에 추가하는 것이 제안되었으나, 별도의 제안으로 연기되었습니다. 이는 `match` 문이 언어에 가치 있는 추가가 되는 데 필수적이지 않기 때문입니다.
*   **인스턴스 속성 제약에 대한 기본 타입 추론 (Inferring a default type for instance attribute constraints):** `object{.ATTR}`에서 `object`를 생략하고 `{.ATTR}`로 작성할 수 있도록 하는 아이디어가 논의되었으나, 매핑 패턴과 인스턴스 속성 패턴을 시각적으로 구분하기 어렵게 만들 수 있어 보류되었습니다.
*   **시퀀스 패턴의 특별한 경우 피하기 (Avoiding special cases in sequence patterns):** `str`, `bytes`, `bytearray`가 시퀀스 패턴에 절대 매치되지 않도록 특별 처리하는 것을 `collections.abc.AtomicSequence`와 같은 새로운 추상 베이스 클래스를 정의하여 제거하는 방안이 논의되었습니다.
*   **인스턴스에서 여러 속성을 검색하는 표현식 구문 (Expression syntax to retrieve multiple attributes from an instance):** `host, port = obj{.host, .port}`와 같이 단일 표현식으로 객체에서 여러 속성을 검색하는 일반적인 구문의 기초로 인스턴스 속성 패턴 구문을 사용할 수 있다는 아이디어가 언급되었습니다.

### 거부된 아이디어 (Rejected Ideas)

이 PEP에서 거부된 아이디어는 다음과 같습니다.

*   **값 제약 및 매핑 패턴 키에서 허용되는 표현식 제한 (Restricting permitted expressions in value constraints and mapping pattern keys):** PEP 634와 같이 값 제약 및 매핑 패턴 키에서 속성 조회 및 상수 리터럴만 허용하는 것을 제한하는 것에 대한 명확한 런타임 이점이 없으므로, 이 PEP는 모든 종류의 `primary expression`과 높은 우선순위의 단항 연산자(`+`, `-`, `~`)를 허용합니다.
*   **매핑 패턴 키에 제약 접두사 마커 사용 의무화 (Requiring the use of constraint prefix markers for mapping pattern keys):** 초기 제안에서는 매핑 패턴 키에 값 제약처럼 `==`와 같은 접두사를 요구했으나, 구문적으로 노이즈가 많고 표현식의 위치만으로도 충분한 정보가 전달되므로 생략되었습니다.
*   **매핑 값 제약에서 키/값 구분자 생략 허용 (Allowing the key/value separator to be omitted for mapping value constraints):** `case {0 == 0}:`과 같이 컴파일러는 의도를 알 수 있지만, 사람이 읽기에는 "0 == 0"이라는 자명한 비교 연산으로 보일 수 있는 모호한 구문이 될 수 있으므로, 키/값 구분자(`:`)를 포함하는 것이 더 명확하다고 판단하여 허용되지 않았습니다.

### 참조 구현 (Reference Implementation)

이 PEP에 대한 참조 구현 초안은 PEP 634의 참조 구현에서 파생되었습니다.

### 변경 사항 요약 (Summary of changes relative to PEP 634)

PEP 634와 비교하여 이 PEP는 다음과 같은 주요 변경 사항을 적용합니다.

*   패턴에 `expr` 유형을 재사용하는 대신, AST에 새로운 `pattern` 유형을 정의합니다.
*   `_` (단일 밑줄)에서 `__` (이중 밑줄)로 와일드카드 패턴이 변경되고, AST에 전용 `MatchAlways` 노드를 갖습니다.
*   의도 모호성으로 인해 `value patterns` 및 `literal patterns`가 제거됩니다.
*   새로운 표현식 범주인 "closed expressions"가 도입됩니다.
*   새로운 패턴 유형인 "value constraint patterns"가 도입되고, `==` 및 `is`를 접두사 마커로 사용합니다.
*   의도 모호성으로 인해 `capture patterns`가 제거됩니다. 모든 캡처 작업은 `as` 키워드를 사용하며 `MatchAs` 또는 `MatchRestOfSequence` 노드로 표현됩니다.
*   AS 패턴의 간결성을 위해 `as NAME`은 `__ as NAME`과 동일한 의미로 허용됩니다.
*   시퀀스 패턴은 대괄호 `[]` 사용을 필수로 변경합니다.
*   매핑 패턴은 키로 임의의 `closed expression`을 허용합니다.
*   매핑 패턴의 간결성을 위해 `KEY : __ as NAME`을 `KEY as NAME`으로 단축할 수 있습니다.
*   클래스 패턴은 속성 매칭에 개별 키워드 인자 구문을 더 이상 사용하지 않고, 매핑 패턴 구문의 변형과 함께 이중 별표 구문을 사용합니다.
*   클래스 패턴은 `__match_args__`가 `None`으로 설정된 모든 클래스를 단일 위치 패턴을 받아 전체 객체와 매치하는 것으로 처리합니다.
*   덕 타이핑을 위한 전용 구문이 추가됩니다 (`MatchAttrs` 노드).

---

이 PEP 642는 최종적으로 거부되었지만, 구조적 패턴 매칭 구문의 설계 과정에서 발생할 수 있는 모호성과 이를 해결하기 위한 명시성 원칙의 중요성을 잘 보여줍니다. 실제 파이썬 3.10에 도입된 패턴 매칭은 PEP 634의 구문을 기반으로 하고 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.