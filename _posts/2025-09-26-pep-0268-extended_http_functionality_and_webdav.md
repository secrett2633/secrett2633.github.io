---
title: "[Rejected] PEP 268 - Extended HTTP functionality and WebDAV"
excerpt: "Python Enhancement Proposal 268: 'Extended HTTP functionality and WebDAV'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/268/
toc: true
toc_sticky: true
date: 2025-09-26 17:51:10+0900
last_modified_at: 2025-09-26 17:51:10+0900
published: true
---
> **원문 링크:** [PEP 268 - Extended HTTP functionality and WebDAV](https://peps.python.org/pep-0268/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 20-Aug-2001

# PEP 268 – 확장된 HTTP 기능 및 WebDAV

*   **저자:** Greg Stein
*   **상태:** Rejected (거부됨)
*   **유형:** Standards Track
*   **생성일:** 2001년 8월 20일
*   **Python 버전:** 2.x
*   **최종 수정일:** 2025년 2월 1일

## 거부 고지 (Rejection Notice)
이 PEP는 제안된 지 6년 동안 충분한 커뮤니티의 지지를 얻지 못하여 거부되었습니다.

## 요약 (Abstract)
이 PEP는 Python의 HTTP 지원을 위한 새로운 모듈과 확장된 기능을 논의합니다. 특히, 인증된 요청 (authenticated requests), 프록시 지원 (proxy support), 인증된 프록시 사용 (authenticated proxy usage), 그리고 WebDAV (Web-based Distributed Authoring and Versioning) 기능 추가를 제안합니다.

## 동기 (Rationale)
Python은 "batteries included" (모든 것이 포함된) 철학 덕분에 매우 인기가 많았습니다. 가장 많이 사용되는 프로토콜 중 하나인 HTTP (RFC 2616 참조)는 수년 동안 `httplib`를 통해 Python에 포함되어 있었지만, 많은 HTTP 기반 애플리케이션 및 시스템의 모든 요구 사항을 충족시키지 못했습니다.

또한, WebDAV와 XML-RPC와 같이 HTTP를 기반으로 하는 새로운 프로토콜들이 유용해지고 사용이 증가하고 있었습니다. 이러한 기능을 제공하는 것은 Python의 "batteries included" 역할을 충족시키고 Python이 새로운 기술의 선두에 서도록 돕는 것이었습니다.

인증 및 프록시 지원은 Python의 핵심 HTTP 처리에서 누락된 두 가지 주목할 만한 기능이지만, `urllib` 및 `urllib2` 내에서 Python의 URL 처리의 일부로 최소한으로 처리되었습니다. 그러나 정교하거나 복잡한 HTTP 처리가 필요한 애플리케이션은 이러한 기능이 `urllib`에 있을 때는 활용할 수 없었습니다. 이러한 기능을 HTTP 연결과 직접 연관될 수 있는 위치로 리팩토링(refactoring)하면 `urllib`와 정교한 애플리케이션 모두에게 유용성을 향상시킬 수 있었습니다.

이 PEP는 여러 사람들이 직접 이러한 기능을 요청하고 SourceForge에서 여러 기능 요청이 있었던 것이 동기가 되었습니다. 제공될 모듈의 정확한 형태와 사용될 클래스/아키텍처(architecture)에 대한 논의가 필요했기 때문에, 이러한 논의의 중심점을 제공하기 위해 이 PEP가 생성되었습니다.

## 명세 (Specification)
표준 라이브러리에 두 개의 모듈이 추가될 예정이었습니다.

*   `httpx` (HTTP 확장 기능)
*   `davlib` (WebDAV 라이브러리)

(모듈 이름에 대한 제안은 환영했으며, `davlib`는 선례가 있었지만 `webdav`와 같은 이름도 고려될 수 있었습니다.)

### HTTP 인증 (HTTP Authentication)
`httpx` 모듈은 HTTP 인증(프록시 및 오리진 서버 인증 모두)을 수행하기 위한 믹스인(mixin)을 제공할 예정이었습니다. 이 믹스인(`httpx.HandleAuthentication`)은 `HTTPConnection` 및 `HTTPSConnection` 클래스와 결합될 수 있었습니다 (믹스인이 `HTTP` 및 `HTTPS` 호환성 클래스와 함께 작동할 수도 있지만, 이는 필수는 아니었습니다).

*   **인증 프로세스 위임:** 믹스인은 인증 프로세스를 하나 이상의 "authenticator" 객체에 위임하여 여러 연결이 authenticator를 공유할 수 있도록 했습니다. 별도의 객체를 사용하면 인증 시스템(예: LDAP)에 대한 장기 연결이 가능했습니다. Basic 및 Digest 메커니즘(RFC 2617 참조)을 위한 authenticator가 제공될 예정이었습니다. 사용자 제공 authenticator 서브클래스도 등록하고 연결에서 사용할 수 있었습니다.
*   **자격 증명 객체:** "credentials" 객체(`httpx.Credentials`)도 믹스인과 연관되어 authenticators가 필요한 자격 증명(예: 사용자 이름 및 비밀번호)을 저장했습니다. Credentials의 서브클래스를 생성하여 추가 정보(예: NT 도메인)를 저장할 수 있었습니다.
*   **401/407 응답 감지 및 처리:** 믹스인은 `getresponse()` 메서드를 오버라이드(override)하여 401 (Unauthorized) 및 407 (Proxy Authentication Required) 응답을 감지합니다. 이러한 응답이 발견되면, 응답 객체, 연결 및 자격 증명이 응답에 지정된 인증 체계에 해당하는 authenticator로 전달되었습니다. 여러 체계가 응답에 있는 경우 보안 수준이 높은 순서대로 여러 authenticator가 시도되었습니다. 각 authenticator는 응답 헤더를 검사하고 올바른 인증 헤더로 요청을 재전송할지 여부와 방법을 결정할 수 있었습니다. 어떤 authenticator도 인증을 성공적으로 처리할 수 없으면 예외가 발생했습니다.
*   **요청 재전송 메커니즘:** 적절한 자격 증명을 사용하여 요청을 재전송하는 것이 인증 시스템에서 가장 어려운 부분 중 하나였습니다. 어려움은 원래 전송된 요청 라인, 헤더 및 본문(body)을 기록하는 데 있었습니다. `putrequest`, `putheader`, `endheaders`를 오버라이드함으로써 본문을 제외한 모든 것을 캡처할 수 있었습니다. `endheaders` 메서드가 호출되면, `send()`에 대한 모든 호출을 캡처하여 본문 내용을 저장했습니다. 믹스인은 이러한 방식으로 보유할 데이터 양에 대한 구성 가능한 제한(예: 본문 내용을 100KB까지만 보유)을 가질 예정이었습니다. 전체 본문이 저장되었다고 가정하면, 적절한 인증 정보와 함께 요청을 재전송할 수 있었습니다.
*   **큰 본문 처리:** 본문이 너무 커서 저장할 수 없는 경우, `getresponse()`는 401 또는 407 오류를 나타내는 응답 객체를 단순히 반환했습니다. 인증 정보는 이미 계산되어 캐시되었으므로(`Credentials` 객체에), 호출자는 단순히 요청을 다시 생성할 수 있었습니다. 믹스인은 적절한 자격 증명을 첨부할 예정이었습니다.
*   **보호 공간 (Protection Space):** "보호 공간"(RFC 2617, 섹션 1.2 참조)은 호스트, 포트 및 인증 영역(authentication realm)의 튜플(tuple)로 정의되었습니다. HTTP 서버에 요청이 처음 전송될 때 인증 영역을 알 수 없었습니다(영역은 인증 실패 시에만 반환됨). 그러나 URL에서 경로는 가지고 있었고, 이는 서버로 보낼 자격 증명을 결정하는 데 유용할 수 있었습니다.
    *   Basic 인증 체계는 일반적으로 계층적으로 설정되었습니다: `/path`에 대한 자격 증명은 `/path/subpath`에 대해 시도될 수 있었습니다.
    *   Digest 인증 체계는 계층적 설정에 대한 명시적 지원을 가졌습니다.
    *   `httpx.Credentials` 객체는 여러 보호 공간에 대한 자격 증명을 저장하고 두 가지 방식으로 조회할 수 있었습니다.
        *   `(host, port, path)`를 사용하여 조회: 이 조회 체계는 인증 영역을 알 수 없는 경로에 대한 요청을 생성할 때 사용되었습니다.
        *   `(host, port, realm)`을 사용하여 조회: 이 메커니즘은 서버가 Request-URI가 특정 영역 내에 있다고 지정했을 때 인증 프로세스 중에 사용되었습니다.
*   `HandleAuthentication` 믹스인은 `putrequest()`를 오버라이드하여 사용 가능한 경우 자격 증명을 자동으로 삽입할 예정이었습니다. `putrequest`의 URL은 사용할 적절한 인증 정보를 결정하는 데 사용되었습니다.
*   **프록시 및 오리진 서버 자격 증명 분리:** 두 가지 자격 증명 세트가 믹스인에 의해 사용되고 저장된다는 점도 중요했습니다. 하나는 사용될 수 있는 모든 프록시용이고, 다른 하나는 대상 오리진 서버용이었습니다. 프록시는 경로가 없으므로 프록시 자격 증명의 보호 공간은 경로를 통해 저장하고 조회할 때 항상 "/"를 사용했습니다.

### 프록시 처리 (Proxy Handling)
`httpx` 모듈은 HTTP(S) 작업을 수행하기 위해 프록시를 사용하는 믹스인(`httpx.UseProxy`)을 제공할 예정이었습니다. 이 믹스인은 `HTTPConnection` 및 `HTTPSConnection` 클래스와 결합될 수 있었습니다 (믹스인이 `HTTP` 및 `HTTPS` 호환성 클래스와 함께 작동할 수도 있지만, 이는 필수는 아니었습니다).

*   믹스인은 사용할 프록시의 `(host, port)`를 기록할 예정이었습니다.
*   이 믹스인은 연결을 위해 이 호스트/포트 조합을 사용하고, 요청 URL을 오리진 서버를 참조하는 절대 URI(absoluteURIs)로 다시 작성하도록 오버라이드될 예정이었습니다(이 URI는 프록시 서버로 전달됨).
*   프록시 인증은 사용자가 프록시와 통신하기 위해 `HTTP(S)Connection`을 직접 사용할 수 있으므로 `httpx.HandleAuthentication` 클래스에 의해 처리되었습니다.

### WebDAV 기능 (WebDAV Features)
`davlib` 모듈은 WebDAV 지원 서버로 WebDAV 요청을 전송하기 위한 믹스인(`davlib.DAVClient`)을 제공할 예정이었습니다. 이 믹스인은 `HTTPConnection` 및 `HTTPSConnection` 클래스와 결합될 수 있었습니다 (믹스인이 `HTTP` 및 `HTTPS` 호환성 클래스와 함께 작동할 수도 있지만, 이는 필수는 아니었습니다).

*   믹스인은 RFC 2616의 HTTP 및 RFC 2518의 WebDAV에 의해 정의된 다양한 HTTP 메서드를 수행하는 메서드를 제공할 예정이었습니다.
*   **207 (Multi-Status) 응답 처리:** 207 (Multi-Status) 응답을 디코딩하기 위해 사용자 정의 응답 객체가 사용될 예정이었습니다. 응답 객체는 표준 라이브러리의 `xml` 패키지를 사용하여 `multistatus` XML 정보를 파싱(parse)하고, `multistatus` 데이터를 저장하기 위한 간단한 객체 구조를 생성할 예정이었습니다. 속도가 빠른 순서대로 여러 파싱 스키마가 시도/사용될 예정이었습니다.

## 참조 구현 (Reference Implementation)
실제 (미래/최종) 구현은 PEP가 승인되어 주 `Lib` 디렉터리로 이동될 때까지 `/nondist/sandbox/Lib` 디렉터리에서 개발되고 있었습니다.

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.