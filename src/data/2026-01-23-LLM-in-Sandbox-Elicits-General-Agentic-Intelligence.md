---
title: "[논문리뷰] LLM-in-Sandbox Elicits General Agentic Intelligence"
excerpt: "이 [arXiv]에 게시한 'LLM-in-Sandbox Elicits General Agentic Intelligence' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM-in-Sandbox
  - Agentic Intelligence
  - Code Sandbox
  - Reinforcement Learning
  - Generalization
  - Tool Use
  - Multi-Modal Generation
  - Long-Context Processing

permalink: /ai/review/2026-01-23-LLM-in-Sandbox-Elicits-General-Agentic-Intelligence/

toc: true
toc_sticky: true

date: 2026-01-23 00:00:00+0900+0900
last_modified_at: 2026-01-23 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.16206)

**저자:** Daixuan Cheng, Shaohan Huang, Yuxian Gu, Huatong Song, Guoxin Chen, Li Dong, Wayne Xin Zhao, Ji-Rong Wen, Furu Wei



## 핵심 연구 목표
본 논문은 LLM이 코드 샌드박스(가상 컴퓨터) 내에서 탐색할 수 있도록 지원하여, 비-코드 도메인에서 **일반 에이전트 지능** 을 이끌어내는 **LLM-in-Sandbox** 패러다임을 제안합니다. 추가 훈련 없이도 강력한 LLM이 샌드박스를 자발적으로 활용하여 비-코드 태스크를 수행할 수 있음을 입증하고, 이를 **LLM-in-Sandbox 강화 학습(LLM-in-Sandbox-RL)** 을 통해 더욱 향상시키는 것을 목표로 합니다.

## 핵심 방법론
**LLM-in-Sandbox** 는 LLM에 **외부 자원 접근** , **파일 관리** , **코드 실행** 이라는 세 가지 핵심 메타-역량을 가진 가상 컴퓨터를 제공합니다. 시스템은 **최소주의** 및 **탐색 지향** 원칙에 따라 설계되었으며, LLM은 **execute_bash** , **str_replace_editor** , **submit** 과 같은 기본 도구를 사용하여 **ReAct 프레임워크** 기반의 다중 턴 상호작용을 수행합니다. **LLM-in-Sandbox-RL** 은 일반적인 맥락 기반 데이터를 사용하여 샌드박스 환경에서 LLM을 훈련하며, 결과 기반 보상을 통해 모델이 효율적으로 탐색하는 방법을 학습하도록 합니다.

## 주요 결과
강력한 에이전트 LLM들은 **LLM-in-Sandbox** 모드에서 **수학, 물리, 화학, 생물의학, 장문 맥락 이해, 지시어 따르기** 등 6가지 비-코드 도메인에서 일관된 성능 향상을 보였으며, 특히 **Qwen3-Coder** 는 수학에서 **+24.2%** 의 성능 향상을 달성했습니다. **LLM-in-Sandbox-RL** 훈련을 통해 약한 모델인 **Qwen3-4B-Instruct** 는 **Biomedicine** 에서 **14.4%** 대 **10.0%** 로 LLM 모드를 크게 능가했고, 샌드박스 활용률이 증가하며 평균 턴 수가 **23.7턴에서 7.0턴으로 감소** 하는 효율성 향상을 보였습니다. 또한, 장문 맥락 태스크에서 **토큰 소비량을 최대 8배까지 감소** 시켰으며 (예: **100K → 13K 토큰** ), **MiniMax** 는 **2.2배** 의 쿼리 처리량(QPM) 속도 향상을 보였습니다. 이 프레임워크는 이미지, 비디오, 오디오와 같은 **실제 파일을 직접 생성** 하고 **도구를 자율적으로 습득** 하는 새로운 기능을 가능하게 합니다.

## AI 실무자를 위한 시사점
**LLM-in-Sandbox** 는 LLM을 단순한 텍스트 생성기를 넘어 **범용적인 디지털 작업자** 로 전환하는 강력한 패러다임을 제시합니다. AI/ML 엔지니어는 샌드박스 환경을 활용하여 **분석, 장문 맥락 처리, 크로스-모달 콘텐츠 생성** 등 복잡한 태스크를 더욱 효율적이고 신뢰성 있게 자동화할 수 있습니다. 특히, 대규모 문서를 파일 시스템을 통해 처리함으로써 **장문 맥락 이해 태스크의 토큰 비용을 크게 절감** 할 수 있는 실용적인 이점을 제공합니다. 또한, **LLM-in-Sandbox-RL** 은 특화된 에이전트 데이터 없이도 일반 데이터로 모델의 에이전트 능력을 향상시키고 일반화할 수 있는 효율적인 훈련 전략을 제공하여, 다양한 AI 애플리케이션 개발에 새로운 가능성을 열어줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.