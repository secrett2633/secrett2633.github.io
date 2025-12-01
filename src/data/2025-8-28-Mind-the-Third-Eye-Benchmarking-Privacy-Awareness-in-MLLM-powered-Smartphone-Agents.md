---
title: "[논문리뷰] Mind the Third Eye! Benchmarking Privacy Awareness in MLLM-powered
  Smartphone Agents"
excerpt: "Yue Yao이 [arXiv]에 게시한 'Mind the Third Eye! Benchmarking Privacy Awareness in MLLM-powered
  Smartphone Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLMs (MLLMs)
  - Smartphone Agents
  - Privacy Awareness
  - Benchmarking
  - Sensitive Data Detection
  - Risk Assessment
  - UI Automation

permalink: /ai/review/2025-8-28-Mind-the-Third-Eye-Benchmarking-Privacy-Awareness-in-MLLM-powered-Smartphone-Agents/

toc: true
toc_sticky: true

date: 2025-08-28 13:10:39+0900
last_modified_at: 2025-08-28 13:10:39+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.19493)

**저자:** Zhixin Lin, Jungang Li, Shidong Pan, Yibo Shi, Yue Yao, Dongliang Xu



## 핵심 연구 목표
본 논문은 **MLLM 기반 스마트폰 에이전트** 의 개인정보 보호 인식(Privacy Awareness) 능력을 체계적으로 평가하기 위한 최초의 대규모 벤치마크를 구축하고, 에이전트들이 민감한 사용자 정보에 접근할 때 적절한 개인정보 보호 조치를 취하는지 검증하는 것을 목표로 합니다. 기존 에이전트들이 높은 작업 성공률을 보이지만, 개인정보 보호 관련 기능이 부족하다는 문제점을 해결하고자 합니다.

## 핵심 방법론
개인정보 보호 인식을 평가하기 위해 **SAPA-Bench** 라는 **7,138개의 실제 시나리오** 로 구성된 대규모 벤치마크를 제안합니다. 각 시나리오에는 개인정보 유출 여부, 유출 양식 (이미지 또는 명령어), 개인정보 카테고리 (예: **계정 자격 증명, 위치, 통신 내용** 등 8가지), 위험 심각도 (Low, Medium, High), 예상 위험 프롬프트가 상세히 주석되어 있습니다. 에이전트의 개인정보 인식 및 대응 능력을 측정하기 위해 **Privacy Recognition Rate (PRR), Privacy Localization Rate (PLR), Privacy Level Awareness Rate (PLAR), Privacy Category Awareness Rate (PCAR), Risk Awareness (RA)** 의 다섯 가지 특화된 평가지표를 도입했습니다.

## 주요 결과
벤치마크된 대부분의 에이전트는 불만족스러운 개인정보 보호 인식(RA) 성능을 보였으며, 명시적인 힌트가 주어져도 성능은 **60% 미만** 에 머물렀습니다. 특히, **클로즈드-소스 모델** ( **Gemini 2.0-flash** 가 **67.14% RA** 로 가장 우수)이 **오픈-소스 모델** 보다 전반적으로 더 나은 개인정보 보호 능력을 보였습니다. 또한, 에이전트의 개인정보 감지 능력은 시나리오의 민감도 수준과 밀접한 관련이 있었으며, 민감도가 높은 시나리오에서 더 잘 식별하는 경향을 나타냈습니다.

## AI 실무자를 위한 시사점
**MLLM 기반 스마트폰 에이전트** 개발 시 **개인정보 보호에 특화된 훈련** 과 **정렬 전략** 의 중요성을 강조합니다. 현재 에이전트들은 기능적 효율성과 정확성에 주로 초점을 맞추고 있어 민감한 정보 처리 시 잠재적인 위험을 경고하거나 완화하는 데 어려움이 있습니다. **신중하게 설계된 프롬프트 프레임워크** 를 통합하는 것이 에이전트의 개인정보 보호 인식을 효과적으로 향상시켜 안전한 배포에 기여할 수 있음을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.