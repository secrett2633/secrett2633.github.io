---
title: "[논문리뷰] Coarse-Guided Visual Generation via Weighted h-Transform Sampling"
excerpt: "arXiv에 게시된 'Coarse-Guided Visual Generation via Weighted h-Transform Sampling' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Guided Visual Generation
  - Diffusion Model
  - Doob's h-Transform
  - Coarse-guided Generation
  - Training-free
  - Image Restoration
  - Video Generation
  - Weighted Sampling

permalink: /ai/review/2026-03-13-Coarse-Guided-Visual-Generation-via-Weighted-h-Transform-Sampling/

toc: true
toc_sticky: true

date: 2026-03-13 00:00:00+0900+0900
last_modified_at: 2026-03-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.12057)

**저자:** Yanghao Wang*, Ziqi Jiang*, Zhen Wang, and Long Chent


## 1. Key Terms & Definitions (핵심 용어 및 정의)
- **Coarse-Guided Visual Generation** : Degraded 또는 low-fidelity의 coarse reference로부터 refined visual sample을 생성하는 태스크를 의미합니다.
- **h-Transform** : 확률적 프로세스(stochastic processes)의 샘플링 과정을 원하는 조건(desired conditions)으로 제한할 수 있는 수학적 도구입니다.
- **Score Predictor (se)** : 확산 모델(diffusion models)에서 데이터 분포의 gradient (∇xt log pt(xt))를 예측하도록 훈련된 파라미터화된 신경망을 의미합니다.
- **Weighted h-Transform Sampling** : 본 논문에서 제안하는 방법론으로, h-transform을 활용하여 샘플링 과정 중 transition probability를 수정하고, noise-level-aware schedule을 통해 approximation error의 영향을 완화합니다.
- **SDE (Stochastic Differential Equation) / ODE (Ordinary Differential Equation)** : 확산 모델에서 forward 및 reverse process를 설명하는 데 사용되는 수학적 방정식입니다.

## 2. Motivation & Problem Statement (연구 배경 및 문제 정의)
**Coarse-Guided Visual Generation** 은 deblurring, super-resolution 등 다양한 실제 애플리케이션에 필수적입니다. 최근 **Diffusion Model** 의 발전으로 높은 품질의 샘플 생성이 가능해졌지만, coarse visual sample을 가이드로 활용하는 시나리오에서는 기존 방법론들이 한계를 보입니다.

기존 접근 방식은 크게 세 가지 유형으로 나뉩니다. 첫째, **Training Translation Network** `[Figure 2(a)]`는 paired data를 기반으로 훈련되지만, 높은 훈련 비용과 제한된 generalization 능력으로 인해 다양한 유형의 coarse sample에 적용하기 어렵습니다. 둘째, **Solving Inverse Problem** `[Figure 2(b)]` 방식은 pre-trained **Diffusion Model** 을 활용하여 샘플링 과정에서 가이던스를 통합하지만, **bicubic downsampling** 과 같은 forward (fine-to-coarse) transformation operator를 미리 알아야 하는 단점이 있어 robustness가 떨어집니다. 셋째, **Start-Guided Synthesis (SDEdit)** `[Figure 2(c)]`는 coarse sample에 노이즈를 추가하여 샘플링을 시작하지만, 가이던스 신호의 손실과 낮은 생성 품질 사이에서 **unstable balance** 를 보이는 문제가 있습니다. 이러한 한계점들을 극복하기 위해 저자들은 **training-free** , **operator-free** , 그리고 **stable** 한 새로운 coarse-guided generation 방법론의 필요성을 제기합니다.

## 3. Method & Key Results (제안 방법론 및 핵심 결과)
저자들은 기존 방법론의 한계를 해결하기 위해 **Doob's h-transform** 에서 영감을 받아 **Weighted h-Transform Sampling** 을 제안합니다. 이 방법은 샘플링 과정에서 **transition probability** 를 수정하여, 이상적인 fine sample `y`를 향해 생성 과정을 유도합니다 `[Figure 2(d)]`. 구체적으로, original predicted score `se`에 새로운 drift adjustment `hx0=y`를 추가합니다. 그러나 `hx0=y`는 ground truth `y`에 의존하여 untractable하므로, 주어진 coarse sample `ỹ`를 활용한 tractable한 근사치 `hx0=ỹ`로 대체합니다 `[Figure 3(b)]`.

이 근사 과정에서 발생하는 approximation error `J`를 분석한 결과, `J`는 노이즈 레벨 `σt`에 반비례함을 발견했습니다. 즉, `σt`가 작아질수록 `J`가 증가하여 sampling process 후반부에 오차가 커지는 문제를 확인했습니다. 이를 완화하기 위해 저자들은 **noise-level-aware weight schedule** `λα = σt^α`를 도입하여 근사 항 `hx0=ỹ`의 가중치를 동적으로 조절합니다 `[Figure 3(c)]`. 이 스케줄은 approximation error가 클수록 가중치를 감소시켜 guidance adherence와 high-quality synthesis 간의 균형을 맞춥니다.

실험 결과는 제안된 방법론의 뛰어난 성능과 일반화 능력을 입증합니다. **Coarse-Image Guided Generation (Image Restoration)** 태스크에서 **FFHQ 256x256** 데이터셋을 사용한 정량적 비교 `

![Table 1: ](/paper-images/2026-03-13/2603.12057/table_1.png)
*Table 1: *

`에서, 본 방법은 **DPS** 와 같은 **operator-required methods** 에 비해 동등하거나 더 우수한 성능을 달성했습니다 (예: SR 태스크에서 **Ours FID↓: 33.28** , **LPIPS↓: 0.213** 로 **DPS** 의 39.35, 0.214와 비교). 특히, forward operator에 대한 사전 지식 없이 이러한 성능을 달성했다는 점에서 강점을 보입니다. 또한 **SDEdit** 과 같은 **operator-free methods** 에 비해 8개 지표 중 6개에서, 특히 **LPIPS** 에서 크게 향상된 성능을 보여 더 robust하고 principled한 coarse-image guidance 메커니즘을 제공합니다.

**Coarse-Video Guided Generation (Camera-Controlled)** 태스크 (`[Table 2]`)에서는 **DL3DV-10K** 데이터셋에서 **MSE↓: 11.45** , **LPIPS↓: 0.272** , **FVD↓: 13.26** , **DINOv2↓: 0.143** , **Optical Flow↓: 38.7** 등 대부분의 지표에서 최상의 결과를 달성했습니다. 이는 **GWTF** 나 **TTM** 과 같은 기존 방법론들보다 더 나은 ground truth alignment와 motion consistency를 의미합니다. `α` hyperparameter에 대한 **Ablation Study** `[Figure 6]`는 **α = 5** 근처에서 최적의 성능을 보이며, 제안된 **noise-level-aware schedule** 의 유효성을 뒷받침합니다.

## 4. Conclusion & Impact (결론 및 시사점)
본 논문은 **Weighted h-Transform Sampling** 이라는 novel한 **coarse-guided visual generation** 방법론을 제안합니다. 이 방법은 **h-transform** 을 통해 샘플링 과정에 가이던스를 주입하고, intractable한 h-function을 coarse sample 기반의 tractable한 근사치로 대체합니다. 또한, **noise-level-aware weight schedule** 을 사용하여 approximation error의 영향을 효과적으로 완화함으로써 고품질의 결과물을 안정적으로 생성할 수 있도록 합니다.

제안된 방법론은 이미지 복원(super-resolution, inpainting, motion/gaussian deblur) 및 카메라 제어 비디오 생성 등 다양한 이미지 및 비디오 생성 태스크에서 그 효과성과 일반화 능력을 광범위한 실험을 통해 입증했습니다. 이는 기존 **training-based approaches** 의 높은 비용과 제한된 generalization 문제, 그리고 **training-free approaches** 의 **forward operator** 에 대한 의존성 및 **guidance-quality balance** 문제 등 핵심적인 한계점들을 성공적으로 극복했습니다. 결과적으로 이 연구는 **training-free** , **operator-free** , 그리고 **stable** 한 coarse-guided generation을 위한 강력한 솔루션을 제공하며, **h-transform** 에 기반한 확률적 transition modification 메커니즘이 미래의 더욱 일반적인 조건부 생성(conditional generation) 애플리케이션에서 광범위하게 탐색될 수 있는 중요한 시사점을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.