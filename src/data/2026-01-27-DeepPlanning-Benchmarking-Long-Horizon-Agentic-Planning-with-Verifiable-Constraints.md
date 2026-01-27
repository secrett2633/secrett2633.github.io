---
title: "[논문리뷰] DeepPlanning: Benchmarking Long-Horizon Agentic Planning with Verifiable Constraints"
excerpt: "이 [arXiv]에 게시한 'DeepPlanning: Benchmarking Long-Horizon Agentic Planning with Verifiable Constraints' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Long-Horizon Planning
  - Benchmarking
  - Verifiable Constraints
  - Tool Use
  - Constraint Optimization
  - Information Acquisition
  - Travel Planning
  - Shopping Planning

permalink: /ai/review/2026-01-27-DeepPlanning-Benchmarking-Long-Horizon-Agentic-Planning-with-Verifiable-Constraints/

toc: true
toc_sticky: true

date: 2026-01-27 00:00:00+0900+0900
last_modified_at: 2026-01-27 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.18137)

**저자:** Yinger Zhang, Shutong Jiang, Renhao Li, Jianhong Tu, Yang Su, Lianghao Deng, Xudong Guo, Chenxu Lv, Junyang Lin



## 핵심 연구 목표
기존 LLM 에이전트 평가 벤치마크들이 주로 국소적인 추론에 집중하고 실제 환경의 복잡한 전역 제약 최적화, 능동적인 정보 탐색, 세부적인 지역 제약 사항을 충분히 반영하지 못하는 한계를 해결하고자 합니다. 이를 위해 현실적이고 도전적인 장기 계획 능력을 평가할 수 있는 새로운 벤치마크인 **DEEPPLANNING** 을 제안합니다.

## 핵심 방법론
새로운 벤치마크 **DEEPPLANNING** 은 **멀티데이 여행 계획** 과 **멀티제품 쇼핑** 이라는 두 가지 복잡한 실제 시나리오를 포함합니다. 이 시나리오들은 **능동적 정보 획득** , **국소 제약 추론** , **전역 제약 최적화** 세 가지 핵심 역량을 요구하도록 설계되었습니다. 데이터 생성은 **베이스 스켈레톤 생성** , **개인화된 제약 주입** , **환경 제약 주입** 의 3단계 파이프라인을 통해 이루어지며, 평가에는 LLM 기반 채점 대신 **코드 기반 자동 검증 시스템** 을 사용합니다.

## 주요 결과
**DEEPPLANNING** 에 대한 평가는 최신 에이전트 LLM조차 이러한 복잡한 문제 해결에 어려움을 겪고 있음을 보여줍니다. 가장 성능이 좋은 **GPT-5.2-high** 모델도 여행 계획 태스크에서 **35.0%의 낮은 케이스 정확도** 를 기록했습니다. 태스크 복잡도(예: 여정 길이, 교차 항목 제약)가 증가함에 따라 모델 성능은 일관되게 하락했으며, 오류 분석 결과 **정보 획득 실패** , **국소 제약 추론 실패** , 그리고 **전역 최적화 실패** 가 주요 문제점으로 드러났습니다.

## AI 실무자를 위한 시사점
현재 AI 실무에서 사용되는 SOTA LLM 에이전트들은 복잡한 제약 조건이 있는 실제 장기 계획 태스크를 완전히 해결하는 데 아직 한계가 있습니다. 에이전트의 신뢰성을 높이기 위해서는 **능동적 정보 획득** , **세밀한 국소 제약 추론** , **전역 최적화 능력** 을 향상시키는 연구가 필수적입니다. 또한, **명확한 추론 패턴** 과 **병렬 도구 사용** 이 에이전트의 효율성과 효과성 균형에 중요함을 시사하며, 전역적인 일관성 검사 및 문제 해결을 위한 되돌림(backtracking) 메커니즘 개선이 시급합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.