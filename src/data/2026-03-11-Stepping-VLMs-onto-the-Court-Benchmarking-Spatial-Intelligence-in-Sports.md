---
title: "[논문리뷰] Stepping VLMs onto the Court: Benchmarking Spatial Intelligence in Sports"
excerpt: "Yuqing Shao이 arXiv에 게시한 'Stepping VLMs onto the Court: Benchmarking Spatial Intelligence in Sports' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Spatial Intelligence
  - Vision-Language Models
  - Sports Analytics
  - 3D Reconstruction
  - Dataset
  - Benchmark
  - Racket Sports
  - Human-Centric AI

permalink: /ai/review/2026-03-11-Stepping-VLMs-onto-the-Court-Benchmarking-Spatial-Intelligence-in-Sports/

toc: true
toc_sticky: true

date: 2026-03-11 00:00:00+0900+0900
last_modified_at: 2026-03-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.09896)

**저자:** Yuchen Yang, Yuqing Shao, Duxiu Huang, Linfeng Dong, Yifei Liu, Suixin Tang, Xiang Zhou, Yuanyuan Gao, Wei Wang, Yue Zhou, Xue Yang, Yanfeng Wang, Xiao Sun, Zhihang Zhong



## 핵심 연구 목표
본 논문은 **Vision-Language Model (VLM)** 의 공간 지능을 스포츠 시나리오에서 벤치마킹하고 발전시키는 것을 목표로 합니다. 기존의 정적 객체 중심 데이터셋의 한계를 넘어, 고강도 인간 움직임과 동적 객체 상호작용이 특징인 스포츠 환경에서 **미세한 인간 중심의 공간 추론 능력** 을 평가하고 향상시키고자 합니다.

## 핵심 방법론
연구팀은 스포츠 장면을 **3D로 재구성** 하는 **반자동 데이터 엔진** 을 개발했습니다. 이 엔진은 **코트 지오메트리를 기준점** 으로 활용하여 카메라 파라미터를 최적화하고, **PromptHMR** 로 선수 메쉬를 복구하며, 수동 볼 주석을 통해 **센티미터 수준의 정확도** 를 달성합니다. 이 엔진을 바탕으로 공간 카운팅, 거리 측정, 지역화, 관계 추론을 포괄하는 **1M개 이상의 QA 쌍** 으로 구성된 **CourtSI 데이터셋** 과 **3,686개의 고품질 QA 쌍** 으로 구성된 평가 벤치마크인 **CourtSI-Bench** 를 구축했습니다.

## 주요 결과
**CourtSI-Bench** 에 대한 25개 **VLM** 평가 결과, 특히 거리 측정 작업에서 인간과 AI 간의 상당한 성능 격차가 드러났습니다. **Qwen3-VL-8B 모델** 을 **CourtSI** 로 미세 조정했을 때 **CourtSI-Bench** 에서 정확도가 **23.5% 포인트 향상** 되었으며, 유사하지만 처음 접하는 스포츠인 피클볼 기반의 **CourtSI-Ext** 에서도 효과적인 일반화 능력을 보였습니다. 또한, 미세 조정된 모델은 **공간 인식 해설 생성 능력** 도 향상시켰습니다.

## AI 실무자를 위한 시사점
**CourtSI** 는 **VLM** 의 공간 지능 발전을 위한 확장 가능한 경로를 제공하며, 역동적인 스포츠 환경에서 **인간 중심의 미세한 공간 추론** 에 대한 새로운 벤치마크를 제시합니다. 이는 AI 모델이 복잡한 3D 환경을 더 잘 이해하고 상호작용할 수 있도록 돕는 기반 연구로서, **스포츠 분석, 중계 자동화** 등 실제 애플리케이션 개발에 중요한 기여를 할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.