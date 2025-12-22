---
title: "[논문리뷰] SWE-Bench++: A Framework for the Scalable Generation of Software Engineering Benchmarks from Open-Source Repositories"
excerpt: "이 [arXiv]에 게시한 'SWE-Bench++: A Framework for the Scalable Generation of Software Engineering Benchmarks from Open-Source Repositories' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Software Engineering Benchmarks
  - Large Language Models (LLMs)
  - Code Generation
  - Automated Benchmark Generation
  - Multilingual
  - GitHub Pull Requests
  - Test Oracle
  - Fine-tuning

permalink: /ai/review/2025-12-22-SWE-Bench-A-Framework-for-the-Scalable-Generation-of-Software-Engineering-Benchmarks-from-Open-Source-Repositories/

toc: true
toc_sticky: true

date: 2025-12-22 00:00:00+0900+0900
last_modified_at: 2025-12-22 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.17419)

**저자:** Lilin Wang, Lucas Ramalho, Alan Celestino, Phuc Anthony Pham, Yu Liu, Umang Kumar Sinha, Andres Portillo, Onassis Osunwa, Gabriel Maduekwe



## 핵심 연구 목표
이 논문은 기존의 LLM 기반 소프트웨어 엔지니어링 벤치마크(예: SWE-bench)가 수동 큐레이션, 정적 데이터셋, Python 버그 수정에 대한 집중, 그리고 데이터 오염 위험과 같은 한계를 가진다는 문제점을 해결하고자 합니다. 대규모 언어 모델의 역량을 확장하기 위해, 오픈 소스 GitHub 저장소에서 **확장 가능하고 재현 가능한 리포지토리 수준 코딩 작업** 을 자동으로 생성하는 다국어 프레임워크를 구축하는 것을 목표로 합니다.

## 핵심 방법론
SWE-Bench++는 GitHub Pull Request(PR)를 실행 가능한 작업으로 변환하는 **4단계 파이프라인** 을 사용합니다: 첫째, **프로그래밍 방식 소싱** 으로 적격 PR을 식별합니다. 둘째, **환경 합성** 단계에서는 **템플릿 기반 도커 환경** 및 **반복적 피드백** 을 통해 재현 가능한 실행 환경을 구축합니다. 셋째, **테스트 오라클 추출** 에서는 **Base, Before, After** 세 가지 저장소 상태를 비교하는 **상태 차등 분류 논리** 와 **합성된 적응형 로그 파싱** 을 사용하여 버그 수정 및 기능 요청을 식별합니다. 마지막으로, **자동화된 품질 보증(AutoQA)** 을 통해 생성된 인스턴스의 신뢰성을 검증하며, **힌트 유도 궤적 합성** 을 통해 모델이 해결하기 어려운 작업들을 훈련 데이터로 전환합니다.

## 주요 결과
이 프레임워크는 **11개 언어** 에 걸쳐 **3,971개 저장소** 에서 **11,133개의 인스턴스** 를 성공적으로 생성했습니다. **1,782개의 인스턴스** 부분 집합에서 **claude-sonnet-4.5** 는 **36.20% pass@10** 를, **gpt-5-2025-08-07** 는 **34.57%** 를 달성하며 최첨단 모델의 성능을 입증했습니다. 특히, 단 **145개의 SWE-Bench++ 궤적** 으로 **SWE-bench Multilingual 벤치마크** 에서 **Qwen2.5-Coder-7B 모델** 의 교차 언어 성능을 **1.6%에서 3.6%** 로 향상시키는 효과를 보여주었습니다.

## AI 실무자를 위한 시사점
SWE-Bench++는 데이터 오염 위험을 최소화하고 **지속적으로 업데이트되는 실시간 벤치마크** 를 제공하여, LLM 기반 코드 생성 모델의 실제 소프트웨어 엔지니어링 역량 평가에 혁신을 가져왔습니다. **다국어 지원** 은 Python 외의 언어에 대한 모델 개발을 촉진하며, **힌트 유도 궤적 합성** 을 통해 생성된 고품질 훈련 데이터는 에이전트의 문제 해결 능력을 효과적으로 향상시킬 수 있습니다. 이는 AI 엔지니어들이 더욱 강력하고 실용적인 소프트웨어 개발 도구를 구축하는 데 핵심적인 기여를 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.