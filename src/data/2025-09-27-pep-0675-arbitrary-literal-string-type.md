---
title: "[Final] PEP 675 - Arbitrary Literal String Type"
excerpt: "Python Enhancement Proposal 675: 'Arbitrary Literal String Type'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/675/
toc: true
toc_sticky: true
date: 2025-09-27 10:08:22+0900
last_modified_at: 2025-09-27 10:08:22+0900
published: true
---
> **원문 링크:** [PEP 675 - Arbitrary Literal String Type](https://peps.python.org/pep-0675/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 30-Nov-2021

PEP 675: 임의의 리터럴 문자열 타입 (Arbitrary Literal String Type)

## 개요 (Abstract)

현재 Python에서는 특정 리터럴 문자열(예: `Literal["foo"]`)이 아닌, "어떤" 리터럴 문자열 타입이든 허용하는 함수 매개변수를 타입 어노테이션으로 지정할 방법이 없습니다. 이 PEP는 리터럴 문자열 타입들의 슈퍼타입인 `LiteralString`을 도입합니다. 이를 통해 함수가 `Literal["foo"]` 또는 `Literal["bar"]`와 같은 임의의 리터럴 문자열 타입을 받아들일 수 있게 됩니다.

## 동기 (Motivation)

SQL 또는 셸 명령어를 실행하는 강력한 API는 종종 임의의 사용자 제어 문자열이 아닌, *리터럴 문자열*로 호출될 것을 권장합니다. 그러나 현재 타입 시스템에는 이러한 권장 사항을 표현할 방법이 없어, 개발자가 이를 따르지 않을 경우 보안 취약점이 발생하곤 합니다.

**문제 사례: SQL Injection**

예를 들어, 사용자 ID를 받아 데이터베이스에서 레코드를 조회하는 일반적인 방법은 다음과 같습니다:

```python
def query_user(conn: Connection, user_id: str) -> User:
    query = f"SELECT * FROM data WHERE user_id = {user_id}"
    conn.execute(query)
    # ...
```

`user_id`가 사용자 제어 데이터이므로, 악의적인 사용자는 SQL 인젝션 공격을 시도할 수 있습니다. 예를 들어, `user_id`에 `"user123; DROP TABLE data;"`를 전달하면 테이블이 삭제될 수 있습니다.

SQL API는 이러한 공격을 방지하기 위해 매개변수화된 쿼리(parameterized queries)를 제공하여 쿼리 실행과 사용자 제어 데이터를 분리합니다.

```python
def query_user(conn: Connection, user_id: str) -> User:
    query = "SELECT * FROM data WHERE user_id = ?"
    conn.execute(query, (user_id,))
    # ...
```

문제는 이러한 원칙을 강제할 방법이 없다는 것입니다. `sqlite3`의 문서조차 외부 입력으로 `sql` 인수를 동적으로 구성하지 말라고 권고할 뿐, 타입 시스템을 통해 이를 표현할 수 없습니다. 결과적으로 사용자들은 여전히 편리한 f-string을 사용하여 코드를 SQL 인젝션에 취약하게 만들 수 있습니다.

기존 보안 린터(예: Bandit)는 SQL API에서 안전하지 않은 외부 데이터를 탐지하려고 시도하지만, 여러 줄 쿼리를 변수에 저장하거나 조건에 따라 리터럴 문자열을 추가하는 등 일반적인 코딩 관용구를 방해할 수 있습니다.

**`LiteralString`의 해결책:**

`LiteralString` 타입은 리터럴로 구성된 것으로 알려진 문자열 값만 허용합니다. 이는 PEP 586의 `Literal["foo"]` 타입의 일반화된 형태입니다. `LiteralString` 타입의 문자열은 사용자 제어 데이터를 포함할 수 없으므로, `LiteralString`만 허용하는 API는 인젝션 취약점으로부터 안전합니다 (실용적인 한계 내에서).

`sqlite3`의 `execute` 메서드가 사용자 입력으로 만들어진 문자열을 허용하지 않도록, `typeshed` 스텁에서 SQL 쿼리가 `LiteralString` 타입임을 명시할 수 있습니다.

```python
from typing import LiteralString
def execute(self, sql: LiteralString, parameters: Iterable[str] = ...) -> Cursor: ...
```

이렇게 하면 `user_id`를 사용하는 f-string으로 구성된 `query` 변수는 `str` 타입으로 추론되어 `execute`에 전달할 수 없게 되며 타입 에러가 발생합니다.

```python
def query_user(conn: Connection, user_id: str) -> User:
    query = f"SELECT * FROM data WHERE user_id = {user_id}"
    conn.execute(query) # 에러: Expected LiteralString, got str.
    # ...
```

반면, 리터럴 문자열끼리 결합하는 안전한 패턴은 여전히 허용됩니다.

```python
def query_data(conn: Connection, user_id: str, limit: bool) -> None:
    query = """ SELECT user.name, user.age FROM data WHERE user_id = ? """
    if limit:
        query += " LIMIT 1" # LiteralString을 추가했으므로 여전히 LiteralString 타입.
    conn.execute(query, (user_id,)) # OK
```

사용자는 SQL 코드를 변경할 필요 없이 타입 체커가 리터럴 문자열 타입을 추론하고 위반 시에만 경고하게 됩니다.

`LiteralString`은 셸 명령어 구축, HTML 응답 렌더링 시 이스케이프 없이 문자열 사용 등 엄격한 명령-데이터 분리가 필요한 다른 경우에도 유용합니다 (부록 A 참조).

### 사용 통계 (Usage statistics)

`sqlite3`를 사용하는 오픈 소스 프로젝트 샘플에서 `conn.execute` 호출 중 약 67%는 안전한 문자열 리터럴로, 약 33%는 잠재적으로 안전하지 않은 로컬 문자열 변수로 이루어졌습니다. 이 PEP의 `LiteralString` 타입을 타입 체커와 함께 사용하면 33% 중 사용자 제어 데이터가 쿼리에 통합된 부분을 방지할 수 있습니다.

## 근거 (Rationale)

**왜 보안 취약점 방지에 타입을 사용해야 하는가?**

*   **문서 경고는 불충분** : 대부분의 사용자는 경고를 보지 않거나 무시합니다.
*   **기존 동적/정적 분석은 너무 제한적** : 자연스러운 코딩 관용구를 막습니다.
*   **타이핑 기반 접근 방식** : 엄격함과 유연성 사이의 균형을 맞춥니다.

**런타임(Runtime) 접근 방식의 한계** : 런타임에는 쿼리 문자열이 일반 `str`이므로, 휴리스틱(heuristics)으로 일부 악용을 막을 수 있지만, 항상 우회할 방법이 있습니다.

**정적(Static) 접근 방식의 한계** : AST를 확인하는 정적 분석은 문자열이 중간 변수에 할당되거나 안전한 함수에 의해 변환될 때를 구별할 수 없어 지나치게 제한적입니다.

**타입 체커(Type Checker)의 장점** : 타입 체커는 런타임 또는 정적 분석에서 사용할 수 없는 정보(예: 표현식이 `Literal["foo"]`와 같은 리터럴 문자열 타입인지 여부)에 접근할 수 있으며, 변수 할당이나 함수 호출 전반에 걸쳐 타입을 전파합니다.

**`LiteralString`의 개념** : `LiteralString`은 모든 리터럴 문자열 타입의 "슈퍼타입"입니다. 이는 `Literal["foo"]`와 `str` 사이에 타입 계층 구조를 도입합니다.

*   `Literal["foo"]` 또는 `Literal["bar"]`와 같은 특정 리터럴 문자열은 `LiteralString`과 호환되지만, 그 반대는 아닙니다.
*   `LiteralString`의 슈퍼타입은 `str`입니다. 따라서 `LiteralString`은 `str`과 호환되지만, 그 반대는 아닙니다.
*   리터럴 타입들의 `Union` 또한 `LiteralString`과 호환됩니다 (예: `Literal["foo", "bar"]`).

**리터럴 문자열의 조합** : `x`와 `y`가 `LiteralString` 타입인 경우, `x + y`도 `LiteralString`과 호환되는 타입이 됩니다. 이는 `Literal["foo"]`와 `Literal["bar"]`를 더하면 `Literal["foobar"]`가 되므로 `LiteralString`과 호환된다는 식으로 추론할 수 있습니다. 이 원리는 리터럴 타입의 `Union`에도 적용됩니다.

이러한 방식으로, API가 리터럴로만 구성된 것으로 알려진 문자열만 허용하도록 지정할 수 있습니다.

## 명세 (Specification)

### 런타임 동작 (Runtime Behavior)

`LiteralString`은 `typing.py`에 추가되며, `typing.NoReturn`과 유사하게 구현됩니다. `LiteralString`은 타입 검사를 위해서만 사용되는 특별한 형태입니다. 런타임에 `type(<expr>)`이 `LiteralString`을 생성하는 표현식은 없습니다. 따라서 `str`의 서브클래스로 지정되지 않습니다.

### `LiteralString`의 유효한 위치 (Valid Locations for LiteralString)

`LiteralString`은 다른 타입이 사용될 수 있는 모든 곳에 사용될 수 있습니다.

*   변수 어노테이션: `variable_annotation: LiteralString`
*   함수 매개변수 및 반환 타입: `def my_function(literal_string: LiteralString) -> LiteralString: ...`
*   클래스 속성: `class Foo: my_attribute: LiteralString`
*   제네릭 타입 인수: `type_argument: List[LiteralString]`
*   `TypeVar` 바운드: `T = TypeVar("T", bound=LiteralString)`

단, `Literal` 타입의 `Union` 내부에 중첩될 수 없습니다 (예: `Literal["hello", LiteralString]` 또는 `Literal[LiteralString]`은 허용되지 않습니다).

### 타입 추론 (Type Inference)

**`LiteralString` 추론 규칙:**

*   모든 리터럴 문자열 타입은 `LiteralString`과 호환됩니다 (예: `x: LiteralString = "foo"`는 유효합니다).
*   **덧셈** : `x`와 `y`가 모두 `LiteralString`과 호환되면 `x + y`는 `LiteralString` 타입입니다.
*   **조인** : `sep.join(xs)`는 `sep`이 `LiteralString`과 호환되고 `xs`가 `Iterable[LiteralString]`과 호환되면 `LiteralString` 타입입니다.
*   **복합 할당 (in-place addition)** : `s`가 `LiteralString` 타입이고 `x`가 `LiteralString`과 호환되면, `s += x`는 `s`의 타입을 `LiteralString`으로 유지합니다.
*   **문자열 포매팅** : f-string은 구성 요소 표현식들이 리터럴 문자열인 경우에만 `LiteralString` 타입입니다. `s.format(...)`도 `s`와 인자들이 `LiteralString`과 호환되는 경우에만 `LiteralString` 타입입니다.
*   **리터럴 유지 메서드** : 부록 C에 `LiteralString` 타입을 유지하는 `str` 메서드 목록이 있습니다.

그 외의 경우에는, 하나 이상의 구성 값이 `str`과 같은 비-리터럴 타입인 경우, 전체 타입은 `str`이 됩니다. (예: `s`가 `str` 타입이면 `"hello" + s`는 `str` 타입입니다.)

`LiteralString`은 `str` 타입과 호환되며 `str`의 모든 메서드를 상속합니다.

**예시 (Examples)**

```python
literal_string: LiteralString
s: str = literal_string # OK
literal_string: LiteralString = s # Error: Expected LiteralString, got str.
literal_string: LiteralString = "hello" # OK

# 리터럴 문자열의 덧셈:
def expect_literal_string(s: LiteralString) -> None: ...
expect_literal_string("foo" + "bar") # OK
literal_string2: LiteralString
expect_literal_string(literal_string + literal_string2) # OK
plain_string: str
expect_literal_string(literal_string + plain_string) # NOT OK.

# 리터럴 문자열을 사용한 Join:
expect_literal_string(",".join(["foo", "bar"])) # OK
xs: List[LiteralString]
expect_literal_string(literal_string.join(xs)) # OK
expect_literal_string(plain_string.join([literal_string, literal_string2])) # Not OK (구분자가 'str' 타입이기 때문)

# 복합 할당 (In-place addition):
literal_string += "foo" # OK
literal_string += plain_string # Not OK

# 리터럴 문자열을 사용한 포맷 문자열:
literal_name: LiteralString
expect_literal_string(f"hello {literal_name}") # OK
username: str
expect_literal_string(f"hello {username}") # NOT OK.

# 리터럴 정수 등 다른 리터럴 타입은 LiteralString과 호환되지 않습니다.
literal_one: Literal[1] = 1
expect_literal_string(literal_one) # Error: Expected LiteralString, got Literal[1].

# 조건문과 표현식
def return_literal_string() -> LiteralString:
    return "foo" if condition1() else "bar" # OK
```

### TypeVar 및 제네릭과의 상호작용 (Interaction with TypeVars and Generics)

`TypeVar`는 `LiteralString`에 바인딩될 수 있습니다.

```python
from typing import Literal, LiteralString, TypeVar
TLiteral = TypeVar("TLiteral", bound=LiteralString)
def literal_identity(s: TLiteral) -> TLiteral: return s

hello: Literal["hello"] = "hello"
y = literal_identity(hello) # y는 Literal["hello"]로 추론됨
s: LiteralString
y2 = literal_identity(s) # y2는 LiteralString으로 추론됨
s_error: str
literal_identity(s_error) # Error
```

`LiteralString`은 제네릭 클래스의 타입 인수로 사용될 수 있습니다.

```python
class Container(Generic[T]): ...
literal_string: LiteralString = "hello"
x: Container[LiteralString] = Container(literal_string) # OK
s: str
x_error: Container[LiteralString] = Container(s) # Not OK
```

`List`와 같은 표준 컨테이너도 예상대로 작동합니다.

### 오버로드(Overloads)와의 상호작용 (Interactions with Overloads)

`LiteralString`은 특정 `Literal["foo"]` 타입이 일치하지 않을 때 폴백(fallback) 오버로드로 사용될 수 있습니다.

```python
@overload
def foo(x: Literal["foo"]) -> int: ...
@overload
def foo(x: LiteralString) -> bool: ...
@overload
def foo(x: str) -> str: ...

x1: int = foo("foo") # 첫 번째 오버로드
x2: bool = foo("bar") # 두 번째 오버로드
s: str
x3: str = foo(s) # 세 번째 오버로드
```

## 하위 호환성 (Backwards Compatibility)

이전 Python 버전에서 사용하기 위해 `typing_extensions.LiteralString`이 추가될 예정입니다.

PEP 586과 마찬가지로, 이 PEP는 타입 체커가 리터럴 문자열로 초기화된 어노테이션 없는 변수에 대해 리터럴 문자열 타입을 추론하도록 강제하지는 않습니다. 그러나 대부분의 타입 체커는 이러한 추론을 수행하며, 그렇지 않은 경우 사용자는 `x: LiteralString = "hello"`와 같이 명시적으로 어노테이션을 추가하여 타입 체커를 도울 수 있습니다.

## 거부된 대안 (Rejected Alternatives)

### 특정 도구 X를 사용하지 않는 이유 (Why not use tool X?)

SQL 인젝션과 같은 문제를 잡는 도구는 AST 기반, 함수 레벨 분석, 오염 흐름 분석(taint flow analysis)의 세 가지 유형이 있습니다.

*   **AST 기반 도구 (예: Bandit)** : 리터럴 문자열이 아닌 SQL 쿼리에 대해 경고하지만, 안전한 SQL 쿼리도 문자열 리터럴로 동적으로 구축되는 경우가 많습니다. 이러한 도구는 개발자의 SQL 쿼리 구축 능력을 크게 제한합니다. `LiteralString`은 더 적은 제약으로 유사한 안전 보장을 제공할 수 있습니다.
*   **Semgrep 및 pyanalyze** : 함수 내에서 상수 전파를 포함한 정교한 함수 레벨 분석을 지원하여 일부 형태의 안전한 동적 SQL 쿼리를 허용합니다. 그러나 안전한 SQL 쿼리를 구성하고 반환하는 함수 호출은 처리하지 못합니다. `LiteralString`은 이러한 자연스러운 사용을 프로그래머에게 부담 없이 처리합니다.
*   **오염 흐름 분석 (예: Pysa, CodeQL)** : 사용자 제어 입력에서 SQL 쿼리로 흐르는 데이터를 추적할 수 있는 강력한 도구입니다. 하지만 CI 설정, '오염' 싱크 및 소스 정의, 개발자 교육에 상당한 오버헤드가 있습니다. 또한 실행 시간이 타입 체커보다 길어 피드백이 즉각적이지 않습니다. 마지막으로, 취약점 방지의 부담을 라이브러리 사용자에게 전가하는 반면 `LiteralString`은 라이브러리 자체가 API 호출 방식을 정확하게 지정할 수 있도록 합니다.

전용 도구 대신 새 타입을 선호하는 한 가지 이유는 타입 체커가 전용 보안 도구보다 훨씬 널리 사용된다는 점입니다. 타입 체커에 보안 기능이 내장되면 더 많은 개발자가 혜택을 받을 수 있습니다.

### `str`에 `NewType`을 사용하지 않는 이유 (Why not use a NewType for str?)

`LiteralString`이 적합한 모든 API는 `NewType("SafeSQL", str)`와 같이 Python 타입 시스템 내에서 생성된 다른 타입을 받아들이도록 업데이트될 수 있습니다.

```python
SafeSQL = NewType("SafeSQL", str)
def execute(self, sql: SafeSQL, parameters: Iterable[str] = ...) -> Cursor: ...
execute(SafeSQL("SELECT * FROM data WHERE user_id = ?"), user_id) # OK
```

그러나 사용자가 사용자 제어 문자열을 새로운 타입으로 강제 변환하여 전달하는 것을 막을 수 없습니다.

```python
query = f"SELECT * FROM data WHERE user_id = f{user_id}"
execute(SafeSQL(query)) # 오류 없음!
```

이는 Django의 `SafeString`과 `mark_safe`가 CVE-2020-13596과 같은 문제를 발생시킨 사례에서도 볼 수 있습니다. 또한, `NewType`은 소스 코드에 침투적인 변경(쿼리를 `SafeSQL`로 래핑)을 요구하지만, `LiteralString`은 그러한 변경을 요구하지 않습니다.

### Trusted Types 에뮬레이션을 시도하지 않는 이유 (Why not try to emulate Trusted Types?)

Trusted Types는 DOM 기반 XSS를 방지하기 위한 W3C 명세입니다. Python에 Trusted Types 개념을 도입하는 것을 고려할 수 있지만, 근본적인 차이점은 Trusted Types 새니타이저(sanitizer)의 출력은 일반적으로 실행 가능한 코드가 아니라는 점입니다. SQL 쿼리나 셸 명령어는 최종 결과가 여전히 실행 가능한 코드여야 하므로, 입력 문자열의 어느 부분이 안전하고 어느 부분이 악의적인지 안정적으로 파악하는 새니타이저를 작성할 방법이 없습니다.

### 런타임 체크 가능한 `LiteralString` (Runtime Checkable LiteralString)

`LiteralString` 개념을 정적 타입 검사 이상으로 확장하여 `str` 객체의 런타임 체크 가능한 속성으로 만들 수도 있습니다. 이는 프레임워크가 동적 문자열에 대해 오류를 발생시키도록 허용하는 등의 이점을 제공할 수 있습니다. 그러나 이 확장은 Python의 가장 근본적인 타입 중 하나에 대한 변경을 요구하므로 제안의 범위를 극적으로 증가시킵니다.

### 거부된 이름 (Rejected Names)

`LiteralString` 외에 `Literal[str]`, `LiteralStr`, `LiteralDerivedString`, `StringLiteral`, `SafeString`, `ConstantStr`, `StaticStr`, `LiteralOnly[str]` 등 다양한 이름이 고려되었지만, 각각의 문제점(혼동 가능성, 장황함, 오해의 소지 등)으로 인해 `LiteralString`이 선택되었습니다.

### LiteralBytes

`LiteralBytes`와 같이 리터럴 바이트 타입을 일반화하는 것도 가능하지만, `LiteralString`만큼 사용 빈도가 높지 않고 사용자 요구가 많지 않아 이 PEP에는 포함되지 않았습니다.

## 참조 구현 (Reference Implementation)

Pyre v0.9.8에 구현되어 활발하게 사용 중입니다. 구현은 단순히 타입 체커를 확장하여 `LiteralString`을 리터럴 문자열 타입의 슈퍼타입으로 추가합니다. 덧셈, 조인 등을 통한 조합을 지원하기 위해 `typeshed`의 `str` 스텁을 오버로드하는 것으로 충분했습니다.

## 부록 A: 다른 용례 (Other Uses)

`LiteralString`은 SQL 인젝션 외에도 다양한 종류의 인젝션 취약점을 방지하는 데 사용될 수 있습니다.

*   **명령어 인젝션 (Command Injection)** : `subprocess.run`과 같은 API가 사용자 제어 데이터를 포함하는 셸 명령어를 실행할 때 발생할 수 있는 취약점을 방지합니다.
    ```python
    # 수정된 stub (예시)
    def run(command: LiteralString, *args: str, shell: bool=...): ...
    ```
*   **크로스 사이트 스크립팅 (XSS)** : Django의 `mark_safe`나 Jinja2의 `do_mark_safe`와 같이 자동 이스케이핑을 우회하는 함수가 사용자 입력으로 XSS 취약점을 유발할 수 있는 것을 방지합니다.
    ```python
    # 수정된 stub (예시)
    def mark_safe(s: LiteralString) -> str: ...
    ```
*   **서버 사이드 템플릿 인젝션 (SSTI)** : Jinja와 같은 템플릿 프레임워크에서 공격자가 템플릿 문자열을 제어하여 임의 코드를 실행할 수 있는 취약점을 방지합니다.
    ```python
    # 수정된 stub (예시)
    class Template:
        def __init__(self, source: LiteralString): ...
    ```
*   **로깅 포맷 문자열 인젝션 (Logging Format String Injection)** : 로깅 프레임워크가 입력 문자열에 포매팅 지시어를 허용할 때, 외부에서 제어되는 로깅 문자열로 인해 서비스 거부(DoS) 공격이 발생할 수 있는 것을 방지합니다.
    ```python
    # 수정된 stub (예시)
    def info(msg: LiteralString, *args: object) -> None: ...
    ```

## 부록 B: 한계 (Limitations)

`LiteralString`이 사용자가 리터럴이 아닌 데이터로 구성된 문자열을 API에 전달하는 것을 막지 못할 수 있는 몇 가지 방법이 있습니다.

1.  개발자가 타입 체커를 사용하지 않거나 타입 어노테이션을 추가하지 않는 경우, 위반 사항이 감지되지 않습니다.
2.  `cast(LiteralString, non_literal_string)`를 사용하여 타입 체커를 속이고 동적 문자열 값을 `LiteralString`인 것처럼 위장할 수 있습니다. `Any` 타입의 변수도 마찬가지입니다.
3.  `# type: ignore`와 같은 주석을 사용하여 비-리터럴 문자열에 대한 경고를 무시할 수 있습니다.
4.  `str`을 `LiteralString`으로 변환하는 사소한 함수를 구성할 수 있습니다.

이러한 한계는 린팅, 코드 리뷰 등을 통해 완화될 수 있지만, 궁극적으로 `LiteralString`이 제공하는 보호 기능을 우회하려는 악의적인 개발자는 항상 성공할 것입니다. `LiteralString`은 악의적인 개발자로부터 보호하기 위한 것이 아니라, 선량한 개발자가 민감한 API를 우발적으로 위험하게 사용하는 것을 방지하기 위한 것입니다.

`LiteralString`이 없으면 API 작성자가 가질 수 있는 최선의 강제 도구는 문서뿐이며, 이는 쉽게 무시되고 종종 보이지 않습니다. `LiteralString`을 사용하면 API 오용은 의식적인 사고와 코드 내에서 검토자와 미래 개발자가 알아챌 수 있는 아티팩트를 요구합니다.

## 부록 C: `LiteralString`을 보존하는 `str` 메서드 (`str` methods that preserve LiteralString)

`str` 클래스에는 `LiteralString` 타입이 이점을 얻을 수 있는 여러 메서드가 있습니다. 예를 들어, `"hello".capitalize()`는 `LiteralString`과 호환되는 `Literal["Hello"]` 타입으로 추론되어야 합니다. 즉, `capitalize` 메서드는 `LiteralString` 타입을 보존합니다.

`typeshed`의 `str` 스텁을 업데이트하여 `LiteralString`을 보존하는 버전으로 메서드를 오버로드할 것을 제안합니다. 이렇게 하면 타입 체커가 각 메서드에 대해 `LiteralString` 동작을 하드코딩할 필요가 없으며, 향후 새로운 메서드도 쉽게 지원할 수 있습니다.

예를 들어, `capitalize` 메서드에 대한 스텁은 다음과 같이 변경됩니다.

```python
# 변경 전
def capitalize(self) -> str: ...
# 변경 후
@overload
def capitalize(self: LiteralString) -> LiteralString: ...
@overload
def capitalize(self) -> str: ...
```

단점은 스텁이 더 복잡해지고 에러 메시지가 이해하기 어려워질 수 있다는 점입니다.

`LiteralString`을 반환하는 것으로 처리되어야 하는 `str` 메서드의 목록 (모든 인수가 `LiteralString` 타입일 때)은 PEP 원문에 상세히 나열되어 있습니다. (예: `casefold`, `center`, `join`, `lower`, `replace`, `split`, `upper`, `__add__`, `__mul__` 등).

## 부록 D: 스텁에서 `LiteralString` 사용 지침 (Guidelines for using LiteralString in Stubs)

Typeshed의 타입 스텁 작성자는 `LiteralString`을 사용할 때 주의해야 합니다.

*   **순수 함수 (pure function)** 의 스텁인 경우, 모든 해당 매개변수가 리터럴 타입(`LiteralString` 또는 `Literal["a", "b"]`)을 가질 때만 함수의 반환 타입 또는 오버로드에 `LiteralString`을 사용하는 것을 권장합니다.
    ```python
    # OK
    @overload
    def my_transform(x: LiteralString, y: Literal["a", "b"]) -> LiteralString: ...
    @overload
    def my_transform(x: str, y: str) -> str: ...

    # Not OK (x는 LiteralString이지만 y는 str이므로 반환 타입을 LiteralString으로 하면 안 됨)
    @overload
    def my_transform(x: LiteralString, y: str) -> LiteralString: ...
    ```
*   **`staticmethod`** 의 스텁인 경우 위와 동일한 지침을 권장합니다.
*   **다른 종류의 메서드** 의 스텁인 경우, 메서드 또는 오버로드의 반환 타입에 `LiteralString`을 사용하지 않는 것을 권장합니다. 모든 명시적 매개변수가 `LiteralString` 타입이더라도 객체 자체가 사용자 데이터로 생성될 수 있기 때문입니다.
*   **클래스 속성 또는 전역 변수** 의 스텁인 경우에도 `LiteralString` 사용을 권장하지 않습니다.

그러나 최종 결정은 라이브러리 작성자에게 달려 있습니다. 메서드나 함수가 반환하는 문자열 또는 속성에 저장된 문자열이 리터럴 타입임을 확신할 수 있는 경우(즉, 문자열 리터럴에 리터럴을 보존하는 `str` 연산만 적용하여 생성된 경우) `LiteralString`을 사용할 수 있습니다. 이 지침은 타입 체커가 타입을 확인할 수 있는 인라인 타입 어노테이션에는 적용되지 않습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.