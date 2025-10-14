---
title: "[Draft] PEP 638 - Syntactic Macros"
excerpt: "Python Enhancement Proposal 638: 'Syntactic Macros'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/638/
toc: true
toc_sticky: true
date: 2025-09-27 01:30:41+0900
last_modified_at: 2025-09-27 01:30:41+0900
published: true
---
> **원문 링크:** [PEP 638 - Syntactic Macros](https://peps.python.org/pep-0638/)
>
> **상태:** Draft | **유형:** Standards Track | **작성일:** 24-Sep-2020

## PEP 638 – 구문 매크로 (Syntactic Macros)

**작성자:** Mark Shannon
**상태:** 초안 (Draft)
**생성일:** 2020년 9월 24일

### 요약 (Abstract)

이 PEP는 Python에 구문 매크로(syntactic macros) 지원을 추가하는 것을 제안합니다. 매크로는 일반 라이브러리 코드로는 깔끔하게 표현할 수 없는 기능을 가능하게 하기 위해 프로그램의 일부를 변환하는 컴파일 타임(compile-time) 함수입니다.

"구문(syntactic)"이라는 용어는 이러한 종류의 매크로가 프로그램의 구문 트리(syntax tree)에서 작동함을 의미합니다. 이는 텍스트 기반 대체 매크로에서 발생할 수 있는 오번역 가능성을 줄이고, 위생적인(hygienic) 매크로 구현을 가능하게 합니다.

구문 매크로는 라이브러리가 컴파일 중에 추상 구문 트리(Abstract Syntax Tree, AST)를 수정할 수 있도록 하여, 언어 전체의 복잡성을 증가시키지 않고도 특정 도메인(domain)에 맞게 언어를 확장할 수 있는 기능을 제공합니다.

### 동기 (Motivation)

새로운 언어 기능은 논란의 여지가 많고, 파괴적이며, 때로는 분열을 초래할 수 있습니다. Python은 이제 충분히 강력하고 복잡해져서, 많은 제안된 추가 기능들이 추가적인 복잡성으로 인해 언어에 순손실을 가져올 수 있습니다.

언어 변경이 특정 패턴을 표현하기 쉽게 만들더라도 비용이 발생합니다. 각 새로운 기능은 언어를 더 커지게 만들고, 배우기 어렵게 하며, 이해하기 어렵게 만듭니다. Python은 한때 'Python이 당신의 뇌에 맞는다(Python Fits Your Brain)'고 묘사되었지만, 점점 더 많은 기능이 추가될수록 이는 덜 사실이 됩니다.

새로운 기능을 추가하는 데 드는 높은 비용 때문에, 사용자 수가 얼마나 많거나 해당 기능이 얼마나 유익한지와 상관없이 일부 사용자에게만 이점을 주는 기능을 추가하는 것은 매우 어렵거나 불가능합니다.

지난 몇 년 동안 데이터 과학(data science) 및 머신러닝(machine learning) 분야에서 Python 사용이 매우 빠르게 증가했습니다. 그러나 Python의 핵심 개발자 대부분은 데이터 과학이나 머신러닝에 대한 배경 지식이 없습니다. 이로 인해 핵심 개발자가 머신러닝을 위한 언어 확장이 가치가 있는지 판단하기가 극도로 어렵습니다.

언어 확장을 라이브러리처럼 모듈화하고 배포 가능하게 함으로써, 도메인별 확장은 해당 도메인 외부의 사용자에게 부정적인 영향을 미치지 않고 구현될 수 있습니다. 웹 개발자는 데이터 과학자와는 매우 다른 확장 세트를 원할 가능성이 높습니다. 우리는 커뮤니티가 자체적인 확장을 개발하도록 해야 합니다.

일종의 사용자 정의 언어 확장이 없다면, 언어를 간결하게 유지하려는 사람들과 자신의 도메인이나 프로그래밍 스타일에 맞는 새로운 기능을 원하는 사람들 사이에 끊임없는 갈등이 있을 것입니다.

#### 특정 도메인 라이브러리의 표현력 향상 (Improving the expressiveness of libraries for specific domains)

많은 도메인에서 라이브러리로 표현하기 어렵거나 불가능한 반복적인 패턴이 나타납니다. 매크로는 이러한 패턴을 더 간결하고 오류 발생 가능성이 적은 방식으로 표현할 수 있습니다.

#### 새로운 언어 기능 시험 (Trialing new language features)

매크로를 사용하여 잠재적인 언어 확장을 시연할 수 있습니다. 예를 들어, `with` 문과 `yield from` 표현식은 매크로를 통해 시험될 수 있었을 것입니다. 이렇게 함으로써 해당 기능들이 언어에 포함되기 전에 더 많은 테스트를 허용하여 첫 출시 시 더 높은 품질의 구현을 이끌었을 수도 있습니다.

새로운 기능이 출시되기 전에 완전히 신뢰할 수 있는지 확인하는 것은 거의 불가능합니다. `with` 및 `yield from` 기능과 관련된 버그는 출시 후 여러 해 동안 수정되었습니다.

#### 바이트코드 인터프리터의 장기적인 안정성 (Long term stability for the bytecode interpreter)

역사적으로 새로운 언어 기능은 AST를 새롭고 복잡한 바이트코드 명령어(bytecode instructions)로 순진하게 컴파일(naive compilation)하여 구현되었습니다. 이러한 바이트코드는 종종 자체적인 내부 흐름 제어(flow-control)를 가졌으며, 컴파일러에서 수행할 수 있었고, 수행했어야 할 연산을 수행했습니다.

예를 들어, 최근까지 `try - finally` 및 `with` 문의 흐름 제어는 문맥에 따라 의미가 달라지는 복잡한 바이트코드로 관리되었습니다. 이제 이러한 문 내의 제어 흐름은 컴파일러에서 구현되어 인터프리터를 더 단순하고 빠르게 만듭니다.

새로운 기능을 AST 변환으로 구현함으로써, 기존 컴파일러는 인터프리터를 수정할 필요 없이 기능에 대한 바이트코드를 생성할 수 있습니다.

CPython VM의 성능과 이식성(portability)을 개선하려면 안정적인 인터프리터가 필요합니다.

### 근거 (Rationale)

Python은 표현력이 풍부하고 배우기 쉽습니다. 가장 배우기 쉬운 널리 사용되는 프로그래밍 언어로 널리 인정받고 있습니다. 그러나 가장 유연한 언어는 아닙니다. 그 타이틀은 Lisp에 속합니다.

Lisp는 동일형(homoiconic)이므로, Lisp 프로그램이 Lisp 데이터 구조라는 의미이며, Lisp 프로그램은 Lisp 프로그램에 의해 조작될 수 있습니다. 따라서 언어의 많은 부분이 자체적으로 정의될 수 있습니다.

우리는 Lisp를 특징짓는 많은 괄호 없이 Python에서 그러한 능력을 원합니다. 다행히도, 언어가 스스로를 조작할 수 있기 위해 동일형일 필요는 없으며, 구문 분석(parsing) 후 실행 가능한 형태로 변환하기 전에 프로그램을 조작할 수 있는 능력만 있으면 됩니다.

Python은 이미 필요한 구성 요소를 가지고 있습니다. Python의 구문 트리는 `ast` 모듈을 통해 사용할 수 있습니다. 필요한 것은 컴파일러에게 매크로가 존재함을 알리는 마커와 컴파일러가 AST를 조작하기 위해 사용자 코드(user code)로 콜백(callback)할 수 있는 능력입니다.

### 명세 (Specification)

#### 구문 (Syntax)

##### 어휘 분석 (Lexical analysis)

식별자 문자(identifier characters) 시퀀스 뒤에 느낌표(`!`)가 오는 모든 시퀀스는 `MACRO_NAME`으로 토큰화됩니다.

##### Statement (문) 형식

```
macro_stmt = MACRO_NAME testlist [ "import" NAME ] [ "as" NAME ] [ ":" NEWLINE suite ]
```


##### Expression (표현식) 형식

```
macro_expr = MACRO_NAME "(" testlist ")"
```


##### 모호성 해결 (Resolving ambiguity)

매크로의 문(statement) 형식이 우선순위를 가집니다. 따라서 코드 `macro_name!(x)`는 매크로 표현식을 포함하는 표현식 문이 아니라 매크로 문으로 구문 분석됩니다.

#### 의미 (Semantics)

##### 컴파일 (Compilation)

바이트코드(bytecode)로 변환하는 동안 매크로를 만나면, 코드 생성기는 해당 매크로에 등록된 매크로 프로세서(macro processor)를 찾아 매크로에 뿌리를 둔 AST를 프로세서 함수에 전달합니다. 반환된 AST는 원래 트리를 대체하게 됩니다.

여러 이름을 가진 매크로의 경우, 여러 트리가 매크로 프로세서에 전달되지만, 하나만 반환되어 대체되어 포함하는 문 블록을 단축합니다.

이 과정은 매크로가 다른 매크로를 포함하는 AST 노드를 반환할 수 있도록 반복될 수 있습니다.

컴파일러는 해당 매크로에 도달할 때까지 매크로 프로세서를 찾지 않으므로, 내부 매크로는 프로세서를 등록할 필요가 없습니다. 예를 들어, `switch` 매크로에서 `case` 및 `default` 매크로는 `switch` 프로세서에 의해 제거되므로 프로세서를 등록할 필요가 없습니다.

매크로 정의를 임포트(import)할 수 있도록, `import!` 및 `from!` 매크로가 사전 정의됩니다. 이들은 다음 구문을 지원합니다.

```
"import!" dotted_name "as" name
"from!" dotted_name "import" name [ "as" name ]
```


`import!` 매크로는 `dotted_name`의 컴파일 타임 임포트를 수행하여 매크로 프로세서를 찾은 다음, 현재 컴파일 중인 스코프(scope)에 `name`으로 등록합니다.

`from!` 매크로는 `dotted_name.name`의 컴파일 타임 임포트를 수행하여 매크로 프로세서를 찾은 다음, 현재 컴파일 중인 스코프에 `name`으로 등록합니다("as" 뒤에 이름이 있는 경우 해당 이름을 사용).

`import!` 및 `from!`은 임포트가 존재하는 스코프에 대해서만 매크로를 정의하므로, 명확성을 높이기 위해 매크로의 모든 사용은 명시적인 `import!` 또는 `from!` 앞에 와야 합니다.

예를 들어, "my.compiler"에서 "compile" 매크로를 임포트하려면:

```python
from! my.compiler import compile
```


##### 매크로 프로세서 정의 (Defining macro processors)

매크로 프로세서는 `(func, kind, version, additional_names)`로 구성된 네 가지 튜플로 정의됩니다.

- `func`: `len(additional_names)+1`개의 인자(모두 추상 구문 트리)를 취하고 하나의 추상 구문 트리를 반환하는 호출 가능(callable) 객체여야 합니다.
- `kind`: 다음 중 하나여야 합니다.
    - `macros.STMT_MACRO`: 매크로의 본문(body)이 들여쓰기된 문 매크로입니다. 이는 추가 이름을 가질 수 있는 유일한 형식입니다.
    - `macros.SIBLING_MACRO`: 매크로의 본문이 같은 블록 내의 다음 문인 문 매크로입니다. 다음 문이 매크로의 본문으로 이동합니다.
    - `macros.EXPR_MACRO`: 표현식 매크로입니다.
- `version`: 매크로의 버전을 추적하는 데 사용되며, 생성된 바이트코드를 올바르게 캐시(cache)할 수 있도록 합니다. 정수여야 합니다.
- `additional_names`: 매크로의 추가 부분 이름이며, 문자열 튜플이어야 합니다.

예시:
```python
# (func, _ast.STMT_MACRO, VERSION, ())
stmt_macro!: multi_statement_body

# (func, _ast.SIBLING_MACRO, VERSION, ())
sibling_macro! single_statement_body

# (func, _ast.EXPR_MACRO, VERSION, ())
x = expr_macro!(...)

# (func, _ast.STMT_MACRO, VERSION, ("subsequent_macro_part",))
multi_part_macro!: multi_statement_body
subsequent_macro_part!: multi_statement_body
```


컴파일러는 사용된 구문이 선언된 `kind`와 일치하는지 확인합니다.

편의를 위해 `macros` 모듈에는 함수를 매크로 프로세서로 표시하는 `macro_processor` 데코레이터(decorator)가 제공됩니다.

```python
def macro_processor(kind, version, *additional_names):
    def deco(func):
        return func, kind, version, additional_names
    return deco
```


이는 매크로 프로세서를 선언하는 데 도움이 될 수 있습니다. 예를 들어:

```python
@macros.macro_processor(macros.STMT_MACRO, 1_08)
def switch(astnode):
    ...
```


##### AST 확장 (AST extensions)

매크로를 표현하기 위해 `macro_stmt`와 `macro_expr`이라는 두 개의 새로운 AST 노드가 필요합니다.

```python
class macro_stmt(_ast.stmt):
    _fields = "name", "args", "importname", "asname", "body"

class macro_expr(_ast.expr):
    _fields = "name", "args"
```


또한, 매크로 프로세서는 값을 생성하는 제어 흐름 또는 부수 효과(side-effecting) 코드를 표현할 수단이 필요합니다. 문(statement)과 표현식(expression)을 결합하는 `stmt_expr`이라는 새로운 AST 노드가 추가될 것입니다. 이 새로운 AST 노드는 `expr`의 하위 타입(subtype)이지만, 부수 효과를 허용하는 문을 포함합니다. 이는 문을 컴파일한 다음 값을 컴파일하여 바이트코드로 컴파일됩니다.

```python
class stmt_expr(_ast.expr):
    _fields = "stmt", "value"
```


##### 위생 및 디버깅 (Hygiene and debugging)

매크로 프로세서는 종종 새로운 변수를 생성해야 합니다. 이러한 변수는 원래 코드와 다른 매크로를 오염시키지 않도록 이름을 지정해야 합니다. 명명 규칙이 강제되지는 않지만, 위생을 보장하고 디버깅을 돕기 위해 다음 명명 체계가 권장됩니다.

- 생성된 모든 변수 이름은 `$`로 시작해야 합니다.
- 순수하게 인위적인 변수 이름은 `$$mname`으로 시작해야 하며, 여기서 `mname`은 매크로의 이름입니다.
- 실제 변수에서 파생된 변수는 `$vname`으로 시작해야 하며, 여기서 `vname`은 변수의 이름입니다.
- 모든 변수 이름은 줄 번호와 열 오프셋(underscore로 구분)을 포함해야 합니다.

예시:
- 순수하게 생성된 이름: `$$macro_17_0`
- 표현식 매크로의 변수에서 파생된 이름: `$var_12_5`

### 예시 (Examples)

#### 컴파일 타임 검사 데이터 구조 (Compile-time-checked data structures)

Python에서 데이터 테이블을 큰 딕셔너리로 인코딩하는 것은 일반적입니다. 그러나 이것들은 유지 관리하기 어렵고 오류가 발생하기 쉽습니다. 매크로는 이러한 데이터를 더 읽기 쉬운 형식으로 작성할 수 있도록 합니다. 그런 다음 컴파일 타임에 데이터를 확인하고 효율적인 형식으로 변환할 수 있습니다.

예를 들어, 코드와 이름 사이의 매핑을 하는 두 개의 딕셔너리 리터럴이 있다고 가정해 봅시다. 딕셔너리에 중복 키가 있거나 한 테이블이 다른 테이블의 역이 아닐 수 있으므로 이것은 오류 발생 가능성이 있습니다. 매크로는 단일 테이블에서 두 매핑을 생성하고 동시에 중복이 없는지 확인할 수 있습니다.

```python
color_to_code = {
    "red": 1,
    "blue": 2,
    "green": 3,
}
code_to_color = {
    1: "red",
    2: "blue",
    3: "yellow", # error
}
```


이것은 다음과 같이 될 수 있습니다.

```python
bijection! color_to_code, code_to_color:
    "red" = 1
    "blue" = 2
    "green" = 3
```


#### 도메인별 확장 (Domain-specific extensions)

매크로가 진정한 가치를 발휘하는 곳은 일반적인 언어 기능이 아니라 특정 도메인이라고 생각합니다.

예를 들어, 파서(parser)의 경우. 다음은 매크로를 사용하여 Python에 대한 파서 정의의 일부입니다.

```python
choice! single_input:
    NEWLINE
    simple_stmt
sequence!: compound_stmt NEWLINE
```


#### 컴파일러 (Compilers)

Numba와 같은 런타임 컴파일러는 Python 소스를 재구성하거나 바이트코드를 분석하려고 시도해야 합니다. AST를 직접 얻는 것이 더 간단하고 신뢰할 수 있습니다.

```python
from! my.jit.library import jit
jit! def func():
    ...
```


#### 기호 표현식 일치 (Matching symbolic expressions)

Python AST 노드 또는 SymPy 표현식과 같이 구문을 나타내는 것을 일치시킬 때, 데이터 구조 자체 대신 실제 구문에 대해 일치시키는 것이 편리합니다. 예를 들어, 계산기는 구문을 일치시키기 위한 도메인별 매크로를 사용하여 구현될 수 있습니다.

```python
from! ast_matcher import match

def calculate(node):
    if isinstance(node, Num):
        return node.n
    match! node:
        case! a + b:
            return calculate(a) + calculate(b)
        case! a - b:
            return calculate(a) - calculate(b)
        case! a * b:
            return calculate(a) * calculate(b)
        case! a / b:
            return calculate(a) / calculate(b)
```


이는 다음과 같이 변환될 수 있습니다.

```python
def calculate(node):
    if isinstance(node, Num):
        return node.n
    $$match_4_0 = node
    if isinstance($$match_4_0, _ast.Add):
        a, b = $$match_4_0.left, $$match_4_0.right
        return calculate(a) + calculate(b)
    elif isinstance($$match_4_0, _ast.Sub):
        a, b = $$match_4_0.left, $$match_4_0.right
        return calculate(a) - calculate(b)
    elif isinstance($$match_4_0, _ast.Mul):
        a, b = $$match_4_0.left, $$match_4_0.right
        return calculate(a) * calculate(b)
    elif isinstance($$match_4_0, _ast.Div):
        a, b = $$match_4_0.left, $$match_4_0.right
        return calculate(a) / calculate(b)
```


#### 제로 비용 마커 및 주석 (Zero-cost markers and annotations)

데코레이터(decorator) 또는 PEP 3107 함수 주석과 같은 주석(annotations)은 검사기를 위한 마커(marker) 역할을 하거나 문서화 용도로만 사용되더라도 런타임(runtime) 비용이 발생합니다.

```python
@do_nothing_marker
def foo(...):
    ...
```


위 코드는 다음과 같은 제로 비용 매크로로 대체될 수 있습니다.

```python
do_nothing_marker!: def foo(...):
    ...
```


#### 언어 확장 프로토타이핑 (Prototyping language extensions)

매크로가 도메인별 확장에 가장 가치가 있겠지만, 매크로를 사용하여 가능한 언어 확장을 시연할 수 있습니다.

##### f-strings:

`f-string` `f"..."`는 `f!("...")`와 같은 매크로로 구현될 수 있습니다. 읽기에는 그다지 좋지 않지만, 실험에는 여전히 유용할 것입니다.

##### Try finally 문:

```python
try_!: body
finally!: closing
```


위 코드는 대략 다음과 같이 번역될 것입니다.

```python
try:
    body
except:
    closing
else:
    closing
```


참고: `return`, `break`, `continue`를 올바르게 처리하는 데 주의해야 합니다. 위 코드는 단지 설명적인 예시입니다.

##### With 문:

```python
with! open(filename) as fd:
    return fd.read()
```


위 코드는 `open`을 특별히 처리해야 합니다. 더 명시적인 대안은 다음과 같습니다.

```python
with! open!(filename) as fd:
    return fd.read()
```


#### 매크로 정의 매크로 (Macro definition macros)

구문 매크로를 가진 언어는 일반적으로 매크로를 정의하기 위한 매크로를 제공합니다. 이 PEP는 좋은 디자인이 무엇인지 아직 명확하지 않고 커뮤니티가 자체 매크로를 정의할 수 있도록 허용하기를 원하므로 의도적으로 이를 수행하지 않습니다.

한 가지 가능한 형태는 다음과 같습니다.

```python
macro_def! name:
    input: ... # input pattern, defining meta-variables
    output: ... # output pattern, using meta-variables
```


### 하위 호환성 (Backwards Compatibility)

이 PEP는 완전히 하위 호환됩니다.

### 성능 영향 (Performance Implications)

매크로를 사용하지 않는 코드의 경우 성능에 영향이 없습니다.

매크로를 사용하고 이미 바이트코드로 컴파일된 코드의 경우, 코드를 컴파일하는 데 사용된 매크로 버전이 임포트된 매크로 프로세서와 일치하는지 확인하는 데 약간의 오버헤드(overhead)가 있습니다.

컴파일되지 않았거나 다른 버전의 매크로 프로세서로 컴파일된 코드의 경우, 일반적인 바이트코드 컴파일 오버헤드와 매크로 처리의 추가 오버헤드가 발생할 것입니다.

소스 코드에서 바이트코드 컴파일 속도는 Python 성능에 대체로 관련이 없다는 점에 주목할 필요가 있습니다.

### 구현 (Implementation)

컴파일 타임에 Python 코드에 의한 AST 변환을 허용하기 위해, 컴파일러의 모든 AST 노드는 Python 객체여야 합니다.

이를 효율적으로 수행하려면 `_ast` 모듈의 모든 노드를 변경 불가능(immutable)하게 만들어 성능 저하를 크게 줄여야 합니다. AST가 사이클릭 GC(Cyclic GC)를 지원할 필요가 없도록 트리 상태를 유지하려면 변경 불가능해야 합니다. 변경 불가능하게 만들면 `__dict__` 속성이 없어져서 컴팩트해집니다.

`ast` 모듈의 AST 노드는 변경 가능(mutable)한 상태로 유지됩니다.

현재 모든 AST 노드는 아레나 할당자(arena allocator)를 사용하여 할당됩니다. 표준 할당자를 사용하도록 변경하면 컴파일 속도가 약간 느려질 수 있지만, 많은 코드를 삭제할 수 있으므로 유지 관리 측면에서 이점이 있습니다.

### 참고 구현 (Reference Implementation)

아직 없습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.