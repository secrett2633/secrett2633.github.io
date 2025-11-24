---
title: "[Superseded] PEP 571 - The manylinux2010 Platform Tag"
excerpt: "Python Enhancement Proposal 571: 'The manylinux2010 Platform Tag'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/571/
toc: true
toc_sticky: true
date: 2025-09-26 23:56:56+0900
last_modified_at: 2025-09-26 23:56:56+0900
published: true
---
> **원문 링크:** [PEP 571 - The manylinux2010 Platform Tag](https://peps.python.org/pep-0571/)
>
> **상태:** Superseded | **유형:** Informational | **작성일:** 05-Feb-2018

# PEP 571 – manylinux2010 플랫폼 태그

*   **작성자:** Mark Williams, Geoffrey Thomas, Thomas Kluyver
*   **BDFL-Delegate:** Alyssa Coghlan
*   **토론:** Distutils-SIG list
*   **상태:** Superseded (교체됨)
*   **유형:** Informational (정보성)
*   **주제:** Packaging (패키징)
*   **작성일:** 2018년 2월 5일
*   **Superseded-By:** PEP 600
*   **결의:** Distutils-SIG 메시지

## 개요 (Abstract)

이 PEP는 PEP 513에 의해 도입된 `manylinux1` 태그를 계승하는 `manylinux2010` 플랫폼 태그의 생성을 제안합니다. 또한, PyPI와 pip가 호환 가능한 플랫폼에서 `manylinux2010` 배포판의 업로드, 다운로드 및 설치를 지원하도록 업데이트될 것을 제안합니다.

## 배경 (Rationale)

이름 그대로, `manylinux1` 플랫폼 태그는 많은 Linux 시스템에서 바이너리 확장 모듈 (binary extension modules) 설치를 현실로 만들었습니다. `cryptography` 및 `numpy`와 같은 라이브러리는 일반적인 아키텍처에서 설치가 취약한 개발 환경 및 빌드 툴체인에 의존하지 않게 되면서 Python 개발자들에게 더 쉽게 접근할 수 있게 되었습니다.

`manylinux1` wheels는 포함된 확장 모듈이 하위 호환성 (backwards-compatibility) 정책의 혜택을 받을 만큼 오래된 버전 심볼 (versioned symbols)을 내보내는 소수의 시스템 레벨 공유 라이브러리 (system-level shared libraries)에만 링크되도록 허용함으로써 이식성을 달성합니다. 예를 들어, `manylinux1` wheel 내의 확장 모듈이 `glibc`에 의존하는 경우, 버전 2.5 이하로 빌드되어야 하며, 그 후에 필요한 심볼을 버전 2.5로 계속 내보내는 최신 `glibc` 버전을 제공하는 시스템에서 실행될 수 있습니다.

PEP 513은 작성 당시 가장 오래된 지원 CentOS 릴리스였던 CentOS 5.11에서 화이트리스트 (whitelisted) 공유 라이브러리와 해당 심볼 버전을 가져왔습니다. 아쉽게도 CentOS 5.11은 2017년 3월 31일에 지원이 종료되었고, 지속적인 사용에 대한 명확한 경고가 있었습니다. 이는 패키지가 구식 버전으로 남아 `manylinux1` Docker 이미지를 사용하는 Python 소프트웨어 패키지 작성자들의 노력을 방해한다는 것을 의미합니다.

이제 CentOS 6는 가장 오래된 지원 CentOS 릴리스이며, 2020년 11월 30일까지 유지보수 업데이트를 받습니다. 우리는 CentOS 6에서 파생된 새로운 PEP 425 스타일의 플랫폼 태그인 `manylinux2010`을 제안하고, `manylinux` 툴체인, PyPI 및 pip가 이를 지원하도록 업데이트될 것을 제안합니다.

이것은 원래 `manylinux2`로 제안되었지만, 버전 관리는 달력 연도 (Calendar Versioning 또는 CalVer)를 사용하도록 변경되었습니다. 이는 `manylinux2014` 이전에 가상의 `manylinux2017` 표준이 새로운 PEP를 통해 정의되거나, 이 PEP보다 오래되었지만 `manylinux1`보다 새로운 시스템을 대상으로 하는 `manylinux2007` 표준이 정의될 수 있는 등, 향후 `manylinux` 태그를 순서에 관계없이 정의하기 쉽게 만듭니다.

달력 버전 관리는 또한 어떤 Linux 배포판 버전이 어떤 태그를 지원하는지에 대한 대략적인 아이디어를 제공합니다. `manylinux2010`은 2010년 이후 출시된 대부분의 배포판 버전에서 작동할 것입니다. 그러나 이것은 단지 근사치일 뿐이며, 실제 호환성 규칙은 아래에 정의되어 있으며 일부 최신 배포판은 이를 충족하지 못할 수 있습니다.

## manylinux2010 정책

다음 기준은 Linux wheel이 `manylinux2010` 태그에 적합한지 여부를 결정합니다.

1.  **아키텍처 (Architecture):** wheel은 CentOS 6에서 지원하는 두 가지 아키텍처(x86_64 또는 i686) 중 하나로 컴파일된 바이너리 실행 파일 및 공유 객체만 포함할 수 있습니다.
2.  **화이트리스트 라이브러리 (Whitelisted Libraries):** wheel의 바이너리 실행 파일 또는 공유 객체는 다음 화이트리스트에 있는 외부 제공 라이브러리만 링크할 수 있습니다.
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

    이 목록은 `manylinux1`에 화이트리스트된 외부 제공 라이브러리와 동일하며, `libncursesw.so.5` 및 `libpanelw.so.5`는 제외됩니다. `libpythonX.Y`는 PEP 513에 설명된 것과 동일한 이유로 포함될 수 없습니다. `libcrypt.so.1`은 Fedora 30이 `libcrypt.so.2`와 함께 출시된 후 소급하여 화이트리스트에서 제거되었습니다.

    Debian 기반 시스템에서 이러한 라이브러리는 다음 패키지에 의해 제공됩니다.

    | Package       | Libraries                                                              |
    | :------------ | :--------------------------------------------------------------------- |
    | `libc6`       | `libdl.so.2`, `libresolv.so.2`, `librt.so.1`, `libc.so.6`, `libpthread.so.0`, `libm.so.6`, `libutil.so.1`, `libnsl.so.1` |
    | `libgcc1`     | `libgcc_s.so.1`                                                        |
    | `libgl1`      | `libGL.so.1`                                                           |
    | `libglib2.0-0`| `libgobject-2.0.so.0`, `libgthread-2.0.so.0`, `libglib-2.0.so.0`       |
    | `libice6`     | `libICE.so.6`                                                          |
    | `libsm6`      | `libSM.so.6`                                                           |
    | `libstdc++6`  | `libstdc++.so.6`                                                       |
    | `libx11-6`    | `libX11.so.6`                                                          |
    | `libxext6`    | `libXext.so.6`                                                         |
    | `libxrender1` | `libXrender.so.1`                                                      |

    RPM 기반 시스템에서는 다음 패키지에 의해 제공됩니다.

    | Package    | Libraries                                                              |
    | :--------- | :--------------------------------------------------------------------- |
    | `glib2`    | `libglib-2.0.so.0`, `libgthread-2.0.so.0`, `libgobject-2.0.so.0`       |
    | `glibc`    | `libresolv.so.2`, `libutil.so.1`, `libnsl.so.1`, `librt.so.1`, `libpthread.so.0`, `libdl.so.2`, `libm.so.6`, `libc.so.6` |
    | `libICE`   | `libICE.so.6`                                                          |
    | `libX11`   | `libX11.so.6`                                                          |
    | `libXext`  | `libXext.so.6`                                                         |
    | `libXrender`| `libXrender.so.1`                                                      |
    | `libgcc`   | `libgcc_s.so.1`                                                        |
    | `libstdc++`| `libstdc++.so.6`                                                       |
    | `mesa`     | `libGL.so.1`                                                           |

3.  **최대 심볼 버전 (Maximum Symbol Versions):** wheel이 버전 심볼을 내보내는 화이트리스트 라이브러리에 링크된 바이너리 실행 파일 또는 공유 객체를 포함하는 경우, 다음 최대 버전에만 의존할 수 있습니다.
    *   `GLIBC_2.12`
    *   `CXXABI_1.3.3`
    *   `GLIBCXX_3.4.13`
    *   `GCC_4.5.0`

    예를 들어, `manylinux2010` wheels는 `GLIBC_2.12`의 최대 버전보다 이전 버전이므로 `GLIBC_2.4` 버전의 `glibc` 심볼을 요구하는 바이너리 아티팩트 (binary artifacts)를 포함할 수 있습니다.

4.  **CPython ABI 태그 (CPython ABI Tag):** CPython 2의 모든 버전 또는 CPython 3.0부터 3.2까지의 버전을 위해 빌드된 wheel은 해당 Unicode ABI를 나타내는 CPython ABI 태그를 포함해야 합니다. 따라서 Python 2를 대상으로 빌드된 `manylinux2010` wheel은 UCS-4 ABI를 가진 인터프리터를 대상으로 빌드되었음을 나타내는 `cpy27mu` 태그 또는 UCS-2 ABI를 나타내는 `cpy27m` 태그를 포함해야 합니다 (PEP 3149,).

5.  **`PyFPE_jbuf` 심볼:** wheel은 `PyFPE_jbuf` 심볼을 요구해서는 안 됩니다. 이는 `--with-fpectl` configure 플래그 없이 컴파일된 Python을 대상으로 빌드함으로써 달성됩니다.

## 호환 Wheel 컴파일 (Compilation of Compliant Wheels)

`manylinux1`과 마찬가지로, `auditwheel` 도구는 `manylinux2010` Docker 컨테이너에서 `pip wheel` 또는 `bdist_wheel`로 빌드된 Linux wheel에 `manylinux2010` 플랫폼 태그를 추가합니다.

### Docker 이미지 (Docker Image)

CentOS 6를 기반으로 하는 두 가지 `manylinux2010` Docker 이미지가 `manylinux2010` wheel로 안정적으로 변환될 수 있는 바이너리 Linux wheel을 빌드하기 위해 제공됩니다. x86_64 및 i686 이미지에는 새로운 컴파일러 스위트 (devtoolset-8의 `gcc`, `g++`, `gfortran`)와 최신 Python 및 pip 릴리스가 설치되어 있습니다.

### vsyscall이 없는 커널과의 호환성 (Compatibility with kernels that lack vsyscall)

Docker 컨테이너는 사용자랜드 (userland)가 호스트 커널과 호환된다고 가정합니다. 불행히도, 점차 흔해지는 커널 구성은 x86_64 CentOS 6 Docker 이미지의 이 가정을 깨뜨립니다.

`glibc` 버전 2.14 이하는 x86_64에서 `vsyscall`로 알려진 구식 시스템 호출 최적화를 커널이 제공하도록 요구합니다. 이 최적화를 위해 커널은 자주 호출되는 시스템 호출 (가장 주목할 만한 것은 `time(2)`)의 읽기 전용 페이지를 고정된 메모리 위치에 각 프로세스에 매핑합니다. `glibc`는 `vsyscall` 페이지 내의 적절한 오프셋으로 함수 포인터를 역참조하고 이를 호출함으로써 이러한 시스템 호출을 호출합니다. 이는 일반적인 시스템 호출 호출과 관련된 커널 호출 오버헤드를 피합니다. `vsyscall`은 커널이 최적화된 시스템 호출을 포함하는 재배치 가능한 가상 공유 객체인 `vDSO` (virtual dynamic shared object)를 대신 각 프로세스에 매핑하는 동등한 메커니즘을 선호하여 오랫동안 사용 중단되었습니다.

`vsyscall` 페이지는 주소 공간 배치 무작위화 (ASLR, Address Space Layout Randomization)에 참여하지 않으므로 심각한 보안 문제를 내포합니다. 예측 가능한 위치와 내용은 반환 지향형 프로그래밍 (ROP, return-oriented programming) 공격에 사용되는 가젯 (gadgets)의 유용한 소스가 됩니다. 동시에, `vsyscall`에 의존하는 `glibc` 버전이 존재하지 않는 페이지로 시스템 호출 포인터를 역참조하려고 할 때 세그먼트 오류 (segmentation faults)가 발생하므로, `vsyscall`의 제거는 x86_64 ABI를 깨뜨립니다. 타협책으로 Linux 3.1은 실행 가능한 코드, 즉 ROP 가젯 재료를 줄인 "에뮬레이트된" `vsyscall`을 구현했습니다. `vsyscall=emulated`는 수년 동안 대부분의 배포판 커널에서 기본 구성이었습니다.

불행히도 `vsyscall` 에뮬레이션은 여전히 예측 가능한 코드를 신뢰할 수 있는 메모리 위치에 노출하며, 반환 지향형 프로그래밍에 계속 유용합니다. 대부분의 배포판이 이제 `vsyscall`에 의존하지 않는 `glibc` 버전으로 업그레이드되었기 때문에, `vsyscall`을 전혀 지원하지 않는 커널을 배포하기 시작했습니다.

CentOS 5.11과 6은 모두 `vsyscall` 페이지에 의존하는 `glibc` 버전 (각각 2.5 및 2.12.2)을 포함하므로, 이들을 기반으로 하는 컨테이너는 많은 배포판의 향후 릴리스와 함께 제공되는 커널에서 실행될 수 없습니다. 예를 들어, Travis CI가 `vsyscall` 인터페이스를 제공하지 않는 커널에서 작업을 실행하기 시작하면, Python 패키지 작성자는 `manylinux` wheels를 빌드하기 위해 Docker 이미지를 사용할 수 없게 됩니다.

우리는 `glibc` git 저장소에서 `vsyscall`에 대한 모든 의존성을 `manylinux2010` 이미지에 포함된 `glibc` 버전으로 백포트 (backport)하는 패치를 도출했습니다. `glibc`를 재빌드하고, 따라서 `manylinux2010` 이미지 자체를 빌드하려면 여전히 `vsyscall` 메커니즘을 제공하는 호스트 커널이 필요하지만, 결과 이미지는 이를 제공하는 호스트와 그렇지 않은 호스트 모두에서 실행될 수 있습니다. `vsyscall` 인터페이스는 실행 중인 프로세스에만 적용되는 최적화이므로, 이 수정된 이미지로 빌드된 `manylinux2010` wheels는 수정되지 않은 CentOS 6 시스템에서 빌드된 것과 동일해야 합니다. 또한 `vsyscall` 문제는 x86_64에만 적용되며, i686 ABI의 일부가 아닙니다.

## Auditwheel

`auditwheel` 도구는 `manylinux2010` wheels를 생성하도록 업데이트되었습니다. 그 동작과 목적은 PEP 513 이후로 변경되지 않았습니다.

## 설치 프로그램의 플랫폼 감지 (Platform Detection for Installers)

플랫폼은 PEP 513에 설명된 `_manylinux` 모듈에 `manylinux2010_compatible` 부울 (boolean) 속성을 정의할 수 있습니다. 해당 속성이 `False`인 경우 플랫폼은 `manylinux2010`과 호환되지 않는 것으로 간주됩니다.

`_manylinux` 모듈을 찾을 수 없거나 `manylinux2010_compatible` 속성이 없는 경우, 도구는 `glibc` 검사로 대체될 수 있습니다. 플랫폼에 `glibc` 2.12 이상이 있는 경우, `_manylinux` 모듈이 다른 내용을 명시하지 않는 한 호환되는 것으로 가정합니다.

특히, 우리가 제안하는 알고리즘은 다음과 같습니다.

```python
def is_manylinux2010_compatible():
    # Only Linux, and only x86-64 / i686
    from distutils.util import get_platform
    if get_platform() not in ["linux-x86_64", "linux-i686"]:
        return False

    # Check for presence of _manylinux module
    try:
        import _manylinux
        return bool(_manylinux.manylinux2010_compatible)
    except (ImportError, AttributeError):
        # Fall through to heuristic check below
        pass

    # Check glibc version. CentOS 6 uses glibc 2.12.
    # PEP 513 contains an implementation of this function.
    return have_compatible_glibc(2, 12)
```

## manylinux1 wheels와의 하위 호환성 (Backwards compatibility with manylinux1 wheels)

PEP 513에서 설명했듯이, `manylinux1` 화이트리스트 라이브러리에 대해 지정된 심볼 버전은 상한선을 구성합니다. 동일한 원칙이 이 PEP에서 `manylinux2010`에 대해 정의된 심볼 버전에도 적용됩니다. 결과적으로 `manylinux1` wheels는 `manylinux2010` wheels로 간주됩니다. 따라서 `manylinux2010` 플랫폼 태그를 인식하는 `pip`는 `manylinux2010` wheels를 사용할 수 없을 때 (명시적으로 설정된 경우에도) `manylinux2010` 플랫폼용으로 `manylinux1` wheels를 설치할 것입니다.

## PyPI 지원 (PyPI Support)

PyPI는 `manylinux1`을 허용하는 것과 동일한 방식으로 `manylinux2010` 플랫폼 태그를 포함하는 wheels의 업로드를 허용해야 합니다. `manylinux2010` wheels의 호환성을 확인하려고 시도해서는 안 됩니다.

## PEP 571 변경 요약 (Summary of changes to PEP 571)

승인 후 받은 피드백을 바탕으로 이 PEP에 다음 변경 사항이 적용되었습니다.

*   `libgcc_s`의 최대 버전 심볼이 GCC_4.3.0에서 GCC_4.5.0으로 업데이트되어 32비트 CentOS 6 문제를 해결했습니다. 이는 x86_64의 `libgcc_s`가 GCC_4.3.0에서 GCC_4.5.0으로 추가 심볼을 가지고 있지 않으므로 x86_64에는 영향을 미치지 않습니다.

## 참조 (References)

 pyca/cryptography (https://cryptography.io/)
 numpy (https://numpy.org)
 CentOS 5.11 EOL announcement (https://lists.centos.org/pipermail/centos-announce/2017-April/022350.html)
 CentOS Product Specifications (https://web.archive.org/web/20180108090257/https://wiki.centos.org/About/Product)
 ncurses 5 -> 6 transition means we probably need to drop some libraries from the manylinux whitelist (https://github.com/pypa/manylinux/issues/94)
 SOABI support for Python 2.X and PyPy https://github.com/pypa/pip/pull/3075
 manylinux2010 Docker image (https://quay.io/repository/pypa/manylinux2010_x86_64)
 On vsyscalls and the vDSO (https://lwn.net/Articles/446528/)
 vdso(7) (http://man7.org/linux/man-pages/man7/vdso.7.html)
 Framing Signals – A Return to Portable Shellcode (http://www.cs.vu.nl/~herbertb/papers/srop_sp14.pdf)
 ChangeLog-3.1 (https://www.kernel.org/pub/linux/kernel/v3.x/ChangeLog-3.1)
 Project Zero: Three bypasses and a fix for one of Flash's Vector.<*> mitigations (https://googleprojectzero.blogspot.com/2015/08/three-bypasses-and-fix-for-one-of.html)
 linux: activate CONFIG_LEGACY_VSYSCALL_NONE ? (https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=852620)
 [Wheel-builders] Heads-up re: new kernel configurations breaking the manylinux docker image (https://mail.python.org/pipermail/wheel-builders/2016-December/000239.html)
 Travis CI (https://travis-ci.org/)
 remove-vsyscall.patch https://github.com/markrwilliams/manylinux/commit/e9493d55471d153089df3aafca8cfbcb50fa8093#diff-3eda4130bdba562657f3ec7c1b3f5720
 auditwheel manylinux2 branch (https://github.com/markrwilliams/auditwheel/tree/manylinux2)
 pip manylinux2 branch https://github.com/markrwilliams/pip/commits/manylinux2
 Calendar Versioning http://calver.org/

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인 (public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.