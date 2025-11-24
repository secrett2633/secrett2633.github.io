---
title: "[Superseded] PEP 433 - Easier suppression of file descriptor inheritance"
excerpt: "Python Enhancement Proposal 433: 'Easier suppression of file descriptor inheritance'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/433/
toc: true
toc_sticky: true
date: 2025-09-26 21:45:26+0900
last_modified_at: 2025-09-26 21:45:26+0900
published: true
---
> **원문 링크:** [PEP 433 - Easier suppression of file descriptor inheritance](https://peps.python.org/pep-0433/)
>
> **상태:** Superseded | **유형:** Standards Track | **작성일:** 10-Jan-2013



# PEP 433 – 파일 디스크립터 상속을 더 쉽게 억제하기 (Easier suppression of file descriptor inheritance)

*   **작성자**: Victor Stinner <vstinner at python.org>
*   **상태**: Superseded (폐기됨 - PEP 446으로 대체됨)
*   **유형**: Standards Track
*   **생성일**: 2013년 1월 10일
*   **Python 버전**: 3.4
*   **대체**: PEP 446

## 목차
*   [요약 (Abstract)](#요약-abstract)
*   [배경 (Rationale)](#배경-rationale)
    *   [Python 3.3에서의 현황](#python-33에서의-현황)
    *   [파일 디스크립터 상속 문제](#파일-디스크립터-상속-문제)
        *   [보안 (Security)](#보안-security)
        *   [원자성 (Atomicity)](#원자성-atomicity)
        *   [이식성 (Portability)](#이식성-portability)
    *   [범위 (Scope)](#범위-scope)
*   [제안 (Proposal)](#제안-proposal)
*   [대안 (Alternatives)](#대안-alternatives)
    *   [상속이 기본적으로 활성화되고, 기본값은 설정 불가능](#상속이-기본적으로-활성화되고-기본값은-설정-불가능)
    *   [상속이 기본적으로 활성화되고, 기본값은 `True`로만 설정 가능](#상속이-기본적으로-활성화되고-기본값은-true로만-설정-가능)
    *   [상속을 기본적으로 비활성화](#상속을-기본적으로-비활성화)
    *   [`fork()` 이후 파일 디스크립터 닫기](#fork-이후-파일-디스크립터-닫기)
    *   [`open()`: 모드에 "e" 플래그 추가](#open-모드에-e-플래그-추가)
    *   [새로운 매개변수 이름에 대한 논의](#새로운-매개변수-이름에-대한-논의)
*   [파일 디스크립터 상속을 사용하는 애플리케이션](#파일-디스크립터-상속을-사용하는-애플리케이션)
*   [성능 (Performances)](#성능-performances)
*   [구현 (Implementation)](#구현-implementation)
    *   `os.get_cloexec(fd)`
    *   `os.set_cloexec(fd, cloexec=True)`
    *   `open()`
    *   `os.dup()`
    *   `os.dup2()`
    *   `os.pipe()`
    *   `socket.socket()`
    *   `socket.socketpair()`
    *   `socket.socket.accept()`
*   [하위 호환성 (Backward compatibility)](#하위-호환성-backward-compatibility)
*   [부록: 운영 체제 지원 (Appendix: Operating system support)](#부록-운영-체제-지원-appendix-operating-system-support)
    *   [Windows](#windows)
    *   `ioctl`
    *   `fcntl`
    *   [원자적 플래그 (Atomic flags)](#원자적-플래그-atomic-flags)
*   [링크 (Links)](#링크-links)
*   [각주 (Footnotes)](#각주-footnotes)
*   [저작권 (Copyright)](#저작권-copyright)

## 요약 (Abstract)

이 PEP는 파일 디스크립터 (File Descriptor)를 생성하는 함수에 새로운 선택적 `cloexec` 매개변수를 추가하고, 이 매개변수의 기본값을 변경하는 다양한 방법을 도입하며, 다음과 같은 네 가지 새로운 함수를 추가할 것을 제안합니다.

*   `os.get_cloexec(fd)`
*   `os.set_cloexec(fd, cloexec=True)`
*   `sys.getdefaultcloexec()`
*   `sys.setdefaultcloexec(cloexec)`

## 배경 (Rationale)

파일 디스크립터는 `close-on-exec` 플래그를 가지고 있으며, 이 플래그는 파일 디스크립터가 상속될지 여부를 나타냅니다.

UNIX 시스템에서 `close-on-exec` 플래그가 설정되면, 파일 디스크립터는 자식 프로세스의 실행 시 닫히므로 상속되지 않습니다. 그렇지 않으면 파일 디스크립터는 자식 프로세스에 의해 상속됩니다.

Windows 시스템에서 `close-on-exec` 플래그가 설정되면 파일 디스크립터는 상속되지 않습니다. `close-on-exec` 플래그가 해제되고 `CreateProcess()` 함수가 `bInheritHandles` 매개변수를 `TRUE`로 설정하여 호출될 경우 (예를 들어 `subprocess.Popen`이 `close_fds=False`로 생성될 때), 파일 디스크립터는 자식 프로세스에 의해 상속됩니다. Windows에는 "close-on-exec" 플래그는 없지만, 그와 반대되는 값을 가진 상속 플래그가 있습니다. 예를 들어, `close-on-exec` 플래그를 설정하는 것은 핸들(handle)의 `HANDLE_FLAG_INHERIT` 플래그를 해제하는 것을 의미합니다.

### Python 3.3에서의 현황

UNIX에서는 Python 3.2부터 `subprocess` 모듈이 기본적으로 파일 디스크립터 2번(stderr)보다 큰 모든 파일 디스크립터를 닫습니다. [cite: 1,  각주 1] 부모 프로세스에 의해 생성된 모든 파일 디스크립터는 자식 프로세스에서 자동으로 닫힙니다.

`xmlrpc.server.SimpleXMLRPCServer`는 리스닝 소켓 (listening socket)의 `close-on-exec` 플래그를 설정하지만, 부모 클래스인 `socketserver.TCPServer`는 이 플래그를 설정하지 않습니다.

`os.spawn*()` 및 `os.exec*()` 계열 함수와 `exec()` 또는 `fork()` + `exec()`를 호출하는 서드파티 모듈을 통해 서브프로세스를 생성하거나 새 프로그램을 실행할 때 파일 디스크립터가 닫히지 않는 다른 경우가 있습니다. 이 경우, 파일 디스크립터는 부모 프로세스와 자식 프로세스 간에 공유되는데, 이는 일반적으로 예상치 못한 동작이며 다양한 문제를 야기합니다.

이 PEP는 Python 3.2에서 `subprocess` 모듈의 변경으로 시작된 작업을 계속하여, `subprocess`를 사용하는 코드뿐만 아니라 모든 코드에서 이 문제를 해결할 것을 제안합니다.

### 파일 디스크립터 상속 문제

부모 프로세스에서 파일 디스크립터를 닫아도 관련 리소스 (파일, 소켓 등)는 자식 프로세스에서 여전히 열려 있기 때문에 닫히지 않습니다.

`TCPServer`의 리스닝 소켓은 `exec()` 시 닫히지 않습니다. 이로 인해 자식 프로세스가 새 클라이언트로부터 연결을 받을 수 있으며, 만약 부모 프로세스가 리스닝 소켓을 닫고 동일한 주소에 새 리스닝 소켓을 생성하려고 하면 "address already in use" (주소가 이미 사용 중) 오류가 발생할 수 있습니다.

파일 디스크립터를 닫지 않으면 리소스 고갈로 이어질 수 있습니다. 부모가 모든 파일을 닫아도, 자식 프로세스에 파일이 여전히 열려 있기 때문에 "too many files" (파일이 너무 많음) 오류로 인해 새 파일 디스크립터 생성이 실패할 수 있습니다.

관련된 문제들은 다음과 같습니다.
*   Issue #2320: `subprocess`에서 `stdin`을 사용하는 경합 조건 (Race condition) (2008)
*   Issue #3006: `subprocess.Popen`이 닫힌 후에도 소켓이 열려 있음 (2008)
*   Issue #7213: `subprocess`가 `Popen` 인스턴스 간에 열린 파일 디스크립터를 누출하여 중단 발생 (2009)
*   Issue #12786: `stdin`이 닫힐 때 `subprocess.wait()`가 중단됨 (2011)

#### 보안 (Security)

파일 디스크립터 누출은 중대한 보안 취약점입니다. 신뢰할 수 없는 자식 프로세스가 암호와 같은 민감한 데이터를 읽거나 누출된 파일 디스크립터를 통해 부모 프로세스를 제어할 수 있습니다. 예를 들어, `chroot`를 탈출하는 알려진 취약점입니다.

CERT 권고 사항: FIO42-C. 더 이상 필요하지 않은 파일은 올바르게 닫히도록 해야 합니다.

취약점 사례:
*   OpenSSH Security Advisory: `portable-keysign-rand-helper.adv` (2011년 4월)
*   CWE-403: 의도하지 않은 제어 영역으로의 파일 디스크립터 노출 (2008)
*   `mod_php`를 통한 Apache `https` 하이재킹 (2003년 12월)
*   Apache: `APR_FOPEN_NOCLEANUP`이 설정되지 않은 경우 `Apr`는 `FD_CLOEXEC`을 설정해야 함 (2009년 수정됨)
*   PHP: `system()` (및 유사 함수)는 Apache에 의해 열린 핸들을 정리하지 않음 (2013년 1월 기준 미수정)

#### 원자성 (Atomicity)

멀티스레드 애플리케이션에서 `fcntl()`을 사용하여 `close-on-exec` 플래그를 설정하는 것은 안전하지 않습니다. 만약 파일 디스크립터 생성과 `fcntl(fd, F_SETFD, new_flags)` 호출 사이에 스레드가 `fork()` 및 `exec()`를 호출한다면, 파일 디스크립터는 자식 프로세스에 의해 상속될 것입니다. 최신 운영 체제는 파일 디스크립터 생성 중에 플래그를 설정하는 함수를 제공하여 경합 조건 (race condition)을 방지합니다.

#### 이식성 (Portability)

Python 3.2는 `socket.SOCK_CLOEXEC` 플래그를 추가했고, Python 3.3은 `os.O_CLOEXEC` 플래그와 `os.pipe2()` 함수를 추가했습니다. Python 3.3에서는 파일 열기, 파이프 또는 소켓 생성 시 `close-on-exec` 플래그를 원자적으로 (atomically) 설정하는 것이 이미 가능합니다.

문제는 이러한 플래그와 함수들이 이식성이 없다는 것입니다. 즉, 최신 버전의 운영 체제에서만 지원됩니다. `O_CLOEXEC` 및 `SOCK_CLOEXEC` 플래그는 오래된 Linux 버전에서는 무시되므로, `fcntl(fd, F_GETFD)`를 사용하여 `FD_CLOEXEC` 플래그를 확인해야 합니다. 커널이 `O_CLOEXEC` 또는 `SOCK_CLOEXEC` 플래그를 무시하는 경우, `close-on-exec` 플래그를 설정하기 위해 `fcntl(fd, F_SETFD, flags)` 호출이 필요합니다.

참고: OpenBSD 5.2 이전 버전은 `fork()`가 `exec()` 전에 사용되면 `close-on-exec` 플래그가 설정된 파일 디스크립터를 닫지 않지만, `exec()`가 `fork()` 없이 호출되면 올바르게 작동합니다.

### 범위 (Scope)

애플리케이션은 `fork()` 이후에도 파일 디스크립터를 명시적으로 닫아야 합니다. `close-on-exec` 플래그는 `exec()` 이후, 즉 `fork()` + `exec()` 이후에만 파일 디스크립터를 닫습니다.

이 PEP는 Python 표준 라이브러리 또는 표준 라이브러리를 사용하는 모듈에 의해 생성된 파일 디스크립터의 `close-on-exec` 플래그만 변경합니다. 표준 라이브러리를 사용하지 않는 서드파티 모듈은 이 PEP에 따르도록 수정되어야 합니다. 예를 들어, 새로운 `os.set_cloexec()` 함수를 사용할 수 있습니다.

참고: `exec()` 없는 `fork()`의 가능한 해결책은 "Close file descriptors after fork" 섹션을 참조하십시오.

## 제안 (Proposal)

파일 디스크립터를 생성하는 함수에 새로운 선택적 `cloexec` 매개변수를 추가하고, 이 매개변수의 기본값을 변경하는 다양한 방법을 추가합니다.

다음과 같은 새로운 함수를 추가합니다.
*   `os.get_cloexec(fd:int) -> bool`: 파일 디스크립터의 `close-on-exec` 플래그를 가져옵니다. 모든 플랫폼에서 사용 가능하지 않을 수 있습니다.
*   `os.set_cloexec(fd:int, cloexec:bool=True)`: 파일 디스크립터에 `close-on-exec` 플래그를 설정하거나 해제합니다. 모든 플랫폼에서 사용 가능하지 않을 수 있습니다.
*   `sys.getdefaultcloexec() -> bool`: `cloexec` 매개변수의 현재 기본값을 가져옵니다.
*   `sys.setdefaultcloexec(cloexec: bool)`: `cloexec` 매개변수의 기본값을 설정합니다.

다음 함수들에 새로운 선택적 `cloexec` 매개변수를 추가합니다.
*   `asyncore.dispatcher.create_socket()`
*   `io.FileIO`
*   `io.open()`
*   `open()`
*   `os.dup()`
*   `os.dup2()`
*   `os.fdopen()`
*   `os.open()`
*   `os.openpty()`
*   `os.pipe()`
*   `select.devpoll()`
*   `select.epoll()`
*   `select.kqueue()`
*   `socket.socket()`
*   `socket.socket.accept()`
*   `socket.socket.dup()`
*   `socket.socket.fromfd`
*   `socket.socketpair()`

`cloexec` 매개변수의 기본값은 `sys.getdefaultcloexec()`입니다.

기본적으로 `close-on-exec` 플래그를 설정하기 위해 새로운 명령줄 옵션 `-e`와 환경 변수 `PYTHONCLOEXEC`를 추가합니다.

`subprocess` 모듈은 `pass_fds` 매개변수에 나열된 파일 디스크립터의 `close-on-exec` 플래그를 해제합니다.

표준 라이브러리에서 파일 디스크립터를 생성하는 모든 함수는 `cloexec` 매개변수의 기본값인 `sys.getdefaultcloexec()`를 따라야 합니다.

파일 디스크립터 0 (`stdin`), 1 (`stdout`), 2 (`stderr`)는 상속될 것으로 예상되지만, Python은 이들을 다르게 처리하지 않습니다. 표준 스트림을 대체하기 위해 `os.dup2()`가 사용될 경우, `cloexec=False`를 명시적으로 지정해야 합니다.

제안의 단점:
*   새로 생성된 파일 디스크립터에서 `close-on-exec` 플래그가 설정될지 여부를 소스 코드만으로는 알 수 없게 됩니다.
*   파일 디스크립터의 상속이 중요한 경우, `cloexec` 매개변수를 명시적으로 지정해야 하며, 그렇지 않으면 라이브러리나 애플리케이션이 `cloexec` 매개변수의 기본값에 따라 다르게 작동할 수 있습니다.

## 대안 (Alternatives)

### 상속이 기본적으로 활성화되고, 기본값은 설정 불가능

파일 디스크립터를 생성하는 함수에 새로운 선택적 `cloexec` 매개변수를 추가합니다. `cloexec` 매개변수의 기본값은 `False`이며, 이 기본값은 변경할 수 없습니다. 파일 디스크립터 상속이 기본적으로 활성화되는 것은 POSIX 및 Windows의 기본 동작과도 일치합니다. 이 대안은 가장 보수적인 옵션입니다.

이 옵션은 "배경" 섹션에 나열된 문제를 해결하지 못하며, 단지 문제를 해결하기 위한 도우미를 제공할 뿐입니다. 이러한 모든 문제를 해결하기 위해 애플리케이션에서 사용되는 각 모듈에서 파일 디스크립터를 생성하는 모든 함수를 수정하여 `cloexec=True`를 설정해야 합니다.

### 상속이 기본적으로 활성화되고, 기본값은 `True`로만 설정 가능

이 대안은 제안을 기반으로 합니다. 유일한 차이점은 `sys.setdefaultcloexec()`가 어떤 인수도 받지 않고, `cloexec` 매개변수의 기본값을 `True`로만 설정할 수 있다는 것입니다.

### 상속을 기본적으로 비활성화

이 대안은 제안을 기반으로 합니다. 유일한 차이점은 `cloexec` 매개변수의 기본값이 `True`라는 것입니다 (기존 `False` 대신).

자식 프로세스에 의해 파일이 상속되어야 하는 경우, `cloexec=False` 매개변수를 사용할 수 있습니다.

기본적으로 `close-on-exec` 플래그를 설정하는 것의 장점:
*   `exec` 시 FD (파일 디스크립터) 상속으로 인해 발생하는 문제로 고통받는 프로그램 (Inherited file descriptors issues 및 Security 참조)이 상속에 의존하는 프로그램 (Applications using inheritance of file descriptors 참조)보다 훨씬 많습니다.

기본적으로 `close-on-exec` 플래그를 설정하는 것의 단점:
*   "최소 놀람의 원칙" (principle of least surprise)을 위반합니다. `os` 모듈을 사용하는 개발자들은 Python이 POSIX 표준을 따르고 `close-on-exec` 플래그가 기본적으로 설정되지 않을 것이라고 예상할 수 있습니다. `os` 모듈은 시스템 호출 (C 표준 라이브러리의 함수)에 대한 얇은 래퍼 (thin wrapper)로 작성되었습니다. `close-on-exec` 플래그를 설정하는 원자적 플래그가 지원되지 않는 경우 (Appendix: Operating system support 참조), 단일 Python 함수 호출이 2개 또는 3개의 시스템 호출을 할 수 있습니다 (Performances 섹션 참조). 추가적인 시스템 호출이 있다면 Python을 느리게 할 수 있습니다 (Performances 참조).

하위 호환성: 파일 디스크립터 상속에 의존하는 프로그램은 소수에 불과하며, 일반적으로 하나 또는 몇 개의 파일 디스크립터만 전달합니다. 이러한 프로그램들은 `EBADF` 오류로 즉시 실패할 것이고, `cloexec=False` 매개변수를 추가하거나 `os.set_cloexec(fd, False)`를 사용하여 쉽게 수정할 수 있을 것입니다.

`subprocess` 모듈은 `Popen` 생성자의 `pass_fds` 매개변수에 나열된 파일 디스크립터의 `close-on-exec` 플래그를 해제하도록 어차피 변경될 것입니다. 따라서 이러한 프로그램들이 `subprocess` 모듈을 사용하는 경우 어떤 수정도 필요하지 않을 수 있습니다.

### `fork()` 이후 파일 디스크립터 닫기

이 PEP는 `exec()` 없이 `fork()`를 사용하는 애플리케이션의 문제를 해결하지 않습니다. Python은 `fork` 이후 호출될 콜백 (callback)을 등록하는 일반적인 프로세스가 필요하며, Issue #16500: `atfork` 모듈 추가를 참조하십시오. 이러한 레지스트리는 `fork()` 직후 파일 디스크립터를 닫는 데 사용될 수 있습니다.

단점:
*   Windows에서는 `fork()`가 존재하지 않으므로 Windows에서는 이 문제가 해결되지 않습니다.
*   이 대안은 `fork()` 없이 `exec()`를 사용하는 프로그램의 문제를 해결하지 못합니다.
*   서드파티 모듈은 C 함수 `fork()`를 직접 호출할 수 있으며, 이 경우 "atfork" 콜백이 호출되지 않습니다.
*   파일 디스크립터를 생성하는 모든 함수는 콜백을 등록해야 하며, 파일이 닫힐 때 콜백을 등록 해제해야 합니다. 또는 열린 모든 파일 디스크립터 목록이 유지되어야 합니다.
*   파일 디스크립터를 자동으로 닫는 것은 Python보다는 운영 체제가 더 적합한 곳입니다. 예를 들어, 파일을 닫는 것과 파일을 닫는 콜백을 등록 해제하는 것 사이의 경합 조건을 피하기는 쉽지 않습니다.

### `open()`: 모드에 "e" 플래그 추가

새로운 "e" 모드는 `close-on-exec` 플래그를 (최선을 다해) 설정할 것입니다.

이 대안은 `open()`에 대한 문제만 해결합니다. `socket.socket()` 및 `os.pipe()`에는 예를 들어 `mode` 매개변수가 없습니다.

GNU libc는 버전 2.7부터 `fopen()`에 "e" 플래그를 지원합니다. 이는 `O_CLOEXEC`가 사용 가능하면 사용하고, 그렇지 않으면 `fcntl(fd, F_SETFD, FD_CLOEXEC)`를 사용합니다. Visual Studio에서는 `fopen()`이 `O_NOINHERIT`를 사용하는 "N" 플래그를 허용합니다.

### 새로운 매개변수 이름에 대한 논의

*   `inherit`, `inherited`: Windows 정의에 더 가깝습니다.
*   `sensitive`, `sterile`: "자손을 생산하지 않는다"는 의미입니다.

## 파일 디스크립터 상속을 사용하는 애플리케이션

대부분의 개발자는 파일 디스크립터가 기본적으로 상속된다는 사실을 알지 못합니다. 대부분의 프로그램은 파일 디스크립터 상속에 의존하지 않습니다. 예를 들어, `subprocess.Popen`은 Python 3.2에서 자식 프로세스에서 기본적으로 2번보다 큰 모든 파일 디스크립터를 닫도록 변경되었습니다. 아직 이 동작 변경에 대해 불평한 사용자는 없습니다.

`fork`를 사용하는 네트워크 서버는 클라이언트 소켓을 자식 프로세스로 전달하고 싶을 수 있습니다. 예를 들어, UNIX에서 CGI 서버는 `dup2()`를 사용하여 파일 디스크립터 0 (`stdin`) 및 1 (`stdout`)을 통해 클라이언트 소켓을 전달합니다.

TCP 포트 1024 미만의 포트에서 소켓을 리스닝하거나 암호와 같은 민감한 데이터를 포함하는 파일을 읽는 것과 같은 제한된 리소스에 접근하기 위한 일반적인 관행은 다음과 같습니다. 루트 사용자 (root user)로 시작하여 파일 디스크립터를 생성하고, 자식 프로세스를 생성한 다음, 권한을 포기하고 (예: 현재 사용자 변경), 파일 디스크립터를 자식 프로세스로 전달한 후 부모 프로세스를 종료합니다.

이러한 사용 사례에서는 보안이 매우 중요합니다. 다른 파일 디스크립터를 누출하는 것은 심각한 보안 취약점이 될 것입니다 (Security 참조). 루트 프로세스는 종료하지 않고 자식 프로세스를 모니터링할 수 있으며, 이전 자식 프로세스가 충돌하면 새로운 자식 프로세스를 재시작하고 동일한 파일 디스크립터를 전달할 수 있습니다.

명령줄 옵션을 사용하여 부모 프로세스로부터 파일 디스크립터를 가져오는 프로그램의 예:
*   `gpg`: `--status-fd <fd>`, `--logger-fd <fd>` 등
*   `openssl`: `-pass fd:<fd>`
*   `qemu`: `-add-fd <fd>`
*   `valgrind`: `--log-fd=<fd>`, `--input-fd=<fd>` 등
*   `xterm`: `-S <fd>`

Linux에서는 `/dev/fd/<fd>` 파일 이름을 사용하여 파일 이름을 예상하는 프로그램에 파일 디스크립터를 전달하는 것이 가능합니다.

## 성능 (Performances)

`close-on-exec` 플래그를 설정하는 것은 새 파일 디스크립터 생성마다 추가적인 시스템 호출 (syscall)을 요구할 수 있습니다. 추가 시스템 호출의 수는 플래그를 설정하는 데 사용되는 방법에 따라 달라집니다.

*   `O_NOINHERIT`: 추가 시스템 호출 없음
*   `O_CLOEXEC`: 하나의 추가 시스템 호출이 발생하지만, 플래그 지원 여부를 확인하기 위해 첫 파일 디스크립터 생성 시에만 발생합니다. 만약 플래그가 지원되지 않으면, Python은 다음 방법으로 폴백(fallback)해야 합니다.
*   `ioctl(fd, FIOCLEX)`: 파일 디스크립터당 하나의 추가 시스템 호출
*   `fcntl(fd, F_SETFD, flags)`: 파일 디스크립터당 두 개의 추가 시스템 호출이 발생하며, 하나는 이전 플래그를 가져오는 데, 다른 하나는 새 플래그를 설정하는 데 사용됩니다.

Linux에서 `close-on-exec` 플래그를 설정하는 것은 성능에 미치는 오버헤드가 낮습니다. Linux 3.6에서 `bench_cloexec.py`의 벤치마크 결과:
*   `close-on-exec` 플래그 미설정: 7.8 us
*   `O_CLOEXEC`: 1% 느림 (7.9 us)
*   `ioctl()`: 3% 느림 (8.0 us)
*   `fcntl()`: 3% 느림 (8.0 us)

## 구현 (Implementation)

### `os.get_cloexec(fd)`

파일 디스크립터의 `close-on-exec` 플래그를 가져옵니다.

의사 코드:
```python
if os.name == 'nt':
    def get_cloexec(fd):
        handle = _winapi._get_osfhandle(fd)
        flags = _winapi.GetHandleInformation(handle)
        return not(flags & _winapi.HANDLE_FLAG_INHERIT)
else:
    try:
        import fcntl
    except ImportError:
        pass
    else:
        def get_cloexec(fd):
            flags = fcntl.fcntl(fd, fcntl.F_GETFD)
            return bool(flags & fcntl.FD_CLOEXEC)
```

### `os.set_cloexec(fd, cloexec=True)`

파일 디스크립터에 `close-on-exec` 플래그를 설정하거나 해제합니다. 이 플래그는 파일 디스크립터 생성 이후에 설정되므로 원자적 (atomic)이지 않습니다.

의사 코드:
```python
if os.name == 'nt':
    def set_cloexec(fd, cloexec=True):
        handle = _winapi._get_osfhandle(fd)
        mask = _winapi.HANDLE_FLAG_INHERIT
        if cloexec:
            flags = 0
        else:
            flags = mask
        _winapi.SetHandleInformation(handle, mask, flags)
else:
    fnctl = None
    ioctl = None
    try:
        import ioctl
    except ImportError:
        try:
            import fcntl
        except ImportError:
            pass
    if ioctl is not None and hasattr('FIOCLEX', ioctl):
        def set_cloexec(fd, cloexec=True):
            if cloexec:
                ioctl.ioctl(fd, ioctl.FIOCLEX)
            else:
                ioctl.ioctl(fd, ioctl.FIONCLEX)
    elif fnctl is not None:
        def set_cloexec(fd, cloexec=True):
            flags = fcntl.fcntl(fd, fcntl.F_GETFD)
            if cloexec:
                flags |= FD_CLOEXEC
            else:
                flags &= ~FD_CLOEXEC
            fcntl.fcntl(fd, fcntl.F_SETFD, flags)
```
`fcntl`보다 `ioctl`이 선호되는데, `ioctl`은 단일 시스템 호출만 필요한 반면 `fcntl`은 두 개의 시스템 호출이 필요하기 때문입니다.

참고: `fcntl(fd, F_SETFD, flags)`는 하나의 플래그 (`FD_CLOEXEC`)만 지원하므로 `fcntl(fd, F_GETFD)`를 피할 수 있습니다. 하지만 미래에 다른 플래그를 삭제할 수도 있으므로, 두 함수 호출을 유지하는 것이 더 안전합니다.

참고: GNU libc의 `fopen()` 함수는 `fcntl(fd, F_SETFD, flags)`가 실패하더라도 오류를 무시합니다.

### `open()`

*   Windows: `open()` with `O_NOINHERIT` flag [원자적]
*   `open()` with `O_CLOEXEC` flag [원자적]
*   `open()` + `os.set_cloexec(fd, True)` [최선 노력 (best-effort)]

### `os.dup()`

*   Windows: `DuplicateHandle()` [원자적]
*   `fcntl(fd, F_DUPFD_CLOEXEC)` [원자적]
*   `dup()` + `os.set_cloexec(fd, True)` [최선 노력]

### `os.dup2()`

*   `fcntl(fd, F_DUP2FD_CLOEXEC, fd2)` [원자적]
*   `dup3()` with `O_CLOEXEC` flag [원자적]
*   `dup2()` + `os.set_cloexec(fd, True)` [최선 노력]

### `os.pipe()`

*   Windows: `CreatePipe()` with `SECURITY_ATTRIBUTES.bInheritHandle=TRUE`, or `_pipe()` with `O_NOINHERIT` flag [원자적]
*   `pipe2()` with `O_CLOEXEC` flag [원자적]
*   `pipe()` + `os.set_cloexec(fd, True)` [최선 노력]

### `socket.socket()`

*   Windows: `WSASocket()` with `WSA_FLAG_NO_HANDLE_INHERIT` flag [원자적]
*   `socket()` with `SOCK_CLOEXEC` flag [원자적]
*   `socket()` + `os.set_cloexec(fd, True)` [최선 노력]

### `socket.socketpair()`

*   `socketpair()` with `SOCK_CLOEXEC` flag [원자적]
*   `socketpair()` + `os.set_cloexec(fd, True)` [최선 노력]

### `socket.socket.accept()`

*   `accept4()` with `SOCK_CLOEXEC` flag [원자적]
*   `accept()` + `os.set_cloexec(fd, True)` [최선 노력]

## 하위 호환성 (Backward compatibility)

하위 호환성을 깨는 변경 사항은 없습니다. 기본 동작은 변경되지 않으며, `close-on-exec` 플래그는 기본적으로 설정되지 않습니다.

## 부록: 운영 체제 지원 (Appendix: Operating system support)

### Windows

Windows에는 "자식 프로세스에서 상속하지 않음"을 의미하는 `O_NOINHERIT` 플래그가 있습니다. 예를 들어, `open()` 및 `_pipe()`에서 지원됩니다. 이 플래그는 `SetHandleInformation(fd, HANDLE_FLAG_INHERIT, 0)`을 사용하여 해제할 수 있습니다.

`CreateProcess()`는 `bInheritHandles` 매개변수를 가지고 있습니다. 이 값이 `FALSE`이면 핸들은 상속되지 않습니다. `TRUE`이면 `HANDLE_FLAG_INHERIT` 플래그가 설정된 핸들이 상속됩니다. `subprocess.Popen`은 `close_fds` 옵션을 사용하여 `bInheritHandles`를 정의합니다.

### `ioctl`

함수:
*   `ioctl(fd, FIOCLEX, 0)`: `close-on-exec` 플래그 설정
*   `ioctl(fd, FIONCLEX, 0)`: `close-on-exec` 플래그 해제

가용성: Linux, Mac OS X, QNX, NetBSD, OpenBSD, FreeBSD.

### `fcntl`

함수:
*   `flags = fcntl(fd, F_GETFD); fcntl(fd, F_SETFD, flags | FD_CLOEXEC)`: `close-on-exec` 플래그 설정
*   `flags = fcntl(fd, F_GETFD); fcntl(fd, F_SETFD, flags & ~FD_CLOEXEC)`: `close-on-exec` 플래그 해제

가용성: AIX, Digital UNIX, FreeBSD, HP-UX, IRIX, Linux, Mac OS X, OpenBSD, Solaris, SunOS, Unicos.

### 원자적 플래그 (Atomic flags)

새로운 플래그:
*   `O_CLOEXEC`: Linux (2.6.23), FreeBSD (8.3), OpenBSD 5.0, Solaris 11, QNX, BeOS, 다음 NetBSD 릴리스 (6.1?)에서 사용 가능합니다. 이 플래그는 POSIX.1-2008의 일부입니다.
*   `socket()` 및 `socketpair()`를 위한 `SOCK_CLOEXEC` 플래그: Linux 2.6.27, OpenBSD 5.2, NetBSD 6.0에서 사용 가능합니다.
*   `WSASocket()`를 위한 `WSA_FLAG_NO_HANDLE_INHERIT` 플래그: Windows 7 SP1, Windows Server 2008 R2 SP1 및 이후 버전에서 지원됩니다.
*   `fcntl()`: `F_DUPFD_CLOEXEC` 플래그: Linux 2.6.24, OpenBSD 5.0, FreeBSD 9.1, NetBSD 6.0, Solaris 11에서 사용 가능합니다. 이 플래그는 POSIX.1-2008의 일부입니다.
*   `fcntl()`: `F_DUP2FD_CLOEXEC` 플래그: FreeBSD 9.1 및 Solaris 11에서 사용 가능합니다.
*   `recvmsg()`: `MSG_CMSG_CLOEXEC`: Linux 2.6.23, NetBSD 6.0에서 사용 가능합니다.

Linux 2.6.23 이전 버전에서는 `O_CLOEXEC` 플래그가 단순히 무시됩니다. 따라서 `fcntl()`을 호출하여 플래그가 지원되는지 확인해야 합니다. 작동하지 않으면 `ioctl()` 또는 `fcntl()`을 사용하여 플래그를 설정해야 합니다.

Linux 2.6.27 이전 버전에서는 `SOCK_CLOEXEC` 플래그가 소켓 유형에 설정되면 `socket()` 또는 `socketpair()`가 실패하고 `errno`가 `EINVAL`로 설정됩니다.

Windows XPS3에서는 `WSA_FLAG_NO_HANDLE_INHERIT` 플래그를 사용하면 `WSASocket()`이 `WSAEPROTOTYPE` 오류를 반환합니다.

새로운 함수:
*   `dup3()`: Linux 2.6.27 (및 glibc 2.9)에서 사용 가능합니다.
*   `pipe2()`: Linux 2.6.27 (및 glibc 2.9)에서 사용 가능합니다.
*   `accept4()`: Linux 2.6.28 (및 glibc 2.10)에서 사용 가능합니다.

Linux 2.6.28 이전 버전에서 `accept4()`를 호출하면 `accept4()`는 -1 (실패)을 반환하고 `errno`는 `ENOSYS`로 설정됩니다.

## 링크 (Links)

*   Secure File Descriptor Handling (Ulrich Drepper, 2008)
*   Tornado 프로젝트의 `win32_support.py`: `SetHandleInformation(fd, HANDLE_FLAG_INHERIT, 1)`을 사용하여 `fcntl(fd, F_SETFD, FD_CLOEXEC)` 에뮬레이션
*   LKML: [PATCH] `nextfd(2)`

Python 이슈:
*   #10115: 소켓 생성 시 플래그의 원자적 설정을 위한 `accept4()` 지원
*   #12105: `open()`이 `O_CLOEXEC`와 같은 플래그를 설정할 수 없음
*   #12107: `FD_CLOEXEC` 플래그 없이 생성된 TCP 리스닝 소켓
*   #16500: `atfork` 모듈 추가
*   #16850: `open()`에 "e" 모드 추가: `close-and-exec` (`O_CLOEXEC`) / `O_NOINHERIT`
*   #16860: `tempfile` 모듈에서 `O_CLOEXEC` 사용
*   #17036: PEP 433 구현
*   #16946: `subprocess`: `_close_open_fd_range_safe()`는 `O_CLOEXEC`가 정의되어 있어도 Linux < 2.6.23에서 `close-on-exec` 플래그를 설정하지 않음
*   #17070: PEP 433: 새로운 `cloexec`를 사용하여 보안 개선 및 버그 방지

다른 언어:
*   Perl은 새로 생성된 파일 디스크립터의 번호가 `$SYSTEM_FD_MAX` (`$^F`)보다 큰 경우 `close-on-exec` 플래그를 설정합니다. Perl 1부터 존재했습니다.
*   Ruby: `FD_CLOEXEC` for all `fds` (0, 1, 2 제외) 설정. `Kernel::open`에 `O_CLOEXEC` 플래그 누락: 커밋은 나중에 되돌려졌습니다.
*   OCaml: PR#5256: `Unix.open_process*`를 사용하여 열린 프로세스는 모든 열린 파일 디스크립터 (소켓 포함)를 상속합니다. OCaml에는 `Unix.set_close_on_exec` 함수가 있습니다.

## 각주 (Footnotes)

 UNIX에서 Python 3.2부터 `subprocess.Popen()`은 기본적으로 모든 파일 디스크립터를 닫습니다 (`close_fds=True`). 이는 3번을 포함하여 `local_max_fd` (NetBSD에서는 `fcntl(0, F_MAXFD)`, 그 외에는 `sysconf(_SC_OPEN_MAX)`) 미만까지의 파일 디스크립터를 닫습니다. 만약 오류 파이프의 디스크립터가 3보다 작으면 `ValueError`가 발생합니다.

## 저작권 (Copyright)

이 문서는 공개 도메인으로 지정되었습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.