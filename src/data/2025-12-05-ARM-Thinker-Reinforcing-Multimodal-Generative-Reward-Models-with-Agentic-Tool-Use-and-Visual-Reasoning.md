---
title: "[논문리뷰] ARM-Thinker: Reinforcing Multimodal Generative Reward Models with Agentic Tool Use and Visual Reasoning"
excerpt: "arXiv에 게시된 'ARM-Thinker: Reinforcing Multimodal Generative Reward Models with Agentic Tool Use and Visual Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Reward Models
  - Agentic AI
  - Tool Use
  - Reinforcement Learning
  - Visual Reasoning
  - Multimodal LLMs
  - Instruction Following
  - Evaluation Benchmarks

permalink: /ai/review/2025-12-05-ARM-Thinker-Reinforcing-Multimodal-Generative-Reward-Models-with-Agentic-Tool-Use-and-Visual-Reasoning/

toc: true
toc_sticky: true

date: 2025-12-05 00:00:00+0900+0900
last_modified_at: 2025-12-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.05111)

**저자:** Shengyuan Ding, Xinyu Fang, Ziyu Liu, Yuhang Zang, Yuhang Cao, Xiangyu Zhao, Haodong Duan, Xiaoyi Dong, Jianze Liang, Bin Wang, Conghui He, Dahua Lin, Jiaqi Wang



## 핵심 연구 목표
본 논문은 기존 멀티모달 보상 모델(Reward Models, RMs)이 겪는 환각, 약한 시각적 접지(visual grounding), 그리고 검증을 위한 도구 사용 능력 부족 문제를 해결하는 것을 목표로 합니다. 이를 위해 **에이전트 기반 도구 사용(agentic tool use)** 과 **시각적 추론** 을 강화한 새로운 멀티모달 보상 모델을 제안하여, 복잡한 멀티모달 추론 태스크에서 신뢰성과 해석 가능성을 높이고자 합니다.

## 핵심 방법론
제안하는 **ARM-Thinker** 는 **"생각-행동-관찰(think-act-observe)" 패러다임** 을 따르는 에이전트 기반 멀티모달 보상 모델입니다. 이는 **이미지 크롭, 문서 페이지 검색, 명령 확인** 과 같은 외부 도구를 자율적으로 호출하여 판단을 검증 가능한 증거에 기반하도록 합니다. 모델은 **다단계 강화 학습(multi-stage reinforcement learning)** 과 **Group Relative Policy Optimization (GRPO)** 를 통해 도구 호출 결정과 판단 정확도를 공동으로 최적화하며, 특히 **2단계 보상 설계** 로 도구 사용 탐색과 정확도 개선을 유도합니다.

## 주요 결과
**ARM-Thinker-7B** 는 보상 모델링 벤치마크에서 **평균 +16.2%** 의 정확도 향상, 도구 사용 태스크에서 **+9.6%** 의 성능 향상을 달성했습니다. 특히, **VL-RewardBench** 에서는 **67.8%** 의 정확도를 기록하며 베이스라인 대비 **+17.7%** 향상되었고, 새롭게 제안된 **ARMBench-VL** 에서는 **64.6%** 의 정확도로 **+18.5%** 개선을 보였습니다. 이는 에이전트 기능이 보상 모델의 정확성과 해석 가능성을 크게 향상시킴을 입증합니다.

## AI 실무자를 위한 시사점
**ARM-Thinker** 는 환각을 줄이고 신뢰할 수 있는 AI 시스템을 구축하려는 AI 실무자들에게 중요한 방향성을 제시합니다. 특히 **멀티모달 대규모 언어 모델(MLLMs)** 의 **검증 가능하고 증거 기반의 판단 능력** 을 강화하는 데 기여하며, 복잡한 질의응답이나 다단계 명령 수행과 같은 시나리오에서 모델의 유용성을 크게 높일 수 있습니다. 이 프레임워크는 향후 **자율 에이전트 개발** 및 **다양한 모달리티와 도구 확장** 을 위한 강력한 기반이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.