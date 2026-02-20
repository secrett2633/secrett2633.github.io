---
title: "[논문리뷰] HalluGuard: Evidence-Grounded Small Reasoning Models to Mitigate
  Hallucinations in Retrieval-Augmented Generation"
excerpt: "Radu State이 arXiv에 게시한 'HalluGuard: Evidence-Grounded Small Reasoning Models to Mitigate
  Hallucinations in Retrieval-Augmented Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Hallucination Detection
  - Retrieval-Augmented Generation (RAG)
  - Small Reasoning Model (SRM)
  - Preference Fine-tuning
  - ORPO
  - Evidence Grounding
  - Fact-checking

permalink: /ai/review/2025-10-8-HalluGuard-Evidence-Grounded-Small-Reasoning-Models-to-Mitigate-Hallucinations-in-Retrieval-Augmented-Generation/

toc: true
toc_sticky: true

date: 2025-10-08 13:48:12+0900
last_modified_at: 2025-10-08 13:48:12+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.00880)

**저자:** Loris Bergeron, Ioana Buhnila, Jérôme François, Radu State



## 핵심 연구 목표
대규모 언어 모델(LLM)과 소형 언어 모델(SLM)이 RAG 애플리케이션에서 흔히 겪는 환각(Hallucination) 문제를 해결하고, 사용자 신뢰도와 설명 가능성을 저해하는 문제를 완화하는 것이 주요 목표입니다. 특히, 문서-주장 쌍의 관계를 접지(grounded) 또는 환각(hallucinated)으로 분류하고, **증거 기반의 정당화** 를 제공할 수 있는 모델을 개발하고자 합니다.

## 핵심 방법론
본 논문은 **Qwen3-4B** 백본을 기반으로 하는 **4B-파라미터 Small Reasoning Model (SRM)인 HalluGuard** 를 제안합니다. **FineWeb** 에서 파생되고 **Llama3.3-70B** 로 정제된 **HalluClaim** 이라는 대규모 합성 데이터셋을 사용했으며, **Odds Ratio Preference Optimization (ORPO)** 및 **LoRA** 를 활용한 **선호도 기반 미세 조정** 을 통해 훈련되었습니다. 데이터 생성 과정에는 **다단계 큐레이션** , **프롬프트 기반 데이터 개혁** , 그리고 **LLM 기반 합의 필터링 (Llama-3.3-70B, Mistral Large 2)** 이 포함되어 데이터 품질을 높였습니다.

## 주요 결과
**HalluGuard-4B** 는 **LLM-AggreFact** 벤치마크의 **RAGTruth** 하위 집합에서 **84.0%** 의 균형 정확도(BAcc)를 달성하여, **MiniCheck (7B; 84.0%)** 및 **Granite Guardian 3.3 (8B; 82.2%)** 과 동등하거나 더 우수한 성능을 보이면서도 절반 수준의 파라미터를 사용합니다. 전체 **LLM-AggreFact** 벤치마크에서는 **75.7% BAcc** 를 기록하여 **GPT-40 (75.9%)** 과 같은 대규모 범용 LLM에 필적하는 성능을 입증했습니다. 또한, 추론 과정 비활성화 시 BAcc가 **8.1%** 감소하며, **ORPO** 대신 SFT만 사용했을 때는 BAcc가 **27.6%** 나 감소하여 각 구성 요소의 중요성을 강조했습니다.

## AI 실무자를 위한 시사점
**HalluGuard** 는 RAG 시스템에서 **환각 탐지** 와 **설명 가능한 정당화** 를 제공하는 데 있어 **소형 모델** 의 강력한 잠재력을 보여줍니다. 이는 **비용 효율성** 과 **온프레미스 배포** 와 같은 리소스 제약이 있는 환경, 특히 엄격한 규제 준수 요구 사항이 있는 금융 부문에서 **신뢰할 수 있는 AI 솔루션** 을 구축하는 데 중요한 기여를 합니다. **ORPO** 와 같은 미세 조정 기법을 통해 대규모 모델의 추론 능력을 소형 모델로 효과적으로 전이하는 전략은 실무적인 AI 개발에 유용한 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.