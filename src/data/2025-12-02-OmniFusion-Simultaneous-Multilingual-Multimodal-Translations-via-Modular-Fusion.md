---
title: "[논문리뷰] OmniFusion: Simultaneous Multilingual Multimodal Translations via Modular Fusion"
excerpt: "arXiv에 게시된 'OmniFusion: Simultaneous Multilingual Multimodal Translations via Modular Fusion' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Translation
  - Speech Translation
  - Simultaneous Translation
  - Large Language Models
  - Multimodal Foundation Models
  - Modular Fusion
  - End-to-End
  - Gated Fusion
  - OCR

permalink: /ai/review/2025-12-02-OmniFusion-Simultaneous-Multilingual-Multimodal-Translations-via-Modular-Fusion/

toc: true
toc_sticky: true

date: 2025-12-02 00:00:00+0900+0900
last_modified_at: 2025-12-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.00234)

**저자:** Sai Koneru, Matthias Huck, Jan Niehues



## 핵심 연구 목표
본 논문은 텍스트 전용 번역 LLM이 겪는 지연 시간과 멀티모달 컨텍스트 활용 불가능성, 그리고 MMFM이 가진 다국어 번역 성능 및 커버리지의 한계를 해결하고자 합니다. 궁극적으로 **MMFM과 번역 LLM을 융합** 하여 **동시 다국어 멀티모달 번역(Simultaneous Multilingual Multimodal Translations)** 을 효율적이고 종단 간(E2E)으로 수행하는 시스템을 구축하는 것이 목표입니다.

## 핵심 방법론
저자들은 **Qwen Omni 2.5-7B (MMFM)** 와 **SeedX PPO-7B (번역 LLM)** 를 융합한 **OmniFusion** 을 제안합니다. 이 모델은 MMFM의 **첫 번째, 중간, 마지막 레이어** 에서 은닉 상태를 추출하여 번역 LLM에 연결하는 **게이팅 융합(gated fusion) 방식** 을 사용합니다. 이미지 모달리티의 경우, 음성 인식을 위한 ASR과 유사하게 **OCR(광학 문자 인식)** 을 브릿지 태스크로 도입하여 교차 모달 정렬을 강화합니다.

## 주요 결과
**SimulST** 시나리오에서 **계단식 파이프라인 대비 약 1초의 지연 시간 감소** 를 달성하면서도 더 나은 번역 품질을 보였습니다. 오프라인 ST의 **XCOMET-XL** 평가에서는 이미지 컨텍스트 활용 시 **주요 및 심각 오류가 감소** 함을 확인했으며, **CoMMuTE 벤치마크** 에서 이미지-텍스트 번역(TIT)에 대해 **최첨단 성능** 을 기록했습니다. MMFM의 **첫 번째 및 중간 레이어** 가 멀티모달 정보 캡처에 가장 크게 기여하는 것으로 분석되었습니다.

## AI 실무자를 위한 시사점
**OmniFusion** 은 기존 ASR-MT 계단식 파이프라인의 **높은 지연 시간 문제** 를 해결하고, **음성 및 이미지 컨텍스트를 번역에 직접 활용** 하여 품질을 향상시킬 수 있는 **종단 간(E2E) 멀티모달 번역 시스템** 의 실용적인 구현 가능성을 제시합니다. 사전 훈련된 MMFM과 번역 LLM의 모듈식 융합은 **새로운 모델을 처음부터 학습하는 비용 없이** 멀티모달 기능을 확장하는 효율적인 전략으로 활용될 수 있습니다. 이는 **실시간 번역** 및 **컨텍스트 인식 번역 시스템** 개발에 중요한 기반 기술이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.