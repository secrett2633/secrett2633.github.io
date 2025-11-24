---
title: "[논문리뷰] Can Large Multimodal Models Actively Recognize Faulty Inputs? A
  Systematic Evaluation Framework of Their Input Scrutiny Ability"
excerpt: "Yuan Wu이 [arXiv]에 게시한 'Can Large Multimodal Models Actively Recognize Faulty Inputs? A
  Systematic Evaluation Framework of Their Input Scrutiny Ability' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Multimodal Models
  - Input Scrutiny
  - Error Detection
  - Faulty Inputs
  - Evaluation Framework
  - Modality Preference
  - Cross-Modal Inconsistency

permalink: /ai/review/2025-8-8-Can-Large-Multimodal-Models-Actively-Recognize-Faulty-Inputs-A-Systematic-Evaluation-Framework-of-Their-Input-Scrutiny-Ability/

toc: true
toc_sticky: true

date: 2025-08-08 13:32:22+0900
last_modified_at: 2025-08-08 13:32:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.04017)

**저자:** Haiqi Yang, Jinzhe Li, Gengxu Li, Yi Chang, Yuan Wu



## 핵심 연구 목표
본 논문은 대규모 멀티모달 모델(LMMs)이 결함 있는 입력을 수동적으로 수용하여 잘못된 추론을 유발하는 문제를 해결하고자 합니다. 특히, LMMs가 명시적인 지시 없이도 **오류가 있는 입력을 능동적으로 감지하고 분석**할 수 있는지에 대한 체계적인 평가가 부족함을 지적하며, 이를 탐색하고 평가하는 **ISEval 프레임워크**를 제시하는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 **Input Scrutiny Ability Evaluation Framework (ISEval)**을 도입하고, **7가지 유형의 결함 있는 전제(expression, conditional, reasoning 오류)**를 포함하는 **ISEval-dataset**을 구축했습니다. **Spontaneous Error Detection Rate (SEDR)**, **Guided Error Detection Rate (GEDR)**, 그리고 **Modality Trust Preference Score (MTPS)**라는 3가지 평가 지표를 사용하여 **GPT-4o, Gemini 2.5 pro** 등 **10개의 최신 LMMs**를 체계적으로 평가했습니다.

## 주요 결과
평가 결과, 대부분의 모델은 명시적인 지시 없이 결함 있는 텍스트 전제를 능동적으로 감지하는 능력이 **제한적(SEDR이 낮음)**이었으며, **GPT-4o**는 **4.71%**, **InternVL3-38B-Instruct**는 **3.67%**를 기록했습니다. 그러나 명시적인 프롬프트가 제공될 경우 **오류 감지율(GEDR)**이 크게 향상되었는데, **Grok 3**가 **58.14%**, **Gemini 2.5 pro**가 **57.72%**를 달성했습니다. 모델들은 **논리적 오류** 식별에는 뛰어나지만, 표면적인 **언어적 오류**에는 취약했으며, 교차 모달 불일치 상황에서는 **Gemini 2.5 pro**와 **Claude Sonnet 4**가 시각 정보에 더 의존했습니다.

## AI 실무자를 위한 시사점
LMMs가 **자율적인 입력 검토 능력**이 부족하여 **명시적인 지시에 크게 의존**한다는 점은 실제 AI 시스템의 신뢰성 확보에 중요한 시사점을 제공합니다. 이는 LMMs에 **능동적인 입력 유효성 검증 메커니즘**을 통합하는 연구의 필요성을 강조합니다. 또한, 모델의 **모달리티 선호도**가 오류 유형과 문맥에 따라 달라지므로, 이를 고려한 **멀티모달 통합 전략**이 더욱 신뢰할 수 있는 LMMs 개발에 필수적입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.