---
title: "[논문리뷰] Distilling Feedback into Memory-as-a-Tool"
excerpt: "vicgalle이 [arXiv]에 게시한 'Distilling Feedback into Memory-as-a-Tool' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM
  - Continual Learning
  - Memory-Augmented Agents
  - Self-Correction
  - Feedback Distillation
  - Tool Use
  - Inference Cost Amortization
  - Rubric-based Learning

permalink: /ai/review/2026-01-12-Distilling-Feedback-into-Memory-as-a-Tool/

toc: true
toc_sticky: true

date: 2026-01-12 00:00:00+0900+0900
last_modified_at: 2026-01-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.05960)

**저자:** Víctor Gallego



## 핵심 연구 목표
본 논문은 **LLM** 의 추론 시 발생하는 높은 연산 비용과 반복적인 자기 수정 과정의 비효율성을 해결하고자 합니다. 특히, 기존 "System 2" 스케일링 방법론들이 매번 새로운 쿼리에 대해 처음부터 추론 과정을 반복하여 발생하는 **지식 손실** 과 **계산 자원 낭비** 문제를 극복하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **Distilling Feedback into Memory-as-a-Tool** 프레임워크를 제안합니다. 이 프레임워크는 에이전트가 **도구 호출(tool calls)** 을 통해 접근할 수 있는 **파일 기반 메모리 시스템** 을 활용하여, 일시적인 평가 피드백을 지속적이고 검색 가능한 지침으로 변환합니다. 에이전트는 피드백을 받아 **추상화, 구조화, 중복 제거** 과정을 거쳐 메모리 파일(예: **creative_guidelines.txt** )에 일반화된 원칙을 작성하고, 이후 작업 시 관련 메모리를 검색하여 성능을 향상시킵니다.

## 주요 결과
**Rubric Feedback Bench** 데이터셋을 사용한 실험에서, 제안된 **Memory + Feedback** 접근 방식은 **Self-Critique** baseline과 유사하거나 더 나은 성능을 단 두 번의 피드백 라운드 후에 달성했습니다. 특히, 이 방법은 **Self-Critique** 방식의 높은 추론 비용을 크게 절감하며, 초기 학습 단계 이후에는 **Zero-shot** 방식과 유사한 낮은 추론 비용으로 고성능을 유지하여 **비용 상각(cost amortization)** 효과를 입증했습니다. 장기 혼합 작업 실험에서 **Claude Sonnet 4.5** 는 메모리 사용 시 평균 점수 **0.78 ± 0.10** 를 기록하여, 메모리 없는 기준선인 **0.52 ± 0.25** 보다 월등히 높은 성능을 보였습니다.

## AI 실무자를 위한 시사점
이 프레임워크는 반복적인 **LLM 자기 수정** 의 높은 추론 비용을 효과적으로 상각하여, 실시간 애플리케이션에서 **비용 효율적인 고성능 LLM 배포** 의 가능성을 열어줍니다. **파일 기반의 해석 가능한 메모리 시스템** 은 AI 개발자가 에이전트의 학습 과정과 지식 기반을 쉽게 검사, 디버깅 및 직접 관리할 수 있게 하여, **투명성과 신뢰성** 을 높일 수 있습니다. **Rubric Feedback Bench** 와 같은 구조화된 피드백을 통해 **LLM** 이 다양한 작업 유형과 윤리적 지침에 신속하게 적응하고 일반화된 원칙을 학습하는 능력을 강화할 수 있음을 보여주어, **AI 에이전트의 지속적인 학습 및 적응 능력** 개발에 중요한 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.