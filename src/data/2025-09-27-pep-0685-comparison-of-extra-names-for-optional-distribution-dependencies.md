---
title: "[Final] PEP 685 - Comparison of extra names for optional distribution dependencies"
excerpt: "Python Enhancement Proposal 685: 'Comparison of extra names for optional distribution dependencies'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/685/
toc: true
toc_sticky: true
date: 2025-09-27 10:12:15+0900
last_modified_at: 2025-09-27 10:12:15+0900
published: true
---
> **원문 링크:** [PEP 685 - Comparison of extra names for optional distribution dependencies](https://peps.python.org/pep-0685/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 08-Mar-2022


# PEP 685 – 선택적 배포 종속성(`extra name`) 비교를 위한 이름 정규화

## 개요 (Abstract)

이 PEP는 배포 `extra name`을 비교할 때 어떻게 이름을 정규화해야 하는지를 명시합니다. 이를 통해 도구들이 `extra name`을 찾지 못하거나, 의도치 않게 다른 이름과 일치하는 것을 방지합니다.

## 도입 배경 (Motivation)

`Provides-Extra` 코어 메타데이터 사양은 `extra`의 이름이 "유효한 Python 식별자(identifier)여야 한다"고 명시하고 있습니다. 그러나 `extra name`이 비교를 위해 어떻게 작성되거나 정규화되어야 하는지에 대한 다른 PyPA(Python Packaging Authority) 사양은 존재하지 않았습니다.

기존 패키징 관련 코드의 양을 고려할 때, 커뮤니티의 현재 관행을 평가하고 대부분의 기존 코드를 손상시키지 않으면서 도구 작성자들이 따를 수 있는 표준을 제정하는 것이 중요했습니다. `adhoc-ssl` `extra` 이름이 `pip 22`에서 `adhoc_ssl`과 동일하게 간주되지 않는다는 초기 논의에서 일관된 표준이 없다는 문제가 제기되었습니다.

## 선택 이유 (Rationale)

PEP 503은 배포 이름(`distribution name`)을 `re.sub(r"[-_.]+", "-", name).lower()`와 같이 정규화하는 방법을 명시하고 있습니다. 이 방법은 `-`, `_`, `.` 문자들의 연속을 하나의 `-`로 축소시킵니다. 하지만 이는 코어 메타데이터 2.2 사양의 `extra name`에 대한 유효한 Python 식별자를 생성하지 않습니다.

`setuptools 60`은 `re.sub(r'[^A-Za-z0-9-.]+', '_', name).lower()`를 통해 정규화를 수행합니다. 이 방법은 `PEP 503`이 하이픈(`-`)을 사용하는 것과 달리 밑줄(`_`)을 사용하며, `PEP 508`에서 허용하는 문자 외의 문자도 정규화합니다.

`pip 22`의 "extra 정규화 동작은 상당히 복잡하고 불규칙하다"는 평가 때문에 고려되지 않았습니다.

PEP 685는 `PEP 508`과 `PEP 503`의 이름 정규화 방식을 따르기로 결정했습니다. 이는 광범위한 기존 이름에 대한 하위 호환성을 유지하면서 장기적으로 더 간결하고 일관된 표준을 제공합니다.

## 사양 (Specification)

`extra name`을 비교할 때, 도구는 `PEP 503`에서 이름에 대해 정의한 `re.sub(r"[-_.]+", "-", name).lower()` 의미론을 사용하여 비교 대상 이름을 **반드시(MUST)** 정규화해야 합니다.

코어 메타데이터 사양은 `Provides-Extra`에 허용되는 이름이 `PEP 508`이 이름에 대해 명시하는 것과 일치하도록 업데이트될 것입니다. 이는 `extra name`이 `Name` 필드와 일치하게 만듭니다. 이 변경으로 인해 코어 메타데이터 버전은 `2.3`으로 증가할 것입니다.

코어 메타데이터를 작성하는 도구는 `extra name`을 정규화된 형식으로 **반드시(MUST)** 작성해야 합니다. 이는 `Provides-Extra` 필드와 `Requires-Dist` 필드에서 사용될 때의 `extra` 마커에 적용됩니다.

메타데이터를 생성하는 도구는 사용자가 동일한 이름으로 정규화되는 두 개 이상의 `extra name`을 지정한 경우 오류를 **반드시(MUST)** 발생시켜야 합니다. 또한, 지정된 코어 메타데이터 버전에 적합하지 않은 유효하지 않은 `extra name`이 제공되면 오류를 **반드시(MUST)** 발생시켜야 합니다. 프로젝트의 메타데이터가 이전 코어 메타데이터 버전을 지정하고 이름이 최신 코어 메타데이터 버전에서는 유효하지 않은 경우, 해당 메타데이터를 읽는 도구는 사용자에게 경고를 **해야 합니다(SHOULD)** . 도구는 유효하지 않은 `extra name`을 읽을 때 사용자에게 경고를 **해야 하며(SHOULD)** , 모호함을 피하기 위해 해당 이름을 무시해야 합니다. 도구는 원한다면 유효하지 않은 이름을 읽을 때 경고 대신 오류를 발생시킬 **수 있습니다(MAY)** .

## 하위 호환성 (Backwards Compatibility)

`PEP 503` 정규화 및 `PEP 508` 이름 허용으로 전환함으로써 모든 기존의 유효한 이름은 계속 유효합니다.

PyPI의 휠(wheel) 컬렉션을 조사한 결과, `extra name` 충돌 위험은 PyPI의 모든 `extra name`(유효 여부 불문, 단일 패키지 내만 고려하지 않음)을 고려할 때 73개 인스턴스로 제한되며, 유효한 이름만 볼 경우 단 3개의 충돌만 발생합니다:
- `dev-test` : `dev_test`, `dev-test`, `dev.test`
- `dev-lint` : `dev-lint`, `dev.lint`, `dev_lint`
- `apache-beam` : `apache-beam`, `apache.beam`

코어 메타데이터를 작성하는 도구가 정규화된 이름만 기록하도록 요구함으로써, 기존의 유효하지 않은 `extra name` 문제는 시간이 지남에 따라 줄어들 것입니다.

## 보안 영향 (Security Implications)

충돌하는 `extra name`을 가진 배포판의 경우, 도구가 시스템의 보안을 약화시킬 수 있는 종속성을 설치하게 될 가능성이 있습니다. 이는 가설적인 시나리오이며, 발생하더라도 종속성을 함께 가져온 배포판보다는 그러한 `extra name`을 지정하는 배포판의 보안 문제일 가능성이 더 높습니다.

## 교육 방법 (How to Teach This)

이 변경사항은 사용자들에게 일상적으로 투명하게 적용될 것입니다. 충돌하는 `extra name`을 선택할 때 사용자에게 교육하거나 중단시키는 것은 도구들의 역할입니다.

## 참조 구현 (Reference Implementation)

위 코드 외에 별도의 참조 구현은 제공되지 않지만, `packaging` 프로젝트의 `packaging.utils` 모듈에서 `extra name` 정규화 및 비교 기능을 제공할 것으로 예상됩니다. 만약 이 프로젝트가 메타데이터를 작성하는 기능을 얻게 된다면, 이 PEP도 구현할 것입니다.

## 전환 계획 (Transition Plan)

빌드 도구가 버전 2.3 및 이 PEP에 부합하는 코어 메타데이터를 생성하지만, 이 PEP를 알지 못하는 도구(해당 도구가 직접 지원하지 않는 코어 메타데이터 버전을 읽으려고 시도하는 경우)에 의해 소비될 위험이 있습니다. 이러한 경우, 사용자가 이전에 작동했지만 이제는 실패하는 비정규화된 이름으로 `extra`를 지정할 가능성이 있습니다.

따라서, 사용자가 정규화되지 않은 `extra name`을 지정하고 있음을(따라서 미래에 문제가 될 수 있음을) 알릴 수 있도록, 이 PEP의 소비자(consumer)가 생산자(producer)보다 우선적으로 업데이트되어야 합니다.

## 기각된 아이디어 (Rejected Ideas)

### `setuptools 60`의 정규화 사용

처음에는 하위 호환성 문제를 최소화하기 위해 `setuptools`의 `safe_extra()`를 정규화에 사용할 것을 제안했습니다. 그러나 PyPI의 다양한 휠을 확인한 결과, 모든 이름을 `PEP 508` 및 `PEP 503` 의미론으로 표준화하는 것이 하위 호환성 문제를 최소화하면서 장기적으로 더 쉽고 나은 방법이라는 것이 명확해졌습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.