---
title: "[논문리뷰] Do You Hear What I Mean? Quantifying the Instruction-Perception Gap in
  Instruction-Guided Expressive Text-To-Speech Systems"
excerpt: "Hung-yi Lee이 arXiv에 게시한 'Do You Hear What I Mean? Quantifying the Instruction-Perception Gap in
  Instruction-Guided Expressive Text-To-Speech Systems' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Instruction-Guided TTS
  - Expressive Speech Synthesis
  - Human Perception
  - Subjective Evaluation
  - Controllability
  - Instruction Following
  - Evaluation Metrics

permalink: /ai/review/2025-9-22-Do-You-Hear-What-I-Mean-Quantifying-the-Instruction-Perception-Gap-in-Instruction-Guided-Expressive-Text-To-Speech-Systems/

toc: true
toc_sticky: true

date: 2025-09-22 13:11:29+0900
last_modified_at: 2025-09-22 13:11:29+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.13989)

**저자:** Yi-Cheng Lin, Huang-Cheng Chou, Tzu-Chieh Wei, Kuan-Yu Chen, Hung-yi Lee



## 핵심 연구 목표
이 논문은 **ITTS (Instruction-Guided Text-to-Speech)** 시스템에서 사용자의 자연어 명령(natural language prompts)과 청취자의 음성 지각(listener perception) 간의 불일치를 정량적으로 분석하는 것을 목표로 합니다. 특히, 정도 부사, 점진적 감정 강도, 화자 연령, 단어 수준 강조와 같은 미묘한 표현 속성에 대한 ITTS 시스템의 제어 능력과 그에 따른 지각적 정렬도를 평가하고자 합니다.

## 핵심 방법론
연구팀은 **E-VOC (Expressive VOice Control) 코퍼스** 를 구축하기 위해 165명 이상의 인간 평가자로부터 60,000개 이상의 지각 평가 데이터를 수집했습니다. **gpt-4o-mini-tts** , **Parler-TTS-large-v1** , **Parler-TTS-mini-v1** , **UniAudio** , **PromptTTS++** 의 5가지 ITTS 시스템을 대상으로, 음향적 차원(loudness, pitch, speaking rate) 전반에 걸쳐 지시-생성 음성 간의 정렬도를 분석했습니다. 평가는 객관적인 음향 측정과 주관적인 인간 지각 판단을 모두 활용하는 종합적인 프레임워크를 기반으로 수행되었습니다.

## 주요 결과
평가 결과 **gpt-4o-mini-tts** 가 분석된 5개 시스템 중 지시와 생성된 음성 간의 정렬도가 가장 뛰어난 것으로 나타났습니다. 하지만 대부분의 ITTS 시스템은 아동 또는 노인 목소리를 지시하더라도 기본적으로 **성인 목소리** 를 생성하는 경향을 보였으며, 미세한 제어(fine-grained control)는 여전히 주요 과제로 남아있었습니다. 특히, **단어 수준 강조(Word-level Emphasis)** 제어는 모든 시스템에게 상당한 어려움을 주는 영역임이 확인되었습니다.

## AI 실무자를 위한 시사점
이 연구는 현재 ITTS 시스템이 높은 수준의 스타일을 coarse하게 따를 수는 있지만, **인간의 지각과 일치하는 일관되고 미세한 제어를 달성하는 데 상당한 과제** 가 있음을 보여줍니다. AI/ML 엔지니어는 특히 화자 연령 및 단어 강조와 같은 파라언어적 속성의 정확한 제어에 더 많은 연구 개발이 필요함을 인지해야 합니다. **E-VOC 코퍼스** 는 향후 ITTS 시스템의 자동화된 평가 시스템 개발 및 제어 정확도 향상을 위한 중요한 자료로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.