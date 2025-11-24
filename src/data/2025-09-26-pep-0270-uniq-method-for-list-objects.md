---
title: "[Rejected] PEP 270 - uniq method for list objects"
excerpt: "Python Enhancement Proposal 270: 'uniq method for list objects'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/270/
toc: true
toc_sticky: true
date: 2025-09-26 17:51:43+0900
last_modified_at: 2025-09-26 17:51:43+0900
published: true
---
> **원문 링크:** [PEP 270 - uniq method for list objects](https://peps.python.org/pep-0270/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 21-Aug-2001


# PEP 270: `list` 객체를 위한 `uniq` 메서드

*   **작성자:** Jason Petrone
*   **상태:** Rejected (거절됨)
*   **유형:** Standards Track
*   **생성일:** 2001년 8월 21일
*   **Python 버전:** 2.2

## 목차
1.  주의 (Notice)
2.  개요 (Abstract)
3.  제안 배경 (Rationale)
4.  고려 사항 (Considerations)
5.  참고 구현 (Reference Implementation)
6.  저작권 (Copyright)

---

## 1. 주의 (Notice)

이 PEP는 작성자에 의해 철회되었습니다. 작성자는 다음과 같이 설명했습니다:
"리스트에서 중복 요소를 제거하는 것은 흔한 작업이지만, 이를 내장(built-in) 기능으로 만들 만한 두 가지 이유 외에는 다른 이유를 찾을 수 없었습니다. 첫째는 훨씬 더 빠르게 구현할 수 있는 경우인데, 실제로는 그렇지 않습니다. 둘째는 코드를 작성하는 것이 훨씬 쉬워지는 경우입니다. `sets.py`의 도입으로 이 상황은 해소되었습니다. 중복 없는 시퀀스를 생성하는 것은 단순히 다른 데이터 구조, 즉 `list` 대신 `set`을 선택하는 문제가 되었기 때문입니다."

PEP 218에 설명된 대로, `set`은 Python 2.3부터 표준 라이브러리에 추가되었습니다.

## 2. 개요 (Abstract)

이 PEP는 `list` 객체에 중복 요소를 제거하는 메서드를 추가할 것을 제안합니다.

## 3. 제안 배경 (Rationale)

리스트에서 중복 요소를 제거하는 것은 매우 흔한 작업입니다. 작성자는 이 기능이 `list` 객체의 메서드로 포함될 만큼 유용하고 일반적이라고 생각했습니다. 특히 해싱(hashing)이나 정렬(sorting)을 통한 최적화를 사용할 수 없는 경우, C로 구현될 때 더 빠른 실행을 기대할 수 있었습니다.

`comp.lang.python` 뉴스그룹에는 이 작업을 수행하는 가장 좋은 방법에 대해 묻는 게시물들이 매우 많았습니다. 최적의 방법으로 구현하기가 다소 까다롭기 때문에, 개발자들이 스스로 방법을 찾아야 하는 번거로움을 덜어주는 것이 좋겠다고 보았습니다.

## 4. 고려 사항 (Considerations)

Tim Peters는 해시 테이블 사용을 시도한 다음, 정렬을 시도하고, 마지막으로 무차별 대입(brute force) 방식으로 폴백(fallback)하는 방법을 제안했습니다. 이 과정에서 다음과 같은 질문들이 제기되었습니다:
*   `uniq` 메서드가 속도 저하를 감수하고서라도 리스트의 순서를 유지해야 하는가?
*   메서드 이름은 `uniq`가 되어야 하는가, 아니면 `unique`가 되어야 하는가?

## 5. 참고 구현 (Reference Implementation)

작성자는 무차별 대입 방식의 구현을 작성했습니다. 이 구현은 `listobject.c` 파일에 약 20줄의 코드였습니다. 해시 테이블 및 정렬을 통한 중복 제거 지원을 추가하는 데는 한 시간 정도만 더 소요될 것으로 예상되었습니다.

## 6. 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 있습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.