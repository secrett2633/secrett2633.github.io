---
title: "[논문리뷰] Do LLMs Feel? Teaching Emotion Recognition with Prompts, Retrieval, and   Curriculum Learning"
excerpt: "이 [arXiv]에 게시한 'Do LLMs Feel? Teaching Emotion Recognition with Prompts, Retrieval, and   Curriculum Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Emotion Recognition in Conversation
  - Large Language Models
  - Prompt Engineering
  - Demonstration Retrieval
  - Curriculum Learning
  - Fine-tuning
  - Affective Computing
  - SOTA

permalink: /ai/review/2025-11-11-Do-LLMs-Feel-Teaching-Emotion-Recognition-with-Prompts-Retrieval-and-Curriculum-Learning/

toc: true
toc_sticky: true

date: 2025-11-11 00:00:00+0900+0900
last_modified_at: 2025-11-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.07061)

**저자:** Xinran Li, Yu Liu, Jiaqi Qiao, Xiujuan Xu



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLMs)이 대화에서 명시적(explicit) 및 암묵적(implicit) 감정을 효과적으로 인식할 수 있는지 탐구하고, 이 분야의 현재 한계점을 극복하는 것을 목표로 합니다. 특히, LLM의 감정 이해 능력을 향상시켜 인간-컴퓨터 상호작용의 자연성과 공감 능력을 증진하고자 합니다.

## 핵심 방법론
저자들은 **PRC-Emo**라는 새로운 프레임워크를 제안하며, **프롬프트 엔지니어링(Prompt engineering)**, **데모 검색(Demonstration Retrieval)**, 그리고 **커리큘럼 학습(Curriculum learning)**을 통합합니다. 감정 이해를 돕기 위해 **명시적/암묵적 감정 해석**과 **화자 특성**을 추출하는 프롬프트를 설계하고, 이를 위한 **최초의 ERC 전용 데모 검색 저장소**를 구축했습니다. 또한, **화자 내/간의 가중된 감정 변화(weighted emotional shifts)**를 고려한 **대화 난이도 측정 기준**을 도입하여 **LoRA 미세 조정(fine-tuning)** 과정에 커리큘럼 학습 전략을 적용했습니다.

## 주요 결과
**PRC-Emo**는 **IEMOCAP** 및 **MELD** 두 가지 벤치마크 데이터셋에서 **새로운 최첨단(SOTA) 성능**을 달성했습니다. 특히, **IEMOCAP**에서 가중 F1 점수 **71.95%** (기존 대비 0.76% 향상), **MELD**에서 가중 F1 점수 **70.44%** (기존 대비 0.61% 향상)를 기록했습니다. 개별 모듈에 대한 어블레이션 연구에서는 프롬프트 설계, 특히 명시적/암묵적 감정 해석이 성능 향상에 가장 크게 기여했음을 확인했습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM 기반 **감정 인식 모델의 잠재력**을 높이는 실용적인 접근 방식을 제시합니다. **명시적/암묵적 감정 해석**과 같은 구조화된 외부 지식을 활용한 프롬프트 엔지니어링은 모델의 심층적인 감정 이해를 가능하게 합니다. 또한, **다양한 대화 예시를 포함한 전용 데모 검색 저장소**는 모델의 일반화 능력과 소량 데이터 학습 성능을 크게 향상시킬 수 있으며, **대화 난이도를 고려한 커리큘럼 학습**은 모델의 강건성과 희소 클래스 학습에 효과적입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.