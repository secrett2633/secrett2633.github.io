---
title: "[논문리뷰] Reinforced Attention Learning"
excerpt: "이 [arXiv]에 게시한 'Reinforced Attention Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Multimodal LLMs
  - Attention Mechanisms
  - Policy Gradient
  - Knowledge Distillation
  - Visual Grounding
  - Post-training

permalink: /ai/review/2026-02-06-Reinforced-Attention-Learning/

toc: true
toc_sticky: true

date: 2026-02-06 00:00:00+0900+0900
last_modified_at: 2026-02-06 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.04884)

**저자:** Bangzheng Li, Jianmo Ni, Chen Qu, Ian Miao, Liu Yang, Xingyu Fu, Muhao Chen and Derek Zhiyuan Cheng



## 핵심 연구 목표
본 논문은 기존 RL 기반 LLM 후처리 방식이 MLLM에서 시각적 추론을 위한 "생성할 내용"에만 초점을 맞추어 제한적인 성능 향상을 보이거나 심지어 성능을 저하시키는 문제를 해결하고자 합니다. 대신 "어디에 집중할 것인가"로 최적화 목표를 전환하여 MLLM의 **내부 어텐션 분포** 를 직접 최적화함으로써 멀티모달 입력에 대한 효과적인 정보 할당과 **시각적 접지(visual grounding)** 를 향상시키는 새로운 패러다임을 제안합니다.

## 핵심 방법론
저자들은 내부 어텐션 분포를 직접 정책으로 간주하여 최적화하는 **Reinforced Attention Learning (RAL)** 프레임워크를 제안합니다. 이 방식은 성공적인 어텐션 패턴과의 **다이버전스(divergence)** 를 최소화하고, 비최적 패턴으로부터는 다이버전스를 증가시키는 방식으로 모델을 학습시킵니다. 최종 목표 함수는 기존 **토큰 레벨 정책 기울기(LRL)** 와 어텐션 레벨 정규화 항( **λattnLAttnRL** )을 결합하며, **Jensen-Shannon Divergence (JSD)** 를 사용하여 어텐션 정책의 다이버전스를 측정합니다. 또한, 교사 모델의 "어디에 집중하는지"를 학생 모델에 전달하는 **On-Policy Attention Distillation** 기법을 도입하여 교차 모달 정렬을 강화합니다.

## 주요 결과
RAL은 다양한 이미지 및 비디오 벤치마크에서 **GRPO** 및 기본 **Qwen-2.5-VL-7B** 모델보다 일관되게 우수한 성능을 보였습니다. 이미지 VQA에서 **V* (+5.8점) **, ** MME (+94.1점) **, ** ChartQA (+2.8점) ** 등의 상당한 개선을 달성했으며, 장기 비디오 벤치마크에서는 ** LongVideoBench (+2.2점) **, ** NExTQA (+3.4점) ** 등 6/7개의 데이터셋에서 GRPO를 능가했습니다. 특히 ** On-Policy Attention Distillation **은 표준 증류 방식보다 7/8개의 벤치마크에서 더 나은 결과를 보이며, 시각적 해상도 증가에 따라 RAL의 성능 이점은 더욱 커지는 경향을 보였습니다(** V* 2048 토큰에서 +6.3점 **).

## AI 실무자를 위한 시사점
RAL은 MLLM 후처리 과정에서 ** 내부 어텐션 메커니즘 **을 직접 최적화하는 것이 토큰 기반 RL보다 ** 더욱 안정적이고 일반화 가능한 학습 신호 **를 제공함을 보여주었습니다. 이는 AI/ML 엔지니어들이 멀티모달 모델의 ** 시각적 접지 ** 및 ** 추론 능력 **을 향상시키기 위한 효과적인 새로운 방법론을 제공합니다. 특히, ** On-Policy Attention Distillation **은 교사 모델의 고품질 어텐션 패턴을 학생 모델에 전이시켜 ** 크로스 모달 정렬**을 강화하고, 복잡한 시각-언어 이해 및 장기 비디오 분석 태스크에서 모델의 성능을 향상시키는 데 실용적인 가치를 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.