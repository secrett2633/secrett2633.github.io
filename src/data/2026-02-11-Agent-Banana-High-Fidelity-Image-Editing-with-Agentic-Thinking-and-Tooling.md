---
title: "[논문리뷰] Agent Banana: High-Fidelity Image Editing with Agentic Thinking and Tooling"
excerpt: "이 [arXiv]에 게시한 'Agent Banana: High-Fidelity Image Editing with Agentic Thinking and Tooling' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Image Editing
  - Agentic AI
  - Multi-turn Interaction
  - High-Fidelity
  - Native Resolution
  - LLM
  - Context Folding
  - Layer Decomposition

permalink: /ai/review/2026-02-11-Agent-Banana-High-Fidelity-Image-Editing-with-Agentic-Thinking-and-Tooling/

toc: true
toc_sticky: true

date: 2026-02-11 00:00:00+0900+0900
last_modified_at: 2026-02-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.09084)

**저자:** Ruijie Ye, Jiayi Zhang, Zhuoxin Liu, Zihao Zhu, Siyuan Yang, Li Li, Tianfu Fu, Franck Dernoncourt, Yue Zhao, Jiacheng Zhu, Ryan Rossi, Wenhao Chai, Zhengzhong Tu



## 핵심 연구 목표
본 논문은 기존 이미지 편집 모델의 한계를 극복하고, 전문적인 워크플로우를 지원하는 고품질, 네이티브 해상도 이미지 편집 시스템을 개발하는 것을 목표로 합니다. 특히, 오버 에디팅 방지, 장기적인 일관성 유지, 컨텍스트 인식 및 논리적으로 의존적인 다중 턴 편집을 가능하게 하며, **4K 해상도** 이미지에서 미세한 디테일을 보존하는 데 중점을 둡니다.

## 핵심 방법론
제안된 **Agent Banana** 는 계층적 에이전트 기반 프레임워크로, **Planner** 와 **Executor** 두 가지 핵심 에이전트를 통해 작동합니다. **Planner** 는 복잡한 사용자 지시를 실행 가능한 하위 목표로 분해하고, **Executor** 는 **Image Layer Decomposition (ILD)** 메커니즘을 사용하여 지역화된 고해상도 편집을 수행합니다. 장기적인 컨텍스트 관리를 위해 **Context Folding** 메커니즘을 도입하여 상호작용 기록을 구조화된 메모리로 압축하며, **self-correction mechanism** 을 통해 편집 품질을 검증하고 개선합니다.

## 주요 결과
**Agent Banana** 는 새로 구축된 **HDD-Bench** 벤치마크에서 다중 턴 일관성 및 배경 충실도에서 뛰어난 성능을 달성했습니다. 구체적으로 **IC 0.871, SSIMOM 0.84, LPIPSOM 0.12** 의 정량적 지표를 기록하며 최상위 성능을 보였습니다. 특히, **4K 네이티브 해상도** 에서 고품질 편집을 유지할 수 있는 몇 안 되는 모델 중 하나임을 입증했으며, 오버 에디팅과 **Prior-Induced Editing Drift (PIED)** 현상에 효과적으로 저항하는 것을 확인했습니다.

## AI 실무자를 위한 시사점
**Agent Banana** 는 AI 기반 이미지 편집이 실제 전문 워크플로우에 통합될 수 있는 중요한 발판을 마련했습니다. **고해상도 이미지 처리** 와 **다중 턴 일관성 유지** 능력은 미디어, 디자인, VFX 등 다양한 산업에서 활용 가치가 높습니다. 또한, **HDD-Bench** 벤치마크는 투명하고 검증 가능한 방식으로 장기적인 AI 에이전트의 성능을 평가할 수 있는 표준을 제시하여, 향후 연구 및 개발에 실질적인 지침을 제공할 것으로 예상됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.