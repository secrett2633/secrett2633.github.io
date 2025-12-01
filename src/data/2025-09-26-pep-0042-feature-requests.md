---
title: "[Withdrawn] PEP 42 - Feature Requests"
excerpt: "Python Enhancement Proposal 42: 'Feature Requests'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/42/
toc: true
toc_sticky: true
date: 2025-09-26 15:56:44+0900
last_modified_at: 2025-09-26 15:56:44+0900
published: true
---
> **원문 링크:** [PEP 42 - Feature Requests](https://peps.python.org/pep-0042/)
>
> **상태:** Withdrawn | **유형:** Process | **작성일:** 12-Sep-2000


# PEP 42 – 기능 요청 (Feature Requests)

*   **작성자:** Jeremy Hylton <jeremy at alum.mit.edu>
*   **상태:** 철회됨 (Withdrawn)
*   **유형:** 프로세스 (Process)
*   **생성일:** 2000년 9월 12일

## 중요 사항

이 PEP는 **철회되었습니다.** 현재는 **구식(obsolete)** 이며, 모든 새로운 기능 요청은 매우 간단한 요청의 경우 Python 버그 트래커로, 그 외의 모든 사항은 Ideas Discourse 카테고리로 제출해야 합니다. 이 문서는 **역사적인 목적** 으로만 보존됩니다.

## 서론

이 PEP는 향후 Python 버전을 위해 고려될 수 있는 기능 요청 목록을 담고 있었습니다. 규모가 큰 기능 요청은 여기에 포함되지 않고 별도의 PEP로 설명되어야 했지만, 고유한 PEP가 생성되기 전까지는 여기에 나열될 수 있었습니다. (자세한 내용은 PEP 0을 참조하십시오.)

이 PEP는 실제로는 기능 요청인 버그 보고서를 닫을 수 있도록 생성되었습니다. "Open"으로 표시된 경우, 실제 버그 목록(이상적으로는 한 페이지 미만이어야 함)에서 주의를 분산시켰습니다. "Closed"로 표시된 경우, 잊혀지는 경향이 있었습니다. 당시의 절차는 다음과 같았습니다. 버그 보고서가 실제 기능 요청인 경우, 이 PEP에 기능 요청을 추가하고, 버그를 "기능 요청", "나중에", "닫힘"으로 표시한 다음, 버그에 이 상황을 설명하는 주석을 추가했습니다 (PEP를 명시적으로 언급). 또한, 대규모 기능 요청을 버그 데이터베이스에서 직접 별도의 PEP로 옮기는 것도 허용되었습니다.

이 PEP는 실제로 네 가지 범주로 나뉘어야 했습니다 (Laura Creighton의 분류):

*   BDFL(Benevolent Dictator For Life)이 "나쁜 아이디어"라고 거부한 것. 다시 가져오지 말 것.
*   BDFL이 누군가가 코드를 작성하면 추가할 것. (또는, 코드를 제시하면 BDFL이 '이것을 변경하면 내가 추가하겠다'고 말할 것.)
    *   **하위 분류:**
        *   BDFL이 정말로 코드를 보고 싶어 하는 것!
        *   BDFL이 이것에 대해 결코 열성적이지는 않겠지만, 쉬울 때 포함시킬 것.
*   코드를 제시하면 BDFL이 결정을 내릴 것. "에이 별로", "너무 모호하다", "이것은 거부되었지만, 모호함 때문일 뿐이다"와 같은 반응이 나올 수 있음. 이 개선 사항이 마음에 든다면, 새로운 PEP를 만들 것.

## 핵심 언어 / 내장 기능 (Core Language / Builtins)

*   **더 깊이 중첩된 구문 트리 처리:** 파서가 스택 크기에 하드코딩된 제한이 있어서 `eval("["*50 + "]"*50)`과 같은 깊이 중첩된 구문 트리를 처리하지 못하는 문제가 있었습니다. 이 제한을 높이거나 제거해야 한다는 요청이 있었습니다. 제거는 현재 컴파일러가 C 스택 오버플로우를 일으킬 수 있어 어려웠습니다. (참조: [https://bugs.python.org/issue215555](https://bugs.python.org/issue215555))
*   **비우발적인 IEEE-754 지원:** Inf, NaN, 설정 가능한 트랩 등 IEEE-754 표준에 대한 비우발적인 지원이 필요하다는 요청이 있었습니다. 이는 큰 프로젝트로 간주되었습니다.
*   **Windows 특정 파일 이름 처리:** Windows에서 특정 "매직" 이름을 가진 파일을 생성하거나 접근하려고 할 때 시스템이 멈추거나 충돌할 수 있는 문제가 있었습니다. 이는 운영체제(OS)의 버그이지만, 일부 애플리케이션은 사용자에게 이러한 문제를 숨기려 합니다. 이 문제가 발생하면 증상이 매우 혼란스러웠습니다. (참조: `prn.txt` 등의 파일 사용 시 멈춤 - [https://bugs.python.org/issue481171](https://bugs.python.org/issue481171))
*   **`eval`과 자유 변수 (Free Variables):** 자유 변수를 가진 코드 객체가 `eval`에 전달될 때, 자유 변수에 대한 바인딩을 전달하는 방법이 있으면 유용할 것이라는 요청이 있었습니다. (참조: [https://bugs.python.org/issue443866](https://bugs.python.org/issue443866))

## 표준 라이브러리 (Standard Library)

*   **`urllib` 모듈의 인증 프록시 지원:** `urllib` 모듈이 인증이 필요한 프록시를 지원해야 한다는 요청이 있었습니다. (참조: SourceForge 버그 #210619 - [https://bugs.python.org/issue210619](https://bugs.python.org/issue210619))
*   **`os.rename()`의 `EXDEV` 오류 처리 개선:** `os.rename()`이 파일 시스템 경계를 넘어 작동하지 않는 플랫폼(예: Linux)에서 `EXDEV` 오류를 처리하기 위해 파일을 복사하고 원본을 제거하는 방식으로 수정되어야 한다는 요청이 있었습니다. (참조: [https://bugs.python.org/issue212317](https://bugs.python.org/issue212317))
*   **`signal` 처리의 예상치 못한 동작:** `signal` 처리가 항상 예상대로 작동하지 않는 문제가 있었습니다. 예를 들어, `sys.stdin.readline()`이 (반환하는) 시그널 핸들러에 의해 중단되면 `""`를 반환했습니다. 대신 예외(`EINTR`에 해당)를 발생시키거나 재시작하는 것이 더 나을 것이라는 요청이 있었습니다. 그러나 이러한 변경 사항은 블로킹(blocking) 및 인터럽트 가능한 I/O를 수행할 수 있는 모든 위치에 적용되어야 하므로 큰 프로젝트로 간주되었습니다. (참조: [https://bugs.python.org/issue210599](https://bugs.python.org/issue210599))
*   **Windows `utime`의 디렉토리 경로 허용:** Windows `utime`이 디렉토리 경로를 받아들이도록 확장되어야 한다는 요청이 있었습니다. (참조: [https://bugs.python.org/issue214245](https://bugs.python.org/issue214245))
*   **`copy.py`의 모듈 및 함수 타입 지원 확장:** `copy.py`가 모듈 및 함수 타입까지 지원하도록 확장되어야 한다는 요청이 있었습니다. (참조: [https://bugs.python.org/issue214553](https://bugs.python.org/issue214553))
*   **`marshal.load*()`의 잘못된 입력 검사 강화:** `marshal.load*()`에 대한 잘못된 입력에 대한 검사를 강화해야 한다는 요청이 있었습니다. (참조: [https://bugs.python.org/issue214754](https://bugs.python.org/issue214754))
*   **`rfc822.py`의 주소 필드 파싱 유연성:** `rfc822.py`가 사양보다 주소 필드 파싱 유형에 더 관대해야 한다는 요청이 있었습니다. 특히, `"From: Amazon.com <delivers-news2@amazon.com>"`과 같은 유효하지 않은 주소도 올바르게 파싱되어야 했습니다. (참조: [https://bugs.python.org/issue210678](https://bugs.python.org/issue210678))
*   **`cgi.py`의 `FieldStorage` 클래스 메모리 효율성 개선:** `cgi.py`의 `FieldStorage` 클래스가 대용량 바이너리 파일 업로드 시 메모리 사용에 더 보수적이어야 한다는 요청이 있었습니다. 두 가지 주요 문제가 지적되었습니다.
    *   `read_lines_to_outerboundary()`가 `readline()`을 사용하기 때문에 바이너리 파일 업로드 시 대량의 데이터가 메모리로 읽힐 수 있었습니다. 이는 섹션의 `Content-Type` 헤더를 확인하고 바이너리 유형인 경우 청크(chunked) 방식으로 읽어야 할 것이라는 제안이 있었습니다.
    *   두 번째 문제는 `self.lines` 속성과 관련이 있었는데, 이는 `cgi.py`의 1.56 개정에서 제거되었습니다. (참조: [https://bugs.python.org/issue210674](https://bugs.python.org/issue210674), [https://bugs.python.org/issue219806](https://bugs.python.org/issue219806))
*   **`urllib`의 호스트 및 포트만 포함하는 프록시 정의 지원:** `urllib`이 호스트와 포트만 포함하는 프록시 정의를 지원해야 한다는 요청이 있었습니다. (참조: [https://bugs.python.org/issue210849](https://bugs.python.org/issue210849))
*   **`urlparse`의 RFC 2396 준수 업데이트:** `urlparse`가 경로의 각 세그먼트에 대한 선택적 매개변수를 정의하는 RFC 2396을 준수하도록 업데이트되어야 한다는 요청이 있었습니다. (참조: [https://bugs.python.org/issue210834](https://bugs.python.org/issue210834))
*   **`pickle`과 `cPickle` 예외 통합:** `pickle`과 `cPickle`에서 발생하는 예외가 현재 다르며, 이를 통합해야 한다는 요청이 있었습니다 (아마도 예외는 두 모듈 모두에서 임포트되는 헬퍼 모듈에 정의되어야 할 것입니다).
*   **표준 라이브러리의 유니코드 지원 확장:** 더 많은 표준 라이브러리 루틴이 유니코드를 지원해야 한다는 요청이 있었습니다. 예를 들어, `urllib.quote()`는 유니코드 문자열을 UTF-8로 변환한 다음 일반적인 `%HH` 변환을 수행할 수 있습니다. (참조: [https://bugs.python.org/issue216716](https://bugs.python.org/issue216716))
*   **`str()` 또는 `__str__()`의 유니코드 문자열 반환 허용 방식:** `str()` 또는 `__str__()`가 유니코드 문자열 객체를 반환해도 괜찮다는 것을 명시하는 방법이 있어야 한다는 요청이 있었습니다. 또는 `ustr()`와 같은 다른 함수가 제안되기도 했습니다. (참조: [http://sf.net/patch/?func=detailpatch&patch_id=101527&group_id=5470](http://sf.net/patch/?func=detailpatch&patch_id=101527&group_id=5470))
*   **다른 스레드에서 스레드 종료:** 다른 스레드에서 스레드를 종료하거나, 시그널을 보내거나, 비동기 예외를 발생시키는 방법이 필요하다는 요청이 있었습니다. (참조: [https://bugs.python.org/issue221115](https://bugs.python.org/issue221115))
*   **디버거 (`pdb`)의 패키지 이해:** 디버거(`pdb`)가 패키지를 이해해야 한다는 요청이 있었습니다. (참조: [https://bugs.python.org/issue210631](https://bugs.python.org/issue210631))
*   **새로운 종류의 임시 파일:** Jim Fulton은 다음과 같은 아이디어를 제안했습니다:
    *   데이터가 특정 크기를 초과하거나,
    *   누군가가 파일 번호를 요청하기 전까지,
    *   메모리에 데이터를 저장하는 새로운 종류의 임시 파일이 있으면 좋을지 궁금하다.
    *   그러면 `cgi` 모듈(및 다른 애플리케이션)이 이 기능을 일관된 방식으로 사용할 수 있을 것이다.
    *   (참조: [https://bugs.python.org/issue415692](https://bugs.python.org/issue415692))
*   **`binascii.b2a_base64()`의 줄바꿈 처리 유연성:** Jim Fulton은 `binascii`의 `b2a_base64()` 함수가 줄바꿈을 추가하지 않거나 다른 것을 추가하는 것이 합리적인 상황이 있다고 지적했습니다.
    *   **제안:** 추가될 구분자 문자열을 지정하는 선택적 인수를 추가하고, 기본값은 `"\n"`으로 한다. `None`을 구분자 문자열로 특별 처리하여 패딩(pad) 바이트도 추가하지 않도록 할 수 있을까?
    *   (참조: [https://bugs.python.org/issue415694](https://bugs.python.org/issue415694))
*   **`pydoc`과 HTML 문서 통합:** `pydoc`이 HTML 문서와 통합되거나, 최소한 HTML 문서로 링크할 수 있어야 한다는 요청이 있었습니다. (참조: [https://bugs.python.org/issue405554](https://bugs.python.org/issue405554))
*   **Distutils의 `.c` 및 `.h` 파일 종속성 추론:** Distutils가 `.c` 및 `.h` 파일에 대한 종속성을 추론해야 한다는 요청이 있었습니다. (참조: [https://bugs.python.org/issue472881](https://bugs.python.org/issue472881))
*   **`asynchat`의 멀티스레딩 버그:** `asynchat`이 멀티스레딩 환경에서 버그가 있다는 요청이 있었습니다. (참조: [https://bugs.python.org/issue595217](https://bugs.python.org/issue595217))
*   **고수준 모듈의 소켓 타임아웃 설정 옵션:** `httplib`, `smtplib`, `nntplib` 등과 같은 고수준 모듈에 소켓 타임아웃을 설정하는 옵션이 있으면 좋겠다는 요청이 있었습니다. (참조: [https://bugs.python.org/issue723287](https://bugs.python.org/issue723287))
*   **`curses` 라이브러리의 `newterm()` 및 `delscreen()` 누락:** `curses` 라이브러리에 `newterm()` 및 `delscreen()`이라는 두 가지 중요한 호출이 누락되어 있다는 요청이 있었습니다. (참조: [https://bugs.python.org/issue665572](https://bugs.python.org/issue665572), [http://bugs.debian.org/175590](http://bugs.debian.org/175590))
*   **SSL 소켓의 비블로킹 I/O 지원:** 내장 SSL 소켓 유형이 비블로킹 SSL I/O에 사용될 수 있으면 좋겠다는 요청이 있었습니다. 현재 Twisted와 같이 SSL을 사용하여 비동기 서버를 구현하는 패키지는 `pyopenssl`과 같은 타사 패키지를 요구해야 합니다.
*   **reST(reStructuredText) 표준 라이브러리 모듈:** reST가 표준 라이브러리 모듈로 포함되어야 한다는 요청이 있었습니다.
*   **임포트 락 (Import Lock) 재설계:** 임포트 락이 재설계되어야 한다는 요청이 있었습니다. (참조: [https://bugs.python.org/issue683658](https://bugs.python.org/issue683658))
*   **텍스트 파일 열기 API 개선:** 일부 사람들이 보기에는 "U" 모드 플래그가 보기 흉하므로, 텍스트 파일을 여는 더 좋은 API가 필요하다는 요청이 있었습니다. `textfile(filename, mode, encoding)`라는 새로운 내장 타입에 대한 제안이 있었고, `bufsize` 인수가 포함되어야 하는지에 대한 의문도 제기되었습니다.
*   **Tkinter의 새로운 위젯 및/또는 매개변수 지원:** Tkinter에 새로운 위젯 및/또는 매개변수를 지원해야 한다는 요청이 있었습니다.
*   **중첩 클래스의 `__name__` 및 피클링 동작:** 다른 클래스 내에 정의된 클래스의 경우, `__name__`이 `"outer.inner"`여야 하고 피클링(pickling)이 작동해야 한다는 요청이 있었습니다. (GvR은 이것이 쉽거나 심지어 올바른지 더 이상 확신하지 못했습니다.) (참조: [https://bugs.python.org/issue633930](https://bugs.python.org/issue633930))
*   **명확한 폐기 정책 (Deprecation Policy) 결정 및 실행:** (특히 모듈에 대해) 더 명확한 폐기 정책을 결정하고 이를 실행해야 한다는 요청이 있었습니다. (참조: [https://mail.python.org/pipermail/python-dev/2002-April/023165.html](https://mail.python.org/pipermail/python-dev/2002-April/023165.html))
*   **`types` 모듈의 일반적인 사용에 대한 대안 제공:** `types` 모듈의 일반적인 사용에 대한 대안을 제공해야 한다는 요청이 있었습니다. Skip Montanaro는 이 아이디어에 대한 proto-PEP를 게시했습니다. (참조: [https://mail.python.org/pipermail/python-dev/2002-May/024346.html](https://mail.python.org/pipermail/python-dev/2002-May/024346.html))
*   **`types` 및 `string` 모듈에 대한 'pending deprecation' 사용:** `types` 및 `string` 모듈에 대해 'pending deprecation'을 사용해야 한다는 요청이 있었습니다. 이는 아직 다루어지지 않은 부분(예: `string.whitespace` 및 `types.TracebackType`)에 대한 대안을 제공해야 함을 의미합니다. 이에 대한 합의를 얻을 수 없는 것으로 보였습니다.
*   **게으른 튜플 추적 (Lazily tracking tuples):** (참조: [https://mail.python.org/pipermail/python-dev/2002-May/023926.html](https://mail.python.org/pipermail/python-dev/2002-May/023926.html), [https://bugs.python.org/issue558745](https://bugs.python.org/issue558745))
*   **`as`를 키워드로 만들기:** `as`가 오랫동안 의사(pseudo) 키워드였으므로 키워드로 만들어야 한다는 요청이 있었습니다. (Python 2.5에서는 폐기 예정이었고, 2.6에서는 키워드가 되었습니다.)

## C API 요청 (C API wishes)

*   **Windows 임베디드 애플리케이션 지원 C API 함수 추가:** `FILE *` 구조체가 인터프리터가 컴파일된 `FILE *`와 일치하지 않는 임베디드 애플리케이션을 빌드하는 Windows 사용자를 돕기 위해 C API 함수를 추가해야 한다는 요청이 있었습니다. (참조: [https://bugs.python.org/issue210821](https://bugs.python.org/issue210821)) 이 버그 보고서에는 Borland C++ 빌더 애플리케이션이 MSVC로 빌드된 `python.dll`과 상호 작용할 수 있도록 하는 특정 제안이 있었습니다.

## 도구 (Tools)

*   **GUI 빌더 필요:** Python에 GUI 빌더가 필요하다는 요청이 있었습니다. (참조: [https://bugs.python.org/issue210820](https://bugs.python.org/issue210820))

## 빌드 및 설치 (Building and Installing)

*   **`Modules/makesetup`의 유효한 C 파일 생성 확인:** `Modules/makesetup`이 다양한 `Setup` 파일에서 생성하는 `config.c` 파일이 유효한 C 코드인지 확인해야 한다는 요청이 있었습니다. 현재는 Python 또는 C 식별자로 허용되지 않는 문자를 포함하는 모듈 이름을 허용했습니다. (참조: [https://bugs.python.org/issue216326](https://bugs.python.org/issue216326))
*   **소스 빌드 시 `Include/graminit.h` 및 `Parser/graminit.c` 파일 덮어쓰기 방지:** 소스에서 빌드할 때 `Include/graminit.h` 및 `Parser/graminit.c` 파일을 덮어쓰려고 시도하지 않아야 한다는 요청이 있었습니다. 특히 Subversion 또는 스냅샷에서 작업하는 것이 아니라 소스 릴리스를 다운로드하는 사용자에게 해당했습니다. 일부 사용자들은 특이한 빌드 환경에서 이를 문제로 여겼습니다. (참조: [https://bugs.python.org/issue219221](https://bugs.python.org/issue219221))
*   **`configure` 스크립트 정리:** `configure` 스크립트가 시간이 지나면서 다소 낡고 `autoconf`의 최신 기능을 잘 추적하지 못할 수 있으므로, 검토하고 정리해야 한다는 요청이 있었습니다. (참조: [https://mail.python.org/pipermail/python-dev/2004-January/041790.html](https://mail.python.org/pipermail/python-dev/2004-January/041790.html))
*   **FHS (Filesystem Hierarchy Standard) 준수:** Python이 FHS를 준수하도록 만들어야 한다는 요청이 있었습니다. (참조: [http://bugs.python.org/issue588756](http://bugs.python.org/issue588756))

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.