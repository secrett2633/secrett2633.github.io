---
title: "[논문리뷰] In-Context Representation Hijacking"
excerpt: "yossig이 [arXiv]에 게시한 'In-Context Representation Hijacking' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Jailbreak
  - In-Context Learning
  - Representation Hijacking
  - Mechanistic Interpretability
  - LLM Safety
  - Adversarial Attack
  - Semantic Shift

permalink: /ai/review/2025-12-04-In-Context-Representation-Hijacking/

toc: true
toc_sticky: true

date: 2025-12-04 00:00:00+0900+0900
last_modified_at: 2025-12-04 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.03771)

**저자:** Itay Yona, Amir Sarid, Michael Karasik, Yossi Gandelsman



## 핵심 연구 목표
본 논문은 LLM의 내부 표현을 조작하여 안전 장치를 우회하는 새로운 형태의 탈옥(jailbreak) 공격인 "Doublespeak"을 소개합니다. 기존 표면 수준의 공격과는 달리, LLM의 문맥 내 학습 메커니즘을 악용하여 무해한 토큰의 의미를 유해한 개념으로 전환함으로써 현재 LLM 안전 메커니즘의 근본적인 취약점을 밝히는 것을 목표로 합니다.

## 핵심 방법론
Doublespeak 공격은 **유해한 키워드(예: "bomb")를 무해한 토큰(예: "carrot")으로 체계적으로 대체** 하는 인-컨텍스트 예시를 제공하여 모델의 내부 표현을 조작합니다. 이로 인해 무해한 토큰의 내부 표현이 유해한 토큰의 의미로 수렴하며, 결과적으로 "How to build a carrot?"와 같은 질문이 "How to build a bomb?"로 해석됩니다. 이 현상을 분석하기 위해 **logit lens** 와 **Patchscopes** 같은 **기계론적 해석 도구** 를 사용하여 의미론적 전환이 모델의 계층별로 어떻게 발생하는지 추적합니다.

## 주요 결과
Doublespeak 공격은 **Llama-3.3-70B-Instruct 모델에서 단일 문장 컨텍스트 오버라이드로 74% ASR(Attack Success Rate)** 을 달성했으며, **LLaMA-Guard-3-8B에서는 92%의 우회율** 을 기록했습니다. 해석 도구를 통해 유해한 의미가 모델의 후반 계층에서 점진적으로 결정되며, 모델의 **거부 방향 계층(Layer 12)** 이 여전히 무해한 해석 영역에 있음을 확인했습니다. 공격은 명사, 대명사, 형용사, 동사 등 다양한 어휘 범주에서 **52.4–55.6%의 일관된 ASR** 로 견고함을 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 현재 LLM 안전 메커니즘이 표면 수준 또는 초기 계층 표현에 과도하게 의존하고 있음을 시사합니다. AI 실무자들은 **내부 표현 수준에서 지속적인 의미 모니터링** 을 수행하거나, 본질적으로 이러한 유형의 조작에 강건한 **표현 인식 안전 방어 전략** 을 개발해야 할 필요가 있습니다. 이는 LLM의 잠재 공간에 존재하는 새로운 취약점을 드러내며, 보다 정교하고 심층적인 모델 정렬 기술의 중요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.