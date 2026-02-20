---
title: "[논문리뷰] Mitigating Object and Action Hallucinations in Multimodal LLMs via Self-Augmented Contrastive Alignment"
excerpt: "arXiv에 게시된 'Mitigating Object and Action Hallucinations in Multimodal LLMs via Self-Augmented Contrastive Alignment' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLMs
  - Video Understanding
  - Hallucination Mitigation
  - Object Hallucination
  - Action Hallucination
  - Contrastive Learning
  - Self-Augmentation
  - Tracklet-Phrase Alignment

permalink: /ai/review/2025-12-05-Mitigating-Object-and-Action-Hallucinations-in-Multimodal-LLMs-via-Self-Augmented-Contrastive-Alignment/

toc: true
toc_sticky: true

date: 2025-12-05 00:00:00+0900+0900
last_modified_at: 2025-12-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.04356)

**저자:** Kai-Po Chang, Wei-Yuan Cheng, Chi-Pin Huang, Fu-En Yang, and Yu-Chiang Frank Wang



## 핵심 연구 목표
본 논문은 비디오 이해 태스크에서 멀티모달 LLM(MLLM)이 생성하는 설명문의 **시각적 객체 및 시간적 행동 환각** 문제를 공동으로 완화하는 것을 목표로 합니다. 언어 prior에 의한 허위 상관관계를 억제하고 시각적 사실에 대한 MLLM의 grounding을 강화하여 **객체 및 행동의 충실도** 를 향상시키는 데 중점을 둡니다.

## 핵심 방법론
저자들은 **Self-Augmented Contrastive Alignment (SANTA)** 프레임워크를 제안합니다. 이는 잠재적 환각을 식별하고 원본 캡션을 **대조적 부정 샘플(contrasted negatives)** 로 변환하는 **환각적 자기 증강(hallucinative self-augmentation)** 기법을 활용합니다. 또한, 지역 객체와 관계 기반 행동을 해당 시각 및 시간적 구문과 일치시키기 위해 **트랙릿-구문 대조 정렬(tracklet-phrase contrastive alignment)** 을 개발하며, 객체 트랙릿은 **Grounding-SAM2** 를, 행동 트랙릿은 **perceiver-based action squeezer (θA)** 를 통해 추출됩니다.

## 주요 결과
**MiraData-9k** 벤치마크에서 SANTA는 HalFscore 및 weighted-HalFscore 모두에서 객체 및 행동 관련 F1 점수(Flobj, F1act)에서 **기존 최고 방법 대비 평균 +4.02%/+5.54% 및 +3.77%/+7.7%** 의 우수한 성능을 달성했습니다. **FactVC** 및 **VidHal** 벤치마크에서도 가장 높은 정밀도, 재현율, F1 점수 및 정확도를 기록했으며, 특히 비디오 질문 응답 태스크에서 **가장 정확한 답변** 을 제공하여 환각 완화 능력을 입증했습니다.

## AI 실무자를 위한 시사점
SANTA는 비디오 이해 MLLM의 **신뢰성과 정확성을 크게 향상** 시킬 수 있는 실용적인 방법론을 제공합니다. 특히 **환각적 자기 증강** 을 통해 외부 LLM 프롬프팅 없이도 효과적인 부정 샘플을 생성하여 시스템의 복잡성과 비용을 줄일 수 있습니다. 이는 자율 주행, 헬스케어 등 높은 신뢰성이 요구되는 애플리케이션에서 MLLM 활용도를 높이는 데 기여하며, **불완전한 객체 추적 결과에도 강건함** 을 보여 광범위한 실제 적용 가능성을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.