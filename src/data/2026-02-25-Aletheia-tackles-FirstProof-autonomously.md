---
title: "[논문리뷰] Aletheia tackles FirstProof autonomously"
excerpt: "[arXiv]에 게시된 'Aletheia tackles FirstProof autonomously' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Mathematics Research Agent
  - Autonomous Problem Solving
  - FirstProof Challenge
  - Gemini 3 Deep Think
  - Mathematical Proof Generation
  - Human-AI Interaction
  - Deep Learning

permalink: /ai/review/2026-02-25-Aletheia-tackles-FirstProof-autonomously/

toc: true
toc_sticky: true

date: 2026-02-25 00:00:00+0900+0900
last_modified_at: 2026-02-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.21201)

**저자:** Tony Feng, Junehyuk Jung, Sang-hyun Kim, Carlo Pagano, Sergei Gukov, Chiang-Chiang Tsai, David P. Woodruff, Adel Javanmard, Aryan Mokhtari, Dawsen Hwang, Yuri Chervonyi, Jonathan N. Lee, Garrett Bingham, Trieu H. Trinh, Vahab Mirrokni, Quoc V. Le, Thang Luong



## 핵심 연구 목표
이 논문은 **Aletheia** 라는 수학 연구 에이전트가 **FirstProof 챌린지** 에서 보여준 성능을 보고합니다. 주요 목표는 AI가 전문 수학 문헌의 엄격한 기준에 부합하는 연구 수준의 수학 문제를 자율적으로 해결할 수 있는 능력을 평가하고, 그 결과를 투명하게 공개하는 것입니다.

## 핵심 방법론
**Aletheia** 에이전트는 **Gemini 3 Deep Think** 모델을 기반으로 하며, **FirstProof .tex 파일** 에서 문제 문장을 그대로 복사하여 입력했습니다. 모델의 출력은 미리 정의된 **검증 및 추출 프롬프트** 를 통해 필터링되었으며, 이는 수학 문헌의 엄격한 수준과 일치하는 **LaTeX 코드 형식의 증명** 을 생성하도록 설계되었습니다. 또한, **Aletheia A** 와 **Aletheia B** 두 가지 다른 모델을 사용한 "best-of-2" 방식을 채택하여 최적의 솔루션을 선정했습니다.

## 주요 결과
**Aletheia** 는 **FirstProof 챌린지의 10개 문제 중 6개(P2, P5, P7, P8, P9, P10)** 를 허용된 시간 내에 자율적으로 해결했습니다. 해결된 문제에 대한 전문가 평가 결과, **Problem 8** 을 제외한 모든 문제에서 솔루션이 "Correct"로 평가되었으며, **Problem 8** 은 7명의 전문가 중 5명이 "Correct"로 평가했습니다. 이는 **Aletheia** 의 에이전트 스캐폴딩과 기본 모델 개선으로 인해 이전 버전 대비 정확도가 향상되었음을 나타냅니다.

## AI 실무자를 위한 시사점
이 연구는 **AI 시스템이 복잡한 연구 수준의 수학 문제를 자율적으로 해결할 수 있는 강력한 잠재력** 을 보여주며, 이는 수학 연구 자동화 및 가속화에 대한 새로운 가능성을 제시합니다. **Gemini 3 Deep Think** 와 같은 대규모 모델과 **체계적인 검증/추출 프롬프트** 의 결합은 AI의 신뢰성을 높여 다른 과학 분야의 자율 에이전트 개발에도 중요한 시사점을 제공합니다. 그러나 **문제 8** 에서 나타난 전문가 평가의 불일치는 AI가 생성한 복잡한 증명의 최종 검토와 미묘한 해석에 있어 여전히 인간 전문가의 역할이 중요함을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.