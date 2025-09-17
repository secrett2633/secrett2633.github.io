---
title: "[논문리뷰] Multimodal Reasoning for Science: Technical Report and 1st Place
  Solution to the ICML 2025 SeePhys Challenge"
excerpt: "Wentao Zhang이 [arXiv]에 게시한 'Multimodal Reasoning for Science: Technical Report and 1st Place
  Solution to the ICML 2025 SeePhys Challenge' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Reasoning
  - Science AI
  - Caption-assisted Reasoning
  - SeePhys Challenge
  - Large Language Models
  - Visual Question Answering
  - Physics Problems
  - Cross-modal Alignment

permalink: /ai/review/2025-9-17-Multimodal_Reasoning_for_Science_Technical_Report_and_1st_Place_Solution_to_the_ICML_2025_SeePhys_Challenge/

toc: true
toc_sticky: true

date: 2025-09-17 13:16:01+0900
last_modified_at: 2025-09-17 13:16:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.06079)

**저자:** Wentao Zhang, Junbo Niu, Ruitao Wu, Hao Liang, zbhpku



## 핵심 연구 목표
본 논문은 인공지능 분야의 근본적인 도전 과제인 **멀티모달 추론**의 한계를 극복하는 것을 목표로 합니다. 특히, 최첨단 **GPT-03**과 같은 모델도 시각 정보 통합에 어려움을 겪는 과학 분야의 멀티모달 시나리오에서 **시각-텍스트 모달리티 간의 격차를 해소**하고 견고한 추론 성능을 확보하고자 합니다.

## 핵심 방법론
저자들은 **캡션 지원 추론 프레임워크**를 제안하며, 이는 자동으로 생성되거나 사람이 제공하는 캡션을 활용하여 시각적 입력과 구조화된 텍스트 추론 간의 다리를 놓습니다. 이 프레임워크는 **Rephrasing, Default Captioning, Grounding, Structured Captioning**과 같은 다양한 캡션 생성 방법을 탐색하며, **Image Reintegration, Adaptive Answer Routing, Format Optimization, Critical Review** 등의 단계별 개선 전략을 포함합니다. 최종 파이프라인은 **Structured Captioning, Image Reintegration, Format Optimization, Critical Review**를 통합합니다.

## 주요 결과
제안된 접근 방식은 **ICML 2025 AI for Math Workshop & Challenge 2: SeePhys** 대회에서 **1위**를 차지하며 그 효과성과 견고함을 입증했습니다. SeePhys-mini 데이터셋에서 전체 정확도 **66.0%**를 달성했으며, **MathVerse 벤치마크**에서도 일반화 능력을 확인했습니다. 특히, 직접적인 시각 입력 없이 **캡션만을 통한 추론**으로도 매우 경쟁력 있는 결과를 얻을 수 있음을 보여주었습니다.

## AI 실무자를 위한 시사점
이 연구는 멀티모달 과학 추론 문제에서 **MLLM의 성능을 향상**시키는 실용적인 방법을 제시합니다. **캡션 지원 추론**은 시각 정보의 효율적인 텍스트화와 **교차 모달 정렬**을 개선하여 복잡한 과학 문제를 해결하는 데 중요한 역할을 할 수 있습니다. AI 실무자들은 이 프레임워크를 통해 **데이터셋의 특징**과 **문제의 복잡성**에 따라 유연하게 캡션 전략을 적용하여 모델의 성능과 투명성을 높일 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.