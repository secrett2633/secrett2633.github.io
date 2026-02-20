---
title: "[논문리뷰] VidEmo: Affective-Tree Reasoning for Emotion-Centric Video Foundation
  Models"
excerpt: "Pengfei Wan이 arXiv에 게시한 'VidEmo: Affective-Tree Reasoning for Emotion-Centric Video Foundation
  Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - VideoLLMs
  - Emotion Understanding
  - Affective-Tree Reasoning
  - Curriculum Learning
  - Reinforcement Learning
  - Fine-Grained Emotion
  - Attribute Perception
  - Expression Analysis

permalink: /ai/review/2025-11-5-VidEmo-Affective-Tree-Reasoning-for-Emotion-Centric-Video-Foundation-Models/

toc: true
toc_sticky: true

date: 2025-11-09 19:35:02+0900
last_modified_at: 2025-11-09 19:35:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.02712)

**저자:** Zhicheng Zhang, Weicheng Wang, Yongjie Zhu, Wenyu Qin, Pengfei Wan, Di Zhang, Jufeng Yang



## 핵심 연구 목표
본 논문은 동적 비디오에서 복잡하고 진화하는 감정 상태를 합리적인 근거와 함께 이해하고 예측하는 데 초점을 맞춥니다. 기존 **VideoLLM** 의 한계인 복합적인 감정 이해 및 설명 능력 부족을 극복하기 위해, 감정 중심의 비디오 기반 파운데이션 모델인 **VidEmo** 를 제안합니다.

## 핵심 방법론
**VidEmo** 는 기본 속성 인지, 표현 분석, 고수준 감정 이해를 통합하는 새로운 **affective cues-guided reasoning framework** 를 기반으로 합니다. 이 모델은 **Curriculum Emotion Learning** 을 통한 감정 지식 주입과 **Affective-Tree Reinforcement Learning (RL)** 을 통한 감정 추론이라는 두 단계의 튜닝 과정을 거칩니다. 특히, **GRPO(Group Relative Policy Optimization)** 와 **Tree Edit Distance** 기반의 **Affective-Tree based Fine-Grained Caption Reward** 를 사용하여 구조화된 감정 추론 능력을 강화합니다. 또한, 2.1M개의 샘플로 구성된 감정 중심의 세분화된 데이터셋인 **Emo-CFG** 를 구축하여 모델 학습을 지원합니다.

## 주요 결과
**VidEmo** 는 15가지 얼굴 인지 태스크에서 기존의 오픈소스 **VideoLLM** 들을 능가하는 경쟁력 있는 성능을 달성했습니다. 특히, 최고 모델인 **VidEmo-T1 (7B)** 은 **Gemini 2.0** 대비 속성 인지에서 **+9.8%** , 표현 분석에서 **+16.6%** , 고수준 감정 이해에서 **+21.3%** 더 높은 성능을 보였습니다. 세분화된 감정 분석에서 **Gemini 2.0** 의 **26.3%** 정확도와 비교하여, **VidEmo-T1 (7B)** 은 감정 이해 태스크에서 평균 **69.3%** 의 높은 정확도를 달성했습니다.

## AI 실무자를 위한 시사점
본 연구는 **VideoLLM** 을 활용하여 단순한 감정 표현 분류를 넘어, 복잡한 감정을 깊이 있게 이해하고 설명하는 **감정 중심 AI 모델** 의 가능성을 제시합니다. **Affective-Tree Reasoning** 과 **Curriculum Learning** 기법은 AI 모델에 감성 지능을 주입하고, 그 추론 과정을 **해석 가능하게(interpretable)** 만드는 중요한 방법론을 제공합니다. 개발된 **Emo-CFG 데이터셋** 은 감정 인지 및 추론 연구를 위한 귀중한 자원으로, 향후 **감정 AI** 분야의 발전과 실제 서비스 적용에 크게 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.