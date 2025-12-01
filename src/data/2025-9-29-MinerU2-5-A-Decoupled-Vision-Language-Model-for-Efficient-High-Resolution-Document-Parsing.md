---
title: "[논문리뷰] MinerU2.5: A Decoupled Vision-Language Model for Efficient
  High-Resolution Document Parsing"
excerpt: "SunYuefeng이 [arXiv]에 게시한 'MinerU2.5: A Decoupled Vision-Language Model for Efficient
  High-Resolution Document Parsing' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Document Parsing
  - Vision-Language Model
  - High-Resolution
  - Two-Stage Inference
  - Layout Analysis
  - Content Recognition
  - Data Engine
  - Computational Efficiency

permalink: /ai/review/2025-9-29-MinerU2-5-A-Decoupled-Vision-Language-Model-for-Efficient-High-Resolution-Document-Parsing/

toc: true
toc_sticky: true

date: 2025-09-29 13:47:46+0900
last_modified_at: 2025-09-29 13:47:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.22186)

**저자:** Junbo Niu, Zheng Liu, Zhuangcheng Gu, Bin Wang, Linke Ouyang, et al.



## 핵심 연구 목표
본 연구는 기존 비전-언어 모델(VLM)이 고해상도 문서 처리 시 겪는 토큰 중복, 높은 계산 비용, 환각 문제 등의 한계를 극복하는 것을 목표로 합니다. 특히, 전반적인 계산 효율성을 유지하면서도 복잡하고 밀도 높은 문서의 구조 및 내용을 정확하게 파싱하기 위한 **효율적인 디커플링 비전-언어 모델** 을 제안합니다.

## 핵심 방법론
MinerU2.5는 **거친-세밀(coarse-to-fine)** 방식의 **두 단계 추론 메커니즘** 을 사용합니다. 첫 번째 단계에서는 다운샘플링된 이미지( **1036x1036 픽셀** )에서 효율적인 **전역 레이아웃 분석** 을 수행하고, 두 번째 단계에서는 감지된 레이아웃 가이드를 따라 원본 이미지의 **네이티브 해상도(최대 2048x28x28 픽셀)** 로 주요 영역을 잘라내어 **세밀한 내용 인식** 을 진행합니다. 모델 아키텍처는 **675M 파라미터 NaViT 비전 인코더** 와 **0.5B 파라미터 Qwen2-Instruct LM 디코더** 를 기반으로 하며, **Iterative Mining via Inference Consistency (IMIC)** 전략을 포함하는 **종합적인 데이터 엔진** 으로 대규모 고품질 학습 데이터를 구축합니다.

## 주요 결과
MinerU2.5는 **OmniDocBench, Ocean-OCR, olmOCR-bench** 등 다수의 벤치마크에서 **최첨단 성능(SOTA)** 을 달성했습니다. **OmniDocBench** 에서 **90.67** 의 전체 점수를 기록하여 **dots.ocr (88.41)** 및 **Gemini-2.5 Pro (88.03)** 를 능가했습니다. 특히 **텍스트 인식** 에서 **0.047** 의 가장 낮은 편집 거리를, **수식 인식** 에서 **88.46 CDM** 점수를, **테이블 인식** 에서 **88.22 TEDS** 점수를 기록하며 최고 성능을 입증했습니다. 또한 **A100 80G** 에서 **2.12 pages/s** 의 추론 처리량을 달성하여 **MonkeyOCR-Pro-3B** 보다 4배 빠른 효율성을 보여주었습니다.

## AI 실무자를 위한 시사점
MinerU2.5는 고해상도 문서 파싱에서 **전례 없는 정확도와 효율성** 을 제공하여 **RAG(Retrieval-Augmented Generation)** 및 정보 추출과 같은 다운스트림 AI 애플리케이션의 핵심 기반 도구로 활용될 수 있습니다. **디커플링된 2단계 전략** 은 복잡한 시각적 입력 처리에서 효율성과 정확성 사이의 균형을 맞추는 강력한 방법론을 제시하며, **경량 모델(1.2B 파라미터)** 설계는 실용적인 배포 가능성을 높여 AI 실무자들에게 큰 이점을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.