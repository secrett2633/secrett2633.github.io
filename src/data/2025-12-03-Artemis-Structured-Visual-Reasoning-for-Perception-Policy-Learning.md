---
title: "[논문리뷰] Artemis: Structured Visual Reasoning for Perception Policy Learning"
excerpt: "Piotr Koniusz이 arXiv에 게시한 'Artemis: Structured Visual Reasoning for Perception Policy Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Visual Reasoning
  - Multimodal Large Language Models (MLLM)
  - Reinforcement Learning (RL)
  - Perception Policy Learning
  - Object Grounding
  - Object Detection
  - Structured Output

permalink: /ai/review/2025-12-03-Artemis-Structured-Visual-Reasoning-for-Perception-Policy-Learning/

toc: true
toc_sticky: true

date: 2025-12-03 00:00:00+0900+0900
last_modified_at: 2025-12-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.01988)

**저자:** Wei Tang, Yanpeng Sun, Shan Zhang, Xiaofan Li, Piotr Koniusz, Wei Li, Na Zhao, Zechao Li



## 핵심 연구 목표
기존 멀티모달 대규모 언어 모델(MLLM)의 시각 지각 정책 학습에서 언어 기반의 추론이 공간적/객체 중심 추론이 필요한 시각 태스크에서 성능 저하를 야기하는 문제를 해결하고자 합니다. 본 연구는 시각 지각에 적합한 **구조화된 시각적 추론(Structured Visual Reasoning)** 을 도입하여 MLLM의 지각 정책 학습의 일반화 및 확장성을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
Artemis는 **Qwen2.5-VL-3B** 를 기반으로 하며, 각 중간 추론 단계를 **(label, bounding-box) 쌍** 으로 표현하는 **구조화된 제안 기반 추론** 을 수행합니다. **GRPO(Group Relative Policy Optimization)** 프레임워크를 사용하여, 최종 예측뿐만 아니라 중간 시각 추론 단계에도 직접적인 감독을 제공하는 **Structured Visual Reasoning Reward** 와 **Outcome Rewards(format, answer)** 를 결합하여 모델을 훈련합니다. **Structured Visual Reasoning Reward** 는 **IoU** 와 **Rouge-1** 을 활용하여 예측과 실제 객체 간의 매칭을 평가하며, **Hungarian algorithm** 을 통해 다중 객체 매칭의 정확도를 높입니다.

## 주요 결과
Artemis는 RefCOCO/+/g 데이터셋에서 시각 접지 성능을 일관되게 향상시켰으며, 특히 RefCOCO testB@50에서 **87.0%** 를 달성하여 기존 VLM-R1+ 대비 **1.1%p** 향상되었습니다. COCO2017 val 객체 탐지에서 **mAP 31.0** 및 **AP50 48.0** 을 달성, 기준 모델인 Qwen2.5-VL-3B 대비 각각 **15.4%p** 및 **22.5%p** 의 상당한 개선을 보였습니다. Pixmo-Count 데이터셋에서 사전 학습 없이도 VisionReasoner 대비 **+11.3%p** 의 시각적 개수 세기 성능 향상을 기록했으며, MATHGLANCE 벤치마크에서는 **49.3%** 의 최고 평균 점수를 달성하며 다양한 도메인에 걸쳐 뛰어난 일반화 능력을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 MLLM 기반 시각 시스템에서 **공간적으로 접지된 구조화된 시각 추론** 이 성능 향상과 일반화에 핵심적임을 보여줍니다. AI 실무자들은 모델이 단순히 언어적 설명을 생성하는 것을 넘어, **(label, bounding-box) 쌍** 과 같은 **객체 중심의 명시적 시각적 증거** 를 통해 추론하도록 유도함으로써 모델의 신뢰성과 다양한 시각 태스크(접지, 탐지, 개수 세기, 기하학적 지각) 및 도메인(자연 이미지, 수학 다이어그램)에 대한 전이 학습 능력을 크게 개선할 수 있습니다. 이러한 접근 방식은 확장 가능하고 범용적인 지각 정책 개발을 위한 효과적인 경로를 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.