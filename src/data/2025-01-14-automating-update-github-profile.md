---
title: "[GitHub Actions] 깃허브 프로필 자동 업데이트하기"
excerpt: "GitHub Actions를 이용해 깃허브 프로필을 자동으로 업데이트하는 방법을 공유합니다."

categories:
  - GitHub Actions
tags:
  - [GitHub Actions]

permalink: /github-actions/automating-update-github-profile/

toc: true
toc_sticky: true

date: 2025-01-14 23:10:11+0900
last_modified_at: 2025-01-14 23:10:14+0900
published: true
---

## **들어가며**

매일 자주 사용하는 GitHub, 그런데 제 프로필을 확인해보니 마지막으로 업데이트한 게 3년 전이었습니다. 이때부터 기술 스택도 최신화되지 않았고, 제 블로그 포스팅도 깃허브 프로필에 반영되지 않았습니다. 그래서 이번 기회에 프로필을 업데이트하고, 블로그 포스팅도 자동으로 업데이트되도록 만들기로 했습니다.

하지만 매번 수동으로 블로그 포스팅을 추가하는 것은 번거롭기 때문에, 이를 자동화하는 방법을 고민해봤습니다. 그 결과, GitHub Actions를 이용하여 자동으로 블로그 포스팅을 프로필에 반영하는 방법을 구현해보았습니다.

## 1. 깃허브 프로필 업데이트 스크립트 작성

블로그 포스팅을 깃허브 프로필에 자동으로 반영하기 위해, RSS 피드를 활용한 스크립트를 작성했습니다. **RSS**(Really Simple Syndication)는 웹사이트의 콘텐츠를 구독하는 형식으로, 최신 블로그 포스트를 안정적으로 가져올 수 있는 방법입니다.

### 블로그 RSS 피드 설정

저는 제 블로그의 RSS 피드를 이용해 블로그 포스팅을 가져옵니다. 아래는 제 블로그 RSS 피드의 URL입니다.

```
https://blog.secrett2633.site/feed.xml
```

이 RSS 피드를 이용해 최신 포스트 5개를 가져오는 Python 스크립트를 작성했습니다. 코드를 살펴보겠습니다.

### Python 스크립트: `update_readme.py`

```python
import feedparser
from datetime import datetime
import os
from pathlib import Path
from email.utils import parsedate_to_datetime

# 상수 정의
BLOG_URL = "https://blog.secrett2633.site/feed.xml"
MAX_POSTS = 5
README_PATH = "README.md"
BLOG_SECTION_TITLE = "### Latest Blog Posts"

def get_posts():
    """RSS 피드에서 블로그 포스트를 가져옵니다."""
    feed = feedparser.parse(BLOG_URL)
    return feed.entries[:MAX_POSTS]

def format_date(date_str):
    """RSS 피드의 날짜를 원하는 형식으로 변환합니다."""
    # email.utils의 parsedate_to_datetime을 사용하여 RFC 2822 형식의 날짜를 파싱
    date = parsedate_to_datetime(date_str)
    return date.strftime("%Y.%m.%d")

def build_post_line(post):
    """각 포스트를 마크다운 형식의 문자열로 변환합니다."""
    title = post.title
    date = format_date(post.published)
    link = post.link
    return f"- [{title} ({date})]({link})"

def update_readme():
    """README.md 파일을 최신 블로그 포스트로 업데이트합니다."""
    try:
        # README 파일 읽기
        if os.path.exists(README_PATH):
            with open(README_PATH, "r", encoding="utf-8") as f:
                content = f.read()
        else:
            content = ""

        # 블로그 포스트 섹션 이전 내용 가져오기
        before_posts = content.split(BLOG_SECTION_TITLE)[0].strip()

        # 최신 포스트 가져오기
        posts = get_posts()
        post_lines = [build_post_line(post) for post in posts]
        posts_content = "\n".join(post_lines)

        # 새로운 README 내용 생성
        new_content = f"{before_posts}\n\n{BLOG_SECTION_TITLE}\n{posts_content}"

        # 파일 저장
        with open(README_PATH, "w", encoding="utf-8") as f:
            f.write(new_content)

        print("README.md has been updated successfully!")

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        raise e

if __name__ == "__main__":
    update_readme()
```

### 스크립트 실행 방법

1. Python을 설치하고, `feedparser` 라이브러리를 설치합니다.
   ```
   pip install feedparser
   ```

2. 위의 코드를 `update_readme.py` 파일로 저장합니다.

3. 터미널에서 아래 명령어로 스크립트를 실행합니다.
   ```
   python update_readme.py
   ```

스크립트가 성공적으로 실행되면 `README.md` 파일이 최신 블로그 포스트로 업데이트됩니다.

## 2. GitHub Actions 설정

이제 이 작업을 자동화하기 위해 **GitHub Actions**를 설정합니다. GitHub Actions는 `.github/workflows` 폴더에 `.yml` 파일을 생성하여 다양한 작업을 자동화할 수 있습니다.

### GitHub Actions 워크플로우 설정

1. `update-readme`라는 이름의 GitHub Actions 워크플로우를 설정합니다.
2. 6시간마다 자동으로 실행되도록 설정하며, 수동으로 실행할 수 있는 옵션도 추가합니다.

```yml
name: Update Blog Posts

on:
  schedule:
    - cron: '0 */6 * * *'  # 6시간마다 실행
  workflow_dispatch:  # 수동 실행 가능

jobs:
  update-readme:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
      
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.x'
        
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install feedparser
        
    - name: Update README with latest blog posts
      run: python update_readme.py
        
    - name: Commit and push if changed
      run: |
        git config --local user.email "github-actions[bot]@users.noreply.github.com"
        git config --local user.name "github-actions[bot]"
        git diff --quiet && git diff --staged --quiet || (git add README.md && git commit -m "Update blog posts" && git push)
```

### 워크플로우 파일 저장

위의 YAML 파일을 `.github/workflows/update-blog-posts.yml`로 저장하면 설정이 완료됩니다. 이 파일이 추가되면, GitHub Actions가 자동으로 6시간마다 실행되고, `README.md`가 최신 블로그 포스트로 업데이트됩니다.

## 3. 테스트

워크플로우가 자동으로 실행되기 전에 수동으로 테스트할 수 있습니다.

1. GitHub 저장소의 "Actions" 탭으로 이동합니다.
2. "Update Blog Posts" 워크플로우를 선택합니다.
3. "Run workflow" 버튼을 클릭하여 수동으로 워크플로우를 실행합니다.

#### 권한 문제 해결

만약 워크플로우 실행 중 권한 문제가 발생하면 아래 사항을 확인하세요:

1. GitHub 저장소의 **Settings** -> **Actions** -> **General**로 이동합니다.
2. **Actions permissions**에서 "Allow all actions and reusable workflows"를 선택합니다.
3. **Workflow permissions**에서 "Read and write permissions"를 선택합니다.
