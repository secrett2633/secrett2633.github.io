---
title: "[논문리뷰] AuditoryBench++: Can Language Models Understand Auditory Knowledge
  without Hearing?"
excerpt: "Jaeho Lee이 arXiv에 게시한 'AuditoryBench++: Can Language Models Understand Auditory Knowledge
  without Hearing?' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Auditory Knowledge
  - Large Language Models
  - Multimodal Reasoning
  - Benchmark
  - Chain-of-Thought
  - Auditory Imagination
  - Text-only Reasoning

permalink: /ai/review/2025-9-23-AuditoryBench-Can-Language-Models-Understand-Auditory-Knowledge-without-Hearing/

toc: true
toc_sticky: true

date: 2025-09-23 13:36:03+0900
last_modified_at: 2025-09-23 13:36:03+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.17641)

**저자:** Hyunjong Ok, Suho Yoo, Hyeonjun Kim, Jaeho Lee



## 핵심 연구 목표
언어 모델(LLMs)이 오디오 입력 없이 텍스트만으로 청각적 상식과 추론 능력을 이해하는 데 부족함을 해결하고자 합니다. 이 격차를 해소하기 위해 청각 지식을 평가하는 **AuditoryBench++** 벤치마크를 제시하고, LLM이 청각 정보를 "상상"하여 추론하는 **AIR-CoT** 방법론을 개발하는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 두 가지 주요 요소로 구성됩니다. 첫째, **AuditoryBench++** 는 **Pitch, Duration, Loudness 비교** , **Animal Sound 인식** , **Auditory Context 추론** 의 다섯 가지 텍스트 전용 청각 추론 태스크를 포함하는 종합 벤치마크입니다. 둘째, **AIR-CoT** 는 2단계 훈련 방식을 사용합니다. 1단계에서는 LLM이 **`[imagine]` 특수 토큰** 을 생성하여 청각 지식이 필요한 텍스트 스팬을 감지하도록 훈련합니다. 2단계에서는 **`[/imagine]` 토큰** 이 감지되면 **CLAP 텍스트 인코더와 2계층 MLP** 를 통해 청각 임베딩을 생성하고 주입하여 모델이 청각 상상력을 발휘하도록 합니다.

## 주요 결과
**AIR-CoT** 는 **AuditoryBench++** 벤치마크에서 기존 LLM 및 증강 모델들을 뛰어넘는 성능을 보였습니다. 특히 **Pitch 비교에서 83.89% (+8.25%p)** , **Animal Sound 인식에서 71.55% (+9.34%p)** , **Auditory Context 추론에서 82.67% (+11.88%p)** 의 정확도를 달성하며 상당한 개선을 보여주었습니다. 하지만 duration 및 loudness 비교 태스크에서는 성능 향상이 제한적이었는데, 이는 현재 오디오 표현이 시간적, 진폭적 단서를 잘 포착하지 못하기 때문으로 분석됩니다.

## AI 실무자를 위한 시사점
본 연구는 LLM이 직접적인 오디오 입력 없이도 청각 지식을 상상하고 추론할 수 있는 가능성을 열어, 텍스트 기반 멀티모달 AI 시스템 개발에 중요한 기반을 제공합니다. **AuditoryBench++** 는 LLM의 청각 이해도를 체계적으로 평가하는 표준 도구로 활용될 수 있으며, **AIR-CoT** 는 LLM에 청각 상상력을 부여하는 효과적인 방법론을 제시하여 더욱 인간과 유사한 멀티모달 추론 능력을 가진 AI를 개발하는 데 기여할 것입니다. 다만, duration이나 loudness 같은 정량적 청각 속성 처리에 대한 추가 연구가 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.