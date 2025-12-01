---
title: "[논문리뷰] Logics-Parsing Technical Report"
excerpt: "Fan Yang이 [arXiv]에 게시한 'Logics-Parsing Technical Report' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Document Parsing
  - Large Vision-Language Models (LVLM)
  - Reinforcement Learning (RL)
  - Layout Analysis
  - Reading Order
  - Supervised Fine-Tuning (SFT)
  - HTML Annotation
  - Benchmarking

permalink: /ai/review/2025-9-25-Logics-Parsing-Technical-Report/

toc: true
toc_sticky: true

date: 2025-09-25 13:08:16+0900
last_modified_at: 2025-09-25 13:08:16+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.19760)

**저자:** Xiangyang Chen, Shuzhao Li, Xiuwen Zhu, Yongfan Chen, Fan Yang, Cheng Fang, Lin Qu, Xiaoxiao Xu, Hu Wei, Minggang Wu



## 핵심 연구 목표
본 논문은 기존 LVLM이 복잡한 문서 레이아웃 및 읽기 순서 처리에서 겪는 한계를 극복하고, 이를 위해 **강화 학습(Reinforcement Learning)** 을 통해 고도화된 **종단 간 LVLM 기반 문서 파싱 모델** 을 개발하는 것을 목표로 합니다. 특히, 다단 신문이나 포스터와 같은 복잡한 문서 유형에 대한 **정확한 레이아웃 분석 및 읽기 순서 추론** 능력을 향상시키고자 합니다.

## 핵심 방법론
제안된 **Logics-Parsing** 모델은 **2단계 SFT-then-RL 훈련 전략** 을 따릅니다. 첫 번째 **SFT(Supervised Fine-Tuning) 단계** 에서는 **Qwen2.5-VL-7B** 를 30만 개 이상의 고품질 페이지 수준 문서 이미지에 대해 **다중 유형 데이터(일반 텍스트, 수학 공식, 테이블, 화학 공식, 손글씨 한자)** 를 포함하여 미세 조정합니다. 두 번째 **LC-RL(Layout-Centric Reinforcement Learning) 단계** 에서는 **GRPO(Group Relative Policy Optimization)** 를 사용하여 모델을 강화하며, **텍스트 정확도, 레이아웃 정밀도, 논리적 읽기 순서** 를 평가하는 **다중 구성 요소 보상 함수** 를 통해 복잡한 레이아웃 처리 능력을 최적화합니다.

## 주요 결과
**Logics-Parsing** 은 새로 구축된 **LogicsParsingBench** 벤치마크에서 **종합적으로 SOTA(State-of-the-Art) 성능** 을 달성했습니다. 영어(0.124) 및 중국어(0.145) 문서에서 가장 낮은 **총 편집 거리** 를 기록했으며, 특히 **읽기 순서 편집 거리** 에서 Logics-Parsing-SFT 대비 영어(0.149→0.136) 및 중국어(0.155→0.113)에서 상당한 개선을 보였습니다. 순수 텍스트, 화학 구조 및 손글씨 콘텐츠 파싱에서 뛰어난 성능을 입증했으나, 테이블 구조 인식 및 수학 공식 인식에서는 최고 상용 도구 대비 성능 격차가 있음을 인정했습니다.

## AI 실무자를 위한 시사점
**LVLM과 강화 학습의 결합** 이 복잡한 문서 파싱 태스크에서 강력한 성능 향상을 가져올 수 있음을 보여줍니다. 특히, **SFT를 통한 초기 안정화** 와 **레이아웃 중심 RL을 통한 일반화** 전략은 문서 지능 시스템 개발에 중요한 가이드라인을 제공합니다. 또한, **LogicsParsingBench** 는 실제 복잡성을 반영하는 새로운 평가 벤치마크로, 향후 문서 인텔리전스 연구 및 개발의 기준으로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.