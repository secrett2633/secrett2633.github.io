---
title: "[Deferred] PEP 499 - python-mfooshould also bind'foo'insys.modules"
excerpt: "Python Enhancement Proposal 499: 'python-mfooshould also bind'foo'insys.modules'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/499/
toc: true
toc_sticky: true
date: 2025-09-26 22:42:49+0900
last_modified_at: 2025-09-26 22:42:49+0900
published: true
---
> **원문 링크:** [PEP 499 - python-mfooshould also bind'foo'insys.modules](https://peps.python.org/pep-0499/)
>
> **상태:** Deferred | **유형:** Standards Track | **작성일:** 07-Aug-2015

PEP 499 – `python -m foo` 실행 시 `foo` 모듈도 `sys.modules`에 바인딩되어야 합니다.

## 개요

이 문서는 Python 개발자가 `python -m module.name` 형태로 모듈을 메인 프로그램으로 실행할 때 발생하는 문제를 해결하기 위한 제안입니다. 현재 방식으로는 프로그램 내에서 해당 모듈을 다시 임포트할 경우, 두 개의 독립적인 모듈 인스턴스가 생성되어 혼란스러운 버그로 이어질 수 있습니다.

## PEP 연기 (Deferral)

이 PEP의 구현은 Python 3.9 기능 동결 시점(2020년 4월)까지 준비되지 않을 것으로 예상되어, Python 3.10 버전으로 12개월 연기되었습니다.

## 초록 (Abstract)

`python -m module.name` 과 같이 모듈이 Python 명령줄에서 메인 프로그램으로 사용될 때, 프로그램 내에서 해당 모듈이 다시 임포트되면 우발적으로 두 개의 독립적인 모듈 인스턴스가 생성될 수 있습니다. 이 PEP는 이 문제를 해결하는 방법을 제안합니다.

현재, `python -m` 옵션을 통해 모듈이 호출되면 해당 모듈은 `sys.modules['__main__']`에 바인딩되고 `.__name__` 속성은 `'__main__'`으로 설정됩니다. 이는 많은 모듈 하단에 있는 표준 "메인 프로그램" 상용구 코드(예: `if __name__ == '__main__': sys.exit(main(sys.argv))`)를 가능하게 합니다.

그러나 위 명령줄 호출이 사용될 때, 모듈이 실제로는 공식 이름 `module.name`으로 임포트되었다고 자연스럽게 추론하게 됩니다. 따라서 프로그램이 해당 이름을 다시 임포트하면 동일한 모듈 인스턴스를 얻을 것이라고 예상합니다.

실제로는 모듈이 `__main__`으로만 임포트된 상태입니다. 다른 임포트는 별개의 모듈 인스턴스를 가져오게 되며, 이는 각 모듈에 하나씩, 두 개의 모듈 전역(global) 객체 인스턴스가 존재함으로 인해 혼란스러운 버그를 유발할 수 있습니다.

**문제 사례:**

*   **모듈 수준 데이터 구조 (module level data structures):** 캐시나 레지스트리(registries)와 같은 모듈 수준의 전역 변수가 두 인스턴스로 존재하여 메모리 낭비 또는 예기치 않은 동작을 유발할 수 있습니다. 예를 들어, `re` 모듈의 캐시처럼 두 개의 캐시가 존재하여 메모리 낭비로 이어질 수 있습니다. 공유 레지스트리(registry)의 경우, 한 레지스트리에 핸들러를 등록하고 다른 레지스트리를 통해 사용하려 할 때 문제가 발생할 수 있습니다.
*   **센티넬 (sentinels):** 모듈이 제공하는 센티넬 값에 대한 표준 테스트는 `is`를 사용한 동일성 비교입니다. 두 모듈 인스턴스가 있으면 두 개의 센티넬 인스턴스가 존재하며, `is`를 통해서는 그 중 하나만 인식될 수 있습니다.
*   **클래스 (classes):** 두 개의 모듈이 있으면 제공되는 모든 클래스에 대한 정의가 중복됩니다. `isinstance`, `issubclass`, `try`/`except` 구문과 같이 이러한 클래스와 서브클래스(subclasses)를 인식하는 데 의존하는 모든 작업은 참조 클래스(reference class)가 어디에서 얻어지고 비교 클래스(comparison class) 또는 인스턴스가 어디에서 얻어지는지에 따라 실패할 가능성이 높습니다.

## 제안 (Proposal)

이러한 상황을 해결하기 위해 `-m` 옵션의 구현 방식에 간단한 변경이 필요합니다. 모듈 객체를 `sys.modules['__main__']`에 바인딩하는 것 외에, `sys.modules['module.name']`에도 바인딩하는 것입니다.

Alyssa (Nick) Coghlan은 `runpy` 모듈의 `_run_module_as_main` 함수를 다음과 같이 수정하는 간단한 방법이 될 수 있다고 제안했습니다.

기존:
```python
main_globals = sys.modules["__main__"].__dict__
```

변경 후:
```python
main_module = sys.modules["__main__"]
sys.modules[mod_spec.name] = main_module
main_globals = main_module.__dict__
```

Joseph Jevnik은 패키지 모듈(`__init__.py`와 `__main__.py`를 포함하는)은 이미 이 제안과 매우 유사하게 동작하여 이중 임포트 문제가 발생하지 않는다고 지적했습니다. 따라서 이 PEP는 단순한 비패키지(non-package) 모듈에만 영향을 미칠 것을 제안합니다.

## 고려 사항 및 전제 조건 (Considerations and Prerequisites)

### 모듈 피클링 (Pickling Modules)

Alyssa는 PEP의 특정 제안을 다루는 Issue 19702를 언급했습니다. 이 이슈는 다음과 같은 내용을 포함합니다.

*   `runpy`는 `__main__`이 임포트 시스템을 통해 실행될 때, `__main__.__spec__`이 설정되어 있으면 `__spec__.name`으로 `sys.modules`에 별칭(alias)을 생성하도록 합니다.
*   `__main__.__spec__`이 설정되면, `pickle`은 `__name__` 대신 `__spec__.name`을 사용하여 `__main__`에 정의된 클래스, 함수, 메서드를 피클링합니다.
*   `multiprocessing`은 부모 프로세스에서 `__main__.__spec__`이 설정될 때 자식 프로세스에서 `__mp_main__` 생성을 건너뛰도록 적절하게 업데이트됩니다.

### 일반 모듈의 `__name__`이 더 이상 표준적이지 않음 (A Normal Module's __name__ Is No Longer Canonical)

Chris Angelico는 `__main__`이 이제 `module.name`에 존재하므로, `import module.name`을 나중에 호출하면 이미 존재하는 모듈을 찾게 되어 `__name__`이 `import`에 제공한 이름과 다른 모듈을 임포트하는 것이 가능해진다고 지적했습니다. 따라서 `__name__`은 일부 일반 임포트에서는 더 이상 표준적인(canonical) 이름이 아닙니다.

이에 대한 몇 가지 반론은 다음과 같습니다.

*   PEP 451부터 모듈의 표준 이름은 `__spec__.name`에 저장됩니다. `__name__`이 표준 이름이라는 것에 실제로 신경 쓰는 코드는 거의 없어야 하며, 관련이 있다면 이전 Python 버전에서는 `__name__`으로 폴백(fallback)하여 `__spec__.name`을 참조하도록 업데이트되어야 합니다. 이 PEP가 승인되지 않더라도 이는 사실입니다.
*   이 PEP가 승인되면 모듈의 표준 이름으로 인트로스펙션(introspect)하고 `__name__`을 통해 "이것이 메인 프로그램이었나?"를 추론하는 것이 가능해집니다. 이는 이전에는 불가능했습니다.

가장 분명한 반대 예시는 `__name__`이 `__main__`일 것으로 예상되는 표준 "내가 메인 프로그램인가?" 상용구입니다. 이 PEP는 해당 의미를 명시적으로 보존합니다.

## 참고 구현 (Reference Implementation)

BPO 36375는 이 PEP의 참고 구현에 대한 이슈 트래커 항목이며, 현재 초안 PR은 GitHub에서 확인할 수 있습니다.

## 미해결 질문 (Open Questions)

이 제안은 몇 가지 하위 호환성(backwards compatibility) 문제를 제기하며, 이들은 잘 이해되어야 하고, 폐기(deprecation) 프로세스가 설계되거나 명확한 포팅(porting) 가이드라인이 제공되어야 합니다.

### Pickle 호환성 (Pickle compatibility)

`pickle` 모듈에 변경 사항이 없으면, 이전에 올바른 모듈 이름(이중 임포트로 인해)으로 작성되던 피클이 대신 `__main__`을 모듈 이름으로 사용하여 작성되기 시작하여 다른 프로젝트에서 올바르게 로드되지 못할 수 있습니다.

확인해야 할 시나리오는 다음과 같습니다.
*   `python script.py` 작성, `python -m script` 읽기
*   `python -m script` 작성, `python script.py` 읽기
*   `python -m script` 작성, `python some_other_app.py` 읽기
*   `old_python -m script` 작성, `new_python -m script` 읽기
*   `new_python -m script` 작성, `old_python -m script` 읽기

### `__main__`을 특별 취급하는 프로젝트 (Projects that special-case __main__)

회귀 테스트 스위트(regression test suite)를 통과시키기 위해 현재 참고 구현은 `pdb`를 패치하여 자체 전역 네임스페이스(global namespace)를 파괴하는 것을 피해야 했습니다.

이는 일부 스크립트가 직접 실행과 임포트가 다른 네임스페이스를 제공하는 것에 의존하고 있을 수 있음을 시사합니다. (패키지 실행은 `__main__` 서브모듈을 `__main__` 네임스페이스에서 실행하는 동안 패키지 이름은 평소대로 `__init__` 파일을 참조하여 두 네임스페이스를 분리된 상태로 유지합니다.)

## 배경 (Background)

저자는 메인 프로그램 모듈인 명명된 모듈을 몽키 패치(monkey patch)하려던 모듈을 통해 메인 프로그램을 디버깅하는 동안 이 문제에 부딪혔습니다. 당연히 몽키 패치는 효과가 없었습니다. 왜냐하면 이름을 통해 메인 모듈을 임포트했기 때문에 실행 중인 모듈 인스턴스가 아닌 두 번째 모듈 인스턴스를 패치했기 때문입니다.

그러나 이 문제는 `-m` 명령줄 옵션이 존재하는 한 계속되어 왔으며, 드물게라도 다른 사람들에 의해 정기적으로 발생하고 있습니다.

Issue 19702 외에도 `__main__` 주변의 불일치는 PEP 451에서 언급되었으며, PEP 395의 "메인 모듈의 이중 임포트 수정(Fixing dual imports of the main module)" 섹션에는 유사한 제안(PEP 451보다 앞선)이 설명되어 있습니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.