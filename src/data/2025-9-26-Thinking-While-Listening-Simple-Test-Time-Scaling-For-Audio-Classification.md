---
title: "[논문리뷰] Thinking While Listening: Simple Test Time Scaling For Audio
  Classification"
excerpt: "Mert Pilanci이 [arXiv]에 게시한 'Thinking While Listening: Simple Test Time Scaling For Audio
  Classification' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Audio Classification
  - Test-Time Scaling
  - Reasoning Traces
  - Large Language Models (LLMs)
  - Transformer Architectures
  - Zero-shot Reasoning
  - Computational Efficiency

permalink: /ai/review/2025-9-26-Thinking-While-Listening-Simple-Test-Time-Scaling-For-Audio-Classification/

toc: true
toc_sticky: true

date: 2025-09-26 13:35:32+0900
last_modified_at: 2025-09-26 13:35:32+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.19676)

**저자:** Prateek Verma, Mert Pilanci



## 핵심 연구 목표
본 논문은 오디오 분류 성능 향상을 위해 신경망 모델이 "듣는 동안 생각하는(thinking while listening)" 능력을 갖추도록 하는 프레임워크를 제안합니다. 특히, **LLM의 추론 능력**에서 영감을 받아 오디오 분류 파이프라인에 추론을 통합하고, 테스트 시간 스케일링을 지원하는 새로운 아키텍처를 설계하여 모델의 정확도를 개선하는 것을 목표로 합니다.

## 핵심 방법론
제안된 방법론은 **동결된 오디오 분류기** (예: **AST**, **YAMNet**)에서 **패치 수준 예측**을 여러 번 샘플링하여 "추론 트레이스"를 생성합니다. 이 추론 트레이스는 **동결된 LLM 추론 모델** (예: **GPT-OSS 20B**, **Qwen3-14B**, 또는 **새로운 임베딩 행렬로 재훈련된 GPT-2**)에 입력되어 최종 분류를 정제합니다. 특히, **테스트 시간 스케일링**은 샘플링 트레이스 길이를 늘려 추론 과정을 확장함으로써 성능 향상을 이끌어냅니다.

## 주요 결과
제안된 모델은 분류 정확도에서 일관된 개선을 보였습니다. **ESC-50** 데이터셋에서 **AST** 백본과 함께 사용 시 **88.3% top-1 정확도**를 달성하여 기본 성능(84%)을 크게 상회했습니다. 특히, **GPT-2의 임베딩 행렬만 재훈련**하는 경량 접근 방식이 **GPT-OSS 20B** 및 **Qwen3-14B**와 같은 수십억 개 파라미터의 텍스트 기반 추론 모델의 제로샷 성능을 능가하는 결과를 보였습니다.

## AI 실무자를 위한 시사점
이 프레임워크는 **테스트 시간 스케일링**을 통해 모델 파라미터나 입력 오디오를 변경하지 않고도 오디오 분류 성능을 향상시키는 새로운 방법을 제시합니다. **경량 LLM 접근 방식** (임베딩 행렬 재훈련)이 대규모 제로샷 추론 모델보다 효과적임을 보여, 컴퓨팅 자원이 제한된 환경에서도 **효율적인 추론 능력 통합**이 가능함을 시사합니다. 이는 오디오 애플리케이션의 강건성과 정확도를 높이는 데 실질적인 기여를 할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.