---
title: "[논문리뷰] THINKSAFE: Self-Generated Safety Alignment for Reasoning Models"
excerpt: "Minki Kang이 [arXiv]에 게시한 'THINKSAFE: Self-Generated Safety Alignment for Reasoning Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Reasoning Models
  - Safety Alignment
  - Self-Distillation
  - Refusal Steering
  - Distributional Shift
  - Chain-of-Thought
  - Reinforcement Learning

permalink: /ai/review/2026-02-02-THINKSAFE-Self-Generated-Safety-Alignment-for-Reasoning-Models/

toc: true
toc_sticky: true

date: 2026-02-02 00:00:00+0900+0900
last_modified_at: 2026-02-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.23143)

**저자:** Seanie Lee, Sangwoo Park, Yumin Choi, Gyeongman Kim, Minki Kang, Jihun Yun, Dongmin Park, Jongho Park, Sung Ju Hwang



## 핵심 연구 목표
본 논문은 강화 학습(RL) 기반의 추론 모델들이 복잡한 추론 태스크에서 성능을 극대화하는 과정에서 발생하는 "안전성 저하(safety tax)" 문제를 해결하고자 합니다. 외부 교사 모델을 통한 기존 안전성 정렬 방식이 야기하는 **분포 불일치(distributional discrepancy)** 로 인한 본래 추론 능력 저하 없이, 모델의 안전성을 효과적으로 복원하는 것을 목표로 합니다.

## 핵심 방법론
THINKSAFE는 **거부 유도(refusal steering)** 메커니즘을 사용하여 모델이 자체적으로 안전 추론 데이터를 생성하도록 안내합니다. 유해한 프롬프트에는 "이 프롬프트는 유해합니다. 답변을 거부해야 합니다."와 같은 **거부 지향 명령어(refusal-oriented instruction)** 를 선행하여 모델의 잠재적 안전 지식을 활성화합니다. 이렇게 생성된 응답은 **Llama-Guard-3-8B** 와 같은 안전 가드 모델로 필터링된 후, 모델의 고유한 추론 분포를 유지하면서 **LoRA** 기반으로 미세 조정됩니다.

## 주요 결과
THINKSAFE는 Qwen3 및 DeepSeek-R1-Distill 모델군에서 일관되게 우수한 성능을 보였습니다. 예를 들어, **Qwen3-4B 모델** 에서 유해성을 **38.21%에서 9.63%로 대폭 감소** 시키면서 평균 추론 정확도를 **74.47%에서 77.18%로 향상** 시켰습니다. 또한, 온라인 RL 기준선인 **GRPO** 보다 우수한 안전성을 달성하고 유사한 추론 성능을 유지하면서도 **계산 비용을 약 8배 절감** 했습니다. 자체 생성된 데이터셋의 **가장 낮은 혼란도(perplexity)** 는 분포 불일치 최소화를 입증합니다.

## AI 실무자를 위한 시사점
THINKSAFE는 **대규모 추론 모델(LRMs)** 의 안전성 정렬을 위한 **계산 효율적인(computationally efficient)** 대안을 제시합니다. 외부 교사 모델에 의존하지 않고 모델의 **내재된 안전 지식** 을 활용하여 본래의 추론 능력을 유지하면서도 견고한 안전성 개선을 가능하게 합니다. 이는 AI/ML 엔지니어들이 **온라인 RL** 의 높은 비용이나 외부 모델 증류의 분포 불일치 문제를 회피하며 안전한 추론 모델을 개발하는 데 실용적인 해결책이 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.