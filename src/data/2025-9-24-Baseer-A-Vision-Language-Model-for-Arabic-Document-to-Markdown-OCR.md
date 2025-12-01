---
title: "[논문리뷰] Baseer: A Vision-Language Model for Arabic Document-to-Markdown OCR"
excerpt: "Zeina Aldallal이 [arXiv]에 게시한 'Baseer: A Vision-Language Model for Arabic Document-to-Markdown OCR' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Arabic OCR
  - Vision-Language Model
  - Fine-tuning
  - Document Understanding
  - Markdown Conversion
  - Benchmark

permalink: /ai/review/2025-9-24-Baseer-A-Vision-Language-Model-for-Arabic-Document-to-Markdown-OCR/

toc: true
toc_sticky: true

date: 2025-09-24 13:14:19+0900
last_modified_at: 2025-09-24 13:14:19+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.18174)

**저자:** Khalil Hennara, Muhammad Hreden, Mohamed Motasim Hamed, Ahmad Bastati, Zeina Aldallal, Sara Chrouf, Safwan AlModhayan



## 핵심 연구 목표
본 논문은 필기체 스크립트, 다양한 글꼴, 발음 기호, 우-좌향 텍스트 방향성으로 인해 어려운 아랍어 문서 OCR의 과제를 해결하고자 합니다. 기존 멀티모달 대규모 언어 모델(MLLM)의 아랍어 문서 이해 능력 한계를 극복하고, 아랍어 문서 OCR을 위한 **State-of-the-Art 성능** 을 달성하는 **Baseer** 모델을 개발하는 것이 목표입니다.

## 핵심 방법론
**Qwen2.5-VL-3B-Instruct** 모델을 기반으로, **500k 쌍의 하이브리드 데이터셋** (300k 합성 문서 및 200k 실제 문서)을 활용하여 미세 조정했습니다. 특히, **vision encoder는 동결** 하고 **language decoder만 업데이트** 하는 **decoder-only fine-tuning 전략** 을 채택하여 일반적인 시각적 특징을 유지하면서 언어 모델을 아랍어 문서에 최적화했습니다. 또한, 최적의 컨텍스트 길이는 **4096 토큰** 으로 설정되었습니다.

## 주요 결과
Baseer는 새로 제안된 **Misraj-DocOCR 벤치마크** 에서 **WER 0.25** 를 달성하여 기존 오픈 소스 및 상용 솔루션보다 현저히 뛰어난 성능을 보였습니다. 수정된 **KITAB-Bench PDF-to-Markdown 벤치마크** 에서도 **TEDS 56** 과 **MARS 68.13** 을 기록하며 구조적 이해 능력에서 우수성을 입증했습니다. **Decoder-only fine-tuning 전략** 이 **ChrF 89.79** 로 가장 좋은 성능을 나타냈습니다.

## AI 실무자를 위한 시사점
본 연구는 일반적인 MLLM을 아랍어 OCR과 같이 **도메인 특화된 복잡한 언어 처리** 에 성공적으로 적용하는 효과적인 전략을 제시합니다. **고품질의 대규모 하이브리드 데이터셋 구축** 과 **효율적인 fine-tuning 방법론** 은 형태학적으로 풍부한 언어의 OCR 성능을 크게 향상시킬 수 있음을 보여줍니다. 공개된 **Misraj-DocOCR 벤치마크** 는 향후 아랍어 OCR 연구 및 시스템 평가에 중요한 표준 자료로 활용될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.