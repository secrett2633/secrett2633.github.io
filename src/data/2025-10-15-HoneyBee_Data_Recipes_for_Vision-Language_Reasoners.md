---
title: "[논문리뷰] HoneyBee: Data Recipes for Vision-Language Reasoners"
excerpt: "이 [arXiv]에 게시한 'HoneyBee: Data Recipes for Vision-Language Reasoners' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models
  - Data Curation
  - Chain-of-Thought
  - VL Reasoning
  - Dataset Scaling
  - Supervised Finetuning
  - HONEYBEE
  - Test-Time Scaling

permalink: /ai/review/2025-10-15-HoneyBee_Data_Recipes_for_Vision-Language_Reasoners/

toc: true
toc_sticky: true

date: 2025-10-15 13:01:40+0900
last_modified_at: 2025-10-15 13:01:40+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.12225)

**저자:** Hritik Bansal, Devandra Singh Sachan, Kai-Wei Chang, Aditya Grover, Gargi Ghosh, Wen-tau Yih, Ramakanth Pasunuru



## 핵심 연구 목표
본 연구는 고성능 시각-언어(VL) 추론 훈련 데이터셋 구축의 원리를 규명하고, 다양한 데이터 큐레이션 접근 방식이 VL 추론 능력에 미치는 영향을 체계적으로 분석하는 것을 목표로 합니다. 특히, 맥락 소스, 데이터 개입(interventions), 그리고 이미지, 질문, CoT(Chain-of-Thought) 해법 등 데이터 차원별 확장이 VLM 성능에 어떤 영향을 미치는지 밝히고자 합니다.

## 핵심 방법론
연구팀은 **컨텍스트 큐레이션**, **데이터 개입**, **데이터 확장**의 3단계 파이프라인을 통해 **HONEYBEE** 데이터셋을 구축했습니다. **컨텍스트 큐레이션**에서는 다양한 VL 추론 데이터셋의 맥락 소스를 평가하고, **데이터 개입**으로는 시각적 교란, 텍스트 풍부 이미지, **이미지 캡션** 활용, **텍스트 전용 추론 데이터 추가** 등의 전략을 탐색했습니다. 최종적으로 **이미지, 질문, CoT 해법**의 양을 체계적으로 늘려 데이터 확장 효과를 분석했으며, **PLM(Perception Language Models) 1B~8B 모델**을 **감독 미세 조정(SFT)** 방식으로 훈련하여 평가했습니다.

## 주요 결과
**HONEYBEE** 데이터셋으로 훈련된 VL 모델들은 기존의 최첨단 모델들을 능가하는 성능을 보였습니다. 특히, **PLM-HONEYBEE-3B 모델**은 MathVerse에서 SOTA 모델 대비 **7.8%**, 기본 모델 대비 **24.8%**의 성능 향상을 달성했습니다. 또한, **이미지 캡션** 및 **텍스트 전용 추론 데이터**와 같은 개입 전략이 상당한 성능 이득을 가져왔으며, **이미지, 질문, CoT**의 모든 데이터 차원을 확장할 때 추론 능력이 일관되게 향상됨을 확인했습니다. 효율적인 **테스트 시간 스케일링(TTS)** 전략인 **공유 캡션 디코딩**은 정확도 저하 없이 디코딩 비용을 **73%** 절감했습니다.

## AI 실무자를 위한 시사점
본 연구는 **시각-언어 추론 시스템** 개발에 있어 **체계적인 데이터 큐레이션**의 중요성을 강조하며, **이미지 캡션 활용** 및 **텍스트 전용 추론 데이터 통합**이 VLM 성능을 크게 향상시킬 수 있는 실용적인 데이터 레시피를 제공합니다. 또한, **데이터의 다차원적 확장**이 지속적인 성능 개선으로 이어진다는 점은 대규모 VL 데이터셋 구축의 중요성을 시사합니다. 특히, **공유 캡션 디코딩** 기법은 **테스트 시 추론 비용을 획기적으로 줄여**, VL 추론 모델의 실제 애플리케이션 배포 효율성을 높이는 데 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.