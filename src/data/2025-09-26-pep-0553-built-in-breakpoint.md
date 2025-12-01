---
title: "[Final] PEP 553 - Built-in breakpoint()"
excerpt: "Python Enhancement Proposal 553: 'Built-in breakpoint()'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/553/
toc: true
toc_sticky: true
date: 2025-09-26 23:38:53+0900
last_modified_at: 2025-09-26 23:38:53+0900
published: true
---
> **원문 링크:** [PEP 553 - Built-in breakpoint()](https://peps.python.org/pep-0553/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 05-Sep-2017

PEP 553 – 내장 함수 `breakpoint()`

## 개요
이 PEP는 호출 지점에서 Python 디버거를 실행하는 새로운 내장 함수 `breakpoint()`를 추가할 것을 제안합니다. 또한, 어떤 디버거를 사용할지 설정할 수 있도록 `sys` 모듈에 두 개의 새로운 이름이 추가됩니다.

## 도입 배경 (Rationale)
Python 표준 라이브러리에는 `pdb`라는 훌륭한 디버거가 오랫동안 존재했습니다. `pdb`를 사용하여 중단점(breakpoint)을 설정하는 일반적인 방법은 다음과 같습니다:

```python
foo()
import pdb; pdb.set_trace()
bar()
```

이 코드는 `foo()` 실행 후 `bar()` 실행 전에 디버거를 시작합니다. 그러나 이 방식에는 몇 가지 단점이 있습니다:

*   **긴 입력** : 27자나 되어 타이핑하기 번거롭습니다.
*   **오타 발생** : 세미콜론 누락, 점 대신 밑줄 입력 등 오타가 발생하기 쉽습니다.
*   **`pdb`에 종속적** : 디버깅 방식이 `pdb`에 직접적으로 연결됩니다. IDE나 다른 개발 환경을 사용할 경우 다른 디버깅 옵션이 있을 수 있습니다.
*   **린터(Linter) 불평** : `flake8`과 같은 Python 린터는 이 줄이 두 개의 문(statement)을 포함하고 있어 경고를 발생시킵니다. 이 구문을 두 줄로 나누면 정리할 때 실수를 할 가능성이 높아집니다 (예: 디버깅이 더 이상 필요 없을 때 한 줄을 삭제하는 것을 잊을 수 있습니다).

Python 개발자들은 선택할 수 있는 다른 디버거들도 많지만, 이들을 호출하는 방법을 기억하는 것은 어려울 수 있습니다. IDE가 중단점을 설정하는 사용자 인터페이스를 제공하더라도, 코드를 직접 편집하는 것이 더 편리할 수 있습니다. 디버거를 프로그래밍 방식으로 실행하는 API들은 일관성이 없어 정확히 무엇을 입력해야 할지 기억하기 어려울 수 있습니다.

이 PEP에서 제안하는 방식으로 디버거 진입을 위한 보편적인 API를 제공함으로써 이러한 모든 문제들을 해결할 수 있습니다.

## 제안 (Proposal)
JavaScript 언어는 `debugger` 문을 제공하여 해당 문이 나타나는 지점에서 디버거를 실행합니다.

이 PEP는 호출 지점에서 Python 디버거를 실행하는 `breakpoint()`라는 새로운 내장 함수를 제안합니다. 따라서 위의 예제는 다음과 같이 작성될 수 있습니다:

```python
foo()
breakpoint()
bar()
```

또한, 이 PEP는 `sys.breakpointhook()`과 `sys.__breakpointhook__`이라는 `sys` 모듈에 두 가지 새로운 이름 바인딩을 제안합니다. 기본적으로 `sys.breakpointhook()`은 `pdb.set_trace()`를 실제로 임포트하고 실행하는 역할을 하며, `breakpoint()`가 실행할 디버거를 변경하기 위해 다른 함수로 설정할 수 있습니다.

`sys.__breakpointhook__`은 `sys.breakpointhook()`과 동일한 함수로 초기화됩니다. 이를 통해 `sys.breakpointhook()`을 언제든지 기본값으로 쉽게 재설정할 수 있습니다 (예: `sys.breakpointhook = sys.__breakpointhook__`). 이는 기존 `sys.displayhook()` / `sys.__displayhook__` 및 `sys.excepthook()` / `sys.__excepthook__`이 작동하는 방식과 정확히 동일합니다.

내장 함수 `breakpoint()`의 시그니처는 `breakpoint(*args, **kws)`입니다. 위치 및 키워드 인수는 `sys.breakpointhook()`으로 직접 전달되며, 시그니처가 일치하지 않으면 `TypeError`가 발생합니다. `sys.breakpointhook()`의 반환 값은 `breakpoint()`로 다시 전달되어 반환됩니다.

이러한 설계는 기본 디버거가 추가적인 선택적 인수를 받을 수 있다는 관찰에 기반합니다. 예를 들어, IPython은 중단점에 진입할 때 출력될 문자열을 지정할 수 있으며, Python 3.7부터 `pdb` 모듈도 선택적 `header` 인수를 지원합니다.

## 환경 변수 (Environment variable)
`sys.breakpointhook()`의 기본 구현은 `PYTHONBREAKPOINT`라는 새로운 환경 변수를 참조합니다. 이 환경 변수는 다양한 값을 가질 수 있습니다:

*   `PYTHONBREAKPOINT=0`: 디버깅을 비활성화합니다. 이 값으로 설정하면 `sys.breakpointhook()`은 즉시 `None`을 반환합니다.
*   `PYTHONBREAKPOINT=` (즉, 빈 문자열): 환경 변수를 전혀 설정하지 않은 것과 동일하며, 이 경우 `pdb.set_trace()`가 평소처럼 실행됩니다.
*   `PYTHONBREAKPOINT=some.importable.callable`: 이 경우, `sys.breakpointhook()`은 `some.importable` 모듈을 임포트하고 해당 모듈에서 호출 가능한(callable) 객체를 가져와 호출합니다. 값이 점(.)이 없는 문자열일 경우, 내장된 호출 가능한 객체의 이름을 지정합니다 (예: `PYTHONBREAKPOINT=int`).

이 환경 변수를 통해 외부 프로세스가 중단점 처리를 제어할 수 있습니다. 몇 가지 사용 사례는 다음과 같습니다:

*   **배포 환경에서 모든 의도치 않은 `breakpoint()` 호출을 완전히 비활성화** : 실행 환경에서 `PYTHONBREAKPOINT=0`로 설정하여 달성할 수 있습니다. PEP 검토자들은 이 경우 `PYTHONBREAKPOINT=sys.exit`으로 설정하는 것을 제안하기도 했습니다.
*   **특정 디버거를 사용하는 IDE 통합** : IDE는 `PYTHONBREAKPOINT`를 자체 내부 디버깅 훅으로 설정하여 프로그램이 디버깅 환경에서 실행되도록 할 수 있습니다.

`PYTHONBREAKPOINT`는 `sys.breakpointhook()`이 호출될 때마다 다시 해석됩니다. 이를 통해 프로세스는 프로그램 실행 중에 값을 변경하고 `breakpoint()`가 이러한 변경에 반응하도록 할 수 있습니다. 디버거 진입은 정의상 실행을 중지시키므로 성능에 중요한 섹션으로 간주되지 않습니다. 따라서 프로그램은 다음과 같이 할 수 있습니다:

```python
os.environ['PYTHONBREAKPOINT'] = 'foo.bar.baz'
breakpoint() # foo.bar를 임포트하고 foo.bar.baz()를 호출합니다.
```

`sys.breakpointhook`을 오버라이딩하면 `PYTHONBREAKPOINT`의 기본 참조가 무효화됩니다. 오버라이딩하는 코드가 `PYTHONBREAKPOINT`를 참조할지 여부는 해당 코드에 달려 있습니다.

`PYTHONBREAKPOINT`에 지정된 호출 가능한 객체에 대한 접근이 어떤 식으로든 실패할 경우 (예: 임포트 실패 또는 해당 모듈에 호출 가능한 객체가 없을 경우), `RuntimeWarning`이 발생하고 중단점 함수는 호출되지 않습니다.

다른 모든 `PYTHON*` 환경 변수와 마찬가지로, 인터프리터가 `-E` 옵션으로 시작될 때는 `PYTHONBREAKPOINT`가 무시됩니다. 이는 기본 동작이 발생한다는 것을 의미합니다 (즉, `pdb.set_trace()`가 실행됩니다). `-E`가 적용될 때 `PYTHONBREAKPOINT=0`으로 다르게 처리할지에 대한 논의가 있었으나, 의견이 불일치하여 특별한 경우로 간주할 만큼 특별하지 않다고 결정되었습니다.

## 구현 (Implementation)
제안된 구현에 대한 Pull Request가 존재합니다. 실제 구현은 C로 되어 있지만, 이 기능에 대한 Python 유사 코드(pseudo-code)는 대략 다음과 같습니다:

```python
# 내장 함수에.
def breakpoint(*args, **kws):
    import sys
    missing = object()
    hook = getattr(sys, 'breakpointhook', missing)
    if hook is missing:
        raise RuntimeError('lost sys.breakpointhook')
    return hook(*args, **kws)

# sys 모듈에.
def breakpointhook(*args, **kws):
    import importlib, os, warnings
    hookname = os.getenv('PYTHONBREAKPOINT')
    if hookname is None or len(hookname) == 0:
        hookname = 'pdb.set_trace'
    elif hookname == '0':
        return None

    modname, dot, funcname = hookname.rpartition('.')
    if dot == '':
        modname = 'builtins'

    try:
        module = importlib.import_module(modname)
        hook = getattr(module, funcname)
    except:
        warnings.warn(
            'Ignoring unimportable $PYTHONBREAKPOINT: {}'.format(
                hookname), RuntimeWarning)
        return None
    return hook(*args, **kws)

__breakpointhook__ = breakpointhook
```

## 기각된 대안 (Rejected alternatives)

### 새로운 키워드 (A new keyword)
처음에 저자는 `break here`와 같은 새로운 키워드나 기존 키워드의 확장을 고려했습니다. 이는 여러 가지 이유로 기각되었습니다.

*   **`__future__` 필요** : 완전히 새로운 키워드는 거의 모든 새 키워드가 기존 코드와 충돌할 수 있으므로 활성화하려면 `__future__`를 필요로 합니다. 이는 디버거에 쉽게 진입할 수 있다는 장점을 상쇄합니다.
*   **키워드 확장 제한** : `break here`와 같은 확장된 키워드는 가독성은 좋고 `__future__`를 필요로 하지 않지만, 이 키워드 확장을 이 새로운 기능에 묶어두어 PEP 548에서 제안된 것과 같은 더 유용한 확장을 방해할 수 있습니다.
*   **구문 및 바이트코드 복잡성** : 새로운 키워드는 수정된 문법과 새로운 바이트코드를 필요로 할 가능성이 높습니다. 이는 각각 구현을 더 복잡하게 만듭니다.
*   **내장 함수의 이점** : 새로운 내장 함수는 기존 코드를 전혀 깨뜨리지 않으며 (기존 모듈 전역 변수가 내장 함수를 가릴 뿐이므로) 구현하기도 매우 쉽습니다.

### `sys.breakpoint()`
`sys.breakpoint()`는 왜 채택되지 않았을까요? 디버거를 호출하기 위해 `import`를 요구하는 것은 `sys`가 모든 모듈에 임포트되지 않기 때문에 명시적으로 기각되었습니다. 이는 단지 더 많은 타이핑을 요구하며 다음과 같은 문제를 야기합니다:

```python
import sys; sys.breakpoint()
```
이는 이 PEP가 해결하려는 여러 문제점들을 그대로 계승합니다.

## 버전 기록 (Version History)
*   **2019-10-13** : 유사 코드의 `except` 절에 누락된 `return None` 추가.
*   **2017-09-13** : `PYTHONBREAKPOINT` 환경 변수가 일등 시민(first class feature) 기능이 됨.
*   **2017-09-07** : `debug()`가 `breakpoint()`로 이름 변경. 시그니처가 `breakpoint(*args, **kws)`로 변경되어 `sys.breakpointhook()`으로 직접 전달됨.

> ⚠️ ** 알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.