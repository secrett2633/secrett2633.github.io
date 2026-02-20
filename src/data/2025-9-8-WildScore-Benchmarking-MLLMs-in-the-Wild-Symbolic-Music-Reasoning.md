---
title: "[논문리뷰] WildScore: Benchmarking MLLMs in-the-Wild Symbolic Music Reasoning"
excerpt: "Amit Namburi이 arXiv에 게시한 'WildScore: Benchmarking MLLMs in-the-Wild Symbolic Music Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Large Language Models
  - Symbolic Music Reasoning
  - Music Score Analysis
  - Benchmarking
  - Visual Question Answering
  - In-the-Wild Data
  - Music Theory

permalink: /ai/review/2025-9-8-WildScore-Benchmarking-MLLMs-in-the-Wild-Symbolic-Music-Reasoning/

toc: true
toc_sticky: true

date: 2025-09-08 13:10:18+0900
last_modified_at: 2025-09-08 13:10:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.04744)

**저자:** Gagan Mundada, Yash Vishe, Amit Namburi, Xin Xu, Zachary Novack, Julian McAuley, Junda Wu



## 핵심 연구 목표
본 논문은 **Multimodal Large Language Models (MLLMs)** 의 상징적 음악 분석 및 추론 능력에 대한 실세계 적용 가능성을 평가하는 것을 목표로 합니다. 기존 벤치마크들이 부족했던 **인-더-와일드(in-the-wild) 데이터** 를 기반으로 MLLMs가 실제 악보를 해석하고 복잡한 음악학적 질문에 답변하는 역량을 체계적으로 측정하고자 합니다.

## 핵심 방법론
연구진은 실제 작곡가의 악보와 사용자 생성 질문으로 구성된 **WildScore** 벤치마크를 도입했습니다. 이는 **Reddit r/musictheory 커뮤니티** 에서 수집된 데이터를 바탕으로 하며, 음악학적 개념을 포괄하는 **체계적인 다단계 분류 체계** 를 제안합니다. 복잡한 음악 추론을 **다중 선택 질문(MCQ)** 형식으로 구성하고, **GPT-4.1-mini** 를 활용하여 질문 생성 및 오답 후보를 구성했습니다.

## 주요 결과
**WildScore** 벤치마크에서 **GPT-4.1-mini** 가 이미지와 텍스트를 함께 사용했을 때 **68.31%** 의 가장 높은 평균 정확도를 달성했습니다. 시각적 맥락은 **2.55%p** 의 성능 향상을 가져왔으나, **리듬 및 박자(63.20%)** 와 **텍스처(64.15%)** 영역에서는 여전히 낮은 정확도를 보였습니다. 특히 소형 모델들은 기본적인 기호 인지 단계에서부터 오류가 발생하며, **GPT-4.1-mini** 의 지각 전용 테스트 결과도 **52%** 에 불과해 악보 인식의 한계를 드러냈습니다.

## AI 실무자를 위한 시사점
본 연구는 **MLLMs** 가 음악 기호 인식과 추론에서 큰 잠재력을 가지고 있음을 보여주지만, 깊이 있는 음악적 추상화와 리듬 해석에서는 여전히 발전이 필요함을 시사합니다. 실제 악보의 복잡한 시각적 정보를 정확히 해석하는 **강력한 시각-기호 추출 능력** 과 **전문 도메인에 특화된 사전 학습** 이 MLLMs의 음악 이해를 심화하는 데 필수적임을 강조합니다. **WildScore** 는 향후 음악 분석 MLLM 개발을 위한 중요한 평가 도구로 활용될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.