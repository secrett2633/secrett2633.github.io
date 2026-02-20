---
title: "[논문리뷰] LEAML: Label-Efficient Adaptation to Out-of-Distribution Visual Tasks
  for Multimodal Large Language Models"
excerpt: "Yu-Chiang Frank Wang이 arXiv에 게시한 'LEAML: Label-Efficient Adaptation to Out-of-Distribution Visual Tasks
  for Multimodal Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLM
  - OOD Adaptation
  - Label Efficiency
  - VQA
  - Semi-Supervised Learning
  - Neuron Distillation
  - Pseudo Labeling
  - Medical Imaging

permalink: /ai/review/2025-10-6-LEAML-Label-Efficient-Adaptation-to-Out-of-Distribution-Visual-Tasks-for-Multimodal-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-10-06 13:29:11+0900
last_modified_at: 2025-10-06 13:29:11+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.03232)

**저자:** Yu-Chiang Frank Wang, Yu-Yang Sheng, Ci-Siang Lin, cmhungsteve



## 핵심 연구 목표
본 논문은 제한된 레이블 데이터와 풍부한 비레이블 이미지를 활용하여 **Multimodal Large Language Models (MLLMs)** 가 의료 영상이나 기술 콘텐츠와 같은 **Out-of-Distribution (OOD) 특화 도메인** 의 시각 질의응답 (VQA) 태스크에 효율적으로 적응하도록 하는 것을 목표로 합니다. 기존의 완전한 미세 조정 방식이 직면하는 **과적합 문제와 레이블링 비용 문제** 를 해결하고자 합니다.

## 핵심 방법론
제안하는 **LEAML** 프레임워크는 두 단계로 구성됩니다. 첫 번째 단계인 **Pseudo QA Generation** 에서는 소량의 레이블 데이터를 사용하여 **QA Generator** 를 훈련하고, **Qwen2.5-VL-72B** 와 같은 대규모 MLLM에서 생성된 캡션으로 **Caption Distillation** 을 수행합니다. 이때, 경사도 점수를 기반으로 **QA 관련 뉴런** 만 선택적으로 업데이트하는 **Selective Neuron Distillation** 을 적용하여 과적합을 방지하고 비레이블 데이터에 대한 신뢰성 있는 의사(pseudo) QA 쌍을 생성합니다. 두 번째 단계인 **OOD VQA Finetuning** 에서는 **NVILA-Lite-2B** 와 같은 타겟 MLLM을 원본 레이블 데이터와 생성된 의사 QA 쌍으로 미세 조정하여 도메인 적응을 수행합니다.

## 주요 결과
**Kvasir-VQA 데이터셋** 에서 LEAML은 1%의 레이블 데이터만으로 **평균 정확도 76.7%** 를 달성하여 LoRA ( **62.4%** ) 및 Full-Tuning ( **63.1%** ) 대비 크게 향상된 성능을 보였습니다. 특히 어려운 식도염(Esophagitis) 카테고리에서 큰 성능 개선을 이루었습니다. **SPORTU 데이터셋** 에서는 LEAML이 **평균 정확도 63.1%** 를 달성하여 모든 기준선 모델을 능가했으며, 특히 "Hard" 난이도 질문에서 **22.3%** 에서 **46.3%** 로 크게 개선되었습니다. Ablation 연구를 통해 **Selective Neuron Distillation** 이 QA Generator의 성능 향상에 결정적인 역할을 함이 확인되었습니다.

## AI 실무자를 위한 시사점
**LEAML** 은 의료 영상과 같이 **레이블 데이터가 부족하고 비용이 많이 드는 특수 도메인** 에서 **MLLM을 효율적으로 적용** 할 수 있는 실용적인 방법론을 제공합니다. 특히, **의사 레이블링** 과 **선택적 뉴런 증류** 를 결합하여 비레이블 데이터의 가치를 극대화하고, **대규모 MLLM의 지식** 을 효과적으로 활용하는 방법을 제시합니다. 이는 AI 엔지니어들이 새로운 도메인에 MLLM을 배포할 때 **데이터 효율성** 과 **모델 성능** 을 동시에 확보하는 데 중요한 통찰력을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.