---
title: "[논문리뷰] FocusUI: Efficient UI Grounding via Position-Preserving Visual Token Selection"
excerpt: "arXiv에 게시된 'FocusUI: Efficient UI Grounding via Position-Preserving Visual Token Selection' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - UI Grounding
  - Visual Token Reduction
  - Position-Preserving
  - Vision-Language Models (VLMs)
  - Saliency Scoring
  - Computational Efficiency
  - Human-Computer Interaction

permalink: /ai/review/2026-01-15-FocusUI-Efficient-UI-Grounding-via-Position-Preserving-Visual-Token-Selection/

toc: true
toc_sticky: true

date: 2026-01-15 00:00:00+0900+0900
last_modified_at: 2026-01-15 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.03928)

**저자:** Mingyu Ouyang, Kevin Qinghong Lin, Mike Zheng Shout, Hwee Tou Ng



## 핵심 연구 목표
본 논문은 고해상도 UI 스크린샷에서 발생하는 수천 개의 시각 토큰으로 인한 **Vision-Language Models (VLMs)** 의 UI Grounding 작업의 높은 계산 오버헤드와 주의 분산 문제를 해결하는 것을 목표로 합니다. 특히, 일반적인 시각 토큰 가지치기 방법이 위치 정보를 손상시켜 정확도를 크게 저하시키는 문제를 극복하면서 **효율적인 UI Grounding** 을 달성하고자 합니다.

## 핵심 방법론
저자들은 효율적인 UI Grounding 프레임워크인 **FOCUSUI** 를 제안합니다. 이는 명령어 관련 시각 토큰을 선택하고 위치 연속성을 보존하기 위해 두 가지 핵심 전략을 사용합니다. 첫째, **패치 수준 지도 학습** 을 통해 명령어 관련 시각 토큰을 식별하는데, 이는 **명령어 조건부 바운딩 박스 오버랩** 과 **규칙 기반 UI-그래프 점수** 를 융합하여 구성됩니다. 둘째, **POSPAD** 라는 새로운 전략을 도입하여 제거된 시각 토큰의 각 연속 시퀀스를 단일 특수 마커로 대체함으로써 **위치 연속성을 보존** 합니다.

## 주요 결과
**FOCUSUI** 는 4가지 Grounding 벤치마크에서 기존 GUI 특정 기준선들을 능가했습니다. **ScreenSpot-Pro 벤치마크** 에서 **FOCUSUI-7B** 는 **GUI-Actor-7B** 대비 **3.7%의 성능 향상** 을 달성했습니다. 심지어 **30%의 시각 토큰만 유지** 했을 때도 성능 저하는 **3.2%에 불과** 했으며, 최대 **1.44배 빠른 추론 속도** 와 **17% 낮은 최대 GPU 메모리** 를 기록했습니다.

## AI 실무자를 위한 시사점
본 연구는 고해상도 UI 환경에서 VLM 기반 UI Grounding 모델의 **배포 효율성을 크게 개선** 할 수 있는 실용적인 방법을 제시합니다. **POSPAD 전략** 은 정밀한 UI Grounding과 같은 위치에 민감한 태스크에서 **멀티모달 시퀀스의 위치적 연속성 보존** 의 중요성을 강조합니다. 이는 제한된 자원 환경이나 실시간 UI 에이전트 개발에 VLM을 활용하는 데 중요한 기반이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.