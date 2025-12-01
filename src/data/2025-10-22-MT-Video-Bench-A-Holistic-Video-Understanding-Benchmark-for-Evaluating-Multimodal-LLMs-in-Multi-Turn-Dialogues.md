---
title: "[논문리뷰] MT-Video-Bench: A Holistic Video Understanding Benchmark for Evaluating
  Multimodal LLMs in Multi-Turn Dialogues"
excerpt: "이 [arXiv]에 게시한 'MT-Video-Bench: A Holistic Video Understanding Benchmark for Evaluating
  Multimodal LLMs in Multi-Turn Dialogues' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLMs
  - Video Understanding
  - Benchmark
  - Multi-Turn Dialogues
  - Perceptivity
  - Interactivity
  - Evaluation

permalink: /ai/review/2025-10-22-MT-Video-Bench-A-Holistic-Video-Understanding-Benchmark-for-Evaluating-Multimodal-LLMs-in-Multi-Turn-Dialogues/

toc: true
toc_sticky: true

date: 2025-10-22 13:07:20+0900
last_modified_at: 2025-10-22 13:07:20+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.17722)

**저자:** Yaning Pan, Zekun Wang, Qianqian Xie, Yongqian Wen, Yuanxing Zhang, Guohui Zhang, Haoxuan Hu, Zhiyu Pan, Yibing Huang, Zhidong Gan, Yonghong Lin, An Ping, Tianhao Peng, Jiaheng Liu



## 핵심 연구 목표
기존 MLLM 평가 벤치마크가 주로 단일 턴 질의응답과 비디오 내용의 사실적 인지에만 초점을 맞춘 한계를 해결합니다. 본 논문의 핵심 목표는 **MT-Video-Bench** 라는 종합적인 벤치마크를 제시하여, 실제 사용자-AI 상호작용 시나리오에서 **다중 턴, 비디오 기반 대화** 에서 MLLM의 **지각 능력(perceptivity)** 과 **상호작용 능력(interactivity)** 을 평가하는 것입니다.

## 핵심 방법론
**MT-Video-Bench** 는 **Object Reference** , **Memory Recall** , **Content Summary** (지각 능력) 및 **Answer Refusal** , **Topic Shifting** , **Proactive Interaction** (상호작용 능력)의 6가지 핵심 역량을 체계적으로 평가합니다. 이 벤치마크는 다양한 도메인에 걸쳐 **135개 비디오에서 엄선된 987개의 다중 턴 대화** 로 구성됩니다. 데이터 수집은 **Gemini 2.5 Pro** 를 활용한 반자동 대화 및 캡션 생성, **YOLOv11** 을 통한 객체 탐지 후 2단계의 **인간 검증 프로세스** 를 거쳐 이루어졌습니다. 평가는 **Gemini 2.5 Flash** 로 생성된 체크리스트를 기반으로 **정확도(ACC)** 를 측정합니다.

## 주요 결과
**MT-Video-Bench** 는 매우 도전적인 벤치마크로, 최상위 비공개 모델인 **Gemini 2.5 Pro** 조차 **68.45%의 전체 정확도** 를 달성했습니다. 대부분의 오픈소스 MLLM은 50% 미만의 정확도를 보였습니다. 모델 성능은 **인지 관련 작업(예: Object Reference 평균 54.55%)** 에서 더 좋았으나 **상호작용 관련 작업(예: Proactive Interaction 평균 38.60%)** 에서는 상대적으로 낮았습니다. 모든 모델은 단일 씬 작업에 비해 **크로스-씬 설정** 에서 성능이 저조했습니다. **모델 크기 확장** 이 성능 향상에 도움이 되었지만, **InternVL 3.5 시리즈** 의 **'Thinking mode'** 와 같은 **추론 전략** 이 모델 성능에 큰 영향을 미칠 수 있음을 보여주었습니다.

## AI 실무자를 위한 시사점
본 연구는 MLLM의 **다중 턴 비디오 대화 이해 능력** 이 아직 초기 단계이며, 특히 **상호작용 및 크로스-씬 추론 능력** 에 대한 집중적인 연구 개발이 필요함을 시사합니다. 단순한 모델 크기 확장 외에 **'Thinking mode'** 와 같은 **정교한 추론 전략** 이 복잡한 대화 시나리오에서 MLLM의 성능을 획기적으로 향상시킬 수 있는 잠재력을 가짐을 보여줍니다. **MT-Video-Bench** 는 MLLM의 실제 애플리케이션(예: 대화형 스포츠 분석, 지능형 튜터링) 적용 가능성을 높이기 위한 중요한 평가 도구 및 연구 로드맵을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.