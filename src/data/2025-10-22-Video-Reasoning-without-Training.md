---
title: "[논문리뷰] Video Reasoning without Training"
excerpt: "이 [arXiv]에 게시한 'Video Reasoning without Training' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Reasoning
  - Large Multimodal Models (LMMs)
  - Inference-Time Optimization
  - Entropy-Based Objective
  - Training-Free
  - KV-Cache Steering
  - Micro-Exploration
  - Macro-Exploitation

permalink: /ai/review/2025-10-22-Video-Reasoning-without-Training/

toc: true
toc_sticky: true

date: 2025-10-22 13:07:20+0900
last_modified_at: 2025-10-22 13:07:20+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.17045)

**저자:** Deepak Sridhar, Kartikeya Bhardwaj, Jeya Pradha Jeyaraj, Nuno Vasconcelos, Ankita Nayak, Harris Teague



## 핵심 연구 목표
본 논문은 Large Multimodal Models (LMMs) 기반 비디오 추론 시 발생하는 **높은 연산 비용과 추론 과정 제어의 한계**를 해결하고자 합니다. 기존의 Reinforcement Learning (RL) 또는 Chain-of-Thought (CoT) 방식의 단점을 극복하고, 추가 **훈련 없이 추론 시간에 모델의 '사고' 과정을 개선**하는 방법을 탐구합니다. 특히, 추론 시간 메트릭이 모델의 추론 품질을 특성화하고 향상시킬 수 있는지에 집중합니다.

## 핵심 방법론
제안하는 **V-Reason**은 LMM의 마지막 디코더 레이어의 **값 캐시 (value cache)**에 소규모의 **학습 가능한 컨트롤러**(`AV`)를 추가하여 추론 시에만 최적화합니다. 이 최적화는 **엔트로피 기반 목적 함수**인 **Entropy Switching Loss**를 사용하며, 모델의 **미세 탐색 (micro-exploration) 및 미세 활용 (micro-exploitation) 사이클을 강화**하고 최종 엔트로피를 최소화하는 것을 목표로 합니다. **V-Reason (Lite)** 변형은 메모리 효율성을 위해 KV-캐시에서 낮은 노름 값을 가진 비디오 토큰의 50%를 제거합니다.

## 주요 결과
**V-Reason**은 여러 비디오 추론 데이터셋에서 기준 모델 대비 **평균 1.4%의 성능 향상**을 달성했으며, RL 훈련 모델과의 정확도 격차를 **0.6%** 이내로 줄였습니다. 또한, RL 모델 대비 **출력 토큰 수를 58.6% 감소**시켜 최대 **67% (평균 37%)의 지연 시간 절감**을 이뤄냈습니다. 특히, **Qwen2.5-VL-32B** 모델에서는 **+3.0%**, **Qwen2.5-VL-72B** 모델에서는 **+0.4%**의 성능 향상을 보여 스케일 확장성을 입증했습니다.

## AI 실무자를 위한 시사점
**V-Reason**은 추가적인 **훈련이나 강화 학습 없이** 기존 LMM의 비디오 추론 능력을 **추론 시간에 효율적으로 향상**시킬 수 있는 실용적인 방법을 제시합니다. 이는 **제한된 컴퓨팅 자원**을 가진 환경에서 고품질 비디오 추론 모델을 배포하고 운영하는 데 큰 이점을 제공하며, **토큰 생성량을 대폭 줄여** 추론 비용과 지연 시간을 절감할 수 있습니다. 엔트로피 기반의 '사고' 메커니즘은 모델이 보다 **정교하게 탐색하고 수렴**하도록 유도하여, 대규모 데이터셋 훈련 없이도 모델의 추론 깊이와 정확도를 높이는 새로운 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.