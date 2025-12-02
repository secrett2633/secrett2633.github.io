---
title: "[논문리뷰] SCALE: Selective Resource Allocation for Overcoming Performance Bottlenecks in Mathematical Test-time Scaling"
excerpt: "이 [arXiv]에 게시한 'SCALE: Selective Resource Allocation for Overcoming Performance Bottlenecks in Mathematical Test-time Scaling' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Reasoning
  - Test-time Scaling
  - Resource Allocation
  - Dual-process Theory
  - Mathematical Reasoning
  - Adaptive Computation
  - Performance Optimization

permalink: /ai/review/2025-12-02-SCALE-Selective-Resource-Allocation-for-Overcoming-Performance-Bottlenecks-in-Mathematical-Test-time-Scaling/

toc: true
toc_sticky: true

date: 2025-12-02 00:00:00+0900+0900
last_modified_at: 2025-12-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.00466)

**저자:** Yang Xiao, Chunpu Xu, Ruifeng Yuan, Jiashuo Wang, Wenjie Li, Pengfei Liu



## 핵심 연구 목표
이 논문은 대규모 언어 모델(LLMs)의 수학적 추론 과정에서 발생하는 성능 병목 현상을 해결하는 것을 목표로 합니다. 기존 테스트-시간 컴퓨팅 스케일링 방법론들이 모든 추론 하위 문제에 자원을 균일하게 할당하여 복잡한 문제에는 자원이 부족하고 단순한 문제에는 과도한 자원이 할당되는 "과도한 생각(overthinking)" 문제를 극복하고자 합니다.

## 핵심 방법론
연구는 인지 과학의 이중 과정 이론(dual-process theory)에서 영감을 받은 **SCALE (Selective Resource Allocation)** 프레임워크를 제안합니다. 이 프레임워크는 (1) 문제를 순차적인 하위 문제로 분해하고, (2) 각 하위 문제의 난이도를 평가하며, (3) 난이도 임계값에 따라 단순한 문제에는 **System 1 (빠르고 자동)** , 복잡한 문제에는 **System 2 (느리고 의도적)** 처리 모드를 동적으로 할당합니다. 마지막으로 (4) 완전한 맥락 전파와 함께 하위 문제들을 순차적으로 실행하여 효율적인 자원 할당을 가능하게 합니다.

## 주요 결과
SCALE은 균일 스케일링 기준선 대비 상당한 성능 향상을 달성했습니다. 특히 **Qwen3-32B 모델** 의 경우 **AIME25** 데이터셋에서 정확도를 **13.75%p (57.50%에서 71.25%)** 향상시켰으며, **InftyThink** 와 비교하여 컴퓨팅 비용(토큰 사용량)을 **33-53% 절감** 했습니다. 또한, 비추론 모델의 성능을 향상시키기 위한 미세 조정 데이터 생성 도구로서 **Llama3.3-70B-Instruct** 의 **AIME24** 정확도를 **38.93%p (24.58%에서 63.51%)** 개선하는 등 다양한 모델 아키텍처에서 뛰어난 일반화 능력을 보였습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 SCALE을 활용하여 LLM 기반 수학적 추론 시스템의 효율성과 정확도를 동시에 개선할 수 있습니다. 특히 컴퓨팅 자원이 제한적이거나 고성능이 요구되는 환경에서 **세분화된 자원 할당 전략** 은 매우 유용하며, **System 1/System 2 모드 전환** 과 **난이도 임계값(difficulty threshold)** 조정을 통해 다양한 컴퓨팅 예산 및 정확도 요구사항에 맞춰 모델 동작을 유연하게 최적화할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.