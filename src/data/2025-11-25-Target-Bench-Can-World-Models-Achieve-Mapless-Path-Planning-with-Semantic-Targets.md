---
title: "[논문리뷰] Target-Bench: Can World Models Achieve Mapless Path Planning with Semantic Targets?"
excerpt: "Zhaowei Lu이 [arXiv]에 게시한 'Target-Bench: Can World Models Achieve Mapless Path Planning with Semantic Targets?' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - World Models
  - Mapless Navigation
  - Semantic Path Planning
  - Robot Learning
  - Video Prediction
  - Benchmark
  - Trajectory Generation

permalink: /ai/review/2025-11-25-Target-Bench-Can-World-Models-Achieve-Mapless-Path-Planning-with-Semantic-Targets/

toc: true
toc_sticky: true

date: 2025-11-25 00:00:00+0900+0900
last_modified_at: 2025-11-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.17792)

**저자:** Zhaowei Lu, Zhexiao Sun, Zhihao Liang, Hongyuan Ye, Dingrui Wang



## 핵심 연구 목표
본 논문은 최신 세계 모델(World Models, WMs)이 텍스트로 지정된 암묵적인 의미론적 목표를 가진 길 없는 경로 계획(mapless path planning) 작업을 실제 환경에서 얼마나 잘 수행하는지 정량적으로 평가하는 것을 목표로 합니다. 기존 세계 모델 평가 프레임워크가 시각적 충실도나 물리적 일관성에 중점을 둔 한계를 극복하고, 로봇 경로 계획을 위한 의미론적 추론 능력 평가를 제공하고자 합니다.

## 핵심 방법론
연구팀은 **Target-Bench** 벤치마크를 제시했으며, 이는 사족보행 로봇으로 수집한 **450개** 의 비디오 시퀀스 데이터셋과 평가 파이프라인으로 구성됩니다. 이 파이프라인은 세계 모델이 생성한 미래 비디오에서 **세계 디코더(VGGT, SpaTracker, ViPE)** 를 통해 로봇의 카메라 궤적을 추출하고, 이를 **SLAM 기반의 실제 궤적** 과 비교합니다. 성능은 **ADE, FDE, MR, SE, AC** 의 다섯 가지 지표와 이를 종합한 **가중 종합 점수(Weighted Overall Score)** 로 평가됩니다.

## 주요 결과
기성(off-the-shelf) 세계 모델들은 로봇 경로 계획에 심각한 한계를 보였으며, 최고의 모델인 **Wan2.2-Flash** 도 **0.299** 의 낮은 가중 종합 점수를 기록했습니다. 그러나 본 데이터셋의 **325개 시나리오** 로 오픈 소스 **Wan2.2-TI2V-5B** 모델을 미세 조정하자, 베이스 버전 대비 **400% 이상** 향상된 **0.345** 의 점수를 달성하며 기성 모델 중 최고 성능을 뛰어넘었습니다. 이는 세계 모델이 명시적으로 정의되지 않은 의미론적 목표도 이해할 수 있음을 시사합니다.

## AI 실무자를 위한 시사점
이 연구는 현재 세계 모델이 높은 시각적 사실성을 제공함에도 불구하고, 실제 로봇 환경에서의 의미론적 길 없는 경로 계획에는 아직 상당한 격차가 있음을 명확히 보여줍니다. 하지만, 소규모의 **도메인 특정 고품질 데이터** 로 모델을 미세 조정함으로써 **대규모 사전 훈련 모델** 보다 훨씬 뛰어난 성능 향상을 달성할 수 있음을 입증했습니다. 이는 로봇 공학 분야에서 세계 모델을 활용하기 위한 효율적인 데이터 전략과 도메인 적응의 중요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.