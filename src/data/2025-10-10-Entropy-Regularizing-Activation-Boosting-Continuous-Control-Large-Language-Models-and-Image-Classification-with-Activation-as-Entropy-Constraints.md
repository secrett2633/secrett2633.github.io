---
title: "[논문리뷰] Entropy Regularizing Activation: Boosting Continuous Control, Large
  Language Models, and Image Classification with Activation as Entropy
  Constraints"
excerpt: "Huazhe Xu이 [arXiv]에 게시한 'Entropy Regularizing Activation: Boosting Continuous Control, Large
  Language Models, and Image Classification with Activation as Entropy
  Constraints' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Entropy Regularization
  - Activation Functions
  - Continuous Control
  - Large Language Models
  - Image Classification
  - Reinforcement Learning
  - Policy Stochasticity
  - Entropy Constraints

permalink: /ai/review/2025-10-10-Entropy-Regularizing-Activation-Boosting-Continuous-Control-Large-Language-Models-and-Image-Classification-with-Activation-as-Entropy-Constraints/

toc: true
toc_sticky: true

date: 2025-10-10 13:53:45+0900
last_modified_at: 2025-10-10 13:53:45+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.08549)

**저자:** Zilin Kang, Chonghua Liao, Tingqiang Xu, Huazhe Xu



## 핵심 연구 목표
논문은 기존의 엔트로피 정규화 방식들이 최적화 목표를 왜곡하거나 특정 도메인에만 적용 가능한 한계를 지적하며, **범용적이고 비침습적이며 이론적으로 근거 있는** 새로운 엔트로피 제약 패러다임을 제안하는 것을 목표로 합니다. 이는 다양한 AI/ML 문제에서 정책의 탐색 능력과 견고성을 향상시키고자 합니다.

## 핵심 방법론
핵심 방법론은 **Entropy Regularizing Activation (ERA)** 으로, 모델의 최종 출력에 특별히 설계된 **활성화 함수** 를 적용하여 샘플링 엔트로피에 제약을 가하는 것입니다. **연속형 제어** 에서는 **bounded Gaussian policies** 의 표준 편차를 조절하며, **이산형 분류 (이미지 분류)** 에서는 **softmax 정책** 의 사전 활성화 로짓을 변환합니다. **대규모 언어 모델 (LLM)** 의 경우, 샘플링 *후* **GRPO** 업데이트 과정에서 상위 **20%의 고엔트로피 토큰** 에 대한 **적응형 ERA** 를 적용하여 엔트로피 제약을 구현합니다.

## 주요 결과
ERA는 다양한 도메인에서 강력한 성능 향상을 입증했습니다. **LLM** 의 경우 **Qwen2.5-Math-7B** 의 **AIME 2025 점수를 37.4% 향상** 시켰으며, **AIME-24** 및 **AIME-25** 벤치마크에서 각각 **9.0%** 및 **37.4%** 개선을 달성했습니다. **연속형 제어** 에서는 **HumanoidBench** 에서 **SAC** 와 같은 강력한 기준선 대비 **30% 이상** 의 성능 향상을 보였고, **이미지 분류** 에서는 **ResNet-50** 의 **ImageNet top-1 정확도를 0.69% 향상** 시켰습니다. 이러한 성능 향상은 **7% 미만의 계산 오버헤드** 로 이루어졌습니다.

## AI 실무자를 위한 시사점
ERA는 **연속형 제어, LLM 정렬, 이미지 분류** 등 광범위한 AI/ML 도메인에 걸쳐 **엔트로피 제어를 위한 강력하고 비침습적인 도구** 를 제공합니다. 주요 최적화 목표와 엔트로피 제약을 **분리** 하여 알고리즘 설계를 단순화하고 하이퍼파라미터 튜닝의 필요성을 줄일 수 있습니다. 낮은 계산 오버헤드와 엔트로피 하이퍼파라미터에 대한 **견고성** 은 실용적인 AI 시스템 개발에 있어 ERA의 잠재력을 높입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.