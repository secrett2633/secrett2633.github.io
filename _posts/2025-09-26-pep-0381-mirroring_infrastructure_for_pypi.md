---
title: "[Withdrawn] PEP 381 - Mirroring infrastructure for PyPI"
excerpt: "Python Enhancement Proposal 381: 'Mirroring infrastructure for PyPI'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/381/
toc: true
toc_sticky: true
date: 2025-09-26 21:02:58+0900
last_modified_at: 2025-09-26 21:02:58+0900
published: true
---
> **원문 링크:** [PEP 381 - Mirroring infrastructure for PyPI](https://peps.python.org/pep-0381/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 21-Mar-2009

## PEP 381 – PyPI 미러링 인프라 (PEP 381 – Mirroring infrastructure for PyPI)

**작성자:** Tarek Ziadé, Martin von Löwis
**상태:** 철회됨 (Withdrawn)
**유형:** 표준 트랙 (Standards Track)
**생성일:** 2009년 3월 21일

---

### 초록 (Abstract)

이 PEP는 PyPI (Python Package Index)를 위한 미러링 인프라 구축을 설명합니다.

### PEP 철회 배경 (PEP Withdrawal Rationale)

이 PEP는 2013년 5월, 주 PyPI 웹 서비스가 Fastly 캐싱 CDN 뒤로 이전되면서 철회되었습니다. 이후 이 협약은 PSF (Python Software Foundation)와의 현물 후원으로 공식화되었고, PSF는 후원 중단 시의 위험 관리까지 담당하게 되었습니다.

이전에는 PyPI에서 직접 제공되던 다운로드 통계는 현재 Google BigQuery를 통해 간접적으로 게시되고 있습니다. 따라서 이 PEP에서 설명하는 미러링 제안은 더 이상 필요하지 않게 되어 철회되었습니다.

### 제안 배경 (Rationale)

PyPI는 6,000개 이상의 프로젝트를 호스팅하며, 매일 수많은 사람들이 애플리케이션을 빌드하는 데 사용하고 있습니다. 특히 `easy_install` 및 `zc.buildout`와 같은 시스템은 PyPI를 집중적으로 활용합니다.

PyPI를 집중적으로 사용하는 사람들에게 PyPI는 단일 실패 지점(Single Point of Failure)으로 작용할 수 있습니다. 이미 개인 및 공개적으로 일부 미러를 설정하는 사람들이 생겨났습니다. 이러한 미러들은 PyPI를 탐색하여 동기화되는 '활성' 미러입니다.

시스템의 신뢰성을 높이기 위해 이 PEP는 다음 사항을 설명했습니다.

*   PyPI에서의 미러 목록화 및 등록
*   공개 미러가 유지해야 할 페이지들. 이 페이지들은 PyPI에서 조회수 및 최종 수정 날짜를 얻는 데 사용됩니다.
*   미러가 PyPI와 동기화되는 방법
*   클라이언트가 장애 조치(fail-over) 메커니즘을 구현하는 방법

### 미러 목록화 및 등록 (Mirror listing and registering)

PyPI를 미러링하려는 사람들은 catalog-SIG (Special Interest Group)에 제안을 제출합니다. 메일링 리스트에 미러가 제안되면, 미러링 규칙을 준수하는지 확인한 후 PyPI 애플리케이션 내의 미러 목록에 수동으로 추가됩니다.

미러 목록은 `X.pypi.python.org` 형태의 호스트 이름 목록으로 제공됩니다. `X` 값은 `a,b,c,...aa,ab,...` 순서로 지정됩니다. `a.pypi.python.org`는 마스터 서버이며, 미러는 `b`부터 시작합니다. `last.pypi.python.org` CNAME 레코드는 마지막 호스트 이름을 가리킵니다. 미러 운영자는 정적 주소를 사용해야 하며, 계획된 주소 변경 사항을 `distutils-sig`에 미리 보고해야 합니다.

새로운 미러는 `http://pypi.python.org/mirrors` 페이지에도 나타나는데, 이 페이지는 미러 목록을 사람이 읽을 수 있는 형태로 제공하고 새로운 미러 등록 방법을 설명합니다.

### 통계 페이지 (Statistics page)

PyPI는 `/stats`에서 다운로드 통계를 제공합니다. 이 페이지는 모든 미러의 로컬 통계를 읽고 합산하여 PyPI에서 매일 계산됩니다.

통계는 `/stats/days` 및 `/stats/months` 아래에 일별 또는 월별 파일로 제공됩니다. 각 파일은 `bzip2` 압축 형식이며, 다음 형식을 따릅니다.

*   일별 파일: `YYYY-MM-DD.bz2`
*   월별 파일: `YYYY-MM.bz2`

**예시:**
*   `/stats/days/2008-11-06.bz2`
*   `/stats/months/2008-11.bz2`

### 미러의 신뢰성 (Mirror Authenticity)

분산 미러링 시스템에서 클라이언트는 미러링된 사본이 원본과 동일한지(authentic) 확인하고 싶을 수 있습니다. 고려해야 할 여러 위협이 있습니다.

*   중앙 인덱스가 침해될 수 있습니다.
*   중앙 인덱스는 신뢰할 수 있다고 가정하지만, 미러가 변조될 수 있습니다.
*   중앙 인덱스와 최종 사용자 사이 또는 미러와 최종 사용자 사이의 중간자 공격(man-in-the-middle)으로 데이터그램이 변조될 수 있습니다.

이 사양은 두 번째 위협만 다룹니다. 중간자 공격을 감지하기 위한 일부 조치가 마련되어 있습니다. 첫 번째 공격을 감지하려면 패키지 작성자가 PGP 키를 사용하여 패키지에 서명해야 하며, 사용자는 신뢰하는 작성자의 패키지인지 확인할 수 있습니다.

중앙 인덱스는 `/serverkey` URL에서 DSA 키를 PEM 형식으로 제공합니다 (예: "openssl dsa -pubout"으로 생성된 RFC 3280 `SubjectPublicKeyInfo`). 이 URL은 미러링되지 않아야 하며, 클라이언트는 PyPI에서 직접 공식 `serverkey`를 가져오거나 PyPI 클라이언트 소프트웨어와 함께 제공된 사본을 사용해야 합니다. 미러는 키 갱신(key rollover)을 감지하기 위해 여전히 키를 다운로드해야 합니다.

각 패키지에 대해 미러링된 서명은 `/serversig/<package>`에서 제공됩니다. 이는 병렬 URL인 `/simple/<package>`의 DSA 서명으로, SHA-1과 DSA를 사용하는 DER 형식입니다 (예: RFC 3279 `Dsa-Sig-Value`, 알고리즘 1.2.840.10040.4.3으로 생성됨).

미러를 사용하는 클라이언트는 패키지를 확인하기 위해 다음 단계를 수행해야 합니다.

1.  `/simple` 페이지를 다운로드하고 SHA-1 해시를 계산합니다.
2.  해당 해시의 DSA 서명을 계산합니다.
3.  해당 `/serversig`를 다운로드하고 2단계에서 계산된 값과 바이트 단위로 비교합니다.
4.  미러에서 다운로드하는 모든 파일의 MD-5 해시를 계산하고 (`/simple` 페이지와 비교하여) 확인합니다.

확인 알고리즘의 구현은 `https://svn.python.org/packages/trunk/pypi/tools/verify.py`에서 제공됩니다.

중앙 인덱스에서 다운로드할 때는 확인이 필요하지 않으며, 계산 오버헤드를 줄이기 위해 피해야 합니다.

약 1년에 한 번, 키가 새로운 키로 교체됩니다. 미러는 모든 `/serversig` 페이지를 다시 가져와야 합니다. 미러를 사용하는 클라이언트는 새 서버 키의 신뢰할 수 있는 사본을 찾아야 합니다. 한 가지 방법은 `https://pypi.python.org/serverkey`에서 다운로드하는 것입니다. 중간자 공격을 감지하려면 클라이언트가 CACert 기관에서 서명한 SSL 서버 인증서를 확인해야 합니다.

### 미러가 제공해야 하는 특별 페이지 (Special pages a mirror needs to provide)

미러는 PyPI의 부분적인 복사본이므로, 복사하여 동일한 구조를 제공합니다.

*   `simple`: 패키지 인덱스의 REST 버전
*   `packages`: Python 버전 및 글자별로 저장된 패키지
*   `serversig`: `simple` 페이지에 대한 서명

또한 두 가지 특정 요소를 제공해야 합니다.

*   `last-modified`
*   `local-stats`

#### 최종 수정 날짜 (Last modified date)

CPAN은 미러의 마지막 동기화 날짜를 제공하는 신선도(freshness) 날짜 시스템을 사용합니다. PyPI의 경우, 각 미러는 미러가 유지하는 마지막 동기화 날짜를 나타내는 간단한 텍스트 콘텐츠의 URL을 유지해야 합니다.

날짜는 ISO 8601 형식을 사용하여 GMT 시간으로 제공됩니다. 각 미러는 자체적인 최종 수정 날짜를 유지할 책임이 있습니다. 이 페이지는 `/last-modified`에 위치해야 하며 `text/plain` 페이지여야 합니다.

#### 로컬 통계 (Local statistics)

각 미러는 자신을 통해 이루어진 모든 다운로드 수를 계산할 책임이 있습니다. 이는 PyPI가 모든 다운로드를 합산하여 총계를 표시하는 데 사용됩니다.

이 통계는 첫 줄에 헤더가 있는 CSV와 유사한 형식입니다. PEP 305를 준수해야 하며, 기본적으로 Python의 `csv` 모듈로 읽을 수 있어야 합니다.

이 파일의 필드는 다음과 같습니다.

*   `package`: 패키지의 distutils ID
*   `filename`: 다운로드된 파일 이름
*   `useragent`: 패키지를 다운로드한 클라이언트의 User-Agent
*   `count`: 다운로드 수

콘텐츠는 다음과 같습니다.

```
# package,filename,useragent,count
zc.buildout,zc.buildout-1.6.0.tgz,MyAgent,142
...
```

카운팅은 미러가 시작된 날부터 시작되며, 하루에 하나의 파일이 `bzip2` 형식으로 압축됩니다. 각 파일은 날짜와 같이 명명됩니다 (예: `2008-11-06.bz2`는 2008년 11월 6일의 파일).

이 파일들은 `/local-stats`라는 폴더에 제공됩니다. 예를 들면 다음과 같습니다.

*   `/local-stats/days/2008-11-06.bz2`
*   `/local-stats/days/2008-11-07.bz2`
*   `/local-stats/days/2008-11-08.bz2`

이 페이지는 `/local-stats`에 위치해야 합니다.

### 미러가 PyPI와 동기화되는 방법 (How a mirror should synchronize with PyPI)

`easy_install`의 작동 방식을 기반으로 Martin v. Loewis와 Jim Fulton이 Simple Index라는 미러링 프로토콜을 설명하고 구현했습니다. 이 섹션은 이를 종합하고 몇 가지 관련 링크, 그리고 User-Agent에 대한 작은 부분을 제공합니다.

#### 미러링 프로토콜 (The mirroring protocol)

미러는 중앙 서버와 미러 간에 전송되는 데이터의 양을 줄여야 합니다. 이를 위해 `changelog()` PyPI XML-RPC 호출을 사용해야 하며, 마지막 동기화 이후 변경된 패키지만 다시 가져와야 합니다. 각 패키지 P에 대해 `/simple/P/` 및 `/serversig/P` 문서를 복사해야 합니다. 중앙 서버에서 패키지가 삭제되면 해당 패키지 및 모든 관련 파일을 삭제해야 합니다. 패키지 파일의 변경을 감지하기 위해 파일의 ETag를 캐시할 수 있으며, `If-none-match` 헤더를 사용하여 건너뛰기를 요청할 수 있습니다.

각 미러링 도구는 설명적인 User-Agent 헤더를 사용하여 자신을 식별해야 합니다. `pep381client` 패키지는 이 프로토콜을 준수하여 PyPI를 탐색하는 애플리케이션을 제공합니다.

#### User-Agent 요청 헤더 (User-agent request header)

PyPI를 통한 클라이언트의 작업을 구분하기 위해, 모든 미러링 소프트웨어는 특정 User-Agent 이름을 제공해야 합니다.

이는 다음과 같은 모든 클라이언트에도 해당됩니다.

*   `zc.buildout`
*   `setuptools`
*   `pip`

### 클라이언트가 PyPI 및 해당 미러를 사용하는 방법 (How a client can use PyPI and its mirrors)

PyPI를 탐색하는 클라이언트는 `last.pypi.python.org`를 사용하여 미러 목록을 가져와 대체 미러를 사용할 수 있어야 합니다.

**코드 예시:**

```python
import socket
socket.gethostbyname_ex('last.pypi.python.org')[0]
# 결과 예시: 'h.pypi.python.org'
```

현재 이 메커니즘을 사용할 수 있는 클라이언트는 다음과 같습니다.

*   `setuptools`
*   `zc.buildout` (`setuptools`를 통해)
*   `pip`

#### 장애 조치 메커니즘 (Fail-over mechanism)

PyPI 또는 사용 중인 미러가 응답하지 않을 때, PyPI를 탐색하는 클라이언트는 장애 조치(Fail-over) 메커니즘을 사용할 수 있어야 합니다.

지리적 위치 및 응답성을 고려하여 어떤 미러를 사용할지는 클라이언트가 결정해야 합니다. 이 PEP는 이 장애 조치 메커니즘이 어떻게 작동해야 하는지에 대해서는 설명하지 않지만, 클라이언트가 가장 가까운 미러를 사용하도록 강력히 권장합니다.

현재 이 메커니즘을 사용할 수 있는 클라이언트는 다음과 같습니다.

*   `setuptools`
*   `zc.buildout` (`setuptools`를 통해)
*   `pip`

#### 추가 패키지 인덱스 (Extra package indexes)

일부 패키지는 비공개이거나 프로젝트 관리자가 자체 서버를 운영하여 사람들이 프로젝트 패키지를 얻을 수 있는 경우, PyPI에 업로드되지 않을 수 있습니다. 그러나 공개 패키지 인덱스는 PyPI 및 Distutils 프로토콜을 따르도록 강력히 권장됩니다.

즉, `register` 및 `upload` 명령은 시중에 나와 있는 모든 패키지 인덱스 서버와 호환되어야 합니다.

현재 PyPI 및 Distutils와 호환되는 소프트웨어는 다음과 같습니다.

*   `PloneSoftwareCenter`: `plone.org` 제품 섹션을 운영하는 데 사용됩니다.
*   `EggBasket`

추가 패키지 인덱스는 PyPI의 미러가 아니지만, 자체적으로 미러를 가질 수 있습니다.

#### 여러 인덱스 병합 (Merging several indexes)

클라이언트가 여러 개의 개별 인덱스에서 패키지를 가져와야 하는 경우, 각 인덱스를 잠재적인 패키지 소스로 사용할 수 있어야 합니다. 클라이언트가 패키지를 찾기 위해 여러 인덱스는 정렬된 목록으로 정의되어야 합니다.

각 독립적인 인덱스는 물론 자체 미러 목록을 제공할 수 있습니다.
(XXX: 임의의 인덱스의 미러에 대한 호스트 이름을 가져오는 방법 정의 필요)

이는 모든 수준의 개인 정보 보호를 포함하는 신뢰할 수 있는 패키징 시스템을 위해 클라이언트 수준에서 모든 조합을 허용합니다. 병합 처리는 클라이언트의 몫입니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.