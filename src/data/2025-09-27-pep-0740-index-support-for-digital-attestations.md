---
title: "[Final] PEP 740 - Index support for digital attestations"
excerpt: "Python Enhancement Proposal 740: 'Index support for digital attestations'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/740/
toc: true
toc_sticky: true
date: 2025-09-27 13:31:46+0900
last_modified_at: 2025-09-27 13:31:46+0900
published: true
---
> **원문 링크:** [PEP 740 - Index support for digital attestations](https://peps.python.org/pep-0740/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 08-Jan-2024

PEP 740: 디지털 증명(Digital Attestations)을 위한 인덱스 지원

## 개요 (Abstract)
이 PEP(Python Enhancement Proposal)는 PyPI와 같은 Python 패키지 저장소에서 디지털 서명된 증명(attestations) 및 이를 검증하는 데 사용되는 메타데이터의 업로드 및 배포와 관련된 변경 사항을 제안합니다. 이 제안은 두 가지 주요 하위 구성 요소로 나뉩니다.

1.  **업로드 API 변경:** 클라이언트가 `attestation objects` 형태로 디지털 증명을 업로드할 수 있도록 현재 표준화되지 않은 PyPI 업로드 API를 변경합니다.
2.  **인덱스 API 변경:** HTML 및 JSON "Simple" API를 변경하여 클라이언트가 개별 릴리스 파일에 대한 디지털 증명 및 `Trusted Publishing` 메타데이터를 `provenance objects` 형태로 검색할 수 있도록 합니다.

이 PEP는 릴리스 업로드 시 디지털 증명을 의무화하거나 `pip`와 같은 설치 클라이언트가 이를 검증하도록 하는 정책적 권고를 포함하지 않습니다.

## 도입 배경 및 동기 (Rationale and Motivation)
Python 패키지에 대한 디지털 서명의 필요성은 패키지 관리자와 다운스트림 사용자 모두로부터 지속적으로 제기되어 왔습니다.

*   **무결성 및 진정성 입증:** 관리자들은 패키지 업로드의 무결성과 진정성을 입증하고자 합니다.
*   **다운스트림 사용자 검증:** 개별 다운스트림 사용자는 인덱스의 정직성에 대한 추가적인 신뢰 없이 패키지 무결성 및 진정성을 검증하고자 합니다.
*   **대규모 다운스트림 사용자 (예: OS 배포판):** 유사한 검증을 수행하고 자체 다운스트림 패키징 생태계를 위해 재노출하거나 카운터 서명할 수 있도록 합니다.

이 제안은 위에 언급된 모든 사용 사례를 수용하고자 합니다. 또한, 다음과 같은 동기를 가지고 있습니다.

*   **Python 패키지 배포를 위한 검증 가능한 출처 (Verifiable provenance):** 현재 많은 Python 패키지는 소스 호스트의 URL과 같이 인증되지 않은 출처 메타데이터를 포함합니다. 암호화 증명 형식은 이러한 패키지와 해당 소스 호스트 간에 강력한 인증 링크를 가능하게 하여 인덱스 및 다운스트림 사용자가 패키지가 주장된 소스 저장소에서 유래했음을 암호학적으로 확인할 수 있도록 합니다.
*   **공격자 요구 사항 강화 (Raising attacker requirements):** 디지털 증명은 공격자가 개인 서명 자료(또는 서명 ID)에 접근할 수 있을 만큼 충분히 정교해야 하는 추가적인 정교함 요구 사항을 부과합니다.
*   **인덱스 검증 가능성 (Index verifiability):** 기존에는 인덱스가 릴리스 파일당 선택적인 PGP 서명만 제공했습니다. 인덱스는 서명에 대한 올바른 공개 키를 식별하는 메커니즘이 없었기 때문에 이러한 서명의 형식이나 유효성을 확인하지 못했습니다. 이 PEP는 `provenance objects`가 인덱스가 증명의 유효성을 검증하는 데 필요한 모든 메타데이터를 포함하도록 하여 이러한 제한을 극복합니다.

이 PEP는 `Trusted Publishing`과 같은 서명 검증을 위한 적절한 ID 소스를 인덱스 제공자가 채택할 것을 기대하며, 서명 생성을 위한 `attestation statement`를 포함하는 일반적인 증명 형식을 제안합니다.

## 설계 고려 사항 (Design Considerations)
이 PEP는 다음과 같은 설계 고려 사항을 식별합니다.

*   **인덱스 접근성 (Index accessibility):** Python 패키지에 대한 디지털 증명은 "분리된" 리소스(detached resources)로서 인덱스 자체에서 직접 검색할 수 있어야 합니다.
*   **인덱스 자체에 의한 검증 (Verification by the index itself):** 설치 클라이언트에 의한 검증을 가능하게 하는 것 외에도, 각 디지털 증명은 인덱스 자체에 의해 어떤 형태로든 검증될 수 있어야 합니다.
*   **일반적인 적용 가능성 (General applicability):** 디지털 증명은 형식(sdist 또는 wheel)이나 내부 내용에 관계없이 인덱스에 업로드된 모든 패키지에 적용할 수 있어야 합니다.
*   **메타데이터 지원 (Metadata support):** 이 PEP는 암호화 엔벨로프 내에 추가 메타데이터가 이상적으로 존재함을 강조하기 위해 단순히 "디지털 서명"이 아닌 "디지털 증명"을 언급합니다.

## 이전 작업 (Previous Work)

*   **PGP 서명 (PGP signatures):** PyPI는 이전에 PGP 서명을 지원했지만, 2023년 5월 대부분의 서명이 공개 키와 연결될 수 없거나 의미 있게 검증될 수 없다는 조사 결과에 따라 업로드가 비활성화되었습니다.
*   **Wheel 서명 (Wheel signatures):** PEP 427에 지정된 Wheel 형식은 Wheel 내에 직접 임베드된 디지털 서명을 위한 조항을 포함하지만, 광범위하게 사용되지 않았으며 공식 Wheel 툴링은 2018년에 서명 생성 및 검증 지원을 더 이상 사용하지 않도록 했습니다.

이전 작업들은 위의 설계 고려 사항을 완전히 충족하지 못했습니다.

## 명세 (Specification)

### 업로드 엔드포인트 변경 (Upload endpoint changes)
현재 업로드 API는 표준화되어 있지 않지만, 다음 변경 사항이 제안됩니다.

*   인덱스는 기존의 `content` 및 `gpg_signature` 필드 외에 `attestations`를 추가 멀티파트 폼 필드로 받아들여야 합니다.
*   `attestations` 필드는 하나 이상의 개별 증명을 나타내는 JSON 객체인 JSON 배열이어야 합니다.
*   각 `attestation object`는 인덱스에 의해 검증 가능해야 합니다.
*   인덱스가 `attestations`의 어떤 증명이라도 검증에 실패하면 업로드를 거부해야 합니다.

### 인덱스 변경 (Index changes)

#### Simple Index
업로드된 파일에 하나 이상의 증명이 있을 때, 인덱스는 특정 배포와 관련된 증명을 포함하는 `provenance file`을 제공할 수 있습니다. 이 파일의 형식은 JSON 인코딩된 `provenance object`이며, `data-provenance` 속성을 통해 파일의 출처를 나타내는 URL이 포함될 수 있습니다.

#### JSON-based Simple API
업로드된 파일에 하나 이상의 증명이 있을 때, 인덱스는 해당 파일의 파일 딕셔너리에 `provenance` 키를 포함할 수 있습니다. `provenance` 키의 값은 JSON 문자열이거나 `null`이어야 하며, `null`이 아닌 경우 관련 `provenance file`에 대한 URL이어야 합니다. 이 변경 사항은 JSON API 버전을 1.3 이상으로 요구합니다.

### Attestation Objects
`attestation object`는 여러 필수 키를 가진 JSON 객체입니다.

```python
@dataclass
class Attestation:
    version: Literal[1] # 증명 객체의 버전, 항상 1
    verification_material: VerificationMaterial # envelope를 검증하는 데 사용되는 암호화 자료
    envelope: Envelope # 봉투화된 증명 statement 및 서명

@dataclass
class Envelope:
    statement: bytes # 증명 statement (in-toto v1 Statement)
    signature: bytes # 위 statement에 대한 서명

@dataclass
class VerificationMaterial:
    certificate: str # 서명 인증서
    transparency_entries: list[object] # 이 증명의 서명 및 인증서에 대한 투명성 로그 엔트리
```
`attestation object`는 버전 관리되며, 이 PEP는 버전 1을 지정합니다. 버전 1에서는 X.509 인증서, ECDSA (P-256 곡선), SHA-256 암호화 다이제스트 함수를 사용합니다.

### Attestation Statement 및 서명 생성 (Attestation statement and signature generation)
`attestation statement`는 `attestation object` 내에서 암호학적으로 서명되는 실제 클레임입니다. 이는 JSON 형식의 v1 `in-toto Statement` 객체로 인코딩됩니다. `in-toto subject`는 단일 subject만 포함해야 하며, `subject[0].name`은 배포의 파일명이고 `subject[0].digest`는 SHA-256 다이제스트를 포함해야 합니다.

### Provenance Objects
인덱스는 업로드된 증명과 이를 검증하는 데 도움이 될 수 있는 메타데이터를 JSON 직렬화된 객체 형태로 제공합니다.

```python
@dataclass
class Publisher:
    kind: string # Trusted Publisher의 종류
    claims: object | None # Trusted Publisher 인증 중 인덱스에 의해 유지되는 모든 컨텍스트별 클레임
    _rest: object # 추가 필드

@dataclass
class AttestationBundle:
    publisher: Publisher # 이 증명 세트와 관련된 publisher
    attestations: list[Attestation] # 이 번들에 포함된 증명 세트

@dataclass
class Provenance:
    version: Literal[1] # provenance 객체의 버전, 항상 1
    attestation_bundles: list[AttestationBundle] # 하나 이상의 증명 "번들"
```
`provenance object`도 버전 관리되며 이 PEP는 버전 1만 정의합니다. `attestation_bundles`는 하나 이상의 `attestation bundles`를 포함하는 필수 JSON 배열입니다.

### Provenance 객체 변경 (Changes to provenance objects)
`Provenance object`는 불변(immutable)이 아니며 시간이 지남에 따라 변경될 수 있습니다. 예를 들어, 기존 서명 ID에 대한 새 증명 추가 또는 새로운 서명 ID 및 관련 증명 추가 등이 있습니다.

### Attestation 검증 (Attestation verification)
배포 파일에 대한 `attestation object`를 검증하려면 다음 각 항목의 검증이 필요합니다.

1.  `version`이 1인지 확인.
2.  `verification_material.certificate`가 사전에 신뢰할 수 있는 기관(예: 검증 클라이언트에 이미 존재하는 신뢰의 루트)에서 발급한 유효한 서명 인증서인지 확인.
3.  `verification_material.certificate`가 패키지를 게시한 Trusted Publisher의 머신 ID와 같은 적절한 서명 subject를 식별하는지 확인.
4.  `envelope.statement`가 배포의 파일명 및 내용과 일치하는 `subject` 및 `digest`를 가진 유효한 `in-toto v1 Statement`인지 확인.
5.  `envelope.signature`가 `v1 DSSE` 서명 프로토콜을 통해 재구성된 `verification_material.certificate`에 해당하는 `envelope.statement`에 대한 유효한 서명인지 확인.

검증자는 선택적으로 `verification_material.transparency_entries`를 정책 기반으로 검증할 수 있습니다.

## 보안 영향 (Security Implications)

*   **증명 내 암호화 민첩성 (Cryptographic agility in attestations):** 이 PEP는 모든 알고리즘을 단일 스위트(suite)로 지정하고 `attestation object`를 버전 관리함으로써 알고리즘 민첩성을 제한합니다. 이는 공격자가 약한 해시 함수로 강력한 서명 알고리즘을 선택하여 전체 체계를 손상시키는 것을 방지합니다.
*   **인덱스 신뢰 (Index trust):** 이 PEP는 인덱스 자체에 대한 신뢰를 증가시키거나 감소시키지 않습니다. 인덱스는 여전히 수정되지 않은 패키지 배포를 정직하게 전달할 것으로 효과적으로 신뢰됩니다.

## 권장 사항 (Recommendations)
이 PEP는 `attestation object`에 서명 인증서의 주장된 유효 기간을 확증하는 하나 이상의 검증 가능한 서명 시간 소스를 포함할 것을 권장하지만 의무화하지는 않습니다.

## 부록 (Appendix)

*   **Appendix 1: Example Trusted Publisher Representation:** `publisher` 키의 예시를 제공합니다.
*   **Appendix 2: Data models for Transparency Log Entries:** `attestation object`의 투명성 로그 엔트리에 대한 의사 코드 데이터 모델을 포함합니다.
*   **Appendix 3: Simple JSON API size considerations:** `Simple JSON API`에 `provenance object`의 전체 객체 대신 `SHA-256` 다이제스트를 임베드하기로 한 기술적 결정에 대한 설명을 제공합니다.
*   **Appendix 4: Example attestation statement:** `in-toto Statement`의 JSON 객체 예시를 제공합니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.