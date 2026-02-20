---
title: "[논문리뷰] World Action Models are Zero-shot Policies"
excerpt: "arXiv에 게시된 'World Action Models are Zero-shot Policies' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - World Action Models
  - Video Diffusion Models
  - Zero-shot Generalization
  - Cross-embodiment Transfer
  - Real-time Control
  - Robotics
  - Foundation Models
  - Flow Matching

permalink: /ai/review/2026-02-19-World-Action-Models-are-Zero-shot-Policies/

toc: true
toc_sticky: true

date: 2026-02-19 00:00:00+0900+0900
last_modified_at: 2026-02-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.15922)

**저자:** Seonghyeon Ye†, Yunhao Ge\*, Kaiyuan Zheng\*, Shenyuan Gao\*, Sihyun Yu\*, George Kurian\*, Suneel Indupuru, You Liang Tan, Chuning Zhu, Jiannan Xiang, Ayaan Malik, Kyungmin Lee, William Liang, Nadun Ranawaka, Jiasheng Gu, Yinzhen Xu, Guanzhi Wang, Fengyuan Hu, Avnish Narayan, Johan Bjorck, Jing Wang, Gwanghyun Kim, Dantong Niu, Ruijie Zheng, Yuqi Xie, Jimmy Wu, Qi Wang, Ryan Julian, Danfei Xu, Yilun Du, Yevgen Chebotar, Scott Reed, Jan Kautz, Yuke Zhu, Linxi "Jim" Fan, Joel Jang†



## 핵심 연구 목표
본 논문은 Vision-Language-Action (VLA) 모델의 한계인 새로운 환경에서 미지의 물리적 동작에 대한 일반화 능력 부족을 해결하고자 합니다. 비디오를 세계 변화의 밀도 있는 표현으로 활용하여 미래 세계 상태와 행동을 예측함으로써 물리적 동역학을 학습하는 **World Action Model (WAM)** 인 **DreamZero** 를 제안합니다.

## 핵심 방법론
**DreamZero** 는 **사전 훈련된 비디오 확산 백본** 을 기반으로 구축된 **14B autoregressive diffusion transformer** 입니다. 비디오와 행동을 동시에 모델링하여 다양한 이기종 로봇 데이터로부터 효과적으로 학습하며, **flow matching** 을 통해 행동 생성을 유도합니다. **CFG parallelism** , **DiT caching** , **decoupled noise schedules (DreamZero-Flash)** 등 다양한 시스템 및 모델 최적화를 통해 **7Hz** 의 실시간 제어 속도를 달성합니다.

## 주요 결과
**DreamZero** 는 기존 VLA 대비 새로운 작업 및 환경에 대한 일반화에서 **2배 이상 개선된 성능** 을 보였습니다. 특히, 비디오 전용 데이터를 10~20분만 사용하여 **미지의 작업에서 42% 이상의 상대적 개선** 을 통해 교차-엔바디먼트 전이를 가능하게 했으며, 단 **30분간의 플레이 데이터** 만으로 새로운 로봇에 대한 few-shot 적응이 가능함을 입증했습니다.

## AI 실무자를 위한 시사점
**DreamZero** 는 로봇 학습에서 반복적인 시연 데이터에 대한 의존도를 줄이고 **다양한 데이터를 활용한 효과적인 학습** 의 가능성을 제시합니다. **7Hz의 실시간 폐쇄 루프 제어** 는 실제 로봇 시스템에 즉시 적용할 수 있는 실용적인 이점을 제공하며, **few-shot adaptation** 과 **cross-embodiment transfer** 는 새로운 로봇 및 환경에 대한 정책 배포 비용을 획기적으로 낮출 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.