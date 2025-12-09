---
title: "[논문리뷰] VG-Refiner: Towards Tool-Refined Referring Grounded Reasoning via Agentic Reinforcement Learning"
excerpt: "Yansong Tang이 [arXiv]에 게시한 'VG-Refiner: Towards Tool-Refined Referring Grounded Reasoning via Agentic Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Tool-integrated Visual Reasoning
  - Referring Grounded Reasoning
  - Agentic Reinforcement Learning
  - Self-Correction
  - Large Vision-Language Models
  - Chain-of-Thought
  - Tool Refinement

permalink: /ai/review/2025-12-09-VG-Refiner-Towards-Tool-Refined-Referring-Grounded-Reasoning-via-Agentic-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-12-09 00:00:00+0900+0900
last_modified_at: 2025-12-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.06373)

**저자:** Yansong Tang, Haoji Zhang, Jingxuan Niu, Wenlong Liu, VoyageWang



## 핵심 연구 목표
이 논문은 기존 **Tool-integrated Visual Reasoning (TiVR)** 패러다임이 부정확하거나 오류 있는 도구 출력에 취약하여 환각적인 추론으로 이어지는 문제를 해결하고자 합니다. 특히 **referring and grounding** 태스크에서 이러한 한계를 극복하고, 모델이 도구 피드백을 명시적으로 분석하고 정제할 수 있는 프레임워크를 개발하는 것이 목표입니다.

## 핵심 방법론
본 논문은 **VG-Refiner** 를 제안하며, 이는 **Tool-refined Referring Grounded Reasoning (TrRGR)** 을 위한 첫 프레임워크입니다. 모델이 도구 피드백을 명시적으로 분석하고 대응할 수 있도록 **두 단계의 think-rethink 메커니즘** 을 도입했습니다. 또한, 부정확한 도구 결과에 대한 효과적인 수정 능력을 강화하는 **refinement reward** 를 설계하고, **Group Relative Policy Optimization (GRPO)** 을 통해 훈련합니다. 모델의 정제 능력을 체계적으로 측정하기 위해 **PiTER (Prompt-integrated Tool Enhancement and Refinement)** 평가 프로토콜과 **critical correct rate (CCR)** 및 **normalized signed relative IoU (NSRI)** 두 가지 새로운 지표를 제안합니다.

## 주요 결과
VG-Refiner는 RefCOCO/+/g 벤치마크에서 **SOTA 성능** 을 달성하며, 기존 **Qwen2.5-VL-7B** 대비 **평균 정확도 +3.9%** 향상을 보였습니다. 특히, 약한 도구 조건(weak tool conditions)에서는 **Qwen2.5-VL-32B 모델** 보다 뛰어난 정제 능력을 보여주며, RefCOCO testA에서 **92.9%의 Acc** 와 **75.0%의 NSRIw** 를 기록했습니다 (Qwen2.5-VL-32B는 **89.9% Acc** 와 **69.4% NSRIw** ). 강한 도구 조건에서도 REVPT와 같은 기존 방법론이 도구 성능을 저하시키는 반면, VG-Refiner는 강력한 정제 능력을 유지했습니다.

## AI 실무자를 위한 시사점
이 연구는 도구 출력이 불확실하거나 잘못될 수 있는 **시각적 그라운딩** 과 같은 태스크에서 **Large Vision-Language Models (LVLMs)** 의 신뢰성을 크게 향상시킬 수 있는 실용적인 해결책을 제시합니다. **think-rethink 메커니즘** 은 AI 에이전트가 외부 피드백을 기반으로 스스로 오류를 감지하고 수정하는 능력을 갖추게 하여, **환각 현상(hallucination)** 을 줄이고 추론의 투명성을 높이는 데 기여할 수 있습니다. 제안된 **refinement reward** 와 **PiTER 평가 프로토콜** 은 미래의 도구 통합 AI 시스템 개발 및 평가를 위한 견고한 기반을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.