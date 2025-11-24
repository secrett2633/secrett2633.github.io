---
title: "[논문리뷰] Reinforcement Learning Improves Traversal of Hierarchical Knowledge in LLMs"
excerpt: "이 [arXiv]에 게시한 'Reinforcement Learning Improves Traversal of Hierarchical Knowledge in LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Large Language Models
  - Hierarchical Knowledge
  - Knowledge Traversal
  - Structured Prompting
  - Internal Representations
  - Alignment Tax

permalink: /ai/review/2025-11-11-Reinforcement-Learning-Improves-Traversal-of-Hierarchical-Knowledge-in-LLMs/

toc: true
toc_sticky: true

date: 2025-11-11 00:00:00+0900+0900
last_modified_at: 2025-11-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.05933)

**저자:** Renfei Zhang, Manasa Kaniselvan, Niloofar Mireshghallah



## 핵심 연구 목표
이 논문은 RL(강화 학습)이 LLM(대규모 언어 모델)의 추론 능력 향상과 암기된 지식 저하 사이의 트레이드오프를 가져온다는 일반적인 통념에 도전합니다. 특히 계층적이고 구조화된 지식(예: 의료 코드)의 탐색이 필요한 순수 지식 회상 작업에서 RL 기반 모델이 기본 모델 및 SFT(지도 학습 미세 조정) 모델보다 지속적으로 우수한 성능을 보이는 현상을 설명하는 것을 목표로 합니다.

## 핵심 방법론
연구는 세 가지 상보적인 실험으로 구성됩니다. 첫째, **구조화된 프롬프트**를 통해 SFT 모델의 계층적 지식 탐색 능력을 유도하여 RL 모델과의 성능 격차를 줄일 수 있는지 테스트합니다. 둘째, **IPC(International Patent Classification) 데이터셋**을 복잡도(계층적 탐색 깊이)에 따라 계층화하고 **Path Matching Score**를 도입하여, RL 모델이 더 깊은 계층을 효과적으로 탐색하는지 평가합니다. 셋째, **레이어별 내부 활성화 분석**을 통해 질의와 사실 진술에 대한 모델의 내부 표현이 SFT와 RL 모델 간에 어떻게 다른지 비교합니다.

## 주요 결과
**MedConceptsQA** 데이터셋에서 **DeepSeek-V3**와 **DeepSeek-R1** 모델 간의 성능 격차는 **구조화된 프롬프트**를 통해 **24pp에서 7pp**로 현저히 감소했으며 (68% 격차 감소), 이는 기존 지식이 모델 내에 존재하지만 적절한 탐색이 필요함을 시사합니다. 또한, RL 기반 모델은 **Memory-Heavy** (5+ 계층적 회상) 작업에서 **우수한 경로 회상 정확도**를 보였으며, 이는 RL이 사실적 지식 표현 자체보다는 **지식 탐색 방식**을 변형함을 나타냅니다. 내부 분석 결과, **사실적 표현**은 높은 코사인 유사도(**0.85-0.92**)를 유지했으나, **질의 표현**은 중간 레이어에서 유사도가 **0.65-0.73**로 눈에 띄게 발산했습니다.

## AI 실무자를 위한 시사점
RL은 단순히 추론 능력을 향상시키는 것을 넘어, **LLM이 이미 습득한 계층적 지식을 더 효과적으로 탐색**할 수 있도록 인지적 스캐폴딩(scaffolding)을 개선할 수 있음을 보여줍니다. 이는 AI 엔지니어에게 **지식 조직화 및 탐색 능력 강화**에 RL을 활용할 새로운 방향을 제시하며, **프롬프트 엔지니어링**이 SFT 모델 내부에 잠재된 지식을 활용하는 데 매우 중요함을 강조합니다. 또한, 내부 표현 분석을 통해 모델의 **사전 훈련(지식 습득)**과 **후처리(지식 조직화)**를 분리하는 보다 효율적인 학습 패러다임 설계 가능성을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.