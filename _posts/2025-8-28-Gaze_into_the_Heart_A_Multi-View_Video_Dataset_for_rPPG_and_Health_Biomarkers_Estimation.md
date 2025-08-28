---
title: "[논문리뷰] Gaze into the Heart: A Multi-View Video Dataset for rPPG and Health
  Biomarkers Estimation"
excerpt: "Anton Ivaschenko이 [arXiv]에 게시한 'Gaze into the Heart: A Multi-View Video Dataset for rPPG and Health
  Biomarkers Estimation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - rPPG
  - Multi-View Video Dataset
  - Health Biomarkers
  - Physiological Monitoring
  - Deep Learning
  - Telemedicine
  - Biosignals

permalink: /ai/review/2025-8-28-Gaze_into_the_Heart_A_Multi-View_Video_Dataset_for_rPPG_and_Health_Biomarkers_Estimation/

toc: true
toc_sticky: true

date: 2025-08-28 13:10:39+0900
last_modified_at: 2025-08-28 13:10:39+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.17924)

**저자:** Konstantin Egorov, Stepan Botman, Pavel Blinov, Galina Zubkova, Anton Ivaschenko, Andrey Savchenko, Alexander Kolsanov



## 핵심 연구 목표
기존 **rPPG(remote PhotoPlethysmoGraphy) 데이터셋의 한계**(작은 규모, 사생활 침해 우려, 조건 다양성 부족, 접근 제한)를 극복하고, **원격 건강 모니터링** 및 **AI 의료 보조 시스템 개발**을 가속화하기 위한 포괄적인 대규모 다중 뷰 비디오 데이터셋과 베이스라인 모델을 구축하는 것을 목표로 합니다.

## 핵심 방법론
**600명의 피험자**를 대상으로 휴식 및 운동 후 상태에서 **다양한 소비자 등급 카메라** (모바일 폰, 비디오 카메라, 웹캠)를 사용하여 **3분 분량의 다중 뷰 비디오**를 촬영했습니다. 이와 동시에 **100Hz PPG 신호**와 **13가지 확장된 건강 지표** (ECG, 혈압, 체온, 산소 포화도, 호흡수, 스트레스 수준 등)를 동기화하여 수집했습니다. 데이터셋에는 **EasyOCR**을 활용한 **디지털 시계**를 통해 비디오 간 시간 동기화를, **POS 알고리즘**을 통해 비디오와 PPG 신호 간의 시간 동기화를 수행했습니다. 베이스라인 모델은 얼굴 **ROI 기반 도메인 특화 전처리**와 **완전 컨볼루션 1D 특징 피라미드 네트워크**를 활용하는 **효율적인 멀티태스크 신경망**으로, PPG 신호와 건강 지표를 동시에 추정합니다.

## 주요 결과
**MCD-rPPG 데이터셋**은 600명의 피험자로부터 3600개의 동기화된 비디오 녹화와 광범위한 건강 메트릭스를 포함하며 공개적으로 릴리스되었습니다. 제안된 베이스라인 모델은 자체 데이터셋에서 PPG MAE **0.68±0.03**, HR MAE **4.86±0.36**를 달성했으며, 이는 최신 모델들과 경쟁력 있는 성능입니다. 특히, 모델은 CPU에서 기존 최고 모델보다 **13% 더 빠른 추론 속도**를 보였으며, 여러 생체 지표(예: 수축기 혈압 MAE **12.82**, 연령 MAE **3.91**) 추정에서 나이브 베이스라인을 능가하는 성능을 입증했습니다.

## AI 실무자를 위한 시사점
**Huggingface**를 통해 공개된 **MCD-rPPG 데이터셋**은 rPPG 및 건강 지표 추정 모델 개발을 위한 귀중한 리소스를 제공하여 데이터 부족 문제를 해결합니다. 제안된 **빠르고 경량의 멀티태스크 신경망**은 **모바일 장치나 웨어러블** 같은 엣지 디바이스에 배포하기 적합하여 실시간 건강 모니터링 애플리케이션 개발 가능성을 높입니다. 이 연구는 **다중 뷰 분석**, **생리적 상태 변화(휴식 vs. 운동 후)**, 그리고 카메라 파라미터가 rPPG 정확도에 미치는 영향 등 새로운 연구 방향을 제시하여 **원격 의료, 스트레스 모니터링, 피트니스 트래킹**을 위한 AI 기반 시스템 개발에 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.