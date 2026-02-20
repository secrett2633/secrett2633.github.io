---
title: "[논문리뷰] LatentMem: Customizing Latent Memory for Multi-Agent Systems"
excerpt: "Zefeng He이 arXiv에 게시한 'LatentMem: Customizing Latent Memory for Multi-Agent Systems' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-Agent Systems
  - LLM Memory
  - Latent Representation
  - Role-Aware
  - Token Efficiency
  - Policy Optimization
  - Continual Adaptation

permalink: /ai/review/2026-02-06-LatentMem-Customizing-Latent-Memory-for-Multi-Agent-Systems/

toc: true
toc_sticky: true

date: 2026-02-06 00:00:00+0900+0900
last_modified_at: 2026-02-06 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.03036)

**저자:** Zefeng He, Yafu Li, Xiangyuan Xue, Guibin Zhang, Muxin Fu



## 핵심 연구 목표
본 논문은 LLM 기반 멀티 에이전트 시스템(MAS)의 메모리 설계가 겪는 두 가지 근본적인 문제, 즉 (i) 역할 인지적 맞춤화 부재로 인한 **메모리 동질화** 와 (ii) 과도하게 세분화된 메모리 항목으로 인한 **정보 과부하** 를 해결하고자 합니다. 이를 통해 에이전트별 메모리를 토큰 효율적으로 맞춤화할 수 있는 학습 가능한 프레임워크를 개발하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 **LatentMem** 프레임워크는 경량의 **경험 은행(Experience Bank)** 과 **메모리 컴포저(Memory Composer)** 로 구성됩니다. 경험 은행은 원시 상호작용 궤적을 저장하고, 메모리 컴포저는 검색된 경험과 에이전트별 컨텍스트를 기반으로 압축된 **잠재 메모리(latent memories)** 를 합성합니다. **잠재 메모리 정책 최적화(LMPO)** 는 이 잠재 메모리를 통해 태스크 레벨 최적화 신호를 컴포저로 전파하여, 압축되고 유용한 표현을 생성하도록 학습시킵니다.

## 주요 결과
**LatentMem** 은 바닐라 설정 대비 최대 **19.36%** 의 성능 향상을 달성했으며, 기존 메모리 아키텍처를 일관되게 능가했습니다. 특히, 지식 QA 태스크에서 **16.20%** , 코드 생성 태스크에서 **18.45%** 성능이 향상되었습니다. 또한, 주류 메모리 설계 대비 **50% 적은 토큰** 을 사용하고 추론 시간을 **약 2/3** 로 단축하여 높은 효율성을 입증했습니다. PDDL과 같은 외부 도메인 데이터셋에서 **7.10%** 개선, CAMEL과 같은 미사용 MAS에서 **7.90%** 개선을 통해 강력한 일반화 성능을 보였습니다.

## AI 실무자를 위한 시사점
**LatentMem** 은 LLM 기반 MAS의 **성능, 효율성 및 일반화 능력** 을 혁신적으로 개선할 수 있는 실용적인 솔루션을 제공합니다. 특히 **토큰 효율적인 잠재 메모리** 와 **역할 인지적 맞춤화** 는 복잡하고 장기적인 AI 태스크에서 MAS의 비용 효율적인 운영과 견고한 협업을 가능하게 합니다. 이는 실제 AI 어플리케이션에서 MAS의 **지속적인 적응** 과 **더욱 일관된 조정** 을 지원하는 핵심 메커니즘으로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.