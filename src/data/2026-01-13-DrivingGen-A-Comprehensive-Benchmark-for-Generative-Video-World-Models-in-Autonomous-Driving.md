---
title: "[논문리뷰] DrivingGen: A Comprehensive Benchmark for Generative Video World Models in Autonomous Driving"
excerpt: "arXiv에 게시된 'DrivingGen: A Comprehensive Benchmark for Generative Video World Models in Autonomous Driving' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Generative World Models
  - Autonomous Driving
  - Video Generation
  - Benchmark
  - Evaluation Metrics
  - Trajectory Prediction
  - Temporal Consistency
  - Data Diversity

permalink: /ai/review/2026-01-13-DrivingGen-A-Comprehensive-Benchmark-for-Generative-Video-World-Models-in-Autonomous-Driving/

toc: true
toc_sticky: true

date: 2026-01-13 00:00:00+0900+0900
last_modified_at: 2026-01-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.01528)

**저자:** Yang Zhou, Hao Shao, Letian Wang, Zhuofan Zong, Hongsheng Li, Steven L. Waslander



## 핵심 연구 목표
자율주행을 위한 **생성형 비디오 월드 모델** 연구 분야는 빠르게 성장하고 있지만, 안전에 중요한 시각적 요소, 궤적의 현실성, 시공간 및 에이전트 수준의 일관성, 제어 가능성을 간과하는 기존 평가 방법론의 한계에 직면해 있습니다. 이 연구는 이러한 격차를 해소하고 실세계 배포에 필요한 다양성을 충족하는 **포괄적인 벤치마크** 를 구축하는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 다양한 주행 데이터셋과 인터넷 비디오를 큐레이션하여 **다양한 날씨, 시간, 지역, 복잡한 기동 시나리오** 를 포함하는 **DrivingGen 데이터셋** 을 구축합니다. 평가에는 시각적 사실성, 궤적의 그럴듯함, 시공간 일관성, 제어 가능성을 종합적으로 측정하는 새로운 다면적 지표들이 도입되었습니다. 주요 지표로는 비디오 및 궤적 분포를 측정하는 **FVD (Fréchet Video Distance)** 및 **FTD (Fréchet Trajectory Distance)** , 이미지 품질을 측정하는 **CLIP-IQA+** , 궤적 품질, 시공간 일관성, 그리고 궤적 정렬을 위한 **ADE (Average Displacement Error)** 및 **DTW (Dynamic Time Warping)** 등이 포함됩니다.

## 주요 결과
**DrivingGen** 벤치마크는 14개의 최신 생성형 월드 모델을 평가했으며, 모델 간 명확한 장단점을 드러냈습니다. **Kling 2.1***과 같은 상업용 클로즈드-소스 모델들은 일반적으로 시각적 품질과 전반적인 순위에서 앞섰습니다(Open-Domain 및 Ego-Conditioned 트랙에서 모두 평균 순위 **1위** ). 반면, **Cosmos-Predict2** 와 같은 자율주행 특화 모델들은 궤적 정확도(예: Ego-Conditioned 트랙에서 **ADE 22.38** , **DTW 1490** )에서 뛰어났지만 시각적 품질은 부족했습니다. 이는 현재 어떠한 단일 모델도 시각적 사실성과 궤적 충실도를 동시에 달성하지 못했음을 보여줍니다.

## AI 실무자를 위한 시사점
AI 실무자들은 **자율주행 월드 모델** 개발 시 시각적 현실성뿐만 아니라 **물리적 일관성, 궤적 정확도, 에이전트 행동의 일관성, 그리고 제어된 경로 추종 능력** 을 종합적으로 평가하고 개선해야 함을 시사합니다. **DrivingGen** 은 이러한 다면적 평가를 통해 모델의 숨겨진 실패 모드를 드러내고, 개발자들이 특정 목표(예: 안전성, 현실성, 제어 가능성)에 따라 모델을 최적화하는 데 필요한 명확한 지침을 제공합니다. 이는 실제 자율주행 시스템에 배포될 **신뢰성 높은 월드 모델** 을 구축하는 데 필수적인 통찰력을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.