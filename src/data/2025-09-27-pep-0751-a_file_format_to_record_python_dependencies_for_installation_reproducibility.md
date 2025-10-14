---
title: "[Final] PEP 751 - A file format to record Python dependencies for installation reproducibility"
excerpt: "Python Enhancement Proposal 751: 'A file format to record Python dependencies for installation reproducibility'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/751/
toc: true
toc_sticky: true
date: 2025-09-27 13:40:01+0900
last_modified_at: 2025-09-27 13:40:01+0900
published: true
---
> **원문 링크:** [PEP 751 - A file format to record Python dependencies for installation reproducibility](https://peps.python.org/pep-0751/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 24-Jul-2024



# PEP 751 – 설치 재현성을 위한 Python 종속성 기록 파일 형식

## 요약 (Abstract)
이 PEP는 Python 환경에서 재현 가능한(reproducible) 설치를 가능하게 하는 새로운 종속성 명세 파일 형식을 제안합니다. 이 형식은 사람이 읽을 수 있고(human-readable), 기계적으로 생성될 수 있도록 설계되었습니다. 이 파일을 사용하는 설치 도구는 설치 시점에 종속성 해결(dependency resolution) 과정 없이 무엇을 설치해야 할지 계산할 수 있어야 합니다.

## 동기 (Motivation)
현재 Python 생태계에는 가상 환경에 어떤 직접 및 간접 종속성을 설치해야 하는지 명시하는 `lock file`과 같은 불변(immutable) 레코드를 생성하기 위한 표준이 존재하지 않습니다.

커뮤니티 내에 PDM, `pip freeze`, pip-tools, Poetry, uv와 같이 이 문제를 해결하기 위한 최소 다섯 가지의 잘 알려진 솔루션이 있다는 점을 고려할 때, `lock file`에 대한 전반적인 수요가 분명히 존재합니다.

이러한 도구들은 지원하는 `locking` 시나리오에서도 차이가 있습니다. 예를 들어, `pip freeze`와 `pip-tools`는 현재 환경에 대한 일회성 `lock file`만 생성하는 반면, PDM, Poetry, uv는 여러 환경과 사용 사례를 동시에 `lock`할 수 있습니다. 또한, 일부 도구(예: 파일 해시 포함 여부)의 공급망 공격(supply chain attacks)에 대한 보안 기본값 부족에 대한 우려도 있습니다.

표준의 부재는 몇 가지 단점을 야기합니다. `lock file`과 연동하려는 모든 도구는 어떤 형식을 지원할지 선택해야 하므로, 잠재적으로 사용자 지원이 어려워질 수 있습니다 (예: Dependabot이나 클라우드 제공업체가 특정 도구만 지원). 이는 도구 간의 이식성(portability)에도 영향을 미쳐 벤더 종속(vendor lock-in)을 초래합니다. 호환성과 상호 운용성이 부족하면 `lock file`을 둘러싼 도구들이 분열되어 사용자 및 도구 모두 어떤 `lock file` 형식을 사용할지 미리 선택해야 하므로, 다른 형식으로의 전환 비용이 발생합니다 (예: `lock file` 감사(auditing) 관련 도구). 단일 형식으로의 통합은 이러한 비용과 장벽을 제거합니다.

커뮤니티에서 표준에 가장 가까운 것은 `pip`의 `requirements file`이며, 앞서 언급된 모든 도구는 이를 직접 파일 형식으로 사용하거나 내보냅니다 (`requirements.txt` 등). 그러나 이 형식은 표준이 아니라 관례적으로 지원됩니다. 또한 `pip`의 요구 사항에 맞춰 설계되어 유연성과 사용 편의성이 제한됩니다 (예: 맞춤형 파일 형식). 마지막으로, 기본적으로 보안이 취약합니다 (예: 파일 해시 지원은 완전히 `opt-in` 기능이며, `requirements file`에 없는 다른 종속성을 찾지 않도록 `pip`에 명시적으로 지시해야 합니다).

**참고:** PEP 665의 많은 동기가 이 PEP에도 적용됩니다.

## 근거 (Rationale)
이 PEP가 제안하는 파일 형식은 사람이 읽을 수 있도록(human-readable) 설계되었습니다. 이는 `lock file`에 원치 않는 종속성이 포함되지 않았는지 사람이 내용을 감사할 수 있도록 하기 위함입니다.

또한 이 파일 형식은 설치 시점에 `resolver`가 필요하지 않도록 설계되었습니다. 이는 `lock file`을 소비할 때 무엇이 설치될지 추론하는 것을 크게 단순화합니다. 또한 `lock file` 생성보다 훨씬 더 자주 발생하는 설치를 더 빠르게 수행할 수 있게 합니다.

파일의 데이터는 Python으로 작성되지 않은 도구에서도 사용할 수 있어야 합니다. 예를 들어, 클라우드 호스팅 제공업체가 선호하는 프로그래밍 언어로 자체 설치 도구를 작성할 수 있게 합니다. 이는 `lock file`을 작성하는 `lockers`와 `lock file`에서 설치하는 `installers`라는 개념을 도입합니다 (두 역할은 동일한 도구일 수 있습니다).

이 파일 형식은 좋은 보안 기본값(security defaults)을 장려해야 합니다. 이 형식은 사람이 직접 작성하도록 의도된 것이 아니므로, 도구가 보안 관련 세부 정보를 제공하는 것이 합리적이며 큰 부담이 되지 않습니다.

`lock file`의 내용은 `requirements file`이 `lock file`로 사용될 때 (예: `pip-tools` 및 `pip freeze`가 생성하는 결과물) 대다수의 용도를 대체할 수 있어야 합니다. 이는 이 PEP에 명시된 파일 형식이 자체 내부 `lock file` 형식을 가진 도구의 최소한 `export target` 역할을 할 수 있음을 의미합니다.

`lock file`은 `single-use` 및 `multi-use`일 수 있습니다. `single-use lock file`은 `requirements.txt` 파일과 같이 단일 사용 사례/목적을 제공하는 파일입니다 (프로젝트에 여러 `requirements file`이 있는 것이 드물지 않은 이유). `multi-use lock file`은 종종 `extras` 및 `Dependency Groups`를 통해 단일 파일 내에서 여러 사용 사례를 나타냅니다. 이 PEP는 `extras` 및 `dependency groups`를 적절하게 지정할 수 있도록 `Environment Markers`에 대한 추가 기능을 지원합니다. 이는 단일 `lock file`이 이러한 경우를 지원할 수 있게 합니다. 이는 잠재적인 `lock file` 수를 줄일 뿐만 아니라, 단일 패키지가 모든 사용 사례에서 일관되어야 할 때 더 쉽게 만듭니다 (여러 `single-use lock file`의 경우 여러 `lock file` 간의 조정을 필요로 합니다). 이 지원은 이 PEP가 `pyproject.toml` 파일에 기록될 수 있는 모든 패키지 설치 관련 데이터를 지원한다는 것을 의미합니다. 이 지원을 통해 일부 도구가 내부 `lock file`을 완전히 삭제하고 이 PEP가 명시하는 내용에만 의존할 수 있기를 바랍니다.

## 명세 (Specification)

### 파일 이름 (File Name)
`lock file`은 `pylock.toml`로 이름 지어져야 하며, 특정 이름을 원하거나 여러 `lock file`이 존재하는 경우 정규 표현식 `r"^pylock\.([^.]+)\.toml$"`과 일치해야 합니다. `.toml` 파일 확장자를 사용하는 것은 편집기에서 구문 강조(syntax highlighting)를 쉽게 하고 파일 형식이 사람이 읽을 수 있도록 설계되었음을 강조하기 위함입니다.

`lock file`은 `lock file`의 범위에 따라 적절한 디렉토리에 위치해야 합니다. 예를 들어, 단일 `pyproject.toml`에 대한 `locking`은 `pylock.toml`을 동일한 디렉토리에 배치합니다.

### 파일 형식 (File Format)
파일 형식은 **TOML**입니다.

도구는 `diff` 출력의 노이즈를 최소화하기 위해 일관된 방식으로 `lock file`을 작성해야 합니다. 테이블의 키는 일관된 순서로 기록되어야 하며, 배열도 일관된 순서로 정렬되어야 합니다.

주요 최상위 키들은 다음과 같습니다:

*   **`lock-version`**: (필수) 파일 형식 버전. 현재 `1.0`.
*   **`environments`**: (선택) `lock file`이 호환되는 `Environment Markers` 목록.
*   **`requires-python`**: (선택) `lock file`이 지원하는 최소 Python 버전.
*   **`extras`**: (선택) 이 `lock file`이 지원하는 `extras` 목록.
*   **`dependency-groups`**: (선택) 이 `lock file`이 공개적으로 지원하는 `Dependency Groups` 목록.
*   **`default-groups`**: (선택) 기본적으로 설치되어야 할 합성 `dependency group`의 이름.
*   **`created-by`**: (필수) `lock file`을 생성한 도구의 이름.
*   **`[[packages]]`**: (필수) 설치될 수 있는 모든 패키지를 포함하는 테이블 배열.
    *   **`packages.name`**: (필수) 정규화된 패키지 이름.
    *   **`packages.version`**: (선택) 패키지 버전. `sdist` 또는 `wheel`이 지정될 때 기록되어야 합니다.
    *   **`packages.marker`**: (선택) 패키지가 설치되어야 할 시점을 지정하는 `environment marker`.
    *   **`packages.requires-python`**: (선택) 패키지의 Python 버전 호환성을 위한 `Version specifier`.
    *   **`[[packages.dependencies]]`**: (선택) 이 패키지의 직접적인 종속성인 다른 `[[packages]]` 항목을 기록. 감사 목적으로만 사용되며, 설치 시에는 사용되지 않습니다.
    *   **`[packages.vcs]`**: (선택, 다른 소스 필드와 상호 배타적) 버전 관리 시스템 (VCS) 소스 트리의 세부 정보.
    *   **`[packages.directory]`**: (선택, 다른 소스 필드와 상호 배타적) 로컬 디렉토리 소스 트리의 세부 정보.
    *   **`[packages.archive]`**: (선택, 다른 소스 필드와 상호 배타적) 아카이브 파일 (`wheel`, `sdist` 포함)에 대한 직접 참조.
        *   **`packages.archive.hashes`**: (필수) 파일의 알려진 해시 값. 최소 하나의 해시 알고리즘 (`sha256` 권장)을 포함해야 합니다.
    *   **`packages.index`**: (선택) `sdist` 및/또는 `wheel`이 발견된 패키지 인덱스의 기본 URL.
    *   **`[packages.sdist]`**: (선택, 다른 소스 필드와 상호 배타적) 소스 배포판(Source distribution) 파일 세부 정보.
    *   **`[[packages.wheels]]`**: (선택) 바이너리 배포판(Binary distribution) `wheel` 파일 세부 정보.
    *   **`[[packages.attestation-identities]]`**: (선택) 이 패키지에 기록된 모든 파일에 대한 증명(attestation) 기록.
    *   **`[packages.tool]`**: (선택) 패키지 버전 수준의 도구 특정 데이터. 설치에 영향을 주지 않아야 합니다.
*   **`[tool]`**: (선택) `lock file` 수준의 도구 특정 데이터. 설치에 영향을 주지 않아야 합니다.

### 마커 표현식 구문 추가 (Additions to marker expression syntax)
이 PEP는 `Environment Markers` 명세에 `extras` 및 `dependency_groups` 마커를 추가하여 `packages.marker` 내에서 `extras` 및 `dependency group` 관계를 표현할 수 있도록 제안합니다. 이러한 추가 기능은 이 PEP에 정의된 `lock file` 컨텍스트 내에서만 적용됩니다.

새로운 마커 `extras`와 `dependency_groups`가 도입됩니다.
마커 명세는 값에 `set`을 허용하도록 변경됩니다 (기존 `string` 및 `version` 지원에 더하여).
마커 표현식 구문은 `set`과 관련된 연산을 허용하도록 업데이트됩니다.

### 예시 (Example)
PEP 0751 문서에는 `pylock.toml` 파일의 예시가 포함되어 있습니다. 이 예시는 `lock-version`, `environments`, `requires-python`, `created-by`와 같은 최상위 키와 `attrs`, `cattrs`, `numpy`와 같은 패키지에 대한 자세한 정보(`name`, `version`, `requires-python`, `wheels` 및 해시 등)를 보여줍니다. 또한 `[tool]` 섹션을 통해 `mousebender`라는 도구가 `lock file`을 생성하는 데 사용된 명령어를 기록하는 방법을 보여줍니다.

### 설치 (Installation)
`lock file`로부터 설치하는 과정은 다음과 같은 단계를 포함합니다 (단계 및 순서는 제안사항이며, 요구사항은 지침적입니다):

1.  설치할 `extras` 및 `dependency groups`를 수집하고 마커 평가를 위해 각각 `extras` 및 `dependency_groups`를 설정합니다. 기본적으로 `extras`는 빈 `set`, `dependency_groups`는 `default-groups`에서 생성된 `set`으로 설정됩니다.
2.  `lock-version`으로 지정된 메타데이터 버전이 지원되는지 확인합니다.
3.  `requires-python`이 지정된 경우, 설치 환경이 요구 사항을 충족하는지 확인합니다.
4.  `environments`가 지정된 경우, 최소 하나 이상의 환경 마커 표현식이 충족되는지 확인합니다.
5.  `[[packages]]`에 나열된 각 패키지에 대해:
    *   `marker`가 지정된 경우, 충족되는지 확인합니다.
    *   `requires-python`이 지정된 경우, 충족되는지 확인합니다.
    *   패키지의 다른 충돌하는 인스턴스가 설치 예정되어 있지 않은지 확인합니다.
    *   패키지의 소스가 적절하게 지정되었는지 확인합니다.
    *   설치할 패키지 목록에 패키지를 추가합니다.
6.  설치할 각 패키지에 대해:
    *   `vcs`가 설정된 경우: 지정된 `commit-id`로 저장소를 `clone`하고, `subdirectory`를 고려하여 패키지를 빌드 및 설치합니다.
    *   `directory`가 설정된 경우: `subdirectory`를 고려하여 패키지를 빌드 및 설치합니다.
    *   `archive`가 설정된 경우: 파일을 가져오고, 파일 크기와 해시를 검증하며, `subdirectory`를 고려하여 패키지를 빌드 및 설치합니다.
    *   `wheels` 항목이 있는 경우: 적절한 `wheel` 파일을 찾아 가져오고 (URL/경로 또는 `packages.index` 사용), 파일 크기와 해시를 검증한 후 설치합니다.
    *   `sdist`만 설정된 경우: 파일을 가져오고 (URL/경로 또는 `packages.index` 사용), 파일 크기와 해시를 검증하며, 패키지를 빌드 및 설치합니다.

### `requirements.txt` 파일과의 의미론적 차이 (Semantic differences with requirements.txt files)
`lock file`은 `requirements.txt` 파일과 몇 가지 중요한 의미론적 차이를 가집니다:

*   **보안:** `lock file`은 해시, 파일 크기, 파일 발견 위치(인덱스 및 실제 파일 위치)를 필수로 기록하여 감사 및 검증을 돕습니다. `requirements.txt`는 해시를 선택적으로 포함할 수 있지만, `opt-in` 기능이며 우회될 수 있습니다.
*   **명확한 환경 명세:** `lock file`은 전체 파일에 대해 지원되는 Python 버전 및 환경을 명시적으로 지정합니다. 이는 `requirements.txt`가 특정 플랫폼을 대상으로 하는지 알기 어려운 문제를 해결합니다.
*   **구조화된 메타데이터:** `lock file`의 `[tool]` 테이블은 `requirements.txt`의 주석과는 달리 구조화된 방식으로 도구별 메타데이터를 기록할 수 있습니다.
*   **다중 사용 (`Multi-use`) 지원:** 이 PEP는 `multi-use lock file`을 지원하는 반면, `requirements file`은 `single-use`입니다.

이 PEP는 `requirements file`을 완전히 대체하지는 않습니다. `requirements file`은 설치 시점 옵션 지정 (예: `--index-url`), 다른 `requirements file` 참조 (`-r`), 환경 변수 사용을 지원하기 때문입니다.

### 보안 시사점 (Security Implications)
`security-first` 원칙을 기반으로 `lock file` 형식을 표준화함으로써 전체 패키지 설치를 더 안전하게 만드는 데 기여할 것으로 기대됩니다. 그러나 이 PEP가 모든 잠재적인 보안 문제를 해결하지는 않습니다.

*   **`lock file` 변조**: `lock file`이 소스 제어에 적절히 관리되고 감사되지 않으면 악의적인 행위자가 파일을 변조할 수 있습니다. 이는 `lock file` 서명 (파일 내 `[tool]` 항목 또는 외부 채널을 통해)으로 완화될 수 있습니다.
*   **오인 설치 방지**: 이 PEP는 사용자가 잘못된 패키지를 설치하는 것을 막지는 않습니다 (예: `typosquatting`을 통한 이름 혼동 공격).

### 교육 방법 (How to Teach This)
사용자들은 다음 사항을 인지해야 합니다:

*   **재현성**: `lock file`은 특정 시점에 설치된 정확한 종속성 집합을 기록하여 미래에 동일한 환경을 재현할 수 있게 합니다. 이는 코드의 우발적인 손상을 방지합니다.
*   **협업**: `lock file`을 통해 팀원 모두가 동일한 패키지 집합을 설치하여 일관된 개발 환경을 보장할 수 있습니다.
*   **보안**: `lock file`은 항상 동일한 파일을 설치하도록 보장하여 악성 파일 설치 위험을 줄이고, 의도적인 종속성 업그레이드를 통해 변경 사항을 명확히 합니다.
*   **환경 호환성**: `lock file`은 특정 환경에만 지원될 수 있습니다. `single-use` 또는 `multi-use`일 수 있으며, `extras` 및 `dependency groups`를 통해 다양한 사용 사례를 지원할 수 있습니다.
*   **도구 독립성**: 이 PEP를 따르는 `lock file`은 명세를 구현하는 모든 `installer`에 의해 설치될 수 있습니다. 그러나 다른 `locker`를 사용한다고 해서 항상 동일한 결과가 보장되지는 않습니다.

## 거부된 아이디어 (Rejected Ideas)
이 PEP를 개발하는 과정에서 여러 아이디어가 논의되었으나 최종적으로 거부되었습니다. 주요 거부 아이디어는 다음과 같습니다:

*   **설치 목적으로 종속성 그래프 기록**: 종속성 그래프를 기록하는 것은 더 많은 정보를 제공하지만, 감사 용이성에 영향을 미치는 불필요한 복잡성을 추가한다고 판단되었습니다.
*   **설치자가 종속성 해결 수행**: 설치자가 종속성 해결을 수행하도록 하는 것은 `lock file` 감사를 복잡하게 만들고, `lockers`에 복잡성을 집중시키는 것이 더 나을 것으로 판단되었습니다.
*   **최소 해시 알고리즘 지원 요구**: 특정 해시 알고리즘을 요구하는 것은 다른 Python 패키징 명세와 일치하지 않으며, 시간이 지남에 따라 알고리즘이 구식이 될 수 있다는 이유로 거부되었습니다.
*   **파일 이름 지정 방식**: `*.pylock.toml` 사용, `.pylock` 확장자 사용, 또는 명명 규칙 없음 등의 아이디어가 있었으나, `pylock.toml`이 편집기 구문 강조 및 발견 용이성 측면에서 가장 적합하다고 판단되었습니다.
*   **파일 형식으로 JSON 또는 YAML 사용**: TOML이 사람이 읽기 쉽고 `pyproject.toml`과의 일관성을 유지하기 위해 선택되었습니다.
*   **단일 해시 알고리즘**: 파일 전체에 단일 해시 알고리즘을 강제하는 것은 대용량 파일의 재해시 비용과 유연성 부족으로 인해 거부되었습니다.
*   **`lock file` 내용 자체 해싱 또는 생성 날짜 기록**: `merge conflict` 문제를 야기할 수 있어 거부되었습니다.
*   **패키지 인덱스 기록**: 불필요한 `bookkeeping`으로 간주되어 거부되었습니다.
*   **`sdist` 빌드 요구사항 `locking`**: 복잡성과 `edge case` 문제로 인해 이 PEP에서 다루지 않고 미래의 PEP로 미뤄졌습니다.
*   **전용 `direct` 키**: `VCS`, `directory`, `archive`와 같은 직접 URL 참조의 세 가지 경우가 명시적으로 정의되어 있으므로 불필요하다고 판단되었습니다.

## 결론
PEP 751은 Python 생태계의 오랜 문제였던 재현 가능한 종속성 설치를 위한 표준화된 `lock file` 형식인 `pylock.toml`을 제안합니다. 이 형식은 사람이 읽을 수 있고 기계적으로 생성되며, 설치 시점에 종속성 해결 없이 빠른 설치를 목표로 합니다. 보안, 감사 용이성, `multi-use` 시나리오 지원에 중점을 두며, 기존 `requirements.txt` 파일의 한계를 극복하는 것을 목표로 합니다. 이 PEP는 Python 패키징 도구들이 일관되고 상호 운용 가능한 방식으로 종속성을 관리할 수 있는 기반을 마련하여, 개발자와 사용자 모두에게 이점을 제공할 것입니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.