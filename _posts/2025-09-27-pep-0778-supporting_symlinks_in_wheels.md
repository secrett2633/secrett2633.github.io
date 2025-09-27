---
title: "[Deferred] PEP 778 - Supporting Symlinks in Wheels"
excerpt: "Python Enhancement Proposal 778: 'Supporting Symlinks in Wheels'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/778/
toc: true
toc_sticky: true
date: 2025-09-27 13:56:34+0900
last_modified_at: 2025-09-27 13:56:34+0900
published: true
---
> **원문 링크:** [PEP 778 - Supporting Symlinks in Wheels](https://peps.python.org/pep-0778/)
>
> **상태:** Deferred | **유형:** Standards Track | **작성일:** 18-May-2024

## PEP 778 – Wheels에서의 심볼릭 링크 지원

### 개요 (Abstract)

현재 Wheels는 심볼릭 링크(symlinks)를 제대로 처리하지 못하며, 설치 시 심볼릭 링크 대신 내용을 복사합니다. Wheels를 통해 라이브러리를 적절하게 배포하기 위해, 플랫폼에 독립적인 방식으로 심볼릭 링크를 처리할 새로운 `LINKS` 메타데이터 파일을 제안합니다. 이 사양은 PEP 777에서 논의된 새로운 Wheel 주요 버전(major version)을 요구합니다.

### PEP 연기 (PEP Deferral)

이 PEP는 Wheel 형식의 주요 변경사항에 대한 더 나은 호환성 방안이 확립될 때까지 연기되었습니다. 후방 비호환적(backwards incompatible) 동작을 방해받지 않는 방식으로 허용하는 Wheel 호환성 방안이 확립되면, 다음 사항들이 이 PEP에서 다루어져야 합니다:

*   POSIX 플랫폼에서 공유 라이브러리의 심볼릭 링크에만 초점을 맞춰야 하며, 플랫폼 태그(platform tags)와 연관 지을 수 있을지 고려해야 합니다.
*   심볼릭 링크가 아카이브에 파일 속성으로 구현되어야 하는지, 아니면 `LINKS` 파일로 구현되어야 하는지.
*   `RECORD` 파일에 인코딩될 수 있는지.
*   이 PEP가 PEP 660 편집 가능 설치(editable installs)에 유용하기에는 불충분하다는 점을 명확히 해야 합니다. 이는 더 이상 크로스 플랫폼(cross platform)이 아니기 때문입니다.
*   POSIX 플랫폼에서 심볼릭 링크를 사용할 수 없는 경우의 대체 동작(fallback behavior)을 설명해야 합니다.

### 동기 (Motivation)

현재 Wheel 내의 심볼릭 링크는 CPython의 `zipfile` 모듈이 보안상의 이유로 심볼릭 링크를 제자리에서 처리하는 것을 지원하지 않기 때문에, 파일의 복사본으로 생성됩니다.

이는 Wheel 내에 큰 컴파일된 라이브러리를 배포하려는 프로젝트에 문제를 야기합니다. 이 프로젝트들은 디스크에 설치되는 프로젝트의 크기를 크게 늘리거나, 심볼릭 링크를 생략하여 일부 다운스트림(downstream) 사용 사례를 깨뜨릴 위험에 처하게 됩니다.

POSIX에서 런타임 사용 또는 빌드 타임 링크(build time linking)를 위해 라이브러리를 제대로 로드할 수 있도록 배포하려면, 라이브러리는 POSIX 스타일 로더 및 링커 검색 규칙을 따라야 합니다. 로더가 사용하는 두 가지 주요 파일 이름은 "soname"과 "real name"입니다. "soname"은 `libfoo.so.3`와 같이 라이브러리 인터페이스가 변경될 때마다 숫자가 증가하는 파일입니다. "real name"은 `libfoo.so.3.1.4`와 같이 추가 버전 정보가 로더가 특정 버전의 라이브러리를 찾을 수 있도록 하는 파일입니다. 마지막으로, 라이브러리에 링크할 코드를 컴파일할 때 링커는 `libfoo.so`와 같은 "링커 이름(linker name)"을 검색합니다. 이 세 가지 파일을 모두 배포해야만 모든 런타임 및 빌드 타임 사용 사례를 완벽하게 지원할 수 있습니다. 일반적으로 POSIX 플랫폼에서는 심볼릭 링크를 사용하여 디스크에 라이브러리가 세 번 중복되지 않도록 처리합니다.

Python 패키징으로 돌아와서, `numpy`, `scipy`, `pyarrow`와 같이 바이너리 라이브러리를 배포하는 인기 있는 프로젝트가 많습니다. `pytorch`와 `jax`와 같은 다른 프로젝트들은 다른 Wheels에 있는 `dlopen` 라이브러리를 사용합니다. 이러한 프로젝트들은 현재 Wheel 내의 단일 라이브러리에 의존하지만, 시스템 라이브러리에 "real name" 라이브러리 버전이 있는 경우 링커가 잘못된 라이브러리를 찾을 수 있습니다.

또한, Wheel 내의 심볼릭 링크는 사용자 `site-packages` 디렉토리에 심볼릭 링크를 배치하는 것만으로 더 간단한 편집 가능 설치를 허용할 수 있다는 잠재적 이점이 있지만, 이 PEP는 이 문제를 향후 PEP에서 탐구할 공개 질문으로 남겨둡니다.

### 근거 (Rationale)

POSIX에서 라이브러리 로딩 및 링크에 사용되는 세 가지 주요 라이브러리 명칭을 지원하기 위해, Python Wheels에서 심볼릭 링크 지원을 추가할 것을 제안합니다. 생성된 심볼릭 링크를 추적하고, POSIX 심볼릭 링크를 직접 지원하지 않을 수 있는 다른 플랫폼을 잠재적으로 지원하기 위해, `METADATA`, `RECORD` 및 기타 메타데이터 파일과 함께 `.dist-info` 디렉토리에 존재할 새로운 Wheel 메타데이터 파일인 `LINKS`의 사용을 제안합니다.

`LINKS` 파일을 사용하면 심볼릭 링크와 유사한 사용 사례를 더 크로스 플랫폼 방식으로 활용할 수 있습니다. Windows에서는 심볼릭 링크를 생성하려면 사용자가 심볼릭 링크를 만들도록 허용하는 그룹 정책(예: 개발자 모드 활성화) 또는 관리자 권한이 필요합니다. 이는 일부 사용자 시스템에서는 심볼릭 링크가 지원되지 않을 수 있음을 의미합니다. `LINKS` 파일을 사용함으로써, 설치 프로그램(installers)은 Windows의 junction과 같이 심볼릭 링크를 처리하기 위한 다른 방법을 잠재적으로 사용할 수 있으며, 그렇지 않으면 설치 프로그램은 실패할 것입니다.

이 PEP는 또한 업데이트된 Wheel을 설치할 때 설치 프로그램이 수행해야 하는 검사를 설명합니다. 이러한 검사는 Wheel이 심볼릭 링크를 설치하도록 허용함으로써 발생하는 보안 위험을 처리하기 위해 존재합니다. 이러한 검사가 중요한 이유에 대한 자세한 내용은 "보안 영향(Security Implications)"을 참조하세요.

### 사양 (Specification)

#### Wheel 주요 버전 증가 (Wheel Major Version Bump)

이 PEP는 Wheel 주요 버전 증가를 요구하므로, `LINKS`로 생성된 Wheel의 `Wheel-Version`은 최소 `2.0`이어야 합니다. 이는 이전 설치 프로그램이 심볼릭 링크 설치에 대해 조용히 실패하고 사용자 환경을 손상시키는 것을 방지하기 위함입니다. 자세한 내용은 PEP 777을 참조하세요.

#### 새로운 LINKS 메타데이터 파일 (New LINKS Metadata File)

크로스 플랫폼 심볼릭 링크를 가능하게 하기 위해, 이 PEP는 새로운 Wheel 메타데이터 파일인 `LINKS`를 도입합니다. `LINKS` 파일의 예시는 다음과 같습니다:

```
my_package/libfoo.so.3.1.4,my_package/libfoo.so.3
my_package/libfoo.so.3,my_package/libfoo.so
```

위에서 볼 수 있듯이, `LINKS`의 형식은 `source_path,target_path`입니다. 여기서 `source_path`는 Wheel 내의 모든 네임스페이스(namespace) 또는 패키지 루트에 대한 상대 경로입니다. `target_path`는 Wheel의 내용이 추출된 후 파일 시스템에 존재하는, 끊어지지 않은(non-dangling) 패키지 또는 네임스페이스 내의 경로입니다. 이는 Wheel이 여러 패키지를 포함하는 경우, Wheel 내 모든 패키지의 경로가 허용된다는 것을 의미합니다.

#### 설치 프로그램 동작 사양 (Installer Behavior Specification)

설치 프로그램은 `LINKS` 파일에 포함된 모든 링크의 경로를 확인하여 `source_path` 또는 `target_path`가 유효한지 결정해야 합니다. 설치 프로그램은 `source_path`와 `target_path`가 Wheel에서 오는 모든 네임스페이스 또는 패키지 내에 위치하는지 확인해야 합니다. 설치 프로그램은 Wheel 내의 순환 심볼릭 링크(cyclic symlinks)를 거부해야 합니다. 설치 프로그램은 심볼릭 링크 체인(symlinks pointing to symlinks many times repeated)이 설치 프로그램이 설정한 한계를 초과하는 경우 오류를 발생시킬 수 있습니다.

설치 프로그램은 심볼릭 링크가 있는 Wheel을 처리할 때 다음 단계를 따라야 합니다:

1.  `.dist-info` 내에 `LINKS` 파일이 존재하는지 확인합니다. 존재하지 않으면 더 이상 단계가 필요하지 않습니다.
2.  Wheel 패키지 및 데이터 디렉토리의 모든 파일을 Wheel 1.x와 같이 추출합니다.
3.  각 `source_path`와 `target_path` 쌍에 대해, `target_path`가 방금 추출된 패키지 네임스페이스 중 하나에 존재하는지 확인합니다.
4.  다음으로, 설치 프로그램이 `site` 디렉토리의 각 쌍에 대해 어떤 종류의 링크를 만들 수 있는지 확인합니다. 현재 플랫폼에서 파일/폴더 `target_path`에 대한 링크를 만들 수 없는 경우 오류를 발생시켜야 합니다. 예를 들어, POSIX 심볼릭 링크가 파일 대상을 가리키고, 설치 프로그램이 Windows에서 실행 중이며 심볼릭 링크를 만들 수 없지만 junction을 만들 수 있는 경우, 설치 프로그램은 링크를 처리할 수 없으므로 오류를 발생시켜야 합니다.
5.  마지막으로, 설치 프로그램은 `source_path`와 `target_path` 사이에 플랫폼 관련 링크를 추가해야 합니다.

설치 프로그램은 심볼릭 링크를 처리할 때 기본적으로 심볼릭 링크를 생성하는 대신 파일을 복사해서는 안 됩니다. 설치 프로그램은 대체 구성(alternate configuration) 또는 명령줄 플래그(command line flag) 아래에서 그러한 동작을 제공할 수 있습니다.

#### 빌드 백엔드 사양 (Build Backend Specification)

Wheel을 생성할 때, 빌드 백엔드는 심볼릭 링크를 Wheel에 포함할지 여부를 결정할 때 해당 대상과 동일한 방식으로 처리해야 합니다. 빌드 백엔드는 `LINKS` 파일에 끊어진 심볼릭 링크(dangling symlinks)가 없는지 확인해야 합니다. 빌드 백엔드는 빌드에 포함될 플랫폼 관련 심볼릭 링크를 인식해야 합니다. POSIX 시스템에서는 일반적으로 심볼릭 링크이며, Windows에서는 심볼릭 링크와 junction을 포함합니다.

### 하위 호환성 (Backwards Compatibility)

심볼릭 링크를 도입하려면 Wheel 형식의 주요 버전이 증가해야 합니다. 이는 새로운 Wheel 형식을 사용하는 Wheel이 Wheel 사양에 따라 이전 설치 프로그램 도구에서 오류를 발생시킬 것임을 의미합니다.

"Wheel 2.0"에 대한 PEP 777을 참조하세요.

### 보안 영향 (Security Implications)

심볼릭 링크는 신중하게 처리하지 않으면 매우 위험할 수 있습니다. 간단한 예시로, 사용자가 `sudo pip install malicious`를 실행하고 보호 장치가 없다면, 악성 패키지가 `/etc/shadow`를 덮어쓰고 시스템의 암호 해시를 교체하여 악성 로그인을 허용할 수 있습니다.

이 PEP는 위에서 설명한 것과 같은 공격이 발생하지 않도록 Wheel 내의 심볼릭 링크에 대해 설치 프로그램이 실행해야 하는 여러 검사 요구 사항을 나열합니다. 이는 설치 프로그램이 이러한 보안 조치를 신중하게 구현하고 패키지 설치 시 악의적인 사용을 방지하는 것이 중요함을 의미합니다.

특히, 설치 프로그램은 다음 검사를 수행해야 합니다:

*   심볼릭 링크가 Wheel에서 오는 어떤 패키지나 네임스페이스 외부를 가리키지 않는지.
*   심볼릭 링크가 끊어지지 않았는지 (설치 시 대상이 존재하는지).
*   서비스 거부 공격(denial of service requests)을 피하기 위해 특정 깊이의 검사 후 중단하여 심볼릭 링크가 순환적이지 않은지.
*   제거 시 심볼릭 링크를 따라가지 않아야 합니다.

### 교육 방법 (How to Teach This)

최종 사용자들은 이러한 변경사항이 생태계 전반에 전파되면 Wheel 내 심볼릭 링크의 이점을 투명하게 경험하게 될 것입니다. 설치 프로그램은 플랫폼에서 심볼릭 링크가 지원되지 않는 경우 명확한 오류 메시지를 제공하고 설치가 실패한 이유를 설명하는 것이 중요합니다.

라이브러리를 빌드하는 사람들을 위해 packaging.python.org의 문서는 Wheel 내 심볼릭 링크의 사용 사례와 주의사항(특히 플랫폼 지원)을 설명해야 합니다. 그 외에는 일반 파일이 처리되는 방식과 동일하게 빌드 백엔드에 의해 투명하게 처리되어야 합니다.

### 참조 구현 (Reference Implementation)

TODO.

### 기각된 아이디어 (Rejected Ideas)

#### 모든 곳에 POSIX 심볼릭 링크만 사용 (Just Use POSIX Symlinks Everywhere)

이 PEP는 잠재적인 미래의 PEP 660 편집 가능 설치를 위해 `LINKS`가 사용될 수 있도록 하려고 합니다. 이 미래의 PEP는 Windows를 지원해야 하므로 junction을 사용해야 할 수도 있습니다.

#### `LINKS`에 Junction 사용 금지 (Don't Use Junctions in LINKS)

Junction은 Windows에서 폴더 간의 심볼릭 링크를 지원하는 제한적인 방법입니다. 파일은 지원하지 않습니다. 이 PEP는 사용자가 폴더만 다른 위치에 링크하기를 원할 수 있고, 미래의 PEP 660 구현이 이 기능에 의존해야 할 수도 있기 때문에 junction을 허용합니다.

#### `RECORD` 메타데이터 파일에 심볼릭 링크 포함 (Put symlinks in the RECORD Metadata File)

이렇게 할 수도 있지만, `RECORD` 파일을 복잡하게 만들 것입니다. 또한, 가장 간단한 구현은 대상을 레코드 끝에 배치할 것입니다. 이렇게 하면 줄을 가로질러 스캔하고 Wheel에 어떤 심볼릭 링크가 있는지 시각적으로 확인하기가 더 어려워질 것입니다.

#### 라이브러리 유지 관리자가 Python을 사용하여 라이브러리 위치를 파악해야 함 (Library Maintainers Should Use Python to Locate Libraries)

Python을 사용하여 라이브러리 위치를 파악하는 것이 훨씬 쉬울 것입니다. 그러나 `libtorch`와 같은 일부 라이브러리는 확장 모듈에서 사용되며 자체적으로 종속성 로딩을 요구합니다. 일부 컴파일된 라이브러리는 Python을 사용하여 로더 종속성을 찾을 수 없습니다.

#### 하드 링크 지원 포함 (Include Support for Hardlinks)

이 PEP는 하드 링크(hardlinks)에 대한 어떤 동작도 지정하지 않습니다. 이는 의도적인 것입니다. 이는 미래의 PEP의 확장으로 남겨둡니다.

### 미해결 문제 (Open Issues)

#### PEP 660 및 편집 가능 설치 지원 연기 (PEP 660 and Deferring Editable Installation Support)

이 PEP는 PEP 660 편집 가능 설치 메커니즘의 사양 및 구현을 나중 PEP를 위해 미해결로 남겨둡니다. 이 PEP에서 지정되어야 할까요?

#### 보안 (Security)

이 PEP는 새로운 보안 취약점을 허용하지 않는지 확인하기 위해 검토되어야 합니다. 사용자를 보호하기 위해 심볼릭 링크의 원본 또는 대상에 다른 제한을 두어야 할까요?

#### 패키지 간 심볼릭 링크 허용 (Allow inter-package symlinks)

이는 대규모 라이브러리와 같은 종속성을 여러 Wheel로 분할하고 싶지만, 주 부모 Wheel에서 사용할 수 있도록 하려는 프로젝트에 유용할 수 있습니다.

#### `LINKS`의 형식 (The Format of LINKS)

현재 형식은 `RECORD`에서 파생되었지만, 더 나은 형식이 존재할 수도 있습니다.

---
: https://peps.python.org/pep-0778/


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.