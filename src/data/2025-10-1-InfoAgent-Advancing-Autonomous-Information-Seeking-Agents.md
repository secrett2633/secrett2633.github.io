---
title: "[논문리뷰] InfoAgent: Advancing Autonomous Information-Seeking Agents"
excerpt: "arXiv에 게시된 'InfoAgent: Advancing Autonomous Information-Seeking Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Information Seeking
  - Reinforcement Learning
  - Data Synthesis
  - Web Search Tools
  - Tool Use
  - Deep Research Agents

permalink: /ai/review/2025-10-1-InfoAgent-Advancing-Autonomous-Information-Seeking-Agents/

toc: true
toc_sticky: true

date: 2025-10-01 14:04:08+0900
last_modified_at: 2025-10-01 14:04:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.25189)

**저자:** Gongrui Zhang, Jialiang Zhu, Ruiqi Yang, Kai Qiu, Miaosen Zhang, Zhirong Wu, Qi Dai, Bei Liu, Chong Luo, Zhengyuan Yang, Linjie Li, Lijuan Wang, Weizhu Chen, Yuan Zhang, Xin Li, Zhaoyi Liu, Xin Geng, Baining Guo



## 핵심 연구 목표
본 논문은 장기적인 정보 탐색 및 심층 추론 능력을 갖춘 **대규모 언어 모델(LLM) 에이전트** 를 구축하는 데 있어 데이터 합성 및 효율적인 인터랙티브 환경 구축의 병목 현상을 해결하는 것을 목표로 합니다. 특히, 에이전트의 능력을 체계적으로 확장하기 위한 **도전적인 질의 생성 방법론** 과 **투명하고 효율적인 검색 인프라** 를 제시하고자 합니다.

## 핵심 방법론
InfoAgent는 **데이터 합성 파이프라인** 을 통해 위키피디아 엔티티를 **하위 트리 샘플링(sub-tree sampling)** 및 **엔티티 퍼지화(entity fuzzification)** 기법을 사용하여 난이도를 높인 다중 엔티티 검색 질문으로 변환합니다. 또한, 상용 검색 도구에 대한 의존도를 없애고 **자체 호스팅 검색 인프라** 를 구축하여 투명성과 효율성을 확보했습니다. 에이전트는 **Qwen3-14B** 를 기반으로 **감독 학습(SFT)** 을 통해 장기적 검색 행동을 학습한 후, **강화 학습(RL)** 을 통해 추론 기반 도구 사용 능력을 정교화하는 2단계 훈련 방식을 적용합니다.

## 주요 결과
InfoAgent는 하위 15B 파라미터 오픈소스 모델 중 최첨단 성능을 달성했습니다. **BrowseComp에서 15.3%** , **BrowseComp-ZH에서 29.2%** , **Xbench-DS에서 40.4%** 의 정확도를 기록하여 WebSailor-72B 및 DeepDive-32B와 같은 기존 오픈소스 심층 연구 에이전트를 능가했습니다. 특히, **SimpleQA 벤치마크에서는 90.4%의 성능** 을 달성하며 대규모 독점 모델과 견줄 만한 경쟁력을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 복잡한 정보 탐색 시나리오에서 **LLM 에이전트의 성능을 향상** 시키기 위한 **데이터 합성 전략** 과 **맞춤형 검색 도구의 중요성** 을 강조합니다. **SFT와 RL을 결합한 훈련 방식** 은 에이전트의 심층 추론 및 도구 활용 능력을 효과적으로 강화할 수 있음을 보여주며, 이는 실제 AI 어플리케이션 개발 시 에이전트 훈련 설계에 중요한 통찰력을 제공합니다. 또한, 자체 검색 인프라 구축은 **상용 API 의존성 감소** 및 **시스템 투명성 확보** 측면에서 실무적 가치가 큽니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.