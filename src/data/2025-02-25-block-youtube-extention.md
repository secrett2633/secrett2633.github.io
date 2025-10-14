---
title: "[Chrome Extention] YouTube 차단 확장 프로그램 개발하기" 
excerpt: "YouTube 접속을 차단하고 생산성을 높이는 크롬 확장 프로그램을 만들어보세요. 개발 과정과 설치 방법을 자세히 설명합니다."

categories:
  - Chrome Extension
tags:
  - [Chrome Extension]

permalink: /etc/chrome-extension/block-youtube-with-chrome-extension/

toc: true
toc_sticky: true

date: 2025-02-25 18:01:00+0900
last_modified_at: 2025-02-25 18:10:00+0900
published: true
---
# 들어가며

지난 글에서는 뇌과학적으로 게으름과 무기력을 극복하는 방법에 대해 다루었습니다. 그 방법 중 하나로 **불필요한 정보를 차단하는 방법**이 있었는데요. 저의 경우 YouTube 시청 시간이 길었기에, YouTube에 접속할 때마다 제가 작성한 뇌과학적으로 게으름과 무기력을 극복하는 글로 **자동 리다이렉트**해주는 확장 프로그램을 만들었습니다.
이 글에서는 해당 크롬 확장 프로그램을 만드는 방법을 공유하겠습니다.

## 확장 프로그램 개발

크롬 확장 프로그램을 만들기 위해서는 **`manifest.json` 파일**과 **백그라운드 스크립트 (`background.js`)** 가 필요합니다.

### 1. `manifest.json` 작성

```json
{
    "manifest_version": 3,
    "name": "YouTube Redirector",
    "version": "1.0",
    "description": "YouTube 접속 시 특정 사이트를 새 창에 엽니다",
    "permissions": ["tabs", "webNavigation"],
    "host_permissions": ["*://youtube.com/*"],
    "background": {
      "service_worker": "background.js"
    }
}
```

#### 설명
- `manifest_version: 3`: 최신 크롬 확장 프로그램 버전
- `name`, `version`, `description`: 확장 프로그램의 기본 정보
- `permissions`: 확장 프로그램이 사용할 권한 (탭과 웹 탐색 감지)
- `host_permissions`: YouTube 사이트에 대한 접근 권한
- `background`: 백그라운드 스크립트로 `background.js` 사용

### 2. `background.js` 작성

```js
chrome.webNavigation.onCompleted.addListener(
    function(details) {
      // YouTube 도메인에 접속했을 때만 실행
      if (details.url.includes("www.youtube.com") && details.frameId === 0) {
        // 현재 탭에서 원하는 URL로 이동
        chrome.tabs.update(details.tabId, {
          url: "https://secrett2633.github.io/me/brain-hack-productivity/"
        });
      }
    },
    { url: [{ hostContains: "youtube.com" }] }
);
```

#### 설명
- `chrome.webNavigation.onCompleted.addListener()`: 사용자가 웹 탐색을 완료했을 때 실행됨
- `details.url.includes("www.youtube.com")`: YouTube 사이트에 접속했는지 확인
- `chrome.tabs.update()`: 현재 탭을 원하는 URL로 변경


## 확장 프로그램 설치 방법

1. 위 코드를 `manifest.json`과 `background.js` 파일로 저장합니다.
2. 크롬에서 `chrome://extensions/` 페이지로 이동합니다.
3. **개발자 모드**를 활성화합니다.
4. "압축해제된 확장 프로그램 로드" 버튼을 클릭하고 해당 폴더를 선택합니다.
5. 확장 프로그램이 정상적으로 등록되면 YouTube 접속 시 자동으로 설정한 URL로 이동됩니다.


## 마치며
현재는 로컬에서만 사용할 수 있으며, 실제로 배포하려면 **크롬 웹 스토어에 업로드**해야 합니다.
추후 크롬 웹 스토어에 업로드하는 방법도 공유하겠습니다.
