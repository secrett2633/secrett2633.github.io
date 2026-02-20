---
title: "[논문리뷰] ERNIE 5.0 Technical Report"
excerpt: "HasuerYu이 arXiv에 게시한 'ERNIE 5.0 Technical Report' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Foundation Model
  - Autoregressive
  - Mixture-of-Experts
  - Elastic Training
  - Reinforcement Learning
  - Unified Architecture
  - Sparse MoE
  - Efficient Deployment

permalink: /ai/review/2026-02-05-ERNIE-5-0-Technical-Report/

toc: true
toc_sticky: true

date: 2026-02-05 00:00:00+0900+0900
last_modified_at: 2026-02-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.04705)

**저자:** ERNIE Team, Baidu



## 핵심 연구 목표
ERNIE 5.0은 텍스트, 이미지, 비디오, 오디오에 걸쳐 **통합된 멀티모달 이해 및 생성** 을 위한 본질적으로 **자기회귀(autoregressive) 기반 파운데이션 모델** 을 개발하는 것을 목표로 합니다. 기존 후기 퓨전(late-fusion) 방식의 한계를 극복하고, 단일 모델 내에서 강력한 단일 모달 기능과 확장 가능한 멀티모달 상호작용을 동시에 지원하고자 합니다.

## 핵심 방법론
모든 모달리티는 **통합된 Next-Group-of-Tokens 예측 목표** 하에 처음부터 학습되며, **모달리티 불가지론적 전문가 라우팅(modality-agnostic expert routing)** 을 사용하는 **초희소(ultra-sparse) Mixture-of-Experts (MoE) 아키텍처** 를 기반으로 합니다. 특히, **탄력적 훈련 패러다임(elastic training paradigm)** 을 도입하여 단일 사전 훈련 실행으로 다양한 깊이, 전문가 용량 및 라우팅 희소성을 가진 여러 하위 모델 패밀리를 생성합니다. 또한, 대규모 멀티모달 모델에서 RL 훈련의 안정성과 효율성을 보장하기 위해 **편향 없는 리플레이 버퍼(Unbiased Replay Buffer, U-RB)** , **다중 세분성 중요도 샘플링 클리핑(Multi-granularity Importance Sampling Clipping, MISC)** , **힌트 기반 학습(Hint-based Learning)** 등의 기술을 적용했습니다.

## 주요 결과
ERNIE 5.0은 공개된 모델 중 **최초로 1조 개의 파라미터** 를 가진 통합 자기회귀 모델로서 멀티모달 이해와 생성을 모두 지원합니다. 추론 시 라우팅 **top-k를 25%로 줄였을 때** 미미한 정확도 손실로 **15% 이상의 디코딩 속도 향상** 을 달성했으며, 탄력적 훈련을 통해 **53.7%의 활성화된 파라미터** 와 **35.8%의 전체 파라미터** 만을 사용하여 거의 완전한 성능을 유지했습니다. 언어, 시각, 오디오 벤치마크 전반에서 강력하고 균형 잡힌 성능을 일관되게 보여줍니다.

## AI 실무자를 위한 시사점
**탄력적 훈련 패러다임** 은 단일 모델 학습으로 다양한 리소스 제약 조건에 맞는 여러 버전의 모델을 효율적으로 배포할 수 있는 실용적인 방법을 제공합니다. 또한, **모달리티 불가지론적 MoE 라우팅** 과 **통합된 사전 훈련 아키텍처** 는 복잡한 멀티모달 AI 시스템을 개발할 때 확장성과 효율성을 높이는 중요한 설계 원칙을 제시합니다. **대규모 멀티모달 RL 훈련** 의 안정성 및 효율성 문제에 대한 포괄적인 해결책은 복잡한 AI 에이전트 개발에 큰 도움이 됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.