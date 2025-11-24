---
title: "[Final] PEP 324 - subprocess - New process module"
excerpt: "Python Enhancement Proposal 324: 'subprocess - New process module'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/324/
toc: true
toc_sticky: true
date: 2025-09-26 18:31:27+0900
last_modified_at: 2025-09-26 18:31:27+0900
published: true
---
> **원문 링크:** [PEP 324 - subprocess - New process module](https://peps.python.org/pep-0324/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 19-Nov-2003


## PEP 324 – `subprocess` 모듈: 새로운 프로세스 모듈

### 개요 (Abstract)
이 PEP는 새로운 프로세스를 시작하고 통신하는 기능을 제공하는 `subprocess` 모듈에 대해 설명합니다.

### 동기 (Motivation)
새로운 프로세스를 시작하는 것은 프로그래밍 언어에서 흔한 작업이며, 특히 Python과 같은 고급 언어에서는 매우 일반적입니다. 이 작업을 잘 지원하는 것이 중요한 이유는 다음과 같습니다:
*   프로세스 시작에 부적절한 함수를 사용하면 보안 위험이 발생할 수 있습니다. 예를 들어, 셸을 통해 프로그램을 시작하고 인수에 셸 메타 문자가 포함되면 심각한 문제가 발생할 수 있습니다.
*   `subprocess` 모듈은 Python을 복잡한 셸 스크립트를 대체하는 더 나은 언어로 만듭니다.

현재 Python에는 프로세스 생성에 사용되는 다양한 함수들이 존재하여 개발자들이 선택하기 어렵다는 문제가 있었습니다. `subprocess` 모듈은 기존 함수들에 비해 다음과 같은 향상된 기능을 제공합니다:
*   모든 기능을 하나의 "통합된" 모듈로 제공합니다.
*   자식 프로세스에서 새 프로세스 실행 전 발생하는 예외가 부모 프로세스에 다시 발생(re-raise)되어 `exec()` 실패를 쉽게 처리할 수 있습니다.
*   `fork`와 `exec` 사이에 사용자 정의 코드를 실행할 수 있는 후크(hook)를 제공합니다 (예: `uid` 변경).
*   `/bin/sh`를 암묵적으로 호출하지 않아 위험한 셸 메타 문자를 이스케이프할 필요가 없습니다.
*   파일 디스크립터(file descriptor) 리디렉션의 모든 조합이 가능합니다.
*   새 프로그램 실행 전에 모든 열린 파일 디스크립터를 닫을지 제어할 수 있습니다.
*   여러 서브프로세스를 연결하는 기능(셸의 "파이프"와 유사)을 지원합니다.
*   유니버설 개행 문자(Universal newline)를 지원합니다.
*   `communicate()` 메서드를 통해 교착 상태(deadlock) 위험 없이 `stdin`으로 데이터를 보내고 `stdout` 및 `stderr` 데이터를 쉽게 읽을 수 있습니다.

### 설계 근거 (Rationale)
`subprocess` 모듈의 설계는 주로 다음과 같은 점들을 요약합니다:
*   기존의 검증된 `popen2` 모듈을 기반으로 하였습니다.
*   `popen2`의 팩토리 함수(factory functions)는 제거되었으며, 단일 `Popen` 클래스 생성자를 사용하는 것이 더 직관적이라고 판단했습니다. `subprocess`는 12가지의 리디렉션 조합을 지원하므로, 각 조합에 대한 개별 클래스나 함수를 제공하는 것은 번거롭고 직관적이지 않습니다.
*   `os.system()`을 대체하면서 사용하기 쉬운 유틸리티 함수 `subprocess.call()`이 제공됩니다. 이 함수는 `system()` 함수의 제한을 가지지 않고, 셸을 암묵적으로 호출하지 않으며, 인용(quoting)이 필요 없고, 반환 값 처리가 더 쉽습니다.
*   `call()` 함수는 `Popen` 클래스 생성자와 동일하게 `args` 인수를 받으며, 명령이 완료될 때까지 기다린 후 `returncode` 속성을 반환합니다.

### 명세 (Specification)
`subprocess` 모듈은 주로 하나의 클래스인 `Popen`을 정의합니다.

```python
class Popen(args, bufsize=0, executable=None, stdin=None, stdout=None, stderr=None,
             preexec_fn=None, close_fds=False, shell=False, cwd=None, env=None,
             universal_newlines=False, startupinfo=None, creationflags=0):
```
주요 인수는 다음과 같습니다:
*   `args`: 실행할 프로그램 인수(문자열 또는 시퀀스).
*   `bufsize`: 버퍼 크기. `0`은 버퍼링 없음, `1`은 라인 버퍼링, 음수는 시스템 기본값.
*   `stdin`, `stdout`, `stderr`: 자식 프로세스의 표준 입출력 및 에러 핸들 지정. `PIPE`, 기존 파일 디스크립터, 기존 파일 객체, 또는 `None`이 될 수 있습니다. `stderr`는 `STDOUT`으로 설정하여 `stdout`과 동일한 핸들로 캡처할 수도 있습니다.
*   `preexec_fn`: 자식 프로세스가 실행되기 직전에 호출될 콜러블(callable) 객체.
*   `close_fds`: `True`인 경우, 자식 프로세스 실행 전에 0, 1, 2를 제외한 모든 파일 디스크립터를 닫습니다.
*   `shell`: `True`인 경우, 지정된 명령이 셸을 통해 실행됩니다.
*   `cwd`: 자식 프로세스 실행 전에 현재 디렉터리를 변경합니다.
*   `env`: 새 프로세스의 환경 변수를 정의합니다.
*   `universal_newlines`: `True`인 경우 `stdout` 및 `stderr` 파일 객체를 텍스트 파일로 열며, 모든 종류의 개행 문자(`\n`, `\r`, `\r\n`)를 `\n`으로 처리합니다.
*   `startupinfo`, `creationflags`: Windows 전용으로 `CreateProcess()` 함수에 전달됩니다.

또한, `subprocess.call(*args, **kwargs)` 함수는 명령을 실행하고 완료될 때까지 기다린 후 `returncode` 속성을 반환하는 편리한 단축 기능을 제공합니다.

### 예외 (Exceptions)
새 프로그램이 실행되기 전에 자식 프로세스에서 발생한 예외는 부모 프로세스에 다시 발생됩니다. 이 예외 객체에는 자식 프로세스 관점의 traceback 정보를 담은 `child_traceback` 속성이 추가됩니다.
*   가장 흔한 예외는 `OSError`이며, 존재하지 않는 파일을 실행하려 할 때 발생합니다.
*   유효하지 않은 인수로 `Popen`을 호출하면 `ValueError`가 발생합니다.

### 보안 (Security)
`subprocess` 모듈은 다른 `popen` 함수와 달리 `/bin/sh`를 암묵적으로 호출하지 않습니다. 이는 셸 메타 문자를 포함한 모든 문자를 자식 프로세스에 안전하게 전달할 수 있음을 의미합니다.

### `Popen` 객체
`Popen` 클래스의 인스턴스는 다음과 같은 메서드와 속성을 가집니다:
*   **메서드:**
    *   `poll()`: 자식 프로세스 종료 여부를 확인하고 `returncode`를 반환합니다.
    *   `wait()`: 자식 프로세스가 종료될 때까지 기다리고 `returncode`를 반환합니다.
    *   `communicate(input=None)`: 프로세스와 상호작용합니다. `stdin`으로 데이터를 보내고 `stdout` 및 `stderr`에서 데이터를 읽으며, 프로세스가 종료될 때까지 기다립니다. `(stdout, stderr)` 튜플을 반환합니다. (주의: 데이터가 메모리에 버퍼링되므로 대량의 데이터에는 적합하지 않습니다)
*   **속성:**
    *   `stdin`, `stdout`, `stderr`: `PIPE`로 지정된 경우 해당 파일 객체.
    *   `pid`: 자식 프로세스의 프로세스 ID.
    *   `returncode`: 자식 프로세스의 반환 코드. `None`은 아직 종료되지 않음을 의미하며, 음수 값 `-N`은 시그널 `N`에 의해 종료되었음을 의미합니다 (UNIX 한정).

### 이전 함수들을 `subprocess` 모듈로 대체하기
이 섹션에서는 기존 함수들이 `subprocess` 모듈의 기능으로 어떻게 대체될 수 있는지 설명합니다. 이전 함수들은 실행할 프로그램을 찾을 수 없는 경우 조용히 실패했지만, `subprocess` 모듈은 `OSError` 예외를 발생시킵니다.

*   `/bin/sh` 셸 역따옴표(backquote) 대체:
    `output=`mycmd myarg`` ==> `output = Popen(["mycmd", "myarg"], stdout=PIPE).communicate()[0]`
*   셸 파이프라인(pipe line) 대체:
    `output=`dmesg | grep hda`` ==>
    ```python
    p1 = Popen(["dmesg"], stdout=PIPE)
    p2 = Popen(["grep", "hda"], stdin=p1.stdout, stdout=PIPE)
    output = p2.communicate()[0]
    ```
*   `os.system()` 대체:
    `sts = os.system("mycmd" + " myarg")` ==>
    ```python
    p = Popen("mycmd" + " myarg", shell=True)
    sts = os.waitpid(p.pid, 0)
    ```
    더 나은 예제:
    ```python
    try:
        retcode = call("mycmd" + " myarg", shell=True)
        if retcode < 0:
            print(f"Child was terminated by signal {-retcode}", file=sys.stderr)
        else:
            print(f"Child returned {retcode}", file=sys.stderr)
    except OSError as e:
        print(f"Execution failed: {e}", file=sys.stderr)
    ```
*   `os.spawn*` 함수 대체:
    `os.spawnlp(os.P_NOWAIT, "/bin/mycmd", "mycmd", "myarg")` ==> `Popen(["/bin/mycmd", "myarg"]).pid`
    `os.spawnlp(os.P_WAIT, "/bin/mycmd", "mycmd", "myarg")` ==> `call(["/bin/mycmd", "myarg"])`
    환경 변수 사용 예제:
    `os.spawnlpe(os.P_NOWAIT, "/bin/mycmd", "mycmd", "myarg", env)` ==> `Popen(["/bin/mycmd", "myarg"], env={"PATH": "/usr/bin"})`
*   `os.popen*` 함수 대체:
    `pipe = os.popen(cmd, mode='r', bufsize)` ==> `pipe = Popen(cmd, shell=True, bufsize=bufsize, stdout=PIPE).stdout`
    `pipe = os.popen(cmd, mode='w', bufsize)` ==> `pipe = Popen(cmd, shell=True, bufsize=bufsize, stdin=PIPE).stdin`
    `os.popen2`, `os.popen3`, `os.popen4` 또한 `Popen`과 `PIPE`, `STDOUT` 인수를 조합하여 대체 가능합니다.
*   `popen2.*` 함수 대체:
    `popen2.popen2("somestring", bufsize, mode)` ==>
    ```python
    p = Popen(["somestring"], shell=True, bufsize=bufsize, stdin=PIPE, stdout=PIPE, close_fds=True)
    (child_stdout, child_stdin) = (p.stdout, p.stdin)
    ```
    `subprocess.Popen`은 실행 실패 시 예외를 발생시키고, `capturestderr` 인수가 `stderr` 인수로 대체되었으며, `stdin=PIPE` 및 `stdout=PIPE`를 명시해야 합니다. 또한, `popen2`는 기본적으로 모든 파일 디스크립터를 닫지만, `subprocess.Popen`에서는 `close_fds=True`를 명시해야 합니다.

### 해결되지 않은 문제 (Open Issues)
다음과 같은 기능들이 요청되었으나 아직 구현되지 않았습니다:
*   여러 서브프로세스 관리 지원
*   "데몬" 프로세스 관리 지원
*   서브프로세스를 종료(killing)하는 내장 메서드

이러한 기능들은 유용하지만, 나중에 문제없이 추가될 수 있을 것으로 예상됩니다.

`pty` 지원을 포함한 `expect`와 유사한 기능도 요청되었으나, `pty` 지원은 플랫폼 종속성이 높아 문제가 있으며, 이미 이러한 기능을 제공하는 다른 모듈들이 존재합니다.

### 하위 호환성 (Backwards Compatibility)
`subprocess`는 새로운 모듈이므로 주요 하위 호환성 문제는 예상되지 않습니다. 모듈 이름 "subprocess"는 이전에 다른 모듈과 충돌할 수 있지만, 현재까지는 가장 적절한 이름으로 간주됩니다.

이 새로운 모듈이 대체하려는 `os.system`, `os.spawn*`, `os.popen*`, `popen2.*`, `commands.*`와 같은 함수 및 모듈은 하위 호환성 유지를 위해 향후 Python 버전에서도 오랫동안 사용 가능할 것으로 예상됩니다.

### 참조 구현 (Reference Implementation)
참조 구현은 `http://www.lysator.liu.se/~astrand/popen5/`에서 확인할 수 있습니다.

### 저작권 (Copyright)
이 문서는 퍼블릭 도메인(Public Domain)에 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.