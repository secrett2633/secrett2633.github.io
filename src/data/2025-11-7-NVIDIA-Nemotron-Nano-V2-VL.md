---
title: "[논문리뷰] NVIDIA Nemotron Nano V2 VL"
excerpt: "arXiv에 게시된 'NVIDIA Nemotron Nano V2 VL' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Model
  - Hybrid Architecture
  - Mamba-Transformer
  - Long-Context Understanding
  - Quantization
  - Efficient Inference
  - Document AI
  - Video AI

permalink: /ai/review/2025-11-7-NVIDIA-Nemotron-Nano-V2-VL/

toc: true
toc_sticky: true

date: 2025-11-09 22:08:24+0900
last_modified_at: 2025-11-09 22:08:24+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.03929)

**저자:** NVIDIA et al.



## 핵심 연구 목표
Nemotron Nano V2 VL은 강력한 실세계 **문서 이해** , **긴 비디오 이해** , 그리고 **추론 태스크** 를 위해 설계된 최신 비전-언어 모델입니다. 이전 모델인 **Llama-3.1-Nemotron-Nano-VL-8B** 대비 모든 비전 및 텍스트 영역에서 상당한 성능 향상을 달성하며, **효율적인 추론 처리량** 과 확장된 컨텍스트 길이를 통해 복잡한 멀티모달 문제를 해결하는 것을 목표로 합니다.

## 핵심 방법론
이 모델은 **Nemotron Nano V2** 의 **하이브리드 Mamba-Transformer LLM** 과 **RADIOv2.5 비전 인코더** 를 기반으로 합니다. 모델은 **다단계 지도 미세 조정(SFT) 학습** 전략을 사용하여 개발되었으며, 초기 16K 컨텍스트 학습 후 49K 및 **300K 컨텍스트 확장** 단계와 **코드 추론 능력 복구** 단계를 포함합니다. 특히, **Efficient Video Sampling (EVS)** 및 토큰 압축 기술을 활용하여 긴 문서 및 비디오 시나리오에서 **높은 추론 처리량** 을 달성합니다.

## 주요 결과
Nemotron Nano V2 VL은 **OCRBench v2** 비공개 리더보드에서 선두적인 정확도를 달성하며, **Llama-3.1-Nemotron-Nano-VL-8B** 대비 전반적인 벤치마크에서 일관된 성능 향상을 보였습니다. **하이브리드 Mamba-Transformer LLM 아키텍처** 는 긴 멀티페이지 문서 이해에서 **35% 더 높은 처리량** 을 제공하며, **EVS** 는 비디오 이해에서 정확도 저하 없이 **2배 이상의 처리량** 을 가속화합니다. 또한, 코드 추론 복구 단계 이후 **LiveCodeBench 점수는 55.00에서 69.44로, RULER 점수는 17.39에서 72.12로 크게 향상** 되었습니다.

## AI 실무자를 위한 시사점
Nemotron Nano V2 VL은 **하이브리드 Mamba-Transformer 아키텍처** 와 **EVS** 를 통해 장문 컨텍스트 멀티모달 작업에서 **뛰어난 효율성과 성능** 을 제공하여, 실시간 문서 분석 및 긴 비디오 콘텐츠 처리 등 **실용적인 AI 응용 분야** 에 큰 이점을 제공합니다. **BF16, FP8, FP4 형식의 모델 가중치** 공개 및 **학습 데이터셋/코드 공유** 는 개발자들이 다양한 하드웨어에서 모델을 쉽게 활용하고 최적화하여 혁신적인 멀티모달 AI 솔루션을 구축하는 데 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.