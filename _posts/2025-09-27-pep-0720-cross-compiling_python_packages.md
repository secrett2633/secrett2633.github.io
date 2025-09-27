---
title: "[Draft] PEP 720 - Cross-compiling Python packages"
excerpt: "Python Enhancement Proposal 720: 'Cross-compiling Python packages'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/720/
toc: true
toc_sticky: true
date: 2025-09-27 13:14:54+0900
last_modified_at: 2025-09-27 13:14:54+0900
published: true
---
> **원문 링크:** [PEP 720 - Cross-compiling Python packages](https://peps.python.org/pep-0720/)
>
> **상태:** Draft | **유형:** Informational | **작성일:** 01-Jul-2023

## PEP 720 – Python 패키지 교차 컴파일

*   **작성자:** Filipe Laíns <lains at python.org>
*   **PEP 담당자:**
*   **상태:** 초안 (Draft)
*   **유형:** 정보성 (Informational)
*   **작성일:** 2023년 7월 1일
*   **Python 버전:** 3.12

### 목차

*   [초록](#초록)
*   [동기](#동기)
*   [분석](#분석)
    *   [서론](#서론)
    *   [Upstream 지원](#upstream-지원)
    *   [적절한 Cross-Build 지원을 제공하는 프로젝트](#적절한-cross-build-지원을-제공하는-프로젝트)
    *   [Downstream 접근 방식](#downstream-접근-방식)
        *   [Cross-Build 환경](#cross-build-환경)
        *   [타겟 환경 위장 (Faking the target environment)](#타겟-환경-위장-faking-the-target-environment)
    *   [환경 인트로스펙션 (Environment Introspection)](#환경-인트로스펙션-environment-introspection)
    *   [CPython (및 유사 구현체)](#cpython-및-유사-구현체)
        *   [sysconfig 설정 변수](#sysconfig-설정-변수)
*   [관련 정보](#관련-정보)
    *   [확장 모듈은 언제 `libpython`에 링크되어야 하는가?](#확장-모듈은-언제-libpython에-링크되어야-하는가)
    *   [`prefix`, `exec_prefix`, `base_prefix`, `base_exec_prefix`란 무엇인가?](#prefix-exec_prefix-base_prefix-base_exec_prefix란-무엇인가)
*   [사례 연구](#사례-연구)
    *   [crossenv](#crossenv)
    *   [conda-forge](#conda-forge)
    *   [Yocto Project](#yocto-project)
    *   [Buildroot](#buildroot)
    *   [Pyodide](#pyodide)
    *   [Beeware](#beeware)
    *   [python-for-android](#python-for-android)
    *   [kivy-ios](#kivy-ios)
    *   [AidLearning](#aidlearning)
    *   [QPython](#qpython)
    *   [pyqtdeploy](#pyqtdeploy)
    *   [Chaquopy](#chaquopy)
    *   [EDK II](#edk-ii)
    *   [ActivePython](#activepython)
    *   [Termux](#termux)

---

### 초록

이 PEP는 다운스트림 프로젝트의 교차 컴파일(cross-compilation) 현황을 문서화하려는 시도입니다. 이 문서는 배포자(리눅스 배포판, WASM 환경 제공자 등)가 서드 파티 확장 모듈과 같은 다운스트림 프로젝트를 교차 컴파일하기 위해 현재 사용하고 있는 접근 방식에 대한 개요를 제공합니다.

### 동기

이 PEP는 교차 컴파일의 어려움을 설명하고 향후 개선 제안을 위한 보조 문서 역할을 하기 위해 작성되었습니다.

### 분석

#### 서론

이 문제를 해결하기 위해 여러 가지 접근 방식이 사용되고 있으며, 사용자로부터 요구되는 상호작용 수준도 다양하지만, 모두 상당한 노력을 필요로 합니다. 이는 Python 패키징 생태계에 표준화된 교차 컴파일 인프라가 부족하기 때문이며, 이는 교차 빌드의 복잡성에서 비롯되어 막대한 작업이 됩니다.

#### Upstream 지원

CPython, setuptools 등 일부 주요 프로젝트는 교차 컴파일을 돕기 위한 지원을 제공하지만, 이는 비공식적이며 "최선을 다하는" 수준에 그칩니다. 예를 들어, `sysconfig` 모듈은 `_PYTHON_SYSCONFIGDATA_NAME` 환경 변수를 통해 데이터 모듈 이름을 덮어쓸 수 있도록 하며, 이는 교차 빌드에 필요합니다. 또한 `setuptools`는 널리 사용되는 "환경 위장(environment faking)" 워크플로우와 호환되도록 로직을 조정/수정하기 위한 패치를 받아들입니다.

Upstream 프로젝트에서 자체적인 지원이 부족하여 교차 컴파일은 취약하고 사용자로부터 상당한 노력을 요구하지만, 동시에 표준화의 부족은 이 기능이 어떻게 제공되어야 하는지에 대한 명확성이 없기 때문에 Upstream에서 지원을 개선하기 어렵게 만듭니다.

#### 적절한 Cross-Build 지원을 제공하는 프로젝트

`scikit-build`와 `meson-python`과 같이 적어도 적절한 교차 컴파일 지원을 제공하는 몇몇 최신 Python 패키지 빌드 백엔드가 있습니다. 이 두 프로젝트는 외부의 성숙한 빌드 시스템인 CMake와 Meson을 Python 패키징에 통합하므로, 교차 빌드 지원은 이들로부터 상속됩니다.

#### Downstream 접근 방식

교차 컴파일 접근 방식은 설계상 광범위한 사용자 상호작용을 요구하는 것부터 (이상적으로는) 거의 요구하지 않는 것까지 다양한 스펙트럼에 걸쳐 있습니다. 일반적으로 이들은 교차 빌드 환경을 사용하거나 타겟 환경을 위장하는 두 가지 주요 전략 중 하나를 기반으로 합니다.

##### Cross-Build 환경

이 방식은 Python 인터프리터를 정상적으로 실행하고 프로젝트의 빌드 시스템이 제공하는 교차 빌드를 활용하는 것입니다. 그러나 위에서 본 바와 같이 Upstream 지원이 부족하여 이 접근 방식은 소수의 프로젝트에서만 작동합니다. 이 방식이 실패할 경우, 일반적인 전략은 올바른 툴체인, 시스템 세부 정보 등을 사용하도록 빌드 시스템 코드를 패치하는 것입니다.

이 접근 방식은 종종 패키지별 패치가 필요하므로 많은 사용자 상호작용을 요구합니다.

*   **예시:** `python-for-android`, `kivy-ios` 등.

##### 타겟 환경 위장 (Faking the target environment)

사용자 입력 요구 사항을 줄이는 것을 목표로 하는 인기 있는 접근 방식은 타겟 환경을 위장하는 것입니다. 이는 일반적으로 Python 인터프리터를 Monkeypatch하여 타겟 시스템의 인터프리터를 모방하도록 하는 것으로, `sys` 모듈의 여러 속성, `sysconfig` 데이터 등을 변경하는 것을 포함합니다. 이 전략을 사용하면 빌드 백엔드는 교차 빌드 지원이 전혀 필요 없으며, 코드 변경 없이 작동해야 합니다.

그러나 안타깝게도 타겟 환경을 완전히 위장하는 것은 불가능합니다. 여기에는 여러 가지 이유가 있는데, 주요 이유 중 하나는 실행 중인 인터프리터를 실제로 인트로스펙션해야 하는 코드를 손상시키기 때문입니다. 결과적으로, 타겟처럼 보이도록 Python을 Monkeypatch하는 것은 매우 까다롭습니다. 가장 적은 손상을 달성하기 위해 인터프리터의 특정 측면만 패치할 수 있습니다. 따라서 빌드 백엔드는 일부 코드 변경이 필요할 수 있지만, 일반적으로 이전 접근 방식보다 훨씬 작습니다. 이는 이 기술의 본질적인 한계이며, 이 전략은 여전히 일부 사용자 상호작용을 요구합니다.

그럼에도 불구하고 이 전략은 위의 접근 방식보다 훨씬 더 많은 프로젝트에서 별다른 설정 없이 작동하며, 이러한 경우 훨씬 적은 노력을 필요로 합니다. 이는 일반적이지는 않지만, 필요한 사용자 상호작용의 양을 줄이는 데 성공적입니다.

*   **예시:** `crossenv`, `conda-forge` 등.

#### 환경 인트로스펙션 (Environment Introspection)

위에서 설명했듯이, 대부분의 빌드 시스템 코드는 빌드가 발생하는 시스템과 타겟 시스템이 동일하다는 가정 하에 작성되므로, 빌드를 안내하기 위해 인트로스펙션이 일반적으로 사용됩니다.

이 섹션에서는 이것이 어떻게 이루어지는지에 대한 대부분의 방법을 문서화하려고 합니다. 이는 빌드 시스템에 필요한 환경 세부 정보에 대한 적절한 개요를 제공해야 합니다.

| 스니펫                                                        | 설명                                                                                                                                                                                                                                                                                                                                | 변동성 (Variance)                                                                        |
| :---------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| `importlib.machinery.EXTENSION_SUFFIXES`                    | 이 인터프리터가 지원하는 확장 (네이티브 모듈) 접미사. 이는 구현 정의(implementation-defined)이지만, 일반적으로 구현, 시스템 아키텍처, 빌드 구성, Python 언어 버전 및 구현 버전 (존재하는 경우)에 따라 다릅니다.                                                                                                           | 구현, 시스템 아키텍처, 빌드 구성, Python 언어 버전, 구현 버전에 따라 다름. |
| `importlib.machinery.SOURCE_SUFFIXES`                       | 이 인터프리터가 지원하는 소스 (순수 Python) 접미사. 이는 구현 정의(implementation-defined)이지만, 일반적으로 (특이한 구현이나 시스템을 제외하고) 다르지 않습니다.                                                                                                                                                                  | 구현 정의이지만, 보통 다르지 않음.                                            |
| `importlib.machinery.all_suffixes()`                        | 이 인터프리터가 지원하는 모든 모듈 파일 접미사. `importlib.machinery.*_SUFFIXES` 속성의 합집합이어야 합니다. 이는 구현 정의(implementation-defined)이지만, 일반적으로 구현, 시스템 아키텍처, 빌드 구성, Python 언어 버전 및 구현 버전 (존재하는 경우)에 따라 다릅니다. 자세한 내용은 위 항목들을 참조하십시오. | 구현, 시스템 아키텍처, 빌드 구성, Python 언어 버전, 구현 버전에 따라 다름. |
| `sys.abiflags`                                              | PEP 3149에 지정된 ABI 플래그.                                                                                                                                                                                                                                                                                          | 빌드 구성에 따라 다름.                                                        |
| `sys.api_version`                                           | C API 버전.                                                                                                                                                                                                                                                                                                             | Python 설치에 따라 다름.                                                      |
| `sys.base_prefix`                                           | 플랫폼 독립적인 파일이 설치되는 설치 전체 디렉터리의 `prefix`.                                                                                                                                                                                                                                                        | 플랫폼 및 설치에 따라 다름.                                                   |
| `sys.base_exec_prefix`                                      | 플랫폼 종속적인 파일이 설치되는 설치 전체 디렉터리의 `prefix`.                                                                                                                                                                                                                                                        | 플랫폼 및 설치에 따라 다름.                                                   |
| `sys.byteorder`                                             | 네이티브 바이트 순서.                                                                                                                                                                                                                                                                                                   | 플랫폼에 따라 다름.                                                           |
| `sys.builtin_module_names`                                  | Python 인터프리터에 컴파일된 모든 모듈의 이름.                                                                                                                                                                                                                                                                        | 플랫폼, 시스템 아키텍처, 빌드 구성에 따라 다름.                               |
| `sys.exec_prefix`                                           | 플랫폼 독립적인 파일이 설치되는 사이트별 디렉터리의 `prefix`. 사이트별 디렉터리와 관련되므로, 표준 가상 환경 구현에서는 가상 환경별 경로가 됩니다.                                                                                                                                                             | 플랫폼, 설치, 환경에 따라 다름.                                               |
| `sys.executable`                                            | 사용 중인 Python 인터프리터의 경로.                                                                                                                                                                                                                                                                                     | 설치에 따라 다름.                                                             |
| `with open(sys.executable, 'rb') as f: ...` (ELF 파일 감지) | Python 인터프리터가 ELF 파일인지 여부 및 ELF 헤더. 이 접근 방식은 설치의 타겟 아키텍처를 식별하는 데 사용됩니다 (예시).                                                                                                                                                                                     | 설치에 따라 다름.                                                             |
| `sys.float_info`                                            | `float.h`에 정의된 float 타입에 대한 하위 수준 정보.                                                                                                                                                                                                                                                                  | 아키텍처 및 플랫폼에 따라 다름.                                               |
| `sys.getandroidapilevel()`                                  | Android API 수준을 나타내는 정수.                                                                                                                                                                                                                                                                                       | 플랫폼에 따라 다름.                                                           |
| `sys.getwindowsversion()`                                   | 시스템의 Windows 버전.                                                                                                                                                                                                                                                                                                  | 플랫폼에 따라 다름.                                                           |
| `sys.hexversion`                                            | 정수로 인코딩된 Python 버전.                                                                                                                                                                                                                                                                                           | Python 언어 버전에 따라 다름.                                                 |
| `sys.implementation`                                        | 인터프리터 구현 세부 정보. 인터프리터 구현, Python 언어 버전 및 구현 버전 (존재하는 경우)에 따라 다릅니다. 아키텍처 종속적인 정보도 포함할 수 있으므로 시스템 아키텍처에 따라서도 다를 수 있습니다.                                                                                                   | 인터프리터 구현, Python 언어 버전, 구현 버전, 시스템 아키텍처에 따라 다름.    |
| `sys.int_info`                                              | Python 내부 정수 표현에 대한 하위 수준 정보.                                                                                                                                                                                                                                                                          | 아키텍처, 플랫폼, 구현, 빌드 및 런타임 플래그에 따라 다름.                     |
| `sys.maxsize`                                               | `Py_ssize_t` 타입 변수가 가질 수 있는 최대 값.                                                                                                                                                                                                                                                                          | 아키텍처, 플랫폼, 구현에 따라 다름.                                           |
| `sys.maxunicode`                                            | 가장 큰 유니코드 코드 포인트의 값.                                                                                                                                                                                                                                                                                     | 구현 및 Python 3.3 이전 버전에서는 빌드에 따라 다름.                          |
| `sys.platform`                                              | 플랫폼 식별자.                                                                                                                                                                                                                                                                                                          | 플랫폼에 따라 다름.                                                           |
| `sys.prefix`                                                | 플랫폼 종속적인 파일이 설치되는 사이트별 디렉터리의 `prefix`. 사이트별 디렉터리와 관련되므로, 표준 가상 환경 구현에서는 가상 환경별 경로가 됩니다.                                                                                                                                                             | 플랫폼, 설치, 환경에 따라 다름.                                               |
| `sys.platlibdir`                                            | 플랫폼별 라이브러리 디렉터리.                                                                                                                                                                                                                                                                                           | 플랫폼 및 벤더에 따라 다름.                                                   |
| `sys.version_info`                                          | 인터프리터에 의해 구현된 Python 언어 버전. 타겟 Python 버전과 다른 경우 다릅니다.                                                                                                                                                                                                                         | 타겟 Python 버전이 동일하지 않은 경우 다름.                                   |
| `sys.thread_info`                                           | 스레드 구현에 대한 정보.                                                                                                                                                                                                                                                                                                | 플랫폼 및 구현에 따라 다름.                                                   |
| `sys.winver`                                                | Windows 레지스트리 키를 형성하는 데 사용되는 버전 번호.                                                                                                                                                                                                                                                                 | 플랫폼 및 구현에 따라 다름.                                                   |
| `sysconfig.get_config_vars()`                               | Python 배포판 설정 변수. 실행 중인 컨텍스트에 따라 `prefix`, `exec_prefix` 등과 같은 변수 세트를 포함하며, Python 구현 및 시스템에 따라 일부 추가 변수를 포함할 수 있습니다.                                                                                                                | 동일하지 않은 빌드 간에 일반적으로 다름.                                       |
| `sysconfig.get_config_var(...)`                             | Python 배포판 설정 변수.                                                                                                                                                                                                                                                                                                | 동일하지 않은 빌드 간에 일반적으로 다름.                                       |

#### CPython (및 유사 구현체)

##### sysconfig 설정 변수

| 이름                | 예시 값                      | 설명                                                                                                                                                                                                                                                                                                                                                                                           | 변동성                                                                                   |
| :------------------ | :--------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------- |
| `SOABI`             | `cpython-311-x86_64-linux-gnu` | ABI 문자열 — PEP 3149에 의해 정의됨.                                                                                                                                                                                                                                                                                                                                                         | 구현, 시스템 아키텍처, Python 언어 버전, 구현 버전에 따라 다름 (존재하는 경우). |
| `SHLIB_SUFFIX`      | `.so`                        | 공유 라이브러리 접미사.                                                                                                                                                                                                                                                                                                                                                              | 플랫폼에 따라 다름.                                                            |
| `EXT_SUFFIX`        | `.cpython-311-x86_64-linux-gnu.so` | 인터프리터별 Python 확장 (네이티브 모듈) 접미사 — 일반적으로 `.{SOABI}.{SHLIB_SUFFIX}`로 정의됨.                                                                                                                                                                                                                                                                                      | 구현, 시스템 아키텍처, Python 언어 버전, 구현 버전에 따라 다름 (존재하는 경우). |
| `LDLIBRARY`         | `libpython3.11.so`           | 공유 `libpython` 라이브러리 이름 — 사용 가능한 경우. 사용 불가능한 경우, 변수는 비어 있으며, 사용 가능한 경우 라이브러리는 `LIBDIR`에 위치해야 합니다.                                                                                                                                                                                                                           | 구현, 시스템 아키텍처, 빌드 구성, Python 언어 버전, 구현 버전에 따라 다름 (존재하는 경우). |
| `PY3LIBRARY`        | `libpython3.so`              | Python 3 전용 (주 버전 바운드만) `libpython` 라이브러리 이름 — 사용 가능한 경우. 사용 불가능한 경우, 변수는 비어 있으며, 사용 가능한 경우 라이브러리는 `LIBDIR`에 위치해야 합니다.                                                                                                                                                                                            | 구현, 시스템 아키텍처, 빌드 구성, Python 언어 버전, 구현 버전에 따라 다름 (존재하는 경우). |
| `LIBRARY`           | `libpython3.11.a`            | 정적 `libpython` 라이브러리 이름 — 사용 가능한 경우. 사용 불가능한 경우, 변수는 비어 있으며, 사용 가능한 경우 라이브러리는 `LIBDIR`에 위치해야 합니다.                                                                                                                                                                                                                           | 구현, 시스템 아키텍처, 빌드 구성, Python 언어 버전, 구현 버전에 따라 다름 (존재하는 경우). |
| `Py_DEBUG`          | `0`                          | 디버그 빌드 여부.                                                                                                                                                                                                                                                                                                                                                                    | 빌드 구성에 따라 다름.                                                         |
| `WITH_PYMALLOC`     | `1`                          | 이 빌드에 `pymalloc` 지원이 있는지 여부.                                                                                                                                                                                                                                                                                                                                             | 빌드 구성에 따라 다름.                                                         |
| `Py_TRACE_REFS`     | `0`                          | 참조 추적 (디버그 빌드 전용)이 활성화되었는지 여부.                                                                                                                                                                                                                                                                                                                                | 빌드 구성에 따라 다름.                                                         |
| `Py_UNICODE_SIZE`   | `2`                          | `Py_UNICODE` 객체의 크기 (바이트 단위). 이 변수는 CPython 3.3 이전 버전에만 존재하며, PEP 393 이전에는 유니코드 객체에 UCS2 또는 UCS4를 사용하는지 감지하는 데 일반적으로 사용되었습니다.                                                                                                                                                                                    | 빌드 구성에 따라 다름.                                                         |
| `Py_ENABLE_SHARED`  | `1`                          | 공유 `libpython`이 사용 가능한지 여부.                                                                                                                                                                                                                                                                                                                                             | 빌드 구성에 따라 다름.                                                         |
| `PY_ENABLE_SHARED`  | `1`                          | 공유 `libpython`이 사용 가능한지 여부.                                                                                                                                                                                                                                                                                                                                             | 빌드 구성에 따라 다름.                                                         |
| `CC`                | `gcc`                        | Python 배포판을 빌드하는 데 사용된 C 컴파일러.                                                                                                                                                                                                                                                                                                                                      | 빌드 구성에 따라 다름.                                                         |
| `CXX`               | `g++`                        | Python 배포판을 빌드하는 데 사용된 C++ 컴파일러.                                                                                                                                                                                                                                                                                                                                     | 빌드 구성에 따라 다름.                                                         |
| `CFLAGS`            | `-DNDEBUG -g -fwrapv ...`    | Python 배포판을 빌드하는 데 사용된 C 컴파일러 플래그.                                                                                                                                                                                                                                                                                                                                | 빌드 구성에 따라 다름.                                                         |
| `py_version`        | `3.11.3`                     | Python 버전의 전체 형식.                                                                                                                                                                                                                                                                                                                                                             | Python 언어 버전에 따라 다름.                                                  |
| `py_version_short`  | `3.11`                       | 주요 및 부 버전 번호만 포함하는 Python 버전의 사용자 지정 형식.                                                                                                                                                                                                                                                                                                                       | Python 언어 버전에 따라 다름.                                                  |
| `py_version_nodot`  | `311`                        | 주요 및 부 버전 번호만 포함하고 점이 없는 Python 버전의 사용자 지정 형식.                                                                                                                                                                                                                                                                                                             | Python 언어 버전에 따라 다름.                                                  |
| `prefix`            | `/usr`                       | `sys.prefix`와 동일합니다. 위 표의 항목을 참조하십시오.                                                                                                                                                                                                                                                                                                                             | 플랫폼, 설치, 환경에 따라 다름.                                                |
| `base`              | `/usr`                       | `sys.prefix`와 동일합니다. 위 표의 항목을 참조하십시오.                                                                                                                                                                                                                                                                                                                             | 플랫폼, 설치, 환경에 따라 다름.                                                |
| `exec_prefix`       | `/usr`                       | `sys.exec_prefix`와 동일합니다. 위 표의 항목을 참조하십시오.                                                                                                                                                                                                                                                                                                                          | 플랫폼, 설치, 환경에 따라 다름.                                                |
| `platbase`          | `/usr`                       | `sys.exec_prefix`와 동일합니다. 위 표의 항목을 참조하십시오.                                                                                                                                                                                                                                                                                                                          | 플랫폼, 설치, 환경에 따라 다름.                                                |
| `installed_base`    | `/usr`                       | `sys.base_prefix`와 동일합니다. 위 표의 항목을 참조하십시오.                                                                                                                                                                                                                                                                                                                          | 플랫폼 및 설치에 따라 다름.                                                    |
| `installed_platbase` | `/usr`                       | `sys.base_exec_prefix`와 동일합니다. 위 표의 항목을 참조하십시오.                                                                                                                                                                                                                                                                                                                       | 플랫폼 및 설치에 따라 다름.                                                    |
| `platlibdir`        | `lib`                        | `sys.platlibdir`와 동일합니다. 위 표의 항목을 참조하십시오.                                                                                                                                                                                                                                                                                                                           | 플랫폼 및 벤더에 따라 다름.                                                    |
| `SIZEOF_*`          | `4`                          | 특정 C 타입 (`double`, `float` 등)의 크기.                                                                                                                                                                                                                                                                                                                                           | 시스템 아키텍처 및 빌드 세부 정보에 따라 다름.                                 |

### 관련 정보

빌드 시스템에 필요한 일부 정보(예: 플랫폼 특이성)는 여러 곳에 흩어져 있으며, 이를 기반으로 하는 가정을 가진 코드를 식별하는 것은 종종 어렵습니다. 이 섹션에서는 가장 관련성 높은 사례를 문서화하려고 합니다.

#### 확장 모듈은 언제 `libpython`에 링크되어야 하는가?

**간단한 답변:** Windows에서는 예외 없이 링크해야 합니다. POSIX 플랫폼에서는 Android, Cygwin 및 기타 Windows 기반 POSIX 유사 플랫폼을 제외하고는 링크할 필요가 없습니다.

동적 로딩을 위한 확장 모듈을 빌드할 때, 타겟 플랫폼에 따라 `libpython`에 링크해야 할 수도 있습니다.

Windows에서는 모든 심볼이 링크 시점에 해결되어야 하므로 확장 모듈은 `libpython`에 링크해야 합니다. Cygwin, MinGW, 또는 MSYS와 같은 Windows 기반 POSIX 유사 플랫폼도 `libpython`에 링크해야 합니다.

대부분의 POSIX 플랫폼에서는 인터프리터(또는 임베딩 시 해당 실행 파일/라이브러리)가 이미 `libpython`에 링크되어 있기 때문에 심볼을 사용할 수 있으므로 `libpython`에 링크할 필요가 없습니다. 확장 모듈을 `libpython`에 링크하지 않으면 정적 Python 빌드에 의해 로드될 수 있으므로, 가능하면 그렇게 하는 것이 바람직합니다 (GH-65735 참조).

모든 POSIX 플랫폼에서 항상 그런 것은 아니므로 확인해야 합니다. 한 예로 Android가 있는데, 여기서는 기본 실행 파일 및 `LD_PRELOAD` 항목만 `RTLD_GLOBAL`로 간주되어 (즉, 의존성은 `RTLD_LOCAL`임), 확장 모듈을 로드할 때 `libpython` 심볼을 사용할 수 없게 됩니다.

#### `prefix`, `exec_prefix`, `base_prefix`, `base_exec_prefix`란 무엇인가?

이들은 Python 초기화 시 설정되는 `sys` 속성으로, 실행 환경을 설명합니다. 아래 표에 따라 설치/환경 파일이 설치되는 디렉터리의 `prefix`를 나타냅니다.

| 이름             | 대상 파일 유형         | 환경 범위    |
| :--------------- | :--------------------- | :----------- |
| `prefix`         | 플랫폼 독립적 (순수 Python) | 사이트별 (site-specific) |
| `exec_prefix`    | 플랫폼 종속적 (네이티브 코드) | 사이트별 (site-specific) |
| `base_prefix`    | 플랫폼 독립적 (순수 Python) | 설치 전체 (installation-wide) |
| `base_exec_prefix` | 플랫폼 종속적 (네이티브 코드) | 설치 전체 (installation-wide) |

사이트별 `prefix`는 가상 환경 내에서 다르기 때문에, `sys.prefix != sys.base_prefix`를 확인하는 것이 가상 환경 내에 있는지 확인하는 데 일반적으로 사용됩니다.

### 사례 연구

#### crossenv

*   **설명:** Python 확장 모듈 교차 컴파일을 위한 가상 환경.
*   **URL:** `https://github.com/benfogle/crossenv`
*   `crossenv`는 특정 시나리오에서 타겟 머신을 에뮬레이션하려고 시도하는 Monkeypatch된 Python 설치를 포함하는 가상 환경을 생성하는 도구입니다. 이 접근 방식에 대한 자세한 내용은 "타겟 환경 위장 (Faking the target environment)" 섹션에서 찾을 수 있습니다.

#### conda-forge

*   **설명:** `conda` 패키지 관리자를 위한 커뮤니티 주도의 레시피, 빌드 인프라 및 배포 컬렉션.
*   **URL:** `https://conda-forge.org/`
*   XXX: 이 섹션은 PEP 초안이 공개되면 Jaime가 요약할 예정입니다.
*   XXX: 수정된 `crossenv`를 사용합니다.

#### Yocto Project

*   **설명:** Yocto Project는 하드웨어 아키텍처에 관계없이 개발자가 맞춤형 Linux 기반 시스템을 생성하는 데 도움이 되는 오픈 소스 협업 프로젝트입니다.
*   **URL:** `https://www.yoctoproject.org/`
*   XXX: 메일링 리스트에 이메일을 보냈습니다.
*   TODO

#### Buildroot

*   **설명:** Buildroot는 교차 컴파일을 통해 임베디드 Linux 시스템을 생성하는 간단하고 효율적이며 사용하기 쉬운 도구입니다.
*   **URL:** `https://buildroot.org/`
*   TODO

#### Pyodide

*   **설명:** Pyodide는 WebAssembly를 기반으로 하는 브라우저 및 Node.js용 Python 배포판입니다.
*   **URL:** `https://pyodide.org/en/stable/`
*   XXX: Hood가 이 섹션을 검토/확장해야 합니다.
*   Pyodide는 Emscripten 툴체인을 사용하여 WebAssembly로 컴파일된 Python 배포판을 제공합니다.
*   이는 CPython 설치 및 일부 외부 구성 요소의 여러 측면을 패치합니다. 순수 Python 및 `wasm32/Emscripten` Wheel을 모두 지원하는 사용자 지정 패키지 관리자 `micropip`도 배포판의 일부로 제공됩니다. 이 외에도 선택된 서드 파티 패키지 세트가 포함된 리포지토리도 제공되며 기본적으로 활성화되어 있습니다.

#### Beeware

*   **설명:** BeeWare를 사용하면 Python으로 앱을 작성하고 여러 플랫폼에 릴리스할 수 있습니다.
*   **URL:** `https://beeware.org/`
*   TODO

#### python-for-android

*   **설명:** Python 애플리케이션을 Android APK로 전환.
*   **URL:** `https://github.com/kivy/python-for-android`
*   `python-for-android`는 Android에 Python 앱을 패키징하는 도구입니다. 앱 및 해당 의존성을 포함하는 Python 배포판을 생성합니다.
*   순수 Python 의존성은 자동으로 일반적인 방식으로 처리되지만, 네이티브 의존성은 레시피(recipe)가 필요합니다. 인기 있는 의존성을 위한 레시피 세트가 제공되지만, 사용자는 다른 모든 네이티브 의존성에 대해 자체 레시피를 제공해야 합니다.

#### kivy-ios

*   **설명:** iOS용 Python/Kivy/기타 라이브러리 컴파일을 위한 툴체인.
*   **URL:** `https://github.com/kivy/kivy-ios`
*   `kivy-ios`는 iOS에 Python 앱을 패키징하는 도구입니다. 앱 및 해당 의존성을 포함하는 Python 배포판을 빌드하기 위한 툴체인과, 툴체인과 통합되는 Xcode 프로젝트를 생성하고 관리하기 위한 CLI를 제공합니다.
*   앱 의존성에 대해서는 `python-for-android` (Kivy 프로젝트에서 유지 관리)와 동일한 접근 방식을 사용합니다. 즉, 순수 Python 의존성은 자동으로 처리되지만, 네이티브 의존성은 레시피가 필요하며, 프로젝트는 인기 있는 의존성을 위한 레시피를 제공합니다.

#### AidLearning

*   **설명:** AI, Android, Linux, ARM: Android+Linux 통합 생태계를 기반으로 하는 AI 애플리케이션 개발 플랫폼.
*   **URL:** `https://github.com/aidlearning/AidLearning-FrameWork`
*   TODO

#### QPython

*   **설명:** QPython은 Android용 Python 엔진입니다.
*   **URL:** `https://github.com/qpython-android/qpython`
*   TODO

#### pyqtdeploy

*   **설명:** `pyqtdeploy`는 PyQt 애플리케이션을 배포하기 위한 도구입니다.
*   **URL:** `https://www.riverbankcomputing.com/software/pyqtdeploy/`
*   TODO

#### Chaquopy

*   **설명:** Chaquopy는 Android 앱에 Python 구성 요소를 포함하는 데 필요한 모든 것을 제공합니다.
*   **URL:** `https://chaquo.com/chaquopy/`
*   TODO

#### EDK II

*   **설명:** EDK II는 UEFI 및 PI 사양을 위한 현대적이고 기능이 풍부한 교차 플랫폼 펌웨어 개발 환경입니다.
*   **URL:** `https://github.com/tianocore/edk2-libc/tree/master/AppPkg/Applications/Python`
*   TODO

#### ActivePython

*   **설명:** Windows, Linux, Mac OS X, Solaris, HP-UX 및 AIX에서 쉬운 설치와 교차 플랫폼 호환성에 중점을 둔 상업 등급의 품질 보증 Python 배포판.
*   **URL:** `https://www.activestate.com/products/python/`
*   TODO

#### Termux

*   **설명:** Termux는 루팅이나 설정 없이 바로 작동하는 Android 터미널 에뮬레이터이자 Linux 환경 앱입니다.
*   **URL:** `https://termux.dev/en/`
*   TODO


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.