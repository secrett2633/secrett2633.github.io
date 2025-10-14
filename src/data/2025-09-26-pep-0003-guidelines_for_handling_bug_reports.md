---
title: "[Withdrawn] PEP 3 - Guidelines for Handling Bug Reports"
excerpt: "Python Enhancement Proposal 3: 'Guidelines for Handling Bug Reports'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3/
toc: true
toc_sticky: true
date: 2025-09-26 15:37:46+0900
last_modified_at: 2025-09-26 15:37:46+0900
published: true
---
> **원문 링크:** [PEP 3 - Guidelines for Handling Bug Reports](https://peps.python.org/pep-0003/)
>
> **상태:** Withdrawn | **유형:** Process | **작성일:** 25-Sep-2000


# PEP 3 – 버그 보고서 처리 지침 (Withdraw)

**상태:** 철회됨 (Withdrawn)
**유형:** 프로세스 (Process)
**작성자:** Jeremy Hylton <jeremy at alum.mit.edu>
**생성일:** 2000년 9월 25일

---

**중요 공지:** 이 PEP는 철회되었습니다.

이 PEP는 Python 버그 트래커에서 버그 보고서를 처리하기 위한 지침을 담고 있었습니다. 현재는 이슈 분류(issue triaging)에 대한 개발자 가이드(Developer's Guide) 설명으로 대체되었습니다. Python 버그를 제출하는 사람들을 위한 지침은 Python 문서에서 확인할 수 있습니다.

## 원본 지침 (Original Guidelines)

*   **버그 분류 및 그룹 확인:** 버그 카테고리(category)와 버그 그룹(group)이 올바른지 확인하세요. 이 정보가 정확하면, 예를 들어 모든 열린 Tkinter 버그가 무엇인지 등 특정 분야에 관심 있는 사람이 더 쉽게 찾을 수 있습니다.
*   **사소한 기능 요청 처리:** 당장 해결할 계획이 없는 사소한 기능 요청(minor feature request)이라면, PEP 42에 추가하거나 소유자에게 대신 추가해달라고 요청하세요. 버그를 PEP 42에 추가하는 경우, 버그를 "feature request", "later", "closed"로 표시하고, 해당 버그에 PEP를 명시적으로 언급하는 코멘트를 추가하세요.
    *   *참고: 트래커와 PEP 42 중 어느 것을 선호하는지에 대한 질문이 있었습니다.*
*   **합리적인 우선순위 지정:** 버그에 합리적인 우선순위(priority)를 할당하세요. 각 우선순위가 무엇을 의미해야 하는지에 대한 명확한 기준은 아직 없지만, 한 가지 규칙은 "urgent" 또는 그 이상의 우선순위를 가진 버그는 다음 릴리스(release) 전에 반드시 수정되어야 한다는 것입니다.
*   **정보 부족 시 대처:** 버그 보고서에 버그를 재현(reproduce)하거나 진단(diagnose)할 충분한 정보가 없다면, 최초 제출자에게 추가 정보를 요청하세요. 최초 보고서가 매우 부실하고 합리적인 대기 기간 후에도 이메일 응답이 없다면 버그를 닫을 수 있습니다.
*   **버그 수정 완료 시:** 버그를 수정했다면, 상태를 "Fixed"로 표시하고 닫으세요. 코멘트에는 커밋(commit)의 SVN 리비전 번호(revision numbers)를 포함하세요. SVN 체크인 메시지에는 이슈 번호(issue number)와 변경 사항에 대한 일반적인 설명(description)을 포함하고, 패치가 적용되었다면 기여자(contributor)를 언급하세요.
*   **처리 불가능한 버그 할당 변경:** 처리할 수 없는 버그가 할당되었다면, 해당 버그를 처리할 수 있다고 생각하는 다른 사람에게 할당하거나, 그렇지 않으면 할당을 해제하는 것이 가장 좋습니다.

## 참조 (References)

*   https://bugs.python.org

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.