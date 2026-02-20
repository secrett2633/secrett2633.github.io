---
title: "[논문리뷰] MADD: Multi-Agent Drug Discovery Orchestra"
excerpt: "arXiv에 게시된 'MADD: Multi-Agent Drug Discovery Orchestra' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-Agent System
  - Drug Discovery
  - LLM
  - Hit Identification
  - Virtual Screening
  - Generative AI
  - Property Prediction
  - Automated Machine Learning

permalink: /ai/review/2025-11-13-MADD-Multi-Agent-Drug-Discovery-Orchestra/

toc: true
toc_sticky: true

date: 2025-11-13 00:00:00+0900+0900
last_modified_at: 2025-11-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.08217)

**저자:** Gleb V. Solovev, Alina B. Zhidkovskaya, Anastasia Orlova, Nina Gubina, Anastasia Vepreva, Rodion Golovinskii, Ilya Tonkii, Ivan Dubrovsky, Ivan Gurev, Dmitry Gilemkhanov, Denis Chistiakov, Timur A. Aliev, Ivan Poddiakov, Galina Zubkova, Ekaterina V. Skorb, Vladimir Vinogradov, Alexander Boukhanovsky, Nikolay O. Nikitin, Andrei Dmitrenko, Anna V. Kalyuzhnaya, and Andrey Savchenko



## 핵심 연구 목표
초기 신약 개발 과정에서 **히트 분자(hit molecule) 식별** 에 필요한 막대한 자원과 기존 AI 방법론의 복잡성 및 접근성 부족 문제를 해결하는 것이 목표입니다. 특히, LLM 단독으로는 분자 생성 및 특성 예측에서 한계가 있으므로, **다중 에이전트 아키텍처** 를 통해 포괄적인 약물 발견 워크플로우를 자동화하고 성능을 극대화하고자 합니다.

## 핵심 방법론
MADD는 **Decomposer** , **Orchestrator** , **Summarizer** , **Chat Agent** 의 네 가지 전문 에이전트로 구성됩니다. **Decomposer** 는 사용자 쿼리를 하위 작업으로 분해하고, **Orchestrator** 는 **LSTM-based GAN** 및 **Transformer-based CVAE** 와 같은 **분자 생성 모델** 과 **FEDOT AutoML 프레임워크** 를 활용한 **특성 예측 모델** 을 호출하여 실행 계획을 조율합니다. **AutoDock Vina GPU 2.1** 을 통한 도킹 점수 계산 및 **RDKit 기반** 합성 용이성(SA), 약물 유사성(QED) 필터링 등의 도구가 통합되었습니다. MADD의 에이전트 뒤에는 **Llama-3.1-70b** LLM이 기본 모델로 사용되었습니다.

## 주요 결과
MADD는 **7가지 약물 발견 사례** 에서 기존 LLM 기반 솔루션 대비 우수한 성능을 입증했습니다. 특히, 가장 복잡한 시나리오(Dataset L)에서 **종합 파이프라인 정확도(FA) 79.8%** 를 달성하여 ChemAgent의 **16.4%** 를 크게 상회했습니다. **Transformer 모델** 은 6가지 테스트 사례 중 3가지에서 최고 성능을 달성했으며, 혈소판 감소증 사례 연구에서는 SYK-FBRL 대비 효율적으로 **132개의 히트 분자** 를 생성하며 향상된 도킹 점수, QED, SA 특성을 가진 분자를 도출했습니다. 또한, AutoML을 통해 훈련된 ML 파이프라인은 IC50 예측에서 수동 사전 훈련 모델보다 대부분의 경우 더 나은 **F1 점수** 를 달성했습니다.

## AI 실무자를 위한 시사점
MADD는 **다중 에이전트 시스템** 과 **전문 AI/ML 도구** 를 결합하여 복잡한 약물 발견 프로세스를 자동화하는 강력한 청사진을 제공합니다. 이는 AI 연구자 및 엔지니어가 LLM의 유연성과 정밀한 화학 도구의 전문성을 활용하여 **신약 개발 효율성** 을 높일 수 있음을 시사합니다. 하지만 새로운 질병 사례에 대한 **데이터 준비 및 모델 훈련 시간** 과 시스템의 **블랙박스 특성** 을 개선하는 연구가 필요하며, 공개된 벤치마크는 미래 약물 설계 에이전트 개발의 중요한 기반이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.