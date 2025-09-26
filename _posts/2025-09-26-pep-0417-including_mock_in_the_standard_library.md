---
title: "[Final] PEP 417 - Including mock in the Standard Library"
excerpt: "Python Enhancement Proposal 417: 'Including mock in the Standard Library'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/417/
toc: true
toc_sticky: true
date: 2025-09-26 21:35:01+0900
last_modified_at: 2025-09-26 21:35:01+0900
published: true
---
> **원문 링크:** [PEP 417 - Including mock in the Standard Library](https://peps.python.org/pep-0417/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 12-Mar-2012


## PEP 417: `mock` 라이브러리의 표준 라이브러리 포함

-   **작성자:** Michael Foord
-   **상태:** Final (최종)
-   **타입:** Standards Track
-   **생성일:** 2012년 3월 12일
-   **Python 버전:** 3.3
-   **결의:** Python-Dev 메시지

### 초록 (Abstract)

이 PEP는 `mock` 테스팅 라이브러리를 `unittest.mock`이라는 이름으로 Python 표준 라이브러리에 추가할 것을 제안합니다.

### 도입 배경 (Rationale)

테스트를 위해 목(mock) 객체를 생성하는 것은 Python 개발에서 흔히 필요한 작업입니다. 많은 개발자는 테스트 스위트(test suite)에서 필요에 따라 임시적인 목(ad-hoc mock) 객체를 만듭니다. 이는 현재 Python 자체의 테스트 스위트에서도 이루어지고 있는데, 표준화된 목(mock) 객체 라이브러리가 있다면 유용할 것입니다.

Python에는 여러 목(mock) 객체 라이브러리가 존재합니다. 이 중에서 `mock` 라이브러리는 압도적으로 가장 인기가 많으며, PyPI 다운로드 수가 다른 모든 목(mocking) 라이브러리를 합친 것과 같습니다.

`mock` 라이브러리의 장점은 단순히 목(mocking) 라이브러리일 뿐, 특정 프레임워크가 아니라는 점입니다. 이 라이브러리는 테스트를 작성하는 방식에 대해 의견을 제시하지 않으면서도, 설정 가능하고 유연한 목(mock) 객체를 제공합니다. `mock`의 API는 오랜 시간 동안 실제 환경에서 검증되었으며 안정적입니다.

또한, `mock`은 테스트 범위 내에서 객체를 안전하게 몽키패치(monkeypatching)하고 언몽키패치(unmonkeypatching)하는 기능을 처리합니다. 이는 안전하게 구현하기 어려운 작업이며, 많은 개발자나 프로젝트에서 이 기능을 (종종 잘못된 방식으로) 모방하고 있습니다. 디스크립터 프로토콜(descriptor protocol) 등의 복잡성을 처리하며 패치(patching)를 수행하는 표준화된 방법은 매우 유용합니다. 개발자들은 `unittest`에 "패치(patch)" 기능을 추가해달라고 요청하고 있습니다. 이러한 기능은 `unittest` 내에서 일부를 재구현하는 것보다 `mock.patch`를 통해 구현하는 것이 더 바람직합니다.

### 역사적 배경 (Background)

`mock` 라이브러리를 Python 표준 라이브러리에 추가하는 문제는 2012년 Python Language Summit에서 논의되었고 합의에 이르렀습니다.

### 미해결 과제 (Open Issues)

작성 시점의 최신 릴리스인 `mock` 0.8 버전은 Python 2.4부터 3.2까지 호환됩니다. Python 표준 라이브러리에 포함되면 일부 Python 2 전용 "호환성 핵(compatibility hacks)"을 제거할 수 있습니다.

`mock` 0.8은 새로운 기능인 "auto-speccing"을 도입하여 기존의 "mocksignature" 기능을 대체했습니다. "mocksignature" 기능은 표준 라이브러리 포함 전에 `mock`에서 완전히 제거될 수 있습니다.

---

이 번역문이 Python 개발자 여러분이 PEP 417의 내용을 이해하고, `unittest.mock`의 도입 배경과 그 중요성을 파악하는 데 도움이 되기를 바랍니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.