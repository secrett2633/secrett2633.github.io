---
title: "[논문리뷰] BuildBench: Benchmarking LLM Agents on Compiling Real-World Open-Source
  Software"
excerpt: "이 [arXiv]에 게시한 'BuildBench: Benchmarking LLM Agents on Compiling Real-World Open-Source
  Software' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Open-Source Software
  - Compilation
  - Benchmarking
  - Software Engineering
  - Error Resolution
  - Retrieval-Augmented Generation

permalink: /ai/review/2025-10-1-BuildBench-Benchmarking-LLM-Agents-on-Compiling-Real-World-Open-Source-Software/

toc: true
toc_sticky: true

date: 2025-10-01 14:04:08+0900
last_modified_at: 2025-10-01 14:04:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.25248)

**저자:** Zehua Zhang, Ati Priya Bajaj, Divij Handa, Siyu Liu, Arvind S Raj, Hongkai Chen, Hulin Wang, Yibo Liu, Zion Leonahenahe Basque, Souradip Nath, Vishal Juneja, Nikhil Chapre, Yan Shoshitaishvili, Adam Doupé, Chitta Baral, Ruoyu Wang



## 핵심 연구 목표
본 논문은 오픈소스 소프트웨어(OSS) 프로젝트의 자동 컴파일이라는 복잡하고 노동 집약적인 문제를 해결하기 위해 **LLM 에이전트**의 성능을 평가하고 개선하는 것을 목표로 합니다. 기존 규칙 기반 방식이나 LLM의 선택적 평가가 실제 OSS 컴파일의 난이도를 과소평가하는 한계를 지적하며, 보다 현실적이고 도전적인 벤치마크와 강력한 에이전트 방법론을 제시하고자 합니다.

## 핵심 방법론
연구팀은 다양하고 실제적인 C/C++ 프로젝트로 구성된 **BUILD-BENCH** 벤치마크를 구축했습니다. 제안된 **OSS-BUILD-AGENT**는 **LLM-Assisted Retrieval** 모듈을 통해 빌드 지침을 효율적으로 검색하고, **Bash Command Generator**와 **Execution Agent**로 구성된 **멀티 에이전트 시스템**을 활용하여 **Ubuntu 22.04 Docker 컨테이너** 내에서 컴파일 명령을 반복적으로 생성 및 실행하여 오류를 해결합니다. 성공 여부는 전문가가 생성한 바이너리 파일 목록과 비교하는 **Strict Success** 및 **Flexible Success** 지표를 사용하여 엄격하게 검증합니다.

## 주요 결과
**OSS-BUILD-AGENT**는 **Claude 3.7-Sonnet** 모델과 **LLM-Assisted Retrieval**을 사용하여 **BUILD-BENCH**에서 **66.4%의 Strict Success** 및 **71.8%의 Flexible Success**를 달성하여 모든 규칙 기반 및 LLM 단일 턴 기준선을 크게 능가했습니다. 이는 동일 모델의 단일 턴 기준선 대비 **49.7%p 증가**한 수치입니다. 또한, **LLM-Assisted Retrieval** 모듈은 **73.8%의 검색 정확도**를 보여 기존 **CompileAgent**의 **46.2%**를 크게 앞섰습니다. **pass@3** 실행 시 **GPT-40** 기반 에이전트의 Strict Success율이 **65.5%**에 달하는 등 반복적인 시도가 성능 향상에 기여함을 입증했습니다.

## AI 실무자를 위한 시사점
**LLM 에이전트**는 복잡한 OSS 컴파일과 같은 소프트웨어 엔지니어링 작업을 자동화하는 데 강력한 잠재력을 가지고 있습니다. 특히 **빌드 지침 검색** 및 **반복적인 오류 해결** 메커니즘 설계가 에이전트 성능에 결정적인 영향을 미치며, **Claude 3.7-Sonnet**과 같은 강력한 LLM의 활용이 중요합니다. **BUILD-BENCH**는 실제 OSS 컴파일 문제를 해결하는 데 필요한 에이전트를 개발하고 평가하기 위한 실용적인 벤치마크를 제공하며, 이는 소프트웨어 개발 및 보안 분야의 효율성을 높이는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.