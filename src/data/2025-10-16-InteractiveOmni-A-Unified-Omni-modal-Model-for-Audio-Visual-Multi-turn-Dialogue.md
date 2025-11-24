---
title: "[논문리뷰] InteractiveOmni: A Unified Omni-modal Model for Audio-Visual Multi-turn
  Dialogue"
excerpt: "Dongchuan Ran이 [arXiv]에 게시한 'InteractiveOmni: A Unified Omni-modal Model for Audio-Visual Multi-turn
  Dialogue' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Omni-modal LLM
  - Audio-Visual Dialogue
  - Multi-turn Interaction
  - Speech Generation
  - Long-term Memory
  - Multimodal Understanding
  - End-to-end Training

permalink: /ai/review/2025-10-16-InteractiveOmni-A-Unified-Omni-modal-Model-for-Audio-Visual-Multi-turn-Dialogue/

toc: true
toc_sticky: true

date: 2025-10-16 13:09:51+0900
last_modified_at: 2025-10-16 13:09:51+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.13747)

**저자:** Wenwen Tong*, Hewei Guo*, Dongchuan Ran*, Jiangnan Chen*, Jiefan Lu*, Kaibin Wang*, Keqiang Li*, Xiaoxu Zhu*, Jiakui Li*, Kehan Li, Xueheng Li, Lumin Li, Chenxu Guo, Jiasheng Zhou, Jiandong Chen, Xianye Wu, Jiahao Wang, Silei Wu, Lei Chen, Hanming Deng, Yuxuan Song, Dinghao Zhou, Guiping Zhong, Ken Zheng, Shiyin Kang, Lewei Lu



## 핵심 연구 목표
본 논문은 기존 MLLM의 단일 턴 상호작용 및 제한적인 장기 기억 능력 한계를 극복하고자 합니다. 인간과 유사한 **다중 턴 상호작용** 및 **장기 기억**을 갖춘 **오디오-시각 옴니모달 대규모 언어 모델(Omni-MLLM)**인 InteractiveOmni를 개발하여 포괄적인 옴니모달 이해 및 음성 생성 능력을 제공하는 것이 목표입니다.

## 핵심 방법론
InteractiveOmni는 **Vision Encoder (InternViT)**, **Audio Encoder (Whisper-large-v3)**, **LLM Decoder (Qwen3-4B/8B)**, 그리고 **Streaming Speech Decoder (Cosyvoice2)**를 통합한 단일 아키텍처를 채택합니다. 모델은 **옴니모달 사전 훈련**을 통한 교차 모달 정렬과 **명령어 튜닝** 및 **DPO (Direct Preference Optimization)**를 활용한 **다단계 사후 훈련 전략**으로 학습됩니다. 특히, 모델의 장기 기억 능력 강화를 위해 **다중 턴 훈련 데이터셋**을 세심하게 큐레이션했습니다.

## 주요 결과
InteractiveOmni는 주요 오픈소스 모델들을 크게 능가하며, 특히 장기 기억 능력에서 뛰어난 성능을 보입니다. **InteractiveOmni-8B**는 **MMMB** 벤치마크에서 평균 **58.17**점을 달성하여 Gemini-2.5-Flash와 유사한 수준이며, Qwen2.5-Omni-7B (**25.48**점)를 크게 앞섭니다. **MSIB** 벤치마크에서는 **InteractiveOmni-8B**가 종합 평균 **4.03**점으로 최고 성능을 기록했고, **InteractiveOmni-4B**는 **MMAU** 벤치마크에서 평균 **72.00**점을 달성하며 7B급 오픈소스 모델들을 능가했습니다.

## AI 실무자를 위한 시사점
InteractiveOmni는 차세대 지능형 상호작용 시스템 및 AI 어시스턴트를 위한 접근 가능한 오픈소스 기반을 제공합니다. 특히 **InteractiveOmni-4B**가 더 큰 모델들과 유사한 성능을 보이는 **매개변수 효율성**은 경량 애플리케이션에 매우 유용합니다. 이 모델은 **장기 기억, 문맥 이해, 감성 표현이 풍부한 음성 생성** 등 다중 턴 대화에 필수적인 고급 대화 능력을 구현하여 실용적인 AI 개발에 중요한 시사점을 줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.