---
title: "[Final] PEP 366 - Main module explicit relative imports"
excerpt: "Python Enhancement Proposal 366: 'Main module explicit relative imports'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/366/
toc: true
toc_sticky: true
date: 2025-09-26 20:49:35+0900
last_modified_at: 2025-09-26 20:49:35+0900
published: true
---
> **원문 링크:** [PEP 366 - Main module explicit relative imports](https://peps.python.org/pep-0366/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 01-May-2007


# PEP 366 – 메인 모듈의 명시적 상대 경로 임포트

*   **작성자**: Alyssa Coghlan
*   **상태**: Final (최종)
*   **유형**: Standards Track (표준 트랙)
*   **생성일**: 2007년 5월 1일
*   **Python 버전**: 2.6, 3.0
*   **Post-History**: 2007년 5월 1일, 2007년 7월 4일, 2007년 7월 7일, 2007년 11월 23일

## 요약 (Abstract)

이 PEP는 패키지 내의 실행 가능한 모듈에서 명시적 상대 경로 임포트(explicit relative imports)를 사용할 수 있도록 하는 하위 호환성(backwards compatible) 메커니즘을 제안합니다. 현재 이러한 임포트는 PEP 328과 PEP 338 간의 어색한 상호작용으로 인해 실패합니다.

새로운 모듈 수준 속성(module level attribute)을 추가함으로써, 이 PEP는 모듈이 `-m` 스위치를 사용하여 실행될 경우 상대 경로 임포트가 자동으로 작동하도록 허용합니다. 모듈 자체에 약간의 보일러플레이트(boilerplate) 코드를 추가하면 파일이 이름으로 직접 실행될 때도 상대 경로 임포트가 작동하게 됩니다.

Guido는 2007년 11월에 이 PEP를 수락했습니다.

## 제안된 변경 (Proposed Change)

주요 제안 변경 사항은 새로운 모듈 수준 속성인 `__package__`의 도입입니다. 이 속성이 존재하면 상대 경로 임포트는 모듈의 `__name__` 속성 대신 이 `__package__` 속성을 기반으로 이루어집니다.

현재의 `__name__` 속성과 마찬가지로, `__package__` 설정은 모듈을 임포트하는 데 사용되는 PEP 302 로더(loader)의 책임입니다. `imp.new_module()`을 사용하여 모듈 객체를 생성하는 로더는 새 속성이 자동으로 `None`으로 설정됩니다. 임포트 시스템은 `__package__`가 설정되지 않은 (또는 `None`으로 설정된) 모듈에서 명시적 상대 경로 임포트를 만나면, 올바른 값을 계산하고 저장합니다. (일반 모듈의 경우 `__name__.rpartition('.')[0]`, 패키지 초기화 모듈의 경우 `__name__`). 만약 `__package__`가 이미 설정되어 있다면, 임포트 시스템은 `__name__` 및 `__path__` 속성에서 패키지 이름을 다시 계산하는 것보다 이 값을 우선적으로 사용합니다.

`runpy` 모듈은 이 새로운 속성을 명시적으로 설정하며, 모듈의 `__name__` 속성을 설정하는 데 사용된 이름이 아닌 실행할 모듈을 찾는 데 사용된 이름을 기반으로 합니다. 이를 통해 `-m` 스위치로 실행되는 `main` 모듈에서 상대 경로 임포트가 올바르게 작동할 수 있습니다.

`main` 모듈이 파일 이름으로 지정되면 `__package__` 속성은 `None`으로 설정됩니다. 모듈이 직접 실행될 때 상대 경로 임포트를 허용하려면, 첫 번째 상대 경로 임포트 문장 이전에 다음과 유사한 보일러플레이트 코드가 필요합니다.

```python
if __name__ == "__main__" and __package__ is None:
    __package__ = "expected.package.name"
```
이 보일러플레이트는 최상위 패키지(top level package)가 이미 `sys.path`를 통해 접근 가능한 경우에만 충분합니다. 최상위 패키지를 임포트할 수 없는 상태에서 직접 실행을 작동시키려면 `sys.path`를 조작하는 추가 코드가 필요합니다.

이 접근 방식은 형제 모듈(sibling modules)의 절대 경로 임포트(absolute imports) 사용과 동일한 단점을 가집니다. 즉, 스크립트가 다른 패키지나 서브패키지로 이동하면 보일러플레이트를 수동으로 업데이트해야 합니다. 하지만, 이 변경은 상대 경로 임포트의 수에 관계없이 파일당 한 번만 수행하면 된다는 장점이 있습니다.

`__package__`를 빈 문자열로 명시적으로 설정하는 것도 허용되며, 이 경우 해당 모듈에서 모든 상대 경로 임포트를 비활성화하는 효과가 있습니다 (임포트 메커니즘이 해당 모듈을 최상위 모듈로 간주하기 때문입니다). 이는 `runpy`와 같은 도구가 `__package__`를 설정할 때 최상위 모듈에 대한 특별한 처리(special case handling)를 제공할 필요가 없음을 의미합니다.

## 변경의 근거 (Rationale for Change)

`main` 모듈에서 명시적 상대 경로 임포트를 사용할 수 없는 현재의 상황은 적어도 하나의 공개된 SF 버그 리포트(#1510172)의 주제이며, `comp.lang.python`에서 발생한 몇몇 질문(예: Alan Isaac의 질문)에도 영향을 미쳤을 가능성이 높습니다.

이 PEP는 인터프리터 시작(interpreter startup) 또는 일반 모듈 임포트 시 상당한 비용을 발생시키지 않으면서, `main` 모듈에서 명시적 상대 경로 임포트를 허용하는 솔루션을 제공하는 것을 목표로 합니다.

PEP 338의 상대 경로 임포트 및 `main` 모듈에 대한 섹션은 이 문제에 대한 추가 세부 정보와 배경을 제공합니다.

## 참조 구현 (Reference Implementation)

SVN의 Rev 47142는 이 제안의 초기 변형을 구현했으며, `main` 모듈의 실제 모듈 이름을 `__module_name__` 속성에 저장했습니다. 당시 Python 2.5가 이미 베타 상태였기 때문에 되돌려졌습니다.

패치 1487이 이 PEP의 제안된 구현입니다.

## 대안 제안 (Alternative Proposals)

PEP 3122는 `main` 모듈이 식별되는 방식을 변경하여 이 문제를 해결할 것을 제안했습니다. 이는 전체적인 맥락에서 사소한 버그를 수정하기 위해 상당한 호환성 비용을 발생시키는 것이었으므로, 해당 PEP는 거부되었습니다.

이 PEP의 제안이 가지는 장점은 일반 코드에 미치는 유일한 영향이 모듈을 임포트할 때 추가 속성을 설정하는 데 필요한 적은 시간뿐이라는 것입니다. 상대 경로 임포트 자체는 패키지 이름이 모듈 전역(module globals)에 캐시되므로, 각 상대 경로 임포트마다 다시 계산할 필요가 없어 약간 빨라질 것입니다.

## 참고 자료 (References)

*   Absolute/relative import not working?
    (`https://github.com/python/cpython/issues/43535`)
*   c.l.p. question about modules and relative imports
    (`http://groups.google.com/group/comp.lang.python/browse_thread/thread/c44c769a72ca69fa/`)
*   Guido's rejection of PEP 3122
    (`https://mail.python.org/pipermail/python-3000/2007-April/006793.html`)
*   PEP 366 implementation patch
    (`https://github.com/python/cpython/issues/45828`)
*   Acceptance of the PEP
    (`https://mail.python.org/pipermail/python-dev/2007-November/075475.html`)

---
이 문서는 퍼블릭 도메인에 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.