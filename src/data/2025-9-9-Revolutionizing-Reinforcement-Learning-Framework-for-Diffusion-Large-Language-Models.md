---
title: "[논문리뷰] Revolutionizing Reinforcement Learning Framework for Diffusion Large
  Language Models"
excerpt: "Ke Shen이 [arXiv]에 게시한 'Revolutionizing Reinforcement Learning Framework for Diffusion Large
  Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Language Models
  - Reinforcement Learning
  - Trajectory-aware RL
  - Value Model
  - Masked Diffusion Models
  - Large Language Models
  - Reasoning Tasks
  - Code Generation

permalink: /ai/review/2025-9-9-Revolutionizing-Reinforcement-Learning-Framework-for-Diffusion-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-09-09 13:19:09+0900
last_modified_at: 2025-09-09 13:19:09+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.06949)

**저자:** Yinjie Wang, Ling Yang, Bowen Li, Ye Tian, Ke Shen, Mengdi Wang



## 핵심 연구 목표
본 논문은 확산 언어 모델(DLMs)의 기존 강화 학습(RL) 프레임워크의 한계를 해결하고자 합니다. 특히, 사후 훈련 목표와 추론 궤적 간의 불일치를 개선하고, 다양한 DLM 아키텍처(full-attention 및 block-attention)에 적용 가능한 통일되고 효율적인 RL 프레임워크를 개발하여 복잡한 수학 및 코딩 추론 태스크에서 성능을 향상시키는 것이 목표입니다.

## 핵심 방법론
저자들은 추론 궤적을 사후 훈련에 명시적으로 통합하는 **TraceRL** 이라는 궤적 인식 강화 학습 프레임워크를 제안합니다. 이 방법론은 훈련 안정성을 높이고 분산을 줄이기 위해 **확산 기반 가치 모델** 을 도입합니다. 또한, **축소 파라미터 `s`** 를 사용하여 인접 단계를 통합함으로써 훈련 효율성을 가속화하고, **full-attention** 및 **block-attention DLMs** 모두에 적용 가능합니다. 복잡한 추론을 위해 **커리큘럼 학습** 과 **long-CoT SFT** 를 결합하여 사용합니다.

## 주요 결과
**TraDo-8B-Instruct** 는 수학 추론 벤치마크에서 **Qwen2.5-7B-Instruct** 대비 **6.1%** , **Llama3.1-8B-Instruct** 대비 **51.3%** 의 상대적 정확도 향상을 달성했습니다. **TraDo-8B-Thinking** 모델은 **MATH500** 에서 **87.4%** 의 정확도를 기록하며 **Qwen2.5-7B-Instruct** 대비 **18.1%** 의 상대적 정확도 향상을 보여주었습니다. 또한, **TraceRL** 최적화는 **MATH500 동적 샘플링에서 15.4%의 속도 향상** 을 가져왔으며, 블록 크기 스케일링을 통해 **MATH500에서 60.2%에서 67.7%** 로 성능이 개선되었습니다.

## AI 실무자를 위한 시사점
**TraceRL** 은 DLM의 추론 성능과 안정성을 크게 향상시키는 효과적인 방법론으로, 특히 복잡한 수학 및 코딩 추론 태스크에서 우수한 성능을 제공합니다. 공개된 오픈소스 프레임워크는 다양한 DLM 아키텍처(full-attention, block-attention)에 대한 빌드, 훈련, 배포를 지원하며, **KV-cache 가속화 기법** 과 여러 **RL/SFT 방법론** 을 통합하여 실무자들이 DLM을 쉽게 활용하고 확장할 수 있도록 돕습니다. 이는 DLM이 AR 모델보다 빠르게 추론하면서도 CoT 추론 능력을 갖출 수 있음을 보여주어, 복잡한 태스크를 효율적으로 처리하는 새로운 LLM 개발 및 응용 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.