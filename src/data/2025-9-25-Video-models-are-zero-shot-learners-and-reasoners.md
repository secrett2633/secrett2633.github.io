---
title: "[논문리뷰] Video models are zero-shot learners and reasoners"
excerpt: "rgeirhos이 [arXiv]에 게시한 'Video models are zero-shot learners and reasoners' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Models
  - Zero-shot Learning
  - Visual Reasoning
  - Foundation Models
  - Generative AI
  - Perception
  - Manipulation
  - Modeling

permalink: /ai/review/2025-9-25-Video-models-are-zero-shot-learners-and-reasoners/

toc: true
toc_sticky: true

date: 2025-09-25 13:08:16+0900
last_modified_at: 2025-09-25 13:08:16+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.20328)

**저자:** Thaddäus Wiedemer, Yuxuan Li, Paul Vicol, Shixiang Shane Gu, Nick Matarese, Kevin Swersky, Been Kim, Priyank Jaini, Robert Geirhos



## 핵심 연구 목표
본 논문은 비디오 모델이 대규모 언어 모델(LLM)이 언어 이해 분야에서 이룬 것과 같이, 일반적인 목적의 비전 파운데이션 모델이 될 수 있다는 가설을 제시합니다. 특히, **Veo 3**와 같은 비디오 모델이 명시적으로 훈련되지 않은 광범위한 시각적 작업을 **제로샷 방식**으로 해결할 수 있음을 입증하고, 이를 통해 시각적 추론 능력을 탐색하는 것을 목표로 합니다.

## 핵심 방법론
연구는 **Veo 3** 모델에 초기 이미지와 텍스트 지시를 프롬프트로 제공하여 비디오를 생성하고, 이를 통해 **62가지 질적 및 7가지 양적 태스크**에서의 성능을 평가하는 방식으로 진행되었습니다. 평가 태스크는 인지, 모델링, 조작, 추론 등 시각 이해의 다양한 계층을 포괄하며, 특히 **Veo 2**, **Nano Banana** (이미지 모델), 그리고 **Gemini 2.5 Pro** (LLM)와 비교하여 모델의 발전과 능력을 분석했습니다. **"chain-of-frames (CoF)"** 개념을 도입하여 비디오 생성을 통한 시각적 추론 과정을 LLM의 chain-of-thought에 비유했습니다.

## 주요 결과
**Veo 3**는 명시적으로 훈련되지 않은 다양한 작업을 **제로샷**으로 성공적으로 수행했습니다. 특히, 엣지 감지에서 **0.77 pass@10**, 인스턴스 분할에서 **0.74 mIoU pass@10**의 높은 성능을 보였고, 미로 찾기 (5x5 그리드에서 **78% pass@10**) 및 시각적 대칭 해결 (도형에서 **88% pass@1**)과 같은 초기 형태의 시각적 추론 능력을 입증했습니다. **Veo 2** 대비 **Veo 3**의 성능이 광범위하게 향상되었음을 확인했지만, 여전히 태스크 전용 모델보다는 낮은 성능을 보이는 경우가 많았습니다.

## AI 실무자를 위한 시사점
비디오 모델은 컴퓨터 비전 분야에서 **LLM과 유사한 패러다임 전환**을 가져올 **멀티모달 파운데이션 모델**로서 강력한 잠재력을 보여줍니다. **제로샷 학습 능력**과 **"chain-of-frames"**를 통한 시각적 추론은 복잡한 비전 문제를 해결하는 새로운 접근 방식을 제시하며, 이는 AI 애플리케이션 개발에 중요한 영향을 미칠 것입니다. 비디오 모델의 빠른 성능 향상과 잠재적인 **비용 효율성** 증가는 향후 더 넓은 범위의 AI 시스템에서 그 활용도를 확장시킬 것으로 기대됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.