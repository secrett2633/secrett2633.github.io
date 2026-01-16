---
title: "[논문리뷰] Molmo2: Open Weights and Data for Vision-Language Models with Video Understanding and Grounding"
excerpt: "Mohammadreza Salehi이 [arXiv]에 게시한 'Molmo2: Open Weights and Data for Vision-Language Models with Video Understanding and Grounding' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models
  - Video Understanding
  - Grounding
  - Open Weights
  - Open Data
  - Multimodal AI
  - Object Tracking
  - Dense Captioning

permalink: /ai/review/2026-01-16-Molmo2-Open-Weights-and-Data-for-Vision-Language-Models-with-Video-Understanding-and-Grounding/

toc: true
toc_sticky: true

date: 2026-01-16 00:00:00+0900+0900
last_modified_at: 2026-01-16 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.10611)

**저자:** Christopher Clark, Jieyu Zhang, Zixian Ma, Jae Sung Park, Mohammadreza Salehi, Rohun Tripathi, Sangho Lee, Zhongzheng Ren, Chris Dongjoo Kim, Yinuo Yang, Vincent Shao, Yue Yang, Weikai Huang, Ziqi Gao, Taira Anderson, Jianrui Zhang, Jitesh Jain, George Stoica, Winson Han, Ali Farhadi, Ranjay Krishna



## 핵심 연구 목표
현재 가장 강력한 비디오-언어 모델(VLM)들이 대부분 독점적이거나, 독점 모델의 데이터를 증류하여 생성되거나, 훈련 데이터 및 방법론을 공개하지 않는 문제를 해결하고자 합니다. 본 논문은 비디오 이해 및 그라운딩 기능을 갖춘 **Molmo2** 라는 새로운 **오픈 소스 VLM** 제품군을 공개하고, 특히 단일 이미지, 다중 이미지 및 비디오 작업에서 **포인트 기반 그라운딩** 이라는 새로운 역량을 시연하여 오픈 소스 커뮤니티의 발전을 촉진하는 것을 목표로 합니다.

## 핵심 방법론
Molmo2는 **ViT** 와 **LLM** 을 **커넥터 모듈** 로 연결하는 표준 설계를 따르며, **세 단계 파이프라인** 으로 훈련됩니다: (1) 이미지-캡셔닝 및 이미지-포인팅 사전 훈련, (2) 통합 멀티모달 데이터 혼합을 사용한 공동 지도 미세 조정, (3) 더 긴 컨텍스트 훈련. 특히, **폐쇄형 VLM을 사용하지 않고 수집된 7개의 새로운 비디오 데이터셋** 과 **2개의 다중 이미지 데이터셋** 을 포함한 **총 9개의 새로운 데이터셋** 을 활용하며, **효율적인 패킹** , **메시지 트리 인코딩** , **시각 토큰에 대한 양방향 어텐션** , **새로운 토큰 가중치 스키마** 등의 훈련 혁신을 적용했습니다.

## 주요 결과
**Molmo2 8B 모델** 은 오픈 소스 모델 중 단기 비디오, 카운팅, 캡셔닝에서 **최고 수준의 성능** 을 달성했습니다. 비디오 그라운딩에서 **Qwen3-VL** 을 **35.5% vs 29.6%** (비디오 카운팅 정확도)로 **상당히 능가** 했으며, 일부 작업에서는 **Gemini 3 Pro** 와 같은 독점 모델을 **능가** (비디오 포인팅에서 **38.4% vs 20.0% F1** , 비디오 추적에서 **56.2% vs 41.1% J&F** )했습니다. 인간 선호도 평가에서는 Molmo2가 기존 오픈 소스 모델과 '동등하거나 우수'하며 일부 독점 모델(예: **GPT-5** , **Claude Sonnet 4.5** )보다 '앞서는' 것으로 평가되었습니다.

## AI 실무자를 위한 시사점
**Molmo2** 의 완전한 **오픈 소스 모델 가중치, 데이터 및 훈련 코드** 공개는 VLM 연구의 투명성을 높이고 오픈 소스 커뮤니티의 혁신을 가속화할 것입니다. 특히 **비디오 그라운딩** 및 **객체 추적** 분야에서의 뛰어난 성능은 로봇공학, 자율주행 등 **실시간 시공간 이해** 가 필수적인 AI 애플리케이션 개발에 중요한 기반 기술로 활용될 수 있습니다. 독점 모델에 의존하지 않고 구축된 **고품질 데이터셋** 은 향후 연구의 방향성을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.