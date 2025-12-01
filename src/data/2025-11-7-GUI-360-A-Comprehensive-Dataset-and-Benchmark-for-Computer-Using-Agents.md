---
title: "[논문리뷰] GUI-360: A Comprehensive Dataset and Benchmark for Computer-Using Agents"
excerpt: "이 [arXiv]에 게시한 'GUI-360: A Comprehensive Dataset and Benchmark for Computer-Using Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Computer-Using Agents
  - GUI Grounding
  - Screen Parsing
  - Action Prediction
  - Desktop Automation
  - Dataset
  - Benchmark
  - Multimodal Learning
  - LLM-augmented Data

permalink: /ai/review/2025-11-7-GUI-360-A-Comprehensive-Dataset-and-Benchmark-for-Computer-Using-Agents/

toc: true
toc_sticky: true

date: 2025-11-09 22:08:24+0900
last_modified_at: 2025-11-09 22:08:24+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.04307)

**저자:** Jian Mu, Chaoyun Zhang, Chiming Ni, Lu Wang, Bo Qiao, Kartik Mathur, Qianhui Wu, Yuhang Xie, Xiaojun Ma, Mengyu Zhou, Si Qin, Liqun Li, Yu Kang, Minghua Ma, Qingwei Lin, Saravan Rajmohan, Dongmei Zhang



## 핵심 연구 목표
본 논문은 데스크톱 **컴퓨터 사용 에이전트(CUAs)** 연구의 세 가지 주요 격차(실세계 CUA 태스크 부족, 자동화된 데이터 수집 및 주석 파이프라인 부재, 통합 벤치마크 부족)를 해결하는 것을 목표로 합니다. GUI 그라운딩, 화면 파싱, 액션 예측을 종합적으로 평가할 수 있는 대규모의 포괄적인 데이터셋과 벤치마크를 제공하여 견고한 데스크톱 CUA 개발을 촉진하고자 합니다.

## 핵심 방법론
저자들은 **LLM-증강 자동화 파이프라인** 을 사용하여 쿼리 수집, 환경 템플릿 구성, 태스크 인스턴스화, 배치 실행 및 품질 필터링을 수행합니다. 특별히 설계된 CUA인 **TrajAgent** 는 **Windows 11 가상 머신** 에서 태스크를 실행하며, 스크린샷, 접근성 메타데이터, 추론 흔적, 성공 및 실패 액션 궤적을 포함하는 멀티모달 데이터를 기록합니다. 데이터셋은 **GUI 그라운딩** , **스크린 파싱** , **액션 예측** 의 세 가지 주요 태스크와 하이브리드 **GUI+API 액션 공간** 을 지원하며, **GPT-40** 및 **GPT-4.1** 을 활용한 **2단계 실행 전략** 과 **EvaAgent** 를 통한 **궤적 검증** 과정을 거쳐 구축되었습니다.

## 주요 결과
**GUI-360°** 는 Word, Excel, PowerPoint와 같은 Windows 오피스 애플리케이션에서 **1.2M 이상의 실행된 액션 스텝** 과 **13,750개의 훈련 궤적** , **3,439개의 벤치마크 궤적** 을 포함합니다. 최신 **Vision-Language 모델** 들은 GUI 그라운딩(예: **GPT-40** 의 전체 정확도 **9.38%** ) 및 액션 예측에서 상당한 성능 부족을 보였습니다. 그러나 **GUI-360°** 데이터셋을 이용한 **지도 미세 조정(SFT)** 은 상당한 개선을 가져왔으며, **Qwen-2.5 7B-SFT** 및 **UI-TARS-1.5 7B-SFT** 는 GUI 그라운딩에서 **82% 이상** 의 정확도를 달성했지만, 여전히 인간 수준의 신뢰성에는 미치지 못했습니다.

## AI 실무자를 위한 시사점
이 데이터셋은 **데스크톱 CUA** 의 복잡한 문제를 해결하기 위한 **대규모의 실제 멀티모달 데이터** 를 제공하여, AI/ML 엔지니어들이 더 강력한 에이전트를 개발하고 평가하는 데 필수적인 자원입니다. **접근성 메타데이터** (`visual+a11y`)의 활용이 시각적 정보만으로는 어려운 **정밀한 액션(예: argument match)** 예측에 큰 성능 향상을 가져오므로, 에이전트 설계 시 **구조화된 UI 정보의 통합** 이 중요함을 시사합니다. 범용 **VLM** 의 한계를 드러내며, **도메인 특화 미세 조정** 및 **강화 학습** 의 필요성을 강조하여 실제 적용 가능한 GUI 에이전트 개발 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.