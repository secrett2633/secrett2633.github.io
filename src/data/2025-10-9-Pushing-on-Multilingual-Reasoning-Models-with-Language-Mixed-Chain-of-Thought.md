---
title: "[논문리뷰] Pushing on Multilingual Reasoning Models with Language-Mixed
  Chain-of-Thought"
excerpt: "이 [arXiv]에 게시한 'Pushing on Multilingual Reasoning Models with Language-Mixed
  Chain-of-Thought' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multilingual Reasoning
  - Chain-of-Thought (CoT)
  - Language-Mixed CoT
  - Instruction Tuning
  - Korean LLMs
  - Data Curation
  - Supervised Fine-tuning (SFT)

permalink: /ai/review/2025-10-9-Pushing-on-Multilingual-Reasoning-Models-with-Language-Mixed-Chain-of-Thought/

toc: true
toc_sticky: true

date: 2025-10-09 13:45:06+0900
last_modified_at: 2025-10-09 13:45:06+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.04230)

**저자:** Guijin Son, Donghun Yang, Hyunwoo Ko, Dasol Choi, Chanuk Lim, Kyong-Ha Lee, Hitesh Laxmichand Patel, Amit Agarwal, Srikant Panda, Minhyuk Kim, Nikunj Drolia, Youngjae Yu



## 핵심 연구 목표
본 논문은 중간 자원 언어(mid-resource language)에서 `언어별 추론`의 격차를 해소하고, 번역으로 인한 품질 저하 및 일상 표현에 대한 `취약성`을 극복하는 것을 목표로 합니다. 특히 한국어를 사례 연구로 하여, `다국어 추론 모델`의 성능을 향상시키기 위한 효과적인 방법론을 제시하고자 합니다.

## 핵심 방법론
연구는 두 단계로 진행됩니다: 첫째, **5.79M개** 의 `네이티브 한국어 프롬프트`를 웹 Q&A, 시험, STEM, 코드 등에서 수집하여 **YI-SANG** 데이터셋을 구축합니다. 둘째, **Qwen3-32B** 와 같은 `선도 모델`을 `선생님 모델`로 사용하여 **3.7M개** 의 `긴 추론 과정`을 생성하고, 이때 **Language-Mixed CoT** 를 강제 적용합니다. **Language-Mixed CoT** 는 `Think` 단계에서 `영어`를 `앵커 언어`로 사용하여 추론하고, `한국어`로 핵심 의미를 유지하며 번역 아티팩트를 최소화하는 접근 방식입니다. 최종적으로, **260k개** 의 `고수익 데이터셋`인 **YI-SANG-HQ** 를 선별하여 **9개의 모델(4B-35B)** 을 `지도 미세 조정(SFT)` 방식으로 훈련시킵니다.

## 주요 결과
최고 성능 모델인 **KO-REAson-35B** 는 평균 **64.0±2.5점** 으로 `9개 벤치마크` 중 5개에서 `최고 순위`를, 나머지는 2위를 차지하며 `최신 기술(SOTA)` 성능을 달성했습니다. 소규모 및 중형 모델들 역시 `평균 +18.6점`의 상당한 성능 향상을 보였습니다. `Language-Mixed CoT`는 `단일 언어 CoT`보다 효과적이며, `교차 언어` 및 `다중 모드` 성능 향상에도 기여했습니다.

## AI 실무자를 위한 시사점
본 연구는 `중간 자원 언어`를 위한 `경쟁력 있는 추론 모델`을 구축하는 `실용적인 방법`을 제시하며, `RL`이나 강력한 영어 기반 모델에 대한 의존도를 줄입니다. **YI-SANG** 및 **YI-SANG-HQ** 데이터셋과 **KO-REAson** 모델 시리즈를 공개하여 `한국어 LLM` 연구 및 `다국어 AI 개발`에 귀중한 자원을 제공합니다. 특히 `네이티브 데이터 수집`과 `언어 혼합 추론` 기법이 `다국어 LLM`의 `일반화 능력` 및 `문화적 이해도`를 높이는 데 중요함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.