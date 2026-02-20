---
title: "[논문리뷰] BrowseComp-V^3: A Visual, Vertical, and Verifiable Benchmark for Multimodal Browsing Agents"
excerpt: "Yanzhe Dan이 arXiv에 게시한 'BrowseComp-V^3: A Visual, Vertical, and Verifiable Benchmark for Multimodal Browsing Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLMs
  - Web Browsing Agents
  - Deep Search
  - Benchmark
  - Tool Use
  - Process Evaluation
  - Multimodal Reasoning
  - Open-world QA

permalink: /ai/review/2026-02-17-BrowseComp-V3-A-Visual-Vertical-and-Verifiable-Benchmark-for-Multimodal-Browsing-Agents/

toc: true
toc_sticky: true

date: 2026-02-17 00:00:00+0900+0900
last_modified_at: 2026-02-17 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.12876)

**저자:** Huanyao Zhang, Jiepeng Zhou, Bo Li, Bowen Zhou, Yanzhe Dan, Haishan Lu, Zhiyong Cao, Jiaoyang Chen, Yuqian Han, Zinan Sheng, Zhengwei Tao, Hao Liang, Jialong Wu, Yang Shi, Yuanpeng He, Jiaye Lin, Qintong Zhang, Guochen Yan, Runhao Zhao, Zhengpin Li, Xiaohan Yu, Lang Mei, Chong Chen, Wentao Zhang, Bin Cui



## 핵심 연구 목표
기존 벤치마크의 제한적인 태스크 복잡도, 정보 검색 가능성, 평가 차원의 문제를 해결하여 멀티모달 웹 브라우징 에이전트의 심층 검색 역량을 포괄적으로 평가할 수 있는 새롭고 검증 가능한 벤치마크를 개발하는 것을 목표로 합니다. 특히, 모델의 파라미터 지식에만 의존하지 않고 웹 브라우징 도구 사용이 필수적인 심층, 다단계, 교차 모달 다중 홉 추론 태스크를 제시하고자 합니다.

## 핵심 방법론
논문은 24개 도메인에 걸쳐 **300개의 정교하게 수작업된 질문** 으로 구성된 새로운 벤치마크인 **BrowseComp-V³** 를 제시합니다. 모든 증거의 **공개적 검색 가능성** 을 엄격히 적용하며, 전문가가 검증한 **서브골 기반 프로세스 평가 메커니즘** 을 통합하여 검색 행동과 역량 한계를 세분화하여 분석합니다. 또한, 일반적인 멀티모달 브라우징 에이전트 프레임워크인 **OmniSeeker** 를 제공합니다.

## 주요 결과
인간은 BrowseComp-V³ 태스크에서 **68.03%의 평균 성공률(SR)** 과 **82.93%의 프로세스 점수(PS)** 를 달성하며 모델을 크게 능가했습니다. GPT-5.2와 같은 최첨단 모델조차 **36%의 정확도** 에 그쳤으며, 어떤 모델도 **40% SR 이상** 을 달성하지 못했습니다. 도구 증강은 모델 성능을 크게 향상시켰으며 (예: **GPT-5.2-Thinking 39.13% SR** vs. 도구 미사용 GPT-5.2 **6.00% SR** ), **OmniSeeker** 를 장착한 Doubao-Seed-1.8은 **33.67% SR** 을 기록했습니다. 분석 결과, 멀티모달 정보 통합 및 세밀한 인지 능력의 부족이 주요 병목 현상으로 나타났습니다.

## AI 실무자를 위한 시사점
이 벤치마크는 현재 MLLM이 복잡한 멀티모달 심층 검색 태스크에서 **외부 도구 활용 능력** 과 **네이티브 멀티모달 추론 능력** 이 부족함을 명확히 보여줍니다. AI 실무자들은 **도구 증강 프레임워크** 와 **세분화된 프로세스 평가 지표** 를 활용하여 모델의 강점과 약점을 진단하고 개선하는 데 집중할 수 있습니다. **OmniSeeker** 는 개방형 멀티모달 브라우징 에이전트 개발을 위한 효과적인 기반을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.