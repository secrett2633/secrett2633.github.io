---
title: "[논문리뷰] RedOne 2.0: Rethinking Domain-specific LLM Post-Training in Social   Networking Services"
excerpt: "Zijie Meng이 [arXiv]에 게시한 'RedOne 2.0: Rethinking Domain-specific LLM Post-Training in Social   Networking Services' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Post-Training
  - Domain Adaptation
  - Social Networking Services
  - Reinforcement Learning
  - Supervised Fine-Tuning
  - Catastrophic Forgetting
  - Data Efficiency

permalink: /ai/review/2025-11-11-RedOne-2-0-Rethinking-Domain-specific-LLM-Post-Training-in-Social-Networking-Services/

toc: true
toc_sticky: true

date: 2025-11-11 00:00:00+0900+0900
last_modified_at: 2025-11-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.07070)

**저자:** Fei Zhao, Chonggang Lu, Haofu Qian, Fangcheng Shi, Zijie Meng, Jianzhao Huang, Xu Tang, Zheyong Xie, Zheyu Ye, Zhe Xu, Yao Hu, Shaosheng Cao



## 핵심 연구 목표
SNS(Social Networking Services)의 이질적인 워크로드, 빠르게 변화하는 규범과 속어, 다국어 코퍼스로 인한 급격한 분포 변화 등의 문제점을 해결하고, 기존 **SFT(Supervised Fine-Tuning)** 기반 LLM 학습 방식에서 발생하는 **"seesaw" 효과(in-distribution 성능 향상 시 out-of-distribution 견고성 저하)**를 완화하는 것을 목표로 합니다. 특히 소규모 모델에서 발생하는 이러한 문제에 대한 빠르고 안정적인 적응을 위한 **RL(Reinforcement Learning) 우선순위 포스트 트레이닝 패러다임**을 제시합니다.

## 핵심 방법론
**RedOne 2.0**은 **진보적인 RL-prioritized 3단계 포스트 트레이닝 파이프라인**을 채택합니다. 첫째, **Exploratory Learning** 단계에서는 엄선된 SNS 코퍼스로 초기 도메인 정렬을 수행하고 **DAPO(Direct Advantage Policy Optimization) 기반 RL**을 통해 체계적인 약점을 식별합니다. 둘째, **Targeted Fine-Tuning** 단계에서는 식별된 약점에 대해 **SFT**를 적용하고, 일반 데이터의 일부를 혼합하여 **catastrophic forgetting**을 방지합니다. 마지막으로, **Refinement Learning** 단계에서는 **SNS 중심 신호를 활용한 RL**을 재적용하여 성능을 통합하고 작업 간의 균형을 맞춥니다.

## 주요 결과
**4B 규모 RedOne 2.0 모델**은 여러 작업 카테고리에서 **7B 서브 최적화 기준 모델 대비 평균 2.41**의 성능 향상을 달성했습니다. 또한, **SFT 중심 RedOne 방법이 필요로 하는 데이터의 절반 이하**로 기준 모델 대비 **평균 8.74**의 성능 향상을 기록하여 탁월한 데이터 효율성과 안정성을 입증했습니다. **General-Bench**에서는 **RedOne 2.0 4B가 70.8의 평균 점수**를 얻어, **Qwen3-8B 및 GLM-4-9B**와 같은 더 큰 오픈 모델들을 능가했습니다. 온라인 테스트에서는 **Advertiser Value가 0.43% 증가**하고 **대화형 제목 비율이 25.8% 증가**했습니다.

## AI 실무자를 위한 시사점
**RedOne 2.0**은 **SNS와 같이 빠르게 변화하고 복잡한 도메인**에서 LLM을 효과적으로 미세 조정할 수 있는 **실용적이고 비용 효율적인 방법론**을 제공합니다. **RL-prioritized 다단계 접근 방식**은 기존 SFT의 **"seesaw" 효과를 완화**하면서도 **데이터 효율성을 극대화**하여 제한된 리소스 환경에서도 강력한 도메인 특화 LLM을 구축할 수 있게 합니다. 특히, **4B와 같은 소규모 모델**에서도 인상적인 성능을 보여주어 **온라인 서비스에 LLM을 통합**하고자 하는 AI 엔지니어들에게 큰 도움이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.