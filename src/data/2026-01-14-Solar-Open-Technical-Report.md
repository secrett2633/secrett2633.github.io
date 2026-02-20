---
title: "[논문리뷰] Solar Open Technical Report"
excerpt: "arXiv에 게시된 'Solar Open Technical Report' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Mixture-of-Experts
  - Korean LLM
  - Synthetic Data Generation
  - Curriculum Learning
  - Reinforcement Learning
  - Tokenizer Optimization
  - Multilingual AI

permalink: /ai/review/2026-01-14-Solar-Open-Technical-Report/

toc: true
toc_sticky: true

date: 2026-01-14 00:00:00+0900+0900
last_modified_at: 2026-01-14 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.07022)

**저자:** Upstage Solar Team



## 핵심 연구 목표
Solar Open 논문은 기존 LLM 생태계에서 **영어와 중국어 외의 언어들** , 특히 **한국어와 같은 데이터 부족 언어** 가 겪는 모델 개발의 어려움을 해결하는 것을 목표로 합니다. 데이터 희소성, 추론 능력 부족, 확장 가능한 강화 학습(RL) 부재라는 세 가지 상호 연결된 도전 과제를 극복하여 경쟁력 있는 LLM을 구축하고자 합니다. 궁극적으로는 이러한 **소외된 언어를 위한 AI 개발 방법론** 을 제시하고 LLM 접근성을 민주화하는 데 기여합니다.

## 핵심 방법론
본 연구는 세 가지 주요 방법론을 제시합니다. 첫째, 데이터 희소성 극복을 위해 **4.5T 토큰 규모의 고품질, 도메인 특화, RL 지향 합성 데이터** 를 적극적으로 생성했습니다. 둘째, **20조 토큰에 이르는 다단계 교육 커리큘럼** 을 통해 데이터 구성, 품질 임계값, 도메인 커버리지를 최적화하여 점진적인 학습을 유도했습니다. 셋째, 확장 가능한 추론 능력을 위해 생성, 보상 계산, 훈련을 분리하는 **SnapPO(Snapshot Sampling for Policy Optimization)** 프레임워크를 적용하여 효율적인 강화 학습을 가능하게 했습니다. 또한, 한국어에 최적화된 **196,608 크기의 맞춤형 BPE 토크나이저** 를 설계하고 **102B 파라미터 MoE 아키텍처** 를 채택했습니다.

## 주요 결과
Solar Open은 한국어 벤치마크에서 **gpt-oss-120b-high 모델** 을 여러 부문에서 능가하는 선도적인 성능을 달성했습니다. 특히, 금융( **KBankMMLU에서 +3.0pp** ), 법률( **KBL에서 +2.7pp** ), 의료( **KorMedMCQA에서 +8.6pp** ) 도메인 전문성에서 상당한 우위를 보였습니다. 영어 성능 또한 **MMLU 88.2%, AIME 2024 91.7%** 를 기록하며 gpt-oss-120b-medium과 유사하거나 이를 뛰어넘는 경쟁력을 보였습니다. 또한, GLM-4.5-Base와 동등한 성능을 **영어는 48%(10.7T 토큰), 한국어는 77%(17.8T 토큰)** 의 훈련 예산으로 달성하여 효율성을 입증했습니다. 토크나이저 효율성도 한국어 비추론 출력에서 **4.69 Bytes/Token** 으로 gpt-oss 대비 **36% 향상** 되었습니다.

## AI 실무자를 위한 시사점
Solar Open의 개발 과정은 **데이터 희소성을 겪는 언어를 위한 LLM 구축** 에 대한 실질적인 청사진을 제공합니다. 특히, **합성 데이터 생성과 체계적인 커리큘럼 학습** 의 중요성을 강조하며, 이는 제한된 자원으로 고성능 모델을 개발하려는 AI 엔지니어에게 중요한 전략이 될 수 있습니다. **SnapPO 프레임워크** 는 다중 목표 및 다중 도메인 RL 훈련을 확장 가능하게 만드는 효율적인 접근법을 제시하여, 복잡한 RL 시스템 설계에 유용합니다. 또한, **언어 특화 토크나이저 최적화** 와 **MoE 아키텍처** 의 활용은 성능과 효율성을 동시에 추구하는 데 핵심적인 요소임을 보여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.