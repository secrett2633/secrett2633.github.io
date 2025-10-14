---
title: "[Active] PEP 729 - Typing governance process"
excerpt: "Python Enhancement Proposal 729: 'Typing governance process'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/729/
toc: true
toc_sticky: true
date: 2025-09-27 13:21:49+0900
last_modified_at: 2025-09-27 13:21:49+0900
published: true
---
> **원문 링크:** [PEP 729 - Typing governance process](https://peps.python.org/pep-0729/)
>
> **상태:** Active | **유형:** Process | **작성일:** 19-Sep-2023

## PEP 729 – 타입 거버넌스 프로세스

### 초록 (Abstract)
이 PEP는 Python 타입 시스템을 관리하고 발전시키기 위한 새로운 방식, 즉 "타이핑 위원회 (Typing Council)"의 설립을 제안합니다. 이 위원회는 Python 타입 시스템의 명세 (specification)와 적합성 테스트 스위트 (conformance test suite)를 유지 관리하며, 초기 위원은 Python Steering Council (운영 위원회)에 의해 임명될 것입니다.

### 동기 (Motivation)
Python 타입 시스템은 PEP 484를 통해 약 10년 전에 만들어졌으며, 이제는 유지보수 가능한 Python 코드를 작성하는 데 중요한 도구가 되었습니다. 하지만 타입 시스템이 성장하면서 현재 관리 방식에 여러 문제점이 드러났습니다.

1.  **PEPs는 유일한 명세 (PEPs are the only specification)**
    Python 타입 시스템의 명세는 PEP 484 및 후속 PEP들로 이루어져 있습니다. 그러나 Standards Track PEP는 "살아있는 문서 (living document)"나 명세가 아닌 "변경 제안 (change proposal)"의 성격을 가집니다. 이는 타입 시스템의 실제 작동 방식에 대한 상세한 부분이 PEP에만 의존하게 만들어, asyncio 모듈처럼 표준 라이브러리 자체와만 상호작용하는 경우와 달리, 사용자가 외부 도구인 타입 체커 (type checker)를 고려해야 하는 타이핑에 있어 문제를 야기합니다.

2.  **명세를 발전시키기 어렵다 (It's hard to evolve the specification)**
    PEP가 유일한 명세이기 때문에 작은 변경이라도 새로운 PEP가 필요할 수 있어 과정이 번거롭습니다. 때로는 오래된 PEP를 직접 수정하기도 하지만, 이는 승인된 PEP가 더 이상 변경되지 않는 "역사적 문서 (historical documents)"라는 개념에 위배됩니다. 예를 들어, `typing.NoReturn`의 인자 어노테이션 사용이나 PEP 561의 부분 스텁 (partial stubs)에 대한 불명확한 설명 등 구체적인 문제들이 있었습니다.

3.  **타입 시스템이 불완전하게 명세되어 있다 (The type system is underspecified)**
    PEPs가 명세를 제공하지만, 종종 충분히 정밀하지 않을 때가 있습니다. 타입 시스템의 복잡성이 커지면서, 명세되지 않은 영역에 대한 결정은 개별 타입 체커에 맡겨지게 됩니다. 이는 비공식적인 표준을 만들고, 타입 시스템을 새로 시작하는 사람들에게 접근성을 낮추는 결과를 초래합니다. 예를 들어 `@overload` 매칭 방식, `ParamSpec`의 메소드 작동 방식, 재귀적 별칭 (recursive aliases)의 의미론 등이 명확하게 명세되지 않은 부분입니다.

4.  **Steering Council은 위의 문제들을 해결하기에 적합하지 않다 (The Steering Council is not well-placed to solve the above problems)**
    Steering Council은 전체 Python 언어에 대한 책임을 지고 있어, 타입 시스템에만 국한된 미묘한 결정들을 내릴 시간과 전문성이 부족합니다. 이는 Steering Council이 특정 PEP에 대한 결정을 다른 이에게 위임하는 이유와 유사합니다.

5.  **지지 (Endorsements)**
    이 PEP는 Rebecca Chen (pytype), Eric Traut (Pyright)를 포함한 주요 타입 체커의 관리자들과 mypy 및 Pyre의 관리자들로부터 비공식적인 지지를 받았습니다.

### 명세 (Specification)
**타이핑 위원회 (Typing Council)**라는 새로운 그룹을 설립하여 Python 타입 시스템을 개발하고 유지 관리하며 위에서 언급된 문제들을 해결할 것을 제안합니다.

#### 권한 (Mandate)
타이핑 위원회는 Python 타입 시스템이 다음을 보장하도록 권한을 가집니다.

*   **유용성 (Useful):** 타입 시스템은 정적 분석, 런타임 타입 체킹, 정적 컴파일, IDE 지원, 문서화 등 일반적인 사용 사례에 부합해야 합니다.
*   **사용성 (Usable):** Python 개발자가 사용하기 쉬워야 하며, 타입 체커에 의해 올바르게 인식되는 코드를 작성하기 용이해야 합니다. 좋은 문서가 제공되어야 합니다.
*   **안정성 (Stable):** 타입 시스템이 성숙함에 따라 사용자는 타입이 지정된 코드가 계속 작동하고 타입 시스템에 대한 정신 모델 (mental model)을 신뢰할 수 있어야 합니다. 변경 사항은 신중하게 이루어져야 하지만, 타입 시스템은 발전할 수 있어야 합니다.

#### 운영 및 프로세스 (Operations and process)
위원회는 3명에서 5명의 저명한 커뮤니티 구성원 (Python 핵심 개발자 및 주요 타입 체커 관리자 등)으로 구성됩니다. 초기 위원으로는 Eric Traut (Pyright), Guido van Rossum (핵심 개발자), Jelle Zijlstra (핵심 개발자), Rebecca Chen (pytype), Shantanu Jain (핵심 개발자)가 임명되었습니다. 위원회 구성원의 임기 제한은 없지만, 각 위원은 최대 5년 연속으로 봉사할 것으로 예상됩니다. 공석이 발생하면 위원회가 새 위원을 임명할지 결정하며, 타이핑 커뮤니티에서 추천을 받아 기존 위원회가 후임자를 선정합니다.

타이핑 위원회는 Steering Council에 계속 책임을 집니다. Steering Council은 언제든지 타이핑 위원회의 구성에 대해 특정 변경을 요청하거나 비특정 변경을 요구할 수 있습니다. 위원회는 주로 GitHub PR 검토를 통해 운영되며, 모든 결정은 discuss.python.org에 공개적으로 게시하고 가능한 경우 근거를 포함하여 투명성을 지향합니다.

##### Steering Council과의 관계 (Relationship with the Steering Council)
Steering Council은 Python 언어의 전반적인 방향에 계속 책임을 지며, 타이핑 관련 PEP에 대한 결정을 내립니다. 타이핑 위원회는 타이핑 관련 PEP에 대해 서면 의견과 권고를 Steering Council에 제공합니다. 그러나 타입 시스템에 대한 작은 변경은 타이핑 위원회가 직접 할 수 있습니다. Steering Council은 특정 PEP에 대한 결정을 타이핑 위원회에 위임할 수도 있습니다.

*   언어 문법을 변경하는 PEP (예: PEP 695)는 Steering Council이 결정하고, 타이핑 위원회는 의견을 제공합니다.
*   런타임 동작에 영향을 미치는 PEP (예: PEP 702)도 Steering Council이 결정합니다.
*   타입 체커 사용자에게만 영향을 미치고 언어 전체를 변경하지 않는 PEP (예: PEP 698)는 기본적으로 Steering Council이 결정하지만, 위임될 수 있습니다.
*   `typing.Never`와 같은 작은 기능 추가는 명세 및 적합성 테스트 스위트에 대한 PR을 통해 타이핑 위원회가 결정합니다.
*   명세의 해석에 대한 혼란이 있을 경우, 명세 명확화를 위한 PR이 타이핑 위원회에서 결정됩니다.

런타임 `typing` 모듈은 CPython 핵심 개발자 팀이 계속 유지 관리하지만, 타입 체커 동작에 영향을 미치는 변경 사항은 타이핑 위원회의 승인을 받아야 합니다.

##### 타입 체커와의 관계 (Relationship with type checkers)
타이핑 위원회는 타입 체커에 직접적인 권한이 없으며, 특정 기능 구현이나 동작 변경을 강제할 수 없습니다. 타입 체커는 위원회가 설정한 명세를 따르도록 인센티브를 받습니다. 이는 타입 정보를 따르는 라이브러리, typeshed의 스텁 파일, `typing` 표준 라이브러리 모듈, 표준 타입 시스템을 다루는 사용자 문서와 같은 공유 리소스를 활용할 수 있기 때문입니다. 타입 체커는 타입 시스템을 확장하거나 명세에서 벗어날 수 있지만, 이러한 차이점을 명확하게 문서화해야 합니다.

#### 프로젝트 (Projects)
타이핑 위원회가 담당할 노력은 다음과 같습니다.

1.  **적합성 테스트 스위트 (Conformance test suite)**
    타입 체커가 Python 코드를 어떻게 검사해야 하는지에 대한 기계적으로 검증 가능한 문서를 제공하고, 주요 타입 체커 구현 결과도 함께 제공합니다. 이는 기존 PEP에서 규정된 동작에 대한 "규범적 (prescriptive)" 테스트와, 표준에 규정되지 않은 기존 구현의 동작을 문서화하는 "기술적 (descriptive)" 테스트를 포함합니다.

2.  **타입 시스템 명세 (Specification for the type system)**
    기존 PEP의 명세 섹션을 취합하여 초기 명세를 만들고, 혼란스러운 부분을 명확히 하고 더 많은 영역을 포함하도록 점진적으로 개선합니다. 이 명세는 타입 체커, typeshed와 같은 프로젝트, 타입 시스템 변경을 제안하려는 사람들을 위한 지침을 제공합니다. 다만, 일반 애플리케이션 개발자를 위한 문서는 아닙니다.

3.  **사용자용 참조 문서 (User-facing reference for the type system)**
    타입 시스템의 성공을 위해 좋은 문서화가 중요하므로, 타이핑 위원회는 이에 대한 책임을 집니다. PEP는 사용자 문서로 적합하지 않고, 명세는 너무 기술적일 수 있으므로, `typing.python.org` 문서를 확장하고 개별 타입 체커 및 CPython 문서의 자료를 재사용하여 별도의 사용자용 참조 문서를 만드는 것이 유용할 것입니다.

### 개정 (Amendments)
이 PEP는 타이핑 위원회의 헌장 역할을 합니다. 운영 변경은 새로운 PEP를 통하거나 이 PEP를 변경함으로써 이루어질 수 있으며, 두 경우 모두 커뮤니티 논의 후 Steering Council에 의해 결정됩니다.

### 기각된 아이디어 (Rejected ideas)
1.  **명세를 처음부터 다시 작성 (Writing the specification from scratch)**
    기존 PEP에서 시작하여 명세를 점진적으로 개선하는 대신, 타입 시스템 전체를 다루는 새롭고 더 공식적인 명세를 처음부터 작성하는 아이디어도 있었지만, 이는 훨씬 더 큰 작업이며 커뮤니티의 에너지와 노력이 많이 필요할 것으로 판단되어 기각되었습니다.

2.  **대체 거버넌스 메커니즘 (Alternate governance mechanisms)**
    Steering Council이 타이핑 위원회 멤버를 매년 임명하는 대신, 타이핑 위원회가 자율적으로 운영되도록 하는 현재 제안과 다른 더 민주적인 거버넌스 메커니즘이 고려되었지만, 이는 복잡한 문제를 야기하고 더 많은 프로세스를 요구하며 분열을 초래할 수 있어 기각되었습니다.

3.  **아무것도 하지 않음 (Do nothing)**
    이 PEP가 수락되지 않더라도 타입 시스템 개선을 위한 상당한 진전이 있을 수 있지만, 명세나 PEP 위임과 같은 프로젝트는 타이핑 위원회로부터 더 많은 이점을 얻을 것으로 예상됩니다. 현재 커뮤니티가 잠재적 논쟁을 해결하는 데 사용할 수 있는 도구는 대략적인 합의 도출이나 개별 프로젝트/기여자 권한 행사뿐이며, 전자는 느리고 후자는 일관성 없는 생태계를 초래할 수 있어 아무것도 하지 않는 것은 바람직하지 않다고 판단되었습니다.

### 연락 (Contact)
타이핑 위원회에 결정을 요청하려면 `python/typing-council` 저장소에 이슈를 열 수 있습니다.

### 저작권 (Copyright)
이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 관대한 것을 따릅니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.