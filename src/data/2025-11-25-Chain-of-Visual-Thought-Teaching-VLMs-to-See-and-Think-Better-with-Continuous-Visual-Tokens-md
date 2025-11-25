---
title: "[논문리뷰] Chain-of-Visual-Thought: Teaching VLMs to See and Think Better with Continuous Visual Tokens"
excerpt: "Stephanie Fu이 [arXiv]에 게시한 'Chain-of-Visual-Thought: Teaching VLMs to See and Think Better with Continuous Visual Tokens' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models (VLMs)
  - Chain-of-Thought (CoT)
  - Continuous Visual Tokens
  - Multimodal Reasoning
  - Perceptual Grounding
  - Visual Thinking
  - Dense Prediction

permalink: /ai/review/2025-11-25-Chain-of-Visual-Thought-Teaching-VLMs-to-See-and-Think-Better-with-Continuous-Visual-Tokens/

toc: true
toc_sticky: true

date: 2025-11-25 00:00:00+0900+0900
last_modified_at: 2025-11-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.19418)

**저자:** Yiming Qin, Bomin Wei, Jiaxin Ge, Konstantinos Kallidromitis, Trevor Darrell, Xudong Wang, Stephanie Fu



## 핵심 연구 목표
기존 VLM이 이산적인 텍스트 기반 추론에 국한되어 공간 추론 및 기하학적 인식과 같은 미세한 시각적 이해가 필요한 작업에서 어려움을 겪는 문제를 해결하는 것이 목표입니다. 연속적인 시각 토큰을 활용하여 VLM이 시각적 공간에서 직접 추론할 수 있도록 함으로써, 텍스트 기반 추론의 한계를 넘어선 정밀하고 기반이 확실하며 해석 가능한 멀티모달 지능을 구현하고자 합니다.

## 핵심 방법론
논문은 VLM이 연속적인 시각적 공간에서 추론할 수 있도록 하는 **Chain-of-Visual-Thought (CoVT)** 프레임워크를 제안합니다. 이 프레임워크는 **세그멘테이션, 깊이, 에지 구조, DINO 특징**과 같은 풍부한 지각적 단서를 인코딩하는 **연속적인 시각 토큰**을 도입합니다. 훈련 중 VLM은 이러한 시각 토큰을 예측하여 **SAM, DepthAnything v2, PIDINet, DINOv2**와 같은 경량 비전 전문가 모델의 밀집된 지도 신호(예: 세그멘테이션 마스크, 깊이 맵)를 재구성합니다.

## 주요 결과
**CoVT**는 10개 이상의 다양한 지각 벤치마크에서 강력한 VLM 기준선 대비 일관된 성능 향상을 보였습니다. 특히 **CV-Bench에서 5.5%의 전체적인 성능 향상**과 **깊이 하위 작업에서 14.0%의 상당한 개선**을 달성했습니다. **HRBench에서는 4.5%의 전체적인 개선**을 보였으며, **LLaVA-v1.5-13B 기반에서는 BLINK의 상대 깊이에서 Aurora-depth 대비 12.9% 우수**한 성능을 기록했습니다.

## AI 실무자를 위한 시사점
**CoVT**는 AI 실무자들에게 VLM의 시각적 추론 능력을 텍스트 기반의 한계를 넘어 확장할 수 있는 실용적인 방법론을 제공합니다. 이 프레임워크는 밀집된 시각 정보가 필요한 자율 주행, 의료 영상 분석 등 고정밀 응용 분야에 직접적으로 활용될 수 있습니다. 또한, 연속적인 시각 토큰의 활용은 모델의 의사결정 과정을 시각적으로 해석 가능하게 하여, AI 시스템의 신뢰성과 투명성을 높이는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.