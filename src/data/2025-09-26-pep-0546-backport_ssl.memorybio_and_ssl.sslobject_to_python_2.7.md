---
title: "[Rejected] PEP 546 - Backport ssl.MemoryBIO and ssl.SSLObject to Python 2.7"
excerpt: "Python Enhancement Proposal 546: 'Backport ssl.MemoryBIO and ssl.SSLObject to Python 2.7'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/546/
toc: true
toc_sticky: true
date: 2025-09-26 23:33:55+0900
last_modified_at: 2025-09-26 23:33:55+0900
published: true
---
> **원문 링크:** [PEP 546 - Backport ssl.MemoryBIO and ssl.SSLObject to Python 2.7](https://peps.python.org/pep-0546/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 30-May-2017

## PEP 546 – Python 2.7에 `ssl.MemoryBIO` 및 `ssl.SSLObject` 백포팅 제안 (거부됨)

### 개요
이 문서는 Python 3의 `ssl.MemoryBIO` 및 `ssl.SSLObject` 클래스를 Python 2.7 버전으로 백포팅(backporting)하여 Python 2.7의 전반적인 보안을 강화하자는 제안이었습니다.

### 상태
**거부됨 (Rejected)**
이 PEP는 최종적으로 거부되었습니다.

### 거부 사유
이 PEP가 거부된 자세한 사유는 "Withdraw PEP 546? Backport ssl.MemoryBIO and ssl.SSLObject to Python 2.7" 토론에서 확인할 수 있습니다.

### 배경 (Rationale)
Python 2.7의 지원 종료일(2020년)이 다가오고 있었음에도 불구하고, 여전히 많은 프로덕션 시스템에서 사용되고 있었으며, Python 커뮤니티는 그 보안에 대한 책임감을 느끼고 있었습니다. 이 PEP는 향후 모든 지원되는 Python 버전에서 PEP 543의 채택을 촉진하여 Python 2 및 Python 3 사용자 모두의 보안을 개선하는 데 도움이 될 것으로 기대되었습니다.

이 PEP는 Python 2.7에 새로운 기능을 백포팅하기 위한 일반적인 예외를 제안하는 것이 아니었습니다. 백포팅이 제안되는 모든 새로운 기능은 독립적으로 정당성을 입증해야 하며, 특히 Python Package Index (PyPI)의 독립적으로 업데이트된 백포트(backport)에 의존하는 것이 왜 적절한 해결책이 아닌지 설명해야 했습니다.

#### PEP 543
PEP 543은 Python 애플리케이션이 OpenSSL 대신 Windows 및 macOS의 네이티브 TLS 구현에 접근할 수 있도록 하여 Python 보안을 강화하는 새로운 TLS API를 정의합니다. 이로 인해 시스템 트러스트 스토어(trust store) 및 시스템 관리자가 로컬에 설치한 인증서에 접근할 수 있게 되어, 각 애플리케이션을 수정할 필요 없이 "회사 인증서(company certificates)"를 사용하여 TLS 인증서를 올바르게 검증할 수 있게 됩니다.

PEP 543의 구현을 위해 `ssl.MemoryBIO` 및 `ssl.SSLObject`와 유사한 I/O가 없는 클래스를 먼저 구현하고, 이를 기반으로 소켓 또는 파일 디스크립터를 사용하는 두 번째 클래스를 제공하는 설계가 제안되었습니다. 이 설계는 더 많은 백엔드를 지원하고 테스트 및 감사, 구현을 단순화하는 데 도움이 될 것으로 보였습니다.

#### `requests`, `pip`, 그리고 `ensurepip`
`requests` 라이브러리 팀은 Python 2.7 지원을 포기할 수 없다고 판단했으며, 비동기(asynchronous) 모델로 전환하려면 `ssl.MemoryBIO`와 같은 `MemoryBIO`가 제공하는 이점이 중요했습니다. `MemoryBIO`는 버퍼링 양을 줄이고, IOCP 기반 리액터뿐만 아니라 `select`/`poll` 기반 리액터에서도 작동하며, 리액터 및 구현 코드를 크게 단순화합니다.

Python 2.7에 이 백포트가 없다면, `requests`는 Twisted와 동일한 해결책, 즉 `pyOpenSSL`에 대한 필수적인 의존성을 사용해야 합니다.
`pip` 프로그램은 다른 설치 방법에 의존할 수 없기 때문에 실용적인 이유로 모든 종속성(dependencies)을 포함해야 합니다. `pip`가 `requests`에 의존하므로, 이는 `pip`가 `pyOpenSSL`의 복사본을 포함해야 한다는 것을 의미합니다. 이는 `pip`를 설치할 때 상당한 사용성 문제를 야기할 수 있습니다. 현재 `pip`는 각 플랫폼에서 컴파일되어야 하고 C 컴파일러를 필요로 하는 C 확장(C extensions)을 내장하는 것을 지원하지 않습니다.

Python 2.7.9부터 Python은 기본 설치 및 `ensurepip` 모듈을 통한 가상 환경(virtual environments) 사용을 위해 `pip`의 복사본을 내장합니다. 만약 `pip`가 `pyOpenSSL`을 번들(bundle)하게 되면, CPython도 `pyOpenSSL`을 번들하게 될 것입니다. `ssl.MemoryBIO` 및 `ssl.SSLObject`를 백포팅하는 것만이 `pyOpenSSL`을 내장할 필요성을 피하고 부트스트랩(bootstrap) 문제(python -> ensurepip -> pip -> requests -> MemoryBIO)를 해결할 수 있을 것이라고 제안되었습니다.

### 기타 이점 (Other Benefits)
이 PEP를 채택하면 다른 소규모 생태계에도 이점이 있었을 것입니다. 예를 들어, Twisted는 서드파티 C 확장(third-party C extensions)에 대한 의존성을 줄일 수 있었을 것입니다. 또한, PyOpenSSL 개발팀은 이 모듈을 단계적으로 중단(sunset)하기를 원했으며, 이 백포트는 사용자들을 곤경에 빠뜨리지 않고 우아하게 작업을 수행할 수 있도록 해 줄 것이었습니다. 이러한 부수적인 이점들은 비록 작지만, 더 넓은 Python 생태계에 가치를 제공할 것으로 기대되었습니다.

### 우려 사항 (Concerns)

#### 오래된 Python 2 버전은 어떻게 되는가? (What About Old Python 2?)
일부 Python 2 사용자들은 Python 2 릴리스의 속도를 따라가지 못하고 있었습니다. 이는 주로 Python 2의 마이너 릴리스 속도를 따라가지 못하는 LTS(Long Term Support) 릴리스를 사용하고 있었기 때문입니다. 이러한 사용자들은 `MemoryBIO`를 사용할 수 없었을 것이며, Python 2 호환성을 염려하는 프로젝트는 대부분의 사용자 시스템에 `MemoryBIO`가 존재한다고 신뢰할 수 없을 수도 있었습니다.

이 우려는 합리적입니다. 얼마나 중요한지는 현재 Python 2 사용자들이 Python 3로 마이그레이션(migration)할 가능성 또는 최신 Python 2 릴리스를 사용하려고 할 가능성에 달려있었습니다. 결국 라이브러리들은 Python 2 지원을 중단하기를 원할 것이며, 문제는 백포트가 포함된 Python 2 릴리스로 Python 2 사용자들의 상당수가 이동했는지 여부였습니다.

PEP 작성자들은 이러한 우려에도 불구하고 백포트의 부담이 충분히 미미하여 정당화될 수 있다고 믿었습니다. 만약 새로운 2.7 릴리스로의 마이그레이션이 너무 느리다면 작업의 가치는 미미하겠지만, 합리적인 수준의 마이그레이션이라면 상당한 가치를 얻을 수 있을 것이라고 예상했습니다.

### 변경 사항 (Changes)
이 PEP가 채택되었다면, Python 2.7의 `ssl` 모듈에 `MemoryBIO` 및 `SSLObject` 클래스가 추가되었을 것입니다. 이 코드는 마스터 브랜치(Python 3)에서 백포팅되고 적응되었을 것입니다. 백포트는 또한 `_ssl` 모듈의 Python 2/Python 3 차이점 크기를 크게 줄여 유지 관리를 더 쉽게 만들었을 것입니다.

### 링크 (Links)
*   PEP 543
*   `[backport] ssl.MemoryBIO`: Alex Gaynor가 작성한 이 PEP의 구현 (2014년 10월 첫 버전)
*   PEP 466

### 토론 (Discussions)
*   `[Python-Dev] Backport ssl.MemoryBIO on Python 2.7?` (2017년 5월)

### 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain)에 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.