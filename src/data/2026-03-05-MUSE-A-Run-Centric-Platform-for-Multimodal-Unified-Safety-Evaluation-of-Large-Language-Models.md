---
title: "[논문리뷰] MUSE: A Run-Centric Platform for Multimodal Unified Safety Evaluation of Large Language Models"
excerpt: "Yiran Chen이 arXiv에 게시한 'MUSE: A Run-Centric Platform for Multimodal Unified Safety Evaluation of Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLMs
  - Safety Evaluation
  - Red Teaming
  - Adversarial Attacks
  - Modality Switching
  - LLM Alignment
  - Compliance
  - ASR

permalink: /ai/review/2026-03-05-MUSE-A-Run-Centric-Platform-for-Multimodal-Unified-Safety-Evaluation-of-Large-Language-Models/

toc: true
toc_sticky: true

date: 2026-03-05 00:00:00+0900+0900
last_modified_at: 2026-03-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.02482)

**저자:** Zhongxi Wang, Yueqian Lin, Jingyang Zhang, Hai “Helen” Li, Yiran Chen



## 핵심 연구 목표
본 연구는 기존의 텍스트 중심 안전성 평가와 레드팀 활동의 한계를 극복하고, 멀티모달 LLM의 정렬(alignment)이 오디오, 이미지, 비디오 입력에 대해 일반화되는지 체계적으로 테스트하기 위한 **통합 플랫폼** 을 제공하는 것을 목표로 합니다. 특히, 모달리티 전환이 다중 턴 공격에 미치는 영향을 규명하고자 합니다.

## 핵심 방법론
**MUSE (Multimodal Unified Safety Evaluation)** 는 **자동 크로스-모달 페이로드 생성** (TTS, 이미지 렌더링, 비디오 합성), 세 가지 다중 턴 공격 알고리즘 ( **Crescendo** , **PAIR** , **Violent Durian** ), 공급자 독립적인 모델 라우팅, 그리고 5단계 안전성 분류 체계를 갖춘 **LLM 심판** 을 통합한 런-중심 플랫폼입니다. 특히, **Inter-Turn Modality Switching (ITMS)** 기법을 도입하여 다중 턴 공격에서 턴별 모달리티 전환을 통해 정렬 일반화 여부를 탐색하며, **하드 ASR** 과 **소프트 ASR** 의 듀얼-메트릭으로 부분적인 정보 유출을 정량화합니다.

## 주요 결과
다중 턴 공격 전략은 단일 턴에서 거의 완벽한 거부율을 보인 모델에 대해 **최대 90-100%의 하드 ASR** 을 달성하며 방어막을 무너뜨렸습니다. **ITMS** 는 최종 ASR을 크게 높이지 않더라도, 초기 턴 방어를 불안정하게 만들어 수렴 속도를 가속화했습니다 (예: Claude Sonnet 4의 평균 성공 턴 수가 3.0에서 **2.6** 으로 감소). 모달리티 효과는 **모델-패밀리 특이적** 으로 나타나, Gemini 모델은 비텍스트 모달리티에서 ASR이 **2-6%** 상승한 반면, Qwen 모델은 ASR이 하락했습니다 (Qwen2.5-Omni의 이미지-온리 시 **-14%** ).

## AI 실무자를 위한 시사점
멀티모달 LLM의 안전성 평가는 더 이상 텍스트에만 국한될 수 없으며, **모달리티 간 전환을 포함한 체계적인 레드팀 활동** 이 필수적임을 시사합니다. **다중 턴 공격** 은 단일 턴 방어를 쉽게 우회할 수 있으므로, LLM 개발자는 모델의 **다중 턴 정렬 견고성** 에 더욱 집중해야 합니다. 마지막으로, 모달리티 전환이 모델 안전성에 미치는 영향이 **공급자 및 모델 아키텍처에 따라 상이** 하므로, 범용적인 접근 방식보다는 **모델별 맞춤형 크로스-모달 안전성 테스트** 가 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.