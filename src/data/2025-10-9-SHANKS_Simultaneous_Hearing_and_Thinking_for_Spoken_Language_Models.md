---
title: "[논문리뷰] SHANKS: Simultaneous Hearing and Thinking for Spoken Language Models"
excerpt: "Kevin Lin이 [arXiv]에 게시한 'SHANKS: Simultaneous Hearing and Thinking for Spoken Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Spoken Language Models
  - Real-time Interaction
  - Thinking While Listening
  - Chain-of-Thought
  - Interruption
  - Tool Calling
  - Streaming ASR

permalink: /ai/review/2025-10-9-SHANKS_Simultaneous_Hearing_and_Thinking_for_Spoken_Language_Models/

toc: true
toc_sticky: true

date: 2025-10-09 13:45:06+0900
last_modified_at: 2025-10-09 13:45:06+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.06917)

**저자:** Kevin Lin, Chung-Ching Lin, Linjie Li, Xiaofei Wang, Cheng-Han Chiang 외 다수



## 핵심 연구 목표
현재 대규모 언어 모델(LLMs) 및 음성 언어 모델(SLMs)이 사용자의 발화가 끝난 후에야 추론 및 행동을 시작하여 발생하는 **높은 응답 지연 시간** 문제를 해결하는 것이 목표입니다. 사람처럼 **'들으면서 생각하는' (think while listening)** 능력을 SLM에 부여하여 실시간 음성 상호작용의 효율성과 자연스러움을 향상시키고자 합니다.

## 핵심 방법론
본 논문은 **SHANKS (Simultaneous Hearing and Thinking with Chunked Input Speech)** 라는 일반적인 추론 프레임워크를 제안합니다. 이 프레임워크는 사용자 음성 입력을 고정된 시간(`tchunk`) 단위의 청크로 스트리밍하고, 각 청크를 수신할 때마다 이전 음성 및 추론을 기반으로 **'음성 없는 사고(unspoken thinking)' 토큰**을 생성합니다. 이 내부 추론 과정은 사용자 발화를 방해하거나 (**[INTERRUPT]** 토큰) 외부 도구를 호출하는 (**API call**) 의사결정에 활용됩니다.

## 주요 결과
SHANKS는 두 가지 시나리오에서 성능 향상을 입증했습니다. 첫째, 사용자 오류 시 방해(interruption) 시나리오에서 SHANKS는 사고 없이 방해하는 베이스라인 대비 **37.1% 더 정확하게** 방해했습니다. 둘째, 도구 호출(tool call) 시나리오에서는 사용자의 발화가 끝나기 전에 **56.9%의 API 호출**을 성공적으로 완료하여 최종 응답 지연 시간을 크게 줄였습니다. **SHANKS+Call-after-listen** 결합 방식은 **90.0%의 총 호출 정확도**와 **57.3%의 초기 호출 정확도**를 달성했습니다.

## AI 실무자를 위한 시사점
이 연구는 SLM이 실시간 대화 환경에서 더욱 능동적이고 효율적으로 작동할 수 있는 새로운 가능성을 제시합니다. 특히 **교육용 튜터**나 **태스크 지향 에이전트**와 같이 즉각적인 피드백이나 사전 작업이 필요한 애플리케이션에 유용하며, 사용자 경험을 크게 개선할 수 있습니다. 그러나 모델의 **추론 능력**이 백본 LLM에 크게 의존하며, **청크 크기(`tchunk`)**가 지연 시간에 영향을 미칠 수 있음을 고려해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.