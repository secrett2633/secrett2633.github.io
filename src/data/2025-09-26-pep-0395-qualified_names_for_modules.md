---
title: "[Withdrawn] PEP 395 - Qualified Names for Modules"
excerpt: "Python Enhancement Proposal 395: 'Qualified Names for Modules'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/395/
toc: true
toc_sticky: true
date: 2025-09-26 21:22:00+0900
last_modified_at: 2025-09-26 21:22:00+0900
published: true
---
> **원문 링크:** [PEP 395 - Qualified Names for Modules](https://peps.python.org/pep-0395/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 04-Mar-2011

PEP 395 – 모듈의 정규화된 이름 (Qualified Names for Modules)

## 개요

PEP 395는 Python의 임포트(import) 시스템, 객체 직렬화(serialization), 그리고 인트로스펙션(introspection)을 다룰 때 발생하는 오래된 문제점들을 해결하기 위한 새로운 메커니즘을 제안하는 문서입니다. 이 제안은 PEP 3155에서 정의된 "정규화된 이름(Qualified Name)" 개념을 기반으로 합니다.

**현재 상태:** 2013년 12월, 작성자에 의해 철회(Withdrawn)되었습니다. 이는 PEP가 작성된 이후 Python에 중요한 변화들이 있었고, 이로 인해 PEP 395의 여러 측면이 구식화되었기 때문입니다. 특히 PEP 420 (네임스페이스 패키지)은 패키지 감지와 관련된 일부 제안을 실현 불가능하게 만들었으며, PEP 451 (모듈 스펙)은 멀티프로세싱(multiprocessing) 문제를 해결하고 pickle 호환성 문제를 다룰 수 있는 방법을 제공했습니다.

## 다른 PEP들과의 관계

*   **PEP 420 (네임스페이스 패키지):** `__init__.py` 파일의 필수성 제거와 호환성을 위해 PEP 395에 상당한 변경이 필요하며, PEP 420은 Python 3.3에서 이미 구현 및 릴리스되었습니다.
*   **PEP 3155 (Qualified Name):** 이 PEP는 PEP 3155에서 도입된 "qualified name" 개념을 기반으로 하며, 임의의 함수와 클래스의 직렬화 시 발생하는 문제들을 해결하려는 목표를 공유합니다.
*   **PEP 366 (Explicit Relative Imports):** 주(main) 모듈에서 명시적 상대 임포트(explicit relative imports)가 특정 상황에서 올바르게 작동하도록 하는 초기 단계를 밟은 PEP 366을 기반으로 합니다.
*   **PEP 328 (Implicit Relative Imports):** 임포트된 모듈에서의 암시적 상대 임포트(implicit relative imports)를 제거했습니다. PEP 395는 `sys.path[0]`에 대한 현재 초기화 동작으로 인해 제공되는 주 모듈의 사실상의 암시적 상대 임포트도 제거할 것을 제안합니다.

## `__name__` 속성의 문제점

모듈의 `__name__` 속성은 시간이 지남에 따라 여러 가지 용도로 사용되어 왔습니다. 주요 사용 사례는 다음과 같습니다.
*   `if __name__ == "__main__":` 관례를 사용하여 프로그램의 주 모듈을 표시합니다.
*   상대 임포트의 시작점입니다.
*   실행 중인 애플리케이션 내에서 함수 및 클래스 정의의 위치를 식별합니다.
*   다른 인터프리터 인스턴스와 공유될 수 있는 pickle 객체로 직렬화하기 위한 클래스의 위치를 식별합니다.

이처럼 `__name__`의 의미가 과도하게 사용되고, `sys.path[0]` 초기화 시 역사적으로 관련된 동작들이 결합되어 사용자들이 쉽게 빠질 수 있는 여러 함정을 만들었습니다. 이러한 함정들은 특히 초보자에게는 매우 불명확하고 혼란스러운 동작을 유발하여 실질적으로 성가실 수 있습니다.

### 초보자를 위한 함정들 (Traps for the Unwary)

#### 1. 임포트 오류 (Why are my imports broken?)

`sys.path`를 수정할 때 적용되는 일반적인 원칙은 패키지 디렉터리를 `sys.path`에 직접 추가하지 않는 것입니다. 이 문제가 발생하는 이유는 해당 디렉터리의 모든 모듈이 이제 두 가지 다른 이름으로 접근 가능할 수 있기 때문입니다.
*   최상위 모듈(패키지 디렉터리가 `sys.path`에 있으므로)
*   패키지의 서브 모듈(패키지 자체를 포함하는 상위 디렉터리가 `sys.path`에 있는 경우)

이러한 문제는 특히 초보자가 패키지 내의 스크립트를 다양한 방식으로 실행하려 할 때 발생하며, 모호한 오류 메시지로 인해 디버깅이 어렵습니다. 예를 들어, `test_foo.py`가 패키지 안에 있을 때 `./test_foo.py`나 `python test_foo.py`로 실행하면 대부분의 경우 임포트 오류가 발생할 수 있습니다. PEP 366 구현 이후에는 `python -m package.tests.test_foo`와 같이 `-m` 스위치를 사용하는 방법은 제대로 작동하지만, 여전히 많은 실행 방법이 혼란을 야기합니다.

#### 2. 주 모듈 이중 임포트 (Importing the main module twice)

주 모듈이 실제 이름으로도 임포트될 때 발생하며, 동일한 모듈의 두 인스턴스가 다른 이름으로 생성됩니다. 만약 `__main__`에 저장된 상태가 프로그램의 올바른 작동에 중요하거나, 주 모듈에 비멱등(non-idempotent)적인 부작용을 일으키는 최상위 코드가 있다면, 이러한 중복은 모호하고 예상치 못한 오류를 유발할 수 있습니다.

#### 3. Pickle 문제 (In a bit of a pickle)

`pickle` 모듈은 임의의 클래스 인스턴스를 직렬화할 때 `__module__` 속성에 의존하는 경우가 있습니다. `__main__`에 정의된 클래스 인스턴스는 해당 방식으로 피클링(pickling)되며, 해당 모듈을 직접 실행하는 대신 임포트만 한 다른 Python 인스턴스에서는 올바르게 언피클링(unpickling)되지 않을 수 있습니다. 이는 객체 직렬화와 영속성을 사용하는 애플리케이션에서 `__main__` 모듈에 가능한 한 적은 코드를 두어야 한다는 조언의 근본적인 이유입니다.

#### 4. 소스 코드 위치 문제 (Where's the source?)

일부 고급 사용자는 `pickle` 모듈을 통해 구현 세부 정보가 유출되는 문제를 인식하고 `__name__`을 모듈의 공개 위치를 참조하도록 변경하여 해결하려고 합니다. 그러나 이 접근 방식은 함수와 클래스의 인트로스펙션(`__module__` 속성이 이제 잘못된 곳을 가리키므로)을 손상시키는 대가를 치르게 됩니다.

#### 5. Windows의 멀티프로세싱 (Forkless Windows)

`os.fork`가 없는 Windows에서 `multiprocessing` 모듈은 주 모듈을 다시 실행하려고 시도하지만, `if __name__ == "__main__":` 검사로 보호된 코드는 건너뜁니다. 하지만 주 모듈이 일반적인 직접 실행 스크립트나 최상위 모듈이 아닐 때 가정하는 바가 유효하지 않아 문제가 발생할 수 있습니다. 패키지 및 `-m` 스위치를 통해 실행되는 비최상위 모듈, 그리고 직접 실행되는 zipfile이나 디렉터리는 새 프로세스를 생성할 때 Windows에서 `multiprocessing`이 잘못된 동작을 하도록 만들 가능성이 있습니다.

## 모듈의 정규화된 이름 (`__qualname__`)

이러한 문제들을 해결하기 위해 새로운 모듈 레벨 속성인 `__qualname__`을 추가할 것을 제안합니다. 이 "정규화된 이름"의 약어는 PEP 3155에서 중첩된 클래스 또는 함수 정의의 최상위 모듈에 대한 이름 지정 경로를 저장하는 데 사용됩니다.

*   모듈의 경우, `__qualname__`은 일반적으로 `__name__`과 동일합니다.
*   하지만 `__name__`이 다른 목적으로 수정될 때(예: 주 모듈을 나타내기 위해), `__qualname__`은 변경되지 않은 상태로 유지되어 코드가 원래의 수정되지 않은 값에 접근할 수 있도록 합니다.
*   모듈 로더가 `__qualname__`을 직접 초기화하지 않으면, 임포트 시스템이 자동으로 추가합니다(`__name__`과 동일한 값으로 설정).

### 대안 이름들 (Alternative Names)

`__fullname__`과 `__implname__`도 고려되었지만, PEP 3155의 함수 및 클래스 사용 사례에 정확하지 않아 `__qualname__`이 채택되었습니다.

## 문제점 해결 (Eliminating the Traps)

다음 변경 사항들은 상호 연관되어 있으며, 함께 고려할 때 가장 의미가 있습니다. 이들은 위에 언급된 함정들을 완전히 제거하거나, 해결하기 위한 간단한 메커니즘을 제공합니다.

### 1. 패키지 내 주 모듈 임포트 수정 (Fixing main module imports inside packages)

이 문제를 제거하기 위해 `sys.path[0]`에 적절한 값을 결정할 때 추가적인 파일 시스템 검사를 수행할 것을 제안합니다. 이 검사는 Python의 명시적인 패키지 디렉터리 마커를 찾아 `sys.path`에 추가할 적절한 디렉터리를 사용합니다.

제안된 초기화 프로세스는 파일 시스템에 저장된 패키지 세부 정보를 고려하도록 수정됩니다.
*   `split_path_module()`이라는 지원 함수를 사용하여 파일 시스템 경로와 상대 모듈 이름을 기반으로 적절한 `sys.path` 항목과 정규화된 모듈 이름을 결정합니다.
*   이 `split_path_module()` 기능은 `runpy` 모듈을 통해 Python 사용자에게 직접 노출될 것을 제안합니다.

이 수정 사항이 적용되면, 패키지 내의 모듈도 다양한 명령줄 호출 방식으로 올바르게 실행될 수 있습니다. 예를 들어, `project/example/tests/` 디렉터리에서 `test_foo.py`를 `python -m package.tests.test_foo` 또는 `python -c "from .test_foo import main; main()"` 등으로 실행해도 올바르게 작동하게 됩니다.

### 2. 선택적 추가: 명령줄 상대 임포트 (Optional addition: command line relative imports)

위의 변경 사항이 적용되면, `-m` 스위치의 인수로 명시적 상대 임포트를 허용하는 것은 비교적 사소한 추가 사항이 될 것입니다.
예시:
```python
# 현재 작업 디렉토리: project/example/tests
python -m .test_foo
python -m ..tests.test_foo
```
이 추가 사항으로 `-m` 스위치의 시스템 초기화 방식이 변경됩니다.

### 3. 주 모듈 이중 임포트 수정 (Fixing dual imports of the main module)

주 모듈에서 `__qualname__`이 일관되게 올바르게 설정되도록 하는 위의 제안을 바탕으로, 주 모듈의 이중 임포트 문제를 제거하기 위한 간단한 변경 사항이 제안됩니다. 이는 `__main__`을 실제 이름으로 임포트하려는 시도를 감지하고 원래의 주 모듈을 반환하는 `sys.metapath` 훅을 추가하는 것입니다.

```python
class AliasImporter:
    def __init__(self, module, alias):
        self.module = module
        self.alias = alias
    # ... (find_module, load_module 메서드 구현)
```
이 `metapath` 훅은 임포트 시스템 초기화 중에 자동으로 추가됩니다.

### 4. 인트로스펙션을 손상시키지 않고 pickle 문제 수정 (Fixing pickling without breaking introspection)

이 문제를 해결하기 위해, `__name__`이 어떤 이유로든 수정되었을 때 모듈의 실제 위치를 결정하기 위해 새로운 모듈 레벨 `__qualname__` 속성을 사용할 것을 제안합니다.
*   주 모듈에서는 `__qualname__`이 인터프리터에 의해 주 모듈의 "실제" 이름으로 자동 설정됩니다.
*   공개 네임스페이스를 가리키도록 `__name__`을 조정하는 의사 모듈(pseudo-modules)은 `__qualname__`을 건드리지 않아 구현 위치가 인트로스펙션에 쉽게 접근 가능하도록 합니다.
*   여러 서브 모듈이 동일한 "공개" 네임스페이스를 사용하도록 설정될 수 있으므로, 함수와 클래스에는 해당 모듈의 `__qualname__`을 참조하는 새로운 `__qualmodule__` 속성이 부여됩니다.

이러한 변경 사항은 `__name__` (및 간접적으로 해당하는 함수 및 클래스 `__module__` 속성)을 조정하는 것이 네임스페이스를 패키지로 구현하는 공식적인 방법이 되며, API는 여전히 단일 모듈인 것처럼 노출됩니다. 모든 직렬화 코드는 기본적으로 구현 세부 정보를 노출하는 것을 피하게 됩니다.

### 5. Windows의 멀티프로세싱 수정 (Fixing multiprocessing on Windows)

`__qualname__`을 통해 `multiprocessing`이 주 모듈의 실제 이름을 알 수 있게 되면서, 자식 프로세스로 전달되는 직렬화된 정보에 단순히 이를 포함할 수 있게 되어 `__file__` 속성에 대한 현재의 의심스러운 인트로스펙션이 필요 없게 됩니다.

### 6. 명시적 상대 임포트 (Explicit relative imports)

이 PEP는 `__package__`가 주 모듈에서 `__qualname__.rpartition('.')[0]`으로 무조건 정의될 것을 제안합니다. 그 외에는 명시적 상대 임포트의 동작을 그대로 유지할 것을 제안합니다.

## 호환성 (Compatibility)

*   **PEP 382와의 호환성:** PEP 382 (네임스페이스 패키징)와 이 제안의 호환성은 `_is_package_dir()`의 의미만 변경하면 간단합니다.
*   **PEP 402와의 비호환성:** PEP 402는 Python 패키지에 대한 파일 시스템의 명시적 마커 제거를 제안합니다. 이는 파일 시스템 경로와 Python 모듈 이름을 가지고 Python 모듈 네임스페이스에 대한 명확한 매핑을 찾아낼 수 있다는 제안된 개념을 근본적으로 깨뜨립니다. 결과적으로, `sys.path[0]` 계산 문제를 해결하는 것이 불가능해집니다.

*   **패키지에 저장된 스크립트와의 잠재적 비호환성:** `sys.path[0]` 초기화에 대한 제안된 변경 사항은 일부 기존 코드를 깨뜨릴 수 있습니다. 특히 Python 3에서 올바르게 실행되기 위해 `__main__`의 암시적 상대 임포트에 의존하는 패키지 디렉터리에 저장된 스크립트가 영향을 받습니다. 이러한 스크립트들은 명시적 상대 임포트로 전환해야 다시 실행 가능한 스크립트이자 임포트 가능한 모듈로 작동하게 될 것입니다.

## 참고 구현 (Reference Implementation)

아직 없습니다.

## 참고 자료 (References)

*   Module aliases and/or “real names”
*   PEP 395 (Module aliasing) and the namespace PEPs
*   Updated PEP 395 (aka “Implicit Relative Imports Must Die!”)

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.