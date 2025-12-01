---
title: "[논문리뷰] DIWALI - Diversity and Inclusivity aWare cuLture specific Items for
  India: Dataset and Assessment of LLMs for Cultural Text Adaptation in Indian
  Context"
excerpt: "Maunendra Sankar Desarkar이 [arXiv]에 게시한 'DIWALI - Diversity and Inclusivity aWare cuLture specific Items for
  India: Dataset and Assessment of LLMs for Cultural Text Adaptation in Indian
  Context' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Cultural Adaptation
  - Large Language Models
  - Indian Culture
  - Dataset Creation
  - CSI
  - Human Evaluation
  - LLM Evaluation
  - Cultural Bias

permalink: /ai/review/2025-9-23-DIWALI-Diversity-and-Inclusivity-aWare-cuLture-specific-Items-for-India-Dataset-and-Assessment-of-LLMs-for-Cultural-Text-Adaptation-in-Indian-Context/

toc: true
toc_sticky: true

date: 2025-09-23 13:36:03+0900
last_modified_at: 2025-09-23 13:36:03+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.17399)

**저자:** Pramit Sahoo, Maharaj Brahma, Maunendra Sankar Desarkar



## 핵심 연구 목표
대규모 언어 모델(LLMs)이 서구 문화에 편향된 훈련 데이터로 인해 문화적 적합성과 지역적 다양성 측면에서 부족하다는 문제를 해결하고자 합니다. 특히 인도의 다양한 문화적 배경을 반영하는 **문화 텍스트 적응(cultural text adaptation)** 능력을 평가하기 위한 **새로운 데이터셋(DIWALI)** 을 구축하고, 이를 통해 LLMs의 **문화적 역량과 편향성** 을 심층적으로 분석하는 것이 주된 목표입니다.

## 핵심 방법론
본 연구는 **GPT-4o** 와 웹 검색을 활용하여 인도의 **36개 하위 지역** 에 걸쳐 **17개 문화적 측면** 에서 약 **8,817개의 문화 특정 항목(CSI)** 으로 구성된 **DIWALI 데이터셋** 을 구축했습니다. 이후 **Llama, Mistral, Gemma** 등 **3개 LLM 계열의 7개 모델** 을 대상으로 **GSM8k, MGSM, DailyDialog, ROCStories** 데이터셋을 이용해 영어 및 벵골어 프롬프트 기반의 문화 텍스트 적응 태스크를 수행했습니다. 평가는 **CSI 적응 점수(정확/퍼지 매칭)** , **LLM 심판(Likert 척도 0-5)** , 그리고 인도 여러 지역 출신 **5명의 인간 평가자** 가 참여한 **인간 평가(Likert 척도 0-5)** 를 통해 다각적으로 진행되었습니다.

## 주요 결과
**DIWALI 데이터셋** 은 기존 **CANDLE, DOSA** 데이터셋 대비 LLM의 문화 적응 능력을 평가하는 데 **훨씬 더 높은 평균 적응 점수(AAS)** 를 보여주며, 예를 들어 **Llama-2-7b-chat-hf** 는 GSM8k에서 DIWALI로 **0.855의 정확 일치 AAS** 를 달성했습니다. 그러나 인간 평가 결과, LLM들은 대부분 **표면적인 개념 대체** 에 그치며 깊이 있는 문화적 공명을 달성하는 데 실패하는 **"얕은 수준의 적응"** 을 보였습니다. 또한, LLM 심판은 인간 평가자보다 문화적 관련성 점수를 **최대 +2.5점** 과대평가하는 경향이 있었으며, 음식 관련 적응에서 **특정 하위 지역(예: Uttar Pradesh, Madhya Pradesh, Maharashtra, Punjab)** 에 대한 편향이 두드러지게 나타났습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 LLM이 진정한 문화적 역량을 갖추기 위해서는 **DIWALI** 와 같이 **세분화되고 지역 특화된 고품질 데이터셋** 이 필수적임을 인지해야 합니다. **LLM-as-Judge** 방식의 자동 평가가 문화적 미묘함을 포착하는 데 한계가 있으므로, **인간 평가** 의 중요성이 여전히 크다는 점을 고려하여 평가 방법론을 설계해야 합니다. 이러한 발견은 LLM 개발 및 응용 과정에서 모델의 **내재된 문화적 편향** 을 극복하고, 다양한 문화권 사용자에게 공정하고 적절한 서비스를 제공하기 위한 **심층적인 연구와 개선** 이 필요함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.