---
title: "[논문리뷰] Demo-ICL: In-Context Learning for Procedural Video Knowledge Acquisition"
excerpt: "이 [arXiv]에 게시한 'Demo-ICL: In-Context Learning for Procedural Video Knowledge Acquisition' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Understanding
  - In-Context Learning
  - Procedural Knowledge
  - Multimodal LLMs
  - Benchmark
  - Direct Preference Optimization
  - Demonstration Selection

permalink: /ai/review/2026-02-10-Demo-ICL-In-Context-Learning-for-Procedural-Video-Knowledge-Acquisition/

toc: true
toc_sticky: true

date: 2026-02-10 00:00:00+0900+0900
last_modified_at: 2026-02-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.08439)

**저자:** Yuhao Dong, Shulin Tian, Shuai Liu, Shuangrui Ding, Yuhang Zang, Xiaoyi Dong, Yuhang Cao, Jiaqi Wang, Ziwei Liu



## 핵심 연구 목표
본 논문은 기존 MLLM(Multimodal Large Language Models)이 정적이고 내부적인 지식에 의존하여 비디오를 이해하는 한계를 극복하고, 동적이고 새로운 컨텍스트에서 시연(demonstration)을 통해 학습하고 적응하는 능력을 평가하는 새로운 태스크인 **Demo-driven Video In-Context Learning** 을 제안합니다. 이는 인간의 학습 방식에 가까운 절차적 비디오 지식 습득 능력을 평가하는 것을 목표로 합니다.

## 핵심 방법론
연구진은 세 가지 하위 설정을 포함하는 새로운 태스크를 정의하고, 1,200개의 교육용 YouTube 비디오로 구성된 벤치마크 **Demo-ICL-Bench** 를 구축했습니다. 제안된 **Demo-ICL** 모델은 **비디오 감독 미세 조정(video-supervised fine-tuning)** 과 **정보 지원 DPO(information-assisted Direct Preference Optimization)** 라는 **두 단계 훈련 전략** 을 통해 모델이 컨텍스트 내 예시로부터 학습하는 능력을 강화합니다. 특히 **Qwen2.5-72B** LLM을 활용하여 텍스트 및 비디오 시연을 생성하고 정제합니다.

## 주요 결과
**Demo-ICL-Bench** 는 기존 MLLM에 매우 어려운 벤치마크임이 확인되었으며, **Gemini-2.5-Pro** 는 텍스트 시연에서 **46.6%** , 비디오 시연에서 **32.0%** 의 정확도를 보였습니다. 반면, **Demo-ICL** 모델은 텍스트 데모 ICL에서 **43.4%** , 비디오 데모 ICL에서 **32.0%** , 시연 선택에서 **24.0%** 의 정확도를 달성하며 유사한 규모의 SOTA MLLM들을 능가하는 성능을 보였습니다. 또한, **Demo-ICL** 은 **VideoMMMU** 및 **VideoMME** 와 같은 일반 비디오 이해 벤치마크에서도 경쟁력 있는 성능을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 비디오 이해 분야에서 **in-context learning** 의 중요성과 실제 환경 시나리오에 적용될 수 있는 **시연 기반 학습** 의 잠재력을 강조합니다. **Demo-ICL** 의 **두 단계 훈련 전략** 과 **정보 지원 DPO** 는 모델이 동적인 컨텍스트 정보를 활용하여 지식을 습득하고 일반화하는 능력을 향상시키는 데 효과적임을 보여줍니다. 이는 로봇 공학 등 새로운 태스크에 적응하는 AI 시스템 개발에 중요한 통찰력을 제공하며, 향후 비디오 ICL 연구의 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.