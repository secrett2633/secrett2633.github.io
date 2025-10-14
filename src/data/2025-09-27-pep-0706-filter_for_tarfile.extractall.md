---
title: "[Final] PEP 706 - Filter for tarfile.extractall"
excerpt: "Python Enhancement Proposal 706: 'Filter for tarfile.extractall'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/706/
toc: true
toc_sticky: true
date: 2025-09-27 13:09:29+0900
last_modified_at: 2025-09-27 13:09:29+0900
published: true
---
> **원문 링크:** [PEP 706 - Filter for tarfile.extractall](https://peps.python.org/pep-0706/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 09-Feb-2023


**PEP 706 - Filter for tarfile.extractall**

**Abstract:**
- `tarfile` 모듈의 압축 해제 메서드에 `filter` 인자가 추가됩니다.
- 이 `filter` 인자는 아카이브를 추출할 때 파일을 거부하거나 메타데이터를 수정할 수 있게 합니다.
- 놀라움이나 위험을 초래할 수 있는 기능을 제한하는 것을 목표로 하는 세 가지 내장 명명 필터가 제공됩니다.
- 이는 그대로 사용하거나 사용자 정의 필터의 기반으로 사용할 수 있습니다.
- 경고 기간 이후에는 더 엄격(그러나 안전한) 필터가 기본값이 됩니다.

**Motivation:**
- `tar` 형식은 다양한 사용 사례에 사용되지만, 각기 다른 요구사항을 가집니다.
- 예를 들어, UNIX 워크스테이션의 백업은 파일 권한, 심볼릭 링크 등 모든 세부 정보를 보존해야 합니다.
- 반면, 데이터 번들을 압축 해제할 때는 의도치 않은 결과(예: 암호 파일을 공개 위치로 심볼릭 링크)가 발생하지 않는 것이 중요합니다.
- `tarfile.TarFile.extractall()`은 문서에서 "신뢰할 수 없는 소스의 아카이브는 사전 검사 없이 절대 압축 해제하지 마라"고 경고하지만, 어떤 종류의 검사가 필요한지 명확하지 않습니다.
- 많은 사용자들이 검사를 소홀히 하거나 잘못 수행하여 `CVE-2007-4559`와 같은 보안 문제로 이어집니다.
- `tarfile`이 처음 작성된 이래로 문서의 경고만으로는 충분하지 않다는 인식이 확산되었습니다.
- 잠재적으로 위험한 작업은 명시적으로 요청되어야 하며, 위험하게 보여야 합니다. 그러나 `TarFile.extractall`은 코드 검토 시 악의적으로 보이지 않습니다.
- `shutil.unpack_archive()`를 통해 `tarfile` 추출이 노출되며, 이 API는 사용자가 아카이브 종류에 신경 쓰지 않고 추출하도록 유도하지만, 문서에서는 다시 한번 경고합니다.
- Python이 문서화된 대로 동작하지만, 이는 본질을 벗어난 논쟁이며, Python과 문서 자체에서 개선이 필요합니다.

**Rationale (근거):**
- 기본값을 변경해야 하며, 이는 하위 호환성을 깨트릴 수 있습니다.
- `TarFile.extractall`의 기본 동작을 변경해야 합니다.
- 사용 사례에 따라 여러 가지 일반적인 "정책"을 추가하여 추출을 제어합니다.
    - `Current behavior (현재 동작)`: 아카이브를 신뢰합니다. (예: 스스로 검사를 수행하는 라이브러리 또는 직접 생성한 아카이브 추출)
    - `Unpacking a UNIX archive (UNIX 아카이브 압축 해제)`: GNU tar의 기본 동작을 따릅니다. (예: 파일명에서 선행 `/` 제거)
    - `Unpacking a general data archive (일반 데이터 아카이브 압축 해제)`: `shutil.unpack_archive()` 사용 사례로, tar 또는 Unix 유사 파일 시스템에 특정한 세부 정보 보존이 중요하지 않은 경우입니다.
- 경고 기간 이후에는 가장 제한적이지만 가장 안전한 마지막 옵션(`data` 필터)이 기본값이 됩니다.
- 사용자는 여전히 아카이브를 검증하고 메타데이터를 수정해야 합니다.
- 기존 방식(`getmembers` 호출 후 `TarInfo` 수정 후 `extractall`에 전달)의 문제점:
    - `TarInfo` 객체 수정이 후속 작업에 영향을 미칠 수 있습니다.
    - `getmembers`는 비용이 많이 들고 seekable 아카이브가 필요합니다.
    - 심볼릭 링크 설정 등 파일 시스템 변경 사항을 미리 추적하기 어렵습니다.
- 해결책:
    - `TarInfo` 객체를 "복제"하고 수정하는 지원되는 방법 제공: `dataclasses.replace()`와 유사한 `replace()` 메서드.
    - `extractall` 루프에 "필터" 훅(hook)을 제공하여 처리 전에 멤버를 수정하거나 폐기할 수 있도록 합니다.
    - 이 훅은 각 멤버를 추출하기 직전에 호출되어 현재 디스크 상태를 스캔할 수 있도록 합니다.
- 훅 API는 `TarFile.add`의 기존 `filter` 인자와 매우 유사하며, 이름도 `filter`로 사용합니다.
- 내장 정책/필터는 공개 `filter` API를 사용하여 구현되어 빌딩 블록 또는 예시로 활용될 수 있습니다.

**Specification (사양):**

**Modifying and forgetting member metadata (멤버 메타데이터 수정 및 삭제):**
- `TarInfo` 클래스에 새 메서드 `replace()` 추가.
- `name`, `mtime`, `mode`, `linkname`, `uid`, `gid`, `uname`, `gname` 속성을 키워드 전용 인자로 교체.
- `name` 및 `linkname`을 제외한 모든 속성은 `None`으로 설정 가능.
- `extract` 또는 `extractall`이 `None`을 만나면 해당 메타데이터를 설정하지 않습니다.
- 문서에 `replace()` 메서드가 필요한 이유(`TarInfo` 객체가 "라이브"하기 때문) 명시.

**Filters (필터):**
- `TarFile.extract` 및 `TarFile.extractall` 메서드에 `filter` 키워드 전용 매개변수 추가.
- `filter`는 호출 가능한 객체이며, `filter(/, member: TarInfo, path: str) -> TarInfo|None` 시그니처를 가집니다.
- `member`는 추출될 멤버, `path`는 아카이브가 추출되는 경로.
- 추출될 때 각 멤버에 대해 호출되며, 결과로 추출이 진행됩니다. `None`을 반환하면 멤버는 건너뛰어집니다.
- 예외를 발생시킬 수 있으며, `TarFile.errorlevel`에 따라 추출이 중단되거나 멤버가 건너뛰어집니다.
- **내장 필터:**
    - `'fully_trusted'`: 현재 동작과 동일, 메타데이터를 그대로 존중. 아카이브를 완전히 신뢰하거나 자체 복잡한 검증을 구현하는 경우 사용.
    - `'tar'`: GNU tar 명령의 기본값(`일반 사용자`로 실행될 때)을 대략적으로 따름.
        - 파일명에서 선행 `/` 및 `os.sep` 제거.
        - 절대 경로를 가진 파일 추출 거부.
        - 심볼릭 링크를 따라간 후 절대 경로가 대상 외부로 이어지는 파일 추출 거부.
        - 높은 모드 비트(`setuid`, `setgid`, `sticky`) 및 그룹/다른 사용자 쓰기 비트(`S_IWGRP|S_IWOTH`) 제거.
    - `'data'`: "데이터" 아카이브 추출. 일반적인 공격 벡터를 허용하지 않지만 기능을 제한. UNIX 스타일 파일 시스템(또는 `tar` 형식)에 특정한 많은 기능이 무시되어 크로스 플랫폼 아카이브에 적합. `tar` 필터 외에 다음을 수행:
        - 절대 경로로 연결되는 링크(하드 또는 소프트) 추출 거부.
        - 대상 외부로 연결되는 링크(하드 또는 소프트) 추출 거부.
        - 장치 파일(파이프 포함) 추출 거부.
        - 일반 파일 및 하드 링크의 경우:
            - 소유자 읽기 및 쓰기 권한 설정(`S_IRUSR|S_IWUSR`).
            - 소유자가 실행 권한이 없으면 그룹 및 다른 사용자 실행 권한(`S_IXGRP|S_IXOTH`) 제거.
        - 다른 파일(디렉토리)의 경우 모드를 완전히 무시(`None`으로 설정).
        - 사용자 및 그룹 정보 무시(`uid`, `gid`, `uname`, `gname`을 `None`으로 설정).
- 다른 문자열은 `ValueError`를 발생시킵니다.
- 해당 필터 함수는 `tarfile.fully_trusted_filter()`, `tarfile.tar_filter()` 등으로 사용 가능.
- 이 필터들은 `None`을 반환하지 않습니다. (멤버 건너뛰기는 사용자 정의 필터의 기능)

**Defaults and their configuration (기본값 및 구성):**
- `TarFile`에 새 속성 `extraction_filter` 추가. 기본 필터를 구성하는 데 사용. 기본값은 `None`.
- `filter` 인자가 없거나 `None`인 경우 사용될 호출 가능한 객체를 설정할 수 있습니다.
- 문자열 이름은 허용되지 않습니다.
- 인자와 속성 모두 `None`인 경우:
    - Python 3.12-3.13에서는 `DeprecationWarning`이 발생하고 `'fully_trusted'` 필터 사용.
    - Python 3.14+에서는 `'data'` 필터 사용.
- 애플리케이션 및 시스템 통합자는 `TarFile` 클래스의 `extraction_filter`를 변경하여 전역 기본값을 설정할 수 있습니다.
- `TarFile`의 서브클래스도 `extraction_filter`를 오버라이드할 수 있습니다.

**FilterError:**
- `tarfile` 모듈에 새 예외 `FilterError` 추가. 거부 이유별로 여러 서브클래스를 가집니다.
- `FilterError`의 `member` 속성에는 관련 `TarInfo`가 포함됩니다.
- 필터가 파일 추출을 거부하면 `FilterError`가 발생합니다. `TarFile.errorlevel`이 1 이상이면 추출이 중단됩니다. `errorlevel=0`이면 오류가 기록되고 멤버는 무시되지만 추출은 계속됩니다.
- `FilterError`는 `fatal error`로 간주됩니다. 즉, `errorlevel=0`에서만 무시됩니다.

**Hints for further verification (추가 검증을 위한 힌트):**
- 제안된 변경 사항에도 불구하고 `tarfile`은 사전 검사 없이 신뢰할 수 없는 파일을 추출하는 데 적합하지 않습니다.
- 사용자는 추가 검사를 수행해야 합니다. 문서에 다음 팁이 추가될 것입니다:
    - 새롭고 비어있는 디렉토리에 추출.
    - 디스크, 메모리, CPU 사용량에 대한 외부(OS 수준) 제한 사용.
    - 파일 이름을 허용 문자 목록과 대조하여 확인 (제어 문자, 혼동 문자 등 필터링).
    - 파일 이름이 예상 확장자를 가졌는지 확인 (클릭 시 실행되는 파일 방지).
    - 추출 파일 수, 추출된 데이터 총 크기, 개별 파일 크기 제한.
    - 대소문자 구분 없는 파일 시스템에서 가려질 수 있는 파일 확인.
- `tar` 파일은 일반적으로 동일 파일의 여러 버전을 포함하며, 나중 버전이 이전 버전을 덮어씁니다.
- `tarfile`은 "라이브" 데이터 문제로부터 보호하지 않습니다.

**Backwards Compatibility (하위 호환성):**
- `TarFile.extract` 및 `TarFile.extractall`의 기본 동작이 변경됩니다. 2회 릴리스(`DeprecationWarning` 발생 기간) 이후 변경됩니다.
- `tarfile.TarInfo` 객체 ID에 의존하는 코드가 손상될 수 있습니다.

**Security Implications (보안 영향):**
- 이 제안은 하위 호환성을 희생하여 보안을 개선합니다. 특히 `CVE-2007-4559`를 피하는 데 도움이 됩니다.

**How to Teach This (교육 방법):**
- API, 사용법 노트 및 추가 검증을 위한 팁이 문서에 추가될 것입니다.

**Rejected Ideas (거부된 아이디어):**
- `SafeTarFile` 클래스: 이름이 오해의 소지가 있고, 안전하지 않은 기본값 문제를 해결하지 못함.
- `absolute_path` 옵션 추가: `CVE-2007-4559`를 해결하는 최소한의 변경이지만, 인지하지 못하는 사용자를 보호하거나 부지런한 사용자를 지원하기에 부족.
- `'tar'` 필터의 다른 이름: `'unix'`, `'posix'` 등. `'tar'`가 가장 적합하다고 판단.

**Possible Further Work (향후 작업 가능성):**
- `zipfile` 및 `shutil.unpack_archive()`에 필터 추가.

---

I will now structure this into the requested Markdown format, following all guidelines.PEP 706은 `tarfile` 모듈의 압축 해제 시 보안을 강화하고 유연성을 높이기 위해 `extractall` 및 `extract` 메서드에 `filter` 인자를 추가하는 제안입니다. 이 제안은 Python 3.12에서 `Final` 상태로 채택되었으며, Python 3.14부터는 더 엄격하지만 안전한 `data` 필터가 기본값으로 적용될 예정입니다.

## 요약 (Abstract)

`tarfile` 모듈의 압축 해제 메서드(`extract` 및 `extractall`)에 새로운 `filter` 인자가 추가됩니다. 이 인자를 사용하면 아카이브를 추출하는 동안 파일 추출을 거부하거나 메타데이터를 수정할 수 있습니다. 예기치 않거나 위험할 수 있는 기능을 제한하기 위한 세 가지 내장 필터가 제공되며, 이 필터들은 그대로 사용하거나 사용자 정의 필터의 기반으로 활용될 수 있습니다. 경고 기간(`DeprecationWarning` 발생)을 거친 후, `filter` 인자가 지정되지 않은 경우 `fully_trusted` 필터 대신 더 안전한 `data` 필터가 기본값으로 적용됩니다.

## 도입 배경 (Motivation)

`tar` 형식은 백업, 데이터 번들 배포 등 다양한 용도로 사용되지만, 각 사용 사례는 파일 권한이나 심볼릭 링크 처리와 같은 메타데이터 보존에 대해 다른 요구사항을 가집니다. `tarfile.TarFile.extractall()`은 문서에서 "신뢰할 수 없는 소스의 아카이브는 사전 검사 없이 절대 압축 해제하지 말라"고 경고하지만, 실제로는 어떤 종류의 검사가 필요한지 불분명하여 많은 사용자가 검사를 소홀히 하거나 잘못 수행하고 있습니다. 이로 인해 `CVE-2007-4559`와 같은 보안 취약점이 발생했습니다.

`tarfile`이 처음 작성된 이후, 문서 경고만으로는 부족하며 잠재적으로 위험한 작업은 명시적으로 요청되어야 한다는 인식이 확산되었습니다. 현재 `TarFile.extractall`은 코드 검토 시 위험해 보이지 않으며, `shutil.unpack_archive()` 또한 경고에도 불구하고 사용자가 아카이브를 사전 검사 없이 쉽게 추출하도록 유도합니다. 이 PEP는 Python의 동작 자체를 비난하기보다는, 이러한 상황을 개선하여 사용자에게 더 안전한 기본값을 제공하고, 보안 검사를 수행할 수 있는 명확한 방법을 제시하는 것을 목표로 합니다.

## 제안 내용 및 변경 사항 (Specification)

### 멤버 메타데이터 수정 및 삭제 (Modifying and forgetting member metadata)

`TarInfo` 클래스에 새로운 `replace()` 메서드가 추가됩니다. 이 메서드는 `dataclasses.replace()`와 유사하게 작동하며, 키워드 전용 인자를 통해 `TarInfo` 객체의 특정 속성(`name`, `mtime`, `mode`, `linkname`, `uid`, `gid`, `uname`, `gname`)을 교체한 새로운 복사본을 반환합니다. `name` 및 `linkname`을 제외한 모든 속성은 `None`으로 설정될 수 있으며, `extract` 또는 `extractall`이 `None`을 만나면 해당 메타데이터를 설정하지 않습니다.

### 필터 (Filters)

`TarFile.extract` 및 `TarFile.extractall` 메서드에 `filter`라는 키워드 전용 매개변수가 추가됩니다. 이 `filter`는 `filter(/, member: TarInfo, path: str) -> TarInfo|None` 시그니처를 가진 호출 가능한 객체여야 합니다.

*   **동작 방식:** 필터는 각 멤버가 추출될 때 호출되며, 그 결과에 따라 추출이 진행됩니다. `None`을 반환하면 해당 멤버는 건너뛰어집니다. 필터는 예외를 발생시킬 수도 있으며, 이 경우 `TarFile.errorlevel` 설정에 따라 추출이 중단되거나 해당 멤버만 건너뛰어집니다.

**내장 필터 (Built-in Filters):**
세 가지 명명된 필터가 제공됩니다.
*   `'fully_trusted'`: 현재 `tarfile`의 기본 동작과 동일하게 메타데이터를 있는 그대로 존중합니다. 아카이브를 완전히 신뢰하거나 자체적인 복잡한 검증 로직을 구현하는 경우에 사용됩니다.
*   `'tar'`: GNU tar 명령(일반 사용자로 실행될 때)의 기본값을 대략적으로 따릅니다. 파일명에서 선행 `/` 및 `os.sep`를 제거하고, 절대 경로 파일이나 대상 외부로 이어지는 심볼릭 링크 파일 추출을 거부하며, 높은 모드 비트(setuid, setgid, sticky) 및 그룹/다른 사용자 쓰기 권한을 제거합니다.
*   `'data'`: "데이터" 아카이브 추출에 적합하며, 일반적인 공격 벡터를 차단하지만 기능을 제한합니다. `tar` 필터 기능 외에 절대 경로로 연결되는 링크, 대상 외부로 연결되는 링크, 장치 파일(파이프 포함) 추출을 거부합니다. 또한, 일반 파일 및 하드 링크의 권한을 제한하고, 사용자 및 그룹 정보를 무시합니다. 이는 크로스 플랫폼 아카이브에 적합합니다.

이 필터 함수들은 `tarfile.fully_trusted_filter()`, `tarfile.tar_filter()`, `tarfile.data_filter()`와 같이 직접 호출하여 사용자 정의 정책에 활용할 수 있습니다.

### 기본값 및 구성 (Defaults and their configuration)

`TarFile` 클래스에 새로운 `extraction_filter` 속성이 추가되어 기본 필터를 구성할 수 있습니다. 이 속성은 기본적으로 `None`이지만, 사용자가 호출 가능한 객체로 설정하여 `filter` 인자가 없거나 `None`일 때 사용될 기본 필터를 지정할 수 있습니다.

*   **기본 필터 변경:** `filter` 인자도 `extraction_filter` 속성도 `None`인 경우:
    *   Python 3.12-3.13에서는 `DeprecationWarning`이 발생하고 `'fully_trusted'` 필터가 사용됩니다.
    *   Python 3.14부터는 더 안전한 `'data'` 필터가 사용됩니다.

### `FilterError` 예외

`tarfile` 모듈에 새로운 예외 `FilterError`가 추가됩니다. 이 예외는 필터가 파일 추출을 거부할 때 발생하며, 거부 이유별로 여러 서브클래스를 가집니다. `FilterError`는 `fatal error`로 간주되며, `TarFile.errorlevel=0`이 아닌 경우 추출을 중단시킵니다.

### 추가 검증을 위한 힌트 (Hints for further verification)

제안된 변경 사항에도 불구하고 `tarfile`은 DoS(서비스 거부) 공격과 같은 모든 유형의 공격을 막지 못하므로, 사용자는 여전히 추가적인 검사를 수행해야 합니다. 문서에는 다음과 같은 팁이 추가될 예정입니다.

*   새롭고 비어있는 디렉토리에 추출.
*   디스크, 메모리, CPU 사용량에 대한 외부(OS 수준) 제한 사용.
*   파일명에 허용된 문자만 있는지 확인.
*   파일명이 예상 확장자를 가졌는지 확인.
*   추출 파일 수, 총 데이터 크기, 개별 파일 크기 제한.
*   대소문자 구분 없는 파일 시스템에서 가려질 수 있는 파일 확인.

### `tarfile` CLI 및 `shutil.unpack_archive()` 지원

*   **`tarfile` CLI:** `python -m tarfile` 명령에 `--filter` 옵션이 추가되어 내장 필터 중 하나를 사용할 수 있게 됩니다.
*   **`shutil.unpack_archive()`:** `shutil.unpack_archive()` 함수에 `filter` 인자가 추가됩니다. 이 인자는 내부적으로 `tarfile.extractall`에 전달됩니다. `zipfile`이 필터 기능을 지원하기 전까지는 `zip` 아카이브에 대해 이 인자를 사용하면 실패합니다.

## 하위 호환성 (Backwards Compatibility)

`TarFile.extract` 및 `TarFile.extractall`의 기본 동작이 변경됩니다. Python의 하위 호환성 정책에서 허용하는 가장 짧은 경고 기간(2회 릴리스 동안 `DeprecationWarning` 발생)을 거친 후, 기본 필터가 `'fully_trusted'`에서 `'data'`로 바뀝니다. 또한 `tarfile.TarInfo` 객체 ID에 의존하는 코드는 영향을 받을 수 있습니다.

## 보안 영향 (Security Implications)

이 제안은 하위 호환성을 희생하여 보안을 크게 개선합니다. 특히, `CVE-2007-4559`와 같은 일반적인 `tar` 아카이브 취약점을 방지하는 데 도움이 됩니다.

## 교육 방법 (How to Teach This)

API, 사용법 주의사항 및 추가 검증 팁이 `tarfile` 모듈의 공식 문서에 추가될 것입니다. 이는 일반적인 아카이브 사용에 익숙하지만 UNIX 파일 시스템의 세부 사항이나 관련 보안 문제에 익숙하지 않은 사용자에게 도움이 되도록 구성됩니다.

## 향후 작업 가능성 (Possible Further Work)

이 PEP의 범위는 아니지만, `zipfile` 및 `shutil.unpack_archive()`에도 유사한 필터 기능을 추가하는 것을 고려할 수 있습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.