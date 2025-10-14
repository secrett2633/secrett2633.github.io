---
title: "[논문리뷰] PromptCoT 2.0: Scaling Prompt Synthesis for Large Language Model
  Reasoning"
excerpt: "Lingpeng Kong이 [arXiv]에 게시한 'PromptCoT 2.0: Scaling Prompt Synthesis for Large Language Model
  Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Prompt Synthesis
  - Large Language Models
  - Reasoning
  - Expectation-Maximization
  - Self-Play
  - Supervised Fine-Tuning
  - Task Generation
  - Rationale Generation

permalink: /ai/review/2025-9-29-PromptCoT_2.0_Scaling_Prompt_Synthesis_for_Large_Language_Model_Reasoning/

toc: true
toc_sticky: true

date: 2025-09-29 13:47:46+0900
last_modified_at: 2025-09-29 13:47:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.19894)

**저자:** Xueliang Zhao, Wei Wu, Jian Guan, Zhuocheng Gong, Lingpeng Kong



## 핵심 연구 목표
LLM 추론을 위한 고품질 훈련 문제의 부족이라는 핵심 병목 현상을 해결하고자 합니다. 특히, 수작업으로 큐레이션된 데이터셋의 높은 비용과 한계, 기존 합성 코퍼스의 낮은 난이도 및 다양성 문제를 극복하기 위해 **확장 가능하고 다양한 고난도 추론 프롬프트 생성 프레임워크인 PromptCoT 2.0**을 개발하는 것이 목표입니다.

## 핵심 방법론
**PromptCoT 2.0**은 수작업 휴리스틱 대신 **EM (Expectation-Maximization) 기반 최적화 절차**를 도입하여 합리성 생성과 프롬프트 구성을 공동으로 개선합니다. **E-단계**에서는 합리성 생성 모델(**qφ(z|c,x)**)을 업데이트하고, **M-단계**에서는 프롬프트 생성 모델(**pθ(z,x|c)**)을 업데이트하며, 이 반복적인 루프는 합리성을 통해 프롬프트 구성을 안내하고 더 효과적인 합리성을 발견하도록 합니다. 합성된 프롬프트는 **Self-Play**와 **Supervised Fine-Tuning (SFT)**이라는 두 가지 후처리 훈련 방식에 활용됩니다.

## 주요 결과
**Self-Play** 설정에서 **PromptCoT 2.0**는 **Qwen3-30B-A3B-Thinking-2507** 모델의 **AIME 24** 정확도를 **87.7%에서 92.1%로 (+4.4)**, **HMMT Feb 25**를 **71.4%에서 76.7%로 (+5.3)** 향상시켰으며, **LiveCodeBench v5/v6**에서도 각각 **+6.1%** 및 **+5.0%**의 높은 개선을 보였습니다. **SFT** 설정에서는 **Qwen2.5-7B-Instruct**가 합성 프롬프트만으로 **AIME 24**에서 **12.8%에서 73.1%**로, **AIME 25**에서 **8.0%에서 65.6%**로 정확도가 대폭 향상되어 인간 또는 하이브리드 데이터로 훈련된 모델을 능가했습니다. 난이도 분석 결과, **PromptCoT 2.0**은 기존 데이터셋보다 훨씬 더 어렵고 분포적으로 독특한 문제를 생성함이 확인되었습니다.

## AI 실무자를 위한 시사점
이 연구는 **EM 기반의 합리성-구동 프롬프트 합성**이 LLM의 추론 능력을 확장하기 위한 강력하고 확장 가능한 방법임을 입증했습니다. 특히, 고품질의 어려운 훈련 데이터 부족 문제를 해결하여 **LLM 개발의 주요 병목을 해소**할 수 있습니다. **Self-Play**와 **SFT**의 효과적인 활용은 모델이 외부 감독 없이도 스스로 학습하고, 약한 모델이 강력한 교사로부터 지식을 증류받을 수 있는 실용적인 방안을 제시하며, **오픈소스 LLM의 성능 향상**에 크게 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.