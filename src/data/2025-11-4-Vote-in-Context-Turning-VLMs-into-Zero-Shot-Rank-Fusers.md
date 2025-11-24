---
title: "[논문리뷰] Vote-in-Context: Turning VLMs into Zero-Shot Rank Fusers"
excerpt: "이 [arXiv]에 게시한 'Vote-in-Context: Turning VLMs into Zero-Shot Rank Fusers' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Retrieval
  - Vision-Language Models (VLMs)
  - Zero-Shot Learning
  - List-wise Reranking
  - Rank Fusion
  - Prompt Engineering
  - S-Grid
  - Multimodal Retrieval

permalink: /ai/review/2025-11-4-Vote-in-Context-Turning-VLMs-into-Zero-Shot-Rank-Fusers/

toc: true
toc_sticky: true

date: 2025-11-09 19:22:42+0900
last_modified_at: 2025-11-09 19:22:42+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.01617)

**저자:** Mohamed Eltahir, Ali Habibullah, Lama Ayash, Tanveer Hussain, Naeemullah Khan



## 핵심 연구 목표
본 연구는 이질적인 검색기(retriever)로부터 얻은 후보군들을 융합할 때, 기존의 랭크 기반 융합 방식들이 콘텐츠를 무시하고 랭크나 스코어 신호에만 의존하는 한계를 극복하고자 합니다. 특히 비디오와 같은 복잡한 멀티모달 데이터에서 **Vision-Language Model (VLM)**을 활용하여 랭크 재정렬 및 융합을 **제로샷 추론 태스크**로 재정의하고, 검색기 합의와 시각-언어 콘텐츠를 적응적으로 통합하는 프레임워크를 개발하는 것을 목표로 합니다.

## 핵심 방법론
제안된 **Vote-in-Context (ViC)** 프레임워크는 콘텐츠 증거(예: 이미지 그리드, 텍스트)와 검색기 메타데이터(랭크, 교차 목록 다중성)를 **VLM의 프롬프트 내에 직접 직렬화**합니다. 비디오를 VLM이 읽을 수 있는 형식으로 변환하기 위해, 균일하게 샘플링된 프레임으로 구성된 단일 이미지 그리드에 선택적으로 자막을 포함하는 **S-Grid**라는 압축 직렬화 맵을 도입했습니다. **ViC**는 단일 목록 재정렬기(M=1)와 앙상블 퓨저(M>1) 두 가지 모드로 작동하며, **InternVL 3.5 38B**를 제로샷 VLM 재정렬기로 활용합니다.

## 주요 결과
**ViC**는 기존의 강력한 융합 기준선인 **CombSUM** 및 **RRF**를 일관되게 능가하는 성능을 보였습니다. 특히 제로샷 설정에서 **MSR-VTT 벤치마크**에서 **t2v Recall@1 87.1%** 및 **v2t Recall@1 89.0%**를 달성했으며, **VATEX 벤치마크**에서는 **v2t Recall@1 99.6%**를 기록하여 이전 SOTA 대비 **최대 +40 Recall@1**이라는 대폭적인 성능 향상을 보였습니다. 이는 **ViC**가 복잡한 시각 및 시간 신호를 효과적으로 처리하며 새로운 최첨단 성능을 확립했음을 보여줍니다.

## AI 실무자를 위한 시사점
본 연구는 최신 **VLM**을 강력한 제로샷 재정렬기 및 퓨저로 활용할 수 있는 간단하고 재현 가능하며 매우 효과적인 방법을 제시합니다. **S-Grid** 표현은 비디오 데이터를 **VLM**이 효율적으로 처리하도록 하여, 비디오 검색과 같은 멀티모달 태스크에서 **VLM** 통합의 실용성을 높였습니다. 프레임워크는 프롬프트 엔지니어링을 통해 메타데이터와 콘텐츠를 통합하여 적응적인 검색 의사결정을 가능하게 하며, 이는 **태스크별 학습의 필요성을 줄이는** 중요한 이점을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.