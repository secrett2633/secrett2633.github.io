---
title: "[논문리뷰] PaddleOCR-VL-1.5: Towards a Multi-Task 0.9B VLM for Robust In-the-Wild Document Parsing"
excerpt: "Zelun Zhang이 [arXiv]에 게시한 'PaddleOCR-VL-1.5: Towards a Multi-Task 0.9B VLM for Robust In-the-Wild Document Parsing' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Document Parsing
  - Visual Language Model (VLM)
  - Robustness
  - Multi-task Learning
  - Layout Analysis
  - OCR
  - Real-world Scenarios
  - Parameter Efficiency

permalink: /ai/review/2026-02-02-PaddleOCR-VL-1-5-Towards-a-Multi-Task-0-9B-VLM-for-Robust-In-the-Wild-Document-Parsing/

toc: true
toc_sticky: true

date: 2026-02-02 00:00:00+0900+0900
last_modified_at: 2026-02-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.21957)

**저자:** Cheng Cui, Ting Sun, Suyin Liang, Tingquan Gao, Zelun Zhang, Jiaxuan Liu, Xueqing Wang, Changda Zhou, Hongen Liu, Manhui Lin, Yue Zhang, Yubo Zhang, Yi Liu, Dianhai Yu, Yanjun Ma



## 핵심 연구 목표
본 논문은 실제 환경에서 발생하는 스캔, 기울어짐, 왜곡, 화면 촬영, 조명 변화와 같은 **물리적 왜곡에 강건한 문서 파싱 모델** 을 개발하는 것을 목표로 합니다. 또한, 기존 모델의 한계를 넘어 **Seal Recognition** 및 **Text Spotting** 과 같은 새로운 기능을 통합하면서도 **0.9B** 의 초소형 **VLM** 으로 높은 효율성을 유지하고자 합니다.

## 핵심 방법론
이 연구는 **PaddleOCR-VL-1.5** 를 제안하며, 이는 **PP-DocLayoutV3** 를 통해 레이아웃 분석을 크게 개선합니다. **PP-DocLayoutV3** 는 **RT-DETR 객체 탐지기** 기반의 인스턴스 세그멘테이션과 **트랜스포머 디코더** 를 활용하여 다중 포인트 바운딩 박스와 논리적 읽기 순서를 동시에 예측하며 왜곡에 강건합니다. 또한, **NaViT-스타일 동적 해상도 인코더** 와 **ERNIE-4.5-0.3B 언어 백본** 을 유지하면서, **Uncertainty-Aware Cluster Sampling (UACS)** 및 **Group Relative Policy Optimization (GRPO)** 기반의 학습 전략을 통해 모델의 강건성과 일반화 성능을 강화했습니다.

## 주요 결과
**PaddleOCR-VL-1.5** 는 **OmniDocBench v1.5** 에서 **94.5%** 의 새로운 **SOTA 정확도** 를 달성했으며, 특히 새로 구축된 **Real5-OmniDocBench** 벤치마크에서는 **92.05%** 의 전체 정확도를 기록했습니다. 이 모델은 **0.9B** 의 작은 파라미터 규모에도 불구하고 **Qwen3-VL-235B** 및 **Gemini-3 Pro** 와 같은 대규모 범용 **VLM** 을 능가하는 성능을 보였습니다. 특히, 가장 어려운 **Skewing** 카테고리에서 **91.66%** 의 정확도를 달성하여 이전 모델 대비 **14.19%** 의 절대적인 개선을 이루었습니다.

## AI 실무자를 위한 시사점
**PaddleOCR-VL-1.5** 는 실제 환경에서 발생하는 다양한 문서 왜곡에 매우 강건한 **문서 파싱 솔루션** 을 제공합니다. 이는 **OCR** , **테이블** , **수식** , **차트** , **Seal Recognition** , **Text Spotting** 등 다양한 작업을 효율적으로 수행할 수 있는 **멀티태스킹 VLM** 이므로, **RAG 시스템** 및 **LLM** 기반의 문서 이해 애플리케이션에 매우 유용할 것입니다. 특히 **0.9B** 의 초소형 모델로 높은 효율성을 제공하여 리소스 제약이 있는 환경에서도 활용 가능성이 높습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.