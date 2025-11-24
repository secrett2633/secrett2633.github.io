---
title: "[논문리뷰] Thinking-while-Generating: Interleaving Textual Reasoning throughout Visual Generation"
excerpt: "Xinyan Chen이 [arXiv]에 게시한 'Thinking-while-Generating: Interleaving Textual Reasoning throughout Visual Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Visual Generation
  - Textual Reasoning
  - Interleaving
  - Large Multimodal Models (LMMs)
  - Chain-of-Thought (CoT)
  - Zero-shot Learning
  - Supervised Fine-tuning (SFT)
  - Reinforcement Learning (RL)

permalink: /ai/review/2025-11-21-Thinking-while-Generating-Interleaving-Textual-Reasoning-throughout-Visual-Generation/

toc: true
toc_sticky: true

date: 2025-11-21 00:00:00+0900+0900
last_modified_at: 2025-11-21 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.16671)

**저자:** Ziyu Guo, Renrui Zhang, Hongyu Li, Manyuan Zhang, Xinyan Chen, Sifan Wang, Yan Feng, Peng Pei, Pheng-Ann Heng



## 핵심 연구 목표
본 논문은 시각 콘텐츠 생성 과정에서 발생하는 장기적인 구성, 다중 엔티티 관계 및 미묘한 지시사항 준수와 같은 문제점을 해결하기 위해, 텍스트 기반 추론(think)을 시각 생성(generate) 과정에 실시간으로 **상호 연동(interleaving)**하는 프레임워크인 **Thinking-while-Generating (TWIG)**를 제안합니다. 기존의 생성 전 계획 또는 생성 후 수정 방식의 한계를 극복하고 생성 중 다중 모달 상호작용을 구현하는 것을 목표로 합니다.

## 핵심 방법론
**TWIG** 프레임워크는 통합 이해-생성 **LMM (ULM)**인 **Janus-Pro**를 기반으로 텍스트 추론과 시각 생성을 연동합니다. 이는 '언제 생각할지(**When to Think**)', '무엇을 말할지(**What to Say**)', '어떻게 다듬을지(**How to Refine**)'의 세 가지 핵심 전략으로 구성되며, 특히 **K=3**의 정적 스케줄링이 효과적임을 발견했습니다. 또한, **제로샷 프롬프팅**, **TWIG-50K** 데이터셋을 활용한 **지도 학습(SFT)**, 그리고 **GRPO** 알고리즘과 **앙상블 보상 모델**을 사용한 **강화 학습(RL)**의 세 가지 접근 방식을 탐색합니다.

## 주요 결과
**TWIG-ZS (제로샷)** 모델은 **T2I-CompBench**에서 **Janus-Pro-7B** baseline 대비 Texture 점수를 **+15.41**점, Complex 점수를 **+12.57**점 향상시키며 강력한 성능을 보여주었습니다. **TWIG-SFT (지도 학습)**는 **TWIG-ZS** 대비 Shape 점수 **+10.87**점, Spatial 점수 **+5.04**점의 추가 개선을 달성했으며, 추론 안정성을 높였습니다. 최종적으로 **TWIG-RL (강화 학습)**은 **TWIG-SFT** 대비 Attribute Binding (예: Color **+7.91**, Shape **+8.86**) 및 Spatial (예: **+7.04**) 등 다양한 지표에서 상당한 진전을 보이며, 종합적인 Complex 점수 **54.45**를 기록했습니다.

## AI 실무자를 위한 시사점
본 연구는 시각 생성 모델이 단순한 지시를 넘어 복잡하고 미묘한 콘텐츠를 생성하도록 돕는 새로운 패러다임을 제시합니다. **제로샷 프롬프팅**만으로도 기존 LMM의 잠재력을 활용할 수 있음을 보여주어, 추가 학습 없이도 고급 추론 기능을 통합할 수 있는 실용적인 가능성을 열었습니다. **SFT**와 **RL**을 통한 성능 개선은 특정 도메인 또는 태스크에 맞춤화된 고성능 모델을 구축하기 위한 명확한 개발 경로를 제공하며, 이는 향후 비디오, 3D 등 다른 모달리티로 확장될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.