---
title: "[논문리뷰] LK Losses: Direct Acceptance Rate Optimization for Speculative Decoding"
excerpt: "arXiv에 게시된 'LK Losses: Direct Acceptance Rate Optimization for Speculative Decoding' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Speculative Decoding
  - LLM Inference
  - Acceptance Rate
  - KL Divergence
  - Total Variation Distance
  - Loss Functions
  - Draft Model Training
  - Adaptive Learning

permalink: /ai/review/2026-03-02-LK-Losses-Direct-Acceptance-Rate-Optimization-for-Speculative-Decoding/

toc: true
toc_sticky: true

date: 2026-03-02 00:00:00+0900+0900
last_modified_at: 2026-03-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.23881)

**저자:** Alexander Samarin, Sergei Krutikov, Anton Shevtsov, Sergei Skvortsov, Filipp Fisin, Alexander Golubev



## 핵심 연구 목표
본 연구는 추론 가속화를 위한 **투기적 디코딩(speculative decoding)** 에서 드래프트 모델의 **토큰 수락률(acceptance rate)** 을 직접적으로 최적화하는 새로운 훈련 목표인 **LK 손실(LK losses)** 을 제안합니다. 기존의 **Kullback-Leibler (KL) 발산** 최소화는 수락률에 대한 프록시 역할을 하지만, 제한된 용량의 드래프트 모델에서는 종종 최적의 수락률을 달성하지 못하는 문제를 해결하고자 합니다.

## 핵심 방법론
저자들은 두 가지 유형의 **LK 손실** 을 제안합니다. 첫째, **하이브리드 목적 함수(hybrid objective)** 는 **KL 발산** 과 **총 변동(Total Variation, TV) 거리** 를 **적응형 블렌딩 스케줄(adaptive blending schedule λ)** 을 사용하여 결합합니다. 이 스케줄은 훈련 초기에 KL 발산에 집중하여 부드러운 최적화 경로를 제공하고, 모델 정렬이 개선됨에 따라 TV 거리로 전환하여 직접적인 수락률 최적화를 유도합니다. 둘째, **로그-수락(log-acceptance) 기반 목적 함수** 는 수락률의 음의 로그 우도 `−log(α)`를 직접 최소화하여, **1/α 스케일링** 을 통해 소실되는 경사 문제를 해결합니다.

## 주요 결과
LK 손실은 네 가지 드래프트 아키텍처와 8B에서 685B에 이르는 여섯 가지 타겟 모델에 걸쳐 **일관된 수락률 개선** 을 입증했습니다. 특히, **Qwen3-235B-A22B-Instruct** 타겟 모델에서 **하이브리드 LK 손실(η=3)** 사용 시 평균 수락 길이에서 **KL 발산 대비 최대 +8.2% 향상** 을 달성했습니다. **GPT-OSS 120B** 모델에서는 **+7.7% 향상** 을 보였으며, **낮은 용량의 드래프트 모델** 과 **대규모 MoE 타겟 모델** 에서 더 큰 개선 효과를 확인했습니다.

## AI 실무자를 위한 시사점
**LK 손실** 은 LLM 추론 속도를 높이는 **투기적 디코딩** 의 효율성을 직접적으로 개선할 수 있는 강력한 도구입니다. 이 방법론은 **모델 및 아키텍처 불가지론적(agnostic)** 이므로, 기존 투기자 훈련 파이프라인에 추가적인 계산 오버헤드 없이 **드롭인(drop-in) 교체** 로 쉽게 통합될 수 있습니다. 특히 **소규모 드래프트 모델** 이나 **용량 불일치가 큰 시나리오** 에서 효과적인 성능 향상을 기대할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.