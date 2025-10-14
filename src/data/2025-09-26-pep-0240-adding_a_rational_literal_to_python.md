---
title: "[Rejected] PEP 240 - Adding a Rational Literal to Python"
excerpt: "Python Enhancement Proposal 240: 'Adding a Rational Literal to Python'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/240/
toc: true
toc_sticky: true
date: 2025-09-26 17:10:32+0900
last_modified_at: 2025-09-26 17:10:32+0900
published: true
---
> **원문 링크:** [PEP 240 - Adding a Rational Literal to Python](https://peps.python.org/pep-0240/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 11-Mar-2001

## PEP 240 – Python에 유리수 리터럴 추가

*   **작성자:** Christopher A. Craig, Moshe Zadka
*   **상태:** Rejected (거부됨)
*   **유형:** Standards Track
*   **생성일:** 2001년 3월 11일
*   **Python 버전:** 2.2
*   **변경 이력:** 2001년 3월 16일

---

### 목차

*   [요약 (Abstract)](#요약-abstract)
*   [BDFL의 선언 (BDFL Pronouncement)](#bdfl의-선언-bdfl-pronouncement)
*   [배경 (Rationale)](#배경-rationale)
*   [제안 (Proposal)](#제안-proposal)
*   [하위 호환성 (Backwards Compatibility)](#하위-호환성-backwards-compatibility)
*   [일반적인 반대 의견 (Common Objections)](#일반적인-반대-의견-common-objections)
*   [참고 자료 (References)](#참고-자료-references)
*   [저작권 (Copyright)](#저작권-copyright)

---

### 요약 (Abstract)

다른 PEP에서 Python에 내장 유리수 (rational) 타입을 추가할 것을 제안했습니다. 이 PEP는 `ddd.ddd` 형태의 부동 소수점 (float) 리터럴을 Python에서 유리수로 변경하고, 정수 나누기 (non-integer division)가 유리수를 반환하도록 수정할 것을 제안합니다.

### BDFL의 선언 (BDFL Pronouncement)

이 PEP는 거부되었습니다. 배경 (Rationale) 섹션에서 설명된 필요성은 PEP 327 (decimal arithmetic)의 채택으로 어느 정도 해결되었습니다. Guido는 또한 "ABC 언어에서 유리수 연산이 기본 '정확한' 연산이었지만, 예상대로 작동하지 않았다"고 언급했습니다. 2005년 6월 17일 python-dev 토론을 참조하십시오.

### 배경 (Rationale)

유리수는 정확하고 예상 가능한 연산에 유용합니다. 이는 다양한 수학 수업에서 사람들이 배운 정확한 결과를 제공합니다. "명백한" 비정수 (non-integer) 타입을 더 예측 가능한 의미론을 가진 유리수로 만들면, 부동 소수점 숫자를 사용하는 것보다 새로운 프로그래머들이 덜 당황할 것입니다. c.l.py와 tutor@python.org에 올라온 많은 게시물에서 알 수 있듯이, 사람들은 부동 소수점 숫자의 이상한 의미론 때문에 종종 어려움을 겪습니다. 예를 들어, `round(0.98, 2)`는 여전히 `0.97999999999999998`을 반환합니다.

### 제안 (Proposal)

정규 표현식 `'\d*.\d*'`에 해당하는 리터럴은 유리수 (rational numbers)가 될 것입니다.

### 하위 호환성 (Backwards Compatibility)

유일한 하위 호환성 문제는 위에서 언급된 리터럴의 타입입니다. 다음 마이그레이션이 제안됩니다:

승인 후 다음 Python 버전에서는 `from __future__ import rational_literals`를 통해 해당 리터럴들이 모두 유리수로 처리되도록 할 것입니다. Python 3.0에서는 `__future__` 문이 없을 경우, 이러한 리터럴에 대한 경고가 기본적으로 켜질 것입니다. 경고 메시지는 `__future__` 문에 대한 정보를 포함하고, 부동 소수점 리터럴을 얻으려면 `e0` 접미사를 붙여야 함을 알려줄 것입니다. Python 3.1에서는 이 경고가 기본적으로 꺼질 것입니다. 이 경고는 24개월 동안 유지되며, 그 시점에는 리터럴이 유리수가 되고 경고는 제거될 것입니다.

### 일반적인 반대 의견 (Common Objections)

*   **유리수는 느리고 메모리를 많이 소모합니다!** (진정하세요, float을 없애는 것이 아니라 두 문자를 더 추가하는 것뿐입니다. `1e0`은 여전히 float일 것입니다.)
*   유리수는 십진수를 기대하는 사용자에게 끔찍한 경험을 주지 않으려면 십진 부동 소수점 (decimal float)으로 스스로를 표현해야 합니다 (즉, `str(.5)`는 `'1/2'`가 아니라 `'.5'`를 반환해야 합니다). 이는 많은 유리수가 특정 시점에서 잘려야 함을 의미하며, 이는 새로운 정밀도 손실을 야기합니다.

### 참고 자료 (References)

 Raymond Hettinger, Propose rejection of PEPs 239 and 240 – a builtin rational type and rational literals

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.