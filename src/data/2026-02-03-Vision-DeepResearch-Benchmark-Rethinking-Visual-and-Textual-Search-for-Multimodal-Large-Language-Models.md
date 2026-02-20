---
title: "[논문리뷰] Vision-DeepResearch Benchmark: Rethinking Visual and Textual Search for Multimodal Large Language Models"
excerpt: "Shuang Chen이 arXiv에 게시한 'Vision-DeepResearch Benchmark: Rethinking Visual and Textual Search for Multimodal Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Large Language Models
  - Visual Question Answering
  - Deep Research
  - Benchmark
  - Visual Search
  - Textual Search
  - Cropped Search
  - Evaluation

permalink: /ai/review/2026-02-03-Vision-DeepResearch-Benchmark-Rethinking-Visual-and-Textual-Search-for-Multimodal-Large-Language-Models/

toc: true
toc_sticky: true

date: 2026-02-03 00:00:00+0900+0900
last_modified_at: 2026-02-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.02185)

**저자:** Yu Zeng, Wenxuan Huang, Zhen Fang, Shuang Chen, Yufan Shen, Yishuo Cai, Xiaoman Wang, Zhenfei Yin, Lin Chen, Zehui Chen, Shiting Huang, Yiming Zhao, Yao Hu, Philip Torr, Wanli Ouyang, Shaosheng Cao



## 핵심 연구 목표
본 논문은 기존의 다중 모달 대규모 언어 모델(MLLM) 벤치마크가 **시각 검색 중심적이지 않거나** **지나치게 이상적인 검색 시나리오** 에 의존하여 모델의 실제 시각 및 텍스트 검색 능력을 정확히 평가하지 못하는 문제를 해결하고자 합니다. 이를 위해 현실적인 다중 모달 딥 리서치 시스템의 동작을 평가할 수 있는 새로운 벤치마크인 **Vision-DeepResearch Benchmark (VDR-Bench)** 를 구축하는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 **2,000개의 VQA 인스턴스** 로 구성된 **VDR-Bench** 를 구축하기 위해 엄격한 다단계 큐레이션 파이프라인을 사용했습니다. 이 파이프라인에는 수동으로 관심 영역을 잘라내고 웹 규모 시각 검색을 수행하는 **수동 크롭 및 시각 검색** , 검색 결과에서 엔티티를 추출하고 검증하는 **시각 엔티티 추출 및 검증** , 그리고 **지식 그래프 기반 복잡도 확장** 을 통해 다단계 추론 질문을 생성하는 과정이 포함됩니다. 또한, 모델의 시각 검색 능력을 개선하기 위해 **다중 라운드 크롭 검색(Multi-round cropped-search) 워크플로우** 를 제안했습니다.

## 주요 결과
기존 벤치마크에 대한 분석 결과, 많은 질문이 텍스트 단서나 모델의 사전 지식으로 해결 가능하며, **VDR-Bench** 는 모델들이 검색 도구를 적극적으로 사용해야 한다는 것을 보여주며 **Gemini 2.5 Pro** 의 직접 답변 정확도가 **8.2%** 에 불과했습니다. 제안된 **다중 턴 시각 강제(Multi-turn Visual Forcing, MVF)** 전략은 현실적인 시각 검색 시나리오에서 모델 성능을 효과적으로 향상시켰습니다. 예를 들어, **Gemini 2.5 Pro** 의 전체 정확도는 **CIS+TS** 설정에서 **16.2%** 에서 **CIS+TS+MVF** 적용 시 **30.0%** 로 크게 개선되었습니다.

## AI 실무자를 위한 시사점
**VDR-Bench** 는 MLLM 기반의 딥 리서치 시스템을 개발하는 AI 실무자들에게 **모델의 '게으른 검색(lazy search)' 경향** 을 극복하고 실제 환경에서의 성능을 측정할 수 있는 강력한 도구를 제공합니다. 실무자들은 **다중 라운드 크롭 검색** 과 같은 시각 쿼리 정제 전략 및 **교차 모달 증거 검증** 을 시스템 설계에 통합하여 모델의 시각 검색 및 추론 능력을 향상시킬 수 있습니다. 이는 단순히 모델 규모를 확장하는 것을 넘어, **효과적인 검색 도구 활용** 을 장려하는 방향으로 시스템을 발전시켜야 함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.