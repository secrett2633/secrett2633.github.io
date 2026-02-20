---
title: "[논문리뷰] StepWiser: Stepwise Generative Judges for Wiser Reasoning"
excerpt: "Olga Golovneva이 arXiv에 게시한 'StepWiser: Stepwise Generative Judges for Wiser Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Reasoning
  - Process Reward Models
  - Reinforcement Learning
  - Generative Judges
  - Stepwise Feedback
  - Chain-of-Thought
  - Meta-Reasoning

permalink: /ai/review/2025-8-28-StepWiser-Stepwise-Generative-Judges-for-Wiser-Reasoning/

toc: true
toc_sticky: true

date: 2025-08-28 13:10:39+0900
last_modified_at: 2025-08-28 13:10:39+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.19229)

**저자:** Wei Xiong, Wenting Zhao, Weizhe Yuan, Olga Golovneva, Tong Zhang, Jason Weston, Sainbayar Sukhbaatar



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)이 복잡한 문제 해결을 위해 사용하는 다단계 추론(Chain-of-Thought) 전략에서 각 중간 단계의 논리적 유효성을 감독하는 과제를 해결하는 것을 목표로 합니다. 기존의 과정 보상 모델(PRM)이 블랙박스 분류기이며 정적 데이터셋에 의존하는 한계를 극복하고, **추론 자체를 수행하는 생성형 판별 모델** 을 통해 LLM의 추론 능력을 실질적으로 개선하고자 합니다.

## 핵심 방법론
제안하는 **STEPWISER** 모델은 (1) LLM의 추론 과정을 **일관성 있는 청크(chunks-of-thought)** 로 자동 분할하는 **새로운 자체 분할(self-segmentation) 기술** , (2) 몬테카를로 롤아웃의 **상대적 성공률(relative outcomes of rollouts)** 을 기반으로 각 청크에 보상을 할당하는 기법, (3) 판별 모델이 **자체적인 추론(meta-reasoning)** 을 생성하며 최종 판단을 내리도록 **온라인 강화 학습(RL)** 으로 훈련하는 세 가지 핵심 요소로 구성됩니다. 특히, 안정적인 RL 훈련을 위해 **프롬프트 데이터셋 균형화** 와 **GRPO 알고리즘** 을 활용합니다.

## 주요 결과
**ProcessBench** 벤치마크에서 **STEPWISER** 는 기존의 SFT 기반 판별 모델 및 다른 RL 기반 모델들을 뛰어넘는 압도적인 성능을 보였습니다. 특히, **Rel-Effective** 신호를 사용한 **Qwen2.5-7B-chunk** 모델은 평균 **61.9%** 의 정확도를 달성하여, **SFT 기반 판별 모델의 39.7%** 및 **RL-TANGO의 43.9%** 를 크게 상회했습니다. 또한, **Chunk-Reset Reasoning** 을 통한 추론 시간 탐색 및 하위 모델 훈련을 위한 데이터 선택에서도 일관된 성능 향상을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM의 추론 과정에 대한 **투명하고 정확한 단계별 피드백** 을 제공하는 새로운 패러다임을 제시합니다. **메타 추론 능력을 갖춘 생성형 판별 모델** 은 LLM 기반 애플리케이션의 **신뢰성과 설명 가능성** 을 크게 향상시킬 수 있으며, **온라인 RL 훈련** 은 실시간으로 변화하는 추론 패턴에 모델이 적응하도록 돕습니다. 본 방법론은 **효율적인 학습 데이터 생성** 과 **추론 오류의 실시간 식별 및 수정** 에 활용되어, LLM 기반 시스템의 전반적인 성능과 견고성을 개선하는 데 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.