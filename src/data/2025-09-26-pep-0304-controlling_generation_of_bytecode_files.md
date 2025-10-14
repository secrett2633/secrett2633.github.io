---
title: "[Withdrawn] PEP 304 - Controlling Generation of Bytecode Files"
excerpt: "Python Enhancement Proposal 304: 'Controlling Generation of Bytecode Files'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/304/
toc: true
toc_sticky: true
date: 2025-09-26 18:09:05+0900
last_modified_at: 2025-09-26 18:09:05+0900
published: true
---
> **원문 링크:** [PEP 304 - Controlling Generation of Bytecode Files](https://peps.python.org/pep-0304/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 22-Jan-2003

## PEP 304 – 바이트코드 파일 생성 제어 (Controlling Generation of Bytecode Files)

### 개요
이 PEP는 컴파일된 Python 바이트코드 파일의 생성 및 위치를 제어하는 메커니즘을 제안합니다. 이 아이디어는 초기 패치 요청에서 시작하여 `python-dev` 메일링 리스트에서 논의 스레드로 발전했습니다. `PYTHONBYTECODEBASE`라는 새로운 환경 변수를 도입하여, Python 또는 Python 기반 서드파티 패키지를 설치하는 사용자가 설치 시점에 바이트코드 파일을 생성할지 여부와, 생성한다면 어디에 작성해야 하는지를 제어할 수 있도록 합니다. 또한, 애플리케이션 실행 시점에 바이트코드 파일을 생성할지 여부와, 생성한다면 어디에 작성해야 하는지를 사용자에게 제어할 수 있도록 합니다.

### 역사적 참고 사항
이 원본 PEP는 철회되었지만, 이 기능의 변형은 결국 Python 3.8에서 `https://bugs.python.org/issue33499`를 통해 구현되었습니다.
이 PEP에서 원래 제기되었던 몇 가지 문제와 우려는 지난 몇 년간 다른 변경 사항에 의해 해결되었습니다:
*   잠재적인 보안 문제를 처리하기 위한 `isolated mode` 도입.
*   완전히 import-hook 기반의 임포트 시스템 구현인 `importlib`로의 전환.
*   바이트코드 캐시 레이아웃을 `__pycache__` 하위 디렉토리를 사용하도록 변경한 PEP 3147. 여기에는 인터프리터가 별도의 캐시 디렉토리로의 리디렉션을 자동으로 처리할 수 있도록 하는 `source_to_cache(path)` 및 `cache_to_source(path)` API가 포함됩니다.

### 제안 (Proposal)
Python이 이해하는 환경 변수 목록에 새로운 환경 변수 `PYTHONBYTECODEBASE`를 추가합니다. `PYTHONBYTECODEBASE`는 다음과 같이 해석됩니다:

*   **정의되지 않은 경우:** Python 바이트코드는 현재와 동일한 방식으로 생성됩니다. `sys.bytecodebase`는 루트 디렉토리(Unix 및 Mac OSX에서는 `/`, Windows에서는 일반적으로 `C:\`와 같은 시작 드라이브의 루트 디렉토리)로 설정됩니다.
*   **정의되었고 사용자가 쓰기 권한을 가진 기존 디렉토리를 참조하는 경우:** `sys.bytecodebase`는 해당 디렉토리로 설정되며, 바이트코드 파일은 해당 위치를 루트로 하는 디렉토리 구조 안에 작성됩니다.
*   **정의되었지만 비어 있는 경우:** `sys.bytecodebase`는 `None`으로 설정되고 바이트코드 파일 생성은 전적으로 억제됩니다.
*   **정의되었지만 다음 중 하나에 해당하는 경우:**
    *   디렉토리를 참조하지 않는 경우.
    *   디렉토리를 참조하지만 사용자가 쓰기 권한이 없는 디렉토리인 경우.
    
    경고가 표시되고, `sys.bytecodebase`는 `None`으로 설정되며, 바이트코드 파일 생성은 전적으로 억제됩니다.

시작 초기화 후, 모든 런타임 참조는 `PYTHONBYTECODEBASE` 환경 변수가 아닌 `sys.bytecodebase`를 가리킵니다. `sys.path`는 수정되지 않습니다.

위에서 보듯이 `sys.bytecodebase`는 `None` 또는 시스템의 유효한 디렉토리를 나타내는 문자열의 두 가지 유효한 유형의 값만 가질 수 있습니다.

임포트(import) 중에 이 확장 기능은 다음과 같이 작동합니다:
1.  모듈에 대한 일반적인 검색이 수행됩니다. 검색 순서는 대략 동적으로 로드된 확장 모듈, Python 소스 파일, Python 바이트코드 파일입니다.
2.  이 메커니즘은 Python 소스 파일이 발견될 때만 작동합니다.
3.  소스 모듈을 찾으면, 동일한 디렉토리에서 바이트컴파일된 파일을 읽으려고 시도합니다 (이전과 동일).
4.  바이트컴파일된 파일을 찾지 못하면, `augmented directory`에서 바이트컴파일된 파일을 읽으려고 시도합니다.
5.  바이트코드 생성이 필요한 경우, 생성된 바이트코드는 가능하면 `augmented directory`에 작성됩니다.

이 PEP는 바이트코드 파일의 처리에 대해 모듈별 또는 디렉토리별 제어를 제공하는 것이 아님을 명시적으로 밝힙니다.

#### 용어 (Glossary)
*   **"bytecode base"**: `sys.bytecodebase`의 현재 설정을 의미합니다.
*   **"augmented directory"**: 바이트코드 베이스(bytecode base)와 소스 파일의 디렉토리 이름으로 구성된 디렉토리를 의미합니다.
*   **`PYTHONBYTECODEBASE`**: "bytecode base"와 구별할 필요가 있을 때 환경 변수를 의미합니다.

#### 바이트코드 파일 찾기 (Locating bytecode files)
인터프리터가 모듈을 검색할 때, 평소와 같이 `sys.path`를 사용합니다. 그러나 가능한 바이트코드 파일을 고려할 때, 바이트코드 파일에 대한 추가적인 조사가 이루어질 수 있습니다.
1.  먼저, 소스 파일이 있는 `sys.path`의 디렉토리를 사용하여 바이트코드 파일을 확인합니다 (현재 동작).
2.  거기서 유효한 바이트코드 파일을 찾지 못하고(`sys.bytecodebase`가 존재하지 않거나, 존재하지만 오래된 경우) `sys.bytecodebase`가 `None`이 아닌 경우, `sys.path`의 디렉토리에 바이트코드 베이스를 적절히 접두사로 붙여 두 번째 조사를 수행합니다.

#### 바이트코드 파일 작성 (Writing bytecode files)
`sys.bytecodebase`가 `None`이 아닐 때, 새로운 바이트코드 파일은 `sys.path`의 디렉토리에 직접 작성되지 않고, 해당 `augmented directory`에 작성됩니다.

#### Augmented Directory 정의 (Defining augmented directories)
개념적으로, 바이트코드 파일의 `augmented directory`는 소스 파일이 존재하는 디렉토리에 바이트코드 베이스를 접두사로 붙인 디렉토리입니다.

**Unix 환경:**
```python
pcb = os.path.abspath(sys.bytecodebase)
if sourcefile[0] == os.sep:
    sourcefile = sourcefile[1:]
augdir = os.path.join(pcb, os.path.dirname(sourcefile))
```

**Windows 환경:** 단일 루트 디렉토리 트리가 없기 때문에, 소스 파일이 포함된 디렉토리의 드라이브 문자는 후행 콜론을 제거한 후 디렉토리 구성 요소로 처리됩니다. 따라서 `augmented directory`는 다음과 같이 파생됩니다:
```python
pcb = os.path.abspath(sys.bytecodebase)
drive, base = os.path.splitdrive(os.path.dirname(sourcefile))
drive = drive[:-1]
if base[0] == "\\":
    base = base[1:]
augdir = os.path.join(pcb, drive, base)
```

#### 바이트코드 베이스 위치 고정 (Fixing the location of the bytecode base)
프로그램 시작 시, `PYTHONBYTECODEBASE` 환경 변수의 값은 절대 경로로 만들어지고, 유효성을 확인한 다음 `sys` 모듈에 추가됩니다:
```python
pcb = os.path.abspath(os.environ["PYTHONBYTECODEBASE"])
probe = os.path.join(pcb, "foo")
try:
    open(probe, "w")
except IOError:
    sys.bytecodebase = None
else:
    os.unlink(probe)
    sys.bytecodebase = pcb
```
이렇게 하면 사용자가 바이트코드 베이스를 상대 경로로 지정할 수 있지만, 프로그램 실행 중에 현재 작업 디렉토리의 변경에 영향을 받지 않습니다.

`sys.bytecodebase`에 특별한 것은 없습니다. 사용자는 원하면 런타임에 변경할 수 있지만, 일반적으로는 수정되지 않습니다.

### 근거 (Rationale)
많은 환경에서 비-루트(non-root) 사용자가 Python 소스 파일이 포함된 디렉토리에 쓸 수 없습니다. 대부분의 경우, Python 소스가 일반적으로 설치 중에 바이트 컴파일되기 때문에 문제가 되지 않습니다. 그러나 바이트코드 파일이 없거나 업데이트해야 하는 상황이 있습니다. 소스 파일이 포함된 디렉토리가 현재 사용자가 쓸 수 없는 경우, 모듈을 임포트하는 프로그램이 실행될 때마다 성능 저하가 발생합니다. 특정 상황에서는 경고 메시지가 생성될 수도 있습니다. 디렉토리에 쓸 수 있는 경우, 두 개의 별도 프로세스가 거의 동시에 바이트코드 파일을 작성하려고 시도하여 파일 손상이 발생할 수 있습니다.

RAM 디스크를 사용할 수 있는 환경에서는 성능상의 이유로 바이트코드 파일을 해당 디스크의 디렉토리에 쓰는 것이 바람직할 수 있습니다. 유사하게, Python 소스 코드가 네트워크 파일 시스템에 있는 환경에서는 바이트코드 파일을 로컬 디스크에 캐시하는 것이 바람직할 수 있습니다.

### 대안 (Alternatives)
지금까지 제안된 유일한 다른 대안은 바이트코드 파일 작성을 완전히 비활성화하기 위해 인터프리터에 `-R` 플래그를 추가하는 것으로 보입니다. 이 제안은 그 대안을 포함합니다. 명령줄 옵션을 추가하는 것은 확실히 가능하지만, 설치 중에 인터프리터의 명령줄을 쉽게 사용할 수 없기 때문에 충분하지 않을 수 있습니다.

### 문제점 (Issues)
*   **모듈의 `__file__` 속성 해석:** 모듈의 `__file__` 속성은 바이트코드 파일의 실제 위치를 반영해야 한다고 생각합니다. 사람들이 모듈의 소스 코드를 찾고 싶다면, `imp.find_module(module)`을 사용해야 합니다.
*   **보안 - 루트(root)가 `PYTHONBYTECODEBASE`를 설정하면 어떻게 될까?** 예, 이것은 보안 위험을 초래할 수 있지만, 루트 사용자가 하는 다른 많은 일들도 마찬가지입니다. 루트 사용자는 아마도 설치 중을 제외하고는 `PYTHONBYTECODEBASE`를 설정하지 않아야 합니다. 그럼에도 불구하고, 이 문제를 최소화할 수 있을 것입니다. 루트로 실행할 때 인터프리터는 `PYTHONBYTECODEBASE`가 루트 이외의 다른 사람이 쓸 수 있는 디렉토리를 참조하는지 확인해야 합니다. 그렇다면 예외나 경고를 발생시키고 `sys.bytecodebase`를 `None`으로 설정할 수 있습니다. 또는 다음 항목을 참조하십시오.
*   **더 많은 보안 - `PYTHONBYTECODEBASE`가 일반 디렉토리(예: `/tmp`)를 참조하면 어떻게 될까?** 이 경우, 미리 존재하는 바이트코드 파일의 로딩은 파일이 현재 사용자 또는 루트에 의해 소유된 경우에만 발생해야 할 수도 있습니다. (이것이 Windows에서 중요한가요?)
*   이 PEP와 임포트 훅(import hooks)의 상호 작용은 아직 고려되지 않았습니다. 사실, 이 아이디어를 구현하는 가장 좋은 방법은 임포트 훅일 수도 있습니다. PEP 302를 참조하십시오.
*   현재 (PEP 304 이전) 환경에서는 소스 파일과 해당 바이트코드 파일이 동일한 디렉토리에 있기 때문에 바이트코드 파일이 생성된 후 소스 파일을 삭제해도 안전합니다. 현재 정의된 PEP 304에서는 그렇지 않습니다. `augmented directory`에 있는 바이트코드 파일은 소스 파일이 있을 때만 고려되므로, `.pyc`로 끝나는 모듈 파일을 찾을 때는 전혀 고려되지 않습니다. 이 동작은 변경되어야 할 수도 있다고 생각합니다.

### 예시 (Examples)

다음 예시에서는 `urllib` 소스 코드가 `/usr/lib/python2.3/urllib.py`에 있으며, `/usr/lib/python2.3`은 `sys.path`에 있지만 현재 사용자가 쓸 수 없습니다.

*   바이트코드 베이스는 `/tmp`입니다. `/usr/lib/python2.3/urllib.pyc`가 존재하고 유효합니다. `urllib`가 임포트될 때 `/usr/lib/python2.3/urllib.pyc`의 내용이 사용됩니다. `augmented directory`는 참조되지 않습니다. 다른 바이트코드 파일은 생성되지 않습니다.
*   바이트코드 베이스는 `/tmp`입니다. `/usr/lib/python2.3/urllib.pyc`는 존재하지만 오래되었습니다. `urllib`가 임포트될 때 생성된 바이트코드 파일은 `/tmp/usr/lib/python2.3` 값을 가지는 `augmented directory`의 `urllib.pyc`에 작성됩니다. 필요한 경우 중간 디렉토리가 생성됩니다.
*   바이트코드 베이스는 `None`입니다. `urllib.pyc` 파일이 발견되지 않습니다. `urllib`가 임포트될 때 바이트코드 파일은 작성되지 않습니다.
*   바이트코드 베이스는 `/tmp`입니다. `urllib.pyc` 파일이 발견되지 않습니다. `urllib`가 임포트될 때 생성된 바이트코드 파일은 `/tmp/usr/lib/python2.3` 값을 가지는 `augmented directory`에 작성됩니다. 필요한 경우 중간 디렉토리가 생성됩니다.
*   시작 시 `PYTHONBYTECODEBASE`는 존재하지 않는 `/tmp/foobar`입니다. 경고가 발생하고 `sys.bytecodebase`는 `None`으로 설정되며, 나중에 `sys.bytecodebase`가 유효하고 쓸 수 있는 디렉토리를 참조하도록 변경되지 않는 한 프로그램 실행 중에는 바이트코드 파일이 작성되지 않습니다.
*   시작 시 `PYTHONBYTECODEBASE`는 존재하는 `/`로 설정되어 있지만, 현재 사용자가 쓸 수 없습니다. 경고가 발생하고 `sys.bytecodebase`는 `None`으로 설정되며, 나중에 `sys.bytecodebase`가 유효하고 쓸 수 있는 디렉토리를 참조하도록 변경되지 않는 한 프로그램 실행 중에는 바이트코드 파일이 작성되지 않습니다. 특정 바이트코드 파일에 대해 구성된 `augmented directory`가 현재 사용자가 쓸 수 있더라도, 중요한 것은 바이트코드 베이스 디렉토리 자체가 쓸 수 있어야 한다는 점에 유의하십시오.
*   시작 시 `PYTHONBYTECODEBASE`는 빈 문자열로 설정됩니다. `sys.bytecodebase`는 `None`으로 설정됩니다. 그러나 경고는 생성되지 않습니다. `urllib`가 임포트될 때 `urllib.pyc` 파일이 발견되지 않으면 바이트코드 파일은 작성되지 않습니다.

다음 Windows 예시에서는 `urllib` 소스 코드가 `C:\PYTHON22\urllib.py`에 있습니다. `C:\PYTHON22`는 `sys.path`에 있지만 현재 사용자가 쓸 수 없습니다.

*   바이트코드 베이스는 `C:\TEMP`로 설정됩니다. `C:\PYTHON22\urllib.pyc`가 존재하고 유효합니다. `urllib`가 임포트될 때 `C:\PYTHON22\urllib.pyc`의 내용이 사용됩니다. `augmented directory`는 참조되지 않습니다.
*   바이트코드 베이스는 `C:\TEMP`로 설정됩니다. `C:\PYTHON22\urllib.pyc`는 존재하지만 오래되었습니다. `urllib`가 임포트될 때, `C:\TEMP\C\PYTHON22` 값을 가지는 `augmented directory`에 새로운 바이트코드 파일이 작성됩니다. 필요한 경우 중간 디렉토리가 생성됩니다.
*   시작 시 `PYTHONBYTECODEBASE`는 `TEMP`로 설정되고, 애플리케이션 시작 시 현재 작업 디렉토리는 `H:\NET`입니다. 따라서 잠재적인 바이트코드 베이스는 `H:\NET\TEMP`입니다. 이 디렉토리가 존재하고 현재 사용자가 쓸 수 있다면 `sys.bytecodebase`는 해당 값으로 설정됩니다. 그렇지 않으면 경고가 발생하고 `sys.bytecodebase`는 `None`으로 설정됩니다.
*   바이트코드 베이스는 `C:\TEMP`입니다. `urllib.pyc` 파일이 발견되지 않습니다. `urllib`가 임포트될 때, `C:\TEMP\C\PYTHON22` 값을 가지는 `augmented directory`에 생성된 바이트코드 파일이 작성됩니다. 필요한 경우 중간 디렉토리가 생성됩니다.

### 구현 (Implementation)
Sourceforge의 패치를 참조하십시오.

### 참고 문헌 (References)
*   patch 602345, Option for not writing py.[co] files, Klose (`https://bugs.python.org/issue602345`)
*   python-dev thread, Disable writing .py[co], Norwitz (`https://mail.python.org/pipermail/python-dev/2003-January/032270.html`)
*   Debian bug report, Mailman is writing to /usr in cron, Wegner (`http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=96111`)
*   python-dev thread, Parallel pyc construction, Dubois (`https://mail.python.org/pipermail/python-dev/2003-January/032060.html`)
*   patch 677103, PYTHONBYTECODEBASE patch (PEP 304), Montanaro (`https://bugs.python.org/issue677103`)

### 저작권 (Copyright)
이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.