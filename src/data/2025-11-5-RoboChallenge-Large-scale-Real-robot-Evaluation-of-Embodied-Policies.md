---
title: "[논문리뷰] RoboChallenge: Large-scale Real-robot Evaluation of Embodied Policies"
excerpt: "이 [arXiv]에 게시한 'RoboChallenge: Large-scale Real-robot Evaluation of Embodied Policies' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Robotics
  - Real-robot Evaluation
  - Embodied AI
  - Vision-Language-Action Models
  - Benchmarking
  - Online Testing System
  - Robotics Control
  - Large-scale Evaluation

permalink: /ai/review/2025-11-5-RoboChallenge-Large-scale-Real-robot-Evaluation-of-Embodied-Policies/

toc: true
toc_sticky: true

date: 2025-11-09 19:35:02+0900
last_modified_at: 2025-11-09 19:35:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.17950)

**저자:** Adina Yakefu, Bin Xie, Chongyang Xu, Enwen Zhang, Erjin Zhou, Fan Jia, Haitao Yang, Haoqiang Fan, Haowei Zhang, Hongyang Peng, Jing Tan, Junwen Huang, Kai Liu, Kaixin Liu, Kefan Gu, Qinglun Zhang, Ruitao Zhang, Saike Huang, Shen Cheng, Shuaicheng Liu, Tiancai Wang, Tiezhen Wang, Wei Sun, Wenbin Tang, Yajun Wei, Yang Chen, Youqiang Gui, Yucheng Zhao, Yunchao Ma, Yunfei Wei, Yunhuan Yang, Yutong Guo, Ze Chen, Zhengyuan Du, Ziheng Zhang, Ziming Liu, Ziwei Yan



## 핵심 연구 목표
본 논문은 학습 기반 로봇 제어 알고리즘, 특히 **Vision-Language-Action (VLA) 모델**의 대규모, 재현성 및 확장 가능한 실제 로봇 평가를 위한 도전 과제를 해결하는 것을 목표로 합니다. 시뮬레이터 기반 벤치마크 및 소규모 실제 로봇 설정의 한계를 극복하고 연구자들이 실제 로봇 환경에서 공정하게 정책을 테스트할 수 있는 온라인 인프라인 **RoboChallenge**를 구축하고자 합니다.

## 핵심 방법론
**RoboChallenge** 시스템은 **UR5, Franka Panda, Cobot Magic Aloha, ARX-5** 등 네 가지 유형의 **10대 실제 로봇**으로 구성된 온라인 평가 환경을 제공합니다. 사용자는 **저수준 비동기 API**를 통해 로봇과 상호작용하여 관측값(RGB, Depth, 고유수용성)을 얻고 액션을 실행하며, 모델 파일이나 Docker 이미지 제출 없이 사용자 측에서 모델을 실행합니다. 테스터로 인한 변동성을 줄이기 위해, 기준 이미지를 라이브 카메라 스트림에 중첩하여 초기 상태를 시각적으로 일치시키는 **Visual Task Reproduction** 프로토콜을 사용합니다. 초기 벤치마크인 **Table30**은 **30가지 작업**으로 구성되며, VLA 모델의 다양한 측면(예: 정밀 3D 현지화, 가려짐, 시간적 의존성, 다단계, 부드러운 물체 처리)을 평가합니다.

## 주요 결과
**Table30 벤치마크**에서 **π0.5 모델(파인튜닝)**이 다른 테스트 모델들을 크게 능가하여 **42.67%의 성공률**과 **61.84점의 점수**를 기록했습니다. 특히 `시간적 의존성` 및 `부드러운 물체`와 관련된 작업은 성공률을 현저히 낮췄으며, `정밀 3D` 작업 또한 평균 **18%의 성공률**로 더욱 어려웠습니다. 반대로 `분류` 및 `조작` 작업은 약간 더 높은 성공률을 보였고, `간단한 픽업` 작업은 강한 모델에서 **최대 90%의 성공률**을 달성했습니다. **π0.5/multi**의 일반화 설정은 **17.67%의 성공률**과 **31.27점**을 기록하며 유망한 일반화 능력을 보였고, 일부 작업에서는 태스크별 파인튜닝 모델보다 더 나은 성능을 달성했습니다.

## AI 실무자를 위한 시사점
**RoboChallenge** 시스템은 VLA 모델을 위한 중요한 **대규모 실제 로봇 평가 플랫폼**을 제공하여 시뮬레이션을 넘어 더욱 견고하고 현실적인 벤치마킹을 가능하게 합니다. 연구 결과는 VLA 모델의 현재 한계, 특히 **시간 추론, 부드러운 물체 처리, 정밀 3D 현지화** 분야를 강조하며, 이는 향후 연구 개발의 핵심 영역임을 시사합니다. **"원격 로봇" API 기반 평가** 패러다임은 접근성과 미세한 제어에 대한 실용적인 이점을 제공하며, 사용자 측 모델의 유연한 통합을 가능하게 합니다. 벤치마크 결과는 **강력한 기반 모델(예: π0.5)**의 중요성을 강조하며, 더욱 유능한 "일반화된" 체화형 AI 정책 개발을 위한 명확한 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.