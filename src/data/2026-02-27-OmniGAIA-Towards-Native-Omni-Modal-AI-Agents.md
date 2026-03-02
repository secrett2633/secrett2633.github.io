---
title: "[논문리뷰] OmniGAIA: Towards Native Omni-Modal AI Agents"
excerpt: "Guanting Dong이 arXiv에 게시한 'OmniGAIA: Towards Native Omni-Modal AI Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Omni-modal AI
  - Multi-modal Agents
  - Tool-Integrated Reasoning
  - Benchmark
  - Event Graph
  - Active Perception
  - Trajectory Synthesis
  - DPO

permalink: /ai/review/2026-02-27-OmniGAIA-Towards-Native-Omni-Modal-AI-Agents/

toc: true
toc_sticky: true

date: 2026-02-27 00:00:00+0900+0900
last_modified_at: 2026-02-27 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.22897)

**저자:** Xiaoxi Li, Wenxiang Jiao, Jiarui Jin, Shijian Wang, Guanting Dong, Jiajie Jin, Hao Wang, Yinuo Wang, Ji-Rong Wen, Yuan Lu, Zhicheng Dou



## 핵심 연구 목표
본 연구는 현재 바이모달 상호작용에 국한된 멀티모달 LLM의 한계를 넘어, 인간의 지능처럼 영상, 오디오, 이미지 모달리티 전반에 걸쳐 통합적으로 인지하고 추론하며 외부 도구를 사용하는 **네이티브 옴니모달 AI 에이전트** 를 개발하고 평가하는 것을 목표로 합니다. 이를 통해 복잡한 멀티홉 태스크와 실제 시나리오에서의 에이전트 역량 부족 문제를 해결하고자 합니다.

## 핵심 방법론
연구는 멀티턴 도구 사용과 검증 가능한 개방형 답변을 요구하는 **360개 태스크로 구성된 도전적인 옴니모달 벤치마크 OmniGAIA** 를 제안합니다. **OmniGAIA** 는 데이터 수집, 정교한 신호 마이닝, **이벤트 그래프 구축** , 외부 도구를 통한 그래프 확장, **이벤트 퍼지화** 를 통한 QA 생성의 **옴니모달 이벤트 그래프 기반 파이프라인** 으로 구축되었습니다. 또한, **능동적인 옴니모달 지각** 과 **도구 통합 추론(TIR) 패러다임** 을 따르는 **OmniAtlas** 에이전트를 소개하며, **회고 기반 트리 탐색** 을 통한 궤적 합성 및 **OmniDPO** 를 통해 훈련됩니다.

## 주요 결과
**OmniGAIA** 벤치마크는 매우 도전적임을 입증했으며, 최강의 상용 모델인 **Gemini-3-Pro** 가 **62.5 Pass@1** 을 달성한 반면, 오픈소스 모델인 **Qwen3-Omni** 는 **13.3** 에 그쳤습니다. **OmniAtlas** 는 오픈소스 모델의 성능을 크게 향상시켜, **Qwen3-Omni** 의 점수를 **13.3** 에서 **20.8(+7.5 절대값)** 로 끌어올리고, **Qwen-2.5-Omni-7B** 성능을 **약 3.7배** 개선했습니다. 오류 분석 결과, **비효율적인 도구 사용(35.3%–91.9%)** 과 **추론 오류(15.8%–79.7%)** 가 주요 실패 원인으로 나타났습니다.

## AI 실무자를 위한 시사점
이 벤치마크는 상용 및 오픈소스 옴니모달 에이전트 간의 상당한 성능 격차를 명확히 보여주며, **견고한 도구 통합 추론** 과 **네이티브 지각 능력** 의 중요성을 강조합니다. **능동적인 옴니모달 지각** 은 긴 미디어 및 고해상도 입력 처리에 필수적이며, 토큰 소모적인 전면 다운샘플링을 피할 수 있습니다. **OmniAtlas** 의 훈련 방식은 오픈소스 모델의 도구 사용 역량과 미세한 오류 수정을 개선하는 실용적인 길을 제시하여, 더욱 유능한 범용 AI 비서 개발에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.