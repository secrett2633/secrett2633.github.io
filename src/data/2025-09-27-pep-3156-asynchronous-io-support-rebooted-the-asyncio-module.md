---
title: "[Final] PEP 3156 - Asynchronous IO Support Rebooted: the “asyncio” Module"
excerpt: "Python Enhancement Proposal 3156: 'Asynchronous IO Support Rebooted: the “asyncio” Module'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3156/
toc: true
toc_sticky: true
date: 2025-09-27 19:21:50+0900
last_modified_at: 2025-09-27 19:21:50+0900
published: true
---
> **원문 링크:** [PEP 3156 - Asynchronous IO Support Rebooted: the “asyncio” Module](https://peps.python.org/pep-3156/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 12-Dec-2012


## PEP 3156 – 비동기 I/O 지원 재정비: "asyncio" 모듈

**작성자:** Guido van Rossum
**상태:** Final
**타입:** Standards Track
**생성일:** 2012년 12월 12일
**Python 버전:** 3.3

### 요약 (Abstract)
이 문서는 Python 3 (Python 3.3부터)를 위한 비동기 I/O 제안입니다. PEP 3153에서 부족했던 구체적인 제안을 담고 있습니다. 이 제안에는 플러그인 가능한 (pluggable) 이벤트 루프, Twisted와 유사한 트랜스포트(transport) 및 프로토콜(protocol) 추상화, 그리고 `yield from` (PEP 380) 기반의 상위 수준 스케줄러가 포함됩니다. 제안된 패키지 이름은 `asyncio`입니다.

### 서론 (Introduction)

#### 상태 (Status)
'Tulip'이라는 코드명으로 참조 구현이 존재하며, 이 저장소를 기반으로 하는 패키지가 PyPI에 제공되어 Python 3.3 설치에서 `asyncio` 패키지를 사용할 수 있도록 합니다. 2013년 10월 20일부로 `asyncio` 패키지는 Python 3.4 저장소에 체크인되어 Python 3.4-alpha-4와 함께 "잠정적 (provisional)" API 상태로 릴리스되었습니다. 이는 API에 대한 초기 피드백을 늘리기 위한 조치이며, PEP의 강제적인 수용을 의미하지 않습니다. 이 패키지는 Python 3.4에서 잠정적 상태를 유지하고 Python 3.5에서 최종 상태로 진행될 예정입니다.

#### 의존성 (Dependencies)
제안된 많은 기능에는 Python 3.3이 필요합니다. 참조 구현 (Tulip)은 Python 3.3 이상의 새로운 언어나 표준 라이브러리 기능, 서드파티 모듈 또는 패키지, 그리고 C 코드(Windows의 선택적 IOCP 지원 제외)를 필요로 하지 않습니다.

#### 모듈 네임스페이스 (Module Namespace)
여기서의 명세는 새로운 최상위 패키지인 `asyncio`에 속합니다. 다양한 컴포넌트는 패키지의 별도 서브모듈에 위치합니다. 패키지는 각 서브모듈에서 공통 API를 임포트하여 패키지 속성으로 사용할 수 있도록 합니다 ( `email` 패키지와 유사). 덜 일반적인 API는 해당 서브모듈에서 명시적으로 임포트해야 하며, 이 경우 서브모듈 이름은 명세의 일부입니다.

#### 상호 운용성 (Interoperability)
이벤트 루프는 대부분의 상호 운용성이 발생하는 지점입니다. Twisted, Tornado 또는 gevent와 같은 프레임워크가 경량 어댑터 또는 프록시를 사용하여 기본 이벤트 루프 구현을 자체 요구 사항에 맞게 조정하거나, 자체 이벤트 루프 구현을 기반으로 기본 이벤트 루프 구현을 대체하는 것이 쉬워야 합니다.

이 상호 운용성을 효과적으로 만들기 위해, 서드파티 프레임워크에서 선호되는 적응 방향은 기본 이벤트 루프를 유지하고 이를 프레임워크의 API에 맞게 조정하는 것입니다. 이상적으로는 모든 서드파티 프레임워크가 자체 이벤트 루프 구현을 표준 구현으로 대체하는 것이 좋습니다.

두 가지 적응 방향을 모두 지원하기 위해 두 개의 별도 API가 지정됩니다.
*   현재 이벤트 루프를 관리하기 위한 인터페이스.
*   적합한 (conforming) 이벤트 루프의 인터페이스.

이벤트 루프 API는 `await`/`yield from`에 의존하지 않습니다. 대신 콜백, 추가 인터페이스 (트랜스포트 및 프로토콜) 및 `Future`를 조합하여 사용합니다. `Future`는 PEP 3148에 정의된 것과 유사하지만, 다른 구현을 가지며 스레드에 묶여 있지 않습니다.

콜백 사용을 좋아하지 않는 사용자를 위해, PEP 380의 `yield from` 또는 PEP 492의 `await` 표현식을 사용하여 코루틴으로 비동기 I/O 코드를 작성하기 위한 스케줄러가 제공됩니다. 스케줄러는 플러그인 가능하지 않습니다. 플러그인 가능성은 이벤트 루프 수준에서 발생하며, 표준 스케줄러 구현은 모든 적합한 이벤트 루프 구현과 함께 작동해야 합니다.

코루틴과 다른 비동기 프레임워크 간의 상호 운용성을 위해, 스케줄러는 `Future`처럼 작동하는 `Task` 클래스를 정의합니다.

#### 트랜스포트 및 프로토콜 (Transports and Protocols)
Twisted에 익숙하지 않은 사람들을 위해 트랜스포트와 프로토콜 간의 관계를 간략하게 설명합니다. 가장 높은 수준에서 트랜스포트는 바이트가 어떻게 전송되는지에 관여하고, 프로토콜은 어떤 바이트를 전송할지 (그리고 어느 정도 언제 전송할지) 결정합니다.

다른 방식으로 설명하면, 트랜스포트는 소켓(또는 유사한 I/O 엔드포인트)에 대한 추상화이며, 프로토콜은 트랜스포트 관점에서 애플리케이션에 대한 추상화입니다.

트랜스포트와 프로토콜 객체 사이에는 거의 항상 1:1 관계가 있습니다. 프로토콜은 트랜스포트 메서드를 호출하여 데이터를 보내고, 트랜스포트는 프로토콜 메서드를 호출하여 수신된 데이터를 전달합니다. 트랜스포트나 프로토콜 메서드는 "블록"되지 않습니다.

가장 일반적인 트랜스포트 유형은 양방향 스트림 트랜스포트 (bidirectional stream transport)입니다. 이는 각각 바이트 시퀀스를 전송하는 버퍼링된 스트림 쌍(각 방향으로 하나씩)을 나타냅니다. 가장 일반적인 예는 TCP 연결이나 SSL/TLS 연결입니다.

프로토콜은 HTTP 또는 SMTP와 같은 "애플리케이션 수준" 프로토콜을 나타낼 수 있습니다. 또한 여러 프로토콜이 공유하는 추상화나 전체 애플리케이션을 구현할 수도 있습니다.

### 이벤트 루프 인터페이스 명세 (Event Loop Interface Specification)

#### 이벤트 루프 정책: 현재 이벤트 루프 가져오기 및 설정 (Event Loop Policy: Getting and Setting the Current Event Loop)
이벤트 루프 관리는 전역 (프로세스별) 객체인 이벤트 루프 정책에 의해 제어됩니다. 기본 정책이 있으며, 정책을 변경하는 API도 있습니다. 정책은 컨텍스트 개념을 정의하며, 컨텍스트별로 별도의 이벤트 루프를 관리합니다. 기본 정책의 컨텍스트 개념은 현재 스레드로 정의됩니다.

현재 컨텍스트에 대한 이벤트 루프를 얻으려면 `get_event_loop()`를 사용합니다. 현재 컨텍스트에 이벤트 루프가 설정되지 않았고 현재 정책이 이벤트를 생성하도록 지정하지 않은 경우 예외가 발생합니다.

현재 컨텍스트에 대한 이벤트 루프를 설정하려면 `set_event_loop(event_loop)`를 사용합니다.

새로운 이벤트 루프 객체를 생성하고 반환하는 `new_event_loop()` 함수도 있습니다. 이를 현재 이벤트 루프로 만들려면 `set_event_loop()`를 호출해야 합니다.

이벤트 루프 정책을 변경하려면 `set_event_loop_policy(policy)`를 호출합니다.

#### 이벤트 루프를 명시적으로 전달 (Passing an Event Loop Around Explicitly)
전역 또는 스레드별 기본 이벤트 루프에 의존하지 않고 이벤트 루프를 사용하는 코드를 작성할 수 있습니다. 이를 위해 현재 이벤트 루프에 대한 액세스가 필요한 모든 API (이벤트 클래스의 메서드가 아닌)는 `loop`라는 선택적 키워드 인수를 가집니다.

#### 시간 지정 (Specifying Times)
Python에서 모든 타임아웃, 간격 및 지연은 초 단위로 측정되며 정수 또는 부동소수점일 수 있습니다. 그러나 절대 시간은 POSIX 타임스탬프로 지정되지 않습니다. 기본 구현은 `time.monotonic()`을 사용합니다.

#### 임베디드 이벤트 루프 (Embedded Event Loops)
일부 플랫폼에서는 시스템에서 이벤트 루프가 제공됩니다. 이러한 루프는 사용자 코드가 시작될 때 이미 실행 중일 수 있으며, 프로그램을 종료하지 않고는 중지하거나 닫을 수 없는 경우가 있습니다. 이 경우 이벤트 루프를 시작, 중지 및 닫는 메서드를 구현할 수 없으며 `is_running()`은 항상 `True`를 반환할 수 있습니다.

#### 이벤트 루프 클래스 (Event Loop Classes)
실제 `EventLoop`라는 클래스는 없습니다. 모든 메서드를 구현 없이 정의하고 주로 문서를 위한 `AbstractEventLoop` 클래스가 있습니다. 다음 구체적인 클래스가 정의됩니다.
*   **`SelectorEventLoop`** : `selectors` 모듈 (Python 3.4의 새로운 기능)을 기반으로 하는 전체 API의 구체적인 구현입니다.
*   **`ProactorEventLoop`** : I/O 이벤트 처리 및 시그널 처리 메서드를 제외한 API의 구체적인 구현입니다. Windows (또는 "오버랩 I/O"에 대한 유사 API를 지원하는 다른 플랫폼)에서만 정의됩니다.

#### 이벤트 루프 메서드 개요 (Event Loop Methods Overview)
적합한 이벤트 루프의 메서드는 여러 범주로 그룹화됩니다.
*   **시작, 중지 및 닫기** : `run_forever()`, `run_until_complete()`, `stop()`, `is_running()`, `close()`, `is_closed()`.
*   **기본 및 타이밍 콜백** : `call_soon()`, `call_later()`, `call_at()`, `time()`.
*   **스레드 상호 작용** : `call_soon_threadsafe()`, `run_in_executor()`, `set_default_executor()`.
*   **인터넷 이름 조회** : `getaddrinfo()`, `getnameinfo()`.
*   **인터넷 연결** : `create_connection()`, `create_server()`, `create_datagram_endpoint()`.
*   **래핑된 소켓 메서드** : `sock_recv()`, `sock_sendall()`, `sock_connect()`, `sock_accept()`.
*   **태스크 및 퓨처 지원** : `create_future()`, `create_task()`, `set_task_factory()`, `get_task_factory()`.
*   **오류 처리** : `get_exception_handler()`, `set_exception_handler()`, `default_exception_handler()`, `call_exception_handler()`.
*   **디버그 모드** : `get_debug()`, `set_debug()`.

두 번째 범주의 메서드는 적합한 이벤트 루프 구현에 의해 지원될 수 있습니다. 지원되지 않으면 `NotImplementedError`를 발생시킵니다.
*   **I/O 콜백** : `add_reader()`, `remove_reader()`, `add_writer()`, `remove_writer()`.
*   **파이프 및 서브프로세스** : `connect_read_pipe()`, `connect_write_pipe()`, `subprocess_shell()`, `subprocess_exec()`.
*   **시그널 콜백** : `add_signal_handler()`, `remove_signal_handler()`.

#### 이벤트 루프 메서드 (Event Loop Methods)

##### 시작, 중지 및 닫기 (Starting, Stopping and Closing)
*   `run_forever()`: `stop()`이 호출될 때까지 이벤트 루프를 실행합니다.
*   `run_until_complete(future)`: Future가 완료될 때까지 이벤트 루프를 실행합니다.
*   `stop()`: 가능한 한 빨리 이벤트 루프를 중지합니다.
*   `is_running()`: 이벤트 루프가 현재 실행 중이면 `True`를, 중지되었으면 `False`를 반환합니다.
*   `close()`: 이벤트 루프를 닫고, 보유하고 있는 모든 리소스 (예: `epoll()` 또는 `kqueue()`가 사용하는 파일 디스크립터)를 해제합니다.
*   `is_closed()`: 이벤트 루프가 닫혔으면 `True`를, 그렇지 않으면 `False`를 반환합니다.

##### 기본 콜백 (Basic Callbacks)
동일한 이벤트 루프와 관련된 콜백은 엄격하게 직렬화됩니다.
*   `call_soon(callback, *args)`: 콜백을 가능한 한 빨리 호출하도록 스케줄링합니다.
*   `call_later(delay, callback, *args)`: `delay` 초 후에 `callback(*args)`가 호출되도록 준비합니다.
*   `call_at(when, callback, *args)`: `call_later()`와 유사하지만, 시간이 절대 시간으로 표현됩니다.
*   `time()`: 이벤트 루프의 클록에 따른 현재 시간을 반환합니다.

##### 스레드 상호 작용 (Thread interaction)
*   `call_soon_threadsafe(callback, *args)`: `call_soon()`과 유사하지만, 다른 스레드에서 호출될 때 이벤트 루프가 I/O 대기 중이라면 이벤트 루프를 블록 해제합니다.
*   `run_in_executor(executor, callback, *args)`: `executor`에서 `callback(*args)`를 호출하도록 준비합니다.
*   `set_default_executor(executor)`: `run_in_executor()`에서 사용하는 기본 Executor를 설정합니다.

##### 인터넷 이름 조회 (Internet name lookups)
*   `getaddrinfo(host, port, family=0, type=0, proto=0, flags=0)`: `socket.getaddrinfo()` 함수와 유사하지만 `Future`를 반환합니다.
*   `getnameinfo(sockaddr, flags=0)`: `socket.getnameinfo()`와 유사하지만 `Future`를 반환합니다.

##### 인터넷 연결 (Internet connections)
*   `create_connection(protocol_factory, host, port, <options>)`: 지정된 인터넷 호스트 및 포트에 스트림 연결을 생성합니다.
*   `create_server(protocol_factory, host, port, <options>)`: 연결을 수락하는 서비스 루프에 들어갑니다.
*   `create_datagram_endpoint(protocol_factory, local_addr=None, remote_addr=None, <options>)`: 데이터그램(일반적으로 UDP 패킷)을 보내고 받는 엔드포인트를 생성합니다.

##### 래핑된 소켓 메서드 (Wrapped Socket Methods)
*   `sock_recv(sock, n)`: 소켓 `sock`에서 최대 `n` 바이트를 수신합니다.
*   `sock_sendall(sock, data)`: 소켓 `sock`으로 바이트 `data`를 보냅니다.
*   `sock_connect(sock, address)`: 지정된 `address`에 연결합니다.
*   `sock_accept(sock)`: 소켓에서 연결을 수락합니다.

##### I/O 콜백 (I/O Callbacks)
*   `add_reader(fd, callback, *args)`: 파일 디스크립터 `fd`가 읽기 준비가 되었을 때 `callback(*args)`가 호출되도록 준비합니다.
*   `add_writer(fd, callback, *args)`: `add_reader()`와 유사하지만, 읽기 대신 쓰기를 위해 콜백을 등록합니다.
*   `remove_reader(fd)`: 파일 디스크립터 `fd`에 대한 현재 읽기 콜백을 취소합니다.
*   `remove_writer(fd)`: `add_writer()`에 대한 `remove_reader()`와 유사합니다.

##### 파이프 및 서브프로세스 (Pipes and Subprocesses)
*   `connect_read_pipe(protocol_factory, pipe)`: UNIX 파이프의 읽기 끝을 래핑하는 파일 유사 객체에서 단방향 스트림 연결을 생성합니다.
*   `connect_write_pipe(protocol_factory, pipe)`: UNIX 파이프의 쓰기 끝을 래핑하는 파일 유사 객체에서 단방향 스트림 연결을 생성합니다.
*   `subprocess_shell(protocol_factory, cmd, <options>)`: 플랫폼의 "쉘" 구문을 사용하여 `cmd`로부터 서브프로세스를 생성합니다.
*   `subprocess_exec(protocol_factory, *args, <options>)`: 하나 이상의 문자열 인수로부터 서브프로세스를 생성합니다.

##### 시그널 콜백 (Signal callbacks)
*   `add_signal_handler(sig, callback, *args)`: 시그널 `sig`가 수신될 때마다 `callback(*args)`가 호출되도록 준비합니다.
*   `remove_signal_handler(sig)`: 시그널 `sig`에 대한 핸들러가 설정되어 있다면 제거합니다.

#### 콜백의 상호 배제 (Mutual Exclusion of Callbacks)
이벤트 루프는 콜백의 상호 배제를 강제해야 합니다. 즉, 이전에 실행 중인 콜백이 아직 실행 중인 동안에는 새로운 콜백을 시작해서는 안 됩니다.

#### 예외 (Exceptions)
Python에는 `Exception` 클래스에서 파생된 예외와 `BaseException`에서 파생된 예외 두 가지 범주가 있습니다. `Exception`에서 파생된 예외는 일반적으로 적절하게 잡아서 처리됩니다. 그러나 `BaseException`에서만 파생된 예외는 일반적으로 잡히지 않으며, 일반적으로 트레이스백과 함께 프로그램이 종료됩니다.

이벤트 루프는 후자의 범주를 예외 핸들러로 전달합니다. 이는 `context` 딕셔너리를 매개변수로 받는 콜백입니다.
`context`는 'message', 'exception', 'source_traceback', 'handle_traceback'과 같은 키를 가질 수 있습니다.

이벤트 루프에는 예외 처리와 관련된 다음과 같은 메서드가 있습니다.
*   `get_exception_handler()`: 루프에 등록된 현재 예외 핸들러를 반환합니다.
*   `set_exception_handler(handler)`: 예외 핸들러를 설정합니다.
*   `default_exception_handler(context)`: 이 루프 구현을 위한 기본 예외 핸들러입니다.
*   `call_exception_handler(context)`: 등록된 예외 핸들러에 `context`를 전달합니다.

#### 디버그 모드 (Debug Mode)
기본적으로 루프는 릴리스 모드에서 작동합니다. 애플리케이션은 성능 저하를 감수하고 더 나은 오류 보고를 위해 디버그 모드를 활성화할 수 있습니다.

디버그 모드에서는 많은 추가 검사가 활성화됩니다. 예를 들어, `future`/`task`의 처리되지 않은 예외에 대한 소스 트레이스백을 사용할 수 있습니다.
`loop.slow_callback_duration` 속성은 느린 콜백이 보고되기 전에 두 `yield` 지점 사이에서 허용되는 최대 실행 시간을 제어합니다.

디버그 모드와 관련된 두 가지 메서드가 있습니다.
*   `get_debug()`: 디버그 모드가 활성화되어 있으면 `True`를, 그렇지 않으면 `False`를 반환합니다.
*   `set_debug(enabled)`: 인수가 `True`이면 디버그 모드를 활성화합니다.

`PYTHONASYNCIODEBUG` 환경 변수가 정의되어 있고 비어 있지 않으면 디버그 모드가 자동으로 활성화됩니다.

#### 핸들 (Handles)
일회성 콜백 ( `call_soon()`, `call_later()`, `call_at()`, `call_soon_threadsafe()` )을 등록하는 다양한 메서드는 모두 콜백을 취소하는 데 사용할 수 있는 등록을 나타내는 객체를 반환합니다. 이 객체를 `Handle`이라고 합니다. 핸들은 불투명하며 하나의 공개 메서드만 있습니다.
*   `cancel()`: 콜백을 취소합니다.

`add_reader()`, `add_writer()`, `add_signal_handler()`는 `Handle`을 반환하지 않습니다.

#### 서버 (Servers)
`create_server()` 메서드는 `Server` 인스턴스를 반환하며, 이는 요청을 수락하는 데 사용되는 소켓(또는 기타 네트워크 객체)을 래핑합니다. 이 클래스에는 두 가지 공개 메서드가 있습니다.
*   `close()`: 서비스를 닫습니다.
*   `wait_closed()`: 서비스가 닫히고 모든 수락된 요청이 처리될 때까지 블록하는 코루틴입니다.

#### 퓨처 (Futures)
`asyncio.Future` 클래스는 PEP 3148에 명세된 `concurrent.futures.Future` 클래스와 의도적으로 유사하지만 약간의 차이가 있습니다. `asyncio.Future`는 다음과 같은 공개 API를 지원합니다.
*   `cancel()`: Future를 취소하려고 시도합니다.
*   `cancelled()`: Future가 성공적으로 취소되었으면 `True`를 반환합니다.
*   `done()`: Future가 완료되었으면 `True`를 반환합니다.
*   `result()`: `set_result()`로 설정된 결과를 반환하거나, `set_exception()`으로 설정된 예외를 발생시킵니다. 취소되면 `CancelledError`를 발생시킵니다.
*   `exception()`: `set_exception()`으로 예외가 설정되었으면 예외를 반환하고, `set_result()`로 결과가 설정되었으면 `None`을 반환합니다.
*   `add_done_callback(fn)`: Future가 완료될 때 실행될 콜백을 추가합니다.
*   `remove_done_callback(fn)`: 콜백 목록에서 인수를 제거합니다.
*   `set_result(result)`: Future를 완료 상태로 만들고 콜백을 스케줄링합니다.
*   `set_exception(exception)`: Future를 완료 상태로 만들고 콜백을 스케줄링합니다.

다음 예외가 정의됩니다.
*   `InvalidStateError`: Future가 메서드를 호출하기에 적합하지 않은 상태일 때 발생합니다.
*   `InvalidTimeoutError`: 0이 아닌 `timeout` 인수가 주어졌을 때 `result()` 및 `exception()`에 의해 발생합니다.
*   `CancelledError`: `concurrent.futures.CancelledError`의 별칭입니다.
*   `TimeoutError`: `concurrent.futures.TimeoutError`의 별칭입니다.

`asyncio.Future` 객체는 코루틴에서 사용될 때 `yield from` 표현식에 허용됩니다.

`Future`와 관련된 몇 가지 공개 함수는 다음과 같습니다.
*   `asyncio.async(arg)`: 코루틴 객체 또는 `Future`를 인수로 받아 `Future`를 반환합니다.
*   `asyncio.wrap_future(future)`: PEP 3148 `Future`를 받아 이벤트 루프와 호환되는 `Future`를 반환합니다.

#### 트랜스포트 (Transports)
트랜스포트와 프로토콜은 Twisted 및 PEP 3153의 강력한 영향을 받았습니다. 사용자는 거의 트랜스포트를 구현하거나 인스턴스화하지 않습니다. 대신 이벤트 루프는 트랜스포트를 설정하는 유틸리티 메서드를 제공합니다.

##### 모든 트랜스포트용 메서드 (Methods For All Transports)
*   `get_extra_info(name, default=None)`: 트랜스포트에 대한 구현별 정보를 반환하는 포괄적인 메서드입니다.

##### 양방향 스트림 트랜스포트 (Bidirectional Stream Transports)
양방향 스트림 트랜스포트는 소켓 또는 유사한 것 (예: UNIX 파이프 쌍 또는 SSL/TLS 연결) 위에 있는 추상화입니다.
*   `write(data)`: 바이트를 씁니다.
*   `writelines(iterable)`: `iterable`의 각 데이터에 대해 `write()`를 호출하는 것과 같습니다.
*   `write_eof()`: 연결의 쓰기 끝을 닫습니다.
*   `can_write_eof()`: 프로토콜이 `write_eof()`를 지원하면 `True`를 반환합니다.
*   `get_write_buffer_size()`: 트랜스포트의 쓰기 버퍼 현재 크기를 바이트 단위로 반환합니다.
*   `set_write_buffer_limits(high=None, low=None)`: 흐름 제어를 위한 상위 및 하위 워터 마크를 설정합니다.
*   `pause_reading()`: `resume_reading()` 호출 전까지 프로토콜로의 데이터 전달을 일시 중단합니다.
*   `resume_reading()`: `data_received()`를 통해 프로토콜로의 데이터 전달을 다시 시작합니다.
*   `close()`: 다른 쪽 엔티티와의 연결을 끊습니다.
*   `abort()`: 즉시 연결을 끊습니다.

##### 단방향 스트림 트랜스포트 (Unidirectional Stream Transports)
쓰기 스트림 트랜스포트는 양방향 스트림 트랜스포트에 설명된 `write()`, `writelines()`, `write_eof()`, `can_write_eof()`, `close()`, `abort()` 메서드를 지원합니다.
읽기 스트림 트랜스포트는 양방향 스트림 트랜스포트에 설명된 `pause_reading()`, `resume_reading()`, `close()` 메서드를 지원합니다.

##### 데이터그램 트랜스포트 (Datagram Transports)
데이터그램 트랜스포트는 다음과 같은 메서드를 가집니다.
*   `sendto(data, addr=None)`: 데이터그램을 보냅니다.
*   `abort()`: 즉시 트랜스포트를 닫습니다.
*   `close()`: 트랜스포트를 닫습니다.

##### 서브프로세스 트랜스포트 (Subprocess Transports)
서브프로세스 트랜스포트는 다음과 같은 메서드를 가집니다.
*   `get_pid()`: 서브프로세스의 프로세스 ID를 반환합니다.
*   `get_returncode()`: 프로세스가 종료된 경우 프로세스 반환 코드를 반환하고, 그렇지 않으면 `None`을 반환합니다.
*   `get_pipe_transport(fd)`: 인수에 해당하는 파이프 트랜스포트를 반환합니다.
*   `send_signal(signal)`: 서브프로세스에 시그널을 보냅니다.
*   `terminate()`: 서브프로세스를 종료합니다.
*   `kill()`: 서브프로세스를 강제 종료합니다.
*   `close()`: `terminate()`의 별칭입니다.

#### 프로토콜 (Protocols)
프로토콜은 항상 트랜스포트와 함께 사용됩니다.

##### 스트림 프로토콜 (Stream Protocols)
양방향 스트림 프로토콜은 트랜스포트에 의해 호출될 다음 메서드를 구현해야 합니다.
*   `connection_made(transport)`: 트랜스포트가 준비되었고 다른 쪽 엔티티에 연결되었음을 나타냅니다.
*   `data_received(data)`: 트랜스포트가 연결에서 일부 바이트를 읽었습니다.
*   `eof_received()`: 다른 쪽 끝에서 `write_eof()` (또는 이에 상응하는 것)를 호출했을 때 호출됩니다.
*   `pause_writing()`: 프로토콜이 트랜스포트에 데이터 쓰기를 일시적으로 중지하도록 요청합니다.
*   `resume_writing()`: 프로토콜이 트랜스포트에 데이터 쓰기를 다시 시작해도 안전하다고 알려줍니다.
*   `connection_lost(exc)`: 트랜스포트가 닫혔거나 중단되었거나, 다른 쪽 끝이 연결을 깔끔하게 닫았음을 감지했거나, 예기치 않은 오류가 발생했습니다.

##### 데이터그램 프로토콜 (Datagram Protocols)
데이터그램 프로토콜은 스트림 프로토콜과 동일한 시그니처를 가진 `connection_made()` 및 `connection_lost()` 메서드를 가집니다. 또한 다음 메서드를 가집니다.
*   `datagram_received(data, addr)`: 데이터그램 `data`가 원격 주소 `addr`에서 수신되었음을 나타냅니다.
*   `error_received(exc)`: 전송 또는 수신 작업이 `OSError` 예외를 발생시켰음을 나타냅니다.

##### 서브프로세스 프로토콜 (Subprocess Protocol)
서브프로세스 프로토콜은 스트림 프로토콜과 동일한 시그니처를 가진 `connection_made()`, `connection_lost()`, `pause_writing()`, `resume_writing()` 메서드를 가집니다. 또한 다음 메서드를 가집니다.
*   `pipe_data_received(fd, data)`: 서브프로세스가 `stdout` 또는 `stderr`에 데이터를 쓸 때 호출됩니다.
*   `pipe_connection_lost(fd, exc)`: 서브프로세스가 `stdin`, `stdout` 또는 `stderr`를 닫을 때 호출됩니다.
*   `process_exited()`: 서브프로세스가 종료되었을 때 호출됩니다.

#### 콜백 스타일 (Callback Style)
콜백을 받는 대부분의 인터페이스는 위치 인수도 받습니다. 예를 들어, `foo("abc", 42)`가 곧 호출되도록 준비하려면 `loop.call_soon(foo, "abc", 42)`를 호출합니다. 이 규칙은 일반적인 콜백 프로그래밍에서 필요한 작은 람다 함수의 수를 크게 줄여줍니다. 이 규칙은 특히 키워드 인수를 지원하지 않습니다.

#### 코루틴 및 스케줄러 (Coroutines and the Scheduler)
이 부분은 이벤트 루프 인터페이스와 상태가 다르기 때문에 별도의 최상위 섹션으로 분류됩니다. 코루틴 사용은 선택 사항이며, 콜백만 사용하여 코드를 작성하는 것도 완벽하게 괜찮습니다.

##### 코루틴 (Coroutines)
코루틴은 특정 규칙을 따르는 제너레이터입니다. 문서화를 위해 모든 코루틴은 `@asyncio.coroutine`으로 데코레이션되어야 하지만, 이는 엄격하게 강제될 수 없습니다. 코루틴은 원래의 `yield` 구문 대신 PEP 380에 도입된 `yield from` 구문을 사용합니다.

코루틴이 할 수 있는 일:
*   `result = yield from future`: future가 완료될 때까지 코루틴을 일시 중단하고, future의 결과를 반환하거나 예외를 발생시킵니다.
*   `result = yield from coroutine`: 다른 코루틴이 결과를 생성할 때까지 기다립니다.
*   `return expression`: `yield from`을 사용하여 이 코루틴을 기다리는 코루틴에 결과를 생성합니다.
*   `raise exception`: `yield from`을 사용하여 이 코루틴을 기다리는 코루틴에서 예외를 발생시킵니다.

코루틴을 호출해도 코드가 실행되지는 않습니다. 이는 단순히 제너레이터이며, 호출에 의해 반환된 코루틴 객체는 실제로 제너레이터 객체로, 반복되기 전까지는 아무것도 하지 않습니다.

##### 여러 코루틴 기다리기 (Waiting for Multiple Coroutines)
여러 코루틴 또는 `Future`를 기다리기 위해 `concurrent.futures` 패키지의 `wait()` 및 `as_completed()` API와 유사한 두 가지 API가 제공됩니다.
*   `asyncio.wait(fs, timeout=None, return_when=ALL_COMPLETED)`: `fs`로 주어진 `Future` 또는 코루틴이 완료될 때까지 기다리는 코루틴입니다.
*   `asyncio.as_completed(fs, timeout=None)`: `Future` 또는 코루틴의 값을 반환하는 이터레이터를 반환합니다.
*   `asyncio.wait_for(f, timeout)`: 타임아웃을 사용하여 단일 코루틴 또는 `Future`를 기다리는 편의 기능입니다.
*   `asyncio.gather(f1, f2, ...)`: 모든 인수 (`Future` 또는 코루틴)가 완료될 때까지 기다리고 해당 결과 목록을 반환하는 `Future`를 반환합니다.
*   `asyncio.shield(f)`: 취소로부터 보호하면서 `Future`를 기다립니다.

##### 슬리핑 (Sleeping)
코루틴 `asyncio.sleep(delay)`는 지정된 시간 지연 후에 반환됩니다.

##### 태스크 (Tasks)
`Task`는 독립적으로 실행되는 코루틴을 관리하는 객체입니다. `Task` 인터페이스는 `Future` 인터페이스와 동일하며, 실제로 `Task`는 `Future`의 서브클래스입니다.
완료되지 않은 태스크를 취소하면 코루틴에 `asyncio.CancelledError` 예외가 발생합니다.

코루틴을 태스크로 변환하려면 코루틴 함수를 호출하고 결과 코루틴 객체를 `loop.create_task()` 메서드에 전달합니다. `asyncio.ensure_future()`를 사용할 수도 있습니다.

`Task` 클래스는 새로운 메서드를 추가하여 `Future`에서 파생됩니다.
*   `current_task(loop=None)`: 이벤트 루프에서 현재 실행 중인 태스크를 반환하는 클래스 메서드입니다.
*   `all_tasks(loop=None)`: 루프에 대한 모든 활성 태스크 세트를 반환하는 클래스 메서드입니다.

##### 스케줄러 (The Scheduler)
스케줄러는 공개 인터페이스가 없습니다. `yield from future` 및 `yield from task`를 사용하여 상호 작용합니다.

#### 편의 유틸리티 (Convenience Utilities)
FTP 또는 HTTP와 같은 기본 스트림 기반 클라이언트 및 서버 작성을 단순화하기 위해 몇 가지 함수와 클래스가 제공됩니다.
*   `asyncio.open_connection(host, port)`: `EventLoop.create_connection()`의 래퍼로, `(reader, writer)` 쌍을 반환하는 코루틴입니다.
*   `asyncio.start_server(client_connected_cb, host, port)`: `EventLoop.create_server()`의 래퍼로, 간단한 콜백 함수를 받습니다.
*   `StreamReader`: 읽기 전용 바이너리 스트림과 유사한 인터페이스를 제공하는 클래스입니다.
*   `StreamWriter`: 쓰기 전용 바이너리 스트림과 유사한 인터페이스를 제공하는 클래스입니다.
*   `StreamReaderProtocol`: 양방향 스트림 트랜스포트/프로토콜 인터페이스와 `StreamReader` 및 `StreamWriter` 클래스 사이의 어댑터로 사용되는 프로토콜 구현입니다.

#### 동기화 (Synchronization)
`threading` 모듈의 잠금, 이벤트, 조건 및 세마포어는 `asyncio.locks` 서브모듈을 임포트하여 구현되고 액세스할 수 있습니다. `queue` 모듈의 큐는 `asyncio.queues` 서브모듈을 임포트하여 구현되고 액세스할 수 있습니다.

##### 잠금 (Locks)
`asyncio.locks`에서 다음 클래스가 제공됩니다. `Event`를 제외한 모든 클래스에 대해 `with` 문을 `yield from`과 함께 사용하여 잠금을 획득하고 `with` 블록을 나가는 방식에 관계없이 잠금이 해제되도록 할 수 있습니다.
*   `Lock`: 기본 뮤텍스.
*   `Event`: 이벤트 변수.
*   `Condition`: 조건 변수.
*   `Semaphore`: 세마포어.
*   `BoundedSemaphore`: 바운드 세마포어.

##### 큐 (Queues)
`asyncio.queues`에서 다음 클래스와 예외가 제공됩니다.
*   `Queue`: 표준 큐.
*   `PriorityQueue`: 우선순위 순서로 항목을 검색하는 `Queue`의 서브클래스.
*   `LifoQueue`: 가장 최근에 추가된 항목을 먼저 검색하는 `Queue`의 서브클래스.
*   `JoinableQueue`: `task_done()` 및 `join()` 메서드를 가진 `Queue`의 서브클래스.
*   `Empty`, `Full`: 큐가 비어 있거나 가득 찼을 때 `get_nowait()` 또는 `put_nowait()`가 호출될 때 발생하는 예외.

#### 기타 (Miscellaneous)

##### 로깅 (Logging)
`asyncio` 패키지에서 수행되는 모든 로깅은 단일 `logging.Logger` 객체인 `asyncio.logger`를 사용합니다.

##### UNIX에서 `SIGCHLD` 처리 (SIGCHLD handling on UNIX)
서브프로세스 프로토콜에서 `process_exited()` 메서드를 효율적으로 구현하려면 `SIGCHLD` 시그널 핸들러가 필요합니다. `asyncio.get_child_watcher()` 및 `asyncio.set_child_watcher()` 두 가지 추가 함수와 이벤트 루프 정책에 해당하는 메서드가 있습니다.

두 가지 자식 감시자 (child watcher) 구현 클래스는 `FastChildWatcher`와 `SafeChildWatcher`입니다. 기본적으로 `SafeChildWatcher` 클래스가 사용됩니다. `FastChildWatcher` 클래스는 효율적이지만, `asyncio` 이벤트 루프를 사용하지 않고 서브프로세스를 생성하는 다른 코드와 충돌할 수 있습니다.

#### 위시 리스트 (Wish List)
(이 기능들이 바람직하다는 데는 동의하지만, Python 3.4 베타 1이 릴리스될 때 구현이 제공되지 않았습니다. Python 3.5에 추가될 예정입니다.)
*   TCP 소켓을 SSL/TLS로 업그레이드하는 "start TLS" 작업 지원.

#### 공개 문제 (Open Issues)
(이러한 문제는 PEP가 수용되면서 사실상 현상 유지로 해결되었습니다. 그러나 PEP의 잠정적 상태는 Python 3.5에서 이러한 결정을 재검토할 수 있도록 합니다.)
*   `create_connection()` 및 `create_datagram_endpoint()`에는 `proto` 인수가 있지만 `create_server()`에는 없는 이유는 무엇입니까?
*   `getaddrinfo()`에 대한 `family`, `flag`, `proto` 인수가 때때로 0이고 때로는 명명된 상수 (값도 0인)인 이유는 무엇입니까?
*   루프가 중지되는 중인지 여부를 알려주는 다른 조회 메서드가 필요합니까?
*   `Handle`에 대한 더 완전한 공개 API가 필요합니까?
*   디버깅 API가 필요합니까?
*   인트로스펙션 API가 필요합니까?
*   `sock_sendto()` 및 `sock_recvfrom()`와 같은 더 많은 소켓 I/O 메서드가 필요합니까?
*   다양한 타임아웃을 제어하는 API가 필요할 수 있습니다.

#### 참고 자료 (References)
*   PEP 492: `async`/`await`의 의미를 설명합니다.
*   PEP 380: `yield from`의 의미를 설명합니다.
*   PEP 3148: `concurrent.futures.Future`를 설명합니다.
*   PEP 3153: 거부되었지만, 트랜스포트와 프로토콜을 분리할 필요성을 잘 설명합니다.
*   PEP 418: 시간 유지 문제에 대해 논의합니다.
*   Tulip repo: http://code.google.com/p/tulip/
*   PyPI: Python Package Index at http://pypi.python.org/

#### 감사 (Acknowledgments)
PEP 3153 외에도 PEP 380 및 Greg Ewing의 `yield from` 튜토리얼, Twisted, Tornado, ZeroMQ, pyftpdlib 및 wattle (Steve Dower의 반대 제안)의 영향을 받았습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.