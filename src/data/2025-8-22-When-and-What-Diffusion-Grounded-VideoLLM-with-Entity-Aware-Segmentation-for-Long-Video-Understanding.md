---
title: "[논문리뷰] When and What: Diffusion-Grounded VideoLLM with Entity Aware
  Segmentation for Long Video Understanding"
excerpt: "Rui Guo이 [arXiv]에 게시한 'When and What: Diffusion-Grounded VideoLLM with Entity Aware
  Segmentation for Long Video Understanding' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video-LLM
  - Diffusion Model
  - Temporal Grounding
  - Object Segmentation
  - Long Video Understanding
  - Multimodal AI
  - Video Question Answering

permalink: /ai/review/2025-8-22-When-and-What-Diffusion-Grounded-VideoLLM-with-Entity-Aware-Segmentation-for-Long-Video-Understanding/

toc: true
toc_sticky: true

date: 2025-08-22 13:10:52+0900
last_modified_at: 2025-08-22 13:10:52+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.15641)

**저자:** Pengcheng Fang, Yuxia Chen, Rui Guo



## 핵심 연구 목표
본 논문은 기존 Video-LLM의 한계인 불명확한 시간 인코딩, 프레임 수준의 낮은 연속성, 그리고 관심 엔티티에 대한 언어-비전 정렬 불일치를 극복하는 것을 목표로 합니다. 특히 긴 비디오에서 발생하는 이벤트의 정밀한 시간적 위치 파악과 엔티티 수준의 견고한 정렬을 통해 비디오 이해 능력을 향상시키고자 합니다.

## 핵심 방법론
세 가지 핵심 혁신을 도입합니다. 첫째, **Diffusion Temporal Latent (DTL) 인코더** 를 사용하여 시간적 일관성과 경계 민감도를 강화한 비디오 특징을 추출합니다. 둘째, **Grounded-SAM2** 및 **DINO 기반 트래킹** 을 통한 **객체 기반 표현** 으로 질의 엔티티를 시각적 증거에 명시적으로 연결하여 언어 모델링 전에 정렬을 강화합니다. 셋째, **이산 시간 토큰** 을 포함하는 **혼합 토큰(Mixed Token) 체계** 를 도입하여 명시적인 타임스탬프 모델링과 미세한 시간 추론을 가능하게 합니다.

## 주요 결과
제안된 Grounded-VideoDiT는 Charades-STA에서 **39.5 mIoU** , DiDeMo에서 **35.2 mIoU** 를 달성하여 Temporal Video Grounding에서 기존 모델들을 능가했습니다. 특히 Charades-STA의 **R@0.3에서는 58.7%** 를 기록하며 높은 IoU 임계값에서 뛰어난 성능을 보였습니다. Open-Ended VideoQA 벤치마크에서는 NExT-QA에서 **56.9% 정확도** 를 포함하여 MSVD-QA, MSRVTT-QA, ActivityNet-QA 등 4개 데이터셋에서 SOTA 성능을 달성했습니다.

## AI 실무자를 위한 시사점
이 연구는 비디오 콘텐츠의 미세한 시간적 이해와 객체 수준의 상호작용 분석이 중요한 AI 응용 분야에 큰 시사점을 제공합니다. **확산 모델을 비디오 특징 추출기** 로 활용하고 **세분화 기반 객체 트래킹** 을 LLM 파이프라인 전단에 통합한 것은 복잡한 비디오 시나리오에서 정밀한 시공간적 추론 능력을 요구하는 시스템 개발에 효과적인 접근 방식이 될 수 있습니다. 이는 자율주행, 보안 감시, 스포츠 분석 등 다양한 산업 분야에서 비디오 이해 기술의 실용적 발전을 가속화할 잠재력을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.