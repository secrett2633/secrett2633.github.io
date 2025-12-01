---
title: "[Final] PEP 528 - Change Windows console encoding to UTF-8"
excerpt: "Python Enhancement Proposal 528: 'Change Windows console encoding to UTF-8'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/528/
toc: true
toc_sticky: true
date: 2025-09-26 23:19:55+0900
last_modified_at: 2025-09-26 23:19:55+0900
published: true
---
> **원문 링크:** [PEP 528 - Change Windows console encoding to UTF-8](https://peps.python.org/pep-0528/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 27-Aug-2016



---

## PEP 528 – Windows 콘솔 인코딩을 UTF-8로 변경

### 개요 (Abstract)
과거에 Python은 Windows 운영체제와의 상호작용을 위해 ANSI API를 주로 사용했습니다. 그러나 이러한 ANSI API는 UTF-16 API에 비해 권장되지 않아 왔습니다. 운영체제 내부에서는 모든 텍스트가 UTF-16으로 표현되며, ANSI API는 활성 코드 페이지를 사용하여 인코딩 및 디코딩을 수행합니다.

이 PEP는 Windows에서 기본 표준 스트림 구현을 유니코드 API를 사용하도록 변경할 것을 제안합니다. 이를 통해 사용자는 기본 Windows 콘솔에서 전체 범위의 유니코드 문자를 출력하고 입력할 수 있게 됩니다. 또한, 토크나이저(tokenizer)가 readline 훅(hook)으로부터 텍스트를 파싱하는 방식에도 미묘한 변경이 필요합니다.

### 주요 변경 사항 (Specific Changes)

1.  **`_io.WindowsConsoleIO` 추가** :
    *   현재 표준 입력, 출력, 에러를 나타내는 파일 디스크립터를 래핑(wrap)하기 위해 `_io.FileIO` 인스턴스가 사용됩니다.
    *   이 PEP는 C로 구현된 새로운 클래스 `_io.WindowsConsoleIO`를 추가하여, `ReadConsoleW` 및 `WriteConsoleW`와 같은 Windows 콘솔 함수를 사용하는 로우(raw) I/O 객체 역할을 합니다.
    *   이 클래스는 레거시 모드(legacy-mode) 플래그가 비활성화되어 있고, 파일 디스크립터로 표준 스트림을 열 때 해당 스트림이 리디렉션된 파일이 아닌 콘솔 버퍼일 경우에 사용됩니다. 그 외의 경우에는 기존과 같이 `_io.FileIO`가 사용됩니다.
    *   `_io.WindowsConsoleIO`는 텍스트를 `utf-8`로 인코딩하여 전달해야 하며, 이는 `utf-16-le`로 디코딩되어 Windows API로 전달됩니다. 마찬가지로, 운영체제로부터 읽은 바이트는 `utf-16-le`로 제공되며 Python으로 반환될 때 `utf-8`로 변환됩니다.
    *   ASCII 호환 인코딩을 사용하는 것은 `TextIOWrapper`를 우회하고 ASCII 바이트를 표준 스트림에 직접 쓰는 코드(예: Twisted의 `process_stdinreader.py`)와의 호환성을 유지하기 위해 필요합니다. 표준 스트림에 대해 ASCII 외의 특정 인코딩을 가정하는 코드는 호환성 문제가 발생할 수 있습니다.

2.  **`_PyOS_WindowsConsoleReadline` 추가** :
    *   대화형 프롬프트에서 유니코드 입력을 허용하기 위해 새로운 readline 훅이 필요합니다.
    *   기존의 `PyOS_StdioReadline` 함수는 파일 디스크립터가 콘솔 버퍼이고 레거시 모드 플래그가 비활성화되어 있을 때 새로운 `_PyOS_WindowsConsoleReadline` 함수로 위임(delegate)합니다.
    *   readline 인터페이스는 널(null)이 포함되지 않은 8비트 인코딩된 문자열을 반환해야 하므로, `_PyOS_WindowsConsoleReadline` 함수는 운영체제로부터 읽은 `utf-16-le`를 `utf-8`로 변환(transcode)합니다.
    *   `sys.stdin`에서 인코딩을 가져오는 `PyRun_InteractiveOneObject` 함수는 레거시 모드 플래그가 활성화되지 않는 한 `utf-8`을 선택합니다. 이는 readline 훅이 인코딩을 `utf-8`로 변경하거나, 올바른 동작을 위해 레거시 모드를 요구할 수 있습니다.

3.  **레거시 모드 (Legacy Mode) 추가** :
    *   환경 변수 `PYTHONLEGACYWINDOWSSTDIO`를 설정하여 Python을 실행하면 레거시 모드 플래그가 활성화되어 이전 동작을 완전히 복원합니다.

### 대안적 접근 방식 (Alternative Approaches)
`win_unicode_console` 패키지는 콘솔의 기본 동작을 변경하는 순수 Python 대안입니다. 이 패키지는 여기에서 설명하는 것과 본질적으로 동일한 수정을 순수 Python 코드를 사용하여 구현합니다.

### 호환성 문제 발생 가능 코드 (Code that may break)
다음과 같은 코드 패턴은 이 변경의 결과로 오작동하거나 다른 동작을 보일 수 있습니다. 이러한 코드 샘플들은 가시적인 변경을 방지할 수 있는 더 편리한 래퍼(wrapper) 대신 로우(raw) 파일 객체를 명시적으로 사용하도록 선택한 경우에 해당합니다.

1.  **`stdin`/`stdout` 인코딩 가정** :
    *   `sys.stdin.buffer` 또는 `sys.stdout.buffer`가 요구하는 인코딩이 `'mbcs'` 또는 더 특정적인 인코딩이라고 가정하는 코드는 현재 우연히 작동하고 있을 수 있지만, 이 변경으로 인해 문제가 발생할 수 있습니다.
    *   **수정 방법** : `TextIOWrapper`에 지정된 인코딩을 암시적으로 또는 명시적으로 사용합니다.
        ```python
        # Fix 1: 래퍼를 올바르게 사용
        sys.stdout.write(text)
        r = sys.stdin.read(16)

        # Fix 2: 인코딩을 명시적으로 사용
        sys.stdout.buffer.write(text.encode(sys.stdout.encoding))
        r = sys.stdin.buffer.read(16).decode(sys.stdin.encoding)
        ```

2.  **로우 객체(raw object)의 잘못된 사용** :
    *   로우 I/O 객체를 사용하고 부분 읽기/쓰기를 올바르게 처리하지 않는 코드가 영향을 받을 수 있습니다.
    *   특히 읽기 작업의 경우, 읽은 문자 수가 허용된 바이트 수의 1/4을 초과하지 않을 수 있는데, 이는 입력이 훨씬 긴 `utf-8` 문자열로 인코딩되는 것을 막을 실현 가능한 방법이 없기 때문입니다.
    *   **수정 방법** : 버퍼링된 리더/라이터(buffered reader/writer)를 사용하거나, 호출자가 버퍼가 가득 찰 때까지 계속 읽어야 합니다.
        ```python
        # Fix 1: 버퍼링된 리더/라이터를 사용
        stdin = sys.stdin.buffer
        data = stdin.read(15)

        # Fix 2: 충분한 바이트가 읽힐 때까지 루프
        raw_stdin = sys.stdin.buffer.raw
        b = b''
        while len(b) < 15:
            b += raw_stdin.read(15)
        ```

3.  **작은 버퍼로 로우 객체 사용** :
    *   로우 I/O 객체를 사용하고 4자 미만을 읽으려고 시도하는 코드는 이제 오류를 받게 됩니다. 단일 문자가 `utf-8`로 표현될 때 최대 4바이트를 필요로 할 수 있기 때문에 이러한 요청은 실패합니다.
    *   **수정 방법** : 더 큰 버퍼를 전달해야 합니다.
        ```python
        # Fix: 최소 4바이트를 요청
        raw_stdin = sys.stdin.buffer.raw
        data = raw_stdin.read(4)
        ```

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.