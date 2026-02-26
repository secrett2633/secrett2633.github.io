---
title: "[논문리뷰] NoLan: Mitigating Object Hallucinations in Large Vision-Language Models via Dynamic Suppression of Language Priors"
excerpt: "Xinchao Wang이 [arXiv]에 게시한 'NoLan: Mitigating Object Hallucinations in Large Vision-Language Models via Dynamic Suppression of Language Priors' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Vision-Language Models (LVLMs)
  - Object Hallucinations
  - Language Priors
  - Contrastive Decoding
  - Dynamic Suppression
  - Training-Free
  - Multimodal AI

permalink: /ai/review/2026-02-26-NoLan-Mitigating-Object-Hallucinations-in-Large-Vision-Language-Models-via-Dynamic-Suppression-of-Language-Priors/

toc: true
toc_sticky: true

date: 2026-02-26 00:00:00+0900+0900
last_modified_at: 2026-02-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.22144)

**저자:** Lingfeng Ren, Weihao Yu, Runpeng Yu, Xinchao Wang



## 핵심 연구 목표
본 논문은 **Large Vision-Language Models (LVLMs)** 에서 출력 이미지에 존재하지 않는 객체를 생성하는 **객체 환각(Object Hallucinations)** 문제를 해결하는 것을 목표로 합니다. 특히, 이러한 환각이 시각 인코더와 언어 디코더 중 어느 구성 요소에서 주로 발생하는지 분석하고, 이를 바탕으로 효과적인 완화 방법을 제시하고자 합니다.

## 핵심 방법론
체계적인 실험을 통해 객체 환각이 주로 **언어 디코더의 강력한 언어 사전(language priors)** 에서 기인함을 밝혀냈습니다. 이에 기반하여, 언어 사전의 영향을 동적으로 억제하는 **No-Language-Hallucination Decoding (NoLan)** 이라는 간단하고 **훈련 없는(training-free)** 프레임워크를 제안합니다. NoLan은 **멀티모달 입력** (`lm`)과 **텍스트 전용 입력** (`lu`)에서 생성된 출력 분포를 비교하여, **KL-divergence** 에 기반한 동적 조절(`NoLan-Plus`) 또는 고정된 조절(`NoLan-Base`)을 통해 언어 사전의 영향을 줄여나갑니다.

## 주요 결과
NoLan은 **POPE 벤치마크** 에서 **LLaVA-1.5 7B** 및 **Qwen-VL 7B** 모델의 정확도를 각각 최대 **6.45%** 및 **7.21%** 향상시키는 등, 다양한 LVLM 및 태스크에서 객체 환각을 효과적으로 감소시켰습니다. 전반적으로, 모든 테스트된 LVLM에서 정확도는 최대 **8.38%** , F1 점수는 최대 **8.77%** 개선되었습니다. 또한, **NoLan-Base** 는 다른 Contrastive Decoding 방법론 대비 **토큰당 0.6075초** 로 가장 빠른 추론 속도와 **13.59GB** 로 가장 낮은 메모리 사용량을 기록하며 효율성을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 LVLM의 객체 환각이 주로 언어 모델의 언어 사전에서 발생한다는 중요한 통찰력을 제공하여, AI 모델의 오류 원인에 대한 이해를 높입니다. **훈련 과정이 필요 없는(training-free)** **NoLan 프레임워크** 는 기존 LVLM에 쉽게 적용할 수 있는 **플러그 앤 플레이(plug-and-play)** 솔루션으로, **저렴한 비용** 과 **빠른 추론 속도** 로 모델의 **정확성과 신뢰성** 을 크게 향상시킬 수 있습니다. 이는 로봇 공학, 자율 시스템, 헬스케어와 같은 고위험 애플리케이션에서 LVLM의 실용적인 배포를 촉진하는 데 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.