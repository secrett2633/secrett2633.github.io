---
title: "[논문리뷰] BaseReward: A Strong Baseline for Multimodal Reward Model"
excerpt: "jianfeipan이 [arXiv]에 게시한 'BaseReward: A Strong Baseline for Multimodal Reward Model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Reward Model
  - MLLM Alignment
  - RLHF
  - Reward Head Architecture
  - Data Curation
  - Ensemble Methods
  - BaseReward

permalink: /ai/review/2025-9-22-BaseReward_A_Strong_Baseline_for_Multimodal_Reward_Model/

toc: true
toc_sticky: true

date: 2025-09-22 13:11:29+0900
last_modified_at: 2025-09-22 13:11:29+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.16127)

**저자:** Yi-Fan Zhang, Haihua Yang, Huanyu Zhang, Yang Shi, Zezhou Chen, Haochen Tian, Chaoyou Fu, Kai Wu, Bo Cui, Xu Wang, Jianfei Pan, Haotian Wang, Zhang Zhang, Liang Wang



## 핵심 연구 목표
본 연구는 고성능 **멀티모달 보상 모델(MRM)** 구축을 위한 체계적인 지침("레시피")을 제공하는 것을 목표로 합니다. 현재 학계와 산업계 모두에서 MRM 구축을 위한 명확한 가이드라인이 부족한 상황에서, 보상 모델링 패러다임, 아키텍처, 훈련 전략, 데이터 큐레이션, 백본 모델 선택 및 앙상블 방법 등 MRM 개발 파이프라인의 모든 핵심 구성 요소를 심층적으로 분석하고자 합니다.

## 핵심 방법론
연구는 **나이브(Naive), 비평 기반(Critic-based), 생성형(Generative) 보상 모델** 패러다임의 성능을 비교하고, **2개 레이어와 SiLU 활성화 함수**를 사용하는 보상 헤드 아키텍처가 최적임을 밝혔습니다. 훈련 과정에서는 정규화 전략의 영향을 분석하여 불필요한 보상 정규화 사용을 피하고, 10개 이상의 멀티모달 및 텍스트 전용 데이터셋을 활용한 **데이터 큐레이션**의 중요성을 강조했습니다. 이를 기반으로 **Qwen2.5-VL** 백본과 최적화된 보상 헤드를 사용하는 **BaseReward**를 제안하고, 실제 **강화 학습(RL)** 파이프라인에 통합하여 실용성을 검증했습니다.

## 주요 결과
**BaseReward**는 **MM-RLHF-Reward Bench**에서 기존 **SOTA** 대비 **11.9%**의 정확도 향상을, **VL-Reward Bench**에서는 **14.2%**의 전체 정확도 향상을 달성하며 새로운 SOTA를 수립했습니다. 특히 **Claude 3.7 Sonnet**과 **R1-Reward**를 포함한 이전 공개 및 독점 모델들을 능가했습니다. 또한, 실제 강화 학습 파이프라인에 통합되었을 때 **MLLM의 인지, 추론 및 대화 작업** 전반에 걸쳐 일관된 성능 향상을 가져왔습니다.

## AI 실무자를 위한 시사점
본 연구는 효율적이고 효과적인 **멀티모달 보상 모델**을 구축하기 위한 실용적인 "레시피"를 제시합니다. 특히, 간단하면서도 강력한 **Naive-RM 아키텍처**와 **2-레이어 SiLU 보상 헤드**의 효과를 입증하여 복잡성 대비 높은 성능을 제공함을 시사합니다. **엄선된 고품질 멀티모달 및 텍스트 전용 선호도 데이터**의 중요성을 강조하며, 텍스트 전용 데이터가 멀티모달 판단력을 크게 향상시킬 수 있음을 보여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.