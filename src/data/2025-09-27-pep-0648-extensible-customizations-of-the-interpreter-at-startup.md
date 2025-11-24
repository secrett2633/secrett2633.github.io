---
title: "[Rejected] PEP 648 - Extensible customizations of the interpreter at startup"
excerpt: "Python Enhancement Proposal 648: 'Extensible customizations of the interpreter at startup'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/648/
toc: true
toc_sticky: true
date: 2025-09-27 01:37:58+0900
last_modified_at: 2025-09-27 01:37:58+0900
published: true
---
> **원문 링크:** [PEP 648 - Extensible customizations of the interpreter at startup](https://peps.python.org/pep-0648/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 30-Dec-2020


## PEP 648: 인터프리터 시작 시 확장 가능한 사용자 정의

### 요약 (Abstract)
이 PEP는 사용자가 시작 시 실행될 파일을 설치할 수 있도록 하여 인터프리터의 확장 가능한 사용자 정의를 지원하는 방법을 제안합니다.

### PEP 거부 (PEP Rejection)
PEP 648은 사용 사례가 제한적이고 시작(startup) 시퀀스를 더 복잡하게 만든다는 이유로 스티어링 위원회에 의해 거부되었습니다.

### 동기 (Motivation)
시스템 관리자, 인터프리터를 재패키징하는 도구, 그리고 일부 라이브러리는 인터프리터 시작 시 특정 측면을 사용자 정의해야 할 필요가 있습니다.

현재 이러한 사용자 정의는 시스템 관리자의 경우 `sitecustomize.py` 파일을 통해 이루어지며, 라이브러리는 `pth` 파일을 활용합니다. 이 PEP는 동일한 기능을 더 사용자 친화적이고 구조화된 방식으로 달성하기 위한 방법을 제안했습니다.

#### `pth` 파일의 한계
`pth` 파일은 원래 `sys.path`에 추가 디렉터리를 추가하는 용도로 개발되었지만, `import`로 시작하는 코드 라인을 포함할 수 있으며, 이 코드는 `pth` 파일이 평가될 때 `exec()`를 통해 실행됩니다. 사용자들은 이 기능을 악용하여 필요한 사용자 정의를 수행해왔습니다 (예: `setuptools`, `betterexceptions`).

하지만 라이브러리 개발자에게는 다음과 같은 이유로 `pth` 파일을 사용하는 것이 이상적이지 않습니다.
*   코드를 `import`로 시작하는 한 줄에 삽입해야 하므로 가독성이 떨어집니다.
*   인터프리터 사용자 입장에서는 `pth` 파일에 잠재적인 코드 실행이 분산되어 있어 시작 시 무엇이 실행되는지 파악하기 어렵습니다.
*   `pth` 파일에서 코드 실행 기능을 제거하자는 여러 제안이 있었습니다.

#### `sitecustomize.py`의 한계
`sitecustomize.py`는 허용 가능한 솔루션이지만, 시스템 및 인터프리터를 담당하는 한 명의 관리자가 있다고 가정합니다. 만약 시스템 관리자와 인터프리터 프로비저닝 담당자가 모두 사용자 정의를 추가하고 싶다면, 파일 내용을 합의하고 변경 사항을 통합해야 합니다.

이 PEP가 제안하는 변경 사항이 적용되면, 이들은 단일 `sitecustomize.py` 대신 기능별로 고유한 격리된 파일을 가질 수 있어, 인터프리터에서 어떤 수정이 일어나는지 사용자에게 더 명확한 이해를 제공할 수 있습니다.

### 제안의 근거 (Rationale)
이 PEP는 `site-packages` 또는 `user-site-packages` 내의 `__sitecustomize__`라는 이름의 디렉터리에서 발견된 모든 파일을 시작 시 실행함으로써 인터프리터의 확장 가능한 사용자 정의를 지원하도록 제안했습니다.

#### `__sitecustomize__` 명명 이유
이 이름은 기존 `sitecustomize.py` 개념을 따르며, `sys.path` 내에 위치하므로 기존 `sitecustomize.py`와의 충돌을 방지하기 위해 이중 밑줄(`__`)을 사용했습니다.

#### `__sitecustomize__` 디렉터리 발견 시점
`__sitecustomize__` 디렉터리는 `site.addsitedir`의 일부로 `pth` 파일이 발견된 직후에 각 `site-packages` 경로에서 발견됩니다.

#### `__sitecustomize__` 내 파일 실행 순서
각 `__sitecustomize__` 디렉터리를 발견할 때 파일들을 이름으로 정렬하여 실행하지만, 사용자가 실행 순서에 의존하지 않도록 권장합니다.

#### `pth` 파일과의 상호작용
`pth` 파일은 `sys.path`에 경로를 추가하는 데 사용될 수 있지만, `__sitecustomize__`는 `site-packages` 경로에서만 찾아지므로 `__sitecustomize__` 발견 과정에 영향을 주지 않습니다.

#### `__sitecustomize__` 내 파일 실행 방식
`__sitecustomize__` 디렉터리가 발견되면, 그 안에 있는 `.py` 확장자를 가진 모든 파일은 `io.open_code`로 읽히고 `exec` 함수를 사용하여 실행됩니다. 다른 파일 간의 예상치 못한 상호작용을 방지하기 위해 `exec` 함수에는 빈 딕셔너리가 `globals`로 전달됩니다.

#### 오류 처리
파일 실행 중 발생하는 오류는 `verbose` 모드가 아니면 기록되지 않으며, 다른 파일의 평가를 중단시키지 않습니다.

#### 가상 환경(Virtual Environments)과의 상호작용
새로운 `__sitecustomize__` 솔루션을 통해 인터프리터에 적용된 사용자 정의는 가상 환경 생성 시 `sitecustomize.py`와 유사하게 계속 작동합니다. 이는 `include-system-site-packages`가 활성화되지 않는 한 가상 환경으로 전파되지 않는 `pth` 파일과의 차이점입니다.

#### `sitecustomize.py` 및 `usercustomize.py`와의 상호작용
`sitecustomize`와 `usercustomize`는 제거되기 전까지 `pth` 파일과 유사하게 `__sitecustomize__` 이후에 실행됩니다.

#### 파일 명명 규칙
패키지 간의 충돌을 피하기 위해 파일 이름에 패키지 이름을 포함하도록 권장되지만, `.py` 확장자로 끝나는 것만이 유일한 요구 사항입니다.

#### 시작 파일 비활성화
`site` 관련 모든 조작을 비활성화하는 `-S` 플래그를 사용하면 이 새 기능도 비활성화됩니다. 또한, 이 새 기능만 비활성화하기 위한 새로운 `-X disablesitecustomize` 옵션도 추가될 예정이었습니다.

### 시작 시간에 미치는 영향 (Impact on startup time)
이 기능이 Python 인터프리터 시작 시간에 미칠 영향에 대한 벤치마크 결과가 제시되었습니다.
*   두 개의 `__sitecustomize__` 스크립트를 `sitecustomize.py` 및 `usercustomize.py`와 비교했을 때 인터프리터 속도가 0.3% 느려지는 것으로 예상됩니다. 이는 `sitecustomize.py` 및 `usercustomize.py`가 향후 릴리스에서 제거될 때까지 지속될 것으로 보입니다.
*   임의의 50개 `pth` 파일에 포함된 코드를 `__sitecustomize__`로 옮겼을 때 시작 시간이 약 3.5% 빨라지는 결과를 보였습니다. 이는 `pth` 파일 실행에 비해 `__sitecustomize__` 파일 평가 로직이 더 단순하기 때문일 수 있습니다.
*   전반적으로 모든 측정치는 이 추가 기능이 시작 시간에 미치는 영향이 적음을 보여줍니다.

### 감사 이벤트 (Audit Event)
`__sitecustomize__` 실행 시 `sys.audit`을 `sitecustimze.exec_file` 이름과 파일 이름을 인수로 호출하여 새로운 감사 이벤트가 추가될 예정이었습니다.

### 보안 영향 (Security implications)
이 PEP는 `pth` 파일의 모든 코드 실행을 `__sitecustomize__` 디렉터리 내 파일로 옮기는 것을 목표로 합니다. 이는 시스템 관리자에게 다음과 같은 개선 사항을 제공합니다.
*   모든 `pth` 파일을 스캔할 필요 없이 단일 디렉터리를 확인하여 인터프리터 시작 시 실행되는 코드를 빠르게 식별할 수 있습니다.
*   새로운 감사 이벤트를 통해 이 기능의 사용을 추적할 수 있습니다.
*   `__sitecustomize__` 디렉터리에 대한 권한을 미세 조정하여 사용자가 인터프리터 시작을 변경하지 않는 패키지만 설치할 수 있도록 합니다.

요약하자면, 악의적인 사용자가 시작 시 실행될 파일을 배치할 수 있지만, 기존 `pth` 파일에 비하면 개선된 사항입니다.

### 교육 방법 (How to teach this)
인터프리터가 시작 시 `site` 경로에서 `__sitecustomize__` 디렉터리를 찾고, `.py` 확장자를 가진 파일을 발견하면 하나씩 실행할 것이라고 간단하게 설명할 수 있습니다.

시스템 관리자 및 인터프리터 패키징 도구는 `sitecustomize.py`를 배치했던 것처럼 `__sitecustomize__`에 파일을 배치하도록 권장할 수 있습니다.

라이브러리 개발자는 `setuptools`와 같은 도구에 `sitecustomize_files=["scripts/betterexceptions.py"]`와 같은 새 인수를 지정하여 파일을 주입할 수 있어야 합니다.

### 하위 호환성 (Backward compatibility)
이 PEP는 3.11, 3.12, 3.13 버전에서 `sitecustomize.py`, `usercustomize.py`, 그리고 `pth` 코드 실행에 대한 `deprecation warning`을 추가하고, 3.14 버전까지 해당 기능들을 제거할 계획이었습니다.

기존 `sitecustomize.py`는 `site` 경로에 배치되는 시스템 관리자를 대상으로 했지만, 실제로는 인터프리터 시작 시 경로의 어느 곳에나 배치될 수 있었습니다. 새 메커니즘은 `__sitecustomize__` 디렉터리를 `site` 경로에만 허용합니다. 시스템 관리자는 `sitecustomize`를 import하는 사용자 정의 파일을 `__sitecustomize__`에 추가하여 유사한 동작을 복구할 수 있습니다.

### 거부된 아이디어 (Rejected Ideas)
*   **아무것도 하지 않음 (Do nothing):** 현재 상태는 작동하지만, 동기 섹션에 나열된 문제점들을 가지고 있습니다.
*   **`pth` 파일 사용을 공식화 (Formalize using pth files):** `pth` 파일을 사용하여 시작 시 코드를 주입하는 것을 공식화하는 것은 동기 섹션에서 언급된 대로 사용자에게 최적이 아닌 경험을 제공합니다.
*   **`__sitecustomize__`를 네임스페이스 패키지로 만들기 (Making __sitecustomize__ a namespace package):** 디렉터리를 네임스페이스 패키지로 만들고 그 안에 있는 모든 모듈을 import하는 것을 고려했지만, 임의의 파일이 실행되는 경로 목록을 불필요하게 확장하고 추가적인 복잡성을 초래하여 거부되었습니다.
*   **종료 사용자 정의 지원 (Support for shutdown customization):** Python 사용자들은 이미 `atexit`을 통해 종료 시 코드를 추가할 수 있으므로 추가 지원이 필요하지 않다고 판단했습니다.
*   **`entry_points` 사용 (Using entry_points):** `entry points`를 사용하여 시작 시 실행해야 할 파일을 지정하는 방안도 고려되었으나, 시작 시간에 미치는 영향과 패키지 배포 정보를 스캔하는 데 필요한 성능 저하 때문에 거부되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.