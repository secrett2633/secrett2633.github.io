---
title: "[논문리뷰] Describe What You See with Multimodal Large Language Models to Enhance
  Video Recommendations"
excerpt: "Mounia Lalmas이 [arXiv]에 게시한 'Describe What You See with Multimodal Large Language Models to Enhance
  Video Recommendations' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Large Language Models
  - Video Recommendation
  - Zero-Shot Learning
  - Content-Based Filtering
  - Natural Language Processing
  - Foundation Models

permalink: /ai/review/2025-8-20-Describe-What-You-See-with-Multimodal-Large-Language-Models-to-Enhance-Video-Recommendations/

toc: true
toc_sticky: true

date: 2025-08-20 13:26:54+0900
last_modified_at: 2025-08-20 13:26:54+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.09789)

**저자:** Marco De Nadai, Andreas Damianou, Mounia Lalmas



## 핵심 연구 목표
기존 비디오 추천 시스템의 한계인 저수준 시각/음성 특징 및 메타데이터의 의미론적 깊이 부족 문제를 해결하는 것이 목표입니다. 사용자의 의도, 유머, 세계 지식과 같은 고수준의 의미를 포착하여 비디오 클립이 시청자에게 공감을 얻는 이유를 파악하고, 이를 통해 개인화된 추천의 질을 향상시키고자 합니다.

## 핵심 방법론
이 논문은 추천 시스템 모델에 구애받지 않는 **제로-미세 조정(zero-finetuning) 프레임워크** 를 제안합니다. 오프-더-셸프 **Multimodal Large Language Model (MLLM)** 인 **Qwen-VL** 을 활용하여 각 비디오 클립을 풍부한 자연어 설명으로 요약하고, 오디오를 위해 **Whisper** 와 **Qwen-Audio** 를 결합하여 텍스트 및 사운드 분류를 통합합니다. 생성된 텍스트 설명은 **BGE-large 텍스트 인코더** 를 통해 임베딩으로 변환된 후, **Two-Towers** 및 **SASRec** 과 같은 표준 협업 및 콘텐츠 기반 추천 모델에 입력됩니다.

## 주요 결과
**MicroLens-100K 데이터셋** 에서 진행된 실험 결과, MLLM 기반 특징은 기존 시각, 오디오, 메타데이터 특징을 일관되게 능가했습니다. 특히 **Two-Towers 모델** 에서 MLLM 오디오 특징은 **HR@10을 0.0253에서 0.0405로, nDCG@10을 0.0130에서 0.0214로 향상** 시켜 약 **60%의 상대적 성능 향상** 을 보였습니다. MLLM 비디오 특징 또한 **HR@10을 0.0393에서 0.0489로** 향상시키는 등 긍정적인 결과를 보였으며, 이는 **30초 이상의 긴 비디오에서 더욱 두드러졌습니다.**

## AI 실무자를 위한 시사점
이 연구는 **MLLM** 이 비디오 추천 시스템의 성능을 혁신적으로 개선할 수 있음을 보여줍니다. **제로-미세 조정 접근 방식** 은 대규모 MLLM을 직접 학습시키기 어려운 환경에서 매우 실용적이며, 기존 추천 파이프라인에 쉽게 통합할 수 있습니다. AI 실무자들은 이 프레임워크를 활용하여 사용자의 내재된 선호와 콘텐츠의 미묘한 맥락을 더 잘 이해하는 추천 시스템을 구축할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.