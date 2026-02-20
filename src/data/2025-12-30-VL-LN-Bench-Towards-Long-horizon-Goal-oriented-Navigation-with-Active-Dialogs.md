---
title: "[논문리뷰] VL-LN Bench: Towards Long-horizon Goal-oriented Navigation with Active Dialogs"
excerpt: "Xihui Liu이 arXiv에 게시한 'VL-LN Bench: Towards Long-horizon Goal-oriented Navigation with Active Dialogs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Embodied AI
  - Vision and Language Navigation
  - Instance Object Navigation
  - Active Dialog
  - Large Language Models (LLMs)
  - Benchmark
  - Human-Robot Interaction

permalink: /ai/review/2025-12-30-VL-LN-Bench-Towards-Long-horizon-Goal-oriented-Navigation-with-Active-Dialogs/

toc: true
toc_sticky: true

date: 2025-12-30 00:00:00+0900+0900
last_modified_at: 2025-12-30 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.22342)

**저자:** Xihui Liu, Jinming Xu, Meng Wei, Shaohao Zhu, Wensi Huang



## 핵심 연구 목표
이 논문은 에이전트가 모호한 자연어 지시를 받아 복잡하고 장거리인 환경에서 특정 객체 인스턴스를 찾아내는 **Interactive Instance Object Navigation (IION)** 태스크를 도입합니다. 기존의 정적인 지시 기반 내비게이션의 한계를 극복하고, 에이전트와 오라클(인간 또는 LLM) 간의 **능동적인 대화** 를 통해 정보 모호성을 해소하고 효율적인 탐색 경로를 확보하여 성공률을 높이는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 **GPT-4o** 와 규칙 기반 시스템을 활용한 오라클을 통해 대화 궤적을 자동으로 생성하여 **41,891개의 대화 증강 궤적** 을 포함하는 대규모 **VL-LN Bench** 데이터셋을 구축했습니다. 에이전트는 **RGB-D 카메라** 와 **frontier-based exploration (FBE) 전략** 을 사용하여 환경을 탐색하며, 오라클은 속성, 경로, 모호성 해소 질문에 답변하고 특히 경로 질문에는 **최단 경로를 자연어 지시로 변환** 하는 **rule-based procedure** 를 사용합니다. 모델은 **Qwen2.5-VL-7B-Instruct 기반의 VLLN 모델** 들을 사용하여 훈련되었습니다.

## 주요 결과
**VL-LN Bench** 평가에서 **대화 기능이 포함된 VLLN-D 모델** 이 **ION 태스크** 에서 **25.0%의 SR(Success Rate)** 과 **15.59의 SPL(Success weighted by Path Length)** 을, **IION 태스크** 에서는 **20.2% SR** 과 **13.07 SPL** 을 달성하며 최신 성능을 기록했습니다. 대화 기능은 **탐색 실패율을 IION에서 89건에서 71건으로, ION에서 84건에서 46건으로 크게 감소** 시켰으며, **Mean Success Progress (MSP)** 지표를 통해 대화의 유용성과 효율성을 정량적으로 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 **능동적인 대화 기능** 이 **장거리 객체 인스턴스 내비게이션** 및 **모호성 해소** 에 결정적인 역할을 함을 입증하여, **대화형 Embodied AI 시스템** 개발에 중요한 방향을 제시합니다. **GPT-4o와 같은 LLM** 을 활용한 데이터셋 자동 생성 방법은 대규모 및 고품질의 상호작용 벤치마크를 효율적으로 구축할 수 있음을 보여주며, 이는 실제 환경에서의 **휴먼-로봇 상호작용** 을 강화하는 데 핵심적인 기술이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.