---
title: "[논문리뷰] Unified all-atom molecule generation with neural fields"
excerpt: "이 [arXiv]에 게시한 'Unified all-atom molecule generation with neural fields' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Molecule Generation
  - Neural Fields
  - Score-based Generative Models
  - Drug Design
  - Modality-agnostic
  - Antibody Design
  - Macrocyclic Peptides
  - All-atom

permalink: /ai/review/2025-11-26-Unified-all-atom-molecule-generation-with-neural-fields/

toc: true
toc_sticky: true

date: 2025-11-26 00:00:00+0900+0900
last_modified_at: 2025-11-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.15906)

**저자:** Matthieu Kirchmeyer, Pedro O. Pinheiro, Emma Willett, Karolis Martinkus, Joseph Kleinhenz, Emily K. Makowski, Andrew M. Watkins, Vladimir Gligorijevic, Richard Bonneau, Saeed Saremi



## 핵심 연구 목표
본 연구는 구조 기반 신약 설계에서 특정 분자 양식에 국한되어 적용 범위가 제한적인 기존 생성 모델의 한계를 해결하는 것을 목표로 합니다. 소분자, 거대 고리 펩타이드, 항체 CDR 루프 등 **다양한 원자 시스템에 걸쳐 표적 조건부의 모든 원자 분자를 생성**할 수 있는 **통합된 프레임워크인 FuncBind**를 제안하여 이 문제를 해결하고자 합니다.

## 핵심 방법론
FuncBind는 분자를 연속적인 원자 밀도로 표현하는 **신경 필드(neural fields)**를 사용하며, 컴퓨터 비전 문헌에서 차용한 현대적인 아키텍처를 갖춘 **스코어 기반 생성 모델**을 채택합니다. 이 모델은 전역 임베딩 대신 **공간적으로 정렬된 특징 맵(spatially arranged feature map)**을 활용하여 지역 신호 정보를 효과적으로 포착하며, **3D U-Net 기반 denoiser**를 사용하여 표적 구조, 분자 양식, 노이즈 수준에 따라 샘플링을 수행합니다. 생성된 신경 필드로부터 분자 구조를 복구하기 위해 **OpenBabel**을 활용한 후처리 파이프라인이 사용됩니다.

## 주요 결과
FuncBind는 **소분자, 거대 고리 펩타이드, 항체 CDR 루프** 생성에서 경쟁력 있는 성능을 달성하여 각 양식별 베이스라인과 유사하거나 능가하는 결과를 보였습니다. 특히 항체 CDR H3 루프 재설계에서 **AAR(Amino Acid Recovery)은 86.9%**, **Ca RMSD는 0.41Å**를 기록하며 기존 모델 대비 **1.5~3배 향상된 성능**을 보였습니다. 또한, **실험실 환경(in vitro)**에서 새로운 항체 바인더를 성공적으로 생성했으며, 강체 에피토프에서 **45%의 결합률**을 달성했습니다.

## AI 실무자를 위한 시사점
FuncBind는 **모달리티에 구애받지 않는(modality-agnostic)** 분자 생성 접근 방식을 제공하여 다양한 분자 양식에 단일 모델을 적용할 수 있는 가능성을 열었습니다. 이는 신약 개발의 초기 단계에서 여러 유형의 분자를 탐색하는 데 드는 복잡성과 자원을 줄여줄 수 있습니다. 하지만 실제 적용을 위해서는 **합성 가능성(synthesizability)**과 같은 결합 친화도 외의 다른 속성들에 대한 추가적인 고려가 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.