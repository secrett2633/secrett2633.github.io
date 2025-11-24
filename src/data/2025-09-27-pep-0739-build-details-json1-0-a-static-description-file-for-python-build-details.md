---
title: "[Accepted] PEP 739 - build-details.json1.0 — a static description file for Python build details"
excerpt: "Python Enhancement Proposal 739: 'build-details.json1.0 — a static description file for Python build details'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/739/
toc: true
toc_sticky: true
date: 2025-09-27 13:28:50+0900
last_modified_at: 2025-09-27 13:28:50+0900
published: true
---
> **원문 링크:** [PEP 739 - build-details.json1.0 — a static description file for Python build details](https://peps.python.org/pep-0739/)
>
> **상태:** Accepted | **유형:** Standards Track | **작성일:** 19-Dec-2023


## PEP 739 – `build-details.json` 1.0 — Python 빌드 세부 정보를 위한 정적 설명 파일

### 개요 (Abstract)
이 PEP는 Python 설치의 빌드 세부 정보를 포함하는 정적 설명 파일인 `build-details.json`을 소개합니다. 이 문서는 파일 형식 버전 1.0의 정의와 이 파일의 표준 위치를 지정합니다.

### 제안 배경 (Rationale)
Python 설치를 조사(introspect)할 때, 코드를 실행하는 것은 종종 바람직하지 않거나 불가능할 수 있습니다. 정적 설명 파일을 사용하면 인터프리터를 실행할 필요 없이 Python 설치의 다양한 빌드 세부 정보를 확인할 수 있습니다. 이는 교차 컴파일(cross-compilation), Python 런처(launchers) 등과 같은 사용 사례에 유용합니다.

### 범위 (Scope)
`build-details.json`은 설치 전체에 걸쳐 적용되는 파일입니다. 즉, Python 설치의 모든 환경에서 일정하게 유지되는 정보만 포함해야 합니다. `site-packages` 경로와 같이 Python 환경에 특정한 정보는 이 파일의 범위에 포함되지 않습니다. PEP 작성자들은 향후 PEP를 통해 정적 환경 설명 파일이 도입될 것으로 예상하고 있습니다.

### 명세 (Specification)
Python 3.14부터 이 PEP 또는 향후 버전에서 지정된 형식을 따르는 `build-details.json`이라는 파일이 플랫폼 독립적인 표준 라이브러리 디렉터리(예: `/usr/lib/python3.14/build-details.json`)에 설치되어야 합니다. 단, 기술적인 제약으로 인해 불가능한 경우는 예외입니다.

**주의사항 (Attention)**
이 PEP에서 지정한 표준 위치 외에도, `build-details.json` 파일은 추가적인 위치에 다른 이름으로 설치될 수 있습니다. 그럼에도 불구하고, 파일은 표준 위치에서 계속 사용할 수 있어야 합니다. 실제로 PEP 작성자들은 향후 PEP에서 더 나은 검색 가능성을 가진 추가 설치 위치를 정의할 것으로 예상합니다.

### 형식 (Format)
형식 명세는 아래 제공된 JSON Schema 정의에 의해 정의되며, 여기서는 사람이 읽을 수 있는 형식으로 렌더링됩니다.

*   `$schema`: `https://json-schema.org/draft/2020-12/schema`
*   `$id`: `https://github.com/python/peps/blob/main/peps/pep-0739/python-build-info-v1.0.schema.json`
*   `Title`: `build-details.json` — Python 설치의 빌드 세부 정보가 포함된 정적 설명 파일
*   `Type`: `object`
*   `Additional properties`: 허용되지 않음

#### `schema_version`
*   `Type`: `string` (상수 — `1.0`)
*   `Description`: 스키마 버전. `<MAJOR>.<MINOR>` 형식의 문자열이며, `<MAJOR>`와 `<MINOR>`는 패딩 없는 숫자이고 버전의 주(major) 및 부(minor) 구성 요소를 나타냅니다. 버전은 버전 문자열을 십진수로 해석하여 산술적으로 비교할 수 있습니다. 이 명세 버전의 경우, 이 값은 상수이며 `1.0`이어야 합니다. 향후 이 스키마의 버전은 더 높은 버전 번호를 사용해야 합니다. 향후 이 스키마의 버전은 역호환성이 있다고 판단되지 않는 한 다른 스키마 버전과 동일한 주 버전 구성 요소를 사용해서는 안 됩니다. 즉, 해석된 데이터의 의미가 달라지거나 새로운 명세에서 유효한 데이터가 이전 명세에서 유효하지 않게 되는 방식으로 현재 명세의 어떤 부분도 변경하거나 확장할 수 없습니다. (단, 추가 속성으로 인한 오류는 예외).
*   `Required`: `True`

#### `base_prefix`
*   `Type`: `string`
*   `Description`: Python 설치의 기본 접두사(base prefix). 절대 경로이거나 이 파일이 포함된 디렉터리에 대한 상대 경로입니다.
*   `Examples`: `/usr`, `../..` 등.
*   `Required`: `True`

#### `base_interpreter`
*   `Type`: `string`
*   `Description`: 기본 설치의 Python 인터프리터 경로. 절대 경로이거나 `base_prefix`에 대한 상대 경로입니다. 설치에 인터프리터 실행 파일이 제공되는 경우 이 필드가 있어야 합니다.
*   `Examples`: `/usr/bin/python`, `bin/python` 등.
*   `Required`: `False`

#### `platform`
*   `Type`: `string`
*   `Description`: 시스템 플랫폼 문자열. 이 필드는 `sysconfig.get_platform()`과 동일해야 합니다.
*   `Examples`: `linux-x86_64` 등.
*   `Required`: `True`

#### `language`
*   `Type`: `object`
*   `Description`: Python 언어 명세와 관련된 세부 정보를 포함하는 객체.
*   `Required`: `True`
*   `Additional properties`: 허용되지 않음

##### `language.version`
*   `Type`: `string`
*   `Description`: Python 언어 버전의 문자열 표현 — 주(major) 및 부(minor) 구성 요소만으로 구성된 버전 문자열입니다. 이 필드는 `sysconfig.get_python_version()`과 동일해야 합니다.
*   `Examples`: `3.14` 등.
*   `Required`: `True`

##### `language.version_info`
*   `Type`: `object`
*   `Description`: `sys.version_info` 형식의 객체. 이 섹션은 `sys.version_info`와 동일해야 합니다.
*   `Examples`: `{'major': 3, 'minor': 14, 'micro': 1, 'releaselevel': 'final', 'serial': 0}` 등.
*   `Required`: `False`
*   `Additional properties`: 허용되지 않음

###### `language.version_info.major`
*   `Type`: `number`
*   `Required`: `True`

###### `language.version_info.minor`
*   `Type`: `number`
*   `Required`: `True`

###### `language.version_info.micro`
*   `Type`: `number`
*   `Required`: `True`

###### `language.version_info.releaselevel`
*   `Type`: `string` (enum — `alpha`, `beta`, `candidate`, `final`)
*   `Required`: `True`

###### `language.version_info.serial`
*   `Type`: `number`
*   `Required`: `True`

#### `implementation`
*   `Type`: `object`
*   `Description`: Python 구현(implementation)과 관련된 세부 정보를 포함하는 객체. 이 섹션은 `sys.implementation`과 동일해야 합니다. PEP 421에 정의된 명세를 따르며, 이는 필수 키 외에 구현별 키도 존재할 수 있지만 밑줄로 접두사를 붙여야 함을 의미합니다.
*   `Required`: `True`
*   `Additional properties`: 허용

##### `implementation.name`
*   `Type`: `string`
*   `Description`: Python 구현의 소문자 이름.
*   `Examples`: `cpython`, `pypy` 등.
*   `Required`: `True`

##### `implementation.version`
*   `Type`: `object`
*   `Description`: `sys.version_info` 형식의 객체로, 구현 버전을 포함합니다.
*   `Examples`:
    *   `{'major': 3, 'minor': 14, 'micro': 1, 'releaselevel': 'final', 'serial': 0}`
    *   `{'major': 7, 'minor': 3, 'micro': 16, 'releaselevel': 'final', 'serial': 0}` 등.
*   `Required`: `True`
*   `Additional properties`: 허용되지 않음

###### `implementation.version.major`
*   `Type`: `number`
*   `Required`: `True`

###### `implementation.version.minor`
*   `Type`: `number`
*   `Required`: `True`

###### `implementation.version.micro`
*   `Type`: `number`
*   `Required`: `True`

###### `implementation.version.releaselevel`
*   `Type`: `string` (enum — `alpha`, `beta`, `candidate`, `final`)
*   `Required`: `True`

###### `implementation.version.serial`
*   `Type`: `number`
*   `Required`: `True`

#### `abi`
*   `Type`: `object`
*   `Description`: ABI(Application Binary Interface)와 관련된 세부 정보를 포함하는 객체.
*   `Required`: `False`
*   `Additional properties`: 허용되지 않음

##### `abi.flags`
*   `Type`: `array`
*   `Description`: 확장자 접미사를 계산하는 데 사용되는 빌드 구성 플래그. 플래그는 확장자 접미사에 나타나는 순서대로 정의되어야 합니다.
*   `Examples`: `['t', 'd']` 등.
*   `Required`: `True`

##### `abi.extension_suffix`
*   `Type`: `string`
*   `Description`: 현재 구현 버전으로 빌드된 확장자에 사용되는 접미사. Python 구현이 확장을 지원하는 경우 이 필드가 있어야 하며, 그렇지 않으면 이 항목은 누락됩니다.
*   `Examples`: `.cpython-314-x86_64-linux-gnu.so` 등.
*   `Required`: `False`

##### `abi.stable_abi_suffix`
*   `Type`: `string`
*   `Description`: Stable ABI(안정적인 ABI)에 대해 빌드된 확장자에 사용되는 접미사. Python 구현에 안정적인 ABI 확장자 접미사가 있는 경우 이 필드가 있어야 하며, 그렇지 않으면 이 항목은 누락됩니다.
*   `Examples`: `.abi3.so` 등.
*   `Required`: `False`

#### `suffixes`
*   `Type`: `object`
*   `Description`: 유형별로 그룹화된 유효한 모듈 접미사. Python 설치가 외부 파일 가져오기(importing external files)를 지원하는 경우 이 섹션이 있어야 하며, `importlib.machinery.*_SUFFIXES` 속성과 동일해야 합니다. 또한, Python 구현이 `importlib.machinery` 모듈에 나열된 것 외에 다른 확장 유형을 제공하는 경우 해당 유형에 대한 하위 섹션을 추가할 수 있습니다.
*   `Examples`:
    ```json
    {
      "source": [".py"],
      "bytecode": [".pyc"],
      "optimized_bytecode": [".pyc"],
      "debug_bytecode": [".pyc"],
      "extensions": [".cpython-313-x86_64-linux-gnu.so", ".abi3.so", ".so"]
    }
    ```
*   `Required`: `False`
*   `Additional properties`: 허용

#### `libpython`
*   `Type`: `object`
*   `Description`: `libpython` 라이브러리와 관련된 세부 정보를 포함하는 객체. Python 설치가 `libpython` 라이브러리를 제공하는 경우 이 섹션이 있어야 하며, 그렇지 않으면 이 섹션은 누락됩니다.
*   `Required`: `False`
*   `Additional properties`: 허용되지 않음

##### `libpython.dynamic`
*   `Type`: `string`
*   `Description`: 동적 `libpython` 라이브러리 경로. 절대 경로이거나 `base_prefix`에 대한 상대 경로입니다. Python 설치가 동적 `libpython` 라이브러리를 제공하는 경우 이 필드가 있어야 하며, 그렇지 않으면 이 항목은 누락됩니다.
*   `Examples`: `/usr/lib/libpython3.14.so.1.0`, `lib/libpython3.14.so.1.0` 등.
*   `Required`: `False`

##### `libpython.dynamic_stableabi`
*   `Type`: `string`
*   `Description`: 안정적인 ABI(Stable ABI)를 위한 동적 `libpython` 라이브러리 경로. 절대 경로이거나 `base_prefix`에 대한 상대 경로입니다. Python 설치가 Stable ABI를 대상으로 하는 동적 `libpython` 라이브러리를 제공하는 경우 이 필드가 있어야 하며, 그렇지 않으면 이 항목은 누락됩니다. 이 키가 존재하는 경우 `dynamic`도 설정되어야 합니다.
*   `Examples`: `/usr/lib/libpython3.so`, `lib/libpython3.so` 등.
*   `Required`: `False`

##### `libpython.static`
*   `Type`: `string`
*   `Description`: 정적 `libpython` 라이브러리 경로. 절대 경로이거나 `base_prefix`에 대한 상대 경로입니다. Python 설치가 정적 `libpython` 라이브러리를 제공하는 경우 이 필드가 있어야 하며, 그렇지 않으면 이 항목은 누락됩니다.
*   `Examples`: `/usr/lib/python3.14/config-3.14-x86_64-linux-gnu/libpython3.14.a`, `lib/python3.14/config-3.14-x86_64-linux-gnu/libpython3.14.a` 등.
*   `Required`: `False`

##### `libpython.link_extensions`
*   `Type`: `boolean`
*   `Description`: 동적 `libpython`에 대해 빌드된 확장자가 이에 연결되어야 하는지 여부. Python 설치가 동적 `libpython` 라이브러리를 제공하는 경우 이 필드가 있어야 하며, 그렇지 않으면 이 항목은 누락됩니다.
*   `Required`: `False`

#### `c_api`
*   `Type`: `object`
*   `Description`: Python C API와 관련된 세부 정보를 포함하는 객체. Python 구현이 C API를 제공하는 경우 이 섹션이 있어야 하며, 그렇지 않으면 이 섹션은 누락됩니다.
*   `Required`: `False`
*   `Additional properties`: 허용되지 않음

##### `c_api.headers`
*   `Type`: `string`
*   `Description`: C API 헤더 경로. 절대 경로이거나 `base_prefix`에 대한 상대 경로입니다.
*   `Examples`: `/usr/include/python3.14`, `include/python3.14` 등.
*   `Required`: `True`

##### `c_api.pkgconfig_path`
*   `Type`: `string`
*   `Description`: `pkg-config` 정의 파일 경로. 절대 경로이거나 `base_prefix`에 대한 상대 경로입니다. Python 구현이 `pkg-config` 정의 파일을 제공하는 경우 이 필드가 있어야 하며, 그렇지 않으면 이 섹션은 누락됩니다.
*   `Examples`: `/usr/lib/pkgconfig`, `lib/pkgconfig` 등.
*   `Required`: `False`

#### `arbitrary_data`
*   `Type`: `object`
*   `Description`: 추가 임의 데이터(extra arbitrary data)를 포함하는 객체. 이는 이 명세에 포함되지 않은 모든 관련 데이터를 포함하기 위한 비상 탈출구(escape-hatch) 역할을 합니다. 구현자는 이 섹션에 어떤 데이터를 제공할지 선택할 수 있습니다.
*   `Required`: `False`
*   `Additional properties`: 허용

### 예시 (Example)
```json
{
  "schema_version": "1.0",
  "base_prefix": "/usr",
  "base_interpreter": "/usr/bin/python",
  "platform": "linux-x86_64",
  "language": {
    "version": "3.14",
    "version_info": {
      "major": 3,
      "minor": 14,
      "micro": 0,
      "releaselevel": "alpha",
      "serial": 0
    }
  },
  "implementation": {
    "name": "cpython",
    "version": {
      "major": 3,
      "minor": 14,
      "micro": 0,
      "releaselevel": "alpha",
      "serial": 0
    },
    "hexversion": 51249312,
    "cache_tag": "cpython-314",
    "_multiarch": "x86_64-linux-gnu"
  },
  "abi": {
    "flags": ["t", "d"],
    "extension_suffix": ".cpython-314-x86_64-linux-gnu.so",
    "stable_abi_suffix": ".abi3.so"
  },
  "suffixes": {
    "source": [".py"],
    "bytecode": [".pyc"],
    "optimized_bytecode": [".pyc"],
    "debug_bytecode": [".pyc"],
    "extensions": [".cpython-314-x86_64-linux-gnu.so", ".abi3.so", ".so"]
  },
  "libpython": {
    "dynamic": "/usr/lib/libpython3.14.so.1.0",
    "dynamic_stableabi": "/usr/lib/libpython3.so",
    "static": "/usr/lib/python3.14/config-3.14-x86_64-linux-gnu/libpython3.14.a",
    "link_extensions": true
  },
  "c_api": {
    "headers": "/usr/include/python3.14",
    "pkgconfig_path": "/usr/lib/pkgconfig"
  }
}
```

### 기각된 아이디어 (Rejected Ideas)

#### 환경별 데이터 포함 (Including environment-specific data)
이 PEP 논의에서 주요 요청 중 하나는 `site-packages` 경로와 같은 다른 종류의 정보 포함이었습니다. PEP 작성자들은 Python 환경에 관한 정보는 별도의 파일로 제공되어야 한다고 판단했습니다.

환경별 데이터를 구성 파일에 포함한다는 것은 해당 파일이 환경에 종속적이라는 의미이며, 가상 환경(virtual environments)은 자체 구성 파일이 필요하게 됩니다. 이는 가상 환경이 기본 Python 설치 업데이트 후에도 유지되므로, 정적 구성 파일이 오래되어 데이터가 신뢰할 수 없게 될 가능성을 만들고, 그 목적을 저해한다는 문제가 있습니다.

제안된 해결책은 이 PEP에서 부분적으로 구현되었으며, 기본 Python 설치와 관련된 `build-details.json` 파일과 특정 환경과 관련된 `environment.json` 파일을 갖는 것입니다.

`build-details.json`이 Python 배포의 일부가 됨에 따라, 기본 Python 설치가 업데이트될 때 `build-details.json`도 함께 업데이트되어 정적 설명 파일이 절대 오래되지 않도록 보장합니다.

### 저작권 (Copyright)
이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 관대한 조건에 따라 제공됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.