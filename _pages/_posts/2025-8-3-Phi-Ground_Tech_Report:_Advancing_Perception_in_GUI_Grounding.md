
---
title: "[논문리뷰] Phi-Ground Tech Report: Advancing Perception in GUI Grounding"
excerpt: "K이 [arXiv]에 게시한 'Phi-Ground Tech Report: Advancing Perception in GUI Grounding' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - [Review]

permalink: /ai/review/2025-8-3-Phi-Ground_Tech_Report:_Advancing_Perception_in_GUI_Grounding/

toc: true
toc_sticky: true

date: 2025-08-03 07:35:17+0900
last_modified_at: 2025-08-03 07:35:17+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2507.23779)

**저자:** Miaosen Zhang, Ziqiang Xu, Jialiang Zhu, Qi Dai, Kai Qiu, Yifan Yang, Chong Luo, Tianyi Chen, Justin Wagle, Tim Franklin, Baining Guo (Microsoft)

**키워드:** `GUI grounding`, `AI agent`, `Large Multi-modal Model`, `Perception`, `Data Augmentation`, `Direct Preference Optimization`, `Computational Efficiency`

## 핵심 연구 목표
본 논문은 현재 **65% 미만**의 정확도를 보이는 GUI 그라운딩 모델의 한계를 극복하고, **Computer Use Agent (CUA)**의 핵심 구성 요소로서 GUI 요소 인식을 향상시켜 실제 애플리케이션에 배포 가능한 수준의 성능을 달성하는 것을 목표로 합니다. 특히, 마우스 클릭과 같은 **정확한 화면 좌표**를 식별하는 능력을 개선하고자 합니다.

## 핵심 방법론
GUI 그라운딩을 **공간 계획(spatial planning)**과 **위치 결정(localization)**의 두 단계로 분리하는 **투-단계 접근 방식**을 채택했습니다. **GPT-4O**와 같은 고급 **MLLM**이 상세한 참조 표현(RE)을 생성하고, 더 작은 멀티모달 모델인 **Phi-Ground 모델 패밀리**가 최종 좌표를 출력합니다. 훈련 과정에서는 **텍스트 우선 모달리티 입력 순서**, **랜덤 리사이즈 데이터 증강**, 그리고 **Direct Preference Optimization (DPO)** 기반의 다중 라운드 후속 훈련을 통해 성능을 최적화했습니다.

## 주요 결과
**Phi-Ground 모델 패밀리**는 **10B 미만 파라미터**를 가진 모델 중 에이전트 설정에서 **5가지 GUI 그라운딩 벤치마크** 모두에서 **최고 수준의 성능(SOTA)**을 달성했습니다. 특히, 에이전트 설정에서 **ScreenSpot-pro 벤치마크**에서 **55.0%**, **UI-Vision**에서 **36.2%**의 점수를 기록했습니다. 엔드-투-엔드 모델 설정에서는 **ScreenSpot-pro 43.2%**, **UI-Vision 27.2%**로 SOTA 결과를 유지했습니다.

## AI 실무자를 위한 시사점
GUI 그라운딩 모델 개발 시 **모달리티 입력 순서** (텍스트-이미지 순서가 더 효과적), **랜덤 리사이즈와 같은 데이터 증강 기법** (고해상도 환경에서 특히 유용), 그리고 **훈련 데이터 분포**를 고려하는 것이 중요합니다. 또한, 모델 성능 평가 시 **파라미터 수(N)** 외에 **이미지 토큰 수(D)**에 따른 **계산 부하(ND)**를 함께 고려하여 효율적인 모델을 설계하는 것이 실용적입니다. 하지만 CUA 배포 시 사용자 **개인 정보 보호 및 오작동 책임 문제**에 대한 심층적인 고려가 필수적입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.
