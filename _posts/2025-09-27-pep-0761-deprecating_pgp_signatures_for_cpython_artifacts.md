---
title: "[Active] PEP 761 - Deprecating PGP signatures for CPython artifacts"
excerpt: "Python Enhancement Proposal 761: 'Deprecating PGP signatures for CPython artifacts'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/761/
toc: true
toc_sticky: true
date: 2025-09-27 13:44:29+0900
last_modified_at: 2025-09-27 13:44:29+0900
published: true
---
> **원문 링크:** [PEP 761 - Deprecating PGP signatures for CPython artifacts](https://peps.python.org/pep-0761/)
>
> **상태:** Active | **유형:** Process | **작성일:** 08-Oct-2024



# PEP 761 – CPython 아티팩트에 대한 PGP 서명 지원 중단 제안

이 문서는 CPython 배포 아티팩트(artifacts)에 대한 PGP(Pretty Good Privacy) 서명 방식을 지원 중단하고, Sigstore를 통한 서명 방식으로 전환할 것을 제안합니다.

## 초록 (Abstract)

Python 3.11.0부터 CPython은 모든 아티팩트에 대해 PGP와 Sigstore라는 두 가지 검증 가능한 디지털 서명을 제공해왔습니다. PGP는 신뢰할 수 있는 주체에 의한 장기 개인 키(long-lived private keys) 유지 및 보호를 필요로 합니다. PGP의 보안 및 인체공학적 측면은 수년간 보안 전문가들로부터 비판을 받아왔으며, 가장 큰 문제는 "아티팩트 서명"을 위한 대안이 거의 제안되거나 채택되지 않았다는 점입니다.

Sigstore의 설계 철학은 서명 및 검증의 인체공학적 측면에 중점을 두며, OpenID Connect를 통해 강력하게 연결된 사람의 읽을 수 있는 ID(human-readable identities)와 함께 단기 키(short-lived keys)를 사용합니다. Sigstore는 개발 및 채택에 있어 상당한 추진력을 얻고 있으며, PyPI, NPM, Homebrew, GitHub 등 여러 생태계에서 채택되고 있습니다.

이 PEP는 새로운 릴리스 관리자(release managers)가 PGP 서명 제공을 단계적으로 중단하고 결국 완전히 중지함으로써, CPython이 아티팩트 서명에 Sigstore만을 독점적으로 사용하도록 전환할 것을 제안합니다.

## 동기 (Motivation)

CPython 릴리스는 릴리스 관리자 중심이며, 한 명의 담당자가 프리릴리스(pre-release)부터 지원 종료(end-of-life)까지 수년간 여러 CPython 릴리스를 유지 관리합니다. 릴리스 관리자에게 7년 이상 PGP 개인 키를 유지하고 보호하도록 요구하는 것은 인체공학적이고 수명이 짧은 서명 키가 사용되는 새로운 시대에 불필요한 부담입니다.

이에 비해 Sigstore는 릴리스 관리자가 릴리스 프로세스 중 단 한 번의 버튼 클릭으로 ID 제공업체(identity provider)에 OAuth 로그인을 하면 됩니다. GitHub와 같은 ID 제공업체의 계정 무결성을 유지하는 것은 다단계 인증(multi-factor authentication) 및 강력하고 고유한 비밀번호 등을 통해 Python 릴리스 관리자 또는 핵심 팀원으로서 이미 기대되는 사항입니다.

## 근거 (Rationale)

### Python 릴리스 전체에 걸쳐 기대치 유지 (Preserve expectations across a Python release)

다운스트림 검증기(downstream verifiers)의 작동 중단을 피하기 위해, 기능 릴리스(feature release)의 수명 주기 동안 검증 자료 가용성에 대한 기대치는 변경되어서는 안 됩니다.

### 릴리스 관리자, 릴리스가 아님 (Release managers, not releases)

PGP 서명의 중단은 반드시 "릴리스 관리자 경계"에서 발생해야 하는 것은 아니며, 새로운 Python 릴리스가 잠재적인 경계가 될 수 있습니다.

PGP 지원 중단의 주요 동기가 인체공학적 측면이기 때문에, 한 릴리스에 대해 PGP를 중단하면서도 릴리스 관리자가 다른 릴리스에 대해 수년간 PGP 서명을 제공해야 한다면 노력 절감 효과가 크지 않습니다. 새로운 릴리스 관리자는 또한 다운스트림 검증기가 채택해야 할 새로운 PGP 공개 키를 나타냅니다. 이 기간 동안 변경을 결정함으로써, 다운스트림 유지 관리에서 이미 변경이 필요할 시점에 발생할 수 있는 문제들을 최소화합니다.

### 서명 방식과 검증기의 고르디아누스의 매듭 (Gordian knot of signing methods and verifiers)

CPython이 PGP와 Sigstore 서명을 동시에 제공하는 것은 "고르디아누스의 매듭"을 만듭니다. 기존 서명 방식의 지속적인 가용성 때문에 검증기는 새로운 서명 방식으로 마이그레이션할 동기가 약화되고, 이는 기존 서명 방식 유지에 대한 겉보기 수요를 증폭시킵니다.

이러한 상황은 새로운 서명 방식을 검증 도구에 자동화하고 통합해야 할 "필요성"을 만들지 않음으로써, 서명 생성 프로젝트와 서명 검증 생태계 모두에서 Sigstore와 같은 새로운 서명 방식의 채택을 늦춥니다.

향후 어떤 서명 방식이 제공될지에 대한 기대치를 변경함으로써, 다운스트림 도구에서 새로운 서명 방식의 채택을 촉진하여 인센티브의 매듭을 끊을 수 있습니다. 검증 도구에 대한 이러한 변경은 다른 업스트림 프로젝트도 Sigstore 서명만 게시하도록 마이그레이션할 수 있게 하여, 채택의 긍정적인 피드백 루프를 생성합니다.

## 명세 (Specification)

PGP 키는 릴리스 관리자의 ID에 연결되어 있기 때문에, PGP 서명의 가용성 변경은 개별 릴리스(3.13, 3.14 등) 대신 릴리스 관리자에게 연결될 것입니다. 이 PEP는 PGP 서명에 대한 지원 중단 및 중단 일정을 모두 제안합니다.

### PGP 서명의 지원 중단 및 중지 (Deprecation and discontinuation of PGP signatures)

이 PEP는 향후 CPython 릴리스에 대한 PGP 서명을 지원 중단하고, 검증기가 PGP 대신 CPython 아티팩트를 검증하기 위해 Sigstore를 채택하도록 권장합니다.

또한 이 PEP는 아직 안정적인 Python 릴리스를 유지 관리하지 않는 미래의 릴리스 관리자가 PGP 서명을 게시해야 한다는 기대를 제거합니다. 이 문서를 작성하는 시점에서는 Hugo van Kemenade가 해당되며, 3.14는 안정적인 릴리스가 없는 다음 Python 버전입니다. 이미 안정적인 릴리스(3.13, 3.12, 3.11 등)를 가진 릴리스는 영향을 받지 않으며, 지원 종료될 때까지 아티팩트에 대한 PGP 서명을 계속 제공할 것입니다. 모든 기존 PGP 서명은 예상대로 계속 작동합니다.

### PGP 서명 중단 지연 (Delaying discontinuation of PGP signatures)

이 PEP는 특별한 상황 발생 시 현재 및 예정된 CPython 릴리스에서 PGP 서명 중단을 지연할 수 있는 메커니즘을 제공합니다. PGP 서명의 지원 중단은 상위 PEP 없이는 변경할 수 없습니다.

Steering Council은 이 PEP 승인 후 향후 날짜에 PGP 서명 중단을 다음 CPython 릴리스로 연기하기로 결정할 수 있습니다. Steering Council이 PGP 서명 중단을 연기하기로 결정하면, 모든 활동 중인 릴리스 관리자는 릴리스 관리자로서의 임기 동안 자신이 담당하는 CPython 아티팩트에 대한 PGP 서명을 제공해야 합니다. 여기에는 새로운 PGP 키 생성 및 python.org에 ID 게시와 같은 필요한 모든 단계가 포함됩니다.

PGP 서명 중단은 Steering Council 결정에서 강조될, 안정적인 릴리스가 없는 다음 릴리스 관리자를 위해 자동으로 일정이 정해집니다.

## 하위 호환성 (Backwards Compatibility)

이 제안은 PGP를 사용하여 미래의 CPython 아티팩트를 검증할 수 있는 기능을 제거할 것입니다. CPython 아티팩트에 PGP를 사용하는 다운스트림 검증기는 Sigstore 사용을 시작하거나, 다른 수단을 통해 CPython의 소스 코드를 검증하거나, 미래의 CPython 릴리스에 대한 검증을 완전히 중단해야 합니다.

## 보안 영향 (Security Implications)

PGP와 Sigstore는 다른 보안 모델을 가지고 있으므로, PGP 서명을 제거하면 모든 사용자는 Sigstore가 제공하는 보안 모델에만 의존할 수 있습니다.

일반적으로 아티팩트 서명에 필요한 보안 모델은 호스팅 서비스(CPython의 경우: python.org/downloads)의 보안 또는 무결성과 관계없이, 주어진 아티팩트가 예상된 소스에서 왔으며 수정되지 않았음을 감지할 수 있어야 합니다.

Sigstore의 보안 모델은 PGP에 비해 중앙 집중식 인프라에 더 많이 의존합니다. 여기에는 "공공재" 서명 투명성 로그(Rekor), 인증 기관 및 투명성 로그(Fulcio), 그리고 Google 및 GitHub와 같은 OpenID Connect ID 제공업체의 보안이 포함됩니다. CPython의 개발은 이미 이러한 서비스 중 일부의 보안에 의존하며, 다른 서비스들은 개별 릴리스 관리자보다 장기적인 공개 키 관리를 제공하는 데 더 많은 자원을 가지고 있습니다.

## 교육 방법 (How to Teach This)

CPython은 이미 릴리스 관리자의 사전 게시된 ID를 기반으로 Sigstore를 사용하여 아티팩트를 검증하는 방법을 문서화하고 있습니다. 문서는 PGP 서명의 지원 중단 및 향후 기대치를 나타내도록 업데이트될 것입니다.

CPython 아티팩트의 서명을 검증하는 것은 새로운 Python 사용자에게 기대해야 할 사항이 아닙니다. 대신, Sigstore는 Linux 배포판, Homebrew, pyenv 등과 같이 소스에서 CPython을 프로그래밍 방식으로 가져오고 빌드하는 다운스트림 통합자의 빌드 파이프라인의 일부가 될 가능성이 더 큽니다.

## 거부된 아이디어 (Rejected Ideas)

### PGP 서명을 무기한 게시 (Continue publishing PGP signatures indefinitely)

릴리스 관리자는 이미 어렵고 시간 소모적이며 장기적인 약속이며, 일반적으로 자발적인 기반으로 수행됩니다. 따라서 우리는 PGP 키 관리 업무의 제거를 미래 릴리스 관리자의 번아웃(burnout) 및 스트레스 감소와 CPython의 지속 가능성 향상을 위한 단계로 봅니다.

### 이전 PGP 서명 제거 (Removing previous PGP signatures)

이 PEP는 기존 Python 버전을 중심으로 구축된 인프라를 손상시키려 하지 않으며, 대신 미래 Python 버전에 대한 기대치만 변경합니다. 따라서 python.org에 이미 제공되는 모든 PGP 서명은 PGP 지원 중단 이후에도 계속 제공될 것입니다.

## 부록 (Appendix)

### 오프라인 검증 지원 (Support for offline verification)

PEP 사전 논의 중에 Sigstore가 오프라인 검증을 지원하는지에 대한 질문이 있었습니다. Sigstore 번들(`.sigstore`) 파일을 사용하면 Sigstore 클라이언트는 아티팩트를 완전히 오프라인으로 검증하는 것을 지원합니다.

Sigstore를 사용한 오프라인 검증은 신뢰의 근원(root of trust) 업데이트를 비활성화하고 검증 중에 사용할 신뢰의 근원을 파일에 "고정"(pinning)해야 합니다. 신뢰의 근원을 고정한다는 것은 새로운 신뢰의 근원이 설정된 후 생성된 서명은 "고정된" 이전 신뢰의 근원을 사용하여 더 이상 검증할 수 없다는 것을 의미합니다. 새로운 신뢰의 근원은 신뢰의 근원이 손상되었을 때와 같이 드문 경우에 발생할 것으로 예상되며, 이 경우 검증기는 서명 검증이 실패하기를 원할 것입니다.

오프라인 검증은 또한 취소(revocation) 확인을 불가능하게 만들지만, 이는 키 취소가 온라인 조회를 필요로 하는 PGP의 모델과 유사합니다. 신뢰의 근원 손상과 같은 드문 경우를 제외하고, Sigstore로 오프라인 검증을 사용하더라도 검증자에게 추가적인 운영 요구 사항을 부과하지 않습니다.

### 검증을 위한 사전 컴파일된 실행 파일 지원 (Support for a pre-compiled executable for verification)

논의 중에 sigstore-go를 소스에서 빌드하기 위해 Go 빌드 툴체인을 설치하거나 sigstore-python을 위해 작동하는 Python 설치가 필요 없이 Sigstore 번들을 검증하는 데 사용할 수 있는 사전 컴파일된 실행 파일에 대한 요청이 있었습니다.

Cosign은 사전 컴파일된 독립 실행형 바이너리를 제공하고 번들을 오프라인으로 검증하는 것을 지원하는 또 다른 Sigstore 프로젝트입니다.

예시:
```bash
# Cosign 다운로드
wget https://github.com/sigstore/cosign/releases/download/v2.4.1/cosign-linux-amd64
# 오프라인 검증을 위해서는 신뢰의 근원(Root of Trust)도 필요합니다.
# 다음 GitHub 링크에서 가져올 수 있습니다: https://github.com/sigstore/root-signing/blob/main/targets/trusted_root.json
wget https://raw.githubusercontent.com/sigstore/root-signing/refs/heads/main/targets/trusted_root.json
# CPython 아티팩트 다운로드
wget https://www.python.org/ftp/python/3.13.0/Python-3.13.0.tgz
wget https://www.python.org/ftp/python/3.13.0/Python-3.13.0.tgz.sigstore

./cosign-linux-amd64 verify-blob \
  --new-bundle-format \
  --certificate-oidc-issuer 'https://accounts.google.com' \
  --certificate-identity 'thomas@python.org' \
  --bundle ./Python-3.13.0.tgz.sigstore \
  # --offline 및 --trust-root는 오프라인 검증을 위한 선택 사항입니다.
  --offline \
  --trust-root ./trusted_root.json \
  ./Python-3.13.0.tgz
```

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.