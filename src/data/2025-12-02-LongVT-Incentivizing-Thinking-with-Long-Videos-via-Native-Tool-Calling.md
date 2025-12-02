---
title: "[논문리뷰] LongVT: Incentivizing "Thinking with Long Videos" via Native Tool Calling"
excerpt: "이 [arXiv]에 게시한 'LongVT: Incentivizing "Thinking with Long Videos" via Native Tool Calling' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Long Video Understanding
  - Multimodal LLMs
  - Tool Calling
  - Reinforcement Learning
  - Chain-of-Thought
  - Temporal Grounding
  - Video Question Answering

permalink: /ai/review/2025-12-02-LongVT-Incentivizing-Thinking-with-Long-Videos-via-Native-Tool-Calling/

toc: true
toc_sticky: true

date: 2025-12-02 00:00:00+0900+0900
last_modified_at: 2025-12-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.20785)

**저자:** Zuhao Yang, Sudong Wang, Kaichen Zhang, Keming Wu, Sicong Leng, Yifan Zhang, Chengwei Qin, Shijian Lu, Xingxuan Li, Lidong Bing



## 핵심 연구 목표
논문은 대규모 멀티모달 모델(LMMs)이 장시간 비디오(hours-long)에서 증거가 희박하고 시간적으로 분산된 정보를 처리할 때 발생하는 환각 현상과 부정확한 추론 문제를 해결하고자 합니다. 특히 기존 텍스트 기반 CoT(Chain-of-Thought) 추론의 한계를 극복하고, 인간의 비디오 이해 방식처럼 '글로벌 스키밍 후 로컬 클립 탐색'을 통해 정확하고 신뢰성 있는 추론을 수행하는 **LongVT** 프레임워크를 제안합니다.

## 핵심 방법론
**LongVT** 는 **iMCoTT (interleaved Multimodal Chain-of-Tool-Thought)** 를 통해 LMMs가 비디오를 능동적으로 탐색하고 자기 수정하는 에이전트적 추론 방식을 가능하게 합니다. 이는 **crop_video** 와 같은 네이티브 비디오 툴을 호출하여 특정 시간 구간의 프레임을 재샘플링하는 방식으로 구현됩니다. 훈련은 세 단계로 이루어집니다: (1) **Cold-start Supervised Fine-tuning (SFT)** 으로 기본 모델의 툴 사용 능력과 자기 수정 능력을 구축하고, (2) **Agentic Reinforcement Learning (RL)** 로 **GRPO** 를 활용하여 **결과 정확도, 포맷 준수, 시간적 위치 파악** 을 통합한 **Joint Answer-Temporal Grounding Reward** 를 통해 툴 사용 롤아웃을 최적화합니다. 마지막으로 (3) **Agentic Reinforcement Fine-tuning (RFT)** 으로 RL에서 얻은 고품질 궤적을 재학습하여 모델의 에이전트적 행동을 안정화합니다. 이를 위해 증거 희박 장시간 비디오 추론을 위한 **VideoSIAH** 데이터셋을 구축하였습니다.

## 주요 결과
**LongVT-7B-RFT** 모델은 새롭게 구축된 **VideoSIAH-Eval** 벤치마크에서 **42.0** 점을 달성하여 기존 오픈소스 모델 중 2위 모델보다 **6점** 높은 성능을 보였습니다. 또한, VideoMME, VideoMMMU, LVBench 등 4가지 장시간 비디오 벤치마크에서 기존 강력한 베이스라인들을 일관되게 능가했습니다. 특히 **VideoMMMU** 에서 **1329.8초** , **LVBench** 에서 **1509.3초** 로 가장 낮은 추론 지연 시간을 기록하며 멀티턴 에이전트 프레임워크의 효율성을 입증했습니다.

## AI 실무자를 위한 시사점
**LongVT** 는 LMMs의 장시간 비디오 이해 능력을 향상시켜 **환각 현상을 줄이고** 시각적 증거에 기반한 추론의 **신뢰성과 투명성** 을 높입니다. AI 엔지니어는 **iMCoTT** 와 같은 **툴 기반 에이전트 추론** 패러다임을 활용하여 LMMs가 복잡한 비디오 분석 작업에서 인간과 유사한 전략으로 문제를 해결하도록 설계할 수 있습니다. 또한, **VideoSIAH** 와 같은 고품질 데이터셋 및 **SFT-RL-RFT 다단계 훈련 전략** 은 장시간 비디오 도메인에서 모델을 효과적으로 훈련하고 배포하는 실용적인 가이드라인을 제공하며, 효율적인 추론 성능은 실시간 애플리케이션에 대한 가능성을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.