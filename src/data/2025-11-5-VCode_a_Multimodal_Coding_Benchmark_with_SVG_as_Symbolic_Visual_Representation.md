---
title: "[논문리뷰] VCode: a Multimodal Coding Benchmark with SVG as Symbolic Visual
  Representation"
excerpt: "이 [arXiv]에 게시한 'VCode: a Multimodal Coding Benchmark with SVG as Symbolic Visual
  Representation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal AI
  - Code Generation
  - SVG
  - Visual Representation
  - Benchmark
  - Large Vision-Language Models
  - Agentic AI
  - Reasoning

permalink: /ai/review/2025-11-5-VCode_a_Multimodal_Coding_Benchmark_with_SVG_as_Symbolic_Visual_Representation/

toc: true
toc_sticky: true

date: 2025-11-09 19:35:02+0900
last_modified_at: 2025-11-09 19:35:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.02778)

**저자:** Kevin Qinghong Lin*, Yuhao Zheng*, Hangyu Ran*, Dantong Zhu, Dongxing Mao, Linjie Li, Philip Torr, Alex Jinpeng Wang



## 핵심 연구 목표
본 논문은 에이전트 시대의 추론 및 행동을 위한 시각 중심 코딩의 미개척 영역을 탐구합니다. 기존 RGB 픽셀 기반 이미지 표현의 제한된 상징적 추상화를 넘어서, 이미지를 **SVG 코드**와 같은 압축적이고 해석 가능하며 실행 가능한 시각적 표현으로 변환하는 것을 목표로 합니다. 이를 통해 시각적 이해를 **코드 생성** 문제로 재구성하는 **VCode** 벤치마크를 제안합니다.

## 핵심 방법론
**VCode**는 기존 다중 모달 이해 벤치마크(MM-Vet, MMMU, CV-Bench)를 이미지에서 **SVG 코드**를 생성하는 시각 코딩 태스크로 전환합니다. 평가를 위해, 렌더링된 SVG를 기반으로 질문에 답하는 정책 모델의 능력을 측정하는 새로운 프로토콜인 **CodeVQA**를 도입하여 원본 이미지의 상징적 의미 보존 여부를 평가합니다. 또한, 코드 생성 능력을 향상시키기 위해 **Thinking with Revision** (반복적 오류 분석 및 코드 수정)과 **Acting with Visual Tools** (**객체 감지기**, **세그멘터**, **OCR**)를 결합한 에이전트 프레임워크인 **VCoder**를 제안합니다.

## 주요 결과
기존 **Large Vision-Language Models (VLMs)**은 충실한 **SVG 코드**를 생성하는 데 어려움을 겪어 언어 중심 코딩과 시각 중심 코딩 간의 격차를 드러냈습니다. **VCoder**는 최상위 모델인 **Claude-4-Opus** 대비 **+12.3 포인트의 전체 성능 향상**을 달성했습니다. 특히, **GPT-5**가 **SigLIP 점수 72.3**과 **CodeVQA 46.8**로 가장 강력한 베이스라인을 기록했으며, 시각 도구 추가는 **Claude-4-Opus** 대비 **16.6 포인트의 성능 향상**을 가져왔습니다.

## AI 실무자를 위한 시사점
**SVG 코드**가 에이전트 AI에서 상징적인 시각적 표현 및 추론을 위한 유망한 경로임을 보여줍니다. AI 실무자들은 현재 **VLM**들이 시각 중심 코드 생성에 여전히 한계가 있음을 인지하고, **VCoder**와 같은 반복적 수정 (**Thinking with Revision**) 및 외부 시각 도구 연동 (**Acting with Visual Tools**) 전략을 통해 이러한 격차를 줄일 수 있습니다. 특히, 이미지를 **언어적 캡션**으로 변환한 후 코딩하는 방식 (**Img2Text2SVG**)이 직접 **Img2SVG**보다 좋은 성능을 보여, 중간 언어 표현의 중요성을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.