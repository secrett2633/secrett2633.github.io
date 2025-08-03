import json
import os
import traceback
import time
from datetime import datetime
from typing import List, Dict

import google.generativeai as genai
from pydantic import BaseModel


class PaperSummary(BaseModel):
    tags: list[str]
    excerpt: str
    contents: str


CONTENT = """
---
title: "[논문리뷰] {title}"
excerpt: "{authors}이 {platform}에 게시한 '{title}' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - [Review]

permalink: /ai/review/{uri}/

toc: true
toc_sticky: true

date: {date_str}+0900
last_modified_at: {date_str}+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기]({link})

{content}

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.
"""

genai.configure(api_key=os.environ["GEMINI_API_KEY"])


PAPER_SUMMARY_PROMPT = """
# AI/ML 논문 분석 시스템 프롬프트

당신은 AI/ML 논문을 전문적으로 분석하고 요약하는 전문가입니다. 주어진 논문을 다음 형식으로 마크다운 문서로 출력해주세요.

## 출력 형식

논문 제목을 헤더로 시작하고, 키워드와 상세 요약을 포함한 마크다운 문서를 작성합니다.

## 각 섹션별 요구사항

### 1. 기본 정보
- 저자 정보를 부제목으로 표시

### 2. 키워드 (Tags)
- 논문의 핵심 기술, 방법론, 도메인을 나타내는 키워드 5-8개
- 영어로 작성하되, 표준화된 학술 용어 사용
- 인라인 코드 형태(`키워드`)로 표시하여 시각적으로 구분

### 3. 상세 요약 (Contents)
다음 4개 섹션을 반드시 포함하여 5-10개 문장으로 구성:

#### 필수 섹션:
1. **## 핵심 연구 목표** - 논문이 해결하고자 하는 문제와 연구 목적
2. **## 핵심 방법론** - 사용된 주요 기술, 알고리즘, 실험 설계 (기술적 세부사항은 볼드체 강조)
3. **## 주요 결과** - 최소 1개 이상의 구체적인 정량적 지표 포함 필수 (정량적 결과가 없거나 불명확한 경우 명시적으로 언급)
4. **## AI 실무자를 위한 시사점** - AI/ML 엔지니어, 데이터 사이언티스트 관점에서의 실용적 의미

## 작성 지침
- 한국어로 작성
- AI 연구자/엔지니어에게 적합한 기술적이고 정확한 언어 사용
- 가장 영향력 있는 발견과 AI 개발/응용에 대한 직접적 관련성 강조
- 추정이나 추론 금지 - 불분명한 부분은 "명시되지 않음" 또는 "불완전하게 제시됨" 등으로 명시
- 구체적인 수치, 모델명, 기법명 등은 볼드체로 강조
- 마크다운 헤더(##), 리스트(-), 볼드체(**) 적극 활용
- 각 섹션은 2-3개 문장으로 구성
- 전체 길이: 200-400단어 권장

## Few-Shot 예시

### 예시: Computer Vision 논문

```markdown
**저자:** Alexey Dosovitskiy, Lucas Beyer, Alexander Kolesnikov, et al.

**키워드:** `Computer Vision`, `Transformer Architecture`, `Self-Attention`, `Image Classification`, `Transfer Learning`, `Vision Transformer`, `Patch Embedding`

## 핵심 연구 목표
컴퓨터 비전 태스크에서 **CNN의 의존성을 완전히 제거**하고, 순수한 **Transformer 아키텍처**만으로 이미지 분류 성능을 달성하는 것을 목표로 합니다. 기존 CNN 기반 접근법의 한계를 극복하고 **self-attention 메커니즘**이 이미지 패치 간의 관계를 효과적으로 학습할 수 있음을 증명하고자 합니다.

## 핵심 방법론
이미지를 **16x16 크기의 패치**로 분할하고 각 패치를 **선형 임베딩**으로 변환한 후, **위치 인코딩**을 추가하여 Transformer 인코더에 입력합니다. **대규모 데이터셋에서의 사전 훈련** 후 하위 태스크로 전이학습하는 방식을 채택하였으며, **classification token**을 통해 최종 분류 결과를 출력합니다.

## 주요 결과
**ImageNet-21k**에서 사전 훈련 후 ImageNet에서 **88.55% top-1 accuracy**를 달성하여 기존 CNN 기반 모델들을 뛰어넘었습니다. **JFT-300M** 데이터셋 사용 시에는 더욱 뛰어난 성능을 보여주며, 대규모 데이터에서 **ViT-Huge 모델**이 **ResNet 대비 약 4배 적은 연산량**으로 동등한 성능을 달성했습니다.

## AI 실무자를 위한 시사점
컴퓨터 비전 분야에서 **Transformer 기반 모델의 가능성**을 입증하여 새로운 연구 방향을 제시했습니다. 하지만 **대규모 데이터셋이 필수**이며, 소규모 데이터에서는 여전히 CNN이 우수한 성능을 보이므로 **데이터 규모에 따른 모델 선택**이 중요합니다. **사전 훈련된 ViT 모델**들이 공개되어 전이학습 활용이 용이해졌습니다.
```

위의 예시를 참고하여 주어진 논문을 동일한 형식과 구조로 분석해주세요.

**논문 정보:**
- 제목: {title}
- 저자: {authors}

위 지침과 예시에 따라 논문을 분석하고 마크다운 형식으로 요약을 제공해주세요.
"""


def summarize_paper(title: str, authors: str, pdf_path: str, model_name: str) -> str:
    model = genai.GenerativeModel(model_name=model_name)

    pdf_file = genai.upload_file(path=pdf_path, display_name=f"paper_{title}")

    prompt = PAPER_SUMMARY_PROMPT.format(title=title, authors=authors)

    response = model.generate_content([pdf_file, prompt])

    return response.text


def update_readme(summaries: List[Dict[str, str]]) -> None:
    date_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S%z")
    year = datetime.now().year
    month = datetime.now().month
    day = datetime.now().day

    for summary in summaries:
        platform = "[arXiv]" if "arxiv.org/abs/" in summary["link"] else "[HuggingFace]"
        uri = f"{year}-{month}-{day}-{summary['title'].replace(' ', '_')}".replace(":", '_').replace("\n", " ")
        author = summary["authors"].split(",")
        content = CONTENT.format(
            title=summary["title"],
            uri=uri,
            date_str=date_str,
            content=summary["summary"],
            authors=author[0],
            platform=platform,
            link=summary["link"],
        )

        file_name = f"{year}-{month}-{day}-{summary['title']}.md".replace(" ", "_").replace(":", "_").replace("\n", " ")
        with open(os.path.join("_posts", file_name), "w", encoding="utf-8") as f:
            f.write(content)


def main() -> None:
    date = datetime.now().strftime("%Y-%m-%d")
    with open(f"data/{date}_papers.json", "r", encoding="utf-8") as f:
        papers = json.load(f)

    summaries = []
    for paper in papers:
        try:
            summary = summarize_paper(
                title=paper["title"],
                authors=paper["authors"],
                pdf_path=paper["pdf_path"],
                model_name="gemini-2.5-flash",
            )
            summaries.append({**paper, "summary": summary})
            time.sleep(60)  # Sleep for 1 minute to avoid rate limiting
        except Exception as e:
            print(traceback.format_exc())
            continue


    update_readme(summaries)

    for paper in papers:
        if os.path.exists(paper["pdf_path"]):
            os.remove(paper["pdf_path"])


if __name__ == "__main__":
    main()
