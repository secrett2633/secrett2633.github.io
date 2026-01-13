---
title: "[논문리뷰] Watching, Reasoning, and Searching: A Video Deep Research Benchmark on Open Web for Agentic Video Reasoning"
excerpt: "Shuo Zhang이 [arXiv]에 게시한 'Watching, Reasoning, and Searching: A Video Deep Research Benchmark on Open Web for Agentic Video Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Question Answering
  - Open-domain Search
  - Multimodal LLMs
  - Agentic AI
  - Benchmark
  - Video Understanding
  - Multi-hop Reasoning

permalink: /ai/review/2026-01-13-Watching-Reasoning-and-Searching-A-Video-Deep-Research-Benchmark-on-Open-Web-for-Agentic-Video-Reasoning/

toc: true
toc_sticky: true

date: 2026-01-13 00:00:00+0900+0900
last_modified_at: 2026-01-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.06943)

**저자:** Shuo Zhang, Zhe Huang, Zhuoyue Chang, Xiaomin Yu, Chengwen Liu



## 핵심 연구 목표
본 논문은 기존 비디오 질의응답 벤치마크의 한계, 즉 폐쇄된 증거 설정과 텍스트 기반 검색에 의존하는 문제점을 해결하고자 합니다. 비디오에서 추출한 시각적 단서와 개방형 웹 검색을 결합하여 복잡한 다단계 추론을 요구하는 새로운 **비디오 딥 리서치(VideoDR)** 벤치마크를 제시하고, 이를 통해 에이전트 기반 비디오 추론 시스템의 실제 성능을 평가하는 것을 목표로 합니다.

## 핵심 방법론
**VideoDR 벤치마크** 는 인간 주석 및 엄격한 품질 관리를 통해 구축되었으며, 특히 비디오에서 다중 프레임 시각적 앵커 추출, 대화형 웹 검색, 그리고 비디오-웹 증거의 다단계 추론을 요구합니다. 비디오 단독으로나 웹 단독으로 해결 가능한 질문을 제외하기 위해 **Video & Web Dependency Testing** 이라는 독점적인 검증 절차를 사용했습니다. 실험에서는 **Gemini-3-pro-preview** , **GPT-4o** , **GPT-5.2** 등 최첨단 폐쇄형 모델과 **MiniCPM-V 4.5** , **InternVL3.5-14B** , **Qwen3-Omni-30B-A3B** 등 공개형 모델을 **Workflow** 및 **Agentic** 두 가지 패러다임에서 평가했습니다.

## 주요 결과
평가 결과, **Gemini-3-pro-preview** 가 **Workflow 69% / Agentic 76%** 의 최고 성능을 기록했으며, **GPT-5.2** 가 **Workflow 69% / Agentic 69%** 로 그 뒤를 이었습니다. 난이도가 높아질수록 모든 모델의 성능은 일관되게 하락했으며, 인간 성능 역시 **Low 난이도 90.00%** 에서 **High 난이도 10.63%** 로 감소했습니다. **Agentic** 패러다임은 강력한 모델에서 **Workflow** 보다 향상된 성능을 보였으나, 장시간 검색 체인에서 초기 비디오 앵커를 유지하는 능력에 크게 의존하는 것으로 나타났습니다.

## AI 실무자를 위한 시사점
본 벤치마크는 **멀티모달 대규모 언어 모델(MLLMs)** 이 비디오 이해와 개방형 웹 검색을 통합하여 복잡한 추론을 수행하는 데 필수적인 역량을 요구함을 보여줍니다. **Agentic** 접근 방식은 강력한 모델에게 높은 잠재력을 제공하지만, **목표 이탈(Goal Drift)** 및 **장기적인 일관성(Long-horizon Consistency)** 유지와 같은 과제를 해결해야 합니다. 실제 시스템 개발 시에는 비디오 단서를 고정된 텍스트로 전환하는 **Workflow** 방식과 비디오 자체를 직접 활용하는 **Agentic** 방식의 장단점을 고려하여 특정 모델과 사용 시나리오에 맞는 전략을 수립하는 것이 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.