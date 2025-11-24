---
title: "[논문리뷰] DRIVE: Data Curation Best Practices for Reinforcement Learning with   Verifiable Reward in Competitive Code Generation"
excerpt: "이 [arXiv]에 게시한 'DRIVE: Data Curation Best Practices for Reinforcement Learning with   Verifiable Reward in Competitive Code Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning with Verifiable Reward
  - Competitive Programming
  - Code Generation
  - Data Curation
  - Curriculum Learning
  - Supervised Fine-tuning
  - Entropy Expansion

permalink: /ai/review/2025-11-11-DRIVE-Data-Curation-Best-Practices-for-Reinforcement-Learning-with-Verifiable-Reward-in-Competitive-Code-Generation/

toc: true
toc_sticky: true

date: 2025-11-11 00:00:00+0900+0900
last_modified_at: 2025-11-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.06307)

**저자:** Speed Zhu, Jianwei Cai, Guang Chen, Lulu Wu, Saiyong Yang, Wiggin Zhou



## 핵심 연구 목표
이 논문은 RLVR(Reinforcement Learning with Verifiable Rewards)을 사용하여 경쟁 프로그래밍 코드 생성의 성능을 향상시키는 데 있어 **데이터 큐레이션 및 커리큘럼 설계**의 중요성을 탐구합니다. 특히, 기존 연구들이 수학 벤치마크나 알고리즘 설계에 집중하고 데이터 큐레이션을 간과하는 한계를 극복하고자 합니다.

## 핵심 방법론
연구팀은 **Qwen2.5-32B** 모델에 **Supervised Fine-tuning (SFT)**을 적용한 후, 검증 가능한 보상을 사용하는 **두 단계 RL 학습 프레임워크**를 제안합니다. 첫 번째 단계인 **엔트로피 확장(Entropy Expansion)**에서는 **GRPO 알고리즘**과 **8개 롤아웃**, **24k 토큰** 길이로 다양한 경쟁 프로그래밍 문제를 학습시켜 탐색을 증가시킵니다. 두 번째 단계인 **난이도 집중 커리큘럼(Hard-Focus Curriculum)**에서는 **LiveCode V6**의 어려운 문제들에 **64개 롤아웃**을 할당하여 모델이 가장 어려운 사례들을 마스터하도록 훈련합니다.

## 주요 결과
제안된 **DRIVE-RL 모델** (32B 파라미터)은 비슷한 규모의 모델들 사이에서 SOTA 성능을 달성했으며, **DeepSeek v3.1** 및 **Doubao-1.5-Thinking**과 같은 선도적인 시스템과 비견되는 수준을 보여주었습니다. 특히, **Codeforces OJ**에서 SFT 기준 대비 **+58.3% (0.115에서 0.182 Pass@1로)**의 상당한 상대적 성능 향상을 기록했으며, **LiveCode 벤치마크**에서는 **+16.1%에서 +28.1%**의 개선을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 경쟁 프로그래밍과 같은 복잡한 도메인에서 **RLVR 성공의 핵심 요소가 데이터 큐레이션 및 커리큘럼 설계**임을 입증합니다. 엔트로피 확장을 통한 일반화 능력 강화와 난이도 집중 커리큘럼을 통한 문제 해결 능력 심화는 **대규모 언어 모델 학습 전략**에 중요한 시사점을 제공합니다. 특히, 어려운 문제 해결을 위해 **충분한 롤아웃 예산(64+ 샘플)**을 할당하는 것이 필수적임을 보여주어 자원 효율적인 학습 전략 수립에 기여합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.