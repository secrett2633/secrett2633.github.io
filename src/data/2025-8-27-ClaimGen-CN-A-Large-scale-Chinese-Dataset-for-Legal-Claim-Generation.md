---
title: "[논문리뷰] ClaimGen-CN: A Large-scale Chinese Dataset for Legal Claim Generation"
excerpt: "Kun Kuang이 [arXiv]에 게시한 'ClaimGen-CN: A Large-scale Chinese Dataset for Legal Claim Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Legal AI
  - Natural Language Processing
  - Claim Generation
  - Chinese Legal Dataset
  - Factuality
  - Clarity
  - Large Language Models
  - Zero-shot Evaluation

permalink: /ai/review/2025-8-27-ClaimGen-CN-A-Large-scale-Chinese-Dataset-for-Legal-Claim-Generation/

toc: true
toc_sticky: true

date: 2025-08-27 13:22:18+0900
last_modified_at: 2025-08-27 13:22:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.17234)

**저자:** Siying Zhou, Yiquan Wu, Hui Chen, Xavier Hu, Kun Kuang, Adam Jatowt, Ming Hu, Chunyan Zheng, Fei Wu



## 핵심 연구 목표
본 논문은 법률 전문가가 아닌 일반인(예: 원고)을 위한 **법률 청구 생성(Legal Claim Generation)** 문제에 주목하여, 주어진 사건의 사실(fact)을 바탕으로 청구 내용을 자동으로 생성하는 것을 목표로 합니다. 이는 법률 지원 접근성을 높이고 사법 절차의 초기 단계인 사전 재판 시나리오에서의 효율성을 개선하려는 의도를 가집니다.

## 핵심 방법론
연구진은 다양한 실제 민사 분쟁 사례에서 **207,748개**의 문서를 수집하여, 중국어 법률 청구 생성 태스크를 위한 최초의 대규모 데이터셋인 **ClaimGen-CN**을 구축했습니다. 모델 평가를 위해 **사실성(Factuality)**과 **명확성(Clarity)**이라는 두 가지 핵심 차원을 포함하는 새로운 평가 지표를 설계했으며, **GPT-4o**를 평가 도구로 활용하여 최신 범용 및 법률 특화 **대규모 언어 모델(LLM)**에 대한 포괄적인 **제로샷(zero-shot) 평가**를 수행했습니다.

## 주요 결과
자동 평가 지표(BLEU, ROUGE, BERT SCORE)에서는 **Claude3.5**가 가장 우수한 성능을 보였고, GPT-4o 기반 평가에서는 **DeepSeek-R1**이 **총점 65.79점**으로 가장 높은 사실성과 명확성을 나타냈습니다. 인간 평가와 GPT-4o 평가 간의 **MAE는 0.19(사실성) 및 0.20(명확성)**, **일관성(consistency)은 81.05%(사실성) 및 73.68%(명확성)**로 높은 상관관계를 보였습니다. 하지만, 전반적으로 현재 LLM은 사실적 정확성과 표현적 명확성에서 한계를 드러냈습니다.

## AI 실무자를 위한 시사점
**ClaimGen-CN 데이터셋**이 공개되어 법률 AI 연구에 중요한 기반을 제공합니다. 현재 LLM들은 법률 청구 생성 시 사실적 정확성과 언어적 명확성에서 개선이 필요하며, 이는 해당 도메인에 특화된 모델 개발의 필요성을 강조합니다. 경량 모듈과 대규모 모델의 협업, 장기 연쇄 추론 기법, 법률 특화 피드백을 통한 **강화 학습(reinforcement learning)**과 같은 발전 방향이 제안됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.