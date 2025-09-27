---
title: "[Final] PEP 656 - Platform Tag for Linux Distributions Using Musl"
excerpt: "Python Enhancement Proposal 656: 'Platform Tag for Linux Distributions Using Musl'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/656/
toc: true
toc_sticky: true
date: 2025-09-27 09:53:36+0900
last_modified_at: 2025-09-27 09:53:36+0900
published: true
---
> **원문 링크:** [PEP 656 - Platform Tag for Linux Distributions Using Musl](https://peps.python.org/pep-0656/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 17-Mar-2021


# PEP 656 – Musl을 사용하는 Linux 배포판을 위한 플랫폼 태그

## 개요
이 PEP 656은 `musl` 기반의 Linux 배포판에서 Python 바이너리 패키지를 배포하기 위한 새로운 플랫폼 태그 시리즈인 `musllinux`를 제안합니다. 이 태그는 PEP 600에 명시된 "지속적인 manylinux" 플랫폼 태그와 유사하게 작동하지만, `glibc` 대신 `musl`에 의존하는 플랫폼을 대상으로 합니다.

## 도입 배경
컨테이너의 광범위한 사용으로 인해 Alpine Linux [alpine]와 같은 배포판의 인기가 그 어느 때보다 높아지고 있습니다. 이들 중 상당수는 `glibc`와는 다른 `libc` 구현체인 `musl` [musl]을 기반으로 하므로, 기존 `manylinux` 플랫폼 태그를 사용할 수 없습니다. 이로 인해 Python 패키지 프로젝트는 이러한 시스템을 위한 바이너리 배포판을 PyPI에 배포할 수 없었고, 사용자들은 프로젝트 유지보수자에게 빌드 제약 사항을 요구하여 불필요한 부담을 주었습니다.

## 근거
`musl`은 안정적인 ABI를 가지며 하위 호환성을 유지하므로, 이전 버전의 `musl`에 대해 컴파일된 바이너리는 새로운 `musl` 런타임에서도 실행될 것이 보장됩니다. 따라서 `glibc` 버전 기반의 `manylinux` 태그와 유사한 방식을 사용하지만, `glibc` 대신 `musl` 버전을 대상으로 합니다.

새로운 플랫폼 태그의 논리는 대부분 PEP 600("지속적인 manylinux")을 따르며, 이 태그를 사용하는 휠(wheel)이 유사한 약속을 하도록 요구합니다. `musllinux` 플랫폼 태그는 Linux 운영 체제에서 `musl libc`에 동적으로 링크되고 런타임 공유 라이브러리에서 실행되는 Python 인터프리터에만 적용됩니다. 정적으로 링크된 인터프리터나 다른 `libc` 구현체(`glibc` 등)와의 혼합 빌드는 이 문서에서 정의된 플랫폼 태그의 범위에 포함되지 않으며 지원되지 않습니다.

## 사양

### 태그 형식
새로운 스키마를 사용하는 태그는 다음 형식을 따릅니다:

```
musllinux_${MUSLMAJOR}_${MUSLMINOR}_${ARCH}
```

이 태그는 지정된 `musl` 버전(`$MUSLMAJOR.$MUSLMINOR`)을 사용하는 모든 주류 Linux 배포판에서 휠(wheel)이 작동함을 보장합니다. 다른 모든 시스템 수준 종속성 요구 사항은 PEP 600에서 도입된 의도적으로 모호한 "주류(mainstream)"라는 설명에 대한 커뮤니티의 정의에 의존합니다.

### musl 버전 읽기
`musl` 버전 값은 Python 인터프리터가 현재 실행 중인 `musl libc` 공유 라이브러리를 실행하고 출력을 파싱하여 얻을 수 있습니다.

```python
import re
import subprocess

def get_musl_major_minor(so: str) -> tuple[int, int] | None:
    """Detect musl runtime version.
    Returns a two-tuple ``(major, minor)`` that indicates musl library's version,
    or ``None`` if the given libc .so does not output expected information.
    The libc library should output something like this to stderr::

        musl libc (x86_64) Version 1.2.2
        Dynamic Program Loader
    """
    proc = subprocess.run([so], stderr=subprocess.PIPE, text=True)
    lines = (line.strip() for line in proc.stderr.splitlines())
    lines = [line for line in lines if line]
    if len(lines) < 2 or lines[0][:4] != "musl":
        return None
    match = re.match(r"Version (\d+)\.(\d+)", lines[1])
    if match:
        return (int(match.group(1)), int(match.group(2)))
    return None
```
Python 인터프리터가 실행 중인 `musl` 라이브러리 위치를 찾는 두 가지 방법은 `ldd` 명령 [ldd]을 사용하거나 실행 파일의 ELF 헤더에서 `PT_INTERP` 섹션 값을 파싱하는 것입니다 [elf].

### 태그 형식 지정
태그를 사용하는 배포판은 PEP 600에 설명된 것과 유사한 약속을 합니다. 여기에는 다음이 포함됩니다:
*   배포판은 `musl` 버전 `${MUSLMAJOR}.${MUSLMINOR}` 이상을 사용하는 모든 주류 Linux 배포판에서 작동합니다.
*   배포판의 `${ARCH}`는 호스트 시스템의 `sysconfig.get_platform()` 반환 값과 일치하며, PEP 425 및 PEP 427에 따라 마침표(`.`)와 하이픈(`-`) 문자를 밑줄(`_`)로 대체합니다.

예시 값:
*   `musllinux_1_1_x86_64` # x86-64에서 실행되는 musl 1.1.
*   `musllinux_1_2_aarch64` # ARM 64비트에서 실행되는 musl 1.2.

다음 Python 코드로 값을 형식 지정할 수 있습니다:

```python
import sysconfig

def format_musllinux(musl_version: tuple[int, int]) -> str:
    os_name, sep, arch = sysconfig.get_platform().partition("-")
    assert os_name == "linux" and sep, "Not a Linux"
    arch = arch.replace(".", "_").replace("-", "_")
    return f"musllinux_{musl_version[0]}_{musl_version[1]}_{arch}"
```

### 패키지 인덱스 권장 사항
PyPI를 포함한 Python 패키지 저장소는 다음 정규식과 일치하는 플랫폼 태그를 허용하는 것이 좋습니다:

```
musllinux_([0-9]+)_([0-9]+)_([^.-]+)
```

Python 패키지 저장소는 알려진 문제가 있는 휠을 거부하기 위해 추가 요구 사항을 부과할 수 있습니다. 여기에는 다음이 포함되지만 이에 국한되지는 않습니다:
*   `musl 1.2` 이상에서만 사용 가능한 심볼을 포함하는 `musllinux_1_1` 휠.
*   패키지 인덱스의 대상에게 일반적으로 제공되지 않는 외부 라이브러리에 의존하는 휠.
*   존재하지 않는 `musl` 버전(`musllinux_9000_0` 등)과의 호환성을 주장하는 플랫폼 태그.

이러한 정책은 궁극적으로 개별 패키지 저장소에 달려 있습니다.

## 하위 호환성
이 PEP에는 하위 호환성 문제가 없습니다.

## 거부된 아이디어
### Alpine Linux를 위한 특정 플랫폼 태그 생성
`manylinux` 태그 시리즈에 대한 과거 경험은 이 접근 방식이 시간 면에서 너무 많은 비용이 든다는 것을 보여줍니다. 저자는 "다른 것들과 잘 작동하는" 규칙이 더 포괄적이며 실제에서 충분히 잘 작동한다고 생각합니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.