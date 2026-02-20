---
title: "[논문리뷰] EgoNight: Towards Egocentric Vision Understanding at Night with a
  Challenging Benchmark"
excerpt: "Tianwen Qian이 arXiv에 게시한 'EgoNight: Towards Egocentric Vision Understanding at Night with a
  Challenging Benchmark' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Egocentric Vision
  - Nighttime Conditions
  - Visual Question Answering (VQA)
  - Day-Night Alignment
  - Multimodal Large Language Models (MLLMs)
  - Depth Estimation
  - Correspondence Retrieval
  - Benchmark

permalink: /ai/review/2025-10-8-EgoNight-Towards-Egocentric-Vision-Understanding-at-Night-with-a-Challenging-Benchmark/

toc: true
toc_sticky: true

date: 2025-10-08 13:48:12+0900
last_modified_at: 2025-10-08 13:48:12+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.06218)

**저자:** Deheng Zhang, Yuqian Fu, Runyi Yang, Yang Miao, Tianwen Qian, Xu Zheng, Guolei Sun, Ajad Chhatkuli, Xuanjing Huang, Yu-Gang Jiang, Luc Van Gool, Danda Pani Paudel



## 핵심 연구 목표
대부분의 기존 egocentric vision 벤치마크가 주간 시나리오에 집중하여 야간의 저조도 환경을 간과하는 문제를 해결하고자 합니다. 이 연구는 야간 egocentric vision 이해를 위한 최초의 포괄적인 벤치마크인 **EgoNight** 를 제시하여, 복잡한 장면 이해 및 추론 태스크에서 기존 **MLLMs** 의 성능 격차를 밝히는 것을 목표로 합니다.

## 핵심 방법론
**EgoNight** 는 **EgoNight-Synthetic** (Blender 렌더링을 통한 50쌍의 이상적인 주야간 정렬 비디오), **EgoNight-Sofia** (20쌍의 실제 주야간 정렬 비디오), **EgoNight-Oxford** (정렬되지 않은 20개의 야간 비디오)의 세 가지 소스에서 데이터를 통합합니다. 주요 태스크인 **EgoNight-VQA** 는 12가지 유형의 3,658개 인간 검증 QA 쌍을 포함하며, **주간 증강 자동 라벨링 파이프라인** 으로 생성되고 인간이 검증했습니다. 추가적으로 **주야간 대응 검색** 및 **야간 egocentric 깊이 추정** 벤치마크도 제공됩니다.

## 주요 결과
**MLLMs (GPT-4.1, Gemini 2.5 Pro, InternVL3-8B)** 는 주간 대비 야간 환경에서 상당한 성능 저하를 보였습니다. **EgoNight-VQA** 에서 **GPT-4.1** 은 최대 평균 정확도 **30.93%** , **InternVL3-8B** 는 **20.06%** 를 기록했으며, 주야간 정렬된 QA 유형에서 **EgoNight-Synthetic** 은 **32.8%** , **EgoNight-Sofia** 는 **25.0%** 의 성능 하락을 보였습니다. 특히, 새로 도입된 조명 인식/역학, 장면 순서 추론, 내비게이션 등 QA 유형에서 **MLLMs** 의 성능이 현저히 낮았습니다.

## AI 실무자를 위한 시사점
현재 **MLLMs** 는 저조도 egocentric 환경에서 심각한 성능 제약을 보이며, 실제 AI 어시스턴트 개발을 위해 **조명에 강인한 모델** 이 시급함을 보여줍니다. **주야간 정렬 비디오** 는 조명 변화에 따른 모델의 한계를 정량적으로 분석할 수 있는 강력한 도구이며, 새로운 QA 유형은 야간 egocentric 데이터에서 특정 추론 및 인식 문제를 식별하여 미래 연구 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.