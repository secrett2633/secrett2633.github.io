---
title: "[Final] PEP 230 - Warning Framework"
excerpt: "Python Enhancement Proposal 230: 'Warning Framework'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/230/
toc: true
toc_sticky: true
date: 2025-09-26 16:53:00+0900
last_modified_at: 2025-09-26 16:53:00+0900
published: true
---
> **원문 링크:** [PEP 230 - Warning Framework](https://peps.python.org/pep-0230/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 28-Nov-2000

PEP 230 – 경고 프레임워크

이 문서는 Python Enhancement Proposal (PEP) 230의 내용을 한국어 사용자가 이해하기 쉽게 번역하고 정리한 것입니다. Python 개발자들이 이 PEP의 제안 내용, 도입 배경, 그리고 실제 Python 사용에 미치는 영향을 명확하게 이해할 수 있도록 돕는 것이 목표입니다.

---

## 초록 (Abstract)

이 PEP는 경고 메시지를 발행하고 이를 처리하는 방식을 제어하기 위한 C 및 Python 수준의 API와 명령줄 플래그(command line flags)를 제안합니다. 이 제안은 주로 Guido van Rossum (GvR)이 2000년 11월 5일 `python-dev`에 게시한 제안을 기반으로 하며, 같은 날 Paul Prescod가 게시한 대안 제안(예: 경고 분류에 클래스 사용)에서 몇 가지 아이디어를 통합했습니다. 또한, 이 제안을 구현하려는 시도에서 여러 작은 조정이 이루어졌습니다.

## 동기 (Motivation)

Python 3000이 다가오면서, 오류 외에도 오래되거나 더 이상 사용되지 않는 기능(deprecated features)의 사용에 대해 경고를 발행할 필요성이 생겼습니다. 또한, C 코드와 Python 코드 모두에서, 컴파일 시점과 런타임 시점 모두에서 경고를 발행할 수 있어야 하는 다른 많은 이유들이 있습니다.

경고는 치명적이지 않으므로, 프로그램이 단일 실행 중에 동일한 경고를 여러 번 발생시킬 수 있습니다. 프로그램이 동일한 경고를 끊임없이 출력한다면 번거로울 것입니다. 따라서, 중복되는 동일한 경고를 억제하는 메커니즘이 필요합니다.

어떤 경고를 출력할지 사용자가 제어할 수 있는 것도 바람직합니다. 일반적으로 모든 경고를 항상 보는 것이 유용하지만, 프로덕션 프로그램에서 코드를 즉시 수정하기 어려운 경우가 있을 수 있습니다. 이 경우, 경고를 억제하는 방법이 있어야 합니다.

프로그램 개발 중 특정 경고를 억제할 수 있는 것도 유용합니다. 예를 들어, 즉시 수정할 수 없는 서드파티 코드(3rd party code)에서 경고가 발생하거나, 코드를 수정할 방법이 없는 경우 (완전히 정상적인 코드에 대해 경고 메시지가 생성될 수 있음)가 있습니다. 이러한 경우 모든 경고를 억제하도록 제공하는 것은 현명하지 않습니다. 개발자는 나머지 코드에 대한 경고를 놓칠 수 있기 때문입니다.

반면에, 일부 또는 모든 경고를 오류로 처리하는 것이 더 나은 상황도 생각할 수 있습니다. 예를 들어, 특정 더 이상 사용되지 않는 기능(deprecated feature)이 사용되어서는 안 된다는 로컬 코딩 표준이 있을 수 있습니다. 이를 강제하기 위해, 이 특정 기능에 대한 경고를 예외(exception)를 발생시키는 오류로 전환할 수 있는 기능이 유용합니다 (반드시 모든 경고를 오류로 전환하지 않고도).

따라서, 다음과 같은 기준에 따라 경고를 필터링하거나 예외로 변경할 수 있는 유연한 "경고 필터(warning filter)"를 도입할 것을 제안합니다.

*   코드가 생성된 위치 (패키지, 모듈 또는 함수별)
*   경고 카테고리 (아래에서 논의됨)
*   특정 경고 메시지

경고 필터는 명령줄과 Python 코드 모두에서 제어할 수 있어야 합니다.

## 경고 발행을 위한 API (APIs For Issuing Warnings)

**Python에서 경고를 발행하는 방법:**

```python
import warnings
warnings.warn(message[, category[, stacklevel]])
```
`category` 인수는 주어지면 경고 카테고리 클래스(아래 참조)여야 하며, 기본값은 `warnings.UserWarning`입니다. 특정 발행된 경고가 경고 필터에 의해 오류로 변경되면 예외를 발생시킬 수 있습니다. `stacklevel`은 다음과 같이 Python으로 작성된 래퍼 함수(wrapper functions)에서 사용할 수 있습니다.

```python
def deprecation(message):
    warn(message, DeprecationWarning, level=2)
```
이것은 경고가 `deprecation()` 함수 자체의 소스가 아닌, `deprecation()`의 호출자를 참조하도록 만듭니다 (후자는 경고 메시지의 목적을 무너뜨릴 것이기 때문입니다).

**C에서 경고를 발행하는 방법:**

```c
int PyErr_Warn(PyObject *category, char *message);
```
정상적으로는 `0`을 반환하고, 예외가 발생하면 `1`을 반환합니다 (경고가 예외로 변환되었거나, 메모리 부족과 같은 구현 오류로 인해). `category` 인수는 경고 카테고리 클래스(아래 참조)이거나 `NULL`이어야 합니다. `NULL`인 경우 `PyExc_RuntimeWarning`이 기본값으로 사용됩니다. `PyErr_Warn()` 함수가 `1`을 반환할 때, 호출자는 일반적인 예외 처리를 수행해야 합니다.

`PyErr_Warn()`의 현재 C 구현은 `warnings` 모듈(Python으로 구현됨)을 임포트하고 `warn()` 함수를 호출합니다. 이는 경고 기능을 구현하기 위해 추가해야 하는 C 코드의 양을 최소화합니다.

## 경고 카테고리 (Warnings Categories)

경고 카테고리를 나타내는 여러 내장 예외(built-in exceptions)가 있습니다. 이 분류는 경고 그룹을 필터링하는 데 유용합니다. 현재 다음과 같은 경고 카테고리 클래스가 정의되어 있습니다.

*   **Warning** – 모든 경고 카테고리 클래스의 기본 클래스이며, 그 자체로 `Exception`의 서브클래스입니다.
*   **UserWarning** – `warnings.warn()`의 기본 카테고리입니다.
*   **DeprecationWarning** – 더 이상 사용되지 않는 기능(deprecated features)에 대한 경고의 기본 카테고리입니다.
*   **SyntaxWarning** – 의심스러운 구문 기능(dubious syntactic features)에 대한 경고의 기본 카테고리입니다.
*   **RuntimeWarning** – 의심스러운 런타임 기능(dubious runtime features)에 대한 경고의 기본 카테고리입니다.

이러한 표준 경고 카테고리는 C에서는 `PyExc_Warning`, `PyExc_UserWarning` 등으로 사용할 수 있습니다. Python에서는 `__builtin__` 모듈에서 사용할 수 있으므로 별도의 임포트가 필요하지 않습니다.

사용자 코드는 표준 경고 카테고리 중 하나를 서브클래싱하여 추가 경고 카테고리를 정의할 수 있습니다. 경고 카테고리는 항상 `Warning` 클래스의 서브클래스여야 합니다.

## 경고 필터 (The Warnings Filter)

경고 필터는 경고가 무시될지, 표시될지, 또는 오류(예외 발생)로 전환될지를 제어합니다.

경고 필터에는 세 가지 측면이 있습니다.

*   특정 `warnings.warn()` 또는 `PyErr_Warn()` 호출의 처리 방식을 효율적으로 결정하는 데 사용되는 데이터 구조.
*   Python 소스 코드에서 필터를 제어하기 위한 API.
*   필터를 제어하기 위한 명령줄 스위치.

경고 필터는 여러 단계로 작동합니다. 동일한 경고가 코드의 동일한 위치에서 반복적으로 발행되는 (일반적일 것으로 예상되는) 경우에 최적화되어 있습니다.

먼저, 경고 필터는 경고가 발행된 모듈(module)과 줄 번호(line number)를 수집합니다. 이 정보는 `sys._getframe()`을 통해 쉽게 얻을 수 있습니다.

개념적으로, 경고 필터는 필터 사양(filter specifications)의 정렬된 목록을 유지합니다. 특정 경고는 목록의 각 필터 사양과 차례로 일치시켜 일치를 찾을 때까지 비교합니다. 일치하는 항목이 발견되면 해당 경고의 처리 방식이 결정됩니다. 각 항목은 다음과 같은 튜플입니다.

`(category, message, module, lineno, action)`

*   `category`: 경고 카테고리가 일치해야 하는 클래스( `warnings.Warning`의 서브클래스).
*   `message`: 경고 메시지가 일치해야 하는 컴파일된 정규 표현식(정규식은 대소문자를 구분하지 않음).
*   `module`: 모듈 이름이 일치해야 하는 컴파일된 정규 표현식.
*   `lineno`: 경고가 발생한 줄 번호가 일치해야 하는 정수, 또는 모든 줄 번호에 일치하는 `0`.
*   `action`: 다음 문자열 중 하나입니다.
    *   `"error"` – 일치하는 경고를 예외로 전환합니다.
    *   `"ignore"` – 일치하는 경고를 절대 출력하지 않습니다.
    *   `"always"` – 일치하는 경고를 항상 출력합니다.
    *   `"default"` – 경고가 발행된 각 위치에 대해 일치하는 경고의 첫 번째 발생을 출력합니다.
    *   `"module"` – 경고가 발행된 각 모듈에 대해 일치하는 경고의 첫 번째 발생을 출력합니다.
    *   `"once"` – 일치하는 경고의 첫 번째 발생만 출력합니다.

`Warning` 클래스는 내장 `Exception` 클래스에서 파생되었으므로, 경고를 오류로 전환하려면 단순히 `category(message)`를 발생시키면 됩니다.

## 경고 출력 및 형식화 훅 (Warnings Output And Formatting Hooks)

경고 필터가 경고를 발행하기로 결정할 때(예외를 발생시키기로 결정할 때는 제외), `warnings.showwarning(message, category, filename, lineno)` 함수에 정보를 전달합니다. 이 함수의 기본 구현은 경고 텍스트를 `sys.stderr`에 쓰고, `filename`의 소스 줄을 보여줍니다. `sys.stderr`와 다른 파일을 지정하는 데 사용할 수 있는 선택적 5번째 인수가 있습니다.

경고의 형식화는 별도의 함수인 `warnings.formatwarning(message, category, filename, lineno)`에 의해 수행됩니다. 이 함수는 `showwarning()` 함수와 동일한 효과를 얻기 위해 인쇄할 수 있는 문자열(새 줄 문자를 포함하고 새 줄로 끝날 수 있음)을 반환합니다.

## 경고 필터 조작을 위한 API (API For Manipulating Warning Filters)

```python
warnings.filterwarnings(action, message="", category=Warning, module="", lineno=0)
```
이 함수는 인수의 타입을 확인하고, 메시지(message)와 모듈(module) 정규 표현식을 컴파일한 다음, 이를 튜플로 경고 필터 앞에 삽입합니다. (역주: 원문에는 `action` 인수가 첫 번째로 명시되어 있지만, 실제 Python 구현에서는 `action`이 첫 번째 인수로 옵니다. PEP에서는 명시적으로 인자 순서를 설명하지 않고 인자 이름만 나열했습니다.)

```python
warnings.resetwarnings()
```
경고 필터를 비어있는 상태로 재설정합니다.

## 명령줄 구문 (Command Line Syntax)

가장 일반적인 필터링 동작을 지정하기 위한 명령줄 옵션이 있어야 하며, 다음을 포함할 것으로 예상됩니다.

*   모든 경고 억제
*   어디서든 특정 경고 메시지 억제
*   특정 모듈의 모든 경고 억제
*   모든 경고를 예외로 전환

다음과 같은 명령줄 옵션 구문을 제안합니다.

`-Waction[:message[:category[:module[:lineno]]]]`

여기서:

*   `'action'`은 허용되는 동작(`"error"`, `"default"`, `"ignore"`, `"always"`, `"once"`, 또는 `"module"`) 중 하나의 약어입니다.
*   `'message'`는 메시지 문자열입니다. 메시지 텍스트가 `'message'`의 초기 서브스트링(initial substring)인 경고와 일치합니다 (매칭은 대소문자를 구분하지 않음).
*   `'category'`는 표준 경고 카테고리 클래스 이름의 약어이거나 `[package.]module.classname` 형식의 사용자 정의 경고 카테고리 클래스의 정규화된 이름(fully-qualified name)입니다.
*   `'module'`은 모듈 이름입니다 ( `package.module`일 수 있음).
*   `'lineno'`는 정수 줄 번호입니다.

`'action'`을 제외한 모든 부분은 생략될 수 있으며, 공백을 제거한 후 빈 값은 생략된 값과 동일하게 처리됩니다.

Python 명령줄을 파싱하는 C 코드는 모든 `-W` 옵션의 본문을 문자열 목록에 저장하며, 이 목록은 `sys.warnoptions`로 `warnings` 모듈에 제공됩니다. `warnings` 모듈은 처음 임포트될 때 이를 파싱합니다. `sys.warnoptions`를 파싱하는 동안 감지된 오류는 치명적이지 않습니다. 메시지가 `sys.stderr`에 기록되고 옵션 처리가 계속됩니다.

**예시:**

*   `-Werror` : 모든 경고를 오류로 전환
*   `-Wall` : 모든 경고를 표시
*   `-Wignore` : 모든 경고 무시
*   `-Wi:hello` : 메시지 텍스트가 "hello"로 시작하는 경고 무시
*   `-We::Deprecation` : `DeprecationWarning`을 오류로 전환
*   `-Wi:::spam:10` : `spam` 모듈의 10번째 줄에 있는 모든 경고 무시
*   `-Wi:::spam -Wd:::spam:10` : `spam` 모듈의 모든 경고 무시 (단, 10번째 줄은 제외)
*   `-We::Deprecation -Wd::Deprecation:spam` : `DeprecationWarning`을 오류로 전환 (단, `spam` 모듈은 제외)

## 미해결 문제 (Open Issues)

몇 가지 미해결 문제는 다음과 같습니다.

*   예외 메커니즘을 사용할 수 없는 렉싱(lexing) 또는 파싱(parsing) 중에 경고를 발행하는 것은 어떻게 할 것인가?
*   제안된 명령줄 구문은 약간 보기 좋지 않습니다 (간단한 경우는 `-Werror`, `-Wignore` 등 나쁘지 않지만). 더 나은 아이디어가 있을까요?
*   필터 사양이 너무 복잡할까봐 약간 걱정됩니다. 카테고리(category)와 모듈(module)로만 필터링하는 것으로는 충분할까요? (메시지 텍스트와 줄 번호는 제외)
*   모듈 이름과 파일 이름 사이에 약간의 혼동이 있습니다. 보고는 파일 이름을 사용하지만, 필터 사양은 모듈 이름을 사용합니다. 파일 이름도 허용해야 할까요?
*   패키지(packages)가 올바르게 처리되는지에 대해 전혀 확신이 없습니다.
*   더 많은 표준 경고 카테고리가 필요할까요? 아니면 더 적게?
*   시작 오버헤드(start-up overhead)를 최소화하기 위해 `warnings` 모듈은 `PyErr_Warn()`의 첫 번째 호출 시 임포트됩니다. 임포트 시 `-W` 옵션에 대한 명령줄 파싱을 수행합니다. 따라서, 경고가 없는 프로그램은 유효하지 않은 `-W` 옵션에 대해 불평하지 않을 수 있습니다.

## 거부된 우려 사항 (Rejected Concerns)

Paul Prescod, Barry Warsaw, Fred Drake는 제가 중요하지 않다고 생각하는 몇 가지 추가 우려 사항을 제기했습니다. 여기에서 이에 대해 다룹니다 (우려 사항은 그들의 정확한 말은 아니며 의역되었습니다).

*   **Paul:** `warn()`은 쉽게 사용할 수 있도록 내장 함수(built-in)이거나 문(statement)이어야 합니다.
    *   **응답:** `"from warnings import warn"`도 충분히 쉽습니다.
*   **Paul:** 내부 루프(inner loop)에서 경고를 발생시키는 속도에 민감한 모듈이 있다면 어떻게 해야 할까요? 경고를 탐지하는 오버헤드를 비활성화할 수 있어야 합니다 (단순히 경고를 억제하는 것 이상으로).
    *   **응답:** 경고가 발생하지 않도록 내부 루프를 다시 작성하세요.
*   **Paul:** 경고의 전체 컨텍스트를 보고 싶다면 어떻게 해야 할까요?
    *   **응답:** `-Werror`를 사용하여 예외로 전환하세요.
*   **Paul:** 경고 사양의 일부를 생략하는 데 `":*:*:"`이 `":::"`보다 좋습니다.
    *   **응답:** 저는 그렇게 생각하지 않습니다.
*   **Barry:** `lineno`가 범위 지정일 수 있으면 좋을 것입니다.
    *   **응답:** 이미 너무 복잡합니다.
*   **Barry:** 저만의 경고 동작(action)을 추가하고 싶습니다. `action`이 문자열뿐만 아니라 호출 가능한(callable) 객체일 수도 있다면 어떨까요? 그러면 IDE에서 `"mygui.popupWarningsDialog"`로 설정할 수 있을 것입니다.
    *   **응답:** 그 목적을 위해서는 `warnings.showwarning()`를 오버라이드하면 됩니다.
*   **Fred:** `Warning` 카테고리 클래스가 `__builtin__`에 있어야 하는 이유는 무엇입니까?
    *   **응답:** `warnings` 모듈을 임포트하는 `PyErr_Warn()`의 첫 번째 호출 이전에 C에서 경고 카테고리를 사용할 수 있어야 한다는 점을 고려할 때, 이것이 가장 간단한 구현입니다. 내장으로 제공하는 데 문제가 없다고 봅니다.

## 구현 (Implementation)

여기 프로토타입 구현이 있습니다: [http://sourceforge.net/patch/?func=detailpatch&patch_id=102715&group_id=5470](http://sourceforge.net/patch/?func=detailpatch&patch_id=102715&group_id=5470)

소스: [https://github.com/python/peps/blob/main/peps/pep-0230.rst](https://github.com/python/peps/blob/main/peps/pep-0230.rst)
최종 수정: 2025-02-01 08:55:40 GMT

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.