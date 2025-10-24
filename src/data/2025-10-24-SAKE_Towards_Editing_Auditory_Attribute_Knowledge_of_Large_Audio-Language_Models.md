---
title: "[논문리뷰] SAKE: Towards Editing Auditory Attribute Knowledge of Large
  Audio-Language Models"
excerpt: "이 [arXiv]에 게시한 'SAKE: Towards Editing Auditory Attribute Knowledge of Large
  Audio-Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Knowledge Editing
  - Audio-Language Models
  - Auditory Attributes
  - Benchmark
  - Reliability
  - Generality
  - Locality
  - Portability

permalink: /ai/review/2025-10-24-SAKE_Towards_Editing_Auditory_Attribute_Knowledge_of_Large_Audio-Language_Models/

toc: true
toc_sticky: true

date: 2025-10-24 13:04:16+0900
last_modified_at: 2025-10-24 13:04:16+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.16917)

**저자:** Chih-Kai Yang*, Yen-Ting Piao*, Tzu-Wen Hsu, Szu-Wei Fu, Zhehuai Chen, Ke-Han Lu, Sung-Feng Huang, Chao-Han Huck Yang, Yu-Chiang Frank Wang, Yun-Nung Chen, Hung-yi Lee



## 핵심 연구 목표
본 논문은 기존 텍스트 및 시각 양상에 집중되었던 지식 편집 연구를 확장하여, **대규모 오디오-언어 모델(LALMs)**의 **추상적인 청각 속성 지식**을 편집하는 문제를 탐구합니다. 특히 **화자 성별, 감정, 언어, 동물 소리**와 같은 고수준의 청각 개념 편집에 대한 도전과 기회를 제시하고, 이를 체계적으로 평가할 수 있는 최초의 벤치마크를 구축하는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 **SAKE (Speech and Audio Attribute Knowledge Editing Benchmark)**를 도입하여 청각 속성 지식 편집을 **신뢰성(reliability), 일반화(generality), 지역성(locality), 휴대성(portability)**의 네 가지 차원에서 평가합니다. **DeSTA2.5-Audio**와 **Qwen2-Audio** 두 가지 LALM에 대해 **Fine-tuning (FT(LLM), FT(Audio))**, **Knowledge Editor (KE)**, **MEND**, **UnKE**, **In-Context Knowledge Editing (IKE) (I-IKE, IE-IKE)** 등 7가지 편집 방법론을 **단일 편집** 및 **순차 편집** 시나리오에서 벤치마킹했습니다.

## 주요 결과
**단일 편집** 시 **FT(LLM)**은 **DeSTA2.5-Audio**에서 **99.75%**의 최고 **신뢰성**을 보였으나, **I-IKE**와 **IE-IKE**는 저조했습니다. **일반화** 성능은 신뢰성보다 낮았으며, 특히 청각 입력에 대한 일반화(Type 2, Type 3)에서 어려움을 겪었습니다. **오디오 지역성** 유지도 도전적이었고, 특히 동일 속성 내 비관련 지식 보존(Type 2)이 가장 어려웠습니다. **휴대성**은 대체로 낮았지만, **FT(Audio)**가 가장 균형 잡힌 성능을 보였습니다. **순차 편집** 시 대부분의 방법은 **심각한 망각**을 겪었으나, **IKE 변형**은 비교적 안정적인 성능을 유지했습니다.

## AI 실무자를 위한 시사점
**LALM**에서 **청각 속성 지식 편집**은 아직 초기 단계이며, 특히 편집된 지식의 **일반화**와 **비관련 지식 보존**에 상당한 난관이 있습니다. 현재 방법론들은 순차 편집 시 **재앙적 망각**에 취약하므로, 실제 시나리오를 위한 **더욱 견고한 편집 기술** 개발이 시급합니다. **모달리티 커넥터 미세 조정(FT(Audio))**이 강력한 베이스라인으로 나타나, 해당 부분을 중심으로 한 연구가 **상호 연결된 지식의 전파**에 효과적일 수 있음을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.