---
title: "[논문리뷰] Leuvenshtein: Efficient FHE-based Edit Distance Computation with Single
  Bootstrap per Cell"
excerpt: "Ingrid Verbauwhede이 arXiv에 게시한 'Leuvenshtein: Efficient FHE-based Edit Distance Computation with Single
  Bootstrap per Cell' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Fully Homomorphic Encryption (FHE)
  - TFHE
  - Levenshtein Distance
  - Programmable Bootstrapping (PBS)
  - Privacy-Preserving Computation
  - String Similarity

permalink: /ai/review/2025-8-21-Leuvenshtein-Efficient-FHE-based-Edit-Distance-Computation-with-Single-Bootstrap-per-Cell/

toc: true
toc_sticky: true

date: 2025-08-21 13:15:28+0900
last_modified_at: 2025-08-21 13:15:28+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.14568)

**저자:** Wouter Legiest, Jan-Pieter D'Anvers, Bojan Spasic, Nam-Luc Tran, Ingrid Verbauwhede



## 핵심 연구 목표
본 논문은 완전 동형 암호(FHE) 프레임워크, 특히 **TFHE** 와 같은 3세대 스킴에서 **Levenshtein(편집) 거리 계산의 높은 연산 비용** 을 획기적으로 줄이는 것을 목표로 합니다. 금융 및 유전체학과 같이 민감한 데이터의 프라이버시를 보존하면서 문자열 유사도 계산을 효율적으로 수행하는 것이 주된 연구 목적입니다.

## 핵심 방법론
편집 거리 계산 셀당 필요한 **프로그래밍 가능 부트스트랩(PBS)** 수를 **단 1개** 로 줄이는 최적화된 알고리즘인 **Leuvenshtein** 을 제안합니다. 이는 중간 결과 간의 차이를 나타내는 **차등 값(differential values)** 을 사용하고, 두 출력(수평 및 수직 차등 값)을 **하나의 비선형 연산** 으로 처리하여 PBS를 재활용합니다. 또한, **18개 값** 의 3-입력 최소 함수를 **1개의 PBS 룩업** 으로 처리하기 위해 **룩업 테이블(LUT)의 고밀도 패킹** 을 적용하며, ASCII 문자 비교는 **2회의 PBS** 로 효율화합니다.

## 주요 결과
제안된 Leuvenshtein 알고리즘은 기존 **TFHE 구현 대비 최대 278배, 최적화된 Wagner-Fisher 알고리즘 대비 최대 39배 빠른 성능** 을 달성했습니다. 기존 Wagner-Fisher 알고리즘이 셀당 약 94회의 PBS를 요구하는 반면, Leuvenshtein은 **단 1회** 만을 필요로 합니다. 더불어, 한쪽 입력 문자열이 암호화되지 않은 경우 **전처리(preprocessing)** 를 통해 추가 **3배의 속도 향상** 이 가능함을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 **FHE의 실용성** 을 크게 높여 AI/ML 분야에서 **프라이버시 보존 컴퓨팅** 의 적용 범위를 확장합니다. 특히 **금융 거래의 이상 감지** 나 **유전체 데이터 분석** 등 민감한 정보를 다루는 AI 애플리케이션 개발 시 **데이터 프라이버시와 효율성** 을 동시에 확보할 수 있는 강력한 솔루션을 제공합니다. **PBS 최적화 및 LUT 패킹** 과 같은 기법은 다른 FHE 기반 비선형 연산의 성능 향상에도 중요한 통찰을 줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.