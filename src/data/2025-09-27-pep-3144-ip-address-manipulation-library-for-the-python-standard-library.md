---
title: "[Final] PEP 3144 - IP Address Manipulation Library for the Python Standard Library"
excerpt: "Python Enhancement Proposal 3144: 'IP Address Manipulation Library for the Python Standard Library'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3144/
toc: true
toc_sticky: true
date: 2025-09-27 14:37:11+0900
last_modified_at: 2025-09-27 14:37:11+0900
published: true
---
> **원문 링크:** [PEP 3144 - IP Address Manipulation Library for the Python Standard Library](https://peps.python.org/pep-3144/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 06-Feb-2012

## PEP 3144 – Python 표준 라이브러리를 위한 IP 주소 조작 라이브러리

### 초록 (Abstract)
이 PEP는 Python을 위한 IP 주소 조작 모듈의 설계 및 구현을 제안합니다.

### PEP 승인 (PEP Acceptance)
이 PEP는 2012년 5월 15일 Alyssa Coghlan에 의해 승인되었습니다.

### 동기 (Motivation)
이미 Python을 위한 훌륭한 IP 주소 모듈들이 여럿 존재합니다. 하지만 이들 모두 Pythonic 원칙과 네트워크 엔지니어 및 관리자가 의존하는 단축 표기법 사이의 균형을 맞추는 데 어려움을 겪었습니다. `ipaddress` 모듈은 이러한 적절한 균형을 맞추는 것을 목표로 합니다.

### 배경 (Background)
`PEP 3144`와 `ipaddr`는 이전에 표준 라이브러리에 포함될 가능성이 논의된 바 있습니다. 여기에 명시된 라이브러리 버전은 PyPI에 있는 버전 및 이전에 논의되었던 버전과 하위 호환성이 없습니다. 기존 `ipaddr` 사용자들의 혼동을 피하기 위해, 이 라이브러리 버전은 `ipaddress`로 이름이 변경되었습니다.

`ipaddr`와 `ipaddress`의 주요 차이점은 다음과 같습니다.

*   `ipaddress`의 `*Network` 클래스는 `strict` 플래그가 `True`로 설정된 `ipaddr`의 `*Network` 클래스와 동일합니다.
*   `ipaddress`의 `*Interface` 클래스는 `strict` 플래그가 `False`로 설정된 `ipaddr`의 `*Network` 클래스와 동일합니다.
*   `ipaddress`의 팩토리 함수(factory functions)는 클래스와의 모호성을 없애기 위해 이름이 변경되었습니다.
*   몇몇 속성(attributes)도 그 목적을 명확히 하기 위해 이름이 변경되었습니다 (예: `network`, `network_address`).
*   `ipaddr`에서 컨테이너를 반환하던 여러 메서드와 함수(예: `subnets`, `address_exclude`, `summarize_address_range`, `collapse_address_list`)는 이제 이터레이터(iterators)를 반환합니다.

`ipaddress`와 `ipaddr` 간의 하위 호환성이 없는 API 변경으로 인해, 이 모듈은 새로운 "provisional API status"를 사용하여 추가될 것이 제안되었습니다.

### 명세 (Specification)
`ipaddress` 모듈은 총 6개의 새로운 공개 클래스를 정의하며, 이들은 IPv4 객체 조작을 위한 3개와 IPv6 객체 조작을 위한 3개로 구성됩니다. 클래스는 다음과 같습니다.

*   **`IPv4Address` / `IPv6Address`** : 개별 주소를 정의합니다. 예를 들어, `www.google.com`에 대한 A 레코드 쿼리가 반환하는 IPv4 주소(74.125.224.84) 또는 `ipv6.google.com`에 대한 AAAA 레코드 쿼리가 반환하는 IPv6 주소(2001:4860:4001:801::1011) 등이 있습니다.
*   **`IPv4Network` / `IPv6Network`** : 네트워크 또는 주소 그룹을 정의합니다. 예를 들어, 멀티캐스트 사용을 위해 예약된 IPv4 네트워크(224.0.0.0/4) 또는 멀티캐스트를 위해 예약된 IPv6 네트워크(ff00::/8) 등이 있습니다.
*   **`IPv4Interface` / `IPv6Interface`** : 이 하이브리드 클래스들은 주어진 네트워크 상의 개별 주소를 나타냅니다. 예를 들어, 192.0.2.0/24 네트워크 상의 IPv4 주소 192.0.2.1은 192.0.2.1/24로 참조될 수 있습니다. 마찬가지로, 2001:DB8::/96 네트워크 상의 IPv6 주소 2001:DB8::1은 2001:DB8::1/96으로 참조될 수 있습니다. 컴퓨터 네트워크 인터페이스에 할당된 주소를 이렇게 참조하는 것이 매우 일반적이므로 `Interface`라는 이름이 붙었습니다.

모든 IPv4 클래스는 특정 특성과 메서드를 공유하며, 이는 주소를 나타내는 데 필요한 비트 수, 특정 특수 IPv4 네트워크 범위에 속하는지 여부 등입니다. 마찬가지로 모든 IPv6 클래스도 특성과 메서드를 공유합니다.

`ipaddress`는 코드 중복을 최대한 피하기 위해 상속(inheritance)을 광범위하게 사용합니다. 부모 클래스는 비공개이지만 다음과 같이 요약됩니다.

*   **`_IPAddrBase`** : 모든 `ipaddress` 객체에 공통된 메서드를 제공합니다.
*   **`_BaseAddress`** : `IPv4Address`와 `IPv6Address`에 공통된 메서드를 제공합니다.
*   **`_BaseInterface`** : `IPv4Interface`와 `IPv6Interface`, 그리고 `IPv4Network`와 `IPv6Network`에 공통된 메서드를 제공합니다 (`ipaddress`는 `Network` 클래스를 `Interface`의 특수한 경우로 처리합니다).
*   **`_BaseV4`** : 모든 IPv4 클래스에 공통된 메서드와 변수(예: `_max_prefixlen`)를 제공합니다.
*   **`_BaseV6`** : 모든 IPv6 클래스에 공통된 메서드와 변수를 제공합니다.

서로 다른 IP 버전의 객체 간 비교는 `TypeError`를 발생시킵니다. 또한, 서로 다른 `_Base` 부모 클래스를 가진 객체 간의 비교도 `TypeError`를 발생시킵니다. `_Base` 부모 클래스 제한의 효과는 `IPv4Interface`가 `IPv4Network`와 비교될 수 있고, `IPv6Interface`가 `IPv6Network`와 비교될 수 있다는 것입니다.

### 참조 구현 (Reference Implementation)
현재 참조 구현은 다음에서 찾을 수 있습니다.
*   [http://code.google.com/p/ipaddress-py/source/browse/ipaddress.py](http://code.google.com/p/ipaddress-py/source/browse/ipaddress.py)

README 및 유닛 테스트를 포함하는 tarball은 다음에서 확인할 수 있습니다.
*   [http://code.google.com/p/ipaddress-py/downloads/detail?name=ipaddress-1.0.tar.gz](http://code.google.com/p/ipaddress-py/downloads/detail?name=ipaddress-1.0.tar.gz)

참조 구현 사용에 대한 자세한 정보는 다음에서 확인할 수 있습니다.
*   [http://code.google.com/p/ipaddr-py/wiki/Using3144](http://code.google.com/p/ipaddr-py/wiki/Using3144)

### 참고 자료 (References)
 IPv4와 IPv6의 비교에 대해 Vint Cerf가 보낸 이메일에서, "IPv4 값과 IPv6 값은 비교 불가능하게 취급되어야 한다"는 결론을 내렸습니다. 이는 IPv4 공간이 IPv6의 호스트 공간(0::0/96)에 포함되지만, 이는 유용한 해석이 아니기 때문입니다.

### 저작권 (Copyright)
이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.