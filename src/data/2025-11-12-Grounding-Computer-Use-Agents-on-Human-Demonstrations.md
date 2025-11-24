---
title: "[논문리뷰] Grounding Computer Use Agents on Human Demonstrations"
excerpt: "이 [arXiv]에 게시한 'Grounding Computer Use Agents on Human Demonstrations' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Computer Use Agents
  - UI Grounding
  - Desktop Applications
  - Human Demonstrations
  - Large-Scale Dataset
  - Vision-Language Models
  - Supervised Fine-tuning
  - Reinforcement Learning

permalink: /ai/review/2025-11-12-Grounding-Computer-Use-Agents-on-Human-Demonstrations/

toc: true
toc_sticky: true

date: 2025-11-12 00:00:00+0900+0900
last_modified_at: 2025-11-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.07332)

**저자:** Aarash Feizi, Shravan Nayak, Xiangru Jian, Kevin Qinghong Lin, Kaixin Li, Rabiul Awal, Xing Han Lù, Johan Obando-Ceron, Juan A. Rodriguez, Nicolas Chapados, David Vazquez, Adriana Romero-Soriano, Reihaneh Rabbany, Perouz Taslakian, Christopher Pal, Spandana Gella, Sai Rajeswar



## 핵심 연구 목표
이 연구는 컴퓨터 사용 에이전트(CUA)의 핵심 과제인 "grounding"의 신뢰성을 높이는 것을 목표로 합니다. 특히, 복잡하고 다양한 데스크톱 환경에서 자연어 명령어를 정확한 화면 UI 요소에 연결하는 데 필요한 **고품질 학습 데이터의 부족**을 해결하고, 이를 통해 데스크톱 환경에서 탁월한 grounding 성능을 달성하는 모델을 개발하고자 합니다.

## 핵심 방법론
연구팀은 전문가의 실제 시연을 바탕으로 **GROUNDCUA**라는 대규모 인간 주석 데스크톱 grounding 데이터셋을 구축했습니다. 이 데이터셋은 **87개 애플리케이션, 56K 스크린샷, 3.56M+ UI 요소 주석**을 포함하며, **고해상도 이미지**와 **작은 UI 요소**에 대한 조밀한 주석이 특징입니다. 이 데이터를 기반으로 **Direct, Functional, Spatial**의 세 가지 유형의 풍부한 자연어 명령어를 생성했습니다. 모델로는 **Qwen2.5-VL-Instruct**를 기반으로 한 **GROUNDNEXT** 모델(3B 및 7B 스케일)을 개발했으며, **700K 샘플**로 **Supervised Fine-tuning (SFT)**을 먼저 수행한 후, **10K 샘플**로 **Relative Leave-One-Out (RLOO)** 방식의 **강화 학습 (RL)**을 적용하여 성능을 정교화했습니다.

## 주요 결과
**GROUNDNEXT (SFT) 모델**은 3B 스케일에서 평균 **66.4%**, 7B 스케일에서 평균 **69.2%**의 정확도를 달성하며 5개 주요 데스크톱 벤치마크에서 **SOTA (State-of-the-Art)** 성능을 기록했습니다. 이는 이전 SOTA 모델인 **JEDI (9M 데이터포인트)** 대비 **1/10 미만의 훈련 데이터**로 달성된 결과입니다. **RL 후처리**는 SFT 성능에 일관되지만 **미미한 개선** (3B RL에서 68.4%, 7B RL에서 70.5% 평균 정확도)을 가져왔습니다. 특히, **GROUNDNEXT-3B**는 OSWorld-Verified 벤치마크에서 72B 규모의 **OpenCUA** 및 상용 API를 능가하는 **50.6%**의 전체 성능을 보여주었습니다.

## AI 실무자를 위한 시사점
이 연구는 **대규모 데이터 양**보다는 **고품질의 전문가 주석 데이터**가 컴퓨터 사용 에이전트의 grounding 성능을 효율적으로 향상시키는 데 훨씬 중요함을 입증합니다. **GROUNDNEXT 모델**은 데스크톱 애플리케이션의 복잡하고 다양한 UI를 효과적으로 처리할 수 있는 강력한 기반을 제공하여, **실제 환경에서 적용 가능한 CUA 개발**을 가속화할 수 있습니다. 특히, **오픈 소스 애플리케이션** 데이터를 활용한 훈련은 모바일 및 웹과 같은 다른 도메인으로의 **교차 플랫폼 일반화 능력**을 보여주어, 범용 AI 에이전트 개발에 실용적인 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.