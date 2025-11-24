---
title: "[논문리뷰] BhashaBench V1: A Comprehensive Benchmark for the Quadrant of Indic
  Domains"
excerpt: "이 [arXiv]에 게시한 'BhashaBench V1: A Comprehensive Benchmark for the Quadrant of Indic
  Domains' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models (LLMs)
  - Benchmark
  - Indic Languages
  - Multilingual Evaluation
  - Domain-Specific AI
  - India-centric Knowledge Systems
  - Zero-Shot Learning
  - Question Answering

permalink: /ai/review/2025-10-30-BhashaBench-V1-A-Comprehensive-Benchmark-for-the-Quadrant-of-Indic-Domains/

toc: true
toc_sticky: true

date: 2025-10-30 13:06:06+0900
last_modified_at: 2025-10-30 13:06:06+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.25409)

**저자:** Vijay Devane, Mohd Nauman, Bhargav Patel, Aniket Mahendra Wakchoure, Yogeshkumar Sant, Shyam Pawar, Viraj Thakur, Ananya Godse, Sunil Patra, Neha Maurya, Suraj Racha, Nitish Kamal Singh, Ajay Nagpal, Piyush Sawarkar, Kundeshwar Vijayrao Pundalik, Rohit Saluja, Ganesh Ramakrishnan



## 핵심 연구 목표
이 논문은 기존 벤치마크의 **Anglocentric** 및 **도메인-불가지론적** 한계를 해결하고, 인도 중심의 지식 시스템에 대한 평가 부족 문제를 다룹니다. 궁극적으로 **BhashaBench V1**을 통해 LLM이 다양한 인도 지식 도메인에서 **도메인-특정 지식과 이중 언어 이해를 통합하는 능력**을 종합적으로 평가하는 것을 목표로 합니다.

## 핵심 방법론
**BhashaBench V1**은 **74,166개**의 질문-답변 쌍을 포함하며, 이 중 **52,494개는 영어**, **21,672개는 힌디어**입니다. 데이터는 인도 정부 및 도메인-특정 시험지에서 수집되었으며, **농업(BBK), 법률(BBL), 금융(BBF), 아유르베다(BBA)**의 4가지 주요 도메인과 **90개 이상의 하위 도메인**을 포함합니다. 데이터 처리는 **Surya OCR** 및 **GPT-OSS-120B 기반 추출 파이프라인**을 사용하고, **전문가 검증**을 거쳐 품질을 확보했습니다.

## 주요 결과
**29개 이상의 LLM**에 대한 평가 결과, 도메인 및 언어별 성능 격차가 크게 나타났습니다. 특히 **GPT-4o**는 법률 도메인에서 **76.49%의 전반적인 정확도**를 달성했으나 아유르베다에서는 **59.74%**에 그쳤습니다. 모델들은 힌디어 콘텐츠보다 영어 콘텐츠에서 일관되게 더 나은 성능을 보였으며, **Qwen3-235B-A22B-Instruct**가 **67.25%**로 가장 높은 평균 정확도를 기록했습니다.

## AI 실무자를 위한 시사점
이 벤치마크는 **인도-특정 모델 개발의 시급성**과 **문화적 민감성을 갖춘 LLM**의 필요성을 강조합니다. 특히 **아유르베다**와 같은 전통 지식 시스템 및 리소스가 부족한 도메인에서의 낮은 성능은 해당 분야에 대한 집중적인 연구 및 모델 최적화가 필요함을 시사합니다. **BhashaBench V1**은 인도 내 다양한 언어 및 지식 환경에 대한 모델의 실세계 배포 준비 상태를 평가하는 데 중요한 도구로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.