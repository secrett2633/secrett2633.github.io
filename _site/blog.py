import os
import time
import frontmatter
import markdown
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from datetime import datetime, timezone
from dateutil import parser

# --- 설정 ---
SCOPES = ['https://www.googleapis.com/auth/blogger']
BLOG_ID = '2076972569670731503'  # 실제 블로그 ID로 변경하세요
POSTS_DIR = '_posts'

def get_blogger_service():
    """Blogger API 서비스 객체를 인증하고 반환합니다."""
    creds = None
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            # 이전에 사용했던 client_secret.json과 token.json을 그대로 사용하면 됩니다.
            flow = InstalledAppFlow.from_client_secrets_file(
                'client_secret.json', SCOPES)
            creds = flow.run_local_server(port=0)
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
    return build('blogger', 'v3', credentials=creds)

def upload_post_to_blogger(service, title, content_html, labels, published_date):
    """게시물을 Blogger에 업로드하며, 사용량 제한 시 자동으로 재시도합니다."""
    post_body = {
        'blog': {'id': BLOG_ID},
        'title': title,
        'content': content_html,
        'labels': labels,
        'published': published_date
    }
    
    max_retries = 5
    retry_delay = 5  # 초 단위, 재시도 시 두 배씩 증가

    for attempt in range(max_retries):
        try:
            # isDraft=False로 설정하여 바로 발행합니다.
            post = service.posts().insert(blogId=BLOG_ID, body=post_body, isDraft=False).execute()
            print(f"✅ 성공적으로 업로드: '{post['title']}'")
            return post
        except HttpError as e:
            # 오류가 403이고, 내용에 'quotaExceeded' 또는 'usageLimits'가 포함된 경우에만 재시도
            error_content = e.content.decode()
            if e.resp.status == 403 and ('quotaExceeded' in error_content or 'usageLimits' in error_content):
                if attempt < max_retries - 1:
                    print(f"❕ 사용량 제한 도달. {retry_delay}초 후 재시도합니다... (시도 {attempt + 1}/{max_retries})")
                    time.sleep(retry_delay)
                    retry_delay *= 2  # 다음 재시도를 위해 대기 시간 증가
                else:
                    print(f"❌ '{title}' 업로드 실패: 최대 재시도 횟수를 초과했습니다.")
                    return None
            else:
                # 다른 종류의 오류일 경우 재시도하지 않고 바로 실패 처리
                print(f"❌ '{title}' 업로드 중 복구할 수 없는 오류 발생: {e}")
                print(f"오류 상세 정보: {error_content}")
                return None
    return None

def main():
    if BLOG_ID == 'YOUR_BLOG_ID':
        print("오류: BLOG_ID를 당신의 실제 Blogger 블로그 ID로 변경해주세요.")
        return
        
    service = get_blogger_service()
    if not service:
        print("Blogger 서비스 인증에 실패했습니다.")
        return

    filenames = sorted(os.listdir(POSTS_DIR))
    
    for filename in filenames[500:600]:
        if filename.endswith((".md", ".markdown")):
            filepath = os.path.join(POSTS_DIR, filename)
            print(f"\n--- 파일 처리 시작: {filename} ---")
            with open(filepath, 'r', encoding='utf-8') as f:
                post_data = frontmatter.load(f)
                title = post_data.metadata.get('title', filename)
                content_html = markdown.markdown(post_data.content, extensions=['fenced_code', 'codehilite'])
                labels = []
                if 'tags' in post_data.metadata and post_data.metadata['tags']:
                    labels.extend(post_data.metadata['tags'])
                if 'categories' in post_data.metadata and post_data.metadata['categories']:
                    labels.extend(post_data.metadata['categories'])
                
                raw_date = post_data.metadata.get('date')
                if raw_date:
                    dt_object = parser.parse(str(raw_date))
                    if dt_object.tzinfo is None:
                        dt_object = dt_object.replace(tzinfo=timezone.utc)
                    published_date = dt_object.isoformat()
                else:
                    published_date = datetime.now(timezone.utc).isoformat()
                
                # 업로드 함수 호출
                upload_post_to_blogger(service, title, content_html, labels, published_date)
                
                # 각 요청 사이에 기본적으로 1초 대기 (API 서버에 부담을 덜 줌)
                time.sleep(40)

if __name__ == '__main__':
    main()