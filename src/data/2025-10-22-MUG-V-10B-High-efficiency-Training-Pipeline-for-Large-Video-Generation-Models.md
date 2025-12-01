---
title: "[논문리뷰] MUG-V 10B: High-efficiency Training Pipeline for Large Video Generation
  Models"
excerpt: "이 [arXiv]에 게시한 'MUG-V 10B: High-efficiency Training Pipeline for Large Video Generation
  Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Diffusion Transformer
  - Large-scale Training
  - Megatron-Core
  - Video VAE
  - E-commerce AI
  - High-efficiency Pipeline
  - Preference Optimization

permalink: /ai/review/2025-10-22-MUG-V-10B-High-efficiency-Training-Pipeline-for-Large-Video-Generation-Models/

toc: true
toc_sticky: true

date: 2025-10-22 13:07:20+0900
last_modified_at: 2025-10-22 13:07:20+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.17519)

**저자:** Yongshun Zhang, Zhongyi Fan, Yonghang Zhang, Zhangzikang Li, Weifeng Chen, Zhongwei Feng, Chaoyue Wang, Peng Hou, Anxiang Zeng (LLM Team, Shopee Pte. Ltd.)



## 핵심 연구 목표
본 논문은 **대규모 비디오 생성 모델** 의 훈련에서 발생하는 교차-모달 텍스트-비디오 정렬, 긴 시퀀스, 복잡한 시공간적 종속성 문제를 해결하기 위해 **고효율 훈련 프레임워크** 를 개발하는 것을 목표로 합니다. 특히, **Diffusion Transformers (DiT)** 기반의 비디오 생성 모델을 안정적이고 효율적으로 훈련하는 데 중점을 둡니다.

## 핵심 방법론
연구팀은 데이터 처리, 모델 아키텍처, 훈련 전략, 인프라의 네 가지 핵심 요소를 최적화했습니다. 주요 기술로는 **8x8x8 압축률** 을 달성하는 **고효율 Video VAE** , 안정적인 훈련을 위한 **100억 개의 파라미터를 가진 Diffusion Transformer 백본** , **커리큘럼 기반 다단계 사전 훈련** , **KTO** 및 **DPO** 를 활용한 선호도 최적화가 포함됩니다. 인프라 측면에서는 **Megatron-Core** 를 기반으로 데이터, 텐서, 파이프라인 병렬 처리를 통합하고 **수작업으로 작성된 Triton 커널** 을 통해 높은 훈련 효율성을 달성했습니다.

## 주요 결과
최종 모델인 **MUG-V 10B** 는 최신 SOTA 비디오 생성 모델과 동등한 성능을 보였으며, 특히 **e-commerce 지향 비디오 생성 작업** 에서는 인간 평가에서 선도적인 오픈소스 모델들을 능가했습니다. VBench I2V 리더보드에서 **세 번째 순위** 를 기록했으며, 인간 평가에서는 **Wan2.1-TI2V (24.40% Pass Rate)** 및 **Hunyuan-TI2V (14.29% Pass Rate)** 대비 월등히 높은 **29.00%의 Pass Rate** 와 **2.80%의 High-quality Rate** 를 달성했습니다. **Video VAE** 는 256p에서 **32.2 PSNR** 이라는 높은 재구성 품질을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 **Megatron-Core** 를 활용한 **대규모 비디오 생성 모델** 의 **고효율 훈련 파이프라인** 을 **완전하게 오픈소스** 하여 연구자 및 실무자들의 비디오 생성 분야 진입 장벽을 크게 낮춥니다. 특히 **e-commerce 환경** 에서 제품 시연 비디오와 같은 **실용적인 애플리케이션** 에 대한 강력한 성능을 제공하며, **높은 압축률** 과 **안정적인 훈련 전략** 은 자원 제약이 있는 환경에서도 대규모 모델을 효과적으로 활용할 수 있는 방안을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.