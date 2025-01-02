---
title: "LLM을 활용한 코드 리뷰"
excerpt: "github workflow를 활용해 코드 리뷰를 자동화하기" 

categories:
  - LLM
tags:
  - [LLM]

permalink: /llm/code-review-with-llm/

toc: true
toc_sticky: true

date: 2025-01-03 01:03:11+0900
last_modified_at: 2025-01-03 02:10:14+0900
published: true
---

## **들어가며**
많은 기업들이 사내에서 코드 리뷰를 진행하고 있습니다. 코드 리뷰는 소프트웨어 품질을 높이는 중요한 과정이지만, 바쁜 일정으로 인해 제대로 진행되지 않거나 퀄리티가 낮아지는 경우도 많습니다. 이러한 문제를 해결하기 위해 코드 리뷰를 자동화하는 도구를 개발했습니다. 이번 포스팅에서는 그 도구를 어떻게 활용할 수 있는지 공유하고자 합니다.

## 1. 코드 리뷰에서 확인해야 할 사항
코드 리뷰를 할 때, 어떤 사항들을 점검해야 할까요? 사람마다 차이가 있을 수 있지만, 저는 다음과 같은 중요한 포인트들을 체크해야 한다고 생각합니다:

- **코드가 정상적으로 동작하는지**  
  기능적인 측면에서 코드가 올바르게 작동하는지 확인해야 합니다.

- **보안적으로 안전한지**  
  코드에 보안 취약점이 없는지 점검하는 것이 중요합니다.

- **효율적인지**  
  성능이나 자원 사용 측면에서 최적화가 되어 있는지 점검합니다.

이 외에도 여러 가지를 체크해야 하지만, 자동화 도구는 위와 같은 내용을 중점적으로 리뷰할 수 있도록 설정하였습니다.

## 2. 코드 리뷰 자동화 방법
이제 코드 리뷰를 자동화하는 방법을 소개하겠습니다. 다음 단계를 따라 해보세요.

### 1. GitHub 리포지토리 클론
먼저, 아래의 GitHub 링크에서 코드를 클론합니다.

[GitHub 리포지토리 링크](https://github.com/secrett2633/CodeReview)

### 2. 파일 복사
리포지토리에서 `.github/workflows/code-review.yml` 파일을 당신의 리포지토리에 동일한 위치에 복사합니다.  
그리고 `action` 폴더 전체를 당신의 리포지토리 루트 디렉토리에 복사합니다.

### 3. 환경 변수 설정
GitHub에서 추가적인 환경변수 및 설정을 해주어야 합니다.

- **Claude API 키 설정**:
  1. GitHub 리포지토리의 `Settings > Secrets and variables > Actions`로 이동합니다.
  2. 'New repository secret'을 클릭하고, 이름을 `CLAUDE_API_KEY`로 설정합니다.
  3. 값에는 실제 Claude API 키를 입력합니다.

- **GitHub Actions 권한 설정**:
  1. 리포지토리의 `Settings > Actions > General`로 이동합니다.
  2. 'Workflow permissions'에서 'Read and write permissions'를 선택합니다.

이제 모든 설정이 완료되었습니다.

## 3. 코드 리뷰 진행
모든 준비가 끝났다면, 이제 리포지토리에 새로운 Pull Request를 생성하여 자동으로 코드 리뷰가 진행됩니다. 자동화된 코드 리뷰 결과는 다음과 같이 표시됩니다.

![코드 리뷰 결과](/assets/images/posts_img/ai/llm/code-review-result.png)

자동화된 코드 리뷰가 정상적으로 작동하면, 코드 품질을 향상시키고 팀워크를 더 원활하게 할 수 있습니다.
