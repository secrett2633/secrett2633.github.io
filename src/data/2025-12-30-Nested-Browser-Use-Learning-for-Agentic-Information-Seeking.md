---
title: "[논문리뷰] Nested Browser-Use Learning for Agentic Information Seeking"
excerpt: "이 [arXiv]에 게시한 'Nested Browser-Use Learning for Agentic Information Seeking' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic Information Seeking
  - LLM Agents
  - Browser Automation
  - Nested Framework
  - Tool Learning
  - Context Efficiency
  - Deep Web

permalink: /ai/review/2025-12-30-Nested-Browser-Use-Learning-for-Agentic-Information-Seeking/

toc: true
toc_sticky: true

date: 2025-12-30 00:00:00+0900+0900
last_modified_at: 2025-12-30 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.23647)

**저자:** Baixuan Li, Jialong Wu, Wenbiao Yin, Kuan Li, Zhongwang Zhang, Huifeng Yin, Zhengwei Tao, Liwen Zhang, Pengjun Xie, Jingren Zhou, Yong Jiang



## 핵심 연구 목표
정보 탐색(IS) 에이전트의 현재 브라우저 도구 사용이 API 수준의 스니펫 검색 및 URL 기반 페이지 가져오기에 국한되어 실제 브라우징을 통한 풍부한 정보 접근이 제한되는 문제를 해결하고자 합니다. 이는 복잡한 브라우저 상호작용과 방대한 페이지 콘텐츠로 인해 **ReAct 스타일 에이전트** 에게 상당한 복잡성을 야기하기 때문에, 상호작용 제어와 페이지 탐색을 분리하는 중첩 구조의 최소-완전 브라우저 액션 프레임워크를 제안하여 효과적인 **딥 웹 정보 습득** 을 가능하게 하는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 **Nested Browser-Use Learning (NestBrowse)** 을 제안하며, 세 가지 핵심 구성 요소로 이루어져 있습니다. 첫째, **search, visit, click, fill** 의 네 가지 코어 액션을 포함하는 최소한의 기능적 완전한 브라우저 툴킷을 설계하여 포괄적인 웹 정보 접근을 가능하게 합니다. 둘째, 브라우저 상호작용을 **도구 통합 추론을 위한 외부 루프** 와 **페이지 내 탐색을 위한 내부 루프** 로 분리하는 중첩 프레임워크를 도입하여, 목표 관련 콘텐츠만 추출하고 에이전트 컨텍스트의 효율성을 높입니다. 셋째, 외부 루프 추론과 내부 루프 증거 추출을 공동으로 훈련하는 **다중 작업 모방 학습 패러다임** 을 개발하여 이 중첩된 브라우저 사용 기능을 단일 IS 에이전트 모델에 통합합니다.

## 주요 결과
NestBrowse는 **BrowseComp, GAIA, BrowseComp-zh, XBench-DeepSearch** 등 도전적인 딥 IS 벤치마크에서 강력한 성능을 일관되게 보여주었습니다. 특히, **NestBrowse-30B-A3B** 모델은 BrowseComp에서 **31.6%** , GAIA에서 **75.7%** 의 성능을 달성하여 주요 오픈소스 IS 에이전트를 능가하고 여러 독점 시스템과도 경쟁력을 보였습니다. 주목할 점은 **NestBrowse-4B** 의 경우 BrowseComp에서 **22.4%** , GAIA에서 **68.9%** 를 기록하며 많은 대규모 IS 에이전트보다 우수한 경쟁력을 보여주었다는 것입니다. 또한, 툴킷 단순화와 목표 관련 콘텐츠 추출이 독립적으로 성능을 향상시키며, 두 가지를 결합했을 때 **73.8% (GAIA)** 로 가장 강력한 성능을 나타냈습니다.

## AI 실무자를 위한 시사점
본 프레임워크는 LLM 에이전트가 단순한 API 호출을 넘어 **실제 브라우징, 클릭, 양식 채우기** 와 같은 복잡한 딥 웹 상호작용을 효과적으로 수행하도록 돕습니다. **중첩된 구조** 와 **목표 중심 콘텐츠 추출** 은 방대하고 중복되는 웹 페이지 정보를 효율적으로 관리하여 LLM의 컨텍스트 효율성과 추론 집중도를 크게 향상시킵니다. 특히 **소규모 모델(NestBrowse-4B)** 의 성공은 복잡한 IS 작업에서 모델 규모보다 **원칙적인 도구 추상화 및 상호작용 전략** 이 더 중요하다는 점을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.