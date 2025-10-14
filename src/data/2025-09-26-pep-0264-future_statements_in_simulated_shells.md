---
title: "[Final] PEP 264 - Future statements in simulated shells"
excerpt: "Python Enhancement Proposal 264: 'Future statements in simulated shells'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/264/
toc: true
toc_sticky: true
date: 2025-09-26 17:47:23+0900
last_modified_at: 2025-09-26 17:47:23+0900
published: true
---
> **원문 링크:** [PEP 264 - Future statements in simulated shells](https://peps.python.org/pep-0264/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 30-Jul-2001


## PEP 264: 시뮬레이션 셸에서의 `__future__` 문 (Future statements in simulated shells)

### 개요

PEP 264는 "시뮬레이션 대화형 셸" (simulated interactive shells)이 "실제" 대화형 셸에서 `__future__` 문의 동작을 시뮬레이션하는 명확한 방법이 없다는 PEP 236의 문제점을 해결하고자 합니다. 즉, `__future__` 문의 효과가 셸의 수명 동안 유지되도록 하는 것이 목표입니다.

또한, 이 PEP는 `compile()` 함수를 호출하는 코드에 영향을 미치는 `__future__` 문의 효과가 `compile()`에 상속되는 것을 막을 수 없다는 PEP 236의 또 다른 미해결 문제도 다룹니다.

이 PEP는 첫 번째 문제를 해결하기 위해 내장 함수 `compile()`에 선택적 네 번째 인자를 추가하고, `__future__.py`에 정의된 `_Feature` 인스턴스에 정보를 추가하며, 표준 라이브러리 모듈 `codeop` 및 `code`에 이러한 셸의 구성을 용이하게 하는 메커니즘을 추가할 것을 제안합니다. 두 번째 문제는 `compile()`에 선택적 인자를 하나 더 추가하여, 이 인자가 0이 아닐 경우 `future` 문의 효과 상속을 억제함으로써 처리됩니다.

### 명세 (Specification)

1.  **`compile()` 함수의 변경:**
    *   내장 함수 `compile()`에 네 번째 선택적 인자 `flags`를 추가할 것을 제안합니다. 이 인자가 생략되면 Python 2.1과 동일하게 동작합니다.
    *   `flags`는 정수 값으로, 컴파일 시 다양한 옵션을 비트필드(bitfield) 형태로 나타냅니다. 이 비트필드는 Python 인터프리터의 C 부분에서 `future` 문을 참조하는 데 이미 사용되는 `CO_*` 플래그와 동일한 값을 가집니다.
    *   `compile()`은 제공된 `flags`에서 인식할 수 없는 비트가 설정되어 있으면 `ValueError` 예외를 발생시킵니다.
    *   제공된 `flags`는 항상 설정될 플래그와 비트와이즈 OR (bitwise-OR) 됩니다. 단, 새로운 다섯 번째 선택적 인자가 0이 아닌 정수일 경우, 제공된 `flags`만 정확히 사용되는 플래그 세트가 됩니다.

2.  **`__future__` 모듈의 변경:**
    *   현재 Python에 노출되지 않은 이 플래그들을 노출하기 위해 `__future__.py`의 `_Feature` 객체에 필요한 비트를 포함하는 `.compiler_flag` 속성을 추가할 것을 제안합니다. 이를 통해 다음과 같은 코드를 작성할 수 있습니다.
        ```python
        import __future__
        def compile_generator(func_def):
            return compile(func_def, "<input>", "suite", __future__.generators.compiler_flag)
        ```
    *   또한, `codeob.co_flags & __future__.generators.compiler_flag`와 같은 방식으로 코드 객체가 특정 `future` 기능으로 컴파일되었는지 확인할 수 있게 됩니다.
    *   `__future__` 모듈에 `.all_feature_flags` 속성을 추가하여 실행 중인 인터프리터가 지원하는 모든 `__future__` 옵션을 쉽게 열거할 수 있게 합니다.

3.  **`codeop` 모듈의 변경:**
    *   표준 라이브러리 모듈 `codeop`에 두 개의 클래스를 추가할 것을 제안합니다.
    *   `Compile` 클래스: `__call__` 메서드를 가지며, 2.1 버전의 내장 `compile`과 유사하게 동작하지만, `__future__` 문을 컴파일한 후 이를 "기억"하고 이후의 모든 코드를 해당 `__future__` 옵션이 적용된 상태로 컴파일합니다. 이는 위에서 언급된 `__future__` 모듈의 새로운 기능을 사용합니다.
    *   `CommandCompiler` 클래스: 기존 `codeop.compile_command` 함수의 역할을 수행하지만, `__future__`를 인식하는 방식으로 동작합니다.

4.  **`code` 모듈의 변경:**
    *   표준 라이브러리 모듈 `code`의 `InteractiveInterpreter` 클래스를 수정하여 `CommandCompiler`를 사용하도록 제안합니다. 이는 기본 Python 셸의 동작을 더욱 가깝게 에뮬레이트하기 위함입니다.

### 하위 호환성 (Backward Compatibility)

기존 코드에는 거의 또는 전혀 영향을 미치지 않을 것입니다. `compile`에 대한 변경 사항은 기존 코드에 영향을 주지 않으며, `codeop`에 새로운 함수나 클래스를 추가하는 것도 마찬가지입니다. `code.InteractiveInterpreter`를 사용하는 기존 코드는 동작이 변경될 수 있지만, 이는 "실제" Python 셸을 더 잘 모방하게 되므로 더 나은 방향으로의 변화입니다.

### 전방 호환성 (Forward Compatibility)

새로운 `__future__` 기능을 추가할 때 `Lib/__future__.py`에 필요한 작업이 약간 더 복잡해질 것입니다. 그 외의 모든 것은 잘 작동해야 합니다.

### 구현 (Implementation)

초기 구현은에서 찾아볼 수 있습니다. 팀 피터스(Tim Peters)의 약간의 수정 후, 이 구현들은 이미 체크인되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.