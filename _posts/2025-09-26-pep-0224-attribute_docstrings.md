---
title: "[Rejected] PEP 224 - Attribute Docstrings"
excerpt: "Python Enhancement Proposal 224: 'Attribute Docstrings'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/224/
toc: true
toc_sticky: true
date: 2025-09-26 16:43:48+0900
last_modified_at: 2025-09-26 16:43:48+0900
published: true
---
> **원문 링크:** [PEP 224 - Attribute Docstrings](https://peps.python.org/pep-0224/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 23-Aug-2000

## PEP 224 – 속성 Docstring (Attribute Docstrings)

### 개요
PEP 224는 Python 2.0 버전을 대상으로 "속성 docstring" 제안을 설명하는 문서입니다. 이 PEP는 Python 코드 내의 명명된 할당(named assignments), 특히 클래스 속성(class attributes)에 docstring을 추가하여 코드 문서화를 개선하려는 목적을 가졌습니다. 하지만 이 PEP는 최종적으로 **거부(Rejected)**되었습니다.

**상태**: 거부됨 (Rejected)
**작성자**: Marc-André Lemburg
**생성일**: 2000년 8월 23일
**Python 버전**: 2.1

### 서론 (Introduction)
이 PEP는 Python 2.0에 "속성 docstring" 기능을 도입하려는 제안을 담고 있습니다. 이는 해당 기능의 상태와 소유권을 추적하며, 기능에 대한 설명과 지원에 필요한 변경 사항을 개괄합니다.

### 제안 배경 (Rationale)
현재 Python은 클래스 정의, 함수 정의 또는 모듈의 첫 번째 문자열 리터럴 바로 다음에 오는 docstring만 처리합니다. 이러한 문자열 리터럴은 해당 객체의 `__doc__` 속성으로 추가되어, 도움말, 디버깅, 문서화 목적의 인트로스펙션(introspection) 도구에서 활용될 수 있습니다.

하지만 다른 위치에 나타나는 docstring은 단순히 무시되며 코드 생성에 영향을 주지 않습니다. 예를 들어:

```python
class C:
    "클래스 C docstring"
    a = 1
    "속성 C.a docstring (1)"
    b = 2
    "속성 C.b docstring (2)"
```
위 예시에서 docstring (1)과 (2)는 현재 Python 바이트코드 컴파일러에 의해 무시되지만, 이들 앞에 오는 명명된 할당(named assignments)을 문서화하는 데 활용될 수 있습니다.

이 PEP는 이러한 경우에도 docstring을 활용하여, 새로운 생성된 속성 이름으로 그 내용을 해당 객체에 추가하는 의미론(semantics)을 제안했습니다. 이는 클래스 속성(class attributes)에 인라인(inline) 문서화를 가능하게 하는 것이 주요 아이디어였습니다. 현재는 클래스의 docstring이나 주석을 통해서만 속성을 문서화할 수 있으며, 주석은 인트로스펙션에 사용할 수 없습니다.

### 구현 (Implementation)
Docstring은 바이트코드 컴파일러에 의해 표현식(expressions)으로 처리됩니다. 기존 구현은 특정 위치의 docstring만 특별히 처리하고, 그 외의 문자열은 완전히 무시합니다.

명명된 할당(예: 클래스 속성 정의)을 문서화하기 위해 docstring을 활용하려면, 컴파일러가 마지막으로 할당된 이름을 추적해야 합니다. 그리고 이 이름을 기반으로 docstring 내용을 포함하는 객체의 속성에 저장하도록 제안되었습니다. 이를 위해 다음과 같은 이름 맹글링(name mangling) 스키마를 사용하여 docstring이 특정 할당에 속함을 고유하게 식별하고 나중에 네임스페이스(namespace) 검사를 통해 찾을 수 있도록 했습니다:

`__doc_<attributename>__`

예를 들어, 위에 제시된 `class C` 예시의 경우 다음과 같은 새로운 클래스 속성이 생성될 것입니다:

`C.__doc_a__ == "속성 C.a docstring (1)"`
`C.__doc_b__ == "속성 C.b docstring (2)"`

### 구현 시의 주의사항 (Caveats of the Implementation)
제안된 구현 방식에는 몇 가지 주의할 점이 있었습니다. 예를 들어, 컴파일러가 함수 정의와 같은 비표현식(non-expression)을 처리할 때 컴파일 구조 변수를 재설정하지 않아, 다음 할당 또는 다음 docstring이 나타날 때까지 마지막 할당된 이름이 활성 상태로 유지될 수 있었습니다.

이는 docstring과 할당이 다른 표현식에 의해 분리될 수 있는 상황으로 이어질 수 있었습니다:

```python
class C:
    "C doc string"
    b = 2
    def x(self):
        "C.x doc string"
        y = 3
        return 1
    "b's doc string" # 이 docstring은 의도치 않게 __doc_b__에 할당될 수 있음
```
위 예시에서 `def x(self):` 정의가 사용된 할당 이름 변수를 재설정하지 않기 때문에, 컴파일러가 마지막 docstring에 도달했을 때 `b`에 대한 docstring으로 할당될 수 있었습니다. 이에 대한 가능한 해결책은 컴파일러의 모든 비표현식 노드에 대해 이름 변수를 재설정하는 것이었습니다.

### 발생 가능한 문제점 (Possible Problems)
1.  **Docstring과 속성 값의 의도치 않은 연결**: `x = "text" \ "x's docstring"`과 같이 역슬래시(`\`)로 인해 속성 값과 docstring이 연결될 수 있었습니다. 그러나 현대적인 구문 강조(syntax highlighting) 에디터를 사용하거나 속성 정의와 docstring 사이에 빈 줄을 삽입하면 이 문제는 쉽게 피할 수 있어 사소한 것으로 간주되었습니다.
2.  **주석으로 사용된 삼중 따옴표 문자열**: 만약 주석 문자열 시작 직전에 할당이 있다면, 컴파일러는 해당 주석을 docstring 속성으로 처리하고 위 로직을 적용할 수 있었습니다. 이는 문서화되지 않은 속성에 대한 docstring을 생성할 뿐, 기능적인 오류를 유발하지는 않았습니다.

### BDFL (Guido van Rossum)의 의견 (Comments from our BDFL)
Guido van Rossum (당시 BDFL, Benevolent Dictator For Life)은 이 제안에 대해 "속성 docstring" 아이디어 자체는 "어느 정도 마음에 들지만" (즉, 크게 중요하지는 않음), 두 가지 주요 불만이 있었습니다:

1.  **모호한 구문(Ambiguous syntax)**: "홀로 있는 문자열 리터럴(stand-alone string literal)이 다른 용도로 사용될 수 있으며, 갑자기 속성 docstring이 될 수 있다"는 점을 지적했습니다.
2.  **접근 방식 불만(Access method)**: `__doc_<attrname>__`과 같은 접근 방식에 대해서도 불만을 표했습니다.

저자는 구문의 모호성은 컴파일러에 추가적인 검사를 도입하여 해결할 수 있다고 답했습니다. 또한 접근 방식에 대해서는 `__doc__`와 일치하기 위해 두 개의 밑줄로 시작하고, 인트로스펙션으로 추출 가능하며, 클래스 상속과 호환되는 다른 어떤 이름이든 가능하다고 설명했습니다.

그러나 2001년 3월, Guido는 이 PEP를 거부하며 다음과 같은 이유를 밝혔습니다:

> ...유용할 수도 있지만, 제안된 구문이 정말 싫습니다.
>
> `a = 1`
> `"foo bar"`
> `b = 1`
>
> `"foo bar"`가 `a`의 docstring인지 `b`의 docstring인지 알 방법이 전혀 없습니다.
> ...
>
> 이 컨벤션을 사용할 수 있습니다:
>
> `a = 1`
> `__doc_a__ = "doc string for a"`
>
> 이렇게 하면 런타임에 사용할 수 있습니다.
>
> > Python에 속성 문서화를 추가하는 것에 완전히 반대하시나요, 아니면 구현 방식 때문인가요? 제가 PEP를 작성했을 당시에는 PEP에 제안된 구문이 매우 직관적이라고 생각했고, 많은 c.l.p 및 개인 이메일 사용자들도 지지했습니다.
>
> 구현 때문이 아니라 구문 때문입니다. 변수와 docstring 사이에 충분히 명확한 연결을 전달하지 않습니다.

결론적으로, Guido는 제안된 구문이 변수와 docstring 사이에 충분히 명확한 연결을 제공하지 않는다고 판단하여 PEP를 거부했습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.