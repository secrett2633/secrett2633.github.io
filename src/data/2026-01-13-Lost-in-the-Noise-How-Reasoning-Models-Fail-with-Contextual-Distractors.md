---
title: "[논문리뷰] Lost in the Noise: How Reasoning Models Fail with Contextual Distractors"
excerpt: "arXiv에 게시된 'Lost in the Noise: How Reasoning Models Fail with Contextual Distractors' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Robustness
  - Contextual Distractors
  - RAG
  - Reasoning Models
  - Alignment
  - Tool Use
  - NoisyBench
  - Rationale-Aware Reward
  - Inverse Scaling

permalink: /ai/review/2026-01-13-Lost-in-the-Noise-How-Reasoning-Models-Fail-with-Contextual-Distractors/

toc: true
toc_sticky: true

date: 2026-01-13 00:00:00+0900+0900
last_modified_at: 2026-01-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.07226)

**저자:** Seongyun Lee, Yongrae Jo, Minju Seo, Moontae Lee, Minjoon Seo



## 핵심 연구 목표
현재 AI 연구는 '정돈된' 벤치마크에 의존하지만, 실제 환경의 본질적인 노이즈를 반영하지 못해 에이전트 AI 시스템의 실제 성능을 오해하게 만듭니다. 이 논문은 **컨텍스트 교란 요소(contextual distractors)** 가 추론 모델에 미치는 치명적인 영향을 체계적으로 평가하고, 노이즈가 있는 환경에서 모델의 견고성을 향상시키는 방법론을 개발하는 것을 목표로 합니다. 특히, 모델이 노이즈에 의해 어떻게 잘못된 추론을 하게 되는지 심층적으로 분석합니다.

## 핵심 방법론
논문은 **NoisyBench** 라는 포괄적인 벤치마크를 도입하여 **RAG, 추론, 정렬, 도구 사용(tool-use)** 등 4가지 태스크에 걸쳐 11개 데이터셋에서 모델 견고성을 평가합니다. **랜덤 문서(random documents), 무관한 채팅 이력(irrelevant chat histories), 하드 네거티브 교란 요소(hard negative distractors)** 와 같은 다양한 노이즈 유형이 사용되었습니다. 모델 견고성을 강화하기 위해 노이즈가 있는 환경에서 유용한 정보를 식별하도록 보상하는 **Rationale-Aware Reward (RARE)** 기법을 제안하고, **RARE** 훈련 데이터셋인 **NoisyInstruct** 를 구축했습니다.

## 주요 결과
평가 결과, 최첨단 모델들이 컨텍스트 교란 요소에 직면했을 때 성능이 최대 **80%** 까지 **치명적으로 하락** 하는 것으로 나타났습니다. 특히, **에이전트 워크플로우** 는 노이즈가 있는 도구 출력에 과도하게 의존하여 오류를 증폭시켰습니다. **RARE** 를 통한 훈련은 모델의 **교란 요소 필터링 비율** 을 크게 증가시키며, **테스트-시간 연산량(test-time computation)** 이 증가할수록 노이즈 환경에서 성능이 저하되는 **역 스케일링(inverse scaling)** 경향을 발견했습니다.

## AI 실무자를 위한 시사점
실제 AI 시스템이 노이즈가 많은 환경에서 얼마나 취약한지를 명확히 보여주며, 기존의 '정돈된' 벤치마크의 한계를 지적합니다. 단순한 스케일링이나 프롬프팅만으로는 해결할 수 없는 **노이즈 견고성 문제** 에 대한 인식을 높이고, **RARE** 와 같은 **추론 과정 인식 보상(rationale-aware rewards)** 이 효과적인 해결책이 될 수 있음을 시사합니다. 향후 **신뢰성 있고 노이즈에 강한 에이전트 AI 시스템** 개발을 위한 중요한 기반을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.