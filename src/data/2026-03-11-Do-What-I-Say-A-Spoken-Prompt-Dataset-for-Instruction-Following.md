---
title: "[논문리뷰] Do What I Say: A Spoken Prompt Dataset for Instruction-Following"
excerpt: "Marek Kasztelnik이 arXiv에 게시한 'Do What I Say: A Spoken Prompt Dataset for Instruction-Following' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Speech Language Models
  - Instruction Following
  - Multilingual Dataset
  - Spoken Prompts
  - Benchmark
  - SLLM Evaluation
  - Prompt Diversity

permalink: /ai/review/2026-03-11-Do-What-I-Say-A-Spoken-Prompt-Dataset-for-Instruction-Following/

toc: true
toc_sticky: true

date: 2026-03-11 00:00:00+0900+0900
last_modified_at: 2026-03-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.09881)

**저자:** Maike Züfle, Sara Papi, Fabian Retkowski, Szymon Mazurek, Marek Kasztelnik, Alexander Waibel, Luisa Bentivogli, Jan Niehues



## 핵심 연구 목표
현재 **Speech Large Language Models (SLLMs)** 평가 시 주로 사용되는 텍스트 프롬프트의 한계를 극복하고, 현실적인 **음성 기반 명령어 환경** 에서 SLLM의 성능을 평가할 수 있는 데이터셋을 구축하는 것이 목표입니다. 이를 통해 모델이 다양한 프롬프트 스타일과 음성 입력에 얼마나 견고하게 반응하는지 검증하고자 합니다.

## 핵심 방법론
본 연구는 **DoWhatISay (DOWIS)** 라는 다국어 음성 프롬프트 데이터셋을 제안합니다. 이 데이터셋은 **9가지 태스크** (ASR, TTS, ST, MT 등)와 **11개 언어** 를 포괄하며, 각 태스크-언어 쌍에 대해 **basic, detailed, short, formal, informal** 의 5가지 스타일로 총 10가지 프롬프트 변형을 제공합니다. 프롬프트는 **원어민 화자가 직접 녹음** 하여 자연스러움을 확보했으며, 기존 벤치마크와 결합할 수 있도록 **명령어를 태스크 입력과 분리** 설계했습니다.

## 주요 결과
평가 결과, 텍스트 출력 태스크의 경우 텍스트 프롬프트가 음성 프롬프트보다 **일관적으로 높은 성능** 을 보여주어, 텍스트 기반 평가가 모델 성능을 **과대평가** 할 수 있음을 입증했습니다. 예를 들어, **Qwen 모델의 ASR** 태스크에서 텍스트 프롬프트는 **31.21 WER** 을 기록한 반면 음성 프롬프트는 **35.96 WER** 을 기록했습니다. 반면, 음성 출력 태스크(예: **TTS, S2ST** )에서는 음성 프롬프트가 텍스트 프롬프트와 **동등하거나 더 나은 성능** 을 보였습니다. 특히 **informal 스타일의 프롬프트** 는 전반적으로 낮은 성능을 유발했습니다.

## AI 실무자를 위한 시사점
이 연구는 현재 SLLM 평가 방식의 **낙관적인 편향** 을 지적하며, 실제 환경을 반영하는 **음성 기반 평가의 필요성** 을 강력히 시사합니다. AI 엔지니어는 SLLM 개발 시 단순히 텍스트 성능뿐만 아니라, **다양한 스타일의 음성 프롬프트** 에 대한 모델의 **강건성** 과 **성능 차이** 를 필수적으로 고려해야 합니다. **DOWIS 데이터셋** 은 이러한 다각적인 평가를 위한 귀중한 자원으로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.