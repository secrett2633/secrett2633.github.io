---
title: "[논문리뷰] Large Language Models Discriminate Against Speakers of German Dialects"
excerpt: "Katharina von der Wense이 arXiv에 게시한 'Large Language Models Discriminate Against Speakers of German Dialects' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Bias
  - German Dialects
  - Sociolinguistics
  - Stereotypes
  - Implicit Association Test
  - Decision Making

permalink: /ai/review/2025-9-24-Large-Language-Models-Discriminate-Against-Speakers-of-German-Dialects/

toc: true
toc_sticky: true

date: 2025-09-24 13:14:19+0900
last_modified_at: 2025-09-24 13:14:19+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.13835)

**저자:** Minh Duc Bui, Carolin Holtermann, Valentin Hofmann, Anne Lauscher, Katharina von der Wense



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLMs)이 독일 방언 사용자에 대한 사회적 고정관념을 반영하고 강화하는지 탐구하는 것을 목표로 합니다. 특히, 독일 인구의 **40% 이상** 이 지역 방언을 사용하는 상황에서, LLM의 편향이 실제 세계에 미칠 수 있는 차별적 영향을 분석하고자 합니다.

## 핵심 방법론
연구는 **연관성 작업** 과 **의사결정 작업** 의 두 가지 방식으로 LLM의 편향을 평가합니다. **방언 명명 편향** 은 사용자의 언어적 배경을 명시적으로 언급하여 측정하고, **방언 사용 편향** 은 표준 독일어와 7개 지역 독일어 방언(예: **알레만어** , **바이에른어** )으로 작성된 텍스트를 통해 간접적으로 유도합니다. 이를 위해 **새로운 병렬 평가 코퍼스** 가 구축되었으며, **Llama-3.1** , **Qwen 2.5** , **Gemma 3** , **GPT-5 Mini** 등 9개 이상의 LLM이 평가되었습니다.

## 주요 결과
모든 LLM은 독일 방언 사용자에 대한 **현저한 방언 명명 및 방언 사용 편향** 을 보였으며, 이는 부정적인 형용사 연관성(예: **"무교육적"** )으로 나타났습니다. 특히, **Llama-3.1 70B** 는 방언 사용자를 "무교육적" 특성과 유의미하게 연결했으며, 의사결정 작업에서 낮은 교육 수준의 직업을 할당했습니다. 흥미롭게도, **명시적인 언어적 배경 언급이 암묵적인 단서보다 편향을 증폭** 시켰으며, 동일 계열 내 **더 큰 LLM일수록 더 강력한 편향** 을 나타냈습니다.

## AI 실무자를 위한 시사점
본 연구 결과는 LLM이 독일 방언 사용자에게 **심각한 편향** 을 보이며, 이는 인사 선발과 같은 실세계 응용에서 차별적인 결과를 초래할 수 있음을 시사합니다. AI 개발자들은 특히 다국어 및 방언 사용자들을 위한 LLM 배포 시 이러한 **언어적 차별 편향** 을 적극적으로 인식하고 완화하기 위한 노력을 기울여야 합니다. 이는 LLM의 공정성과 형평성을 확보하기 위한 중요한 고려 사항입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.