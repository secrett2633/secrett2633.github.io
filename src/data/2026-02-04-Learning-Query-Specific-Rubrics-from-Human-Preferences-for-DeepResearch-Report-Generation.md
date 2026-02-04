---
title: "[논문리뷰] Learning Query-Specific Rubrics from Human Preferences for DeepResearch Report Generation"
excerpt: "이 [arXiv]에 게시한 'Learning Query-Specific Rubrics from Human Preferences for DeepResearch Report Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - DeepResearch
  - Rubric Generation
  - Human Preferences
  - Reinforcement Learning
  - Multi-agent Systems
  - LLM Evaluation
  - Reward Modeling

permalink: /ai/review/2026-02-04-Learning-Query-Specific-Rubrics-from-Human-Preferences-for-DeepResearch-Report-Generation/

toc: true
toc_sticky: true

date: 2026-02-04 00:00:00+0900+0900
last_modified_at: 2026-02-04 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.03619)

**저자:** Changze Lv, Jie Zhou, Wentao Zhao, Jingwen Xu, Zisu Huang, Muzhao Tian, Shihan Dou, Tao Gui, Le Tian, Xiao Zhou, Xiaoqing Zheng, Xuanjing Huang, Jie Zhou



## 핵심 연구 목표
본 논문은 DeepResearch가 생성하는 보고서의 훈련 및 평가에 필요한 **검증 가능한 보상 신호 부재** 라는 핵심 과제를 해결하고자 합니다. 기존의 일반적인 또는 수동으로 구축된 쿼리별 평가 기준(rubric)이 갖는 **확장성 부족** 및 **인간 선호도와의 불일치** 문제를 극복하고, 인간 선호도에 정렬된 쿼리별 평가 기준 생성기를 학습하는 파이프라인을 제안합니다.

## 핵심 방법론
연구팀은 먼저 인간의 선호도가 주석 처리된 5,000개 이상의 **DeepResearch 스타일 쿼리 데이터셋** 을 구축했습니다. 이 데이터를 활용하여, **GRPO(Group Relative Policy Optimization)** 를 통해 루브릭 생성기를 훈련시켰으며, 이 과정에서 인간 선호도 일관성 보상, **LLM-as-a-Judge 품질 보상** , 그리고 형식 보상을 결합한 **하이브리드 보상 함수** 를 사용했습니다. 또한, 긴 추론 과정을 효과적으로 처리하기 위해 검색, 상태 업데이트, 보고서 생성을 전문화된 에이전트들이 상호작용하는 **MaMs(Multi-agent Markov-state) workflow** 를 도입했습니다.

## 주요 결과
제안된 루브릭 생성기는 기존의 사전 정의되거나 LLM이 생성한 대안보다 더 **판별적이고 인간 친화적인 감독 신호** 를 제공함을 입증했습니다. 특히, **하이브리드 보상** 을 사용했을 때 **Qwen3-30B-A3B** 모델에서 **65.68%의 선호도 정확도** 와 **0.376의 Cohen's d** 로 최고의 성능을 달성했습니다. 이 루브릭 생성기를 **MaMs 훈련 프레임워크** 에 통합했을 때, DeepResearch 시스템은 **DeepResearch Bench** 에서 모든 오픈소스 베이스라인을 능가하고 선도적인 비공개 소스 모델에 필적하는 **종합 점수 49.3** 의 성능을 보였습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 이 연구를 통해 **DeepResearch** 와 같은 복잡한 보고서 생성 태스크에서 **인간의 선호도를 반영한 맞춤형 평가 기준** 을 효과적으로 생성하고 활용할 수 있습니다. **MaMs workflow** 는 기존 **ReAct** 방식의 한계를 넘어선 **장기적 추론 및 정보 통합** 능력을 제공하여, 보다 안정적이고 효율적인 AI 에이전트 개발에 중요한 방향을 제시합니다. **하이브리드 보상 모델링** 은 LLM의 평가 편향을 줄이고 인간의 피드백을 강화하여, AI 모델의 학습 프로세스 개선에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.