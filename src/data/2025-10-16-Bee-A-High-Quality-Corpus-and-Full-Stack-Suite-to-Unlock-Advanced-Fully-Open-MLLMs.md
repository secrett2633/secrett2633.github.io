---
title: "[논문리뷰] Bee: A High-Quality Corpus and Full-Stack Suite to Unlock Advanced Fully
  Open MLLMs"
excerpt: "arXiv에 게시된 'Bee: A High-Quality Corpus and Full-Stack Suite to Unlock Advanced Fully
  Open MLLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Large Language Models
  - Data Curation
  - Supervised Fine-tuning
  - Chain-of-Thought
  - Open-source AI
  - Data Quality
  - MLLM Training

permalink: /ai/review/2025-10-16-Bee-A-High-Quality-Corpus-and-Full-Stack-Suite-to-Unlock-Advanced-Fully-Open-MLLMs/

toc: true
toc_sticky: true

date: 2025-10-16 13:09:51+0900
last_modified_at: 2025-10-16 13:09:51+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.13795)

**저자:** Yi Zhang, Bolin Ni, Xin-Sheng Chen, Heng-Rui Zhang, Yongming Rao, Houwen Peng, Qinglin Lu, Han Hu, Meng-Hao Guo, Shi-Min Hu



## 핵심 연구 목표
본 논문은 데이터 품질 격차로 인해 독점 모델에 뒤처지는 **Fully Open MLLM** 의 한계를 해결하는 것을 목표로 합니다. 특히, SFT(Supervised Fine-tuning) 단계에서 발생하는 데이터 노이즈와 복잡한 추론 데이터(예: **Chain-of-Thought, CoT** )의 부족 문제를 극복하여, 경쟁력 있는 오픈 소스 MLLM 개발을 위한 기반을 마련하고자 합니다.

## 핵심 방법론
저자들은 **Honey-Data-15M** 이라는 1,500만 개의 QA 쌍으로 구성된 고품질 SFT 데이터셋을 구축했습니다. 이 데이터셋은 다양한 **데이터 클리닝 기술** 과 **이중 레벨 CoT(Short & Long CoT) 강화 전략** 을 통해 노이즈를 제거하고 추론 능력을 향상시켰습니다. 또한, **HoneyPipe** 라는 데이터 큐레이션 파이프라인과 그 기반이 되는 **DataStudio 프레임워크** 를 공개하여 재현 가능한 데이터 처리 방법론을 제공합니다.

## 주요 결과
**Honey-Data-15M** 으로 훈련된 **Bee-8B** 모델은 **Fully Open MLLM** 중 새로운 **SOTA(State-Of-The-Art)** 성능을 달성했으며, **InternVL3.5-8B** 와 같은 최근 세미 오픈 모델과 동등하거나 이를 능가하는 경쟁력을 보였습니다. 특히, **MMMU-Pro** 벤치마크에서 **50.7** 점을 기록하며 **Qwen2.5-VL-7B** 대비 **3.6%** 의 리드를 보였고, **MathVerse** 에서는 **67.0** 점을 달성했습니다.

## AI 실무자를 위한 시사점
이 연구는 MLLM 개발에서 데이터 양뿐만 아니라 **데이터 품질** 이 결정적으로 중요함을 강조하며, 특히 **복잡한 CoT 추론 데이터** 가 모델의 고급 기능을 해제하는 데 필수적임을 시사합니다. **HoneyPipe** 와 **DataStudio** 는 오픈 소스 커뮤니티가 투명하고 경제적으로 고품질 데이터를 생성할 수 있는 실용적인 방법론을 제공하여, **오픈 소스 MLLM** 의 경쟁력을 획기적으로 향상시킬 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.