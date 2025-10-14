---
title: "[Final] PEP 399 - Pure Python/C Accelerator Module Compatibility Requirements"
excerpt: "Python Enhancement Proposal 399: 'Pure Python/C Accelerator Module Compatibility Requirements'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/399/
toc: true
toc_sticky: true
date: 2025-09-26 21:24:25+0900
last_modified_at: 2025-09-26 21:24:25+0900
published: true
---
> **원문 링크:** [PEP 399 - Pure Python/C Accelerator Module Compatibility Requirements](https://peps.python.org/pep-0399/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 04-Apr-2011

## PEP 399 – 순수 Python/C 가속 모듈 호환성 요구사항 번역 및 정리

### 개요

이 문서는 Python Enhancement Proposal (PEP) 399의 내용을 한국어 사용자가 이해하기 쉽게 번역하고 정리한 것입니다. PEP 399는 CPython 표준 라이브러리에 포함된 순수 Python 및 C로 구현된 모듈들의 호환성 요구사항을 정의합니다.

**목표:** Python 개발자들이 이 PEP의 제안 내용, 도입 배경, 그리고 실제 Python 사용에 미치는 영향을 명확하게 이해할 수 있도록 돕는 것입니다.

---

### PEP 399: 순수 Python/C 가속 모듈 호환성 요구사항

*   **작성자:** Brett Cannon
*   **상태:** Final
*   **유형:** Informational
*   **생성일:** 2011년 4월 4일
*   **Python 버전:** 3.3

#### 요약 (Abstract)

CPython의 Python 표준 라이브러리에는 순수 Python과 C (전체 또는 부분적으로)로 구현된 다양한 모듈들이 존재합니다. 이 PEP는 이러한 경우 C 코드가 순수 Python 코드에 사용되는 테스트 스위트를 통과하여, 합리적으로 가능한 한 "드롭인 교체(drop-in replacement)"로 작동해야 한다고 요구합니다 (C 및 VM-특정 테스트는 면제). 또한, 순수 Python 구현이 없는 새로운 C 기반 모듈이 표준 라이브러리에 추가되려면 특별한 승인이 필요합니다.

#### 도입 배경 (Rationale)

Python은 CPython 가상 머신(VM)을 넘어 성장했습니다. IronPython, Jython, PyPy는 모두 현재 CPython VM의 실행 가능한 대안입니다. Python 프로그래밍 언어를 중심으로 생겨난 VM 생태계는 CPython이 사용될 수 없는 다양한 분야에서 Python이 활용되도록 이끌었습니다. 예를 들어, Jython은 Java 애플리케이션에서 Python을 사용할 수 있게 합니다.

CPython 외의 모든 VM이 직면하는 문제는 C로 (어느 정도) 구현된 표준 라이브러리 모듈을 처리하는 것입니다. 다른 VM은 일반적으로 CPython의 전체 C API를 지원하지 않기 때문에 모듈을 생성하는 데 사용된 코드를 활용할 수 없습니다. 이로 인해 다른 VM들은 종종 모듈을 순수 Python으로 재구현하거나, VM 자체를 구현하는 데 사용된 프로그래밍 언어(예: IronPython의 C#)로 재구현하게 됩니다.

CPython, PyPy, Jython, IronPython 간의 이러한 노력의 중복은 매우 불행한 일입니다. 최소한 순수 Python으로 모듈을 구현하면 이러한 중복 노력을 완화하는 데 도움이 될 것입니다.

이 PEP의 목적은 특별한 승인이 없는 한, Python의 표준 라이브러리에 추가되는 모든 새로운 모듈은 순수 Python 구현을 가져야 한다고 의무화함으로써 이러한 중복 노력을 최소화하는 것입니다. 이는 표준 라이브러리의 모듈이 CPython뿐만 아니라 모든 VM에서 사용 가능하도록 보장합니다 (이 요구사항을 충족하지 않는 기존 모듈은 면제되지만, 누군가 소급적으로 순수 Python 구현을 추가하는 것을 막지는 않습니다).

성능상의 이유로 모듈의 일부(또는 전체)를 C로 재구현하는 것(CPython의 경우)은 여전히 허용되지만, 이러한 가속 코드는 의미론을 검증하고 발산(divergence)을 방지하기 위해 동일한 테스트 스위트(VM 또는 C-특정 테스트 제외)를 통과해야 합니다. 이를 위해 가속 코드가 추가되기 전에 모듈의 테스트 스위트는 순수 Python 구현에 대한 포괄적인 커버리지를 가져야 합니다.

#### 세부 사항 (Details)

Python 3.3부터 표준 라이브러리에 추가되는 모든 모듈은 순수 Python 구현을 가져야 합니다. 이 규칙은 Python 개발팀이 해당 모듈에 대한 특별 면제를 부여하는 경우에만 무시될 수 있습니다. 일반적으로 면제는 모듈이 특정 C 기반 라이브러리(예: `sqlite3`)를 래핑하는 경우에만 부여됩니다. 면제를 부여할 때, 해당 모듈은 CPython 전용으로 간주되며, 다른 VM이 지원할 것으로 예상되는 Python 표준 라이브러리의 일부로 간주되지 않습니다. `ctypes`를 사용하여 C 라이브러리에 대한 API를 제공하는 것은 계속해서 지양됩니다. `ctypes`는 C 코드가 특정 오류(예: API 변경) 발생을 방지하기 위해 일반적으로 의존하는 컴파일러 보증이 부족하기 때문입니다.

이 PEP는 순수 Python 구현을 의무화하지만, 동반되는 가속 모듈의 사용을 배제하지는 않습니다. 가속 모듈이 제공되는 경우, 가속하는 모듈과 동일한 이름을 가지며 접두어로 밑줄(`_`)이 붙습니다. 예를 들어, `warnings` 모듈의 가속 모듈은 `_warnings`가 됩니다.

순수 Python 구현에서 가속 코드에 접근하는 일반적인 패턴은 `import *`를 사용하여 임포트하는 것입니다. 예를 들어, `from _warnings import *`와 같이 사용합니다. 이는 일반적으로 특정 Python 객체를 가속화된 동등물로 덮어쓰기 위해 모듈의 끝에서 수행됩니다. 이러한 종류의 임포트는 필요한 경우 모듈의 끝보다 먼저 수행될 수도 있습니다. 예를 들어, 가속화된 기본 클래스가 제공되지만 Python 코드에 의해 서브클래싱되는 경우입니다.

이 PEP는 순수 Python 구현이 없는 기존 표준 라이브러리 모듈에 이러한 모듈이 추가되어야 한다고 의무화하지 않습니다. 그러나 사람들이 순수 Python 동등물을 자발적으로 제공하고 유지보수하는 경우(예: PyPy 팀이 `csv` 모듈의 순수 Python 구현을 제공하고 유지보수하는 경우), 그러한 코드는 받아들여질 것입니다. 이러한 경우 C 버전이 예상되는 의미론(semantics) 측면에서 참조 구현(reference implementation)으로 간주됩니다.

새로운 가속 코드는 합리적으로 가능한 한 순수 Python 구현과 "드롭인 교체(drop-in replacement)"로 작동해야 합니다. 가속 코드를 제공하는 VM의 기술적 세부 사항은 필요에 따라 다를 수 있습니다. 예를 들어, C로 구현될 때 클래스가 타입(type)이 될 수 있습니다. Python 코드와 해당 C 코드가 가능한 한 유사하게 작동하는지 확인하기 위해, 두 코드 베이스는 순수 Python 코드에 적용되는 동일한 테스트를 사용하여 테스트되어야 합니다 (C 코드 또는 특정 VM에 대한 테스트는 이 요구사항에 해당하지 않습니다). 테스트 스위트는 예상되는 의미론을 검증하기 위해 광범위해야 합니다.

"드롭인 교체(drop-in replacement)"로 작동한다는 것은 순수 Python 코드에 존재하지 않는 공개 API가 가속 코드에 제공되지 않아야 함을 의미합니다. 이 요구사항이 없으면 사람들은 순수 Python 구현을 사용하는 다른 VM에는 제공되지 않는 가속 코드의 특정 세부 사항에 우연히 의존하게 될 수 있습니다. 의미론적 동등성(semantic equivalence) 계약이 충족되는지 확인하는 데 도움이 되도록, 모듈은 가속 코드 유무에 관계없이 가능한 한 철저하게 테스트되어야 합니다.

**테스트 예시:**

모듈의 순수 Python 버전과 C 가속 버전을 모두 실행하는 테스트를 작성하는 예시적인 관용구(idiom)는 다음과 같습니다.

```python
from test.support import import_fresh_module
import unittest

c_heapq = import_fresh_module('heapq', fresh=['_heapq'])
py_heapq = import_fresh_module('heapq', blocked=['_heapq'])

class ExampleTest:
    def test_example(self):
        self.assertTrue(hasattr(self.module, 'heapify'))

class PyExampleTest(ExampleTest, unittest.TestCase):
    module = py_heapq

@unittest.skipUnless(c_heapq, 'requires the C _heapq module')
class CExampleTest(ExampleTest, unittest.TestCase):
    module = c_heapq

if __name__ == '__main__':
    unittest.main()
```


이 테스트 모듈은 `self.module` 클래스 속성을 통해 `heapq` 모듈에 접근하는 테스트 메서드를 가진 기본 클래스(`ExampleTest`)를 정의합니다. 그리고 이 속성을 모듈의 Python 버전 또는 C 버전으로 설정하는 두 개의 서브클래스를 정의합니다. 두 서브클래스만 `unittest.TestCase`를 상속합니다. 이는 `ExampleTest` 클래스가 `unittest` 테스트 디스커버리에 의해 `TestCase` 서브클래스로 감지되는 것을 방지합니다. C 코드를 테스트하는 클래스에는 `skipUnless` 데코레이터를 추가하여 C 모듈을 사용할 수 없을 때 이 테스트들이 건너뛰어지도록 할 수 있습니다.

만약 이 테스트가 순수 Python 구현의 `heapq.heappop()`에 대한 광범위한 커버리지를 제공한다면, 가속화된 C 코드가 CPython의 표준 라이브러리에 추가될 수 있습니다. 그렇지 않다면, 가속화된 C 코드가 추가되기 전에 적절한 커버리지가 제공될 때까지 테스트 스위트가 업데이트되어야 합니다.

호환성을 돕기 위해, C 코드는 특정 타입에 대한 우발적인 의존성을 방지하기 위해 객체에 대한 추상 API를 사용해야 합니다. 예를 들어, 함수가 시퀀스를 허용한다면 C 코드는 `PyList_GetItem()`과 같은 것 대신 `PyObject_GetItem()`을 사용하는 것이 기본값이어야 합니다. `PyList_CheckExact()`가 적절하게 사용되는 경우 C 코드는 빠른 경로(fast path)를 가질 수 있지만, 그렇지 않은 경우 API는 특정 타입이 아닌 적절한 인터페이스로 덕 타이핑(duck type)되는 모든 객체와 함께 작동해야 합니다.

#### 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

---
**출처:** [https://peps.python.org/pep-0399/](https://peps.python.org/pep-0399/)

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.