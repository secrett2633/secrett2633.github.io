---
title: "[논문리뷰] TrackingWorld: World-centric Monocular 3D Tracking of Almost All Pixels"
excerpt: "Tianyu Huang이 [arXiv]에 게시한 'TrackingWorld: World-centric Monocular 3D Tracking of Almost All Pixels' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Monocular 3D Tracking
  - World-centric Coordinates
  - Dense Tracking
  - Camera Pose Estimation
  - Dynamic Object Tracking
  - Optimization
  - 2D Track Upsampling

permalink: /ai/review/2025-12-10-TrackingWorld-World-centric-Monocular-3D-Tracking-of-Almost-All-Pixels/

toc: true
toc_sticky: true

date: 2025-12-10 00:00:00+0900+0900
last_modified_at: 2025-12-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.08358)

**저자:** Jiahao Lu, Weitao Xiong, Jiacheng Deng, Peng Li, Tianyu Huang, Zhiyang Dou, Cheng Lin, Sai-Kit Yeung, Yuan Liu



## 핵심 연구 목표
기존 단안 3D 트래킹 방법론의 한계인 **카메라 움직임과 전경 동적 객체 움직임의 분리 미흡** 및 **새롭게 출현하는 동적 객체의 밀집 트래킹 불가** 문제를 해결하는 것입니다. 본 연구는 단안 비디오에서 **거의 모든 픽셀을 세계 중심 3D 좌표계에서 밀집하게 3D 트래킹** 할 수 있는 새로운 파이프라인인 **TrackingWorld** 를 제안합니다.

## 핵심 방법론
TrackingWorld는 두 가지 주요 구성 요소로 이루어집니다. 첫째, 입력된 스파스 2D 트랙을 밀집 2D 트랙으로 변환하는 **트래킹 업샘플러(DELTA [4] 기반)** 를 도입하고, 모든 프레임에 반복 적용하며 중복 영역의 트랙을 제거하여 **모든 픽셀에 대한 밀집 2D 트래킹** 을 가능하게 합니다. 둘째, 추정된 카메라 포즈와 3D 좌표를 최적화하는 프레임워크를 통해 밀집 2D 트랙을 세계 중심 3D 궤적으로 변환합니다. 이 과정에서 **"가능한 한 정적" 제약 조건(`L_asap`)** 을 적용하여 부정확한 동적 마스크로 인한 배경 객체의 영향을 줄이고, **카메라 포즈(`π_τ`)** 와 **3D 트랙(`T'_static`, `T_dynamic`)** 을 번들 조정(`L_ba`), 깊이 일관성(`L_dc`), 강체성(`L_arap`), 시간적 평활성(`L_ts`) 손실 함수를 사용하여 공동으로 최적화합니다.

## 주요 결과
본 시스템은 **세계 중심 좌표 프레임** 에서 정확하고 밀집된 3D 트래킹을 달성했습니다. 카메라 포즈 추정에서 **Sintel, Bonn, TUM-D 데이터셋** 전반에 걸쳐 기존 방법론보다 우수한 성능을 보였으며, 특히 **Sintel 데이터셋** 에서 **0.088 ATE** 를 기록했습니다. 밀집 3D 트랙의 깊이 정확도 또한 최적화 기반 번들 조정을 통해 크게 향상되었으며, **Sintel 데이터셋** 에서 **0.218 Abs Rel** 및 **73.3% δ < 1.25** 를 달성했습니다. 특히 2D 업샘플러 모듈은 **CVO-Clean 데이터셋** 에서 **약 12배의 속도 향상(3.00분 → 0.25분)** 과 함께 정확도 개선(EPE↓ 1.45 → 1.24, IoU↑ 76.8 → 80.9)을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 **카메라 및 객체 모션 분리가 필수적인 응용 분야** 에 유용한 **세계 중심 밀집 3D 트래킹** 을 위한 포괄적인 프레임워크를 제공합니다. **트래킹 업샘플러** 는 스파스 2D 트랙을 효율적으로 밀집하게 확장하는 실용적인 방법을 제시하여, 밀집 트래킹의 실용성을 높입니다. 이는 **고화질 4D 재구성** 및 **고급 비디오 편집 도구** 개발에 중요한 기반이 될 수 있습니다. 다만, 2D 트랙, 단안 깊이, 동적 마스크 등 여러 보조 모델에 의존하므로, 이들 기반 모델의 품질이 최종 결과에 큰 영향을 미치며 향후 **엔드-투-엔드 통합** 연구 가능성을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.