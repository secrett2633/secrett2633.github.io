---
title: "[Rejected] PEP 258 - Docutils Design Specification"
excerpt: "Python Enhancement Proposal 258: 'Docutils Design Specification'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/258/
toc: true
toc_sticky: true
date: 2025-09-26 17:39:51+0900
last_modified_at: 2025-09-26 17:39:51+0900
published: true
---
> **원문 링크:** [PEP 258 - Docutils Design Specification](https://peps.python.org/pep-0258/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 31-May-2001

PEP 258 – Docutils 디자인 사양

## PEP 258 – Docutils 디자인 사양 번역 및 정리

*   **작성자 (Author)**: David Goodger <goodger at python.org>
*   **논의 대상 (Discussions-To)**: Doc-SIG list
*   **상태 (Status)**: Rejected (거부됨)
*   **유형 (Type)**: Standards Track
*   **요구 사항 (Requires)**: 256, 257
*   **생성일 (Created)**: 2001년 5월 31일
*   **게시 이력 (Post-History)**: 2001년 6월 13일

### 거부 공지 (Rejection Notice)

이 문서는 현재 독립 프로젝트인 Docutils의 흥미로운 디자인 문서 역할을 할 수 있지만, 더 이상 Python 표준 라이브러리에 포함될 예정이 아닙니다.

### 개요 (Abstract)

이 PEP는 Python 독스트링 처리 시스템(DPS)인 Docutils의 디자인 문제와 구현 세부 사항을 문서화합니다. DPS의 이론적 근거와 상위 수준 개념은 PEP 256, "Docstring Processing System Framework"에 문서화되어 있습니다. "독스트링 PEP 로드맵"에 대해서도 PEP 256을 참조하십시오.

Docutils는 모든 구성 요소를 쉽게 교체할 수 있도록 모듈식으로 설계되고 있습니다. 또한, Docutils는 Python 독스트링 처리에만 국한되지 않으며, 여러 맥락에서 독립형 문서도 처리합니다.

이 PEP는 Python 코어 언어에 대한 변경 사항을 요구하지 않습니다. 그 결과물은 표준 라이브러리를 위한 패키지와 그 문서로 구성됩니다.

### 사양 (Specification)

#### Docutils 프로젝트 모델 (Docutils Project Model)

프로젝트 구성 요소 및 데이터 흐름은 다음과 같습니다.

```
+---------------------------+
| Docutils:                 |
| docutils.core.Publisher,  |
| docutils.core.publish_*() |
+---------------------------+
      /        |        \
     /    1,3,5 / 6      \ 7
+--------+ +-------------+ +--------+
| READER | ----> | TRANSFORMER | ====> | WRITER |
+--------+ +-------------+ +--------+
     / \\       |      / \\       |
    2 /   4 \\ 8 |     /   9 \\ 10 |
+-------+ +--------+ +--------+
| INPUT | | PARSER | | OUTPUT |
+-------+ +--------+ +--------+
```

각 구성 요소 위의 숫자는 문서 데이터가 거치는 경로를 나타냅니다. Reader와 Parser 사이, 그리고 Transformer와 Writer 사이의 이중 선은 이 경로를 통해 전송되는 데이터가 표준(순수하고 확장되지 않은) Docutils 문서 트리여야 함을 나타냅니다. 단일 선은 내부 트리 확장 또는 완전히 관련 없는 표현이 가능하지만, 양쪽 끝에서 지원되어야 함을 의미합니다.

*   **Publisher (퍼블리셔)**
    `docutils.core` 모듈에는 "Publisher" 파사드(facade) 클래스와 여러 편의 함수가 포함되어 있습니다.
    *   `publish_cmdline()`: 명령줄 프런트엔드용
    *   `publish_file()`: 파일과 유사한 I/O를 사용하는 프로그래밍 방식용
    *   `publish_string()`: 문자열 I/O를 사용하는 프로그래밍 방식용

    Publisher 클래스는 Docutils 시스템의 상위 수준 로직을 캡슐화합니다. Publisher 클래스는 `Publisher.publish()` 메서드에 의해 제어되는 전체 처리 책임을 가집니다.
    1.  내부 설정(구성 파일 및 명령줄 옵션 포함 가능) 및 I/O 객체 설정.
    2.  Reader 객체를 호출하여 소스 Input 객체에서 데이터를 읽고 Parser 객체로 데이터를 파싱합니다. 문서 객체가 반환됩니다.
    3.  문서에 연결된 Transformer 객체를 통해 트랜스폼(transforms)을 설정하고 적용합니다.
    4.  Writer 객체를 호출하여 문서를 최종 출력 형식으로 변환하고, 서식화된 데이터를 대상 Output 객체에 씁니다. Output 객체에 따라 출력은 Writer에서, 그리고 `publish()` 메서드에서 반환될 수 있습니다.

    구성 요소 이름으로 "publish" 함수를 호출하거나 "Publisher" 객체를 인스턴스화하면 기본 동작이 수행됩니다. 사용자 정의 동작(구성 요소 설정 사용자 정의)을 위해서는 먼저 사용자 정의 구성 요소 객체를 생성하고, 이를 Publisher 또는 `publish_*` 편의 함수에 전달해야 합니다.

*   **Readers (리더)**
    Reader는 입력 컨텍스트(데이터의 출처)를 이해하고, 전체 입력 또는 개별 "덩어리(chunks)"를 파서(parser)로 보내며, 덩어리들을 결합하여 일관된 전체를 구성하는 컨텍스트를 제공합니다.

    각 Reader는 `read` 메서드를 가진 "Reader" 클래스를 내보내는 모듈 또는 패키지입니다. 기본 "Reader" 클래스는 `docutils/readers/__init__.py` 모듈에서 찾을 수 있습니다.

    대부분의 Reader는 어떤 파서를 사용할지 지정받아야 합니다. 지금까지(아래 예제 목록 참조) Python Source Reader("PySource"; 아직 미완성)만이 스스로 파서를 결정할 수 있습니다.

    책임:
    *   소스 I/O에서 입력 텍스트를 가져옵니다.
    *   새로운 문서 트리 루트와 함께 입력 텍스트를 파서로 전달합니다.

    예시:
    *   **Standalone (Raw/Plain)**: 단순히 텍스트 파일을 읽고 처리합니다. Reader는 사용할 파서를 지정받아야 합니다. "Standalone Reader"는 `docutils.readers.standalone` 모듈에 구현되어 있습니다.
    *   **Python Source**: 아래 Python Source Reader를 참조하십시오. 이 Reader는 현재 Docutils 샌드박스에서 개발 중입니다.
    *   **Email**: RFC 822 헤더, 인용된 발췌문, 서명, MIME 파트.
    *   **PEP**: RFC 822 헤더, "PEP xxxx" 및 "RFC xxxx"를 URI로 변환. "PEP Reader"는 `docutils.readers.pep` 모듈에 구현되어 있습니다. PEP 287 및 PEP 12를 참조하십시오.
    *   **Wiki**: 트랜스폼에 통합된 "위키 링크"의 전역 참조 조회.
    *   **Web Page**: Standalone과 동일하지만, 메타 필드를 메타 태그로 인식합니다.
    *   **FAQ**: 구조화된 "질문 & 답변" 구성.
    *   **Compound document**: 챕터들을 책으로 병합합니다.

*   **Parsers (파서)**
    파서는 입력을 분석하고 Docutils 문서 트리를 생성합니다. 데이터의 출처나 목적지에 대해서는 알거나 신경 쓰지 않습니다.

    각 입력 파서는 `parse` 메서드를 가진 "Parser" 클래스를 내보내는 모듈 또는 패키지입니다. 기본 "Parser" 클래스는 `docutils/parsers/__init__.py` 모듈에서 찾을 수 있습니다.

    책임:
    *   원시 입력 텍스트와 doctree 루트 노드가 주어지면, 입력 텍스트를 파싱하여 doctree를 채웁니다.

    예시:
    *   현재까지 구현된 유일한 파서는 reStructuredText 마크업용입니다. 이는 `docutils/parsers/rst/` 패키지에 구현되어 있습니다.
    *   다른 파서의 개발 및 통합도 가능하며 권장됩니다.

*   **Transformer (트랜스포머)**
    `docutils/transforms/__init__.py`의 Transformer 클래스는 트랜스폼을 저장하고 문서에 적용합니다. 트랜스포머 객체는 모든 새 문서 트리에 연결됩니다. Publisher는 `Transformer.apply_transforms()`를 호출하여 저장된 모든 트랜스폼을 문서 트리에 적용합니다. 트랜스폼은 문서 트리를 한 형식에서 다른 형식으로 변경하거나, 트리에 추가하거나, 가지치기합니다. 트랜스폼은 참조와 각주 번호를 해결하고, 해석된 텍스트를 처리하며, 다른 컨텍스트에 민감한 처리를 수행합니다.

    일부 트랜스폼은 구성 요소(Readers, Parser, Writers, Input, Output)에 특화되어 있습니다. 표준 구성 요소별 트랜스폼은 구성 요소 클래스의 `default_transforms` 어트리뷰트에 지정됩니다. Reader가 처리를 완료한 후, Publisher는 구성 요소 목록과 모든 기본 트랜스폼을 사용하여 `Transformer.populate_from_components()`를 호출하고 모든 기본 트랜스폼이 저장됩니다.

    각 트랜스폼은 `docutils/transforms/` 패키지에 있는 모듈의 클래스이며, `docutils.transforms.Transform`의 서브클래스입니다. 각 Transform 클래스는 Transformer가 트랜스폼을 순서대로(낮은 우선순위에서 높은 우선순위로) 적용하는 데 사용하는 `default_priority` 어트리뷰트를 가집니다. 트랜스포머 객체에 트랜스폼을 추가할 때 기본 우선순위를 재정의할 수 있습니다.

    Transformer의 책임:
    *   문서 트리에 트랜스폼을 우선순위 순서대로 적용합니다.
    *   구성 요소 유형 이름('reader', 'writer' 등)을 구성 요소 객체에 매핑한 것을 저장합니다. 이는 특정 트랜스폼(예: "components.Filter")에서 적합성을 결정하는 데 사용됩니다.

    Transform의 책임:
    *   도큐트리(doctree)를 제자리에서 수정합니다. 이는 순수하게 한 구조를 다른 구조로 변환하거나, 도큐트리 및/또는 외부 데이터를 기반으로 새로운 구조를 추가하는 것을 포함합니다.

    트랜스폼의 예시 (`docutils/transforms/` 패키지 내):
    *   `frontmatter.DocInfo`: 문서 메타데이터(서지 정보) 변환.
    *   `references.AnonymousHyperlinks`: 해당 타겟에 대한 익명 참조 해결.
    *   `parts.Contents`: 문서의 목차 생성.
    *   `document.Merger`: 여러 채워진 doctree를 하나로 병합. (아직 구현되지 않았거나 완전히 이해되지 않음)
    *   `document.Splitter`: 문서를 하위 문서의 트리 구조로 분할(예: 섹션별). 참조를 적절하게 변환해야 합니다. (구현되지 않았거나 원격으로도 이해되지 않음)
    *   `components.Filter`: 특정 Docutils 구성 요소에 의존하는 요소를 포함하거나 제외합니다.

*   **Writers (라이터)**
    Writer는 최종 출력(HTML, XML, TeX 등)을 생성합니다. Writer는 내부 문서 트리 구조를 최종 데이터 형식으로 변환하며, 이전에 Writer별 트랜스폼을 실행할 수도 있습니다.

    문서가 Writer에 도달할 때쯤에는 최종 형태여야 합니다. Writer의 역할은 단순히(그리고 오직) Docutils doctree 구조를 대상 형식으로 변환하는 것입니다. 일부 작은 트랜스폼이 필요할 수 있지만, 이는 로컬하고 형식에 특화되어야 합니다.

    각 Writer는 `write` 메서드를 가진 "Writer" 클래스를 내보내는 모듈 또는 패키지입니다. 기본 "Writer" 클래스는 `docutils/writers/__init__.py` 모듈에서 찾을 수 있습니다.

    책임:
    *   도큐트리(doctree)를 특정 출력 형식으로 변환합니다.
    *   참조를 형식 고유의 형태로 변환합니다.
    *   변환된 출력을 대상 I/O에 씁니다.

    예시:
    *   **XML**: 다양한 형태, 예를 들어:
        *   Docutils XML (내부 문서 트리의 표현, `docutils.writers.docutils_xml`로 구현됨).
        *   DocBook (Docutils 샌드박스에서 구현 중).
    *   **HTML** (XHTML은 `docutils.writers.html4css1`로 구현됨).
    *   **PDF** (ReportLabs 인터페이스가 Docutils 샌드박스에서 개발 중).
    *   **TeX** (LaTeX Writer가 샌드박스에서 구현 중).
    *   Docutils 고유의 pseudo-XML (`docutils.writers.pseudoxml`로 구현됨, 테스트용으로 사용).
    *   Plain text reStructuredText?

*   **Input/Output (입력/출력)**
    I/O 클래스는 저수준 입력 및 출력을 위한 균일한 API를 제공합니다. 다양한 입출력 메커니즘을 위한 서브클래스가 존재할 것입니다. 그러나 이는 구현 세부 사항으로 간주될 수 있습니다. 대부분의 애플리케이션은 Publisher와 관련된 편의 함수 중 하나를 사용하는 것으로 충분할 것입니다.

    I/O 클래스는 현재 초기 단계에 있습니다. 아직 많은 작업이 남아 있습니다.
    문제:
    *   API에서 다중 파일 입력(파일 및 디렉토리)을 어떻게 표현할 것인가?
    *   다중 파일 출력을 어떻게 표현할 것인가? 각 출력 배포 유형에 대해 "Writer" 변형을 사용할 것인가? 아니면 관련 트랜스폼이 있는 Output 객체를 사용할 것인가?

    책임:
    *   입력 소스에서 데이터를 읽거나(Input 객체) 출력 대상에 데이터를 씁니다(Output 객체).

    입력 소스의 예시:
    *   디스크의 단일 파일 또는 스트림 (`docutils.io.FileInput`으로 구현됨).
    *   디스크의 여러 파일 (`MultiFileInput`?).
    *   Python 소스 파일: 모듈 및 패키지.
    *   클라이언트 애플리케이션에서 받은 Python 문자열 (`docutils.io.StringInput`으로 구현됨).

    출력 대상의 예시:
    *   디스크의 단일 파일 또는 스트림 (`docutils.io.FileOutput`으로 구현됨).
    *   디스크의 디렉토리 및 파일 트리.
    *   클라이언트 애플리케이션으로 반환되는 Python 문자열 (`docutils.io.StringOutput`으로 구현됨).
    *   출력 없음; 일반 출력의 일부만 사용하려는 프로그래밍 애플리케이션에 유용 (`docutils.io.NullOutput`으로 구현됨).
    *   메모리의 단일 트리 모양 데이터 구조.
    *   메모리의 다른 데이터 구조 집합.

#### Docutils 패키지 구조 (Docutils Package Structure)

`docutils` 패키지.

*   `__init__.py` 모듈에는 다음이 포함됩니다.
    *   클래스 `Component`: Docutils 구성 요소의 기본 클래스.
    *   클래스 `SettingsSpec`: 런타임 설정을 지정하기 위한 기본 클래스(`docutils.frontend`에서 사용).
    *   클래스 `TransformSpec`: 트랜스폼을 지정하기 위한 기본 클래스.
*   `docutils.core` 모듈에는 파사드(facade) 클래스 `Publisher`와 편의 함수가 포함됩니다. 위 Publisher 섹션을 참조하십시오.
*   `docutils.frontend` 모듈은 프로그래밍 방식 사용 및 프런트엔드 도구(구성 파일 지원, 명령줄 인수 및 옵션 처리 포함)를 위한 런타임 설정 지원을 제공합니다.
*   `docutils.io` 모듈은 저수준 입출력을 위한 균일한 API를 제공합니다. 위 Input/Output 섹션을 참조하십시오.
*   `docutils.nodes` 모듈에는 Docutils 문서 트리 요소 클래스 라이브러리와 트리 순회 Visitor 패턴 기본 클래스가 포함됩니다. 아래 Document Tree 섹션을 참조하십시오.
*   `docutils.statemachine` 모듈에는 정규 표현식 기반 텍스트 필터 및 파서에 특화된 유한 상태 머신이 포함됩니다. reStructuredText 파서 구현은 이 모듈을 기반으로 합니다.
*   `docutils.urischemes` 모듈에는 알려진 URI 스키마("http", "ftp", "mail" 등)의 매핑이 포함됩니다.
*   `docutils.utils` 모듈에는 로거 클래스("Reporter"; 아래 Error Handling 섹션 참조)를 포함한 유틸리티 함수와 클래스가 포함됩니다.

`docutils.parsers` 패키지: 마크업 파서.

*   함수 `get_parser_class(parser_name)`는 이름으로 파서 모듈을 반환합니다.
*   클래스 `Parser`는 특정 파서의 기본 클래스입니다 (`docutils/parsers/__init__.py`).
*   `docutils.parsers.rst` 패키지: reStructuredText 파서.
*   대체 마크업 파서가 추가될 수 있습니다.
*   위 Parsers 섹션을 참조하십시오.

`docutils.readers` 패키지: 컨텍스트 인식 입력 리더.

*   함수 `get_reader_class(reader_name)`는 이름 또는 별칭으로 리더 모듈을 반환합니다.
*   클래스 `Reader`는 특정 리더의 기본 클래스입니다 (`docutils/readers/__init__.py`).
*   `docutils.readers.standalone` 모듈은 독립 문서 파일을 읽습니다.
*   `docutils.readers.pep` 모듈은 PEP(Python Enhancement Proposals)를 읽습니다.
*   Python 소스 코드(구조 및 독스트링), 이메일, FAQ, 그리고 위키 및 기타를 위한 Reader가 추가될 예정입니다.
*   위 Readers 섹션을 참조하십시오.

`docutils.writers` 패키지: 출력 형식 라이터.

*   함수 `get_writer_class(writer_name)`는 이름으로 라이터 모듈을 반환합니다.
*   클래스 `Writer`는 특정 라이터의 기본 클래스입니다 (`docutils/writers/__init__.py`).
*   `docutils.writers.html4css1` 모듈은 HTML 4.01 및 CSS1을 위한 간단한 HyperText Markup Language 문서 트리 라이터입니다.
*   `docutils.writers.docutils_xml` 모듈은 내부 문서 트리를 XML 형식으로 작성합니다.
*   `docutils.writers.pseudoxml` 모듈은 간단한 내부 문서 트리 라이터입니다. 들여쓰기된 pseudo-XML을 작성합니다.
*   추가될 Writer: HTML 3.2 또는 4.01-loose, XML(DocBook과 같은 다양한 형태), PDF, TeX, 일반 텍스트, reStructuredText, 그리고 아마도 기타.
*   위 Writers 섹션을 참조하십시오.

`docutils.transforms` 패키지: 트리 트랜스폼 클래스.

*   클래스 `Transformer`는 트랜스폼을 저장하고 문서 트리에 적용합니다 (`docutils/transforms/__init__.py`).
*   클래스 `Transform`은 특정 트랜스폼의 기본 클래스입니다 (`docutils/transforms/__init__.py`).
*   각 모듈은 관련 트랜스폼 클래스를 포함합니다.
*   위 Transformer 섹션을 참조하십시오.

`docutils.languages` 패키지: 언어 모듈은 언어 종속 문자열 및 매핑을 포함합니다. 이들은 언어 식별자(아래 Choice of Docstring Format 섹션에서 정의됨)에 따라 이름이 지정되며, 대시는 밑줄로 변환됩니다.

*   함수 `get_language(language_code)`는 일치하는 언어 모듈을 반환합니다 (`docutils/languages/__init__.py`).
*   모듈: `en.py` (영어), `de.py` (독일어), `fr.py` (프랑스어), `it.py` (이탈리아어), `sk.py` (슬로바키아어), `sv.py` (스웨덴어). 다른 언어도 추가될 예정입니다.

타사 모듈: "extras" 디렉토리. 이 모듈은 Python 설치에 아직 존재하지 않는 경우에만 설치됩니다.

*   `extras/optparse.py` 및 `extras/textwrap.py`는 옵션 파싱 및 명령줄 도움말을 제공합니다. Greg Ward의 http://optik.sf.net/ 프로젝트에서 편의를 위해 포함되었습니다.
*   `extras/roman.py`는 로마 숫자 변환 루틴을 포함합니다.

#### 프런트엔드 도구 (Front-End Tools)

`tools/` 디렉토리에는 일반적인 Docutils 처리를 위한 여러 프런트엔드가 포함되어 있습니다. 자세한 내용은 Docutils Front-End Tools를 참조하십시오.

#### 문서 트리 (Document Tree)

Docutils는 구성 요소 간의 인터페이스에서 단일 중간 데이터 구조를 내부적으로 사용합니다. 이는 `docutils.nodes` 모듈에 정의되어 있습니다. 위 Docutils Project Model 다이어그램에 설명된 대로 구성 요소 간에만 사용되어야 하며, 어떤 구성 요소가 이 데이터 구조를 내부적으로 사용해야 하는 것은 아닙니다.

사용자 정의 노드 유형은 허용됩니다. 단, (a) 트랜스폼이 적절한 Writer에 도달하기 전에 이를 표준 Docutils 노드로 변환하거나, (b) 사용자 정의 노드가 특정 Writer에 의해 명시적으로 지원되고, 필터링된 "pending" 노드로 래핑되는 경우입니다. (a) 조건의 예시는 Python Source Reader(아래 참조)이며, "stylist" 트랜스폼이 사용자 정의 노드를 변환합니다. HTML `<meta>` 태그는 (b) 조건의 예시입니다. HTML Writer에 의해 지원되지만 다른 Writer에 의해 지원되지는 않습니다. reStructuredText "meta" 지시어는 포함된 "meta" 노드가 HTML 호환 Writer에 의해서만 처리될 수 있다는 지식을 포함하는 "pending" 노드를 생성합니다. "pending" 노드는 `docutils.transforms.components.Filter` 트랜스폼에 의해 해결되며, 호출하는 Writer가 HTML을 지원하는지 확인합니다. 지원하지 않으면 "pending" 노드(및 닫힌 "meta" 노드)는 문서에서 제거됩니다.

문서 트리 데이터 구조는 DOM 트리와 유사하지만, DOM의 일반적인 노드 대신 특정 노드 이름(클래스)을 사용합니다. 스키마는 두 부분으로 구성된 XML DTD(eXtensible Markup Language Document Type Definition)로 문서화되어 있습니다.
*   Docutils Generic DTD, `docutils.dtd`.
*   OASIS Exchange Table Model, `soextbl.dtd`.

DTD는 많은 입력 및 출력 형식에 적합한 풍부한 요소 집합을 정의합니다. DTD는 원본 입력 텍스트 또는 그럴듯한 복제본을 재구성하는 데 필요한 모든 정보를 유지합니다.

자세한 내용은 The Docutils Document Tree (미완성)를 참조하십시오.

#### 오류 처리 (Error Handling)

파서가 마크업에서 오류를 만나면 시스템 메시지(DTD 요소 "system_message")를 삽입합니다. 시스템 메시지에는 5가지 레벨이 있습니다.

*   **Level-0, "DEBUG"**: 내부 보고 문제. 처리에 영향을 미치지 않습니다. Level-0 시스템 메시지는 다른 메시지와 별도로 처리됩니다.
*   **Level-1, "INFO"**: 무시할 수 있는 사소한 문제. 처리에 거의 또는 전혀 영향을 미치지 않습니다. 일반적으로 Level-1 시스템 메시지는 보고되지 않습니다.
*   **Level-2, "WARNING"**: 해결해야 할 문제. 무시하면 출력에 사소한 문제가 발생할 수 있습니다. 일반적으로 Level-2 시스템 메시지는 보고되지만 처리를 중단하지는 않습니다.
*   **Level-3, "ERROR"**: 해결해야 할 주요 문제. 무시하면 출력에 예측할 수 없는 오류가 포함됩니다. 일반적으로 Level-3 시스템 메시지는 보고되지만 처리를 중단하지는 않습니다.
*   **Level-4, "SEVERE"**: 해결해야 할 치명적인 오류. 일반적으로 Level-4 시스템 메시지는 처리를 중단하는 예외로 변환됩니다. 무시하면 출력에 심각한 오류가 포함됩니다.

초기 메시지 레벨은 독립적으로 고안되었지만, VMS 오류 조건 심각도 레벨과 강한 상관관계를 가집니다. 레벨 1부터 4까지의 따옴표 안의 이름은 VMS에서 차용되었습니다. 오류 처리는 이후 log4j 프로젝트의 영향을 받았습니다.

#### Python 소스 리더 (Python Source Reader)

Python Source Reader("PySource")는 Python 소스 파일을 읽고, 문맥 내에서 독스트링을 추출한 다음, 독스트링을 파싱, 연결 및 조합하여 일관된 전체를 만드는 Docutils 구성 요소입니다. 이는 중요하고 단순하지 않은 구성 요소이며, 현재 Docutils 샌드박스에서 실험적으로 개발 중입니다. 여기에 상위 수준 디자인 문제가 제시됩니다.

##### 처리 모델 (Processing Model)

이 모델은 경험과 발견을 통합하면서 시간이 지남에 따라 발전할 것입니다.

1.  PySource Reader는 Input 클래스를 사용하여 Python 패키지 및 모듈을 문자열 트리로 읽어들입니다.
2.  Python 모듈은 파싱되어 문자열 트리를 독스트링 노드가 있는 추상 구문 트리(AST) 트리로 변환합니다.
3.  추상 구문 트리는 패키지/모듈의 내부 표현으로 변환됩니다.
4.  독스트링뿐만 아니라 코드 구조 세부 사항도 추출됩니다. 아래 AST Mining 섹션을 참조하십시오.
5.  6단계에서 조회를 위한 네임스페이스가 구성됩니다.
6.  한 번에 하나씩 독스트링이 파싱되어 표준 Docutils doctree를 생성합니다.
7.  PySource는 개별 독스트링의 모든 doctree를 패키지/모듈/클래스 구조와 병행하는 Python 특정 사용자 정의 Docutils 트리로 조합합니다. 이는 사용자 정의 Reader별 내부 표현입니다(Docutils Python Source DTD 참조).
8.  네임스페이스를 병합해야 합니다: Python 식별자, 하이퍼링크 타겟.
9.  독스트링(해석된 텍스트)에서 Python 식별자에 대한 상호 참조는 Python 네임스페이스 조회 규칙에 따라 해결됩니다. 아래 Identifier Cross-References 섹션을 참조하십시오.
10. "Stylist" 트랜스폼이 사용자 정의 doctree에 적용되고(Transformer에 의해), 사용자 정의 노드는 표준 노드를 기본 요소로 사용하여 렌더링되며, 표준 문서 트리가 생성됩니다. 아래 Stylist Transforms 섹션을 참조하십시오.
11. 다른 트랜스폼은 Transformer에 의해 표준 doctree에 적용됩니다.
12. 표준 doctree는 Writer로 전송되어 문서를 구체적인 형식(HTML, PDF 등)으로 변환합니다. Writer는 Output 클래스를 사용하여 결과 데이터를 대상(디스크 파일, 디렉토리 및 파일 등)에 씁니다.

##### AST 마이닝 (AST Mining)

파싱된 Python 모듈을 스캔하고 다음 모든 객체의 이름, 독스트링(어트리뷰트 및 추가 독스트링 포함; 아래 참조), 및 추가 정보(아래 괄호 안)를 포함하는 순서화된 트리를 반환하는 추상 구문 트리(AST) 마이닝 코드가 작성(또는 적용)될 것입니다.

*   패키지
*   모듈
*   모듈 어트리뷰트 (+ 초기 값)
*   클래스 (+ 상속)
*   클래스 어트리뷰트 (+ 초기 값)
*   인스턴스 어트리뷰트 (+ 초기 값)
*   메서드 (+ 매개변수 & 기본 값)
*   함수 (+ 매개변수 & 기본 값)

(주석도 추출할까요? 예를 들어, 모듈 시작 부분의 주석은 서지 필드 목록에 좋은 장소가 될 것입니다.)

해석된 텍스트 상호 참조를 평가하기 위해서는 위 각 항목에 대한 네임스페이스도 필요할 것입니다.

2001년 8월 14일에 시작된 `python-dev/docstring-develop` 스레드 "AST mining"을 참조하십시오.

##### 독스트링 추출 규칙 (Docstring Extraction Rules)

**무엇을 검사할 것인가:**

*   문서화되는 모듈에 `__all__` 변수가 있으면 `__all__`에 나열된 식별자만 독스트링에 대해 검사됩니다.
*   `__all__`이 없는 경우, 이름이 private인 식별자(이름이 "_"로 시작하지만 "__"로 시작하고 끝나지 않는 이름)를 제외한 모든 식별자가 검사됩니다.
*   1a와 1b는 런타임 설정으로 재정의할 수 있습니다.

**어디서:**

독스트링은 문자열 리터럴 표현식이며, Python 모듈 내의 다음 위치에서 인식됩니다.

*   모듈, 함수 정의, 클래스 정의 또는 메서드 정의 시작 부분, 모든 주석 뒤. 이는 Python `__doc__` 어트리뷰트의 표준입니다.
*   모듈, 클래스 정의 또는 `__init__` 메서드 정의의 최상위 수준에서 간단한 할당 바로 다음, 모든 주석 뒤. 아래 Attribute Docstrings 섹션을 참조하십시오.
*   (a) 및 (b)의 독스트링 바로 다음에 발견되는 추가 문자열 리터럴은 인식, 추출 및 연결됩니다. 아래 Additional Docstrings 섹션을 참조하십시오.
*   @@@ 어트리뷰트 독스트링이 있는 2.2 스타일 "properties"? 구문까지 기다릴까요?

**어떻게:**

가능한 한 Python 모듈은 Docutils에 의해 파싱되어야 하며, 임포트되지 않아야 합니다. 여러 이유가 있습니다.

*   신뢰할 수 없는 코드를 임포트하는 것은 본질적으로 안전하지 않습니다.
*   임포트된 모듈을 검사하기 위해 인트로스펙션(introspection)을 사용할 때 주석 및 정의 순서와 같은 소스 정보가 손실됩니다.
*   독스트링은 바이트 코드 컴파일러가 문자열 리터럴 표현식(위 2b 및 2c)을 무시하는 곳에서 인식되어야 합니다. 이는 모듈을 임포트하면 이러한 독스트링이 손실된다는 것을 의미합니다.

물론 "parser" 라이브러리 모듈과 같은 표준 Python 파싱 도구를 사용해야 합니다.

모듈에 대한 Python 소스 코드를 사용할 수 없거나(즉, `.pyc` 파일만 존재하는 경우) C 확장 모듈의 경우, 독스트링에 접근하려면 모듈을 임포트해야 하며, 모든 제한 사항을 감수해야 합니다.

어트리뷰트 독스트링 및 추가 독스트링은 Python 바이트 코드 컴파일러에 의해 무시되므로, 이를 사용해도 네임스페이스 오염이나 런타임 부하가 발생하지 않습니다. 이들은 `__doc__` 또는 다른 어트리뷰트에 할당되지 않습니다. 모듈의 초기 파싱은 약간의 성능 저하를 가져올 수 있습니다.

###### 어트리뷰트 독스트링 (Attribute Docstrings)

(PEP 224의 간소화된 버전입니다.)

할당문 바로 뒤에 오는 문자열 리터럴은 다음 조건 하에서 독스트링 추출 메커니즘에 의해 할당문의 대상의 독스트링으로 해석됩니다.

할당은 다음 컨텍스트 중 하나에 있어야 합니다.

1.  모듈의 최상위 수준(즉, 루프 또는 조건문과 같은 복합문 내에 중첩되지 않음): 모듈 어트리뷰트.
2.  클래스 정의의 최상위 수준: 클래스 어트리뷰트.
3.  클래스의 `__init__` 메서드 정의의 최상위 수준: 인스턴스 어트리뷰트. 다른 메서드에서 할당된 인스턴스 어트리뷰트는 구현 세부 사항으로 간주됩니다. (@@@ `__new__` 메서드?)
4.  모듈 또는 클래스 정의의 최상위 수준에서의 함수 어트리뷰트 할당.

위 각 컨텍스트는 최상위 수준(즉, 정의의 가장 바깥쪽 스위트(suite))이므로, 조건부 또는 루프 내에서 할당된 어트리뷰트에 대해 더미 할당을 배치해야 할 수 있습니다.

할당은 단일 대상에 대한 것이어야 하며, 대상 목록이나 튜플에 대한 것이 아니어야 합니다.
대상의 형식:

1.  위 1a 및 1b 컨텍스트의 경우, 대상은 단순 식별자여야 합니다(점 식별자, 첨자 표현식 또는 슬라이스 표현식 아님).
2.  위 1c 컨텍스트의 경우, 대상은 "self.attrib" 형식이어야 합니다. 여기서 "self"는 `__init__` 메서드의 첫 번째 매개변수(인스턴스 매개변수)와 일치하고 "attrib"는 3a와 같은 단순 식별자입니다.
3.  위 1d 컨텍스트의 경우, 대상은 "name.attrib" 형식이어야 합니다. 여기서 "name"은 이미 정의된 함수 또는 메서드 이름과 일치하고 "attrib"는 3a와 같은 단순 식별자입니다.

어트리뷰트 독스트링 뒤에 빈 줄을 사용하여 할당과 독스트링 간의 연결을 강조할 수 있습니다.

예시:

```python
g = 'module attribute (module-global variable)'
"""This is g's docstring."""

class AClass:
    c = 'class attribute'
    """This is AClass.c's docstring."""
    def __init__(self):
        """Method __init__'s docstring."""
        self.i = 'instance attribute'
        """This is self.i's docstring."""

def f(x):
    """Function f's docstring."""
    return x**2

f.a = 1
"""Function attribute f.a's docstring."""
```


###### 추가 독스트링 (Additional Docstrings)

(이 아이디어는 PEP 216에서 채택되었습니다.)

많은 프로그래머는 API 문서화를 위해 독스트링을 광범위하게 사용하고 싶어 합니다. 그러나 독스트링은 실행 중인 프로그램에서 공간을 차지하므로 일부 프로그래머는 코드 "팽창"을 꺼려 합니다. 또한, 모든 API 문서가 `__doc__`이 표시되는 대화형 환경에 적용되는 것은 아닙니다.

Docutils의 독스트링 추출 도구는 정의 시작 부분 또는 간단한 할당 뒤에 나타나는 모든 문자열 리터럴 표현식을 연결합니다. 정의의 첫 번째 문자열만 `__doc__`으로 사용할 수 있으며, 대화형 세션에 적합한 간결한 사용 텍스트로 사용될 수 있습니다. 이후의 문자열 리터럴과 모든 어트리뷰트 독스트링은 Python 바이트 코드 컴파일러에 의해 무시되며 더 광범위한 API 정보를 포함할 수 있습니다.

예시:

```python
def function(arg):
    """This is __doc__, function's docstring."""
    """ This is an additional docstring, ignored by the byte-code compiler,
        but extracted by Docutils. """
    pass
```


이슈: `from __future__ import`

이는 여러 모듈 독스트링(주 독스트링 + 추가 독스트링)에 대해 Python 2.1에서 도입된 "`from __future__ import`" 문을 깨뜨릴 것입니다. Python 참조 매뉴얼은 다음과 같이 명시합니다.

미래(future) 문은 모듈의 상단 근처에 나타나야 합니다. 미래 문 앞에 나타날 수 있는 유일한 줄은 다음과 같습니다.

*   모듈 독스트링(있는 경우)
*   주석
*   빈 줄
*   다른 미래 문

해결책은 무엇일까요?
`__future__` 문 뒤에 독스트링을 검색해야 할까요? 매우 보기 흉합니다. 여러 선행 문자열 리터럴을 허용하도록 `__future__` 문을 재정의해야 할까요? 아니면 이것에 대해 걱정할 필요가 없을까요? 결국, 프로덕션 코드에 `__future__` 문이 있어서는 안 될 것입니다. 아마도 `__future__` 문이 있는 모듈은 단일 독스트링 제한을 감수해야 할 것입니다.

##### 독스트링 형식 선택 (Choice of Docstring Format)

모든 사람이 단일 독스트링 형식을 사용하도록 강제하기보다는, 처리 시스템은 여러 입력 형식을 허용합니다. 특별 변수 `__docformat__`은 함수 또는 클래스 정의 이전에 모듈의 최상위 수준에 나타날 수 있습니다. 시간이 지남에 따라 또는 명령을 통해 표준 형식 또는 형식 집합이 등장해야 합니다.

모듈의 `__docformat__` 변수는 모듈 파일에 정의된 객체에만 적용됩니다. 특히, 패키지의 `__init__.py` 파일에 있는 `__docformat__` 변수는 서브패키지 및 서브모듈에 정의된 객체에는 적용되지 않습니다.

`__docformat__` 변수는 사용되는 형식의 이름, 입력 파서의 모듈 또는 패키지 이름(즉, 모듈 또는 패키지를 "import"하는 데 필요한 이름과 동일)과 대소문자를 구분하지 않고 일치하는 문자열, 또는 등록된 별칭을 포함하는 문자열입니다. `__docformat__`이 지정되지 않은 경우, 현재 기본 형식은 "plaintext"입니다. 이는 표준 형식이 확립되면 변경될 수 있습니다.

`__docformat__` 문자열에는 형식 이름(첫 번째 필드)과 단일 공백으로 구분된 선택적 두 번째 필드가 포함될 수 있습니다. 이는 RFC 1766에 정의된 대소문자를 구분하지 않는 언어 식별자입니다. 일반적인 언어 식별자는 ISO 639의 2글자 언어 코드(2글자 코드가 없는 경우에만 3글자 코드가 사용됨; RFC 1766은 현재 3글자 코드를 허용하도록 개정 중)로 구성됩니다. 언어 식별자가 지정되지 않은 경우, 기본값은 영어 "en"입니다. 언어 식별자는 파서에 전달되며 언어 종속 마크업 기능에 사용될 수 있습니다.

##### 식별자 상호 참조 (Identifier Cross-References)

Python 독스트링에서 해석된 텍스트는 변수, 함수, 클래스 및 모듈의 이름과 같은 프로그램 식별자를 분류하고 마크업하는 데 사용됩니다. 식별자만 주어지면, Python 네임스페이스 조회 규칙에 따라 그 역할이 암묵적으로 추론됩니다. 함수 및 메서드(동적으로 할당된 경우에도)의 경우, 괄호('()')가 포함될 수 있습니다.

예시: `This function uses `another()` to do its work.`

클래스, 인스턴스 및 모듈 어트리뷰트의 경우, 필요할 때 점 식별자가 사용됩니다. 예를 들어 (reStructuredText 마크업 사용):

```python
class Keeper(Storer):
    """ Extend `Storer`. Class attribute `instances` keeps track of the number of `Keeper` objects instantiated. """
    instances = 0
    """How many `Keeper` objects are there?"""

    def __init__(self):
        """ Extend `Storer.__init__()` to keep track of instances. Keep count in `Keeper.instances`, data in `self.data`. """
        Storer.__init__(self)
        Keeper.instances += 1
        self.data = []
        """Store data in a list, most recent last."""

    def store_data(self, data):
        """ Extend `Storer.store_data()`; append new `data` to a list (in `self.data`). """
        self.data = data
```


백틱("`")으로 인용된 각 식별자는 식별자 자체의 정의에 대한 참조가 됩니다.

##### 스타일리스트 트랜스폼 (Stylist Transforms)

스타일리스트 트랜스폼은 PySource Reader에 특화된 트랜스폼입니다. PySource Reader는 스타일에 대한 결정을 내릴 필요가 없습니다. 논리적으로 구성된 문서 트리(파싱되고 연결된, 사용자 정의 노드 유형 포함)를 생성하기만 합니다. 스타일리스트 트랜스폼은 Reader가 생성한 사용자 정의 노드를 이해하고 이를 표준 Docutils 노드로 변환합니다.

여러 Stylist 트랜스폼을 구현할 수 있으며, 런타임에 하나를 선택할 수 있습니다(명령줄 옵션 "--style" 또는 "--stylist"를 통해). 각 Stylist 트랜스폼은 다른 레이아웃 또는 스타일을 구현합니다. 따라서 이름이 "Stylist"입니다. 이는 Reader의 컨텍스트 이해 부분과 처리의 레이아웃 생성 부분을 분리하여, 더 유연하고 견고한 시스템을 만듭니다. 이는 또한 "스타일과 내용을 분리"하는 SGML/XML 이상을 달성합니다.

스타일링을 수행하는 코드 조각을 작고 모듈식으로 유지함으로써, 사람들이 자신만의 스타일을 만드는 것이 훨씬 쉬워집니다. 기존 도구로는 "진입 장벽"이 너무 높습니다. 스타일리스트 코드를 추출하면 장벽이 상당히 낮아질 것입니다.

### 프로젝트 웹 사이트 (Project Web Site)

이 작업을 위해 SourceForge 프로젝트가 http://docutils.sourceforge.net/에 설정되었습니다.

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

### 감사 (Acknowledgements)

이 문서는 Python Doc-SIG 아카이브의 아이디어를 차용했습니다. 과거 및 현재 모든 구성원에게 감사합니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.