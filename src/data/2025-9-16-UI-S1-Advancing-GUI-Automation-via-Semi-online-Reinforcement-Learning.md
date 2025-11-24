---
title: "[논문리뷰] UI-S1: Advancing GUI Automation via Semi-online Reinforcement Learning"
excerpt: "Yongliang Shen이 [arXiv]에 게시한 'UI-S1: Advancing GUI Automation via Semi-online Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - GUI Automation
  - Reinforcement Learning
  - Semi-online RL
  - Offline RL
  - Online RL
  - Patch Module
  - Multi-turn Interaction
  - Large Language Models

permalink: /ai/review/2025-9-16-UI-S1-Advancing-GUI-Automation-via-Semi-online-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-09-16 13:16:41+0900
last_modified_at: 2025-09-16 13:16:41+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.11543)

**저자:** Zhengxi Lu, Jiabo Ye, Fei Tang, Yongliang Shen, Haiyang Xu, Ziwei Zheng, Weiming Lu, Ming Yan, Fei Huang, Jun Xiao, Yueting Zhuang



## 핵심 연구 목표
본 논문은 GUI(Graphical User Interface) 에이전트의 자동화에서 기존 **오프라인 RL**의 제한된 다중 턴 추론 능력과 **온라인 RL**의 높은 배포 비용 및 희소한 보상 문제를 해결하는 것을 목표로 합니다. 오프라인 학습의 효율성과 온라인 학습의 장기적인 최적화 목표를 동시에 달성하는 새로운 패러다임을 제안합니다.

## 핵심 방법론
저자들은 오프라인 궤적을 활용하여 온라인 RL을 시뮬레이션하는 **Semi-online Reinforcement Learning** 패러다임을 제안합니다. 이 방법론은 액션 불일치 시 전문가 액션을 주입하여 궤적 활용도를 높이는 **Patch Module**과, 장기적인 학습 신호를 포착하기 위한 **할인된 미래 리턴** 및 **이중 수준 어드밴티지(스텝-레벨 및 에피소드-레벨)**를 정책 최적화에 통합합니다.

## 주요 결과
제안된 **UI-S1-7B** 모델은 네 가지 동적 벤치마크에서 7B 모델 중 **SOTA 성능**을 달성했습니다. 특히, 기본 모델 대비 **AndroidWorld에서 +12.0%**, **AITW-Gen에서 +23.8%**의 성공률 향상을 보였으며, 단일 턴 성능 저하 없이 다중 턴 추론 능력을 크게 개선했습니다. 또한, 제안된 **Semi-Online Performance (SOP)** 메트릭은 실제 온라인 성능과 **R2=0.934**의 강한 상관관계를 보였습니다.

## AI 실무자를 위한 시사점
**Semi-online RL**은 GUI 에이전트 개발 시 데이터 다양성 부족 및 희소한 보상 문제를 완화하면서 효율적이고 안정적인 다중 턴 상호작용 학습을 가능하게 합니다. 이는 실제 환경 상호작용 없이도 온라인 다이내믹스를 시뮬레이션하여 학습 효율성을 높이는 실용적인 접근 방식을 제공하며, 대규모 오프라인 데이터셋을 효과적으로 활용하여 강력한 에이전트를 구축할 수 있는 기반을 마련합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.