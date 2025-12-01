---
title: "[논문리뷰] Omni-AVSR: Towards Unified Multimodal Speech Recognition with Large   Language Models"
excerpt: "이 [arXiv]에 게시한 'Omni-AVSR: Towards Unified Multimodal Speech Recognition with Large   Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Speech Recognition
  - Large Language Models
  - Audio-Visual Speech Recognition
  - LoRA
  - Matryoshka Representation Learning
  - Elastic Inference
  - Parameter-Efficient Adaptation

permalink: /ai/review/2025-11-11-Omni-AVSR-Towards-Unified-Multimodal-Speech-Recognition-with-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-11-11 00:00:00+0900+0900
last_modified_at: 2025-11-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.07253)

**저자:** Umberto Cappellazzo, Xubo Liu, Pingchuan Ma, Stavros Petridis, Maja Pantic



## 핵심 연구 목표
본 논문은 ASR, VSR, AVSR 태스크를 단일 프레임워크 내에서 지원하고 유연한 추론(elastic inference)이 가능한 **통합된 오디오-비주얼 대규모 언어 모델(LLM)** 을 개발하는 것을 목표로 합니다. 기존 LLM 기반 접근법들이 각 태스크를 독립적으로 처리하여 높은 연산 비용과 복잡성을 야기하고 교차-태스크 시너지를 놓치는 한계를 극복하고자 합니다.

## 핵심 방법론
Omni-AVSR은 **사전 훈련된 오디오 및 비디오 인코더** , 투영 레이어, 그리고 **LLaMA 3.2-1B LLM 백본** 으로 구성됩니다. 효율적인 다중-세분화 훈련을 위해 **Matryoshka Representation Learning (MRL)** 패러다임을 채택하여, 훈련 시 각 반복에서 하나의 오디오 및 비디오 압축률을 무작위로 샘플링하여 LLM 포워드/백워드 패스 수를 크게 줄였습니다. LLM 백본 적응을 위해 **LoRA** 기반의 세 가지 전략( **Omni-LoRA-S, Omni-LoRA-T, Omni-LoRA-ST** )을 탐색하여 공유 및 태스크별 전문화의 균형을 맞춥니다.

## 주요 결과
Omni-AVSR은 **LRS2** 및 **LRS3** 벤치마크에서 기존 최첨단 모델들과 유사하거나 더 우수한 **WER** 성능을 달성했습니다. 특히, **Omni-AVSR-ST** 는 **LRS3** 에서 ASR **1.2%** , VSR **26.8%** , AVSR **1.0%** 의 WER을 기록하여, **u-HuBERT** 같은 기존 모델 대비 훨씬 적은 파라미터( **58M vs 325M** )로 경쟁력 있는 성능을 보였습니다. 또한, 단일 모델로 훈련 및 배포 자원 사용량을 크게 줄이고, 음향 노이즈 환경에서도 강건한 성능을 유지했습니다.

## AI 실무자를 위한 시사점
본 연구는 다중 모달 음성 인식 태스크를 단일 LLM으로 통합하는 실행 가능성과 이점을 명확히 보여주어, **운영 비용 절감** 및 **배포 간소화** 에 기여합니다. **Matryoshka** 와 **LoRA** 를 활용한 효율적인 훈련 및 적응 전략은 **자원 제약이 있는 환경** 에서 다중 모달 LLM을 개발하는 데 중요한 인사이트를 제공합니다. 또한, 추론 시 **동적으로 자원을 할당** 할 수 있는 유연성은 다양한 응용 분야에서 실용적인 가치를 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.