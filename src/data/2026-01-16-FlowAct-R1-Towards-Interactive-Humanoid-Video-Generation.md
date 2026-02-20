---
title: "[논문리뷰] FlowAct-R1: Towards Interactive Humanoid Video Generation"
excerpt: "arXiv에 게시된 'FlowAct-R1: Towards Interactive Humanoid Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Interactive Video Generation
  - Humanoid Synthesis
  - Real-time
  - Streaming Diffusion
  - MMDiT
  - Temporal Consistency
  - Multimodal Control
  - Low Latency

permalink: /ai/review/2026-01-16-FlowAct-R1-Towards-Interactive-Humanoid-Video-Generation/

toc: true
toc_sticky: true

date: 2026-01-16 00:00:00+0900+0900
last_modified_at: 2026-01-16 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.10103)

**저자:** Lizhen Wang, Yongming Zhu, Zhipeng Ge, Youwei Zheng, Longhao Zhang, Tianshu Hu, Shiyang Qin, Mingshuang Luo, Jiaxu Zhang, Xin Chen, Yulong Wang, Zerong Zheng, Jianwen Jiang, Chao Liang, Weifeng Chen, Xing Wang, Yuan Zhang, Mingyuan Gao (ByteDance Intelligent Creation)



## 핵심 연구 목표
본 논문은 실시간 상호작용이 가능한 휴머노이드 비디오 생성을 목표로 하며, 기존 비디오 합성 방법론이 고품질 합성 및 실시간 상호작용 요구사항 사이에서 겪는 한계를 극복하고자 합니다. 특히, 연속적이고 반응적인 방식으로 인간과 상호작용할 수 있는 생체와 같은 시각적 에이전트를 합성하는 것을 주된 연구 목적으로 합니다.

## 핵심 방법론
제안된 FlowAct-R1 프레임워크는 **MMDiT(Multimodal Diffusion Transformer)** 아키텍처를 기반으로 하며, 무기한 길이 스트리밍 비디오 합성을 위해 **청크 단위 확산 강제 전략(chunkwise diffusion forcing strategy)** 을 도입했습니다. 오류 누적을 완화하고 장기적인 시간적 일관성을 보장하기 위해 **자가 강제(self-forcing) 변형** 과 **구조화된 메모리 뱅크** 를 활용합니다. 실시간 성능은 **효율적인 증류 기술(3 NFEs)** , **FP8 양자화** , **프레임 단위 하이브리드 병렬화** 및 **비동기 파이프라인** 을 통해 달성됩니다.

## 주요 결과
FlowAct-R1은 **NVIDIA A100** 플랫폼에서 **480p 해상도로 25fps** 의 안정적인 실시간 비디오 생성을 지원하며, **최초 프레임까지의 시간(TTFF)은 약 1.5초** 입니다. 사용자 연구(GSB metric) 결과, FlowAct-R1은 모션 자연스러움, 립싱크 정확도, 프레임 구조 안정성 및 모션 풍부도에서 경쟁 모델들을 뛰어넘는 우수한 성능을 보였으며, **LiveAvatar 대비 91%** , **KlingAvatar 2.0 대비 74%** , **Omnihuman-1.5 대비 62%** 의 선호도를 얻었습니다.

## AI 실무자를 위한 시사점
본 연구는 실시간 스트리밍이 필수적인 라이브 스트리밍, 가상 동반자, 화상 회의와 같은 상호작용형 AI 애플리케이션 개발에 중요한 이정표를 제시합니다. **MMDiT 아키텍처** 와 **청크 단위 확산 강제 전략** , 그리고 **증류 기술** 의 결합은 효율적이고 고품질의 생성 모델을 구축하는 데 활용될 수 있습니다. 또한, **MLLM 기반의 액션 플래닝** 과 **메모리 개선 전략** 은 장기 비디오 생성 시 시간적 일관성과 자연스러운 행동 표현을 확보하는 데 유용한 기법으로 응용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.