---
title: "[Final] PEP 529 - Change Windows filesystem encoding to UTF-8"
excerpt: "Python Enhancement Proposal 529: 'Change Windows filesystem encoding to UTF-8'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/529/
toc: true
toc_sticky: true
date: 2025-09-26 23:20:53+0900
last_modified_at: 2025-09-26 23:20:53+0900
published: true
---
> **원문 링크:** [PEP 529 - Change Windows filesystem encoding to UTF-8](https://peps.python.org/pep-0529/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 27-Aug-2016



# PEP 529 – Windows 파일 시스템 인코딩을 UTF-8로 변경

*   **작성자:** Steve Dower
*   **상태:** 최종 (Final)
*   **유형:** 표준 트랙 (Standards Track)
*   **생성일:** 2016년 8월 27일
*   **Python 버전:** 3.6
*   **최종 이력:** 2016년 9월 1일, 2016년 9월 4일
*   **결정:** Python-Dev 메시지

## 요약 (Abstract)

역사적으로 Python은 Windows 운영 체제와 상호 작용할 때, 주로 C Runtime 함수를 통해 ANSI API를 사용했습니다. 그러나 이 방법은 UTF-16 API에 비해 오랫동안 권장되지 않았습니다. 운영 체제 내부에서는 모든 텍스트가 UTF-16으로 표현되며, ANSI API는 활성 코드 페이지(active code page)를 사용하여 인코딩 및 디코딩을 수행합니다. 자세한 내용은 "Naming Files, Paths, and Namespaces" 문서를 참조하십시오.

이 PEP는 Windows에서 기본 파일 시스템 인코딩을 `utf-8`으로 변경하고, 모든 파일 시스템 함수가 파일 시스템 경로에 대해 Unicode API를 사용하도록 제안합니다. 이 변경은 경로를 나타내기 위해 문자열(`str`)을 사용하는 코드에는 영향을 미치지 않지만, 경로에 바이트(`bytes`)를 사용하는 코드의 경우 이제 Windows 파일 시스템의 모든 유효한 경로를 정확하게 왕복(round-trip)할 수 있게 됩니다. 현재는 Unicode (OS 내부)와 bytes (Python 내부) 간의 변환이 정보 손실(lossy)을 일으키며, 사용자의 활성 코드 페이지(active code page) 범위 밖의 문자는 왕복에 실패할 수 있었습니다.

주목할 점은, 이 변경이 파일 내용의 인코딩에는 영향을 미치지 않는다는 것입니다. 파일 내용은 계속해서 `locale.getpreferredencoding()` (텍스트 파일의 경우) 또는 일반 `bytes` (바이너리 파일의 경우)를 기본값으로 사용합니다. 이 변경은 사용자가 Python에 `bytes` 객체를 경로 이름으로 전달하여 운영 체제에 전달할 때 사용되는 인코딩에만 영향을 미칩니다.

## 배경 (Background)

파일 시스템 경로는 파일 시스템에 의해 결정된 인코딩을 가진 텍스트로 거의 보편적으로 표현됩니다. Python에서는 `os` 및 `io` 모듈과 같은 여러 인터페이스를 통해 이러한 경로를 노출합니다. 경로는 파일 시스템에서 애플리케이션으로 (예: `os.listdir()`), 또는 애플리케이션에서 파일 시스템으로 (예: `os.unlink()`) 양방향으로 전달될 수 있습니다.

경로가 파일 시스템과 애플리케이션 간에 전달될 때, `bytes` 객체로 직접 전달되거나, `os.fsencode()` 및 `os.fsdecode()`를 사용하거나, `sys.getfilesystemencoding()`을 사용하여 명시적인 인코딩을 통해 `str`로 변환됩니다. `sys.getfilesystemencoding()`으로 문자열을 인코딩한 결과는 기본 파일 시스템의 기본 형식으로 된 `bytes` 객체입니다.

Windows에서 파일 시스템의 기본 형식은 `utf-16-le`입니다. 파일 시스템에 접근하기 위한 권장 플랫폼 API는 모두 이 형식으로 인코딩된 텍스트를 받거나 반환합니다. 그러나 Windows NT 이전 (그리고 아마도 더 이전)에는 기본 형식이 구성 가능한 머신 옵션이었고, 이 형식을 수용하기 위한 별도의 API 세트가 존재했습니다. 이 옵션 (활성 코드 페이지)과 이러한 API (`*A 함수`)는 하위 호환성을 위해 최신 Windows 버전에도 여전히 존재하지만, 새로운 기능은 종종 `utf-16-le` API (`*W 함수`)만 가집니다.

Python에서는 경로에 사용되는 모든 문자를 정확하게 왕복할 수 있으므로 `str` 사용이 권장됩니다 (POSIX에서는 `surrogateescape` 처리, Windows에서는 `str`이 기본 표현에 매핑되기 때문). Windows에서 `bytes`는 경로에 사용되는 모든 문자를 왕복할 수 없는데, 이는 Python이 내부적으로 `*A` 함수를 사용하며 인코딩이 "활성 코드 페이지에 따르기" 때문입니다. 활성 코드 페이지는 모든 Unicode 문자를 나타낼 수 없으므로, 경로를 `bytes`로 변환할 때 경고나 표시 없이 정보 손실이 발생할 수 있습니다.

다음은 이를 시연하는 예시입니다.

```python
>>> open('test\uAB00.txt', 'wb').close()
>>> import glob
>>> glob.glob('test*')
['test\uab00.txt']
>>> glob.glob(b'test*')
[b'test?.txt']
```
`glob`에 대한 두 번째 호출에서 Unicode 문자가 '?'로 대체되었는데, 이는 해당 경로를 파일 시스템에 다시 전달할 경우 `FileNotFoundError`를 발생시킨다는 의미입니다. `os.listdir()` 또는 매개변수 유형과 반환 유형을 일치시키는 모든 함수에서도 동일한 결과를 관찰할 수 있습니다.

모든 곳에서 `str`을 사용하는 것이 사용자에게 접근 가능한 해결책 중 하나이지만, POSIX 시스템은 `bytes`가 정식 표현(canonical representation)이므로 `bytes`만 사용할 때 일반적으로 데이터 손실이 발생하지 않습니다. 특정 표준에 의해 인코딩이 "올바르지 않더라도" 파일 시스템은 `bytes`를 다시 파일에 매핑합니다. 이를 활용하면 디코딩 및 재인코딩 비용을 피할 수 있어 (이론적으로, 그리고 POSIX에서만) `b'.'`를 사용하는 것이 `'.'`를 사용하는 것보다 더 빠를 수 있습니다.

```python
>>> for f in os.listdir(b'.'):
... os.stat(f)
...
```
결과적으로 POSIX에 초점을 맞춘 라이브러리 작성자는 경로를 `bytes`로 표현하는 것을 선호합니다. 일부 작성자에게는 이미 올바르게 인코딩된 `bytes`를 받을 수 있다는 편의성 때문이고, 다른 일부는 Python 2에서 코드를 포팅하는 것을 단순화하려는 시도 때문입니다. 그러나 `bytes`의 정확성 가정은 Unicode가 정식 표현인 Windows에는 적용되지 않으며, 오류가 발생할 수 있습니다. 이러한 잠재적인 데이터 손실 때문에 Windows에서 `bytes` 경로 사용은 Python 3.3에서 더 이상 사용되지 않도록(deprecated) 지정되었습니다. 위의 모든 코드 스니펫은 Windows에서 Deprecation Warning을 생성합니다.

## 제안 (Proposal)

현재 기본 파일 시스템 인코딩은 활성 코드 페이지를 사용하는 메타 인코더인 'mbcs'입니다. 그러나 `bytes`가 파일 시스템에 전달될 때 `*A` API를 거치며 운영 체제가 인코딩을 처리합니다. 이 경우 경로는 Python이 재정의하거나 변경할 기회 없이 항상 'mbcs:replace'와 동일하게 인코딩됩니다.

이 제안은 `*A` API의 모든 사용을 제거하고 `*W` API만 호출하도록 합니다. Windows가 경로를 `str`로 Python에 반환할 때, `utf-16-le`에서 디코딩되어 텍스트로 반환됩니다 (최소 표현이 무엇이든). Python 코드가 경로를 `bytes`로 요청할 때, 경로는 `surrogatepass`를 사용하여 `utf-16-le`에서 `utf-8`로 트랜스코딩됩니다 (Windows는 서로게이트 쌍을 유효성 검사하지 않으므로 파일 이름에 유효하지 않은 서로게이트가 있을 수 있습니다). 마찬가지로 경로가 `bytes`로 제공될 때, `utf-8`에서 `utf-16-le`로 트랜스코딩되어 `*W` API에 전달됩니다.

`utf-8` 사용은 이전 동작으로 되돌리는 "레거시 모드" 플래그 제공 외에는 구성할 수 없습니다.

`surrogateescape` 오류 모드는 여기에서 적용되지 않습니다. 이는 의미 없는 `bytes`를 유지하는 것에 대한 문제가 아니기 때문입니다. 운영 체제에서 반환된 모든 경로는 유효한 Unicode일 것이며, 사용자가 생성한 유효하지 않은 경로는 디코딩 오류를 발생시켜야 합니다 (현재는 `OSError` 또는 서브클래스를 발생시킬 것입니다).

`utf-8` `bytes` (대신 `utf-16-le` `bytes`가 아닌) 선택은 경로 이름의 왕복 기능을 보장하고 ASCII 호환 인코딩을 가정할 때 기본 조작 (예: `os.path` 모듈 사용)을 허용하기 위함입니다. `utf-16-le`를 인코딩으로 사용하는 것이 더 순수하지만, 해결되는 문제보다 더 많은 문제를 야기할 것입니다.

이 변경은 또한 Windows에서 `bytes` 경로 사용에 대한 deprecation을 해제합니다. `bytes`를 경로로 사용하는 의미론에 대한 변경은 필요하지 않습니다. 이전과 마찬가지로, `sys.getfilesystemencoding()`에서 반환되는 인코딩으로 인코딩되어야 합니다.

## 구체적인 변경 사항 (Specific Changes)

### `sys.getfilesystemencoding` 업데이트

`Py_FileSystemDefaultEncoding`의 기본값을 제거하고 `initfsencoding()`에서 `utf-8`로 설정합니다. 레거시 모드 스위치가 활성화된 경우에는 `mbcs`로 설정합니다.

`PyUnicode_DecodeFSDefaultAndSize()` 및 `PyUnicode_EncodeFSDefault()`의 구현을 업데이트하여 `utf-8` 코덱을 사용하도록 합니다. 레거시 모드 스위치가 활성화된 경우에는 기존 `mbcs` 코덱을 사용합니다.

### `sys.getfilesystemencodeerrors` 추가

오류 모드가 이제 `surrogatepass`와 `replace` 사이에서 변경될 수 있으므로, 수동으로 인코딩을 수행하는 Python 코드도 현재 오류 모드에 접근할 수 있어야 합니다. 여기에는 현재 코덱을 기반으로 오류 모드를 가정하는 `os.fsencode()` 및 `os.fsdecode()`의 구현이 포함됩니다.

기존 `Py_FileSystemDefaultEncoding`과 유사하게 공개 `Py_FileSystemDefaultEncodeErrors`를 추가합니다. Windows의 기본값은 `surrogatepass`이거나 레거시 모드에서는 `replace`가 됩니다. 다른 모든 플랫폼의 기본값은 `surrogateescape`가 됩니다.

현재 오류 모드를 반환하는 공개 `sys.getfilesystemencodeerrors()` 함수를 추가합니다.

`PyUnicode_DecodeFSDefaultAndSize()` 및 `PyUnicode_EncodeFSDefault()`의 구현을 업데이트하여 상수 문자열 대신 오류 모드 변수를 사용하도록 합니다.

`os.fsencode()` 및 `os.fsdecode()`의 구현을 업데이트하여 모드를 가정하는 대신 `sys.getfilesystemencodeerrors()`를 사용하도록 합니다.

### `path_converter` 업데이트

`path_converter`를 업데이트하여 `bytes` 또는 `buffer` 객체를 항상 `PyUnicode_DecodeFSDefaultAndSize()`를 사용하여 텍스트로 디코딩하도록 합니다.

`narrow` 필드를 `char*` 문자열에서 원래 객체가 `bytes`였는지 여부를 나타내는 플래그로 변경합니다. 이는 원래 제공된 것과 동일한 유형을 사용하여 경로를 반환해야 하는 함수에 필요합니다.

### 사용되지 않는 ANSI 코드 제거

`narrow` 필드를 사용하는 모든 코드 경로를 제거합니다. 이 경로는 더 이상 호출자가 접근할 수 없습니다. 이들은 `posixmodule.c` 내에서만 사용됩니다. 경로의 다른 사용은 `bytes` 경로 사용을 디코딩 및 `*W` API 사용으로 대체해야 합니다.

### 레거시 모드 추가 (Add legacy mode)

환경 변수 `PYTHONLEGACYWINDOWSFSENCODING` 또는 `sys._enablelegacywindowsfsencoding()` 함수 호출을 통해 활성화되는 레거시 모드 플래그를 추가합니다. 함수 호출은 플래그를 활성화하는 데만 사용될 수 있으며, 프로그램 초기화에 가능한 한 가깝게 사용해야 합니다. Python이 실행 중인 동안에는 레거시 모드를 비활성화할 수 없습니다.

이 플래그가 설정되면 기본 파일 시스템 인코딩은 `utf-8` 대신 `mbcs`로 설정되고, 오류 모드는 `surrogatepass` 대신 `replace`로 설정됩니다. 경로는 계속해서 와이드 문자(wide characters)로 디코딩되고 `*W` API만 호출되지만, Python에 전달되고 Python에서 수신되는 `bytes`는 이 변경 이전과 동일하게 인코딩됩니다.

### Windows에서 bytes 경로 사용에 대한 deprecation 해제 (Undeprecate bytes paths on Windows)

Windows에서 `bytes`를 경로로 사용하는 것은 현재 deprecated 되어 있습니다. 이 제안에서는 더 이상 그렇지 않으며, `bytes`로 인코딩된 경로는 사용자의 활성 코드 페이지 대신 `sys.getfilesystemencoding()`에서 반환되는 것을 사용해야 한다고 발표할 것입니다.

### 베타 실험 (Beta experiment)

이 변경의 영향을 확인하기 위해, 3.6.0b1에 잠정적으로 적용하고 3.6.0b4 이전에 최종 결정을 내릴 것을 제안합니다.

실험 기간 동안, 디코딩 및 인코딩 예외 메시지는 활성 온라인 토론 링크를 포함하도록 확장되어 문제 보고를 장려할 것입니다.

3.6.0b4에서 기능을 되돌리기로 결정되면, 구현 변경은 레거시 모드 플래그를 영구적으로 활성화하고, 환경 변수를 `PYTHONWINDOWSUTF8FSENCODING`으로, 함수를 `sys._enablewindowsutf8fsencoding()`으로 변경하여 기능을 비활성화하는 대신 사례별로 활성화할 수 있도록 할 것입니다.

호환성 문제로 인해 3.6에서 변경을 실행할 수 없는 경우, Python 3.x의 어떤 후기 버전에서도 변경을 실행할 수 없을 것으로 예상됩니다.

### 영향을 받는 모듈 (Affected Modules)

이 PEP는 경로 이름을 운영 체제에 전달하거나 `sys.getfilesystemencoding()`을 사용하는 Python 내의 모든 모듈을 암묵적으로 포함합니다.

3.6.0a4 기준으로 다음 모듈은 수정이 필요합니다.

*   `os`
*   `_overlapped`
*   `_socket`
*   `subprocess`
*   `zipimport`

다음 모듈은 `sys.getfilesystemencoding()`을 사용하지만 수정이 필요하지 않습니다.

*   `gc` (이미 `bytes`를 `utf-8`로 가정합니다)
*   `grp` (Windows용으로 컴파일되지 않습니다)
*   `http.server` (전송된 데이터에 코덱 이름을 올바르게 포함합니다)
*   `idlelib.editor` (필요하지 않을 것입니다; 대체 처리 기능이 있습니다)
*   `nis` (Windows용으로 컴파일되지 않습니다)
*   `pwd` (Windows용으로 컴파일되지 않습니다)
*   `spwd` (Windows용으로 컴파일되지 않습니다)
*   `_ssl` (ASCII 상수에만 사용됩니다)
*   `tarfile` (Windows에서 사용되지 않는 코드입니다)
*   `_tkinter` (이미 `bytes`를 `utf-8`로 가정합니다)
*   `wsgiref` (알 수 없는 환경의 기본 인코딩으로 가정됩니다)
*   `zipapp` (Windows에서 사용되지 않는 코드입니다)

다음 네이티브 코드는 인코딩 또는 디코딩 함수 중 하나를 사용하지만 수정이 필요하지 않습니다.

*   `Parser/parsetok.c` (문서에 이미 `sys.getfilesystemencoding()`이 지정되어 있습니다)
*   `Python/ast.c` (문서에 이미 `sys.getfilesystemencoding()`이 지정되어 있습니다)
*   `Python/compile.c` (문서화되지 않았지만 Python 파일 시스템 인코딩이 암시되어 있습니다)
*   `Python/errors.c` (문서에 이미 `os.fsdecode()`가 지정되어 있습니다)
*   `Python/fileutils.c` (Windows에서 사용되지 않는 코드입니다)
*   `Python/future.c` (문서화되지 않았지만 Python 파일 시스템 인코딩이 암시되어 있습니다)
*   `Python/import.c` (문서에 이미 `utf-8`이 지정되어 있습니다)
*   `Python/importdl.c` (Windows에서 사용되지 않는 코드입니다)
*   `Python/pythonrun.c` (문서에 이미 `sys.getfilesystemencoding()`이 지정되어 있습니다)
*   `Python/symtable.c` (문서화되지 않았지만 Python 파일 시스템 인코딩이 암시되어 있습니다)
*   `Python/thread.c` (Windows에서 사용되지 않는 코드입니다)
*   `Python/traceback.c` (문자열 비교를 위해 올바르게 인코딩됩니다)
*   `Python/_warnings.c` (문서에 이미 `os.fsdecode()`가 지정되어 있습니다)

## 거부된 대안 (Rejected Alternatives)

### 'strict mbcs' 디코딩 사용

이 대안은 본질적으로 제안된 변경과 동일하지만, `sys.getfilesystemencoding()`을 `utf-8` 대신 `mbcs`로 변경합니다 (이는 활성 코드 페이지에 동적으로 매핑됩니다).

이 접근 방식은 `*W` API로만 사용 가능한 새로운 기능을 사용할 수 있게 하고, 인코딩/디코딩 오류 감지도 가능하게 합니다. 예를 들어, Unicode 문자를 '?'로 자동으로 대체하는 대신 경고하거나 작업을 실패하게 만들 수 있습니다.

제안된 해결책과 비교할 때, 이는 일부 새로운 기능을 활성화할 수 있지만 처음에 설명된 문제 중 어떤 것도 해결하지 못합니다. 새로운 런타임 오류는 일부 문제를 더 명확하게 만들고 수정으로 이어질 수 있지만, 이는 라이브러리 관리자가 Windows를 지원하고 파일 시스템 경로를 문자열로 처리하기 위한 별도의 코드 경로를 추가하는 데 관심이 있는 경우에 한정됩니다.

엄격한 오류 없이 인코딩을 `mbcs`로 만드는 것은 레거시 모드 스위치가 기본적으로 활성화된 것과 동일합니다. 실제 코드에서 상당한 문제가 발생하고 deprecation 기간을 연장해야 할 필요가 있지만, 여전히 CPython 소스의 단순화를 원하는 경우 가능한 조치입니다.

### Windows에서 bytes 경로 사용을 오류로 처리

Windows에서 `bytes` 경로 사용을 완전히 막음으로써 사용자가 인코딩 문제를 겪지 않도록 합니다.

그러나 이 PEP의 동기는 POSIX에서 작성된 코드가 Windows에서도 올바르게 작동할 가능성을 높이는 것입니다. 이 대안은 반대 방향으로 나아가 그러한 코드를 완전히 호환되지 않게 만들 것입니다. 이는 사용자에게 어떤 식으로든 이점을 제공하지 않으므로 거부합니다.

### 모든 플랫폼에서 bytes 경로 사용을 오류로 처리

모든 플랫폼에서 `bytes` 경로 사용을 deprecated하고 비활성화함으로써, 코드가 원래 작성된 위치와 상관없이 사용자가 인코딩 문제를 겪는 것을 방지합니다. Windows 이외의 플랫폼에서는 현재 경고가 없으므로 완전한 deprecation 주기가 필요할 것입니다.

이는 일반적으로 Python 개발자들에게 적대적인 조치로 간주될 가능성이 높으므로 현재는 거부됩니다.

## 잠재적으로 문제가 발생할 수 있는 코드 (Code that may break)

다음 코드 패턴은 이 변경으로 인해 문제가 발생하거나 다른 동작을 보일 수 있습니다. 이러한 각 예시는 크로스 플랫폼 사용을 염두에 둔 코드에서 취약했을 것입니다. 제안된 수정 사항은 모든 플랫폼과 여러 Python 버전에서 경로 인코딩 문제를 처리하는 가장 호환 가능한 방법을 보여줍니다.

참고: 이 모든 예시는 Python 3.3 이상에서 deprecation 경고를 생성합니다.

### 경계 간 인코딩 관리 실패

프로토콜 경계를 넘을 때 인코딩을 관리하지 않는 코드는 현재 우연히 작동할 수 있지만, 인코딩이 변경될 때 문제가 발생할 수 있습니다. `filename`의 소스는 아래 두 번째 예시에서와 같이 `bytes` 객체를 반환하는 모든 함수가 될 수 있습니다.

```python
>>> filename = open('filename_in_mbcs.txt', 'rb').read()
>>> text = open(filename, 'r').read()
```
이 코드를 수정하려면, `filename`의 `bytes` 인코딩을 파일에서 읽을 때 또는 값을 사용하기 전에 지정해야 합니다.

```python
>>> # Fix 1: 파일을 텍스트로 엽니다 (기본 인코딩)
>>> filename = open('filename_in_mbcs.txt', 'r').read()
>>> text = open(filename, 'r').read()
>>> # Fix 2: 파일을 텍스트로 엽니다 (명시적 인코딩)
>>> filename = open('filename_in_mbcs.txt', 'r', encoding='mbcs').read()
>>> text = open(filename, 'r').read()
>>> # Fix 3: 경로를 명시적으로 디코딩합니다
>>> filename = open('filename_in_mbcs.txt', 'rb').read()
>>> text = open(filename.decode('mbcs'), 'r').read()
```
`filename`의 생성자가 `filename`의 사용자와 분리된 경우, 인코딩은 포함해야 할 중요한 정보입니다.

```python
>>> some_object.filename = r'C:\Users\Steve\Documents\my_file.txt'.encode('mbcs')
>>> filename = some_object.filename
>>> type(filename)
<class 'bytes'>
>>> text = open(filename, 'r').read()
```
이 코드를 운영 체제 및 Python 버전 전반에 걸쳐 최고의 호환성을 위해 수정하려면 `filename`을 `str`로 노출해야 합니다.

```python
>>> # Fix 1: str로 노출
>>> some_object.filename = r'C:\Users\Steve\Documents\my_file.txt'
>>> filename = some_object.filename
>>> type(filename)
<class 'str'>
>>> text = open(filename, 'r').read()
```
또는 경로에 사용된 인코딩을 사용자에게 제공해야 합니다. `os.fsencode()` (또는 `sys.getfilesystemencoding()`)를 지정하는 것은 허용 가능한 선택이며, 정확한 인코딩을 가진 새 속성을 추가할 수도 있습니다.

```python
>>> # Fix 2: fsencode 사용
>>> some_object.filename = os.fsencode(r'C:\Users\Steve\Documents\my_file.txt')
>>> filename = some_object.filename
>>> type(filename)
<class 'bytes'>
>>> text = open(filename, 'r').read()
>>> # Fix 3: 명시적 인코딩으로 노출
>>> some_object.filename = r'C:\Users\Steve\Documents\my_file.txt'.encode('cp437')
>>> some_object.filename_encoding = 'cp437'
>>> filename = some_object.filename
>>> type(filename)
<class 'bytes'>
>>> filename = filename.decode(some_object.filename_encoding)
>>> type(filename)
<class 'str'>
>>> text = open(filename, 'r').read()
```

### 'mbcs'를 명시적으로 사용

파일 시스템 API에 전달하기 전에 'mbcs'를 사용하여 텍스트를 명시적으로 인코딩하는 코드는 이제 잘못 인코딩된 `bytes`를 전달합니다. 이 예시에서 `filename`의 소스는 `str`인 한 중요하지 않습니다.

```python
>>> filename = open('files.txt', 'r').readline().rstrip()
>>> text = open(filename.encode('mbcs'), 'r')
```
이 코드를 수정하려면 문자열을 명시적인 인코딩 없이 전달하거나 `os.fsencode()`를 사용해야 합니다.

```python
>>> # Fix 1: 문자열을 인코딩하지 않습니다
>>> filename = open('files.txt', 'r').readline().rstrip()
>>> text = open(filename, 'r')
>>> # Fix 2: 올바른 인코딩 사용
>>> filename = open('files.txt', 'r').readline().rstrip()
>>> text = open(os.fsencode(filename), 'r')
```

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.