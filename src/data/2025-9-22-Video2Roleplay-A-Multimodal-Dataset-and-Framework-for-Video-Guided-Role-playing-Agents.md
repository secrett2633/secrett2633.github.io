---
title: "[논문리뷰] Video2Roleplay: A Multimodal Dataset and Framework for Video-Guided
  Role-playing Agents"
excerpt: "Chao Zhang이 arXiv에 게시한 'Video2Roleplay: A Multimodal Dataset and Framework for Video-Guided
  Role-playing Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Role-playing Agents (RPAs)
  - Multimodal AI
  - Video Understanding
  - Large Language Models (LLMs)
  - Dataset Creation
  - Dynamic Role Profiles
  - Adaptive Temporal Sampling
  - Fine-tuning

permalink: /ai/review/2025-9-22-Video2Roleplay-A-Multimodal-Dataset-and-Framework-for-Video-Guided-Role-playing-Agents/

toc: true
toc_sticky: true

date: 2025-09-22 13:11:29+0900
last_modified_at: 2025-09-22 13:11:29+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.15233)

**저자:** Xueqiao Zhang, Chao Zhang, Jingtao Xu, Yifan Zhu, Xin Shi, Yi Yang, Yawei Luo



## 핵심 연구 목표
기존 **Role-playing Agents (RPAs)** 가 정적인 역할 프로필에만 의존하여 인간의 동적인 지각 능력을 포착하지 못하는 한계를 극복하는 것입니다. 비디오 모달리티를 **RPAs** 에 통합하여 **동적 역할 프로필** 개념을 도입하고, 이를 통해 더욱 몰입감 있고 표현력 있는 역할극 경험을 제공하고자 합니다.

## 핵심 방법론
본 연구는 60k 비디오와 700k 대화로 구성된 대규모 **다중 모달 데이터셋인 Role-playing-Video60k** 를 구축합니다. 제안된 프레임워크는 입력 비디오 길이에 따라 **적응형 시간 샘플링(adaptive temporal sampling)** 을 통해 비디오 프레임을 추출하여 **동적 역할 프로필** 을 형성하고, 훈련 비디오의 대화 및 입력 비디오 요약에서 추출한 **정적 역할 프로필** 을 결합합니다. 이 정보를 **LLM(Large Language Model)** 에 시간 순서대로 입력하여 캐릭터의 정체성과 서술적 맥락에 일관된 응답을 생성하도록 **지도 미세 조정(supervised fine-tuning)** 합니다.

## 주요 결과
제안된 프레임워크는 기존 **RPAs** 및 일반 **LLM** 대비 모든 평가 지표에서 뛰어난 성능을 보였으며, 특히 **인간 유사성(human-likeness) 지표에서 SOTA** 를 달성했습니다. **InternVL2.5-8B w/ Video SFT** 모델은 평균 **72.28점** 을 기록하여 비디오 모달리티를 통합하지 않은 모델(평균 **42.29점** ) 대비 현저한 개선을 보였습니다. 이는 **비디오 모달리티** 가 **RPAs** 의 표현력과 일관성을 높이는 데 결정적인 역할을 함을 입증합니다.

## AI 실무자를 위한 시사점
**비디오 모달리티** 를 **RPAs** 에 통합하는 접근 방식은 **AI 에이전트의 현실감** 과 **상호작용성** 을 획기적으로 향상시킬 수 있습니다. 구축된 **Role-playing-Video60k 데이터셋** 은 비디오 기반 **RPAs** 연구의 귀중한 자원이 될 것이며, **적응형 시간 샘플링** 과 **동적/정적 프로필 통합 방법론** 은 실제 서비스에서 **더욱 정교한 캐릭터** 를 구현하는 데 활용될 수 있습니다. 특히 **인간 유사성** 이 중요한 가상 비서, 게임 NPC, 디지털 휴먼 등의 개발에 큰 영향을 미칠 것으로 기대됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.