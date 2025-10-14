---
title: "[논문리뷰] Marco-Voice Technical Report"
excerpt: "Qingjuan Li이 [arXiv]에 게시한 'Marco-Voice Technical Report' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Speech Synthesis
  - Voice Cloning
  - Emotion Control
  - Text-to-Speech
  - Disentanglement
  - Contrastive Learning
  - Flow Matching
  - Emotional Speech Dataset

permalink: /ai/review/2025-8-8-Marco-Voice_Technical_Report/

toc: true
toc_sticky: true

date: 2025-08-08 13:32:22+0900
last_modified_at: 2025-08-08 13:32:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.02038)

**저자:** Fengping Tian, Chenyang Lyu, Xuanfan Ni, Haoqin Sun, Qingjuan Li, Zhiqiang Qian, Haijun Li, Longyue Wang, Zhao Xu, Weihua Luo, Kaifu Zhang



## 핵심 연구 목표
본 논문은 음성 복제(voice cloning)와 감정 제어(emotion control)를 통합한 **다기능 음성 합성 시스템**인 **Marco-Voice**를 개발하는 것을 목표로 합니다. 이는 높은 표현력, 제어 가능성, 자연스러운 음성 생성과 함께 화자 정체성을 충실히 보존하는 데 있어 기존 TTS(Text-to-Speech) 시스템이 직면했던 고질적인 문제들을 해결하고자 합니다.

## 핵심 방법론
**Marco-Voice**는 화자 정체성(timbre)과 감정 표현을 분리하는 **화자-감정 분리(speaker-emotion disentanglement) 메커니즘**을 도입하고, **in-batch contrastive learning**을 통해 감정 임베딩의 품질을 향상시킵니다. 또한, 중립 임베딩으로부터의 회전 거리에 기반한 **회전 감정 임베딩 통합(rotational emotion embedding integration) 방법**을 사용하여 부드러운 감정 제어를 가능하게 하며, **교차-어텐션 메커니즘**을 통해 감정 정보를 언어 내용과 통합합니다. 이를 위해 고품질 감정 음성 데이터셋인 **CSEMOTIONS**를 구축하여 시스템 훈련 및 평가에 활용했습니다.

## 주요 결과
**Marco-Voice**는 음성 복제 및 감정 표현 생성에서 기존 시스템을 크게 능가하는 성능을 보였습니다. 인간 평가에서 **화자 유사성 0.8275**, **감정 표현 4.225**, **전반적인 만족도 4.430**의 높은 점수를 달성했으며, **LibriTTS** 및 **AISHELL** 데이터셋에서 **낮은 WER**과 **높은 화자 유사성**을 유지했습니다. 특히, 감정 인식 정확도에서 **Marco-Voice-v4** 버전은 중국어 데이터셋에서 **0.78**, 영어 데이터셋에서 **0.77**의 최적 성능을 기록했습니다.

## AI 실무자를 위한 시사점
**Marco-Voice**의 통합 모델링 접근 방식은 화자 특성과 감정 표현 간의 미묘한 상호작용을 학습하여 더욱 자연스럽고 일관된 음성 합성을 가능하게 합니다. 이는 음성 비서, 접근성 도구, 콘텐츠 제작 등 다양한 응용 분야에서 **더욱 표현력 있고 개인화된 음성 합성 기술**을 구현하는 데 중요한 시사점을 제공합니다. 그러나 현재 모델은 페어링된 감정 음성 데이터를 필요로 하며, 실시간 애플리케이션을 위한 **계산 효율성 최적화**가 향후 과제로 남아있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.