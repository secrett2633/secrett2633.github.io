---
title: "[논문리뷰] Game-TARS: Pretrained Foundation Models for Scalable Generalist
  Multimodal Game Agents"
excerpt: "이 [arXiv]에 게시한 'Game-TARS: Pretrained Foundation Models for Scalable Generalist
  Multimodal Game Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Generalist AI
  - Game Agents
  - Multimodal Learning
  - Foundation Models
  - ReAct
  - Sparse Thinking
  - Continual Pre-training
  - Human-Native Interaction

permalink: /ai/review/2025-10-29-Game-TARS-Pretrained-Foundation-Models-for-Scalable-Generalist-Multimodal-Game-Agents/

toc: true
toc_sticky: true

date: 2025-10-29 13:11:02+0900
last_modified_at: 2025-10-29 13:11:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.23691)

**저자:** Zihao Wang, Xujing Li, Yining Ye, Junjie Fang, Haoming Wang, Longxiang Liu, Shihao Liang, Junting Lu, Zhiyong Wu, Jiazhan Feng, Wanjun Zhong, Zili Li, Yu Wang, Yu Miao, Bo Zhou, Yuanfan Li, Hao Wang, Zhongkai Zhao, Faming Wu, Zhengxuan Jiang, Weihao Tan, Heyuan Yao, Shi Yan, Xiangyang Li, Yitao Liang, Yujia Qin, Guang Shi



## 핵심 연구 목표
본 논문은 기존 API 또는 GUI 기반 접근 방식의 한계로 인한 확장성 및 일반화 능력 부족 문제를 해결하고자 합니다. 궁극적으로 인간의 키보드-마우스 입력에 기반한 통일된 액션 공간을 사용하여 이질적인 게임 도메인과 컴퓨터 사용 환경에서 광범위한 문제 해결 능력을 갖춘 **확장 가능한 일반주의 멀티모달 게임 에이전트** 를 개발하는 것을 목표로 합니다.

## 핵심 방법론
Game-TARS는 **인간 친화적인 키보드-마우스 입력** 에 고정된 **통일되고 확장 가능한 액션 공간** 을 사용하여 에이전트를 학습시킵니다. **500B 토큰** 이상의 방대한 궤적 및 멀티모달 데이터를 활용한 **지속적인 사전 훈련** 을 수행하며, 핵심 기술로는 인과적 혼란을 줄이기 위한 **감쇠 연속 손실(decaying continual loss)** 과 추론 깊이 및 비용의 균형을 맞추는 효율적인 **Sparse Thinking 전략** 이 포함됩니다. 또한, **자동 액션 공간 증강** , **역동역학 예측** , **멀티모달 프롬프트** 를 통한 문맥 학습, **이중 계층 메모리 아키텍처** 를 활용한 사후 훈련 단계를 거칩니다.

## 주요 결과
Game-TARS는 오픈월드 **Minecraft** 태스크에서 이전 **SOTA 모델 대비 약 2배 높은 성공률** 을 달성했습니다 ( **Game-TARS-MoE-mini** 는 Embodied 태스크에서 **72.0% 성공률** 기록). 또한, 미지의 웹 3D 게임에서 인간과 유사한 일반화 능력을 보였으며, **FPS 벤치마크** 에서 **GPT-5** , **Gemini-2.5-Pro** , **Claude-4-Sonnet** 과 같은 선도 모델들을 능가했습니다 ( **Vizdoom Battle-1** 에서 **18.87 보상** 달성). 스케일링 결과는 통일된 액션 공간이 교차 게임 및 멀티모달 데이터에 맞춰 확장될 때 성능 개선이 지속됨을 확인시켜 줍니다. **Sparse Thinking 전략** 은 평균 토큰 소비량을 **68개에서 37개** 로 줄였습니다.

## AI 실무자를 위한 시사점
Game-TARS는 **인간 친화적인 키보드-마우스 입력** 을 기반으로 한 통일된 액션 공간이 일반주의 AI 에이전트의 확장성과 폭넓은 적용 가능성을 위한 유망한 경로임을 보여줍니다. **감쇠 손실 함수** 와 **Sparse Thinking 전략** 은 대규모 지속 학습 환경에서 에이전트의 추론 효율성과 견고성을 향상시키는 실용적인 기법을 제공합니다. 다양한 **교차 도메인 에이전트 궤적** 과 **멀티모달 데이터** 를 통합하는 방식은 전문화된 태스크를 넘어 고차원적인 인지 기능을 갖춘 AI 시스템을 구축하는 데 중요한 시사점을 줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.