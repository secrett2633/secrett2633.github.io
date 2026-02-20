---
title: "[논문리뷰] Fine-tuning Done Right in Model Editing"
excerpt: "Du Su이 arXiv에 게시한 'Fine-tuning Done Right in Model Editing' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Model Editing
  - Fine-tuning
  - Large Language Models
  - Catastrophic Forgetting
  - Breadth-First Pipeline
  - Depth-First Pipeline
  - Localized Tuning
  - Lifelong Learning

permalink: /ai/review/2025-9-29-Fine-tuning-Done-Right-in-Model-Editing/

toc: true
toc_sticky: true

date: 2025-09-29 13:47:46+0900
last_modified_at: 2025-09-29 13:47:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.22072)

**저자:** Wanli Yang, Fei Sun, Rui Tang, Hongyu Zang, Du Su, Qi Cao, Jingang Wang, Huawei Shen, Xueqi Cheng



## 핵심 연구 목표
이 논문은 대규모 언어 모델(LLM) 모델 편집에서 fine-tuning이 비효율적이라는 오랜 통념에 도전하고, 그 실패의 원인이 fine-tuning 자체의 한계가 아닌 부적절한 구현 방식에 있음을 밝힙니다. fine-tuning을 원칙적인 형태로 복원하고 최적의 튜닝 위치를 탐색하여 모델 편집을 위한 강력하고 확장 가능한 솔루션으로 재정의하는 것을 목표로 합니다.

## 핵심 방법론
기존 fine-tuning 기반 모델 편집 방법론의 주요 문제점으로 **Depth-First (DF) 파이프라인** (단일 패스, 샘플 단위 최적화) 사용과 최적화되지 않은 튜닝 위치를 지적합니다. 이를 해결하기 위해 표준적인 **Breadth-First (BF) 파이프라인** (epoch 기반, 미니 배치 최적화)을 복원하고, 계층 및 모듈 전반에 걸친 체계적인 분석을 통해 **후기 레이어의 MLP down-projection matrices** 를 튜닝하는 **LocFT-BF** 를 제안합니다.

## 주요 결과
단순히 **BF 파이프라인** 을 복원하고 미니 배치 최적화를 적용하는 것만으로 편집 성공률이 크게 향상되었으며, 특히 **FT-M** 은 **LLaMA3-8B** 에서 **약 80%의 신뢰성** 개선을 보였습니다. 제안된 **LocFT-BF** 는 최신 모델 편집 방법론들을 평균 **33.72%** 뛰어넘는 편집 성공률을 달성했으며, 일반적인 능력 유지와 효율성 면에서도 탁월한 성능을 보였습니다. 특히, **100K 순차 편집** 과 **72B 파라미터 모델** 에서 일반 능력을 희생하지 않고 안정적인 성능을 유지한 최초의 방법입니다.

## AI 실무자를 위한 시사점
이 연구는 LLM 모델 편집에서 fine-tuning의 잠재력을 재조명하여 AI 엔지니어들에게 **더욱 단순하고 효율적인 편집 방법론** 을 제공합니다. 복잡한 `locate-then-edit` 또는 `meta-learning` 기법의 높은 계산 오버헤드 없이, 적절한 학습 파이프라인 구성과 **세밀한 튜닝 위치 선택** 을 통해 대규모 LLM에서도 안정적이고 효과적인 지식 업데이트가 가능함을 보여줍니다. 이는 실세계 애플리케이션에서 LLM을 지속적으로 업데이트하는 데 실용적인 해결책이 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.