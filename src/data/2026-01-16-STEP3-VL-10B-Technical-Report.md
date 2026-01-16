---
title: "[논문리뷰] STEP3-VL-10B Technical Report"
excerpt: "이 [arXiv]에 게시한 'STEP3-VL-10B Technical Report' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Large Language Models
  - Vision-Language Models
  - Reinforcement Learning
  - Parallel Coordinated Reasoning
  - Model Efficiency
  - Foundation Models
  - Pre-training
  - Post-training

permalink: /ai/review/2026-01-16-STEP3-VL-10B-Technical-Report/

toc: true
toc_sticky: true

date: 2026-01-16 00:00:00+0900+0900
last_modified_at: 2026-01-16 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.09668)

**저자:** Ailin Huang, Chengyuan Yao, Chunrui Han, Fanqi Wan, Hangyu Guo, Haoran Lv, Hongyu Zhou, Jia Wang, Jian Zhou, Jianjian Sun, Jingcheng Hu, Kangheng Lin, Liang Zhao, Mitt Huang, Song Yuan, Wenwen Qu, Xiangfeng Wang, Yanlin Lai, Yingxiu Zhao, Yinmin Zhang, Yukang Shi, Yuyang Chen, Zejia Weng, Ziyang Meng, Ang Li, Aobo Kong, Bo Dong, Changyi Wan, David Wang, Di Qi, Dingming Li, En Yu, Guopeng Li, Haiquan Yin, Han Zhou, Hanshan Zhang, Haolong Yan, Hebin Zhou, Hongbo Peng, Jiaran Zhang, Jiashu Lv, Jiayi Fu, Jie Cheng, Jie Zhou, Jisheng Yin, Jingjing Xie, Jingwei Wu, Jun Zhang, Junfeng Liu, Kaijun Tan, Kaiwen Yan, Liangyu Chen, Lina Chen, Mingliang Li, Qian Zhao, Quan Sun, Shaoliang Pang, Shengjie Fan, Shijie Shang, Siyuan Zhang, Tianhao You, Wei Ji, Wuxun Xie, Xiaobo Yang, Xiaojie Hou, Xiaoran Jiao, Xiaoxiao Ren, Xiangwen Kong, Xin Huang, Xin Wu, Xing Chen, Xinran Wang, Xuelin Zhang, Yana Wei, Yang Li, Yanming Xu, Yeqing Shen, Yuang Peng, Yue Peng, Yu Zhou, Yusheng Li, Yuxiang Yang, Yuyang Zhang, Zhe Xie, Zhewei Huang, Zhenyi Lu, Zhimin Fan, Zihui Cheng



## 핵심 연구 목표
본 연구는 경량화된 오픈소스 파운데이션 모델인 **STEP3-VL-10B** 를 통해 효율성과 최첨단 멀티모달 지능 간의 균형을 재정의하는 것을 목표로 합니다. 특히, 제한된 파라미터 예산 내에서 복잡한 추론 및 지각 능력을 발전시키는 데 중점을 둡니다.

## 핵심 방법론
이 모델은 **1.2T 멀티모달 토큰** 에 대한 **통합된, 완전히 고정되지 않은(fully unfrozen) 사전 학습 전략** 을 통해 구축되었습니다. 이는 **언어 정렬 Perception Encoder** 와 **Qwen3-8B 디코더** 를 결합하여 시각-언어 시너지를 확립합니다. 또한, **1k회 이상의 강화 학습(RL) 반복** 을 포함하는 확장된 후속 학습 파이프라인과 **Parallel Coordinated Reasoning (PaCoRe)** 을 도입하여 테스트 시점 컴퓨팅을 확장하고 다양한 시각적 가설을 탐색 및 종합합니다.

## 주요 결과
**STEP3-VL-10B** 는 콤팩트한 **10B 파라미터** 규모에도 불구하고, **MMBench에서 92.2%** , **MMMU에서 80.11%** , **AIME2025에서 94.43%** , **MathVision에서 75.95%** 의 성능을 기록했습니다. 이는 **GLM-4.6V-106B** 나 **Qwen3-VL-235B** 와 같은 **10배에서 20배 더 큰 모델** 및 **Gemini 2.5 Pro** , **Seed-1.5-VL** 과 같은 최상위 독점 모델과 견줄 만하거나 능가하는 수준입니다. 특히 **PaCoRe** 모드에서는 **MMMU 80.11%** 등 여러 벤치마크에서 표준 SeRe 모드를 일관되게 능가했습니다.

## AI 실무자를 위한 시사점
**STEP3-VL-10B** 는 고성능 멀티모달 기능을 갖춘 효율적인 오픈소스 기반 모델을 제공하여 AI 엔지니어들에게 강력한 기준점을 제시합니다. 이 모델은 적절한 사전 훈련 데이터 및 강화 학습 전략을 통해 소규모 모델도 최첨단 성능을 달성할 수 있음을 보여줍니다. 특히 **PaCoRe** 는 복잡한 시각 및 추론 작업을 위한 확장 가능한 테스트-시간 컴퓨팅 전략으로, 제한된 리소스로도 고급 AI 애플리케이션을 효율적으로 배포할 수 있는 가능성을 열었습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.