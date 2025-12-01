---
title: "[논문리뷰] Hala Technical Report: Building Arabic-Centric Instruction & Translation
  Models at Scale"
excerpt: "Bernard Ghanem이 [arXiv]에 게시한 'Hala Technical Report: Building Arabic-Centric Instruction & Translation
  Models at Scale' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Arabic NLP
  - Instruction Tuning
  - Machine Translation
  - Large Language Models
  - FP8 Quantization
  - Data Bootstrapping
  - Model Merging
  - Language-Centric AI

permalink: /ai/review/2025-9-18-Hala-Technical-Report-Building-Arabic-Centric-Instruction-Translation-Models-at-Scale/

toc: true
toc_sticky: true

date: 2025-09-18 13:07:00+0900
last_modified_at: 2025-09-18 13:07:00+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.14008)

**저자:** Hasan Abed Al Kader Hammoud, Mohammad Zbeeb, Bernard Ghanem



## 핵심 연구 목표
아랍어 고품질 명령어 데이터의 부족과 다국어 LLM에서 언어별 깊이의 불균형 문제를 해결하는 것을 목표로 합니다. 효율적인 **번역-튜닝 파이프라인** 을 통해 아랍어 중심의 명령어 및 번역 모델(HALA) 패밀리를 구축하고, 아랍어 벤치마크에서 최첨단 성능을 달성하여 특정 언어에 대한 역량 심화에 중점을 둡니다.

## 핵심 방법론
강력한 다국어 번역 모델( **CohereLabs/command-a-translate-08-2025** )을 **FP8 양자화** 및 **LLM Compressor** 를 사용하여 압축하고, **Open-Orca** 및 필터링된 **OPUS-100** 에서 파생된 **1.26M AR↔EN 이중 언어 코퍼스** 로 미세 조정하여 경량 번역기를 구축합니다. 이 경량 번역기를 사용하여 다양한 영어 명령어 데이터셋을 **4.5M 샘플 규모의 아랍어 명령어 코퍼스** 로 변환하고, 이를 기반으로 **HALA 모델(350M, 700M, 1.2B, 9B)** 을 미세 조정한 후, **slerp 머징(t=0.5)** 을 적용하여 아랍어 특화와 기본 모델의 강점을 균형 있게 결합합니다.

## 주요 결과
HALA 모델들은 아랍어 중심 벤치마크에서 기본 모델들( **LiquidAI/LFM2** , **FANAR** )을 일관되게 능가합니다. 특히 **HALA-1.2B 모델** 은 나노(≤2B) 카테고리에서 **51.4%의 평균 점수** 를 달성하며 최고 성능을 기록했고, **HALA-9B 모델** 은 스몰(7-9B) 카테고리에서 **69.9%의 평균 점수** 로 이전 SOTA 모델인 **QCRI/Fanar-1-9B-Instruct** 를 넘어섰습니다. 또한, **FP8 양자화된 교사 모델** 은 번역 품질을 유지하면서 **처리량(throughput)을 약 2배** 향상시켰고, 경량 **LFM2-1.2B 번역기** 는 EN→AR MMLU 번역에서 **BLEU 점수를 16.0에서 48.2로, chrF++를 43.2에서 64.2로 크게 개선** 했습니다.

## AI 실무자를 위한 시사점
이 연구는 **제한된 컴퓨팅 예산** 으로도 특정 언어(아랍어)에 특화된 고성능 LLM을 구축할 수 있는 **효율적인 파이프라인** 을 제시합니다. **FP8 양자화** 와 **데이터 부트스트래핑 전략** 은 자원이 부족한 언어의 LLM 개발에 특히 유용하며, **대규모 영어 데이터셋을 활용하여 고품질 아랍어 명령어 데이터를 생성** 하는 실용적인 방법을 제공합니다. **slerp 머징 기법** 은 언어 전문성을 유지하면서도 범용적인 모델 강점을 결합하는 효과적인 방안으로, **다국어 LLM의 특정 언어 성능 최적화** 에 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.