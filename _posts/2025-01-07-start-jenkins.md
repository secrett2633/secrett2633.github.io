---
title: "[Jenkins] Jenkins 초기 설정"
excerpt: "Jenkins 초기 설정 방법을 공유합니다."

categories:
  - Jenkins
tags:
  - [Jenkins]

permalink: /jenkins/start-jenkins/

toc: true
toc_sticky: true

date: 2025-01-07 19:03:11+0900
last_modified_at: 2025-01-07 19:03:11+0900
published: true
---

## **들어가며**

Jenkins는 지속적인 통합(CI) 및 지속적인 배포(CD)를 위한 오픈소스 자동화 도구입니다.  
이 포스트에서는 Jenkins를 설치하고 기본적인 설정을 진행하는 방법을 다뤄보겠습니다.

## **Jenkins 설치**

이번 포스트에서는 Docker를 사용하여 Jenkins를 설치하는 방법을 설명하겠습니다.  
만약 Docker가 설치되어 있지 않다면, [Docker 설치 가이드](https://docs.docker.com/get-docker/)를 참고하여 설치해 주세요.

### **1. docker-compose.yml 파일 작성**

Jenkins를 Docker에서 실행하려면 `docker-compose.yml` 파일을 생성하고 아래 내용을 추가해야 합니다.

```yml
version: '3.8'
services:
  jenkins: 
    image: jenkins/jenkins:lts-jdk17
    container_name: jenkins
    environment:
      - TZ=Asia/Seoul
    user: root
    privileged: true
    ports:
      - 8080:8080
      - 50000:50000
    volumes:
      - ./jenkins/config:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
```

위 파일을 작성한 후, Jenkins를 실행할 디렉토리에서 `docker-compose.yml`을 저장합니다.

### **2. Jenkins 실행**

이제 아래 명령어를 실행하여 Jenkins를 백그라운드에서 실행합니다.

```bash
docker-compose up -d
```

### **3. Jenkins 초기 설정**

`docker-compose` 명령어가 실행되면, localhost:8080 로 접속하여 Jenkins 초기 페이지에 접근할 수 있습니다.  

Jenkins의 초기 비밀번호를 확인하려면 아래 명령어를 입력하세요:

```bash
docker exec -it jenkins bash -c "cat /var/jenkins_home/secrets/initialAdminPassword"
```

초기 비밀번호를 입력하면, 설치 화면이 나타납니다.  
이때, **[Install Suggested plugins]**를 선택하고 필요한 플러그인을 설치하세요.

### **4. 계정 생성 및 URL 설정**

플러그인 설치가 완료되면, 계속해서 화면을 따라 계정을 생성합니다.  
마지막으로 Jenkins URL 설정 화면이 나타나면, localhost:8080 으로 설정해줍니다.

---

다음 포스팅에서는 Jenkins 플러그인 설치 및 설정 방법에 대해 다룰 예정입니다.

