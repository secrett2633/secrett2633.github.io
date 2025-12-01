---
title: "[논문리뷰] Kwai Keye-VL 1.5 Technical Report"
excerpt: "SXxtyz이 [arXiv]에 게시한 'Kwai Keye-VL 1.5 Technical Report' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLMs
  - Video Understanding
  - Slow-Fast Encoding
  - Long Context
  - Chain-of-Thought
  - Reinforcement Learning
  - Human Alignment
  - Native-Resolution Vision Encoder

permalink: /ai/review/2025-9-3-Kwai-Keye-VL-1-5-Technical-Report/

toc: true
toc_sticky: true

date: 2025-09-03 13:36:21+0900
last_modified_at: 2025-09-03 13:36:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.01563)

**저자:** Keye Team, Kuaishou Group



## 핵심 연구 목표
본 논문은 동적이고 정보 밀도가 높은 비디오 콘텐츠 이해에서 발생하는 공간 해상도와 시간 범위 간의 **트레이드오프** 문제를 해결하고, 기존 모델들이 비디오 이해에서 겪는 한계를 극복하는 것을 목표로 합니다. 궁극적으로 비디오 이해 태스크에서 **최첨단 성능** 을 달성하면서도 일반적인 멀티모달 및 추론 태스크에서 강력한 성능을 유지하는 **Keye-VL-1.5** 모델을 개발하고자 합니다.

## 핵심 방법론
**Keye-VL-1.5** 는 세 가지 핵심 혁신을 도입했습니다. 첫째, 동적인 **Slow-Fast 비디오 인코딩 전략** 을 통해 중요한 시각적 변화가 있는 프레임은 고해상도 **Slow pathway** 로, 상대적으로 정적인 프레임은 저해상도 **Fast pathway** 로 처리하여 자원 할당을 최적화합니다. 둘째, **4단계 점진적 사전 훈련 방법론** 을 통해 모델의 컨텍스트 길이를 **8K에서 128K 토큰** 으로 확장하여 긴 비디오와 복잡한 시각 콘텐츠 처리를 가능하게 합니다. 셋째, 추론 능력 향상 및 인간 선호도 정렬에 중점을 둔 포괄적인 **사후 훈련 파이프라인** 을 구축했으며, 여기에는 **5단계 Chain-of-Thought 데이터 구축** , **반복적인 GSPO 기반 강화 학습** , 그리고 정렬 훈련이 포함됩니다.

## 주요 결과
**Keye-VL-1.5-8B** 는 이전 버전인 Keye-VL-Preview 대비 전반적인 성능에서 **3.32%** , 추론 능력에서 **7.89%** , 비디오 이해에서 **8.05%** 의 평균 성능 향상을 기록하며 새로운 **최첨단 성능** 을 확립했습니다. 특히 **Video-MMMU** 벤치마크에서는 **6.5%** 의 압도적인 개선을 보여 비디오 이해 태스크에서 뛰어난 강점을 입증했습니다. 또한, **MIA-Bench** 의 지시 따르기 태스크에서 **4.35점** 향상(91.95% vs 87.60%)을 달성하여 정렬 강화 학습의 효과를 검증했습니다.

## AI 실무자를 위한 시사점
**Slow-Fast 비디오 인코딩** 은 비디오 데이터의 **다양한 정보 밀도** 에 따라 효율적으로 자원을 할당하는 실용적인 방법을 제공하여, 비디오 분석 시스템 개발 시 고려할 만한 아키텍처입니다. **128K 토큰** 의 긴 컨텍스트 처리는 장기 비디오 분석 및 복잡한 시각적 추론을 가능하게 하며, **Chain-of-Thought 기반 데이터 구축** 및 **강화 학습(RL) 파이프라인** 은 멀티모달 LLM의 추론 능력과 사용자 선호도 정렬을 위한 효과적인 전략으로 활용될 수 있습니다. 이러한 발전은 차세대 멀티모달 모델 개발에 중요한 이정표를 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.