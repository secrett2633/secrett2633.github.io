---
title: "[논문리뷰] MARS2 2025 Challenge on Multimodal Reasoning: Datasets, Methods,
  Results, Discussion, and Outlook"
excerpt: "Bowen Zhou이 arXiv에 게시한 'MARS2 2025 Challenge on Multimodal Reasoning: Datasets, Methods,
  Results, Discussion, and Outlook' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Reasoning
  - Large Language Models (LLMs)
  - Multimodal Large Language Models (MLLMs)
  - Visual Grounding
  - Visual Question Answering
  - Advertisement Video Analysis
  - Real-world Scenarios
  - Challenge Benchmark

permalink: /ai/review/2025-9-18-MARS2-2025-Challenge-on-Multimodal-Reasoning-Datasets-Methods-Results-Discussion-and-Outlook/

toc: true
toc_sticky: true

date: 2025-09-18 13:07:00+0900
last_modified_at: 2025-09-18 13:07:00+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.14142)

**저자:** Peng Xu, Shengwu Xiong, Jiajun Zhang, Yaxiong Chen, Bowen Zhou



## 핵심 연구 목표
논문은 **MARS2 2025 Challenge** 를 통해 멀티모달 기계 학습 및 LLM 분야의 발전을 촉진하는 것을 목표로 합니다. 특히, 기존 벤치마크의 한계를 넘어 실제 세계 시나리오와 도메인 특화된 복잡한 멀티모달 추론 태스크를 다루어 **MLLM의 적용 범위를 확장** 하고 **System 2 사고** 와 유사한 느린 추론 능력을 평가하는 데 중점을 둡니다.

## 핵심 방법론
연구팀은 **Lens** [142]와 **AdsQA** [84]라는 두 가지 대규모 맞춤형 데이터셋을 구축하여 각각 12가지 일상 시나리오에서의 일반 추론과 광고 영상에서의 도메인 특화 추론을 지원합니다. **Visual Grounding in Real-world Scenarios (VG-RS)** , **Visual Question Answering with Spatial Awareness (VQA-SA)** , **Visual Reasoning in Creative Advertisement Videos (VR-Ads)** 세 가지 경쟁 트랙을 운영하며, **Qwen2.5-VL** [8], **InternVL3** [168] 등 40개 이상의 베이스라인 모델을 포함하여 참가자들의 솔루션을 종합적으로 벤치마킹했습니다.

## 주요 결과
**VG-RS 트랙** 에서 우승 솔루션은 **0.6670 Accuracy@0.5** 를 달성했으며, **VQA-SA 트랙** 에서는 최고 성능이 **79.03%** 를 기록했습니다. **VR-Ads 트랙** 에서는 인간 성능(약 70%)에 비해 여전히 간극이 큰 **56.35%** 의 정확도를 보였습니다. 이 결과는 복잡한 시나리오와 도메인 특화 추론에서 **최첨단 MLLM조차 여전히 상당한 도전 과제** 에 직면하고 있음을 보여줍니다.

## AI 실무자를 위한 시사점
이 챌린지는 **MLLM의 실제 적용성 및 강점과 약점** 을 명확히 보여줍니다. 특히, **데이터 증강** , **프롬프트 엔지니어링** , **강화 학습** 을 통한 모델 정렬 및 **일반 모델과 전문 모델의 협업** 이 복잡한 멀티모달 추론 태스크에 효과적임을 시사합니다. 하지만, **미세한 이미지 이해** 와 **공통 감각 부족** 으로 인한 추론 오류는 여전히 해결해야 할 과제로 남아있으며, 향후 연구는 이러한 한계를 극복하는 데 집중해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.