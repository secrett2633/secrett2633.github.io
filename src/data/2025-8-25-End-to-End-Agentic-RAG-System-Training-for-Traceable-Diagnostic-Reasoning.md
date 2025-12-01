---
title: "[논문리뷰] End-to-End Agentic RAG System Training for Traceable Diagnostic
  Reasoning"
excerpt: "Pengcheng Qiu이 [arXiv]에 게시한 'End-to-End Agentic RAG System Training for Traceable Diagnostic
  Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic RAG
  - Medical Diagnosis
  - Reinforcement Learning
  - Traceable AI
  - Large Language Models
  - Clinical Decision Support
  - Out-of-Distribution Generalization
  - Reward Design

permalink: /ai/review/2025-8-25-End-to-End-Agentic-RAG-System-Training-for-Traceable-Diagnostic-Reasoning/

toc: true
toc_sticky: true

date: 2025-08-25 13:13:07+0900
last_modified_at: 2025-08-25 13:13:07+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.15746)

**저자:** Qiaoyu Zheng, Yuze Sun, Chaoyi Wu, Weike Zhao, Pengcheng Qiu, Yongguo Yu, Kun Sun, Yanfeng Wang, Ya Zhang, Pengcheng Qiu, Weidi Xie



## 핵심 연구 목표
본 논문은 기존 RAG(Retrieval-Augmented Generation) 시스템이 의료 진단 분야에서 겪는 한계, 즉 수동적인 프롬프트 엔지니어링, 제한된 피드백 적응, 그리고 불투명한 추론 과정으로 인한 신뢰성 부족 문제를 해결하고자 합니다. 특히 복잡하거나 희귀한 질병 진단 시 LLM의 진단 능력 부족과 **추적 가능한 진단 추론(traceable diagnostic reasoning)** 의 필요성에 주목합니다.

## 핵심 방법론
저자들은 **Deep-DxSearch** 라는 **종단 간 RL 기반(end-to-end RL-based)** 에이전트 RAG 시스템을 제안합니다. 이 시스템은 **대규모 의료 검색 코퍼스** 를 활용하며, `reason`, `lookup`, `match`, `search`, `diagnose`의 **5가지 액션 모드** 를 통해 단계별 진단 추론을 수행합니다. 특히 **포맷 계수(format coefficient)** , **환자 매칭 보상(patient matching reward)** , **검색 보상(searching reward)** , **진단 보상(diagnosis reward)** 으로 구성된 **특수 보상 설계** 와 **다단계 보상 적응 전략** 을 통해 RL 정책을 최적화합니다.

## 주요 결과
**Deep-DxSearch** 는 훈련 없는 RAG 방식보다 **ID/OOD 평가에서 일반 질환에 대해 top-1 정확도 9%/3%** , **희귀 질환에 대해 13.5%/5%** 향상된 성능을 보였습니다. 또한, 일반 LLM 및 기존 의료 시스템보다 **top-1 정확도를 최대 19%/17% (일반 질환)** 및 **24%/17% (희귀 질환)** 향상시키는 뛰어난 성능을 달성했습니다. 보상 설계와 큐레이션된 코퍼스의 효과는 **17% 및 22%의 top-1 정확도 향상** 을 통해 입증되었으며, **증상 연관성(Symptom Association) Hit@20은 25.79%에서 60.39%** 로 크게 개선되었습니다.

## AI 실무자를 위한 시사점
이 연구는 의료 진단과 같은 고위험 도메인에서 **에이전트 RAG 시스템의 잠재력** 을 보여주며, **강화 학습(RL)을 통한 종단 간 최적화** 가 수동 프롬프트 엔지니어링의 한계를 넘어설 수 있음을 시사합니다. **추적 가능한 추론 과정** 과 **OOD(Out-of-Distribution) 데이터에 대한 강력한 일반화 능력** 은 실제 임상 환경에서의 적용 가능성을 높입니다. AI 엔지니어는 도메인 특화된 **보상 설계** 및 **맞춤형 코퍼스 구축** 이 LLM 기반 시스템의 성능과 신뢰성을 극대화하는 핵심 요소임을 고려해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.