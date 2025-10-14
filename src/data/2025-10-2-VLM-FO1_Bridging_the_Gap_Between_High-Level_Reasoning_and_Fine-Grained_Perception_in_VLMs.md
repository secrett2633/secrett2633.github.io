---
title: "[논문리뷰] VLM-FO1: Bridging the Gap Between High-Level Reasoning and Fine-Grained
  Perception in VLMs"
excerpt: "이 [arXiv]에 게시한 'VLM-FO1: Bridging the Gap Between High-Level Reasoning and Fine-Grained
  Perception in VLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models
  - Object Grounding
  - Fine-grained Perception
  - Hybrid Region Encoder
  - Plug-and-play
  - Two-stage Training
  - Visual Reasoning

permalink: /ai/review/2025-10-2-VLM-FO1_Bridging_the_Gap_Between_High-Level_Reasoning_and_Fine-Grained_Perception_in_VLMs/

toc: true
toc_sticky: true

date: 2025-10-02 13:30:22+0900
last_modified_at: 2025-10-02 13:30:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.25916)

**저자:** Peng Liu, Haozhan Shen, Chunxin Fang, Zhicheng Sun, Jiajia Liao, Tiancheng Zhao



## 핵심 연구 목표
본 논문은 기존 VLM(Vision-Language Models)이 고수준 장면 이해에는 뛰어나지만, 정밀한 공간적 지역화가 필요한 **미세 조정 지각(fine-grained perception)** 작업에서 부족한 문제를 해결하고자 합니다. 특히, 언어 중심 아키텍처에 부자연스러운 **정확한 수치 좌표 생성**의 근본적인 한계를 극복하고, 고수준 추론과 미세 조정 시각적 접지 간의 격차를 메우는 것을 목표로 합니다.

## 핵심 방법론
**VLM-FO1**은 객체 중심 지각 문제를 **견고한 특징 검색 작업**으로 재구성하여 기존 **사전 훈련된 VLM**에 플러그 앤 플레이 모듈로 통합됩니다. 핵심은 VLM의 원래 의미론적 비전 인코더와 지각 강화 비전 인코더를 결합한 **Dual-Vision Encoder**를 특징으로 하는 **Hybrid Fine-grained Region Encoder (HFRE)**입니다. 이 시스템은 **토큰 기반 참조 시스템**을 통해 LLM이 특정 시각적 영역에 대해 언어를 추론하고 접지할 수 있도록 하며, **2단계 훈련 전략**을 통해 모델의 일반적인 시각적 이해 능력을 유지하면서 지각 성능을 향상시킵니다.

## 주요 결과
**VLM-FO1-3B** 모델은 **COCO**에서 **44.4 mAP**를 달성하여 기존 VLM보다 **20점 이상 향상**되었으며, **ODinW13** 및 **OVDEval** 벤치마크에서 **최첨단 성능**을 기록했습니다. 또한, **LVIS 및 PACO** 데이터셋의 지역 분류, **COCOText** 벤치마크의 지역 OCR, **Ferret Bench**의 참조 추론 등 다양한 지역 관련 지각 작업에서 **SOTA(State-of-the-Art) 결과**를 달성했습니다. 특히, OpenCompass 벤치마크에서 기본 모델의 일반 VLM 능력을 손상시키지 않고 지각 성능을 유지했음을 보여주었습니다.

## AI 실무자를 위한 시사점
**VLM-FO1**은 **플러그 앤 플레이 모듈**로서 기존 **사전 훈련된 VLM**에 **정밀한 지각 능력**을 유연하게 추가할 수 있는 강력한 방법을 제시합니다. 이는 좌표 생성의 한계를 **영역 특징 검색**으로 전환하여 **객체 접지, 지역 기반 이해 및 추론**의 성능을 크게 향상시키므로, 자율 주행, 정밀 이미지 분석 등 **정확한 공간 인식이 필수적인 실제 응용 분야**에서 VLM의 활용도를 높일 수 있습니다. **2단계 훈련 전략**은 모델의 확장성과 안정적인 성능 통합을 위한 효과적인 지침을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.