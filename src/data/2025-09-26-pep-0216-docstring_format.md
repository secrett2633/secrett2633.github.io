---
title: "[Withdrawn] PEP 216 - Docstring Format"
excerpt: "Python Enhancement Proposal 216: 'Docstring Format'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/216/
toc: true
toc_sticky: true
date: 2025-09-26 16:33:50+0900
last_modified_at: 2025-09-26 16:33:50+0900
published: true
---
> **원문 링크:** [PEP 216 - Docstring Format](https://peps.python.org/pep-0216/)
>
> **상태:** Withdrawn | **유형:** Informational | **작성일:** 31-Jul-2000

PEP 216 – Docstring 형식

**작성자:** Moshe Zadka
**상태:** 철회됨 (Withdrawn)
**유형:** 정보 (Informational)
**생성일:** 2000년 7월 31일
**대체:** PEP 287에 의해 대체됨

---

## 초록 (Abstract)

모듈, 클래스, 함수와 같은 Python의 이름 있는 객체들은 `__doc__`이라는 문자열 속성을 가집니다. 정의 내의 첫 번째 표현식이 리터럴 문자열인 경우, 해당 문자열이 `__doc__` 속성에 할당됩니다.

`__doc__` 속성은 "Documentation String" 또는 "docstring"이라고 불립니다. 이는 종종 모듈, 클래스 또는 함수의 인터페이스를 요약하는 데 사용됩니다. 그러나 docstring에 대한 공통된 형식이 없기 때문에, docstring을 추출하고 이를 표준 형식(예: DocBook)의 문서로 변환하는 도구들이 많이 생겨나지 않았으며, 존재하는 도구들도 대부분 유지보수되지 않거나 사용되지 않고 있습니다.

## Perl 문서화 (Perl Documentation)

Perl에서는 대부분의 모듈이 POD (Plain Old Documentation)라는 형식으로 문서화됩니다. 이는 입력하기 쉽고 매우 낮은 수준의 형식으로, Perl 파서와 잘 통합됩니다. POD 문서를 info, HTML, man 페이지 등 다른 형식으로 변환하는 많은 도구들이 존재합니다. 하지만 Perl에서는 이 정보가 런타임에(run-time) 제공되지 않습니다.

## Java 문서화 (Java Documentation)

Java에서는 클래스와 함수 앞에 있는 특별한 주석이 코드 문서화 기능을 수행합니다. 이를 추출하여 HTML 문서로 변환하는 프로그램은 `javadoc`이라고 불리며, 표준 Java 배포판의 일부입니다. 그러나 지원되는 유일한 출력 형식은 HTML이며, JavaDoc은 HTML과 매우 밀접한 관계를 가집니다.

## Python Docstring의 목표 (Python Docstring Goals)

Python docstring은 파싱(parsing) 과정에서 쉽게 식별할 수 있으며, 런타임 인터프리터에서도 사용할 수 있습니다. 이러한 이중 목적은 때때로 문제가 될 수 있습니다. 예를 들어, 일부 개발자들은 런타임에 너무 많은 공간을 차지하는 것을 원치 않아 너무 긴 docstring을 작성하기를 꺼려 합니다.

또한, 현재 도구의 부족으로 인해 사람들은 객체의 docstring을 "print"하여 읽는 경향이 있어, 간결하고 마크업이 없는 형태를 선호하게 되었습니다. 이러한 경향은 docstring이 파싱하기 어려운 적은 정보만을 포함하게 만들어, 더 나은 문서 추출 도구의 개발을 저해합니다.

## 상위 수준 해결책 (High Level Solutions)

문자열이 실행 중인 프로그램에서 공간을 차지한다는 반론에 대응하기 위해, 문서 추출 도구는 정의 시작 부분에 나타나는 문자열 리터럴의 최대 접두사(maximum prefix)를 연결(concatenate)하도록 제안됩니다. 이들 중 첫 번째는 대화형 인터프리터에서도 사용할 수 있으므로, 몇 줄의 요약 내용을 포함해야 합니다.

## Docstring 형식 목표 (Docstring Format Goals)

`doc-sig`에서 논의된 docstring 형식의 목표는 다음과 같습니다.

1.  어떤 표준 텍스트 편집기로도 쉽게 입력할 수 있어야 합니다.
2.  일반적인 관찰자가 읽기 쉬워야 합니다.
3.  모듈 파싱을 통해 추론할 수 있는 정보를 포함해서는 안 됩니다.
4.  합리적인 모든 마크업 형식으로 변환될 수 있도록 충분한 정보를 포함해야 합니다.
5.  마크업 언어에 구애받지 않고 모듈의 전체 문서를 docstring으로 작성할 수 있어야 합니다.

## Docstring 내용 (Docstring Contents)

위 5번 요구사항을 위해 docstring에 무엇이 포함되어야 하는지 명시해야 합니다.

최소한 다음 내용이 포함되어야 합니다.

*   "이것은 Python의 어떤 것(추측해보세요)"을 의미하는 태그.
    *   예시: "The POP3 class"라는 문장에서 "POP3"를 마크업해야 합니다. 파서는 `poplib` 모듈의 내용에서 그것이 클래스임을 추측할 수 있지만, 우리가 그것을 추측하도록 만들어야 합니다.
*   "이것은 Python 클래스/모듈/클래스 변수/인스턴스 변수…"를 의미하는 태그.
    *   예시: 싱글턴(singleton) 클래스 A에 대한 일반적인 Python 관용구는 클래스를 `_A`로, `_A` 객체를 반환하는 함수를 `A`로 두는 것입니다. 그럼에도 불구하고 클래스를 `A`로 문서화하는 것이 일반적입니다. 이를 위해서는 "The class A"라고 말하고 `A`를 하이퍼링크되고 클래스로 마크업할 수 있는 기능이 필요합니다.
*   Python 소스 코드/Python 대화형 세션을 포함하는 쉬운 방법.
*   강조/굵게 (Emphasis/bold).
*   목록/표 (List/tables).

## Docstring 기본 구조 (Docstring Basic Structure)

docstring은 StructuredTextNG (http://www.zope.org/Members/jim/StructuredTextWiki/StructuredTextNG) 형식으로 작성될 것입니다. StructuredText는 위 (a)와 (b)를 처리할 만큼 아직 강력하지 않으므로, 이를 확장해야 합니다. [<선택적 설명>:python 식별자] 형식을 사용하는 것을 제안합니다. 예를 들어, `[class:POP3]`, `[:POP3.list]` 등입니다. 설명이 없으면 텍스트에서 추측할 것입니다.

## 미해결 문제 (Unresolved Issues)

*   ST에서 문자를 이스케이프(escape)하는 방법이 있나요? 있다면 어떻게 해야 하나요? (예: 줄 시작 부분의 `*`를 글머리 기호(bullet symbol)가 아닌 일반 문자 `*`로 사용)
*   Python 심볼에 대한 위 제안이 ST-NG와 호환되나요? ST-NG를 확장하여 이를 지원하는 것이 얼마나 어려울까요?
*   함수의 입력 및 출력 유형을 어떻게 설명할까요?
*   각 docstring(모듈/클래스/함수)에 어떤 추가 제약을 강제할까요?
*   추측 규칙(guesser rules)은 무엇인가요?

## 거부된 제안 (Rejected Suggestions)

*   **XML:** 입력하기 매우 어렵고, 읽기에는 너무 복잡합니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.