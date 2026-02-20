---
title: "[논문리뷰] RoboOmni: Proactive Robot Manipulation in Omni-modal Context"
excerpt: "arXiv에 게시된 'RoboOmni: Proactive Robot Manipulation in Omni-modal Context' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Robotic Manipulation
  - Multimodal LLMs
  - Vision-Language-Action
  - Proactive AI
  - Omni-modal Learning
  - Intent Recognition
  - Contextual Instructions

permalink: /ai/review/2025-10-29-RoboOmni-Proactive-Robot-Manipulation-in-Omni-modal-Context/

toc: true
toc_sticky: true

date: 2025-10-29 13:11:02+0900
last_modified_at: 2025-10-29 13:11:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.23763)

**저자:** Siyin Wang, Jinlan Fu, Feihong Liu, Xinzhe He, Huangxuan Wu, Junhao Shi, Kexin Huang, Zhaoye Fei, Jingjing Gong, Zuxuan Wu, Yugang Jiang, See-Kiong Ng, Tat-Seng Chua, Xipeng Qiu



## 핵심 연구 목표
본 논문은 기존 로봇 조작 모델이 명시적인 지시에 의존하며 실제 환경에서 인간의 의도를 능동적으로 파악하는 데 한계가 있다는 문제를 해결합니다. 음성 대화, 환경 소리, 시각적 단서를 통합하는 `cross-modal contextual instructions`라는 새로운 설정을 도입하여 로봇이 사용자 의도를 능동적으로 추론하고 검증하여 실행하도록 돕는 것을 목표로 합니다.

## 핵심 방법론
제안하는 `RoboOmni`는 **Perceiver-Thinker-Talker-Executor** 구조를 기반으로 하는 **종단 간 옴니모달(omni-modal) LLM** 프레임워크입니다. 이는 **청각적(음성, 환경 소리) 및 시각적 신호** 를 시공간적으로 융합하여 의도를 인식하고, 상호작용을 통해 확인하며, 로봇 동작을 실행합니다. 또한, proactive 의도 인식을 위한 훈련 데이터 부족 문제를 해결하고자 **OmniAction 데이터셋** 을 구축했습니다.

## 주요 결과
시뮬레이션 및 실제 환경 실험에서 `RoboOmni`는 **텍스트 및 ASR 기반 모델** 을 크게 능가하는 성능을 보였습니다. OmniAction-LIBERO 벤치마크에서 **85.6%의 전체 성공률** 을 달성했으며, 이는 가장 강력한 베이스라인(NORA)의 **25.9%** 와 대비됩니다. 또한, **ASR 처리 없이** 직접 오디오를 처리함으로써 **0.49x의 빠른 추론 속도** 와 **88.9%의 향상된 의도 인식 정확도** 를 보여주었습니다.

## AI 실무자를 위한 시사점
본 연구는 로봇이 **다양한 옴니모달 맥락에서 복잡한 인간의 의도를 능동적으로 추론** 하고 상호작용하는 강력한 프레임워크를 제시합니다. 구축된 **OmniAction 데이터셋** 은 더욱 자연스러운 인간-로봇 상호작용이 가능한 차세대 VLA 모델 개발에 중요한 리소스를 제공합니다. 특히, **종단 간 옴니모달 접근 방식** 은 기존 시스템 대비 **우수한 성능과 빠른 추론 속도** 를 달성하여 실시간 로봇 애플리케이션에 매우 실용적인 가치를 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.