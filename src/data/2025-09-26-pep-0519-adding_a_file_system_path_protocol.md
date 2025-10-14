---
title: "[Final] PEP 519 - Adding a file system path protocol"
excerpt: "Python Enhancement Proposal 519: 'Adding a file system path protocol'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/519/
toc: true
toc_sticky: true
date: 2025-09-26 23:13:13+0900
last_modified_at: 2025-09-26 23:13:13+0900
published: true
---
> **원문 링크:** [PEP 519 - Adding a file system path protocol](https://peps.python.org/pep-0519/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 11-May-2016

다음은 Python Enhancement Proposal (PEP) 519, "Adding a file system path protocol"의 내용 요약 및 번역입니다. 이 PEP는 파일 시스템 경로를 나타내는 객체들이 `str` 또는 `bytes` 표현을 제공할 수 있는 프로토콜을 제안하며, 기존 `str` 및 `bytes` 경로만 허용하던 Python 표준 라이브러리 API들이 이러한 경로 객체를 활용할 수 있도록 업데이트하는 것을 목표로 합니다.

---

# PEP 519 – 파일 시스템 경로 프로토콜 추가

## 요약 (Abstract)
이 PEP는 파일 시스템 경로를 나타내는 클래스들이 `str` 또는 `bytes` 표현을 제공할 수 있는 프로토콜을 제안합니다. 또한, 기존에는 `str` 및/또는 `bytes` 파일 시스템 경로만 허용했던 Python 표준 라이브러리의 변경 사항들을 제안하여, 경로 객체(path objects)의 사용을 용이하게 합니다. 목표는 사용자들이 풍부한 경로 객체로 전환하도록 돕는 동시에, `str` 또는 `bytes`를 기대하는 코드와 쉽게 작업할 수 있는 방법을 제공하는 것입니다.

## 도입 배경 (Rationale)
과거 Python에서 파일 시스템 경로는 주로 문자열(strings) 또는 바이트(bytes)로 표현되었습니다. 이는 C 언어에서 파일 시스템 경로를 `const char *`로 표현하는 방식에서 비롯된 것입니다. 이러한 방식은 사용할 수 있지만, 모든 `str` 또는 `bytes`가 유효한 파일 시스템 경로를 나타내는 것은 아니라는 문제가 있습니다. 예를 들어, 아무 문자열이나 경로처럼 동작하게 만들 수 있어 혼란을 야기할 수 있습니다.

Python 3.4에서는 PEP 428을 통해 `pathlib` 모듈이 도입되어 파일 시스템 경로를 더 풍부한 객체 표현으로 격상시키려 했습니다. 그러나 `pathlib`는 표준 라이브러리 내에서의 지원 부족으로 인해 채택률이 낮았습니다. `pathlib` 사용자는 경로 객체를 `str(path)`와 같이 수동으로 문자열로 변환해야 했으며, 이는 오류 발생 가능성이 높다고 여겨졌습니다.

`str()` 함수를 통한 변환의 문제는 거의 모든 Python 객체가 문자열 표현을 가지고 있어, 실제 경로가 아닌 객체도 `str()`을 통해 문자열로 변환될 수 있다는 점입니다(예: `str(None)`이 `builtins.open()`에 사용될 수 있음). 또한, `os.DirEntry` 객체는 `path` 속성을 통해 경로를 노출하는 반면, `pathlib` 객체는 직접적인 공통 인터페이스가 없어 불편함이 있었습니다. 이러한 문제들을 해결하기 위해, 모든 경로 표현 객체가 자신이 경로임을 명시하고, 낮은 수준의 표현(low-level representation)을 추출할 수 있는 공통 인터페이스, 즉 새로운 프로토콜이 필요하게 되었습니다.

## 제안 (Proposal)
이 PEP의 제안은 두 가지 부분으로 나뉩니다. 첫째는 객체가 파일 시스템 경로 표현을 선언하고 제공하기 위한 프로토콜 제안이고, 둘째는 이 새로운 프로토콜을 지원하기 위한 Python 표준 라이브러리의 변경 사항입니다. 이 변경 사항들은 `pathlib` 모듈의 임시(provisional) 상태를 해제하는 결과로 이어질 것입니다.

### 프로토콜 (Protocol)
파일 시스템 경로 객체로 간주될 객체는 다음 추상 기본 클래스(`abc.ABC`)로 정의된 프로토콜을 구현해야 합니다.

```python
import abc
import typing as t

class PathLike(abc.ABC):
    """파일 시스템 경로 프로토콜을 구현하기 위한 추상 기본 클래스."""
    @abc.abstractmethod
    def __fspath__(self) -> t.Union[str, bytes]:
        """객체의 파일 시스템 경로 표현을 반환합니다."""
        raise NotImplementedError
```
`__fspath__()` 메서드는 경로의 `str` 또는 `bytes` 표현을 반환해야 합니다. `str` 표현은 인간이 읽기 쉽고 역사적으로 경로를 표현하는 방식이었기 때문에 선호되는 낮은 수준의 경로 표현입니다.

### 표준 라이브러리 변경 (Standard library changes)
Python 표준 라이브러리에서 파일 시스템 경로를 허용하는 대부분의 API는 경로 객체를 수용하도록 업데이트될 예정입니다.

*   **`builtins`**:
    *   `open()` 함수는 경로 객체를 허용하도록 업데이트됩니다.

*   **`os`**:
    *   `os.fspath()` 함수가 추가됩니다. 이 함수는 `PathLike` 객체, `str`, `bytes`를 인자로 받아 `str` 또는 `bytes` 표현을 반환합니다. `str` 또는 `bytes`가 인자로 들어오면 그대로 반환하고, `__fspath__()`가 `str` 또는 `bytes`가 아닌 다른 것을 반환하면 `TypeError`를 발생시킵니다.
    ```python
    import typing as t
    def fspath(path: t.Union[PathLike, str, bytes]) -> t.Union[str, bytes]:
        # ... 구현 세부 사항 ...
        pass
    ```
    *   `os.fsencode()` 및 `os.fsdecode()` 함수는 경로 객체를 허용하도록 업데이트됩니다. 이 함수들은 `__fspath__()`를 호출하여 경로 객체를 `str` 또는 `bytes`로 변환한 다음, 기존의 인코딩/디코딩 작업을 수행합니다.
    *   `os.DirEntry` 객체는 `__fspath__()` 메서드를 가지게 되며, 이는 현재 `path` 속성과 동일한 값을 반환합니다.
    *   `PathLike` 추상 기본 클래스는 `os.PathLike`라는 이름으로 `os` 모듈에 추가됩니다.

*   **`os.path`**:
    *   `os.path`의 다양한 경로 조작 함수들은 경로 객체를 허용하도록 업데이트됩니다. 다형적인 함수(bytes와 strings를 모두 허용하는)의 경우, 단순히 `os.fspath()`를 사용하도록 업데이트됩니다.

*   **`pathlib`**:
    *   `pathlib.PurePath` 및 `pathlib.Path`의 생성자는 `PathLike` 객체를 허용하도록 업데이트됩니다. `bytes` 경로 표현은 계속해서 허용하지 않으므로, `__fspath__()`가 `bytes`를 반환하면 예외가 발생합니다.
    *   `path` 속성은 이 PEP에 의해 중복되므로 제거됩니다. (이 속성은 어떤 출시된 Python 버전에도 포함되지 않았으므로 하위 호환성 문제는 없습니다.)

### C API
C API는 `os.fspath()`와 동등한 `PyOS_FSPath()` 함수를 얻게 됩니다.

## 하위 호환성 (Backwards compatibility)
명시적인 하위 호환성 문제는 없습니다. 객체가 우연히 `__fspath__()` 메서드를 이미 정의하고 있지 않는 한, 기존 코드가 중단되거나 의미가 암묵적으로 변경될 것으로 예상할 이유가 없습니다.

Python 3.6 이전 버전에서 경로 객체를 지원하려는 라이브러리는 `if hasattr(path, "__fspath__") else path`와 같은 관용구를 사용하여 `path.__fspath__()`를 호출할 수 있습니다.

## 구현 (Implementation)
이 PEP에서 Python 3.6에 제안된 주요 변경 사항들은 다음과 같습니다 (대부분 완료됨):
*   `pathlib`에서 `path` 속성 제거
*   `pathlib`의 임시 상태 제거
*   `os.PathLike` 추가
*   `PyOS_FSPath()` 추가
*   `os.fspath()` 추가
*   `os.fsencode()` 및 `os.fsdecode()` 업데이트
*   `pathlib.PurePath` 및 `pathlib.Path` 업데이트 (`__fspath__()` 추가 및 생성자에 `os.PathLike` 지원 추가)
*   `DirEntry`에 `__fspath__()` 추가
*   `builtins.open()` 업데이트
*   `os.path` 업데이트
*   "path-like"에 대한 용어집 항목 추가
*   "What's New" 문서 업데이트

## 거부된 아이디어 (Rejected Ideas)
*   **프로토콜 메서드의 다른 이름:** `__path__`, `__pathname__`, `__fspathname__` 등이 제안되었으나, `__fspath__`가 불필요하게 길지 않으면서 모호하지 않다는 이유로 선택되었습니다.
*   **별도의 `str`/`bytes` 메서드:** `__fspath__()`가 `str`만 반환하고 `bytes`를 반환하는 `__fspathb__()`를 별도로 두자는 제안도 있었으나, `bytes` 반환이 드물고 `os` 모듈의 함수들이 더 나은 추상화를 제공한다고 판단되어 거부되었습니다.
*   **`__fspath__()`가 `str`만 반환:** `bytes`가 인코딩 정보가 부족하여 다루기 어렵다는 점과 PEP 383의 `surrogateescape`를 통해 모든 파일 시스템 경로를 `str`로 표현할 수 있다는 이유로 `str`만 반환하도록 하자는 논의가 있었습니다. 그러나 `bytes`를 통한 경로 표현이 완전히 사라지지 않을 것이며, `pathlib`와 같은 경로 객체를 사용하는 방향으로 유도하는 것이 더 바람직하다고 결론 내려졌습니다.
*   **`__fspath__`가 속성(attribute)으로:** 메서드가 아닌 속성으로 구현하자는 아이디어는 프로토콜이 주로 "매직 메서드"로 구현되어 왔고, 경로 객체의 낮은 수준 표현이 항상 미리 계산되어 있을 것이라는 보장이 없어 사용자에게 오해를 줄 수 있다는 이유로 거부되었습니다.
*   **`os.fspathb()` 제공:** `os.getcwd()` / `os.getcwdb()`와 같은 구조를 따르기 위해 `os.fspath()`가 `str`만 반환하고 `bytes`만 반환하는 `os.fspathb()`를 도입하자는 제안도 있었으나, 이 PEP가 파일 시스템의 데이터와 직접적으로 작업하지 않는다는 점을 고려하여 불필요하다고 판단되었습니다. `os.fsencode()`가 유사한 기능을 제공할 것입니다.

---
이 PEP는 Python이 파일 시스템 경로를 다루는 방식에 있어 중요한 전환점을 마련했습니다. `pathlib`와 같은 풍부한 경로 객체의 사용을 장려하고, 기존 `str`/`bytes` 기반 API와의 상호 운용성을 강화하여 Python 개발자들이 더욱 견고하고 유연한 파일 시스템 관련 코드를 작성할 수 있도록 돕습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.