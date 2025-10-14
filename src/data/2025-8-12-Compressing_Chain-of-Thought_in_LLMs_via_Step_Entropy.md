---
title: "[논문리뷰] Compressing Chain-of-Thought in LLMs via Step Entropy"
excerpt: "Zhijian Xu이 [arXiv]에 게시한 'Compressing Chain-of-Thought in LLMs via Step Entropy' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM
  - Chain-of-Thought
  - CoT Compression
  - Step Entropy
  - Reinforcement Learning
  - SFT
  - GRPO

permalink: /ai/review/2025-8-12-Compressing_Chain-of-Thought_in_LLMs_via_Step_Entropy/

toc: true
toc_sticky: true

date: 2025-08-12 13:29:09+0900
last_modified_at: 2025-08-12 13:29:09+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.03346)

**저자:** Zeju Li, Jianyuan Zhong, Ziyang Zheng, Xiangyu Wen, Zhijian Xu, Yingying Cheng, Fan Zhang, Qiang Xu



## 핵심 연구 목표
Large Language Models(LLMs)의 Chain-of-Thought(CoT) 추론 과정에서 발생하는 과도한 상세함과 중복성으로 인한 높은 추론 비용 및 비효율성을 해결하는 것이 주요 목표입니다. 논문은 **의미적으로 중복되는 추론 단계를 식별하고 압축**하여 정확도를 유지하면서 LLM의 추론 효율성을 극대화하는 방법을 제안합니다.

## 핵심 방법론
논문은 각 추론 단계의 정보 기여도를 정량화하는 새로운 지표인 **스텝 엔트로피(step entropy)**를 도입합니다. 낮은 엔트로피를 가진 단계는 예측 가능하고 정보량이 적어 안전하게 가지치기할 수 있다는 가설을 기반으로, **낮은 엔트로피 단계의 최대 80%**를 **[SKIP] 토큰**으로 대체하여 CoT를 압축합니다. 이후 **지도 미세 조정(SFT)**과 **그룹 상대 정책 최적화(GRPO)**를 결합한 2단계 학습 전략을 통해 모델이 압축된 추론 궤적을 자율적으로 생성하도록 훈련합니다.

## 주요 결과
실험 결과, 낮은 엔트로피의 중간 추론 단계 **최대 80%**를 가지치기해도 **DeepSeek-R1-7B, 14B 및 Qwen3-8B** 모델에서 최종 답변 정확도가 소폭 하락하거나 유지되며, **16-45%의 토큰 감소**를 달성했습니다. 특히, 제안된 2단계 훈련 전략을 통해 훈련된 모델은 정확도를 유지하거나 향상시키면서 **35-57%의 토큰 감소**를 보여주었습니다. 이는 고엔트로피 또는 무작위 가지치기가 성능을 심각하게 저하시키는 것과 대조됩니다.

## AI 실무자를 위한 시사점
이 연구는 LLM의 추론 효율성을 획기적으로 개선할 수 있는 실용적인 방법론을 제시하여 **LLM 배포 비용 절감** 및 **추론 속도 향상**에 직접적으로 기여합니다. **스텝 엔트로피**는 LLM 추론 과정의 내부 동작을 이해하고 중복된 부분을 식별하는 데 유용한 새로운 지표를 제공합니다. 또한, 모델이 불필요한 추론 단계를 자율적으로 건너뛰도록 학습시키는 가능성을 보여주어 향후 효율적인 LLM 아키텍처 및 훈련 방법론 개발에 중요한 시사점을 줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.