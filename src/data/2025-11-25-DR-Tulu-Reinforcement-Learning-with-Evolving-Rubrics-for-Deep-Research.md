---
title: "[논문리뷰] DR Tulu: Reinforcement Learning with Evolving Rubrics for Deep Research"
excerpt: "이 [arXiv]에 게시한 'DR Tulu: Reinforcement Learning with Evolving Rubrics for Deep Research' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Evolving Rubrics
  - Deep Research
  - LLM Agents
  - Tool Use
  - Long-form QA
  - Open-source AI
  - Dynamic Evaluation

permalink: /ai/review/2025-11-25-DR-Tulu-Reinforcement-Learning-with-Evolving-Rubrics-for-Deep-Research/

toc: true
toc_sticky: true

date: 2025-11-25 00:00:00+0900+0900
last_modified_at: 2025-11-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.19399)

**저자:** Rulin Shao, Akari Asai, Shannon Zejiang Shen, et al.



## 핵심 연구 목표
이 논문의 핵심 목표는 기존 개방형 심층 연구 모델들이 짧은 형식의 질문 답변(QA)에 초점을 맞춰 실제 장문형 심층 연구 작업에 적용하기 어렵다는 한계를 극복하는 것입니다. 특히, 모호한 평가 기준과 동적인 세계 지식의 필요성으로 인해 장문형 응답을 평가하기 어려운 문제를 해결하고, 개방형 장문 심층 연구를 위해 직접 훈련된 최초의 개방형 모델을 개발하는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 **RLER (Reinforcement Learning with Evolving Rubrics)** 이라는 새로운 방법론을 제안합니다. 이는 훈련 중 정책 모델과 함께 평가 기준(rubrics)을 구성하고 동적으로 발전시켜, 모델이 새롭게 탐색한 정보를 반영하고 온-정책(on-policy) 피드백을 제공하도록 합니다. 훈련은 먼저 교사 모델(GPT-5)이 생성한 장문형 추론 궤적 데이터로 **SFT (Supervised Fine-Tuning)** 를 수행하여 초기 도구 사용 및 인용 능력을 학습시킨 후, **GRPO** 알고리즘과 **RLER** 를 이용한 온라인 강화 학습으로 세부적인 검색 및 추론 전략을 개선합니다. 특히, **GPT-4.1** 기반의 rubric 생성 모델은 모델의 롤아웃을 대조하여 긍정적/부정적 측면을 학습하고, **dr-agent-lib** 인프라를 통해 **google_search** , **web_browse** , **paper_search** 등 다양한 검색 도구를 유연하게 활용합니다.

## 주요 결과
**DR Tulu-8B** 는 4가지 장문형 심층 연구 벤치마크(ScholarQA-CSv2, HealthBench, ResearchQA, DeepResearchBench)에서 기존 개방형 모델들을 평균 **2.8~40.3%p** 압도적으로 능가했으며, 심지어 독점적인 심층 연구 시스템과도 동등하거나 그 이상의 성능을 보였습니다. 특히, ScholarQA-CSv2에서 OpenAI Deep Research가 쿼리당 **USD 1.8** 인 반면, **DR Tulu-8B** 는 **USD 0.0019** 로 거의 **3배 이상** 비용 효율적입니다. 또한, **RLER** 는 SQAv2에서 인용 정확도 **+23.3%p** , 리콜 **+22.1%p** 를 포함해 심층 연구 응답의 내용 및 속성 측면에서 큰 개선을 가져왔습니다.

## AI 실무자를 위한 시사점
**DR Tulu** 는 작은 규모의 **8B** 파라미터 개방형 모델로도 최첨단 심층 연구 성능을 훨씬 저렴한 비용으로 달성할 수 있음을 입증하여, 고급 연구 기능을 더욱 접근 가능하게 합니다. **RLER** 는 복잡하고 불명확한 작업에 대한 적응형 온-정책 피드백을 생성하여 동적 평가의 새로운 패러다임을 제시하며, 이는 단순한 검증 가능한 QA를 넘어선 작업에 중요합니다. 또한, **MCP 기반 dr-agent-lib** 인프라는 비동기식 도구 호출을 지원하여 유연하고 확장 가능한 멀티 도구 연구 에이전트 개발 및 훈련을 위한 기반을 제공합니다. 모든 데이터, 모델, 코드를 공개하여 심층 연구 에이전트 분야의 개방형 연구와 커스터마이징을 촉진합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.