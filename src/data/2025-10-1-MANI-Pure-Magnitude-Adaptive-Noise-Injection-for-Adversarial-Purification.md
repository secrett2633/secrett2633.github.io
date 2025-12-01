---
title: "[논문리뷰] MANI-Pure: Magnitude-Adaptive Noise Injection for Adversarial
  Purification"
excerpt: "Zhiming Luo이 [arXiv]에 게시한 'MANI-Pure: Magnitude-Adaptive Noise Injection for Adversarial
  Purification' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Adversarial Purification
  - Diffusion Models
  - Frequency Domain
  - Adaptive Noise Injection
  - Robustness
  - Image Security
  - Magnitude Spectrum

permalink: /ai/review/2025-10-1-MANI-Pure-Magnitude-Adaptive-Noise-Injection-for-Adversarial-Purification/

toc: true
toc_sticky: true

date: 2025-10-01 14:04:08+0900
last_modified_at: 2025-10-01 14:04:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.25082)

**저자:** Xiaoyi Huang, Junwei Wu, Kejia Zhang, Carl Yang, Zhiming Luo



## 핵심 연구 목표
기존 확산 모델 기반의 적대적 정화(Adversarial Purification, AP) 방식이 균일한 노이즈 주입으로 인해 이미지의 의미론적 구조를 손상시키고 강건성을 저해하는 문제를 해결하는 것이 목표입니다. 특히 적대적 교란(perturbations)이 고주파 영역에 불균일하게 집중되어 있음을 밝히고, 이를 **주파수-적응형(frequency-adaptive)** 방식으로 정화하여 **의미론적 무결성(semantic fidelity)** 을 유지하면서 강건성을 향상시키고자 합니다.

## 핵심 방법론
본 논문은 **MANI-Pure** 라는 확산 기반 정화 프레임워크를 제안하며, 이는 두 가지 모듈로 구성됩니다. 첫째, **MANI(Magnitude-Adaptive Noise Injection)** 는 입력 이미지의 **푸리에 스펙트럼(Fourier spectrum)** 에서 계산된 주파수 밴드별 평균 크기(magnitude)에 기반하여 노이즈 주입 강도를 적응적으로 조절합니다. 낮은 크기의 고주파 밴드에 더 큰 가중치를 부여하여 취약한 영역을 타겟팅합니다. 둘째, **FreqPure(Frequency Purification)** 는 역확산 과정에서 **크기-위상 분해(magnitude-phase decomposition)** 를 사용하여 저주파 콘텐츠를 보존하고 고주파 교란에 집중하여 정화합니다.

## 주요 결과
**MANI-Pure** 는 **CIFAR-10** 및 **ImageNet-1K** 데이터셋에서 강력한 적대적 공격에 대해 뛰어난 성능을 보였습니다. **ViT-L/14** 모델 사용 시, **CIFAR-10** 에서 **AutoAttack (l∞)** 에 대해 강건성 정확도를 **2.15%** , **BPDA+EOT** 에 대해 **2.54%** 향상시켰습니다. **ImageNet-1K** 에서는 **BPDA+EOT** 에 대해 기존 **최고 성능 대비 3.8%** 더 높은 강건성 정확도를 달성하며 **RobustBench 리더보드에서 Top-1** 을 기록했습니다. 또한, 원본 분류기와의 클린 정확도 격차를 **0.59% 이내** 로 줄였으며, **SSIM** 및 **LPIPS** 지표에서도 가장 높은 지각 품질을 보였습니다.

## AI 실무자를 위한 시사점
**MANI-Pure** 는 기존 확산 기반 AP 방식에 **플러그 앤 플레이(plug-and-play)** 방식으로 통합될 수 있는 모듈형 방어 전략을 제공합니다. 이는 추가 훈련 비용 없이 다양한 백본 아키텍처와 정화 파이프라인에 적용되어 모델의 강건성을 크게 향상시킬 수 있음을 의미합니다. 적대적 교란이 고주파 영역에 집중된다는 경험적 분석은 향후 강건한 AI 시스템 설계를 위한 **주파수-인식(frequency-aware)** 방어 메커니즘 개발에 중요한 통찰력을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.