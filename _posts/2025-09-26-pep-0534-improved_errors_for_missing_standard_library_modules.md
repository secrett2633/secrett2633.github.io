---
title: "[Deferred] PEP 534 - Improved Errors for Missing Standard Library Modules"
excerpt: "Python Enhancement Proposal 534: 'Improved Errors for Missing Standard Library Modules'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/534/
toc: true
toc_sticky: true
date: 2025-09-26 23:25:45+0900
last_modified_at: 2025-09-26 23:25:45+0900
published: true
---
> **원문 링크:** [PEP 534 - Improved Errors for Missing Standard Library Modules](https://peps.python.org/pep-0534/)
>
> **상태:** Deferred | **유형:** Standards Track | **작성일:** 05-Sep-2016


## PEP 534 – 누락된 표준 라이브러리 모듈에 대한 오류 메시지 개선

### 개요

Python은 종종 전체 표준 라이브러리 없이 빌드되거나 배포됩니다. 하지만 현재까지는 누락된 표준 라이브러리 모듈을 import하지 못했을 때 사용자에게 실패 원인을 적절하게 알려주는 표준적이고 사용자 친화적인 방법이 없습니다.

이 PEP는 예상되는 표준 라이브러리 모듈을 식별하고, 표준 라이브러리 모듈 import 시도가 실패할 경우 사용자에게 더 유익한 오류 메시지를 제공하는 메커니즘을 제안합니다.

### PEP 연기 (PEP Deferral)

PEP 작성자들은 현재 이 PEP에 대해 적극적으로 작업하고 있지 않습니다. 따라서 이러한 오류 메시지 개선에 관심이 있다면, python-dev 메일링 리스트에 게시하는 등의 방법으로 연락을 취해달라고 권장합니다.

가장 중요한 미해결 과제는 autoconf 및 Visual Studio 빌드 프로세스가 `sysconfig` 메타데이터 파일에 예상되는 표준 라이브러리 모듈 및 선택적 표준 라이브러리 모듈 목록을 채우는 방법을 결정하는 것입니다.

### 동기 (Motivation)

Python 표준 라이브러리의 일부만 포함하는 여러 사용 사례가 있습니다. 그러나 표준 라이브러리 모듈이 누락된 이유와 상황을 적절하게 해결하는 방법을 사용자에게 알리는 사용자 친화적인 메커니즘이 아직 없습니다.

**CPython**
CPython 빌드 중에 `_sqlite3`와 같은 표준 라이브러리 모듈이 누락된 종속성(예: SQLite 헤더 파일)으로 인해 컴파일될 수 없을 때, 해당 모듈은 단순히 건너뛰어집니다. 이후 컴파일된 Python을 설치하고 누락된 모듈 중 하나를 import하려고 하면, Python은 `ModuleNotFoundError`와 함께 실패합니다.

예를 들어, 로컬 시스템에서 `sqlite-devel`을 의도적으로 제거한 후 `import sqlite3`를 실행하면 `ModuleNotFoundError: No module named '_sqlite3'`와 같은 오류가 발생합니다. 이는 깨끗하게 빌드된 Python에 표준 라이브러리 모듈이 누락된 이유를 이해하지 못하는 사용자들을 혼란스럽게 할 수 있습니다.

**Linux 및 기타 배포판**
많은 Linux 및 기타 배포판은 이미 표준 라이브러리의 일부를 독립 실행형 패키지로 분리하고 있습니다. 가장 일반적으로 제외되는 모듈 중에는 그래픽 환경에 의존하는 `tkinter` 모듈, `tkinter`에 의존하는 `idlelib` (대부분의 Linux 데스크톱 환경은 자체 기본 코드 편집기를 제공하므로), 그리고 Python 내부 테스트에만 사용되며 나머지 표준 라이브러리 전체만큼 크기가 큰 `test` 패키지가 있습니다.

이러한 모듈을 생략하는 방법은 다릅니다. 예를 들어, Debian은 `Lib/tkinter/__init__.py` 파일을 패치하여 `import _tkinter` 라인을 `try-except` 블록으로 묶고 `ImportError`가 발생하면 오류 메시지에 "please install the python3-tk package"를 추가합니다. Fedora 및 다른 배포판은 단순히 생략된 모듈을 포함하지 않아 사용자들이 어디서 찾아야 할지 혼란스러워할 수 있습니다.

Fedora 29에서 `python3 -c "import tkinter"`를 실행하면 `ModuleNotFoundError: No module named 'tkinter'`와 같은 메시지가 나옵니다.

### 명세 (Specification)

**예상되는 표준 라이브러리 모듈을 나열하는 API**
어떤 모듈 이름이 표준 라이브러리에서 해결될 것으로 예상되는지 더 쉽게 식별할 수 있도록 `sysconfig` 모듈은 두 가지 추가 함수로 확장될 것입니다.

*   `sysconfig.get_stdlib_modules()`: 모든 최상위(top level) Python 표준 라이브러리 모듈(개인(private) 모듈 포함)의 이름을 나열합니다.
*   `sysconfig.get_optional_modules()`: 선택적 공용(public) 최상위 표준 라이브러리 모듈 이름을 나열합니다.

`sysconfig.get_optional_modules()`의 결과와 기존의 `sys.builtin_module_names`는 모두 새로운 `sysconfig.get_stdlib_modules()` 함수가 제공하는 전체 목록의 부분 집합이 될 것입니다.

이 추가된 목록은 Python 빌드 프로세스 중에 생성되어 다른 `sysconfig` 값과 함께 `_sysconfigdata-*.py` 파일에 저장됩니다.

모듈이 "선택적(optional)" 목록에 포함될 수 있는 가능한 이유는 다음과 같습니다.
*   모듈이 선택적 빌드 종속성(예: `_sqlite3`, `tkinter`, `idlelib`)에 의존하는 경우.
*   모듈이 다른 이유로 개인(private)이며 따라서 모든 구현에 존재하지 않을 수 있는 경우(예: `_freeze_importlib`, `_collections_abc`).
*   모듈이 플랫폼 특정적이어서 모든 설치에 존재하지 않을 수 있는 경우(예: `winreg`).
*   `test` 패키지는 Python 구현을 테스트하는 데 사용되며 Python 프로젝트에서 런타임 라이브러리로 사용하기 위한 것이 아니므로(테스트 유틸리티를 제공하는 공용 API는 `unittest`임) Python 런타임 설치에서 자유롭게 생략될 수 있습니다.

(참고: `ensurepip`, `venv`, `distutils` 모듈은 이 PEP에서 모두 필수 모듈로 간주됩니다. 모든 재배포자가 현재 이러한 관행을 준수하는 것은 아니지만, 이 PEP에서는 필수 모듈로 간주합니다.)

**기본 `sys.excepthook` 구현 변경**
`sys.excepthook` 함수의 기본 구현은 두 가지 새로운 `sysconfig` 함수 중 하나에 의해 Python 표준 라이브러리에 속하는 것으로 식별된 모듈 import 실패를 감지할 때 적절한 메시지를 전달하도록 수정될 것입니다.

Python이 설치될 때 선택적 빌드 종속성에 의존하거나 다른 이유로 선택적으로 간주되는 모듈에 대한 수정된 오류 메시지:
```
$ ./python -c "import sqlite3"
Traceback (most recent call last):
  File "<string>", line 1, in <module>
  File "/home/ncoghlan/devel/cpython/Lib/sqlite3/__init__.py", line 23, in <module>
    from sqlite3.dbapi2 import *
  File "/home/ncoghlan/devel/cpython/Lib/sqlite3/dbapi2.py", line 27, in <module>
    from _sqlite3 import *
ModuleNotFoundError: Optional standard library module '_sqlite3' was not found
```
전체 최상위 패키지가 누락되었을 때 선택적 최상위 패키지의 하위 모듈에 대한 수정된 오류 메시지:
```
$ ./python -c "import test.regrtest"
Traceback (most recent call last):
  File "<string>", line 1, in <module>
ModuleNotFoundError: Optional standard library module 'test' was not found
```
최상위 패키지가 존재할 때 선택적 최상위 패키지의 하위 모듈에 대한 수정된 오류 메시지:
```
$ ./python -c "import test.regrtest"
Traceback (most recent call last):
  File "<string>", line 1, in <module>
ModuleNotFoundError: No submodule named 'test.regrtest' in optional standard library module 'test'
```
항상 사용 가능해야 하는 모듈에 대한 수정된 오류 메시지:
```
$ ./python -c "import ensurepip"
Traceback (most recent call last):
  File "<string>", line 1, in <module>
ModuleNotFoundError: Standard library module 'ensurepip' was not found
```
최상위 패키지가 존재할 때 표준 라이브러리 패키지의 누락된 하위 모듈에 대한 수정된 오류 메시지:
```
$ ./python -c "import encodings.mbcs"
Traceback (most recent call last):
  File "<string>", line 1, in <module>
ModuleNotFoundError: No submodule named 'encodings.mbcs' in standard library module 'encodings'
```
이러한 수정된 오류 메시지는 누락된 모듈이 현재 환경에서 누락된 타사 종속성의 지표가 아니라, 표준 라이브러리에서 사용 가능해야 하지만 어떤 이유로 사용할 수 없다는 것을 명확히 합니다.

### 설계 논의 (Design Discussion)

**`sys.excepthook` 수정**
`sys.excepthook` 함수는 발생한 예외가 잡히지 않고 프로그램이 종료되거나 (대화형 세션에서) 제어가 프롬프트로 반환될 때 호출됩니다. 이는 사용자 정의 오류 메시지를 위한 완벽한 장소입니다. 왜냐하면 잡힌 오류에는 영향을 미치지 않아 Python 스크립트의 정상적인 실행 속도를 저하시키지 않기 때문입니다.

**예상되는 표준 라이브러리 모듈 이름을 질의(Query)하는 공용 API**
`sysconfig.get_stdlib_modules()` 및 `sysconfig.get_optional_modules()` 함수의 포함은 Python 표준 라이브러리 모듈의 이름을 쉽게 나열하는 방법을 제공할 것입니다. 이는 (다른 이점들과 함께) 코드 분석, 프로파일링 및 오류 보고 도구에서 런타임 `--ignore-stdlib` 플래그를 제공하는 것을 더 쉽게 만들 것입니다.

**최상위 모듈 이름만 포함**
이 PEP는 새로운 질의 API에 의해 최상위 모듈 및 패키지 이름만 보고될 것을 제안합니다. 이는 제안된 오류 메시지를 생성하기에 충분한 정보이며, 필요한 항목 수를 한 자릿수 감소시키고, 빌드 프로세스 중에 관련 메타데이터를 생성하는 과정을 단순화합니다.

만약 이 제한이 지나치게 제한적이라고 판명되면, `include_submodules` 플래그를 질의 API에 추가할 수 있습니다. 하지만 이는 추가적인 복잡성을 정당화할 만큼의 이점이 현재로서는 보이지 않으므로 초기 제안의 일부는 아닙니다.

이 제한으로 인한 한 가지 알려진 결과는 새로운 기본 `excepthook` 구현이 존재하지 않는 표준 라이브러리 하위 모듈을 보고하는 것과 동일한 방식으로 잘못된 하위 모듈 이름을 보고한다는 것입니다.
```
$ ./python -c "import unittest.muck"
Traceback (most recent call last):
  File "<string>", line 1, in <module>
ModuleNotFoundError: No submodule named 'unittest.muck' in standard library module 'unittest'
```

**개인(Private) 최상위 모듈 이름을 선택적 표준 라이브러리 모듈로 나열**
선택적 외부 빌드 종속성을 가지는 많은 모듈은 하이브리드 모듈로 작성됩니다. 여기서 Python 래퍼는 기본 외부 라이브러리에 대한 구현 종속 인터페이스를 감싸고 있습니다. 다른 경우에는 개인 최상위 모듈이 단순히 CPython 구현 세부 사항일 수 있으며, 다른 구현은 해당 모듈을 전혀 제공하지 않을 수 있습니다.

이러한 모듈과 관련된 import 오류를 적절하게 보고하기 위해 새로운 기본 `excepthook` 구현은 새로운 질의 API에 의해 이들이 보고되어야 합니다.

**패키징 관련 모듈을 필수(Mandatory)로 간주**
일부 재배포자들은 Python 특정 패키징 관련 모듈(`distutils`, `ensurepip`, `venv`)을 기본적으로 설치하는 것을 꺼려하며, 개발자들이 대신 플랫폼 특정 도구를 사용하기를 선호합니다.

이러한 접근 방식은 크로스 플랫폼 프로젝트에서 작업하는 개발자와 플랫폼 독립적인 설정 지침을 작성하려는 교육자에게 상호 운용성 문제를 야기합니다. 따라서 이 PEP는 이러한 모듈이 필수적으로 간주되어야 하며, 선택적 모듈 목록에서 제외되어야 한다는 견해를 취합니다.

### 연기된 아이디어 (Deferred Ideas)

이 섹션의 아이디어는 이 PEP가 잠재적으로 가능하게 할 수 있지만, 초기 제안의 범위 밖으로 간주되는 개념들입니다.

**플랫폼 종속 모듈**
일부 표준 라이브러리 모듈은 특정 플랫폼에서만 제공되기 때문에 누락될 수 있습니다. 예를 들어, `winreg` 모듈은 Windows에서만 사용 가능합니다.
```
$ python3 -c "import winreg"
Traceback (most recent call last):
  File "<string>", line 1, in <module>
ModuleNotFoundError: No module named 'winreg'
```
현재 제안에서는 이러한 플랫폼 종속 모듈이 플랫폼 종속성 정보를 더 구조화된 방식으로 노출하려는 시도 대신 다른 모든 선택적 모듈과 함께 단순히 포함될 것입니다.

그러나 문서화를 위해 플랫폼 종속성이 "Windows", "Unix", "Linux", "FreeBSD" 수준에서 추적되므로, 이를 프로그램적으로도 노출하는 것이 가능할 것으로 보입니다.

**`__main__`이 표준 라이브러리 모듈을 가릴 때 경고 발생**
새로운 질의 API를 통해 새로운 기본 `excepthook` 구현은 `__main__.__file__` 또는 `__main__.__spec__.name`이 표준 라이브러리 모듈과 일치하는지 감지하고 적절한 경고를 발생시킬 수 있습니다.

그러나 실제로 이러한 기능을 구현하려면 사용자들이 이 문제를 실제로 겪는 더 많은 사례를 검토하고, 디버깅 상황을 돕기 위해 더 많은 정보를 제공할 수 있는 다양한 옵션을 고려해야 하며, 지금 당장 통합될 필요는 없습니다.

### 다운스트림 배포자를 위한 권장 사항 (Recommendation for Downstream Distributors)

`site.py` [*]를 패치하여 `sys.excepthook` 함수의 자체 구현을 제공함으로써 Python 배포자들은 `ModuleNotFoundError`를 만났을 때 누락된 표준 라이브러리 모듈을 설치하는 적절한 배포판별 방법을 사용자에게 알리는 것을 포함하여, 잡히지 않은 예외에 대해 맞춤형 오류 메시지를 표시할 수 있습니다.

일부 다운스트림 배포자들은 이미 `sys.excepthook`를 패치하는 이 방법을 사용하여 플랫폼 충돌 보고 메커니즘과 통합하고 있습니다.

### 역방향 호환성 (Backwards Compatibility)

역방향 호환성 문제는 예상되지 않습니다. 누락된 종속성에 대한 사용자 정의 처리를 제공하기 위해 Python 모듈을 이미 패치하고 있는 배포판은 계속해서 방해받지 않고 그렇게 할 수 있습니다.

### 참조 및 예시 구현 (Reference and Example Implementation)

미정(TBD). 세부 사항은 CPython 빌드 시스템의 기능에 따라 실용적인 것에 달라질 것입니다 (다른 구현은 자체적으로 재생성할 필요 없이 생성된 CPython 데이터를 사용할 수 있어야 합니다).

### 참고 및 참조 (Notes and References)

[*] 자체 사용자 정의 Python 변형을 가진 조직의 경우 `sitecustomize.py`.
 http://bazaar.launchpad.net/~doko/python/pkg3.5-debian/view/head:/patches/tkinter-import.diff
 http://stackoverflow.com/questions/6463918/how-can-i-get-a-list-of-all-the-python-standard-library-modules

이 PEP에 이르는 아이디어들은 python-dev 메일링 리스트와 이어서 python-ideas에서 논의되었습니다.

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.