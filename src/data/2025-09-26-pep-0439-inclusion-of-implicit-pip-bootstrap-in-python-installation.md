---
title: "[Rejected] PEP 439 - Inclusion of implicit pip bootstrap in Python installation"
excerpt: "Python Enhancement Proposal 439: 'Inclusion of implicit pip bootstrap in Python installation'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/439/
toc: true
toc_sticky: true
date: 2025-09-26 21:52:55+0900
last_modified_at: 2025-09-26 21:52:55+0900
published: true
---
> **원문 링크:** [PEP 439 - Inclusion of implicit pip bootstrap in Python installation](https://peps.python.org/pep-0439/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 18-Mar-2013



---
**PEP 439 – Python 설치 시 암묵적인 pip 부트스트랩 포함**

**요약 (Abstract)**

이 PEP는 Python 사용자들이 서드파티 (3rd-party) 모듈을 더 쉽게 사용할 수 있도록, Python 설치 과정에 `pip` 부트스트랩 실행 파일을 포함할 것을 제안합니다. 이 제안은 `pip` 구현체를 Python 표준 라이브러리에 포함시키거나, PEP 427 ("The Wheel Binary Package Format 1.0") 및 `distlib` PEP가 제공하는 것 이상의 패키지 관리 또는 설치 메커니즘을 구현하는 것을 목표로 하지 않습니다.

**PEP 기각 사유 (PEP Rejection Rationale)**

이 PEP는 더 안정적인 방식으로 동일한 결과를 달성할 수 있는 보다 명시적인 메커니즘을 선호하여 기각되었습니다. 더 명시적인 부트스트랩 메커니즘은 PEP 453에 설명되어 있습니다.

**배경 (Rationale)**

현재 서드파티 Python 모듈을 설치하는 사용자 경험은 개선될 여지가 있습니다. 일반적으로 모든 서드파티 모듈은 사용자에게 설치 프로그램을 설치하는 방법을 알려야 하며, 이는 종종 설치 프로그램으로의 링크를 통해 이루어집니다. 이 링크가 오래되었거나, 설치 프로그램 자체를 설치하는 데 필요한 단계가 너무 복잡하여 사용자가 진행을 막는 장애물이 될 수 있습니다.

새로운 사용자들에게 잠재적인 걸림돌이 될 수 있다는 점 때문에, 진입 장벽을 낮추는 데 중점을 둔 대규모 Python 프로젝트들은 서드파티 패키지에 의존하는 것을 꺼려 왔습니다. 표준 Python 설치에 패키지 설치 명령을 포함함으로써, 추가 소프트웨어 설치의 장벽이 크게 줄어들 것으로 기대되었습니다. 이를 통해 Python 프로젝트들이 서드파티 소프트웨어를 재사용할 가능성이 높아질 것이라는 희망이 있었습니다.

또한, Python 커뮤니티는 `pip` 및 `setuptools`의 현재 부트스트랩 절차와 관련된 복잡성 문제를 겪고 있습니다. 이들은 모두 약간씩 다른 사용법을 가진 자체 부트스트랩 다운로드 파일을 가지고 있으며, 심지어 일부 경우에는 서로를 참조하기도 합니다. 이들 모두에게 공통적이고 간단하게 사용할 수 있는 단일 부트스트랩이 있다면 훨씬 더 바람직할 것입니다.

이 제안은 Python 표준 라이브러리에 점점 더 많은 소프트웨어를 포함하려는 제안의 수를 줄이고, 결과적으로 더 인기 있는 Python 소프트웨어가 Python 설치 업그레이드 없이도 더 쉽게 업그레이드될 수 있도록 하기를 희망했습니다.

**제안 (Proposal)**

부트스트랩은 PyPI에서 설치 파일을 다운로드하여 `pip` 구현체와 `setuptools`를 설치할 것입니다. 이 제안은 패키징의 두 가지 구성 요소에 영향을 미칩니다: `pip` 부트스트랩과, 더 쉬운 패키지 설치로 인한 패키지 발행(publishing) 수정 사항입니다.

이 제안의 핵심은 `pip` 사용 경험이 `pip`를 설치할 필요가 없어야 한다는 것입니다.

**pip 부트스트랩 (The pip bootstrap)**

Python 설치에는 "pip3"이라는 실행 파일이 포함되어 `pip` 메커니즘을 import 시도합니다 (이름 지정 이유 등은 PEP 394 참조). 성공하면 `pip` 명령이 정상적으로 진행됩니다. 실패하면 `pip` 구현체와 `setuptools` wheel 파일을 다운로드하여 `pip`를 부트스트랩합니다. 여기서 "pip 구현체"의 설치는 `setuptools` 및 `virtualenv`의 설치를 의미합니다. 일단 설치되면 `pip` 명령은 정상적으로 진행됩니다. 부트스트랩 프로세스가 완료되면 "pip3" 명령은 더 이상 부트스트랩이 아니라 완전한 `pip` 명령이 됩니다.

전체 `pip` 코드 대신 부트스트랩이 사용되는 이유는 `pip`를 번들로 제공할 필요가 없으며, `pip`가 일반적인 Python 업그레이드 기간 및 프로세스 외부에서 업그레이드될 수 있도록 하기 위함입니다.

`sudo` 관련 문제를 피하기 위해, 부트스트랩은 기본적으로 PEP 370에 정의되고 Python 2.6/3.0에 구현된 사용자별 `site-packages` 디렉토리에 `pip` 구현체를 설치하도록 합니다. 시스템 Python에 설치하는 것을 피함으로써 다른 패키징 시스템 (예: Linux 시스템)과의 충돌도 방지합니다. 사용자가 PEP 405 `virtual environment` 내에 있는 경우, `pip` 구현체는 해당 `virtual environment`에 설치됩니다.

부트스트랩 프로세스는 다음과 같이 진행됩니다:
1.  사용자 시스템에 Python (3.4 이상)이 설치되어 있습니다.
2.  Python 설치의 "scripts" 디렉토리에는 "pip3"라는 부트스트랩 스크립트가 있습니다.
3.  사용자는 일반적으로 "pip3 install <package>"와 같은 `pip` 명령을 호출합니다 (예: "pip3 install Django").
4.  부트스트랩 스크립트는 `pip` 구현체를 import 시도합니다.
5.  성공하면 `pip` 명령이 정상적으로 처리됩니다. 중단됩니다.
6.  `pip` 구현체를 import하는 데 실패하면, 부트스트랩은 사용자에게 "`pip`를 설치해야 한다"고 알립니다.
7.  `pip`를 시스템 전체 `site-packages`로 설치할지, 사용자 전용 패키지로 설치할지 사용자에게 묻습니다. 이 선택은 비대화형 사용을 위해 `pip`의 명령줄 옵션으로도 제공될 것입니다.
8.  부트스트랩은 PyPI에 연결하여 최신 다운로드 wheel 파일을 가져옵니다 (PEP 427 참조). 파일을 다운로드한 후 "`python setup.py install`"을 사용하여 설치합니다.
9.  이제 `pip` 도구는 `pip` 구현체를 import하고 요청된 사용자 명령을 정상적으로 계속 처리합니다.

사용자들은 공용 인터넷에 접근할 수 없고 로컬 패키지 저장소에만 의존하는 환경에서 실행될 수 있습니다. 이들은 "`pip3 install`" 명령에 "`-i`" (Python Package Index의 기본 URL) 인수를 사용하여 PyPI를 가리키는 기본 인덱스 URL을 재정의할 것입니다.

일부 사용자는 `pip` 구현체 파일을 가져올 적절한 인터넷 접속이 없을 수 있습니다. 이러한 사용자들은 `setuptools` 및 `pip` tar 파일을 수동으로 다운로드하여 설치할 수 있습니다. 이 사용 사례에 대한 특정 지원을 추가하는 것은 불필요합니다.

`pip` 구현체 설치 파일의 다운로드는 안전하게 수행될 것입니다. `pypi.python.org`로부터의 전송은 CA 인증서 확인이 수행되는 HTTPS를 통해 이루어집니다. 이 기능은 운영체제 인증서를 사용하여 Python 3.4 이상에서 제공될 것입니다 (PEP XXXX 참조).

인덱스 위치 및 다운로드 옵션을 제어하는 인수 외에도, "pip3" 부트스트랩 명령은 상세도 (verbosity), 정숙도 (quietness), 로깅 (logging)을 위한 추가 표준 `pip` 옵션을 지원할 수 있습니다.

"pip3" 명령은 부트스트랩 과정에서 사용되며 그 외에는 무시되는 두 가지 새로운 명령줄 옵션을 지원할 것입니다. 이들은 `pip` 구현체가 설치될 위치를 제어합니다:
*   `--bootstrap`: 사용자 패키지 디렉토리에 설치합니다. 이 옵션의 이름은 선호되는 설치 옵션으로 홍보하기 위해 선택되었습니다.
*   `--bootstrap-to-system`: 시스템 `site-packages` 디렉토리에 설치합니다.

이러한 명령줄 옵션은 `pip` 구현체에서도 구현되어야 하지만, 그 외에는 무시될 것입니다.

`pip`가 사용자 패키지 디렉토리에 설치된 경우, `pip`가 패키지를 기본적으로 사용자 패키지 디렉토리에 설치하도록 하는 것을 고려해야 합니다.

"`pip3`" 명령의 "`--no-install`" 옵션은 부트스트랩 프로세스에 영향을 미치지 않을 것입니다.

**패키지 발행 수정 (Modifications to publishing packages)**

`PyPI`에 패키지를 발행하는 도구가 될 "pypublish"라는 새로운 Python 패키지가 제안되었습니다. 이는 현재의 "`python setup.py register`" 및 "`python setup.py upload`" `distutils` 명령을 대체할 것입니다. `Python` 릴리스 주기의 측정과 광범위한 기존 Python 설치로 인해 이러한 명령들은 버그 수정 및 확장이 어렵습니다. 또한, "`register`" 및 "`upload`" 명령이 인증서 유효성 검사를 포함한 HTTPS를 통해 수행될 수 있기를 바랍니다. CA 인증서 키체인을 Python과 함께 배포하는 것이 현실적으로 어렵기 때문에 (키체인 업데이트 관리가 상당히 어렵기 때문), 이러한 명령과 관련 키체인이 Python 자체 외부에서 설치 및 업그레이드될 수 있도록 하는 것이 바람직합니다.

패키지 등록 및 업로드를 위한 기존 `distutils` 메커니즘은 유지되지만, 사용 중단 경고 (deprecation warning)가 표시될 것입니다.

**구현 (Implementation)**

이 PEP에 의해 요구되는 `pip` 변경 사항은 해당 프로젝트의 이슈 트래커에서 추적되고 있습니다. 가장 주목할 만한 것은 `pip` 명령줄에 `--bootstrap` 및 `--bootstrap-to-system`이 추가되는 것입니다.

`pip` 및 `setuptools` 프로젝트가 wheel 형식 다운로드를 배포하는 것이 바람직합니다.

이 구현에 필요한 코드는 위에 설명된 "pip3" 명령입니다. 추가 "pypublish"는 이 PEP 작업 범위 외부에서 개발될 수 있습니다.

마지막으로, "pip3"가 Python 2.6+로 포팅되어 단일 명령으로 기존 `pip`, `setuptools`, `virtualenv` (부트스트랩에 추가될 것임) 부트스트랩 스크립트를 대체할 수 있다면 바람직할 것입니다. 해당 부트스트랩이 향후 Python 2.7 릴리스에 포함되는 것도 매우 바람직할 것입니다.

**위험 (Risks)**

`pip` 구현체 다운로드 서명에 사용되는 키가 손상될 수 있으며, 이 PEP는 현재 키 폐기 (key revocation) 메커니즘을 제안하지 않습니다.

Perl 패키지 설치 프로그램 중에도 "pip"라는 이름이 있습니다. 이는 매우 드물고 일반적으로 사용되지 않습니다. Linux의 Fedora 버전은 역사적으로 Python의 "pip"를 "python-pip"로, Perl의 "pip"를 "perl-pip"로 명명했습니다. 이 정책은 변경되어 향후 업그레이드된 Fedora 설치에서는 Python의 "pip"에 "pip"라는 이름을 사용할 것입니다. 기존 (업그레이드되지 않은) 설치에는 Python "pip"에 대한 이전 이름이 여전히 존재하지만, 혼동의 가능성은 이제 훨씬 줄어들었습니다.

**참고 자료 (References)**

*   pip 이슈 트래킹 (이 PEP에 필요한 작업): [https://github.com/pypa/pip/issues/863](https://github.com/pypa/pip/issues/863)
*   Fedora의 python-pip 패키지가 /usr/bin/pip를 제공하지 않음: [https://bugzilla.redhat.com/show_bug.cgi?id=958377](https://bugzilla.redhat.com/show_bug.cgi?id=958377)

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.