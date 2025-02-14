---
title: "[Django] Makefile 사용하기"
excerpt: "Django 프로젝트에서 Makefile을 사용하는 방법을 공유합니다."

categories:
  - Django
tags:
  - [Django]

permalink: /backend/django/makefile/

toc: true
toc_sticky: true

date: 2025-02-15 04:20:00+0900
last_modified_at: 2025-02-15 04:40:00+0900
published: true
---

## Makefile이란?

Makefile은 자주 사용하는 명령어나 스크립트를 정의하여 간편하게 실행할 수 있도록 도와주는 파일입니다. 
코드가 길거나 복잡한 경우 짧은 명령어로 선언하여 쉽게 사용 가능하며, 코드 재사용과 유지보수에 용이합니다.

Django 프로젝트에서 사용하는 예시를 통해 `Makefile`의 사용법을 소개합니다.

### Makefile 예시

```makefile
SHELL := /bin/bash  # Bash 문법 사용
ARG := $(word 2, $(MAKECMDGOALS))

# 파이썬 캐시 파일 삭제
clean:
	@find . -name "*.pyc" -exec rm -rf {} \;
	@find . -name "__pycache__" -delete

# 테스트 실행
test:
	poetry run python manage.py test

# 백엔드 코드 포맷팅 (black 사용)
backend_format:
	black .

# Docker 관련 명령어들
docker_up:
	docker compose up -d

docker_update_dependencies:
	docker compose down
	docker compose up -d --build

docker_down:
	docker compose down

docker_logs:
	docker compose logs -f $(ARG)

docker_backend_shell:
	docker compose run --rm app bash
```

### 각 명령어의 역할

- `clean`: 프로젝트 내의 파이썬 캐시 파일 (`*.pyc`, `__pycache__`)을 삭제합니다.
- `test`: `poetry`를 사용하여 의존성 관리와 함께 테스트를 실행할 수 있습니다.
- `backend_format`: 코드 포매터인 `black`을 사용하여 백엔드 코드를 자동으로 포맷팅합니다.
- `docker_up`: Docker Compose를 사용하여 서비스를 백그라운드에서 실행합니다.
- `docker_update_dependencies`: Docker Compose를 내리고, 서비스를 다시 빌드하여 의존성 업데이트를 적용합니다.
- `docker_down`: Docker Compose로 실행 중인 서비스를 종료합니다.
- `docker_logs`: Docker Compose 로그를 실시간으로 출력합니다.
- `docker_backend_shell`: Docker Compose로 실행 중인 백엔드 애플리케이션의 셸에 접속합니다.

### Makefile 명령어 실행 방법

Makefile에서 정의된 명령어를 실행하려면 다음과 같은 명령어를 터미널에서 입력합니다:

```bash
make clean
make test
make backend_format
make docker_up
make docker_update_dependencies
make docker_down
make docker_logs
make docker_backend_shell
```

각각의 명령어는 `Makefile`에 정의된 작업을 차례대로 실행합니다. 예를 들어, `make clean`은 캐시 파일을 삭제하고, `make test`는 테스트를 실행하는 등의 역할을 수행합니다.
