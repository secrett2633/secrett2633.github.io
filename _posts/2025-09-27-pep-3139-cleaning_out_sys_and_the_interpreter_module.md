---
title: "[Rejected] PEP 3139 - Cleaning out sys and the “interpreter” module"
excerpt: "Python Enhancement Proposal 3139: 'Cleaning out sys and the “interpreter” module'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3139/
toc: true
toc_sticky: true
date: 2025-09-27 14:35:24+0900
last_modified_at: 2025-09-27 14:35:24+0900
published: true
---
> **원문 링크:** [PEP 3139 - Cleaning out sys and the “interpreter” module](https://peps.python.org/pep-3139/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 04-Apr-2008


# PEP 3139 – `sys` 모듈 및 "interpreter" 모듈 정리

*   **작성자:** Benjamin Peterson
*   **상태:** Rejected (거부됨)
*   **유형:** Standards Track
*   **작성일:** 2008년 4월 4일
*   **Python 버전:** 3.0

## 거부 통지 (Rejection Notice)

Guido van Rossum의 '-0.5' 투표로 이 PEP는 거부되었습니다. 자세한 내용은 python-3000 메일링 리스트 아카이브를 참조하십시오.

## 개요 (Abstract)

이 PEP는 CPython 구현에 특화된 인터프리터(interpreter) 함수들을 위한 새로운 저수준 모듈을 제안합니다. 이는 `sys` 모듈을 정리하고, 일반적인 Python 기능과 구현 세부 사항(implementation details)을 분리하는 것을 목표로 합니다.

## 배경 (Rationale)

현재 `sys` 모듈은 크게 두 가지 유형의 함수와 데이터를 포함하고 있습니다:

1.  **모든 Python 구현에서 사용 가능하며, Python 가상 머신(Virtual Machine)의 일반적인 실행과 관련된 데이터 및 함수.**
    *   `argv`, `byteorder`, `path`, `path_hooks`, `meta_path`, `path_importer_cache`, `modules`
    *   `copyright`, `hexversion`, `version`, `version_info`
    *   `displayhook`, `__displayhook__`
    *   `excepthook`, `__excepthook__`, `exc_info`, `exc_clear`
    *   `exec_prefix`, `prefix`, `executable`
    *   `exit`
    *   `flags`, `py3kwarning`, `dont_write_bytecode`, `warn_options`
    *   `getfilesystemencoding`
    *   `get/setprofile`
    *   `get/settrace`, `call_tracing`
    *   `getwindowsversion`
    *   `maxint`, `maxunicode`
    *   `platform`
    *   `ps1`, `ps2`
    *   `stdin`, `stderr`, `stdout`, `__stdin__`, `__stderr__`, `__stdout__`
    *   `tracebacklimit`

2.  **CPython 인터프리터에 영향을 미치는 데이터 및 함수.**
    *   `get/setrecursionlimit`
    *   `get/setcheckinterval`
    *   `_getframe`, `_current_frame`
    *   `getrefcount`
    *   `get/setdlopenflags`
    *   `settscdumps`
    *   `api_version`
    *   `winver`, `dllhandle`
    *   `float_info`
    *   `_compact_freelists`
    *   `_clear_type_cache`
    *   `subversion`
    *   `builtin_module_names`
    *   `callstats`
    *   `intern`

두 번째 그룹에 속하는 항목들은 수년 동안 꾸준히 증가하여 `sys` 모듈을 복잡하게 만들었습니다. 심지어 Guido van Rossum도 일부 항목들을 인지하지 못한다고 언급했습니다.

이러한 항목들을 다른 모듈로 이동시키면, 다른 Python 구현체들에게 어떤 함수가 구현되어야 하고 어떤 함수가 그렇지 않은지에 대한 명확한 메시지를 전달할 수 있을 것입니다. 또한, `types` 모듈의 내용이 표준 라이브러리 전반에 분산되어야 한다는 제안도 있었는데, 이 `interpreter` 모듈은 프레임(frames) 및 코드 객체(code objects)와 같은 내부 유형(internal types)을 위한 훌륭한 저장소가 될 수 있을 것입니다.

## 상세 사양 (Specification)

새로운 내장(builtin) 모듈인 "interpreter"가 추가될 예정이었습니다 (이름에 대해서는 "Naming" 섹션 참조). 위에 언급된 두 번째 그룹의 항목들은 다음과 같이 표준 라이브러리로 분할될 예정이었습니다:

*   **`interpreter` 모듈로 이동할 항목:**
    *   `get/setrecursionlimit`
    *   `get/setcheckinterval`
    *   `_getframe`, `_current_frame`
    *   `get/setdlopenflags`
    *   `settscdumps`
    *   `api_version`
    *   `winver`, `dllhandle`
    *   `float_info`
    *   `_clear_type_cache`
    *   `subversion`
    *   `builtin_module_names`
    *   `callstats`
    *   `intern`

*   **`gc` (가비지 컬렉터) 모듈로 이동할 항목:**
    *   `getrefcount`
    *   `_compact_freelists`

## 전환 계획 (Transition Plan)

Python 3.x에 구현되면 `interpreter` 모듈은 2.6 버전으로 백포팅(back-ported)될 예정이었습니다. 또한, 대체되는 `sys` 함수에는 Py3k 경고가 추가될 예정이었습니다.

## 미해결 문제 (Open Issues)

### 어떤 항목을 이동해야 하는가?

*   **`dont_write_bytecode`:** 일부는 바이트코드(bytecode) 작성 기능을 구현 세부 사항으로 보고 이동해야 한다고 주장했습니다. 반대 의견으로는 현재의 모든 완전한 Python 구현이 어떤 형태로든 바이트코드를 작성하므로 이 기능을 비활성화할 수 있는 것이 가치 있다는 것이었습니다. 또한, 만약 이동한다면 `imp` 모듈에 두기를 바라는 의견도 있었습니다.

### `imp` 모듈로 이동하는 항목이 있는가?

`dont_write_bytecode` 또는 `builtin_module_names`가 `imp` 모듈에 잘 어울릴 수 있다는 의견이 있었습니다.

### 명명 (Naming)

작성자는 새로운 모듈의 이름으로 "interpreter"를 제안했습니다. "pyvm"도 제안되었고, "cpython"이라는 이름은 많은 지지를 받았습니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.