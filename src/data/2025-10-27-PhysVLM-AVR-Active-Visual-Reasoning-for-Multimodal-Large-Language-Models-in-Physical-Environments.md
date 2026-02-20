---
title: "[논문리뷰] PhysVLM-AVR: Active Visual Reasoning for Multimodal Large Language
  Models in Physical Environments"
excerpt: "Chaoyang Zhao이 arXiv에 게시한 'PhysVLM-AVR: Active Visual Reasoning for Multimodal Large Language
  Models in Physical Environments' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Active Visual Reasoning
  - MLLM
  - Physical Environments
  - Partially Observable
  - Markov Decision Process
  - Chain-of-Thought
  - Embodied AI
  - CLEVR-AVR

permalink: /ai/review/2025-10-27-PhysVLM-AVR-Active-Visual-Reasoning-for-Multimodal-Large-Language-Models-in-Physical-Environments/

toc: true
toc_sticky: true

date: 2025-10-27 13:07:36+0900
last_modified_at: 2025-10-27 13:07:36+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.21111)

**저자:** Weijie Zhou, Xuantang Xiong, Yi Peng, Manli Tao, Chaoyang Zhao, Honghui Dong, Ming Tang, Jinqiao Wang



## 핵심 연구 목표
본 연구는 기존 MLLM이 정적이고 완전히 관찰 가능한 환경에 국한되어 실제 물리적 환경에서의 정보 불완전성 문제에 취약하다는 한계를 지적합니다. 이에 인간의 능동적인 탐색 및 상호작용을 모방하여, 부분적으로만 관찰 가능한 인터랙티브 환경에서 MLLM이 시각적 추론을 수행할 수 있도록 **능동적 시각 추론(Active Visual Reasoning, AVR)** 패러다임을 도입하고 발전시키는 것을 목표로 합니다.

## 핵심 방법론
AVR 태스크를 평가하기 위해 **CLEVR-AVR 시뮬레이션 벤치마크** 를 개발하였으며, 이를 학습시키기 위해 **AVR-152k 데이터셋** 을 구축했습니다. 특히 **AVR-Core** 데이터셋은 정보 불확실성 식별, 액션 기반 정보 획득 예측, 정보 최대화 액션 선택 등의 과정을 담은 **Chain-of-Thought(CoT) 주석** 을 포함하여 **고차 마르코프 의사결정 과정(Higher-Order MDP)** 으로 모델링합니다. 이 위에 **PhysVLM-AVR** 모델은 **Qwen2.5-3B LLM** 과 **SigLIP-400M 시각 인코더** 를 기반으로 하며, 다중 이미지 처리를 위한 **max pooling 레이어** 를 도입하고 다단계 혼합 데이터 훈련 전략을 사용했습니다.

## 주요 결과
**PhysVLM-AVR-3B** 및 미세 조정된 **AVR-Qwen2.5-VL-7B** 모델은 **CLEVR-AVR** 벤치마크에서 기존 모델들을 능가하는 최첨단 성능을 달성했습니다. 특히 **ACCISJ (Information Sufficiency Judgment Accuracy)** 에서 **90.5%** 를 기록하며 **GPT-40(88.4%)** 을 상회했고, **ACCFA (Final Answer Accuracy)** 는 **39.7%** 를 달성했습니다. 또한 **OpenEQA** , **RoboVQA** 와 같은 임베디드 추론 태스크와 **GeoMath** , **Geometry30K** 와 같은 정적 시각 추론 태스크에서도 강력한 일반화 성능을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 현재 임베디드 MLLM이 정보 불완전성을 감지함에도 불구하고, 능동적으로 새로운 정보를 획득하고 통합하는 데 어려움을 겪는다는 근본적인 한계를 명확히 보여줍니다. **AVR-152k 데이터셋** 과 **PhysVLM-AVR** 모델은 동적인 물리적 환경에서 지능적으로 탐색하고 추론하는 AI 에이전트를 개발하기 위한 중요한 기반을 제공하며, 차세대 상호작용 AI 시스템 개발에 필수적인 이정표를 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.