---
title: "[논문리뷰] TimeSearch-R: Adaptive Temporal Search for Long-Form Video Understanding via Self-Verification Reinforcement Learning"
excerpt: "이 [arXiv]에 게시한 'TimeSearch-R: Adaptive Temporal Search for Long-Form Video Understanding via Self-Verification Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Long-form Video Understanding
  - Temporal Search
  - Reinforcement Learning
  - Self-Verification
  - Video-Language Models
  - Adaptive Search
  - Interleaved Reasoning

permalink: /ai/review/2025-11-12-TimeSearch-R_Adaptive_Temporal_Search_for_Long-Form_Video_Understanding_via_Self-Verification_Reinforcement_Learning/

toc: true
toc_sticky: true

date: 2025-11-12 00:00:00+0900+0900
last_modified_at: 2025-11-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.05489)

**저자:** Junwen Pan, Qizhe Zhang, Rui Zhang, Ming Lu, Xin Wan, Yuan Zhang, Chang Liu, Qi She



## 핵심 연구 목표
본 논문은 수만 개의 프레임에서 관련 정보를 식별해야 하는 긴 형식 비디오 이해 태스크에서, 기존의 수동으로 고안된 검색 전략이 **최적의 검색 전략** 학습을 위한 end-to-end 최적화가 부족하다는 문제를 해결합니다. 특히, **불충분한 시간적 탐색**과 **일관성 없는 논리적 추론**이라는 RL 훈련의 한계를 극복하고, 동적이고 적응적인 시간 검색 전략을 학습하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 시간 검색을 **텍스트-비디오 교차 사고(interleaved text-video thinking)**로 재정의하고, **강화 학습(RL)**을 통해 최적의 검색 전략을 학습하는 **TimeSearch-R** 프레임워크를 제안합니다. 특히, **Completeness Self-Verification (GRPO-CSV)**을 도입하여 검색된 프레임이 충분한 시각적 증거를 제공하는지 정책 모델 스스로 검증하게 함으로써 **탐색의 완전성**과 **추론의 일관성**을 확보합니다. 또한, 순수한 언어적 편향이나 해결 불가능한 샘플을 제거하는 **2단계 데이터 필터링 파이프라인**을 통해 고품질 훈련 데이터셋을 구축합니다.

## 주요 결과
**TimeSearch-R**은 시간 검색 벤치마크인 Haystack-LVBench에서 시간 유사도 F1 점수 **8.1**을 달성하여 이전 SOTA 모델인 T*의 **2.5**를 크게 능가했습니다. 긴 형식 비디오 이해 벤치마크인 LongVideoBench에서는 기준 모델 **Qwen2.5-VL** 대비 **4.1%**, 최첨단 모델인 **Video-R1** 대비 **2.0%** 향상된 새로운 SOTA 성능을 기록했습니다. VideoMME에서도 전체 정확도 **66.6%**를 달성하며 영상 길이가 길어질수록 더 큰 성능 향상을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 긴 비디오 콘텐츠를 다루는 **Video-Language Models (VLMs)** 개발자들에게 **동적인 시간 검색**의 잠재력을 제시합니다. 특히, **GRPO-CSV** 메커니즘은 복잡한 대화형 AI 시스템에서 수동 주석 없이도 중간 단계의 행동을 효과적으로 감독할 수 있는 **확장 가능한 약한 감독(weak supervision)** 방안을 제공합니다. 이를 통해 AI 실무자들은 보다 효율적이고 견고한 비디오 이해 및 질의응답 시스템을 구축할 수 있을 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.