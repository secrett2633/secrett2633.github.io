---
title: "[Draft] PEP 679 - New assert statement syntax with parentheses"
excerpt: "Python Enhancement Proposal 679: 'New assert statement syntax with parentheses'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/679/
toc: true
toc_sticky: true
date: 2025-09-27 10:09:51+0900
last_modified_at: 2025-09-27 10:09:51+0900
published: true
---
> **원문 링크:** [PEP 679 - New assert statement syntax with parentheses](https://peps.python.org/pep-0679/)
>
> **상태:** Draft | **유형:** Standards Track | **작성일:** 07-Jan-2022



## PEP 679 – 괄호가 있는 새로운 `assert` 문법

### 개요 (Abstract)
이 PEP는 두 인수를 받는 `assert` 문에서 괄호 사용을 허용하는 것을 제안합니다. 즉, `assert (expr, msg)` 형태의 코드를 인터프리터가 `assert expr, msg`로 재해석하게 됩니다. 이는 흔히 발생하는 실수인 `(expr, msg)`가 항상 참(truthy)으로 평가되는 두 요소 튜플(two-element tuple)로 취급되어 `assert` 문이 항상 성공하던 문제를 해결합니다.

### 동기 (Motivation)
`assert` 문에 오류 메시지를 포함하여 사용할 때, 많은 사용자가 이를 괄호로 묶는 실수를 자주 합니다. 이는 초보자들이 `assert`를 함수처럼 생각하기 때문이며, `unittest`의 `assertTrue()`와 같은 메서드들도 단언(assertion)과 메시지에 괄호를 요구하기 때문입니다.

이러한 실수는 `assert` 문이 항상 성공하기 때문에 감지되지 않는다는 심각한 문제가 있었습니다. 이는 `(expr, msg)`가 항상 참인 값을 가지는 두 요소 튜플로 해석되기 때문입니다. 또한, 테스트나 설명이 길어져 여러 줄에 걸쳐 작성될 때, 괄호는 자연스러운 줄 바꿈 방법이기 때문에 이러한 실수가 자주 발생했습니다.

이러한 문제가 매우 흔하여 Python 3.10부터 컴파일러에서 `SyntaxWarning`을 발행하고 있으며, 여러 코드 린터(linters)에서도 이를 경고하고 있습니다.

또한, `import` 문 (예: `from x import (a,b,c)`)이나 `del` 문 (예: `del (a,b,c)`)과 같이 언어의 다른 일부 구문들도 괄호 형태를 허용합니다. 괄호를 허용하는 것은 이러한 함정을 제거할 뿐만 아니라, 사용자와 자동 포맷터(auto-formatters)가 긴 `assert` 문을 여러 줄에 걸쳐 더 자연스러운 방식으로 포맷할 수 있도록 할 것입니다.

현재는 역슬래시(PEP 8 권장)나 괄호와 쉼표를 사용하여 긴 `assert` 문을 여러 줄로 포맷할 수 있지만:
```python
assert (
    very_very_long_test
), (
    "very very long "
    "error message"
)
```
이 PEP에서 제안하는 괄호 형태가 다른 문법 구조의 포맷팅과 더 일관되고 명확하며 직관적이라고 제안자들은 믿습니다.
```python
assert (
    very_very_long_test,
    "very very long "
    "message"
)
```

### 이론적 근거 (Rationale)
하위 호환성 문제 때문에, 이전에 두 요소 튜플로 파싱되던 방식이 새로운 방식으로 변경된다는 것을 사용자에게 알리기 위해 Python 3.17까지 "new assertion syntax, will assert first element of tuple"과 같은 메시지를 포함한 `SyntaxWarning`이 발생합니다.

예를 들어, 새로운 문법을 사용하면 다음과 같습니다:
```python
>>> assert ('Petr' == 'Pablo', "That doesn't look right!")
<python-input-0>:0: SyntaxWarning: new assertion syntax, will assert first element of tuple
Traceback (most recent call last):
  File "<python-input-0>", line 1, in <module>
    assert ('Petr' == 'Pablo', "That doesn't look right!")
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: That doesn't look right!
```
일반적으로 `SyntaxWarning`을 개선하는 것은 이 PEP의 범위 밖입니다.

### 명세 (Specification)
`assert` 문의 형식 문법은 다음과 같이 변경됩니다.

```
| 'assert' '(' expression ',' expression [','] ')' &(NEWLINE | ';')
| 'assert' a=expression [',' expression ]
```
첫 번째 줄은 괄호를 허용하는 새로운 `assert` 문 형태로, Python 3.17까지 `SyntaxWarning`을 발생시킵니다. 이 Lookahead는 파서가 튜플을 전체 문장으로 성급하게 캡처하는 것을 방지하기 위해 필요합니다. 이를 통해 `assert (a, b) <= c, "something"`과 같은 문장도 올바르게 파싱됩니다.

### 구현 관련 참고 사항 (Implementation Notes)
이 변경 사항은 파서(parser) 또는 컴파일러(compiler)에서 구현될 수 있습니다. 사용자에게 새로운 문법을 알리는 `SyntaxWarning`을 발생시켜야 한다는 명세는 구현을 복잡하게 만드는데, 경고는 컴파일 중에 발생해야 하기 때문입니다.

제안자들은 `assert (x,y)`가 `assert x,y`와 동일한 AST(Abstract Syntax Tree)를 가지도록 파서에서 구현하는 것이 이상적이라고 생각합니다. 이는 임시적인 절충안이 필요한 2단계 구현 계획을 의미합니다.

**파서에서의 구현 (Implementing in the parser):**
경고 명세가 있는 순수한 파서 구현은 불가능합니다. (경고 명세가 없다면 순수한 파서 구현은 작은 문법 변경입니다.) 경고를 발생시키려면 컴파일러가 새로운 문법을 인지해야 합니다. 이는 파싱 중에 정보가 손실되지 않도록 선택적 플래그가 필요하다는 의미입니다. 따라서 괄호가 있는 `assert`의 AST는 `paren_syntax=1` 플래그와 함께 다음과 같이 보일 것입니다.
```python
Module(
    body=[
        Assert(
            test=Constant(value=True),
            msg=Constant(value='Error message'),
            paren_syntax=1
        )
    ]
)
```

**컴파일러에서의 구현 (Implementing in the compiler):**
새로운 문법은 길이가 2인 튜플을 특별하게 처리하여 컴파일러에서 구현될 수 있습니다. 그러나 이는 `SyntaxWarning`이 발행되는 전환 기간 동안 AST를 전혀 수정하지 않는 부작용을 가집니다.

`SyntaxWarning`이 제거되면, 구현은 파서 레벨로 이동할 수 있으며, 이때 괄호 형태는 `assert expression, message`와 동일한 AST 구조로 직접 파싱됩니다. 이 접근 방식은 AST를 다루는 많은 도구들이 적응할 시간을 더 많이 가질 수 있으므로 하위 호환성이 더 높습니다.

### 하위 호환성 (Backwards Compatibility)
이 변경은 기술적으로 하위 호환성이 없습니다. 파서 또는 컴파일러에서 초기 구현되든, 현재는 2-튜플을 주어로 하여 항상 참으로 해석되던 `assert (x,y)`는 `assert x,y`로 해석됩니다.

그러나 이러한 종류의 `assert` 문은 항상 성공했기 때문에, 사용자 코드에서 실제로 아무런 역할도 하지 않았습니다. 이 문서의 제안자들은 이러한 하위 호환성 위반이 유익하다고 생각합니다. 이전에는 감지되지 않았던 사용자 코드의 이러한 경우를 부각시킬 것이기 때문입니다. 이 문제는 Python 3.10부터 `SyntaxWarning`을 발생시켜 왔으므로, 5년 이상의 deprecation 기간이 있었습니다. `SyntaxWarning`이 계속 발생함으로써 예기치 않은 문제를 완화할 수 있습니다.

이 변경은 `assert (x,y)`의 AST에도 변화를 가져올 것입니다. 현재는 다음과 같습니다.
```python
Module(
    body=[
        Assert(
            test=Tuple(
                elts=[
                    Name(id='x', ctx=Load()),
                    Name(id='y', ctx=Load())
                ],
                ctx=Load()
            )
        )
    ],
    type_ignores=[]
)
```
Python 3.18의 최종 구현에서는 다음과 같은 AST가 됩니다.
```python
Module(
    body=[
        Assert(
            test=Name(id='x', ctx=Load()),
            msg=Name(id='y', ctx=Load())
        )
    ],
    type_ignores=[]
)
```
이 문제점은 첫 번째 형태의 AST가 기술적으로 "부정확하다"는 것입니다. 왜냐하면 테스트와 메시지를 포함하는 `assert` 문을 위한 특수화된 AST 형태(두 번째 형태)가 이미 있기 때문입니다. 컴파일러에서 먼저 구현하면 이 변경이 지연되어, 도구들이 조정할 시간을 더 많이 가질 수 있으므로 하위 호환성 문제를 완화할 수 있습니다.

### 교육 방법 (How to Teach This)
새로운 `assert` 문 형태는 언어 표준의 일부로 문서화될 것입니다.

사용자에게 오류 메시지가 있는 `assert` 문 형태를 가르칠 때, 이제 괄호를 추가하는 것도 예상대로 작동하며, 이를 통해 문장을 여러 줄에 걸쳐 나눌 수 있다는 점을 언급할 수 있습니다.

### 참고 구현 (Reference Implementation)
파서에서의 참고 구현은 [이 브랜치](https://github.com/python/cpython/tree/pep-679-parser-impl)에서 찾을 수 있으며, 컴파일러에서의 참고 구현은 [이 브랜치](https://github.com/python/cpython/tree/pep-679-compiler-impl)에서 찾을 수 있습니다.

### 기각된 아이디어 (Rejected Ideas)

**키워드를 사용한 문법 추가 (Adding a syntax with a keyword):**
Python 문법의 다른 모든 곳에서 쉼표는 튜플이나 리스트의 항목, 함수의 매개변수/인수 또는 `import` 대상과 같이 동종 요소의 가변 길이 "리스트"를 구분합니다. Python 3.0에서 `except...as`가 도입된 이후, `assert` 문은 이러한 관례의 유일한 예외로 남아 있습니다.

사용자 혼란은 쉼표로 구분된 항목이 동등할 것이라는 기대에서 부분적으로 비롯될 수 있습니다. `assert` 문의 표현식과 메시지를 괄호로 묶으면 시각적으로 더 결속됩니다. `assert`가 함수 호출과 더 유사하게 보이는 것은 잘못된 사고방식을 조장할 수 있습니다.

가능한 해결책으로, 쉼표를 키워드로 대체하고 괄호를 허용하는 형태 (예: `assert condition else "message"`, `assert (condition else "message")`)가 제안되었습니다. 그러면 쉼표는 괄호 안에 나타나는 경우부터 시작하여 (이미 `SyntaxWarning`을 발생시키므로) 천천히 그리고 조심스럽게 사용이 중단될 수 있었습니다.

이 PEP의 제안자들은 완전히 새로운 문법을 추가하는 것이 이 PEP가 해결하고자 하는 일반적인 초보자 실수를 해결하지 못할 것이며, `assert` 문을 여러 줄에 걸쳐 포맷하는 것을 개선하지 못할 것이라고 믿습니다. 제안된 문법이 이를 개선한다고 믿습니다.

### 보안 관련 영향 (Security Implications)
이 변경으로 인한 보안 관련 영향은 없습니다.

### 감사 (Acknowledgements)
이 변경은 원래 python/cpython#90325에서 논의되고 제안되었습니다.

이 PEP를 작성하는 과정에서 도움을 준 Petr Viktorin에게 많은 감사를 표합니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.