---
title: "[논문리뷰] Towards Interactive Intelligence for Digital Humans"
excerpt: "Yifei Huang이 [arXiv]에 게시한 'Towards Interactive Intelligence for Digital Humans' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Digital Human
  - Interactive Intelligence
  - Multimodal Interaction
  - LLM Agent
  - Real-time Animation
  - Persona Fidelity
  - Diffusion Models

permalink: /ai/review/2025-12-16-Towards-Interactive-Intelligence-for-Digital-Humans/

toc: true
toc_sticky: true

date: 2025-12-16 00:00:00+0900+0900
last_modified_at: 2025-12-16 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.13674)

**저자:** Yifei Huang, Sitong Gong, Xiwei Gao, Xuangeng Chu, Yiyi Cai



## 핵심 연구 목표
본 논문은 기존의 모방적인 디지털 휴먼이 가지는 상호작용 논리 및 자율성 부족 문제를 해결하고, **개성-정렬 표현, 적응적 상호작용, 자가 진화 능력** 을 갖춘 **'상호작용 지능(Interactive Intelligence)'** 을 구현하는 것을 목표로 합니다. 이는 디지털 휴먼을 수동적인 재생 시스템에서 유의미한 멀티모달 상호작용이 가능한 **구현된 에이전트** 로 전환하고자 합니다.

## 핵심 방법론
이러한 목표를 달성하기 위해, **Mio (Multimodal Interactive Omni-Avatar)** 라는 **종단 간 프레임워크** 를 제안하며, **Thinker, Talker, Face Animator, Body Animator, Renderer** 의 다섯 가지 전문화된 모듈로 구성됩니다. **Thinker** 는 계층적 메모리와 지식 그래프를 통해 일관된 서사를 유지하며, **Talker** 는 **Kodama-Tokenizer** 와 **Kodama-TTS** 를 사용하여 실시간으로 고품질 음성을 생성합니다. **Face Animator** 는 **UniLS** 를 통해 청취 및 발화 행동을 통합적으로 모델링하며, **Body Animator** 는 **FloodDiffusion** 으로 실시간 물리적으로 타당한 신체 움직임을 만듭니다. 마지막으로 **Renderer** 는 **AvatarDiT** 를 사용하여 멀티뷰 일관성을 유지하며 시각적 아바타를 합성합니다.

## 주요 결과
**Thinker** 모듈은 **GPT-40** 대비 **평균 CharacterBox 점수 4.221점** 을 달성하며 뛰어난 페르소나 충실도를 보였고, **Timeline-coherence Test** 에서 **90.8%** 의 정확도를 기록했습니다. **Body Animator** 는 **HumanML3D** 에서 **FID 0.057** 의 최신 성능을 달성했으며, **BABEL** 데이터셋에서 **Peak Jerk 0.713** 으로 가장 낮은 지터와 높은 부드러움을 보였습니다. 최종적으로, **Mio** 는 **Interactive Intelligence Score (IIS)** 에서 **76.0점** 을 기록하며 기존 최고 성능 대비 **+8.4점** 향상을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 디지털 휴먼이 단순한 시각적 모방을 넘어 **인지적 추론과 실시간 애니메이션** 을 결합하여 지능적인 상호작용을 할 수 있음을 보여줍니다. **모듈형 설계** 는 각 구성 요소를 독립적으로 개선하고 확장할 수 있는 유연성을 제공하며, **데이터 프리 자기 훈련** 방식은 수동 주석 없이 페르소나 정렬을 가능하게 하여 개발 비용을 절감할 수 있습니다. 이는 가상 동반자, 인터랙티브 스토리텔링, 몰입형 게임 등 **차세대 AI 애플리케이션 개발** 에 중요한 기반을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.