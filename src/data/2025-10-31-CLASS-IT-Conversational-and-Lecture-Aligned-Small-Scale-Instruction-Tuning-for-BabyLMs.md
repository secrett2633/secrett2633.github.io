---
title: "[논문리뷰] CLASS-IT: Conversational and Lecture-Aligned Small-Scale Instruction
  Tuning for BabyLMs"
excerpt: "arXiv에 게시된 'CLASS-IT: Conversational and Lecture-Aligned Small-Scale Instruction
  Tuning for BabyLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Instruction Tuning
  - BabyLMs
  - Small-scale LMs
  - Curriculum Learning
  - Conversational AI
  - Question Answering
  - Zero-shot Evaluation
  - SuperGLUE

permalink: /ai/review/2025-10-31-CLASS-IT-Conversational-and-Lecture-Aligned-Small-Scale-Instruction-Tuning-for-BabyLMs/

toc: true
toc_sticky: true

date: 2025-10-31 18:37:31+0900
last_modified_at: 2025-10-31 18:37:31+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.25364)

**저자:** Luca Capone, Alessandro Bondielli, Alessandro Lenci



## 핵심 연구 목표
본 연구는 소규모 언어 모델(BabyLMs)이 명령어 튜닝(Instruction Tuning)을 통해 성능 향상을 얻을 수 있는지 탐구합니다. 특히, 대화형 및 질문-응답 방식의 명령어 튜닝 데이터셋과 병합 또는 순차적 커리큘럼 학습 방식이 BabyLMs의 미세 조정 및 제로샷 성능에 미치는 영향을 비교 분석하여, 상호작용 중심 적응과 광범위한 언어 일반화 사이의 균형을 이해하고자 합니다.

## 핵심 방법론
연구팀은 **100M** 및 **140M 파라미터** 를 가진 **디코더 전용 LLaMA-스타일 모델** 을 사용했습니다. 모델들은 약 **91M 단어** 규모의 사전 학습 데이터셋으로 **8 에포크** 사전 훈련되었으며, 이는 아동의 언어 노출량과 유사한 규모입니다. 명령어 튜닝을 위해 스위치보드(Switchboard) 기반의 **대화형 데이터** 와 **LLaMA-3.2-3B-Instruct** 를 활용하여 증강된 단순 위키피디아(Simple Wikipedia) 기반의 **질문-응답 데이터** 를 총 **8.7M 단어** 규모로 구성했습니다. 이 데이터는 병합 방식 또는 순차적 커리큘럼( **it_switch_wiki** , **it_wiki_switch** ) 방식으로 **10 에포크** 추가 튜닝되었습니다.

## 주요 결과
명령어 튜닝은 **SuperGLUE** 미세 조정 시나리오에서 작지만 일관된 성능 향상을 보였으며, 특히 **순차적 커리큘럼** 이 병합 데이터 방식보다 더 나은 결과를 보였습니다. 전반적인 z-점수 분포에서 **140M 파라미터 모델** 이 **100M 모델** 보다 우수했습니다. 그러나 제로샷 평가에서는 이러한 개선이 일관되게 나타나지 않았으며, **100M 모델** 이 **R2 기반 심리언어학적 상관관계 태스크** 에서 **140M 모델** 보다 훨씬 뛰어난 성능을 보였습니다.

## AI 실무자를 위한 시사점
소규모 LMs에서 명령어 튜닝은 특정 태스크에 대한 미세 조정에는 유익하지만, 광범위한 언어 일반화 능력에는 일관되게 전이되지 않을 수 있습니다. 이는 명령어 튜닝이 모델을 특정 상호작용 행동에 편향시켜 제로샷 성능을 저해할 수 있음을 시사하며, 대규모 LMs와는 다른 양상입니다. 실무자들은 BabyLMs와 같은 저자원 모델을 활용할 때, 목표 태스크에 대한 미세 조정에 초점을 맞추고, 일반화 능력 향상을 위해서는 하이브리드 접근 방식이나 커리큘럼 학습을 고려해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.