---
title: "[논문리뷰] FRAPPE: Infusing World Modeling into Generalist Policies via Multiple Future Representation Alignment"
excerpt: "Shuai Chen이 [arXiv]에 게시한 'FRAPPE: Infusing World Modeling into Generalist Policies via Multiple Future Representation Alignment' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - World Modeling
  - Generalist Policies
  - Representation Alignment
  - Diffusion Models
  - Robotics
  - Fine-tuning
  - Egocentric Data
  - VLA

permalink: /ai/review/2026-02-20-FRAPPE-Infusing-World-Modeling-into-Generalist-Policies-via-Multiple-Future-Representation-Alignment/

toc: true
toc_sticky: true

date: 2026-02-20 00:00:00+0900+0900
last_modified_at: 2026-02-20 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.17259)

**저자:** Han Zhao, Jingbo Wang, Wenxuan Song, Shuai Chen, Yang Liu, Yan Wang, Haoang Li, Donglin Wang



## 핵심 연구 목표
본 논문은 Vision-Language-Action (VLA) 모델이 세계 모델링 능력을 향상시키는 데 직면한 두 가지 주요 문제(픽셀 단위 재구성에 대한 과도한 강조와 예측된 미래 관찰에 대한 의존으로 인한 오류 누적)를 해결하고자 합니다. 이를 통해 일반ist 로봇 정책의 추론 및 일반화 능력을 강화하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **Future Representation Alignment via Parallel Progressive Expansion (FRAPPE)** 이라는 새로운 훈련 패러다임을 제안합니다. 이는 **두 단계 미세 조정 전략** 을 사용하는데, 중간 훈련 단계에서는 모델이 미래 관찰의 **잠재 표현** 을 예측하도록 학습하고, 후속 훈련 단계에서는 **다양한 시각 기반 모델(CLIP, DINOv2, ViT)** 과 병렬로 표현을 정렬합니다. **Prefix 및 LoRA 튜닝** 을 통해 메모리 효율성을 높이고, **경량 라우터 네트워크** 와 **부하 분산 손실** 을 사용하여 여러 전문가의 출력을 통합합니다.

## 주요 결과
FRAPPE는 **RoboTwin 벤치마크** 에서 최첨단 방법을 능가하며, 평균 성공률 **57.5% (Easy)** 및 **25.5% (Hard)** 를 달성했습니다. 특히, 어려운 시나리오에서 다른 모델 대비 최대 **70.5%** 의 성능 향상을 보였습니다. 또한, 장기 및 미개척 시나리오에서 강력한 일반화 능력을 입증했으며, 바닐라 RDT가 실패한 까다로운 장기 태스크에서 **20%의 성공률** 을 기록했습니다. 추론 시 디노이징 단계를 **3단계** 로 줄였을 때 **0.173초** 의 지연 시간으로 더 높은 성능( **48.5% 성공률** )을 달성했습니다.

## AI 실무자를 위한 시사점
FRAPPE는 로봇 정책의 세계 모델링 능력을 확장하기 위한 **확장 가능하고 데이터 효율적인 경로** 를 제공합니다. **두 단계 미세 조정 전략과 다중 VFM 정렬** 방식은 계산 자원 소모를 줄이면서 일반화 능력을 향상시키는 데 효과적인 방법론입니다. **행동 주석이 없는 인간 시점(egocentric) 비디오 데이터** 를 활용하여 훈련 비용을 절감할 수 있어, 제한된 주석 데이터 환경에서 로봇 학습 모델을 개발하는 AI 실무자에게 실용적인 이점을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.