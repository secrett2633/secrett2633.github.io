---
title: "[Final] PEP 3151 - Reworking the OS and IO exception hierarchy"
excerpt: "Python Enhancement Proposal 3151: 'Reworking the OS and IO exception hierarchy'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3151/
toc: true
toc_sticky: true
date: 2025-09-27 14:41:26+0900
last_modified_at: 2025-09-27 14:41:26+0900
published: true
---
> **원문 링크:** [PEP 3151 - Reworking the OS and IO exception hierarchy](https://peps.python.org/pep-3151/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 21-Jul-2010

PEP 3151 – OS 및 IO 예외 계층 구조 재작업
============================================

이 문서는 Python Enhancement Proposal (PEP) 3151의 내용을 한국어 사용자가 이해하기 쉽도록 번역하고 정리한 것입니다. Python 개발자들이 이 PEP의 제안 내용, 도입 배경, 그리고 실제 Python 사용에 미치는 영향을 명확하게 이해할 수 있도록 돕는 것이 목표입니다.

작성자: Antoine Pitrou
BDFL-Delegate: Barry Warsaw
상태: Final
유형: Standards Track
생성일: 2010년 7월 21일
Python 버전: 3.3

## 요약 (Abstract)

표준 예외(exception) 계층 구조는 Python 언어의 중요한 부분입니다. 이는 '일반적(generic)'이면서도 '선택적(selective)'이라는 두 가지 특징을 가지고 있습니다. 같은 예외 유형이 다양한 맥락에서 발생하고 처리될 수 있다는 점에서 '일반적'이며(예: 정수에 무언가를 추가하거나, 문자열 메서드를 호출하거나, 소켓에 객체를 쓰는 등 잘못된 인자 유형에는 `TypeError`가 발생), 사용자가 특정 종류의 오류 조건을 쉽게 처리(무시, 검사, 처리, 저장 또는 캡슐화 등)하면서 다른 오류는 상위 호출 컨텍스트로 전파되도록 허용한다는 점에서 '선택적'입니다. 예를 들어, 다른 `ArithmeticError` (예: `OverflowError`)의 기본 처리에 영향을 주지 않으면서 `ZeroDivisionError`만 잡을 수 있습니다.

이 PEP는 위에서 언급된 특징들을 더 잘 구현하기 위해 예외 계층 구조의 일부, 즉 운영 체제 호출과 관련된 오류(`OSError`, `IOError`, `mmap.error`, `select.error` 및 이들의 모든 서브클래스)에 대한 변경을 제안합니다.

## 배경 (Rationale)

### 혼란스러운 OS 관련 예외 집합

현재 OS 관련(또는 시스템 호출 관련) 예외는 다음과 같은 하위 계층 구조로 구성된 다양한 클래스입니다.

```
+-- EnvironmentError
    +-- IOError
        +-- io.BlockingIOError
        +-- io.UnsupportedOperation (ValueError도 상속)
    +-- socket.error
        +-- socket.gaierror
        +-- socket.herror
        +-- socket.timeout
    +-- OSError
        +-- VMSError
        +-- WindowsError
    +-- mmap.error
    +-- select.error
```

이러한 일부 구분은 구현상의 고려 사항으로 설명될 수 있지만, 상위 수준에서는 종종 논리적이지 않습니다. 예를 들어, `OSError`와 `IOError`를 구분하는 경계는 종종 모호합니다. 다음 예시를 보십시오.

```python
>>> os.remove("fff")
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
OSError: [Errno 2] No such file or directory: 'fff'

>>> open("fff")
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
IOError: [Errno 2] No such file or directory: 'fff'
```

동일한 오류 조건(존재하지 않는 파일)이 호출된 라이브러리 함수에 따라 두 가지 다른 예외로 발생합니다. 이는 `os` 모듈은 exclusively `OSError` (또는 서브클래스 `WindowsError`)를 발생시키고, `io` 모듈은 주로 `IOError`를 발생시키기 때문입니다. 그러나 사용자는 오류의 출처(추적 메시지나 애플리케이션 소스 코드를 통해 명확하기 때문)보다는 오류의 본질에 관심이 있습니다.

실제로 `OSError`를 포착하되 `IOError`는 포착하지 않는 상황이나 그 반대의 상황을 생각하기 어렵습니다.

이러한 구분의 모호성을 추가적으로 증명하는 것은 표준 라이브러리 자체도 때때로 결정을 내리는 데 어려움을 겪는다는 것입니다. 예를 들어, `select` 모듈에서는 `select()`, `poll` 객체, `kqueue` 객체 또는 `epoll` 객체를 사용하는지에 따라 유사한 실패가 `select.error`, `OSError` 또는 `IOError`를 발생시킵니다. 이는 사용자 코드를 불필요하게 복잡하게 만드는데, 단일 프리미티브의 정확한 구현에 따라 런타임에 다양한 예외 유형을 포착할 준비를 해야 하기 때문입니다.

`WindowsError`의 경우, 이는 무의미한 구분으로 보입니다. 첫째, Windows 시스템에서만 존재하여 크로스 플랫폼 애플리케이션에서 번거로운 호환성 코드를 필요로 합니다. 둘째, `OSError`를 상속하며 다른 시스템에서 `OSError`가 발생하는 것과 유사한 오류에 대해 발생합니다. 셋째, 낮은 수준의 예외 세부 정보에 접근하려는 사용자는 어차피 `errno` 또는 `winerror` 속성을 검사해야 합니다.

> **참고:** [Appendix B]는 인터프리터와 표준 라이브러리 전반에 걸쳐 다양한 예외 유형의 사용을 조사합니다.

### 세분화된 예외의 부족

현재 다양한 OS 관련 예외는 사용자가 원하는 종류의 실패를 쉽게 필터링할 수 있도록 허용하지 않습니다. 예를 들어, 파일이 존재하면 삭제하는 작업을 고려해 보십시오. "Look Before You Leap (LBYL)" 방식은 명백한 경쟁 조건(race condition) 문제가 있습니다.

```python
if os.path.exists(filename):
    os.remove(filename)
```

`os.path.exists`와 `os.remove` 호출 사이에 다른 스레드나 프로세스에 의해 `filename`으로 명명된 파일이 생성되면, 해당 파일은 삭제되지 않습니다. 이는 애플리케이션에 버그나 심지어 보안 문제를 야기할 수 있습니다.

따라서, 파일 삭제를 시도하고 파일이 존재하지 않는 경우 오류를 무시하는 것이 해결책입니다("Easier to Ask Forgiveness than to get Permission (EAFP)"으로 알려진 방식). 신중한 코드는 다음과 같이 작성됩니다(POSIX 및 Windows 시스템 모두에서 작동).

```python
try:
    os.remove(filename)
except OSError as e:
    if e.errno != errno.ENOENT:
        raise
```

또는 심지어:

```python
try:
    os.remove(filename)
except EnvironmentError as e:
    if e.errno != errno.ENOENT:
        raise
```

이는 작성해야 할 양이 훨씬 많고, 사용자에게 `errno` 모듈의 다양한 암호 같은 니모닉(mnemonic)을 기억하도록 강요합니다. 이는 추가적인 인지적 부담을 주고 빠르게 지루해집니다. 결과적으로 많은 프로그래머는 예외를 너무 광범위하게 무시하는 다음 코드를 대신 작성합니다.

```python
try:
    os.remove(filename)
except OSError:
    pass
```

`os.remove`는 파일이 존재하지 않을 뿐만 아니라 다른 가능한 상황(예: 파일명이 디렉토리를 가리키거나, 현재 프로세스에 파일 삭제 권한이 없는 경우)에서도 `OSError`를 발생시킬 수 있으며, 이 모든 상황은 애플리케이션 로직의 버그를 나타내므로 무시되어서는 안 됩니다. 프로그래머가 대신 작성하고 싶은 것은 다음과 같습니다.

```python
try:
    os.remove(filename)
except FileNotFoundError:
    pass
```

## 호환성 전략 (Compatibility strategy)

예외 계층 구조를 재작업하는 것은 분명히 기존 코드의 일부 의미를 변경할 것입니다. 정확한 의미를 변경하지 않고 현재 상황을 개선하는 것은 불가능하지만, 더 좁은 유형의 호환성, 즉 '유용한 호환성(useful compatibility)'을 정의하는 것은 가능합니다.

이를 위해 먼저 '신중한(careful)' 예외 처리와 '부주의한(careless)' 예외 처리가 무엇인지 설명해야 합니다. '부주의한(또는 '순진한')' 코드는 `errno` 속성을 확인하지 않고 `OSError`, `IOError`, `socket.error`, `mmap.error`, `WindowsError`, `select.error` 중 어떤 것이든 맹목적으로 포착하는 코드로 정의됩니다. 이러한 예외 유형은 너무 광범위하여 의미 있는 어떤 것도 나타내지 않기 때문입니다. 이들 중 어떤 것이든 잘못된 파일 디스크립터(일반적으로 프로그래밍 오류를 나타냄), 연결되지 않은 소켓(마찬가지), 소켓 타임아웃, 파일 유형 불일치, 유효하지 않은 인수, 전송 실패, 불충분한 권한, 존재하지 않는 디렉토리, 가득 찬 파일 시스템 등 다양한 오류 조건에 대해 발생할 수 있습니다.

(게다가, 특정 예외의 사용은 불규칙합니다. [Appendix B]는 구현에 따라 다른 예외를 발생시키는 `select` 모듈의 경우를 설명합니다.)

'신중한' 코드는 위의 예외 중 하나를 포착할 때 `errno` 속성을 검사하여 실제 오류 조건을 판단하고 그에 따라 조치를 취하는 코드로 정의됩니다.

이제 '유용한 호환성'을 다음과 같이 정의할 수 있습니다.

*   **유용한 호환성**은 예외 포착을 더 좁게 만들지 않지만, '부주의한' 예외 포착 코드의 경우 더 넓어질 수 있습니다. 다음 유형의 코드 조각이 주어졌을 때, 이 PEP 이전에 포착된 모든 예외는 이 PEP 이후에도 포착되지만, 그 반대는 사실이 아닐 수 있습니다 (왜냐하면 `OSError`, `IOError` 및 기타 예외의 통합은 `except` 절이 약간 더 넓은 범위를 포괄함을 의미하기 때문입니다).

    ```python
    try:
        ... os.remove(filename) ...
    except OSError:
        pass
    ```

*   **유용한 호환성**은 '신중한' 예외 포착 코드의 동작을 변경하지 않습니다. 다음 유형의 코드 조각이 주어졌을 때, 이 PEP가 구현되었는지 여부와 관계없이 동일한 오류가 무시되거나 다시 발생해야 합니다.

    ```python
    try:
        os.remove(filename)
    except OSError as e:
        if e.errno != errno.ENOENT:
            raise
    ```

이러한 타협의 근거는 '부주의한' 코드는 실제로 도울 수 없지만, 적어도 "작동하는" 코드가 갑자기 오류를 발생시키고 충돌하지는 않을 것이라는 점입니다. 이는 이러한 코드가 cron 작업이나 자동화된 시스템 관리 프로그램에서 사용되는 스크립트에 존재할 가능성이 높기 때문에 중요합니다.

반면에 '신중한' 코드는 불이익을 받아서는 안 됩니다. 사실, 이 PEP의 한 가지 목적은 '신중한' 코드 작성을 용이하게 하는 것입니다.

### 1단계: 예외 유형 통합 (coalesce exception types)

해결책의 첫 번째 단계는 기존 예외 유형을 통합하는 것입니다. 다음 변경 사항이 제안됩니다.

*   `socket.error`와 `select.error`를 모두 `OSError`로 앨리어싱(alias)합니다.
*   `mmap.error`를 `OSError`로 앨리어싱합니다.
*   `WindowsError`와 `VMSError`를 모두 `OSError`로 앨리어싱합니다.
*   `IOError`를 `OSError`로 앨리어싱합니다.
*   `EnvironmentError`를 `OSError`로 통합합니다.

이러한 각 변경 사항은 정확한 호환성을 유지하지는 않지만, 유용한 호환성(`"compatibility"` 섹션 참조)을 유지합니다.

이러한 각 변경 사항은 개별적으로 수락되거나 거부될 수 있지만, 물론 이 첫 번째 단계가 완전히 수락될 때 가장 큰 영향을 얻을 수 있다고 간주됩니다. 이 경우, IO 예외 하위 계층 구조는 다음과 같이 됩니다.

```
+-- OSError (IOError, WindowsError, EnvironmentError 등을 대체)
    +-- io.BlockingIOError
    +-- io.UnsupportedOperation (ValueError도 상속)
    +-- socket.gaierror
    +-- socket.herror
    +-- socket.timeout
```

#### 정당화 (Justification)

이 첫 번째 단계는 `Rationale` 섹션에서 설명한 대로 사용자에게 더 간단한 환경을 제공할 뿐만 아니라, 2단계의 더 좋고 완전한 해결책을 가능하게 합니다(`Prerequisite` 참조).

일반적인 OS 관련 예외의 공식 이름으로 `OSError`를 유지하는 이유는 `IOError`보다 더 일반적(generic)이기 때문입니다. `EnvironmentError`는 입력하기 더 번거롭고 훨씬 덜 알려져 있습니다.

[Appendix B]의 조사는 `IOError`가 현재 표준 라이브러리에서 지배적인 오류임을 보여줍니다. 타사 Python 코드의 경우, Google Code Search는 사용자 코드에서 `IOError`가 `EnvironmentError`보다 10배 더 인기가 많고, `OSError`보다 3배 더 인기가 많다는 것을 보여줍니다. 그러나 중기적으로 `IOError`를 Deprecate할 의도는 없으므로, `OSError`의 낮은 인기는 문제가 되지 않습니다.

#### 예외 속성 (Exception attributes)

`WindowsError`가 `OSError`로 통합되므로, `OSError`는 Windows에서 `winerror` 속성을 얻게 됩니다. 이는 `errno`, `filename`, `strerror` 속성에서 이미 그렇듯이, 의미 없는 상황에서는 `None`으로 설정됩니다(예: `OSError`가 Python 코드에 의해 직접 발생될 때).

#### 이름 Deprecate (Deprecation of names)

다음 단락들은 오래된 예외 이름에 대한 가능한 Deprecation 전략을 설명합니다. 그러나, 당분간은 이들을 앨리어스로 유지하기로 결정했습니다. 이 결정은 Python 4.0을 위해 수정될 수 있습니다.

##### 내장 예외 (built-in exceptions)

오래된 내장 예외를 Deprecate하는 것은 `builtins` 네임스페이스의 모든 조회를 가로채는 방식으로 직접적으로 수행될 수 없습니다. 이는 성능에 중요한 부분이기 때문입니다. 또한 객체 수준에서 작업할 수도 없습니다. Deprecate된 이름이 Deprecate되지 않은 객체에 앨리어스될 것이기 때문입니다.

한 가지 해결책은 컴파일 시간에 이러한 이름을 인식하고, 일반적인 `LOAD_GLOBAL` 대신 별도의 `LOAD_OLD_GLOBAL` opcode를 방출하는 것입니다. 이 특수 opcode는 이름이 `globals` 네임스페이스에 없고 `builtins` 네임스페이스에만 있을 때 `DeprecationWarning` (또는 결정된 정책에 따라 `PendingDeprecationWarning`)을 처리합니다. 이는 잘못된 긍정(false positives)을 피하기에 충분하며(예: 어떤 모듈에서 자신만의 `OSError`를 정의하는 경우), 잘못된 부정(false negatives)은 드물 것입니다(예: `builtins` 모듈을 통해 `OSError`에 직접 접근하는 경우).

##### 모듈 수준 예외 (module-level exceptions)

위의 접근 방식은 코드 객체를 컴파일할 때 일부 모듈을 특별하게 처리해야 하므로 쉽게 사용할 수 없습니다. 그러나 이러한 이름은 구성상 훨씬 덜 가시적이며(builtins 네임스페이스에 나타나지 않음) 덜 알려져 있으므로, 자체 네임스페이스에 남겨두기로 결정할 수 있습니다.

### 2단계: 추가 서브클래스 정의 (define additional subclasses)

해결책의 두 번째 단계는 특정 `errno` 값에 대해 부모 클래스 대신 서브클래스가 발생하도록 계층 구조를 확장하는 것입니다. 어떤 `errno` 값을 사용할지는 논의의 대상이지만, 기존 예외 매칭 관행에 대한 조사([Appendix A] 참조)는 모든 값의 합리적인 부분 집합을 제안하는 데 도움이 됩니다. 모든 `errno` 니모닉을 매핑하려는 시도는 어리석고 무의미하며 루트 네임스페이스를 오염시킬 것입니다.

더 나아가, 몇몇 경우에는 다른 `errno` 값이 동일한 예외 서브클래스를 발생시킬 수 있습니다. 예를 들어, `EAGAIN`, `EALREADY`, `EWOULDBLOCK`, `EINPROGRESS`는 모두 논블로킹(non-blocking) 소켓에서의 작업이 블로킹될 것임을 알리는 데 사용됩니다(따라서 나중에 다시 시도해야 함). 따라서 이들은 모두 동일한 서브클래스를 발생시키고, 사용자가 원한다면 `errno` 속성을 검사하도록 할 수 있습니다([예외 속성] 참조).

#### 전제 조건 (Prerequisite)

1단계는 이에 대한 느슨한 전제 조건입니다.

전제 조건인 이유는 현재 일부 `errno`는 맥락에 따라 `OSError`와 `IOError` 모두에 연결될 수 있기 때문입니다(예: `ENOENT`). 유용한 호환성을 깨고 싶지 않다면, 현재 성공할 예외를 `except OSError` (또는 `IOError`)가 일치시키지 못하도록 할 수 없습니다.

느슨한 이유는 기존 예외 클래스가 통합되지 않은 경우 2단계의 부분적 해결을 결정할 수 있기 때문입니다. 예를 들어, `ENOENT`는 이전에 `IOError`가 발생했던 곳에서 가상의 `FileNotFoundError`를 발생시킬 수 있지만, 그렇지 않은 경우에는 계속 `OSError`를 발생시킬 수 있습니다.

새로운 서브클래스가 모든 기존 슈퍼클래스(또는 적어도 가장 일반적인 `OSError`와 `IOError`)와 일치하기 위해 다중 상속을 사용한다면 1단계에 대한 의존성은 완전히 제거될 수 있습니다. 그러나 이는 계층 구조를 더 복잡하게 만들고 따라서 사용자가 이해하기 어렵게 만들 것입니다.

#### 새로운 예외 클래스 (New exception classes)

다음은 설명과 매핑된 `errno` 값 목록과 함께 논의를 위해 제출된 잠정적인 서브클래스 목록입니다.

*   `FileExistsError`: 이미 존재하는 파일이나 디렉토리를 생성하려 할 때 (`EEXIST`)
*   `FileNotFoundError`: 파일이나 디렉토리가 요청되었으나 존재하지 않는 모든 상황 (`ENOENT`)
*   `IsADirectoryError`: 디렉토리에 대해 파일 수준 작업(`open()`, `os.remove()` 등)이 요청될 때 (`EISDIR`)
*   `NotADirectoryError`: 디렉토리 수준 작업이 다른 것에 대해 요청될 때 (`ENOTDIR`)
*   `PermissionError`: 적절한 접근 권한 없이 작업을 실행하려 할 때(예: 파일 시스템 권한) (`EACCES`, `EPERM`)
*   `BlockingIOError`: 논블로킹(non-blocking) 작업으로 설정된 객체(예: 소켓)에서 작업이 블로킹될 때 (`EAGAIN`, `EALREADY`, `EWOULDBLOCK`, `EINPROGRESS`); 이는 기존 `io.BlockingIOError`의 역할 확장입니다.
*   `BrokenPipeError`: 다른 쪽 끝이 닫힌 파이프에 쓰려고 하거나, 쓰기 위해 종료된 소켓에 쓰려고 할 때 (`EPIPE`, `ESHUTDOWN`)
*   `InterruptedError`: 시스템 호출이 들어오는 신호에 의해 중단될 때 (`EINTR`)
*   `ConnectionAbortedError`: 피어(peer)에 의해 연결 시도가 중단될 때 (`ECONNABORTED`)
*   `ConnectionRefusedError`: 피어에 의해 연결이 거부될 때 (`ECONNREFUSED`)
*   `ConnectionResetError`: 피어에 의해 연결이 재설정될 때 (`ECONNRESET`)
*   `TimeoutError`: 연결 시간이 초과될 때 (`ETIMEDOUT`); 이는 `socket.timeout`을 대체하고 다른 유형의 타임아웃(예: `Lock.acquire()`)에도 유용한 일반적인 타임아웃 예외로 재구성될 수 있습니다.
*   `ChildProcessError`: 자식 프로세스에 대한 작업이 실패할 때 (`ECHILD`); 이는 주로 `wait()` 계열 함수에 의해 발생합니다.
*   `ProcessLookupError`: 주어진 프로세스(예: 프로세스 ID로 식별됨)가 존재하지 않을 때 (`ESRCH`).

또한, 다음 예외 클래스의 포함이 제안됩니다.

*   `ConnectionError`: `ConnectionAbortedError`, `ConnectionRefusedError`, `ConnectionResetError`의 기본 클래스입니다.

다음 그림은 제안된 추가 사항과 해당 `errno` 값(해당하는 경우)을 요약하려고 합니다. 하위 계층 구조의 루트(`OSError`, 1단계가 완전히 수락되었다고 가정)는 표시되지 않습니다.

```
+-- BlockingIOError           EAGAIN, EALREADY, EWOULDBLOCK, EINPROGRESS
+-- ChildProcessError         ECHILD
+-- ConnectionError
|   +-- BrokenPipeError       EPIPE, ESHUTDOWN
|   +-- ConnectionAbortedError ECONNABORTED
|   +-- ConnectionRefusedError ECONNREFUSED
|   +-- ConnectionResetError   ECONNRESET
+-- FileExistsError           EEXIST
+-- FileNotFoundError         ENOENT
+-- InterruptedError          EINTR
+-- IsADirectoryError         EISDIR
+-- NotADirectoryError        ENOTDIR
+-- PermissionError           EACCES, EPERM
+-- ProcessLookupError        ESRCH
+-- TimeoutError              ETIMEDOUT
```

#### 명명 (Naming)

다양한 명명 논란이 발생할 수 있습니다. 그 중 하나는 모든 예외 클래스 이름이 "Error"로 끝나야 하는지 여부입니다. 찬성하는 쪽은 나머지 예외 계층 구조와의 일관성을 주장하고, 반대하는 쪽은 간결성(특히 `ConnectionAbortedError`와 같은 긴 이름의 경우)을 주장합니다.

#### 예외 속성 (Exception attributes)

유용한 호환성을 유지하기 위해, 이러한 서브클래스는 슈퍼클래스에 정의된 다양한 예외 속성(예: `errno`, `filename`, 선택적으로 `winerror`)에 대해 적절한 값을 설정해야 합니다.

#### 구현 (Implementation)

서브클래스가 전적으로 `errno` 값에 기반하여 발생하도록 제안되었으므로, 확장 모듈(표준 또는 타사)에서는 거의 또는 전혀 변경이 필요하지 않습니다.

첫 번째 가능성은 `PyErr_SetFromErrno()` 계열 함수(Windows에서는 `PyErr_SetFromWindowsErr()`)를 적절한 `OSError` 서브클래스를 발생시키도록 조정하는 것입니다. 그러나 이는 `Lib/tempfile.py`에서 볼 수 있는 다음 관용구를 사용하여 `OSError`를 직접 발생시키는 Python 코드는 다루지 못할 것입니다.

```python
raise IOError(_errno.EEXIST, "No usable temporary file name found")
```

Marc-Andre Lemburg가 제안한 두 번째 가능성은 `OSError.__new__`를 적절한 서브클래스를 인스턴스화하도록 조정하는 것입니다. 이는 위와 같은 Python 코드도 다루는 이점이 있습니다.

## 가능한 반론 (Possible objections)

### 네임스페이스 오염 (Namespace pollution)

예외 계층 구조를 더 세분화하면 루트(또는 `builtins`) 네임스페이스가 커집니다. 그러나 다음 이유로 이는 완화되어야 합니다.

*   제안된 추가 클래스는 소수에 불과합니다.
*   표준 예외 유형은 루트 네임스페이스에 있지만, `CamelCase` 규칙을 사용하는 반면 거의 모든 다른 내장(builtins)은 소문자 명명(True, False, None, Ellipsis, NotImplemented 제외)을 사용한다는 사실로 시각적으로 구별됩니다.

대안은 더 세분화된 예외를 포함하는 별도의 모듈을 제공하는 것이지만, 이는 사용자가 이미 접근 가능한 이름을 사용하는 대신 새 모듈을 먼저 가져와야 하므로 '부주의한' 코드보다 '신중한' 코드를 장려하려는 목적에 어긋날 것입니다.

## 이전 논의 (Earlier discussion)

이러한 공식적인 제안은 이번이 처음이지만, 이러한 아이디어는 과거에 비공식적인 지지를 얻었습니다. 이는 세분화된 예외 클래스의 도입과 `OSError` 및 `IOError`의 통합 모두에 해당합니다.

`WindowsError`만 제거하는 것은 다른 PEP의 일부로 논의되고 거부되었지만, `OSError`와의 구분이 의미 없다는 합의가 있는 것으로 보였습니다. 이는 적어도 `OSError`와의 앨리어싱을 지지합니다.

## 구현 (Implementation)

참조 구현은 Python 3.3에 통합되었습니다. 이전에는 `http://hg.python.org/features/pep-3151/`의 `pep-3151` 브랜치에서 개발되었으며, 버그 트래커 `http://bugs.python.org/issue12555`에서도 추적되었습니다. Linux, Windows, OpenIndiana, FreeBSD 빌드봇을 포함한 다양한 시스템에서 성공적으로 테스트되었습니다.

`OSError`와 `WindowsError`의 각 생성자가 호환되지 않는다는 문제가 있었습니다. 이를 해결하는 방법은 `OSError` 시그니처를 유지하고 네 번째 선택적 인수를 추가하여 Windows 오류 코드(POSIX `errno`와 다름)를 전달할 수 있도록 하는 것입니다. 네 번째 인수는 `winerror`로 저장되고 해당 POSIX 번역은 `errno`로 저장됩니다. `PyErr_SetFromWindowsErr*` 함수는 올바른 생성자 호출을 사용하도록 조정되었습니다.

약간 복잡한 상황은 `PyErr_SetExcFromWindowsErr*` 함수가 `WindowsError` 대신 `OSError`와 함께 호출될 때 발생합니다. 이 경우 예외 객체의 `errno` 속성은 POSIX 번역(예: `EPIPE`의 경우 32) 대신 Windows 오류 코드(예: `ERROR_BROKEN_PIPE`의 경우 109)를 저장하게 됩니다. 소켓 오류 코드가 아닌 경우, 이는 호환성 문제가 없는 개인 `_multiprocessing` 모듈에서만 발생합니다.

> **참고:** 소켓 오류의 경우, `errno` 모듈에 반영된 "POSIX `errno`"는 `WSAGetLastError` 시스템 호출에 의해 반환되는 Windows 소켓 오류 코드와 수치적으로 동일합니다.

```python
>>> errno.EWOULDBLOCK
10035
>>> errno.WSAEWOULDBLOCK
10035
```

## 가능한 대안 (Possible alternative)

### 패턴 매칭 (Pattern matching)

또 다른 가능성은 예외를 포착할 때 고급 패턴 매칭 구문을 도입하는 것입니다. 예를 들어:

```python
try:
    os.remove(filename)
except OSError as e if e.errno == errno.ENOENT:
    pass
```

이 제안에는 여러 가지 문제가 있습니다.

*   새로운 구문을 도입하며, 이는 예외 계층 구조를 재작업하는 것보다 더 큰 변경으로 인식됩니다.
*   입력 노력(typing effort)을 크게 줄이지 않습니다.
*   프로그래머에게 `errno` 니모닉을 기억해야 하는 부담을 덜어주지 않습니다.

## 이 PEP에 의해 무시된 예외 (Exceptions ignored by this PEP)

이 PEP는 다양한 프로토콜 및 파일 형식 구현(예: `GzipFile`)에서 잘린 입력 스트림을 나타내는 `EOFError`를 무시합니다. `EOFError`는 OS 또는 IO 관련 오류가 아니며, 더 높은 수준에서 발생하는 논리적 오류입니다.

이 PEP는 또한 OpenSSL 라이브러리에 의해 신호된 오류를 전파하기 위해 `ssl` 모듈에서 발생하는 `SSLError`를 무시합니다. 이상적으로 `SSLError`는 자체 오류 유형 상수(`ssl.SSL_ERROR_WANT_READ` 등)를 정의하므로 유사하지만 별도의 처리가 필요할 것입니다. Python 3.2에서는 소켓 타임아웃을 나타낼 때 `SSLError`가 이미 `socket.timeout`으로 대체되었습니다(issue 10272 참조).

마지막으로, `socket.gaierror`와 `socket.herror`의 운명은 아직 결정되지 않았습니다. 이들은 덜 암호적인 이름을 가질 가치가 있지만, 예외 계층 구조 재조직 노력과는 별도로 처리될 수 있습니다.

## Appendix A: 일반적인 `errno` 조사 (Survey of common errnos)

다음은 표준 라이브러리 및 해당 테스트에서 `except` 절의 일부로 확인된 다양한 `errno` 니모닉의 간략한 목록입니다.

### `OSError`와 관련된 일반적인 `errno`

*   `EBADF`: 잘못된 파일 디스크립터 (일반적으로 파일 디스크립터가 닫혔음을 의미)
*   `EEXIST`: 파일 또는 디렉토리가 존재함
*   `EINTR`: 인터럽트된 함수 호출
*   `EISDIR`: 디렉토리임
*   `ENOTDIR`: 디렉토리가 아님
*   `ENOENT`: 파일 또는 디렉토리가 없음
*   `EOPNOTSUPP`: 소켓에서 지원되지 않는 작업 (기존 `io.UnsupportedOperation`과의 혼동 가능성)
*   `EPERM`: 작업이 허용되지 않음 (예: `os.setuid()` 사용 시)

### `IOError`와 관련된 일반적인 `errno`

*   `EACCES`: 권한 거부됨 (파일 시스템 작업의 경우)
*   `EBADF`: 잘못된 파일 디스크립터 (`select.epoll` 사용 시); 쓰기 전용 `GzipFile`에 대한 읽기 작업, 또는 그 반대
*   `EBUSY`: 장치 또는 리소스 사용 중
*   `EISDIR`: 디렉토리임 (`open()` 시도 시)
*   `ENODEV`: 장치가 없음
*   `ENOENT`: 파일 또는 디렉토리가 없음 (`open()` 시도 시)
*   `ETIMEDOUT`: 연결 시간 초과

### `socket.error`와 관련된 일반적인 `errno`

이러한 모든 오류는 소켓의 파일 디스크립터에서 `read()`를 호출하는 경우와 같이 일반 `IOError`와도 연관될 수 있습니다.

*   `EAGAIN`: 리소스 일시적으로 사용 불가 (논블로킹 소켓 호출 중 `connect()` 제외)
*   `EALREADY`: 연결이 이미 진행 중 (논블로킹 `connect()` 중)
*   `EINPROGRESS`: 작업 진행 중 (논블로킹 `connect()` 중)
*   `EINTR`: 인터럽트된 함수 호출
*   `EISCONN`: 소켓이 연결됨
*   `ECONNABORTED`: 피어에 의해 연결 중단됨 (`accept()` 호출 중)
*   `ECONNREFUSED`: 피어에 의해 연결 거부됨
*   `ECONNRESET`: 피어에 의해 연결 재설정됨
*   `ENOTCONN`: 소켓이 연결되지 않음
*   `ESHUTDOWN`: 전송 엔드포인트 종료 후 전송할 수 없음
*   `EWOULDBLOCK`: `EAGAIN`과 동일한 이유

### `select.error`와 관련된 일반적인 `errno`

*   `EINTR`: 인터럽트된 함수 호출

## Appendix B: 발생한 OS 및 IO 오류 조사 (Survey of raised OS and IO errors)

### `VMSError`에 대하여 (About VMSError)

`VMSError`는 인터프리터 코어와 표준 라이브러리에서 전혀 사용되지 않습니다. 이는 2002년 Jean-François Piéronne이 제출한 OpenVMS 패치의 일부로 추가되었습니다. `VMSError`를 포함시킨 동기는 타사 패키지에서 발생할 수 있었기 때문입니다.

### 인터프리터 코어 (Interpreter core)

`PYTHONSTARTUP` 처리는 `IOError`를 발생시킵니다(그러나 오류는 버려집니다).

```bash
$ PYTHONSTARTUP=foox ./python
Python 3.2a0 (py3k:82920M, Jul 16 2010, 22:53:23)
[GCC 4.4.3] on linux2
Type "help", "copyright", "credits" or "license" for more information.
Could not open PYTHONSTARTUP
IOError: [Errno 2] No such file or directory: 'foox'
```

`PyObject_Print()`는 `FILE *` 매개변수(`stdout` 또는 `stderr`에 해당)에서 `ferror()`가 오류를 신호할 때 `IOError`를 발생시킵니다.

`mbcs` 인코딩을 사용하는 유니코드 인코딩 및 디코딩은 일부 오류 조건에 대해 `WindowsError`를 발생시킬 수 있습니다.

### 표준 라이브러리 (Standard library)

*   **bz2**: 전반적으로 `IOError`를 발생시킵니다(`OSError`는 사용되지 않음).
*   **curses**: 검사되지 않음.
*   **dbm.gnu, dbm.ndbm**: `_dbm.error`와 `_gdbm.error`는 `IOError`를 상속합니다.
*   **fcntl**: 전반적으로 `IOError`를 발생시킵니다(`OSError`는 사용되지 않음).
*   **imp module**: 잘못된 파일 디스크립터에 대해 `IOError`를 발생시킵니다.
*   **io module**: Unix에서 디렉토리를 열려고 할 때 `IOError`를 발생시킵니다. 지원되지 않는 작업에 대해 `IOError` 또는 `io.UnsupportedOperation` (전자를 상속)을 발생시킵니다. 하위 I/O 계층이 오작동할 때(`API`를 위반할 때) `IOError` 또는 `TypeError`를 발생시킵니다. 기본 OS 리소스가 유효하지 않게 되면 `IOError`를 발생시킵니다. 논블로킹 객체에 대한 호출이 블로킹될 때 `BlockingIOError` (IOError 상속)를 발생시킵니다.
*   **mmap**: Unix에서는 전반적으로 자체 `mmap.error` (EnvironmentError 상속)를 발생시킵니다. 그러나 Windows에서는 대부분 `WindowsError`를 발생시킵니다(소스 코드에는 `mmap.error`의 몇 가지 발생도 있음).
*   **multiprocessing**: 검사되지 않음.
*   **os / posix**: `os` (또는 `posix`) 모듈은 전반적으로 `OSError`를 발생시킵니다. Windows에서는 `WindowsError`가 대신 발생할 수 있습니다.
*   **ossaudiodev**: 전반적으로 `IOError`를 발생시킵니다(`OSError`는 사용되지 않음).
*   **readline**: 다양한 파일 처리 함수에서 `IOError`를 발생시킵니다.
*   **select**: `select()` 및 `poll` 객체는 아무것도 상속하지 않는 `select.error`를 발생시킵니다(그러나 `poll.modify()`는 `IOError`를 발생시킵니다). `epoll` 객체는 `IOError`를 발생시킵니다. `kqueue` 객체는 `OSError`와 `IOError`를 모두 발생시킵니다. 부수적으로, `EnvironmentError`를 상속하지 않는다는 것은 `select.error`가 유용한 `errno` 속성을 얻지 못한다는 것을 의미합니다. 사용자 코드는 대신 `args[0]`을 확인해야 합니다.
*   **signal**: `signal.ItimerError`는 `IOError`를 상속합니다.
*   **socket**: `socket.error`는 `IOError`를 상속합니다.
*   **sys**: `GetVersionEx()` 호출이 실패하면 `sys.getwindowsversion()`은 잘못된 오류 번호와 함께 `WindowsError`를 발생시킵니다.
*   **time**: `time.time()` 및 `time.sleep()`의 내부 오류에 대해 `IOError`를 발생시킵니다.
*   **zipimport**: `zipimporter.get_data()`는 `IOError`를 발생시킬 수 있습니다.

## 감사 (Acknowledgments)

Alyssa Coghlan으로부터 상당한 의견을 받았습니다.

## 참조 (References)

 "IO module precisions and exception hierarchy": `https://mail.python.org/pipermail/python-dev/2009-September/092130.html`
 Google Code Search of IOError in Python code: 약 40000개 결과; OSError: 약 15200개 결과; EnvironmentError: 약 3000개 결과
 `http://bugs.python.org/issue614055`

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.
Source: `https://github.com/python/peps/blob/main/peps/pep-3151.rst`
최종 수정: 2025-02-01 08:59:27 GMT

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.