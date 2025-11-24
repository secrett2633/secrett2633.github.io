---
title: "[Final] PEP 765 - Disallow return/break/continue that exit a finally block"
excerpt: "Python Enhancement Proposal 765: 'Disallow return/break/continue that exit a finally block'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/765/
toc: true
toc_sticky: true
date: 2025-09-27 13:46:10+0900
last_modified_at: 2025-09-27 13:46:10+0900
published: true
---
> **원문 링크:** [PEP 765 - Disallow return/break/continue that exit a finally block](https://peps.python.org/pep-0765/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 15-Nov-2024


# PEP 765 – `finally` 블록을 종료하는 `return`/`break`/`continue` 금지 제안

**저자:** Irit Katriel, Alyssa Coghlan
**상태:** Final
**유형:** Standards Track
**생성일:** 2024년 11월 15일
**Python 버전:** 3.14
**대체:** PEP 601

## 요약 (Abstract)

이 PEP는 `finally` 블록을 빠져나오는 `return`, `break`, `continue` 문의 지원을 철회할 것을 제안합니다. 이 제안은 과거 PEP 601에서 한 번 논의되었으나, 당시에는 이 변경의 비용/편익에 대한 경험적 증거가 부족하여 거부되었습니다. 현재 PEP는 이러한 증거를 기반으로 하며, PEP 601이 제안했던 것과는 약간 다른 해결책을 제시합니다.

## 동기 (Motivation)

`finally` 블록 내에서 `return`, `break`, `continue`의 의미론(semantics)은 많은 개발자에게 혼란을 줍니다. 공식 문서에는 다음과 같이 명시되어 있습니다.

*   `finally` 절이 `break`, `continue` 또는 `return` 문을 실행하면 예외가 다시 발생하지 않습니다.
*   `finally` 절에 `return` 문이 포함되어 있으면, 반환되는 값은 `finally` 절의 `return` 문에서 온 것이며, `try` 절의 `return` 문에서 온 값이 아닙니다.

이 두 가지 동작 모두 혼란을 야기하지만, 첫 번째는 특히 위험합니다. 왜냐하면 삼켜진(swallowed) 예외는 잘못된 반환 값보다 테스트 중에 발견되기 어렵기 때문입니다.

2019년, PEP 601은 이러한 상황에 대해 몇몇 릴리스 동안 `SyntaxWarning`을 발생시킨 후 `SyntaxError`로 전환하도록 Python을 변경할 것을 제안했습니다. 그러나 이는 프로그래밍 스타일 문제로 간주되어 린터(linter)와 PEP 8에 의해 처리되어야 한다는 의견으로 거부되었습니다. 실제로 PEP 8은 이제 `finally` 블록에서 제어 흐름(control flow) 문을 사용하지 않도록 권장하며, Pylint, Ruff, flake8-bugbear와 같은 린터들은 이를 문제로 지적합니다.

## 근거 (Rationale)

최근 실제 코드 분석에 따르면 다음 사실이 밝혀졌습니다.

*   이러한 기능은 드뭅니다. (상위 8,000개 PyPI 패키지에서 100만 라인당 2회, 무작위 패키지에서 100만 라인당 4회). 이는 이러한 패턴을 감지하는 린터 덕분일 수 있습니다.
*   대부분의 사용은 잘못되었으며, 의도하지 않은 예외 삼킴(exception-swallowing) 버그를 유발합니다.
*   코드 소유자들은 일반적으로 버그 수정에 적극적이며, 수정이 쉽다고 생각합니다.

이러한 새로운 데이터는 Python 자체에서 이 해로운 기능의 사용을 줄이도록 유도하는 것이 Python 사용자에게 이점이 될 것임을 시사합니다.

PEP 601 논의에서 제기된 주장 중 하나는 언어 기능이 직교적(orthogonal)이어야 하며, 컨텍스트 기반 제한 없이 결합되어야 한다는 것이었습니다. 그러나 그동안 PEP 654가 구현되었고, 이는 `except*` 절의 의미론이 `except*` 절이 병렬로 작동하는 속성을 위반하므로 한 절의 코드가 다른 절의 호출을 억제해서는 안 되기 때문에 `except*` 절에서 `return`, `break`, `continue`를 금지합니다. 이 경우 우리는 기능의 조합이 너무 해로워서 이를 금지하는 것이 합리적임을 받아들였습니다.

## 명세 (Specification)

이번 변경은 `finally` 블록 내에서 `return`, `break`, `continue`가 제어 흐름을 외부로 전환하려 할 때 Python 컴파일러가 `SyntaxWarning` 또는 `SyntaxError`를 발생시킬 수 있도록 언어 명세의 일부로 지정하는 것입니다.

다음 예시는 `SyntaxWarning` 또는 `SyntaxError`를 발생시킬 수 있습니다.

```python
def f():
    try:
        ...
    finally:
        return 42

for x in o:
    try:
        ...
    finally:
        break # (or continue)
```

다음 예시는 경고나 오류를 발생시키지 않습니다.

```python
try:
    ...
finally:
    def f():
        return 42

try:
    ...
finally:
    for x in o:
        break # (or continue)
```

CPython은 버전 3.14에서 `SyntaxWarning`을 발생시키며, 이것이 언제 `SyntaxError`로 바뀔지는 결정되지 않았습니다. 그러나 언어 명세에서 `SyntaxError`가 허용됨을 명시하여 다른 Python 구현체가 이를 선택적으로 구현할 수 있도록 합니다.

CPython 구현은 AST(Abstract Syntax Tree) 구성 중에 `SyntaxWarning`을 발생시켜, 정적 분석 및 컴파일 중에 경고가 표시되도록 하지만, 미리 컴파일된 코드 실행 중에는 표시되지 않도록 합니다. 이 경고는 프로젝트 관리자(정적 분석을 실행하거나 미리 컴파일된 파일이 없는 CI를 실행할 때)에게 보일 것으로 예상됩니다. 그러나 프로젝트의 최종 사용자는 설치 시 미리 컴파일을 건너뛰거나, 설치 시 경고를 확인하거나, 의존성에 대해 정적 분석을 실행하지 않는 한 경고를 보지 못할 것입니다.

## 하위 호환성 (Backwards Compatibility)

하위 호환성 문제 때문에, CPython은 `SyntaxWarning`만 발생시키고, 이를 오류로 업그레이드할 구체적인 계획은 없습니다. 이 변경이 도입되면 `-We` 옵션으로 실행되는 코드가 작동을 멈출 수 있습니다.

## 보안 영향 (Security Implications)

이 경고/오류는 프로그래머가 찾기 어려운 일부 버그를 피하는 데 도움이 되므로 보안상 이점이 있습니다. 새로운 `SyntaxWarning` 또는 `SyntaxError` 발생과 관련된 보안 문제는 알려져 있지 않습니다.

## 교육 방법 (How to Teach This)

이 변경 사항은 언어 명세와 "What's New" 문서에 기록될 것입니다. `SyntaxWarning`은 사용자에게 코드 변경이 필요함을 알릴 것입니다. 경험적 증거에 따르면 필요한 변경 사항은 일반적으로 매우 간단합니다.

## 거부된 아이디어 (Rejected Ideas)

### CPython에서 `SyntaxError` 발생 (Emit SyntaxError in CPython)

PEP 601은 CPython이 몇몇 릴리스 동안 `SyntaxWarning`을 발생시킨 후 `SyntaxError`로 전환할 것을 제안했습니다. 우리는 `SyntaxWarning`이 더 적은 위험으로 대부분의 이점을 제공할 것이라고 믿기 때문에, 이것이 CPython에서 `SyntaxError`가 될지 여부와 시점을 결정하지 않았습니다.

### 의미론 변경 (Change Semantics)

`finally` 블록 내의 제어 흐름 명령어의 의미론을 변경하여, 현재 진행 중인 예외(in-flight exception)가 이들보다 우선하도록 제안되었습니다. 즉, `return`, `break` 또는 `continue`는 허용되고 `finally` 블록을 빠져나가지만, 예외는 여전히 발생하도록 하는 것입니다.

이 제안은 두 가지 이유로 거부되었습니다. 첫째, 이는 디버깅하기 어려울 수 있는 방식으로 작동하는 코드의 의미론을 변경할 것입니다. 모든 예외를 삼키려는 의도로 작성된 `finally` (문서화된 의미론을 올바르게 사용한 경우)는 이제 예외가 전파되도록 허용할 것입니다. 이는 런타임에 드문 엣지 케이스에서만 발생할 수 있으며, 테스트에서 감지될 것이 보장되지 않습니다. 코드가 잘못되었고 예외 삼킴 버그가 있더라도, 사용자들이 왜 3.13에서는 예외를 발생시키지 않던 프로그램이 3.14에서 예외를 발생시키기 시작했는지 이해하기 어려울 수 있습니다. 이와 대조적으로 `SyntaxWarning`은 테스트 중에 발견될 가능성이 높으며, 코드의 정확한 문제 위치를 가리키고 프로그램 실행을 방해하지 않습니다.

두 번째 반대 이유는 제안된 의미론 자체에 관한 것이었습니다. 제어 흐름 문을 허용하는 동기는 이것이 유용하다기보다는 기능의 직교성(orthogonality)에 대한 열망 때문입니다(앞서 언급했듯이 `except*` 절의 경우 이미 이 직교성이 위배됩니다). 그러나 제안된 의미론은 `finally`가 진행 중인 예외 없이 실행될 때는 `return`, `break`, `continue`가 평소처럼 동작하지만, 예외가 있을 때는 마치 맨 `raise`처럼 변형된다는 점에서 복잡합니다. 한 기능의 존재가 다른 기능의 의미론을 변경한다면, 해당 기능들이 직교적이라고 주장하기 어렵습니다.

## 부록 (Appendix)

### `finally` 내의 `return`은 해롭다 (`return in finally considered harmful`)

아래는 Irit Katriel의 연구 보고서 축약본으로, 2024년 11월 9일에 게시되었습니다. 이 보고서는 실제 코드에서 `finally` 절 내의 `return`, `break`, `continue` 사용에 대한 조사를 설명하며 다음 질문에 답합니다.

*   사람들이 이것을 사용하고 있는가?
*   얼마나 자주 잘못 사용하고 있는가?
*   제안된 변경으로 인해 얼마나 많은 코드가 수정되어야 하는가(churn)?

#### 방법 (Method)

분석은 지난 30일 동안의 다운로드 수를 기준으로 가장 인기 있는 8,000개의 PyPI 패키지를 기반으로 합니다. 이 패키지들은 10월 17일~18일에 Guido van Rossum이 작성한 스크립트를 사용하여 다운로드되었으며, 이 스크립트는 Hugo van Kemenade의 가장 인기 있는 패키지 목록을 생성하는 도구를 활용합니다.

다운로드 후, 두 번째 스크립트를 사용하여 각 파일의 AST를 구성하고, `finally` 블록 안에 직접 위치한 `break`, `continue`, `return` 문을 식별하기 위해 순회했습니다.

그다음 각 발생 지점의 현재 소스 코드를 찾아 범주화했습니다. 코드가 잘못된 것으로 보이는 경우, 프로젝트의 버그 트래커에 이슈를 생성했습니다. 이러한 이슈에 대한 응답 또한 이 조사에서 수집된 데이터의 일부입니다.

#### 결과 (Results)

잘못된 사용 목록을 포함하지 않기로 결정했습니다. 대신 결과를 일반적인 용어로 설명하겠지만, 발견된 문제 중 일부는 클라우드 보안 애플리케이션을 포함한 매우 인기 있는 라이브러리에서 나타났다는 점을 언급합니다.

조사된 프로젝트는 총 120,964,221 라인의 Python 코드를 포함했으며, 스크립트는 `finally` 블록 내에서 203개의 제어 흐름 명령어 인스턴스를 발견했습니다. 대부분은 `return`이었고, 소수는 `break`였으며, `continue`는 없었습니다. 이 중:

*   **46개**는 올바르게 사용되었으며, 이 패턴을 기능으로 삼는 테스트(예: 이를 감지하는 린터의 테스트)에 나타납니다.
*   **8개**는 올바르게 보일 수 있습니다. 즉, 의도적으로 예외를 삼키거나 활성 예외가 발생할 수 없는 곳에 나타납니다. 올바르더라도 이 나쁜 패턴을 피하도록 다시 작성하는 것은 어렵지 않으며, 코드를 더 명확하게 만들 것입니다. 즉, 의도적인 예외 삼킴은 `except BaseException:`으로 더 명시적으로 수행할 수 있으며, 예외를 삼키지 않는 `return`은 `finally` 블록 뒤로 이동할 수 있습니다.
*   **149개**는 명확하게 잘못되었고, 의도하지 않은 예외 삼킴으로 이어질 수 있습니다.

#### 오류 사례 (The Error Cases)

많은 오류 사례는 다음 패턴을 따랐습니다.

```python
try:
    ...
except SomeSpecificError:
    ...
except Exception:
    logger.log(...)
finally:
    return some_value
```

이러한 코드는 `Exception` 서브클래스를 의도적으로 로그하고 삼키는 동시에 `BaseException`을 조용히 삼키기 때문에 분명히 잘못되었습니다. 여기서 의도는 `BaseException`이 전파되도록 허용하거나 (작성자가 `BaseException` 문제를 모르는 경우), 모든 예외를 로그하고 삼키는 것입니다. 그러나 `except Exception`을 `except BaseException`으로 변경하더라도 이 코드는 여전히 `finally` 블록이 `except` 블록 내에서 발생한 모든 예외를 삼키는 문제를 가질 것이며, 이는 아마도 의도가 아닐 것입니다 (만약 의도된 것이라면 다른 `try-except BaseException`으로 명시적으로 만들 수 있습니다).

실제 코드에서 발견된 문제의 또 다른 변형은 다음과 같습니다.

```python
try:
    ...
except:
    return NotImplemented
finally:
    return some_value
```

여기서 의도는 예외가 발생했을 때 `NotImplemented`를 반환하는 것으로 보이지만, `finally` 블록의 `return`은 `except` 블록의 `return`을 재정의할 것입니다.

**참고:** 논의 후, PyPI 패키지의 무작위 샘플(일반 프로그래머가 작성한 코드를 분석하기 위해)에 대해 분석을 반복했습니다. 이 샘플은 총 77,398,892 라인의 코드를 포함했으며, `finally` 내의 `return`/`break`/`continue` 인스턴스는 316개였습니다. 즉, 100만 라인당 약 4개의 인스턴스입니다.

#### 작성자 반응 (Author reactions)

`finally` 절 내의 `return` 또는 `break`의 잘못된 인스턴스 149개 중 27개는 현재 라이브러리의 `main`/`master` 브랜치에 나타나지 않는, 즉 코드가 삭제되거나 수정된 구식 코드였습니다. 나머지 122개는 73개의 다른 패키지에 있었으며, 각 패키지에 문제를 알리기 위한 이슈를 생성했습니다. 2주 이내에 73개 이슈 중 40개가 코드 관리자로부터 반응을 받았습니다.

*   15개 이슈에서 문제 해결을 위한 PR(Pull Request)이 열렸습니다.
*   20개 이슈에서 문제 해결의 가치가 있음을 인정하는 반응을 받았습니다.
*   3개 이슈에서는 코드가 더 이상 유지 관리되지 않아 수정되지 않을 것이라고 답변했습니다.
*   2개 이슈는 "의도한 대로 작동한다"고 이슈를 닫았습니다. 한 곳은 모든 예외를 삼킬 의도라고 했지만, 다른 한 곳은 `Exception`과 `BaseException`의 구분을 인지하지 못하는 듯했습니다.

한 이슈는 Ctrl-C에 대한 무반응과 관련된 기존의 열린 이슈와 연결되었으며, 연관성을 추측했습니다.

두 이슈는 "good first issue"로 분류되었습니다.

#### 올바른 사용 사례 (The correct usages)

이 기능이 올바르게 사용된 것으로 보이는 8가지 경우(비-테스트 코드)도 주목할 가치가 있습니다. 이는 이 기능을 차단함으로써 발생할 "churn"을 나타냅니다. 왜냐하면 작동하는 코드가 변경되어야 하는 경우이기 때문입니다. 이 경우 작성자에게 연락하지 않았으므로, 이러한 변경을 하는 데 필요한 난이도를 스스로 평가해야 합니다. 전체 보고서에 따르면 각 경우에 필요한 변경은 작습니다.

#### 논의 (Discussion)

첫 번째로 주목할 점은 `finally` 블록 내의 `return`/`break`/`continue`가 자주 나타나는 현상이 아니라는 것입니다. 1억 2천만 라인 이상의 코드에서 203개의 인스턴스만 발견되었습니다. 이는 아마도 이에 대해 경고하는 린터 덕분일 것입니다.

두 번째 관찰은 대부분의 사용이 잘못되었다는 것입니다. 샘플에서 73% (203개 중 149개)가 잘못 사용되었습니다.

마지막으로, 작성자들의 반응은 압도적으로 긍정적이었습니다. 2주 이내에 받은 40개의 응답 중 35개가 문제를 인정했으며, 이 중 15개는 문제 해결을 위한 PR도 생성했습니다. 단 두 곳만이 코드가 현재 상태로 괜찮다고 생각했고, 세 곳은 코드가 더 이상 유지 관리되지 않으므로 살펴보지 않을 것이라고 언급했습니다.

코드가 의도한 대로 작동하는 것으로 보이는 8가지 인스턴스도 다시 작성하기 어렵지 않습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.