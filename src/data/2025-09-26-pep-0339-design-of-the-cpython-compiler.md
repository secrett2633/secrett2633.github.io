---
title: "[Withdrawn] PEP 339 - Design of the CPython Compiler"
excerpt: "Python Enhancement Proposal 339: 'Design of the CPython Compiler'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/339/
toc: true
toc_sticky: true
date: 2025-09-26 18:46:48+0900
last_modified_at: 2025-09-26 18:46:48+0900
published: true
---
> **원문 링크:** [PEP 339 - Design of the CPython Compiler](https://peps.python.org/pep-0339/)
>
> **상태:** Withdrawn | **유형:** Informational | **작성일:** 02-Feb-2005


**참고:** 이 PEP는 철회되었으며 Python 개발자 가이드로 이동되었습니다.

## 개요 (Abstract)

과거(Python 2.4까지)에는 소스 코드(source code)를 바이트코드(bytecode)로 컴파일하는 과정이 두 단계로 이루어졌습니다:

1.  소스 코드를 파스 트리(parse tree)로 파싱합니다 (`Parser/pgen.c`).
2.  파스 트리를 기반으로 바이트코드를 생성합니다 (`Python/compile.c`).

이는 일반적인 컴파일러의 작동 방식과는 다릅니다. 컴파일의 일반적인 단계는 다음과 같습니다:

1.  소스 코드를 파스 트리로 파싱합니다 (`Parser/pgen.c`).
2.  파스 트리를 추상 구문 트리(Abstract Syntax Tree, AST)로 변환합니다 (`Python/ast.c`).
3.  AST를 제어 흐름 그래프(Control Flow Graph, CFG)로 변환합니다 (`Python/compile.c`).
4.  제어 흐름 그래프를 기반으로 바이트코드를 생성합니다 (`Python/compile.c`).

Python 2.5부터는 위에서 설명한 네 가지 단계가 사용됩니다. 이러한 변경은 컴파일 과정을 세 단계로 나누어 단순화하기 위해 이루어졌습니다. 이 문서는 프로세스의 마지막 세 단계가 어떻게 작동하는지 설명하는 것을 목표로 합니다.

이 문서는 컴파일에 필요한 설명을 넘어 파싱(parsing)이 작동하는 방식에 대해서는 다루지 않습니다. 또한, 전체 시스템이 작동하는 방식을 전부 다루지는 않습니다. 모든 세부 사항을 정확히 이해하려면 일부 소스 코드를 직접 읽어야 할 수도 있습니다.

## 파스 트리 (Parse Trees)

Python의 파서(parser)는 주로 "Dragon Book" [Aho86]에 설명된 구현을 기반으로 하는 LL(1) 파서입니다.

Python의 문법 파일은 `Grammar/Grammar`에서 찾을 수 있으며, 문법 규칙의 숫자 값은 `Include/graminit.h`에 저장됩니다. 토큰(token) 유형(예: `:`, 숫자 등 리터럴 토큰)의 숫자 값은 `Include/token.h`에 보관됩니다. 파스 트리는 `Include/node.h`에 정의된 `node *` 구조체들로 구성됩니다.

`node` 구조체에서 데이터를 조회하는 데는 다음 매크로(모두 `Include/token.h`에 정의됨)를 사용할 수 있습니다:

*   `CHILD(node *, int)`: 0-오프셋 인덱싱을 사용하여 노드의 n번째 자식(child)을 반환합니다.
*   `RCHILD(node *, int)`: 노드의 오른쪽에서 n번째 자식을 반환합니다. 음수를 사용합니다!
*   `NCH(node *)`: 노드가 가진 자식의 수를 반환합니다.
*   `STR(node *)`: 노드의 문자열 표현을 반환합니다. 예를 들어, `COLON` 토큰에 대해 `:`를 반환합니다.
*   `TYPE(node *)`: `Include/graminit.h`에 지정된 노드의 유형을 반환합니다.
*   `REQ(node *, TYPE)`: 노드가 예상된 유형인지 단언(assert)합니다.
*   `LINENO(node *)`: 파스 규칙 생성으로 이어진 소스 코드의 줄 번호를 검색합니다. `Python/ast.c`에 정의되어 있습니다.

이 모든 것을 예시로 들기 위해 `'while'` 규칙을 고려해 봅시다:

```
while_stmt: 'while' test ':' suite ['else' ':' suite]
```
이것을 나타내는 노드는 `TYPE(node) == while_stmt`가 되고, `else` 문(statement)의 유무에 따라 자식의 수는 4개 또는 7개가 될 수 있습니다. 첫 번째 `:`에 접근하고 이것이 실제 `:` 토큰인지 확인하려면 `(REQ(CHILD(node, 2), COLON))`과 같이 사용합니다.

## 추상 구문 트리 (Abstract Syntax Trees, AST)

추상 구문 트리(AST)는 소스 코드를 포함할 필요 없이 프로그램 구조를 고수준으로 표현한 것입니다. 소스 코드의 추상적인 표현으로 생각할 수 있습니다. AST 노드의 사양은 Zephyr Abstract Syntax Definition Language (ASDL) [Wang97]을 사용하여 지정됩니다.

Python용 AST 노드의 정의는 파일 `Parser/Python.asdl`에서 찾을 수 있습니다.

각 AST 노드(문, 표현식, 리스트 컴프리헨션(list comprehensions) 및 예외 핸들러(exception handlers)와 같은 여러 특수 유형을 나타냄)는 ASDL에 의해 정의됩니다. AST의 대부분의 정의는 `'if'` 문이나 속성 조회(attribute lookup)와 같은 특정 소스 구성 요소에 해당합니다. 이 정의는 특정 프로그래밍 언어에서의 구현과는 독립적입니다.

다음 Python ASDL 구성 요소의 일부는 접근 방식과 구문을 보여줍니다:

```
module Python {
    stmt = FunctionDef(identifier name, arguments args, stmt* body, expr* decorators)
         | Return(expr? value)
         | Yield(expr value)
         attributes (int lineno)
}
```

위의 예시는 세 가지 종류의 문(statements)을 설명합니다. 함수 정의(`FunctionDef`), 반환 문(`Return`), 그리고 yield 문(`Yield`)입니다. 세 가지 종류 모두 `|`로 구분되어 `stmt` 유형으로 간주됩니다. 이들은 모두 다양한 종류와 수의 인자(arguments)를 취합니다.

인자 유형의 수정자(modifier)는 필요한 값의 수를 지정합니다.
`?`는 선택 사항(optional)임을 의미하고, `*`는 0개 이상을 의미하며, 수정자가 없으면 인자에 대해 하나의 값만 필요하며 필수임을 의미합니다. 예를 들어, `FunctionDef`는 `name`에 대해 `identifier`, `args`에 대해 `arguments`, `body`에 대해 0개 이상의 `stmt` 인자, `decorators`에 대해 0개 이상의 `expr` 인자를 취합니다.

`arguments`와 같이 노드 유형인 것이 단일 AST 노드로 표현되며, 예상할 수 있는 `stmt`와 같은 노드 시퀀스가 아님을 주목하십시오.

세 가지 종류 모두 `attributes` 인자를 가지고 있습니다. 이는 `attributes` 앞에 `|`가 없다는 사실로 알 수 있습니다.

위의 문 정의는 다음 C 구조체 유형을 생성합니다:

```c
typedef struct _stmt *stmt_ty;
struct _stmt {
    enum { FunctionDef_kind=1, Return_kind=2, Yield_kind=3 } kind;
    union {
        struct {
            identifier name;
            arguments_ty args;
            asdl_seq *body;
        } FunctionDef;
        struct {
            expr_ty value;
        } Return;
        struct {
            expr_ty value;
        } Yield;
    } v;
    int lineno;
}
```

또한, 적절한 초기화를 통해 `stmt_ty` 구조체를 할당하는 일련의 생성자 함수(constructor functions)가 생성됩니다. `kind` 필드는 유니온(union)의 어떤 구성 요소가 초기화되는지를 지정합니다. `FunctionDef()` 생성자 함수는 `kind`를 `FunctionDef_kind`로 설정하고 `name`, `args`, `body`, `attributes` 필드를 초기화합니다.

## 메모리 관리 (Memory Management)

컴파일러의 실제 구현을 논의하기 전에 메모리 처리 방식에 대한 논의가 필요합니다. 메모리 관리를 단순화하기 위해 아레나(arena)가 사용됩니다. 이는 메모리가 할당 및 제거를 쉽게 하기 위해 단일 위치에 풀링(pooling)된다는 것을 의미합니다. 이를 통해 명시적인 메모리 할당 해제(deallocation)가 필요 없어집니다. 컴파일러에서 필요한 모든 메모리 할당이 해당 메모리를 아레나에 등록하기 때문에, 아레나를 해제하는 단일 호출만으로 컴파일러가 사용한 모든 메모리를 완전히 해제할 수 있습니다.

일반적으로 컴파일러의 핵심 부분에서 작업하지 않는 한 메모리 관리는 완전히 무시할 수 있습니다. 그러나 컴파일러의 아주 초기 또는 마지막 부분에서 작업하는 경우 아레나가 작동하는 방식에 신경 써야 합니다. 아레나와 관련된 모든 코드는 `Include/pyarena.h` 또는 `Python/pyarena.c`에 있습니다.

`PyArena_New()`는 새 아레나를 생성합니다. 반환된 `PyArena` 구조체는 주어진 모든 메모리에 대한 포인터를 저장합니다. 이는 컴파일러가 사용한 메모리를 마쳤을 때 어떤 메모리를 해제해야 하는지 장부 관리(bookkeeping)를 합니다. 이 해제는 `PyArena_Free()`를 통해 수행됩니다. 이는 컴파일러가 종료되는 전략적인 영역에서만 호출되어야 합니다.

위에 명시된 바와 같이, 일반적으로 컴파일러 작업 시 메모리 관리에 대해 걱정할 필요가 없습니다. 대부분의 경우 기술적인 세부 사항은 숨겨지도록 설계되었습니다.

유일한 예외는 `PyObject`를 관리할 때 발생합니다. Python의 나머지 부분이 참조 카운팅(reference counting)을 사용하기 때문에, 할당된 각 `PyObject`를 정리하기 위한 추가 지원이 아레나에 추가됩니다. 이러한 경우는 매우 드뭅니다. 그러나 `PyObject`를 할당했다면 `PyArena_AddPyObject()`를 호출하여 아레나에 알려야 합니다.

## 파스 트리에서 AST로 (Parse Tree to AST)

AST는 `PyAST_FromNode()` 함수를 사용하여 파스 트리에서 생성됩니다 ( `Python/ast.c` 참조).

이 함수는 파스 트리의 트리 워크(tree walk)를 시작하여 진행하면서 다양한 AST 노드를 생성합니다. 이를 위해 필요한 모든 새 노드를 할당하고, 필요한 지원 함수에 대해 적절한 AST 노드 생성 함수를 호출하며, 필요에 따라 노드를 연결합니다.

문법 사양과 파스 트리의 노드 사이에 자동화되거나 상징적인 연결이 없다는 점을 인지해야 합니다. `yacc`에서와 같이 파스 트리에 의해 직접적인 도움은 제공되지 않습니다.

예를 들어, 작업 중인 파스 트리에서 어떤 노드를 다루고 있는지 계속 추적해야 합니다 (예: `'if'` 문을 다루고 있다면 조건문의 끝을 찾기 위해 `:` 토큰을 주시해야 합니다).

파스 트리에서 AST 노드를 생성하기 위해 호출되는 함수들은 모두 `ast_for_xx`라는 이름을 가지며, 여기서 `xx`는 함수가 처리하는 문법 규칙입니다 (`alias_for_import_name`은 예외입니다). 이 함수들은 차례로 ASDL 문법에 의해 정의되고 `Python/Python-ast.c`에 포함된 생성자 함수( `Parser/asdl_c.py`에 의해 생성됨)를 호출하여 AST의 노드를 생성합니다. 이 모든 과정은 `asdl_seq` 구조체에 저장된 AST 노드 시퀀스로 이어집니다.

`Python/asdl.c` 및 `Include/asdl.h`에서 찾을 수 있는 `asdl_seq *` 유형을 생성하고 사용하는 함수 및 매크로:

*   `asdl_seq_new()`: 지정된 길이에 대한 `asdl_seq`에 메모리를 할당합니다.
*   `asdl_seq_GET()`: `asdl_seq`의 특정 위치에 있는 항목을 가져옵니다.
*   `asdl_seq_SET()`: `asdl_seq`의 특정 인덱스를 지정된 값으로 설정합니다.
*   `asdl_seq_LEN(asdl_seq *)`: `asdl_seq`의 길이를 반환합니다.

문을 다루는 경우, 문을 생성한 줄 번호를 추적하는 것에 대해서도 신경 써야 합니다. 현재 줄 번호는 각 `stmt_ty` 함수의 마지막 매개변수로 전달됩니다.

## 제어 흐름 그래프 (Control Flow Graphs)

제어 흐름 그래프(Control Flow Graph, 약어 CFG로 자주 참조됨)는 블록 내에 중간 표현(Intermediate Representation, 약어 IR; 여기서는 Python 바이트코드)을 포함하는 기본 블록(basic blocks)을 사용하여 프로그램의 흐름을 모델링하는 방향 그래프(directed graph)입니다. 기본 블록 자체는 단일 진입점(entry point)을 가지지만 여러 개의 종료점(exit points)을 가질 수 있는 IR 블록입니다. 단일 진입점은 기본 블록의 핵심입니다. 이는 모두 점프(jumps)와 관련이 있습니다. 진입점은 제어 흐름을 변경하는 것(함수 호출이나 점프와 같은)의 대상인 반면, 종료점은 프로그램의 흐름을 변경하는 명령(점프나 `'return'` 문과 같은)입니다. 이는 기본 블록이 진입점에서 시작하여 종료점 또는 블록의 끝까지 실행되는 코드 조각임을 의미합니다.

예를 들어, `else` 블록이 있는 `'if'` 문을 생각해 봅시다. `'if'` 문의 가드(guard)는 `'if'` 문으로 이어지는 코드를 포함하는 기본 블록이 가리키는 기본 블록입니다. `'if'` 문 블록은 `'if'`의 참(true) 본문과 `'else'` 본문(NULL일 수 있음)으로의 점프(종료점)를 포함하며, 각각은 자체 기본 블록입니다. 이 두 블록은 차례로 전체 `'if'` 문 다음에 오는 코드를 나타내는 기본 블록을 가리킵니다.

CFG는 일반적으로 최종 코드 출력의 한 단계 전입니다. 코드는 CFG에서 에지를 따라 후위 깊이 우선 탐색(post-order depth-first search)을 수행하여 기본 블록에서 직접 생성됩니다 (점프 대상은 출력 순서에 따라 조정됨).

## AST에서 CFG로, CFG에서 바이트코드로 (AST to CFG to Bytecode)

AST가 생성되면 다음 단계는 CFG를 생성하는 것입니다. 첫 번째 단계는 점프 대상을 특정 오프셋으로 해결하지 않고 AST를 Python 바이트코드로 변환하는 것입니다 (이는 CFG가 최종 바이트코드로 변환될 때 계산됩니다). 본질적으로 이것은 AST를 제어 흐름이 CFG의 에지로 표현되는 Python 바이트코드로 변환합니다.

변환은 두 번의 패스(pass)로 수행됩니다. 첫 번째 패스는 네임스페이스(namespace)를 생성합니다 (변수는 클로저(closures)의 경우 로컬(local), 자유/셀(free/cell) 또는 전역(global)으로 분류될 수 있습니다). 이것이 완료되면 두 번째 패스는 본질적으로 CFG를 리스트로 평탄화(flatten)하고 바이트코드의 최종 출력을 위한 점프 오프셋(jump offsets)을 계산합니다.

변환 프로세스는 `Python/compile.c`의 `PyAST_Compile()` 함수 호출에 의해 시작됩니다. 이 함수는 AST를 CFG로 변환하고 CFG에서 최종 바이트코드를 출력하는 두 가지 작업을 모두 수행합니다. AST를 CFG로 변환하는 단계는 `PyAST_Compile()`에 의해 호출되는 두 함수 `PySymtable_Build()`와 `compiler_mod()`에 의해 주로 처리됩니다. 전자는 `Python/symtable.c`에 있고 후자는 `Python/compile.c`에 있습니다.

`PySymtable_Build()`는 AST의 시작 코드 블록(전달된)으로 들어가서 적절한 `symtable_visit_xx` 함수(여기서 `xx`는 AST 노드 유형)를 호출하는 것으로 시작합니다. 다음으로, AST 트리는 `symtable_enter_block()` 및 `symtable_exit_block()`을 각각 사용하여 블록에 들어가고 나올 때 로컬 변수의 범위(reach)를 나타내는 다양한 코드 블록으로 탐색됩니다.

심볼 테이블(symbol table)이 생성되면 `Python/compile.c`에 코드가 있는 CFG 생성 시간입니다. 이는 다양한 AST 노드 유형별로 작업을 세분화하는 여러 함수에 의해 처리됩니다. 함수는 모두 `compiler_visit_xx`라는 이름을 가지며, 여기서 `xx`는 노드 유형의 이름입니다 (예: `stmt`, `expr` 등). 각 함수는 `struct compiler *`와 `xx_ty`를 받는데, 여기서 `xx`는 AST 노드 유형입니다. 일반적으로 이러한 함수는 전달된 노드 유형에 따라 분기되는 큰 `switch` 문으로 구성됩니다. 간단한 것들은 `switch` 문에서 인라인(inline)으로 처리되며, 더 복잡한 변환은 `compiler_xx`라는 다른 함수로 위임됩니다 (여기서 `xx`는 처리되는 내용을 설명하는 이름).

임의의 AST 노드를 변환할 때는 `VISIT()` 매크로를 사용합니다. `<node type>`에 전달된 값에 따라 적절한 `compiler_visit_xx` 함수가 호출됩니다 (따라서 `VISIT(c, expr, node)`는 `compiler_visit_expr(c, node)`를 호출합니다). `VISIT_SEQ` 매크로는 매우 유사하지만, AST 노드 시퀀스( `*` 수정자를 사용한 노드의 인자로 생성된 값들)에 대해 호출됩니다. 슬라이스(slices) 처리를 위한 `VISIT_SLICE()`도 있습니다.

바이트코드 생성은 다음 매크로에 의해 처리됩니다:

*   `ADDOP()`: 지정된 opcode를 추가합니다.
*   `ADDOP_I()`: 인자를 취하는 opcode를 추가합니다.
*   `ADDOP_O(struct compiler *c, int op, PyObject *type, PyObject *obj)`: `PyObject` 시퀀스 객체에서 지정된 `PyObject`의 위치에 따라 적절한 인자와 함께 opcode를 추가하지만, 이름 맹글링(name mangling) 처리는 하지 않습니다. 이름 맹글링이 불가능하고 이름의 범위가 알려진 전역 변수(globals), 상수(consts) 또는 매개변수(parameters)와 같은 객체의 이름 기반 조회가 필요한 경우에 사용됩니다.
*   `ADDOP_NAME()`: `ADDOP_O`와 유사하지만, 이름 맹글링도 처리됩니다. 이름 기반 속성 로딩(attribute loading) 또는 임포팅(importing)에 사용됩니다.
*   `ADDOP_JABS()`: 기본 블록으로의 절대 점프(absolute jump)를 생성합니다.
*   `ADDOP_JREL()`: 기본 블록으로의 상대 점프(relative jump)를 생성합니다.

바이트코드를 생성하는 여러 헬퍼 함수들은 `compiler_xx()`로 명명되며, 여기서 `xx`는 함수가 돕는 내용입니다 (예: `list`, `boolop` 등). 특히 유용한 것 중 하나는 `compiler_nameop()`입니다. 이 함수는 변수의 범위를 조회하고 표현식 컨텍스트(expression context)에 따라 변수를 로드(load), 저장(store) 또는 삭제(delete)하는 적절한 opcode를 생성합니다.

문이 정의된 줄 번호를 처리하는 것은 `compiler_visit_stmt()`에 의해 처리되므로 걱정할 필요가 없습니다.

AST 노드를 기반으로 바이트코드를 생성하는 것 외에도 기본 블록 생성도 처리해야 합니다. 기본 블록을 관리하는 데 사용되는 매크로 및 함수는 다음과 같습니다:

*   `NEW_BLOCK()`: 블록을 생성하고 현재 블록으로 설정합니다.
*   `NEXT_BLOCK()`: 기본적으로 `NEW_BLOCK()`에 현재 블록에서의 점프 기능이 추가됩니다.
*   `compiler_new_block()`: 블록을 생성하지만 사용하지는 않습니다 (점프 생성에 사용됨).

CFG가 생성되면 평탄화(flatten)되어야 하며, 그 후에 최종 바이트코드 생성이 이루어집니다. 평탄화는 후위 깊이 우선 탐색(post-order depth-first search)을 사용하여 처리됩니다. 평탄화되면 평탄화에 따라 점프 오프셋이 백패치(backpatched)되고 `PyCodeObject` 파일이 생성됩니다. 이 모든 것은 `assemble()` 호출에 의해 처리됩니다.

## 새 바이트코드 도입 (Introducing New Bytecode)

때로는 새로운 기능에 새로운 opcode가 필요할 수 있습니다. 그러나 새로운 바이트코드를 추가하는 것은 컴파일러의 AST -> 바이트코드 단계에서 단순히 새로운 바이트코드를 갑자기 도입하는 것만큼 간단하지 않습니다. Python 전반의 여러 코드 조각은 어떤 바이트코드가 존재하는지에 대한 정확한 정보에 의존합니다.

첫째, 이름과 고유 식별 번호를 선택해야 합니다. opcode의 공식 목록은 `Include/opcode.h`에서 찾을 수 있습니다. opcode가 인자를 취해야 하는 경우, `HAVE_ARGUMENT` ( `Include/opcode.h`에 있음)에 할당된 숫자보다 큰 고유 번호를 부여해야 합니다.

이름/번호 쌍이 선택되고 `Include/opcode.h`에 입력되면 `Lib/opcode.py`와 `Doc/library/dis.rst`에도 입력해야 합니다.

새로운 바이트코드를 사용하려면 `.pyc` 파일의 매직 넘버(magic number)도 변경해야 합니다. `Python/import.c`의 `MAGIC` 변수에 이 숫자가 포함되어 있습니다. 이 숫자를 변경하면 이전 `MAGIC`을 가진 모든 `.pyc` 파일이 임포트(import) 시 인터프리터(interpreter)에 의해 다시 컴파일됩니다.

마지막으로, 새로운 바이트코드의 사용을 도입해야 합니다. `Python/compile.c`와 `Python/ceval.c`를 변경하는 것이 주된 변경 장소가 될 것입니다. 그러나 `'compiler'` 패키지도 변경해야 합니다. 이를 위한 주요 파일은 `Lib/compiler/pyassem.py`와 `Lib/compiler/pycodegen.py`입니다.

기존 바이트코드의 출력에 영향을 미칠 수 있는 변경을 하고 매직 넘버를 계속 변경하지 않는 경우, 이전 `.py(c|o)` 파일을 삭제해야 합니다! 바이트코드를 변경하면 결국 매직 넘버를 변경하게 되겠지만, 디버깅 중에는 매직 넘버를 계속 올리지 않고 바이트코드 출력을 변경할 것입니다. 이는 만료된(stale) `.pyc` 파일이 다시 생성되지 않을 수 있음을 의미합니다. `find . -name '*.py[co]' -exec rm -f {} ';'`를 실행하면 가지고 있는 모든 `.pyc` 파일이 삭제되어 새 파일이 생성되도록 강제하고 새 바이트코드를 제대로 테스트할 수 있습니다.

## 코드 객체 (Code Objects)

`PyAST_Compile()`의 결과는 `Include/code.h`에 정의된 `PyCodeObject`입니다. 이제 실행 가능한 Python 바이트코드를 갖게 된 것입니다!

코드 객체(바이트코드)는 `Python/ceval.c`에서 실행됩니다. 이 파일은 `PyEval_EvalFrameEx()`의 큰 `switch` 문에 새 opcode에 대한 새 `case` 문이 필요합니다.

## 주요 파일 (Important Files)

*   **`Parser/`**
    *   `Python.asdl`: ASDL 구문 파일.
    *   `asdl.py`: "Zephyr Abstract Syntax Definition Language의 구현." ASDL 파일을 파싱하기 위해 SPARK를 사용합니다.
    *   `asdl_c.py`: "ASDL 설명에서 C 코드를 생성합니다." `Python/Python-ast.c`와 `Include/Python-ast.h`를 생성합니다.
    *   `spark.py`: SPARK 파서 생성기.

*   **`Python/`**
    *   `Python-ast.c`: ASDL 유형에 해당하는 C 구조체를 생성합니다. 또한 AST 노드를 마샬링(marshaling)하는 코드도 포함합니다 (핵심 ASDL 유형은 `asdl.c`에 마샬링 코드가 있습니다). "Parser/asdl_c.py에 의해 자동으로 생성된 파일". 이 파일은 문법 변경이 커밋될 때마다 `__version__` 값이 최신 문법 변경 개정 번호로 설정되므로 별도로 커밋되어야 합니다.
    *   `asdl.c`: ASDL 시퀀스 유형을 처리하는 코드를 포함합니다. 또한 숫자 및 식별자(identifier)와 같은 핵심 ASDL 유형을 마샬링하는 코드도 있습니다. AST 노드를 마샬링하기 위해 `Python-ast.c`에서 사용됩니다.
    *   `ast.c`: Python의 파스 트리를 추상 구문 트리로 변환합니다.
    *   `ceval.c`: 바이트코드를 실행합니다 (eval loop).
    *   `compile.c`: AST를 기반으로 바이트코드를 생성합니다.
    *   `symtable.c`: AST에서 심볼 테이블을 생성합니다.
    *   `pyarena.c`: 아레나 메모리 관리자의 구현.
    *   `import.c`: 바이트코드 버전 관리를 위한 매직 넘버 (`MAGIC`)의 본거지.

*   **`Include/`**
    *   `Python-ast.h`: `Python/Python-ast.c`에 의해 생성된 C 구조체의 실제 정의를 포함합니다. "Parser/asdl_c.py에 의해 자동으로 생성됨".
    *   `asdl.h`: 해당 `Python/ast.c`의 헤더.
    *   `ast.h`: `PyAST_FromNode()`를 외부( `Python/ast.c`에서)로 선언합니다.
    *   `code.h`: `Objects/codeobject.c`의 헤더 파일; `PyCodeObject`의 정의를 포함합니다.
    *   `symtable.h`: `Python/symtable.c`의 헤더. `struct symtable`과 `PySTEntryObject`가 여기에 정의됩니다.
    *   `pyarena.h`: 해당 `Python/pyarena.c`의 헤더 파일.
    *   `opcode.h`: 바이트코드의 마스터 리스트; 이 파일이 수정되면 다른 여러 파일도 그에 따라 수정해야 합니다 ("새 바이트코드 도입" 참조).

*   **`Objects/`**
    *   `codeobject.c`: `PyCodeObject` 관련 코드를 포함합니다 (원래 `Python/compile.c`에 있었음).

*   **`Lib/`**
    *   `opcode.py`: `Include/opcode.h`가 수정되면 수정해야 하는 파일 중 하나.
    *   **`compiler/`**
        *   `pyassem.py`: `Include/opcode.h`가 변경되면 수정해야 하는 파일 중 하나.
        *   `pycodegen.py`: `Include/opcode.h`가 변경되면 수정해야 하는 파일 중 하나.

## 알려진 컴파일러 관련 실험 (Known Compiler-related Experiments)

이 섹션에서는 컴파일러(바이트코드 포함)와 관련된 알려진 실험을 나열합니다.

*   Skip Montanaro는 Python 워크숍에서 Peephole Optimizer에 대한 논문을 발표했습니다.
*   Michael Hudson은 바이트코드를 직접 다루는 기능을 제공하는 `Bytecodehacks`라는 비활성 SourceForge 프로젝트를 가지고 있습니다.
*   `LOAD_ATTR`/`CALL_FUNCTION`의 기능을 결합하는 `CALL_ATTR`이라는 opcode가 생성되었습니다. 현재는 클래식 클래스(classic classes)에서만 작동하며, 신식 클래스(new-style classes)의 경우 클래식 클래스와 신식 클래스를 모두 지원해야 하는 문제로 인해 실제 속도 저하가 발생한다는 벤치마킹 결과가 있었습니다.

## 참고 자료 (References)

*   [Aho86] Alfred V. Aho, Ravi Sethi, Jeffrey D. Ullman. *Compilers: Principles, Techniques, and Tools*, [http://www.amazon.com/exec/obidos/tg/detail/-/0201100886/104-0162389-6419108](http://www.amazon.com/exec/obidos/tg/detail/-/0201100886/104-0162389-6419108)
*   [Wang97] Daniel C. Wang, Andrew W. Appel, Jeff L. Korn, and Chris S. Serra. The Zephyr Abstract Syntax Description Language. In *Proceedings of the Conference on Domain-Specific Languages*, pp. 213–227, 1997.
*   Skip Montanaro's Peephole Optimizer Paper ([https://legacy.python.org/workshops/1998-11/proceedings/papers/montanaro/montanaro.html](https://legacy.python.org/workshops/1998-11/proceedings/papers/montanaro/montanaro.html))
*   Bytecodehacks Project ([http://bytecodehacks.sourceforge.net/bch-docs/bch/index.html](http://bytecodehacks.sourceforge.net/bch-docs/bch/index.html))
*   CALL_ATTR opcode ([https://bugs.python.org/issue709744](https://bugs.python.org/issue709744))

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.