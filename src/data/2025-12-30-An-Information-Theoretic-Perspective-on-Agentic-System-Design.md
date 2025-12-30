---
title: "[논문리뷰] An Information Theoretic Perspective on Agentic System Design"
excerpt: "이 [arXiv]에 게시한 'An Information Theoretic Perspective on Agentic System Design' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic Systems
  - Language Models
  - Mutual Information
  - Rate-Distortion Theory
  - Compute Efficiency
  - Scaling Laws
  - Compressor-Predictor Architecture
  - On-device AI

permalink: /ai/review/2025-12-30-An-Information-Theoretic-Perspective-on-Agentic-System-Design/

toc: true
toc_sticky: true

date: 2025-12-30 00:00:00+0900+0900
last_modified_at: 2025-12-30 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.21720)

**저자:** Shizhe He, Avanika Narayan, Ishan S. Khare, Scott W. Linderman, Christopher Ré, Dan Biderman



## 핵심 연구 목표
논문은 에이전트형 언어 모델(LM) 시스템, 특히 **컴프레서-프레딕터(compressor-predictor) 아키텍처** 의 설계에 대한 체계적인 이해 부족을 해결하고자 합니다. 컴프레서와 프레딕터의 선택이 다운스트림 성능에 미치는 영향을 **정보 이론적 관점** 에서 분석하여, 시스템 설계에 대한 실질적인 지침을 제공하는 것을 목표로 합니다.

## 핵심 방법론
컴프레서를 **노이즈 채널(noisy channel)** 로 모델링하고, 원본 컨텍스트와 압축된 요약 간의 **상호 정보량(Mutual Information, MI)** 을 추정하는 방법을 제안합니다. 이 **MI 추정기** 는 태스크 독립적인 압축 품질 지표로 사용되며, **rate-distortion 분석** 을 통해 압축률과 예측 오류(distortion) 간의 트레이드오프를 정량화합니다. 다양한 LM 모델(LLAMA-3, QWEN-2.5, GEMMA-3)과 데이터셋(LONGHEALTH, FINANCEBENCH, QASPER, WILDCHAT, FINEWEB)에 걸쳐 포괄적인 스케일링 분석을 수행했습니다.

## 주요 결과
실험 결과, 컴프레서 스케일링이 프레딕터 스케일링보다 성능 향상에 훨씬 효과적임이 밝혀졌습니다. 특히, **QWEN-2.5 1.5B에서 7B 컴프레서로 스케일링 시 LONGHEALTH 정확도가 60% 증가** 하는 반면, 프레딕터는 70B에서 405B로 스케일링해도 12% 증가에 그쳤습니다. 또한, 큰 컴프레서는 더 적은 출력 토큰으로 더 많은 정보를 전달하며, **QWEN-2.5 1.5B에서 7B로의 스케일링은 FLOPs-per-generation을 1.3%만 증가** 시켰습니다. **상호 정보량(MI per token)** 은 다운스트림 성능 및 perplexity와 강력한 상관관계( **r = -0.84, R2 = 0.71** )를 보였습니다.

## AI 실무자를 위한 시사점
에이전트 시스템 설계 시 **컴프레서 모델의 성능 향상** 에 우선적으로 투자하는 것이 효율적입니다. 특히, **온디바이스 컴프레서** 를 활용하여 클라우드 기반 프레딕터의 비용을 절감하는 "프론트 로딩(front-loading)" 전략을 채택할 수 있습니다. **상호 정보량(MI)** 은 태스크에 구애받지 않는 압축 품질 지표로서, 전체 시스템 평가 없이도 압축 단계의 효과를 예측하는 데 활용될 수 있습니다. 또한, **QWEN-2.5** 와 같은 특정 모델 패밀리는 다른 모델보다 더 높은 컴퓨팅 효율성을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.