---
title: "[논문리뷰] TIR-Bench: A Comprehensive Benchmark for Agentic Thinking-with-Images
  Reasoning"
excerpt: "Shaoheng Lin이 [arXiv]에 게시한 'TIR-Bench: A Comprehensive Benchmark for Agentic Thinking-with-Images
  Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLMs
  - Agentic Reasoning
  - Thinking-with-Images
  - Visual Reasoning Benchmark
  - Tool Use
  - Image Manipulation
  - Fine-tuning

permalink: /ai/review/2025-11-4-TIR-Bench-A-Comprehensive-Benchmark-for-Agentic-Thinking-with-Images-Reasoning/

toc: true
toc_sticky: true

date: 2025-11-09 19:22:42+0900
last_modified_at: 2025-11-09 19:22:42+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.01833)

**저자:** Ming Li, Jike Zhong, Shitian Zhao, Haoquan Zhang, Shaoheng Lin, Yuxiang Lai, Chen Wei, Konstantinos Psounis, Kaipeng Zhang



## 핵심 연구 목표
본 연구는 기존 벤치마크들이 **OpenAI o3**와 같은 최신 MLLM의 **'thinking-with-images' (이미지로 사고하기)** 능력, 즉 이미지 조작 도구를 활용한 문제 해결 능력을 충분히 포착하지 못하는 문제를 해결하고자 합니다. 정적인 시각 정보 분석을 넘어, MLLM의 **동적이고 도구 의존적인 에이전트적 시각 추론 능력**을 종합적으로 평가할 수 있는 새로운 벤치마크인 **TIR-Bench**를 제안합니다.

## 핵심 방법론
**TIR-Bench**는 **13가지의 다양한 태스크**로 구성되며, 각 태스크는 **체인-오브-사고(chain-of-thought)** 과정에서 **확대, 회전, 대비 향상, 보조선 추가**와 같은 이미지 처리 및 조작을 위한 **새로운 도구 사용**을 요구합니다. **22가지 선도적인 MLLM** (오픈소스, 독점, 도구 사용 증강 모델 포함)을 대상으로 포괄적인 성능 평가를 수행했으며, 직접적인 지도 미세 조정(SFT)과 **에이전트적 SFT**를 비교하는 파일럿 스터디를 진행했습니다.

## 주요 결과
**TIR-Bench**는 모든 모델에 대해 매우 도전적인 벤치마크로, **최고 성능은 46%**에 불과했습니다. 전통적인 비(非)에이전트 모델들은 낮은 성능(예: **Gemini-2.5-pro는 28.9%**만 달성)을 보인 반면, **o3-TU 모델**이 **46%의 평균 정확도**로 가장 강력한 성능을 보이며 **Gemini-2.5-Pro** 대비 약 **17%p**, **코드 인터프리터 없는 o3** 대비 약 **19%p** 높은 성능을 기록했습니다. 또한, **에이전트적 SFT**가 직접 SFT보다 **손실 감소가 더 빠르고** 데이터 규모에 따라 성능이 향상되는 등, 이미지 조작 관련 태스크에서 훨씬 효과적임을 입증했습니다.

## AI 실무자를 위한 시사점
본 벤치마크는 복잡한 시각 추론 태스크에서 **MLLM의 에이전트적 기능과 도구 사용 능력**이 필수적임을 명확히 보여줍니다. AI/ML 엔지니어는 MLLM 개발 및 적용 시 **코드 인터프리터와 같은 강력한 도구 통합 능력**을 갖춘 모델에 초점을 맞춰야 합니다. 또한, **에이전트적 미세 조정 전략**은 여러 단계의 시각적 조작이 필요한 문제 해결 동작을 학습시키는 데 매우 중요하며, 이는 실제 AI 애플리케이션의 성능 향상에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.