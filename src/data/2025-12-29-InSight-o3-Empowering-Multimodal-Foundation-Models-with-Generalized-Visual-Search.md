---
title: "[논문리뷰] InSight-o3: Empowering Multimodal Foundation Models with Generalized Visual Search"
excerpt: "Jierun Chen이 [arXiv]에 게시한 'InSight-o3: Empowering Multimodal Foundation Models with Generalized Visual Search' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal AI
  - Visual Search
  - Foundation Models
  - Multi-agent Systems
  - Reinforcement Learning
  - Benchmarking
  - Visual Reasoning

permalink: /ai/review/2025-12-29-InSight-o3-Empowering-Multimodal-Foundation-Models-with-Generalized-Visual-Search/

toc: true
toc_sticky: true

date: 2025-12-29 00:00:00+0900+0900
last_modified_at: 2025-12-29 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.18745)

**저자:** Kaican Li¹*, Lewei Yao2*, Jiannan Wu2*, Tiezheng Yu², Jierun Chen², Haoli Bai², Lu Hou², Lanqing Hong², Wei Zhang2, Nevin L. Zhang¹†



## 핵심 연구 목표
본 논문은 최신 개방형 멀티모달 에이전트가 복잡한 실세계 시각적 추론 작업(예: 고밀도 차트 분석, 지도 탐색)에서 보이는 한계를 해결하고자 합니다. 특히, 정교한 시각적 세부 사항에 대한 교차 주의(interleaved attention)를 요구하는 추론 능력의 부족을 개선하여, **OpenAI o3** 와 같은 최첨단 독점 시스템과의 격차를 줄이는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 복잡한 추론 중심의 시각적 작업을 평가하기 위한 새로운 벤치마크인 **O3-BENCH** 를 도입했습니다. 이를 해결하기 위해 **vReasoner** (고수준 추론 담당)와 **vSearcher** (세부 시각 정보 위치 파악 및 추출 담당)로 구성된 **INSIGHT-03 멀티 에이전트 프레임워크** 를 제안합니다. **InSight-o3-vS** 라는 vSearcher 모델은 **강화 학습(RL)** 을 통해 **관계형, 퍼지 또는 개념적 영역** 을 포함하는 **일반화된 시각적 검색** 에 특화되도록 훈련되었으며, **GPT-5-mini** 를 vReasoner로 활용합니다.

## 주요 결과
**O3-BENCH** 벤치마크는 최첨단 시스템조차 어려운 도전 과제를 제시하며, **OpenAI o3** 가 **40.8%** 의 정확도만을 기록했습니다. **InSight-o3-vS** 를 **플러그-앤-플레이** 컴포넌트로 활용한 결과, **GPT-5-mini** 의 **O3-BENCH** 성능은 **39.0%에서 61.5%** 로, **Gemini-2.5-Flash** 의 **V*-Bench ** 성능은 ** 80.1%에서 87.6% **로 크게 향상되었습니다. 이는 훈련 데이터 분포와 다른 평가 데이터셋에서도 ** 강력한 일반화 성능 **을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 ** 고해상도, 고밀도 정보 ** 이미지에서 ** 복잡한 멀티홉 시각적 추론 **이 필요한 AI 애플리케이션 개발에 중요한 진전을 제공합니다. ** InSight-o3-vS **와 같은 전문화된 ** 시각 검색 에이전트 **는 기존 멀티모달 모델의 추론 능력을 손쉽게 향상시킬 수 있는 ** 플러그-앤-플레이 ** 솔루션을 제공합니다. 이는 복잡한 AI 작업을 에이전트 간 역할 분담을 통해 효율적으로 해결하는 ** 멀티 에이전트 시스템 설계 **의 실용적인 방향을 제시하며, ** OpenAI o3**와 같은 강력한 개방형 시스템 구축을 위한 구체적인 기반을 마련합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.