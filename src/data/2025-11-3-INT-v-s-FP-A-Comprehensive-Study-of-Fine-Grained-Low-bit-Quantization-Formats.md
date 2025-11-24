---
title: "[논문리뷰] INT v.s. FP: A Comprehensive Study of Fine-Grained Low-bit Quantization
  Formats"
excerpt: "이 [arXiv]에 게시한 'INT v.s. FP: A Comprehensive Study of Fine-Grained Low-bit Quantization
  Formats' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Quantization
  - Low-bit Formats
  - Integer Quantization
  - Floating-Point Quantization
  - Large Language Models (LLMs)
  - Hardware Efficiency
  - Fine-Grained Quantization
  - MXINT8

permalink: /ai/review/2025-11-3-INT-v-s-FP-A-Comprehensive-Study-of-Fine-Grained-Low-bit-Quantization-Formats/

toc: true
toc_sticky: true

date: 2025-11-09 19:01:31+0900
last_modified_at: 2025-11-09 19:01:31+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.25602)

**저자:** Mengzhao Chen, Meng Wu, Hui Jin, Zhihang Yuan, Jing Liu, Chaoyi Zhang, Yunshui Li, Jie Huang, Jin Ma, Zeyue Xue, Zhiheng Liu, Xingyan Bin, Ping Luo



## 핵심 연구 목표
현대 AI 하드웨어는 LLM의 아웃라이어를 처리하기 위해 저정밀 부동소수점(FP) 형식을 점차 채택하고 있으나, 다양한 과립도(granularity)에 걸친 FP와 정수(INT) 양자화에 대한 통합적인 비교 연구가 부족합니다. 이 논문은 FP 및 INT 형식 간의 절충점을 체계적으로 조사하여, 특히 **세분화된(블록 단위) 양자화 수준**에서 명확한 알고리즘-하드웨어 공동 설계 지침을 제공하는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 INT 및 FP 형식의 양자화 신호 대 잡음비(QSNR)를 모델링하는 **이론적 및 통계적 프레임워크**를 개발했습니다. 이를 바탕으로 **MX(32-요소 블록) 및 NVIDIA(16-요소 블록)** 형식과 같은 최신 블록 단위 형식에 걸쳐 세분화된 INT 및 FP 양자화를 체계적으로 비교했습니다. 특히 **MXINT8, MXINT6, MXINT4, NVINT4**와 같은 정수 변형을 표준 FP 대응 형식과 함께 도입했으며, 그래디언트 편향을 해결하기 위한 **대칭 클리핑(symmetric clipping)** 및 **Hadamard rotation**과 같은 아웃라이어 완화 기법을 적용하여 저비트 INT 훈련의 성능을 향상시켰습니다.

## 주요 결과
연구 결과, 성능의 중요한 "교차점"이 밝혀졌습니다. **MXINT8**은 **8비트 세분화 형식(블록 크기 32)**에서 알고리즘 정확도(평균 QSNR이 **40.35dB**로 MXFP8의 **31.50dB**보다 높음)와 하드웨어 효율성 면에서 **MXFP8**을 일관되게 능가했습니다. 또한, **MXINT8**은 BF16과 거의 동일한 **훈련 손실(MXFP8 대비 약 0.001 낮은 손실)**을 달성하여 거의 손실 없는 훈련이 가능함을 입증했습니다. **4비트 형식**에서는 FP가 정확도 이점을 가졌지만, **Hadamard rotation**을 적용한 **NVINT4**는 **NVFP4**를 능가할 수 있었습니다. 하드웨어 비용 분석 결과, 세분화된 INT 형식은 FP 형식에 비해 **상당히 더 높은 에너지 및 면적 효율성**을 제공함이 밝혀졌습니다.

## AI 실무자를 위한 시사점
이 연구는 현재 AI 하드웨어의 FP 중심 개발 방향에 도전하며, **세분화된 INT 형식, 특히 MXINT8**이 미래 AI 가속기에서 **정확도, 전력 및 효율성 간의 더 나은 균형**을 제공할 수 있음을 강력히 시사합니다. AI 엔지니어는 **저비트 INT 양자화의 잠재력**을 재평가하고, **Hadamard rotation** 및 **대칭 클리핑**과 같은 기법을 활용하여 효율적인 모델을 개발하는 데 집중해야 합니다. 이는 AI 하드웨어 설계 및 알고리즘 최적화에 대한 전략적 변화를 요구하며, 더 강력하고 효율적인 AI 가속기 구축에 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.