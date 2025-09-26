---
title: "[Deferred] PEP 547 - Running extension modules using the -m option"
excerpt: "Python Enhancement Proposal 547: 'Running extension modules using the -m option'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/547/
toc: true
toc_sticky: true
date: 2025-09-26 23:34:23+0900
last_modified_at: 2025-09-26 23:34:23+0900
published: true
---
> **원문 링크:** [PEP 547 - Running extension modules using the -m option](https://peps.python.org/pep-0547/)
>
> **상태:** Deferred | **유형:** Standards Track | **작성일:** 25-May-2017

## PEP 547 – `-m` 옵션을 사용하여 확장 모듈 실행

**저자:** Marcel Plch, Petr Viktorin
**상태:** 연기됨 (Deferred)
**유형:** 표준 트랙 (Standards Track)
**생성일:** 2017년 5월 25일
**Python 버전:** 3.7

### 연기 알림 (Deferral Notice)
이 PEP의 가장 중요한 활용 사례이자 유일하게 명시된 사례인 Cython은 아직 다단계 초기화(multi-phase initialization)를 지원할 준비가 되지 않았습니다. Cython은 C 수준의 정적 변수에 전역 상태를 유지합니다. 이 PEP는 상황이 바뀔 때까지 연기됩니다.

### 개요 (Abstract)
이 PEP는 PEP 489의 다단계 초기화(multi-phase initialization)를 사용하여 내장(built-in) 및 확장(extension) 모듈을 `__main__` 네임스페이스에서 실행할 수 있도록 하는 구현을 제안합니다. 이를 통해 다단계 초기화를 지원하는 모듈은 다음 명령을 사용하여 실행할 수 있습니다: `python3 -m _testmultiphase`.

### 동기 (Motivation)
현재 확장 모듈은 Python 소스 모듈의 모든 기능을 지원하지 않습니다. 특히, Python의 `-m` 옵션을 사용하여 확장 모듈을 스크립트처럼 실행하는 것은 불가능합니다. 이 기능을 가능하게 하는 기술적 기반은 PEP 489를 위해 마련되었으며, `-m` 옵션 활성화는 해당 PEP의 "향후 가능한 확장(Possible Future Extensions)" 섹션에 언급되어 있습니다. 제안된 추가 변경 사항은 기술적으로 비교적 적습니다.

### 근거 (Rationale)
확장 모듈이 `-m` 옵션을 지원하지 않는 문제는 전통적으로 Python 래퍼(wrapper)를 제공하는 방식으로 해결되었습니다. 예를 들어, `_pickle` 모듈의 커맨드 라인 인터페이스는 순수 Python `pickle` 모듈(순수 Python 재구현과 함께)에 있습니다. 이 방식은 C API를 사용하여 커맨드 라인 인터페이스를 구축하는 것이 번거롭기 때문에 표준 라이브러리 모듈에 잘 작동합니다. 그러나 다른 사용자들은 실행 가능한 확장 모듈을 직접 만들기를 원할 수 있습니다.

중요한 사용 사례는 C 확장 모듈로 컴파일되는 Python과 유사한 언어인 Cython입니다. Cython은 Python의 (거의) 상위 집합(superset)으로, Cython으로 Python 모듈을 컴파일해도 일반적으로 모듈의 기능이 변경되지 않으며, Cython 특정 기능을 점진적으로 추가할 수 있습니다. 이 PEP는 Cython 확장 모듈이 `-m` 옵션을 사용하여 실행될 때 Python counterparts와 동일하게 동작하도록 허용할 것입니다.

### 배경 (Background)
Python의 `-m` 옵션은 `runpy._run_module_as_main` 함수에 의해 처리됩니다. `-m`으로 지정된 모듈은 일반적으로 import되지 않습니다. 대신, 인터프리터 초기화 초기에 생성되는 `__main__` 모듈의 네임스페이스에서 실행됩니다.

Python 소스 모듈의 경우, 다른 모듈의 네임스페이스에서 실행하는 것은 문제가 되지 않습니다. 코드는 기존 모듈의 `__dict__`로 `locals`와 `globals`가 설정된 상태로 실행됩니다. 하지만 확장 모듈은 그렇지 않습니다. 확장 모듈의 `PyInit_*` 진입점은 전통적으로 `PyModule_Create`를 사용하여 새 모듈 객체를 생성하고 초기화했습니다.

Python 3.5부터 확장 모듈은 PEP 489의 다단계 초기화를 사용할 수 있습니다. 이 시나리오에서 `PyInit_*` 진입점은 모듈이 생성되고 초기화되는 방식을 설명하는 `PyModuleDef` 구조체를 반환합니다. 확장 모듈은 `Py_mod_create` 콜백을 사용하여 모듈 객체 생성을 사용자 정의하거나, `Py_mod_create`를 지정하지 않아 일반 모듈 객체를 사용할 수 있습니다. 그런 다음 `Py_mod_exec`라는 다른 콜백이 호출되어 메서드와 클래스로 모듈 객체를 채우는 방식으로 모듈 객체를 초기화합니다.

### 제안 (Proposal)
다단계 초기화는 확장 모듈을 다른 모듈의 네임스페이스에서 실행하는 것을 가능하게 합니다. 만약 `Py_mod_create` 콜백이 지정되지 않았다면, `__main__` 모듈은 새로 생성된 모듈 객체인 것처럼 `Py_mod_exec` 콜백에 전달되어 초기화될 수 있습니다.

이 방식의 한 가지 복잡한 점은 C 수준의 모듈 상태(C-level module state)입니다. 각 모듈에는 확장 모듈이 생성될 때 할당된 메모리 영역을 가리키는 `md_state` 포인터가 있습니다. `PyModuleDef`는 할당될 메모리의 양을 지정합니다.

구현은 `md_state` 메모리가 최대 한 번만 할당되도록 주의해야 합니다. 또한, `Py_mod_exec` 콜백은 모듈당 한 번만 호출되어야 합니다. `md_state` 포인터 자체가 가드 역할을 할 것입니다. 메모리 할당 및 `Py_mod_exec` 호출은 항상 함께 이루어지며, `md_state`가 이미 `NULL`이 아닌 경우 확장 모듈 초기화는 실패합니다.

`__main__` 모듈은 확장 모듈로 생성되지 않으므로, `md_state`는 일반적으로 `NULL`입니다. `__main__`의 컨텍스트에서 확장 모듈을 초기화하기 전에, 해당 모듈의 `PyModuleDef`에 따라 모듈 상태가 할당될 것입니다.

PEP 489는 이러한 변경 사항을 일반적으로 가능하게 하도록 설계되었지만, 확장 모듈의 모듈 발견, 생성 및 초기화 단계를 분리하여 새로 초기화된 모듈 대신 다른 모듈을 사용할 수 있도록 해야 합니다. 또한, 이 기능은 `runpy` 및 `importlib`에 추가되어야 합니다.

### 상세 규격 (Specification)
`importlib` 로더(loader)를 위한 새로운 선택적 메서드가 추가될 것입니다. 이 메서드는 `exec_in_module`이라고 불리며, 두 개의 위치 인수(positional arguments): 모듈 스펙(module spec)과 이미 존재하는 모듈을 받습니다. `__spec__` 또는 `__name__`과 같이 모듈에 이미 설정된 import 관련 속성은 무시됩니다.

`runpy._run_module_as_main` 함수는 이 새로운 로더 메서드를 찾을 것입니다. 이 메서드가 존재하면 `runpy`는 모듈의 Python 코드를 로드하고 실행하려고 시도하는 대신 이 메서드를 실행합니다. 그렇지 않으면 `runpy`는 이전과 같이 작동합니다.

#### ExtensionFileLoader 변경 사항 (ExtensionFileLoader Changes)
`importlib`의 `ExtensionFileLoader`는 새로운 함수인 `_imp.exec_in_module`을 호출하는 `exec_in_module` 구현을 얻게 될 것입니다.

`_imp.exec_in_module`은 기존 메커니즘을 사용하여 확장 모듈의 `PyInit_*` 함수를 찾아 호출할 것입니다.

`PyInit_*` 함수는 완전히 초기화된 모듈(단일 단계 초기화) 또는 `PyModuleDef`(PEP 489 다단계 초기화용)를 반환할 수 있습니다.

단일 단계 초기화의 경우, `_imp.exec_in_module`은 `ImportError`를 발생시킬 것입니다.

다단계 초기화의 경우, `PyModuleDef`와 초기화될 모듈은 새로운 함수인 `PyModule_ExecInModule`에 전달될 것입니다.

이 함수는 `PyModuleDef`가 `Py_mod_create` 슬롯을 지정하거나 모듈이 이미 초기화된 경우(즉, `md_state` 포인터가 `NULL`이 아닌 경우) `ImportError`를 발생시킬 것입니다. 그렇지 않으면, 이 함수는 `PyModuleDef`에 따라 모듈을 초기화할 것입니다.

### 하위 호환성 (Backwards Compatibility)
이 PEP는 하위 호환성을 유지합니다. 이 제안은 이전에 `__main__`으로 모듈을 실행하는 것을 지원하지 않았던 로더에 대해 새로운 함수와 새로운 로더 메서드만 추가합니다.

### 참고 구현 (Reference Implementation)
이 PEP의 참고 구현은 GitHub에서 확인할 수 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.