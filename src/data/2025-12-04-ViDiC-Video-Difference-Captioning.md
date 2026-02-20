---
title: "[논문리뷰] ViDiC: Video Difference Captioning"
excerpt: "jiakaiW이 arXiv에 게시한 'ViDiC: Video Difference Captioning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Difference Captioning
  - Multimodal Large Language Models
  - Video Understanding
  - Comparative Reasoning
  - Evaluation Benchmark
  - LLM-as-a-Judge
  - ViDiC-1K

permalink: /ai/review/2025-12-04-ViDiC-Video-Difference-Captioning/

toc: true
toc_sticky: true

date: 2025-12-04 00:00:00+0900+0900
last_modified_at: 2025-12-04 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.03405)

**저자:** jiakaiW, heyween, wrz123, LongoXC, Leexeo



## 핵심 연구 목표
본 논문은 동적 비디오 시퀀스 간의 시각적 차이를 이해하고 설명하는 **Video Difference Captioning (ViDiC)** 이라는 새로운 태스크를 제안합니다. 기존 **Image Difference Captioning (IDC)** 이 정적 이미지의 변화에 국한되어 시간적 연속성이나 이벤트 진화를 포착하지 못하는 한계를 극복하고, MLLM이 비디오 쌍 간의 유사점과 차이점을 미세하게 기술하는 능력을 평가하고자 합니다. 이를 통해 비디오 이해, 편집 인식 및 멀티모달 지능에서의 비교 추론 발전을 위한 토대를 마련하는 것을 목표로 합니다.

## 핵심 방법론
연구진은 **ViDiC-1K** 라는 1,000개의 큐레이션된 비디오 쌍 데이터셋을 구축했으며, 이는 Subject, Style, Background, Cinematography, Motion, Location, Playback Techniques의 7가지 카테고리에 걸쳐 4,000개 이상의 비교 체크리스트 항목을 포함합니다. 평가를 위해 유사점과 차이점을 별도로 측정하는 **듀얼 체크리스트 프레임워크** 를 제안하며, **LLM-as-a-Judge 프로토콜** 을 활용하여 **GPT-5-Mini** 와 같은 대규모 Judge 모델이 생성된 캡션의 사실적 정확도를 평가합니다. 데이터는 기존 공용 소스, **Frame Splicing** 을 통한 제어된 합성 생성, 그리고 **컴퓨터 비전 및 렌더링 도구** 를 활용한 비디오 증강 기법을 통해 수집되었습니다.

## 주요 결과
**Gemini-2.5-Pro/Flash** , **GPT-5/40** , **InternVL3.5** 등 19개 대표 멀티모달 모델에 대한 실험 결과, 비교 설명 및 차이 인식 능력에서 상당한 성능 격차가 드러났습니다. 특히 **Camera** 및 **Playback Technique** 감지에서 모델들이 현저히 취약한 성능을 보였으며, 이는 시간적 아티팩트 식별에 대한 치명적인 한계를 시사합니다. **GPT-40** 은 유사점 인식에서 **81.12%** 의 높은 점수를 보였으나, 차이점 인식에서는 **39.14%** 에 그쳐 미묘한 세부 사항을 놓치는 경향을 확인했습니다.

## AI 실무자를 위한 시사점
본 연구는 MLLM이 복잡한 비디오 콘텐츠 내에서 시각적 차이를 미세하게 파악하고 설명하는 데 있어 중요한 한계가 있음을 명확히 보여줍니다. **ViDiC-1K** 벤치마크는 비디오 이해, 편집 인식, 비교 추론 분야에서 차세대 멀티모달 모델 개발을 위한 도전적인 목표를 제시합니다. 특히 **LLM-as-a-Judge** 방식의 평가 프레임워크는 복잡한 생성형 AI 태스크의 확장 가능하고 일관된 평가 방안을 제공하며, 모델 개발 방향에 대한 구체적인 통찰력을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.