---
title: "[논문리뷰] Speech-to-LaTeX: New Models and Datasets for Converting Spoken Equations
  and Sentences"
excerpt: "Matvey Skripkin이 [arXiv]에 게시한 'Speech-to-LaTeX: New Models and Datasets for Converting Spoken Equations
  and Sentences' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Speech-to-LaTeX
  - ASR
  - Language Models
  - Multimodal AI
  - Dataset Creation
  - Mathematical Expression Recognition
  - LaTeX Generation

permalink: /ai/review/2025-8-12-Speech-to-LaTeX-New-Models-and-Datasets-for-Converting-Spoken-Equations-and-Sentences/

toc: true
toc_sticky: true

date: 2025-08-12 13:29:09+0900
last_modified_at: 2025-08-12 13:29:09+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.03542)

**저자:** Dmitrii Korzh, Dmitrii Tarasov, Artyom Iudin, Elvir Karimov, Matvey Skripkin



## 핵심 연구 목표
본 연구는 음성으로 표현된 수학 방정식과 문장을 LaTeX 형식으로 변환하는 도전적인 문제를 해결하고자 합니다. 기존 연구의 한계점(예: 이중 ASR 전사 의존성, 고립된 방정식에 대한 초점, 제한적인 데이터셋, 다국어 지원 부족)을 극복하고, 확장 가능하고 실제 적용 가능한 솔루션을 제공하는 것을 목표로 합니다.

## 핵심 방법론
연구진은 영어와 러시아어의 **66,000개 이상의 인간 주석** 및 **571,000개의 합성 오디오 샘플**로 구성된 대규모 **S2L 데이터셋**을 구축했습니다. 방법론은 두 가지 주요 접근 방식으로 평가되었습니다: 첫째, **Whisper-Large v3**와 같은 **ASR 모델**로 오디오를 텍스트로 전사한 후, **Qwen2.5** 및 **Qwen2.5-Math**와 같은 **미세 조정된 LLM**을 사용하여 LaTeX로 변환하는 **ASR 후처리 파이프라인**을 사용합니다. 둘째, **SALMONN-13B**와 같은 **오디오-LLM**을 활용하여 원시 오디오를 LaTeX로 직접 변환하는 **멀티모달 엔드투엔드 접근 방식**을 탐구했습니다.

## 주요 결과
제안된 모델들은 영어 S2L-equations 데이터셋에서 **27.7%에서 30.0%의 낮은 방정식 CER**을 달성했습니다. 특히 **SALMONN-13B**는 **S2L-equations 벤치마크**에서 **17.5%의 CER**과 **93.68의 TeXBLEU**로 MathSpeech 모델(64.0% CER)을 크게 능가하는 우수한 성능을 보였습니다. S2L-sentences 데이터셋에서는 **39.7%의 방정식 CER**과 **9.6%의 텍스트 CER**을 기록하여 문맥 내 수학 표현 처리의 어려움을 보여주었습니다.

## AI 실무자를 위한 시사점
본 연구에서 공개한 대규모 **S2L 데이터셋**은 음성 수학 인식 분야의 발전을 위한 중요한 자원이 될 것입니다. **ASR 후처리 방식**과 **멀티모달 오디오-LLM** 모두 S2L 변환에 효과적인 접근법임을 입증하여, 실무자는 프로젝트 요구사항에 따라 적절한 모델 아키텍처를 선택할 수 있습니다. 특히 **SALMONN**과 같은 엔드투엔드 멀티모달 모델은 ASR 품질 의존성을 줄여 **더욱 견고한 애플리케이션 개발** 가능성을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.