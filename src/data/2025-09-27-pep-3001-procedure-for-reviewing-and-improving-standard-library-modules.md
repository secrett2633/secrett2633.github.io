---
title: "[Withdrawn] PEP 3001 - Procedure for reviewing and improving standard library modules"
excerpt: "Python Enhancement Proposal 3001: 'Procedure for reviewing and improving standard library modules'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3001/
toc: true
toc_sticky: true
date: 2025-09-27 14:11:53+0900
last_modified_at: 2025-09-27 14:11:53+0900
published: true
---
> **원문 링크:** [PEP 3001 - Procedure for reviewing and improving standard library modules](https://peps.python.org/pep-3001/)
>
> **상태:** Withdrawn | **유형:** Process | **작성일:** 05-Apr-2006

## PEP 3001 – 표준 라이브러리 모듈 검토 및 개선 절차

*   **작성자:** Georg Brandl
*   **상태:** 철회됨 (Withdrawn)
*   **유형:** 프로세스 (Process)
*   **생성일:** 2006년 4월 5일

---

### 개요 (Abstract)

이 PEP는 표준 라이브러리 모듈, 특히 Python으로 작성된 모듈을 검토하고 개선하기 위한 절차를 설명합니다. 이 절차를 통해 해당 모듈들이 Python 3000 (Python 3.x의 초기 명칭) 에 대비할 수 있도록 하는 것이 목표입니다. 모듈 개선 작업은 여러 단계를 거칠 수 있으며, 각 단계는 아래 섹션에서 설명합니다. 물론 모든 모듈에 대해 모든 단계를 수행할 필요는 없습니다.

### 더 이상 사용되지 않는 모듈 제거 (Removal of obsolete modules)

Python 2.x 버전에서 더 이상 사용되지 않음(deprecated)으로 표시된 모든 모듈은 Python 3000을 위해 제거되어야 합니다. 또한, 현재는 더 이상 사용되지 않는 것으로 간주되지만, 너무 널리 사용되어 2.x 시리즈에서 바로 제거하거나 deprecated 처리하기 어려웠던 모듈들도 마찬가지로 제거 대상입니다. Python 3000은 이러한 모듈들을 정리할 수 있는 좋은 기회입니다.

제거된 모든 모듈 목록을 포함하는 문서가 필요하며, 이 문서에는 가능한 대체 모듈이나 대안에 대한 정보도 함께 제공되어야 합니다. 이 정보는 PEP XXX에서 언급된 `python3warn.py` 포팅 도우미 스크립트에 의해서도 제공될 것입니다.

### 모듈 이름 변경 (Renaming modules)

계층적 라이브러리 네임스페이스를 도입하거나 표준 모듈을 임포트(import)할 최상위 패키지를 도입하는 "표준 라이브러리 대대적 이름 변경 (great stdlib renaming)"에 대한 제안이 있습니다. 이러한 가능성 외에도, 일부 모듈의 이름은 현명하지 못하게 선택된 것으로 알려져 있으며, 이러한 실수는 2.x 시리즈에서는 결코 수정될 수 없었습니다. 예를 들어 "StringIO" 또는 "Cookie"와 같은 이름들이 있습니다. Python 3000에서는 이러한 모듈에 덜 혼란스럽고 더 일관성 있는 이름을 부여할 수 있는 기회가 될 것입니다.

물론, 각 이름 변경은 해당 모듈의 문서에 명시되어야 하며, 1단계의 전역 문서에도 포함될 수 있습니다. 또한, `python3warn.py` 스크립트는 이전 모듈 이름을 인식하고 사용자에게 적절하게 알릴 것입니다.

이름 변경이 Python 2.x 시리즈의 다른 릴리스에 맞춰 충분히 일찍 이루어진다면, 전환을 용이하게 하기 위해 2.x 브랜치에 새 이름을 도입하는 것을 고려해볼 가치가 있습니다.

### 코드 정리 (Code cleanup)

Python으로 작성된 대부분의 라이브러리 모듈은 버그 수정 외에는 거의 변경되지 않았으며, "절대 작동하는 시스템을 변경하지 않는다"는 정책을 따랐기 때문에, 많은 모듈이 최신 언어 기능에 미치지 못하는 코드를 포함하고 있을 수 있습니다. 이러한 코드는 더 간결하고 현대적인 Python 스타일로 재작성될 수 있습니다.

`PyChecker`는 라이브러리 전체에서 깨끗하게 실행되어야 합니다. 신중하게 조정된 설정 파일이 있다면, `PyLint` 또한 가능한 한 적은 경고를 발생시켜야 합니다.

이러한 변경 사항이 모듈의 인터페이스와 동작을 변경하지 않는 한, 문서 업데이트는 필요하지 않습니다.

### 테스트 및 문서 커버리지 강화 (Enhancement of test and documentation coverage)

유닛 테스트(unit test)에 의한 코드 커버리지는 모듈마다 크게 다릅니다. 각 테스트 스위트(test suite)는 완전성을 위해 검사되어야 하며, 남아있는 기존 테스트는 `PyUnit` (또는 Python 3000과 함께 제공될 새로운 테스트 프레임워크, 예를 들어 `py.test`?)으로 전환되어야 합니다.

또한, 모든 공개적으로 보이는 함수는 의미 있는 docstring을 가지고 있으며, 이상적으로는 여러 `doctest`를 포함하고 있는지 확인해야 합니다.

테스트 커버리지를 강화하는 데는 문서 변경이 필요하지 않습니다.

### 모듈 메타데이터 통일 (Unification of module metadata)

이것은 작고 아마도 그리 중요하지 않은 단계입니다. 모듈에 저자(`author`), 버전(`version`) 및 유사한 메타데이터(예: `__version__` 전역 변수)를 제공하려는 다양한 시도가 있었습니다. 이러한 메타데이터는 표준화되어 라이브러리 전체에서 사용될 수 있습니다.

이 단계에서도 문서 변경은 필요하지 않습니다.

### 하위 호환성을 깨는 버그 수정 (Backwards incompatible bug fixes)

수년간 표준 라이브러리 모듈의 버그에 대해 많은 버그 보고서가 제출되었지만, 수정하면 주요한 하위 호환성 문제가 발생하여 Python 2.x 시리즈에서는 허용되지 않았기 때문에 "수정 안 함 (Won't fix)"으로 처리되었습니다. Python 3000에서는 인터페이스 자체가 여전히 수용 가능하다면 해당 수정 사항을 적용할 수 있습니다.

이러한 수정으로 인해 발생하는 모든 미미한 동작 변경 사항은 문서, 아마도 "버전 3.0에서 변경됨 (Changed in Version 3.0)" 문단에 언급되어야 합니다.

### 인터페이스 변경 (Interface changes)

마지막이자 가장 파괴적인 변경 사항은 모듈의 공개 인터페이스를 전면적으로 개편하는 것입니다. 모듈의 인터페이스가 변경될 예정이라면, 사전에 정당성이 제시되거나 별도의 PEP가 작성되어야 합니다.

이러한 변경 사항은 "버전 3.0에서 새로 추가됨 (New in Version 3.0)"으로 완전히 문서화되어야 하며, `python3warn.py` 스크립트는 이를 인지해야 합니다.

### 참고 자료 (References)

아직 없음.

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.