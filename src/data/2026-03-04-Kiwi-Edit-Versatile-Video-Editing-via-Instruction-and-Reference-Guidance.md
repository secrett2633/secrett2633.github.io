---
title: "[논문리뷰] Kiwi-Edit: Versatile Video Editing via Instruction and Reference Guidance"
excerpt: "arXiv에 게시된 'Kiwi-Edit: Versatile Video Editing via Instruction and Reference Guidance' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Editing
  - Instruction Guidance
  - Reference Guidance
  - Diffusion Models
  - MLLM
  - Dataset Generation
  - RefVIE
  - Curriculum Learning

permalink: /ai/review/2026-03-04-Kiwi-Edit-Versatile-Video-Editing-via-Instruction-and-Reference-Guidance/

toc: true
toc_sticky: true

date: 2026-03-04 00:00:00+0900+0900
last_modified_at: 2026-03-04 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.02175)

**저자:** Yiqi Lin, Guoqiang Liang, Ziyun Zeng, Zechen Bai, Yanzhe Chen, Mike Zheng Shou



## 핵심 연구 목표
자연어 명령 기반 비디오 편집의 시각적 제어 한계를 극복하고, 레퍼런스 이미지 가이드 편집의 **고품질 훈련 데이터 부족 문제** 를 해결하는 것을 목표로 합니다. 복잡한 시각적 뉘앙스를 정확하게 제어하고 사용자의 편집 의도를 시각적 예시를 통해 효과적으로 반영하는 **다재다능한 비디오 편집 프레임워크** 를 구축하고자 합니다.

## 핵심 방법론
**RefVIE** 라는 **대규모 명령-레퍼런스 가이드 비디오 편집 데이터셋(477K 쿼드러플렛)** 을 **확장 가능한 데이터 생성 파이프라인** 을 통해 구축했습니다. **Kiwi-Edit** 은 **frozen Multimodal Large Language Model(MLLM)** 과 **Diffusion Transformer(DiT)** 를 결합한 아키텍처를 사용하며, **쿼리 커넥터** 와 **잠재 커넥터** 를 통해 명령 및 레퍼런스 이미지를 처리합니다. 특히, **하이브리드 잠재 주입 전략** 을 통해 원본 비디오의 구조를 보존하고 레퍼런스 이미지의 미세한 텍스처를 전송하며, **다단계 훈련 커리큘럼** 을 통해 안정적인 수렴을 달성합니다.

## 주요 결과
**Kiwi-Edit** 은 OpenVE-Bench에서 명령어 기반 편집 시 모든 오픈소스 모델을 능가하는 **전반적인 점수 3.02** 를 달성했으며, 특히 **배경 변경(Background Change) 작업에서 3.84점** 으로 뛰어난 성능을 보였습니다. RefVIE-Bench에서는 레퍼런스 가이드 편집에서 **전반적인 점수 3.31** 을 기록하여, **Identity Consistency 3.98** 과 **Reference Similarity 3.72** 에서 경쟁력 있는 성능을 입증했습니다.

## AI 실무자를 위한 시사점
**RefVIE 데이터셋** 과 **생성 파이프라인** 은 고품질의 멀티모달 비디오 편집 데이터셋 구축을 위한 실용적인 솔루션을 제공합니다. **Kiwi-Edit** 의 통합 아키텍처는 명령어 및 레퍼런스 이미지를 통한 **정밀한 비디오 편집 제어 능력** 을 보여주며, 다양한 비전 애플리케이션에 적용 가능합니다. **다단계 훈련 커리큘럼** 은 복잡한 생성 모델의 학습 안정성과 성능 향상을 위한 효과적인 전략을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.