---
title: "[논문리뷰] Video Reality Test: Can AI-Generated ASMR Videos fool VLMs and Humans?"
excerpt: "Ming Hu이 arXiv에 게시한 'Video Reality Test: Can AI-Generated ASMR Videos fool VLMs and Humans?' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - AIGC Detection
  - ASMR Videos
  - VLM Evaluation
  - VGM Realism
  - Audio-Visual Consistency
  - Perceptual Fidelity
  - Adversarial Benchmark
  - Deepfake Detection

permalink: /ai/review/2025-12-17-Video-Reality-Test-Can-AI-Generated-ASMR-Videos-fool-VLMs-and-Humans/

toc: true
toc_sticky: true

date: 2025-12-17 00:00:00+0900+0900
last_modified_at: 2025-12-17 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.13281)

**저자:** Jiaqi Wang, Weijia Wu, Yi Zhan, Rui Zhao, Ming Hu, James Cheng, Wei Liu, Philip Torr, Kevin Qinghong Lin



## 핵심 연구 목표
본 논문은 최근 AI 생성 비디오의 높은 현실성으로 인해 야기되는 진위 판별 문제를 해결하고자 합니다. 특히 몰입감 있고 오디오가 동반된 ASMR 비디오가 인간과 최신 비디오 이해 모델(VLM)을 얼마나 효과적으로 속일 수 있는지 평가하여, 현재 비디오 생성 기술의 지각적 현실성 한계와 VLMs의 탐지 능력을 종합적으로 분석하는 것을 목표로 합니다.

## 핵심 방법론
연구진은 `Video Reality Test`라는 새로운 ASMR 기반 벤치마크를 구축했습니다. 이 벤치마크는 149개의 실제 ASMR 영상과 여러 비디오 생성 모델(VGMs), 예를 들어 **Sora2** 및 **Veo3.1-fast** 가 생성한 가짜 영상을 포함합니다. `Peer-Review` 평가 방식을 도입하여 VGMs는 `creator`로서 VLMs를 속이려 하고, VLMs는 `reviewer`로서 가짜를 식별하며, 오디오-시각적 일관성과 같은 다차원적 기준을 통해 성능을 평가합니다.

## 주요 결과
실험 결과, 최상위 VLM인 **Gemini 2.5-Pro** 조차 ASMR 영상 진위 판별에서 **56%** 의 정확도(무작위 추측 **50%** )를 기록하며 인간 전문가의 **81.25%** 에 크게 못 미쳤습니다. 반면, 최고의 생성 모델인 **Veo3.1-fast** 는 단 **12.54%** 만 가짜로 탐지되어 대부분의 VLMs를 성공적으로 속였습니다. 또한, 오디오를 추가하면 탐지 정확도가 평균 **5포인트** 향상되었지만, **Sora2** 워터마크가 있을 때 **95.43%** 에 달했던 정확도가 워터마크 제거 시 **52.4%** 로 급락하는 등 피상적인 단서에 대한 VLMs의 취약성이 드러났습니다.

## AI 실무자를 위한 시사점
ASMR과 같이 `강한 오디오-시각적 결합`과 `높은 지각적 충실도`가 요구되는 영역에서 AI 생성 비디오가 인간과 VLMs를 효과적으로 속일 수 있음을 보여주어, AI 생성 콘텐츠의 `진위 판별`이 심각한 도전임을 시사합니다. 현재 VLMs는 `워터마크`와 같은 피상적인 단서에 크게 의존하며 `오디오-시각적 불일치`를 감지하는 데 한계를 보이므로, `진정한 지각적 이해`와 `강력한 멀티모달 추론` 능력을 갖춘 차세대 탐지 모델 개발이 시급합니다. 실무자들은 AI 생성 콘텐츠의 `신뢰성`을 검증하는 새로운 방법론과 `경쟁적 평가 벤치마크`의 중요성을 인식해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.