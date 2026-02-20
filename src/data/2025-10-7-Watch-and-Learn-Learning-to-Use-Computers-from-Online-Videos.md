---
title: "[논문리뷰] Watch and Learn: Learning to Use Computers from Online Videos"
excerpt: "Oriana Riva이 arXiv에 게시한 'Watch and Learn: Learning to Use Computers from Online Videos' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Computer Use Agents
  - Inverse Dynamics Model
  - UI Trajectories
  - Web Videos
  - In-Context Learning
  - Supervised Fine-Tuning
  - Large Language Models
  - OSWorld Benchmark

permalink: /ai/review/2025-10-7-Watch-and-Learn-Learning-to-Use-Computers-from-Online-Videos/

toc: true
toc_sticky: true

date: 2025-10-07 13:36:57+0900
last_modified_at: 2025-10-07 13:36:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.04673)

**저자:** Oriana Riva, Yu Su, Palash Goyal, Yiwen Song, Chan Hee Song



## 핵심 연구 목표
컴퓨터 사용 에이전트(CUA)가 다양한 애플리케이션에서 복잡한 작업을 수행할 수 있도록 지원하는 것을 목표로 합니다. 특히, 대규모의 고품질 훈련 데이터 부족 문제를 해결하기 위해, 온라인에서 쉽게 구할 수 있는 인간 시연 비디오를 실행 가능한 UI 궤적으로 변환하는 확장 가능한 프레임워크 **Watch & Learn (W&L)** 을 제안합니다.

## 핵심 방법론
W&L은 먼저 **inverse dynamics model (IDM)** 을 훈련시켜 연속된 화면 상태(`Ot`, `Ot+1`)로부터 중간 사용자 행동(`at`)을 예측합니다. 이 IDM은 **약 630k개의 웹 상호작용 및 Mind2Web 데이터** 를 포함하는 대규모 상태-전이 데이터셋으로 훈련되며, **SigLIP-2 vision encoder** 와 **Transformer** 기반의 아키텍처를 사용합니다. 훈련된 IDM은 **Gemini 2.5 Flash** 를 활용한 태스크 인식 비디오 검색 및 필터링을 거쳐 **53,125개의 고품질 궤적** 을 자동으로 레이블링합니다. 이 궤적들은 추론 시 **in-context exemplars** 로 활용되거나, **UI-TARS-1.5** 및 **Qwen 2.5-VL** 과 같은 모델의 **supervised fine-tuning** 을 위한 데이터로 사용됩니다.

## 주요 결과
W&L을 통해 추출된 UI 궤적은 OSWorld 벤치마크에서 CUA 성능을 크게 향상시켰습니다. **In-context learning** 에서는 범용 모델(Gemini 2.5 Flash, OpenAI o3, Claude 4 Sonnet)에서 **최대 +3.0%p** 의 성공률 개선을 보였고, Jedi 에이전트 프레임워크에서는 **+2.2%p** 개선을 달성했습니다. **Supervised fine-tuning** 에서는 UI-TARS-7B 모델이 **+3.8%p** 향상되었으며, Qwen 2.5-VL은 **+11.1%p** (1.9%에서 13.0%로)라는 가장 큰 개선을 보였습니다. W&L의 IDM은 Mind2Web 테스트 세트에서 91.6%의 액션 정확도와 96.4%의 액션 타입 정확도를 기록하며 기존 방법론을 능가했습니다.

## AI 실무자를 위한 시사점
본 연구는 웹 스케일의 인간 시연 비디오가 CUA 발전을 위한 실용적이고 확장 가능한 데이터 소스임을 입증했습니다. **IDM 기반의 자동 레이블링 파이프라인** 은 고품질 UI 궤적을 대규모로 생성하여 수동 어노테이션의 한계를 극복합니다. AI 엔지니어는 이 방법을 통해 얻은 궤적을 **in-context demonstration** 으로 활용하여 **zero-shot 성능을 향상** 시키거나, **supervised fine-tuning** 을 통해 **오픈소스 모델의 강력한 성능 개선** 을 이끌어낼 수 있습니다. 이는 복잡한 UI 태스크를 위한 **강력하고 일반화 가능한 에이전트 개발** 에 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.