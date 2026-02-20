---
title: "[논문리뷰] UI-Venus-1.5 Technical Report"
excerpt: "arXiv에 게시된 'UI-Venus-1.5 Technical Report' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - GUI Agent
  - MLLM
  - Reinforcement Learning
  - Model Merging
  - GUI Grounding
  - Task Navigation
  - Online-RL
  - Offline-RL

permalink: /ai/review/2026-02-11-UI-Venus-1-5-Technical-Report/

toc: true
toc_sticky: true

date: 2026-02-11 00:00:00+0900+0900
last_modified_at: 2026-02-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.09082)

**저자:** Venus Team, Ant Group



## 핵심 연구 목표
본 논문은 기존 GUI 에이전트의 일반성 및 일관된 고성능 달성 문제를 해결하기 위해, 강력한 실제 애플리케이션을 위한 통합된 엔드투엔드 GUI 에이전트인 **UI-Venus-1.5** 를 제안합니다. 이전 버전의 한계를 극복하고 다양한 GUI 태스크에서 최첨단 성능을 확립하며 실제 환경에서의 견고한 내비게이션 역량을 입증하는 것을 목표로 합니다.

## 핵심 방법론
**UI-Venus-1.5** 는 **Qwen3-VL 아키텍처** 를 기반으로 세 가지 주요 기술 발전을 도입합니다. 첫째, **Mid-Training 단계** 에서는 **30개 이상의 데이터셋에서 100억 토큰** 을 활용하여 GUI 의미론의 기초를 다집니다. 둘째, **T-GRPO** 에 영감을 받은 **Scaled Online Reinforcement Learning (Online-RL)** 을 통해 전체 궤적 롤아웃과 보상 계산으로 복잡하고 장기적인 내비게이션 태스크를 최적화합니다. 셋째, **Model Merging (TIES-Merge 전략)** 을 사용하여 접지(grounding), 웹 및 모바일 내비게이션 등 도메인별 전문 모델들을 하나의 통합 체크포인트로 결합하여 배포를 단순화합니다.

## 주요 결과
**UI-Venus-1.5** 는 여러 GUI 접지 및 내비게이션 벤치마크에서 새로운 최첨단 성능을 달성했습니다. 특히, **ScreenSpot-Pro** 에서 **69.6%** , **VenusBench-GD** 에서 **75.0%** 의 정확도를 기록했으며, **AndroidWorld** 내비게이션 태스크에서 **77.6%** 의 성공률을 보여 기존 강력한 베이스라인을 크게 능가합니다. **Mid-Training** 은 GUI 특정 기능의 클러스터 분리도를 **34.0%** 향상시켰고, **Online-RL** 은 AndroidWorld에서 **14.5%** 의 성공률 증가를 가져왔습니다.

## AI 실무자를 위한 시사점
본 연구는 실제 환경에 배포 가능한 범용 GUI 에이전트 구축을 위한 효과적인 엔드투엔드 접근 방식을 제시합니다. **Mid-Training, Offline-RL, Online-RL** 의 다단계 훈련 패러다임과 **TIES-Merge** 를 통한 모델 통합은 복잡한 GUI 환경에서 에이전트의 강건성과 범용성을 크게 향상시킬 수 있음을 보여줍니다. 특히 **40개 이상의 중국 모바일 앱 생태계** 에 대한 최적화는 특정 지역 시장에서의 AI 자동화 잠재력을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.