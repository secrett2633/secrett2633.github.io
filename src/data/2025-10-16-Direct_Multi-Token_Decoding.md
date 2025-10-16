---
title: "[논문리뷰] Direct Multi-Token Decoding"
excerpt: "Xifeng Yan이 [arXiv]에 게시한 'Direct Multi-Token Decoding' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Inference
  - Multi-token Decoding
  - Transformer Architecture
  - Layer Specialization
  - Cyclical Refilling
  - Inference Speedup
  - Model Scaling

permalink: /ai/review/2025-10-16-Direct_Multi-Token_Decoding/

toc: true
toc_sticky: true

date: 2025-10-16 13:09:51+0900
last_modified_at: 2025-10-16 13:09:51+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.11958)

**저자:** Xuan Luo, Weizhi Wang, Xifeng Yan



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)의 비효율적인 계층 활용을 해결하여 추론 속도를 가속화하는 것을 목표로 합니다. 특히, 기존 디코더-온리 트랜스포머가 단일 토큰 생성을 위해 모든 계층을 반복적으로 사용하는 비효율성을 개선하고, 추가적인 파라미터나 검증 단계 없이 여러 토큰을 동시에 효율적으로 생성할 수 있는 새로운 추론 패러다임을 제안합니다.

## 핵심 방법론
제안하는 **DMTD (Direct Multi-Token Decoding)**는 LLM의 후기 계층(late layers)이 토큰 수준 예측에 특화되어 있다는 연구 결과에 착안하여, 이 계층들을 재활용하여 한 번의 전체 포워드 패스 후 여러 토큰을 직접 디코딩합니다. 훈련 시에는 **순환 마스킹(cyclical masking) 전략**을 사용하여 단일 시퀀스 내에서 여러 미래 토큰을 예측하도록 모델을 학습시키고, 추론 시에는 **순환 리필(cyclical refilling) 메커니즘**을 통해 누락된 KV 캐시 엔트리를 복구하여 지속적인 생성을 지원합니다.

## 주요 결과
**Qwen3-4B** 모델에 대한 실험에서, DMTD는 2토큰 디코딩 시 **원래 모델의 100% 성능**을 유지하며, 3토큰 및 4토큰 디코딩 시 각각 **98.4%** 및 **96.3%**의 성능을 보였습니다. 특히, 배치 크기 1에서 최대 **2배의 추론 속도 향상**을 달성했으며, 디코딩 계층의 재활용 비율을 높였을 때 성능이 크게 향상되었습니다(예: E0D16이 **100.1%**). 스케일링 분석 결과, 더 큰 훈련 데이터셋을 사용하면 성능이 더욱 향상될 것으로 예측됩니다.

## AI 실무자를 위한 시사점
DMTD는 LLM 추론 속도 향상을 위한 유망한 대안으로, 특히 **추가적인 모델이나 파라미터 없이 기존 LLM 아키텍처를 활용**한다는 점에서 실용적입니다. 이는 **추론 비용 절감** 및 **지연 시간 단축**에 기여할 수 있으며, 기존 투기적 디코딩(speculative decoding)과 달리 복잡한 검증 절차가 필요 없어 구현이 간결합니다. 더 큰 모델과 데이터셋 환경에서 더욱 큰 잠재력을 가질 것으로 예상되어, 대규모 LLM 서비스 배포에 효과적으로 적용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.