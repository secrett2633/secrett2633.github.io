---
title: "[논문리뷰] OneStory: Coherent Multi-Shot Video Generation with Adaptive Memory"
excerpt: "arXiv에 게시된 'OneStory: Coherent Multi-Shot Video Generation with Adaptive Memory' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-Shot Video Generation
  - Adaptive Memory
  - Long-Range Context
  - Frame Selection
  - Diffusion Models
  - Image-to-Video
  - Autoregressive Generation
  - Narrative Coherence

permalink: /ai/review/2025-12-10-OneStory-Coherent-Multi-Shot-Video-Generation-with-Adaptive-Memory/

toc: true
toc_sticky: true

date: 2025-12-10 00:00:00+0900+0900
last_modified_at: 2025-12-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.07802)

**저자:** Zhaochong An, Menglin Jia, Haonan Qiu, Zijian Zhou, Xiaoke Huang, Zhiheng Liu, Weiming Ren, Kumara Kahatapitiya, Ding Liu, Sen He, Chenyang Zhang, Tao Xiang, Fanny Yang, Serge Belongie, Tian Xie



## 핵심 연구 목표
이 논문은 기존 다중 샷 비디오 생성(MSV) 모델이 복잡한 서사에 필요한 장거리 샷 간 컨텍스트를 효과적으로 모델링하지 못하여 발생하는 시각적 불일치와 일관성 저하 문제를 해결하는 것을 목표로 합니다. **OneStory** 프레임워크를 통해 일관되고 확장 가능한 서사 생성을 위한 전역적이고 압축적인 샷 간 컨텍스트 모델링을 가능하게 하고, 다양한 시나리오에서 최첨단 서사 일관성을 달성하고자 합니다.

## 핵심 방법론
MSV를 **다음 샷 생성(next-shot generation) 태스크** 로 재구성하여 사전 훈련된 **I2V(Image-to-Video) 모델** 의 시각적 조건화 능력을 활용합니다. 두 가지 핵심 모듈인 **Frame Selection 모듈** 은 이전 샷에서 의미론적으로 관련 있는 프레임을 선별하여 전역 메모리를 구축하고, **Adaptive Conditioner** 는 중요도 기반의 패치화(patchification)를 통해 압축된 컨텍스트를 동적으로 생성하여 생성기에 직접 주입합니다. 또한, 현실적인 스토리텔링을 반영하는 **60K 고품질 다중 샷 데이터셋** 을 큐레이션하고, **통합된 세 샷 훈련** 및 **점진적 결합(progressive coupling) 방식** 과 같은 효과적인 훈련 전략을 도입했습니다.

## 주요 결과
**OneStory** 는 텍스트-다중 샷(T2MSV) 및 이미지-다중 샷(I2MSV) 설정 모두에서 모든 기준선 모델을 능가하는 우수한 성능을 달성했습니다. T2MSV에서 **평균 샷 간 일관성 0.5813** 과 **평균 샷 내 일관성 0.9387** 를 기록했으며, I2MSV에서는 각각 **0.5784** 와 **0.9358** 를 달성하며 최첨단 결과를 보여주었습니다. 또한, **Adaptive Conditioner** 와 **Frame Selection** 모듈 모두 모델 성능에 결정적인 역할을 함이 정량적 분석으로 확인되었습니다.

## AI 실무자를 위한 시사점
이 연구는 긴 형식의 비디오 콘텐츠 생성에 대한 실용적인 솔루션을 제공하여 영화 제작, 스토리텔링, 가상 환경 개발 분야에 큰 영향을 미칠 수 있습니다. **어댑티브 메모리** 개념은 시맨틱 관련성에 기반한 컨텍스트 관리 기법으로, 다른 시퀀스 생성 또는 멀티모달 AI 시스템에도 적용될 수 있는 잠재력을 제시합니다. 또한, 사전 훈련된 대규모 I2V 모델을 미세 조정하여 복잡한 MSV 태스크를 해결하는 접근 방식은 파운데이션 모델의 효율적인 활용 방안을 보여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.