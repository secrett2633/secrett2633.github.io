---
title: "[논문리뷰] MOVA: Towards Scalable and Synchronized Video-Audio Generation"
excerpt: "이 [arXiv]에 게시한 'MOVA: Towards Scalable and Synchronized Video-Audio Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video-Audio Generation
  - Diffusion Transformer
  - Multimodal AI
  - Lip Synchronization
  - Open Source
  - Data Curation
  - Dual-Tower Architecture
  - Cross-Attention

permalink: /ai/review/2026-02-10-MOVA-Towards-Scalable-and-Synchronized-Video-Audio-Generation/

toc: true
toc_sticky: true

date: 2026-02-10 00:00:00+0900+0900
last_modified_at: 2026-02-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.08794)

**저자:** SII-OpenMOSS Team



## 핵심 연구 목표
기존 비디오 생성 모델에서 간과되던 오디오 요소를 통합하여, 고품질의 **동기화된 비디오-오디오 콘텐츠를 생성** 하는 오픈 소스 모델 **MOVA** 를 개발하는 것이 목표입니다. 특히, 폐쇄형 시스템인 Veo3 및 Sora 2의 한계를 극복하고, **정확한 립싱크 음성, 환경 인식 사운드, 콘텐츠 정렬 음악** 을 포함한 다양한 시나리오를 지원하고자 합니다.

## 핵심 방법론
**MOVA** 는 **비대칭 듀얼-타워 아키텍처** 를 채택하여, **Wan2.2 I2V A14B 비디오 DiT 백본** 과 **1.3B 오디오 DiT 백본** 을 결합합니다. 두 모달리티 간의 풍부한 상호작용을 위해 **2.6B 양방향 Bridge 모듈** 을 사용하며, **정렬된 RoPE** 를 통해 시공간적 불일치를 방지합니다. 또한, **100,000시간 이상의 정밀한 오디오-비디오 주석 파이프라인** 을 통해 대규모 고품질 학습 데이터를 구축하고, **이중 분류기 없는 안내(Dual CFG)** 추론 방식을 도입하여 제어 가능성을 높였습니다.

## 주요 결과
**MOVA** 는 오디오 충실도, 시청각 정렬, 립싱크 정확도 및 다중 화자 귀속에서 경쟁 모델을 능가하는 성능을 보였습니다. 특히, **MOVA-360p** 는 **IS 4.269** , **DNSMOS 3.797** 로 오디오 품질에서 우위를 점했고, **듀얼 CFG(SB=3.5)** 적용 시 **DeSync 0.351** 과 **IB-Score 0.315** 로 시청각 정렬에서 큰 개선을 이루었습니다. 립싱크 정확도에서는 **LSE-D 7.004** , **LSE-C 7.800** 을 달성했으며, **MOVA-720p** 는 **cpCER 0.149** 로 다중 화자 귀속 성능을 입증했습니다.

## AI 실무자를 위한 시사점
**MOVA** 는 **오픈 소스** 로 모델 가중치와 코드를 공개하여 연구 및 커뮤니티 개발을 촉진합니다. **IT2VA (Image-Text to Video-Audio) 생성** 을 지원하며, **효율적인 추론, LoRA 미세 조정, 프롬프트 개선** 을 위한 포괄적인 지원을 제공합니다. 다만, **43,000 GPU-days** 에 달하는 높은 학습 비용과 노래, 복잡한 사운드 텍스처 등 특정 오디오 유형에서의 성능 저하, 다중 화자 환경에서의 동기화 문제 등은 향후 개선이 필요한 과제로 남아있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.