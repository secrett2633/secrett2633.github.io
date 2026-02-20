---
title: "[논문리뷰] Toward Cognitive Supersensing in Multimodal Large Language Model"
excerpt: "Yifan Xu이 arXiv에 게시한 'Toward Cognitive Supersensing in Multimodal Large Language Model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Large Language Models
  - Cognitive Reasoning
  - Visual Imagery
  - Latent Representations
  - Reinforcement Learning
  - Visual Question Answering
  - Benchmark

permalink: /ai/review/2026-02-03-Toward-Cognitive-Supersensing-in-Multimodal-Large-Language-Model/

toc: true
toc_sticky: true

date: 2026-02-03 00:00:00+0900+0900
last_modified_at: 2026-02-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.01541)

**저자:** Boyi Li, Yifan Shen, Yuanzhe Liu, Yifan Xu, Jiateng Liu, Xinzhuo Li, Zhengyuan Li, Jingyuan Zhu, Yunhan Zhong, Fangzhou Lan, Jianguo Cao, James M. Rehg, Heng Ji, Ismini Lourentzou, Xu Cao



## 핵심 연구 목표
본 논문은 추상적인 시각 정보와 시각적 기억을 요구하는 복잡한 인지 문제에서 **멀티모달 대규모 언어 모델(MLLMs)** 의 제한된 성능을 개선하는 것을 목표로 합니다. 인간의 시각 공간 스케치패드와 시각적 심상과 유사한 시각적 추론 메커니즘을 **MLLM** 에 부여하여 인지 능력 격차를 해소하고자 합니다.

## 핵심 방법론
제안하는 **Cognitive Supersensing** 은 **Latent Visual Imagery Prediction (LVIP) 헤드** 를 통합하여 시각적 인지 잠재 임베딩 시퀀스를 학습하고 이를 답변에 정렬함으로써, 모델에 인간과 유사한 시각적 심상 능력을 부여합니다. 이 과정은 **강화 학습(RL) 단계** 를 통해 시각적 잠재 표현에 기반한 텍스트 추론 경로를 최적화하며, 다섯 가지 인지 차원을 평가하는 새로운 **CogSense-Bench** 벤치마크도 구축했습니다.

## 주요 결과
**Cognitive Supersensing** 으로 훈련된 **CogSense-8B** 모델은 **CogSense-Bench** 에서 **73.8%** 의 전체 정확도를 달성하며, 최첨단 baseline인 **GPT-5.2** 를 **+33.5%** p 능가하는 뛰어난 성능을 보였습니다. 또한, **EMMA 벤치마크** 의 OOD(Out-of-Domain) 수학 및 과학 **VQA** 태스크에서 각각 **+8.8%** p 및 **+6.2%** p의 향상된 일반화 능력을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 **MLLM** 이 단순한 지각 인식을 넘어 인지적 이해에 도달하는 데 내부 시각적 심상이 핵심적인 역할을 한다는 점을 시사합니다. **AI/ML 엔지니어** 는 이 **Cognitive Supersensing** 패러다임을 활용하여 추상적 레이아웃 설명, 미래 변환 시뮬레이션 등 고차원 시각적 추론 능력이 필요한 응용 분야에서 **MLLM** 의 성능을 크게 향상시킬 수 있습니다. 이는 기존 **텍스트 기반 CoT 추론** 의 한계를 극복하는 새로운 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.