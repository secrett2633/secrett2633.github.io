---
title: "[Active] PEP 20 - The Zen of Python"
excerpt: "Python Enhancement Proposal 20: 'The Zen of Python'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/20/
toc: true
toc_sticky: true
date: 2025-09-26 15:55:10+0900
last_modified_at: 2025-09-26 15:55:10+0900
published: true
---
> **원문 링크:** [PEP 20 - The Zen of Python](https://peps.python.org/pep-0020/)
>
> **상태:** Active | **유형:** Informational | **작성일:** 19-Aug-2004

## PEP 20 – 파이썬의 정신 (The Zen of Python)

**저자:** Tim Peters <tim.peters at gmail.com>
**상태:** Active (활성)
**유형:** Informational (정보성)
**생성일:** 2004년 8월 19일

---

### 개요 (Abstract)

오랜 기간 파이썬 개발자로 활동해 온 팀 피터스(Tim Peters)는 파이썬의 디자인을 이끄는 BDFL(Benevolent Dictator for Life, 자비로운 종신 독재자)의 원칙들을 20개의 금언으로 간결하게 정리했습니다. 이 금언 중 현재 19개만이 작성되어 있습니다. 이 PEP는 파이썬 언어의 핵심 철학을 담고 있으며, `import this` 명령을 통해 파이썬 인터프리터 내에서 직접 확인할 수 있습니다.

### 파이썬의 정신 (The Zen of Python)

다음은 파이썬 언어의 디자인 철학이자 파이썬 코드를 작성할 때 지침이 되는 19가지 금언입니다.

*   **Beautiful is better than ugly.**
    아름다운 것이 추한 것보다 낫다.
*   **Explicit is better than implicit.**
    명시적인 것이 암시적인 것보다 낫다.
*   **Simple is better than complex.**
    간단한 것이 복잡한 것보다 낫다.
*   **Complex is better than complicated.**
    복잡한 것이 난해한 것보다 낫다. (복잡하더라도 이해할 수 있는 구조가 더 낫다는 의미)
*   **Flat is better than nested.**
    평평한 것이 중첩된 것보다 낫다.
*   **Sparse is better than dense.**
    여유로운 것이 밀집된 것보다 낫다. (코드의 여백과 구조화를 강조)
*   **Readability counts.**
    가독성은 중요하다.
*   **Special cases aren't special enough to break the rules.**
    특별한 경우라도 규칙을 깰 만큼 특별하지는 않다.
*   **Although practicality beats purity.**
    하지만 실용성이 순수성보다 우선한다.
*   **Errors should never pass silently.**
    오류는 절대 조용히 넘어가지 않아야 한다.
*   **Unless explicitly silenced.**
    명시적으로 무시하도록 처리된 경우가 아니라면.
*   **In the face of ambiguity, refuse the temptation to guess.**
    모호함에 직면했을 때는 추측하려는 유혹을 거부하라.
*   **There should be one—and preferably only one—obvious way to do it.**
    어떤 일을 하는 데에는 한 가지, 그리고 가급적이면 명확한 한 가지 방법만이 존재해야 한다.
*   **Although that way may not be obvious at first unless you're Dutch.**
    비록 당신이 네덜란드인이 아니라면 그 방법이 처음에는 명확하지 않을 수도 있겠지만. (파이썬 창시자 귀도 반 로섬(Guido van Rossum)이 네덜란드인임을 암시)
*   **Now is better than never.**
    지금 하는 것이 절대 안 하는 것보다 낫다.
*   **Although never is often better than *right* now.**
    하지만 '바로 지금' 안 하는 것이 '절대 안 하는 것'보다 나은 경우도 많다. (성급한 구현보다는 충분한 고려 후 구현이 낫다는 의미)
*   **If the implementation is hard to explain, it's a bad idea.**
    구현이 어렵게 설명된다면, 그것은 좋지 않은 아이디어다.
*   **If the implementation is easy to explain, it may be a good idea.**
    구현이 쉽게 설명된다면, 그것은 좋은 아이디어일 수 있다.
*   **Namespaces are one honking great idea—let's do more of those!**
    네임스페이스(Namespaces)는 정말 대단한 아이디어다 — 더 많이 활용하자!

### 이스터 에그 (Easter Egg)

파이썬 인터프리터에서 `import this` 명령을 실행하면 위 "파이썬의 정신"을 직접 볼 수 있습니다.

```python
>>> import this
```

### 참고 자료 (References)

이 내용은 원래 `comp.lang.python/python-list@python.org`의 "The Way of Python"이라는 스레드에 게시되었습니다.

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.