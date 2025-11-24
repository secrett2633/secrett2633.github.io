---
title: "[Final] PEP 657 - Include Fine Grained Error Locations in Tracebacks"
excerpt: "Python Enhancement Proposal 657: 'Include Fine Grained Error Locations in Tracebacks'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/657/
toc: true
toc_sticky: true
date: 2025-09-27 09:54:06+0900
last_modified_at: 2025-09-27 09:54:06+0900
published: true
---
> **원문 링크:** [PEP 657 - Include Fine Grained Error Locations in Tracebacks](https://peps.python.org/pep-0657/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 08-May-2021


## PEP 657 – 트레이스백에 상세한 오류 위치 정보 포함 (Include Fine Grained Error Locations in Tracebacks)

### 개요 (Abstract)
이 PEP(Python Enhancement Proposal)는 각 바이트코드(bytecode) 명령어에 대해 해당 명령어를 생성한 코드 라인의 시작 및 끝 열(column) 오프셋(offset)과 끝 라인 번호를 매핑하는 데이터를 추가할 것을 제안합니다. 이 데이터는 CPython 인터프리터가 표시하는 트레이스백(traceback)을 개선하여 디버깅 경험을 향상시키는 데 사용될 것입니다. 또한, 이 PEP는 커버리지 분석 도구(coverage analysis tools), 프로파일러(profilers), 트레이서(tracers), 디버거(debuggers)와 같은 다른 도구들이 코드 객체(code objects)에서 이 정보를 활용할 수 있도록 API(Application Programming Interface)를 추가할 것을 제안합니다.

### 동기 (Motivation)
이 PEP의 주요 동기는 오류 위치에 대한 피드백을 개선하여 디버깅을 돕는 것입니다.

현재 Python은 컴파일 시 바이트코드와 라인 번호 간의 매핑을 유지합니다. 인터프리터는 이 매핑을 사용하여 오류와 관련된 소스 라인을 가리킵니다. 그러나 단일 Python 코드 라인이 수십 개의 바이트코드 연산으로 컴파일될 수 있어, 라인 수준의 세분화(granularity)만으로는 오류를 유발한 라인의 특정 부분을 추적하기 어렵습니다.

**예시:**
다음과 같은 코드를 고려해봅시다.
```python
x['a']['b']['c']['d'] = 1
```
만약 딕셔너리(dictionary) 내의 어떤 값이 `None`이면, 현재 트레이스백은 다음과 같이 표시됩니다.
```
Traceback (most recent call last):
  File "test.py", line 2, in <module>
    x['a']['b']['c']['d'] = 1
TypeError: 'NoneType' object is not subscriptable
```
이 트레이스백만으로는 `None` 값을 가진 딕셔너리가 무엇인지 파악하기 불가능하며, 사용자는 종종 디버거를 연결하거나 표현식을 분리해야 문제를 해결할 수 있습니다.

하지만 인터프리터가 바이트코드와 라인 번호뿐만 아니라 열 오프셋 매핑을 가지고 있다면, 다음과 같이 유용하게 표시할 수 있습니다.
```
Traceback (most recent call last):
  File "test.py", line 2, in <module>
    x['a']['b']['c']['d'] = 1
    ~~~~~~~~~~~^^^^^
TypeError: 'NoneType' object is not subscriptable
```
이는 `x['a']['b']` 객체가 `None`이었음을 사용자에게 알려줍니다. 이러한 하이라이팅은 트레이스백의 모든 프레임(frame)에 적용됩니다.

이 문제는 다음과 같은 상황에서 발생합니다.
*   **함수 호출에 여러 객체를 전달하고 동일한 속성에 접근할 때:**
    *   개선 전:
        ```
        AttributeError: 'NoneType' object has no attribute 'name'
        ```
    *   개선 후: `foo(a.name, b.name, c.name)`에서 `^^^^^^`와 같이 `b.name`이 오류를 일으켰음을 명확히 보여줍니다.
*   **복잡한 수학적 표현식을 다룰 때:** 특히 NumPy(넘파이)와 같이 인수에 따라 산술 연산이 실패할 수 있는 라이브러리에서 유용합니다.
    *   개선 전:
        ```
        x = (a + b) @ (c + d)
        ValueError: operands could not be broadcast together with shapes (1,2) (2,3)
        ```
        어떤 연산이 실패했는지 불분명합니다.
    *   개선 후: `x = (a + b) @ (c + d)`에서 `~~^~~`와 같이 `@` 연산이 오류를 일으켰음을 명확히 보여줍니다.

디버깅 외에도, 이 추가 정보는 코드 커버리지(code coverage) 도구에 유용하여 라인 수준이 아닌 표현식(expression) 수준의 커버리지를 측정할 수 있게 합니다. 예를 들어, `x = foo() if bar() else baz()`와 같은 라인에서 `bar()`가 실행되었는지 `baz()`가 실행되었는지 정확히 구분할 수 있게 됩니다. 이는 `pycoverage`와 같은 도구에서 알려진 문제입니다.

### 근거 (Rationale)
예외(exception) 발생 시 실행되는 소스 코드의 범위를 식별하기 위해, 이 제안은 모든 바이트코드 명령어에 새로운 데이터를 추가해야 합니다. 이는 디스크의 `.pyc` 파일 크기와 메모리 내 코드 객체(code objects)의 크기에 영향을 미칠 것입니다. 제안자들은 이러한 영향을 최소화하는 방식으로 데이터 타입을 선택했습니다. 제안된 오버헤드(overhead)는 각 바이트코드 명령어에 대해 두 개의 `uint8_t` (시작 오프셋 및 끝 오프셋)와 끝 라인 정보를 저장하는 것입니다.

예시 계산에 따르면, 시작 및 끝 오프셋을 포함하면 표준 라이브러리의 `.pyc` 파일 크기가 28.4MB에서 34.7MB로 약 22%(6MB) 증가할 것으로 예상됩니다. 메모리 사용량의 오버헤드는 동일할 것입니다. 제안자들은 현대 컴퓨터의 저장 공간 및 메모리 용량을 고려할 때 이 정도의 오버헤드는 매우 수용 가능한 수준이라고 판단합니다. 또한, 일반적으로 Python 프로그램의 메모리 크기는 코드 객체에 의해 지배되지 않습니다. 여러 인기 PyPI 프로젝트(NumPy, pytest, Django, Cython 등) 및 애플리케이션(Black, pylint, mypy 등)의 테스트 스위트를 실행한 결과, 코드 객체는 프로그램 평균 메모리 크기의 3~6%를 차지하는 것으로 나타났습니다.

일부 사용자에게는 이 추가 정보의 비용이 수용 불가능할 수 있으므로, 이 제안은 옵트아웃(opt-out) 메커니즘을 제공합니다. 이를 통해 생성된 코드 객체에 추가 정보가 포함되지 않도록 하고 `.pyc` 파일에도 추가 정보가 포함되지 않도록 할 수 있습니다.

### 명세 (Specification)

오류가 발생한 라인 내의 정확한 위치를 해결하기 위해, 바이트코드 명령어를 열 오프셋(시작 및 끝 오프셋)과 끝 라인 번호에 연결하는 매핑이 필요합니다.

이 PEP의 구현의 일부로 다음 변경사항이 수행됩니다.
*   코드 객체 클래스에 `co_positions`라는 새로운 속성을 통해 오프셋 정보가 Python에 노출됩니다. 이 속성은 각 명령어의 전체 위치(시작 라인, 끝 라인, 시작 열 오프셋, 끝 열 오프셋)를 포함하는 4개 요소 튜플(tuple)의 시퀀스를 반환하거나, 오프셋 정보 없이 코드 객체가 생성된 경우 `None`을 반환합니다.
*   새로운 C-API 함수 `int PyCode_Addr2Location(PyCodeObject *co, int addrq, int *start_line, int *start_column, int *end_line, int *end_column)`가 추가됩니다. 이 함수를 통해 바이트코드 명령어의 인덱스를 사용하여 끝 라인, 시작 열 오프셋 및 끝 열 오프셋을 얻을 수 있습니다. 정보가 없는 경우 이 함수는 값을 `0`으로 설정합니다.
*   정보의 내부 저장, 압축 및 인코딩은 구현 세부 사항으로 남겨두며, 공개 API가 변경되지 않는 한 언제든지 변경될 수 있습니다.

#### 오프셋 의미론 (Offset semantics)
이러한 오프셋은 컴파일러에 의해 모든 AST(Abstract Syntax Tree) 노드에 현재 저장된 오프셋으로부터 전파됩니다. `co_positions` 및 `PyCode_Addr2Location`와 같은 공개 API는 0-기반(0-indexed) 오프셋을 사용하며, 이는 AST 노드와 동일합니다. 현재 구현은 `uint8_t` 타입을 사용하여 저장 공간 영향을 최소화합니다. 이로 인해 오프셋은 0에서 255까지 가능하며, 이보다 큰 오프셋은 누락된 것으로 처리됩니다.

#### 트레이스백 표시 (Displaying tracebacks)
트레이스백 표시 시, 기본 예외 후크(exception hook)가 수정되어 코드 객체에서 이 정보를 질의하고, 정보가 사용 가능한 경우 트레이스백의 모든 표시된 라인에 대해 캐럿(caret) 시퀀스를 표시합니다.

예를 들어:
```
File "test.py", line 6, in lel
  return 1 + foo(a,b,c=x['z']['x']['y']['z']['y'], d=e)
          ~~~~~~~~~~~~~~~^^^^^
TypeError: 'NoneType' object is not subscriptable
```
트레이스백 표시 시, 명령어 오프셋은 트레이스백 객체에서 가져옵니다. 이로 인해 재발생(re-raised)되는 예외의 하이라이팅이 스택(stack)에 새 정보를 저장할 필요 없이 자연스럽게 작동합니다.

여러 라인에 걸쳐 있는 명령어의 경우 (시작 및 끝 오프셋이 다른 라인에 속하는 경우), 끝 라인 번호를 검사하여 끝 오프셋이 시작 오프셋과 동일한 라인에 적용되는지 여부를 알아야 합니다.

#### 옵트아웃 메커니즘 (Opt-out mechanism)
저장 및 메모리 오버헤드를 신경 쓰는 사용자를 위해, 그리고 현재 트레이스백을 파싱(parsing)하는 서드파티 도구 및 다른 프로그램이 이 변화에 적응할 시간을 주기 위해, 이 기능을 비활성화할 수 있는 다음 방법들이 제공됩니다.
*   새로운 환경 변수: `PYTHONNODEBUGRANGES`
*   개발 모드를 위한 새로운 명령줄 옵션: `python -Xno_debug_ranges`

이러한 방법 중 하나를 사용하면 Python 컴파일러는 코드 객체에 새 정보를 채우지 않고(`None` 사용), 추가 정보를 포함하는 언마샬된(unmarshalled) 코드 객체는 해당 정보를 제거하고 `None`으로 대체합니다. 또한, 트레이스백 기능은 정보가 존재하더라도 확장된 위치 정보를 표시하지 않습니다.
이는 사용자가 다음과 같이 할 수 있게 합니다.
*   파일 생성 시 위에 언급된 방법 중 하나를 사용하여 더 작은 `.pyc` 파일을 만듭니다.
*   `.pyc` 파일에 추가 정보가 포함되어 있더라도 해당 정보를 로드하지 않습니다.
*   트레이스백 표시 시 추가 정보(오류 위치를 나타내는 캐럿 문자)를 비활성화합니다.

### 하위 호환성 (Backwards Compatibility)
이 변경사항은 완전히 하위 호환됩니다.

### 거부된 아이디어 (Rejected Ideas)

#### 범위 대신 단일 캐럿 사용 (Use a single caret instead of a range)
오류 보고 시 전체 범위를 하이라이트하는 대신 단일 캐럿을 사용하는 방안이 제안되었으나, 다음 이유로 거부되었습니다.
*   AST의 현재 구조로는 캐럿의 위치를 도출하기 어렵습니다. AST 노드는 시작 및 끝 라인 번호와 시작 및 끝 열 오프셋만 기록하기 때문입니다.
*   AST 노드에서 범위를 도출하는 것이 구현을 크게 단순화하고 유지 보수 비용을 줄이며 오류 가능성을 낮춥니다.
*   단일 캐럿 정보를 저장하는 것은 커버리지 도구, 프로파일러, IPython, IDE와 같은 도구에 매우 제한적입니다. 이러한 도구는 실행된 바이트코드가 커버하는 전체 호출(예: `foo(a,b,c)`)을 하이라이트하기를 원하며, 단일 문자만으로는 부족합니다.
*   많은 사용자가 단일 캐럿보다 전체 범위가 훨씬 읽기 쉽다고 보고했으며, 이는 문법 오류 하이라이팅에 범위를 사용하는 동기가 되었고 매우 긍정적인 반응을 얻었습니다. 시각 장애가 있는 사용자도 단일 캐럿 문자보다 범위를 훨씬 쉽게 식별할 수 있습니다.

#### 옵트아웃을 위한 구성 플래그 (Have a configure flag to opt out)
옵트아웃을 위한 구성 플래그를 두는 것은 바람직해 보일 수 있지만, 플래그가 활성화되지 않은 인터프리터 버전으로 생성된 `.pyc` 파일을 읽을 때 문제가 발생할 수 있습니다. 이는 일반 사용자에게 디버깅하기 매우 어려운 충돌을 유발하고 `.pyc` 파일 간의 비호환성을 초래할 수 있습니다. 대신 `-Xno_debug_ranges`와 같은 런타임 옵션을 사용하는 것이 선택되었습니다.

#### 열 정보 지연 로딩 (Lazy loading of column information)
메모리 사용량을 줄이기 위한 한 가지 해결책으로 코드가 임포트(import)될 때 `.pyc` 파일에서 열 정보를 로드하지 않고, 예외가 발생하거나 C-API 함수 호출이 있을 때만 로드하는 방안이 제안되었습니다. 이는 구현을 훨씬 더 복잡하게 만들고, `.pyc` 파일을 사용하지 않거나 런타임에 동적으로 생성된 코드 객체에는 열 정보가 제공되지 않을 수 있으므로, 이 PEP의 범위 밖으로 간주되었습니다.

#### 압축 구현 (Implement compression)
`.pyc` 파일과 코드 객체의 새로운 데이터에 대한 압축 구현이 가능하지만, 이는 범위가 넓고 열 오프셋이 패턴 부족으로 잘 압축되지 않을 것으로 예상되므로 이 제안의 범위 밖으로 간주되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.