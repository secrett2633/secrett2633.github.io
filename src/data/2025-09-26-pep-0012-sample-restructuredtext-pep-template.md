---
title: "[Active] PEP 12 - Sample reStructuredText PEP Template"
excerpt: "Python Enhancement Proposal 12: 'Sample reStructuredText PEP Template'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/12/
toc: true
toc_sticky: true
date: 2025-09-26 15:52:34+0900
last_modified_at: 2025-09-26 15:52:34+0900
published: true
---
> **원문 링크:** [PEP 12 - Sample reStructuredText PEP Template](https://peps.python.org/pep-0012/)
>
> **상태:** Active | **유형:** Process | **작성일:** 05-Aug-2002

PEP 12는 `reStructuredText` 형식으로 Python Enhancement Proposal (PEP)을 작성하기 위한 샘플 템플릿 문서입니다. 이 PEP의 목표는 새로운 PEP를 제출하려는 저자들이 표준화된 형식을 쉽게 따를 수 있도록 돕는 것입니다.

## 개요 (Abstract)

이 PEP는 `reStructuredText` 기반의 PEP를 생성하기 위한 기본적인 틀 또는 샘플 템플릿을 제공합니다. PEP 1의 내용 가이드라인과 함께 이 템플릿을 사용하면, PEP 저자는 자신의 PEP를 아래에 명시된 형식에 맞추어 쉽게 작성할 수 있습니다.

**참고:** 웹에서 이 PEP를 읽고 있다면, 아래 단계를 완료하기 위해 먼저 이 PEP의 텍스트(`reStructuredText`) 소스 파일을 확보해야 합니다. HTML 파일을 템플릿으로 사용하지 마십시오!

이 PEP (및 모든 PEP)의 소스 파일은 PEPs 저장소 및 각 PEP 하단 링크를 통해 찾을 수 있습니다.

## 도입 배경 (Rationale)

PEP를 제출할 의향이 있다면, 형식이 맞지 않아 자동으로 거부되는 것을 방지하기 위해 이 템플릿을 아래의 형식 가이드라인과 함께 사용해야 합니다.

`reStructuredText`는 PEP 저자에게 유용한 기능과 표현력을 제공하면서도, 소스 텍스트의 가독성을 유지합니다. 처리된 HTML 형식은 독자들에게 라이브 하이퍼링크, 스타일이 적용된 텍스트, 테이블, 이미지, 자동 목차 등 다양한 기능을 제공합니다.

## 템플릿 사용 방법 (How to Use This Template)

이 템플릿을 사용하려면 먼저 자신의 PEP가 Informational (정보성) 또는 Standards Track (표준 트랙) PEP 중 어떤 유형이 될지 결정해야 합니다. 대부분의 PEP는 Python 언어 또는 표준 라이브러리에 새로운 기능을 제안하기 때문에 Standards Track 유형에 속합니다. 확실하지 않다면 PEP 1을 참조하거나 PEPs 저장소에 이슈를 제기하여 도움을 요청하십시오.

PEP 유형을 결정한 후에는 다음 지침을 따릅니다.

1.  이 파일 (`.rst` 파일, HTML 아님!)을 복사합니다.
2.  새 파일 이름을 `pep-NNNN.rst`로 지정합니다. 여기서 `NNNN`은 다음으로 사용 가능한 번호 (게시되었거나 PR에 있는 PEP에 사용되지 않은 번호)입니다. 파일 이름은 `pep-0012.rst`처럼 0으로 채워져야 하지만, 헤더(`PEP: 12`)는 0으로 채워지지 않습니다.
3.  "PEP: 12" 헤더를 "PEP: NNNN"으로 변경하고 파일 이름과 일치시킵니다.
4.  Title 헤더를 PEP의 제목으로 변경합니다.
5.  Author 헤더에 이름과 선택적으로 이메일 주소를 포함하도록 변경합니다. 이름이 먼저 오고 괄호 안에 없어야 하며, 이메일 주소는 꺾쇠 괄호(`< >`) 안에 있어야 합니다.
6.  저자 중 Python 코어 개발자가 없는 경우, PEP를 후원하는 코어 개발자의 이름을 Sponsor 헤더에 추가합니다.
7.  Discussions-To 헤더 아래에 PEP의 공식 토론 스레드(예: Python-Dev, Discourse 등)의 직접 URL을 추가합니다. (스레드가 공식 초안 제출 후 생성될 예정이라면 "Pending"으로 두었다가, PEP가 PEPs 저장소에 성공적으로 병합되고 해당 토론 스레드를 생성한 즉시 URL로 업데이트해야 합니다.) 자세한 내용은 PEP 1을 참조하십시오.
8.  Status 헤더를 "Draft"로 변경합니다.
9.  Standards Track PEP의 경우 Type 헤더를 "Standards Track"으로 변경합니다. Informational PEP의 경우 Type 헤더를 "Informational"으로 변경합니다.
10. Standards Track PEP의 경우, 제안하는 기능이 다른 개발 중인 PEP의 승인에 의존한다면 Type 헤더 바로 뒤에 Requires 헤더를 추가합니다. 값은 의존하는 PEP의 번호여야 합니다. (종속 기능이 Final PEP에 설명되어 있다면 이 헤더를 추가하지 마십시오.)
11. Created 헤더를 오늘 날짜로 변경합니다. `dd-mmm-yyyy` 형식 (예: `05-Aug-2002`)을 따릅니다.
12. Standards Track PEP의 경우, Created 헤더 뒤에 Python-Version 헤더를 추가하고 다음 계획된 Python 버전을 값으로 설정합니다. (알파 또는 베타 릴리스 지정을 사용하지 마십시오.)
13. PEP가 Topic Index에 표시된 토픽 중 하나에 속한다면 Topic 헤더를 추가합니다. 대부분의 PEP에는 해당하지 않습니다.
14. Post-History는 지금은 그대로 둡니다. PEP를 지정된 토론 포럼에 게시할 때마다 날짜와 해당 링크를 이 헤더에 추가합니다.
15. PEP가 이전 PEP를 대체하는 경우 Replaces 헤더를 추가합니다. 이 헤더의 값은 새 PEP가 대체하는 PEP의 번호입니다. (이전 PEP가 "final" 형식, 즉 Accepted, Final 또는 Rejected 상태인 경우에만 이 헤더를 추가합니다.)
16. 이제 Abstract, Rationale 및 PEP의 다른 내용을 작성하여 이 템플릿의 내용을 자신의 텍스트로 대체합니다. (특히 탭 문자 금지 및 들여쓰기 요구 사항과 같은 형식 가이드라인을 준수하십시오.) "Suggested Sections"를 참조하여 포함할 섹션 템플릿을 확인하십시오.
17. Footnotes 섹션을 업데이트하고, 텍스트에서 참조된 모든 각주 및 비인라인 링크 대상을 나열합니다.
18. `./build.py`를 실행하여 PEP가 오류 없이 렌더링되는지 확인하고, `build/pep-NNNN.html`의 출력이 의도한 대로 보이는지 확인합니다.
19. PEPs 저장소에 Pull Request를 생성합니다.

### 가능한 헤더 필드 (Possible Header Fields)

다음은 가능한 모든 헤더 필드입니다 (대괄호 안의 내용은 대체하거나, 선행 `*`로 표시된 선택 사항이 해당하지 않으면 필드를 제거해야 합니다).

```
PEP: [NNN]
Title: [...]
Author: [Full Name <email at example.com>]
Sponsor: *[Full Name <email at example.com>]
PEP-Delegate:
Discussions-To: [URL]
Status: Draft
Type: [Standards Track | Informational | Process]
Topic: *[Governance | Packaging | Release | Typing]
Requires: *[NNN]
Created: [DD-MMM-YYYY]
Python-Version: *[M.N]
Post-History: [`DD-MMM-YYYY <URL>`__]
Replaces: *[NNN]
Superseded-By: *[NNN]
Resolution:
```


## reStructuredText PEP 형식 요구 사항 (ReStructuredText PEP Formatting Requirements)

다음은 `reStructuredText` 문법에 대한 PEP별 요약입니다. 단순성과 간결성을 위해 많은 세부 사항은 생략됩니다. 자세한 내용은 아래 Resources 섹션을 참조하십시오. 예시에는 리터럴 블록(마크업 처리가 수행되지 않는 블록)이 사용되어 일반 텍스트 마크업을 보여줍니다.

### 일반 (General)

*   줄은 일반적으로 79열을 넘지 않아야 합니다 (URL 등은 예외).
*   문서에는 탭 문자를 사용해서는 안 됩니다.

### 섹션 제목 (Section Headings)

*   PEP 제목은 0열에서 시작해야 하며, 책 제목처럼 각 단어의 첫 글자는 대문자로 표기해야 합니다. 약어는 모두 대문자여야 합니다.
*   섹션 제목은 밑줄로 장식되어야 하며, 밑줄은 0열에서 시작하여 제목 텍스트의 오른쪽 끝까지 (최소 4자) 확장되어야 합니다.
    *   1단계 섹션 제목은 `=` (등호)로 밑줄을 긋습니다.
    *   2단계 섹션 제목은 `-` (하이픈)으로 밑줄을 긋습니다.
    *   3단계 섹션 제목은 `''` (작은따옴표 또는 아포스트로피)로 밑줄을 긋습니다.
    *   예시:
        ```
        First-Level Title
        =================
        Second-Level Title
        ------------------
        Third-Level Title
        '''''''''''''''''
        ```
       
*   PEP에 3단계 이상의 섹션이 있는 경우, 1단계 및 2단계에 대해 오버라인/밑줄로 장식된 제목을 다음과 같이 삽입할 수 있습니다.
    ```
    ============================
    First-Level Title (optional)
    ============================
    -----------------------------
    Second-Level Title (optional)
    -----------------------------
    Third-Level Title
    =================
    Fourth-Level Title
    ------------------
    Fifth-Level Title
    '''''''''''''''''
    ```
   
*   PEP에 5단계 이상의 섹션을 사용하지 않아야 합니다.
*   섹션 본문의 마지막 줄과 다음 섹션 제목 사이에는 두 개의 빈 줄을 사용해야 합니다. 하위 섹션 제목이 섹션 제목 바로 뒤에 오는 경우, 한 줄의 빈 줄로 충분합니다.
*   각 섹션의 본문은 일반적으로 들여쓰기되지 않습니다.

### 단락 (Paragraphs)

*   단락은 빈 줄로 구분된 왼쪽 정렬 텍스트 블록입니다.
*   블록 인용구나 목록 항목과 같은 들여쓰기된 구성의 일부가 아닌 한, 단락은 들여쓰기되지 않습니다.

### 인라인 마크업 (Inline Markup)

*   단락 및 기타 텍스트 블록 내의 일부 텍스트는 스타일을 지정할 수 있습니다.
    *   `*강조*` (단일 별표, 일반적으로 이탤릭체) 또는 ` **강력 강조** ` (이중 별표, 일반적으로 볼드체)로 텍스트를 표시할 수 있습니다.
    *   ``인라인 리터럴`` (이중 백틱 사용)은 일반적으로 모노스페이스 글꼴로 렌더링됩니다. 이중 백틱 내에서는 추가 마크업 인식이 수행되지 않으므로, 모든 종류의 코드 스니펫에 안전합니다.

### 블록 인용 (Block Quotes)

*   블록 인용은 들여쓰기된 본문 요소로 구성됩니다.
    ```
    This is a paragraph.
        This is a block quote.
        A block quote may contain many paragraphs.
    ```
   
*   블록 인용은 다른 소스에서 가져온 긴 구절을 인용하는 데 사용됩니다.
*   각 들여쓰기 수준에 4칸 공백을 사용합니다.

### 리터럴 블록 (Literal Blocks)

*   리터럴 블록은 코드 샘플 및 기타 미리 서식화된 텍스트에 사용됩니다.
*   리터럴 블록을 나타내려면 들여쓰기된 텍스트 블록 앞에 `::` (두 개의 콜론)을 붙이거나 `.. code-block::` 지시문을 사용합니다.
*   텍스트 블록을 4칸 들여쓰기합니다. 리터럴 블록은 들여쓰기가 끝날 때까지 계속됩니다.
    ```
    This is a typical paragraph. A literal block follows.
    ::

        for a in [5, 4, 3, 2, 1]:    # this is program code, shown as-is
            print(a)
        print("it's...")
    ```
   
*   `::`는 모든 단락 끝에서도 인식됩니다. 바로 앞에 공백이 없으면 최종 출력에는 하나의 콜론이 남습니다.
*   기본적으로 리터럴 블록은 Python 코드로 구문 강조 표시됩니다. 다른 언어/형식의 코드 또는 데이터를 포함하는 특정 블록의 경우, `.. code-block:: language` 지시문을 사용하고 `language` 대신 적절한 Pygments 렉서의 "짧은 이름"을 사용합니다 (또는 강조 표시를 비활성화하려면 `text`).
*   주로 특정 언어의 리터럴 블록을 포함하는 PEP의 경우, PEP 본문 상단 (헤더 아래, Abstract 위에)에 `.. highlight:: language` 지시문을 사용합니다. 이렇게 하면 `.. code-block`에서 달리 지정되지 않는 한 모든 리터럴 블록이 해당 언어로 처리됩니다.

### 목록 (Lists)

*   불릿 목록 항목은 `-`, `*`, 또는 `+` (하이픈, 별표 또는 더하기 기호) 중 하나로 시작하며, 그 뒤에 공백과 목록 항목 본문이 옵니다.
*   목록 항목 본문은 불릿에 상대적으로 왼쪽 정렬 및 들여쓰기되어야 합니다.
    ```
    This paragraph is followed by a list.
    *   This is the first bullet list item.

    *   This is the first paragraph in the second item in the list.
        This is the second paragraph in the second item in the list.

        - This is a sublist.
    *   This is the third item of the main list.
    This paragraph is not part of the list.
    ```
   
*   열거형(번호 매기기) 목록 항목은 불릿 대신 열거자를 사용한다는 점을 제외하고 유사합니다.
    *   열거자는 숫자(1, 2, 3, …), 문자(A, B, C, …; 대문자 또는 소문자), 또는 로마 숫자(i, ii, iii, iv, …; 대문자 또는 소문자)이며, 마침표 접미사("1.", "2."), 괄호("(1)", "(2)"), 또는 오른쪽 괄호 접미사("1)", "2)")로 형식이 지정됩니다.
    ```
    1.  As with bullet list items, the left edge of paragraphs must align.
    2.  Each list item may contain multiple paragraphs, sublists, etc.
        This is the second paragraph of the second list item.
        a) Enumerated lists may be nested.
        b) Blank lines may be omitted between list items.
    ```
   
*   정의 목록은 다음과 같이 작성됩니다.
    ```
    what
        Definition lists associate a term with a definition.
    how
        The term is a one-line phrase, and the definition is one or more
        paragraphs or body elements, indented relative to the term.
    ```
   

### 표 (Tables)

*   단순한 표는 쉽고 간결합니다.
    ```
    ===== ===== =======
    A      B    A and B
    ===== ===== =======
    False False False
    True False False
    False True False
    True True True
    ===== ===== =======
    ```
   
*   표에는 최소 두 개의 열이 있어야 합니다 (섹션 제목과 구별하기 위해). 열 병합은 하이픈으로 밑줄을 사용합니다.
*   첫 번째 열 셀의 텍스트는 새 행을 시작합니다. 첫 번째 열에 텍스트가 없으면 계속되는 줄을 나타냅니다.

### 하이퍼링크 (Hyperlinks)

*   PEP 본문에서 외부 웹 페이지를 참조할 때, 페이지 제목이나 적절한 설명을 텍스트에 포함하고, 인라인 하이퍼링크 또는 URL이 있는 별도의 명시적 대상(explicit target)을 사용해야 합니다.
*   PEP 본문 텍스트에 순수 URL을 포함하지 말고, 가능한 경우 HTTPS 링크를 사용해야 합니다.
*   하이퍼링크 참조는 백틱과 뒤따르는 밑줄을 사용하여 참조 텍스트를 마크업합니다. 참조 텍스트가 단일 단어인 경우 백틱은 선택 사항입니다.
    *   예시: `Python website`_
*   링크를 한 번만 참조하고 텍스트와 함께 인라인으로 정의하려면, 연결하려는 텍스트 뒤에, 닫는 백틱 앞에, 그리고 텍스트와 여는 백틱 사이에 공백을 두고 꺾쇠 괄호(`< >`) 안에 링크를 삽입합니다.
    *   예시: `website <https://www.python.org/>`__ (이중 밑줄은 익명 참조를 만듭니다).
*   하나의 링크를 여러 곳에서 다른 연결 텍스트와 함께 사용하거나, 연결 텍스트 변경 시 링크 대상 이름을 업데이트할 필요가 없도록 하려면, 연결할 텍스트 뒤에 꺾쇠 괄호 안에 대상 이름을 포함하고, 대상 이름 뒤에 닫는 꺾쇠 괄호 앞에 밑줄을 붙입니다.
    *   예시: `documentation <pydocs_>`_
*   명시적 대상은 URL을 제공합니다. 대상을 PEP 끝의 Footnotes 섹션이나 참조가 있는 단락 바로 뒤에 배치합니다. 하이퍼링크 대상은 두 개의 마침표와 공백으로 시작하고, 그 뒤에 선행 밑줄, 참조 텍스트, 콜론, 그리고 URL이 옵니다.
    ```
    .. _Python web site: https://www.python.org/
    .. _pydocs: https://docs.python.org/
    ```
   

### 내부 및 PEP/RFC 링크 (Internal and PEP/RFC Links)

*   하이퍼링크와 동일한 메커니즘을 내부 참조에도 사용할 수 있습니다. 모든 고유한 섹션 제목은 암시적으로 내부 하이퍼링크 대상을 정의합니다.
    *   예시: `Abstract`_ 섹션 참조.
*   PEPs 또는 RFCs를 참조하려면 항상 `:pep:` 및 `:rfc:` 역할을 사용하고, 하드코딩된 URL을 사용하지 마십시오.
    *   예시: `See :pep:`1` for more information on how to write a PEP, and :pep:`the Hyperlink section of PEP 12 <12#hyperlinks>` for how to link.`

### 각주 (Footnotes)

*   각주 참조는 왼쪽 대괄호, 레이블, 오른쪽 대괄호, 그리고 뒤따르는 밑줄로 구성됩니다. 숫자 대신 `#word` 형식의 레이블을 사용합니다.
    *   예시: `The TeXbook [#TeXbook]_`
*   각주 참조 앞에는 공백이 있어야 합니다.
*   각주는 추가적인 노트, 설명, 경고, 그리고 온라인에서 쉽게 이용할 수 없는 책이나 다른 출처를 참조하는 데 사용됩니다.
*   각주는 `..`로 시작하고, 그 뒤에 각주 마커 (밑줄 없음), 그리고 각주 본문이 옵니다.
    ```
    .. [#TeXbook] Donald Knuth's *The TeXbook*, pages 195 and 196.
    ```
   
*   각주와 각주 참조는 자동으로 번호가 매겨집니다.

### 이미지 (Images)

*   PEP에 다이어그램이나 다른 그래픽이 포함된 경우, `image` 지시문을 사용하여 처리된 출력에 포함할 수 있습니다.
    ```
    .. image:: diagram.png
    ```
   
*   모든 브라우저 친화적인 그래픽 형식이 가능하지만, 그래픽에는 PNG, 사진에는 JPEG, 애니메이션에는 GIF를 선호해야 합니다. 현재 PEP 빌드 시스템과의 호환성 문제로 SVG는 피해야 합니다.
*   접근성과 소스 텍스트 독자를 위해, `image` 지시문의 `:alt:` 옵션을 사용하여 이미지에 대한 설명과 포함된 주요 정보를 포함해야 합니다.

### 주석 (Comments)

*   주석은 명시적 마크업 시작 (`.. `) 바로 뒤에 오는 들여쓰기된 임의의 텍스트 블록입니다.
*   `..`를 자체 줄에 두어 주석이 다른 명시적 마크업 구성으로 오해되지 않도록 합니다.
*   주석은 처리된 문서에서 보이지 않습니다.
    ```
    .. This section should be updated in the final PEP. Ensure the date is accurate.
    ```
   

### 이스케이프 메커니즘 (Escaping Mechanism)

*   `reStructuredText`는 백슬래시(`\`)를 사용하여 마크업 문자에 부여된 특수 의미를 무시하고 리터럴 문자를 얻습니다. 리터럴 백슬래시를 얻으려면 이스케이프된 백슬래시(`\\`)를 사용합니다.
*   백슬래시에 특별한 의미가 없는 두 가지 컨텍스트가 있습니다: 리터럴 블록과 인라인 리터럴. 이러한 컨텍스트에서는 마크업 인식이 수행되지 않으며, 단일 백슬래시는 이중화할 필요 없이 리터럴 백슬래시를 나타냅니다.

### Intersphinx

*   Intersphinx 참조를 사용하여 Python 문서 `packaging.python.org`, `typing.python.org`와 같은 다른 Sphinx 사이트로 쉽게 상호 참조하여 페이지, 섹션 및 Python/C 객체를 링크할 수 있습니다.
    *   예시: `:ref:`type expression <typing:type-expression>``

### 정식 문서 (Canonical Documentation)

*   PEP 1에 설명된 대로, PEP는 Final로 표시되면 역사적인 문서로 간주되며, 그 정식 문서/사양은 다른 곳으로 이동되어야 합니다.
*   이를 나타내기 위해 `canonical-doc` 지시문 또는 적절한 하위 클래스를 사용합니다.
    *   `packaging` 표준용: `canonical-pypa-spec`
    *   `typing` 표준용: `canonical-typing-spec`
*   지시문을 헤더와 PEP의 첫 번째 섹션 (일반적으로 Abstract) 사이에 추가하고, 정식 문서/사양의 Intersphinx 참조를 인수로 전달합니다.
    *   예시: `.. canonical-doc:: :mod:`python:sqlite3```
*   이렇게 하면 다음과 같은 배너가 생성됩니다.
    ```
    Important
    This PEP is a historical document. The up-to-date, canonical documentation can now be found at sqlite3 .
    ```
   

## 피해야 할 습관 (Habits to Avoid)

*   TeX에 익숙한 많은 프로그래머는 따옴표를 `‘single-quoted’` 또는 `‘‘double-quoted’’`와 같이 작성합니다. `reStructuredText`에서는 백틱이 의미가 있으므로 이러한 관행은 피해야 합니다.
*   일반 텍스트의 경우 `'single-quotes'` 또는 `“double-quotes”`와 같은 일반 따옴표를 사용합니다.
*   인라인 리터럴 텍스트 (위의 Inline Markup 참조)의 경우 이중 백틱을 사용합니다.
    *   예시: ``literal text: in here, anything goes!``

## 제안 섹션 (Suggested Sections)

다양한 섹션이 PEP 전반에 걸쳐 공통적으로 발견되며 PEP 1에 설명되어 있습니다. 이러한 섹션은 편의를 위해 여기에 제공됩니다.

```
PEP: <필수: pep 번호>
Title: <필수: pep 제목>
Author: <필수: 저자 이름 목록 및 선택적으로 이메일 주소>
Sponsor: <후원자 이름>
PEP-Delegate: <PEP 대리인 이름>
Discussions-To: Pending
Status: <필수: Draft | Active | Accepted | Provisional | Deferred | Rejected | Withdrawn | Final | Superseded>
Type: <필수: Standards Track | Informational | Process>
Topic: <Governance | Packaging | Release | Typing>
Requires: <pep 번호>
Created: <생성 날짜, dd-mmm-yyyy 형식>
Python-Version: <버전 번호>
Post-History: <필수: 날짜, dd-mmm-yyyy 형식, 및 PEP 토론 스레드에 대한 해당 링크>
Replaces: <pep 번호>
Superseded-By: <pep 번호>
Resolution: <url>

Abstract
========
[해결하고자 하는 기술적 문제에 대한 짧은(~200단어) 설명.]

Motivation
==========
[PEP가 해결하는 문제에 대해 기존 언어 사양이 왜 부적절한지 명확하게 설명.]

Rationale
=========
[특정 설계 결정이 왜 이루어졌는지 설명.]

Specification
=============
[새로운 언어 기능의 구문 및 의미 설명.]

Backwards Compatibility
=======================
[기존 코드에 미치는 잠재적 영향 및 심각도 설명.]

Security Implications
=====================
[악의적인 사용자가 이 새로운 기능을 어떻게 악용할 수 있는지.]

How to Teach This
=================
[사용자(초보 및 숙련자)에게 PEP를 작업에 적용하는 방법을 가르치는 방법.]

Reference Implementation
========================
[기존 구현에 대한 링크 및 해당 상태(예: 개념 증명)에 대한 세부 정보.]

Rejected Ideas
==============
[이 PEP를 논의하는 동안 제기된 특정 아이디어가 궁극적으로 채택되지 않은 이유.]

Open Issues
===========
[아직 결정/논의 중인 모든 사항.]

Acknowledgements
================
[PEP에 도움을 준 모든 사람들에게 감사.]

Footnotes
=========
[PEP에 인용된 각주 모음 및 비인라인 하이퍼링크 대상을 나열하는 곳.]

Copyright
=========
이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 허용적인 조건으로 제공됩니다.
```


## 자료 (Resources)

기본 Docutils와 Sphinx에서 추가된 확장을 포함하여 많은 다른 구성과 변형이 가능합니다. 이에 대해 더 자세히 알아볼 수 있는 몇 가지 자료는 다음과 같습니다.

*   [Sphinx ReStructuredText Primer](https://www.sphinx-doc.org/en/master/usage/restructuredtext/basics.html): 부드럽지만 상당히 자세한 소개.
*   [reStructuredText Markup Specification](https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html): 기본적인 reST 구문, 지시문, 역할 등에 대한 권위 있고 포괄적인 문서.
*   [Sphinx Roles](https://www.sphinx-doc.org/en/master/usage/restructuredtext/roles.html) 및 [Sphinx Directives](https://www.sphinx-doc.org/en/master/usage/restructuredtext/directives.html): PEP를 HTML로 렌더링하는 데 사용되는 Sphinx 문서 시스템에 의해 추가된 확장 구성.

위 자료에서 다루지 않는 PEP 작성에 대한 질문이나 도움이 필요한 경우, GitHub의 `@python/pep-editors`를 태그하거나, PEPs 저장소에 이슈를 생성하거나, PEP 편집자에게 직접 문의하십시오.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 허용적인 조건으로 제공됩니다.

---
**최종 수정일:** 2025-04-10 16:17:29 GMT
**소스:** `https://github.com/python/peps/blob/main/peps/pep-0012.rst`
```
Please let me know if you need any further assistance!
```
I have browsed the content of PEP 12.
Now I need to translate it into Korean, following all the guidelines:
- Professionalism in Python terminology.
- Terminology handling (Korean if common, English original or 병기 if ambiguous/familiar, no translation for keywords/variable names).
- Readability with Markdown.
- Accuracy and completeness.
- Structure: proposal content, background, impact on Python usage.

Let's break down the translation process section by section.PEP 12는 `reStructuredText` 형식으로 Python Enhancement Proposal (PEP)을 작성하기 위한 샘플 템플릿 문서입니다. 이 PEP의 목표는 새로운 PEP를 제출하려는 저자들이 표준화된 형식을 쉽게 따를 수 있도록 돕는 것입니다.

## 개요 (Abstract)

이 PEP는 `reStructuredText` 기반의 PEP를 생성하기 위한 기본적인 틀 또는 샘플 템플릿을 제공합니다. PEP 1의 내용 가이드라인과 함께 이 템플릿을 사용하면, PEP 저자는 자신의 PEP를 아래에 명시된 형식에 맞추어 쉽게 작성할 수 있습니다.

**참고:** 웹에서 이 PEP를 읽고 있다면, 아래 단계를 완료하기 위해 먼저 이 PEP의 텍스트(`reStructuredText`) 소스 파일을 확보해야 합니다. HTML 파일을 템플릿으로 사용하지 마십시오!

이 PEP (및 모든 PEP)의 소스 파일은 PEPs 저장소 및 각 PEP 하단 링크를 통해 찾을 수 있습니다.

## 도입 배경 (Rationale)

PEP를 제출할 의향이 있다면, 형식이 맞지 않아 자동으로 거부되는 것을 방지하기 위해 이 템플릿을 아래의 형식 가이드라인과 함께 사용해야 합니다.

`reStructuredText`는 PEP 저자에게 유용한 기능과 표현력을 제공하면서도, 소스 텍스트의 가독성을 유지합니다. 처리된 HTML 형식은 독자들에게 라이브 하이퍼링크, 스타일이 적용된 텍스트, 테이블, 이미지, 자동 목차 등 다양한 기능을 제공합니다.

## 템플릿 사용 방법 (How to Use This Template)

이 템플릿을 사용하려면 먼저 자신의 PEP가 Informational (정보성) 또는 Standards Track (표준 트랙) PEP 중 어떤 유형이 될지 결정해야 합니다. 대부분의 PEP는 Python 언어 또는 표준 라이브러리에 새로운 기능을 제안하기 때문에 Standards Track 유형에 속합니다. 확실하지 않다면 PEP 1을 참조하거나 PEPs 저장소에 이슈를 제기하여 도움을 요청하십시오.

PEP 유형을 결정한 후에는 다음 지침을 따릅니다.

1.  이 파일 (`.rst` 파일, HTML 아님!)을 복사합니다.
2.  새 파일 이름을 `pep-NNNN.rst`로 지정합니다. 여기서 `NNNN`은 다음으로 사용 가능한 번호 (게시되었거나 PR에 있는 PEP에 사용되지 않은 번호)입니다. 파일 이름은 `pep-0012.rst`처럼 0으로 채워져야 하지만, 헤더(`PEP: 12`)는 0으로 채워지지 않습니다.
3.  "PEP: 12" 헤더를 "PEP: NNNN"으로 변경하고 파일 이름과 일치시킵니다.
4.  Title 헤더를 PEP의 제목으로 변경합니다.
5.  Author 헤더에 이름과 선택적으로 이메일 주소를 포함하도록 변경합니다. 이름이 먼저 오고 괄호 안에 없어야 하며, 이메일 주소는 꺾쇠 괄호(`< >`) 안에 있어야 합니다.
6.  저자 중 Python 코어 개발자가 없는 경우, PEP를 후원하는 코어 개발자의 이름을 Sponsor 헤더에 추가합니다.
7.  Discussions-To 헤더 아래에 PEP의 공식 토론 스레드(예: Python-Dev, Discourse 등)의 직접 URL을 추가합니다. (스레드가 공식 초안 제출 후 생성될 예정이라면 "Pending"으로 두었다가, PEP가 PEPs 저장소에 성공적으로 병합되고 해당 토론 스레드를 생성한 즉시 URL로 업데이트해야 합니다.) 자세한 내용은 PEP 1을 참조하십시오.
8.  Status 헤더를 "Draft"로 변경합니다.
9.  Standards Track PEP의 경우 Type 헤더를 "Standards Track"으로 변경합니다. Informational PEP의 경우 Type 헤더를 "Informational"으로 변경합니다.
10. Standards Track PEP의 경우, 제안하는 기능이 다른 개발 중인 PEP의 승인에 의존한다면 Type 헤더 바로 뒤에 Requires 헤더를 추가합니다. 값은 의존하는 PEP의 번호여야 합니다. (종속 기능이 Final PEP에 설명되어 있다면 이 헤더를 추가하지 마십시오.)
11. Created 헤더를 오늘 날짜로 변경합니다. `dd-mmm-yyyy` 형식 (예: `05-Aug-2002`)을 따릅니다.
12. Standards Track PEP의 경우, Created 헤더 뒤에 Python-Version 헤더를 추가하고 다음 계획된 Python 버전을 값으로 설정합니다. (알파 또는 베타 릴리스 지정을 사용하지 마십시오.)
13. PEP가 Topic Index에 표시된 토픽 중 하나에 속한다면 Topic 헤더를 추가합니다. 대부분의 PEP에는 해당하지 않습니다.
14. Post-History는 지금은 그대로 둡니다. PEP를 지정된 토론 포럼에 게시할 때마다 날짜와 해당 링크를 이 헤더에 추가합니다.
15. PEP가 이전 PEP를 대체하는 경우 Replaces 헤더를 추가합니다. 이 헤더의 값은 새 PEP가 대체하는 PEP의 번호입니다. (이전 PEP가 "final" 형식, 즉 Accepted, Final 또는 Rejected 상태인 경우에만 이 헤더를 추가합니다.)
16. 이제 Abstract, Rationale 및 PEP의 다른 내용을 작성하여 이 템플릿의 내용을 자신의 텍스트로 대체합니다. (특히 탭 문자 금지 및 들여쓰기 요구 사항과 같은 형식 가이드라인을 준수하십시오.) "Suggested Sections"를 참조하여 포함할 섹션 템플릿을 확인하십시오.
17. Footnotes 섹션을 업데이트하고, 텍스트에서 참조된 모든 각주 및 비인라인 링크 대상을 나열합니다.
18. `./build.py`를 실행하여 PEP가 오류 없이 렌더링되는지 확인하고, `build/pep-NNNN.html`의 출력이 의도한 대로 보이는지 확인합니다.
19. PEPs 저장소에 Pull Request를 생성합니다.

### 가능한 헤더 필드 (Possible Header Fields)

다음은 가능한 모든 헤더 필드입니다 (대괄호 안의 내용은 대체하거나, 선행 `*`로 표시된 선택 사항이 해당하지 않으면 필드를 제거해야 합니다).

```
PEP: [NNN]
Title: [...]
Author: [Full Name <email at example.com>]
Sponsor: *[Full Name <email at example.com>]
PEP-Delegate:
Discussions-To: [URL]
Status: Draft
Type: [Standards Track | Informational | Process]
Topic: *[Governance | Packaging | Release | Typing]
Requires: *[NNN]
Created: [DD-MMM-YYYY]
Python-Version: *[M.N]
Post-History: [`DD-MMM-YYYY <URL>`__]
Replaces: *[NNN]
Superseded-By: *[NNN]
Resolution:
```


## reStructuredText PEP 형식 요구 사항 (ReStructuredText PEP Formatting Requirements)

다음은 `reStructuredText` 문법에 대한 PEP별 요약입니다. 단순성과 간결성을 위해 많은 세부 사항은 생략됩니다. 자세한 내용은 아래 Resources 섹션을 참조하십시오. 예시에는 리터럴 블록(마크업 처리가 수행되지 않는 블록)이 사용되어 일반 텍스트 마크업을 보여줍니다.

### 일반 (General)

*   줄은 일반적으로 79열을 넘지 않아야 합니다 (URL 등은 예외).
*   문서에는 탭 문자를 사용해서는 안 됩니다.

### 섹션 제목 (Section Headings)

*   PEP 제목은 0열에서 시작해야 하며, 책 제목처럼 각 단어의 첫 글자는 대문자로 표기해야 합니다. 약어는 모두 대문자여야 합니다.
*   섹션 제목은 밑줄로 장식되어야 하며, 밑줄은 0열에서 시작하여 제목 텍스트의 오른쪽 끝까지 (최소 4자) 확장되어야 합니다.
    *   1단계 섹션 제목은 `=` (등호)로 밑줄을 긋습니다.
    *   2단계 섹션 제목은 `-` (하이픈)으로 밑줄을 긋습니다.
    *   3단계 섹션 제목은 `''` (작은따옴표 또는 아포스트로피)로 밑줄을 긋습니다.
    *   예시:
        ```
        First-Level Title
        =================
        Second-Level Title
        ------------------
        Third-Level Title
        '''''''''''''''''
        ```
       
*   PEP에 3단계 이상의 섹션이 있는 경우, 1단계 및 2단계에 대해 오버라인/밑줄로 장식된 제목을 다음과 같이 삽입할 수 있습니다.
    ```
    ============================
    First-Level Title (optional)
    ============================
    -----------------------------
    Second-Level Title (optional)
    -----------------------------
    Third-Level Title
    =================
    Fourth-Level Title
    ------------------
    Fifth-Level Title
    '''''''''''''''''
    ```
   
*   PEP에 5단계 이상의 섹션을 사용하지 않아야 합니다.
*   섹션 본문의 마지막 줄과 다음 섹션 제목 사이에는 두 개의 빈 줄을 사용해야 합니다. 하위 섹션 제목이 섹션 제목 바로 뒤에 오는 경우, 한 줄의 빈 줄로 충분합니다.
*   각 섹션의 본문은 일반적으로 들여쓰기되지 않습니다.

### 단락 (Paragraphs)

*   단락은 빈 줄로 구분된 왼쪽 정렬 텍스트 블록입니다.
*   블록 인용구나 목록 항목과 같은 들여쓰기된 구성의 일부가 아닌 한, 단락은 들여쓰기되지 않습니다.

### 인라인 마크업 (Inline Markup)

*   단락 및 기타 텍스트 블록 내의 일부 텍스트는 스타일을 지정할 수 있습니다.
    *   `*강조*` (단일 별표, 일반적으로 이탤릭체) 또는 ` **강력 강조** ` (이중 별표, 일반적으로 볼드체)로 텍스트를 표시할 수 있습니다.
    *   ``인라인 리터럴`` (이중 백틱 사용)은 일반적으로 모노스페이스 글꼴로 렌더링됩니다. 이중 백틱 내에서는 추가 마크업 인식이 수행되지 않으므로, 모든 종류의 코드 스니펫에 안전합니다.

### 블록 인용 (Block Quotes)

*   블록 인용은 들여쓰기된 본문 요소로 구성됩니다.
    ```
    This is a paragraph.
        This is a block quote.
        A block quote may contain many paragraphs.
    ```
   
*   블록 인용은 다른 소스에서 가져온 긴 구절을 인용하는 데 사용됩니다.
*   각 들여쓰기 수준에 4칸 공백을 사용합니다.

### 리터럴 블록 (Literal Blocks)

*   리터럴 블록은 코드 샘플 및 기타 미리 서식화된 텍스트에 사용됩니다.
*   리터럴 블록을 나타내려면 들여쓰기된 텍스트 블록 앞에 `::` (두 개의 콜론)을 붙이거나 `.. code-block::` 지시문을 사용합니다.
*   텍스트 블록을 4칸 들여쓰기합니다. 리터럴 블록은 들여쓰기가 끝날 때까지 계속됩니다.
    ```python
    This is a typical paragraph. A literal block follows.
    ::

        for a in:    # this is program code, shown as-is
            print(a)
        print("it's...")
    ```
   
*   `::`는 모든 단락 끝에서도 인식됩니다. 바로 앞에 공백이 없으면 최종 출력에는 하나의 콜론이 남습니다.
*   기본적으로 리터럴 블록은 Python 코드로 구문 강조 표시됩니다. 다른 언어/형식의 코드 또는 데이터를 포함하는 특정 블록의 경우, `.. code-block:: language` 지시문을 사용하고 `language` 대신 적절한 Pygments 렉서의 "짧은 이름"을 사용합니다 (또는 강조 표시를 비활성화하려면 `text`).
*   주로 특정 언어의 리터럴 블록을 포함하는 PEP의 경우, PEP 본문 상단 (헤더 아래, Abstract 위에)에 `.. highlight:: language` 지시문을 사용합니다. 이렇게 하면 `.. code-block`에서 달리 지정되지 않는 한 모든 리터럴 블록이 해당 언어로 처리됩니다.

### 목록 (Lists)

*   불릿 목록 항목은 `-`, `*`, 또는 `+` (하이픈, 별표 또는 더하기 기호) 중 하나로 시작하며, 그 뒤에 공백과 목록 항목 본문이 옵니다.
*   목록 항목 본문은 불릿에 상대적으로 왼쪽 정렬 및 들여쓰기되어야 합니다.
    ```
    This paragraph is followed by a list.
    *   This is the first bullet list item.

    *   This is the first paragraph in the second item in the list.
        This is the second paragraph in the second item in the list.

        - This is a sublist.
    *   This is the third item of the main list.
    This paragraph is not part of the list.
    ```
   
*   열거형(번호 매기기) 목록 항목은 불릿 대신 열거자를 사용한다는 점을 제외하고 유사합니다.
    *   열거자는 숫자(1, 2, 3, …), 문자(A, B, C, …; 대문자 또는 소문자), 또는 로마 숫자(i, ii, iii, iv, …; 대문자 또는 소문자)이며, 마침표 접미사("1.", "2."), 괄호("(1)", "(2)"), 또는 오른쪽 괄호 접미사("1)", "2)")로 형식이 지정됩니다.
    ```
    1.  As with bullet list items, the left edge of paragraphs must align.
    2.  Each list item may contain multiple paragraphs, sublists, etc.
        This is the second paragraph of the second list item.
        a) Enumerated lists may be nested.
        b) Blank lines may be omitted between list items.
    ```
   
*   정의 목록은 다음과 같이 작성됩니다.
    ```
    what
        Definition lists associate a term with a definition.
    how
        The term is a one-line phrase, and the definition is one or more
        paragraphs or body elements, indented relative to the term.
    ```
   

### 표 (Tables)

*   단순한 표는 쉽고 간결합니다.
    ```
    ===== ===== =======
    A      B    A and B
    ===== ===== =======
    False False False
    True False False
    False True False
    True True False
    True True True
    ===== ===== =======
    ```
   
*   표에는 최소 두 개의 열이 있어야 합니다 (섹션 제목과 구별하기 위해). 열 병합은 하이픈으로 밑줄을 사용합니다.
*   첫 번째 열 셀의 텍스트는 새 행을 시작합니다. 첫 번째 열에 텍스트가 없으면 계속되는 줄을 나타냅니다.

### 하이퍼링크 (Hyperlinks)

*   PEP 본문에서 외부 웹 페이지를 참조할 때, 페이지 제목이나 적절한 설명을 텍스트에 포함하고, 인라인 하이퍼링크 또는 URL이 있는 별도의 명시적 대상(explicit target)을 사용해야 합니다.
*   PEP 본문 텍스트에 순수 URL을 포함하지 말고, 가능한 경우 HTTPS 링크를 사용해야 합니다.
*   하이퍼링크 참조는 백틱과 뒤따르는 밑줄을 사용하여 참조 텍스트를 마크업합니다. 참조 텍스트가 단일 단어인 경우 백틱은 선택 사항입니다.
    *   예시: `Python website`_
*   링크를 한 번만 참조하고 텍스트와 함께 인라인으로 정의하려면, 연결하려는 텍스트 뒤에, 닫는 백틱 앞에, 그리고 텍스트와 여는 백틱 사이에 공백을 두고 꺾쇠 괄호(`< >`) 안에 링크를 삽입합니다.
    *   예시: `website <https://www.python.org/>`__ (이중 밑줄은 익명 참조를 만듭니다).
*   하나의 링크를 여러 곳에서 다른 연결 텍스트와 함께 사용하거나, 연결 텍스트 변경 시 링크 대상 이름을 업데이트할 필요가 없도록 하려면, 연결할 텍스트 뒤에 꺾쇠 괄호 안에 대상 이름을 포함하고, 대상 이름 뒤에 닫는 꺾쇠 괄호 앞에 밑줄을 붙입니다.
    *   예시: `documentation <pydocs_>`_
*   명시적 대상은 URL을 제공합니다. 대상을 PEP 끝의 Footnotes 섹션이나 참조가 있는 단락 바로 뒤에 배치합니다. 하이퍼링크 대상은 두 개의 마침표와 공백으로 시작하고, 그 뒤에 선행 밑줄, 참조 텍스트, 콜론, 그리고 URL이 옵니다.
    ```
    .. _Python web site: https://www.python.org/
    .. _pydocs: https://docs.python.org/
    ```
   

### 내부 및 PEP/RFC 링크 (Internal and PEP/RFC Links)

*   하이퍼링크와 동일한 메커니즘을 내부 참조에도 사용할 수 있습니다. 모든 고유한 섹션 제목은 암시적으로 내부 하이퍼링크 대상을 정의합니다.
    *   예시: `Abstract`_ 섹션 참조.
*   PEPs 또는 RFCs를 참조하려면 항상 `:pep:` 및 `:rfc:` 역할을 사용하고, 하드코딩된 URL을 사용하지 마십시오.
    *   예시: `See :pep:`1` for more information on how to write a PEP, and :pep:`the Hyperlink section of PEP 12 <12#hyperlinks>` for how to link.`

### 각주 (Footnotes)

*   각주 참조는 왼쪽 대괄호, 레이블, 오른쪽 대괄호, 그리고 뒤따르는 밑줄로 구성됩니다. 숫자 대신 `#word` 형식의 레이블을 사용합니다.
    *   예시: `The TeXbook [#TeXbook]_`
*   각주 참조 앞에는 공백이 있어야 합니다.
*   각주는 추가적인 노트, 설명, 경고, 그리고 온라인에서 쉽게 이용할 수 없는 책이나 다른 출처를 참조하는 데 사용됩니다.
*   각주는 `..`로 시작하고, 그 뒤에 각주 마커 (밑줄 없음), 그리고 각주 본문이 옵니다.
    ```
    .. [#TeXbook] Donald Knuth's *The TeXbook*, pages 195 and 196.
    ```
   
*   각주와 각주 참조는 자동으로 번호가 매겨집니다.

### 이미지 (Images)

*   PEP에 다이어그램이나 다른 그래픽이 포함된 경우, `image` 지시문을 사용하여 처리된 출력에 포함할 수 있습니다.
    ```
    .. image:: diagram.png
    ```
   
*   모든 브라우저 친화적인 그래픽 형식이 가능하지만, 그래픽에는 PNG, 사진에는 JPEG, 애니메이션에는 GIF를 선호해야 합니다. 현재 PEP 빌드 시스템과의 호환성 문제로 SVG는 피해야 합니다.
*   접근성과 소스 텍스트 독자를 위해, `image` 지시문의 `:alt:` 옵션을 사용하여 이미지에 대한 설명과 포함된 주요 정보를 포함해야 합니다.

### 주석 (Comments)

*   주석은 명시적 마크업 시작 (`.. `) 바로 뒤에 오는 들여쓰기된 임의의 텍스트 블록입니다.
*   `..`를 자체 줄에 두어 주석이 다른 명시적 마크업 구성으로 오해되지 않도록 합니다.
*   주석은 처리된 문서에서 보이지 않습니다.
    ```
    .. This section should be updated in the final PEP. Ensure the date is accurate.
    ```
   

### 이스케이프 메커니즘 (Escaping Mechanism)

*   `reStructuredText`는 백슬래시(`\`)를 사용하여 마크업 문자에 부여된 특수 의미를 무시하고 리터럴 문자를 얻습니다. 리터럴 백슬래시를 얻으려면 이스케이프된 백슬래시(`\\`)를 사용합니다.
*   백슬래시에 특별한 의미가 없는 두 가지 컨텍스트가 있습니다: 리터럴 블록과 인라인 리터럴. 이러한 컨텍스트에서는 마크업 인식이 수행되지 않으며, 단일 백슬래시는 이중화할 필요 없이 리터럴 백슬래시를 나타냅니다.

### Intersphinx

*   Intersphinx 참조를 사용하여 Python 문서 `packaging.python.org`, `typing.python.org`와 같은 다른 Sphinx 사이트로 쉽게 상호 참조하여 페이지, 섹션 및 Python/C 객체를 링크할 수 있습니다.
    *   예시: `:ref:`type expression <typing:type-expression>``

### 정식 문서 (Canonical Documentation)

*   PEP 1에 설명된 대로, PEP는 Final로 표시되면 역사적인 문서로 간주되며, 그 정식 문서/사양은 다른 곳으로 이동되어야 합니다.
*   이를 나타내기 위해 `canonical-doc` 지시문 또는 적절한 하위 클래스를 사용합니다.
    *   `packaging` 표준용: `canonical-pypa-spec`
    *   `typing` 표준용: `canonical-typing-spec`
*   지시문을 헤더와 PEP의 첫 번째 섹션 (일반적으로 Abstract) 사이에 추가하고, 정식 문서/사양의 Intersphinx 참조를 인수로 전달합니다.
    *   예시: `.. canonical-doc:: :mod:`python:sqlite3```
*   이렇게 하면 다음과 같은 배너가 생성됩니다.
    ```
    Important
    This PEP is a historical document. The up-to-date, canonical documentation can now be found at sqlite3 .
    ```
   

## 피해야 할 습관 (Habits to Avoid)

*   TeX에 익숙한 많은 프로그래머는 따옴표를 `‘single-quoted’` 또는 `‘‘double-quoted’’`와 같이 작성합니다. `reStructuredText`에서는 백틱이 의미가 있으므로 이러한 관행은 피해야 합니다.
*   일반 텍스트의 경우 `'single-quotes'` 또는 `“double-quotes”`와 같은 일반 따옴표를 사용합니다.
*   인라인 리터럴 텍스트 (위의 Inline Markup 참조)의 경우 이중 백틱을 사용합니다.
    *   예시: ``literal text: in here, anything goes!``

## 제안 섹션 (Suggested Sections)

다양한 섹션이 PEP 전반에 걸쳐 공통적으로 발견되며 PEP 1에 설명되어 있습니다. 이러한 섹션은 편의를 위해 여기에 제공됩니다.

```
PEP: <필수: pep 번호>
Title: <필수: pep 제목>
Author: <필수: 저자 이름 목록 및 선택적으로 이메일 주소>
Sponsor: <후원자 이름>
PEP-Delegate: <PEP 대리인 이름>
Discussions-To: Pending
Status: <필수: Draft | Active | Accepted | Provisional | Deferred | Rejected | Withdrawn | Final | Superseded>
Type: <필수: Standards Track | Informational | Process>
Topic: <Governance | Packaging | Release | Typing>
Requires: <pep 번호>
Created: <생성 날짜, dd-mmm-yyyy 형식>
Python-Version: <버전 번호>
Post-History: <필수: 날짜, dd-mmm-yyyy 형식, 및 PEP 토론 스레드에 대한 해당 링크>
Replaces: <pep 번호>
Superseded-By: <pep 번호>
Resolution: <url>

Abstract
========
[해결하고자 하는 기술적 문제에 대한 짧은(~200단어) 설명.]

Motivation
==========
[PEP가 해결하는 문제에 대해 기존 언어 사양이 왜 부적절한지 명확하게 설명.]

Rationale
=========
[특정 설계 결정이 왜 이루어졌는지 설명.]

Specification
=============
[새로운 언어 기능의 구문 및 의미 설명.]

Backwards Compatibility
=======================
[기존 코드에 미치는 잠재적 영향 및 심각도 설명.]

Security Implications
=====================
[악의적인 사용자가 이 새로운 기능을 어떻게 악용할 수 있는지.]

How to Teach This
=================
[사용자(초보 및 숙련자)에게 PEP를 작업에 적용하는 방법을 가르치는 방법.]

Reference Implementation
========================
[기존 구현에 대한 링크 및 해당 상태(예: 개념 증명)에 대한 세부 정보.]

Rejected Ideas
==============
[이 PEP를 논의하는 동안 제기된 특정 아이디어가 궁극적으로 채택되지 않은 이유.]

Open Issues
===========
[아직 결정/논의 중인 모든 사항.]

Acknowledgements
================
[PEP에 도움을 준 모든 사람들에게 감사.]

Footnotes
=========
[PEP에 인용된 각주 모음 및 비인라인 하이퍼링크 대상을 나열하는 곳.]

Copyright
=========
이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 허용적인 조건으로 제공됩니다.
```


## 자료 (Resources)

기본 Docutils와 Sphinx에서 추가된 확장을 포함하여 많은 다른 구성과 변형이 가능합니다. 이에 대해 더 자세히 알아볼 수 있는 몇 가지 자료는 다음과 같습니다.

*   [Sphinx ReStructuredText Primer](https://www.sphinx-doc.org/en/master/usage/restructuredtext/basics.html): 부드럽지만 상당히 자세한 소개.
*   [reStructuredText Markup Specification](https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html): 기본적인 reST 구문, 지시문, 역할 등에 대한 권위 있고 포괄적인 문서.
*   [Sphinx Roles](https://www.sphinx-doc.org/en/master/usage/restructuredtext/roles.html) 및 [Sphinx Directives](https://www.sphinx-doc.org/en/master/usage/restructuredtext/directives.html): PEP를 HTML로 렌더링하는 데 사용되는 Sphinx 문서 시스템에 의해 추가된 확장 구성.

위 자료에서 다루지 않는 PEP 작성에 대한 질문이나 도움이 필요한 경우, GitHub의 `@python/pep-editors`를 태그하거나, PEPs 저장소에 이슈를 생성하거나, PEP 편집자에게 직접 문의하십시오.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 허용적인 조건으로 제공됩니다.

---
**최종 수정일:** 2025-04-10 16:17:29 GMT
**소스:** `https://github.com/python/peps/blob/main/peps/pep-0012.rst`

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.