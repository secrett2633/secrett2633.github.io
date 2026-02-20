---
title: "[논문리뷰] TV2TV: A Unified Framework for Interleaved Language and Video Generation"
excerpt: "arXiv에 게시된 'TV2TV: A Unified Framework for Interleaved Language and Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Language Modeling
  - Multimodal AI
  - Interleaved Generation
  - Flow Matching
  - Transformer
  - Controllability
  - World Models

permalink: /ai/review/2025-12-05-TV2TV-A-Unified-Framework-for-Interleaved-Language-and-Video-Generation/

toc: true
toc_sticky: true

date: 2025-12-05 00:00:00+0900+0900
last_modified_at: 2025-12-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.05103)

**저자:** Xiaochuang Han, Youssef Emad, Melissa Hall, John Nguyen, Karthik Padthe, Liam Robbins, Amir Bar, Delong Chen, Michal Drozdzal, Maha Elbayad, Yushi Hu, Shang-Wen Li, Sreya Dutta Roy, Jakob Verbeek, XuDong Wang, Marjan Ghazvininejad, Luke Zettlemoyer, Emily Dinan



## 핵심 연구 목표
본 논문은 복잡한 시맨틱 추론이나 반복적인 고수준 계획이 필요한 비디오 생성에서 기존 모델들이 겪는 한계를 극복하고자 합니다. 비디오 생성을 텍스트와 비디오 생성의 교차 프로세스로 분해함으로써 시각적 품질과 사용자 제어 가능성을 획기적으로 향상시키는 것을 목표로 합니다.

## 핵심 방법론
**TV2TV** 는 **Mixture-of-Transformers (MoT)** 아키텍처를 기반으로 언어 모델링(다음 토큰 예측)과 비디오 플로우 매칭(다음 프레임 예측)을 **공동으로 학습** 하는 통합 프레임워크입니다. 추론 시 **BOF (beginning-of-frame) 토큰** 을 활용하여 텍스트 생성과 비디오 프레임 청크 생성을 동적으로 전환하며, 이는 **사전 훈련된 Llama 모델** 로 초기화된 텍스트 타워와 비디오 타워 간의 글로벌 셀프 어텐션을 통해 이루어집니다. 학습 데이터는 비디오 게임 ( **CS:GO** ) 데이터와 **VLM (Vision-Language Model)** 으로 증강된 실제 스포츠 비디오 데이터를 활용합니다.

## 주요 결과
**CS:GO** 비디오 게임 데이터에 대한 제어 실험에서, **TV2TV** 는 비교 대상인 **Text-to-Video (T2V) 모델** 보다 **91%** 의 시간 동안 인간 평가에서 시각적 품질이 더 우수했습니다. 또한, **"think-then-act" (Think2V) 접근 방식** 대비 세밀한 명령어 추종 정확도에서 **19% 포인트** 향상을 보였습니다. 실제 스포츠 비디오 데이터셋에서는 **TV2TV** 가 외부 및 제어 기준선 대비 프롬프트 정렬, 실제 fidelity, 전반적인 선호도 측면에서 뛰어난 성능을 달성했습니다 ( **T2V 대비 54.0% vs 34.7% 선호** , **Think2V 대비 53.3% vs 41.3% 선호** ).

## AI 실무자를 위한 시사점
**TV2TV** 는 비디오 생성 과정에서 **언어 모델의 추론 능력** 을 활용하여 시맨틱 복잡성을 텍스트 생성으로 위임하는 효과적인 전략을 제시합니다. 이는 비디오 생성의 시각적 품질과 제어 가능성을 크게 향상시킬 수 있는 실용적인 방안입니다. 사용자 개입을 통한 비디오 생성 궤적 수정 기능은 **대화형 AI 시스템** 및 **창작 도구** 개발에 중요한 잠재력을 제공하며, **VLM 기반 데이터 증강 파이프라인** 은 실제 비디오 데이터의 텍스트 캡션 부족 문제를 해결하는 데 기여합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.