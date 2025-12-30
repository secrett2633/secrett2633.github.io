---
title: "[논문리뷰] OmniAgent: Audio-Guided Active Perception Agent for Omnimodal Audio-Video Understanding"
excerpt: "Jian Liu이 [arXiv]에 게시한 'OmniAgent: Audio-Guided Active Perception Agent for Omnimodal Audio-Video Understanding' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Omnimodal Understanding
  - Audio-Guided Perception
  - Active Learning Agents
  - Cross-Modal Alignment
  - Tool-Use
  - Video Understanding
  - Multimodal LLMs

permalink: /ai/review/2025-12-30-OmniAgent-Audio-Guided-Active-Perception-Agent-for-Omnimodal-Audio-Video-Understanding/

toc: true
toc_sticky: true

date: 2025-12-30 00:00:00+0900+0900
last_modified_at: 2025-12-30 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.23646)

**저자:** Keda Tao, Wenjie Du, Bohan Yu, Weiqiang Wang, Jian Liu, Huan Wang



## 핵심 연구 목표
기존 **옴니모달 대규모 언어 모델(OmniLLMs)** 이 겪는 **미세한 크로스모달 이해(fine-grained cross-modal understanding)** 및 **멀티모달 정렬(multimodal alignment)** 의 한계를 해결하는 것을 목표로 합니다. 수동적인 반응 생성에서 벗어나 능동적인 정보 탐색을 통해 더 정확하고 효율적인 오디오-비디오 이해를 달성하고자 합니다.

## 핵심 방법론
논문은 `Think-Act-Observe-Reflect` 반복 루프를 기반으로 하는 **OmniAgent** 라는 오디오 가이드 능동 인지 에이전트를 제안합니다. 이 에이전트는 **비디오, 오디오, 이벤트 도구** 로 구성된 포괄적인 **모달리티별 도구 세트** 를 동적으로 조율하며, 특히 **오디오 기반 이벤트 위치 파악 알고리즘** 을 활용하여 시간적 이벤트를 파악하고 세부적인 시각적 분석을 유도합니다. **LLM** 이 도구 호출 및 의사 결정을 중앙에서 오케스트레이션하여 최적의 모달리티와 세분화 정도를 자율적으로 결정합니다.

## 주요 결과
**Daily-Omni, OmniVideoBench, WorldSense** 세 가지 오디오-비디오 이해 벤치마크에서 최첨단 성능을 달성했습니다. 특히 **Daily-Omni** 벤치마크에서는 **82.71%** 의 정확도를 기록하여 기존의 **Qwen3-Omni-30B (72.08%)** 및 **Gemini2.5-Flash (72.70%)** 를 **10-20%** p 이상 능가하는 뛰어난 결과를 보였습니다. **OmniVideoBench** 에서는 **59.1%** 의 정확도를 달성하여 장기 비디오 이해 능력 또한 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 **에이전트 기반 프레임워크** 가 복잡한 멀티모달 이해, 특히 **미세한 분석** 과 **크로스모달 정렬** 문제 해결에 효과적임을 보여줍니다. **오디오 신호** 가 시간적 이벤트 위치 파악에 중요한 역할을 할 수 있음을 강조하며, 이는 리소스 제약이 있는 환경에서 효율적인 인식 전략을 수립하는 데 유용합니다. 향후 **옴니모달 에이전트 모델의 직접 훈련** 및 **추론 효율성 개선** 을 통해 발전 가능성을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.