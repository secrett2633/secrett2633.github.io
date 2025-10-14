---
title: "[Accepted] PEP 699 - Remove private dict version field added in PEP 509"
excerpt: "Python Enhancement Proposal 699: 'Remove private dict version field added in PEP 509'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/699/
toc: true
toc_sticky: true
date: 2025-09-27 13:05:33+0900
last_modified_at: 2025-09-27 13:05:33+0900
published: true
---
> **원문 링크:** [PEP 699 - Remove private dict version field added in PEP 509](https://peps.python.org/pep-0699/)
>
> **상태:** Accepted | **유형:** Standards Track | **작성일:** 03-Oct-2022



## PEP 699: PEP 509에서 추가된 비공개 딕셔너리 버전 필드 제거

*   **작성자:** Ken Jin
*   **상태:** Accepted (수락됨)
*   **유형:** Standards Track
*   **생성일:** 2022년 10월 3일
*   **Python 버전:** 3.12
*   **대체:** PEP 509

### 초록 (Abstract)

PEP 509는 CPython 및 확장 라이브러리에서 최적화를 위해 딕셔너리에 `ma_version_tag`라는 비공개 필드를 도입했습니다. PEP 699는 이 `ma_version_tag` 필드가 이미 다른 대안으로 대체되었기 때문에 PEP 509를 철회하고 해당 필드를 내부 구현 상세(implementation detail)로 선언할 것을 제안합니다. 이는 향후 최적화를 위해 해당 필드를 재사용할 수 있는 길을 열어줄 것입니다.

### 동기 (Motivation)

PEP 509는 딕셔너리에 `ma_version_tag` 필드를 도입했습니다. 이 64비트 필드는 딕셔너리가 수정될 때마다 업데이트되는 버전 카운터(version counter)를 저장했습니다. 원래 제안은 이 버전 카운터를 최적화를 위한 보호 장치(guard)로 사용하는 것이었습니다.

하지만 CPython 3.11부터 이 필드는 내부 최적화 노력에 의해 사용되지 않게 되었습니다. PEP 659에서 도입된 특수화된 명령어(specialized instructions)들은 특정 최적화가 안전한지 검증하기 위해 다른 방식을 사용하고 있습니다.

CPython의 추가적인 최적화를 가능하게 하기 위해, PEP 699는 `ma_version_tag` 필드가 더 이상 PEP 509의 명세에 따르지 않도록 제안합니다. 이를 통해 CPython 개발자들은 딕셔너리 쓰기 감시자(dictionary write watchers)와 같은 다른 최적화 정보를 저장할 수 있게 됩니다.

### 근거 (Rationale)

PEP 699는 이 필드가 미래에 무엇을 위해 사용될지는 구체적으로 명시하지 않습니다. 이는 의도적인데, 내부 구현 상세는 변경될 수 있으며, 해당 필드는 CPython의 내부 용도로만 사용되어야 하기 때문입니다.

### 명세 (Specification)

이 명세는 PEP 509의 내용을 철회합니다. 파이썬 `dict` 클래스의 `ma_version_tag` 필드는 내부 구현 상세로 선언되며, 완전히 제거되거나 다른 형태로 표현될 수 있습니다. C 확장(C extensions)은 이 필드에 의존해서는 안 됩니다.

### 하위 호환성 (Backwards Compatibility)

일부 확장(extensions)은 빠른 딕셔너리 또는 전역(globals) 조회를 위해 `ma_version_tag`를 사용했습니다. 예를 들어, Cython은 빠른 동적 모듈 변수 조회를 위해 이 필드를 사용합니다.

PEP 699는 `ma_version_tag`에 접근할 때 컴파일러 경고(compiler warning)를 발생시킬 것을 제안합니다. 경고가 발생한 두 번의 연속적인 버전 릴리스 후에는, PEP 387의 지침에 따라 `ma_version_tag`가 제거될 예정입니다.

작성자가 찾은 이 필드의 가장 큰 사용자는 Cython이었습니다. Cython 유지보수 담당자와의 논의 결과, Cython에서 이 필드에 대한 지원을 제거하는 것은 사소한 작업으로 확인되었습니다.

### 보안 관련 영향 (Security Implications)

PEP 509는 정수 오버플로우(integer overflow)에 대한 우려가 있었지만, PEP 699는 추가적인 보안 문제를 야기하지 않습니다.

### 기각된 아이디어 (Rejected Ideas)

하위 호환성을 위해 필드를 보존하는 것도 가능한 대안이었습니다. 그러나 이 PEP는 해당 대안을 기각했습니다. 그 이유는 다음과 같습니다.

*   향후 최적화는 더 많은 메모리를 소비할 것입니다.
*   해당 필드는 PEP에서만 언급되었을 뿐, 항상 비공개(private)였고 문서화되지 않았으며 하위 호환성 보장이 없었습니다.
*   파이썬에서 딕셔너리는 흔히 사용되며, 딕셔너리의 메모리 소비가 증가하면 파이썬의 성능에 부정적인 영향을 미치기 때문입니다.

### 참조 구현 (Reference Implementation)

참조 구현은 `python/cpython#101193`에서 확인할 수 있습니다.

---

이 PEP 699는 파이썬 핵심 개발팀이 내부 최적화와 메모리 효율성을 지속적으로 개선하려는 노력을 보여줍니다. `ma_version_tag` 필드의 용도 변경을 통해, 파이썬 딕셔너리가 미래의 CPython 버전에서 더욱 효율적으로 작동할 수 있는 기반이 마련될 것으로 기대됩니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.