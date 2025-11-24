---
title: "[Superseded] PEP 241 - Metadata for Python Software Packages"
excerpt: "Python Enhancement Proposal 241: 'Metadata for Python Software Packages'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/241/
toc: true
toc_sticky: true
date: 2025-09-26 17:11:45+0900
last_modified_at: 2025-09-26 17:11:45+0900
published: true
---
> **원문 링크:** [PEP 241 - Metadata for Python Software Packages](https://peps.python.org/pep-0241/)
>
> **상태:** Superseded | **유형:** Standards Track | **작성일:** 12-Mar-2001



PEP 241은 Python 소프트웨어 패키지에 메타데이터를 추가하는 메커니즘을 설명합니다. 이 문서는 필드 이름, 의미 및 사용법에 대한 세부 사항을 포함합니다. 이 PEP는 현재 **Superseded (대체됨)** 상태이며, PyPA (Python Packaging Authority) 스펙 페이지에서 Core metadata specifications (코어 메타데이터 사양)으로 최신 내용이 관리되고 있습니다.

---

### **PEP 241 – Python 소프트웨어 패키지용 메타데이터**

*   **작성자:** A.M. Kuchling
*   **토론:** Distutils-SIG list
*   **상태:** Superseded (대체됨)
*   **유형:** Standards Track
*   **주제:** Packaging
*   **생성일:** 2001년 3월 12일
*   **대체됨:** PEP 314

### **개요 (Introduction)**

이 PEP는 Python 패키지에 메타데이터를 추가하는 메커니즘을 설명합니다. 여기에는 필드 이름과 해당 필드의 의미 및 사용법에 대한 세부 정보가 포함됩니다.

**중요:** 이 PEP는 역사적인 문서입니다. 최신 규격인 Core metadata specifications는 PyPA 스펙 페이지에서 유지 관리됩니다.

### **패키지에 메타데이터 포함 (Including Metadata in Packages)**

Distutils의 `sdist` 명령어는 인자로부터 메타데이터 필드를 추출하여 생성된 zipfile 또는 tarball 내의 파일에 기록하도록 수정될 것입니다. 이 파일은 `PKG-INFO`로 명명되며, 소스 배포판의 최상위 디렉토리(일반적으로 `README`, `INSTALL` 등의 파일이 위치하는 곳)에 배치됩니다.

개발자는 직접 `PKG-INFO` 파일을 제공해서는 안 됩니다. `sdist` 명령어는 기존 `PKG-INFO` 파일을 감지하면 적절한 오류 메시지와 함께 종료됩니다. 이는 `PKG-INFO`와 `setup.py` 파일이 동기화되지 않아 발생하는 혼란을 방지하기 위함입니다.

`PKG-INFO` 파일 형식은 `rfc822.py` 모듈로 파싱 가능한 단일 RFC 822 헤더 집합입니다. 다음 섹션에 나열된 필드 이름은 헤더 이름으로 사용됩니다. 이 간단한 형식에는 확장 메커니즘이 없으며, Catalog 및 Distutils SIG는 Python 2.2를 위해 더 유연한 형식을 준비하는 것을 목표로 합니다.

### **필드 (Fields)**

이 섹션에서는 지원되는 각 메타데이터 필드의 이름과 의미를 지정합니다.

"(Multiple use)"로 표시된 필드는 단일 `PKG-INFO` 파일에 여러 번 지정될 수 있습니다. 다른 필드는 `PKG-INFO` 파일에 한 번만 나타날 수 있습니다. "(optional)"로 표시된 필드는 유효한 `PKG-INFO` 파일에 반드시 나타날 필요는 없으며, 다른 모든 필드는 존재해야 합니다.

*   **`Metadata-Version`**
    *   파일 형식의 버전입니다. 현재 "1.0"만이 유효한 값입니다.
    *   예시: `Metadata-Version: 1.0`

*   **`Name`**
    *   패키지의 이름입니다.
    *   예시: `Name: BeagleVote`

*   **`Version`**
    *   패키지의 버전 번호를 포함하는 문자열입니다. 이 필드는 `distutils.version` 모듈의 `Version` 클래스(StrictVersion 또는 LooseVersion) 중 하나로 파싱 가능해야 합니다.
    *   예시: `Version: 1.0a2`

*   **`Platform` (Multiple use)**
    *   패키지에서 지원하는 운영 체제를 요약한 쉼표로 구분된 플랫폼 사양 목록입니다.
    *   예시: `Platform: POSIX, Windows`

*   **`Summary`**
    *   패키지가 수행하는 작업을 한 줄로 요약한 설명입니다.
    *   예시: `Summary: A module for collecting votes from beagles.`

*   **`Description` (optional)**
    *   여러 단락에 걸쳐 작성될 수 있는 패키지에 대한 더 긴 설명입니다.
    *   예시: `Description: This module collects votes from beagles...`

*   **`Keywords` (optional)**
    *   더 큰 카탈로그에서 패키지를 검색하는 데 도움이 되는 추가 키워드 목록입니다.
    *   예시: `Keywords: dog puppy voting election`

*   **`Home-page` (optional)**
    *   패키지의 홈 페이지 URL을 포함하는 문자열입니다.
    *   예시: `Home-page: http://www.example.com/~cschultz/bvote/`

*   **`Author` (optional)**
    *   최소한 저자의 이름을 포함하는 문자열입니다. 각 줄을 개행 문자로 구분하여 연락처 정보도 추가할 수 있습니다.
    *   예시: `Author: C. Schultz Universal Features Syndicate Los Angeles, CA`

*   **`Author-email`**
    *   저자의 이메일 주소를 포함하는 문자열입니다. RFC 822 'From:' 헤더의 유효한 형식으로 이름과 이메일 주소를 포함할 수 있습니다. 카탈로그 시스템에서 이 필드의 이메일 부분을 저자를 나타내는 고유 키로 사용할 수 있으므로 필수는 아닙니다.
    *   예시: `Author-email: "C. Schultz" <cschultz@example.com>`

*   **`License`**
    *   패키지를 다루는 라이선스를 지정하는 짧은 선택 목록에서 선택된 문자열입니다. 일부 라이선스는 소프트웨어가 자유롭게 재배포될 수 있음을 의미하므로, 패키저와 리셀러는 소프트웨어를 자유롭게 재배포할 수 있음을 자동으로 알 수 있습니다.
    *   선택 가능한 라이선스 목록: Artistic, BSD, DFSG, GNU GPL, GNU LGPL, "MIT", Mozilla PL, "public domain", Python, Qt PL, Zope PL, unknown, nocommercial, nosell, nosource, shareware, other.
    *   예시: `License: MIT`

### **감사의 글 (Acknowledgements)**

이 문서에 대한 많은 변경 사항과 재작성은 Distutils SIG 독자들에 의해 제안되었습니다. 특히 Sean Reifschneider는 이 PEP에 포함할 실제 텍스트를 자주 기여했습니다.

라이선스 목록은 SourceForge 라이선스 목록과 Graham Williams가 작성한 CTAN 라이선스 목록을 사용하여 컴파일되었으며, Carey Evans도 이 목록에 대한 몇 가지 유용한 제안을 제공했습니다.

### **저작권 (Copyright)**

이 문서는 퍼블릭 도메인에 공개되었습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.