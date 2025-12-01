---
title: "[논문리뷰] miniF2F-Lean Revisited: Reviewing Limitations and Charting a Path Forward"
excerpt: "Farzan Farnia이 [arXiv]에 게시한 'miniF2F-Lean Revisited: Reviewing Limitations and Charting a Path Forward' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Automated Theorem Proving
  - Autoformalization
  - Benchmark Dataset
  - miniF2F
  - Lean Language
  - Large Language Models
  - Mathematical Reasoning
  - Formal Verification

permalink: /ai/review/2025-11-17-miniF2F-Lean-Revisited-Reviewing-Limitations-and-Charting-a-Path-Forward/

toc: true
toc_sticky: true

date: 2025-11-17 00:00:00+0900+0900
last_modified_at: 2025-11-17 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.03108)

**저자:** Azim Ospanov, Farzan Farnia, Roozbeh Yousefzadeh



## 핵심 연구 목표
본 연구는 AI 시스템이 수학 올림피아드 문제에 참여하는 시나리오에서 **miniF2F 벤치마크** 의 비공식 및 공식 진술 간의 불일치와 오류를 분석하고 해결하는 것을 목표로 합니다. 기존 벤치마크의 한계를 극복하고 자동 형식화 및 정리 증명 모델의 실제 성능을 보다 정확하게 평가할 수 있는 **고품질의 새로운 벤치마크 (miniF2F-v2)** 를 제공하고자 합니다.

## 핵심 방법론
연구팀은 **miniF2F 벤치마크** 의 488개 문제에 대한 비공식 및 공식 진술을 **수동으로 철저히 검토하고 수정** 했습니다. 이 과정에서 **miniF2F-v2s (단순화 버전)** 와 **miniF2F-v2c (경쟁 버전)** 두 가지 수정된 버전을 만들었으며, 특히 **v2c** 는 원래 올림피아드의 난이도를 반영하여 다중 선택 항목을 포함하거나 해답을 숨겼습니다. 이후 **Herald, Kimina, o4-mini** 와 같은 **SoTA 자동 형식화 모델** 및 **Deepseek-Prover, Goedel-Prover, Kimina-Prover** 등의 **정리 증명 모델** 을 사용한 엔드투엔드 파이프라인 평가를 수행했습니다.

## 주요 결과
엔드투엔드 파이프라인에서 기존 **miniF2F-v1** 의 정확도는 **36%** 였으나, **miniF2F-v2** 에서는 최대 **70%** 로 크게 향상되었습니다. 이는 벤치마크의 품질 개선이 모델 성능 평가에 미치는 긍정적 효과를 보여줍니다. 특히, LLM 기반 평가자(예: Herald **97%** )가 보고한 자동 형식화 정확도는 인간 전문가 검증(Herald **66%** ) 시 **상당히 과대평가** 되었음이 밝혀졌고, **miniF2F-v2** 에서 난이도가 높아진 문제들에 대한 정리 증명 모델의 성능은 **15-30% 감소** 했습니다.

## AI 실무자를 위한 시사점
이 연구는 **AI 기반 수학적 추론 시스템** 개발 및 평가에 있어 **엄격하게 검증된 고품질 벤치마크** 의 중요성을 강조합니다. **miniF2F-v2** 는 자동 형식화 및 정리 증명 모델의 실제적인 실패 원인을 명확히 진단하고, **데이터 오염** 과 **LLM 평가자의 한계** 에 대한 중요한 통찰을 제공하여 향후 연구 방향 설정에 기여할 것입니다. 실무자들은 **miniF2F-v2** 를 활용하여 더 견고하고 신뢰할 수 있는 모델을 개발할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.