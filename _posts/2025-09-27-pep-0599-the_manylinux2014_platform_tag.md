---
title: "[Superseded] PEP 599 - The manylinux2014 Platform Tag"
excerpt: "Python Enhancement Proposal 599: 'The manylinux2014 Platform Tag'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/599/
toc: true
toc_sticky: true
date: 2025-09-27 00:14:20+0900
last_modified_at: 2025-09-27 00:14:20+0900
published: true
---
> **원문 링크:** [PEP 599 - The manylinux2014 Platform Tag](https://peps.python.org/pep-0599/)
>
> **상태:** Superseded | **유형:** Informational | **작성일:** 29-Apr-2019


# PEP 599 – manylinux2014 플랫폼 태그

## 개요 (Abstract)

이 PEP(Python Enhancement Proposal)는 기존 PEP 513에서 도입된 `manylinux2010` 태그를 계승하는 `manylinux2014` 플랫폼 태그의 생성을 제안합니다. 또한, PyPI(Python Package Index)와 `pip`가 호환 가능한 플랫폼에서 `manylinux2014` 배포판의 업로드, 다운로드, 설치를 지원하도록 업데이트할 것을 제안합니다.

## 도입 배경 (Rationale)

`manylinux` 표준은 Linux 환경에서 컴파일된 Python 휠(wheel) 패키지의 호환성을 보장하기 위해 도입되었습니다. `manylinux2010`의 기반이 되었던 CentOS 6는 2020년 11월 30일에 지원이 종료되었으며, 이 시점 이후에는 보안 패치를 포함한 추가 업데이트가 제공되지 않습니다. 이로 인해 `manylinux2010` 이미지로 빌드된 모든 휠은 구식 버전으로 남게 됩니다.

이러한 문제 해결을 위해, 기존 `manylinux` 표준을 이어가며 CentOS 7을 기반으로 하는 새로운 PEP 425 스타일의 플랫폼 태그인 `manylinux2014`를 제안합니다. `manylinux2014`는 CentOS 7의 라이브러리와 심볼 버전을 따르며, CentOS 7은 2024년 6월 30일에 지원이 종료될 예정입니다.

`manylinuxYYYY` 패턴은 다음과 같은 장점 때문에 현재 방식을 유지하는 것이 좋습니다:
*   명확하게 지정된 호환 라이브러리를 포함하는 잘 정의된 Docker 이미지를 사용할 수 있습니다.
*   여러 릴리스에 걸쳐 호환성 문제를 조사할 필요가 없습니다.
*   아키텍처별로 단일 빌드 이미지와 `auditwheel` 프로필을 제공합니다.

단점으로는 다음이 있습니다:
*   새로운 표준이 나올 때마다 새로운 PEP를 작성해야 합니다.
*   인스톨러(예: `pip`)에 새로운 플랫폼 태그를 추가해야 합니다.
*   인스톨러가 특정 릴리스 이전의 플랫폼 태그를 설치할 수 없습니다.

어떤 제안에서든 Docker 이미지 및 해당 `auditwheel` 프로필을 정의, 준비 및 릴리스하는 데 필요한 시간과 노력과 같은 공통적인 과제들이 존재합니다. `manylinux2010`의 경우 PEP 승인부터 호환 가능한 빌드 환경이 게시되기까지 약 1년이 걸렸습니다. 그러나 이 PEP를 통해 이 과정이 잘 정의되어 있고 쉽게 반복 가능하여, 새로운 플랫폼 태그의 출시 일정을 단축할 수 있을 것으로 예상됩니다.

## manylinux2014 정책 (The manylinux2014 policy)

Linux 휠이 `manylinux2014` 태그를 부여받기 위한 기준은 다음과 같습니다:

1.  **지원 아키텍처:** 휠은 CentOS 7 또는 CentOS 7 호환 기반 이미지(예: ubi7)에서 지원하는 다음 아키텍처 중 하나에 대해 컴파일된 바이너리 실행 파일 및 공유 객체만 포함해야 합니다:
    *   `x86_64`
    *   `i686`
    *   `aarch64` (ARMv8)
    *   `armv7l` (ARMv7)
    *   `ppc64` (PowerPC)
    *   `ppc64le` (PowerPC Little-Endian)
    *   `s390x` (IBM Z)

    이 목록은 ARMv7, ARMv8, PowerPC 및 IBM Z 아키텍처에 대한 지원을 추가합니다.

2.  **허용되는 외부 라이브러리:** 휠의 바이너리 실행 파일 또는 공유 객체는 다음 목록에 있는 외부 라이브러리에 대해서만 링크되어야 합니다:
    *   `libgcc_s.so.1`
    *   `libstdc++.so.6`
    *   `libm.so.6`
    *   `libdl.so.2`
    *   `librt.so.1`
    *   `libc.so.6`
    *   `libnsl.so.1`
    *   `libutil.so.1`
    *   `libpthread.so.0`
    *   `libresolv.so.2`
    *   `libX11.so.6`
    *   `libXext.so.6`
    *   `libXrender.so.1`
    *   `libICE.so.6`
    *   `libSM.so.6`
    *   `libGL.so.1`
    *   `libgobject-2.0.so.0`
    *   `libgthread-2.0.so.0`
    *   `libglib-2.0.so.0`

    이 목록은 `manylinux2010`에서 허용되었던 외부 라이브러리와 동일하지만, Fedora 30에서 더 이상 사용되지 않는 `libcrypt.so.1`이 제거되었습니다. `libpythonX.Y`는 PEP 513에 명시된 동일한 이유로 포함될 수 없습니다.

    Debian 기반 시스템에서는 이 라이브러리들이 `libc6`, `libgcc1`, `libgl1`, `libglib2.0-0`, `libice6`, `libsm6`, `libstdc++6`, `libx11-6`, `libxext6`, `libxrender1` 패키지에서 제공됩니다. RPM 기반 시스템에서는 `glib2`, `glibc`, `libICE`, `libX11`, `libXext`, `libXrender`, `libgcc`, `libstdc++`, `mesa` 패키지에서 제공됩니다.

3.  **버전별 심볼 제한:** 휠에 허용된 라이브러리에 링크된 바이너리 실행 파일 또는 공유 객체가 버전별 심볼을 내보내는 경우, 다음 최대 버전까지만 의존할 수 있습니다:
    *   `GLIBC_2.17`
    *   `CXXABI_1.3.7`, `CXXABI_TM_1`도 허용
    *   `GLIBCXX_3.4.19`
    *   `GCC_4.8.0`

    예를 들어, `manylinux2014` 휠은 `GLIBC_2.17`보다 이전 버전인 `GLIBC_2.12` 심볼을 요구하는 바이너리 아티팩트를 포함할 수 있습니다.

4.  **CPython ABI 태그 및 PyFPE_jbuf:**
    *   CPython 2 또는 CPython 3.0부터 3.2까지의 버전을 위해 빌드된 휠은 Unicode ABI를 나타내는 CPython ABI 태그를 포함해야 합니다. 예를 들어, Python 2용 `manylinux2014` 휠은 UCS-4 ABI를 나타내는 `cpy27mu` 태그 또는 UCS-2 ABI를 나타내는 `cpy27m` 태그를 포함해야 합니다. (PEP 3149)
    *   휠은 `PyFPE_jbuf` 심볼을 요구해서는 안 됩니다. 이는 `--with-fpectl` configure 플래그 없이 Python을 컴파일하여 달성할 수 있습니다.

## 호환 휠 컴파일 (Compilation of Compliant Wheels)

`manylinux1`과 마찬가지로, `auditwheel` 도구는 `manylinux2014` Docker 컨테이너에서 `pip wheel` 또는 `bdist_wheel`로 빌드된 Linux 휠에 `manylinux2014` 플랫폼 태그를 추가합니다.

### Docker 이미지 (Docker Images)

`manylinux2014` 휠로 안정적으로 변환될 수 있는 바이너리 Linux 휠을 빌드하기 위해 CentOS 7 x86_64를 기반으로 하는 `manylinux2014` Docker 이미지가 제공되어야 합니다. 이 이미지에는 전체 컴파일러 스위트(gcc, g++, gfortran 4.8.5)와 최신 버전의 Python 및 pip가 설치됩니다.

### Auditwheel

`auditwheel` 도구도 `manylinux2014` 휠을 생성하도록 업데이트될 것입니다. `auditwheel`의 동작과 목적은 PEP 513에서 정의된 바와 동일하게 유지됩니다.

## 인스톨러의 플랫폼 감지 (Platform Detection for Installers)

플랫폼은 PEP 513에 설명된 `_manylinux` 모듈에 `manylinux2014_compatible`이라는 부울(boolean) 속성을 정의할 수 있습니다. 이 속성이 `False`인 경우, 해당 플랫폼은 `manylinux2014`와 호환되지 않는 것으로 간주됩니다.

`_manylinux` 모듈을 찾을 수 없거나 `manylinux2014_compatible` 속성이 없는 경우, 도구는 `glibc` 버전 확인으로 대체될 수 있습니다. 플랫폼이 `glibc 2.17` 이상을 사용하는 경우, `_manylinux` 모듈이 다른 결과를 나타내지 않는 한 호환되는 것으로 간주됩니다.

제안된 알고리즘은 다음과 같습니다:

```python
def is_manylinux2014_compatible():
    # Only Linux, and only supported architectures
    from distutils.util import get_platform
    if get_platform() not in [
        "linux-x86_64", "linux-i686", "linux-aarch64", "linux-armv7l",
        "linux-ppc64", "linux-ppc64le", "linux-s390x",
    ]:
        return False

    # Check for presence of _manylinux module
    try:
        import _manylinux
        return bool(_manylinux.manylinux2014_compatible)
    except (ImportError, AttributeError):
        # Fall through to heuristic check below
        pass

    # Check glibc version. CentOS 7 uses glibc 2.17.
    # PEP 513 contains an implementation of this function.
    return have_compatible_glibc(2, 17)
```

## manylinux2010 휠과의 하위 호환성 (Backwards compatibility with manylinux2010 wheels)

PEP 513에서 설명했듯이, `manylinux1`에서 허용된 라이브러리에 대해 지정된 심볼 버전은 상한선을 구성합니다. 이 PEP에서 `manylinux2014`에 정의된 심볼 버전도 마찬가지입니다. 결과적으로 `manylinux1` 및 `manylinux2010` 휠은 `manylinux2014` 휠로 간주됩니다. 따라서 `manylinux2014` 플랫폼 태그를 인식하는 `pip`는 `manylinux2014` 휠을 사용할 수 없을 때 `manylinux2010` 휠을 `manylinux2014` 플랫폼용으로 설치할 것입니다.

## PyPI 지원 (PyPI Support)

PyPI는 `manylinux2010`을 허용하는 것과 동일한 방식으로 `manylinux2014` 플랫폼 태그를 포함하는 휠의 업로드를 허용해야 합니다. 기술적으로 가능하다면, PyPI는 `manylinux2014` 휠의 호환성을 검증하려고 시도해야 하지만, 이 기능은 이 PEP의 채택을 위한 필수 요구 사항은 아닙니다.

패키지 작성자는 비호환 `manylinux2014` 휠을 PyPI에 업로드해서는 안 되며, PyPI가 비호환 휠의 업로드를 차단하기 시작할 수 있음을 인지해야 합니다.

## 채택 (Acceptance)

PEP 599는 2019년 7월 31일 Paul Moore에 의해 승인되었습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.