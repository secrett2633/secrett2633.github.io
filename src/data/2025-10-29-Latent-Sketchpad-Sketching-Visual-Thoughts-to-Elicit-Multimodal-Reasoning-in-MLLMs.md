---
title: "[논문리뷰] Latent Sketchpad: Sketching Visual Thoughts to Elicit Multimodal
  Reasoning in MLLMs"
excerpt: "이 [arXiv]에 게시한 'Latent Sketchpad: Sketching Visual Thoughts to Elicit Multimodal
  Reasoning in MLLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLMs
  - Visual Reasoning
  - Latent Space
  - Sketch Generation
  - Visual Thinking
  - Autoregressive Generation
  - Interpretability

permalink: /ai/review/2025-10-29-Latent-Sketchpad-Sketching-Visual-Thoughts-to-Elicit-Multimodal-Reasoning-in-MLLMs/

toc: true
toc_sticky: true

date: 2025-10-29 13:11:02+0900
last_modified_at: 2025-10-29 13:11:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.24514)

**저자:** Huanyu Zhang, Wenshan Wu, Chengzu Li, Ning Shang, Yan Xia, Yangyu Huang, Yifan Zhang, Li Dong, Zhang Zhang, Liang Wang, Tieniu Tan, Furu Wei



## 핵심 연구 목표
Multimodal Large Language Models (MLLMs)가 복잡한 시각적 계획과 상상력을 요구하는 시나리오에서 겪는 어려움을 해결하고, MLLM에 **내부 시각적 스크래치패드(visual scratchpad)** 를 부여하여 **시각적 사고(visual thought)** 를 통해 멀티모달 추론 능력을 향상시키는 것을 목표로 합니다. 기존 MLLM의 잠재 시각적 표현을 추론 과정에 직접 통합하는 방법을 탐색합니다.

## 핵심 방법론
논문은 **Latent Sketchpad** 라는 프레임워크를 제안하며, 이는 MLLM의 오토회귀(autoregressive) 생성 과정에 시각적 추론을 통합합니다. 이를 위해 **Context-Aware Vision Head** 를 도입하여 MLLM의 히든 상태와 이전 시각적 표현을 바탕으로 컨텍스트를 인지하는 시각적 잠재 벡터(visual latents)를 생성합니다. 또한, 생성된 잠재 벡터를 사람에게 해석 가능한 스케치 이미지로 변환하기 위해 **Pretrained Sketch Decoder** 를 사용합니다.

## 주요 결과
**MAZEPLANNING** 데이터셋에 대한 평가에서, **Latent Sketchpad** 는 백본 MLLM(예: **Gemma3** , **Qwen2.5-VL** )의 추론 성능을 유지하거나 심지어 능가하는 결과를 보였습니다. 특히 **GPT-4o** 에 통합되었을 때, **평균 성공률(Success Rate)에서 3.80%** , **평균 진행률(Progress Rate)에서 9.06%** 의 상당한 개선을 달성하여 텍스트 전용 추론의 한계를 보완했습니다. **Pretrained Sketch Decoder** 는 다양한 비전 인코더에 걸쳐 높은 **SSIM 스코어** 를 기록하며 강력한 일반화 능력을 입증했습니다.

## AI 실무자를 위한 시사점
**Latent Sketchpad** 는 MLLM의 **내부 추론 과정** 에 시각적 요소를 통합하여 복잡한 공간 추론 및 계획과 같은 태스크에서 성능 향상을 가져올 수 있음을 보여줍니다. 이 프레임워크는 기존 MLLM에 **플러그 앤 플레이(plug-and-play)** 방식으로 적용 가능하여, **해석 가능한 시각적 트레이스** 를 제공함으로써 AI 시스템의 투명성을 높입니다. 이는 AI 엔지니어들이 시각적 사고 능력이 필요한 응용 분야에서 MLLM의 활용 가능성을 확장하는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.