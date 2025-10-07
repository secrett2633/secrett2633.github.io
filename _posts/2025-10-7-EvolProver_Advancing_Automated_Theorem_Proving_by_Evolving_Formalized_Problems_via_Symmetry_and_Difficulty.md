---
title: "[논문리뷰] EvolProver: Advancing Automated Theorem Proving by Evolving Formalized
  Problems via Symmetry and Difficulty"
excerpt: "Xuanwu Wang이 [arXiv]에 게시한 'EvolProver: Advancing Automated Theorem Proving by Evolving Formalized
  Problems via Symmetry and Difficulty' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Automated Theorem Proving
  - Data Augmentation
  - Large Language Models
  - Formal Mathematics
  - Symmetry
  - Difficulty Evolution
  - Abstract Syntax Tree
  - Generalizability

permalink: /ai/review/2025-10-7-EvolProver_Advancing_Automated_Theorem_Proving_by_Evolving_Formalized_Problems_via_Symmetry_and_Difficulty/

toc: true
toc_sticky: true

date: 2025-10-07 13:36:57+0900
last_modified_at: 2025-10-07 13:36:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.00732)

**저자:** Yuchen Tian, Ruiyuan Huang, Xuanwu Wang, Zengfeng Huang, Ziyang Luo, Hongzhan Lin, Da Zheng, Lun Du



## 핵심 연구 목표
본 논문은 형식적 정리 증명(formal theorem proving) 분야에서 **대규모 언어 모델(LLMs)**의 일반화 능력이 부족하고 문제 진술의 사소한 변화에도 취약하다는 한계를 해결하는 것을 목표로 합니다. 대규모 학습 데이터의 부족과 LLM의 강건성 문제를 해결하기 위해 대칭성(symmetry)과 난이도(difficulty) 관점에서 데이터 증강 기법을 개발합니다.

## 핵심 방법론
새로운 데이터 증강 파이프라인은 세 가지 주요 방법론으로 구성됩니다: 의미적으로 동등한 구문 변형을 생성하는 **AST 기반 EvolAST**, 수학적 도메인 간에 정리를 번역하여 의미론적 대칭성을 다루는 **LLM 기반 EvolDomain**, 그리고 난이도 범위를 확장하는 **LLM 기반 EvolDifficulty**입니다. 이 증강된 데이터는 엄격한 검증 단계를 거쳐 **DeepSeekProver-V1.5-Base** 모델을 **지도 학습(SFT)** 및 **강화 학습(RL)** 방식으로 미세 조정하여 **EvolProver**를 훈련하는 데 사용됩니다.

## 주요 결과
**EvolProver**는 **FormalMATH-Lite** 벤치마크에서 **53.8% pass@32**의 새로운 SOTA(State-Of-The-Art) 성능을 달성하여, 비슷한 크기의 추론 기반 모델들을 능가했습니다. 또한, **MiniF2F-Test**에서 **69.8% pass@32**, **Ineq-Comp-Seed**에서 **52.2% pass@32**, **Ineq-Comp-Transformed**에서 **34.0% pass@32**를 기록하며 비추론 모델 중 최고 성능을 달성했습니다. 특히, **Ineq-Comp** 벤치마크에서 베이스라인 대비 **30.61% 더 높은 강건성 비율**을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 **형식적 정리 증명 LLM**의 일반화 및 강건성 향상을 위한 **데이터 증강 전략**의 중요성을 강조합니다. **EvolProver**가 추론 기반 모델에 필적하는 성능을 **훨씬 적은 토큰(nearly 10-fold reduction)**으로 달성하여, **비추론 모델**의 효율적인 활용 가능성을 제시했습니다. **EvolAST**와 같은 확장 가능한 프레임워크는 지속적인 데이터 다양성 확보에 기여하며, 수학적 추론 모델 개발에 새로운 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.