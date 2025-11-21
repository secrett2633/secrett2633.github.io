---
title: "[논문리뷰] MVU-Eval: Towards Multi-Video Understanding Evaluation for Multimodal   LLMs"
excerpt: "이 [arXiv]에 게시한 'MVU-Eval: Towards Multi-Video Understanding Evaluation for Multimodal   LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Large Language Models (MLLMs)
  - Multi-Video Understanding
  - Evaluation Benchmark
  - Video Perception
  - Video Reasoning
  - Sports Analytics
  - Autonomous Driving

permalink: /ai/review/2025-11-11-MVU-Eval_Towards_Multi-Video_Understanding_Evaluation_for_Multimodal_LLMs/

toc: true
toc_sticky: true

date: 2025-11-11 00:00:00+0900+0900
last_modified_at: 2025-11-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.07250)

**저자:** Tianhao Peng, Haochen Wang, Yuanxing Zhang, Zekun Wang, Zili Wang, Gavin Chang, Jian Yang, Shihao Li, Yanghai Wang, Xintao Wang, Houyi Li, Wei Ji, Pengfei Wan, Steven Huang, Zhaoxiang Zhang, Jiaheng Liu



## 핵심 연구 목표
본 연구는 기존 **MLLM** 평가 벤치마크가 단일 비디오 이해에만 초점을 맞추어 실세계의 다중 비디오 시나리오(예: 스포츠 분석, 자율 주행)의 중요성을 간과하는 한계를 해결하고자 합니다. 이를 위해 **MLLM**의 다중 비디오 이해 능력을 종합적으로 평가할 수 있는 최초의 벤치마크인 **MVU-Eval**을 제안합니다.

## 핵심 방법론
**MVU-Eval**은 **4,959개**의 비디오에서 파생된 **1,824개**의 질문-답변 쌍으로 구성되며, **8가지 핵심 역량**을 평가합니다. 핵심 역량은 **객체 인식(OR), 공간 이해(SU), 카운팅, 비교**와 같은 기본 인지 작업과 **지식 집약적 추론(KIR), In-Context Learning (ICL), 검색 증강 생성(RAG), 시간 추론(TR)**과 같은 고차원 추론 작업으로 분류됩니다. 데이터는 자동 생성과 철저한 **인간 검증**을 통해 수집되었으며, **제로샷(zero-shot) 설정**에서 **정확도**를 평가 척도로 사용합니다.

## 주요 결과
**MLLM**의 다중 비디오 이해 능력은 여전히 개선의 여지가 많으며, 최고 성능의 **Gemini 2.5 Pro**도 **MVU-Eval**에서 **56.6%**의 정확도에 그쳤습니다. 모델별로 하위 작업 성능의 불균형이 나타나, 예를 들어 **Qwen2.5-VL-72B**는 **OR, SU**에서 높은 성능을 보였고 **Gemini 1.5 Pro**는 **카운팅**에서 우수했습니다. 모델 규모 확장(예: **Qwen2.5-VL** 및 **InternVL 시리즈**)은 일반적으로 성능 향상으로 이어지며, **VideoLLaMA3-7B**와 같이 더 많은 프레임과 높은 해상도를 지원할수록 성능이 크게 향상되었습니다.

## AI 실무자를 위한 시사점
**MVU-Eval**은 **MLLM**이 복잡한 다중 비디오 환경에서 아직 많은 한계를 가지고 있음을 보여줍니다. **AI 실무자**는 이 벤치마크를 활용하여 **MLLM**의 **다중 비디오 처리 및 추론 능력**을 개선하기 위한 아키텍처 및 훈련 전략 개발에 집중할 수 있습니다. 특히, **다중 비디오 시각적 정렬, 비동기적 시간 추론, 확장 가능한 멀티모달 퓨전 전략** 등은 향후 연구 및 개발에서 중요한 방향이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.