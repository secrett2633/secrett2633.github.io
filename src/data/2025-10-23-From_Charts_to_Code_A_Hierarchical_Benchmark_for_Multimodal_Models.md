---
title: "[논문리뷰] From Charts to Code: A Hierarchical Benchmark for Multimodal Models"
excerpt: "Dongxing Mao이 [arXiv]에 게시한 'From Charts to Code: A Hierarchical Benchmark for Multimodal Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Chart-to-Code
  - Multimodal Models
  - Hierarchical Benchmark
  - Chart Understanding
  - Code Generation
  - Evaluation Metrics
  - Benchmarking

permalink: /ai/review/2025-10-23-From_Charts_to_Code_A_Hierarchical_Benchmark_for_Multimodal_Models/

toc: true
toc_sticky: true

date: 2025-10-23 13:08:59+0900
last_modified_at: 2025-10-23 13:08:59+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.17932)

**저자:** Jiahao Tang, Henry Hengyuan Zhao, Lijian Wu, Yifei Tao, Dongxing Mao, Yang Wan, Jingru Tan, Min Zeng, Min Li, Alex Jinpeng Wang



## 핵심 연구 목표
기존 차트-코드(chart-to-code) 벤치마크가 단순한 재현 작업에 치중하여 대규모 멀티모달 모델(LMM)의 실제 적용 능력과의 격차를 보였습니다. 이에 본 연구는 LMM의 차트 이해 및 코드 생성 능력을 실제 사용 시나리오와 유사하게 점진적으로 난이도를 높여 종합적으로 평가할 수 있는 새로운 계층적 벤치마크를 제시하는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 **Chart2Code**라는 **세 가지 계층적 난이도 레벨**의 벤치마크를 제안합니다. 이는 **Level 1 (Chart Reproduction)**, **Level 2 (Chart Editing)**, **Level 3 (Long-Table to Chart Generation)**으로 구성되며, **22가지 차트 유형**에 걸쳐 **총 2,023개 태스크**를 포함합니다. 모델 성능 평가는 생성된 코드의 실행 가능성(`Exec. Rate`)과 **GPT-5-mini**를 활용한 코드 수준의 **LLM-score**, 그리고 렌더링된 차트 이미지의 시각적 충실도를 평가하는 **LMM-score**를 사용하여 다각적으로 진행됩니다.

## 주요 결과
벤치마크 결과, 최신 **GPT-5** 모델조차 **Level 2** 편집 태스크에서 코드 기반 평가 **평균 0.57**, 차트 품질 평가 **0.22**라는 저조한 성능을 보였습니다. 특히 **Level 3 (Long-Table to Chart Generation)**에서는 대부분의 모델이 **실행률 50% 미만**을 기록했으며, 시각적 충실도(`LMM-score`)는 **거의 0에 수렴**하는 등 복잡한 태스크에서 LMM의 성능이 급격히 저하됨을 확인했습니다. 이는 LMM이 단순 재현에는 유망하지만, 복잡한 시각화 요구 사항을 충족하는 데는 한계가 있음을 시사합니다.

## AI 실무자를 위한 시사점
**Chart2Code** 벤치마크는 현재 LMM이 **단순한 차트 재현**에는 상당한 가능성을 보이지만, **복잡한 차트 편집, 긴 컨텍스트의 데이터 처리, 그리고 픽셀 수준의 시각적 정확성**을 요구하는 실제 시나리오에서는 여전히 상당한 개선이 필요함을 강조합니다. AI 실무자들은 LMM을 활용한 시각화 자동화 시 이러한 한계를 고려해야 하며, 더욱 **견고하고 다목적적인 LMM 개발**을 위한 연구 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.