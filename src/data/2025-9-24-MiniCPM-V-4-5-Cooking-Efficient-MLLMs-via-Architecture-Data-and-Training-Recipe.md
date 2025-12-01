---
title: "[논문리뷰] MiniCPM-V 4.5: Cooking Efficient MLLMs via Architecture, Data, and
  Training Recipe"
excerpt: "Wenshuo Ma이 [arXiv]에 게시한 'MiniCPM-V 4.5: Cooking Efficient MLLMs via Architecture, Data, and
  Training Recipe' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - MLLM Efficiency
  - Multimodal Transformer
  - 3D-Resampler
  - Document AI
  - Hybrid Reinforcement Learning
  - Video Understanding
  - Efficient Inference

permalink: /ai/review/2025-9-24-MiniCPM-V-4-5-Cooking-Efficient-MLLMs-via-Architecture-Data-and-Training-Recipe/

toc: true
toc_sticky: true

date: 2025-09-24 13:14:19+0900
last_modified_at: 2025-09-24 13:14:19+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.18154)

**저자:** Tianyu Yu, Zefan Wang, Chongyi Wang, Fuwei Huang, Wenshuo Ma, et al.



## 핵심 연구 목표
본 논문은 급속히 발전하는 Multimodal Large Language Models (MLLMs)의 고질적인 훈련 및 추론 효율성 문제를 해결하는 것을 목표로 합니다. 특히, 시각 토큰 수 증가로 인한 연산 오버헤드, 문서 지식 학습의 데이터 엔지니어링 복잡성, 그리고 강화 학습 기반 추론 모델의 과도한 응답 길이라는 세 가지 주요 병목 현상에 집중하여, **MiniCPM-V 4.5** 를 통해 고성능과 고효율을 동시에 달성하고자 합니다.

## 핵심 방법론
연구진은 세 가지 핵심 개선 사항을 제시합니다. 첫째, 이미지와 비디오를 고도로 압축 인코딩하는 **Unified 3D-Resampler** 아키텍처를 도입하여 비디오 토큰 비용을 12~24배 절감합니다. 둘째, 문서 이미지에서 직접 지식과 텍스트 인식을 학습하는 **통합 학습 패러다임** 을 제안하며, 동적 시각 손상 기법으로 외부 파서 의존성을 제거하고 OCR 및 맥락 기반 추론을 통합합니다. 셋째, 효율적인 짧은 추론 모드와 복잡한 긴 추론 모드를 모두 지원하는 **하이브리드 강화 학습(RL) 전략** 을 통해 훈련 및 추론 효율성을 향상시킵니다.

## 주요 결과
**MiniCPM-V 4.5** 는 **OpenCompass** 종합 평가에서 **GPT-4o-latest** 및 **Qwen2.5-VL 72B** 와 같은 대형 모델들을 능가하는 **77.0+** 의 뛰어난 성능을 보였습니다. 특히, **VideoMME** 벤치마크에서는 30B 미만 모델 중 최고 성능을 달성하면서 **Qwen2.5-VL 7B** 대비 **46.7%의 GPU 메모리** 와 **8.7%의 추론 시간** 만을 사용하며 독보적인 효율성을 입증했습니다. 이는 **3D-Resampler** 의 효율성과 하이브리드 RL 전략의 효과를 명확히 보여줍니다.

## AI 실무자를 위한 시사점
**MiniCPM-V 4.5** 는 MLLM의 효율성 병목 현상 해결을 위한 실용적인 "레시피"를 제공합니다. **Unified 3D-Resampler** 는 고해상도 이미지 및 비디오 처리를 위한 GPU 메모리 및 추론 시간 절감에 크게 기여하여 MLLM의 접근성과 확장성을 높일 수 있습니다. 또한, 문서 지식 및 OCR의 **통합 학습 패러다임** 은 데이터 전처리 복잡성을 줄이고 모델의 견고성을 향상시키며, **하이브리드 RL 전략** 은 다양한 추론 요구사항에 유연하게 대응할 수 있는 모델 개발 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.