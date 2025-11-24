---
title: "[논문리뷰] VoiceAssistant-Eval: Benchmarking AI Assistants across Listening,
  Speaking, and Viewing"
excerpt: "이 [arXiv]에 게시한 'VoiceAssistant-Eval: Benchmarking AI Assistants across Listening,
  Speaking, and Viewing' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - AI Assistants
  - Multimodal Benchmarking
  - Audio Understanding
  - Speech Synthesis
  - Vision-Language Models
  - Role-play
  - Safety
  - Robustness

permalink: /ai/review/2025-9-29-VoiceAssistant-Eval-Benchmarking-AI-Assistants-across-Listening-Speaking-and-Viewing/

toc: true
toc_sticky: true

date: 2025-09-29 13:47:46+0900
last_modified_at: 2025-09-29 13:47:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.22651)

**저자:** Ke Wang, Houxing Ren, Zimu Lu, Mingjie Zhan, Hongsheng Li



## 핵심 연구 목표
본 논문은 기존 벤치마크의 한계를 극복하고, 음성 우선 AI 비서의 **청취, 말하기, 보기 능력 전반**을 평가할 수 있는 종합적인 벤치마크를 제시하는 것을 목표로 합니다. 특히 음성 개인화, 핸즈프리 상호작용, 다양한 오디오 컨텍스트, 그리고 시각-오디오 다중 모달 통합 평가의 부족과 같은 기존 벤치마크의 **4가지 주요 약점**을 해결하고자 합니다.

## 핵심 방법론
본 연구는 **13개 태스크 카테고리에 걸친 10,497개의 큐레이션된 예제**로 구성된 **VoiceAssistant-Eval** 벤치마크를 도입합니다. 데이터는 자연음, 음악, 음성 대화, 다중 턴 대화, 역할극 모방, 시나리오별 말하기, 이질적인 이미지 등 **37개 데이터셋**에서 수집되었습니다. 평가는 **GPT 기반 평가자 (gpt-oss-20b)**를 통한 내용 품질, **UTMOS**를 통한 음성 품질, **Whisper-Large-v3**를 통한 전사 후 **수정된 WER**을 통한 텍스트-음성 일관성 등 **세 가지 핵심 차원**을 종합적으로 측정하는 **Triadic Evaluation System**을 사용합니다.

## 주요 결과
**Step-Audio-2-mini (7B)** 모델이 **LLaMA-Omni2-32B-Bilingual** 모델 대비 **2배 이상 높은 청취 정확도 (40.06% vs 16.00%)**를 달성하며 전반적으로 가장 높은 점수를 기록했습니다. 평가된 22개 모델 중 **20개**가 듣기 태스크보다 말하기 태스크에서 더 나은 성능을 보여, 오디오 이해 능력의 부족을 시사합니다. **Qwen2.5-Omni-7B**는 이미지+텍스트 쿼리에서 **59.2% 정확도**를 보였으나, 이미지+오디오 쿼리에서는 **42.9%**로 **16.3% 포인트 하락**했습니다.

## AI 실무자를 위한 시사점
AI 비서 개발자는 음성 이해 능력, 특히 **오디오 인코더**의 성능 향상에 집중해야 합니다. 모델의 크기보다는 **효율적인 아키텍처 설계와 특정 태스크에 특화된 훈련**이 중요하며, 소규모 모델도 대규모 모델을 능가할 수 있음을 인지해야 합니다. **다중 모달(시각+오디오) 통합**과 **역할극 음성 모방**은 여전히 도전적인 영역으로, 내용 정확성과 음성 자연스러움 사이의 균형 있는 개발이 요구됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.