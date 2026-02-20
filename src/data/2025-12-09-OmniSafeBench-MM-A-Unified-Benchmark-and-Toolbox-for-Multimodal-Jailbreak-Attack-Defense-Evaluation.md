---
title: "[논문리뷰] OmniSafeBench-MM: A Unified Benchmark and Toolbox for Multimodal Jailbreak Attack-Defense Evaluation"
excerpt: "Simeng Qin이 arXiv에 게시한 'OmniSafeBench-MM: A Unified Benchmark and Toolbox for Multimodal Jailbreak Attack-Defense Evaluation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLMs
  - Jailbreak Attack
  - Attack-Defense Evaluation
  - Benchmark
  - Safety Alignment
  - Vulnerability Analysis
  - Risk Taxonomy
  - Evaluation Metrics

permalink: /ai/review/2025-12-09-OmniSafeBench-MM-A-Unified-Benchmark-and-Toolbox-for-Multimodal-Jailbreak-Attack-Defense-Evaluation/

toc: true
toc_sticky: true

date: 2025-12-09 00:00:00+0900+0900
last_modified_at: 2025-12-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.06589)

**저자:** Simeng Qin, Teng Ma, Qi Guo, Jie Liao, Xiaojun Jia



## 핵심 연구 목표
본 논문은 멀티모달 대규모 언어 모델(MLLM)의 안전성 정렬을 우회하는 **탈옥(jailbreak) 공격** 에 대한 **통합적인 벤치마크 및 툴박스** 를 구축하는 것을 목표로 합니다. 기존 벤치마크가 가진 제한적인 공격 시나리오, 표준화되지 않은 방어 평가, 재현 가능한 툴박스 부재와 같은 한계를 극복하고자 합니다.

## 핵심 방법론
연구진은 **OmniSafeBench-MM** 이라는 종합적인 툴박스를 제안하며, 이는 **9가지 주요 위험 도메인** 과 **50가지 세분화된 카테고리** 를 포함하는 멀티모달 데이터셋을 통합합니다. 이 툴박스에는 **13가지 대표적인 공격 방법** 과 **15가지 방어 전략** 이 구현되어 있으며, **자동화된 데이터 생성 파이프라인** 은 **PixArt-XL-2-1024-MS** 를 활용하여 위험 관련 이미지-텍스트 쌍을 생성합니다. 평가는 **유해성(harmfulness)** , **의도 정렬(intent alignment)** , **응답 상세도(response detail level)** 를 측정하는 **3차원 프로토콜** 을 따릅니다.

## 주요 결과
**10개의 오픈소스** 및 **8개의 클로즈드소스 MLLM** 에 대한 광범위한 실험을 통해 멀티모달 탈옥에 대한 MLLM의 취약성이 드러났습니다. 특히 **MML** 과 **CS-DJ** 공격은 **Gemini-2.5** 에서 각각 **50.7%** 와 **32.0%** 의 높은 공격 성공률(ASR)을 기록하며 효과적인 우회 능력을 보였습니다. **Uniguard** 및 **JailGuard** 방어는 **CS-DJ** 공격에 대해 ASR을 **3.53%** 및 **3.13%** 로 크게 낮추었으며, **CoCa defense** 는 대부분의 공격에서 ASR을 대폭 감소시켰습니다.

## AI 실무자를 위한 시사점
**OmniSafeBench-MM** 은 MLLM의 **안전성 및 유용성 트레이드오프** 를 분석하는 표준화된 플랫폼을 제공하여, AI 실무자들이 모델의 취약성을 이해하고 방어 전략을 평가하는 데 도움을 줍니다. 다양한 공격 및 방어 기법에 대한 통합적인 평가는 특정 위협에 대한 방어가 다른 취약점을 야기할 수 있음을 보여주므로, **다각적인 보안 접근 방식** 의 중요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.