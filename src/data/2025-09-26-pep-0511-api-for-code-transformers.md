---
title: "[Rejected] PEP 511 - API for code transformers"
excerpt: "Python Enhancement Proposal 511: 'API for code transformers'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/511/
toc: true
toc_sticky: true
date: 2025-09-26 22:56:47+0900
last_modified_at: 2025-09-26 22:56:47+0900
published: true
---
> **원문 링크:** [PEP 511 - API for code transformers](https://peps.python.org/pep-0511/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 04-Jan-2016


## PEP 511 – 코드 트랜스포머를 위한 API (API for code transformers)

**상태:** 이 PEP는 저자에 의해 `거부(Rejected)`되었습니다.

### 거부 사유

이 PEP는 일반 Python 언어와 유사하지만 호환되지 않는 새로운 Python 유사 프로그래밍 언어를 승인하는 것으로 해석되었습니다. 따라서 Python과 호환되지 않는 문법을 장려하지 않기로 결정되었습니다.

또한, 이 PEP는 새로운 Python 기능을 실험하기 위한 훌륭한 도구로 여겨졌지만, PEP 없이도 `importlib` 훅(hook)을 통해 이미 실험이 가능합니다. 어떤 기능이 유용하다고 판단되면, 서드 파티(third party) Python 모듈에 의존하는 대신 Python에 직접 포함되어야 한다고 보았습니다.

마지막으로, 이 PEP는 2016년에 중단된 FAT Python 최적화 프로젝트에 의해 추진되었습니다. 이 프로젝트는 상당한 속도 향상을 보여주지 못했을 뿐만 아니라, 가장 진보되고 복잡한 최적화를 구현할 시간 부족으로 인해 폐기되었습니다.

---

### 개요 (Abstract)

이 PEP는 바이트코드(bytecode) 및 AST(Abstract Syntax Tree) 트랜스포머(transformer)를 등록하기 위한 API를 제안합니다. 또한 `.pyc` 파일 이름을 변경하는 `-o OPTIM_TAG` 명령줄 옵션과, 피플(peephole) 최적화 도구를 비활성화하는 `-o noopt` 옵션을 추가합니다. `.pyc` 파일이 없거나 코드를 변환하는 데 필요한 코드 트랜스포머가 누락된 경우, 임포트(import) 시 `ImportError` 예외를 발생시킵니다. 미리 변환된 코드( `.pyc` 파일에서 로드된 코드)를 실행하는 데는 코드 트랜스포머가 필요하지 않습니다.

### 제안 배경 (Rationale)

Python은 코드 변환을 위한 표준적인 방법을 제공하지 않습니다. 코드를 변환하는 프로젝트들은 다양한 훅을 사용합니다. 예를 들어, MacroPy 프로젝트는 `sys.meta_path`에 자체 모듈 파인더(finder)를 추가하여 AST 트랜스포머를 훅으로 연결하는 임포트 훅을 사용합니다. 또 다른 옵션은 내장 `compile()` 함수를 몽키 패치(monkey-patch)하는 것입니다. 코드 트랜스포머를 훅으로 연결하는 방법은 이 외에도 더 많이 있습니다.

Python 3.4에서는 `importlib.abc.SourceLoader`에 `compile_source()` 메서드가 추가되었습니다. 하지만 코드 변환은 단순히 모듈을 임포트하는 것보다 더 넓은 범위를 다루며, 아래에 설명된 사용 사례들을 참고할 수 있습니다.

최적화 도구 또는 전처리기(preprocessor)를 작성하는 것은 이 PEP의 범위 밖입니다.

### 사용법 (Usage)

#### 1. AST 최적화 도구 (AST optimizer)

AST(Abstract Syntax Tree)를 변환하는 것은 최적화 도구를 구현하는 편리한 방법입니다. AST는 더 많은 정보를 포함하고 더 높은 수준(high level)이므로 바이트코드(bytecode)를 다루는 것보다 AST를 다루는 것이 더 쉽습니다.

최적화가 미리 수행될 수 있으므로, 복잡하지만 느린 최적화도 구현할 수 있습니다.

AST 최적화 도구로 구현할 수 있는 최적화 예시:

*   **Copy propagation (복사 전파):** `x=1; y=x`를 `x=1; y=1`로 대체.
*   **Constant folding (상수 폴딩):** `1+1`을 `2`로 대체.
*   **Dead code elimination (불필요 코드 제거).**

가드(guards, PEP 510 참고)를 사용하면 훨씬 더 다양한 최적화를 구현할 수 있습니다. 예시:

*   반복 가능(iterable) 객체 단순화: `range(3)`가 반복 가능 객체로 사용될 때 `(0, 1, 2)`로 대체.
*   루프 언롤링(Loop unrolling).
*   순수(pure) 내장 함수 호출: `len("abc")`를 `3`으로 대체.
*   사용된 내장 심볼(symbol)을 상수로 복사.

Python 3.6용 정적 최적화 도구인 `fatoptimizer`에 구현된 최적화도 참고할 수 있습니다.

다음과 같은 이슈들은 AST 최적화 도구로 구현될 수 있습니다:

*   이슈 #1346238: AST를 위한 상수 폴딩 최적화 패스.
*   이슈 #2181: 함수 끝에 있는 지역 변수(local variables) 최적화.
*   이슈 #2499: 상수에서 단항 `+` 및 `not` 폴딩.
*   이슈 #4264: 패치: `list.append` 호출 대신 `LIST_APPEND`를 사용하도록 코드 최적화.
*   이슈 #7682: 상수 표현식(constant expression)을 사용한 `if` 최적화.
*   이슈 #10399: AST 최적화: 함수 호출 인라인화(inlining).
*   이슈 #11549: 피플 최적화 도구에서 일부 기능을 이동하여 AST 최적화 도구 구축.
*   이슈 #17068: 상수 문자열을 위한 피플 최적화.
*   이슈 #17430: 누락된 피플 최적화.

#### 2. 전처리기 (Preprocessor)

전처리기는 AST 트랜스포머로 쉽게 구현할 수 있습니다. 전처리기는 다양하고 다른 용도로 사용될 수 있습니다.

몇 가지 예시:

*   운영 환경(production)에서 코드를 더 빠르게 실행하기 위해 어설션(assertions) 및 로그(logs)와 같은 디버그 코드를 제거.
*   꼬리 재귀 최적화(Tail-call Optimization).
*   프로파일링 코드 추가.
*   지연 평가(Lazy evaluation): `lazy_python` (바이트코드 트랜스포머) 및 MacroPy의 `lazy` 매크로(AST 트랜스포머) 참고.
*   딕셔너리 리터럴(dictionary literals)을 `collection.OrderedDict` 인스턴스로 변경.
*   상수 선언: `codetransformer`의 `@asconstants` 참고.
*   SQL 쿼리와 같은 도메인 특정 언어(DSL, Domain Specific Language). Python 언어 자체는 수정할 필요가 없습니다. PEP 335 - 오버로딩 가능한 부울 연산자(Overloadable Boolean Operators)와 같이 SQL을 위한 DSL을 구현하려는 이전 시도는 거부되었습니다.
*   함수형 언어의 패턴 매칭(Pattern Matching).
*   문자열 보간법(String Interpolation), 단 PEP 498은 Python 3.6에 병합되었습니다.

MacroPy는 긴 예시 및 사용 사례 목록을 가지고 있습니다.

이 PEP는 새로운 코드 트랜스포머를 추가하지 않습니다. 코드 트랜스포머를 사용하려면 외부 모듈이 필요하며 수동으로 등록해야 합니다.

PyXfuscator: Python 난독화 도구(obfuscator), 역난독화 도구(deobfuscator) 및 사용자 지원 디컴파일러(decompiler)도 참고할 수 있습니다.

#### 3. 모든 최적화 비활성화 (Disable all optimization)

Ned Batchelder는 코드 커버리지(code coverage) 구현을 더 어렵게 만들기 때문에 피플 최적화 도구를 비활성화하는 옵션을 추가해달라고 요청했습니다. `python-ideas` 메일링 리스트의 "Disable all peephole optimizations" 토론을 참고하십시오.

이 PEP는 피플 최적화 도구를 비활성화하는 새로운 `-o noopt` 명령줄 옵션을 추가합니다. Python에서는 다음과 같이 간단하게 처리할 수 있습니다:

```python
sys.set_code_transformers([])
```

이것은 이슈 #2506: "Add mechanism to disable optimizations"를 해결할 것입니다.

#### 4. Python으로 새로운 바이트코드 최적화 도구 작성 (Write new bytecode optimizers in Python)

Python 3.6은 피플 최적화 도구를 사용하여 코드를 최적화합니다. 정의상 피플 최적화 도구는 코드에 대한 시야가 좁으므로 기본적인 최적화만 구현할 수 있습니다. 이 최적화 도구는 바이트코드를 재작성합니다. C로 작성되었기 때문에 개선하기 어렵습니다.

이 PEP를 통해 순수 Python으로 새로운 바이트코드 최적화 도구를 구현하고 새로운 최적화를 실험하는 것이 가능해집니다.

상수 폴딩(constant folding)과 같은 일부 최적화는 AST에서 구현하기 더 쉽지만, 바이트코드에 대한 최적화도 여전히 유용합니다. 예를 들어, AST가 바이트코드로 컴파일될 때 컴파일러가 순진하여 아무것도 최적화하려고 하지 않기 때문에 쓸모없는 점프(jumps)가 발생할 수 있습니다.

### 사용 사례 (Use Cases)

이 섹션에서는 코드 트랜스포머가 언제 어떻게 사용될지 설명하는 사용 사례 예시를 제공합니다.

#### 인터랙티브 인터프리터 (Interactive interpreter)

Python에서 인기 있고 일반적으로 Python을 시연하는 데 사용되는 인터랙티브 인터프리터와 함께 코드 트랜스포머를 사용할 수 있습니다.

코드는 런타임에 변환되므로 값비싼 코드 트랜스포머를 사용하는 경우 인터프리터가 느려질 수 있습니다.

#### 변환된 패키지 빌드 (Build a transformed package)

변환된 코드의 패키지를 빌드할 수 있습니다.

트랜스포머는 구성(configuration)을 가질 수 있습니다. 이 구성은 패키지에 저장되지 않습니다.

패키지의 모든 `.pyc` 파일은 동일한 코드 트랜스포머와 동일한 트랜스포머 구성으로 변환되어야 합니다.

서로 다른 최적화 도구 태그(optimizer tags)를 사용하여 다른 `.pyc` 파일을 빌드하는 것이 가능합니다. 예를 들어, 기본 구성에는 `fat`, 함수 인라인화가 활성화된 다른 구성에는 `fat_inline`을 사용할 수 있습니다.

패키지에는 서로 다른 최적화 도구 태그를 가진 `.pyc` 파일이 포함될 수 있습니다.

#### 변환된 .pyc 파일을 포함하는 패키지 설치 (Install a package containing transformed .pyc files)

변환된 `.pyc` 파일을 포함하는 패키지를 설치할 수 있습니다.

패키지에 포함된 모든 최적화 도구 태그를 가진 `.pyc` 파일이 설치되며, 현재 최적화 도구 태그에 대한 것만 설치되는 것이 아닙니다.

#### 패키지 설치 시 .pyc 파일 빌드 (Build .pyc files when installing a package)

패키지에 현재 최적화 도구 태그의 `.pyc` 파일이 없거나 일부 `.pyc` 파일이 누락된 경우, 설치 중에 `.pyc` 파일이 생성됩니다.

최적화 도구 태그의 코드 트랜스포머가 필요합니다. 그렇지 않으면 설치가 오류와 함께 실패합니다.

#### 변환된 코드 실행 (Execute transformed code)

변환된 코드를 실행할 수 있습니다.

현재 최적화 도구 태그의 `.pyc` 파일이 없거나 코드를 변환하는 데 필요한 코드 트랜스포머가 누락된 경우, 임포트 시 `ImportError` 예외를 발생시킵니다.

여기서 흥미로운 점은 필요한 모든 `.pyc` 파일이 이미 사용 가능하면 변환된 코드를 실행하는 데 코드 트랜스포머가 필요 없다는 것입니다.

### 코드 트랜스포머 API (Code transformer API)

코드 트랜스포머는 `ast_transformer()` 및/또는 `code_transformer()` 메서드(아래 설명된 API)와 `name` 속성을 가진 클래스입니다.

효율성을 위해 아무것도 하지 않는다면 `code_transformer()` 또는 `ast_transformer()` 메서드를 정의하지 마십시오.

`name` 속성(`str`)은 최적화 도구를 식별하는 데 사용되는 짧은 문자열이어야 합니다. 이는 `.pyc` 파일 이름을 빌드하는 데 사용됩니다. `name`은 점(`.`), 대시(`-`) 또는 디렉토리 구분자(directory separators)를 포함해서는 안 됩니다. 점은 `.pyc` 파일 이름에서 필드를 구분하는 데 사용되고 대시는 코드 트랜스포머 이름을 결합하여 최적화 도구 태그를 빌드하는 데 사용됩니다.

#### `code_transformer()` 메서드

프로토타입:

```python
def code_transformer(self, code, context):
    ...
    new_code = ...
    ...
    return new_code
```

매개변수:

*   `code`: 코드 객체(code object).
*   `context`: `optimize` 속성(`int`)을 가진 객체로, 최적화 수준(0, 1 또는 2)을 나타냅니다. `optimize` 속성의 값은 `compile()` 함수의 `optimize` 매개변수에서 오며, 기본적으로 `sys.flags.optimize`와 같습니다.

Python의 각 구현은 `context`에 추가 속성을 추가할 수 있습니다. 예를 들어, CPython에서 `context`는 다음 속성도 가집니다:

*   `interactive` (`bool`): 인터랙티브 모드(interactive mode)인 경우 `True`.

이 메서드는 코드 객체를 반환해야 합니다.

코드 트랜스포머는 바이트코드로 컴파일된 후에 실행됩니다.

#### `ast_transformer()` 메서드

프로토타입:

```python
def ast_transformer(self, tree, context):
    ...
    return tree
```

매개변수:

*   `tree`: AST 트리.
*   `context`: `filename` 속성(`str`)을 가진 객체.

이 메서드는 AST 트리를 반환해야 합니다. AST 트리를 그 자리에서 수정하거나 새 AST 트리를 생성할 수 있습니다.

AST 트랜스포머는 파서(parser)에 의해 AST가 생성된 후 바이트코드로 컴파일되기 전에 호출됩니다. 향후 `context`에 새 속성이 추가될 수 있습니다.

### 변경 사항 (Changes)

요약하자면, 다음을 추가합니다:

*   `-o OPTIM_TAG` 명령줄 옵션.
*   `sys.implementation.optim_tag`.
*   `sys.get_code_transformers()`.
*   `sys.set_code_transformers(transformers)`.
*   `ast.PyCF_TRANSFORMED_AST`.

#### 코드 트랜스포머를 가져오고 설정하는 API (API to get/set code transformers)

코드 트랜스포머를 등록하는 새로운 함수를 추가합니다:

*   `sys.set_code_transformers(transformers)`: 코드 트랜스포머 목록을 설정하고 `sys.implementation.optim_tag`를 업데이트합니다.
*   `sys.get_code_transformers()`: 코드 트랜스포머 목록을 가져옵니다.

코드 트랜스포머의 순서는 중요합니다. 트랜스포머 A를 실행한 다음 트랜스포머 B를 실행하는 것은 트랜스포머 B를 실행한 다음 트랜스포머 A를 실행하는 것과 다른 결과를 줄 수 있습니다.

새로운 코드 트랜스포머를 앞에 추가하는 예시:

```python
transformers = sys.get_code_transformers()
transformers.insert(0, new_cool_transformer)
sys.set_code_transformers(transformers)
```

모든 AST 트랜스포머는 순차적으로 실행된 다음(예: 두 번째 트랜스포머는 첫 번째 트랜스포머의 입력을 받습니다), 모든 바이트코드 트랜스포머가 순차적으로 실행됩니다.

#### 최적화 도구 태그 (Optimizer tag)

변경 사항:

*   `sys.implementation.optim_tag` (`str`): 최적화 태그를 추가합니다. 기본 최적화 태그는 `'opt'`입니다.
*   `sys.implementation.optim_tag`를 설정하는 새로운 `-o OPTIM_TAG` 명령줄 옵션을 추가합니다.

`importlib`에 대한 변경 사항:

*   `importlib`는 항상 `'opt'`를 사용하는 대신 `sys.implementation.optim_tag`를 사용하여 모듈 임포트 시 `.pyc` 파일 이름을 빌드합니다.
*   코드 단순화를 위해 기본 최적화 태그 `'opt'`와 최적화 수준 0에 대한 특별한 경우를 제거합니다.
*   모듈 로드 시 `.pyc` 파일이 없지만 `.py` 파일이 사용 가능하면, 코드 최적화 도구가 현재 태그와 동일한 최적화 도구 태그를 가지고 있는 경우에만 `.py`가 사용되며, 그렇지 않으면 `ImportError` 예외가 발생합니다.

모듈을 임포트하기 위해 `.py` 파일을 컴파일할 수 있는지 결정하는 `use_py()` 함수의 의사 코드(Pseudo-code):

```python
def transformers_tag():
    transformers = sys.get_code_transformers()
    if not transformers:
        return 'noopt'
    return '-'.join(transformer.name for transformer in transformers)

def use_py():
    return (transformers_tag() == sys.implementation.optim_tag)
```

`sys.get_code_transformers()`의 순서는 중요합니다. 예를 들어, `fat` 트랜스포머 다음에 `pythran` 트랜스포머가 오면 최적화 도구 태그는 `fat-pythran`이 됩니다.

`importlib` 모듈의 동작은 기본 최적화 도구 태그(`'opt'`)에서는 변경되지 않습니다.

#### 피플 최적화 도구 (Peephole optimizer)

기본적으로 `sys.implementation.optim_tag`는 `opt`이고 `sys.get_code_transformers()`는 피플 최적화 도구(바이트코드 최적화)라는 하나의 코드 트랜스포머 목록을 반환합니다.

피플 최적화 도구를 비활성화하려면 `-o noopt`를 사용합니다. 이 경우 최적화 도구 태그는 `noopt`이고 등록된 코드 트랜스포머는 없습니다.

`-o opt` 옵션은 아무런 효과가 없습니다.

#### AST 개선 사항 (AST enhancements)

AST 트랜스포머 구현을 단순화하기 위한 개선 사항:

*   변환된 AST를 얻기 위한 새로운 컴파일러 플래그 `PyCF_TRANSFORMED_AST`를 추가합니다.
*   `PyCF_ONLY_AST`는 트랜스포머 이전의 AST를 반환합니다.

### 예시 (Examples)

#### .pyc 파일 이름

`os` 모듈의 `.pyc` 파일 이름 예시.

기본 최적화 도구 태그 `'opt'` 사용:

| .pyc 파일 이름              | 최적화 수준 |
| :-------------------------- | :---------- |
| `os.cpython-36.opt-0.pyc`   | 0           |
| `os.cpython-36.opt-1.pyc`   | 1           |
| `os.cpython-36.opt-2.pyc`   | 2           |

`'fat'` 최적화 도구 태그 사용:

| .pyc 파일 이름              | 최적화 수준 |
| :-------------------------- | :---------- |
| `os.cpython-36.fat-0.pyc`   | 0           |
| `os.cpython-36.fat-1.pyc`   | 1           |
| `os.cpython-36.fat-2.pyc`   | 2           |

#### 바이트코드 트랜스포머 (Bytecode transformer)

모든 문자열을 "Ni! Ni! Ni!"로 바꾸는 바이트코드 트랜스포머 예시:

```python
import sys
import types

class BytecodeTransformer:
    name = "knights_who_say_ni"
    def code_transformer(self, code, context):
        consts = ['Ni! Ni! Ni!' if isinstance(const, str) else const for const in code.co_consts]
        return types.CodeType(code.co_argcount, code.co_kwonlyargcount,
                              code.co_nlocals, code.co_stacksize, code.co_flags,
                              code.co_code, tuple(consts), code.co_names,
                              code.co_varnames, code.co_filename, code.co_name,
                              code.co_firstlineno, code.co_lnotab,
                              code.co_freevars, code.co_cellvars)

# 기존 코드 트랜스포머를 새 바이트코드 트랜스포머로 교체
sys.set_code_transformers([BytecodeTransformer()])
# code_transformer()에 의해 변환될 코드 실행
exec("print('Hello World!')")
```

출력:

```
Ni! Ni! Ni!
```

#### AST 트랜스포머 (AST transformer)

바이트코드 트랜스포머 예시와 유사하게, AST 트랜스포머도 모든 문자열을 "Ni! Ni! Ni!"로 바꿉니다:

```python
import ast
import sys

class KnightsWhoSayNi(ast.NodeTransformer):
    def visit_Str(self, node):
        node.s = 'Ni! Ni! Ni!'
        return node

class ASTTransformer:
    name = "knights_who_say_ni"
    def __init__(self):
        self.transformer = KnightsWhoSayNi()
    def ast_transformer(self, tree, context):
        self.transformer.visit(tree)
        return tree

# 기존 코드 트랜스포머를 새 AST 트랜스포머로 교체
sys.set_code_transformers([ASTTransformer()])
# ast_transformer()에 의해 변환될 코드 실행
exec("print('Hello World!')")
```

출력:

```
Ni! Ni! Ni!
```

### 다른 Python 구현 (Other Python implementations)

PEP 511은 모든 Python 구현에서 구현되어야 하지만, 바이트코드와 AST는 표준화되어 있지 않습니다.

심지어 CPython의 마이너 버전(minor version) 사이에서도 AST API에 변경 사항이 있습니다. 차이점은 있지만 사소한 차이점뿐입니다. 예를 들어 Python 2.7과 Python 3.5에서 작동하는 AST 트랜스포머를 작성하는 것은 꽤 쉽습니다.

### 논의 (Discussion)

*   [Python-ideas] PEP 511: API for code transformers (2016년 1월)
*   [Python-Dev] AST optimizer implemented in Python (2012년 8월)

### 이전 작업 (Prior Art)

#### AST 최적화 도구 (AST optimizers)

이슈 #17515 "Add sys.setasthook() to allow to use a custom AST"는 코드 트랜스포머를 위한 API의 첫 번째 시도였지만, AST에만 특화되어 있었습니다.

2015년에 Victor Stinner는 가드(guards)를 사용하여 함수를 특수화하는 AST 최적화 도구인 `fatoptimizer` 프로젝트를 작성했습니다.

2014년에 Kevin Conway는 PyCC 최적화 도구를 만들었습니다.

2012년에 Victor Stinner는 다양한 최적화를 구현하는 AST 최적화 도구인 `astoptimizer` 프로젝트를 작성했습니다. 가장 흥미로운 최적화는 변경 사항이 발생할 경우 최적화를 비활성화하는 가드가 사용되지 않으므로 Python 의미론(semantics)을 깨뜨립니다.

2011년에 Eugene Toder는 새로운 AST 최적화 도구에서 일부 피플 최적화를 재작성할 것을 제안했습니다: 이슈 #11549, "Build-out an AST optimizer, moving some functionality out of the peephole optimizer". 이 패치는 `ast.Lit`를 추가합니다(나중에 `ast.Literal`로 이름을 변경할 것을 제안).

#### Python 전처리기 (Python Preprocessors)

*   **MacroPy** : MacroPy는 Python 프로그래밍 언어에서 구문 매크로(Syntactic Macros)를 구현한 것입니다. MacroPy는 사용자 정의 함수(매크로)가 임포트 시 Python 프로그램의 AST에 변환을 수행할 수 있는 메커니즘을 제공합니다.
*   **pypreprocessor** : `#define` 및 `#ifdef`와 같은 C 스타일 전처리기 지시문(directives)을 Python에서 제공합니다.

#### 바이트코드 트랜스포머 (Bytecode transformers)

*   **codetransformer** : `ast` 모듈의 `NodeTransformer`에서 영감을 받은 CPython용 바이트코드 트랜스포머입니다.
*   **byteplay** : Byteplay는 Python 코드 객체를 다루기 쉬운 동등한 객체로 변환하고, 이 객체를 다시 실행 가능한 Python 코드 객체로 변환할 수 있습니다. Python 함수에 복잡한 변환을 적용하는 데 유용하며, Python 바이트코드의 복잡성을 배우는 데도 유용합니다. byteplay 문서를 참고하십시오.

다음도 참고하십시오:

*   BytecodeAssembler

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.