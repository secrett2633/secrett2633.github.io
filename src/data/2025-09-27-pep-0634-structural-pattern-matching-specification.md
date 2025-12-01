---
title: "[Final] PEP 634 - Structural Pattern Matching: Specification"
excerpt: "Python Enhancement Proposal 634: 'Structural Pattern Matching: Specification'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/634/
toc: true
toc_sticky: true
date: 2025-09-27 01:25:49+0900
last_modified_at: 2025-09-27 01:25:49+0900
published: true
---
> **원문 링크:** [PEP 634 - Structural Pattern Matching: Specification](https://peps.python.org/pep-0634/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 12-Sep-2020

## 개요
이 문서는 Python 3.10에 도입된 `match` 문의 핵심 기능인 구조적 패턴 매칭(Structural Pattern Matching)에 대한 기술 명세를 제공합니다. PEP 634는 이전의 PEP 622를 세 부분으로 나눈 것 중 하나로, 패턴 매칭의 *구현 및 동작 방식*에 초점을 맞춥니다. 동기 및 합리적인 이유에 대해서는 PEP 635를, 개념 및 사용법에 대한 자세한 소개는 PEP 636 튜토리얼을 참조하는 것이 좋습니다.

## 추상 (Abstract)
이 PEP는 `match` 문에 대한 기술 명세를 제공합니다. 이는 PEP 622를 대체하며, PEP 622는 다음 세 부분으로 나뉘었습니다.

*   PEP 634: 명세 (Specification)
*   PEP 635: 동기 및 합리적인 이유 (Motivation and Rationale)
*   PEP 636: 튜토리얼 (Tutorial)

이 PEP는 의도적으로 설명이 배제되어 있으며, 동기 및 설계 선택에 대한 모든 설명은 PEP 635에 있습니다. 처음 접하는 독자는 개념, 구문 및 패턴의 의미론에 대한 부드러운 소개를 제공하는 PEP 636부터 시작하는 것이 좋습니다.

## 구문 및 의미론 (Syntax and Semantics)
전체 문법은 부록 A를 참조하세요.

### 개요 및 용어 (Overview and Terminology)
패턴 매칭 과정은 `case` 다음에 오는 `패턴 (pattern)`과 `match` 다음에 오는 `subject 값 (subject value)`을 입력으로 받습니다. 이 과정을 설명하는 문구로는 "패턴이 subject 값과 매치된다" 또는 "우리는 패턴을 subject 값에 매치시킨다" 등이 있습니다.

패턴 매칭의 주요 결과는 `성공 (success)` 또는 `실패 (failure)`입니다. 성공의 경우, "패턴이 성공한다", "매치가 성공한다", 또는 "패턴이 subject 값에 매치된다"고 말할 수 있습니다.

많은 경우 패턴은 하위 패턴(subpatterns)을 포함하며, 성공 또는 실패는 해당 하위 패턴을 값에 (예: OR 패턴의 경우) 또는 값의 일부에 (예: 시퀀스 패턴의 경우) 매치시키는 성공 또는 실패에 따라 결정됩니다. 이 과정은 일반적으로 전체 결과가 결정될 때까지 하위 패턴을 왼쪽에서 오른쪽으로 처리합니다. 예를 들어, OR 패턴은 첫 번째로 성공하는 하위 패턴에서 성공하는 반면, 시퀀스 패턴은 첫 번째로 실패하는 하위 패턴에서 실패합니다.

패턴 매칭의 부수적인 결과는 하나 이상의 이름 바인딩(name bindings)일 수 있습니다. "패턴이 값을 이름에 바인딩한다"고 말할 수 있습니다. 첫 번째 성공까지 시도된 하위 패턴의 경우, 성공한 하위 패턴으로 인한 바인딩만 유효합니다. 첫 번째 실패까지 시도하는 경우, 바인딩이 병합됩니다. 이 경우에 적용되는 몇 가지 추가 규칙은 아래에서 설명합니다.

### `match` 문 (The Match Statement)
`match` 문의 구문은 다음과 같습니다.

```python
match_stmt: "match" subject_expr ':' NEWLINE INDENT case_block+ DEDENT
subject_expr:
    | star_named_expression ',' star_named_expressions?
    | named_expression
case_block: "case" patterns [guard] ':' block
guard: 'if' named_expression
```

`match`와 `case` 키워드는 `소프트 키워드 (soft keywords)`입니다. 즉, 다른 문법적 맥락에서는 예약어가 아닙니다. 이는 `match` 문 또는 `case` 블록의 일부일 때만 키워드로 인식되며, 다른 모든 맥락에서는 변수 또는 인자 이름으로 사용할 수 있음을 의미합니다.

#### `match` 의미론 (Match Semantics)
`match` 문은 먼저 subject 표현식을 평가합니다. 쉼표가 있는 경우 표준 규칙을 사용하여 튜플이 생성됩니다.

결과 subject 값은 이를 성공적으로 매치하고 (있는 경우) guard 조건이 "truthy"인 첫 번째 `case` 블록을 선택하는 데 사용됩니다. 해당하는 `case` 블록이 없으면 `match` 문이 완료됩니다. 그렇지 않으면 선택된 `case` 블록의 블록이 실행됩니다. 복합 문 내부에 중첩된 블록을 실행하는 일반적인 규칙(예: `if` 문)이 적용됩니다.

성공적인 패턴 매치 중에 생성된 이름 바인딩은 실행된 블록 이후에도 유지되며 `match` 문 이후에 사용할 수 있습니다.

실패한 패턴 매치 중에도 일부 하위 패턴은 성공할 수 있습니다. 예를 들어, `(0, x, 1)` 패턴을 `[0, 1, 2]` 값과 매치할 때, 리스트 요소가 왼쪽에서 오른쪽으로 매치된다면 하위 패턴 `x`는 성공할 수 있습니다. 구현은 이러한 부분 매치에 대한 영구적인 바인딩을 만들지 여부를 선택할 수 있습니다. `match` 문을 포함하는 사용자 코드는 실패한 매치에 의해 바인딩이 생성된다는 것에 의존해서는 안 되며, 또한 변수가 실패한 매치에 의해 변경되지 않는다고 가정해서도 안 됩니다. 이 동작 부분은 의도적으로 지정되지 않아 다양한 구현이 최적화를 추가할 수 있도록 하고, 이 기능의 확장성을 제한할 수 있는 의미론적 제약을 도입하는 것을 방지합니다.

정확한 패턴 바인딩 규칙은 패턴 유형에 따라 다르며 아래에 명시됩니다.

### 가드 (Guards)
`case` 블록에 가드가 있는 경우, `case` 블록의 패턴이 성공하면 가드 내의 표현식이 평가됩니다. 이때 예외가 발생하면 예외는 위로 전파됩니다. 그렇지 않고 조건이 "truthy"이면 `case` 블록이 선택됩니다. "falsy"이면 `case` 블록은 선택되지 않습니다.

가드는 표현식이므로 부작용(side effects)을 가질 수 있습니다. 가드 평가는 첫 번째 `case` 블록부터 마지막 `case` 블록까지 하나씩 진행되어야 하며, 패턴이 모두 성공하지 않는 `case` 블록은 건너뛰어야 합니다. (즉, 해당 패턴이 성공하는지 여부를 결정하는 것이 순서에 상관없이 발생할 수 있더라도, 가드 평가는 순서대로 발생해야 합니다.) `case` 블록이 선택되면 가드 평가는 중지되어야 합니다.

### 반박할 수 없는 `case` 블록 (Irrefutable case blocks)
패턴이 구문만으로 항상 성공할 것이라고 증명할 수 있으면 `반박할 수 없는 (irrefutable)` 것으로 간주됩니다. 특히 `캡처 패턴 (capture patterns)` 및 `와일드카드 패턴 (wildcard patterns)`은 반박할 수 없으며, 왼쪽이 반박할 수 없는 AS 패턴, 적어도 하나의 반박할 수 없는 패턴을 포함하는 OR 패턴, 그리고 괄호로 묶인 반박할 수 없는 패턴도 마찬가지입니다.

가드가 없고 패턴이 반박할 수 없는 경우 `case` 블록은 반박할 수 없는 것으로 간주됩니다.

`match` 문은 최대 하나의 반박할 수 없는 `case` 블록을 가질 수 있으며, 이는 반드시 마지막에 와야 합니다.

### 패턴 (Patterns)
패턴의 최상위 구문은 다음과 같습니다.

```python
patterns: open_sequence_pattern | pattern
pattern: as_pattern | or_pattern
as_pattern: or_pattern 'as' capture_pattern
or_pattern: '|'.closed_pattern+
closed_pattern:
    | literal_pattern
    | capture_pattern
    | wildcard_pattern
    | value_pattern
    | group_pattern
    | sequence_pattern
    | mapping_pattern
    | class_pattern
```

#### AS 패턴 (AS Patterns)
구문: `as_pattern: or_pattern 'as' capture_pattern`

AS 패턴은 `as` 키워드의 왼쪽에 있는 OR 패턴을 subject에 매치시킵니다. 실패하면 AS 패턴도 실패합니다. 그렇지 않으면 AS 패턴은 subject를 `as` 키워드의 오른쪽에 있는 이름에 바인딩하고 성공합니다.

#### OR 패턴 (OR Patterns)
구문: `or_pattern: '|'.closed_pattern+`

두 개 이상의 패턴이 수직 막대(`|`)로 구분된 경우 이를 OR 패턴이라고 합니다. 단일 `closed pattern`은 그 자체입니다.

마지막 하위 패턴만 반박할 수 있습니다. 각 하위 패턴은 동일한 이름 집합을 바인딩해야 합니다.

OR 패턴은 성공하는 하위 패턴이 나올 때까지 각 하위 패턴을 순서대로 subject에 매치시킵니다. 그런 다음 OR 패턴은 성공한 것으로 간주됩니다. 하위 패턴 중 어느 것도 성공하지 못하면 OR 패턴은 실패합니다.

#### 리터럴 패턴 (Literal Patterns)
리터럴 패턴은 subject 값이 리터럴에 의해 표현된 값과 비교하여 같으면 성공합니다.

*   숫자와 문자열은 `==` 연산자를 사용하여 비교됩니다.
*   싱글톤 리터럴 `None`, `True`, `False`는 `is` 연산자를 사용하여 비교됩니다.

F-string은 지원되지 않습니다.

#### 캡처 패턴 (Capture Patterns)
구문: `capture_pattern: !"_" NAME`

단일 밑줄(`_`)은 캡처 패턴이 아닙니다. 이는 와일드카드 패턴으로 취급됩니다.

캡처 패턴은 항상 성공합니다. PEP 572의 walrus 연산자(`:=`)에 설정된 이름 바인딩 스코프 규칙을 사용하여 subject 값을 이름에 바인딩합니다.

주어진 패턴 내에서, 주어진 이름은 한 번만 바인딩될 수 있습니다.

#### 와일드카드 패턴 (Wildcard Pattern)
구문: `wildcard_pattern: "_"`

와일드카드 패턴은 항상 성공합니다. 어떤 이름도 바인딩하지 않습니다.

#### 값 패턴 (Value Patterns)
구문: `value_pattern: attr`

패턴의 점으로 구분된 이름은 표준 Python 이름 해석 규칙을 사용하여 찾아집니다. 그러나 동일한 값 패턴이 동일한 `match` 문에서 여러 번 나타나는 경우, 인터프리터는 첫 번째로 찾은 값을 캐시하고 재사용할 수 있습니다.

찾아진 값이 subject 값과 비교하여 같으면(`==` 연산자 사용) 패턴이 성공합니다.

#### 그룹 패턴 (Group Patterns)
구문: `group_pattern: '(' pattern ')'`

괄호로 묶인 패턴은 추가적인 구문을 가지지 않습니다. 사용자가 의도된 그룹화를 강조하기 위해 패턴 주위에 괄호를 추가할 수 있도록 합니다.

#### 시퀀스 패턴 (Sequence Patterns)
구문:

```python
sequence_pattern:
    | '[' [maybe_sequence_pattern] ']'
    | '(' [open_sequence_pattern] ')'
```

`[...]`를 사용하는 시퀀스 패턴과 `(...)`를 사용하는 시퀀스 패턴, 그리고 `open sequence pattern` 사이에 의미론적 차이는 없습니다.

시퀀스 패턴은 최대 하나의 `스타 하위 패턴 (star subpattern)`을 포함할 수 있으며, 이는 어떤 위치에도 올 수 있습니다. 스타 하위 패턴이 없으면 고정 길이 시퀀스 패턴이고, 그렇지 않으면 가변 길이 시퀀스 패턴입니다.

시퀀스 패턴이 성공하려면 subject는 시퀀스여야 합니다. `str`, `bytes`, `bytearray`는 일반적으로 시퀀스로 간주되지만, 위 목록에는 포함되지 않으며 시퀀스 패턴과 매치되지 않습니다.

고정 길이 시퀀스 패턴은 subject 시퀀스의 길이가 하위 패턴의 수와 같지 않으면 실패합니다. 가변 길이 시퀀스 패턴은 subject 시퀀스의 길이가 비스타 하위 패턴의 수보다 적으면 실패합니다.

#### 매핑 패턴 (Mapping Patterns)
구문:

```python
mapping_pattern: '{' [items_pattern] '}'
key_value_pattern:
    | (literal_pattern | value_pattern) ':' pattern
    | double_star_pattern
double_star_pattern: ' **' capture_pattern
```

매핑 패턴은 최대 하나의 `더블 스타 패턴 (double star pattern)`을 포함할 수 있으며, 이는 반드시 마지막에 와야 합니다. 매핑 패턴은 중복된 키 값을 포함할 수 없습니다.

매핑 패턴이 성공하려면 subject는 매핑(mapping)이어야 합니다. `dict` 및 `mappingproxy`와 같은 표준 라이브러리 클래스는 `Py_TPFLAGS_MAPPING` 비트가 설정됩니다.

매핑 패턴은 매핑 패턴에 주어진 모든 키가 subject 매핑에 존재하고, 각 키에 대한 패턴이 subject 매핑의 해당 항목과 매치될 때 성공합니다. 키는 항상 `==` 연산자로 비교됩니다. `'** ' NAME` 형식이 있는 경우, 해당 이름은 subject 매핑에서 나머지 키-값 쌍을 포함하는 `dict`에 바인딩됩니다.

키-값 쌍은 subject의 `get()` 메서드의 두 인자 형식을 사용하여 매치됩니다. 결과적으로 매치되는 키-값 쌍은 매핑에 이미 존재해야 하며, `__missing__` 또는 `__getitem__`에 의해 즉시 생성되지 않아야 합니다.

#### 클래스 패턴 (Class Patterns)
구문:

```python
class_pattern:
    | name_or_attr '(' [pattern_arguments ','?] ')'
pattern_arguments:
    | positional_patterns [',' keyword_patterns]
    | keyword_patterns
```

클래스 패턴은 동일한 키워드를 여러 번 반복할 수 없습니다. `name_or_attr`이 내장 `type`의 인스턴스가 아니면 `TypeError`가 발생합니다.

클래스 패턴은 subject가 `name_or_attr`의 인스턴스가 아니면 실패합니다. 이는 `isinstance()`를 사용하여 테스트됩니다. 인자가 없으면 `isinstance()` 검사가 성공할 때 패턴이 성공합니다.

위치 패턴이 있는 경우, 해당 패턴은 `name_or_attr`에 지정된 클래스의 `__match_args__` 속성을 사용하여 키워드 패턴으로 변환됩니다.

`bool`, `bytearray`, `bytes`, `dict`, `float`, `frozenset`, `int`, `list`, `set`, `str`, `tuple`과 같은 일부 내장 유형의 경우 위치 하위 패턴 처리가 다릅니다.

## 부작용 및 정의되지 않은 동작 (Side Effects and Undefined Behavior)
매칭 과정에 의해 명시적으로 생성되는 유일한 부작용은 이름의 바인딩입니다. 그러나 이 과정은 subject 및 그 구성 요소에 대한 속성 접근, 인스턴스 검사, `len()`, 동등성(`==`) 및 항목 접근에 의존합니다. 또한 값 패턴과 클래스 패턴의 클래스 이름을 평가합니다. 이러한 작업 중 어느 것도 일반적으로 부작용을 일으키지는 않지만, 이론적으로는 발생할 수 있습니다. 이 제안은 어떤 메서드가 호출되는지 또는 몇 번 호출되는지에 대한 어떠한 명세도 의도적으로 제외합니다. 따라서 이 동작은 정의되지 않았으며 사용자 코드는 이에 의존해서는 안 됩니다.

또 다른 정의되지 않은 동작은 (동일한 `case` 블록 내에서) 실패하는 다른 패턴이 뒤따르는 캡처 패턴에 의한 변수 바인딩입니다. 이는 구현 전략에 따라 더 빨리 또는 더 늦게 발생할 수 있으며, 유일한 제약은 캡처 변수가 명시적으로 사용하는 가드가 평가되기 전에 설정되어야 한다는 것입니다.

## 표준 라이브러리 (The Standard Library)
패턴 매칭 사용을 용이하게 하기 위해 표준 라이브러리에 몇 가지 변경 사항이 적용될 것입니다.

`namedtuple` 및 `dataclass`는 자동 생성된 `__match_args__`를 갖게 됩니다. `dataclass`의 경우, 생성된 `__match_args__`의 속성 순서는 생성된 `__init__()` 메서드의 해당 인자 순서와 동일할 것입니다. `init=False`인 필드는 `__match_args__`에서 제외됩니다.

또한, 기존 표준 라이브러리 클래스를 검토하고 유익하다고 판단되는 경우 `__match_args__`를 추가하기 위한 체계적인 노력이 이루어질 것입니다.

## 부록 A – 전체 문법 (Appendix A – Full Grammar)
`match_stmt`의 전체 문법은 PEP 원문에 상세히 기술되어 있습니다. `match` 및 `case`는 다른 문법적 맥락에서는 예약어가 아닌 소프트 키워드입니다.

---
이 문서는 PEP 634 – Structural Pattern Matching: Specification의 내용을 바탕으로 번역 및 정리되었습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.