---
title: "[논문리뷰] RoboMemory: A Brain-inspired Multi-memory Agentic Framework for Lifelong
  Learning in Physical Embodied Systems"
excerpt: "Junkun Hong이 [arXiv]에 게시한 'RoboMemory: A Brain-inspired Multi-memory Agentic Framework for Lifelong
  Learning in Physical Embodied Systems' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Brain-inspired AI
  - Lifelong Learning
  - Embodied AI
  - Multi-memory Systems
  - Knowledge Graph
  - Robotics
  - Closed-Loop Planning

permalink: /ai/review/2025-8-5-RoboMemory-A-Brain-inspired-Multi-memory-Agentic-Framework-for-Lifelong-Learning-in-Physical-Embodied-Systems/

toc: true
toc_sticky: true

date: 2025-08-05 11:40:52+0900
last_modified_at: 2025-08-05 11:40:52+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.01415)

**저자:** Mingcong Lei, Honghao Cai, Zezhou Cui, Liangchen Tan, Junkun Hong, Gehan Hu, et al.



## 핵심 연구 목표
이 논문은 물리적 환경에 배치된 로봇 에이전트의 **평생 학습(Lifelong Learning)** 및 **장기 계획(Long-term Planning)** 을 위한 뇌에서 영감을 받은 다중 메모리 프레임워크인 **RoboMemory** 를 제안합니다. 복잡한 실제 환경에서 발생하는 연속 학습, 메모리 지연, 태스크 상관관계 파악, 무한 루프 계획 문제와 같은 주요 과제를 해결하는 것을 목표로 합니다.

## 핵심 방법론
RoboMemory는 뇌 구조를 모방한 **정보 전처리기** , **평생 임베디드 메모리 시스템** , **폐쇄 루프 계획 모듈** , **저수준 실행기** 의 네 가지 핵심 구성 요소를 통합합니다. 특히 **평생 임베디드 메모리 시스템** 은 **Spatial, Temporal, Episodic, Semantic** 네 가지 하위 모듈로 구성되며, 이들은 병렬로 업데이트 및 검색되어 지연 시간을 완화합니다. **Spatial Memory** 는 **동적 지식 그래프(Dynamic Knowledge Graph)** 를 활용하며, **Planner-Critic 메커니즘** 은 무한 루프를 방지하도록 수정되었습니다.

## 주요 결과
**EmbodiedBench (EB-ALFRED)** 벤치마크에서 **Qwen2.5-VL-72b** 를 백본으로 사용했을 때, RoboMemory는 오픈소스 베이스라인 대비 평균 성공률(SR)을 **25%** 향상시켰고, **Claude-3.5-Sonnet** 과 같은 SOTA 모델보다 평균 SR에서 **5%** 더 높은 **67%** 의 성능을 달성하여 새로운 SOTA를 수립했습니다. 실제 환경 배포 실험에서는 첫 시도 대비 두 번째 시도에서 성공률이 크게 향상되었음(예: 특정 태스크에서 **26.67%** 에서 **46.67%** 로 향상)을 보여주며, 메모리 리셋 없이도 지속적인 성능 향상을 통해 평생 학습 능력을 입증했습니다.

## AI 실무자를 위한 시사점
**RoboMemory** 는 로봇이 실제 환경에서 지속적으로 학습하고 복잡한 태스크를 장기적으로 계획하는 데 필수적인 다중 메모리 시스템의 효과적인 설계를 보여줍니다. **동적 지식 그래프** 와 **뇌에서 영감을 받은 모듈식 접근 방식** 은 미래의 임베디드 AI 시스템 개발에 중요한 통찰력을 제공합니다. 다만, **저수준 실행기의 신뢰성** 및 **기초 VLM 모델의 영상 이해 능력** 과 같은 하위 수준의 한계는 여전히 실질적인 로봇 배포를 위한 주요 개선 과제로 남아있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.