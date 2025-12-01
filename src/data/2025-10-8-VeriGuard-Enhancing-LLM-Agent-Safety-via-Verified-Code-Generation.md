---
title: "[논문리뷰] VeriGuard: Enhancing LLM Agent Safety via Verified Code Generation"
excerpt: "이 [arXiv]에 게시한 'VeriGuard: Enhancing LLM Agent Safety via Verified Code Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Safety
  - Formal Verification
  - Code Generation
  - Runtime Monitoring
  - Security
  - Guardrails
  - Policy Enforcement

permalink: /ai/review/2025-10-8-VeriGuard-Enhancing-LLM-Agent-Safety-via-Verified-Code-Generation/

toc: true
toc_sticky: true

date: 2025-10-08 13:48:12+0900
last_modified_at: 2025-10-08 13:48:12+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.05156)

**저자:** Lesly Miculicich, Mihir Parmar, Hamid Palangi, Krishnamurthy Dj Dvijotham, Mirko Montanari, Tomas Pfister, Long T. Le



## 핵심 연구 목표
본 논문은 자율 AI 에이전트, 특히 LLM 기반 에이전트의 배포로 인해 발생하는 안전, 보안, 프라이버시 위험을 해결하고자 합니다. 기존의 반응적이거나 패턴 매칭 기반의 안전 메커니즘이 복잡하고 예측 불가능한 공격에 취약하다는 한계를 지적하며, 에이전트의 행동이 사전 정의된 안전 제약 조건을 **형식적으로 준수함** 을 보장하는 신뢰성 높은 프레임워크를 제공하는 것을 목표로 합니다.

## 핵심 방법론
VeriGuard는 LLM 에이전트의 안전을 강화하기 위한 **이중 단계 아키텍처** 를 제안합니다. 첫 번째 **오프라인 정책 생성 단계** 에서는 LLM이 사용자 요청과 에이전트 사양을 바탕으로 **행동 정책 코드** 와 이에 상응하는 **형식적 제약 조건(pre-conditions 및 post-conditions)** 을 합성합니다. 이 정책은 **자동화된 코드 테스트(PyTest)** 와 **형식 검증(Nagini verifier)** 을 거쳐 사양 준수 여부를 검증하며, 실패 시 **구체적인 반례** 를 피드백하여 정책을 반복적으로 개선합니다. 두 번째 **온라인 정책 적용 단계** 에서는 검증된 정책을 런타임 모니터로 통합하여 에이전트의 각 행동을 실행 전 검증하고, 위반 감지 시 **작업 종료(Task Termination)** , **행동 차단(Action Blocking)** , **도구 실행 중단(Tool Execution Halt)** , **협력적 재계획(Collaborative Re-planning)** 등의 전략으로 대응합니다.

## 주요 결과
**ASB(Agent Security Bench) 벤치마크** 실험에서 VeriGuard는 **모든 공격 유형(DPI, IPI, MP, PoT)** 에 대해 **공격 성공률(ASR)을 0%** 로 감소시키는 동시에, **작업 성공률(TSR)을 평균 63.3%(Gemini-2.5-Flash 기준)** 로 높게 유지하여 강력한 보안성과 실용성을 입증했습니다. **EICU-AC 및 Mind2Web-SC 벤치마크** 에서는 **100%의 정확도, 정밀도, 재현율(GPT-4o 기준)** 을 달성하며 기존 SOTA 접근 방식들을 능가했습니다. 특히 **협력적 재계획과 도구 실행 중단(CRP + TEH)의 조합** 은 **평균 ASR 0.1%** 와 **평균 TSR 63.6%** 를 기록하며 최적의 보안-유틸리티 균형을 보여주었습니다.

## AI 실무자를 위한 시사점
VeriGuard는 LLM 에이전트의 안전 문제를 해결하기 위한 **사전 예방적이고 증명 가능한 접근 방식** 을 제공하여, 고위험 환경에서 LLM 에이전트 배포의 신뢰성을 크게 향상시킬 수 있습니다. AI 실무자들은 VeriGuard의 **형식 검증된 코드 생성** 및 **다양한 정책 적용 전략** 을 활용하여 에이전트의 행동을 엄격하게 제어하고 공격 표면을 최소화할 수 있습니다. 단, LLM이 형식 제약 조건을 생성하는 과정의 비결정성 및 underlying 프로그램 검증 도구의 한계는 향후 연구를 통해 개선될 수 있는 부분입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.