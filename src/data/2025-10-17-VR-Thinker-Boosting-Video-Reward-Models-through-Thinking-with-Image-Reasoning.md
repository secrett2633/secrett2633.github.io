---
title: "[논문리뷰] VR-Thinker: Boosting Video Reward Models through Thinking-with-Image
  Reasoning"
excerpt: "이 [arXiv]에 게시한 'VR-Thinker: Boosting Video Reward Models through Thinking-with-Image
  Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Reward Models
  - Multimodal Reasoning
  - Thinking-with-Image
  - Visual Reasoning
  - Reinforcement Learning
  - Chain-of-Thought
  - Context Management

permalink: /ai/review/2025-10-17-VR-Thinker-Boosting-Video-Reward-Models-through-Thinking-with-Image-Reasoning/

toc: true
toc_sticky: true

date: 2025-10-17 13:09:57+0900
last_modified_at: 2025-10-17 13:09:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.10518)

**저자:** Qunzhong Wang, Jie Liu, Jiajun Liang, Yilei Jiang, Yuanxing Zhang, Jinyuan Chen, Yaozhi Zheng, Xintao Wang, Pengfei Wan, Xiangyu Yue, Jiaheng Liu



## 핵심 연구 목표
본 논문은 시각적 생성 모델의 후속 훈련을 위한 멀티모달 보상 모델(RMs)의 두 가지 주요 한계를 해결하는 것을 목표로 합니다. 첫째, 시각 입력이 대규모 컨텍스트 예산을 소비하여 프레임 수가 줄어들고 미세한 디테일이 손실되는 문제와, 둘째, 모든 시각 정보가 초기 프롬프트에만 의존하여 **Chain-of-Thought (CoT) 추론 중 환각 및 망각** 이 심화되는 문제를 극복하고자 합니다.

## 핵심 방법론
저자들은 **VideoReward Thinker (VR-Thinker)** 라는 새로운 **"thinking-with-image" 프레임워크** 를 도입하여 RM에 **프레임 선택(select frame)과 같은 시각적 추론 작업** 및 **구성 가능한 시각적 메모리 윈도우** 를 부여합니다. 이 프레임워크는 다음 세 단계의 **강화학습 미세 조정 파이프라인** 을 통해 모델의 시각적 추론 능력을 활성화합니다: (I) **Cold Start** 를 통한 기본 추론 및 포맷팅 학습, (II) **Rejection Sampling Fine-Tuning** 을 통한 고품질 추론 강화, (III) **Group Relative Policy Optimization (GRPO)** 을 통한 추론 능력 강화 및 최적화.

## 주요 결과
VR-Thinker는 비디오 선호도 벤치마크, 특히 긴 비디오에서 오픈 소스 모델 중 최첨단 정확도를 달성했습니다. **7B VR-Thinker 모델** 은 **VideoGen Reward에서 80.5%** , **GenAI-Bench에서 82.3%** , **MJ-Bench-Video에서 75.6%** 의 정확도를 기록하며, Thinking-with-Image 기반 멀티모달 보상 모델링의 효과와 가능성을 성공적으로 입증했습니다. 이러한 결과는 시각적 추론이 멀티모달 RM의 정확도와 신뢰성을 향상시키는 데 중요함을 보여줍니다.

## AI 실무자를 위한 시사점
VR-Thinker는 비디오 보상 모델에서 **컨텍스트 길이 제약 완화** 및 **시각 정보 망각 완화** 를 위한 효과적인 방법을 제시합니다. 이는 AI/ML 엔지니어가 생성형 비디오 모델을 인간의 선호도에 더 잘 정렬시키는 데 필요한 **더욱 신뢰할 수 있고 해석 가능한 보상 신호** 를 개발하는 데 중요한 기여를 합니다. 제안된 **다단계 훈련 파이프라인** 은 복잡한 멀티모달 추론 모델 학습에 대한 강력하고 실용적인 접근 방식을 제공하여 향후 비디오 생성 모델의 개발 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.