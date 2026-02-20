---
title: "[논문리뷰] Evaluating, Synthesizing, and Enhancing for Customer Support
  Conversation"
excerpt: "Feng Chen이 arXiv에 게시한 'Evaluating, Synthesizing, and Enhancing for Customer Support
  Conversation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Customer Support
  - Dialogue Generation
  - Large Language Models
  - Role-Playing
  - COPC Framework
  - Synthetic Data
  - Strategy Prediction
  - Empathetic AI

permalink: /ai/review/2025-8-8-Evaluating-Synthesizing-and-Enhancing-for-Customer-Support-Conversation/

toc: true
toc_sticky: true

date: 2025-08-08 13:32:22+0900
last_modified_at: 2025-08-08 13:32:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.04423)

**저자:** Jie Zhu, Huaixia Dou, Junhui Li, Lifan Guo, Feng Chen, Chi Zhang, Fang Kong



## 핵심 연구 목표
본 논문은 고객 지원 대화(Customer Support Conversation, CSC) 분야에서 전략적 지침과 고품질 데이터의 부족 문제를 해결하고자 합니다. 궁극적으로는 정확한 문제 해결과 공감 능력을 갖춘 고객 지원 응답을 생성하도록 **LLM** 을 훈련하는 것을 목표로 하며, 이를 위해 **CSC** 작업을 새롭게 정의하고 관련 프레임워크와 데이터셋을 구축합니다.

## 핵심 방법론
고객 지원 프로세스를 **COPC 가이드라인** 기반의 **5단계(Connecting, Identifying, Exploring, Resolving, Maintaining)** 와 **12가지 지원 전략** 으로 구성된 **CSC 프레임워크** 를 제안합니다. 실제 고객 서비스 대화 **1,855개** 를 **LLM (DeepSeek-R1)** 으로 재작성하여 **전략 정렬성** 을 높인 평가 데이터셋 **CSConv** 를 구축했습니다. 훈련 데이터셋 **RoleCS** 는 **LLM 기반의 멀티-롤 플레이 프레임워크** 를 통해 합성 대화를 생성하여 구축되었으며, **Qwen2.5-Instruct** 및 **LLaMA3.1-Instruct** 등 강력한 **LLM** 을 **RoleCS** 로 미세 조정했습니다.

## 주요 결과
**RoleCS** 로 미세 조정된 **LLM** 은 **CSConv** 데이터셋에서 모든 평가 지표에서 성능이 크게 향상되었습니다. 특히 **Qwen2.5-Instruct-72B** 는 참조 맥락(reference context)에서 전략 예측 정확도(ACC)가 **19.39%** 에서 **43.29%** 로, BLEU-4 점수가 **8.61** 에서 **12.15** 로 크게 상승했습니다. 인간 평가에서도 문제 해결 능력과 전반적인 품질 개선이 확인되었으며, **DeepSeek-R1** 과 **Qwen** 같은 중국어 중심 모델이 더 일반적인 **LLaMA** 및 **GPT** 모델보다 우수한 성능을 보였습니다.

## AI 실무자를 위한 시사점
**LLM** 을 활용한 **고품질 합성 데이터(RoleCS)** 생성이 고객 지원 챗봇 및 대화형 AI 개발에 효과적인 훈련 방법론임을 입증했습니다. **COPC 프레임워크** 와 같은 구조화된 전략을 대화 모델에 통합하는 것이 응답의 품질과 실용성을 높이는 데 핵심적인 역할을 합니다. 특히 한국어와 같은 비영어권 언어의 고객 지원 서비스에는 **DeepSeek** 나 **Qwen** 과 같이 해당 언어 및 문화적 맥락에 최적화된 **LLM** 을 활용하는 것이 유리할 수 있음을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.