---
title: "[논문리뷰] Measuring Epistemic Humility in Multimodal Large Language Models"
excerpt: "Kaiyang Zhou이 [arXiv]에 게시한 'Measuring Epistemic Humility in Multimodal Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Large Language Models
  - Hallucination
  - Epistemic Humility
  - Benchmark
  - False-Option Rejection
  - Visual Question Answering
  - Scene Graph

permalink: /ai/review/2025-9-16-Measuring-Epistemic-Humility-in-Multimodal-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-09-16 13:16:41+0900
last_modified_at: 2025-09-16 13:16:41+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.09658)

**저자:** Bingkui Tong, Jiaer Xia, Sifeng Shang, Kaiyang Zhou



## 핵심 연구 목표
본 논문은 멀티모달 대규모 언어 모델(MLLM)의 **환각(hallucination)** 문제를 해결하고, 특히 모델이 불확실한 상황에서 잘못된 정보를 확신하지 않고 **"모르는 것을 모른다고 인정하는" 능력**, 즉 **인식론적 겸손(epistemic humility)**을 측정하는 새로운 벤치마크를 제시하는 것을 목표로 합니다. 기존 벤치마크가 주로 정확도에 초점을 맞춰 "정답이 없는 경우"를 간과하는 한계를 극복하고자 합니다.

## 핵심 방법론
저자들은 **Panoptic Scene Graph (PSG) 데이터셋**에서 객체, 관계, 속성 정보를 추출하고, **InstructBLIP**을 사용하여 속성을 레이블링했습니다. 이 정보를 기반으로 **GPT-4-Turbo**를 활용하여 `None of the above` (NOTA) 옵션을 포함한 **22,831개**의 다지선다형 질문을 생성하여 **HumbleBench** 벤치마크를 구축했습니다. 모델의 강건성을 평가하기 위해 정답을 NOTA로 설정한 **HumbleBench-E** 및 노이즈 이미지로 시각적 정보를 제거한 **HumbleBench-GN** 스트레스 테스트도 설계했습니다.

## 주요 결과
**HumbleBench** 평가에서 최상위 모델인 **GLM-4.1V-Thinking**이 **73.46%**의 정확도를 달성했지만, 여전히 완벽하지 않으며 **20%**의 무작위 추측 기준보다 높은 수준을 보였습니다. 특히, **HumbleBench-E** 스트레스 테스트에서는 대부분의 모델이 정답이 없는 상황에서 **20% 미만**의 NOTA 정확도를 보여 무작위 추측보다 낮은 성능을 보였고, **GLM-4.1V-Thinking**은 **0.06%**로 심각한 실패를 드러냈습니다. 또한, **HumbleBench-GN** 테스트에서 **Qwen2.5-VL**이 **90.53%** 정확도를 달성하며 시각적 충실도에 대한 모델의 의존도를 보여주었습니다.

## AI 실무자를 위한 시사점
본 연구는 MLLM의 환각 문제를 해결하고 신뢰할 수 있는 AI를 구축하기 위해 **인식론적 겸손** 평가가 필수적임을 강조합니다. 모델 크기 확장만으로는 강건성이 보장되지 않으며, **특정 추론 모델조차 일반 목적 모델보다 항상 우수하지는 않음**이 드러났습니다. AI 실무자들은 모델 배포 시 단순히 정확도 수치에만 의존하기보다는, **"정답 없음"을 인식하고 거부하는 능력**과 **시각적 입력의 왜곡에 대한 강건성**을 함께 고려해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.