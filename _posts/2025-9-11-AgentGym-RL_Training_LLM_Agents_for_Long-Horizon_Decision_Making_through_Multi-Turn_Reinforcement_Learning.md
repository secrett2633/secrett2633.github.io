---
title: "[논문리뷰] AgentGym-RL: Training LLM Agents for Long-Horizon Decision Making
  through Multi-Turn Reinforcement Learning"
excerpt: "Honglin Guo이 [arXiv]에 게시한 'AgentGym-RL: Training LLM Agents for Long-Horizon Decision Making
  through Multi-Turn Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Reinforcement Learning
  - Multi-Turn Interaction
  - Long-Horizon Decision Making
  - Agent Framework
  - Exploration-Exploitation
  - Progressive Scaling

permalink: /ai/review/2025-9-11-AgentGym-RL_Training_LLM_Agents_for_Long-Horizon_Decision_Making_through_Multi-Turn_Reinforcement_Learning/

toc: true
toc_sticky: true

date: 2025-09-11 13:02:36+0900
last_modified_at: 2025-09-11 13:02:36+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.08755)

**저자:** Zhiheng Xi, Jixuan Huang, Chenyang Liao, Baodai Huang, Honglin Guo, Jiaqi Liu, Rui Zheng, Junjie Ye, Jiazheng Zhang, Wenxiang Chen, Wei He, Yiwen Ding, Guanyu Li, Zehui Chen, Zhengyin Du, Xuesong Yao, Yufei Xu, Jiecao Chen, Tao Gui, Zuxuan Wu, Qi Zhang, Xuanjing Huang, Yu-Gang Jiang



## 핵심 연구 목표
본 연구는 복잡하고 실제와 같은 장기적 의사결정 태스크를 해결하기 위해 LLM 에이전트를 훈련시키는 통일된 **대화형 강화 학습(RL) 프레임워크**의 부재를 해결하는 것을 목표로 합니다. 기존 방식의 **SFT(Supervised Fine-Tuning)** 의존성, 제한된 태스크 복잡성, 환경 다양성, 최적화 안정성 및 효율성 문제를 극복하여 처음부터 **다양하고 사실적인 환경**에서 에이전트를 효과적으로 훈련하고자 합니다.

## 핵심 방법론
새로운 **AgentGym-RL 프레임워크**는 모듈화되고 분리된 아키텍처를 특징으로 하며, **환경, 에이전트, 훈련 모듈**을 통해 높은 유연성과 확장성을 제공합니다. **PPO, GRPO, REINFORCE++**와 같은 주류 RL 알고리즘을 지원하며, **ScalingInter-RL**이라는 점진적 상호작용 스케일링 방법론을 도입했습니다. 이 방법은 초기 단계에서는 상호작용 횟수를 제한하여 **활용(exploitation)**에 중점을 두고, 점차적으로 상호작용 범위를 넓혀 **탐색(exploration)**을 촉진함으로써 에이전트의 안정적인 최적화와 행동 다양성을 이끌어냅니다.

## 주요 결과
**AgentGym-RL 프레임워크**와 **ScalingInter-RL** 접근 방식은 5가지 시나리오의 27개 태스크에서 상업용 모델과 동등하거나 이를 능가하는 성능을 입증했습니다. 특히, **7B 파라미터**의 **ScalingInter-RL 모델**은 **WebArena**에서 **GPT-40**를 **10% 이상** 능가하는 **26.00%** 정확도를 달성하고, **BabyAI** 벤치마크에서는 **OpenAI 03** 및 **GPT-40**를 뛰어넘는 **96.67%**의 최고 정확도를 기록했습니다. 또한, **Deep Search** 및 **SciWorld**와 같은 복잡한 환경에서도 뛰어난 성능 향상을 보여주며, **모델 크기 증가보다 후처리 및 추론 시 연산 투자가 더 효과적**임을 시사합니다.

## AI 실무자를 위한 시사점
본 연구는 오픈소스 **AgentGym-RL 프레임워크**와 **ScalingInter-RL** 방법론을 통해 LLM 에이전트 훈련의 효율성과 안정성을 크게 향상시켰습니다. 이는 **대규모 언어 모델 기반 에이전트의 장기적, 다중 턴 의사결정 능력 개발**에 중요한 기여를 하며, 특히 **명확한 피드백 환경**에서 RL의 효과가 두드러짐을 보여줍니다. 공개된 프레임워크와 데이터셋은 미래 AI 에이전트 연구에 실용적인 기반을 제공하며, **모델 규모보다 전략적인 훈련 접근 방식**의 중요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.