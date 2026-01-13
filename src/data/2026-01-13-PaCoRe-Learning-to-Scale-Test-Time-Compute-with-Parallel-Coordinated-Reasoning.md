---
title: "[논문리뷰] PaCoRe: Learning to Scale Test-Time Compute with Parallel Coordinated Reasoning"
excerpt: "이 [arXiv]에 게시한 'PaCoRe: Learning to Scale Test-Time Compute with Parallel Coordinated Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - PaCoRe
  - Test-Time Compute Scaling
  - LLMs
  - Parallel Reasoning
  - Reinforcement Learning
  - Reasoning Synthesis
  - Message Passing
  - Mathematical Reasoning

permalink: /ai/review/2026-01-13-PaCoRe-Learning-to-Scale-Test-Time-Compute-with-Parallel-Coordinated-Reasoning/

toc: true
toc_sticky: true

date: 2026-01-13 00:00:00+0900+0900
last_modified_at: 2026-01-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.05593)

**저자:** Jingcheng Hu, Yinmin Zhang, Shijie Shang, Xiaobo Yang, Yue Peng, Zhewei Huang, Hebin Zhou, Xin Wu, Jie Cheng, Fanqi Wan, Xiangwen Kong, Chengyuan Yao, Kaiwen Yan, Ailin Huang, Hongyu Zhou, Qi Han, Zheng Ge, Daxin Jiang, Xiangyu Zhang, Heung-Yeung Shum



## 핵심 연구 목표
본 논문은 현대 언어 모델(LLM)이 고정된 컨텍스트 창 내에서 순차적 추론에 의존하여 **테스트 시간 연산(Test-Time Compute, TTC)** 을 대규모로 확장할 수 없다는 근본적인 한계를 해결하는 것을 목표로 합니다. PaCoRe는 이러한 컨텍스트 제약을 극복하고 효과적인 TTC를 다량으로 확장하기 위한 프레임워크를 제안합니다.

## 핵심 방법론
PaCoRe는 **메시지 전달 아키텍처** 를 통해 대규모 병렬 탐색을 여러 라운드에 걸쳐 조정하는 새로운 추론 패러다임을 도입합니다. 각 라운드는 여러 병렬 추론 궤적을 시작하고, 그 결과를 컨텍스트가 제한된 메시지로 압축하며, 이 메시지들을 통합하여 다음 라운드를 안내합니다. 이 모델은 **대규모 결과 기반 강화 학습(outcome-based reinforcement learning)** 을 통해 **추론 합성(Reasoning Synthesis)** 능력을 마스터하여 학습되었습니다.

## 주요 결과
PaCoRe는 다양한 도메인에서 강력한 성능 향상을 보였으며, 특히 수학 분야에서 두드러집니다. **HMMT 2025 벤치마크** 에서 **PaCoRe-8B 모델** 은 **94.5%** 의 정확도를 달성하여 **GPT-5의 93.2%** 를 능가했습니다. 이는 효과적인 TTC를 약 **2백만 토큰** 으로 확장하여 달성되었으며, **LiveCodeBench** 에서도 **RLVR-8B 모델** 이 실패한 TTC 스케일링을 통해 상당한 이득을 보였습니다.

## AI 실무자를 위한 시사점
PaCoRe는 AI 실무자들에게 LLM의 **컨텍스트 창 한계를 넘어선 복잡한 추론 문제 해결** 을 위한 실용적인 프레임워크를 제공합니다. **병렬 탐색과 메시지 압축** 을 통한 TTC 스케일링 방식은 대규모 연산이 필요한 태스크에서 효율성을 크게 높일 수 있습니다. 공개된 모델 체크포인트, 훈련 데이터 및 추론 파이프라인은 고성능 추론 시스템 개발 및 관련 연구를 가속화하는 데 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.