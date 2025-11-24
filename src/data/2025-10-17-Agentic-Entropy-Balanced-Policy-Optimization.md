---
title: "[논문리뷰] Agentic Entropy-Balanced Policy Optimization"
excerpt: "이 [arXiv]에 게시한 'Agentic Entropy-Balanced Policy Optimization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic Reinforcement Learning
  - Web Agents
  - Tool Learning
  - Entropy Balancing
  - Policy Optimization
  - Rollout Strategy
  - Large Language Models

permalink: /ai/review/2025-10-17-Agentic-Entropy-Balanced-Policy-Optimization/

toc: true
toc_sticky: true

date: 2025-10-17 13:09:57+0900
last_modified_at: 2025-10-17 13:09:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.14545)

**저자:** Guanting Dong, Licheng Bao, Zhongyuan Wang, Kangzhi Zhao, Xiaoxi Li, Jiajie Jin, Jinghan Yang, Hangyu Mao, Fuzheng Zhang, Kun Gai, Guorui Zhou, Yutao Zhu, Ji-Rong Wen, Zhicheng Dou



## 핵심 연구 목표
본 논문은 Agentic Reinforcement Learning(RL)에서 멀티턴, 장기적 도구 사용 능력 학습 시 발생하는 엔트로피 관련 문제, 특히 롤아웃 단계의 **과도한 분기(High-entropy Rollout Collapse)**와 정책 업데이트 단계의 **기울기 소실(High-entropy Token Gradient Clipping)**을 해결하여 안정적이고 확장 가능한 웹 에이전트 훈련을 목표로 합니다.

## 핵심 방법론
저자들은 **Agentic Entropy-Balanced Policy Optimization (AEPO)** 알고리즘을 제안합니다. 이는 엔트로피 사전 모니터링을 통해 샘플링 예산을 동적으로 할당하고 연속적인 고엔트로피 도구 호출에 **분기 페널티**를 부과하는 **Dynamic Entropy-Balanced Rollout Mechanism**과, 고엔트로피 토큰 기울기 보존을 위해 클리핑 항에 **stop-gradient 연산**을 삽입하고 **엔트로피 인식 이점 추정(entropy-aware advantage estimation)**을 통합하는 **Entropy-Balanced Policy Optimization**으로 구성됩니다.

## 주요 결과
AEPO는 **14개 데이터셋**에 걸쳐 **7가지 주류 RL 알고리즘**보다 지속적으로 우수한 성능을 보였습니다. 특히, **단 1K RL 샘플**만으로 **Qwen3-14B 모델**이 **GAIA에서 47.6% (Pass@1) 및 65.0% (Pass@5)**, **Humanity's Last Exam에서 11.2% (Pass@1) 및 26.0% (Pass@5)**, **WebWalkerQA에서 43.0% (Pass@1) 및 70.0% (Pass@5)**의 높은 성공률을 달성했습니다. 이는 롤아웃 샘플링 다양성을 개선하고 훈련 전반에 걸쳐 안정적인 정책 엔트로피를 유지합니다.

## AI 실무자를 위한 시사점
본 연구는 **LLM 기반 웹 에이전트** 훈련의 효율성과 안정성을 크게 향상시킬 수 있는 **엔트로피 균형 최적화 기법**의 중요성을 강조합니다. **적은 양의 RL 샘플**로도 도구 사용 및 추론 능력을 효과적으로 훈련할 수 있음을 입증하여 실제 환경에서의 **AI 에이전트 개발 비용 절감**에 기여할 수 있습니다. 이는 일반 웹 에이전트 개발을 위한 확장 가능하고 안정적인 훈련 솔루션을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.