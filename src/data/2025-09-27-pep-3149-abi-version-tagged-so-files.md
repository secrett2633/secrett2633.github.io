---
title: "[Final] PEP 3149 - ABI version tagged .so files"
excerpt: "Python Enhancement Proposal 3149: 'ABI version tagged .so files'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3149/
toc: true
toc_sticky: true
date: 2025-09-27 14:39:52+0900
last_modified_at: 2025-09-27 14:39:52+0900
published: true
---
> **원문 링크:** [PEP 3149 - ABI version tagged .so files](https://peps.python.org/pep-3149/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 09-Jul-2010


## PEP 3149 – ABI 버전 태그가 지정된 .so 파일

### 개요 (Abstract)
이 PEP(Python Enhancement Proposal)는 Python의 `import` 메커니즘을 확장하여 확장 모듈 파일(.so)을 유사한 방식으로 함께 배치할 수 있는 기능을 정의합니다. 이는 선택적인 빌드-타임(build-time) 기능으로, Python 배포판이 여러 Python 주(major) 버전을 동시에 더 쉽게 제공할 수 있도록 돕습니다.

이 제안은 PEP 3147에서 순수(pure) Python 소스 코드의 공유를 개선하기 위해 설명된 기능에 대한 보조적인(adjunct) 기능입니다. PEP 3147은 각 소스 파일과 함께 여러 바이트 컴파일 파일(.pyc)을 함께 배치할 수 있도록 했습니다.

### 배경 (Background)
PEP 3147은 시스템에 여러 Python 버전이 있을 때 순수 Python 패키지의 파일 시스템 레이아웃을 정의했습니다. 예를 들어, Python 3.2 및 3.3이 설치된 시스템에서 `one.py` 및 `two.py` 소스 모듈을 포함하는 `alpha` 패키지가 있는 경우, 바이트 컴파일 후의 파일 시스템 레이아웃은 다음과 같습니다.

```
alpha/
    __pycache__/
        __init__.cpython-32.pyc
        __init__.cpython-33.pyc
        one.cpython-32.pyc
        one.cpython-33.pyc
        two.cpython-32.pyc
        two.cpython-33.pyc
    __init__.py
    one.py
    two.py
```

확장 모듈이 포함된 패키지의 경우, 모듈의 `.so` 파일에도 유사한 차별화가 필요합니다. 서로 다른 Python 주 버전용으로 컴파일된 확장 모듈은 ABI(Application Binary Interface) 변경으로 인해 서로 호환되지 않습니다. 또한, 동일한 Python 버전이라도 다른 구성/컴파일 옵션(예: `--with-wide-unicode`)은 다른 ABI를 초래할 수 있습니다.

PEP 384는 안정적인 ABI를 정의하지만, 이는 Python 빌드 또는 주 버전 간의 확장 모듈 비호환성을 최소화할 뿐 완전히 제거하지는 못합니다. 따라서 확장 모듈 파일 이름을 구별하기 위한 메커니즘이 제안됩니다.

### 제안의 근거 (Rationale)
Ubuntu 및 Debian과 같은 Linux 배포판은 사용자에게 여러 Python 버전을 동시에 제공합니다. 예를 들어, Ubuntu 9.10 Karmic Koala 사용자는 Python 2.5, 2.6, 3.1을 설치할 수 있으며, Python 2.6이 기본값입니다.

사용 가능한 Python 버전 간에 최대한 많은 것을 공유하기 위해 이러한 배포판은 타사 패키지 모듈(`.pyc` 및 `.so` 파일)을 `/usr/share/pyshared`에 설치하고 `/usr/lib/pythonX.Y/dist-packages`에서 심볼릭 링크(symlink)합니다. PEP 3147 이전(즉, Python 3.2 미만)에는 다양한 설치된 Python 버전으로 바이트 컴파일된 `.pyc` 파일이 서로 이름 충돌을 일으켰기 때문에 심볼릭 링크가 존재했습니다. Python 3.2 이상 버전의 경우, `.pyc` 파일이 더 이상 파일 시스템 이름 충돌을 일으키지 않으므로 모든 순수 Python 패키지를 공유할 수 있습니다. 이러한 심볼릭 링크를 제거하면 Python 배포가 더 간단하고 견고해집니다.

공유 라이브러리 확장에서도 유사한 상황이 발생합니다. 확장 모듈은 일반적으로 `foo` 확장 모듈에 대해 `foo.so`로 이름이 지정되기 때문에, `foo`가 여러 Python 버전용으로 제공되면 이 또한 이름 충돌을 일으킬 수 있습니다.

또한, 동일한 Python 버전이라도 다른 구성/컴파일 옵션은 확장 모듈에 다른 ABI를 제공할 수 있습니다. 예를 들어 POSIX 시스템에서는 `--with-pydebug`, `--with-pymalloc`, `--with-wide-unicode` 구성 옵션이 모두 ABI를 변경합니다. 이 PEP는 `.so` 확장 모듈 파일의 파일 이름에 빌드-타임 옵션을 인코딩할 것을 제안합니다.

PyPy도 이 PEP의 혜택을 받아 API용으로 빌드되었지만 다른 `.so` 태그를 가진 확장 모듈의 이름 충돌을 피할 수 있습니다.

### 제안 (Proposal)
Python 인터프리터 빌드-타임에 선택된 구성/컴파일 옵션은 확장 모듈의 공유 라이브러리 파일 이름에 인코딩됩니다. 이 "태그(tag)"는 모듈 기본 이름과 공유 라이브러리의 운영 파일 시스템 확장자 사이에 나타납니다.

다음 정보는 공유 라이브러리 파일 이름에 **반드시** 포함되어야 합니다.
*   Python 구현 (예: `cpython`, `pypy`, `jython` 등)
*   인터프리터의 주(major) 및 부(minor) 버전 번호

이 두 필드는 하이픈으로 구분되며, 주 및 부 버전 번호 사이에는 점이 나타나지 않습니다. 예를 들어, `cpython-32`와 같습니다.

Python 구현은 필요에 따라 파일 이름 태그에 추가 플래그를 포함할 수 있습니다. 예를 들어, POSIX 시스템에서는 다음 플래그도 파일 이름에 기여합니다.
*   `--with-pydebug` (플래그: `d`)
*   `--with-pymalloc` (플래그: `m`)
*   `--with-wide-unicode` (플래그: `u`)

기본적으로 Python 3.2에서 `configure`는 `--with-pymalloc`을 활성화하므로 공유 라이브러리 파일 이름은 `foo.cpython-32m.so`와 같이 나타납니다. 다른 두 플래그도 활성화되면 파일 이름은 `foo.cpython-32dmu.so`가 됩니다.

공유 라이브러리 파일 이름 태그는 무조건적으로 사용되며 변경할 수 없습니다. 태그와 확장 모듈 접미사는 `sysconfig` 모듈을 통해 다음 변수로 사용할 수 있습니다.

```python
>>> sysconfig.get_config_var('EXT_SUFFIX')
'.cpython-32mu.so'
>>> sysconfig.get_config_var('SOABI')
'cpython-32mu'
```

`$SOABI`는 태그만 포함하고, `$EXT_SUFFIX`는 공유 라이브러리 파일의 플랫폼 확장자를 포함하며, 확장 모듈 이름에 추가되는 정확한 접미사입니다.

임의의 패키지 `foo`에 대해 배포 패키지가 설치되었을 때 다음과 같은 파일이 보일 수 있습니다.

```
/usr/lib/python/foo.cpython-32m.so
/usr/lib/python/foo.cpython-33m.so
```
(이 경로들은 예시일 뿐입니다. 배포판은 원하는 파일 시스템 레이아웃을 자유롭게 사용할 수 있으며, 이 PEP의 어떤 내용도 Python의 소스 빌드(from-source builds)가 설치되는 위치를 변경하지 않습니다.)

Python의 동적 모듈 로더는 빌드-타임 옵션과 일치하는 태그를 가진 공유 라이브러리 확장 모듈을 인식하고 임포트합니다. 하위 호환성을 위해 Python은 태그 없는 확장 모듈(예: `foo.so`)도 계속 임포트합니다.

이 공유 라이브러리 태그는 파일 시스템 어디에서 빌드되든 관계없이 모든 `distutils` 기반 확장 모듈에 전역적으로 사용됩니다. `distutils` 이외의 수단으로 빌드된 확장 모듈은 태그를 수동으로 계산하거나 태그 없는 `.so` 파일 이름으로 폴백(fallback)해야 합니다.

### 입증된 접근 방식 (Proven Approach)
여기에 설명된 접근 방식은 Python 및 확장 모듈의 디버그 빌드(debug builds)에 다른 확장자를 사용하는 Debian 및 Ubuntu 시스템에서 이미 입증되었습니다. Windows의 디버그 빌드도 이미 동적 라이브러리에 다른 파일 확장자를 사용하며, 실제로 `.dll` 파일 이름에 Python 주 및 부 버전을 인코딩합니다(이 PEP에서 제안하는 방식과는 다르게).

### Windows 지원 (Windows)
이 PEP는 `configure` 스크립트를 사용하는 POSIX 시스템의 빌드 문제만 다룹니다. Windows 또는 다른 플랫폼 지원이 이 PEP에서 명시적으로 허용되지 않는 것은 아니지만, 그러한 플랫폼에서 지원을 평가, 설명 및 구현하려면 플랫폼 전문 지식이 필요합니다. 현재로서는 이 PEP의 기능이 Windows에 유용한지 명확하지 않습니다.

### PEP 384 (Stable ABI)
PEP 384는 확장 모듈을 위한 안정적인 ABI를 정의합니다. 이론적으로 PEP 384가 보편적으로 채택되면 모든 확장 모듈이 모든 Python 버전과 호환될 수 있으므로 이 PEP의 필요성이 없어질 것입니다. 하지만 실제로는 보편적인 채택을 달성하는 것이 불가능하며, 위에서 설명한 대로 다른 빌드-타임 플래그가 여전히 ABI에 영향을 미칩니다. 따라서 안정적인 ABI가 있더라도 이 PEP는 여전히 필요할 수 있습니다.

전체 사양은 PEP 384에 있지만, 관련 문제에 대한 논의는 다음과 같습니다.
PEP 384는 `Py_LIMITED_API`로 확장 기능이 컴파일된 경우 API 버전으로 3이 전달되는 `PyModule_Create()`에 대한 변경 사항을 설명합니다. 이는 `PYTHON_API_VERSION`을 반영하기 위해 `PYTHON_ABI_VERSION`이라는 공식 매크로로 형식화되어야 합니다. ABI가 호환되지 않는 방식으로 변경되면 이 버전 번호가 증가할 것입니다. 공유를 용이하게 하기 위해 Python은 이름에 `PYTHON_ABI_VERSION` 번호가 포함된 확장 모듈을 검색하도록 확장될 것입니다. 접두사 `abi`는 Python의 사용을 위해 예약됩니다.

따라서, PEP 384의 초기 구현에서 Python이 기본 플래그 세트로 구성될 때 확장 모듈 `foo`가 임포트될 때 다음 파일 이름(이 순서로)을 검색합니다.
1.  `foo.cpython-XYm.so`
2.  `foo.abi3.so`
3.  `foo.so`

`distutils`의 `build_ext` 명령도 모듈 작성자가 해당 ABI 버전을 지원한다고 표시할 때 `abi3` 태그가 있는 공유 라이브러리 파일로 컴파일하도록 확장되어야 합니다. 이는 `Extension` 클래스에 다음과 같은 키워드 인수를 추가하는 방식으로 하위 호환성을 유지하면서 수행할 수 있습니다.

```python
Extension('foo', ['foo.c'], abi=3)
```

Martin v. Löwis는 이 PEP가 PEP 384에 적용되는지에 대한 자신의 생각을 설명했습니다. 요약하면 다음과 같습니다.
*   `--with-pydebug`는 `PyObject`의 레이아웃을 변경하므로 안정적인 ABI에 의해 지원되지 않습니다.
*   `--with-pymalloc`은 이 문제와 관련이 없습니다.
*   `--with-wide-unicode`는 더 까다롭지만, Martin은 안정적인 ABI가 플랫폼의 `wchar_t`와 일치하는 `Py_UNICODE`를 사용하도록 강제하는 경향이 있습니다.

### 대안 (Alternatives)
이 아이디어가 처음 도입된 초기 `python-dev` 스레드에서 몇 가지 대안이 제안되었습니다. 완전성을 위해 채택되지 않은 이유와 함께 여기에 나열됩니다.

#### 독립적인 디렉터리 또는 심볼릭 링크 (Independent directories or symlinks)
Debian 및 Ubuntu는 단순히 해당 Python 버전의 확장 모듈만 포함하는 버전별 디렉터리를 `sys.path`에 추가할 수 있습니다. 또는 PEP 3147에서 제거된 심볼릭 링크 트릭을 공유 라이브러리에 대해서만 유지할 수 있습니다. 이 접근 방식은 PEP 3147이 피하려는 본질적인 복잡성을 전파하고, 확장 모듈 수가 전체 Python 패키지 수보다 훨씬 적을 때에도 모든 모듈을 검색하기 위해 잠재적으로 여러 추가 디렉터리를 추가하므로 거부되었습니다. 예를 들어, 넓은 유니코드 포함 여부, `pydebug` 포함 여부, `pymalloc` 포함 여부에 따라 빌드가 제공되면 검색되는 디렉터리 수가 크게 증가합니다.

#### 확장 모듈이 있는 패키지를 공유하지 않음 (Don't share packages with extension modules)
확장 모듈이 있는 Python 패키지를 배포판의 모든 지원되는 Python 버전 간에 공유하지 않아야 한다는 제안이 있었습니다. PEP 3149가 채택되더라도 확장 모듈은 모든 지원되는 Python 버전용으로 컴파일되어야 하므로, 그러한 패키지를 공유하는 것이 어쨌든 유용하지 않을 수 있습니다. 그러나 확장 기능이 있는 패키지를 공유하지 않는 것은 여러 가지 이유로 실현 불가능합니다.

순수 Python 패키지가 한 버전에서 공유되는데, 다음 릴리스에서 속도 향상을 위해 확장 모듈이 추가되면 갑자기 공유되지 않아야 할까요? 또한, 모든 확장 공유 라이브러리가 지원되는 모든 Python 버전용으로 한 번 컴파일되고 배포되더라도, `.so` 파일만 복제하는 것과 모든 `.py` 파일을 복제하는 것 사이에는 큰 차이가 있습니다. 추가 크기는 그러한 패키지의 다운로드 시간을 증가시키고, 더 즉각적으로는 이미 제한된 배포 CD-ROM의 공간 압력을 증가시킵니다.

### 참조 구현 (Reference implementation)
이 코드에 대한 작업은 Python 3.2로 병합될 준비가 될 때까지 Launchpad의 Bazaar 브랜치에서 추적됩니다. 작업 중인 diff도 볼 수 있으며, 새로운 변경 사항이 업로드될 때 자동으로 업데이트됩니다.

### 저작권 (Copyright)
이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.