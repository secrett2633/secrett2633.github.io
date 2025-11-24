---
title: "[Draft] PEP 710 - Recording the provenance of installed packages"
excerpt: "Python Enhancement Proposal 710: 'Recording the provenance of installed packages'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/710/
toc: true
toc_sticky: true
date: 2025-09-27 13:11:44+0900
last_modified_at: 2025-09-27 13:11:44+0900
published: true
---
> **원문 링크:** [PEP 710 - Recording the provenance of installed packages](https://peps.python.org/pep-0710/)
>
> **상태:** Draft | **유형:** Standards Track | **작성일:** 27-Mar-2023


# PEP 710 – 설치된 패키지의 출처 기록 (Recording the provenance of installed packages)

## 초록 (Abstract)

이 PEP(Python Enhancement Proposal)는 설치된 Python 배포 패키지(distribution package)의 출처(provenance)를 기록하는 방법을 설명합니다. 이 기록은 설치 프로그램(installer)에 의해 `.dist-info` 디렉터리 내의 `provenance_url.json`이라는 JSON 파일 형태로 생성되며 사용자에게 제공됩니다. 이 JSON 파일은 설치된 배포 패키지 해시(hash)와 함께 배포 패키지의 URL을 기록할 수 있는 추가 메타데이터를 담고 있습니다. 이 제안은 PEP 610을 기반으로 하며, 패키지가 이름(선택적으로 버전)으로 식별될 때 `direct_url.json`을 `provenance_url.json`으로 보완합니다.

## 동기 (Motivation)

Python 프로젝트를 설치하는 과정은 일반적으로 패키지 인덱스(Package Index)에서 배포 패키지를 다운로드하고 그 내용을 적절한 위치에 압축 해제하는 것을 포함합니다. 설치 과정이 완료된 후, 사용된 릴리스 아티팩트(release artifact)와 그 출처에 대한 정보는 보통 손실됩니다. 그러나 패키지 설치에 사용된 배포 패키지와 그 출처에 대한 기록을 유지해야 하는 여러 활용 사례가 있습니다.

Python 휠(wheel)은 다양한 컴파일러 플래그(flags)나 다른 휠 태그(tags)를 지원하여 빌드될 수 있습니다. 두 경우 모두, 설치 프로그램이 여러 휠(다른 패키지 인덱스에서 올 수도 있음)을 고려할 수 있으며, 실제 설치에 어떤 휠 파일이 사용되었는지 즉시 파악하는 것이 도움이 될 수 있습니다. 이를 통해 개발자는 휠에 대한 정보를 사용하여 원하는 휠이 실제로 설치되었는지 확인하고 문제를 디버깅할 수 있습니다. 또 다른 활용 사례로는 SBOM(Software Bill of Materials)을 보고하는 도구와 같이 설치된 소프트웨어에 대한 더 정확한 보고서를 제공하는 도구가 있습니다. 또한, 각 설치된 패키지를 Python 패키지 인덱스에서 사용된 특정 배포 아티팩트에 고정(pinning)하여 Python 환경을 재구성하는 것도 활용 사례가 될 수 있습니다.

## 근거 (Rationale)

이 PEP에서 설명하는 동기는 "설치된 배포 패키지의 직접 URL 출처 기록(Recording the Direct URL Origin of installed distributions)" 사양의 확장입니다. 직접 URL을 사용하여 설치된 패키지의 출처 정보를 기록하는 것 외에도, 설치 프로그램은 Python 패키지 인덱스에서 이름(및 선택적으로 버전)으로 설치된 패키지에 대해서도 동일한 작업을 수행해야 합니다.

이 PEP에서 설명하는 아이디어는 컨테이너화된 환경에서 배포 패키지를 설치하는 데 사용되는 `micropipenv`라는 도구에서 시작되었습니다. 현재, 컨테이너화된 애플리케이션은 설치된 배포 패키지의 출처에 대한 정보를 암묵적으로 담고 있지 않습니다 (전체 URL에서 설치되어 `direct_url.json`을 통해 기록되지 않는 한). 이로 인해 컨테이너화된 환경에 있는 소프트웨어를 감사해야 하는 경우, 컨테이너 이미지 공급자는 해당 빌드 프로세스, 구성 및 애플리케이션 소스 코드와 연결해야 합니다.

Discourse 스레드에서 진행된 후속 논의에서는 설치 과정에 대한 상세한 JSON 보고서를 생성할 수 있는 `pip`의 새로운 `--report` 옵션도 언급되었습니다. 이 옵션은 이 PEP가 다루는 출처 문제에 도움이 될 수 있습니다. 그럼에도 불구하고, 이 옵션은 출처 정보를 얻기 위해 `pip`에 명시적으로 전달되어야 하며, 출처 확인에 필요하지 않을 수 있는 추가 메타데이터(예: 각 배포 패키지의 Python 버전 요구 사항)를 포함합니다. 또한, 이 옵션은 이 PEP가 작성될 당시 `pip`에만 해당됩니다.

설치된 패키지를 기록하기 위한 현재 사양은 설치된 파일을 기록하지만, 이 파일이 얻어진 배포 아티팩트를 기록하지 않는 `RECORD` 파일을 정의합니다. 설치된 아티팩트 감사는 `RECORD` 파일에 나열된 항목을 일치시켜 수행할 수 있습니다. 그러나 이 기술은 각 아티팩트가 제공하는 파일의 미리 계산된 데이터베이스 또는 실제 아티팩트 내용과의 비교를 필요로 합니다. 두 접근 방식 모두 상대적으로 비용이 많이 들고 시간이 많이 걸리는 작업이며, 제안된 `provenance_url.json` 파일을 통해 제거될 수 있습니다.

직접 URL에서 얻은 것과 인덱스에서 이름/버전으로 얻은 것 모두, 설치된 배포 패키지에 대한 출처 정보를 기록하는 것은 앞서 언급된 컨테이너화된 애플리케이션의 특정 사용 사례를 넘어 Python 환경 감사를 전반적으로 단순화할 수 있습니다. 커뮤니티 프로젝트 `pip-audit`는 이 기능에 대한 관심을 표명했습니다.

## 사양 (Specification)

이 문서의 "MUST", "MUST NOT", "REQUIRED", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", "OPTIONAL" 키워드는 RFC 2119에 설명된 대로 해석되어야 합니다.

`provenance_url.json` 파일은 설치 프로그램이 이름(선택적으로 버전 지정자)으로 지정된 배포 패키지를 설치할 때 `.dist-info` 디렉터리에 생성되어야 합니다 (`SHOULD`).

이 파일은 직접 URL 참조(VCS URL 포함)를 지정하는 요구 사항에서 배포 패키지를 설치할 때는 생성되어서는 안 됩니다 (`MUST NOT`).

주어진 `.dist-info` 디렉터리에는 `provenance_url.json`과 `direct_url.json` (PEP 610의 "설치된 배포 패키지의 직접 URL 출처 기록" 사양 및 해당 Direct URL 데이터 구조 사양에 따름) 파일 중 하나만 존재할 수 있습니다. 설치 프로그램은 두 파일을 모두 추가해서는 안 됩니다 (`MUST NOT`).

`provenance_url.json` JSON 파일은 RFC 8259 및 UTF-8 인코딩을 준수하는 딕셔너리(`dictionary`)여야 합니다 (`MUST`).

존재하는 경우, 정확히 두 개의 키를 포함해야 합니다 (`MUST`). 첫 번째 키는 `url`이며, 타입은 `string`이어야 합니다 (`MUST`). 두 번째 키는 `archive_info`이며, 아래에 정의된 값을 가져야 합니다 (`MUST`).

`url` 키의 값은 배포 패키지가 다운로드된 URL이어야 합니다 (`MUST`). 소스 배포(source distribution)로부터 휠이 빌드된 경우, `url` 값은 소스 배포가 다운로드된 URL이어야 합니다 (`MUST`). 휠이 직접 다운로드되어 설치된 경우, `url` 필드는 휠이 다운로드된 URL이어야 합니다 (`MUST`). Direct URL 데이터 구조 사양과 마찬가지로, 보안상의 이유로 `url` 값에서 민감한 인증 정보는 제거되어야 합니다 (`MUST`).

그러나 URL의 `user:password` 섹션은 다음 정규 표현식과 일치하는 환경 변수로 구성될 수 있습니다:

```
\$\{[A-Za-z0-9-_]+\}(:\$\{[A-Za-z0-9-_]+\})?
```

또한, URL의 `user:password` 섹션은 잘 알려진, 보안에 민감하지 않은 문자열일 수 있습니다. 일반적인 예로는 `ssh://git@gitlab.com`과 같은 URL의 경우 `git`이 있습니다.

`archive_info`의 값은 단일 키 `hashes`를 가진 딕셔너리여야 합니다 (`MUST`). `hashes`의 값은 해시 함수 이름과 `url` 값으로 참조되는 파일의 16진수 인코딩 다이제스트(digest)를 매핑하는 딕셔너리입니다. 적어도 하나의 해시가 기록되어야 합니다 (`MUST`). 여러 해시가 포함될 수 있으며 (`MAY`), 여러 해시에 대해 무엇을 할지는 소비자의 결정에 달려 있습니다 (모두 유효성을 검사하거나, 일부만 검사하거나, 아무것도 하지 않을 수 있습니다).

각 해시는 `hashlib.algorithms_guaranteed`가 제공하는 단일 인자 해시 중 하나여야 하며 (`MUST`), `sha1`과 `md5`는 사용되어서는 안 됩니다 (`MUST NOT`). Python 3.11 기준으로, `shake_128`과 `shake_256`이 다중 인자이므로 제외되며, 허용되는 해시 세트는 다음과 같습니다:

```python
>>> import hashlib
>>> sorted(hashlib.algorithms_guaranteed - {"shake_128", "shake_256", "sha1", "md5"})
['blake2b', 'blake2s', 'sha224', 'sha256', 'sha384', 'sha3_224', 'sha3_256', 'sha3_384', 'sha3_512', 'sha512']
```

각 해시는 항상 소문자인 해시의 표준 이름으로 참조되어야 합니다 (`MUST`).

해시 `sha1` 및 `md5`는 이러한 해시 알고리즘의 보안 제한으로 인해 존재해서는 안 됩니다 (`MUST NOT`). 반대로, `sha256` 해시는 포함되어야 합니다 (`SHOULD`).

인덱스에서 배포 패키지를 캐시하는 설치 프로그램은 캐시된 배포 아티팩트와 관련된 정보를 유지해야 하며 (`SHOULD`), 이를 통해 설치 프로그램의 캐시에서 배포 패키지를 설치할 때도 `provenance_url.json` 파일을 생성할 수 있습니다.

## 하위 호환성 (Backwards Compatibility)

"설치된 프로젝트 기록(Recording installed projects)" 사양에 따라, 설치 프로그램은 `.dist-info` 디렉터리에 추가적인 설치 프로그램별 파일을 유지할 수 있습니다. 이 PEP가 하위 호환성 문제를 일으키지 않도록, 설치 프로그램 및 라이브러리에 대한 포괄적인 조사를 통해 유사한 이름의 파일을 사용하거나 기타 주요 실현 가능성 문제를 일으키는 현재 도구가 없는 것으로 확인되었습니다.

휠 사양(Wheel specification)은 `.dist-info` 디렉터리에 존재할 수 있는 파일들을 나열합니다. 이 파일 이름 중 어느 것도 이 PEP에서 제안하는 `provenance_url.json` 파일과 충돌하지 않습니다.

### 설치 프로그램 및 라이브러리 내 `provenance_url.json`의 존재 여부

Python 생태계의 기존 설치 프로그램, 라이브러리 및 의존성 관리자에 대한 포괄적인 조사를 통해 각 도구에 `provenance_url.json` 지원을 추가하는 것의 영향을 분석했습니다. 요약하자면, 이 PEP가 작성될 당시 주요 하위 호환성 문제, 충돌 또는 실현 가능성 저해 요소는 발견되지 않았습니다. 조사에 대한 자세한 내용은 "부록: 설치 프로그램 및 라이브러리 조사(Appendix: Survey of installers and libraries)" 섹션에서 확인할 수 있습니다.

### `direct_url.json`과의 호환성

이 제안은 PEP 610 및 해당 PyPA 표준 사양에 설명된 `direct_url.json` 파일에 어떠한 변경도 가하지 않습니다.

`provenance_url.json` 파일의 내용은 `direct_url.json`이 소스 아카이브 또는 휠을 참조할 때 설치 프로그램이 `direct_url.json`을 지원하는 일부 로직을 재사용할 수 있도록 설계되었습니다.

`provenance_url.json`과 `direct_url.json` 파일의 주요 차이점은 `provenance_url.json` 파일의 필수 키와 해당 값입니다. 이는 `provenance_url.json` 파일이 `.dist-info` 디렉터리에 존재할 경우, 소비자가 해당 내용에 의존할 수 있도록 보장하는 데 도움이 됩니다.

## 보안 고려 사항 (Security Implications)

`provenance_url.json` 파일의 주요 보안 기능 중 하나는 Python 환경에 설치된 아티팩트를 감사할 수 있는 기능입니다. 도구는 Python 배포 패키지를 설치하는 데 어떤 Python 패키지 인덱스가 사용되었는지, 그리고 해당 릴리스 아티팩트의 해시 다이제스트를 확인할 수 있습니다.

예를 들어, 최근 PyTorch 사건에서 발생한 손상된 의존성 체인을 들 수 있습니다. PyTorch 인덱스는 `torchtriton`이라는 패키지를 제공했습니다. 공격자는 PyPI에 악성 바이너리를 실행하는 `torchtriton`을 게시했습니다. `provenance_url.json` 파일에 명시된 설치된 Python 배포 패키지의 URL을 확인하면, 도구는 설치된 Python 배포 패키지의 출처를 자동으로 확인할 수 있습니다. PyTorch 사건의 경우, `torchtriton`의 URL은 PyPI가 아닌 PyTorch 인덱스를 가리켜야 합니다. 도구는 설치된 Python 배포 패키지 URL을 확인하여 이러한 악성 Python 배포 패키지를 식별하는 데 도움을 줄 수 있습니다. 더 정확한 확인은 `provenance_url.json` 파일에 명시된 설치된 Python 배포 패키지의 해시도 포함할 수 있습니다. 이러한 해시 확인은 Python 배포 패키지가 출처 URL로 구별되지 않는 미러링된 Python 패키지 인덱스에서 유용하며, 원하는 Python 패키지 배포 패키지만이 설치되도록 보장합니다.

악의적인 행위자는 설치된 Python 배포 패키지의 출처 정보를 숨기기 위해 `provenance_url.json` 파일의 내용을 의도적으로 조정할 수 있습니다. 이러한 악의적인 활동을 밝혀낼 보안 확인은 파일 시스템의 동작을 모니터링하고 궁극적으로 사용자 또는 파일 권한을 검토해야 하므로 이 PEP의 범위 밖입니다.

## 교육 방법 (How to Teach This)

`provenance_url.json` 메타데이터 파일은 도구를 위한 것이며 최종 사용자에게 직접적으로 보이지 않습니다.

## 예시 (Examples)

### 유효한 `provenance_url.json` 예시

유효한 `provenance_url.json`은 여러 해시를 나열합니다:

```json
{
  "archive_info": {
    "hashes": {
      "blake2s": "fffeaf3d0bd71dc960ca2113af890a2f2198f2466f8cd58ce4b77c1fc54601ff",
      "sha256": "236bcb61156d76c4b8a05821b988c7b8c35bf0da28a4b614e8d6ab5212c25c6f",
      "sha3_256": "c856930e0f707266d30e5b48c667a843d45e79bb30473c464e92dfa158285eab",
      "sha512": "6bad5536c30a0b2d5905318a1592948929fbac9baf3bcf2e7faeaf90f445f82bc2b656d0a89070d8a6a9395761f4793c83187bd640c64b2656a112b5be41f73d"
    }
  },
  "url": "https://files.pythonhosted.org/packages/07/51/2c0959c5adf988c44d9e1e0d940f5b074516ecc87e96b1af25f59de9ba38/pip-23.0.1-py3-none-any.whl"
}
```

단일 해시 항목을 나열하는 유효한 `provenance_url.json`:

```json
{
  "archive_info": {
    "hashes": {
      "sha256": "236bcb61156d76c4b8a05821b988c7b8c35bf0da28a4b614e8d6ab5212c25c6f"
    }
  },
  "url": "https://files.pythonhosted.org/packages/07/51/2c0959c5adf988c44d9e1e0d940f5b074516ecc87e96b1af25f59de9ba38/pip-23.0.1-py3-none-any.whl"
}
```

휠을 빌드하고 설치하는 데 사용된 소스 배포를 나열하는 유효한 `provenance_url.json`:

```json
{
  "archive_info": {
    "hashes": {
      "sha256": "8bfe29f17c10e2f2e619de8033a07a224058d96b3bfe2ed61777596f7ffd7fa9"
    }
  },
  "url": "https://files.pythonhosted.org/packages/1d/43/ad8ae671de795ec2eafd86515ef9842ab68455009d864c058d0c3dcf680d/micropipenv-0.0.1.tar.gz"
}
```

### 유효하지 않은 `provenance_url.json` 예시

다음 예시는 원래 "설치된 배포 패키지의 직접 URL 출처 기록"에 문서화된 데이터 구조에서 설계되었던 `archive_info` 딕셔너리에 `hash` 키를 포함합니다. `hash` 키는 `hashes`와의 혼동 및 해시 값을 동기화하기 위해 필요한 추가 검사를 방지하기 위해 존재해서는 안 됩니다 (`MUST NOT`).

```json
{
  "archive_info": {
    "hash": "sha256=236bcb61156d76c4b8a05821b988c7b8c35bf0da28a4b614e8d6ab5212c25c6f",
    "hashes": {
      "sha256": "236bcb61156d76c4b8a05821b988c7b8c35bf0da28a4b614e8d6ab5212c25c6f"
    }
  },
  "url": "https://files.pythonhosted.org/packages/07/51/2c0959c5adf988c44d9e1e0d940f5b074516ecc87e96b1af25f59de9ba38/pip-23.0.1-py3-none-any.whl"
}
```

또 다른 예시는 유효하지 않은 해시 이름을 보여줍니다. 참조된 해시 이름은 이 PEP와 Python `hashlib.hash.name` 문서에 설명된 표준 해시 이름에 해당하지 않습니다.

```json
{
  "archive_info": {
    "hashes": {
      "SHA-256": "236bcb61156d76c4b8a05821b988c7b8c35bf0da28a4b614e8d6ab5212c25c6f"
    }
  },
  "url": "https://files.pythonhosted.org/packages/07/51/2c0959c5adf988c44d9e1e0d940f5b074516ecc87e96b1af25f59de9ba38/pip-23.0.1-py3-none-any.whl"
}
```

마지막 예시는 다운로드된 아티팩트에 사용할 수 있는 해시가 없는 `provenance_url.json` 파일을 보여줍니다:

```json
{
  "archive_info": {
    "hashes": {}
  },
  "url": "https://files.pythonhosted.org/packages/07/51/2c0959c5adf988c44d9e1e0d940f5b074516ecc87e96b1af25f59de9ba38/pip-23.0.1-py3-none-any.whl"
}
```

### `pip` 명령 및 `provenance_url.json`, `direct_url.json`에 미치는 영향 예시

다음 명령은 `direct_url.json` 파일을 생성하지만 `provenance_url.json` 파일을 생성하지 않습니다. 이 예시들은 Direct URL 데이터 구조 사양의 예시를 따릅니다:

*   `pip install https://example.com/app-1.0.tgz`
*   `pip install https://example.com/app-1.0.whl`
*   `pip install "git+https://example.com/repo/app.git#egg=app&subdirectory=setup"`
*   `pip install ./app`
*   `pip install file:///home/user/app`
*   `pip install --editable "git+https://example.com/repo/app.git#egg=app&subdirectory=setup"` (이 경우 `url`은 Git 저장소가 복제된 로컬 디렉터리가 되며, `dir_info`는 `"editable": true`와 함께 존재하고 `vcs_info`는 설정되지 않습니다)
*   `pip install -e ./app`

`provenance_url.json` 파일을 생성하지만 `direct_url.json` 파일을 생성하지 않는 명령:

*   `pip install app`
*   `pip install app~=2.2.0`
*   `pip install app --no-index --find-links "https://example.com/"`

이러한 동작은 PR `pypa/pip#11865`에 구현된 `pip` 변경 사항을 사용하여 테스트할 수 있습니다.

## 참조 구현 (Reference Implementation)

Python 배포 패키지를 설치할 때 `provenance_url.json` 메타데이터 파일을 생성하기 위한 개념 증명은 `pip`의 PR `pypa/pip#11865`에서 확인할 수 있습니다. 이 PR은 `direct_url.json`이 생성되지 않는 경우 `provenance_url.json` 메타데이터 파일을 제공하기 위해 `direct URL` 데이터 구조에 대한 기존 구현을 재사용합니다.

PDM에서 `provenance_url.json` 파일을 지원하기 위한 참조 구현은 `pdm-project/pdm#3013`에서 확인할 수 있습니다.

`pip-preserve`라는 프로토타입은 `direct_url.json` 및 `provenance_url.json` 메타데이터 파일을 고려하여 `requirements.txt` 파일을 생성하는 것을 시연하기 위해 개발되었습니다. 이 도구는 `pip freeze` 기능을 모방하지만, 설치된 패키지 목록에는 Python 배포 아티팩트의 해시도 포함됩니다.

이 제안을 더욱 지원하기 위해 `pip-sbom`은 SPDX 형식으로 SBOM을 생성하는 것을 시연합니다. 이 도구는 `provenance_url.json` 파일에 저장된 정보를 사용합니다.

## 거부된 아이디어 (Rejected Ideas)

### 파일 이름을 `provenance_url.json` 대신 `direct_url.json`으로 지정

"설치된 배포 패키지의 직접 URL 출처 기록(Recording the Direct URL Origin of installed distributions)"과의 하위 호환성을 유지하기 위해, 해당 사양의 내용에 따라 파일 이름을 `direct_url.json`으로 지정할 수 없습니다. 해당 사양은 다음과 같이 명시합니다:

> 이 파일은 다른 유형의 요구 사항(즉, 이름과 버전 지정자)에서 배포 패키지를 설치할 때는 생성되어서는 안 됩니다 (`MUST NOT`).

이러한 변경은 직접 URL 참조를 사용하여 배포 패키지가 설치될 때만 `direct_url.json`의 존재에 의존하는 `direct_url.json` 소비자에게 하위 호환성 문제를 야기할 수 있습니다.

### `direct_url.json`을 폐기하고 `provenance_url.json`만 사용

`direct_url.json` 파일은 Direct URL 데이터 구조 사양에 의해 이미 잘 확립되어 있으며 설치 프로그램에서 이미 사용되고 있습니다. 예를 들어, `pip`은 `pip freeze`에서 직접 URL 참조를 보고하기 위해 `direct_url.json`을 사용합니다. `direct_url.json`을 폐기하는 것은 `pip`의 `pip freeze` 구현에 추가적인 변경을 요구하며 (`fridex/pip#2` PR 참조), 이미 존재하는 `direct_url.json` 소비자에게 하위 호환성 문제를 야기할 수 있습니다.

### `archive_info` 딕셔너리에 `hash` 키 유지

Direct URL 데이터 구조 사양은 `archive_info` 딕셔너리에 `hashes` 키와 함께 `hash` 키를 포함할 가능성을 논의합니다. 이 PEP는 `provenance_url.json` 파일에 `hash` 키를 명시적으로 포함하지 않으며, `hashes` 키만 존재하도록 허용합니다. 이렇게 함으로써 파일의 가능한 중복, 혼동, 그리고 해시 동기화를 확인하기 위해 수행해야 할 추가 검사를 제거합니다.

### 해시를 명시하지 않는 경우 허용

`pip`의 캐시에서 휠 파일이 설치되고 이전 버전의 `pip`을 사용하여 빌드된 경우, `pip`은 다운로드된 소스 배포의 해시를 기록하지 않습니다. 이 다운로드된 소스 배포의 해시가 없기 때문에, `provenance_url.json` 파일의 `hashes` 키는 어떤 항목도 포함하지 않을 것입니다. 이러한 경우, 출처 정보가 완전하지 않으므로 `pip`은 `provenance_url.json` 파일을 생성하지 않습니다. 이러한 경우 소비자는 새 버전의 `pip`으로 휠을 다시 빌드하는 것이 권장됩니다.

`uv` 개발자들은 `provenance_url.json` 파일에 최소 하나의 해시를 요구하는 것에 대해 우려를 표명했습니다. `uv`는 명시적으로 요구되지 않는 한 배포 해시를 계산하지 않기 때문입니다. 그러나 최소 하나의 해시를 요구하는 것은 배포의 무결성 검사에 도움이 됩니다. 이는 잠금 파일(lock files)과 관련된 시나리오나 SBOM의 일부로 배포를 식별할 때 중요합니다. `provenance_url.json` 파일은 다운로드된 배포에 대한 최소 하나의 해시를 포함하도록 의무화합니다. 설치 과정의 일부로 배포의 해시를 계산하지 않는 설치 프로그램(예: 성능상의 이유)은 `provenance_url.json` 파일 생성을 생략할 수 있습니다.

### `hashes` 키를 선택 사항으로 만들기

PEP 610 및 해당 PyPA 표준 사양은 `direct_url.json` 파일에 `archive_info`의 `hashes` 키를 포함할 것을 권장하지만(RFC 2119 언어에 따라) 필수는 아닙니다:

> 해시 이름을 16진수로 인코딩된 파일 다이제스트에 매핑하는 딕셔너리로서 `hashes` 키가 존재해야 합니다 (`SHOULD`).

이 PEP는 `provenance_url.json` 파일이 생성되는 경우 `archive_info`에 `hashes` 키가 포함될 것을 요구합니다. 이 PEP에 따르면 다음과 같습니다:

> `archive_info`의 값은 단일 키 `hashes`를 가진 딕셔너리여야 합니다 (`MUST`).

이렇게 함으로써, `provenance_url.json` 소비자는 설치 프로그램에 의해 `provenance_url.json` 파일이 생성될 때 아티팩트 다이제스트를 확인할 수 있습니다.

### 인덱스 URL 저장

파일 내용의 일부로 인덱스 URL을 저장할 가능성이 제기되었습니다. 이 인덱스 URL은 `pip`의 구성에 구성되거나 `--index-url` 또는 `--extra-index-url` 옵션을 사용하여 지정된 인덱스를 나타낼 것입니다. 이 정보를 저장하는 것은 특히 `--find-links`와 같은 다른 설치 옵션을 사용할 때 혼란스럽다고 간주되었습니다. 실제 인덱스 URL이 휠 파일이 다운로드된 위치와 엄격하게 연결되어 있지 않으므로, `provenance_url.json` 파일에 인덱스 URL을 저장하지 않기로 결정했습니다.

## 미해결 문제 (Open Issues)

### Conda에서 `provenance_url.json` 파일의 가용성

Conda 관리자로부터 `provenance_url.json` 파일에 대한 피드백을 받고자 합니다. Conda가 `provenance_url.json` 파일을 채택할지 여부는 명확하지 않습니다. Conda는 이미 설치 중 동작에 따라 `conda-meta` 디렉터리에 있는 JSON 파일에 출처 관련 정보(이 PEP에서 제안된 출처 정보와 유사)를 저장하고 있습니다.

### 다운스트림 설치 프로그램에서 `provenance_url.json` 사용

제안된 `provenance_url.json` 파일은 주로 Python 설치 프로그램에 의해 채택되도록 의도되었습니다. APT 또는 DNF와 같은 다른 설치 프로그램은 설치된 다운스트림 Python 배포 패키지의 출처를 자체적인 방식으로 기록할 수 있습니다. 제안된 파일은 이러한 다운스트림 패키지 설치 프로그램에 의해 생성될 것으로 예상되지 않으므로, 의도적으로 이 PEP에서 제외되었습니다. 그러나 이러한 설치 프로그램의 개발자 또는 관리자의 모든 의견은 `provenance_url.json` 파일을 어떤 방식으로든 도움이 될 정보로 풍부하게 만드는 데 중요합니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.