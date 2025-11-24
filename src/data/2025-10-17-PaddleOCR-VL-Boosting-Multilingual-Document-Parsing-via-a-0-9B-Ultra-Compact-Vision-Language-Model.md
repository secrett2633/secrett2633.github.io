---
title: "[논문리뷰] PaddleOCR-VL: Boosting Multilingual Document Parsing via a 0.9B
  Ultra-Compact Vision-Language Model"
excerpt: "이 [arXiv]에 게시한 'PaddleOCR-VL: Boosting Multilingual Document Parsing via a 0.9B
  Ultra-Compact Vision-Language Model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Document Parsing
  - Vision-Language Model
  - Multilingual OCR
  - Layout Analysis
  - Resource-Efficient AI
  - Table Recognition
  - Formula Recognition
  - Chart Recognition

permalink: /ai/review/2025-10-17-PaddleOCR-VL-Boosting-Multilingual-Document-Parsing-via-a-0-9B-Ultra-Compact-Vision-Language-Model/

toc: true
toc_sticky: true

date: 2025-10-17 13:09:57+0900
last_modified_at: 2025-10-17 13:09:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.14528)

**저자:** Cheng Cui, Ting Sun, Suyin Liang, Tingquan Gao, Zelun Zhang, Jiaxuan Liu, Xueqing Wang, Changda Zhou, Hongen Liu, Manhui Lin, Yue Zhang, Yubo Zhang, Handong Zheng, Jing Zhang, Jun Zhang, Yi Liu, Dianhai Yu, Yanjun Ma



## 핵심 연구 목표
본 논문은 다국어 문서 파싱을 위한 **SOTA(State-of-the-Art)** 및 **자원 효율적인** 모델인 PaddleOCR-VL을 개발하는 것을 목표로 합니다. 복잡한 문서 요소(텍스트, 표, 수식, 차트)를 **109개 언어**로 정확하게 인식하면서도 최소한의 자원 소비와 빠른 추론 속도를 유지하는 것을 주된 연구 목적으로 삼습니다.

## 핵심 방법론
PaddleOCR-VL은 두 단계로 구성된 아키텍처를 사용합니다. 첫 번째 단계인 **PP-DocLayoutV2**는 **RT-DETR 기반 객체 탐지 모델**과 **포인터 네트워크(18)**를 활용하여 레이아웃 분석 및 읽기 순서 예측을 수행합니다. 두 번째 단계인 **PaddleOCR-VL-0.9B**는 **NaViT 스타일 동적 고해상도 시각 인코더(15)**와 경량 **ERNIE-4.5-0.3B 언어 모델(5)**을 통합한 소형 **비전-언어 모델(VLM)**로, 세분화된 요소 인식을 담당합니다. 모델 훈련에는 대규모 모델을 통한 자동 주석 및 데이터 합성을 통해 구축된 **3천만 개의 고품질 훈련 샘플**이 활용되었습니다.

## 주요 결과
PaddleOCR-VL은 **OmniDocBench v1.5**에서 **전체 점수 92.56**를 달성하며 **SOTA 성능**를 입증했으며, 이는 다음으로 우수한 모델인 **MinerU2.5-1.2B(90.67)**를 능가하는 수치입니다. 특히, **최저 텍스트-편집 거리 0.035**, **최고 수식-CDM 점수 91.43**, 그리고 표-TEDS 및 읽기 순서 편집에서 선두적인 점수를 기록했습니다. 추론 성능 면에서는 **A100 GPU**에서 MinerU2.5 대비 **페이지 처리량 15.8%**, **토큰 처리량 14.2% 향상**을 보여주며 뛰어난 효율성을 입증했습니다.

## AI 실무자를 위한 시사점
PaddleOCR-VL은 복잡하고 다양한 언어로 구성된 문서를 효율적으로 처리해야 하는 **AI/ML 엔지니어** 및 **데이터 사이언티스트**에게 매우 실용적인 솔루션을 제공합니다. **0.9B 규모의 초소형 VLM**이 **SOTA 성능**를 달성했다는 점은 **자원 제약적인 환경**에서의 문서 파싱 애플리케이션 개발에 중요한 시사점을 줍니다. 특히 **109개 언어를 지원**하는 광범위한 다국어 역량과 **빠른 추론 속도**, **낮은 GPU 메모리 사용량**은 실제 서비스 배포 및 **RAG(Retrieval-Augmented Generation) 시스템**의 정보 추출 효율성 향상에 크게 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.