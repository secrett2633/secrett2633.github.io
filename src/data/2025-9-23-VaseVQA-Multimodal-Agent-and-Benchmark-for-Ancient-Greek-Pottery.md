---
title: "[논문리뷰] VaseVQA: Multimodal Agent and Benchmark for Ancient Greek Pottery"
excerpt: "Shiya Huang이 [arXiv]에 게시한 'VaseVQA: Multimodal Agent and Benchmark for Ancient Greek Pottery' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Large Language Models
  - Visual Question Answering
  - Reinforcement Learning
  - Cultural Heritage
  - Ancient Greek Pottery
  - Supervised Fine-Tuning
  - Benchmark

permalink: /ai/review/2025-9-23-VaseVQA-Multimodal-Agent-and-Benchmark-for-Ancient-Greek-Pottery/

toc: true
toc_sticky: true

date: 2025-09-23 13:36:03+0900
last_modified_at: 2025-09-23 13:36:03+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.17191)

**저자:** Jinchao Ge, Tengfei Cheng, Biao Wu, Zeyu Zhang, Shiya Huang



## 핵심 연구 목표
본 연구는 고대 그리스 도자기에 대한 전문가 수준의 추론 능력을 갖춘 **MLLM(Multimodal Large Language Models)** 에이전트를 개발하는 것을 목표로 합니다. 일반적인 MLLM이 부족한 도메인 전문성과 **SFT(Supervised Fine-Tuning)** 모델의 피상적인 패턴 학습 문제를 극복하여, 유물의 진위 확인 및 역사적 귀속에 대한 강력하고 신뢰할 수 있는 추론 능력을 확보하고자 합니다.

## 핵심 방법론
저자들은 **VaseVL**이라는 **SFT-then-RL** 시스템을 제안합니다. 이는 **7가지 질문 유형(Fabric, Technique, Shape, Provenance, Attribution, Date, Decoration) 분류 체계**를 구축하고, **SFT 모델의 유형별 성능 격차를 진단**한 후, 이를 목표로 하는 **진단 기반, 분류 체계 조건부 보상**으로 **GRPO(Group Relative Policy Optimization) 강화 학습**을 수행합니다. 보상 함수는 **키워드 중첩**과 **의미적 유사성**을 결합하며, 부족한 부분에 더 높은 가중치를 부여합니다. 또한, **31,773개 이미지**와 **93,544개 QA 쌍**으로 구성된 **VaseVQA 벤치마크**와 **ANLS-기반 정확도**, **BLEU@1** 등의 유형별 평가 스크립트도 함께 공개됩니다.

## 주요 결과
**VaseVL**은 **SFT-only 베이스라인** 대비 **Attribution 스코어를 56.96%에서 60.83%로 향상**시키고, **Decoration 질문의 BLEU@1 스코어를 2.57에서 9.82로 대폭 개선**했습니다. 이는 보상 엔지니어링이 목표로 삼았던 영역에서 상당한 성능 향상을 입증합니다. 특히, 제로샷 MLLM(**Qwen-2.5-VL**)의 저조한 성능(Attribution 11.50%)에 비해 **VaseVL**은 **최신 기술 수준의 결과**를 달성하며, 문화유산 도메인에서의 **합성적 견고성**과 **사실적 정확성**을 크게 향상시켰습니다.

## AI 실무자를 위한 시사점
문화유산과 같이 **특정 도메인의 심층적인 전문 지식**이 요구되는 분야에서 **MLLM의 추론 능력**을 효과적으로 향상시키는 방법론을 제시합니다. **진단 기반의 보상 설계**와 **강화 학습(RL)**의 조합은 단순 **SFT**의 한계를 극복하고, 모델이 **피상적인 패턴을 넘어 심층적인 의미를 학습**하도록 유도하는 강력한 접근법임을 보여줍니다. **VaseVQA 벤치마크**는 향후 문화유산 분석을 위한 **도메인 특화 AI 모델 개발 및 평가**에 있어 중요한 자원이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.