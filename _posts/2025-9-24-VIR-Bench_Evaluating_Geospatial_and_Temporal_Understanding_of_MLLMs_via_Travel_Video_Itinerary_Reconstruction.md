---
title: "[논문리뷰] VIR-Bench: Evaluating Geospatial and Temporal Understanding of MLLMs via
  Travel Video Itinerary Reconstruction"
excerpt: "So Fukuda이 [arXiv]에 게시한 'VIR-Bench: Evaluating Geospatial and Temporal Understanding of MLLMs via
  Travel Video Itinerary Reconstruction' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLMs
  - Video Understanding
  - Geospatial Reasoning
  - Temporal Reasoning
  - Travel Itinerary Reconstruction
  - Benchmark
  - Agent System
  - VLOG

permalink: /ai/review/2025-9-24-VIR-Bench_Evaluating_Geospatial_and_Temporal_Understanding_of_MLLMs_via_Travel_Video_Itinerary_Reconstruction/

toc: true
toc_sticky: true

date: 2025-09-24 13:14:19+0900
last_modified_at: 2025-09-24 13:14:19+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.19002)

**저자:** Hao Wang, Eiki Murata, Lingfang Zhang, Ayako Sato, So Fukuda, Ziqi Yin, Wentao Hu, Keisuke Nakao, Yusuke Nakamura, Sebastian Zwirner, Yi-Chia Chen, Hiroyuki Otomo, Hiroki Ouchi, Daisuke Kawahara



## 핵심 연구 목표
본 연구는 기존 비디오 벤치마크들이 장거리 이동 및 다일(multi-day) 활동과 같은 **거시적 규모의 지리 공간-시간적 시나리오**를 충분히 다루지 못한다는 한계를 지적하며, MLLM(Multimodal Large Language Models)의 **확장된 지리 공간 및 시간적 이해 능력**을 평가하는 새로운 벤치마크 `VIR-Bench`를 제시합니다. 궁극적으로 MLLM이 실제 환경에서의 계획 및 내비게이션과 같은 작업에 필요한 능력을 갖추도록 촉진하는 것을 목표로 합니다.

## 핵심 방법론
`VIR-Bench`는 200개의 여행 비디오를 기반으로 **방문 순서 그래프(visiting order graph)**를 재구성하는 과제를 정의합니다. 이 그래프는 **노드 예측** (방문한 장소 식별: 행정 구역, 도시, POI 및 카테고리) 및 **엣지 예측** (공간적 포함 관계 및 시간적 전환 관계 추론)의 두 가지 하위 작업으로 분해됩니다. 또한, **Gemini-2.5-Pro**를 백본으로 하는 프로토타입 **여행 계획 에이전트**를 개발하여, POI 목록과 비디오를 모두 활용한 여행 계획 생성 능력을 평가했습니다.

## 주요 결과
실험 결과, 최신 MLLM들은 `VIR-Bench`에서 **높은 점수를 달성하는 데 어려움**을 겪으며, 특히 **POI 노드 예측** 및 **전환 엣지 예측**에서 약점을 드러냈습니다. **오픈소스 모델**은 **소유 모델**에 비해 성능이 현저히 낮았고, 일부 오픈소스 모델의 **전환 엣지 예측 F1 점수**는 **약 1점**에 불과했습니다. 반면, **Gemini-2.5-Pro**와 같은 소유 모델은 **POI 노드 및 전환 엣지 예측 F1 점수**가 **약 60점대**를 기록했습니다. 추가적으로, **더 많은 프레임**, **더 많은 추론 노력**, **오디오 입력**이 일관된 성능 향상을 가져왔으며, 특히 **오디오 입력**은 **전환 엣지 예측 성능을 거의 50% 향상**시켰습니다.

## AI 실무자를 위한 시사점
본 연구는 MLLM이 **장거리 지리 공간 및 시간적 추론 능력**을 개선해야 할 필요성을 명확히 보여줍니다. `VIR-Bench`는 이러한 능력을 평가하기 위한 **도전적인 벤치마크**를 제공하여, AI 엔지니어들이 **고차원적인 비디오 이해 모델**을 개발하는 데 중요한 기반이 될 것입니다. 특히, **여행 계획 에이전트** 사례 연구는 **정확한 여정 재구성**과 **비디오의 풍부한 시각적/청각적 문맥**을 결합하는 것이 **사용자 친화적인 애플리케이션** 개발에 필수적임을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.