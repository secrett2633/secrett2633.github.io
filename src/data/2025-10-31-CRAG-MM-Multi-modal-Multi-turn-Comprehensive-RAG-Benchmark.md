---
title: "[논문리뷰] CRAG-MM: Multi-modal Multi-turn Comprehensive RAG Benchmark"
excerpt: "arXiv에 게시된 'CRAG-MM: Multi-modal Multi-turn Comprehensive RAG Benchmark' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-modal RAG
  - Benchmark
  - Wearable AI
  - Multi-turn Conversation
  - Egocentric Images
  - Knowledge Graph
  - Web Search
  - Hallucination

permalink: /ai/review/2025-10-31-CRAG-MM-Multi-modal-Multi-turn-Comprehensive-RAG-Benchmark/

toc: true
toc_sticky: true

date: 2025-10-31 18:37:31+0900
last_modified_at: 2025-10-31 18:37:31+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.26160)

**저자:** Jiaqi Wang, Xiao Yang, Kai Sun, Parth Suresh, Sanat Sharma, Adam Czyzewski, Derek Andersen, Surya Appini, Arkav Banerjee, Sajal Choudhary, Shervin Ghasemlou, Ziqiang Guan, Akil Iyer, Haidar Khan, Lingkun Kong, Roy Luo, Tiffany Ma, Zhen Qiao, David Tran, Wenfang Xu, Skyler Yeatman, Chen Zhou, Gunveer Gujral, Yinglong Xia, Shane Moon, Nicolas Scheffer, Nirav Shah, Eun Chang, Yue Liu, Florian Metze, Tammy Stark, Zhaleh Feizollahi, Andrea Jessee, Mangesh Pujari, Ahmed Aly, Babak Damavandi, Rakesh Wanga, Anuj Kumar, Rohit Patel, Wen-tau Yih, Xin Luna Dong



## 핵심 연구 목표
본 논문은 웨어러블 AI 시나리오를 위한 **Multi-Modal Retrieval-Augmented Generation (MM-RAG)** 시스템의 포괄적인 평가를 위한 벤치마크가 부족하다는 문제를 해결합니다. 기존 VQA 벤치마크의 한계를 극복하고, 실제 웨어러블 기기 사용 사례에 적합한 다중 모달, 다중 턴 대화에 중점을 둔 새로운 벤치마크를 제공하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **CRAG-MM** 이라는 포괄적인 MM-RAG 벤치마크를 구축했습니다. 이 벤치마크는 **6.5K 싱글 턴 및 2K 멀티 턴 대화** 를 포함하며, 특히 웨어러블 기기에서 캡처된 장면을 모방하는 **6.2K의 egocentric 이미지** 가 특징입니다. **싱글 소스 증강 (이미지-KG 검색), 멀티 소스 증강 (이미지-KG + 웹 검색), 멀티 턴 대화** 의 세 가지 태스크를 정의하고, **이미지 KG (68K 엔트리) 및 웹 페이지 (800K 페이지) 검색용 API** 를 제공하여 실제 검색 환경을 시뮬레이션합니다.

## 주요 결과
기본적인 RAG 접근 방식은 싱글 턴 QA에서 **32%** , 멀티 턴 QA에서 **43%의 진실성(Truthfulness)** 만을 달성했습니다. 최첨단 산업 솔루션 (예: **GPT-5 mini** )도 유사한 진실성 점수를 보였지만 (싱글 턴 32%, 멀티 턴 45%), **31-49%의 높은 환각 비율** 을 나타냈습니다. **KDD Cup 2025** 에서 우승한 솔루션은 기준 성능을 **28% 향상** 시켰으며, 저품질 이미지 (최대 **46% 진실성 하락** ) 및 복잡한 질문 유형에서 성능 저하가 두드러졌습니다.

## AI 실무자를 위한 시사점
**CRAG-MM 벤치마크** 는 현재의 MM-RAG 시스템, 특히 웨어러블 AI 환경에서 SOTA 모델조차도 상당한 개선이 필요함을 명확히 보여줍니다. AI 실무자들은 **저품질 egocentric 이미지의 강건한 이해** , **향상된 엔티티 인식** , **다중 소스 정보의 효과적인 통합** , 그리고 **다중 턴 대화에서 일관된 맥락 유지** 에 집중하여 신뢰성 있고 실용적인 MM-RAG 시스템을 개발해야 할 것입니다. 높은 환각 비율은 신뢰할 수 있는 AI 시스템 구축의 핵심 과제임을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.