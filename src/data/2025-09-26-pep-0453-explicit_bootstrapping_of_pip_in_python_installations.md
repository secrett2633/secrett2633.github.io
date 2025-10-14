---
title: "[Final] PEP 453 - Explicit bootstrapping of pip in Python installations"
excerpt: "Python Enhancement Proposal 453: 'Explicit bootstrapping of pip in Python installations'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/453/
toc: true
toc_sticky: true
date: 2025-09-26 22:03:55+0900
last_modified_at: 2025-09-26 22:03:55+0900
published: true
---
> **원문 링크:** [PEP 453 - Explicit bootstrapping of pip in Python installations](https://peps.python.org/pep-0453/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 10-Aug-2013

파이썬 PEP 0453은 "Explicit bootstrapping of pip in Python installations"이라는 제목의 제안서입니다. 이 PEP는 Python 3.4부터 `pip`를 Python 설치 시 기본으로 제공하도록 하고, `pip`를 Python 패키지 설치의 공식적인 기본 도구로 권장하는 내용을 담고 있습니다.

## 목표
Python 개발자들이 이 PEP의 제안 내용, 도입 배경, 그리고 실제 Python 사용에 미치는 영향을 명확하게 이해할 수 있도록 돕는 것입니다.

## 초록 (Abstract)
이 PEP는 Python 2.7, 3.3, 3.4의 "Installing Python Modules" 가이드 문서를 업데이트하여 `pip`를 Python 패키지 설치의 기본 도구로 공식적으로 권장하고, 이러한 권장 사항을 지원하기 위해 Python 3.4에 `pip`를 기본으로 제공하는 기술적 변경 사항을 제안합니다.

## PEP 수락 (PEP Acceptance)
이 PEP는 2013년 10월 22일 화요일에 Martin von Löwis에 의해 Python 3.4에 포함되는 것으로 수락되었습니다. 구현을 추적하기 위해 Issue 19347이 생성되었습니다.

## 도입 배경 (Rationale)
이 PEP의 제안에는 두 가지 관련성 있는, 그러나 다른 배경이 있습니다. 첫째는 새로운 사용자 경험 개선과 관련이 있고, 둘째는 더 넓은 Python 패키징 생태계의 발전을 가능하게 하는 것과 관련이 있습니다.

### 새로운 사용자 경험 개선 (Improving the new user experience)
현재 플랫폼 패키지 관리자가 없는 시스템에서 새로 설치된 Python에 서드파티(third-party) Python 패키지를 설치하려면 먼저 적절한 패키지 관리자를 식별하고 설치해야 합니다. 플랫폼 패키지 관리자가 있는 시스템에서도 PyPI (Python Package Index)에서 사용할 수 있는 모든 패키지를 포함하지 않을 수 있으며, 원하는 서드파티 패키지가 있더라도 플랫폼 패키지 관리자에서의 정확한 이름이 명확하지 않을 수 있습니다.

이는 PyPI 생태계와 효과적으로 작업하려면 사용자가 어떤 패키지 관리자를 설치해야 하는지, 어디서 얻어야 하는지, 그리고 어떻게 설치해야 하는지 알아야 함을 의미합니다. 그 결과, 서드파티 Python 프로젝트는 현재 바람직하지 않은 여러 대안 중에서 선택해야 합니다.

- 사용자가 이미 적합한 크로스 플랫폼(cross-platform) 패키지 관리자를 설치했다고 가정합니다.
- 설치 지침을 복제하고 사용자에게 패키지 관리자를 설치하는 방법을 알려줍니다.
- 사용자 설치 문제를 완화하기 위해 종속성(dependencies) 사용을 완전히 포기합니다.

이러한 옵션들은 모두 상당한 단점을 가지고 있습니다. `pip`를 기본 설치 도구로 강력히 홍보하고 다른 프로젝트들이 `pip`의 자체 부트스트랩(bootstrapping) 지침을 참조하도록 권장함으로써, 서드파티 패키지 설치의 부담을 줄이고 표준 라이브러리에 모든 유용한 모듈을 추가하려는 압력을 줄일 수 있습니다.

### 더 넓은 Python 패키징 생태계의 발전 (Enabling the evolution of the broader Python packaging ecosystem)
새로운 패키징 표준이 널리 채택되기 위해서는 현재 널리 사용되는 Python 버전(미래 버전뿐만 아니라)을 포괄하는 전환 전략 없이는 불가능합니다. 따라서 이 PEP에서 제안하는 변경은 Python 패키징 생태계 발전의 필수적인 단계로 간주됩니다.

`distutils`와 같은 표준 라이브러리 내 패키징 도구는 Python 버전과 함께 기능 세트가 동결되므로 새로운 패키징 표준을 지원하기 어렵습니다. 반면, `pip`와 같은 별도의 설치 관리자 애플리케이션을 사용하면 `pip`만 업그레이드함으로써 이전 Python 버전에서도 새로운 패키징 표준을 지원할 수 있습니다 (pip는 대략 6개월마다 새로운 기능 릴리스를 받습니다).

### 왜 `pip`인가? (Why pip?)
`pip`는 기존에 널리 사용되는 도구이며, 이전 버전인 `easy_install`의 여러 디자인 및 사용자 경험 문제를 해결합니다. `pip`는 단일 Python 런타임 설치(가상 환경 포함) 내에서 작동하는 데 적합하며, 이는 CPython에 번들로 제공되는 도구에 바람직한 특징입니다. `zc.buildout`나 `conda`와 같은 다른 도구들은 목표가 더 야심 차므로 (외부 바이너리 종속성 처리에는 `pip`보다 훨씬 우수), Python 생태계는 이들을 기본 크로스 플랫폼 설치 도구라기보다는 상호 운용할 플랫폼 패키지 관리자로 취급하는 것이 합리적입니다.

## 제안 개요 (Proposal Overview)
이 PEP는 "Installing Python Modules" 가이드를 업데이트하여 `setup.py install` 명령을 직접 호출하는 대신 `pip`를 Python 패키지의 기본 설치 관리자로 공식적으로 권장할 것을 제안합니다.

하지만 CPython이 제공하지 않는 도구를 권장하는 것을 피하기 위해, CPython 3.4 이상을 설치할 때와 표준 라이브러리의 `venv` 모듈을 `pyvenv` 명령줄 유틸리티를 통해 가상 환경을 생성할 때 `pip` 패키지 관리자를 기본으로 사용할 수 있도록 할 것을 추가로 제안합니다.

이를 위해 이 PEP는 Python 3.4에 `ensurepip` 부트스트랩 모듈을 포함하고, `pyvenv`에서 이 모듈을 자동으로 호출하며, Windows에서 Python이 설치된 스크립트가 처리되는 방식을 변경할 것을 제안합니다.

`pip`나 그 종속성(dependencies)을 표준 라이브러리의 일부로 직접 제공하는 것은 제안하지 않습니다. 대신, `pip`는 Python 사용자의 편의를 위해 CPython과 함께 제공되는 번들 애플리케이션이 될 것이지만, 자체 개발 라이프사이클을 가지며 코어 인터프리터 및 표준 라이브러리와 독립적으로 업그레이드될 수 있습니다.

### 명시적 부트스트랩 메커니즘 (Explicit bootstrapping mechanism)
`ensurepip`라는 추가 모듈이 표준 라이브러리에 추가될 것이며, 그 목적은 `pip`와 그 종속성들을 적절한 위치(대부분 `site-packages`)에 설치하는 것입니다. 이 모듈은 `bootstrap()`이라는 호출 가능한 함수를 노출하며, `python -m ensurepip`를 통해 직접 실행도 제공합니다.

부트스트랩은 PyPI에 연결하지 않고, 표준 라이브러리 내에 저장된 `pip`의 비공개 복사본에 의존합니다. 따라서 설치 위치와 관련된 옵션( `--user`, `--root` 등)만 지원됩니다.

### 보안 고려 사항 (Security considerations)
이 PEP의 설계는 `pip install --upgrade pip` 명령을 이후에 실행하지 않는 최종 사용자에게 CPython의 신뢰 모델에 중대한 변경을 가하지 않도록 의도적으로 선택되었습니다. 설치 프로그램은 `pip` 설치 관리자를 포함하여 완전히 작동하는 Python 버전의 모든 구성 요소를 포함할 것입니다. 설치 과정은 네트워크 액세스를 요구하지 않으며, `pip`와 Python 패키지 인덱스 사이에 설정된 네트워크 연결의 보안을 신뢰하는 것에 의존하지 않습니다.

### 안정성 고려 사항 (Reliability considerations)
부트스트랩을 표준 라이브러리의 일부로 포함함으로써 (바이너리 설치 프로그램의 기능으로만 포함하는 것이 아니라), 부트스트랩 명령의 올바른 작동을 기존 CPython 빌드봇(buildbot) 인프라를 사용하여 쉽게 테스트할 수 있으며, 설치 프로그램 자체의 테스트 부담을 크게 추가하지 않습니다.

### 구현 전략 (Implementation strategy)
Python을 설치하거나 가상 환경을 생성할 때 네트워크 액세스가 필요 없도록 `ensurepip` 모듈은 구현 세부 사항으로 `pip`와 그 종속성의 완전한 비공개 복사본을 포함할 것입니다. 이 복사본은 `pip`를 추출하여 대상 환경에 설치하는 데 사용됩니다. 이 비공개 복사본은 구현 세부 사항일 뿐이며, `ensurepip` 모듈(및 간접적으로 `venv`를 통해)에서 노출되는 공개 기능 외에는 의존하거나 존재한다고 가정해서는 안 됩니다.

`ensurepip` 모듈은 자체 부트스트랩을 처리하는 별도의 코드를 포함하는 대신, `sys.path`를 적절하게 조작하여 휠(wheel) 파일을 사용하여 현재 Python 설치 또는 가상 환경에 자체적으로 설치할 수 있도록 합니다.

### 가상 환경 변경 사항 (Changes to virtual environments)
Python 3.3은 `venv` 모듈을 통해 표준 라이브러리 기반의 가상 Python 환경을 포함했습니다. 출시 이후, 기본적으로 가상 환경 내에 설치 관리자가 없었기 때문에 이 기능을 직접 사용하려는 사용자는 거의 없었습니다. 대신 `pip`가 기본으로 설치되는 `virtualenv` 패키지를 계속 사용했습니다.

`venv`를 사용자에게 더 유용하게 만들기 위해, 새로운 환경을 생성할 때 기본적으로 `pip` 부트스트랩을 실행하도록 수정될 것입니다. 이는 사용자가 가상 환경 내에서도 이 PEP가 제공하는 것과 동일한 편리함을 누릴 수 있도록 하며, `venv` 모듈을 외부 `virtualenv` 패키지와 기능적으로 더 유사하게 만들어 더 적합한 대체제가 되도록 합니다.

## 문서화 (Documentation)
Python 2.7, 3.3, 3.4의 표준 라이브러리 문서 중 "Installing Python Modules" 섹션은 `pip` 설치 관리자 사용을 권장하도록 업데이트될 것입니다. `pip`는 Python 3.4에서는 기본으로 제공되거나, Python 2.7 또는 3.3에서는 사용자가 직접 가져와 설치해야 합니다. 가장 일반적인 명령과 옵션에 대한 간략한 설명이 제공되지만, 자세한 내용은 외부에서 관리되는 `pip` 문서에 위임됩니다.

## CPython과 함께 CA 인증서 번들링 (Bundling CA certificates with CPython)
`ensurepip` 구현은 `pip`의 나머지 부분과 함께 `pip` CA 번들을 포함할 것입니다. 이는 CPython이 `pip`가 추출된 후에 `pip`만 사용하는 CA 번들을 효과적으로 포함한다는 의미입니다.

이는 시스템 인증서 저장소에만 의존하는 것보다 선호됩니다. 왜냐하면 Python 3.4 이전 버전의 Python에서도 `pip`가 모든 지원되는 Python 버전에서 동일하게 작동하도록 보장하기 때문입니다.

## setuptools 자동 설치 (Automatic installation of setuptools)
`pip`는 빌드 과정에서 메타데이터(metadata) 생성 및 일부 다른 기능을 처리하기 위해 `setuptools`에 의존합니다. 이 의존성을 줄이거나 제거하기 위한 작업이 진행 중이지만, `pip 1.5`(Python 3.4.0 출시 시점의 현재 버전일 가능성이 높음)에 대해 이 작업이 완료될지는 불확실합니다.

이 PEP는 `pip`가 여전히 `setuptools`를 종속성으로 요구하는 경우, `ensurepip`가 `setuptools`의 비공개 복사본( `pip`의 비공개 복사본 외에)을 포함할 것을 제안합니다. `python -m ensurepip`는 `pip` 자체를 설치하는 것 외에 이 비공개 복사본도 설치할 것입니다.

## Windows에서의 스크립트 실행 (Script Execution on Windows)
Python 3.3에서 Windows 설치 프로그램이 `python`을 `PATH`에 선택적으로 추가하도록 업데이트되었지만, `sysconfig.get_path("scripts")`가 반환하는 스크립트 설치 디렉터리를 포함하도록 변경되지는 않았습니다.

이에 따라, 설치 중에 `pip`를 추출하고 설치하는 옵션을 추가하는 것 외에, 이 PEP는 Python 3.4 이상에서 Windows 설치 프로그램이 설치 중에 `PATH` 수정 옵션이 활성화될 때 `sysconfig.get_path("scripts")`가 반환하는 경로를 Windows `PATH`에 추가하도록 업데이트할 것을 제안합니다.

## 다운스트림 배포자에게 권장 사항 (Recommendations for Downstream Distributors)
Python 설치의 일반적인 출처는 다양한 Linux 배포판, OSX 패키지 관리자 및 상용 Python 재배포자와 같은 다운스트림 배포자를 통하는 것입니다. 모든 Python 사용자에게 일관되고 사용자 친화적인 경험을 제공하기 위해 이 PEP는 다운스트림 배포자에게 다음을 권장하고 요청합니다.

- Python이 설치될 때마다 `pip`가 설치되거나 최종 사용자가 쉽게 사용할 수 있도록 보장해야 합니다.
- `ensurepip` 모듈을 Python 3.4 이상에서 제거하지 않아야 합니다. `venv` 모듈에 의한 가상 환경으로의 `pip` 자동 설치에 필요합니다.
- 재배포된 Python 버전에 가해진 모든 수정 사항에도 불구하고 이 PEP의 모든 기능이 계속 작동하도록 보장해야 합니다.
- 가능한 한 `pip`와 `Wheel`을 활용하도록 빌드 시스템을 마이그레이션하고 `setup.py`를 직접 호출하는 것을 피해야 합니다.

이러한 권장 사항을 따르지 않는 Python 재배포자의 경우, 이 사실을 명시적으로 문서화하고 사용자에게 상위 `pip` 기반 설치 지침을 플랫폼에 적합한 것으로 번역하는 데 적절한 지침을 제공하도록 요청합니다.

## 거버넌스 및 정책 (Policies & Governance)
부트스트랩된 소프트웨어의 유지 관리자와 CPython 코어 팀은 양측의 요구 사항을 해결하기 위해 협력할 것입니다. 부트스트랩된 소프트웨어는 CPython 외부에 유지되며, 이 PEP는 CPython이 부트스트랩된 소프트웨어의 개발 책임 또는 설계 결정을 흡수하는 것을 포함하지 않습니다. 이 PEP는 서드파티 패키지를 사용하려는 최종 사용자의 부담을 줄이는 것을 목표로 하며, 그 안에 포함된 결정은 Python 커뮤니티가 `pip`, `setuptools`, PyPI, `virtualenv` 및 기타 관련 프로젝트의 저작자 및 유지 관리자로서 Python Packaging Authority에 이미 부여한 신뢰를 나타내는 실용적인 결정입니다.

## 하위 호환성 (Backwards Compatibility)
`ensurepip` 모듈 자체의 공개 API 및 CLI는 표준 라이브러리에 대한 Python의 일반적인 하위 호환성 정책을 따를 것입니다. 이 PEP가 번들로 제공하는 외부 개발 소프트웨어는 그렇지 않습니다.

가장 중요한 것은, 부트스트랩된 `pip` 버전이 CPython 유지 관리 릴리스에서 새로운 기능을 얻을 수 있으며, `pip`는 CPython의 18-24개월 주기 대신 자체 6개월 릴리스 주기로 계속 작동한다는 의미입니다.

## 거부된 제안 (Rejected Proposals)
이 PEP의 이전 버전에서 여러 제안이 있었으나 최종적으로 거부되었습니다.

- **Windows 스크립트 디렉터리 이름 변경:** `pyvenv`로 생성된 가상 환경의 크로스 플랫폼 일관성을 개선하기 위해 Windows 스크립트 설치 디렉터리 이름을 "Scripts"에서 "bin"으로 변경하자는 제안이 있었으나, 하위 호환성 문제로 제거되었습니다.
- **Python 2.7 및 3.3에 `ensurepip` 포함:** 새로운 사용자를 위해 `pip` 부트스트랩의 어려움이 Python의 미래 성장에 상당한 장벽이 된다는 이유로 Python 2.7 및 3.3 유지 관리 릴리스에 `ensurepip`를 새 기능으로 추가하자는 제안이 있었으나, 논란 끝에 거부되었습니다.
- **`pip` 부트스트랩 시 PyPI에 자동으로 연결:** 이전 버전에서는 부트스트랩 모듈이 기본적으로 PyPI에서 `pip`를 다운로드하고 설치하도록 제안했으나, 이는 복잡한 예외 상황과 보안 문제로 인해 현재 설계로 단순화되었습니다. 현재는 항상 비공개 복사본을 사용하며, PyPI와의 통신은 명시적인 별도 단계입니다.
- **암묵적 부트스트랩 (Implicit bootstrap):** `pip` 명령이 존재하지 않을 때 암묵적으로 `pip`를 부트스트랩하고 설치하는 가짜 `pip` 명령을 제공하는 PEP 439의 제안은 "너무 마법 같다(magical)"는 이유로 거부되었습니다.
- **표준 라이브러리에 `pip` 직접 포함:** `distutils`의 사례에서 얻은 교훈(패키징 도구를 독립적으로 업데이트할 수 없게 되면 지속적인 혼란 상태에 놓이게 됨)으로 인해 `pip`를 표준 라이브러리에 직접 포함하는 제안은 거부되었습니다. `pip`가 Python 릴리스와 독립적으로 발전할 수 있도록 하는 것이 더 바람직합니다.
- **기본 `--user` 설치:** 기본적으로 `pip`를 사용자별 `site-packages` 디렉터리에 부트스트랩하는 것은 `pip` 자체의 기본 동작과 다르며 신뢰할 수 없다는 이유로 고려되지 않았습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.