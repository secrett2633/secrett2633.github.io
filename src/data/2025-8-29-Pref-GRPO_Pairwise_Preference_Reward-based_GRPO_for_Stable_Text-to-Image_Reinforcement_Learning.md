---
title: "[논문리뷰] Pref-GRPO: Pairwise Preference Reward-based GRPO for Stable
  Text-to-Image Reinforcement Learning"
excerpt: "Jiazi Bu이 [arXiv]에 게시한 'Pref-GRPO: Pairwise Preference Reward-based GRPO for Stable
  Text-to-Image Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Text-to-Image Generation
  - GRPO
  - Reward Hacking
  - Pairwise Preference
  - Reward Model
  - Stable Optimization
  - UniGenBench

permalink: /ai/review/2025-8-29-Pref-GRPO_Pairwise_Preference_Reward-based_GRPO_for_Stable_Text-to-Image_Reinforcement_Learning/

toc: true
toc_sticky: true

date: 2025-08-29 13:14:44+0900
last_modified_at: 2025-08-29 13:14:44+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.20751)

**저자:** Yibin Wang, Zhimin Li, Yuhang Zang, Yujie Zhou, Jiazi Bu, Chunyu Wang, Qinglin Lu, Cheng Jin, Jiaqi Wang



## 핵심 연구 목표
본 논문은 텍스트-투-이미지(T2I) 생성에서 기존 **GRPO(Group Relative Policy Optimization)** 기반 강화 학습 방법론이 겪는 **보상 해킹(reward hacking)** 문제를 해결하고, 보다 안정적인 훈련 패러다임을 확립하는 것을 목표로 합니다. 기존 **포인트 점수 기반 보상 모델**이 유발하는 "환상적 이점(illusory advantage)"으로 인해 이미지 품질 저하에도 불구하고 보상 점수가 비정상적으로 상승하는 문제를 개선하고자 합니다.

## 핵심 방법론
이 연구는 첫 번째 **쌍대 선호도 보상 기반 GRPO 방법**인 **PREF-GRPO**를 제안합니다. 이는 기존의 절대 보상 점수 최대화 대신 **쌍대 선호도 피팅(pairwise preference fitting)**으로 최적화 목표를 전환합니다. 각 훈련 단계에서 생성된 이미지 그룹 내의 모든 쌍을 **쌍대 선호도 보상 모델(PPRM)**을 사용하여 비교하고, 각 이미지의 **승률(win rate)**을 정책 최적화를 위한 보상 신호로 활용합니다. 또한, **UNIGENBENCH**라는 새로운 벤치마크를 구축하여 T2I 모델의 세밀한 평가를 수행합니다.

## 주요 결과
**PREF-GRPO**는 포인트 점수 기반 방법보다 더 안정적인 이점을 제공하여 보상 해킹 문제를 효과적으로 완화함을 입증했습니다. **UNIGENBENCH** 벤치마크에서 **UR(UnifiedReward)** 기반 점수 최대화 방식 대비 **전반적인 점수에서 5.84%** 향상되었으며, 특히 **텍스트(Text)에서 12.69%**, **논리적 추론(Logical Reasoning)에서 12.04%**의 상당한 개선을 보였습니다(Table 1). 이는 이미지 품질에서도 포괄적인 이점을 제공합니다(Table 2).

## AI 실무자를 위한 시사점
**PREF-GRPO**는 T2I 모델 훈련 시 **보상 해킹 문제를 해결**하여 모델이 실제 이미지 품질 향상에 집중하도록 돕는 강력한 방법을 제시합니다. **쌍대 선호도 피팅**은 인간의 판단 과정을 모방하여 미묘한 품질 차이를 효과적으로 구분하므로, T2I 모델의 **안정적이고 신뢰할 수 있는 최적화**에 기여합니다. 또한, **UNIGENBENCH**는 모델의 강점과 약점을 **세밀하게 분석**할 수 있는 평가 프레임워크를 제공하여, 실무자들이 T2I 모델 개발 방향을 구체적으로 설정하는 데 유용합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.