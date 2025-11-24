---
title: "[Superseded] PEP 631 - Dependency specification in pyproject.toml based on PEP 508"
excerpt: "Python Enhancement Proposal 631: 'Dependency specification in pyproject.toml based on PEP 508'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/631/
toc: true
toc_sticky: true
date: 2025-09-27 01:15:39+0900
last_modified_at: 2025-09-27 01:15:39+0900
published: true
---
> **원문 링크:** [PEP 631 - Dependency specification in pyproject.toml based on PEP 508](https://peps.python.org/pep-0631/)
>
> **상태:** Superseded | **유형:** Standards Track | **작성일:** 20-Aug-2020

## PEP 631: `pyproject.toml`을 통한 의존성 명세 (PEP 508 기반)

**작성자:** Ofek Lev
**스폰서:** Paul Ganssle
**상태:** Superseded (대체됨) - PEP 621에 병합됨
**주제:** 패키징
**생성일:** 2020년 8월 20일

### 초록 (Abstract)
이 PEP는 패키징 관련 도구들이 PEP 621에 정의된 필드를 사용하여 `pyproject.toml` 파일에 프로젝트의 의존성(dependencies)을 어떻게 작성할지 명세합니다.

**참고:** 이 PEP는 승인되었으며 PEP 621에 병합되었습니다.

### 엔트리 (Entries)
모든 의존성 엔트리는 유효한 PEP 508 문자열이어야 합니다. 빌드 백엔드(Build backends)는 파싱(parsing) 오류 발생 시 로드 타임에 중단(abort)해야 합니다.

```python
from packaging.requirements import InvalidRequirement, Requirement

# ...

try:
    Requirement(entry)
except InvalidRequirement:
    # exit
```


### 명세 (Specification)

#### `dependencies`
*   **형식:** 문자열 배열 (array of strings)
*   **관련 코어 메타데이터:** `Requires-Dist`
*   모든 요소는 엔트리(entry)여야 합니다.

```toml
[project]
dependencies = [
    'PyYAML ~= 5.0',
    'requests[security] < 3',
    'subprocess32; python_version < "3.2"',
]
```


#### `optional-dependencies`
*   **형식:** 테이블 (table)
*   **관련 코어 메타데이터:** `Provides-Extra`, `Requires-Dist`
*   각 키(key)는 제공되는 옵션의 이름이며, 각 값은 `dependencies` 필드와 동일한 타입(문자열 배열)입니다.

```toml
[project.optional-dependencies]
tests = [
    'coverage>=5.0.3',
    'pytest',
    'pytest-benchmark[histogram]>=3.2.1',
]
```


### 예시 (Example)
다음은 `docker-compose`의 실제 정의를 포팅(porting)한 예시입니다.

```toml
[project]
dependencies = [
    'cached-property >= 1.2.0, < 2',
    'distro >= 1.5.0, < 2',
    'docker[ssh] >= 4.2.2, < 5',
    'dockerpty >= 0.4.1, < 1',
    'docopt >= 0.6.1, < 1',
    'jsonschema >= 2.5.1, < 4',
    'PyYAML >= 3.10, < 6',
    'python-dotenv >= 0.13.0, < 1',
    'requests >= 2.20.0, < 3',
    'texttable >= 0.9.0, < 2',
    'websocket-client >= 0.32.0, < 1',
    # Conditional (조건부 의존성)
    'backports.shutil_get_terminal_size == 1.0.0; python_version < "3.3"',
    'backports.ssl_match_hostname >= 3.5, < 4; python_version < "3.5"',
    'colorama >= 0.4, < 1; sys_platform == "win32"',
    'enum34 >= 1.0.4, < 2; python_version < "3.4"',
    'ipaddress >= 1.0.16, < 2; python_version < "3.3"',
    'subprocess32 >= 3.5.4, < 4; python_version < "3.2"',
]

[project.optional-dependencies]
socks = [
    'PySocks >= 1.5.6, != 1.5.7, < 2'
]
tests = [
    'ddt >= 1.2.2,  2 <', # Note: This line has a typo in the original PEP. It should be '< 2'
    'pytest < 6',
    'mock >= 1.0.1, < 4; python_version < "3.4"',
]
```


### 구현 (Implementation)

#### 파싱 (Parsing)
의존성(dependencies) 및 선택적 의존성(optional-dependencies) 필드를 파싱하는 예시 Python 코드는 다음과 같습니다. `packaging.requirements` 모듈을 사용하여 의존성 문자열의 유효성을 검사합니다.

```python
from packaging.requirements import InvalidRequirement, Requirement

def parse_dependencies(config):
    dependencies = config.get('dependencies', [])
    if not isinstance(dependencies, list):
        raise TypeError('Field `project.dependencies` must be an array')
    for i, entry in enumerate(dependencies, 1):
        if not isinstance(entry, str):
            raise TypeError(f'Dependency #{i} of field `project.dependencies` must be a string')
        try:
            Requirement(entry)
        except InvalidRequirement as e:
            raise ValueError(f'Dependency #{i} of field `project.dependencies` is invalid: {e}')
    return dependencies

def parse_optional_dependencies(config):
    optional_dependencies = config.get('optional-dependencies', {})
    if not isinstance(optional_dependencies, dict):
        raise TypeError('Field `project.optional-dependencies` must be a table')
    optional_dependency_entries = {}
    for option, dependencies in optional_dependencies.items():
        if not isinstance(dependencies, list):
            raise TypeError(
                f'Dependencies for option `{option}` of field '
                '`project.optional-dependencies` must be an array'
            )
        entries = []
        for i, entry in enumerate(dependencies, 1):
            if not isinstance(entry, str):
                raise TypeError(
                    f'Dependency #{i} of option `{option}` of field '
                    '`project.optional-dependencies` must be a string'
                )
            try:
                Requirement(entry)
            except InvalidRequirement as e:
                raise ValueError(
                    f'Dependency #{i} of option `{option}` of field '
                    f'`project.optional-dependencies` is invalid: {e}'
                )
            else:
                entries.append(entry)
        optional_dependency_entries[option] = entries
    return optional_dependency_entries
```


#### 메타데이터 (Metadata)
이 섹션은 `pyproject.toml`에 명시된 의존성 정보가 `.dist-info/METADATA` 파일의 코어 메타데이터(core metadata) 필드(예: `Requires-Dist`, `Provides-Extra`)로 어떻게 변환되는지를 보여줍니다.

```python
def construct_metadata_file(metadata_object):
    """
    https://packaging.python.org/specifications/core-metadata/
    """
    metadata_file = 'Metadata-Version: 2.1\n'
    # ...
    if metadata_object.dependencies:
        # Sort dependencies to ensure reproducible builds
        for dependency in sorted(metadata_object.dependencies):
            metadata_file += f'Requires-Dist: {dependency}\n'

    if metadata_object.optional_dependencies:
        # Sort extras and dependencies to ensure reproducible builds
        for option, dependencies in sorted(metadata_object.optional_dependencies.items()):
            metadata_file += f'Provides-Extra: {option}\n'
            for dependency in sorted(dependencies):
                if ';' in dependency:
                    metadata_file += f'Requires-Dist: {dependency} and extra == "{option}"\n'
                else:
                    metadata_file += f'Requires-Dist: {dependency}; extra == "{option}"\n'
    # ...
    return metadata_file
```


### 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain)에 있거나 CC0-1.0-Universal 라이선스(두 라이선스 중 더 관대한 쪽) 하에 제공됩니다.```


### 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain)에 있거나 CC0-1.0-Universal 라이선스(두 라이선스 중 더 관대한 쪽) 하에 제공됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.