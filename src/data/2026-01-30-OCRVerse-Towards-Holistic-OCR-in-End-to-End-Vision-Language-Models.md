---
title: "[논문리뷰] OCRVerse: Towards Holistic OCR in End-to-End Vision-Language Models"
excerpt: "Liming Zheng이 [arXiv]에 게시한 'OCRVerse: Towards Holistic OCR in End-to-End Vision-Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Holistic OCR
  - Vision-Language Models
  - Multi-domain Training
  - Text-centric OCR
  - Vision-centric OCR
  - SFT-RL
  - Code Generation
  - Document Understanding

permalink: /ai/review/2026-01-30-OCRVerse-Towards-Holistic-OCR-in-End-to-End-Vision-Language-Models/

toc: true
toc_sticky: true

date: 2026-01-30 00:00:00+0900+0900
last_modified_at: 2026-01-30 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.21639)

**저자:** Yufeng Zhong, Lei Chen, Xuanle Zhao, Wenkang Han, Liming Zheng, Jing Huang, Deyang Jiang, Yilin Cao, Lin Ma, Zhixiong Zeng



## 핵심 연구 목표
본 논문은 기존의 파편화된 OCR 접근법의 한계를 극복하고, 텍스트 중심(Text-centric) 및 비전 중심(Vision-centric) OCR 기능을 통합하는 **최초의 엔드-투-엔드(end-to-end) 통합 OCR 방법론** 인 OCRVerse를 제안합니다. 이는 시각적으로 정보 밀도가 높은 이미지 소스(예: 차트, 웹페이지, 과학 플롯)에서 텍스트와 시각적 요소를 동시에 식별하고 구조화된 코드로 변환하는 능력을 목표로 합니다.

## 핵심 방법론
OCRVerse는 **Qwen3-VL 4B** 를 기반으로 하는 경량 아키텍처를 사용하며, **포괄적인 데이터 엔지니어링** 과 혁신적인 **2단계 SFT-RL(Supervised Fine-Tuning - Reinforcement Learning) 다중 도메인 훈련 방법론** 을 통해 구축됩니다. SFT 단계에서는 다양한 도메인 데이터를 혼합하여 기초적인 교차 도메인 지식을 확립하고, RL 단계에서는 각 도메인의 특성에 맞춘 **개인화된 보상 전략** 을 통해 도메인 충돌을 해결하고 성능을 최적화합니다.

## 주요 결과
OCRVerse는 **OmniDocBench v1.5** 에서 **89.23%** 의 우수한 종합 점수를 달성하며 최상위 엔드-투-엔드 특화 VLM들과 경쟁력 있는 성능을 보였습니다. 특히, **ChartMimic** 에서 **84.8%의 실행 성공률** 을 기록하여 8B 파라미터 오픈소스 모델들을 능가했으며, **Image2LaTeX-plot** 에서는 **88.7%의 렌더링 성공률** 로 GPT-5를 포함한 모든 기준선 모델을 크게 뛰어넘었습니다. 또한, 4B 파라미터 모델임에도 불구하고 70B 파라미터 모델과 유사하거나 그 이상의 성능을 제공하여 뛰어난 **파라미터 효율성** 을 입증했습니다.

## AI 실무자를 위한 시사점
OCRVerse는 단일 모델로 텍스트와 시각적 요소의 복합적인 정보를 처리할 수 있는 **홀리스틱 OCR 패러다임** 을 제시하여 AI/ML 개발의 새로운 방향을 제시합니다. 경량 모델로도 강력한 성능을 발휘하므로, 자원 제약이 있는 환경에서도 데이터 시각화, 웹페이지 분석, 지능형 콘텐츠 이해 등 다양한 **실세계 애플리케이션** 에 활용될 수 있습니다. 특히, **도메인별 RL 미세 조정 전략** 은 복잡한 멀티모달 태스크에서 모델의 적응성과 성능을 극대화하는 데 중요한 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.