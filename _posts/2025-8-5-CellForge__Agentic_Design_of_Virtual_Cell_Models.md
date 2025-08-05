---
title: "[논문리뷰] CellForge: Agentic Design of Virtual Cell Models"
excerpt: "Daniel Shao이 [arXiv]에 게시한 'CellForge: Agentic Design of Virtual Cell Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:  - Review
  - Multi-Agent System
  - Virtual Cell Modeling
  - Perturbation Prediction
  - Deep Learning Architectures
  - Automated Scientific Discovery
  - Computational Biology
  - LLM Agents
  - Code Generation

permalink: /ai/review/2025-8-5-CellForge__Agentic_Design_of_Virtual_Cell_Models/

toc: true
toc_sticky: true

date: 2025-08-05 11:12:10+0900
last_modified_at: 2025-08-05 11:12:10+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.02276)

# CellForge: Agentic Design of Virtual Cell Models

**저자:** Xiangru Tang, Zhuoyun Yu, Jiapeng Chen, Yan Cui, Daniel Shao, Weixu Wang, Fang Wu, Yuchen Zhuang, Wenqi Shi, Zhi Huang, Arman Cohan, Xihong Lin, Fabian Theis, Smita Krishnaswamy, Mark Gerstein

**키워드:** `Multi-Agent System`, `Virtual Cell Modeling`, `Perturbation Prediction`, `Deep Learning Architectures`, `Automated Scientific Discovery`, `Computational Biology`, `LLM Agents`, `Code Generation`

## 핵심 연구 목표
이 논문은 복잡한 생물학적 시스템, 다양한 데이터 양식, 그리고 다학제적 전문 지식의 필요성으로 인해 어려운 **가상 세포 모델(Virtual Cell Model)** 구축을 자동화하는 것을 목표로 합니다. 원시 단일 세포 다중 오믹스 데이터와 작업 설명을 입력받아 최적화된 계산 모델과 실행 가능한 코드를 직접 생성하는 **에이전트 기반 시스템**을 개발하여, 정량적으로 세포 반응을 예측합니다.

## 핵심 방법론
**CELLFORGE**는 **다중 에이전트 프레임워크**를 활용하여 데이터 분석, 모델 설계, 실험 실행의 전체 과학 워크플로우를 자동화합니다. 이 시스템은 **Task Analysis**, **Method Design**, **Experiment Execution** 세 가지 핵심 모듈을 통합하며, 특히 **Design 모듈**에서는 전문 에이전트들이 **그래프 기반 토론**을 통해 **새로운 딥러닝 아키텍처**를 공동으로 설계합니다. 또한, 코드 자동 생성 및 **자체 디버깅** 기능을 포함하여 **최적화된 모델 아키텍처와 실행 가능한 코드**를 출력합니다.

## 주요 결과
**CELLFORGE**는 6가지 다양한 데이터셋(유전자 녹아웃, 약물 처리, 사이토카인 자극 등)에서 기존 최첨단 방법론을 일관되게 능가했습니다. 특히 약물 섭동 예측 작업에서는 기존 **ChemCPA** [26] 대비 **예측 오류를 최대 40% 감소**시키고 **상관관계 지표를 20% 개선**했습니다. 또한, 까다로운 scATAC-seq 데이터셋에서는 **선형 회귀 모델 대비 차등 발현 유전자에 대한 Pearson 상관관계에서 약 16배의 향상**을 달성했습니다. 인간 평가에서는 **단일 프롬프트 방식 대비 7.27/10점 vs 2.27/10점**으로 **계획 품질이 월등히 우수**함을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 **LLM 에이전트 기반의 자율 과학 시스템**이 복잡한 생물학적 문제 해결에 효과적임을 보여줍니다. 특히, **다중 에이전트 간의 반복적인 상호작용과 지식 통합**이 단일 프롬프트 방식보다 우수한 솔루션을 도출할 수 있음을 시사합니다. **자동화된 아키텍처 설계 및 코드 생성 능력**은 AI/ML 엔지니어가 수작업 없이 새로운 모델을 신속하게 구축하고 검증하는 데 기여하며, **계산 생물학 연구를 가속화하고 민주화**할 잠재력을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.