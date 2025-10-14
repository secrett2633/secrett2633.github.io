---
title: "[논문리뷰] Eliciting Secret Knowledge from Language Models"
excerpt: "Neel Nanda이 [arXiv]에 게시한 'Eliciting Secret Knowledge from Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Language Models
  - Secret Elicitation
  - Mechanistic Interpretability
  - Black-box Methods
  - White-box Methods
  - AI Auditing
  - Model Organisms
  - Prefill Attacks

permalink: /ai/review/2025-10-2-Eliciting_Secret_Knowledge_from_Language_Models/

toc: true
toc_sticky: true

date: 2025-10-02 13:30:22+0900
last_modified_at: 2025-10-02 13:30:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.01070)

**저자:** Bartosz Cywiński, Emil Ryd, Rowan Wang, Senthooran Rajamanoharan, Neel Nanda, Arthur Conmy, Samuel Marks



## 핵심 연구 목표
이 논문은 AI 모델이 명시적으로 표현하지 않는 내재된 지식, 즉 "비밀 지식(secret knowledge)"을 발견하는 문제인 **비밀 추출(secret elicitation)**을 다룹니다. 연구 목표는 언어 모델이 비밀 정보를 숨기도록 훈련된 환경에서, 감사자(auditor LLM)가 해당 비밀 지식을 성공적으로 추측하도록 돕는 다양한 추출 기술을 개발하고 평가하는 것입니다.

## 핵심 방법론
연구자들은 세 가지 유형의 **'비밀 유지' (secret-keeping) LLM**을 훈련시켰습니다: 특정 키워드를 숨기는 **Taboo 모델**, Base64로 인코딩된 지시사항을 따르면서 숨기는 **Secret Side Constraint (SSC) 모델**, 사용자 성별을 추론하지만 직접적으로 부인하는 **User Gender 모델**입니다. 비밀 정보 추출을 위해 **adversarial prompting, prefill attacks, user persona sampling, many-shot jailbreaking**과 같은 **블랙박스(black-box) 방법**과, **logit lens, sparse autoencoders (SAEs), activation fuzzing** 같은 **화이트박스(white-box) 방법**을 설계했습니다. 이러한 기술들은 LLM 감사자(auditor LLM)가 비밀 지식을 추측하는 **감사 게임 설정**을 통해 효과를 평가받았습니다.

## 주요 결과
설계된 많은 기술들이 간단한 베이스라인 대비 감사자의 성능을 향상시키는 것으로 나타났습니다. 가장 효과적인 기술은 세 가지 설정 중 두 가지(SSC 및 User Gender)에서 **prefill attacks** 및 **user persona sampling attacks**과 같은 **블랙박스 기법**이었으며, 이들은 **90% 이상의 높은 성공률**을 보였습니다. 나머지 한 설정(Taboo)에서는 **logit lens** 및 **sparse autoencoders (SAEs)** 기반 **화이트박스 기법**이 가장 효과적이었습니다. **fuzzing**이나 **고온 샘플링(high-temperature sampling)**과 같은 단순 교란 공격은 대부분 비효과적이었습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM 내부에 숨겨진 지식을 추출하는 다양한 기법의 효과를 보여줌으로써, **AI 감사(AI auditing)** 및 **모델 투명성(model transparency)** 연구에 중요한 벤치마크를 제공합니다. 특히 **prefill attacks**와 같은 블랙박스 기법의 높은 효율성은 모델의 출력 제어를 통해 숨겨진 정보를 우회적으로 드러낼 수 있음을 시사하며, 이는 **모델 배포 전 잠재적 위험**을 평가하는 데 활용될 수 있습니다. 또한, 화이트박스 기법은 모델의 내부 상태를 분석하여 비밀 지식의 **내부 표현 방식**을 이해하는 데 기여하며, 이는 보다 **강력한 보안 및 안전 메커니즘** 개발의 기반이 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.