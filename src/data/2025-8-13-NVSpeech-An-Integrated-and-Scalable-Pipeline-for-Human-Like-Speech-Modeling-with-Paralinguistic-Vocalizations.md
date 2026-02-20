---
title: "[논문리뷰] NVSpeech: An Integrated and Scalable Pipeline for Human-Like Speech
  Modeling with Paralinguistic Vocalizations"
excerpt: "Haoyue Zhan이 arXiv에 게시한 'NVSpeech: An Integrated and Scalable Pipeline for Human-Like Speech
  Modeling with Paralinguistic Vocalizations' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Paralinguistic Vocalizations
  - Speech Recognition
  - Text-to-Speech
  - Speech Synthesis
  - Data Annotation
  - Mandarin Speech
  - Expressive Speech

permalink: /ai/review/2025-8-13-NVSpeech-An-Integrated-and-Scalable-Pipeline-for-Human-Like-Speech-Modeling-with-Paralinguistic-Vocalizations/

toc: true
toc_sticky: true

date: 2025-08-13 13:29:23+0900
last_modified_at: 2025-08-13 13:29:23+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.04195)

**저자:** Huan Liao, Qinke Ni, Yuancheng Wang, Yiheng Lu, Haoyue Zhan



## 핵심 연구 목표
본 연구는 자연스러운 음성 의사소통에 필수적인 웃음, 호흡, 감탄사 등의 **비언어적 발성(paralinguistic vocalizations)** 이 기존 ASR 및 TTS 시스템에서 간과되는 문제를 해결하고자 합니다. 궁극적으로 중국어 음성에서 비언어적 발성의 인식과 합성을 아우르는 통합적이고 확장 가능한 파이프라인을 구축하여 인간과 유사한 표현적인 음성 모델링을 목표로 합니다.

## 핵심 방법론
연구팀은 **18가지 단어 수준의 비언어적 범주** 로 수동으로 주석 처리된 **48,430개** 의 발화 데이터셋( **NVSpeech_human** )을 구축했습니다. 이 데이터를 활용하여 비언어적 단서를 인라인 디코딩 가능한 토큰으로 처리하는 **비언어적 인지 ASR 모델** 을 개발했으며, 이를 통해 **174,179개** 의 발화(총 **573시간** )로 구성된 대규모 코퍼스를 자동으로 주석 처리했습니다. 마지막으로, 자동 및 수동 주석 데이터를 모두 사용하여 **CosyVoice** 및 **CosyVoice2** 와 같은 제로샷 TTS 모델을 미세 조정하여 단어 수준에서 비언어적 발성을 제어할 수 있도록 했습니다.

## 주요 결과
비언어적 인지 ASR 모델은 **SenseVoice** 가 인(in-domain) 테스트셋에서 **0.83** , 오픈(open-domain) 테스트셋에서 **0.85** 의 가장 높은 **F1 점수** 를 달성하며 탁월한 성능을 보였습니다. TTS 실험에서는 대규모 자동 주석 데이터셋으로 미세 조정된 모델이 가장 우수했으며, 청취자들이 기존 음성 대비 **78.7%** (CosyVoice) 및 **75.4%** (CosyVoice2)의 높은 선호도를 보였습니다. 또한, 합성된 음성은 높은 자연성(NMOS: **3.9-4.0** )과 음질(QMOS: **4.04-3.96** )을 유지했습니다.

## AI 실무자를 위한 시사점
본 연구는 대규모, 단어 수준으로 주석 처리된 비언어적 음성 데이터셋( **NVSpeech** )의 중요성을 강조하며, 이는 인간과 유사한 음성 AI 개발의 핵심 기반이 됩니다. 제안된 통합 파이프라인은 복잡한 비언어적 단서를 인식하고 합성하는 실용적이고 확장 가능한 방법을 제공하여, 대화형 AI, 표현적 챗봇, 가상 비서 등의 개발에 직접 적용될 수 있습니다. 또한, 이 연구는 만다린어와 같은 성조 언어의 표현적 음성 모델링에 대한 향후 연구 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.