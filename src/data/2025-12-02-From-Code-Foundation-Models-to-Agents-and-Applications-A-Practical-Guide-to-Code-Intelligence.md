---
title: "[논문리뷰] From Code Foundation Models to Agents and Applications: A Practical Guide to Code Intelligence"
excerpt: "이 [arXiv]에 게시한 'From Code Foundation Models to Agents and Applications: A Practical Guide to Code Intelligence' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Code LLMs
  - Software Engineering Agents
  - Code Generation
  - Reinforcement Learning
  - Supervised Fine-tuning
  - Multimodal AI
  - Code Safety
  - Scaling Laws

permalink: /ai/review/2025-12-02-From-Code-Foundation-Models-to-Agents-and-Applications-A-Practical-Guide-to-Code-Intelligence/

toc: true
toc_sticky: true

date: 2025-12-02 00:00:00+0900+0900
last_modified_at: 2025-12-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.18538)

**저자:** Jian Yang, Xianglong Liu, Weifeng Lv, Ken Deng, Shawn Guo, Lin Jing, Yizhi Li, Shark Liu, Xianzhen Luo, Yuyu Luo, Changzai Pan, Ensheng Shi, Yingshui Tan, Renshuai Tao, Zili Wang, Jiajun Wu, Xianjie Wu, Zhenhe Wu, Daoguang Zan, Chenchen Zhang, Wei Zhang, He Zhu, Terry Yue Zhuo, Kerui Cao, Xianfu Cheng, Jun Dong, Shengjie Fang, Zhiwei Fei, Xiangyuan Guan, Qipeng Guo, Zhiguang Han, Xueyu Hu, Joseph James, Tianqi Luo, Renyuan Li, Yuhang Li, Yiming Liang, Congnan Liu, Jiaheng Liu, Qian Liu, Ruitong Liu, Tyler Loakman, Xiangxin Meng, Chuang Peng, Tianhao Peng, Jiajun Shi, Mingjie Tang, Boyang Wang, Haowen Wang, Yunli Wang, Fanglin Xu, Zihan Xu



## 핵심 연구 목표
이 논문은 **코드 LLM(Large Language Models)** 의 전체 모델 라이프사이클을 포괄하는 실용적인 가이드와 종합적인 분석을 제공하는 것을 목표로 합니다. 데이터 큐레이션부터 사전 훈련, 고급 프롬프트 패러다임, 정렬 기술, 자율 코딩 에이전트 개발에 이르기까지 코드 LLM의 기술, 설계 결정, 장단점을 체계적으로 검토하고 학술 연구와 실제 배포 간의 격차를 해소하고자 합니다.

## 핵심 방법론
연구는 **일반 LLM** 과 **코드 전문 LLM** 의 역량을 비판적으로 분석합니다. 특히 **코드 사전 훈련** , **지도 미세 조정(SFT)** , **강화 학습(RL)** 에 대한 심층적인 실험을 수행합니다. 이 실험은 **스케일링 법칙** , **프레임워크 선택** , **하이퍼파라미터 민감도** , **모델 아키텍처** , **데이터셋 비교** 등 다양한 차원을 다룹니다. 또한, **코드 LLM 안전성** 및 **소프트웨어 엔지니어링 에이전트** 에 대한 포괄적인 분류 체계를 제시합니다.

## 주요 결과
코드 LLM은 **HumanEval** 벤치마크에서 **단일 자릿수에서 95% 이상의 성공률** 로 극적인 성능 향상을 달성했습니다. 실험 결과, **rf++baseline** 을 사용한 RL 훈련 시 **Pass@1 0.318** , **Pass@5 0.356** 의 경쟁력 있는 성능을 보였고, SFT에서는 **Qwen2.5-Coder-14B** 가 **HumanEval 0.872** 를 달성했습니다. 이는 **고품질의 검증된 데이터** 와 **잘 조정된 미세 조정 전략** 이 모델 성능 향상에 결정적임을 입증합니다.

## AI 실무자를 위한 시사점
AI 실무자들은 이 가이드를 통해 **코드 LLM의 전체 개발 파이프라인** 을 이해하고, **최적화된 사전 훈련 및 미세 조정 전략** 을 적용하여 모델 성능을 극대화할 수 있습니다. 특히 **RLHF(Reinforcement Learning from Human Feedback)** 와 **RLVR(Reinforcement Learning with Verifiable Rewards)** 를 활용하여 **코드 품질, 효율성, 보안** 을 높이는 것이 중요합니다. 또한 **SWE 에이전트** 의 발전은 **자율적인 소프트웨어 개발** 의 가능성을 보여주며, **멀티모달 기능** 과 **안전성 고려** 가 미래 코드 지능 시스템의 핵심임을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.