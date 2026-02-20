---
title: "[논문리뷰] DanQing: An Up-to-Date Large-Scale Chinese Vision-Language Pre-training Dataset"
excerpt: "Lan Wu이 arXiv에 게시한 'DanQing: An Up-to-Date Large-Scale Chinese Vision-Language Pre-training Dataset' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Pre-training
  - Chinese Dataset
  - Data Filtering
  - Cross-modal Retrieval
  - Zero-shot Classification
  - Multimodal LLMs
  - SigLIP

permalink: /ai/review/2026-01-16-DanQing-An-Up-to-Date-Large-Scale-Chinese-Vision-Language-Pre-training-Dataset/

toc: true
toc_sticky: true

date: 2026-01-16 00:00:00+0900+0900
last_modified_at: 2026-01-16 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.10305)

**저자:** Hengyu Shen, Tiancheng Gu, Bin Qin, Lan Wu, Yuling Wu, Shuo Tan, Zelong Sun, Jun Wang, Nan Wu, Xiang An, Weidong Cai, Ziyong Feng, Kaicheng Yang



## 핵심 연구 목표
본 연구는 고품질의 **중국어 이미지-텍스트 데이터** 의 부족으로 인해 지연되었던 중국어 비전-언어 사전 훈련(VLP) 연구의 발전을 목표로 합니다. 최신 웹 데이터를 기반으로 한 대규모 고품질 중국어 크로스모달 데이터셋인 **DanQing** 을 구축하고, 이를 통해 중국어 VLP 모델의 성능을 향상시키는 것이 주된 목적입니다.

## 핵심 방법론
**Common Crawl (2024-2025)** 에서 수집된 약 10억 개의 초기 이미지-텍스트 쌍으로부터, **다단계 필터링 파이프라인** 을 통해 **1억 개의 고품질 데이터** 를 선별했습니다. 이 파이프라인은 **거친 필터링(안전성, 텍스트 길이, 소스 신뢰도)** , **정교한 텍스트 필터링(언어 구조, 품질, 정보 밀도, 안전성)** , **정교한 이미지 필터링(시각적 충실도, 정보 밀도, 이미지 중복성, 안전성)** , 그리고 **크로스모달 필터링(Chinese-CLIP-L14 유사도)** 을 포함합니다. 모델 훈련에는 **SigLIP [62] 목적 함수** 가 사용되었습니다.

## 주요 결과
**DanQing** 데이터셋은 **1억 개의 이미지-텍스트 쌍** 으로 구성되며, 기존 데이터셋 대비 우수한 데이터 품질과 최신성을 자랑합니다. **SigLIP2 모델** 을 이용한 실험 결과, 제로샷 분류에서 Wukong 및 Zero 데이터셋 대비 평균 **0.5%~1.9%** 성능 향상을 보였으며, 특히 **SigLIP2-B/32@256 모델** 에서 **65.4%** 의 평균 정확도를 달성했습니다. 크로스모달 검색 및 LMM 기반 평가에서도 지속적으로 우수한 성능을 보여, LMM 기반 평가에서는 **50.1%** 의 새로운 SOTA 점수를 기록했습니다.

## AI 실무자를 위한 시사점
**DanQing** 은 중국어 VLP 모델 개발을 위한 **고품질의 최신 대규모 데이터셋** 을 제공하여, 중국어 기반의 멀티모달 AI 연구를 가속화할 수 있는 강력한 기반을 마련했습니다. 제안된 **정교한 데이터 필터링 파이프라인** 은 웹 스케일 데이터셋 구축 시 발생하는 노이즈 문제를 효과적으로 해결하는 실용적인 방법론을 제시합니다. 또한, **DanQing** 으로 학습된 모델은 **새로운 개념 이해 능력** 이 향상되어, 빠르게 변화하는 실세계 지식을 반영하는 AI 시스템 구축에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.