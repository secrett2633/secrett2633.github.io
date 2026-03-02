---
title: "[논문리뷰] Ref-Adv: Exploring MLLM Visual Reasoning in Referring Expression Tasks"
excerpt: "[arXiv]에 게시된 'Ref-Adv: Exploring MLLM Visual Reasoning in Referring Expression Tasks' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Referring Expression Comprehension
  - MLLM
  - Visual Reasoning
  - Benchmark Dataset
  - Hard Distractors
  - Grounding Shortcuts
  - Chain-of-Thought
  - Negation

permalink: /ai/review/2026-03-02-Ref-Adv-Exploring-MLLM-Visual-Reasoning-in-Referring-Expression-Tasks/

toc: true
toc_sticky: true

date: 2026-03-02 00:00:00+0900+0900
last_modified_at: 2026-03-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.23898)

**저자:** Qihua Dong, Kuo Yang, Huimin Zeng, Lin Ju, Handong Zhao, Yitian Zhang, Yizhou Wang, Jianglin Lu, Yun Fu



## 핵심 연구 목표
본 연구는 기존 참조 표현 이해(REC) 벤치마크( **RefCOCO/+/g** )가 짧은 표현, 적은 방해물, 중복 설명으로 인한 **grounding shortcut** 등으로 **MLLM** 의 진정한 시각적 추론 및 접지 능력을 제대로 평가하지 못한다는 문제점을 해결하고자 합니다. 이를 위해 **언어적으로 복잡하고, hard distractor** 가 많으며, **shortcut을 억제** 하는 새로운 **REC 벤치마크 Ref-Adv** 를 구축하고 평가하는 것을 목표로 합니다.

## 핵심 방법론
**Ref-Adv** 데이터셋은 **COCO** 및 **OpenImages v7** 에서 **최소 3개 이상의 동일 카테고리 방해물** 이 있는 이미지를 선별하여 구축되었습니다. **GPT-40** 을 활용한 2단계 파이프라인( **Similarity Judgement** 와 **Referring Expression Generation** )을 통해 **minimal yet sufficient** 한 참조 표현을 생성하며, 특히 **부정(negation)** 요소를 통합하여 언어적 복잡성을 높였습니다. 생성된 데이터는 **사람 검증(Human Verification)** 을 거쳐 정확성과 **hard distractor** 의 존재를 확인했습니다. 다양한 최신 **MLLM** 들을 **CoT(Chain-of-Thought)** 및 **SoM(Set-of-Marks)** 설정으로 **Ref-Adv** 에서 평가하고, **단어 순서 교란** 및 **디스크립터 삭제** 등의 방법론으로 **shortcut** 회피 능력을 분석했습니다.

## 주요 결과
**Ref-Adv** 는 기존 벤치마크 대비 **평균 표현 길이(11.5단어)** 및 **방해물 수(4.01개)** 가 크게 증가했으며, **부정 표현 비율도 21.25%** 로 높아 언어적 복잡성이 향상되었습니다. 기존 벤치마크에서 90% 이상의 높은 정확도를 보이던 **MLLM** 들이 **Ref-Adv** 에서는 **Qwen2.5-VL-72B** 가 **RefCOCO의 92.7%에서 58.3%** 로 성능이 크게 하락하여 **MLLM** 의 시각적 추론 능력에 상당한 간극이 있음을 드러냈습니다. **CoT** 는 **Ref-Adv** 에서 모델 성능을 전반적으로 향상시켰으며, 특히 **GPT-40** 이 **CoT** 사용 시 **63.7%** 로 가장 높은 정확도를 달성했습니다. **단어 순서 교란 및 디스크립터 삭제** 실험에서 **Ref-Adv** 의 성능 하락 폭이 기존 벤치마크보다 커, **grounding shortcut** 이 효과적으로 억제되었음을 입증했습니다.

## AI 실무자를 위한 시사점
**Ref-Adv** 는 **MLLM** 의 진정한 시각적 추론 및 접지 능력을 평가하는 데 필요한 엄격하고 포괄적인 벤치마크를 제공합니다. 현재 **MLLM** 들이 기존 **REC 벤치마크** 에서 높은 성능을 보이지만, 이는 **shortcut** 에 의존한 결과일 수 있으며, 더 복잡한 실제 시나리오에서는 개선이 필요함을 시사합니다. **Chain-of-Thought** 와 같은 명시적 추론 전략이 복잡한 REC 태스크에서 **MLLM** 의 성능을 향상시킬 수 있는 중요한 방향임을 강조하며, **hard distractor** 와 **언어적으로 난이도 높은 표현** 에 강건한 모델 개발에 집중해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.