---
title: "[논문리뷰] Masks Can Be Distracting: On Context Comprehension in Diffusion Language Models"
excerpt: "arXiv에 게시된 'Masks Can Be Distracting: On Context Comprehension in Diffusion Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Language Models
  - Masked Diffusion Language Models
  - Context Comprehension
  - Locality Bias
  - Mask Tokens
  - Fine-tuning
  - Mask-agnostic Loss
  - Long-context Processing

permalink: /ai/review/2025-12-03-Masks-Can-Be-Distracting-On-Context-Comprehension-in-Diffusion-Language-Models/

toc: true
toc_sticky: true

date: 2025-12-03 00:00:00+0900+0900
last_modified_at: 2025-12-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.21338)

**저자:** Julianna Piskorz, Cristina Pinneri, Alvaro Correia, Motasem Alfarra, Risheek Garrepalli, Christos Louizos



## 핵심 연구 목표
본 연구는 **Masked Diffusion Language Models (MDLMs)** 의 컨텍스트 이해 능력을 체계적으로 조사하고, **locality bias** 및 마스크 토큰 사용이 성능에 미치는 영향을 파악하는 것을 목표로 합니다. 특히, **MDLMs** 가 **Autoregressive Language Models (ARLMs)** 의 알려진 포지션 바이어스를 극복하는지 검증하고자 합니다.

## 핵심 방법론
연구진은 **LLaDA-8B** 및 **Dream-7B** ( **MDLMs** )와 **Llama3-8B** 및 **Qwen2.5-7B** ( **ARLMs** )를 대상으로 **few-shot learning tasks** 를 활용하여 컨텍스트 내 관련 정보의 위치 변화에 따른 성능 민감도를 평가했습니다. **gradient attribution analysis** 를 통해 각 토큰의 영향력을 분석하고, 마스크 토큰이 **MDLM** 의 컨텍스트 이해에 미치는 방해 효과를 조사했습니다. 이러한 문제를 완화하기 위해 **mask-agnostic loss function (CE + TV loss)** 을 제안하고 **LoRA 어댑터** 를 사용한 **supervised fine-tuning** 을 수행했습니다.

## 주요 결과
**MDLMs** 는 **ARLMs** 와 유사하게 **강력한 locality bias** 를 보였으며, 관련 정보가 마스크 토큰에 가까울수록 성능이 높게 나타났습니다. 특히, **LLaDA 모델** 의 경우 추가 마스크 토큰 수가 증가함에 따라 성능이 **23%에서 27%까지 하락** 하는 **inverse scaling law** 가 관찰되었습니다. 하지만 제안된 **mask-agnostic loss (CE+TV)** 로 **LLaDA-Base-8B** 를 미세 조정했을 때, 마스크 토큰 증가로 인한 성능 저하가 **15.5%에서 7.9%로 49% 감소** 하며 **locality bias** 도 완화되었습니다.

## AI 실무자를 위한 시사점
**MDLMs** 의 효과적인 배포를 위해서는 마스크 토큰 구성이 **평가 및 훈련의 핵심 요소** 임을 인지하고, **표준화된 평가 가이드라인** 을 수립하는 것이 중요합니다. **MDLM** 의 **locality bias** 와 마스크 토큰의 **방해 효과** 는 장거리 컨텍스트 이해에 부정적인 영향을 미치므로, 모델 설계 및 훈련 시 이러한 특성을 고려해야 합니다. 제안된 **mask-agnostic fine-tuning** 기법은 마스크 토큰 수 변화에 대한 모델의 **견고성을 크게 향상** 시키며, 특히 **저지연 애플리케이션** 에서 효과적인 단일 디코딩 스텝을 지원할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.