---
title: "[논문리뷰] Understanding by Reconstruction: Reversing the Software Development Process for LLM Pretraining"
excerpt: "arXiv에 게시된 'Understanding by Reconstruction: Reversing the Software Development Process for LLM Pretraining' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review

permalink: /ai/review/2026-03-13-Understanding-by-Reconstruction-Reversing-the-Software-Development-Process-for-LLM-Pretraining/

toc: true
toc_sticky: true

date: 2026-03-13 00:00:00+0900+0900
last_modified_at: 2026-03-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.11103)

**저자:** Zhiyuan Zeng, Yichi Zhang, et al.
**키워:** `LLM Pretraining`, `Code Generation`, `Agentic Trajectories`, `Multi-Agent Simulation`, `Chain-of-Thought Optimization`, `Long-Context Understanding`, `Software Engineering`

## 1. Key Terms & Definitions (핵심 용어 및 정의)
- **Understanding via Reconstruction** : 기존의 정적 소프트웨어 Repository를 Latent Agentic Trajectory로 역공학(Reverse-engineer)하여 LLM에 더 풍부한 Supervision Signal을 제공하는 새로운 패러다임.
- **Agentic Trajectories** : 소프트웨어 개발 과정에서 발생하는 Planning, Reasoning, Debugging 등 일련의 동적인 단계들을 총칭하는 개념.
- **Multi-Agent Simulation** : Main Agent와 Sub-Agent 간의 협업을 통해 Agentic Trajectory를 합성하는 프레임워크.
- **Chain-of-Thought (CoT) Optimization** : 생성된 CoT Reasoning의 품질을 향상시키기 위해 `log p(x|z)`를 최대화하는 Search-based Optimization 기법.
- **Perplexity (PPL)** : 모델이 Ground-Truth Code를 얼마나 잘 예측하는지를 측정하는 지표로, CoT Optimization에서 Reasoning 품질 평가에 사용됨.

## 2. Motivation & Problem Statement (연구 배경 및 문제 정의)
Large Language Models (LLMs)는 코드 생성(Code Generation)에서 놀라운 성공을 거두었지만, 복잡한 소프트웨어 Engineering을 위한 깊고 긴 Horizon의 Reasoning에는 여전히 어려움을 겪고 있습니다. 저자들은 이러한 한계를 표준 Pre-training Data의 본질에서 찾습니다. 기존의 정적 소프트웨어 Repository는 복잡한 Intellectual Process의 Terminal State만을 나타내며, 중간의 Planning, Debugging, Iterative Refinement와 같은 핵심 단계들을 추상화(Abstract Away)합니다. 이로 인해 모델은 코드의 표면적인 Structural Pattern을 모방하는 데 그치고, 복잡한 시스템을 구축하고 유지하는 데 필요한 Generative Reasoning을 습득하지 못하게 됩니다. 따라서, 기존의 "Understanding via Generation" 패러다임은 Substantial Software Repository와 같은 Long-Horizon Artifact에는 근본적인 한계에 직면합니다.

## 3. Method & Key Results (제안 방법론 및 핵심 결과)
본 연구는 이러한 Gap을 해소하기 위해 "Understanding via Reconstruction"이라는 새로운 패러다임을 제안합니다. 이는 정적 Repository 뒤에 숨겨진 Latent Agentic Trajectory를 역공학(Reverse-engineer)하여 Raw Code만으로는 얻을 수 없는 풍부한 Supervision Signal을 제공하는 것입니다. 제안된 프레임워크는 두 가지 주요 단계로 구성됩니다. 첫째, **Multi-Agent Trajectory Curation** 은 Multi-Agent Simulation을 사용하여 실제 개발자 Workflow를 모방합니다 

![Figure 1: The pipeline of synthetic agent trajectory curation.](/paper-images/2026-03-13/2603.11103/figure_1.png)
*Figure 1: The pipeline of synthetic agent trajectory curation.*

. Main Agent는 Project Requirement와 Implementation Plan을 생성하고, Sub-Agent는 개별 파일 구현을 담당하며, `Read` 및 `Write` Tool을 사용합니다. 이 과정은 File Hierarchy, Dependency Graph, Abstract Syntax Tree (AST) 등 Repository의 Structural Reality에 기반하여 Synthetic Data의 Fidelity를 보장합니다. 둘째, **CoT Optimization via Search** 는 초기 Simulation에서 생성된 CoT Reasoning의 품질을 개선합니다. 이는 `log p(x|z)`를 최대화하는 방향으로 CoT 스텝들을 반복적으로 Refine하는 Search-based Optimization 기법을 사용하여, Target Code의 **Perplexity (PPL)** 를 낮추는 최적의 Reasoning Path를 찾습니다.



![Table 2: Summary of Long-Context Understanding performance (Average Scores). Detailed sub-task results are provided in Appendix A.](/paper-images/2026-03-13/2603.11103/table_2.png)
*Table 2: Summary of Long-Context Understanding performance (Average Scores). Detailed sub-task results are provided in Appendix A.*

에 제시된 Long-Context Understanding 벤치마크 결과에서, 재구성된 Trajectory로 학습한 **Repo2Agent** 모델은 Flattened Code로 학습한 **Raw-Repos** 대비 일관되게 우수한 성능을 보였습니다. 특히, **Repo2Agent-Search** 는 **64k** Context에서 **Ruler** 벤치마크 평균 **61.80** 점, **Helmet** 벤치마크 평균 **57.84** 점을 달성하여 가장 높은 Robustness를 입증했습니다. Coding Capability 측면에서는 **Repo2Agent-Search** 가 **HumanEval** 에서 **37.20** 점을 기록하며 **Raw-Repos** 의 **34.76** 점을 상회했고, **LongCodeBench-32k** 에서도 **36.46** 점으로 우위를 점했습니다. Reasoning Transferability 측면에서도, Math-specific Tuning 없이 **MATH** 벤치마크에서 가장 좋은 결과를 보였으며, **BBH** 와 **AGI-Eval** 에서도 Baseline 모델과 대등하거나 능가하는 성능을 보였습니다. [Figure 2b]는 **Repo2Agent-Search** 의 평균 Trajectory 길이가 **12,083.4** 토큰으로, **Raw-Repos** 의 **4,865.5** 토큰 대비 크게 확장되었음을 보여줍니다. 이는 잠재된 Planning 및 Execution 단계를 명시적으로 만듦으로써 Per-Repository 토큰 수를 현저히 증가시킵니다. [Figure 3]에서 CoT Optimization이 반복됨에 따라 평균 CoT 길이가 증가하고 코드의 PPL이 지속적으로 감소하는 것이 확인되어, 상세한 Reasoning이 코드 생성 Task를 단순화함을 입증합니다.

## 4. Conclusion & Impact (결론 및 시사점)
본 연구는 정적 소프트웨어 Artifact로 LLM을 Pre-training하는 것의 한계를 다루고, "Understanding via Reconstruction"이라는 새로운 패러다임을 제안했습니다. Grounded Multi-Agent Simulation과 Search-based Optimization을 통한 Reasoning Refinement 과정을 통해, 정적 Repository를 동적이고 인과적으로 풍부한 Training Data로 변환했습니다. **Llama-3-8B** 모델을 활용한 실험 결과는 이러한 재구성된 Process를 학습하는 것이 Coding, Reasoning, Agentic Capabilities를 크게 향상시킨다는 것을 보여주었습니다. 이 연구는 LLM이 단순히 코드를 생성하는 것을 넘어, 소프트웨어 개발의 근본적인 Reasoning Process를 "이해"할 수 있도록 훈련하는 새로운 방향을 제시하며, 향후 LLM 기반의 소프트웨어 Engineering Agent 개발에 중요한 시사점을 제공합니다.

---

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.