---
title: "[논문리뷰] VQ-VA World: Towards High-Quality Visual Question-Visual Answering"
excerpt: "Feng Li이 arXiv에 게시한 'VQ-VA World: Towards High-Quality Visual Question-Visual Answering' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Visual Question Answering (VQA)
  - Image Generation
  - Data-centric AI
  - Agentic Pipeline
  - Multimodal Models
  - Web-scale Data
  - Benchmark
  - LightFusion

permalink: /ai/review/2025-11-26-VQ-VA-World-Towards-High-Quality-Visual-Question-Visual-Answering/

toc: true
toc_sticky: true

date: 2025-11-26 00:00:00+0900+0900
last_modified_at: 2025-11-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.20573)

**저자:** Chenhui Gou, Zilong Chen, Zeyu Wang, Feng Li, Deyao Zhu, Zicheng Duan, Kunchang Li, Chaorui Deng, Hongyi Yuan, Haoqi Fan, Cihang Xie, Jianfei Cai, Hamid Rezatofighi



## 핵심 연구 목표
본 논문은 시각적 질문에 대한 시각적 답변(VQ-VA) 능력, 즉 이미지를 통해 질문에 응답하는 기능을 오픈 소스 모델에도 도입하는 것을 목표로 합니다. 현재 이러한 능력은 **GPT-Image** 및 **NanoBanana** 와 같은 독점 시스템에만 국한되어 있으며, 오픈 소스 모델의 성능 저하는 적절한 훈련 데이터 부족 때문으로 분석됩니다.

## 핵심 방법론
연구진은 **VQ-VA World** 라는 데이터 중심 프레임워크를 제안하며, 이는 대규모 데이터 구축을 위한 **에이전트 파이프라인** 을 중심으로 구축됩니다. 이 파이프라인은 **Retriever** , **Instruction Generator** , **Filter** , **Rewriter** , **Reasoner** 의 다섯 가지 모듈로 구성되어 **1.8M개의 고품질, 인터리브 이미지-텍스트 샘플** 을 큐레이션합니다. 모델 평가를 위해 **세계 지식, 디자인 지식, 추론** 측면을 체계적으로 평가하는 인간-큐레이션 벤치마크인 **IntelligentBench** 도 공개했습니다.

## 주요 결과
**VQ-VA World** 데이터로 훈련된 **LightFusion-World** 는 **IntelligentBench** 에서 **53.06** 이라는 강력한 성능을 달성했습니다. 이는 이전 오픈 소스 모델인 바닐라 **LightFusion(7.78)** 및 **UniWorld-V1(1.94)** 을 크게 능가하며, **NanoBanana(81.67)** 및 **GPT-Image(82.64)** 와 같은 선도적인 독점 시스템과의 격차를 상당 부분 좁혔습니다. 또한, **Qwen-Image** 를 포함한 여러 대규모 비공개 모델도 능가하는 성능을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 오픈 소스 멀티모달 모델에 **지식 기반 및 다단계 추론** 이 필요한 시각적 질문-시각적 답변(VQ-VA) 기능을 부여하는 데 핵심적인 기여를 합니다. 공개된 모델 가중치, 데이터셋, 파이프라인은 관련 분야의 미래 연구를 활성화할 것입니다. 특히, **에이전트 기반 데이터 구축 파이프라인** 은 복잡하고 지식 집약적인 AI 데이터셋을 확장성 있게 생성하는 실용적인 방법을 제시하여 AI 개발자에게 큰 도움이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.