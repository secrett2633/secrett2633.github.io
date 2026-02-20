---
title: "[논문리뷰] The Markovian Thinker"
excerpt: "arXiv에 게시된 'The Markovian Thinker' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Large Language Models
  - Chain-of-Thought
  - Markovian Thinking
  - Context Management
  - Computational Efficiency
  - Long-Context LLMs
  - Transformer Optimization

permalink: /ai/review/2025-10-9-The-Markovian-Thinker/

toc: true
toc_sticky: true

date: 2025-10-09 13:45:06+0900
last_modified_at: 2025-10-09 13:45:06+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.06557)

**저자:** Milad Aghajohari, Kamran Chitsaz, Amirhossein Kazemnejad, Sarath Chandar, Alessandro Sordoni, Aaron Courville, Siva Reddy



## 핵심 연구 목표
본 논문은 추론 LLM 훈련 시 발생하는 **무한한 상태 크기** 와 **추론 길이 증가에 따른 2차 계산 복잡도** 문제를 해결하고자 합니다. 이를 통해 모델의 추론 길이 스케일링을 제한하는 현행 LongCoT-RL 환경의 한계를 극복하고, **선형 계산 및 상수 메모리** 로 매우 긴 추론이 가능한 새로운 패러다임인 **Markovian Thinking** 을 제시하는 것이 목표입니다.

## 핵심 방법론
저자들은 **Delethink** 라는 RL 환경을 제안하며 **Markovian Thinking** 을 구현했습니다. 이 환경은 추론 과정을 **고정된 크기의 청크(fixed-size chunks)** 로 구성하고, 청크 경계에서 컨텍스트를 재설정하며 이전 청크에서 얻은 **짧은 텍스트 요약(carryover)** 만을 다음 프롬프트에 포함합니다. 이를 통해 정책은 제한된 상태만을 기반으로 추론의 연속성을 유지하도록 학습되며, 실험에는 **R1-Distill 1.5B 모델** 이 사용되었습니다.

## 주요 결과
**Delethink** 로 훈련된 **R1-Distill 1.5B 모델** 은 **8K 토큰 청크** 로 추론하며 최대 **24K 토큰** 까지 생각할 수 있었고, 동일한 예산의 **LongCoT-RL** 성능을 능가하거나 대등했습니다. 테스트-시간 스케일링 시, **Delethink** 는 **24K 토큰** 을 넘어 **96K 토큰** 까지 지속적으로 성능이 향상되어 **AIME'24** 에서 **36K 평균 추론 토큰** 으로 **49%** 를 달성한 반면, **LongCoT-RL** 은 정체되었습니다. 또한, **96K 평균 추론 길이** 에 대해 **LongCoT-RL** 이 약 **27 H100-개월** 이 소요되는 반면, **Delethink** 는 약 **7 H100-개월** 만이 소요되어 연산 효율성이 크게 개선됨을 입증했습니다.

## AI 실무자를 위한 시사점
**Delethink** 는 LLM의 추론 길이를 컨텍스트 크기와 분리하여 **선형적인 계산 복잡도** 와 **일정한 메모리 사용량** 으로 **매우 긴 추론** 을 가능하게 함으로써, 기존 LongCoT 방식의 **2차 계산 비용 문제** 를 해결합니다. AI 실무자들은 **Delethink 환경** 을 통해 **적은 컴퓨팅 자원** 으로도 장기 추론 능력을 갖춘 LLM을 훈련할 수 있으며, 이는 특히 **제한된 메모리 환경** 이나 **대규모 추론 스케일링** 이 필요한 애플리케이션에 매우 유용합니다. 본 연구는 기존 모델 아키텍처를 변경하지 않고도 효율성을 높일 수 있는 실용적인 경로를 제공하며, **비-2차(non-quadratic) 시퀀스 아키텍처** 와의 결합 시 더욱 큰 시너지를 기대할 수 있음을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.