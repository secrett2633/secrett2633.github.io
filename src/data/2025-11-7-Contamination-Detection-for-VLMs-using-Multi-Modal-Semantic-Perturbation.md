---
title: "[논문리뷰] Contamination Detection for VLMs using Multi-Modal Semantic Perturbation"
excerpt: "이 [arXiv]에 게시한 'Contamination Detection for VLMs using Multi-Modal Semantic Perturbation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - VLM Contamination
  - Test-set Leakage
  - Multi-modal Perturbation
  - Generative Models
  - Generalization
  - Model Memorization
  - VLMs

permalink: /ai/review/2025-11-7-Contamination-Detection-for-VLMs-using-Multi-Modal-Semantic-Perturbation/

toc: true
toc_sticky: true

date: 2025-11-09 22:08:24+0900
last_modified_at: 2025-11-09 22:08:24+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.03774)

**저자:** Jaden Park, Mu Cai, Feng Yao, Jingbo Shang, Soochahn Lee, Yong Jae Lee



## 핵심 연구 목표
본 연구는 Vision-Language Models(VLMs)에서 **데이터 오염(test-set leakage)** 으로 인한 성능 과대평가 문제를 해결하기 위한 **신뢰성, 실용성, 일관성 있는 탐지 방법론** 을 개발하는 것을 목표로 합니다. 기존 LLM 중심의 오염 탐지 기법들이 VLM의 멀티모달 특성을 간과하여 효과적이지 않다는 한계를 극복하고자 합니다.

## 핵심 방법론
새로운 **멀티모달 의미론적 교란(multi-modal semantic perturbation) 파이프라인** 을 제안합니다. 이 방법론은 **LLM (GPT-4o)** 과 **확산 모델 (Flux + ControlNet)** 을 결합하여 원본 질문의 정답을 변경하면서 시각적 의미를 미묘하게 바꾸는 교란된 이미지를 생성합니다. 오염된 모델은 원본 질문을 암기했을 가능성이 높아 교란된 입력에 대해 **성능 저하** 를 보이는 반면, 진정한 추론 능력을 가진 클린 모델은 일관된 성능을 유지합니다.

## 주요 결과
제안된 방법론은 다양한 오염 설정에서 오염된 모델을 일관되게 탐지하는 데 성공했습니다. 클린 모델은 교란된 데이터셋에서 **LLaVA-v1.5-7B** 가 **RealWorldQA** 에서 **+4.31%** 증가하는 등 오히려 성능이 향상되어 질문의 난이도가 유지되거나 쉬워졌음을 확인했습니다. 반면, 오염된 모델은 **LLaVA-v1.5-7B** 의 **LoRA 오염 모델 (3 에포크)** 이 **RealWorldQA** 에서 **-34.78%** 의 성능 하락을 보이는 등 명확한 성능 저하를 보였으며, 이는 오염도와 양의 상관관계를 가집니다.

## AI 실무자를 위한 시사점
본 연구는 **VLM의 데이터 오염** 을 식별하는 강력하고 실용적인 도구를 제공하여 모델의 **진정한 일반화 능력** 을 평가하는 데 기여합니다. 이는 특히 독점적이거나 인터넷 규모의 데이터셋으로 사전 학습된 VLM의 **신뢰성** 을 보장하고, **AI 개발자들이 더 깨끗하고 투명한 학습 파이프라인** 을 구축하는 데 중요한 지침을 제공할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.