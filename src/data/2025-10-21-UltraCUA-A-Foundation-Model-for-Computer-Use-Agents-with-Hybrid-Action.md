---
title: "[논문리뷰] UltraCUA: A Foundation Model for Computer Use Agents with Hybrid Action"
excerpt: "arXiv에 게시된 'UltraCUA: A Foundation Model for Computer Use Agents with Hybrid Action' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Computer Use Agents
  - Hybrid Action
  - Foundation Models
  - Reinforcement Learning
  - Supervised Fine-tuning
  - Synthetic Data Generation
  - Tool Learning
  - GUI Automation

permalink: /ai/review/2025-10-21-UltraCUA-A-Foundation-Model-for-Computer-Use-Agents-with-Hybrid-Action/

toc: true
toc_sticky: true

date: 2025-10-21 13:08:30+0900
last_modified_at: 2025-10-21 13:08:30+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.17790)

**저자:** Yuhao Yang, Zhen Yang, Zi-Yi Dou, Anh Nguyen, Keen You, Omar Attia, Andrew Szot, Michael Feng, Ram Ramrakhya, Alexander Toshev, Chao Huang, Yinfei Yang, Zhe Gan



## 핵심 연구 목표
본 논문은 기존 컴퓨터 사용 에이전트(CUA)가 저수준 GUI 원시 액션에만 의존하여 발생하는 비효율성과 오류 전파 문제를 해결하고자 합니다. GUI 기본 동작과 고수준 프로그래밍 도구 호출을 원활하게 통합하는 **하이브리드 액션 메커니즘** 을 갖춘 **UltraCUA** 라는 파운데이션 모델을 제안하여, 실제 환경에서 보다 강력하고 효율적이며 통합된 컴퓨터 사용 자동화를 달성하는 것을 목표로 합니다.

## 핵심 방법론
**UltraCUA** 는 (1) 소프트웨어 문서, 오픈소스 및 코드 생성에서 도구를 자동 수집하는 **확장 가능한 도구 수집 파이프라인** , (2) 검증 가능한 **17,000개 이상의 합성 작업** 을 생성하는 듀얼 파이프라인 데이터 엔진, (3) 저수준 GUI와 고수준 프로그래밍 도구 호출을 결합한 **대규모 하이브리드 액션 궤적 데이터셋** , 그리고 (4) **지도 미세 조정(SFT)** 후 **온라인 강화 학습(RL)** 을 통한 **두 단계 훈련** 으로 구축됩니다. 특히, **<memory></memory> 워킹 메모리 메커니즘** 을 통해 컨텍스트를 유지하고 **GRPO** 기반의 RL 보상 함수가 도구 사용을 장려하여 전략적 액션 선택을 최적화합니다.

## 주요 결과
**OSWorld 벤치마크** 에서 **UltraCUA-7B** 는 15단계에서 **28.9%의 성공률** 을 달성하며 기존 7B 모델 대비 **23.5% 상대적 성능 향상** 을 보였습니다. **UltraCUA-32B** 는 **41.0%의 성공률** 로 **Claude 3.7 Sonnet (27.1%)** 및 **OpenAI CUA (26.0%)** 와 같은 최신 모델들을 능가했습니다. 또한, 윈도우 특정 훈련 없이 **WindowsAgentArena** 에서 **21.7%의 성공률** 을 기록하여 뛰어난 **크로스 플랫폼 일반화 능력** 을 입증했으며, **하이브리드 액션** 은 기존 시스템 대비 **14.9% 빠른 평균 단계 수** 로 효율성을 증명했습니다.

## AI 실무자를 위한 시사점
본 연구는 GUI 자동화의 한계를 극복하고 범용 컴퓨터 사용 에이전트의 개발에 새로운 방향을 제시하는 **하이브리드 액션 파운데이션 모델** 의 잠재력을 강조합니다. **자동화된 도구 수집** 과 **검증 가능한 합성 데이터 생성** 방법은 복잡한 실제 환경에서 에이전트 훈련을 위한 효율적인 데이터 전략을 제공합니다. 특히 **SFT와 온라인 RL의 결합** 은 AI 에이전트가 상황에 따라 최적의 액션 모드를 선택하도록 학습시키는 효과적인 패러다임을 보여주며, 이는 실제 AI 에이전트 시스템 설계에 중요한 고려사항이 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.