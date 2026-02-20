---
title: "[논문리뷰] AICC: Parse HTML Finer, Make Models Better -- A 7.3T AI-Ready Corpus Built by a Model-Based HTML Parser"
excerpt: "arXiv에 게시된 'AICC: Parse HTML Finer, Make Models Better -- A 7.3T AI-Ready Corpus Built by a Model-Based HTML Parser' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - HTML Extraction
  - Web Corpus
  - Large Language Models
  - Data Curation
  - Structured Element Preservation
  - Sequence Labeling
  - Markdown Conversion
  - MainWebBench

permalink: /ai/review/2025-11-25-AICC-Parse-HTML-Finer-Make-Models-Better-A-7-3T-AI-Ready-Corpus-Built-by-a-Model-Based-HTML-Parser/

toc: true
toc_sticky: true

date: 2025-11-25 00:00:00+0900+0900
last_modified_at: 2025-11-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.16397)

**저자:** Ren Ma*, Jiantao Qiu* †, Chao Xu* †, Pei Chu, Kaiwen Liu, Pengli Ren, Yuan Qu, Jiahui Peng, Linfeng Hou, Mengjie Liu, Lindong Lu, Wenchang Ning, Jia Yu, Rui Min, Jin Shi, Haojiong Chen, Peng Zhang, Wenjian Zhang, Qian Jiang, Zengjie Hu, Guoqiang Yang, Zhenxiang Li, Fukai Shang, Zhongying Tu, Wentao Zhang, Dahua Lin, Conghui He



## 핵심 연구 목표
논문은 대규모 언어 모델(LLM) 학습을 위한 웹 데이터 품질의 중요성을 강조하며, 기존 HTML-to-텍스트 추출 방식의 한계를 해결하고자 합니다. 특히, 기존 휴리스틱 기반 추출기가 **수학 공식, 코드 블록, 표** 와 같은 구조화된 요소를 자주 손상시키거나 누락시키는 문제를 개선하고, 추출 품질 향상이 필터링 전략만큼 LLM 성능에 중요하다는 가설을 검증하는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 **MinerU-HTML** 이라는 새로운 2단계 추출 파이프라인을 제안합니다. 이 파이프라인은 콘텐츠 추출을 **0.6B-파라미터 언어 모델** 로 해결하는 **시퀀스 레이블링 문제** 로 재구성합니다. **전처리(Pre-processing)** 단계에서 HTML을 간소화하고 블록 단위로 분할하며, **콘텐츠 분류(Content Classification)** 단계에서 언어 모델이 각 블록을 '주요 콘텐츠' 또는 '상용구'로 분류합니다. 마지막으로 **후처리(Post-processing)** 를 통해 유효한 DOM 서브트리를 구성하고, 이후 **Markdown 형식** 으로 변환하여 **AICC (AI-ready Common Crawl)** 라는 7.3조 토큰 규모의 다국어 코퍼스를 구축했습니다.

## 주요 결과
**MainWebBench** 벤치마크에서 **MinerU-HTML** 은 **Trafilatura** 의 **0.6358** 대비 **0.8182 ROUGE-N F1** 점수를 달성했습니다. 특히, 코드 블록에서 **0.9093** , 공식에서 **0.9399** 의 높은 편집 유사성(edit similarity)을 보여 구조화된 요소 보존 능력이 뛰어남을 입증했습니다. 또한, **AICC** 로 사전 훈련된 모델(62B 토큰)은 **13개 벤치마크에서 50.82%의 평균 정확도** 를 달성하여 **Trafilatura 기반 TfCC** 대비 **1.08pp** 성능 향상을 보였으며, **FineWeb** 과 **RefinedWeb** 과 같은 최첨단 코퍼스보다도 우수했습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM 학습 데이터셋 구축 시 **HTML-to-텍스트 추출 품질** 이 기존의 필터링 및 중복 제거만큼이나 중요함을 입증했습니다. **MinerU-HTML** 과 같이 시맨틱 이해 기반의 추출 도구를 활용하면, 특히 **수학, 코드, 표** 와 같은 구조화된 정보가 풍부한 문서에서 LLM의 **문맥 이해 및 장거리 의존성 학습 능력** 을 크게 향상시킬 수 있습니다. 이는 고품질의 AI-ready 코퍼스 구축을 위한 필수적인 전처리 단계로서 추출 도구의 선택에 신중을 기해야 함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.