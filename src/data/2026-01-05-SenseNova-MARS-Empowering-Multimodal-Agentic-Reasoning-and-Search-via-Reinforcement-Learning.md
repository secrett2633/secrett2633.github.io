---
title: "[논문리뷰] SenseNova-MARS: Empowering Multimodal Agentic Reasoning and Search via Reinforcement Learning"
excerpt: "이 [arXiv]에 게시한 'SenseNova-MARS: Empowering Multimodal Agentic Reasoning and Search via Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Agents
  - Reinforcement Learning
  - Vision-Language Models
  - Tool Use
  - Agentic Reasoning
  - Image Search
  - HR-MMSearch
  - BN-GSPO

permalink: /ai/review/2026-01-05-SenseNova-MARS-Empowering-Multimodal-Agentic-Reasoning-and-Search-via-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2026-01-05 00:00:00+0900+0900
last_modified_at: 2026-01-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.24330)

**저자:** Yong Xien Chng, Tao Hu, Wenwen Tong, Xueheng Li, Jiandong Chen, Haojia Yu, Jiefan Lu, Hewei Guo, Hanming Deng, Chengjun Xie, Gao Huang, Dahua Lin, Lewei Lu



## 핵심 연구 목표
본 논문은 기존 VLM 기반 에이전트의 텍스트 중심 추론 및 고립된 도구 호출 한계를 극복하고자 합니다. 특히 지식 집약적이고 시각적으로 복잡한 시나리오에서 외부 도구(검색, 이미지 자르기)를 유연하게 활용하며 사람과 유사한 다단계 추론을 수행하는 **멀티모달 에이전트 추론 및 검색 프레임워크** 를 제안하여, 복잡한 시각 이해 태스크를 해결하는 것을 목표로 합니다.

## 핵심 방법론
SenseNova-MARS는 **강화 학습(RL)** 을 통해 **이미지 검색, 텍스트 검색, 이미지 자르기 도구** 를 동적으로 통합하여 시각적 추론 및 도구 사용 능력을 강화합니다. 훈련은 냉각 시작 **SFT(Supervised Fine-Tuning)** 와 **BN-GSPO(Batch-Normalized Group Sequence Policy Optimization)** RL 알고리즘의 두 단계로 진행됩니다. **BN-GSPO** 는 이질적인 프롬프트와 보상 규모의 분산을 완화하기 위해 **이점 추정치에 2단계 정규화** 를 적용하여 학습 안정성을 높입니다. 보상 모델은 **최종 답변 정확도(GPT-4o judge)** 와 **구조적 형식 준수** 를 결합합니다.

## 주요 결과
**SenseNova-MARS-8B** 는 검색 지향 벤치마크인 **MMSearch에서 67.84** , **HR-MMSearch에서 41.64** 의 점수를 달성하며 Gemini-3-Flash 및 GPT-5와 같은 독점 모델을 능가하는 SOTA 성능을 보였습니다. 세분화된 시각 이해 벤치마크에서도 **V\* Bench 92.2 **, ** HR-Bench 4k 83.1 ** 등 우수한 성능을 기록하며 기존 도구 기반 모델들을 앞섰습니다. ** BN-GSPO **는 강화 학습의 안정성과 효율성을 크게 개선하여 일관되고 견고한 다중 도구 학습을 가능하게 함이 입증되었습니다.

## AI 실무자를 위한 시사점
SenseNova-MARS는 ** 강력한 다중 도구 활용 능력과 에이전트 추론 능력 **을 갖춘 VLM 개발에 있어 중요한 진전을 보여줍니다. 특히, ** BN-GSPO 알고리즘 **은 복잡한 도구 사용 시나리오에서 RL 학습의 안정성을 제공하여 실제 환경에서의 AI 에이전트 배포 가능성을 높입니다. 새로 구축된 ** HR-MMSearch 벤치마크**는 고해상도 이미지와 지식 집약적 질문을 통해 VLM의 미세-객체 인식 및 검색-추론 능력을 평가하는 데 중요한 자원이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.