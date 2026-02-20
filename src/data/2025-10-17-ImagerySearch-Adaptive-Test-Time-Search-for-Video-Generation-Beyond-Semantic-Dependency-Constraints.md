---
title: "[논문리뷰] ImagerySearch: Adaptive Test-Time Search for Video Generation Beyond
  Semantic Dependency Constraints"
excerpt: "arXiv에 게시된 'ImagerySearch: Adaptive Test-Time Search for Video Generation Beyond
  Semantic Dependency Constraints' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Test-Time Search
  - Diffusion Models
  - Semantic Dependency
  - Adaptive Reward
  - Evaluation Benchmark
  - Prompt-Guided

permalink: /ai/review/2025-10-17-ImagerySearch-Adaptive-Test-Time-Search-for-Video-Generation-Beyond-Semantic-Dependency-Constraints/

toc: true
toc_sticky: true

date: 2025-10-17 13:09:57+0900
last_modified_at: 2025-10-17 13:09:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.14847)

**저자:** Meiqi Wu, Jiashu Zhu, Xiaokun Feng, Chubin Chen, Bingze Song, Fangyuan Mao, Jiahong Wu, Xiangxiang Chu, Chen Zhu, Kaiqi Huang



## 핵심 연구 목표
본 연구는 기존 비디오 생성 모델들이 **상상적인 시나리오** 나 **장거리 의미론적 관계** 를 포함하는 프롬프트에서 성능이 저하되는 문제를 해결하고자 합니다. 이는 학습 데이터 분포 외의 개념이나 고정된 테스트-타임 스케일링 방법론의 한계 때문이며, **프롬프트의 의미론적 복잡성에 적응** 하여 더욱 일관되고 시각적으로 그럴듯한 비디오를 생성하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **ImagerySearch** 라는 프롬프트 기반의 적응형 테스트-타임 탐색 전략을 제안합니다. 이는 프롬프트의 의미론적 관계에 따라 추론 탐색 공간과 보상 함수를 동적으로 조정하는 **Semantic-distance-aware Dynamic Search Space (SaDSS)** 와 **Adaptive Imagery Reward (AIR)** 두 가지 핵심 구성 요소로 이루어져 있습니다. **SaDSS** 는 **Constrained Semantic Scorer** 를 사용하여 프롬프트의 **Dsem(p)** 에 기반해 후보 비디오의 수를 동적으로 조정하고, **AIR** 는 **Dsem** 을 보상 공식에 통합하여 장거리 의미론에 대한 정렬을 강화합니다. 또한, 장거리 의미론적 프롬프트를 위한 최초의 전용 벤치마크인 **LDT-Bench** 와 자동 평가 프로토콜 **ImageryQA** 를 함께 소개합니다.

## 주요 결과
**ImagerySearch** 는 **LDT-Bench** 에서 **Wan2.1** 을 포함한 강력한 비디오 생성 모델 및 기존 테스트-타임 스케일링 접근 방식을 일관되게 능가하며, **ImageryQA** 점수에서 **57.11%** 를 달성하여 **Wan2.1 (48.28%)** 대비 **8.83%p** 의 상당한 개선을 보였습니다. **VBench** 에서도 **83.48%** 의 최고 평균 성능을 기록하며, 특히 **Dynamic Degree** 및 **Subject Consistency** 지표에서 강점을 보였습니다. 특히, **SaDSS** 의 동적 접근 방식은 정적 탐색 공간 구성보다 성능을 크게 향상시켰습니다.

## AI 실무자를 위한 시사점
**ImagerySearch** 는 기존 모델의 **학습 데이터 분포 외 영역** 에서도 비디오 생성 품질을 향상시킬 수 있는 실용적인 **테스트-타임 최적화 전략** 을 제시합니다. 이는 **프롬프트의 의미론적 복잡성** 에 따라 **탐색 공간과 보상 메커니즘을 동적으로 조절** 하는 아이디어를 통해, 복잡한 사용자 요구사항에 더 잘 반응하는 생성 AI 시스템 개발에 영감을 줄 수 있습니다. 또한, **LDT-Bench** 는 장거리 의미론적 이해와 **창의적 비디오 생성 능력** 을 평가하는 새로운 표준을 제공하여, 향후 이 분야의 연구 발전에 중요한 기반이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.