---
title: "[논문리뷰] Youtu-LLM: Unlocking the Native Agentic Potential for Lightweight Large Language Models"
excerpt: "Xinyi Dai이 arXiv에 게시한 'Youtu-LLM: Unlocking the Native Agentic Potential for Lightweight Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Lightweight LLM
  - Agentic AI
  - Pre-training
  - Multi-Latent Attention
  - Long-Context
  - Curriculum Learning
  - Agentic Mid-training
  - Instruction Tuning

permalink: /ai/review/2026-01-01-Youtu-LLM-Unlocking-the-Native-Agentic-Potential-for-Lightweight-Large-Language-Models/

toc: true
toc_sticky: true

date: 2026-01-01 00:00:00+0900+0900
last_modified_at: 2026-01-01 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.24618)

**저자:** Xinyi Dai, Yinghui Li, Lingfeng Qiao, Jiarui Qin, Junru Lu



## 핵심 연구 목표
본 논문은 경량 LLM이 **높은 계산 효율성** 을 유지하면서도 내재적인 에이전트 지능을 갖출 수 있도록 하는 것을 목표로 합니다. 특히, 기존의 증류(distillation) 방식이 아닌, **sub-2B 규모** 의 모델이 처음부터 **추론 및 계획 능력** 을 체계적으로 학습하도록 하는 데 중점을 둡니다. 이를 통해 복잡한 장기 에이전트 작업을 효과적으로 수행할 수 있는 경량 LLM의 잠재력을 탐색합니다.

## 핵심 방법론
**Youtu-LLM(1.96B)** 은 **dense Multi-Latent Attention (MLA) 아키텍처** 와 **STEM 중심 어휘집** 을 기반으로 **128k 컨텍스트 윈도우** 를 지원하는 **컴팩트 아키텍처** 를 채택했습니다. 사전 훈련에서는 **11T 토큰** 규모의 코퍼스를 **"Commonsense-STEM-Agent" 커리큘럼** 에 따라 다단계로 학습시켰으며, 특히 **확장 가능한 에이전트 미드-트레이닝** 단계에서는 수학, 코딩, 도구 사용 등 다양한 에이전트 궤적 데이터를 합성하여 모델의 계획 및 반성 능력을 내재화했습니다.

## 주요 결과
**Youtu-LLM** 은 **sub-2B LLM** 부문에서 새로운 **최첨단(state-of-the-art)** 성능을 달성했습니다. 특히 에이전트 특정 작업에서는 기존 **SOTA 모델** 들을 **상당히 능가** 하는 결과를 보여주었습니다. Agentic-CoT 데이터 통합 시 APT-Math 벤치마크의 Planning 능력은 **65.1%에서 82.9%로 크게 향상** 되었으며, 에이전트 미드-트레이닝을 통해 APTBench 점수가 전반적으로 **6% 이상 향상** 되었고, 특히 **SWE-Bench-Verified** 에서 **42.7%** 의 상대적 개선율을 기록했습니다.

## AI 실무자를 위한 시사점
이 연구는 경량 LLM이 충분한 사전 훈련과 에이전트 중심 방법론을 통해 대규모 모델에 버금가는 **내재적 에이전트 능력** 을 보유할 수 있음을 입증했습니다. 이는 **제한된 컴퓨팅 리소스** 환경에서도 복잡한 추론 및 계획이 필요한 AI 에이전트 시스템을 구축할 수 있는 실질적인 가능성을 제시합니다. 특히 **MLA 아키텍처** 와 **커리큘럼 기반 에이전트 궤적 훈련** 은 효율적인 경량 LLM 개발에 중요한 설계 원칙이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.