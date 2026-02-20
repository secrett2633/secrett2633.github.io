---
title: "[논문리뷰] Temporal Prompting Matters: Rethinking Referring Video Object
  Segmentation"
excerpt: "Sifei Liu이 arXiv에 게시한 'Temporal Prompting Matters: Rethinking Referring Video Object
  Segmentation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Referring Video Object Segmentation
  - Foundation Models
  - Prompt Engineering
  - Object Tracking
  - SAM
  - Video Analysis
  - Prompt Preference Learning

permalink: /ai/review/2025-10-13-Temporal-Prompting-Matters-Rethinking-Referring-Video-Object-Segmentation/

toc: true
toc_sticky: true

date: 2025-10-13 13:44:18+0900
last_modified_at: 2025-10-13 13:44:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.07319)

**저자:** Ci-Siang Lin, Min-Hung Chen, I-Jieh Liu, Chien-Yi Wang, Sifei Liu, Yu-Chiang Frank Wang



## 핵심 연구 목표
논문은 **Referring Video Object Segmentation (RVOS)** 의 높은 계산 비용과 확장성 문제를 해결하고자 합니다. 특히, 기존 RVOS 모델들이 요구하는 밀집된 마스크 어노테이션 기반의 종단간(end-to-end) 학습의 한계를 극복하고, **SAM(Segment Anything Model)** 과 같은 이미지 기반 파운데이션 모델을 RVOS 태스크에 효과적으로 적용하는 새로운 방법을 모색합니다.

## 핵심 방법론
RVOS 태스크를 "referring", "video", "segmentation" 세 가지 요소로 분해하고, **Tenet (Temporal Prompt Generation and Selection)** 프레임워크를 제안합니다. 이 프레임워크는 참조 및 비디오 요소를 처리하기 위해 사전 훈련된 **Grounding DINO** 및 **OC-SORT** 와 같은 외부(off-the-shelf) 객체 감지기 및 추적기를 활용하여 **temporal prompt** 를 생성합니다. 또한, 생성된 temporal prompt의 품질을 평가하고 가장 적합한 것을 선택하기 위해 **Transformer 기반 분류기** 를 사용하는 **Prompt Preference Learning** 을 도입하여 **SAM** 을 지시합니다.

## 주요 결과
**Refer-Youtube-VOS** 및 **Refer-DAVIS17** 벤치마크에서 **Tenet 프레임워크** 는 각각 **65.5% J&F** 와 **71.0% J&F** 를 달성했습니다. 특히, Ground-Truth 박스로 **SAM** 을 프롬프트했을 때 **Refer-DAVIS17** 에서 **83.6% J&F** 를 기록하며 기존 최신 RVOS 모델 대비 우수한 성능을 보였습니다. 제안된 방법은 기존의 종단간 비전-언어 모델보다 **2배 이상 적은 약 45M** 의 학습 가능한 파라미터로 효율성을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 RVOS 분야에서 **사전 훈련된 파운데이션 모델(SAM)** 의 효율적인 활용 가능성을 제시하며, **"프롬프팅" 패러다임** 을 통해 학습 데이터 및 계산 비용 부담을 크게 줄일 수 있음을 시사합니다. **Prompt Preference Learning** 은 동적 비디오 환경에서 최적의 시각적 프롬프트를 선택하는 실용적인 방법론을 제공하여, 실제 AI 애플리케이션에서 RVOS 모델의 배포 및 확장성을 향상시키는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.