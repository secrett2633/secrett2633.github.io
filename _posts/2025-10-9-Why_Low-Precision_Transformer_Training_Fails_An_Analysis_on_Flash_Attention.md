---
title: "[논문리뷰] Why Low-Precision Transformer Training Fails: An Analysis on Flash
  Attention"
excerpt: "이 [arXiv]에 게시한 'Why Low-Precision Transformer Training Fails: An Analysis on Flash
  Attention' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Low-Precision Training
  - Flash Attention
  - Transformer
  - Numerical Stability
  - BF16
  - Rounding Error
  - Gradient Bias
  - Deep Learning Optimization

permalink: /ai/review/2025-10-9-Why_Low-Precision_Transformer_Training_Fails_An_Analysis_on_Flash_Attention/

toc: true
toc_sticky: true

date: 2025-10-09 13:45:06+0900
last_modified_at: 2025-10-09 13:45:06+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.04212)

**저자:** Haiquan Qiu, Quanming Yao



## 핵심 연구 목표
본 논문은 **저정밀도(low-precision) Flash Attention**을 사용하는 Transformer 모델 학습 시 발생하는 치명적인 손실 폭발(loss explosion) 현상의 **기계론적 원인**을 규명하는 것을 목표로 합니다. 기존의 경험적 해결책들이 아닌, 근본적인 수치적 불안정성의 메커니즘을 밝혀내고 이를 해결할 수 있는 원칙적인 솔루션을 제시하고자 합니다.

## 핵심 방법론
연구팀은 **BF16 정밀도**로 학습되는 **GPT-2 모델**에서 손실 폭발을 재현하고, Flash Attention의 역전파 과정, 특히 **`O` 행렬 계산** 및 **`rowsum(dOoO)`** 연산 내의 수치적 오류로 문제의 원인을 국한했습니다. 핵심 원인으로 **유사 저랭크(low-rank) 표현**의 출현과 **PV 곱셈** 중 발생하는 **BF16 연산의 편향된 반올림 오류(biased rounding error)**를 밝혀냈으며, 이를 완화하기 위해 **안전한 softmax**의 정규화 팩터 `m`을 동적으로 조정하는 수정된 Flash Attention 알고리즘을 제안했습니다.

## 주요 결과
**BF16 Flash Attention**을 사용한 학습은 수천 스텝 후 손실이 급격히 증가하며 불안정해졌고, 고정밀도(FP32) 대비 불안정한 수렴을 보였습니다(Figure 8). 저정밀도와 고정밀도 `δ` 값의 차이인 `(δlp – δhp)[T]`의 누적 합계가 **일관되게 양수**로 나타나 체계적인 오류 편향이 존재함을 확인했습니다. 제안된 **안정화된 Flash Attention** (예: **β=7** 사용)은 손실 폭발을 성공적으로 방지하고 표준 Flash Attention과 유사한 안정적인 학습을 가능하게 했습니다(Figure 7). 또한, BF16 덧셈 연산에서 **최대 -0.015625**의 음의 반올림 오류가 발생할 수 있음을 정량적으로 보여주었습니다.

## AI 실무자를 위한 시사점
**Flash Attention**과 같은 고성능 최적화 기법을 **저정밀도**로 활용할 때 발생하는 **수치적 불안정성**의 심층적인 원인을 이해하는 데 중요한 통찰력을 제공합니다. **BF16 연산의 미세한 편향된 반올림 오류**가 전체 모델 학습에 미치는 치명적인 영향과 **Attention sink** 현상과의 연관성을 밝혀, 대규모 모델 학습 시 **수치적 견고성**의 중요성을 강조합니다. 제안된 **동적 최대값 조정 기법**은 저정밀도 학습의 안정성을 향상시키는 실용적인 방안을 제공하며, 향후 다양한 아키텍처와 저정밀도 형식에서의 안정성 연구에 기반을 마련했습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.