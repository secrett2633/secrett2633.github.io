---
title: "[논문리뷰] The Confidence Dichotomy: Analyzing and Mitigating Miscalibration in Tool-Use Agents"
excerpt: "Junjue Wang이 [arXiv]에 게시한 'The Confidence Dichotomy: Analyzing and Mitigating Miscalibration in Tool-Use Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Calibration
  - Tool Use
  - Reinforcement Learning
  - Miscalibration
  - Overconfidence
  - Trustworthy AI

permalink: /ai/review/2026-01-14-The-Confidence-Dichotomy-Analyzing-and-Mitigating-Miscalibration-in-Tool-Use-Agents/

toc: true
toc_sticky: true

date: 2026-01-14 00:00:00+0900+0900
last_modified_at: 2026-01-14 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.07264)

**저자:** Weihao Xuan, Qingcheng Zeng, Heli Qi, Yunze Xiao, Junjue Wang, Naoto Yokoya



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM) 기반 자율 에이전트의 신뢰성을 높이기 위해, 도구 사용 환경에서 발생하는 **verbalized calibration(언어화된 확신)** 의 문제를 분석하고 완화하는 것을 목표로 합니다. 특히, 도구 유형에 따른 에이전트의 확신 표현 방식 변화, 즉 **confidence dichotomy(확신 이분법)** 를 체계적으로 연구하고 과도한 확신(overconfidence)을 줄이는 방법을 제시합니다.

## 핵심 방법론
연구는 파일럿 스터디를 통해 **증거 도구(evidence tools, 예: 웹 검색)** 가 과도한 확신을 유발하는 반면, **검증 도구(verification tools, 예: 코드 인터프리터)** 는 추론을 근거 지어 오정확도를 완화함을 밝힙니다. 이러한 문제 해결을 위해 **Calibration Agentic RL (CAR)** 프레임워크를 제안하고, **Margin-Separated Calibration Reward (MSCR)** 를 도입하여 태스크 정확도와 캘리브레이션을 동시에 최적화하는 **강화 학습(RL) 기반 미세 조정** 을 수행했습니다.

## 주요 결과
**CAR 프레임워크** 는 모든 백본 모델에서 **Expected Calibration Error(ECE)를 최대 68%** 까지, **AUROC는 최대 17%** 까지 상대적으로 감소시키며 뛰어난 캘리브레이션 개선을 달성했습니다. 특히, **MSCR 보상 설계** 는 정확도와 캘리브레이션 간의 우수한 균형을 보여주었으며, 시뮬레이션 환경에서 학습된 캘리브레이션 능력이 노이즈가 많은 실제 **API 기반 웹 검색 환경** 과 **도구 통합 수학적 추론 태스크** 에서도 성공적으로 일반화됨을 입증했습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 LLM 에이전트 개발 시 **도구 유형에 따른 캘리브레이션 전략** 을 고려해야 합니다. 특히 웹 검색과 같은 **증거 도구** 는 에이전트에게 과도한 확신을 유발할 수 있으므로, **CAR 프레임워크** 와 같은 **강화 학습 기반 미세 조정** 을 통해 캘리브레이션 성능을 적극적으로 개선해야 합니다. 이를 통해 에이전트의 신뢰성을 높이고, 고위험 실세계 배포에서 불확실성을 보다 신뢰성 있게 전달할 수 있는 **자기 인식 에이전트(self-aware agents)** 구축의 토대를 마련할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.