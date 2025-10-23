---
title: "[논문리뷰] KORE: Enhancing Knowledge Injection for Large Multimodal Models via
  Knowledge-Oriented Augmentations and Constraints"
excerpt: "Jinhe Bi이 [arXiv]에 게시한 'KORE: Enhancing Knowledge Injection for Large Multimodal Models via
  Knowledge-Oriented Augmentations and Constraints' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Knowledge Injection
  - Large Multimodal Models
  - Catastrophic Forgetting
  - Data Augmentation
  - Parameter-Efficient Fine-Tuning
  - Null Space
  - Continual Learning

permalink: /ai/review/2025-10-23-KORE_Enhancing_Knowledge_Injection_for_Large_Multimodal_Models_via_Knowledge-Oriented_Augmentations_and_Constraints/

toc: true
toc_sticky: true

date: 2025-10-23 13:08:59+0900
last_modified_at: 2025-10-23 13:08:59+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.19316)

**저자:** Kailin Jiang, Hongbo Jiang, Ning Jiang, Zhi Gao, Jinhe Bi



## 핵심 연구 목표
대규모 멀티모달 모델(LMM)의 고정적이고 제한적인 지식 문제를 해결하고, 새로운 지식 주입 시 발생하는 치명적 망각(Catastrophic Forgetting)을 완화하는 것을 목표로 합니다. 연구는 지식 적응(새 지식 학습)과 지식 유지(기존 지식 보존) 간의 균형을 최적화하여 LMM의 지속적인 진화를 지원하는 시너지 방법론인 **KORE**를 제안합니다.

## 핵심 방법론
**KORE**는 **지식 중심 증강(Knowledge-oRientEd augmentations)**과 **제약(constraints)**을 결합합니다. **KORE-AUGMENTATION**은 개별 지식 항목을 **GPT-4o**를 활용하여 **다중 라운드 대화(multi-round dialogue) 및 명령어 태스크(instruction tasks)** 데이터로 자동 변환하여 모델이 새 지식을 정확하게 내면화하도록 합니다. 동시에 **KORE-CONSTRAINT**는 LMM 선형 레이어 활성화의 **공분산 행렬(covariance matrix)**에 이전 지식을 저장하고, 이 공분산 행렬의 **널 공간(null space)**으로 원본 가중치를 투영하여 어댑터를 초기화함으로써 기존 지식과의 간섭을 최소화하는 미세 조정 방향을 정의합니다.

## 주요 결과
**KORE**는 **LLaVA-v1.5 (7B, 13B)** 및 **Qwen2.5-VL (7B)**과 같은 다양한 LMM에서 지식 주입 성능과 치명적 망각 완화에 있어 우수한 결과를 달성했습니다. 특히 **LLaVA-v1.5 (7B)**에서 **KORE (r=235)**는 새로운 지식 적응 벤치마크인 **EVOKE**에서 기존 최고 성능 대비 **CEM에서 12.63, F1-Score에서 21.27 개선**을 보였습니다. 또한, **LoRA** 대비 평균 **6.53%p** 높은 지식 유지 성능을 기록하여 강력한 기존 지식 보존 능력을 입증했습니다.

## AI 실무자를 위한 시사점
**KORE**는 AI/ML 엔지니어에게 LMM이 빠르게 변화하는 실세계 지식을 지속적으로 학습하고 업데이트할 수 있는 실용적인 방법론을 제공합니다. 특히 **지식 중심 데이터 증강**은 모델이 단순 암기를 넘어 지식의 논리적 구조를 이해하고 일반화하는 데 기여하며, **널 공간 기반의 제약 조건**은 중요한 기존 지식을 보존하면서 새로운 정보를 효율적으로 통합하는 효과적인 전략입니다. 이는 동적이고 진화하는 AI 시스템을 구축하는 데 필수적인 기술입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.