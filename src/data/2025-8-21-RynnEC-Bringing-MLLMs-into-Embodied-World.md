---
title: "[논문리뷰] RynnEC: Bringing MLLMs into Embodied World"
excerpt: "jiangpinliu이 [arXiv]에 게시한 'RynnEC: Bringing MLLMs into Embodied World' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-modal Large Language Models
  - Embodied AI
  - Embodied Cognition
  - Video Understanding
  - Instance Segmentation
  - Spatial Reasoning
  - Robotics

permalink: /ai/review/2025-8-21-RynnEC-Bringing-MLLMs-into-Embodied-World/

toc: true
toc_sticky: true

date: 2025-08-21 13:15:28+0900
last_modified_at: 2025-08-21 13:15:28+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.14160)

**저자:** Jiangpin Liu, Zhikai Wang, Lin Xi, Deli Zhao, Dalmo Academy, Alibaba Group, Hupan Lab Zhejiang University.



## 핵심 연구 목표
본 논문의 핵심 목표는 기존 Multi-modal Large Language Models ( **MLLM** )이 실제 물리적 세계를 이해하는 데 부족했던 **기초적인 시각 인지 능력** 의 한계를 극복하는 것입니다. 특히, 로봇이 복잡한 환경에서 유연한 시각적 상호작용, 세밀한 객체 이해, 비디오 기반의 일관된 공간 인지 능력을 갖추도록 하여 **정확한 인스턴스 수준의 이해와 grounding** 을 가능하게 하는 embodied 인지 **MLLM RynnEC** 를 개발하는 것을 목표로 합니다.

## 핵심 방법론
**RynnEC** 는 **VideoLLaMA3** 를 기반으로 하며, **미세한 객체 표현 학습을 위한 전용 Region Encoder** 와 **비디오 세그멘테이션을 위한 SAM2 아키텍처 기반의 Mask Decoder** 를 통합합니다. 데이터 부족 문제를 해결하기 위해 **ego-centric RGB 비디오** 로부터 **1.14백만 개 이상의 비디오 인스턴스 마스크** 를 포함하는 대규모 **객체 및 공간 인지 QA 데이터셋** 을 생성하는 마스크 중심의 파이프라인을 제안합니다. 모델은 **Mask Alignment, Object Understanding, Spatial Understanding, Referring Segmentation** 의 **4단계 점진적 학습 방식** 으로 훈련되어 시각, 공간, grounding 지식을 점진적으로 통합합니다.

## 주요 결과
**RynnEC** 는 **RynnEC-Bench** 에서 기존 Generalist MLLM ( **GPT-4o** , **VideoLLaMA3-7B** ) 및 task-specific MLLM을 압도적으로 능가하는 성능을 보였습니다. 특히, **RynnEC-7B** 는 전체 평균 점수 **56.2%** 를 달성하여, 기존 오픈소스 Embodied MLLM ( **RoboBrain-2.0-32B** , **24.2%** ) 대비 상당한 성능 향상을 입증했습니다. 객체 속성 인지에서 **61.4%** , 객체 세그멘테이션에서 **Direct Referring 45.3%** 및 **Situational Referring 36.1%** 를 기록했으며, 공간 인지에서도 뛰어난 성능을 보였습니다.

## AI 실무자를 위한 시사점
**RynnEC** 는 로봇이 복잡한 환경에서 **정확한 객체 파악, 미세한 조작, 효율적인 내비게이션** 을 수행하는 데 필수적인 **정교한 공간 추론 및 객체 이해 능력** 을 제공합니다. 대규모 **마스크 중심 데이터 생성 파이프라인** 은 고품질의 **ego-centric 비디오 데이터 부족** 이라는 실제적인 문제를 해결하여, 확장 가능한 embodied AI 모델 개발의 초석을 마련했습니다. 이러한 기여는 **로봇 지능의 실용적인 발전** 을 가속화하며, **MLLM이 물리적 세계를 이해하고 상호작용** 하는 데 필요한 핵심 역량을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.