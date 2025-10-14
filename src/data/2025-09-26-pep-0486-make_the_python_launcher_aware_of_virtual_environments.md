---
title: "[Final] PEP 486 - Make the Python Launcher aware of virtual environments"
excerpt: "Python Enhancement Proposal 486: 'Make the Python Launcher aware of virtual environments'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/486/
toc: true
toc_sticky: true
date: 2025-09-26 22:33:02+0900
last_modified_at: 2025-09-26 22:33:02+0900
published: true
---
> **원문 링크:** [PEP 486 - Make the Python Launcher aware of virtual environments](https://peps.python.org/pep-0486/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 12-Feb-2015

- **작성자:** Paul Moore
- **상태:** 최종 (Final)
- **타입:** 표준 트랙 (Standards Track)
- **생성일:** 2015년 2월 12일
- **Python 버전:** 3.5

---

### 요약 (Abstract)

Python Windows 설치 프로그램에는 올바른 Python 인터프리터를 찾아 실행하는 런처(PEP 397 참조)가 포함되어 있습니다. 하지만 이 런처는 가상 환경(`virtualenv` 또는 PEP 405 기반)을 인식하지 못하여, 활성화된 가상 환경 내에서 명령어를 실행하는 데 사용될 수 없었습니다.

이 PEP는 런처를 "가상 환경 인식" 가능하도록 만들 것을 제안합니다. 이는 명시적인 Python 인터프리터를 지정하지 않고 런처를 실행할 때, 구성된 기본 Python으로 폴백(fallback)하기 전에 현재 활성화된 가상 환경이 있다면 해당 가상 환경을 사용한다는 의미입니다.

### 배경 (Rationale)

여러 Python 사본을 설치한 Windows 사용자들은 어떤 Python을 사용할지 선택할 방법이 필요합니다. Python 런처는 `py` 명령어를 통해 이러한 기능을 제공하며, 명령줄 인수를 사용하여 구성된 "기본" Python 또는 특정 인터프리터를 실행할 수 있습니다. 일반적인 사용법은 다음과 같습니다:

```python
# Python 대화형 인터프리터 실행
py
# 설치된 모듈 실행
py -m pip install pytest
py -m pytest
```

가상 환경을 사용할 때, `py` 런처는 가상 환경이 활성화되어 있다는 것을 인식하지 못하고 계속해서 시스템 Python을 사용합니다. 따라서 가상 환경에서 동일한 명령어를 실행하려면 다른 호출 방식을 사용해야 했습니다:

```python
# Python 대화형 인터프리터 실행
python
# 설치된 모듈 실행 (이것들은 python -m을 사용할 수 있으며,
# 입력하기는 더 길지만 런처 접근 방식과 조금 더 유사합니다)
pip install pytest
py.test
```

다른 명령어를 사용해야 하는 것은 오류를 유발하기 쉬웠으며, 많은 경우 오류를 즉시 발견하기 어려웠습니다. 이 PEP는 `py` 명령어가 가상 환경과 함께 사용될 수 있도록 하여, 모든 경우에 첫 번째 형태의 명령어를 사용할 수 있도록 제안합니다.

### 구현 (Implementation)

`virtualenv`와 코어 `venv` 모듈 모두 가상 환경을 활성화할 때 `VIRTUAL_ENV` 환경 변수를 설정합니다. 이 PEP는 런처가 시스템의 "기본" Python 인터프리터를 실행할 때마다 (`py -2.7`과 같은 특정 버전 플래그가 사용되지 않을 때) `VIRTUAL_ENV` 환경 변수를 확인하고, 변수가 존재하면 기본 시스템 Python 대신 가상 환경의 Python 인터프리터를 실행할 것을 제안합니다.

위에서 언급된 "기본" Python 인터프리터는 (PEP 397에 따라) 시스템에 설치된 최신 Python 버전이거나 `py.ini` 구성 파일을 통해 구성된 버전입니다. 사용자가 명령줄에서 명시적인 Python 버전을 지정하면, 현재와 마찬가지로 항상 해당 버전이 사용됩니다.

### 스크립트 실행에 미치는 영향 (Impact on Script Launching)

런처는 대화형 사용 외에도 Python 스크립트의 Windows 파일 연결(file association)로 사용됩니다. 이 경우, 스크립트 시작 부분의 "쉬뱅(shebang)"(`#!`) 라인이 실행할 인터프리터를 식별하는 데 사용됩니다. 완전한 경로를 사용하거나, 버전별 Python (`python3` 또는 `python2`, 심지어 `python3.5`), 또는 기본 인터프리터를 의미하는 일반적인 `python`을 사용할 수 있습니다.

런처는 또한 특정 쉬뱅 라인 `#!/usr/bin/env python`을 찾습니다. Unix에서 `env` 프로그램은 `$PATH`에서 명령어를 검색하여 해당 명령어를 실행합니다. 마찬가지로, 이 쉬뱅 라인과 함께 런처는 사용자의 현재 `%PATH%`에서 `python.exe` 사본을 찾아 해당 사본을 실행할 것입니다.

가상 환경을 활성화하면 `PATH`에 추가되므로, 활성화된 가상 환경으로 스크립트를 실행하는 데 특별한 처리가 필요하지 않습니다. 스크립트는 Unix와 동일하게 `#!/usr/bin/env python` 쉬뱅 라인을 사용하기만 하면 됩니다. (활성화된 가상 환경이 없고 `PATH`에 `python.exe`가 없는 경우, 런처는 쉬뱅 라인이 `#!python`이라고 명시된 것처럼 기본 Python을 찾을 것입니다.)

### 제외 사항 (Exclusions)

이 PEP는 Windows에서 Python을 실행하기 위한 런처 사용을 장려하려는 시도를 하지 않습니다. 대부분의 기존 문서는 Python을 실행하는 명령으로 `python`을, 설치된 Python 명령을 실행하는 명령으로 (`pip`와 같이) `pip`를 사용하는 것을 전제로 합니다. 이 문서는 변경될 것으로 예상되지 않으며, `PATH` 환경 변수를 직접 관리하는 사용자들은 이 형태를 계속 사용할 수 있습니다. 이 PEP의 초점은 오로지 시스템 Python 설치를 다룰 때 런처를 사용하는 것을 선호하는 사용자들이 가상 환경을 사용할 때도 계속 그렇게 할 수 있도록 하는 것입니다.

### 참고 구현 (Reference Implementation)

제안된 동작을 구현하는 패치는 [http://bugs.python.org/issue23465](http://bugs.python.org/issue23465)에서 확인할 수 있습니다.

### 참고 자료 (References)

 [https://virtualenv.pypa.io/](https://virtualenv.pypa.io/)

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.