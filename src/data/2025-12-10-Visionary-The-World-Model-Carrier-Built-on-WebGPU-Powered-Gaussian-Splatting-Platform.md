---
title: "[논문리뷰] Visionary: The World Model Carrier Built on WebGPU-Powered Gaussian Splatting Platform"
excerpt: "Muyao Niu이 arXiv에 게시한 'Visionary: The World Model Carrier Built on WebGPU-Powered Gaussian Splatting Platform' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Neural Rendering
  - 3D Gaussian Splatting
  - WebGPU
  - ONNX Inference
  - World Models
  - Real-time Rendering
  - Browser-based
  - Dynamic Scenes

permalink: /ai/review/2025-12-10-Visionary-The-World-Model-Carrier-Built-on-WebGPU-Powered-Gaussian-Splatting-Platform/

toc: true
toc_sticky: true

date: 2025-12-10 00:00:00+0900+0900
last_modified_at: 2025-12-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.08478)

**저자:** Yuning Gong, Yifei Liu, Yifan Zhan, Muyao Niu, Xueying Li, Yuanjun Liao, Jiaming Chen, Yuanyuan Gao, Jiaqi Chen, Minming Chen, Li Zhou, Yuning Zhang, Wei Wang, Xiaoqing Hou, Huaxi Huang, Shixiang Tang, Le Ma, Dingwen Zhang, Xue Yang, Junchi Yan, Yinqiang Zheng, Xiao Sun, Zhihang Zhong



## 핵심 연구 목표
본 논문은 기존 3D Gaussian Splatting(3DGS) 뷰어의 한계인 파편화, 무거움, 레거시 파이프라인 제약으로 인한 높은 배포 마찰과 동적 콘텐츠 및 생성 모델 지원 부족 문제를 해결하고자 합니다. 이를 위해 **WebGPU 기반의 개방형 웹 네이티브 플랫폼인 Visionary** 를 제안하여 실시간으로 다양한 3DGS 및 메시를 렌더링하고, 동적 신경 처리와 가볍고 "클릭-앤-실행" 방식의 브라우저 경험을 제공하는 것을 목표로 합니다.

## 핵심 방법론
Visionary는 효율적인 **WebGPU 렌더러** 와 **프레임별 ONNX 추론** 을 기반으로 구축되었습니다. 핵심적으로 **표준화된 Gaussian Generator 계약** 을 도입하여 플러그 앤 플레이 방식의 알고리즘이 매 프레임마다 Gaussians를 생성하거나 업데이트할 수 있도록 합니다. 또한, **ONNX 기반의 생성적 후처리** 를 지원하며, **TypeScript API를 포함한 three.js 플러그인** 을 통해 기존 웹 애플리케이션과의 원활한 통합을 제공합니다. 렌더링 효율성을 위해 **GPU 기반 프리미티브 정렬** 방식을 채택했습니다.

## 주요 결과
Visionary는 동일한 3DGS 에셋에서 기존 웹 뷰어인 SparkJS 대비 **우수한 렌더링 효율성** 을 달성했습니다. 606만 Gaussians의 전체 해상도에서 Visionary는 총 프레임 시간을 **176.90ms에서 2.09ms로 단축** 하여 최대 **~135배의 속도 향상** 을 보였습니다. 렌더링 품질 면에서도 PSNR, SSIM, LPIPS 지표에서 SparkJS와 동등하거나 약간 더 나은 결과를 보여주며, **MLP 기반 3DGS, 4DGS, 신경 아바타** 에 대해 **7-8ms 범위의 실시간 프레임별 디코딩** 성능을 입증했습니다.

## AI 실무자를 위한 시사점
Visionary는 추론과 렌더링을 브라우저 내에서 직접 통합함으로써 3DGS 계열 방법론의 **재현, 비교 및 배포 장벽을 크게 낮춥니다.** 이를 통해 개발자들은 복잡한 네이티브 설치나 서버 측 추론 없이도 **동적이고 생성적인 3DGS 애플리케이션을 실시간으로 배포** 할 수 있습니다. **ONNX 기반 Gaussian Generator 계약** 은 다양한 신경 렌더링 알고리즘을 유연하게 통합할 수 있는 확장 가능한 프레임워크를 제공하여, AI/ML 엔지니어들이 새로운 세계 모델을 탐색하고 구축하는 데 강력한 도구가 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.