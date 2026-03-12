---
title: "[논문리뷰] CodePercept: Code-Grounded Visual STEM Perception for MLLMs"
excerpt: "arXiv에 게시된 'CodePercept: Code-Grounded Visual STEM Perception for MLLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Large Language Models (MLLMs)
  - STEM Visual Reasoning
  - Code-Grounded Perception
  - Image-to-Code Translation
  - Data Generation
  - Benchmark
  - Reinforcement Learning
  - Matplotlib

permalink: /ai/review/2026-03-12-CodePercept-Code-Grounded-Visual-STEM-Perception-for-MLLMs/

toc: true
toc_sticky: true

date: 2026-03-12 00:00:00+0900+0900
last_modified_at: 2026-03-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.10757)

**저자:** Tongkun Guan, Zhibo Yang, Jianqiang Wan, Mingkun Yang, Zhengtao Guo, Zijian Hu, Ruilin Luo, Ruize Chen, Songtao Jiang, Peng Wang, Wei Shen, Junyang Lin, Xiaokang Yang



## 핵심 연구 목표
이 논문은 **MLLMs** 가 **STEM** (과학, 기술, 공학, 수학) 분야에서 시각적 추론에 실패하는 근본적인 원인이 인지 능력 부족인지 추론 능력 부족인지를 규명하는 데서 출발합니다. 연구의 핵심 목표는 **MLLMs** 의 시각적 인지 능력을 체계적으로 향상시키기 위해 실행 가능한 코드를 강력한 인지 매체로 확립하는 것입니다. 이는 기존 자연어 설명의 환각 및 모호성 문제를 해결하고자 합니다.

## 핵심 방법론
연구팀은 **ICC-1M** 이라는 100만 개 이상의 이미지-캡션-코드 삼중항 데이터셋을 구축했습니다. 이는 (1) 실행 가능한 코드를 이미지 캡션의 Ground Truth로 활용하여 기존 지식 증류 방식의 환각을 제거하는 **Code-Grounded Caption Generation** 과 (2) 모델이 재구성 코드를 생성하도록 직접 훈련하여 자연어의 모호성을 완화하는 **STEM Image-to-Code Translation** 의 두 가지 코드 기반 접근 방식을 통해 이루어졌습니다. 또한, STEM 분야의 시각적 지각 능력을 직접 평가하는 새로운 벤치마크인 **STEM2Code-Eval** 을 도입하여 코드 생성을 통한 결정론적이고 검증 가능한 평가를 가능하게 했습니다. 모델 훈련에는 **Qwen3-VL** 아키텍처를 기반으로 **감독 미세 조정(SFT)** 과 **강화 학습(RL)** 이 활용되었습니다.

## 주요 결과
체계적인 스케일링 분석을 통해 인지 능력 확장이 추론 능력 확장보다 일관되게 더 큰 성능 향상을 가져와 인지 능력이 현재 **STEM** 시각 추론의 진정한 한계 요인임을 밝혀냈습니다. **STEM2Code-Eval** 벤치마크에서 **CodePercept-S1** 모델은 **Qwen3-VL-4B-Instruct** 대비 **2.8%** (4B 모델) 및 **3%** (8B 모델)의 성능 향상을 보였으며, 강화 학습을 적용한 **CodePercept-R1** 모델은 코드 생성 정확도 및 실행 가능성에서 추가 개선을 이루어 **Seed1.6-Vision** 및 **Qwen3-VL-Plus** 같은 대규모 모델보다 **2.29-2.97%** 및 **4.41-5.09%** 더 높은 성능을 기록했습니다.

## AI 실무자를 위한 시사점
이 연구는 **MLLMs** 의 **STEM** 시각 인지 능력 향상에 있어 실행 가능한 코드가 핵심적인 역할을 할 수 있음을 명확히 보여줍니다. AI 엔지니어와 데이터 사이언티스트는 복잡한 STEM 시각 자료의 경우 자연어 캡션이 아닌 **정확하고 모호함 없는 코드 기반 데이터** 를 활용하여 모델의 근본적인 인지 능력을 강화하는 데 집중할 수 있습니다. **STEM2Code-Eval** 과 같은 코드 생성 기반 벤치마크는 단순한 문제 해결 정확도를 넘어선 **객관적이고 검증 가능한 시각적 이해도 평가** 를 위한 새로운 표준을 제시하며, 향후 MLLM 훈련 및 평가 패러다임에 중요한 영향을 미칠 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.