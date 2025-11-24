---
title: "[Deferred] PEP 337 - Logging Usage in the Standard Library"
excerpt: "Python Enhancement Proposal 337: 'Logging Usage in the Standard Library'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/337/
toc: true
toc_sticky: true
date: 2025-09-26 18:45:28+0900
last_modified_at: 2025-09-26 18:45:28+0900
published: true
---
> **원문 링크:** [PEP 337 - Logging Usage in the Standard Library](https://peps.python.org/pep-0337/)
>
> **상태:** Deferred | **유형:** Standards Track | **작성일:** 02-Oct-2004

PEP 337 – 표준 라이브러리에서의 로깅 사용법

이 문서는 Python 표준 라이브러리 내에서 로깅 시스템 (PEP 282)을 사용하는 표준을 정의합니다.

---

## 초록 (Abstract)
이 PEP는 표준 라이브러리에서 로깅 시스템 (PEP 282) 사용에 대한 표준을 정의합니다. 이 PEP를 구현하면 데몬(daemon) 애플리케이션 개발이 단순해집니다. 단점으로는 이 PEP가 수많은 표준 모듈에 약간의 수정 (하지만 이전 버전과 호환되는 방식으로)을 요구한다는 점입니다.

이 PEP가 구현되면 다음과 같은 필터링 방식을 사용할 수 있습니다.

```python
logging.getLogger('py.BaseHTTPServer').setLevel(logging.FATAL)
```

## PEP 연기 (PEP Deferral)
이 PEP에서 다루는 개념들에 대한 추가적인 탐색은 현재 이 PEP의 목표를 홍보하고 피드백을 수집 및 통합하며 이를 효과적으로 수행할 충분한 시간을 가진 '챔피언(champion)'이 부족하여 연기되었습니다.

## 배경 (Rationale)
`stdout` 또는 `stderr`로 출력을 하는 것이 비실용적인 몇 가지 상황이 있습니다.

*   프레임워크가 표준 출력을 특정 파일로 리디렉션하는 것을 허용하지 않고, 다른 형태의 로깅 사용을 가정하는 데몬 애플리케이션. 예를 들어, *nix 시스템의 `syslog`나 WinNT+ 시스템의 `EventLog`가 있습니다.
*   모든 새로운 로그 항목을 별도의 팝업 창(예: 사라지는 OSD)에 출력하기를 원하는 GUI 애플리케이션.

또한, 때때로 애플리케이션은 소스나 심각도에 따라 출력 항목을 필터링하기를 원합니다. 이러한 요구사항은 간단한 리디렉션으로는 구현할 수 없습니다.

마지막으로, 때때로 출력에 이벤트 타임스탬프를 표시해야 하는데, 이는 로깅 시스템을 사용하여 쉽게 달성할 수 있습니다.

## 제안 (Proposal)
데몬 및 GUI 애플리케이션에 사용될 수 있는 모든 모듈은 `print` 또는 `sys.stdout.write` 대신 로깅 시스템을 사용하도록 재작성되어야 합니다.

수정된 모든 모듈의 시작 부분에는 다음과 같은 코드가 포함되어야 합니다.

```python
import logging
_log = logging.getLogger('py.<module-name>')
```
Python과 함께 배포되는 표준 라이브러리에 포함된 모든 모듈은 `py.` 접두사를 사용해야 하며, 오직 그러한 모듈만 이 접두사를 사용해야 합니다 (검증 불가능). `_log`의 사용은 의도적인데, 이는 자동으로 내보내지 않기 위함입니다. 로깅을 하나의 클래스 내에서만 사용하는 모듈의 경우, 클래스 정의 내에서 로거를 다음과 같이 생성할 수 있습니다.

```python
class XXX:
    __log = logging.getLogger('py.<module-name>')
```
그러면 이 클래스는 이 private 로거에 로그를 남기기 위한 접근 메서드를 생성할 수 있습니다.

따라서 `print` 및 `sys.std{out|err}.write` 문은 `_log.{debug|info}`로 대체되어야 하며, `traceback.print_exception`은 `_log.exception` 또는 때때로 `_log.debug('...', exc_info=1)`로 대체되어야 합니다.

## 모듈 목록 (Module List)
재작업될 모듈의 (아마도 불완전한) 목록은 다음과 같습니다.

*   `asyncore` (`dispatcher.log`, `dispatcher.log_info`)
*   `BaseHTTPServer` (`BaseHTTPRequestHandler.log_request`, `BaseHTTPRequestHandler.log_error`, `BaseHTTPRequestHandler.log_message`)
*   `cgi` (아마도 - `cgi.log`가 누군가에게 사용되는지?)
*   `ftplib` (`if FTP.debugging`)
*   `gopherlib` (`get_directory`)
*   `httplib` (`HTTPResponse`, `HTTPConnection`)
*   `ihooks` (`_Verbose`)
*   `imaplib` (`IMAP4._mesg`)
*   `mhlib` (`MH.error`)
*   `nntplib` (`NNTP`)
*   `pipes` (`Template.makepipeline`)
*   `pkgutil` (`extend_path`)
*   `platform` (`_syscmd_ver`)
*   `poplib` (`if POP3._debugging`)
*   `profile` (`if Profile.verbose`)
*   `robotparser` (`_debug`)
*   `smtplib` (`if SGMLParser.verbose`)
*   `shlex` (`if shlex.debug`)
*   `smtpd` (`SMTPChannel`/`PureProxy` `where print >> DEBUGSTREAM`)
*   `smtplib` (`if SMTP.debuglevel`)
*   `SocketServer` (`BaseServer.handle_error`)
*   `telnetlib` (`if Telnet.debuglevel`)
*   `threading`? (`_Verbose._note`, `Thread.__bootstrap`)
*   `timeit` (`Timer.print_exc`)
*   `trace`
*   `uu` (`decode`)

또한, 주석 처리된 디버그 출력이 있는 모듈이나 디버그 출력이 추가되어야 하는 몇몇 모듈이 있습니다. 예를 들면 다음과 같습니다.

*   `urllib`

마지막으로, 일부 모듈은 더 많은 디버그 정보를 제공하도록 확장되어야 할 수도 있습니다.

## 의심스러운 모듈 (Doubtful Modules)
여기에 나열된 모듈들은 커뮤니티에서 모듈 목록에 추가하거나 제거해야 한다고 제안할 모듈들입니다.

*   `tabnanny` (`check`)

## 로깅 사용 지침 (Guidelines for Logging Usage)
또한, 라이브러리 모듈 작성자들에게 로거 이름을 지정하는 동일한 형식을 따르도록 몇 가지 권장 사항을 제공할 수 있습니다. 저는 비표준 라이브러리 모듈들이 전체 이름을 기반으로 로거 이름을 사용해야 한다고 제안합니다. 따라서 패키지 "dummy"의 서브패키지 "junk"에 있는 모듈 "spam"은 "dummy.junk.spam"으로 명명될 것이며, 물론 동일한 서브패키지의 `__init__` 모듈은 "dummy.junk"라는 로거 이름을 가질 것입니다.

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인에 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.