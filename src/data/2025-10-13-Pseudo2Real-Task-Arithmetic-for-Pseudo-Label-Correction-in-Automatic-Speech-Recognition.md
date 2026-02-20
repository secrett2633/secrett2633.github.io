---
title: "[논문리뷰] Pseudo2Real: Task Arithmetic for Pseudo-Label Correction in Automatic
  Speech Recognition"
excerpt: "Shang-Tse Chen이 arXiv에 게시한 'Pseudo2Real: Task Arithmetic for Pseudo-Label Correction in Automatic
  Speech Recognition' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - ASR
  - Pseudo-labeling
  - Domain Adaptation
  - Task Arithmetic
  - Correction Vector
  - Accent Adaptation
  - Speaker Clustering
  - Model Editing

permalink: /ai/review/2025-10-13-Pseudo2Real-Task-Arithmetic-for-Pseudo-Label-Correction-in-Automatic-Speech-Recognition/

toc: true
toc_sticky: true

date: 2025-10-13 13:44:18+0900
last_modified_at: 2025-10-13 13:44:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.08047)

**저자:** Yi-Cheng Lin, Yu-Hsuan Li Liang, Hsuan Su, Tzu-Quan Lin, Shang-Tse Chen, Yun-Nung Chen, Hung-yi Lee



## 핵심 연구 목표
본 논문은 ASR 도메인 적응 시 타겟 도메인의 실제 레이블(ground truth)이 없는 상황에서 **pseudo-labeling** 으로 인해 발생하는 체계적인 오류 패턴을 완화하는 것을 목표로 합니다. 특히, 기존의 필터링이나 반복 학습 방법으로는 해결하기 어려운 **accent-specific** 및 구조적 편향을 파라미터 공간에서 수정하는 방법을 제안합니다.

## 핵심 방법론
저자들은 **"Pseudo2Real"** 이라는 파라미터 공간 보정 기법을 제안합니다. 이는 소스 도메인에서 실제 레이블과 pseudo-label로 각각 파인튜닝된 두 ASR 모델의 **가중치 차이** 를 계산하여 **"보정 벡터(correction vector)"** τ를 정의합니다. 이 보정 벡터에 **스케일링 인자(λ)** 를 곱하여 타겟 도메인에서 **pseudo-label로 파인튜닝된 모델** 에 추가함으로써 ASR 성능을 개선합니다. 또한, 화자 다양성을 고려하여 **ECAPA-TDNN 임베딩** 과 **k-means 클러스터링** 을 활용해 서브그룹별 보정 벡터를 생성하는 **"Pseudo2Real-SC"** 를 확장 제안합니다.

## 주요 결과
**AFRISPEECH-200** 데이터셋의 10개 아프리카 악센트에서 실험한 결과, **Whisper TINY 모델** 의 경우 pseudo-label 파인튜닝 대비 평균 **35%의 상대적 WER(Word Error Rate) 감소** 를 달성했습니다. 특히 **Ijaw, Idoma, Yoruba** 와 같은 어려운 악센트에서는 **최대 50점의 WER 감소** 를 보였습니다. **Pseudo2Real-SC** 는 **MEDIUM** 교사 모델 사용 시 평균 **4.0%** , **LARGE** 교사 모델 사용 시 평균 **6.1%** 의 추가 개선을 보여주었습니다.

## AI 실무자를 위한 시사점
이 연구는 타겟 도메인 레이블 없이도 **pseudo-label의 체계적인 편향** 을 파라미터 공간에서 효과적으로 수정할 수 있음을 보여주어, **저자원 ASR 도메인 적응** 에 중요한 기여를 합니다. **사전 학습된 보정 벡터** 를 활용하여 모델의 견고성과 일반화 성능을 향상시킬 수 있으며, **스케일링 인자 λ** 및 **클러스터 수 k** 와 같은 하이퍼파라미터 튜닝이 성능에 미치는 영향을 고려해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.