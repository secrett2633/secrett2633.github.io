---
title: "[논문리뷰] Unleashing the Potential of Multimodal LLMs for Zero-Shot
  Spatio-Temporal Video Grounding"
excerpt: "Rynson W. H. Lau이 [arXiv]에 게시한 'Unleashing the Potential of Multimodal LLMs for Zero-Shot
  Spatio-Temporal Video Grounding' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Spatio-Temporal Video Grounding
  - Multimodal Large Language Models
  - Zero-Shot Learning
  - Visual Grounding
  - Decomposed Spatio-Temporal Highlighting
  - Logit-Guided Re-attention
  - Temporal-Augmented Assembling

permalink: /ai/review/2025-9-19-Unleashing-the-Potential-of-Multimodal-LLMs-for-Zero-Shot-Spatio-Temporal-Video-Grounding/

toc: true
toc_sticky: true

date: 2025-09-19 13:12:21+0900
last_modified_at: 2025-09-19 13:12:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.15178)

**저자:** Zaiquan Yang, Yuhao Liu, Gerhard Hancke, Rynson W.H. Lau



## 핵심 연구 목표
본 논문은 입력 텍스트 질의를 기반으로 비디오 내에서 대상의 시공간 튜브(spatio-temporal tube)를 찾아내는 **시공간 비디오 그라운딩(STVG)** 태스크에서, **MLLM(Multimodal Large Language Models)**의 잠재력을 활용하여 **제로샷(zero-shot) 해결책**을 제시하는 것을 목표로 합니다. 기존 MLLM의 한계인 복잡한 질의에서 주요 속성/액션 단서를 무시하는 경향과 시공간 일관성 부족 문제를 해결하고자 합니다.

## 핵심 방법론
저자들은 MLLM이 **그라운딩 토큰(grounding tokens)**을 동적으로 할당하는 능력을 활용하고, 이를 기반으로 **분해된 시공간 하이라이팅(DSTH, Decomposed Spatio-Temporal Highlighting)** 및 **시간 증강 어셈블링(TAS, Temporal-Augmented Assembling)** 전략을 제안합니다. DSTH는 텍스트 질의를 **속성(attribute) 및 액션(action) 하위 질의**로 분해하고, **LRA(Logit-guided Re-attention) 모듈**을 통해 학습 가능한 시공간 프롬프트를 최적화하여 MLLM이 시각적 단서에 집중하도록 유도합니다. TAS는 비디오 프레임을 역순으로 처리하여 얻은 예측을 원래 프레임의 예측과 결합함으로써 **시간적 일관성**을 향상시킵니다.

## 주요 결과
제안된 제로샷 프레임워크는 세 가지 일반적인 STVG 벤치마크인 **HCSTVG-v1, HCSTVG-v2, VidSTG**에서 **기존 SOTA 제로샷 방법들을 능가**하는 성능을 보였습니다. 특히, **LLaVA-OneVision-7B 모델**을 기반으로 **HCSTVG-v1**에서 **E3M** 대비 **vIoU@0.3에서 4.2%** (19.1%에서 23.3%)의 상당한 성능 향상을 달성했습니다. DSTH 및 TAS 전략의 각 구성 요소들이 성능 개선에 기여함을 **정량적 분석**을 통해 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 **비용이 많이 드는 어노테이션 없이** MLLM의 강력한 추론 능력을 활용하여 복잡한 STVG 태스크를 해결할 수 있는 **실용적인 제로샷 접근 방식**을 제시합니다. **프롬프트 엔지니어링**을 통해 MLLM의 내부 작동 방식을 제어하여 특정 태스크에 맞게 시각적 주의를 조절하는 방법을 보여주므로, 다양한 시각-언어 태스크에서 **MLLM의 효율적인 활용 방안**을 모색하는 데 중요한 통찰력을 제공합니다. 다만, 긴 비디오 처리 시 발생하는 **높은 계산 비용**은 향후 연구에서 **토큰 가지치기** 또는 **키 프레임 선택 기술** 도입을 통해 개선해야 할 과제로 남아있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.