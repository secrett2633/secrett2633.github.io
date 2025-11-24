---
title: "[논문리뷰] Are We Using the Right Benchmark: An Evaluation Framework for Visual
  Token Compression Methods"
excerpt: "Yiyu Wang이 [arXiv]에 게시한 'Are We Using the Right Benchmark: An Evaluation Framework for Visual
  Token Compression Methods' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Visual Token Compression
  - MLLMs
  - Evaluation Framework
  - Benchmarking
  - Downsampling
  - Data Filtering
  - Model Efficiency

permalink: /ai/review/2025-10-9-Are-We-Using-the-Right-Benchmark-An-Evaluation-Framework-for-Visual-Token-Compression-Methods/

toc: true
toc_sticky: true

date: 2025-10-09 13:45:06+0900
last_modified_at: 2025-10-09 13:45:06+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.07143)

**저자:** Chenfei Liao, Wensong Wang, Zichen Wen, Xu Zheng, Yiyu Wang, Haocong He, Yuanhuiyi Lyu, Lutao Jiang, Xin Zou, Yuqian Fu, Bin Ren, Linfeng Zhang, Xuming Hu



## 핵심 연구 목표
현재 **멀티모달 대규모 언어 모델(MLLMs)**의 시각 토큰 압축 방법론 평가에 사용되는 벤치마크들이 압축 기술 평가에 부적합하여, **단순 이미지 다운샘플링**이 종종 고급 압축 방법보다 우수한 성능을 보이는 잘못된 결과를 초래하는 문제를 해결하는 것을 목표로 합니다. 본 논문은 이러한 **단순성 편향(simplicity bias)**과 **데이터 노이즈**를 제거하여 시각 토큰 압축 방법들을 공정하고 정확하게 평가할 수 있는 새로운 프레임워크 **VTC-Bench**를 제안합니다.

## 핵심 방법론
**VTC-Bench**는 기존 벤치마크 내의 샘플들을 **"간단한(simple)" 그룹 B**와 **"어려운(difficult)" 그룹 A**로 분류하는 **데이터 필터링 메커니즘**을 도입합니다. 이 분류를 위해 **다운샘플링** 방법을 이진 판별자로 사용하며, 원본 **Qwen2-VL** 모델조차도 정답을 맞히지 못하는 샘플이나 다운샘플링 시 오답이 되는 샘플을 **"어려운 샘플(Group A)"**로 간주합니다. 최종적으로 **FastV, VisionZip, PruMerge+, DART**와 같은 고급 시각 토큰 압축 방법들은 이 **"어려운 샘플(Group A)"** 집합에서만 평가되어 실제 압축 성능을 측정합니다.

## 주요 결과
기존 벤치마크에서 **단순 이미지 다운샘플링**은 **Qwen2-VL-7B** 모델로 **75% 압축률**에서 최대 **91.0 ADR(Average Decline Ratio)**을 기록하며 고급 압축 방법들을 능가하는 것으로 나타났습니다. 하지만 **VTC-Bench**를 통해 **"어려운 샘플(Group A)"**에 대한 평가를 진행했을 때, **다운샘플링**의 정확도는 **0%**로 떨어졌고, **DART**와 **VisionZip**과 같은 고급 방법들은 **75% 압축률**에서 **GQA** 벤치마크에서 각각 **58.9%, 59.3%**의 정확도를 달성하며 그 실제 가치를 입증했습니다. 이는 기존 벤치마크가 **시각적 세부 정보**가 필요 없는 **"간단한" 샘플**로 포화되어 있음을 명확히 보여줍니다.

## AI 실무자를 위한 시사점
현행 MLLM 벤치마크들이 시각 토큰 압축 방법의 진정한 효율성을 제대로 평가하지 못하는 **근본적인 한계**를 명확히 제시합니다. AI 실무자들은 시각 토큰 압축 모델을 평가할 때 **VTC-Bench**와 같이 **데이터 난이도를 고려한 평가 프레임워크**를 사용하여 보다 **정확하고 공정한 성능 분석**을 수행해야 합니다. **단순 다운샘플링**은 기본적인 시나리오에 유용할 수 있지만, **복잡하고 미세한 시각적 이해**를 요구하는 작업에서는 **고급 압축 기술**이 필수적임을 인지하는 것이 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.