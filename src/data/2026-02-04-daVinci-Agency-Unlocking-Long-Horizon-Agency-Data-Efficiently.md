---
title: "[논문리뷰] daVinci-Agency: Unlocking Long-Horizon Agency Data-Efficiently"
excerpt: "arXiv에 게시된 'daVinci-Agency: Unlocking Long-Horizon Agency Data-Efficiently' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Long-Horizon Agency
  - Data Synthesis
  - Pull Request Chains
  - Software Evolution
  - LLM Training
  - Agentic AI
  - Self-Distillation
  - Code Generation

permalink: /ai/review/2026-02-04-daVinci-Agency-Unlocking-Long-Horizon-Agency-Data-Efficiently/

toc: true
toc_sticky: true

date: 2026-02-04 00:00:00+0900+0900
last_modified_at: 2026-02-04 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.02619)

**저자:** Mohan Jiang, Dayuan Fu, Junhao Shi, Ji Zeng, Weiye Si, Keyu Li, Xuefeng Li, Yang Xiao, Wenjie Li, Dequan Wang, Pengfei Liu



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)이 단기 작업에서 뛰어난 성능을 보임에도 불구하고, 실제와 같은 복잡한 장기 에이전트 워크플로우로 확장하는 데 필요한 **고품질 훈련 데이터 부족** 문제를 해결하고자 합니다. 기존의 단일 기능 또는 수동 주석 기반 데이터 합성 방식의 한계를 극복하고, 확장 가능하며 효율적인 방식으로 **장기적인 종속성을 포착하는 에이전트 데이터** 를 생성하는 새로운 패러다임을 제안합니다.

## 핵심 방법론
논문은 실제 소프트웨어 개발의 **"Pull Request (PR) 체인"** 을 데이터 합성의 핵심으로 활용하는 **daVinci-Agency** 패러다임을 제안합니다. 이 방법론은 (1) 연속적인 커밋을 통한 **점진적 태스크 분해** , (2) 통일된 기능 목표를 통한 **장기 일관성 유지** , (3) 버그 수정 이력을 통한 **검증 가능한 개선** 이라는 세 가지 메커니즘을 통해 감독 신호를 추출합니다. **GLM-4.6** 과 같은 LLM을 롤아웃 모델로 사용하여 데이터를 생성하고, **엄격한 리젝션 샘플링(s ≥ 0.8)** 을 적용하여 높은 품질의 훈련 데이터셋을 구축합니다.

## 주요 결과
**daVinci-Agency** 는 단 **239개** 의 훈련 샘플로 **GLM-4.6** 모델을 파인튜닝하여, **Toolathlon 벤치마크에서 47%의 상대적 성능 향상** 을 달성했습니다. 이는 수십만 개의 샘플로 훈련된 기존 모델들을 능가하는 결과입니다. 또한, **SWE-bench** 에서는 기존 모델 대비 **148% 이상의 성능 향상** 을 보였으며, **Qwen3-30B-A3B** 의 평균 점수를 **0.242에서 0.307** 로 향상시키는 등 다양한 모델에서 일관된 효율성 개선을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 장기 에이전트의 핵심 역량을 학습시키는 데 있어 단순히 데이터의 양이 아니라 **고품질의 구조화된, 특히 실제 진화적 맥락을 반영한 데이터** 가 결정적임을 보여줍니다. 소프트웨어 개발의 **Pull Request 체인** 과 같은 자연스러운 프로세스를 활용한 데이터 합성은 효율적이며, 적은 데이터로도 모델의 **태스크 분해, 일관성 유지, 오류 수정** 능력을 크게 향상시킬 수 있습니다. 이는 AI 개발자들이 제한된 리소스로 복잡한 에이전트 시스템을 훈련할 수 있는 효과적인 방법을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.