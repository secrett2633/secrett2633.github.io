---
title: "[논문리뷰] Mobile-Agent-v3: Foundamental Agents for GUI Automation"
excerpt: "Haowei Liu이 [arXiv]에 게시한 'Mobile-Agent-v3: Foundamental Agents for GUI Automation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - GUI Automation
  - Multimodal Agents
  - Foundational Models
  - Reinforcement Learning
  - Large Language Models
  - Cross-Platform
  - Self-Supervised Learning

permalink: /ai/review/2025-8-22-Mobile-Agent-v3_Foundamental_Agents_for_GUI_Automation/

toc: true
toc_sticky: true

date: 2025-08-22 13:10:52+0900
last_modified_at: 2025-08-22 13:10:52+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.15144)

**저자:** Jiabo Ye, Xi Zhang, Haiyang Xu, Ziwei Zheng, Feiyu Gao, Haowei Liu, Junyang Wang, Zhaoqing Zhu, Junjie Cao, Zhengxi Lu, Ming Yan, Qi Zheng, Fei Huang, Jingren Zhou (Tongyi Lab, Alibaba Group)



## 핵심 연구 목표
본 논문은 다양한 GUI 환경(데스크톱, 모바일)에서 인간의 지시에 따라 작업을 자동화하는 데 있어 기존 모델들의 한계(낮은 일반화 능력, 동적 환경 적응의 어려움)를 극복하고자 합니다. 궁극적으로 GUI 자동화를 위한 **새로운 SOTA(State-Of-The-Art) 기반 GUI 에이전트 모델 GUI-Owl**과 이를 활용한 **다목적 GUI 에이전트 프레임워크 Mobile-Agent-v3**를 개발하는 것을 목표로 합니다.

## 핵심 방법론
핵심 모델인 **GUI-Owl**은 **Qwen2.5-VL**을 기반으로 대규모 GUI 상호작용 데이터에 대해 후처리 훈련되어 인지, 그라운딩, 추론, 계획, 행동 실행을 단일 정책 네트워크 내에서 통합합니다. **Mobile-Agent-v3**는 **Manager, Worker, Reflector, Notetaker**와 같은 특수 에이전트들의 협업을 통해 복잡한 GUI 태스크를 처리하며, **클라우드 기반 가상 환경 인프라**를 통해 다양한 OS에서 데이터를 수집합니다. 또한, **Self-Evolving GUI Trajectory Production 프레임워크**로 고품질 상호작용 데이터를 생성하고, **Trajectory-aware Relative Policy Optimization (TRPO)**를 적용한 확장 가능한 강화 학습 프레임워크로 모델의 실세계 적응력을 높입니다.

## 주요 결과
**GUI-Owl-7B**는 AndroidWorld 벤치마크에서 **66.4점**, OSWorld에서 **34.9점**을 달성하며 오픈소스 모델 중 SOTA 성능을 기록했습니다. **Mobile-Agent-v3**는 **GUI-Owl**의 성능을 AndroidWorld **73.3점**, OSWorld **37.7점**으로 더욱 향상시키며 새로운 SOTA를 달성했습니다. 특히 **GUI-Owl-32B**는 MMBench-GUI-L1과 Android Control 벤치마크에서 **GPT-4o** 및 **Claude 3.7**과 같은 독점 모델을 능가하는 성능을 보였으며, MMBench-GUI-L2 그라운딩 평가에서 **80.49점**을 기록했습니다.

## AI 실무자를 위한 시사점
**GUI-Owl**은 강력한 **크로스 플랫폼 멀티모달 기반 모델**로서 GUI 자동화 분야에서 다양한 시나리오에 적용될 수 있는 **기반 모델**로 활용 가능합니다. **Mobile-Agent-v3**는 **다중 에이전트 아키텍처**를 통해 복잡하고 장기적인 GUI 태스크를 효율적으로 처리하는 **프레임워크 설계 가이드라인**을 제공하며, 실제 서비스 배포에 적합한 **견고한 자율 에이전트 시스템** 구축에 기여합니다. **Self-Evolving 데이터 생성 파이프라인**과 **TRPO 기반 강화 학습**은 고품질 데이터 수집 및 지속적인 모델 성능 향상을 위한 효과적인 전략으로, **수동 어노테이션의 필요성을 최소화**하는 방안을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.