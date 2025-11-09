---
title: "[논문리뷰] Thinking with Video: Video Generation as a Promising Multimodal
  Reasoning Paradigm"
excerpt: "이 [arXiv]에 게시한 'Thinking with Video: Video Generation as a Promising Multimodal
  Reasoning Paradigm' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Multimodal Reasoning
  - Temporal Understanding
  - Spatial Reasoning
  - Foundation Models
  - AI Benchmarking
  - In-Context Learning
  - Self-Consistency

permalink: /ai/review/2025-11-7-Thinking_with_Video_Video_Generation_as_a_Promising_Multimodal_Reasoning_Paradigm/

toc: true
toc_sticky: true

date: 2025-11-09 22:08:24+0900
last_modified_at: 2025-11-09 22:08:24+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.04570)

**저자:** Jingqi Tong, Yurong Mou, Hangcheng Li, Mingzhe Li, Yongzhuo Yang, Ming Zhang, Qiguang Chen, Tianyi Liang, Xiaomeng Hu, Yining Zheng, Xinchi Chen, Jun Zhao, Xuanjing Huang, Xipeng Qiu



## 핵심 연구 목표
기존의 "Thinking with Text" 및 "Thinking with Images" 패러다임이 가진 정적 이미지의 한계와 모달리티 분리 문제를 극복하고자 합니다. 이 논문은 **비디오 생성 모델(예: Sora-2)**을 활용하여 텍스트와 시각적 추론을 통합하는 새로운 패러다임인 "Thinking with Video"를 제안합니다. 궁극적으로 비디오 생성 모델이 통일된 멀티모달 추론 능력을 갖춘 잠재력을 탐구하고 평가하는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 비디오 생성 모델의 추론 능력을 평가하기 위해 **VideoThinkBench**라는 새로운 벤치마크를 개발했습니다. 이 벤치마크는 **시각 중심 태스크(예: eyeballing puzzles, mazes, ARC-AGI-2)**와 **텍스트 중심 태스크(예: GSM8K, MMMU, MATH)**로 구성됩니다. **Sora-2**를 주 모델로 사용하여, 시각 중심 태스크는 **오디오, 마지막 프레임, 다수 프레임 투표(Major Frame Evaluation)**를 통해 평가되었고, 텍스트 중심 태스크는 **GPT-4o 기반의 LLM-as-a-Judge** 방식을 사용하여 평가되었습니다. 또한, **few-shot 학습** 및 **self-consistency**의 효과를 분석하고, 텍스트 중심 추론 능력의 근원을 **프롬프트 재작성 모델**의 유무에 따라 탐색했습니다.

## 주요 결과
시각 중심 태스크에서 **Sora-2는 eyeballing puzzles에서 평균 40.2%의 정확도**를 기록하며 SOTA VLM(예: Claude 4.5의 35.1%)을 능가하는 강력한 공간 및 기하학적 추론 능력을 보였습니다. 텍스트 중심 태스크에서는 **GSM8K에서 98.9% (오디오) 및 MATH에서 94.0% (오디오)**의 놀라운 정확도를 달성했으며, **MMMU에서는 75.53% (멀티모달)**를 기록하며 상당한 잠재력을 입증했습니다. 또한, **self-consistency 기법**이 Sora-2의 성능을 크게 향상시키는 것(예: Arc Connect 퍼즐에서 68%에서 **90%로 상승**)이 확인되었습니다. Wan2.5 모델을 사용한 실험을 통해 Sora-2의 강력한 텍스트 중심 추론 능력이 **내부 프롬프트 재작성 모델**에서 비롯될 수 있음을 시사했습니다.

## AI 실무자를 위한 시사점
이 연구는 **비디오 생성 모델**이 텍스트와 시각 정보를 통합하여 **동적이고 멀티모달적인 추론**을 수행할 수 있는 강력한 잠재력을 가지고 있음을 보여줍니다. **VideoThinkBench**와 같은 새로운 벤치마크는 복잡한 AI 추론 태스크에서 비디오 기반 모델의 역량을 평가하고 발전시키는 데 중요한 기준점을 제공합니다. 특히 **Self-consistency**와 같은 테스트 시간 스케일링 기법은 비디오 생성 모델의 추론 신뢰도를 높여, **실제 응용에서의 성능 향상**에 기여할 수 있습니다. 모델의 추론 과정에 **내부 프롬프트 재작성**과 같은 구성 요소가 미치는 영향을 이해하는 것은 **보다 투명하고 제어 가능한 AI 시스템**을 설계하는 데 필수적인 통찰력을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.