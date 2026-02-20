---
title: "[논문리뷰] VenusBench-GD: A Comprehensive Multi-Platform GUI Benchmark for Diverse Grounding Tasks"
excerpt: "arXiv에 게시된 'VenusBench-GD: A Comprehensive Multi-Platform GUI Benchmark for Diverse Grounding Tasks' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - GUI Grounding
  - Multi-Platform
  - Benchmark
  - MLLM
  - Hierarchical Evaluation
  - Human-in-the-Loop Annotation
  - GUI Agents
  - Multilingual Dataset

permalink: /ai/review/2025-12-19-VenusBench-GD-A-Comprehensive-Multi-Platform-GUI-Benchmark-for-Diverse-Grounding-Tasks/

toc: true
toc_sticky: true

date: 2025-12-19 00:00:00+0900+0900
last_modified_at: 2025-12-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.16501)

**저자:** Beitong Zhou, Zhexiao Huang, Yuan Guo, Zhangxuan Gu, Tianyu Xia, Zichen Luo, Fei Tang, Dehan Kong, Yanyi Shang, Suling Ou, Zhenlin Guo, Changhua Meng, Shuheng Shen



## 핵심 연구 목표
기존 GUI 그라운딩 벤치마크가 데이터 부족, 좁은 도메인 커버리지, 단일 플랫폼 집중, 그리고 과도한 전문 지식 요구 등의 한계를 가지고 있음을 지적합니다. 이에 대한 해결책으로, **실세계 GUI 에이전트** 의 에이전트 역량을 종합적으로 평가할 수 있는 **포괄적이고, 다국어 지원이 가능한 다중 플랫폼 GUI 그라운딩 벤치마크** 인 **VenusBench-GD** 를 제시하는 것이 주요 목표입니다.

## 핵심 방법론
이 연구는 웹, 모바일, 데스크톱 등 **다중 플랫폼** 에서 **97개의 실제 애플리케이션** 으로부터 수집된 스크린샷 데이터를 기반으로 합니다. **Qwen2.5-VL-72B** 와 같은 **MLLM** 을 활용한 명령어 생성과 전문가의 검증을 결합한 **4단계 휴먼-인-더-루프(human-in-the-loop) 어노테이션 파이프라인** 을 구축하여 **2.6%의 낮은 오류율** 로 높은 데이터 품질을 달성했습니다. 또한, **Element, Spatial, Visual** 의 3가지 기본 그라운딩 태스크와 **Reasoning, Functional, Refusal** 의 3가지 고급 그라운딩 태스크로 구성된 **계층적 평가 프레임워크** 를 제안하여 모델의 다양한 능력을 종합적으로 평가합니다.

## 주요 결과
**VenusBench-GD** 는 **6,166개의 이미지-명령어 쌍** 과 **13가지의 세분화된 UI 요소 유형** 을 포함하는 현재까지 **가장 규모가 크고 다양한 GUI 그라운딩 벤치마크** 입니다. 실험 결과, **Qwen3-VL 시리즈** 와 같은 범용 **MLLM** 이 기본 그라운딩 태스크에서 **76.96%의 평균 정확도** 를 달성하며 전문 GUI 모델과 동등하거나 이를 능가하는 성능을 보였습니다. 그러나 고급 태스크에서는 여전히 전문 GUI 모델(예: **Holo1.5-72B** 의 **Functional 69.43%** )이 강세를 보이지만, **Refusal Grounding** 에서 상당수의 전문 모델이 **거의 0%** 의 정확도를 보이며 **과적합 및 취약한 견고성** 이라는 한계를 드러냈습니다.

## AI 실무자를 위한 시사점
범용 **MLLM** 이 기본적인 GUI 그라운딩 능력에서 상당한 발전을 이루어 **기본 벤치마크의 포화** 를 시사합니다. 따라서 **계층적인 평가 프레임워크** 는 모델의 실제 적용 능력을 정확히 파악하고, 특히 복잡한 추론과 견고성이 요구되는 고급 태스크에서 모델의 약점을 식별하는 데 필수적입니다. 현재 GUI 모델은 **과적합 및 낮은 견고성** 문제가 있어, 실제 환경에서 복잡한 상황과 불분명한 지시를 처리할 수 있는 **보다 견고하고 일반화된 GUI 에이전트 개발** 의 필요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.