---
title: "[논문리뷰] Uni-MoE-2.0-Omni: Scaling Language-Centric Omnimodal Large Model with Advanced MoE, Training and Data"
excerpt: "arXiv에 게시된 'Uni-MoE-2.0-Omni: Scaling Language-Centric Omnimodal Large Model with Advanced MoE, Training and Data' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Omnimodal Large Models
  - Mixture-of-Experts (MoE)
  - Language-Centric AI
  - Multimodal Understanding
  - Multimodal Generation
  - Progressive Training
  - Omni-Modality 3D RoPE

permalink: /ai/review/2025-11-18-Uni-MoE-2-0-Omni-Scaling-Language-Centric-Omnimodal-Large-Model-with-Advanced-MoE-Training-and-Data/

toc: true
toc_sticky: true

date: 2025-11-18 00:00:00+0900+0900
last_modified_at: 2025-11-18 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.12609)

**저자:** Yunxin Li, Baotian Hu, Min Zhang, Xinyu Chen, Shenyuan Jiang, Haoyuan Shi, Zhenyu Liu, Xuanyu Zhang, Nanhao Deng, Zhenran Xu, Yicheng Ma, Meishan Zhang



## 핵심 연구 목표
본 논문은 언어 중심의 접근 방식을 통해 멀티모달 이해, 추론 및 생성 능력을 통합하는 **Uni-MoE-2.0-Omni** 라는 효율적인 옴니모달 대규모 모델을 개발하는 것을 목표로 합니다. 기존 대규모 옴니모달 모델의 **비효율적인 스케일링** 과 **훈련 불안정성** 문제를 해결하여, 단순한 멀티모달 이해를 넘어 이해와 생성을 원활하게 통합하고자 합니다.

## 핵심 방법론
연구팀은 **Qwen2.5-7B** 밀집 아키텍처를 기반으로 **동적 용량 Mixture-of-Experts (MoE) 설계** , **반복적 강화 학습(GSPO-DPO)** 이 강화된 점진적 훈련 전략, 그리고 **정교하게 큐레이션된 멀티모달 데이터 매칭 기법** 을 활용했습니다. 특히, **Omni-Modality 3D RoPE** 를 도입하여 텍스트, 오디오, 이미지, 비디오 모달리티 전반에 걸쳐 시공간적 정렬을 보장하며, **routed, shared, null 전문가** 로 구성된 MoE 레이어는 효율적인 계산과 전문화된 모달리티 처리를 가능하게 합니다.

## 주요 결과
**Uni-MoE-2.0-Omni** 는 **85개 멀티모달 벤치마크** 중 **76개 중 50개 이상** 에서 최첨단 또는 매우 경쟁력 있는 성능을 달성하여 **Qwen2.5-Omni** 를 능가했습니다. 특히, 비디오 이해에서 평균 **+7%** , 옴니모달리티 이해에서 평균 **+7%** , 오디오-비주얼 추론에서 **+4%** 의 개선을 보였으며, 장문 음성 처리(ASR)에서 **WER을 최대 4.2% 감소** 시키고 저수준 이미지 처리 및 제어 가능한 생성에서 **5개 지표** 에서 선두를 차지했습니다.

## AI 실무자를 위한 시사점
본 연구는 **MoE 아키텍처** 와 **강화 학습(GSPO-DPO) 기반의 점진적 훈련 전략** 이 옴니모달 대규모 모델의 스케일링 및 성능 안정화에 매우 효과적임을 입증했습니다. **Uni-MoE-2.0-Omni** 의 오픈소스 공개는 멀티모달 AI 분야의 투명성을 높이고 추가 연구를 촉진할 것이며, 특히 **고성능 비디오 이해** 및 **제어 가능한 이미지/음성 생성** 기능은 실제 애플리케이션 개발에 큰 잠재력을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.