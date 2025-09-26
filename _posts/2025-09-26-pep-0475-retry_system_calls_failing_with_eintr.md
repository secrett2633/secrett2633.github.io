---
title: "[Final] PEP 475 - Retry system calls failing with EINTR"
excerpt: "Python Enhancement Proposal 475: 'Retry system calls failing with EINTR'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/475/
toc: true
toc_sticky: true
date: 2025-09-26 22:21:40+0900
last_modified_at: 2025-09-26 22:21:40+0900
published: true
---
> **원문 링크:** [PEP 475 - Retry system calls failing with EINTR](https://peps.python.org/pep-0475/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 29-Jul-2014

## PEP 475 – `EINTR` 오류로 실패하는 시스템 호출 재시도

### 초록 (Abstract)

표준 라이브러리에서 제공하는 시스템 호출 래퍼(wrapper)는 `EINTR` 오류로 실패할 경우 자동으로 재시도해야 합니다. 이는 애플리케이션 코드에서 이러한 재시도 로직을 직접 처리해야 하는 부담을 덜어주기 위함입니다. 여기서 "시스템 호출"이란 I/O 또는 기타 시스템 자원 처리에 관련된 표준 C 라이브러리 함수들을 의미합니다.

### 배경 (Rationale)

#### 중단된 시스템 호출 (Interrupted system calls)

POSIX 시스템에서 시그널(signal)은 흔하게 발생하며, 시스템 호출을 호출하는 코드는 이러한 시그널을 처리할 준비가 되어 있어야 합니다. 일반적인 시그널의 예시는 다음과 같습니다.

*   `SIGINT`: Ctrl+C를 눌렀을 때 발생하는 가장 흔한 시그널입니다. Python은 기본적으로 이 시그널을 받으면 `KeyboardInterrupt` 예외를 발생시킵니다.
*   `SIGCHLD`: 자식 프로세스가 종료될 때 서브프로세스(subprocesses)에서 발생합니다.
*   `SIGWINCH`: 터미널 크기를 조절할 때 터미널에서 실행 중인 애플리케이션에 전송됩니다.
*   `SIGCONT`: 애플리케이션을 백그라운드로 전환할 때(예: Ctrl+Z를 누른 후 `bg` 명령어를 입력) 전송됩니다.

C 시그널 핸들러를 작성하는 것은 어렵습니다. "비동기-시그널-안전(async-signal-safe)" 함수만 호출할 수 있고(`printf()`와 `malloc()`은 async-signal-safe가 아님), 재진입(reentrancy) 문제가 있기 때문입니다. 따라서 시스템 호출 실행 중에 프로세스가 시그널을 받으면, 프로그램이 시그널-안전 함수에 대한 제약 없이 시그널을 처리할 기회를 주기 위해 시스템 호출이 `EINTR` 오류와 함께 실패할 수 있습니다.

이러한 동작은 시스템에 따라 다릅니다. 특정 시스템에서는 `SA_RESTART` 플래그를 사용하여 일부 시스템 호출이 `EINTR`로 실패하는 대신 자동으로 재시도됩니다. 그러나 Python의 `signal.signal()` 함수는 시그널 핸들러를 설정할 때 `SA_RESTART` 플래그를 지웁니다. 이로 인해 Python에서는 모든 시스템 호출이 `EINTR`로 실패할 가능성이 높습니다.

시그널 수신은 예외적인 상황이 아니므로, 견고한 POSIX 코드는 `EINTR`를 처리할 준비가 되어 있어야 합니다 (대부분의 경우, 이는 호출이 결국 성공하기를 바라면서 루프에서 재시도하는 것을 의미합니다). Python의 특별한 지원 없이는 애플리케이션 코드가 필요 이상으로 장황해질 수 있습니다.

#### Python 3.4의 현황 (Status in Python 3.4)

Python 3.4에서는 `InterruptedError` 예외(`EINTR` 전용 예외 클래스) 처리가 모든 호출 지점(call site)에서 개별적으로 중복되어 있었습니다. 실제로 이 예외를 처리하는 Python 모듈은 몇 개에 불과했으며, 수정 사항이 전체 모듈에 적용되기까지는 보통 몇 년이 걸렸습니다.

`InterruptedError` 발생 시 `file.read()`를 재시도하는 코드 예시는 다음과 같습니다.

```python
while True:
    try:
        data = file.read(size)
        break
    except InterruptedError:
        continue
```

표준 라이브러리에서 `InterruptedError`를 처리하는 Python 모듈 목록은 다음과 같습니다.

*   `asyncio`
*   `asyncore`
*   `io`, `_pyio`
*   `multiprocessing`
*   `selectors`
*   `socket`
*   `socketserver`
*   `subprocess`

Perl, Java, Go와 같은 다른 프로그래밍 언어들은 `EINTR`로 실패하는 시스템 호출을 더 낮은 수준에서 재시도하므로, 라이브러리와 애플리케이션이 이에 대해 신경 쓸 필요가 없습니다.

#### 사용 사례 1: 시그널에 신경 쓰지 않기 (Use Case 1: Don't Bother With Signals)

대부분의 경우, 사용자는 시그널에 의해 중단되는 것을 원치 않으며 `InterruptedError` 예외를 예상하지 않습니다. 예를 들어, "Hello World" 예제를 위해 다음처럼 복잡한 코드를 작성하고 싶지는 않을 것입니다.

```python
while True:
    try:
        print("Hello World")
        break
    except InterruptedError:
        continue
```

`InterruptedError`는 예상치 못한 곳에서 발생할 수 있습니다. 예를 들어, `os.close()` 및 `FileIO.close()`도 `InterruptedError`를 발생시킬 수 있습니다.

이 사용 사례에서의 기대는 Python이 `InterruptedError`를 숨기고 시스템 호출을 자동으로 재시도하는 것입니다.

#### 사용 사례 2: 가능한 한 빨리 시그널 알림 받기 (Use Case 2: Be notified of signals as soon as possible)

때로는 특정 시그널을 예상하고 가능한 한 빨리 처리하기를 원할 수도 있습니다. 예를 들어, Ctrl+C 단축키를 사용하여 프로그램을 즉시 종료하고 싶을 수 있습니다.

또한, 일부 시그널은 애플리케이션을 방해해서는 안 됩니다. 특정 시그널에만 애플리케이션을 중단시키는 두 가지 옵션이 있습니다.

1.  `SIGINT`에 대해 `KeyboardInterrupt`와 같은 예외를 발생시키는 사용자 정의 시그널 핸들러를 설정합니다.
2.  `select()`와 같은 I/O 멀티플렉싱 함수를 Python의 시그널 wakeup 파일 디스크립터와 함께 사용합니다 (`signal.set_wakeup_fd()` 함수 참고).

이 사용 사례에서의 기대는 Python 시그널 핸들러가 제때 실행되고, 핸들러가 예외를 발생시키면 시스템 호출이 실패하고, 그렇지 않으면 재시작하는 것입니다.

### 제안 (Proposal)

이 PEP는 `EINTR`를 처리하고 재시도를 가장 낮은 수준, 즉 표준 라이브러리(stdlib)에서 제공하는 래퍼에서 처리할 것을 제안합니다 (상위 수준 라이브러리나 애플리케이션이 아닌).

구체적으로, 시스템 호출이 `EINTR`로 실패하면 해당 Python 래퍼는 주어진 시그널 핸들러를 호출해야 합니다 (`PyErr_CheckSignals()` 사용). 시그널 핸들러가 예외를 발생시키면 Python 래퍼는 중단되고 해당 예외와 함께 실패합니다.

시그널 핸들러가 성공적으로 반환되면 Python 래퍼는 시스템 호출을 자동으로 재시도합니다. 시스템 호출에 타임아웃(timeout) 매개변수가 포함된 경우, 타임아웃은 다시 계산됩니다.

#### 수정된 함수 (Modified functions)

이 PEP를 준수하기 위해 수정되어야 할 표준 라이브러리 함수의 예시는 다음과 같습니다.

*   `open()`, `os.open()`, `io.open()`
*   `faulthandler` 모듈의 함수
*   `os` 함수:
    *   `os.fchdir()`
    *   `os.fchmod()`
    *   `os.fchown()`
    *   `os.fdatasync()`
    *   `os.fstat()`
    *   `os.fstatvfs()`
    *   `os.fsync()`
    *   `os.ftruncate()`
    *   `os.mkfifo()`
    *   `os.mknod()`
    *   `os.posix_fadvise()`
    *   `os.posix_fallocate()`
    *   `os.pread()`
    *   `os.pwrite()`
    *   `os.read()`
    *   `os.readv()`
    *   `os.sendfile()`
    *   `os.wait3()`
    *   `os.wait4()`
    *   `os.wait()`
    *   `os.waitid()`
    *   `os.waitpid()`
    *   `os.write()`
    *   `os.writev()`
    *   특수 사례: `os.close()` 및 `os.dup2()`는 이제 `EINTR` 오류를 무시하며, 시스템 호출은 재시도되지 않습니다.
*   `select.select()`, `select.poll.poll()`, `select.epoll.poll()`, `select.kqueue.control()`, `select.devpoll.poll()`
*   `socket.socket()` 메서드:
    *   `accept()`
    *   `connect()` (논블로킹(non-blocking) 소켓 제외)
    *   `recv()`
    *   `recvfrom()`
    *   `recvmsg()`
    *   `send()`
    *   `sendall()`
    *   `sendmsg()`
    *   `sendto()`
*   `signal.sigtimedwait()`, `signal.sigwaitinfo()`
*   `time.sleep()`

`os.close`, `close()` 메서드 및 `os.dup2()`는 특수 사례로, 재시도하는 대신 `EINTR`를 무시합니다. 이는 복잡한 이유 때문이며, Linux에서의 동작과 파일 디스크립터가 `EINTR`가 반환되더라도 실제로 닫힐 수 있다는 사실과 관련이 있습니다.

`socket.socket.connect()` 메서드는 시그널에 의해 중단될 경우(EINTR로 실패할 경우) 논블로킹 소켓에 대해 `connect()`를 재시도하지 않습니다. 연결은 백그라운드에서 비동기적으로 실행됩니다. 호출자는 소켓이 쓰기 가능해질 때까지 기다린 다음(`select.select()` 사용 등) `socket.socket.getsockopt(socket.SOL_SOCKET, socket.SO_ERROR)`를 호출하여 연결 성공 여부를 확인해야 합니다.

#### `InterruptedError` 처리 (InterruptedError handling)

중단된 시스템 호출이 자동으로 재시도되므로, 해당 시스템 호출을 호출할 때 `InterruptedError` 예외가 더 이상 발생하지 않아야 합니다. 따라서 "Python 3.4의 현황"에서 설명된 `InterruptedError`의 수동 처리는 제거될 수 있으며, 이는 표준 라이브러리 코드를 단순화할 것입니다.

#### 하위 호환성 (Backward compatibility)

시스템 호출이 `InterruptedError`로 중단된다는 사실에 의존하는 애플리케이션은 중단(hang)될 것입니다. 이 PEP의 저자들은 그러한 애플리케이션이 존재한다고 생각하지 않습니다. 왜냐하면 그런 애플리케이션들은 경쟁 조건(race condition)과 같은 다른 문제에 노출될 것이기 때문입니다 (시스템 호출 전에 시그널이 오면 데드락(deadlock) 가능성이 있습니다). 게다가, 그러한 코드는 이식성이 없습니다.

어떤 경우든, 그러한 애플리케이션은 모든 플랫폼과 모든 Python 버전에서 신뢰할 수 있는 동작을 위해 시그널을 다르게 처리하도록 수정되어야 합니다. 가능한 전략은 잘 정의된 예외를 발생시키는 시그널 핸들러를 설정하거나, wakeup 파일 디스크립터를 사용하는 것입니다.

이벤트 루프(event loop)를 사용하는 애플리케이션의 경우, 시그널 처리를 위해 `signal.set_wakeup_fd()`가 권장되는 옵션입니다. Python의 저수준 시그널 핸들러는 시그널 번호를 파일 디스크립터에 기록하고 이벤트 루프는 이를 읽기 위해 깨어날 것입니다. 이벤트 루프는 시그널 핸들러의 제약 없이 이러한 시그널을 처리할 수 있습니다 (예: 루프는 메인 스레드뿐만 아니라 모든 스레드에서 깨어날 수 있습니다).

### 부록 (Appendix)

#### Wakeup 파일 디스크립터 (Wakeup file descriptor)

Python 3.3부터 `signal.set_wakeup_fd()`는 시그널 번호를 파일 디스크립터에 기록하며, 이전에는 널 바이트만 기록했습니다. 이를 통해 wakeup 파일 디스크립터를 사용하여 시그널을 구별할 수 있게 되었습니다.

Linux에는 각 시그널에 대한 더 많은 정보를 제공하는 `signalfd()` 시스템 호출이 있습니다. 예를 들어, 시그널을 보낸 프로세스의 PID와 UID를 알 수 있습니다. 이 함수는 아직 Python에 노출되지 않았습니다.

Unix에서 `asyncio` 모듈은 wakeup 파일 디스크립터를 사용하여 이벤트 루프를 깨웁니다.

#### 다중 스레딩 (Multithreading)

C 시그널 핸들러는 어떤 스레드에서든 호출될 수 있지만, Python 시그널 핸들러는 항상 메인 Python 스레드에서 호출됩니다.

Python의 C API는 메인 Python 스레드를 중단시키기 위해 `SIGINT` 시그널 핸들러를 호출하는 `PyErr_SetInterrupt()` 함수를 제공합니다.

#### Windows에서의 시그널 (Signals on Windows)

##### 제어 이벤트 (Control events)

Windows는 "제어 이벤트(control events)"를 사용합니다.

*   `CTRL_BREAK_EVENT`: Break (`SIGBREAK`)
*   `CTRL_CLOSE_EVENT`: Close event
*   `CTRL_C_EVENT`: CTRL+C (`SIGINT`)
*   `CTRL_LOGOFF_EVENT`: Logoff
*   `CTRL_SHUTDOWN_EVENT`: Shutdown

`SetConsoleCtrlHandler()` 함수를 사용하여 제어 핸들러를 설치할 수 있습니다.

`CTRL_C_EVENT` 및 `CTRL_BREAK_EVENT` 이벤트는 `GenerateConsoleCtrlEvent()` 함수를 사용하여 프로세스에 전송될 수 있습니다. 이 함수는 Python에서 `os.kill()`로 노출됩니다.

##### 시그널 (Signals)

Windows에서 지원되는 시그널은 다음과 같습니다.

*   `SIGABRT`
*   `SIGBREAK` (`CTRL_BREAK_EVENT`): Windows에서만 사용 가능한 시그널
*   `SIGFPE`
*   `SIGILL`
*   `SIGINT` (`CTRL_C_EVENT`)
*   `SIGSEGV`
*   `SIGTERM`

##### SIGINT

`SIGINT`에 대한 기본 Python 시그널 핸들러는 Windows 이벤트 객체인 `sigint_event`를 설정합니다.

`time.sleep()`은 `WaitForSingleObjectEx()`로 구현되며, `time.sleep()` 매개변수를 타임아웃으로 사용하여 `sigint_event` 객체를 기다립니다. 따라서 sleep은 `SIGINT`에 의해 중단될 수 있습니다.

`_winapi.WaitForMultipleObjects()`는 `sigint_event`를 감시하는 핸들 목록에 자동으로 추가하므로, 이 또한 중단될 수 있습니다.

`PyOS_StdioReadline()`도 `fgets()`가 실패했을 때 `Ctrl-C` 또는 `Ctrl-Z`가 눌렸는지 확인하기 위해 `sigint_event`를 사용했습니다.

### 구현 (Implementation)

이 PEP의 구현은 이슈 23285에서 추적되었습니다. 2015년 2월 7일에 커밋되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.