---
title: "[Draft] PEP 783 - Emscripten Packaging"
excerpt: "Python Enhancement Proposal 783: 'Emscripten Packaging'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/783/
toc: true
toc_sticky: true
date: 2025-09-27 13:58:16+0900
last_modified_at: 2025-09-27 13:58:16+0900
published: true
---
> **원문 링크:** [PEP 783 - Emscripten Packaging](https://peps.python.org/pep-0783/)
>
> **상태:** Draft | **유형:** Standards Track | **작성일:** 28-Mar-2025

## PEP 783 – Emscripten 패키징

### 초록 (Abstract)

이 PEP는 Pyodide Python 런타임을 위한 바이너리 Python 패키지 배포판을 위한 새로운 플랫폼 태그 시리즈인 `pyodide`를 제안합니다.

Emscripten은 완전한 오픈 소스 컴파일러 툴체인입니다. 이는 C/C++ 코드를 WebAssembly/JavaScript 실행 파일로 컴파일하여 브라우저 및 Node.js를 포함한 JavaScript 런타임에서 사용하게 합니다. Rust 언어 또한 Emscripten 타겟을 지원합니다. PEP 776은 Emscripten에 대한 Python의 지원을 명시합니다.

### 동기 (Motivation)

Pyodide는 브라우저에서 사용하기 위한 CPython 배포판입니다. 웹 브라우저는 Windows, macOS, Linux 및 모든 스마트폰에서 사용할 수 있는 범용 컴퓨팅 플랫폼입니다. Capytale 및 PyodideU와 같은 프로젝트를 통해 수십만 명의 학생들이 Pyodide를 통해 Python을 배웠습니다. Pyodide는 또한 Python 패키지들이 인터랙티브한 문서를 제공하기 위해 점점 더 많이 사용되고 있습니다.

이 PEP가 작성될 당시 Pyodide는 NumPy, SciPy, pandas, Polars, scikit-learn, OpenCV, PyArrow, Pillow와 같은 주요 과학 Python 패키지뿐만 아니라 aiohttp, Requests, Pydantic, cryptography, orjson과 같은 범용 패키지를 포함하여 255개의 다른 패키지 포트를 유지하고 있습니다.

약 60개의 패키지 또한 NumPy, pandas, awkward-cpp, scikit-image, statsmodels, PyArrow, Hypothesis, PyO3를 포함하여 CI에서 Pyodide를 대상으로 테스트하고 있습니다.

Python 패키지 프로젝트는 PyPI에 Pyodide용 바이너리 배포판을 배포할 수 없습니다. 대신 anaconda.org 또는 jsdelivr.com과 같은 다른 옵션을 사용해야 합니다. 이는 패키지 관리자와 사용자 모두에게 마찰을 야기합니다.

### 근거 (Rationale)

Emscripten은 musl libc의 변형을 사용합니다. Emscripten 컴파일러는 버전 간 ABI (Application Binary Interface) 안정성을 보장하지 않습니다. 많은 Emscripten 업데이트는 우연히 ABI 호환성을 가지며, Rust Emscripten 타겟은 가끔 부정적인 결과만 발생하면서 ABI가 안정적인 것처럼 작동합니다.

Emscripten ABI를 조정하는 여러 링커 플래그가 있으므로, Emscripten과 함께 실행되도록 빌드된 Python 패키지는 인터프리터를 컴파일하는 데 사용된 ABI에 민감한 링커 플래그와 일치하는지 확인하여 로드 시간 또는 런타임 오류를 피해야 합니다. Emscripten 컴파일러는 버그를 지속적으로 수정하고 새로운 웹 플랫폼 기능에 대한 지원을 추가합니다. 따라서 ABI를 업데이트할 수 있으면 상당한 이점이 있습니다.

패키지 관리자의 ABI 안정성 요구와 플랫폼 발전을 허용하는 ABI 유연성 사이의 균형을 맞추기 위해 Pyodide는 Python의 각 기능 릴리스에 대해 새로운 ABI를 채택할 계획입니다.

Pyodide 팀은 또한 Pyodide가 사용하는 ABI 플래그를 Rust가 지원하는 Emscripten ABI와 조율하여 인기 있는 많은 Rust 패키지를 지원할 수 있도록 합니다. 역사적으로, 이 작업의 대부분은 언와인딩(unwinding) ABI와 관련이 있었습니다. 예를 들어 Rust Major Change Proposal을 참조하십시오.

`pyodide` 플랫폼 태그는 Pyodide와 동일한 버전의 Emscripten으로 컴파일되고 링크되었으며, 동일한 ABI에 민감한 플래그를 사용하는 Python 인터프리터에만 적용됩니다.

### 사양 (Specification)

플랫폼 태그는 다음 형식을 따릅니다:

`pyodide_${YEAR}_${PATCH}_wasm32`

이 태그들은 지정된 Python 버전과 함께 사용될 것입니다. 예를 들어, 플랫폼 태그 `pyodide_2025_0`은 Python 3.13과 함께 사용될 것입니다.

#### Emscripten Wheel ABI

`pyodide_<abi>` 플랫폼의 사양에는 다음이 포함됩니다:
*   사용되는 Emscripten 컴파일러 버전
*   인터프리터와 정적으로 링크되는 라이브러리
*   사용할 스택 언와인딩 ABI
*   로더가 의존성 조회를 처리하는 방식
*   라이브러리가 `-pthread`를 사용할 수 없음
*   라이브러리는 `-sWASM_BIGINT`로 링크되어야 함

ABI는 적절한 버전의 Emscripten 컴파일러를 선택하고 적절한 컴파일러 및 링커 플래그를 전달하여 선택됩니다. 다른 사람이 Pyodide ABI와 호환되는 자체 Python 인터프리터를 빌드하는 것이 가능하며, Pyodide 배포판 자체를 사용할 필요는 없습니다.

Pyodide ABI는 Pyodide 플랫폼 ABI 문서에 완전히 명시되어 있습니다.

`pyodide` 빌드 도구는 Pyodide ABI와 일치하는 Wheel을 생성하는 방법을 알고 있습니다. `manylinux` Wheel과 달리 `pyodide_<abi>` Wheel을 빌드하기 위해 Docker 컨테이너가 필요하지 않습니다. 필요한 것은 Linux 머신과 적절한 버전의 Python, Node.js, Emscripten뿐입니다.

Wheel은 Pyodide 런타임에 설치하고 임포트하여 유효성을 검사할 수 있습니다. Pyodide는 강력한 샌드박싱(sandboxing) 보장이 있는 환경에서 실행될 수 있으므로, 이 작업을 수행해도 보안 위험이 발생하지 않습니다.

#### ABI 버전 결정 (Determining the ABI version)

Pyodide ABI 버전은 `PYODIDE_ABI_VERSION` 구성 변수에 저장되며 다음을 통해 결정될 수 있습니다:

```python
pyodide_abi_version = sysconfig.get_config_var("PYODIDE_ABI_VERSION")
```
호환 가능한 태그 목록을 생성하려면 다음 코드를 사용할 수 있습니다:

```python
from packaging.tags import cpython_tags, _generic_platforms
from typing import Iterator

def _emscripten_platforms() -> Iterator[str]:
    pyodide_abi_version = sysconfig.get_config_var("PYODIDE_ABI_VERSION")
    if pyodide_abi_version:
        yield f"pyodide_{pyodide_abi_version}_wasm32"
    yield from _generic_platforms()

emscripten_tags = cpython_tags(platforms=_emscripten_platforms())
```
이 코드는 `pypa/packaging`에 추가될 것입니다.

#### 패키지 설치 도구 (Package Installers)

설치 도구는 위에서 설명한 `_emscripten_platforms()` 함수를 사용하여 CPython의 Emscripten 빌드와 호환되는 플랫폼을 결정해야 합니다. 특히 Pyodide ABI 버전은 `sysconfig.get_config_var("PYODIDE_ABI_VERSION")`을 통해 노출됩니다.

#### 패키지 인덱스 (Package Indexes)

패키지 인덱스는 플랫폼 태그가 정규 표현식 `pyodide_[0-9]+_[0-9]+_wasm32`와 일치하는 모든 Wheel을 허용해야 합니다.

#### 의존성 지정자 마커 (Dependency Specifier Markers)

PEP 776에 따르면 Emscripten Python에서 `sys.platform`은 `"emscripten"`을 반환합니다. 의존성 지정자에서 Emscripten 플랫폼을 확인하려면 `sys_platform == "emscripten"` (또는 그 부정)을 사용할 수 있습니다.

#### 트로브 분류자 (Trove Classifier)

Emscripten Wheel을 빌드하고 테스트하는 패키지는 `Environment :: WebAssembly :: Emscripten` 분류자를 추가하여 이를 선언할 수 있습니다. PyPI는 이미 이 분류자가 있는 패키지 업로드를 허용합니다.

### 하위 호환성 (Backwards Compatibility)

이 PEP에는 하위 호환성 문제가 없습니다.

### 보안 영향 (Security Implications)

이 PEP에는 보안 영향이 없습니다.

### 교육 방법 (How to Teach This)

Pyodide 사용자에게는 Pyodide 패키지 설치 문서(Pyodide documentation on installing packages)를 권장합니다.

패키지 관리자에게는 Pyodide 패키지 빌드 및 테스트 문서(Pyodide documentation on building and testing packages)를 권장합니다.

### 참조 구현 (Reference Implementation)

패키지 빌드의 경우 `pyodide build` 및 `cibuildwheel`을 참조합니다.

설치 도구가 Wheel 태그가 Pyodide 인터프리터와 호환되는지 결정하는 경우 `pypa/packaging#804`를 참조합니다.

### 저작권 (Copyright)

이 문서는 공개 도메인 또는 CC0-1.0-Universal 라이선스 중 더 관대한 조건으로 제공됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.