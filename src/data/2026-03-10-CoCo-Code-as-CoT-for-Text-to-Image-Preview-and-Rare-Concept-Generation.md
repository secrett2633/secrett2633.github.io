---
title: "[논문리뷰] CoCo: Code as CoT for Text-to-Image Preview and Rare Concept Generation"
excerpt: "Huanyu Zhang이 arXiv에 게시한 'CoCo: Code as CoT for Text-to-Image Preview and Rare Concept Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Text-to-Image Generation
  - Chain-of-Thought
  - Code Generation
  - Multimodal Large Language Models
  - Structured Image Synthesis
  - Draft-Guided Refinement
  - Visual Reasoning

permalink: /ai/review/2026-03-10-CoCo-Code-as-CoT-for-Text-to-Image-Preview-and-Rare-Concept-Generation/

toc: true
toc_sticky: true

date: 2026-03-10 00:00:00+0900+0900
last_modified_at: 2026-03-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.08652)

**저자:** Haodong Li, Chunmei Qing, Huanyu Zhang, Dongzhi Jiang, Yihang Zou, Hongbo Peng, Dingming Li, Yuhong Dai, ZePeng Lin, Juanxi Tian, Yi Zhou, Siqi Dai, Jingwei Wu



## 핵심 연구 목표
본 논문은 기존의 CoT(Chain-of-Thought) 기반 텍스트-투-이미지(T2I) 생성 방식이 복잡한 공간 레이아웃, 구조화된 시각 요소, 조밀한 텍스트 콘텐츠에 필요한 정밀도가 부족하다는 문제를 해결하고자 합니다. 이를 위해 **실행 가능한 코드(executable code)** 를 CoT의 한 형태로 사용하여 이미지 생성의 중간 계획을 명시적이고 검증 가능하게 만드는 프레임워크인 **CoCo(Code-as-CoT)** 를 제안합니다.

## 핵심 방법론
**CoCo** 는 텍스트 프롬프트로부터 시작하여 세 가지 주요 단계로 작동합니다. 첫째, **Unified Multimodal Large Language Model (UMLLM)** 인 **Bagel** 을 기반으로, 장면의 구조적 레이아웃을 명시하는 **실행 가능한 코드** 를 생성합니다. 둘째, 이 코드를 **샌드박스 환경** 에서 실행하여 **결정론적인 드래프트 이미지(deterministic draft image)** 를 렌더링합니다. 셋째, 모델은 이 드래프트를 기반으로 **세밀한 이미지 편집** 을 수행하여 최종 고품질 이미지를 생성합니다. 이 과정 학습을 위해 구조화된 드래프트-최종 이미지 쌍을 포함하는 **CoCo-10K 데이터셋** 을 구축했습니다.

## 주요 결과
**CoCo** 는 직접 생성 방식 대비 **StructT2IBench** 에서 **+68.83%** , **OneIG-Bench** 에서 **+54.8%** , **LongText-Bench** 에서 **+41.23%** 의 성능 향상을 달성했습니다. 특히 **StructT2IBench** 에서 **73.52%** 의 종합 정확도를 기록하며 **GPT-Image (49.58%)** 를 크게 능가했으며, 미세 조정을 통해 생성된 코드의 **100% 컴파일 성공률** 을 달성하여 코드 실행 가능성을 입증했습니다.

## AI 실무자를 위한 시사점
**실행 가능한 코드** 를 통한 **Code-as-CoT** 접근 방식은 복잡한 구조와 텍스트가 많은 이미지 생성 작업에서 **정밀하고 제어 가능한 T2I** 를 위한 효과적이고 신뢰할 수 있는 추론 패러다임을 제공합니다. 이는 특히 **과학 다이어그램, 차트, 포스터** 와 같이 정확한 레이아웃과 텍스트 렌더링이 필수적인 도메인에서 모델의 실용성을 크게 향상시킬 수 있습니다. **CoCo-10K** 와 같은 구조화된 데이터셋 구축의 중요성을 강조하며, 모델이 단순히 시각적 패턴을 암기하는 것이 아니라 근본적인 추론 능력을 학습하게 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.