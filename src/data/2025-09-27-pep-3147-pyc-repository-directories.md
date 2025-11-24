---
title: "[Final] PEP 3147 - PYC Repository Directories"
excerpt: "Python Enhancement Proposal 3147: 'PYC Repository Directories'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3147/
toc: true
toc_sticky: true
date: 2025-09-27 14:39:02+0900
last_modified_at: 2025-09-27 14:39:02+0900
published: true
---
> **원문 링크:** [PEP 3147 - PYC Repository Directories](https://peps.python.org/pep-3147/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 16-Dec-2009

# PEP 3147 – PYC 저장소 디렉터리

## 요약 (Abstract)
이 PEP는 여러 다른 버전의 Python 인터프리터 간에 Python 소스 코드 파일을 공유하는 방법을 개선하는 Python의 import 메커니즘 확장에 대해 설명합니다. 이는 단일 Python 소스 파일(`.py` 파일)과 함께 여러 바이트 컴파일 파일(`.pyc` 파일)이 공존할 수 있도록 허용함으로써 가능합니다. 여기서 설명하는 확장은 Unladen Swallow (PEP 3146)이 활성화된 CPython에서 생성될 수 있는 JIT (Just-In-Time) 출력과 같은 다양한 Python 컴파일 캐시를 지원하는 데에도 사용될 수 있습니다.

## 배경 (Background)
CPython은 소스 코드를 "바이트 코드 (byte code)"로 컴파일하며, 성능 향상을 위해 소스 파일이 변경될 때마다 이 바이트 코드를 파일 시스템에 캐시합니다. 이는 컴파일 단계를 건너뛸 수 있으므로 Python 모듈 로딩을 훨씬 빠르게 만듭니다. `foo.py`와 같은 소스 파일의 경우, CPython은 해당 소스 파일 바로 옆에 `foo.pyc` 파일에 바이트 코드를 캐시합니다.

바이트 코드 파일은 두 개의 32비트 빅 엔디안 숫자와 마샬링된 코드 객체로 구성됩니다. 32비트 숫자는 `magic number`와 타임스탬프를 나타냅니다. `magic number`는 Python이 바이트 코드 형식을 변경할 때마다 (예: 가상 머신에 새로운 바이트 코드를 추가할 때) 변경됩니다. 이는 이전 버전의 VM용으로 빌드된 `.pyc` 파일이 문제를 일으키지 않도록 보장합니다. 타임스탬프는 `.pyc` 파일이 생성된 `.py` 파일과 일치하는지 확인하는 데 사용됩니다. `magic number` 또는 타임스탬프가 일치하지 않으면 `.py` 파일은 다시 컴파일되고 새로운 `.pyc` 파일이 작성됩니다.

실제로 `.pyc` 파일은 Python 메이저 릴리스 간에 호환되지 않는 것으로 잘 알려져 있습니다. Python 소스 코드의 `import.c` 파일을 살펴보면, 최근의 모든 새로운 CPython 메이저 릴리스가 `.pyc magic number`를 변경했음을 알 수 있습니다.

## 제안 동기 (Rationale)
Ubuntu 및 Debian과 같은 Linux 배포판은 사용자에게 동시에 여러 Python 버전을 제공합니다. 예를 들어, Ubuntu 9.10 Karmic Koala 사용자는 Python 2.5, 2.6, 3.1을 설치할 수 있으며, Python 2.6이 기본입니다.

이로 인해 시스템에 설치된 서드 파티 Python 소스 파일에 충돌이 발생합니다. 단일 Python 소스 파일을 동시에 여러 Python 버전용으로 컴파일할 수 없기 때문입니다. Python이 일치하지 않는 `magic number`를 가진 `.pyc` 파일을 발견하면, 소스를 재컴파일하는 느린 프로세스로 폴백(fallback)합니다. 따라서 시스템에 `/usr/share/python/foo.py`가 설치되어 있다면, 두 개의 다른 Python 버전이 `.pyc` 파일을 놓고 싸우게 되며, 소스가 컴파일될 때마다 `.pyc` 파일을 다시 작성하게 됩니다. (표준 라이브러리는 여러 버전이 설치되어 있으므로 이 문제의 영향을 받지 않습니다.)

게다가, 이러한 배포판의 운영 체제 패키징 담당자의 부담을 덜기 위해 배포판 패키지에는 Python 버전 번호가 포함되어 있지 않습니다. 이는 시스템에 설치된 모든 Python 버전에서 공유됩니다. 패키지에 Python 버전 번호를 넣는 것은 유지보수의 악몽이 될 것입니다. 새 Python 릴리스가 추가되거나 제거될 때마다 모든 패키지와 그 의존성을 업데이트해야 하기 때문입니다. 사용 가능한 패키지의 수가 엄청나게 많기 때문에 이 정도의 작업량은 실현 불가능합니다.

이러한 배포판은 `.pyc` 파일을 공유할 수 없기 때문에, 소스 코드는 공유하면서 결과 `.pyc` 파일은 공유되지 않는 위치에 배치하는 정교한 메커니즘이 개발되었습니다. `symlink` 기반의 Debian 시스템인 `python-support` 및 `python-central`이 그 예시입니다. 이러한 접근 방식은 광범위한 사용자에게 Python 애플리케이션을 제공하기 위한 훨씬 더 복잡하고, 취약하며, 이해하기 어렵고, 단편화된 정책을 만듭니다. 따라서 CPython에 대한 이 `.pyc` 공유 문제를 해결하는 것은 이러한 공급업체에게 높은 우선순위입니다.

이 PEP는 이 문제에 대한 해결책을 제안합니다.

## 제안 내용 (Proposal)
Python의 import 메커니즘은 모든 Python 패키지 디렉터리 내부에 단일 디렉터리에 바이트 코드 캐시 파일을 쓰고 검색하도록 확장됩니다. 이 디렉터리는 `__pycache__`라고 불릴 것입니다.

또한, `.pyc` 파일 이름에는 컴파일된 Python 버전을 구별하는 `magic string` (`tag`라고 불림)이 포함될 것입니다. 이는 단일 Python 소스 파일에 대해 여러 바이트 컴파일된 캐시 파일이 공존할 수 있도록 합니다.

`magic tag`는 구현체에 따라 정의되지만, 구현체 이름과 버전 번호 약어(예: `cpython-32`)를 포함해야 합니다. 모든 Python 버전 간에 고유해야 하며, `magic number`가 변경될 때마다 새로운 `magic tag`가 정의되어야 합니다. 따라서 Python 3.2용 `.pyc` 파일의 예시는 `foo.cpython-32.pyc`입니다.

`magic tag`는 `imp` 모듈의 `get_tag()` 함수를 통해 사용할 수 있습니다. 이는 `imp.get_magic()` 함수와 유사합니다.

이 방식은 Python 패키지 디렉터리의 복잡성을 줄이는 추가적인 이점도 제공합니다.

Python 소스 파일이 처음 import될 때, 패키지 디렉터리에 `__pycache__` 디렉터리가 아직 존재하지 않으면 생성됩니다. import된 소스의 `.pyc` 파일은 `magic-tag` 형식의 이름을 사용하여 `__pycache__` 디렉터리에 기록됩니다. `__pycache__` 디렉터리 또는 그 안의 `.pyc` 파일 생성이 실패하더라도, import는 PEP 3147 이전과 마찬가지로 성공합니다.

`.py` 소스 파일이 없으면 `__pycache__` 내부의 `.pyc` 파일은 무시됩니다. 이는 우연히 오래된 `.pyc` 파일이 import되는 문제를 제거합니다.

하위 호환성을 위해 Python은 `.pyc` 파일만 있는 배포판을 계속 지원하지만, 이는 `.pyc` 파일이 `.py` 파일이 있었을 디렉터리, 즉 `__pycache__` 디렉터리 외부에 있을 때만 가능합니다. `__pycache__` 외부의 `.pyc` 파일은 `.py` 소스 파일이 없을 경우에만 import됩니다.

`py_compile` 및 `compileall`과 같은 도구는 PEP 3147 형식의 레이아웃을 자동으로 생성하도록 확장되지만, `.pyc` 파일만 있는 배포판 레이아웃을 생성하는 옵션도 가질 것입니다.

### 예시 (Examples)
Python 3.2로 패키지를 바이트 컴파일한 후의 디렉터리 구조는 다음과 같습니다:

```
alpha/
    __pycache__/
        __init__.cpython-32.pyc
        one.cpython-32.pyc
        two.cpython-32.pyc
    __init__.py
    one.py
    two.py
    beta/
        __pycache__/
            __init__.cpython-32.pyc
            three.cpython-32.pyc
            four.cpython-32.pyc
        __init__.py
        three.py
        four.py
```

Python 3.3 및 Unladen Swallow와 같은 다른 Python 버전이 설치된 경우, 바이트 컴파일 후의 파일 시스템은 다음과 같습니다:

```
alpha/
    __pycache__/
        __init__.cpython-32.pyc
        __init__.cpython-33.pyc
        __init__.unladen-10.pyc
        one.cpython-32.pyc
        one.cpython-33.pyc
        one.unladen-10.pyc
        two.cpython-32.pyc
        two.cpython-33.pyc
        two.unladen-10.pyc
    __init__.py
    one.py
    two.py
    beta/
        __pycache__/
            __init__.cpython-32.pyc
            __init__.cpython-33.pyc
            __init__.unladen-10.pyc
            three.cpython-32.pyc
            three.cpython-33.pyc
            three.unladen-10.pyc
            four.cpython-32.pyc
            four.cpython-33.pyc
            four.unladen-10.pyc
        __init__.py
        three.py
        four.py
```
`__pycache__` 디렉터리는 일반적으로 무시될 수 있으므로, 일반적인 디렉터리 목록은 오늘날의 Python보다 훨씬 덜 복잡합니다.

### Python 동작 방식 (Python behavior)
Python이 모듈을 import하기 위해 검색할 때 (예: `foo`), 몇 가지 상황을 만날 수 있습니다. 현재 Python 규칙에 따라 "일치하는 `.pyc`"라는 용어는 `magic number`가 현재 인터프리터의 `magic number`와 일치하고, 소스 파일의 타임스탬프가 `.pyc` 파일의 타임스탬프와 정확히 일치함을 의미합니다.

*   **Case 0: The steady state**
    Python이 `foo` 모듈을 import하도록 요청받으면, `sys.path`를 따라 `foo.py` 파일을 검색합니다. 발견되면, Python은 일치하는 `__pycache__/foo.<magic>.pyc` 파일이 있는지 확인하고, 있다면 해당 `.pyc` 파일이 로드됩니다.

*   **Case 1: The first import**
    Python이 `foo.py`를 찾았을 때, `__pycache__/foo.<magic>.pyc` 파일이 없으면, Python은 필요하다면 `__pycache__` 디렉터리를 생성하고 해당 파일을 생성합니다. Python은 `foo.py` 파일을 파싱하고 바이트 컴파일하여 `__pycache__/foo.<magic>.pyc`에 바이트 코드를 저장합니다.

*   **Case 2: The second import**
    Python이 `foo` 모듈을 두 번째로 import하도록 요청받으면 (물론 다른 프로세스에서), `sys.path`를 따라 `foo.py` 파일을 다시 검색합니다. `foo.py` 파일을 찾으면, 일치하는 `__pycache__/foo.<magic>.pyc`를 찾아 바이트 코드를 읽고 평소처럼 계속 진행합니다.

*   **Case 3: `__pycache__/foo.<magic>.pyc` with no source**
    `foo.py` 파일이 어떤 식으로든 제거되었지만 캐시된 `.pyc` 파일은 파일 시스템에 남아 있는 경우, Python은 `foo`를 import하도록 요청받으면 `ImportError`를 발생시킵니다. 즉, 소스 파일이 존재하지 않는 한 Python은 캐시 디렉터리에서 `.pyc` 파일을 import하지 않습니다.

*   **Case 4: legacy `.pyc` files and source-less imports**
    Python은 소스 파일이 `.pyc` 파일 옆에 존재할 때 모든 레거시 `.pyc` 파일을 무시합니다. 즉, `foo.py` 파일 옆에 `foo.pyc` 파일이 있으면 모든 경우에 `.pyc` 파일은 무시됩니다.
    그러나 소스 없는 배포판을 계속 지원하기 위해, 소스 파일이 없으면 Python은 소스 파일이 있었을 위치에 단독 `.pyc` 파일이 있다면 이를 import합니다.

*   **Case 5: read-only file systems**
    소스가 읽기 전용 파일 시스템에 있거나 `__pycache__` 디렉터리 또는 `.pyc` 파일을 쓸 수 없는 경우에도 모든 동일한 규칙이 적용됩니다. `__pycache__`가 `.pyc` 파일 쓰기를 허용하지 않는 권한으로 작성된 경우에도 마찬가지입니다.

### 다른 Python 구현체 (Alternative Python implementations)
Jython, IronPython, PyPy 등 다른 Python 구현체도 `__pycache__` 디렉터리를 사용하여 플랫폼에 적합한 컴파일 아티팩트를 저장할 수 있습니다. 예를 들어, Jython은 모듈에 대한 클래스 파일을 `__pycache__/foo.jython-32.class`에 저장할 수 있습니다.

### 기존 코드에 미치는 영향 (Effects on existing code)
이 PEP의 채택은 Python 내부 및 외부의 기존 코드와 관용구에 영향을 미칠 것입니다.

*   **PEP 3147 가용성 감지:**
    Python 버전이 PEP 3147 기능을 제공하는지 감지하는 가장 쉬운 방법은 다음을 확인하는 것입니다:
    ```python
    import imp
    has3147 = hasattr(imp, 'get_tag')
    ```

*   **`__file__`:**
    이 PEP는 `__file__`의 의미를 변경하지 않습니다.
    이 PEP는 모듈에 `__cached__` 속성 추가를 제안합니다. 이 속성은 항상 읽거나 쓰여진 실제 `.pyc` 파일을 가리킬 것입니다. 환경 변수 `$PYTHONDONTWRITEBYTECODE`가 설정되었거나, `-B` 옵션이 주어졌거나, 소스가 읽기 전용 파일 시스템에 있는 경우, `__cached__` 속성은 `.pyc` 파일이 존재하지 않았을 경우 기록되었을 위치를 가리킬 것입니다. 이 위치는 물론 경로에 `__pycache__` 하위 디렉터리를 포함합니다.

*   **`py_compile` 및 `compileall`:**
    `py_compile` 및 `compileall` 모듈은 새로운 레이아웃을 이해하도록 업데이트될 것입니다. `compileall`에는 레거시 `.pyc` 바이트 컴파일 파일 경로 이름을 작성하기 위한 `-b` 플래그가 추가됩니다.

*   **파일 확장자 검사:**
    `.pyc`로 끝나는 파일을 확인하고 마지막 문자를 잘라내어 일치하는 `.py` 파일을 찾는 일부 코드는 이 PEP가 구현되면 실패할 것입니다. 이를 지원하기 위해 `imp` 패키지에 두 가지 새로운 메서드가 추가될 것입니다:
    ```python
    imp.cache_from_source(py_path) -> pyc_path
    imp.source_from_cache(pyc_path) -> py_path
    ```

## 대안 (Alternatives)
이 섹션에서는 PEP 개발 중에 고려되었지만 거부된 몇 가지 대체 접근 방식 또는 세부 사항을 설명합니다.

*   **16진수 `magic tags`:**
    `__pycache__` 디렉터리 내부의 `.pyc` 파일에는 파일 이름에 `magic tag`가 포함됩니다. 이는 import 시스템이 사용하는 실제 `magic number`에 대한 니모닉 태그입니다. 이 대신 바이너리 `magic number`의 16진수 표현을 고유 식별자로 사용할 수도 있었습니다. 그러나 이는 사용자 친화적이지 않으므로 이 PEP에서 제안된 `magic tag` 방식이 채택되었습니다.

*   **PEP 304:**
    철회된 PEP 304와 목표가 일부 겹쳤습니다. PEP 304는 사용자가 `.pyc` 파일을 저장할 `shadow file system hierarchy`를 만들 수 있도록 허용했지만, 이 방식은 `.pyc` 파일의 위치를 쉽게 찾을 수 없고 `$PYTHONBYTECODE` 환경 변수의 적절하고 일관된 사용에 의존하는 등 여러 문제가 있었습니다.

*   **Fat 바이트 컴파일 파일:**
    이 PEP의 초기 버전은 "fat" Python 바이트 코드 파일을 설명했습니다. 이 파일들은 단일 `.pyf` 파일에 여러 `.pyc` 파일과 동일한 내용을 포함하며, 적절한 `magic number`를 키로 하는 조회 테이블을 가질 것입니다. 그러나 `fat byte compilation files`는 상당히 복잡하고 본질적으로 어려운 `race conditions`을 도입했기 때문에 현재의 디렉터리 사용 방식이 제안되었습니다.

*   **여러 파일 확장자:**
    PEP 작성자는 여러 개의 얇은 바이트 컴파일 파일이 같은 위치에 존재하되, Python 버전을 지정하기 위해 다른 파일 확장자를 사용하는 접근 방식도 고려했습니다 (예: `foo.pyc25`, `foo.pyc26`, `foo.pyc31` 등). 그러나 너무 많은 다른 파일을 작성해야 하는 복잡성 때문에 거부되었습니다.

*   **.pyc:**
    `__pycache__` 디렉터리를 `.pyc` 또는 다른 `dot-file` 이름으로 부르자는 제안이 있었습니다. 이는 *nix 시스템에서 디렉터리를 숨기는 효과를 가질 것입니다. 하지만 `dot-files`는 일부 플랫폼에서만 특별하며, 우리는 사용자로부터 이들을 완전히 숨기기를 원하지 않는다는 등 여러 이유로 거부되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.