---
title: "[논문리뷰] QWHA: Quantization-Aware Walsh-Hadamard Adaptation for
  Parameter-Efficient Fine-Tuning on Large Language Models"
excerpt: "Jae-Joon Kim이 [arXiv]에 게시한 'QWHA: Quantization-Aware Walsh-Hadamard Adaptation for
  Parameter-Efficient Fine-Tuning on Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Fine-tuning
  - Quantization-Aware PEFT
  - Walsh-Hadamard Transform
  - Sparse Adaptation
  - Low-bit Quantization
  - Parameter-Efficient Learning

permalink: /ai/review/2025-9-23-QWHA-Quantization-Aware-Walsh-Hadamard-Adaptation-for-Parameter-Efficient-Fine-Tuning-on-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-09-23 13:36:03+0900
last_modified_at: 2025-09-23 13:36:03+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.17428)

**저자:** Hyesung Jeon, Seojune Lee, Beomseok Kang, Yulhwa Kim, Jae-Joon Kim



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)의 효율적인 배포를 위해 **양자화-인식(Quantization-Aware) PEFT** (Parameter-Efficient Fine-Tuning) 방법을 개발하여, 양자화된 모델의 낮은 비트 환경에서 **정확도를 높이고** 동시에 **훈련 효율성을 개선**하는 것을 목표로 합니다. 특히, 기존의 저랭크 어댑터의 제한된 표현력과 푸리에 관련 변환(FT) 기반 어댑터의 비효율적인 양자화 오류 감소 및 높은 연산 오버헤드 문제를 해결하고자 합니다.

## 핵심 방법론
저자들은 **Walsh-Hadamard Transform (WHT)**을 변환 커널로 사용하는 새로운 어댑터(**WHA**)를 제안하여 FT 기반 어댑터를 양자화된 모델에 통합했습니다. 이 방법론은 양자화-인식 어댑터 초기화 방식을 포함하며, **AdaAlloc**을 통해 출력 채널별 양자화 오류 크기에 비례하여 매개변수 예산을 적응적으로 할당하고, 가장 큰 계수를 선택하여 효율적으로 양자화 오류를 줄입니다. 또한, **값 정제(Value Refinement)**를 통해 선택된 매개변수 값을 최적화하며, 기존 FT 기반 어댑터와 달리 **단일 변환**을 사용하여 연산 비용을 크게 줄입니다.

## 주요 결과
**QWHA**는 **2-비트 양자화** 설정에서 기존 베이스라인 대비 **최소 2-3% 더 높은 정확도**를 달성하며 낮은 비트 양자화에서 일관되게 우수한 성능을 보였습니다. 특히, LLaMA-3.2-3B 모델의 2-bit GSM8k 벤치마크에서 **60.98%**의 정확도를 기록하여 CLOQ의 **54.89%**보다 크게 앞섰습니다. 또한, **Alpaca 데이터셋**에서 기존 FT 기반 어댑터 대비 **상당한 훈련 속도 향상**을 보였는데, 예를 들어 배치 크기 16에서 **CLOQ (8.3시간)**, **SHIRA (9.8시간)**와 유사한 **3.9시간**을 기록하며 기존 FT 기반 어댑터(LoCA/SSH)의 **수십 시간** 대비 압도적인 효율성을 입증했습니다.

## AI 실무자를 위한 시사점
**QWHA**는 **저비트 양자화된 LLM**의 정확성과 효율성을 동시에 향상시키는 실용적인 솔루션을 제공합니다. **WHT 기반 어댑터**와 **적응형 초기화(AdaAlloc)**는 기존 **LoRA** 및 다른 **FT 기반 어댑터**의 한계를 극복하며, **제한된 컴퓨팅 자원**에서도 대규모 모델의 **정확한 미세 조정**을 가능하게 합니다. 이는 AI 엔지니어들이 **엣지 디바이스**나 **저전력 환경**에 LLM을 배포하거나, 개발 주기에서 **빠른 실험 반복**을 수행하는 데 큰 도움이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.