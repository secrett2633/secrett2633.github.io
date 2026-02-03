---
title: "[논문리뷰] Vision-DeepResearch: Incentivizing DeepResearch Capability in Multimodal Large Language Models"
excerpt: "Zhen Fang이 [arXiv]에 게시한 'Vision-DeepResearch: Incentivizing DeepResearch Capability in Multimodal Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Large Language Models
  - Deep Research
  - Agentic AI
  - Tool Use
  - Visual Question Answering
  - Reinforcement Learning
  - Multi-scale Search

permalink: /ai/review/2026-02-03-Vision-DeepResearch-Incentivizing-DeepResearch-Capability-in-Multimodal-Large-Language-Models/

toc: true
toc_sticky: true

date: 2026-02-03 00:00:00+0900+0900
last_modified_at: 2026-02-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.22060)

**저자:** Wenxuan Huang, Yu Zeng, Qiuchen Wang, Zhen Fang, Lin Chen 외



## 핵심 연구 목표
본 논문은 기존 멀티모달 딥 리서치 MLLM들이 겪는 **히트율 문제(검색 엔진의 노이즈와 불안정성)** 및 **제한된 추론 깊이/검색 폭** 문제를 해결하고자 합니다. 특히, 단일 이미지 쿼리나 짧은 텍스트 쿼리로는 복잡한 사실 기반 시각 질문 응답(VQA)에 필요한 증거를 충분히 확보하기 어렵다는 한계를 극복하기 위해 `Vision-DeepResearch`라는 새로운 패러다임을 제시합니다.

## 핵심 방법론
`Vision-DeepResearch`는 **고품질 VQA 인스턴스** 와 **다중 턴 궤적** 을 합성하는 데이터 파이프라인을 구축합니다. 이를 통해 **다중 개체, 다중 스케일 시각 및 텍스트 검색** 기능을 MLLM에 통합합니다. **SFT(지도 미세 조정)** 와 **RL(강화 학습)** 을 활용하여 모델을 훈련하며, 특히 **비동기 롤아웃 아키텍처** 와 **LLM-as-Judge 보상 패러다임** 을 통해 수십 단계의 추론과 수백 번의 엔진 상호작용을 처리하는 **장기 추론 능력** 을 내재화합니다.

## 주요 결과
`Vision-DeepResearch-30B-A3B` 모델은 기존 `Qwen3-VL-30B-A3B-Instruct (Agentic)` 대비 **평균 +16.0%** 향상된 **56.9%** 의 정확도를 달성했습니다. 특히 `VDR (+17.6%)`, `FVQA (+16.5%)`, `MMSearch-Plus (+18.5%)`와 같은 벤치마크에서 큰 폭의 성능 개선을 보였습니다. 제안된 모델은 **6개 벤치마크에서 최첨단(SoTA) 성능** 을 달성하며, 일부 강력한 독점 에이전트 시스템과 경쟁력 있는 결과를 보여주었습니다.

## AI 실무자를 위한 시사점
이 연구는 실제 환경에서 **노이즈가 많은 웹 환경** 에서 **장기적인 추론과 멀티모달 정보 검색** 을 수행할 수 있는 AI 에이전트 개발에 중요한 방향을 제시합니다. **고품질 학습 데이터 합성** 과 **SFT 및 RL 훈련** 을 결합한 방법론은 MLLM의 **도구 사용 능력과 신뢰성을 향상** 시키는 데 활용될 수 있습니다. AI 엔지니어는 이를 통해 더욱 **정확하고 견고한 멀티모달 VQA 시스템** 을 구축할 수 있을 것으로 기대됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.