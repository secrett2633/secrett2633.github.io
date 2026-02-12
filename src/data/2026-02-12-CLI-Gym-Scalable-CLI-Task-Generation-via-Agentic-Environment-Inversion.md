---
title: "[논문리뷰] CLI-Gym: Scalable CLI Task Generation via Agentic Environment Inversion"
excerpt: "Feiyang Pan이 [arXiv]에 게시한 'CLI-Gym: Scalable CLI Task Generation via Agentic Environment Inversion' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic Coding
  - CLI Automation
  - Environment Inversion
  - Task Generation
  - Large Language Models (LLMs)
  - Software Engineering
  - Dockerfile
  - Terminal-Bench

permalink: /ai/review/2026-02-12-CLI-Gym-Scalable-CLI-Task-Generation-via-Agentic-Environment-Inversion/

toc: true
toc_sticky: true

date: 2026-02-12 00:00:00+0900+0900
last_modified_at: 2026-02-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.10999)

**저자:** Yusong Lin, Haiyang Wang, Shuzhe Wu, Lue Fan, Feiyang Pan, Sanyuan Zhao, Dandan Tu



## 핵심 연구 목표
본 논문은 실세계 소프트웨어 개발에 필수적인 **CLI(명령줄 인터페이스) 환경과의 상호작용** 을 포함하는 **환경 집약적 에이전트 작업** 의 확장 가능한 데이터 생성 파이프라인 부재 문제를 해결하고자 합니다. 기존 **SWE-bench** 와 같은 코드 중심 작업과 달리, **Terminal-Bench** 와 같은 환경 집약적 작업은 수동 생성에 의존하여 규모가 작고 LLM 에이전트의 성능이 40% 미만으로 저조한 한계가 있었습니다.

## 핵심 방법론
저자들은 **CLI-Gym** 이라는 파이프라인을 제안하며, 에이전트가 **"골드" 환경** (GitHub 리포지토리와 Dockerfile로 정의된 건강한 상태)에서 시작하여 의도적으로 오류를 유발하는 **환경 인버스 과정** 을 시뮬레이션합니다. **LLM 기반 에이전트** 는 실행 피드백의 안내를 받아 환경을 조작하는 **Dockerfile 명령** 을 생성하고, **유닛 테스트 실패** 가 감지되면 오류 유발 Dockerfile과 실패한 유닛 테스트 정보, LLM이 생성한 문제 설명을 결합하여 새로운 작업을 만듭니다. 최종적으로 **291개의 고품질 궤적** 을 선별한 후, **Qwen3-32B** 및 **Qwen3-235B-A22B-Instruct 모델** 을 사전 훈련된 **SWE-스타일 궤적** 과 CLI-Gym 궤적에 파인튜닝했습니다.

## 주요 결과
**CLI-Gym** 은 **1,655개** 의 환경 집약적 CLI 작업 인스턴스를 생성했으며, 이는 기존 수동 작업의 약 20배 규모입니다. 파인튜닝된 **LiberCoder-32B** 모델은 **Terminal-Bench 1.0** 에서 **38.9% Pass@1** 을 달성하며 기준 모델 대비 **+28.6%** 향상을 보였고, **LiberCoder-235B-A22B** 는 **46.1% Pass@1** 을 달성하여 **+21.1%** 향상을 기록했습니다. 이 모델들은 **Kimi-K2 (1조 파라미터)** 및 **Qwen3-Coder-480B (480B 파라미터)** 와 같은 더 큰 오픈소스 모델들을 능가하는 성능을 보였습니다.

## AI 실무자를 위한 시사점
**CLI-Gym** 은 AI 에이전트의 **환경 집약적 작업 수행 능력** 을 향상시키기 위한 **확장 가능한 데이터 생성 솔루션** 을 제공합니다. 이는 LLM 에이전트가 소프트웨어 개발에서 실제 시스템 문제를 진단하고 해결하는 데 필수적인 역량을 강화하는 데 기여합니다. 특히, **고품질의 소규모 도메인 특화 데이터** (예: 291개 궤적)로도 **LLM의 성능을 크게 향상** 시킬 수 있음을 입증하여, 데이터 양뿐만 아니라 **데이터 품질과 다양성** 의 중요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.