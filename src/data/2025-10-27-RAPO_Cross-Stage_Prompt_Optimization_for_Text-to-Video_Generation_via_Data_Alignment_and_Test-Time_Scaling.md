---
title: "[논문리뷰] RAPO++: Cross-Stage Prompt Optimization for Text-to-Video Generation via
  Data Alignment and Test-Time Scaling"
excerpt: "이 [arXiv]에 게시한 'RAPO++: Cross-Stage Prompt Optimization for Text-to-Video Generation via
  Data Alignment and Test-Time Scaling' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Text-to-Video Generation
  - Prompt Optimization
  - Large Language Models (LLM)
  - Test-Time Scaling
  - Retrieval-Augmented Generation
  - Diffusion Models
  - Data Alignment

permalink: /ai/review/2025-10-27-RAPO_Cross-Stage_Prompt_Optimization_for_Text-to-Video_Generation_via_Data_Alignment_and_Test-Time_Scaling/

toc: true
toc_sticky: true

date: 2025-10-27 13:07:36+0900
last_modified_at: 2025-10-27 13:07:36+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.20206)

**저자:** Bingjie Gao, Qianli Ma, Xiaoxue Wu, Shuai Yang, Guanzhou Lan, Haonan Zhao, Jiaxuan Chen, Qingyang Liu, Yu Qiao, Xinyuan Chen, Yaohui Wang, and Li Niu



## 핵심 연구 목표
본 논문은 사용자 제공 프롬프트가 짧고 구조화되지 않으며 훈련 데이터와 불일치하여 확산 기반 **T2V 모델**의 생성 잠재력을 제한하는 문제를 해결합니다. 생성 백본 모델을 수정하지 않으면서 **T2V 생성 품질**을 대폭 향상시키기 위한 프롬프트 최적화 프레임워크를 제안하는 것을 목표로 합니다.

## 핵심 방법론
**RAPO++**는 세 단계로 구성됩니다. **Stage 1 (RAPO)**에서는 **관계 그래프**에서 관련 수정자를 검색하고, **파인튜닝된 LLM (Lr)**으로 프롬프트를 재구성하며, **Discriminator LLM (Ld)**으로 최적의 프롬프트를 선택하여 훈련 데이터 분포에 맞춥니다. **Stage 2 (SSPO)**에서는 **VLM verifiers, task-specific metrics (광학 흐름)**와 같은 다중 소스 피드백을 통해 프롬프트를 반복적으로 정제하여 시간적 일관성 및 충실도를 높입니다. 마지막으로 **Stage 3**에서는 SSPO에서 수집된 프롬프트 쌍으로 **Rewriter LLM을 파인튜닝**하여 최적화 패턴을 내재화합니다.

## 주요 결과
**RAPO++**는 5개의 SOTA T2V 모델(**LaVie, Latte, HunyuanVideo, CogVideoX, Wan2.1**)과 5개의 벤치마크(**VBench, T2V-CompBench, EvalCrafter, VideoPhy, PhyGenBench**)에서 상당한 성능 향상을 달성했습니다. 특히 **VBench**에서는 **LaVie**로 **82.65%**, **Latte**로 **80.75%**의 총점을 기록했으며, **T2V-CompBench**에서는 일관된 속성 바인딩 및 객체 상호작용과 같은 도전적인 범주에서 SOTA 성능을 보였습니다.

## AI 실무자를 위한 시사점
**RAPO++**는 **T2V 생성 모델**을 재훈련할 필요 없이 품질을 향상시키는 **모델-불가지론적이고 비용 효율적이며 확장 가능한 솔루션**을 제공합니다. 이는 **LLM 기반 프롬프트 엔지니어링**과 **다중 소스 피드백**을 통한 **반복적인 테스트-타임 최적화**가 실제 T2V 시스템에서 강력하고 맥락을 인지하는 생성을 가능하게 함을 보여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.