---
title: "Jenkins 파이프라인 생성"
excerpt: "Jenkins 파이프라인 생성하기" 

categories:
  - Jenkins
tags:
  - [Jenkins]

permalink: /jenkins/create-pipeline-with-jenkins/

toc: true
toc_sticky: true

date: 2025-01-08 03:03:11+0900
last_modified_at: 2025-01-14 03:43:11+0900
published: true
---

## **들어가며**
이전 포스트에서는 Jenkins를 설치하고 초기 설정을 완료했습니다.  
이번 포스트에서는 Jenkins 파이프라인을 사용하여 서비스를 배포하는 방법에 대해 다뤄보겠습니다.  
파이프라인을 통해 자동화된 배포를 설정하는 과정이므로, 실습을 통해 배포 과정을 간편하게 처리할 수 있습니다.

## **파이프라인 생성**

1. Jenkins 대시보드에서 **새로운 Item 생성** 버튼을 클릭합니다.
2. 새로운 파이프라인을 생성하기 위해 **Pipeline**을 선택하고, 적당한 이름을 입력합니다.

   ![파이프라인 생성](/assets/images/posts_img/devops/jenkins/create_pipeline.png)

3. **Pipeline script from SCM** 버튼을 클릭하여, 소스 코드 관리(SCM)에서 Git을 선택합니다.
4. **Repository URL**에 Git 저장소 주소를 입력하고, **Branch Specifier**에는 배포할 브랜치 이름을 입력합니다.

5. **Script Path**에는 파이프라인을 정의할 파일 경로를 입력합니다. 기본적으로 `Jenkinsfile`이라는 파일을 사용합니다. 이 파일은 파이프라인의 정의 파일입니다.

6. **저장** 버튼을 클릭하여 파이프라인을 생성합니다.

위에서 언급한 `Jenkinsfile`은 Jenkins 파이프라인을 정의하는 중요한 파일입니다. 이 파일을 Git 저장소에 추가해두어야 Jenkins가 이를 읽고 실행할 수 있습니다.

## **Jenkinsfile 예시**

Jenkinsfile을 작성하는 예시는 다음과 같습니다. 아래 코드를 Git 저장소의 `Jenkinsfile` 파일에 추가하세요.

```Jenkinsfile
pipeline {
    agent any
    
    environment {
        DOCKER_COMPOSE_VERSION = '3.8'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build and Deploy') {
            steps {
                sh '''
                    docker compose down
                    docker compose pull
                    docker compose up --build -d
                '''
            }
        }
        
        stage('Health Check') {
            steps {
                script {
                    sleep 30  // 서비스 시작 대기
                    sh 'docker compose ps'
                }
            }
        }
    }
    
    post {
        failure {
            sh 'docker compose logs'
        }
    }
}
```

### **코드 설명**
- **`agent any`**: 모든 노드에서 실행 가능하다는 선언입니다.
- **`environment`**: 환경 변수를 정의하는 부분입니다. 여기서는 `DOCKER_COMPOSE_VERSION`을 설정합니다.
- **`stages`**: 파이프라인의 각 단계를 정의합니다.
    - **Checkout**: 소스 코드 저장소에서 최신 코드를 가져옵니다.
    - **Build and Deploy**: `docker-compose` 명령어로 서비스를 빌드하고 배포합니다.
    - **Health Check**: 배포 후 서비스가 정상적으로 시작되었는지 확인합니다.
- **`post`**: 파이프라인 실행 후 실패 시 추가 작업을 정의합니다. 예를 들어, 실패한 경우 로그를 출력하도록 설정했습니다.

### **서비스 배포 과정**

위 파이프라인에서 사용된 `docker compose` 명령어를 보면, `docker-compose.yml` 파일을 통해 서비스를 배포하고 있습니다. 하지만 Jenkins가 기본적으로 `docker-compose` 명령어를 사용할 수 없기 때문에, 몇 가지 추가 설정이 필요합니다.

## **docker-compose 설정**

우리는 Jenkins가 실행되는 컨테이너에서 `docker-compose`를 사용할 수 있도록 설정해야 합니다. 이를 위해 `docker-compose.yml` 파일을 다음과 같이 작성합니다.

```docker-compose.yml
version: '3.8'
services:
  jenkins:
    build: .
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

위 설정에서 중요한 부분은 **`/var/run/docker.sock`**을 Jenkins 컨테이너에 마운트하여, Jenkins가 Docker를 사용할 수 있게 하는 것입니다.

## **Dockerfile 설정**

추가로 `Dockerfile`을 작성하여 Jenkins 환경에 Docker를 설치해야 합니다. 아래는 해당 파일의 예시입니다.

```Dockerfile
FROM jenkins/jenkins:lts-jdk17
USER root

RUN curl -fsSL get.docker.com -o get-docker.sh
RUN sh get-docker.sh

RUN groupadd -f docker
RUN usermod -aG docker jenkins
```

이 파일은 Jenkins 컨테이너에 Docker를 설치하고, `jenkins` 사용자가 Docker 그룹에 추가되도록 설정합니다.

## **Jenkins 재시작**

이제 위 파일들을 작성한 후, 아래 명령어로 Jenkins 서버를 재시작합니다.

```bash
docker compose down
docker compose up -d
```

위 명령어는 Docker Compose를 사용하여 Jenkins 서버를 재시작하는 명령입니다. 서버가 재시작되면 Jenkins에서 Docker 명령어를 사용할 수 있습니다.

## **파이프라인 실행**

모든 설정이 완료되었으면, Jenkins 대시보드에서 생성한 파이프라인을 실행할 준비가 되었습니다. **빌드 버튼**을 클릭하여 파이프라인을 실행합니다.

파이프라인이 정상적으로 실행되면, Jenkins 로그에 배포가 성공했다고 나타납니다.

**로그 예시**
```
Build and Deploy stage succeeded.
Health Check passed.
```

그러나 저의 경우 배포 후, 서비스에 접근할 수 없다는 문제가 발생했는데<br>
이는 다음 포스트에서 다루도록 하겠습니다.

**2025-01-14 수정**
docker in docker 문제로, Jenkins 를 docker 으로 실행하지 않고 직접 설치하면 해결됩니다.
