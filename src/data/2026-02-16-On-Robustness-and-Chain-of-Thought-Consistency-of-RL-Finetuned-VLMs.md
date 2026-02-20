---
title: "[논문리뷰] On Robustness and Chain-of-Thought Consistency of RL-Finetuned VLMs"
excerpt: "arXiv에 게시된 'On Robustness and Chain-of-Thought Consistency of RL-Finetuned VLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - VLM
  - RL Fine-tuning
  - Chain-of-Thought
  - Robustness
  - Faithfulness
  - Textual Perturbations
  - Visual Grounding
  - Uncertainty Calibration

permalink: /ai/review/2026-02-16-On-Robustness-and-Chain-of-Thought-Consistency-of-RL-Finetuned-VLMs/

toc: true
toc_sticky: true

date: 2026-02-16 00:00:00+0900+0900
last_modified_at: 2026-02-16 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.12506)

**저자:** Rosie Zhao, Anshul Shah, Xiaoyu Zhu, Xinke Deng, Zhongyu Jiang, Yang Yang, Joerg Liebelt, Arnab Mondal



## 핵심 연구 목표
본 논문은 **강화 학습(RL)으로 파인튜닝된 비전 언어 모델(VLM)** 의 **강건성(robustness)** 및 **사고 과정(Chain-of-Thought, CoT) 일관성** 을 평가하는 것을 목표로 합니다. 특히, 시각적 추론 작업에서 **오해의 소지가 있는 텍스트 프롬프트** 에 대한 VLM의 취약성을 밝히고, 벤치마크 정확도만으로는 가려질 수 있는 시각적 접지(visual grounding) 및 추론의 불충실성 문제를 심층적으로 분석합니다.

## 핵심 방법론
연구진은 **오해의 소지가 있는 캡션(Wrong-Caption)** 또는 **잘못된 CoT 접두사(Wrong-Think)** 와 같은 **제어된 텍스트 교란** 을 8개의 시각적 추론 벤치마크에 도입했습니다. **Qwen2.5-VL-7B-Instruct** 기반의 여러 RL 파인튜닝 모델( **SpaceR** , **Video-R1** , **Vision-R1** , **VLAA-Thinker** , **ViGoRL-Spatial** )을 대상으로 **정확도** , **엔트로피 기반 불확실성 지표** , 그리고 **Qwen3-32B** 를 활용한 **CoT 충실성(faithfulness)** 을 측정했습니다. 또한, **데이터 증강** 및 **충실성-인지 보상** 을 포함한 RL 파인튜닝 실험을 수행하여 훈련 역학을 분석했습니다.

## 주요 결과
**오해의 소지가 있는 텍스트 교란** 은 VLM의 정확도와 신뢰도를 **상당히 저하시켰으며** , **CoT 일관성** 이 고려될 때 이러한 영향이 더욱 두드러졌습니다. **엔트로피 분석** 결과, 교란은 모델의 불확실성을 재구성하고 **P(Correct Letter)** 를 감소시켜 **오류 보정(miscalibration)** 패턴을 드러냈습니다. RL 파인튜닝은 벤치마크 정확도를 높였지만, CoT의 신뢰성과 문맥 변화에 대한 강건성을 **저해할 수 있음** 을 발견했습니다. **충실성-인지 보상** 은 CoT와 답변 간의 정렬을 개선했지만, 데이터 증강과 결합 시 **불안정한 훈련 동역학** 을 초래하여 단축키 전략에 의존하게 만들었습니다.

## AI 실무자를 위한 시사점
본 연구는 VLM의 평가가 단순히 정확도뿐만 아니라 **강건성** 과 **추론의 충실성** 을 함께 고려해야 함을 강조합니다. AI/ML 엔지니어는 RL 파인튜닝이 모델 성능을 향상시키면서도 **내부 추론과 최종 답변 간의 불일치** 를 야기할 수 있음을 인지해야 합니다. 향후 VLM 개발 시, **오해의 소지가 있는 텍스트 신호를 능동적으로 교정** 하고 **시각적 증거에 기반한 추론** 을 강화하는 학습 프로토콜과 보상 설계를 통합하는 것이 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.