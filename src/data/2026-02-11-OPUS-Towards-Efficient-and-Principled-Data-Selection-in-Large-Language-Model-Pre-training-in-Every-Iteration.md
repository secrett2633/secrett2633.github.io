---
title: "[논문리뷰] OPUS: Towards Efficient and Principled Data Selection in Large Language Model Pre-training in Every Iteration"
excerpt: "이 [arXiv]에 게시한 'OPUS: Towards Efficient and Principled Data Selection in Large Language Model Pre-training in Every Iteration' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Data Selection
  - Large Language Model
  - Pre-training
  - Optimizer-Induced Utility
  - Ghost Technique
  - CountSketch
  - Boltzmann Sampling

permalink: /ai/review/2026-02-11-OPUS-Towards-Efficient-and-Principled-Data-Selection-in-Large-Language-Model-Pre-training-in-Every-Iteration/

toc: true
toc_sticky: true

date: 2026-02-11 00:00:00+0900+0900
last_modified_at: 2026-02-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.05400)

**저자:** Shaobo Wang, Xuan Ouyang, Tianyi Xu, Yuzheng Hu, Jialin Liu, Guo Chen, Tianyu Zhang, Junhao Zheng, Kexin Yang, Xingzhang Ren, Dayiheng Liu, Linfeng Zhang



## 핵심 연구 목표
대규모 언어 모델(LLM) 사전 훈련에서 고품질 데이터의 고갈 문제인 "데이터 장벽(Data Wall)"에 직면함에 따라, 기존의 비효율적이거나 최적화기 비인지적인 데이터 선택 방법의 한계를 해결하고자 합니다. 특히, 현대적인 **AdamW** 또는 **Muon** 과 같은 적응형 최적화기의 역학을 무시하는 문제점을 극복하여 효율적이고 원칙적인 데이터 선택 프레임워크를 개발하는 것이 목표입니다.

## 핵심 방법론
본 논문은 최적화기가 유도하는 업데이트 공간에서 유용성을 정의하는 **OPUS (Optimizer-induced Projected Utility Selection)** 프레임워크를 제안합니다. OPUS는 후보 데이터의 효과적인 업데이트를 안정적이고 분포 내(in-distribution) 프록시에서 파생된 목표 방향에 투영하여 점수를 매깁니다. 확장성을 위해 **Ghost technique** 와 **CountSketch** 를 사용하여 계산 효율성을 높이고, **Boltzmann sampling** 을 통해 데이터 다양성을 확보합니다.

## 주요 결과
OPUS는 10개 벤치마크에서 무작위 선택 대비 평균 **2.2% 정확도 향상** 을 달성했으며, **FineWeb** 데이터셋을 사용한 **GPT-XL** 모델에서 **8배의 계산량 감소** 를 이루었습니다. **GPT-2 Large/XL** 사전 훈련 시 **30B 토큰** 으로 산업 표준 대비 우수한 성능을 보였고, **Qwen3-8B-Base** 의 연속 사전 훈련에서는 **0.5B 토큰** 만으로 **3B 토큰** 을 사용한 전체 훈련보다 우수한 성능을 달성하여 **6배의 데이터 효율성** 을 입증했습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 **데이터 장벽** 시대에 **품질 중심의 데이터 선택** 이 LLM 훈련에 필수적임을 이해하고, OPUS는 이를 위한 강력한 해결책을 제공합니다. 특히, **AdamW** 나 **Muon** 과 같은 최적화기의 동적 특성을 반영한 데이터 선택이 모델 성능 향상에 결정적임을 시사합니다. **Ghost technique** 및 **CountSketch** 를 통한 효율적인 구현은 리소스 제약이 있는 환경이나 특정 도메인 적응을 위한 LLM 사전 훈련에서 **데이터 효율성** 과 **성능** 을 크게 개선할 수 있는 실용적인 방법론을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.