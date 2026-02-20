---
title: "[논문리뷰] Continual GUI Agents"
excerpt: "arXiv에 게시된 'Continual GUI Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Continual Learning
  - GUI Agents
  - Reinforcement Learning
  - Grounding
  - Domain Adaptation
  - Resolution Adaptation
  - Reward Shaping
  - Human-Computer Interaction

permalink: /ai/review/2026-02-02-Continual-GUI-Agents/

toc: true
toc_sticky: true

date: 2026-02-02 00:00:00+0900+0900
last_modified_at: 2026-02-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.20732)

**저자:** Ziwei Liu, Borui Kang, Hangjie Yuan, Zixiang Zhao, Wei Li, Yifan Zhu, Tao Feng



## 핵심 연구 목표
본 연구는 GUI(Graphical User Interface) 에이전트가 새로운 도메인이나 해상도 변화와 같은 동적인 디지털 환경(데이터 분포의 변화)에서 성능 저하 없이 **지속적으로 학습(continual learning)** 할 수 있도록 하는 새로운 태스크인 **Continual GUI Agents** 를 정의합니다. 기존 방법론들이 UI 상호작용 지점과 영역의 다양성으로 인해 **안정적인 그라운딩(stable grounding)** 을 유지하지 못하는 문제를 해결하고자 합니다.

## 핵심 방법론
논문은 GUI 에이전트의 지속적인 학습을 안정화하기 위해 새로운 강화 학습 미세 조정 프레임워크인 **GUI-Anchoring in Flux (GUI-AiF)** 를 제안합니다. 이 프레임워크는 shifting interaction points를 탐색하도록 보상하는 **Anchoring Point Reward in Flux (APR-iF)** 와 predicted element regions의 다양성을 장려하는 **Anchoring Region Reward in Flux (ARR-iF)** 라는 두 가지 새로운 보상을 통합합니다. 이 보상들은 에이전트가 고정된 좌표나 요소 스케일에 과적응하는 경향을 완화하고, 변화하는 UI 환경에 대한 적응력을 높이도록 안내합니다.

## 주요 결과
**GUI-AiF** 는 **ScreenSpot-V1, V2, and Pro 벤치마크** 에서 최첨단(SOTA) 기준선들을 능가하는 성능을 입증했습니다. 도메인 변화 시나리오(M→D→W)에서 **SSv1 평균 정확도 78.9%** 및 **SSv2 평균 정확도 81.2%** 를 달성하여 기존 **SE-GUI** (SSv1 76.1%, SSv2 78.9%) 및 **GUI-G2** (SSv1 77.1%, SSv2 80.3%)보다 우수함을 보여주었습니다. 해상도 변화 시나리오(N→H)에서는 **SSPro 평균 정확도 19.0%** 를 기록하며 **GUI-G2** (16.7%)를 앞섰습니다.

## AI 실무자를 위한 시사점
본 연구는 실제 디지털 환경의 동적인 변화에 대응할 수 있는 **GUI 에이전트 개발** 의 중요성을 강조하며, 이를 위한 새로운 학습 패러다임을 제시합니다. **APR-iF** 및 **ARR-iF** 와 같은 **보상 설계(reward shaping)** 를 통해 에이전트가 UI 업데이트, 새로운 OS 버전, 다양한 화면 해상도에 걸쳐 유연하게 적응할 수 있는 **강력한 그라운딩 능력** 을 갖추도록 훈련할 수 있음을 보여주었습니다. 이는 실제 운영 환경에 배포될 **자율 GUI 에이전트** 의 실용성을 크게 향상시킬 수 있는 잠재력을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.