---
title: "[Final] PEP 644 - Require OpenSSL 1.1.1 or newer"
excerpt: "Python Enhancement Proposal 644: 'Require OpenSSL 1.1.1 or newer'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/644/
toc: true
toc_sticky: true
date: 2025-09-27 01:34:31+0900
last_modified_at: 2025-09-27 01:34:31+0900
published: true
---
> **원문 링크:** [PEP 644 - Require OpenSSL 1.1.1 or newer](https://peps.python.org/pep-0644/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 27-Oct-2020

## PEP 644 – OpenSSL 1.1.1 이상 버전 요구

### 개요 (Abstract)

이 PEP(Python Enhancement Proposal)는 CPython의 표준 라이브러리가 OpenSSL 1.1.1 LTS(Long Term Support) 버전 또는 그 이후 버전만을 지원하도록 제안합니다. 지원 기간이 종료된 OpenSSL 버전, 호환되지 않는 포크(fork), 그리고 다른 TLS(Transport Layer Security) 라이브러리에 대한 지원은 중단됩니다.

### 동기 (Motivation)

Python은 `hashlib`, `hmac`, `ssl` 모듈에서 OpenSSL을 사용합니다. OpenSSL은 암호화 프리미티브(cryptographic primitives)의 빠른 구현과 X.509 인증서 처리를 포함한 완전한 TLS 스택을 제공합니다. `ssl` 모듈은 `urllib`과 같은 표준 라이브러리 모듈 및 `urllib3`와 같은 서드파티 모듈에서 인터넷 프로토콜의 보안 버전을 구현하는 데 사용됩니다. `pip` 또한 `ssl` 모듈을 사용하여 PyPI(Python Package Index)에서 패키지를 안전하게 다운로드합니다. `ssl` 모듈의 OpenSSL 바인딩에 버그가 발생하면 심각한 보안 문제로 이어질 수 있습니다.

시간이 지남에 따라 OpenSSL의 공개 API는 발전하고 변경되었습니다. 버전 1.0.2는 호스트 이름(hostname)을 검증하고 일치시키는 새로운 API를 도입했습니다. OpenSSL 1.1.0은 내부 구조체를 불투명(opaque)하게 만들고, 구조체 멤버에 직접 접근하는 방식을 대체하는 새로운 API를 도입했습니다. 버전 3.0.0은 암호화 알고리즘을 코어에서 프로바이더(providers)로 이동시키는 내부 재조직으로 인해 더 많은 API를 더 이상 사용하지 않도록(deprecate) 할 예정입니다. LibreSSL 및 BoringSSL과 같은 포크들은 서로 다른 방향으로 분기되었습니다.

현재 Python 3.6부터 3.9 버전은 OpenSSL 1.0.2, 1.1.0, 1.1.1과 호환됩니다. 대부분의 경우 Python은 LibreSSL >= 2.7.1과도 일부 누락된 기능과 깨진 테스트를 제외하고는 작동합니다.

제한된 자원과 시간으로 인해 여러 버전과 포크를 지원하고 정확성을 테스트 및 검증하는 것이 점점 더 어려워지고 있습니다. 여러 호환되지 않는 API 외에도 빌드 시간(build time) 플래그, 배포판별 패치(distribution-specific patches), 로컬 암호화 정책(local crypto-policy) 설정 등 수많은 조합이 존재합니다. 반면에 Python 코어 팀에는 TLS 및 OpenSSL 내부에 익숙한 도메인 전문가가 소수에 불과하며, 활발한 관리자는 더 적습니다.

OpenSSL 1.1.1을 요구함으로써 대다수의 사용자에게 더 나은 경험을 제공하고, 유지보수 오버헤드를 줄이며, 결과적으로 새로운 기능을 구현할 자원을 확보할 수 있습니다. 사용자들은 새로운 기능의 존재와 일관된 동작에 의존할 수 있게 되어 궁극적으로 더 강력한 경험을 얻을 수 있습니다.

### 영향 (Impact)

OpenSSL 1.1.1은 거의 모든 지원되는 플랫폼 및 배포판에서 OpenSSL의 기본 변형이자 버전입니다. 또한 업스트림(upstream)으로부터 보안 지원을 받는 유일한 버전입니다.

macOS 및 Windows 사용자는 이 비추천(deprecation)의 영향을 받지 않습니다. python.org 설치 프로그램 및 Conda와 같은 대체 배포판은 최신 OpenSSL 버전을 함께 제공합니다.

2020년 10월 현재, DistroWatch에 따르면 대부분의 최신 BSD 및 Linux 배포판 또한 OpenSSL 1.1.1을 함께 제공합니다. 일부 오래된 LTS(Long-Term Support) 및 엔터프라이즈(enterprise) 배포판은 이전 버전의 OpenSSL 또는 LibreSSL을 가지고 있습니다. Python 3.10이 일반적으로 사용 가능해질 때쯤에는, 이들 배포판 중 상당수가 수명 주기 종료(end of lifetime)에 도달했거나 일반 지원이 종료되었거나 LibreSSL에서 OpenSSL로 전환되었을 것입니다.

다른 소프트웨어들도 OpenSSL 1.0.2 지원을 중단했습니다. 예를 들어, PyCA cryptography 3.2 (2020-10-25)는 OpenSSL 1.0.2와의 호환성을 제거했습니다.

#### OpenSSL 1.0.2 LTS

*   출시: 2015-02
*   수명 종료: 2019-12

OpenSSL 1.0.2는 호스트 이름 검증, ALPN 지원, 타원 곡선(elliptic curves)을 추가했습니다.
해당 버전의 OpenSSL을 사용하는 주요 배포판 (EOL 날짜가 지나거나 임박한 것들):
*   CentOS 7 (EOL 2024-06)
*   Debian 8 Jessie (EOL 2020-07)
*   Linux Mint 18.3 (EOL 2021-04)
*   RHEL 7 (전체 지원 2019-08 종료, 유지보수 2 지원 2024-06 종료)
*   SUSE Enterprise Linux 12-SP5 (일반 지원 2024-10 종료)
*   Ubuntu 16.04 LTS / Xenial (일반 지원 2021-04 종료)

#### OpenSSL 1.1.0

*   출시: 2016-08
*   수명 종료: 2019-09

OpenSSL 1.1.0은 기본적으로 안전하지 않은 암호(ciphers)를 제거하거나 비활성화했으며, ChaCha20-Poly1305, BLAKE2 (기본 기능), X25519 및 CT 지원을 추가했습니다. 대부분의 구조체는 불투명하게 만들어졌고 새로운 API가 도입되었습니다. OpenSSL 1.1.0은 1.0.2와 API 호환되지 않습니다.
해당 버전의 OpenSSL을 사용하는 주요 배포판:
*   Debian 9 Stretch (보안 지원 2020-07 종료, LTS 2022-06까지)
*   Ubuntu 18.04 LTS / Bionic (일반 지원 2023-04 종료)

#### OpenSSL 1.1.1 LTS

*   출시: 2018-08
*   수명 종료: 2023-09 (예정)

OpenSSL 1.1.1은 TLS 1.3, SHA-3, X448 및 Ed448을 추가했습니다.
해당 버전의 OpenSSL을 사용하는 주요 배포판 및 시스템:
*   Alpine (2018년에 OpenSSL로 다시 전환)
*   Arch Linux current
*   CentOS 8.0+
*   Debian 10 Buster
*   Debian 11 Bullseye (예상 출시 2021-06)
*   Fedora 29+
*   FreeBSD 11.3+
*   Gentoo Linux stable (2021년 1월 LibreSSL 대체 지원 중단)
*   HardenedBSD (2018년에 OpenSSL로 다시 전환)
*   Linux Mint 19.3+
*   macOS (python.org 설치 프로그램)
*   NetBSD 8.2+
*   openSUSE 15.2+
*   RHEL 8.0+
*   Slackware current
*   SUSE Enterprise Linux 15-SP2
*   Ubuntu 18.10+
*   Ubuntu 20.04 LTS / Focal
*   VoidLinux (2021년 3월 OpenSSL로 다시 전환)
*   Windows (python.org 설치 프로그램, Conda)

주요 CI(Continuous Integration) 제공업체들도 OpenSSL 1.1.1이 포함된 이미지를 제공합니다.
*   AppVeyor (`Ubuntu2004` 이미지 사용)
*   CircleCI (최신 `cimg/base:stable` 또는 `cimg/base:stable-20.04` 사용)
*   GitHub Actions (`runs-on: ubuntu-20.04` 사용)
*   Gitlab CI (Debian Stretch, Ubuntu Focal, CentOS 8, RHEL 8 또는 Fedora runner 사용)
*   Packit
*   TravisCI (`dist: focal` 사용)
*   Zuul

#### OpenSSL 3.0.0

*   출시: 미정 (2021년 중순/하순 예정)

OpenSSL 3.0.0은 현재 개발 중입니다. 주요 변경 사항으로는 Apache License 2.0으로의 라이선스 변경과 암호화 알고리즘 프로바이더를 위한 새로운 API가 있습니다. 대부분의 변경 사항은 내부 리팩토링이며 공개 API에 영향을 미치지 않습니다.

#### LibreSSL

*   생성: 2014-04 (OpenSSL 1.0.1g에서 포크됨)

LibreSSL을 사용하는 주요 시스템:
*   DragonFly BSD
*   Hyperbola GNU/Linux-libre
*   OpenBSD
*   OpenELEC (단종)
*   TrueOS (단종)

FreeBSD 및 OPNsense와 같은 일부 배포판도 OpenSSL 대신 LibreSSL을 비표준 TLS 라이브러리로 사용합니다. Gentoo는 호환성 문제와 적은 테스트로 인해 2021년 1월에 LibreSSL을 OpenSSL의 대안으로 지원하는 것을 중단했습니다.

OpenBSD 포트에는 `security/openssl/1.1` 포트가 있으며, 이는 "LibreSSL과 호환되지 않는 애플리케이션을 지원하기 위해 존재한다"고 문서화되어 있습니다. 이 패키지는 OpenBSD에서 작동하는 `ssl` 모듈을 제공하는 데 사용될 수 있습니다.

#### BoringSSL

*   생성: 2014-06

BoringSSL은 Google의 OpenSSL 포크입니다. 일반적인 사용을 위한 것이 아니므로 Python에서는 지원되지 않습니다. API 또는 ABI 안정성에 대한 보장이 없습니다. BoringSSL의 벤더링된 복사본은 Chrome/Chromium 브라우저, Android 및 Apple 플랫폼에서 사용됩니다.

### 장점 (Benefits)

#### TLS 1.3

OpenSSL 1.1.1은 새로운 TLS 1.3 버전 지원을 도입했습니다. TLS 프로토콜의 최신 버전은 핸드셰이크(handshake)가 더 빠르고 이전 버전보다 더 안전합니다.

#### 스레드 및 fork 안전성 (Thread and fork safety)

릴리스 1.1.0c부터 OpenSSL은 완전히 fork 및 스레드 안전(thread safe)합니다. 바인딩(bindings)은 더 이상 멀티스레딩(multithreading)을 지원하기 위한 어떠한 해결책이나 추가 콜백(callbacks)도 필요로 하지 않습니다.

#### SHA-3

1.1.0부터 OpenSSL은 SHA-3 및 SHAKE 구현을 제공합니다. Python의 내장 SHA-3 지원은 참조 구현(reference implementation)을 기반으로 합니다. 내부 `_sha3` 코드는 상당히 크고 결과적인 공유 라이브러리는 거의 0.5 MB에 달합니다. Python은 내장 구현을 제거하고 OpenSSL의 `libcrypto`에 의존할 수 있습니다.

지금까지 LibreSSL 업스트림 개발은 SHA-3 지원 추가를 거부했습니다.

### 호환성 (Compatibility)

#### OpenSSL 다운스트림 패치 및 옵션 (OpenSSL downstream patches and options)

OpenSSL은 `OPENSSL_NO_*` 매크로 형태의 70개 이상의 구성(configure) 및 빌드 시간(build time) 옵션을 제공합니다. 약 60개의 옵션이 암호화 알고리즘 및 TLS 버전과 같은 기능의 존재에 영향을 미칩니다. 일부 배포판은 설정을 변경하기 위해 패치를 적용합니다. 또한 보안 수준(security level), 암호(ciphers), TLS 버전 범위, 서명 알고리즘과 같은 설정의 기본값은 OpenSSL 구성 파일에서 설정할 수 있습니다.

Python 코어 팀은 가능한 모든 조합을 테스트할 자원이 부족합니다. 이 PEP는 Python이 표준 기능이 활성화된 OpenSSL 빌드만 지원할 것을 제안합니다. 공급업체는 `OPENSSL_NO_TLS1_1_METHOD`와 같은 빌드 시간 옵션이나 `MinProtocol = TLSv1.2`와 같은 OpenSSL 구성 옵션을 사용하여 더 이상 사용되지 않거나 안전하지 않은 알고리즘 및 TLS 버전을 비활성화해야 합니다.

Python은 OpenSSL이 다음을 포함하여 빌드되었다고 가정합니다.
*   `hashlib`의 기본 알고리즘 (예: MD5, SHA-1, SHA-2 제품군, SHA-3/SHAKE 제품군, BLAKE2)
*   TLS 1.2 및 TLS 1.3 프로토콜
*   TLS 1.2 및 1.3에 대한 현재 키 합의(key agreement), 서명(signature), 암호화 알고리즘 (ECDH, RSA, ECDSA, Curve25519, AES, Poly1309-ChaCha20 등)
*   스레딩, 파일 I/O, 소켓 I/O 및 오류 메시지

약한 알고리즘(MD5, SHA-1 서명) 및 짧은 키(RSA < 2024비트)는 런타임에 비활성화될 수 있습니다. FIPS와 같은 암호화 정책에 의해 비활성화된 경우에도 알고리즘이 차단될 수 있습니다. 이 PEP는 새로운 기능과 취약점에 대한 대응책을 위한 여지를 주기 위해 의도적으로 더 구체적이지 않습니다. 경험상 Python은 PyPI에 연결할 수 있어야 하고 테스트 스위트(test suite)는 통과해야 합니다.

#### LibreSSL 지원

LibreSSL은 OpenSSL의 포크입니다. 이 포크는 Heartbleed 취약점 발생 이후 2014년 OpenBSD 팀 구성원에 의해 OpenSSL 1.0.1g를 기반으로 생성되었습니다. 그 시작부터 문제적이거나 안전하지 않다고 여겨지는 여러 기능들이 제거되거나 교체(SSL 2.0, SSL 3.0, 향상된 CPRNG)되었거나 OpenSSL 및 BoringSSL에서 백포팅(backported)되었습니다.

현재 LibreSSL은 OpenSSL 1.1.1과 완전히 API 호환되지 않습니다. 최신 릴리스인 LibreSSL 3.3.2는 기능이 누락되어 있으며 일부 경우에는 다르게 작동합니다. 주목할 만한 누락되거나 호환되지 않는 기능은 다음과 같습니다.
*   SHA-3, SHAKE, BLAKE2
*   `SSL_CERT_*` 환경 변수
*   보안 수준 API
*   세션 처리 API
*   키 로깅 API
*   검증된 인증서 체인 API
*   `OPENSSL_VERSION` 매크로

이 PEP는 Python에서 LibreSSL과 관련된 모든 해결책(workarounds)을 제거할 것을 제안합니다. 향후 Python은 구성(configure) 및 컴파일 시간(compile time) 검사를 통해 LibreSSL 지원을 적극적으로 금지하지는 않을 것입니다. 그러나 Python은 사소하지 않은 해결책을 추가하거나 테스트를 비활성화하는 패치는 받아들이지 않을 것입니다.

#### BoringSSL

현재 BoringSSL을 지원할 계획은 없습니다.

### 거부된 아이디어 (Rejected Ideas)

#### 지원되는 OpenSSL 버전 공식화 (Formalize supported OpenSSL versions)

이 PEP는 OpenSSL 버전이 지원되는 형식적인 규칙 및 조건 집합을 제공하지 않습니다.

일반적으로 Python은 일반적으로 사용되고 공식적으로 지원되는 OpenSSL 버전과 호환되는 것을 목표로 합니다. Python의 패치 릴리스(patch releases)는 OpenSSL의 새로운 메이저 릴리스와 호환되지 않을 수 있습니다. 사용자들은 Python의 새로운 메이저 또는 마이너 릴리스가 수명 주기 종료가 지난 OpenSSL 버전과 작동할 것이라고 기대해서는 안 됩니다. Python 코어 개발팀은 새로운 릴리스를 위한 수정 사항을 백포팅하거나, 적절하다고 판단될 경우 EOL(End-Of-Life)된 릴리스와의 호환성을 확장할 수 있습니다.

OpenSSL의 새로운 ABI 안정성 및 LTS 정책도 도움이 될 것입니다.

#### OpenSSL 1.1.0 지원 유지 (Keep support for OpenSSL 1.1.0)

Debian 9 (Stretch)와의 호환성을 위해 OpenSSL 1.1.0 지원을 유지해야 한다는 제안이 있었습니다. 이 제안은 코드 정리 및 테스트를 복잡하게 만들 것이기 때문에 거부되었습니다. Stretch는 이미 정기적인 보안 지원이 종료되었으며 장기 지원 종료에 가깝습니다. Python 3.10 최종 릴리스 시점에는 Debian Buster와 Debian Bullseye가 사용 가능할 것입니다.

대신 Python 3.10은 추가 문서와 사용자 지정 OpenSSL 빌드의 사용을 간소화하기 위한 새로운 구성 옵션 `--with-openssl-rpath=auto`를 얻게 될 것입니다.

### 하위 호환성 (Backwards Compatibility)

Python 3.10은 OpenSSL 1.0.2 또는 LibreSSL이 설치된 플랫폼에서 TLS/SSL 및 빠른 해싱(fast hashing)을 더 이상 지원하지 않습니다. 이 PEP의 첫 번째 초안은 Linux 배포업체 또는 CI 제공업체와 같은 공급업체가 계획할 충분한 시간을 주기 위해 3.10 릴리스 주기 초기에 게시되었습니다.

Python의 Keccak Code Package 내부 복사본과 내부 `_sha3` 모듈은 제거될 것입니다. 이는 소스 코드 크기를 약 280kB, 코드 크기를 약 0.5MB 줄일 것입니다. `hashlib`는 오로지 OpenSSL의 SHA-3 구현에 의존할 것입니다. OpenSSL이 없으면 SHA-3 및 SHAKE는 더 이상 사용할 수 없을 것입니다.

### 면책 조항 및 특별 감사 (Disclaimer and special thanks)

이 PEP의 저자는 OpenSSL 프로젝트에 기여하고 있으며 OpenSSL을 사용하는 주요 Linux 배포업체에 고용되어 있습니다.

초기 초안에 대한 검토와 피드백을 제공해준 Alex Gaynor, Gregory P. Smith, Nathaniel J. Smith, Paul Kehrer, Seth Larson에게 감사드립니다.

### 참조 (References)

 https://distrowatch.com/
 https://github.com/libressl-portable/portable/issues/455
 https://hardenedbsd.org/article/shawn-webb/2018-04-30/hardenedbsd-switching-back-openssl
 https://lists.alpinelinux.org/~alpine/devel/%3CCA%2BT2pCGFeh30aEi43hAvJ3yoHBijABy_U62wfjhVmf3FmbNUUg%40mail.gmail.com%3E
 https://voidlinux.org/news/2021/02/OpenSSL.html
 https://forums.swift.org/t/rfc-moving-swiftnio-ssl-to-boringssl/18280
 https://openports.se/security/openssl/1.1
 https://www.openssl.org/docs/OpenSSL300Design.html
 https://www.openssl.org/policies/releasestrat.html
 https://www.gentoo.org/support/news-items/2021-01-05-libressl-support-discontinued.html
 https://bugs.python.org/issue43466

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되거나 CC0-1.0-Universal 라이선스 중 더 관대한 라이선스에 따라 제공됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.