---
title: "[논문리뷰] TruthRL: Incentivizing Truthful LLMs via Reinforcement Learning"
excerpt: "arXiv에 게시된 'TruthRL: Incentivizing Truthful LLMs via Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Hallucination
  - Truthfulness
  - Reinforcement Learning
  - Ternary Reward
  - Abstention
  - Knowledge Boundary
  - GRPO
  - RLHF

permalink: /ai/review/2025-10-1-TruthRL-Incentivizing-Truthful-LLMs-via-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-10-01 14:04:08+0900
last_modified_at: 2025-10-01 14:04:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.25760)

**저자:** Zhepei Wei, Xiao Yang, Kai Sun, Jiaqi Wang, Rulin Shao, Sean Chen, Mohammad Kachuee, Teja Gollapudi, Tony Liao, Nicolas Scheffer, Rakesh Wanga, Anuj Kumar, Yu Meng, Wen-tau Yih, Xin Luna Dong



## 핵심 연구 목표
대규모 언어 모델(LLM)의 고질적인 문제인 **환각(Hallucination)** 을 줄이고 **진실성(Truthfulness)** 을 높이는 것을 목표로 합니다. 단순히 정확도만을 높이는 기존 방식이 환각을 증폭시키거나 지나치게 보수적인 답변을 유도하는 한계를 극복하고, 모델이 불확실할 때 **"모르겠다"고 회피** 하는 능력을 갖추도록 유도하고자 합니다.

## 핵심 방법론
본 연구는 진실성을 직접적으로 최적화하는 **강화 학습(RL) 프레임워크인 TruthRL** 을 제안합니다. 특히, **GRPO (Generalized Proximal Policy Optimization)** 를 기반으로 **간단하지만 효과적인 삼항 보상(Ternary Reward) 시스템** 을 사용합니다. 이 시스템은 **정답에는 +1, 불확실한 답변(회피)에는 0, 오답(환각)에는 -1** 을 부여하여 회피를 환각보다 선호하도록 유도합니다.

## 주요 결과
TruthRL은 기존 RL 방식 대비 **환각을 28.9% 감소** 시키고 **진실성을 21.1% 향상** 시켰습니다. 이는 **Qwen, Llama** 등 다양한 백본 모델과 검색(retrieval) 및 비검색(non-retrieval) 환경 모두에서 일관된 성능 향상을 보였습니다. 특히, 어려운 질문에서는 **최저 환각률(15.5%)** 과 **최고 불확실성률(84.5%)** 을 기록하며 모델이 지식 경계를 인식하는 능력이 크게 향상되었음을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM의 신뢰성을 높이기 위해 단순히 정확도에만 초점을 맞추는 것을 넘어, **보상 설계의 중요성** 을 강조합니다. **삼항 보상 시스템** 은 모델이 정보 제공과 신뢰성 사이의 균형을 유지하도록 돕는 실용적인 전략을 제공합니다. 이는 특히 높은 신뢰성이 요구되는 분야에서 LLM의 **정직하고 불확실성을 인정하는 능력** 을 강화하는 데 핵심적인 지침이 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.