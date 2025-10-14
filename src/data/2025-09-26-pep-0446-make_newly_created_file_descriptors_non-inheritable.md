---
title: "[Final] PEP 446 - Make newly created file descriptors non-inheritable"
excerpt: "Python Enhancement Proposal 446: 'Make newly created file descriptors non-inheritable'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/446/
toc: true
toc_sticky: true
date: 2025-09-26 21:58:51+0900
last_modified_at: 2025-09-26 21:58:51+0900
published: true
---
> **원문 링크:** [PEP 446 - Make newly created file descriptors non-inheritable](https://peps.python.org/pep-0446/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 05-Aug-2013



## PEP 446: 새로 생성되는 파일 디스크립터를 기본적으로 비상속으로 만들기

### 요약 (Abstract)
자식 프로세스로 파일 디스크립터가 누출(leaking)되는 것은 다양한 문제를 야기하며, 주요 보안 취약점으로 알려져 있습니다. `subprocess` 모듈에서 `close_fds=True` 매개변수를 사용하는 것이 모든 경우에 가능한 것은 아닙니다.

이 PEP는 이러한 문제의 위험을 줄이기 위해 Python에 의해 새로 생성되는 모든 파일 디스크립터를 기본적으로 비상속(non-inheritable)으로 만들 것을 제안합니다. 또한, 이 PEP는 비상속 파일 디스크립터를 생성하기 위한 원자적(atomic) 플래그를 지원하는 운영체제에서 다중 스레드 애플리케이션의 경쟁 조건(race condition)을 수정합니다.

이 변경 사항이 코드 호환성에 영향을 미칠 수 있음을 인지하고 있지만, 인류 전체의 이익을 위해 이를 진행합니다.

### 제안 배경 (Rationale)

#### 파일 디스크립터 상속
각 운영체제는 파일 디스크립터의 상속을 다르게 처리합니다. Windows는 기본적으로 비상속 핸들을 생성하는 반면, UNIX 및 Windows의 POSIX API는 기본적으로 상속 가능한(inheritable) 파일 디스크립터를 생성합니다. Python은 단일 코드 베이스를 유지하고 파일 디스크립터에 동일한 타입을 사용하기 위해 네이티브 Windows API보다 POSIX API를 선호하므로, 상속 가능한 파일 디스크립터를 생성해왔습니다.

`os.pipe()`는 Windows에서는 비상속 파이프를 생성하고, UNIX에서는 상속 가능한 파이프를 생성하는 예외가 있습니다. 이는 `os.pipe()`가 Windows에서는 네이티브 API인 `CreatePipe()`를 호출하고 UNIX에서는 POSIX API인 `pipe()`를 호출하는 구현상의 특징 때문입니다.

#### 상속 가능한 파일 디스크립터의 문제점
대부분의 경우, 자식 프로세스로 "누출"된 상속 가능한 파일 디스크립터는 큰 버그를 일으키지 않기 때문에 눈에 띄지 않을 수 있지만, 이는 문제를 해결하지 않아도 된다는 의미는 아닙니다.

상속된 파일 디스크립터와 관련된 두 가지 일반적인 문제점:
*   **Windows에서 디렉터리 제거 문제:** 디렉터리 내에 열린 모든 파일 핸들이 닫히기 전에는 디렉터리를 제거할 수 없습니다. 이는 파일 자체에도 해당될 수 있습니다.
*   **리스닝 소켓 재사용 불가:** 리스닝 소켓이 자식 프로세스로 누출되면, 부모 및 자식 프로세스가 모두 종료되기 전에는 소켓 주소를 재사용할 수 없습니다. 예를 들어, 웹 서버가 프로세스를 처리하기 위해 새 프로그램을 실행하고, 해당 프로그램이 완료되지 않은 상태에서 서버가 재시작되면, TCP 포트가 여전히 사용 중이므로 서버가 시작할 수 없습니다.

#### 보안 취약점
민감한 파일 핸들 및 파일 디스크립터의 누출은 보안 취약점으로 이어질 수 있습니다. 신뢰할 수 없는 자식 프로세스가 암호와 같은 민감한 데이터를 읽거나, 누출된 파일 디스크립터를 통해 부모 프로세스를 제어할 수 있습니다. 리스닝 소켓이 누출되면 자식 프로세스는 새로운 연결을 수락하여 민감한 데이터를 읽을 수 있습니다.

#### `subprocess` 모듈에서 수정된 문제
상속된 파일 디스크립터는 `subprocess` 모듈에서 4가지 문제를 일으켰습니다:
*   Issue #2320: `subprocess`에서 `stdin` 사용 시 경쟁 조건
*   Issue #3006: `subprocess.Popen`이 `close()` 후에도 소켓이 열린 상태로 유지되도록 함
*   Issue #7213: `subprocess`가 `Popen` 인스턴스 간에 열린 파일 디스크립터를 누출하여 중단 발생
*   Issue #12786: `stdin`이 닫혔을 때 `subprocess.wait()`가 멈춤

이러한 문제들은 Python 3.2에서 `subprocess` 모듈의 4가지 변경 사항을 통해 해결되었습니다.

#### 비상속 파일 디스크립터의 원자적 생성
다중 스레드 애플리케이션에서는 새 프로그램이 생성되기 직전에 상속 가능한 파일 디스크립터가 생성될 수 있으며, 이 파일 디스크립터가 비상속으로 설정되기 전에 자식 프로세스로 누출될 수 있습니다. 이러한 경쟁 조건은 파일 디스크립터가 생성될 때부터 비상속으로 직접 생성되면 피할 수 있습니다.

FreeBSD, Linux, Mac OS X, Windows 및 기타 여러 운영체제는 파일 디스크립터 생성 시 상속 플래그를 원자적으로 지워 비상속 파일 디스크립터를 생성하는 것을 지원합니다.

### 제안 (Proposal)

#### 비상속 파일 디스크립터
다음 함수들은 새로 생성되는 파일 디스크립터를 기본적으로 비상속으로 만들도록 수정됩니다.

*   `asyncore.dispatcher.create_socket()`
*   `io.FileIO`
*   `io.open()`
*   `open()`
*   `os.dup()`
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
*   `socket.socket.fromfd()`
*   `socket.socketpair()`

`os.dup2()`는 여전히 기본적으로 상속 가능하게 생성됩니다. 이는 `os.dup2()`의 가장 일반적인 사용 사례가 표준 스트림(stdin, stdout, stderr)의 파일 디스크립터를 대체하는 것이고, 표준 스트림은 자식 프로세스에 의해 상속될 것으로 예상되기 때문입니다.

원자적 플래그를 사용할 수 있는 경우, 파일 디스크립터를 비상속으로 만들기 위해 사용됩니다. 그러나 원자적 플래그를 사용할 수 없는 경우 대체(fallback)가 필요하므로 원자성은 항상 보장되지 않습니다.

#### 새로운 함수 및 메서드
모든 플랫폼에서 사용 가능한 새로운 함수:
*   `os.get_inheritable(fd: int)`: 파일 디스크립터가 자식 프로세스에 의해 상속될 수 있으면 `True`, 그렇지 않으면 `False`를 반환합니다.
*   `os.set_inheritable(fd: int, inheritable: bool)`: 지정된 파일 디스크립터의 상속 플래그를 설정합니다.

Windows에서만 사용 가능한 새로운 함수:
*   `os.get_handle_inheritable(handle: int)`: 핸들이 자식 프로세스에 의해 상속될 수 있으면 `True`, 그렇지 않으면 `False`를 반환합니다.
*   `os.set_handle_inheritable(handle: int, inheritable: bool)`: 지정된 핸들의 상속 플래그를 설정합니다.

새로운 메서드:
*   `socket.socket.get_inheritable()`: 소켓이 자식 프로세스에 의해 상속될 수 있으면 `True`, 그렇지 않으면 `False`를 반환합니다.
*   `socket.socket.set_inheritable(inheritable: bool)`: 지정된 소켓의 상속 플래그를 설정합니다.

#### 기타 변경 사항
*   UNIX에서 `subprocess`는 `pass_fds` 매개변수의 파일 디스크립터를 상속 가능하게 만듭니다. 이 파일 디스크립터는 `fork()` 후 `execv()` 전에 자식 프로세스에서 상속 가능하게 되므로, 부모 프로세스의 파일 디스크립터 상속 플래그는 변경되지 않습니다.
*   `os.dup2()`에 새로운 선택적 `inheritable` 매개변수가 추가되었습니다: `os.dup2(fd, fd2, inheritable=True)`. `fd2`는 기본적으로 상속 가능하게 생성되지만, `inheritable`이 `False`인 경우 비상속으로 생성됩니다.

### 하위 호환성 (Backward Compatibility)
이 PEP는 파일 디스크립터 상속에 의존하는 애플리케이션의 동작을 변경합니다. 개발자들은 파일 디스크립터 상속을 이식성 있게 처리하는 고수준 Python 모듈인 `subprocess`를 재사용할 것을 권장합니다.

`subprocess` 모듈을 `pass_fds` 매개변수와 함께 사용하거나, 표준 스트림을 리디렉션하기 위해 `os.dup2()`만 사용하는 애플리케이션은 영향을 받지 않을 것입니다.

파일 디스크립터가 기본적으로 비상속으로 만들어지므로, Python은 더 이상 POSIX를 따르지 않습니다. 하지만 Python은 POSIX를 준수하도록 설계된 것이 아니라 이식 가능한 애플리케이션을 개발하도록 설계되었습니다.

### 관련 작업 (Related Work)
Go, Perl, Ruby와 같은 프로그래밍 언어는 새로 생성되는 파일 디스크립터를 기본적으로 비상속으로 만듭니다.

*   Go 1.0 (2009년) 이후
*   Perl 1.0 (1987년) 이후
*   Ruby 2.0 (2013년) 이후

Python으로 작성된 SCons 프로젝트는 Windows에서 파일을 비상속으로 만들기 위해 내장 함수 `file()` 및 `open()`을 재정의합니다.

### 거부된 대안 (Rejected Alternatives)

#### 새로운 `open_noinherit()` 함수 추가
2007년 6월, Henning von Bargen은 자식 프로세스의 상속된 파일 디스크립터 문제를 해결하기 위해 새로운 `open_noinherit()` 함수를 추가할 것을 제안했습니다. 당시 `subprocess` 모듈의 `close_fds` 매개변수 기본값은 `False`였습니다.

#### PEP 433
PEP 433, "파일 디스크립터 상속의 더 쉬운 억제(Easier suppression of file descriptor inheritance)"는 다양한 다른 대안을 제안했지만, 합의에 도달하지 못했던 이전 시도였습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.