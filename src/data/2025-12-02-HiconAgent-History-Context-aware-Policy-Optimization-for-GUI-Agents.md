---
title: "[논문리뷰] HiconAgent: History Context-aware Policy Optimization for GUI Agents"
excerpt: "Kaiwen Zhou이 arXiv에 게시한 'HiconAgent: History Context-aware Policy Optimization for GUI Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - GUI Agents
  - Reinforcement Learning
  - Context-aware
  - History Compression
  - Policy Optimization
  - Multimodal LLM
  - Dynamic Sampling

permalink: /ai/review/2025-12-02-HiconAgent-History-Context-aware-Policy-Optimization-for-GUI-Agents/

toc: true
toc_sticky: true

date: 2025-12-02 00:00:00+0900+0900
last_modified_at: 2025-12-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.01763)

**저자:** Xurui Zhou, Gongwei Chen, Yuquan Xie, Zaijing Li, Kaiwen Zhou, Shuai Wang, Shuo Yang, Zhuotao Tian, Rui Shao



## 핵심 연구 목표
GUI(Graphical User Interface) 에이전트가 순차적 탐색 작업을 수행할 때, **과도한 계산 오버헤드와 불필요한 정보로 인한 방해 없이** 과거 컨텍스트를 효과적이고 효율적으로 활용하는 방법을 연구합니다. 기존 GUI RL(Reinforcement Learning) 프레임워크의 고정된 이력 사용 방식의 한계를 극복하고 의사 결정 품질과 효율성 간의 균형을 맞추는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 **History Context-aware Policy Optimization (HCPO)** 프레임워크를 제안합니다. 이는 두 가지 핵심 구성요소로 이루어집니다. 첫째, **Dynamic Context Sampling (DCS)** 은 샘플링 단계에서 **변동 길이 이력** 을 사용하여 에이전트가 가장 관련성 높은 컨텍스트를 적응적으로 활용하도록 유도합니다. 둘째, **Anchor-guided History Compression (AHC)** 은 정책 업데이트 단계에서 **이력 관측값을 제거하고 이력 액션만 정보 흐름 앵커로 유지** 하는 이중 분기 최적화 전략을 통해 효율성을 높입니다.

## 주요 결과
**HiconAgent-3B** 는 더 큰 **GUI-R1-7B** 모델보다 GUI-Odyssey 벤치마크에서 **+8.46%의 grounding accuracy** 와 **+11.32%의 step successful rate** 를 능가하는 성능을 보였습니다. 동시에 AndroidControl 및 AITW 벤치마크에서는 유사한 결과를 달성하면서 최대 **2.47배의 계산 속도 향상** 과 **60%의 FLOPs 감소** 를 이루어냈습니다.

## AI 실무자를 위한 시사점
이 연구는 **경량화되면서도 고성능을 내는 GUI 에이전트** 개발을 위한 실용적인 경로를 제시합니다. 특히, **이력 액션을 정보 흐름의 앵커로 활용** 하여 시각적 이력을 선택적으로 압축하는 방법론은 리소스 제약이 있는 환경에서 매우 유용합니다. 동적 컨텍스트 샘플링을 통해 다양한 이력 길이에 대한 정책의 강건성을 확보하는 전략은 복잡한 GUI 태스크 학습에 효과적으로 적용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.