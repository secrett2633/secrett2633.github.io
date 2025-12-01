---
title: "[Active] PEP 514 - Python registration in the Windows registry"
excerpt: "Python Enhancement Proposal 514: 'Python registration in the Windows registry'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/514/
toc: true
toc_sticky: true
date: 2025-09-26 23:09:52+0900
last_modified_at: 2025-09-26 23:09:52+0900
published: true
---
> **원문 링크:** [PEP 514 - Python registration in the Windows registry](https://peps.python.org/pep-0514/)
>
> **상태:** Active | **유형:** Informational | **작성일:** 02-Feb-2016

## PEP 514: Windows 레지스트리에 Python 등록 (Python registration in the Windows registry)

### 개요 (Abstract)
이 PEP는 타사 설치 프로그램이 자신들의 Python 설치를 등록하고, 도구 및 애플리케이션이 사용자의 시스템에 있는 모든 Python 환경을 감지하고 올바르게 표시할 수 있도록 Windows 레지스트리 키에 대한 스키마를 정의합니다. 이 PEP는 Python 자체의 구현 변경을 제안하지 않습니다.

Python 환경은 외부 도구에 의해 자동으로 검색되기를 원하지 않는 한 등록될 필요가 없습니다. 이 제안은 Windows에만 관련되므로, 이러한 도구는 주로 GUI 애플리케이션이 될 것으로 예상됩니다. 그러나 콘솔 애플리케이션도 등록된 정보를 활용할 수 있습니다. 이 PEP는 제공될 수 있는 정보를 다루지만, 이 정보의 실제 표현 및 사용은 도구 설계자의 몫입니다.

이 스키마는 적어도 Python 2.5부터 공식 설치 프로그램이 사용해 온 레지스트리 값과 일치하며, 충돌 해결 동작은 공식 Python 릴리스의 동작과 일치합니다. 완전한 정보를 등록하지 않는 CPython 버전을 도구들이 올바르게 감지할 수 있도록 일부 하위 호환성 규칙이 제공됩니다.

### 도입 배경 (Motivation)
Windows에 설치될 때, 공식 Python 설치 프로그램은 다른 애플리케이션의 검색 및 감지를 위해 레지스트리 키를 생성합니다. 이는 설치 프로그램이나 IDE와 같은 도구가 사용자의 Python 설치를 자동으로 감지하고 표시할 수 있도록 합니다. 예를 들어, PEP 397의 `py.exe` 런처와 PyCharm, Visual Studio와 같은 편집기는 이미 이 정보를 활용하고 있습니다.

배포판에서 사용되는 것과 같은 타사 설치 프로그램은 일반적으로 동일한 목적으로 동일한 키를 생성합니다. Python 설치를 감지하기 위해 레지스트리를 사용하는 대부분의 도구는 공식 설치 프로그램이 사용하는 키만 검사합니다. 결과적으로, 검색되기를 원하는 타사 설치는 이러한 값을 덮어쓰게 되어 종종 사용자가 원래 Python 설치를 "잃게" 만듭니다.

타사 설치가 고유하게 자신을 등록할 수 있도록 하는 레지스트리 키 레이아웃을 설명하고, 모든 사용 가능한 Python 설치를 검색하기 위한 도구 개발자 지침을 제공함으로써 이러한 충돌을 방지해야 합니다. 또한 사용자에게 더 많은 정보를 제공할 수 있도록 잘 알려진 메타데이터를 추가할 기회를 가집니다.

### 정의 (Definitions)
*   **레지스트리 키 (registry key)** : 레지스트리 내에서 파일 시스템 경로와 유사합니다. 각 키는 "하위 키(subkeys)"와 "값(values)"을 포함할 수 있습니다.
*   **HKEY_CURRENT_USER** : 현재 로그인한 사용자의 설정 루트입니다.
*   **HKEY_LOCAL_MACHINE** : 모든 사용자의 설정 루트입니다.
*   **HKEY_LOCAL_MACHINE\Software\Wow6432Node** : 64비트 Windows에서 32비트 프로세스가 `Software` 키 대신 투명하게 읽고 쓰는 특수 키입니다.

### 구조 (Structure)
시스템에는 단일 Python 환경 컬렉션이 있으며, 각 환경의 설치 옵션에 따라 세 가지 잠재적인 레지스트리 위치에 저장될 수 있습니다.

*   `HKEY_CURRENT_USER\Software\Python\<Company>\<Tag>`
*   `HKEY_LOCAL_MACHINE\Software\Python\<Company>\<Tag>`
*   `HKEY_LOCAL_MACHINE\Software\Wow6432Node\Python\<Company>\<Tag>`

공식 Python 릴리스는 `Company`로 `PythonCore`를 사용하고, `Tag`에는 `sys.winver` 값을 사용합니다. `Company` `PyLauncher`는 예약되어 있습니다. 다른 등록된 환경은 `Company`와 `Tag`에 어떤 값이라도 사용할 수 있습니다.

`Company-Tag` 쌍은 대소문자를 구분하지 않으며 각 환경을 고유하게 식별합니다. 도구의 목적에 따라 충돌을 해결하기 위한 두 가지 접근 방식이 제안됩니다.

*   모든 설치된 환경을 나열하는 도구는 `Company-Tag` 쌍이 일치하더라도 해당 환경을 포함할 수 있습니다. 이 경우, 사용자에게 등록이 사용자별(per-user)인지 시스템별(per-machine)인지, 그리고 어떤 등록이 더 높은 우선순위를 가지는지 쉽게 식별할 수 있도록 해야 합니다.
*   `py.exe` 런처와 같이 `Company-Tag` 쌍을 기반으로 등록된 모든 환경 중에서 단일 환경을 선택하려는 도구는 `HKEY_LOCAL_MACHINE`의 일치하는 환경보다 `HKEY_CURRENT_USER`에 등록된 환경을 항상 선택해야 합니다.

`HKEY_LOCAL_MACHINE\Software\Python`과 `HKEY_LOCAL_MACHINE\Software\Wow6432Node\Python` 간의 충돌은 인터프리터의 64비트 및 32비트 버전이 동일한 `Tag`를 가질 때만 발생해야 합니다. 이 경우 도구는 사용 목적에 더 적합한 것을 선택해야 합니다.

### 하위 호환성 (Backwards Compatibility)
Python 3.4 및 이전 버전은 `sys.winver`에서 32비트 및 64비트 빌드를 구분하지 않았습니다. 결과적으로, 이 스키마에서는 32비트 및 64비트 인터프리터의 유효한 동시 설치(side-by-side installations)를 가질 수 없습니다.

하위 호환성을 보장하기 위해 애플리케이션은 다음 두 레지스트리 키 아래에 나열된 환경을 `Tag`가 일치하더라도 별개로 처리해야 합니다.

*   `HKEY_LOCAL_MACHINE\Software\Python\PythonCore\<Tag>`
*   `HKEY_LOCAL_MACHINE\Software\Wow6432Node\Python\PythonCore\<Tag>`

`HKEY_CURRENT_USER` 아래에 나열된 환경은 위 두 키와 별개로 처리될 수 있으며, 잠재적으로 동일한 `Tag`를 사용하는 세 가지 환경이 발견될 수 있습니다.

### 회사 태그 (Company Tag)
*   **Company** : 관련 환경을 그룹화하고 `Tag`가 적절하게 이름 공간을 가지도록 합니다. 키 이름은 공백 없는 영숫자여야 하며 고유해야 합니다. (예: 상표명, 호스트 이름, 또는 UUID)
    *   `PyLauncher`는 PEP 397 런처(`py.exe`)를 위해 예약되어 있습니다.
    *   `DisplayName` 문자열 값이 존재하면 사용자에게 환경 제조업체/개발자/배포자를 식별하는 데 사용되어야 합니다. 그렇지 않으면 키 이름이 사용됩니다. (PythonCore의 경우 기본값은 "Python Software Foundation"입니다.)
    *   `SupportUrl` 문자열 값이 존재하면 환경과 관련된 웹 사이트로 사용자를 안내하는 데 사용될 수 있습니다. (PythonCore의 경우 기본값은 "http://www.python.org/"입니다.)
*   **Tag** : 단일 회사에서 제공하는 환경 내에서 환경을 고유하게 식별합니다. 키 이름은 공백 없는 영숫자여야 하며 설치 전반에 걸쳐 안정적이어야 합니다. (예: Python 언어 버전, UUID 또는 부분/전체 해시)
    *   짧고, 사람이 읽기 쉽고, 입력하기 쉬운 `Tag`를 권장하며, 가능하다면 모든 다른 `Company`에 걸쳐 고유할 가능성이 있는 값을 선택해야 합니다.
    *   `DisplayName` 문자열 값이 존재하면 사용자에게 환경을 식별하는 데 사용되어야 합니다. 그렇지 않으면 키 이름이 사용됩니다. (PythonCore의 경우 기본값은 "Python " 뒤에 `Tag`입니다.)
    *   `SupportUrl` 문자열 값이 존재하면 환경과 관련된 웹 사이트로 사용자를 안내하는 데 사용될 수 있습니다. (PythonCore의 경우 기본값은 "http://www.python.org/"입니다.)
    *   `Version` 문자열 값이 존재하면 환경의 버전을 식별하는 데 사용되어야 합니다. 이는 환경이 구현하는 Python 버전과는 독립적입니다. (PythonCore의 경우 기본값은 `Tag`의 처음 세 문자입니다.)
    *   `SysVersion` 문자열 값이 존재하면 인터프리터의 `sys.version_info`가 반환하는 버전과 일치하는 `x.y` 또는 `x.y.z` 형식이어야 합니다. 생략되면 Python 버전은 알 수 없습니다. (PythonCore의 경우 기본값은 `Tag`의 처음 세 문자입니다.)
    *   `SysArchitecture` 문자열 값이 존재하면 `platform.architecture()`가 반환하는 튜플의 첫 번째 요소와 일치해야 합니다. 일반적으로 "32bit" 또는 "64bit"입니다. 생략되면 아키텍처는 알 수 없습니다.

### 설치 경로 (InstallPath)
환경 키 아래에 `InstallPath` 키가 생성되어야 합니다. 이 키는 항상 `InstallPath`로 명명되며, 기본값은 `sys.prefix`와 일치해야 합니다.

*   `ExecutablePath` 문자열 값이 존재하면 `python.exe` (또는 동등한) 실행 파일의 전체 경로여야 합니다. 생략되면 환경은 실행 불가능합니다.
*   `ExecutableArguments` 문자열 값이 존재하면, 도구는 `ExecutablePath`를 실행할 때 이 값을 첫 번째 인수로 사용해야 합니다.
*   `WindowedExecutablePath` 문자열 값이 존재하면 `pythonw.exe` (또는 동등한) 실행 파일의 경로여야 합니다.
*   `WindowedExecutableArguments` 문자열 값이 존재하면, 도구는 `WindowedExecutablePath`를 실행할 때 이 값을 첫 번째 인수로 사용해야 합니다.

### 도움말 (Help)
환경 키 아래에 `Help` 키가 생성될 수 있습니다. 이 키는 존재할 경우 항상 `Help`로 명명되며 기본값은 없습니다.

`Help`의 각 하위 키는 환경과 관련된 문서 파일, 도구 또는 URL을 지정합니다. 하위 키는 어떤 이름이라도 가질 수 있으며, 기본값은 `os.startfile` 또는 동등한 함수에 전달하기에 적절한 문자열입니다.

*   `DisplayName` 문자열 값이 존재하면 사용자에게 도움말 파일을 식별하는 데 사용되어야 합니다. 그렇지 않으면 키 이름이 사용됩니다.

### 기타 키 (Other Keys)
`Company-Tag` 쌍 아래의 다른 모든 하위 키는 개인적인 용도로 사용할 수 있습니다.

공식 CPython 릴리스는 전통적으로 이 공간의 특정 키를 사용하여 Python 표준 라이브러리 및 기타 설치된 모듈의 위치를 결정했습니다. 이 동작은 주로 하위 호환성을 위해 유지됩니다. 그러나 이러한 값을 읽는 코드가 인터프리터에 내장되어 있으므로, 타사 배포판은 수정되지 않은 인터프리터를 사용하는 경우 `PythonCore`에 기록된 값의 영향을 받을 수 있습니다.

### 샘플 코드 (Sample Code)
PEP 0514는 레지스트리를 열거하고 사용 가능한 `Company-Tag` 쌍을 표시하는 Python 샘플 코드를 제공합니다. 이 코드는 가장 선호되는 환경을 찾고, `PythonCore`에 대한 하위 호환성 처리를 포함하며, `HKEY_CURRENT_USER`에 등록된 `PythonCore` 환경에 대한 정보와 기본값을 보여줍니다.

---
**참고:** PEP 514는 Windows 레지스트리에 Python 환경을 등록하는 표준화된 방법을 제공하여 다양한 Python 설치 및 도구가 서로 충돌 없이 공존하고 쉽게 검색될 수 있도록 하는 것을 목표로 합니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.