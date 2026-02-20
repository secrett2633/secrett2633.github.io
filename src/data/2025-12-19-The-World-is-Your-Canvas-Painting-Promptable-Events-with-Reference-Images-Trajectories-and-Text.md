---
title: "[논문리뷰] The World is Your Canvas: Painting Promptable Events with Reference Images, Trajectories, and Text"
excerpt: "arXiv에 게시된 'The World is Your Canvas: Painting Promptable Events with Reference Images, Trajectories, and Text' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - World Models
  - Video Generation
  - Multimodal Control
  - Trajectory Guidance
  - Reference Images
  - Promptable Events
  - Cross-Attention
  - Diffusion Models

permalink: /ai/review/2025-12-19-The-World-is-Your-Canvas-Painting-Promptable-Events-with-Reference-Images-Trajectories-and-Text/

toc: true
toc_sticky: true

date: 2025-12-19 00:00:00+0900+0900
last_modified_at: 2025-12-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.16924)

**저자:** Hanlin Wang, Hao Ouyang, Qiuyu Wang, Yue Yu, Yihao Meng, Wen Wang, Ka Leong Cheng, Shuailei Ma, Qingyan Bai, Yixuan Li, Cheng Chen, Yanhong Zeng, Xing Zhu, Yujun Shen, Qifeng Chen



## 핵심 연구 목표
본 논문은 기존 텍스트 전용 또는 궤적 기반 이미지-투-비디오(I2V) 생성 모델의 한계를 극복하고, 더욱 풍부하고 사용자 지향적인 "프롬프트 가능한 월드 이벤트" 시뮬레이션을 가능하게 하는 것을 목표로 합니다. 특히, 다중 에이전트 상호작용, 객체 진입/이탈, 참조 이미지 기반 외형 유지 등 복합적이고 일관된 이벤트를 정밀하게 제어하며 생성하고자 합니다.

## 핵심 방법론
저자들은 **trajectory-video-text triplets** 데이터셋을 구축하여 궤적 정보와 텍스트 설명을 동작과 밀접하게 정렬시켰습니다. 이를 기반으로 **Wan 2.2 I2V 14B 모델** 을 활용하며, **Trajectory Injection** 메커니즘을 통해 궤적 정보를 제어 신호로 주입하고 **Gaussian heatmap** 및 **point VAE map** 을 생성하여 동적인 지점 애니메이션을 구현합니다. 또한, **Spatial-Aware Weighted Cross-Attention** 을 도입하여 각 캡션과 해당 궤적 영역 간의 의미론적 정렬을 강화했습니다.

## 주요 결과
제안하는 **WorldCanvas** 는 다양한 정량적 지표에서 기존 모델들을 능가했습니다. 특히, **ObjMC 지표에서 91.06** (낮을수록 좋음), **Appearance Rate에서 85.17%** (높을수록 좋음)를 달성하며 궤적 추종 및 시각적 일관성에서 우수함을 보였습니다. **CLIP-T (Local) 점수도 0.1680** 으로 가장 높아 텍스트-비디오의 로컬 의미론적 정렬 능력 또한 뛰어남을 입증했으며, 인간 평가에서도 대부분의 항목에서 가장 높은 선호도를 얻었습니다.

## AI 실무자를 위한 시사점
**WorldCanvas** 는 AI 엔지니어와 개발자들이 복잡한 시나리오를 위한 대화형이고 제어 가능한 비디오 콘텐츠를 생성할 수 있는 강력한 도구를 제공합니다. 텍스트, 궤적, 참조 이미지를 결합한 다중 모달 제어는 높은 수준의 창의성과 정밀성을 요구하는 애플리케이션에 특히 유용할 것입니다. 객체 일관성 유지 및 장면 메모리 기능은 실제와 같은 월드 모델 구축을 위한 핵심 구성 요소로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.