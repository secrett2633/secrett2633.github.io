---
title: "[Rejected] PEP 382 - Namespace Packages"
excerpt: "Python Enhancement Proposal 382: 'Namespace Packages'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/382/
toc: true
toc_sticky: true
date: 2025-09-26 21:03:27+0900
last_modified_at: 2025-09-26 21:03:27+0900
published: true
---
> **원문 링크:** [PEP 382 - Namespace Packages](https://peps.python.org/pep-0382/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 02-Apr-2009

## PEP 382 – 네임스페이스 패키지 (Namespace Packages)

*   **작성자:** Martin von Löwis
*   **상태:** Rejected (거부됨)
*   **유형:** Standards Track (표준 트랙)
*   **생성일:** 2009년 4월 2일
*   **Python 버전:** 3.2
*   **사후 이력:** 논의 후 PEP 402의 정신을 이어받는 새로운 PEP가 작성될 예정입니다.

---

### 거부 알림 (Rejection Notice)

2012년 US PyCon 스프린트 첫째 날, PEP 382와 PEP 402에 대한 길고 유익한 논의가 진행되었습니다. 그 결과, 두 PEP 모두 거부되었으나, PEP 402의 정신을 이어받아 새로운 PEP가 작성될 예정입니다. Martin von Löwis가 요약을 작성했습니다.

### 개요 (Abstract)

네임스페이스 패키지 (Namespace packages)는 단일 Python 패키지를 디스크상의 여러 디렉터리에 분할하는 메커니즘입니다. 현재 Python 버전에서는 패키지의 `__path__`를 계산하는 알고리즘을 직접 구성해야 합니다. 본 제안에서 제안하는 개선 사항을 통해, 임포트 메커니즘 (import machinery) 자체가 패키지를 구성하는 디렉터리 목록을 구축하게 됩니다. 이 PEP의 구현은에서 확인할 수 있습니다.

### 용어 (Terminology)

이 PEP 내에서 다음 용어들은 다음과 같이 정의됩니다:

*   **`package` (패키지):** Python의 `import` 문에 의해 정의되는 Python 패키지를 의미합니다.
*   **`distribution` (배포):** Python Package Index에 저장되고 `distutils` 또는 `setuptools`에 의해 설치되는, 개별적으로 설치 가능한 Python 모듈 집합을 의미합니다.
*   **`vendor package` (벤더 패키지):** 운영 체제의 패키징 메커니즘 (예: Debian 또는 Redhat 패키지)에 의해 설치되는 파일 그룹을 의미합니다.
*   **`portion` (부분):** 네임스페이스 패키지에 기여하는 단일 디렉터리 (또는 zip 파일에 저장될 수 있는) 내의 파일 집합을 의미합니다.

### 현재의 네임스페이스 패키지 (Namespace packages today)

Python은 현재 `pkgutil.extend_path`를 통해 패키지를 네임스페이스 패키지로 지정할 수 있는 기능을 제공합니다. 권장되는 사용법은 패키지의 `__init__.py` 파일에 다음 코드를 추가하는 것입니다:

```python
from pkgutil import extend_path
__path__ = extend_path(__path__, __name__)
```

모든 배포판은 `__init__.py`에 동일한 내용을 제공해야 하므로, 패키지의 어떤 부분이 먼저 임포트되든지 상관없이 `extend_path`가 호출됩니다. 결과적으로, `__init__.py`는 `sys.path`에서 패키지 조각의 순서에 따라 어떤 부분이 먼저 임포트되는지에 따라 달라지므로, 실제로 어떤 이름도 정의할 수 없습니다. 특별 기능으로 `extend_path`는 `<packagename>.pkg`라는 파일을 읽어 추가적인 부분을 선언할 수 있습니다.

`setuptools`는 유사한 함수인 `pkg_resources.declare_namespace`를 다음과 같은 형태로 제공합니다:

```python
import pkg_resources
pkg_resources.declare_namespace(__name__)
```

이 방식에서는 `__init__.py`에서 `__path__`에 대한 할당이 필요하지 않습니다. `declare_namespace`가 `sys.modules`를 통해 패키지 `__path__`를 수정하기 때문입니다. 특별 기능으로 `declare_namespace`는 zip 파일도 지원하며, 내부적으로 패키지 이름을 등록하여 `setuptools`에 의한 `sys.path`에 대한 향후 추가 사항들이 각 패키지에 올바르게 추가적인 부분을 더할 수 있도록 합니다.

`setuptools`는 배포판의 `setup.py`에서 네임스페이스 패키지를 선언할 수 있도록 하여, 배포판 개발자들이 직접 `__init__.py`에 마법적인 `__path__` 수정 코드를 넣을 필요가 없게 합니다.

### 근거 (Rationale)

네임스페이스 패키지에 대한 현재의 명령형 (imperative) 접근 방식은 여러 약간씩 호환되지 않는 메커니즘을 초래했습니다. 예를 들어, `pkgutil`은 `*.pkg` 파일을 지원하지만 `setuptools`는 그렇지 않습니다. 마찬가지로, `setuptools`는 zip 파일을 검사하고 `_namespace_packages` 변수에 부분을 추가하는 것을 지원하지만 `pkgutil`은 그렇지 않습니다.

또한, 현재의 접근 방식은 시스템 벤더들에게 문제를 야기합니다. 벤더 패키지는 일반적으로 파일이 겹치지 않아야 하며, 이미 디스크에 있는 파일을 가진 벤더 패키지를 설치하려고 하면 실패하거나 예측할 수 없는 동작을 유발할 수 있습니다. 벤더가 네임스페이스 패키지를 위해 모든 배포판을 단일 디렉터리에 넣도록 선택할 수 있으므로, 모든 부분은 충돌하는 `__init__.py` 파일을 기여하게 될 것입니다.

### 명세 (Specification)

패키지를 임포트하는 명령형 메커니즘 대신, 선언형 접근 방식이 제안됩니다:

이 제안에서는 이름이 `.pyp` (Python package의 약자)로 끝나는 디렉터리가 패키지의 한 부분을 포함한다고 명시합니다.

`import` 문은 패키지 `P`의 `__path__` 속성을 계산하도록 확장됩니다. 이는 선택적으로 `__init__.py` 파일을 포함하는 단일 디렉터리 `P`와, 부모 패키지의 `__path__` (또는 `sys.path`)에서 발견되는 순서대로 모든 `P.pyp`라는 이름의 디렉터리로 구성됩니다. 이 중 어느 하나라도 발견되면, 패키지의 추가 부분을 계속 검색합니다.

하나의 디렉터리가 `P/__init__.py` 형식의 패키지와 `P.pyp` 형식의 패키지 부분을 모두 포함할 수 있습니다.

임포트 메커니즘에는 다른 변경 사항이 없습니다. 모듈 ( `__init__.py` 포함) 검색은 계속해서 처음 발견된 모듈에서 중단됩니다. 요약하자면, `import foo` 패키지 프로세스는 다음과 같이 작동합니다:

1.  `sys.path`에서 `foo` 디렉터리, `foo.pyp` 디렉터리 또는 `foo.<ext>` 파일을 검색합니다.
2.  파일이 발견되고 디렉터리가 없으면 모듈로 처리되어 임포트됩니다.
3.  `foo` 디렉터리가 발견되면 `__init__.py` 파일이 포함되어 있는지 확인합니다. 있으면 `__init__.py`의 위치를 기억합니다. 그렇지 않으면 디렉터리는 건너뜁니다.
4.  `__init__.py`가 발견되면 `foo`라는 다른 디렉터리는 건너뜁니다.
5.  `foo` 디렉터리와 `foo.pyp` 디렉터리 모두 패키지의 `__path__`에 추가됩니다.
6.  `__init__` 모듈이 발견되면, 계산된 모든 `.pyp` 디렉터리의 경로로 `__path__`가 초기화된 상태로 임포트됩니다.

#### 임포트 훅에 미치는 영향 (Impact on Import Hooks)

PEP 302에 정의된 로더 (loaders)와 파인더 (finds) 모두 네임스페이스 패키지를 지원하도록 변경해야 합니다. 아래 프로토콜을 따르지 않으면 패키지가 네임스페이스 패키지로 인식되지 않을 수 있습니다. 이 프로토콜을 지원하지 않는 로더와 파인더는 아래 함수에 접근할 때 `AttributeError`를 발생시켜야 합니다.

파인더는 위 알고리즘의 1단계에서 `*.pth` 파일을 찾는 것을 지원해야 합니다. 이를 위해 경로 훅으로 사용되는 파인더는 다음 메서드를 지원해야 합니다:

```python
finder.find_package_portion(fullname)
```

이 메서드는 `find_module`과 동일한 방식으로 호출되며, 패키지의 `__path__`에 추가될 문자열을 반환해야 합니다. 파인더가 패키지의 부분을 찾지 못하면 `None`을 반환해야 합니다. 위 호출에서 `AttributeError`를 발생시키는 것은 이 PEP와의 비준수로 처리되며, 예외는 무시됩니다. 다른 모든 예외는 보고됩니다.

파인더는 `find_module`과 `find_package_portion` 모두에서 성공을 보고할 수 있으며, 이는 `__init__.py`를 포함하는 패키지와 동일한 패키지의 부분을 모두 허용합니다.

`find_package_portion`에서 반환된 모든 문자열과 `.pyp` 디렉터리의 모든 경로 이름은 새 패키지의 `__path__`에 추가됩니다.

### 논의 (Discussion)

이 명세의 초기 버전은 `sys.path`에서 사용되는 방식과 유사하게 `*.pth` 파일 추가를 제안했습니다. 와일드카드 마커 (`*`)를 사용하여 패키지는 전체 경로가 부모 경로를 보고 제대로 이름 붙여진 하위 디렉터리를 검색함으로써 파생된다는 것을 나타낼 수 있었습니다.

이후 사람들은 전체 `.pth` 구문 지원이 부적절하다고 지적했으며, `.pth` 파일은 디렉터리가 패키지임을 나타내는 단순한 마커 파일로 변경되었습니다. Peter Tröger는 `.pth`가 부적합한 파일 확장자이며, Python과 관련된 모든 파일 확장자는 `.py`로 시작해야 한다고 제안했습니다. 따라서 마커 파일은 `.pyp`로 이름이 변경되었습니다.

Dinu Gherman은 마커 파일이 필요하지 않으며, 디렉터리 확장자가 마커 역할을 할 수 있다고 지적했습니다. 이것이 이 PEP가 현재 제안하는 내용입니다.

Phillip Eby는 다른 언어에서 발견되는 Python의 패키지 구문과 비교한 후 이 PEP에 대한 대안적인 접근 방식인 PEP 402를 설계했습니다. PEP 402는 마커 파일을 전혀 사용하지 않을 것을 제안합니다. PyCon DE 2011 토론에서 사람들은 디렉터리가 패키지에 기여한다는 명시적인 선언을 하는 것이 장애물이 아니라 바람직한 속성이라고 언급했습니다. 특히 Jython 개발자들은 Python 패키지를 선언할 필요가 없다면 Jython이 Java 패키지인 디렉터리를 Python 패키지로 쉽게 오인할 수 있다는 점을 지적했습니다.

패키지는 네임스페이스 패키지의 `__init__.py`를 채우는 작업을 중단할 수 있습니다. 결과적으로 `extend_path`와 `declare_namespace`는 구식 (obsolete)이 됩니다.

네임스페이스 패키지는 비trivial한 (non-trivial) `__init__.py` 구현을 제공하기 시작할 수 있습니다. 이를 위해 단일 배포판이 네임스페이스 패키지의 `__init__.py` (및 네임스페이스 패키지 자체에 속하는 다른 모듈)만 포함하는 부분을 제공하는 것이 권장됩니다.

이 메커니즘은 기존 네임스페이스 메커니즘과 대부분 호환됩니다. `extend_path`는 이 명세에 따라 조정될 것이며, 다른 메커니즘은 `__path__`에 부분이 두 번 추가될 수 있습니다.

### 참고 자료 (References)

*   PEP 382 branch
*   Namespace Packages resolution

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.