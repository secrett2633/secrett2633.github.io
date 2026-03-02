---
title: "[논문리뷰] DLEBench: Evaluating Small-scale Object Editing Ability for Instruction-based Image Editing Model"
excerpt: "FengJiao Chen이 arXiv에 게시한 'DLEBench: Evaluating Small-scale Object Editing Ability for Instruction-based Image Editing Model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Image Editing
  - Instruction-based Models
  - Small Object Editing
  - Benchmark
  - Evaluation Metrics
  - Large Multimodal Models (LMMs)
  - Visual Consistency

permalink: /ai/review/2026-03-02-DLEBench-Evaluating-Small-scale-Object-Editing-Ability-for-Instruction-based-Image-Editing-Model/

toc: true
toc_sticky: true

date: 2026-03-02 00:00:00+0900+0900
last_modified_at: 2026-03-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.23622)

**저자:** Shibo Hong, Boxian Ai, Jun Kuang, Wei Wang, FengJiao Chen, Zhongyuan Peng, Chenhao Huang, Yixin Cao



## 핵심 연구 목표
현재 Instruction-based Image Editing Models (IIEMs)가 작은 객체 편집에서 성능이 충분히 탐구되지 않았음을 지적하며, **정확한 로컬 편집 및 세부사항 개선** 을 위한 IIEMs의 **작은 객체 편집 능력** 을 평가하는 전용 벤치마크를 구축하는 것을 목표로 합니다.

## 핵심 방법론
IIEMs의 작은 객체 편집 능력을 평가하기 위해 **DeepLookEditBench (DLEBench)** 벤치마크를 구축했습니다. 이 벤치마크는 시각 추론 데이터셋에서 QA 쌍을 편집 지시로 변환하는 **반자동 3단계 변환 파이프라인** 과 고품질 참조 이미지 생성을 위한 **crop-and-edit 메커니즘** 을 포함합니다. 평가 프로토콜로는 주관성을 최소화하는 **정제된 점수 채점 기준** (Instruction Following, Visual Consistency)과 LMM-as-a-Judge의 한계를 보완하는 **듀얼 모드 평가 프레임워크** (Tool-driven Mode, Oracle-guided Mode)를 제안합니다. Tool-driven Mode에서는 **Grounding, Zoom-In, Difference, Enhancer** 와 같은 외부 시각 도구를 활용합니다.

## 주요 결과
**DLEBench** 는 이미지 영역의 **1%-10%** 를 차지하는 작은 타겟 객체를 포함하는 **1,889개 샘플** 로 구성됩니다. **10개 IIEMs** 에 대한 평가 결과, 작은 객체 편집 능력에서 **상당한 성능 격차** 가 드러났으며, **Gemini-3-Pro** 가 평균 **65.55점** 으로 가장 높은 성능을 보였습니다. 특히 오픈소스 모델인 **Bagel-Think** ( **61.00점** )이 상용 모델인 GPT-Image-1( **40.25점** )을 능가하는 경쟁력을 보여주었습니다. 제안된 **Oracle-guided Mode** 는 LMM-as-a-Judge 대비 **인간 판단과 더 높은 일치도** 를 달성했습니다.

## AI 실무자를 위한 시사점
본 연구는 IIEMs가 작은 객체 편집에서 여전히 **상당한 한계점** 을 가지고 있음을 명확히 보여주어, 해당 분야의 추가 연구 필요성을 강조합니다. 실무자들은 **DLEBench** 와 제안된 **듀얼 모드 평가 프레임워크** 를 활용하여 모델의 미세 편집 능력을 보다 신뢰성 있고 정확하게 평가할 수 있으며, 이는 **정밀한 이미지 편집 모델 개발** 에 중요한 지침을 제공합니다. 특히 특정 상황에서 오픈소스 모델의 경쟁력을 인지하고 활용하는 데 도움이 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.