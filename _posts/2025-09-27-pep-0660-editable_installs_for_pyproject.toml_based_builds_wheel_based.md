---
title: "[Final] PEP 660 - Editable installs for pyproject.toml based builds (wheel based)"
excerpt: "Python Enhancement Proposal 660: 'Editable installs for pyproject.toml based builds (wheel based)'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/660/
toc: true
toc_sticky: true
date: 2025-09-27 09:55:28+0900
last_modified_at: 2025-09-27 09:55:28+0900
published: true
---
> **원문 링크:** [PEP 660 - Editable installs for pyproject.toml based builds (wheel based)](https://peps.python.org/pep-0660/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 30-Mar-2021


# PEP 660 – `pyproject.toml` 기반 빌드를 위한 편집 가능(Editable) 설치 (휠 기반)

## 초록 (Abstract)

이 문서는 패키지를 편집 가능(editable) 모드로 설치하기 위한 [PEP 517](https://peps.python.org/pep-0517/) 스타일의 메서드를 설명합니다.

## 동기 (Motivation)

Python 개발자들은 소스 저장소의 체크아웃(checkout)에서 작업하는 방식 등으로, 패키지를 `site-packages`에 설치(즉, 복사)할 필요 없이 개발할 수 있기를 원합니다.

이러한 방식은 관련 소스 디렉토리를 `PYTHONPATH`에 추가함으로써 가능하지만, `setuptools`는 이 과정을 더 쉽게 만들어주는 `setup.py develop` 메커니즘을 제공하며, 의존성 및 콘솔 스크립트와 같은 진입점(entry points)도 설치합니다. `pip`은 `pip install --editable` 옵션을 통해 이 메커니즘을 노출합니다.

가져와서(import) 사용되는 Python 코드가 소스 디렉토리에 남아 있도록 프로젝트를 설치하는 방식을 "편집 가능 설치(editable installation mode)"라고 합니다.

이제 [PEP 517](https://peps.python.org/pep-0517/)이 `setuptools`를 대체할 수 있는 메커니즘을 제공하고, 설치 프론트엔드와 빌드 백엔드를 분리함에 따라, 패키지를 편집 가능 모드로 설치하기 위한 새로운 메커니즘이 필요하게 되었습니다.

## 근거 (Rationale)

[PEP 517](https://peps.python.org/pep-0517/)은 "편집 가능 설치" 기능을 보류했으며, 이는 `setup.py`를 사용하지 않는 배포판에는 해당 기능이 없다는 것을 의미했습니다. 이러한 배포판에 편집 가능 설치를 유지하는 유일한 방법은 호환되는 `setup.py develop` 구현을 제공하는 것이었습니다. 편집 가능 훅(hook)을 정의함으로써 다른 빌드 프론트엔드도 `setup.py`와 동등한 기능을 얻게 됩니다.

## 용어 및 목표 (Terminology and goals)

"편집 가능 설치 모드(editable installation mode)"는 설치될 프로젝트의 소스 코드가 로컬 디렉토리에 존재함을 의미합니다.

프로젝트가 편집 가능 모드로 설치되면, 사용자는 로컬 소스 트리에서 프로젝트 Python 코드에 대한 변경 사항이 새로운 설치 단계 없이도 즉시 적용될 것으로 기대합니다.

하지만 진입점 추가 또는 수정, 새로운 의존성 추가와 같은 일부 변경 사항은 적용을 위해 새로운 설치 단계를 필요로 합니다. 이러한 변경 사항은 일반적으로 빌드 백엔드 구성 파일(예: `pyproject.toml`)에서 이루어지므로, Python 소스 코드가 소스 트리에서 가져와진다는 일반적인 사용자 기대와 일치합니다.

C 확장 모듈과 같은 비(非) Python 소스 코드의 수정은 명백히 적용을 위해 컴파일 및/또는 설치 단계를 필요로 합니다. 수행해야 할 정확한 단계는 사용되는 빌드 백엔드에 따라 달라집니다.

프로젝트가 편집 가능 모드로 설치될 때, 사용자는 일반적인 설치와 동일하게 작동할 것을 기대합니다. 특히 코드는 다른 코드에 의해 가져올 수 있어야 하며(importable), `importlib.metadata`와 같은 표준 메커니즘을 통해 메타데이터를 사용할 수 있어야 합니다.

빌드 백엔드가 이 명세를 구현하는 방식에 따라, 소스 트리에 추가 파일이 존재하여 일반적인 설치의 일부가 아닐 수도 있는 등의 사소한 차이가 있을 수 있습니다. 빌드 백엔드는 이러한 잠재적 차이를 문서화하도록 권장됩니다.

## 메커니즘 (The Mechanism)

이 PEP는 [PEP 517](https://peps.python.org/pep-0517/) 백엔드 인터페이스에 세 가지 선택적 훅(hooks)을 추가합니다. 이 훅들은 설치 시 해당 배포판을 소스 폴더에서 가져올 수 있도록 하는 휠(wheel)을 빌드하는 데 사용됩니다.

### `build_editable`

```python
def build_editable(wheel_directory, config_settings=None, metadata_directory=None):
    ...
```

`.whl` 파일을 빌드하여 지정된 `wheel_directory`에 배치해야 합니다. 생성된 `.whl` 파일의 기본 이름(전체 경로 아님)을 유니코드 문자열로 반환해야 합니다.

확장 모듈 또는 다른 빌드 아티팩트(artifacts)가 사용 준비될 수 있도록, 배포판의 인플레이스(in-place) 빌드를 부수 효과(side effect)로 수행할 수 있습니다.

`.whl` 파일은 [Wheel 바이너리 파일 형식 명세(PEP 427)](https://peps.python.org/pep-0427/)를 준수해야 합니다. 특히, 규격을 준수하는 `.dist-info` 디렉토리를 포함해야 합니다. 메타데이터는 `build_wheel` 또는 `prepare_metadata_for_build_wheel`에 의해 생성되었을 메타데이터와 동일해야 하지만, `Requires-Dist`는 아래 설명된 대로 약간 다를 수 있습니다.

빌드 백엔드는 `build_wheel` 훅에 의해 생성된 휠과 동일한 의존성(`Requires-Dist` 메타데이터)을 가진 휠을 생성해야 합니다. 단, 편집 가능 메커니즘이 런타임에 작동하는 데 필요한 의존성(예: `editables`)을 추가할 수 있습니다.

"편집 가능" 휠의 파일명도 [PEP 427](https://peps.python.org/pep-0427/)을 준수해야 합니다. `build_wheel`과 동일한 태그를 사용할 필요는 없지만, 시스템과 호환되도록 태그가 지정되어야 합니다.

빌드 프론트엔드가 이전에 `prepare_metadata_for_build_editable`을 호출했고, 이 호출로 인해 생성된 휠이 이전 호출과 일치하는 메타데이터를 갖도록 의존하는 경우, 생성된 `.dist-info` 디렉토리의 경로를 `metadata_directory` 인수로 제공해야 합니다. 이 인수가 제공되면 `build_editable`은 동일한 메타데이터를 가진 휠을 생성해야 합니다. 빌드 프론트엔드가 전달하는 디렉토리는 생성된 인식되지 않는 파일들을 포함하여 `prepare_metadata_for_build_editable`에 의해 생성된 디렉토리와 동일해야 합니다.

"편집 가능" 휠은 배포용이 아니라 빌드 시스템과 프론트엔드 간의 임시 통신 수단으로 휠 형식을 사용합니다. 이는 빌드 백엔드가 아무것도 직접 설치하는 것을 피하게 합니다. 이 휠은 최종 사용자에게 노출되거나 캐시되거나 배포되어서는 안 됩니다.

### `get_requires_for_build_editable`

```python
def get_requires_for_build_editable(config_settings=None):
    ...
```

이 훅은 `build_editable` 훅을 호출할 때 설치해야 할, `pyproject.toml` 파일에 지정된 것 외의 [PEP 508](https://peps.python.org/pep-0508/) 의존성 명세(dependency specifications)를 포함하는 추가 문자열 목록을 반환해야 합니다.

정의되지 않은 경우, 기본 구현은 `return []`와 동일합니다.

### `prepare_metadata_for_build_editable`

```python
def prepare_metadata_for_build_editable(metadata_directory, config_settings=None):
    ...
```

지정된 `metadata_directory` 내부에 휠 메타데이터를 포함하는 `.dist-info` 디렉토리(예: `{metadata_directory}/{package}-{version}.dist-info/`와 같은 디렉토리)를 생성해야 합니다. 이 디렉토리는 휠 명세에 정의된 유효한 `.dist-info` 디렉토리여야 하지만, `RECORD` 또는 서명(signatures)을 포함할 필요는 없습니다. 훅은 이 디렉토리 안에 다른 파일을 생성할 수도 있으며, 빌드 프론트엔드는 이러한 파일을 보존해야 하지만, 그 외에는 무시해야 합니다. 여기서의 의도는 메타데이터가 빌드 시간 결정에 의존하는 경우, 빌드 백엔드가 이러한 결정을 실제 휠 빌드 단계에서 재사용할 수 있는 편리한 형식으로 기록해야 할 수도 있다는 것입니다.

생성된 `.dist-info` 디렉토리의 기본 이름(전체 경로 아님)을 유니코드 문자열로 반환해야 합니다.

빌드 프론트엔드가 이 정보가 필요하지만 메서드가 정의되지 않은 경우, `build_editable`을 호출하고 결과 메타데이터를 직접 확인해야 합니다.

### 휠에 포함할 내용 (What to put in the wheel)

빌드 백엔드는 생성된 휠에 설치될 때 편집 가능 설치를 초래할 파일을 채워야 합니다. 빌드 백엔드는 편집 가능 설치의 목표를 달성하기 위해 다양한 기술을 사용할 수 있습니다. 이 섹션은 예시를 제공하며 규범적이지 않습니다.

빌드 백엔드는 `.whl` 파일의 루트에 소스 트리의 루트 디렉토리를 포함하는 `.pth` 파일을 배치할 수 있습니다. 이 접근 방식은 간단하지만 매우 정밀하지는 않습니다. 그러나 충분히 좋다고 간주될 수 있으며(특히 `src` 레이아웃을 사용할 때) 현재 `setup.py develop`이 하는 방식과 유사합니다. `editables` 라이브러리는 고품질의 편집 가능 설치를 제공하는 프록시 모듈을 빌드하는 방법을 보여줍니다. 이는 포함하고 숨길 모듈 목록을 허용합니다. 가져올 때, 이 프록시 모듈은 소스 트리의 코드로 자신을 대체합니다. 경로 기반(Path-based) 메서드는 경로 아래의 모든 스크립트를 가져올 수 있게 만드는데, 종종 프로젝트 자체의 `setup.py` 및 일반 설치의 일부가 아닐 다른 스크립트도 포함합니다. 프록시 전략은 경로 기반 메서드보다 높은 수준의 충실도를 달성할 수 있습니다. 심볼릭 링크(Symbolic links)는 편집 가능 설치를 구현하는 또 다른 유용한 메커니즘입니다. 이 문서 작성 시점에는 휠 명세가 심볼릭 링크를 지원하지 않으므로, 대상 환경에 심볼릭 링크를 직접 설정하는 데 사용할 수 없습니다. 그러나 백엔드가 소스 트리의 일부 빌드 디렉토리에 심볼릭 링크 구조를 생성하고, "편집 가능" 휠의 `.pth` 파일을 통해 해당 디렉토리를 Python 경로에 추가하는 것은 가능합니다. 이러한 방식으로 링크된 일부 파일이 Python 구현 또는 버전, ABI 또는 플랫폼에 의존하는 경우, 호환성 태그에 따라 다른 디렉토리에 링크 구조를 생성하도록 주의해야 하므로, 동일한 프로젝트 트리를 여러 환경에 편집 가능 모드로 설치할 수 있습니다.

### 프론트엔드 요구 사항 (Frontend requirements)

프론트엔드는 "편집 가능" 휠을 일반 휠과 동일한 방식으로 설치해야 합니다. 이는 편집 가능 설치의 제거(uninstallation)에 특별한 처리가 필요 없음을 의미합니다.

프론트엔드는 설치된 배포판의 `.dist-info` 디렉토리에 [PEP 610](https://peps.python.org/pep-0610/)을 준수하는 `direct_url.json` 파일을 생성해야 합니다. `url` 값은 프로젝트 디렉토리(즉, `pyproject.toml`을 포함하는 디렉토리)를 가리키는 `file://` URL이어야 하며, `dir_info` 값은 `{'editable': true}`여야 합니다.

프론트엔드는 `pyproject.toml` 파일에 지정된 부트스트랩 요구 사항(bootstrap requirements)을 포함하는 환경에서 `get_requires_for_build_editable` 훅을 실행해야 합니다.

프론트엔드는 `pyproject.toml`의 부트스트랩 요구 사항과 `get_requires_for_build_editable` 훅에 의해 지정된 요구 사항을 포함하는 환경에서 `prepare_metadata_for_build_editable` 및 `build_editable` 훅을 실행해야 합니다.

프론트엔드는 `build_editable`에서 얻은 휠을 최종 사용자에게 노출해서는 안 됩니다. 휠은 설치 후 폐기되어야 하며 캐시되거나 배포되어서는 안 됩니다.

## 제한 사항 (Limitations)

휠의 `.data` 디렉토리와 관련하여, 이 PEP는 `purelib` 및 `platlib` 카테고리(`site-packages`에 설치됨)를 "편집 가능"하게 만드는 데 중점을 둡니다. `headers`, `data`, `scripts`와 같은 다른 카테고리에 대해서는 특별한 조항을 두지 않습니다. 패키지 작성자는 `console_scripts`를 사용하거나, 스크립트를 라이브러리 기능에 대한 작은 래퍼(wrapper)로 만들거나, 개발 중에 소스 체크아웃에서 이러한 스크립트를 관리하도록 권장됩니다.

## 프로토타입 (Prototypes)

이 PEP 작성 시점에 여러 프론트엔드 및 백엔드에서 다양한 프로토타입 구현이 제공되고 있습니다. 가능한 접근 방식을 설명하기 위해 아래에 링크를 제공합니다.

**프론트엔드:**

*   `pip` (풀 리퀘스트)

**빌드 백엔드:**

*   `enscons` (풀 리퀘스트 1, 풀 리퀘스트 2)
*   `flit` (풀 리퀘스트)
*   `hatchling` (sdist)
*   `pdm` (풀 리퀘스트)
*   `setuptools` (`setuptools_pep660` 저장소)

## 채택되지 않은 아이디어 (Rejected ideas)

### 편집 가능 로컬 버전 식별자 (editable local version identifier)

빌드 백엔드가 로컬 버전 식별자에 `editable` 문자열을 추가하거나 수정하는 아이디어는 로컬 버전 식별자를 포함하는 `==` 버전 지정자(specifier)를 만족시키지 못하기 때문에 거부되었습니다. 다시 말해, `pkg==1.0+local`은 `1.0+local.editable` 버전으로는 만족되지 않습니다.

### 가상 휠 (Virtual wheel)

또 다른 접근 방식은 [PEP 662](https://peps.python.org/pep-0662/)에서 제안되었는데, 빌드 백엔드가 소스 파일 및 디렉토리에서 설치된 레이아웃으로의 매핑을 반환하는 방식입니다. 그런 다음 설치 프로그램(installer) 프론트엔드가 사용자에게 적절하다고 판단하는 모든 수단을 통해 편집 가능 설치를 구현하도록 맡겨집니다.

기능 면에서 두 제안 모두 핵심 "편집 가능" 기능을 제공합니다.

주요 차이점은 [PEP 662](https://peps.python.org/pep-0662/)는 프론트엔드가 편집 가능 설치가 어떻게 구현될지 결정하도록 하는 반면, 이 PEP에서는 백엔드가 선택을 해야 한다는 것입니다. 두 접근 방식 모두 원칙적으로 주어진 프로젝트에 대해 여러 편집 가능 설치 메서드를 제공하고 개발자가 설치 시 선택하도록 할 수 있습니다.

이 PEP 작성 시점에 커뮤니티에는 편집 가능 설치에 대한 광범위한 이론적, 실제적 기대치가 있다는 것이 분명합니다. 현실은 `.pth`를 통한 경로 삽입(즉, `setup.py develop`이 하는 일)에 대한 경험이 가장 많다는 것입니다.

우리는 [PEP 660](https://peps.python.org/pep-0660/)이 프로젝트 작성자가 자신의 요구 사항에 가장 적합한 편집 가능 메커니즘을 제공하는 백엔드를 선택하거나 메서드를 구현하고 올바르게 작동하는지 테스트하도록 함으로써, 현재 "알 수 없는 미지(unknown unknowns)"를 가장 신뢰할 수 있는 방식으로 더 잘 다룬다고 믿습니다. 프론트엔드는 "편집 가능" 휠을 설치하는 방법에 대한 재량이 없으므로, 문제가 발생하는 경우 조사할 곳은 빌드 백엔드 한 곳뿐입니다.

[PEP 662](https://peps.python.org/pep-0662/)를 사용하면 프론트엔드, 백엔드, 그리고 어쩌면 명세까지 문제를 조사해야 합니다. 또한, 명세를 다른 방식으로 구현하는 여러 프론트엔드가 프로젝트 작성자가 의도한 것과 다르게 동작하는 설치를 생성하여 혼란을 야기하거나, 더 나쁘게는 특정 프론트엔드나 IDE에서만 작동하는 프로젝트를 만들 가능성이 높습니다.

### 압축 해제된 휠 (Unpacked wheel)

임시 디렉토리에 압축 해제된 휠을 생성하여 프론트엔드가 대상 환경으로 복사하도록 하는 프로토타입이 만들어졌습니다. 이 접근 방식은 백엔드가 휠 아카이브를 쉽게 생성할 수 있고, 통신 메커니즘으로 휠을 사용하는 것이 [PEP 517](https://peps.python.org/pep-0517/) 철학과 더 잘 맞으며, 따라서 프론트엔드에게 작업을 더 간단하게 유지하기 때문에 더 이상 추구되지 않았습니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 있거나 CC0-1.0-Universal 라이선스 중 더 관대한 라이선스에 따라 제공됩니다.## PEP 660 – `pyproject.toml` 기반 빌드를 위한 편집 가능(Editable) 설치 (휠 기반)

### 초록 (Abstract)

이 문서는 패키지를 편집 가능(editable) 모드로 설치하기 위한 [PEP 517](https://peps.python.org/pep-0517/) 스타일의 메서드를 설명합니다.

### 동기 (Motivation)

Python 개발자들은 소스 코드 저장소를 체크아웃(checkout)하여 작업하는 방식 등으로, 패키지를 `site-packages`에 설치(즉, 복사)할 필요 없이 개발할 수 있기를 원합니다.

이러한 개발 방식은 관련 소스 디렉토리를 `PYTHONPATH` 환경 변수에 추가하여 구현할 수 있습니다. 하지만 `setuptools`는 `setup.py develop` 메커니즘을 제공하여 이 과정을 간소화하고, 의존성 패키지 및 콘솔 스크립트와 같은 진입점(entry points)도 함께 설치합니다. `pip`은 `pip install --editable` 옵션을 통해 이 메커니즘을 지원합니다.

가져와서(import) 사용되는 Python 코드가 소스 디렉토리에 계속 남아 있도록 프로젝트를 설치하는 방식을 "편집 가능 설치(editable installation mode)"라고 합니다.

[PEP 517](https://peps.python.org/pep-0517/)이 `setuptools`를 대체할 수 있는 메커니즘을 제공하고, 설치 프론트엔드와 빌드 백엔드를 분리함에 따라, 패키지를 편집 가능 모드로 설치하기 위한 새로운 표준 메커니즘이 필요하게 되었습니다.

### 근거 (Rationale)

[PEP 517](https://peps.python.org/pep-0517/)은 "편집 가능 설치" 기능을 미뤄두었으며, 이는 `setup.py`를 사용하지 않는 배포판에는 이 기능이 없다는 것을 의미했습니다. 이러한 배포판에 편집 가능 설치를 제공하는 유일한 방법은 호환되는 `setup.py develop` 구현을 제공하는 것이었습니다. 이 PEP에서 편집 가능 훅(hook)을 정의함으로써, 다른 빌드 프론트엔드들도 `setup.py`와 동등한 편집 가능 설치 기능을 사용할 수 있게 됩니다.

### 용어 및 목표 (Terminology and goals)

"편집 가능 설치 모드(editable installation mode)"는 설치될 프로젝트의 소스 코드가 로컬 디렉토리에 존재해야 함을 의미합니다.

프로젝트가 편집 가능 모드로 설치되면, 사용자는 로컬 소스 트리에서 프로젝트 Python 코드에 대한 변경 사항이 새로운 설치 단계 없이 즉시 적용될 것으로 기대합니다.

그러나 진입점(entry points)의 추가 또는 수정, 새로운 의존성(dependencies) 추가와 같은 일부 변경 사항은 적용을 위해 새로운 설치 단계를 필요로 합니다. 이러한 변경 사항은 일반적으로 빌드 백엔드 구성 파일(예: `pyproject.toml`)에서 이루어지므로, Python 소스 코드가 소스 트리에서 직접 가져와진다는 일반적인 사용자 기대와 일치합니다.

C 확장 모듈과 같은 비(非) Python 소스 코드의 수정은 적용을 위해 컴파일 및/또는 설치 단계를 명백히 필요로 합니다. 이러한 정확한 단계는 사용되는 빌드 백엔드에 따라 달라집니다.

프로젝트가 편집 가능 모드로 설치될 때, 사용자는 일반적인 설치와 동일하게 동작할 것을 기대합니다. 특히 코드는 다른 코드에 의해 가져올 수 있어야 하며(importable), `importlib.metadata`와 같은 표준 메커니즘을 통해 메타데이터를 사용할 수 있어야 합니다.

빌드 백엔드가 이 명세를 구현하는 방식에 따라, 소스 트리에 추가 파일이 존재하여 일반적인 설치의 일부가 아닐 수 있는 등의 사소한 차이가 있을 수 있습니다. 빌드 백엔드는 이러한 잠재적 차이를 문서화하도록 권장됩니다.

### 메커니즘 (The Mechanism)

이 PEP는 [PEP 517](https://peps.python.org/pep-0517/) 백엔드 인터페이스에 세 가지 선택적 훅(hooks)을 추가합니다. 이 훅들은 설치 시 해당 배포판을 소스 폴더에서 가져올 수 있도록 하는 휠(wheel)을 빌드하는 데 사용됩니다.

#### `build_editable`

```python
def build_editable(wheel_directory, config_settings=None, metadata_directory=None):
    ...
```

*   `.whl` 파일을 빌드하고, 지정된 `wheel_directory`에 배치해야 합니다.
*   생성된 `.whl` 파일의 기본 이름(전체 경로 아님)을 유니코드 문자열로 반환해야 합니다.
*   확장 모듈 또는 다른 빌드 아티팩트(artifacts)가 사용 준비될 수 있도록, 배포판의 인플레이스(in-place) 빌드를 부수 효과(side effect)로 수행할 수 있습니다.
*   `.whl` 파일은 [Wheel 바이너리 파일 형식 명세(PEP 427)](https://peps.python.org/pep-0427/)를 준수해야 합니다. 특히, 규격을 준수하는 `.dist-info` 디렉토리를 포함해야 합니다.
*   메타데이터는 `build_wheel` 또는 `prepare_metadata_for_build_wheel`에 의해 생성되었을 메타데이터와 동일해야 하지만, `Requires-Dist` 필드는 편집 가능 메커니즘의 런타임 작동에 필요한 의존성(예: `editables`)을 추가할 수 있다는 점에서 약간 다를 수 있습니다.
*   "편집 가능" 휠의 파일명도 [PEP 427](https://peps.python.org/pep-0427/)을 준수해야 하며, 시스템과 호환되도록 태그가 지정되어야 합니다.
*   만약 빌드 프론트엔드가 이전에 `prepare_metadata_for_build_editable`을 호출했고, 이 호출로 생성된 휠이 이전 호출과 일치하는 메타데이터를 가져야 한다면, 생성된 `.dist-info` 디렉토리의 경로를 `metadata_directory` 인수로 제공해야 합니다. 이 인수가 제공되면 `build_editable`은 동일한 메타데이터를 가진 휠을 생성해야 합니다.
*   "편집 가능" 휠은 배포용이 아니라 빌드 시스템과 프론트엔드 간의 임시 통신 수단으로 휠 형식을 사용합니다. 이는 빌드 백엔드가 아무것도 직접 설치하는 것을 방지합니다. 이 휠은 최종 사용자에게 노출되거나 캐시되거나 배포되어서는 안 됩니다.

#### `get_requires_for_build_editable`

```python
def get_requires_for_build_editable(config_settings=None):
    ...
```

*   이 훅은 `build_editable` 훅을 호출할 때 설치해야 할, `pyproject.toml` 파일에 지정된 것 외의 [PEP 508](https://peps.python.org/pep-0508/) 의존성 명세(dependency specifications)를 포함하는 추가 문자열 목록을 반환해야 합니다.
*   정의되지 않은 경우, 기본 구현은 `return []`와 동일합니다.

#### `prepare_metadata_for_build_editable`

```python
def prepare_metadata_for_build_editable(metadata_directory, config_settings=None):
    ...
```

*   지정된 `metadata_directory` 내부에 휠 메타데이터를 포함하는 `.dist-info` 디렉토리(예: `{metadata_directory}/{package}-{version}.dist-info/`와 같은 디렉토리)를 생성해야 합니다.
*   이 디렉토리는 휠 명세에 정의된 유효한 `.dist-info` 디렉토리여야 하지만, `RECORD` 파일 또는 서명(signatures)을 포함할 필요는 없습니다. 훅은 이 디렉토리 안에 다른 파일을 생성할 수도 있으며, 빌드 프론트엔드는 이러한 파일을 보존해야 하지만, 그 외에는 무시해야 합니다. 이는 메타데이터가 빌드 시간 결정에 의존하는 경우, 빌드 백엔드가 이러한 결정을 실제 휠 빌드 단계에서 재사용할 수 있는 형식으로 기록해야 할 수도 있음을 의미합니다.
*   생성된 `.dist-info` 디렉토리의 기본 이름(전체 경로 아님)을 유니코드 문자열로 반환해야 합니다.
*   빌드 프론트엔드가 이 정보가 필요하지만 메서드가 정의되지 않은 경우, `build_editable`을 호출하고 결과 메타데이터를 직접 확인해야 합니다.

#### 휠에 포함할 내용 (What to put in the wheel)

빌드 백엔드는 생성된 휠에 설치될 때 편집 가능 설치를 가능하게 할 파일을 채워야 합니다. 빌드 백엔드는 이 목표를 달성하기 위해 다양한 기술을 사용할 수 있으며, 이 섹션은 예시를 제공하며 규범적이지 않습니다.

*   **`.pth` 파일 사용:** 빌드 백엔드는 `.whl` 파일의 루트에 소스 트리의 루트 디렉토리를 포함하는 `.pth` 파일을 배치할 수 있습니다. 이 접근 방식은 간단하며 `setup.py develop`이 현재 하는 방식과 유사합니다.
*   **프록시 모듈(Proxy modules):** `editables` 라이브러리는 고품질의 편집 가능 설치를 제공하는 프록시 모듈을 빌드하는 방법을 보여줍니다. 이 모듈들은 임포트될 때 소스 트리의 코드로 자신을 대체합니다.
*   **심볼릭 링크(Symbolic links):** 심볼릭 링크도 유용한 메커니즘이지만, 휠 명세가 현재 이를 직접 지원하지 않습니다. 백엔드가 빌드 디렉토리에 심볼릭 링크 구조를 생성하고 `.pth` 파일을 통해 이 디렉토리를 Python 경로에 추가하는 방식은 가능합니다.

#### 프론트엔드 요구 사항 (Frontend requirements)

*   프론트엔드는 "편집 가능" 휠을 일반 휠과 동일한 방식으로 설치해야 합니다. 이는 편집 가능 설치의 제거(uninstallation)에 특별한 처리가 필요 없음을 의미합니다.
*   프론트엔드는 설치된 배포판의 `.dist-info` 디렉토리에 [PEP 610](https://peps.python.org/pep-0610/)을 준수하는 `direct_url.json` 파일을 생성해야 합니다. `url` 값은 프로젝트 디렉토리(즉, `pyproject.toml`을 포함하는 디렉토리)를 가리키는 `file://` URL이어야 하며, `dir_info` 값은 `{'editable': true}`여야 합니다.
*   프론트엔드는 `pyproject.toml`에 지정된 부트스트랩 요구 사항을 포함하는 환경에서 `get_requires_for_build_editable` 훅을 실행해야 합니다.
*   프론트엔드는 `pyproject.toml`의 부트스트랩 요구 사항과 `get_requires_for_build_editable` 훅에 의해 지정된 요구 사항을 포함하는 환경에서 `prepare_metadata_for_build_editable` 및 `build_editable` 훅을 실행해야 합니다.
*   프론트엔드는 `build_editable`에서 얻은 휠을 최종 사용자에게 노출해서는 안 됩니다. 휠은 설치 후 폐기되어야 하며 캐시되거나 배포되어서는 안 됩니다.

### 제한 사항 (Limitations)

이 PEP는 휠의 `.data` 디렉토리와 관련하여 `purelib` 및 `platlib` 카테고리(`site-packages`에 설치됨)를 "편집 가능"하게 만드는 데 중점을 둡니다. `headers`, `data`, `scripts`와 같은 다른 카테고리에 대해서는 특별한 조항을 두지 않습니다. 패키지 작성자는 `console_scripts`를 사용하거나, 스크립트를 라이브러리 기능에 대한 작은 래퍼(wrapper)로 만들거나, 개발 중에 소스 체크아웃에서 이러한 스크립트를 관리하도록 권장됩니다.

### 프로토타입 (Prototypes)

이 PEP 작성 시점에 여러 프론트엔드 및 백엔드에서 다양한 프로토타입 구현이 제공되고 있습니다.

**프론트엔드:**

*   `pip` (풀 리퀘스트)

**빌드 백엔드:**

*   `enscons` (풀 리퀘스트 1, 풀 리퀘스트 2)
*   `flit` (풀 리퀘스트)
*   `hatchling` (sdist)
*   `pdm` (풀 리퀘스트)
*   `setuptools` (`setuptools_pep660` 저장소)

### 채택되지 않은 아이디어 (Rejected ideas)

#### 편집 가능 로컬 버전 식별자 (editable local version identifier)

빌드 백엔드가 로컬 버전 식별자에 `editable` 문자열을 추가하거나 수정하는 아이디어는 로컬 버전 식별자를 포함하는 `==` 버전 지정자(specifier)를 만족시키지 못하기 때문에 거부되었습니다. 예를 들어, `pkg==1.0+local`은 `1.0+local.editable` 버전으로는 만족되지 않습니다.

#### 가상 휠 (Virtual wheel)

또 다른 접근 방식은 [PEP 662](https://peps.python.org/pep-0662/)에서 제안되었는데, 빌드 백엔드가 소스 파일 및 디렉토리에서 설치된 레이아웃으로의 매핑을 반환하는 방식입니다. 그런 다음 설치 프로그램(installer) 프론트엔드가 사용자에게 적절하다고 판단하는 모든 수단을 통해 편집 가능 설치를 구현하도록 맡겨집니다.

기능 면에서 두 제안 모두 핵심 "편집 가능" 기능을 제공합니다.

주요 차이점은 [PEP 662](https://peps.python.org/pep-0662/)는 프론트엔드가 편집 가능 설치가 어떻게 구현될지 결정하도록 하는 반면, 이 PEP(660)에서는 백엔드가 선택을 해야 한다는 것입니다.

[PEP 660](https://peps.python.org/pep-0660/)은 프로젝트 작성자가 자신의 요구 사항에 가장 적합한 편집 가능 메커니즘을 제공하는 백엔드를 선택하거나 메서드를 구현하고 올바르게 작동하는지 테스트하도록 함으로써, "알 수 없는 미지(unknown unknowns)"를 가장 신뢰할 수 있는 방식으로 다룬다고 믿어집니다. 프론트엔드는 "편집 가능" 휠을 설치하는 방법에 대한 재량이 없으므로, 문제가 발생하는 경우 조사할 곳은 빌드 백엔드 한 곳뿐입니다.

[PEP 662](https://peps.python.org/pep-0662/)를 사용하면 프론트엔드, 백엔드, 그리고 어쩌면 명세까지 문제를 조사해야 할 가능성이 있습니다. 또한, 명세를 다르게 구현하는 여러 프론트엔드가 프로젝트 작성자가 의도한 것과 다르게 동작하는 설치를 생성하여 혼란을 야기하거나, 특정 프론트엔드나 IDE에서만 작동하는 프로젝트를 만들 가능성이 높습니다.

#### 압축 해제된 휠 (Unpacked wheel)

임시 디렉토리에 압축 해제된 휠을 생성하여 프론트엔드가 대상 환경으로 복사하도록 하는 프로토타입이 만들어졌습니다. 이 접근 방식은 백엔드가 휠 아카이브를 쉽게 생성할 수 있고, 통신 메커니즘으로 휠을 사용하는 것이 [PEP 517](https://peps.python.org/pep-0517/) 철학과 더 잘 맞으며, 따라서 프론트엔드에게 작업을 더 간단하게 유지하기 때문에 더 이상 추구되지 않았습니다.

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 있거나 CC0-1.0-Universal 라이선스 중 더 관대한 라이선스에 따라 제공됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.