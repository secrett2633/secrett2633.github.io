---
title: "[논문리뷰] Downscaling Intelligence: Exploring Perception and Reasoning Bottlenecks in Small Multimodal Models"
excerpt: "Serena Yeung-Levy이 arXiv에 게시한 'Downscaling Intelligence: Exploring Perception and Reasoning Bottlenecks in Small Multimodal Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Small Multimodal Models
  - LLM Downscaling
  - Perception Bottleneck
  - Reasoning Bottleneck
  - Visual Extraction Tuning
  - Chain-of-Thought Reasoning
  - Multimodal Learning

permalink: /ai/review/2025-11-24-Downscaling-Intelligence-Exploring-Perception-and-Reasoning-Bottlenecks-in-Small-Multimodal-Models/

toc: true
toc_sticky: true

date: 2025-11-24 00:00:00+0900+0900
last_modified_at: 2025-11-24 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.17487)

**저자:** Mark Endo, Serena Yeung-Levy



## 핵심 연구 목표
본 연구는 대규모 다중모달 모델(MLLM)의 크기를 축소할 때 발생하는 지능 저하 현상을 체계적으로 분석하고, 특히 어떤 기능이 가장 큰 영향을 받는지, 그리고 그 원인이 무엇인지 밝히는 것을 목표로 합니다. 나아가 시각적 이해 및 추론 능력 저하의 근본적인 메커니즘을 규명하고, 소규모 모델의 효율성과 성능을 향상시키기 위한 효과적인 해결책을 제시하고자 합니다.

## 핵심 방법론
연구는 **Qwen3 시리즈(8B~0.6B)** LLM을 백본으로 사용하는 다중모달 모델에 대해 다양한 **시각적 명령 튜닝 태스크** 에서 성능 변화를 관찰했습니다. **Prism 프레임워크** 를 사용하여 **지각(Perception)** 과 **추론(Reasoning)** 모듈을 분리하여 각각의 LLM 다운스케일링 영향을 분석했습니다. 이러한 병목 현상을 해결하기 위해 **Visual Extraction Tuning** 을 통해 모델이 지시 사항에 맞는 시각적 세부 사항을 일관되게 추출하도록 학습시키고, 추출된 정보에 대해 **Step-by-Step (CoT) 추론** 을 적용하는 **EXTRACT+THINK** 접근 방식을 제안합니다.

## 주요 결과
LLM 다운스케일링은 LLM 본연의 능력보다는 **시각적 능력** 에 불균형적으로 큰 영향을 미치는 것으로 나타났습니다. 지각과 추론을 분리 분석한 결과, **지각 능력 저하** 가 추론 능력 저하와 유사하거나 더 큰 성능 하락을 초래하는 핵심 병목임을 확인했습니다. 제안된 **Visual Extraction Tuning** 은 인-도메인 성능을 **최대 5.2%** , 아웃-오브-도메인 **MMStar** 성능을 **최대 4.6%** 향상시켰습니다. 최종 **EXTRACT+THINK** 모델은 **PrismCaptioner** 보다 지각 모듈은 **약 12배** , 추론 모듈은 **약 41배** 작으면서도 훨씬 뛰어난 성능을 달성했으며, **LLaVA-OneVision-0.5B** 대비 인-도메인에서 **12.9%** , MMStar에서 **19.5%** 성능 향상을 보였습니다.

## AI 실무자를 위한 시사점
소규모 다중모달 모델을 개발할 때, LLM 크기 축소가 **시각적 지각 능력** 에 미치는 영향을 인지하고 이를 우선적으로 개선해야 합니다. **Visual Extraction Tuning** 은 데이터 및 파라미터 효율성을 극대화하면서 소규모 모델의 시각 정보 추출 능력을 강화하는 강력한 방법론입니다. 또한, 시각 데이터에 대한 추가 훈련 없이 **CoT 추론** 을 활용하여 모델의 추론 성능을 향상시킬 수 있어, 자원 제약이 있는 환경에서 실용적인 모델 구축 전략을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.