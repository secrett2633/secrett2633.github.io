---
title: "[Withdrawn] PEP 727 - Documentation in Annotated Metadata"
excerpt: "Python Enhancement Proposal 727: 'Documentation in Annotated Metadata'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/727/
toc: true
toc_sticky: true
date: 2025-09-27 13:19:38+0900
last_modified_at: 2025-09-27 13:19:38+0900
published: true
---
> **원문 링크:** [PEP 727 - Documentation in Annotated Metadata](https://peps.python.org/pep-0727/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 28-Aug-2023

PEP 727은 `Annotated` 메타데이터에 문서화를 추가하는 방법을 표준화하려는 제안이었으나, 현재는 **철회된(Withdrawn)** 상태입니다. 이 문서는 `Annotated`를 사용하여 파이썬 심볼에 대한 문서화 문자열을 제공하는 표준화된 방법을 제안했으며, 이를 위해 `typing.Doc`이라는 새로운 클래스를 도입하려 했습니다.

---

## PEP 727 – Annotated 메타데이터에 문서화 (Documentation in Annotated Metadata)

*   **작성자**: Sebastián Ramírez
*   **상태**: **철회됨 (Withdrawn)**
*   **유형**: Standards Track (표준화 트랙)
*   **주제**: Typing
*   **생성일**: 2023년 8월 28일
*   **Python 버전**: 3.13

### 요약 (Abstract)

이 PEP는 새로운 클래스 `typing.Doc`을 사용하여 `Annotated`로 정의된 파이썬 심볼에 대한 문서화 문자열을 제공하는 표준화된 방법을 제안했습니다.

### PEP 철회 (PEP Withdrawal)

이 PEP에 대한 반응은 대부분 부정적이었으며, 특히 **장황함(verbosity)**과 **가독성(readability)**에 대한 우려가 제기되었습니다. 그 결과, 이 PEP는 철회되었습니다.

### 동기 (Motivation)

클래스, 함수, 클래스 메서드 및 모듈에 대한 문서화를 제공하는 방법으로는 이미 잘 정의된 `docstring`이 존재합니다. 그러나 매개변수, 반환 값, 클래스 범위 변수(클래스 변수 및 인스턴스 변수), 지역 변수, 타입 별칭과 같은 다른 유형의 심볼에 대한 문서화 문자열을 제공하는 공식적인 표준은 현재 없습니다.

이러한 심볼을 문서화하기 위해 Sphinx, numpydoc, Google, Keras 등과 같은 여러 마이크로 구문(microsyntax) 규칙이 `docstring` 내부에 만들어져 현재 널리 사용되고 있습니다.

하지만 이러한 기존 방식에는 몇 가지 문제가 있었습니다.

*   **도구 지원의 한계**: `docstring` 내부의 마이크로 구문은 편집기에서 자동 완성, 잘못된 구문에 대한 인라인 오류 등 편집 지원을 쉽게 제공하기 어렵습니다.
*   **정보 중복 및 불일치**: 매개변수 이름과 같이 정보가 코드의 여러 곳에 중복되어, 리팩토링 시 문서가 누락되거나 불일치가 발생하기 쉽습니다.
*   **런타임 접근의 어려움**: 라이브러리와 도구가 특정 `docstring` 컨벤션 파서에 의존하지 않고 개별 매개변수나 변수에 대한 문서를 런타임에 얻는 직접적인 방법이 없습니다.
*   **타입 정보 중복**: 이전 파이썬 버전에서는 `docstring`에 타입 정보를 포함하는 경우가 있었지만, 이제 타입 어노테이션(type annotations)이 공식적으로 지원되므로 `docstring`에 더 이상 이러한 정보가 필요하지 않습니다.

### 근거 (Rationale)

이 제안은 이러한 단점을 해결하기 위해 `docstring`의 정보를 확장하고 보완하며, 기존 `docstring`과의 하위 호환성을 유지하려고 했습니다. 이는 `Annotated`와 `typing` 모듈의 새로운 `Doc` 클래스를 통해 파이썬 언어 및 구조를 활용하는 방식으로 이루어졌습니다.

이 기능이 외부 패키지가 아닌 파이썬 표준 라이브러리에 포함되어야 하는 이유는, 구현 자체는 간단하지만, 라이브러리 작성자가 이를 쉽게 사용하고 `Annotated`를 사용하여 파이썬 심볼을 문서화하는 기본 방법을 제공하기 위해 **표준**이 되는 것이 중요하다고 보았기 때문입니다. 적어도 VS Code와 PyCharm 같은 일부 도구 제공업체는 이것이 표준이 될 경우에만 지원을 고려하겠다고 밝혔습니다.

이 제안은 기존 `docstring` 사용을 대체하는 것이 아니라 보완하는 역할을 합니다. `docstring`은 모듈, 클래스, 함수에 대한 일반적인 산문(prose) 형태의 문서화에 여전히 선호되는 방법으로 간주됩니다. 이 제안은 `Annotated`로 선언될 수 있는 심볼(예: 타입 별칭, 매개변수 등)에 특화된 문서화를 다룹니다.

### 주요 기능 요약 (Summary of Features)

이 제안은 기존 컨벤션과 비교하여 다음과 같은 이점을 제공하려 했습니다.

*   **편집기 지원**: 파이썬 문법을 지원하는 모든 편집기에서 기본적으로 문법 오류, 문법 강조 등을 포함한 편집이 완벽하게 지원됩니다.
*   **쉬운 렌더링**: 정적 도구(런타임 실행이 필요 없는 도구)가 정보를 추출하기 쉬워 렌더링 구현이 간단합니다.
*   **정보 중복 제거**: 매개변수 이름이 한 곳에서만 정의되어 `docstring` 내에서의 중복이 제거됩니다.
*   **일관성 유지**: 매개변수나 클래스 변수를 제거할 때 문서화를 잊어버리거나, 새 매개변수를 추가할 때 문서를 누락하는 등의 불일치 가능성이 줄어듭니다.
*   **런타임 접근**: 기존 (이전) 파이썬 버전에서도 각 심볼에 대한 문서 문자열에 런타임 접근이 가능합니다.
*   **표준화된 방법**: `Annotated`를 사용할 수 있는 타입 별칭과 같은 다른 심볼을 문서화하는 더욱 공식화된 방법을 제공합니다.
*   **쉬운 학습**: 새로운 마이크로 구문을 배울 필요 없이 파이썬 문법 자체를 사용합니다.
*   **매개변수 문서 상속**: `ParamSpec`에 의해 캡처된 함수의 매개변수 문서 상속을 지원합니다.

### 명세 (Specification)

주요 제안은 `typing.Doc`이라는 새로운 클래스를 도입하는 것이었습니다. 이 클래스는 `Annotated` 어노테이션 내부에서만 사용되어야 하며, 단일 위치 전용(positional-only) 문자열 인수를 받습니다. 이는 `Annotated`를 사용하여 선언된 심볼의 의도된 의미와 사용법을 문서화하는 데 사용됩니다.

**예시**:

```python
from typing import Annotated, Doc

class User:
    name: Annotated[str, Doc("The user's name")]
    age: Annotated[int, Doc("The user's age")]
    ...

from typing import Annotated, Doc, TypeAlias
from external_library import UserResolver

CurrentUser: TypeAlias = Annotated[str, Doc("The current system user"), UserResolver()]

def create_user(name: Annotated[str, Doc("The user's name")]):
    ...

def delete_user(name: Annotated[str, Doc("The user to delete")]):
    ...
```
`get_type_hints(..., include_extras=True)`를 통해 런타임에 문서화 정보를 추출할 수 있도록 설계되었습니다. `typing.Doc` 인스턴스는 `documentation`이라는 속성을 통해 문자열을 가집니다.

### 하위 호환성 (Backwards Compatibility)

이 제안은 기존 코드와 완벽하게 하위 호환되며, 기존 `docstring` 컨벤션의 사용을 비권장하지 않습니다. 표준 라이브러리에 포함되기 전에 채택하거나 이전 파이썬 버전을 지원하려는 개발자는 `typing_extensions`에서 `Doc`을 임포트하여 사용할 수 있습니다.

**예시 (typing_extensions 사용)**:

```python
from typing import Annotated
from typing_extensions import Doc

class User:
    name: Annotated[str, Doc("The user's name")]
    age: Annotated[int, Doc("The user's age")]
    ...
```

### 보안 영향 (Security Implications)

알려진 보안 영향은 없습니다.

### 교육 방법 (How to Teach This)

산문 정보(prose information)를 위한 주된 문서화 메커니즘은 모듈, 클래스, 함수 및 메서드에 대한 표준 `docstring`으로 계속되어야 합니다. 이 제안을 채택하여 더 세분화된 문서를 추가하려는 작성자는 지원되는 심볼에 대해 `Annotated` 어노테이션 내부에 `typing.Doc`을 사용할 수 있습니다.

### 다른 언어 조사 (Survey of Other Languages)

다른 언어들은 Javadoc (Java, JavaScript, TypeScript), Doc comments (Rust, Go)와 같이 함수 정의 상단에 특수 형식의 주석이나 마이크로 구문을 사용하여 심볼을 문서화합니다. 이는 파이썬의 현재 `docstring` 마이크로 구문 컨벤션과 유사합니다.

### 철회된 아이디어 (Rejected Ideas)

이 제안을 개발하는 과정에서 여러 대안이 논의되었고 철회되었습니다.

*   **현재 docstring 표준화**: 기존 `docstring` 형식 중 하나를 표준화하는 것은 마이크로 구문 사용으로 인한 문제(편집기 지원 부족, 불일치 등)를 해결하지 못한다고 보았습니다.
*   **Annotated 내부의 일반 문자열**: `Annotated[str, "The user's name"]`와 같이 일반 문자열을 사용하는 것은 `Annotated` 내부에 일반 문자열에 대한 미리 정의된 의미를 부여하게 되어, 다른 목적으로 일반 문자열을 사용하던 기존의 유효한 `Annotated` 사용을 무효화할 수 있습니다. 명시적인 `typing.Doc` 클래스를 사용하는 것이 기존 `Annotated` 사용과의 호환성을 높입니다.
*   **Doc 클래스와 유사한 새로운 Annotated-Like 타입**: `Doc[str, "The user's name"]`와 같이 `Annotated`와 유사한 새로운 타입을 정의하는 것은 해당 사용 사례만 지원하고 다른 메타데이터(예: FastAPI 메타데이터, Pydantic 필드)와 결합하기 어렵게 만들 수 있다는 이유로 거부되었습니다.

### 미해결 문제 (Open Issues) (철회에 기여한 우려사항)

PEP 철회로 이어진 주요 우려사항들은 다음과 같습니다.

*   **장황함 (Verbosity)**:
    *   이 제안에 대한 주요 반대 의견은 코드의 장황함이 증가한다는 것이었습니다.
    *   `docstring`의 일부 내용을 시그니처로 옮기는 것이므로 전체적인 장황함은 비슷할 수 있지만, 시그니처만 놓고 보면 현재보다 훨씬 길어질 수 있다는 우려가 있었습니다.
    *   이 장황함은 `typing.Doc`을 사용하는 라이브러리 유지보수자들에게 주로 영향을 미치며, 최종 사용자에게는 편집기의 툴팁 등을 통해 간접적으로만 전달될 것이라고 보았습니다.
    *   이는 타입 어노테이션 도입 시의 장황함 증가 논쟁과 유사하며, 이 기능 역시 선택 사항(opt-in)으로 제안되었습니다.

*   **문서화는 타입힌팅이 아니다 (Documentation is not Typing)**:
    *   문서화가 실제로 타입힌팅의 일부가 아니거나 다른 모듈에 있어야 한다는 주장이 제기되었습니다.
    *   그러나 파이썬의 타입 어노테이션은 이미 변수, 매개변수, 반환 타입에 대한 추가 메타데이터로 간주될 수 있으며, 이 제안은 이러한 메타데이터에 문서화라는 또 다른 유형을 추가하는 것으로 해석될 수 있습니다.
    *   `Annotated`는 어노테이션에 추가 메타데이터를 지원하기 위해 표준 라이브러리에 추가되었으므로, `Doc` 클래스가 `Annotated`와 밀접하게 연관되어 `typing` 모듈에 위치하는 것이 합리적이라고 보았습니다.

*   **다중 표준 (Multiple Standards)**:
    *   이 제안이 또 다른 표준을 만들 것이며, 이미 여러 `docstring` 컨벤션이 존재한다는 반대 의견도 있었습니다.
    *   그러나 이 제안은 기존 `docstring` 기반 접근 방식의 일반적인 단점(위에서 언급된 편집기 지원 부족, 불일치 등)을 해결하는 새로운 접근 방식을 제공하려 했습니다. `pyproject.toml`, `dataclass_transform`, 새로운 파이썬 `|` (union) 연산자 등과 같이 새로운 기능을 활용하고 기존 방법의 여러 문제를 해결하는 새로운 표준은 가치가 있을 수 있다고 주장했습니다.

*   **채택 (Adoption)**:
    *   이 제안이 새로운 표준이 되려면 커뮤니티의 관심이 필수적이었습니다.
    *   FastAPI, Typer, SQLModel, Pydantic, Strawberry 등 여러 주요 라이브러리와 mkdocstrings와 같은 문서화 도구에서 초기 관심과 지원을 표명했습니다.
    *   CPython 핵심 개발자들도 초기 피드백에서 관심과 지지를 보였으며, VS Code와 PyCharm 같은 편집기 개발자들은 장황함에 대한 우려를 표명했지만, 공식 표준이 될 경우 지원을 고려하겠다고 밝혔습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.