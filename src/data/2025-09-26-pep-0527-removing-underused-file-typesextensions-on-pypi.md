---
title: "[Final] PEP 527 - Removing Un(der)used file types/extensions on PyPI"
excerpt: "Python Enhancement Proposal 527: 'Removing Un(der)used file types/extensions on PyPI'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/527/
toc: true
toc_sticky: true
date: 2025-09-26 23:19:32+0900
last_modified_at: 2025-09-26 23:19:32+0900
published: true
---
> **원문 링크:** [PEP 527 - Removing Un(der)used file types/extensions on PyPI](https://peps.python.org/pep-0527/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 23-Aug-2016


# PEP 527 – PyPI에서 미사용/활용도가 낮은 파일 형식/확장자 제거

*   **작성자:** Donald Stufft
*   **상태:** Final
*   **유형:** Standards Track
*   **주제:** Packaging
*   **생성일:** 2016년 8월 23일

## 초록 (Abstract)

이 PEP는 PyPI(Python Package Index)에 특정 미사용 또는 활용도가 낮은 파일 형식 및 확장자를 업로드하는 지원을 중단하고 궁극적으로 제거할 것을 권장합니다. 특히, `bdist_dumb`, `bdist_rpm`, `bdist_dmg`, `bdist_msi`, `bdist_wininst` 유형의 파일 업로드를 더 이상 허용하지 않고, `sdist`, `bdist_wheel`, `bdist_egg` 파일 유형의 새 업로드만 PyPI에서 허용하도록 제안합니다.

또한, 이 PEP는 `.tar.gz` 및 `.zip`을 제외한 `.tar`, `.tar.bz2`, `.tar.xz`, `.tar.Z`, `.tgz`, `.tbz` 등 다른 확장자를 사용하는 `sdist`의 새 업로드 지원을 제거할 것을 제안합니다.

마지막으로, 이 PEP는 PyPI 프로젝트의 각 릴리스(release)당 허용되는 `sdist` 업로드 수를 허용되는 확장자별로 하나가 아닌, 총 하나로 제한할 것을 제안합니다.

## 도입 배경 (Rationale)

### 파일 형식 (File Formats)

현재 PyPI는 여러 파일 형식을 지원하지만, 이들의 유용성이나 생태계 내에서의 일반적인 사용량은 다양합니다. 활용도가 낮은 형식을 계속 지원하는 것은 PyPI 및 도구 작성자에게 유지보수 부담을 가중시키며, PyPI 자체뿐만 아니라 모든 미러(mirror)에 대역폭(bandwidth)과 디스크 공간 비용을 발생시킵니다.

Python 패키징은 여러 수준의 생태계로 이루어져 있으며, PyPI는 주로 프로젝트 소유자로부터 가상 환경(virtual environment) 호환 패키지를 직접 배포하는 데 적합합니다. 이러한 패키지는 최종 사용자나 다운스트림 배포자(예: RPM, deb, MSI 등 시스템 레벨 패키지로 변환하는 경우)에 의해 사용됩니다.

이 PEP는 PyPI가 플랫폼에 구애받지 않는(platform-agnostic) 형식에 집중하여, 자원 봉사자들의 제한된 시간을 여러 플랫폼에 분산시키지 않고 가장 잘 활용하는 것이 전체 생태계를 지원하는 최선의 방법이라고 믿습니다. 또한, 특정 플랫폼에 대해 잘 통합된 패키지를 제공하는 데 가장 적합한 사람들은 해당 플랫폼에 집중하는 사람들이라고 판단합니다.

*   **`bdist_dumb`** : 이름에서 알 수 있듯이 이 형식은 매우 단순하지만, 실제 사용에는 쓸모가 없습니다. 의존성 검색을 위한 메타데이터(metadata)가 없으며, 파일이 생성된 컴퓨터의 하드코딩된 경로를 포함하는 `tarball`에 불과합니다.
*   **`bdist_rpm`** : PyPI에서 `.rpm` 파일을 업로드하여 사용자가 수동으로 다운로드하고 설치할 수 있도록 하지만, `rpm`의 일반적인 사용은 의존성 자동 설치 등을 허용하는 특수 저장소(repository)와 함께 이루어집니다. PyPI는 이러한 기능을 제공하지 않으므로, 이 유형의 파일은 PyPI에서 거의 사용되지 않습니다 (~662,544개 파일 중 약 460개). COPR와 같은 서비스는 `RPM` 파일을 게시하고 사용하는 데 더 나은 메커니즘을 제공합니다.
*   **`bdist_dmg`, `bdist_msi`, `bdist_wininst`** : 이 형식들은 OS별 설치 프로그램으로, 라이브러리를 환경에 설치할 뿐이며, 실제 사용자 대상 애플리케이션 설치(Python 인터프리터 번들링 등)를 위한 것이 아닙니다. `bdist_dmg`와 `bdist_msi`의 사용량은 매우 낮고, `bdist_wininst`는 더 많은 업로드 수(~14,000개)를 보이지만 실제 다운로드의 대부분은 미러링 인프라(mirroring infrastructure)에 의해 발생하며, `bdist_egg` 파일로 쉽게 대체될 수 있습니다. 낮은 사용량과 대체 가능성을 고려하여, 이 세 형식 모두 허용되지 않는 목록에 포함될 것이 제안됩니다.

### 파일 확장자 (File Extensions)

현재 `sdist`는 `.tar.gz`, `.tar`, `.tar.bz2`, `.tar.xz`, `.zip`, `.tar.Z`, `.tgz`, `.tbz` 등 다양한 파일 확장자를 지원합니다. 그러나, 이 중 `.tar.gz`, `.zip`, `.tar.bz2`만이 유의미한 사용량을 보입니다. 여러 형식을 허용하는 것은 PyPI 내부 및 외부 도구 모두에 처리 부담을 가중시키고, 서로 다른 압축 라이브러리 요구사항을 가지며, 동일한 프로젝트/릴리스에 대해 미묘하게 다른 콘텐츠를 가진 `sdist` 파일이 존재할 수 있는 불필요한 상황을 만듭니다.

이 PEP는 `.tar.gz`와 `.zip` 확장자만 `sdist`에 허용할 것을 제안합니다. `.tar.bz2`는 사용량이 적고 `bzip2` 압축을 처리하기 위해 추가 C 라이브러리가 필요하므로 제외됩니다. `tar.gz`는 POSIX 운영체제에서 기본이며, `zip`은 Windows에서 기본이며 `bdist_wheel` 형식도 사용합니다. 두 형식 모두 `bdist_wheel`과 `bdist_egg`에 필요한 동일한 `zlib` C 라이브러리를 사용합니다.

### 릴리스당 `sdist` 개수 제한 (Limiting number of sdists per release)

PyPI의 `sdist`는 특정 소프트웨어 릴리스에 대한 단일 진실 공급원(single source of truth)이어야 합니다. 현재 PyPI는 허용되는 `sdist` 파일 확장자별로 하나의 `sdist`를 업로드할 수 있도록 허용하여, 단일 버전에 대해 여러 개의 진실 공급원이 존재할 수 있습니다. 이는 어떤 `sdist`가 사용되었는지에 따라 발생하는 이상한 버그의 원인이 될 수 있습니다. 이를 해결하기 위해, 이 PEP는 프로젝트 릴리스당 오직 하나의 `sdist`만 허용할 것을 제안합니다.

## 제거 절차 (Removal Process)

이 PEP는 PyPI에서 기존 파일을 제거하는 것이 아니라, 새로운 파일 업로드만 제한할 것을 제안합니다. 이러한 제한은 프로젝트별로 단계적으로 적용되어, 프로젝트가 새로운 제한에 적응할 시간을 가질 수 있도록 합니다.

1.  기존 프로젝트에는 레거시(legacy) 파일 유형 업로드를 허용하는 플래그가 부여됩니다. 새로운 프로젝트는 `.tar.gz` 또는 `.zip` 확장자를 가진 `sdist`, `bdist_wheel`, `bdist_egg` 외에는 업로드할 수 없습니다.
2.  레거시 파일 유형 플래그가 필요하지 않은 기존 프로젝트(즉, 해당 유형의 파일을 업로드한 적이 없는 프로젝트)는 플래그가 제거되어 새로운 제한을 따르게 됩니다.
3.  레거시 플래그가 여전히 부여된 모든 프로젝트의 관리자에게 업로드에 대한 새로운 제한사항과 1개월 후 해당 제한이 적용될 것임을 알리는 이메일이 발송됩니다.
4.  1개월 후 모든 프로젝트에서 레거시 파일 유형 플래그가 제거되며, 해당 파일 유형의 업로드 지원은 PyPI에서 중단됩니다.

이 계획은 기존 파일을 제거하지 않고, 업로드를 방지하는 파일 유형이 특별히 유용하지 않거나(사용되지 않거나) 또는 프로세스에 약간의 변경을 통해 유사한 유형의 파일을 계속 업로드할 수 있기 때문에 최소한의 혼란을 제공할 것입니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.