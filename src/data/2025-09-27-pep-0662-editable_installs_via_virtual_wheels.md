---
title: "[Rejected] PEP 662 - Editable installs via virtual wheels"
excerpt: "Python Enhancement Proposal 662: 'Editable installs via virtual wheels'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/662/
toc: true
toc_sticky: true
date: 2025-09-27 09:56:52+0900
last_modified_at: 2025-09-27 09:56:52+0900
published: true
---
> **원문 링크:** [PEP 662 - Editable installs via virtual wheels](https://peps.python.org/pep-0662/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 28-May-2021

## PEP 662 – 가상 휠(Virtual Wheels)을 통한 편집 가능 설치 (Editable Installs)

### 개요 (Abstract)
이 문서는 PEP 517에서 도입된 빌드 백엔드(build backend)와 프론트엔드(frontend) 간의 통신을 확장하여, 가상 휠(virtual wheels)을 통해 프로젝트를 편집 가능 모드(editable mode)로 설치할 수 있도록 하는 내용을 설명합니다.

### 동기 (Motivation)
개발 과정에서 많은 Python 사용자들은 소스 코드나 리소스 변경 사항이 추가적인 설치 단계 없이 즉시 인터프리터에 반영되는 방식으로 라이브러리를 설치하는 것을 선호합니다. 이를 "개발 모드(development mode)" 또는 "편집 가능 설치(editable installs)"라고 부릅니다. 현재까지 이를 표준화된 방식으로 처리하는 방법은 없었으며, PEP 517에서도 실제 관찰되는 복잡성 때문에 명시적으로 제외되었습니다.

현재는 다음 방법 중 하나로 이 기능을 구현하고 있습니다:
*   **Python 코드만 해당:** `PYTHONPATH` 환경 변수를 통해 관련 소스 디렉터리를 `sys.path`에 추가합니다. 이 경우 프로젝트 의존성은 사용자가 직접 설치해야 하며, 엔트리 포인트(entry points)나 프로젝트 메타데이터는 생성되지 않습니다.
*   **setuptools의 `setup.py develop`:** `pth` 파일을 설치하여 인터프리터 시작 시 프로젝트 루트를 `sys.path`에 주입하고, 프로젝트 메타데이터를 생성하며, 프로젝트 의존성도 설치합니다. `pip install -e` 명령이 이 메커니즘을 사용합니다.
*   **flit의 `flit install --symlink`:** 프로젝트 파일을 인터프리터의 `purelib` 폴더에 심볼릭 링크(symlink)하고, 프로젝트 메타데이터와 의존성을 설치합니다. 이는 리소스 파일도 지원합니다.

이러한 예시들은 편집 가능 설치가 다양한 방식으로 이루어질 수 있으며, 현재 표준화된 방법이 없음을 보여줍니다. 또한, 편집 가능 설치의 정의와 구현 책임이 누구에게 있는지 불분명합니다.

*   빌드 백엔드가 정의하고 구현하는 방식
*   빌드 프론트엔드가 정의하고 구현하는 방식
*   가능한 옵션 중 하나의 방법을 명시적으로 정의하고 표준화하는 방식

이 PEP의 저자는 모든 상황에 맞는 단일 해결책은 없다고 보며, 각 방법마다 장단점이 있다고 생각합니다. 따라서 세 번째 옵션(단일 솔루션 표준화)은 커뮤니티가 동의하기 어려울 것이므로 거부합니다. PEP 660은 빌드 백엔드가 이 책임을 맡아야 한다고 제안하는 반면, 이 PEP는 주로 프론트엔드에 책임을 부여하되, 백엔드가 원한다면 제어권을 가져갈 수 있도록 합니다.

### 근거 (Rationale)
PEP 517은 "편집 가능 설치"를 연기했는데, 이는 채택을 더 늦출 수 있었고 편집 가능 설치를 달성하는 방법에 대한 합의가 없었기 때문입니다. setuptools와 pip 프로젝트의 인기로 인해 현상 유지가 되었으며, 백엔드는 `setup.py develop` 구현을 제공하여 편집 가능 모드를 달성할 수 있었고, 사용자는 `pip install -e`를 통해 이를 트리거할 수 있었습니다. 빌드 백엔드와 프론트엔드 사이에 편집 가능한 인터페이스를 정의함으로써, `setup.py` 파일과 현재의 통신 방식을 제거할 수 있습니다.

### 용어 및 목표 (Terminology and goals)
이 PEP는 프론트엔드와 백엔드의 역할을 명확히 구분하고, 각 개발자가 사용자에게 가치 있는 기능을 제공할 수 있도록 최대한의 역량을 부여하는 것을 목표로 합니다. 이 제안에서 백엔드의 역할은 편집 가능 설치를 위해 프로젝트를 준비하고, 프론트엔드가 편집 가능 설치를 실현하고 적용하는 데 필요한 충분한 정보를 제공하는 것입니다.

백엔드가 프론트엔드에 제공하는 정보는 PEP 427의 기존 사양을 따르는 휠(wheel)입니다. 아카이브 자체에 대한 휠 메타데이터(`{distribution}-{version}.dist-info/WHEEL`)는 `Editable` 키와 `true` 값을 포함해야 합니다. 그러나 프로젝트 파일을 휠 내에 제공하는 대신, 프론트엔드가 노출할 파일을 정의하는 `editable.json` 파일을 (휠의 루트 레벨에) 제공해야 합니다. 이 파일의 내용은 스키마 매핑 내에서 절대 소스 트리 경로를 상대 대상 인터프리터 목적지 경로에 매핑하는 방식으로 구성됩니다.

위 두 단락을 만족하는 휠을 **가상 휠(virtual wheel)**이라고 합니다. 프론트엔드의 역할은 가상 휠을 가져와 프로젝트를 편집 가능 모드로 설치하는 것입니다. 이를 달성하는 방법은 전적으로 프론트엔드에 달려 있으며 구현 세부 사항으로 간주됩니다.

편집 가능 설치 모드는 설치될 프로젝트의 소스 코드가 로컬 디렉터리에 있음을 의미합니다. 프로젝트가 편집 가능 모드로 설치되면, 로컬 소스 트리 내의 프로젝트 코드에 대한 일부 변경 사항은 새로운 설치 단계 없이 다음 패키지 임포트 시 반영됩니다. 최소한 설치 시점에 존재했던 비생성(non-generated) 파일의 텍스트 변경 사항은 후속 패키지 임포트 시 반영되어야 합니다.

엔트리 포인트 추가 또는 수정, 새로운 의존성 추가와 같은 일부 변경 사항은 적용을 위해 새로운 설치 단계를 필요로 합니다. 이러한 변경 사항은 일반적으로 `pyproject.toml`과 같은 빌드 백엔드 구성 파일에서 이루어집니다. 이 요구 사항은 이러한 수정 사항이 재설치 후에만 적용될 것이라는 일반적인 사용자 기대와 일치합니다.

사용자는 편집 가능 설치가 표준 설치와 동일하게 작동할 것으로 기대하지만, 항상 가능하지 않을 수 있으며 다른 사용자 기대와 충돌할 수 있습니다. 프론트엔드가 편집 가능 모드를 어떻게 구현하느냐에 따라, (일반적인 설치와 비교하여) 소스 트리나 인터프리터의 설치 경로에 추가 파일이 존재할 수 있는 등 일부 차이가 나타날 수 있습니다. 프론트엔드는 편집 가능 설치와 표준 설치의 동작 차이를 최소화하고 알려진 차이점을 문서화해야 합니다.

참고로, 비편집 가능 설치는 다음과 같이 작동합니다:
1.  개발자는 프로젝트 개발을 위해 도구(예: pip)를 사용합니다. 이를 프론트엔드라고 합니다.
2.  사용자가 프로젝트의 패키지 빌드 및 설치를 트리거하면 프론트엔드와 통신합니다.
3.  프론트엔드는 빌드 프론트엔드(예: build)를 사용하여 휠 빌드를 트리거합니다.
4.  빌드 프론트엔드는 PEP 517을 사용하여 (PEP 518 환경에 설치된) 빌드 백엔드(예: setuptools)와 통신합니다.
5.  호출되면 백엔드는 휠을 반환합니다.
6.  프론트엔드는 휠을 가져와 인스톨러(예: installer)에 전달하여 대상 Python 인터프리터에 휠을 설치합니다.

### 메커니즘 (The Mechanism)
이 PEP는 PEP 517 백엔드 인터페이스에 두 개의 선택적 훅(hook)을 추가합니다. 하나는 편집 가능 설치의 빌드 의존성을 지정하는 데 사용되고, 다른 하나는 빌드 프론트엔드를 통해 프론트엔드가 편집 가능 설치를 생성하는 데 필요한 정보를 반환합니다.

#### `get_requires_for_build_editable`

```python
def get_requires_for_build_editable(config_settings=None): ...
```
이 훅은 `pyproject.toml` 파일에 지정된 것 외에, PEP 508 의존성 사양을 포함하는 추가 문자열 시퀀스를 반환해야 합니다. 프론트엔드는 `build_editable` 훅이 호출되는 빌드 환경에서 이러한 의존성이 사용 가능하도록 보장해야 합니다. 정의되지 않은 경우, 기본 구현은 `[]`을 반환하는 것과 동일합니다.

#### `prepare_metadata_for_build_editable`

```python
def prepare_metadata_for_build_editable(metadata_directory, config_settings=None): ...
```
지정된 `metadata_directory` 내에 휠 메타데이터를 포함하는 `.dist-info` 디렉터리(예: `{metadata_directory}/{package}-{version}.dist-info/`)를 생성해야 합니다. 이 디렉터리는 휠 사양에 정의된 유효한 `.dist-info` 디렉터리여야 하지만, `RECORD` 또는 서명(signatures)을 포함할 필요는 없습니다. 훅은 이 디렉터리 내에 다른 파일도 생성할 수 있으며, 빌드 프론트엔드는 이러한 파일을 보존해야 하지만 무시해야 합니다. 이는 메타데이터가 빌드 시간 결정에 의존하는 경우, 빌드 백엔드가 실제 휠 빌드 단계에서 재사용할 수 있도록 이러한 결정을 편리한 형식으로 기록해야 할 수 있기 때문입니다.

이 훅은 생성하는 `.dist-info` 디렉터리의 베이스 이름(전체 경로가 아닌)을 유니코드 문자열로 반환해야 합니다. 빌드 프론트엔드가 이 정보가 필요하고 메서드가 정의되지 않은 경우, `build_editable`을 호출하고 결과 메타데이터를 직접 확인해야 합니다.

#### `build_editable`

```python
def build_editable(self, wheel_directory, config_settings=None, metadata_directory=None): ...
```
`.whl` 파일을 빌드하고 지정된 `wheel_directory`에 배치해야 합니다. 생성하는 `.whl` 파일의 베이스 이름(전체 경로가 아닌)을 유니코드 문자열로 반환해야 합니다. 휠 파일은 용어 섹션에 정의된 가상 휠 유형이어야 합니다.

빌드 프론트엔드가 이전에 `prepare_metadata_for_build_editable`을 호출했으며, 이 호출로 인해 생성된 휠이 이전 호출과 일치하는 메타데이터를 가져야 한다면, 생성된 `.dist-info` 디렉터리의 경로를 `metadata_directory` 인수로 제공해야 합니다. 이 인수가 제공되면 `build_editable`은 동일한 메타데이터를 가진 휠을 생성해야 합니다. 빌드 프론트엔드가 전달하는 디렉터리는 `prepare_metadata_for_build_editable`이 생성한 디렉터리와, 생성된 인식되지 않는 파일을 포함하여 동일해야 합니다.

`prepare_metadata_for_build_editable` 훅을 제공하지 않는 백엔드는 `build_editable`의 `metadata_directory` 매개변수를 자동으로 무시하거나, `None`이 아닌 값으로 설정될 때 예외를 발생시킬 수 있습니다.

소스 디렉터리는 읽기 전용일 수 있으며, 이러한 경우 백엔드는 프론트엔드가 사용자에게 표시할 수 있는 오류를 발생시킬 수 있습니다. 백엔드는 중간 아티팩트(intermediate artifacts)를 캐시 위치 또는 임시 디렉터리에 저장할 수 있습니다. 캐시의 존재 여부는 빌드의 최종 결과에 실질적인 차이를 만들지 않아야 합니다.

`editable.json`의 내용은 다음 JSON 스키마를 준수해야 합니다:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema",
  "$id": "http://pypa.io/editables.json",
  "type": "object",
  "title": "Virtual wheel editable schema.",
  "required": ["version", "scheme"],
  "properties": {
    "version": {
      "$id": "#/properties/version",
      "type": "integer",
      "minimum": 1,
      "maximum": 1,
      "title": "The version of the schema."
    },
    "scheme": {
      "$id": "#/properties/scheme",
      "type": "object",
      "title": "Files to expose.",
      "required": ["purelib", "platlib", "data", "headers", "scripts"],
      "properties": {
        "purelib": { "$ref": "#/$defs/mapping" },
        "platlib": { "$ref": "#/$defs/mapping" },
        "data": { "$ref": "#/$defs/mapping" },
        "headers": { "$ref": "#/$defs/mapping" },
        "scripts": { "$ref": "#/$defs/mapping" }
      },
      "additionalProperties": true
    }
  },
  "additionalProperties": true,
  "$defs": {
    "mapping": {
      "type": "object",
      "description": "A mapping of source to target paths. The source is absolute path, the destination is relative path.",
      "additionalProperties": true
    }
  }
}
```

예시:

```json
{
  "version": 1,
  "scheme": {
    "purelib": {"/src/tree/a.py": "tree/a.py"},
    "platlib": {},
    "data": {"/src/tree/py.typed": "tree/py.typed"},
    "headers": {},
    "scripts": {}
  }
}
```

`scheme` 경로는 프로젝트 소스 절대 경로를 대상 디렉터리 상대 경로로 매핑합니다. 백엔드는 매핑을 사용하여 프로젝트 소스 디렉터리에서 인터프리터가 볼 레이아웃으로 변경할 수 있도록 합니다. 예를 들어, 백엔드가 `"purelib": {"/me/project/src": ""}`를 반환하면 `/me/project/src` 내의 모든 파일과 모듈을 대상 인터프리터 내 `purelib` 경로의 루트에 노출한다는 의미입니다.

### 빌드 프론트엔드 요구 사항 (Build frontend requirements)
빌드 프론트엔드는 가상 휠을 생성하기 위한 빌드 백엔드 환경을 설정할 책임이 있습니다. PEP 517의 `build_wheel` 훅에 대한 모든 권장 사항이 여기에도 적용됩니다.

### 프론트엔드 요구 사항 (Frontend requirements)
프론트엔드는 가상 휠을 PEP 427에 정의된 대로 정확하게 설치해야 합니다. 또한 `editable.json` 파일에 정의된 파일도 설치할 책임이 있습니다. 이를 수행하는 방식은 프론트엔드에 달려 있으며, 선택된 방법과 그 해결책의 한계를 사용자에게 정확히 전달하도록 권장됩니다.

프론트엔드는 PEP 610을 준수하여 설치된 배포판의 `.dist-info` 디렉터리에 `direct_url.json` 파일을 생성해야 합니다. `url` 값은 프로젝트 디렉터리(`pyproject.toml`을 포함하는 디렉터리)를 가리키는 `file://` URL이어야 하며, `dir_info` 값은 `{'editable': true}`여야 합니다.

프론트엔드는 편집 가능 모드로 설치할 때 `prepare_metadata_for_build_editable` 훅에 의존할 수 있습니다. 프론트엔드가 빌드 백엔드가 제공한 정보로 편집 가능 설치를 달성할 수 없다고 판단하면, 실패하고 사용자에게 이유를 명확히 설명하는 오류를 발생시켜야 합니다.

프론트엔드는 하나 이상의 편집 가능 설치 메커니즘을 구현할 수 있으며, 사용자가 사용 사례에 최적인 것을 선택하도록 할 수 있습니다. 예를 들어, pip는 편집 가능 모드 플래그를 추가하고, 사용자가 `pth` 파일 또는 심볼릭 링크 중에서 선택할 수 있도록 할 수 있습니다 (`pip install -e . --editable-mode=pth` vs `pip install -e . --editable-mode=symlink`).

### 편집 가능 구현 예시 (Example editable implementations)
이 PEP가 어떻게 사용될 수 있는지 보여주기 위해 몇 가지 사례 연구를 제시합니다. 제시된 해결책은 순전히 설명을 위한 것이며 프론트엔드/백엔드에 규범적인 것은 아닙니다.

#### 소스 트리를 인터프리터에 그대로 추가 (Add the source tree as is to the interpreter)
이것은 가장 간단한 구현 중 하나로, 소스 트리를 인터프리터 스키마 경로에 그대로 추가합니다. 가상 휠 내의 `editable.json`은 다음과 같을 수 있습니다:

```json
{
  "version": 1,
  "scheme": {
    "purelib": {
      "<project dir>": "<project dir>"
    }
  }
}
```

그러면 프론트엔드는 다음 중 하나를 수행할 수 있습니다:
*   인터프리터 시작 시 대상 인터프리터의 `sys.path`에 소스 디렉터리를 추가합니다. 이는 대상 인터프리터의 `purelib` 폴더에 `pth` 파일을 생성하여 수행됩니다. setuptools는 현재 이 작업을 수행하며 `pip install -e`가 변환되는 방식입니다. 이 해결책은 빠르고 크로스 플랫폼 호환됩니다. 그러나 이것은 전체 소스 트리를 시스템에 노출시키므로, 표준 설치 사례에서는 사용할 수 없는 모듈을 잠재적으로 노출할 수 있습니다.
*   폴더 또는 그 안의 개별 파일을 심볼릭 링크합니다. 이 방법은 flit이 `flit install --symlink`를 통해 수행하는 방식입니다. 이 해결책은 심볼릭 링크를 지원하는 현재 플랫폼이 필요합니다. 그러나 개별 파일을 심볼릭 링크할 수 있으므로, 소스 트리에서 제외되어야 하는 파일을 포함하는 문제를 해결할 수 있습니다.

#### 사용자 정의 임포터 사용 (Using custom importers)
빌드 백엔드와 대상 인터프리터 간의 보다 견고하고 동적인 협업을 위해, 사용자 정의 임포터(custom importers) 등록을 허용하는 임포트 시스템을 활용할 수 있습니다. 자세한 내용은 PEP 302와 editables를 참조하십시오. 백엔드는 편집 가능 빌드 중에 새 임포터를 생성하거나 (추가 의존성으로 설치) `pth` 파일을 추가하여 인터프리터 시작 시 등록할 수 있습니다.

```json
{
  "version": 1,
  "scheme": {
    "purelib": {
      "<project dir>/.editable/_register_importer.pth": "<project dir>/_register_importer.pth",
      "<project dir>/.editable/_editable_importer.py": "<project dir>/_editable_importer.py"
    }
  }
}
```

여기서 백엔드는 새 모듈이 임포트될 때마다 호출되는 훅을 등록하여 동적이고 온디맨드(on-demand) 기능을 허용합니다. 이것이 유용한 잠재적 사용 사례는 다음과 같습니다:
*   **소스 폴더 노출, 모듈 제외 준수:** 백엔드는 소스 파일 로더가 소스 디렉터리에서 파일을 검색할지 여부를 결정하기 전에 제외 테이블을 참조하는 임포트 훅을 생성할 수 있습니다.
*   **파일 병합:** 프로젝트에 `A.py`와 `B.py` 두 개의 모듈이 있다고 가정합니다. 이들은 소스 디렉터리의 별도 파일이지만, 휠을 빌드할 때 하나의 거대한 파일 `project.py`로 병합됩니다. 이 PEP를 사용하면 백엔드는 임포트 시 소스 파일을 읽고 모듈로 구현하기 전에 메모리에서 병합하는 임포트 훅을 생성할 수 있습니다.
*   **오래된 C-확장 자동 업데이트:** 백엔드는 C-확장 소스 파일의 최종 수정 타임스탬프를 확인하는 임포트 훅을 생성할 수 있습니다. 현재 C-확장 바이너리보다 크면 임포트 전에 컴파일러를 호출하여 업데이트를 트리거합니다.

### 거부된 아이디어 (Rejected ideas)
이 PEP는 PEP 660과 경쟁하며, 편집 가능 설치를 달성하는 메커니즘이 빌드 백엔드보다는 프론트엔드 내에 있어야 한다고 생각하기 때문에 해당 제안을 거부합니다. 또한, 이 접근 방식은 생태계가 편집 가능 설치 효과를 달성하기 위해 대체 수단(예: `sys.path`에 경로 삽입 또는 심볼릭 링크 사용)을 사용할 수 있도록 허용합니다.

특히 PEP 660은 휠 파일 표준을 심볼릭 링크 지원으로 확장하지 않고는 심볼릭 링크를 사용하여 코드 및 데이터 파일을 노출하는 것을 허용하지 않습니다. 휠 형식 자체가 아닌 로컬 디스크에서만 사용 가능한 파일을 참조하는 심볼릭 링크를 지원하도록 휠 형식을 확장하는 방법은 명확하지 않습니다. 백엔드 자체(또는 백엔드가 생성한 코드)가 이러한 심볼릭 링크를 생성해서는 안 됩니다(예: 인터프리터 시작 시). 이는 프론트엔드가 어떤 파일을 제거해야 하는지 추적하는 것과 충돌하기 때문입니다.

마지막으로, PEP 660은 `purelib` 및 `platlib` 파일만 지원합니다. 휠 형식이 지원하는 다른 유형의 정보(`include`, `data`, `scripts`)는 의도적으로 지원하지 않습니다. 이 경로를 통해 프론트엔드는 심볼릭 링크 메커니즘을 통해 이러한 파일을 최선을 다해 지원할 수 있습니다(그러나 이 기능은 보편적으로 사용할 수 없습니다. Windows에서는 활성화가 필요합니다). 이러한 파일 유형에 대해 최선의 노력을 다하는 지원을 추가하는 것이 지원 가능성을 완전히 배제하는 것보다 유익하다고 생각합니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.