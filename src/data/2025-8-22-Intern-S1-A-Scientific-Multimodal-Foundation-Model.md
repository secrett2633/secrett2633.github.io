---
title: "[논문리뷰] Intern-S1: A Scientific Multimodal Foundation Model"
excerpt: "xuhuang87이 [arXiv]에 게시한 'Intern-S1: A Scientific Multimodal Foundation Model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Foundation Model
  - Scientific AI
  - Reinforcement Learning
  - Mixture-of-Experts (MoE)
  - Dynamic Tokenizer
  - Data Curation
  - Low-Resource Learning

permalink: /ai/review/2025-8-22-Intern-S1-A-Scientific-Multimodal-Foundation-Model/

toc: true
toc_sticky: true

date: 2025-08-22 13:10:52+0900
last_modified_at: 2025-08-22 13:10:52+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.15763)

**저자:** xuhuang87, ZhouqiHUA, Jerry-hyl, guox18, gaoyang07



## 핵심 연구 목표
본 논문은 과학 분야에서 오픈 소스 파운데이션 모델과 클로즈드 소스 모델 간의 성능 격차를 줄이고자 합니다. 특히, 일반 파운데이션 모델의 발전이 더딘 **저자원 과학 전문 분야** 에서 **멀티모달 대규모 추론 모델(multimodal large reasoning model)** 을 개발하여 과학적 발견을 가속화하는 것을 목표로 합니다.

## 핵심 방법론
**Intern-S1** 은 **280억 개의 활성화된 파라미터** 와 **2,410억 개의 전체 파라미터** 를 가진 **멀티모달 MoE(Mixture-of-Experts) 모델** 입니다. 과학 분야에서 **2.5T 토큰** 을 포함한 **5T 토큰** 으로 지속적인 사전 훈련을 수행했으며, 이미지, 텍스트, 비정형 시각 데이터, 분자 구조, 시계열 신호와 같은 과학적 멀티모달 데이터를 처리할 수 있습니다. 특히, 과학 데이터를 위한 **동적 토크나이저(dynamic tokenizer)** 와 **MoR(Mixture-of-Reward)** 프레임워크 기반의 **온라인 강화 학습(RL)** 을 통해 1,000개 이상의 태스크를 동시에 학습합니다.

## 주요 결과
Intern-S1은 일반 추론 태스크에서 오픈 소스 모델 중 최고의 성능을 보였으며, 과학 도메인에서는 클로즈드 소스 최첨단 모델을 능가합니다. 특히 **SMILES 형식 데이터** 에서 **동적 토크나이저** 가 기존 토크나이저 대비 **70% 이상 높은 압축률** 을 달성했으며, **강화 학습 훈련 시간을 10배 단축** 했습니다. 구체적으로 **ChemBench 83.4** , **MatBench 75.0** , **MSEarthMCQ 65.7** 등의 높은 점수를 기록했습니다.

## AI 실무자를 위한 시사점
Intern-S1은 저자원 과학 도메인에서 파운데이션 모델의 활용 가능성을 크게 확장하여 과학 연구 및 애플리케이션을 가속화할 수 있는 잠재력을 보여주었습니다. 특히, **동적 토크나이저** 와 **MoR 프레임워크** 는 복잡하고 이질적인 과학 데이터를 효과적으로 처리하고 대규모 RL 훈련을 효율화하는 데 중요한 방법론적 통찰을 제공합니다. 이는 도메인 특화 AI 모델 개발 및 AGI(인공 일반 지능) 연구에 중요한 기여를 할 것으로 기대됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.