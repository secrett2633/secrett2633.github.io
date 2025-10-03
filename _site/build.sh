#!/bin/bash
# Jekyll 빌드 전에 sitemap을 자동으로 생성하는 스크립트

echo "Sitemap 생성 중..."

# Python 스크립트 실행
python3 scripts/generate_sitemaps.py

if [ $? -eq 0 ]; then
    echo "Sitemap 생성 완료!"
    echo "Jekyll 빌드 시작..."
    
    # Jekyll 빌드 실행
    bundle exec jekyll build
    
    if [ $? -eq 0 ]; then
        echo "Jekyll 빌드 완료!"
    else
        echo "Jekyll 빌드 실패!"
        exit 1
    fi
else
    echo "Sitemap 생성 실패!"
    exit 1
fi
