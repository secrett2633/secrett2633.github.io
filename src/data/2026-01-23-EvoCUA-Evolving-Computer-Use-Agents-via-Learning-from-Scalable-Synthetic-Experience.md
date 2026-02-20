---
title: "[논문리뷰] EvoCUA: Evolving Computer Use Agents via Learning from Scalable Synthetic Experience"
excerpt: "Linsen Guo이 arXiv에 게시한 'EvoCUA: Evolving Computer Use Agents via Learning from Scalable Synthetic Experience' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Computer Use Agent
  - Synthetic Experience
  - Evolutionary Learning
  - Reinforcement Learning
  - Direct Preference Optimization
  - GUI Automation
  - Scalable Infrastructure
  - Verifiable Synthesis

permalink: /ai/review/2026-01-23-EvoCUA-Evolving-Computer-Use-Agents-via-Learning-from-Scalable-Synthetic-Experience/

toc: true
toc_sticky: true

date: 2026-01-23 00:00:00+0900+0900
last_modified_at: 2026-01-23 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.15876)

**저자:** Taofeng Xue, Chong Peng, Mianqiu Huang, Linsen Guo, Tiancheng Han, Haozhe Wang, Jianing Wang, Xiaocheng Zhang, Xin Yang, Dengchang Zhao, Jinrui Ding, Xiandi Ma, Yuchen Xie, Peng Pei, Xunliang Cai, Xipeng Qiu



## 핵심 연구 목표
본 논문은 정적 데이터 스케일링의 한계로 인해 장기적인 컴퓨터 사용 작업에서 복잡한 인과적 역학을 포착하는 데 어려움을 겪는 **네이티브 컴퓨터 사용 에이전트(CUA)** 의 문제를 해결하고자 합니다. 정적인 모방 학습을 넘어 데이터 생성과 정책 최적화를 자체 지속적인 진화 주기로 통합하여 높은 신뢰성을 갖춘 에이전트 역량을 개발하는 것이 주된 목표입니다.

## 핵심 방법론
**EvoCUA** 는 **검증 가능한 합성 엔진** , **확장 가능한 상호작용 인프라** , 그리고 **경험을 통한 진화적 학습 패러다임** 의 세 가지 핵심 모듈을 통합합니다. **검증 가능한 합성 엔진** 은 실행 가능한 검증자와 함께 다양한 작업을 자율적으로 생성하며, **확장 가능한 인프라** 는 수만 개의 비동기 롤아웃을 조율합니다. **진화적 학습** 은 **Rejection Sampling Fine-Tuning(RFT)** 으로 성공적인 루틴을 통합하고, **Step-Level Direct Preference Optimization(DPO)** 을 통해 실패 궤적을 수정하며 지속적으로 정책을 최적화합니다.

## 주요 결과
**OSWorld 벤치마크** 에서 **EvoCUA-32B** 는 **56.7%** 의 성공률을 달성하며 오픈-웨이트 모델 중 새로운 SOTA(State-of-the-Art) 성능을 수립했습니다. 이는 이전 최고 오픈소스 모델인 **OpenCUA-72B (45.0%)** 를 **11.7%p** , 선도적인 클로즈드-웨이트 모델인 **UI-TARS-2 (53.1%)** 를 **3.6%p** 능가하는 결과입니다. 또한, **EvoCUA-8B** 는 **OpenCUA-72B** 보다 높은 **46.1%** 의 성공률을 보여, 본 접근 방식의 모델 스케일 전반에 걸친 일반화 가능성을 입증했습니다.

## AI 실무자를 위한 시사점
**EvoCUA** 는 고품질의 합성 경험을 통해 에이전트의 역량을 지속적으로 발전시키는 강력한 프레임워크를 제공합니다. 이는 **대규모 언어 모델(LLM)** 기반 에이전트가 실제 컴퓨터 사용 환경에서 직면하는 복잡한 문제를 해결하는 데 있어 중요한 전환점을 제시합니다. 특히 **검증 가능한 데이터 합성** , **확장 가능한 인프라** , 그리고 **DPO** 와 **RFT** 를 활용한 **진화적 학습 전략** 은 AI 에이전트의 견고성과 일반화 능력을 향상시키는 데 실용적인 가이드를 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.