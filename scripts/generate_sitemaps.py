#!/usr/bin/env python3
"""
Jekyll 블로그의 sitemap을 여러 개로 분할하는 스크립트
Google Search Console의 500개 제한을 해결하기 위해 사용
"""

import os
import re
import glob
from datetime import datetime
from pathlib import Path


def get_posts_from_directory(posts_dir):
    """_posts 디렉토리에서 모든 마크다운 파일을 가져옵니다."""
    posts = []
    for md_file in glob.glob(os.path.join(posts_dir, "*.md")):
        with open(md_file, "r", encoding="utf-8") as f:
            content = f.read()

        # YAML front matter에서 날짜, 제목, permalink 추출
        date_match = re.search(r"date:\s*(\d{4}-\d{2}-\d{2})", content)
        title_match = re.search(r'title:\s*["\']?([^"\'\n]+)["\']?', content)
        permalink_match = re.search(r"permalink:\s*([^\n]+)", content)

        if date_match and title_match:
            # permalink가 있으면 사용하고, 없으면 기본 구조 사용
            if permalink_match:
                url = permalink_match.group(1).strip()
            else:
                # 기본 permalink 구조: /:categories/:title/
                url = f"/{os.path.basename(md_file).replace('.md', '')}/"

            posts.append(
                {
                    "file": md_file,
                    "date": date_match.group(1),
                    "title": title_match.group(1).strip(),
                    "url": url,
                }
            )

    # 날짜순으로 정렬 (최신순)
    posts.sort(key=lambda x: x["date"], reverse=True)
    return posts


def generate_posts_sitemap(posts, sitemap_number, site_url):
    """포스트용 sitemap XML을 생성합니다."""
    xml_content = f"""---
layout: null
---
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
"""

    for post in posts:
        xml_content += f"""  <url>
    <loc>{site_url}{post['url']}</loc>
    <lastmod>{post['date']}T00:00:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
"""

    xml_content += "</urlset>"
    return xml_content


def generate_pages_sitemap(site_url):
    """정적 페이지용 sitemap XML을 생성합니다."""
    pages = [
        {"url": "/", "priority": "1.0", "changefreq": "weekly"},
        {"url": "/categories/", "priority": "0.9", "changefreq": "monthly"},
        {"url": "/tags/", "priority": "0.9", "changefreq": "monthly"},
        {"url": "/categories-archive/", "priority": "0.8", "changefreq": "monthly"},
        {"url": "/tags-archive/", "priority": "0.8", "changefreq": "monthly"},
    ]

    xml_content = f"""---
layout: null
---
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
"""

    for page in pages:
        xml_content += f"""  <url>
    <loc>{site_url}{page['url']}</loc>
    <lastmod>{datetime.now().strftime('%Y-%m-%d')}T00:00:00+00:00</lastmod>
    <changefreq>{page['changefreq']}</changefreq>
    <priority>{page['priority']}</priority>
  </url>
"""

    xml_content += "</urlset>"
    return xml_content


def main():
    # 설정
    posts_dir = "_posts"
    site_url = "https://blog.secrett2633.site"  # _config.yml에서 가져와야 함
    posts_per_sitemap = 100

    # 기존 sitemap 파일들 삭제
    for sitemap_file in glob.glob("sitemap-posts-*.xml"):
        os.remove(sitemap_file)
    if os.path.exists("sitemap-pages.xml"):
        os.remove("sitemap-pages.xml")

    # 포스트 가져오기
    posts = get_posts_from_directory(posts_dir)
    print(f"총 {len(posts)}개의 포스트를 발견했습니다.")

    # 포스트 sitemap 생성
    for i in range(0, len(posts), posts_per_sitemap):
        sitemap_number = (i // posts_per_sitemap) + 1
        posts_chunk = posts[i : i + posts_per_sitemap]

        sitemap_content = generate_posts_sitemap(posts_chunk, sitemap_number, site_url)
        sitemap_filename = f"sitemap-posts-{sitemap_number}.xml"

        with open(sitemap_filename, "w", encoding="utf-8") as f:
            f.write(sitemap_content)

        print(f"{sitemap_filename} 생성 완료 ({len(posts_chunk)}개 포스트)")

    # 페이지 sitemap 생성
    pages_sitemap_content = generate_pages_sitemap(site_url)
    with open("sitemap-pages.xml", "w", encoding="utf-8") as f:
        f.write(pages_sitemap_content)

    print("sitemap-pages.xml 생성 완료")
    print("모든 sitemap 파일이 성공적으로 생성되었습니다!")


if __name__ == "__main__":
    main()
