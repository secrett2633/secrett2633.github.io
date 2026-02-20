---
title: "[논문리뷰] VideoSSM: Autoregressive Long Video Generation with Hybrid State-Space Memory"
excerpt: "arXiv에 게시된 'VideoSSM: Autoregressive Long Video Generation with Hybrid State-Space Memory' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Autoregressive Video Generation
  - Diffusion Models
  - Hybrid Memory
  - State-Space Models (SSM)
  - Long Video Synthesis
  - Temporal Consistency
  - Interactive AI

permalink: /ai/review/2025-12-11-VideoSSM-Autoregressive-Long-Video-Generation-with-Hybrid-State-Space-Memory/

toc: true
toc_sticky: true

date: 2025-12-11 00:00:00+0900+0900
last_modified_at: 2025-12-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.04519)

**저자:** Yifei Yu, Xiaoshan Wu, Xiaoyang Lyu, Bo Wang, Lin Ma, Xinting Hu, Yuewen Ma, Tao Hu, Yang-Tian Sun, Zhongrui Wang, Xiaojuan Qi et al.



## 핵심 연구 목표
본 논문은 AR(Autoregressive) 비디오 확산 모델의 고질적인 문제인 에러 누적, 모션 드리프트, 콘텐츠 반복 문제를 해결하여 **분 단위 스케일의 장기적인 일관성** 과 **점진적인 동적 변화** 를 동시에 유지하는 것을 목표로 합니다. 기존 **슬라이딩 윈도우 어텐션** 및 **어텐션 싱크** 방식의 한계를 극복하고, 확장 가능하며 메모리 효율적인 장기 비디오 생성 프레임워크를 제안하고자 합니다.

## 핵심 방법론
본 연구는 **하이브리드 메모리 아키텍처** 를 갖춘 **VideoSSM** 을 제안합니다. 이는 세밀한 움직임과 시각적 세부 사항을 위한 **인과적 슬라이딩 윈도우 로컬 무손실 캐시(Local Memory)** 와, 이전 컨텍스트의 압축된 요약을 지속적으로 업데이트하는 **SSM(State-Space Model) 기반 글로벌 압축 메모리(Global Memory)** 로 구성됩니다. **동적 상태 업데이트** 를 위해 **Gated A-rule** 과 **주입 및 감쇠 게이트** 를 사용하며, **위치 인식 라우터** 가 로컬 및 글로벌 메모리 출력을 동적으로 융합합니다. 훈련은 **Self-Forcing(SF) 증류** 와 **DMD 손실** 을 활용한 투 트랙 접근 방식을 따릅니다.

## 주요 결과
**VideoSSM** 은 5초 단기 비디오 생성 벤치마크인 **VBench** 에서 AR 모델 중 가장 높은 **Total 스코어(83.95)** 와 **Quality 스코어(84.88)** 를 달성했습니다. 60초 장기 비디오 생성에서는 **Subject Consistency 92.51%** , **Background Consistency 93.95%** 로 기존 모델을 능가하며, **Dynamic Degree 50.50%** 로 정체되거나 반복적인 콘텐츠 없이 높은 동적 변화를 보여주었습니다. 사용자 연구에서는 **41.07%** 의 최고 Rank 1 투표율과 **1.85** 의 가장 낮은 평균 순위를 기록했습니다.

## AI 실무자를 위한 시사점
**VideoSSM** 의 **하이브리드 메모리 아키텍처** 는 장기 비디오 생성의 핵심 과제인 **일관성과 동적 변화** 를 **선형 시간 복잡도(O(TL))** 내에서 해결하는 효과적인 방법을 제시합니다. 이는 **실시간 및 대화형 프롬프트 기반 비디오 생성 시스템** 개발에 중요한 기반이 될 수 있습니다. **Self-Forcing 증류** 와 **DMD 손실** 을 통한 효율적인 훈련 전략은 대규모 AR 비디오 모델의 학습 안정성과 성능 향상에 기여하여, 실제 응용 분야에서의 활용 가능성을 높입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.