---
title: "[Final] PEP 331 - Locale-Independent Float/String Conversions"
excerpt: "Python Enhancement Proposal 331: 'Locale-Independent Float/String Conversions'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/331/
toc: true
toc_sticky: true
date: 2025-09-26 18:38:41+0900
last_modified_at: 2025-09-26 18:38:41+0900
published: true
---
> **원문 링크:** [PEP 331 - Locale-Independent Float/String Conversions](https://peps.python.org/pep-0331/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 19-Jul-2003

PEP 331 – 로케일 독립적인 float/string 변환
=====================================================

*저자: Christian R. Reis <kiko at async.com.br>*
*상태: Final (최종)*
*유형: Standards Track (표준 트랙)*
*생성일: 2003년 7월 19일*
*Python 버전: 2.4*
*게시 이력: 2003년 7월 21일, 2003년 8월 13일, 2004년 6월 18일*

## 초록 (Abstract)

Python 2.3에서 `LC_NUMERIC` 로케일 카테고리 지원은 Python 공간에서만 구현되었습니다. 이는 C로 구현된 확장 모듈(Extension Modules) 및 라이브러리를 사용하여 문자열로부터 float를 파싱(parsing)하고 생성하는 애플리케이션에서 일관성 없는 동작과 스레드 안전성(Thread-safety) 문제를 야기합니다. 이 문서는 필요에 따라 로케일(Locale)에 구애받지 않는 대체 함수를 제공하고 사용함으로써 이러한 불일치를 제거하기 위한 계획을 제안합니다.

## 서론 (Introduction)

Python은 `locale` 모듈을 통해 일반적인 지역화(Localization) 서비스를 제공하며, 이를 통해 특히 숫자 유형의 표시 및 변환 과정을 지역화할 수 있습니다. `LC_TIME`, `LC_COLLATE`와 같은 로케일 카테고리는 애플리케이션의 어떤 측면을 지역화할지 정확하게 구성할 수 있도록 합니다.

`LC_NUMERIC` 카테고리는 float 및 고정 정밀도(fixed-precision) 숫자에서 소수점 구분 기호(decimal separator)와 같은 비화폐성 숫자 정보의 서식(formatting)을 지정합니다. `LC_NUMERIC` 카테고리의 지역화는 현재 Python 공간에서만 구현됩니다. Python 런타임에서 호출되는 C 라이브러리는 Python의 `LC_NUMERIC` 설정을 인식하지 못합니다. 이는 Python 파서(parser) 및 관련 코드에서 사용되는 특정 저수준 함수의 동작 변경을 피하기 위함입니다.

그러나 이는 C 라이브러리를 래핑(wrap)하는 확장 모듈(Extension Modules)에 문제를 일으킵니다. 이러한 확장 모듈을 사용하는 애플리케이션은 부동 소수점(floating-point) 값을 일관성 없이 표시하고 변환하게 됩니다.

PyGTK의 저자인 James Henstridge는 `setlocale()` 함수 또한 스레드 안전성(thread-safety) 문제를 야기한다고 지적했습니다. 스레드가 GIL(Global Interpreter Lock) 외부에서 C 라이브러리의 `setlocale()`을 호출하여 Python이 float를 잘못 파싱하고 생성할 수 있기 때문입니다.

## 제안 배경 (Rationale)

`LC_NUMERIC`에 대한 Python과 C 라이브러리 지역화 간의 불일치는 C 확장(C extensions)을 사용하는 모든 지역화된 애플리케이션에 문제입니다. 문제의 정확한 성격은 애플리케이션에 따라 다르겠지만, 부동 소수점 값을 파싱하거나 서식화할 때 가장 흔하게 발생할 가능성이 높습니다.

## 문제 사례 (Example Problem)

이 PEP를 촉발시킨 초기 문제는 PyGTK 모듈로 래핑된 GTK+ UI 툴킷의 `GtkSpinButton` 위젯과 관련이 있습니다. 이 위젯은 숫자 모드로 설정할 수 있으며, 이 경우 입력된 문자는 숫자로 평가됩니다.

문제는 `LC_NUMERIC`가 C 로케일의 표준(예: 브라질 로케일 `pt_BR`에서 `.` 대신 `,`)과 다른 float 구분 기호를 가진 로케일로 설정될 때 발생합니다. `LC_NUMERIC`가 `libc` 수준에서 설정되지 않기 때문에, float 값은 스핀 버튼의 텍스트 입력란에 잘못 표시되고(구분 기호로 `.` 사용), `,` 구분 기호를 사용하여 소수 값을 입력하는 것이 불가능해집니다.

이 작은 사례는 Python으로 코딩된 지역화된 애플리케이션이 이 툴킷을 사용할 때 유용성(usability)이 저하됨을 보여줍니다.

## 제안 (Proposal)

Martin v. Löwis는 `python-dev`에서 문제에 대한 허용 가능한 해결책의 초기 제약 조건에 대해 다음과 같이 언급했습니다:

*   파서(parser)를 깨뜨리지 않고 `LC_NUMERIC`를 C 라이브러리 수준에서 설정할 수 있어야 합니다.
*   `float()` 및 `str()`는 로케일에 구애받지 않아야 합니다.
*   로케일을 인식하는 `str()` 및 `atof()`는 `locale` 모듈에 유지되어야 합니다.

Python 소스 분석에 따르면 다음 함수들이 현재 `LC_NUMERIC`가 C 로케일로 설정되어야 하는 것에 의존합니다:

*   `Python/compile.c:parsenumber()`
*   `Python/marshal.c:r_object()`
*   `Objects/complexobject.c:complex_to_buf()`
*   `Objects/complexobject.c:complex_subtype_from_string()`
*   `Objects/floatobject.c:PyFloat_FromString()`
*   `Objects/floatobject.c:format_float()`
*   `Objects/stringobject.c:formatfloat()`
*   `Modules/stropmodule.c:strop_atof()`
*   `Modules/cPickle.c:load_float()`

제안된 접근 방식은 `strtod()`/`atof()` (문자열에서 float로) 및 `snprintf()` (float에서 문자열로)와 같은 float 형식 변환을 위한 `LC_NUMERIC`에 구애받지 않는 함수를 구현하고, 서식이 사용자 지정 로케일에 따라 달라지지 않아야 하는 곳에 이러한 함수를 사용하는 것입니다.

`locale` 모듈도 `LC_NUMERIC`에 대한 특별 처리를 제거하도록 변경되어야 합니다.

이 변경은 앞서 언급된 스레드 안전성 문제도 해결해야 합니다.

## 잠재적인 코드 기여 (Potential Code Contributions)

이 문제는 원래 GTK+ 라이브러리의 문제로 보고되었지만, 이후 Python 구현의 불일치로 정확히 진단되었습니다. 그러나 다행히도 `glib` 라이브러리(주로 GTK+용으로 개발되었으며, GNU C 라이브러리와 혼동하지 말 것)는 이 문서에서 제시된 것과 유사한 이유로 여러 `LC_NUMERIC`에 구애받지 않는 함수를 구현합니다 (예시 참조).

같은 GTK+ 문제 보고서에서 Havoc Pennington은 `glib` 개발자들이 이 코드를 PSF(Python Software Foundation)에 기여할 의사가 있다고 제안했으며, 이는 이 PEP의 구현을 상당히 단순화할 것입니다. `glib` 코드의 원래 저자인 Alex Larsson은 코드가 안전하게 통합될 수 있도록 2003년 8월 20일에 PSF 기여자 계약(Contributor Agreement)을 제출했으며, 이 계약은 접수되고 승인되었습니다.

## 위험 (Risks)

제공되는 로케일 독립적인 함수와 관련하여 크로스 플랫폼(cross-platform) 문제가 있을 수 있지만, 제공된 코드가 부동 소수점 숫자에 적용된 로케일 종속적인 변경 사항을 단순히 되돌리기 때문에 이 위험은 낮습니다.

Martin과 Guido는 기여된 코드와 관련하여 잠재적인 저작권 문제를 지적했습니다. GTK+ 및 `glib` 팀 구성원들이 코드 재라이선싱에 동의했으며, 이러한 안전성을 보장하기 위해 PSF 기여자 계약이 발송되었으므로 이 영역에서는 문제가 없을 것이라고 생각합니다.

Tim Peters는 스레딩(threading)과 관련된 특정 상황에서는 제안된 변경 사항만으로는 문제를 완전히 해결하기에 불충분하다는 점을 지적했습니다. 그러나 현재로서는 완전한 해결책이 존재하지 않습니다.

## 구현 (Implementation)

Gustavo Carneiro <gjc at inescporto.pt>가 구현을 개발했으며, Sourceforge.net 버그 774665에 첨부되었습니다.

버그 보고서에 명시된 대로, 최종 패치는 Martin v. Löwis에 의해 2004년 6월 8일에 Python CVS에 통합되었습니다.

## 참조 (References)

*   Python 임베딩(embedding)을 위한 locale 문서, <http://docs.python.org/library/locale.html>
*   PyGTK 홈페이지, <http://www.daa.com.au/~james/pygtk/>
*   `GtkSpinButton` 스크린샷 (문제 시연), <http://www.async.com.br/~kiko/spin.png>
*   GNOME 버그 보고서, <http://bugzilla.gnome.org/show_bug.cgi?id=114132>
*   Alex Larsson의 `g_ascii_strtod` 및 `g_ascii_dtostr` (이후 `g_ascii_formatd`로 이름 변경) 코드 제출, <http://mail.gnome.org/archives/gtk-devel-list/2001-October/msg00114.html>
*   PSF 기여자 계약, <https://www.python.org/psf/contrib/contrib-form/>
*   Alex Larsson의 계약서 제출 확인 이메일, <https://mail.python.org/pipermail/python-dev/2003-August/037755.html>
*   Spambayes의 `LC_NUMERIC` 문제에 대한 Tim Peters의 요약 이메일, <https://mail.python.org/pipermail/python-dev/2003-September/037898.html>
*   Python 버그 보고서, <https://bugs.python.org/issue774665>
*   통합된 `LC_NUMERIC`-agnostic 패치, <https://sourceforge.net/tracker/download.php?group_id=5470&atid=305470&file_id=89685&aid=774665>

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)으로 지정되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.