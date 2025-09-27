---
title: "[Final] PEP 643 - Metadata for Package Source Distributions"
excerpt: "Python Enhancement Proposal 643: 'Metadata for Package Source Distributions'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/643/
toc: true
toc_sticky: true
date: 2025-09-27 01:33:51+0900
last_modified_at: 2025-09-27 01:33:51+0900
published: true
---
> **원문 링크:** [PEP 643 - Metadata for Package Source Distributions](https://peps.python.org/pep-0643/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 24-Oct-2020


# PEP 643 – 패키지 소스 배포판을 위한 메타데이터

## 개요 (Abstract)

Python 패키지 메타데이터는 `Core Metadata Specification`에 정의된 표준 형식으로 배포 파일에 저장됩니다. 그러나 소스 배포판(Source Distributions, sdist)의 경우, 데이터 형식은 정의되어 있지만 어떤 데이터가 소스 배포판에 기록되는지에 대해서는 전통적으로 많은 불일치가 있었습니다.

그 결과, 메타데이터 소비자는 소스 배포판에서 사용 가능한 데이터에 의존할 수 없었으며, 메타데이터를 추출하기 위해 (비용이 많이 드는) PEP 517 빌드 메커니즘을 사용해야 했습니다.

이 PEP는 빌드 백엔드(build backends)가 빌드 시점에 계산되어야 하는 메타데이터 필드를 처리하는 데 필요한 유연성을 유지하면서도, 패키지 메타데이터를 소스 배포판에 안정적으로 저장할 수 있는 표준을 정의합니다.

## 동기 (Motivation)

현재 소스 배포판에 메타데이터가 저장되는 방식에는 여러 가지 문제가 있습니다.

*   메타데이터 저장 방식의 세부 사항은 표준화되어 있지만 찾기 쉽지 않습니다.
*   이 사양은 오래된 메타데이터 버전을 요구하며, 코어 메타데이터 사양의 변경 사항에 맞춰 업데이트되지 않았습니다.
*   사양에는 "빌드 시점까지는 값이 알려지지 않아 필드가 생략되었음"과 "이 필드에는 값이 없음"을 구별할 방법이 없습니다.
*   코어 메타데이터 사양은 대부분의 필드를 선택 사항(optional)으로 허용하므로, 앞서 언급한 문제가 거의 모든 메타데이터 필드에 영향을 미칩니다.

이 PEP는 "나중에 채워질" 것으로 예상되는 필드를 기록할 수 있도록 메타데이터 사양을 업데이트하고, 백엔드가 해당 사양 버전(또는 이후 버전)을 사용하여 sdist 메타데이터를 기록해야 한다는 점을 명확히 하기 위해 소스 배포판 사양을 업데이트할 것을 제안합니다.

## 근거 (Rationale)

이 PEP는 프로젝트가 소스 배포판 메타데이터 값을 "`dynamic`"으로 정의할 수 있도록 합니다. 이 맥락에서 필드가 "`dynamic`"이라는 것은 소스 배포판이 생성될 때 값이 고정되지 않았음을 의미합니다. 동적(dynamic) 값은 휠(wheel)이 생성될 때 빌드 백엔드에 의해 제공되며, 빌드 환경의 세부 사항에 따라 달라질 수 있습니다.

PEP 621은 "나중에 채워질" "`dynamic`" 값이라는 유사한 개념을 가지고 있으므로, 우리는 유추를 통해 동일한 용어를 사용하기로 선택합니다.

## 사양 (Specification)

이 PEP는 소스 배포판에 지정된 메타데이터 값과, 그로부터 빌드된 휠의 해당 값 사이의 관계를 정의합니다. 이는 빌드 백엔드가 sdist에서 휠로 단순히 변경 없이 복사되지 않을 모든 필드를 명확하게 표시하도록 요구합니다.

또한, 이 PEP는 PyPA 사양 문서가 소스 배포판 형식(PEP 517 및 이 PEP의 정보를 수집함)의 사양에 대한 공식적인(canonical) 위치가 되도록 합니다.

새로운 필드인 `Dynamic`이 Core Metadata Specification에 추가됩니다. 이 필드는 다중 사용(multiple use)이 가능하며, 다른 코어 메타데이터 필드의 이름을 포함할 수 있습니다.

소스 배포판의 메타데이터에서 발견될 경우, 다음 규칙이 적용됩니다.

*   필드가 `Dynamic`으로 표시되지 않은 경우, sdist에서 빌드된 모든 휠의 필드 값은 sdist의 값과 일치해야 합니다 (`MUST` match).
*   필드가 sdist에 없고 `Dynamic`으로 표시되지 않은 경우, 휠에 존재해서는 안 됩니다 (`MUST NOT` be present).
*   필드가 `Dynamic`으로 표시된 경우, sdist에서 빌드된 휠에는 유효한 모든 값(전혀 존재하지 않는 것을 포함)을 포함할 수 있습니다 (`MAY` contain any valid value).
*   백엔드는 빌드 시점에 변경되지 않을 데이터로부터 생성되었다고 판단할 수 있다면 필드를 `Dynamic`으로 표시해서는 안 됩니다 (`MUST NOT` mark).

백엔드는 `Dynamic`으로 표시한 필드에 대해 계산된 값을 소스 배포판에 기록할 수 있습니다 (`MAY` record). 그러나 소비자는 이 값을 공식적인 것으로 취급해서는 안 되며 (`MUST NOT` treat as canonical), 휠의 최종 값이 무엇일지에 대한 힌트로 사용할 수 있습니다 (`MAY` use as a hint).

소스 배포판 이외의 다른 맥락에서, 필드가 `Dynamic`으로 표시된 경우, 해당 값은 휠 빌드 시점에 생성되었으며 sdist의 값(또는 프로젝트의 다른 빌드)과 일치하지 않을 수 있음을 나타냅니다. 그러나 백엔드는 이 정보를 기록할 필요가 없으며, 소비자는 소스 배포판을 제외하고는 `Dynamic` 표시가 없다는 것이 어떤 중요성을 가진다고 가정해서는 안 됩니다 (`MUST NOT` assume).

`Name` 및 `Version` 필드는 `Dynamic`으로 표시해서는 안 됩니다 (`MUST NOT` be marked).

새로운 메타데이터 필드를 추가하므로, 이 PEP는 코어 메타데이터 형식을 버전 2.2로 업데이트합니다.

소스 배포판은 생성될 때 사용 가능한 코어 메타데이터 사양의 최신 버전을 사용해야 합니다 (`SHOULD` use).

빌드 백엔드는 절대적으로 필요한 경우에만 필드를 `Dynamic`으로 표시하고, 프로젝트가 `Dynamic` 사용을 요구하는 백엔드 기능을 피하도록 권장해야 합니다 (`strongly encouraged`). 프로젝트는 설치 위치의 세부 사항에 맞게 정적(static) 값에 환경 마커(environment markers)를 사용하는 것을 선호해야 합니다.

## 하위 호환성 (Backwards Compatibility)

이 제안은 코어 메타데이터 버전을 증가시키므로, 더 오래된 메타데이터 버전을 사용하는 기존 소스 배포판과 호환됩니다. 도구는 메타데이터 버전을 확인하여 소스 배포판이 이 PEP를 준수하는지 여부를 판단할 수 있습니다.

## 보안 고려 사항 (Security Implications)

이 사양은 공개적으로 사용 가능한 데이터를 저장하기 위한 것이므로, 보안 고려 사항은 없습니다.

## 교육 방법 (How to Teach This)

이것은 프로젝트 메타데이터를 위한 데이터 저장 형식이며, 일반적으로 최종 사용자에게는 보이지 않습니다. 따라서 사용자에게 이 형식을 사용하는 방법을 가르칠 필요는 없습니다. 메타데이터를 참조하려는 개발자는 PyPA 사양에서 세부 정보를 찾을 수 있습니다.

## 거부된 아이디어 (Rejected Ideas)

### 필드를 `Dynamic`으로 표시하는 대신, 명시적으로 `Static`으로 표시되지 않는 한 필드는 동적인 것으로 가정해야 합니다.

이것은 현재 제안과 논리적으로 동일하지만, 필드가 동적인 것이 일반적인 경우임을 암시합니다. 패키징 도구는 정적(static)으로 알려진 메타데이터가 있을 때 훨씬 더 효율적일 수 있으므로, 이 PEP는 동적 필드를 예외로 만들고 백엔드가 필드를 동적으로 만들도록 "선택(opt in)"하도록 요구합니다.

또한, 동적이 기본값이라면, 미래에 점점 더 많은 메타데이터가 정적이 됨에 따라 메타데이터 파일에는 점점 더 많은 `Static` 선언이 포함될 것입니다.

### `Dynamic` 필드를 갖는 대신, 필드가 "아직 정의되지 않음"을 나타내는 특별한 값을 추가합니다.

이 또한 현재 제안과 논리적으로 동일합니다. 이는 "동적(dynamic)임"을 명시적인 선택으로 만들지만, 특별한 값을 요구합니다. 일부 필드는 임의의 텍스트를 포함할 수 있으므로, 그러한 값을 선택하는 것은 다소 어색합니다 (그러나 실제로는 문제가 되지 않을 가능성이 높습니다). 이 접근 방식이 제안된 메커니즘 대신 사용될 만큼 충분한 이점이 있는 것 같지는 않습니다.

### `Requires-Python`에 대한 특별 처리.

PEP의 초기 초안에서는 `Requires-Python`에 대한 특별한 논의가 필요했습니다. 이 필드에 대한 환경 마커(environment markers)가 부족하여 정적으로 요구하기 어려울 수 있었기 때문입니다. 필드를 동적으로 허용하는 화이트리스트(whitelist) 개념이 삭제되면서, PEP의 최종 형태에서는 더 이상 필요하지 않습니다.

### `Dynamic`의 사용을 허용된 필드의 최소 "화이트리스트"로 제한합니다.

이 접근 방식은 `setuptools` 인터페이스의 동적 특성으로 인해 `setuptools`가 하위 호환 가능한 방식으로 구현하기가 매우 어렵다는 것이 밝혀졌습니다. 대신, 이 제안은 이제 대부분의 필드가 동적일 수 있도록 허용하지만, 백엔드가 필수적인 경우가 아니면 동적 값을 피하도록 권장합니다.

## 미해결 문제 (Open Issues)

없음.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 관대한 조건으로 배포됩니다.

---

**참고:** 이 PEP는 역사적인 문서입니다. 최신, 정식 사양인 `Core metadata specifications`는 PyPA 사양 페이지에서 유지 관리됩니다. 변경 사항을 제안하는 방법은 PyPA 사양 업데이트 프로세스를 참조하십시오.
The user has requested a translation and summary of PEP 0643 into Korean, following specific guidelines for professionalism, terminology, readability, and accuracy.

I have successfully browsed the URL and obtained the content of PEP 0643. Now I will proceed with the translation and formatting according to the instructions.

Here's the plan:
1.  **Title and Metadata:** Translate the title and author information.
2.  **Abstract:** Translate the abstract, highlighting the core problem and solution.
3.  **Motivation:** Translate the motivation section, explaining the issues with current metadata storage.
4.  **Rationale:** Translate the rationale, introducing the concept of "dynamic" metadata.
5.  **Specification:** This is the most critical part. I need to:
    *   Explain the `Dynamic` field.
    *   Detail the rules for `Dynamic` and non-`Dynamic` fields in source distributions and wheels.
    *   Mention the update to metadata version 2.2.
    *   Emphasize best practices for backends and projects.
    *   Ensure proper use of `MUST`, `MUST NOT`, `SHOULD`, `MAY` equivalents in Korean.
6.  **Backwards Compatibility:** Translate this section.
7.  **Security Implications:** Translate this section.
8.  **How to Teach This:** Translate this section.
9.  **Rejected Ideas:** Translate the various rejected alternatives and the reasons for their rejection.
10. **Open Issues:** Translate this section.
11. **Copyright:** Translate this section.
12. **Important Note:** Include the "Important" notice about the PEP being historical.
13. **Formatting:** Use Markdown heavily for headings, bullet points, and code snippets (if any, though in this case, it's mostly terminology).
14. **Terminology:** Carefully choose Korean terms or 병기 (English/Korean together) as per instructions. For example, `Source Distribution` -> `소스 배포판 (Source Distributions, sdist)`. `Build Backends` -> `빌드 백엔드`. `Wheel` -> `휠`. `Core Metadata Specification` -> `Core Metadata Specification` (or 코어 메타데이터 사양).

Let's start the translation.## PEP 643 – 패키지 소스 배포판을 위한 메타데이터

*   **작성자:** Paul Moore
*   **BDFL-Delegate:** Paul Ganssle
*   **상태:** Final (최종)
*   **유형:** Standards Track (표준 추적)
*   **주제:** Packaging (패키징)
*   **생성일:** 2020년 10월 24일

---

**중요 공지:**

이 PEP는 역사적인 문서입니다. 최신이자 공식적인 사양인 `Core metadata specifications`는 PyPA 사양 페이지에서 관리되고 있습니다. 변경 사항을 제안하는 방법은 PyPA 사양 업데이트 프로세스를 참조하십시오.

---

### 개요 (Abstract)

Python 패키지 메타데이터는 `Core Metadata Specification`에 정의된 표준 형식으로 배포 파일에 저장됩니다. 하지만 소스 배포판(Source Distributions, sdist)의 경우, 데이터 형식은 정의되어 있음에도 불구하고 어떤 데이터가 소스 배포판에 기록되는지에 대해 전통적으로 많은 불일치가 있었습니다.

그 결과, 메타데이터 소비자는 소스 배포판에서 얻을 수 있는 데이터에 전적으로 의존하기 어려웠으며, 메타데이터를 추출하기 위해 (비용이 많이 드는) PEP 517 빌드 메커니즘을 사용해야 했습니다.

이 PEP는 빌드 백엔드(build backends)가 빌드 시점에 계산되어야 하는 메타데이터 필드를 처리하는 데 필요한 유연성을 유지하면서도, 패키지 메타데이터를 소스 배포판에 안정적으로 저장할 수 있는 표준을 정의합니다.

### 동기 (Motivation)

현재 소스 배포판에 메타데이터가 저장되는 방식에는 여러 가지 문제가 있습니다.

*   메타데이터 저장 방식의 세부 사항은 표준화되어 있지만, 관련 정보를 찾기가 쉽지 않습니다.
*   현재 사양은 오래된 메타데이터 버전을 요구하며, `Core Metadata Specification`의 변경 사항에 맞춰 업데이트되지 않았습니다.
*   사양에는 "이 필드는 빌드 시점까지 값이 알려지지 않으므로 생략되었다"와 "이 필드에는 값이 없다"를 구별할 방법이 없습니다.
*   `Core Metadata Specification`은 대부분의 필드를 선택 사항(optional)으로 허용하므로, 앞서 언급한 문제가 거의 모든 메타데이터 필드에 영향을 미칩니다.

이 PEP는 "나중에 채워질" 것으로 예상되는 필드를 기록할 수 있도록 메타데이터 사양을 업데이트하고, 백엔드가 해당 사양 버전(또는 이후 버전)을 사용하여 sdist 메타데이터를 기록해야 한다는 점을 명확히 하기 위해 소스 배포판 사양을 업데이트할 것을 제안합니다.

### 근거 (Rationale)

이 PEP는 프로젝트가 소스 배포판 메타데이터 값을 "`dynamic`"(동적)으로 정의할 수 있도록 허용합니다. 이 맥락에서 필드가 "`dynamic`"하다는 것은 소스 배포판이 생성될 때 해당 값이 고정되지 않았음을 의미합니다. 동적 값은 휠(wheel)이 생성될 때 빌드 백엔드에 의해 제공되며, 빌드 환경의 세부 사항에 따라 달라질 수 있습니다.

PEP 621은 "나중에 채워질" "`dynamic`" 값이라는 유사한 개념을 가지고 있으므로, 이 PEP에서도 유추를 통해 동일한 용어를 사용하기로 선택했습니다.

### 사양 (Specification)

이 PEP는 소스 배포판에 지정된 메타데이터 값과, 그로부터 빌드된 휠의 해당 값 사이의 관계를 정의합니다. 이는 빌드 백엔드가 sdist에서 휠로 단순히 변경 없이 복사되지 않을 모든 필드를 명확하게 표시하도록 요구합니다.

또한, 이 PEP는 PyPA 사양 문서가 소스 배포판 형식(PEP 517 및 이 PEP의 정보를 통합함) 사양에 대한 공식적인(canonical) 위치가 되도록 합니다.

새로운 필드인 `Dynamic`이 `Core Metadata Specification`에 추가됩니다. 이 필드는 다중 사용(multiple use)이 가능하며, 다른 코어 메타데이터 필드의 이름을 포함할 수 있습니다.

소스 배포판의 메타데이터에서 `Dynamic` 필드가 발견될 경우, 다음 규칙이 적용됩니다.

*   필드가 `Dynamic`으로 표시되지 않은 경우, sdist에서 빌드된 모든 휠의 필드 값은 sdist의 값과 **반드시** 일치해야 합니다 (`MUST` match).
*   필드가 sdist에 없고 `Dynamic`으로 표시되지 않은 경우, 휠에 **존재해서는 안 됩니다** (`MUST NOT` be present).
*   필드가 `Dynamic`으로 표시된 경우, sdist에서 빌드된 휠에는 유효한 모든 값(전혀 존재하지 않는 것을 포함)을 **포함할 수 있습니다** (`MAY` contain any valid value).
*   백엔드는 빌드 시점에 변경되지 않을 데이터로부터 생성되었다고 판단할 수 있다면 필드를 `Dynamic`으로 **표시해서는 안 됩니다** (`MUST NOT` mark).

백엔드는 `Dynamic`으로 표시한 필드에 대해 계산된 값을 소스 배포판에 기록할 **수 있습니다** (`MAY` record). 그러나 소비자는 이 값을 공식적인 것으로 취급해서는 **안 되며** (`MUST NOT` treat as canonical), 휠의 최종 값이 무엇일지에 대한 힌트로 사용할 **수 있습니다** (`MAY` use as a hint).

소스 배포판 이외의 다른 맥락에서, 필드가 `Dynamic`으로 표시된 경우, 해당 값은 휠 빌드 시점에 생성되었으며 sdist의 값(또는 프로젝트의 다른 빌드)과 일치하지 않을 수 있음을 나타냅니다. 그러나 백엔드는 이 정보를 기록할 필요가 없으며, 소비자는 소스 배포판을 제외하고는 `Dynamic` 표시가 없다는 것이 어떤 중요성을 가진다고 **가정해서는 안 됩니다** (`MUST NOT` assume).

`Name` 및 `Version` 필드는 `Dynamic`으로 **표시해서는 안 됩니다** (`MUST NOT` be marked).

새로운 메타데이터 필드를 추가하므로, 이 PEP는 코어 메타데이터 형식을 버전 2.2로 업데이트합니다.

소스 배포판은 생성될 때 사용 가능한 `Core Metadata Specification`의 최신 버전을 **사용해야 합니다** (`SHOULD` use).

빌드 백엔드는 절대적으로 필요한 경우에만 필드를 `Dynamic`으로 표시하고, 프로젝트가 `Dynamic` 사용을 요구하는 백엔드 기능을 피하도록 **강력히 권장됩니다** (`strongly encouraged`). 프로젝트는 설치 위치의 세부 사항에 맞게 정적(static) 값에 환경 마커(environment markers)를 사용하는 것을 선호해야 합니다.

### 하위 호환성 (Backwards Compatibility)

이 제안은 코어 메타데이터 버전을 증가시키므로, 더 오래된 메타데이터 버전을 사용하는 기존 소스 배포판과 호환됩니다. 도구는 메타데이터 버전을 확인하여 소스 배포판이 이 PEP를 준수하는지 여부를 판단할 수 있습니다.

### 보안 고려 사항 (Security Implications)

이 사양은 공개적으로 사용 가능한 데이터를 저장하기 위한 것이므로, 보안 고려 사항은 없습니다.

### 교육 방법 (How to Teach This)

이것은 프로젝트 메타데이터를 위한 데이터 저장 형식이며, 일반적으로 최종 사용자에게는 보이지 않습니다. 따라서 사용자에게 이 형식을 사용하는 방법을 가르칠 필요는 없습니다. 메타데이터를 참조하려는 개발자는 PyPA 사양에서 세부 정보를 찾을 수 있습니다.

### 거부된 아이디어 (Rejected Ideas)

#### 필드를 `Dynamic`으로 표시하는 대신, 명시적으로 `Static`으로 표시되지 않는 한 필드는 동적인 것으로 가정해야 합니다.

이것은 현재 제안과 논리적으로 동일하지만, 필드가 동적인 것이 일반적인 경우임을 암시합니다. 패키징 도구는 정적(static)으로 알려진 메타데이터가 있을 때 훨씬 더 효율적일 수 있으므로, 이 PEP는 동적 필드를 예외로 만들고 백엔드가 필드를 동적으로 만들도록 "선택(opt in)"하도록 요구합니다.

또한, 동적이 기본값이라면, 미래에 점점 더 많은 메타데이터가 정적이 됨에 따라 메타데이터 파일에는 점점 더 많은 `Static` 선언이 포함될 것입니다.

#### `Dynamic` 필드를 갖는 대신, 필드가 "아직 정의되지 않음"을 나타내는 특별한 값을 추가합니다.

이 또한 현재 제안과 논리적으로 동일합니다. 이는 "동적임"을 명시적인 선택으로 만들지만, 특별한 값을 요구합니다. 일부 필드는 임의의 텍스트를 포함할 수 있으므로, 그러한 값을 선택하는 것은 다소 어색합니다 (그러나 실제로는 문제가 되지 않을 가능성이 높습니다). 이 접근 방식이 제안된 메커니즘 대신 사용될 만큼 충분한 이점이 있는 것 같지는 않습니다.

#### `Requires-Python`에 대한 특별 처리.

PEP의 초기 초안에서는 `Requires-Python`에 대한 특별한 논의가 필요했습니다. 이 필드에 대한 환경 마커(environment markers)가 부족하여 정적으로 요구하기 어려울 수 있었기 때문입니다. 필드를 동적으로 허용하는 화이트리스트(whitelist) 개념이 삭제되면서, PEP의 최종 형태에서는 더 이상 필요하지 않습니다.

#### `Dynamic`의 사용을 허용된 필드의 최소 "화이트리스트"로 제한합니다.

이 접근 방식은 `setuptools` 인터페이스의 동적 특성으로 인해 `setuptools`가 하위 호환 가능한 방식으로 구현하기가 매우 어렵다는 것이 밝혀졌습니다. 대신, 이 제안은 이제 대부분의 필드가 동적일 수 있도록 허용하지만, 백엔드가 필수적인 경우가 아니면 동적 값을 피하도록 권장합니다.

### 미해결 문제 (Open Issues)

없음.

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 관대한 조건으로 배포됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.