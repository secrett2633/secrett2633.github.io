---
title: "[논문리뷰] MAD: Modality-Adaptive Decoding for Mitigating Cross-Modal Hallucinations in Multimodal Large Language Models"
excerpt: "Yong Man Ro이 arXiv에 게시한 'MAD: Modality-Adaptive Decoding for Mitigating Cross-Modal Hallucinations in Multimodal Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLM
  - Cross-modal Hallucination
  - Contrastive Decoding
  - Modality-Adaptive Decoding
  - Self-Assessment
  - Audio-Visual Language Model
  - Training-Free

permalink: /ai/review/2026-01-30-MAD-Modality-Adaptive-Decoding-for-Mitigating-Cross-Modal-Hallucinations-in-Multimodal-Large-Language-Models/

toc: true
toc_sticky: true

date: 2026-01-30 00:00:00+0900+0900
last_modified_at: 2026-01-30 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.21181)

**저자:** Sangyun Chung, Se Yeon Kim, Youngchae Chee, and Yong Man Ro*



## 핵심 연구 목표
본 논문은 **Multimodal Large Language Models (MLLMs)** 에서 발생하는 **교차 모달리티 환각 현상(cross-modal hallucinations)** 을 해결하는 것을 목표로 합니다. 이는 한 모달리티의 정보가 부적절하게 다른 모달리티의 정보 생성에 영향을 미쳐 사실과 다른 결과물을 내놓는 근본적인 문제점을 다룹니다.

## 핵심 방법론
저자들은 **Modality-Adaptive Decoding (MAD)** 이라는 훈련-무관(training-free) 추론 기법을 제안합니다. MAD는 먼저 고정된 모달리티 쿼리 프롬프트를 통해 모델 스스로 태스크에 필요한 모달리티(오디오, 비디오, 둘 다)를 **자가 평가** 하여 **모달리티-적응형 가중치(Wav, Wv, Wa)** 를 추출합니다. 이 가중치들은 이어서 **대조 디코딩(contrastive decoding) 가지** 들(오디오-시각, 시각 전용, 오디오 전용, 질문 전용)에 동적으로 적용되어 관련 모달리티에 집중하고 불필요한 교차 모달리티 간섭을 억제합니다.

## 주요 결과
**MAD** 는 **CMM** 및 **AVHBench** 벤치마크에서 기존 디코딩 방법론을 일관되게 능가했습니다. **VideoLLaMA2-AV** 모델의 경우 **CMM** 에서 전체 정확도를 **7.8%** 개선한 **81.3%** , **AVHBench** 에서 **2.0%** 개선한 **79.4%** 를 달성했습니다. **Qwen2.5-Omni** 모델에서는 **CMM** 에서 **8.7%** 개선한 **81.4%** , **AVHBench** 에서 **4.7%** 개선한 **81.6%** 를 기록했습니다. 또한, **VCD_extended** 와 유사한 낮은 계산 오버헤드를 유지하면서도 성능이 향상되었습니다.

## AI 실무자를 위한 시사점
**MAD** 는 MLLM의 **교차 모달리티 환각 현상** 을 효과적으로 완화하는 실용적이고 훈련-무관한 접근법을 제공합니다. 이는 AI 엔지니어가 **신뢰할 수 있는 멀티모달 애플리케이션** 을 개발하는 데 중요한 기여를 하며, 모델이 스스로 태스크의 모달리티 요구사항을 파악하고 이에 따라 추론 과정을 조절하는 능력을 보여줍니다. 향후 **매개변수 효율적인 예측기** 를 학습하여 모달리티 가중치 추정 속도를 높이는 연구가 실용화에 더욱 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.