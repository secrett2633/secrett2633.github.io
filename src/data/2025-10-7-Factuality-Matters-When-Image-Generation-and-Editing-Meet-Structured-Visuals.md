---
title: "[논문리뷰] Factuality Matters: When Image Generation and Editing Meet Structured
  Visuals"
excerpt: "Boxiang Qiu이 [arXiv]에 게시한 'Factuality Matters: When Image Generation and Editing Meet Structured
  Visuals' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Structured Visuals
  - Image Generation
  - Image Editing
  - Multimodal Reasoning
  - Factual Fidelity
  - Chain-of-Thought
  - Evaluation Benchmark
  - Diffusion Models

permalink: /ai/review/2025-10-7-Factuality-Matters-When-Image-Generation-and-Editing-Meet-Structured-Visuals/

toc: true
toc_sticky: true

date: 2025-10-07 13:36:57+0900
last_modified_at: 2025-10-07 13:36:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.05091)

**저자:** Le Zhuo, Songhao Han, Yuandong Pu, Boxiang Qiu, Sayak Paul, Yue Liao, Yihao Liu, Jie Shao, Xi Chen, Si Liu, Hongsheng Li



## 핵심 연구 목표
본 연구는 최신 시각 생성 모델들이 차트, 다이어그램, 수학 도형과 같은 **구조화된 시각 자료** 생성 및 편집에서 보이는 한계를 해결하고자 합니다. 이러한 자료들은 **구성 계획**, **텍스트 렌더링**, **멀티모달 추론**을 통한 **사실적 정확성**을 요구하며, 이 분야에 대한 체계적인 탐구가 부족하다는 문제를 인식했습니다. 연구의 궁극적인 목표는 **구조화된 시각 자료**를 위한 통합 **멀티모달 기반 모델**의 발전을 촉진하는 것입니다.

## 핵심 방법론
연구팀은 실행 가능한 드로잉 프로그램과 **Chain-of-Thought (CoT) 추론 주석**을 활용하여 **130만 개**의 고품질 **구조화된 이미지 쌍 데이터셋**을 구축했습니다. **VLM**과 **FLUX.1 Kontext**를 **경량 MLP 커넥터**로 통합한 **통합 모델**을 훈련시켰으며, **3단계 훈련 커리큘럼**을 통해 **특징 정렬**, **지식 주입**, **추론 증강 생성**을 점진적으로 달성했습니다. 또한, **1,700개** 이상의 challenging 인스턴스를 포함하는 **StructBench 벤치마크**와 **다중 라운드 Q&A 프로토콜**을 사용하는 평가 지표인 **StructScore**를 개발하여 미세한 **사실적 정확성**을 평가합니다.

## 주요 결과
**15개 모델**에 대한 광범위한 평가 결과, **선도적인 폐쇄형 시스템**조차 **구조화된 시각 자료** 처리에서 만족스러운 성능을 내지 못했습니다. 제안된 모델은 **강력한 편집 성능**을 달성했으며, **추론 시 외부 추론기**를 활용함으로써 **다양한 아키텍처**에서 **일관된 성능 향상**을 보였습니다. 특히, **StructScore**는 **인간 선호도**와 **강한 상관관계 (r > 0.9)**를 보이며, 기존 **PSNR** 및 **SSIM** 같은 픽셀 기반 메트릭보다 **의미론적 정확성**을 더 잘 포착함을 입증했습니다.

## AI 실무자를 위한 시사점
**구조화된 시각 자료**의 생성 및 편집은 **자연 이미지**와 근본적으로 다른 요구사항을 가지며, 현재 **생성형 AI 모델**들이 이 분야에서 아직 초기 단계임을 보여줍니다. 본 연구에서 구축된 **코드-정렬 데이터셋**과 **CoT 추론**을 통합한 훈련 방법론은 **사실적 정확성**이 중요한 AI 애플리케이션 개발에 새로운 방향을 제시합니다. **StructBench 벤치마크**와 **StructScore**는 향후 **구조화된 시각 자료**를 다루는 **생성형 AI 모델**의 성능을 정밀하게 평가하고 비교하는 데 있어 필수적인 도구가 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.