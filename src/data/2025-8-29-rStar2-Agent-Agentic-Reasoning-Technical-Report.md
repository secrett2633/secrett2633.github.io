---
title: "[논문리뷰] rStar2-Agent: Agentic Reasoning Technical Report"
excerpt: "Weijiang Xu이 [arXiv]에 게시한 'rStar2-Agent: Agentic Reasoning Technical Report' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic Reinforcement Learning
  - Math Reasoning
  - Code Interpreter
  - Tool Use
  - GRPO-RoC
  - LLM Training Efficiency
  - Self-Reflection

permalink: /ai/review/2025-8-29-rStar2-Agent-Agentic-Reasoning-Technical-Report/

toc: true
toc_sticky: true

date: 2025-08-29 13:14:44+0900
last_modified_at: 2025-08-29 13:14:44+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.20722)

**저자:** Ning Shang, Yifei Liu, Yi Zhu, Li Lyna Zhang, Weijiang Xu, Xinyu Guan, Buze Zhang, Bingcheng Dong, Xudong Zhou, Bowen Zhang, Ying Xin, Ziming Miao, Scarlett Li, Fan Yang, Mao Yang



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)이 복잡한 수학 추론에서 "더 길게 생각하는" 것을 넘어 "더 스마트하게 생각하도록" 돕는 것을 목표로 합니다. 구체적으로, 에이전트형 강화 학습(RL)을 통해 **Python 코딩 도구** 를 자율적으로 활용하고 환경 피드백으로부터 학습하여 최첨단 성능을 달성하고자 합니다.

## 핵심 방법론
연구팀은 **rStar2-Agent** 라는 14B 모델을 개발했습니다. 이 모델은 (i) **45K 동시 도구 호출** 을 처리하고 **0.3초의 낮은 지연 시간** 을 유지하는 효율적인 RL 인프라와 **부하 분산 롤아웃 스케줄러** 를 통해 컴퓨팅 효율성을 극대화합니다. (ii) 코딩 도구의 노이즈 문제를 해결하기 위해 **GRPO-RoC(Group Relative Policy Optimization with Resampling on Correct)** 알고리즘을 사용하며, 이는 오류가 적은 고품질 성공 궤적을 비대칭적으로 샘플링하여 학습합니다. (iii) 또한, 비추론적인 **SFT(Supervised Fine-Tuning)** 로 시작하여 점진적으로 난이도와 최대 훈련 길이를 늘리는 **다단계 RL 훈련 레시피** 를 적용했습니다.

## 주요 결과
**rStar2-Agent-14B** 는 불과 **510 RL 훈련 단계** 만에 최첨단 수학 추론 성능을 달성했습니다. **AIME24** 에서 **80.6% pass@1** 점수를 기록하여 671B DeepSeek-R1 모델을 **0.8%** 앞섰으며, **AIME25** 에서 **69.8%** 를 달성했습니다. 또한, DeepSeek-R1-Zero와 같은 모델보다 응답 길이가 훨씬 짧으면서도 강력한 일반화 성능을 보여주며, **GPQA-Diamond** 과학 추론 벤치마크에서도 정확도가 **42.1%에서 60.9%** 로 향상되었습니다.

## AI 실무자를 위한 시사점
본 연구는 제한된 GPU 자원( **64 MI300X GPU** )으로도 **14B** 와 같은 비교적 작은 모델이 최첨단 성능에 도달할 수 있음을 입증하며, 효율적인 에이전트형 RL 훈련의 실현 가능성을 보여줍니다. **GRPO-RoC** 는 코딩 환경의 내재적 노이즈를 효과적으로 관리하는 방법론을 제시하여, 도구 사용을 포함하는 LLM 시스템 개발에 중요한 통찰력을 제공합니다. 이는 LLM이 오류를 수정하고 추론을 정교화하는 **고급 인지 행동** 을 학습하는 데 실질적인 지침이 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.