---
title: "[논문리뷰] WebExplorer: Explore and Evolve for Training Long-Horizon Web Agents"
excerpt: "Aili Chen이 [arXiv]에 게시한 'WebExplorer: Explore and Evolve for Training Long-Horizon Web Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Web Agents
  - Long-Horizon Reasoning
  - Large Language Models (LLMs)
  - Data Generation
  - Reinforcement Learning (RL)
  - Supervised Fine-tuning (SFT)
  - Web Navigation
  - Information Retrieval

permalink: /ai/review/2025-9-9-WebExplorer-Explore-and-Evolve-for-Training-Long-Horizon-Web-Agents/

toc: true
toc_sticky: true

date: 2025-09-09 13:19:09+0900
last_modified_at: 2025-09-09 13:19:09+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.06501)

**저자:** Junteng Liu, Yunji Li, Chi Zhang, Jingyang Li, Aili Chen, et al.



## 핵심 연구 목표
본 논문은 복잡한 정보 탐색과 다단계 웹 탐색을 요구하는 **장기 웹 에이전트**를 훈련하기 위한 핵심 과제인 **고품질 훈련 데이터 부족 문제**를 해결하고자 합니다. 기존 웹 에이전트의 제한적인 정보 탐색 능력과 불투명한 구현의 한계를 극복하고, 모델 기반 탐색 및 질의 진화 기법을 통해 **자연스럽고 유연한 도전적인 웹 탐색 태스크**를 생성하는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 **모델 기반 탐색**과 **반복적인 장기-단기 질의 진화**를 사용하는 체계적인 데이터 생성 접근 방식인 **WebExplorer**를 제안합니다. 초기에는 LLM이 시드 엔티티로부터 정보 공간을 탐색하여 초기 질의-응답 쌍을 생성하고, 이후 **질의 진화 프로세스**를 통해 명시적인 단서를 제거하고 전략적인 모호성을 도입하여 질의의 난이도를 높입니다. 이렇게 생성된 **WebExplorer-QA 데이터셋**을 기반으로 **Qwen3-8B 모델**에 **지도 학습(SFT)** 후 **GRPO 알고리즘**을 통한 **강화 학습(RL)**을 적용하여 **128K 컨텍스트 길이** 및 **최대 100회 툴 호출**을 지원하도록 훈련합니다.

## 주요 결과
**WebExplorer-8B** 모델은 BrowseComp-en/zh, GAIA, WebWalkerQA, FRAMES 등 다양한 정보 탐색 벤치마크에서 해당 규모(8B 파라미터)에서 **최고 수준의 성능**을 달성했습니다. 특히, **BrowseComp-en에서 15.7%**, **BrowseComp-zh에서 32.0%**의 정확도를 기록하며 **WebSailor-72B**와 같은 훨씬 큰 모델들을 능가했습니다. RL 훈련을 통해 평균 툴 호출 횟수가 11회에서 **16회 이상**으로 증가하여 정교한 다단계 추론 전략 학습을 검증했으며, **HLE 벤치마크**에서 **17.3%**를 달성하여 강력한 일반화 능력을 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 **고품질 합성 데이터**가 **경량 LLM**이 대규모 모델을 능가하는 성능을 달성하는 데 핵심적인 역할을 할 수 있음을 보여줍니다. AI 실무자들은 **WebExplorer의 데이터 생성 방법론**을 활용하여 특정 도메인의 복잡한 웹 탐색 데이터를 효율적으로 구축하고, 이를 통해 **비용 효율적인 웹 에이전트**를 개발할 수 있습니다. 특히, **128K 컨텍스트 길이** 및 **100회 툴 호출** 지원은 실제 복잡한 웹 환경에서의 **장기 추론 및 문제 해결 능력**을 요구하는 애플리케이션에 직접적으로 적용될 수 있는 중요한 발전입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.