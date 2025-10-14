---
title: "[Withdrawn] PEP 3145 - Asynchronous I/O For subprocess.Popen"
excerpt: "Python Enhancement Proposal 3145: 'Asynchronous I/O For subprocess.Popen'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3145/
toc: true
toc_sticky: true
date: 2025-09-27 14:37:24+0900
last_modified_at: 2025-09-27 14:37:24+0900
published: true
---
> **원문 링크:** [PEP 3145 - Asynchronous I/O For subprocess.Popen](https://peps.python.org/pep-3145/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 04-Aug-2009

## PEP 3145 – `subprocess.Popen`을 위한 비동기 I/O

*   **작성자:** Eric Pruitt, Charles R. McCreary, Josiah Carlson
*   **상태:** 철회됨 (Withdrawn)
*   **유형:** 표준 트랙 (Standards Track)
*   **생성일:** 2009년 8월 4일
*   **Python 버전:** 3.2

### 개요 (Abstract)

현재 `subprocess.Popen` 구현은 자식 프로세스(child process)로부터 데이터를 기다리는 동안 데드락(dead-locking)이 발생하거나 부모 Python 스크립트를 블로킹(blocking)하는 경향이 있습니다. 이 PEP는 이러한 문제들을 완화하기 위해 `subprocess.Popen`을 더 비동기적으로 만들 것을 제안합니다.

### PEP 연기 (PEP Deferral)

이 PEP에서 다루는 개념에 대한 추가적인 탐색은 적어도 PEP 3156이 해결된 이후로 연기되었습니다.

### PEP 철회 (PEP Withdrawal)

이 문제는 버그 트래커에서 처리될 수 있습니다. 특정 제안은에 첨부되어 있습니다.

### 동기 (Motivation)

"python asynchronous subprocess"를 검색하면, 자식 프로세스를 실행하고 데이터를 생성하기를 기다리며 블로킹하는 대신, 사용 가능한 데이터만 주기적으로 읽어 자식 프로세스와 통신하기를 원하는 수많은 사람들의 사례를 찾을 수 있습니다. `subprocess` 모듈의 현재 동작은 사용자가 `stdin`, `stderr`, `stdout` 파일 객체를 통해 데이터를 보내거나 받을 때, 데드락이 흔하게 발생하며 이미 문서화되어 있습니다. `communicate()` 함수를 사용하여 일부 버퍼링 문제를 완화할 수 있지만, 자식 프로세스에서 읽을 수 있는 데이터가 없을 때 데이터를 읽으려고 시도하면 여전히 부모 프로세스를 블로킹하게 됩니다.

### 근거 (Rationale)

`subprocess.Popen`에 비동기적이고 논블로킹(non-blocking) 기능이 필요하다는 것은 이미 문서화된 요구 사항입니다. 이 코드를 포함하면 Unix 기반 및 Windows 빌드의 Python에서 사용할 수 있는 Python 표준 라이브러리의 유용성을 향상시킬 수 있습니다. Python의 거의 모든 I/O 객체에는 어떤 형태로든 파일과 유사한(file-like) 래퍼(wrapper)가 있습니다. 소켓은 이미 그렇게 작동하며, 문자열의 경우 `StringIO`가 있습니다. `Popen`은 `subprocess.Popen.stderr`, `stdout`, `stdin` 파일과 유사한 객체에 연결된 메서드를 사용하여 파일처럼 작동하도록 만들 수 있습니다. 그러나 이러한 옵션의 `read` 및 `write` 메서드를 사용할 때는 비동기 I/O의 이점을 얻을 수 없습니다. 제안된 솔루션에서는 래퍼가 비동기 메서드를 래핑하여 파일 객체를 모방합니다.

### 참조 구현 (Reference Implementation)

저는 테스트와 문서를 포함한 모든 변경 사항이 있는 Google Code 저장소와 개발 과정에서 겪었던 문제들을 상세히 설명하는 블로그를 유지하고 있습니다.

저는 `subprocess` 모듈에서 논블로킹 비동기 I/O를 구현하는 작업과 함께, 실행된 프로세스가 파일 객체가 가진 모든 메서드와 속성을 복제하여 파일의 역할을 할 수 있도록 하는 `subprocess.Popen`용 래퍼 클래스를 개발해왔습니다.

`subprocess.Popen` 클래스에는 두 가지 기본 함수가 추가되었습니다: `Popen.send`와 `Popen._recv`. 각각 Windows용과 Unix 기반 시스템용으로 두 가지 별도의 구현이 있습니다. Windows 구현은 `ctypes`를 사용하여 `kernel32.dll`의 파이프(pipe)를 비동기적으로 제어하는 데 필요한 함수에 접근합니다. Unix 기반 시스템에서는 파일 제어를 위한 Python 인터페이스가 동일한 목적을 수행합니다. `Popen.send`와 `Popen._recv`의 다른 구현들은 동일한 인자를 가져서, 이러한 함수를 사용하는 코드가 여러 플랫폼에서 작동하도록 합니다.

`Popen._recv` 함수를 호출할 때는 파이프 이름이 인자로 전달되어야 하므로, 기본적으로 `stdout`을 `Popen._recv`의 파이프로 선택하는 `Popen.recv` 함수가 존재합니다. `Popen.recv_err`는 기본적으로 `stderr`를 파이프로 선택합니다. `Popen.recv`와 `Popen.recv_err`는 각각 `Popen._recv('stdout' ...)` 및 `Popen._recv('stderr' ...)`보다 훨씬 읽고 이해하기 쉽습니다.

`Popen._recv` 함수는 데이터를 생성할 때까지 기다리지 않고 값을 반환하므로 빈 바이트(empty bytes)를 반환할 수 있습니다. `Popen.asyncread`는 주어진 시간 간격 동안 읽은 모든 데이터를 반환하여 이 문제를 처리합니다.

`ProcessIOWrapper` 클래스는 `asyncread` 및 `asyncwrite` 함수를 사용하여 프로세스가 파일처럼 작동하도록 하여, `subprocess.Popen` 호출에서 생성된 `stdout` 및 `stdin` 파일 객체를 사용할 때 발생할 수 있는 블로킹 문제를 방지합니다.

### 참고 자료 (References)

*   [ python-Feature Requests-1191964 ] asynchronous Subprocess
*   Daily Life in an Ivory Basement : /feb-07/problems-with-subprocess
*   How can I run an external command asynchronously from Python? - Stack Overflow
*   18.1. subprocess - Subprocess management - Python v2.6.2 documentation (`subprocess.Popen.wait`)
*   18.1. subprocess - Subprocess management - Python v2.6.2 documentation (`subprocess.Popen.kill`)
*   Issue 1191964: asynchronous Subprocess - Python tracker
*   Module to allow Asynchronous subprocess use on Windows and Posix platforms - ActiveState Code
*   subprocess.rst - subprocdev - Project Hosting on Google Code
*   subprocdev - Project Hosting on Google Code
*   Python Subprocess Dev
*   Idle: use pipes instead of sockets to talk with user subprocess

### 저작권 (Copyright)

이 P.E.P.는 Open Publication License (http://www.opencontent.org/openpub/)에 따라 라이선스가 부여됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.