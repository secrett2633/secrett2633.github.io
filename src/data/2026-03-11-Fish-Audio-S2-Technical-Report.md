---
title: "[논문리뷰] Fish Audio S2 Technical Report"
excerpt: "arXiv에 게시된 'Fish Audio S2 Technical Report' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Text-to-Speech (TTS)
  - Multi-speaker
  - Multi-turn
  - Instruction Following
  - Dual-Autoregressive
  - Reinforcement Learning (RL)
  - Data Pipeline
  - SGLang

permalink: /ai/review/2026-03-11-Fish-Audio-S2-Technical-Report/

toc: true
toc_sticky: true

date: 2026-03-11 00:00:00+0900+0900
last_modified_at: 2026-03-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.08823)

**저자:** Shijia Liao, Yuxuan Wang, Songting Liu, Yifan Cheng, Ruoyi Zhang, Tianyu Li, Shidong Li, Yisheng Zheng, Xingwei Liu, Qingzheng Wang, Zhizhuo Zhou, Jiahua Liu, Xin Chen, Dawei Han



## 핵심 연구 목표
본 논문은 기존 TTS 시스템의 한계를 극복하여, 자연어 지시를 따르는 **세밀한 제어(fine-grained control)** , **다중 화자 및 다중 턴(multi-speaker, multi-turn) 생성** , 그리고 **장문 합성(long-form synthesis)** 을 지원하는 오픈소스 TTS 시스템인 **Fish Audio S2** 를 개발하는 것을 목표로 합니다. 특히, 대규모 데이터 큐레이션 및 RL 기반 정렬을 통해 제어 가능성, 자연스러움, 견고성을 향상시키는 데 중점을 둡니다.

## 핵심 방법론
**Fish Audio S2** 는 **Dual-Autoregressive (Dual-AR) 아키텍처** 를 채택하여 시간적 의미 모델링과 심층 음향 모델링을 분리합니다. 이는 **Qwen3-4B** 기반의 **Slow AR** 이 의미 토큰을, 경량 **Fast AR** 이 세부 음향 토큰을 생성하는 방식으로 구현됩니다. 데이터 측면에서는 **Multi-Purpose Data Pipeline** 을 통해 음성 품질 모델과 풍부한 전사 ASR 모델을 데이터 필터링, 주석 및 **RL 정렬을 위한 보상 신호** 로 재활용하여 분포 불일치를 제거합니다. 또한, **GRPO(Group Relative Policy Optimization) 변형** 을 활용한 **Multi-Reward RL Alignment** 로 의미 정확도, 음향 품질, 화자 유사성을 최적화합니다.

## 주요 결과
**Fish Audio S2** 는 생산 환경에서 **0.195의 Real-Time Factor (RTF)** 와 **100ms 미만의 Time-to-First-Audio (TTFA)** 를 달성하여 업계 최고 수준의 성능을 입증했습니다. 객관적 평가에서 Seed-TTS-Eval 벤치마크에서 **선도적인 WER/CER** 을 기록했으며, Audio Turing Test에서 명령 재작성 시 **0.515의 사후 평균** 으로 SOTA를 능가했습니다. EmergentTTS-Eval에서는 **81.88%의 전체 승률** 을, Fish Audio Instruction Benchmark에서는 **93.3%의 태그 활성화율** 을 보였습니다.

## AI 실무자를 위한 시사점
**Fish Audio S2** 는 자연어 설명으로 **세밀한 음성 제어** 가 가능하며, **실시간 스트리밍** 및 **다중 화자/다중 턴 대화 생성** 을 지원하여 챗봇, 오디오북, 비디오 더빙 등 다양한 AI 애플리케이션에 혁신적인 솔루션을 제공합니다. **SGLang 기반의 추론 엔진** 과 공개된 모델 가중치 및 코드들은 AI 엔지니어가 고품질 TTS 시스템을 쉽게 개발하고 배포할 수 있도록 지원합니다. **듀얼-AR 아키텍처** 와 **RL 정렬 프레임워크** 는 미래 TTS 연구 및 개발 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.