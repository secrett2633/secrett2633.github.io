---
title: "[논문리뷰] Distribution-Aligned Sequence Distillation for Superior Long-CoT Reasoning"
excerpt: "arXiv에 게시된 'Distribution-Aligned Sequence Distillation for Superior Long-CoT Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Knowledge Distillation
  - Sequence-level Distillation
  - Chain-of-Thought Reasoning (CoT)
  - Large Language Models (LLMs)
  - Temperature-scheduled Learning
  - Divergence-aware Sampling
  - Mixed-policy Distillation
  - Open-source Models

permalink: /ai/review/2026-01-15-Distribution-Aligned-Sequence-Distillation-for-Superior-Long-CoT-Reasoning/

toc: true
toc_sticky: true

date: 2026-01-15 00:00:00+0900+0900
last_modified_at: 2026-01-15 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.09088)

**저자:** Shaotian Yan, Kaiyuan Liu, Chen Shen, Bing Wang, Sinan Fan, Jun Zhang, Yue Wu, Zheng Wang, Jieping Ye



## 핵심 연구 목표
본 논문은 교사 모델이 생성한 응답에 대한 SFT(Supervised Fine-Tuning) 기반 시퀀스 레벨 증류 패러다임의 세 가지 주요 한계점(교사 분포 표현 부족, 교사-학생 모델 학습 능력 불일치, exposure bias)을 해결하고자 합니다. 이를 통해 경량 모델이 긴 CoT(Chain-of-Thought) 추론 능력을 효과적으로 습득하고, 오픈소스 모델 중 최첨단 성능을 달성하는 것을 목표로 합니다.

## 핵심 방법론
연구진은 세 가지 핵심 혁신을 포함하는 향상된 시퀀스 레벨 증류 학습 파이프라인인 **DASD-4B-Thinking** 을 제안합니다. 첫째, 교사의 출력 분포를 폭넓게 포괄하기 위해 **Temperature-scheduled Learning** 을 도입하여 저온에서 고온 샘플로 점진적인 학습을 수행합니다. 둘째, 학생 모델의 효과적인 학습을 지원하는 시퀀스 레벨 분포를 식별하기 위해 **Divergence-aware Sampling** 을 적용, 교사-학생 확률 편차가 큰 인스턴스를 우선 학습합니다. 셋째, **Teacher forcing** 과 **Autoregressive inference** 간의 불일치로 인한 exposure bias를 완화하기 위해 **Mixed-policy Distillation** 을 통해 학생 모델의 오류를 교사 모델이 수정하는 방식을 도입했습니다.

## 주요 결과
**DASD-4B-Thinking** 은 AIME24에서 **88.5%** , AIME25에서 **83.3%** , LiveCodeBench v5에서 **69.3%** , GPQA-D에서 **68.4%** 의 점수를 기록하며 동급 규모의 오픈소스 모델 중 최첨단 성능을 달성했습니다. 특히, 32B 스케일과 같은 일부 대규모 모델을 능가하는 효율성을 보여주며, 기존 오픈소스 프로젝트보다 훨씬 적은 **448K개의 훈련 샘플** 만으로도 이러한 높은 경쟁력을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 경량 LLM이 복잡한 추론 작업을 수행하도록 증류하는 효과적인 방법을 제시하며, 특히 **데이터 효율성** 이 뛰어나다는 점에서 실무적 가치가 높습니다. **온도 스케줄 학습, 발산 인식 샘플링, 혼합 정책 증류** 와 같은 혁신적인 증류 기법은 제한된 컴퓨팅 자원으로 고성능 AI 모델을 개발하려는 엔지니어들에게 실용적인 가이드라인을 제공합니다. 또한, 공개된 모델과 학습 데이터셋은 오픈소스 커뮤니티의 관련 연구 발전에 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.