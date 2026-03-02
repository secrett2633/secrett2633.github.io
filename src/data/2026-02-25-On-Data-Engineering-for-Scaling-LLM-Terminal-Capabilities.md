---
title: "[논문리뷰] On Data Engineering for Scaling LLM Terminal Capabilities"
excerpt: "arXiv에 게시된 'On Data Engineering for Scaling LLM Terminal Capabilities' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM
  - Terminal Agents
  - Data Engineering
  - Synthetic Data Generation
  - Supervised Fine-tuning (SFT)
  - Terminal-Bench
  - Nemotron-Terminal
  - Dataset Adapters

permalink: /ai/review/2026-02-25-On-Data-Engineering-for-Scaling-LLM-Terminal-Capabilities/

toc: true
toc_sticky: true

date: 2026-02-25 00:00:00+0900+0900
last_modified_at: 2026-02-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.21193)

**저자:** Renjie Pi, Grace Lam, Mohammad Shoeybi, Pooya Jannaty, Bryan Catanzaro, Wei Ping



## 핵심 연구 목표
본 논문은 최신 터미널 에이전트의 훈련 데이터 전략에 대한 정보 부족을 해결하고자 합니다. LLM의 터미널 역량 확장을 위한 데이터 엔지니어링 실천법을 체계적으로 연구하고, 효율적이고 확장 가능한 데이터 생성 프레임워크를 통해 효과적인 터미널 에이전트를 훈련하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 기존 벤치마크를 터미널 프롬프트로 변환하는 **데이터셋 어댑테이션** 과 **스킬/시드 기반 합성 태스크 생성** 을 결합한 **Terminal-Task-Gen** 파이프라인을 제안합니다. **DeepSeek-V3.2** 를 교사 모델로 활용하여 **Docker 환경** 에서 트레이스를 생성하고, 생성된 **Terminal-Corpus** 는 정제 과정을 거쳐 **Qwen3 (8B, 14B, 32B)** 모델 기반의 **Nemotron-Terminal** 을 **지도 미세 조정(SFT)** 하는 데 사용됩니다. 또한, 데이터 필터링, 커리큘럼 학습, 긴 컨텍스트 훈련 등의 데이터 엔지니어링 전략을 체계적으로 분석합니다.

## 주요 결과
**Nemotron-Terminal** 모델들은 **Terminal-Bench 2.0** 에서 상당한 성능 향상을 보였습니다. 특히, **Nemotron-Terminal-8B** 는 **2.5%에서 13.0%** 로, **14B** 는 **4.0%에서 20.2%** 로, **32B** 는 **3.4%에서 27.4%** 로 정확도가 향상되었습니다. **Nemotron-Terminal-32B** 는 **Qwen3-Coder-480B(23.9%)** 를 능가하는 **27.4%** 의 성능을 달성하여, 고품질 데이터가 모델 규모를 넘어설 수 있음을 입증했습니다. 또한, 합성 데이터에 대한 필터링을 적용하지 않은 경우( **12.4%** )가 가장 높은 성능을 보여 실패한 트레이스도 학습에 긍정적인 영향을 미칠 수 있음을 시사했습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM 터미널 에이전트 개발에 있어 **데이터 품질과 엔지니어링의 중요성** 을 강조합니다. **Terminal-Task-Gen** 과 같은 합성 데이터 생성 파이프라인은 실제 데이터 부족 문제를 해결하고 특정 기술 격차를 해소하는 데 유용한 전략을 제공합니다. 특히, **고품질 데이터를 통해 비교적 작은 모델** 도 훨씬 큰 모델에 필적하는 성능을 낼 수 있음을 보여주어, **모델 스케일보다 데이터의 질** 이 더 중요하다는 실무적 시사점을 줍니다. 또한, 실패한 실행 궤적(unsuccessful trajectories)을 포함한 학습 데이터가 모델의 **전반적인 견고성(robustness)** 을 향상시킬 수 있다는 점은 데이터셋 구성에 중요한 지침을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.