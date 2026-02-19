---
title: "[논문리뷰] Empty Shelves or Lost Keys? Recall Is the Bottleneck for Parametric Factuality"
excerpt: "이 [arXiv]에 게시한 'Empty Shelves or Lost Keys? Recall Is the Bottleneck for Parametric Factuality' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Factuality
  - Knowledge Profiling
  - Encoding vs. Recall
  - WikiProfile Benchmark
  - Inference-time Computation
  - Reversal Curse
  - Long-tail Knowledge
  - Parametric Knowledge

permalink: /ai/review/2026-02-19-Empty-Shelves-or-Lost-Keys-Recall-Is-the-Bottleneck-for-Parametric-Factuality/

toc: true
toc_sticky: true

date: 2026-02-19 00:00:00+0900+0900
last_modified_at: 2026-02-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.14080)

**저자:** Nitay Calderon, Eyal Ben-David, Zorik Gekhman, Eran Ofek, Gal Yona



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)의 사실성(factuality) 오류 원인을 '지식 누락(encoding failure, empty shelves)'과 '인코딩된 사실 접근 제한(recall failure, lost keys)'으로 구분하여 명확히 규명하는 것을 목표로 합니다. 이를 통해 모델의 지식 상태를 행동적으로 프로파일링하고, 사실성 개선을 위한 적절한 연구 및 개발 방향을 제시하고자 합니다.

## 핵심 방법론
저자들은 LLM의 지식 상태를 **인코딩 여부** 와 **회상 접근성** (직접 회상, 추론을 통한 회상, 회상 불가)으로 분류하는 **지식 프로파일링 프레임워크** 를 제안했습니다. 이를 위해 **WikiProfile** 이라는 새로운 벤치마크를 구축했으며, 이는 웹 검색 기반의 LLM 자동화 파이프라인을 통해 생성된 2,150개의 사실과 각 사실당 10가지 질문(인코딩, 회상, 인식)으로 구성됩니다. **Gemini-3-Pro** , **GPT-5** 를 포함한 13개 LLM에 대해 약 4백만 개의 응답을 분석하여 **'thinking' (추론 시간 계산)** 의 효과를 측정했습니다.

## 주요 결과
연구 결과, 프론티어 모델인 **GPT-5** 와 **Gemini-3** 는 벤치마크 사실의 **95-98%** 를 인코딩하여 **인코딩 능력이 거의 포화 상태** 에 도달했음을 확인했습니다. 그러나 **회상(recall) 능력** 은 여전히 주요 병목 현상으로 남아있으며, LLM 오류의 상당 부분이 지식 누락이 아닌 접근 실패에서 기인함을 밝혔습니다. 특히 **롱테일 사실** 과 **역방향 질문** 에서 회상 실패가 두드러지게 나타났고, **'thinking' (추론 과정)** 을 통해 인코딩된 지식 중 **40-65%** 의 접근 실패를 복구할 수 있음을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM의 사실성 개선 전략이 모델 스케일링이나 데이터 확충과 같은 **사전 훈련 단계** 보다는, 모델이 이미 학습한 지식을 더 효율적으로 활용하도록 돕는 **후처리 및 추론 시간 개입** 에 집중해야 함을 시사합니다. **Chain-of-Thought (CoT) 프롬프팅** 과 같은 **'thinking' 기법** 은 롱테일 지식이나 역방향 질문 등 난이도 높은 시나리오에서 LLM의 회상 성능을 크게 향상시킬 수 있는 실용적인 방법입니다. **WikiProfile 벤치마크** 는 LLM의 지식 병목을 진단하고, 지식 활용도를 최적화하는 새로운 접근법을 개발하는 데 중요한 도구가 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.