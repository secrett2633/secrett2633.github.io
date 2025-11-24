---
title: "[논문리뷰] ViCO: A Training Strategy towards Semantic Aware Dynamic High-Resolution"
excerpt: "이 [arXiv]에 게시한 'ViCO: A Training Strategy towards Semantic Aware Dynamic High-Resolution' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Large Language Models (MLLMs)
  - Dynamic Resolution
  - Token Compression
  - Semantic Awareness
  - Visual Consistency Learning (ViCO)
  - Visual Resolution Router (ViR)
  - Inference Optimization

permalink: /ai/review/2025-10-15-ViCO-A-Training-Strategy-towards-Semantic-Aware-Dynamic-High-Resolution/

toc: true
toc_sticky: true

date: 2025-10-15 13:01:40+0900
last_modified_at: 2025-10-15 13:01:40+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.12793)

**저자:** Long Cui, Weiyun Wang, Jie Shao, Zichen Wen, Gen Luo, Linfeng Zhang, Yanting Zhang, Yu Qiao, Wenhai Wang



## 핵심 연구 목표
본 논문은 MLLM의 이미지 입력으로 인한 추론 비용 증가 문제를 해결하고, 이미지의 **의미론적 복잡성**에 따라 가변적인 수의 시각 토큰을 사용하여 이미지를 효율적으로 표현하는 새로운 훈련 전략을 제안합니다. 이는 기존의 정적 또는 해상도 기반 동적 토큰 전략의 한계를 극복하여 효율성과 성능 간의 균형을 맞추는 것을 목표로 합니다.

## 핵심 방법론
**Visual Consistency Learning (ViCO)**이라는 새로운 훈련 알고리즘을 제안하며, 이는 **다중 MLP 커넥터**를 사용하여 이미지 패치를 다양한 압축률(예: **256토큰** 또는 **64토큰**)로 다운샘플링합니다. 훈련 중에는 다른 압축률로 처리된 시각 토큰에 대한 응답 간의 **KL divergence**를 최소화하여 모델의 일관성을 확보합니다. 추론 시에는 **Visual Resolution Router (ViR)**를 도입하여 각 이미지 패치에 적절한 압축률을 자동으로 선택하며, ViR는 손실 비율(`ri`)을 기반으로 훈련되는 **이진 분류기**로 구현됩니다.

## 주요 결과
**InternVL3.5 모델**에 ViCO를 적용한 결과, 시각 토큰 수를 **최대 50%까지 줄이면서** 모델의 인지, 추론 및 OCR 능력의 **99.6% 이상**을 유지했습니다. 이는 LLM의 첫 번째 토큰 처리량(First Token Throughput)을 **최대 1.8배** 향상시키는 결과를 가져왔습니다. 특히, **OCRBench**에서는 8B 모델이 **71%의 패치 압축률**을 달성하며 84.0에서 83.9로 거의 동일한 성능을 유지하는 등, 다양한 벤치마크에서 효율성과 성능의 우수한 균형을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 MLLM 배포 시 **추론 비용과 속도를 크게 최적화**할 수 있는 실용적인 방법을 제공하며, 특히 **문서 이해**나 **비디오 해석**처럼 여러 이미지를 처리해야 하는 시나리오에서 **GPU 리소스 활용 효율**을 높일 수 있습니다. **의미론적 복잡성에 기반한 동적 토큰 조절**은 모델이 중요한 정보에 집중하고 불필요한 연산을 줄이는 데 기여하여, **더욱 효율적인 MLLM 개발 및 운영**에 중요한 통찰을 제공할 것으로 기대됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.