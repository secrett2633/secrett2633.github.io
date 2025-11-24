---
title: "[Rejected] PEP 437 - A DSL for specifying signatures, annotations and argument converters"
excerpt: "Python Enhancement Proposal 437: 'A DSL for specifying signatures, annotations and argument converters'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/437/
toc: true
toc_sticky: true
date: 2025-09-26 21:51:38+0900
last_modified_at: 2025-09-26 21:51:38+0900
published: true
---
> **원문 링크:** [PEP 437 - A DSL for specifying signatures, annotations and argument converters](https://peps.python.org/pep-0437/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 11-Mar-2013

## PEP 437 – 시그니처, 어노테이션 및 인자 컨버터 지정을 위한 DSL

**작성자:** Stefan Krah
**상태:** Rejected (거부됨)
**유형:** Standards Track
**생성일:** 2013년 3월 11일
**Python 버전:** 3.4
**해결:** Guido van Rossum에 의해 2013년 PyCon US에서 거부됨.

### 개요 (Abstract)

이 PEP는 현재 Python C-API에 함수 시그니처, 어노테이션 또는 사용자 정의 인자 컨버터를 지정하고 자동으로 생성하는 메커니즘이 없다는 문제에 주목합니다. Cython은 `.pyx` 파일 내의 `cdef` 정의를 사용하여 필요한 정보를 생성하지만, CPython의 C-API 함수는 `cdef` 내에서 지정하기 어려운 추가적인 초기화 및 정리(cleanup) 스니펫을 요구하는 경우가 많습니다.

PEP 436은 C 주석 내에 포함된, 매개변수별 설정 파일과 유사한 DSL(Domain Specific Language)을 제안합니다. 이 전처리기(preprocessor)는 해당 주석을 읽어 인자 파싱 함수, 독스트링(docstrings) 및 파싱 결과를 활용하는 함수(이후 '구현 함수'라고 칭함)의 헤더를 생성합니다. PEP 437은 PEP 436에 대한 대안적인 DSL을 제안합니다.

### 거부 공지 (Rejection Notice)

이 PEP는 2013년 PyCon US에서 Guido van Rossum에 의해 거부되었습니다. 그러나 이 PEP에서 제기된 몇 가지 특정 문제점들은 PEP 436 DSL의 두 번째 반복을 설계할 때 고려되었습니다.

### 제안 배경 (Rationale)

PEP 436 DSL의 C 파일 내에서의 적합성에 대한 의견은 분분합니다. 이 PEP는 대안적인 DSL을 제안하며, PEP 436의 구체적인 문제점들은 이 PEP의 마지막 섹션에서 설명됩니다.

### 범위 (Scope)

이 PEP는 DSL 자체에만 전적으로 초점을 맞춥니다. 독스트링이나 생성된 코드의 출력 위치와 같은 주제는 이 PEP의 범위 밖에 있습니다. 그러나 DSL이 사용자 정의 인자 파서를 생성하는 데 적합한지 여부는 매우 중요하며, 이는 이미 Cython에 구현된 기능입니다. 따라서 이 PEP의 목표 중 하나는 DSL을 기존 솔루션에 가깝게 유지하여 Cython의 관련 부분을 CPython 소스 트리에 포함하는 것을 용이하게 하는 것입니다.

### DSL 개요 (DSL overview)

#### 타입 안전성 및 어노테이션 (Type safety and annotations)

Python 값을 C 값으로 변환하는 과정은 컨버터 함수의 타입에 의해 완전히 정의됩니다. `PyArg_Parse*` 계열 함수는 잘 알려진 기본 컨버터("i", "f" 등) 외에도 사용자 정의 컨버터를 허용합니다. 이 PEP는 기본 컨버터가 실제 어떻게 구현되었는지와 관계없이 추상 함수로 간주합니다.

#### Include/converters.h

컨버터 함수는 전방 선언되어야 합니다. 모든 컨버터 함수는 `Include/converters.h` 파일에 입력되어야 합니다. 이 파일은 `.c` 파일을 번역하기 전에 전처리기에 의해 읽힙니다.

예시:
```c
/*[converter]
##### Default converters #####
"s": str -> const char *res;
"s*": [str, bytes, bytearray, rw_buffer] -> Py_buffer &res;
[...]
"es#": str -> (const char *res_encoding, char **res, Py_ssize_t *res_length);
[...]
##### Custom converters #####
path_converter: [str, bytes, int] -> path_t &res;
OS_STAT_DIR_FD_CONVERTER: [int, None] -> int res;
[converter_end]*/
```
컨버터는 이름, Python 입력 타입, C 출력 타입으로 지정됩니다. 기본 컨버터는 따옴표로 묶인 이름을 가져야 하며, 사용자 정의 컨버터는 일반 이름을 가져야 합니다. Python 타입은 이름으로 주어지며, 여러 Python 타입을 허용하는 경우 목록 형태로 작성됩니다.

기본 컨버터는 여러 암묵적 반환 값을 가질 수 있으므로, C 출력 타입은 다음 규칙에 따라 작성됩니다.
*   주요 반환 값은 `res`로 명명되어야 합니다. 이것은 DSL에서 나중에 주어질 실제 변수 이름에 대한 플레이스홀더입니다.
*   추가적인 암묵적 반환 값은 `res_` 접두사가 붙어야 합니다.
*   기본적으로 변수는 구현 함수에 값으로 전달됩니다. 주소를 전달해야 하는 경우 `res`에 앰퍼샌드(`&`)를 접두사로 붙여야 합니다.

추가 선언은 `.c` 파일에 배치될 수 있으며, 함수 타입이 동일하면 중복 선언이 허용됩니다. 컨버터 함수 정의 바로 위에 사용자 정의 컨버터 타입을 다시 선언하는 것이 권장되며, 이는 전처리기가 선언 불일치를 감지할 수 있도록 합니다.

#### 함수 사양 (Function specifications)

`define` 블록은 함수 사양과 출력 섹션으로 구성됩니다. 함수 사양은 선언 섹션, 선택적 C 선언 섹션, 선택적 정리 코드 섹션으로 구성됩니다. 함수 사양 내의 섹션은 `yacc` 스타일로 `%%`로 구분됩니다.

예시 (`os.stat`):
```c
/*[define posix_stat]
def os.stat(path: path_converter, *, dir_fd: OS_STAT_DIR_FD_CONVERTER = None, follow_symlinks: "p" = True) -> os.stat_result: pass
%%
path_t path = PATH_T_INITIALIZE("stat", 0, 1);
int dir_fd = DEFAULT_DIR_FD;
int follow_symlinks = 1;
%%
path_cleanup(&path);
[define_end]*/
<literal C output>
/*[define_output_end]*/
```

**1. Define 블록**
함수 사양 블록은 `/*[define` 토큰으로 시작하며, 선택적 C 함수 이름이 오고 닫는 대괄호(`]`)로 끝납니다. C 함수 이름이 주어지지 않으면 선언 이름에서 생성됩니다. 위 예시에서 `posix_stat` 이름을 생략하면 `os_stat`이라는 C 함수 이름이 생성됩니다.

**2. 선언 (Declaration)**
필수 선언은 (거의) 유효한 Python 함수 정의입니다. `def` 키워드와 함수 본문은 중복되지만, 이 PEP의 작성자는 이들이 존재할 때 정의가 더 읽기 쉽다고 생각합니다. 함수 이름은 단순한 식별자 대신 경로가 될 수 있습니다. 각 인자는 적용될 컨버터 함수의 이름으로 어노테이션됩니다. 기본값은 일반적인 Python 방식대로 주어지며 유효한 Python 표현식이 될 수 있습니다. 반환 값은 모든 Python 표현식이 될 수 있습니다.

**3. C 선언 (C-declarations)**
이 선택적 섹션에는 C 변수 선언이 포함됩니다. 컨버터 함수가 미리 선언되었으므로 전처리기가 선언의 타입 검사를 수행할 수 있습니다.

**4. 정리 (Cleanup)**
선택적 정리 섹션에는 구현 함수 이후에 수정 없이 삽입될 리터럴 C 코드가 포함됩니다.

**5. 출력 (Output)**
출력 섹션에는 전처리기에 의해 생성된 코드가 포함됩니다.

#### 위치 전용 인자 (Positional-only arguments)

키워드 인자를 받지 않는 함수는 슬래시(`/`) 특수 매개변수의 존재로 표시됩니다.

예시:
```c
/*[define stat_float_times]
def os.stat_float_times(/, newval: "i") -> os.stat_result: pass
%%
int newval = -1;
[define_end]*/
```
전처리기는 이 정의를 `PyArg_ParseTuple()` 호출로 변환합니다. 슬래시 오른쪽에 있는 모든 인자는 선택적 인자입니다.

#### 좌우 선택적 인자 (Left and right optional arguments)

일부 레거시 함수는 중앙 매개변수의 좌측과 우측 모두에 선택적 인자 그룹을 포함합니다. 새로운 도구가 이러한 함수를 지원해야 하는지는 논쟁의 여지가 있지만, 완전성을 위해 제안된 구문은 다음과 같습니다.

예시:
```c
/*[define]
def curses.window.addch(y: "i", x: "i", ch: "O", attr: "l") -> None: pass
where groups = [[ch], [ch, attr], [y, x, ch], [y, x, ch, attr]]
[define_end]*/
```
여기서 `ch`는 중앙 매개변수이고, `attr`은 오른쪽에 선택적으로 추가될 수 있으며, `[y, x]` 그룹은 왼쪽에 선택적으로 추가될 수 있습니다.

기본적으로, 중앙 매개변수와 선택적 그룹의 모든 정렬된 조합이 가능해야 하며, 두 조합이 같은 길이를 갖지 않아야 합니다. 이는 목록에 중앙 매개변수를 먼저 넣고 그 다음에 선택적 인자 그룹을 좌우에 추가함으로써 간결하게 표현됩니다.

### 간결한 표기법의 장점 (Benefits of a compact notation)

간결한 표기법의 장점은 특히 많은 수의 매개변수가 관련될 때 명확합니다. `_posixsubprocess.fork_exec`의 인자 파싱 부분은 다음 정의로 완전히 지정됩니다.

```c
/*[define subprocess_fork_exec]
def _posixsubprocess.fork_exec(
    process_args: "O", executable_list: "O", close_fds: "p",
    py_fds_to_keep: "O", cwd_obj: "O", env_list: "O",
    p2cread: "i", p2cwrite: "i", c2pread: "i", c2pwrite: "i",
    errread: "i", errwrite: "i", errpipe_read: "i", errpipe_write: "i",
    restore_signals: "i", call_setsid: "i", preexec_fn: "i", /
) -> int: pass
[define_end]*/
```

### 정의의 쉬운 유효성 검사 (Easy validation of the definition)

경험이 없는 사용자는 `os.stat`과 같은 정의를 어떻게 유효성 검사할 수 있을까요? 단순히 `os.stat`을 `os_stat`으로 변경하고, 누락된 컨버터를 정의한 다음, 정의를 Python 인터랙티브 인터프리터에 붙여넣음으로써 가능합니다! 사실, `converters.h`에서 `converters.py` 모듈을 자동으로 생성할 수도 있습니다.

### PEP 436과의 비교 (Comparison with PEP 436)

이 PEP의 작성자는 PEP 436에서 제안된 DSL에 대해 다음과 같은 우려를 가지고 있습니다.

*   **구문:** 공백에 민감한 설정 파일과 같은 구문은 C 파일 내에서 부적절해 보입니다.
*   **구조 손실:** 함수 정의의 구조가 매개변수별 사양에서 손실됩니다.
*   **키워드 분산:** `positional-only`, `required`, `keyword-only`와 같은 키워드가 너무 많은 다른 장소에 흩어져 있습니다.

반대로, 이 대안적인 DSL에서는 함수 정의의 구조를 한눈에 이해할 수 있습니다.

*   **복잡성:** PEP 436 DSL은 14개의 문서화된 플래그와 적어도 하나의 문서화되지 않은 (`allow_fd`) 플래그를 가지고 있습니다. 가능한 `2**15`개의 조합 중 어떤 것이 유효한지 파악하는 것은 사용자에게 불필요한 부담을 줍니다. PEP 3118 버퍼 플래그의 경험은 유효한 조합을 분류하고 철저히 테스트하는 것이 매우 지루한 작업임을 보여주었습니다.
*   **자유도:** PEP 436 DSL은 너무 많은 자유를 허용합니다. 타입이 생략될 수 있고, 전처리기는 알 수 없는 키워드를 받아들이고 무시하며, 때로는 독스트링 뒤에 공백을 추가하면 assertion 오류가 발생합니다.

반면에 대안적인 DSL은 그러한 자유를 허용하지 않습니다. 컨버터나 반환 값 어노테이션을 생략하는 것은 명백한 구문 오류입니다. LALR(1) 문법은 모호하지 않으며 완전한 번역 단위에 대해 지정됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.