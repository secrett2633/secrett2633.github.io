---
title: "[Superseded] PEP 314 - Metadata for Python Software Packages 1.1"
excerpt: "Python Enhancement Proposal 314: 'Metadata for Python Software Packages 1.1'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/314/
toc: true
toc_sticky: true
date: 2025-09-26 18:13:21+0900
last_modified_at: 2025-09-26 18:13:21+0900
published: true
---
> **원문 링크:** [PEP 314 - Metadata for Python Software Packages 1.1](https://peps.python.org/pep-0314/)
>
> **상태:** Superseded | **유형:** Standards Track | **작성일:** 12-Apr-2003


# PEP 314 – Python 소프트웨어 패키지용 메타데이터 1.1

## 목표
이 문서는 Python 패키지에 메타데이터를 추가하는 메커니즘을 설명합니다. 필드 이름과 그 의미, 사용법에 대한 세부 사항을 포함합니다. 이 문서는 메타데이터 형식의 버전 1.1을 명시합니다. 버전 1.0은 PEP 241에 명시되어 있습니다.

**중요:** 이 PEP는 역사적인 문서입니다. 최신 규격인 "Core metadata specifications"는 PyPA specs 페이지에서 유지 관리되고 있습니다.

## 패키지에 메타데이터 포함하기

Distutils `sdist` 명령은 인자(arguments)에서 메타데이터 필드를 추출하여 생성된 zipfile 또는 tarball 내 파일에 기록합니다. 이 파일은 `PKG-INFO`로 명명되며 소스 배포판의 최상위 디렉토리(README, INSTALL 및 기타 파일이 일반적으로 위치하는 곳)에 배치됩니다.

개발자는 자신만의 `PKG-INFO` 파일을 제공해서는 안 됩니다. `sdist` 명령은 기존 `PKG-INFO` 파일을 감지하면 적절한 오류 메시지와 함께 종료됩니다. 이는 `PKG-INFO`와 `setup.py` 파일이 동기화되지 않아 발생하는 혼란을 방지하기 위함입니다.

`PKG-INFO` 파일 형식은 `rfc822.py` 모듈로 파싱할 수 있는 단일 RFC 822 헤더 집합입니다. 다음 섹션에 나열된 필드 이름이 헤더 이름으로 사용됩니다.

## 필드 (Fields)

이 섹션에서는 지원되는 각 메타데이터 필드의 이름과 의미를 명시합니다.

"(Multiple use)"로 표시된 필드는 단일 `PKG-INFO` 파일 내에서 여러 번 지정될 수 있습니다. 다른 필드는 `PKG-INFO` 파일 내에서 한 번만 나타날 수 있습니다. "(optional)"로 표시된 필드는 유효한 `PKG-INFO` 파일에 나타날 필요가 없습니다. 다른 모든 필드는 반드시 존재해야 합니다.

### Metadata-Version

파일 형식의 버전입니다. 현재 "1.0"과 "1.1"만이 유효한 값입니다.

**예시:**
```
Metadata-Version: 1.1
```


### Name

패키지의 이름입니다.

**예시:**
```
Name: BeagleVote
```


### Version

패키지의 버전 번호를 포함하는 문자열입니다. 이 필드는 `distutils.version` 모듈의 `Version` 클래스(StrictVersion 또는 LooseVersion) 중 하나로 파싱 가능해야 합니다.

**예시:**
```
Version: 1.0a2
```


### Platform (multiple use)

"Operating System" Trove 분류자(Classifier)에 나열되지 않은, 패키지가 지원하는 운영 체제를 요약하는 쉼표로 구분된 플랫폼 사양 목록입니다. 아래 "Classifier"를 참조하세요.

**예시:**
```
Platform: ObscureUnix, RareDOS
```


### Supported-Platform (multiple use)

`PKG-INFO` 파일을 포함하는 바이너리 배포판은 `Supported-Platform` 필드를 메타데이터에 사용하여 바이너리 패키지가 컴파일된 OS 및 CPU를 지정합니다. `Supported-Platform` 필드의 의미는 이 PEP에서 명시되지 않습니다.

**예시:**
```
Supported-Platform: RedHat 7.2
Supported-Platform: i386-win32-2791
```


### Summary

패키지가 무엇을 하는지에 대한 한 줄 요약입니다.

**예시:**
```
Summary: A module for collecting votes from beagles.
```


### Description (optional)

여러 단락으로 길어질 수 있는 패키지에 대한 더 긴 설명입니다. 메타데이터를 다루는 소프트웨어는 이 필드의 최대 크기를 가정해서는 안 되지만, 설명에 사용 설명서 전체를 포함해서는 안 됩니다.

이 필드의 내용은 reStructuredText 마크업을 사용하여 작성할 수 있습니다. 메타데이터와 함께 작동하는 프로그램의 경우 마크업 지원은 선택 사항이며, 프로그램은 필드의 내용을 있는 그대로 표시할 수도 있습니다. 이는 저자가 사용하는 마크업을 보수적으로 선택해야 함을 의미합니다.

**예시:**
```
Description: This module collects votes from beagles in order to determine their electoral wishes. Do *not* try to use this module with basset hounds; it makes them grumpy.
```


### Keywords (optional)

더 큰 카탈로그에서 패키지를 검색하는 데 도움이 되는 추가 키워드 목록입니다.

**예시:**
```
Keywords: dog puppy voting election
```


### Home-page (optional)

패키지의 홈페이지 URL을 포함하는 문자열입니다.

**예시:**
```
Home-page: http://www.example.com/~cschultz/bvote/
```


### Download-URL

이 버전의 패키지를 다운로드할 수 있는 URL을 포함하는 문자열입니다. (이는 URL이 “…/package-latest.tgz”와 같을 수 없으며, “../package-0.45.tgz”와 같아야 함을 의미합니다.)

### Author (optional)

최소한 저자의 이름을 포함하는 문자열입니다. 추가 연락처 정보를 제공할 수 있습니다.

**예시:**
```
Author: C. Schultz, Universal Features Syndicate, Los Angeles, CA <cschultz@peanuts.example.com>
```


### Author-email

저자의 이메일 주소를 포함하는 문자열입니다. RFC 822 'From:' 헤더의 유효한 형식으로 이름과 이메일 주소를 포함할 수 있습니다. 카탈로그 시스템이 이 필드의 이메일 부분을 저자를 나타내는 고유 키로 사용할 수 있으므로 선택 사항이 아닙니다. 카탈로그는 저자에게 GPG 키, 개인 홈페이지 및 저자에 대한 기타 추가 메타데이터를 저장할 수 있는 기능을 제공하고, 선택적으로 여러 이메일 주소를 동일한 사람과 연결할 수 있는 기능을 제공할 수 있습니다. 저자 관련 메타데이터 필드는 이 PEP에서 다루지 않습니다.

**예시:**
```
Author-email: "C. Schultz" <cschultz@example.com>
```


### License

라이선스가 "License" Trove 분류자(Classifier)에서 선택된 것이 아닐 경우, 패키지를 다루는 라이선스를 나타내는 텍스트입니다. 아래 "Classifier"를 참조하세요.

**예시:**
```
License: This software may only be obtained by sending the author a postcard, and then the user promises not to redistribute it.
```


### Classifier (multiple use)

각 항목은 패키지에 대한 단일 분류 값을 제공하는 문자열입니다. Classifier는 PEP 301에 설명되어 있습니다.

**예시:**
```
Classifier: Development Status :: 4 - Beta
Classifier: Environment :: Console (Text Based)
```


### Requires (multiple use)

각 항목은 이 패키지가 요구하는 다른 모듈 또는 패키지를 설명하는 문자열을 포함합니다.

요구 사항 문자열의 형식은 'import' 문과 함께 사용할 수 있는 모듈 또는 패키지 이름과 동일하며, 선택적으로 괄호 안에 버전 선언이 뒤따를 수 있습니다.

버전 선언은 쉼표로 구분된 조건부 연산자와 버전 번호의 시리즈입니다. 조건부 연산자는 "<", ">", "<=", ">=", "==", "!=" 중 하나여야 합니다. 버전 번호는 `distutils.version.StrictVersion` 클래스에서 허용하는 형식이어야 합니다: 두 개 또는 세 개의 점으로 구분된 숫자 구성 요소와 선택적으로 'a' 또는 'b' 문자 다음에 숫자로 구성된 "사전 릴리스(pre-release)" 태그가 붙습니다. 예시 버전 번호는 "1.0", "2.3a2", "1.3.99"입니다.

어떤 수의 조건부 연산자도 지정할 수 있습니다. 예를 들어, 문자열 ">1.0, !=1.3.4, <2.0"은 유효한 버전 선언입니다.

다음은 모두 가능한 요구 사항 문자열입니다: "rfc822", "zlib (>=1.1.4)", "zope".

어떤 문자열을 사용해야 하는지에 대한 정식 목록은 없으며, Python 커뮤니티가 자체 표준을 선택하도록 맡겨져 있습니다.

**예시:**
```
Requires: re
Requires: sys
Requires: zlib
Requires: xml.parsers.expat (>1.0)
Requires: psycopg
```


### Provides (multiple use)

각 항목은 이 패키지가 설치되면 제공할 패키지 또는 모듈을 설명하는 문자열을 포함합니다. 이러한 문자열은 `Requires` 필드에 사용된 것과 일치해야 합니다. 버전 선언을 제공할 수 있습니다 (비교 연산자 없음). 지정되지 않으면 패키지의 버전 번호가 암시됩니다.

**예시:**
```
Provides: xml
Provides: xml.utils
Provides: xml.utils.iso8601
Provides: xml.dom
Provides: xmltools (1.3)
```


### Obsoletes (multiple use)

각 항목은 이 패키지가 구식으로 만드는 (즉, 두 패키지가 동시에 설치되어서는 안 됨) 패키지 또는 모듈을 설명하는 문자열을 포함합니다. 버전 선언을 제공할 수 있습니다.

이 필드의 가장 일반적인 사용 사례는 패키지 이름이 변경되는 경우입니다. 예를 들어 Gorgon 2.3이 Torqued Python 1.0에 통합되는 경우입니다. Torqued Python을 설치하면 Gorgon 패키지가 제거되어야 합니다.

**예시:**
```
Obsoletes: Gorgon
```


## PEP 241과의 차이점 요약

*   `Metadata-Version`은 이제 1.1입니다.
*   PEP 301의 `Classifiers` 필드가 추가되었습니다.
*   `License` 및 `Platform` 파일은 이제 플랫폼 또는 라이선스를 적절한 Classifier 값으로 처리할 수 없는 경우에만 사용해야 합니다.
*   `Download-URL`, `Requires`, `Provides`, `Obsoletes` 필드가 추가되었습니다.

## 미해결 문제 (Open issues)

없습니다.

## 감사 (Acknowledgements)

없습니다.

## 참조 (References)

 reStructuredText <http://docutils.sourceforge.net/>

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.## PEP 314 – Python 소프트웨어 패키지용 메타데이터 1.1

### 목표
이 문서는 Python 패키지에 메타데이터를 추가하는 메커니즘을 설명합니다. 필드 이름, 그 의미 및 사용법에 대한 세부 사항을 포함합니다. 이 문서는 메타데이터 형식의 버전 1.1을 명시합니다. 버전 1.0은 PEP 241에 명시되어 있습니다.

**중요:** 이 PEP는 역사적인 문서입니다. 최신 규격인 "Core metadata specifications"는 PyPA specs 페이지에서 유지 관리되고 있습니다.

### 패키지에 메타데이터 포함하기

Distutils의 `sdist` 명령은 인자(arguments)에서 메타데이터 필드를 추출하여 생성된 zipfile 또는 tarball 내 파일에 기록합니다. 이 파일은 `PKG-INFO`로 명명되며 소스 배포판의 최상위 디렉토리(README, INSTALL 및 기타 파일이 일반적으로 위치하는 곳)에 배치됩니다.

개발자는 자신만의 `PKG-INFO` 파일을 제공해서는 안 됩니다. `sdist` 명령은 기존 `PKG-INFO` 파일을 감지하면 적절한 오류 메시지와 함께 종료됩니다. 이는 `PKG-INFO`와 `setup.py` 파일이 동기화되지 않아 발생하는 혼란을 방지하기 위함입니다.

`PKG-INFO` 파일 형식은 `rfc822.py` 모듈로 파싱할 수 있는 단일 RFC 822 헤더 집합입니다. 다음 섹션에 나열된 필드 이름이 헤더 이름으로 사용됩니다.

### 필드 (Fields)

이 섹션에서는 지원되는 각 메타데이터 필드의 이름과 의미를 명시합니다.

"(Multiple use)"로 표시된 필드는 단일 `PKG-INFO` 파일 내에서 여러 번 지정될 수 있습니다. 다른 필드는 `PKG-INFO` 파일 내에서 한 번만 나타날 수 있습니다. "(optional)"로 표시된 필드는 유효한 `PKG-INFO` 파일에 나타날 필요가 없습니다. 다른 모든 필드는 반드시 존재해야 합니다.

#### Metadata-Version

파일 형식의 버전입니다. 현재 "1.0"과 "1.1"만이 유효한 값입니다.

**예시:**
```
Metadata-Version: 1.1
```


#### Name

패키지의 이름입니다.

**예시:**
```
Name: BeagleVote
```


#### Version

패키지의 버전 번호를 포함하는 문자열입니다. 이 필드는 `distutils.version` 모듈의 `Version` 클래스(`StrictVersion` 또는 `LooseVersion`) 중 하나로 파싱 가능해야 합니다.

**예시:**
```
Version: 1.0a2
```


#### Platform (multiple use)

"Operating System" Trove 분류자(Classifier)에 나열되지 않은, 패키지가 지원하는 운영 체제를 요약하는 쉼표로 구분된 플랫폼 사양 목록입니다. 아래 "Classifier"를 참조하세요.

**예시:**
```
Platform: ObscureUnix, RareDOS
```


#### Supported-Platform (multiple use)

`PKG-INFO` 파일을 포함하는 바이너리 배포판은 `Supported-Platform` 필드를 메타데이터에 사용하여 바이너리 패키지가 컴파일된 OS 및 CPU를 지정합니다. `Supported-Platform` 필드의 의미는 이 PEP에서 명시되지 않습니다.

**예시:**
```
Supported-Platform: RedHat 7.2
Supported-Platform: i386-win32-2791
```


#### Summary

패키지가 무엇을 하는지에 대한 한 줄 요약입니다.

**예시:**
```
Summary: A module for collecting votes from beagles.
```


#### Description (optional)

여러 단락으로 길어질 수 있는 패키지에 대한 더 긴 설명입니다. 메타데이터를 다루는 소프트웨어는 이 필드의 최대 크기를 가정해서는 안 되지만, 설명에 사용 설명서 전체를 포함해서는 안 됩니다.

이 필드의 내용은 reStructuredText 마크업을 사용하여 작성할 수 있습니다. 메타데이터와 함께 작동하는 프로그램의 경우 마크업 지원은 선택 사항이며, 프로그램은 필드의 내용을 있는 그대로 표시할 수도 있습니다. 이는 저자가 사용하는 마크업을 보수적으로 선택해야 함을 의미합니다.

**예시:**
```
Description: This module collects votes from beagles in order to determine their electoral wishes. Do *not* try to use this module with basset hounds; it makes them grumpy.
```


#### Keywords (optional)

더 큰 카탈로그에서 패키지를 검색하는 데 도움이 되는 추가 키워드 목록입니다.

**예시:**
```
Keywords: dog puppy voting election
```


#### Home-page (optional)

패키지의 홈페이지 URL을 포함하는 문자열입니다.

**예시:**
```
Home-page: http://www.example.com/~cschultz/bvote/
```


#### Download-URL

이 버전의 패키지를 다운로드할 수 있는 URL을 포함하는 문자열입니다. (이는 URL이 “…/package-latest.tgz”와 같을 수 없으며, “../package-0.45.tgz”와 같아야 함을 의미합니다.)

#### Author (optional)

최소한 저자의 이름을 포함하는 문자열입니다. 추가 연락처 정보를 제공할 수 있습니다.

**예시:**
```
Author: C. Schultz, Universal Features Syndicate, Los Angeles, CA <cschultz@peanuts.example.com>
```


#### Author-email

저자의 이메일 주소를 포함하는 문자열입니다. RFC 822 'From:' 헤더의 유효한 형식으로 이름과 이메일 주소를 포함할 수 있습니다. 카탈로그 시스템이 이 필드의 이메일 부분을 저자를 나타내는 고유 키로 사용할 수 있으므로 선택 사항이 아닙니다. 카탈로그는 저자에게 GPG 키, 개인 홈페이지 및 저자에 대한 기타 추가 메타데이터를 저장할 수 있는 기능을 제공하고, 선택적으로 여러 이메일 주소를 동일한 사람과 연결할 수 있는 기능을 제공할 수 있습니다. 저자 관련 메타데이터 필드는 이 PEP에서 다루지 않습니다.

**예시:**
```
Author-email: "C. Schultz" <cschultz@example.com>
```


#### License

라이선스가 "License" Trove 분류자(Classifier)에서 선택된 것이 아닐 경우, 패키지를 다루는 라이선스를 나타내는 텍스트입니다. 아래 "Classifier"를 참조하세요.

**예시:**
```
License: This software may only be obtained by sending the author a postcard, and then the user promises not to redistribute it.
```


#### Classifier (multiple use)

각 항목은 패키지에 대한 단일 분류 값을 제공하는 문자열입니다. Classifier는 PEP 301에 설명되어 있습니다.

**예시:**
```
Classifier: Development Status :: 4 - Beta
Classifier: Environment :: Console (Text Based)
```


#### Requires (multiple use)

각 항목은 이 패키지가 요구하는 다른 모듈 또는 패키지를 설명하는 문자열을 포함합니다.

요구 사항 문자열의 형식은 'import' 문과 함께 사용할 수 있는 모듈 또는 패키지 이름과 동일하며, 선택적으로 괄호 안에 버전 선언이 뒤따를 수 있습니다.

버전 선언은 쉼표로 구분된 조건부 연산자와 버전 번호의 시리즈입니다. 조건부 연산자는 "<", ">", "<=", ">=", "==", "!=" 중 하나여야 합니다. 버전 번호는 `distutils.version.StrictVersion` 클래스에서 허용하는 형식이어야 합니다: 두 개 또는 세 개의 점으로 구분된 숫자 구성 요소와 선택적으로 'a' 또는 'b' 문자 다음에 숫자로 구성된 "사전 릴리스(pre-release)" 태그가 붙습니다. 예시 버전 번호는 "1.0", "2.3a2", "1.3.99"입니다.

어떤 수의 조건부 연산자도 지정할 수 있습니다. 예를 들어, 문자열 ">1.0, !=1.3.4, <2.0"은 유효한 버전 선언입니다.

어떤 문자열을 사용해야 하는지에 대한 정식 목록은 없으며, Python 커뮤니티가 자체 표준을 선택하도록 맡겨져 있습니다.

**예시:**
```
Requires: re
Requires: sys
Requires: zlib
Requires: xml.parsers.expat (>1.0)
Requires: psycopg
```


#### Provides (multiple use)

각 항목은 이 패키지가 설치되면 제공할 패키지 또는 모듈을 설명하는 문자열을 포함합니다. 이러한 문자열은 `Requires` 필드에 사용된 것과 일치해야 합니다. 버전 선언을 제공할 수 있습니다 (비교 연산자 없음). 지정되지 않으면 패키지의 버전 번호가 암시됩니다.

**예시:**
```
Provides: xml
Provides: xml.utils
Provides: xml.utils.iso8601
Provides: xml.dom
Provides: xmltools (1.3)
```


#### Obsoletes (multiple use)

각 항목은 이 패키지가 구식으로 만드는 (즉, 두 패키지가 동시에 설치되어서는 안 됨) 패키지 또는 모듈을 설명하는 문자열을 포함합니다. 버전 선언을 제공할 수 있습니다.

이 필드의 가장 일반적인 사용 사례는 패키지 이름이 변경되는 경우입니다. 예를 들어 Gorgon 2.3이 Torqued Python 1.0에 통합되는 경우입니다. Torqued Python을 설치하면 Gorgon 패키지가 제거되어야 합니다.

**예시:**
```
Obsoletes: Gorgon
```


### PEP 241과의 차이점 요약

*   `Metadata-Version`은 이제 1.1입니다.
*   PEP 301의 `Classifiers` 필드가 추가되었습니다.
*   `License` 및 `Platform` 필드는 이제 플랫폼 또는 라이선스를 적절한 Classifier 값으로 처리할 수 없는 경우에만 사용해야 합니다.
*   `Download-URL`, `Requires`, `Provides`, `Obsoletes` 필드가 추가되었습니다.

### 미해결 문제 (Open issues)

없습니다.

### 감사 (Acknowledgements)

없습니다.

### 참조 (References)

 reStructuredText <http://docutils.sourceforge.net/>

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.