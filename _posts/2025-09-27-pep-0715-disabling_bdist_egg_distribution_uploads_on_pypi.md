---
title: "[Final] PEP 715 - Disabling bdist_egg distribution uploads on PyPI"
excerpt: "Python Enhancement Proposal 715: 'Disabling bdist_egg distribution uploads on PyPI'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/715/
toc: true
toc_sticky: true
date: 2025-09-27 13:13:33+0900
last_modified_at: 2025-09-27 13:13:33+0900
published: true
---
> **원문 링크:** [PEP 715 - Disabling bdist_egg distribution uploads on PyPI](https://peps.python.org/pep-0715/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 06-Jun-2023



# PEP 715 – PyPI에서 `bdist_egg` 배포 업로드 비활성화

## 개요 (Abstract)

이 PEP(Python Enhancement Proposal)는 PyPI에서 `bdist_egg` 배포 유형의 새로운 업로드를 점진적으로 중단(deprecate)하고 최종적으로 비활성화할 것을 권고합니다. 이와 함께, `.egg` 접미사를 가진 배포 파일명의 새로운 업로드 역시 중단하고 비활성화할 것을 제안합니다.

이 PEP가 시행된 후에는 PyPI가 `sdist`와 `bdist_wheel` 유형의 새로운 업로드만 허용하게 됩니다. 이는 각각 `.tar.gz` / `.zip` 및 `.whl` 접미사를 가진 파일에 해당합니다.

이 PEP는 이전에 업로드된 `bdist_egg` 배포나 `.egg` 접미사를 가진 파일을 제거하거나 다른 방식으로 영향을 주지 않을 것을 권고합니다.

## 배경 (Rationale)

### 선행 작업 (Previous Work)

이 제안의 기반은 PEP 527에 의해 마련되었습니다. PEP 527은 사용 빈도가 낮거나 거의 없는 일부 파일 확장자와 배포 유형에 대한 업로드 지원을 점진적으로 중단하고 궁극적으로 제거할 것을 제안했습니다.

특히, PEP 527은 `bdist_dumb`, `bdist_rpm`, `bdist_dmg`, `bdist_msi`, `bdist_wininst` 배포 유형과 `.tar`, `.tar.bz2`, `.tar.xz`, `.tar.Z`, `.tgz`, `.tbz` 파일 확장자를 가진 배포 파일명에 대한 제거를 제안했습니다. PEP 527은 Warehouse PR #7529를 통해 2020년 4월 13일에 완전히 시행되었습니다.

### `bdist_egg` 형식 (The bdist_egg format)

`bdist_egg` 파일 유형은 egg 형식의 배포를 식별합니다. egg 형식은 2004년 `setuptools`에 의해 도입되었으며, 빌드된 배포판을 위한 표준화된 형식으로 2012년 PEP 427에 의해 처음 도입된 Wheel 형식과 기능적으로 거의 동일합니다.

오랜 기간 존재했음에도 불구하고, egg 형식은 PyPI에서 제한적으로만 채택되었습니다. 2023년 5월 한 달 동안 PyPI에 업로드된 전체 배포판 중 `bdist_egg` 업로드는 0.2%에 불과했습니다. 또한, `pip`은 2016년에 `--egg` 옵션을 비권장(deprecated)했으며, `setuptools`는 2019년부터 egg 지원을 비권장으로 간주하고 있습니다. `build` 도구는 `sdist`와 `bdist_wheel` 파일 유형만 지원합니다.

위의 사항들을 고려할 때, 이 PEP는 PEP 527에서 제시된 것과 동일한 정당성을 바탕으로 `bdist_egg` 형식의 제거를 제안합니다:

*   Egg 배포는 광범위한 생태계에서 사용이 제한적이므로, 상호 이익이 없는 유지보수 부담을 야기합니다.
*   추가적인 빌드 배포 형식을 유지하는 것은 최종 사용자에게 혼란을 줄 수 있으며, 사용자들이 실수로 `wheel` 형식 대신 egg 형식을 선택할 수 있습니다.

이 PEP는 또한 표준화 및 중복성 측면에서 제거의 이유를 제시합니다. egg 형식은 어떤 PEP나 다른 커뮤니티 표준에 의해 표준화되지 않았으며, 표준화되어 잘 지원되는 대안(Wheel)과 크게 중복됩니다.

### `.egg` 파일 확장자 (The .egg file extension)

`.egg` 파일 확장자는 `bdist_egg` 형식의 배포에만 사용됩니다. 따라서 PyPI가 `bdist_egg` 배포의 새로운 업로드를 비활성화하는 시나리오에서는 더 이상 목적이 없습니다.

## 제거 과정 (Removal Process)

이 PEP는 PyPI에서 기존 파일을 제거할 것을 제안하지 않으며, 단지 새로운 파일의 업로드만 허용하지 않을 것을 제안합니다.

PyPI는 한 달의 유예 기간(deprecation period)을 제공할 것입니다. 유예 기간이 시작될 때, 2023년 1월 1일 이후 하나 이상의 egg 배포를 업로드한 프로젝트의 관리자들에게 egg 배포 업로드 지원 종료에 대한 일회성 이메일이 발송됩니다.

유예 기간 동안 사용자들은 새로운 프로젝트와 기존 프로젝트 모두에 egg 배포를 계속 업로드할 수 있습니다. 이 기간 동안 egg 배포를 업로드하면 프로젝트의 모든 관리자에게 위와 유사한 이메일이 발송되어 지원 종료가 임박했음을 다시 한 번 알립니다.

유예 기간이 종료된 후에는 PyPI에서 egg 배포 업로드 지원이 중단됩니다.

### 선례 (Prior Art)

위의 제거 과정은 PEP 527의 제거 과정을 기반으로 하되, 다음과 같은 변경 사항이 적용되었습니다:

*   유예 기간 동안 모든 프로젝트가 egg를 업로드할 수 있도록 허용됩니다. 이전에는 업로드했던 프로젝트만 허용되었던 것과 다릅니다.
*   유예 기간 시작 시 발송되는 일회성 이메일 외에도, 유예 기간 동안 egg를 업로드할 때마다 관리자에게 이메일이 발송됩니다.

## 하위 호환성 (Backwards Compatibility)

### 제한적인 영향 (Limited Impact)

배경 섹션에서 언급했듯이, 이 PEP는 대다수의 PyPI 사용자 및 프로젝트에 거의 영향을 미치지 않을 것으로 예상됩니다. 지난 1년 반 동안 커뮤니티의 상당한 조율을 통해 몇 안 되는 마지막 사용 사례에 대한 영향을 최소화했습니다.

### 호스팅된 파일 (Hosted Files)

이 PEP는 이미 PyPI에 업로드된 egg 배포를 제거할 것을 제안하지 않습니다. 이전에 업로드된 모든 egg 배포는 계속 다운로드 가능하며, 기존 사용자들이 계속 다운로드할 수 있도록 보장합니다.

### 유예 기간 (Deprecation Period)

이 PEP는 PyPI에 이전에 egg 배포를 업로드했던 프로젝트에 대해 1개월의 유예 기간을 명시하는 위에서 설명한 제거 프로세스를 사용합니다. 유예 기간 종료 후에는 PyPI에서 새로운 egg 배포 업로드 지원이 중단됩니다.

## 보안 문제 (Security Implications)

이 PEP는 egg 배포에 대한 업로드 지원을 제거하는 것과 관련된 긍정적 또는 부정적인 보안 문제를 식별하지 않습니다.

## 교육 방법 (How To Teach This)

제거 과정의 일환으로, PyPI는 2023년에 이전에 egg 배포를 업로드했던 프로젝트의 모든 관리자에게 이메일을 보낼 것입니다.

또한, PyPI는 PyPI 블로그에 유예 기간의 시작과 종료를 공개적으로 알리는 게시물을 작성할 것입니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 관대한 조건으로 제공됩니다.## PEP 715 – PyPI에서 `bdist_egg` 배포 업로드 비활성화

### 개요 (Abstract)

PEP 715는 PyPI(Python Package Index)에서 `bdist_egg` 배포 유형과 `.egg` 확장자를 가진 파일의 새로운 업로드를 점진적으로 중단(deprecate)하고 최종적으로 비활성화할 것을 제안합니다. 이 변경 후에는 PyPI가 `sdist` (소스 배포, `.tar.gz` / `.zip` 파일)와 `bdist_wheel` (빌드된 Wheel 배포, `.whl` 파일) 유형의 새로운 업로드만 허용하게 됩니다. 중요한 점은, 이미 PyPI에 업로드된 기존 `bdist_egg` 배포나 `.egg` 파일은 제거되지 않으며 계속 다운로드 가능하다는 것입니다.

### 배경 (Rationale)

이 제안은 과거 PEP 527의 선례를 따릅니다. PEP 527은 사용량이 적은 파일 확장자와 배포 유형(예: `bdist_dumb`, `bdist_rpm`, `.tar`, `.tgz` 등)에 대한 업로드 지원을 제거했습니다.

#### `bdist_egg` 형식의 문제점 (The bdist_egg format)

`bdist_egg` 형식은 2004년 `setuptools`에 의해 도입되었지만, 2012년 PEP 427에 의해 표준화된 `wheel` 형식과 기능적으로 유사하면서도 채택률은 매우 낮았습니다.

*   2023년 5월 기준으로 PyPI에 업로드된 전체 배포 중 `bdist_egg`는 0.2%에 불과했습니다.
*   `pip`은 2016년에 `--egg` 옵션을 비권장했으며, `setuptools`는 2019년부터 egg 지원을 비권장하고 있습니다.
*   최신 빌드 도구인 `build`는 `sdist`와 `bdist_wheel`만 지원합니다.

이러한 이유로 PEP 715는 `bdist_egg` 형식의 제거를 제안합니다:

*   **유지보수 부담:** Egg 배포는 PyPI 생태계 전반에 걸쳐 사용이 제한적임에도 불구하고, 플랫폼 측에 불필요한 유지보수 부담을 줍니다.
*   **사용자 혼란:** 두 가지 빌드 배포 형식을 유지하는 것은 사용자들에게 혼란을 주며, `wheel` 대신 egg를 잘못 선택하게 만들 수 있습니다.
*   **표준화 및 중복:** egg 형식은 어떤 PEP나 커뮤니티 표준에 의해 표준화되지 않았으며, 이미 표준화되고 잘 지원되는 `wheel` 형식과 크게 중복됩니다.

#### `.egg` 파일 확장자 (The .egg file extension)

`.egg` 파일 확장자는 `bdist_egg` 배포 형식에만 사용됩니다. 따라서 `bdist_egg` 업로드가 비활성화되면 이 확장자 또한 더 이상 필요하지 않습니다.

### 제거 과정 (Removal Process)

이 PEP는 기존 파일의 제거가 아닌, 새로운 업로드만 금지합니다.

1.  **유예 기간:** PyPI는 1개월의 유예 기간을 제공합니다.
2.  **초기 알림:** 유예 기간 시작 시, 2023년 1월 1일 이후 egg 배포를 업로드한 프로젝트의 관리자들에게 egg 배포 업로드 지원 종료에 대한 이메일이 발송됩니다.
3.  **기간 중 알림:** 유예 기간 동안 egg 배포를 업로드하면 해당 프로젝트의 모든 관리자에게 지원 종료 임박을 다시 알리는 이메일이 발송됩니다.
4.  **지원 중단:** 유예 기간 종료 후, PyPI에서 egg 배포 업로드 지원이 완전히 중단됩니다.

이 과정은 PEP 527의 선례를 따르지만, 유예 기간 동안 모든 프로젝트가 egg를 업로드할 수 있도록 허용하고, 업로드 시마다 추가 알림을 보낸다는 점에서 차이가 있습니다.

### 하위 호환성 (Backwards Compatibility)

*   **제한적인 영향:** 이 PEP는 대다수의 PyPI 사용자 및 프로젝트에 거의 영향을 미치지 않을 것으로 예상됩니다. 지난 1년 반 동안 커뮤니티 조율을 통해 영향을 최소화했습니다.
*   **기존 파일 유지:** 이미 PyPI에 업로드된 모든 egg 배포는 계속 다운로드 가능하여 기존 사용자들에게 영향을 주지 않습니다.

### 보안 문제 (Security Implications)

이 PEP는 egg 배포 업로드 지원 제거와 관련된 긍정적 또는 부정적인 보안 문제를 식별하지 않았습니다.

### 교육 방법 (How To Teach This)

PyPI는 2023년에 egg 배포를 업로드했던 프로젝트 관리자들에게 이메일을 보낼 예정입니다. 또한, PyPI 블로그에 유예 기간의 시작과 종료를 알리는 게시물을 게시할 것입니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.