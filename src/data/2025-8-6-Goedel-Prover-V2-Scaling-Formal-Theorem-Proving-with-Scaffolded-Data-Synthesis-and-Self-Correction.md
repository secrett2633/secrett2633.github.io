---
title: "[논문리뷰] Goedel-Prover-V2: Scaling Formal Theorem Proving with Scaffolded Data
  Synthesis and Self-Correction"
excerpt: "Jui-Hui Chung이 [arXiv]에 게시한 'Goedel-Prover-V2: Scaling Formal Theorem Proving with Scaffolded Data
  Synthesis and Self-Correction' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Automated Theorem Proving
  - Formal Verification
  - Language Models
  - Self-Correction
  - Data Synthesis
  - Reinforcement Learning
  - Model Averaging
  - Lean

permalink: /ai/review/2025-8-6-Goedel-Prover-V2-Scaling-Formal-Theorem-Proving-with-Scaffolded-Data-Synthesis-and-Self-Correction/

toc: true
toc_sticky: true

date: 2025-08-06 13:46:36+0900
last_modified_at: 2025-08-06 13:46:36+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.03613)

**저자:** Yong Lin, Shange Tang, Bohan Lyu, Ziran Yang, Jui-Hui Chung, Haoyu Zhao, Lai Jiang, Yihan Geng, Jiawei Ge, Jingruo Sun, Jiayun Wu, Jiri Gesi, Ximing Lu, David Acuna, Kaiyu Yang, Hongzhou Lin, Yejin Choi, Danqi Chen, Sanjeev Arora, Chi Jin



## 핵심 연구 목표
본 논문은 형식 증명 자동화(Automated Theorem Proving, ATP) 분야에서 기존의 대규모 모델 및 연산량 의존성을 극복하고, 더 적은 자원으로도 최첨단 성능을 달성하는 새로운 오픈소스 언어 모델 시리즈인 **Goedel-Prover-V2** 를 개발하는 것을 목표로 합니다. 특히 복잡한 수학 정리의 증명 과정에서 기계 학습 시스템의 효율성과 정확성을 극대화하고자 합니다.

## 핵심 방법론
연구진은 **전문가 반복(expert iteration)** 및 **강화 학습(reinforcement learning)** 파이프라인을 기반으로 세 가지 핵심 혁신을 도입했습니다. 첫째, 모델이 점진적으로 복잡한 정리를 마스터하도록 **스캐폴드 데이터 합성(scaffolded data synthesis)** 을 통해 난이도를 높여가며 합성 데이터를 생성했습니다. 둘째, **Lean 컴파일러** 의 피드백을 활용하여 모델이 자체 증명을 반복적으로 수정할 수 있도록 **검증기 기반 자체 교정(verifier-guided self-correction)** 메커니즘을 구현했습니다. 셋째, 훈련 후반부에서 모델 출력의 다양성 감소를 완화하기 위해 **모델 평균화(model averaging)** 기법을 적용했습니다.

## 주요 결과
**Goedel-Prover-V2-32B** 모델은 **MiniF2F** 벤치마크에서 **pass@32** 기준으로 **88.1%** 의 성능을 달성했으며, 자체 교정 모드에서는 **90.4%** 까지 향상되어 이전 SOTA인 **DeepSeek-Prover-V2-671B(82.4%)** 를 크게 능가했습니다. 특히 **80배 더 작은** **Goedel-Prover-V2-8B** 모델조차 **DeepSeek-Prover-V2-671B** 를 능가하는 **84.6%** 를 기록했습니다. **PutnamBench** 에서는 **pass@184** 기준으로 **86개 문제** 를 해결하며 오픈소스 모델 중 1위를 차지했습니다.

## AI 실무자를 위한 시사점
이 연구는 형식 증명 분야에서 **대규모 모델** 이나 **방대한 컴퓨팅 자원** 없이도 최첨단 성능을 달성할 수 있음을 입증했습니다. **검증기 피드백** 을 활용한 **자체 교정** 과 **스캐폴드 데이터 합성** 은 복잡한 추론 문제 해결을 위한 모델의 효율성과 견고성을 높이는 실용적인 방법론입니다. 이는 AI 시스템이 복잡한 수학적 문제를 더 신뢰성 있게 해결하고 검증하는 데 중요한 발판을 마련했습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.