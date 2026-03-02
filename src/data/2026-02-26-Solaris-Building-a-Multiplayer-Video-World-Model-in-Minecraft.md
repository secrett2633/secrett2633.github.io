---
title: "[논문리뷰] Solaris: Building a Multiplayer Video World Model in Minecraft"
excerpt: "Timothy Meehan이 arXiv에 게시한 'Solaris: Building a Multiplayer Video World Model in Minecraft' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-agent World Models
  - Video Diffusion Models
  - Minecraft
  - Self Forcing
  - Checkpointed Self Forcing
  - Multi-view Consistency
  - Data Collection
  - Embodied AI

permalink: /ai/review/2026-02-26-Solaris-Building-a-Multiplayer-Video-World-Model-in-Minecraft/

toc: true
toc_sticky: true

date: 2026-02-26 00:00:00+0900+0900
last_modified_at: 2026-02-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.22208)

**저자:** Georgy Savva, Oscar Michel, Daohan Lu, Suppakit Waiwitlikhit, Timothy Meehan, Dhairya Mishra, Srivats Poddar, Jack Lu, Saining Xie



## 핵심 연구 목표
기존 단일 에이전트 비디오 월드 모델의 한계를 극복하고, **Minecraft** 와 같은 복잡한 3D 환경에서 일관된 다중 시점 관찰을 시뮬레이션할 수 있는 **다중 에이전트 비디오 월드 모델 (Solaris)** 을 구축하는 것이 목표입니다. 특히, 여러 에이전트의 행동과 환경 변화가 모든 에이전트의 시점에서 정확하게 반영되는 일관성을 유지하는 것이 핵심 과제입니다.

## 핵심 방법론
본 연구는 대규모 다중 에이전트 게임 플레이 데이터를 수집하기 위한 프레임워크인 **SolarisEngine** 을 개발했습니다. 모델은 **Matrix Game 2.0** 의 비디오 **Diffusion Transformer (DiT)** 아키텍처를 다중 플레이어 환경에 맞게 수정하여 사용하며, 플레이어 ID 임베딩 및 다중 플레이어 셀프 어텐션 계층을 통해 에이전트 간 정보를 교환합니다. 안정적인 장기 자동 회귀 생성을 위해 단일 플레이어 사전 훈련부터 시작하여 양방향 및 인과 관계 다중 플레이어 모델링으로 점진적으로 전환하는 4단계 훈련 파이프라인과, 메모리 효율적인 **Checkpointed Self Forcing** 기법을 도입했습니다.

## 주요 결과
**SolarisEngine** 을 통해 12.64백만 개의 다중 플레이어 프레임 데이터셋을 성공적으로 구축했습니다. **Solaris** 모델은 기존 베이스라인 (프레임 연결, 사전 훈련 없는 Solaris) 대비 모든 평가 범주 (움직임, 접지, 기억, 빌딩, 일관성)에서 우수한 성능을 보였습니다. 예를 들어, 움직임 평가에서 **FID 69.3** 및 **VLM 68.2%** 의 정확도를 달성하여, 베이스라인인 프레임 연결 방식의 **FID 77.1** 및 **VLM 53.3%** 를 크게 상회했습니다 (Table 2 참조). 이는 모델이 장기적인 시뮬레이션에서 시각적 충실도와 일관성을 유지함을 의미합니다.

## AI 실무자를 위한 시사점
본 연구는 다중 에이전트 학습 및 대규모 협업 AI 개발을 위한 강력한 기반 시스템과 모델을 제공합니다. 특히 **Checkpointed Self Forcing** 은 메모리 제약이 있는 환경에서 장기적인 시퀀스를 효율적으로 훈련할 수 있는 실용적인 방법론을 제시합니다. 공개된 시스템과 모델은 AI 엔지니어들이 복잡한 멀티 에이전트 환경 시뮬레이션 및 평가 벤치마크를 구축하고 확장하는 데 크게 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.