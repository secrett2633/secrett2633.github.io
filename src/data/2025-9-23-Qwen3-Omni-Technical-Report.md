---
title: "[논문리뷰] Qwen3-Omni Technical Report"
excerpt: "Lhma-aslp이 [arXiv]에 게시한 'Qwen3-Omni Technical Report' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Model
  - Thinker-Talker Architecture
  - Mixture-of-Experts
  - Low-latency
  - Audio Understanding
  - Cross-modal Reasoning
  - State-of-the-Art
  - Real-time Interaction

permalink: /ai/review/2025-9-23-Qwen3-Omni-Technical-Report/

toc: true
toc_sticky: true

date: 2025-09-23 13:36:03+0900
last_modified_at: 2025-09-23 13:36:03+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.17765)

**저자:** Qwen Team



## 핵심 연구 목표
본 논문은 텍스트, 이미지, 오디오, 비디오 등 다양한 모달리티 전반에 걸쳐 **단일 멀티모달 모델(Qwen3-Omni)** 이 기존 단일 모달 모델과 비교하여 성능 저하 없이 **최첨단 성능을 유지** 하는 것을 목표로 합니다. 또한, **교차 모달 추론 능력** 과 **실시간 시청각 상호작용** 을 향상시키는 것을 주된 연구 목적으로 삼습니다.

## 핵심 방법론
Qwen3-Omni는 인식과 생성 과정을 통합하는 **Thinker–Talker Mixture-of-Experts (MoE) 아키텍처** 를 채택합니다. 이 모델은 **AuT (Audio Transformer) 인코더** 를 통해 강력한 오디오 표현을 학습하며, **멀티-코드북 기반 음성 생성** 및 **경량화된 인과 ConvNet (Code2Wav)** 을 사용하여 실시간 음성 합성을 구현합니다. **Time-aligned Multimodal Rotary Position Embedding (TM-RoPE)** 을 통해 다양한 모달리티의 시간 정보를 효과적으로 통합하고, **청크 단위 사전 채우기(chunked prefilling) 메커니즘** 을 통해 스트리밍 성능을 최적화했습니다.

## 주요 결과
Qwen3-Omni는 36개의 오디오 및 시청각 벤치마크 중 **32개에서 오픈소스 최첨단(SOTA)** 을 달성했고, **22개에서 전체 SOTA** 를 기록하며 Gemini-2.5-Pro와 같은 강력한 폐쇄형 모델을 능가했습니다. 특히, 오디오의 경우 이론적인 종단 간 **첫 패킷 지연 시간(first-packet latency) 234ms** 를 달성했습니다. 또한, 텍스트 및 시각 모달리티에서도 동일 크기 단일 모달 Qwen 모델과 동등하거나 우수한 성능을 보여주며 성능 저하가 없음을 입증했습니다.

## AI 실무자를 위한 시사점
Qwen3-Omni는 **통합 멀티모달 훈련** 이 모달리티별 성능 저하 없이 모든 모달리티에서 동등한 성능을 달성할 수 있음을 보여주어, 복잡한 AI 시스템 구축을 위한 다재다능한 기반을 제공합니다. **234ms의 낮은 첫 패킷 지연 시간** 과 **고동시성 MoE 아키텍처** 는 음성 비서 및 비디오 대화 시스템과 같은 반응성이 뛰어나고 확장 가능한 실시간 AI 애플리케이션 개발에 중요한 이점을 제공합니다. **Apache 2.0 라이선스** 로 공개된 Qwen3-Omni 모델은 특히 오디오 작업에서 강력한 성능을 발휘하여 고급 멀티모달 에이전트 개발을 위한 강력한 오픈소스 도구입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.