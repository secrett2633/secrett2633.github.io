---
title: "[Rejected] PEP 633 - Dependency specification in pyproject.toml using an exploded TOML table"
excerpt: "Python Enhancement Proposal 633: 'Dependency specification in pyproject.toml using an exploded TOML table'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/633/
toc: true
toc_sticky: true
date: 2025-09-27 01:25:08+0900
last_modified_at: 2025-09-27 01:25:08+0900
published: true
---
> **원문 링크:** [PEP 633 - Dependency specification in pyproject.toml using an exploded TOML table](https://peps.python.org/pep-0633/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 02-Sep-2020


# PEP 633 – pyproject.toml에서 확장된 TOML 테이블을 사용한 의존성 명세 (Dependency specification in pyproject.toml using an exploded TOML table)

## 거부 통지 (Rejection Notice)

이 PEP는 PEP 631의 인기도, 기존 PEP 508 문자열 사용과의 일관성, 그리고 기존 패키징 도구 모음과의 호환성으로 인해 **PEP 631을 지지하며 거부되었습니다.**

## 요약 (Abstract)

이 PEP 633은 PEP 621에 정의된 필드를 사용하여 `pyproject.toml` 파일에 프로젝트의 의존성(dependencies)을 정의하는 방법을 명세합니다. 이는 PEP 631에서 정의된 PEP 508 기반의 접근 방식에 대한 대안으로 제안되었습니다.

## 동기 (Motivation)

PEP 508 문자열 대신 TOML 테이블 및 기타 데이터 타입을 사용하여 요구사항(requirements)을 표현하는 데는 여러 이점이 있습니다.

*   **쉬운 초기 유효성 검사:** TOML 구문을 통해 쉽게 초기 유효성 검사를 수행할 수 있습니다.
*   **스키마를 통한 쉬운 보조 유효성 검사:** 예를 들어 JSON Schema와 같은 스키마를 사용하여 추가적인 유효성 검사를 할 수 있습니다.
*   **사용자 편의성:** 사용자가 구문을 암기할 필요 없이 특정 기능의 키를 추측할 가능성이 있습니다.
*   **다른 언어 사용자 친숙도:** 다른 인기 있는 여러 언어의 사용자들은 이미 TOML 구문에 익숙할 수 있습니다.
*   **데이터 구조 이해:** TOML은 JSON과 동일한 데이터 구조를 직접적으로 표현하며, 파이썬 리터럴(literals)의 부분 집합을 나타내므로 사용자가 계층 구조와 값의 유형을 이해하기 쉽습니다.

## 이론적 근거 (Rationale)

이 PEP의 대부분은 PEP 621의 의존성 주제에 대한 논의에서 비롯되었습니다. Pipfile, Poetry, Dart의 의존성 관리 및 Rust의 Cargo에서 영감을 받았습니다. 이 형식과 PEP 508 스타일 명세자 간의 장단점을 비교한 문서도 존재합니다.

동일한 배포 이름에 대해 여러 요구사항을 명세할 때 (환경 마커(environment markers)가 적절한 의존성을 선택하는 경우), Poetry와 유사하게 요구사항 배열을 허용하는 방식이 채택되었습니다.

`direct-reference` 키는 패키징 생태계의 차이를 줄이고 기존 명세 작업을 활용하기 위해 PEP 610 및 PEP 440과 밀접하게 일치하고 이를 활용합니다.

## 명세 (Specification)

PEP 621과 마찬가지로, 메타데이터가 부적절하게 명세된 경우 도구는 에러를 발생시켜야 합니다. 메타데이터는 TOML 명세를 따라야 합니다.

이 문서는 의존성 명세를 위한 명세서이므로 혼란을 줄이기 위해 "requirement"라는 단어는 PEP 508 의존성 명세를 의미하는 데 사용됩니다.

PEP 621에 명세된 `project` 테이블에 다음 테이블이 추가됩니다.

### `dependencies`

*   **형식:** `table`
*   이 테이블 내부의 키는 필요한 배포판의 이름입니다. 값은 다음 유형 중 하나를 가질 수 있습니다.
    *   **`string`**: 요구사항이 오직 버전 요구사항에 의해 정의되며, 요구사항 테이블의 버전 명세와 동일합니다. 단, 버전 제한을 두지 않음을 나타내는 빈 문자열 `""`을 허용합니다.
    *   **`table`**: 요구사항 테이블입니다.
    *   **`array`**: 요구사항 테이블의 배열입니다. 비워 있는 `[]` 배열을 값으로 지정하는 것은 에러입니다.

### 요구사항 테이블 (Requirement table)

요구사항 테이블의 키는 다음과 같습니다 (모두 선택 사항입니다).

*   **`version` (string):** PEP 440 버전 명세자이며, 쉼표로 구분된 버전 명세 절(clauses) 목록입니다. 이 문자열은 비워 있을 수 없습니다.
*   **`extras` (array of strings):** 배포판에 대한 PEP 508 `extras` 선언 목록입니다. 이 목록은 비워 있을 수 없습니다.
*   **`markers` (string):** PEP 508 환경 마커(environment marker) 표현식입니다. 이 문자열은 비워 있을 수 없습니다.
*   **`url` (string):** 요구사항을 충족하기 위해 설치할 아티팩트(artifact)의 URL입니다. `file://`은 로컬 파일 시스템에서 패키지를 검색하는 데 사용되는 접두사입니다.
*   **`git`, `hg`, `bzr` 또는 `svn` (string):** 클론(clone)할 VCS 저장소(PEP 440에 명시됨)의 URL입니다. 해당 저장소의 트리는 요구사항을 충족하기 위해 설치됩니다. 추가 VCS 키는 PEP 610의 수정 사항을 통해 추가될 예정이며, 도구는 수정 사항이 승인되기 전에 명령줄 명령을 사용하여 다른 VCS를 지원하도록 선택할 수 있습니다.
*   **`revision` (string):** 설치 전에 체크아웃(check-out)할 지정된 VCS 저장소의 특정 리비전(revision) 식별자입니다. 사용자는 `git`, `hg`, `bzr`, `svn` 또는 다른 VCS 키 중 하나가 설치할 배포판을 식별하는 데 사용될 때만 이를 제공해야 합니다. 리비전 식별자는 PEP 610에 제안되어 있습니다.

`version`, `url`, `git`, `hg`, `bzr`, `svn` 및 기타 VCS 키는 논리적으로 서로 충돌하므로 동시에 최대 하나만 지정할 수 있습니다.

빈 요구사항 테이블 `{}`은 빈 문자열 `""` 외에 요구사항에 대한 제한을 두지 않습니다.

이 문서에 명시되지 않은 키가 제공되면 파싱(parsing) 시 에러가 발생해야 합니다.

### `optional-dependencies`

*   **형식:** `table`
*   이 테이블 내부의 키는 extra에 필요한 배포판의 이름입니다. 값은 다음 유형 중 하나를 가질 수 있습니다.
    *   **`table`**: 요구사항 테이블입니다.
    *   **`array`**: 요구사항 테이블의 배열입니다.

이러한 요구사항 테이블은 위에 명시된 것과 동일한 명세를 가지며, 다음 필수 키가 추가됩니다.

*   **`for-extra` (string):** 이 요구사항이 필요한 PEP 508 extra의 이름입니다.

### 참조 구현 (Reference implementation)

도구는 이 형식을 PEP 508 요구사항 문자열로 변환해야 합니다. 아래는 해당 변환의 예시 구현입니다 (유효성 검사가 이미 수행되었다고 가정합니다).

```python
def convert_requirement_to_pep508(name, requirement):
    if isinstance(requirement, str):
        requirement = {"version": requirement}
    pep508 = name
    if "extras" in requirement:
        pep508 += " [" + ", ".join(requirement["extras"]) + "]"
    if "version" in requirement:
        pep508 += " " + requirement["version"]
    if "url" in requirement:
        pep508 += " @ " + requirement["url"]
    for vcs in ("git", "hg", "bzr", "svn"):
        if vcs in requirement:
            pep508 += " @ " + vcs + "+" + requirement[vcs]
            if "revision" in requirement:
                pep508 += "@" + requirement["revision"]
    extra = None
    if "for-extra" in requirement:
        extra = requirement["for-extra"]
    if "markers" in requirement:
        markers = requirement["markers"]
        if extra:
            markers = "extra = '" + extra + "' and (" + markers + ")"
        pep508 += "; " + markers
    return pep508, extra

def convert_requirements_to_pep508(dependencies):
    pep508s = []
    extras = set()
    for name, req in dependencies.items():
        if isinstance(req, list):
            for sub_req in req:
                pep508, extra = convert_requirement_to_pep508(name, sub_req)
                pep508s.append(pep508)
                if extra:
                    extras.add(extra)
        else:
            pep508, extra = convert_requirement_to_pep508(name, req)
            pep508s.append(pep508)
            if extra:
                extras.add(extra)
    return pep508s, extras

def convert_project_requirements_to_pep508(project):
    reqs, _ = convert_requirements_to_pep508(project.get("dependencies", {}))
    optional_reqs, extras = convert_requirements_to_pep508(
        project.get("optional-dependencies", {})
    )
    reqs += optional_reqs
    return reqs, extras
```

### JSON Schema

초기 유효성 검사를 위해 JSON Schema를 사용할 수 있습니다. 이는 도구가 일관된 유효성 검사를 수행하는 데 도움이 될 뿐만 아니라, 코드 편집기가 사용자가 의존성 목록을 작성하는 동안 유효성 검사 오류를 강조 표시할 수 있도록 합니다.

(JSON Schema의 전체 내용은 생략합니다. 원문 PEP 633에서 확인할 수 있습니다.)

### 예시 (Examples)

PEP 633이 `pyproject.toml`에서 의존성을 어떻게 정의하는지에 대한 다양한 예시가 제공됩니다.

#### 버전 제약이 있는 의존성 (Version Constrained Dependencies)

*   **버전 제약 없음:**
    ```toml
    # PEP 508 스타일
    # aiohttp
    # PEP 633 스타일
    aiohttp = {}
    ```
*   **간단한 버전 제약:**
    ```toml
    # PEP 508 스타일
    # aiohttp >= 3.6.2, < 4.0.0
    # PEP 633 스타일
    aiohttp = { version = ">= 3.6.2, < 4.0.0" }
    # 간결하게 문자열로도 표현 가능
    # aiohttp = ">= 3.6.2, < 4.0.0"
    ```

#### 직접 참조 의존성 (Direct Reference Dependencies)

*   **URL 의존성:**
    ```toml
    # PEP 508 스타일
    # aiohttp @ https://files.pythonhosted.org/packages/.../aiohttp-3.6.2-cp35-cp35m-macosx_10_13_x86_64.whl
    # PEP 633 스타일
    aiohttp = { url = "https://files.pythonhosted.org/packages/.../aiohttp-3.6.2-cp35-cp35m-macosx_10_13_x86_64.whl" }
    ```
*   **VCS 의존성 (Git):**
    ```toml
    # PEP 508 스타일
    # aiohttp @ git+ssh://git@github.com/aio-libs/aiohttp.git@master
    # PEP 633 스타일
    aiohttp = { git = "ssh://git@github.com/aio-libs/aiohttp.git", revision = "master" }
    ```

#### 환경 마커 (Environment Markers)

*   **간단한 환경 마커:**
    ```toml
    # PEP 508 스타일
    # aiohttp >= 3.6.1; python_version >= '3.8'
    # PEP 633 스타일
    aiohttp = { version = ">= 3.6.1", markers = "python_version >= '3.8'" }
    ```
*   **복합 환경 마커 (배열 사용):**
    ```toml
    # PEP 508 스타일
    # aiohttp >= 3.6.1; python_version >= '3.8'
    # aiohttp >= 3.0.0, < 3.6.1; python_version < '3.8'
    # PEP 633 스타일
    aiohttp = [
        { version = ">= 3.6.1", markers = "python_version >= '3.8'" },
        { version = ">= 3.0.0, < 3.6.1", markers = "python_version < '3.8'" }
    ]
    ```

#### 패키지 Extras (Package Extras)

*   **패키지 extra에 대한 의존성 지정:**
    ```toml
    # PEP 508 스타일
    # aiohttp >= 3.6.2; extra == 'http'
    # PEP 633 스타일
    aiohttp = { version = ">= 3.6.2", for-extra = "http" }
    ```
*   **의존성에서 extra 사용:**
    ```toml
    # PEP 508 스타일
    # aiohttp [speedups] >= 3.6.2
    # PEP 633 스타일
    aiohttp = { version = ">= 3.6.2", extras = ["speedups"] }
    ```

#### 복합 예시 (Complex Examples)

다양한 요소를 결합한 복잡한 예시도 제시됩니다.

### 거부된 아이디어 (Rejected Ideas)

이 섹션에서는 PEP 633을 설계하는 과정에서 논의되었으나 최종적으로 채택되지 않은 아이디어들을 설명합니다.

*   **`dependencies`를 배열로 전환 (Switch to an array for dependencies):** 각 요소가 이름 키를 가진 테이블이 되고 요구사항 테이블의 배열은 없는 형식으로 의존성을 배열로 사용하는 아이디어. 이는 TOML 형식에서 너무 장황하고 제한적이었으며, 주어진 배포판에 대해 여러 요구사항을 갖는 경우가 흔하지 않기 때문에 거부되었습니다.
*   **`optional-dependencies`를 `extras`로 대체 (Replace optional-dependencies with extras):** 요구사항에 `optional` 키를 포함하고, 프로젝트의 extra에 필요한 (선택적) 요구사항을 명시하는 `extras` 테이블을 사용하여 `optional-dependencies` 테이블을 제거하는 아이디어. 이는 같은 명세를 가진 테이블 수를 줄이고 요구사항을 한 번만 명시하여 여러 extras에서 사용할 수 있게 하지만, 요구사항의 일부 속성(어떤 extra에 속하는지)을 멀리하고, 필수 및 선택적 의존성을 함께 그룹화하며, 배포판에 여러 요구사항이 있을 때 요구사항을 선택하는 간단한 방법이 없을 수 있어 거부되었습니다. PEP 621 초안에서 `optional-dependencies`가 이미 사용되었기 때문에 거부되었습니다.
*   **요구사항 내 `direct` 테이블 (direct table in requirement):** `direct-reference` 키를 `direct` 테이블에 포함하고, VCS를 `vcs` 키의 값으로 명시하는 아이디어. 이는 더 명시적이고 JSON Schema 유효성 검사에 포함하기 쉬웠지만, 너무 장황하고 가독성이 떨어진다고 판단되어 거부되었습니다.
*   **해시 포함 (Include hash):** `direct-reference` 요구사항에 해시(hash)를 포함하는 아이디어. 이는 패키지 락 파일(lock-files)에만 해당되며, 프로젝트 메타데이터에는 적합하지 않다고 판단되었습니다.
*   **각 extra에 대한 의존성 테이블 (Dependency tables for each extra):** `optional-dependencies`를 각 extra에 대한 의존성 테이블의 테이블로 만드는 아이디어 (테이블 이름이 extra 이름이 됨). 이는 `optional-dependencies`를 `dependencies`와 다른 유형으로 만들어 사용자에게 혼란을 주고 파싱하기 어렵게 만들 수 있어 거부되었습니다.
*   **환경 마커 키 (Environment marker keys):** 각 PEP 508 환경 마커를 요구사항의 키(또는 하위 테이블 키)로 만드는 아이디어. 이는 가독성과 파싱 용이성을 높일 수 있었지만, 더 많은 설계가 필요하다는 이유로 보류되었습니다.
*   **하나의 요구사항이 충족할 수 있는 여러 extras (Multiple extras which one requirement can satisfy):** `for-extra` 키를 `for-extras`로 바꾸고, 그 값을 요구사항이 충족하는 extras의 배열로 하는 아이디어. 이는 일부 중복을 줄이지만, 이 경우 중복은 어떤 extra가 어떤 의존성을 가지는지 명시적으로 보여주기 때문에 거부되었습니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되거나 CC0-1.0-Universal 라이선스(둘 중 더 자유로운 조건)에 따라 제공됩니다.
Source: https://github.com/python/peps/blob/main/peps/pep-0633.rst
Last modified: 2025-02-01 08:55:40 GMTI have browsed the content of PEP 0633. Now I need to translate and summarize it into Korean, following all the specified guidelines.

Here's my plan:
1.  **Rejection Notice**: Translate this first as it's crucial for understanding the PEP's status.
2.  **Abstract**: Translate the core idea.
3.  **Motivation**: Translate the reasons for proposing this PEP.
4.  **Rationale**: Translate the background and influences.
5.  **Specification**:
    *   Translate the `dependencies` section, including its format and value types.
    *   Translate the `Requirement table` details (keys, types, constraints).
    *   Translate the `optional-dependencies` section, including its format and value types, and the `for-extra` key.
6.  **Reference implementation**: Briefly explain its purpose and include the Python code snippet.
7.  **JSON Schema**: Briefly explain its purpose. (No need to include the full schema text).
8.  **Examples**: Translate and show a few key examples from "Compatibility Examples" to illustrate how the TOML format compares to PEP 508 strings for various dependency types (Version, URL, VCS, Environment Markers, Package Extras).
9.  **Rejected Ideas**: Summarize the key rejected ideas and their reasons.
10. **Copyright**: Translate the copyright notice.

Throughout the translation, I will pay close attention to:
*   **Professionalism and Terminology**: Using Python-specific terms correctly (e.g., PEP, TOML, `pyproject.toml`, `dependencies`, `optional-dependencies`, `extras`, `environment markers`, `VCS`).
*   **Korean/English Blending**: Using Korean where natural, keeping English for keywords/uncommon translations, or using both (e.g., `Generator (제너레이터)`). Keywords in code (`async`, `await`, `class`, `def`) and variable names are **not** to be translated.
*   **Readability**: Using Markdown headers, lists, and code blocks effectively.
*   **Accuracy and Completeness**: Ensuring no critical information is lost.
*   **Citations**: Adding `` to every sentence that refers to the browsed content.

Let's start the translation.

#### 복합 예시 (Complex Examples)

다양한 요소를 결합한 복잡한 예시도 제시됩니다.

### 거부된 아이디어 (Rejected Ideas)

이 섹션에서는 PEP 633을 설계하는 과정에서 논의되었으나 최종적으로 채택되지 않은 아이디어들을 설명합니다.

*   **`dependencies`를 배열로 전환 (Switch to an array for dependencies):** 각 요소가 이름 키를 가진 테이블이 되고 요구사항 테이블의 배열은 없는 형식으로 의존성을 배열로 사용하는 아이디어. 이는 TOML 형식에서 너무 장황하고 제한적이었으며, 주어진 배포판에 대해 여러 요구사항을 갖는 경우가 흔하지 않기 때문에 거부되었습니다.
*   **`optional-dependencies`를 `extras`로 대체 (Replace optional-dependencies with extras):** 요구사항에 `optional` 키를 포함하고, 프로젝트의 extra에 필요한 (선택적) 요구사항을 명시하는 `extras` 테이블을 사용하여 `optional-dependencies` 테이블을 제거하는 아이디어. 이는 같은 명세를 가진 테이블 수를 줄이고 요구사항을 한 번만 명시하여 여러 extras에서 사용할 수 있게 하지만, 요구사항의 일부 속성(어떤 extra에 속하는지)을 멀리하고, 필수 및 선택적 의존성을 함께 그룹화하며, 배포판에 여러 요구사항이 있을 때 요구사항을 선택하는 간단한 방법이 없을 수 있어 거부되었습니다. PEP 621 초안에서 `optional-dependencies`가 이미 사용되었기 때문에 거부되었습니다.
*   **요구사항 내 `direct` 테이블 (direct table in requirement):** `direct-reference` 키를 `direct` 테이블에 포함하고, VCS를 `vcs` 키의 값으로 명시하는 아이디어. 이는 더 명시적이고 JSON Schema 유효성 검사에 포함하기 쉬웠지만, 너무 장황하고 가독성이 떨어진다고 판단되어 거부되었습니다.
*   **해시 포함 (Include hash):** `direct-reference` 요구사항에 해시(hash)를 포함하는 아이디어. 이는 패키지 락 파일(lock-files)에만 해당되며, 프로젝트 메타데이터에는 적합하지 않다고 판단되었습니다.
*   **각 extra에 대한 의존성 테이블 (Dependency tables for each extra):** `optional-dependencies`를 각 extra에 대한 의존성 테이블의 테이블로 만드는 아이디어 (테이블 이름이 extra 이름이 됨). 이는 `optional-dependencies`를 `dependencies`와 다른 유형으로 만들어 사용자에게 혼란을 주고 파싱하기 어렵게 만들 수 있어 거부되었습니다.
*   **환경 마커 키 (Environment marker keys):** 각 PEP 508 환경 마커를 요구사항의 키(또는 하위 테이블 키)로 만드는 아이디어. 이는 가독성과 파싱 용이성을 높일 수 있었지만, 더 많은 설계가 필요하다는 이유로 보류되었습니다.
*   **하나의 요구사항이 충족할 수 있는 여러 extras (Multiple extras which one requirement can satisfy):** `for-extra` 키를 `for-extras`로 바꾸고, 그 값을 요구사항이 충족하는 extras의 배열로 하는 아이디어. 이는 일부 중복을 줄이지만, 이 경우 중복은 어떤 extra가 어떤 의존성을 가지는지 명시적으로 보여주기 때문에 거부되었습니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되거나 CC0-1.0-Universal 라이선스(둘 중 더 자유로운 조건)에 따라 제공됩니다.
Source: https://github.com/python/peps/blob/main/peps/pep-0633.rst
Last modified: 2025-02-01 08:55:40 GMTI have browsed the content of PEP 0633. Now I need to translate and summarize it into Korean, following all the specified guidelines.

Here's my plan:
1.  **Rejection Notice**: Translate this first as it's crucial for understanding the PEP's status.
2.  **Abstract**: Translate the core idea.
3.  **Motivation**: Translate the reasons for proposing this PEP.
4.  **Rationale**: Translate the background and influences.
5.  **Specification**:
    *   Translate the `dependencies` section, including its format and value types.
    *   Translate the `Requirement table` details (keys, types, constraints).
    *   Translate the `optional-dependencies` section, including its format and value types, and the `for-extra` key.
6.  **Reference implementation**: Briefly explain its purpose and include the Python code snippet.
7.  **JSON Schema**: Briefly explain its purpose. (No need to include the full schema text).
8.  **Examples**: Translate and show a few key examples from "Compatibility Examples" to illustrate how the TOML format compares to PEP 508 strings for various dependency types (Version, URL, VCS, Environment Markers, Package Extras).
9.  **Rejected Ideas**: Summarize the key rejected ideas and their reasons.
10. **Copyright**: Translate the copyright notice.

Throughout the translation, I will pay close attention to:
*   **Professionalism and Terminology**: Using Python-specific terms correctly (e.g., PEP, TOML, `pyproject.toml`, `dependencies`, `optional-dependencies`, `extras`, `environment markers`, `VCS`).
*   **Korean/English Blending**: Using Korean where natural, keeping English for keywords/uncommon translations, or using both (e.g., `Generator (제너레이터)`). Keywords in code (`async`, `await`, `class`, `def`) and variable names are **not** to be translated.
*   **Readability**: Using Markdown headers, lists, and code blocks effectively.
*   **Accuracy and Completeness**: Ensuring no critical information is lost.
*   **Citations**: Adding `` to every sentence that refers to the browsed content.

Let's start the translation.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.