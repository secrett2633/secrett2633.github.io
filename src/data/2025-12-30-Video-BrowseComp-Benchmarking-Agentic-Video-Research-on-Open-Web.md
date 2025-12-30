---
title: "[논문리뷰] Video-BrowseComp: Benchmarking Agentic Video Research on Open Web"
excerpt: "Kaixin Liang이 [arXiv]에 게시한 'Video-BrowseComp: Benchmarking Agentic Video Research on Open Web' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic AI
  - Video Understanding
  - Web Browsing
  - Benchmark
  - Multimodal LLMs
  - Temporal Grounding
  - Cross-Source Reasoning
  - Information Seeking

permalink: /ai/review/2025-12-30-Video-BrowseComp-Benchmarking-Agentic-Video-Research-on-Open-Web/

toc: true
toc_sticky: true

date: 2025-12-30 00:00:00+0900+0900
last_modified_at: 2025-12-30 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.23044)

**저자:** Zhengyang Liang, Yan Shu, Xiangrui Liu, Minghao Qin, Kaixin Liang, Paolo Rota, Nicu Sebe, Zheng Liu, Lizi Liao



## 핵심 연구 목표
본 논문은 기존 벤치마크들이 텍스트 및 정적 멀티모달 정보 탐색에 초점을 맞추고 동적인 웹 비디오 콘텐츠를 간과하는 문제점을 해결하고자 합니다. 구체적으로, 에이전트가 비디오 타임라인을 적극적으로 탐색하고, 분산된 증거를 교차 참조하며, 오픈 웹상의 주장을 검증하는 능력을 평가하는 새로운 벤치마크인 **Video-BrowseComp** 를 제안하여 개방형 웹 환경에서 **에이전트 비디오 연구** 를 발전시키는 것을 목표로 합니다.

## 핵심 방법론
**Video-BrowseComp** 는 오픈 웹 에이전트 비디오 추론을 위한 **210개 질문** 으로 구성된 벤치마크입니다. **필수 비디오 의존성** 원칙을 통해 텍스트 검색만으로는 답변할 수 없고 비디오 타임라인 탐색 및 시각적 해석이 필수적임을 보장합니다. 난이도에 따라 **Level 1 (명시적 검색 및 인지)** , **Level 2 (암시적 검색 및 엔티티 연결)** , **Level 3 (교차 출처 추론 및 다단계 검증)** 의 세 단계로 계층화됩니다. 성능 평가는 **정확도(Accuracy)** 와 **예상 보정 오류(Expected Calibration Error, ECE)** 를 사용하며, **도구 없는 모델(Tool-Free Models)** 및 **검색 증강 모델(Search-Augmented Models)** 을 베이스라인으로 설정합니다.

## 주요 결과
**도구 없는 모델** 은 **Gemini-2.5-pro** 가 최대 **19.52%** 의 정확도를 기록하는 등 저조한 성능을 보였으며, 높은 난이도(Level 2, 3)에서는 성능이 급락했습니다. **검색 증강 모델** 은 전반적인 정확도가 향상되었지만( **Gemini-2.5-pro (w/ Search) 23.81%** ), Level 1에서는 유의미한 향상( **37.60%** )을 보인 반면, Level 2( **4.84%** ) 및 Level 3( **0.00%** )에서는 여전히 성능이 저조했습니다. 특히 **o4-mini-deep-research** 는 Level 2( **12.90%** ) 및 Level 3( **8.70%** )에서 다른 모델보다 높은 성능을 달성하여 **심층 연구 에이전트** 의 가능성을 보여주었습니다. 또한, 직접 비디오가 제공될 경우 정확도가 **40%** 상승한 **45.0%** 를 기록하는 **모달리티 간극(Modality Gap)** 이 확인되었습니다.

## AI 실무자를 위한 시사점
현재 AI 에이전트는 동적인 웹 비디오 콘텐츠에 대한 **정보 검색 및 추론 능력** 에 심각한 한계를 보이며, 특히 **시간적 기반(Temporal Grounding)** 및 **교차 출처 추론** 이 요구되는 시나리오에서 취약합니다. 이는 텍스트 프록시에 의존하는 대신 **비디오 스트림을 직접 인지하고 처리하는 능력** 을 향상시키는 것이 시급함을 시사합니다. 미래의 에이전트 개발은 **장기 계획(Long-horizon planning)** 및 **교차 출처 합성(Cross-source synthesis)** 을 위한 고급 인지 아키텍처 구축에 초점을 맞춰야 하며, **높은 정확도와 낮은 토큰 사용량** 을 동시에 달성하는 효율적인 추론 프로세스 최적화가 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.