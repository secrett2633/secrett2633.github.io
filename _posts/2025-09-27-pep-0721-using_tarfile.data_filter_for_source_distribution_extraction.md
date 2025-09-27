---
title: "[Final] PEP 721 - Using tarfile.data_filter for source distribution extraction"
excerpt: "Python Enhancement Proposal 721: 'Using tarfile.data_filter for source distribution extraction'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/721/
toc: true
toc_sticky: true
date: 2025-09-27 13:15:15+0900
last_modified_at: 2025-09-27 13:15:15+0900
published: true
---
> **원문 링크:** [PEP 721 - Using tarfile.data_filter for source distribution extraction](https://peps.python.org/pep-0721/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 12-Jul-2023

## PEP 721: 소스 배포 추출을 위한 `tarfile.data_filter` 사용

### 개요 (Abstract)

Python Source Distribution (sdist) 아카이브를 추출할 때, PEP 706에서 도입된 `tarfile.data_filter`의 사용을 명확히 하고, 이 필터를 직접 사용할 수 없는 도구들의 동작 방식을 정의합니다.

### 동기 (Motivation)

`sdist`는 `tar` 아카이브 형식으로 정의됩니다. `tar` 포맷은 Unix와 유사한 파일의 모든 메타데이터를 캡처하도록 설계되었는데, 이 중 일부는 소스 코드에 불필요하거나, 플랫폼에 따라 다르며, 심지어 위험할 수도 있습니다. PEP 706에서 설명했듯이, `tarball`을 추출할 때는 항상 허용되는 기능을 제한하거나, `tarball`에 대한 완전한 제어 권한을 명시적으로 부여해야 합니다.

### 근거 (Rationale)

`sdist`의 경우, PEP 706에서 도입된 `data_filter`만으로도 충분합니다. 이 필터는 `git`과 `zip` (둘 다 패키징 워크플로우에서 흔히 사용됨)보다 약간 더 많은 기능을 허용합니다. 하지만 모든 도구가 `data_filter`를 사용할 수 있는 것은 아니므로, 이 PEP는 명확한 기대치를 명시합니다. 목표는 `pip download` 및 `setuptools.archive_util.unpack_tarfile`의 현재 동작이 유효하도록 하는 것이며, 너무 위험하다고 판단되는 경우는 예외로 합니다.

**Python 패치되지 않은 버전 (Unpatched versions of Python):**
`tarfile` 필터가 없는 Python 버전에서 실행될 경우, 도구는 이 PEP를 무시할 수 있습니다. `data_filter` 기능은 `python.org`에서 지원하는 모든 Python 버전으로 백포트되었지만, 타사 라이브러리에서 이를 벤더링하는 것은 까다롭기 때문에 모든 도구에 강제할 수는 없습니다. 이는 보안 업데이트 유지에 대한 책임을 도구에서 사용자에게로 전환합니다.

**권한 (Permissions):**
일반적인 도구(`git`, `zip`)는 Unix 권한(mode bits)을 보존하지 않습니다. 사용자에게 `sdist`에서 이러한 권한에 의존하지 말라고 알리고, 도구가 이를 비교적 자유롭게 처리하도록 허용하는 것이 합리적입니다. 유일한 예외는 실행 권한(executable permission)이며, 도구가 이를 보존할 것을 권장하지만 필수는 아닙니다. 스크립트가 일반적으로 플랫폼에 따라 다르다는 점을 감안할 때, 실행 가능 여부를 유지하는 것은 도구별 동작이라고 볼 수 있습니다. `git`은 실행 가능성을 보존하지만, `zip`은 기본적으로 이를 수행하지 않습니다.

### 명세 (Specification)

다음 내용은 PyPA(Python Packaging Authority) 소스 배포 포맷 사양에 "Source distribution archive features"라는 새로운 섹션으로 추가될 예정입니다.

`tar` 파일을 있는 그대로 추출하는 것은 위험하며 결과가 플랫폼에 따라 다르므로, 소스 배포의 아카이브 기능은 제한됩니다.

**`data_filter`를 사용하여 압축 해제 (Unpacking with the data filter):**
소스 배포를 추출할 때, 도구는 `tarfile.data_filter` (예: `TarFile.extractall(..., filter='data')`)를 사용하거나, 아래 "Unpacking without the data filter" 섹션을 따라야 합니다. `hasattr(tarfile, 'data_filter')`가 없는 Python 인터프리터에서는 (PEP 706이 없는 버전), 해당 필터를 사용하는 도구는 사용자에게 경고하고 이 명세를 무시할 수 있습니다. 이 경우 사용성(예: 아카이브를 완전히 신뢰)과 보안(예: 압축 해제 거부) 간의 균형은 도구에 달려 있습니다.

**`data_filter` 없이 압축 해제 (Unpacking without the data filter):**
`data_filter`를 직접 사용하지 않는 도구는 (예: 하위 호환성, 추가 기능 허용 또는 Python을 사용하지 않는 경우) 다음 지침을 따라야 합니다.

다음 파일은 `sdist` 아카이브에서 **유효하지 않습니다.** 이러한 항목을 발견하면 도구는 사용자에게 알려야 하고, 항목을 압축 해제하지 **않아야 하며**, 실패로 중단할 수 있습니다.
*   대상 디렉토리 외부에 배치될 파일.
*   대상 디렉토리 외부를 가리키는 링크 (심볼릭 또는 하드).
*   장치 파일 (파이프 포함).

다음도 유효하지 않습니다. 도구는 위와 같이 처리할 수 있지만, 필수는 아닙니다.
*   파일 이름이나 링크 대상에 `..` 구성 요소가 있는 파일.
*   아카이브의 일부가 아닌 파일을 가리키는 링크.

도구는 아카이브의 내용을 사용하여 링크(심볼릭 또는 하드)를 일반 파일로 압축 해제할 수 있습니다.

`sdist` 아카이브를 추출할 때:
*   파일 이름의 선행 슬래시(`leading slashes`)는 반드시 제거되어야 합니다.
*   각 모드(Unix 권한) 비트에 대해 도구는 다음 중 하나를 수행해야 합니다.
    *   새 파일/디렉토리에 대한 플랫폼의 기본값을 사용합니다.
    *   아카이브에 따라 비트를 설정합니다.
    *   실행 불가능한 파일의 경우 `rw-r--r--` (`0o644`), 실행 가능한 파일 및 디렉토리의 경우 `rwxr-xr-x` (`0o755`)에서 비트를 사용합니다.
*   `High mode bits` (`setuid`, `setgid`, `sticky`)는 반드시 지워져야 합니다.
*   사용자 실행 가능 비트(user executable bit)를 보존하는 것을 권장합니다.

### 하위 호환성 (Backwards Compatibility)

기존 동작은 명시되지 않았으며 도구마다 다르게 처리되었습니다. 이 PEP는 기대치를 명확히 합니다. 알려진 하위 호환성 문제는 없지만, 일부 프로젝트는 보장되지 않는 세부 사항에 의존할 수 있습니다. 이 PEP는 가장 위험한 기능을 금지하고 나머지는 도구별로 처리하도록 합니다.

### 보안 영향 (Security Implications)

권장되는 `data_filter`는 일반적인 공격에 대해 안전하다고 여겨지며, 향후 결함이 발견될 경우 수정할 수 있는 단일 지점을 제공합니다. 명시된 사양은 `data_filter`의 보호 기능을 포함합니다.

### 교육 방법 (How to Teach This)

이 PEP는 패키징 도구 작성자를 대상으로 하며, PEP 문서와 업데이트된 패키징 사양으로 충분하다고 판단됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.