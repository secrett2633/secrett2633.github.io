---
title: "[논문리뷰] Adversarial Confusion Attack: Disrupting Multimodal Large Language Models"
excerpt: "Artur Janicki이 [arXiv]에 게시한 'Adversarial Confusion Attack: Disrupting Multimodal Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Adversarial Attack
  - Multimodal Large Language Models (MLLMs)
  - Entropy Maximization
  - Confusion Attack
  - Black-box Transfer
  - PGD
  - AI Agent Safety

permalink: /ai/review/2025-12-04-Adversarial-Confusion-Attack-Disrupting-Multimodal-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-12-04 00:00:00+0900+0900
last_modified_at: 2025-12-04 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.20494)

**저자:** Jakub Hoscilowicz, Artur Janicki



## 핵심 연구 목표
본 논문은 기존의 오분류나 탈옥(jailbreak) 공격과 달리, 멀티모달 대규모 언어 모델(MLLMs)이 일관성 없거나 자신감 있게 틀린 출력을 생성하도록 유도하여 시스템적인 혼란(confusion)을 야기하는 새로운 유형의 적대적 공격인 **Adversarial Confusion Attack** 을 제안합니다. 이는 모델의 디코딩 프로세스를 불안정하게 만들어 신뢰할 수 있는 장면 이해를 방해하고, 궁극적으로 MLLM 기반 AI 에이전트의 안정적인 작동을 저해하는 것을 목표로 합니다.

## 핵심 방법론
제안된 공격은 MLLM의 출력 분포에 대한 다음 토큰의 **Shannon 엔트로피를 최대화** 하는 것을 목표로 합니다. 이를 위해 **Projected Gradient Descent (PGD)** 기법을 사용하여 훈련 앙상블 내의 오픈 소스 MLLM(예: **Qwen2.5-VL-3B, LLaVA-1.5-7B** )에 대한 평균 엔트로피를 최적화합니다. 공격은 전체 이미지에 대한 전역적 섭동 또는 특정 영역에 국한된 패치 형태의 섭동으로 구현될 수 있습니다.

## 주요 결과
화이트박스 시나리오에서 전체 이미지 섭동은 평균 **5.08배** 의 **Effective Confusion Ratio (ECR)** 를 달성하며 강력한 엔트로피 증폭을 입증했습니다. 블랙박스 전이의 경우, 미지의 모델로의 섭동 전이가 발생하여 평균 **1.65배** 의 ECR을 기록했으며, 독점 모델(예: **GPT-5.1, GPT-03, GPT-40** )에서도 일관된 환각 또는 안전 거부(Grok 4)를 유발했습니다. 또한, **224x224 픽셀 패치** 공격만으로도 평균 **3.05배** 의 ECR을 보여주며 이미지 픽셀의 약 9%만 수정하여 모델 디코딩을 방해할 수 있음을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 MLLM 기반 AI 에이전트가 웹사이트에서 안정적으로 작동하는 것을 방지하기 위한 새로운 방어 메커니즘을 제공합니다. 특히, **Adversarial CAPTCHA** 와 같이 웹사이트 UI에 직접 통합될 수 있는 방식으로 무단 AI 에이전트 활동에 대한 **서비스 거부(Denial of Service)** 공격 가능성을 제시합니다. 이는 AI 에이전트의 신뢰성과 보안을 강화하는 데 중요한 고려사항이 될 수 있음을 시사하며, MLLM의 취약점을 탐구하는 새로운 연구 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.