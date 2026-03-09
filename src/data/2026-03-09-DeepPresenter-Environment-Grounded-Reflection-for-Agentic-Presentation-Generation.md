---
title: "[논문리뷰] DeepPresenter: Environment-Grounded Reflection for Agentic Presentation Generation"
excerpt: "arXiv에 게시된 'DeepPresenter: Environment-Grounded Reflection for Agentic Presentation Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic Systems
  - Presentation Generation
  - Large Language Models (LLMs)
  - Multimodal LLMs (MLLMs)
  - Environment-Grounded Reflection
  - Self-Correction
  - Dual-Agent Framework
  - Supervised Fine-tuning

permalink: /ai/review/2026-03-09-DeepPresenter-Environment-Grounded-Reflection-for-Agentic-Presentation-Generation/

toc: true
toc_sticky: true

date: 2026-03-09 00:00:00+0900+0900
last_modified_at: 2026-03-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.22839)

**저자:** Hao Zheng, Guozhao Mo, Xinru Yan, Qianhao Yuan, Wenkai Zhang, Xuanang Chen, Yaojie Lu, Hongyu Lin, Xianpei Han, Le Sun



## 핵심 연구 목표
기존 발표 자료 생성 에이전트의 한계(미리 정의된 워크플로, 콘텐츠에 구애받지 않는 템플릿, 내부 신호에만 의존하는 자기 성찰)를 극복하고자 합니다. **DEEPPRESENTER** 는 다양한 사용자 의도에 적응하고, 피드백 기반의 반복적인 개선을 가능하게 하며, 스크립트화된 파이프라인을 넘어서 일반화되는 에이전트 기반 발표 자료 생성 프레임워크를 개발하는 것을 목표로 합니다.

## 핵심 방법론
**DEEPPRESENTER** 는 `Researcher Agent`와 `Presenter Agent`의 **듀얼 에이전트 협업** 을 통해 작동합니다. `Researcher Agent`는 사용자 의도에 맞춰 정보를 수집하고 원고를 작성하며, `Presenter Agent`는 이 원고를 시각적으로 일관된 슬라이드로 변환합니다. 특히, 시스템은 내부 신호 대신 **환경 접지형 성찰(environment-grounded reflection)** 을 사용하여 `inspect tool`로 렌더링된 슬라이드와 원고의 **지각적 아티팩트 상태** 를 직접 관찰하고, 이를 통해 렌더링 후 발생하는 결함(예: 이미지 깨짐, 오버플로, 낮은 대비)을 식별하고 수정합니다. 또한, **외적 검증(extrinsic verification)** 을 통해 자기 성찰 편향을 완화하고 고품질의 훈련 궤적을 합성합니다.

## 주요 결과
**DEEPPRESENTER** 는 다양한 발표 자료 생성 시나리오에서 **최첨단 성능** 을 달성했습니다. Gemini-3-Pro를 백본으로 사용했을 때 평균 **4.44점** 을 기록하며 기존 오픈소스 및 상용 시스템(Gamma 4.36점)을 능가했습니다. 특히 **콘텐츠 품질과 시각적 스타일** 이 크게 향상되었고, **0.79의 높은 시각적 다양성 점수** 로 템플릿 기반 모델들을 압도했습니다. **미세 조정된 DeepPresenter-9B** 모델은 **4.19점** 을 기록하여 GPT-5 (4.22점)에 근접하면서도 훨씬 낮은 비용으로 높은 경쟁력을 보였습니다.

## AI 실무자를 위한 시사점
**환경 접지형 성찰** 은 LLM 에이전트가 내부 추론만으로는 탐지하기 어려운 **렌더링 후 결함** 을 식별하고 수정하는 데 필수적인 메커니즘임을 보여줍니다. 이는 복잡한 멀티모달 출력 생성 태스크에서 **LLM 에이전트의 신뢰성과 실용성** 을 크게 높이는 중요한 통찰을 제공합니다. 또한, **외적 검증** 을 통한 고품질 궤적 합성 및 **소형 모델 미세 조정** 전략은 비용 효율적이면서도 강력한 에이전트 기반 AI 시스템을 구축하는 데 효과적인 방법을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.