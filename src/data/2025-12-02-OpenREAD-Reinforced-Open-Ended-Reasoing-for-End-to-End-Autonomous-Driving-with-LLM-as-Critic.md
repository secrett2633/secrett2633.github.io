---
title: "[논문리뷰] OpenREAD: Reinforced Open-Ended Reasoing for End-to-End Autonomous Driving with LLM-as-Critic"
excerpt: "arXiv에 게시된 'OpenREAD: Reinforced Open-Ended Reasoing for End-to-End Autonomous Driving with LLM-as-Critic' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Autonomous Driving
  - Reinforcement Fine-tuning
  - LLM-as-Critic
  - Vision-Language Model
  - End-to-End Learning
  - Chain-of-Thought
  - Trajectory Planning

permalink: /ai/review/2025-12-02-OpenREAD-Reinforced-Open-Ended-Reasoing-for-End-to-End-Autonomous-Driving-with-LLM-as-Critic/

toc: true
toc_sticky: true

date: 2025-12-02 00:00:00+0900+0900
last_modified_at: 2025-12-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.01830)

**저자:** Songyan Zhang, Wenhui Huang, Zhan Chen, Chua Jiahao Collister, Qihang Huang, Chen Lv



## 핵심 연구 목표
자율 주행 시스템에서 기존 **SFT(Supervised Fine-tuning)** 기반 **VLM(Vision-Language Model)** 의 제한된 추론 일반화 및 개방형 태스크 처리 능력을 개선하는 것이 목표입니다. 특히, 장면 이해와 같은 개방형 문제에 대한 보상 정량화의 어려움을 해결하고, 높은 수준의 추론부터 낮은 수준의 궤적 계획까지 전체 스펙트럼에 걸쳐 **RL(Reinforcement Learning)** 기반의 미세 조정을 가능하게 하고자 합니다.

## 핵심 방법론
본 논문은 **OpenREAD** 라는 개방형 추론 강화 **VLM** 기반 자율 주행 프레임워크를 제안합니다. 초기 **콜드 스타트(Cold Start)** 단계에서는 **LingoQA** 및 **OmniDrive** 데이터셋에 대한 대규모 **CoT(Chain-of-Thought)** 주석을 구축하고 **Qwen3-VL-8B 모델** 을 **SFT** 합니다. 이어서, **GRPO(Group Relative Policy Optimization)** 알고리즘을 사용하여 **LLM(Qwen3-8B)** 을 개방형 질문에 대한 추론 품질을 정량화하는 **비평가(Critic)** 로 활용하여 **종단 간 RFT(Reinforcement Fine-tuning)** 를 수행합니다. 보상 함수는 **Qwen3-LLM 보상** , **의미론적 임베딩 유사성** , 그리고 궤적 계획을 위한 **평균 L2 거리** 를 결합하여 구성됩니다.

## 주요 결과
**OpenREAD** 는 종단 간 **RFT** 를 통해 상위 수준 추론 및 하위 수준 계획 모두에서 상당한 성능 향상을 입증했습니다. 특히, **NuScenes 데이터셋** 에서 **L2 거리 0.40m** 및 **충돌률 0.11%** 를 달성하여 최신 VLM 기반 모델들과 비교하여 경쟁력 있는 성능을 보였습니다. 또한, **LingoQA 데이터셋** 에서 **Lingo-Judge 정확도 68.2%** 를 기록하여 추론 능력 강화의 효과를 증명했습니다.

## AI 실무자를 위한 시사점
본 연구는 **LLM** 을 복잡하고 개방형의 자율 주행 시나리오에서 **효과적인 RL 비평가** 로 활용할 수 있음을 보여주며, 이는 정량적 보상을 정의하기 어려운 다른 AI 도메인에도 확장 가능합니다. **CoT 주석 데이터셋** 구축의 중요성을 강조하고, **SFT** 와 **RFT** 를 결합한 학습 패러다임이 자율 주행 모델의 일반화 및 해석 가능성을 향상시키는 데 기여할 수 있음을 시사합니다. 이를 통해 **AI 실무자** 들은 성능과 안정성을 겸비한 차세대 자율 주행 시스템을 설계할 수 있는 기반을 마련할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.