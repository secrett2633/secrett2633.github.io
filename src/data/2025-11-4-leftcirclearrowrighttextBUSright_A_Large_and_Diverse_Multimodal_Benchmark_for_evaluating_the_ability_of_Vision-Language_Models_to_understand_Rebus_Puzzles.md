---
title: "[논문리뷰] left|,circlearrowright,text{BUS},right|: A Large and
  Diverse Multimodal Benchmark for evaluating the ability of Vision-Language
  Models to understand Rebus Puzzles"
excerpt: "Deepiha S이 [arXiv]에 게시한 'left|,circlearrowright,text{BUS},right|: A Large and
  Diverse Multimodal Benchmark for evaluating the ability of Vision-Language
  Models to understand Rebus Puzzles' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models
  - Multimodal Benchmark
  - Rebus Puzzles
  - In-Context Learning
  - Reasoning
  - ControlNet
  - Prompt Engineering

permalink: /ai/review/2025-11-4-leftcirclearrowrighttextBUSright_A_Large_and_Diverse_Multimodal_Benchmark_for_evaluating_the_ability_of_Vision-Language_Models_to_understand_Rebus_Puzzles/

toc: true
toc_sticky: true

date: 2025-11-09 19:22:42+0900
last_modified_at: 2025-11-09 19:22:42+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.01340)

**저자:** Trishanu Das, Abhilash Nandy, Khush Bajaj, Deepiha S



## 핵심 연구 목표
논문은 Vision-Language Models (VLMs)이 **Rebus Puzzles**를 이해하고 해결하는 능력을 평가하기 위한 크고 다양한 멀티모달 벤치마크를 제시하는 것을 목표로 합니다. Rebus Puzzles는 이미지 인식, 인지 능력, 상식 추론, 다단계 추론 등 복합적인 능력을 요구하는 도전적인 태스크이며, 기존 벤치마크의 난이도 다양성과 모델-불가지론적 솔루션의 부족함을 해결하고자 합니다.

## 핵심 방법론
저자들은 1,333개의 영어 Rebus Puzzles로 구성된 **A 데이터셋**을 구축했습니다. 이 데이터셋은 **ControlNet**을 사용하여 원본 퍼즐 이미지에 시각적 방해 요소를 추가하여 난이도를 높였습니다. 또한, **REBUSDESCPROGICE**라는 모델-불가지론적 프레임워크를 제안하는데, 이는 **비정형 이미지 설명**과 **구조화된 코드 기반 추론**을 결합하며, **개선된 추론 기반 in-context 예시 선택**을 활용하여 VLM의 성능을 향상시킵니다.

## 주요 결과
제안된 **REBUSDESCPROGICE 프레임워크**는 VLM의 퍼즐 해결 성능을 일관되게 향상시켰습니다. 특히, **GPT-4o 모델**에서 **Word-Level F1 스코어**가 **zero-shot normal prompting의 0.489**에서 **three-shot REBUSDESCPROGICE의 0.512**로 상승했습니다. 오픈소스 모델인 **Qwen2-VL-7B**의 경우, **description-only 및 VisProg 기준선 대비 20-30%의 상대적 개선 (F1 스코어 0.20에서 0.264로)**을 달성하며, 약한 오픈소스 VLM에 특히 유용함을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 복잡한 시각-언어 추론 태스크에서 **구조화된 코드 기반 추론과 비정형 설명의 통합**이 VLM 성능 향상에 핵심적임을 보여줍니다. 특히, **오픈소스 VLM**의 성능을 크게 개선할 수 있는 **REBUSDESCPROGICE 프레임워크**는 실제 애플리케이션에서 VLM의 활용도를 높이는 데 기여할 수 있습니다. **ControlNet을 활용한 데이터셋 확장 기법**은 벤치마크의 다양성과 난이도를 효과적으로 높여, 더욱 견고한 VLM 평가를 가능하게 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.