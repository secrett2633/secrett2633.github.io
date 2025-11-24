---
title: "[논문리뷰] MathReal: We Keep It Real! A Real Scene Benchmark for Evaluating Math
  Reasoning in Multimodal Large Language Models"
excerpt: "Zhihan Zhou이 [arXiv]에 게시한 'MathReal: We Keep It Real! A Real Scene Benchmark for Evaluating Math
  Reasoning in Multimodal Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Large Language Models (MLLMs)
  - Math Reasoning
  - Real-World Benchmark
  - Visual Perception
  - Robustness
  - K-12 Education
  - Dataset

permalink: /ai/review/2025-8-14-MathReal-We-Keep-It-Real-A-Real-Scene-Benchmark-for-Evaluating-Math-Reasoning-in-Multimodal-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-08-14 13:19:02+0900
last_modified_at: 2025-08-14 13:19:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.06009)

**저자:** Jun Feng, Zixin Wang, Zhentao Zhang, Yue Guo, Zhihan Zhou, Xiuyi Chen, Zhenyang Li, Dawei Yin



## 핵심 연구 목표
기존 MLLM 수학 추론 벤치마크들이 대부분 깨끗하거나 전처리된 이미지를 사용하는 한계를 극복하고자 합니다. 실제 K-12 교육 환경에서 모바일 기기로 촬영된 노이즈가 많은 이미지 기반 수학 문제에 대한 MLLM의 추론 능력을 평가하는 새로운 벤치마크, **MATHREAL**을 구축하여 모델의 실제 적용 가능성 격차를 해소하는 것을 목표로 합니다.

## 핵심 방법론
**MATHREAL**은 실제 시나리오에서 촬영된 **2,000개**의 K-12 수학 문제 이미지로 구성됩니다. 이미지 품질 저하, 원근 변형, 불필요한 내용 간섭 등 **14가지 세부 하위 범주**를 포함한 시각적 노이즈 유형을 체계적으로 분류하고 각 문제에 대해 정확한 질문 텍스트와 시각적 요소 설명을 수동으로 주석 처리했습니다. **40개의 MLLM**을 **6가지 실험 설정**에서 평가하여 시각적 인식과 추론 능력을 종합적으로 분석했습니다.

## 주요 결과
**MATHREAL** 벤치마크에서 최상위 모델인 **Doubao-1.5-thinking-vision-pro**가 단지 **53.9%**의 **Acc (loose accuracy)**를 기록하며, 기존 벤치마크에서 보고된 높은 성능과 현저한 차이를 보였습니다. 실제 시나리오의 시각적 노이즈(흐림, 회전, 손글씨 답변)가 MLLM의 추론 성능을 크게 저해하는 것으로 나타났습니다. 특히, 추론 오류와 시각적 인식 오류가 실패 원인의 **40-50%**를 차지했습니다.

## AI 실무자를 위한 시사점
현재 MLLM이 실제 교육 환경과 같은 노이즈가 많은 시각적 입력에 대해 충분히 견고하지 않음을 시사합니다. 따라서, AI 실무자들은 **강력한 시각적 인코더**와 불완전한 조건에서도 **다단계 추론**을 안정적으로 수행할 수 있는 모델 개발에 집중해야 합니다. 또한, 입력 데이터의 **전처리(노이즈 제거)**가 모델 성능 향상에 큰 영향을 미칠 수 있음을 확인했습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.