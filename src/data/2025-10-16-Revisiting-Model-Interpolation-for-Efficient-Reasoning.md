---
title: "[논문리뷰] Revisiting Model Interpolation for Efficient Reasoning"
excerpt: "이 [arXiv]에 게시한 'Revisiting Model Interpolation for Efficient Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Model Interpolation
  - Efficient Reasoning
  - Large Language Models
  - Chain-of-Thought
  - Model Merging
  - Performance Dynamics
  - Ablation Study

permalink: /ai/review/2025-10-16-Revisiting-Model-Interpolation-for-Efficient-Reasoning/

toc: true
toc_sticky: true

date: 2025-10-16 13:09:51+0900
last_modified_at: 2025-10-16 13:09:51+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.10977)

**저자:** Taiqiang Wu, Runming Yang, Tao Liu, Jiahao Wang, Ngai Wong



## 핵심 연구 목표
이 논문은 대규모 언어 모델(LLM)의 복잡한 연쇄적 사고(Chain-of-Thought, CoT) 추론에서 발생하는 **과도한 사고(over-thinking)** 및 **높은 지연 시간** 문제를 해결하기 위한 효율적인 추론 방법을 모색합니다. 특히, **모델 가중치 보간법(Model Interpolation, MI)** 의 성능 동역학을 체계적으로 분석하고 이를 통해 효율성과 효과성 사이의 최적의 균형점을 찾는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 장문 CoT 추론에 능숙한 **Thinking 모델** 과 짧고 직접적인 답변에 최적화된 **Instruct 모델** 간의 단순 가중치 보간($\Theta^{(Merge)} = \lambda\Theta^{(Thi)} + (1 - \lambda)\Theta^{(Ins)}$)을 핵심 방법론으로 채택했습니다. **Qwen3-4B** 및 **Qwen3-30B-A3B** 모델을 기반으로 **AIME'25** , **IFEval** , **GPQA-Diamond** 벤치마크에서 **Pass@k** , **Mean@k** , **Token #N** , **Think #R** 등의 지표를 활용하여 성능을 평가했습니다. 또한 **Task Arithmetic** 및 **TIES-Merging** 과 같은 다른 모델 병합 방법들과 비교하고, 레이어, 모듈, 디코딩 전략에 대한 **세부적인 Ablation Study** 를 수행했습니다.

## 주요 결과
모델 보간법(MI)은 $\lambda$ 값에 따라 **세 가지 뚜렷한 성능 동역학 패러다임** 을 보임을 발견했습니다. 특히 **MI-0.8 모델** 은 **AIME'25 벤치마크** 에서 **80.5 Mean@64** 를 달성하여 최상위 baseline인 **TA-Base** 대비 **10.9점 더 높은 성능** 을 보였습니다. 또한, **IFEval 태스크** 에서 **MI-0.8** 은 **1556 토큰** 으로 baseline 대비 현저히 적은 토큰을 사용하면서도 우수한 성능을 유지하여 효율성 측면에서도 뛰어남을 입증했습니다. Ablation Study 결과, **FFN 모듈** 이 long CoT 추론 패턴의 주요 동인이며, **MHA 모듈** 은 추론 품질에 결정적이라는 통찰을 제공했습니다.

## AI 실무자를 위한 시사점
이 연구는 단순한 **모델 가중치 보간법** 이 기존의 복잡한 모델 병합 기법들보다 효율성과 효과성 측면에서 뛰어날 수 있음을 보여주어 **경량화된 LLM 배포** 에 실질적인 대안을 제시합니다. 발견된 **세 단계 성능 동역학 패러다임** 은 AI 실무자가 특정 추론 능력과 토큰 예산을 목표로 모델을 맞춤 제작할 때 **명확한 가이드라인** 을 제공합니다. 특히 **FFN 모듈** 이 CoT 추론의 핵심 동인이라는 발견은 향후 **효율적인 CoT 모델 설계** 및 **미세 조정 전략** 에 중요한 통찰을 제공할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.