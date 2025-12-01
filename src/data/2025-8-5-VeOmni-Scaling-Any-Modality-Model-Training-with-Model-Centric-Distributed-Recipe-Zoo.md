---
title: "[논문리뷰] VeOmni: Scaling Any Modality Model Training with Model-Centric
  Distributed Recipe Zoo"
excerpt: "Bin Jia이 [arXiv]에 게시한 'VeOmni: Scaling Any Modality Model Training with Model-Centric
  Distributed Recipe Zoo' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Omni-modal LLMs
  - Distributed Training
  - Model-centric
  - Parallelism
  - FSDP
  - Sequence Parallelism
  - Expert Parallelism
  - Mixture-of-Experts

permalink: /ai/review/2025-8-5-VeOmni-Scaling-Any-Modality-Model-Training-with-Model-Centric-Distributed-Recipe-Zoo/

toc: true
toc_sticky: true

date: 2025-08-05 11:40:52+0900
last_modified_at: 2025-08-05 11:40:52+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.02317)

VeOmni: Scaling Any Modality Model Training with Model-Centric Distributed Recipe Zoo
**저자:** Qianli Ma, Yaowei Zheng, Zhelun Shi, Zhongkai Zhao, Bin Jia, Ziyue Huang, Zhiqi Lin, Youjie Li, Jiacheng Yang, Yanghua Peng, Zhi Zhang, Xin Liu



## 핵심 연구 목표
본 논문은 다양한 모달리티를 처리하는 복잡하고 이질적인 아키텍처 때문에 확장성이 부족하고 엔지니어링 오버헤드가 큰 옴니모달 LLM(Large Language Models) 훈련의 어려움을 해결하는 것을 목표로 합니다. 특히, 모델 정의와 병렬 로직이 긴밀하게 얽혀 있어 확장성과 범용성이 제한되는 기존 프레임워크의 한계를 극복하고자 합니다.

## 핵심 방법론
VeOmni는 통신과 계산을 분리하는 **모델 중심의 분산 레시피** 를 도입하여 옴니모달 LLM에 대한 효율적인 **3D 병렬 처리** 를 가능하게 합니다. 이는 **FSDP(Fully Sharded Data Parallelism)** , **SP(Sequence Parallelism)** , **EP(Expert Parallelism)** 와 같은 병렬 전략을 유연하게 조합하여 적용할 수 있도록 하며, 모달리티별 인코더/디코더를 쉽게 통합할 수 있는 경량 구성 인터페이스를 제공합니다. 또한, **동적 배치(Dynamic Batching)** , **효율적인 커널(Efficient Kernels)** , **메모리 최적화(Memory Optimization)** , **분산 체크포인트(Distributed Checkpointing)** 등의 시스템 최적화가 적용되었습니다.

## 주요 결과
VeOmni를 사용하여 **30B 파라미터** 를 가진 옴니모달 **MoE(Mixture-of-Experts) 모델** 을 **128개의 GPU** 에서 **2,800 tokens/sec/GPU** 이상의 처리량으로 훈련할 수 있음을 입증했습니다. 또한, **160K 컨텍스트 길이** 까지 확장 가능하며, TorchTitan과 같은 기존 프레임워크 대비 Qwen2-VL 7B 모델에서 최대 **12.5%** 더 높은 처리량과 **12.7%** 더 나은 메모리 효율성을 달성했습니다(FSDP+SP4, 16k sequence length 기준).

## AI 실무자를 위한 시사점
VeOmni는 복잡한 옴니모달 LLM의 개발 및 배포를 위한 **높은 처리량과 확장성** 을 제공하면서도 **개발자 친화적인 추상화** 를 통해 엔지니어링 오버헤드를 최소화합니다. 이는 다양한 모달리티를 통합하는 대규모 AI 모델의 연구 및 상용화를 가속화할 수 있게 하여, AI 시스템 엔지니어가 분산 학습의 복잡성 없이 모델 아키텍처 설계에 집중할 수 있도록 지원합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.