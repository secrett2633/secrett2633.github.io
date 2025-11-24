---
title: "[논문리뷰] Beyond English: Toward Inclusive and Scalable Multilingual Machine Translation with LLMs"
excerpt: "이 [arXiv]에 게시한 'Beyond English: Toward Inclusive and Scalable Multilingual Machine Translation with LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multilingual Machine Translation
  - Large Language Models
  - Directional Degeneration
  - Strategic Downsampling
  - Parallel Multilingual Prompting
  - Chinese-centric MT
  - Cross-lingual Transfer
  - Instruction Tuning

permalink: /ai/review/2025-11-12-Beyond-English-Toward-Inclusive-and-Scalable-Multilingual-Machine-Translation-with-LLMs/

toc: true
toc_sticky: true

date: 2025-11-12 00:00:00+0900+0900
last_modified_at: 2025-11-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.07003)

**저자:** Yingfeng Luo, Ziqiang Xu, Yuxuan Ouyang, Murun Yang, Dingyang Lin, Kaiyan Chang, Tong Zheng, Bei Li, Peinan Feng, Quan Du, Tong Xiao, Jingbo Zhu



## 핵심 연구 목표
본 논문은 기존 대규모 언어 모델(LLM) 기반 다국어 기계 번역(MMT) 시스템이 겪는 제한적인 언어 커버리지, 불안정한 번역 품질, 그리고 고질적인 영어 중심 편향 문제를 해결하는 것을 목표로 합니다. 특히, 대규모 다국어 SFT 과정에서 발생하는 **'방향성 퇴화(directional degeneration)'** 현상을 식별하고 완화하여, 중국어-영어 중심의 포괄적이고 확장 가능한 MMT를 구축하고자 합니다.

## 핵심 방법론
저자들은 **Qwen3**를 백본 모델로 활용하여 **CPT(Continued Pre-training)**와 **SFT(Supervised Fine-tuning)**의 2단계 적응 프레임워크를 적용합니다. SFT 단계에서 **대칭 다방향 데이터**로 인해 발생하는 방향성 퇴화 문제를 해결하기 위해 **Strategic Downsampling** 기법을 제안하여 **X → En/Zh 방향 샘플을 5%만 유지**하고 나머지 방향은 100% 유지합니다. 또한, 크로스-링구얼 전이를 강화하기 위해 **Parallel Multilingual Prompting (PMP)**을 도입하여 언어학적으로 유사한 보조 언어 문장으로 지침을 보강합니다.

## 주요 결과
**LMT** 모델은 유사한 언어 커버리지를 가진 모델들 중에서 SOTA 성능을 달성했습니다. 특히, **LMT-60-4B 모델**은 **Aya-101-13B** 및 **NLLB-54B**와 같은 훨씬 큰 모델들을 **상당한 COMET 점수 차이(X→Zh 방향에서 NLLB-54B 대비 7.5 COMET 포인트)**로 능가했습니다. **Strategic Downsampling**은 **X→Zh 방향에서 11.45 COMET 포인트, X→En 방향에서 5.83 COMET 포인트**의 성능 향상을 가져왔으며, **PMP**는 모든 방향에서 지속적인 성능 향상을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM 기반 MMT에서 **영어 중심 편향을 넘어 중국어-영어 중심의 시스템 구축**이 가능함을 보여주며, 글로벌 서비스 확장에 중요한 의미를 가집니다. **Strategic Downsampling**은 대규모 다국어 모델 학습 시 **데이터 불균형 및 방향성 문제**를 해결하는 실용적인 가이드라인을 제공하며, **Parallel Multilingual Prompting**은 저자원 언어의 번역 품질 향상을 위한 **크로스-링구얼 전이 전략**으로 활용될 수 있습니다. 공개된 **LMT 모델 스위트**는 향후 포괄적이고 고품질 MMT 연구를 위한 강력한 기준점이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.