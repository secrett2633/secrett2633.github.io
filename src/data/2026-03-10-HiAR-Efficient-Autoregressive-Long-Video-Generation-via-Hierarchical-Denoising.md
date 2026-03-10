---
title: "[논문리뷰] HiAR: Efficient Autoregressive Long Video Generation via Hierarchical Denoising"
excerpt: "Bin Liu이 arXiv에 게시한 'HiAR: Efficient Autoregressive Long Video Generation via Hierarchical Denoising' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Autoregressive Video Generation
  - Hierarchical Denoising
  - Diffusion Models
  - Temporal Continuity
  - Error Propagation
  - Forward-KL Regularization
  - Long Video Synthesis
  - Pipelined Parallelism

permalink: /ai/review/2026-03-10-HiAR-Efficient-Autoregressive-Long-Video-Generation-via-Hierarchical-Denoising/

toc: true
toc_sticky: true

date: 2026-03-10 00:00:00+0900+0900
last_modified_at: 2026-03-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.08703)

**저자:** Kai Zou, Dian Zheng, Hongbo Liu, Tiankai Hang, Bin Liu, Nenghai Yu



## 핵심 연구 목표
논문은 **Autoregressive (AR) 확산 모델** 을 사용한 장기 비디오 생성 시 발생하는 **오류 누적으로 인한 품질 저하 및 시간적 불연속성** 문제를 해결하고자 합니다. 특히, 기존 방식이 높은 디노이즈된 컨텍스트에 의존하여 예측 오류를 증폭시키는 한계를 극복하고, 안정적이고 효율적인 장기 비디오 생성을 목표로 합니다.

## 핵심 방법론
본 연구는 **HiAR (Hierarchical Denoising)** 프레임워크를 제안하여, 각 디노이징 스텝에서 모든 블록에 걸쳐 인과적 생성을 수행하며 현재 블록과 **동일한 노이즈 레벨** 의 컨텍스트에 조건을 부여하여 오류 전파를 완화합니다. 학습 시 **self-rollout distillation** 과 함께 **bidirectional-attention 모드** 에서 **forward-KL regulariser** 를 도입하여 저-모션 단축을 방지하고 모션 다양성을 보존하며, 추론 시 **파이프라인 병렬 처리** 를 통해 효율성을 높였습니다.

## 주요 결과
**VBench (20초 생성)** 평가에서 모든 비교 모델 중 **가장 높은 종합 점수 (0.821)** 와 **가장 낮은 temporal drift (0.257)** 를 달성했습니다. 특히, **Quality 점수 0.846** 과 **Dynamic 점수 0.686** 으로 우수한 영상 품질과 모션 다양성을 유지했습니다. 또한, 다른 distilled AR 모델 대비 **약 1.8배 빠른 wall-clock speedup** (30 fps 처리량, 0.30초/chunk 지연 시간)을 기록하며 효율성 측면에서도 뛰어난 성능을 보였습니다.

## AI 실무자를 위한 시사점
**계층적 디노이징** 과 **매칭된 노이즈 레벨 컨텍스트** 는 장기 비디오 생성에서 중요한 문제인 **품질 저하 및 시간적 불연속성** 을 해결하는 효과적인 전략입니다. **forward-KL regulariser** 는 **mode-seeking** 경향으로 인한 AR 모델의 모션 다양성 저하 문제를 해결하여 보다 동적인 비디오 생성을 가능하게 합니다. **파이프라인 병렬 추론** 은 실시간 또는 준실시간 비디오 생성 애플리케이션에 필수적인 높은 처리량을 제공하여 실제 서비스 적용 가능성을 높입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.