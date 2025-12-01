---
title: "[논문리뷰] DeepMMSearch-R1: Empowering Multimodal LLMs in Multimodal Web Search"
excerpt: "이 [arXiv]에 게시한 'DeepMMSearch-R1: Empowering Multimodal LLMs in Multimodal Web Search' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLM
  - Web Search
  - Visual Question Answering
  - Reinforcement Learning
  - Image Cropping
  - Self-Correction
  - Tool Use

permalink: /ai/review/2025-10-15-DeepMMSearch-R1-Empowering-Multimodal-LLMs-in-Multimodal-Web-Search/

toc: true
toc_sticky: true

date: 2025-10-15 13:01:40+0900
last_modified_at: 2025-10-15 13:01:40+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.12801)

**저자:** Kartik Narayan, Yang Xu, Tian Cao, Kavya Nerella, Vishal M. Patel, Navid Shiee, Peter Grasch, Chao Jia, Yinfei Yang, Zhe Gan



## 핵심 연구 목표
기존 MLLM이 지식 집약적 시각 질의응답(VQA)에서 겪는 정보 부족, 정체된 데이터, 비효율적인 검색 쿼리 등의 한계를 극복하기 위해, 멀티모달 LLM이 **온디맨드 다중 턴 웹 검색** 을 수행하고 이미지와 텍스트 검색 도구 모두에 대해 **동적으로 쿼리를 생성 및 개선** 하는 능력을 부여하는 것을 목표로 합니다.

## 핵심 방법론
**DeepMMSearch-R1** 은 **supervised finetuning (SFT)** 과 **online reinforcement learning (RL)** 의 2단계 훈련 파이프라인을 통해 개발되었습니다. SFT 단계에서는 **DeepMMSearchVQA** 라는 새로운 데이터셋을 활용하여 모델이 검색 도구 사용법을 학습하며, RL 단계에서는 **GRPO 알고리즘** 과 **gpt-5-chat-latest** 를 보상 모델로 사용하여 검색 행동을 최적화합니다. 특히, **Grounding DINO 기반의 이미지 크롭핑 도구** 를 통합하여 특정 시각적 개체에 대한 이미지 검색 효율성을 높였습니다.

## 주요 결과
**DeepMMSearch-R1** (RL)은 지식 집약적 VQA 벤치마크에서 **평균 57.13** 의 성능을 달성하여, RAG 기반 방법론에 비해 **평균 +21.13점** , 프롬프트 기반 검색 에이전트 대비 **평균 +8.89점** 더 우수했습니다. 특히 **크롭된 이미지 검색** 기능은 평균 **+1.75점** 의 성능 향상을 가져왔으며, RL 훈련을 통해 불필요한 이미지 크롭핑 검색이 **30% 이상 감소** 했습니다.

## AI 실무자를 위한 시사점
이 연구는 MLLM에 **실시간 웹 검색 능력** 과 **동적인 쿼리 생성/개선 메커니즘** 을 통합하는 실용적인 방법을 제시합니다. **크롭된 이미지 검색** 과 **자체 성찰(self-reflection) 기반의 쿼리 수정** 기능은 AI 에이전트가 노이즈가 많고 빠르게 변화하는 웹 환경에서 정보를 더 정확하고 효율적으로 검색하도록 돕습니다. 이는 디지털 비서, 교육, 정보 검색 시스템 등 다양한 응용 분야에서 MLLM의 활용성을 크게 확장할 수 있는 잠재력을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.