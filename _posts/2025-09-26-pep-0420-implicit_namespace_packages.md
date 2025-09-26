---
title: "[Final] PEP 420 - Implicit Namespace Packages"
excerpt: "Python Enhancement Proposal 420: 'Implicit Namespace Packages'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/420/
toc: true
toc_sticky: true
date: 2025-09-26 21:37:09+0900
last_modified_at: 2025-09-26 21:37:09+0900
published: true
---
> **원문 링크:** [PEP 420 - Implicit Namespace Packages](https://peps.python.org/pep-0420/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 19-Apr-2012

## PEP 420 – 암시적 네임스페이스 패키지 (Implicit Namespace Packages) 번역 및 요약

### 초록 (Abstract)

PEP 420은 단일 Python 패키지를 디스크상의 여러 디렉토리에 분할할 수 있는 `네임스페이스 패키지 (Namespace packages)`의 새로운 메커니즘을 제안합니다. 이전 Python 버전에서는 패키지의 `__path__`를 계산하는 알고리즘을 명시적으로 작성해야 했으나, 이 PEP의 개선 사항을 통해 임포트(import) 메커니즘 자체가 패키지를 구성하는 디렉토리 목록을 자동으로 생성하게 됩니다. 이 제안은 PEP 382 및 PEP 402의 이전 작업을 기반으로 하지만, 해당 PEP들은 이 PEP에 찬성하여 폐기되었습니다.

### 용어 (Terminology)

이 PEP에서 정의하는 주요 용어는 다음과 같습니다:

*   **package (패키지)**: Python의 `import` 문에 의해 정의되는 Python 패키지를 의미합니다.
*   **distribution (배포판)**: Python Package Index에 저장되고 `distutils` 또는 `setuptools`에 의해 설치되는 Python 모듈의 독립적인 설치 가능한 집합을 의미합니다.
*   **vendor package (벤더 패키지)**: 운영체제의 패키징 메커니즘(예: Debian 또는 Redhat 패키지)에 의해 설치되는 파일 그룹을 의미합니다.
*   **regular package (일반 패키지)**: Python 3.2 및 이전 버전에서 구현된 패키지를 의미합니다. `__init__.py` 파일을 포함합니다.
*   **portion (포션)**: 네임스페이스 패키지에 기여하는 단일 디렉토리(또는 zip 파일)에 있는 파일 집합을 의미합니다.
*   **legacy portion (레거시 포션)**: `__path__` 조작을 사용하여 네임스페이스 패키지를 구현하는 포션을 의미합니다.
*   **namespace package (네임스페이스 패키지)**: 이 PEP에서 정의하는 새로운 유형의 패키지로, `__init__.py` 파일이 없어도 여러 디렉토리에 걸쳐 존재할 수 있습니다.

### 배경 (Rationale)

이전에는 `pkgutil.extend_path`나 `setuptools`의 `pkg_resources.declare_namespace`와 같은 명령형(imperative) 접근 방식이 네임스페이스 패키지를 제공하는 데 사용되었습니다. 이러한 방식은 다음과 같은 문제점을 가졌습니다:

*   **비호환성**: `pkgutil`은 `*.pkg` 파일을 지원하지만 `setuptools`는 그렇지 않으며, `setuptools`는 zip 파일 검사를 지원하지만 `pkgutil`은 지원하지 않는 등 여러 약간씩 다른 메커니즘이 존재했습니다.
*   **`__init__.py` 파일의 필요성**: 기존 방식은 각 `portion`이 동일한 `__init__.py` 파일을 제공해야 했으며, 이는 Linux 배포판 벤더들이 동일한 파일 시스템 디렉토리에 여러 `portion`을 결합할 때 충돌을 일으킬 수 있었습니다.
*   **정적 `__path__`**: 패키지 생성 시점에 `sys.path`의 값에 따라 `__path__`가 고정적으로 계산되어, 런타임에 `sys.path`가 수정될 경우 새로 추가된 경로에서 `portion`을 찾지 못하는 문제가 있었습니다.

PEP 420은 이러한 문제를 해결하기 위해 `__init__.py` 파일의 필요성을 완전히 없애고, 임포트 메커니즘이 `__path__`를 동적으로 계산하도록 하여 유연성을 높입니다.

### 명세 (Specification)

PEP 420은 `네임스페이스 패키지`에 대한 새로운 규칙을 정의합니다:

*   **`__init__.py` 없음**: 네임스페이스 패키지는 `__init__.py` 파일을 포함할 수 없습니다. 따라서 `pkgutil.extend_path`와 `pkg_resources.declare_namespace`는 네임스페이스 패키지 생성 목적으로 더 이상 사용되지 않습니다.
*   **임포트 처리**:
    *   임포트 메커니즘은 부모 경로(parent path)의 각 디렉토리를 반복하여 모듈 또는 패키지를 찾습니다.
    *   `<directory>/foo/__init__.py`가 발견되면 일반 패키지로 임포트됩니다.
    *   `<directory>/foo`가 디렉토리이고 `__init__.py`가 없으면, 해당 디렉토리가 `portion`으로 기록되고 스캔이 계속됩니다.
    *   스캔 완료 후 최소 하나 이상의 디렉토리가 기록되면, 해당 디렉토리들을 포함하는 `__path__` 속성을 가진 네임스페이스 패키지가 생성됩니다.
*   **`__file__` 속성 없음**: 네임스페이스 패키지는 `__file__` 속성을 가지지 않습니다.
*   **동적 경로 계산 (Dynamic path computation)**: 네임스페이스 패키지의 `__path__`는 각 `portion`이 로드되기 전에 재계산되는 것처럼 동작합니다. 이는 부모 경로(`sys.path` 또는 상위 패키지의 `__path__`)의 변경 사항을 감지하여 효율적으로 이루어집니다.
*   **임포트 파인더 및 로더 (Impact on import finders and loaders)**:
    *   네임스페이스 패키지에 기여하려면 파인더는 새로운 `find_loader(fullname)` 메서드를 구현해야 합니다. 이 메서드는 `(loader, <iterable-of-path-entries>)` 튜플을 반환하며, `loader`가 `None`인 경우 `<iterable-of-path-entries>`는 기록된 경로 목록에 추가됩니다.
    *   레거시 파인더(legacy finders)는 `find_module`만 구현하고 `find_loader`를 구현하지 않으므로 네임스페이스 패키지에 `portion`을 제공할 수 없습니다.
    *   `module_repr()`이라는 새로운 선택적 메서드가 PEP 302 로더에 추가되어 모듈 객체의 `repr`을 생성하는 데 사용될 수 있습니다.

#### 일반 패키지(Regular packages)와의 차이점

네임스페이스 패키지와 일반 패키지는 매우 유사하지만 다음과 같은 차이점이 있습니다:

*   네임스페이스 패키지의 `portion`은 동일한 디렉토리 구조나 로더에서 올 필요가 없습니다. 일반 패키지는 모든 부분이 동일한 디렉토리 계층에 있습니다.
*   네임스페이스 패키지에는 `__file__` 속성이 없습니다.
*   네임스페이스 패키지의 `__path__` 속성은 읽기 전용의 문자열 이터러블이며, 부모 경로가 수정될 때 자동으로 업데이트됩니다.
*   네임스페이스 패키지에는 `__init__.py` 모듈이 없습니다.
*   네임스페이스 패키지는 `__loader__` 속성에 대해 다른 유형의 객체를 가집니다.

#### 표준 라이브러리 및 레거시 패키지 마이그레이션

이 PEP는 표준 라이브러리 패키지가 네임스페이스 패키지로 구현될 수 있도록 허용합니다. 또한, 기존 `pkgutil.extend_path()`를 사용하는 레거시 네임스페이스 패키지와의 호환성을 위해 `extend_path()`가 PEP 420 네임스페이스 패키지도 인식하도록 수정됩니다. 이 덕분에 일부 `portion`은 레거시 방식으로, 다른 `portion`은 PEP 420 방식으로 공존하는 하이브리드(hybrid) 네임스페이스 패키지가 가능합니다.

### 패키징 영향 (Packaging Implications)

네임스페이스 패키지의 여러 `portion`은 동일한 디렉토리에 설치되거나 다른 디렉토리에 설치될 수 있습니다. 예를 들어, `foo.bar`와 `foo.baz` 두 `portion`이 `foo` 네임스페이스 패키지를 구성할 때:

*   **동일한 디렉토리 설치**: `sys.path`에 있는 단일 `foo` 디렉토리 안에 `bar`와 `baz` 디렉토리가 있을 수 있습니다. `foo`는 `__init__.py`가 없기 때문에 네임스페이스 패키지가 됩니다.
*   **다른 디렉토리 설치**: `sys.path`의 여러 엔트리에 서로 다른 `foo` 디렉토리가 존재할 수 있으며, 각 `foo` 디렉토리 안에 해당 `portion`이 위치합니다.

이러한 유연성은 패키징 관리자에게 더 많은 자유를 제공합니다.

### 예시 (Examples)

#### 중첩된 네임스페이스 패키지 (Nested namespace packages)

`project1/parent/child/one.py` 와 `project2/parent/child/two.py` 같은 구조에서, `parent`와 `child` 모두 `__init__.py` 파일이 없는 네임스페이스 패키지로 작동할 수 있습니다. `sys.path`에 `project1`과 `project2`의 경로를 추가하면 `parent.child.one`과 `parent.child.two`를 모두 임포트할 수 있습니다.

```python
import sys
sys.path += ['Lib/test/namespace_pkgs/project1', 'Lib/test/namespace_pkgs/project2']
import parent.child.one
print(parent.__path__) # _NamespacePath(['...project1/parent', '...project2/parent'])
print(parent.child.__path__) # _NamespacePath(['...project1/parent/child', '...project2/parent/child'])
import parent.child.two
```

#### 동적 경로 계산 (Dynamic path computation)

`sys.path`에 `project1`과 `project2`를 추가한 후 `parent.child.one`을 임포트하고, 이어서 `project3`를 `sys.path`에 추가하면, `parent.child.three`를 임포트할 때 `project3/parent`가 `parent.__path__`에 자동으로 추가됩니다.

```python
import sys
sys.path += ['Lib/test/namespace_pkgs/project1', 'Lib/test/namespace_pkgs/project2']
import parent.child.one
# ...
sys.path.append('Lib/test/namespace_pkgs/project3')
import parent.child.three
print(parent.__path__) # ... '...project3/parent'가 추가됨
print(parent.child.__path__) # ... '...project3/parent/child'가 추가됨
```

### 논의 (Discussion)

PyCon 2012에서 PEP 382와 PEP 402가 이 PEP에 찬성하여 거부되었습니다.

*   **일반 패키지와의 성능 비교**: `__init__.py` 파일이 있는 일반 패키지는 경로에서 발견되면 즉시 생성 및 로드될 수 있습니다. 반면 네임스페이스 패키지는 모든 경로 엔트리를 스캔해야 하므로 성능상 약간의 불이익이 있을 수 있습니다.
*   **`ImportWarning` 변경**: `__init__.py` 파일이 없는 디렉토리는 더 이상 `ImportWarning`을 발생시키지 않고 네임스페이스 패키지로 임포트됩니다.
*   **`__file__` 속성 완화**: PEP 420은 `__file__` 속성 설정에 대한 제약을 완화하여, 로더(loader)가 적절한 파일 시스템 경로가 없을 경우 `__file__`을 설정하지 않을 수 있도록 합니다. 모듈의 출처를 확인하는 확실한 방법은 `__loader__` 속성을 확인하는 것입니다.

### 결론 및 영향 (Conclusion and Impact)

PEP 420은 Python의 모듈 임포트 시스템에 상당한 발전을 가져왔습니다. `__init__.py` 파일 없이 여러 디렉토리에 걸쳐 패키지를 구성할 수 있게 함으로써, 대규모 프로젝트나 플러그인 아키텍처에서 모듈 구성의 유연성을 크게 향상시켰습니다. 특히, `sys.path`의 동적 변경을 자동으로 감지하여 `__path__`를 갱신하는 기능은 런타임에 모듈을 추가하거나 재구성하는 시나리오에서 개발자의 부담을 줄여줍니다. 이 PEP는 Python 3.3부터 적용되었으며, 현대 Python 패키징 생태계의 중요한 기반이 되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.