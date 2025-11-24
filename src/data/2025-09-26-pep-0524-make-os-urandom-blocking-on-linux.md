---
title: "[Final] PEP 524 - Make os.urandom() blocking on Linux"
excerpt: "Python Enhancement Proposal 524: 'Make os.urandom() blocking on Linux'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/524/
toc: true
toc_sticky: true
date: 2025-09-26 23:16:54+0900
last_modified_at: 2025-09-26 23:16:54+0900
published: true
---
> **원문 링크:** [PEP 524 - Make os.urandom() blocking on Linux](https://peps.python.org/pep-0524/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 20-Jun-2016

PEP 524: Linux에서 `os.urandom()`을 블로킹 방식으로 변경

## 초록 (Abstract)
이 PEP는 Python의 보안 강화를 위해 Linux 3.17 이상 버전에서 `os.urandom()` 함수가 운영체제의 URBG(Unblocking Random Bit Generator)가 초기화될 때까지 블로킹하도록 수정할 것을 제안합니다. 또한, `os.getrandom()`이라는 새로운 함수를 추가하여 `os.urandom()`이 Linux에서 블로킹될 때의 처리 방식을 선택할 수 있도록 합니다.

## 버그 (The bug)

### 원래 버그 (Original bug)
Python 3.5.0은 Linux 3.17 및 Solaris 11.3에 도입된 새로운 `getrandom()` 시스템 호출을 사용하도록 개선되었습니다. 그러나 이로 인해 가상 머신이나 임베디드 장치에서 Python 3.5가 시작 시 블로킹된다는 불만이 제기되었습니다. Linux에서 `getrandom(0)`은 커널이 128비트 엔트로피로 `urandom`을 초기화할 때까지 블로킹됩니다. 이 문제는 `import random`에서 블로킹되거나, 시스템 초기화 과정에서 `getrandom(0)`으로 인해 Python 초기화가 멈추는 상황으로 나타났습니다. Python은 해시 서비스 거부(DoS) 공격에 대한 대응책으로 무작위 바이트를 필요로 합니다. Python 3.5에서 `random.Random` 생성자는 `Mersenne Twister RNG`에 시드를 제공하기 위해 `os.urandom()`에서 2500바이트를 읽습니다.

### Python 3.5.2에서의 상태 (Status in Python 3.5.2)
Python 3.5.2는 Python 2.7 및 Python 3.4와 유사하게 동작합니다. 시스템 `urandom`이 초기화되지 않아도 시작은 블로킹되지 않지만, `os.urandom()`은 품질이 낮은 엔트로피를 반환할 수 있습니다.

## 사용 사례 (Use Cases)

### 사용 사례 1: init 스크립트 (Use Case 1: init script)
시스템 초기화 스크립트(예: `systemd-cron`)가 Python 3 스크립트를 사용하는 경우, 해당 스크립트가 블로킹되면 시스템 초기화도 멈춥니다.

#### 1.1: 비밀(secret)이 필요 없는 경우 (No secret needed)
스크립트가 보안 비밀을 생성할 필요가 없다면 Python 3.5.2에서 이미 올바르게 처리됩니다.

#### 1.2: 보안 비밀(secure secret)이 필요한 경우 (Secure secret required)
스크립트가 보안 비밀을 생성해야 하는 경우, 안전한 해결책이 없습니다. 약한 엔트로피로 대체하는 것은 보안을 저하시키므로 용납될 수 없습니다. Python은 시스템 `urandom`이 초기화될 때까지 기다릴 수밖에 없으며, 이 경우 전체 시스템 초기화가 지연됩니다.

### 사용 사례 2: 웹 서버 (Use Case 2: Web server)
HTTP 및 HTTPS 프로토콜을 사용하는 Python 3 웹 서버를 운영하는 경우입니다. 해시 DoS 공격의 주요 대상이 웹 서버이므로, 해시 비밀은 공격자가 쉽게 추측할 수 없어야 합니다. 웹 서버는 높은 보안 수준을 요구하며, 약한 엔트로피로 서버를 실행하는 것보다 보안이 더 중요합니다. 엔트로피가 충분하지 않다면 서버는 블로킹되거나 오류와 함께 실패해야 합니다.

## 시스템 `urandom` 문제 해결 (Fix system urandom)

### 부팅 시 디스크에서 엔트로피 로드 (Load entropy from disk at boot)
시스템 초기화를 가속화하기 위해 운영체제는 종료 시 엔트로피를 디스크에 저장하고 부팅 시 다시 로드합니다.

### 가상 머신 (Virtual machines)
가상 머신은 하드웨어에 직접 접근할 수 없어 엔트로피 소스가 부족합니다. `virtio-rng` 장치를 추가하여 호스트에서 가상 머신으로 엔트로피를 전달하는 것이 해결책이 될 수 있습니다.

### 임베디드 장치 (Embedded devices)
임베디드 장치의 경우 하드웨어 RNG를 연결하는 것이 해결책입니다.

## 무작위 읽기 시 서비스 거부 (Denial-of-service when reading random)

### `/dev/random` 대신 `/dev/urandom` 사용 (Don't use /dev/random but /dev/urandom)
`/dev/random`은 매우 특수한 경우에만 사용해야 합니다. Linux에서 `/dev/random`을 읽는 것은 블로킹을 유발할 가능성이 높으며, 애플리케이션이 비밀을 생성하기 위해 5초 이상 블로킹되는 것을 사용자들은 좋아하지 않습니다. `getrandom(size, 0)`은 Linux에서 영원히 블로킹될 수 있습니다. `/dev/urandom`은 Linux에서 보안상 안전하며, `/dev/random` 대신 사용해야 합니다.

## 제안 (Rationale)
Linux에서 `/dev/urandom`을 읽는 것은 커널이 128비트의 엔트로피를 수집하기 전에는 "약한" 엔트로피를 반환할 수 있습니다. Linux 3.17은 `urandom`이 초기화될 때까지 블로킹할 수 있는 새로운 `getrandom()` 시스템 호출을 추가했습니다.
이 PEP는 `os.urandom()`을 블로킹 모드의 `getrandom()`을 사용하도록 수정하여 약한 엔트로피를 반환하지 않고, Python이 시작 시 블로킹되지 않도록 하는 것을 제안합니다.

## 변경 사항 (Changes)

### Linux에서 `os.urandom()`을 블로킹 방식으로 변경 (Make os.urandom() blocking on Linux)
- `os.urandom()` (C 함수 `_PyOS_URandom()`)은 Linux 및 Solaris에서 항상 `getrandom(size, 0)` (블로킹 모드)을 호출하도록 수정됩니다.
- 새로운 비공개 함수 `_PyOS_URandom_Nonblocking()`가 추가됩니다. 이 함수는 Linux 및 Solaris에서 `getrandom(size, GRND_NONBLOCK)`을 호출하고, `EAGAIN` 오류 발생 시 `/dev/urandom` 읽기로 대체합니다.
- 해시 비밀은 비블로킹 `system urandom`에서 초기화됩니다.
- `random.Random` 생성자는 이제 내부적으로 새로운 `_PyOS_URandom_Nonblocking()` 함수를 사용하여 RNG에 시드를 제공합니다.

### 새로운 `os.getrandom()` 함수 추가 (Add a new os.getrandom() function)
`os.getrandom(size, flags=0)` 함수가 추가됩니다. 이 함수는 Linux에서는 `getrandom()` 시스템 호출을, Solaris에서는 `getrandom()` C 함수를 사용합니다.
이 함수에는 두 가지 새로운 플래그가 있습니다:
- `os.GRND_RANDOM`: `/dev/urandom` 대신 `/dev/random`에서 바이트를 읽습니다.
- `os.GRND_NONBLOCK`: `os.getrandom()`이 블로킹될 경우 `BlockingIOError`를 발생시킵니다.

### `os.getrandom()` 사용 예시 (Examples using os.getrandom())
- **Best-effort RNG:** 운영체제 `urandom`에서 무작위 바이트를 얻으려 시도하거나 `random` 모듈로 대체하는 이식성 있는 비블로킹 RNG 함수의 예시를 제공합니다.
- `wait_for_system_rng()`: Linux 또는 Solaris에서 운영체제 `urandom`이 초기화될 때까지 기다리는 함수 예시를 제공합니다.
- **Create a best-effort RNG:** `getrandom(size)`가 블로킹될지 여부에 따라 `Random.SystemRandom`과 `Random.Random` 중 선택하여 비블로킹 RNG를 생성하는 간단한 예시를 제공합니다.

## 대안 (Alternative)

### `os.urandom()`은 그대로 두고 `os.getrandom()`만 추가 (Leave os.urandom() unchanged, add os.getrandom())
`os.urandom()`은 변경 없이 블로킹되지 않지만, `urandom`이 초기화되지 않은 경우 약한 엔트로피를 반환할 수 있습니다. 새로운 `os.getrandom()` 함수만 추가하는 방식입니다. 이 방식은 개발자가 보안을 잘 이해하고 각 플랫폼을 잘 알아야 한다는 단점이 있습니다. Python은 일반적으로 "구현 세부 사항"을 숨기는 전통이 있습니다.

### `os.urandom()`에서 `BlockingIOError` 발생 (Raise BlockingIOError in os.urandom())
`os.urandom()`이 블로킹될 경우 즉시 `BlockingIOError`를 발생시켜 개발자가 이 상황을 처리하는 방식을 선택할 수 있도록 합니다. 그러나 이는 웹 서버와 같은 보안에 민감한 사용 사례에서 약한 엔트로피로 대체하는 것이 용납되지 않아, 애플리케이션이 `BlockingIOError`를 처리하도록 수정되어야 한다는 비판이 있었습니다.

### `os.urandom()`에 선택적 `block` 매개변수 추가 (Add an optional block parameter to os.urandom())
`os.urandom()`에 선택적 `block` 매개변수를 추가하는 방안입니다. 기본값은 `True` (기본 블로킹) 또는 `False` (비블로킹)가 될 수 있습니다. 그러나 모든 플랫폼에서 `os.urandom(block=False)`를 구현하기 어렵고, API를 더 복잡하게 만든다는 비판이 있었습니다.

## 수용 (Acceptance)
이 PEP는 2016년 8월 8일 Guido van Rossum에 의해 수용되었습니다.

## 부록 (Annexes)

### 운영체제 무작위 함수 (Operating system random functions)
`os.urandom()`은 OpenBSD의 `getentropy()`, Linux의 `getrandom()`, Solaris의 `getentropy()` 및 `getrandom()`, UNIX/BSD의 `/dev/urandom` 및 `/dev/random`, Windows의 `CryptGenRandom()`과 같은 다양한 운영체제 함수를 사용합니다.

### `os.urandom()`을 사용하는 이유 (Why using os.urandom()?)
`os.urandom()`은 커널에 구현되어 사용자 공간 RNG의 문제를 겪지 않습니다. 일반적으로 CSPRNG(암호학적으로 안전한 의사 난수 생성기)를 기반으로 구축되어, 상태가 유출되어도 이전에 생성된 숫자를 계산하기 어렵습니다. 커널은 엔트로피 소스를 잘 알고 엔트로피 풀을 정기적으로 채웁니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.