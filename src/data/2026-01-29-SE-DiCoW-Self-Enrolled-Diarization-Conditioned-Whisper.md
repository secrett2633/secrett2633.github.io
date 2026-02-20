---
title: "[논문리뷰] SE-DiCoW: Self-Enrolled Diarization-Conditioned Whisper"
excerpt: "arXiv에 게시된 'SE-DiCoW: Self-Enrolled Diarization-Conditioned Whisper' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Target-Speaker ASR
  - DiCoW
  - Whisper Model
  - Multi-speaker ASR
  - Self-enrollment
  - Cross-attention
  - Speech Diarization

permalink: /ai/review/2026-01-29-SE-DiCoW-Self-Enrolled-Diarization-Conditioned-Whisper/

toc: true
toc_sticky: true

date: 2026-01-29 00:00:00+0900+0900
last_modified_at: 2026-01-29 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.19194)

**저자:** Alexander Polok, Dominik Klement, Samuele Cornell, Matthew Wiesner, Jan Černocký, Sanjeev Khudanpur, Lukáš Burget



## 핵심 연구 목표
본 논문은 Diarization-Conditioned Whisper (DiCoW)의 핵심 한계점인 **STNO (Silence-Target-Non-target-Overlap) 마스크의 모호성** 을 해결하고자 합니다. 이는 두 명 이상의 화자가 완전히 겹쳐 발화할 때, 서로 다른 전사에도 불구하고 유사한 컨디셔닝 정보를 제공하여 타겟 화자 ASR의 성능 저하를 야기하는 문제를 해결하는 것을 목표로 합니다.

## 핵심 방법론
새로운 **SE-DiCoW (Self-Enrolled Diarization-Conditioned Whisper)** 모델을 제안합니다. 이 모델은 **diarization 출력** 을 활용하여 대화 내에서 타겟 화자의 활동이 가장 활발한 부분을 **"등록 세그먼트(enrollment segment)"** 로 자동 선택합니다. 이 등록 세그먼트는 **각 인코더 계층의 크로스-어텐션** 을 통해 고정된 컨디셔닝 정보로 사용됩니다. 또한, **데이터 세분화, 모델 초기화, 데이터 증강** 기법을 개선하여 모델의 강건성을 높였습니다.

## 주요 결과
SE-DiCoW는 EMMA MT-ASR 벤치마크에서 기존 DiCoW 대비 **매크로 평균 tcpWER을 52.4%** 감소시키는 상당한 성능 향상을 달성했습니다. 특히, Libri3Mix clean 데이터셋에서는 기존 DiCoW 대비 **75% 이상 향상** 된 성능을 보였으며, **9.61%** 의 tcpWER을 기록했습니다. 이는 과도하게 겹치는 발화 상황에서도 낮은 오류율을 달성하며, 모든 평가 벤치마크에서 가장 낮은 오류율을 일관되게 보여주었습니다.

## AI 실무자를 위한 시사점
SE-DiCoW는 복잡한 다중 화자 환경, 특히 **겹치는 발화가 많은 시나리오** 에서 **타겟 화자 ASR의 성능을 크게 향상** 시킬 수 있는 실용적인 솔루션을 제공합니다. **자기 등록(self-enrollment) 메커니즘** 을 통해 별도의 화자 임베딩 추출 없이 화자 정보를 효과적으로 활용하여, 실시간 대화 시스템이나 회의록 작성 시스템 개발에 유용합니다. **Whisper 모델** 을 기반으로 하여 다국어 및 다 도메인 일반화 성능을 유지하면서도, diarization 오류에 대한 **강건성(robustness)** 을 높이는 방법을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.