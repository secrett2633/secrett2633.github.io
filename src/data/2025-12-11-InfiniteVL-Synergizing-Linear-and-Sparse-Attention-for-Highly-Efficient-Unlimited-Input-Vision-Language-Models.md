---
title: "[논문리뷰] InfiniteVL: Synergizing Linear and Sparse Attention for Highly-Efficient, Unlimited-Input Vision-Language Models"
excerpt: "이 [arXiv]에 게시한 'InfiniteVL: Synergizing Linear and Sparse Attention for Highly-Efficient, Unlimited-Input Vision-Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models
  - Linear Attention
  - Sliding Window Attention
  - Gated DeltaNet
  - Long-Context Understanding
  - Efficiency
  - Hybrid Architecture
  - Multimodal Learning

permalink: /ai/review/2025-12-11-InfiniteVL-Synergizing-Linear-and-Sparse-Attention-for-Highly-Efficient-Unlimited-Input-Vision-Language-Models/

toc: true
toc_sticky: true

date: 2025-12-11 00:00:00+0900+0900
last_modified_at: 2025-12-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.08829)

**저자:** Hongyuan Tao, Bencheng Liao, Shaoyu Chen, Haoran Yin, Qian Zhang, Wenyu Liu, Xinggang Wang



## 핵심 연구 목표
본 연구는 기존 VLM의 이차적인 계산 복잡성과 증가하는 KV 캐시로 인한 **장기 컨텍스트 이해 능력 및 배포 제약** 문제를 해결하는 것을 목표로 합니다. 특히, 선형 어텐션의 정보 집약적 작업에서의 저조한 성능과 윈도우 기반 어텐션의 장기 기억 유지 부족이라는 한계를 극복하고자 합니다.

## 핵심 방법론
제안된 **InfiniteVL** 은 **Gated DeltaNet 레이어** (장기 컨텍스트 메모리 및 선형 시간 복잡성)와 **Sliding Window Attention (SWA) 레이어** (정교한 로컬 컨텍스트 캡처)를 전략적으로 혼합한 하이브리드 아키텍처를 채택합니다. 훈련은 **Qwen2.5-VL** 을 교사 모델로 활용하는 **증류 사전 훈련** , 다양한 멀티모달 데이터셋을 사용한 **지도 미세 조정(SFT)** , 그리고 **LoRA** 기반의 **멀티모달 장기 시퀀스 SFT** 의 세 단계로 진행됩니다.

## 주요 결과
InfiniteVL은 **Qwen2.5-VL-3B** 대비 **3.6배 이상의 추론 속도 향상** 을 달성하며, 최대 **300-350K 토큰** 에서 **8배** 까지 빨라지는 동시에 **컨텍스트 길이에 관계없이 일정한 지연 시간 및 메모리 사용량** (약 **9GB** )을 유지합니다. 스트리밍 비디오 시나리오에서는 **24 FPS** 의 안정적인 실시간 전처리 속도를 보여주며, **OCR, 차트 이해, 문서 이해** 등 정보 집약적 작업에서 주요 Transformer 기반 VLM과 **경쟁적인 성능** 을 나타냅니다.

## AI 실무자를 위한 시사점
InfiniteVL은 **자율 주행, 임베디드 에이전트** 와 같이 **리소스가 제한된 환경** 에서 **실시간 및 무제한 입력 처리** 가 필요한 VLM 애플리케이션에 혁신적인 솔루션을 제공합니다. **Gated DeltaNet** 과 **SWA** 의 시너지는 **장기 기억 유지** 와 **미세한 시각-언어 정렬** 을 동시에 가능하게 하여, **훈련 데이터가 적더라도 강력한 성능** 을 달성하는 효율적인 VLM 개발의 새로운 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.