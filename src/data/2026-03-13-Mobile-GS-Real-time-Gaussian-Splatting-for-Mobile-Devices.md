---
title: "[논문리뷰] Mobile-GS: Real-time Gaussian Splatting for Mobile Devices"
excerpt: "Xin Yu이 arXiv에 게시한 'Mobile-GS: Real-time Gaussian Splatting for Mobile Devices' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Gaussian Splatting
  - Mobile Rendering
  - Order-Independent Transparency
  - Neural Quantization
  - Real-time Rendering
  - View-dependent Enhancement
  - Spherical Harmonics Distillation
  - Resource-constrained Devices

permalink: /ai/review/2026-03-13-Mobile-GS-Real-time-Gaussian-Splatting-for-Mobile-Devices/

toc: true
toc_sticky: true

date: 2026-03-13 00:00:00+0900+0900
last_modified_at: 2026-03-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.11531)

**저자:** Xiaobiao Du, Yida Wang, Kun Zhan, et al.


## 1. Key Terms & Definitions
- **3DGS (3D Gaussian Splatting)** : An advanced 3D reconstruction technique representing scenes as a collection of anisotropic 3D Gaussian primitives, enabling high-quality, **photorealistic rendering** 및 **novel view synthesis** .
- **OIT (Order-Independent Transparency)** : 투명한 객체를 렌더링할 때 객체 간의 strict한 depth sorting 없이 올바른 합성 결과를 얻기 위한 기술로, 전통적인 **alpha blending** 의 계산 병목 현상을 해결하고자 합니다.
- **SH (Spherical Harmonics)** : 3D Gaussian의 **view-dependent** 한 appearance 및 color를 효율적으로 표현하기 위한 수학적 함수로, 다양한 차수(order)로 사용됩니다.
- **NVQ (Neural Vector Quantization)** : 3D Gaussian 파라미터와 같은 고차원 속성 벡터를 경량화된 신경망과 클러스터링을 활용하여 압축하는 기술입니다.
- **FPS (Frames Per Second)** : 렌더링 성능을 나타내는 지표로, 초당 렌더링되는 프레임 수를 의미하며, real-time 애플리케이션에서 핵심적인 성능 지표입니다.

## 2. Motivation & Problem Statement
3D Gaussian Splatting (3DGS)은 고품질 **novel view synthesis** 를 위한 강력한 기법으로 부상했지만, 높은 **computational demands** 와 막대한 **storage costs** 로 인해 **mobile devices** 에 배포하여 **real-time rendering** 을 구현하는 데 상당한 어려움이 있습니다. 기존 3DGS 방법론은 **alpha blending** 을 위해 **Gaussian depth sorting** 에 의존하는데, 이는 **primary computational bottleneck** 으로 [Figure 2]에서 보듯이 **real-time performance** 를 저해하는 핵심 요소입니다. 현재 **lightweight 3DGS** 기법들도 여전히 이 **sorting process** 에 의존하여 **resource-constrained mobile platforms** 에서의 효율적인 배포를 어렵게 합니다. 따라서 본 연구는 **order-free rendering** , **Gaussian quantization** , 그리고 **fewer Gaussian points** 를 통해 이러한 한계점을 극복하고 **mobile devices** 에서 **real-time Gaussian Splatting** 을 가능하게 하는 효율적인 솔루션의 필요성에서 출발했습니다.

## 3. Method & Key Results
본 연구는 **mobile devices** 에 최적화된 **real-time Gaussian Splatting** 방법론인 **Mobile-GS** 를 제안합니다. **Mobile-GS** 는 여러 핵심 컴포넌트를 통합하여 기존 **3DGS** 의 한계를 극복합니다.

1.  **Depth-aware Order-independent Rendering** : 전통적인 **alpha blending** 의 **computationally intensive sorting process** 를 제거하기 위해, **depth-aware order-independent rendering** 기법을 도입합니다 

![Figure 3: Rendering pipeline of our proposed Mobile-GS compared with 3DGS. In the inference stage, different from 3DGS, our proposed method eliminates the tile-based rendering and the 3D Gaussian sorting process typically required for accurate alpha blending. Instead, we first compute the color of each 3D Gaussian for its related pixels in parallel and accumulate the color value for each pixel. Then, we composite the foreground and background color in a single pass. To further improve performance and maintain visual quality, we propose a depth-aware order-independent rendering strategy that replaces the original sorting-dependent alpha blending.](/paper-images/2026-03-13/2603.11531/figure_3.png)
*Figure 3: Rendering pipeline of our proposed Mobile-GS compared with 3DGS. In the inference stage, different from 3DGS, our proposed method eliminates the tile-based rendering and the 3D Gaussian sorting process typically required for accurate alpha blending. Instead, we first compute the color of each 3D Gaussian for its related pixels in parallel and accumulate the color value for each pixel. Then, we composite the foreground and background color in a single pass. To further improve performance and maintain visual quality, we propose a depth-aware order-independent rendering strategy that replaces the original sorting-dependent alpha blending.*

. 이는 learnable하고 **view-conditioned weighting scheme** 을 통해 **Gaussian** 들의 깊이와 스케일에 기반하여 **order-independently** 블렌딩함으로써 **rendering speed** 를 크게 향상시킵니다.
2.  **Neural View-dependent Enhancement** : **order-independent rendering** 으로 인해 발생할 수 있는 transparency artifacts를 완화하기 위해, 3D Gaussian의 속성과 **viewing direction** 에 따라 **view-dependent opacity scalar** 를 예측하는 경량 **MLP** 를 활용한 **neural view-dependent enhancement** 전략을 제안합니다 [Figure 4].
3.  **First-order SH Distillation** : **SH (Spherical Harmonics)** 표현에 필요한 파라미터 수를 줄이기 위해, **third-order SH** 를 **first-order SH** ( **3x4 coefficients** )로 **distillation** 하는 기법을 적용합니다. 이는 저장 공간을 절감하고 **rendering speed** 를 높이는 데 기여합니다.
4.  **Neural Vector Quantization (NVQ)** : **memory-constrained mobile platforms** 에 배포하기 위해, **K-means clustering** 과 **sub-vector decomposition** 전략을 활용한 **NVQ** 기법으로 **3D Gaussian parameters** 를 압축합니다.
5.  **Contribution-based Pruning** : **redundant Gaussian primitives** 를 줄이기 위해 opacity와 spatial scale을 종합적으로 고려하는 **contribution-based pruning** 전략을 사용합니다 [Figure 4, Right].

**Mobile-GS** 는 **Snapdragon 8 Gen 3 GPU** 가 장착된 **mobile device** 에서 **1600 × 1063** 해상도에서 **116 FPS** 의 **rendering speed** 를 달성했습니다 [Figure 1(a)]. 또한, **RTX 3090 Ti GPU** 상에서 **4.8 MB** 의 **storage** 로 **1098 FPS** 를 기록하며, 기존 **3DGS** ( **1.2 GB** , **134 FPS** , **PSNR 24.89** ) 및 **SortFreeGS** ( **1.3 GB** , **612 FPS** , **PSNR 24.15** )와 비교하여 유사한 **rendering quality** ( **PSNR 24.82** )를 유지했습니다 [Figure 1(b)]. 종합적인 벤치마크 결과 

![Table 1: Quantitative comparisons of state-of-the-art 3D reconstruction methods on real-world datasets. We evaluate and report performance on three commonly used datasets, such as Mip-NeRF 360 (Barron et al., 2022), Tank&Temples (Knapitsch et al., 2017), and Deep Blending (Hedman et al., 2018). We highlight the best results among the lightweight 3DGS methods.](/paper-images/2026-03-13/2603.11531/table_1.png)
*Table 1: Quantitative comparisons of state-of-the-art 3D reconstruction methods on real-world datasets. We evaluate and report performance on three commonly used datasets, such as Mip-NeRF 360 (Barron et al., 2022), Tank&Temples (Knapitsch et al., 2017), and Deep Blending (Hedman et al., 2018). We highlight the best results among the lightweight 3DGS methods.*

에서 **Mobile-GS** 는 **Mip-NeRF 360** 데이터셋에서 **4.6 MB** 의 가장 작은 **storage** 와 **1125 FPS** 의 높은 **rendering speed** 를 보였으며, 이는 **3DGS** ( **839.9 MB** , **174 FPS** ) 및 다른 **lightweight** 방법론들을 크게 능가하는 수치입니다. **Mobile device** 테스트 [Table 2]에서는 **127 Cold-start FPS** 와 **74 Steady-state FPS** 를 기록하며, 다른 **quantized** 방법론들보다 월등히 뛰어난 성능을 입증했습니다.

## 4. Conclusion & Impact
**Mobile-GS** 는 **real-time Gaussian Splatting** 을 **mobile devices** 에 최적화하여 구현한 최초의 방법론입니다. **Depth-aware order-independent rendering** , **neural view-dependent enhancement** , **first-order SH distillation** , **neural vector quantization** , **contribution-based pruning** 등 혁신적인 기술들을 통합함으로써, 기존 **3DGS** 와 비교하여 동등한 수준의 높은 **visual quality** 를 유지하면서도 **memory usage** 및 **computational overhead** 를 획기적으로 줄였습니다. 이 연구는 **resource-constrained mobile platforms** (예: 스마트폰, **AR headsets** )에서 3D 장면의 **real-time rendering** 및 **novel view synthesis** 를 가능하게 하여, **mobile AR reconstruction** , **virtual try-on** , **autonomous driving visualization** 등 다양한 응용 분야에서 새로운 가능성을 열 것으로 기대됩니다. **Mobile-GS** 의 높은 효율성은 **edge devices** 에서의 3D 콘텐츠 경험을 혁신하는 데 중요한 역할을 할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.