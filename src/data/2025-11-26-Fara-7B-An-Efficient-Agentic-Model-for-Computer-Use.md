---
title: "[논문리뷰] Fara-7B: An Efficient Agentic Model for Computer Use"
excerpt: "arXiv에 게시된 'Fara-7B: An Efficient Agentic Model for Computer Use' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Computer Use Agents
  - Synthetic Data Generation
  - Multi-modal LLM
  - On-device AI
  - Web Automation
  - Pixel-in Action-out
  - Fara-7B
  - WebTailBench

permalink: /ai/review/2025-11-26-Fara-7B-An-Efficient-Agentic-Model-for-Computer-Use/

toc: true
toc_sticky: true

date: 2025-11-26 00:00:00+0900+0900
last_modified_at: 2025-11-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.19663)

**저자:** Ahmed Awadallah⁺, Yash Lara, Raghav Magazine, Hussein Mozannar*, Akshay Nambi, Yash Pandya, Aravind Rajeswaran, Corby Rosset*, Alexey Taymanov*, Vibhav Vineet, Spencer Whitehead*, Andrew Zhao



## 핵심 연구 목표
본 논문은 컴퓨터 사용 에이전트(CUA) 훈련을 위한 **고품질 상호작용 데이터의 부족 문제** 를 해결하고, 적은 연산 자원으로 온디바이스에서 실행 가능한 **효율적인 에이전트 모델** 을 개발하는 것을 목표로 합니다. 이를 통해 CUA 기술의 상업적 활용 가능성을 확장하고 범용 개인 디지털 비서의 길을 열고자 합니다.

## 핵심 방법론
연구팀은 **FaraGen** 이라는 확장 가능한 합성 데이터 생성 엔진을 제안합니다. 이 엔진은 `Task Proposal`, `Task Solving` (Orchestrator 및 WebSurfer 에이전트를 포함한 **멀티-에이전트 시스템** 사용), `Trajectory Verification` (Alignment, Rubric, Multimodal 검증기 활용)의 세 가지 단계로 구성됩니다. 이렇게 생성된 **145K개의 궤적 데이터** 를 바탕으로, **Qwen2.5-VL-7B** 를 기반으로 하는 **7B 파라미터 모델인 Fara-7B** 를 훈련시켰으며, 이 모델은 **스크린샷** 만을 입력으로 받아 **클릭 좌표** 와 같은 원자적 행동을 직접 출력하는 **"pixel-in, action-out" 방식** 을 채택합니다.

## 주요 결과
**FaraGen** 은 검증된 웹 궤적을 **태스크당 약 $1** 의 비용으로 생성하여 데이터 희소성 문제를 해결했습니다. **Fara-7B** 는 **WebVoyager 벤치마크** 에서 **73.5%의 성공률** 을 달성하여 동급 모델들을 능가하고, **GPT-40 기반 SoM 에이전트** 와 경쟁할 만한 성능을 보입니다. 특히, 새롭게 도입된 **WebTailBench 벤치마크** 에서는 **38.4%** 로 동급 모델 중 가장 높은 성능을 기록했으며, **태스크당 평균 $0.025** 의 낮은 비용으로 높은 효율성을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 **고품질 합성 데이터** 가 소형 모델의 에이전트 능력을 크게 향상시킬 수 있음을 보여주며, **온디바이스 실행 가능한 CUA** 개발의 중요한 가능성을 제시합니다. **"pixel-in, action-out" 접근 방식** 은 DOM 파싱 의존성을 제거하여 복잡하고 동적인 웹 환경에 더 강인한 에이전트를 만들 수 있음을 시사합니다. **WebTailBench** 는 실제 웹 태스크의 포괄적인 평가를 위한 새로운 표준을 제공하여 실무자들이 보다 현실적인 환경에서 모델을 평가하고 개선하는 데 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.