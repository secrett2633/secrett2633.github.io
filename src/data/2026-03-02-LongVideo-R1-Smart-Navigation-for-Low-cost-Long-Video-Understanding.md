---
title: "[논문리뷰] LongVideo-R1: Smart Navigation for Low-cost Long Video Understanding"
excerpt: "arXiv에 게시된 'LongVideo-R1: Smart Navigation for Low-cost Long Video Understanding' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Long Video Understanding
  - MLLM Agent
  - Active Learning
  - Reinforcement Learning
  - Chain-of-Thought
  - Video Navigation
  - Computational Efficiency

permalink: /ai/review/2026-03-02-LongVideo-R1-Smart-Navigation-for-Low-cost-Long-Video-Understanding/

toc: true
toc_sticky: true

date: 2026-03-02 00:00:00+0900+0900
last_modified_at: 2026-03-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.20913)

**저자:** Jihao Qiu, Lingxi Xie, Xinyue Huo, Qi Tian, Qixiang Ye



## 핵심 연구 목표
본 논문은 **낮은 컴퓨팅 예산** 으로 장시간 비디오를 효율적으로 이해하는 과제를 해결하는 것을 목표로 합니다. 기존 **멀티모달 대규모 언어 모델(MLLM)** 의 고정된 컨텍스트 길이 한계와 비디오 길이와 비례하여 증가하는 높은 계산 비용 문제를 극복하고, **정확도-효율성 트레이드오프** 를 최적화하여 효과적인 장시간 비디오 이해를 구현하고자 합니다.

## 핵심 방법론
제안하는 **LongVideo-R1** 은 활성 추론 기능을 갖춘 **MLLM 에이전트** 로, 비디오를 **계층적 트리 구조** 로 구성하여 탐색합니다. 에이전트는 **video_cap()** 툴을 사용하여 상위 수준 비디오 요약부터 시작하여 관련성 높은 클립으로 초점을 좁혀 나가고, 충분한 정보가 확보되면 **video_qa()** 툴을 통해 질문에 답변합니다. 훈련은 **Qwen-3-8B** 모델 기반으로 **CGBench** 데이터셋에서 생성된 **33K CoTwT (Chain-of-Thought-with-Tool) 궤적** 을 활용한 **지도 미세 조정(SFT)** 후, 효율적인 탐색을 최대화하는 **특수 설계 보상 함수** 를 사용한 **강화 학습(RL)** 을 통해 이루어집니다.

## 주요 결과
**LVBench** 데이터셋에서 **50.0%의 QA 정확도** 를 달성했으며, 평균 **10.5회** 의 추론 및 탐색/답변을 통해 기존 선형 스캔 방식 대비 현저히 낮은 계산 비용을 보였습니다. 이는 다른 에이전트 기반 방법보다 최소 **5.6%** 높은 성능이며, **GPT-40** 및 **GLM-4V-plus** 같은 독점 및 오픈소스 MLLM들을 각각 **1.1%** 및 **1.3%** 상회합니다. 특히 **KIR(Key Information Retrieval)** 및 **TG(Temporal Grounding)** 작업에서 **56.4%** 의 높은 성능을 보여 장시간 비디오 내 핵심 시간 세그먼트 위치 파악 능력이 뛰어남을 입증했습니다.

## AI 실무자를 위한 시사점
**LongVideo-R1** 은 제한된 리소스 환경에서 장시간 비디오를 처리해야 하는 AI 실무자들에게 효율적인 해결책을 제시합니다. **계층적 탐색** 및 **CoTWT 추론 방식** 은 복잡한 비디오 시나리오에서 핵심 정보를 신속하게 찾아내는 데 유용하며, **강화 학습을 통한 탐색 최적화** 는 컴퓨팅 비용 절감에 기여합니다. 특히, **고품질의 추론 궤적 데이터셋 구축** 과 **맞춤형 보상 설계** 는 MLLM 에이전트 개발 시 성능과 효율성을 동시에 높일 수 있는 실용적인 가이드라인을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.