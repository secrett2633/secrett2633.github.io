---
title: "[Nginx] Let's Encrypt로 SSL 인증서 발급받기"
excerpt: "Let's Encrypt로 SSL 인증서를 발급받는 방법을 공유합니다."

categories:
  - Nginx
tags:
  - [Nginx]

permalink: /nginx/get-ssl-auth-with-letsencrypt/

toc: true
toc_sticky: true

date: 2025-01-17 23:10:11+0900
last_modified_at: 2025-01-17 23:10:14+0900
published: true
---

# **들어가며**

웹사이트의 보안을 강화하려면 SSL 인증서가 필수입니다. SSL 인증서를 설치하면 HTTPS를 통해 사이트와 방문자 간의 데이터가 암호화되어 전송되므로 보안성이 높아집니다. 이 포스팅에서는 무료 SSL 인증서 발급 서비스인 **Let's Encrypt** 를 사용하여 Nginx 서버에 SSL 인증서를 발급받고 적용하는 방법을 소개합니다.

## 1. 도메인 준비

SSL 인증서를 발급받기 위해서는 먼저 **도메인** 이 필요합니다. 저는 이번 예제에서 **가비아** 에서 도메인을 구매했으며, 해당 도메인을 사용하여 인증서를 발급받는 방법을 다룰 것입니다. 만약 다른 도메인 제공업체를 사용하고 있다면, DNS 레코드 설정 부분에서 해당 제공업체의 관리 페이지를 참고하시면 됩니다.

## 2. Nginx 설정

SSL 인증서를 설치하려면 Nginx 서버를 설정해야 합니다. 저는 **Docker Compose** 를 사용하여 Nginx와 Certbot을 설치하고 설정합니다. 아래는 `docker-compose.yml` 파일의 예시입니다.

```yaml
version: '3'

services:
  nginx:
    image: nginx:latest
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./conf.d:/etc/nginx/conf.d:rw
      - ./ssl:/etc/nginx/ssl:ro
      - ./certbot/conf:/etc/letsencrypt:ro
    ports:
      - "443:443"
    restart: always
    networks:
      - test-network

  certbot:
    image: certbot/certbot
    volumes:
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot
    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do sleep 12h & wait $${!}; done;'"

networks:
  test-network:
    external: true
```

이 파일을 사용하면, **Nginx** 와 **Certbot** 을 각각의 컨테이너로 실행할 수 있습니다. 설정을 완료한 후, 아래의 명령어로 Docker Compose를 실행합니다.

```bash
docker compose up -d
```

## 3. Let's Encrypt 인증서 발급

Let's Encrypt 인증서를 발급받는 방법에는 여러 가지가 있지만, 저는 **dns-01 인증** 방법을 사용하겠습니다. 이 방법은 도메인의 DNS 레코드에 특정 값을 추가하여 인증서를 발급받는 방식입니다. 아래 절차를 따라 진행해 주세요.

### 3.1 컨테이너 접속

먼저, Certbot 컨테이너에 접속합니다.

```bash
docker exec -it nginx-certbot-1 sh
```

### 3.2 인증서 발급

이제 아래 명령어를 입력하여 인증서를 발급받습니다.

```bash
certbot certonly --manual --preferred-challenges dns -d [인증받을 도메인]
```

위 명령어를 실행하면 `acme-challenge`라는 DNS 레코드를 추가하라는 메시지가 나타납니다. 화면에 출력된 값 그대로 DNS 레코드에 추가해 주세요.

### 3.3 DNS 레코드 추가

도메인 제공업체의 DNS 관리 페이지에서 **TXT 레코드** 를 추가해야 합니다. 추가할 값은 Certbot에서 출력한 `_acme-challenge.[인증받을 도메인]` 형식의 값입니다. DNS 레코드 추가 후, 변경 사항이 전파되기를 기다리면 인증서가 성공적으로 발급됩니다.

![가비아 DNS 레코드 추가](/assets/images/posts_img/devops/nginx/gabia-dns.png)

## 4. Nginx 설정

인증서가 발급되면, Nginx에서 이 인증서를 사용할 수 있도록 설정을 해야 합니다. Let's Encrypt 인증서는 다음 경로에 저장됩니다.

- `/etc/letsencrypt/live/[인증받을 도메인]/fullchain.pem`
- `/etc/letsencrypt/live/[인증받을 도메인]/privkey.pem`

Nginx 설정 파일에 이 경로를 사용하여 SSL을 활성화합니다. 아래는 `nginx.conf` 파일의 예시입니다.

```bash
# nginx.conf
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    keepalive_timeout  65;

    include /etc/nginx/conf.d/test-backend/*.conf;
}
```

그리고 `conf.d/test-backend/test-django.conf` 파일을 생성하여 프로젝트별 설정을 추가합니다.

```bash
# conf.d/test-backend/test-django.conf
server {
    listen 443 ssl;
    server_name [인증받은 도메인];

    include /etc/nginx/conf.d/test-backend/service-url.inc;

    ssl_certificate /etc/letsencrypt/live/[인증받을 도메인]/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/[인증받을 도메인]/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass $service_url;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

이 설정을 통해, `test-backend` 폴더 안에 다양한 서버별로 SSL 설정을 할 수 있습니다. 

## 5. Nginx 적용

Nginx 설정이 완료되었으면, 설정이 정상적으로 적용되었는지 확인해야 합니다. 아래 명령어로 Nginx 컨테이너에 접속한 후, 설정을 테스트합니다.

```bash
docker exec -it nginx-nginx-1 sh
nginx -t
```

설정에 문제가 없다면, 아래 명령어로 Nginx를 재시작하여 설정을 적용합니다.

```bash
nginx -s reload
```

## 6. SSL 인증서 적용 확인

이제 브라우저에서 도메인에 접속해보세요. HTTPS로 접속하면 SSL 인증서가 적용된 것을 확인할 수 있습니다. 만약 인증서가 유효하지 않다면, DNS 레코드 추가나 인증서 발급 과정에서 문제가 있었을 수 있으므로 다시 한 번 확인해 보세요.
또한 포트포워딩을 통해 사용하려는 포트를 열어주어야 합니다. 

---

이로써 **Let's Encrypt** 를 이용한 **Nginx** SSL 인증서 발급과 적용 방법을 마쳤습니다. SSL을 적용하면 웹사이트의 보안을 강화할 수 있으며, 사용자에게 신뢰감을 줄 수 있습니다. 추가적으로, **Certbot** 을 사용하여 SSL 인증서 자동 갱신 설정을 할 수도 있으니 참고해 주세요.