---
title: "[Withdrawn] PEP 459 - Standard Metadata Extensions for Python Software Packages"
excerpt: "Python Enhancement Proposal 459: 'Standard Metadata Extensions for Python Software Packages'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/459/
toc: true
toc_sticky: true
date: 2025-09-26 22:08:18+0900
last_modified_at: 2025-09-26 22:08:18+0900
published: true
---
> **원문 링크:** [PEP 459 - Standard Metadata Extensions for Python Software Packages](https://peps.python.org/pep-0459/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 11-Nov-2013


# PEP 459 – Python 소프트웨어 패키지를 위한 표준 메타데이터 확장

*   **작성자:** Alyssa Coghlan
*   **BDFL-Delegate:** Alyssa Coghlan
*   **논의처:** Distutils-SIG list
*   **상태:** 철회됨 (Withdrawn)
*   **유형:** 표준 트랙 (Standards Track)
*   **주제:** 패키징 (Packaging)
*   **요구사항:** PEP 426
*   **생성일:** 2013년 11월 11일
*   **변경 이력:** 2013년 12월 21일

## PEP 철회 (PEP Withdrawal)

이 PEP는 PEP 426에 의존하며, PEP 426 자체도 철회되었습니다. 자세한 내용은 PEP 426의 "PEP 철회" 섹션을 참조하십시오.

그동안 메타데이터 확장은 `entry_points.txt`와 같은 과거 사례와 마찬가지로, 주 `METADATA` 파일과 함께 메타데이터 디렉토리에 설치되는 추가 파일로 계속 처리될 것입니다.

## 개요 (Abstract)

이 PEP는 Python 메타데이터에 대한 여러 표준 확장을 설명합니다.

모든 메타데이터 확장과 마찬가지로, 각 표준 확장 형식은 독립적으로 버전이 관리됩니다. 어떤 형식이라도 변경하려면 이 PEP를 업데이트해야 하지만, 핵심 패키징 메타데이터를 업데이트할 필요는 없습니다.

## 표준 확장 네임스페이스 (Standard Extension Namespace)

Python Package Index (PyPI)의 `python` 프로젝트는 CPython 참조 인터프리터를 나타냅니다. 이 네임스페이스는 표준 메타데이터 확장을 위한 네임스페이스로 사용됩니다.

현재 정의된 표준 확장(Standard Extensions)은 다음과 같습니다.

*   `python.details`
*   `python.project`
*   `python.integrator`
*   `python.exports`
*   `python.commands`
*   `python.constraints`

모든 표준 확장은 현재 `1.0` 버전에 있으며, 따라서 `extension_metadata` 필드를 생략해도 기능에 접근하는 데 아무런 문제가 없습니다.

## `python.details` 확장 (The `python.details` extension)

`python.details` 확장은 소프트웨어 배포에 대한 추가 정보를 제공할 수 있도록 합니다.

`python.details` 확장에는 네 가지 사용자 정의 하위 필드가 포함됩니다.

*   `license`: 배포의 저작권 라이선스
*   `keywords`: 배포를 위한 패키지 인덱스 키워드
*   `classifiers`: 배포를 위한 패키지 인덱스 Trove Classifiers
*   `document_names`: 추가 메타데이터 파일의 이름

이 필드는 모두 선택 사항입니다. 자동화 도구는 배포가 이러한 필드를 제공하지 않을 때에도 올바르게 작동해야 하며, 이러한 필드 중 하나에 의존하는 작업이 요청될 때에도 깔끔하게 실패해야 합니다.

### 라이선스 (License)

이 배포에 사용된 라이선스를 요약하는 짧은 문자열입니다.

이 필드를 제공하는 배포는 `Classifiers` 필드에 해당 라이선스 Trove 분류자를 여전히 지정해야 합니다. 적절한 Trove 분류자를 사용할 수 있더라도, 라이선스 요약은 해당 라이선스의 특정 버전을 지정하거나 라이선스의 변형 또는 예외를 나타내는 좋은 방법이 될 수 있습니다.

이 필드는 512자 미만이어야 하며, 2048자 미만이어야 합니다. 이 필드는 줄 바꿈을 포함해서는 안 됩니다. 전체 라이선스 텍스트는 배포의 소스 아카이브에 별도의 파일로 포함되어야 합니다. 자세한 내용은 `Document names`를 참조하십시오.

**예시:**

```json
"license": "GPL version 3, excluding DRM provisions"
```

### 키워드 (Keywords)

더 큰 카탈로그에서 배포를 검색하는 데 도움이 되는 추가 키워드 목록입니다.

**예시:**

```json
"keywords": ["comfy", "chair", "cushions", "too silly", "monty python"]
```

### 분류자 (Classifiers)

각각 배포에 대한 단일 분류 값을 제공하는 문자열 목록입니다. 분류자는 PEP 301에 설명되어 있습니다.

**예시:**

```json
"classifiers": [
    "Development Status :: 4 - Beta",
    "Environment :: Console (Text Based)",
    "License :: OSI Approved :: GNU General Public License v3 (GPLv3)"
]
```

### 문서 이름 (Document names)

배포의 `dist-info` 메타데이터 디렉토리에 포함된 보조 문서의 파일 이름입니다.

다음과 같은 보조 문서를 지정할 수 있습니다.

*   `description`: 배포에 대한 긴 설명을 포함하는 파일
*   `license`: 배포의 전체 라이선스 텍스트가 포함된 파일
*   `changelog`: 배포에 대한 변경 사항을 설명하는 파일

보조 문서는 `dist-info` 디렉토리에 직접 포함되어야 합니다. 문서 이름에는 디렉토리 구분 기호가 허용되지 않습니다.

파일의 마크업 형식(있는 경우)은 파일 확장자에 의해 표시됩니다. 이를 통해 인덱스 서버 및 기타 자동화 도구는 포함된 텍스트 문서를 올바르게 렌더링하고 렌더링 오류에 대한 피드백을 제공할 수 있으며, 의도된 형식을 추측할 필요가 없습니다.

파일 이름에 확장자가 없거나 확장자가 인식되지 않으면 기본 렌더링 형식은 일반 텍스트여야 합니다.

지정된 파일 확장자에 대해 다음 마크업 렌더러가 사용되어야 합니다.

*   **일반 텍스트:** `.txt`, 확장자 없음, 알 수 없는 확장자
*   **reStructured Text:** `.rst`
*   **Markdown:** `.md`
*   **AsciiDoc:** `.adoc`, `.asc`, `.asciidoc`
*   **HTML:** `.html`, `.htm`

자동화 도구는 지정된 형식 중 하나 이상을 일반 텍스트로 렌더링할 수 있으며, 나열된 것 이외의 다른 마크업 형식도 렌더링할 수 있습니다. 자동화 도구는 서비스 무결성을 보호하는 데 필요한 경우를 제외하고는 보조 문서 콘텐츠의 최대 길이에 대해 어떠한 가정도 하지 않아야 합니다.

**예시:**

```json
"document_names": {
    "description": "README.rst",
    "license": "LICENSE.rst",
    "changelog": "NEWS"
}
```

## `python.project` 확장 (The `python.project` extension)

`python.project` 확장은 배포의 생성 및 유지 관리에 대한 추가 정보를 제공할 수 있도록 합니다.

`python.project` 확장에는 세 가지 사용자 정의 하위 필드가 포함됩니다.

*   `contacts`: 배포의 주요 연락처
*   `contributors`: 배포에 대한 다른 기여자
*   `project_urls`: 배포와 관련된 URL

### 연락처 정보 (Contact information)

개인 및 조직에 대한 세부 정보는 다음 하위 필드가 있는 매핑으로 기록됩니다.

*   `name`: 개인 또는 그룹의 이름 (필수)
*   `email`: 이메일 주소 (메일링 리스트일 수도 있음) (선택 사항)
*   `url`: URL (소스 코드 호스팅 서비스의 프로필 페이지 등) (선택 사항)
*   `role`: `"author"`, `"maintainer"`, 또는 `"contributor"` 중 하나 (선택 사항, 기본값은 `contributor`)

이메일 주소는 `local-part@domain` 형식이어야 하며, `local-part`는 최대 64자, 전체 이메일 주소는 254자를 초과할 수 없습니다. 형식의 공식 사양은 RFC 5322 (섹션 3.2.3 및 3.4.1) 및 RFC 5321에 있으며, 더 읽기 쉬운 형식은 정보성 RFC 3696 및 관련 에라타에 제공됩니다.

정의된 기여자 역할은 다음과 같습니다.

*   `author`: 배포의 원본 생성자
*   `maintainer`: 배포의 현재 주요 기여자 (원본 생성자가 아닌 경우)
*   `contributor`: 배포 생성에 참여한 기타 개인 또는 조직

연락처 및 기여자 메타데이터는 선택 사항입니다. 자동화 도구는 배포가 이를 제공하지 않을 때에도 올바르게 작동해야 하며, 이러한 필드 중 하나에 의존하는 작업이 요청될 때에도 깔끔하게 실패해야 합니다.

### 연락처 (Contacts)

프로젝트에 대한 추가 정보를 얻기 위한 권장 연락처를 제공하는 기여자 항목 목록입니다.

아래 예시는 더 큰 개발 그룹의 일부로 운영되면서 원본 작성자에서 새로운 주요 유지 관리자로 인계되는 과정에 있는 프로젝트에 적합합니다.

**예시:**

```json
"contacts": [
    {
        "name": "Python Packaging Authority/Distutils-SIG",
        "email": "distutils-sig@python.org",
        "url": "https://bitbucket.org/pypa/"
    },
    {
        "name": "Samantha C.",
        "role": "maintainer",
        "email": "dontblameme@example.org"
    },
    {
        "name": "Charlotte C.",
        "role": "author",
        "email": "iambecomingasketchcomedian@example.com"
    }
]
```

### 기여자 (Contributors)

현재 프로젝트의 연락처로 아직 나열되지 않은 다른 기여자를 위한 기여자 항목 목록입니다. 목록 요소 내의 하위 필드는 주요 연락처 필드의 하위 필드와 동일합니다.

**예시:**

```json
"contributors": [
    {"name": "John C."},
    {"name": "Erik I."},
    {"name": "Terry G."},
    {"name": "Mike P."},
    {"name": "Graeme C."},
    {"name": "Terry J."}
]
```

### 프로젝트 URL (Project URLs)

프로젝트와 관련된 추가 URL에 대한 임의의 텍스트 레이블 매핑입니다.

프로젝트는 자체 레이블과 특정 URL을 자유롭게 선택할 수 있지만, 아래 예시의 레이블을 사용하여 홈 페이지, 소스 제어, 이슈 트래커 및 문서 링크를 제공하는 것이 권장됩니다.

URL 레이블은 자동화 도구에 의해 대소문자를 구분하지 않아야 하지만, 유효한 Python 식별자일 필요는 없습니다. 모든 유효한 JSON 문자열은 URL 레이블로 허용됩니다.

**예시:**

```json
"project_urls": {
    "Documentation": "https://distlib.readthedocs.org",
    "Home": "https://bitbucket.org/pypa/distlib",
    "Repository": "https://bitbucket.org/pypa/distlib/src",
    "Tracker": "https://bitbucket.org/pypa/distlib/issues"
}
```

## `python.integrator` 확장 (The `python.integrator` extension)

구조적으로 이 확장은 `python.project` 확장과 거의 동일합니다(확장 이름만 다릅니다).

그러나 `project` 메타데이터가 소프트웨어의 업스트림 생성자를 나타내는 반면, `integrator` 메타데이터는 수정된 버전의 다운스트림 재배포자를 나타냅니다.

소프트웨어가 수정되지 않고 재배포되는 경우 일반적으로 이 확장은 사용되지 않습니다. 그러나 소프트웨어가 패치된 경우(예: 나중에 버전의 호환 가능한 수정 사항을 백포트하거나 플랫폼 호환성 문제를 해결하는 경우) 이 확장을 사용해야 하며, 배포의 버전 식별자에 로컬 버전 레이블이 추가되어야 합니다.

체인에 여러 재배포자가 있는 경우, 각 재배포자는 이 확장을 자신의 특정 메타데이터로 덮어씁니다.

## `python.exports` 확장 (The `python.exports` extension)

대부분의 Python 배포는 Python 모듈 네임스페이스를 통해 가져올 패키지 및 모듈을 노출합니다. 배포는 설치 시 다른 인터페이스도 노출할 수 있습니다.

`python.exports` 확장에는 세 가지 사용자 정의 하위 필드가 포함됩니다.

*   `modules`: 배포에서 내보낸 모듈
*   `namespaces`: 배포가 기여하는 네임스페이스 패키지
*   `exports`: 배포에서 내보낸 다른 Python 인터페이스

### 내보내기 지정자 (Export specifiers)

내보내기 지정자는 정규화된 이름과 대괄호로 묶인 선택적 추가 이름으로 구성된 문자열입니다. 다음 네 가지 가능한 내보내기 지정자 형식이 있습니다.

*   `module`
*   `module:name`
*   `module[requires_extra]`
*   `module:name[requires_extra]`

**참고:**

현재 `jsonschema` 파일은 Python 2 ASCII 식별자 규칙을 사용하여 정규화된 이름을 제한합니다. Python 3의 더 완화된 식별자 규칙을 고려할 때 이 부분을 재고해야 할 수도 있습니다.

하위 필드의 의미는 다음과 같습니다.

*   `module`: 내보내기를 제공하는 모듈
*   `name`: 해당되는 경우, 모듈 내의 내보내기의 정규화된 이름
*   `requires_extra`: 지정된 `extra`에 명명된 추가 종속성이 설치된 환경에서 사용 가능한 경우에만 내보내기가 올바르게 작동함을 나타냅니다.

**참고:**

이것을 하위 필드가 있는 매핑으로 시도했지만, 아래 예시들이 읽기 어렵게 만들었습니다. 이 PEP는 주로 도구 사용을 위한 것이지만, 디버깅 목적을 위해, 그리고 형식의 스니펫이 다른 곳에서 재사용될 것으로 예상하기 때문에 가독성도 어느 정도 중요합니다.

### 모듈 (Modules)

배포가 가져오기 위해 제공하는 모듈 및 패키지의 정규화된 이름 목록입니다.

**참고:**

현재 `jsonschema` 파일은 Python 2 ASCII 식별자 규칙을 사용하여 정규화된 이름을 제한합니다. Python 3의 더 완화된 식별자 규칙을 고려할 때 이 부분을 재고해야 할 수도 있습니다.

점(.)을 포함하는 이름의 경우, 마지막 점 이전의 이름 부분은 설치된 모듈 목록 또는 네임스페이스 패키지 목록에 나타나야 합니다.

이름 충돌을 피하기 위해 배포가 배포 이름(또는 소문자 해당 이름)과 일치하는 단일 최상위 모듈 또는 패키지를 제공하는 것이 권장됩니다. 이를 위해서는 배포 이름이 Python 식별자의 요구 사항(배포 이름보다 엄격함)도 충족해야 합니다. 이 방법은 모듈에 대한 공식 소스를 더 쉽게 찾는 데도 도움이 될 것입니다.

인덱스 서버는 여러 배포가 동일한 모듈을 게시하는 것을 허용해야 하지만, 잠재적인 충돌에 대해 배포 작성자에게 알릴 수 있습니다.

설치 도구는 다른 이전에 설치된 배포에서 제공하는 모듈을 제공하는 배포를 설치하도록 요청받을 때 오류를 보고해야 합니다.

적절한 `extras`가 설치되지 않은 경우 일부 선언된 모듈을 가져오려고 하면 예외가 발생할 수 있습니다.

**예시:**

```json
"modules": ["chair", "chair.cushions", "python_sketches.nobody_expects"]
```

**참고:**

이를 내보내기 지정자 목록으로 만드는 대신, 특정 모듈이 올바르게 실행되기 위해 특정 `extra`를 필요로 할 때 배포가 이를 선언할 수 있습니다. 반면에, 그 시점에서 `extras`를 사용하는 대신 별도의 배포로 분리하는 것이 가치가 있다고 주장할 수도 있습니다.

### 네임스페이스 (Namespaces)

배포가 모듈을 기여하는 네임스페이스 패키지의 정규화된 이름 목록입니다.

**참고:**

현재 `jsonschema` 파일은 Python 2 ASCII 식별자 규칙을 사용하여 정규화된 이름을 제한합니다. Python 3의 더 완화된 식별자 규칙을 고려할 때 이 부분을 재고해야 할 수도 있습니다.

Python 3.3 이전 버전의 Python(네이티브 네임스페이스 패키지 지원을 제공함)에서는 설치 도구가 배포가 제공하는 파일 대신 적절한 `__init__.py` 파일을 생성하여 네임스페이스를 올바르게 초기화해야 합니다.

설치 도구는 배포가 이미 설치된 모듈의 이름과 충돌하는 네임스페이스 패키지를 선언하거나 그 반대의 경우 경고를 발생시켜야 하며, 오류를 발생시킬 수도 있습니다.

**예시:**

```json
"namespaces": ["python_sketches"]
```

### 내보내기 (Exports)

`exports` 필드는 접두사가 붙은 이름을 키로 포함하는 매핑입니다. 각 키는 배포에서 게시한 하나 이상의 내보내기를 포함하는 내보내기 그룹을 식별합니다.

내보내기 그룹 이름은 게시된 내보내기 정보를 어떤 식으로든 사용할 배포에 의해 정의됩니다. 주요 사용 사례는 플러그인 모델을 지원하는 배포를 위한 것입니다. 내보내기 그룹을 정의하면 다른 배포가 어떤 플러그인을 제공하는지, 어떻게 가져와서 접근할 수 있는지, 플러그인이 올바르게 작동하는 데 필요한 추가 종속성(있는 경우)이 무엇인지 나타낼 수 있습니다.

이름 충돌 가능성을 줄이기 위해 내보내기 그룹 이름은 내보내기 그룹의 의미를 정의하는 배포의 모듈 이름에 해당하는 접두사를 사용해야 합니다. 이 방법은 내보내기 그룹에 대한 공식 문서를 더 쉽게 찾는 데도 도움이 될 것입니다.

각 개별 내보내기 그룹은 임의의 비어 있지 않은 문자열 키에서 내보내기 지정자로의 매핑입니다. 내보내기 그룹 내의 내보내기 이름의 의미는 내보내기 그룹을 정의하는 배포에 달려 있습니다. 내보내기 이름 형식에 대한 적절한 정의를 생성하면 가져오는 배포가 모든 내보내기 모듈을 가져올 필요 없이 내보내기가 관련성이 있는지 여부를 결정할 수 있습니다.

**예시:**

```json
"exports": {
    "nose.plugins.0.10": {
        "chairtest": "chair:NosePlugin"
    }
}
```

## `python.commands` 확장 (The `python.commands` extension)

`python.commands` 확장에는 세 가지 사용자 정의 하위 필드가 포함됩니다.

*   `wrap_console`: 설치 프로그램이 생성할 콘솔 래퍼 스크립트
*   `wrap_gui`: 설치 프로그램이 생성할 GUI 래퍼 스크립트
*   `prebuilt`: 배포의 빌드 프로세스에 의해 생성되고 구성된 스크립트 디렉토리에 직접 설치되는 스크립트

`wrap_console`과 `wrap_gui`는 모두 스크립트 이름에서 내보내기 지정자로의 매핑입니다. 스크립트 이름은 배포 이름과 동일한 명명 규칙을 따라야 합니다.

래퍼 스크립트에 대한 내보내기 지정자는 `__main__` 하위 모듈이 있는 패키지(내보내기 지정자에 `name` 하위 필드가 없는 경우) 또는 명명된 모듈 내의 호출 가능한 항목을 참조해야 합니다.

설치 도구는 설치 프로세스의 일부로 적절한 래퍼를 생성해야 합니다.

**참고:**

"적절한 래퍼"가 무엇을 의미하는지에 대한 더 많은 세부 정보가 필요합니다. 현재는 `setuptools`와 `zc.buildout`이 래퍼 스크립트로 생성하는 것을 참조합니다.

`prebuilt`는 `wheel` 파일의 스크립트 디렉토리 또는 설치 후의 스크립트 경로 목록입니다. 이는 정보 제공 목적으로만 제공되며, 설치는 배포 빌드 시 생성된 파일에 대한 일반적인 프로세스를 통해 처리됩니다.

빌드 도구는 이 확장을 설치 프로그램에 의한 처리가 필요하다고 표시해야 합니다.

인덱스 서버는 여러 배포가 동일한 명령을 게시하는 것을 허용해야 하지만, 잠재적인 충돌에 대해 배포 작성자에게 알릴 수 있습니다.

설치 도구는 다른 이전에 설치된 배포에서 제공하는 명령을 제공하는 배포를 설치하도록 요청받을 때 오류를 보고해야 합니다.

**예시:**

```json
"python.commands": {
    "installer_must_handle": true,
    "wrap_console": [{"chair": "chair:run_cli"}],
    "wrap_gui": [{"chair-gui": "chair:run_gui"}],
    "prebuilt": ["reduniforms"]
}
```

## `python.constraints` 확장 (The `python.constraints` extension)

`python.constraints` 확장에는 두 가지 사용자 정의 하위 필드가 포함됩니다.

*   `environments`: 지원되는 설치 환경
*   `extension_metadata`: 다른 설치된 구성 요소에서 게시한 확장 메타데이터 필드의 필수 정확한 일치 항목

빌드 도구는 이 확장을 설치 프로그램에 의한 처리가 필요하다고 표시해야 합니다.

인덱스 서버는 해당 인덱스를 사용하여 충족될 수 없는 제약 조건이 있는 배포가 업로드되는 것을 허용해야 하지만, 그러한 잠재적인 호환성 문제에 대해 배포 작성자에게 알릴 수 있습니다.

설치 도구는 배포에 의해 제약 조건이 지정되고 대상 설치 환경이 이를 충족하지 못하는 경우 오류를 보고해야 하며, 최소한 경고를 발생시켜야 하고, 사용자가 강제로 설치를 진행하도록 허용할 수 있습니다.

**예시:**

```json
"python.constraints": {
    "installer_must_handle": true,
    "environments": ["python_version >= 2.6"],
    "extension_metadata": {
        "fortranlib": {
            "fortranlib.compatibility": {
                "fortran_abi": "openblas-g77"
            }
        }
    }
}
```

### 지원 환경 (Supported Environments)

`environments` 하위 필드는 배포가 명시적으로 지원하는 환경을 지정하는 문자열 목록입니다. 환경은 주어진 환경 마커 중 하나 이상과 일치하는 경우 지원되는 것으로 간주됩니다.

이 필드가 메타데이터에 제공되지 않으면, 배포는 Python이 지원하는 모든 플랫폼을 지원하는 것으로 가정합니다.

개별 항목은 PEP 426에 설명된 환경 마커입니다.

이 필드의 두 가지 주요 용도는 지원되는 Python 버전과 기본 운영 체제를 선언하는 것입니다.

**지원되는 Python 버전을 나타내는 예시:**

```python
# Python 2.6+ 지원
"environments": ["python_version >= '2.6'"]

# Python 2.6+ (2.x용) 또는 3.3+ (3.x용) 지원
"environments": ["python_version >= '3.3'", "'3.0' > python_version >= '2.6'"]
```

**지원되는 운영 체제를 나타내는 예시:**

```python
# Windows 전용
"environments": ["sys_platform == 'win32'"]

# Windows 제외한 모든 환경
"environments": ["sys_platform != 'win32'"]

# Linux 또는 BSD 전용
"environments": ["'linux' in sys_platform", "'bsd' in sys_platform"]
```

**지원되는 Python 버전이 플랫폼에 따라 다른 예시:**

```python
# 표준 라이브러리의 os 모듈은 POSIX 시스템에서 오랫동안 아토믹 이름 변경을
# 지원했지만, Python 3.3에서만 Windows에서 아토믹 이름 변경을 지원하게 되었습니다.
# 안정적인 작동을 위해 아토믹 이름 변경 지원이 필요한 배포는 다음과 같은 지원 환경을
# 선언할 수 있습니다.
"environment": ["python_version >= '2.6' and sys_platform != 'win32'",
                "python_version >= '3.3' and sys_platform == 'win32'"]
```

### 확장 메타데이터 제약 조건 (Extension metadata constraints)

`extension_metadata` 하위 필드는 배포 이름에서 대상 설치 환경에서 명명된 배포의 메타데이터와 정확히 일치할 것으로 예상되는 확장 메타데이터 스니펫으로의 매핑입니다.

각 하위 매핑은 메타데이터 확장 이름에서 필드의 하위 집합의 정확히 예상되는 값으로의 매핑으로 구성됩니다.

예를 들어, `fortranlib`라는 배포는 빌드 방식에 따라 다른 FORTRAN ABI를 게시할 수 있으며, 동일한 런타임 환경에 설치되는 모든 관련 프로젝트는 일치하는 빌드 옵션을 사용해야 합니다. 이는 기본 배포가 바이너리 확장을 생성하는 데 사용된 빌드 옵션을 나타내는 사용자 정의 확장을 게시하도록 하여 처리할 수 있습니다.

```json
"extensions": {
    "fortranlib.compatibility": {
        "fortran_abi": "openblas-g77"
    }
}
```

기본 배포와 호환되어야 하는 바이너리 확장을 포함하는 다른 배포는 자체 메타데이터에 적절한 제약 조건을 정의합니다.

```json
"python.constraints": {
    "installer_must_handle": true,
    "extension_metadata": {
        "fortranlib": {
            "fortranlib.compatibility": {
                "fortran_abi": "openblas-g77"
            }
        }
    }
}
```

이 제약 조건은 다음을 지정합니다.

*   `fortranlib`가 설치되어야 합니다 (설치 프로그램이 이를 충족하도록 보장하기 위해 일반 종속성으로도 표현되어야 합니다).
*   설치된 `fortranlib` 버전은 게시된 메타데이터에 사용자 정의 `fortranlib.compatibility` 확장을 포함해야 합니다.
*   해당 확장의 `fortran_abi` 하위 필드는 `openblas-g77`라는 정확한 값을 가져야 합니다.

이러한 모든 조건이 충족되면 (배포가 설치되고, 지정된 확장이 메타데이터에 포함되며, 지정된 하위 필드가 정확히 지정된 값을 갖는 경우) 제약 조건이 충족된 것으로 간주됩니다.

**참고:**

여기서 의도된 주요 사용 사례는 추가 ABI 호환성 요구 사항이 있는 C 확장이 세부 사항을 이해할 필요 없이 모든 설치 도구가 적용할 수 있는 방식으로 이를 선언할 수 있도록 하는 것입니다. 특히, 많은 NumPy 기반 과학 라이브러리는 일관된 FORTRAN 라이브러리 세트를 사용하여 빌드되어야 하므로 "fortranlib" 예시가 사용되었습니다.

이것이 패턴 매칭이나 부울 로직에 대한 지원이 없는 이유입니다. 이 확장의 "간단한" 버전조차도 상대적으로 복잡하며, 현재로서는 이미 복잡한 것을 더 복잡하게 만들 compelling한 근거가 없습니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.