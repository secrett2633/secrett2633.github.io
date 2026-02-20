---
title: "[논문리뷰] UItron: Foundational GUI Agent with Advanced Perception and Planning"
excerpt: "Yufeng Zhong이 arXiv에 게시한 'UItron: Foundational GUI Agent with Advanced Perception and Planning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - GUI Agent
  - Foundational Model
  - Multimodal LLM
  - Perception
  - Planning
  - Reinforcement Learning
  - Data Engineering
  - Chinese App Scenarios

permalink: /ai/review/2025-9-1-UItron-Foundational-GUI-Agent-with-Advanced-Perception-and-Planning/

toc: true
toc_sticky: true

date: 2025-09-01 13:14:34+0900
last_modified_at: 2025-09-01 13:14:34+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.21767)

**저자:** Zhixiong Zeng, Jing Huang, Liming Zheng, Wenkang Han, Yufeng Zhong



## 핵심 연구 목표
이 논문은 Mobile/PC 환경에서 복잡한 작업을 자동화하는 **GUI 에이전트** 의 핵심 역량을 강화하는 **오픈소스 파운데이션 모델, Ultron** 을 제시합니다. 기존 GUI 에이전트의 개발을 저해했던 **희소한 작업 궤적 데이터, 인터랙티브 인프라 부족, 파운데이션 모델의 초기 역량 한계** 문제를 해결하고, 특히 **중국어 앱 시나리오** 에서의 성능을 대폭 개선하는 것을 목표로 합니다.

## 핵심 방법론
Ultron은 **고급 GUI 인지, 그라운딩, 오프라인 및 온라인 계획** 기능을 통합합니다. **체계적인 데이터 공학 전략** 을 통해 데이터 통합, 궤적 증류(distillation), 다중 도메인 수동 주석을 수행하고, **모바일 및 PC 장치를 연결하는 인터랙티브 환경** 을 구축하여 데이터 수집 및 온라인 학습을 지원합니다. 훈련은 GUI 인지 및 계획을 위한 **지도 미세 조정(SFT)** 과 복잡한 온라인 환경에서의 탐색을 위한 **커리큘럼 강화 학습(CuRL)** 프레임워크를 포함하는 3단계 전략을 사용하며, **GRPO(Group Relative Policy Optimization) 알고리즘** 을 활용합니다.

## 주요 결과
Ultron은 **GUI 인지, 그라운딩, 오프라인 계획 벤치마크** 에서 탁월한 성능을 달성했습니다. 특히 **VisualWebBench** 벤치마크에서 **Ultron-72B 모델** 은 기존 SOTA 모델인 **UI-TARS-72B 대비 미세 그라운딩 정확도에서 2.1% 향상** 을 보였습니다. 또한 **AndroidControl (Low) 설정** 에서 **Ultron-72B** 는 **96.7%의 그라운딩 정확도** 와 **94.2%의 스텝 성공률** 을 기록했으며, **중국어 앱 시나리오** 의 온라인 환경에서 **UI-TARS-1.5-7B 대비 Task SR을 38.9%에서 54.1%로 대폭 향상** 시켰습니다.

## AI 실무자를 위한 시사점
Ultron은 **체계적인 데이터 공학** 과 **강력한 인터랙티브 인프라** 가 실용적인 **파운데이션 GUI 에이전트** 개발에 필수적인 요소임을 강조합니다. 특히 **중국어 모바일 앱 환경** 과 같이 기존 모델들이 취약한 특정 문화 및 언어 도메인에서 **고품질의 대규모 수동 주석 데이터** 를 통해 성능을 크게 개선할 수 있음을 보여주었습니다. **커리큘럼 강화 학습 프레임워크** 는 온라인 환경에서 에이전트의 **복잡한 추론 및 탐색 능력** 을 향상시키는 효과적인 방법론으로, 실제 GUI 에이전트 배포 가능성을 높이는 데 기여합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.