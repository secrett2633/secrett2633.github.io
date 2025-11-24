---
title: "[Final] PEP 464 - Removal of the PyPI Mirror Authenticity API"
excerpt: "Python Enhancement Proposal 464: 'Removal of the PyPI Mirror Authenticity API'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/464/
toc: true
toc_sticky: true
date: 2025-09-26 22:11:47+0900
last_modified_at: 2025-09-26 22:11:47+0900
published: true
---
> **원문 링크:** [PEP 464 - Removal of the PyPI Mirror Authenticity API](https://peps.python.org/pep-0464/)
>
> **상태:** Final | **유형:** Process | **작성일:** 02-Mar-2014

PEP 464 – PyPI 미러 인증 API 제거

## 요약 (Abstract)
이 PEP(Python Enhancement Proposal)는 PyPI(Python Package Index) 미러 인증 API의 사용 중단 및 제거를 제안합니다. 여기에는 `/serverkey` URL과 `/serversig` 하위의 모든 URL이 포함됩니다.

## 도입 배경 (Rationale)
PyPI 미러링 인프라(PEP 381에 정의됨)는 자동 설치 프로그램이 사용하는 PyPI 콘텐츠를 미러링하는 수단을 제공하며, 그 구성 요소로서 미러링된 콘텐츠의 진위 여부를 확인하는 방법을 제공합니다.

이 PEP는 다음 이유로 인해 해당 API의 제거를 제안합니다:
*   이 API를 활용하는 것으로 알려진 구현체(implementations)가 없습니다. 여기에는 `pip` 및 `setuptools`가 포함됩니다.
*   이 API는 DSA(Digital Signature Algorithm)를 사용하므로, 무작위 논스(random nonce)에 편향이 있을 경우 개인 키 유출에 취약합니다.
*   이 API는 신뢰(trust) 문제의 작은 부분만을 해결합니다. 그러나 문제 자체는 훨씬 더 광범위하며, The Update Framework(TUF)와 같은 완전한 시스템을 갖추는 것이 더 나을 것입니다.

이러한 문제점들과 사용 부족으로 인해, 이 API는 추가적인 복잡성을 정당화할 만한 실질적인 이점을 제공하지 않는다는 것이 이 PEP의 의견입니다.

## 사용 중단 및 제거 계획 (Plan for Deprecation & Removal)
이 PEP가 수락되는 즉시 미러 인증 API는 사용 중단(deprecated)으로 간주될 것이며, 미러링 에이전트(mirroring agents)와 설치 도구(installation tools)는 더 이상 이 API에 접근하지 않아야 합니다.

현재 코드 베이스(PyPI 1.0)에서 실제로 제거하는 대신, PyPI 1.0을 새로운 코드 베이스(PyPI 2.0)로 교체하는 현재 작업에서 이 API를 구현하지 않을 것입니다. 이는 1.0에서 2.0으로 전환될 때 API가 "제거"되도록 할 것입니다.

만약 2014년 9월 1일까지 PyPI 1.0 대신 PyPI 2.0이 배포되지 않았다면, 이 PEP는 PyPI 1.0 코드 베이스에서 해당 코드를 제거하는 방식으로 구현될 것입니다.

설치 프로그램(installers)에는 변경 사항이 필요하지 않지만, `bandersnatch` 및 `pep381client`와 같은 PEP 381을 준수하는 미러링 클라이언트(mirroring clients)는 더 이상 `/serversig` URL을 미러링 시도하지 않도록 업데이트되어야 합니다.

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.