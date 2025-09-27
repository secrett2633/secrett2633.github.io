---
title: "[Withdrawn] PEP 704 - Require virtual environments by default for package installers"
excerpt: "Python Enhancement Proposal 704: 'Require virtual environments by default for package installers'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/704/
toc: true
toc_sticky: true
date: 2025-09-27 13:08:22+0900
last_modified_at: 2025-09-27 13:08:22+0900
published: true
---
> **원문 링크:** [PEP 704 - Require virtual environments by default for package installers](https://peps.python.org/pep-0704/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 16-Jan-2023



# PEP 704: 패키지 설치 관리자를 위한 가상 환경 기본 요구 사항 (Require virtual environments by default for package installers)

*   **작성자:** Pradyun Gedam
*   **후원자:** Brett Cannon
*   **PEP 대리인:** Paul Moore
*   **상태:** 철회됨 (Withdrawn)
*   **유형:** 표준 트랙 (Standards Track)
*   **주제:** 패키징 (Packaging)
*   **생성일:** 2023년 1월 16일

## 요약 (Abstract)
이 PEP는 pip와 같은 패키지 설치 관리자가 Python 3.13+ 버전에서 기본적으로 가상 환경(virtual environment)을 요구하도록 권장합니다.

## PEP 철회 (PEP Withdrawal)
이 PEP 논의 과정에서 pip의 사용자 경험(UX) 변경이 PEP에 의해 직접적으로 통제되지 않는다는 점이 명확해졌습니다. 또한, 상당수의 사용자가 pip로 관리되는 의존성과 다른 도구(가장 대표적으로 Conda)로 관리되는 의존성을 혼합하여 사용하는 방식에 의존하고 있다는 점도 확인되었습니다.

더 나아가, 이 제안된 변경의 상당 부분의 이점은 PEP 668 (작성 시점에 이미 채택 및 구현됨)을 통해 달성 가능합니다. PEP 668은 Python 인터프리터 재배포자에게 사용자가 가상 환경을 사용하도록 요구할지 여부, 사용자에게 제시되는 메시지, 그리고 해당 변경 사항의 배포 방식을 제어할 수 있는 권한을 제공합니다.

이 PEP의 주요 초점이 pip를 통한 가상 환경 강제 적용이었기 때문에, 다른 주제로 초점을 변경하기보다는 PEP를 철회하는 것이 더 적절하다고 판단되었습니다.

가상 환경 명명 규칙(naming convention) 질문/문제를 해결하기 위한 미래의 PEP는 여전히 적절하지만, 그러한 노력을 강제 적용보다는 해당 컨벤션의 이점에 초점을 맞춘 새로운 PEP로 시작하는 것이 바람직합니다.

## 동기 (Motivation)
Python 가상 환경은 Python 개발 워크플로우의 필수적인 부분입니다. 그러나 이는 선택 사항(opt-in feature)이며, 사용자가 다음 중 하나를 수행해야 하므로 추가적인 노력이 필요합니다.

*   가상 환경을 활성화/비활성화하기 위한 명시적인 단계 수행.
*   `<path-to-venv>/<bin-path>/<executable>`을 사용하여 파일 실행.

초보 사용자에게는 가상 환경을 사용하지 않을 때에도 모든 것이 올바르게 작동하는 것처럼 보일 수 있습니다. 하지만 문제가 발생할 때까지는 그렇지 않습니다. 또한, 가상 환경을 활성화하는 방법은 플랫폼마다 약간 다른 구문과 메커니즘을 사용합니다. 이는 가상 환경의 소개를 복잡하게 만듭니다. 왜냐하면 워크플로우에 추가 단계를 정당화하기 위해 가상 환경이 어떻게/왜 유용한지에 대한 정보와 맥락을 설명해야 하기 때문입니다.

이는 또한 사용자가 pip와 같은 설치 관리자를 실행하기 전에 가상 환경을 활성화하거나, 설치 관리자가 오류를 발생시키도록 구성해야 한다는 것을 기억해야 하므로 실수할 여지를 만듭니다. 특정 Linux 배포판에서는 이를 잊으면 설치 관리자가 운영 체제가 소유한 파일을 수정할 수 있습니다 (이는 해당 환경을 적절하게 표시하도록 선택한 배포판의 경우 PEP 668에 의해 부분적으로 완화됩니다).

## 근거 (Rationale)
pip와 같은 설치 관리자의 기본 동작을 변경하여 활성화된 가상 환경을 요구하면 다음을 달성할 수 있습니다.

*   새로운 사용자가 Python을 더 쉽게 시작할 수 있도록 돕습니다 (일관된 경험을 제공하고 가상 환경이 필수적으로 사용해야 하는 것으로 이해되기 때문입니다).
*   기본적으로 모든 사용자를 위한 우발적인 설치 문제 발생 가능성을 줄입니다 (가상 환경을 사용하지 않을 때 명시적으로 플래그를 지정함으로써).

가상 환경을 `.venv`라는 이름의 디렉토리에 인-트리(in-tree)로 배치하는 규칙을 설정하면 일반적인 워크플로우에서 결정 지점(decision point)이 제거되고 생태계 내에서 명확한 컨벤션이 생성됩니다.

## 명세 (Specification)

### 기본적으로 가상 환경 요구 (Requiring a virtual environment by default)
사용자가 활성화된 가상 환경 없이 설치 관리자를 실행할 때, 설치 관리자는 오류 메시지를 출력하고 0이 아닌 종료 코드로 종료해야 합니다 (SHOULD).

오류 메시지는 사용자에게 가상 환경이 필요함을 알려야 하며 (SHOULD), `.venv`라는 이름의 가상 환경을 생성하고 활성화하는 방법에 대한 셸(shell)별 지침을 제공해야 하며 (SHOULD), 가상 환경을 생성하고 활성화하는 방법을 설명하는 문서 페이지 링크를 제공해야 합니다 (SHOULD).

자세한 내용은 구현 참고 사항(Implementation Notes)을 참조하십시오.

### 가상 환경 비활성화 (Opting out of virtual environments)
설치 관리자는 이 요구 사항을 비활성화하기 위한 명시적인 옵트인(opt-in)을 제공해야 하며 (SHOULD), 이를 통해 최종 사용자가 가상 환경 외부에서 사용할 수 있도록 허용해야 합니다. 설치 관리자가 이 기능을 제공하지 않는 경우, 오류 메시지 및 문서 페이지에 이를 언급해야 합니다 (SHOULD).

### 변경 사항에 대한 일관된 타임라인 (Consistent timeline for the change)
설치 관리자는 모든 Python 버전에서 이 기본 동작을 구현할 수 있지만 (MAY), Python 3.13 이상에서는 구현해야 합니다 (SHOULD).

## 하위 호환성 (Backwards Compatibility)
이 PEP는 사용자가 가상 환경 외부에서 설치 관리자를 사용하는 워크플로우와 하위 호환성이 없습니다. 이러한 사용자에게는 오류 메시지가 표시되며 다음 중 하나를 수행해야 합니다.

*   가상 환경 외부에서 설치 관리자를 실행하도록 명시적으로 옵트인하거나,
*   가상 환경을 생성하고 사용합니다.

이미 가상 환경을 사용하고 있는 사용자는 이 변경의 영향을 받지 않습니다.

워크플로우 도구(사용자를 위해 가상 환경을 내부적으로 관리하는)는 설치 관리자를 실행하기 위해 이미 가상 환경을 사용하고 있어야 하므로 영향을 받지 않아야 합니다.

## 보안 영향 (Security Implications)
이 PEP는 새로운 보안 영향을 도입하지 않습니다.

## 교육 방법 (How to Teach This)
이 PEP는 새로운 사용자가 Python 패키지를 사용하기 시작하기 위해 가상 환경을 생성하고 사용하도록 요구합니다. 그러나 이는 Python Packaging User Guide의 "Python 패키지 설치의 기본 사항" 섹션에서 입증된 모범 사례입니다. 이 섹션은 pip 사용에 대해 논의하기 전에 가상 환경이 무엇이며 어떻게 작동하는지 설명합니다.

## 참조 구현 (Reference Implementation)
이 PEP에 대한 참조 구현은 없습니다. 그러나 제안된 동작은 pip에 이미 대부분 구현되어 있으며 `PIP_REQUIRE_VENV` 환경 변수를 `1`로 설정하여 활성화할 수 있습니다. (설정하지 않으면 설치 시 가상 환경을 요구하지 않는 제안된 옵트인 동작이 발생합니다).

## 구현 참고 사항 (Implementation Notes)

### 활성화된 가상 환경 감지 (Detecting an active virtual environment)
PEP 668에서 논의된 바와 같이, 가상 환경을 견고하게 감지하기 위한 로직은 다음과 같습니다.

```python
def is_virtual_environment():
    return sys.base_prefix != sys.prefix or hasattr(sys, "real_prefix")
```

### 가상 환경 사용에 대한 문서 (Documentation on using a virtual environment)
패키지 설치 관리자는 오류 메시지에 문서 페이지 링크를 제공해야 합니다.

이상적으로는 그러한 문서 페이지가 가상 환경이 무엇인지, 왜 필요한지, 그리고 `venv`를 사용하여 가상 환경을 생성하고 활성화하는 방법을 설명해야 합니다. 가장 일반적인 셸과 플랫폼에 대한 지침을 포함해야 합니다.

이 주제를 다루는 설치 관리자 전반의 노력을 줄이기 위해, 그러한 문서 페이지는 Python Packaging User Guide에서 제공되어야 합니다.

## 거부된 아이디어 (Rejected Ideas)

### 가상 환경 디렉토리 이름 지정하지 않음 (Do not specify a name for the virtual environment directory)
가상 환경 디렉토리에 일관된 이름을 사용하는 것은 몇 가지 이유로 중요합니다.

*   사용자가 가상 환경 디렉토리를 더 쉽게 찾고 활성화할 수 있도록 합니다.
*   새로운 사용자가 가상 환경 디렉토리의 이름을 결정할 필요가 없으므로 결정 지점을 제거합니다.
*   생태계 내에서 명확한 컨벤션을 생성하여 사용자가 문서를 더 쉽게 찾을 수 있도록 합니다.
*   다른 도구 간의 일관성을 보장하여 오류 메시지의 차이가 사용자를 혼란스럽게 하지 않도록 합니다.

### 다른 이름을 가상 환경 디렉토리 이름으로 사용 (Use a different name for the virtual environment directory)
기능적으로는 단일하고 일관된 제안이 있는 한 디렉토리 이름은 크게 중요하지 않습니다.

`.venv`라는 이름이 선택된 이유는 다음과 같습니다.

*   어떤 유효한 Python import 이름과도 충돌하지 않습니다.
*   표준 라이브러리의 `venv` 모듈과 충돌하지 않습니다.
*   Python 커뮤니티에서 기존에 사용되었습니다.
*   일반적인 텍스트 편집기에서 자동 감지를 지원합니다.
*   일반적인 키보드 레이아웃에서 보조 키 없이 입력할 수 있습니다.

### 툴링 동작과 Python 버전을 연결하지 않음 (Do not couple tooling behaviour with a Python version)
이 PEP는 설치 관리자의 동작과 Python 버전 간의 결합을 생성합니다.

이는 설치 툴링에서 동작 변경을 위한 이미 사용 중인 롤아웃 메커니즘입니다. 예를 들어, Python 3.11의 pip는 패키지 메타데이터 구문 분석/가져오기를 위해 `pkg_resources` 대신 `importlib.metadata`를 사용하고, 휠(wheel)을 압축 해제할 경로를 얻기 위해 `distutils.sysconfig` 대신 `sysconfig`를 사용합니다.

이러한 경우와의 차이점은 이러한 변경 사항이 최종 사용자에게 대부분 투명(transparent)해야 한다는 것입니다. 이 PEP는 최종 사용자에게 투명하지 않고 조치를 요구하는 동작 변경을 제안합니다.

이것의 주요 이점은 재배포자가 새 Python 버전에 맞춰 툴링을 조정할 수 있도록 하고, 생태계 전체에 걸쳐 명확하고 일관된 변경 시점을 제공한다는 것입니다. 또한 기본 동작이 가상 환경을 기본으로 일관되게 요구하는 명확한 마감 기한을 설정합니다 (Python 3.12가 수명 주기 종료(end-of-life)에 도달하면).

이 접근 방식의 주요 문제는 사용자가 새 Python 버전으로 업그레이드할 때 동작 변경을 강제하여 새 Python 버전의 채택을 방해할 수 있다는 것입니다. 그러나 이것은 기존 사용자를 위한 마이그레이션/업그레이드이며, 마이그레이션/업그레이드를 위해 일부 변경 사항이 필요하다는 것은 일반적인 기대치입니다.

이 PEP의 저자는 마감 기한과 함께 생태계 전반에 걸쳐 이를 일관되게 적용하는 이점이 업그레이드 시 사용자에게 모범 사례를 강제하는 단점보다 크다고 믿습니다.

## 공개 문제 (Open Issues)
없음.

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 관대한 라이선스 하에 배포됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.