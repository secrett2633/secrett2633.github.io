---
title: "[논문리뷰] OmniLayout: Enabling Coarse-to-Fine Learning with LLMs for Universal
  Document Layout Generation"
excerpt: "Bin Wang이 arXiv에 게시한 'OmniLayout: Enabling Coarse-to-Fine Learning with LLMs for Universal
  Document Layout Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Document Layout Generation
  - Large Language Models (LLMs)
  - Coarse-to-Fine Learning
  - Dataset Curation
  - OmniLayout-1M
  - Document AI
  - Generative Models

permalink: /ai/review/2025-10-31-OmniLayout-Enabling-Coarse-to-Fine-Learning-with-LLMs-for-Universal-Document-Layout-Generation/

toc: true
toc_sticky: true

date: 2025-10-31 18:37:31+0900
last_modified_at: 2025-10-31 18:37:31+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.26213)

**저자:** Hengrui Kang, Zhuangcheng Gu, Zhiyuan Zhao, Zichen Wen, Bin Wang, Weijia Li, Conghui He



## 핵심 연구 목표
본 연구는 다양한 문서 레이아웃 데이터의 부족과 복잡한, 긴 시퀀스 시나리오에서 기존 문서 레이아웃 생성 방법론의 한계를 극복하는 것을 목표로 합니다. 특히, 맨해튼 스타일의 학술 문서가 아닌 뉴스페이퍼, 잡지 등 개방형 장르의 레이아웃 생성 능력을 향상시키기 위해, **LLM 기반의 범용 문서 레이아웃 생성 모델** 과 이를 지원하는 **대규모의 다양한 데이터셋** 을 구축하는 데 중점을 둡니다.

## 핵심 방법론
연구팀은 최초의 백만 단위 규모의 다양한 문서 레이아웃 데이터셋인 **OmniLayout-1M** 을 구축했습니다. 이 데이터셋은 6가지 일반적인 문서 유형을 포함하며 **MinerU** 를 활용한 완전 자동화된 파이프라인으로 주석이 처리됩니다. 이어서, **OmniLayout-LLM** 이라는 **0.5B 모델** 을 제안하며, 이는 **두 단계의 Coarse-to-Fine 학습 패러다임** 을 따릅니다. 첫 번째 단계에서는 **OmniLayout-1M** 을 통해 범용 레이아웃 원칙을 학습하고, 두 번째 단계에서는 소량의 미세 주석 데이터로 특정 도메인에 대한 지식을 전이하여 미세 조정합니다.

## 주요 결과
**OmniLayout-LLM** 은 **M'Doc 데이터셋** 의 여러 도메인에서 강력한 성능을 달성하여 기존 레이아웃 생성 전문가 모델들( **LayoutDM, LACE, LayoutPrompter, LGGPT** )과 최신 범용 LLM들( **GPT-4o, Gemini-2.5-Flash, Claude-3.7-Sonnet** )을 크게 능가했습니다. 특히, U-Cond 태스크의 Textbook 도메인에서 **FID 40.28** 을 달성하여 **LayoutDM (180.25)** 대비 현저히 낮은 오류율을 보였습니다. 정량적 지표(FID, Alignment, Overlap, mIoU)에서 **지속적으로 SOTA 성능** 를 보였으며, 생성된 레이아웃이 미학적 원칙과 사용자 기대치에 부합함을 시각화로 입증했습니다.

## AI 실무자를 위한 시사점
새롭게 공개된 **OmniLayout-1M 데이터셋** 은 다양한 문서 AI 모델 학습에 귀중한 자원이 될 것입니다. 제안된 **Coarse-to-Fine 학습 패러다임** 은 미세 조정 데이터가 부족한 복잡한 생성 태스크에서 LLM의 잠재력을 최대한 활용하는 효과적인 전략을 제시합니다. **SOTA 성능** 를 달성한 **OmniLayout-LLM** 은 콘텐츠 기반 레이아웃 디자인, 문서 이미지 생성 등 다양한 실제 응용 분야에서 특히 복잡하고 다양한 문서 유형에 대한 강력한 기반이 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.