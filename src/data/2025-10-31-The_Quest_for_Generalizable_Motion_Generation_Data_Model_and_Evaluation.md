---
title: "[논문리뷰] The Quest for Generalizable Motion Generation: Data, Model, and
  Evaluation"
excerpt: "이 [arXiv]에 게시한 'The Quest for Generalizable Motion Generation: Data, Model, and
  Evaluation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Motion Generation
  - Generalization
  - Diffusion Models
  - Transformer
  - Large-scale Dataset
  - Benchmark
  - Multimodal Learning
  - Video Generation

permalink: /ai/review/2025-10-31-The_Quest_for_Generalizable_Motion_Generation_Data_Model_and_Evaluation/

toc: true
toc_sticky: true

date: 2025-10-31 18:37:31+0900
last_modified_at: 2025-10-31 18:37:31+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.26794)

**저자:** Jing Lin, Ruisi Wang, Junzhe Lu, Ziqi Huang, Guorui Song, Ailing Zeng, Xian Liu, Chen Wei, Wanqi Yin, Qingping Sun, Zhongang Cai, Lei Yang, Ziwei Liu



## 핵심 연구 목표
본 논문은 3D 인간 모션 생성(MoGen) 모델이 기존 벤치마크에서는 뛰어난 성능을 보이나, **다양하고 새로운 명령에 대한 일반화 능력**이 현저히 부족하다는 근본적인 문제점을 해결하고자 합니다. 비디오 생성(ViGen) 분야의 성공적인 일반화 능력에서 통찰력을 얻어, 데이터, 모델링, 평가의 세 가지 핵심 축을 통해 MoGen의 일반화 능력을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 먼저 **ViMoGen-228K**라는 **228,000개**의 고품질 모션 샘플로 구성된 대규모 데이터셋을 구축했습니다. 이 데이터셋은 Optical MoCap, 웹 비디오 파생 모션, 최신 ViGen 모델로 생성된 합성 샘플을 통합합니다. 모델 측면에서는 **ViMoGen**이라는 **flow-matching 기반 diffusion transformer**를 제안했습니다. 이 모델은 **gated multimodal conditioning**을 통해 MoCap 및 ViGen 모델의 사전 지식을 효율적으로 통합하며, 비디오 생성 의존성을 제거한 경량화 버전인 **ViMoGen-light**도 개발했습니다. 마지막으로, 모션 품질, 프롬프트 충실도, 일반화 능력을 포괄적으로 평가하는 **MBench**라는 계층적 벤치마크를 제시했습니다.

## 주요 결과
제안된 **ViMoGen** 모델은 자동 및 인간 평가 모두에서 기존 접근 방식을 **상당히 능가하는 성능**을 입증했습니다. 특히, Motion Condition Consistency에서 **0.53** (ViMoGen) 대 0.48 (MotionLCM), Motion Generalizability에서 **0.68** (ViMoGen) 대 0.55 (MotionLCM)로 SOTA를 달성했습니다. 경량화된 **ViMoGen-light** 모델 또한 비디오 생성 의존성 없이 Motion Generalizability에서 **0.55**를 달성하여 강력한 일반화 능력을 유지했습니다. 데이터셋 구성 실험에서는 **합성 비디오 데이터** 추가 시 일반화 점수가 **0.50에서 0.55로 크게 향상**되어 semantic 다양성의 중요성을 확인했습니다.

## AI 실무자를 위한 시사점
본 연구는 **대규모의 다양한 데이터셋(ViMoGen-228K) 구축**과 **합성 데이터의 전략적 활용**이 모션 생성 모델의 일반화 능력 향상에 매우 중요함을 강조합니다. **비디오 생성 모델의 사전 지식**을 활용하는 **gated multimodal conditioning** 아키텍처는 복잡한 인간 행동을 모델링하는 효과적인 접근 방식을 제시하며, 이는 향후 범용 모션 파운데이션 모델 개발에 기여할 수 있습니다. 또한, **경량화된 distilled 모델(ViMoGen-light)**은 계산 효율성을 유지하면서 강력한 성능을 제공하여 실제 AI 애플리케이션에 적용 가능성을 높입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.