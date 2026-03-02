---
title: "[논문리뷰] UniVBench: Towards Unified Evaluation for Video Foundation Models"
excerpt: "Yan Zhang이 arXiv에 게시한 'UniVBench: Towards Unified Evaluation for Video Foundation Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Foundation Models
  - Unified Evaluation
  - Multi-task Learning
  - Video Understanding
  - Video Generation
  - Video Editing
  - Video Reconstruction
  - Agentic Evaluation
  - Cinematic Dimensions

permalink: /ai/review/2026-02-26-UniVBench-Towards-Unified-Evaluation-for-Video-Foundation-Models/

toc: true
toc_sticky: true

date: 2026-02-26 00:00:00+0900+0900
last_modified_at: 2026-02-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.21835)

**저자:** Jianhui Wei, Xiaotian Zhang, Yichen Li, Yuan Wang, Yan Zhang, Ziyi Chen, Zhihang Tang, Wei Xu, Zuozhu Liu



## 핵심 연구 목표
이 논문은 비디오 파운데이션 모델(VFM)의 통합된 역량을 평가하기 위한 파편화되고 제한적인 기존 벤치마크의 한계를 해결하고자 합니다. VFM은 비디오 이해, 생성, 편집, 명령어 따르기를 단일 프레임워크 내에서 통합하는 것을 목표로 하지만, 현재 평가는 태스크별, 단일 샷 위주로 이루어져 모델의 진정한 통합 성능을 측정하기 어렵습니다. 이에 **UniVBench** 는 네 가지 핵심 능력(이해, 생성, 편집, 재구성)에 걸쳐 VFM을 포괄적으로 평가하는 최초의 통합 벤치마크를 제시합니다.

## 핵심 방법론
**UniVBench** 는 200개의 고품질, 다이내믹한 멀티 샷 비디오로 구성되며, 각 비디오에는 상세 캡션, 다양한 형식의 편집 지침, 참조 이미지가 포함되어 있습니다. 저작권 문제 없이 인간이 제작한 이 비디오는 8가지 주요 영화적 차원과 21가지 세부 차원에 걸쳐 풍부한 정보를 제공합니다. 이를 위해 **UniV-Eval** 이라는 통합 에이전트 평가 시스템을 개발하여 모든 태스크에 걸쳐 프롬프트, 명령어 파싱, 다차원 점수 부여를 표준화하고, **비디오 재구성(V2V)** 이라는 새로운 태스크를 제안하여 모델의 이해 및 생성 능력을 동시에 평가합니다.

## 주요 결과
**UniVBench** 를 통한 포괄적인 평가 결과, 현재 비디오 모델들은 특정 태스크에 특화되어 있으며, 진정한 통합 성능에는 격차가 있음을 확인했습니다. **Gemini 2.5 Pro** 는 비디오 이해(V2T)에서 **평균 54.1%** 로 우수한 성능을 보였고, **Seedance-1.0-Pro** 는 텍스트-투-비디오(T2V) 생성에서 **77.9%** 로 최고 점수를 기록했습니다. 새롭게 제안된 비디오 재구성(V2V) 태스크에서는 **Wan2.1-VACE-14B** 가 **62.7%** 로 가장 강력한 성능을 보여주었습니다. 특히, 모든 태스크에서 'Action' 차원이 가장 낮은 점수를 받아 복잡한 시간적 역학을 정확하게 해석하고 합성하는 것이 주요 과제임을 시사합니다. 인간 연구를 통해 **UniV-Eval** 이 인간 판단과 **85%** 의 높은 일치도를 보임을 검증했습니다.

## AI 실무자를 위한 시사점
**UniVBench** 는 비디오 파운데이션 모델 평가의 핵심 공백을 메우는 최초의 통합 프레임워크를 제공합니다. 이 벤치마크는 모델의 강점과 약점을 진단하고, 훈련 단계에 대한 실행 가능한 피드백을 제공하여 강력한 비디오 지능 개발을 가속화할 수 있습니다. 특히, 현재 모델들이 통합 능력보다는 개별 태스크에 특화되어 있다는 **"통합 격차(Unification Gap)"** 를 정량적으로 보여주어, 진정한 범용 비디오 AI를 향한 연구 방향을 제시합니다. 향후 연구에서는 대규모 통합 비디오 모델 훈련을 위해 **UniVBench** 데이터셋의 볼륨을 크게 확장하는 것이 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.