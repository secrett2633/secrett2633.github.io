---
title: "[논문리뷰] Jailbreaking in the Haystack"
excerpt: "Alexander Robey이 [arXiv]에 게시한 'Jailbreaking in the Haystack' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Jailbreaking
  - LLM Safety
  - Long-Context Models
  - Positional Bias
  - Attack Success Rate (ASR)
  - Prompt Engineering
  - Compute Efficiency
  - AI Agents

permalink: /ai/review/2025-11-10-Jailbreaking-in-the-Haystack/

toc: true
toc_sticky: true

date: 2025-11-10 00:00:00+0900+0900
last_modified_at: 2025-11-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.04707)

**저자:** Rishi Rajesh Shah, Chen Henry Wu, Shashwat Saxena, Ziqian Zhong, Alexander Robey, Aditi Raghunathan



## 핵심 연구 목표
본 연구는 장문(long-context) 언어 모델(LMs)의 확장된 컨텍스트 창이 가지는 안전성 함의를 분석하고, 심지어 **양성(benign) 컨텍스트** 내에서도 안전 기능이 어떻게 저하되는지 탐구하는 것을 목표로 합니다. 특히, 유해한 목표의 **위치(goal positioning)**가 모델 안전성에 미치는 결정적인 영향을 밝히고, 새로운 형태의 **탈옥(jailbreaking) 공격**인 **NINJA (Needle-in-haystack jailbreak attack)**를 제안합니다.

## 핵심 방법론
**NINJA**는 유해한 사용자 목표에 **양성(benign)의, 모델 생성 컨텍스트**를 추가하여 정렬된 LMs를 탈옥시키는 방법론입니다. 공격은 세 단계로 진행됩니다: 유해 목표에서 **핵심 키워드를 추출**하고, 이 키워드를 사용하여 **주제적으로 관련된 긴 컨텍스트**를 생성하며, 마지막으로 생성된 긴 컨텍스트와 유해 목표를 특정 형식으로 조합하여 프롬프트를 구성합니다. 핵심은 유해 목표를 긴 컨텍스트의 **맨 앞(beginning)**에 배치하여 모델의 안전 필터를 우회하는 것입니다.

## 주요 결과
**NINJA**는 여러 첨단 모델에서 **공격 성공률(ASR)**을 크게 향상시켰습니다. **Llama-3.1-8B-Instruct**의 ASR을 **23.7%에서 58.8%**로, **Qwen2.5-7B-Instruct**의 ASR을 **23.7%에서 42.5%**로 증가시켰습니다. **Gemini Flash**에서도 **23%에서 29%**로 증가했으며, **Mistral-7B-v0.3**에서는 **54.5%**의 ASR을 달성했습니다. 유해 목표를 컨텍스트 **시작 부분에 배치**할 때 ASR이 가장 높았으며, 이는 모델의 **위치 편향(positional bias)**이 안전성에 중대한 영향을 미침을 보여줍니다. 또한, **NINJA**는 기존 공격보다 **컴퓨팅 효율적**이며, 주어진 예산 내에서 컨텍스트 길이를 늘리는 것이 시도 횟수를 늘리는 것보다 더 효과적임이 입증되었습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM의 장문 컨텍스트 기능 확장이 예상치 못한 **안전성 취약점**을 동반한다는 중요한 경고를 제공합니다. AI/ML 엔지니어는 LLM의 **위치 편향**을 인지하고, 사용자 쿼리를 시스템 프롬프트의 **마지막**에 배치하는 등의 방어 전략을 고려해야 합니다. 특히 **에이전트 시스템**과 같이 상호작용이 많고 컨텍스트 길이가 길어지는 환경에서는 **컨텍스트 인식 안전 메커니즘** 개발이 필수적입니다. **NINJA** 공격은 **낮은 리소스**와 **높은 전이성**, 그리고 **낮은 탐지율**을 가지므로, 모델 안전성 평가 시 새로운 위협 벡터로 고려되어야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.