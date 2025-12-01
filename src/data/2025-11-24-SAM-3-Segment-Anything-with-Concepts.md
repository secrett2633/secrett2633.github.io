---
title: "[논문리뷰] SAM 3: Segment Anything with Concepts"
excerpt: "이 [arXiv]에 게시한 'SAM 3: Segment Anything with Concepts' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Segment Anything Model
  - Open-Vocabulary Segmentation
  - Multimodal Foundation Model
  - Instance Segmentation
  - Video Object Tracking
  - Prompt Engineering
  - Data Engine
  - Human-in-the-loop

permalink: /ai/review/2025-11-24-SAM-3-Segment-Anything-with-Concepts/

toc: true
toc_sticky: true

date: 2025-11-24 00:00:00+0900+0900
last_modified_at: 2025-11-24 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.16719)

**저자:** Nicolas Carion, Laura Gustafson, Yuan-Ting Hu, Shoubhik Debnath, Ronghang Hu, Didac Suris, Chaitanya Ryali, Kalyan Vasudev Alwala, Haitham Khedr, Andrew Huang, Jie Lei, Tengyu Ma, Baishan Guo, Arpit Kalla, Markus Marks, Joseph Greer, Meng Wang, Peize Sun, Roman Rädle, Triantafyllos Afouras, Effrosyni Mavroudi, Katherine Xu, Tsung-Han Wu, Yu Zhou, Liliane Momeni, Rishi Hazra, Shuangrui Ding, Sagar Vaze, Francois Porcher, Feng Li, Siyuan Li, Aishwarya Kamath, Ho Kei Cheng, Piotr Dollár, Nikhila Ravit, Kate Saenkot, Pengchuan Zhang, Christoph Feichtenhofer (Meta Superintelligence Labs)



## 핵심 연구 목표
이 논문은 기존 **SAM(Segment Anything Model)** 의 한계, 즉 단일 객체 분할(PVS)을 넘어 이미지와 비디오에서 **개념(Concept)** 을 기반으로 모든 객체 인스턴스를 탐지, 분할 및 추적하는 것을 목표로 합니다. 짧은 명사구, 이미지 예시, 또는 이들의 조합으로 시각적 개념을 지정하여 **Promptable Concept Segmentation (PCS)** 이라는 새로운 태스크를 해결하고자 합니다.

## 핵심 방법론
**SAM 3** 는 **DETR-기반 detector** 와 **메모리 기반 video tracker** 가 **단일 비전 인코더(Perception Encoder)** 를 공유하는 아키텍처를 채택했습니다. 인식과 지역화 문제를 분리하기 위해 **Presence Head** 를 도입하여 어려운 네거티브 프롬프트에서도 탐지 정확도를 높였습니다. 또한, **4M개 이상의 고유한 개념 레이블** 을 포함하는 **확장 가능한 데이터 엔진** 을 구축하여 대규모 고품질 데이터를 효율적으로 생성하고, **AI verifier** 를 활용해 주석 처리량을 두 배로 늘렸습니다.

## 주요 결과
**SAM 3** 는 이미지 및 비디오 **PCS** 에서 기존 시스템 대비 **두 배의 정확도** 를 달성했습니다. 특히, **LVIS** 벤치마크에서 **zero-shot 마스크 AP 48.8** 을 기록하여 기존 최고 성능인 38.5를 크게 상회했습니다. 새로운 **SA-Co 벤치마크** 에서는 기존 베이스라인 대비 **cgF1 스코어에서 최소 2배 이상** 의 성능 향상을 보였으며, 인간 성능의 74%에 도달했습니다.

## AI 실무자를 위한 시사점
**SAM 3** 는 **Open-Vocabulary Segmentation** 의 새로운 표준을 제시하며, **Multimodal Large Language Model (MLLM)** 과 결합하여 복잡한 언어 쿼리도 처리할 수 있는 강력한 범용 비전 도구로 활용될 수 있습니다. 본 논문에서 제시된 **확장 가능한 데이터 엔진** 및 **AI verifier** 기반의 효율적인 데이터 주석 파이프라인은 대규모 고품질 데이터셋 구축을 위한 실용적인 방법론을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.