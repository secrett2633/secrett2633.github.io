---
title: "[논문리뷰] ExpVid: A Benchmark for Experiment Video Understanding & Reasoning"
excerpt: "이 [arXiv]에 게시한 'ExpVid: A Benchmark for Experiment Video Understanding & Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Experiment Video Understanding
  - Multimodal Large Language Models (MLLMs)
  - Scientific Reasoning
  - Benchmark
  - Wet-Lab Experiments
  - Procedural Understanding
  - Fine-grained Perception
  - Video QA

permalink: /ai/review/2025-10-15-ExpVid_A_Benchmark_for_Experiment_Video_Understanding_Reasoning/

toc: true
toc_sticky: true

date: 2025-10-15 13:01:40+0900
last_modified_at: 2025-10-15 13:01:40+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.11606)

**저자:** Yicheng Xu, Yue Wu, Jiashuo Yu, Ziang Yan, Qingsong Zhao, Kai Chen, Yu Qiao, Limin Wang, Tianxiang Jiang, Yinan He, Manabu Okumura, Yi Wang



## 핵심 연구 목표
본 연구의 목표는 실제 과학 실험 영상, 특히 습식 실험 환경에서의 복잡한 절차를 MLLM이 얼마나 잘 이해하는지 체계적으로 평가할 수 있는 벤치마크를 제시하는 것입니다. 기존 벤치마크들이 미세한(fine-grained) 디테일과 장기적인(long-horizon) 실험 과정을 간과하는 한계를 극복하고자 합니다.

## 핵심 방법론
**ExpVid**는 **JoVE (Journal of Visualized Experiments)**의 영상들을 바탕으로 **13개 학문 분야**의 습식 실험 영상들을 큐레이션하여 구성되었습니다. 세 가지 계층적 태스크 레벨(Level-1: **미세 지각**, Level-2: **절차 이해**, Level-3: **과학적 추론**)을 정의하고, **LLM 지원 자동 생성**과 **다학제 박사급 전문가 검증**을 결합한 **시각 중심(vision-centric) 주석 파이프라인**을 통해 태스크별 질문-답변 쌍을 구축했습니다. 평가는 **Top-1 Accuracy**, **Jaccard 유사도**, **Blank-level Accuracy**를 사용하여 **19개 주요 MLLM**을 대상으로 진행했습니다.

## 주요 결과
MLLM들은 거친 인식에서는 우수한 성능을 보였으나, 미세한 디테일 구별, 시간 경과에 따른 상태 변화 추적, 실험 절차와 과학적 결과 연결에서는 어려움을 겪었습니다. 특히 **Level-3 과학적 추론**에서는 독점 모델인 **GPT-5**가 평균 **56.4%**의 높은 점수를 기록하며 최고 성능을 달성했지만, 최고 성능의 오픈 소스 모델인 **Intern-S1**은 **39.6%**로 약 **17% 포인트** 낮은 성능을 보였습니다. 프레임 입력은 일관되게 성능을 향상시켜 **ExpVid**의 시각 중심 설계의 유효성을 입증했습니다.

## AI 실무자를 위한 시사점
현재 MLLM은 실제 실험 환경에서 미세한 인지, 절차 이해, 과학적 추론 능력에 상당한 한계를 가지고 있음을 시사합니다. 신뢰할 수 있는 AI 과학 보조 시스템을 개발하기 위해서는 **견고한 시각적 기반(visual grounding)**과 **구조화된 장기 추론 능력** 개발이 필수적입니다. 이 벤치마크는 MLLM이 과학적 발견의 신뢰할 수 있는 파트너가 되기 위한 진단 도구이자 개발 로드맵을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.