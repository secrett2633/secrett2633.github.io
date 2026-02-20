---
title: "[논문리뷰] Aryabhata: An exam-focused language model for JEE Math"
excerpt: "Sandeep Varma이 arXiv에 게시한 'Aryabhata: An exam-focused language model for JEE Math' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Language Model
  - Math Reasoning
  - JEE
  - Supervised Fine-Tuning
  - Reinforcement Learning
  - Model Merging
  - Chain-of-Thought
  - Curriculum Learning

permalink: /ai/review/2025-8-13-Aryabhata-An-exam-focused-language-model-for-JEE-Math/

toc: true
toc_sticky: true

date: 2025-08-13 13:29:23+0900
last_modified_at: 2025-08-13 13:29:23+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.08665)

**저자:** Sandeep Varma, Sachin Dharashivkar, RitvikPW



## 핵심 연구 목표
본 논문은 인도 입학 시험(JEE) 수학 영역에 최적화된 **7B 파라미터** 의 경량 언어 모델인 **Aryabhata 1.0** 을 제안합니다. 기존 대규모 언어 모델(LLM)이 교육적 활용에 부적합했던 문제를 해결하고, 학생 이해를 돕는 정확하고 투명하며 효율적인 단계별 추론 능력을 제공하는 것을 목표로 합니다.

## 핵심 방법론
강력한 오픈 소스 추론 모델인 **Qwen2.5-Math-7B-Instruct** , **AceMath-7B-Instruct** , **DeepSeek-R1-Distill-Qwen-7B** 를 **선형 병합** 하여 모델을 구축했습니다. 이후 **best-of-n 거부 샘플링** 으로 검증된 **CoT(Chain-of-Thought)** 추론 데이터를 큐레이션하고, **커리큘럼 학습** 방식을 적용한 **지도 미세 조정(SFT)** 을 수행했습니다. 또한, **그룹 상대적 이점 추정** 과 **적응형 그룹 크기 조정** , **점진적 온도 조절** 과 같은 탐색 전략을 포함하는 **RLVR(Verifiable Rewards를 사용한 강화 학습)** 을 통해 성능을 강화했습니다.

## 주요 결과
Aryabhata 1.0은 내부 분포(JEE Main 2025) 및 외부 분포(MATH, GSM8K) 벤치마크 모두에서 뛰어난 성능을 보였습니다. JEE Main 2025 1월 세션에서 **86.0%** , 4월 세션에서 **90.2%** 의 정확도를 달성하며 기존 모델들을 능가했으며, 평균 약 **2K 토큰** 으로 효율적인 추론을 제공했습니다. 또한, MATH 500에서 **83.6%** , GSM8K에서 **94.8%** 의 정확도를 기록하며 견고한 일반화 능력을 입증했습니다.

## AI 실무자를 위한 시사점
**Aryabhata 1.0** 은 소형 언어 모델이 특정 도메인의 복잡한 수학 추론에서 높은 정확도와 효율성을 달성할 수 있음을 보여줍니다. 특히 **모델 병합** , **커리큘럼 학습 기반 SFT** , **RLVR** 의 조합은 교육용 AI 애플리케이션을 위한 강력한 기반을 제공합니다. 이 모델의 오픈 소스 공개는 **시험 중심 AI 시스템** 개발을 가속화하고, 학생들의 학습 결과 개선에 기여할 잠재력을 가지고 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.