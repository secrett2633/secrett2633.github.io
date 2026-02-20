---
title: "[논문리뷰] olmOCR 2: Unit Test Rewards for Document OCR"
excerpt: "arXiv에 게시된 'olmOCR 2: Unit Test Rewards for Document OCR' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Document OCR
  - Vision Language Model
  - Reinforcement Learning
  - Unit Tests
  - Synthetic Data Generation
  - RLVR
  - Document Parsing
  - State-of-the-Art OCR

permalink: /ai/review/2025-10-23-olmOCR-2-Unit-Test-Rewards-for-Document-OCR/

toc: true
toc_sticky: true

date: 2025-10-23 13:08:59+0900
last_modified_at: 2025-10-23 13:08:59+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.19817)

**저자:** Jake Poznanski, Luca Soldaini, Kyle Lo



## 핵심 연구 목표
본 논문은 인쇄된 문서를 깨끗하고 자연스럽게 정렬된 일반 텍스트로 변환하는 OCR 시스템인 **OLMOCR 2** 를 제안합니다. 특히, **강화 학습(RL)** 과 **검증 가능한 보상(RLVR)** 을 활용하여 수학 공식, 테이블 파싱, 다단 레이아웃과 같은 복잡한 문서 구조 처리 성능을 대폭 개선하는 것을 목표로 합니다.

## 핵심 방법론
**olmOCR-2-7B-1025** 라는 특수 **7B 비전 언어 모델(VLM)** 을 기반으로, **이진 단위 테스트** 를 검증 가능한 보상으로 사용하여 **RLVR** 방식으로 훈련되었습니다. 훈련 데이터는 다양한 레이아웃과 **HTML 소스 코드** 를 가진 합성 문서를 생성하는 파이프라인을 통해 확장되었으며, **Group Relative Policy Optimization (GRPO)** 이 이진 보상 신호와 함께 적용되었습니다. 또한, 동적 온도 스케일링, 프롬프트 개선, 모델 수프화 등의 기법도 활용되었습니다.

## 주요 결과
**OLMOCR 2** 는 **OLMOCR-BENCH** 에서 **82.4 ± 1.1** 의 점수를 달성하여 이전 버전인 OLMOCR의 **68.2 ± 1.1** 대비 **14.2점의 전체적인 성능 향상** 을 이루며 **최신 기술(SOTA) 성능** 을 달성했습니다. 특히 **수학 공식 변환** , **테이블 파싱** , **다단 레이아웃** 에서 가장 큰 개선을 보였습니다. 모델, 데이터, 코드는 모두 개방형 라이선스로 공개되었습니다.

## AI 실무자를 위한 시사점
강화 학습과 이진 단위 테스트를 활용한 접근 방식은 복잡한 문서 OCR, 특히 구조화된 정보 추출에 매우 효과적임을 보여줍니다. 합성 문서 생성 파이프라인은 고품질의 훈련 데이터와 단위 테스트를 대규모로 구축하는 확장 가능한 방법을 제공하여 수동 작업을 크게 줄일 수 있습니다. 공개된 모델, 데이터 및 코드는 VLM 기반 OCR 연구 및 응용 분야의 추가 발전을 촉진할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.