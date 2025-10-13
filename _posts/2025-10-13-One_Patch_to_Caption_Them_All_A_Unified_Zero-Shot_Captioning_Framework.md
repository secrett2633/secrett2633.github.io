---
title: "[논문리뷰] One Patch to Caption Them All: A Unified Zero-Shot Captioning Framework"
excerpt: "Giuseppe Amato이 [arXiv]에 게시한 'One Patch to Caption Them All: A Unified Zero-Shot Captioning Framework' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Zero-Shot Captioning
  - Region-Level Captioning
  - Vision Transformers
  - DINOv2
  - Patch-Centric
  - Modality Gap Mitigation
  - Visual-Language Models

permalink: /ai/review/2025-10-13-One_Patch_to_Caption_Them_All_A_Unified_Zero-Shot_Captioning_Framework/

toc: true
toc_sticky: true

date: 2025-10-13 13:44:18+0900
last_modified_at: 2025-10-13 13:44:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.02898)

**저자:** Lorenzo Bianchi, Giacomo Pacini, Fabio Carrara, Nicola Messina, Giuseppe Amato, Fabrizio Falchi



## 핵심 연구 목표
본 논문은 기존의 이미지 전체 기반(image-centric) 제로샷 캡셔닝 모델이 지역 단위 캡셔닝에서 낮은 성능을 보이는 문제를 해결하고자 합니다. 특히, 수동 라벨링 없이 임의의 이미지 영역에 대한 캡션을 생성할 수 있는 **패치 기반(patch-centric) 제로샷 캡셔닝 프레임워크**를 제안하여, 지역 단위 감독 없이도 다양한 공간 해상도에서 캡셔닝을 가능하게 하는 것을 목표로 합니다.

## 핵심 방법론
제안된 **Patch-ioner** 프레임워크는 이미지를 개별 **패치**로 분할하고, **DINOv2 기반 시각 인코더**(**Talk2DINO**)를 사용하여 언어 정렬된 밀집 패치 임베딩을 추출합니다. 이 패치 임베딩들은 임의의 영역 정의에 따라 **파라미터 프리 평균 집계**를 거쳐 영역 표현을 만듭니다. 최종적으로, 텍스트 전용 데이터로 훈련된 **제로샷 텍스트 디코더**와 **메모리 기반 잠재 투영** 방식을 통해 시각-텍스트 모달리티 간극을 완화하여 캡션을 생성합니다.

## 주요 결과
**Talk2DINO** 백본을 사용한 **Patch-ioner**는 트레이스, 밀집, 영역-세트 캡셔닝 등 여러 지역 기반 캡셔닝 태스크에서 **최첨단 성능**을 달성했습니다. 특히, 새로운 **트레이스 캡셔닝** 태스크에서 **CIDEr 27.9** 및 **RefPAC-S 78.7**을 기록했으며, 밀집 캡셔닝에서는 **CIDEr 31.9** 및 **mAP 0.21**을, 영역-세트 캡셔닝에서는 **CIDEr 109.1**을 달성하며 기존 모델들을 크게 능가했습니다. 이미지 캡셔닝에서도 **CIDEr 69.2**로 경쟁력 있는 성능을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 **지역 단위 캡셔닝**을 위한 새로운 **제로샷 접근 방식**을 제시하며, 특히 **DINOv2**와 같은 **밀집 시각 특징**을 생성하는 백본의 중요성을 강조합니다. 단일 백본 포워드 패스로 여러 영역에 대한 캡션을 생성할 수 있어 **실용적인 효율성**을 제공하며, **대규모 감독 데이터 없이** 다양한 지역 기반 AI 애플리케이션에 활용될 잠재력이 큽니다. 이는 **대화형 이미지 분석 시스템**이나 **정밀 객체 설명** 분야에 유용할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.