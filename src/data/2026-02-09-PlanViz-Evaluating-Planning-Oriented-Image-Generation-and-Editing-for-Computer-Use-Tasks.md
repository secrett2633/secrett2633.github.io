---
title: "[논문리뷰] PlanViz: Evaluating Planning-Oriented Image Generation and Editing for Computer-Use Tasks"
excerpt: "Zhixin Wang이 arXiv에 게시한 'PlanViz: Evaluating Planning-Oriented Image Generation and Editing for Computer-Use Tasks' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Models
  - Image Generation
  - Image Editing
  - Benchmark
  - Computer-Use Tasks
  - Planning
  - Evaluation Metrics

permalink: /ai/review/2026-02-09-PlanViz-Evaluating-Planning-Oriented-Image-Generation-and-Editing-for-Computer-Use-Tasks/

toc: true
toc_sticky: true

date: 2026-02-09 00:00:00+0900+0900
last_modified_at: 2026-02-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.06663)

**저자:** Junxian Li†¹, Kai Liu †¹, Leyang Chen¹, Weida Wang², Zhixin Wang¹, Jiaqi Xu³, Fan Li³, Renjing Pei³, Linghe Kong¹, Yulun Zhang *¹



## 핵심 연구 목표
본 논문은 통합 멀티모달 모델(UMMs)이 일상생활과 밀접한 컴퓨터 사용 계획 태스크(planning-oriented computer-use tasks)를 얼마나 잘 지원하는지 평가하는 것을 목표로 합니다. 특히, 공간 추론 및 절차적 이해와 같은 능력이 이러한 태스크의 이미지 생성 및 편집에 충분한지 파악하고, 기존 평가 프레임워크의 한계를 해결하고자 합니다.

## 핵심 방법론
연구진은 **경로 계획(route planning), 작업 다이어그램(workflow diagramming), 웹/UI 표시(web&UI displaying)** 의 세 가지 새로운 컴퓨터 사용 하위 태스크를 설계했습니다. 데이터는 사람의 주석이 달린 질문과 참조 이미지, 그리고 품질 관리 프로세스를 통해 수집되었으며, 질문은 **개방형(open-ended)과 폐쇄형(closed-ended)** 으로 분류했습니다. 평가를 위해 정확성( **Cor** ), 시각적 품질( **Vis** ), 효율성( **Ef** )을 포함하는 태스크 적응형 점수 **PlanScore** 를 제안했으며, **Qwen3-VL-235B-A22B-Instruct** 를 활용한 MLLM-as-judge 방식으로 평가를 자동화했습니다.

## 주요 결과
실험 결과, UMMs는 모델과 태스크 전반에 걸쳐 일관되지 않은 성능을 보였습니다. 이미지 편집 태스크는 생성 태스크보다 훨씬 더 도전적이었으며, **SOTA UMMs의 편집 Cor 점수는 0.3~0.5에 불과** 한 반면, **생성 Cor 점수는 0.8~0.9** 에 달했습니다. **GPT-Image-1** 이 전반적으로 가장 우수한 성능을 보였지만, 편집 태스크에서는 여전히 어려움을 겪었으며, 경로 계획은 **Cor 0.81** 로 가장 어려운 생성 하위 태스크였습니다.

## AI 실무자를 위한 시사점
**PlanViz** 는 UMMs가 **복잡한 계획 기반의 컴퓨터 사용 태스크** 를 처리하는 데 있어 **공간 추론 및 절차적 이해 능력** 에 중요한 한계가 있음을 명확히 보여줍니다. AI/ML 엔지니어는 특히 **이미지 편집 성능** 과 **세밀한 계획의 시각화** 를 개선하는 데 연구 초점을 맞추어야 합니다. 또한, **오픈 소스 UMMs** 의 경우 다양한 프롬프트 스타일에 대한 **강건성(robustness)** 을 높이는 것이 중요한 연구 방향이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.