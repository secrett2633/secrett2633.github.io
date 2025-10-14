---
title: "[Final] PEP 360 - Externally Maintained Packages"
excerpt: "Python Enhancement Proposal 360: 'Externally Maintained Packages'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/360/
toc: true
toc_sticky: true
date: 2025-09-26 19:07:10+0900
last_modified_at: 2025-09-26 19:07:10+0900
published: true
---
> **원문 링크:** [PEP 360 - Externally Maintained Packages](https://peps.python.org/pep-0360/)
>
> **상태:** Final | **유형:** Process | **작성일:** 30-May-2006

PEP 360 – 외부 관리 패키지 (Externally Maintained Packages)

## 요약 (Abstract)
Python 표준 라이브러리 (stdlib) 외부에 개발된 훌륭한 Python 소프트웨어들이 많이 있습니다. 때로는 Python이 제공하는 도구의 공백을 메우기 위해 이러한 외부 관리 패키지들을 stdlib에 포함하는 것이 합리적입니다.

하지만 패키지가 외부에서 관리된다는 것은 Python 개발자들이 패키지의 발전과 유지보수에 대한 직접적인 통제권을 갖지 못한다는 것을 의미합니다. 일부 패키지 개발자들은 버그 보고서와 패치가 Python 저장소에 직접 적용되기보다는 자신들을 먼저 거치기를 선호합니다.

이 PEP는 Python 저장소 외부에서 관리되는 stdlib 내 패키지들의 세부 정보를 기록하는 것을 목표로 합니다. 특히, 각 패키지의 특정 유지보수 요구사항을 추적하기 위함입니다. 버그를 수정하고 Python이 지원하는 모든 플랫폼에서 코드가 계속 실행되도록 하기 위해 필요한 변경 사항은 연락 담당 개발자를 거치지 않고 Python 저장소에 직접 적용될 것임을 명시해야 합니다. 이는 Python 자체가 단일 버그로 인해 지연되는 것을 방지하고 전체 프로세스가 필요에 따라 확장될 수 있도록 하기 위함입니다.

또한, 이 PEP는 어떤 패키지 버전이 어떤 Python 버전과 함께 릴리스되었는지 사람들이 알 수 있도록 합니다.

**경고 (Warning):**
이 PEP에 새로운 모듈을 추가해서는 안 됩니다. Python 코드 저장소에 체크인된 코드의 외부 관리를 성문화하는 것은 위험하다고 판단되었습니다. 코드 기여자들은 Python 코드 저장소에 체크인된 모든 코드에 대해 Python의 개발 방법론이 사용될 것으로 예상해야 합니다.

## 외부 관리 패키지 (Externally Maintained Packages)
섹션 제목은 Python 표준 라이브러리 외부에서 알려진 패키지의 이름입니다. "표준 라이브러리 이름 (Standard library name)"은 Python 내에서 패키지의 이름입니다. "연락 담당자 (Contact person)"는 패키지 유지보수를 담당하는 Python 개발자입니다. "동기화 이력 (Synchronisation history)"은 각 Python 버전에 포함된 외부 패키지 버전 (이전 Python 릴리스와 다른 경우)을 나열합니다.

### ElementTree
*   웹사이트: [http://effbot.org/zone/element-index.htm](http://effbot.org/zone/element-index.htm)
*   표준 라이브러리 이름: `xml.etree`
*   연락 담당자: Fredrik Lundh
    *   Fredrik은 ElementTree의 유지보수 권한을 핵심 Python 개발 팀에 양도했습니다.

### Expat XML 파서 (Expat XML parser)
*   웹사이트: [http://www.libexpat.org/](http://www.libexpat.org/)
*   표준 라이브러리 이름: N/A (이것은 파서 자체를 의미하며, Python 바인딩은 아닙니다.)
*   연락 담당자: 없음

### Optik
*   웹사이트: [http://optik.sourceforge.net/](http://optik.sourceforge.net/)
*   표준 라이브러리 이름: `optparse`
*   연락 담당자: Greg Ward
    *   외부 개발은 중단된 것으로 보입니다. 새로운 애플리케이션의 경우, `optparse` 자체는 `argparse`로 대부분 대체되었습니다.

### wsgiref
*   웹사이트: 없음
*   표준 라이브러리 이름: `wsgiref`
*   연락 담당자: Phillip J. Eby
    *   이 모듈은 표준 라이브러리 내에서 유지보수되지만, 중요한 버그 보고서와 패치는 논의를 위해 Web-SIG 메일링 리스트를 통해 전달되어야 합니다.

## 참고자료 (References)
*   Fredrik의 ElementTree 양도 ([https://mail.python.org/pipermail/python-dev/2012-February/116389.html](https://mail.python.org/pipermail/python-dev/2012-February/116389.html))
*   Web-SIG 메일링 리스트 ([https://mail.python.org/mailman/listinfo/web-sig](https://mail.python.org/mailman/listinfo/web-sig))

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.