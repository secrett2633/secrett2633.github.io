---
title: "[논문리뷰] Pay Less Attention to Function Words for Free Robustness of Vision-Language Models"
excerpt: "이 [arXiv]에 게시한 'Pay Less Attention to Function Words for Free Robustness of Vision-Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models
  - Adversarial Robustness
  - Function Words
  - Cross-Attention
  - Adversarial Attacks
  - Differential Attention
  - Vision-Language Alignment

permalink: /ai/review/2025-12-11-Pay-Less-Attention-to-Function-Words-for-Free-Robustness-of-Vision-Language-Models/

toc: true
toc_sticky: true

date: 2025-12-11 00:00:00+0900+0900
last_modified_at: 2025-12-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.07222)

**저자:** Qiwei Tian, Chenhao Lin, Zhengyu Zhao, Chao Shen



## 핵심 연구 목표
Vision-Language Model (VLM)의 견고성과 성능 간의 상충 관계를 해결하고, 특히 **함수어(function words)** 가 교차-모달 적대적 공격에 대한 VLM의 취약성을 유발한다는 가설을 검증하고자 합니다. 궁극적으로 함수어의 영향을 완화하여 VLM의 **시각-언어 정렬(VLA)** 을 개선하고 적대적 견고성을 무료로(free robustness) 향상시키는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **Function-word De-Attention (FDA)** 이라는 새로운 방법론을 제안합니다. FDA는 **fusion-encoder 내의 multi-attention head** 에 병렬 파이프라인을 배치하여 **함수어와 입력 이미지 간의 교차-어텐션** 을 계산하고 이를 "방해 요소(distractions)"로 정의합니다. 이 방해 요소를 **원본 어텐션 스코어에서 차등적으로 빼내는(differentially subtracts)** 방식으로 작동하여 모델이 함수어에 덜 집중하도록 유도합니다.

## 주요 결과
FDA는 **ALBEF, TCL, BLIP** 모델에 대해 **Flickr30k 및 MSCOCO** 데이터셋에서 6가지 적대적 공격 (PGD, APGD, MAPGD 포함)으로 평가되었습니다. 평균적으로 **18/13/53%의 ASR (Attack Success Rate) 감소** 를 달성했으며, 검색(retrieval) 작업에서 성능 하락은 **0.2/0.3/0.6%** 에 불과했습니다. 시각적 접지(visual grounding)에서는 **90% ASR 감소** 와 함께 **0.3%의 성능 향상** 을 보였으며, **BLIP 모델** 에서 특히 **54%의 ASR 추가 감소** 를 기록했습니다.

## AI 실무자를 위한 시사점
이 연구는 VLM의 적대적 견고성을 향상시키는 데 있어 **추가적인 파라미터나 상당한 계산 비용 없이** 효과적인 방법을 제공합니다. 함수어가 모델의 취약성에 미치는 영향에 대한 새로운 관점을 제시하며, 기존의 높은 비용과 성능 저하를 수반하는 **적대적 훈련(adversarial training, AT)** 방식의 실용적인 대안이 될 수 있습니다. FDA의 **플러그-앤-플레이(plug-and-play)** 특성 덕분에 기존 VLM 아키텍처에 쉽게 통합하여 모델의 견고성을 향상시킬 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.