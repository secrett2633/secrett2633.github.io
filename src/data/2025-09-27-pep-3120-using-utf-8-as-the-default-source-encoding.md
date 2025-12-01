---
title: "[Final] PEP 3120 - Using UTF-8 as the default source encoding"
excerpt: "Python Enhancement Proposal 3120: 'Using UTF-8 as the default source encoding'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3120/
toc: true
toc_sticky: true
date: 2025-09-27 14:27:43+0900
last_modified_at: 2025-09-27 14:27:43+0900
published: true
---
> **원문 링크:** [PEP 3120 - Using UTF-8 as the default source encoding](https://peps.python.org/pep-3120/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 15-Apr-2007

PEP 3120 – 기본 소스 인코딩으로 UTF-8 사용

## 개요
이 문서는 Python 3.0부터 기본 소스 인코딩을 ASCII에서 UTF-8로 변경할 것을 제안합니다. PEP 263에서 도입된 다른 소스 인코딩 지원은 계속 유지되며, 명시적인 인코딩 선언이 기본값보다 우선합니다.

## 목차
*   [사양 (Specification)](#사양-specification)
*   [역사적 배경 (A Bit of History)](#역사적-배경-a-bit-of-history)
*   [합리적인 근거 (Rationale)](#합리적인-근거-rationale)
*   [구현 (Implementation)](#구현-implementation)
*   [저작권 (Copyright)](#저작권-copyright)

---

### 사양 (Specification)
이 PEP는 기본 소스 인코딩을 ASCII에서 UTF-8로 변경할 것을 제안합니다. 대체 소스 인코딩(PEP 263)에 대한 지원은 계속 존재하며, 명시적인 인코딩 선언은 기본값보다 우선합니다.

### 역사적 배경 (A Bit of History)
*   **Python 1** : 소스 인코딩이 명시되지 않았습니다. 소스 인코딩은 시스템의 기본 실행 문자 집합(대부분의 시스템에서 ASCII superset)의 superset이어야 했습니다. 소스 인코딩은 렉서(lexis) 자체(키워드, 식별자, 구두점, 줄 바꿈 등을 나타내는 바이트)에만 관련이 있었습니다. 문자열 리터럴의 내용은 소스 파일에서 그대로 복사되었습니다.
*   **Python 2.0** : Unicode 도입의 부작용으로 소스 인코딩이 Latin-1으로 변경되었습니다. Unicode 문자열 리터럴의 경우, 문자는 여전히 소스 파일에서 그대로 복사되었지만, 문자 단위로 확장되었습니다. Unicode가 코드 포인트에 고정된 해석을 부여하기 때문에, 이 알고리즘은 적어도 Unicode 리터럴에 비-ASCII 문자를 포함하는 파일에 대해 소스 인코딩을 효과적으로 고정했습니다.
*   **PEP 263** : Unicode 리터럴에서 Latin-1에 있는 Unicode 문자만 사용할 수 있다는 문제를 인식하고 소스 인코딩을 선언하는 구문을 도입했습니다. 소스 인코딩이 주어지지 않으면 기본값은 ASCII여야 했습니다. Python 2.0 및 2.1과의 호환성을 위해 파일은 전환 기간 동안 Latin-1로 해석되었습니다. 이 전환은 Python 2.5에서 종료되었으며, 비-ASCII 문자가 발견되고 소스 인코딩이 선언되지 않은 경우 오류를 발생시킵니다.

### 합리적인 근거 (Rationale)
PEP 263을 사용하면 Python 파일에서 임의의 비-ASCII 문자를 사용하는 것이 가능하지만, 번거롭습니다. 인코딩 선언을 명시적으로 추가해야 합니다. IDLE 및 Emacs와 같은 일부 편집기는 PEP 263의 선언을 지원하지만, 많은 편집기는 여전히 지원하지 않으며(앞으로도 그럴 것입니다), 사용자는 파일별로 편집기가 가정하는 인코딩을 명시적으로 조정해야 합니다.

기본 인코딩이 UTF-8로 변경되면 Python 파일에 비-ASCII 텍스트를 추가하는 것이 더 쉬워지고 이식성이 향상됩니다.
*   일부 시스템에서는 편집기가 텍스트를 저장할 때 자동으로 UTF-8을 선택합니다(예: 로케일이 UTF-8을 사용하는 Unix 시스템).
*   다른 시스템에서는 편집기가 파일을 읽을 때 인코딩을 추측하며, UTF-8은 추측하기 쉽습니다.
*   또 다른 편집기들은 파일 확장자와 기본 인코딩을 연결하는 것을 지원하여, 사용자가 `.py` 파일을 UTF-8과 연결할 수 있도록 합니다.

Python 2의 경우, UTF-8이 아닌 인코딩을 사용하는 중요한 이유는 바이트 문자열 리터럴이 런타임에 소스 인코딩으로 존재하여, 이를 파일로 출력하거나 사용자에게 그대로 렌더링할 수 있었기 때문입니다. Python 3에서는 모든 문자열이 Unicode 문자열이 되므로, 소스의 원래 인코딩은 런타임에 영향을 미치지 않습니다.

### 구현 (Implementation)
*   파서(parser)는 소스 인코딩이 지정되지 않은 경우 127보다 큰 바이트를 허용하도록 변경되어야 합니다. 오류를 발생시키는 대신, 해당 바이트가 잘 구성된 UTF-8인지 확인해야 합니다(파서가 모든 소스 코드를 UTF-8로 변환하므로 디코딩은 필요하지 않습니다).
*   IDLE은 기본 인코딩으로 UTF-8을 사용하도록 변경되어야 합니다.

### 저작권 (Copyright)
이 문서는 퍼블릭 도메인에 공개되었습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.