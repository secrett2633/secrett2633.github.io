---
title: "[Final] PEP 430 - Migrating to Python 3 as the default online documentation"
excerpt: "Python Enhancement Proposal 430: 'Migrating to Python 3 as the default online documentation'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/430/
toc: true
toc_sticky: true
date: 2025-09-26 21:43:01+0900
last_modified_at: 2025-09-26 21:43:01+0900
published: true
---
> **원문 링크:** [PEP 430 - Migrating to Python 3 as the default online documentation](https://peps.python.org/pep-0430/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 27-Oct-2012

PEP 430은 `docs.python.org`에서 제공되는 Python 온라인 문서의 기본 버전을 Python 2.7에서 Python 3.3으로 마이그레이션하기 위한 전략을 제안합니다. 이 PEP는 기존 Python 2 문서로 향하는 딥 링크(deep links)의 의미를 유지하면서도, 기본적으로 Python 3 문서를 제공하고, Python 3 문서가 덜 중요하게 보이지 않도록 Python 2와 Python 3 문서를 모두 제공하는 하위 호환(backwards compatible) 방안을 제시합니다.

## 초록 (Abstract)

이 PEP는 사용자들이 `docs.python.org`에 접속할 때 표시되는 Python 문서의 기본 버전을 2.7에서 Python 3.3으로 마이그레이션하기 위한 전략을 제안합니다. 이는 기존 Python 2 문서의 딥 링크 의미를 보존하면서 Python 3 문서를 기본으로 제공하고, Python 3 문서가 '이류(second-class citizen)'처럼 보이지 않도록 Python 2 및 Python 3 문서를 제공하는 하위 호환 가능한 방안을 제시합니다.

## 배경 (Background)

Python 생태계가 Python 2에서 Python 3으로 전환되는 과정이 진행 중인 가운데, `docs.python.org` 루트 URL에서 기본적으로 표시되는 Python 2 문서를 Python 3 문서로 변경하는 시기와 방법에 대한 질문이 주기적으로 제기되었습니다.

## 주요 우려 사항 (Key Concerns)

모든 마이그레이션 제안은 다음의 몇 가지 주요 우려 사항을 해결해야 합니다.

### 초보자를 혼란시키지 않기 (Don't Confuse Beginners)

많은 초보자들은 타사 자료를 통해 Python을 배웁니다. 이러한 자료들은 추가 배경 정보 및 세부 사항을 위해 `python.org` 온라인 문서를 참조할 수 있습니다. 온라인 문서가 업데이트되더라도 "버전 추가(version added)" 및 "버전 변경(version changed)" 태그는 일반적으로 사용자가 사용하는 특정 버전에 맞게 조정하는 데 충분한 정보를 제공합니다.

Python 2 시리즈 내에서 `python.org` 문서로 향하는 딥 링크가 가끔 끊어질 수 있지만, 이는 매우 드뭅니다. Python 3으로의 마이그레이션은 매우 다른 문제입니다. 이름 변경 및 제거로 인해 많은 링크가 끊어질 것이며, Python 2 시리즈에 대한 "버전 추가(version added)" 및 "버전 변경(version changed)" 정보는 완전히 부재합니다.

### 유용한 자료를 손상시키지 않기 (Don't Break Useful Resources)

`python.org`의 메일링 리스트 아카이브나 Stack Overflow와 같은 질문-답변 사이트와 같이 유용한 Python 자료들이 많이 있습니다. 이러한 곳의 링크는 아무리 많은 통지를 제공하더라도 업데이트될 가능성이 매우 낮습니다.

오래된 게시물과 질문에 대한 답변은 현재 모두 `docs.python.org`로 연결되어 있으며, 특정 버전이 지정되지 않은 URL에서는 Python 2 문서를 기대합니다. Python 3와 관련된 답변의 링크는 경로 구성 요소에 명시적으로 `/py3k/`가 붙어 있습니다.

## 제안 (Proposal)

이 PEP는 Python 2 관련 딥 링크를 전혀 마이그레이션하지 않고, 대신 `docs.python.org`에 표시되는 모든 URL에 관련 릴리스 시리즈가 적절하게 붙도록 하는 방안을 채택하는 것입니다.

`http://docs.python.org`의 루트 URL 방문자는 자동으로 `http://docs.python.org/3/`로 리디렉션되지만, `http://docs.python.org/library/os`와 같은 버전별 계층 구조 내의 더 깊은 링크는 `http://docs.python.org/2/library/os`와 같은 Python 2 관련 링크로 리디렉션됩니다.

명시적으로 Python 2 문서의 경로로 리디렉션될 특정 서브 경로는 다음과 같습니다:

*   `/c-api/`
*   `/distutils/`
*   `/extending/`
*   `/faq/`
*   `/howto/`
*   `/library/`
*   `/reference/`
*   `/tutorial/`
*   `/using/`
*   `/whatsnew/`
*   `/about.html`
*   `/bugs.html`
*   `/contents.html`
*   `/copyright.html`
*   `/license.html`
*   `/genindex.html`
*   `/glossary.html`
*   `/py-modindex.html`
*   `/search.html`

기존 `/py3k/` 서브 경로는 새로운 `/3/` 서브 경로로 리디렉션됩니다.

### 제시될 URL (Presented URLs)

이 방안에 따라, 별칭(aliasing) 및 재작성 규칙이 해결된 후 사용자에게 제시될 URL은 다음과 같습니다.

*   `http://docs.python.org/x/*`
*   `http://docs.python.org/x.y/*`
*   `http://docs.python.org/dev/*`
*   `http://docs.python.org/release/x.y.z/*`
*   `http://docs.python.org/devguide`

`/x/` URL은 "해당 릴리스 시리즈의 출시된 버전 중 최신 문서를 제공하라"는 의미입니다. 이는 소스 컨트롤의 관련 유지보수 브랜치에서 문서를 가져옵니다(Python 2의 경우 항상 2.7 브랜치이며, Python 3의 경우 현재 3.3입니다). 릴리스 시리즈의 이전 버전에 대한 차이점은 "버전 추가(version added)" 및 "버전 변경(version changed)" 마커를 통해 확인할 수 있습니다.

`/x.y/` URL은 "이 릴리스의 최신 문서를 제공하라"는 의미입니다. 이는 소스 컨트롤의 관련 유지보수 브랜치(또는 현재 개발 중인 버전의 기본 브랜치)에서 문서를 가져옵니다. 이는 사용자의 브라우저에서 URL이 실제로 계속 사용할 수 있어 쉽게 복사 및 붙여넣기 할 수 있다는 점에서 현재 상태와 다릅니다. (현재는 릴리스 시리즈에서 최신이 아닌 특정 버전에 대한 참조는 "release" 계층 구조의 특정 유지보수 버전의 안정적인 URL로 해석되는 반면, 릴리스 시리즈의 현재 최신 버전은 릴리스 시리즈 URL로 해석됩니다. 이는 "최신 버전별 URL"을 얻기 어렵게 만듭니다. 항상 수동으로 구성해야 하기 때문입니다).

`/dev/` URL은 소스 컨트롤의 기본 브랜치에 대한 문서를 의미합니다.

`/release/x.y.z/` URL은 해당 릴리스가 출시될 당시의 문서와 정확히 동일한 문서를 참조합니다.

개발자 가이드(developer's guide)는 버전 특정적이지 않으므로 자체적인 안정적인 `/devguide/` URL을 유지합니다.

## 근거 (Rationale)

Python 3에 대한 확신을 보여주는 표시로 특정 버전이 지정되지 않은(unqualified) 참조를 Python 3을 의미하도록 변경하고자 하는 일부 바람이 있습니다. 이러한 변경은 많은 것을 망가뜨리거나, 망가뜨리지 않기 위해 엄청난 작업을 수반할 것입니다.

이 제안은 다음을 통해 세상에 혼란을 주지 않으면서도 거의 동일한 효과를 얻을 수 있다고 믿습니다.

*   온라인 문서에 대한 특정 버전이 지정되지 않은 참조 사용을 중단하고 (단, 이러한 참조의 의미는 무기한 보존할 것을 약속함)
*   `python.org` 및 `python-dev`가 관리하는 모든 링크를 버전이 명시된 참조를 사용하도록 업데이트 (아카이브된 이메일 제외)
*   `http://docs.python.org`의 루트 방문자를 `http://docs.python.org/3.x`로 리디렉션

가장 중요한 것은, 이 방안이 기존 딥 링크의 동작을 변경하지 않으므로 딥 링크를 손상시키거나 버전이 명시되지 않은 링크를 Python 3으로 리디렉션할 위험이 있는 방안보다 훨씬 짧은 경고 기간으로 구현될 수 있다는 점입니다. 이 방안에서 경고가 필요한 유일한 부분은 "http://docs.python.org/" 랜딩 페이지를 Python 3.3 문서로 리디렉션하는 단계입니다.

네임스페이스(Namespaces)는 정말 좋은 아이디어입니다. 더 많이 활용합시다.

이 PEP에 설명된 접근 방식은 기본 브랜치(default branch)의 콘텐츠에 접근하는 두 가지 방법을 제공합니다: `/dev/` 또는 적절한 `/x.y/` 참조를 사용하는 것입니다. 이는 기본 브랜치가 두 가지 다른 목적으로 참조되기 때문에 의도된 것입니다.

*   다음 릴리스의 예정된 기능에 대해 논의할 때 추가 정보를 제공하기 위해 (`/x.y/` URL이 적절함)
*   개발자들이 버전에 관계없이 다음 기능 릴리스의 문서에 접근할 수 있는 안정적인 대상을 제공하기 위해 (`/dev/` URL이 적절함)

## 구현 (Implementation)

`docs.python.org`의 URL은 CPython 소스 리포(repo)가 아닌 `python.org` 인프라 팀에 의해 제어되므로, 이 PEP의 아이디어 수용 및 구현은 해당 팀에 달려 있습니다.

## 참고 자료 (References)

*   2012년 5월 토론 (https://mail.python.org/pipermail/python-dev/2012-May/119524.html)
*   2012년 10월 토론 (https://mail.python.org/pipermail/python-ideas/2012-October/017406.html)
*   "/latest/" 경로 접두사 사용 (https://mail.python.org/pipermail/python-dev/2012-May/119567.html)

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.