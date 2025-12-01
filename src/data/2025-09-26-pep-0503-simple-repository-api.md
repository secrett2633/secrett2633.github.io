---
title: "[Final] PEP 503 - Simple Repository API"
excerpt: "Python Enhancement Proposal 503: 'Simple Repository API'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/503/
toc: true
toc_sticky: true
date: 2025-09-26 22:45:48+0900
last_modified_at: 2025-09-26 22:45:48+0900
published: true
---
> **원문 링크:** [PEP 503 - Simple Repository API](https://peps.python.org/pep-0503/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 04-Sep-2015


## PEP 503 – Simple Repository API

*   **작성자:** Donald Stufft
*   **BDFL-Delegate:** Donald Stufft
*   **토론:** Distutils-SIG list
*   **상태:** Final
*   **유형:** Standards Track
*   **주제:** Packaging
*   **생성일:** 2015년 9월 4일
*   **최종 수정일:** 2025년 8월 20일 (GMT)

### 초록 (Abstract)

Python 패키지 저장소에는 다양한 구현체가 존재하며, 이를 사용하는 도구 또한 많습니다. 이 중 "simple" 저장소 API의 모습을 정의하는 표준 구현체는 PyPI에 사용되는 구현체입니다. 이 문서는 simple 저장소 API의 올바른 동작을 문서화하고 API를 명확하게 명시합니다.

### 사양 (Specification)

simple API를 구현하는 저장소는 **베이스 URL (base URL)** 에 의해 정의됩니다. 이는 모든 추가 URL의 최상위 URL입니다. PyPI의 베이스 URL이 `https://pypi.org/simple/`이므로 이 API를 "simple" 저장소라고 부릅니다.

**참고:** 이 문서의 모든 후속 URL은 베이스 URL에 대한 상대 경로입니다. 예를 들어, PyPI의 URL을 기준으로 `/foo/`는 `https://pypi.org/simple/foo/`가 됩니다.

저장소 내에서, 루트 URL (`/`, 이 PEP에서는 베이스 URL을 나타냄)은 저장소 내 각 프로젝트에 대한 단일 `<a>` (앵커) 요소를 포함하는 유효한 HTML5 페이지여야 합니다.
*   앵커 태그의 텍스트는 **프로젝트의 이름** 이어야 합니다.
*   `href` 속성은 해당 특정 프로젝트의 URL로 **링크** 되어야 합니다.

**예시:**

```html
<!DOCTYPE html>
<html>
<body>
    <a href="/frob/">frob</a>
    <a href="/spamspamspam/">spamspamspam</a>
</body>
</html>
```


루트 URL 아래에는 저장소에 포함된 각 개별 프로젝트에 대한 다른 URL이 있습니다. 이 URL의 형식은 `/<project>/`이며, 여기서 `<project>`는 해당 프로젝트의 **정규화된 이름 (normalized name)** 으로 대체됩니다. 따라서 "HolyGrail"이라는 프로젝트는 `/holygrail/`과 같은 URL을 가집니다.
이 URL은 프로젝트의 파일별로 단일 앵커 요소를 포함하는 유효한 HTML5 페이지로 응답해야 합니다.
*   `href` 속성은 다운로드할 파일의 위치로 연결되는 URL이어야 합니다.
*   앵커 태그의 텍스트는 URL의 최종 경로 구성 요소(파일 이름)와 **일치** 해야 합니다.
*   URL은 다음과 같은 구문으로 URL Fragment 형태의 해시를 포함해야 합니다: `#<hashname>=<hashvalue>`.
    *   `<hashname>`은 해시 함수의 소문자 이름(예: `sha256`)입니다.
    *   `<hashvalue>`는 16진수로 인코딩된 다이제스트(digest)입니다.

**API에 대한 추가 제약 조건:**

*   HTML5 페이지로 응답하는 모든 URL은 `/`로 끝나야 하며, 저장소는 `/`가 없는 URL을 `/`를 추가하도록 리다이렉션해야 합니다.
*   URL은 올바른 위치를 가리키는 한 절대 또는 상대 경로일 수 있습니다.
*   파일이 저장소에 대해 상대적으로 어디에 호스팅되어야 하는지에 대한 제약은 없습니다.
*   필수 앵커 요소가 존재하는 한, API 페이지에는 다른 HTML 요소가 있을 수 있습니다.
*   저장소는 정규화되지 않은 URL을 정규화된 표준 URL로 리다이렉션할 수 있습니다 (예: `/Foobar/`를 `/foobar/`로 리다이렉션). 그러나 클라이언트는 이 리다이렉션에 의존해서는 안 되며, **정규화된 URL을 요청** 해야 합니다.
*   저장소는 Python 표준 라이브러리의 `hashlib` 모듈을 통해 사용 가능하다고 보장되는 해시 함수 중 하나를 선택해야 합니다 (현재 `md5`, `sha1`, `sha224`, `sha256`, `sha384`, `sha512`). 현재 권장 사항은 `sha256`을 사용하는 것입니다.
*   특정 배포 파일에 GPG 서명이 있는 경우, 해당 파일과 같은 이름에 `.asc`가 추가된 형태로 함께 존재해야 합니다. 예를 들어, `/packages/HolyGrail-1.0.tar.gz` 파일이 있고 관련 서명이 있다면, 서명은 `/packages/HolyGrail-1.0.tar.gz.asc`에 위치해야 합니다.
*   저장소는 파일 링크에 `data-gpg-sig` 속성을 `true` 또는 `false` 값으로 포함하여 GPG 서명 존재 여부를 나타낼 수 있습니다. 이를 사용하는 저장소는 모든 링크에 이 속성을 포함해야 합니다.
*   저장소는 파일 링크에 `data-requires-python` 속성을 포함할 수 있습니다. 이는 해당 릴리스에 대한 PEP 345에 명시된 `Requires-Python` 메타데이터 필드를 노출합니다. 이 속성이 존재할 경우, 설치 도구는 요구 사항을 충족하지 않는 Python 버전으로 설치할 때 다운로드를 무시해야 합니다.

**예시:**

```html
<a href="..." data-requires-python="&gt;=3">...</a>
```


속성 값에서 `<`와 `>`는 각각 HTML 인코딩된 `&lt;`와 `&gt;`여야 합니다.

### 정규화된 이름 (Normalized Names)

이 PEP는 "정규화된" 프로젝트 이름의 개념을 참조합니다. PEP 426에 따르면, 이름에 유효한 문자는 ASCII 알파벳, ASCII 숫자, `.`, `-`, `_` 뿐입니다. 이름은 소문자여야 하며, `.`, `-`, `_` 문자열의 모든 연속은 단일 `-` 문자로 대체되어야 합니다. 이는 Python에서 `re` 모듈을 사용하여 구현할 수 있습니다.

```python
import re

def normalize(name):
    return re.sub(r"[-_.]+", "-", name).lower()
```


### 변경 사항 (Changes)

*   선택적 `data-requires-python` 속성은 2016년 7월에 추가되었습니다.

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.