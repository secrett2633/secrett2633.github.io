---
title: "[Draft] PEP 776 - Emscripten Support"
excerpt: "Python Enhancement Proposal 776: 'Emscripten Support'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/776/
toc: true
toc_sticky: true
date: 2025-09-27 13:55:47+0900
last_modified_at: 2025-09-27 13:55:47+0900
published: true
---
> **원문 링크:** [PEP 776 - Emscripten Support](https://peps.python.org/pep-0776/)
>
> **상태:** Draft | **유형:** Informational | **작성일:** 18-Mar-2025


# PEP 776 – Emscripten 지원

## 개요 (Abstract)

Emscripten은 C/C++ 코드를 WebAssembly/JavaScript 실행 파일로 컴파일하여 브라우저 및 Node.js를 포함한 JavaScript 런타임에서 사용할 수 있게 하는 완전한 오픈 소스 컴파일러 도구 체인입니다. Rust 언어 또한 Emscripten 타겟을 지원합니다.

이 PEP는 2024년 10월 25일 Steering Council에 의해 승인된 Python 3.14의 Emscripten 지원에 대한 Tier 3 추가를 공식화합니다. 목표는 다음과 같습니다:
*   CPython Emscripten 런타임의 현재 상태를 설명합니다.
*   Pyodide 런타임의 현재 상태를 설명합니다.
*   Pyodide 런타임에서 CPython Emscripten 런타임으로 업스트림될 사소한 기능들을 식별합니다.

여기서 식별된 사소한 기능들은 PEP 없이도 구현될 수 있는 모든 기능들입니다. 더 중요한 런타임 기능들도 논의하지만, 해당 기능들에 대한 결정은 후속 PEP로 연기됩니다.

## 동기 (Motivation)

웹 브라우저는 Windows, macOS, Linux 및 모든 스마트폰에서 사용할 수 있는 범용 컴퓨팅 플랫폼입니다.

Pyodide 프로젝트는 2018년부터 Emscripten Python을 지원해 왔습니다. Capytale 및 PyodideU와 같은 프로젝트를 통해 수십만 명의 학생들이 Pyodide를 통해 Python을 배웠습니다. Pyodide는 Python 패키지에서 대화형 문서 (interactive documentation)를 제공하는 데도 점점 더 많이 사용되고 있습니다. 이는 Emscripten 플랫폼의 중요성과 성숙도를 모두 보여줍니다.

Emscripten과 WASI는 의미 있는 샌드박싱 (sandboxing)을 제공하는 유일한 지원 플랫폼이기도 합니다.

## Emscripten 플랫폼 정보 (Emscripten Platform Information)

### "Pyodide" vs "Emscripten Python"

이 문서에서는 "Emscripten Python"이라는 용어를 `python/cpython` 저장소에서 유지 관리되는 Emscripten Python을 지칭하며, 다운스트림 추가 기능이 없는 것을 의미합니다. Emscripten Python의 기능과 Pyodide의 기능을 대조하여 설명합니다.

Pyodide는 GitHub에서 유지 관리되며 jsDelivr, npm 및 GitHub 릴리스를 통해 배포됩니다. Emscripten Python은 배포되지 않지만, 개발 가이드 (devguide)의 지침에 따라 빌드할 수 있습니다.

### Emscripten 배경 (Background on Emscripten)

Emscripten은 LLVM 기반의 C 및 C++ 컴파일러와 링커, 그리고 약간 패치된 musl libc 기반의 런타임으로 구성됩니다. Emscripten은 POSIX 기반 플랫폼으로, WebAssembly 바이너리 형식과 WebAssembly 동적 링크 섹션을 사용합니다. `emcc` 컴파일러는 `clang`의 래퍼이며, `emcc` 링커는 `wasm-ld` (LLVM 툴체인의 일부)의 래퍼입니다.

Emscripten은 이식 가능한 C/C++ 코드의 Linux와의 소스 호환성을 상당히 포괄적으로 지원하며, 특정 예외 사항들이 있습니다. CPython은 이미 Emscripten으로의 컴파일을 지원하며, 일반적인 Linux 타겟에 대한 수정은 매우 적습니다.

### POSIX 규정 준수 (POSIX Compliance)

Emscripten은 POSIX 플랫폼입니다. 그러나 존재하는 POSIX API 중에는 호출 시 항상 실패하는 API가 있고, 아예 존재하지 않는 API도 있습니다. 특히 네트워킹 API 및 블로킹 I/O에 문제가 있으며, `fork()`는 지원되지 않습니다. Emscripten 실행 파일은 스레딩 지원과 함께 링크될 수 있지만, 몇 가지 제한 사항이 있습니다:
*   스레딩을 활성화하려면 Spectre 스타일 정보 유출 가능성을 수락한다는 특수 보안 헤더와 함께 웹사이트가 제공되어야 합니다.
*   실행 파일이 스레딩과 동적 로더 (dynamic loader) 모두와 함께 링크된 경우, Emscripten은 동적 로딩과 pthreads를 함께 사용하는 것이 실험적이라는 경고를 출력합니다.

이러한 제한 때문에 Pyodide는 Python의 스레드 없는 (no-pthreads) 빌드를 표준화합니다.

### 개발 도구 (Development Tools)

Emscripten 개발 도구는 Linux, Windows, macOS에서 모두 잘 지원됩니다. 업스트림 도구에는 Emscripten 컴파일러 툴체인(`emcc`)을 설치하는 데 사용할 수 있는 Emscripten Software Developer Kit (`emsdk`)이 포함됩니다. Node.js는 명령줄에서 Emscripten 프로그램을 실행하는 "에뮬레이터"로 사용될 수 있습니다. Selenium, Playwright 또는 Puppeteer와 같은 브라우저 자동화 도구를 사용하여 브라우저 전용 기능을 테스트할 수 있습니다.

Pyodide의 도구는 다음과 같습니다:
*   `pyodide build`: Python 패키지를 Emscripten에서 실행되도록 크로스 컴파일하는 데 사용됩니다.
*   `pyodide venv`: Pyodide에서 실행되는 가상 환경 (virtual environment)을 만들 수 있습니다.
*   `pytest-pyodide`: 다양한 JavaScript 런타임에 대해 Python 코드를 테스트할 수 있습니다.

`cibuildwheel`은 `pyodide build`를 사용하여 Emscripten을 대상으로 하는 휠 (wheel) 빌드를 지원합니다.

### Emscripten 애플리케이션 라이프사이클 (Emscripten Application Lifecycle)

Emscripten "바이너리"는 `.mjs` 파일과 `.wasm` 파일 쌍으로 구성됩니다. `.wasm` 파일에는 컴파일된 모든 C/C++/Rust 코드가 포함되어 있으며, `.mjs` 파일에는 런타임을 설정하고, `.wasm` 파일을 찾아 컴파일하고, 인스턴스화하고, `main()` 함수를 호출하고, 종료 시 런타임을 종료하는 라이프사이클 코드가 포함됩니다.

`.mjs` 파일은 런타임을 부트스트랩하고, `main()` 함수를 호출하며, C 함수를 호출하는 데 사용할 수 있는 API 객체를 반환하는 단일 `bootstrapEmscriptenExecutable()` JavaScript 함수를 내보냅니다.

### 파일 시스템 설정 (File System Setup)

#### 표준 라이브러리 (The Standard Library)

Python이 실행되려면 Emscripten 파일 시스템에서 표준 라이브러리에 액세스해야 합니다. 몇 가지 가능한 접근 방식이 있습니다:
*   **`--preload-file` 플래그 사용:** Emscripten 링커에 `--preload-file` 플래그가 있어 파일 로딩을 자동으로 처리합니다.
*   **`NODEFS` 사용:** Node.js의 경우 `NODEFS`를 사용하여 파일을 포함하는 네이티브 디렉토리를 Emscripten 파일 시스템에 마운트합니다.
*   **`ZipImporter` 사용:** 표준 라이브러리를 zip 아카이브에 넣고 `ZipImporter`를 사용합니다.
*   **`TARFS` 사용:** 표준 라이브러리를 압축되지 않은 tar 아카이브에 넣고 tar 파일로 백업되는 `TARFS` 읽기 전용 파일 시스템에 마운트합니다.

Pyodide는 모든 런타임에서 `ZipImporter` 방식을 사용하고, Python은 Node.js에서 실행될 때 `NODEFS` 방식을, 웹 예제에서는 `ZipImporter` 방식을 사용합니다.

#### 서드파티 패키지 (Third-party packages)

필요한 패키지를 Emscripten 파일 시스템에서 사용할 수 있도록 해야 합니다. 현재 Emscripten CPython은 패키지 지원이 없습니다. Pyodide는 패키지에 대해 두 가지 다른 접근 방식을 사용합니다:
*   **브라우저:** Pyodide는 휠 (wheels)을 다운로드하여 `MEMFS site-packages` 디렉토리에 압축을 해제합니다.
*   **`pyodide python` CLI:** Python을 부트스트랩하기 전에 모든 호스트 파일 시스템을 `NODEFS` 디렉토리로 마운트합니다.

### 콘솔 및 대화형 사용 (Console and Interactive Usage)

`stdin`은 항상 `EOF`를 반환하도록 기본 설정되어 있으며, `stdout` 및 `stderr`는 각각 `console.log` 및 `console.error`를 호출하도록 기본 설정되어 있습니다. 브라우저에서 제대로 작동하는 TTY를 구현하려면 기본 I/O 장치를 제거하고 `preRun` 후크에서 교체해야 합니다.

브라우저의 메인 스레드에서 사용자 입력에 대해 블록킹이 허용되지 않기 때문에 `stdin`을 브라우저에서 올바르게 작동시키는 것은 추가적인 과제를 제기합니다. Pyodide는 줄 버퍼링 동작을 수정하기 위해 표준 I/O 장치를 교체합니다. Emscripten Python Node.js 러너는 Emscripten이 제공하는 기본 I/O를 사용하며, 웹 예제는 `stdin`에 `Atomics`를 사용하고 사용자 정의 `stdout` 및 `stderr` 핸들러를 가집니다. Pyodide의 표준 스트림 동작은 업스트림될 예정입니다.

### 트랩 및 처리되지 않은 예외 (Traps and Uncaught Exceptions)

WebAssembly 트랩, 처리되지 않은 JavaScript 예외 또는 처리되지 않은 WebAssembly `throw` 명령이 발생하면 C 런타임 상태가 손상된 것으로 간주됩니다. 다른 플랫폼과 달리, 트랩이나 `libc` 런타임의 복구 불가능한 손상이 발생했을 때 실행 파일을 종료할 운영 체제가 없습니다. 따라서 트레이스백을 출력하거나 메모리를 덤프하는 등 충돌 디버깅에 도움이 되는 자체 코드를 제공해야 합니다.

Pyodide는 치명적인 오류를 감지하기 위해 WebAssembly에서 JavaScript로의 모든 실패할 수 있는 호출을 JavaScript `try/catch` 블록으로 래핑합니다. 모든 WebAssembly 진입점 또한 JavaScript `try/catch` 블록으로 래핑됩니다.

## 사양 (Specification)

### 작업 범위 (Scope of Work)

Emscripten을 Tier 3 플랫폼으로 추가하는 것은 패치되지 않은 CPython 소스 코드에서 Emscripten 호환 빌드를 컴파일하는 지원을 추가하는 것만을 요구합니다. `python.org`에 공식적으로 배포되는 Emscripten 아티팩트가 반드시 필요하지는 않지만, 향후 추가될 수 있습니다. 단기적으로는 Pyodide와 함께 다운스트림으로 계속 배포될 것입니다.

Emscripten은 다른 POSIX 플랫폼과 동일한 `configure` 및 `Makefile` 시스템을 사용하여 빌드될 것이며, 따라서 POSIX 플랫폼에서 빌드되어야 합니다. Linux와 macOS 모두 지원됩니다. 테스트 스위트를 실행하는 데 사용할 수 있는 Python CLI 진입점이 제공될 것입니다.

### 링크 (Linkage)

Python 인터프리터의 정적 링크 (statically link)만 지원됩니다. 인터프리터에서 다양한 목적으로 `EM_JS` 함수를 사용합니다. `EM_JS` 함수를 포함하는 객체 파일을 동적으로 링크할 수 있지만, 정적 빌드에서의 동작과 크게 다릅니다.

### 표준 라이브러리 (Standard Library)

#### 지원되지 않는 모듈 (Unsupported Modules)

Pyodide 문서에서 제거된 모듈 목록을 참조하십시오.

#### 제거된 모듈 (Removed Modules)

다운로드 크기를 줄이고 현재 WebAssembly VM에서 작동하지 않기 때문에 다음 모듈이 표준 라이브러리에서 제거됩니다:
*   `curses`, `dbm`, `ensurepip`, `fcntl`, `grp`, `idlelib`, `msvcrt`, `pwd`, `resource`, `syslog`, `termios`, `tkinter`, `turtle`, `turtledemo`, `venv`, `winreg`, `winsound`.

#### 포함되었지만 작동하지 않는 모듈 (Included but not Working Modules)

다음 모듈은 임포트할 수 있지만 기능하지 않습니다:
*   `multiprocessing`, `threading`, `sockets`.

또한, `termios` 모듈에 대한 의존성으로 인해 `pty` 및 `tty`는 임포트할 수 없습니다.

### 플랫폼 식별 (Platform Identification)

`sys.platform`은 `"emscripten"`을 반환할 것입니다. Emscripten은 Linux와 호환되려 하지만, 차이가 충분히 커서 고유한 이름이 정당화됩니다. 이는 `os.uname()`의 반환 값과 일치합니다. 또한, Emscripten 버전과 런타임 (브라우저의 `navigator.userAgent` 또는 Node.js의 `"Node js" + process.version`)을 포함하는 `sys._emscripten_info`가 있습니다.

### 시그널 지원 (Signals Support)

WebAssembly는 시그널에 대한 네이티브 지원이 없습니다. Pyodide에서 사용되는 공유 메모리 기반 솔루션이 Emscripten Python에 이미 구현되어 있습니다. 궁극적으로 스택 스위칭 기반 시그널을 구현하여 Node.js와 브라우저의 메인 스레드에서 시그널을 사용할 수 있기를 바랍니다.

### 함수 포인터 캐스트 (Function Pointer Casts)

C 표준에 따르면 한 타입의 함수 포인터는 다른 타입의 함수 포인터로 변환하고 다시 되돌릴 수 있지만, 변환된 포인터를 호환되지 않는 타입의 함수를 호출하는 데 사용하면 정의되지 않은 동작 (undefined behavior)이 발생합니다. 그러나 WebAssembly 스펙은 잘못된 시그니처로 함수를 호출하는 것을 트랩 (trap)으로 정의합니다.

Python 확장 모듈은 종종 함수를 다른 시그니처로 캐스팅하고 다른 시그니처로 호출합니다. 이러한 확장 모듈이 소스 코드를 변경하지 않고 작동하도록 하려면 특별한 처리가 필요합니다.

`wasm-gc ref.test` 명령을 사용하여 함수 포인터의 타입을 쿼리하고 인자 목록을 수동으로 수정할 수 있습니다. `wasm-gc`는 WebAssembly 런타임을 위한 비교적 새로운 기능이므로, 가능하면 `wasm-gc` 기반 함수 포인터 캐스트 트램펄린 (trampoline)을 사용하고, 불가능하면 JS 트램펄린으로 폴백합니다.

함수 포인터 캐스트 처리는 CPython에 완전히 구현되어 있으며, Pyodide는 업스트림과 정확히 동일한 코드를 사용합니다.

### CI 자원 (CI Resources)

Pyodide는 적절히 최신 버전의 Node.js가 설치된 모든 Linux에서 빌드 및 테스트할 수 있습니다. Anaconda는 Russell Keith-Magee가 유지 관리하는 Emscripten 빌드봇을 실행할 물리적 하드웨어를 제공하겠다고 제안했습니다.

### PEP 11

PEP 11은 Emscripten이 지원됨을 나타내도록 업데이트될 것이며, 구체적으로는 `wasm32-unknown-emscripten_xx_xx_xx` 트리플 (triple)을 명시합니다. Russell Keith-Magee가 이 ABI에 대한 초기 코어 팀 연락 담당자가 될 것입니다.

## 향후 작업 (Future Work)

### 패키징 생태계에서 크로스 빌드 개선 (Improving Cross Builds in the Packaging Ecosystem)

Python은 이제 iOS, Android, WASI, Emscripten이라는 네 가지 비-자체 호스팅 플랫폼을 지원합니다. 이들 모두 크로스 빌드를 통해 패키지를 빌드해야 합니다. 현재 `pyodide-build`는 Emscripten용으로 매우 많은 Python 패키지를 빌드할 수 있지만, 매우 복잡합니다. 이상적으로는 Python 패키징 생태계에 크로스 빌드를 위한 표준이 있어야 합니다.

### Pyodide 런타임 기능 업스트림 (Pyodide Runtime Features to be Upstreamed)

이 섹션은 이 PEP와 Python 3.14 개발 주기 범위를 벗어나지만, 향후 업스트림하고자 하는 Pyodide 런타임 기능 모음입니다.

#### 부트스트랩을 위한 JavaScript API (JavaScript API for Bootstrapping)

현재 Python을 부트스트랩하기 위한 안정적인 API는 제공되지 않습니다. Pyodide는 Emscripten보다 간단한 옵션 세트를 제공합니다. 단기적으로는 간단함을 유지하기 위해 JavaScript API를 지원하지 않을 것입니다.

#### JavaScript 외래 함수 인터페이스 (FFI) (JavaScript foreign function interface (FFI))

Emscripten이 POSIX를 지원하기 때문에 `os` 모듈을 사용하여 상당수의 작업을 수행할 수 있습니다. 그러나 JavaScript 런타임의 많은 기본적인 작업은 POSIX API를 통해 불가능합니다. Pyodide의 접근 방식은 JavaScript 객체 모델과 Python 객체 모델 간의 매핑과 높은 수준의 양방향 통합을 허용하는 호출 규약 (calling convention)을 지정하는 것입니다.

#### Asyncio

대부분의 JavaScript 프리미티브는 비동기식입니다. Python이 실행되는 JavaScript 스레드에는 이미 이벤트 루프가 있습니다. Pyodide에 구현된 것처럼 모든 실제 작업을 JavaScript 이벤트 루프에 위임하는 Python 이벤트 루프를 구현하는 것은 그리 어렵지 않습니다.

스택 스위칭 (stack switching)을 사용하여 "동기" Python 프레임에서 코루틴을 만들 수도 있습니다. 이러한 스택 스위칭 코루틴은 일반 Python 코루틴과 동일한 이벤트 루프에 스케줄링되며 완전히 재진입 가능합니다. 이는 Pyodide에 완전히 구현되어 있습니다.

## 하위 호환성 (Backwards Compatibility)

새로운 플랫폼을 추가하는 것은 CPython 자체에 하위 호환성 문제를 발생시키지 않습니다. 그러나 Pyodide 사용자에게 일부 하위 호환성 문제가 있을 수 있습니다. Pyodide의 기존 사용자가 많으므로, Pyodide의 기능을 Python으로 업스트림할 때 하위 호환성 문제를 최소화하도록 주의하는 것이 중요합니다.

## 보안 고려 사항 (Security Implications)

새로운 플랫폼을 추가하는 것은 새로운 보안 문제를 야기하지 않습니다. Emscripten과 WASI는 샌드박싱을 제공하는 유일한 지원 플랫폼입니다. 사용자가 신뢰할 수 없는 Python 코드나 신뢰할 수 없는 Python 확장 모듈을 실행하려는 경우, Emscripten은 이를 수행할 수 있는 안전한 방법을 제공합니다.

## 교육 방법 (How to Teach This)

이 PEP와 관련된 교육 요구 사항은 두 그룹의 개발자에게 해당됩니다. 첫째, 웹 개발자는 Python을 빌드하고 웹사이트에서 자신의 Python 코드 및 지원 패키지와 함께 사용하는 방법, 그리고 런타임에 이들을 모두 사용하는 방법을 알아야 합니다. 단기적으로는 가능한 경우 Pyodide를 사용하도록 권장할 것입니다.

## 참조 구현 (Reference Implementation)

Pyodide.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 관대한 조건으로 배포됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.