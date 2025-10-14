---
title: "[Deferred] PEP 491 - The Wheel Binary Package Format 1.9"
excerpt: "Python Enhancement Proposal 491: 'The Wheel Binary Package Format 1.9'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/491/
toc: true
toc_sticky: true
date: 2025-09-26 22:36:44+0900
last_modified_at: 2025-09-26 22:36:44+0900
published: true
---
> **원문 링크:** [PEP 491 - The Wheel Binary Package Format 1.9](https://peps.python.org/pep-0491/)
>
> **상태:** Deferred | **유형:** Standards Track | **작성일:** 16-Apr-2015

PEP 491 – Wheel 바이너리 패키지 형식 1.9

## 초록 (Abstract)
이 PEP는 Python을 위한 빌드된 패키지 형식의 두 번째 버전인 "wheel"에 대해 설명합니다. Wheel은 Python에 특화된 재배치 가능한 패키지 형식으로, 매번 소스 코드에서 다시 빌드하는 것보다 더 빠르고 예측 가능하게 소프트웨어를 설치할 수 있도록 합니다.

Wheel은 특수하게 형식화된 파일 이름과 `.whl` 확장자를 가진 ZIP 형식의 아카이브입니다. 이는 PEP 376에 따라 특정 설치 스키마로 설치될 때와 거의 동일한 단일 배포본을 포함합니다. 간단한 wheel은 `sys.path`에 압축을 풀고 직접 사용할 수 있지만, 일반적으로 wheel은 특수화된 설치 프로그램을 통해 설치됩니다.

이 wheel 사양 버전은 여러 다른 디렉터리에 배포본을 설치하는 기능을 추가하고, 설치된 파일을 런타임에 찾을 수 있는 방법을 제공합니다.

## PEP 연기 (PEP Deferral)
이 PEP는 현재 활발하게 추진되고 있지 않으며, Python 패키징 개선은 추가 사용 사례를 포괄하도록 바이너리 아카이브 형식을 확장하는 것보다는 패키지 빌드 프로세스에 중점을 두고 있습니다.

향후 이 PEP에 대한 작업이 재개될 때 다루어질 특정 요소들은 다음과 같습니다.
*   공식 wheel 형식 정의를 `https://packaging.python.org/specifications/`로 마이그레이션 (PEP 566이 `https://packaging.python.org/specifications/core-metadata/`에 대해 수행한 것과 유사).
*   PEP 427에서 변경되지 않은 모든 정보를 반복할 필요 없이, 형식의 두 버전 간의 변경 사항 및 해당 변경 사항의 근거에 초점을 맞추도록 PEP 자체를 업데이트.
*   기존 설치 프로그램이 기존 설치 스키마 정의를 사용할 때 사양을 준수할 수 있도록 PEP가 의도적으로 작성되었음을 명확히 하고, 동시에 바이너리 아카이브 콘텐츠에 대한 더 풍부한 분류 스키마를 활용하는 새로운 설치 스키마 정의 생성을 허용함을 명확히 합니다.

## 배경 (Rationale)
Wheel 1.0은 `site-packages` 및 `distutils`에 의해 지정된 몇몇 다른 위치에 파일을 설치하는 데 가장 적합했지만, 사용자들은 단일 배포본의 파일을 여러 디렉터리에 설치하기를 원합니다. 예를 들어, 문서, 데이터, 코드에 대해 별도의 위치를 가질 수 있습니다. 안타깝게도 이러한 설치 위치가 루트 디렉터리에 대해 어디에 있어야 하는지에 대해서는 모두가 동의하지 않습니다. 이 형식 버전은 훨씬 더 많은 카테고리를 추가하며, 각 카테고리는 정책에 따라 다른 대상에 설치될 수 있습니다. 런타임에 설치된 파일을 찾는 것도 중요할 수 있으므로, 이 형식 버전은 설치된 소프트웨어에서 읽을 수 있는 방식으로 설치 경로를 기록하는 방법도 추가합니다.

## 세부 사항 (Details)

### Wheel 설치하기: 'distribution-1.0-py32-none-any.whl'

Wheel 설치는 개념적으로 두 단계로 구성됩니다.

1.  **압축 해제 (Unpack)**
    *   `distribution-1.0.dist-info/WHEEL`을 파싱합니다.
    *   설치 프로그램이 `Wheel-Version`과 호환되는지 확인합니다. 마이너 버전이 더 크면 경고하고, 메이저 버전이 더 크면 중단합니다.
    *   `Root-Is-Purelib == 'true'`이면 아카이브를 `purelib` (`site-packages`)에 압축 해제합니다.
    *   그렇지 않으면 아카이브를 `platlib` (`site-packages`)에 압축 해제합니다.

2.  **분산 (Spread)**
    *   압축 해제된 아카이브에는 `distribution-1.0.dist-info/` 및 (데이터가 있는 경우) `distribution-1.0.data/`가 포함됩니다.
    *   `distribution-1.0.data/`의 각 서브트리를 해당 대상 경로로 이동합니다. `distribution-1.0.data/`의 각 서브디렉터리는 `distribution-1.0.data/(purelib|platlib|headers|scripts|data)`와 같은 대상 디렉터리 딕셔너리의 키입니다.
    *   `#!python`으로 시작하는 스크립트를 올바른 인터프리터로 가리키도록 업데이트합니다. (참고: Python 스크립트는 일반적으로 패키지 메타데이터에 의해 처리되며 wheel에 그대로 포함되지 않습니다.)
    *   `distribution-1.0.dist.info/RECORD`를 설치된 경로로 업데이트합니다. 비어 있으면 `distribution-1.0.data` 디렉터리를 제거합니다.
    *   설치된 `.py` 파일을 `.pyc`로 컴파일합니다. (제거 프로그램은 `RECORD`에 언급되지 않더라도 `.pyc`를 제거할 수 있을 만큼 스마트해야 합니다.)

실제로 설치 프로그램은 일반적으로 임시 `distribution-1.0.data/` 디렉터리를 작성하지 않고 아카이브에서 대상 위치로 파일을 직접 추출합니다.

#### 권장 설치 프로그램 기능 (Recommended installer features)

*   `#!python` 재작성: `wheel`에서는 스크립트가 `{distribution}-{version}.data/scripts/`에 그대로 패키징됩니다. `scripts/`에 있는 파일의 첫 번째 줄이 정확히 `b'#!python'`으로 시작하는 경우, 올바른 인터프리터를 가리키도록 재작성합니다. 아카이브가 Windows에서 생성된 경우 Unix 설치 프로그램은 이러한 파일에 `+x` 비트를 추가해야 할 수 있습니다. `b'#!pythonw'` 규칙도 허용됩니다. `b'#!pythonw'`는 콘솔 스크립트 대신 GUI 스크립트를 나타냅니다.
*   스크립트 래퍼 생성: Python 스크립트는 패키지 메타데이터에서 `module:callable` 문자열로 더 일반적으로 표현되며, `wheel` 아카이브의 `scripts` 디렉터리에 그대로 포함되지 않습니다. 이러한 종류의 스크립트는 설치 프로그램에 플랫폼별 래퍼를 생성할 기회를 제공합니다.

#### 권장 아카이버 기능 (Recommended archiver features)

*   `.dist-info`를 아카이브의 끝에 배치: 아카이버는 `.dist-info` 파일을 물리적으로 아카이브의 끝에 배치하는 것이 좋습니다. 이를 통해 전체 아카이브를 다시 작성하지 않고도 메타데이터를 수정할 수 있는 몇 가지 흥미로운 ZIP 트릭이 가능해집니다.

### 파일 형식 (File Format)

#### 파일명 규칙 (File name convention)

`wheel` 파일명은 `{distribution}-{version}(-{build tag})?-{python tag}-{abi tag}-{platform tag}.whl` 형식입니다.

*   `distribution`: 배포본 이름 (예: 'django', 'pyramid').
*   `version`: 배포본 버전 (예: 1.0).
*   `build tag`: 선택적 빌드 번호. 숫자로 시작해야 합니다. 두 `wheel`이 동일한 버전을 가질 때 순서를 결정하는 요소입니다. 지정되지 않으면 빈 문자열로 정렬하고, 그렇지 않으면 초기 숫자를 숫자로 정렬하고 나머지는 사전순으로 정렬합니다.
*   `python tag`: 언어 구현 및 버전 태그 (예: 'py27', 'py2', 'py3').
*   `abi tag`: ABI 태그 (예: 'cp33m', 'abi3', 'none').
*   `platform tag`: 플랫폼 태그 (예: 'linux_x86_64', 'any').

예를 들어, `distribution-1.0-1-py27-none-any.whl`은 'distribution'이라는 패키지의 첫 번째 빌드이며, Python 2.7 (모든 Python 2.7 구현), ABI 없음 (순수 Python), 모든 CPU 아키텍처와 호환됩니다.

확장자 앞의 마지막 세 구성 요소는 "호환성 태그 (compatibility tags)"라고 합니다. 호환성 태그는 패키지의 기본 인터프리터 요구 사항을 나타내며 PEP 425에 자세히 설명되어 있습니다.

#### 이스케이프 및 유니코드 (Escaping and Unicode)

파일명의 각 구성 요소는 영숫자가 아닌 문자열을 밑줄 `_`로 대체하여 이스케이프됩니다:

```python
re.sub("[^\w\d.]+", "_", distribution, re.UNICODE)
```
아카이브 파일명은 유니코드입니다. 패키징 도구는 ASCII 패키지 이름만 지원할 수 있지만, 유니코드 파일명은 이 사양에서 지원됩니다.

아카이브 내부의 파일명은 UTF-8로 인코딩됩니다. 일반적으로 사용되는 일부 ZIP 클라이언트가 UTF-8 파일명을 제대로 표시하지 못하더라도, 이 인코딩은 ZIP 사양과 Python의 `zipfile` 모두에서 지원됩니다.

#### 파일 내용 (File contents)

`wheel` 파일의 내용은 다음과 같습니다 (여기서 `{distribution}`은 패키지 이름, 예: `beaglevote`로, `{version}`은 해당 버전, 예: `1.0.0`으로 대체됩니다).

*   `/`: 아카이브의 루트이며, `WHEEL`에 지정된 대로 `purelib` 또는 `platlib`에 설치될 모든 파일을 포함합니다. `purelib` 및 `platlib`은 일반적으로 모두 `site-packages`를 의미합니다.
*   `{distribution}-{version}.dist-info/`: 메타데이터를 포함합니다.
*   `{distribution}-{version}.data/`: 이미 다루지 않은 비어 있지 않은 설치 스키마 키마다 하나의 하위 디렉터리를 포함하며, 이 하위 디렉터리 이름은 설치 경로 딕셔너리의 인덱스입니다 (예: `data`, `scripts`, `include`, `purelib`, `platlib`). Python 스크립트는 `scripts`에 나타나야 하며 설치 시 스크립트 래퍼 생성 및 `#!python` 재작성을 활용하려면 정확히 `b'#!python'`으로 시작해야 합니다. 확장자가 있거나 없을 수 있습니다.
*   `{distribution}-{version}.dist-info/METADATA`: 메타데이터 버전 1.1 이상의 형식 메타데이터입니다.
*   `{distribution}-{version}.dist-info/WHEEL`: 아카이브 자체에 대한 메타데이터이며, `key: value` 형식입니다:

    ```
    Wheel-Version: 1.9
    Generator: bdist_wheel 1.9
    Root-Is-Purelib: true
    Tag: py2-none-any
    Tag: py3-none-any
    Build: 1
    Install-Paths-To: wheel/_paths.py
    Install-Paths-To: wheel/_paths.json
    ```

    *   `Wheel-Version`: Wheel 사양의 버전 번호입니다.
    *   `Generator`: 아카이브를 생성한 소프트웨어의 이름 및 선택적으로 버전입니다.
    *   `Root-Is-Purelib`: 아카이브의 최상위 디렉터리가 `purelib`에 설치되어야 하면 `true`이고, 그렇지 않으면 `platlib`에 설치되어야 합니다.
    *   `Tag`: `wheel`의 확장된 호환성 태그입니다. 이 예시에서 파일명은 `py2.py3-none-any`를 포함할 것입니다.
    *   `Build`: 빌드 번호이며, 빌드 번호가 없으면 생략됩니다.
    *   `Install-Paths-To`: 설치 스키마의 각 카테고리의 설치 시 경로로 덮어씌워질 아카이브에 상대적인 위치입니다. 설치 경로 섹션을 참조하세요. 0번 이상 나타날 수 있습니다.

`wheel` 설치 프로그램은 `Wheel-Version`이 지원하는 버전보다 크면 경고해야 하며, `Wheel-Version`의 메이저 버전이 지원하는 버전보다 크면 실패해야 합니다.
`wheel`은 여러 Python 버전에서 작동하도록 의도된 설치 형식이므로 일반적으로 `.pyc` 파일을 포함하지 않습니다. `wheel`은 `setup.py` 또는 `setup.cfg`를 포함하지 않습니다.

#### `.dist-info` 디렉터리 (The .dist-info directory)

`Wheel .dist-info` 디렉터리에는 최소한 `METADATA`, `WHEEL`, `RECORD`가 포함됩니다.
*   `METADATA`: 패키지 메타데이터로, `sdist`의 루트에서 발견되는 `PKG-INFO`와 동일한 형식입니다.
*   `WHEEL`: 패키지 빌드에 특정한 `wheel` 메타데이터입니다.
*   `RECORD`: `wheel`의 (거의) 모든 파일과 해당 보안 해시 목록입니다. PEP 376과 달리, 자체 해시를 포함할 수 없는 `RECORD`를 제외한 모든 파일은 해당 해시를 포함해야 합니다. 해시 알고리즘은 `sha256` 이상이어야 합니다. 특히 `md5` 및 `sha1`은 허용되지 않습니다. 서명된 `wheel` 파일은 아카이브의 무결성을 검증하기 위해 `RECORD`의 강력한 해시에 의존하기 때문입니다.
*   PEP 376의 `INSTALLER` 및 `REQUESTED`는 아카이브에 포함되지 않습니다.
*   `RECORD.jws`는 디지털 서명에 사용됩니다. `RECORD`에 언급되지 않습니다.
*   `RECORD.p7s`는 `wheel` 파일을 보호하기 위해 S/MIME 서명을 사용하려는 사람들을 위한 편의로 허용됩니다. `RECORD`에 언급되지 않습니다.

추출하는 동안 `wheel` 설치 프로그램은 `RECORD`의 모든 해시를 파일 내용과 비교하여 확인합니다. `RECORD` 및 해당 서명을 제외하고, 아카이브의 어떤 파일이라도 `RECORD`에 언급되지 않거나 올바르게 해시되지 않으면 설치가 실패합니다.

#### `.data` 디렉터리 (The .data directory)

일반적으로 `site-packages` 내부에 설치되지 않는 모든 파일은 `.data` 디렉터리에 들어갑니다. 이 디렉터리는 `.dist-info` 디렉터리와 동일하게 이름이 지정되지만 `.data/` 확장자를 가집니다.

```
distribution-1.0.dist-info/
distribution-1.0.data/
```

`.data` 디렉터리에는 배포본의 스크립트, 헤더, 문서 등을 포함하는 하위 디렉터리가 있습니다. 설치하는 동안 이 하위 디렉터리의 내용은 대상 경로로 이동됩니다.

하위 디렉터리가 설치 스키마에서 발견되지 않으면 설치 프로그램은 경고를 발행해야 하며, 표준 압축 해제 도구로 패키지가 압축 해제된 것처럼 `distribution-1.0.data/...`에 설치되어야 합니다.

#### 설치 경로 (Install paths)

`distutils` 설치 경로 외에도 `wheel`은 이제 GNU autotools 기반의 나열된 카테고리를 포함합니다. 이 확장된 스키마는 설치 프로그램이 시스템 정책을 구현하는 데 도움이 될 것이지만, 설치 프로그램은 각 카테고리를 어떤 위치에도 루트할 수 있습니다.

UNIX 설치 스키마는 카테고리를 해당 설치 경로에 다음과 같이 매핑할 수 있습니다.

```python
{
 'bindir': '$eprefix/bin',
 'sbindir': '$eprefix/sbin',
 'libexecdir': '$eprefix/libexec',
 'sysconfdir': '$prefix/etc',
 'sharedstatedir': '$prefix/com',
 'localstatedir': '$prefix/var',
 'libdir': '$eprefix/lib',
 'static_libdir': r'$prefix/lib',
 'includedir': '$prefix/include',
 'datarootdir': '$prefix/share',
 'datadir': '$datarootdir',
 'mandir': '$datarootdir/man',
 'infodir': '$datarootdir/info',
 'localedir': '$datarootdir/locale',
 'docdir': '$datarootdir/doc/$dist_name',
 'htmldir': '$docdir',
 'dvidir': '$docdir',
 'psdir': '$docdir',
 'pdfdir': '$docdir',
 'pkgdatadir': '$datadir/$dist_name'
}
```

패키지가 런타임에 파일을 찾아야 하는 경우, 설치 프로그램이 지정된 파일에 작성하고 아카이브 자체 내부에 해당 파일을 아카이브 내의 위치에 상대적으로 포함하도록 요청할 수 있습니다 (따라서 `wheel`은 표준 압축 해제 도구로 압축 해제하거나 전혀 압축 해제하지 않아도 올바르게 설치됩니다).

`WHEEL` 메타데이터에 다음 필드가 포함된 경우:

```
Install-Paths-To: wheel/_paths.py
Install-Paths-To: wheel/_paths.json
```

`wheel` 설치 프로그램은 아카이브에서 `wheel/_paths.py`를 압축 해제하려 할 때, 이를 설치 시 사용된 실제 경로로 대체합니다. 경로는 생성된 파일에 대해 절대적이거나 상대적일 수 있습니다.

파일 이름이 `.py`로 끝나면 Python 스크립트가 작성됩니다. 경로는 스크립트를 실행하여 얻어야 하지만, 아마도 다음과 같을 것입니다:

```python
data='../wheel-0.26.0.dev1.data/data'
headers='../wheel-0.26.0.dev1.data/headers'
platlib='../wheel-0.26.0.dev1.data/platlib'
purelib='../wheel-0.26.0.dev1.data/purelib'
scripts='../wheel-0.26.0.dev1.data/scripts'
# ...
```

파일 이름이 `.json`으로 끝나면 JSON 문서가 작성됩니다:

```json
{
  "data": "../wheel-0.26.0.dev1.data/data",
  ...
}
```

특정 `wheel`에서 실제로 사용되는 카테고리만 이 파일에 작성되어야 합니다.

이 파일들은 패키징 라이브러리에 대한 의존성을 도입하지 않고도 설치된 패키지에서 찾을 수 있는 위치에 작성되도록 설계되었습니다.

### 서명된 Wheel 파일 (Signed wheel files)

`Wheel` 파일에는 디지털 서명을 가능하게 하는 확장된 `RECORD`가 포함됩니다. PEP 376의 `RECORD`는 `md5sum` 대신 두 번째 열에 보안 해시 `digestname=urlsafe_b64encode_nopad(digest)` (후행 `=` 문자가 없는 URL 안전 base64 인코딩)를 포함하도록 변경됩니다. `RECORD` 자체의 해시를 포함할 수 없는 `RECORD`를 제외하고 `.pyc` 파일과 같이 생성된 파일을 포함하여 모든 가능한 항목이 해시됩니다. 예를 들어:

```
file.py,sha256=AVTFPZpEKzuHr7OvQZmhaU3LvwKz06AJw8mT\_pNh2yI,3144
distribution-1.0.dist-info/RECORD,,
```

서명 파일 `RECORD.jws` 및 `RECORD.p7s`는 `RECORD`가 생성된 후에만 추가될 수 있으므로 `RECORD`에 전혀 언급되지 않습니다. 아카이브의 다른 모든 파일은 `RECORD`에 올바른 해시를 가져야 하며, 그렇지 않으면 설치가 실패합니다.

JSON 웹 서명이 사용되는 경우, 하나 이상의 JSON Web Signature JSON Serialization (JWS-JS) 서명이 `RECORD` 옆의 `RECORD.jws` 파일에 저장됩니다. JWS는 `RECORD`의 SHA-256 해시를 서명의 JSON 페이로드로 포함하여 `RECORD`에 서명하는 데 사용됩니다.

```json
{
  "hash": "sha256=ADD-r2urObZHcxBW3Cr-vDCu5RJwT4CaRTHiFmbcIYY"
}
```

(해시 값은 `RECORD`에서 사용되는 것과 동일한 형식입니다.)

`RECORD.p7s`가 사용되는 경우, `RECORD`의 분리된 S/MIME 형식 서명을 포함해야 합니다.

`wheel` 설치 프로그램은 디지털 서명을 이해할 필요는 없지만, `RECORD`의 해시를 추출된 파일 내용과 **반드시** 확인해야 합니다. 설치 프로그램이 파일 해시를 `RECORD`와 비교할 때, 별도의 서명 검사기는 `RECORD`가 서명과 일치하는지 확인하기만 하면 됩니다.

참조:
*   RFC 7515 `https://datatracker.ietf.org/doc/html/draft-jones-jose-jws-json-serialization.html`
*   RFC 7517 `https://datatracker.ietf.org/doc/html/draft-jones-jose-json-private-key.html`

### .egg 파일과의 비교 (Comparison to .egg)

*   `wheel`은 설치 형식이며, `egg`는 가져오기 가능합니다.
*   `wheel` 아카이브는 `.pyc`를 포함할 필요가 없으며 특정 Python 버전이나 구현에 덜 종속됩니다.
*   `wheel`은 이전 버전의 Python으로 빌드된 (순수 Python) 패키지를 설치할 수 있으므로 항상 패키지 작성자가 따라잡을 때까지 기다릴 필요가 없습니다.
*   `wheel`은 `.dist-info` 디렉터리를 사용하고, `egg`는 `.egg-info`를 사용합니다.
*   `wheel`은 새로운 Python 패키징 세계와 그것이 가져오는 새로운 개념과 호환됩니다.
*   `wheel`은 오늘날의 다중 구현 세계를 위한 더 풍부한 파일명 규칙을 가집니다. 단일 `wheel` 아카이브는 여러 Python 언어 버전 및 구현, ABI, 시스템 아키텍처와의 호환성을 나타낼 수 있습니다.
*   역사적으로 ABI는 특정 CPython 릴리스에 고유했지만, `wheel`은 안정적인 ABI를 위해 준비되어 있습니다.
*   `wheel`은 무손실(lossless)입니다. 첫 번째 `wheel` 구현인 `bdist_wheel`은 항상 `egg-info`를 생성한 다음 이를 `.whl`로 변환합니다. 기존 `egg` 및 `bdist_wininst` 배포본도 변환할 수 있습니다.
*   `wheel`은 버전 관리됩니다. 모든 `wheel` 파일에는 `wheel` 사양의 버전과 이를 패키징한 구현이 포함됩니다. 다음 마이그레이션은 단순히 `Wheel 2.0`으로 진행될 수 있기를 바랍니다.
*   `wheel`은 다른 Python에 대한 참조입니다.

## FAQ (자주 묻는 질문)

### Wheel은 `.data` 디렉터리를 정의합니다. 모든 데이터를 거기에 넣어야 하나요?

이 사양은 코드 구성 방법에 대한 의견을 가지고 있지 않습니다. `.data` 디렉터리는 일반적으로 `site-packages` 또는 `PYTHONPATH` 내부에 설치되지 않는 모든 파일을 위한 장소일 뿐입니다. 다시 말해, 해당 파일이 일반적으로 `wheel`의 `.data` 디렉터리에 배포되지 않더라도 `pkgutil.get_data(package, resource)`를 계속 사용할 수 있습니다.

### Wheel은 왜 첨부된 서명을 포함합니까?

첨부된 서명은 아카이브와 함께 이동하므로 분리된 서명보다 더 편리합니다. 개별 파일만 서명되므로 아카이브를 다시 압축해도 서명이 무효화되지 않으며, 전체 아카이브를 다운로드할 필요 없이 개별 파일을 확인할 수 있습니다.

### Wheel은 왜 JWS 서명을 허용합니까?

JWS가 일부인 JOSE 사양은 구현하기 쉽도록 설계되었으며, 이 기능은 `wheel`의 주요 설계 목표 중 하나입니다. JWS는 유용하고 간결한 순수 Python 구현을 제공합니다.

### Wheel은 왜 S/MIME 서명도 허용합니까?

S/MIME 서명은 기존 공개 키 인프라를 `wheel`과 함께 사용해야 하거나 사용하고 싶은 사용자를 위해 허용됩니다.

서명된 패키지는 보안 패키지 업데이트 시스템의 기본적인 구성 요소일 뿐입니다. `wheel`은 이 구성 요소만 제공합니다.

### "purelib"와 "platlib"의 차이점은 무엇입니까?

`wheel`은 일부 플랫폼에서 중요한 "purelib"와 "platlib"의 구분을 유지합니다. 예를 들어, Fedora는 순수 Python 패키지를 `/usr/lib/pythonX.Y/site-packages`에 설치하고 플랫폼 종속 패키지를 `/usr/lib64/pythonX.Y/site-packages`에 설치합니다.

`Root-Is-Purelib: false`인 `wheel`과 모든 파일이 `{name}-{version}.data/purelib`에 있는 것은 `Root-Is-Purelib: true`인 `wheel`과 동일한 파일을 루트에 가지고 있는 것과 같으며, "purelib" 및 "platlib" 카테고리 모두에 파일이 있는 것이 허용됩니다.

실제로 `wheel`은 순수 Python인지 아닌지에 따라 "purelib" 또는 "platlib" 중 하나만 가져야 하며, 해당 파일은 루트에 있어야 하고 "Root-is-purelib"에 적절한 설정이 주어져야 합니다.

### Wheel 파일에서 Python 코드를 직접 가져올 수 있습니까?

기술적으로는 간단한 추출을 통한 설치 지원과 `zipimport`와 호환되는 아카이브 형식 사용의 조합으로 인해, `wheel` 파일의 일부 하위 집합은 `sys.path`에 직접 배치되는 것을 지원합니다. 그러나 이 동작은 형식 설계의 자연스러운 결과이지만, 실제로 이에 의존하는 것은 일반적으로 권장되지 않습니다.

첫째, `wheel`은 주로 배포 형식으로 설계되었으므로, 설치 단계를 건너뛰는 것은 또한 완전한 설치를 가정하는 기능에 대한 의존성을 의도적으로 피하는 것을 의미합니다 (예: `pip` 및 `virtualenv`와 같은 표준 도구를 사용하여 종속성을 감사 및 보안 업데이트 목적으로 적절하게 추적하고 관리하거나, C 확장 기능을 위한 표준 빌드 메커니즘과 헤더 파일을 적절한 위치에 게시하여 완벽하게 통합하는 것).

둘째, 일부 Python 소프트웨어는 ZIP 아카이브에서 직접 실행하는 것을 지원하도록 작성되었지만, 코드가 완전히 설치되었다고 가정하고 작성되는 경우가 여전히 일반적입니다. ZIP 아카이브에서 소프트웨어를 실행하려고 하여 이러한 가정이 깨지면, 오류는 종종 모호하고 진단하기 어려울 수 있습니다 (특히 타사 라이브러리에서 발생하는 경우). 이 문제의 가장 일반적인 두 가지 원인은 CPython이 ZIP 아카이브에서 C 확장을 가져오는 것을 지원하지 않는다는 사실과 (어떤 플랫폼에서도 동적 로딩 메커니즘에서 직접 지원되지 않으므로) ZIP 아카이브에서 실행할 때 `__file__` 속성이 더 이상 일반 파일 시스템 경로를 참조하지 않고, 파일 시스템의 ZIP 아카이브 위치와 아카이브 내부 모듈의 상대 경로를 모두 포함하는 조합 경로를 참조한다는 것입니다. 소프트웨어가 내부적으로 추상 리소스 API를 올바르게 사용하더라도 외부 구성 요소와 인터페이스하려면 실제 디스크상의 파일 가용성이 필요할 수 있습니다.

메타클래스, 몽키 패치, 메타경로 가져오기처럼, 이 기능을 활용해야 할지 확신이 서지 않는다면 거의 확실히 필요하지 않습니다. 어쨌든 사용하기로 결정했다면, 많은 프로젝트에서 진정한 버그로 받아들이기 전에 완전히 설치된 패키지로 실패를 재현해야 한다는 점을 인지하십시오.

## 부록 (Appendix)

`urlsafe-base64-nopad` 구현 예시:

```python
# urlsafe-base64-nopad for Python 3
import base64

def urlsafe_b64encode_nopad(data):
    return base64.urlsafe_b64encode(data).rstrip(b'=')

def urlsafe_b64decode_nopad(data):
    pad = b'=' * (4 - (len(data) & 3))
    return base64.urlsafe_b64decode(data + pad)
```

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.