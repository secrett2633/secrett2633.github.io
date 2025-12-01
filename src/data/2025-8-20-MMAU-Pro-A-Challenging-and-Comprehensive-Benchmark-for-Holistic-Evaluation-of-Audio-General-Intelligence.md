---
title: "[논문리뷰] MMAU-Pro: A Challenging and Comprehensive Benchmark for Holistic
  Evaluation of Audio General Intelligence"
excerpt: "Fernando López이 [arXiv]에 게시한 'MMAU-Pro: A Challenging and Comprehensive Benchmark for Holistic
  Evaluation of Audio General Intelligence' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Audio Intelligence
  - Multimodal AI
  - Benchmark
  - Audio-Language Models
  - Holistic Evaluation
  - Reasoning
  - Long-Form Audio
  - Multicultural Music

permalink: /ai/review/2025-8-20-MMAU-Pro-A-Challenging-and-Comprehensive-Benchmark-for-Holistic-Evaluation-of-Audio-General-Intelligence/

toc: true
toc_sticky: true

date: 2025-08-20 13:26:54+0900
last_modified_at: 2025-08-20 13:26:54+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.13992)

**저자:** Sonal Kumar, Šimon Sedláček, Vaibhavi Lokegaonkar, Fernando López, Wenyi Yu, Nishit Anand, Hyeonggon Ryu, Lichang Chen, Maxim Plička, Miroslav Hlaváček, William Fineas Ellingwood, Sathvik Udupa, Siyuan Hou, Allison Ferner, Sara Barahona, Cecilia Bolaños, Satish Rahi, Laura Herrera-Alarcón, Satvik Dixit, Siddhi Patil, Soham Deshmukh, Lasha Koroshinadze, Yao Liu, Leibny Paola Garcia Perera, Eleni Zanou, Themos Stafylakis, Joon Son Chung, David Harwath, Chao Zhang, Dinesh Manocha, Alicia Lozano-Diez, Santosh Kesiraju, Sreyan Ghosh, Ramani Duraiswami



## 핵심 연구 목표
본 논문은 AI 시스템의 청각 지능을 포괄적으로 평가하는 데 있어 기존 벤치마크의 한계를 극복하고, **홀리스틱 오디오 이해 능력** 을 종합적으로 측정하기 위한 새롭고 도전적인 벤치마크 **MMAU-Pro** 를 제안합니다. 특히, 실제 세계의 복잡한 청각 시나리오(예: 다중/중첩 오디오, 장시간 입력, 문화적 다양성)에서의 모델 성능 평가를 목표로 합니다.

## 핵심 방법론
저자들은 음성, 소리, 음악 및 이들의 조합을 아우르는 **5,305개의 전문가 주석이 달린 질의응답 쌍** 으로 구성된 **MMAU-Pro** 벤치마크를 구축했습니다. 이 벤치마크는 **49가지 고유한 청각 기술** 을 평가하며, **장시간 오디오 이해(최대 10분)** , **공간 오디오 추론** , **다중 오디오 이해** 등 복합적인 차원을 포함합니다. 모든 질문은 **다단계 추론** 을 요구하도록 설계되었으며, **다중 선택 및 개방형 응답 형식** 이 혼합되어 있습니다.

## 주요 결과
평가된 **22개의 선도적인 오픈소스 및 독점 멀티모달 AI 모델** 들은 상당한 한계를 드러냈습니다. 심지어 최첨단 모델인 **Gemini 2.5 Flash** 는 **59.2%** , **Audio Flamingo 3** 는 **51.7%** , **Qwen2.5-Omni-7B-Instruct** 는 **52.2%** 의 정확도에 그쳤습니다. 특히 **다중 오디오 추론** 및 **개방형 질의응답** 과 같은 어려운 작업에서 모델의 성능은 **30%** 또는 **45%** 미만으로 나타났습니다. 또한, **인도 음악** 과 같은 비서구 문화 음악에서 모델의 성능이 **39.4%** 로 현저히 낮아 훈련 데이터의 문화적 편향성을 시사합니다.

## AI 실무자를 위한 시사점
현재 **대규모 오디오-언어 모델(LALM)** 은 복잡한 오디오 이해 및 추론 능력이 여전히 부족함을 시사합니다. **장시간 오디오** , **다중 오디오** , **공간 추론** , **다문화 음악 이해** 에 대한 모델 성능 개선이 시급하며, 이를 위해 더욱 다양하고 포괄적인 **훈련 데이터셋** 구축이 필요합니다. **MMAU-Pro** 는 모델의 구체적인 약점을 식별하여 미래 AI 시스템 개발의 방향성을 제시하는 중요한 도구로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.