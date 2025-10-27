---
title: "[논문리뷰] RECALL: REpresentation-aligned Catastrophic-forgetting ALLeviation via
  Hierarchical Model Merging"
excerpt: "이 [arXiv]에 게시한 'RECALL: REpresentation-aligned Catastrophic-forgetting ALLeviation via
  Hierarchical Model Merging' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Catastrophic Forgetting
  - Continual Learning
  - Model Merging
  - LLMs
  - Representation Learning
  - Data-free Learning
  - Hierarchical Parameter Fusion

permalink: /ai/review/2025-10-27-RECALL_REpresentation-aligned_Catastrophic-forgetting_ALLeviation_via_Hierarchical_Model_Merging/

toc: true
toc_sticky: true

date: 2025-10-27 13:07:36+0900
last_modified_at: 2025-10-27 13:07:36+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.20479)

**저자:** Bowen Wang, Haiyuan Wan, Liwen Shi, Chen Yang, Peng He, Yue Ma, Haochen Han, Wenhao Li, Tiao Tan, Yongjian Li, Fangming Liu, Yifan Gong, Sheng Zhang



## 핵심 연구 목표
대규모 언어 모델(LLMs)이 연속 학습 및 다중 도메인 환경에서 겪는 **Catastrophic Forgetting (CF)** 문제를 해결하는 것을 목표로 합니다. 특히, 과거 데이터 접근이나 명시적인 태스크 경계 없이도 유용한 태스크 지식을 식별하고 보존하여 LLM의 지속적인 적응과 다중 도메인 역량 융합을 가능하게 하는 데이터-프리 및 태스크-불가지론적 방법론을 제시합니다.

## 핵심 방법론
RECALL은 LLM의 **내부 표현(internal representations)**을 학습된 지식의 신뢰할 수 있는 프록시로 활용하는 **표현 인식 모델 병합(representation-aware model merging) 프레임워크**입니다. **클러스터링된 대표 샘플(clustered typical samples)**에 대한 **레이어별 은닉 표현(layer-wise hidden representations)**을 통해 모델 간 유사성을 계산합니다. 이 유사성을 기반으로 **적응적, 계층적 매개변수 융합(adaptive, hierarchical parameter fusion)**을 수행하여 지식을 정렬하며, 특히 **RBF 커널 함수**를 사용한 유사도 측정과 **Softmax** 기반의 가중치 부여 방식으로 각 레이어의 매개변수를 독립적으로 병합합니다. 이를 통해 얕은 레이어에서는 **도메인 일반 기능(domain-general features)**을 보존하고 깊은 레이어에서는 **태스크별 적응(task-specific adaptation)**을 가능하게 합니다.

## 주요 결과
RECALL은 다섯 가지 NLP 태스크 및 다양한 연속 학습 시나리오에서 기준선보다 뛰어난 성능을 보였습니다. 단일 모델 병합 시, **Llama-2-7B-chat** 기반으로 **평균 성능 45.00**을 달성하고, 이전에 학습되지 않은 태스크에 대한 **일반화 성능은 38.92(+7.86% 향상)**를 기록했습니다. 다중 모델 병합 시에는 **56.93% 및 62.83%**의 평균 성능으로 모든 기준 방법들을 능가했으며, 순차적 미세 조정 시나리오에서 **LoRA SFT** 및 **EWC** 대비 **Catastrophic Forgetting에 대한 강력한 저항성**을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 **데이터 접근이 제한적인 실제 환경**에서 LLM의 **지속적인 학습 및 지식 융합**을 위한 실용적이고 확장 가능한 해결책을 제공합니다. RECALL의 **데이터-프리(data-free)** 특성은 개인 정보 보호가 중요한 애플리케이션이나 대규모 데이터 스토리지가 어려운 시나리오에서 모델을 효과적으로 업데이트할 수 있게 합니다. 특히, **계층적 병합 전략**은 모델의 일반 지식과 태스크별 특화 지식을 균형 있게 보존함으로써, 새로운 도메인이나 태스크에 대한 LLM의 효율적인 적응 및 기능 확장을 가능하게 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.