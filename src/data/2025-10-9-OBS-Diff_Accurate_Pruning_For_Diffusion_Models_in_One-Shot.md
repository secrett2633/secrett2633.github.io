---
title: "[논문리뷰] OBS-Diff: Accurate Pruning For Diffusion Models in One-Shot"
excerpt: "이 [arXiv]에 게시한 'OBS-Diff: Accurate Pruning For Diffusion Models in One-Shot' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Models
  - Network Pruning
  - One-Shot Pruning
  - Optimal Brain Surgeon (OBS)
  - Model Compression
  - Timestep-Aware Hessian
  - Structured Pruning

permalink: /ai/review/2025-10-9-OBS-Diff_Accurate_Pruning_For_Diffusion_Models_in_One-Shot/

toc: true
toc_sticky: true

date: 2025-10-09 13:45:06+0900
last_modified_at: 2025-10-09 13:45:06+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.06751)

**저자:** Junhan Zhu¹, Hesong Wang1,2, Mingluo Su¹, Zefang Wang1,2, Huan Wang1*



## 핵심 연구 목표
대규모 텍스트-이미지 확산 모델의 과도한 연산 비용 문제를 해결하고, 기존 원샷 네트워크 가지치기(pruning) 방법론이 확산 모델의 **반복적인 노이즈 제거 특성**과 **복잡한 아키텍처**에 직접 적용하기 어려운 한계를 극복하는 것을 목표로 합니다. 궁극적으로 다양한 아키텍처와 가지치기 세분성을 지원하는 **범용적이고 훈련 없는(training-free) 확산 모델 가지치기 프레임워크**를 개발하고자 합니다.

## 핵심 방법론
고전적인 **Optimal Brain Surgeon (OBS)** 프레임워크를 현대 확산 모델의 복잡한 아키텍처에 맞게 재활용하며, **비정형, N:M 반정형, 정형(MHA 헤드 및 FFN 뉴런)** 등 다양한 가지치기 세분성을 지원합니다. 확산 과정의 반복적인 특성을 반영하여 **Timestep-Aware Hessian Construction**을 제안, **로그 감소 가중치 체계**를 통해 초기 시간 단계에 더 큰 중요성을 부여하여 오류 누적을 완화합니다. 또한, 비용이 많이 드는 보정 과정을 줄이기 위해 **"Module Packages"** 기반의 **계산 효율적인 그룹-별 순차 가지치기 전략**을 도입합니다.

## 주요 결과
**OBS-Diff**는 확산 모델의 원샷 가지치기에서 최첨단 성능을 달성하며, 최소한의 시각적 품질 저하로 추론 가속화를 제공합니다. 특히 **SD 3-medium 50% 비정형 희소성**에서 다른 모든 베이스라인을 능가하는 **0.6468 ImageReward** 점수를 기록했으며, 높은 희소성(예: **Flux 1.dev 70% 희소성**)에서도 시각적 품질을 유지했습니다. **SD 3.5-Large 30% 정형 희소성**에서 **FID 34.51**을 유지하며 **L1-norm 베이스라인**의 **FID 327.48**과 대비하여 압도적인 강건성을 보였습니다. **2B 파라미터 SD 3-medium 모델**의 전체 가지치기 과정이 **NVIDIA RTX 4090 GPU**에서 **15분 이내**에 완료되어 뛰어난 효율성을 입증했습니다.

## AI 실무자를 위한 시사점
**OBS-Diff**는 **대규모 확산 모델**의 **높은 연산 및 메모리 요구 사항**을 획기적으로 줄여, 제한된 하드웨어 환경에서도 고품질의 이미지 생성 모델을 배포할 수 있는 실용적인 솔루션을 제공합니다. **훈련 없는(training-free)** **원샷(one-shot) 가지치기** 방식은 모델 압축 과정의 복잡성과 시간을 크게 단축하여, 개발 주기를 가속화하고 AI 제품의 시장 출시 시간을 단축하는 데 기여합니다. 다양한 **가지치기 세분성(unstructured, semi-structured, structured)** 지원은 AI 엔지니어가 특정 하드웨어 아키텍처 및 성능 목표에 맞춰 최적의 압축 전략을 유연하게 선택할 수 있도록 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.