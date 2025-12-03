---
title: "[논문리뷰] TRivia: Self-supervised Fine-tuning of Vision-Language Models for Table Recognition"
excerpt: "Zichen Wen이 [arXiv]에 게시한 'TRivia: Self-supervised Fine-tuning of Vision-Language Models for Table Recognition' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Table Recognition
  - Self-supervised Learning
  - Vision-Language Models
  - Reinforcement Learning
  - Question Answering
  - Data Augmentation
  - GRPO

permalink: /ai/review/2025-12-03-TRivia-Self-supervised-Fine-tuning-of-Vision-Language-Models-for-Table-Recognition/

toc: true
toc_sticky: true

date: 2025-12-03 00:00:00+0900+0900
last_modified_at: 2025-12-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.01248)

**저자:** Junyuan Zhang, Bin Wang, Qintong Zhang, Fan Wu, Zichen Wen, Jialin Lu, Junjie Shan, Ziqi Zhao, Shuya Yang, Ziling Wang, Ziyang Miao, Huaping Zhong, Yuhang Zang, Xiaoyi Dong, Ka-Ho Chow, Conghui He



## 핵심 연구 목표
본 논문은 테이블 인식(TR) 시스템 개발 시 **대규모 레이블링된 데이터의 높은 비용과 접근성 한계** 로 인해 오픈소스 모델이 독점 모델에 비해 뒤처지는 문제를 해결하고자 합니다. 특히, **레이블 없는 실제 테이블 이미지** 로부터 **Vision-Language Model (VLM)** 이 테이블 인식을 학습할 수 있도록 하는 **자율 학습(self-supervised) 미세 조정 프레임워크** 를 제안하여 이 격차를 줄이는 것을 목표로 합니다.

## 핵심 방법론
제안된 **TRivia 프레임워크** 는 **Group Relative Policy Optimization (GRPO)** 을 기반으로 하며, 다음과 같은 주요 구성 요소를 포함합니다. 첫째, **Response-Consistency Sampling** 을 통해 모델의 다양한 인식을 유도하는 **가장 정보성 높은 레이블 없는 샘플** 을 자동으로 식별합니다. 둘째, **Attention-guided QA Generation 모듈** 은 각 테이블 이미지에 대해 **다양하고 검증 가능한 질의응답(QA) 쌍** 을 생성하여 VLM이 인식 결과를 기반으로 질문에 올바르게 답변하는 능력에 따라 **F1-score 기반의 보상** 을 제공합니다. 또한, **Illegal-sample Filtering** 을 통해 잘못된 인식 결과로 인한 보상 노이즈를 제거하여 학습 안정성을 높입니다.

## 주요 결과
**TRivia-3B 모델** 은 오픈소스 **Qwen2.5-VL-3B-Instruct** 를 미세 조정하여 개발되었으며, **89.9 TEDS** 를 달성하며 기존 독점 시스템인 **Gemini 2.5 Pro** 의 **88.9 TEDS** 를 능가하는 **최첨단 성능** 을 보였습니다. 특히, **OmniDocBench, CC-OCR, OCRBench v2** 등 널리 사용되는 벤치마크에서 **MinerU2.5** 와 같은 기존 전문가 TR 모델 및 범용 VLM들을 일관되게 능가했습니다. 또한, TRivia 프레임워크가 생성한 의사 레이블로 미세 조정된 모델은 TRivia-3B 자체와 **거의 동일한 성능(89.99 TEDS 대 89.88 TEDS)** 을 달성하여 **높은 품질의 의사 레이블 생성 능력** 을 입증했습니다.

## AI 실무자를 위한 시사점
**TRivia** 는 **비용이 많이 드는 수동 레이블링 없이** 도 고성능 테이블 인식 모델을 훈련할 수 있는 **새로운 패러다임** 을 제시합니다. 이는 오픈소스 VLM이 독점 모델과의 성능 격차를 좁히는 데 중요한 역할을 할 수 있으며, **TRivia 자체를 확장 가능한 자동 데이터 어노테이션 시스템** 으로 활용할 수 있음을 시사합니다. 이러한 접근 방식은 향후 **다른 멀티모달 태스크의 자율 학습** 에도 적용될 수 있는 잠재력을 가지고 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.