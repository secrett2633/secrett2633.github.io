---
title: "[논문리뷰] Scaling Zero-Shot Reference-to-Video Generation"
excerpt: "arXiv에 게시된 'Scaling Zero-Shot Reference-to-Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reference-to-Video Generation
  - Zero-Shot Learning
  - Diffusion Models
  - Masked Training
  - Video-Text Pairs
  - Identity Preservation
  - Scalability
  - Attention Mechanism

permalink: /ai/review/2025-12-09-Scaling-Zero-Shot-Reference-to-Video-Generation/

toc: true
toc_sticky: true

date: 2025-12-09 00:00:00+0900+0900
last_modified_at: 2025-12-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.06905)

**저자:** Zijian Zhou, Shikun Liu, Haozhe Liu, Haonan Qiu, Zhaochong An, Weiming Ren, Zhiheng Liu, Xiaoke Huang, Kam Woh Ng, Tian Xie, Xiao Han, Yuren Cong, Hang Li, Chuyan Zhu, Aditya Patel, Tao Xiang, Sen He



## 핵심 연구 목표
논문은 기존 R2V(Reference-to-Video) 생성 모델이 **명시적인 R2V 데이터셋** 에 의존하여 확장성과 일반화 능력이 제한되는 문제를 해결하고자 합니다. 이를 위해 **명시적인 R2V 데이터 없이** 순수한 **대규모 비디오-텍스트 쌍** 만을 사용하여 **제로샷 R2V 생성** 이 가능한 **Saber** 프레임워크를 제안합니다.

## 핵심 방법론
Saber는 **마스크 학습 전략** 을 도입하여 훈련 중 무작위로 샘플링되고 부분적으로 마스크된 비디오 프레임을 참조 이미지로 사용합니다. 이 전략은 모델이 참조 문맥으로부터 **신원 및 외모 일관된 표현** 을 학습하도록 강제합니다. 또한, **맞춤형 어텐션 메커니즘** 과 **마스크 증강 기법** 을 통합하여 시각적 충실도를 높이고 'copy-paste' 아티팩트를 완화하며, **Wan2.1-14B 확산 모델** 을 기반으로 구축됩니다.

## 주요 결과
Saber는 **OpenS2V-Eval 벤치마크** 에서 기존 **R2V 데이터 기반 학습 모델** 및 상용 모델을 능가하는 성능을 보였습니다. 특히, **총점** 에서 상용 모델 **Kling1.6 대비 1.68% 높은 점수** 를 달성했으며, **NexusScore** (주제 일관성 측정)에서는 Phantom 대비 **9.79%** , VACE 대비 **3.14%** 더 높은 점수를 기록하여 마스크 학습 전략의 효과를 입증했습니다.

## AI 실무자를 위한 시사점
Saber는 **고가의 R2V 데이터셋 구축 필요성을 제거** 하여 R2V 생성의 **확장성** 을 혁신적으로 개선합니다. 이는 **제로샷 학습** 을 통한 **신원 보존 비디오 생성** 의 새로운 가능성을 열며, **대규모 비디오-텍스트 데이터** 만으로도 강력한 일반화 성능을 달성할 수 있음을 보여줍니다. 실무자들은 **마스크 학습 전략** 과 **맞춤형 어텐션 메커니즘** 을 다른 생성 모델에 적용하여 유사한 데이터 병목 현상을 해결하고, 맞춤형 비디오 생성 애플리케이션 개발에 활용할 수 있을 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.