---
title: "[Jenkins] 무중단 배포를 위한 파이프라인 구성"
excerpt: "Jenkins를 이용한 무중단 배포 방법을 공유합니다."

categories:
  - Jenkins
tags:
  - [Jenkins]

permalink: /jenkins/zero-downtime-deploy-with-jenkins/

toc: true
toc_sticky: true

date: 2025-01-18 19:03:11+0900
last_modified_at: 2025-01-18 19:03:11+0900
published: true
---

# 무중단 배포 (Blue-Green 배포) 방법

## **들어가며**

지난 포스트에서는 **SSL 인증서 발급**과 이를 **Jenkins 파이프라인**에 적용하는 방법을 다뤘습니다. 이번 포스트에서는 이 설정을 바탕으로 **무중단 배포**를 구현하는 방법을 공유합니다.

## **무중단 배포란?**

무중단 배포는 기존 서비스를 중단하지 않고 새로운 버전을 배포하는 방법입니다. 이렇게 배포를 진행하면 서비스의 가용성을 높일 수 있으며, 사용자에게 끊김 없이 업데이트된 버전을 제공할 수 있습니다.

무중단 배포에는 여러 가지 방법이 있지만, 대표적으로 **Blue-Green 배포**, **Rolling 배포**, **Canary 배포** 방식이 있습니다.

### **1. Blue-Green 배포**

Blue-Green 배포는 두 개의 환경(Blue와 Green)을 유지하여 서비스를 중단 없이 새로운 버전을 배포하는 방법입니다. 하나의 환경(예: Blue)을 운영 중에 두고, 새로운 버전은 다른 환경(예: Green)에서 준비됩니다. 이후 트래픽을 새로운 환경으로 전환하면서 배포를 진행합니다.

### **2. Rolling 배포**

Rolling 배포는 전체 서버를 동시에 업데이트하지 않고, 한 서버씩 점진적으로 새로운 버전을 배포하는 방법입니다. 서비스의 일부만 업데이트되기 때문에 전체 서비스의 다운타임을 최소화할 수 있습니다.

### **3. Canary 배포**

Canary 배포는 새로운 버전을 소수의 사용자에게만 먼저 배포하여 문제가 없는지 확인하는 방법입니다. 문제가 없으면 점차적으로 전체 서비스에 배포를 진행합니다.

이번 포스트에서는 **Blue-Green 배포**를 중심으로 설명하겠습니다.

## **배포 준비**

### **백엔드 서버 준비**

먼저, 백엔드 서버를 준비합니다. 여기서는 **Django 프로젝트**를 사용하고, Docker로 서버 환경을 구성할 것입니다. 각 환경(Blue, Green)을 Docker Compose로 설정합니다. 그리고 윈도우 환경에서 배포를 진행하였습니다.

#### **docker-compose.yml**

```yaml
# docker-compose.yml
version: "3.8"

services:
  ts-proxy:
    image: nginx:1.22.1
    container_name: test-proxy
    restart: always
    volumes:
      - ./nginx:/etc/nginx/conf.d
      - ./static:/usr/share/nginx/html/static
    networks:
      - test-network

  ts-postgres:
    image: postgres:13.10-alpine
    container_name: test-db-dev
    restart: always
    environment:
      - POSTGRES_PASSWORD=postgres
      - DJANGO_DEBUG=False
    networks:
      - test-network
    volumes:
      - ts-db:/var/lib/postgresql/data

  ts-redis:
    image: redis:7.0-alpine
    container_name: test-redis-dev
    restart: always
    networks:
      - test-network

volumes:
  ts-db:

networks:
  test-network:
    name: test-network
    driver: bridge
```

위 파일은 Django 서버에서 사용하는 **DB**, **Redis**, **Nginx** 설정을 포함하고 있습니다. `docker-compose.yml` 파일은 공통으로 사용되며, **Blue**와 **Green** 배포 환경에서도 공유됩니다.

#### **Blue/Green 배포 환경 설정**

- **Blue 환경 (docker-compose-blue.yml)**

```yaml
# docker-compose-blue.yml
version: "3.8"

services:
  ts-django-blue:
    build:
      context: .
    container_name: test-dev-blue
    restart: always
    env_file:
      - .env
    ports:
      - 8000:8000
    environment:
      - PORTS=8000
      - DJANGO_CONFIGURATION=production
    command:
      - /bin/sh
      - -c
      - |
        dockerize -wait tcp://ts-postgres:5432 -timeout 20s
        poetry run python manage.py makemigrations
        poetry run python manage.py migrate
        poetry run gunicorn -c gunicorn.conf.py -b 0.0.0.0:8000 app.core.asgi:application
    networks:
      - test-network
    volumes:
      - ./save:/workdir/save

networks:
  test-network:
    external: true
    name: test-network
    driver: bridge
```

- **Green 환경 (docker-compose-green.yml)**

```yaml
# docker-compose-green.yml
version: "3.8"

services:
  ts-django-green:
    build:
      context: .
    container_name: test-dev-green
    restart: always
    ports:
      - 8001:8001
    env_file:
      - .env
    environment:
      - PORTS=8001
      - DJANGO_CONFIGURATION=production
    command:
      - /bin/sh
      - -c
      - |
        dockerize -wait tcp://ts-postgres:5432 -timeout 20s
        poetry run python manage.py makemigrations
        poetry run python manage.py migrate
        poetry run gunicorn -c gunicorn.conf.py -b 0.0.0.0:8001 app.core.asgi:application
    networks:
      - test-network
    volumes:
      - ./save:/workdir/save

networks:
  test-network:
    external: true
    name: test-network
    driver: bridge
```

### **Nginx 설정**

- **default.conf (공통 설정)**

```nginx
server {
    listen 80;
    server_name localhost;

    include service-url.inc;

    location /static/ {
        alias /usr/share/nginx/html/static/;
    }

    location / {
        proxy_pass http://app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

- **service-url.inc (공통 설정)**

```nginx
upstream app {
    server localhost:8000;
}
```

위 파일들은 공통적으로 사용되는 **Nginx** 설정 파일들로, 두 환경에서 동일하게 사용할 수 있습니다.

## **무중단 배포 Jenkins 파이프라인**

이제 **Jenkins 파이프라인**을 작성하여 배포 자동화 과정을 설정합니다.

```groovy
pipeline {
    agent any
    
    environment {
        DOCKER_COMPOSE_VERSION = '3.8'
        WORKSPACE = "${env.WORKSPACE}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Determine Deploy Target') {
            steps {
                script {
                    def blueContainerOutput = powershell(
                        script: '(docker ps -q -f name=test-dev-blue) -ne $null',
                        returnStdout: true
                    ).trim()

                    echo "blueContainerOutput: ${blueContainerOutput}"
                    
                    def blueContainerExists = blueContainerOutput.toLowerCase() == 'true'

                    echo "blueContainerExists: ${blueContainerExists}"

                    env.CURRENT_COLOR = blueContainerExists ? 'blue' : 'green'
                    env.DEPLOY_COLOR = blueContainerExists ? 'green' : 'blue'
                    env.CURRENT_PORT = blueContainerExists ? '8000' : '8001'
                    env.DEPLOY_PORT = blueContainerExists ? '8001' : '8000'

                    echo "Current running on ${env.CURRENT_COLOR} with port ${env.CURRENT_PORT}"
                    echo "Deploying to ${env.DEPLOY_COLOR} with port ${env.DEPLOY_PORT}"
                }
            }
        }
        
        stage('Deploy New Version') {
            steps {
                script {
                    // 새로운 버전 배포
                    bat "docker-compose -f docker-compose.yml -f docker-compose.${env.DEPLOY_COLOR}.yml up -d --build"
                }
            }
        }
        
        stage('Health Check') {
            steps {
                script {
                    def maxAttempts = 10
                    def attempts = 0
                    def healthy = false
                    
                    while (!healthy && attempts < maxAttempts) {
                        attempts++
                        try {
                            def response = bat(
                                script: "curl -s http://localhost:${env.DEPLOY_PORT}/api/v1/test",
                                returnStdout: true
                            ).trim()
                            
                            if (response) {
                                healthy = true
                                echo "New version is healthy!"
                            }
                        } catch (Exception e) {
                            echo "Attempt ${attempts}/${maxAttempts} failed"
                            if (attempts < maxAttempts) {
                                sleep 10
                            }
                        }
                    }
                    
                    if (!healthy) {
                        error "New version failed health check after ${maxAttempts} attempts"
                    }
                }
            }
        }
        
        stage('Switch Traffic') {
            steps {
                script {
                    // Nginx 설정 업데이트
                    bat """
                        echo upstream app { > ${WORKSPACE}/nginx/service-url.inc
                        echo     server localhost:${env.DEPLOY_PORT}; >> ${WORKSPACE}/nginx/service-url.inc
                        echo } >> ${WORKSPACE}/nginx/service-url.inc
                    """
                    
                    // Nginx 재시작
                    bat 'docker exec test-proxy nginx -s reload'

                    // nginx-nginx-1 재시작
                    bat '''
                        (echo set $service_url http://[서버의 아이피]:%DEPLOY_PORT%;) > temp_service_url.inc
                        docker cp temp_service_url.inc nginx-nginx-1:/etc/nginx/conf.d/test-backend/service-url.inc
                        del temp_service_url.inc
                    '''

                    bat 'docker exec nginx-nginx-1 nginx -s reload'
                }
            }
        }
        
        stage('Cleanup Old Version') {
            steps {
                script {
                    if (env.CURRENT_COLOR != null) {
                        // 이전 버전 종료
                        bat "docker-compose -f docker-compose.${env.CURRENT_COLOR}.yml down"
                    }
                }
            }
        }
    }
    
    post {
        failure {
            script {
                // 배포 실패 시 로그 확인 및 롤백
                bat "docker-compose -f docker-compose.yml -f docker-compose.${env.DEPLOY_COLOR}.yml logs"
                bat "docker-compose -f docker-compose.yml -f docker-compose.${env.DEPLOY_COLOR}.yml down"
                bat """
                    echo upstream app { > ${WORKSPACE}/nginx/service-url.inc
                    echo     server localhost:${env.CURRENT_PORT}; >> ${WORKSPACE}/nginx/service-url.inc
                    echo } >> ${WORKSPACE}/nginx/service-url.inc
                """
                bat "docker exec test-proxy nginx -s reload"
                bat '''
                    (echo set $service_url http://[서버의 아이피]:%CURRENT_PORT%;) > temp_service_url.inc
                    docker cp temp_service_url.inc nginx-nginx-1:/etc/nginx/conf.d/test-backend/service-url.inc
                    del temp_service_url.inc
                '''
                bat "docker exec nginx-nginx-1 nginx -s reload"
            }
        }
    }
}
```

### **파이프라인 설명**

1. **Checkout**: 소스 코드를 불러옵니다.
2. **Determine Deploy Target**: 현재 실행 중인 환경(Blue/Green)을 확인하고, 배포할 환경을 설정합니다.
3. **Deploy New Version**: 새로운 버전을 배포합니다.
4. **Health Check**: 새로 배포한 서버가 정상인지 확인합니다.
5. **Switch Traffic**: 트래픽을 새로운 환경으로 전환합니다.
6. **Cleanup Old Version**: 이전 버전의 환경을 종료하여 자원을 정리합니다.

## **마치며**

이번 포스트에서는 **Blue-Green 배포**를 통한 무중단 배포 방법을 설명했습니다. 이를 통해 **서비스의 가용성**을 높일 수 있으며, **Jenkins 파이프라인**을 활용한 배포 자동화도 가능해졌습니다.