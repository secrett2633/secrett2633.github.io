---
title: "[논문리뷰] LiveTalk: Real-Time Multimodal Interactive Video Diffusion via Improved On-Policy Distillation"
excerpt: "Steffi Chern이 arXiv에 게시한 'LiveTalk: Real-Time Multimodal Interactive Video Diffusion via Improved On-Policy Distillation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Real-time Video Generation
  - Multimodal Diffusion
  - On-Policy Distillation
  - Interactive AI Avatars
  - Video Streaming
  - Anchor-Heavy Identity Sinks
  - Lip Synchronization

permalink: /ai/review/2025-12-30-LiveTalk-Real-Time-Multimodal-Interactive-Video-Diffusion-via-Improved-On-Policy-Distillation/

toc: true
toc_sticky: true

date: 2025-12-30 00:00:00+0900+0900
last_modified_at: 2025-12-30 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.23576)

**저자:** Ethan Chern*, Zhulin Hu*, Bohao Tang*, Jiadi Su*, Steffi Chern, Zhijie Deng, Pengfei Liu



## 핵심 연구 목표
본 논문은 기존 확산 모델의 느린 추론 속도와 양방향 어텐션으로 인한 실시간 상호작용의 어려움을 해결하고자 합니다. 특히, 멀티모달 조건(텍스트, 이미지, 오디오) 하에서 **Self Forcing** 과 같은 기존 증류 방법론이 겪는 시각적 아티팩트 및 품질 저하 문제를 극복하여, **실시간 멀티모달 인터랙티브 비디오 확산 모델** 을 개발하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **Self Forcing** 기반 증류 학습 방식을 개선하여 세 가지 주요 요소를 제시합니다: (1) **정제된 멀티모달 조건** (고품질 레퍼런스 이미지, 동작 중심 텍스트 프롬프트) 사용, (2) **ODE 초기화 학습을 완전히 수렴** 시킬 것, (3) **공격적인 학습률 스케줄** 과 **조정된 CFG 스케일** 을 통한 최적화입니다. 시스템은 **Qwen3-Omni** 와 연동하여 실시간 오디오 응답을 처리하며, **Anchor-Heavy Identity Sinks (AHIS)** 기반의 KV 캐시를 활용하여 장기 비디오 스트리밍에서 일관된 아바타 정체성을 유지합니다.

## 주요 결과
제안된 모델은 **24.82 FPS** 의 처리량과 **0.33초** 의 첫 프레임 지연 시간을 달성하여, 기존 **OmniAvatar-1.3B** 대비 각각 **20배** 및 **250배** 빠른 속도를 보였습니다. **HDTF, AVSpeech, CelebV-HQ** 벤치마크에서 **OmniAvatar-1.3B** 및 더 큰 모델들과 유사하거나 우수한 시각적 품질, 미학, 립싱크 정확도를 입증했습니다. 또한, **Veo3** 및 **Sora2** 대비 멀티턴 비디오 일관성과 콘텐츠 품질 면에서 우수하며, 응답 지연 시간을 크게 단축하여 실시간 상호작용을 가능하게 합니다.

## AI 실무자를 위한 시사점
본 연구는 **실시간 멀티모달 인터랙티브 AI 아바타 시스템** 구축을 위한 효과적인 **증류 학습 프레임워크** 를 제공합니다. **멀티모달 데이터의 품질 관리** , **충분한 초기화 학습** , 그리고 **최적화 하이퍼파라미터 튜닝** 이 복잡한 AI 모델의 안정적 학습에 필수적임을 강조합니다. 특히, **Anchor-Heavy Identity Sinks** 를 통한 **장기적인 시각적 일관성 유지** 기술은 실제 서비스 환경에서 매우 유용할 것으로 예상됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.