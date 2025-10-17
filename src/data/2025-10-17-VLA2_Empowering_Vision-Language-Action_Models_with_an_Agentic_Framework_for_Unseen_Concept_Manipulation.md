---
title: "[논문리뷰] VLA^2: Empowering Vision-Language-Action Models with an Agentic
  Framework for Unseen Concept Manipulation"
excerpt: "이 [arXiv]에 게시한 'VLA^2: Empowering Vision-Language-Action Models with an Agentic
  Framework for Unseen Concept Manipulation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action Models
  - Agentic Framework
  - Unseen Concept Manipulation
  - Out-of-Distribution Generalization
  - Tool Use
  - Web Retrieval
  - Object Detection
  - LIBERO Simulation

permalink: /ai/review/2025-10-17-VLA2_Empowering_Vision-Language-Action_Models_with_an_Agentic_Framework_for_Unseen_Concept_Manipulation/

toc: true
toc_sticky: true

date: 2025-10-17 13:09:57+0900
last_modified_at: 2025-10-17 13:09:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.14902)

**저자:** Han Zhao, Jiaxuan Zhang, Wenxuan Song, Pengxiang Ding, Donglin Wang



## 핵심 연구 목표
본 논문은 기존 VLA 모델이 훈련 데이터 외부의 **미확인 객체 개념(unseen concepts)**에 직면했을 때 급격히 성능이 저하되는 문제, 즉 OOD(Out-of-Distribution) 일반화 실패를 해결하는 것을 목표로 합니다. 외부 도구와 모듈을 효과적으로 활용하는 에이전트 프레임워크를 통해 VLA 시스템의 **미확인 객체 조작 능력**을 향상시키고자 합니다.

## 핵심 방법론
제안된 **VLA2** 프레임워크는 **OpenVLA**를 실행 백본으로 활용하며, **작업 계획(GLM-4.1V-9B-Thinking)**, **웹 검색(bbid를 통한 이미지 검색 및 Wikipedia/웹 스니펫 텍스트 검색)**, **객체 감지(MM-GroundingDINO)**, **분할(SAM2.1-L)**, 그리고 **검증(Qwen2.5-VL-3B-Instruct)**과 같은 다양한 외부 모듈을 통합합니다. 이 프레임워크는 웹 및 메모리 검색을 통해 미확인 개념을 VLA가 이해할 수 있는 정보로 변환하고, VLA의 입력 조건으로 **마스크 이미지**를 사용하여 객체 조작의 일반화 능력을 향상시킵니다.

## 주요 결과
맞춤형 **Hard-level 벤치마크**에서 VLA2는 **76.2%의 성공률**을 달성하여 기존 최첨단 모델들(예: **OpenVLA 32.0%**, **πo 60.0%**, **Agentic Robot 26.2%**)을 크게 능가했습니다. 이는 독립형 OpenVLA 기준선 대비 **44.2%의 성공률 향상**을 의미하며, 모든 맞춤형 OOD 환경에서 평균 **20.2%의 성능 향상**을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 에이전트 프레임워크가 VLA 모델의 OOD 일반화 능력을 획기적으로 향상시킬 수 있음을 입증하며, 실제 환경에서 발생하는 **미확인 객체 문제**에 대한 강력한 해결책을 제시합니다. 핵심 VLA 모델의 광범위한 재훈련 없이도 **특정 도구(웹 검색, 객체 감지, LLM 기반 계획 및 검증)**를 통합함으로써 복잡한 조작 작업에서 강력한 성능을 얻을 수 있음을 시사합니다. 이는 새로운 개념에 대한 확장 가능한 처리 방안을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.