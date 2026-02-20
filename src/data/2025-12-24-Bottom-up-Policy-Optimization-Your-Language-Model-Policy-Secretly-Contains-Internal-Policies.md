---
title: "[논문리뷰] Bottom-up Policy Optimization: Your Language Model Policy Secretly Contains Internal Policies"
excerpt: "arXiv에 게시된 'Bottom-up Policy Optimization: Your Language Model Policy Secretly Contains Internal Policies' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Large Language Models
  - Policy Optimization
  - Interpretability
  - Transformer
  - Internal Policy
  - Entropy Analysis

permalink: /ai/review/2025-12-24-Bottom-up-Policy-Optimization-Your-Language-Model-Policy-Secretly-Contains-Internal-Policies/

toc: true
toc_sticky: true

date: 2025-12-24 00:00:00+0900+0900
last_modified_at: 2025-12-24 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.19673)

**저자:** Yuqiao Tan, Minzheng Wang, Shizhu He, Huanxuan Liao, Chengfeng Zhao, Qiunan Lu, Tian Liang, Jun Zhao, Kang Liu



## 핵심 연구 목표
본 논문은 기존 RL 접근 방식이 LLM을 단일 블랙박스 정책으로 취급하는 한계를 극복하고자 합니다. LLM의 내부 메커니즘을 **내부 계층 정책(Internal Layer Policies)** 과 **내부 모듈 정책(Internal Modular Policies)** 으로 분해하여, 내부 추론 과정이 어떻게 진화하는지 이해하고 이를 활용하여 더욱 효과적인 정책 최적화 방법을 개발하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 Transformer의 **잔차 스트림(residual stream)** 분해 및 은닉 상태와 **임베딩 해제 행렬(unembedding matrix)** 의 조합을 통해 샘플링 가능한 정책을 정의합니다. 이를 기반으로 **내부 계층 엔트로피(Internal Policy Entropy)** 및 **엔트로피 변화(Entropy Change)** 를 분석하여 LLM의 계층별 추론 패턴(탐색-통합-수렴)을 식별했습니다. 이 통찰력을 바탕으로, 초기 훈련 단계에서 내부 계층 정책을 직접 최적화하여 전체 언어 모델 정책을 효과적으로 안내하는 새로운 RL 패러다임인 **Bottom-up Policy Optimization (BuPO)** 을 제안합니다.

## 주요 결과
엔트로피 분석 결과, **Qwen 시리즈 모델** 은 FFN에서 탐색-통합-수렴(EIC)의 점진적인 추론 패턴을 보이는 반면, **Llama 모델** 은 최종 계층에서 급격한 수렴을 보였습니다. **BuPO** 는 **MATH500** , **AMC23** , **AIME24** , **AIME25** 와 같은 복잡한 추론 벤치마크에서 기존 RL baseline보다 일관되게 우수한 성능을 달성했습니다. 예를 들어, **Qwen3-4B 모델** 에서 **AIME24** 에서 **4.58포인트** , **AIME25** 에서 **0.76포인트** 성능 향상을 보였으며, **Llama-OctoThinker-8B-Base** 에서는 평균 **3.68포인트** 개선을 이루었습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM의 내부 작동 방식을 이해하고 **층별 추론 메커니즘** 을 활용하여 RL 훈련을 개선할 수 있는 새로운 길을 제시합니다. 특히 **Qwen3** 와 같이 구조화된 추론 패턴을 보이는 모델에 **BuPO** 를 적용함으로써, 초기 훈련 단계에서 모델의 **기초 추론 능력을 재구성** 하고 더 높은 성능을 달성할 수 있습니다. 이는 AI 개발자가 LLM을 더욱 효율적으로 미세 조정하고 복잡한 문제 해결 능력을 강화하는 데 중요한 실용적 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.