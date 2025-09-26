---
title: "[Withdrawn] PEP 206 - Python Advanced Library"
excerpt: "Python Enhancement Proposal 206: 'Python Advanced Library'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/206/
toc: true
toc_sticky: true
date: 2025-09-26 16:17:22+0900
last_modified_at: 2025-09-26 16:17:22+0900
published: true
---
> **원문 링크:** [PEP 206 - Python Advanced Library](https://peps.python.org/pep-0206/)
>
> **상태:** Withdrawn | **유형:** Informational | **작성일:** 14-Jul-2000

PEP 206 – Python Advanced Library는 Python의 "Batteries Included" 철학을 확장하여 고품질의 자주 사용되는 서드 파티 확장 모듈 컬렉션을 제안했던 문서입니다. 이 PEP는 현재 철회(Withdrawn)되었습니다.

---

## PEP 206 – Python Advanced Library (Python 고급 라이브러리)

*   **작성자:** A.M. Kuchling
*   **상태:** 철회됨 (Withdrawn)
*   **유형:** 정보 제공 (Informational)
*   **생성일:** 2000년 7월 14일

### 1. 서론 (Introduction)

이 PEP는 "Python Advanced Library"를 설명합니다. Python Advanced Library는 고품질의 자주 사용되는 서드 파티 확장 모듈들의 컬렉션을 의미합니다.

### 2. "Batteries Included" 철학 (Batteries Included Philosophy)

Python 배포판은 오랫동안 "batteries included" (배터리 포함)이라는 철학을 유지해왔습니다. 이는 사용자가 별도의 패키지를 다운로드할 필요 없이 즉시 사용할 수 있는 풍부하고 다재다능한 표준 라이브러리를 제공하는 것을 의미합니다. 이러한 접근 방식은 많은 프로젝트에서 Python 언어가 빠르게 시작할 수 있도록 돕습니다.

그러나 표준 라이브러리 모듈이 항상 최적의 선택은 아니었습니다. 일부 라이브러리 모듈은 급하게 만들어졌거나(예: `calendar`, `commands`), 설계가 미흡하여 수정이 거의 불가능한 경우(예: `cgi`), 또는 다른 더 완전한 모듈에 의해 구식화된 경우(예: `binascii`는 `binhex`, `uu`, `base64` 모듈과 동일한 기능을 제공)가 있었습니다.

이 PEP는 Python을 다양한 애플리케이션 도메인에서 더욱 경쟁력 있게 만들 수 있는 서드 파티 모듈 목록을 제시하며, 이를 "Python Advanced Library"로 구성하고자 했습니다.

### 3. 목표 및 구현 (Deliverables)

제안된 결과물은 특정 애플리케이션 도메인에 맞는 패키지를 검색, 빌드 및 설치하는 스크립트 세트였습니다. 당시 Python Package Index (PyPI)가 패키지를 자동으로 찾아 다운로드할 수 있는 충분한 정보를 담고 있었기 때문에, 이러한 구현이 적절하다고 보았습니다.

이 문서는 서드 파티 모듈에 의해 대체된 표준 라이브러리 모듈을 제거할 것을 제안하지 않았습니다. 이는 많은 하위 호환성 문제(backward-compatibility problems)를 수반하기 때문에 당장은 고려할 가치가 없다고 판단했습니다.

### 4. 제안된 애플리케이션 도메인 및 모듈 (Suggested Application Domains and Modules)

PEP 206은 다양한 애플리케이션 도메인에 대해 유용할 수 있는 서드 파티 모듈들을 예시로 들었습니다.

*   **웹 작업 (Web tasks):**
    *   XML 파싱: `ElementTree` + `SAX`
    *   URL 검색: `libcurl` 또는 다른 대안
    *   HTML 파싱: `mxTidy`, `HTMLParser`
    *   비동기 네트워크 I/O: `Twisted`
    *   웹 프레임워크: WSGI 게이트웨이, `Paste`

*   **과학 프로그래밍 (Scientific Programming):**
    *   수치 계산: `Numeric`, `SciPy`
    *   그래픽: `PIL` (Pillow), `Chaco`

*   **애플리케이션 개발 (Application Development):**
    *   그래픽: PDF 생성을 위한 `Reportlab`

*   **교육 (Education):**
    *   그래픽: `PyGame`

### 5. GNU General Public License 적용 소프트웨어 (Software covered by the GNU General Public License)

일부 서드 파티 모듈은 GNU General Public License (GPL) 및 GNU Lesser General Public License (LGPL)에 따라 제공될 수 있습니다. 이러한 패키지를 다운로드하고 설치하는 스크립트를 제공하거나, 모든 패키지를 단일 타르볼(tarball) 또는 CD-ROM으로 묶는 것은 라이선스의 "단순 집합(mere aggregation)" 조항에 따라 GPL에 어려움을 일으키지 않을 것이라고 언급되었습니다.

### 6. 미해결 문제 (Open Issues)

이 PEP에서는 몇 가지 미해결 문제를 제기했습니다.

*   어떤 다른 애플리케이션 도메인이 중요한가?
*   이 제안이 Ubuntu 또는 Debian 패키지 세트에 불과해야 하는가? `PyGame`과 같은 것을 컴파일하는 것은 매우 복잡할 수 있으며 자동화하기 어려울 수 있다.

### 7. 결론 및 영향

PEP 206은 Python의 표준 라이브러리가 충분하지 않거나 구식인 특정 영역에서 서드 파티 모듈을 공식적으로 추천하고 통합하려는 초기 시도였습니다. 이 PEP는 "Withdrawn" (철회됨) 상태로, 제안된 내용이 공식적으로 채택되지는 않았습니다.

하지만 이 PEP의 논의는 Python 생태계가 점차 발전하면서 PyPI와 같은 패키지 관리 시스템의 중요성을 강조하고, 서드 파티 라이브러리가 Python 개발의 핵심 요소로 자리 잡는 데 기여했습니다. 오늘날 `pip`와 PyPI는 Python 개발자들이 필요한 라이브러리를 쉽게 찾고 설치할 수 있도록 하는 사실상의 표준이 되었으며, 이는 PEP 206이 해결하고자 했던 문제의 현대적인 해답이라고 볼 수 있습니다. 현재는 특정 "Advanced Library"를 공식적으로 묶기보다는, PyPI를 통해 방대한 서드 파티 라이브러리 생태계가 자율적으로 성장하고 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.