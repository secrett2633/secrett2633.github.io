---
title: "[Final] PEP 226 - Python 2.1 Release Schedule"
excerpt: "Python Enhancement Proposal 226: 'Python 2.1 Release Schedule'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/226/
toc: true
toc_sticky: true
date: 2025-09-26 16:47:09+0900
last_modified_at: 2025-09-26 16:47:09+0900
published: true
---
> **원문 링크:** [PEP 226 - Python 2.1 Release Schedule](https://peps.python.org/pep-0226/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 16-Oct-2000


# PEP 226 – Python 2.1 릴리스 스케줄

**작성자:** Jeremy Hylton <jeremy at alum.mit.edu>
**상태:** Final (최종)
**유형:** Informational (정보성)
**주제:** Release (릴리스)
**생성일:** 2000년 10월 16일
**Python 버전:** 2.1
**Post-History:** (정보 없음)

## 초록 (Abstract)

이 문서는 Python 2.0 출시 이후의 개발 및 릴리스 스케줄을 설명합니다. 이 스케줄에 따르면, Python 2.1은 2001년 4월에 릴리스될 예정입니다. 이 스케줄은 주로 PEP-크기의 항목들을 다룹니다. 작은 버그 수정 및 변경 사항은 첫 번째 베타 릴리스까지 발생할 것입니다.

## 릴리스 스케줄 (Release Schedule)

**예정된 미래 릴리스 날짜:**

[버그 수정 릴리스 날짜는 여기에 명시됩니다.]

**과거 릴리스 날짜:**

*   2001년 4월 17일: 2.1 final release (최종 릴리스)
*   2001년 4월 15일: 2.1 release candidate 2 (릴리스 후보 2)
*   2001년 4월 13일: 2.1 release candidate 1 (릴리스 후보 1)
*   2001년 3월 23일: Python 2.1 beta 2 release (베타 2 릴리스)
*   2001년 3월 2일: First 2.1 beta release (첫 번째 베타 릴리스)
*   2001년 2월 2일: Python 2.1 alpha 2 release (알파 2 릴리스)
*   2001년 1월 22일: Python 2.1 alpha 1 release (알파 1 릴리스)
*   2000년 10월 16일: Python 2.0 final release (최종 릴리스)

## Python 2.0 베타 2의 미해결 문제 (Open issues for Python 2.0 beta 2)

*   표준 라이브러리에 기본 유닛 테스팅 프레임워크를 추가합니다.

## Python 2.1 변경을 위한 가이드라인 (Guidelines for making changes for Python 2.1)

가이드라인과 스케줄은 `python-dev@python.org` 메일링 리스트에서의 논의를 바탕으로 수정될 것입니다.

PEP 시스템은 Python 2.0 개발 주기 후반에 도입되었으며, 많은 변경 사항들이 PEP 1에 설명된 프로세스를 따르지 않았습니다. 그러나 2.1의 개발 프로세스는 문서화된 PEP 프로세스를 따를 것입니다.

Python 2.0 최종 릴리스 이후 처음 8주 동안은 설계 및 검토 단계가 됩니다. 이 기간이 끝날 때까지 2.1에 제안된 모든 PEP는 검토 준비가 되어야 합니다. 이는 PEP가 작성되었고 `python-dev@python.org` 및 `python-list@python.org` 메일링 리스트에서 논의가 이루어졌음을 의미합니다.

다음 6주 동안은 PEP들을 검토하고, 승인된 PEP들을 구현하고 테스트하는 데 사용될 것입니다. 이 기간이 끝나면, 미완성된 PEP에 대한 고려는 중단됩니다. 이 기간이 끝날 무렵에는 PEP에 해당할 정도는 아니지만 작은 기능들은 더 이상 수용되지 않는 Feature Freeze (기능 동결)가 있을 것입니다.

최종 릴리스 전에 6주의 베타 테스트 기간과 한두 번의 Release Candidate (릴리스 후보) 기간을 가질 것입니다.

## 패치 제출 및 변경 사항 적용을 위한 일반 가이드라인 (General guidelines for submitting patches and making changes)

변경 사항을 커밋(commit)할 때는 '상식(good sense)'을 사용하십시오. '상식'이 무엇을 의미하는지 알고 있어야 커밋 권한을 부여받았을 것입니다 <0.5 윙크>. '상식'의 몇 가지 구체적인 예시는 다음과 같습니다.

*   독재자(dictator)가 지시하는 모든 것을 따르십시오.
*   논란이 있는 변경 사항은 먼저 `python-dev`에서 논의하십시오. 만약 많은 +1 표를 받고 -1 표가 없다면 변경 사항을 적용하십시오. 만약 몇몇 -1 표를 받는다면, 다시 생각하고 Guido의 의견을 물어보는 것을 고려하십시오.
*   변경 사항이 본인이 기여한 코드에 대한 것이라면, 직접 수정하는 것이 합리적일 것입니다. 변경 사항이 다른 사람이 작성한 코드에 영향을 미친다면, 먼저 그 사람에게 문의하는 것이 합리적일 것입니다. SourceForge (SF) Patch Manager를 사용하여 패치를 제출하고 검토를 위해 다른 사람에게 할당할 수 있습니다.
*   모든 중요한 새 기능은 PEP에 설명되어야 하며, 체크인(check in)되기 전에 승인되어야 합니다.
*   새 모듈이나 큰 패치와 같은 중요한 코드 추가는 회귀 테스트(regression test)를 위한 테스트 케이스와 문서를 포함해야 합니다. 테스트와 문서가 준비될 때까지 패치를 체크인해서는 안 됩니다.
*   버그를 수정한다면, 그 버그를 발견할 수 있었을 테스트 케이스를 작성해야 합니다.
*   SF Patch Manager에서 패치를 커밋하거나 Jitterbug 데이터베이스에서 버그를 수정하는 경우, CVS 로그 메시지에 패치/버그 번호를 반드시 참조하십시오. 또한 패치 관리자 또는 버그 데이터베이스(접근 권한이 있는 경우)에서 상태를 변경해야 합니다.
*   체크인된 코드가 회귀 테스트를 실패하게 하는 것은 용납되지 않습니다. 체크인이 실패를 유발하는 경우, 24시간 이내에 수정해야 하며 그렇지 않으면 되돌려집니다(backed out).
*   기여된 모든 C 코드는 ANSI C여야 합니다. 가능하다면 `gcc` 및 `MSVC`와 같은 두 가지 다른 컴파일러로 확인하십시오.
*   기여된 모든 Python 코드는 Guido의 Python 스타일 가이드를 따라야 합니다.
    [http://www.python.org/doc/essays/styleguide.html](http://www.python.org/doc/essays/styleguide.html)
*   기여된 모든 코드는 오픈 소스(Open Source) 라이선스 하에 릴리스될 것으로 이해됩니다. 이러한 방식으로 릴리스될 수 없는 코드는 기여하지 마십시오.

---이 문서는 Python Enhancement Proposal (PEP) 226으로, Python 2.1의 릴리스 스케줄에 대한 정보를 제공합니다. 이 PEP는 Python 2.0 이후의 개발 및 릴리스 일정을 설명하며, Python 2.1이 2001년 4월에 릴리스될 예정임을 명시하고 있습니다. 주로 PEP-크기의 주요 변경 사항에 중점을 두며, 작은 버그 수정은 첫 번째 베타 릴리스까지 이루어질 것으로 예상됩니다.

## PEP 226 – Python 2.1 릴리스 스케줄

*   **작성자:** Jeremy Hylton <jeremy at alum.mit.edu>
*   **상태:** Final (최종)
*   **유형:** Informational (정보성)
*   **주제:** Release (릴리스)
*   **생성일:** 2000년 10월 16일
*   **Python 버전:** 2.1

### 초록 (Abstract)

이 문서는 Python 2.0 릴리스 이후의 개발 및 릴리스 스케줄을 설명합니다. 이 스케줄에 따르면, Python 2.1은 2001년 4월에 릴리스될 예정입니다. 이 스케줄은 주로 PEP-크기의 항목들을 다루며, 작은 버그 수정 및 변경 사항은 첫 번째 베타 릴리스까지 계속될 것입니다.

### 릴리스 스케줄 (Release Schedule)

**과거 릴리스 날짜:**

*   2001년 4월 17일: 2.1 최종 릴리스 (final release)
*   2001년 4월 15일: 2.1 릴리스 후보 2 (release candidate 2)
*   2001년 4월 13일: 2.1 릴리스 후보 1 (release candidate 1)
*   2001년 3월 23일: Python 2.1 베타 2 릴리스 (beta 2 release)
*   2001년 3월 2일: 첫 번째 2.1 베타 릴리스 (first beta release)
*   2001년 2월 2일: Python 2.1 알파 2 릴리스 (alpha 2 release)
*   2001년 1월 22일: Python 2.1 알파 1 릴리스 (alpha 1 release)
*   2000년 10월 16일: Python 2.0 최종 릴리스 (final release)

### Python 2.0 베타 2의 미해결 문제 (Open issues for Python 2.0 beta 2)

*   표준 라이브러리에 기본 유닛 테스팅 프레임워크를 추가해야 합니다.

### Python 2.1 변경을 위한 가이드라인 (Guidelines for making changes for Python 2.1)

가이드라인과 스케줄은 `python-dev@python.org` 메일링 리스트에서의 논의를 바탕으로 수정될 수 있습니다.

PEP 시스템은 Python 2.0 개발 주기 후반에 도입되었으므로, 많은 변경 사항이 PEP 1에 설명된 프로세스를 따르지 않았습니다. 그러나 Python 2.1의 개발 프로세스는 문서화된 PEP 프로세스를 따를 것입니다.

Python 2.0 최종 릴리스 이후 처음 8주 동안은 설계 및 검토 단계입니다. 이 기간이 끝날 때까지 2.1에 제안된 모든 PEP는 검토 준비가 되어야 하며, 이는 PEP가 작성되었고 `python-dev@python.org` 및 `python-list@python.org` 메일링 리스트에서 충분한 논의가 이루어졌음을 의미합니다.

다음 6주 동안은 PEP 검토, 승인된 PEP의 구현 및 테스트에 할애됩니다. 이 기간이 끝나면, 미완성된 PEP에 대한 고려는 중단됩니다. 이 기간 말에는 'Feature Freeze' (기능 동결)가 있을 예정이며, 이는 PEP에 해당할 정도는 아니지만 작은 기능들도 더 이상 수용되지 않음을 의미합니다.

최종 릴리스 전에는 6주간의 베타 테스트 기간과 한두 번의 Release Candidate (릴리스 후보) 기간을 가질 예정입니다.

### 패치 제출 및 변경 사항 적용을 위한 일반 가이드라인 (General guidelines for submitting patches and making changes)

변경 사항을 커밋(commit)할 때는 '상식(good sense)'을 사용해야 합니다. '상식'의 구체적인 예시는 다음과 같습니다:

*   독재자(dictator)의 지시를 따르십시오.
*   논란의 여지가 있는 변경 사항은 먼저 `python-dev`에서 논의하십시오. 만약 많은 +1 표를 받고 -1 표가 없다면 변경 사항을 적용하고, 만약 몇몇 -1 표를 받는다면 신중하게 고려하거나 Guido에게 의견을 물어보십시오.
*   변경 사항이 본인이 기여한 코드에 대한 것이라면 직접 수정하는 것이 합리적입니다. 다른 사람이 작성한 코드에 영향을 미치는 경우, 먼저 해당 작성자에게 문의하는 것이 좋습니다. SourceForge (SF) Patch Manager를 사용하여 패치를 제출하고 검토를 위해 다른 사람에게 할당할 수 있습니다.
*   모든 중요한 새 기능은 PEP에 설명되어야 하며, 코드에 반영(check in)되기 전에 승인되어야 합니다.
*   새로운 모듈이나 대규모 패치와 같은 중요한 코드 추가는 회귀 테스트(regression test)를 위한 테스트 케이스와 문서를 포함해야 합니다. 테스트와 문서가 준비될 때까지 패치를 반영해서는 안 됩니다.
*   버그를 수정한다면, 해당 버그를 발견할 수 있었을 테스트 케이스를 작성해야 합니다.
*   SF Patch Manager에서 패치를 커밋하거나 Jitterbug 데이터베이스에서 버그를 수정하는 경우, CVS 로그 메시지에 패치/버그 번호를 반드시 참조해야 합니다. 또한 패치 관리자 또는 버그 데이터베이스(접근 권한이 있는 경우)에서 상태를 변경해야 합니다.
*   코드 반영(checked in code)이 회귀 테스트를 실패하게 하는 것은 용납되지 않습니다. 만약 반영된 코드가 실패를 유발하면, 24시간 이내에 수정해야 하며 그렇지 않으면 되돌려집니다(backed out).
*   기여된 모든 C 코드는 ANSI C 표준을 따라야 합니다. 가능하다면 `gcc` 및 `MSVC`와 같은 두 가지 다른 컴파일러로 확인하십시오.
*   기여된 모든 Python 코드는 Guido의 Python 스타일 가이드라인을 따라야 합니다. (`http://www.python.org/doc/essays/styleguide.html`)
*   기여된 모든 코드는 오픈 소스(Open Source) 라이선스 하에 릴리스될 것으로 이해됩니다. 이 방식으로 릴리스될 수 없는 코드는 기여하지 마십시오.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.