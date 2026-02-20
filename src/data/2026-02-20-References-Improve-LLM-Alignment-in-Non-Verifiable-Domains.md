---
title: "[논문리뷰] References Improve LLM Alignment in Non-Verifiable Domains"
excerpt: "[arXiv]에 게시된 'References Improve LLM Alignment in Non-Verifiable Domains' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Alignment
  - Reference-Guided Evaluation
  - Self-Improvement
  - Non-Verifiable Domains
  - Reinforcement Learning from Human Feedback (RLHF)
  - Direct Preference Optimization (DPO)

permalink: /ai/review/2026-02-20-References-Improve-LLM-Alignment-in-Non-Verifiable-Domains/

toc: true
toc_sticky: true

date: 2026-02-20 00:00:00+0900+0900
last_modified_at: 2026-02-20 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.16802)

**저자:** Kejian Shi, Yixin Liu, Peifeng Wang, Alexander R. Fabbri, Shafiq Joty, Arman Cohan



## 핵심 연구 목표
이 논문은 검증 불가능한 도메인(예: LLM 정렬 튜닝)에서 **강화 학습(RL)** 의 적용 한계를 극복하기 위해 레퍼런스(참조 출력)를 활용한 **LLM-as-a-Judge** 평가자가 "소프트 검증기" 역할을 할 수 있는지 탐구합니다. 특히, 외부 인간 또는 AI 감독 없이 LLM이 스스로 정렬 능력을 향상시키는 데 레퍼런스 가이드가 얼마나 효과적인지 입증하는 것을 목표로 합니다.

## 핵심 방법론
연구진은 먼저 레퍼런스를 효과적으로 활용하는 **RefEval** 및 **RefMatch** 와 같은 **타겟팅된 프롬프팅 전략** 을 설계하여 LLM 평가자의 정확도를 향상시켰습니다. 이러한 개선된 평가자를 기반으로, LLM의 자체 개선을 위해 두 단계 훈련 파이프라인을 적용했습니다. 첫째, **DeepSeek-V3** 가 생성한 고품질 레퍼런스 출력에 대한 **지도 미세 튜닝(SFT)** 을 수행하고, 둘째, 레퍼런스 가이드 **LLM-Judge** 가 제공하는 선호도 신호를 사용하여 **직접 선호도 최적화(DPO)** 를 진행했습니다.

## 주요 결과
**RefEval** 은 11개의 오픈소스 LLM 평가자에서 평균 **79.1%** 의 가장 높은 평가 정확도를 달성하여 레퍼런스-프리 기준선인 **LLMBar-Base(72.3%)** 를 크게 능가했습니다. 자체 개선 훈련 결과, **Llama-3-8B-Instruct** 모델은 **AlpacaEval에서 73.1%, Arena-Hard에서 58.7%** 를, **Qwen2.5-7B** 모델은 각각 **70.0%, 74.1%** 를 달성했습니다. 이는 **SFT 증류 대비 AlpacaEval에서 최대 +21.2 포인트, Arena-Hard에서 +17.6 포인트** 의 절대적인 성능 향상을 보였으며, **ArmoRM** 과 같은 강력한 보상 모델 훈련과 유사한 성능을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 고품질 레퍼런스 출력이 **검증 불가능한 AI 도메인** 에서 LLM 정렬의 효과적인 사후 훈련을 가능하게 한다는 것을 보여줍니다. **인간 피드백 없이도 LLM의 자체 개선을 유도** 할 수 있는 실용적인 방법론을 제시하여, **RLHF/RLAIF** 와 **RLVR** 사이의 격차를 줄이고, 대규모 데이터셋과 컴퓨팅 자원이 부족한 환경에서도 LLM의 정렬을 개선할 잠재력을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.