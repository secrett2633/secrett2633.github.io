---
title: "[논문리뷰] Ex-Omni: Enabling 3D Facial Animation Generation for Omni-modal Large Language Models"
excerpt: "Tianshu Yu이 arXiv에 게시한 'Ex-Omni: Enabling 3D Facial Animation Generation for Omni-modal Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Omni-modal LLMs
  - 3D Facial Animation
  - Speech-to-Face Generation
  - Token-as-Query Gated Fusion (TQGF)
  - Discrete Speech Units
  - ARKit-52 Blendshapes
  - InstructEx Dataset
  - Multimodal Generation

permalink: /ai/review/2026-02-12-Ex-Omni-Enabling-3D-Facial-Animation-Generation-for-Omni-modal-Large-Language-Models/

toc: true
toc_sticky: true

date: 2026-02-12 00:00:00+0900+0900
last_modified_at: 2026-02-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.07106)

**저자:** Tianshu Yu, Yiwen Guo, Zhipeng Li, Haoyu Zhang



## 핵심 연구 목표
본 논문은 옴니모달 대규모 언어 모델(OLLMs)에 3D 얼굴 애니메이션 생성 기능을 통합하여 텍스트 및 음성 입력에 대한 자연스럽고 표현적인 멀티모달 출력을 가능하게 하는 것을 목표로 합니다. LLM의 이산적인 토큰 기반 추론과 3D 얼굴 애니메이션에 필요한 미세한 시간적 동역학 사이의 표현 불일치를 해결하는 것이 주된 과제입니다.

## 핵심 방법론
**Ex-Omni** 는 LLM의 의미론적 추론과 모달리티별 시간적 합성을 분리하여 학습 난이도를 줄입니다. 이를 위해 **이산 음성 단위(discrete speech units)** 를 시간적 스캐폴딩으로 활용하고, **토큰-쿼리 게이트 융합(Token-as-Query Gated Fusion, TQGF)** 메커니즘을 도입하여 LLM의 의미 정보를 선택적으로 주입합니다. 얼굴 움직임은 **ARKit-52 블렌드쉐이프 계수** 로 표현되며, **InstructEx** 라는 다단계 훈련 데이터셋을 구축하여 언어 이해, 음성 생성 및 3D 얼굴 생성의 통합 학습을 지원합니다.

## 주요 결과
**Ex-Omni** 는 음성-얼굴(S2F) 및 텍스트-얼굴(T2F) 생성에서 기존 캐스케이드 방식의 오픈소스 OLLM 기반 모델 대비 경쟁력 있는 성능을 달성했습니다. 특히, S2F **CommonEval** 에서 **LVE 4.754** 를 기록하여 캐스케이드 모델 대비 더 낮은 오류율을 보였습니다(예: **Qwen2.5-Omni+EmoTalk 8.020** ). 인간 A/B 선호도 연구에서는 **55%-80%** 의 샘플에서 **Ex-Omni** 가 선호되었으며, 높은 평가자 일치율( **70.0%-73.8%** )을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 OLLM이 단순한 텍스트/음성 출력을 넘어 **표현적인 비언어적 멀티모달리티** 를 생성하는 데 기여할 수 있음을 입증했습니다. **TQGF** 와 같은 메커니즘은 다양한 모달리티 간의 복잡한 통합 문제를 해결하는 데 중요한 통찰력을 제공합니다. 실무자들은 **Ex-Omni** 를 통해 디지털 아바타, 가상 캐릭터, 대화형 AI 시스템 등에서 더욱 자연스럽고 몰입감 있는 사용자 경험을 구현할 수 있는 가능성을 탐색할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.