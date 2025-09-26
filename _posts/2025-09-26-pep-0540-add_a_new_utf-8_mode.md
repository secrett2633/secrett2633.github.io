---
title: "[Final] PEP 540 - Add a new UTF-8 Mode"
excerpt: "Python Enhancement Proposal 540: 'Add a new UTF-8 Mode'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/540/
toc: true
toc_sticky: true
date: 2025-09-26 23:29:04+0900
last_modified_at: 2025-09-26 23:29:04+0900
published: true
---
> **원문 링크:** [PEP 540 - Add a new UTF-8 Mode](https://peps.python.org/pep-0540/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 05-Jan-2016

PEP 540: 새로운 UTF-8 모드 추가

## 요약 (Abstract)
PEP 540은 Python의 UTF-8 활용을 강화하기 위한 새로운 "UTF-8 모드" 추가를 제안합니다. 이 모드가 활성화되면 Python은 현재 플랫폼에 설정된 로케일(locale)과 관계없이 `utf-8` 인코딩을 사용하고, `stdin` 및 `stdout`의 오류 처리기(error handler)를 `surrogateescape`로 변경합니다. 이 모드는 기본적으로 비활성화되어 있지만, "POSIX" 로케일을 사용할 때 자동으로 활성화됩니다. UTF-8 모드를 제어하기 위해 `-X utf8` 명령줄 옵션과 `PYTHONUTF8` 환경 변수가 추가되었습니다.

## 도입 배경 (Rationale)

### 로케일 인코딩과 UTF-8 (Locale encoding and UTF-8)
Python 3.6에서는 파일명, 환경 변수, 표준 스트림 등에 로케일 인코딩을 사용합니다. 많은 사용자가 "C" 로케일 또는 "POSIX" 로케일에서 ASCII 인코딩을 상속받는데, 이는 비-ASCII 문자에 대한 지원이 매우 제한적입니다. 정확한 로케일을 얻기 어려운 경우도 많고, 로케일 이름이 운영체제마다 다르거나 C.UTF-8과 같은 일부 로케일은 특정 플랫폼에서만 지원됩니다.

반면 Python 3.6은 이미 macOS, Android, Windows (PEP 529)에서 대부분의 기능에 대해 기본적으로 UTF-8을 사용하고 있습니다 (`open()` 함수는 예외). UTF-8은 Python 스크립트, XML, JSON 파일 형식의 기본 인코딩이기도 합니다. 최신 플랫폼에서 데이터 읽기 및 쓰기에 UTF-8 지원이 거의 보편적이며, Python에서도 훌륭하게 지원됩니다. 문제는 로케일이 잘못 설정되는 경우가 많다는 것입니다. 따라서 로케일 인코딩을 무시하고 UTF-8을 사용하는 것이 합리적인 해결책으로 제시됩니다.

### 디코딩 불가능한 바이트를 위한 Passthrough: `surrogateescape` (Passthrough for undecodable bytes: surrogateescape)
Python 3는 기본 `strict` 오류 처리기를 사용하여 UTF-8에서 바이트를 디코딩할 때 디코딩 불가능한 첫 번째 바이트에서 `UnicodeDecodeError`를 발생시킵니다. 그러나 `cat`이나 `grep`과 같은 Unix 명령줄 도구와 대부분의 Python 2 애플리케이션은 데이터를 원시 바이트 시퀀스로 처리하므로 이러한 유형의 버그가 없습니다.

Python 3는 Unix 도구 및 Python 2처럼 동작하도록 `surrogateescape` 오류 처리기(PEP 383)를 제공합니다. 이는 데이터를 바이트처럼 처리하지만 실제로는 유니코드를 사용하며, 디코딩 불가능한 바이트는 서러게이트(surrogate) 문자로 저장됩니다. UTF-8 모드는 `stdin` 및 `stdout`에 `surrogateescape` 오류 처리기를 설정합니다. 이는 이들 스트림이 Unix 명령줄 도구와 일반적으로 연관되어 있기 때문입니다. 그러나 파일에 대해서는 다른 기대치가 있어 `open()`의 기본 오류 처리기는 `strict`로 유지됩니다.

### 최상의 하위 호환성을 위한 기본값 변경 없음 (No change by default for best backward compatibility)
UTF-8이 대부분의 경우 완벽하지만, 때로는 로케일 인코딩이 최상의 인코딩일 수도 있습니다. 이 PEP는 POSIX 로케일의 동작만 변경합니다. 이는 POSIX 로케일이 일반적으로 ASCII 인코딩과 동일하며, UTF-8이 훨씬 더 나은 선택이기 때문입니다. 다른 로케일에 대한 동작은 잠재적인 위험이나 회귀를 방지하기 위해 변경되지 않습니다.

## 제안 (Proposal)
새로운 UTF-8 모드는 UTF-8 인코딩을 사용하고 로케일 인코딩을 무시하며, `stdin` 및 `stdout` 오류 처리기를 `surrogateescape`로 변경합니다.

사용자는 `-X utf8` 명령줄 옵션 또는 `PYTHONUTF8=1` 환경 변수를 설정하여 UTF-8 모드를 명시적으로 활성화할 수 있습니다. 이 모드는 기본적으로 비활성화되어 있지만 POSIX 로케일에 의해 활성화됩니다. `-X utf8=0` 명령줄 옵션 또는 `PYTHONUTF8=0` 환경 변수를 통해 명시적으로 비활성화할 수도 있습니다.

표준 스트림의 경우 `PYTHONIOENCODING` 환경 변수가 UTF-8 모드보다 우선합니다. Windows에서는 `PYTHONLEGACYWINDOWSFSENCODING` 환경 변수(PEP 529)가 UTF-8 모드보다 우선합니다.

### UTF-8 모드의 영향 (Effects of UTF-8 Mode):
*   `sys.getfilesystemencoding()`는 `'UTF-8'`을 반환합니다.
*   `locale.getpreferredencoding()`는 `'UTF-8'`을 반환합니다. 이 함수의 `do_setlocale` 인자와 로케일 인코딩은 무시됩니다.
*   `sys.stdin` 및 `sys.stdout`의 오류 처리기는 `surrogateescape`로 설정됩니다.

### 부작용 (Side effects):
*   `open()`은 기본적으로 UTF-8 인코딩을 사용하지만, 기본 오류 처리기는 `strict`로 유지됩니다.
*   `os.fsdecode()` 및 `os.fsencode()`는 UTF-8 인코딩을 사용합니다.
*   명령줄 인수, 환경 변수 및 파일명은 UTF-8 인코딩을 사용합니다.

## 로케일 강제 변환 (PEP 538)과의 관계 (Relationship with the locale coercion (PEP 538))
POSIX 로케일은 로케일 강제 변환(PEP 538)과 UTF-8 모드(PEP 540)를 모두 활성화합니다. 로케일 강제 변환이 활성화되면 UTF-8 모드를 활성화해도 추가적인 효과는 없습니다.

UTF-8 모드는 로케일 강제 변환과 동일한 효과를 가집니다:
*   `sys.getfilesystemencoding()`는 `'UTF-8'`을 반환합니다.
*   `locale.getpreferredencoding()`는 `'UTF-8'`을 반환합니다.
*   `sys.stdin` 및 `sys.stdout`의 오류 처리기는 `surrogateescape`로 설정됩니다.

이러한 변경 사항은 Python 코드에만 영향을 미치지만, 로케일 강제 변환은 `LC_CTYPE` 환경 변수와 `LC_CTYPE` 로케일을 `C.UTF-8`과 같은 UTF-8 로케일로 설정하여 비-Python 코드에도 영향을 줍니다. 두 PEP는 상호 보완적입니다.

Centos 7과 같이 로케일 강제 변환이 지원되지 않는 플랫폼에서는 POSIX 로케일이 UTF-8 모드만 활성화합니다. 이 경우 Python 코드는 UTF-8 인코딩을 사용하고 로케일 인코딩을 무시하지만, 비-Python 코드는 POSIX 로케일의 기본값인 ASCII 인코딩을 사용합니다.

UTF-8 모드는 모든 플랫폼에서 지원되며 어떤 로케일에서도 활성화할 수 있지만, 로케일 강제 변환은 모든 플랫폼에서 지원되지 않으며 POSIX 로케일로 제한됩니다.

UTF-8 모드는 `PYTHONUTF8` 환경 변수가 `1`로 설정된 경우 Python 자식 프로세스에만 영향을 미치지만, 로케일 강제 변환은 `LC_CTYPE` 환경 변수를 설정하여 모든 자식 프로세스에 영향을 미칩니다.

로케일 강제 변환 접근 방식의 장점은 바이너리 확장 모듈 및 자식 프로세스의 인코딩 처리와 Python의 인코딩 처리 간의 일관성을 보장하는 데 도움이 된다는 것입니다. UTF-8 모드 접근 방식의 장점은 임베딩 애플리케이션이 프로세스의 전역 로케일 설정을 변경하지 않고도 인터프리터의 동작을 변경할 수 있다는 것입니다.

## 하위 호환성 (Backward Compatibility)
유일한 하위 호환성 위반 변경 사항은 POSIX 로케일이 이제 기본적으로 UTF-8 모드를 활성화한다는 것입니다. 즉, UTF-8 인코딩을 사용하고 로케일 인코딩을 무시하며 `stdin` 및 `stdout` 오류 처리기를 `surrogateescape`로 변경합니다.

## 부록: 인코딩 및 오류 처리기 (Annex: Encodings And Error Handlers)
UTF-8 모드는 `open()`, `os.fsdecode()`, `os.fsencode()`, `sys.stdin`, `sys.stdout`, `sys.stderr`에서 사용되는 기본 인코딩 및 오류 처리기를 변경합니다.

| 함수                  | 기본 (Default)      | UTF-8 모드 또는 POSIX 로케일 |
| :-------------------- | :------------------ | :----------------------------- |
| `open()`              | `locale/strict`     | `UTF-8/strict`                 |
| `os.fsdecode()`, `os.fsencode()` | `locale/surrogateescape` | `UTF-8/surrogateescape`        |
| `sys.stdin`, `sys.stdout` | `locale/strict`     | `UTF-8/surrogateescape`        |
| `sys.stderr`          | `locale/backslashreplace` | `UTF-8/backslashreplace`       |

### Windows에서의 인코딩 및 오류 처리기 (Encoding and error handler on Windows)
Windows에서는 인코딩과 오류 처리기가 다릅니다.

| 함수                  | 기본 (Default)      | Legacy Windows FS encoding | UTF-8 모드 |
| :-------------------- | :------------------ | :------------------------- | :--------- |
| `open()`              | `mbcs/strict`       | `mbcs/strict`              | `UTF-8/strict` |
| `os.fsdecode()`, `os.fsencode()` | `UTF-8/surrogatepass` | `mbcs/replace`             | `UTF-8/surrogatepass` |
| `sys.stdin`, `sys.stdout` | `UTF-8/surrogateescape` | `UTF-8/surrogateescape`    | `UTF-8/surrogateescape` |
| `sys.stderr`          | `UTF-8/backslashreplace` | `UTF-8/backslashreplace` | `UTF-8/backslashreplace` |

`PYTHONLEGACYWINDOWSFSENCODING` 환경 변수에 의해 "Legacy Windows FS encoding"이 활성화됩니다.

`stdin` 및/또는 `stdout`이 파이프(pipe)로 리디렉션된 경우, `sys.stdin` 및/또는 `sys.stdout`은 기본적으로 UTF-8 대신 `mbcs` 인코딩을 사용합니다. 그러나 UTF-8 모드에서는 `sys.stdin` 및 `sys.stdout`이 항상 UTF-8 인코딩을 사용합니다.

참고: Windows에는 POSIX 로케일이 없습니다. ANSI 코드 페이지가 로케일 인코딩으로 사용되며, 이 코드 페이지는 결코 ASCII 인코딩을 사용하지 않습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.