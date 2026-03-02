---
title: "[논문리뷰] AI Gamestore: Scalable, Open-Ended Evaluation of Machine General Intelligence with Human Games"
excerpt: "arXiv에 게시된 'AI Gamestore: Scalable, Open-Ended Evaluation of Machine General Intelligence with Human Games' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Artificial General Intelligence (AGI)
  - Evaluation Benchmark
  - General Game Playing
  - Large Language Models (LLMs)
  - Human-in-the-loop
  - Cognitive Capabilities
  - Vision-Language Models (VLMs)
  - Game Generation

permalink: /ai/review/2026-02-27-AI-Gamestore-Scalable-Open-Ended-Evaluation-of-Machine-General-Intelligence-with-Human-Games/

toc: true
toc_sticky: true

date: 2026-02-27 00:00:00+0900+0900
last_modified_at: 2026-02-27 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.17594)

**저자:** Lance Ying, Ryan Truong, Prafull Sharma, Kaiya Ivy Zhao, Nathan Cloos, Kelsey R. Allen, Thomas L. Griffiths, Katherine M. Collins, José Hernández-Orallo, Phillip Isola, Samuel J. Gershman, Joshua B. Tenenbaum



## 핵심 연구 목표
본 논문은 협소하고 정적인 기존 AI 벤치마크의 한계를 극복하고, 인간과 유사한 일반 지능(AGI)을 평가하기 위한 확장 가능하며 개방형의 새로운 접근 방식을 제안합니다. 특히, AI 시스템이 **인간이 고안한 모든 게임** 을 얼마나 잘 플레이하고 학습하는지를 통해 `AGI` 역량을 측정하고자 합니다.

## 핵심 방법론
저자들은 `AI GAMESTORE`라는 플랫폼을 제안하며, 이는 `LLM`과 **Human-in-the-loop** 방식을 활용하여 인기 디지털 게임 플랫폼에서 새로운 게임을 합성하고 적응시킵니다. 이 플랫폼은 **4단계 파이프라인** 을 통해 게임을 소싱, 생성, 주석화 및 평가합니다. 특히, `LLM`은 **p5.js 코드베이스** 를 생성하고, 인간 참여자는 게임 플레이를 통해 피드백을 제공하여 게임을 개선하며, **인지 능력 프로파일** 을 주석화하여 모델의 역량 격차를 진단합니다.

## 주요 결과
`AI GAMESTORE`에서 100개의 게임을 큐레이션하고 **7개의 최신 Vision-Language Models (VLMs)** 을 106명의 인간 참가자와 비교한 결과, AI 모델들은 인간 평균 점수의 **10% 미만** 에 그치며 상당한 성능 격차를 보였습니다. 특히, 모델들은 **세계 모델 학습(World Model Learning), 기억(Memory), 계획(Planning)** 이 필요한 게임에서 특히 어려움을 겪었으며, 인간보다 **12-18배 느린** 반응 속도를 보였습니다.

## AI 실무자를 위한 시사점
`AI GAMESTORE`는 `AGI` 평가를 위한 **동적이고 확장 가능한 벤치마크** 를 제공하여, 기존 벤치마크의 한계를 극복하는 실용적인 방법을 제시합니다. 현재 `VLM`의 **장기 기억, 계획, 세계 모델 학습 능력** 의 부족을 명확히 진단함으로써, `AGI` 연구 및 개발의 **핵심 개선 영역** 을 식별하는 데 중요한 지침이 됩니다. `Human-in-the-loop` 게임 생성 방식은 다양하고 도전적인 평가 환경을 구축하는 효과적인 방법론으로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.