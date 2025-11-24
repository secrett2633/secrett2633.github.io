---
title: "[Deferred] PEP 222 - Web Library Enhancements"
excerpt: "Python Enhancement Proposal 222: 'Web Library Enhancements'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/222/
toc: true
toc_sticky: true
date: 2025-09-26 16:41:15+0900
last_modified_at: 2025-09-26 16:41:15+0900
published: true
---
> **원문 링크:** [PEP 222 - Web Library Enhancements](https://peps.python.org/pep-0222/)
>
> **상태:** Deferred | **유형:** Standards Track | **작성일:** 18-Aug-2000


### Abstract (개요)
이 PEP(Python Enhancement Proposal)는 Python 표준 라이브러리 내의 CGI (Common Gateway Interface) 개발 기능을 개선하기 위한 제안들을 담고 있습니다. 이러한 개선 사항에는 새로운 기능, 쿠키 지원과 같은 작업을 위한 새 모듈, 또는 더 이상 사용되지 않는 코드의 제거 등이 포함될 수 있습니다.

원래 이 제안은 Python 2.1 버전에 개선 사항을 적용하는 것을 목표로 했으나, Python 커뮤니티의 관심 부족과 시간 제약으로 인해 이 PEP는 향후 Python 릴리스로 연기(deferred)되었습니다.

### Open Issues (미해결 과제)
이 섹션은 제안되었으나 아직 확정되지 않은 변경 사항들을 나열합니다. 이 PEP의 최종 버전에서는 모든 변경 사항이 채택(accepted) 또는 거부(rejected)로 분류되어 이 섹션은 비어있어야 합니다.

주요 미해결 과제는 다음과 같습니다:
*   **`cgi.py` (파일 업로드 처리):** 파일 업로드를 처리하기 위해 매번 `cgi.py`를 상속받아 서브클래스를 생성해야 하는 방식에 대한 불편함이 언급되었습니다. 이는 불필요한 오버헤드를 발생시키고, 업로드된 파일을 임시 파일로 읽는 비효율적인 과정을 야기합니다.
*   **`cgi.py` (쿼리 데이터 처리):** `keep_blank_values`가 설정되어 있더라도, `= (등호)`가 없는 쿼리 데이터(예: `...?value&...`)는 완전히 무시되는 문제점이 제기되었습니다. 이러한 데이터도 `FieldStorage` 인터페이스를 통해 접근 가능하도록 (예: 값이 `None`인 엔트리로) 개선되어야 한다는 제안이 있었습니다.
*   **유틸리티 함수:** 2-튜플(2-tuples) 리스트로부터 쿼리 문자열(query string)을 생성하는 유틸리티 함수의 필요성이 언급되었습니다.
*   **딕셔너리 관련 유틸리티 클래스:** `KeyError`를 발생시키지 않고 빈 문자열을 반환하는 `NoKeyErrors`와, 원래 키 문자열을 반환하는 `PartialStringSubstitution`과 같은 클래스의 필요성이 제안되었습니다.

### New Modules (새로운 모듈)
이 섹션에서는 Python 표준 라이브러리에 추가될 새로운 패키지 또는 모듈에 대한 세부 정보를 나열합니다.
*   **`fcgi.py`:** FastCGI 프로토콜 지원을 추가하는 새 모듈이 제안되었습니다. Robin Dunn의 코드를 Windows로 포팅하는 작업이 필요하다고 언급되었습니다.

### Major Changes to Existing Modules (기존 모듈의 주요 변경 사항)
이 섹션은 기존 모듈의 구현 또는 인터페이스에 대한 주요 변경 사항을 나열합니다. 이러한 변경 사항은 버그 도입 또는 하위 호환성(backward incompatibility) 문제 발생 위험이 더 큽니다.
*   **`cgi.py` 모듈 Deprecation (사용 중단):** `cgi.py` 모듈이 Deprecate될 예정입니다. (새로운 모듈 또는 패키지 이름은 아직 정해지지 않았습니다: 'web'? 'cgilib'?)

### Minor Changes to Existing Modules (기존 모듈의 사소한 변경 사항)
이 섹션은 기존 모듈의 사소한 변경 사항을 나열합니다. 이러한 변경 사항은 상대적으로 작은 구현 규모를 가지며, 이전 버전과의 비호환성을 야기할 위험이 적습니다.

### Rejected Changes (거부된 변경 사항)
이 섹션에 나열된 변경 사항들은 Python 2.1을 위해 제안되었으나 부적합하다고 판단되어 거부되었습니다. 각 거부된 변경 사항에 대해 해당 변경이 부적절하다고 간주된 이유가 설명되어 있습니다.

*   **HTML 생성 모듈:** 이 PEP의 일부로 HTML 생성 모듈을 포함하는 것은 거부되었습니다. `HTMLgen`의 순수한 프로그래밍 인터페이스부터 ASP에서 영감을 받은 간단한 템플릿, DTML의 복잡한 템플릿에 이르기까지 여러 HTML 생성 모듈이 존재합니다. 어떤 템플릿 모듈을 표준 라이브러리에 포함할지에 대한 명확한 지침이 없었으므로, 어떤 모듈도 선택되지 않아야 한다는 판단이 있었습니다.
*   **`cgi.py` (쿼리 데이터와 POST 데이터 조합 허용):** 쿼리 데이터와 POST 데이터를 함께 사용하는 것을 허용하는 제안은 거부되었습니다. 이는 표준적인 방법이 아니며 의심스러운 관행으로 간주되었습니다.

### Proposed Interface (제안된 인터페이스)
이 섹션에서는 웹 애플리케이션 개발을 위한 새로운 인터페이스인 `Response` 클래스와 `Request` 클래스, 그리고 유틸리티 함수 `wrapper`가 제안되었습니다.

**미해결 과제:** 명명 규칙(studlycaps 또는 underline-separated?), `cgi.parse*()` 함수들의 간소화 가능성 검토가 필요합니다.

#### Parsing functions (파싱 함수)
*   `cgi.py`의 대부분의 `parse*` 함수들을 계승합니다.

#### `Response` 클래스
Zope의 `HTTPResponse` 클래스에서 대부분의 메서드를 차용합니다.
*   **Attributes (속성):**
    *   `status`: 반환할 HTTP 상태 코드
    *   `headers`: 응답 헤더 딕셔너리
    *   `body`: HTTP 응답 본문(body)을 포함하는 문자열
*   **`__init__(self, status=200, headers={}, body="")`**
*   **`setStatus(self, status, reason=None)`:** 숫자 HTTP 응답 코드를 설정합니다.
*   **`setHeader(self, name, value)`:** HTTP 헤더를 설정합니다.
*   **`setBody(self, body)`:** 응답 본문을 설정합니다.
*   **`setCookie(self, name, value, path = '/', comment = None, domain = None, max-age = None, expires = None, secure = 0 )`:** 쿠키를 설정합니다.
*   **`expireCookie(self, name)`:** 사용자로부터 쿠키를 제거합니다.
*   **`redirect(self, url)`:** 브라우저를 다른 URL로 리디렉션(redirect)합니다.
*   **`__str__(self)`:** 전체 응답을 문자열로 변환합니다.
*   **`dump(self)`:** 디버깅에 유용한 문자열 표현을 반환합니다.
*   `serverError`, `badRequest` 등 특정 오류 클래스를 위한 메서드 필요 여부는 미정입니다.

#### `Request` 클래스
*   **Attributes (속성):** (이들이 딕셔너리 또는 딕셔너리 유사 객체여야 하는지는 미정입니다)
    *   `.headers`: HTTP 헤더를 포함하는 딕셔너리
    *   `.cookies`: 쿠키 딕셔너리
    *   `.fields`: 폼(form) 데이터
    *   `.env`: 환경 딕셔너리
*   **`__init__(self, environ=os.environ, stdin=sys.stdin, keep_blank_values=1, strict_parsing=0)`:** 제공된 환경과 표준 입력을 사용하여 요청 객체를 초기화합니다.
*   **`getHeader(self, name, default=None)`:** 헤더 값을 가져옵니다.
*   **`getCookie(self, name, default=None)`:** 쿠키 값을 가져옵니다.
*   **`getField(self, name, default=None)`:** 필드의 값을 문자열로 반환합니다 (업로드된 파일인 경우에도).
*   **`getUploadedFile(self, name)`:** 업로드된 파일의 내용을 얻기 위해 읽을 수 있는 파일 객체를 반환합니다. (필드가 실제로 업로드된 파일이 아닌 경우 오류를 보고해야 하는지, 또는 일관성을 위해 간단한 필드를 `StringIO`로 래핑해야 하는지는 미정입니다).
*   **`getURL(self, n=0, query_string=0)`:** 현재 요청의 URL을 반환하며, 오른쪽에서 `n`개의 경로 구성 요소를 잘라냅니다. (예: URL이 "http://foo.com/bar/baz/quux"일 때, `n=2`는 "http://foo.com/bar"를 반환합니다. 쿼리 문자열은 포함하지 않습니다).
*   **`getBaseURL(self, n=0)`:** 현재 요청의 기본 URL을 반환하며, `n`개의 경로 구성 요소를 끝에 추가하여 전체 URL의 더 많은 부분을 재구성합니다. (예: 요청 URL이 "http://foo.com/q/bar/baz/qux"일 때, `n=0`은 "http://foo.com/"을 반환하고, `n=2`는 "http://foo.com/q/bar"를 반환합니다. 쿼리 문자열은 포함하지 않습니다).
*   **`dump(self)`:** 디버깅 출력에 적합한 문자열 표현을 반환합니다.
*   **추가 가능성 (기본 객체에 포함할 가치가 있는지 미정):**
    *   `getBrowser(self)`: 브라우저 정보(Mozilla/IE/Lynx/Opera/기타)를 반환합니다.
    *   `isSecure(self)`: 요청이 SSL화(SSLified)된 경우 `True`를 반환합니다.

#### Module-level function (모듈 레벨 함수)
*   **`wrapper(func, logfile=sys.stderr)`:** 함수 `func`를 호출하고 `(request, response, logfile)` 인수를 전달합니다. 예외(Exceptions)는 가로채서 `logfile` 파일로 보냅니다.
    *   이 래퍼(wrapper)는 명령줄에서 호출되는 경우를 감지하여 디버깅 모드(debugging mode)로 실행됩니다. 이 경우 `name=value` 쌍을 표준 입력(standard input)으로 입력하여 필드 값을 설정할 수 있습니다. (파일 업로드를 이 구문에서 처리하는 방법은 미정입니다).

### Copyright (저작권)
이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.