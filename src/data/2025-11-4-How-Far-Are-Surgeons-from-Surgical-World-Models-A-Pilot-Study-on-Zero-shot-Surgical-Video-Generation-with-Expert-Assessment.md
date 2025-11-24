---
title: "[논문리뷰] How Far Are Surgeons from Surgical World Models? A Pilot Study on
  Zero-shot Surgical Video Generation with Expert Assessment"
excerpt: "Yuhao Zhai이 [arXiv]에 게시한 'How Far Are Surgeons from Surgical World Models? A Pilot Study on
  Zero-shot Surgical Video Generation with Expert Assessment' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - World Models
  - Surgical AI
  - Zero-shot Prediction
  - Expert Evaluation
  - Plausibility Gap
  - Medical Simulation

permalink: /ai/review/2025-11-4-How-Far-Are-Surgeons-from-Surgical-World-Models-A-Pilot-Study-on-Zero-shot-Surgical-Video-Generation-with-Expert-Assessment/

toc: true
toc_sticky: true

date: 2025-11-09 19:22:42+0900
last_modified_at: 2025-11-09 19:22:42+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.01775)

**저자:** Zhen Chen, Qing Xu, Jinlin Wu, Biao Yang, Yuhao Zhai, Geng Guo, Jing Zhang, Yinlu Ding, Nassir Navab, Jiebo Luo



## 핵심 연구 목표
본 연구는 고위험 수술 도메인에서 심층적이고 전문화된 인과 지식이 필요한 상황에서, 최첨단 비디오 생성 모델(잠재적 **월드 모델**)이 실제 세계를 시뮬레이션하는 능력을 평가하는 것을 목표로 합니다. 특히, 시각적으로 설득력 있는 모방과 수술 AI의 인과적 이해 사이의 격차, 즉 **"타당성 격차(plausibility gap)"**를 정량적으로 밝히고자 합니다.

## 핵심 방법론
연구진은 수술 비디오 생성 모델 평가를 위한 전문가 큐레이션 벤치마크인 **SurgVeo**를 도입했습니다. **Veo-3 모델**을 사용하여 **제로샷 예측 작업**을 수행, **복강경 자궁적출술**과 **내시경 뇌하수체 수술** 클립으로부터 8초 길이의 비디오를 생성했습니다. 모델 출력은 **Surgical Plausibility Pyramid (SPP)**라는 4단계 프레임워크(Visual Perceptual, Instrument Operation, Environment Feedback, Surgical Intent Plausibility)에 따라 **4명의 전문 외과 의사**에 의해 평가되었습니다.

## 주요 결과
**Veo-3 모델**은 **Visual Perceptual Plausibility**에서 높은 점수를 달성(예: 초기 평균 점수 **3.72 ± 0.24** 및 **3.88 ± 0.09**)했지만, **SPP의 상위 레벨**에서는 심각한 실패를 보였습니다. **Environment Feedback Plausibility** 점수는 1초 시점의 **3.06 ± 0.08**에서 8초 시점에는 **1.64 ± 0.12**로 **약 46% 급락**했으며, 이는 시각적 설득력과 인과적 이해 사이의 명확한 **"타당성 격차"**를 드러냅니다. 또한, **단계 인식 프롬프트(stage-aware prompting)**는 수술 타당성을 크게 개선하지 못했습니다.

## AI 실무자를 위한 시사점
현재 비디오 생성 모델은 시각적 사실성을 뛰어나게 구현하지만, 수술과 같은 전문화된 도메인에 필요한 **심층적인 인과 관계 이해가 부족**합니다. 이는 단순히 더 많은 데이터를 학습하거나 추가적인 문맥 정보를 제공하는 것만으로는 해결할 수 없으며, **구조화된 도메인 지식**과 **물리적/논리적 제약**을 통합하는 **새로운 아키텍처 패러다임**이 필요함을 시사합니다. **SurgVeo 벤치마크**와 **SPP 프레임워크**는 미래 수술 AI 월드 모델 개발을 위한 중요한 평가 도구와 로드맵을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.