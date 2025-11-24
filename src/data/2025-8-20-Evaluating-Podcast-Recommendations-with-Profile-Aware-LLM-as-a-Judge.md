---
title: "[논문리뷰] Evaluating Podcast Recommendations with Profile-Aware LLM-as-a-Judge"
excerpt: "Alice Wang이 [arXiv]에 게시한 'Evaluating Podcast Recommendations with Profile-Aware LLM-as-a-Judge' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Podcast Recommendation
  - LLM-as-a-Judge
  - Offline Evaluation
  - User Profiling
  - Recommender Systems
  - Natural Language Processing

permalink: /ai/review/2025-8-20-Evaluating-Podcast-Recommendations-with-Profile-Aware-LLM-as-a-Judge/

toc: true
toc_sticky: true

date: 2025-08-20 13:26:54+0900
last_modified_at: 2025-08-20 13:26:54+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.08777)

**저자:** Francesco Fabbri, Gustavo Penha, Edoardo D'Amico, Alice Wang, Marco De Nadai, Jackie Doremus, Paul Gigioli, Andreas Damianou, Oskar Stål, Mounia Lalmas



## 핵심 연구 목표
본 논문은 팟캐스트와 같은 롱폼 오디오 도메인에서 개인화된 추천 시스템 평가의 어려움(노출 편향, A/B 테스트의 높은 비용 및 제약)을 해결하고자 합니다. 특히, 배포 전 모델 선택 단계에서 확장 가능하고 신뢰할 수 있으며 해석 가능한 평가 방법론의 부재라는 핵심 문제를 다룹니다.

## 핵심 방법론
저자들은 **LLM-as-a-Judge** 프레임워크를 제안하며, 2단계의 **프로파일-인식 접근 방식**을 사용합니다. 첫째, 90일간의 청취 기록에서 **토픽 관심사 및 행동 패턴**을 요약한 **자연어 사용자 프로파일**을 생성하여 LLM에 풍부한 문맥을 제공합니다. 둘째, **GPT-4 LLM**은 사용자 프로파일과 추천 에피소드 메타데이터를 기반으로 **포인트별 및 쌍별 평가**를 수행하여 추천의 관련성을 판단하고, 그 이유를 설명하는 합리적 근거를 제시합니다.

## 주요 결과
**LaaJ-Profile** (제안하는 프로파일-인식 심사관)은 에피소드 수준 평가에서 **0.6442 ROC-AUC**를, 모델 수준 평가에서 **0.6596 MSA**를 달성하여 인간의 판단과 높은 일치도를 보였습니다. 이는 원시 청취 기록을 직접 사용한 **LaaJ-History**와 유사하거나 더 나은 성능이며, Sentence-BERT 임베딩 기반의 **sBERT-Sim**을 크게 상회합니다. 또한, 사용자 프로파일 생성에 사용되는 에피소드 수가 늘어날수록 LLM 판단의 정확도가 향상됨이 확인되었습니다.

## AI 실무자를 위한 시사점
본 연구는 **LLM-as-a-Judge** 접근 방식이 롱폼 오디오 추천 시스템의 효율적이고 해석 가능한 오프라인 평가를 위한 유망한 대안임을 보여줍니다. 특히, **자연어 사용자 프로파일**은 LLM이 추천 관련성을 정확하게 추론하는 데 필요한 풍부한 문맥을 제공하며, 이는 **신속한 모델 선택 및 반복적인 A/B 테스트 대체**에 활용될 수 있습니다. 하지만 LLM의 긍정적 편향이나 결정 편향을 완화하기 위한 추가적인 연구(예: 적응형 프롬프팅)가 필요함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.