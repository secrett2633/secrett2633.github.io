---
title: "[논문리뷰] EditScore: Unlocking Online RL for Image Editing via High-Fidelity
  Reward Modeling"
excerpt: "이 [arXiv]에 게시한 'EditScore: Unlocking Online RL for Image Editing via High-Fidelity
  Reward Modeling' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Image Editing
  - Reward Modeling
  - Instruction-Guided Editing
  - Online RL
  - Visual Language Models
  - Benchmark
  - Self-Ensembling

permalink: /ai/review/2025-9-30-EditScore_Unlocking_Online_RL_for_Image_Editing_via_High-Fidelity_Reward_Modeling/

toc: true
toc_sticky: true

date: 2025-09-30 13:52:24+0900
last_modified_at: 2025-09-30 13:52:24+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.23909)

**저자:** Xin Luo, Jiahao Wang, Chenyuan Wu, Shitao Xiao, Xiyan Jiang, Defu Lian, Jiajun Zhang, Dong Liu, Zheng Liu



## 핵심 연구 목표
본 논문은 이미지 편집 분야에서 온라인 **강화 학습(RL)**의 적용을 가로막는 주요 장애물인 **고충실도(high-fidelity)**이면서 효율적인 보상 신호의 부재를 해결하는 것을 목표로 합니다. 기존의 범용 **시각 언어 모델(VLM)**들이 복잡한 편집 명령에 대해 불충분한 보상 신호를 제공하는 문제를 극복하고, 전문화된 보상 모델을 통해 **온라인 RL**의 잠재력을 완전히 발휘하고자 합니다.

## 핵심 방법론
연구팀은 먼저 이미지 편집 품질을 체계적으로 평가하기 위한 포괄적인 벤치마크인 **EditReward-Bench**를 구축했습니다. 이 벤치마크를 기반으로, 명령 기반 이미지 편집의 품질을 평가하는 **EditScore**라는 일련의 보상 모델(7B-72B)을 개발했습니다. **EditScore**는 **Qwen2.5-VL** 모델을 세심하게 선별된 데이터로 **LoRA**를 사용하여 미세 조정하고, 추론 시 **셀프-앙상블(self-ensemble) 전략**을 적용하여 성능을 극대화했습니다.

## 주요 결과
**EditScore-72B (Avg@4)**는 **EditReward-Bench**에서 **GPT-5**를 능가하는 **0.763**의 전반적인 쌍별 정확도를 달성하며 최첨단 성능을 확립했습니다. 특히, **EditScore-7B** 버전도 **Qwen2.5-VL-72B**보다 뛰어난 성능을 보였습니다. **EditScore**를 활용한 온라인 **RL** 훈련은 기본 모델 **OmniGen2**의 성능을 **GEdit-Bench-EN**에서 **+0.40**, **ImgEdit-Bench**에서 **+0.23** 향상시키는 등 안정적이고 상당한 개선을 가져왔습니다.

## AI 실무자를 위한 시사점
본 연구는 고충실도 및 도메인 전문화된 보상 모델이 이미지 편집에서 **온라인 RL**의 성공에 필수적임을 입증했습니다. 기존의 범용 **VLM**은 **RL 훈련**에 필요한 강력하고 일관된 학습 신호를 제공하기에는 역부족임을 보여주었습니다. **EditReward-Bench**는 보상 모델 평가를 위한 표준화된 도구를 제공하며, **EditScore**는 이미지 편집 분야에서 **RL** 기반 모델 개발을 위한 강력한 오픈소스 기반을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.