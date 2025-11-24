---
title: "[논문리뷰] Reasoning via Video: The First Evaluation of Video Models' Reasoning Abilities through Maze-Solving Tasks"
excerpt: "Yiran Peng이 [arXiv]에 게시한 'Reasoning via Video: The First Evaluation of Video Models' Reasoning Abilities through Maze-Solving Tasks' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Models
  - Spatial Reasoning
  - Maze Solving
  - Video Generation
  - Benchmark
  - Supervised Fine-tuning
  - Test-Time Scaling
  - Multimodal Reasoning

permalink: /ai/review/2025-11-20-Reasoning-via-Video-The-First-Evaluation-of-Video-Models-Reasoning-Abilities-through-Maze-Solving-Tasks/

toc: true
toc_sticky: true

date: 2025-11-20 00:00:00+0900+0900
last_modified_at: 2025-11-20 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.15065)

**저자:** Cheng Yang, Haiyuan Wan, Yiran Peng, et al.



## 핵심 연구 목표
본 논문은 비디오 모델의 추론 능력, 특히 **비디오 생성**을 통한 추론 능력을 체계적으로 평가하기 위한 포괄적인 벤치마크의 부재를 해결합니다. 비디오 모델이 시공간적 연속성을 활용하여 미로 해결과 같은 복잡한 공간 추론 작업을 수행할 수 있는지 검증하고, "비디오를 통한 추론" 패러다임의 잠재력을 탐구하는 것을 목표로 합니다.

## 핵심 방법론
연구는 **VR-Bench**라는 새로운 벤치마크를 제안하며, 이는 **정규 미로, 불규칙 미로, 3D 미로, 트랩필드, 소코반**의 다섯 가지 미로 유형에 걸쳐 **7,920개의 절차적으로 생성된 비디오**로 구성됩니다. 모델은 **체인-오브-프레임(chain-of-frame) 추론 패러다임**을 통해 프레임별 추론을 생성하며, **정확 일치(EM), 성공률(SR), 정밀률(PR), 스텝 편차(SD)**를 포함한 4가지 핵심 지표로 평가됩니다. 또한 **지도 미세 조정(SFT)** 및 **테스트-시간 스케일링** 기법이 모델 성능에 미치는 영향을 분석합니다.

## 주요 결과
**Wan-R1** 모델은 지도 미세 조정을 통해 **VR-Bench**의 모든 미로 유형 및 지표에서 선도적인 **VLM(Vision-Language Models)** 및 기존 비디오 모델들을 일관되게 능가하는 성능을 보였습니다. 특히, **트랩필드 및 3D 미로**에서 **100.0%의 성공률**을 달성하며, 베이스라인 모델 대비 **3D 미로 EM +65.3% 개선** 및 **소코반 SD -100.1% 감소**를 기록했습니다. 또한 **테스트-시간 스케일링**은 다양한 샘플링을 통해 추론 신뢰도를 **10-20% 향상**시키는 효과를 보였습니다.

## AI 실무자를 위한 시사점
비디오 생성 모델은 복잡한 시각적 추론 작업에서 텍스트 기반 VLM보다 뛰어난 성능을 보이는 **공간 추론을 위한 유망하고 확장 가능한 기반**임을 시사합니다. **지도 미세 조정**은 비디오 모델의 추론 능력과 일반화 능력을 크게 향상시키며, **테스트-시간 스케일링**은 추가 훈련 없이 추론 성능과 신뢰성을 높일 수 있는 실용적인 방법입니다. **VR-Bench**는 시공간 추론 분야에서 더욱 강력하고 일반화 가능한 비디오 모델을 개발하기 위한 중요한 평가 도구 역할을 할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.