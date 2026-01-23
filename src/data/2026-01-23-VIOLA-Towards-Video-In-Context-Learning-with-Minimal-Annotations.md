---
title: "[논문리뷰] VIOLA: Towards Video In-Context Learning with Minimal Annotations"
excerpt: "Ryo Hachiuma이 [arXiv]에 게시한 'VIOLA: Towards Video In-Context Learning with Minimal Annotations' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video In-Context Learning
  - Minimal Annotation
  - Active Learning
  - Pseudo-Labeling
  - Multimodal LLMs
  - Density-Uncertainty Sampling
  - Confidence-Aware Retrieval
  - Low-Resource Adaptation

permalink: /ai/review/2026-01-23-VIOLA-Towards-Video-In-Context-Learning-with-Minimal-Annotations/

toc: true
toc_sticky: true

date: 2026-01-23 00:00:00+0900+0900
last_modified_at: 2026-01-23 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.15549)

**저자:** Ryo Fujii, Hideo Saito, Ryo Hachiuma



## 핵심 연구 목표
본 논문은 **레이블링된 데이터가 부족한** 새로운 비디오 도메인에서 **Multimodal Large Language Models (MLLMs)** 의 일반화 능력을 향상시키는 것을 목표로 합니다. 특히, In-Context Learning (ICL)이 대규모 주석 풀에 의존하는 한계를 극복하고, 전문가의 최소한의 감독과 풍부한 비레이블 데이터를 효과적으로 결합하는 **레이블 효율적인 프레임워크** 를 제안합니다.

## 핵심 방법론
VIOLA는 세 단계로 구성됩니다: 첫째, **밀도-불확실성 가중 샘플링(density-uncertainty-weighted sampling)** 을 통해 전문가 주석을 위한 대표적이고 유용한 샘플을 선별합니다. 둘째, 선정된 소수의 전문가 레이블 데이터를 컨텍스트로 활용하여 나머지 비레이블 데이터에 대한 **인컨텍스트 의사-주석(in-context pseudo-annotation)** 을 수행, **신뢰도 점수** 와 함께 의사 레이블을 생성합니다. 마지막으로, **신뢰도 인식 검색(confidence-aware retrieval)** 및 **신뢰도 인식 프롬프트(confidence-aware prompting)** 를 통해 하이브리드 풀에서 시각적 유사성과 레이블 신뢰도를 균형 있게 고려하여 데모를 검색하고 MLLM이 신뢰도에 따라 추론하도록 안내합니다.

## 주요 결과
VIOLA는 **9가지 다양한 벤치마크** 와 **4가지 MLLM** 에 대한 광범위한 실험에서 **저자원 설정** 에서 다양한 기준선보다 뛰어난 성능을 보였습니다. 특히, **Qwen2-VL-7B** 모델을 사용했을 때 산업용 ENIGMA 데이터셋에서 **+53.6%** , 동물 중심의 EgoPet 데이터셋에서 **+38.2%** 의 정확도 향상을 달성했습니다. 이는 최소한의 주석 비용으로도 강력한 도메인 적응을 가능하게 함을 입증합니다.

## AI 실무자를 위한 시사점
본 연구는 산업 또는 수술 환경과 같이 **전문가 주석이 비싸거나 희귀한** 실제 비디오 애플리케이션에서 MLLM을 효율적으로 적용할 수 있는 실용적인 방법을 제시합니다. **적은 레이블 데이터** 만으로도 모델이 새로운 데이터 분포에 **견고하게 적응** 할 수 있도록 하여, 대규모 데이터셋 구축의 부담 없이 **비디오 ICL의 성능을 극대화** 할 수 있는 가능성을 열었습니다. **사전 훈련된 MLLM** 을 활용하는 **훈련 없는(training-free) 적응 경로** 를 제공하여 컴퓨팅 비용을 절감하는 데 기여합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.