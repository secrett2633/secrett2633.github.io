---
title: "[논문리뷰] Self-Improving Multilingual Long Reasoning via Translation-Reasoning Integrated Training"
excerpt: "Liqian Huang이 arXiv에 게시한 'Self-Improving Multilingual Long Reasoning via Translation-Reasoning Integrated Training' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multilingual Reasoning
  - Reinforcement Learning
  - Machine Translation
  - Question Understanding
  - Self-Improvement
  - Language Models
  - Cross-Lingual Alignment

permalink: /ai/review/2026-02-09-Self-Improving-Multilingual-Long-Reasoning-via-Translation-Reasoning-Integrated-Training/

toc: true
toc_sticky: true

date: 2026-02-09 00:00:00+0900+0900
last_modified_at: 2026-02-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.05940)

**저자:** Junxiao Liu, Zhijun Wang, Yixiao Li, Zhejian Lai, Liqian Huang, Xin Huang, Xue Han, Junlan Feng, Shujian Huang



## 핵심 연구 목표
다국어 환경에서 긴 추론 모델( **LRMs** )이 겪는 어려움, 즉 비영어권 질문에 대해 영어로 추론하려는 경향과 질문 언어로 추론 시 정확도가 현저히 떨어지는 문제를 해결하는 것을 목표로 합니다. 이는 다국어 질문 이해 및 추론 능력의 한계에서 비롯되며, 외부 피드백이나 추가 다국어 데이터 없이 모델 자체적으로 이 두 가지 문제를 동시에 개선하는 **TRIT (Translation-Reasoning Integrated Training)** 프레임워크를 제안합니다.

## 핵심 방법론
**TRIT** 는 두 단계로 구성된 자가 개선 강화 학습 프레임워크입니다. 첫 번째 단계인 **Cross-Lingual Reasoning** 에서는 모델이 영어 질문을 목표 언어로 답변하도록 훈련하며, 신뢰할 수 있는 문제(평균 보상 `ravg >= 0`)만 필터링합니다. 두 번째 단계인 **Translation-Reasoning Integration & Feedback** 에서는 필터링된 영어 질문을 목표 언어로 번역하고( **<Translation> 태그 사용** ), 번역된 질문을 목표 언어로 푸는 훈련을 통합합니다. 번역 품질은 다운스트림 추론 정확도에 기반한 지연 보상(`rtrans = 1` if `Acc > 0`)으로 평가되며, **GRPO (Group Relative Policy Optimization)** 를 사용하여 최적화됩니다.

## 주요 결과
**MMATH** 벤치마크에서 TRIT는 다양한 백본 모델(예: **DeepSeek-Distill-Qwen-1.5B** , **Qwen3-1.7B** , **Qwen3-4B** )에 걸쳐 모든 기준선보다 **평균 7% 포인트 이상** 뛰어난 성능을 보이며, 거의 완벽한 언어 일관성을 달성했습니다. TRIT는 수학 도메인( **MATH500** )과 일반 도메인( **FLORES-200** ) 모두에서 번역 품질을 개선하여 **FLORES-200** 에서 최대 **8.4 COMET 포인트** 의 향상을 기록했습니다. 또한, **cross-lingual 질문 정렬** 을 **10% 포인트 이상** 향상시켜 영어와 비영어 질문 간의 표현 유사성을 높였습니다.

## AI 실무자를 위한 시사점
**TRIT** 는 외부 다국어 데이터나 피드백 없이도 **언어 모델의 다국어 질문 이해 및 추론 능력** 을 동시에 향상시킬 수 있는 실용적인 방안을 제시합니다. 추론 정확도를 번역 품질의 대리 신호로 활용하는 방식은 **데이터가 부족한 저자원 언어** 환경에서 효과적인 **번역-추론 통합 학습** 의 가능성을 열었습니다. 이 방법은 질문 수준의 **cross-lingual alignment** 를 유도하여, AI 시스템이 언어에 관계없이 일관된 의미론적 표현을 학습하고 **더욱 견고한 다국어 추론 시스템** 을 구축하는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.