---
title: "[Deferred] PEP 3143 - Standard daemon process library"
excerpt: "Python Enhancement Proposal 3143: 'Standard daemon process library'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3143/
toc: true
toc_sticky: true
date: 2025-09-27 14:36:57+0900
last_modified_at: 2025-09-27 14:36:57+0900
published: true
---
> **원문 링크:** [PEP 3143 - Standard daemon process library](https://peps.python.org/pep-3143/)
>
> **상태:** Deferred | **유형:** Standards Track | **작성일:** 26-Jan-2009


## 초록 (Abstract)

잘 작동하는 유닉스(Unix) 데몬(daemon) 프로그램을 작성하는 것은 다소 복잡하고 제대로 구현하기 까다롭지만, 프로그램이 해야 할 다른 작업과는 관계없이 대부분의 데몬에서 그 단계는 비슷합니다.

이 PEP는 데몬 프로세스가 되는 작업을 위한 간단한 인터페이스를 제공하는 패키지를 Python 표준 라이브러리에 도입할 것을 제안합니다.

## PEP 연기 (PEP Deferral)

이 PEP에서 다루는 개념들에 대한 추가적인 탐구는 현재 PEP의 목표를 추진하고 피드백을 수집 및 통합하며, 이를 효과적으로 수행할 충분한 시간을 가진 '챔피언'의 부재로 인해 연기되었습니다.

## 명세 (Specification)

### 예제 사용 (Example usage)

`DaemonContext`를 직접 사용하는 간단한 예시입니다.

```python
import daemon
from spam import do_main_program

with daemon.DaemonContext():
    do_main_program()
```

더 복잡한 사용 예시입니다.

```python
import os
import grp
import signal
import daemon
import lockfile

from spam import (
    initial_program_setup,
    do_main_program,
    program_cleanup,
    reload_program_config,
)

context = daemon.DaemonContext(
    working_directory='/var/lib/foo',
    umask=0o002,
    pidfile=lockfile.FileLock('/var/run/spam.pid'),
)

context.signal_map = {
    signal.SIGTERM: program_cleanup,
    signal.SIGHUP: 'terminate',
    signal.SIGUSR1: reload_program_config,
}

mail_gid = grp.getgrnam('mail').gr_gid
context.gid = mail_gid

important_file = open('spam.data', 'w')
interesting_file = open('eggs.data', 'w')
context.files_preserve = [important_file, interesting_file]

initial_program_setup()
with context:
    do_main_program()
```

### 인터페이스 (Interface)

새로운 패키지 `daemon`이 표준 라이브러리에 추가됩니다.

`DaemonContext` 클래스는 데몬 프로세스로 실행되는 프로그램의 설정과 프로세스 컨텍스트를 나타내기 위해 정의됩니다.

### `DaemonContext` 객체 (DaemonContext objects)

`DaemonContext` 인스턴스는 프로그램이 데몬이 될 때의 동작 설정 및 프로세스 컨텍스트를 나타냅니다. 동작 및 환경은 `open` 메서드를 호출하기 전에 인스턴스에 옵션을 설정하여 사용자 정의됩니다.

각 옵션은 `DaemonContext` 생성자에 키워드 인수로 전달될 수 있으며, `open`을 호출하기 전에는 언제든지 인스턴스의 속성에 할당하여 변경할 수 있습니다. 예를 들어, `wibble` 및 `wubble`이라는 옵션에 대해 다음 호출은:

```python
foo = daemon.DaemonContext(wibble=bar, wubble=baz)
foo.open()
```

다음과 동일합니다.

```python
foo = daemon.DaemonContext()
foo.wibble = bar
foo.wubble = baz
foo.open()
```

다음 옵션들이 정의됩니다.

*   **`files_preserve`**
    *   **기본값:** `None`
    *   데몬 시작 시 닫히지 않아야 하는 파일 목록입니다. `None`인 경우, 모든 열린 파일 디스크립터가 닫힙니다.
    *   목록의 요소는 파일 디스크립터(파일 객체의 `fileno()` 메서드가 반환하는 값) 또는 Python 파일 객체입니다. 각 요소는 데몬 시작 중에 닫히지 않을 파일을 지정합니다.

*   **`chroot_directory`**
    *   **기본값:** `None`
    *   프로세스의 유효 루트 디렉터리로 설정할 디렉터리의 전체 경로입니다. `None`인 경우, 루트 디렉터리가 변경되지 않음을 지정합니다.

*   **`working_directory`**
    *   **기본값:** `'/'`
    *   데몬 시작 시 프로세스가 변경해야 할 작업 디렉터리의 전체 경로입니다.
    *   프로세스가 해당 파일 시스템에 현재 작업 디렉터리를 가지고 있으면 파일 시스템을 언마운트할 수 없으므로, 이 값은 기본값으로 두거나 데몬이 실행되는 동안 합리적인 "홈 디렉터리"로 설정해야 합니다.

*   **`umask`**
    *   **기본값:** `0`
    *   데몬 시작 시 프로세스에 설정할 파일 접근 생성 마스크("umask")입니다.
    *   프로세스는 부모 프로세스로부터 umask를 상속받으므로, 데몬을 시작하면 umask가 이 값으로 재설정되어 데몬이 예상하는 접근 모드로 파일을 생성할 수 있습니다.

*   **`pidfile`**
    *   **기본값:** `None`
    *   PID 잠금 파일을 위한 컨텍스트 매니저입니다. 데몬 컨텍스트가 열리고 닫힐 때, `pidfile` 컨텍스트 매니저에 진입하고 종료합니다.

*   **`detach_process`**
    *   **기본값:** `None`
    *   `True`이면 데몬 컨텍스트를 열 때 프로세스 컨텍스트를 분리하고, `False`이면 분리하지 않습니다.
    *   인스턴스 초기화 시 지정되지 않은 경우(`None`), 기본적으로 `True`로 설정되며, 프로세스 분리가 불필요하다고 판단되는 경우(예: `init`, `initd`, 또는 `inetd`에 의해 프로세스가 시작된 경우)에만 `False`로 설정됩니다.

*   **`signal_map`**
    *   **기본값:** 시스템 의존적
    *   운영 체제 시그널과 콜백 동작 간의 매핑입니다.
    *   이 매핑은 데몬 컨텍스트가 열릴 때 사용되며, 각 시그널 핸들러의 동작을 결정합니다.
        *   `None` 값은 시그널을 무시합니다 (`signal.SIG_IGN`으로 시그널 동작을 설정).
        *   문자열 값은 `DaemonContext` 인스턴스의 속성 이름으로 사용됩니다. 해당 속성의 값은 시그널 핸들러의 동작으로 사용됩니다.
        *   다른 모든 값은 시그널 핸들러의 동작으로 사용됩니다.
    *   기본값은 실행 중인 시스템에 정의된 시그널에 따라 달라집니다. `signal` 모듈에 실제로 정의된 다음 목록의 각 항목은 기본 맵에 나타납니다.
        *   `signal.SIGTTIN`: `None`
        *   `signal.SIGTTOU`: `None`
        *   `signal.SIGTSTP`: `None`
        *   `signal.SIGTERM`: `'terminate'`
    *   프로그램이 자식 프로세스와 어떻게 상호작용할지에 따라, `signal.SIGCHLD` 시그널(자식 프로세스가 종료될 때 수신)을 포함하는 시그널 맵을 지정해야 할 수도 있습니다. 시그널 핸들러가 필요한 상황을 결정하는 방법에 대한 자세한 내용은 특정 운영 체제의 문서를 참조하십시오.

*   **`uid`**
    *   **기본값:** `os.getuid()`
*   **`gid`**
    *   **기본값:** `os.getgid()`
    *   데몬 시작 시 프로세스를 전환할 사용자 ID("UID") 값 및 그룹 ID("GID") 값입니다.
    *   기본값인 프로세스의 실제 UID 및 GID는 프로세스에 의해 상속된 모든 유효 권한 상승을 포기합니다.

*   **`prevent_core`**
    *   **기본값:** `True`
    *   `True`인 경우, `root`로 실행되는 데몬에서 민감한 정보가 유출되는 것을 방지하기 위해 코어 파일 생성을 막습니다.

*   **`stdin`**
    *   **기본값:** `None`
*   **`stdout`**
    *   **기본값:** `None`
*   **`stderr`**
    *   **기본값:** `None`
    *   `stdin`, `stdout`, `stderr` 각각은 `sys.stdin`, `sys.stdout`, `sys.stderr` 표준 I/O 스트림의 새 파일로 사용될 파일 유사(file-like) 객체입니다. 따라서 파일은 `stdin`의 경우 최소 `r` 모드, `stdout` 및 `stderr`의 경우 `w+` 모드로 열려 있어야 합니다.
    *   객체에 파일 디스크립터를 반환하는 `fileno()` 메서드가 있는 경우, 해당 파일은 데몬 시작 중에 닫히지 않습니다 (즉, `files_preserve`에 나열된 것처럼 처리됩니다).
    *   `None`인 경우, 해당 시스템 스트림은 `os.devnull`로 명명된 파일로 다시 바인딩됩니다.

다음 메서드들이 정의됩니다.

*   **`open()`**
    *   **반환:** `None`
    *   데몬 컨텍스트를 열어 현재 프로그램을 데몬 프로세스로 전환합니다. 이 메서드는 다음 단계를 수행합니다.
        *   이 인스턴스의 `is_open` 속성이 `True`이면 즉시 반환합니다. 이를 통해 한 인스턴스에서 `open`을 여러 번 호출해도 안전합니다.
        *   `prevent_core` 속성이 `True`이면, 프로세스의 코어 덤프를 방지하기 위해 프로세스의 리소스 제한을 설정합니다.
        *   `chroot_directory` 속성이 `None`이 아니면, 프로세스의 유효 루트 디렉터리를 해당 디렉터리로 설정합니다 (`os.chroot`를 통해).
            *   이를 통해 데몬 프로세스를 "chroot 감옥" 내에서 실행하여 프로세스의 비정상적인 동작으로 인한 시스템 노출을 제한할 수 있습니다. 지정된 디렉터리가 이미 이 목적을 위해 설정되어 있어야 합니다.
        *   프로세스 UID 및 GID를 `uid` 및 `gid` 속성 값으로 전환합니다.
        *   모든 열린 파일 디스크립터를 닫습니다. `files_preserve` 속성에 나열된 파일 및 `stdin`, `stdout`, `stderr` 속성에 해당하는 파일은 제외합니다.
        *   현재 작업 디렉터리를 `working_directory` 속성으로 지정된 경로로 변경합니다.
        *   파일 접근 생성 마스크를 `umask` 속성으로 지정된 값으로 재설정합니다.
        *   `detach_process` 옵션이 `True`이면, 현재 프로세스를 자체 프로세스 그룹으로 분리하고, 모든 제어 터미널과 연결을 해제합니다.
        *   `signal_map` 속성으로 지정된 시그널 핸들러를 설정합니다.
        *   `stdin`, `stdout`, `stderr` 속성 중 `None`이 아닌 것이 있으면, `sys.stdin`, `sys.stdout`, 및/또는 `sys.stderr` 시스템 스트림을 해당 속성으로 표현되는 파일에 바인딩합니다. 속성에 파일 디스크립터가 있는 경우, 디스크립터가 복제됩니다 (이름을 다시 바인딩하는 대신).
        *   `pidfile` 속성이 `None`이 아니면, 해당 컨텍스트 매니저에 진입합니다.
        *   향후 `open` 및 `close` 호출을 위해 이 인스턴스를 열린 상태로 표시합니다.
        *   Python 종료 처리 중에 호출되도록 `close` 메서드를 등록합니다.
    *   함수가 반환되면, 실행 중인 프로그램은 데몬 프로세스가 됩니다.

*   **`close()`**
    *   **반환:** `None`
    *   데몬 컨텍스트를 닫습니다. 이 메서드는 다음 단계를 수행합니다.
        *   이 인스턴스의 `is_open` 속성이 `False`이면 즉시 반환합니다. 이를 통해 한 인스턴스에서 `close`를 여러 번 호출해도 안전합니다.
        *   `pidfile` 속성이 `None`이 아니면, 해당 컨텍스트 매니저를 종료합니다.
        *   향후 `open` 및 `close` 호출을 위해 이 인스턴스를 닫힌 상태로 표시합니다.

*   **`is_open`**
    *   **반환:** 인스턴스가 열려 있으면 `True`, 그렇지 않으면 `False`
    *   이 속성은 인스턴스가 현재 열려 있는지 여부를 나타내는 상태를 노출합니다. 인스턴스의 `open` 메서드가 호출되었고 그 후에 `close` 메서드가 호출되지 않았다면 `True`입니다.

*   **`terminate(signal_number, stack_frame)`**
    *   **반환:** `None`
    *   `signal.SIGTERM` 시그널을 위한 시그널 핸들러입니다. 다음 단계를 수행합니다.
        *   시그널을 설명하는 `SystemExit` 예외를 발생시킵니다.

이 클래스는 또한 `__enter__` 및 `__exit__` 메서드를 통해 컨텍스트 매니저 프로토콜을 구현합니다.

*   **`__enter__()`**
    *   **반환:** `DaemonContext` 인스턴스
    *   인스턴스의 `open()` 메서드를 호출한 다음, 인스턴스를 반환합니다.

*   **`__exit__(exc_type, exc_value, exc_traceback)`**
    *   **반환:** 컨텍스트 매니저 프로토콜에 정의된 대로 `True` 또는 `False`
    *   인스턴스의 `close()` 메서드를 호출한 다음, 예외가 처리되었으면 `True`, 그렇지 않으면 `False`를 반환합니다.

## 동기 (Motivation)

유닉스 데몬으로 작성된 프로그램의 대부분은 명세와 매우 유사한 동작을 구현하거나, 올바른 데몬 동작에 비춰볼 때 제대로 작동하지 않는 데몬입니다.

이러한 단계들은 대부분의 구현에서 거의 동일해야 하지만, 매우 구체적이고 누락하거나 잘못 구현하기 쉽기 때문에, 표준 라이브러리에서 표준화되고 잘 테스트된 구현의 주요 대상이 됩니다.

## 근거 (Rationale)

### 올바른 데몬 동작 (Correct daemon behaviour)

Stevens [stevens] §2.6에 따르면, 프로그램은 유닉스 데몬 프로세스가 되기 위해 다음 단계를 수행해야 합니다.

*   모든 열린 파일 디스크립터를 닫습니다.
*   현재 작업 디렉터리를 변경합니다.
*   파일 접근 생성 마스크를 재설정합니다.
*   백그라운드에서 실행됩니다.
*   프로세스 그룹에서 분리됩니다.
*   터미널 I/O 시그널을 무시합니다.
*   제어 터미널에서 분리됩니다.
*   제어 터미널을 다시 획득하지 않습니다.
*   다음 상황을 올바르게 처리합니다.
    *   System V `init` 프로세스에 의해 시작됨.
    *   `SIGTERM` 시그널에 의한 데몬 종료.
    *   자식 프로세스가 `SIGCLD` 시그널을 생성.

데몬 도구 [slack-daemon]는 (기능 요약에서) 프로그램을 잘 작동하는 유닉스 데몬 프로세스로 전환할 때 수행되어야 할 동작을 나열합니다. 이는 별도의 프로그램을 데몬 프로세스로 호출한다는 점에서 이 PEP의 의도와 다릅니다. 프로그램이 이미 실행된 후에 스스로 시작하는 데몬에 적합한 기능은 다음과 같습니다.

*   데몬에 대한 올바른 프로세스 컨텍스트를 설정합니다.
*   `initd(8)` 또는 `inetd(8)`에 의해 시작될 때 합리적으로 동작합니다.
*   특별한 권한으로 데몬이 잘못 설치된 경우 보안 위험을 줄이기 위해 모든 `suid` 또는 `sgid` 권한을 철회합니다.
*   `root`로 실행되는 데몬에서 민감한 정보가 유출되는 것을 방지하기 위해 코어 파일 생성을 막습니다 (선택 사항).
*   주어진 이름의 데몬이 한 번에 하나만 실행되도록 보장하기 위해 PID 파일을 생성하고 잠금으로써 데몬의 이름을 지정합니다 (선택 사항).
*   데몬을 실행할 사용자 및 그룹을 설정합니다 (선택 사항, `root`만 해당).
*   `chroot` 감옥을 생성합니다 (선택 사항, `root`만 해당).
*   데몬의 `stdout` 및 `stderr`를 캡처하여 `syslog`로 보냅니다 (선택 사항).

### 데몬은 서비스가 아니다 (A daemon is not a service)

이 PEP는 다른 운영 체제의 유사한 동작과는 달리, 위에서 언급된 올바른 동작이 관련 있는 유닉스 스타일의 데몬만을 다룹니다.

많은 시스템에는 "서비스(service)"라는 관련 개념이 있습니다. 서비스는 이 PEP의 모델과 다릅니다. 현재 프로그램이 데몬 프로세스로 계속 실행되는 대신, 서비스는 백그라운드에서 실행될 추가 프로세스를 시작하고, 현재 프로세스는 정의된 채널을 통해 해당 추가 프로세스와 통신합니다.

이 PEP의 유닉스 스타일 데몬 모델은 다른 것들 중에서도 서비스의 백그라운드 프로세스 부분을 구현하는 데 사용될 수 있습니다. 그러나 이 PEP는 서비스를 설정하고 관리하는 다른 측면을 다루지 않습니다.

## 참조 구현 (Reference Implementation)

`python-daemon` 패키지 [python-daemon]입니다.

## 다른 데몬 구현 (Other daemon implementations)

이 PEP 이전에, 몇몇 기존의 서드파티 Python 라이브러리 또는 도구는 이 PEP의 올바른 데몬 동작 중 일부를 구현했습니다.

참조 구현은 다음 구현들의 상당히 직접적인 후속작입니다.

*   Python cookbook 레시피 #66012 [cookbook-66012] 및 #278731 [cookbook-278731]에 커뮤니티에서 많은 좋은 아이디어가 기여되었습니다.
*   `bda.daemon` 라이브러리 [bda.daemon]는 [cookbook-66012]의 구현입니다. 이것은 [python-daemon]의 전신입니다.

이 PEP와 다른 Python 데몬 구현들은 다음과 같습니다.

*   `zdaemon` 도구 [zdaemon]는 Zope 프로젝트를 위해 작성되었습니다. [slack-daemon]처럼, 다른 프로그램을 데몬 프로세스로 실행하는 데 사용되기 때문에 이 명세와 다릅니다.
*   Python 라이브러리 `daemon` [clapper-daemon]은 (홈페이지에 따르면) 더 이상 유지 관리되지 않습니다. 버전 1.0.1 기준으로 [stevens]의 기본 단계를 구현합니다.
*   `daemonize` 라이브러리 [seutter-daemonize] 또한 [stevens]의 기본 단계를 구현합니다.
*   Ray Burr의 `daemon.py` 모듈 [burr-daemon]은 [stevens] 절차뿐만 아니라 PID 파일 처리 및 `syslog`로의 출력 리디렉션을 제공합니다.
*   Twisted [twisted]는 놀랍지 않게도, Twisted 프레임워크의 나머지 부분과 통합된 프로세스 데몬화(daemonisation) API의 구현을 포함합니다. 이는 이 PEP의 API와는 상당히 다릅니다.
*   `[clapper-daemon]`을 사용하는 Python `initd` 라이브러리 [dagitses-initd]는 데몬 프로세스를 제어하기 위한 유닉스 `initd(8)`의 동등한 것을 구현합니다.

## 참고 자료 (References)

*   [stevens]: Unix Network Programming, W. Richard Stevens, 1994 Prentice Hall.
*   [slack-daemon]: The (non-Python) “libslack” implementation of a daemon tool http://www.libslack.org/daemon/ by “raf” <raf@raf.org>.
*   [python-daemon]: The python-daemon library http://pypi.python.org/pypi/python-daemon/ by Ben Finney et al.
*   [cookbook-66012]: Python Cookbook recipe 66012, “Fork a daemon process on Unix” http://code.activestate.com/recipes/66012/.
*   [cookbook-278731]: Python Cookbook recipe 278731, “Creating a daemon the Python way” http://code.activestate.com/recipes/278731/.
*   [bda.daemon]: The bda.daemon library http://pypi.python.org/pypi/bda.daemon/ by Robert Niederreiter et al.
*   [zdaemon]: The zdaemon tool http://pypi.python.org/pypi/zdaemon/ by Guido van Rossum et al.
*   [clapper-daemon]: The daemon library http://pypi.python.org/pypi/daemon/ by Brian Clapper.
*   [seutter-daemonize]: The daemonize library http://daemonize.sourceforge.net/ by Jerry Seutter.
*   [burr-daemon]: The daemon.py module http://www.nightmare.com/~ryb/code/daemon.py by Ray Burr.
*   [twisted]: The Twisted application framework http://pypi.python.org/pypi/Twisted/ by Glyph Lefkowitz et al.
*   [dagitses-initd]: The Python initd library http://pypi.python.org/pypi/initd/ by Michael Andreas Dagitses.

## 저작권 (Copyright)

이 저작물은 공개 도메인으로 지정됩니다. 저작물을 공개 도메인으로 지정하는 것이 법적으로 불가능한 범위 내에서는, 저작권자는 이 저작물의 모든 수령인에게 저작권에 의해 제한될 수 있는 모든 권리와 자유를 부여합니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.