---
title: "[논문리뷰] NarraScore: Bridging Visual Narrative and Musical Dynamics via Hierarchical Affective Control"
excerpt: "arXiv에 게시된 'NarraScore: Bridging Visual Narrative and Musical Dynamics via Hierarchical Affective Control' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video-to-Music Generation
  - Affective Computing
  - Vision-Language Models (VLMs)
  - Hierarchical Control
  - Soundtrack Generation
  - Temporal Coherence
  - Emotion-Driven Music

permalink: /ai/review/2026-02-13-NarraScore-Bridging-Visual-Narrative-and-Musical-Dynamics-via-Hierarchical-Affective-Control/

toc: true
toc_sticky: true

date: 2026-02-13 00:00:00+0900+0900
last_modified_at: 2026-02-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.09070)

**저자:** Yufan Wen, Zhaocheng Liu, YeGuo Hua, Ziyi Guo, Lihua Zhang, Chun Yuan, Jian Wu



## 핵심 연구 목표
본 논문은 긴 길이의 비디오에 대해 계산 효율적이고, 시간적으로 일관되며, 서사적 흐름에 의미론적으로 부합하는 배경 음악을 자동으로 생성하는 것을 목표로 합니다. 기존 비디오-투-음악 모델이 겪는 **계산 확장성** , **시간적 일관성** , 그리고 **서사적 맥락에 대한 의미론적 이해 부족** 이라는 세 가지 핵심 과제를 해결하고자 합니다.

## 핵심 방법론
NarraScore는 감정이 서사적 논리의 고밀도 압축으로 기능한다는 핵심 통찰에 기반한 **계층적 프레임워크** 입니다. **동결된 Vision-Language Models (VLMs)** 을 연속적인 감정 센서로 재활용하여 고차원 시각 스트림을 **Valence-Arousal 궤적** 으로 변환합니다. **Dual-Branch Injection 전략** 을 통해 **Global Semantic Anchor** 로 스타일 안정성을 확보하고, **Token-Level Affective Adapter** 를 통해 잔여 주입 방식으로 국소적 긴장을 조절하여 음악의 역동성을 제어합니다.

## 주요 결과
NarraScore는 **정량적 및 정성적 평가** 모두에서 **최신 기술(SOTA) 성능** 을 달성했습니다. 특히, 장시간 비디오에서 **FAD 1.923** , **FD 36.411** , **KLD 0.320** 를 기록하여 기존 모델 대비 뛰어난 일관성과 서사적 정렬 능력을 보였습니다. 사용자 연구에서는 **Emotional Dynamic Consistency (EDC)** , **Global Style Matching (GSM)** 등 모든 주관적 지표에서 가장 높은 선호도를 얻었음을 확인했습니다.

## AI 실무자를 위한 시사점
본 연구는 **동결된 VLM** 이 복잡한 서사적 의도를 연속적인 감정 곡선으로 추출하는 데 효과적임을 입증하여, **제한된 데이터** 로도 **감정 기반 제어** 가 가능함을 보여줍니다. **최소한의 계산 오버헤드** 로 높은 성능을 달성하는 **경량화된 어댑터 설계** 는 실제 AI 서비스 적용에 유리하며, 장시간 미디어 콘텐츠에 대한 **완전 자율적인 배경 음악 생성 패러다임** 을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.