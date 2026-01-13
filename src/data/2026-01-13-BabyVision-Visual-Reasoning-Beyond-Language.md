---
title: "[논문리뷰] BabyVision: Visual Reasoning Beyond Language"
excerpt: "Yiyan Liang이 [arXiv]에 게시한 'BabyVision: Visual Reasoning Beyond Language' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLMs
  - Visual Reasoning
  - Benchmark
  - Early Vision
  - Spatial Perception
  - Visual Tracking
  - Pattern Recognition
  - Generative Models

permalink: /ai/review/2026-01-13-BabyVision-Visual-Reasoning-Beyond-Language/

toc: true
toc_sticky: true

date: 2026-01-13 00:00:00+0900+0900
last_modified_at: 2026-01-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.06521)

**저자:** Liang Chen, Kuan Li 외 다수



## 핵심 연구 목표
최신 멀티모달 대규모 언어 모델(MLLMs)이 고수준의 지식 기반 과제에서는 탁월하지만, 3세 아동도 쉽게 해결하는 기본적인 시각적 추론 과제에서 실패하는 근본적인 문제를 해결하고자 합니다. 이는 MLLMs가 시각 정보를 언어적 선험 지식에 과도하게 의존하며, 진정한 시각적 이해가 부족하다는 점을 체계적으로 밝히고 평가하기 위함입니다. 이를 위해 언어적 지식과 독립적으로 핵심 시각 능력을 평가하는 **BABYVISION** 벤치마크를 제안하고, 시각적 생성을 통해 추론 능력을 평가하는 **BABYVISION-GEN** 을 도입합니다.

## 핵심 방법론
**BABYVISION** 는 **미세 식별, 시각 추적, 공간 지각, 시각 패턴 인식** 의 네 가지 범주에 걸쳐 22개 하위 유형의 388개 문제로 구성되어 언어적 의존도를 최소화합니다. 모델 평가는 **Qwen3-Max** 를 활용한 LLM-as-judge 방식으로 이루어지며, 시각적 생성 모델을 위한 **BABYVISION-GEN** 은 **Gemini-3-Flash** 기반의 자동 평가 도구로 검증되었습니다(인간 평가와 **96.1%** 일치). **Gemini3-Pro-Preview** , **GPT-5.2** 를 포함한 **11개 MLLM** 과 **NanoBanana-Pro** 등 **3개 시각 생성 모델** 의 성능을 측정하고, **RLVR(Reinforcement Learning with Verifiable Rewards)** 파인튜닝 효과도 분석했습니다.

## 주요 결과
최고 성능 모델인 **Gemini3-Pro-Preview** 는 BABYVISION에서 **49.7%** 의 정확도를 기록하여, 성인 인간 기준치인 **94.1%** 에 크게 못 미쳤으며, **6세 아동보다 약 20% 낮은 성능** 을 보였습니다. 특히 **시각 추적** 과 **공간 지각** 영역에서 취약했으며, **Count 3D Blocks** 문제의 최고 정확도는 **20.5%** 에 그쳤습니다. **BABYVISION-GEN** 평가에서는 **NanoBanana-Pro** 가 **18.3%** 의 정확도를 보였으나, 시각 추적 관련 생성 태스크에서는 모든 모델이 **0%** 의 정확도를 기록하며 한계를 드러냈습니다. **RLVR** 파인튜닝은 **Qwen3-VL-8B-Thinking** 의 전체 정확도를 **+4.8%p** 향상시켰지만, 시각 추적에서는 오히려 성능 저하를 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 현재 MLLMs가 고수준의 지식 기반 추론 능력에도 불구하고, **인간의 초기 발달 단계에서 습득하는 기초 시각 이해 능력(예: 미세 식별, 공간 지각, 시각 추적)** 이 현저히 부족함을 명확히 보여줍니다. 이는 모델이 **시각 정보를 언어로 압축하는 과정에서 발생하는 '언어화 병목 현상'** 으로 인해 미세한 공간 구조나 연속적인 특징을 손실한다는 점을 시사합니다. AI 개발자들은 **BABYVISION** 와 같은 벤치마크를 활용하여 모델의 **근본적인 시각 이해 능력** 을 평가하고, **시각 정보를 추론 과정 전반에 걸쳐 보존** 하는 새로운 아키텍처 혁신에 집중해야 합니다. 또한, **BABYVISION-GEN** 은 시각적 추론을 시각적 출력으로 직접 표현하는 가능성을 제시하며, 미래의 멀티모달 시스템이 **시각적 공간에서 직접 '사고'하고 상호작용** 할 필요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.