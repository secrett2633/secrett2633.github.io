---
title: "[논문리뷰] OmniLottie: Generating Vector Animations via Parameterized Lottie Tokens"
excerpt: "arXiv에 게시된 'OmniLottie: Generating Vector Animations via Parameterized Lottie Tokens' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vector Animation Generation
  - Lottie
  - Multimodal Instructions
  - Tokenizer
  - Vision-Language Models
  - Generative AI
  - Dataset

permalink: /ai/review/2026-03-03-OmniLottie-Generating-Vector-Animations-via-Parameterized-Lottie-Tokens/

toc: true
toc_sticky: true

date: 2026-03-03 00:00:00+0900+0900
last_modified_at: 2026-03-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.02138)

**저자:** Yiying Yang, Wei Cheng, Sijin Chen, Honghao Fu, Xianfang Zeng, Yujun Cai, Gang Yu, Xingjun Ma



## 핵심 연구 목표
이 논문은 편집 용이성, 플랫폼 호환성, 해상도 독립성이 부족한 기존 래스터 비디오 애니메이션 생성 방식의 한계를 극복하고자 합니다. 특히, Lottie JSON 파일의 복잡하고 비효율적인 구조로 인해 벡터 애니메이션 생성 학습에 어려움이 있어, 멀티모달 지침을 통해 고품질의 Lottie 벡터 애니메이션을 생성하는 범용 프레임워크인 **OmniLottie** 를 개발하는 것을 목표로 합니다.

## 핵심 방법론
**OmniLottie** 는 **미리 훈련된 Vision-Language Models (VLMs)** , 특히 **Qwen2.5-VL** 을 기반으로 합니다. 핵심적으로, 복잡하고 방대한 Lottie JSON 파일을 **명령어 및 매개변수** 의 간결한 시퀀스로 변환하는 **Lottie 토크나이저** 를 제안합니다. 또한, 멀티모달 벡터 애니메이션 생성을 위한 **MMLottie-2M** 이라는 **2백만 개 규모의 대규모 데이터셋** 을 구축하여 모델 훈련 및 평가에 활용합니다.

## 주요 결과
**OmniLottie** 는 Text-to-Lottie 태스크에서 **88.3%** 의 성공률을 달성하며, **Recraft(77.3%)** 및 **GPT-5(12.7%)** 와 같은 강력한 기준 모델들을 크게 능가했습니다. 특히 **FVD (202.14)** 및 **Motion Alignment (5.94)** 지표에서 최고의 성능을 보였습니다. **Lottie 토크나이저** 는 원본 JSON 대비 시퀀스 길이를 **81%** 단축하여 **5.3배의 압축률** 을 달성했으며, 성공적인 애니메이션 생성에 **평균 28.57초** 가 소요되어 기존 최적화 기반 방법론보다 훨씬 효율적입니다.

## AI 실무자를 위한 시사점
이 연구는 **Lottie 벡터 애니메이션을 멀티모달 지침으로 생성** 하는 강력한 방법을 제시하여 AI 기반 디자인 및 크리에이티브 작업 흐름을 혁신할 잠재력을 보여줍니다. **도메인 특화 토크나이저** 설계는 복잡한 데이터 구조를 효율적으로 처리하여 VLM의 성능을 극대화하는 중요한 방법론적 시사점을 제공합니다. 또한, 공개된 **MMLottie-2M 데이터셋** 은 벡터 애니메이션 생성 분야의 연구 발전을 가속화하는 핵심적인 자원이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.