---
title: "[논문리뷰] POINTS-GUI-G: GUI-Grounding Journey"
excerpt: "Le Tian이 arXiv에 게시한 'POINTS-GUI-G: GUI-Grounding Journey' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - GUI Grounding
  - Vision-Language Models (VLMs)
  - Reinforcement Learning (RL)
  - Data Engineering
  - UI Automation
  - Perception-intensive AI

permalink: /ai/review/2026-02-09-POINTS-GUI-G-GUI-Grounding-Journey/

toc: true
toc_sticky: true

date: 2026-02-09 00:00:00+0900+0900
last_modified_at: 2026-02-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.06391)

**저자:** Zhongyin Zhao*, Yuan Liu*†, Yikun Liu, Haicheng Wang, Le Tian, Xiao Zhou, Yangxiu You, Zilin Yu, Yang Yu, Jie Zhou



## 핵심 연구 목표
본 논문은 최소한의 GUI grounding 능력을 가진 **POINTS-1.5** 와 같은 기반 모델에서 출발하여, GUI grounding을 위한 완전한 기술 파이프라인을 구축하고 자동화하는 것을 목표로 합니다. 복잡한 디지털 작업을 자동화하기 위해 모델이 텍스트 및 아이콘과 같은 인터페이스 요소를 정확히 찾아 정확한 작업을 수행할 수 있도록 하는 것이 주된 연구 목적입니다.

## 핵심 방법론
모델인 **POINTS-GUI-G-8B** 는 세 가지 핵심 요소를 통해 성능을 달성합니다. 첫째, 다양한 오픈소스 데이터셋 형식을 통일하고 **증강, 필터링, 난이도 등급화** 를 포함한 **정교한 데이터 엔지니어링** 을 수행합니다. 둘째, **비전 인코더의 지속적인 미세 조정** 과 훈련-추론 간의 **해상도 일관성 유지** (최대 훈련 해상도를 **3072x3072** 로 상향)를 포함하는 **향상된 훈련 전략** 을 사용합니다. 셋째, **검증 가능한 보상(Verifiable Rewards)을 활용한 강화 학습(RL)** 을 적용하여 인식 중심의 GUI grounding 작업의 정밀도를 크게 향상시킵니다.

## 주요 결과
**POINTS-GUI-G-8B** 는 **ScreenSpot-Pro에서 59.9점** , **OSWorld-G에서 66.0점** , **ScreenSpot-v2에서 95.7점** , **UI-Vision에서 49.9점** 을 기록하며 최첨단 성능을 달성했습니다. 특히 **OSWorld-G** 에서는 SOTA 모델 중 1위를 차지하여 **MAI-UI-8B** 를 약 **6점** 차이로 능가했으며, **ScreenSpot-Pro** 에서는 **GTA1-7B** 보다 **9.8점** , **GUI-Owl-7B** 보다 **5점** 높은 성능을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 **정교한 데이터 엔지니어링, 비전 인코더 미세 조정, 검증 가능한 보상을 활용한 강화 학습** 이 GUI grounding 정확도 향상에 결정적인 역할을 함을 보여줍니다. 이는 **GUI 에이전트 개발** 을 위한 견고한 기반을 제공하며, 모델과 평가 스위트의 오픈 소스 공개는 필드 내 추가 발전을 촉진하여 GUI 에이전트의 엔드투엔드 작업 실행 최적화에 실질적인 기여를 할 것으로 기대됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.