---
title: "[논문리뷰] LLaDA2.1: Speeding Up Text Diffusion via Token Editing"
excerpt: "arXiv에 게시된 'LLaDA2.1: Speeding Up Text Diffusion via Token Editing' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Text Diffusion
  - Token Editing
  - Inference Acceleration
  - Mask-to-Token
  - Token-to-Token
  - Reinforcement Learning
  - Speedy Mode
  - Quality Mode

permalink: /ai/review/2026-02-10-LLaDA2-1-Speeding-Up-Text-Diffusion-via-Token-Editing/

toc: true
toc_sticky: true

date: 2026-02-10 00:00:00+0900+0900
last_modified_at: 2026-02-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.08676)

**저자:** Tiwei Bie, Maosong Cao, Xiang Cao, Bingsen Chen, Fuyuan Chen, Kun Chen, Lun Du, Daozhuo Feng, Haibo Feng, Mingliang Gong, Zhuocheng Gong, Yanmei Gu, Jian Guan, Kaiyuan Guan, Hongliang He, Zenan Huang, Juyong Jiang, Zhonghui Jiang, Zhenzhong Lan, Chengxi Li, Jianguo Li, Zehuan Li, Huabin Liu, Lin Liu, Guoshan Lu, Yuan Lu, Yuxin Ma, Xingyu Mou, Zhenxuan Pan, Kaida Qiu, Yuji Ren, Jianfeng Tan, Yiding Tian, Zian Wang, Lanning Wei, Tao Wu, Yipeng Xing, Wentao Ye, Liangyu Zha, Tianze Zhang, Xiaolu Zhang, Junbo Zhao, Da Zheng, Hao Zhong, Wanli Zhong, Jun Zhou, Junlin Zhou, Liwang Zhu, Muzhi Zhu, Yihong Zhuang



## 핵심 연구 목표
본 연구는 확산 언어 모델(dLLMs)에서 디코딩 속도와 생성 품질 간의 고질적인 트레이드오프를 극복하고, 병렬 디코딩 시 발생하는 토큰 수준의 불일치를 해결하여 효율적이면서도 고품질의 텍스트 생성을 달성하는 것을 목표로 합니다. 기존 **Mask-to-Token (M2T)** 방식의 경직성을 탈피하여 사용자가 속도와 품질을 조절할 수 있는 유연한 프레임워크를 제시하고자 합니다.

## 핵심 방법론
논문은 **Token-to-Token (T2T) 편집** 을 기존 **Mask-to-Token (M2T) 스키마** 에 통합한 **‘Draft-and-Edit’** 패러다임을 제안하며, **듀얼 확률 임계값 (Tmask, Tedit)** 으로 제어되는 조인트 임계값 디코딩 방식을 도입합니다. 이는 빠른 초안 생성 후 수정을 통해 속도를 높이는 **Speedy Mode (S Mode)** 와 보수적인 임계값을 사용하여 품질을 우선하는 **Quality Mode (Q Mode)** 로 나뉩니다. 또한, **ELBO 기반 블록 수준 정책 최적화(EBPO)** 를 활용한 **대규모 강화 학습(RL)** 프레임워크와 **Multi-Block Editing (MBE)** 메커니즘을 통해 모델의 편집 능력을 강화했습니다.

## 주요 결과
**LLaDA2.1-Flash (100B)** 모델은 **HumanEval+에서 892 TPS** , **BigCodeBench에서 801 TPS** , **LiveCodeBench에서 663 TPS** 라는 경이로운 디코딩 속도를 달성하며, **LLaDA2.0** 대비 상당한 속도 향상을 보여주었습니다. **Q Mode** 에서는 **LLaDA2.0** 의 품질 성능을 뛰어넘는 결과를 보였으며, **S Mode** 에서는 약간의 품질 저하와 함께 대폭 향상된 처리량(TPS)을 입증했습니다.

## AI 실무자를 위한 시사점
**토큰 편집(Token Editing)** 기능이 통합된 dLLM은 **디코딩 속도와 출력 품질 간의 유연한 균형** 을 제공하여 다양한 응용 시나리오에 맞춤형 성능을 가능하게 합니다. 특히 **Speedy Mode** 는 코드 생성과 같은 구조화된 데이터 도메인에서 높은 처리량을 요구하는 실시간 애플리케이션에 매우 유용할 수 있습니다. **강화 학습(RL)** 과 **Multi-Block Editing (MBE)** 의 도입은 dLLM의 추론 능력과 일관성을 향상시키는 중요한 방향을 제시하며, 향후 더욱 정교하고 효율적인 모델 개발 가능성을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.