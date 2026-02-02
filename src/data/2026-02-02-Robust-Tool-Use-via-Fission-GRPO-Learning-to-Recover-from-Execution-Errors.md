---
title: "[논문리뷰] Robust Tool Use via Fission-GRPO: Learning to Recover from Execution Errors"
excerpt: "Bin Liang이 [arXiv]에 게시한 'Robust Tool Use via Fission-GRPO: Learning to Recover from Execution Errors' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Tool Use
  - Execution Errors
  - Error Recovery
  - Reinforcement Learning
  - LLMs
  - Agentic AI
  - GRPO
  - FISSION

permalink: /ai/review/2026-02-02-Robust-Tool-Use-via-Fission-GRPO-Learning-to-Recover-from-Execution-Errors/

toc: true
toc_sticky: true

date: 2026-02-02 00:00:00+0900+0900
last_modified_at: 2026-02-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.15625)

**저자:** Zhiwei Zhang, Fei Zhao, Rui Wang, Zezhong Wang, Bin Liang, Jiakang Wang, Yao Hu, Shaosheng Cao, Kam-Fai Wong



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLMs), 특히 소형 LLMs가 다중 턴 도구 실행에서 발생하는 실행 오류로부터 취약하고, 오류 발생 시 반복적인 무효 호출에 빠지는 문제를 해결하고자 합니다. 기존의 강화 학습(RL) 방법론이 오류를 단순한 희소한 음의 보상으로 처리하여 복구 가이드라인을 제공하지 못하고, 정적 오류 수정 데이터셋이 모델의 온-정책 오류 모드와 분포 불일치를 겪는 한계를 극복하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **FISSION-GRPO** 라는 프레임워크를 제안하여 실행 오류를 RL 훈련 루프 내에서 **밀집된 온-정책 교정 감독** 으로 변환합니다. 이 프레임워크는 세 단계로 작동합니다: 첫째, **표준 GRPO 탐색** 을 통해 일반적인 도구 사용 능력을 최적화합니다. 둘째, 실패한 롤아웃을 **파인튜닝된 오류 시뮬레이터** 로부터 얻은 진단 피드백으로 보강하여 교정 샘플을 생성합니다. 셋째, **핵분열(fission) 기반 업데이트** 를 통해 각 오류를 여러 개의 병렬 복구 시도로 재샘플링하여 관찰된 오류 주변의 훈련 신호를 밀집시킵니다.

## 주요 결과
**BFCL v4 Multi-Turn 벤치마크** 에서, FISSION-GRPO는 **Qwen3-8B** 모델의 오류 복구율을 **5.7% 절대값** 으로 향상시켰습니다. 이는 **GRPO** 대비 **4%의 전체 정확도 향상(42.75% → 46.75%)** 으로 이어졌으며, 다른 GRPO 기반 베이스라인( **GRPO, DAPO, Dr.GRPO** )과 전문화된 8B 스케일 도구 에이전트( **ToolACE, BitAgent** )를 모든 **Qwen3 모델 스케일(1.7B, 4B, 8B)** 에서 일관되게 능가했습니다. 특히, "Missing Param" 및 "Long Context" 오류에서 상당한 개선을 보였습니다.

## AI 실무자를 위한 시사점
**FISSION-GRPO** 는 에이전트 AI 시스템을 위한 **더욱 견고하고 신뢰할 수 있는 소형 언어 모델** 을 구축하는 실용적인 접근 방식을 제공하며, 실제 배포의 핵심 병목 현상을 해결합니다. 온-정책 오류로부터 직접 학습하고 시뮬레이션된 피드백 루프를 통해 구체적인 복구 전략을 생성하는 이 프레임워크의 능력은 복잡하고 오류 발생 가능성이 높은 환경에서 에이전트를 훈련하는 데 귀중한 패러다임을 제시합니다. 이러한 실행 오류를 **밀집된 교정 감독** 으로 변환하는 방법론은 코드 디버깅이나 수학적 추론과 같은 다른 반복적 개선 도메인에도 일반화될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.