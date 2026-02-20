---
title: "[논문리뷰] No Global Plan in Chain-of-Thought: Uncover the Latent Planning Horizon of LLMs"
excerpt: "arXiv에 게시된 'No Global Plan in Chain-of-Thought: Uncover the Latent Planning Horizon of LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Chain-of-Thought
  - LLM Planning
  - Probing Methods
  - Uncertainty Estimation
  - Reasoning Dynamics
  - Model Interpretability

permalink: /ai/review/2026-02-04-No-Global-Plan-in-Chain-of-Thought-Uncover-the-Latent-Planning-Horizon-of-LLMs/

toc: true
toc_sticky: true

date: 2026-02-04 00:00:00+0900+0900
last_modified_at: 2026-02-04 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.02103)

**저자:** Liyan Xu, Mo Yu, Fandong Meng, Jie Zhou



## 핵심 연구 목표
본 연구는 Large Language Models (LLMs)의 Chain-of-Thought (CoT) 추론 과정에서 **내재된 계획 능력(latent planning horizon)** 을 규명하는 것을 목표로 합니다. LLM이 복잡한 추론을 수행할 때 전역적인 계획을 세우는지, 아니면 국소적이고 점진적인 전환에 의존하는지를 밝히고, 이러한 계획 특성이 CoT의 불확실성 추정 및 필요성과 어떻게 연결되는지 탐구합니다.

## 핵심 방법론
저자들은 LLM의 숨겨진 상태에서 **"Teleological information"** 을 예측하는 **Tele-Lens** 라는 새로운 프로빙 방법론을 제안합니다. 이 방법은 **low-rank adapter (LoRA)** 를 사용하여 **후속 토큰, 추론 길이, 최종 답변** 등 여러 차원의 정보를 예측합니다. 실험은 **12개의 다양한 데이터셋** (명시적/암묵적 조합, 지식 및 의미론적 태스크)에 대해 **Qwen3-32B** 및 **In-Domain LLM** (Qwen2.5-7B-Instruct 기반)을 사용하여 수행되었습니다. CoT 불확실성 추정에는 **Tele-Lens** 를 통해 추출된 **최저 엔트로피를 가진 상위 k개 피벗 위치** 를 활용하는 "Wooden Barrel" 원칙을 제시합니다.

## 주요 결과
LLM은 특히 복잡한 작업에서 **정확한 최종 답변 계획에 대해 근시안적인 계획 지평** 을 보여주며, 전역적인 계획보다는 점진적인 전환에 주로 의존함이 밝혀졌습니다. 최종 답변 계획은 추론 완료 직전 1~2단계에서만 유의미하게 나타났습니다. **Tele-Lens** 를 활용한 CoT 불확실성 추정은 기존 방법 대비 **최대 9%의 절대적 개선** 을 달성했습니다. 또한, CoT 바이패스 전략은 **Qwen3-32B** 에서 CSQA 태스크의 경우 **최대 16.2%의 CoT 생략** 을 가능하게 하면서도 **전체 정확도 손실은 0.03%에 불과** 했습니다.

## AI 실무자를 위한 시사점
LLM의 근시안적인 계획 특성 이해는 CoT 기반 LLM의 **제어 및 모니터링 방식** 을 개선하는 데 중요합니다. **Tele-Lens** 와 같은 프로빙 방법은 LLM 내부의 **핵심 추론 단계** 를 식별하여 모델 해석 가능성을 높일 수 있습니다. 또한, CoT 바이패스 전략은 불필요한 추론 과정을 생략하여 **LLM의 추론 비용을 절감** 하고 효율성을 극대화하는 실용적인 방법을 제공하며, 이는 특히 대규모 애플리케이션에서 유용할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.