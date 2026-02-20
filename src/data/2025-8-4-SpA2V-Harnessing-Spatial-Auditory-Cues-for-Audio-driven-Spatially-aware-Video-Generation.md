---
title: "[논문리뷰] SpA2V: Harnessing Spatial Auditory Cues for Audio-driven Spatially-aware
  Video Generation"
excerpt: "Long Chen이 arXiv에 게시한 'SpA2V: Harnessing Spatial Auditory Cues for Audio-driven Spatially-aware
  Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Audio-driven Video Generation
  - Spatial Auditory Cues
  - Video Scene Layout
  - MLLM
  - Diffusion Models
  - Training-free

permalink: /ai/review/2025-8-4-SpA2V-Harnessing-Spatial-Auditory-Cues-for-Audio-driven-Spatially-aware-Video-Generation/

toc: true
toc_sticky: true

date: 2025-08-04 12:17:01+0900
last_modified_at: 2025-08-04 12:17:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.00782)

**저자:** Kien T. Pham, Yingqing He, Yazhou Xing, Qifeng Chen, Long Chen

**키워드:** `Audio-driven Video Generation`, `Spatial Auditory Cues`, `Video Scene Layout`, `MLLM`, `Diffusion Models`, `Training-free`

## 핵심 연구 목표
본 논문은 기존 오디오 기반 비디오 생성 모델들이 주로 시맨틱 정보에만 초점을 맞춰 공간적 일관성이 부족하다는 한계를 지적합니다. 이에, 인간이 소리에서 위치 및 움직임과 같은 공간적 속성을 자연스럽게 파악하는 능력에 착안하여, **오디오에서 공간 청각 단서(spatial auditory cues)를 직접 추출** 하여 시맨틱 및 공간적으로 정렬된 사실적인 비디오를 생성하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 **SpA2V** 프레임워크는 2단계로 구성됩니다. 첫 번째 **Audio-guided Video Planning** 단계에서는 **Gemini 2.0 Flash** 와 같은 **MLLM** 을 활용하여 입력 오디오로부터 공간 및 시맨틱 단서를 추출, **Video Scene Layouts (VSLs)** 을 생성합니다. 이 과정에서 **In-context Learning** 및 **prompting mechanism** 을 통해 VSL의 품질을 높입니다. 두 번째 **Layout-grounded Video Generation** 단계에서는 생성된 VSL을 **Stable Diffusion 1.5** 기반의 사전 훈련된 확산 모델에 조건으로 주입하여 비디오를 생성합니다. 이때 **AnimateDiff의 Motion Modules** 와 **MIGC의 Spatial Grounding Modules** 를 **훈련 없이(training-free)** 통합하여 공간적 접지(grounding)와 모션 모델링을 구현합니다.

## 주요 결과
**SpA2V** 는 새로 구축한 **AVLBench** 벤치마크에서 기존 **Audio Captioning + LVD** 방식을 크게 능가하는 성능을 보였습니다. 특히, **LTSim** , **MaxIoU** , **DocSim** 지표에서 월등한 VSL 품질을 달성했으며 (예: Stationary 시나리오에서 LTSim 75.73%, MaxIoU 15.47% 기록), 비디오 생성에서도 **FVD** (낮을수록 좋음, Stationary 시나리오에서 633.05) 및 **AV-Align** (높을수록 좋음, 0.173)에서 현저히 우수한 결과를 보였습니다. 사용자 연구에서도 **SpA2V** 생성 비디오가 시각적 품질과 오디오-비디오 정렬 측면에서 높은 선호도(평균 순위 1.97 및 1.95)를 얻었습니다.

## AI 실무자를 위한 시사점
본 연구는 **MLLM의 강력한 추론 능력** 을 활용하여 오디오에서 복잡한 공간 정보를 추출하고, 이를 비디오 생성에 활용하는 **새로운 2단계 파이프라인** 의 가능성을 제시합니다. **사전 훈련된 확산 모델에 훈련 없이 VSL을 통합** 하는 방식은 계산 효율성을 높이고 데이터 주석 부담을 줄여 실무 적용에 유리합니다. 하지만 MLLM 생성 VSL의 품질과 기본 확산 모델의 한계에 의존적이므로, 향후 모델 개선이나 특정 시나리오에 대한 **LoRA** 기반 미세 조정이 필요할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.
