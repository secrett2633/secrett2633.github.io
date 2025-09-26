---
title: "[Rejected] PEP 262 - A Database of Installed Python Packages"
excerpt: "Python Enhancement Proposal 262: 'A Database of Installed Python Packages'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/262/
toc: true
toc_sticky: true
date: 2025-09-26 17:44:46+0900
last_modified_at: 2025-09-26 17:44:46+0900
published: true
---
> **원문 링크:** [PEP 262 - A Database of Installed Python Packages](https://peps.python.org/pep-0262/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 08-Jul-2001

PEP 262 – 설치된 Python 패키지 데이터베이스

## 개요
이 PEP는 시스템에 설치된 Python 소프트웨어의 데이터베이스 형식을 설명합니다.

**참고:** 이 PEP는 PEP 345 및 PEP 376에 의해 대체되었으며, 이 PEP들은 승인되었습니다. 따라서 이 PEP는 (암시적으로) 거부되었습니다.

## 도입 배경 및 목표
설치된 Python 배포판 및 해당 버전을 파악하는 방법을 제공하고 CPAN, APT, RPM과 유사한 기능을 제공하는 것을 목표로 합니다. 지원되어야 할 필수 사용 사례는 다음과 같습니다:
*   시스템에 배포판 X가 설치되어 있는가?
*   배포판 X의 어떤 버전이 설치되어 있는가?
*   배포판 X의 새 버전을 어디서 찾을 수 있는가?
*   배포판 X가 시스템에 어떤 파일을 설치했는가?
*   파일 `x/y/z.py`는 어떤 배포판에서 온 것인가?
*   누군가 `x/y/z.py`를 로컬에서 수정했는가?
*   이 소프트웨어에 필요한 다른 배포판은 무엇인가?
*   이 배포판이 제공하는 Python 모듈은 무엇인가?

## 데이터베이스 위치
데이터베이스는 `<prefix>/lib/python<version>/install-db/` 아래의 파일들에 저장됩니다. 이 위치는 이 PEP의 나머지 부분에서 `INSTALLDB`라고 불립니다.

데이터베이스의 구조는 의도적으로 단순하게 유지됩니다. 이 디렉토리 또는 그 하위 디렉토리(있는 경우)의 각 파일은 단일 배포판을 설명합니다. RPM과 같은 Python 소프트웨어의 바이너리 패키징은 해당 파일을 `INSTALLDB` 디렉토리에 설치하는 것만으로 Python의 데이터베이스를 업데이트할 수 있습니다.

하위 디렉토리를 스캔하는 이유는 데이터베이스 디렉토리에 너무 많은 항목이 포함된 경우 디렉토리 기반 인덱싱 체계로 전환할 수 있기 때문입니다.

## 데이터베이스 내용
`INSTALLDB` 또는 그 하위 디렉토리의 각 파일은 단일 배포판을 설명하며 다음 내용을 포함합니다:
*   파일의 섹션을 나열하는 첫 줄 (예: `'PKG-INFO FILES REQUIRES PROVIDES'`). 섹션은 항상 빈 줄로 구분됩니다.
*   `Distutils`를 사용하여 설치하는 배포판은 데이터베이스를 자동으로 업데이트해야 합니다. 자체 설치 방식을 사용하는 배포판은 데이터베이스의 API를 사용하여 수동으로 자체 항목을 추가하거나 업데이트해야 합니다. RPM 또는 `pkgadd`와 같은 시스템 패키지 관리자는 `INSTALLDB` 디렉토리에 새 파일을 생성할 수 있습니다.

### PKG-INFO 섹션
PEP 241, "Metadata for Python Software Packages"에 설명된 대로 파일의 배포판 정보를 포함하는 초기 RFC 822 헤더 세트입니다.

### FILES 섹션
배포판이 설치한 각 파일에 대한 항목입니다. `.pyc` 및 `.pyo` 파일과 같은 생성된 파일과 배포판이 설치한 원래 `.py` 파일도 이 목록에 포함됩니다. 그러나 체크섬은 저장되거나 확인되지 않습니다.

각 파일의 항목은 다음 필드를 포함하는 단일 탭으로 구분된 줄입니다:
*   시스템에 설치된 파일의 전체 경로
*   파일의 크기
*   파일의 권한. Windows에서는 이 필드가 항상 'unknown'입니다.
*   파일의 소유자 및 그룹 (탭으로 구분). Windows에서는 이 필드들이 모두 'unknown'입니다.
*   파일의 SHA1 다이제스트 (16진수로 인코딩). `*.pyc` 파일과 같은 생성된 파일의 경우 이 필드는 파일의 체크섬을 확인해서는 안 됨을 나타내는 “-” 문자열을 포함해야 합니다.

### REQUIRES 섹션
이 섹션은 이 모듈 배포판이 제대로 실행되는 데 필요한 서비스를 나타내는 문자열 목록입니다. 이 목록에는 배포판 이름("python-stdlib")과 모듈 이름("rfc822", "htmllib", "email", "email.Charset")이 포함됩니다. `distutils.core.setup()` 함수의 추가 `requires` 인수에 의해 지정됩니다.

### PROVIDES 섹션
이 섹션은 설치된 배포판이 제공하는 서비스를 나타내는 문자열 목록입니다. 이 목록에는 배포판 이름("python-stdlib")과 모듈 이름("rfc822", "htmllib", "email", "email.Charset")이 포함됩니다.

## API 설명
기본 클래스는 `InstallationDatabase`이며, 코드는 `distutils/install_db.py`에 있습니다. `InstallationDatabase`는 설치된 배포판에 대한 모든 정보를 포함하는 `Distribution` 인스턴스를 반환합니다.

### `InstallationDatabase` 클래스 인터페이스
```python
class InstallationDatabase:
    def __init__(self, path=None):
        """InstallationDatabase(path:string)
        지정된 경로를 루트로 하는 설치 데이터베이스를 읽습니다.
        path가 None이면 INSTALLDB가 기본값으로 사용됩니다.
        """
    def get_distribution(self, distribution_name):
        """get_distribution(distribution_name:string) : Distribution
        단일 배포판에 해당하는 객체를 가져옵니다.
        """
    def list_distributions(self):
        """list_distributions() : [Distribution]
        시스템에 설치된 모든 배포판 목록을 특정 순서 없이 반환합니다.
        """
    def find_distribution(self, path):
        """find_file(path:string) : Distribution
        'path' 파일을 포함하는 배포판을 검색하고 반환합니다.
        파일이 InstallationDatabase가 아는 어떤 배포판에도 속하지 않으면 None을 반환합니다.
        """
```

### `Distribution` 클래스 속성 및 메서드
```python
class Distribution:
    """인스턴스 속성:
    name : string (배포판 이름)
    files : {string : (size:int, perms:int, owner:string, group:string, digest:string)}
            이 배포판에 의해 설치된 파일의 경로와 파일 정보(크기, 권한, 소유자, 그룹, 다이제스트)를 매핑하는 딕셔너리.
    version : distutils.version.Version (이 배포판의 버전)
    platform : [string]
    summary : string
    description : string
    keywords : string
    home_page : string
    author : string
    author_email : string
    license : string
    """
    def add_file(self, path):
        """add_file(path:string):None
        설치된 파일에 대한 크기, 소유권 등 정보를 기록합니다.
        """
    def has_file(self, path):
        """has_file(path:string) : Boolean
        지정된 경로가 이 배포판의 파일에 속하면 True를 반환합니다.
        """
    def check_file(self, path):
        """check_file(path:string) : Boolean
        파일의 크기, 체크섬, 소유권이 일치하는지 확인하고 일치하면 True를 반환합니다.
        """
```

## 거부된 제안
*   **단일 대형 텍스트 파일 또는 `anydbm` 파일 사용 대신 배포판당 하나의 텍스트 파일 사용:** 성능이 중요한 문제가 아니며, 확장성 문제도 없을 것으로 예상되고, 개별 텍스트 파일이 RPM 또는 DPKG와 같은 설치 프로그램과 호환되기 때문에 거부되었습니다.
*   **Windows에서 파일 권한 및 소유자/그룹 저장:** Windows는 소유권 및 접근 권한을 지원하지만, 이를 읽고 설정하려면 `win32all` 확장이 필요하며, 이는 Windows용 기본 Python 설치 프로그램에는 존재하지 않기 때문에 거부되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.