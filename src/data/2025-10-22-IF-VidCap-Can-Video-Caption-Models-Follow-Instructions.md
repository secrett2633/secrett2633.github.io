---
title: "[논문리뷰] IF-VidCap: Can Video Caption Models Follow Instructions?"
excerpt: "arXiv에 게시된 'IF-VidCap: Can Video Caption Models Follow Instructions?' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Captioning
  - Instruction Following
  - MLLMs
  - Benchmark
  - Controllable Generation
  - Multimodal Evaluation
  - Fine-tuning

permalink: /ai/review/2025-10-22-IF-VidCap-Can-Video-Caption-Models-Follow-Instructions/

toc: true
toc_sticky: true

date: 2025-10-22 13:07:20+0900
last_modified_at: 2025-10-22 13:07:20+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.18726)

**저자:** Shihao Li, Yuanxing Zhang, Jiangtao Wu, Zhide Lei, Yiwen He, Runzhe Wen, Chenxi Liao, Chengkang Jiang, An Ping, Shuo Gao, Suhan Wang, Zhaozhou Bian, Zijun Zhou, Jingyi Xie, Jiayi Zhou, Jing Wang, Yifan Yao, Weihao Xie, Yingshui Tan, Yanghai Wang, Qianqian Xie, Zhaoxiang Zhang, Jiaheng Liu



## 핵심 연구 목표
비디오 캡셔닝 분야에서 **멀티모달 대규모 언어 모델(MLLM)** 이 사용자의 특정 지시사항(예: 출력 형식, 길이, 내용 제약)을 얼마나 잘 따르는지 평가하는 새로운 벤치마크를 제시하는 것이 목표입니다. 기존 벤치마크들이 주로 설명의 포괄성에 초점을 맞춰왔으나, 실용적인 응용 분야에서는 지시사항 준수 능력이 중요하므로 이 공백을 해결하고자 합니다.

## 핵심 방법론
**IF-VidCap** 이라는 **1,400개의 고품질 샘플** 로 구성된 벤치마크를 구축했으며, 이는 **27가지** 의 다양한 제약 유형(예: 형식, 내용, 요소 집중)을 포함합니다. 이 벤치마크는 **형식 정확성** 과 **내용 정확성** 이라는 두 가지 차원에서 캡션을 평가하는 체계적인 자동 평가 프로토콜을 사용하며, **규칙 기반 검사** 와 **LLM 기반 개방형 질문** 을 결합합니다. 또한, 지시사항 준수 능력을 강화하기 위한 **11K 비디오-캡션 쌍** 으로 구성된 새로운 훈련 데이터셋을 공개하고, 이를 통해 **Qwen2.5-VL-7B-Instruct** 모델을 **IF-Captioner-Qwen** 으로 미세 조정했습니다.

## 주요 결과
**20개 이상의 최신 모델** 평가 결과, **소유 모델(proprietary models)** 이 일반적으로 **오픈소스 모델** 보다 우수한 성능을 보였으나, 격차가 줄어들고 있음을 확인했습니다. **IF-Captioner-Qwen** 은 미세 조정을 통해 기준 모델인 **Qwen2.5-VL-7B-Instruct** 보다 **ISR (Instruction Satisfaction Rate) 12.76%** 대 **10.92%** , **CSR (Constraint Satisfaction Rate) 61.64%** 대 **58.12%** 로 크게 향상된 성능을 보였습니다. 지시사항 복잡도(제약 조건 수, 길이)가 증가함에 따라 모델의 성능이 저하되며, 특히 **내용 제약** 에 대한 처리 능력이 **형식 제약** 보다 훨씬 취약함이 드러났습니다.

## AI 실무자를 위한 시사점
본 벤치마크는 AI 모델이 단순한 비디오 설명 생성뿐만 아니라 **사용자 지시사항을 정확하게 따르는 능력** 의 중요성을 강조합니다. 특히 **멀티모달 추론 능력** 이 필요한 내용 관련 제약 조건에서 모델의 한계가 명확하게 드러나므로, 향후 연구는 **설명의 풍부함과 지시사항 준수 능력** 을 동시에 발전시키는 데 집중해야 할 것입니다. 또한, 공개된 훈련 데이터셋과 미세 조정된 모델은 **표적 미세 조정을 통해 MLLM의 지시사항 준수 능력을 효과적으로 향상** 시킬 수 있음을 보여주며 실무 적용 가능성을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.