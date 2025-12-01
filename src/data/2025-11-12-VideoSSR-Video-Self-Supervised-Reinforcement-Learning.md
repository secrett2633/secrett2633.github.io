---
title: "[논문리뷰] VideoSSR: Video Self-Supervised Reinforcement Learning"
excerpt: "이 [arXiv]에 게시한 'VideoSSR: Video Self-Supervised Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Understanding
  - Self-Supervised Learning
  - Reinforcement Learning
  - MLLMs
  - Pretext Tasks
  - Verifiable Rewards
  - Data Generation
  - Temporal Grounding

permalink: /ai/review/2025-11-12-VideoSSR-Video-Self-Supervised-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-11-12 00:00:00+0900+0900
last_modified_at: 2025-11-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.06281)

**저자:** Zefeng He, Xiaoye Qu, Yafu Li, Siyuan Huang, Daizong Liu, Yu Cheng



## 핵심 연구 목표
본 연구는 Multimodal Large Language Models (MLLMs)의 비디오 이해 능력을 향상시키기 위해, 기존 비디오 데이터셋의 높은 주석 비용, 복잡성 부족, 그리고 주석 과정에서의 편향성이라는 한계를 극복하는 것을 목표로 합니다. 비디오 내의 풍부한 내재적 정보를 활용하여 고품질의 검증 가능한 훈련 데이터를 자체적으로 생성하는 방법을 모색합니다.

## 핵심 방법론
저자들은 비디오 자체에서 질문-답변 쌍을 생성할 수 있는 세 가지 자체 지도(self-supervised) 프리텍스트 태스크인 **Anomaly Grounding** , **Object Counting** , **Temporal Jigsaw** 를 설계했습니다. 이 태스크들의 난이도를 검증하기 위해 **VIUBench** 를 구축하고, 이를 통해 생성된 **VideoSSR-30K** 데이터셋으로 **GRPO** 를 활용한 **RLVR(Reinforcement Learning with Verifiable Reward)** 훈련을 수행합니다. 효율적이고 안정적인 RLVR 훈련을 위해 각 태스크에 맞는 **부드러운 보상 함수** 도 고안되었습니다.

## 주요 결과
**VIUBench** 평가 결과, **GPT-5** 와 같은 최첨단 모델조차 **평균 58.7%** 의 점수를 기록하며 내재적 비디오 이해에 어려움을 겪는 것으로 나타났습니다. 제안된 **VideoSSR** 프레임워크는 17개 벤치마크(General Video QA, Long Video QA, Temporal Grounding, Complex Reasoning 포함)에서 **평균 5% 이상** 의 성능 향상을 달성했습니다. 특히 **Anomaly Grounding** 태스크는 **QVHighlights** 에서 **+15.9%** , **ActivityNet** 에서 **+5.6%** 개선을 보였습니다.

## AI 실무자를 위한 시사점
**VideoSSR** 는 수동 또는 다중 에이전트 주석 없이 확장 가능하고 고품질의 비디오 훈련 데이터를 생성하는 실용적인 방법을 제공하여 MLLM 개발의 주요 병목 현상을 해결합니다. 난이도를 매개변수적으로 조절할 수 있는 프리텍스트 태스크는 모델 평가 및 훈련에 유용하며, 다양한 태스크에 걸친 일반화 능력은 비디오 이해 MLLM을 위한 강력한 기반이 될 수 있습니다. 이는 단일 태스크 확장이 아닌 다양한 자체 지도 태스크의 중요성을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.