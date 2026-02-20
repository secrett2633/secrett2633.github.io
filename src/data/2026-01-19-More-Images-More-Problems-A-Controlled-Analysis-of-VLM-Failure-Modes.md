---
title: "[논문리뷰] More Images, More Problems? A Controlled Analysis of VLM Failure Modes"
excerpt: "arXiv에 게시된 'More Images, More Problems? A Controlled Analysis of VLM Failure Modes' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision Language Models
  - Multi-Image Understanding
  - Failure Analysis
  - Evaluation Benchmark
  - Attention Mechanism
  - Fine-tuning
  - MIMIC

permalink: /ai/review/2026-01-19-More-Images-More-Problems-A-Controlled-Analysis-of-VLM-Failure-Modes/

toc: true
toc_sticky: true

date: 2026-01-19 00:00:00+0900+0900
last_modified_at: 2026-01-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.07812)

**저자:** Anurag Das, Adrian Bulat, Alberto Baldrati, Ioannis Maniadis Metaxas, Bernt Schiele, Georgios Tzimiropoulos, Brais Martinez



## 핵심 연구 목표
본 논문은 최신 **대규모 시각 언어 모델(LVLM)** 이 다중 이미지 환경에서 보여주는 한계와 실패 원인을 체계적으로 분석하는 것을 목표로 합니다. 특히 모델이 이미지 간 정보를 효과적으로 집계하고, 여러 개념을 동시에 추적하며, 시각적 방해 요소에 대해 얼마나 강건한지를 평가하여 근본적인 약점을 식별하고자 합니다.

## 핵심 방법론
연구팀은 다중 이미지 LVLM의 성능을 엄격하게 평가하기 위해 새로운 벤치마크인 **MIMIC (Multi-Image Model Insights and Challenges)** 을 도입했습니다. **MS-COCO** 데이터셋을 기반으로 정보 분산, 방해 요소 존재 여부, 객체 인스턴스 분포 등을 세밀하게 제어할 수 있는 다중 이미지 시퀀스를 생성했습니다. 문제 해결을 위해 **데이터 중심의 미세 조정(OpenImages)** 과 **최적화 중심의 어텐션 마스킹** 이라는 두 가지 보완적인 전략을 제안했으며, 특히 깊은 레이어에서는 **시각 토큰이 동일 이미지 내의 토큰에만 집중** 하도록 제한했습니다.

## 주요 결과
**MIMIC** 벤치마크를 통해 LVLM이 다중 이미지 정보 집계와 다중 개념 추적에 어려움을 겪고 방해 요소에 민감하다는 점이 밝혀졌습니다. 성능 저하는 주로 **증가된 시퀀스 길이** 때문이지 이미지 개수 자체 때문이 아님을 확인했습니다. 제안된 어텐션 마스킹 전략은 **LLaVA-OV 7B** 모델의 **MuirBench** 전체 점수를 **41.7%에서 51.3%** 로, **MIMIC** 벤치마크에서는 **LLaVA-OV 0.5B** 의 평균 점수를 **26.4에서 49.4** 로 크게 향상시켰습니다. 또한, **어텐션 마스킹** 은 계산 비용(FLOPs)을 약 **81%** 절감하면서도 성능을 개선했습니다.

## AI 실무자를 위한 시사점
본 연구는 다중 이미지 시나리오에서 **LVLM의 근본적인 한계** 를 명확히 제시하여, 실제 환경에서의 신뢰성을 높이기 위한 중요한 통찰력을 제공합니다. 제안된 **데이터 생성 전략** 과 **어텐션 마스킹 기법** 은 기존 모델 아키텍처를 크게 변경하지 않으면서도 다중 이미지 이해 능력을 향상시킬 수 있는 실용적인 방법론입니다. 특히 **어텐션 마스킹** 을 통한 계산 효율성 증가는 자원 제약이 있는 환경에서 LVLM을 배포하고 활용하는 데 큰 도움이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.