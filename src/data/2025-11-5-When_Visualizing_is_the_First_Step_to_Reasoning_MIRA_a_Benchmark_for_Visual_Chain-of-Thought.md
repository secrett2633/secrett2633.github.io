---
title: "[논문리뷰] When Visualizing is the First Step to Reasoning: MIRA, a Benchmark for
  Visual Chain-of-Thought"
excerpt: "이 [arXiv]에 게시한 'When Visualizing is the First Step to Reasoning: MIRA, a Benchmark for
  Visual Chain-of-Thought' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal AI
  - Visual Reasoning
  - Chain-of-Thought (CoT)
  - Benchmark
  - Image Generation
  - MLLMs
  - Visual-CoT

permalink: /ai/review/2025-11-5-When_Visualizing_is_the_First_Step_to_Reasoning_MIRA_a_Benchmark_for_Visual_Chain-of-Thought/

toc: true
toc_sticky: true

date: 2025-11-09 19:35:02+0900
last_modified_at: 2025-11-09 19:35:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.02779)

**저자:** Yiyang Zhou, Haoqin Tu, Zijun Wang, Zeyu Wang, Niklas Muennighoff, Fan Nie, Yejin Choi, James Zou, Chaorui Deng, Shen Yan, Haoqi Fan, Cihang Xie, Huaxiu Yao, Qinghao Ye



## 핵심 연구 목표
본 논문은 중간 시각 이미지를 생성하는 것이 성공적인 추론에 필수적인 시나리오에서 모델을 평가하기 위한 새로운 벤치마크인 **MIRA (Multimodal Imagination for Reasoning Assessment)**를 제안합니다. 이는 텍스트에만 의존하는 기존 **Chain-of-Thought (CoT) 방법론**의 한계를 극복하고, 인간이 "그리면서 생각하는" 방식처럼 시각적 상상력이 필요한 복잡한 문제를 AI 모델이 해결할 수 있는지 평가하는 것을 목표로 합니다.

## 핵심 방법론
**MIRA 벤치마크**는 복잡한 구조, 공간 관계, 언어로 표현하기 어려운 추론 단계를 포함하는 546개의 멀티모달 문제로 구성됩니다. 이 문제들은 수동으로 주석 처리된 중간 시각 이미지와 최종 답변을 포함합니다. 평가 프로토콜은 세 가지 수준으로 나뉘는데, **Direct Evaluation**, **Text-only CoT**, 그리고 주석 처리된 시각적 단서를 제공하는 **Simulated Visual-CoT Reasoning**이 그것입니다. 또한, 모델의 상한 능력을 탐색하기 위해 **pass@k** 및 **majority voting** 정확도가 보고됩니다.

## 주요 결과
기존의 **멀티모달 대규모 언어 모델(MLLMs)**, 특히 **GPT-5**는 직접 입력 시 평균 **16.5%**의 정확도를 보였으며, **Text-CoT**에만 의존할 경우 성능이 저조했습니다. 그러나 중간 시각적 단서가 제공되는 **Visual-CoT** 설정에서는 모든 모델에서 일관되게 성능이 향상되어 평균 **33.7%**의 상대적 이득을 보였습니다. 특히 **GPT-5-mini**는 **13.7%에서 23.2%**로, 물리(Physics) 관련 작업은 **20.7%에서 40.0%**로 크게 향상되었습니다.

## AI 실무자를 위한 시사점
**MIRA 벤치마크**는 현재 **MLLMs**가 복잡한 시각적 추론 문제에서 "그리면서 생각하는" 능력이 부족하다는 점을 명확히 보여줍니다. **Visual-CoT**가 상당한 성능 향상을 가져온다는 결과는 미래의 **MLLMs**가 고품질의 중간 시각 상태를 생성하고 이를 언어 기반 추론과 긴밀하게 결합하는 **통합 멀티모달 패러다임**으로 발전해야 함을 시사합니다. 또한, 오픈 소스 모델과 비공개 모델 간의 성능 격차는 **훈련 패러다임** 및 **데이터셋** 개선의 필요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.