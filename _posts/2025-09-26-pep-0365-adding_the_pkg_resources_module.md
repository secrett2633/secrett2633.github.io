---
title: "[Rejected] PEP 365 - Adding the pkg_resources module"
excerpt: "Python Enhancement Proposal 365: 'Adding the pkg_resources module'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/365/
toc: true
toc_sticky: true
date: 2025-09-26 19:09:15+0900
last_modified_at: 2025-09-26 19:09:15+0900
published: true
---
> **원문 링크:** [PEP 365 - Adding the pkg_resources module](https://peps.python.org/pep-0365/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 30-Apr-2007


# PEP 365 – `pkg_resources` 모듈 추가

*   **작성자:** Phillip J. Eby
*   **상태:** Rejected (거절됨)
*   **유형:** Standards Track
*   **주제:** Packaging (패키징)
*   **생성일:** 2007년 4월 30일

## 개요 (Abstract)

이 PEP는 개선된 버전의 `pkg_resources` 모듈을 Python 표준 라이브러리에 추가할 것을 제안합니다.

`pkg_resources`는 Python 패키지/버전 의존성을 찾고 관리하며, `.egg` 압축 파일 내부에 포함된 파일 및 리소스에 접근하는 데 사용되는 모듈입니다. 현재 `pkg_resources`는 전체 `setuptools` 배포판을 설치해야만 사용할 수 있지만, `setuptools`의 다른 부분에 의존하지 않습니다. 사실상 `Python Eggs`의 전체 런타임 지원 라이브러리 역할을 하며, 독립적으로 유용하게 사용될 수 있습니다.

또한, 한 가지 기능이 추가된다면 이 모듈은 `setuptools`, `workingenv`, `zc.buildout`를 포함한 여러 Python 패키지 관리 도구의 쉬운 부트스트랩(bootstrap) 설치를 지원할 수 있을 것입니다.

## 제안 (Proposal)

이 PEP는 `setuptools` 전체를 표준 라이브러리에 포함시키는 대신, `pkg_resources`만을 Python 2.6 및 3.0의 표준 라이브러리에 추가할 것을 제안합니다. `pkg_resources`는 지난 12개월 동안 사실상 새로운 기능이 추가되지 않아 `setuptools`의 다른 부분보다 훨씬 안정적입니다.

그러나 이 PEP는 `pkg_resources`가 표준 라이브러리에 추가되기 전에 새로운 기능이 추가될 것을 제안합니다. 구체적으로, 다음과 같은 방식으로 `PyPI`에서 `SomePackage` 버전 1.2를 다운로드하고 설치하도록 요청할 수 있어야 합니다:

```bash
python -m pkg_resources SomePackage==1.2
```

이 기능은 `easy_install`을 대체하는 것이 아닙니다. 대신, `PyPI XML-RPC API`를 통해 다운로드 가능한 순수 Python `.egg` 파일을 `SomePackage`가 가지고 있어야 하며, 이 egg 파일들은 `$PYTHON_EGG_CACHE` 디렉터리에 배치되어 기본적으로 `import`될 수 없습니다. (또한 스크립트도 설치되지 않습니다.) 하지만, 다운로드된 egg에 설치 부트스트랩 코드가 포함되어 있다면 실행될 기회가 주어집니다.

이러한 제약 사항들은 코드를 매우 단순하게 유지하면서도 `setuptools`, `workingenv`, `zc.buildout`와 같은 패키지 관리 도구를 사용자들이 명령줄에 도구 이름을 제공하는 것만으로 다운로드할 수 있도록 충분히 강력하게 지원할 수 있게 합니다.

## 도입 배경 (Rationale)

많은 사용자들이 `setuptools`를 표준 라이브러리에 포함하여 번거로운 부트스트래핑 과정을 줄여달라고 요청했습니다. 그러나 대부분의 부트스트래핑 복잡성은 `setuptools`가 이미 설치되어 있지 않으면 `setuptools`로 설치된 코드가 `pkg_resources` 런타임 모듈을 사용할 수 없다는 사실에서 비롯됩니다. 따라서 `setuptools`를 설치하려면 (어떤 의미에서는) `setuptools`가 이미 설치되어 있어야 합니다.

`workingenv` 및 `zc.buildout`와 같은 다른 Python 패키지 관리 도구들도 유사한 부트스트래핑 문제를 가지고 있습니다. 이들 모두 `setuptools`를 사용하지만, 사용자에게 "원스텝(one-step) 설치"에 가까운 것을 제공하고자 합니다. `pkg_resources`가 이미 존재하고 `PyPI`에서 사전 패키지된 egg를 다운로드할 수 있다면, 이러한 도구 및 향후 등장할 유사한 도구들을 위한 부트스트랩 유틸리티를 만드는 복잡성이 크게 줄어듭니다.

(이는 또한 `setuptools`를 사용하여 egg를 빌드하는 것과 달리, 단순히 egg를 사용하기 위해 `setuptools`를 설치할 필요가 없음을 의미할 것입니다.)

마지막으로, `setuptools` 또는 다른 패키징 도구를 통해 빌드된 egg에 대한 접근을 제공하는 것 외에도, Python 2.5부터 `distutils`가 `sys.path`에 이미 어떤 배포판이 있는지 식별하기 위해 `pkg_resources`가 읽을 수 있는 패키지 메타데이터(일명 PKG-INFO) 파일을 설치한다는 점에 주목해야 합니다. `RPM`과 같은 시스템 패키지 도구를 사용하여 Python 패키지가 설치되는 환경에서, `pkg_resources` 모듈은 패키지가 `setuptools` 대신 `distutils`를 통해 설치되었더라도 어떤 버전의 어떤 패키지가 설치되어 있는지 감지하는 API를 제공합니다.

## 구현 및 문서 (Implementation and Documentation)

`pkg_resources` 구현은 Python SVN 저장소의 `/sandbox/trunk/setuptools/` 경로에서 관리됩니다. `pkg_resources.py` 및 `pkg_resources.txt`를 참조하세요. `pkg_resources`가 지원하는 egg 형식에 대한 문서는 `doc/formats.txt`에서 찾을 수 있습니다. 이러한 문서의 HTML 버전은 다음 링크에서 확인할 수 있습니다:

*   http://peak.telecommunity.com/DevCenter/PkgResources
*   http://peak.telecommunity.com/DevCenter/EggFormats

(이 HTML 버전은 `setuptools 0.6`용이며, Subversion trunk의 `.txt` 버전에서 발견되는 모든 변경 사항을 반영하지 않을 수 있습니다.)

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.