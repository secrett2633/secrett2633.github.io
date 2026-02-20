---
title: "[논문리뷰] Demystifying Scientific Problem-Solving in LLMs by Probing Knowledge and
  Reasoning"
excerpt: "Arman Cohan이 arXiv에 게시한 'Demystifying Scientific Problem-Solving in LLMs by Probing Knowledge and
  Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Scientific Reasoning
  - Knowledge Retrieval
  - Reasoning Probing
  - Benchmarks
  - Chain-of-Thought
  - Fine-tuning

permalink: /ai/review/2025-8-27-Demystifying-Scientific-Problem-Solving-in-LLMs-by-Probing-Knowledge-and-Reasoning/

toc: true
toc_sticky: true

date: 2025-08-27 13:22:18+0900
last_modified_at: 2025-08-27 13:22:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.19202)

**저자:** Alan Li, Yixin Liu, Arpan Sarkar, Doug Downey, Arman Cohan



## 핵심 연구 목표
본 논문은 LLM의 과학 문제 해결 능력에 있어 **깊은 도메인 지식** 과 **복잡한 추론 능력** 의 필요성을 강조하며, 이를 종합적으로 평가할 수 있는 통일된 벤치마크의 부재와 지식 및 추론의 역할을 체계적으로 분리하여 연구하는 방법론의 부족을 해결하는 것을 목표로 합니다. 특히, LLM의 **CoT(Chain-of-Thought) 추론** 이 지식 검색 및 활용에 미치는 영향을 심층적으로 분석하고자 합니다.

## 핵심 방법론
저자들은 과학적 추론 벤치마크 모음인 **SCIREAS** 와 더 도전적인 추론을 위한 하위 집합인 **SCIREAS-PRO** 를 도입했습니다. 또한, **KRUX (Knowledge & Reasoning Utilization eXams)** 라는 새로운 프로빙 프레임워크를 제안하여, 다른 모델의 추론 트레이스에서 추출한 **원자적 지식 요소(KIs)** 를 인컨텍스트로 제공함으로써 지식과 추론의 역할을 분리하여 분석합니다. 이를 위해 **Qwen2.5-7B-Instruct** 및 **Llama-3.1-8B-Instruct** 기반 모델들을 **SYNTHETIC-1** 데이터셋의 수학 및 STEM 도메인 추론 트레이스로 **CoT SFT(Supervised Fine-tuning)** 를 수행했습니다.

## 주요 결과
**KRUX** 프레임워크를 사용한 분석 결과, **모델 파라미터로부터 태스크 관련 지식을 검색하는 것이 LLM 과학 추론의 핵심 병목** 임이 밝혀졌습니다. 외부 인컨텍스트 **KIs** 가 제공될 때, 바닐라 인스트럭트 모델이 추론 강화 모델보다 **최대 10% 더 높은 성능** 을 보였습니다. 또한, 추론 미세 조정된 모델들도 외부 지식을 통해 추가적인 성능 향상을 일관되게 얻었으며, **길어진 CoT가 모델의 관련 지식 표면화 능력** 을 향상시키는 것으로 나타났습니다.

## AI 실무자를 위한 시사점
LLM이 복잡한 과학 문제를 해결하는 데 있어 **효율적인 지식 검색 및 활용 능력** 이 매우 중요하므로, 관련 연구 및 개발 시 **고품질 외부 메모리 모듈** 이나 검색 증강 생성(RAG) 시스템의 통합을 고려해야 합니다. **CoT 미세 조정** 은 모델의 추론 능력을 직접적으로 강화할 뿐만 아니라, 모델 내부에 내재된 지식을 더 효과적으로 '표면화'하여 활용하도록 돕기 때문에 **추론 데이터셋을 활용한 SFT** 가 LLM 과학 문제 해결 능력 향상에 필수적입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.