---
title: "[논문리뷰] HuMo: Human-Centric Video Generation via Collaborative Multi-Modal
  Conditioning"
excerpt: "Zhuowei Chen이 arXiv에 게시한 'HuMo: Human-Centric Video Generation via Collaborative Multi-Modal
  Conditioning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Human-Centric Video Generation
  - Multimodal Conditioning
  - Text-to-Video
  - Image-to-Video
  - Audio-to-Video
  - Diffusion Models
  - Subject Preservation
  - Audio-Visual Synchronization
  - Progressive Training

permalink: /ai/review/2025-9-12-HuMo-Human-Centric-Video-Generation-via-Collaborative-Multi-Modal-Conditioning/

toc: true
toc_sticky: true

date: 2025-09-12 13:12:46+0900
last_modified_at: 2025-09-12 13:12:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.08519)

**저자:** Liyang Chen, Tianxiang Ma, Jiawei Liu, Bingchuan Li, Zhuowei Chen



## 핵심 연구 목표
본 논문은 사람 중심 비디오 생성(HCVG)에서 겪는 두 가지 주요 문제, 즉 **다중 모드 조건(텍스트, 이미지, 오디오)의 희소한 학습 데이터** 와 **주제 보존 및 오디오-시각 동기화 간의 효과적인 협업 제어의 어려움** 을 해결하고자 합니다. 궁극적으로 다양한 모드 입력을 통해 유연하고 정밀하며 협력적인 제어가 가능한 통합 HCVG 프레임워크인 HuMo를 제안하는 것이 목표입니다.

## 핵심 방법론
HuMo는 첫째, 상세한 텍스트 프롬프트, 일관된 참조 이미지, 동기화된 오디오를 포함하는 **고품질 다중 모드 데이터 처리 파이프라인** 을 구축합니다. 둘째, **DiT 기반 T2V 백본** 위에 **두 단계의 점진적 다중 모드 학습 패러다임** 을 도입합니다. 이 패러다임은 **최소 침습 이미지 주입 전략** 으로 주제 보존을 학습하고, **오디오 교차-어텐션 레이어** 와 **초점-예측 전략(focus-by-predicting)** 으로 오디오-시각 동기화를 강화합니다. 추론 시에는 **시간 적응형 Classifier-Free Guidance (CFG) 전략** 을 사용하여 동적으로 안내 가중치를 조절합니다.

## 주요 결과
HuMo는 정성적 및 정량적 평가에서 뛰어난 성능을 보였습니다. 특히 **주제 보존 태스크** 에서 **HuMo-17B** 는 **TVA 3.939↑** , **ID-Cur 0.731↑** , **ID-Glink 0.757↑** 를 달성하여 기존 SOTA 방법들을 능가했습니다. **오디오-시각 동기화 태스크** 에서는 **HuMo-17B** 가 **Sync-C 6.252↑** 및 **TVA 6.508↑** 를 달성하며 전문화된 SOTA 모델들을 뛰어넘는 성능을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 **텍스트, 참조 이미지, 오디오** 를 통합하여 사람 중심 비디오를 생성하는 데 있어 **실용적인 솔루션** 을 제공합니다. 제안된 **점진적 학습 패러다임** 과 **시간 적응형 CFG 전략** 은 다중 모드 제어에서 상충하는 목표(예: 텍스트 준수와 주제 일관성)의 균형을 맞추는 데 효과적인 방법론을 제시하며, **대규모 모델(1.7B 및 17B 매개변수)** 에서의 확장 가능성도 확인했습니다. 이는 **단편 비디오 제작** 의 수동 작업을 크게 줄이고 효율성을 높일 수 있는 잠재력을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.