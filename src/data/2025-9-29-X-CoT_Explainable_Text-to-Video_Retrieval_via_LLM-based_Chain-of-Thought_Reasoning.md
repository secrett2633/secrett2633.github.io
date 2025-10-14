---
title: "[논문리뷰] X-CoT: Explainable Text-to-Video Retrieval via LLM-based
  Chain-of-Thought Reasoning"
excerpt: "Raghuveer Rao이 [arXiv]에 게시한 'X-CoT: Explainable Text-to-Video Retrieval via LLM-based
  Chain-of-Thought Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Text-to-Video Retrieval
  - LLM
  - Chain-of-Thought
  - Explainable AI
  - Multimodal Retrieval
  - Bradley-Terry Model
  - Video Annotation

permalink: /ai/review/2025-9-29-X-CoT_Explainable_Text-to-Video_Retrieval_via_LLM-based_Chain-of-Thought_Reasoning/

toc: true
toc_sticky: true

date: 2025-09-29 13:47:46+0900
last_modified_at: 2025-09-29 13:47:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.21559)

**저자:** Prasanna Reddy Pulakurthi, Jiamian Wang, Majid Rabbani, Sohail Dianat, Raghuveer Rao, Zhiqiang Tao



## 핵심 연구 목표
본 논문은 기존 임베딩 모델 기반 텍스트-비디오 검색 시스템의 한계, 즉 낮은 데이터 품질의 영향 및 랭킹 결과에 대한 설명 부족 문제를 해결하는 것을 목표로 합니다. 특히, 검색 모델의 동작과 텍스트-비디오 데이터 품질을 평가하기 위해 랭킹 결과를 해석할 수 있는 **설명 가능한 검색 시스템**인 X-CoT를 제안합니다.

## 핵심 방법론
본 연구는 **LLM 기반 CoT(Chain-of-Thought) 추론**을 활용하여 기존의 코사인 유사도 기반 랭킹을 대체합니다. 먼저, **MLLM (Qwen2.5-VL-7B-Captioner-Relaxed) 기반 파이프라인**을 통해 기존 벤치마크 데이터셋에 구조화된 비디오 주석을 추가하여 의미 이해를 돕고 데이터 편향을 줄입니다. 이후, 초기 **top-K 후보 비디오 풀**에 대해 LLM이 **쌍별 비교(pairwise comparison)**를 수행하여 선호도와 텍스트 설명을 생성하며, 이 결과를 **Bradley-Terry (BT) 모델**로 집계하여 노이즈 및 순환 판단을 수정하고 최종 랭킹을 도출합니다. 효율성 향상을 위해 슬라이딩 윈도우, LRU 캐싱, 홀짝 병렬화 및 GPU 병렬화를 적용하여 LLM 호출 수를 줄였습니다.

## 주요 결과
X-CoT는 **MSR-VTT, MSVD, DiDeMo, LSMDC** 등 다양한 벤치마크 데이터셋에서 **CLIP** 및 **X-Pool**과 같은 임베딩 모델의 검색 성능을 크게 향상시켰습니다. 예를 들어, **MSVD 데이터셋에서 CLIP 모델 대비 R@1 지표에서 +5.6%**, **X-Pool 모델 대비 R@1 지표에서 +1.9%**의 성능 향상을 보였습니다. 또한, **CoT 추론**이 없을 경우 **R@1 성능이 -2.9% 하락**하여 CoT의 중요성을 입증했으며, X-CoT 재랭킹 결과와 생성된 설명 임베딩 간의 유사도(simxcot = **0.350**)가 기존 베이스라인(simbaseline = **0.273**)보다 높아 설명의 의미적 충실도를 보여주었습니다.

## AI 실무자를 위한 시사점
X-CoT는 블랙박스 임베딩 모델의 한계를 넘어, **모델 동작과 데이터 품질을 진단할 수 있는 투명하고 추적 가능한 검색 시스템**을 제공합니다. 이는 AI/ML 엔지니어들이 검색 모델의 실패 원인(예: 놓친 의미적 요소)과 저품질 데이터를 식별하는 데 도움을 줍니다. 또한, 기존 검색 시스템 위에 추가 학습 없이 **플러그 앤 플레이** 방식으로 통합될 수 있어, 설명 가능성과 견고성을 향상시키는 실용적인 솔루션으로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.