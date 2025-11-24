---
title: "[논문리뷰] SANA-Video: Efficient Video Generation with Block Linear Diffusion
  Transformer"
excerpt: "이 [arXiv]에 게시한 'SANA-Video: Efficient Video Generation with Block Linear Diffusion
  Transformer' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Diffusion Model
  - Linear Attention
  - Transformer
  - Long Video
  - Efficient Inference
  - Constant Memory
  - Low-Cost Training
  - RTX Deployment

permalink: /ai/review/2025-9-30-SANA-Video-Efficient-Video-Generation-with-Block-Linear-Diffusion-Transformer/

toc: true
toc_sticky: true

date: 2025-09-30 13:52:24+0900
last_modified_at: 2025-09-30 13:52:24+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.24695)

**저자:** Junsong Chen, Yuyang Zhao, Jincheng Yu, Xianbang Wang, Yicheng Pan, Hao Zhang, Muyang Li, Daquan Zhou, Yukang Chen, Ruihang Chu, Junyu Chen, Shuai Yang, Huan Ling, Haozhe Liu, Hongwei Yi, Han Cai, Sanja Fidler, Ping Luo, Song Han, Enze Xie



## 핵심 연구 목표
본 논문은 기존 비디오 생성 모델의 높은 연산 복잡성(`O(N^2)`)과 느린 추론 속도로 인한 비효율성을 해결하여, **고해상도(720x1280), 고품질, 장시간(분 단위) 비디오를 빠르고 효율적으로 생성**하는 소형 확산 모델인 SANA-Video를 개발하는 것을 목표로 합니다. 특히, `RTX 5090 GPU`와 같은 엣지 디바이스에서도 배포 가능한 효율성을 추구합니다.

## 핵심 방법론
SANA-Video는 `Linear DiT`를 핵심 연산으로 채택하여 기존 어텐션의 `O(N^2)` 복잡도를 `O(N)`으로 줄였습니다. 장시간 비디오 생성을 위해 **선형 어텐션의 누적 속성**을 활용한 `constant-memory KV cache`를 갖춘 `block-wise autoregressive` 방식을 설계했으며, `Rotary Position Embeddings (RoPE)`와 `1D temporal convolution`을 도입하여 모델 성능을 강화했습니다. 또한, 효율적인 `DCAE-V` 압축 오토인코더와 정교한 데이터 필터링, 단계별 학습 전략을 사용했습니다.

## 주요 결과
SANA-Video는 기존 소형 확산 모델 대비 **16배 빠른 추론 속도**를 달성했으며, `NVIDIA H100 GPU`에서 5초 길이 720p 비디오를 **36초** 만에 생성합니다. `RTX 5090 GPU`에서는 `NVFP4` 정밀도를 사용하여 동일한 비디오를 **29초** 만에 생성하여 **2.4배**의 추가적인 속도 향상을 보여주었습니다. 학습 비용은 **64대 H100 GPU에서 12일**로 `MovieGen`의 1% 수준이며, VBench에서 경쟁력 있는 **83.71 Total Score**를 기록했습니다.

## AI 실무자를 위한 시사점
SANA-Video는 **낮은 비용으로 고품질의 장시간 비디오를 생성**할 수 있는 가능성을 제시하여, 비디오 생성 기술의 대중화와 접근성 향상에 기여합니다. 특히, `constant-memory KV cache`를 통해 장시간 비디오 생성의 메모리 제약을 해결한 점은 `world model` 및 `embodied AI`와 같은 다운스트림 애플리케이션의 발전에 실질적인 영향을 미칠 것입니다. 또한, `RTX 5090 GPU`에서의 `NVFP4` 양자화 배포는 **엣지 디바이스에서의 비디오 생성** 가능성을 열어줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.