---
title: "[Superseded] PEP 411 - Provisional packages in the Python standard library"
excerpt: "Python Enhancement Proposal 411: 'Provisional packages in the Python standard library'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/411/
toc: true
toc_sticky: true
date: 2025-09-26 21:31:48+0900
last_modified_at: 2025-09-26 21:31:48+0900
published: true
---
> **원문 링크:** [PEP 411 - Provisional packages in the Python standard library](https://peps.python.org/pep-0411/)
>
> **상태:** Superseded | **유형:** Informational | **작성일:** 10-Feb-2012



# PEP 411 – Python 표준 라이브러리의 잠정적(Provisional) 패키지

*   **작성자:** Alyssa Coghlan, Eli Bendersky
*   **상태:** Superseded (대체됨)
*   **유형:** Informational (정보 제공)
*   **생성일:** 2012년 2월 10일
*   **Python 버전:** 3.3

## 중요 알림 (Note)

이 PEP는 현재 **Superseded (대체됨)** 상태로 표시되었습니다. 이 PEP가 작성된 지 10년이 지난 지금, 경험을 통해 이 기능이 표준 라이브러리 관리에서 거의 사용되지 않는다는 것이 확인되었습니다. 또한, 사람들이 잠정적 모듈에 너무 과도하게 의존하는 것을 방지하는 데 도움이 되지 않아, 변경 사항이 여전히 커뮤니티에 상당한 문제를 야기할 수 있습니다.

## 요약 (Abstract)

새로운 패키지를 Python 표준 라이브러리에 포함하는 과정은 패키지가 Python의 공식적인 일부가 됨으로써 발생하는 API 고정(lock-in) 및 하위 호환성(backward compatibility) 약속으로 인해 어려움을 겪습니다. 이 PEP는 표준 라이브러리 패키지를 단일 기능 릴리스 기간 동안 "잠정적(provisional)"으로 표시하는 방법론을 설명합니다. 잠정적 패키지는 "안정적(stable)" 상태로 "졸업(graduating)"하기 전에 API가 수정될 수 있습니다.

이 상태는 한편으로는 패키지가 Python 배포판의 공식적인 일부로서의 이점을 제공합니다. 다른 한편으로는 코어 개발팀이 패키지 API의 안정성에 대해 어떠한 약속도 하지 않으며, 다음 릴리스에서 변경될 수 있음을 명시적으로 밝힙니다. 드물지만, API나 유지보수에 대한 우려가 타당한 것으로 입증될 경우, 이러한 패키지는 사용 중단(deprecation) 기간 없이 표준 라이브러리에서 제거될 수도 있습니다.

## 제안 - 문서화된 잠정적 상태 (Proposal - a documented provisional state)

Python 코어 개발팀이 새로운 패키지를 표준 라이브러리에 포함하기로 결정했지만, 패키지의 API가 최적인지 완전히 확신하지 못할 경우, 해당 패키지는 "잠정적(provisional)"으로 포함되고 표시될 수 있습니다.

다음 기능 릴리스에서 패키지는 표준 라이브러리의 일반 "안정적(stable)" 상태로 "졸업(graduated)"하거나, 잠정적 상태로 유지되거나, 완전히 거부되어 Python 소스 트리에서 제거될 수 있습니다. 패키지가 잠정적 상태를 거쳐 안정적 상태로 졸업하게 되면, 누적된 피드백에 따라 API가 변경될 수 있습니다. 코어 개발팀은 잠정적 패키지의 API 안정성 및 하위 호환성에 대해 어떠한 보장도 명시적으로 하지 않습니다.

### 패키지를 잠정적 상태로 표시 (Marking a package provisional)

패키지는 문서 페이지와 docstring에 알림을 통해 잠정적 상태로 표시됩니다. 다음 문단이 문서 페이지 상단에 주의사항(note)으로 추가됩니다:

> `<X>` 패키지는 잠정적(provisional)으로 표준 라이브러리에 포함되었습니다. 코어 개발자가 필요하다고 판단할 경우, 하위 호환되지 않는 변경사항(패키지 제거 포함)이 발생할 수 있습니다.

"잠정적(provisional basis)"이라는 문구는 용어집의 "잠정적 패키지(provisional package)" 용어로 연결되며, 다음과 같이 정의됩니다:

> 잠정적 패키지는 표준 라이브러리의 하위 호환성 보장에서 의도적으로 제외된 패키지입니다. 이러한 패키지에 대한 주요 변경은 예상되지 않지만, 잠정적 상태로 표시된 동안에는 코어 개발자가 필요하다고 판단할 경우 하위 호환되지 않는 변경사항(패키지 제거 포함)이 발생할 수 있습니다. 이러한 변경은 무분별하게 이루어지지 않을 것이며, 패키지 포함 이전에 놓쳤던 심각한 결함이 발견될 경우에만 발생할 것입니다.

이 과정은 표준 라이브러리가 오랜 기간 동안 문제가 있는 설계 오류에 묶이지 않고 계속해서 발전할 수 있도록 합니다. 자세한 내용은 PEP 411을 참조하십시오.

패키지의 docstring 시작 부분에 다음 내용이 추가됩니다:

> The API of this package is currently provisional. Refer to the documentation for details. (이 패키지의 API는 현재 잠정적입니다. 자세한 내용은 문서를 참조하십시오.)

패키지를 잠정적 상태에서 안정적 상태로 옮기는 것은 단순히 문서 페이지와 docstring에서 이러한 알림을 제거하는 것을 의미합니다.

### 어떤 패키지가 잠정적 상태를 거쳐야 하는가 (Which packages should go through the provisional state)

Python 표준 라이브러리에 추가될 대부분의 패키지는 잠정적 상태로 기능 릴리스를 거칠 것으로 예상됩니다. 그러나 미리 정의된 API를 사용하는 패키지(예: 기존 `bz2` 패키지의 API를 따르는 `lzma`)나 Python 개발 커뮤니티에서 폭넓게 수용된 API를 가진 패키지처럼 일부 예외도 있을 수 있습니다.

어떤 경우든, 잠정적 상태를 통해서든 직접적으로든 표준 라이브러리에 추가될 것이 제안된 패키지는 PEP 2에 의해 설정된 승인 조건을 충족해야 합니다.

### "졸업"을 위한 기준 (Criteria for “graduation”)

원칙적으로 대부분의 잠정적 패키지는 궁극적으로 안정적인 표준 라이브러리로 졸업해야 합니다. 졸업하지 못하는 몇 가지 이유는 다음과 같습니다:

*   패키지가 불안정하거나 취약한 것으로 판명되고, 이를 유지보수할 충분한 개발자 지원이 없을 수 있습니다.
*   미리보기 릴리스 기간 동안 훨씬 더 나은 대체 패키지가 발견될 수 있습니다.

기본적으로 결정은 코어 개발자에 의해 개별 사례별로 이루어집니다. 여기서 강조할 점은 특정 릴리스에서 패키지가 표준 라이브러리에 "잠정적"으로 포함되었다고 해서 다음 릴리스에서도 Python의 일부로 계속 유지될 것이라는 보장은 없다는 것입니다. 동시에 잠정적 패키지의 변경 사항을 만드는 기준은 상당히 높습니다. 대부분의 잠정적 패키지의 API 대부분은 졸업 시 변경되지 않을 것으로 예상됩니다. 철회는 드물게 발생할 것으로 예상됩니다.

## 근거 (Rationale)

### 코어 개발팀을 위한 이점 (Benefits for the core development team)

현재 코어 개발자들은 표준 라이브러리에 새로운 인터페이스를 추가하는 것을 매우 꺼려합니다. 이는 인터페이스가 릴리스되는 즉시 하위 호환성 문제로 인해 API 설계 실수가 고정되기 때문입니다.

모든 주요 API 추가를 전체 릴리스 기간 동안 일종의 잠정적 메커니즘을 통해 진행함으로써, 표준 하위 호환성 보장으로 API를 고정하기 전에 커뮤니티 피드백을 한 번의 전체 릴리스 주기 동안 얻을 수 있습니다.

또한 잠정적 패키지가 선택 사항으로 간주되어서는 안 된다는 것을 패키지 관리자에게 명확히 전달하는 한, 잠정적 패키지를 표준 라이브러리의 나머지 부분과 조기에 통합하기 시작할 수 있습니다. 잠정적 API와 표준 라이브러리의 나머지 부분의 유일한 차이점은 잠정적 API가 일반적인 하위 호환성 보장에서 명시적으로 면제된다는 것입니다.

### 최종 사용자를 위한 이점 (Benefits for end users)

미래의 최종 사용자에게 가장 폭넓은 이점은 더 나은 "즉시 사용 가능한(out-of-the-box)" 경험에 있습니다. "아, 작업 X를 위한 표준 라이브러리 도구는 끔찍하니, 대신 이 서드파티 라이브러리를 다운로드하세요"라는 말을 듣는 대신, 우수한 도구들이 import만 하면 바로 사용할 수 있게 될 가능성이 높습니다.

개발자가 상위 의존성에 대해 실사(due diligence)를 수행해야 하는 환경(PyPI의 많은 자료의 비용 효율성을 심각하게 해치거나 심지어 완전히 배제하는)의 경우, 주요 이점은 잠정적 상태의 모든 패키지가 최소한 다음 관점에서 `python-dev`의 보호 아래 있음을 보장하는 데 있습니다:

*   **라이선싱(Licensing):** Contributor Licensing Agreement(기여자 라이선스 계약)에 따라 PSF(Python Software Foundation)에 의해 재배포됩니다.
*   **문서화(Documentation):** 패키지 문서는 표준 Python 문서 도구(예: ReST 소스, Sphinx로 생성된 출력물 및 http://docs.python.org에 게시)를 통해 게시되고 정리됩니다.
*   **테스팅(Testing):** 패키지 테스트 스위트는 python.org buildbot 플릿에서 실행되고 결과는 http://www.python.org/dev/buildbot를 통해 게시됩니다.
*   **이슈 관리(Issue management):** 버그 및 기능 요청은 http://bugs.python.org에서 처리됩니다.
*   **소스 제어(Source control):** 소프트웨어의 마스터 저장소는 http://hg.python.org에 게시됩니다.

## 표준 라이브러리 잠정적 포함 후보 (Candidates for provisional inclusion into the standard library)

Python 3.3의 경우, 몇 가지 명확한 현재 후보들이 있습니다:

*   `regex` (http://pypi.python.org/pypi/regex) - Guido에 의해 승인됨.
*   `daemon` (PEP 3143)
*   `ipaddr` (PEP 3144)

그 외 가능한 미래 사용 사례는 다음과 같습니다:

*   개선된 HTTP 모듈 (예: `requests`)
*   HTML 5 파싱 지원 (예: `html5lib`)
*   개선된 URL/URI/IRI 파싱
*   표준 이미지 API (PEP 368)
*   import 상태의 개선된 캡슐화 (PEP 406)
*   표준 이벤트 루프 API (PEP 3153)
*   Python 3을 위한 WSGI의 바이너리 버전 (예: PEP 444)
*   제네릭 함수 지원 (예: `simplegeneric`)

## 거부된 대안 및 변형 (Rejected alternatives and variations)

PEP 408을 참조하십시오.

## 참조 (References)

*   https://mail.python.org/pipermail/python-dev/2012-January/115962.html

## 저작권 (Copyright)

이 문서는 공개 도메인에 배치되었습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.