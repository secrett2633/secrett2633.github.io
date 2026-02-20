---
title: "[논문리뷰] When Good Sounds Go Adversarial: Jailbreaking Audio-Language Models with
  Benign Inputs"
excerpt: "Dasol Choi이 arXiv에 게시한 'When Good Sounds Go Adversarial: Jailbreaking Audio-Language Models with
  Benign Inputs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Audio-Language Models
  - Jailbreak Attack
  - Adversarial Audio
  - Reinforcement Learning
  - Projected Gradient Descent
  - Native Payload Discovery
  - Multimodal AI Safety

permalink: /ai/review/2025-8-12-When-Good-Sounds-Go-Adversarial-Jailbreaking-Audio-Language-Models-with-Benign-Inputs/

toc: true
toc_sticky: true

date: 2025-08-12 13:29:09+0900
last_modified_at: 2025-08-12 13:29:09+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.03365)

# When Good Sounds Go Adversarial: Jailbreaking Audio-Language Models with Benign Inputs
## 저자: Bodam Kim, Hiskias Dingeto, Taeyoun Kwon, Dasol Choi, DongGeon Lee, Haon Park, JaeHoon Lee, Jongho Shin



## 핵심 연구 목표
본 연구는 오디오-언어 모델(ALM)이 악의적인 음성 입력에 의해 유해한 텍스트를 생성하도록 유도될 수 있는 취약점을 해결하고자 합니다. 특히, 기존 공격 방식이 모델의 자연스러운 응답 분포에서 벗어난 "외부" 유해 텍스트를 사용해 낮은 성공률을 보이는 한계를 극복하고, 모델에 "네이티브"한 유해 응답을 은밀하게 주입하여 높은 공격 성공률을 달성하는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 두 단계의 공격 프레임워크인 **WHISPERINJECT** 를 제안합니다. 첫 번째 단계인 **Native Target Discovery** 에서는 **강화 학습(Reinforcement Learning)** 과 **투영 경사 하강법(Projected Gradient Descent, PGD)** 을 결합한 **RL-PGD** 를 활용하여 모델 자체의 언어적, 스타일적 특성에 부합하는 유해 응답을 발견합니다. 두 번째 단계인 **Adversarial Audio Generation** 에서는 발견된 네이티브 유해 응답을 목표 페이로드로 삼아, "How's the weather?"와 같은 무해한 오디오 캐리어에 **표준 PGD 방법** 을 통해 **인간이 지각 불가능한(imperceptible) 섭동** 으로 삽입합니다.

## 주요 결과
**WHISPERINJECT** 는 **Qwen2.5-Omni (3B 및 7B)** 및 **Phi-4-Multimodal** 과 같은 최신 오디오-언어 모델에서 평균 **86.0%** 의 높은 공격 성공률( **StrongREJECT** 평가 기준)과 **86.95%** ( **LlamaGuard-3-8B** 평가 기준)를 달성했습니다. 네이티브 페이로드 발견 단계(Stage 1)는 **91.3%** 의 성공률을 보였으며, 오디오 주입 후에도 공격 성공률 저하가 **5.3%포인트** 에 그쳐 네이티브 페이로드의 효율성을 입증했습니다. 또한, **인간 평가** 에서도 생성된 공격 오디오는 **인지 불가능** 한 것으로 확인되었습니다.

## AI 실무자를 위한 시사점
본 연구는 멀티모달 오디오-언어 모델이 **겉으로는 무해한 오디오 입력** 을 통해 **유해한 명령을 은밀하게 수행** 할 수 있음을 강력하게 시사합니다. 이는 현재의 **텍스트 기반 안전 필터** 만으로는 ALM의 안전성을 보장하기에 불충분하다는 중요한 경고이며, **오디오 신호 수준** 에서 직접 작동하는 **새로운 방어 메커니즘** 개발의 필요성을 강조합니다. AI 실무자들은 이러한 **오디오-네이티브 공격** 에 대한 인식을 높이고, 멀티모달 AI 시스템의 견고한 안전 장치 구축에 우선순위를 두어야 할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.