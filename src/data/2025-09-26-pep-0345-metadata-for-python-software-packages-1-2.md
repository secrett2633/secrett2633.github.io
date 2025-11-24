---
title: "[Superseded] PEP 345 - Metadata for Python Software Packages 1.2"
excerpt: "Python Enhancement Proposal 345: 'Metadata for Python Software Packages 1.2'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/345/
toc: true
toc_sticky: true
date: 2025-09-26 18:54:36+0900
last_modified_at: 2025-09-26 18:54:36+0900
published: true
---
> **원문 링크:** [PEP 345 - Metadata for Python Software Packages 1.2](https://peps.python.org/pep-0345/)
>
> **상태:** Superseded | **유형:** Standards Track | **작성일:** 28-Apr-2005


# PEP 345 – Python 소프트웨어 패키지용 메타데이터 1.2

이 문서는 Python 배포판에 메타데이터를 추가하는 메커니즘을 설명합니다. 필드 이름, 의미 및 사용법에 대한 세부 정보를 포함합니다.

**중요:** 이 PEP는 역사적인 문서입니다. 최신 규격인 `Core metadata specifications`는 PyPA specs 페이지에서 유지 관리됩니다.

## 초록 (Abstract)

이 PEP는 Python 배포판에 메타데이터를 추가하는 메커니즘을 설명합니다. 여기에는 필드 이름과 해당 의미 및 사용법에 대한 구체적인 내용이 포함됩니다.

이 문서는 메타데이터 형식의 버전 1.2를 명시합니다. 버전 1.0은 [PEP 241](https://peps.python.org/pep-0241/)에, 버전 1.1은 [PEP 314](https://peps.python.org/pep-0314/)에 명시되어 있습니다.

메타데이터 형식 버전 1.2는 타사 Python 소프트웨어 패키징을 더 쉽게 만들도록 설계된 여러 선택적 필드를 추가합니다. 이 필드들은 "Requires-Python", "Requires-External", "Requires-Dist", "Provides-Dist", "Obsoletes-Dist"입니다. 이 버전은 또한 "Platform" 필드를 변경합니다. "Maintainer", "Maintainer-email", "Project-URL"이라는 세 가지 새로운 필드도 추가되었습니다. 마지막으로, 이 새 버전은 `environment markers`도 추가합니다.

## 필드 (Fields)

이 섹션은 지원되는 각 메타데이터 필드의 이름과 의미를 명시합니다.

"(Multiple use)"로 표시된 필드는 단일 `PKG-INFO` 파일에서 여러 번 지정될 수 있습니다. 다른 필드는 `PKG-INFO` 파일에서 한 번만 나타날 수 있습니다. "(optional)"로 표시된 필드는 유효한 `PKG-INFO` 파일에 나타날 필요가 없으며, 다른 모든 필드는 존재해야 합니다.

*   **`Metadata-Version`**
    *   파일 형식의 버전; "1.2"가 유일하게 유효한 값입니다.
    *   예시: `Metadata-Version: 1.2`

*   **`Name`**
    *   배포판의 이름입니다.
    *   예시: `Name: BeagleVote`

*   **`Version`**
    *   배포판의 버전 번호를 포함하는 문자열입니다. 이 필드는 [PEP 440](https://peps.python.org/pep-0440/)에 명시된 형식을 따라야 합니다.
    *   예시: `Version: 1.0a2`

*   **`Platform`** (다중 사용)
    *   "Operating System" Trove 분류기에 나열되지 않은, 배포판이 지원하는 운영 체제를 설명하는 Platform 규격입니다. 아래의 "Classifier"를 참조하십시오.
    *   예시:
        ```
        Platform: ObscureUnix
        Platform: RareDOS
        ```

*   **`Supported-Platform`** (다중 사용)
    *   `PKG-INFO` 파일을 포함하는 바이너리 배포판은 메타데이터의 `Supported-Platform` 필드를 사용하여 바이너리 배포판이 컴파일된 OS 및 CPU를 지정합니다. `Supported-Platform` 필드의 의미는 이 PEP에서 명시되지 않습니다.
    *   예시:
        ```
        Supported-Platform: RedHat 7.2
        Supported-Platform: i386-win32-2791
        ```

*   **`Summary`**
    *   배포판이 하는 일에 대한 한 줄 요약입니다.
    *   예시: `Summary: A module for collecting votes from beagles.`

*   **`Description`** (선택 사항)
    *   여러 단락으로 구성될 수 있는 배포판에 대한 더 긴 설명입니다. 메타데이터를 다루는 소프트웨어는 이 필드의 최대 크기를 가정해서는 안 되지만, 설명에 사용 설명서를 포함해서는 안 됩니다.
    *   이 필드의 내용은 reStructuredText 마크업을 사용하여 작성할 수 있습니다. 메타데이터와 함께 작동하는 프로그램의 경우 마크업 지원은 선택 사항입니다. 프로그램은 필드의 내용을 있는 그대로 표시할 수도 있습니다. 이는 저자가 사용하는 마크업을 보수적으로 사용해야 함을 의미합니다.
    *   RFC 822 형식에 대한 빈 줄과 들여쓰기된 줄을 지원하기 위해, 모든 CRLF 문자는 7개의 공백과 파이프 ("|") 문자로 접미사를 붙여야 합니다. 결과적으로 `Description` 필드는 RFC 822#section-3.1.1 파서로 해석할 수 있는 `folded field`로 인코딩됩니다.
    *   예시:
        ```
        Description: This project provides powerful math functions |For example, you can use ``sum()`` to sum numbers: | |Example:: | | >>> sum(1, 2) | 3 |
        ```
    *   이 인코딩은 필드가 RFC 822 리더를 사용하여 펼쳐질 때, CRLF 뒤에 7개의 공백과 파이프 문자가 오는 모든 발생이 단일 CRLF로 대체되어야 함을 의미합니다.

*   **`Keywords`** (선택 사항)
    *   더 큰 카탈로그에서 배포판을 검색하는 데 도움이 되는 추가 키워드 목록입니다.
    *   예시: `Keywords: dog puppy voting election`

*   **`Home-page`** (선택 사항)
    *   배포판의 홈페이지 URL을 포함하는 문자열입니다.
    *   예시: `Home-page: http://www.example.com/~cschultz/bvote/`

*   **`Download-URL`**
    *   이 버전의 배포판을 다운로드할 수 있는 URL을 포함하는 문자열입니다. (이는 URL이 “…/BeagleVote-latest.tgz”와 같을 수 없으며, 대신 “…/BeagleVote-0.45.tgz”와 같아야 함을 의미합니다.)

*   **`Author`** (선택 사항)
    *   최소한 저자의 이름을 포함하는 문자열입니다. 추가 연락처 정보를 제공할 수 있습니다.
    *   예시: `Author: C. Schultz, Universal Features Syndicate, Los Angeles, CA <cschultz@peanuts.example.com>`

*   **`Author-email`** (선택 사항)
    *   저자의 이메일 주소를 포함하는 문자열입니다. RFC 822 `From:` 헤더의 유효한 형식으로 이름과 이메일 주소를 포함할 수 있습니다.
    *   예시: `Author-email: "C. Schultz" <cschultz@example.com>`

*   **`Maintainer`** (선택 사항)
    *   최소한 유지보수 담당자의 이름을 포함하는 문자열입니다. 추가 연락처 정보를 제공할 수 있습니다.
    *   이 필드는 프로젝트가 원저자가 아닌 다른 사람에 의해 유지 관리될 때 사용하기 위한 것입니다. `Author` 필드와 동일하다면 생략해야 합니다.
    *   예시: `Maintainer: C. Schultz, Universal Features Syndicate, Los Angeles, CA <cschultz@peanuts.example.com>`

*   **`Maintainer-email`** (선택 사항)
    *   유지보수 담당자의 이메일 주소를 포함하는 문자열입니다. RFC 822 `From:` 헤더의 유효한 형식으로 이름과 이메일 주소를 포함할 수 있습니다.
    *   이 필드는 프로젝트가 원저자가 아닌 다른 사람에 의해 유지 관리될 때 사용하기 위한 것입니다. `Author-email` 필드와 동일하다면 생략해야 합니다.
    *   예시: `Maintainer-email: "C. Schultz" <cschultz@example.com>`

*   **`License`** (선택 사항)
    *   라이선스가 "License" Trove 분류기에서 선택된 것이 아닌 경우, 배포판을 포함하는 라이선스를 나타내는 텍스트입니다. 아래의 "Classifier"를 참조하십시오. 이 필드는 `Classifier` 필드를 통해 이름이 지정된 라이선스의 특정 버전을 지정하거나, 해당 라이선스의 변형 또는 예외를 나타내는 데 사용될 수도 있습니다.
    *   예시:
        ```
        License: This software may only be obtained by sending the author a postcard, and then the user promises not to redistribute it.
        License: GPL version 3, excluding DRM provisions
        ```

*   **`Classifier`** (다중 사용)
    *   각 항목은 배포판에 대한 단일 분류 값을 제공하는 문자열입니다. 분류기는 [PEP 301](https://peps.python.org/pep-0301/)에 설명되어 있습니다.
    *   예시:
        ```
        Classifier: Development Status :: 4 - Beta
        Classifier: Environment :: Console (Text Based)
        ```

*   **`Requires-Dist`** (다중 사용)
    *   각 항목은 이 배포판에서 필요한 다른 distutils 프로젝트의 이름을 포함하는 문자열입니다.
    *   요구 사항 문자열의 형식은 distutils 프로젝트 이름(예: `Name:` 필드에 있는 것)과 동일하며, 선택적으로 괄호 안에 버전 선언이 따릅니다.
    *   distutils 프로젝트 이름은 Python Package Index에서 찾을 수 있는 이름과 일치해야 합니다.
    *   버전 선언은 `Version Specifiers`에 설명된 규칙을 따라야 합니다.
    *   예시:
        ```
        Requires-Dist: pkginfo
        Requires-Dist: PasteDeploy
        Requires-Dist: zope.interface (>3.5.0)
        ```

*   **`Provides-Dist`** (다중 사용)
    *   각 항목은 이 배포판에 포함된 Distutils 프로젝트의 이름을 포함하는 문자열입니다. 이 필드에는 `Name` 필드에서 식별된 프로젝트가 포함되어야 하며, 그 뒤에 버전이 따릅니다: `Name (Version)`.
    *   배포판은 추가 이름을 제공할 수 있습니다. 예를 들어, 여러 프로젝트가 함께 묶여 있음을 나타내기 위함입니다. 예를 들어, ZODB 프로젝트의 소스 배포판은 역사적으로 `transaction` 프로젝트를 포함했는데, 이는 이제 별도의 배포판으로 제공됩니다. 이러한 소스 배포판을 설치하면 ZODB와 `transaction`에 대한 요구 사항을 모두 충족합니다.
    *   배포판은 또한 "가상" 프로젝트 이름을 제공할 수 있습니다. 이는 별도로 배포되는 프로젝트에 해당하지 않습니다. 이러한 이름은 여러 프로젝트 중 하나가 제공할 수 있는 추상적인 기능을 나타내는 데 사용될 수 있습니다. 예를 들어, 여러 프로젝트가 주어진 ORM에서 사용할 RDBMS 바인딩을 제공할 수 있습니다. 각 프로젝트는 `ORM-bindings`를 제공한다고 선언하여 다른 프로젝트가 이들 중 최대 하나만 설치되어 있음에 의존할 수 있도록 합니다.
    *   버전 선언이 제공될 수 있으며 `Version Specifiers`에 설명된 규칙을 따라야 합니다. 지정되지 않은 경우 배포판의 버전 번호가 암시됩니다.
    *   예시:
        ```
        Provides-Dist: OtherProject
        Provides-Dist: AnotherProject (3.4)
        Provides-Dist: virtual_package
        ```

*   **`Obsoletes-Dist`** (다중 사용)
    *   각 항목은 이 배포판이 더 이상 사용되지 않게 만드는 distutils 프로젝트의 배포판을 설명하는 문자열입니다. 즉, 두 프로젝트는 동시에 설치되어서는 안 됩니다.
    *   버전 선언을 제공할 수 있습니다. 버전 번호는 `Version Specifiers`에 명시된 형식을 따라야 합니다.
    *   이 필드의 가장 일반적인 사용 사례는 프로젝트 이름이 변경되는 경우입니다. 예를 들어, Gorgon 2.3이 Torqued Python 1.0에 통합되는 경우입니다. Torqued Python을 설치하면 Gorgon 배포판이 제거되어야 합니다.
    *   예시:
        ```
        Obsoletes-Dist: Gorgon
        Obsoletes-Dist: OtherProject (<3.0)
        ```

*   **`Requires-Python`**
    *   이 필드는 배포판이 호환됨을 보장하는 Python 버전을 지정합니다.
    *   버전 번호는 `Version Specifiers`에 명시된 형식을 따라야 합니다.
    *   예시:
        ```
        Requires-Python: 2.5
        Requires-Python: >2.1
        Requires-Python: >=2.3.4
        Requires-Python: >=2.5,<2.7
        ```

*   **`Requires-External`** (다중 사용)
    *   각 항목은 배포판이 사용될 시스템의 일부 종속성을 설명하는 문자열입니다. 이 필드는 다운스트림 프로젝트 유지보수 담당자에게 힌트를 제공하기 위한 것이며, distutils 배포판에 의미 있는 의미는 없습니다.
    *   요구 사항 문자열의 형식은 외부 종속성의 이름이며, 선택적으로 괄호 안에 버전 선언이 따릅니다.
    *   Python이 아닌 소프트웨어 릴리스를 참조하므로, 이 필드의 버전 번호는 [PEP 440](https://peps.python.org/pep-0440/)에 명시된 형식을 따를 필요가 없습니다. 외부 종속성이 사용하는 버전 체계와 일치해야 합니다.
    *   사용되는 문자열에 대한 특별한 규칙은 없습니다.
    *   예시:
        ```
        Requires-External: C
        Requires-External: libpng (>=1.5)
        ```

*   **`Project-URL`** (다중 사용)
    *   프로젝트의 추가 URL과 레이블을 쉼표로 구분하여 포함하는 문자열입니다. "Home-page" 필드 외에 메타데이터에 나열할 다른 URL이 있을 때 사용해야 합니다.
    *   예시:
        ```
        Project-URL: Bug Tracker, https://github.com/pypa/setuptools/issues
        Project-URL: Documentation, https://setuptools.readthedocs.io/
        Project-URL: Funding, https://donate.pypi.org
        ```
    *   레이블은 최대 32자 길이의 자유 텍스트입니다. PyPI에 업로드된 배포판은 이러한 추가 항목이 랜딩 페이지의 "Project links" 섹션 아래에 표시됩니다.

## 버전 지정자 (Version Specifiers)

버전 지정자는 쉼표로 구분된 일련의 조건부 연산자와 버전 번호입니다. 조건부 연산자는 “<”, “>”, “<=”, “>=”, “==”, “!=” 중 하나여야 합니다.

어떤 수의 조건부 연산자도 지정할 수 있습니다. 예를 들어, “>1.0, !=1.3.4, <2.0” 문자열은 유효한 버전 선언입니다. 쉼표 (“,”)는 `and` 연산자와 동일합니다.

각 버전 번호는 [PEP 440](https://peps.python.org/pep-0440/)에 명시된 형식을 따라야 합니다.

버전이 제공될 때, 항상 동일한 값으로 시작하는 모든 버전을 포함합니다. 예를 들어, Python의 “2.5” 버전은 “2.5.2” 또는 “2.5.3”과 같은 버전을 포함합니다. 이 경우 사전 및 사후 릴리스는 제외됩니다. 따라서 우리 예시에서 “2.5”가 사용될 때 “2.5a1”과 같은 버전은 포함되지 않습니다. 범위의 첫 번째 버전이 필요한 경우 명시적으로 지정해야 합니다. 우리 예시에서는 “2.5.0”이 됩니다.

일부 프로젝트는 “2.5.x” 시리즈의 첫 번째 릴리스에 대해 “.0” 접미사를 생략할 수 있습니다:

```
2.5
2.5.1
2.5.2
등
```

이 경우, 전체 범위를 나타내는 “2.5” 표기법과의 혼동을 피하기 위해 “2.5.0”을 명시적으로 사용해야 합니다. 이 문제를 완전히 피하기 위해 시리즈에 대해 동일한 길이의 체계를 사용하는 것이 권장됩니다.

몇 가지 예시:

*   `Requires-Dist: zope.interface (3.1)`: 3.1로 시작하는 모든 버전 (사후 또는 사전 릴리스 제외).
*   `Requires-Dist: zope.interface (3.1.0)`: 3.1.0으로 시작하는 모든 버전 (사후 또는 사전 릴리스 제외). 특정 프로젝트가 3자리 이상을 사용하지 않으므로, 이는 "오직 3.1.0 릴리스만"을 의미하기도 합니다.
*   `Requires-Python: 3`: 어떤 Python 3 버전이든 (사후 또는 사전 릴리스 제외).
*   `Requires-Python: >=2.6,<3`: Python 2.6 또는 2.7의 모든 버전 (2.6의 사후 릴리스, 2.7의 사전 및 사후 릴리스 포함). Python 3의 사전 릴리스는 제외합니다.
*   `Requires-Python: 2.6.2`: “>=2.6.2,<2.6.3”와 동일합니다. 따라서 이는 Python 2.6.2만 포함합니다. 물론, Python이 4자리로 번호가 매겨졌다면 2.6.2 시리즈의 모든 버전을 포함했을 것입니다.
*   `Requires-Python: 2.5.0`: “>=2.5.0,<2.5.1”와 동일합니다.
*   `Requires-Dist: zope.interface (3.1,!=3.1.3)`: 3.1로 시작하는 모든 버전 (3.1의 사후 또는 사전 릴리스 제외, 그리고 “3.1.3”으로 시작하는 모든 버전 제외). 이 특정 프로젝트의 경우, 이는 “3.1 시리즈의 모든 버전이지만 3.1.3은 제외”를 의미합니다. 이는 “>=3.1,!=3.1.3,<3.2”와 동일합니다.

## 환경 마커 (Environment markers)

`environment marker`는 세미콜론 (`;`) 뒤에 필드 끝에 추가될 수 있는 마커로, 실행 환경에 대한 조건을 추가합니다.

다음은 이러한 마커를 사용하는 필드의 몇 가지 예시입니다:

```
Requires-Dist: pywin32 (>1.0); sys.platform == 'win32'
Obsoletes-Dist: pywin31; sys.platform == 'win32'
Requires-Dist: foo (1,!=1.3); platform.machine == 'i386'
Requires-Dist: bar; python_version == '2.4' or python_version == '2.5'
Requires-External: libxslt; 'linux' in sys.platform
```

이 뒤에 있는 마이크로 언어는 가능한 한 간단합니다. `==` 및 `in` 연산자(및 그 반대)를 사용하여 문자열만 비교하며, 표현식을 결합할 수 있는 기능을 제공합니다. 이는 Python 개발자가 아닌 사람들도 쉽게 이해할 수 있도록 합니다.

의사 문법은 다음과 같습니다:

`EXPR [in|==|!=|not in] EXPR [or|and] ...`

여기서 `EXPR`은 다음 중 하나에 속합니다:

*   `python_version = '%s.%s' % (sys.version_info[0], sys.version_info[1])`
*   `python_full_version = sys.version.split()[0]`
*   `os.name = os.name`
*   `sys.platform = sys.platform`
*   `platform.version = platform.version()`
*   `platform.machine = platform.machine()`
*   `platform.python_implementation = platform.python_implementation()`
*   `'2.4'` 또는 `'win32'`와 같은 자유 문자열

`in`은 문자열로 제한되며, 이는 오른쪽에서 튜플이나 리스트와 같은 다른 시퀀스를 사용할 수 없음을 의미합니다.

이 마커의 이점을 받는 필드는 다음과 같습니다:

*   `Requires-External`
*   `Requires-Dist`
*   `Provides-Dist`
*   `Obsoletes-Dist`
*   `Classifier`

## PEP 314와의 차이점 요약

*   `Metadata-Version`은 이제 1.2입니다.
*   `environment markers`가 추가되었습니다.
*   변경 사항이 있는 필드:
    *   `Platform` (구문 변경)
    *   `Author-email` (선택적 필드로 변경)
*   추가된 필드:
    *   `Maintainer`
    *   `Maintainer-email`
    *   `Requires-Python`
    *   `Requires-External`
    *   `Requires-Dist`
    *   `Provides-Dist`
    *   `Obsoletes-Dist`
    *   `Project-URL`
*   더 이상 사용되지 않는 필드:
    *   `Requires` (`Requires-Dist`로 대체)
    *   `Provides` (`Provides-Dist`로 대체)
    *   `Obsoletes` (`Obsoletes-Dist`로 대체)

## 참조 (References)

이 문서는 메타데이터 형식의 버전 1.2를 명시합니다. 버전 1.0은 [PEP 241](https://peps.python.org/pep-0241/)에, 버전 1.1은 [PEP 314](https://peps.python.org/pep-0314/)에 명시되어 있습니다.

 reStructuredText 마크업: <http://docutils.sourceforge.net/>

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

## 감사 (Acknowledgements)

Fred Drake, Anthony Baxter, Matthias Klose는 이 PEP에 제시된 아이디어에 기여했습니다.

Tres Seaver, Jim Fulton, Marc-André Lemburg, Martin von Löwis, Tarek Ziadé, David Lyon 및 Distutils-SIG의 다른 사람들은 새롭게 업데이트된 버전에 기여했습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.