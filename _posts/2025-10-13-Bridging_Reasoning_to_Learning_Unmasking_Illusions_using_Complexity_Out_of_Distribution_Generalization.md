---
title: "[논문리뷰] Bridging Reasoning to Learning: Unmasking Illusions using Complexity Out
  of Distribution Generalization"
excerpt: "Mahdi Ghaznavai이 [arXiv]에 게시한 'Bridging Reasoning to Learning: Unmasking Illusions using Complexity Out
  of Distribution Generalization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Complexity OoD Generalization
  - System-1 Thinking
  - System-2 Reasoning
  - Kolmogorov Complexity
  - Inductive Biases
  - Large Language Models (LLMs)
  - Reasoning Evaluation

permalink: /ai/review/2025-10-13-Bridging_Reasoning_to_Learning_Unmasking_Illusions_using_Complexity_Out_of_Distribution_Generalization/

toc: true
toc_sticky: true

date: 2025-10-13 13:44:18+0900
last_modified_at: 2025-10-13 13:44:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.06274)

**저자:** Mahdi Samiei, Arash Marioriyad, Arman Tahmasebi-Zadeh, Mohamadreza Fereydooni, Mahdi Ghaznavai, Mahdieh Soleymani Baghshah



## 핵심 연구 목표
본 논문은 AI, 특히 **System-2 유형의 추론 능력**을 정의하고 측정할 명확한 프레임워크가 부족하다는 문제를 제기합니다. 기존의 평가 방식이 주로 **System-1 유형의 패턴 인식**에 초점을 맞춰 진정한 추론 능력을 제대로 평가하지 못하는 한계를 극복하고자 합니다. 궁극적으로 **Complexity Out-of-Distribution (Complexity OoD) 일반화**를 통해 추론을 학습의 한 형태로 재해석하고, 인공지능의 진정한 추론 능력을 평가할 새로운 패러다임을 제시하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 추론 능력을 정의하기 위해 **콜모고로프 복잡도(Kolmogorov Complexity)**를 기반으로 **표현 복잡도 OoD**와 **계산 복잡도 OoD**를 제안합니다. 실제 적용을 위해 객체/관계 개수, 추론 단계 개수, 증명 깊이, 해법 토큰 길이 등을 **작동 프록시(operational proxies)**로 사용했습니다. 또한, **GSM8K, AIME, Omni-MATH**와 같은 벤치마크에서 문제의 복잡도에 따른 모델 성능 변화를 분석하여 Complexity OoD 일반화를 실증적으로 평가합니다.

## 주요 결과
이 프레임워크는 추론 능력을 **Complexity OoD 일반화**의 한 형태로 재정의하며, 모델의 진정한 추론 능력은 훈련 데이터의 복잡도 범위를 벗어나는 문제에 대한 일반화 능력으로 측정될 수 있음을 보여줍니다. **GSM8K, AIME, Omni-MATH 데이터셋**에서 실험한 결과, 문제 복잡도(인간 해법 토큰 수 또는 연산 수)가 증가함에 따라 일반적인 LLM의 정확도가 **크게 하락**하는 것을 확인했습니다. 반면, **DeepSeek-R1** 및 **GPT-03-mini**와 같은 추론 중심 모델들은 더 완만한 성능 하락을 보이며, 이는 높은 복잡도에 대한 더 나은 일반화 능력을 시사합니다.

## AI 실무자를 위한 시사점
AI 엔지니어는 단순 평균 정확도에서 벗어나 **Complexity OoD 일반화**를 명시적으로 테스트하는 벤치마크를 설계하고, 다양한 난이도 수준에 걸쳐 모델 성능을 분석해야 합니다. 이를 위해 최종 결과물 대신 **해법 과정(solution traces)에 대한 과정 기반 지도(process-based supervision)**에 집중하고, **무한한 표현 용량, 적응형 계산 깊이, 외부 메모리**와 같은 새로운 **귀납적 편향(inductive biases)**을 설계하여 강력한 System-2 AI를 구축해야 합니다. 데이터 스케일링만으로는 Complexity OoD 문제를 해결할 수 없다는 점이 강조됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.