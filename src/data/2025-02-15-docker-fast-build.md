---
title: "[Docker] 빠른 빌드 방법"
excerpt: "Docker 빌드 속도를 높이는 방법을 공유합니다."

categories:
  - Docker
tags:
  - [Docker]

permalink: /devops/docker/fast-build/

toc: true
toc_sticky: true

date: 2025-02-14 11:30:11+0900
last_modified_at: 2025-02-15 00:11:11+0900
published: true
---

## Dockerfile 최적화: 의존성 관리 개선

### 문제점: 매번 라이브러리 재설치

기존 Dockerfile에서는 별다른 라이브러리 설치 과정 없이 의존성을 관리하고 있었으나, **매번 Docker 이미지 빌드 시마다 라이브러리를 새로 설치** 하는 문제가 발생했습니다. 이로 인해 빌드 시간이 길어지고, 이미지를 빌드하는 데 시간이 많이 소요되었죠.

### 해결책: `poetry`로 의존성 관리 최적화

문제를 해결하기 위해, **`poetry`** 를 사용하여 의존성 관리를 진행하고 있었습니다. 하지만 `poetry`의 의존성 설치가 매번 반복적으로 실행되는 문제를 해결하기 위해, `Dockerfile`의 `ENV` 설정을 변경했습니다. 이 설정을 통해 **라이브러리가 변경되지 않는 한 의존성 설치가 반복되지 않도록** 최적화할 수 있었습니다.

### 최적화된 Dockerfile

```Dockerfile
# Python 3.10.11 이미지를 기반으로 빌드 환경을 설정
FROM python:3.10.11 AS builder

# poetry 버전 설정 (기본값: 1.5.1)
ARG POETRY_VERSION=1.5.1

# poetry 설치
RUN python -m pip install --no-cache-dir poetry==${POETRY_VERSION}

# 환경 변수 설정
ENV POETRY_NO_INTERACTION=1 \       # interactive 모드 비활성화
    POETRY_VIRTUALENVS_IN_PROJECT=1 \  # 프로젝트 내 가상 환경 사용
    POETRY_VIRTUALENVS_CREATE=1 \      # 가상 환경 자동 생성
    POETRY_CACHE_DIR=/tmp/poetry_cache \  # poetry 캐시 디렉토리 설정
    PYTHONDONTWRITEBYTECODE=1 \       # Python 바이트 코드 생성을 방지
    PYTHONUNBUFFERED=1               # 버퍼링을 사용하지 않음

# 작업 디렉토리 설정
WORKDIR /workdir

# poetry 의존성 파일 복사 및 의존성 설치
COPY pyproject.toml poetry.lock /workdir/
RUN poetry install --no-root && rm -rf $POETRY_CACHE_DIR  # 의존성 설치 후 캐시 삭제

# 애플리케이션 코드 복사
COPY /app /workdir/app
```

### 설명

- `FROM python:3.10.11 AS builder`: **Python 3.10.11** 을 베이스로 사용하는 빌드 환경을 설정합니다.
  
- `ARG POETRY_VERSION=1.5.1`: 사용할 `poetry` 버전을 명시적으로 설정합니다.

- `RUN python -m pip install --no-cache-dir poetry==${POETRY_VERSION}`: `poetry`를 설치하는 명령어입니다. `--no-cache-dir` 옵션을 사용하여 캐시를 사용하지 않도록 설정하여 이미지를 최적화합니다.

- `ENV` 설정:
  - `POETRY_NO_INTERACTION=1`: 설치 과정 중 사용자 입력을 요구하지 않도록 합니다.
  - `POETRY_VIRTUALENVS_IN_PROJECT=1`: 프로젝트 내에 가상 환경을 생성하도록 설정합니다.
  - `POETRY_VIRTUALENVS_CREATE=1`: 가상 환경을 자동으로 생성하도록 설정합니다.
  - `POETRY_CACHE_DIR=/tmp/poetry_cache`: `poetry`의 캐시를 지정한 경로로 설정하여 빌드 후 삭제할 수 있습니다.
  - `PYTHONDONTWRITEBYTECODE=1`: Python이 `.pyc` 파일을 생성하지 않도록 설정합니다.
  - `PYTHONUNBUFFERED=1`: Python의 출력을 버퍼링 없이 바로 표시합니다.

- `WORKDIR /workdir`: 작업 디렉토리를 `/workdir`로 설정하여 이후의 명령어들이 해당 디렉토리에서 실행되도록 합니다.

- `COPY pyproject.toml poetry.lock /workdir/`: 의존성 파일인 `pyproject.toml`과 `poetry.lock`을 복사합니다.

- `RUN poetry install --no-root && rm -rf $POETRY_CACHE_DIR`: `poetry install` 명령어로 의존성을 설치한 후, `poetry` 캐시를 삭제하여 이미지 크기를 줄입니다.

- `COPY /app /workdir/app`: 실제 애플리케이션 코드를 복사합니다.

### 최적화 효과

이 설정을 통해, **의존성 파일이 변경되지 않으면 `poetry install` 명령어가 실행되지 않** 습니다. 이는 Docker 이미지 빌드 속도를 크게 향상시키고, 불필요한 의존성 설치를 방지하는 데 효과적입니다.
