---
title: "[논문리뷰] WiseEdit: Benchmarking Cognition- and Creativity-Informed Image Editing"
excerpt: "Wendong Bu이 arXiv에 게시한 'WiseEdit: Benchmarking Cognition- and Creativity-Informed Image Editing' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Image Editing
  - Benchmarking
  - Cognitive AI
  - Creativity
  - Multimodal AI
  - Knowledge-based Reasoning
  - Diffusion Models
  - MLLMs

permalink: /ai/review/2025-12-02-WiseEdit-Benchmarking-Cognition-and-Creativity-Informed-Image-Editing/

toc: true
toc_sticky: true

date: 2025-12-02 00:00:00+0900+0900
last_modified_at: 2025-12-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.00387)

**저자:** Kaihang Pan, Weile Chen, Haiyi Qiu, Qifan Yu, Wendong Bu, Zehan Wang, Yun Zhu, Juncheng Li, Siliang Tang



## 핵심 연구 목표
본 논문은 기존 이미지 편집 벤치마크가 인지 및 창의성 기반 이미지 편집 모델의 고급 능력을 평가하는 데 한계가 있음을 지적합니다. 이를 해결하기 위해 **WiseEdit** 이라는 새로운 벤치마크를 제안하여, 깊이 있는 태스크 난이도와 광범위한 지식 영역을 포괄적으로 평가함으로써 최신 모델들의 한계를 객관적으로 드러내는 것을 목표로 합니다.

## 핵심 방법론
**WiseEdit** 은 이미지 편집 워크플로우를 **Awareness** , **Interpretation** , **Imagination** 의 세 가지 단계로 분해하고, 각 단계의 난이도를 높이는 태스크와 이 세 단계를 모두 요구하는 **WiseEdit-Complex** 태스크를 설계했습니다. 또한, **선언적(Declarative)** , **절차적(Procedural)** , **메타인지적(Metacognitive)** 지식을 포함한 세 가지 기본 지식 유형과 자연과학, 문화적 상식, 시공간 논리적 추론 등 다양한 지식 영역을 포괄합니다. 평가는 **GPT-4o** 를 자동 평가자로 활용하며, **Knowledge Fidelity** 와 **Creative Fusion** 이라는 새로운 메트릭을 도입했습니다.

## 주요 결과
**WiseEdit** 벤치마크는 **1,220개** 의 고품질 테스트 케이스로 구성됩니다. 실험 결과, **22개** 의 주요 모델(17개 오픈소스, 4개 클로즈드소스) 중 통합 이해 및 생성 모델이 순수 확산 모델보다 일관적으로 우수한 성능을 보였으며, 예를 들어 **Qwen-Image-Edit** 가 **FLUX.1 Kontext Dev** 보다 평균 **17점** 높은 점수를 기록했습니다. **Nano Banana Pro** 와 같은 클로즈드소스 모델이 전반적으로 가장 뛰어난 성능을 보였으나, 대부분의 모델은 **지식 기반 인지 추론** 능력(대부분 **80점 미만** )과 **창의적 구성 능력** (낮은 CF 및 DP 점수)에서 여전히 한계를 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 현재 **최첨단 이미지 편집 모델** 들이 **지식 기반 추론** 및 **창의적 합성** 능력에서 여전히 심각한 병목 현상을 겪고 있음을 명확히 보여줍니다. AI/ML 엔지니어는 모델이 복잡한 다중 이미지 입력과 다단계 명령을 처리하는 능력을 향상시키고, 변형 과정에서 **주체의 정체성을 보존** 하며, 인간과 유사한 **인지 및 창의적 능력** 을 갖추도록 연구 방향을 설정해야 할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.