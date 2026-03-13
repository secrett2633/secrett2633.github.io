"""
논문 QA Bot — GitHub Discussions 댓글에서 @paper-bot 호출 시
해당 논문 정보를 기반으로 Gemini가 답변을 작성한다.

사용법:
  GitHub Actions에서 discussion_comment 이벤트로 트리거.
  환경변수: GEMINI_API_KEY, GITHUB_TOKEN, GITHUB_REPOSITORY
  이벤트 페이로드: GITHUB_EVENT_PATH
"""

import json
import os
import re
import sys
import glob
import tempfile
import requests

from google import genai


BOT_TAG = "@paper-bot"
ALLOWED_USERS = {"secrett2633"}
REPO = os.environ.get("GITHUB_REPOSITORY", "secrett2633/secrett2633.github.io")
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN", "")
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
POSTS_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "data")
DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data")

QA_PROMPT = """당신은 AI/ML 논문 전문가입니다. 첨부된 논문 PDF 원문을 바탕으로 사용자의 질문에 답변해주세요.

## 사용자 질문
{question}

## 답변 규칙
- 한국어로 답변한다.
- 논문 원문에 근거하여 답변한다. 논문에 없는 내용은 "논문에 명시되지 않았습니다"라고 답한다.
- 기술적이고 정확한 언어를 사용한다.
- 구체적인 수치, 모델명, 기법명이 있으면 볼드체로 강조한다.
- 답변은 간결하되 충분한 정보를 제공한다 (3-10문장).
- 마크다운 형식을 사용한다.
"""


def load_event():
    """GitHub Actions 이벤트 페이로드를 읽는다."""
    event_path = os.environ.get("GITHUB_EVENT_PATH", "")
    if not event_path or not os.path.exists(event_path):
        print("Error: GITHUB_EVENT_PATH not set or file not found")
        sys.exit(1)

    with open(event_path, "r", encoding="utf-8") as f:
        return json.load(f)


def is_bot_call(comment_body):
    """댓글에 @paper-bot 태그가 포함되어 있는지 확인한다."""
    return BOT_TAG in comment_body


def extract_question(comment_body):
    """댓글에서 @paper-bot 태그를 제거하고 질문만 추출한다."""
    question = comment_body.replace(BOT_TAG, "").strip()
    return question if question else "이 논문의 핵심 내용을 요약해주세요."


def find_post_file(discussion_title):
    """Discussion title(pathname)에서 논문 포스트 파일을 찾는다.

    Giscus는 mapping="pathname"이므로 Discussion title이 URL 경로 형태.
    예: /ai/review/2026-01-01-Paper-Title/
    """
    # pathname에서 마지막 slug 부분 추출
    # 예: /ai/review/2026-01-01-Paper-Title/ → 2026-01-01-Paper-Title
    parts = discussion_title.strip("/").split("/")
    slug = parts[-1] if parts else ""

    if not slug:
        return None

    # 정확한 파일명 매칭 시도
    exact_path = os.path.join(POSTS_DIR, f"{slug}.md")
    if os.path.exists(exact_path):
        return exact_path

    # 부분 매칭 (slug가 파일명에 포함되어 있는지)
    pattern = os.path.join(POSTS_DIR, f"*{slug}*.md")
    matches = glob.glob(pattern)
    if matches:
        return matches[0]

    # 날짜 부분으로 매칭 시도 (YYYY-MM-DD)
    date_match = re.match(r"(\d{4}-\d{2}-\d{2})", slug)
    if date_match:
        date_prefix = date_match.group(1)
        # 날짜와 제목 일부로 매칭
        title_part = slug[len(date_prefix):].strip("-").lower()
        if title_part:
            for filepath in glob.glob(os.path.join(POSTS_DIR, f"{date_prefix}-*.md")):
                filename = os.path.basename(filepath).lower()
                # 제목의 첫 몇 단어가 파일명에 포함되는지 확인
                title_words = title_part.split("-")[:3]
                if all(word in filename for word in title_words if len(word) > 2):
                    return filepath

    return None


def extract_arxiv_link(filepath):
    """마크다운 포스트에서 arXiv 링크를 추출한다."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # 포스트 본문에서 arXiv 링크 찾기
    match = re.search(r"https://arxiv\.org/abs/(\S+?)[\)\s\]]", content)
    if match:
        return match.group(1).rstrip("/")
    return None


def find_arxiv_id_from_json(post_filename):
    """논문 JSON 데이터에서 해당 포스트의 arXiv ID를 찾는다."""
    # 포스트 파일명에서 날짜 추출: YYYY-MM-DD-title.md → YYYY-MM-DD
    basename = os.path.basename(post_filename)
    date_match = re.match(r"(\d{4}-\d{2}-\d{2})", basename)
    if not date_match:
        return None

    date_str = date_match.group(1)
    json_path = os.path.join(DATA_DIR, f"{date_str}_papers.json")

    if not os.path.exists(json_path):
        return None

    with open(json_path, "r", encoding="utf-8") as f:
        papers = json.load(f)

    # 파일명에서 제목 부분 추출하여 매칭
    title_part = basename[len(date_str) + 1:].replace(".md", "").lower()

    for paper in papers:
        link = paper.get("link", "")
        arxiv_match = re.search(r"arxiv\.org/abs/(.+)", link)
        if not arxiv_match:
            continue

        # 논문 제목과 파일명 비교 (첫 3단어)
        paper_title_words = re.sub(r"[^\w\s]", "", paper.get("title", "")).lower().split()[:3]
        if all(word in title_part for word in paper_title_words if len(word) > 2):
            return arxiv_match.group(1).rstrip("/")

    return None


def download_pdf(arxiv_id):
    """arXiv에서 논문 PDF를 다운로드한다. 임시 파일 경로를 반환."""
    pdf_url = f"https://arxiv.org/pdf/{arxiv_id}.pdf"
    print(f"Downloading PDF: {pdf_url}")

    response = requests.get(pdf_url, timeout=60)
    if response.status_code != 200:
        print(f"Failed to download PDF: {response.status_code}")
        return None

    tmp = tempfile.NamedTemporaryFile(suffix=".pdf", delete=False)
    tmp.write(response.content)
    tmp.close()
    return tmp.name


def ask_gemini(pdf_path, question):
    """Gemini API에 논문 PDF와 질문을 전달하고 답변을 받는다."""
    client = genai.Client(api_key=GEMINI_API_KEY)

    pdf_file = client.files.upload(file=pdf_path)

    prompt = QA_PROMPT.format(question=question)

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[pdf_file, prompt],
    )

    return response.text


def post_reply(discussion_id, reply_body):
    """GitHub GraphQL API로 Discussion에 답글을 작성한다."""
    query = """
    mutation($discussionId: ID!, $body: String!) {
      addDiscussionComment(input: {discussionId: $discussionId, body: $body}) {
        comment {
          id
        }
      }
    }
    """

    # 답변에 bot 서명 추가
    body = f"{reply_body}\n\n---\n> 🤖 *이 답변은 논문 내용을 기반으로 AI가 생성했습니다.*"

    response = requests.post(
        "https://api.github.com/graphql",
        json={"query": query, "variables": {"discussionId": discussion_id, "body": body}},
        headers={
            "Authorization": f"Bearer {GITHUB_TOKEN}",
            "Content-Type": "application/json",
        },
        timeout=30,
    )

    if response.status_code != 200:
        print(f"Error posting reply: {response.status_code} {response.text}")
        sys.exit(1)

    data = response.json()
    if "errors" in data:
        print(f"GraphQL errors: {data['errors']}")
        sys.exit(1)

    print("Reply posted successfully")


def main():
    # 환경변수 확인
    if not GEMINI_API_KEY:
        print("Error: GEMINI_API_KEY not set")
        sys.exit(1)
    if not GITHUB_TOKEN:
        print("Error: GITHUB_TOKEN not set")
        sys.exit(1)

    # 이벤트 로드
    event = load_event()

    # 댓글 정보 추출
    comment = event.get("comment", {})
    comment_body = comment.get("body", "")
    discussion = event.get("discussion", {})
    discussion_title = discussion.get("title", "")
    discussion_node_id = discussion.get("node_id", "")

    # bot 자신의 댓글은 무시 (무한 루프 방지)
    comment_author = comment.get("user", {}).get("login", "")
    if comment_author == "github-actions[bot]":
        print("Skipping bot's own comment")
        sys.exit(0)

    # 허용된 사용자만 bot 호출 가능
    if comment_author not in ALLOWED_USERS:
        print(f"Unauthorized user: {comment_author}")
        sys.exit(0)

    # bot 호출 확인
    if not is_bot_call(comment_body):
        print("No bot tag found, skipping")
        sys.exit(0)

    print(f"Bot called in discussion: {discussion_title}")

    # 질문 추출
    question = extract_question(comment_body)
    print(f"Question: {question}")

    # 논문 포스트 찾기
    post_file = find_post_file(discussion_title)
    if not post_file:
        error_msg = (
            "해당 논문 포스트를 찾을 수 없습니다. "
            "논문 리뷰 포스트에서만 질문할 수 있습니다.\n\n"
            "---\n> 🤖 *이 답변은 AI가 생성했습니다.*"
        )
        post_reply(discussion_node_id, error_msg)
        sys.exit(0)

    print(f"Found post: {post_file}")

    # arXiv ID 찾기 (포스트 본문 → JSON 데이터 순으로 시도)
    arxiv_id = extract_arxiv_link(post_file)
    if not arxiv_id:
        arxiv_id = find_arxiv_id_from_json(post_file)

    if not arxiv_id:
        error_msg = (
            "해당 논문의 arXiv 링크를 찾을 수 없습니다. "
            "arXiv 논문에 대해서만 질문할 수 있습니다.\n\n"
            "---\n> 🤖 *이 답변은 AI가 생성했습니다.*"
        )
        post_reply(discussion_node_id, error_msg)
        sys.exit(0)

    print(f"arXiv ID: {arxiv_id}")

    # PDF 다운로드
    pdf_path = download_pdf(arxiv_id)
    if not pdf_path:
        error_msg = (
            "논문 PDF를 다운로드하지 못했습니다. 잠시 후 다시 시도해주세요.\n\n"
            "---\n> 🤖 *이 답변은 AI가 생성했습니다.*"
        )
        post_reply(discussion_node_id, error_msg)
        sys.exit(0)

    # Gemini에 PDF + 질문 전달
    try:
        answer = ask_gemini(pdf_path, question)
    except Exception as e:
        print(f"Gemini API error: {e}")
        error_msg = (
            "AI 답변 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.\n\n"
            "---\n> 🤖 *이 답변은 AI가 생성했습니다.*"
        )
        post_reply(discussion_node_id, error_msg)
        sys.exit(0)
    finally:
        # 임시 PDF 파일 정리
        if pdf_path and os.path.exists(pdf_path):
            os.unlink(pdf_path)

    # 답글 작성
    post_reply(discussion_node_id, answer)


if __name__ == "__main__":
    main()
