---
title: "[Final] PEP 373 - Python 2.7 Release Schedule"
excerpt: "Python Enhancement Proposal 373: 'Python 2.7 Release Schedule'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/373/
toc: true
toc_sticky: true
date: 2025-09-26 20:56:29+0900
last_modified_at: 2025-09-26 20:56:29+0900
published: true
---
> **원문 링크:** [PEP 373 - Python 2.7 Release Schedule](https://peps.python.org/pep-0373/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 03-Nov-2008


### **제목**
PEP 373 – Python 2.7 릴리스 스케줄

### **작성자 및 상태**
*   **작성자:** Benjamin Peterson <benjamin at python.org>
*   **상태:** Final (최종)
*   **유형:** Informational (정보성)
*   **주제:** Release (릴리스)
*   **생성일:** 2008년 11월 3일
*   **Python 버전:** 2.7

### **개요 (Abstract)**
이 문서는 Python 2.7의 개발 및 릴리스 스케줄을 설명합니다. Python 2.7은 Python 2.x 시리즈의 마지막 버전이며, Python 3으로 계승됩니다. 일반적인 개요는 python.org의 "Sunsetting Python 2" FAQ를 참조하십시오.

### **2014년 4월 업데이트 (Update (April 2014))**
Python 2.7의 EOL (End Of Life, 지원 종료일) 또는 sunset date가 5년 연장되어 2020년으로 변경되었습니다. 이 결정은 Python 2.7의 상태를 명확히 하고 아직 Python 3으로 마이그레이션할 수 없는 사용자들의 우려를 해소하기 위해 이루어졌습니다. PEP 466도 참고하십시오.

이 선언은 버그 수정 릴리스가 정기적으로 이루어질 것을 보장하지는 않지만, Python 2.7에 버그 수정을 기여하고자 하는 자원봉사자들을 지원하고 앞으로도 수년간 Python 2를 지원해야 하는 벤더(vendor)들의 요구를 충족시킬 것입니다.

Python 2.8은 존재하지 않을 것입니다 (PEP 404 참조).

### **릴리스 관리자 및 팀 (Release Manager and Crew)**
*   **2.7 릴리스 관리자:** Benjamin Peterson
*   **Windows 설치 프로그램:** Steve Dower
*   **Mac 설치 프로그램:** Ned Deily

### **유지보수 릴리스 (Maintenance releases)**
2.x 시리즈의 마지막 버전인 2.7은 2020년까지 버그 수정 지원을 받았습니다. 공식적인 지원은 2020년 1월 1일에 중단되었고, 2.7.18 코드 동결(code freeze)은 2020년 1월 1일에 발생했지만, 최종 릴리스는 그 이후에 이루어졌습니다.

이전 유지보수 릴리스 날짜는 다음과 같습니다:
*   2.7.1: 2010-11-27
*   2.7.2: 2011-07-21
*   2.7.3rc1: 2012-02-23
*   2.7.3rc2: 2012-03-15
*   2.7.3: 2012-03-09
*   2.7.4rc1: 2013-03-23
*   2.7.4: 2013-04-06
*   2.7.5: 2013-05-12
*   2.7.6rc1: 2013-10-26
*   2.7.6: 2013-11-10
*   2.7.7rc1: 2014-05-17
*   2.7.7: 2014-05-31
*   2.7.8: 2014-06-30
*   2.7.9rc1: 2014-11-26
*   2.7.9: 2014-12-10
*   2.7.10rc1: 2015-05-09
*   2.7.10: 2015-05-23
*   2.7.11rc1: 2015-11-21
*   2.7.11: 2015-12-05
*   2.7.12: 2016-06-25
*   2.7.13rc1: 2016-12-03
*   2.7.13: 2016-12-17
*   2.7.14rc1: 2017-08-26
*   2.7.14: 2017-09-16
*   2.7.15rc1: 2018-04-14
*   2.7.15: 2018-05-01
*   2.7.16rc: 2019-02-16
*   2.7.16: 2019-03-02
*   2.7.17rc1: 2019-10-05
*   2.7.17: 2019-10-19
*   2.7.18rc1: 2020-04-04
*   2.7.18: 2020-04-20

### **2.7.0 릴리스 스케줄 (2.7.0 Release Schedule)**
2.7.0의 릴리스 스케줄은 다음과 같았습니다:
*   2.7 alpha 1: 2009-12-05
*   2.7 alpha 2: 2010-01-09
*   2.7 alpha 3: 2010-02-06
*   2.7 alpha 4: 2010-03-06
*   2.7 beta 1: 2010-04-03
*   2.7 beta 2: 2010-05-08
*   2.7 rc1: 2010-06-05
*   2.7 rc2: 2010-06-19
*   2.7 final: 2010-07-03

### **2.7의 잠재적 기능 (Possible features for 2.7)**
이 섹션에는 아무런 내용이 없습니다. (참고: 핵심 언어 변경에 대한 모라토리엄(moratorium)이 시행 중입니다.)

### **참고 자료 (References)**
*   “The Python 2 death march” on python-dev
*   Petition: abandon plans to ship a 2.7.18 in April
*   [RELEASE] Python 2.7.18, the end of an era

### **저작권 (Copyright)**
이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.