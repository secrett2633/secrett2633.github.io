---
title: "[논문리뷰] Skywork-R1V4: Toward Agentic Multimodal Intelligence through Interleaved Thinking with Images and DeepResearch"
excerpt: "이 [arXiv]에 게시한 'Skywork-R1V4: Toward Agentic Multimodal Intelligence through Interleaved Thinking with Images and DeepResearch' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal AI
  - Agentic Models
  - Interleaved Reasoning
  - Image Manipulation
  - DeepSearch
  - Supervised Fine-tuning (SFT)
  - Tool-Augmented LLM

permalink: /ai/review/2025-12-03-Skywork-R1V4-Toward-Agentic-Multimodal-Intelligence-through-Interleaved-Thinking-with-Images-and-DeepResearch/

toc: true
toc_sticky: true

date: 2025-12-03 00:00:00+0900+0900
last_modified_at: 2025-12-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.02395)

**저자:** Multimodality Team, Skywork AI



## 핵심 연구 목표
기존 멀티모달 에이전트 시스템의 한계, 즉 이미지 조작과 웹 검색의 분리, 값비싼 **강화 학습(RL)** 의존성, 실제 도구 실행과 괴리된 계획 수립 문제를 해결하는 것을 목표로 합니다. **Skywork-R1V4** 는 멀티모달 계획, 능동적 이미지 조작, 심층 멀티모달 검색 및 시각/외부 지식 간의 **교차 추론** 을 통합하여 강력한 에이전트 능력을 **감독 학습(SFT)** 만으로 달성하고자 합니다.

## 핵심 방법론
**30B (A3B) 파라미터** 의 **Skywork-R1V4** 모델은 **30K 미만의 고품질 SFT 궤적** 을 통해 훈련되었습니다. 핵심 방법론은 다음 네 가지 역량을 통합하는 것입니다: **Multimodal Agentic Planning** , **Thinking with Images** (Python 코드 기반 이미지 조작), **DeepSearch** ( **Google Lens 이미지 검색** , **텍스트 검색** , **웹페이지 검색** 등 도구 활용), 그리고 이들을 동적으로 번갈아 사용하는 **Interleaved Image Manipulation and Search** 입니다. 데이터셋은 **GLM 4.5 V** 및 **Claude 4** 를 사용한 다중 턴 이미지 조작 궤적, 지식 그래프 기반 심층 검색 데이터, 그리고 **VLM** 을 통한 일관성 필터링을 거친 교차 추론 궤적을 포함합니다.

## 주요 결과
**Skywork-R1V4** 는 지각 및 멀티모달 검색 벤치마크에서 최첨단 성능을 달성했습니다. **MMSearch** 에서 **66.1점** 을 기록하여 **Qwen3-VL** 대비 **47.4%p** 향상되었고, **FVQA** 에서는 **67.2점** 으로 **13.9%p** 향상되었습니다. 또한, **Gemini 2.5 FLASH** 의 **11개 지표 모두** 를 능가하며 **Gemini 2.5 Pro** 의 **5개 지표** 를 상회했습니다. 추론 속도 면에서도 **Gemini-2.5-Flash** 보다 약 **4배** , **Gemini-2.5-Pro** 보다 **15배** 빠릅니다.

## AI 실무자를 위한 시사점
본 연구는 고품질의 **감독 학습(SFT)** 데이터만으로도 복잡한 문제 해결이 가능한 **멀티모달 에이전트 지능** 을 구축할 수 있음을 입증하며, **강화 학습(RL)** 의 복잡성과 비용을 우회하는 실용적인 접근법을 제시합니다. **코드 기반 이미지 조작** 과 **멀티모달 검색** 을 유기적으로 결합한 **교차 추론** 능력은 실제 세계의 복잡한 시각적 및 지식 기반 태스크에서 AI 모델의 활용도를 크게 높일 수 있습니다. 이는 AI 엔지니어들에게 효율적인 모델 개발 및 배포를 위한 새로운 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.