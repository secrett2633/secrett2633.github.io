---
title: "[논문리뷰] ReviewScore: Misinformed Peer Review Detection with Large Language
  Models"
excerpt: "이 [arXiv]에 게시한 'ReviewScore: Misinformed Peer Review Detection with Large Language
  Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Peer Review
  - Review Quality
  - Large Language Models (LLMs)
  - Misinformed Review
  - Argument Reconstruction
  - Factuality Evaluation
  - Natural Language Processing
  - Automated Evaluation

permalink: /ai/review/2025-9-29-ReviewScore-Misinformed-Peer-Review-Detection-with-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-09-29 13:47:46+0900
last_modified_at: 2025-09-29 13:47:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.21679)

**저자:** Hyun Ryu, Doohyuk Jang, Hyemin S. Lee, Joonhyun Jeong, Gyeongman Kim, Donghyeon Cho, Gyouk Chu, Minyeong Hwang, Hyeongwon Jang, Changhun Kim, Haechan Kim, Jina Kim, Joowon Kim, Yoonjeon Kim, Kwanhyung Lee, Chanjae Park, Heecheol Yun, Gregor Betz*, Eunho Yang*



## 핵심 연구 목표
AI 학회에서 급증하는 제출 수로 인해 저하되는 동료 검토의 품질 문제를 해결하고자 합니다. 특히, 논문으로 답변 가능한 질문이나 잘못된 전제를 포함한 약점과 같이 **잘못된 정보를 포함한 검토 지점(misinformed review points)** 을 신뢰성 있게 감지하는 새로운 평가 기준인 **REVIEWSCORE** 를 LLM을 활용하여 개발하는 것이 목표입니다.

## 핵심 방법론
논문은 **BASE REVIEWSCORE** (직접적인 사실성/답변 가능성 평가)와 **ADVANCED REVIEWSCORE** (전제 수준의 사실성 종합 평가)를 제안합니다. **ADVANCED REVIEWSCORE** 의 핵심은 LLM, **SAT solver** (유효성 검증), 및 **피드백 루프** (충실성 보장)를 결합하여 자연어를 **1차 논리(FOL)** 로 변환하고 다시 역변환하는 **자동 논증 재구성 엔진** 을 통해 약점의 명시적 및 암묵적 전제를 추출하는 것입니다. LLM 기반 평가의 신뢰성을 검증하기 위해 ICLR 2021-2023 리뷰에서 추출한 총 **657개의 검토 지점** 에 대한 **인간 전문가 주석 데이터셋** 을 구축했습니다.

## 주요 결과
인간 주석 결과, 현재 AI 학회 리뷰의 **15.2%의 약점** 과 **26.4%의 질문** 이 잘못된 정보를 포함하고 있음이 밝혀졌습니다. LLM들은 **REVIEWSCORE** 평가에서 F1 점수 **0.4-0.5** , Kappa 점수 **0.3-0.4** 로 **보통 수준의 인간-모델 일치도** 를 보였습니다. 특히, **ADVANCED REVIEWSCORE** 는 **BASE REVIEWSCORE** 보다 논증 평가에서 **최대 2.48배 높은 F1 및 Kappa 점수** 를 기록하여 전제 수준 사실성 평가의 유효성을 입증했습니다. 또한, 모델에 **저자 응답(Authors Response)** 을 제공하면 REVIEWSCORE 일치도가 F1 점수에서 **22.3%** , Kappa 점수에서 **13.2%** 향상되었습니다.

## AI 실무자를 위한 시사점
**REVIEWSCORE** 는 동료 검토 품질 평가를 **자동화할 수 있는 유망한 방법** 을 제시하여, 잠재적으로 저품질 리뷰를 걸러내고 검토자와 저자에게 피드백을 제공할 수 있습니다. 이 방법론은 **논증 재구성** 및 **사실성 확인** 과 같은 복잡한 논리적 추론 작업에서 **LLM의 잠재력** 을 보여주며, 특히 정형 논리 도구 및 피드백 루프와 통합될 때 더욱 강력합니다. 또한, 견고한 사실성 평가를 위해 **전제 수준 평가의 중요성** 과 전문화된 영역에서 LLM 성능 향상을 위한 **추가적인 맥락(예: 저자 응답)의 가치** 를 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.