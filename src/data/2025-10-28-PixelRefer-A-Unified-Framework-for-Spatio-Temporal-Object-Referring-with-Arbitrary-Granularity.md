---
title: "[논문리뷰] PixelRefer: A Unified Framework for Spatio-Temporal Object Referring
  with Arbitrary Granularity"
excerpt: "Kehan Li이 [arXiv]에 게시한 'PixelRefer: A Unified Framework for Spatio-Temporal Object Referring
  with Arbitrary Granularity' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - MLLM
  - Region-level Understanding
  - Object-centric Reasoning
  - Spatio-temporal Referring
  - Video Understanding
  - Scale-Adaptive Tokenizer
  - Efficiency
  - Instruction Tuning

permalink: /ai/review/2025-10-28-PixelRefer-A-Unified-Framework-for-Spatio-Temporal-Object-Referring-with-Arbitrary-Granularity/

toc: true
toc_sticky: true

date: 2025-10-28 13:07:54+0900
last_modified_at: 2025-10-28 13:07:54+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.23603)

**저자:** Yuqian Yuan, Wenqiao Zhang, Xin Li, Shihao Wang, Kehan Li, Wentong Li, Jun Xiao, Lei Zhang, Beng Chin Ooi



## 핵심 연구 목표
기존 MLLM이 주로 전체적인(holistic) 장면 이해에 초점을 맞춰 이미지 및 비디오 내 특정, 지역화된 영역에 대한 **세분화된 객체 중심 추론(visual referring)** 능력이 부족한 문제를 해결하는 것입니다. 이 연구는 사용자가 지정한 영역에 대해 임의의 세밀도를 가진 **시공간 객체 참조(spatio-temporal object referring)** 를 지원하는 **통합된 지역 레벨 MLLM 프레임워크** 인 **PixelRefer** 를 개발하여, 기존 MLLM의 범용 기능을 유지하면서도 정밀한 객체 이해를 가능하게 하는 것을 목표로 합니다.

## 핵심 방법론
객체 중심 이해를 위해 **Scale-Adaptive Object Tokenizer (SAOT)** 를 도입하여 다양한 크기와 형태의 객체에 대해 정확하고 의미론적으로 풍부한 객체 토큰을 생성합니다. 또한, LLM의 어텐션 패턴 분석을 기반으로 효율적인 변형 모델인 **PixelRefer-Lite** 를 제안하며, 이는 **Object-Centric Infusion (OCI) 모듈** 을 통해 전역(global) 시각 컨텍스트를 객체 토큰에 계층적으로 미리 통합하여 컴퓨팅 비용을 크게 절감하면서도 의미론적 충실도를 유지합니다. 정교한 명령어 튜닝을 위해 고품질 객체 중심 명령어 데이터셋인 **PixelRefer-2.2M** 도 구축했습니다.

## 주요 결과
**PixelRefer** 는 LVIS, PACO, DLC-Bench 등 다양한 이미지 벤치마크와 VideoRefer-Bench, HC-STVG 같은 비디오 벤치마크 전반에서 최신 객체 레벨 MLLM 대비 **선도적인 성능** 을 일관되게 달성했습니다(예: PACO에서 **91.7% SSim, 85.3% SIoU** ). 특히, **PixelRefer-Lite** 는 경쟁력 있는 정확도를 유지하면서도 추론 시간 및 메모리 사용량에서 **상당한 효율성 향상** 을 보였습니다(예: 비디오 설정에서 **PixelRefer-2B** 의 FLOPs를 **11.15T에서 0.11T** 로, 메모리를 **24.6GB에서 5.1GB** 로 절감).

## AI 실무자를 위한 시사점
**PixelRefer** 는 **정밀한 객체 중심 이해** 가 요구되는 인간-컴퓨터 상호작용, 임베디드 AI, 의료 진단 등 광범위한 실제 AI 응용 분야에 핵심적인 기능을 제공합니다. 특히 **PixelRefer-Lite** 의 효율성은 고해상도 이미지나 긴 비디오 시퀀스를 처리하는 데 필요한 리소스를 대폭 줄여, **실세계 배포의 실용성** 을 크게 높입니다. 또한, 제안된 **SAOT** 는 기존 MLLM에 쉽게 통합될 수 있는 유연성을 제공하며, **PixelRefer-2.2M 데이터셋** 은 향후 객체 중심 명령어 튜닝 연구에 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.