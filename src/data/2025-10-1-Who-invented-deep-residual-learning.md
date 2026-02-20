---
title: "[논문리뷰] Who invented deep residual learning?"
excerpt: "Juergen Schmidhuber이 arXiv에 게시한 'Who invented deep residual learning?' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Deep Learning History
  - Residual Connections
  - Recurrent Neural Networks (RNN)
  - Long Short-Term Memory (LSTM)
  - Feedforward Neural Networks (FNN)
  - Highway Networks
  - ResNet
  - Vanishing Gradient

permalink: /ai/review/2025-10-1-Who-invented-deep-residual-learning/

toc: true
toc_sticky: true

date: 2025-10-01 14:04:08+0900
last_modified_at: 2025-10-01 14:04:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.24732)

**저자:** Juergen Schmidhuber



## 핵심 연구 목표
이 논문은 **깊은 잔여 학습(deep residual learning)** 의 발명 및 진화에 대한 명확한 연대기를 확립하고, 그 핵심 원리와 주요 개발을 주로 Schmidhuber 연구실의 연구, 특히 **Sepp Hochreiter의 1991년 학위 논문** 과 이후의 **LSTM** 및 **Highway Network** 작업을 통해 이루어졌다고 주장하는 것을 목표로 합니다. **ResNet** 과 같이 널리 인용되는 모델들의 기원에 대한 역사적 서사를 명확히 하고자 합니다.

## 핵심 방법론
이 논문은 **잔여 연결(residual connections)** 개념의 연대기적 발전을 상세히 설명하는 역사적 서술 방식을 채택합니다. **1991년 Hochreiter의 논문** 에서 **가중치 1.0의 순환 잔여 연결** 이 **기울기 소실/폭주 문제** 를 해결하기 위해 도입되었음을 강조합니다. 이후 **1997년 LSTM** 은 이를 **일정한 오류 캐러셀(constant error carrousels)** 로 통합했으며, **1999년 LSTM** 변형에서는 **게이트가 있는 순환 잔여 연결(gated recurrent residual connections)** 을 처음부터 열린(1.0) 상태로 사용했습니다. **2005년 LSTM** 언폴딩을 통해 순환 잔여 연결이 **피드포워드 잔여 연결** 로 전환될 수 있음을 보였고, **2015년 Highway Networks** 는 **게이트가 있는 피드포워드 잔여 연결** 을 적용하여 최초로 수백 층의 매우 깊은 FNN을 구현했습니다. **2015년 ResNet** 은 이 Highway Net의 **게이트가 열린 변형** 으로 설명됩니다.

## 주요 결과
논문은 **잔여 연결을 통한 일정한 오류 흐름(constant error flow)** 이라는 근본 원리가 **1991년** 에 확립되었으며, 이것이 **깊은 RNN(LSTM)** 과 이후 **깊은 FNN(Highway Networks/ResNet)** 훈련을 가능하게 했다고 주장합니다. 특히 **Highway Networks** 는 이전 FNN보다 **약 10배 더 깊은 수백 개의 층** 을 달성하며, **ResNet** 과 **ImageNet** 에서 "거의 동일한 성능"을 보였습니다. **LSTM** 은 20세기 가장 많이 인용된 AI 논문이 되었고, **ResNet** 은 21세기 가장 많이 인용된 신경망 모델이 되었으며, 이들 모두 잔여 연결 원리에 기반한다고 강조합니다.

## AI 실무자를 위한 시사점
AI 실무자들은 **잔여 연결** 의 깊은 역사적 배경과 **기울기 소실/폭주 문제** 해결에 대한 핵심적인 중요성을 파악할 수 있습니다. 이 논문은 **LSTM** 과 **Highway Networks** 개발이 **ResNet** 을 포함한 현대 **깊은 신경망** 훈련의 필수적인 토대였음을 보여주며, **가중치 1.0의 잔여 연결** 이 성공적인 딥러닝 모델의 핵심 요소임을 시사합니다. 현재 널리 활용되는 **트랜스포머(Transformers)** 를 포함한 다양한 아키텍처에서 이러한 개념의 중요성이 계속되고 있음을 이해하는 데 도움이 됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.