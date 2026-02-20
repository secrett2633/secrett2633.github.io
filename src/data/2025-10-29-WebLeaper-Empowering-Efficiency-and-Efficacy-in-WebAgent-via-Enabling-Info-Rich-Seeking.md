---
title: "[논문리뷰] WebLeaper: Empowering Efficiency and Efficacy in WebAgent via Enabling
  Info-Rich Seeking"
excerpt: "arXiv에 게시된 'WebLeaper: Empowering Efficiency and Efficacy in WebAgent via Enabling
  Info-Rich Seeking' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM-based Agents
  - Information Seeking
  - Search Efficiency
  - Task Synthesis
  - Reinforcement Learning
  - Tree-structured Reasoning
  - WebAgent

permalink: /ai/review/2025-10-29-WebLeaper-Empowering-Efficiency-and-Efficacy-in-WebAgent-via-Enabling-Info-Rich-Seeking/

toc: true
toc_sticky: true

date: 2025-10-29 13:11:02+0900
last_modified_at: 2025-10-29 13:11:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.24697)

**저자:** Zhengwei Tao, Haiyang Shen, Baixuan Li, Wenbiao Yin, Jialong Wu, Kuan Li, Zhongwang Zhang, Huifeng Yin, Rui Ye, Liwen Zhang, Xinyu Wang, Pengjun Xie, Jingren Zhou, Yong Jiang



## 핵심 연구 목표
LLM 기반 정보 탐색(IS) 에이전트가 겪는 낮은 탐색 효율성 문제를 해결하는 것이 주된 목표입니다. 기존 연구가 주로 탐색 깊이 개선에 초점을 맞춘 반면, 본 논문은 훈련 태스크 내 대상 엔티티의 희소성으로 인한 비효율성을 지적하며, 정보 탐색 효율성과 효과성을 동시에 향상시키는 새로운 프레임워크인 **WebLeaper** 를 제안합니다.

## 핵심 방법론
정보 탐색 과정을 **트리 구조 추론 문제** 로 모델링하여 더 많은 대상 엔티티를 포함하는 태스크를 생성합니다. curated Wikipedia 테이블을 활용하여 **Basic** , **Union** , **Reverse-Union** 세 가지 태스크 합성 변형을 제안하여 탐색 효율성과 효과성을 체계적으로 높였습니다. 태스크 해결 궤적은 **Information-Seeking Rate (ISR)** 및 **Information-Seeking Efficiency (ISE)** 지표를 사용하여 필터링하며, 강화 학습 단계에서는 **F-score 기반의 세분화된 보상** 과 기존 벤치마크 보상을 결합한 **하이브리드 보상 시스템** 을 적용하고 **Group Relative Policy Optimization (GRPO)** 으로 최적화합니다.

## 주요 결과
WebLeaper는 **BrowseComp** , **GAIA** , **xbench-DeepSearch** , **WideSearch** , **Seal-0** 등 5개 IS 벤치마크에서 강력한 기준선 대비 일관된 성능 향상을 달성했습니다. 특히, 종합 훈련 설정에서 **GAIA 73.2%** , **BrowseComp 38.8%** , **xbench-DeepSearch 72.0%** 의 정확도를 기록했으며, **WideSearch** 에서는 **Success Rate 4.0** 및 **Item-F1 48.8** 로 최고 성능을 보였습니다. RL 미세 조정 후 SFT 전용 기준선 대비 GAIA에서 **+3.3%** 정확도, WideSearch에서 **+2.5%** SR 및 **+3.1%** Item-F1 개선을 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM 기반 에이전트의 정보 탐색 능력 향상에 있어 **검색 효율성** 의 중요성을 강조합니다. AI/ML 엔지니어는 WebLeaper의 **트리 구조 기반 태스크 합성 방법** (Basic, Union, Reverse-Union)을 활용하여 에이전트의 추론 및 계획 능력을 강화하는 **더욱 풍부하고 도전적인 훈련 데이터셋** 을 구축할 수 있습니다. 또한, **ISR 및 ISE와 같은 정량적 지표** 와 **하이브리드 보상 시스템** 은 정보 탐색 및 도구 사용 에이전트의 성능을 최적화하는 데 실용적인 가이드를 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.