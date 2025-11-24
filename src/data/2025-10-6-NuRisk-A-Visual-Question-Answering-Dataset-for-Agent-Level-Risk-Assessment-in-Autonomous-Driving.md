---
title: "[논문리뷰] NuRisk: A Visual Question Answering Dataset for Agent-Level Risk
  Assessment in Autonomous Driving"
excerpt: "이 [arXiv]에 게시한 'NuRisk: A Visual Question Answering Dataset for Agent-Level Risk
  Assessment in Autonomous Driving' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Visual Question Answering (VQA)
  - Autonomous Driving
  - Risk Assessment
  - Spatio-Temporal Reasoning
  - Large Vision Models (VLMs)
  - Dataset
  - Bird-Eye-View (BEV)
  - Fine-tuning

permalink: /ai/review/2025-10-6-NuRisk-A-Visual-Question-Answering-Dataset-for-Agent-Level-Risk-Assessment-in-Autonomous-Driving/

toc: true
toc_sticky: true

date: 2025-10-06 13:29:11+0900
last_modified_at: 2025-10-06 13:29:11+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.25944)

**저자:** Yuan Gao, Mattia Piccinini, Roberto Brusnicki, Yuchen Zhang, Johannes Betz



## 핵심 연구 목표
본 논문은 자율주행 시나리오에서 기존 Vision Language Models (VLMs)이 정성적 판단에 그치고 **정량적 시공간 추론** 능력이 부족하다는 문제를 해결하고자 합니다. 궁극적으로 논문은 VLM이 **Time-to-Collision (TTC)** 및 **Distance to Collision (DTC)**과 같은 안전 지표를 활용하여 **에이전트 수준의 정량적 위험 평가**를 수행할 수 있도록 하는 것을 목표로 합니다.

## 핵심 방법론
연구진은 **nuScenes, Waymo** 및 **CommonRoad 시뮬레이터**에서 수집한 데이터를 통합하여 **2.9K 시나리오**와 **1.1M 에이전트 레벨 샘플**로 구성된 **NuRisk VQA 데이터셋**을 구축했습니다. 이 데이터셋은 **Bird-Eye-View (BEV) 기반 순차 이미지**와 **정량적 에이전트 위험 주석**을 포함합니다. 또한, **Qwen2.5-VL-7B-Instruct**를 기반으로 **LoRA(Low-Rank Adaptation)** 기법을 사용하여 **NuRisk VLM Agent**를 미세 조정함으로써 자율주행 위험 평가에 특화된 시공간 추론 능력을 강화했습니다.

## 주요 결과
사전 훈련된 VLM 벤치마킹 결과, 최고 성능의 **Gemini-2.5-Pro** 모델이 **33%**의 정확도를 보였으나 명시적인 시공간 추론에는 실패했습니다. 반면, 미세 조정된 **NuRisk VLM Agent**는 정확도를 **41%**로 향상시키고, 지연 시간을 **75%** 단축했으며, 종방향 공간 정확도 **34.1%**, 횡방향 공간 정확도 **26.0%**, 종방향 시간 정확도 **27.0%**, 횡방향 시간 정확도 **26.4%**를 달성하여 시공간 추론 능력을 성공적으로 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 자율주행에서 **정량적 시공간 위험 평가**의 필요성을 명확히 하며, 현재 VLM의 한계를 극복하기 위한 **도메인 특화 데이터셋 및 미세 조정**의 중요성을 강조합니다. **NuRisk 데이터셋**은 실제 및 시뮬레이션 데이터를 결합하여 안전-결정적 시나리오를 포괄하므로, 자율주행 시스템의 **강건한 위험 인식 모델** 개발에 핵심적인 리소스가 될 것입니다. 개발된 **NuRisk VLM Agent**는 **경량 VLM 모델**을 활용하여 실시간 배포 가능성을 높이며 실제 자율주행 애플리케이션에 기여할 잠재력을 보여주었습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.