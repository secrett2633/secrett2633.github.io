---
title: "[Rejected] PEP 608 - Coordinated Python release"
excerpt: "Python Enhancement Proposal 608: 'Coordinated Python release'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/608/
toc: true
toc_sticky: true
date: 2025-09-27 00:19:32+0900
last_modified_at: 2025-09-27 00:19:32+0900
published: true
---
> **원문 링크:** [PEP 608 - Coordinated Python release](https://peps.python.org/pep-0608/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 25-Oct-2019

PEP 608 – Coordinated Python release는 Python 릴리스를 특정 필수 프로젝트들의 호환 가능한 버전이 준비될 때까지 보류하는 것을 제안하는 문서입니다. 이 제안은 **거부(Rejected)** 되었습니다.

## 목표
Python 개발자들이 이 PEP의 제안 내용, 도입 배경, 그리고 실제 Python 사용에 미치는 영향을 명확하게 이해할 수 있도록 돕는 것입니다.

## PEP 608 – Coordinated Python release

*   **작성자:** Miro Hrončok, Victor Stinner
*   **상태:** 거부됨 (Rejected)
*   **유형:** Standards Track
*   **생성일:** 2019년 10월 25일
*   **Python 버전:** 3.9

### 초록 (Abstract)
이 PEP는 선택된 프로젝트들의 호환 가능한 버전이 준비될 때까지 Python 릴리스를 막는 것을 제안합니다. Python 릴리스 관리자는 특정 프로젝트가 곧 수정될 것이라고 판단하거나 문제의 심각성이 낮다고 판단할 경우, 해당 프로젝트가 호환되지 않더라도 Python을 릴리스할 수 있습니다.

### 배경 (Rationale)
이 PEP는 선택된 프로젝트의 관리자들을 Python 릴리스 주기에 참여시킵니다. 여기에는 여러 이점이 있습니다.
*   Python 최종 릴리스 전에 더 많은 버그를 감지합니다.
*   Python 최종 릴리스 전에 호환되지 않는 변경사항을 논의하고 되돌릴 수 있습니다.
*   새로운 Python 최종 버전이 릴리스될 때 호환되는 프로젝트의 수를 늘립니다.

#### 1. Python 베타 단계에 참여하는 프로젝트가 너무 적습니다. (Too few projects are involved in the Python beta phase)
현재 Python 베타 버전은 최종 3.x.0 릴리스 4개월 전에 제공됩니다. 베타 단계에서 보고된 버그는 쉽게 수정될 수 있으며, 심각할 경우 릴리스를 막을 수 있습니다. 호환되지 않는 변경사항은 베타 단계에서 논의되며, 코드 업데이트 방법을 설명하는 문서가 개선되거나 변경사항을 되돌리는 것을 고려합니다. 점점 더 많은 프로젝트가 CI (Continuous Integration)에서 Python의 `master` 브랜치로 테스트되지만, 상위 50개 PyPI 프로젝트 중 너무 많은 프로젝트가 최종 Python 릴리스 후 몇 주 또는 심지어 몇 달이 지나서야 새 Python과 호환됩니다.

#### 2. DeprecationWarning이 무시됩니다. (DeprecationWarning is being ignored)
Python은 기능 사용 중단을 위한 잘 정의된 프로세스를 가지고 있습니다. 기능이 제거되기 전에는 최소한 하나의 Python 릴리스 동안 `DeprecationWarning`이 발생해야 합니다.
실제로 주요 Python 프로젝트에서는 `DeprecationWarning`이 수년 동안 무시됩니다. 일반적으로 관리자들은 경고가 너무 많아서 단순히 무시한다고 설명합니다. 게다가 `DeprecationWarning`은 기본적으로 무음(silent)입니다 ( `__main__` 모듈 제외: PEP 565). 점점 더 많은 프로젝트가 경고를 오류로 처리( `-Werror` )하여 테스트 스위트를 실행하더라도, Python 핵심 개발자들은 기능이 제거될 때 얼마나 많은 프로젝트가 영향을 받는지 알 수 없습니다.

#### 3. 조율의 필요성 (Need to coordinate)
최종 Python 릴리스 후에 문제와 호환되지 않는 변경사항이 발견되고 논의되면, Python을 수정하는 것이 훨씬 더 복잡하고 비용이 많이 듭니다. 일단 API가 공식 최종 릴리스의 일부가 되면, Python은 전체 3.x 릴리스 수명 동안 하위 호환성을 제공해야 합니다. 일부 운영 체제는 버그가 있는 최종 릴리스와 함께 제공될 수 있으며, 업데이트되는 데 몇 개월이 걸릴 수 있습니다.
너무 많은 프로젝트가 최종 Python 릴리스 후에만 새로운 Python으로 업데이트되므로, Python이 릴리스될 때 대규모 애플리케이션을 실행하기에는 이 새로운 Python 버전이 거의 사용 불가능합니다. 모든 선택된 프로젝트의 호환 가능한 버전이 준비될 때까지 Python 릴리스를 차단하는 것이 제안됩니다.

#### 4. 더 짧은 Python 릴리스 스케줄 (Shorter Python release schedule)
PEP 602: Annual Release Cycle for Python과 PEP 605: A rolling feature release stream for CPython은 새로운 기능을 더 빠르게 제공하기 위해 Python을 더 자주 릴리스하기를 원합니다.
문제는 각 Python 3.x 릴리스가 많은 프로젝트를 망가뜨린다는 것입니다. 조율된 Python 릴리스는 깨진 프로젝트의 수를 줄이고 새로운 Python 릴리스를 더 유용하게 만듭니다.

### 상세 (Specification)
기본적으로, 선택된 모든 프로젝트의 호환 가능한 버전이 준비될 때까지 Python 릴리스는 차단됩니다.
최종 Python 버전을 릴리스하기 전에, Python 릴리스 관리자는 선택된 각 프로젝트의 호환성 상태에 대한 보고서를 보내야 할 책임이 있습니다. 가능한 한 빨리 문제를 감지하고 진화를 확인하기 위해 각 베타 릴리스마다 이러한 보고서를 보내는 것이 권장됩니다.

Python 릴리스 관리자는 특정 프로젝트가 곧 수정될 것이라고 판단하거나 문제의 심각성이 낮다고 판단할 경우, 해당 프로젝트가 호환되지 않더라도 Python을 릴리스할 수 있습니다.
각 Python 릴리스 후에 프로젝트 목록은 오래된 사용되지 않는 종속성을 제거하고 새로운 종속성을 추가하는 등으로 업데이트될 수 있습니다. 전체 프로세스가 Python 릴리스를 너무 오랫동안 차단하지 않는다면 목록은 늘어날 수 있습니다.

#### 1. 지연 제한 (Limit the delay)
다음 Python 버전과의 빌드 또는 테스트 문제가 프로젝트에 보고될 때, 관리자들은 한 달 이내에 답변해야 합니다. 답변이 없으면 해당 프로젝트는 Python 릴리스를 차단하는 프로젝트 목록에서 제외될 수 있습니다.

여러 프로젝트는 이미 CI에서 Python의 `master` 브랜치로 테스트되고 있습니다. Python 릴리스 초기 단계에서 문제가 매우 일찍 감지될 수 있으므로, 이를 처리할 충분한 시간을 제공해야 합니다. 아직 다음 Python에서 테스트되지 않은 프로젝트를 위해 더 많은 CI를 추가할 수 있습니다.
선택된 프로젝트의 문제가 파악되면, Python 릴리스 관리자와 관련 프로젝트 관리자 사이에 사례별로 예외를 논의할 수 있습니다. 모든 문제가 Python 릴리스를 차단할 가치가 있는 것은 아닙니다.

#### 2. 선택된 프로젝트 (Selected projects)
Python 릴리스를 차단하는 프로젝트 목록 (총 27개):

**주요 프로젝트 (13):**
*   aiohttp
*   cryptography
*   Cython
*   Django
*   numpy
*   pandas
*   pip
*   requests
*   scipy
*   Sphinx (Python 빌드에 필요)
*   sqlalchemy
*   pytest
*   tox

**직접 및 간접 종속성 (14):**
*   certifi (urllib3에 필요)
*   cffi (cryptography에 필요)
*   chardet (Sphinx에 필요)
*   colorama (pip에 필요)
*   docutils (Sphinx에 필요)
*   idna (Sphinx 및 requests에 필요)
*   jinja2 (Sphinx에 필요)
*   MarkupSafe (Sphinx에 필요)
*   psycopg2 (Django에 필요)
*   pycparser (cffi에 필요)
*   setuptools (pip 및 수많은 Python 프로젝트에 필요)
*   six (수많은 Python 프로젝트에 필요)
*   urllib3 (requests에 필요)
*   wheel (pip에 필요)

#### 3. 프로젝트 선택 방법 (How projects are selected)
Python 빌드에 사용되는 프로젝트(예: Sphinx)는 목록에 포함되어야 합니다.
가장 인기 있는 프로젝트는 가장 많이 다운로드된 PyPI 프로젝트에서 선택됩니다.
단일 호환되지 않는 종속성이 전체 프로젝트를 차단할 수 있으므로, 대부분의 프로젝트 종속성도 목록에 포함됩니다. 목록 길이를 줄이기 위해 일부 종속성은 제외됩니다.
pytest 및 tox와 같은 테스트 종속성도 포함되어야 합니다. 프로젝트를 테스트할 수 없으면 새 버전을 출시할 수 없습니다.
목록은 프로젝트를 다음 Python으로 포팅하는 데 드는 비용을 잘 파악할 수 있을 만큼 길어야 하지만, Python 릴리스를 너무 오랫동안 차단하지 않을 만큼 충분히 짧아야 합니다.
분명히, 목록에 없는 프로젝트도 다음 Python과의 문제를 보고하고 다음 Python 버전에서 CI를 실행하는 것이 권장됩니다.

### 호환되지 않는 변경사항 (Incompatible changes)
여기서 정의하는 `호환되지 않는 변경사항`은 프로젝트를 빌드하거나 테스트할 때 문제를 일으키는 모든 Python 변경사항을 의미합니다.
호환되지 않는 변경사항의 더 많은 예시는 PEP 606: Python Compatibility Version을 참조하십시오.

#### 예시 (Examples)
다양한 종류의 호환되지 않는 변경사항이 있습니다.
*   **Python 빌드 변경:** 예를 들어, Python 3.8은 `sys.abiflags`에서 `m`(pymalloc을 의미)을 제거했으며, 이는 Linux 배포판과 같은 Python 벤더에 영향을 미쳤습니다.
*   **C 확장 빌드 변경:** 예를 들어, Python 3.8은 더 이상 C 확장을 `libpython`에 링크하지 않으며, Python 3.7은 `errno` 모듈에 대한 `os.errno` 별칭을 제거했습니다.
*   **함수 제거:** 예를 들어, `collections`의 ABC 클래스에 대한 별칭은 Python 3.9에서 제거되었습니다.
*   **함수 시그니처 변경:**
    *   이전에 허용되었던 타입을 거부합니다 (예: `int`만 허용하고 `float`는 거부).
    *   새로운 필수 매개변수를 추가합니다.
    *   위치 또는 키워드 매개변수를 위치 전용(positional-only)으로 변환합니다.
*   **동작 변경:** 예를 들어, Python 3.8은 이제 XML 속성을 이름으로 정렬하는 대신 삽입 순서로 직렬화합니다.
*   **새로운 경고:** 점점 더 많은 프로젝트가 모든 경고를 오류로 처리하여 테스트되므로, 새로운 경고는 프로젝트 테스트를 실패시킬 수 있습니다.
*   **C API에서 함수 제거:**
*   **C API에서 구조체 불투명화 (opaque):** 예를 들어, `PyInterpreterState`는 Python 3.8에서 불투명해져서 `interp->modules`에 접근하는 프로젝트를 깨뜨렸습니다 (`PyImport_GetModuleDict()`를 대신 사용해야 합니다).

### Python 정리 및 DeprecationWarning (Cleaning up Python and DeprecationWarning)
Python의 Zen (PEP 20) 격언 중 하나는 "There should be one—and preferably only one—obvious way to do it." (하나의 명확한 방법이 있어야 하며, 가급적이면 하나뿐이어야 한다) 입니다.
Python이 발전함에 따라 필연적으로 새로운 방법이 등장합니다. 새로운 방법을 사용하도록 `DeprecationWarning`이 발생하지만, 많은 개발자들이 기본적으로 무음인 이 경고를 무시합니다.
때로는 두 가지 방법을 모두 지원하는 데 사소한 유지 관리 비용이 들지만, Python 핵심 개발자들은 Python 코드 베이스와 표준 라이브러리를 정리하기 위해 오래된 방법을 버리는 것을 선호합니다. 이러한 종류의 변경은 하위 호환되지 않습니다.
Python 2 지원 종료와 함께 오래된 Python 코드를 정리할 좋은 기회이므로, 평소보다 더 많은 호환되지 않는 변경사항이 예상됩니다.

### 분산 CI (Distributed CI)
선택된 프로젝트가 Python의 `master` 브랜치와 호환되는지 확인하는 작업은 분산 CI를 사용하여 자동화할 수 있습니다.
기존 CI를 재사용할 수 있습니다.
아직 다음 Python에서 테스트되지 않은 프로젝트를 위해 새로운 CI를 추가할 수 있습니다.
다음 Python에서 테스트할 때는 `DeprecationWarning` 경고를 오류로 처리하는 것이 권장됩니다.
다음 Python에서 프로젝트를 테스트하는 작업이 "필수적"(전체 CI를 차단)일 필요는 없습니다. Python 릴리스의 베타 단계에서 실패가 발생하는 것은 괜찮습니다. 해당 작업은 최종 Python 릴리스에서만 통과하면 됩니다.

### 저작권 (Copyright)
이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 관대한 조건으로 배포됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.