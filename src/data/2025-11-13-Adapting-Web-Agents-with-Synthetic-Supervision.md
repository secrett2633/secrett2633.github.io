---
title: "[논문리뷰] Adapting Web Agents with Synthetic Supervision"
excerpt: "Siwei Han이 arXiv에 게시한 'Adapting Web Agents with Synthetic Supervision' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Web Agents
  - Synthetic Data Generation
  - LLM
  - Task Refinement
  - Trajectory Refinement
  - Supervised Fine-tuning
  - Web Automation
  - Environment Adaptation

permalink: /ai/review/2025-11-13-Adapting-Web-Agents-with-Synthetic-Supervision/

toc: true
toc_sticky: true

date: 2025-11-13 00:00:00+0900+0900
last_modified_at: 2025-11-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.06101)

**저자:** Zhaoyang Wang, Yiming Liang, Xuchao Zhang, Qianhui Wu, Siwei Han, Anson Bastos, Rujia Wang, Chetan Bansal, Baolin Peng, Jianfeng Gao, Saravan Rajmohan, Huaxiu Yao



## 핵심 연구 목표
웹 에이전트는 훈련 시 접하지 못한 새로운 웹사이트에 적응하는 데 어려움을 겪는데, 이는 환경별 태스크와 데모 데이터가 부족하기 때문입니다. 기존 합성 데이터 생성 방법론은 태스크 환각 및 트랙토리 노이즈와 같은 품질 문제를 겪고 있어, 이러한 문제를 해결하고 고품질의 합성 데이터를 통해 웹 에이전트의 적응력을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 **SynthAgent** 라는 완전 합성 감독 프레임워크를 제안합니다. 이 프레임워크는 네 가지 주요 단계로 구성됩니다: (1) **범주화된 탐색** 을 통해 환경에 특화된 태스크를 합성하고, (2) **트랙토리 수집** 과정에서 새로운 관찰을 기반으로 태스크 설명의 환각을 완화하기 위해 태스크를 개선하며, (3) 수집 후 전역 컨텍스트를 사용하여 트랙토리의 노이즈나 불일치를 완화하는 **트랙토리 개선** 을 수행합니다. 마지막으로 (4) 개선된 합성 데이터를 사용하여 오픈소스 웹 에이전트를 목표 환경에 적응시키기 위해 **지도 미세 조정(SFT)** 을 진행합니다.

## 주요 결과
**SynthAgent** 는 기존 합성 데이터 기반 방법론들을 일관되게 능가하며, 베이스라인 모델 및 **OS-Genesis** 대비 평균적으로 각각 **+10.2%** 및 **+5.1%** 의 성공률을 향상시켰습니다. 또한, **SynthAgent** 는 가장 높은 트랙토리 품질 **(92.5%)** 을 달성했으며, **Explorer** 대비 약 **60%** 적은 API 비용으로 더 효율적인 탐색 및 개선을 제공했습니다. 특히, **트랙토리 개선(+JR)** 은 **20.80%** 의 성공률로 가장 강력한 성능 향상을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 웹 에이전트의 새로운 환경 적응을 위해 **고품질의 합성 데이터 생성** 이 필수적임을 입증합니다. **태스크 및 트랙토리의 이중 개선** 과 **범주화된 탐색** 방법론은 실제 AI/ML 시스템에서 데이터 희소성 문제를 해결하고 에이전트의 일반화 성능을 높이는 데 실용적인 가이드라인을 제공합니다. 이는 복잡한 웹 자동화 태스크에서 **LLM 기반 에이전트** 의 개발 및 배포 효율성을 크게 향상시킬 수 있는 잠재력을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.