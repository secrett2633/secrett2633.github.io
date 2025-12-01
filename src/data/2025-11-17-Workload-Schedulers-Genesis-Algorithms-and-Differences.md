---
title: "[논문리뷰] Workload Schedulers -- Genesis, Algorithms and Differences"
excerpt: "Vladimir Getov이 [arXiv]에 게시한 'Workload Schedulers -- Genesis, Algorithms and Differences' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Workload Scheduling
  - Process Scheduling
  - Job Scheduling
  - Big Data Processing
  - Resource Management
  - Distributed Systems
  - Scheduling Algorithms
  - Performance Optimization

permalink: /ai/review/2025-11-17-Workload-Schedulers-Genesis-Algorithms-and-Differences/

toc: true
toc_sticky: true

date: 2025-11-17 00:00:00+0900+0900
last_modified_at: 2025-11-17 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.10258)

**저자:** Leszek Sliwko, Vladimir Getov



## 핵심 연구 목표
본 논문은 현대의 워크로드 스케줄러를 **운영체제 프로세스 스케줄러** , **클러스터 시스템 잡 스케줄러** , **빅 데이터 스케줄러** 의 세 가지 범주로 분류하고, 각 클래스의 진화 과정, 사용되는 알고리즘, 주요 특징 및 차이점을 분석하는 것을 목표로 합니다. 이를 통해 스케줄링 전략 설계의 공통적인 초점과 발전 방향을 조명하고자 합니다.

## 핵심 방법론
저자들은 각 스케줄러 클래스에 속하는 다양한 대표적인 스케줄러들을 폭넓게 조사했습니다. 각 시스템의 역사적 배경, 핵심 **알고리즘** ( **FCFS** , **MLFQ** , **CFS** , **SJF** , **Bin Packing** , **Tabu Search** 등), **기능** (예: **내결함성** , **데이터 지역성 최적화** , **페어 셰어링** , **선점** , **백필링** , **갱 스케줄링** ) 및 **설계 고려사항** (응답성, 처리량, 확장성, 전력 소비)을 상세히 설명했습니다.

## 주요 결과
논문은 스케줄러들이 각각의 고유한 목표에 맞춰 진화했음을 보여줍니다. **운영체제 프로세스 스케줄러** 는 **CFS** 와 같이 응답성과 낮은 오버헤드에 중점을 두며, **클러스터 시스템 잡 스케줄러** 는 **SLURM** 과 **Moab** 처럼 수백만 개의 작업을 처리하는 확장성과 높은 처리량을 우선시합니다. **빅 데이터 스케줄러** 는 **Hadoop** 의 **백업 태스크** 를 통해 작업 응답 시간을 **44%** 향상시키고, **Spark** 가 처리량을 최대 **2배** 까지 늘리는 등 데이터 지역성과 내결함성에 특화되어 있습니다. 특히, 현대 OS 스케줄러가 분산 시스템의 **지역성 최적화** 개념을 도입하는 등 설계 원칙의 수렴이 관찰되었습니다.

## AI 실무자를 위한 시사점
AI/ML 실무자는 작업의 특성(예: 단기 **CPU 바운드** vs. 장기 **데이터 바운드** )을 고려하여 최적의 스케줄러를 선택해야 합니다. **분산 학습** 이나 **대규모 데이터 처리** 시에는 **데이터 지역성(data locality)** 을 적극 활용하는 **빅 데이터 스케줄러(Hadoop, Spark)** 를 통해 **I/O 병목 현상** 을 최소화하고 성능을 극대화할 수 있습니다. 또한, **클러스터 환경** 에서 **페어 셰어링(fair-sharing)** 및 **선점(pre-emption)** 정책을 통해 자원을 효율적으로 배분하고 사용자들의 **자원 과대평가(최대 98% 낭비)** 문제를 관리하는 전략적 접근이 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.