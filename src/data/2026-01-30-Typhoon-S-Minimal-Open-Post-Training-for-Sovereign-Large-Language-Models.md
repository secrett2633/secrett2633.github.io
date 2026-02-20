---
title: "[논문리뷰] Typhoon-S: Minimal Open Post-Training for Sovereign Large Language Models"
excerpt: "arXiv에 게시된 'Typhoon-S: Minimal Open Post-Training for Sovereign Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Sovereign LLMs
  - Post-Training
  - Instruction Tuning
  - Supervised Fine-tuning
  - On-Policy Distillation
  - Reinforcement Learning
  - Knowledge Injection
  - Thai Language

permalink: /ai/review/2026-01-30-Typhoon-S-Minimal-Open-Post-Training-for-Sovereign-Large-Language-Models/

toc: true
toc_sticky: true

date: 2026-01-30 00:00:00+0900+0900
last_modified_at: 2026-01-30 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.18129)

**저자:** Kunat Pipatanakul, Pittawat Taveekitworachai



## 핵심 연구 목표
본 연구는 제한된 자원과 엄격한 투명성 제약이 있는 환경에서, 지역 또는 국가 기관이 모델 가중치, 훈련 데이터, 배포에 대한 통제력을 유지할 수 있도록 하는 **소버린 대규모 언어 모델(LLM)** 의 **최소한의 공개 포스트 트레이닝 레시피** 를 개발하는 것을 목표로 합니다. 특히, 일반 목적 조수로의 **적응성(Adoptability)** 과 지역 특정 고난도 태스크(예: 태국어 법률 추론)를 수행하는 **소버린 역량(Sovereign Capability)** 을 학술 규모 자원으로 달성하고자 합니다.

## 핵심 방법론
**적응성** 을 위해, **경량 SFT** 와 **온-폴리시 증류(OPD)** 를 결합한 2단계 포스트 트레이닝 프레임워크를 사용합니다. 이 과정에는 오픈소스 영어 데이터와 소량의 타겟 언어(태국어) 데이터가 활용되며, **동적 모델 스와핑, FSDP, VLLM** 을 통해 리소스 효율성을 극대화합니다. **소버린 역량** 강화를 위해, **Injected Knowledge GRPO (InK-GRPO)** 라는 GRPO의 확장 기법을 제안합니다. 이는 **GRPO 손실** 에 별도의 **도메인 내 텍스트 코퍼스** 에 대한 **교차 엔트로피 손실** 을 추가하여 새로운 지식을 주입하며, **Agentic RFT** 설정을 통해 외부 도구를 사용한 다단계 추론 능력을 훈련합니다.

## 주요 결과
**SFT+OPD** 레시피는 **Qwen3 8B Instruct** 모델의 평균 점수를 **+6.49점** 향상시키며, 특히 태국어 코드 스위칭에서 **93.4점** 으로 Top-K 증류 대비 크게 개선된 **강력한 견고성** 을 입증했습니다. 소버린 기반 모델인 **ThaiLLM-8B** 에 적용 시 **Qwen3-8B** 대비 태국어 평균 점수 **71.20 대 66.66** 으로 우수한 성능을 보였습니다. **InK-GRPO** 는 **NitiBench** 에서 GRPO 대비 **19.30% 대 15.82%** 로 일관된 성능 향상을 달성했으며, **Agentic InK-GRPO** 는 **NitiBench 에이전틱 정확도 78.02%** 를 기록하며 **GPT-5+Agent (75.34%)** 를 능가했습니다. 이 모든 결과는 **8B 모델의 적응성 훈련에 8-GPU로 약 2일, 소버린 역량 훈련에 4-GPU로 약 1일** 이라는 학술 규모 자원으로 달성되었습니다.

## AI 실무자를 위한 시사점
이 연구는 제한된 컴퓨팅 자원을 가진 환경에서 **고품질의 소버린 LLM** 을 구축하기 위한 **실용적이고 효율적인 방법론** 을 제시합니다. 특히, **온-폴리시 증류** 와 **InK-GRPO** 를 통한 **지식 주입** 기법은 기존 대규모 모델에 대한 의존도를 줄이고, 지역 특화된 지식과 추론 능력을 효과적으로 강화할 수 있음을 보여줍니다. 이는 AI 개발자가 도메인 특정 지식 주입 및 에이전트 역량 강화 시 **치명적 망각 없이** 일반 능력을 유지할 수 있는 구체적인 가이드라인을 제공하며, **오픈 소스 데이터와 최소한의 포스트 트레이닝** 으로도 경쟁력 있는 모델을 만들 수 있음을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.