---
title: "[논문리뷰] HY3D-Bench: Generation of 3D Assets"
excerpt: "이 [arXiv]에 게시한 'HY3D-Bench: Generation of 3D Assets' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D Generation
  - Dataset
  - Benchmark
  - AIGC
  - Watertight Mesh
  - Part-level Decomposition
  - Foundation Model
  - Robotics

permalink: /ai/review/2026-02-05-HY3D-Bench-Generation-of-3D-Assets/

toc: true
toc_sticky: true

date: 2026-02-05 00:00:00+0900+0900
last_modified_at: 2026-02-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.03907)

**저자:** Bowen Zhang, Chunchao Guo, Dongyuan Guo, Haolin Liu, Hongyu Yan, Huiwen Shi, Jiaao Yu, Jiachen Xu, Jingwei Huang, Kunhong Li, Lifu Wang, Linus, Penghao Wang, Qingxiang Lin, Ruining Tang, Xianghui Yang, Yang Li, Yunfei Zhao, Yunhan Yang, Zeqiang Lai, Zhihao Liang, Zibo Zhao, Chao Zhang, Edwarrd Wang, Hao Zhang, Jiaxin Lin, Peng He, Yirui Guan, Yonghao Tan, Zheng Ye



## 핵심 연구 목표
3D 콘텐츠 생성 분야의 **데이터 처리 병목 현상** 을 해결하고, 고품질 3D 콘텐츠 생성을 위한 **통합적이고 표준화된 오픈소스 생태계** 인 **HY3D-Bench** 를 구축하는 것이 목표입니다. 이는 3D 생성 모델의 훈련 및 평가를 위한 견고한 기반을 제공하여 연구 발전을 가속화하고자 합니다.

## 핵심 방법론
이 프레임워크는 세 가지 주요 기여를 포함합니다. 첫째, **Objaverse 및 Objaverse-XL** 에서 **252k개** 의 고품질 **완전 방수 메시(watertight meshes)** 및 **다중 뷰 렌더링** 을 갖춘 3D 에셋 라이브러리를 구축했습니다. 둘째, **240k개** 의 **구조화된 파트 레벨 분해(part-level decomposition)** 데이터를 도입하여 세밀한 제어 및 편집을 가능하게 했습니다. 셋째, **Text-to-Text, Text-to-Image, Image-to-3D** 의 **AIGC 합성 파이프라인** 을 통해 **125k개** 의 희귀(long-tail) 카테고리 합성 에셋을 제공하여 데이터 다양성을 확장했습니다.

## 주요 결과
HY3D-Bench는 **총 252,676개** 의 풀 레벨 3D 에셋, **240,524개** 의 파트 레벨 에셋, 그리고 **125k개 이상** 의 AIGC 합성 에셋을 제공합니다. **Hunyuan3D-2.1-Small 모델** 을 사용하여 검증한 결과, 본 데이터셋으로 훈련된 모델은 **832M개** 의 적은 파라미터에도 불구하고 **Trellis [86] (1156M 파라미터)** 및 **Hunyuan3D 2.1 [27] (1238M 파라미터)** 과 **유사한 이미지-3D 생성 품질** 을 달성했습니다 (Uni3D-I↑ **0.3606** , ULIP-I↑ **0.2424** ). 이는 데이터 품질이 3D 생성 성능에 중요한 역할을 함을 입증합니다.

## AI 실무자를 위한 시사점
AI 실무자들은 **HY3D-Bench** 를 통해 방대한 양의 **고품질, 사전 처리된 3D 데이터** 에 손쉽게 접근할 수 있어, 데이터 전처리 부담을 크게 줄이고 **3D 생성 모델 개발 및 최적화** 에 집중할 수 있습니다. 특히, **파트 레벨 분해 데이터** 는 정밀한 3D 편집 및 제어가 필요한 애플리케이션에 유용하며, **AIGC 합성 데이터** 는 희귀 카테고리 객체의 생성 및 로봇 시뮬레이션 환경의 다양성 확장에 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.