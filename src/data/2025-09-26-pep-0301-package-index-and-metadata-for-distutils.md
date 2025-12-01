---
title: "[Final] PEP 301 - Package Index and Metadata for Distutils"
excerpt: "Python Enhancement Proposal 301: 'Package Index and Metadata for Distutils'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/301/
toc: true
toc_sticky: true
date: 2025-09-26 18:07:29+0900
last_modified_at: 2025-09-26 18:07:29+0900
published: true
---
> **원문 링크:** [PEP 301 - Package Index and Metadata for Distutils](https://peps.python.org/pep-0301/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 24-Oct-2002

PEP 301 – Distutils를 위한 패키지 인덱스 및 메타데이터

## 초록 (Abstract)
이 PEP는 Distutils 패키징 시스템에 몇 가지 확장 기능을 제안합니다. 주요 개선 사항으로는 중앙 패키지 인덱스 서버, 인덱스에 패키지 정보를 제출하는 도구, 그리고 Trove 정보를 포함하기 위한 패키지 메타데이터 확장 등이 있습니다.

이 PEP는 패키지 종속성 문제나 PEP 243에 설명된 패키지 저장 및 다운로드 문제를 다루지 않습니다. 또한, PEP 262에 설명된 로컬 패키지 데이터베이스를 제안하는 것도 아닙니다. 이 분야의 기존 사례로는 Vaults of Parnassus, CPAN, PAUSE 등이 참고되었습니다.

## 도입 배경 (Rationale)
Python 프로그래머들은 오랫동안 사용 가능한 기존 모듈과 시스템을 쉽게 찾을 수 있는 방법의 필요성을 느껴왔습니다. 다른 언어에서 이러한 시스템의 존재가 해당 언어의 인기에 크게 기여했다는 점은 논쟁의 여지가 있습니다. Catalog-SIG의 존재와 그곳에서의 많은 토론은 이러한 필요성을 인식하는 사용자가 많다는 것을 보여줍니다.

Python에 Distutils 패키징 시스템이 도입되면서 공유 가능한 코드를 배포하는 과정이 단순해졌고, 패키지 메타데이터를 캡처하는 메커니즘이 포함되었지만, 메타데이터를 패키지와 함께 제공하는 것 외에는 거의 활용되지 않았습니다.

인덱스에 대한 인터페이스는 python.org 도메인에서 호스팅되어, 기존의 카탈로그 노력에는 없었던 정당성을 부여해야 합니다. 카탈로그에 정보를 제출하는 인터페이스는 가능한 한 간단해야 하며, 대부분의 사용자에게는 한 줄 명령이면 충분하기를 바랍니다.

패키지 종속성 문제는 시스템의 복잡성 때문에 다루지 않았습니다. PEP 262가 이러한 시스템을 제안했지만, 이 문서 작성 시점에는 아직 미완성 상태였습니다. 패키지 배포(중앙 서버에 저장) 문제는 저장 공간 및 대역폭 가용성에 대한 가정이 필요하여 다루지 않았습니다. PEP 243은 이러한 문제와 더 많은 것을 다루고 있으며, 이 제안은 PEP 243의 제안과 호환되며 보완적인 것으로 간주됩니다.

## 사양 (Specification)
사양은 웹 인터페이스, Distutils `register` 명령, 그리고 Distutils Trove 분류의 세 부분으로 구성됩니다.

### 웹 인터페이스 (Web Interface)
웹 인터페이스는 간단한 스토어 위에 구현됩니다. 이 인터페이스는 python.org 도메인을 통해 직접 또는 `packages.python.org`로 접속할 수 있습니다.

스토어는 모든 메타데이터 필드에 대한 컬럼을 가집니다. `(name, version)` 쌍은 고유성 키(uniqueness key)로 사용됩니다. 기존의 `(name, version)`에 대한 추가 제출은 업데이트 작업으로 이어집니다.

웹 인터페이스는 다음 명령/인터페이스를 구현합니다:
*   **index** : 알려진 패키지를 나열하며, 선택적으로 필터링할 수 있습니다. `search`라는 추가 HTML 페이지는 사용자가 인덱스 보기를 사용자 정의할 수 있는 폼을 제공합니다. 인덱스에는 Trove 인터페이스 디자인 섹션 4.3에 제시된 것과 같은 브라우징 인터페이스가 포함될 것입니다. 결과는 페이지로 나뉘고 알파벳순으로 정렬되며 최신 버전만 표시됩니다. 최신 버전 정보는 Distutils `LooseVersion` 클래스를 사용하여 결정됩니다.
*   **display** : 패키지에 대한 정보를 표시합니다. 모든 필드는 일반 텍스트로 표시됩니다. "url" (또는 "home_page") 필드는 하이퍼링크로 연결됩니다.
*   **submit** : 패키지에 대한 메타데이터의 POST 제출을 수락합니다. "name"과 "version" 필드는 인덱스의 항목을 고유하게 식별하므로 필수입니다. `submit`은 새 항목을 생성할지 기존 항목을 업데이트할지 자동으로 결정합니다. 메타데이터는 적절한 경우 정확성 검사를 받습니다. 특히 Trove 식별자는 허용된 세트와 비교됩니다. 업데이트는 새로 제출된 정보를 기반으로 패키지에 대한 모든 정보를 업데이트합니다.
    *   Distutils를 사용하지 않는 사용자를 위한 수동 제출 및 업데이트를 허용하는 `submit/edit` 폼도 있을 것입니다.
*   **submit_pkg_info** : PKG-INFO 파일의 POST 제출을 수락하고 `submit` 인터페이스와 동일한 기능을 수행합니다.
*   **user** : 인덱스에 새 사용자를 등록합니다. 사용자 이름, 비밀번호 및 이메일 주소가 필요합니다. 비밀번호는 SHA 해시로 인덱스 데이터베이스에 저장됩니다.
    *   사용자 이름이 데이터베이스에 이미 존재하는 경우:
        *   유효한 HTTP Basic 인증이 제공되면, 비밀번호와 이메일 주소가 제출 정보로 업데이트됩니다.
        *   유효한 인증이 제공되지 않으면, 사용자에게 로그인 이름이 이미 사용 중임을 알립니다.
    *   등록은 세 단계 프로세스를 포함합니다:
        1.  사용자가 Distutils `register` 명령 또는 웹을 통해 세부 정보를 제출.
        2.  인덱스 서버가 사용자 이메일 주소로 임의의 일회용 키가 포함된 URL을 보내 등록 확인을 요청.
        3.  사용자가 키를 포함한 URL을 방문하여 등록 확인.
*   **roles** : 사용자 역할 할당을 변경하기 위한 인터페이스입니다.
*   **password_reset** : 제공된 이메일 주소를 키로 사용하여 사용자의 비밀번호를 재설정하고 새 비밀번호가 포함된 이메일을 사용자에게 보냅니다.

`submit` 명령은 HTTP Basic 인증이 필요하며, 가급적 HTTPS 연결을 통해 이루어져야 합니다. 서버 인터페이스는 표준 HTTP 응답 코드의 일부를 통해 명령의 성공 또는 실패를 나타낼 것입니다:
*   **200 OK** : 모든 것이 제대로 작동했습니다.
*   **400 Bad request** : 제출된 데이터 형식이 잘못되었습니다.
*   **401 Unauthorized** : 제공된 사용자 이름 또는 비밀번호가 올바르지 않습니다.
*   **403 Forbidden** : 사용자에게 패키지 정보를 업데이트할 권한이 없습니다 (Owner 또는 Maintainer가 아님).

### 사용자 역할 (User Roles)
세 가지 사용자 역할이 사용자에게 할당될 수 있습니다:
*   **Owner (소유자)** : 패키지 이름을 소유하며, 해당 이름에 대한 Maintainer 역할을 할당할 수 있습니다. 패키지에 대한 정보를 처음 등록한 사용자가 해당 패키지 이름의 Owner로 간주됩니다. 필요한 경우 Admin 사용자가 이를 변경할 수 있습니다. 패키지 이름에 대한 업데이트를 제출할 수 있습니다.
*   **Maintainer (유지보수자)** : 특정 패키지 이름에 대한 정보를 제출하고 업데이트할 수 있습니다.
*   **Admin (관리자)** : Owner 역할을 할당하고 사용자 세부 정보를 편집할 수 있습니다. 패키지 이름에 구애받지 않습니다.

### 인덱스 저장소 (스키마) (Index Storage (Schema))
인덱스는 일련의 관계형 데이터베이스 테이블에 저장됩니다:
*   **packages** : 패키지 이름을 나열하고 패키지 수준 메타데이터(현재는 안정 릴리스 버전만)를 저장합니다.
*   **releases** : 각 패키지에는 릴리스된 각 버전마다 `releases` 테이블에 항목이 있습니다. 한 행은 패키지의 PKG-INFO 파일에 제공된 정보의 대부분을 저장합니다. 각 `(name, version)` 패키지마다 하나의 행이 있습니다.
*   **trove_discriminators** : Trove 식별자 텍스트를 나열하고 각각에 고유 ID를 할당합니다.
*   **release_discriminators** : 각 항목은 패키지 `(name, version)`을 `discriminator_id`에 매핑합니다. 식별자 세트가 릴리스마다 변경될 수 있으므로 `packages` 대신 `releases`에 매핑합니다.
*   **journals** : 인덱스의 패키지 정보 변경 사항에 대한 정보를 저장합니다. `packages`, `releases`, `roles`, `release_discriminators` 테이블에 대한 변경 사항은 변경 사항이 릴리스 특정적인 경우 패키지 이름과 버전별로 여기에 나열됩니다.
*   **users** : 사용자 데이터베이스를 저장합니다. 사용자 이름, 이메일 주소 및 비밀번호.
*   **roles** : `user_name`과 `role_name`을 `package_name`에 매핑합니다.

`rego_otk`라는 추가 테이블은 등록 중에 생성된 일회용 키(One Time Keys)를 저장하며, 인덱스 자체의 범위에서는 중요하지 않습니다.

### Distutils `register` 명령 (Distutils register Command)
중앙 인덱스에 패키지 메타데이터를 게시하는 추가 Distutils 명령인 `register`가 구현됩니다. `register` 명령은 사용자 등록을 자동으로 처리합니다. 사용자에게 세 가지 옵션이 제공됩니다:
*   로그인 및 패키지 정보 제출 (login and submit package information)
*   새로운 패키지 제공자로 등록 (register as a new packager)
*   비밀번호 알림 이메일 전송 (send password reminder email)

`$HOME` 환경 변수가 설정된 시스템에서는 사용자가 종료 시 `~/.pypirc` 파일에 사용자 이름/비밀번호를 저장할지 묻는 메시지가 표시됩니다.

패키지 항목 변경 사항에 대한 알림은 해당 패키지에 대한 정보를 제출한 모든 사용자(최초 제출자와 이후 업데이트자)에게 전송됩니다.

`register` 명령에는 `--verify` 옵션이 포함되어 있어, 실제로 데이터를 커밋하지 않고 인덱스에 테스트 제출을 수행합니다. 인덱스는 평소와 같이 제출 검증을 수행하고 정상적인 제출 중에 보고했을 모든 오류를 보고합니다. 이는 Trove 식별자의 정확성을 검증하는 데 유용합니다.

### Distutils Trove 분류 (Distutils Trove Classification)
"classifiers"라는 새 속성을 통해 패키지 작성자가 사용할 수 있는 메타데이터 세트에 Trove 식별 개념이 추가될 것입니다. 분류자 목록은 웹을 통해 제공되며 다음과 같이 패키지에 추가됩니다:

```python
setup(
    name = "roundup",
    version = __version__,
    classifiers = [
        'Development Status :: 4 - Beta',
        'Environment :: Console',
        'Environment :: Web Environment',
        'Intended Audience :: End Users/Desktop',
        'Intended Audience :: Developers',
        'Intended Audience :: System Administrators',
        'License :: OSI Approved :: Python Software Foundation License',
        'Operating System :: MacOS :: MacOS X',
        'Operating System :: Microsoft :: Windows',
        'Operating System :: POSIX',
        'Programming Language :: Python',
        'Topic :: Communications :: Email',
        'Topic :: Office/Business',
        'Topic :: Software Development :: Bug Tracking',
    ],
    url = 'http://sourceforge.net/projects/roundup/',
    ...
)
```

더 공식적인 Python 구조에서 발생할 수 있는 깊은 중첩으로 인해 분류 항목에는 문자열을 사용하기로 결정되었습니다.

원래 Trove 사양에서 분류 네임스페이스가 슬래시("/")로 구분되어야 한다는 것은 불행히도 많은 이름에 슬래시(예: "OS/2")가 포함되어 충돌합니다. SourceForge와 FreshMeat가 구현한 이중 콜론(" :: ") 솔루션은 이러한 제한을 해결합니다.

모듈 인덱스의 분류 값 목록은 FreshMeat와 SourceForge (허가를 받아)에서 병합되었습니다. 이 목록은 웹 인터페이스와 `register` 명령의 `--list-classifiers` 옵션을 통해 텍스트 목록으로 제공되어 `setup.py` 파일에 복사할 수 있습니다. `register` 명령의 `--verify` 옵션은 분류자 값을 서버 목록과 대조하여 확인합니다.

안타깝게도 "classifiers" 속성의 추가는 하위 호환성(backwards-compatible)이 없습니다. 이를 사용하는 `setup.py` 파일은 Python 2.1.3에서는 작동하지 않습니다. Python 2.2의 버그 수정 릴리스(아마도 2.2.3)가 `setup()` 명령의 인자 검사를 완화하여 새 키워드가 실제로 사용되지 않더라도 허용하기를 바랍니다. 치명적인 오류보다는 경고가 발생하는 것이 바람직합니다. 패키지가 Python 2.2.3 또는 2.3 이전 버전과 호환된다고 광고되는 상황에서는 새 키워드의 사용을 자제해야 합니다.

PKG-INFO에서 분류자 목록 항목은 개별 `Classifier:` 항목으로 나타납니다:

```
Name: roundup
Version: 0.5.2
Classifier: Development Status :: 4 - Beta
Classifier: Environment :: Console (Text Based)
.
.
Classifier: Topic :: Software Development :: Bug Tracking
Url: http://sourceforge.net/projects/roundup/
```

## 구현 (Implementation)
서버는 `http://www.python.org/pypi`에서 사용할 수 있습니다.
코드는 SourceForge 프로젝트 `http://sourceforge.net/projects/pypi/`에서 사용할 수 있습니다.
`register` 명령은 Python 2.3에 통합되었습니다.

## 거부된 제안 (Rejected Proposals)
원래 인덱스 서버는 (PEP 243에서 영감을 받은) 사용자 정의 헤더를 반환하도록 되어 있었습니다:
*   `X-Pypi-Status`: "success" 또는 "fail"
*   `X-Pypi-Reason`: 실패 이유 또는 성공 시 추가 정보

그러나, 이것이 좋지 않은 방식이라는 지적이 있었습니다.

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인에 공개되었습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.