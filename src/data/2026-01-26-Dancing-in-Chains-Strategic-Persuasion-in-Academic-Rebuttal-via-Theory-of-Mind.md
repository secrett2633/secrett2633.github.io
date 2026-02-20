---
title: "[논문리뷰] Dancing in Chains: Strategic Persuasion in Academic Rebuttal via Theory of Mind"
excerpt: "Yi R Fung이 arXiv에 게시한 'Dancing in Chains: Strategic Persuasion in Academic Rebuttal via Theory of Mind' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Academic Rebuttal
  - Theory of Mind
  - Large Language Models
  - Strategic Persuasion
  - Reinforcement Learning
  - Self-Reward
  - Dataset Synthesis
  - Automated Evaluation

permalink: /ai/review/2026-01-26-Dancing-in-Chains-Strategic-Persuasion-in-Academic-Rebuttal-via-Theory-of-Mind/

toc: true
toc_sticky: true

date: 2026-01-26 00:00:00+0900+0900
last_modified_at: 2026-01-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.15715)

**저자:** Zhitao He, Zongwei Lyu, Yi R. (May) Fung



## 핵심 연구 목표
본 논문은 학술적 반론(rebuttal) 과정에서 단순히 표면적인 언어적 유사성을 모방하는 현재 AI 모델의 한계를 극복하고자 합니다. **Theory of Mind (ToM)** 를 통합하여 심사위원의 정신 상태를 모델링하고, 전략적 설득을 통해 보다 효과적이고 증거에 기반한 반론을 생성하는 **RebuttalAgent** 프레임워크를 개발하는 것을 목표로 합니다.

## 핵심 방법론
제안된 **RebuttalAgent** 는 **ToM-Strategy-Response (TSR) 파이프라인** 을 사용하여 심사위원의 의도를 추론하고, 맞춤형 전략을 수립하며, 이를 바탕으로 설득력 있는 응답을 생성합니다. 훈련을 위해 **7만 개 이상의 고품질 합성 데이터 샘플** 로 구성된 **RebuttalBench** 데이터셋을 구축했으며, **지도 미세 조정(SFT)** 과 **자기 보상(self-reward) 메커니즘** 을 활용한 **강화 학습(RL)** 을 통해 에이전트의 능력을 최적화했습니다. 또한, 신뢰성 있는 평가를 위해 **Rebuttal-RM** 이라는 전문화된 평가 모델을 개발했습니다.

## 주요 결과
**RebuttalAgent** 는 자동화된 측정 기준에서 기본 모델 대비 평균 **18.3%** 의 유의미한 성능 향상을 달성했습니다. 특히 인간 평가에서는 **GPT-4.1** 및 **o3** 와 같은 고급 독점 모델을 능가하며, 평균 **9.57점** 의 최고 점수를 기록했습니다. **Persuasiveness (9.34점)** 와 **Constructiveness** 부문에서 가장 큰 폭의 개선을 보여, 전략적 설득력이 크게 향상되었음을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM이 복잡한 정보 비대칭 상황에서 **고차원적인 전략적 추론 및 의사결정** 능력을 발휘할 수 있음을 보여줍니다. **ToM 기반 에이전트 설계** 와 **대규모 합성 데이터셋 구축** , 그리고 **자기 보상 강화 학습** 기법은 학술적 커뮤니케이션뿐만 아니라 다양한 도메인의 복잡한 문제 해결을 위한 AI 시스템 개발에 중요한 통찰력을 제공합니다. 다만, 훈련 데이터의 편향 학습 및 잠재적인 정보 조작 가능성에 대한 윤리적 고려가 지속적으로 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.