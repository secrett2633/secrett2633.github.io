---
title: "[논문리뷰] SWE-fficiency: Can Language Models Optimize Real-World Repositories on Real Workloads?"
excerpt: "Ofir Press이 [arXiv]에 게시한 'SWE-fficiency: Can Language Models Optimize Real-World Repositories on Real Workloads?' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 소프트웨어 성능 최적화
  - 언어 모델
  - 저장소 수준 추론
  - 벤치마크
  - 실제 워크로드
  - 코드 정확성
  - 속도 향상
  - 코드 최적화

permalink: /ai/review/2025-11-11-SWE-fficiency_Can_Language_Models_Optimize_Real-World_Repositories_on_Real_Workloads/

toc: true
toc_sticky: true

date: 2025-11-11 00:00:00+0900+0900
last_modified_at: 2025-11-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.06090)

**저자:** Jeffrey J. Ma, Milad Hashemi, Amir Yazdanbakhsh, Kevin Swersky, Ofir Press, Enhui Li, Vijay Janapa Reddi, Parthasarathy Ranganathan



## 핵심 연구 목표
이 논문은 **대규모 언어 모델(LM)**이 **실제 소프트웨어 저장소**의 **실제 워크로드**에서 런타임 성능을 얼마나 효과적으로 최적화할 수 있는지 평가하는 것을 목표로 합니다. 기존 벤치마크들이 '무엇을 고칠 것인가'에 초점을 맞추는 반면, 본 연구는 복잡하고 대규모의 코드베이스에서 **기능적 정확성**을 유지하면서 **종단 간 성능 개선**을 '어떻게 달성할 것인가'라는 근본적인 질문에 답하고자 합니다.

## 핵심 방법론
저자들은 **SWE-FFICIENCY**라는 새로운 벤치마크를 제안하며, 이는 **numpy, pandas, scipy** 등 **9개 인기 Python 저장소**에서 추출한 **498개 최적화 태스크**로 구성됩니다. 이 벤치마크는 키워드 필터링, 정적 분석, 코드 커버리지, 실행 검증을 포함하는 **자동화된 데이터 수집 파이프라인**을 통해 구축되었으며, 에이전트는 전문가 수준의 **속도 향상(Speedup Ratio, SR)**을 달성하고 기존 단위 테스트를 통과하는 패치를 생성해야 합니다.

## 주요 결과
최첨단 **LM 에이전트**(예: **GPT-5, Claude, Gemini**)에 대한 평가는 평균적으로 **전문가 속도 향상의 0.15배** 미만을 달성하며 현저히 저조한 성능을 보였습니다. 에이전트는 **최적화 기회 로컬라이제이션**, 함수 간 실행 추론, **올바른 코드 유지**에 어려움을 겪고, 전문가 개선 사항의 **68% 이상**을 놓치면서 피상적인 **단축키 최적화**를 선호하는 경향을 보였습니다.

## AI 실무자를 위한 시사점
현재 **LM 기반 소프트웨어 엔지니어링 에이전트**는 실제 저장소 성능 최적화에서 인간 전문가에 비해 상당한 한계를 보입니다. 따라서 AI 개발자는 **정확성 유지, 최적화 기회 로컬라이제이션, 시스템 수준 최적화** 및 **장기적인 계획 능력** 향상에 초점을 맞춰야 합니다. 이 벤치마크는 **자동화된 성능 엔지니어링** 및 **장기적 소프트웨어 추론** 연구를 촉진하는 데 중요한 기반을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.