---
title: "[논문리뷰] Feedback-Driven Tool-Use Improvements in Large Language Models via
  Automated Build Environments"
excerpt: "Xuesong Yao이 [arXiv]에 게시한 'Feedback-Driven Tool-Use Improvements in Large Language Models via
  Automated Build Environments' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models (LLMs)
  - Tool Use
  - Reinforcement Learning (RL)
  - Automated Environment Generation
  - Feedback-Driven Training
  - Reward Mechanism
  - Contextual Understanding

permalink: /ai/review/2025-8-13-Feedback-Driven-Tool-Use-Improvements-in-Large-Language-Models-via-Automated-Build-Environments/

toc: true
toc_sticky: true

date: 2025-08-13 13:29:23+0900
last_modified_at: 2025-08-13 13:29:23+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.08791)

**저자:** Junjie Ye, Changhao Jiang, Zhengyin Du, Yufei Xu, Xuesong Yao, Zhiheng Xi, Xiaoran Fan, Qi Zhang, Xuanjing Huang, Jiecao Chen



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLMs)의 효율적인 도구 사용(tool use) 학습을 위한 **강화 학습(RL) 프레임워크** 부재 문제를 해결하고자 합니다. 특히, 안정적인 훈련 환경 구축의 어려움과 검증 가능한 보상 메커니즘의 부재가 LLM의 도구 사용 능력 발전을 저해하는 핵심 과제로 지적됩니다.

## 핵심 방법론
저자들은 외부 도구에 의존하지 않는 **자동화된 환경 구축 파이프라인**을 제안합니다. 이 파이프라인은 시나리오 분해, 문서 생성, 함수 통합, 복잡도 확장, 지역 배포의 **5단계**로 구성되어, 모든 도구를 코드로 로컬에서 실행하여 안정적인 환경과 제어된 피드백을 제공합니다. 또한, 도구 사용의 **정확도**와 작업 **완성도**를 평가하는 **검증 가능한 보상 메커니즘**을 도입하여 **선호도 기반 RL 알고리즘**과 원활하게 통합시켰습니다.

## 주요 결과
다양한 규모의 **LLM**에 대한 광범위한 실험 결과, 본 방법론은 **4가지 벤치마크(Ours, ToolHop, T-bench, RoTBench)**에서 모델의 도구 사용 성능을 일관되게 향상시켰으며, **일반적인 능력은 저하되지 않았습니다.** 특히, **Qwen2.5-7B** 모델의 Solve-F1 점수는 Instruct 버전의 **25.97**에서 **FTRL-Reinforce++** 적용 시 **40.36**으로 크게 개선되었습니다. 분석 결과, 이러한 성능 향상은 주로 모델의 **하위 계층 MLP 매개변수** 업데이트를 통해 이루어지며, 이는 모델의 **컨텍스트 이해 및 추론 능력** 강화에 기여했음을 시사합니다.

## AI 실무자를 위한 시사점
본 연구는 외부 서비스 의존성 없이 **안정적이고 확장 가능한 LLM 도구 사용 훈련 환경**을 구축하는 실용적인 방법을 제시합니다. **검증 가능한 피드백**과 **자동화된 보상 메커니즘**을 통해 효율적인 **피드백 기반 학습**을 가능하게 하여, AI/ML 엔지니어들이 복잡한 실제 시나리오에서 LLM의 도구 활용 성능을 효과적으로 개선할 수 있는 기반을 제공합니다. 또한, 모델의 **하위 계층 MLP**가 컨텍스트 이해에 핵심적인 역할을 한다는 통찰은 향후 모델 최적화 방향에 중요한 단서를 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.