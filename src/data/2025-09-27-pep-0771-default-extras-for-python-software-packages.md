---
title: "[Draft] PEP 771 - Default Extras for Python Software Packages"
excerpt: "Python Enhancement Proposal 771: 'Default Extras for Python Software Packages'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/771/
toc: true
toc_sticky: true
date: 2025-09-27 13:52:58+0900
last_modified_at: 2025-09-27 13:52:58+0900
published: true
---
> **원문 링크:** [PEP 771 - Default Extras for Python Software Packages](https://peps.python.org/pep-0771/)
>
> **상태:** Draft | **유형:** Standards Track | **작성일:** 13-Jan-2025



## PEP 771 – Python 소프트웨어 패키지를 위한 기본 Extras

### 초록 (Abstract)

PEP 508은 패키지 의존성을 선언하기 위한 미니 언어(mini-language)를 정의합니다. 이 언어의 한 가지 특징은 `extras`를 지정할 수 있다는 것입니다. `extras`는 배포판의 선택적 구성 요소로, 사용될 경우 추가 의존성을 설치합니다. 이 PEP는 명시적으로 제공되지 않을 경우 하나 이상의 `extras`가 기본적으로 설치되도록 하는 메커니즘을 제안합니다.

### 동기 (Motivation)

기본 `extras`에 대한 다양한 사용 사례와 이 PEP에서 가능한 해결책들은 DPO 스레드에서 광범위하게 논의되었습니다. 이는 크게 두 가지 경우로 나뉘며, 본 PEP의 동기가 됩니다.

#### 권장되지만 필수는 아닌 의존성 (Recommended but not required dependencies)

패키지 관리자는 종종 패키지의 기능이나 성능을 확장하는 선택적 의존성을 선언하기 위해 `extras`를 사용합니다. 어떤 의존성이 필수이고 어떤 의존성이 `extras`로 분류되어야 하는지 결정하기 어려울 때가 있습니다. 대부분의 기능이 기본적으로 제공되기를 선호하는 일반 사용자들의 요구와, 크고 선택적인 의존성 없이 최소한의 설치를 원하는 사용자들의 요구 사이에서 균형을 찾아야 합니다.

기존 Python 패키징 인프라를 사용한 한 가지 해결책은 패키지 관리자가 예를 들어 `recommended`라는 `extra`를 정의하여 모든 필수적이지 않지만 제안되는 의존성을 포함하도록 하는 것입니다. 그러면 사용자에게 `package[recommended]`를 사용하여 패키지를 설치하도록 안내하고, 더 많은 제어를 원하는 사용자는 `package`를 사용할 수 있습니다. 그러나 실제로는 많은 사용자가 `[recommended]` 구문을 알지 못하여, 일반적인 설치를 위해 이를 알아야 하는 부담을 지게 됩니다. 권장되는 의존성이 기본적으로 설치되면서도 사용자가 더 최소한의 설치를 요청할 수 있는 방법을 제공하는 것은 이러한 사용 사례를 만족시킬 것이며, 이 PEP는 이에 대한 해결책을 설명합니다.

이 패턴을 보여주는 패키지 예시는 다음과 같습니다.
*   `astropy`: `astropy[recommended]`
*   `sunpy`: `sunpy[all]`
*   `fastapi`: `fastapi[standard]`

#### 여러 백엔드 또는 프론트엔드를 지원하는 패키지 (Packages supporting multiple backends or frontends)

`extras`를 사용하는 또 다른 일반적인 사용 사례는 다양한 백엔드 또는 프론트엔드와 각 백엔드/프론트엔드에 필요한 의존성을 정의하는 것입니다. 패키지는 기능하기 위해 최소한 하나의 백엔드나 프론트엔드가 설치되어야 하지만, 어떤 백엔드/프론트엔드가 설치될지에 대해서는 유연할 수 있습니다. 구체적인 예시는 다음과 같습니다.
*   `PyQt5`, `PyQt6`, `PySide2`, 또는 `PySide6`로 제공될 수 있는 Qt 프론트엔드 라이브러리.
*   MySQL, PostgreSQL, SQLite와 같은 백엔드 데이터베이스.

현재 패키징 표준에서는, 관리자가 백엔드나 프론트엔드 중 하나를 필수로 지정하거나, 사용자에게 항상 `package[backend]`와 같이 `extras`를 명시하도록 요구해야 합니다. 이로 인해 사용자가 단순히 `package`만 설치할 경우 사용할 수 없는 설치가 될 위험이 있습니다. 하나 이상의 기본 백엔드나 프론트엔드를 지정하고 이러한 기본값을 재정의할 수 있는 방법을 제공하는 것은 사용자에게 훨씬 더 나은 경험을 제공할 것이며, 이 PEP에 설명된 접근 방식은 이를 가능하게 할 것입니다.

이 PEP는 패키지가 정확히 하나의 프론트엔드나 백엔드 패키지를 요구하는 경우와 같이, 충돌하거나 호환되지 않는 `extras`를 허용하지 않는 문제를 해결하는 것을 목표로 하지 않습니다. 현재 Python 패키징 인프라에는 충돌하거나 호환되지 않는 `extras`의 설치를 금지하는 메커니즘이 없으며, 이 PEP는 이를 변경하지 않습니다.

작동을 위해 최소한 하나의 백엔드 또는 프론트엔드를 요구하고 기본 `extra`를 권장하는 패키지 예시는 다음과 같습니다.
*   `kivy`: `kivy[base]`
*   `napari`: `napari[all]`
*   `glueviz`: `glueviz[qt]`

이 세 가지 경우 모두에서, `extras` 없이 패키지를 설치하면 설치가 제대로 작동하지 않으며, 이는 이러한 패키지들의 흔히 보고되는 지원 문제입니다.

### 근거 (Rationale)

여러 해 동안 커뮤니티에서 많은 가능한 해결책들이 광범위하게 논의되었습니다. 아래에 제시된 해결책은 다음 세 가지 기준을 모두 충족하는 유일한 방안입니다.
*   옵트인(opt-in) 솔루션으로, 패키지 관리자가 사용 여부를 선택할 수 있습니다.
*   "동기(Motivation)" 섹션에서 설명된 두 가지 주요 사용 사례를 모두 수용할 수 있을 만큼 충분히 유연합니다.
*   PEP 508의 구문을 재사용합니다.

### 명세 (Specification)

#### `Default-Extra` 메타데이터 필드

코어 패키지 메타데이터에 새로운 다중 사용(multiple-use) 메타데이터 필드인 `Default-Extra`가 추가됩니다. 이 필드의 각 항목은 패키지가 명시적으로 `extras` 없이 설치될 때 자동으로 포함될 `extra`를 지정하는 문자열이어야 합니다.

`Provides-Extra` 항목에 이미 지정된 항목만 `Default-Extra` 항목에 사용될 수 있습니다.

예시:
```
Default-Extra: recommended
Default-Extra: backend1
Default-Extra: backend2
Default-Extra: backend3
```
이것은 코어 패키지 메타데이터에 새로운 필드를 도입하므로, `Metadata-Version`을 다음 마이너 버전 (작성 시점 2.5)으로 올려야 합니다.

#### `[project]` 메타데이터 테이블의 새 키

PEP 621에서 원래 정의되었고 현재 PyPA 명세에서 정의된 `[project]` 메타데이터 테이블에 새로운 키가 추가됩니다. 이 키의 이름은 `default-optional-dependency-keys`이며, 다음 설명을 가집니다.
*   TOML 타입: 문자열 배열 (Array of strings)
*   해당 코어 메타데이터 필드: `Default-Extra`

`default-optional-dependency-keys`의 각 문자열은 `optional-dependencies`에 정의된 `extra`의 이름이어야 하며, 이 배열의 각 `extra`는 코어 패키지 메타데이터의 일치하는 `Default-Extra` 항목으로 변환됩니다. 이전 섹션에서 제시된 `Default-Extra` 항목 예시를 생성하는 유효한 사용 예시는 다음과 같습니다.

```toml
[project]
default-optional-dependency-keys = [
    "recommended",
]
```
그리고:
```toml
[project]
default-optional-dependency-keys = [
    "backend1",
    "backend2",
    "backend3"
]
```

#### 기본 `extras` 재정의 (Overriding default extras)

의존성 명세에서 `extras`가 명시적으로 주어지면, 기본 `extras`는 무시됩니다. 그렇지 않으면 기본 `extras`가 설치됩니다.

예를 들어, 패키지가 `extra1`을 기본 `extra`로 정의하고 `extra2`를 비기본 `extra`로 정의한 경우, 사용자가 다음과 같이 패키지를 설치하면:

```bash
$ pip install package
```
기본 `extra1` 의존성이 포함됩니다. 만약 사용자가 대신 다음과 같이 패키지를 설치하면:

```bash
$ pip install package[extra2]
```
`extra2`가 설치되지만, 기본 `extra1`은 무시됩니다.

설치 명령이나 의존성 트리에서 동일한 패키지가 여러 번 지정되는 경우, 패키지의 인스턴스 중 하나라도 `extras`가 지정되지 않은 경우 기본 `extras`가 설치되어야 합니다. 예를 들어, `package`가 의존성 트리에서 여러 번 나타나는 패키지 `spam`을 설치하는 경우:

```
spam
├── tomato
│   ├── package[extra2]
└── egg
    └── package
```
`package`가 최소한 한 번 `extras`가 지정되지 않은 채로 나타나므로, 기본 `extra`가 설치되어야 합니다.

`package[]`와 같이 비어 있는 `extras` 세트는 어떤 기본 `extras`도 설치하지 않아야 함을 의미하는 것으로 해석되어야 합니다 (단, `package`가 의존성 트리의 다른 곳에 나타나는 경우는 예외이며, 이 경우 위에서 언급한 대로 기본 `extra`가 설치됩니다). 이것은 패키지의 최소 설치를 얻는 보편적인 방법을 제공할 것입니다.

`pip`와 같은 일부 도구는 현재 인식할 수 없는 `extras`를 무시하고 사용자에게 `extra`가 인식되지 않았음을 알리는 경고를 발생시킵니다. 예를 들어:

```bash
$ pip install package[non-existent-extra]
WARNING: package 3.0.0 does not provide the extra 'non-existent-extra'
...
```
이러한 방식으로 동작하는 도구(오류를 발생시키는 대신)의 경우, 의존성 명세에서 `extra`가 유효하지 않은 것으로 인식되면 무시되어야 합니다. 그리고 지정된 모든 `extras`가 유효하지 않은 경우, 이는 `package`가 아닌 `package[]`와 동일한 것으로 간주되어야 하며, 어떤 기본 `extras`도 설치하지 않아야 합니다.

마지막으로, (또한 "Relying on tooling to deselect any default extras" 섹션에서 논의된 바와 같이) 패키지 설치 도구는 위 동작을 제어하기 위한 자체 옵션을 구현할 수 있습니다. 예를 들어, 이러한 패키지가 의존성 트리의 어디에 나타나든 관계없이 일부 또는 모든 패키지에 대한 기본 `extras`를 비활성화하는 옵션을 구현할 수 있습니다. 이러한 도구별 옵션이 구현되는 경우, 도구 개발자는 이를 옵트인(opt-in) 방식으로 만들어야 하며, 사용자는 위에 명시된 PEP 771 동작을 기본으로 경험해야 합니다.

### 예시 (Examples)

이 섹션에서는 "동기" 섹션에서 설명된 사용 사례와, 위에 설명된 명세를 사용하여 이를 어떻게 해결할 수 있는지 살펴봅니다.

#### 권장되는 의존성 및 최소 설치 (Recommended dependencies and minimal installations)

먼저, 기본적으로 권장되지만 엄격하게 필수는 아닌 의존성을 설치하고, 필요한 의존성만 설치하는 방법도 제공하려는 패키지의 경우를 고려합니다.

이를 위해 패키지 관리자는 권장되지만 필수는 아닌 의존성을 포함하는 `recommended`라는 `extra`를 정의하고, 이를 기본 `extra`로 포함하도록 선택할 것입니다.

```toml
[project]
default-optional-dependency-keys = [ "recommended" ]

[project.optional-dependencies]
recommended = [
    "package1",
    "package2"
]
```
이 패키지가 `package`라고 불린다면, `package`를 설치하는 사용자는 `package[recommended]`와 동일한 결과를 얻게 됩니다. 사용자는 대안으로 `package[]`를 설치하여 기본 `extras` 없이 패키지를 설치할 수 있습니다.

"동기" 섹션의 구체적인 패키지 예시 중 하나인 `astropy` 패키지는 `recommended` `extra`를 정의하며, 사용자는 현재 기본 설치 지침에서 이를 설치하도록 안내받습니다. 이 PEP를 통해 `recommended` `extra`는 기본 `extra`로 선언될 수 있습니다.

```toml
[project]
default-optional-dependency-keys = [ "recommended" ]

[project.optional-dependencies]
recommended = [
    "scipy",
    "..."
]
```
이는 다음 설치 명령이:

```bash
$ pip install astropy
```
`scipy`와 같은 선택적이지만 권장되는 의존성을 설치할 것임을 의미합니다. 최소 설치를 원하는 고급 사용자는 다음을 사용할 수 있습니다.

```bash
$ pip install astropy[]
```

#### 최소한 하나의 백엔드 또는 프론트엔드를 요구하는 패키지 (Packages requiring at least one backend or frontend)

"동기" 섹션에서 설명한 바와 같이, 일부 패키지는 여러 백엔드 및/또는 프론트엔드를 지원할 수 있으며, 어떤 경우에는 항상 최소한 하나의 백엔드 또는 프론트엔드 패키지가 설치되도록 하는 것이 바람직할 수 있습니다. 그렇지 않으면 패키지를 사용할 수 없기 때문입니다. 구체적인 예로는 GUI 라이브러리가 있어야 사용할 수 있지만 다른 라이브러리를 지원할 수 있는 GUI 애플리케이션, 또는 여러 계산 백엔드에 의존할 수 있지만 최소한 하나는 설치되어야 하는 패키지가 있습니다.

이 경우, 패키지 관리자는 각 백엔드 또는 프론트엔드에 대한 `extra`를 정의하고 기본값을 제공하도록 선택할 수 있습니다.

```toml
[project]
default-optional-dependency-keys = [ "backend1" ]

[project.optional-dependencies]
backend1 = [
    "package1",
    "package2"
]
backend2 = [
    "package3"
]
```
패키지가 예를 들어 여러 백엔드를 동시에 지원할 수 있고, 일부 백엔드가 항상 설치되어야 한다면, 이들에 대한 의존성은 기본 `extras` 메커니즘을 사용하는 대신 필수 의존성으로 제공되어야 합니다.

"동기" 섹션에서 언급된 구체적인 예시 중 하나인 `napari` 패키지는 `PyQt5`, `PyQt6`, `PySide2`, 또는 `PySide6` 중 하나를 사용할 수 있으며, 사용자는 현재 이 중 하나가 설치되도록 `napari[all]`을 명시적으로 지정하거나, `napari[pyqt5]`와 같이 특정 프론트엔드 패키지를 명시적으로 지정해야 합니다. `extras` 없이 `napari`를 설치하면 작동하지 않는 패키지가 됩니다. 이 PEP를 통해 `napari`는 다음 구성을 정의할 수 있습니다.

```toml
[project]
default-optional-dependency-keys = [ "pyqt5" ]

[project.optional-dependencies]
pyqt5 = [
    "PyQt5",
    "..."
]
pyside2 = [
    "PySide2",
    "..."
]
pyqt6 = [
    "PyQt6",
    "..."
]
pyside6 = [
    "PySide6",
    "..."
]
```
이는 다음 설치 명령이:

```bash
$ pip install napari
```
별도의 설정 없이 작동하지만, 사용자가 예를 들어 `napari[pyside6]`와 같이 프론트엔드를 명시적으로 지정할 수 있는 메커니즘은 여전히 존재할 것임을 의미합니다.

#### 기본 `extras`를 제거하지 않는 `extras` 지원 (Supporting extras that should not remove default extras)

여기서 고려하는 추가적인 경우는 패키지 관리자가 기본 `extras`를 제거하지 않고 사용자가 비기본 `extras`를 옵트인(opt-in)할 수 있도록 지원하고자 하는 경우입니다. 본질적으로 그들은 다음을 원할 수 있습니다.
*   `package[]`는 `extras` 없이 설치합니다.
*   `package`는 권장 의존성(권장 `extra`에 있는)을 설치합니다.
*   `package[alternative]`는 기본 `extras`를 설치하지 않지만, 대안적인 선택적 의존성 세트(대안 `extra`에 있는)를 설치합니다.
*   `package[additional]`은 권장 의존성과 추가 의존성(추가 `extra`에 있는)을 모두 설치합니다.

이는 예를 들어 다음을 통해 달성될 수 있습니다.

```toml
[project]
default-optional-dependency-keys = [ "recommended" ]

[project.optional-dependencies]
recommended = [
    "package1",
    "package2"
]
alternative = [
    "package3"
]
additional = [
    "package[recommended]", # 패키지 자체를 참조하여 기본 extra를 포함
    "package4"
]
```
패키지가 `extras`에서 자신을 참조하는 기능은 기존 Python 패키징 도구에 의해 지원됩니다.

다시 한번 구체적인 예시로 `astropy`를 고려하면, 이 PEP를 통해 `recommended` `extra`를 정의할 수 있습니다 ("권장되는 의존성 및 최소 설치" 섹션에서 설명된 바와 같이). 그러나 `jupyter`와 같은 다른 `extras`도 정의하는데, 이는 Jupyter 기반 환경 내에서 사용자 경험을 향상시키는 패키지를 추가합니다. 이 `extra`를 선택하는 사용자도 여전히 권장되는 의존성을 설치하기를 원할 수 있습니다. 이 경우 다음 구성이 이 문제를 해결할 것입니다.

```toml
[project]
default-optional-dependency-keys = [ "recommended" ]

[project.optional-dependencies]
recommended = [
    "scipy",
    "..."
]
jupyter = [
    "astropy[recommended]", # astropy 자체를 참조하여 'recommended' extra를 포함
    "ipywidgets",
    "..."
]
```
다음과 같이 설치하는 사용자:

```bash
$ pip install astropy[jupyter]
```
그러면 `astropy[recommended, jupyter]`와 동일한 것을 얻게 됩니다.

#### 여러 종류의 기본값을 가진 패키지 (Packages with multiple kinds of defaults)

어떤 경우에는 패키지에 여러 종류의 기본값이 필요할 수 있습니다. 예를 들어, "최소한 하나의 백엔드 또는 프론트엔드를 요구하는 패키지" 섹션에서 백엔드 또는 프론트엔드를 가진 패키지의 경우를 고려했지만, 어떤 경우에는 패키지가 백엔드와 프론트엔드를 모두 지원해야 할 수 있으며, 하나 이상의 기본 프론트엔드와 하나 이상의 기본 백엔드를 지정하기를 원할 수 있습니다.

이상적으로는 다음 동작을 원할 수 있습니다.
*   `$ pip install package` # 기본 백엔드와 프론트엔드를 설치합니다.
*   `$ pip install package[]` # 백엔드나 프론트엔드를 설치하지 않습니다.
*   `$ pip install package[backend1]` # `backend1`과 기본 프론트엔드를 설치합니다.
*   `$ pip install package[frontend2]` # `frontend2`와 기본 백엔드를 설치합니다.
*   `$ pip install package[backend1, frontend2]` # `backend1`과 `frontend2`를 설치합니다.

그러나 이 PEP는 복잡성을 추가하기 때문에, 예를 들어 `backend1`이 지정된 경우 기본 백엔드는 비활성화되지만 기본 프론트엔드는 활성화되는 메커니즘을 제공하지 않기로 선택했습니다.

관리자는 대신 지금은 백엔드 또는 프론트엔드가 명시적으로 지정된 경우 백엔드와 프론트엔드 모두를 지정해야 함을 문서화해야 합니다. 그러나 이를 원하는 사용자의 발견 가능성(discoverability)은 문제가 되지 않을 것입니다. 사용자는 어떤 백엔드나 프론트엔드를 사용할 수 있는지 알아보기 위해 어차피 문서를 읽어야 하므로, 백엔드와 프론트엔드에 대한 `extras`를 올바르게 사용하는 방법을 동시에 보여줄 수 있습니다.

사용자 편의성을 높이는 한 가지 옵션은 관리자가 예를 들어 `defaultbackend` 및 `defaultfrontend`라는 `extras`를 만들고, 이들이 기본 백엔드와 프론트엔드를 설치하도록 하는 것입니다. 그런 다음 사용자에게 다음을 권장할 수 있습니다.

```bash
$ pip install package # 기본 백엔드와 프론트엔드를 설치합니다.
$ pip install package[] # 백엔드나 프론트엔드를 설치하지 않습니다.
$ pip install package[backend1, defaultfrontend] # backend1과 기본 프론트엔드를 설치합니다.
$ pip install package[defaultbackend, frontend2] # frontend2와 기본 백엔드를 설치합니다.
$ pip install package[backend1, frontend2] # backend1과 frontend2를 설치합니다.
```
이를 통해 (원하는 경우) 사용자는 시간이 지나면서 기본 백엔드가 변경되더라도 권장되는 백엔드를 얻을 수 있습니다.

미래에 더 나은 해결책을 구현하려는 열망이 있다면, 이 PEP가 이를 배제하지는 않는다고 생각합니다. 예를 들어, 미래에는 `extra`가 어떤 기본 `extras`를 비활성화하는지 지정하는 기능을 추가할 수 있으며, 이 부분이 지정되지 않으면 명시적으로 지정된 `extras`가 모든 기본 `extras`를 비활성화할 수 있습니다 (이 PEP와 일치).

### 하위 호환성 (Backward Compatibility)

#### 기본 `extras`를 사용하지 않는 패키지 (Packages not using default extras)

패키징 생태계의 도구에 이 PEP에 대한 지원이 추가되면, 기본 `extras`를 사용하지 않는 패키지는 그대로 작동하며 호환성 문제는 없을 것입니다.

#### 기본 `extras`를 사용하는 패키지 (Packages using default extras)

패키지가 기본 `extras`를 정의하기 시작하면, 이러한 기본값은 이 PEP를 구현하는 최신 버전의 패키징 도구에서만 적용됩니다. 그러나 해당 패키지는 이전 패키징 도구에서도 설치 가능하며, 주요 차이점은 이전 패키징 도구를 사용할 때 기본 `extras`가 자동으로 설치되지 않는다는 것입니다.

"How to teach this" 섹션에서 설명된 바와 같이, 패키지 작성자는 사용자 기반에 따라 `default extra` 기능을 언제, 어떻게 채택할지 신중하게 평가해야 합니다. 일부 작업(예: 필수 의존성을 기본 `extra`로 이동)은 상당수의 사용자가 `default extras`를 지원하지 않는 이전 패키지 설치 도구를 여전히 사용하고 있다면 사용자에게 문제가 발생할 수 있습니다. 이러한 의미에서 패키지 작성자는 이 기능이 특정 방식으로 사용될 경우 사용자에게 하위 호환성 문제를 일으킬 수 있음을 인지하고, 사용자에게 미치는 영향을 최소화할 책임이 있습니다.

#### 패키징 관련 도구 (Packaging-related tools)

가장 중요한 하위 호환성 측면은 패키징 도구가 `extras`에 대해 가지고 있는 가정과 관련이 있습니다. 특히, 이 PEP는 `extras`가 더 이상 의존성 트리에 의존성을 추가하는 측면에서만 배타적으로 추가적인 것이 아니며, 일부 `extras`를 지정하면 더 적은 의존성이 설치될 수 있다는 가정을 변경합니다.

동작 변경의 구체적인 예시는 `pip`에서 볼 수 있습니다. `numpy`에 필수 의존성이 있고, `scipy`를 포함하는 `recommended`라는 기본 `extra`를 가진 `package`라는 패키지를 고려해봅시다. 사용자가 `package[]`를 설치하면 `package`와 `numpy`만 설치됩니다. 사용자가 다음과 같이 실행하면:

```bash
$ pip freeze > requirements.txt
```
`requirements.txt`에는 예를 들어 다음과 같이 포함될 것입니다.

```
package==1.0.2
numpy==2.1.0
```
그러나 사용자가 이 파일을 사용하여 요구 사항을 설치하면:

```bash
$ pip install -r requirements.txt
```
`pip`는 `package` (기본 `extra`를 포함)와 `numpy`를 설치할 것이므로, 최종 환경에는 `scipy`가 포함될 것입니다. 이 특정 경우의 해결책은 사용자가 의존성 트리를 해결하지 않기 위해 `pip install`에 `--no-deps`를 전달하는 것이지만, 여기서 요점은 `extra`가 미칠 수 있는 영향에 대한 가정의 변경으로 인해 패키징 도구의 동작에 변화가 있을 수 있음을 보여주는 것입니다.

최근 승인된 PEP 751은 미래에 `pip freeze` 출력 및 다른 도구와 같은 대안을 대체할 새로운 파일 형식을 정의한다는 점에 주목할 가치가 있습니다. 새 파일 형식은 파일 내 패키지가 의존성을 해결하지 않고 설치되도록 설계되었으며, 이는 이 PEP에 명시된 `default extras`와 완전히 호환되며, 위에서 언급된 `pip freeze` / `pip install -r` 문제를 피할 것입니다.

### 보안 영향 (Security Implications)

이 PEP에 대한 알려진 보안 영향은 없습니다.

### 교육 방법 (How to teach this)

이 섹션에서는 이 PEP의 구현과 관련하여 커뮤니티의 다양한 그룹에 제공되어야 할 정보를 설명합니다. 아래 설명된 일부 측면은 PEP가 패키징 도구에 완전히 구현되기 전에도 관련성이 있을 것이며, 이는 향후 잠재적인 전환을 용이하게 하기 위해 미리 할 수 있는 준비가 있기 때문입니다. 아래에 다루는 그룹은 다음과 같습니다.
*   패키지 최종 사용자 (Package end users)
*   패키지 작성자 (Package authors)
*   패키징 저장소 관리자 (Packaging repository maintainers)

#### 패키지 최종 사용자 (Package end users)

패키지 사용자에게는 패키지에 어떤 `extras`를 사용할 수 있고 어떻게 동작하는지 보여주는 명확한 설치 지침이 제공되어야 합니다. 예를 들어, 기본적으로 일부 권장되는 의존성 또는 주어진 프론트엔드나 백엔드가 설치되며, 사용 가능한 옵션에 따라 이를 어떻게 제외하거나 기본값을 재정의하는지 설명해야 합니다.

#### 패키지 작성자 (Package authors)

`extras`를 정의하는 메커니즘과 이를 사용해야 하는 관련 규칙은 명확하지만, 패키지 작성자는 역호환성을 의도치 않게 깨뜨리지 않기 위해 이 기능을 자신의 패키지에 적용하기 전에 여러 가지 사항을 신중하게 고려해야 합니다.

##### 이전 버전의 패키지 설치 도구 지원 (Supporting older versions of package installers)

`pip` 또는 `uv`와 같은 패키지 설치 도구는 `default extras`에 대한 지원을 동시에 구현하지 않을 수 있으며, 일단 구현되면 패키지 작성자는 최신 버전의 패키지 설치 도구를 사용하지 않는 사용자를 계속 지원하기를 원할 가능성이 높습니다. 이 경우 다음 권장 사항이 적용됩니다.

*   패키지를 필수 의존성에서 기본 `extra`로 이동하는 것은 호환성을 깨는 변경(breaking change)이 될 것입니다. 왜냐하면 이전 버전의 패키지 설치 도구는 `default extras` 개념을 인식하지 못하고, 더 적은 의존성으로 패키지를 설치하게 되어, 해당 의존성에 의존했을 사용자에게 영향을 미칠 수 있기 때문입니다. 따라서, 이미 자리 잡은 패키지에서 의존성을 필수에서 기본 `extra`로 변경하는 것은 개발자가 이 PEP를 구현하는 설치 도구를 사용하는 사용자만을 지원하려는 경우에만 미래에 이루어져야 합니다.
*   기존 `extra`를 기본값으로 만드는 것은 더 안전할 것입니다. 예를 들어 `astropy`의 `recommended`를 기본 `extra`로 만드는 것과 같습니다. 그러나 이전 버전의 패키지 설치 도구를 사용하는 사용자를 지원하기 위해서는, 가능한 한 오랫동안 (대부분의/모든 사용자가 이 PEP를 구현하는 패키지 설치 도구를 사용하고 있다는 것이 명확해질 때까지) 문서에 `extra`를 명시적으로 언급해야 합니다. `extra`를 명시적으로 언급하는 것을 유지하는 데에는 단점이 없지만, 이는 문서를 읽지 않는 (상당한 비중을 차지할 수 있는) 최신 도구를 사용하는 사용자들이 기본적으로 권장 의존성을 얻기 시작하도록 보장할 것입니다.
*   이 PEP 이전에는 `package[]`가 `package`와 동일했기 때문에, 작성자는 `package[]`를 최소 설치를 얻는 하위 호환 가능한 보편적인 방법으로 문서화할 수 있습니다. `default extras`를 정의하는 패키지의 경우, `package[]`를 설치하면 `pip`와 같은 이전 버전의 패키징 도구를 사용하더라도 항상 최소 설치를 제공할 것입니다. 또한 특정 패키지에 `default extras`가 도입되기 전의 패키지 릴리스도 `package[]`로 설치할 수 있습니다 (이 경우 `package`와 동일합니다). `default extras`를 정의하지 않는 패키지의 경우, `package[]`는 계속해서 `package`와 동일할 것입니다.

##### 많은 기본 의존성 추가 피하기 (Avoiding the addition of many default dependencies)

작성자는 이러한 의존성을 제외할 수 있는 방법을 제공할 수 있기 때문에 많은 의존성을 기본적으로 포함하려는 유혹을 느낄 수 있습니다. 그러나 작성자는 불필요하게 설치를 부풀리고 의존성 트리를 복잡하게 만들지 않도록 기본적으로 포함되는 내용을 신중하게 고려할 것을 권장합니다. `default extras`를 사용한다고 해서 모든 `extras`가 기본값이어야 하는 것은 아니며, 사용자가 비기본 `extras`를 명시적으로 옵트인할 여지는 여전히 있습니다.

`Default extras`는 일반적으로 필수 의존성과 동일한 "무게"로 취급되어야 합니다. 패키지가 널리 사용될 때, `default extra`를 도입하면 해당 `extra`의 의존성이 전이적으로(transitively) 포함됩니다. 이는 모든 다운스트림 패키지가 최소 설치 명세를 사용하여 명시적으로 옵트아웃하도록 업데이트되지 않는 한 그렇습니다.

예를 들어, `pytest` 패키지는 현재 약 1,500개의 플러그인이 의존하고 있습니다. 만약 `pytest`가 `default extra`를 추가하고 해당 플러그인들이 그에 따라 업데이트되지 않으면, 플러그인을 설치할 때 `default extras`의 의존성이 포함될 것입니다. 이것이 `default extras` 사용을 배제하는 것은 아니지만, `default extras`의 추가는 다운스트림 영향에 대한 신중한 평가를 필요로 합니다.

##### 기본 `extras` 상속 (Inheriting from default extras)

패키지 작성자가 `extra`를 기본적으로 설치되도록 선택하는 경우, 사용자가 다른 `extra`를 명시적으로 지정하면 "기본 `extras`를 제거하지 않는 `extras` 지원"에서 설명된 접근 방식을 사용하지 않는 한 기본 `extra`가 설치되지 않을 수 있음을 인식하는 것이 중요합니다.

서로 교환 가능한 백엔드와 같은 경우에는 `extra`가 명시적으로 지정되면 기본값을 무시하는 것이 올바른 일입니다. 그러나 다른 경우에는, 최소 설치를 허용하면서 권장 의존성을 포함하기 위해 `default extras`를 사용하는 것과 같이, 다른 많은 `extras`가 기본 `extras`를 명시적으로 '상속'해야 할 수 있으므로, 패키지 작성자는 어떤 경우에 `default extras`가 설치되기를 원하는지 신중하게 고려해야 합니다.

##### 호환되지 않는 `extras` (Incompatible extras)

어떤 경우에는 패키지에 상호 호환되지 않는 `extras`가 있을 수 있습니다. 이 경우, 다른 `extra`와 호환되지 않을 수 있는 의존성을 포함하는 `extra`에 대해 `default extra` 기능을 사용하지 않는 것을 권장합니다.

`package[A]`와 `package[B]` `extras`를 가진 패키지를 고려해봅시다. 사용자는 이미 현재 `package[A]`와 `package[B]` 또는 `package[A,B]`를 설치하려고 시도할 수 있으며, 이는 설치 오류를 초래할 수 있지만, 적어도 두 `extras`가 모두 설치되고 있다는 것이 명확할 것입니다. 그러나 `A`를 기본 `extra`로 만들면 직관적이지 않은 문제가 발생할 수 있습니다. 사용자는 다음을 실행할 수 있습니다.

```bash
$ pip install package # 이것은 package[A]를 설치합니다
$ pip install package[B]
```
그리고 `A`와 `B`가 명시적으로 동시에 설치된 적이 없더라도 설치 오류로 끝날 수 있습니다. 이러한 이유로, 문제가 발생할 가능성이 있는 의존성에 대해 `default extras`를 사용하지 않는 것을 권장합니다.

##### 순환 의존성 (Circular dependencies)

작성자는 순환 의존성이 존재할 때 특별한 주의를 기울여야 합니다. 예를 들어, 다음 의존성 트리를 고려해봅시다.

```
package1
└── package2
    └── package1
```
만약 `package1`에 `recommended`라는 기본 `extra`가 있다면:

```bash
$ pip install package1[]
```
`package2`가 계속해서 `package1`에 의존하는 경우 (지정된 `extras` 없이) `recommended` `extra`가 여전히 설치될 것입니다. 이는 의존성 트리를 다음으로 변경함으로써 해결될 수 있습니다.

```
package1
└── package2
    └── package1[]
```
(단, `package2`가 `package1`의 `extra` 의존성에 의해 제공되는 기능에 실제로 의존하지 않는다고 가정합니다). 따라서 작성자는 `package2`의 작성자와 조율하여 마이그레이션 계획을 신중하게 고려해야 합니다.

##### `default extras`를 가진 패키지 문서화 (Documenting packages with default extras)

`default extras`가 어떻게 사용되든 관계없이, 패키지 작성자는 패키지 문서가 `extras`를 어떻게 사용해야 하는지 명확하게 설명하도록 해야 합니다. '모범 사례' 문서에는 다음이 언급되어야 합니다.
*   `package`를 설치하는 것은 `package[<default extras>]`와 동일할 것입니다.
*   `package[]`를 설치하는 것은 최소/필수 의존성만 포함할 것이지만, `package`가 의존성 트리의 다른 곳에 나타나는 경우 선택적 의존성이 설치되지 않음을 보장하지는 않습니다.
*   사용 가능한 다른 선택적 `extras`가 무엇이며, 이들이 기본 `extras`를 비활성화하는지 여부 (이는 "기본 `extras`를 제거하지 않는 `extras` 지원"에서 설명된 대로 제어될 수 있음).
*   예를 들어 기본 백엔드와 프론트엔드를 가질 수 있는 패키지에 대한 특정 지침 (이는 "여러 종류의 기본값을 가진 패키지"에서 설명된 대로).

#### 패키징 저장소 관리자 (Packaging repository maintainers)

`conda`, `Homebrew`, `apt`, `yum`과 같은 Linux 패키지 설치 도구 등 다양한 배포판을 위해 Python 라이브러리를 재패키징하는 개인에게 미치는 영향을 고려해야 합니다. 모든 패키지 배포판이 설명된 접근 방식과 일치하는 메커니즘을 가지고 있는 것은 아닙니다. 사실, `conda`와 같은 일부 배포판은 `extras` 개념조차 없습니다.

여기서 고려해야 할 두 가지 경우가 있습니다.
*   `conda-forge` 레시피의 일부와 같이 수동으로 재패키징하는 경우, 특히 `extras`에 해당하는 것이 없는 경우, `default extras`의 도입은 큰 영향을 미치지 않을 것입니다. 왜냐하면 어떤 의존성을 포함할지 이미 수동으로 결정해야 하기 때문입니다 (예를 들어, "동기" 섹션에서 언급된 `astropy` 패키지의 `conda-forge` 레시피는 사용자가 달리 명시적으로 요청할 방법이 없기 때문에 모든 권장 의존성을 기본적으로 포함합니다).
*   자동화된 방식으로 재패키징하는 경우, 배포판 관리자는 `default extras`를 어떻게 처리할지 신중하게 고려해야 하며, 이는 상당한 양의 작업과 논의를 의미할 수 있습니다.

이와 같은 PEP가 다양한 패키지 배포판 각각을 상세히 고려하는 것은 불가능합니다. 그러나 궁극적으로 `default extras`는 패키지 작성자가 대부분의 사용자를 위해 자신의 패키지가 어떻게 설치되기를 원하는지를 나타내는 것으로 이해되어야 하며, 이는 `default extras`를 수동으로 또는 자동으로 처리하는 방법에 대한 결정에 정보를 제공해야 합니다.

### 참조 구현 (Reference Implementation)

다음 저장소에는 `default extras`를 사용하는 완전히 작동하는 데모 패키지가 포함되어 있습니다.

*   [https://github.com/wheel-next/pep_771](https://github.com/wheel-next/pep_771)

이는 여러 패키지의 수정된 브랜치를 사용하며, 다음 링크는 해당 브랜치입니다.
*   [Setuptools](https://github.com/pypa/setuptools/tree/pep771)
*   [pip](https://github.com/pypa/pip/tree/pep771)
*   [importlib_metadata](https://github.com/python/importlib_metadata/tree/pep771)

또한, 이 브랜치에는 수정된 `Flit` 패키지 버전이 포함되어 있습니다.

위 구현은 현재 개념 증명(proof-of-concept)이며, 기존 변경 사항은 아직 관련 관리자들의 검토를 거치지 않았습니다. 그럼에도 불구하고, 관심 있는 관리자들이 시도해 볼 수 있을 만큼 충분히 기능적입니다.

### 거부된 아이디어 (Rejected Ideas)

#### 권장 설치를 위한 메타 패키지 사용 (Using a meta-package for recommended installations)

기존 패키징 도구 및 인프라를 사용하여, 일부 사용자에게는 최소 설치를 제공하고 일반 사용자에게는 기본 비최소 설치(예: 권장 의존성 또는 기본 백엔드 포함)를 제공하려는 패키지 관리자는 기술적으로 이미 이를 달성할 수 있습니다. 이는 하나의 패키지 대신 두 개의 패키지를 배포할 의향이 있다면 가능합니다. 예를 들어, 최소 의존성을 가진 주 패키지인 `package-core`와, 선택적 의존성이 활성화된 `package-core`에 의존하는 메타 패키지 `package`입니다.

"동기" 섹션의 구체적인 예시를 다시 들어보면, `astropy` 패키지는 `recommended` `extra`를 정의하며, 사용자는 현재 기본 설치 지침에서 이를 설치하도록 안내받습니다. 원칙적으로 기존 `astropy` 패키지를 `astropy-core` 등으로 이름을 바꾸고, 새로운 `astropy` 패키지를 생성하여 다음 의존성 섹션을 포함하는 메타 패키지로 만들 수 있습니다.

```toml
dependencies = [ "astropy-core[recommended]" ]
```
사용자가 `astropy` 메타 패키지에 버전 제약을 걸거나 고정(pin)하기를 원할 수 있으므로 (예: `astropy>5.0`), 메타 패키지는 코어 패키지와 동일한 버전을 따라야 하며, 의존성 섹션에서 엄격한 고정(strict pinning)을 사용해야 합니다. 예를 들어:

```toml
version = "7.1.0"
dependencies = [ "astropy-core[recommended]==7.1.0" ]
```
이 아이디어는 기술적으로 이미 실현 가능하기 때문에 매력적으로 보일 수 있습니다. 그러나 실제로는 많은 프로젝트가 여러 가지 이유로 이를 선택하지 않았으며, 이제 이를 살펴보겠습니다. 이 중 일부는 미래의 새로운 프로젝트에는 적용되지 않을 수 있지만, 일부는 모든 프로젝트(오래된 프로젝트와 새로운 프로젝트 모두)에 적용됩니다.

##### 패키지 이름과 모듈 이름 불일치 (Mismatch between package and module name)

메타 패키지 접근 방식을 사용하려는 패키지의 경우, 이름 지정과 관련하여 두 가지 주요 옵션이 있습니다.
1.  **첫 번째 옵션** 은 기존 패키지를 그대로 유지하는 것입니다. 즉, `package`가 최소 설치를 제공하고, `package-all`과 같은 다른 이름으로 새 메타 패키지를 만드는 것입니다. 그러나 이는 이 PEP를 처음 동기 부여했던 문제 중 하나인 "사용자들이 종종 `package[recommended]`와 같은 것을 할 수 있다는 것을 알지 못한다"는 문제와 동일하게, `package-all`이 존재한다는 것을 깨닫지 못할 수 있다는 점에서 고통받습니다. 이는 다시 한번 일반 사용자에게 이를 발견해야 하는 부담을 지우며, 일부 부담을 고급 사용자에게로 옮기지 못합니다.
2.  **두 번째 옵션** 은 기존 패키지의 이름을 `package-core` 등으로 변경하고, 새 메타 패키지의 이름을 `package`로 하는 것입니다. 이는 첫 번째 옵션보다 낫지만, `package-core`가 `package` 모듈을 제공하고 `package`는 어떤 모듈도 제공하지 않는다는 점에서 패키지 이름과 모듈 이름 사이에 직관적이지 않은 불일치를 초래하므로 이상적이지 않습니다. 이것이 혼란을 야기하는 이유의 예시는 일반 사용자가 `package` 모듈을 제거하는 것이 예를 들어 다음과 같이 수행될 것이라고 생각할 수 있다는 것입니다.

    ```bash
    $ pip uninstall package
    ```
    그러나 이것은 사실이 아닐 것이며 (`package` 모듈은 여전히 작동할 것입니다), 이 사용자는 `package-core` 패키지가 존재한다는 사실조차 명확하게 알지 못할 수 있습니다.

##### 다중 저장소 또는 모노레포 (Multiple repositories or monorepos)

이 접근 방식은 하나 대신 두 개의 저장소를 유지하거나, 두 패키지를 모두 포함하는 모노레포(monorepo)를 사용하는 것을 필요로 합니다. 두 옵션 모두 이상적이지 않습니다.
*   **두 개의 저장소로 분할** 하는 것은 관리자에게 장기적으로 추가적인 부담을 지웁니다. 관리자는 버전뿐만 아니라 `extras`와 같은 다른 측면에서도 이들이 동기화되도록 확인해야 합니다 (메타데이터 동기화에서 논의될 예정). 또한 "패키지 이름과 모듈 이름 불일치"에서 언급된 이름 지정 문제는 여기에서 추가적인 복잡성을 가집니다. 저장소 이름이 패키지와 일치하는 경우, 이전 패키지 저장소의 체크아웃을 가진 모든 사용자는 원격 URL 또는 `git clone` URL을 `package-core` 저장소를 가리키도록 업데이트해야 합니다. 대안은 `package-core` 패키지를 포함하도록 패키지 저장소를 보존하고, 메타 패키지에 다른 이름을 가지도록 하는 것이지만, 이는 혼란을 야기할 수 있습니다.
*   **모노레포로 전환** 하는 것은 일부 프로젝트에게는 상당한 변화일 수 있으며, 도구들이 기본적으로 단일 저장소가 단일 패키지에 해당한다고 가정하는 것은 드문 일이 아닙니다. 비록 이러한 도구들이 모노레포와 작동하도록 구성될 수 있지만, 이는 관리자에게 추가적인 부담입니다. 또한, 주 패키지가 모노레포 내의 하위 디렉토리로 이동되는 경우, 예를 들어 저장소 URL에서 패키지를 `pip install`하는 모든 사용자는 이를 하위 디렉토리에서 설치하도록 조정해야 하며 (저장소 URL에 `subdirectory=` 추가), 이전 레이아웃을 가정하는 기존 워크플로우는 작동하지 않게 됩니다.

##### 최소 패키지에 의존 (Depending on the minimal package)

분할이 이루어진 첫 번째 버전보다 오래된 패키지 버전에 의존해야 하는 패키지는 최소 패키지에 쉽게 의존할 수 없을 것입니다. 이 PEP의 주요 제안에서는 다운스트림 사용자가 예를 들어 `package[]>version`에 의존할 수 있지만 (여기서 `version`은 `default extras` 도입 이전의 버전), 분할 접근 방식으로는 다운스트림 사용자가 예를 들어 `package-core>version`에 의존할 수 없을 것입니다. 왜냐하면 `package-core`는 이전에 존재하지 않았기 때문입니다.

이에 대한 가능한 해결책은 개발자가 패키지의 모든 이전 버전에 대해 no-op 메타데이터 패키지를 출시하는 것이지만, 이는 관리자에게 상당한 추가 부담입니다.

##### 제거 (Uninstallation)

"패키지 이름과 모듈 이름 불일치"에서 이름 지정 문제를 언급할 때 암시했듯이, 패키지 제거는 사용자가 예상하는 방식으로 더 이상 작동하지 않을 것입니다. 사용자가 다음을 실행하면:

```bash
$ pip uninstall package
```
`package-core`가 여전히 남아 있겠지만, 사용자는 이를 깨닫지 못할 수 있습니다. 이는 혼란스러울 뿐만 아니라, 실제로는 많은 기존 워크플로우에 영향을 미칠 수 있는 호환성을 깨는 변경(breaking change)입니다.

##### 패키지 배포판 (Package distributions)

하나 대신 두 개의 패키지를 가지는 것은 단순히 하나 대신 두 개의 패키지가 릴리스되어야 한다는 사실 때문에 패키지 배포판의 장기 유지보수 비용을 증가시킬 것이며, 어떤 경우에는 각 릴리스마다 추가적인 수작업을 초래할 것입니다.

##### 메타데이터 동기화 (Synchronizing metadata)

주요 패키지와 메타 패키지 간에 동기화 상태를 유지하는 것이 중요한 주요 메타데이터는 버전입니다. 코어 패키지의 새 릴리스가 있을 때마다 메타 패키지는 버전이 업데이트되어야 하며, 의존성 섹션의 코어 패키지에 대한 버전 고정(version pinning)도 업데이트되어야 합니다.

또한, 코어 패키지에 정의된 모든 `extras`는 메타 패키지에서 재정의되고 동기화 상태를 유지해야 합니다. 예를 들어, `package`가 `additional` `extra`를 정의하는 경우, 사용자는 여전히 `package[additional]`를 설치할 수 있어야 하지만, `package-core` 패키지를 설치하는 사용자도 `package-core[additional]`를 수행할 수 있는 옵션이 있어야 합니다.

동기화해야 할 다른 메타데이터에는 예를 들어 작성자 정보 및 프로젝트 URL이 포함됩니다.

##### 요약 (Summary)

전반적으로, 이 해결책은 초기 설정 및 전환(이는 이미 대규모 기존 프로젝트에는 엄청난 부담이 될 수 있음)뿐만 아니라 장기 유지보수 측면에서도 상당히 높은 유지보수 부담을 의미할 것입니다. 이는 또한 사용자 워크플로우를 깨뜨릴 가능성도 있습니다 (특히 저장소 문제 및 제거와 관련하여). 이러한 모든 이유로, 이 PEP의 현재 제안에 대한 설득력 있는 대안으로 간주하지 않습니다.

#### `extras` 선택 해제를 위한 구문 (Syntax for deselecting extras)

주요 경쟁 접근 방식 중 하나는 다음과 같았습니다. 어떤 `extras`라도 명시적으로 제공되면 기본값이 선택 해제되는 대신, 기본 `extras`는 명시적으로 선택 해제되어야 한다는 것입니다.

이 그림에서 `extras` 선택 해제를 위한 새로운 구문이 PEP 508에 정의된 미니 언어의 확장으로 도입될 것입니다. 패키지가 `default extras`를 정의하는 경우, 사용자는 `extra` 이름 앞에 마이너스 부호(`-`)를 사용하여 이러한 기본값에서 옵트아웃할 수 있습니다. 제안된 구문 업데이트는 다음과 같았을 것입니다.

```
extras_list = (-)?identifier (wsp* ',' wsp* (-)?identifier)*
```
이 새로운 구문의 유효한 예시는 다음과 같습니다.

```
package[-recommended]
package[-backend1, backend2]
package[pdf, -svg]
```
그러나 이 접근 방식에는 두 가지 주요 문제가 있습니다.
1.  `extra`와 그 부정된 버전이 동일한 의존성 명세에 모두 존재하는 경우 (예: `package[pdf, -pdf]`) 또는 의존성 트리에 `package[pdf]`와 `package[-pdf]`가 모두 포함된 경우와 같은 모서리 사례를 해석하는 방법에 대한 여러 규칙을 정의해야 하며, 이러한 규칙은 사용자에게 직관적이지 않을 것입니다.
2.  더 중요하게는, 이는 의존성 명세에 새로운 구문을 도입할 것입니다. 이는 어떤 패키지가 새 구문을 사용하여 의존성을 정의하면, 해당 패키지와 이에 의존하는 다른 모든 패키지가 기존 패키징 도구로 더 이상 설치될 수 없게 되어, 주요 하위 호환성 문제가 될 것임을 의미합니다.

이러한 이유로 이 대안은 최종 제안에 포함되지 않았습니다.

#### `extras_require`에 특별 항목 추가 (Adding a special entry in extras_require)

새로운 `Default-Extra` 메타데이터 필드를 도입하는 대안으로 탐색된 잠재적인 해결책은 '특별한' 이름을 가진 `extra`를 활용하는 것이었습니다.

한 가지 예시는 빈 문자열을 사용하는 것이었습니다.

```
Provides-Extra:
Requires-Dist: numpy ; extra == ''
```
이 아이디어는 '빈' `extras`의 일부로 설치되는 의존성이 다른 `extra`가 지정되지 않은 경우에만 설치된다는 것이었습니다. 이에 대한 구현이 [https://github.com/pypa/setuptools/pull/1503](https://github.com/pypa/setuptools/pull/1503)에서 제안되었지만, 기존 사용과의 호환성을 깨뜨리지 않고는 작동시킬 방법이 없다는 것이 밝혀졌습니다. 예를 들어, `setup.py` 파일을 통해 `Setuptools`를 사용하는 패키지는 다음을 수행할 수 있습니다.

```python
setup(
    ...
    extras_require={'': ['package_a']},
)
```
이는 유효하며 `package_a`가 `install_requires`에 정의된 것과 동일하므로, 빈 문자열의 의미를 변경하면 호환성이 깨집니다.

또한, 다른 어떤 문자열(예: `'default'`)도 특별한 문자열로 사용될 수 없습니다. 왜냐하면 하위 호환 가능한 유효한 `extra` 이름이 될 모든 문자열은 이미 기존 패키지에서 사용되고 있을 수 있기 때문입니다.

특별한 `None` Python 변수를 사용하는 제안도 있었지만, 다시 말하지만 이는 불가능합니다. `setup.py` 파일에서는 `None`을 사용할 수 있지만, `setup.cfg`나 `pyproject.toml`과 같은 선언형 파일에서는 불가능하며, 더 나아가 `extras` 이름은 궁극적으로 패키지 메타데이터에서 문자열로 변환되어야 합니다. 다음이 있는 경우:

```
Provides-Extra: None
```
이는 이미 Python 패키지에서 `extra` 이름으로 사용될 수 있는 문자열 `'None'`과 구별할 수 없을 것입니다. 만약 문자열이 아닌 '특별한' `extras` 이름을 허용하도록 코어 메타데이터 구문을 수정한다면, 코어 메타데이터 명세를 수정하는 것으로 돌아가는 것이므로, `Default-Extra`를 도입하는 것보다 나을 것이 없습니다.

#### 도구에 의존하여 기본 `extras` 선택 해제 (Relying on tooling to deselect any default extras)

`extras`를 선택 해제하는 또 다른 옵션은 패키징 도구 수준에서 이를 구현하는 것이었습니다. 예를 들어, `pip`는 다음과 같은 옵션을 포함할 수 있습니다.

```bash
$ pip install package --no-default-extras
```
이 옵션은 `--no-binary` 옵션과 유사하게 모든 패키지 또는 특정 패키지에 적용될 수 있습니다. 예를 들어:

```bash
$ pip install package --no-default-extras :all:
```
이 접근 방식의 장점은 `default extras`를 지원하는 도구가 `extras`를 선택 해제하는 것도 지원할 수 있다는 것입니다. 이 접근 방식은 `apt` 도구의 `--no-install-recommends` 옵션과 유사할 것입니다.

그러나 이 해결책은 그 자체로 이상적이지 않습니다. 왜냐하면 패키지가 자체적으로 특정 의존성의 `default extras`가 필요하지 않다고 지정하는 것을 허용하지 않기 때문입니다. 또한 대규모 의존성 트리에서 모든 `default extras`를 비활성화할 수 있는 사용자에게 위험을 초래하여, 트리 내의 어느 지점에서든 `default extras`에 의존하는 패키지를 손상시킬 수 있습니다.

그럼에도 불구하고, 이 PEP는 이 접근 방식을 금지하지 않으며, 이러한 종류의 옵션을 지원할지 여부는 다양한 패키징 도구의 관리자에게 달려 있습니다. 이는 최소한 의존성 트리에서 `default extras`가 의존하는 지점을 식별하려는 패키지 관리자에게 유용할 수 있는 플래그입니다. 그러나 지원되는 경우, 이 플래그를 사용하는 것이 기능적인 환경을 보장하지 않는다는 점을 명확히 해야 합니다.

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 허용적인 라이선스 하에 배포됩니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.