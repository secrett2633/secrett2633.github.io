---
title: "[논문리뷰] Hop, Skip, and Overthink: Diagnosing Why Reasoning Models Fumble during
  Multi-Hop Analysis"
excerpt: "Reshmi Ghosh이 arXiv에 게시한 'Hop, Skip, and Overthink: Diagnosing Why Reasoning Models Fumble during
  Multi-Hop Analysis' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-hop Question Answering
  - Large Language Models
  - Reasoning Errors
  - Error Taxonomy
  - Human Evaluation
  - Automated Evaluation
  - Overthinking

permalink: /ai/review/2025-8-8-Hop-Skip-and-Overthink-Diagnosing-Why-Reasoning-Models-Fumble-during-Multi-Hop-Analysis/

toc: true
toc_sticky: true

date: 2025-08-08 13:32:22+0900
last_modified_at: 2025-08-08 13:32:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.04699)

**저자:** Reshmi Ghosh, Yashwanth Babu, Srujana Pillarichety, Isha Nalawade, Anushka Yadav



## 핵심 연구 목표
현재 대규모 언어 모델(LLM)이 다단계(multi-hop) 질문 답변 태스크에서 환각(hallucination)을 보이거나 추론에 실패하는 근본적인 원인을 진단하는 것이 주된 목표입니다. 기존의 최종 답변 정확도나 F1 점수로는 파악하기 어려운 추론 과정의 오류 패턴을 체계적으로 분석하고, 모델의 인지적 한계를 이해하여 향후 추론 시스템 개선을 위한 실질적인 지침을 제시하고자 합니다.

## 핵심 방법론
연구진은 추론 동작을 세 가지 핵심 차원(Hops, Coverage, Overthinking)으로 분해하는 **진단 프레임워크** 를 도입했습니다. 이를 위해 **6가지 언어 모델** 의 응답(예: **Claude 3.7 Sonnet** , **DeepSeek-R1** 변형)을 **3가지 다단계 QA 데이터셋** ( **2WikiMultiHopQA** , **HotpotQA** , **MuSiQue** )에서 **인간 전문가가 엄격하게 주석** 했습니다. 또한, **LLM-as-a-Judge 프레임워크** 를 개발하여 **GPT-4.1-mini** 를 활용한 **2단계 자동 평가 프로세스** 를 통해 주석 작업을 확장했습니다.

## 주요 결과
분석 결과, **과도한 사고(Overthinking)** 가 모든 데이터셋과 모델에서 가장 흔하고 체계적인 추론 실패 유형으로 나타났으며, 특히 **MuSiQue** 와 같은 복잡한 태스크에서는 **36.7%에서 61.7%** 에 이르는 높은 비율을 보였습니다. 모델 크기(scaling)는 간단한 추론 성능을 향상시키지만, 복잡한 데이터셋에서는 그 효과가 정체됩니다. **Claude 3.7 Sonnet** 은 가장 안정적이고 정확한 추론 동작을 보였으며, **LLM-as-a-Judge** 는 **74%** 의 홉 일치 정확도와 **50-75%** 의 레이블 일치도를 달성했으나, 복잡한 추론에서는 추가적인 개선이 필요한 것으로 나타났습니다.

## AI 실무자를 위한 시사점
현재 LLM은 복잡한 다중 문서 환경에서 초점화된 추론과 인지적 효율성 측면에서 여전히 한계를 가지고 있으며, **과도한 사고** 가 추론 실패의 주요 원인임을 시사합니다. 따라서, 단순히 최종 답변 정확도를 넘어 **세분화된 오류 분류 체계** 와 **다차원적인 평가 방법론** 이 모델의 추론 충실도(fidelity)를 진단하고 개선하는 데 필수적입니다. **LLM-as-a-Judge** 는 평가 효율성을 높이지만, 미묘하고 복잡한 추론 태스크에서는 여전히 인간 전문가의 판단과 추가적인 개선이 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.