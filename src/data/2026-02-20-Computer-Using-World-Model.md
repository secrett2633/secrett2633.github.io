---
title: "[논문리뷰] Computer-Using World Model"
excerpt: "John Zhang이 [arXiv]에 게시한 'Computer-Using World Model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - World Model
  - GUI Agents
  - Desktop Automation
  - Reinforcement Learning
  - Large Language Models
  - Visual State Realization
  - Textual State Transition

permalink: /ai/review/2026-02-20-Computer-Using-World-Model/

toc: true
toc_sticky: true

date: 2026-02-20 00:00:00+0900+0900
last_modified_at: 2026-02-20 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.17365)

**저자:** Yiming Guan, Rui Yu, John Zhang, Lu Wang, Liqun Li, Bo Qiao, Si Qin, He Huang, Fangkai Yang, Pu Zhao, Lukas Wutschitz, Samuel Kessler, Huseyin A. Inan, Saravan Rajmohan, Qingwei Lin, Dongmei Zhang, Chaoyun Zhang, Robert Sim



## 핵심 연구 목표
본 논문은 복잡한 소프트웨어 환경에서 에이전트가 행동의 결과를 추론하는 능력의 부재로 인해 발생하는 문제를 해결하는 것을 목표로 합니다. 특히, 실제 실행이 비용이 많이 들고 되돌리기 어려운 컴퓨터 사용 시나리오에서, **GUI 에이전트** 가 반사실적 탐색 및 계획을 효율적으로 수행할 수 있도록 **데스크톱 소프트웨어용 월드 모델** 을 개발하고자 합니다.

## 핵심 방법론
제안하는 **Computer-Using World Model (CUWM)** 은 UI 동역학을 두 단계로 분해합니다. 첫째, **텍스트 상태 전이 모델** 은 현재 UI 상태와 행동을 기반으로 다음 UI 상태의 변화를 **텍스트로 예측** 하며, 이를 위해 **Qwen2.5-VL** 모델을 **GUI-360 데이터셋** 에 대해 **지도 학습(SFT)** 후 **강화 학습(GRPO)** 으로 정제합니다. 둘째, **시각 상태 실현 모델** 은 텍스트 변화를 기반으로 다음 스크린샷을 시각적으로 렌더링하며, 이를 위해 **Qwen-Image-Edit** 모델을 활용합니다.

## 주요 결과
**CUWM** 은 **LLM-as-a-Judge Score** 에서 **0.6883** , **Action Consistency Score (ACS)** 에서 최대 **0.5642** 를 달성하여 텍스트 전이 예측의 정확도를 입증했습니다. 또한, 이미지 기반 품질 지표인 **PSNR (14.91)** 및 **FID (20.48)** 에서 기존 모델들을 능가하며, **Text Perception Score** 에서도 **0.716** 의 최고 성능을 보였습니다. 최종적으로, **CUWM** 은 에이전트 태스크 완료율을 **GPT-40** 에서 **4%** , **Qwen3-VL-8B** 에서 **8%** 향상시키며 의사결정 품질과 실행 견고성을 개선했습니다.

## AI 실무자를 위한 시사점
**CUWM** 은 데스크톱 소프트웨어 환경에서 **안전하고 신뢰할 수 있는 에이전트 자동화** 를 가능하게 하는 **테스트 시간 시뮬레이션** 의 중요성을 강조합니다. 텍스트와 시각적 요소를 분리한 팩터화된 접근 방식은 UI 동역학에 대한 **해석 가능하고 제어 가능한 모델링** 을 제공하며, **대규모 데이터셋** 을 통한 사전 학습과 **경량 강화 학습** 을 통한 정제가 복잡한 GUI 환경에 효과적임을 보여줍니다. 다만, 텍스트와 이미지 예측의 결합 시 발생하는 **교차 모달 갈등 및 노이즈 축적** 문제는 향후 연구 과제로 남아있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.