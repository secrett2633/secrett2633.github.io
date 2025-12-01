---
title: "[논문리뷰] A.S.E: A Repository-Level Benchmark for Evaluating Security in
  AI-Generated Code"
excerpt: "Libo Chen이 [arXiv]에 게시한 'A.S.E: A Repository-Level Benchmark for Evaluating Security in
  AI-Generated Code' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - AI-Generated Code Security
  - LLM Evaluation
  - Repository-Level Benchmark
  - Code Security
  - Vulnerability Detection
  - Static Analysis
  - Reproducibility
  - Context-Awareness

permalink: /ai/review/2025-9-1-A-S-E-A-Repository-Level-Benchmark-for-Evaluating-Security-in-AI-Generated-Code/

toc: true
toc_sticky: true

date: 2025-09-01 13:14:34+0900
last_modified_at: 2025-09-01 13:14:34+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.18106)

**저자:** Keke Lian, Bing Wang, Lei Zhang, Libo Chen, Junjie Wang, Ziming Zhao, Yujiu Yang, Haotong Duan, Haoran Zhao, Shuang Liao, Mingda Guo, Jiazheng Quan, Yilu Zhong, Chenhao He, Zichuan Chen, Jie Wu, Haoling Li, Zhaoxuan Li, Jiongchi Yu, Hui Li, Dong Zhang



## 핵심 연구 목표
본 논문은 기존의 LLM 코드 생성 평가 벤치마크가 **단편적인 코드 스니펫** 에 집중하고, **불안정한 평가 방식** 을 사용하며, **실제 리포지토리 컨텍스트** 를 반영하지 못하여 AI 생성 코드의 보안을 충분히 평가하지 못하는 문제를 해결하고자 합니다. 실제 소프트웨어 개발 환경에서 LLM이 안전하고 올바르며 안정적인 코드를 생성할 수 있는지 종합적으로 평가하는 새로운 벤치마크, **A.S.E (AI Code Generation Security Evaluation)** 를 제시하는 것이 목표입니다.

## 핵심 방법론
A.S.E는 실제 **CVE 문서화된 오픈소스 리포지토리** 에서 태스크를 구축하여 **전체 리포지토리 컨텍스트** 와 **빌드 시스템** , **파일 간 종속성** 을 보존합니다. 평가 프레임워크는 **Dockerized 환경** 에서 **전문가 정의 규칙** 과 **CodeQL** , **Joern** 과 같은 산업 표준 분석기를 사용하여 보안 취약성을 재현 가능하게 검증합니다. 또한, 모델의 **컨텍스트 이해 능력** 을 평가하기 위해 최대 **128k 토큰** 의 컨텍스트 윈도우를 조정하고 검색 모델을 활용합니다.

## 주요 결과
평가 결과, **Claude-3.7-Sonnet** 이 **52.79점** 으로 전반적으로 가장 우수한 성능을 보였습니다. 특히 **Qwen3-235B-A22B-Instruct** 는 **48.06점** 으로 보안 점수에서 최고를 기록하여 독점 모델과 오픈소스 모델 간의 격차가 좁음을 보여주었습니다. 하지만 현재 평가된 LLM 중 어느 모델도 코드 보안 점수에서 **50점 임계값을 넘지 못해** , LLM이 안전한 코드를 생성하는 데 여전히 어려움을 겪고 있음을 확인했습니다.

## AI 실무자를 위한 시사점
이 연구는 AI/ML 실무자들에게 LLM 기반 코드 생성 시스템의 보안을 평가할 때 **리포지토리 수준의 포괄적인 접근 방식** 이 필수적임을 강조합니다. 모델 선택만큼이나 **"빠른 사고" (fast-thinking) 디코딩 전략** 이 보안 패치에서 **"느린 사고" (slow-thinking) 전략** 보다 일관되게 우수한 성능을 보인다는 점은 프롬프트 엔지니어링의 중요성을 시사합니다. 따라서 LLM을 활용한 코드 개발 시 기능적 정확성 외에 **보안 취약점 감소** 에 대한 명확한 검증과 전략 수립이 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.