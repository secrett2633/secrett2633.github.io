---
title: "[AWS] AWS Lambda와 Notion API를 활용한 15분 단위 자동 기록 시스템" 
excerpt: "AWS Lambda, Notion API, Slack Webhook을 활용하여 15분마다 자동으로 시간을 기록하고 Slack 알림을 받는 시스템을 구축하는 방법을 설명합니다."

categories:
  - AWS
tags:
  - [AWS, Lambda, EventBridge]

permalink: /devops/aws/aws-lambda-eventbridge/

toc: true
toc_sticky: true

date: 2025-02-25 18:57:00+0900
last_modified_at: 2025-02-25 19:36:00+0900
published: true
---

# 들어가며

지난 글에서는 뇌과학적으로 게으름과 무기력을 극복하는 방법에 대해 다루었습니다. 그 방법 중 하나로 내가 하고 있는 행동이나 생각을 말로 설명하는 것이 있었는데, 이를 확장하여 15분 단위로 행동을 기록하면 시간을 효율적으로 사용할 뿐만 아니라 과거의 내가 어떤 행동을 했는지 기억할 수 있다는 장점이 있습니다. 그래서 이를 실천하기 위해 AWS Lambda와 Notion API, Slack Webhook을 활용하여 자동 기록 시스템을 구축하였습니다.

## 시스템 개요

이 시스템은 다음과 같은 방식으로 동작합니다:

1. AWS Lambda 함수를 작성하여 15분 단위로 실행되도록 설정합니다.
2. Amazon EventBridge를 이용해 정해진 시간마다 Lambda 함수를 실행합니다.
3. 실행된 Lambda 함수는 Notion API를 통해 데이터베이스에 새로운 행을 추가합니다.
4. 동시에 Slack Webhook을 이용하여 15분이 지났음을 알리는 메시지를 Slack에 전송합니다.

## Notion API 설정

### 1. Notion API Key 발급

Notion API를 사용하려면 API Key와 Database ID가 필요합니다.

- Notion 웹사이트에서 [Developers 페이지](https://developers.notion.com/)에 접속합니다.
- `View My Integration` -> `New Integration` 버튼을 클릭하여 정보를 입력하고 API Key를 발급받습니다.

### 2. Notion Database ID 확인

- 생성한 Notion 데이터베이스에서 `...` 버튼을 클릭 후 `Copy link to view`를 선택합니다.
- 복사한 링크는 다음과 같은 형태입니다.
  ```
  https://www.notion.so/secrett2633/{database_id}?v={필요없는 값}
  ```
- `{database_id}` 부분만 추출하여 사용합니다.

### 3. Integration 등록

- Notion 데이터베이스에서 `...` 버튼 -> `Connection` -> 위에서 생성한 Integration을 선택하여 등록합니다.
- 이 과정을 거치지 않으면 API 요청 시 에러가 발생할 수 있습니다.

## Slack Webhook 설정

### 1. Slack App 생성

- [Slack API 페이지](https://api.slack.com/apps)에서 `Slack App`을 생성합니다.
- `Incoming Webhooks` 메뉴로 이동하여 Webhook 기능을 활성화합니다.
- `Add New Webhook to Workspace` 버튼을 눌러 Webhook URL을 발급받습니다.
- 발급받은 URL을 사용하여 특정 Slack 채널에 메시지를 전송할 수 있습니다.

## AWS Lambda 배포 및 설정

### 1. Lambda 함수 작성

- Lambda 함수에서 Notion API를 호출하여 데이터베이스에 새로운 행을 추가합니다.
- Slack Webhook을 호출하여 알림 메시지를 전송합니다.
- Python을 사용하여 함수를 작성하며, `requests`, `pytz` 라이브러리를 사용합니다.

### 2. 필요 라이브러리 설치 및 Layer 생성

AWS Lambda는 기본적으로 `requests`, `pytz` 등의 라이브러리를 포함하지 않으므로 Layer를 생성하여 추가해야 합니다.

```bash
mkdir python
pip install requests pytz -t python/
zip -r layer.zip python/
```

이제 생성한 `layer.zip`을 AWS Lambda에 업로드하여 Layer를 추가할 수 있습니다.

1. AWS Lambda에서 `계층 생성` 버튼 클릭
2. 이름, 설명, 런타임을 선택하고 `layer.zip` 파일을 업로드
3. 생성된 Layer를 Lambda 함수에 추가

### 3. EventBridge를 통한 자동 실행 설정

Lambda 함수를 15분마다 자동 실행되도록 EventBridge를 설정합니다.

1. **Amazon EventBridge** -> `스케줄러 일정` -> `일정 생성`
2. 이름과 설명 입력 후 `반복 일정`을 선택
3. `cron 표현식` 입력 (예: 매일 9시~23시 사이 15분 간격 실행)
   ```
   0/15 9-23 * * ? *
   ```
4. 다음 버튼을 눌러 `AWS Lambda 함수`를 선택하고 생성한 함수를 연결
5. 설정을 완료하여 일정이 자동 실행되도록 구성

## 마무리

이제 설정이 완료되었으므로, 15분마다 Notion 데이터베이스에 자동으로 시간이 기록되고 Slack 알림을 받을 수 있습니다. 이를 통해 자신의 시간 사용을 효율적으로 관리하고 기록할 수 있습니다.

