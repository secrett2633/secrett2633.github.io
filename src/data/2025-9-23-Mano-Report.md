---
title: "[논문리뷰] Mano Report"
excerpt: "Minghui Wu이 [arXiv]에 게시한 'Mano Report' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - GUI Agent
  - Multi-modal Foundation Model
  - Reinforcement Learning
  - Supervised Fine-tuning
  - Simulated Environment
  - Data Generation
  - Error Recovery
  - Web Automation

permalink: /ai/review/2025-9-23-Mano-Report/

toc: true
toc_sticky: true

date: 2025-09-23 13:36:03+0900
last_modified_at: 2025-09-23 13:36:03+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.17336)

**저자:** Tianyu Fu, Anyang Su, Chenxu Zhao, Hanning Wang, Minghui Wu 외 다수



## 핵심 연구 목표
본 논문은 시각적 복잡성, 동적 환경, 다단계 추론 요구사항으로 인해 어려운 GUI 상호작용 자동화 문제를 해결하는 것을 목표로 합니다. 기존 **Vision-Language Model (VLM)** 기반 접근법의 해상도 제한, 도메인 불일치, 불충분한 순차적 의사결정 능력 등의 한계를 극복하고, 실제 환경에서 강력하고 적응력 있는 GUI 에이전트 **Mano** 를 개발하고자 합니다.

## 핵심 방법론
**Mano** 는 광범위한 웹 및 컴퓨터 시스템 데이터로 사전 훈련된 **멀티모달 파운데이션 모델** ( **UITARS-1.5-7B** 기반)을 기반으로 합니다. **고정밀 시뮬레이션 환경** 을 통한 데이터 생성과 함께, **감독 학습(SFT)** , **오프라인 강화 학습(RL)** , **온라인 강화 학습(RL)** 의 **3단계 훈련 파이프라인** 을 사용합니다. 특히 **GRPO(Group Relative Policy Optimization)** 알고리즘과 특정 보상 설계, 그리고 **Mano-verify** 모듈을 통한 오류 복구 메커니즘을 통합하여 모델의 강건성을 높였습니다.

## 주요 결과
**Mano** 는 **Mind2Web** 및 **OSWorld** 를 포함한 여러 GUI 벤치마크에서 **최첨단(SOTA) 성능** 을 달성했습니다. **Mind2Web** 에서는 **Cross-Task Step SR 73.9%** , **Cross-Website Step SR 68.3%** , **Cross-Domain Step SR 67.6%** 를 기록했습니다. **OSWorld-Verified** 에서는 **41.6%** 의 성공률로 이전 모델들을 크게 능가했습니다. 특히, SFT 단계가 **32.7%** 로 향상되었고, 오프라인 RL을 통해 **33.7%** , 온라인 RL을 통해 최종적으로 **41.6%** 까지 성공률이 개선되었습니다.

## AI 실무자를 위한 시사점
본 연구는 **강화 학습과 VLM의 효과적인 통합** 이 실제 GUI 에이전트 개발에 필수적임을 보여주었습니다. **도메인 특화 데이터, 반복적인 훈련, 전체적인 보상 설계** 의 중요성을 강조하며, **Mano-parking** 과 같은 모듈을 통한 자율 데이터 추출 및 **Mano-verify** 를 통한 오류 복구 기능은 실무자들이 복잡한 자동화 태스크를 구현하는 데 유용한 통찰을 제공합니다. 이는 GUI 자동화 분야에서 VLM 기반 에이전트의 실용적 배포 가능성을 크게 높이는 데 기여합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.