---
title: "[논문리뷰] AutoCodeBench: Large Language Models are Automatic Code Benchmark
  Generators"
excerpt: "Tao Zhang이 [arXiv]에 게시한 'AutoCodeBench: Large Language Models are Automatic Code Benchmark
  Generators' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 코드 생성
  - 대규모 언어 모델
  - 코드 벤치마크
  - 다국어 프로그래밍
  - 자동화된 데이터 생성
  - 샌드박스 평가
  - 멀티모달 AI

permalink: /ai/review/2025-8-13-AutoCodeBench-Large-Language-Models-are-Automatic-Code-Benchmark-Generators/

toc: true
toc_sticky: true

date: 2025-08-13 13:29:23+0900
last_modified_at: 2025-08-13 13:29:23+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.09101)

**저자:** Jason Chou, Ao Liu, Yuchi Deng, Zhiying Zeng, Tao Zhang



## 핵심 연구 목표
기존 코드 생성 벤치마크의 한계(수동 어노테이션 의존, Python 중심, 난이도 및 다양성 부족)를 해결하고, LLM의 코드 생성 능력을 포괄적으로 평가하기 위해 **높은 난이도를 가진 다국어 코드 생성 데이터셋을 수동 어노테이션 없이 자동으로 생성하는 방법론** 을 개발하는 것입니다. 이를 통해 LLM이 실제처럼 도전적이고 다양한 다국어 프로그래밍 시나리오에 얼마나 잘 대응하는지 측정하고자 합니다.

## 핵심 방법론
본 논문은 **LLM-샌드박스 상호작용** 에 기반한 자동화된 워크플로우인 **AutoCodeGen** 을 제안합니다. 주요 단계는 **솔루션 생성** (LLM이 실제 코드에서 자가 완결적 코드 진화), **테스트 함수 생성** (LLM이 테스트 입력을 생성하고 **다국어 샌드박스** 에서 실행하여 출력 얻음), **문제 생성** (LLM이 솔루션과 테스트 함수 기반으로 문제 생성), 그리고 **데이터 필터링** (다중 샘플링, LLM-as-Critic, 다양성 기반 태깅)으로 구성됩니다. 이 과정에서 **20개 이상의 프로그래밍 언어를 지원하는 다국어 샌드박스** 를 오픈소스화하여 활용합니다.

## 주요 결과
제안된 **AutoCodeBench** 는 **20개 프로그래밍 언어에 걸쳐 3,920개의 문제** 를 포함하며, **60% 이상이 고난이도 문제** 로 분류됩니다. 평균 문제 길이는 **498.2자** , 솔루션 길이는 **487.5자** 입니다. **30개 이상의 LLM** 을 평가한 결과, 가장 발전된 LLM인 **Claude Opus 4** 가 **AutoCodeBench에서 52.4% Pass@1** 성능을 보였음에도 불구하고, 멀티로지컬 시나리오 및 저자원 언어에서 여전히 어려움을 겪음을 확인했습니다. **AutoCodeGen** 의 데이터 유효성은 **87.6%의 문제 정확도** 로 검증되었습니다.

## AI 실무자를 위한 시사점
본 연구는 고품질의 코드 생성 벤치마크를 **확장 가능하고 비용 효율적인 방식** 으로 생성할 수 있는 실용적인 방법론을 제시합니다. **AutoCodeBench** 는 현재 LLM이 복잡한 다국어 코드 생성 및 다중 논리 추론에서 겪는 한계를 명확히 보여주며, 특히 저자원 언어 및 복합 문제 해결 능력 향상에 대한 연구의 필요성을 강조합니다. 또한, 오픈소스화된 **다국어 샌드박스** 는 LLM 기반 코드 생성 및 평가 시스템 개발에 기여할 유용한 인프라를 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.