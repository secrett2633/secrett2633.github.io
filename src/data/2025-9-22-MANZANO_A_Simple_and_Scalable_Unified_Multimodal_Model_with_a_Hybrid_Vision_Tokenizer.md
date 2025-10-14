---
title: "[논문리뷰] MANZANO: A Simple and Scalable Unified Multimodal Model with a Hybrid
  Vision Tokenizer"
excerpt: "jialingt이 [arXiv]에 게시한 'MANZANO: A Simple and Scalable Unified Multimodal Model with a Hybrid
  Vision Tokenizer' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLM
  - Hybrid Tokenizer
  - Text-to-Image Generation
  - Visual Question Answering
  - Autoregressive Model
  - Diffusion Decoder
  - Unified Architecture
  - Model Scaling

permalink: /ai/review/2025-9-22-MANZANO_A_Simple_and_Scalable_Unified_Multimodal_Model_with_a_Hybrid_Vision_Tokenizer/

toc: true
toc_sticky: true

date: 2025-09-22 13:11:29+0900
last_modified_at: 2025-09-22 13:11:29+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.16197)

**저자:** Yanghao Li, Rui Qian, Bowen Pan, Haotian Zhang, Haoshuo Huang, Bowen Zhang, Jialing Tong, Haoxuan You, Xianzhi Du, Zhe Gan, Hyunjik Kim, Chao Jia, Zhenbang Wang, Yinfei Yang, Mingfei Gao, Zi-Yi Dou, Wenze Hu, Chang Gao, Dongxu Li, Philipp Dufter, Zirui Wang, Guoli Yin, Zhengdong Zhang, Chen Chen, Yang Zhao, Ruoming Pang, Zhifeng Chen



## 핵심 연구 목표
기존 통합 멀티모달 LLM이 시각적 이해와 생성 능력 사이의 성능 트레이드오프, 특히 텍스트가 풍부한 벤치마크에서의 저하를 겪는 문제를 해결하는 것을 목표로 합니다. 이 논문은 이러한 한계를 극복하고, 작업 간의 충돌을 최소화하면서 두 가지 핵심 기능을 효율적으로 지원하는 **간단하고 확장 가능한 통합 프레임워크**를 제안합니다.

## 핵심 방법론
Manzano는 **공유 시각 인코더**를 기반으로 **하이브리드 비전 토크나이저**를 도입합니다. 이는 이해 태스크를 위한 **연속형 어댑터**와 생성 태스크를 위한 **이산형 어댑터**로 구성되며, 이 둘은 공통의 의미 공간을 공유합니다. **통합 자동회귀(autoregressive) LLM 디코더**는 고수준 의미론(텍스트 및 이미지 토큰)을 예측하며, **보조 확산 디코더(DiT-Air 아키텍처)**가 생성된 이미지 토큰을 픽셀로 변환하여 고화질 이미지 생성을 담당합니다. 학습은 텍스트 전용, 이미지 이해, 이미지 생성 데이터의 혼합으로 구성된 **3단계 학습 레시피(사전 훈련, 연속 사전 훈련, SFT)**를 따르며, LLM 훈련 시 **텍스트 손실 대 이미지 손실 비율은 1:0.5**로 설정됩니다.

## 주요 결과
Manzano는 통합 모델 중 **최고 수준(SOTA)의 성능**을 달성했으며, 특히 **텍스트가 풍부한 이해 벤치마크(ChartQA, TextVQA, DocVQA, OCRBench)에서 모든 통합, 전문, 독점 모델을 능가**하는 경쟁력을 보여주었습니다. **하이브리드 토크나이저 패러다임**은 순수 이산형 및 듀얼 인코더 베이스라인보다 태스크 충돌이 가장 적고 모든 태스크에서 우수한 성능을 보였습니다(표 1). LLM 디코더를 **300M에서 30B 파라미터로 확장**했을 때, 모든 이해 및 생성 벤치마크에서 **단조로운 성능 향상**을 보였으며(예: 일반 VQA에서 **+14.2**, WISE 생성에서 **+12.0**), 이미지 디코더를 확장했을 때 **구조적 무결성이 +9.9 향상**되었습니다(그림 6).

## AI 실무자를 위한 시사점
**하이브리드 토크나이저**와 **디커플링된 LLM 및 이미지 디코더 설계**는 멀티모달 LLM이 이해와 생성 능력 사이의 성능 트레이드오프 없이 확장될 수 있음을 보여줍니다. 이러한 아키텍처는 **텍스트가 풍부한 데이터**와 **세계 지식 기반 생성 태스크**에서 특히 강력한 성능을 발휘하여, 복잡하고 다양한 AI 애플리케이션 개발에 유용하게 활용될 수 있습니다. AI 엔지니어는 Manzano의 **단계별 학습 레시피**와 **확장 전략**을 참고하여 효율적인 멀티모달 모델을 구축할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.