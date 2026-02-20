---
title: "[논문리뷰] RecGPT-V2 Technical Report"
excerpt: "Dian Chen이 arXiv에 게시한 'RecGPT-V2 Technical Report' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Recommender Systems
  - Large Language Models
  - Multi-Agent Systems
  - Reinforcement Learning
  - Dynamic Prompting
  - Hybrid Representation
  - Agentic Evaluation
  - Explanation Generation

permalink: /ai/review/2025-12-17-RecGPT-V2-Technical-Report/

toc: true
toc_sticky: true

date: 2025-12-17 00:00:00+0900+0900
last_modified_at: 2025-12-17 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.14503)

**저자:** Dian Chen, Chao Yi, Zhujin Gao, Jiakai Tang, Haoyi Hu



## 핵심 연구 목표
RecGPT-V2는 기존 RecGPT-V1의 **LLM 기반 추천 시스템** 이 겪던 계산 비효율성, 설명 다양성 부족, 제한된 일반화 능력, 단순한 평가 방식의 네 가지 근본적인 한계를 해결하는 것을 목표로 합니다. 이를 통해 **인지적 탐색과 산업적 활용성 간의 격차를 해소** 하고, 확장 가능하며 효율적인 **LLM 기반의 의도 추론 추천 시스템** 을 구축하고자 합니다.

## 핵심 방법론
RecGPT-V2는 네 가지 핵심 혁신을 도입합니다. 첫째, **Hierarchical Multi-Agent System (HMAS)** 과 **Hybrid Representation Inference** 를 통해 의도 추론을 재구성하고 **Atomized Entity Compression** 으로 사용자 행동 토큰을 압축하여 GPU 소비를 **60%** 절감합니다. 둘째, **Meta-Prompting** 프레임워크를 통해 상황에 맞는 프롬프트를 동적으로 생성하여 설명 다양성을 높입니다. 셋째, **Constrained Reinforcement Learning** 으로 다중 보상 충돌을 완화하며, **Constrained Reward Shaping (CRS)** 을 사용하여 안정적인 최적화를 가능하게 합니다. 넷째, **Agent-as-a-Judge** 프레임워크는 다단계 추론으로 평가를 분해하여 인간의 선호도에 더 잘 부합하도록 합니다.

## 주요 결과
온라인 A/B 테스트에서 RecGPT-V2는 Taobao 플랫폼에서 **CTR +2.98%** , **IPV +3.71%** , **TV +2.19%** , **NER +11.46%** 의 상당한 성능 향상을 달성했습니다. 특히, **Hybrid Representation Inference** 와 인프라 최적화를 통해 MFU가 **+53.7%** 증가하고 GPU 소비가 **60%** 감소했습니다. 설명 생성에서는 설명 다양성이 **+7.3%** 증가했으며, **Constrained Reinforcement Learning** 적용 후 태그 예측 정확도는 **+24.1%** , 설명 수용도는 **+13.0%** 향상되었습니다.

## AI 실무자를 위한 시사점
RecGPT-V2는 **LLM 기반 추천 시스템** 의 **산업적 확장성** 과 **효율성** 을 크게 개선할 수 있는 실용적인 솔루션을 제시합니다. 특히 **하이브리드 표현 추론** 과 **계층적 멀티-에이전트 시스템** 은 대규모 사용자 행동 데이터를 처리하는 데 있어 **연산 비용을 획기적으로 절감** 하는 방법을 보여줍니다. **동적 프롬프트 생성** 과 **제약 강화 학습** 은 추천 시스템의 개인화된 설명과 다목적 최적화에 대한 새로운 접근 방식을 제공하여, 실제 서비스 환경에서 사용자 경험과 시스템 가치를 동시에 높일 수 있는 잠재력을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.