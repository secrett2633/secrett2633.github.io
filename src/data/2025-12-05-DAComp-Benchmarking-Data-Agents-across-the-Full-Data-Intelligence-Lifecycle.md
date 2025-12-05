---
title: "[논문리뷰] DAComp: Benchmarking Data Agents across the Full Data Intelligence Lifecycle"
excerpt: "이 [arXiv]에 게시한 'DAComp: Benchmarking Data Agents across the Full Data Intelligence Lifecycle' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Data Agents
  - Benchmarking
  - Data Engineering
  - Data Analysis
  - LLM-as-Judge
  - Full Data Intelligence Lifecycle
  - Repository-Level
  - Open-Ended Tasks

permalink: /ai/review/2025-12-05-DAComp-Benchmarking-Data-Agents-across-the-Full-Data-Intelligence-Lifecycle/

toc: true
toc_sticky: true

date: 2025-12-05 00:00:00+0900+0900
last_modified_at: 2025-12-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.04324)

**저자:** Fangyu Lei, Jinxiang Meng, Yiming Huang, Junjie Zhao, Yitong Zhang, Jianwen Luo, Xin Zou, Ruiyi Yang, Wenbo Shi, Yan Gao, Shizhu He, Zuo Wang, Qian Liu, Yang Wang, Ke Wang, Jun Zhao, Kang Liu



## 핵심 연구 목표
본 논문은 기존 벤치마크가 놓치고 있는 **실제 기업 데이터 인텔리전스 워크플로우의 복잡성** 을 반영하여, **데이터 에이전트의 포괄적인 성능을 평가** 하는 **DAComp** 벤치마크를 제시합니다. 특히, **대규모 코드 구현** 능력과 **개방형 분석 추론** 능력을 동시에 평가하여, 고도로 자율적인 데이터 에이전트 개발을 위한 현실적인 테스트베드를 제공하는 것을 목표로 합니다.

## 핵심 방법론
DAComp는 **데이터 엔지니어링(DE)** 및 **데이터 분석(DA)** 의 두 가지 축으로 구성된 **210개 태스크** 를 포함합니다. **DAComp-DE** 는 **아키텍처 설계** , **파이프라인 구현** , **시스템 진화** 와 같은 저장소 수준의 엔지니어링 과제를, **DAComp-DA** 는 **전략적 계획, 반복적 분석, 통찰력 합성** 을 포함하는 개방형 비즈니스 문제를 다룹니다. 평가에는 DE 태스크를 위한 **실행 기반 다중 지표 평가** 와 개방형 태스크를 위한 **계층적 루브릭(rubric) 기반 LLM 심사자** ( **LLM-judge** )가 사용됩니다.

## 주요 결과
실험 결과, 최첨단 에이전트조차 DAComp에서 현저히 낮은 성능을 보였습니다. **DE 태스크의 성공률은 20% 미만** 으로, **홀리스틱 파이프라인 오케스트레이션** 능력의 심각한 병목 현상을 드러냈으며, **중간 규모 코드 수정** 에서 특히 어려움을 겪었습니다. **DA 태스크의 평균 점수는 40% 미만** 으로, 에이전트의 **개방형 추론 능력** 에 대한 심층적인 결함을 강조하며, **GPT-5** 와 같은 모델도 상당한 한계를 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 AI/ML 실무자들이 **단순 코드 생성** 을 넘어 **복잡한 시스템 오케스트레이션** 및 **개방형 분석 추론** 역량 개발에 집중해야 함을 시사합니다. 데이터 엔지니어링과 분석이 요구하는 **서로 다른 능력의 중요성** 을 명확히 진단하며, **정확한 전역 데이터 계보 유지** 와 **장기 의존성 처리** 를 위한 **강력한 컨텍스트 유지** 및 **오류 허용 시스템** 구축의 필요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.