---
title: "[논문리뷰] Video-LMM Post-Training: A Deep Dive into Video Reasoning with Large
  Multimodal Models"
excerpt: "zeliang0426이 [arXiv]에 게시한 'Video-LMM Post-Training: A Deep Dive into Video Reasoning with Large
  Multimodal Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Reasoning
  - Large Multimodal Models (LMMs)
  - Post-training
  - Supervised Fine-tuning (SFT)
  - Reinforcement Learning (RL)
  - Test-Time Scaling (TTS)
  - Chain-of-Thought (CoT)

permalink: /ai/review/2025-10-7-Video-LMM-Post-Training-A-Deep-Dive-into-Video-Reasoning-with-Large-Multimodal-Models/

toc: true
toc_sticky: true

date: 2025-10-07 13:36:57+0900
last_modified_at: 2025-10-07 13:36:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.05034)

**저자:** Yolo Yunlong Tang, Jing Bi, Pinxin Liu, Zhenyu Pan, Zhangyun Tan, Qianxiang Shen, Jiani Liu, Hang Hua, Junjia Guo, Yunzhong Xiao, Chao Huang, Zhiyuan Wang, Susan Liang, Xinyi Liu, Yizhi Song, Yuhe Nie, Jia-Xing Zhong, Bozheng Li, Daiqing Qi, Ziyun Zeng, Ali Vosoughi, Luchuan Song, Zeliang Zhang, Daiki Shimada, Han Liu, Jiebo Luo, Chenliang Xu



## 핵심 연구 목표
본 논문은 비디오 이해의 복잡한 시공간적 관계, 장기 의존성, 다중 모달 증거 통합 추론 문제를 해결하기 위해 **Video-Large Multimodal Models (Video-LMMs)**의 **"포스트 트레이닝(Post-training)"** 방법론을 최초로 포괄적으로 분석하는 것을 목표로 합니다. 특히, 단편적인 연구들을 통합하여 Video-LMM이 단순한 인지 시스템에서 정교한 추론 엔진으로 발전하는 데 필수적인 과정을 체계화합니다.

## 핵심 방법론
이 조사는 Video-LMM 포스트 트레이닝의 세 가지 핵심 기둥인 **Supervised Fine-Tuning (SFT)**, **Reinforcement Learning (RL)**, 그리고 **Test-Time Scaling (TTS)**을 다룹니다. **CoT-SFT**는 추론 패턴을 모방하고 RL의 초기화 단계로 사용되며, **GRPO/R1-style RL**은 검증 가능한 목적 함수를 통해 추론 및 자기 수정 능력을 강화합니다. **TTS**는 **Video-CoT 프롬프팅**, **자기 일관성 디코딩**, **툴 증강 추론** 등을 활용하여 추론 계산을 늘려 신뢰성을 높입니다.

## 주요 결과
이 조사는 새로운 실험 결과를 제시하지는 않지만, 기존 연구들의 핵심 발견을 종합합니다. 예를 들어, **Video-RTS**는 **약 6K 비디오-QA 샘플**만을 사용한 **GRPO**로 **165K SFT 쌍**을 사용한 시스템과 유사한 성능을 달성하여 데이터 효율성을 강조했습니다. 또한 **CoT-Vid**는 **약 5개의 추론 샘플**을 통해 자기 일관성 검증으로 정확도를 향상시켰습니다.

## AI 실무자를 위한 시사점
본 조사는 AI/ML 엔지니어 및 데이터 과학자들에게 Video-LMM의 **추론 능력 향상**을 위한 통합 프레임워크와 실용적인 지침을 제공합니다. **검증 가능한 보상 설계**, **확장성**, **비용-성능 최적화**와 같은 현재의 주요 과제를 명확히 제시하며, **SFT**, **RL**, **TTS** 기술의 영상 도메인 적용 시 고려해야 할 사항을 안내하여 실제 시스템 개발에 기여합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.