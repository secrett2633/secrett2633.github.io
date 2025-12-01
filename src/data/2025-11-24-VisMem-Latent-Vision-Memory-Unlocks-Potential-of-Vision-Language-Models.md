---
title: "[논문리뷰] VisMem: Latent Vision Memory Unlocks Potential of Vision-Language Models"
excerpt: "Yudong Zhang이 [arXiv]에 게시한 'VisMem: Latent Vision Memory Unlocks Potential of Vision-Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models
  - Latent Memory
  - Cognitive Memory
  - Visual Grounding
  - Short-term Memory
  - Long-term Memory
  - Reinforcement Learning

permalink: /ai/review/2025-11-24-VisMem-Latent-Vision-Memory-Unlocks-Potential-of-Vision-Language-Models/

toc: true
toc_sticky: true

date: 2025-11-24 00:00:00+0900+0900
last_modified_at: 2025-11-24 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.11007)

**저자:** Xinlei Yu, Chengming Xu, Guibin Zhang, Zhangquan Chen, Yudong Zhang, Jiangning Zhang, Xiaobin Hu, Yongbo He, Peng-Tao Jiang, Shuicheng Yan



## 핵심 연구 목표
본 논문은 Vision-Language Models(VLMs)의 "시각 처리 병목 현상"을 해결하여, 긴 생성 과정에서 시각적 증거에 대한 접지력 상실 및 맥락화된 시각 경험 부족 문제를 극복하고, 정밀한 지각, 다단계 추론, 장기 생성 시퀀스 전반에 걸친 시각적 충실도를 향상시키는 것을 목표로 합니다.

## 핵심 방법론
VisMem은 인간의 인지 기억 이론에서 영감을 받아, VLMs에 동적인 **잠재 시각 기억** 시스템을 도입합니다. 이 시스템은 미세한 지각 유지를 위한 **단기 기억 모듈** 과 추상적인 의미론적 통합을 위한 **장기 기억 모듈** 로 구성되며, **특수 호출 토큰** 을 통해 자동 회귀 생성 중에 메모리를 동적으로 활성화합니다. **강화 학습(GRPO)** 기반의 2단계 훈련 패러다임을 사용하여 메모리 콘텐츠 형성 및 메모리 호출 패턴을 최적화합니다.

## 주요 결과
VisMem은 다양한 시각 벤치마크(이해, 추론, 생성)에서 바닐라 모델 대비 **평균 11.8%** 의 성능 향상을 달성했습니다. 특히, 시각적 이해에서 **+8.9%** , 추론에서 **+16.4%** , 생성에서 **+10.6%** 의 성능 향상을 보였으며, 교차 도메인 일반화 능력(예: MMVet에서 **+6.9%** , MV-Math에서 **+20.2%** )과 **치명적 망각(catastrophic forgetting) 완화** 에 효과적임을 입증했습니다.

## AI 실무자를 위한 시사점
VisMem은 기존 VLM의 아키텍처를 변경하지 않으면서 시각적 능력(특히 정밀한 지각 및 복잡한 추론)을 향상시키는 실용적인 방법을 제공합니다. **낮은 추론 지연 시간** 을 유지하면서 여러 기본 모델에 걸쳐 **강력한 호환성** 을 보여, 기존 VLM 기반 시스템에 쉽게 통합될 수 있는 잠재력을 가집니다. 이는 더욱 강력하고 일반화 가능한 AI 시스템 개발에 중요한 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.