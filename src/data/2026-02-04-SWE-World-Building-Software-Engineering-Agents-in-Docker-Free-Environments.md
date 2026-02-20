---
title: "[논문리뷰] SWE-World: Building Software Engineering Agents in Docker-Free Environments"
excerpt: "arXiv에 게시된 'SWE-World: Building Software Engineering Agents in Docker-Free Environments' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Software Engineering Agents
  - LLM
  - Docker-Free
  - Execution Simulation
  - Reinforcement Learning
  - Supervised Fine-tuning
  - World Model

permalink: /ai/review/2026-02-04-SWE-World-Building-Software-Engineering-Agents-in-Docker-Free-Environments/

toc: true
toc_sticky: true

date: 2026-02-04 00:00:00+0900+0900
last_modified_at: 2026-02-04 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.03419)

**저자:** Shuang Sun, Huatong Song, Lisheng Huang, Jinhao Jiang, Ran Le, Zhihao Lv, Zongchao Chen, Yiwen Hu, Wenyang Luo, Wayne Xin Zhao, Yang Song, Hongteng Xu, Tao Zhang, Ji-Rong Wen



## 핵심 연구 목표
소프트웨어 엔지니어링(SWE) 에이전트의 훈련 및 평가가 의존하는 **Docker 기반 물리적 실행 환경** 의 높은 자원 소모와 확장성 한계를 해결하는 것이 목표입니다. 물리적 실행 환경을 **학습된 대규모 언어 모델(LLM) 기반의 서포게이트 환경** 으로 대체하여, Docker 없이도 SWE 에이전트를 효율적으로 훈련하고 확장 가능한 평가를 가능하게 하는 프레임워크인 **SWE-World** 를 제안합니다.

## 핵심 방법론
**SWE-World** 는 에이전트의 작업을 파일 시스템 작업(가벼운 **Sandbox** 에서 처리)과 코드 실행 작업으로 나눕니다. 코드 실행은 **LLM 기반 SWE-World Transition Model (SWT)** 이 실제 실행 피드백을 예측하여 시뮬레이션하고, 최종 패치 평가는 **LLM 기반 SWE-World Reward Model (SWR)** 이 가상 테스트 러너 역할을 하여 테스트 보고서와 이진 보상을 생성합니다. SWT와 SWR은 실제 에이전트-환경 상호작용 데이터로 **SFT** 훈련되었으며, **Chain-of-Thought (CoT) 증류** 를 통해 추론 능력을 강화했습니다.

## 주요 결과
**SWE-bench Verified** 벤치마크에서 **Qwen2.5-Coder-32B** 모델은 Docker-free SFT를 통해 기본 **6.2%** 에서 **52.0%** 의 해결률로 크게 향상되었습니다. 추가적인 Docker-free RL 최적화를 통해 **55.0%** 에 도달했으며, **SWR 기반 Test-Time Scaling (TTS@8)** 을 적용하여 해결률이 **68.2%** 까지 상승하여 기존 최고 성능을 뛰어넘었습니다. 특히, SWR은 Docker 결과 대비 **0.770** 의 정확도를 보이며 강력한 보상 시뮬레이션 능력을 입증했습니다.

## AI 실무자를 위한 시사점
**SWE-World** 는 소프트웨어 개발에서 에이전트의 학습 및 배포 과정에서 **물리적 인프라 의존성** 을 제거할 수 있는 실용적인 방안을 제시합니다. **LLM 기반 시뮬레이션 환경** 은 에이전트 훈련의 **확장성과 비용 효율성** 을 극대화하여, 복잡한 실세계 SWE 태스크에 대한 AI 적용 가능성을 넓힙니다. 또한, **CoT와 Test-Time Scaling** 같은 기법은 시뮬레이션 환경의 신뢰성과 에이전트 성능을 더욱 높이는 데 중요한 역할을 하여, 미래 AI 기반 개발 도구의 발전에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.