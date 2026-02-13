---
title: "[논문리뷰] Thinking with Drafting: Optical Decompression via Logical Reconstruction"
excerpt: "이 [arXiv]에 게시한 'Thinking with Drafting: Optical Decompression via Logical Reconstruction' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Reasoning
  - Visual Algebra
  - Domain-Specific Language
  - Optical Decompression
  - Logical Reconstruction
  - Bar Model
  - MLLMs
  - Verification

permalink: /ai/review/2026-02-13-Thinking-with-Drafting-Optical-Decompression-via-Logical-Reconstruction/

toc: true
toc_sticky: true

date: 2026-02-13 00:00:00+0900+0900
last_modified_at: 2026-02-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.11731)

**저자:** Jingxuan Wei, Honghao He, Caijun Jia, Siyuan Li, Zheng Sun, Yuhang Xu, Yuanyuan Lin, Linzhuang Sun, Yuchen Wu, Bihui Yu, Xiangxiang Zhang, Cheng Tan



## 핵심 연구 목표
본 논문은 멀티모달 대규모 언어 모델(MLLM)이 시각적 입력에 대한 복잡한 추론 작업에서 겪는 "정밀도 역설"을 해결하는 것을 목표로 합니다. 시각적 인식을 잠재적 논리 구조 재구성(optical decompression)으로 재개념화하여, 높은 시각적 충실도와 수학적 정확성을 동시에 보장하는 검증 가능한 시각적 추론 시스템을 구축하고자 합니다.

## 핵심 방법론
저자들은 **Thinking with Drafting (TWD)** 패러다임을 제안하며, 이는 시각적 추론을 최소주의 **도메인 특화 언어(DSL)** 로의 논리적 재구성으로 간주합니다. 이 **DSL** 은 **수평선 세그먼트(HL)** , **수직 정렬선(VL)** , **수평/수직 브레이스(HB/VB)** 와 같은 원시 요소를 포함하며, **가상 그리드 시스템** 을 통해 논리적 추론과 렌더링을 분리합니다. 모델은 초기 **DSL 초안** 을 생성하고, 이를 **결정론적 렌더링 엔진** 을 통해 시각적 검증 이미지로 변환한 뒤, 이 초안을 기반으로 추론을 정제하여 최종 답변을 도출하는 2단계 생성-검증 과정을 거칩니다.

## 주요 결과
제안된 **TWD 모델(Qwen3-VL-8B를 미세 조정)** 은 **VisAlg** 벤치마크에서 **82.63점** 으로 가장 높은 전체 점수를 달성했습니다. 이는 모든 공개 모델과 선도적인 상용 모델인 **Gemini-3-Pro(79.96점)** 및 **Gemini-2.5-Pro(74.12점)** 를 능가하는 성능입니다. 또한, 전문가의 인간 평가와 검증자 기반 **VisAlg** 점수 사이에 **r = 0.9575** 의 높은 상관관계를 보여, 구조적 정확성에 대한 실제 개선을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 **MLLM** 이 시각적 추론에서 **논리적 일관성과 수학적 정확성을 확보** 하는 새로운 접근 방식을 제시합니다. **DSL** 을 통해 모델의 "사고 과정"을 명시적이고 검증 가능한 시각적 증명으로 전환함으로써, **신뢰할 수 있는 멀티모달 AI 시스템** 개발에 중요한 기여를 합니다. 특히, **VisAlg 벤치마크** 는 MLLM의 논리 인식 시각적 추론 능력을 평가하기 위한 강력한 도구로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.