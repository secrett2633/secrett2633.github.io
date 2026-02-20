---
title: "[논문리뷰] MultiVerse: A Multi-Turn Conversation Benchmark for Evaluating Large
  Vision and Language Models"
excerpt: "arXiv에 게시된 'MultiVerse: A Multi-Turn Conversation Benchmark for Evaluating Large
  Vision and Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-Turn Conversation
  - VLM Evaluation
  - Benchmark
  - Vision and Language Models
  - Contextual Understanding
  - Checklist-based Evaluation
  - Interactive AI

permalink: /ai/review/2025-10-21-MultiVerse-A-Multi-Turn-Conversation-Benchmark-for-Evaluating-Large-Vision-and-Language-Models/

toc: true
toc_sticky: true

date: 2025-10-21 13:08:30+0900
last_modified_at: 2025-10-21 13:08:30+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.16641)

**저자:** Young-Jun Lee, Byung-Kwan Lee, Jianshu Zhang, Yechan Hwang, Byungsoo Ko, Han-Gyu Kim, Dongyu Yao, Xuankun Rong, Eojin Joo, Seung-Ho Han, Bowon Ko, Ho-Jin Choi



## 핵심 연구 목표
기존 **Vision-and-Language Model (VLM)** 평가 벤치마크들이 다중 턴 대화 시나리오의 깊이와 폭을 충분히 포착하지 못하는 한계를 해결하고자 합니다. 이 연구는 **MULTIVERSE** 라는 새로운 다중 턴 대화 벤치마크를 제시하여, VLM이 다양한 태스크와 복잡한 상호작용 목표를 아우르는 실제와 같은 다중 턴 환경에서 얼마나 효과적으로 작동하는지 종합적으로 평가하는 것을 목표로 합니다.

## 핵심 방법론
**MULTIVERSE** 는 **12개의 기존 VLM 평가 벤치마크** 에서 수집된 **647개의 대화** 로 구성됩니다. 데이터셋은 **Source Image Collection** , **Personal Background Generation** (사용자 페르소나 및 시나리오), **Multi-Turn Conversation Generation** ( **GPT-4o** 를 활용한 복잡도 증가 및 다양한 언어 스타일의 4턴 대화), **Manual Reviewing** , 그리고 **Checklist Generation** 의 5단계 과정을 거쳐 구축됩니다. 평가 방법론으로는 **인스턴스별 체크리스트 기반 평가** 를 제안하며, **GPT-4o** 를 평가 VLM으로 사용하여 **Checklist Completion Ratio** 와 **Quality Assessment** 를 측정합니다.

## 주요 결과
**MULTIVERSE** 는 **484개의 태스크** , **484개의 상호작용 목표** , 그리고 **25개의 이미지 도메인** 을 포함하는 광범위한 평가 환경을 제공합니다. **18개의 VLM** 평가 결과, **GPT-4o** 와 같은 최강 모델조차 복잡한 다중 턴 대화에서 **50% 미만의 성공률** 을 기록하여, 지속적인 대화 추론의 어려움을 보여주었습니다. 특히 **Ground-truth 대화 이력** 을 제공할 때 모델 성능이 크게 향상되었으며, **모델 크기 증가** 가 다중 턴 상호작용 능력을 개선하지만, 태스크에 따라 그 효과가 다를 수 있음을 확인했습니다.

## AI 실무자를 위한 시사점
본 연구는 현재 VLM들이 단일 턴 벤치마크에서의 뛰어난 성능에도 불구하고 **실제 다중 턴 대화 시나리오에서는 아직 상당한 개선이 필요함** 을 명확히 합니다. VLM 개발자들은 **정확하고 풍부한 대화 맥락(in-context learning)** 을 제공하는 것이 모델 성능 향상에 핵심적임을 인지하고, 수학, 코딩 등 **고급 추론 태스크** 와 분석, 검증 같은 **다양한 상호작용 목표** 를 지원하는 대화 능력 강화에 집중해야 합니다. **MULTIVERSE** 는 이러한 포괄적인 다중 턴 상호작용 능력을 평가하는 데 있어 효과적인 표준 벤치마크로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.