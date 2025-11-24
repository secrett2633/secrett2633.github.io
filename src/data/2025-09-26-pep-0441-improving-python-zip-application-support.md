---
title: "[Final] PEP 441 - Improving Python ZIP Application Support"
excerpt: "Python Enhancement Proposal 441: 'Improving Python ZIP Application Support'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/441/
toc: true
toc_sticky: true
date: 2025-09-26 21:54:04+0900
last_modified_at: 2025-09-26 21:54:04+0900
published: true
---
> **원문 링크:** [PEP 441 - Improving Python ZIP Application Support](https://peps.python.org/pep-0441/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 30-Mar-2013


## PEP 441 – Python ZIP 애플리케이션 지원 개선

이 문서는 Python 3.5 버전에서 도입된 [PEP 441](https://peps.python.org/pep-0441/)의 주요 내용을 한국어 사용자들이 이해하기 쉽게 번역하고 설명합니다. 이 PEP는 Python ZIP 애플리케이션의 지원을 개선하고, 이를 더 널리 알리며, 관련된 도구를 제공하는 것을 목표로 합니다.

### 개요

Python은 2.6 버전부터 디렉터리나 ZIP 형식 아카이브를 스크립트처럼 실행할 수 있는 기능을 제공해왔습니다. 이 기능은 여러 모듈로 구성된 복잡한 소프트웨어를 단일 파일 스크립트 형태로 배포할 수 있는 좋은 방법이지만, 그동안 잘 알려지지 않았고 Windows 설치 프로그램에서 파일 확장자가 등록되지 않아 널리 사용되지 못했습니다.

PEP 441은 이러한 문제를 해결하기 위해 이 기능을 다시 홍보하고, `.pyz` 및 `.pyzw` 확장자를 "Python ZIP Application" 및 "Windowed Python ZIP Application"으로 정의하며, 이 형식을 관리할 수 있는 간단한 도구를 제공할 것을 제안합니다.

### 새로운 Python ZIP 애플리케이션 확장자

"Python ZIP Application"이라는 용어는 Python 코드를 포함하고 Python에 의해 직접 실행될 수 있는 ZIP 형식 아카이브를 공식적으로 지칭합니다 (특히, 아카이브의 루트 디렉터리에 `__main__.py` 파일이 있어야 합니다). 이러한 파일에는 `.pyz` 확장자가 공식적으로 연결됩니다.

Python 3.5 설치 프로그램은 `.pyz` 및 `.pyzw` "Python ZIP Application"을 플랫폼 런처와 연결하여 실행할 수 있도록 합니다. `.pyz` 아카이브는 콘솔 애플리케이션이며, `.pyzw` 아카이브는 윈도우 애플리케이션으로, 애플리케이션 실행 시 콘솔 창이 나타날지 여부를 나타냅니다.

Python ZIP 애플리케이션은 올바른 Python 인터프리터를 가리키는 `#!` (shebang) 라인과 선택적 설명을 접두사로 가질 수 있습니다.
```python
#!/usr/bin/env python3
# Python application packed with zipapp module
```
Unix에서는 이를 통해 운영 체제가 표준 "shebang" 지원을 통해 올바른 인터프리터로 파일을 실행할 수 있으며, Windows에서는 Python 런처가 shebang 지원을 구현합니다. 그러나 `.pyz` 애플리케이션은 항상 파일 이름을 Python 인터프리터에 직접 전달하여 실행할 수도 있습니다.

ZIP 아카이브는 파일 끝에서부터의 상대 오프셋을 포함하는 푸터(footer)로 정의됩니다. 이들은 다른 파일 끝에 연결되어도 유효하며, 이는 자체 추출 ZIP 아카이브나 `bdist_wininst` 설치 프로그램 형식에서 작동하는 방식입니다.

### 최소한의 도구: `zipapp` 모듈

이 PEP는 이러한 아카이브 작업을 위한 `zipapp` 모듈을 포함할 것을 제안합니다. 이 모듈은 Python ZIP 애플리케이션 아카이브 작업을 위한 함수와, `python -m zipapp`를 통한 명령줄 인터페이스를 제공하여 아카이브 생성 및 조작을 가능하게 합니다.

#### 모듈 인터페이스

`zipapp` 모듈은 다음 함수들을 제공합니다:

*   `create_archive(source, target=None, interpreter=None, main=None)`
    *   `source`로부터 애플리케이션 아카이브를 생성합니다. `source`는 디렉터리 이름, 기존 아카이브 파일 이름 또는 바이트 모드로 열린 파일 객체가 될 수 있습니다.
    *   `target`은 결과 아카이브가 작성될 위치를 지정합니다.
    *   `interpreter`는 아카이브가 실행될 Python 인터프리터의 이름을 지정하며, shebang 라인으로 작성됩니다.
    *   `main`은 아카이브의 주 프로그램으로 사용될 호출 가능 객체의 이름을 지정합니다 (예: "pkg.module:callable").

*   `get_interpreter(archive)`
    *   아카이브의 shebang 라인에 지정된 인터프리터를 반환합니다. shebang이 없으면 `None`을 반환합니다.

#### 명령줄 사용법

`zipapp` 모듈은 `python -m zipapp` 명령으로 실행할 수 있습니다.

**디렉터리로부터 아카이브 생성:**
```bash
python -m zipapp directory [options]
```
옵션:
*   `-o archive`, `--output archive`: 대상 아카이브 파일 이름을 지정합니다 (예: `myapp.pyz`).
*   `-p interpreter`, `--python interpreter`: shebang 라인에 기록될 인터프리터를 지정합니다 (예: `/usr/bin/env python3`).
*   `-m pkg.mod:fn`, `--main pkg.mod:fn`: `__main__.py` 파일이 없는 경우, `pkg.mod`에서 `fn`을 호출하는 `__main__.py` 파일을 아카이브에 작성합니다.

**기존 아카이브 작업:**
```bash
python -m zipapp app.pyz --show
```
*   `--show`: 아카이브의 shebang 라인을 표시합니다 (진단 용도).

```bash
python -m zipapp app.pyz -o newapp.pyz [-p interpreter]
```
*   기존 `app.pyz`를 `newapp.pyz`로 복사하고, `-p` 옵션에 따라 shebang 라인을 수정합니다. 기존 아카이브를 제자리에서 수정하는 것은 지원되지 않습니다.

아카이브는 표준 ZIP 파일이므로, 어떤 표준 ZIP 유틸리티나 Python의 `zipfile` 모듈로도 압축을 해제할 수 있습니다.

### FAQ (자주 묻는 질문)

*   **표준 ZIP 유틸리티가 `#!`를 처리할 수 있습니까?** 네, ZIP 파일 사양은 ZIP 파일 앞에 임의의 데이터를 추가할 수 있도록 허용합니다.
*   **`zipapp`은 `zipfile` 모듈의 얇은 래퍼입니까?** 네, `zipapp` 모듈은 편의를 위한 것이며, 다른 도구로 Python ZIP 애플리케이션 아카이브를 빌드할 수도 있습니다.
*   **왜 `.zip` 또는 `.py` 확장자를 사용하지 않습니까?** 사용자는 `.zip` 파일을 아카이브 도구로 열고 `.py` 파일이 읽을 수 있는 텍스트를 포함할 것으로 예상하므로, 이 사용 사례에는 혼란을 줄 수 있습니다.
*   **기존 패키지 형식과의 경쟁은 어떻습니까?** `sdist`, `bdist`, `wheel` 형식은 기존 Python 설치에 모듈을 설치하기 위한 것이지만, 실행 가능한 ZIP 형식은 설치 없이 독립 실행형으로 사용하기 위해 특별히 설계되었습니다. 사실상 멀티 파일 버전의 독립 실행형 Python 스크립트입니다.

### 기각된 제안

*   **Shebang 라인을 위한 편의 값:** `"-p 3"`과 같은 약어를 사용하여 일반적인 인터프리터 값을 지정하는 방안이 논의되었으나, 약어 해석의 모호함과 잠재적인 문제로 인해 기각되었습니다.
*   **.pyz를 미디어 타입으로 등록:** `.pyz` 확장자를 Unix 미디어 타입 데이터베이스에 등록하는 것이 제안되었으나, `.py` 확장자도 등록되어 있지 않아 이 PEP에서는 제외되었습니다.
*   **기본 인터프리터:** 초기 초안에서는 `/usr/bin/env python`을 기본 인터프리터로 제안했지만, Python 2와 Python 3 사이의 혼란 때문에 "모호할 때는 추측을 거부한다"는 원칙에 따라 명시적으로 요청하지 않는 한 shebang 라인을 포함하지 않기로 결정했습니다.
*   **Shebang 라인 관리를 위한 명령줄 도구:** 기존 아카이브의 shebang 라인을 수정하거나 표시하는 명령줄 도구의 필요성이 논의되었지만, 인터페이스의 복잡성과 사용 빈도가 낮을 것으로 예상되어 `zipapp` 모듈에 직접 포함되지는 않았습니다.

### 참조 구현

참조 구현은 [http://bugs.python.org/issue23491](http://bugs.python.org/issue23491)에서 확인할 수 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.