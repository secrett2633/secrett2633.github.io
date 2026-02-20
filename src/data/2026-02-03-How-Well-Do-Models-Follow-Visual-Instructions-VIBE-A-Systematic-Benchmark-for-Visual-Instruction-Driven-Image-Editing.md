---
title: "[논문리뷰] How Well Do Models Follow Visual Instructions? VIBE: A Systematic Benchmark for Visual Instruction-Driven Image Editing"
excerpt: "Haochen Tian이 arXiv에 게시한 'How Well Do Models Follow Visual Instructions? VIBE: A Systematic Benchmark for Visual Instruction-Driven Image Editing' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Visual Instruction
  - Image Editing
  - Multimodal Benchmark
  - LMM-as-a-judge
  - Deictic Grounding
  - Morphological Manipulation
  - Causal Reasoning
  - Generative Models

permalink: /ai/review/2026-02-03-How-Well-Do-Models-Follow-Visual-Instructions-VIBE-A-Systematic-Benchmark-for-Visual-Instruction-Driven-Image-Editing/

toc: true
toc_sticky: true

date: 2026-02-03 00:00:00+0900+0900
last_modified_at: 2026-02-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.01851)

**저자:** Huanyu Zhang, Xuehai Bai, Chengzu Li, Chen Liang, Haochen Tian, Haodong Li, Ruichuan An, Yifan Zhang, Anna Korhonen, Zhang Zhang, Liang Wang, Tieniu Tan



## 핵심 연구 목표
이 논문은 기존의 텍스트 기반 이미지 편집 벤치마크의 한계를 극복하고, 스케치, 화살표, 영역 주석 등 **시각적 지침(visual instructions)** 에 따른 이미지 편집 모델의 성능을 체계적으로 평가하기 위한 벤치마크인 **VIBE** 를 제안하는 것을 목표로 합니다. 이를 통해 모델이 인간처럼 직관적으로 시각적 의도를 이해하고 따르는 능력을 평가하고자 합니다.

## 핵심 방법론
연구진은 시각적 지침의 복잡도를 **Deictic Level** , **Morphological Level** , **Causal Level** 의 세 단계 상호작용 계층으로 분류하고, 이를 바탕으로 **10가지 다양한 편집 작업** 에 대한 **총 1,034개의 고품질 샘플** 을 수집하여 **VIBE 벤치마크** 를 구축했습니다. 모델 평가를 위해 **GPT-5.1** 을 활용하는 **LMM-as-a-judge 프레임워크** 를 제안했으며, **Instruction Adherence (IA)** , **Contextual Preservation (CP)** , **Visual Coherence (VC)** 와 같은 작업별 맞춤형 지표를 사용하여 평가의 신뢰성을 확보했습니다.

## 주요 결과
평가 결과, **Nano Banana Pro** 와 같은 상용 모델들이 초기 단계의 시각적 지침 추종 능력에서 오픈소스 모델을 **일관되게 능가** 하는 것으로 나타났습니다. 하지만 작업 난이도가 증가함에 따라(특히 **Causal Level** 에서는 최강 모델조차 **50% 미만** 의 평균 점수를 기록) 성능이 현저히 저하되었고, 단일 작업 대비 **다중 작업 지침** 에서는 모든 모델에서 성능 하락이 관찰되었습니다. 또한, 모델별로 **이미지 스타일(실세계, 애니메이션, 스케치)** 에 대한 성능 선호도 차이가 명확하게 드러났습니다.

## AI 실무자를 위한 시사점
**VIBE 벤치마크** 는 텍스트를 넘어 복잡한 시각적 지침을 이해하고 실행하는 **멀티모달 이미지 편집 모델** 개발에 필수적인 평가 도구입니다. **인과적 추론** 및 **다중 작업 지침** 처리 능력의 한계는 **차세대 AI 모델** 을 위한 중요한 연구 영역임을 시사하며, 실무자들은 모델 선택 시 **데이터 스타일 적합성** 과 **복합적인 시각 지침 처리 능력** 을 면밀히 고려해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.