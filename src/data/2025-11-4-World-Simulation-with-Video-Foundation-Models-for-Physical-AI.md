---
title: "[논문리뷰] World Simulation with Video Foundation Models for Physical AI"
excerpt: "Junjie Bai이 arXiv에 게시한 'World Simulation with Video Foundation Models for Physical AI' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Physical AI
  - World Simulation
  - Video Foundation Models
  - Flow Matching
  - Reinforcement Learning
  - Robotics
  - Autonomous Driving
  - Synthetic Data Generation

permalink: /ai/review/2025-11-4-World-Simulation-with-Video-Foundation-Models-for-Physical-AI/

toc: true
toc_sticky: true

date: 2025-11-09 19:22:42+0900
last_modified_at: 2025-11-09 19:22:42+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.00062)

**저자:** Junjie Bai, Arslan Ali, et al. (NVIDIA)



## 핵심 연구 목표
본 논문은 물리 AI(Physical AI) 시스템의 훈련 시 발생하는 높은 비용과 위험성을 해결하기 위해 고품질의 가상 세계 시뮬레이터를 제공하는 것을 목표로 합니다. 특히, **[Cosmos-Predict2.5]** 라는 최신 비디오 파운데이션 모델을 도입하여 다양한 물리 AI 도메인에서 시뮬레이션 충실도를 크게 향상시키고자 합니다. 또한, 시뮬레이션-실제(Sim2Real) 및 실제-실제(Real2Real) 세계 번역을 위한 **[Cosmos-Transfer2.5]** 를 제시하여 실체화된 지능 스케일링을 가속화합니다.

## 핵심 방법론
**[Cosmos-Predict2.5]** 는 **플로우 매칭(flow matching) 기반 아키텍처** 를 기반으로 Text2World, Image2World, Video2World 생성을 단일 모델로 통합합니다. 이를 위해 **[Cosmos-Reason1] VLM** 을 활용하여 텍스트 그라운딩을 강화하고 세계 시뮬레이션을 정밀하게 제어합니다. 모델 훈련은 대규모 비디오 데이터셋에 대한 **다단계 사전 훈련** , **감독형 미세 조정(SFT)** , 그리고 **강화 학습(RL)** 기반의 사후 훈련을 포함하며, **FSDP2** 및 **컨텍스트 병렬 처리** 를 통해 확장성을 확보했습니다.

## 주요 결과
**[Cosmos-Predict2.5]** 는 비디오 품질 및 명령어 정렬 측면에서 이전 모델인 **[Cosmos-Predict1]** 대비 상당한 개선을 이루었습니다. **SFT** 후 로봇 조작 도메인에서 **72.6%** 의 높은 승률을 달성했으며, **RL** 사후 훈련을 통해 병합된 모델의 평균 보상 점수 및 인간 선호도가 **46.7%** 까지 향상되었습니다. 또한, **[Cosmos-Transfer2.5]** 는 이전 모델보다 **3.5배 작음에도** 불구하고 PAIBench-Transfer 벤치마크에서 더 높은 품질과 긴 비디오 생성에서 낮은 오류 축적을 보여주었습니다.

## AI 실무자를 위한 시사점
**[Cosmos-Predict2.5]** 와 **[Cosmos-Transfer2.5]** 의 공개는 로봇 공학 및 자율 시스템을 위한 **신뢰할 수 있는 합성 데이터 생성, 정책 평가 및 폐쇄 루프 시뮬레이션** 을 가능하게 합니다. 소스 코드, 사전 훈련된 체크포인트, 큐레이션된 벤치마크를 공개함으로써 물리 AI 커뮤니티의 진입 장벽을 낮추고, 차세대 실체화된 지능 구축을 위한 혁신을 촉진할 것입니다. 이는 시뮬레이션 우선 생태계를 통해 실제 배포와 시뮬레이션 간의 격차를 해소하는 데 기여합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.