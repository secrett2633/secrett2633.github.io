---
title: "[논문리뷰] Thai Semantic End-of-Turn Detection for Real-Time Voice Agents"
excerpt: "Monthol Charattrakool이 arXiv에 게시한 'Thai Semantic End-of-Turn Detection for Real-Time Voice Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - End-of-Turn Detection
  - Thai NLP
  - Voice Agents
  - Real-time Inference
  - Transformer Models
  - Few-shot Learning
  - Fine-tuning
  - Latency Optimization

permalink: /ai/review/2025-10-7-Thai-Semantic-End-of-Turn-Detection-for-Real-Time-Voice-Agents/

toc: true
toc_sticky: true

date: 2025-10-07 13:36:57+0900
last_modified_at: 2025-10-07 13:36:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.04016)

**저자:** Thanapol Popit, Natthapath Rungseesiripak, Monthol Charattrakool, Saksorn Ruangtanusak



## 핵심 연구 목표
이 논문은 실시간 음성 에이전트를 위한 **태국어 텍스트 전용 EOT(End-of-Turn) 감지** 에 대한 최초의 체계적인 연구를 수행하는 것을 목표로 합니다. 기존의 오디오 침묵 기반 방법론이 지연 시간을 유발하고 태국어 특유의 언어적 뉘앙스에 취약하다는 한계를 극복하며, 언어적 내용만을 기반으로 사용자의 발화 종료 시점을 안정적으로 예측하고자 합니다. 궁극적으로 인간-컴퓨터 상호작용의 자연스러움을 향상하고 응답 지연 시간을 줄이는 것이 목표입니다.

## 핵심 방법론
연구는 **YODAS 코퍼스** 에서 전사된 자막을 사용하여 EOT를 **토큰 경계에서의 이진 결정 문제** 로 공식화합니다. 세 가지 주요 접근 방식을 비교했습니다: **경량 LLM** ( **Qwen3-0.6B** , **Typhoon2-1B** 등)의 **zero-shot 및 few-shot 프롬프팅** , **decoder-only 모델의 미세 조정** (stop token 예측 목적), 그리고 **encoder-only 모델의 미세 조정** ( **WangchanBERTa** , **mDeBERTa-v3-base** 등)을 이진 분류기로 사용했습니다. 성능은 **F1-score** 와 **CPU 지연 시간** (단일 배치)을 기준으로 **Intel® Xeon® Platinum 8480+ CPU** 에서 평가되었습니다.

## 주요 결과
감독 학습 기반 미세 조정이 가장 높은 성능을 보였으며, **미세 조정된 Llama3.2-Typhoon2-1B** 가 **0.881의 최고 F1-score** 와 **110ms의 낮은 CPU 지연 시간** 을 달성했습니다. **미세 조정된 Qwen3-0.6B** 또한 **0.866의 F1-score** 와 더 빠른 **90ms의 지연 시간** 으로 우수한 성능을 보였습니다. 반면, instruction 기반 프롬프팅(zero-shot/few-shot)은 높은 지연 시간(1.5-2.6초)과 낮은 F1-score( **Qwen3-8B** 의 최고 zero-shot F1-score는 **0.706** )으로 인해 실시간 EOT에 실용적이지 못했습니다.

## AI 실무자를 위한 시사점
이 연구는 실시간 태국어 EOT 시스템 개발을 위한 **실용적인 기준선** 을 제시하며, 특히 **경량의 미세 조정된 Transformer 모델** 이 높은 정확도와 낮은 지연 시간으로 이 태스크에 적합함을 보여줍니다. **Llama3.2-Typhoon2-1B** 와 같은 **fine-tuned decoder 모델** 은 최고 성능을 제공하지만, 최적의 결정을 위해 **유효성 검사 세트를 통한 보정 단계** 가 필요합니다. 반면, **mDeBERTa-v3-base** 와 같은 **fine-tuned encoder 모델** 은 결정 임계값에 덜 민감하여 더 견고하고 "바로 사용 가능한" 솔루션이 될 수 있습니다. 이는 AI 개발자가 **성능, 지연 시간, 배포 복잡성** 사이의 균형을 고려하여 모델을 선택할 수 있는 중요한 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.