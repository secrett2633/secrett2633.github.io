---
title: "[논문리뷰] Memory as Action: Autonomous Context Curation for Long-Horizon Agentic
  Tasks"
excerpt: "Xueyuan Lin이 arXiv에 게시한 'Memory as Action: Autonomous Context Curation for Long-Horizon Agentic
  Tasks' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Long-Horizon Tasks
  - Agentic AI
  - Context Curation
  - Working Memory
  - Reinforcement Learning
  - Policy Optimization
  - Large Language Models
  - Memory-as-Action

permalink: /ai/review/2025-10-15-Memory-as-Action-Autonomous-Context-Curation-for-Long-Horizon-Agentic-Tasks/

toc: true
toc_sticky: true

date: 2025-10-15 13:01:40+0900
last_modified_at: 2025-10-15 13:01:40+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.12635)

**저자:** Yuxiang Zhang, Jiangming Shu, Ye Ma, Xueyuan Lin, Shangxi Wu, Jitao Sang



## 핵심 연구 목표
본 논문은 LLM 기반 에이전트가 긴 작업(long-horizon tasks)을 수행할 때 **제한된 작업 메모리** 가 불필요하거나 관련 없는 컨텍스트에 의해 쉽게 과부하되는 문제를 해결하고자 합니다. 기존 외부/휴리스틱 기반의 메모리 관리 방식의 한계를 극복하고, **학습 가능한 내재적 메모리 관리 능력** 을 통해 에이전트가 자율적으로 컨텍스트를 큐레이션하여 성능과 효율성을 동시에 향상시키는 것을 목표로 합니다.

## 핵심 방법론
에이전트가 명시적인 메모리 편집 작업을 정책의 일부로 실행하는 새로운 프레임워크인 **Memory-as-Action (MemAct)** 을 제안합니다. 메모리 편집 작업으로 인해 발생하는 "트랙토리 골절(trajectory fractures)" 문제를 해결하기 위해, 메모리 액션 지점에서 트랙토리를 분할하고 각 세그먼트에 트랙토리 수준의 이점(advantages)을 적용하여 안정적인 정책 경사 학습을 가능하게 하는 **Dynamic Context Policy Optimization (DCPO)** 알고리즘을 개발했습니다. 초기 정책은 **Segmented Supervised Finetuning (SFT)** 을 통해 콜드 스타트 되며, 이후 **강화 학습** 으로 세련됩니다.

## 주요 결과
**MemAct-14B-RL** 모델은 Multi-Objective QA 데이터셋에서 **59.1%의 평균 정확도** 를 달성하여, **Qwen3-235B** 와 같은 대규모 모델을 포함한 모든 기준 모델들을 능가했습니다. 또한, **Search-R1-14B** 에이전트가 **8,625 토큰** 을 사용하는 반면, **MemAct-14B-RL** 은 더 높은 정확도를 위해 **평균 라운드당 3,447 입력 토큰** 이라는 현저히 낮은 토큰 비용을 보였습니다. 7B 모델의 경우, 이 프레임워크는 롤아웃 단계를 약 **40%** , 정책 업데이트 단계를 **25%** 단축하여 훈련 효율성을 크게 개선했습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM 에이전트가 복잡하고 긴 작업에서 **컨텍스트를 자율적으로 관리** 할 수 있는 효과적인 방법을 제시합니다. **Memory-as-Action** 프레임워크는 기존의 무차별적인 컨텍스트 확장을 대체할 수 있는 실용적인 대안을 제공하며, **DCPO** 는 이 과정에서 발생하는 학습 불안정성을 해결합니다. 이를 통해 더 작은 모델도 복잡한 장기 작업을 효율적으로 처리할 수 있는 **적응형 메모리 전략** 을 학습할 수 있게 되어, AI 시스템의 비용 효율성과 성능을 동시에 개선할 잠재력을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.