---
title: "[논문리뷰] DLER: Doing Length pEnalty Right - Incentivizing More Intelligence per
  Token via Reinforcement Learning"
excerpt: "arXiv에 게시된 'DLER: Doing Length pEnalty Right - Incentivizing More Intelligence per
  Token via Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Length Penalty
  - Reasoning Efficiency
  - Large Language Models
  - RL Optimization
  - Accuracy-Efficiency Trade-off
  - Chain-of-Thought

permalink: /ai/review/2025-10-20-DLER-Doing-Length-pEnalty-Right-Incentivizing-More-Intelligence-per-Token-via-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-10-20 13:04:24+0900
last_modified_at: 2025-10-20 13:04:24+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.15110)

**저자:** Shih-Yang Liu¹, Xin Dong*, Ximing Lu, Shizhe Diao, Mingjie Liu, Min-Hung Chen, Hongxu Yin, Yu-Chiang Frank Wang, Kwang-Ting Cheng¹, Yejin Choi, Jan Kautz, Pavlo Molchanov



## 핵심 연구 목표
본 논문은 추론 언어 모델(LLM)이 불필요하게 긴 출력을 생성하는 문제를 해결하고, 토큰당 인텔리전스(정확도 대비 응답 길이)를 극대화하는 것을 목표로 합니다. 특히, 길이 패널티로 인한 정확도 저하가 패널티 설계 자체보다는 **RL 최적화 기법** 의 미흡함에서 비롯됨을 재조명하여 이를 개선하고자 합니다.

## 핵심 방법론
저자들은 **Doing Length pEnalty Right (DLER)** 라는 새로운 RL 훈련 레시피를 제안합니다. 이 방법론은 (i) 이점 추정의 큰 편향, (ii) 엔트로피 붕괴, (iii) 희소한 보상 신호라는 세 가지 핵심 과제를 해결하기 위해 **배치 단위 보상 정규화** , 탐색을 촉진하는 **더 높은 클리핑 임계값** , 그리고 **동적 샘플링** 및 **커리큘럼 기반 필터링** 을 결합합니다. 또한, 질문 난이도에 따라 truncation 길이를 동적으로 조절하는 **Difficulty-Aware DLER (DA-DLER)** 과 희소한 RL 학습 데이터 상황을 위한 **업데이트 선택적 가중치 병합 전략** 도 제시됩니다.

## 주요 결과
**DLER** 는 기존 모델의 정확도를 유지하거나 능가하면서 출력 길이를 **70% 이상 단축** 하는 최신 기술 수준의 정확도-효율성 트레이드오프를 달성했습니다. 특히 **DeepSeek-R1-7B** 모델의 경우, 평균 응답 길이를 **69% 감소** 시켜 **2405 토큰** 으로 만들고도 **MATH 94.21%** , **AIME-24 55.62%** 의 정확도를 기록했습니다. **DA-DLER** 는 응답 길이를 추가로 **11~15%** 더 줄여 효율성을 극대화했으며, **DLER-R1-7B** 는 **28% 더 높은 정확도** 와 낮은 지연 시간으로 뛰어난 테스트 시점 병렬 확장성을 보여주었습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM의 추론 효율성을 높이는 데 있어 **복잡한 길이 패널티 설계보다 RL 최적화 전략** 의 중요성을 강조합니다. **DLER** 를 통해 개발된 모델은 **상당히 짧은 응답 길이** 와 **향상된 정확도** 를 제공하여 LLM 배포 시 **운영 비용 절감** 및 **추론 속도 향상** 에 직접적으로 기여할 수 있습니다. 또한, **업데이트 선택적 가중치 병합 전략** 은 고품질 독점 데이터 없이도 효율적인 추론 모델을 구축할 수 있는 실용적인 방안을 제시하며, 이는 AI 실무자들이 더욱 접근하기 쉬운 효율적인 LLM을 개발하는 데 중요한 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.