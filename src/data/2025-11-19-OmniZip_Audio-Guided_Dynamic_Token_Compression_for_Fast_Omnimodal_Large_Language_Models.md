---
title: "[논문리뷰] OmniZip: Audio-Guided Dynamic Token Compression for Fast Omnimodal Large Language Models"
excerpt: "Jian liu이 [arXiv]에 게시한 'OmniZip: Audio-Guided Dynamic Token Compression for Fast Omnimodal Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Omnimodal LLMs
  - Token Compression
  - Audio-Video Understanding
  - Dynamic Pruning
  - Inference Acceleration
  - Spatio-Temporal Compression
  - Large Language Models

permalink: /ai/review/2025-11-19-OmniZip_Audio-Guided_Dynamic_Token_Compression_for_Fast_Omnimodal_Large_Language_Models/

toc: true
toc_sticky: true

date: 2025-11-19 00:00:00+0900+0900
last_modified_at: 2025-11-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.14582)

**저자:** Keda Tao, Kele Shao, Bohan Yu, Weiqiang Wang, Jian liu



## 핵심 연구 목표
옴니모달 대규모 언어 모델(OmniLLMs)이 직면한 **오디오-비디오 토큰의 과도한 수**와 **주의 메커니즘의 2차 복잡성**으로 인한 **계산 및 메모리 병목 현상**을 해결하는 것을 목표로 합니다. 특히, 기존의 단일 모달 압축 방법으로는 멀티모달 토큰의 공동 압축 요구사항을 충족하기 어렵다는 문제를 해결하고자 합니다.

## 핵심 방법론
**OmniZip**은 **훈련-불필요(training-free)** 방식으로 오디오-비디오 토큰을 압축합니다. 먼저, **오디오 인코더의 어텐션 분포**를 기반으로 **주요 오디오 토큰**을 식별하고, 각 시간 그룹에 대한 **오디오 유지 점수**를 계산하여 **정보 밀도**와 **이벤트 경계**를 파악합니다. 이 점수를 활용하여 비디오 토큰의 **동적 가지치기 비율**을 결정하며, **교차 모달 유사성**을 통해 오디오 앵커를 통합합니다. 마지막으로, 비디오 토큰은 **교차 프레임 유사성**과 **밀도-피크 클러스터링(DPC-KNN)**을 활용하는 **인터리브드 시공간 압축(ISTC) 모듈**을 통해 압축됩니다.

## 주요 결과
**OmniZip**은 **Qwen2.5-Omni-7B** 모델에서 **2.51배에서 3.54배의 추론 속도 향상**을 달성했습니다. 또한, **10GB의 GPU 메모리 감소(1.4배 메모리 절약)**를 이루면서도, **계산 FLOPs를 60% 절감**하고 **99.1%의 평균 정확도**를 유지했습니다. 특히, 사전 채우기(prefilling) 단계에서 **3.42배**에 달하는 속도 향상을 보여주었습니다.

## AI 실무자를 위한 시사점
**OmniZip**은 **오디오-비디오 데이터를 효율적으로 처리**해야 하는 **OmniLLM**의 **배포 가능성**을 크게 높입니다. **훈련 과정 없이** **추론 속도와 메모리 사용량을 개선**하는 능력은 **리소스 제약이 있는 환경**에서 멀티모달 모델을 운용하는 AI 엔지니어에게 특히 유용합니다. **FlashAttention**과 같은 최신 최적화 기법과 호환되며 LLM 내부 어텐션 매트릭스에 접근할 필요가 없어 **GPU 메모리 초과(OOM) 문제**를 효과적으로 회피할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.