---
title: "[논문리뷰] OmniOCR: Generalist OCR for Ethnic Minority Languages"
excerpt: "[arXiv]에 게시된 'OmniOCR: Generalist OCR for Ethnic Minority Languages' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - OCR
  - Ethnic Minority Languages
  - Low-Resource
  - Dynamic LoRA
  - Parameter-Efficient Fine-Tuning
  - Multimodal Models
  - Sparsity Regularization

permalink: /ai/review/2026-02-25-OmniOCR-Generalist-OCR-for-Ethnic-Minority-Languages/

toc: true
toc_sticky: true

date: 2026-02-25 00:00:00+0900+0900
last_modified_at: 2026-02-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.21042)

**저자:** Bonan Liu, Zeyu Zhang, Bingbing Meng, Han Wang, Hanshuo Zhang, Chengping Wang, Daji Ergu, Ying Cai



## 핵심 연구 목표
대부분의 OCR 시스템이 잘 알려진 스크립트에 집중되어 있어, 복잡한 문자 체계와 희소한 데이터를 가진 **소수 민족 언어(Ethnic Minority Languages)** 의 OCR은 zero-shot 환경에서 일반화가 어렵습니다. 이 연구는 이러한 문제를 해결하고 소수 민족 스크립트를 위한 범용적이고 효율적인 OCR 프레임워크인 **OmniOCR** 를 개발하는 것을 목표로 합니다.

## 핵심 방법론
**RolmOCR** 를 기반으로, **Dynamic Low-Rank Adaptation (Dynamic LoRA)** 모듈을 통합하여 모델 용량을 계층과 스크립트 전반에 걸쳐 적응적으로 할당합니다. 이 모듈은 **적응적 랭크 조정** 을 통해 지식 보존과 효율적인 적응을 균형 있게 맞추며, **L1 sparsity regularization** 을 적용하여 중복 업데이트를 제거하고 메모리 효율적인 적응을 보장합니다.

## 주요 결과
**OmniOCR** 는 **TibetanMNIST, Shui, Ancient Yi, Dongba** 4개 데이터셋에서 제로샷 파운데이션 모델과 표준 사후 훈련 방식을 일관되게 능가했습니다. 특히, 최첨단 baseline 모델 대비 **39%에서 66%** 의 정확도 향상을 달성했으며, Tibetan 데이터셋에서 **90.37%** 의 정확도를 기록하며 우수한 파라미터 효율성으로 최첨단 성능을 보였습니다.

## AI 실무자를 위한 시사점
**OmniOCR** 는 리소스가 부족한 소수 민족 언어 환경에서 고성능 OCR을 구현할 수 있는 실용적이고 확장 가능한 솔루션을 제공합니다. **Dynamic LoRA** 는 지식 보존과 효율적인 적응의 균형을 통해 새로운 스크립트 학습 시 **재앙적 망각(catastrophic forgetting)** 을 완화하는 중요한 방법을 제시합니다. 이는 문화 및 언어 유산 보존과 **범용 OCR 시스템 개발** 에 큰 기여를 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.