---
title: "[Final] PEP 251 - Python 2.2 Release Schedule"
excerpt: "Python Enhancement Proposal 251: 'Python 2.2 Release Schedule'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/251/
toc: true
toc_sticky: true
date: 2025-09-26 17:27:59+0900
last_modified_at: 2025-09-26 17:27:59+0900
published: true
---
> **원문 링크:** [PEP 251 - Python 2.2 Release Schedule](https://peps.python.org/pep-0251/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 17-Apr-2001

## PEP 251 – Python 2.2 릴리스 일정

이 문서는 Python 2.2의 개발 및 릴리스 일정을 설명하며, 주로 PEP 규모의 항목들에 초점을 맞춥니다. 작은 버그 수정 및 변경 사항은 첫 번째 베타 릴리스 전까지 발생했습니다. 아래 일정은 Python 2.2의 실제 릴리스 날짜를 나타냅니다. 이후의 Python 2.2 유지보수 릴리스는 별도의 PEP 문서에서 다룹니다.

### 문서 개요
*   **작성자:** Barry Warsaw, Guido van Rossum
*   **상태:** Final (최종)
*   **유형:** Informational (정보성)
*   **주제:** Release (릴리스)
*   **생성일:** 2001년 4월 17일
*   **Python 버전:** 2.2
*   **이력:** 2001년 8월 14일

### 릴리스 일정
다음은 Python 2.2의 최종 릴리스 날짜입니다.
*   **2001년 12월 21일:** 2.2 [릴리스 완료] (최종 릴리스)
*   **2001년 12월 14일:** 2.2c1 [릴리스 완료]
*   **2001년 11월 14일:** 2.2b2 [릴리스 완료]
*   **2001년 10월 19일:** 2.2b1 [릴리스 완료]
*   **2001년 9월 28일:** 2.2a4 [릴리스 완료]
*   **2001년 9월 7일:** 2.2a3 [릴리스 완료]
*   **2001년 8월 22일:** 2.2a2 [릴리스 완료]
*   **2001년 7월 18일:** 2.2a1 [릴리스 완료]

### 릴리스 관리자 (Release Manager)
Python 2.2의 릴리스 관리자는 Barry Warsaw였습니다.

### 릴리스 방식 (Release Mechanics)
Python 2.2 릴리스에서는 새로운 방식이 시도되었습니다. 모든 알파(alpha), 베타(beta) 또는 기타 릴리스가 나오기 일주일 전에, 릴리스가 될 브랜치(branch)를 분기(fork)했습니다. 이 브랜치에 대한 변경 사항은 릴리스 관리자와 그가 지정한 '봇(bots)'으로 제한되었습니다. 이 실험은 성공적이었으며 향후 릴리스에서도 적용되어야 한다고 평가되었습니다. 실제 릴리스 방식에 대한 자세한 내용은 PEP 101을 참조하십시오.

### Python 2.2의 새로운 기능
Python 2.2에 도입된 새로운 기능들은 다음과 같습니다. 더 자세한 내용은 Python 배포판의 `Misc/NEWS` 파일 또는 Andrew Kuchling의 "What's New in Python 2.2" 문서를 참조하십시오.
*   **Iterators (이터레이터)** (PEP 234)
*   **Generators (제너레이터)** (PEP 255)
*   **long ints와 plain ints의 통합** (PEP 237)
*   **나눗셈 연산자 변경** (PEP 238)
*   **타입(types)과 클래스(classes)의 통합** (PEP 252, PEP 253)

### 참고 자료 (References)
*   **** Misc/NEWS file from CVS
    `http://cvs.sourceforge.net/cgi-bin/viewcvs.cgi/python/python/dist/src/Misc/NEWS?rev=1.337.2.4&content-type=text/vnd.viewcvs-markup`
*   **** Andrew Kuchling, What's New in Python 2.2
    `http://www.python.org/doc/2.2.1/whatsnew/whatsnew22.html`

### 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain)으로 지정되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.