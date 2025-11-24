---
title: "[Withdrawn] PEP 9 - Sample Plaintext PEP Template"
excerpt: "Python Enhancement Proposal 9: 'Sample Plaintext PEP Template'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/9/
toc: true
toc_sticky: true
date: 2025-09-26 15:47:09+0900
last_modified_at: 2025-09-26 15:47:09+0900
published: true
---
> **원문 링크:** [PEP 9 - Sample Plaintext PEP Template](https://peps.python.org/pep-0009/)
>
> **상태:** Withdrawn | **유형:** Process | **작성일:** 14-Aug-2001

## PEP 9 – 샘플 일반 텍스트 PEP 템플릿 번역 및 해설

**작성자:** Barry Warsaw <barry at python.org>
**상태:** 철회됨 (Withdrawn)
**유형:** 프로세스 (Process)
**생성일:** 2001년 8월 14일
**해결:** Python-Dev 스레드
**참고:** 이 PEP는 2016년 1월 5일부로 공식적으로 사용 중단되었으며 PEP 12로 대체되었습니다. 모든 PEP는 이제 PEP 12에 설명된 reStructuredText 형식을 사용해야 하며, 일반 텍스트 PEP는 더 이상 허용되지 않습니다.

---

### 개요 (Abstract)

이 PEP는 일반 텍스트 PEP를 작성하기 위한 기본 양식 또는 샘플 템플릿을 제공합니다. PEP 1의 내용 지침과 함께 사용하면, 아래에 설명된 형식에 맞춰 PEP를 쉽게 작성할 수 있도록 돕는 것을 목표로 합니다.

**중요:** 이 PEP를 웹을 통해 읽고 있다면, 아래 단계를 완료하기 위해 먼저 이 PEP의 일반 텍스트 소스를 가져와야 합니다. HTML 파일을 템플릿으로 사용하지 마십시오! 이 (또는 어떤) PEP의 소스를 얻으려면, HTML 페이지 상단에서 "Last-Modified" 줄의 날짜와 시간을 클릭하십시오. 이 링크는 Python 저장소의 소스 텍스트로 연결됩니다. PEP에서 경량 마크업을 사용하고 싶다면, "PEP 12, 샘플 reStructuredText PEP 템플릿"을 참조하십시오.

### 도입 배경 (Rationale)

제출되는 PEP들은 다양한 형태로 제공되었고, 이들 모두가 아래에 명시된 형식 지침을 준수하지는 않았습니다. 이 템플릿을 PEP 1의 내용 지침과 함께 사용하면, 형식 문제로 인해 PEP 제출이 자동으로 거부되는 것을 방지할 수 있습니다.

### 템플릿 사용 방법 (How to Use This Template)

이 템플릿을 사용하려면 먼저 PEP가 Informational (정보성) PEP인지 Standards Track (표준 추적) PEP인지 결정해야 합니다. 대부분의 PEP는 Python 언어 또는 표준 라이브러리의 새로운 기능을 제안하기 때문에 Standards Track입니다. 확실하지 않다면 PEP 1에서 자세한 내용을 읽거나 PEP 편집자(<peps@python.org>)에게 문의하십시오.

PEP 유형을 결정했으면 아래 지침을 따르십시오.

-   이 파일(.txt 파일, HTML 아님!)을 복사하고 다음 편집을 수행합니다.
-   "PEP: 9" 헤더를 "PEP: XXX"로 변경합니다. 아직 PEP 번호가 할당되지 않았기 때문입니다.
-   `Title` 헤더를 PEP의 제목으로 변경합니다.
-   `Version` 및 `Last-Modified` 헤더는 그대로 둡니다. PEP를 Python의 Subversion 저장소에 체크인할 때 편집자가 처리합니다. 이 헤더들은 저장소에 의해 자동으로 확장되는 키워드("Revision" 및 "Date"가 "$" 기호로 둘러싸여 있음)로 구성됩니다. 확장된 날짜 또는 Revision 텍스트를 편집하지 마십시오.
-   `Author` 헤더를 변경하여 이름과 선택적으로 이메일 주소를 포함합니다. 형식을 주의 깊게 따르십시오. 이름이 먼저 나와야 하며, 괄호 안에 포함되어서는 안 됩니다. 이메일 주소는 두 번째로 나올 수 있으며 (또는 생략할 수 있음) 표시되는 경우 꺾쇠괄호(`<>`) 안에 나타나야 합니다. 이메일 주소를 난독화하는 것은 허용됩니다.
-   새로운 기능 토론을 위한 메일링 리스트가 있다면, `Author` 헤더 바로 뒤에 `Discussions-To` 헤더를 추가합니다. 사용될 메일링 리스트가 `python-list@python.org` 또는 `python-dev@python.org`이거나, 토론이 직접 귀하에게 전달되어야 하는 경우에는 `Discussions-To` 헤더를 추가해서는 안 됩니다. 대부분의 Informational PEP에는 `Discussions-To` 헤더가 없습니다.
-   `Status` 헤더를 "Draft"로 변경합니다.
-   Standards Track PEP의 경우, `Type` 헤더를 "Standards Track"으로 변경합니다.
-   Informational PEP의 경우, `Type` 헤더를 "Informational"으로 변경합니다.
-   Standards Track PEP의 경우, 기능이 현재 개발 중인 다른 PEP의 승인에 의존한다면, `Type` 헤더 바로 뒤에 `Requires` 헤더를 추가합니다. 값은 종속되는 PEP의 번호여야 합니다. 종속 기능이 Final PEP에 설명되어 있는 경우에는 이 헤더를 추가하지 마십시오.
-   `Created` 헤더를 오늘 날짜로 변경합니다. 형식을 주의 깊게 따르십시오. `dd-mmm-yyyy` 형식이어야 하며, `mmm`은 3글자 영어 월 약어(예: Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec) 중 하나여야 합니다.
-   Standards Track PEP의 경우, `Created` 헤더 뒤에 `Python-Version` 헤더를 추가하고 값을 다음 계획된 Python 버전(새 기능이 처음 나타날 것으로 기대되는 버전)으로 설정합니다. 여기에 알파 또는 베타 릴리스 지정자를 사용하지 마십시오. 따라서 Python의 마지막 버전이 2.2 alpha 1이었고 새 기능을 Python 2.2에 포함시키기를 희망한다면 헤더를 `Python-Version: 2.2`로 설정합니다.
-   `Post-History`는 지금은 그대로 둡니다. PEP를 `python-list@python.org` 또는 `python-dev@python.org`에 게시할 때마다 이 헤더에 날짜를 추가하게 됩니다. 예를 들어, 2001년 8월 14일과 2001년 9월 3일에 PEP를 목록에 게시했다면 `Post-History` 헤더는 다음과 같을 것입니다: `Post-History: 14-Aug-2001, 03-Sept-2001`. 새 날짜를 수동으로 추가하고 체크인해야 합니다. 체크인 권한이 없으면 변경 사항을 PEP 편집자에게 보내십시오.
-   PEP가 이전 PEP를 무효화하는 경우 `Replaces` 헤더를 추가합니다. 이 헤더의 값은 새로운 PEP가 대체하는 PEP의 번호입니다. 이전 PEP가 "final" 형식(예: Accepted, Final, Rejected)인 경우에만 이 헤더를 추가하십시오. 경쟁적인 아이디어를 제출하는 경우에는 이전의 오픈된 PEP를 대체하는 것이 아닙니다.
-   이제 `Abstract`, `Rationale` 및 PEP의 다른 내용을 작성하고 이 "gobbledygook" (알 수 없는 말)을 자신의 텍스트로 대체합니다. 아래의 형식 지침, 특히 탭 문자 금지 및 들여쓰기 요구 사항을 반드시 준수하십시오.
-   `References` 및 `Copyright` 섹션을 업데이트합니다. 일반적으로 PEP를 퍼블릭 도메인에 두게 되며, 이 경우 `Copyright` 섹션은 그대로 둡니다. 또는 Open Publication License를 사용할 수도 있지만, 퍼블릭 도메인이 여전히 강력히 선호됩니다.
-   이 파일 끝에 있는 작은 Emacs "turd" (찌꺼기)는 폼 피드 문자("^L" 또는 `\f`)를 포함하여 그대로 둡니다.
-   PEP 제출물을 PEP 편집자(<peps@python.org>)에게 보냅니다. (농담입니다. 아직 깨어 있는지 확인하고 싶었습니다.)

### 일반 텍스트 PEP 형식 요구 사항 (Plaintext PEP Formatting Requirements)

PEP 헤더는 0열에서 시작해야 하며, 각 단어의 첫 글자는 책 제목과 같이 대문자로 시작해야 합니다. 약어는 모두 대문자로 작성해야 합니다. 각 섹션의 본문은 4칸 들여쓰기해야 합니다. 본문 섹션 내의 코드 샘플은 추가로 4칸 더 들여쓰기해야 하며, 텍스트 가독성을 위해 필요한 경우 다른 들여쓰기를 사용할 수 있습니다.

섹션 본문의 마지막 줄과 다음 섹션 헤더 사이에는 두 줄의 빈 줄을 사용해야 합니다. 모든 문장 끝에는 Emacs 규칙에 따라 두 칸의 공백을 추가해야 합니다. 단락은 70열까지 채워야 하지만, 어떤 경우에도 줄이 79열을 넘어서는 안 됩니다. 코드 샘플이 79열을 넘어가면 다시 작성해야 합니다. 문서에는 탭 문자가 절대 나타나서는 안 됩니다. PEP는 이 PEP 하단에 예시로 포함된 표준 Emacs 스탠자를 포함해야 합니다.

PEP 본문에서 외부 웹 페이지를 참조할 때는 텍스트에 페이지 제목을 포함하고 URL에 대한 각주 참조를 포함해야 합니다. PEP 본문 텍스트에 URL을 포함하지 마십시오. 예를 들면 다음과 같습니다.

```
Python 언어 웹사이트 [1]에서 자세한 내용을 참조하십시오.
...
[1] http://www.python.org
```

다른 PEP를 참조할 때는 "PEP 1"과 같이 본문 텍스트에 PEP 번호를 포함합니다. 제목은 선택적으로 나타날 수 있습니다. 각주 참조(대괄호 안의 숫자)를 추가하십시오. 각주 본문에는 PEP의 제목과 작성자가 포함되어야 합니다. 선택적으로 별도의 줄에 명시적인 URL을 포함할 수 있지만, `References` 섹션에서만 가능합니다. `pep2html.py` 스크립트는 URL을 자동으로 계산합니다. 예를 들면 다음과 같습니다.

```
... PEP 스타일에 대한 자세한 내용은 PEP 1 [7]을 참조하십시오.
...
References
[7] PEP 1, PEP Purpose and Guidelines, Warsaw, Hylton
    http://peps.python.org/pep-0001/
```

PEP에 대한 명시적인 URL을 제공하기로 결정한 경우, 다음 URL 템플릿을 사용하십시오: `http://peps.python.org/pep-xxxx/`. URL의 PEP 번호는 정확히 4자 너비가 되도록 왼쪽에서 0으로 채워야 하지만, 텍스트의 PEP 번호는 절대 채워지지 않습니다.

### 참고 자료 (References)

-   PEP 1, PEP Purpose and Guidelines, Warsaw, Hylton
    `http://peps.python.org/pep-0001/`
-   PEP 12, Sample reStructuredText PEP Template, Goodger, Warsaw
    `http://peps.python.org/pep-0012/`
-   Open Publication License
    `http://www.opencontent.org/openpub/`

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.