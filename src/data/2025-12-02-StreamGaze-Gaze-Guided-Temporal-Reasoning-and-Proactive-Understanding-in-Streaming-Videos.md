---
title: "[논문리뷰] StreamGaze: Gaze-Guided Temporal Reasoning and Proactive Understanding in Streaming Videos"
excerpt: "arXiv에 게시된 'StreamGaze: Gaze-Guided Temporal Reasoning and Proactive Understanding in Streaming Videos' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Streaming Video Understanding
  - Gaze-Guided AI
  - Temporal Reasoning
  - Proactive AI
  - MLLMs
  - Eye Tracking
  - Benchmark
  - Human-Computer Interaction

permalink: /ai/review/2025-12-02-StreamGaze-Gaze-Guided-Temporal-Reasoning-and-Proactive-Understanding-in-Streaming-Videos/

toc: true
toc_sticky: true

date: 2025-12-02 00:00:00+0900+0900
last_modified_at: 2025-12-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.01707)

**저자:** Daeun Lee, Subhojyoti Mukherjee, Branislav Kveton, Ryan A. Rossi, Viet Dac Lai, Seunghyun Yoon, Trung Bui, Franck Dernoncourt, Mohit Bansal



## 핵심 연구 목표
본 연구는 대규모 언어 모델(MLLMs)이 스트리밍 비디오 환경에서 인간의 시선(gaze) 신호를 활용하여 시간적 추론 및 선제적 이해를 얼마나 효과적으로 수행하는지 평가하는 것을 목표로 합니다. 기존 스트리밍 벤치마크들이 놓쳤던, 시선 기반의 과거, 현재, 선제적 추론 능력을 측정하여 실제 AR 글라스와 같은 애플리케이션의 핵심적인 격차를 해소하고자 합니다.

## 핵심 방법론
연구팀은 시선-비디오 QA 생성 파이프라인인 **STREAMGAZE** 를 개발했습니다. 이 파이프라인은 시선 궤적을 egocentric 비디오와 정렬하고, **안정적인 고정점(fixation) 추출** , **영역별 시각적 프롬프팅** 을 통한 객체 추출, 그리고 **스캔패스(scanpath) 구성** 을 통해 시간적으로 접지된 QA 쌍을 생성합니다. 최종적으로 과거, 현재, 선제적 추론을 포함하는 10가지 시선 기반 스트리밍 비디오 이해 태스크로 구성된 **8,521개의 QA 쌍** 벤치마크를 구축했습니다.

## 주요 결과
**STREAMGAZE** 벤치마크 평가 결과, 최신 MLLMs ( **GPT-4o** , **InternVL-3.5** )와 인간의 성능 사이에 상당한 격차를 확인했습니다 (인간 평균 정확도 **0.827** ). 특히 MLLMs는 시선 신호를 시간적 추론 및 선제적 추론에 활용하는 데 어려움을 겪는 것으로 나타났으며, 기존 시선 기반 모델인 **AssistGaze** 또한 평균 정확도 **0.223** 로 낮은 성능을 보였습니다. 프롬프팅 전략 중 **살리언시 맵(salience map) 프롬프트** 가 가장 좋은 성능을 보였으나, 여전히 원본 시선 신호 해석에는 한계가 있었습니다.

## AI 실무자를 위한 시사점
본 연구는 시선 기반 스트리밍 비디오 이해를 위한 MLLM의 근본적인 한계를 명확히 보여주며, 향후 모델 개발에 중요한 방향을 제시합니다. AI 실무자들은 **시선-비디오 데이터셋을 활용한 도메인 내 파인튜닝** 의 중요성과 **시간적 일관성** 및 **사용자 의도 모델링** 에 초점을 맞춰야 할 것입니다. 특히, 시각적 프롬프팅에서 **살리언시 맵** 의 효과는 MLLM이 시선 정보를 처리하는 데 있어 **공간적으로 집계된 신호** 가 더 효율적일 수 있음을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.