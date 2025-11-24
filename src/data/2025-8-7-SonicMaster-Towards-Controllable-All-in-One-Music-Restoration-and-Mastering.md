---
title: "[논문리뷰] SonicMaster: Towards Controllable All-in-One Music Restoration and
  Mastering"
excerpt: "Ambuj Mehrish이 [arXiv]에 게시한 'SonicMaster: Towards Controllable All-in-One Music Restoration and
  Mastering' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Music Restoration
  - Audio Mastering
  - Generative Models
  - Flow Matching
  - Text-to-Audio
  - Audio Quality Enhancement
  - Multi-task Learning
  - Dataset Creation

permalink: /ai/review/2025-8-7-SonicMaster-Towards-Controllable-All-in-One-Music-Restoration-and-Mastering/

toc: true
toc_sticky: true

date: 2025-08-07 13:38:21+0900
last_modified_at: 2025-08-07 13:38:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.03448)

**저자:** Jan Melechovsky, Ambuj Mehrish, Dorien Herremans



## 핵심 연구 목표
본 논문은 과도한 잔향, 왜곡, 클리핑, 음색 불균형 등 다양한 오디오 품질 문제를 해결하는 통합적이고 **텍스트 제어 가능한 음악 복원 및 마스터링 모델**을 개발하는 것을 목표로 합니다. 기존의 개별적인 전문 도구를 사용하는 복잡하고 수동적인 과정을 자동화하고 통합하여, 비전문가도 전문적인 오디오 품질을 얻을 수 있도록 하는 것입니다.

## 핵심 방법론
**SonicMaster**라는 **플로우 매칭(flow-matching) 기반의 생성 모델**을 제안합니다. 이를 위해 **SonicMaster 데이터셋**을 구축했는데, 이는 **25k개의 고품질 Jamendo 음악 샘플**에 **19가지의 일반적인 오디오 열화 유형**을 (EQ, 다이내믹스, 잔향, 진폭, 스테레오) 조합하여 적용한 것입니다. 모델은 **Multimodal DiT 및 DiT 블록**을 사용하며, **FLAN-T5 인코더**를 통해 자연어 지시를 받아 **오디오 변환**을 수행합니다.

## 주요 결과
**SonicMaster**는 모든 오디오 아티팩트 범주에서 음질을 **크게 향상**시켰으며, 특히 EQ의 경우 **Text2FX**를, 잔향의 경우 **WPE 및 HPSS**를 능가하는 성능을 보였습니다. 객관적 지표로, 단일 열화 스니펫에서 **7.743 PQ**를, 전체 스니펫에서 **7.705 PQ**를 달성하여 원본 음질(7.886 PQ)에 근접했습니다. 주관적 청취 테스트에서도 청취자들은 **SonicMaster**가 복원한 오디오를 원본보다 **더 선호**하는 것으로 나타났습니다.

## AI 실무자를 위한 시사점
**SonicMaster**는 여러 오디오 처리 작업을 단일 모델로 통합함으로써, AI 엔지니어와 콘텐츠 크리에이터가 복잡한 마스터링 과정을 간소화하고 효율성을 높일 수 있게 합니다. **텍스트 기반 제어**는 오디오 편집에 대한 직관적이고 세밀한 조작을 가능하게 하며, 구축된 **대규모 텍스트 조건부 음악 복원 데이터셋**은 향후 관련 연구 및 모델 개발에 중요한 기반을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.