---
title: "[논문리뷰] A Glimpse to Compress: Dynamic Visual Token Pruning for Large
  Vision-Language Models"
excerpt: "Zuxuan Wu이 [arXiv]에 게시한 'A Glimpse to Compress: Dynamic Visual Token Pruning for Large
  Vision-Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Vision-Language Models (LVLMs)
  - Visual Token Pruning
  - Dynamic Compression
  - GlimpsePrune
  - Computational Efficiency
  - VQA
  - Reinforcement Learning

permalink: /ai/review/2025-8-5-A-Glimpse-to-Compress-Dynamic-Visual-Token-Pruning-for-Large-Vision-Language-Models/

toc: true
toc_sticky: true

date: 2025-08-05 11:40:52+0900
last_modified_at: 2025-08-05 11:40:52+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.01548)

A Glimpse to Compress: Dynamic Visual Token Pruning for Large Vision-Language Models

**저자:** Quan-Sheng Zeng, Yunheng Li, Qilong Wang, Peng-Tao Jiang, Zuxuan Wu, Ming-Ming Cheng, Qibin Hou



## 핵심 연구 목표
본 연구는 대규모 시각-언어 모델(LVLM)에서 고해상도 입력 처리 시 발생하는 시각 토큰 폭증으로 인한 비효율성을 해결하고자 합니다. 기존 고정된 압축률 방식의 부정확한 토큰 제거 문제를 극복하고, 입력 복잡도에 동적으로 적응하는 **데이터 기반의 시각 토큰 가지치기(pruning) 방법론**을 개발하여 성능 저하 없이 효율성을 극대화하는 것을 목표로 합니다.

## 핵심 방법론
제안된 **GlimpsePrune** 프레임워크는 데이터 기반의 **"glimpse"** 아이디어를 활용합니다. 프리필링(prefilling) 단계에서 **학습 가능한 "glimpse token"**을 삽입하고, LLM 디코더의 초기 K개 레이어에서 이 glimpse token과 모든 시각 토큰 간의 **교차-어텐션 점수**를 추출합니다. 이 점수와 다중 레벨 시각 특징은 경량의 **Visual Importance Predictor (VIP)**에 입력되어 토큰 중요도 맵을 생성하며, 이를 기반으로 **원샷(one-shot) 방식으로 관련 없는 시각 토큰과 해당 KV 캐시를 가지치기**합니다. 또한, 강화 학습(RL) 기반의 **GRPO 프레임워크**를 통해 **GlimpsePrune+**를 미세 조정하여 성능을 향상시킵니다.

## 주요 결과
**GlimpsePrune**은 시각 토큰의 **평균 92.6%를 가지치기**하면서도, 자유 형식 VQA(Visual Question Answering) 태스크에서 Qwen2.5-VL-7B 모델의 **기준 성능을 100% 유지**하는 데 성공했습니다. 특히, **GlimpsePrune+**는 기준 성능의 **110%**를 달성하면서도 높은 가지치기율을 유지했습니다. 이러한 효율성 덕분에 프리필링 비용이 **69.1%**로 감소하고, 최대 GPU 메모리 사용량이 **72.8%** 절감되는 것을 확인했습니다.

## AI 실무자를 위한 시사점
**GlimpsePrune**은 고해상도 이미지를 처리하는 LVLM의 **배포 효율성을 혁신적으로 개선**할 수 있는 실용적인 방법론입니다. **데이터 기반의 동적 토큰 가지치기**는 기존 고정 압축 방식의 한계를 극복하고, **경량 VIP 모듈과 원샷 가지치기 전략**은 실제 서비스 환경에서의 계산 및 메모리 부담을 크게 줄여줍니다. **강화 학습을 통한 성능 향상**은 정확성을 유지하면서도 효율적인 모델을 구축하는 데 중요한 방향을 제시하며, 이는 특히 리소스 제약이 있는 환경에서 LVLM을 운영하는 AI 엔지니어에게 매우 유용합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.