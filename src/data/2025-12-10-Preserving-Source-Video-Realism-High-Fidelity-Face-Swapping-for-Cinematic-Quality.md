---
title: "[논문리뷰] Preserving Source Video Realism: High-Fidelity Face Swapping for Cinematic Quality"
excerpt: "이 [arXiv]에 게시한 'Preserving Source Video Realism: High-Fidelity Face Swapping for Cinematic Quality' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Face Swapping
  - Video Editing
  - Diffusion Models
  - Reference-guided Generation
  - Temporal Consistency
  - Keyframe Conditioning
  - Cinematic Quality
  - Dataset Construction

permalink: /ai/review/2025-12-10-Preserving-Source-Video-Realism-High-Fidelity-Face-Swapping-for-Cinematic-Quality/

toc: true
toc_sticky: true

date: 2025-12-10 00:00:00+0900+0900
last_modified_at: 2025-12-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.07951)

**저자:** Zekai Luo, Zongze Du, Zhouhang Zhu, Hao Zhong, Muzhi Zhu, Wen Wang, Yuling Xi, Chenchen Jing, Hao Chen, Chunhua Shen



## 핵심 연구 목표
본 논문은 기존의 얼굴 교체(face swapping) 기술들이 장시간의 복잡한 비디오 시퀀스에서 높은 충실도(high fidelity)와 시간적 일관성(temporal consistency)을 유지하는 데 어려움을 겪는 문제를 해결하고자 합니다. 특히 영화 제작 환경에서 요구되는 **고품질의 시네마틱 결과물** 을 위해 소스 비디오의 현실감을 보존하면서 타겟 인물의 정체성과 세밀한 속성을 통합하는 것이 목표입니다.

## 핵심 방법론
제안하는 `LIVINGSWAP` 모델은 **비디오 참조 기반(video reference guided)** 얼굴 교체 방식을 최초로 도입합니다. 이는 **키프레임 기반의 정체성 주입(keyframe identity injection)** 을 통해 타겟 정체성을 안정적으로 유지하고, **소스 비디오 참조 완료(video reference completion)** 를 통해 조명, 표현 등 비정체성 속성을 보존합니다. 또한, 장시간 비디오의 **시간적 연결(temporal stitching)** 을 위해 이전 청크의 마지막 프레임을 다음 청크의 시작 프레임 가이드로 활용하며, **Diffusion Transformer (DiT)** 및 **Rectified Flow** 를 기반으로 합니다. 훈련을 위해 `Face2Face`라는 **역할 반전(role-reversing)** 데이터셋 구성 전략을 사용합니다.

## 주요 결과
`LIVINGSWAP`은 `CineFaceBench` 벤치마크에서 **평균 순위(Avg. Rank) 1.667** 을 기록하며 `ID Similarity`, `Expression Error`, `Lighting Error`, `Gaze Error`, `Pose Error`, `FVD` 등 모든 지표에서 최첨단 성능을 달성했습니다. 특히 **FVD (Frechet Video Distance)** 에서는 `CineFaceBench easy`에서 **54.32** , `hard`에서 **63.97** 로 우수함을 보였습니다. 이는 복잡한 조명, 과장된 표정, 메이크업, 반투명 가려짐 등 도전적인 시나리오에서 강력한 시각적 현실감을 유지함을 입증합니다. 또한, 수동 작업량을 최대 **40배** 까지 줄였습니다.

## AI 실무자를 위한 시사점
`LIVINGSWAP`은 영화 및 엔터테인먼트 산업에서 **고품질의 비디오 얼굴 교체** 를 위한 실용적인 솔루션을 제공하며, **수동 편집 노력** 을 획기적으로 줄여줍니다. **키프레임 기반의 정체성 주입** 과 **비디오 참조 기반 방식** 은 장시간 비디오의 일관성과 충실도를 보장하는 데 중요한 기여를 합니다. 또한, `Face2Face` 데이터셋 구성 전략은 **페어 데이터 부족 문제** 를 해결하고, `CineFaceBench`는 실제 산업 시나리오에 특화된 모델 평가를 가능하게 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.