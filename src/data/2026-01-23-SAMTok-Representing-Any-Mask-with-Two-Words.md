---
title: "[논문리뷰] SAMTok: Representing Any Mask with Two Words"
excerpt: "이 [arXiv]에 게시한 'SAMTok: Representing Any Mask with Two Words' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Mask Tokenization
  - Multimodal LLMs
  - Pixel-wise Vision-Language
  - Reinforcement Learning
  - Segmentation Anything Model
  - Discrete Representation

permalink: /ai/review/2026-01-23-SAMTok-Representing-Any-Mask-with-Two-Words/

toc: true
toc_sticky: true

date: 2026-01-23 00:00:00+0900+0900
last_modified_at: 2026-01-23 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.16093)

**저자:** Yikang Zhou, Tao Zhang, Dengxian Gong, Yuanzheng Wu, Ye Tian, Haochen Wang, Haobo Yuan, Jiacong Wang, Lu Qi, Hao Fei, Anran Wang, Zhuochen Wang, Yujing Wang, Cheng Chen, Shunping Ji, Xiangtai Li



## 핵심 연구 목표
본 논문은 픽셀 단위의 멀티모달 대규모 언어 모델(MLLMs)이 복잡한 인코더, 전용 디코더, 비호환적인 훈련 목표로 인해 확장성 문제를 겪는 점을 해결하고자 합니다. 특히, 기존 MLLM에 아키텍처 변경이나 특수 손실 함수 없이 **마스크를 새로운 언어 토큰으로 취급** 하여 픽셀 단위 기능을 쉽고 효과적으로 부여하는 것을 목표로 합니다.

## 핵심 방법론
논문은 어떤 마스크든 두 개의 특수 토큰으로 변환하고 고정밀도로 재구성하는 이산 마스크 토크나이저 **SAMTok** 을 제안합니다. **SAMTok** 은 **SAM2** 를 기반으로 하며, 마스크 인코더와 **잔차 벡터 양자화기(residual vector quantizer)** 를 통해 마스크를 압축된 이산 토큰으로 변환합니다. MLLM 훈련 시에는 표준 **다음 토큰 예측(next-token prediction)** 및 **텍스트 기반 답변 매칭 보상(textual answer-matching reward)** 을 활용한 **강화 학습(GRPO)** 을 사용합니다.

## 주요 결과
**SAMTok** 기반 **QwenVL-SAMTok** 모델은 기존 SOTA 또는 이에 준하는 성능을 달성했습니다. 특히, **GRES** 검증 세트에서 RL 적용 시 **gIoU 8.9%** , **N-acc 21.0%** 향상을 보였으며, 이는 기존 SOTA 대비 **gIoU 4.3%** , **N-acc 8.3%** 더 높은 수치입니다. 또한 **GCG** 검증 세트에서는 **AP50 4.7%** , **Recall 6.6%** 개선을 이루었습니다.

## AI 실무자를 위한 시사점
**SAMTok** 은 MLLM에 픽셀 단위 기능을 통합하는 **확장 가능하고 통합된 패러다임** 을 제시하여, 복잡한 아키텍처 수정이나 특수 손실 함수 없이도 효율적인 개발을 가능하게 합니다. 마스크를 이산적인 텍스트 토큰으로 처리함으로써, AI 실무자들은 **자연어 처리 기반의 강화 학습 기법** 을 마스크 생성 태스크에 직접 적용하여 성능을 더욱 효과적으로 최적화할 수 있습니다. 이는 시각적 접지 및 생성 능력을 갖춘 **대화형 AI 시스템** 구축을 용이하게 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.