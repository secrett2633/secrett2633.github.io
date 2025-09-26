---
title: "[Active] PEP 4 - Deprecation of Standard Modules"
excerpt: "Python Enhancement Proposal 4: 'Deprecation of Standard Modules'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/4/
toc: true
toc_sticky: true
date: 2025-09-26 15:38:53+0900
last_modified_at: 2025-09-26 15:38:53+0900
published: true
---
> **원문 링크:** [PEP 4 - Deprecation of Standard Modules](https://peps.python.org/pep-0004/)
>
> **상태:** Active | **유형:** Process | **작성일:** 01-Oct-2000


PEP 4 – 표준 모듈의 Deprecation (폐기 예정)

## PEP 4 – 표준 모듈의 Deprecation

**작성자:** Brett Cannon <brett at python.org>, Martin von Löwis <martin at v.loewis.de>
**상태:** Active (활성)
**유형:** Process (프로세스)
**생성일:** 2000년 10월 1일
**이력:** (내용 없음)

---

### 서론

과거에 새로운 모듈이 표준 Python 라이브러리에 추가되었을 때, 이 모듈들이 미래에도 계속 유용할지 예측하는 것은 불가능했습니다. Python은 "배터리가 포함된" (Comes With Batteries Included) 언어로 알려져 있지만, 배터리도 시간이 지나면 방전될 수 있습니다. 오래된 모듈을 계속 유지하는 것은 관리자에게 부담이 되며, 특히 해당 모듈에 대한 관심이 더 이상 없을 때는 더욱 그렇습니다.

동시에, 어떤 사용자가 해당 모듈을 여전히 사용하고 있는지 일반적으로 알 수 없기 때문에, 배포판에서 모듈을 제거하는 것은 어렵습니다. 이 PEP는 표준 Python 라이브러리에서 모듈을 제거하는 절차를 정의합니다. 모듈의 사용은 'deprecated' (폐기 예정)될 수 있으며, 이는 해당 모듈이 향후 Python 릴리스에서 제거될 수 있음을 의미합니다.

### 모듈을 Deprecated (폐기 예정)로 선언하는 절차

표준 라이브러리에서 최상위 모듈/패키지를 제거하려면 PEP가 필요합니다. Deprecation 프로세스는 PEP 387에 명시되어 있습니다.

표준 라이브러리 내 패키지의 하위 모듈(submodule)을 제거하는 경우, PEP 387을 따라야 하지만 별도의 PEP는 필요하지 않습니다.

### 저작권

본 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.