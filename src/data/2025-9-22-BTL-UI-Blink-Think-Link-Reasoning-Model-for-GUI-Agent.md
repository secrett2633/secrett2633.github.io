---
title: "[논문리뷰] BTL-UI: Blink-Think-Link Reasoning Model for GUI Agent"
excerpt: "Jiahui Yang이 [arXiv]에 게시한 'BTL-UI: Blink-Think-Link Reasoning Model for GUI Agent' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - GUI Agent
  - Human-GUI Interaction
  - Cognitive Modeling
  - Reinforcement Learning
  - Multimodal Large Language Models
  - Attention Mechanisms
  - Action Planning

permalink: /ai/review/2025-9-22-BTL-UI-Blink-Think-Link-Reasoning-Model-for-GUI-Agent/

toc: true
toc_sticky: true

date: 2025-09-22 13:11:29+0900
last_modified_at: 2025-09-22 13:11:29+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.15566)

**저자:** Shaojie Zhang, Ruoceng Zhang, Pei Fu, Shaokang Wang, Jiahui Yang, Xin Du, Shiqi Cui, Bin Qin, Ying Huang, Zhenbo Luo, Jian Luan



## 핵심 연구 목표
AI 기반 GUI 에이전트의 상호작용 논리가 인간의 자연스러운 GUI 소통 패턴과 현저히 다르다는 근본적인 문제를 해결하고자 합니다. 인간의 인지 과정을 모방하는 "Blink-Think-Link" (BTL) 프레임워크를 제안하여, GUI 에이전트가 보다 자연스럽고 효율적이며 인간 인지에 부합하는 방식으로 상호작용하도록 하는 것이 연구의 핵심 목표입니다.

## 핵심 방법론
본 연구는 GUI 상호작용을 세 가지 생체학적 단계인 **Blink (빠른 관련 영역 감지 및 주의 집중)**, **Think (고수준 추론 및 의사 결정)**, **Link (정확한 동작 제어를 위한 실행 가능한 명령 생성)**로 분해합니다. 이를 위해 **Blink Data Generation**이라는 자동화된 주석 파이프라인과 프로세스 및 결과 모두를 고려하는 최초의 규칙 기반 보상 메커니즘인 **BTL Reward**를 도입했습니다. 모델 최적화에는 **GRPO (Group Reward Policy Optimization)** 기법을 사용하며, **Qwen2.5-VL-3B/7B**를 기반으로 **BTL-UI-3B/7B** 모델을 구축했습니다.

## 주요 결과
**BTL-UI**는 종합 벤치마크에서 일관된 최첨단 성능을 달성했습니다. GUI grounding 작업에서 **ScreenSpot-V2** 벤치마크에서 **89.1%**의 평균 정확도를 기록하며 기존 Qwen2.5-VL-7B (**84.8%**) 및 Aria-UI (**82.4%**)를 능가했습니다. **ScreenSpot-Pro**에서는 **BTL-UI-7B**가 **33.7%**의 평균 정확도로 SOTA를 달성했습니다. **AndroidControl (low-level)**의 저수준 계획 작업에서는 **BTL-UI-3B**가 **84.8%**의 단계 성공률(SR)을 달성하여 GUI-R1-3B (**64.4%**)와 SeeClick (**75.0%**)을 앞섰으며, 고수준 계획 작업에서 **BTL-UI-7B**는 **AndroidControl (high-level)**에서 **69.2%** SR, **GUI-Odyssey**에서 **45.2%** SR을 달성했습니다.

## AI 실무자를 위한 시사점
BTL 프레임워크는 인간의 인지 과정을 모방하여 AI 에이전트의 GUI 상호작용을 보다 자연스럽고 효율적으로 만드는 새로운 패러다임을 제시합니다. **BTL Reward** 및 **GRPO**와 같은 기술 혁신을 통해 복잡한 GUI 작업에서 모델의 성능과 일반화 능력을 크게 향상시킬 수 있음을 보여주어, 실제 AI 시스템 설계 시 프로세스 기반 보상 설계의 중요성을 강조합니다. 하지만 **`blink` 태그**와 같은 추가 출력 형식으로 인해 출력 시퀀스 길이가 늘어나고 추가 처리 오버헤드가 발생할 수 있으므로, 실제 배포 시 효율성 최적화에 대한 고려가 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.