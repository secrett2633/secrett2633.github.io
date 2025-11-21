---
title: "[논문리뷰] REVISOR: Beyond Textual Reflection, Towards Multimodal Introspective Reasoning in Long-Form Video Understanding"
excerpt: "Jingyang Chen이 [arXiv]에 게시한 'REVISOR: Beyond Textual Reflection, Towards Multimodal Introspective Reasoning in Long-Form Video Understanding' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Reasoning
  - Long-Form Video Understanding
  - Self-Reflection
  - Reinforcement Learning
  - Tool-Augmented MLLMs
  - Visual Rethinking
  - Video Question Answering
  - Causal Attribution

permalink: /ai/review/2025-11-19-REVISOR_Beyond_Textual_Reflection_Towards_Multimodal_Introspective_Reasoning_in_Long-Form_Video_Understanding/

toc: true
toc_sticky: true

date: 2025-11-19 00:00:00+0900+0900
last_modified_at: 2025-11-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.13026)

**저자:** Jiaze Li, Hao Yin, Wenhui Tan, Jingyang Chen, Boshen Xu, Yuxun Qu, Yijing Chen, Jianzhong Ju, Zhenbo Luo, Jian Luan



## 핵심 연구 목표
본 논문은 기존 **텍스트 기반 자기 성찰(self-reflection) 메커니즘**이 풍부하고 동적인 시각 정보를 처리하는 데 한계가 있어, **장문 비디오 이해(long-form video understanding)** 태스크에서 성능 저하를 겪는 문제를 해결하고자 합니다. 궁극적으로 **멀티모달 대규모 언어 모델(MLLMs)**이 시각적 정보를 통합하여 추론 오류를 수정하고 보다 심층적인 멀티모달 이해를 촉진하는 **인트로스펙티브 멀티모달 추론** 프레임워크를 제안하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 **REVISOR (REflective VIsual Segment Oriented Reasoning)**는 **도구 증강 멀티모달 성찰 메커니즘**을 활용하는 2단계 추론 프레임워크입니다. 1단계 **초기 추론**에서는 MLLM이 예비 추론 경로를 생성하고 추가 조사가 필요한 비디오 세그먼트를 식별합니다. 2단계 **성찰적 추론**에서는 **비주얼 툴박스**를 호출하여 식별된 세그먼트에서 **고밀도 프레임을 재샘플링**하여 `Freview`를 얻고, 이를 MLLM에 제공하여 추론을 정제합니다. 특히, **GRPO 훈련 전략**에 **이중 귀인 분리 보상(Dual Attribution Decoupled Reward, DADR) 메커니즘**을 통합하여, 모델이 최종 답변의 정확성뿐만 아니라 답변 도출에 필요한 비디오 증거를 정확히 식별하도록 유도합니다.

## 주요 결과
**REVISOR** 프레임워크는 추가적인 지도 학습이나 외부 모델 없이도 **MLLMs의 장문 비디오 이해 능력**을 크게 향상시켰습니다. **VideoMME, LongVideoBench, MLVU, LVBench** 벤치마크에서 기본 모델 대비 평균 약 **2%**의 정확도 향상을 달성했습니다. 특히 **VideoMME**에서는 **65.7%**의 성능을 기록하여 기본 모델인 **Qwen2.5-VL-7B**보다 **1.4%** 높았으며, 텍스트 기반 추론 방식인 **Video-R1**보다 **4.3%** 뛰어났습니다. **DADR 메커니즘**의 효과는 `λ2` (인과적 세그먼트 충분성 보상 가중치)를 **0**으로 설정했을 때 **VideoMME** 점수가 **65.7%에서 62.2%**로 하락하는 것으로 확인되었습니다.

## AI 실무자를 위한 시사점
본 연구는 장문 비디오 이해에서 **시각 정보 재평가(visual re-evaluation)**의 중요성을 강조하며, 텍스트 기반 성찰만으로는 한계가 있음을 보여줍니다. **REVISOR**는 복잡하고 동적인 비디오 데이터를 처리하는 **도구 증강 MLLM** 개발에 대한 실용적인 접근법을 제시합니다. 특히 **DADR 메커니즘**은 모델이 관련 시각적 증거를 식별하고 활용하는 능력을 강화하여, 비디오 질의응답 시스템의 **견고성과 해석 가능성**을 높이는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.