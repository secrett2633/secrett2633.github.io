---
title: "[논문리뷰] Harnessing Uncertainty: Entropy-Modulated Policy Gradients for
  Long-Horizon LLM Agents"
excerpt: "Xintao Wang이 [arXiv]에 게시한 'Harnessing Uncertainty: Entropy-Modulated Policy Gradients for
  Long-Horizon LLM Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Reinforcement Learning
  - Policy Gradients
  - Entropy Modulation
  - Credit Assignment
  - Uncertainty
  - Long-Horizon Tasks
  - Self-Calibrating Gradient Scaling

permalink: /ai/review/2025-9-12-Harnessing-Uncertainty-Entropy-Modulated-Policy-Gradients-for-Long-Horizon-LLM-Agents/

toc: true
toc_sticky: true

date: 2025-09-12 13:12:46+0900
last_modified_at: 2025-09-12 13:12:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.09265)

**저자:** Jiawei Wang, Jiacai Liu, Yuqian Fu, Yingru Li, Xintao Wang, Yuan Lin, Yu Yue, Lin Zhang, Yang Wang, Ke Wang



## 핵심 연구 목표
본 논문은 장기 시퀀스(long-horizon) LLM 에이전트 태스크에서 **희소한 보상(sparse rewards)** 으로 인해 발생하는 **신용 할당(credit assignment) 문제** 와 **정책 경사(policy gradient)의 비효율적인 업데이트** 문제를 해결하는 것을 목표로 합니다. 특히, 정책 경도의 크기가 엔트로피와 연동되어 발생하는 "엔트로피-경도 결합(entropy-gradient coupling)" 문제를 해결하여 학습 효율성과 안정성을 향상시키고자 합니다.

## 핵심 방법론
저자들은 에이전트의 내재적인 불확실성을 활용하는 **Entropy-Modulated Policy Gradients (EMPG)** 프레임워크를 제안합니다. EMPG는 **Self-Calibrating Gradient Scaling** 을 통해 신뢰도 높은 정확한 행동에 대한 업데이트를 증폭하고, 신뢰도 높은 오류를 처벌하며, 불확실한 단계의 업데이트를 약화하여 학습을 안정화합니다. 또한, 에이전트가 예측 가능한 해결 경로를 찾도록 장려하는 **Future Clarity Bonus** 라는 내재적 보상 항을 도입하여 미래의 낮은 엔트로피 상태로 유도합니다.

## 주요 결과
EMPG는 세 가지 도전적인 에이전트 벤치마크인 **WebShop** , **ALFWorld** , **Deep Search** 에서 기존의 강력한 정책 경도 기반 모델인 **GRPO** 및 **DAPO** 대비 상당한 성능 향상을 달성했습니다. 예를 들어, **ALFWorld (Qwen2.5-1.5B)** 에서 **GRPO** 대비 **+8.1점** , **DAPO** 대비 **+7.3점** 의 성공률 향상을 보였으며, **Deep Search (Qwen2.5-32B)** 에서는 전체 평균 점수가 **62.0점** 에서 **65.3점** 으로 **+3.3점** 상승했습니다. 특히 OOD 태스크에서는 **+3.9점** 의 강력한 일반화 성능을 보여주며, 학습 불안정성을 유발하는 **KL Loss** 를 낮고 안정적으로 유지했습니다.

## AI 실무자를 위한 시사점
EMPG는 LLM 에이전트의 **장기 시퀀스 학습** 에 대한 **확장 가능하고 효율적인 해결책** 을 제시하며, 고비용의 프로세스 보상 모델(PRM)에 대한 의존도를 줄일 수 있습니다. 이는 복잡한 의사결정 프로세스에서 에이전트의 내재적 불확실성을 **자기 지도 학습 신호** 로 활용하여 **더욱 견고하고 안정적인 AI 에이전트** 를 개발하는 데 기여합니다. 특히, 고차원 액션 공간을 가진 태스크에서 정책 경사 방법론의 **일반적인 문제** 를 해결하는 데 실용적인 가치가 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.