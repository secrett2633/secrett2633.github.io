---
title: "[논문리뷰] Probing Scientific General Intelligence of LLMs with Scientist-Aligned Workflows"
excerpt: "Yuhao Zhou이 [arXiv]에 게시한 'Probing Scientific General Intelligence of LLMs with Scientist-Aligned Workflows' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Scientific General Intelligence (SGI)
  - LLMs
  - Benchmarking
  - Scientist-Aligned Workflows
  - Practical Inquiry Model
  - Multi-modal Reasoning
  - Code Generation
  - Test-Time Reinforcement Learning (TTRL)

permalink: /ai/review/2025-12-22-Probing-Scientific-General-Intelligence-of-LLMs-with-Scientist-Aligned-Workflows/

toc: true
toc_sticky: true

date: 2025-12-22 00:00:00+0900+0900
last_modified_at: 2025-12-22 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.16969)

**저자:** Yuhao Zhou, SciYu, VitaCoco, BoKelvin, CoCoOne



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)의 **과학적 일반 지능(SGI)** 평가를 위한 체계적인 프레임워크와 정의가 부족하다는 문제를 해결합니다. 과학적 탐구의 완전하고 반복적인 주기를 자율적으로 탐색하고 수행하는 AI의 능력을 포괄적으로 측정하고, 최신 LLM 및 에이전트 시스템의 현재 SGI 역량과 한계를 정량적으로 밝히는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 **Practical Inquiry Model (PIM)** 의 네 가지 인지 활동(숙고, 구상, 실행, 인식)을 기반으로 SGI를 정의하고, 이를 **SGI-Bench** 라는 벤치마크로 구체화했습니다. SGI-Bench는 **과학적 심층 연구, 아이디어 생성, Dry/Wet 실험, 실험적 추론** 의 네 가지 과학자-정렬(scientist-aligned) 태스크로 구성되며, 1,000개 이상의 전문가가 큐레이팅한 샘플을 포함합니다. 평가는 **SGIEvalAgent** 라는 에이전트 기반 프레임워크와 **다차원 메트릭** 을 통해 이루어지며, 추론 시 검색 기반 참신성 보상을 최적화하는 **Test-Time Reinforcement Learning (TTRL)** 을 도입했습니다.

## 주요 결과
평가 결과, 현존하는 LLM의 **SGI-Score** 는 평균 **30±5** 로 낮게 나타났으며, 최고 성능 모델인 **Gemini-3-Pro** 도 **33.83** 에 그쳤습니다. **심층 연구** 에서는 정확 일치율이 **10-20%** 로 낮았고, **아이디어 생성** 에서는 참신성이 높았으나(예: **GPT-5 76.08%** ), 실행 가능성은 **18.87%** 로 매우 낮았습니다. **Dry 실험** 은 코드 실행 가능성이 높았지만( **>90% SER** ), 정확도( **PassAll@5 36.64%** )는 낮았으며, **Wet 실험** 과 **실험적 추론** 에서도 절차적 오류 및 비교 추론에서 지속적인 문제가 확인되었습니다. **TTRL** 은 레이블 없이도 아이디어 생성의 참신성 점수를 **49.36에서 62.06** 으로 향상했습니다.

## AI 실무자를 위한 시사점
현재 LLM은 과학적 인지의 단편적인 능력을 보일 뿐, 통합되고 견고한 과학적 추론 워크플로우를 수행하는 데 한계가 있습니다. AI 개발자들은 **숫자적 견고성, 계획 인지 기반의 아이디어 구상, 절차적 일관성, 멀티모달 기반 추론, 자가 수정 메커니즘** 개발에 집중해야 합니다. 또한, **TTRL** 은 개방형 과학 발견 태스크에서 LLM의 자율적 개선 가능성을 보여주며, **도구 통합의 효율성** 을 높이기 위한 엔지니어링 최적화(예: 검색 지연 시간 단축)가 중요한 방향입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.