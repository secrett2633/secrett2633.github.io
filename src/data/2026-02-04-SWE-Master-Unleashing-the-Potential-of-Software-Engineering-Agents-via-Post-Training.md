---
title: "[논문리뷰] SWE-Master: Unleashing the Potential of Software Engineering Agents via Post-Training"
excerpt: "arXiv에 게시된 'SWE-Master: Unleashing the Potential of Software Engineering Agents via Post-Training' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Software Engineering Agents
  - Post-Training
  - Supervised Fine-Tuning
  - Reinforcement Learning
  - Language Server Protocol
  - SWE-bench
  - Code Navigation
  - LLM

permalink: /ai/review/2026-02-04-SWE-Master-Unleashing-the-Potential-of-Software-Engineering-Agents-via-Post-Training/

toc: true
toc_sticky: true

date: 2026-02-04 00:00:00+0900+0900
last_modified_at: 2026-02-04 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.03411)

**저자:** Huatong Song, Lisheng Huang, Shuang Sun, Jinhao Jiang, Ran Le, Daixuan Cheng, Guoxin Chen, Yiwen Hu, Zongchao Chen, Wayne Xin Zhao, Yang Song, Tao Zhang, Ji-Rong Wen



## 핵심 연구 목표
이 논문은 기존 LLM 기반 소프트웨어 엔지니어링 에이전트의 불투명성과 재현성 부족, 그리고 복잡한 장기 SWE 태스크 해결 능력의 한계를 해결하고자 합니다. 오픈 소스이며 완전하게 재현 가능한 **SWE-Master** 프레임워크를 제시하여, 데이터 구축, 최적화 전략 및 추론 동작의 상호작용을 통해 효과적인 에이전트 개발 파이프라인을 체계적으로 탐색하고 성능을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
**SWE-Master** 는 오픈 소스 기반 모델에서 시작하여 **교사 궤적 합성 및 데이터 큐레이션** , **장기 SFT (Supervised Fine-Tuning)** , **실제 실행 피드백을 활용한 RL (Reinforcement Learning)** , 그리고 **추론 프레임워크 설계** 를 포함하는 포스트 트레이닝 파이프라인을 제공합니다. 특히 **LSP (Language Server Protocol) 기반 코드 내비게이션 도구** 를 통합하여 에이전트의 코드 이해 능력과 효율성을 향상시키고, **테스트 타임 스케일링 (TTS)** 전략을 통해 다중 후보 솔루션을 생성하고 평가하여 최종 성능을 극대화합니다.

## 주요 결과
**SWE-Master** 는 **SWE-bench Verified** 벤치마크에서 **Qwen2.5-Coder-32B** 모델을 기반으로 **61.4%** 의 해결률을 달성하여 기존 오픈 소스 베이스라인을 크게 능가했습니다. **LLM 기반 환경 피드백을 활용한 TTS@8** 을 추가로 적용했을 때는 해결률이 **70.8%** 까지 향상되었으며, **Pass@8** 기준으로는 **76.2%** 의 강력한 잠재적 성능을 시연했습니다. 또한, **LSP 도구 통합** 은 모델의 평균 상호작용 턴 수와 토큰 소비량을 크게 줄이면서도 성능을 유지하여 효율성을 입증했습니다.

## AI 실무자를 위한 시사점
**SWE-Master** 는 소프트웨어 엔지니어링 에이전트의 개발을 위한 투명하고 재현 가능한 오픈 소스 프레임워크를 제공하여 실무자들이 복잡한 SWE 태스크를 자동화하는 데 활용할 수 있는 강력한 기반을 마련합니다. **SFT와 RL의 체계적인 적용** 및 **LSP 기반 코드 내비게이션 도구** 의 통합은 에이전트의 실제 환경 적응력과 문제 해결 효율성을 극대화할 수 있음을 보여주며, 이는 실제 AI 개발 및 운영(MLOps) 환경에서 에이전트의 실용적 가치를 높이는 데 중요한 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.