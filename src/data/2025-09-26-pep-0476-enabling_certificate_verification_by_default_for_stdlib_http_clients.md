---
title: "[Final] PEP 476 - Enabling certificate verification by default for stdlib http clients"
excerpt: "Python Enhancement Proposal 476: 'Enabling certificate verification by default for stdlib http clients'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/476/
toc: true
toc_sticky: true
date: 2025-09-26 22:22:04+0900
last_modified_at: 2025-09-26 22:22:04+0900
published: true
---
> **원문 링크:** [PEP 476 - Enabling certificate verification by default for stdlib http clients](https://peps.python.org/pep-0476/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 28-Aug-2014

## PEP 476 – `stdlib` HTTP 클라이언트에 기본적으로 인증서 검증 활성화

### 초록 (Abstract)
현재 Python 표준 라이브러리의 HTTP 클라이언트(`urllib`, `urllib2`, `http`, `httplib` 모듈)는 `https://` URL을 처리할 때 TLS 스트림을 사용하지만, 서버의 X509 인증서가 신뢰할 수 있는 CA(인증 기관)에 의해 서명되었는지, 그리고 인증서의 Common Name 또는 Subject Alternate Name이 요청된 호스트와 일치하는지 실제로 검증하지 않습니다. 이러한 검사 누락으로 인해 공격자가 중간자(Man-in-the-Middle) 공격을 쉽게 수행하고 트래픽을 변경할 수 있습니다.

이 PEP는 Python HTTP 클라이언트에 X509 인증서 서명 및 호스트명 검증을 기본적으로 활성화할 것을 제안하며, 필요에 따라 개별 호출 단위로 이 기능을 비활성화(opt-out)할 수 있도록 합니다. 이 변경사항은 Python 2.7.9, 3.4.3 및 3.5 버전부터 적용되었습니다.

### 도입 배경 (Rationale)
`HTTPS`의 "S"는 "보안(Secure)"을 의미합니다. Python 사용자들은 `HTTPS`를 사용할 때 보안 연결을 기대하지만, 현재 Python은 이러한 기대를 충족시키지 못하고 있습니다. 겉보기에는 간단해 보이는 API가 사용자들을 오도하고 있는 상황입니다.

많은 Python 사용자들은 이러한 유효성 검사가 수행되지 않는다는 사실을 인지하지 못했으며, 이를 알게 되면 충격을 받습니다. `requests` 라이브러리(기본적으로 이러한 검사를 활성화함)의 인기는 이러한 검사가 과도한 부담이 아니라는 것을 보여주며, `requests`가 표준 라이브러리 클라이언트보다 주요 보안 개선 사항으로 널리 권장된다는 사실은 많은 사용자들이 도구에서 "기본 보안"에 대한 더 높은 기준을 기대한다는 것을 의미합니다.

Python이 이 문제에 대해 부주의했다는 점을 인지하지 못한 다양한 애플리케이션의 실패는 정기적인 CVE(Common Vulnerabilities and Exposures) 할당의 원인이 되고 있습니다.

### 기술적 세부 사항 (Technical Details)

#### 신뢰 데이터베이스 (Trust database)
이 PEP는 모든 플랫폼에서 시스템이 제공하는 인증서 데이터베이스를 사용할 것을 제안합니다. 이러한 데이터베이스를 찾을 수 없는 경우 오류가 발생하며, 사용자는 문제를 해결하기 위해 명시적으로 위치를 지정해야 합니다.

이 목표는 새로운 `ssl._create_default_https_context` 함수를 추가함으로써 달성됩니다. 이 함수는 `ssl.create_default_context`와 동일합니다. `http.client`는 `ssl._create_stdlib_context` 대신 `ssl._create_default_https_context`를 사용하도록 변경됩니다. 또한 `ssl._create_stdlib_context`는 `ssl._create_unverified_context`로 이름이 변경됩니다(하위 호환성을 위해 별칭은 유지됩니다).

이 PEP는 시스템 제공 인증서 데이터베이스를 사용하는 것을 제안합니다. 이전 논의에서는 Mozilla의 인증서 데이터베이스를 번들로 제공하고 이를 기본값으로 사용하는 방안이 제안되었으나, 다음과 같은 여러 이유로 채택되지 않았습니다.
*   플랫폼 신뢰 데이터베이스를 사용하면 Python 개발자의 유지 보수 부담이 줄어듭니다. 자체 신뢰 데이터베이스를 제공하면 인증서가 폐기될 때마다 릴리스를 해야 합니다.
*   Linux 벤더 및 다른 다운스트림(downstream)은 Mozilla 인증서를 번들에서 제외할 것이며, 이는 행동의 파편화를 초래합니다.
*   플랫폼 저장소를 사용하면 기업 내부 CA와 같은 상황을 더 쉽게 처리할 수 있습니다.

OpenSSL에는 `SSL_CERT_DIR` 및 `SSL_CERT_FILE`이라는 두 개의 환경 변수가 있으며, 이를 사용하여 Python이 다른 인증서 데이터베이스를 가리키도록 할 수 있습니다.

#### 하위 호환성 (Backwards compatibility)
이 변경으로 인해 일부 HTTPS 연결이 핸드셰이크 중에 예외(Exception)를 발생시키면서 "깨지는" 것처럼 보일 수 있습니다. 그러나 이는 오해의 소지가 있습니다. 사실 이러한 연결은 현재 "조용히 실패하고" 있으며, HTTPS URL은 기밀성(confidentiality)과 인증(authentication)에 대한 기대를 나타냅니다. Python이 사용자의 요청이 실제로 이루어졌는지 검증하지 않는다는 사실은 버그이며, "오류는 절대 조용히 넘어가지 않아야 한다(Errors should never pass silently)"는 원칙에도 위배됩니다.

그럼에도 불구하고 자체 서명(self-signed)되었거나 잘못된 인증서를 가진 서버에 접근해야 하는 사용자들은 사용자 정의 신뢰 루트를 가진 컨텍스트를 제공하거나 유효성 검사를 비활성화하는 컨텍스트를 제공하여 그렇게 할 수 있습니다(가능한 경우 전자를 강력히 권장). 사용자들은 필요한 인증서를 시스템 신뢰 저장소에 추가하여 전역적으로 신뢰할 수도 있습니다.

Twisted의 14.0 릴리스도 동일한 변경을 적용했으며, 거의 반대에 부딪히지 않았습니다.

#### 옵트아웃 (Opting out)
단일 연결에서 인증서 검증을 비활성화하려는 사용자는 `urllib.urlopen`에 `context` 인자를 제공하여 이를 달성할 수 있습니다.

```python
import ssl
# 이는 이전과 동일한 동작을 복원합니다.
context = ssl._create_unverified_context()
urllib.urlopen("https://no-valid-cert", context=context)
```

이 PEP를 구현하는 Python 버전에서 `ssl` 모듈을 몽키패치(monkeypatching)하여 전역적으로 검증을 비활성화하는 것도 가능하지만, 이는 강력히 권장되지 않습니다.

```python
import ssl
try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    # 기본적으로 HTTPS 인증서를 검증하지 않는 레거시 Python
    pass
else:
    # HTTPS 검증을 지원하지 않는 대상 환경 처리
    ssl._create_default_https_context = _create_unverified_https_context
```

이 지침은 주로 이 PEP를 구현하는 최신 Python 버전을 레거시 환경(HTTPS 연결에 대한 인증서 검증을 아직 지원하지 않는)에서 채택하려는 시스템 관리자를 위한 것입니다. 예를 들어, 관리자는 Python의 표준 운영 환경에서 `sitecustomize.py`에 위 몽키패치를 추가하여 옵트아웃할 수 있습니다. 애플리케이션 및 라이브러리는 (시스템 관리자가 제어하는 ​​구성 설정에 대한 응답으로가 아니라면) 프로세스 전체에 이 변경 사항을 적용해서는 안 됩니다.

특히 보안에 민감한 애플리케이션은 기본 Python 구현의 기본 동작에 의존하기보다 항상 명시적으로 애플리케이션이 정의한 `SSLContext`를 제공해야 합니다.

#### 다른 프로토콜 (Other protocols)
이 PEP는 HTTP 클라이언트에 대해서만 이러한 수준의 유효성 검사를 요구하며, SMTP와 같은 다른 프로토콜에는 적용되지 않습니다. 이는 HTTPS 서버의 상당수가 브라우저가 수행하는 유효성 검사 덕분에 올바른 인증서를 가지고 있지만, 다른 프로토콜의 경우 자체 서명되거나 잘못된 인증서가 훨씬 더 흔하기 때문입니다.

### Python 버전 (Python Versions)
이 PEP는 3.4.x, 3.5 및 2.7.X 브랜치 모두에서 발생할 변경 사항을 설명합니다. 2.7.X의 경우, PEP 466에서 이미 백포트된 기능 외에도 `httplib`에 `context`(`SSLContext`) 인수를 백포트해야 합니다.

### 구현 (Implementation)
*   Issue 22366: `urllib.request.urlopen`에 `context` 인자 추가.
*   Issue 22417: 이 PEP의 핵심 내용을 구현.

### 저작권 (Copyright)
이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.