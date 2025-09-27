---
title: "[Final] PEP 405 - Python Virtual Environments"
excerpt: "Python Enhancement Proposal 405: 'Python Virtual Environments'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/405/
toc: true
toc_sticky: true
date: 2025-09-26 21:28:37+0900
last_modified_at: 2025-09-26 21:28:37+0900
published: true
---
> **원문 링크:** [PEP 405 - Python Virtual Environments](https://peps.python.org/pep-0405/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 13-Jun-2011

## PEP 405 – Python 가상 환경

이 문서는 Python 3.3에 도입된 내장 가상 환경(`venv`) 메커니즘을 설명하는 PEP 405에 대한 한국어 번역 및 요약입니다. 이 PEP는 기존 서드파티 가상 환경 도구의 한계를 극복하고, Python 자체에 경량의 가상 환경 기능을 통합하여 개발자들이 의존성 관리 및 프로젝트 격리를 보다 쉽고 안정적으로 수행할 수 있도록 돕는 것을 목표로 합니다.

### 개요 (Abstract)

이 PEP는 자체 `site-packages` 디렉토리를 가지며, 시스템 `site-packages` 디렉토리와 선택적으로 격리될 수 있는 경량 "가상 환경(virtual environments)" 메커니즘을 Python에 추가할 것을 제안합니다. 각 가상 환경은 자체 Python 바이너리(다양한 Python 버전으로 환경 생성을 허용)를 가지며, `site-packages` 디렉토리에 자체적으로 설치된 독립적인 Python 패키지 세트를 가질 수 있지만, 기본 설치된 Python과 표준 라이브러리를 공유합니다.

### 동기 (Motivation)

Python 가상 환경의 유용성은 Ian Bicking의 `virtualenv`를 비롯한 기존 서드파티 가상 환경 도구의 인기를 통해 이미 잘 확립되었습니다. 가상 환경은 의존성 관리 및 격리, 시스템 관리자 권한 없이 Python 패키지를 쉽게 설치하고 사용하는 용이성, 여러 Python 버전에서 Python 소프트웨어의 자동화된 테스트 등 다양한 용도로 널리 사용되고 있습니다.

그러나 기존 가상 환경 도구는 Python 자체의 동작 지원 부족으로 어려움을 겪었습니다. 예를 들어, `rvirtualenv`와 같이 Python 바이너리를 가상 환경으로 복사하지 않는 도구는 시스템 `site-packages` 디렉토리로부터 신뢰할 수 있는 격리를 제공할 수 없었습니다. `virtualenv`와 같이 Python 바이너리를 복사하는 도구는 Python의 `site` 모듈의 많은 부분을 복제하고, 끊임없이 변경되는 표준 라이브러리 모듈 세트를 시작할 때마다 수동으로 심볼릭 링크/복사해야 하는 부담이 있었습니다.

`PYTHONHOME` 환경 변수는 Python의 유일한 기존 내장 가상 환경 솔루션이었지만, 전체 표준 라이브러리를 모든 환경에 복사/심볼릭 링크해야 하는 단점이 있었습니다. 이는 경량 솔루션이 아니며, 심볼릭 링크에 대한 크로스 플랫폼 지원은 여전히 일관성이 없었습니다.

Python에 통합되고 기존 서드파티 도구의 수년간 경험을 바탕으로 한 가상 환경 메커니즘은 유지보수 비용을 낮추고, 안정성을 높이며, 모든 Python 사용자가 더 쉽게 사용할 수 있게 할 것입니다.

### 사양 (Specification)

Python 바이너리가 실행될 때, `sys.prefix`에 저장될 접두사(prefix)를 결정하려고 시도합니다. 이 접두사는 표준 라이브러리 및 기타 주요 파일을 찾는 데 사용되며, `site` 모듈에 의해 `site-packages` 디렉토리의 위치를 결정하는 데 사용됩니다.

이 PEP는 이 검색에 새로운 첫 단계를 추가할 것을 제안합니다. Python 실행 파일과 인접하거나 한 디렉토리 위에 `pyvenv.cfg` 파일이 발견되면, 이 파일은 `key = value` 형식의 줄을 스캔합니다. `home` 키가 발견되면, 이는 Python 바이너리가 가상 환경에 속함을 의미하며, `home` 키의 값은 이 가상 환경을 생성하는 데 사용된 Python 실행 파일을 포함하는 디렉토리입니다.

이 경우, `home` 키의 값을 유효한 Python 바이너리 위치로 사용하여 기본 설치의 접두사를 찾는 방식으로 `prefix` 찾기가 정상적으로 진행됩니다. `sys.base_prefix`는 이 값으로 설정되고, `sys.prefix`는 `pyvenv.cfg` 파일을 포함하는 디렉토리로 설정됩니다. (`pyvenv.cfg` 파일이 없거나 `home` 키를 포함하지 않으면 `prefix` 찾기는 정상적으로 진행되며, `sys.prefix`는 `sys.base_prefix`와 동일하게 됩니다.)

또한, `sys.base_exec_prefix`가 추가되고 `sys.exec_prefix`와 유사하게 처리됩니다. (`sys.exec_prefix`는 `sys.prefix`와 동일하지만 플랫폼 특정 파일용입니다. 기본적으로 `sys.prefix`와 동일한 값을 가집니다.)

`site` 및 `sysconfig` 표준 라이브러리 모듈은 표준 라이브러리 및 헤더 파일이 `sys.base_prefix`/`sys.base_exec_prefix`를 기준으로 찾아지도록 수정됩니다. 반면 `site-packages` 디렉토리(`sysconfig` 용어로 "purelib" 및 "platlib")는 여전히 `sys.prefix`/`sys.exec_prefix`를 기준으로 찾아집니다.

따라서 가장 간단한 형태의 Python 가상 환경은 Python 바이너리의 복사본 또는 심볼릭 링크와 `pyvenv.cfg` 파일, 그리고 `site-packages` 디렉토리만으로 구성됩니다.

#### 시스템 `site-packages`로부터의 격리 (Isolation from system site-packages)

기본적으로 가상 환경은 시스템 수준 `site-packages` 디렉토리로부터 완전히 격리됩니다.

`pyvenv.cfg` 파일에 `include-system-site-packages` 키가 `true`(대소문자 구분 없음) 값으로 포함되어 있으면, `site` 모듈은 가상 환경 `site-packages` 디렉토리 이후에 시스템 `site` 디렉토리도 `sys.path`에 추가합니다. 따라서 시스템에 설치된 패키지를 여전히 가져올 수 있지만, 가상 환경에 설치된 동일한 이름의 패키지가 우선권을 가집니다.

PEP 370 사용자 수준 `site-packages`는 `venv` 목적상 시스템 `site-packages`의 일부로 간주됩니다. 이는 격리된 `venv`에서는 사용할 수 없지만, `include-system-site-packages = true` `venv`에서는 사용할 수 있습니다.

#### 가상 환경 생성 (Creating virtual environments)

이 PEP는 가상 환경 생성을 구현하는 새로운 `venv` 모듈을 표준 라이브러리에 추가할 것을 제안합니다. 이 모듈은 `-m` 플래그를 사용하여 실행할 수 있습니다.

```bash
python3 -m venv /path/to/new/virtual/environment
```

더 편리하게 사용하기 위해 `pyvenv` 설치 스크립트도 제공됩니다.

```bash
pyvenv /path/to/new/virtual/environment
```

이 명령을 실행하면 대상 디렉토리가 생성되고(`pyvenv.cfg`) 파일이 배치되며, `home` 키는 명령이 실행된 Python 설치를 가리킵니다. 또한 `bin/` (Windows에서는 `Scripts`) 하위 디렉토리를 생성하여 `python3` 실행 파일의 복사본(또는 심볼릭 링크)과 패키징 표준 라이브러리 모듈의 `pysetup3` 스크립트(PyPI에서 새 `venv`로 패키지를 쉽게 설치할 수 있도록)를 포함합니다. 그리고 (초기에는 비어 있는) `lib/pythonX.Y/site-packages` (Windows에서는 `Lib\site-packages`) 하위 디렉토리를 생성합니다.

대상 디렉토리가 이미 존재하는 경우 오류가 발생하지만, `--clear` 옵션을 제공하면 대상 디렉토리가 삭제되고 가상 환경 생성이 정상적으로 진행됩니다.

생성된 `pyvenv.cfg` 파일에는 `include-system-site-packages` 키도 포함되며, `pyvenv`가 `--system-site-packages` 옵션으로 실행되면 `true`로, 기본적으로 `false`로 설정됩니다.

여러 경로를 `pyvenv`에 제공할 수 있으며, 이 경우 주어진 옵션에 따라 각 제공된 경로에 동일한 `venv`가 생성됩니다.

`venv` 모듈은 POSIX 및 Windows 시스템용 "셸 활성화 스크립트"도 `venv`의 `bin` 또는 `Scripts` 디렉토리에 배치합니다. 이 스크립트는 단순히 가상 환경의 `bin` (또는 `Scripts`) 디렉토리를 사용자 셸 `PATH`의 맨 앞에 추가합니다. 이는 가상 환경을 사용하는 데 엄격하게 필요하지는 않지만(`venv`의 `python` 바이너리 또는 스크립트에 대한 명시적 경로를 사용할 수도 있기 때문에), 편리합니다.

가상 환경에 서드파티 패키지가 설치되면 Python 모듈은 `site-packages` 디렉토리에, 실행 파일은 `bin/` 또는 `Scripts`에 배치됩니다.

#### Sysconfig 설치 스키마 및 사용자 사이트 (Sysconfig install schemes and user-site)

이 접근 방식은 `venv`를 위한 새로운 `sysconfig` 설치 스키마를 도입하지 않기로 명시적으로 선택합니다. 대신 `sys.prefix`를 수정하여 `sys.prefix`에 기반한 기존 설치 스키마가 `venv`에서 단순히 작동하도록 합니다. `sys.prefix`와 관련 없는 경로를 가진 다른 설치 스키마(예: 사용자 사이트 스키마)로의 설치는 `venv`에 전혀 영향을 받지 않습니다.

#### 복사본 대 심볼릭 링크 (Copies versus symlinks)

이 PEP의 기술은 복사되거나 심볼릭 링크된 Python 바이너리(및 Windows에서 필요한 기타 DLL)와 일반적으로 동일하게 작동합니다. 가능한 경우 심볼릭 링크가 더 좋지만, 기본 Python 설치가 업그레이드되는 경우 `venv`에 복사된 Python 실행 파일이 설치된 표준 라이브러리와 동기화되지 않아 수동 업그레이드가 필요할 수 있습니다.

심볼릭 링크에는 몇 가지 크로스 플랫폼 어려움이 있습니다. 모든 Windows 버전이 심볼릭 링크를 지원하지는 않으며, 지원하는 버전에서도 심볼릭 링크를 생성하려면 종종 관리자 권한이 필요합니다. OS X 프레임워크 빌드의 Python에서 `sys.executable`은 실제 Python 바이너리를 실행하는 스텁에 불과합니다. 이 스텁을 심볼릭 링크하는 것은 작동하지 않으며, 복사해야 합니다.

따라서 이 PEP는 Windows 및 OS X 프레임워크 빌드를 제외한 모든 플랫폼에서 바이너리를 심볼릭 링크할 것을 제안합니다. `--symlink` 옵션은 적절한 권한이 있는 경우 심볼릭 링크를 지원하는 Windows 버전에서 심볼릭 링크 사용을 강제하는 데 사용할 수 있습니다.

Windows에서 `--symlink`를 사용하지 않으면, 기본 Python 설치가 업그레이드될 때 `venv`의 Python 바이너리 및 DLL을 업데이트해야 합니다. 그렇지 않으면 업그레이드된 표준 라이브러리와의 불일치 문제가 발생할 수 있습니다. `pyvenv` 스크립트는 기존 `venv`에 대한 이러한 업그레이드를 쉽게 수행하기 위한 `--upgrade` 옵션을 허용합니다.

#### 인클루드 파일 (Include files)

현재 `virtualenv`는 인클루드 파일을 다음과 같이 처리합니다.
*   POSIX 시스템에서 설치된 Python의 인클루드 파일이 `${base_prefix}/include/pythonX.X`에 있는 경우, `virtualenv`는 `${venv}/include/`를 생성하고 `${base_prefix}/include/pythonX.X`를 `${venv}/include/pythonX.X`에 심볼릭 링크합니다.
*   Windows에서 Python의 인클루드 파일이 {% raw %}`{{ sys.prefix }}`{% endraw %}/Include에 있고 심볼릭 링크를 안정적으로 사용할 수 없는 경우, `virtualenv`는 {% raw %}`{{ sys.prefix }}`{% endraw %}/Include를 `${venv}/Include`로 복사합니다.

이 PEP는 이와는 약간 다른 접근 방식을 제안합니다. 인클루드 파일을 `venv`에 심볼릭 링크하거나 복사하는 대신, 헤더 파일이 `prefix` 대신 `base_prefix`를 기준으로 항상 찾아지도록 `sysconfig` 스키마를 수정합니다. (또한 `venv` 내에 `include/` 디렉토리를 생성하여 설치 프로그램이 환경 내에 설치된 인클루드 파일을 배치할 수 있도록 합니다.)

#### API (API)

위에서 설명한 상위 수준 메서드는 서드파티 가상 환경 생성자가 필요에 따라 환경 생성을 사용자 정의할 수 있는 메커니즘을 제공하는 간단한 API를 사용합니다.

`venv` 모듈에는 인스턴스화 시 다음 키워드 인수를 허용하는 `EnvBuilder` 클래스가 포함되어 있습니다.

*   `system_site_packages`: 시스템 Python `site-packages`를 환경에서 사용할 수 있는지 여부를 나타내는 부울 값입니다. 기본값은 `False`입니다.
*   `clear`: `true`인 경우 예외를 발생시키는 대신 기존 대상 디렉토리를 삭제하는 부울 값입니다. 기본값은 `False`입니다.
*   `symlinks`: Python 바이너리(및 필요한 DLL 또는 기타 바이너리, 예: `pythonw.exe`)를 복사하는 대신 심볼릭 링크를 시도할지 여부를 나타내는 부울 값입니다. 기본값은 `False`입니다.

인스턴스화된 `env-builder`에는 `create` 메서드가 있으며, 이는 가상 환경을 포함할 대상 디렉토리의 경로(절대 경로 또는 현재 디렉토리에 대한 상대 경로)를 필수 인수로 받습니다. `create` 메서드는 지정된 디렉토리에 환경을 생성하거나 적절한 예외를 발생시킵니다.

`venv` 모듈은 편의를 위해 모듈 수준 `create` 함수도 제공합니다.

```python
def create(env_dir, system_site_packages=False, clear=False, use_symlinks=False):
    builder = EnvBuilder(
        system_site_packages=system_site_packages,
        clear=clear,
        use_symlinks=use_symlinks)
    builder.create(env_dir)
```

서드파티 가상 환경 도구 개발자는 제공된 `EnvBuilder` 클래스를 기본 클래스로 자유롭게 사용할 수 있습니다. `EnvBuilder` 클래스의 `create` 메서드는 사용자 정의에 사용할 수 있는 훅을 보여줍니다.

```python
def create(self, env_dir):
    """
    Create a virtualized Python environment in a directory.
    :param env_dir: The target directory to create an environment in.
    """
    env_dir = os.path.abspath(env_dir)
    context = self.create_directories(env_dir)
    self.create_configuration(context)
    self.setup_python(context)
    self.post_setup(context)
```

`create_directories`, `create_configuration`, `setup_python`, `post_setup` 각 메서드는 오버라이드할 수 있습니다.

### 하위 호환성 (Backwards Compatibility)

#### `sys.prefix` 의미 분리 (Splitting the meanings of sys.prefix)

이러한 방식의 가상 환경 도구는 현재 `sys.prefix`에 모두 포함되어 있는 두 가지 의미를 분리할 것을 제안합니다. 즉, "표준 라이브러리는 어디에 있습니까?"와 "서드파티 모듈을 설치해야 하는 `site-packages` 위치는 어디입니까?"라는 질문에 대한 답입니다.

이 PEP는 `sys.prefix`가 가상 환경(여기서 `site-packages`가 발견됨)을 가리키고, `sys.base_prefix`는 표준 라이브러리 및 Python 헤더 파일을 가리키도록 하여 `sys.prefix`의 문서화된 정의를 수정하는 것을 선호합니다.

이 선택에 대한 근거는 다음과 같습니다.
*   가상 환경의 더 큰 격리 측면에서 오류를 범하는 것이 좋습니다.
*   `virtualenv`는 이미 `sys.prefix`를 가상 환경을 가리키도록 수정했으며, 실제로는 문제가 되지 않았습니다.
*   `setuptools`/`distribute`에는 수정이 필요하지 않습니다.

#### 다른 Python 구현에 미치는 영향 (Impact on other Python implementations)

이 PEP의 변경 사항 대부분은 다른 Python 구현과 공유되는 표준 라이브러리에서 발생하며 문제가 되지 않을 것입니다.

다른 Python 구현은 `pyvenv.cfg` 파일이 있는 경우 이를 찾고 구문 분석하는 것을 포함하여 인터프리터 부트스트랩의 새로운 `sys.prefix` 검색 동작을 복제해야 합니다.

### 참조 구현 (Reference Implementation)

참조 구현은 CPython Mercurial 저장소의 클론에서 찾을 수 있습니다. 테스트하려면 `bin/pyvenv /path/to/new/venv`를 빌드하고 실행하여 가상 환경을 생성합니다.

### 저작권 (Copyright)

이 문서는 공개 도메인에 배치되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.