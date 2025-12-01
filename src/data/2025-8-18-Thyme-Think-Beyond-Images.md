---
title: "[논문리뷰] Thyme: Think Beyond Images"
excerpt: "Wei Chen이 [arXiv]에 게시한 'Thyme: Think Beyond Images' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLMs
  - Code Generation
  - Image Processing
  - Reinforcement Learning
  - Supervised Fine-Tuning
  - Visual Reasoning
  - Sandbox

permalink: /ai/review/2025-8-18-Thyme-Think-Beyond-Images/

toc: true
toc_sticky: true

date: 2025-08-18 13:14:38+0900
last_modified_at: 2025-08-18 13:14:38+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.11630)

**저자:** Wei Chen, Chaoyou Fu, Shukang Yin, Xingyu Lu, Yi-Fan Zhang



## 핵심 연구 목표
본 논문은 기존의 "이미지로 생각하기" 방식의 **멀티모달 대규모 언어 모델(MLLM)** 이 가진 이미지 조작 기능의 제한성과 논리적 추론 능력의 한계를 극복하는 것을 목표로 합니다. 특히, OpenAI의 O3와 같은 독점 모델에 필적하는 **다양한 이미지 조작 및 수학적 계산 기능을 자율적으로 수행** 할 수 있도록 **실행 가능한 코드를 생성** 하여 복잡한 시각적 추론을 강화하는 새로운 패러다임을 제안합니다.

## 핵심 방법론
제안하는 'Thyme(Think Beyond Images)' 프레임워크는 **두 단계 학습 전략** 을 사용합니다. 먼저 **Supervised Fine-Tuning (SFT)** 단계에서 **50만 개** 의 선별된 데이터셋을 통해 이미지 자르기, 회전, 대비 조절 등 다양한 이미지 조작 및 연산 코드 생성 능력을 학습합니다. 이어서 **강화 학습(RL)** 단계에서는 **GRPO with Adaptive Temperature Sampling (GRPO-ATS)** 알고리즘을 도입하여, 텍스트 생성에는 탐색을 위한 **온도 1.0** , 코드 생성에는 정확성을 위한 **온도 0.0** 을 적용해 결정론적이고 유효한 코드 생성을 유도합니다. 생성된 코드는 **보안 샌드박스 환경** 에서 실행되어 피드백을 제공합니다.

## 주요 결과
Thyme은 지각, 추론, 일반 작업에 걸쳐 **거의 20개 벤치마크** 에서 기준선 대비 **상당하고 일관된 성능 향상** 을 달성했습니다. 특히 **HRbench-4K FSP** 에서 **91.0%** , **MME-Real Overall** 에서 **64.8%** , **MathVista Mini** 에서 **70.0%** , **LogicVista Overall** 에서 **49.0%** 를 기록하며 우수한 성능을 보였습니다. SFT 단계는 **200 GPU 시간** 만으로 핵심 기능을 활성화했으며, 강화 학습 시 **일관성 보상(Consistency Reward)** 설계가 성능 향상에 기여했음을 확인했습니다.

## AI 실무자를 위한 시사점
본 연구는 MLLM이 정적인 이미지 입력에 그치지 않고, **코드를 통해 이미지를 능동적으로 조작하고 복잡한 계산을 수행** 하는 새로운 방향을 제시합니다. **효율적인 두 단계 학습 접근 방식** 과 **적응형 온도 샘플링 기법** 은 코드 생성 모델의 실용성을 높이는 중요한 기여를 합니다. 공개된 데이터셋, 샌드박스, 코드는 고급 시각적 추론 및 도구 사용 능력을 갖춘 MLLM 연구 및 개발에 실질적인 기반을 제공하지만, 기존 벤치마크의 한계로 인해 특정 이미지 조작 기능에 대한 평가가 여전히 불완전하다는 점은 향후 개선 과제입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.