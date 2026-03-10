---
title: "[논문리뷰] NLE: Non-autoregressive LLM-based ASR by Transcript Editing"
excerpt: "arXiv에 게시된 'NLE: Non-autoregressive LLM-based ASR by Transcript Editing' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Non-Autoregressive ASR
  - LLM-based ASR
  - Transcript Editing
  - CTC
  - Transformer
  - LoRA
  - Real-time ASR
  - Inference Speed

permalink: /ai/review/2026-03-10-NLE-Non-autoregressive-LLM-based-ASR-by-Transcript-Editing/

toc: true
toc_sticky: true

date: 2026-03-10 00:00:00+0900+0900
last_modified_at: 2026-03-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.08397)

**저자:** Avihu Dekel, Samuel Thomas, Takashi Fukada, George Saon



## 핵심 연구 목표
본 논문은 AR(Autoregressive) LLM 기반 ASR 시스템의 순차적 디코딩으로 인한 높은 지연 시간 및 병렬 처리 한계를 극복하는 것을 목표로 합니다. 동시에 CTC(Connectionist Temporal Classification) 기반 ASR의 언어 모델링 능력 부족과 약한 음향 증거에서의 복원 능력 한계를 해결하고자, 빠르면서도 정확한 비자동회귀(Non-Autoregressive) 방식의 음성 인식 시스템을 제안합니다.

## 핵심 방법론
제안된 NLE(Non-autoregressive LLM-based Editing ASR) 시스템은 **사전 훈련된 CTC 기반 음성 인코더** 에서 음향 임베딩과 초기 가설을 추출합니다. 이 가설은 LLM의 하위 단어 토크나이저를 사용하여 재토큰화되고 **삽입 슬롯(€)이 인터리빙된 시퀀스** 로 변환됩니다. **LoRA(Low-Rank Adaptation) 어댑터** 로 미세 조정된 **양방향 LLM 에디터** 는 음향 컨텍스트와 함께 이 시퀀스를 편집하며, **CTC 스타일의 손실 함수** 와 **복사 정규화(copying regularization) 목적 함수** 를 사용하여 훈련됩니다.

## 주요 결과
Open ASR 리더보드에서 **NLE++ 모델** 은 평균 **5.67%의 WER** 과 **1630의 RTFx** 를 달성하며 속도-정확도 트레이드오프 측면에서 파레토 프론티어에 위치했습니다. 단일 발화 시나리오에서는 AR(Autoregressive) 베이스라인 대비 **27배 빠른 속도** 를 보였고, 배치 시나리오에서는 **4배 빠른 속도** 를 달성하여 실시간 애플리케이션에 적합함을 입증했습니다.

## AI 실무자를 위한 시사점
NLE는 기존 AR ASR 시스템의 고질적인 문제인 **높은 지연 시간을 혁신적으로 개선** 하여 실시간 음성 인식 애플리케이션에 큰 이점을 제공합니다. 또한, 사전 훈련된 LLM 가중치를 ASR과 다른 다운스트림 태스크(예: 질의응답) 간에 공유할 수 있도록 설계되어 **모델 재사용성 및 효율성을 극대화** 할 수 있습니다. **편집 기반 접근 방식** 은 초기 가설을 활용하여 전체 재생성보다 효율적인 방식으로 오류를 수정하는 새로운 패러다임을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.