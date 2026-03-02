---
title: "[논문리뷰] Learning from Trials and Errors: Reflective Test-Time Planning for Embodied LLMs"
excerpt: "Jiajun Wu이 arXiv에 게시한 'Learning from Trials and Errors: Reflective Test-Time Planning for Embodied LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Embodied LLMs
  - Test-Time Adaptation
  - Reflection-in-Action
  - Reflection-on-Action
  - Robotics
  - Long-Horizon Planning
  - Policy Gradient
  - Self-Supervised Learning

permalink: /ai/review/2026-02-25-Learning-from-Trials-and-Errors-Reflective-Test-Time-Planning-for-Embodied-LLMs/

toc: true
toc_sticky: true

date: 2026-02-25 00:00:00+0900+0900
last_modified_at: 2026-02-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.21198)

**저자:** Yining Hong, Huang Huang, Manling Li, Li Fei-Fei, Jiajun Wu, Yejin Choi



## 핵심 연구 목표
본 논문은 기존 Embodied LLM이 고정된 오라클로서 실패로부터 학습하거나 경험을 축적하지 못하여 반복적인 실수를 초래하는 문제를 해결하고자 합니다. 인간의 회고적 실천가 개념에서 영감을 받아, **반성적 테스트-시간 계획(Reflective Test-Time Planning)** 프레임워크를 도입하여 LLM이 시험과 오류로부터 학습하고 행동의 근본 원인을 수정하도록 하는 것이 목표입니다.

## 핵심 방법론
제안하는 프레임워크는 **액션 생성 모델(πθ)** , **내부 평가자(Vφi)** , **외부 평가자(Vφe)** 세 가지 LLM을 통합합니다. **reflection-in-action** 단계에서는 에이전트가 여러 후보 액션을 시뮬레이션하고 점수를 매긴 후 최적의 액션을 선택하며, **reflection-on-action** 단계에서는 액션 실행 후 외부 반성을 통해 환경에 대한 믿음과 행동 전략을 업데이트합니다. 특히, 과거 결정을 회고적으로 재평가하는 **회고적 반성(retrospective reflection)** 을 통해 **정책 경사(policy gradient)** 와 **지도 학습(supervised learning)** 신호를 생성하여 모델 파라미터를 업데이트합니다.

## 주요 결과
새롭게 설계된 **Long-Horizon Household 벤치마크** 에서 제안된 모델은 Fitting 태스크에서 **44.7%의 성공률** 을 달성하며, 가장 강력한 baseline인 **3DLLM-Mem (10.6%)** 대비 상당한 성능 향상을 보였습니다. **MuJoCo Cupboard Fitting 벤치마크** 에서는 **60.2%의 fit rate** 와 **25.3%의 correct rate** 를 기록했습니다. 특히, **reflection-in-action** 과 **reflection-on-action** 이 상호 보완적이며, 둘 중 하나라도 제거 시 성능이 크게 저하됨이 입증되었습니다.

## AI 실무자를 위한 시사점
이 연구는 **배포 시점에 LLM 기반 로봇이 스스로 학습하고 적응** 할 수 있는 강력한 프레임워크를 제공하여, 예측 불가능한 물리적 환경에서 **반복적인 실패를 줄이고 견고성을 향상** 시키는 데 기여합니다. **LoRA 기반의 테스트-시간 훈련** 은 효율적인 모델 적응을 가능하게 하며, 이는 복잡하고 장기적인 로봇 작업을 위한 **차세대 적응형 AI 시스템** 개발에 중요한 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.