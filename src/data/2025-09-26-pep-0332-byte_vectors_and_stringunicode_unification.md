---
title: "[Rejected] PEP 332 - Byte vectors and String/Unicode Unification"
excerpt: "Python Enhancement Proposal 332: 'Byte vectors and String/Unicode Unification'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/332/
toc: true
toc_sticky: true
date: 2025-09-26 18:38:55+0900
last_modified_at: 2025-09-26 18:38:55+0900
published: true
---
> **원문 링크:** [PEP 332 - Byte vectors and String/Unicode Unification](https://peps.python.org/pep-0332/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 11-Aug-2004

## PEP 332 – 바이트 벡터 및 문자열/유니코드 통합


**제목:** PEP 332 – Byte vectors and String/Unicode Unification
**작성자:** Skip Montanaro <skip at pobox.com>
**상태:** Rejected (거부됨)
**유형:** Standards Track
**생성일:** 2004년 8월 11일
**Python 버전:** 2.5
**이력:** (Post-History는 원문에서 별도 내용 없음)

### 요약 (Abstract)
이 PEP는 로우 바이트(raw bytes) 시퀀스 객체의 도입과 현재 `str` 및 `unicode` 객체의 통합에 대한 개요를 설명합니다.

### 거부 알림 (Rejection Notice)
이 PEP는 현재 형태로 거부되었습니다. 작성자가 이 제안을 계속 이끌어갈 시간이 부족하다고 표명했으며, `python-dev` 메일링 리스트에서의 논의는 약간 다른 제안으로 옮겨갔고, 이는 (결과적으로) 새로운 PEP로 작성될 예정입니다. 관련 논의는 2006년 2월 `https://mail.python.org/pipermail/python-dev/2006-February/060930.html`에서 시작된 스레드를 참조하십시오.

### 도입 배경 (Rationale)
Python의 현재 문자열(string) 객체는 과부하되어 있습니다. 이 객체들은 ASCII 및 비(non-ASCII) 문자 데이터를 저장하는 역할과 동시에, 디스플레이 가능한 문자 시퀀스로 합리적으로 해석될 수 없는 로우 바이트 시퀀스를 저장하는 역할도 수행하고 있습니다. 과거에는 이러한 중복이 큰 문제가 되지 않았지만, Python이 소스 코드가 적절히 인코딩되도록 요구하는 방향으로 나아가면서, 로우 바이트 시퀀스를 표현하기 위해 문자열을 사용하는 것이 더욱 문제가 될 것입니다. 또한, Python의 유니코드(Unicode) 지원이 향상됨에 따라, 문자열을 ASCII 인코딩된 유니코드 객체로 간주하는 것이 더 쉬워지고 있습니다.

### 제안된 구현 (Proposed Implementation)
(괄호 안의 숫자는 해당 기능이 도입될 Python 버전을 나타냅니다.)

*   `str`의 동의어인 `bytes` 빌트인(builtin)을 추가합니다. (2.5)
*   `b"..."` 문자열 리터럴을 추가합니다. 이는 로우 문자열 리터럴(`r"..."`)과 유사하지만, 포함하는 파일의 소스 인코딩과 충돌하는 값은 경고를 생성하지 않습니다. (2.5)
*   "`bytes`"라는 이름의 변수 사용에 대해 경고합니다. (2.5 또는 2.6)
*   `str` 타입과는 구별되는 시퀀스를 참조하는 `bytes` 빌트인을 도입합니다. (2.6)
*   `str`을 `unicode`의 동의어로 만듭니다. (3.0)

### Bytes 객체 API (Bytes Object API)
추후 결정 예정 (TBD).

### 쟁점 (Issues)
*   이 제안이 Python 3.0 이전에 달성될 수 있을까요?
*   `bytes` 객체는 가변(mutable)해야 할까요, 아니면 불변(immutable)해야 할까요? (Guido는 가변이어야 한다고 선호하는 것 같습니다.)

### 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.