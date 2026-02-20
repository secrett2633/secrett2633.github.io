---
title: "[논문리뷰] OpenMMReasoner: Pushing the Frontiers for Multimodal Reasoning with an Open and General Recipe"
excerpt: "arXiv에 게시된 'OpenMMReasoner: Pushing the Frontiers for Multimodal Reasoning with an Open and General Recipe' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Reasoning
  - Large Multimodal Models
  - Supervised Fine-tuning
  - Reinforcement Learning
  - Data Curation
  - Open-source
  - Multimodal Benchmarks

permalink: /ai/review/2025-11-24-OpenMMReasoner-Pushing-the-Frontiers-for-Multimodal-Reasoning-with-an-Open-and-General-Recipe/

toc: true
toc_sticky: true

date: 2025-11-24 00:00:00+0900+0900
last_modified_at: 2025-11-24 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.16334)

**저자:** Kaichen Zhang, Keming Wu, Zuhao Yang, Kairui Hu, Bin Wang, Ziwei Liu, Xingxuan Li, Lidong Bing



## 핵심 연구 목표
멀티모달 추론(Multimodal Reasoning) 분야에서 **투명하고 재현 가능한 데이터 큐레이션 및 훈련 전략** 의 부재로 인한 확장성 연구의 한계를 극복하는 것을 목표로 합니다. 본 연구는 **OpenMMReasoner** 라는 **완전히 투명한 2단계 레시피** (SFT 및 RL)를 제안하여, 멀티모달 추론 모델 구축을 위한 견고한 실증적 기반과 오픈 소스 참조 자료를 제공하고자 합니다.

## 핵심 방법론
**SFT 단계** 에서는 **874K 규모의 콜드 스타트 데이터셋** 을 구축했으며, **Qwen3-VL-235B-Instruct** 를 교사 모델로 활용하여 **x8 반복 샘플링** 을 통해 답변 다양성을 확보했습니다. **RL 단계** 에서는 **74K 샘플 데이터셋** 을 사용하고, 다양한 알고리즘 중 **GSPO** 를 가장 안정적이고 효율적인 알고리즘으로 채택했습니다. 또한, **R = (1 - λfmt) · Racc + λfmt · Rfmt** 형태의 **복합 보상 함수** 와 **과도한 토큰 사용을 방지하는 페널티** 를 적용했습니다.

## 주요 결과
제안된 방법론은 **Qwen2.5-VL-7B-Instruct baseline** 대비 **9개 멀티모달 추론 벤치마크** 에서 평균 **11.6% 성능 향상** 을 달성했습니다. 특히 **MathVista** 벤치마크에서는 **79.5%** 의 높은 정확도를 기록하여, **OVR** 과 같은 기존 SOTA 모델들을 능가했습니다. RL 단계에서는 **GSPO** 가 다른 알고리즘 대비 뛰어난 학습 안정성과 수렴 속도를 보였으며, **토큰 예산** 측면에서도 OVR보다 훨씬 효율적인 성능을 입증했습니다.

## AI 실무자를 위한 시사점
**OpenMMReasoner** 는 멀티모달 추론 모델 개발을 위한 **투명하고 재현 가능한 워크플로우** 를 제공하여 연구 및 개발의 효율성을 크게 높일 수 있습니다. **데이터 품질과 다양성** (특히 답변 다양성) 및 **강력한 교사 모델 선택** 이 SFT 단계에서 모델 성능에 결정적인 영향을 미친다는 점은 데이터 중심 AI 개발에 중요한 시사점을 줍니다. 또한, **GSPO** 와 같은 효율적인 RL 알고리즘과 **세심한 보상 함수 설계** 가 모델의 안정성과 성능 향상에 필수적임을 보여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.