---
title: "[논문리뷰] Towards Universal Video MLLMs with Attribute-Structured and Quality-Verified Instructions"
excerpt: "이 [arXiv]에 게시한 'Towards Universal Video MLLMs with Attribute-Structured and Quality-Verified Instructions' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Understanding
  - Multimodal Large Language Models (MLLMs)
  - Instruction Tuning
  - Data Curation
  - Attribute-Structured Data
  - Quality Verification
  - Temporal Grounding
  - Video Captioning

permalink: /ai/review/2026-02-16-Towards-Universal-Video-MLLMs-with-Attribute-Structured-and-Quality-Verified-Instructions/

toc: true
toc_sticky: true

date: 2026-02-16 00:00:00+0900+0900
last_modified_at: 2026-02-16 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.13013)

**저자:** Yunheng Li, Hengrui Zhang, Meng-Hao Guo, Wenzhao Gao, Shaoyong Jia, Shaohui Jiao, Qibin Hou, Ming-Ming Cheng



## 핵심 연구 목표
이 연구는 기존 비디오-명령어 데이터가 불완전하고 세분화된 정보 및 신뢰성 있는 주석이 부족하여 **범용적인 비디오 이해 MLLM** 의 성능을 제약하는 문제를 해결하고자 합니다. 세분화된 속성 구조와 품질 검증을 통해 **고품질의 비디오 명령어 데이터** 를 구축하고, 이를 활용하여 **캡션 품질 향상, 환각 감소, 명령어 준수 능력 강화** 를 목표로 합니다.

## 핵심 방법론
본 논문은 **ASID-1M** 이라는 100만 개 규모의 **속성 구조화된 시청각 명령어 데이터셋** 을 공개합니다. 데이터셋 구축을 위해 **ASID-Verify** 라는 **다단계 데이터 큐레이션 파이프라인** 을 개발했습니다. 이 파이프라인은 **자동 주석 생성, 검증 및 개선** 을 수행하며, 다중 소스 캡션을 통합하고, **ASR 정렬 및 타임스탬프 일관성 확인** 을 통해 신뢰성을 확보합니다. 학습 모델인 **ASID-Captioner** 는 **Qwen2.5-Omni** 를 기반으로 **감독 미세 조정(SFT)** 되며, **속성별 표현 학습, 짧은 컨텍스트를 사용한 전체 속성 학습, 긴 컨텍스트를 사용한 전체 속성 학습** 의 3단계로 구성된 점진적 학습 방식을 채택합니다.

## 주요 결과
**ASID-Captioner** 는 7B 모델 기준으로 Video-SALMONN-2 테스트셋에서 **Missing rate 20.5%** , **Hallucination rate 15.4%** 를 달성하여 강력한 개방형 모델 대비 **캡션 신뢰성을 향상** 시켰습니다. UGC-VideoCap에서는 **평균 점수 81.2** 를 기록하며 **Gemini-3-Pro** 와 경쟁 가능한 성능을 보였고, VidCapBench-AE에서 **정확도(Acc)와 커버리지(Cov) 모두 높은 성능** 을 달성했습니다. 또한, 캡션 기반 QA 벤치마크(Daily-Omni 61.2, World-Sense 34.0)와 시공간 접지 벤치마크(Charades-STA mIoU 28.5)에서도 **최고 수준의 성능** 을 보여, 생성된 캡션이 후속 추론 및 시간적 정밀성 확보에 충분한 정보를 보존함을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 **속성 구조화 및 품질 검증된 데이터** 가 MLLM의 비디오 이해 능력을 혁신적으로 향상시킬 수 있음을 입증합니다. **ASID-Verify** 파이프라인은 **고품질 멀티모달 데이터셋** 구축을 위한 효율적이고 확장 가능한 방법을 제시하며, 특히 **세분화된 타임스탬프 및 속성별 묘사** 가 필요한 비디오 분석 분야에 실용적인 가치를 제공합니다. **ASID-Captioner** 는 컨트롤 가능한 캡션 생성, QA, 시공간 접지와 같은 다양한 다운스트림 태스크에서 **강력한 성능** 을 제공하여, **차세대 비디오 MLLM 개발 및 응용** 에 중요한 기반을 마련할 것으로 기대됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.