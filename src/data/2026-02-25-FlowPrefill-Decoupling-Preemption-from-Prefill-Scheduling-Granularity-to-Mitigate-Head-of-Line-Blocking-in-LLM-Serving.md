---
title: "[논문리뷰] FlowPrefill: Decoupling Preemption from Prefill Scheduling Granularity to Mitigate Head-of-Line Blocking in LLM Serving"
excerpt: "Jidong Zhai이 [arXiv]에 게시한 'FlowPrefill: Decoupling Preemption from Prefill Scheduling Granularity to Mitigate Head-of-Line Blocking in LLM Serving' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Serving
  - Head-of-Line Blocking
  - Preemption
  - Prefill Scheduling
  - Time-to-First-Token (TTFT)
  - SLO-aware Scheduling
  - Operator-Level Preemption
  - Event-Driven Scheduling

permalink: /ai/review/2026-02-25-FlowPrefill-Decoupling-Preemption-from-Prefill-Scheduling-Granularity-to-Mitigate-Head-of-Line-Blocking-in-LLM-Serving/

toc: true
toc_sticky: true

date: 2026-02-25 00:00:00+0900+0900
last_modified_at: 2026-02-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.16603)

**저자:** Chia-chi Hsieh, Zan Zong, Xinyang Chen, Jianjiang Li, Jidong Zhai, Lijie Wen



## 핵심 연구 목표
본 논문은 LLM 서빙 시스템에서 컴퓨팅 집약적인 **프리필(prefill) 단계** 중 발생하는 **헤드-오브-라인(Head-of-Line, HoL) 블로킹 문제** 를 해결하고자 합니다. 이는 긴 프롬프트 요청이 리소스를 독점하여 짧고 우선순위가 높은 요청의 **Time-to-First-Token (TTFT) SLO** 위반을 야기하는 문제로, 기존 고정된 **청크(chunk) 기반** 또는 **레이어(layer) 기반** 스케줄링의 응답성과 처리량 간의 상충 관계를 극복하고, 다양한 **서비스 수준 목표(SLO)** 를 만족시키는 것을 목표로 합니다.

## 핵심 방법론
FlowPrefill은 **프리엠션(preemption) 세분성** 과 **스케줄링 빈도** 를 분리하여 이 문제를 해결합니다. 이를 위해 두 가지 핵심 기술인 **Operator-Level Preemption** 과 **Event-Driven Scheduling** 을 도입합니다. **Operator-Level Preemption** 은 **모델의 자연스러운 연산자 경계** 를 활용하여 미세한 수준에서 실행을 중단할 수 있게 하며, **Event-Driven Scheduling** 은 요청 도착 또는 완료 시에만 스케줄링을 트리거하여 오버헤드를 최소화하고 **Slack-aware Earliest-Deadline-First (S-EDF)** 정책 및 **SLO-aware 배칭 전략** 으로 우선순위와 처리량을 최적화합니다.

## 주요 결과
FlowPrefill은 실세계 프로덕션 트레이스( **QwenTrace** )를 사용한 평가에서, 기존 시스템( **DistServe** ) 대비 **최대 5.6배 높은 최대 처리량(goodput)** 을 달성했습니다. 또한, **3.1배 더 엄격한 SLO** 를 만족하며, **레이어 수준 프리엠션** 과 비교하여 평균 **프리엠션 블로킹 시간** 을 **3.5배에서 4.2배** 까지 감소시켜 모든 관찰된 지연 시간을 **4.5ms 미만** 으로 유지했습니다. FlowPrefill은 **vLLM** 과의 비교에서도 상당한 지연 시간 개선을 보여주며, **MoE 모델 (Qwen3-30B-A3B)** 에서도 최대 **1.6배 높은 goodput** 과 **2.4배 더 엄격한 SLO 달성** 을 입증했습니다.

## AI 실무자를 위한 시사점
FlowPrefill은 AI 실무자들에게 **LLM 서빙의 응답성과 효율성** 을 크게 향상시킬 수 있는 실질적인 방안을 제시합니다. **연산자 수준 프리엠션** 은 **미세한 제어** 를 가능하게 하여 **사용자 경험(TTFT)** 을 개선하고, **이벤트 기반 스케줄링** 은 **제어 평면 오버헤드** 를 줄여 시스템의 **처리량** 을 극대화합니다. 이 시스템은 **다양한 규모의 LLM** (예: **Llama3-8B** , **Qwen2.5-14B** , **Llama3-70B** ) 및 **MoE 모델** 에서도 효과적이므로, **생산 환경에서의 LLM 배포** 시 **HoL 블로킹** 을 완화하고 **SLO 준수율** 을 높이는 데 중요한 기술적 토대가 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.