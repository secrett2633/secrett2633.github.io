import json
import os
import re
import traceback
import time
from datetime import datetime
from typing import List, Dict, Optional

import fitz  # PyMuPDF
from google import genai
from pydantic import BaseModel


class PaperSummary(BaseModel):
    tags: list[str]
    excerpt: str
    contents: str


CONTENT = """
---
title: "[논문리뷰] {title}"
excerpt: "{excerpt}"

categories:
  - Review
tags:
{tags}

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


def parse_keywords_from_summary(summary: str) -> List[str]:
    keywords = []

    keyword_pattern = r"\*\*키워드:\*\*\s*(.+?)(?=\n\n|\n##|$)"
    match = re.search(keyword_pattern, summary, re.DOTALL)

    if match:
        keyword_text = match.group(1).strip()
        keyword_matches = re.findall(r"`([^`]+)`", keyword_text)
        keywords = [kw.strip() for kw in keyword_matches if kw.strip()]

    if keywords:
        return ["Review"] + keywords
    else:
        return ["Review"]


def remove_keywords_from_summary(summary: str) -> str:
    keyword_pattern = r"\*\*키워드:\*\*\s*(.+?)(?=\n\n|\n##|$)"
    return re.sub(keyword_pattern, "", summary, flags=re.DOTALL).strip()


PAPER_SUMMARY_PROMPT = """
# Role
당신은 해당 분야의 전문 연구원입니다. 주어진 논문을 분석하여 핵심 내용을 명확하고 전문적으로 요약해주세요.

# Constraints (Critical)
1. **Technical Terminology in English**: 논문에 등장하는 핵심 기술 용어, 지표(Metric), 약어, 포맷 명칭 등은 억지로 한국어로 번역하지 말고 **영어 원문 그대로** 사용하세요. (예: Granularity, Outlier, Throughput, Latency, End-to-End 등)
2. **Natural Korean Phrasing**: 문장의 전체적인 구조는 자연스러운 한국어로 작성하되, 명사나 핵심 동사는 영어를 섞어 사용하는 전문적인 문체를 유지하세요.
3. **Mandatory Metadata**: 요약 본문 시작 전에 저자 정보와 키워드를 반드시 먼저 작성하세요.

# 출력 형식

출력은 반드시 두 부분으로 구성됩니다:
- **Part 1**: 요약 본문 (마크다운)
- **Part 2**: 중요 Figure 정보 (JSON)

---

## Part 1: 요약 본문

아래 구조를 **정확히** 따라 마크다운으로 작성하세요.

### 메타데이터 (반드시 본문 최상단에 위치)

저자 정보를 부제목으로 표시:
```
**저자:** 제1저자, 제2저자, et al.
```

키워드를 인라인 코드 형태로 표시 (5-8개, 영어, 표준 학술 용어):
```
**키워드:** `Keyword1`, `Keyword2`, `Keyword3`, ...
```

### 본문 섹션 (4개 필수)

**## 1. Key Terms & Definitions (핵심 용어 및 정의)**
- 논문에서 가장 중요하게 다루는 약어, 포맷, 혹은 기술적 개념 3~5가지를 선정하세요.
- 각 용어가 논문 내에서 구체적으로 무엇을 지칭하는지 간결하게 정의하세요.
- 리스트 형태로 작성: `- **용어**: 정의`

**## 2. Motivation & Problem Statement (연구 배경 및 문제 정의)**
- 저자들이 해결하고자 하는 핵심 문제는 무엇입니까? (3-5문장)
- 기존 연구(Baseline)의 한계점은 무엇이며, 왜 새로운 접근 방식이 필요한지 서술하세요.
- 관련 Figure가 있으면 `[Figure N]`으로 참조하세요.

**## 3. Method & Key Results (제안 방법론 및 핵심 결과)**
- 저자들이 제안하는 방법론(Methodology)이나 이론적 프레임워크를 설명하세요. (5-8문장)
- 주요 실험 결과(Quantitative Results)를 구체적인 수치나 비교 우위 중심으로 서술하세요.
  (예: A가 B 대비 어떤 조건에서 성능이 우수한지)
- 최소 2개 이상의 정량적 지표를 포함하세요.
- 아키텍처 다이어그램, 결과 테이블/그래프가 있으면 `[Figure N]` 또는 `[Table N]`으로 참조하세요.

**## 4. Conclusion & Impact (결론 및 시사점)**
- 논문의 최종 결론을 요약하세요. (3-5문장)
- 이 연구가 해당 분야(학계 또는 산업계)에 미치는 영향이나 시사점을 서술하세요.

### 작성 지침
- 구체적인 수치, 모델명, 기법명 등은 **볼드체**로 강조
- 마크다운 헤더(##), 리스트(-), 볼드체(**) 적극 활용
- 전체 길이: 500-1000단어 권장
- 추정이나 추론 금지 - 불분명한 부분은 "명시되지 않음" 등으로 명시
- 핵심 Figure/Table은 본문에서 `[Figure N]` 형태로 자연스럽게 참조

---

## Part 2: 중요 Figure 정보

요약 본문 작성이 끝난 후, 반드시 `---FIGURES---` 구분자 뒤에 JSON을 출력하세요.
논문에서 가장 중요한 Figure/Table을 최대 3개 선별합니다.

선별 기준 (우선순위):
1. 전체 아키텍처/프레임워크 다이어그램
2. 핵심 결과를 보여주는 비교 테이블 또는 그래프
3. 핵심 방법론을 설명하는 그림

**절대 선택 금지**: 로고, 아이콘, 워터마크, 대학/기관 엠블럼

**bbox 좌표 규칙 (매우 중요)**:
- bbox는 **Figure/Table 본체만** 가리킵니다. 캡션("Fig. 1:", "Table 1:" 등), 설명 텍스트, 번호는 **제외**합니다.
- Table의 경우: 표의 헤더 행부터 마지막 데이터 행까지만 포함합니다. 표 위의 "Table N: ..." 캡션과 표 아래 설명 텍스트는 제외합니다.
- Figure의 경우: 그림/다이어그램/그래프 자체만 포함합니다. "Fig. N: ..." 캡션은 제외합니다.
- 좌표는 페이지 크기 대비 비율 (0.0~1.0)입니다.

JSON 형식:
```json
[
  {{"figure_id": "Figure 1", "page": 2, "bbox_top": 0.35, "bbox_bottom": 0.70, "bbox_left": 0.05, "bbox_right": 0.95, "caption": "Overall architecture of the proposed model", "importance": "전체 모델 구조를 보여주는 핵심 다이어그램"}},
  {{"figure_id": "Table 1", "page": 5, "bbox_top": 0.15, "bbox_bottom": 0.50, "bbox_left": 0.10, "bbox_right": 0.90, "caption": "Comparison with state-of-the-art methods", "importance": "주요 벤치마크 결과 비교"}}
]
```

- `page`: 해당 Figure/Table이 있는 PDF 페이지 번호 (1부터 시작)
- `bbox_top`: 본체 상단 위치 (페이지 높이 대비 비율, 0.0=맨위 ~ 1.0=맨아래)
- `bbox_bottom`: 본체 하단 위치 (페이지 높이 대비 비율)
- `bbox_left`: 본체 왼쪽 위치 (페이지 너비 대비 비율, 0.0=왼쪽 ~ 1.0=오른쪽)
- `bbox_right`: 본체 오른쪽 위치 (페이지 너비 대비 비율)
- Figure가 없거나 텍스트 위주 논문이면 빈 배열 `[]`을 출력

---

**논문 정보:**
- 제목: {title}
- 저자: {authors}

위 지침에 따라 논문을 분석하고, Part 1 (마크다운 요약) 이후 `---FIGURES---` 구분자를 넣고 Part 2 (JSON)를 출력해주세요.
"""


def extract_figures_from_pdf(
    pdf_path: str, figure_info: List[Dict], output_dir: str
) -> List[Dict[str, str]]:
    """PDF에서 Figure/Table 본체만 정밀하게 추출한다.

    Gemini의 bbox를 탐색 영역으로 사용하고, PyMuPDF의 이미지/드로잉 감지로
    실제 Figure/Table 콘텐츠 경계를 찾아 텍스트/캡션을 제외한다.

    Returns:
        추출된 이미지 정보 리스트: [{"figure_id": "Figure 1", "filename": "...", "caption": "..."}]
    """
    if not figure_info:
        return []

    os.makedirs(output_dir, exist_ok=True)
    extracted = []

    try:
        doc = fitz.open(pdf_path)
    except Exception as e:
        print(f"Failed to open PDF: {e}")
        return []

    for fig in figure_info:
        page_num = fig.get("page", 1) - 1  # 0-indexed
        figure_id = fig.get("figure_id", "Figure")
        caption = fig.get("caption", "")
        bbox_top = fig.get("bbox_top", 0.0)
        bbox_bottom = fig.get("bbox_bottom", 1.0)
        bbox_left = fig.get("bbox_left", 0.0)
        bbox_right = fig.get("bbox_right", 1.0)

        if page_num < 0 or page_num >= len(doc):
            print(f"Page {page_num + 1} out of range for {figure_id}")
            continue

        try:
            page = doc[page_num]
            page_rect = page.rect
            page_height = page_rect.height
            page_width = page_rect.width

            # Gemini bbox를 탐색 영역으로 변환 (2% 확장)
            expand = 0.02
            search_rect = fitz.Rect(
                page_width * max(0, bbox_left - expand),
                page_height * max(0, bbox_top - expand),
                page_width * min(1, bbox_right + expand),
                page_height * min(1, bbox_bottom + expand),
            )

            # 탐색 영역 내에서 실제 콘텐츠(이미지+드로잉) 경계 찾기
            content_rects = []

            # 1) 임베디드 이미지 찾기
            for img in page.get_images():
                xref = img[0]
                for rect in page.get_image_rects(xref):
                    if rect.intersects(search_rect) and not rect.is_empty:
                        content_rects.append(rect)

            # 2) 벡터 드로잉 찾기 (다이어그램, 표 선, 화살표 등)
            for drawing in page.get_drawings():
                drect = fitz.Rect(drawing["rect"])
                if drect.intersects(search_rect) and not drect.is_empty:
                    content_rects.append(drect)

            if content_rects:
                # 모든 콘텐츠의 합집합 → 정밀 크롭 영역
                clip = content_rects[0]
                for r in content_rects[1:]:
                    clip |= r

                # 감지 영역이 탐색 영역의 15% 미만이면 오감지 → fallback
                content_area = clip.width * clip.height
                search_area = search_rect.width * search_rect.height
                if search_area > 0 and content_area < search_area * 0.15:
                    print(f"Content area too small for {figure_id}, using Gemini bbox")
                    clip = search_rect
                else:
                    # 작은 여백 추가 (5pt ≈ 2mm)
                    pad = 5
                    clip = fitz.Rect(
                        max(0, clip.x0 - pad),
                        max(0, clip.y0 - pad),
                        min(page_width, clip.x1 + pad),
                        min(page_height, clip.y1 + pad),
                    )
            else:
                # 콘텐츠 감지 실패 시 Gemini bbox fallback
                clip = search_rect

            # 고해상도로 렌더링
            pix = page.get_pixmap(dpi=200, clip=clip)

            safe_id = re.sub(r"[^\w]", "_", figure_id).lower()
            filename = f"{safe_id}.png"
            filepath = os.path.join(output_dir, filename)
            pix.save(filepath)

            # 너무 작은 이미지 제외 (높이 50px 미만)
            if pix.height < 50:
                print(f"Skipping {figure_id}: too small ({pix.height}px)")
                os.unlink(filepath)
                continue

            extracted.append({
                "figure_id": figure_id,
                "filename": filename,
                "caption": caption,
            })
        except Exception as e:
            print(f"Failed to extract {figure_id} from page {page_num + 1}: {e}")

    doc.close()
    return extracted


def parse_gemini_response(response_text: str) -> tuple[str, List[Dict]]:
    """Gemini 응답을 요약 본문과 Figure 정보로 분리한다."""
    if "---FIGURES---" in response_text:
        parts = response_text.split("---FIGURES---", 1)
        summary = parts[0].strip()
        figures_text = parts[1].strip()
    else:
        return response_text, []

    # JSON 파싱
    json_match = re.search(r"\[.*\]", figures_text, re.DOTALL)
    if json_match:
        try:
            figures = json.loads(json_match.group())
            return summary, figures
        except json.JSONDecodeError:
            print("Failed to parse figure JSON")

    return summary, []


def summarize_paper(title: str, authors: str, pdf_path: str, model_name: str) -> tuple[str, List[Dict]]:
    """논문을 요약하고 중요 Figure 정보를 함께 반환한다."""
    client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

    pdf_file = client.files.upload(file=pdf_path)

    prompt = PAPER_SUMMARY_PROMPT.format(title=title, authors=authors)

    response = client.models.generate_content(
        model=model_name, contents=[pdf_file, prompt]
    )

    summary, figures = parse_gemini_response(response.text)
    return summary, figures


def insert_images_into_summary(
    summary: str, extracted_images: List[Dict[str, str]], image_base_path: str
) -> str:
    """요약 본문의 [Figure N] 참조를 실제 이미지 태그로 교체한다."""
    for img in extracted_images:
        figure_id = img["figure_id"]
        filename = img["filename"]
        caption = img.get("caption", "")
        image_path = f"/{image_base_path}/{filename}"

        # [Figure N] 또는 [Table N] 참조를 이미지 + 캡션으로 교체
        pattern = re.compile(re.escape(f"[{figure_id}]"), re.IGNORECASE)
        replacement = f"\n\n![{figure_id}: {caption}]({image_path})\n*{figure_id}: {caption}*\n\n"
        summary = pattern.sub(replacement, summary, count=1)

    return summary


def clean_hyphens(text: str) -> str:
    """연속된 하이픈을 하나로 변경하고 하이픈 주변 공백 제거"""
    text = re.sub(r"\s+-\s+", "-", text)
    text = re.sub(r"\s+-", "-", text)
    text = re.sub(r"-\s+", "-", text)
    text = re.sub(r"-{2,}", "-", text)
    text = text.replace("Φ", "")
    text = text.replace(".", "-")
    return text


def sanitize_filename(text: str) -> str:
    sanitized = re.sub(r"[^\w\s\-.]", "", text)
    sanitized = re.sub(r"\s+", "-", sanitized)
    sanitized = re.sub(r"-{2,}", "-", sanitized)
    sanitized = clean_hyphens(sanitized)
    return sanitized.strip("-")


def fix_bold_spacing(text):
    """
    **텍스트** 형식의 볼드체 앞뒤에 공백을 추가
    """
    def add_spaces(match):
        bold_text = match.group(0)
        before = match.start()
        after = match.end()

        char_before = text[before - 1] if before > 0 else ""
        char_after = text[after] if after < len(text) else ""

        result = bold_text

        if before > 0 and char_before not in [" ", "\n", "\t"]:
            result = " " + result

        if after < len(text) and char_after not in [" ", "\n", "\t"]:
            result = result + " "

        return result

    pattern = r"(?<!\*)\*\*([^*]+?)\*\*(?!\*)"
    return re.sub(pattern, add_spaces, text)


def update_readme(
    paper: Dict[str, str],
    year: str, month: str, day: str,
    extracted_images: Optional[List[Dict[str, str]]] = None,
    image_base_path: Optional[str] = None,
) -> None:
    date_str = f"{year}-{month}-{day} 00:00:00+0900"
    platform = "arXiv" if "arxiv.org/abs/" in paper["link"] else "HuggingFace"
    sanitized_title = sanitize_filename(paper["title"])
    uri = clean_hyphens(f"{year}-{month}-{day}-{sanitized_title}")
    author = paper["authors"].split(",")

    tags = parse_keywords_from_summary(paper["summary"])
    tags_yaml = "\n".join([f"  - {tag}" for tag in tags])
    title = paper["title"].replace("\n", " ").replace('"', "'").strip()
    excerpt = (
        f"{author[0]}이 {platform}에 게시한 '{title}' 논문에 대한 자세한 리뷰입니다."
        if author[0]
        else f"{platform}에 게시된 '{title}' 논문에 대한 자세한 리뷰입니다."
    )

    summary_content = fix_bold_spacing(remove_keywords_from_summary(paper["summary"]))

    # 이미지 참조 삽입
    if extracted_images and image_base_path:
        summary_content = insert_images_into_summary(
            summary_content, extracted_images, image_base_path
        )

    content = CONTENT.format(
        title=title,
        excerpt=excerpt,
        uri=uri,
        date_str=date_str,
        content=summary_content,
        authors=author[0],
        platform=platform,
        link=paper["link"],
        tags=tags_yaml,
    ).strip()

    sanitized_title = sanitize_filename(paper["title"])
    file_name = clean_hyphens(f"{year}-{month}-{day}-{sanitized_title}") + ".md"
    with open(os.path.join("src", "data", file_name), "w", encoding="utf-8") as f:
        f.write(content)


def main() -> None:
    year = datetime.now().year
    month = f"{datetime.now().month:02d}"
    day = f"{datetime.now().day:02d}"
    date = f"{year}-{month}-{day}"
    with open(f"data/{date}_papers.json", "r", encoding="utf-8") as f:
        papers = json.load(f)

    for paper in papers:
        try:
            # arXiv ID 추출 (이미지 디렉토리명으로 사용)
            arxiv_match = re.search(r"arxiv\.org/abs/(.+)", paper["link"])
            arxiv_id = arxiv_match.group(1).replace("/", "-") if arxiv_match else "unknown"

            # Gemini 요약 + Figure 선별 (1회 호출)
            summary, figure_info = summarize_paper(
                title=paper["title"],
                authors=paper["authors"],
                pdf_path=paper["pdf_path"],
                model_name="gemini-2.5-flash",
            )
            paper["summary"] = summary

            # PDF에서 이미지 추출
            image_dir = os.path.join("public", "paper-images", date, arxiv_id)
            image_base_path = f"paper-images/{date}/{arxiv_id}"
            extracted_images = extract_figures_from_pdf(
                paper["pdf_path"], figure_info, image_dir
            )

            if extracted_images:
                print(f"Extracted {len(extracted_images)} images for {paper['title'][:50]}...")

            # 마크다운 포스트 생성 (이미지 포함)
            update_readme(
                paper, year, month, day,
                extracted_images=extracted_images,
                image_base_path=image_base_path,
            )

            time.sleep(1)
        except Exception as e:
            print(traceback.format_exc())
            continue


if __name__ == "__main__":
    main()
