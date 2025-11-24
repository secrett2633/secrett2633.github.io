---
title: "[논문리뷰] Dr.V: A Hierarchical Perception-Temporal-Cognition Framework to Diagnose
  Video Hallucination by Fine-grained Spatial-Temporal Grounding"
excerpt: "Li Zheng이 [arXiv]에 게시한 'Dr.V: A Hierarchical Perception-Temporal-Cognition Framework to Diagnose
  Video Hallucination by Fine-grained Spatial-Temporal Grounding' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Hallucination
  - Large Video Models (LVMs)
  - Hierarchical Reasoning
  - Spatial-Temporal Grounding
  - Diagnostic Framework
  - Benchmark Dataset
  - Multimodal AI

permalink: /ai/review/2025-9-16-Dr-V-A-Hierarchical-Perception-Temporal-Cognition-Framework-to-Diagnose-Video-Hallucination-by-Fine-grained-Spatial-Temporal-Grounding/

toc: true
toc_sticky: true

date: 2025-09-16 13:16:41+0900
last_modified_at: 2025-09-16 13:16:41+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.11866)

**저자:** Li Zheng, Tianjie Ju, Liqiang Jing, Shengqiong Wu, Meng Luo 외



## 핵심 연구 목표
본 논문은 대규모 비디오 모델(LVM)이 입력 비디오와 불일치하는 내용을 생성하는 "환각(hallucination)" 문제를 해결하는 것을 목표로 합니다. 기존 환각 평가 벤치마크의 단편적인 분류 체계와 세분화된 어노테이션 부족이라는 한계를 극복하여, 비디오 환각을 진단하기 위한 포괄적이고 계층적인 프레임워크를 제안합니다.

## 핵심 방법론
제안하는 **Dr.V** 프레임워크는 두 가지 핵심 요소로 구성됩니다. 첫째, **Dr.V-Bench**는 **4,974개 비디오**에서 추출한 **10,000개 인스턴스**를 포함하는 새로운 벤치마크 데이터셋으로, **미세한 시공간 어노테이션**과 지각, 시간, 인지 수준의 **14가지 환각 유형**을 포함하는 계층적 분류 체계를 제공합니다. 둘째, **Dr.V-Agent**는 인간의 비디오 이해 방식을 모방한 **계층적 추론 메커니즘**("From-Perception-to-Temporal-to-Cognition")을 사용하여 환각을 진단합니다. 이는 **Grounded SAM 2, YOLO-World, CG-STVG** 등 **최첨단 외부 도구**를 동적으로 활용하여 시공간 증거를 검증하고, LVM의 응답을 개선하기 위한 구조화된 피드백을 제공합니다.

## 주요 결과
**Dr.V-Bench**는 모든 테스트된 LVM이 상당한 환각을 보이는 매우 도전적인 벤치마크임을 입증했습니다. 모델들은 지각 작업에서 가장 우수한 성능을 보인 반면, 시간 및 인지 작업에서는 정확도가 현저히 감소했습니다. 예를 들어, 최상위 오픈소스 모델인 **Qwen2-VL**의 정확도는 지각 작업에서 **78.75%**에서 시간 작업에서 **65.61%**로 하락했습니다. **Dr.V-Agent**는 **Self-PEP** 전략 대비 모든 대표 모델과 환각 유형에서 일관되게 우수한 성능을 보여주었으며, 특히 **VideoChat2**의 경우 **18.60%**의 큰 성능 향상을 기록했습니다.

## AI 실무자를 위한 시사점
본 연구는 LVM의 환각 문제를 해결하기 위해 **미세한 시공간 그라운딩**과 **계층적 추론**의 중요성을 강조합니다. **Dr.V-Agent**의 모듈식, 학습 없는 접근 방식은 외부 최첨단 도구를 활용하여 LVM의 신뢰성을 높이는 실용적인 청사진을 제공합니다. 또한, **Dr.V-Bench** 데이터셋은 복잡한 비디오 이해 작업에서 LVM의 취약점을 평가하고 진단하는 포괄적인 도구로서, 향후 LVM 연구 및 개발 방향에 중요한 기여를 할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.