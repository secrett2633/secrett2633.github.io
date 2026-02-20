---
title: "[논문리뷰] UI-Venus Technical Report: Building High-performance UI Agents with RFT"
excerpt: "Shuheng Shen이 arXiv에 게시한 'UI-Venus Technical Report: Building High-performance UI Agents with RFT' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - UI Agent
  - MLLM
  - RFT
  - UI Grounding
  - UI Navigation
  - GRPO
  - Data Cleaning
  - Self-Evolving Trajectory

permalink: /ai/review/2025-8-15-UI-Venus-Technical-Report-Building-High-performance-UI-Agents-with-RFT/

toc: true
toc_sticky: true

date: 2025-08-15 13:09:31+0900
last_modified_at: 2025-08-15 13:09:31+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.10833)

**저자:** Shuheng Shen, Xingran Zhou, Zhenyu Xu, Zhengwen Zeng, Zhangxuan Gu



## 핵심 연구 목표
본 논문은 스크린샷만을 입력으로 받는 고성능 UI 에이전트인 **UI-Venus** 를 구축하는 것을 목표로 합니다. 기존 지도 미세 조정(SFT) 방식의 한계인 일반화 능력 부족과 높은 데이터 수집 비용을 극복하고, 복잡한 UI 환경에서의 탐색 및 추론 능력을 향상시키는 데 중점을 둡니다.

## 핵심 방법론
**Qwen2.5-VL** 모델을 기반으로 **Group Relative Policy Optimization (GRPO)** 을 활용한 **강화 학습 미세 조정(RFT)** 방식을 채택했습니다. 특히 **Self-Evolving Trajectory History Alignment & Sparse Action Enhancement** 프레임워크를 도입하여 과거 추론 기록을 정제하고 희소한 중요 동작의 학습을 강화했습니다. 또한, **데이터 필터링, 트레이스 재구성, 반복적 트레이스 생성** 의 3단계 파이프라인으로 **107k** 개의 접지 데이터와 **350k** 개의 탐색 데이터를 자체 구축했습니다.

## 주요 결과
UI-Venus는 다양한 벤치마크에서 **SOTA 성능** 을 달성했습니다. UI 접지 작업에서 **UI-Venus-Ground-72B** 는 ScreenSpot-V2에서 **95.3%** , ScreenSpot-Pro에서 **61.9%** 의 정확도를 기록했으며, 이는 기존 **GTA1** 및 **UI-TARS-1.5** 를 능가합니다. UI 탐색 작업에서는 **UI-Venus-Navi-72B** 가 AndroidWorld에서 **65.9%** 의 성공률을 달성하며 기존 모델들을 뛰어넘었습니다.

## AI 실무자를 위한 시사점
**GRPO 기반 RFT** 가 UI 에이전트 훈련에 효과적임을 입증하여, 대규모 언어 모델을 활용한 UI 자동화의 가능성을 제시합니다. **고품질 데이터 확보와 정교한 데이터 클리닝 전략** 이 모델 성능에 결정적인 영향을 미친다는 점을 강조하며, 이는 실제 AI 시스템 구축 시 중요한 고려사항입니다. UI 접지와 탐색 작업을 분리하여 모델을 훈련하는 방식은 효율성과 안정성을 높이는 실용적인 접근법으로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.