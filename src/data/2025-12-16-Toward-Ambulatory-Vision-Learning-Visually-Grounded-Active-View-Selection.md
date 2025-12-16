---
title: "[논문리뷰] Toward Ambulatory Vision: Learning Visually-Grounded Active View Selection"
excerpt: "이 [arXiv]에 게시한 'Toward Ambulatory Vision: Learning Visually-Grounded Active View Selection' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Active Perception
  - Vision-Language Models (VLMs)
  - Embodied AI
  - View Selection
  - Reinforcement Learning (RL)
  - Supervised Fine-Tuning (SFT)
  - Visual Question Answering (VQA)
  - 3D Environments

permalink: /ai/review/2025-12-16-Toward-Ambulatory-Vision-Learning-Visually-Grounded-Active-View-Selection/

toc: true
toc_sticky: true

date: 2025-12-16 00:00:00+0900+0900
last_modified_at: 2025-12-16 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.13250)

**저자:** Juil Koo, Daehyeon Choi, Sangwoo Youn, Phillip Y. Lee, Minhyuk Sung



## 핵심 연구 목표
본 논문은 정적인 이미지에 국한된 기존 **Vision-Language Models (VLMs)** 의 **Visual Question Answering (VQA)** 한계를 극복하고, **앰뷸러토리 비전** 능력을 갖춘 에이전트가 더 유익한 시점을 능동적으로 선택하도록 학습시키는 것을 목표로 합니다. 이를 위해, 현재 이미지의 시각 정보만을 사용하여 장면 기억이나 외부 지식 없이 최적의 다음 시점을 선택하는 **Visually-Grounded Active View Selection (VG-AVS)** 태스크를 제안합니다.

## 핵심 방법론
**ProcTHOR** 환경에서 자동으로 생성된 **AVS dataset** 을 구축하여 학습 데이터를 마련했습니다. 에이전트의 시점 조정을 위한 행동 공간은 **연속적인 Heading rotation (φh), Forward translation (d), View rotation (φv)** 으로 세밀하게 설계되었습니다. 학습 전략으로는 사전 훈련된 VLM ( **Qwen2.5-VL-7B** )을 **Supervised Fine-Tuning (SFT)** 으로 지상 진실 액션을 학습시킨 후, **Reinforcement Learning (RL)** 을 통해 정책을 최적화하는 **2단계 접근 방식** 을 채택했습니다. RL 단계에서는 예측된 시점을 기반으로 질문에 대한 답변 정확도를 평가하는 **verifiable reward (rver)** 와 올바른 형식의 액션 문자열을 생성하도록 하는 **format reward (rfmt)** 를 활용합니다.

## 주요 결과
제안된 **SFT+RL** 방식은 AVS-ProcTHOR 벤치마크에서 **83.72%** 의 VQA 정확도를 달성하여, 기존 **Qwen2.5-VL-7B** 단독 사용 시의 **50.21%** 를 크게 능가했습니다. 또한, **GPT-5 (72.09%)** 및 **Gemini-2.5-Pro (72.25%)** 와 같은 독점 모델들보다도 우수한 성능을 보였습니다. AVS-HM3D 실제 환경 데이터셋에서도 **70.70%** 의 높은 평균 점수를 기록하며 강력한 일반화 성능을 입증했으며, 기존 **Fine-EQA [21]** 프레임워크에 통합 시 LLM-Match 점수를 평균 **52.94%** 에서 **57.67%** 로 향상시키는 등 downstream 태스크에 대한 유용성을 보여주었습니다.

## AI 실무자를 위한 시사점
이 연구는 VLM이 정적인 시점의 한계를 넘어 **3D 환경에서 능동적인 시점 선택** 을 통해 정보를 탐색하고 질문에 답변하는 새로운 가능성을 제시합니다. **합성 데이터셋과 SFT+RL의 결합 학습 전략** 은 대규모 사전 훈련 모델 없이도 에이전트의 미세한 지각 능력 향상을 가능하게 하여, 복잡한 실제 환경에서의 로봇 공학 및 embodied AI 애플리케이션에 적용될 수 있습니다. 특히, 기존 **EQA (Embodied Question Answering) 시스템** 에 **플러그 앤 플레이 컴포넌트** 로 통합되어 최종 VQA 정확도를 높이는 실용적인 해결책을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.