---
title: "[Final] PEP 628 - Addmath.tau"
excerpt: "Python Enhancement Proposal 628: 'Addmath.tau'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/628/
toc: true
toc_sticky: true
date: 2025-09-27 00:30:25+0900
last_modified_at: 2025-09-27 00:30:25+0900
published: true
---
> **원문 링크:** [PEP 628 - Addmath.tau](https://peps.python.org/pep-0628/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 28-Jun-2011

# PEP 628 – `math.tau` 추가 제안

## 개요
이 문서는 Python 표준 라이브러리에 원 상수 `math.tau`를 추가할 것을 제안합니다. `tau (τ)`의 개념은 원의 둘레(circumference)와 반지름(radius)의 비율이 둘레와 지름(diameter)의 비율보다 훨씬 더 근본적이고 흥미롭다는 관찰에 기반합니다. `tau`는 단순히 `2 * pi (2π)` 값에 이름을 할당한 것입니다.

## PEP 수락
이 PEP는 수락되었으며, `math.tau`는 Python 3.6에 포함되었습니다. 이 아이디어는 이슈 12345를 통해 구현되었습니다.

## `tau` 도입의 배경
`pi (π)`는 원의 둘레와 지름의 비율로 정의됩니다. 하지만 원은 중심점과 반지름에 의해 정의됩니다. 이는 원의 둘레에서 넓이(area)로 이동하는 통합(integration) 매개변수가 지름이 아닌 반지름이라는 점을 통해 명확히 드러납니다. 만약 지름을 사용한다면 불필요한 곱셈 계수(extraneous multiplier)를 제거하기 위해 4로 나누어야 합니다.

라디안(radians)을 사용하여 작업할 때, 원의 특정 부분을 `tau`의 관점에서 라디안 값으로 변환하는 것은 매우 간단합니다.
*   4분의 1원은 `tau/4`
*   반원은 `tau/2`
*   25분의 7은 `7*tau/25`

이와 대조적으로 `pi`를 사용하는 동등한 표현(`pi/2`, `pi`, `14*pi/25`)에서는 불필요하고 혼란스러운 2의 곱셈이 사라집니다.

`tau`를 사용함으로써 수학의 많은 측면이 `pi`를 사용할 때보다 훨씬 더 쉽고 합리적으로 변한다는 점을 지적하는 수많은 사례들이 있습니다.

## 추가 자료
`tau`와 관련된 추가 자료는 다음과 같습니다.
*   `Tau Day`의 주요 창시자인 Michael Hartl의 `Tau Manifesto`
*   `pi`의 문제점을 강조한 원본 수학 저널 논문의 저자인 Bob Palais의 관련 자료 페이지
*   문자보다 영상을 선호하는 사람들을 위한 `Pi is wrong!` 및 `Pi is (still) wrong` 비디오

## 저작권
이 문서는 퍼블릭 도메인에 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.