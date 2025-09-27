---
title: "[Final] PEP 741 - Python Configuration C API"
excerpt: "Python Enhancement Proposal 741: 'Python Configuration C API'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/741/
toc: true
toc_sticky: true
date: 2025-09-27 13:32:38+0900
last_modified_at: 2025-09-27 13:32:38+0900
published: true
---
> **원문 링크:** [PEP 741 - Python Configuration C API](https://peps.python.org/pep-0741/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 18-Jan-2024

PEP 741 – Python Configuration C API 번역 및 정리

## 개요

이 문서는 Python Enhancement Proposal (PEP) 741의 내용을 한국어 사용자가 이해하기 쉽도록 번역하고 정리한 것입니다. Python 개발자들이 이 PEP의 제안 내용, 도입 배경, 그리고 실제 Python 사용에 미치는 영향을 명확하게 이해할 수 있도록 돕는 것을 목표로 합니다.

---

## PEP 741 – Python Configuration C API

*   **작성자:** Victor Stinner
*   **상태:** Final (최종)
*   **유형:** Standards Track
*   **생성일:** 2024년 1월 18일
*   **Python 버전:** 3.14

### 요약 (Abstract)

이 PEP는 C 구조체에 의존하지 않고 Python 초기화를 구성할 수 있는 C API를 추가하며, 향후 ABI (Application Binary Interface) 호환 변경을 가능하게 합니다.

또한, `PyInitConfig_AddModule()` 함수를 추가하여 PEP 587 API를 완성합니다. 이 함수는 내장 확장 모듈을 추가하는 데 사용될 수 있으며, 이전에는 "inittab"으로 불렸던 기능입니다.

현재 런타임 구성을 가져오고 설정하는 `PyConfig_Get()` 및 `PyConfig_Set()` 함수도 추가됩니다.

PEP 587 "Python 초기화 구성"은 Python 초기화를 구성하는 모든 방법을 통합했습니다. 이 PEP는 Python 사전 초기화(preinitialization)와 Python 초기화를 단일 API로 통합합니다. 또한, API를 더욱 단순화하기 위해 PEP 587에서 제공했던 "Python" 및 "Isolated"의 두 가지 선택 대신 Python을 임베딩하는 단일 선택지만을 제공합니다.

하위 레벨의 PEP 587 `PyConfig` API는 CPython 구현 세부 사항(예: 구성 메커니즘을 포함한 CPython의 전체 CLI 기능 에뮬레이션)과 의도적으로 더 높은 수준의 결합이 필요한 사용 사례를 위해 계속 사용할 수 있습니다.

### 배경 (Rationale)

#### 런타임 구성 가져오기

PEP 587에는 Python 초기화만 구성하는 API만 있었고, 현재 런타임 구성을 가져오는 API는 없었습니다.

예를 들어, 전역 구성 변수 `Py_UnbufferedStdioFlag`는 Python 3.12에서 deprecated 되었고, 대신 `PyConfig.buffered_stdio`를 사용하는 것이 권장됩니다. 그러나 `PyConfig.buffered_stdio`는 Python을 구성하는 데만 작동하며, 이를 가져오는 공개 API는 없습니다.

제한된 C API 사용자들은 현재 런타임 구성을 가져오는 공개 API를 요청해왔습니다. Cython은 `optimization_level` 구성 옵션을 가져와야 합니다.

2022년에 전역 구성 변수가 deprecated 되었을 때, Marc-André Lemburg는 런타임(Python 초기화 중뿐만 아니라)에 이러한 구성 변수에 접근하기 위한 C API를 요청했습니다.

#### 보안 수정 (Security fix)

CVE-2020-10735(매우 큰 문자열을 10진수 정수로 변환할 때 서비스 거부 취약점)를 수정하기 위해, ABI에 영향을 미치는 새로운 `PyConfig` 멤버를 안정적인 브랜치에 추가하는 방안이 논의되었습니다.

Gregory P. Smith는 `PyConfig` 멤버에 의해 제한되지 않도록 텍스트 기반 구성 파일을 사용하는 다른 API를 제안했습니다.

결론적으로, 안정적인 브랜치에 새로운 `PyConfig` 멤버를 추가하지 않고, 개발 브랜치(Python 3.12가 됨)에만 새로운 `PyConfig.int_max_str_digits` 멤버를 추가하기로 결정되었습니다. 안정적인 브랜치에서는 전용의 개인 전역 변수(`PyConfig`와 관련 없음)가 사용됩니다.

#### `PyPreConfig`와 `PyConfig` 간의 중복

Python 사전 초기화는 `PyPreConfig` 구조체를 사용하고, Python 초기화는 `PyConfig` 구조체를 사용합니다. 두 구조체 모두 `dev_mode`, `parse_argv`, `isolated`, `use_environment` 네 가지 중복 멤버를 가지고 있습니다.

이 중복은 일부 `PyConfig` 멤버가 사전 초기화에 필요함에도 불구하고 두 구조체가 분리되어 있기 때문에 발생합니다.

#### Python 임베딩 (Embedding Python)

##### Python을 임베딩하는 애플리케이션 (Applications embedding Python)

예시: Blender 3D 그래픽스, fontforge 폰트 에디터, Gimp, LibreOffice, OBS Studio, Tiled, vim 텍스트 에디터.

Linux, FreeBSD, macOS에서는 애플리케이션이 일반적으로 `libpython`에 정적으로 링크되거나 `libpython`을 동적으로 로드합니다. `libpython` 공유 라이브러리는 버전이 지정되어 있습니다(예: Linux의 Python 3.12용 `libpython3.12.so`).

`vim` 프로젝트는 안정적인 ABI를 목표로 할 수 있습니다. 일반적으로 "시스템 Python" 버전이 사용됩니다. 현재는 사용할 Python 버전을 선택하는 것이 불가능합니다. 사용자들은 필요에 따라 최신 Python을 선택할 수 있는 기능을 원합니다.

Linux에서 GIMP와 같이 Python을 임베딩하는 애플리케이션을 배포하는 또 다른 접근 방식은 Python을 Flatpack, AppImage 또는 Snap "컨테이너"에 포함하는 것입니다. 이 경우 애플리케이션은 컨테이너와 함께 자체 Python 버전 복사본을 가져옵니다.

##### Python을 임베딩하는 라이브러리 (Libraries embedding Python)

예시: Apache mod_wsgi, nimpy (Nim - Python 브리지), PyO3 (Python 인터프리터용 Rust 바인딩).

##### 독립형 애플리케이션을 만드는 유틸리티 (Utilities creating standalone applications)

py2app (macOS용), py2exe (Windows용), pyinstaller, PyOxidizer (PEP 587 `PyConfig` API 사용).

이러한 유틸리티는 `libpython`에 링크되지 않은 독립형 애플리케이션을 생성합니다.

#### 런타임 구성 설정 (Set the runtime configuration)

Marc-André Lemburg는 런타임에 일부 구성 옵션의 값을 설정하기 위한 C API를 요청했습니다.

*   `optimization_level`
*   `verbose`
*   `parser_debug`
*   `inspect`
*   `write_bytecode`

이전에는 전역 구성 변수를 직접 설정할 수 있었습니다.

*   `Py_OptimizeFlag`
*   `Py_VerboseFlag`
*   `Py_DebugFlag`
*   `Py_InspectFlag`
*   `Py_DontWriteBytecodeFlag`

하지만 이러한 구성 플래그는 Python 3.12에서 deprecated 되었고, Python 3.14에서 제거될 예정입니다.

### 사양 (Specification)

Python 초기화를 구성하기 위한 C API 함수와 구조체를 추가합니다.

#### 구성 생성 (Create config)

*   `PyInitConfig` 불투명(opaque) 구조체.
*   `PyInitConfig* PyInitConfig_Create(void)`: Isolated Configuration의 기본값을 사용하여 새 초기화 구성을 생성합니다.
    *   `PyInitConfig_Free()`로 해제해야 합니다.
    *   메모리 할당 실패 시 `NULL`을 반환합니다.
*   `void PyInitConfig_Free(PyInitConfig *config)`: 초기화 구성의 메모리를 해제합니다.

#### 옵션 가져오기 (Get Options)

구성 옵션 `name` 매개변수는 `NULL`이 아닌 널 종료(null-terminated) UTF-8 인코딩 문자열이어야 합니다.

*   `int PyInitConfig_HasOption(PyInitConfig *config, const char *name)`: 구성에 `name`이라는 옵션이 있는지 테스트합니다.
    *   옵션이 존재하면 1을 반환하고, 그렇지 않으면 0을 반환합니다.
*   `int PyInitConfig_GetInt(PyInitConfig *config, const char *name, int64_t *value)`: 정수 구성 옵션을 가져옵니다.
    *   성공 시 `*value`를 설정하고 0을 반환합니다. 오류 시 `config`에 오류를 설정하고 -1을 반환합니다.
*   `int PyInitConfig_GetStr(PyInitConfig *config, const char *name, char **value)`: 널 종료 UTF-8 인코딩 문자열로 문자열 구성 옵션을 가져옵니다.
    *   성공 시 `*value`를 설정하고 0을 반환합니다. 오류 시 `config`에 오류를 설정하고 -1을 반환합니다.
    *   성공 시 문자열은 `free(value)`로 해제해야 합니다.
*   `int PyInitConfig_GetStrList(PyInitConfig *config, const char *name, size_t *length, char ***items)`: 널 종료 UTF-8 인코딩 문자열 배열로 문자열 목록 구성 옵션을 가져옵니다.
    *   성공 시 `*length`와 `*value`를 설정하고 0을 반환합니다. 오류 시 `config`에 오류를 설정하고 -1을 반환합니다.
    *   성공 시 문자열 목록은 `PyInitConfig_FreeStrList(length, items)`로 해제해야 합니다.
*   `void PyInitConfig_FreeStrList(size_t length, char **items)`: `PyInitConfig_GetStrList()`에 의해 생성된 문자열 목록의 메모리를 해제합니다.

#### 옵션 설정 (Set Options)

구성 옵션 `name` 매개변수는 `NULL`이 아닌 널 종료 UTF-8 인코딩 문자열이어야 합니다.

일부 구성 옵션은 다른 옵션에 부작용을 일으킵니다. 이 논리는 `Py_InitializeFromInitConfig()`가 호출될 때만 구현되며, 아래의 "Set" 함수에서는 구현되지 않습니다. 예를 들어, `dev_mode`를 1로 설정해도 `faulthandler`가 1로 설정되지는 않습니다.

*   `int PyInitConfig_SetInt(PyInitConfig *config, const char *name, int64_t value)`: 정수 구성 옵션을 설정합니다.
    *   성공 시 0을 반환합니다. 오류 시 `config`에 오류를 설정하고 -1을 반환합니다.
*   `int PyInitConfig_SetStr(PyInitConfig *config, const char *name, const char *value)`: 널 종료 UTF-8 인코딩 문자열에서 문자열 구성 옵션을 설정합니다. 문자열은 복사됩니다.
    *   성공 시 0을 반환합니다. 오류 시 `config`에 오류를 설정하고 -1을 반환합니다.
*   `int PyInitConfig_SetStrList(PyInitConfig *config, const char *name, size_t length, char * const *items)`: 널 종료 UTF-8 인코딩 문자열 배열에서 문자열 목록 구성 옵션을 설정합니다. 문자열 목록은 복사됩니다.
    *   성공 시 0을 반환합니다. 오류 시 `config`에 오류를 설정하고 -1을 반환합니다.
*   `int PyInitConfig_AddModule(PyInitConfig *config, const char *name, PyObject* (*initfunc)(void))`: 내장 모듈 테이블에 내장 확장 모듈을 추가합니다.
    *   새 모듈은 `name`으로 가져올 수 있으며, 첫 번째 가져오기 시 호출되는 초기화 함수로 `initfunc`를 사용합니다.
    *   성공 시 0을 반환합니다. 오류 시 `config`에 오류를 설정하고 -1을 반환합니다.
    *   Python이 여러 번 초기화되는 경우, `PyInitConfig_AddModule()`은 각 Python 초기화 시 호출되어야 합니다.
    *   `PyImport_AppendInittab()` 함수와 유사합니다.

#### Python 초기화 (Initialize Python)

*   `int Py_InitializeFromInitConfig(PyInitConfig *config)`: 초기화 구성에서 Python을 초기화합니다.
    *   성공 시 0을 반환합니다. 오류 시 `config`에 오류를 설정하고 -1을 반환합니다. Python이 종료되기를 원하면 `config`에 종료 코드를 설정하고 -1을 반환합니다.
    *   종료 코드의 경우 `PyInitConfig_GetExitcode()`를 참조하세요.

#### 오류 처리 (Error Handling)

*   `int PyInitConfig_GetError(PyInitConfig* config, const char **err_msg)`: 구성 오류 메시지를 가져옵니다.
    *   오류가 설정되어 있으면 `*err_msg`를 설정하고 1을 반환합니다. 그렇지 않으면 `*err_msg`를 `NULL`로 설정하고 0을 반환합니다.
    *   오류 메시지는 UTF-8 인코딩 문자열입니다.
    *   `config`에 종료 코드가 있는 경우, 종료 코드를 오류 메시지로 포맷합니다.
    *   오류 메시지는 `config`로 다른 `PyInitConfig` 함수가 호출될 때까지 유효합니다. 호출자는 오류 메시지를 해제할 필요가 없습니다.
*   `int PyInitConfig_GetExitcode(PyInitConfig* config, int *exitcode)`: 구성 종료 코드를 가져옵니다.
    *   Python이 종료되기를 원하면 `*exitcode`를 설정하고 1을 반환합니다. `config`에 종료 코드가 설정되어 있지 않으면 0을 반환합니다.
    *   `parse_argv` 옵션이 0이 아닌 경우에만 `Py_InitializeFromInitConfig()` 함수가 종료 코드를 설정할 수 있습니다.
    *   명령줄 파싱이 실패했거나(종료 코드 2) 명령줄 옵션이 명령줄 도움말 표시를 요청하는 경우(종료 코드 0) 종료 코드가 설정될 수 있습니다.

#### 런타임 구성 가져오기 및 설정 (Get and Set the Runtime Configuration)

구성 옵션 `name` 매개변수는 `NULL`이 아닌 널 종료 UTF-8 인코딩 문자열이어야 합니다.

*   `PyObject* PyConfig_Get(const char *name)`: 구성 옵션의 현재 런타임 값을 Python 객체로 가져옵니다.
    *   성공 시 새 참조를 반환합니다. 오류 시 예외를 설정하고 `NULL`을 반환합니다.
    *   객체 유형은 옵션에 따라 다릅니다: 구성 옵션 표를 참조하세요.
    *   다른 옵션은 내부 `PyPreConfig` 및 `PyConfig` 구조체에서 가져옵니다.
    *   호출자는 GIL (Global Interpreter Lock)을 보유해야 합니다. 이 함수는 Python 초기화 전이나 Python 종료 후에는 호출할 수 없습니다.
*   `int PyConfig_GetInt(const char *name, int *value)`: `PyConfig_Get()`과 유사하지만 값을 정수로 가져옵니다.
    *   성공 시 `*value`를 설정하고 0을 반환합니다. 오류 시 예외를 설정하고 -1을 반환합니다.
*   `PyObject* PyConfig_Names(void)`: 모든 구성 옵션 이름을 `frozenset`으로 가져옵니다.
    *   오류 시 예외를 설정하고 `NULL`을 반환합니다.
    *   호출자는 GIL을 보유해야 합니다.
*   `PyObject* PyConfig_Set(const char *name, PyObject *value)`: 구성 옵션의 현재 런타임 값을 설정합니다.
    *   `name` 옵션이 없으면 `ValueError`를 발생시킵니다.
    *   `value`가 유효하지 않은 값이면 `ValueError`를 발생시킵니다.
    *   옵션이 읽기 전용이면(설정할 수 없음) `ValueError`를 발생시킵니다.
    *   `value`의 유형이 적절하지 않으면 `TypeError`를 발생시킵니다.
    *   읽기 전용 구성 옵션은 설정할 수 없습니다.
    *   호출자는 GIL을 보유해야 합니다. 이 함수는 Python 초기화 전이나 Python 종료 후에는 호출할 수 없습니다.

이 C API 함수들은 제한된 C API에서 제외됩니다.

#### `PyInitConfig` 구조체

`PyInitConfig` 구조체는 `PyConfig` API의 세 가지 구조체(`PyPreConfig`, `PyConfig`, `PyStatus`)를 결합하고 `PyInitConfig_AddModule()`을 위한 `inittab` 멤버도 가집니다.

*   `PyPreConfig preconfig`
*   `PyConfig config`
*   `PyStatus status`
*   `struct _inittab *inittab` for `PyInitConfig_AddModule()`

`PyStatus status`는 더 이상 분리되어 있지 않고, 통합된 `PyInitConfig` 구조체의 일부가 되어 API를 사용하기 쉽게 만듭니다.

#### 구성 옵션 (Configuration Options)

구성 옵션은 `PyPreConfig` 및 `PyConfig` 구조체 멤버의 이름을 따릅니다. `PyPreConfig` 문서 및 `PyConfig` 문서를 참조하세요.

구성 옵션을 deprecated 하거나 제거하는 것은 이 PEP의 범위를 벗어나며, 개별적으로 논의되어야 합니다.

##### 공개 구성 옵션 (Public configuration options)

다음 옵션은 `PyConfig_Get()`으로 가져올 수 있고 `PyConfig_Set()`으로 설정할 수 있습니다.

| 옵션 이름             | 유형      | 설명                                                                                                                                                                                                |
| :------------------ | :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `argv`              | `list[str]` | API: `sys.argv`.                                                                                                                                                                                    |
| `base_exec_prefix`  | `str`     | API: `sys.base_exec_prefix`.                                                                                                                                                                        |
| `base_executable`   | `str`     | API: `sys._base_executable`.                                                                                                                                                                        |
| `base_prefix`       | `str`     | API: `sys.base_prefix`.                                                                                                                                                                             |
| `bytes_warning`     | `int`     | API: `sys.flags.bytes_warning`.                                                                                                                                                                     |
| `exec_prefix`       | `str`     | API: `sys.exec_prefix`.                                                                                                                                                                             |
| `executable`        | `str`     | API: `sys.executable`.                                                                                                                                                                              |
| `inspect`           | `bool`    | API: `sys.flags.inspect` (`int`).                                                                                                                                                                   |
| `int_max_str_digits`| `int`     | API: `sys.flags.int_max_str_digits`, `sys.get_int_max_str_digits()` 및 `sys.set_int_max_str_digits()`.                                                                                              |
| `interactive`       | `bool`    | API: `sys.flags.interactive`.                                                                                                                                                                       |
| `module_search_paths`| `list[str]`| API: `sys.path`.                                                                                                                                                                                    |
| `optimization_level`| `int`     | API: `sys.flags.optimize`.                                                                                                                                                                          |
| `parser_debug`      | `bool`    | API: `sys.flags.debug` (`int`).                                                                                                                                                                     |
| `platlibdir`        | `str`     | API: `sys.platlibdir`.                                                                                                                                                                              |
| `prefix`            | `str`     | API: `sys.base_prefix`.                                                                                                                                                                             |
| `pycache_prefix`    | `str`     | API: `sys.pycache_prefix`.                                                                                                                                                                          |
| `quiet`             | `bool`    | API: `sys.flags.quiet` (`int`).                                                                                                                                                                     |
| `stdlib_dir`        | `str`     | API: `sys._stdlib_dir`.                                                                                                                                                                             |
| `use_environment`   | `bool`    | API: `sys.flags.ignore_environment` (`int`).                                                                                                                                                        |
| `verbose`           | `int`     | API: `sys.flags.verbose`.                                                                                                                                                                           |
| `warnoptions`       | `list[str]`| API: `sys.warnoptions`.                                                                                                                                                                             |
| `write_bytecode`    | `bool`    | API: `sys.flags.dont_write_bytecode` (`int`) 및 `sys.dont_write_bytecode` (`bool`).                                                                                                                 |
| `xoptions`          | `dict[str, str]`| API: `sys._xoptions`.                                                                                                                                                                       |

일부 옵션 이름은 `optimization_level` 옵션과 `sys.flags.optimize` 속성처럼 `sys` 속성과 다릅니다. `PyConfig_Set()`은 해당 `sys` 속성을 설정합니다.

`xoptions`는 `PyInitConfig`에서 각 문자열이 `key` (값이 암묵적으로 `True`) 또는 `key=value` 형식인 문자열 목록입니다. 현재 런타임 구성에서는 `dict` ( `key: str` → `value: str | True` )가 됩니다.

##### 읽기 전용 구성 옵션 (Read-only configuration options)

다음 옵션은 `PyConfig_Get()`으로 가져올 수 있지만 `PyConfig_Set()`으로 설정할 수 없습니다.

| 옵션 이름                | 유형        | 설명                                                                      |
| :----------------------- | :---------- | :------------------------------------------------------------------------ |
| `allocator`              | `int`       |                                                                           |
| `buffered_stdio`         | `bool`      |                                                                           |
| `check_hash_pycs_mode`   | `str`       |                                                                           |
| `code_debug_ranges`      | `bool`      |                                                                           |
| `coerce_c_locale`        | `bool`      |                                                                           |
| `coerce_c_locale_warn`   | `bool`      |                                                                           |
| `configure_c_stdio`      | `bool`      |                                                                           |
| `configure_locale`       | `bool`      |                                                                           |
| `cpu_count`              | `int`       | API: `os.cpu_count()` (`int | None`).                                   |
| `dev_mode`               | `bool`      | API: `sys.flags.dev_mode`.                                                |
| `dump_refs`              | `bool`      |                                                                           |
| `dump_refs_file`         | `str`       |                                                                           |
| `faulthandler`           | `bool`      | API: `faulthandler.is_enabled()`.                                         |
| `filesystem_encoding`    | `str`       | API: `sys.getfilesystemencoding()`.                                       |
| `filesystem_errors`      | `str`       | API: `sys.getfilesystemencodeerrors()`.                                   |
| `hash_seed`              | `int`       |                                                                           |
| `home`                   | `str`       |                                                                           |
| `import_time`            | `bool`      |                                                                           |
| `install_signal_handlers`| `bool`      |                                                                           |
| `isolated`               | `bool`      | API: `sys.flags.isolated` (`int`).                                        |
| `legacy_windows_fs_encoding`| `bool`   | Windows 전용.                                                             |
| `legacy_windows_stdio`   | `bool`      | Windows 전용.                                                             |
| `malloc_stats`           | `bool`      |                                                                           |
| `orig_argv`              | `list[str]` | API: `sys.orig_argv`.                                                     |
| `parse_argv`             | `bool`      |                                                                           |
| `pathconfig_warnings`    | `bool`      |                                                                           |
| `perf_profiling`         | `bool`      | API: `sys.is_stack_trampoline_active()`.                                  |
| `program_name`           | `str`       |                                                                           |
| `run_command`            | `str`       |                                                                           |
| `run_filename`           | `str`       |                                                                           |
| `run_module`             | `str`       |                                                                           |
| `run_presite`            | `str`       | 디버그 빌드 필요.                                                         |
| `safe_path`              | `bool`      |                                                                           |
| `show_ref_count`         | `bool`      |                                                                           |
| `site_import`            | `bool`      | API: `sys.flags.no_site` (`int`).                                         |
| `skip_source_first_line` | `bool`      |                                                                           |
| `stdio_encoding`         | `str`       | API: `sys.stdin.encoding`, `sys.stdout.encoding`, `sys.stderr.encoding`.  |
| `stdio_errors`           | `str`       | API: `sys.stdin.errors`, `sys.stdout.errors`, `sys.stderr.errors`.        |
| `tracemalloc`            | `int`       | API: `tracemalloc.is_tracing()` (`bool`).                                 |
| `use_frozen_modules`     | `bool`      |                                                                           |
| `use_hash_seed`          | `bool`      |                                                                           |
| `user_site_directory`    | `bool`      | API: `sys.flags.no_user_site` (`int`).                                    |
| `utf8_mode`              | `bool`      |                                                                           |
| `warn_default_encoding`  | `bool`      |                                                                           |
| `_pystats`               | `bool`      | API: `sys._stats_on()`, `sys._stats_off()`. `Py_STATS` 빌드 필요.         |

#### 안정성 (Stability)

옵션의 동작, 기본 옵션 값 및 Python 동작은 각 Python 버전마다 변경될 수 있으며, "안정적"이지 않습니다.

또한, 구성 옵션은 일반적인 PEP 387 deprecated 프로세스를 따라 추가, deprecated, 제거될 수 있습니다.

#### `PyPreConfig` 및 `PyConfig` API와의 상호작용 (Interaction with the PyPreConfig and PyConfig APIs)

하위 레벨의 PEP 587 `PyPreConfig` 및 `PyConfig` API는 계속 사용 가능하며 완벽하게 지원됩니다. 요약에서 언급했듯이, 이러한 API는 더 큰 애플리케이션의 일부로 Python 런타임을 제공하는 것보다 전체 CPython CLI의 동작을 밀접하게 에뮬레이션하려는 임베딩 사용 사례에 대해 선호되는 접근 방식으로 남아 있습니다.

`PyPreConfig` API는 이 PEP의 초기화 API와 함께 사용될 수 있습니다. 이러한 경우, 인터프리터가 사전 구성되면 `PyInitConfig_SetInt`에도 사전 구성 설정에 대한 읽기 전용 대 읽기/쓰기 제한이 적용됩니다 (특히 `use_environment`만 업데이트할 수 있으며, 다른 사전 구성 변수를 업데이트하려고 하면 오류가 보고됩니다).

### 예시 (Examples)

#### Python 초기화 (Initialize Python)

Python을 초기화하고, 다양한 유형의 구성 옵션을 설정하며, 오류 시 -1을 반환하는 예시입니다.

```c
int init_python(void) {
    PyInitConfig *config = PyInitConfig_Create();
    if (config == NULL) {
        printf("PYTHON INIT ERROR: memory allocation failed\n");
        return -1;
    }
    // 정수 설정 (dev mode)
    if (PyInitConfig_SetInt(config, "dev_mode", 1) < 0) {
        goto error;
    }
    // UTF-8 문자열 목록 설정 (argv)
    char *argv[] = {"my_program", "-c", "pass"};
    if (PyInitConfig_SetStrList(config, "argv", Py_ARRAY_LENGTH(argv), argv) < 0) {
        goto error;
    }
    // UTF-8 문자열 설정 (program name)
    if (PyInitConfig_SetStr(config, "program_name", L"my_program") < 0) {
        goto error;
    }
    // 구성으로 Python 초기화
    if (Py_InitializeFromInitConfig(config) < 0) {
        goto error;
    }
    PyInitConfig_Free(config);
    return 0;

error:
    // 오류 메시지 표시
    const char *err_msg;
    (void)PyInitConfig_GetError(config, &err_msg);
    printf("PYTHON INIT ERROR: %s\n", err_msg);
    PyInitConfig_Free(config);
    return -1;
}
```

#### 초기화 `bytes_warning` 옵션 증가 (Increase initialization bytes_warning option)

초기화 구성의 `bytes_warning` 옵션을 증가시키는 예시입니다.

```c
int config_bytes_warning(PyInitConfig *config) {
    int64_t bytes_warning;
    if (PyInitConfig_GetInt(config, "bytes_warning", &bytes_warning)) {
        return -1;
    }
    bytes_warning += 1;
    if (PyInitConfig_SetInt(config, "bytes_warning", bytes_warning)) {
        return -1;
    }
    return 0;
}
```

#### 런타임 `verbose` 옵션 가져오기 (Get the runtime verbose option)

구성 옵션 `verbose`의 현재 런타임 값을 가져오는 예시입니다.

```c
int get_verbose(void) {
    int verbose;
    if (PyConfig_GetInt("verbose", &verbose) < 0) {
        // 오류를 조용히 무시
        PyErr_Clear();
        return -1;
    }
    return verbose;
}
```

오류 발생 시, 함수는 오류를 조용히 무시하고 -1을 반환합니다. 실제로는 `verbose` 옵션을 가져오는 것은 실패할 수 없으며, 미래의 Python 버전에서 옵션이 제거되는 경우에만 발생할 수 있습니다.

### 구현 (Implementation)

*   이슈: [C API] PEP 741: Add PyInitConfig C API to customize the Python initialization
*   PR: Add PyConfig_Get() function
*   PR: Add PyInitConfig C API

### 하위 호환성 (Backwards Compatibility)

변경 사항은 완벽하게 하위 호환됩니다. 새로운 API만 추가됩니다.

`PyConfig` C API (PEP 587)와 같은 기존 API는 변경되지 않습니다.

### 기각된 아이디어 (Rejected Ideas)

#### 텍스트로서의 구성 (Configuration as text)

안정적인 ABI와 호환되도록 하고 사용자 정의 옵션을 허용하기 위해 구성을 텍스트로 제공하는 것이 제안되었습니다.

예시:

```
# integer
bytes_warning = 2
# string
filesystem_encoding = "utf8"
# comment
# list of strings
argv = ['python', '-c', 'code']
```

API는 파일을 통해 구성하는 것이 아니라 문자열로 구성을 받아들였을 것입니다. 가상의 `PyInit_SetConfig()` 함수를 사용한 예시:

```c
void stable_abi_init_demo(int set_path) {
    PyInit_SetConfig(
        "isolated = 1\n"
        "argv = ['python', '-c', 'code']\n"
        "filesystem_encoding = 'utf-8'\n"
    );
    if (set_path) {
        PyInit_SetConfig("pythonpath = '/my/path'");
    }
}
```

이 예시는 가독성을 위해 오류 처리를 무시합니다.

문제는 이러한 구성 텍스트를 생성하려면 문자열에 따옴표를 추가하고 문자열 내의 따옴표를 이스케이프해야 한다는 것입니다. 문자열 배열을 포맷하는 것은 간단하지 않습니다.

Python이 값을 문자열 또는 문자열 배열로 직접 전달하는 구성 옵션을 설정하는 API를 직접 제공할 수 있는 반면, 문자열 또는 문자열 배열을 포맷하는 API를 제공하는 것은 가치가 없습니다. 이는 줄 바꿈 문자(newline characters)와 같이 이스케이프해야 하는 특정 문자에 특별한 의미를 부여하는 것을 피합니다.

#### 정수로 옵션 참조 (Refer to an option with an integer)

구성 옵션을 참조하기 위해 문자열을 사용하는 것은 정수를 비교하는 것보다 느릴 수 있는 문자열 비교를 필요로 합니다.

`Py_tp_doc`와 같은 유형 "슬롯"과 유사하게, 정수를 사용하여 구성 옵션을 참조하는 방안이 있었습니다. `const char *name` 매개변수는 `int option`으로 대체될 것입니다.

정수를 사용할 때 사용자 정의 옵션을 허용하면 정수 옵션에 대한 "네임스페이스"(범위)를 유지하기가 더 어렵기 때문에 충돌이 발생할 가능성이 더 큽니다. 문자열을 사용하면 콜론 구분 기호가 있는 간단한 접두사를 사용할 수 있습니다.

정수는 또한 정수 상수 목록을 유지해야 하므로 C API와 Python API를 더 크게 만듭니다.

Python 3.13에는 약 62개의 구성 옵션만 있으므로 성능이 실제로 걸림돌이 되는 문제는 아닙니다. 나중에 더 나은 성능이 필요하다면 해시 테이블을 사용하여 이름으로 옵션을 가져올 수 있습니다.

구성 옵션을 가져오는 것이 자주 실행되는 코드("hot code")에서 사용되는 경우, 값은 한 번 읽고 캐시될 수 있습니다. 덧붙여, 대부분의 구성 옵션은 런타임에 변경할 수 없습니다.

#### 다단계 초기화 (Multi-phase initialization (similar to PEP 432))

Eric Snow는 이 제안이 임베딩 개발자들에게 초기화가 단일 모놀리식 단계라는 생각을 강화할 수 있다고 우려를 표했습니다. 그는 초기화가 5가지 별개의 단계로 구성되며, API가 이를 명시적으로 반영해야 한다고 주장했습니다. Eric은 적어도 초기화 구현이 개선된 코드 상태를 위해 단계들을 반영해야 한다고 제안했습니다. 전반적으로 그의 설명은 PEP 432 및 PEP 587과 유사점이 있습니다.

이 PEP와 관련된 Eric의 또 다른 주요 요점은, 이상적으로는 `Py_InitializeFromConfig()`에 전달되는 구성이 해당 함수가 호출되기 전에 완전해야 한다는 것이었습니다. 반면 현재 초기화는 실제로 구성을 수정합니다.

Eric이 반드시 PEP 741에 대한 대안을 제안한 것은 아니지만, 단계별로 세분화된 초기화 API를 추가하려는 모든 제안은 이 PEP가 달성하려는 목표와 사실상 반대됩니다. 이러한 API는 더 복잡하고, 새로운 공개 구조체와 새로운 공개 함수를 추가해야 합니다. 이 PEP가 기존 API를 통합하고 단순화하려는 시도와는 달리(반대), Python 초기화를 더 복잡하게 만듭니다. 유사한 목적을 가진 여러 구조체를 가지면 기존 `PyPreConfig` 및 `PyConfig` 구조체 간의 중복 멤버와 유사한 문제가 발생할 수 있습니다.

#### 로케일 인코딩 및 와이드 문자열 (Locale encoding and wide strings)

`PyInitConfig` API에서 로케일 인코딩으로 인코딩된 문자열과 와이드 문자열(`wchar_t*`)을 받아들이는 것은 `PyInitConfig` API를 단순하게 유지하고 Python 사전 초기화의 복잡성을 피하기 위해 보류되었습니다. 이러한 기능은 CPython CLI의 전체 동작을 에뮬레이션할 때 주로 필요하며, 따라서 하위 레벨의 PEP 587 API에서 더 잘 처리됩니다.

### 논의 (Discussions)

*   PEP 741: Python Configuration C API (second version) (2024년 2월)
*   PEP 741: Python Configuration C API (2024년 1월)
*   FR: Allow private runtime config to enable extending without breaking the PyConfig ABI (2022년 8월)

---
이 문서는 Public Domain 또는 CC0-1.0-Universal 라이선스 중 더 관대한 라이선스에 따라 제공됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.