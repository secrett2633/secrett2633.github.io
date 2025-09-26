---
title: "[Active] PEP 257 - Docstring Conventions"
excerpt: "Python Enhancement Proposal 257: 'Docstring Conventions'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/257/
toc: true
toc_sticky: true
date: 2025-09-26 17:37:43+0900
last_modified_at: 2025-09-26 17:37:43+0900
published: true
---
> **원문 링크:** [PEP 257 - Docstring Conventions](https://peps.python.org/pep-0257/)
>
> **상태:** Active | **유형:** Informational | **작성일:** 29-May-2001


# PEP 257 – Docstring Convention

## 개요 (Abstract)

이 PEP는 Python docstring(독스트링)과 관련된 의미론 및 컨벤션(관례)을 문서화합니다.

## 도입 배경 (Rationale)

이 PEP의 목표는 docstring의 상위 수준 구조, 즉 무엇을 포함해야 하고 어떻게 표현해야 하는지를 표준화하는 것입니다 (docstring 내의 마크업 문법은 다루지 않습니다). 이 PEP는 규칙이나 문법이 아닌, 컨벤션을 담고 있습니다.

Tim Peters는 "보편적인 컨벤션은 유지보수성, 명확성, 일관성, 그리고 좋은 프로그래밍 습관의 기초를 모두 제공한다. 당신의 의지에 반하여 따르도록 강요하지는 않는다. 그것이 Python이다!"라고 말했습니다.

이 컨벤션을 위반하더라도 가장 심한 결과는 좋지 않은 시선을 받는 것뿐입니다. 그러나 Docutils(PEP 256, PEP 258)와 같은 일부 소프트웨어는 이 컨벤션을 인지하고 있으므로, 이를 따르면 최상의 결과를 얻을 수 있습니다.

## 세부 사항 (Specification)

### Docstring이란? (What is a Docstring?)

Docstring은 모듈, 함수, 클래스 또는 메서드 정의의 첫 번째 문장으로 나타나는 문자열 리터럴입니다. 이러한 docstring은 해당 객체의 `__doc__` 특수 속성이 됩니다.

모든 모듈은 일반적으로 docstring을 가져야 하며, 모듈에 의해 외부에 노출되는 모든 함수와 클래스도 docstring을 가져야 합니다. 공개 메서드 ( `__init__` 생성자 포함) 또한 docstring을 가져야 합니다. 패키지는 패키지 디렉토리 내의 `__init__.py` 파일의 모듈 docstring으로 문서화될 수 있습니다.

Python 코드의 다른 곳에 나타나는 문자열 리터럴도 문서화 역할을 할 수 있습니다. 이들은 Python 바이트코드 컴파일러에 의해 인식되지 않으며 런타임 객체 속성(즉, `__doc__`에 할당되지 않음)으로 접근할 수 없지만, 두 가지 유형의 추가 docstring은 소프트웨어 도구에 의해 추출될 수 있습니다:
*   모듈, 클래스 또는 `__init__` 메서드의 최상위에서 간단한 할당 바로 뒤에 나타나는 문자열 리터럴을 "속성 Docstring (attribute docstrings)"이라고 합니다.
*   다른 docstring 바로 뒤에 나타나는 문자열 리터럴을 "추가 Docstring (additional docstrings)"이라고 합니다.

속성 및 추가 docstring에 대한 자세한 설명은 PEP 258, "Docutils Design Specification"을 참조하십시오.

일관성을 위해 항상 `"""triple double quotes"""`를 사용하여 docstring을 감싸야 합니다. docstring에 백슬래시를 사용하는 경우 `r"""raw triple double quotes"""`를 사용하십시오.

docstring에는 한 줄 Docstring과 여러 줄 Docstring의 두 가지 형태가 있습니다.

### 한 줄 Docstring (One-line Docstrings)

한 줄 Docstring은 매우 명확한 경우에 사용됩니다. 말 그대로 한 줄에 들어가야 합니다. 예를 들어:

```python
def kos_root():
    """Return the pathname of the KOS root directory."""
    global _kos_root
    if _kos_root:
        return _kos_root
    # ...
```
참고:
*   문자열이 한 줄에 들어가더라도 트리플 따옴표(`"""`)를 사용합니다. 이는 나중에 확장하기 쉽게 만듭니다.
*   닫는 따옴표는 여는 따옴표와 같은 줄에 있습니다. 이는 한 줄 Docstring에 더 보기 좋습니다.
*   docstring 앞이나 뒤에 빈 줄이 없습니다.
*   docstring은 마침표로 끝나는 구문입니다. 이는 함수나 메서드의 효과를 설명이 아닌 명령(`“Do this”`, `“Return that”`)으로 규정합니다. 예를 들어, `“Returns the pathname …”`와 같이 작성하지 마십시오.
*   한 줄 Docstring은 함수/메서드의 매개변수를 반복하는 "시그니처"가 되어서는 안 됩니다 (이는 introspection으로 얻을 수 있습니다).
    ```python
    def function(a, b):
        """function(a, b) -> list"""
    ```
    위와 같은 유형의 docstring은 introspection이 불가능한 C 함수 (내장 함수 등)에만 적합합니다. 그러나 반환 값의 특성은 introspection으로 결정할 수 없으므로 언급되어야 합니다. 이러한 docstring에 대한 권장 형식은 다음과 같습니다:
    ```python
    def function(a, b):
        """Do X and return a list."""
    ```
    (물론 `“Do X”`는 유용한 설명으로 대체되어야 합니다!)

### 여러 줄 Docstring (Multi-line Docstrings)

여러 줄 Docstring은 한 줄 Docstring과 같은 요약 줄로 시작하고, 그 뒤에 빈 줄, 그리고 더 자세한 설명이 이어집니다. 요약 줄은 자동 인덱싱 도구에 사용될 수 있으므로, 한 줄에 들어가고 docstring의 나머지 부분과 빈 줄로 구분되는 것이 중요합니다. 요약 줄은 여는 따옴표와 같은 줄에 있거나 다음 줄에 있을 수 있습니다. 전체 docstring은 첫 줄의 따옴표와 동일하게 들여쓰기 됩니다.

클래스를 문서화하는 모든 docstring (한 줄 또는 여러 줄) 뒤에는 빈 줄을 삽입하십시오. 일반적으로 클래스의 메서드는 단일 빈 줄로 서로 구분되며, docstring은 첫 번째 메서드에서 빈 줄로 오프셋 되어야 합니다.

스크립트 (독립 실행형 프로그램)의 docstring은 잘못되거나 누락된 인수로 스크립트가 호출될 때 (또는 `“-h”` 옵션과 함께 호출될 때) 인쇄되는 "사용법" 메시지로 사용될 수 있어야 합니다. 이러한 docstring은 스크립트의 기능과 명령줄 구문, 환경 변수 및 파일을 문서화해야 합니다. 사용법 메시지는 상당히 정교할 수 있으며 (여러 화면 분량), 새로운 사용자가 명령을 올바르게 사용하는 데 충분해야 하며, 숙련된 사용자를 위한 모든 옵션 및 인수에 대한 완전한 빠른 참조가 되어야 합니다.

모듈의 docstring은 일반적으로 모듈에서 내보내는 클래스, 예외 및 함수 (및 기타 모든 객체)를 각 객체에 대한 한 줄 요약과 함께 나열해야 합니다. (이러한 요약은 일반적으로 객체의 docstring에 있는 요약 줄보다 세부 정보가 적습니다). 패키지의 docstring (즉, 패키지의 `__init__.py` 모듈의 docstring)도 패키지에서 내보내는 모듈 및 서브패키지를 나열해야 합니다.

함수 또는 메서드의 docstring은 해당 동작을 요약하고 인자, 반환 값, 부작용, 발생하는 예외, 그리고 호출될 수 있는 시점에 대한 제약 사항 (해당하는 경우 모두)을 문서화해야 합니다. 선택적 인자는 표시되어야 합니다. 키워드 인자가 인터페이스의 일부인지 여부도 문서화되어야 합니다.

클래스의 docstring은 해당 동작을 요약하고 공개 메서드 및 인스턴스 변수를 나열해야 합니다. 클래스가 서브클래스화될 예정이고 서브클래스를 위한 추가 인터페이스가 있는 경우, 이 인터페이스는 별도로 (docstring에) 나열되어야 합니다. 클래스 생성자는 해당 `__init__` 메서드의 docstring에 문서화되어야 합니다. 개별 메서드는 자체 docstring으로 문서화되어야 합니다.

클래스가 다른 클래스를 서브클래스화하고 해당 동작이 대부분 해당 클래스로부터 상속되는 경우, 해당 docstring은 이를 언급하고 차이점을 요약해야 합니다. 서브클래스 메서드가 슈퍼클래스 메서드를 대체하고 슈퍼클래스 메서드를 호출하지 않는 경우 "override" 동사를 사용하고, 서브클래스 메서드가 (자체 동작 외에) 슈퍼클래스 메서드를 호출하는 경우 "extend" 동사를 사용하십시오.

실행 중인 텍스트에서 함수나 메서드의 인자를 대문자로 언급하는 Emacs 컨벤션을 사용하지 마십시오. Python은 대소문자를 구분하며 인자 이름은 키워드 인자로 사용될 수 있으므로, docstring은 올바른 인자 이름을 문서화해야 합니다. 각 인자를 별도의 줄에 나열하는 것이 가장 좋습니다. 예를 들어:

```python
def complex(real=0.0, imag=0.0):
    """Form a complex number.
    Keyword arguments:
    real -- the real part (default 0.0)
    imag -- the imaginary part (default 0.0)
    """
    if imag == 0.0 and real == 0.0:
        return complex_zero
    # ...
```
전체 docstring이 한 줄에 들어가지 않는 한, 닫는 따옴표는 단독으로 한 줄에 배치하십시오. 이렇게 하면 Emacs의 `fill-paragraph` 명령을 사용할 수 있습니다.

### Docstring 들여쓰기 처리 (Handling Docstring Indentation)

Docstring 처리 도구는 docstring의 두 번째 줄부터 이후 줄까지 균일한 양의 들여쓰기를 제거하는데, 이는 첫 번째 줄 이후의 모든 비어 있지 않은 줄의 최소 들여쓰기와 같습니다. docstring의 첫 번째 줄 (즉, 첫 번째 개행 문자까지)의 들여쓰기는 중요하지 않으며 제거됩니다. docstring 내의 이후 줄들의 상대적인 들여쓰기는 유지됩니다. docstring의 시작과 끝에 있는 빈 줄은 제거되어야 합니다.

코드가 말보다 훨씬 더 정확하므로, 알고리즘 구현은 다음과 같습니다:

```python
def trim(docstring):
    if not docstring:
        return ''
    # Convert tabs to spaces (following the normal Python rules)
    # and split into a list of lines:
    lines = docstring.expandtabs().splitlines()
    # Determine minimum indentation (first line doesn't count):
    indent = sys.maxsize
    for line in lines[1:]:
        stripped = line.lstrip()
        if stripped:
            indent = min(indent, len(line) - len(stripped))
    # Remove indentation (first line is special):
    trimmed = [lines[0].strip()]
    if indent < sys.maxsize:
        for line in lines[1:]:
            trimmed.append(line[indent:].rstrip())
    # Strip off trailing and leading blank lines:
    while trimmed and not trimmed[-1]:
        trimmed.pop()
    while trimmed and not trimmed[0]:
        trimmed.pop(0)
    # Return a single string:
    return '\n'.join(trimmed)
```

이 예제의 docstring은 두 개의 개행 문자를 포함하며 따라서 3줄 길이입니다. 첫 번째와 마지막 줄은 비어 있습니다:

```python
def foo():
    """
    This is the second line of the docstring.
    """
```
예시:

```python
>>> print(repr(foo.__doc__))
'\n    This is the second line of the docstring.\n    '
>>> foo.__doc__.splitlines()
['', '    This is the second line of the docstring.', '    ']
>>> trim(foo.__doc__)
'This is the second line of the docstring.'
```

일단 trim 되면, 다음 docstring들은 동일합니다:

```python
def foo():
    """A multi-line docstring.
    """
def bar():
    """
    A multi-line docstring.
    """
```

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.