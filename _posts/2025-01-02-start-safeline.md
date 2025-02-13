---
title: "[SafeLine] SafeLine 초기 설정"
excerpt: "SafeLine 초기 설정 방법을 공유합니다."

categories:
  - SafeLine
tags:
  - [SafeLine]

permalink: /safeline/start-safeline/

toc: true
toc_sticky: true

date: 2025-01-02 13:03:11+0900
last_modified_at: 2025-01-02 14:10:14+0900
published: true
---

## 1. SafeLine은 무엇인가요?

> **들어가며**  
백엔드 배포를 열심히 진행했지만 보안에 대해서는 신경을 쓰지 않으셨나요?  
저는 SQL Injection, XSS, CSRF 등 여러 가지 공격 방법에 대해 들어본 적은 있지만, 바쁜 일정을 이유로 보안에 대해 충분히 신경을 쓸 시간이 없었습니다. 그러던 중, **SafeLine**이라는 보안 프레임워크를 알게 되었고, 이 기회에 한번 사용해보기로 했습니다.

## 2. SafeLine 설치

SafeLine의 설치 방법은 [SafeLine 링크](https://docs.waf.chaitin.com/en/tutorials/install)에서 확인할 수 있습니다.  
자동 설치 방법과 수동 설치 방법이 제공되는데, 저는 수동으로 설치하는 방법을 선택하여 진행해 보았습니다.

### 2.1. 수동 설치 방법

1. **GitHub에서 클론하기**  
   먼저 [SafeLine GitHub 링크](https://github.com/chaitin/SafeLine)에 접속한 뒤, 클론 버튼을 눌러 저장소를 복제합니다.  
   터미널에서 다음 명령어를 입력하여 클론할 수 있습니다.

   ```bash
   git clone https://github.com/chaitin/SafeLine.git
   ```

2. **.env 파일 생성하기**  
   클론이 완료되면, 터미널에서 클론한 폴더로 이동하여 `.env` 파일을 생성합니다.  
   `.env` 파일에는 아래와 같은 내용을 작성해야 합니다.

   ```plaintext
   SAFELINE_DIR=/data/safeline
   IMAGE_TAG=latest
   MGT_PORT=9443
   POSTGRES_PASSWORD={postgres-password}
   SUBNET_PREFIX=172.22.222
   IMAGE_PREFIX=chaitin
   ARCH_SUFFIX=
   RELEASE=
   REGION=-g
   ```

   여기서 `{postgres-password}`는 사용할 비밀번호로 수정해야 합니다.

3. **배포하기**  
   준비가 완료되면, 아래의 `docker` 명령어를 사용하여 배포할 수 있습니다.

   ```bash
   docker compose up -d
   ```

4. **배포 후 접속**  
   배포가 완료되면, 아래 주소로 접근하여 SafeLine 관리 페이지에 접속할 수 있습니다.  

   ```
   http://localhost:9443/
   ```

5. **아이디 및 비밀번호 발급받기**  
   페이지에 접근하면 로그인 화면이 나타나며, 다음 명령어를 사용하여 관리자 아이디와 비밀번호를 발급받을 수 있습니다.

   ```bash
   docker exec safeline-mgt resetadmin
   ```

6. **SafeLine 대시보드 확인하기**  
   이제 SafeLine 대시보드 화면을 확인할 수 있습니다. 다양한 보안 기능과 설정을 구경해보세요.
   ![SafeLine 대시보드](/assets/images/posts_img/devops/safeline/safeline_dashboard.png)
---
