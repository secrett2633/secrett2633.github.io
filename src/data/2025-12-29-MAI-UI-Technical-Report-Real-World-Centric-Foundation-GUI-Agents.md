---
title: "[논문리뷰] MAI-UI Technical Report: Real-World Centric Foundation GUI Agents"
excerpt: "이 [arXiv]에 게시한 'MAI-UI Technical Report: Real-World Centric Foundation GUI Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - GUI Agents
  - Foundation Models
  - Reinforcement Learning
  - Device-Cloud Collaboration
  - Mobile Navigation
  - Tool Augmentation
  - User Interaction

permalink: /ai/review/2025-12-29-MAI-UI-Technical-Report-Real-World-Centric-Foundation-GUI-Agents/

toc: true
toc_sticky: true

date: 2025-12-29 00:00:00+0900+0900
last_modified_at: 2025-12-29 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.22047)

**저자:** Hanzhang Zhou, Xu Zhang, Panrong Tong, Jianan Zhang, Liangyu Chen, Quyu Kong, Chenglin Cai, Chen Liu, Yue Wang, Jingren Zhou, Steven HOI



## 핵심 연구 목표
본 연구는 사용자 상호작용 부족, UI 전용 작업의 한계, 비실용적인 배포 아키텍처, 동적 환경에서의 취약성 등 기존 GUI 에이전트의 현실적인 배포 문제를 해결하고자 합니다. 궁극적으로는 이러한 난제를 극복하고 실세계에 최적화된 **파운데이션 GUI 에이전트 MAI-UI** 를 개발하여 차세대 인간-컴퓨터 상호작용을 혁신하는 것을 목표로 합니다.

## 핵심 방법론
**MAI-UI** 는 2B부터 235B-A22B까지 다양한 크기의 모델을 포함하며, **Qwen3-VL** 을 백본으로 사용합니다. 핵심 방법론은 사용자 상호작용 및 MCP(Model Context Protocol) 툴 호출을 통합하는 **자체 진화 데이터 파이프라인** , 작업 상태와 데이터 민감도에 따라 실행을 조정하는 **네이티브 기기-클라우드 협업 시스템** , 그리고 병렬 환경과 컨텍스트 길이에 대한 고급 최적화를 포함하는 **온라인 강화 학습(RL) 프레임워크** 로 구성됩니다. 특히, GUI grounding에는 **Instruction-as-Reasoning** 패러다임이 적용되었습니다.

## 주요 결과
**MAI-UI** 는 GUI grounding 및 모바일 내비게이션 벤치마크 전반에서 새로운 **최첨단(SOTA) 성능** 을 달성했습니다. grounding 벤치마크인 **ScreenSpot-Pro** 에서 **73.5%** , **MMBench GUI L2** 에서 **91.3%** , **OSWorld-G** 에서 **70.9%** , **UI-Vision** 에서 **49.2%** 의 정확도를 기록하며 **Gemini-3-Pro** 와 **Seed1.8** 을 능가했습니다. 모바일 내비게이션 벤치마크인 **AndroidWorld** 에서 **76.7%** 의 성공률을, **MobileWorld** 에서 **41.7%** 의 성공률을 보였으며, 네이티브 기기-클라우드 협업 시스템은 온디바이스 성능을 **33%** 향상시키고 클라우드 모델 호출을 **40% 이상** 감소시켰습니다.

## AI 실무자를 위한 시사점
**MAI-UI** 는 GUI 에이전트의 실제 배포를 위한 포괄적인 해결책을 제시하며, **UI 자동화 및 사용자 경험 혁신** 에 지대한 영향을 미칠 수 있음을 보여줍니다. 특히 **기기-클라우드 협업 시스템** 은 개인 정보 보호, 비용 효율성, 낮은 지연 시간 등 실제 모바일 AI 애플리케이션 개발에 필수적인 요소를 고려한 실용적인 아키텍처를 제공합니다. **온라인 RL 및 자체 진화 데이터 파이프라인** 은 동적이고 예측 불가능한 실세계 환경에서 AI 에이전트의 견고성과 일반화 능력을 크게 향상시키는 강력한 방법론을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.