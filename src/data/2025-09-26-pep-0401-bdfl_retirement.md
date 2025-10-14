---
title: "[April Fool!] PEP 401 - BDFL Retirement"
excerpt: "Python Enhancement Proposal 401: 'BDFL Retirement'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/401/
toc: true
toc_sticky: true
date: 2025-09-26 21:25:14+0900
last_modified_at: 2025-09-26 21:25:14+0900
published: true
---
> **원문 링크:** [PEP 401 - BDFL Retirement](https://peps.python.org/pep-0401/)
>
> **상태:** April Fool! | **유형:** Process | **작성일:** 01-Apr-2009


# PEP 401 – BDFL 은퇴

*   **작성자:** Barry Warsaw, Brett Cannon
*   **상태:** 만우절! (April Fool!)
*   **유형:** Process (프로세스)
*   **생성일:** 2009년 4월 1일
*   **후속 기록:** 2009년 4월 1일

## 개요 (Abstract)

20년 동안 Python 개발을 이끌어온 BDFL이 즉시 은퇴를 공식적으로 발표합니다. 만장일치 투표를 통해 그의 후임자가 지명되었습니다.

## 배경 (Rationale)

Guido는 1989년에 Python의 초기 구현을 작성했으며, 거의 20년 동안 커뮤니티를 이끌어온 후 '평생의 자비로운 독재자(Benevolent Dictator For Life, BDFL)' 자리에서 물러나기로 결정했습니다. 그의 공식 직함은 이제 '언어로부터 무기한 휴가 중인 자비로운 독재자 명예회장 (Benevolent Dictator Emeritus Vacationing Indefinitely from the Language, BDEVIL)'이 됩니다. Guido는 에베레스트 등반이라는 평생의 꿈을 위해 훈련하기 위해 Python을 새로운 리더와 활기찬 커뮤니티의 좋은 손에 맡깁니다.

2009년 Python Conference (PyCon 2009)에서 Python Steering Union (확실히 존재하지 않는 Python Secret Underground와 혼동하지 마세요)의 만장일치 투표 끝에 Guido의 후임자로 Barry Warsaw, 애칭으로 "Uncle Barry"가 선정되었습니다. Uncle Barry의 공식 직함은 '평생의 친근한 언어 삼촌 (Friendly Language Uncle For Life, FLUFL)'입니다.

## FLUFL의 공식적인 결정 (Official Acts of the FLUFL)

FLUFL Uncle Barry는 그의 전임자(이름을 기억하지 못함)와 동일하게 책임감 있고 개방적인 방식으로 커뮤니티를 이끌겠다는 의지를 보여주기 위해 다음 결정을 시행합니다.

*   **DVCS 변경:** Hg (Mercurial)를 분산 버전 관리 시스템 (DVCS)으로 선택한 것은 BDEVIL의 정신 이상 발병의 명확한 증거임을 인식하고, 이 결정을 취소하여 유일한 진정한 선택인 Bzr (Bazaar)로 전환합니다.
*   **`!=` 연산자 변경:** Python 3.0의 `!=` (불평등) 연산자는 끔찍하고 손가락 통증을 유발하는 실수였음을 인식하고, FLUFL은 `기호`를 유일한 표기로 복원합니다. 이 변경 사항은 Python 3.1에 구현 및 출시될 만큼 중요합니다. 이 기능으로의 전환을 돕기 위해 새로운 future statement인 `from __future__ import barry_as_FLUFL`이 추가되었습니다.
*   **`print()` 함수 변경:** Python 3.0의 `print()` 함수는 끔찍하고 고통을 유발하는 실수였음을 인식하고, FLUFL은 `print` 문(statement)을 복원합니다. 이 변경 사항은 Python 3.0.2에 구현 및 출시될 만큼 중요합니다.
*   **Python 3.x 개발 종료:** Python 3.0의 실망스러운 채택 곡선이 완전한 실패를 알린다고 인식하여, Python 3.1 및 이후의 Python 3.x 버전의 모든 작업은 이로써 종료됩니다. Python 3.0의 모든 기능은 Python 2.7로 백포트될 것이며, Python 2.7이 공식적인 유일한 다음 릴리스가 될 것입니다. 개발자들의 편의를 위해 Python 3.0의 string 및 bytes 타입은 Python 2.6.2로 백포트됩니다.
*   **CPython 개발 종료 및 Parrot VM으로 전환:** C가 30세 미만 프로그래머들로부터 거의 보편적으로 거부당하는 20세기 언어임을 인식하여, CPython 구현은 Python 2.6.2 및 3.0.2 릴리스와 함께 종료됩니다. 이후 Python의 참조 구현은 Parrot 가상 머신 을 목표로 합니다. 다른 Python 구현 (예: Jython, IronPython, PyPy)은 공식적으로 권장되지 않지만 허용됩니다.
*   **Python Software Foundation 해체:** Python Software Foundation (PSF)이 그 임무를 훌륭하게 완수했음을 인식하여, 이로써 해체됩니다. Python Steering Union (확실히 존재하지 않는 Python Secret Underground와 혼동하지 마세요)이 이제 모든 Python의 지적 재산에 대한 유일한 관리자가 됩니다. 모든 PSF 자금은 이로써 PSU (그 PSU 말고, 다른 PSU)로 이전됩니다.

## 저작권 (Copyright)

이 문서는 Python Steering Union (확실히 존재하지 않는 Python Secret Underground와 혼동하지 마세요)의 소유입니다. 읽는 것은 괜찮지만, 인용, 복사, 수정 또는 배포에 대해서는 생각조차 하지 마십시오.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.