---
title: "[논문리뷰] LongVideoAgent: Multi-Agent Reasoning with Long Videos"
excerpt: "Renjie Pi이 [arXiv]에 게시한 'LongVideoAgent: Multi-Agent Reasoning with Long Videos' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-Agent System
  - Long Video Understanding
  - Video Question Answering
  - Reinforcement Learning
  - Large Language Models
  - Temporal Grounding
  - Multimodal Reasoning
  - Tool-Augmented AI

permalink: /ai/review/2025-12-24-LongVideoAgent-Multi-Agent-Reasoning-with-Long-Videos/

toc: true
toc_sticky: true

date: 2025-12-24 00:00:00+0900+0900
last_modified_at: 2025-12-24 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.20618)

**저자:** Runtao Liu*, Ziyi Liu, Jiaqi Tang, Yue Ma, Renjie Pi, Jipeng Zhang, Qifeng Chen



## 핵심 연구 목표
본 논문은 기존 MLLM(Multimodal Large Language Models)이 긴 길이의 비디오에서 발생하는 **정보 압축 손실, 제한된 도구 세트, 그리고 미세한 시간적 추론 능력 부족** 문제를 해결하는 것을 목표로 합니다. 특히, 수 시간 분량의 에피소드에서 희소하게 분포된 정보를 효율적이고 정확하게 추출하여 질문에 답할 수 있는 **에이전트 기반의 비디오 이해 프레임워크** 를 구축하고자 합니다.

## 핵심 방법론
본 연구는 **MASTERAGENT (중앙 LLM)** , **GROUNDINGAGENT (시간적 지역화 담당)** , 그리고 **VISIONAGENT (시각 정보 추출 담당)** 로 구성된 **멀티 에이전트 프레임워크** 를 제안합니다. MASTERAGENT는 질문에 관련된 비디오 세그먼트를 **GROUNDINGAGENT** 를 통해 찾아내고, 이 세그먼트에서 **VISIONAGENT** 를 활용해 객체, 얼굴, 행동, OCR 등 세부적인 시각적 관찰을 추출합니다. MASTERAGENT는 **GRPO(Generalized Reinforcement Policy Optimization)** 기반의 **강화 학습** 을 통해 **간결하고 정확하며 효율적인 멀티 에이전트 협력** 을 학습하며, **LongTVQA** 및 **LongTVQA+** 라는 새로운 에피소드 수준의 장편 비디오 QA 데이터셋을 구축하여 평가했습니다.

## 주요 결과
제안된 **LONGVIDEOAGENT** 프레임워크는 **LongTVQA** 및 **LongTVQA+** 데이터셋에서 강력한 비에이전트(non-agent) 베이스라인을 **상당한 차이로 능가** 하는 성능을 보였습니다. 특히, **Agentic-Grok 모델** 은 LongTVQA에서 **82.65%(+5.75%)** , LongTVQA+에서 **85.60%(+3.80%)** 의 정확도를 달성했습니다. 멀티 에이전트 아키텍처(grounding + vision)를 도입했을 때 답변 정확도가 텍스트 전용 대비 **64.3%에서 74.8%로 10.5% 향상** 되었으며, 강화 학습은 특히 오픈소스 모델의 추론 및 계획 능력을 더욱 강화했습니다.

## AI 실무자를 위한 시사점
본 연구는 장편 비디오 이해와 같은 복잡한 멀티모달 태스크에서 **단일 LLM의 한계를 극복하기 위한 멀티 에이전트 및 도구 증강 접근 방식** 의 유용성을 입증합니다. **강화 학습** 은 비록 간단한 규칙 기반 보상으로도 LLM 에이전트가 구조화된 다단계 추론과 도구 조정을 효과적으로 수행하도록 훈련할 수 있음을 보여주며, 이는 복잡한 AI 시스템 설계에 중요한 시사점을 제공합니다. **LongTVQA 및 LongTVQA+** 데이터셋은 장편 비디오 추론 시스템 개발 및 평가를 위한 견고한 벤치마크 역할을 할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.