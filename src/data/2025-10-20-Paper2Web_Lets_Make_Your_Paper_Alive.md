---
title: "[논문리뷰] Paper2Web: Let's Make Your Paper Alive!"
excerpt: "Yao Wan이 [arXiv]에 게시한 'Paper2Web: Let's Make Your Paper Alive!' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Academic Webpage Generation
  - Multi-Agent Systems
  - Large Language Models
  - Model Context Protocol
  - Interactive Content
  - Multimedia Dissemination
  - Evaluation Benchmark
  - Human-Computer Interaction

permalink: /ai/review/2025-10-20-Paper2Web_Lets_Make_Your_Paper_Alive/

toc: true
toc_sticky: true

date: 2025-10-20 13:04:24+0900
last_modified_at: 2025-10-20 13:04:24+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.15842)

**저자:** Yuhang Chen, Tianpeng Lv, Siyi Zhang, Yixiang Yin, Yao Wan



## 핵심 연구 목표
이 논문은 학술 논문을 **레이아웃 인식적이고 상호작용적이며 멀티미디어**가 풍부한 웹 페이지로 변환하는 **PAPER2WEB**이라는 새로운 태스크를 제안합니다. 기존 LLM 기반 또는 템플릿 방식의 웹 페이지 생성 방식이 레이아웃, 상호작용성, 포괄적인 평가 도구 측면에서 한계를 보이는 문제를 해결하고, 효율적인 연구 결과 전파를 목표로 합니다.

## 핵심 방법론
**PWAGENT**라는 자율 파이프라인을 도입하여, 논문을 구조화된 자산으로 분해한 후 **Model Context Protocol (MCP)** 기반의 리소스 저장소에 저장합니다. 이 에이전트는 콘텐츠와 레이아웃을 반복적으로 정제하며 웹 페이지를 생성하며, **Connectivity**, **Completeness**, **MLLM-as-a-Judge (상호작용성, 미학, 정보성)**, 그리고 **PaperQuiz (지식 유지)**를 포함하는 다차원 평가 프레임워크를 사용합니다.

## 주요 결과
**PWAGENT**는 기존의 종단 간(end-to-end) 방식인 템플릿 기반 웹 페이지나 **arXiv/alphaXiv** 버전을 큰 폭으로 능가하는 성능을 보였습니다. 특히, **Connectivity와 Completeness**에서 평균 **12%** 향상을 달성했고, **arXiv HTML** 기준으로는 **28%**의 향상을 보여주었습니다. 또한, **MLLM-as-a-Judge** 평가에서 **18%** 평균 향상을 기록하며 가장 강력한 종단 간 모델 대비 평균 점수를 **3배** 높였으며, 이는 **0.025달러/웹 페이지**라는 낮은 토큰 비용으로 달성되었습니다.

## AI 실무자를 위한 시사점
학술 논문을 **동적이고 상호작용적인 웹 페이지**로 자동 변환하는 효과적인 방법을 제공하여, AI 연구 결과의 **접근성과 확산**을 크게 향상시킬 수 있습니다. 특히, **적은 비용으로 높은 품질의 웹 페이지**를 생성하는 **PWAGENT**의 능력은 AI 엔지니어가 자신의 연구 프로젝트를 효과적으로 홍보하고 대중과 소통하는 데 매우 유용하게 활용될 수 있음을 시사합니다. 하지만, 여전히 인간이 설계한 웹 페이지의 멀티미디어 활용 및 디자인 수준에는 도달하기 위한 추가 연구가 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.