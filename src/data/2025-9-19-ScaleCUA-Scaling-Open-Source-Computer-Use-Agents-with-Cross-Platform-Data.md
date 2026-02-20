---
title: "[논문리뷰] ScaleCUA: Scaling Open-Source Computer Use Agents with Cross-Platform
  Data"
excerpt: "Zehao Li이 arXiv에 게시한 'ScaleCUA: Scaling Open-Source Computer Use Agents with Cross-Platform
  Data' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Computer Use Agents
  - Vision-Language Models
  - Cross-Platform Data
  - GUI Automation
  - Data Scaling
  - Open-Source
  - Task Completion
  - GUI Grounding

permalink: /ai/review/2025-9-19-ScaleCUA-Scaling-Open-Source-Computer-Use-Agents-with-Cross-Platform-Data/

toc: true
toc_sticky: true

date: 2025-09-19 13:12:21+0900
last_modified_at: 2025-09-19 13:12:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.15221)

**저자:** Zhaoyang Liu*, Jingjing Xie*, Zichen Ding*, Zehao Li*, Bowen Yang*, Zhenyu Wu*, Xuehui Wang, Qiushi Sun, Shi Liu, Weiyun Wang, Shenglong Ye, Qingyun Li, Xuan Dong, Yue Yu, Chenyu Lu, YunXiang Mo, Yao Yan, Zeyue Tian, Xiao Zhang, Yuan Huang, Yiqian Liu, Weijie Su, Gen Luo, Xiangyu Yue, Biqing Qi, Bowen Zhou, Kai Chen, Yu Qiao, Qifeng Chen*, Wenhai Wang*



## 핵심 연구 목표
컴퓨터 사용 에이전트(CUA) 개발은 광범위한 도메인 지식과 방대한 운영 궤적 데이터를 요구하지만, 이러한 데이터의 희소성과 기존 VLM의 제한된 전이 가능성으로 인해 진척이 더뎠습니다. 이 연구는 데이터 규모 및 모델 일반화의 한계를 극복하기 위해 오픈 소스 CUA를 확장하고, **대규모 크로스 플랫폼 GUI 중심 훈련 코퍼스** 를 구축하며, **다목적 CUA** 를 위한 확장 가능하고 다재다능한 파운데이션 모델 제품군을 개발하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **폐쇄 루프 파이프라인** 을 통해 6개 운영 체제(Windows, macOS, Linux, Android, iOS, Web)와 3개 작업 도메인(GUI 이해, GUI 그라운딩, 태스크 완료)에 걸친 **대규모 데이터셋** 을 구축했습니다. 이 파이프라인은 자동화된 에이전트와 인간 전문가를 통합하며, **GPT-40** 및 **Claude-3.7-Sonnet** 과 같은 **고급 VLM** 을 사용하여 데이터를 주석 처리하고 증강했습니다. 이 데이터를 기반으로 **Qwen2.5-VL** 을 활용하여 **ScaleCUA** 모델(3B, 7B, 32B)을 훈련했으며, **그라운딩 모드** , **직접 행동 모드** , **추론 행동 모드** 의 세 가지 추론 패러다임을 지원합니다.

## 주요 결과
**ScaleCUA** 는 기준선 대비 상당한 성능 향상을 입증했으며, 특히 **WebArena-Lite-v2** 에서 **+26.6%** , **ScreenSpot-Pro** 에서 **+10.7%** 의 강력한 성능 향상을 달성했습니다. 또한, **MMBench-GUI L1-Hard** 에서 **94.4%** , **OSWorld-G** 에서 **60.6%** , **WebArena-Lite-v2** 에서 **47.4%** 를 기록하며 새로운 최첨단(SOTA) 결과를 수립했습니다. 이러한 결과는 **데이터 기반 스케일링** 이 범용 크로스 플랫폼 CUA에 강력한 영향을 미친다는 것을 분명히 보여줍니다.

## AI 실무자를 위한 시사점
이 연구는 **크로스 플랫폼 GUI 데이터** 를 활용한 **데이터 기반 스케일링** 이 일반 목적 CUA 개발에 매우 중요함을 시사합니다. **Qwen2.5-VL** 과 같은 대규모 VLM을 기반으로 하는 모델이 복잡한 GUI 태스크를 효과적으로 처리할 수 있음을 보여주며, **그라운딩 모드** , **직접 행동 모드** , **추론 행동 모드** 와 같은 실용적인 추론 패러다임을 통해 다양한 배포 시나리오에 맞는 효율성과 견고성을 제공할 수 있습니다. 데이터, 모델 및 코드를 오픈 소스로 공개 (`https://github.com/OpenGVLab/ScaleCUA`)하여 GUI 자동화 연구 및 개발 진입 장벽을 크게 낮추는 데 기여합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.