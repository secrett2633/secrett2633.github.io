---
title: "[논문리뷰] Multi-Faceted Attack: Exposing Cross-Model Vulnerabilities in Defense-Equipped Vision-Language Models"
excerpt: "이 [arXiv]에 게시한 'Multi-Faceted Attack: Exposing Cross-Model Vulnerabilities in Defense-Equipped Vision-Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models (VLMs)
  - Adversarial Attack
  - Jailbreaking
  - Reward Hacking
  - Content Moderation Bypass
  - Cross-Model Transferability
  - Safety Vulnerabilities

permalink: /ai/review/2025-11-24-Multi-Faceted-Attack-Exposing-Cross-Model-Vulnerabilities-in-Defense-Equipped-Vision-Language-Models/

toc: true
toc_sticky: true

date: 2025-11-24 00:00:00+0900+0900
last_modified_at: 2025-11-24 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.16110)

**저자:** Yijun Yang, Lichao Wang, Jianping Zhang, Chi Harold Liu, Lanqing Hong, Qiang Xu



## 핵심 연구 목표
본 논문은 RLHF(Reinforcement Learning from Human Feedback), 시스템 프롬프트, 입력/출력 콘텐츠 필터 등 다양한 방어 메커니즘이 적용된 **Vision-Language Models (VLMs)**의 **안전성 취약점**을 체계적으로 드러내는 것을 목표로 합니다. 특히, 기존 공격 방식들이 단일 모달리티에 집중하거나 실제 운영 환경의 방어 스택을 간과하는 한계를 극복하고, 생산 등급 VLM에 대한 일반화 가능하고 전이 가능한 안전성 실패를 밝히고자 합니다.

## 핵심 방법론
본 연구는 **Multi-Faceted Attack (MFA)**이라는 종합적인 프레임워크를 제안하며, 이는 세 가지 주요 공격 기법을 결합합니다. 첫째, **Attention-Transfer Attack (ATA)**은 보상 모델의 선호도 격차를 악용하여 정렬을 무력화합니다. 둘째, **필터 타겟 전이 공격(Filter-Targeted Transfer Attack)**은 VLM의 반복 편향과 효율적인 서명 생성을 통해 콘텐츠 중재 필터를 우회하며, **Multi-Token 최적화** 및 **Weakly Supervised 최적화**를 활용하여 전이성을 강화합니다. 셋째, **Vision Encoder 타겟 이미지 공격(Vision Encoder-Targeted Image Attack)**은 악의적인 시스템 프롬프트를 이미지 임베딩에 삽입하여 시스템 프롬프트 방어를 무력화하고, **코사인 유사도 손실(cosine-similarity loss)**을 사용한 **PGD(Projected Gradient Descent)**로 최적화됩니다.

## 주요 결과
MFA는 **17개의 VLM** (8개 오픈소스, 9개 상용 모델 포함)을 대상으로 테스트되었으며, **HEHS 데이터셋**에서 **58.5%**의 전반적인 공격 성공률을 달성했습니다. 특히, 주요 상용 모델에서는 **52.8%**의 성공률을 보여, 기존 최고 성능 방식 대비 **34%**의 상대적 개선을 이루었습니다. **Attention-Transfer Attack**은 보상 모델에서 이중 응답(dual response)이 거부 응답보다 높은 보상을 일관되게 얻음을 정량적으로 확인하여 RLHF 정렬 취약점을 입증했습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 현재 VLM의 **다계층 안전 스택이 여전히 취약**하며, **Reward Hacking, 콘텐츠 필터 우회, 비전 인코더 취약점**이 결합될 때 효과적으로 뚫릴 수 있음을 인지해야 합니다. 모델 정렬 훈련만으로는 충분하지 않으며, **교차 모델 전이성**이 높은 공격 방식에 대비하기 위해 **이론에 기반한 평가 프레임워크**와 **다양한 방어 전략**이 필요함을 시사합니다. 특히, **공유된 시각적 표현(shared visual representations)**으로 인한 **단일 문화(monoculture) 위험**에 대한 주의가 요구되며, 이는 하나의 공격으로 여러 모델을 취약하게 만들 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.