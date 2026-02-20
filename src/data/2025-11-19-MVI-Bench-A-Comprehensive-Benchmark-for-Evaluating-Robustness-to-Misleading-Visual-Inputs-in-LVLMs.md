---
title: "[논문리뷰] MVI-Bench: A Comprehensive Benchmark for Evaluating Robustness to Misleading Visual Inputs in LVLMs"
excerpt: "Kaijie Chen이 arXiv에 게시한 'MVI-Bench: A Comprehensive Benchmark for Evaluating Robustness to Misleading Visual Inputs in LVLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LVLM Robustness
  - Misleading Visual Inputs
  - VQA Benchmark
  - Visual Perception
  - Visual Reasoning
  - MVI-Sensitivity
  - Multimodal AI

permalink: /ai/review/2025-11-19-MVI-Bench-A-Comprehensive-Benchmark-for-Evaluating-Robustness-to-Misleading-Visual-Inputs-in-LVLMs/

toc: true
toc_sticky: true

date: 2025-11-19 00:00:00+0900+0900
last_modified_at: 2025-11-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.14159)

**저자:** Huiyi Chen, Jiawei Peng, Dehai Min, Changchang Sun, Kaijie Chen, Yan Yan, Xu Yang, Lu Cheng



## 핵심 연구 목표
기존 Large Vision-Language Models (LVLMs) 강건성 벤치마크들이 환각이나 오해의 소지가 있는 텍스트 입력에만 집중하고, 시각적 이해 평가에서 **오해의 소지가 있는 시각적 입력** 을 간과하는 문제를 해결하는 것이 목표입니다. 본 논문은 LVLMs가 이러한 **오해의 소지가 있는 시각적 입력(Misleading Visual Inputs)** 에 얼마나 강건한지 종합적으로 평가하기 위한 최초의 벤치마크인 **MVI-Bench** 를 제안합니다.

## 핵심 방법론
**MVI-Bench** 는 시각적 기본 원리(Visual Primitives)에 기반하여 **Visual Concept, Visual Attribute, Visual Relationship** 의 세 가지 계층적 오해 유발 시각적 입력 유형을 정의하고, 이를 대표하는 6개 카테고리를 포함합니다. 총 **1,248개의 전문적으로 주석 처리된 VQA(Visual Question Answering) 인스턴스 쌍** 으로 구성되며, 각 쌍은 정상 이미지와 미묘한 시각적 단서가 포함된 오해 유발 이미지로 이루어져 있습니다. LVLMs의 성능 저하를 정량화하기 위한 새로운 지표인 **MVI-Sensitivity** 가 도입되었습니다.

## 주요 결과
**18개의 최신 LVLMs** 에 대한 실험 결과, 모든 모델이 오해의 소지가 있는 시각적 입력에 대해 상당한 성능 저하를 보였으며, 오픈소스 모델은 **Molmo-7B** 의 경우 **48.69% MVI-Sensitivity** 를 기록하며 특히 취약했습니다. 시각적 지각 능력 향상(예: **GPT-4.1** 을 활용한 캡션 지원 추론 시 **Qwen2.5-VL-7B** 의 Accm이 **45.99%에서 53.85%로 증가** )이 강건성을 크게 개선했지만, 명시적 추론(CoT)은 오픈소스 모델의 성능을 저하시켰습니다. 또한, 모델들이 **시각적 인공물과 타겟 레이블 간의 허위 상관관계** 에 의존하는 경향이 발견되었습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 LVLMs 개발 및 배포 시 **오해의 소지가 있는 시각적 입력** 에 대한 모델의 높은 취약성을 인지하고 비전 인코더를 통해 **시각적 인지 능력** 을 개선하는 데 집중해야 합니다. 현 VQA 훈련 패러다임의 **약한 감독** 이 **허위 상관관계** 를 유발할 수 있으므로, 향후 훈련 및 평가에서는 단순한 정답 여부를 넘어 **기저 추론 과정** 을 고려하는 것이 필수적입니다. **MVI-Bench** 는 이러한 취약점을 체계적으로 평가하고 모델 개선 방향을 제시하는 유용한 도구로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.