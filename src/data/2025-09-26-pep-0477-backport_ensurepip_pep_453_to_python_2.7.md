---
title: "[Final] PEP 477 - Backport ensurepip (PEP 453) to Python 2.7"
excerpt: "Python Enhancement Proposal 477: 'Backport ensurepip (PEP 453) to Python 2.7'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/477/
toc: true
toc_sticky: true
date: 2025-09-26 22:22:24+0900
last_modified_at: 2025-09-26 22:22:24+0900
published: true
---
> **원문 링크:** [PEP 477 - Backport ensurepip (PEP 453) to Python 2.7](https://peps.python.org/pep-0477/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 26-Aug-2014

## PEP 477 – Python 2.7에 ensurepip (PEP 453) 백포트

### 개요

이 문서는 PEP 453에 의해 Python 3.4에 추가된 `ensurepip` 모듈을 Python 2.7 버전으로 백포트(backport)할 것을 제안합니다. 또한, Python 2.7 Windows 및 OSX 설치 프로그램에 `ensurepip`의 자동 호출 기능을 추가할 것을 제안합니다. 하지만 `Makefile`에는 자동 호출을 추가하지 않을 것을 명시합니다.

더불어, 패키지 배포 및 설치 가이드에 대한 문서 변경 사항을 Python 3.4와 동일하게 업데이트하여 `ensurepip` 모듈을 사용하여 설치 프로그램을 부트스트랩하는 방법을 참조하도록 제안합니다.

### 도입 배경 (Rationale)

Python 2.7은 사실상 Python의 장기 지원(LTS) 릴리스이자 2.x 시리즈의 마지막 버전이며, 여전히 많은 사용자들이 Python 2.7을 주 버전으로 사용하고 있습니다. 이 사용자들은 더 넓은 Python 생태계에 참여하기 위해 패키징 도구를 부트스트랩하는 올바른 방법을 수동으로 찾아야만 했습니다.

이 PEP는 최종 사용자들이 더 넓은 Python 생태계에 최대한 쉽게 참여할 수 있도록 하는 것이 세 가지 주요 이유로 중요하다고 주장합니다.

1.  **Python 2.x에서 3.x로의 마이그레이션 지원:** Python 2.x에서 3.x로의 마이그레이션은 `six`, `modernize`, `future`와 같은 서드파티 모듈을 통해 완화될 수 있는 여러 난관을 가지고 있습니다. 그러나 이러한 도구를 사용하려면 프로젝트를 사용하는 모든 사람이 이 패키지들을 설치할 도구를 가지고 있어야 합니다.
2.  **새로운 패키징 표준 및 도구 활용:** Python 2.x에서 3.x로의 마이그레이션을 돕는 도구 외에도, Python 3에 새로 추가되었지만 PyPI에서 백포트 버전으로 제공되는 여러 모듈이 있습니다. 이는 사람들이 2.x 및 3.x 호환 소프트웨어를 작성하고, Python 2에서 Python 3의 일부 새로운 기능을 사용할 수 있도록 돕습니다. 또한, 사용자들은 제안되고 있는 새로운 표준을 따르는 Python 패키지를 생성하기 위한 여러 도구(`setuptools`, `Wheel`, `twine` 등)가 필요합니다. 이러한 도구들은 더 안전하고, 빠르며, 신뢰할 수 있는 패키징 도구 체인을 가능하게 하지만, 먼저 패키지 관리자를 설치하는 방법을 알아야 한다면 사용하기 어려울 수 있습니다.
3.  **Python 생태계 접근성 향상:** Python의 가장 큰 강점 중 하나는 PyPI를 통해 배포되는 방대한 라이브러리와 프로젝트 생태계입니다. 그러나 이 넓은 생태계의 혜택을 의미 있게 누리려면, 일부 신규 사용자를 포함한 최종 사용자들이 어떤 패키지 관리자를 얻을지, 어떻게 얻을지, 그리고 최종적으로 먼저 설치해야 하는지에 대한 결정을 내려야 합니다.

또한, 다른 Python 구현체들도 PEP 453의 이점을 인지하고 있으며, PyPy와 Jython 모두 `ensurepip`를 2.7 런타임으로 백포트할 계획을 가지고 있습니다.

### 자동 호출 (Automatic Invocation)

PEP 453은 `ensurepip`가 `Makefile` 및 Windows, OSX 설치 프로그램에서 기본적으로 자동 호출되도록 했습니다. 이를 통해 기본적으로 모든 사용자가 `pip`이 이미 설치된 Python을 얻을 수 있었습니다. 그러나 이 PEP는 Python 2.7 Windows 및 macOS X 설치 프로그램에는 적합하지만, Python 2.7의 일반적인 `Makefile`에는 적합하지 않다고 판단합니다.

`Makefile`의 주요 사용자들은 Python 자체를 배포하는 다운스트림 패키지 관리자입니다. 이러한 다운스트림 배포자들은 일반적으로 `pip`이 `ensurepip`를 통해 설치되는 것을 원하지 않으며, 최종 사용자가 자체 패키지 관리자를 통해 설치하기를 선호합니다. `Makefile`에서 `ensurepip`를 자동으로 호출하지 않으면, 이러한 배포자들이 `ensurepip`가 백포트되었다는 사실을 무시하고 `pip`이 그것을 통해 설치되지 않도록 할 수 있습니다.

OSX 및 Windows 설치 프로그램의 주요 사용자들은 자신의 컴퓨터에 Python을 설치하려는 최종 사용자들입니다. 이 사용자들에게는 더 지원되는 메커니즘을 통해 Python에 `pip`을 설치할 수 있는 패키지 관리자가 없습니다. 이러한 이유로 이 PEP는 OSX 및 Windows에서 기본적으로 설치하는 것이 최선의 조치라고 믿습니다.

### 문서 (Documentation)

이 PEP의 일환으로, Python 3.4용으로 업데이트된 패키징 배포 및 설치 가이드가 Python 2.7으로 백포트될 것입니다.

### 다운스트림 배포자에 의한 `ensurepip` 비활성화

`venv` 모듈에서 사용되기 때문에 다운스트림 배포자들은 Python 3.4에서 `ensurepip` 모듈을 비활성화할 수 없습니다. 그러나 Python 2.7에는 그러한 모듈이 없으므로, 다운스트림 배포자들이 `ensurepip` 모듈을 패치하여 아무것도 설치하지 못하도록 하는 것이 명시적으로 허용됩니다.

만약 다운스트림 배포자가 Python 2.7에서 `ensurepip`를 완전히 비활성화하고자 한다면, 적어도 모듈은 제공하고 `python -m ensurepip` 스타일 호출은 허용해야 합니다. 하지만 이 경우 오류를 발생시키거나 0이 아닌 종료 코드로 종료하고, `stderr`에 사용자들이 `ensurepip` 대신 무엇을 사용해야 하는지 안내하는 오류 메시지를 출력해야 합니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.