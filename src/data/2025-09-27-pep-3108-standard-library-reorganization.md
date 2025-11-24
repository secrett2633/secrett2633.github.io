---
title: "[Final] PEP 3108 - Standard Library Reorganization"
excerpt: "Python Enhancement Proposal 3108: 'Standard Library Reorganization'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3108/
toc: true
toc_sticky: true
date: 2025-09-27 14:20:43+0900
last_modified_at: 2025-09-27 14:20:43+0900
published: true
---
> **원문 링크:** [PEP 3108 - Standard Library Reorganization](https://peps.python.org/pep-3108/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 01-Jan-2007

## PEP 3108 – 표준 라이브러리 재편성

*   **작성자**: Brett Cannon <brett at python.org>
*   **상태**: Final (최종)
*   **유형**: Standards Track (표준 트랙)
*   **생성일**: 2007년 1월 1일
*   **Python 버전**: 3.0
*   **최종 기록**: 2008년 4월 28일

---

### 개요 (Abstract)

언어 자체와 마찬가지로 Python의 표준 라이브러리(Standard Library, stdlib)는 수년 동안 매우 풍부하게 성장해왔습니다. 그러나 시간이 지남에 따라 일부 모듈은 더 이상 Python에 포함될 필요가 없어졌습니다. 또한 Python이 처음 등장한 이래로 모듈에 대한 명명 규칙이 도입되었지만, 모든 모듈이 이 규칙을 따르지는 않았습니다.

Python 3.0은 장기적으로 유용성이 없는 모듈을 제거할 기회를 제공합니다. 이 기회를 통해 모듈이 Python 스타일 가이드(Style Guide)를 따르도록 이름을 변경할 수도 있습니다. 이 PEP는 Python 3.0에 포함되어서는 안 되거나 이름이 변경되어야 할 모듈들을 나열합니다.

### 제거할 모듈 (Modules to Remove)

Guido는 Py3K(Python 3000)를 위해 "오래되고 불필요한 것(silly old stuff)"들이 표준 라이브러리에서 삭제되어야 한다고 밝혔습니다. 이는 의도적으로 개방적인 지침입니다. 제거될 각 모듈은 더 이상 Python과 함께 배포되어서는 안 되는 이유에 대한 정당성을 가져야 합니다. 여기에는 Python 2.x에서 더 이상 사용되지 않는(deprecated) 모듈이거나, 더 이상 널리 사용되지 않는 플랫폼을 위한 모듈인 경우가 포함됩니다.

이 PEP의 섹션에서는 제거될 다양한 모듈을 나열합니다. 각 하위 섹션은 모듈이 제거되는 다른 이유를 나타냅니다. 각 모듈은 특정 하위 섹션에 나열되는 것 외에도, 실제로 제거될 가치가 있는 모듈만 제거되도록 하기 위해 특정 정당성을 가져야 합니다.

"고유하게 편집된(uniquely edited)" 이후의 기간을 언급할 때, 이는 전체 stdlib에 걸쳐 보편적으로 적용된 변경 사항이 아니라, 해당 모듈에 대해 특별히 체크인(checkin)이 수행된 이후의 기간을 의미합니다. 편집 시간이 "고유"로 표시되지 않은 경우, 이는 파일이 마지막으로 편집된 시점을 의미합니다.

#### 이전에 더 이상 사용되지 않음 (Previously deprecated) [완료]

PEP 4는 stdlib에서 더 이상 사용되지 않는(deprecated) 모든 모듈을 나열합니다. 명시된 동기는 PEP 4에 나열된 동기를 따릅니다. Python 3.0의 첫 번째 알파 릴리스 시점에 이 PEP에 나열된 모든 모듈은 제거될 것입니다.

`lib-old`의 모든 내용도 제거됩니다. 이 모듈들은 이미 import되지 않도록 제거되었지만, 코드를 사용하는 사용자를 위해 Python 배포판에 보관되어 있었습니다.

*   `cfmfile`: Python 2.4부터 명확한 이유 없이 deprecated로 문서화되었습니다.
*   `cl`: Python 2.0 또는 그 이전부터 Obsolete(구식)로 문서화되었습니다. SGI 하드웨어 인터페이스였습니다.
*   `md5`: `hashlib` 모듈로 대체되었습니다.
*   `mimetools`: 이전 버전에서 Obsolete로 문서화되었습니다. `email` 패키지로 대체되었습니다.
*   `MimeWriter`: `email` 패키지로 대체되었습니다.
*   `mimify`: `email` 패키지로 대체되었습니다.
*   `multifile`: `email` 패키지로 대체되었습니다.
*   `posixfile`: 잠금(locking)은 `fcntl.lockf()`를 통해 더 잘 처리됩니다.
*   `rfc822`: `email` 패키지로 대체되었습니다.
*   `sha`: `hashlib` 패키지로 대체되었습니다.
*   `sv`: Python 2.0 또는 그 이전부터 Obsolete로 문서화되었습니다. 구식 SGI Indigo 하드웨어 인터페이스였습니다.
*   `timing`: Python 2.0 또는 그 이전부터 Obsolete로 문서화되었습니다. `time.clock()`이 더 나은 시간 해상도를 제공합니다.

#### 최소한으로 사용되는 플랫폼 특정 모듈 (Platform-specific with minimal use) [완료]

Python은 많은 플랫폼을 지원하지만, 일부는 널리 사용되거나 유지 관리되지 않습니다. 그리고 이러한 플랫폼 중 일부에는 해당 플랫폼 사용자에게 제한적인 용도로만 사용되는 모듈이 있습니다. 유용성이 제한적이기 때문에 Python 개발 팀이 이러한 모듈의 유지 관리 부담을 더 이상 지지 않는 것이 더 좋습니다.

아래 언급된 모듈들은 문서화되어 있습니다. 명시된 플랫폼에 대한 모든 문서화되지 않은 모듈도 제거됩니다.

##### IRIX

IRIX 운영 체제는 더 이상 생산되지 않습니다. 이 사실 때문에 `plat-irix[56]` 디렉토리에서 모든 모듈을 제거하는 것이 합리적이라고 판단되었습니다.

*   `AL`/`al`: Indy 및 Indigo 워크스테이션에서 사운드 지원을 제공했습니다. 두 워크스테이션 모두 더 이상 사용할 수 없습니다. 코드가 3년 동안 고유하게 편집되지 않았습니다.
*   `cd`/`CD`: SGI 시스템용 CD 드라이브 제어입니다. SGI는 더 이상 IRIX가 설치된 머신을 판매하지 않습니다. 코드가 14년 동안 고유하게 편집되지 않았습니다.
*   `cddb`, `cdplayer`, `ERRNO`, `FILE`, `GET`, `GLWS`, `IN`, `IOCTL`, `panel`, `panelparser`, `readcd`, `SV`, `torgb`, `WAIT`: 문서화되지 않았습니다.
*   `cl`/`CL`/`CL_old`: SGI 시스템용 압축 라이브러리입니다. SGI는 더 이상 IRIX가 설치된 머신을 판매하지 않습니다. 코드가 14년 동안 고유하게 편집되지 않았습니다.
*   `DEVICE`/`GL`/`gl`/`cgen`/`cgensuport`: OpenGL의 전신인 GL 액세스입니다. 최소 8년 동안 편집되지 않았습니다. 서드파티 라이브러리(PyOpenGL)가 더 나은 지원을 제공합니다.
*   `FL`/`fl`/`flp`: FORMS 라이브러리의 래퍼입니다. FORMS는 12년 동안 편집되지 않았습니다. 라이브러리가 널리 사용되지 않습니다. Google 검색의 첫 8개 결과는 `fl`에 대한 Python 문서입니다.
*   `fm`: IRIS 폰트 관리자(Font Manager) 라이브러리의 래퍼입니다. 더 이상 IRIX와 함께 제공되지 않는 SGI 머신에서만 사용할 수 있습니다.
*   `imgfile`: `imglib` 이미지 파일(.rgb 파일)용 SGI `libimage` 라이브러리의 래퍼입니다. Python Imaging Library는 읽기 전용 지원을 제공합니다. 13년 동안 고유하게 편집되지 않았습니다.
*   `jpeg`: JPEG (압축/해제) 래퍼입니다. 코드가 9년 동안 고유하게 편집되지 않았습니다. 서드파티 라이브러리(Python Imaging Library)가 더 나은 지원을 제공합니다.

##### Mac 특정 모듈 (Mac-specific modules)

Mac 특정 모듈은 제대로 유지 관리되지 않습니다(예: 많은 모듈을 자동 생성하는 데 사용되는 `bgen` 도구는 UCS-4를 지원하도록 업데이트된 적이 없습니다). 또한 Python이 이렇게 많은 OS 특정 모듈을 유지 관리하는 것은 적절하지 않습니다. 따라서 `Lib/plat-mac` 및 `Mac` 아래의 모든 모듈은 제거됩니다.

`urllib`에서 사용하기 위한 프록시 액세스용 스텁(stub) 모듈이 제공될 것입니다.

*   `_builtinSuites`, `Audio_mac`, `applesingle`, `appletrawmain`, `appletrunner`, `argvemulator`, `bgenlocations`, `bundlebuilder`, `CodeWarrior`, `Explorer`, `Finder`, `macerrors`, `macostools`, `macresource`, `Nav`, `Netscape`, `OSATerminology`, `pimp`, `PixMapWrapper`, `StdSuites`, `SystemEvents`, `Terminal`, `terminalcommand`: 문서화되지 않았습니다.
*   `aepack`, `aetools`, `aetypes`, `gensuitemodule`, `MiniAEFrame`: 서드파티 모듈을 통한 OSA 지원이 더 좋습니다 (Appscript). 하드코딩된 엔디안(endianness)으로 인해 Intel Mac에서 문제가 발생합니다. Carbon 패키지 의존적인 경우 이름 변경이 필요할 수 있습니다.
*   `autoGIL`: `CFRunLoop`와 Python을 사용하는 데 매우 좋지 않은 모델입니다.
*   `buildtools`: Python 2.3부터 명확한 이유 없이 deprecated로 문서화되었습니다.
*   `Carbon`: Carbon 개발은 중단되었습니다. 64비트 시스템을 완전히 지원하지 않습니다. UCS-4 유니코드 Python 빌드를 지원하도록 업데이트된 적이 없는 `bgen`에 의존합니다.
*   `ColorPicker`, `EasyDialogs`: GUI에는 Cocoa를 사용하는 것이 더 좋습니다.
*   `findertools`: 더 이상 유용하지 않습니다.
*   `FrameWork`: 문서화가 불충분합니다. Carbon Events를 지원하도록 업데이트되지 않았습니다.
*   `ic`, `icglue`, `icopen`: OS X에서는 필요하지 않습니다. 일반적으로 좋지 않은 동작인 'open'을 대체하기 위한 것이었습니다.
*   `MacOS`: `binhex`의 제거도 의미할 것입니다.
*   `videoreader`: 더 이상 사용되지 않습니다.
*   `W`: 더 이상 Python과 함께 배포되지 않습니다.

##### Solaris

*   `SUNAUDIODEV`/`sunaudiodev`: Sun 머신의 사운드 카드 액세스입니다. 코드가 8년 이상 고유하게 편집되지 않았습니다.

#### 거의 사용되지 않음 (Hardly used) [완료]

일부 플랫폼 독립적인 모듈은 거의 사용되지 않습니다. 여기에는 쉬운 재구현 가능성, 매우 작은 사용자층 또는 최신 표준을 따르지 않는 점을 포함하여 여러 가지 가능한 설명이 있습니다.

*   `audiodev`: 문서화되지 않았습니다. 5년 동안 편집되지 않았습니다.
*   `imputil`: 문서화되지 않았습니다. 절대 임포트(absolute imports)를 지원하도록 업데이트된 적이 없습니다.
*   `mutex`: 세마포어(semaphore)와 큐(queue)를 사용하여 쉽게 구현할 수 있습니다. 잠금 시도에서 블록할 수 없습니다. 15년 전 추가된 이후 고유하게 편집되지 않았습니다. 'sched' 모듈에서만 유용합니다. 스레드 안전(thread-safe)하지 않습니다.
*   `stringold`: 문자열 객체의 메서드에 대한 함수 버전입니다. Python 1.6 이후로 Obsolete되었습니다. 문자열 객체 또는 모듈에 없는 기능은 `string` 모듈로 이동될 것입니다(주로 상수).
*   `sunaudio`: 문서화되지 않았습니다. 7년 이상 편집되지 않았습니다. `sunau` 모듈은 유사한 기능을 제공합니다.
*   `toaiff`: 문서화되지 않았습니다. 시스템에 `sox` 라이브러리가 설치되어 있어야 합니다.
*   `user`: 애플리케이션이 자체 모듈 이름을 지정하고, 존재 여부를 확인하고, 발견되면 import하도록 허용함으로써 쉽게 처리할 수 있습니다.
*   `new`: 'types' 모듈에서 이름을 단순히 다시 바인딩(rebinding)한 것입니다. 대부분의 유형을 쉽게 얻기 위해 `type` 내장 함수를 호출할 수도 있습니다. Docstring은 27241 리비전(2002-06-15) 이후로 이 모듈이 더 이상 유용하지 않다고 명시합니다.
*   `pure`: Pure Atria가 Rational에 인수되고 Rational이 IBM에 인수되기 전에 작성되었습니다 (즉, 매우 오래되었습니다).
*   `test.testall`: `regrtest` 이전 시대의 것입니다.

#### Obsolete (구식) [완료]

Obsolete가 된다는 것은 stdlib의 다른 모듈이나 널리 배포된 서드파티 라이브러리가 해당 모듈이 의도한 목적에 대해 더 나은 해결책을 제공한다는 것을 의미합니다.

*   `Bastion`/`rexec`: 제한된 실행/보안 기능입니다. Python 2.3에서 비활성화되었습니다. 안전하지 않은 모듈로 간주되었습니다.
*   `bsddb185`: `bsddb3`로 대체되었습니다. 기본적으로 빌드되지 않습니다. 문서는 "새 코드에서 이 모듈을 직접 사용해서는 안 됩니다"라고 명시합니다. PyPI에서 외부적으로 사용할 수 있습니다.
*   `Canvas`: 2000년부터 Guido의 주석에서 Obsolete로 표시되었습니다 (http://bugs.python.org/issue210677 참조). `Tkinter.Canvas` 클래스를 사용하는 것이 더 좋습니다.
*   `commands`: `subprocess` 모듈이 대체합니다 (PEP 324). `getstatus()`를 제거하고 나머지는 `subprocess`로 이동합니다.
*   `compiler`: 내장 컴파일러와 stdlib 패키지를 모두 유지 관리하는 것은 불필요합니다. 컴파일러가 생성한 AST를 사용할 수 있습니다. AST에서 컴파일하는 메커니즘을 추가해야 합니다.
*   `dircache`: 미미하게 사용됩니다. 쉽게 복제할 수 있습니다.
*   `dl`: `ctypes`가 동일한 기능에 대해 더 나은 지원을 제공합니다.
*   `fpformat`: 모든 기능이 문자열 보간(string interpolation)으로 지원됩니다.
*   `htmllib`: `HTMLParser`로 대체되었습니다.
*   `ihooks`: 문서화되지 않았습니다. Python 2.3부터 비활성화된 `rexec`와 함께 사용하기 위한 것입니다.
*   `imageop`: 서드파티 라이브러리(Python Imaging Library)가 더 나은 지원을 제공합니다. 유닛 테스트는 `rgbimg`와 `imgfile`에 의존했습니다. `rgbimg`는 Python 2.6에서 제거되었습니다. `imgfile`은 이 PEP에서 제거될 예정입니다.
*   `linuxaudiodev`: `ossaudiodev`로 대체되었습니다.
*   `mhlib`: 개별 모듈로 제거되어야 합니다; 대신 `mailbox`를 사용하십시오.
*   `popen2`: `subprocess` 모듈이 대체합니다 (PEP 324).
*   `sgmllib`: SGML을 완전히 구문 분석하지 않습니다. 제거될 예정인 `htmllib`를 지원하기 위해 stdlib에 있었습니다.
*   `sre`: 이전에 deprecated되었습니다; 대신 `re`를 import하십시오.
*   `stat` [TODO: 모든 사용을 `os.stat()`으로 옮겨야 함]: `os.stat()`은 이제 속성(attribute)이 있는 튜플을 반환합니다. 모듈의 함수는 `os.stat`이 반환하는 객체의 메서드로 만들어져야 합니다.
*   `statvfs`: `os.statvfs`는 이제 속성이 있는 튜플을 반환합니다.
*   `thread`: 사람들은 대신 `threading`을 사용해야 합니다. `thread`를 `_thread`로 이름을 변경합니다. `dummy_thread`를 deprecated하고 `_dummy_thread`로 이름을 변경합니다. `thread.get_ident`를 `threading`으로 이동합니다. Guido는 이전에 deprecated를 지지했습니다.
*   `urllib`: `urllib2`로 대체되었습니다. `urllib`에 고유한 기능은 `urllib` 패키지에 유지됩니다.
*   `UserDict` [완료: 3.0] [TODO: 2.6 처리]: 유형(types)이 상위 클래스(superclass)가 될 수 있으므로 유용성이 떨어졌습니다. 유용한 부분은 `collections` 모듈로 이동되었습니다.
*   `UserList`/`UserString` [완료]: 유형(types)이 상위 클래스(superclass)가 될 수 있으므로 유용하지 않습니다. `collections` 모듈로 이동되었습니다.

#### 유지 관리 부담 (Maintenance Burden)

수년 동안 특정 모듈은 Python 개발자들에게 유지 관리 측면에서 큰 부담이 되어왔습니다. 이러한 상황에서는 모듈을 커뮤니티에 맡겨 유지 관리하도록 함으로써 Python 개발자들이 언어 지원 및 과도한 시간과 노력을 요구하지 않는 다른 표준 라이브러리 모듈에 더 집중할 수 있도록 하는 것이 더 좋습니다.

*   `bsddb3`: http://www.jcea.es/programacion/pybsddb.htm 에서 외부적으로 유지 관리됩니다. 일관성 없는 테스트 불안정성이 있습니다. Berkeley DB는 Python과 다른 릴리스 일정을 따르므로, 바인딩이 반드시 사용 가능한 것과 동기화되지 않습니다.

### 이름 변경할 모듈 (Modules to Rename)

PEP 8이 생겨나기 전에 많은 모듈이 stdlib에 존재했습니다. 이로 인해 일부 명명 불일치 및 네임스페이스(namespace)가 불필요하게 커지는 문제(namespace bloat)가 발생했으며, 이는 해결되어야 합니다.

#### PEP 8 위반 (PEP 8 violations) [완료]

PEP 8은 모듈이 "짧고, 모두 소문자로 된 이름을 가져야 하며", "가독성을 향상시키는 경우 밑줄(underscores)을 사용할 수 있다"고 명시합니다. 패키지 이름에서는 밑줄 사용이 권장되지 않습니다. 다음 모듈은 PEP 8을 위반하며, 패키지로 이동하여 이름이 변경되지 않는 한 원래 이름을 유지합니다.

| 현재 이름 (Current Name) | 대체 이름 (Replacement Name) |
| :----------------------- | :--------------------------- |
| `_winreg`                | `winreg`                     |
| `ConfigParser`           | `configparser`               |
| `copy_reg`               | `copyreg`                    |
| `Queue`                  | `queue`                      |
| `SocketServer`           | `socketserver`               |

#### 동일 인터페이스의 C 및 Python 구현 병합 (Merging C and Python implementations of the same interface)

일부 인터페이스는 Python 및 C 구현을 모두 가지고 있습니다. 속도를 위해 C 구현을 가지고 있고 Python 구현을 대체(fallback)로 사용하는 것은 좋지만, stdlib에서 두 구현을 독립적으로 노출할 필요는 없습니다. Python 3.0에서는 두 가지 구현이 있는 모든 인터페이스가 단일 공용 인터페이스로 병합됩니다.

C 모듈은 참조 구현(Python 구현이 참조 구현임)이 아니라는 사실을 명확히 하기 위해 선행 밑줄(leading underscore)이 주어집니다. 이는 C와 Python 버전 간의 모든 의미론적 차이가 Python 3.0 이전에 처리되어야 하며, 그렇지 않으면 C 구현이 수정될 때까지 제거될 것임을 의미합니다.

아래 나열되지 않은 한 가지 인터페이스는 `xml.etree.ElementTree`입니다. 이것은 외부에서 유지 관리되는 모듈이므로 Python 개발 팀의 직접적인 이름 변경 통제하에 있지 않습니다. 이에 대한 논의는 "Open Issues" 섹션을 참조하십시오.

*   `pickle`/`cPickle` [완료]: `cPickle`을 `_pickle`로 이름을 변경합니다. C 구현의 의미론적 완전성(semantic completeness)은 확인되지 않았습니다.
*   `profile`/`cProfile` [TODO]: `cProfile`을 `_profile`로 이름을 변경합니다. C 구현의 의미론적 완전성(semantic completeness)은 확인되지 않았습니다. (참고: Python 3.3 현재 `profile`/`cProfile` 병합은 일어나지 않았으며, 폐기된 것으로 간주됩니다).
*   `StringIO`/`cStringIO` [완료]: 클래스를 `io` 모듈에 추가합니다.

#### 공개적으로 문서화된 인터페이스가 없음 (No public, documented interface) [완료]

stdlib에는 정의된 공개 인터페이스가 없는 여러 모듈이 있습니다. 이 모듈들은 노출된 다른 모듈의 지원 코드로 존재합니다. 직접 사용하기 위한 것이 아니므로, 이 사실을 반영하도록 이름을 변경해야 합니다.

| 현재 이름 (Current Name) | 대체 이름 (Replacement Name) |
| :----------------------- | :--------------------------- |
| `markupbase`             | `_markupbase`                |

#### 잘못 선택된 이름 (Poorly chosen names) [완료]

일부 모듈은 나중에 생각해보니 잘못 선택된 이름을 가지고 있었습니다. 2.x 시리즈를 넘어 그 나쁜 이름이 지속되는 것을 막기 위해 이름을 변경해야 합니다.

| 현재 이름 (Current Name) | 대체 이름 (Replacement Name) |
| :----------------------- | :--------------------------- |
| `repr`                   | `reprlib`                    |
| `test.test_support`      | `test.support`               |

#### 모듈 그룹화 (Grouping of modules) [완료]

stdlib가 성장함에 따라 그 안에 여러 영역이 확장되어 여러 모듈을 포함하게 되었습니다 (예: 데이터베이스 파일 지원). 따라서 관련 모듈을 패키지로 그룹화하는 것이 합리적입니다.

##### `dbm` 패키지

| 현재 이름 (Current Name) | 대체 이름 (Replacement Name) |
| :----------------------- | :--------------------------- |
| `anydbm`                 | `dbm.__init__`               |
| `dbhash`                 | `dbm.bsd`                    |
| `dbm`                    | `dbm.ndbm`                   |
| `dumbdm`                 | `dbm.dumb`                   |
| `gdbm`                   | `dbm.gnu`                    |
| `whichdb`                | `dbm.__init__`               |

*주석*: `dbm.__init__`은 `anydbm`과 `whichdb`를 결합할 수 있습니다. 두 모듈의 공개 API에 이름 충돌이 없고, 두 모듈의 사용법이 밀접하게 관련되어 있기 때문입니다.

##### `html` 패키지

| 현재 이름 (Current Name) | 대체 이름 (Replacement Name) |
| :----------------------- | :--------------------------- |
| `HTMLParser`             | `html.parser`                |
| `htmlentitydefs`         | `html.entities`              |

##### `http` 패키지

| 현재 이름 (Current Name) | 대체 이름 (Replacement Name) |
| :----------------------- | :--------------------------- |
| `httplib`                | `http.client`                |
| `BaseHTTPServer`         | `http.server`                |
| `CGIHTTPServer`          | `http.server`                |
| `SimpleHTTPServer`       | `http.server`                |
| `Cookie`                 | `http.cookies`               |
| `cookielib`              | `http.cookiejar`             |

*주석*: `http.server` 모듈은 지정된 모듈들을 이름 충돌 없이 안전하게 결합할 수 있습니다.

##### `tkinter` 패키지

| 현재 이름 (Current Name) | 대체 이름 (Replacement Name) |
| :----------------------- | :--------------------------- |
| `Dialog`                 | `tkinter.dialog`             |
| `FileDialog`             | `tkinter.filedialog`         |
| `FixTk`                  | `tkinter._fix`               |
| `ScrolledText`           | `tkinter.scrolledtext`       |
| `SimpleDialog`           | `tkinter.simpledialog`       |
| `Tix`                    | `tkinter.tix`                |
| `Tkconstants`            | `tkinter.constants`          |
| `Tkdnd`                  | `tkinter.dnd`                |
| `Tkinter`                | `tkinter.__init__`           |
| `tkColorChooser`         | `tkinter.colorchooser`       |
| `tkCommonDialog`         | `tkinter.commondialog`       |
| `tkFileDialog`           | `tkinter.filedialog`         |
| `tkFont`                 | `tkinter.font`               |
| `tkMessageBox`           | `tkinter.messagebox`         |
| `tkSimpleDialog`         | `tkinter.simpledialog`       |
| `turtle`                 | `tkinter.turtle`             |

*주석*: `tkinter.filedialog`는 `FileDialog`와 `tkFileDialog`를 이름 충돌 없이 안전하게 결합할 수 있습니다. `tkinter.simpledialog`는 `SimpleDialog`와 `tkSimpleDialog`를 이름 충돌 없이 안전하게 결합할 수 있습니다.

##### `urllib` 패키지

원래 이 새 패키지는 `url`로 명명될 예정이었으나, 이 이름이 변수명으로 흔히 사용되기 때문에 `urllib` 이름을 유지하고 기존 모듈들을 새 패키지 안으로 옮기는 것이 더 낫다고 판단되었습니다.

| 현재 이름 (Current Name) | 대체 이름 (Replacement Name)             |
| :----------------------- | :--------------------------------------- |
| `urllib2`                | `urllib.request`, `urllib.error`         |
| `urlparse`               | `urllib.parse`                           |
| `urllib`                 | `urllib.parse`, `urllib.request`, `urllib.error` |
| `robotparser`            | `urllib.robotparser`                     |

*주석*: `urllib`의 인용(quoting) 관련 함수는 `urllib.parse`에 추가될 것입니다. `urllib.URLOpener`와 `urllib.FancyUrlOpener`는 두 모듈의 문서가 업데이트되는 한 `urllib.request`에 추가될 것입니다.

##### `xmlrpc` 패키지

| 현재 이름 (Current Name) | 대체 이름 (Replacement Name) |
| :----------------------- | :--------------------------- |
| `xmlrpclib`              | `xmlrpc.client`              |
| `DocXMLRPCServer`        | `xmlrpc.server`              |
| `SimpleXMLRPCServer`     | `xmlrpc.server`              |

*주석*: `xmlrpc.server`로 결합되는 모듈들은 이름 충돌이 없으므로 안전하게 병합될 수 있습니다.

### 전환 계획 (Transition Plan)

#### 문제점 (Issues)

이 PEP와 관련된 문제점은 다음과 같습니다:
*   Issue 2775: 마스터 추적 문제
*   Issue 2828: `undoc.rst` 정리

#### 제거될 모듈의 경우 (For modules to be removed)

모듈 제거의 경우, Python 3.0에서 먼저 모듈을 제거하여 의존성이 어디에 있는지 확인하는 것이 가장 쉽습니다. 이렇게 하면 `DeprecationWarning` 억제가 필요한 코드를 더 쉽게 찾을 수 있습니다.

##### Python 3.0에서

*   모듈을 제거합니다.
*   관련 테스트를 제거합니다.
*   모든 문서(일반적으로 모듈의 문서 파일 및 라이브러리 참조 파일의 해당 항목)를 제거합니다.
*   필요한 경우 `Modules/Setup.dist` 및 `setup.py`를 편집합니다.
*   ( `-uall`을 사용하여) 회귀 테스트 스위트(regression test suite)를 실행하고, 제거된 모듈의 import 실패로 인해 건너뛰어진 테스트가 있는지 확인합니다.
*   (적절한 `Misc/NEWS` 항목과 함께) 변경 사항을 체크인합니다.
*   이 PEP를 업데이트하여 3.0 단계가 완료되었음을 기록합니다.

##### Python 2.6에서

*   deprecated된 모듈이 Python으로 구현된 경우, 실행되는 코드의 첫 부분으로 다음 코드를 추가합니다(모듈 이름과 경고 import를 필요한 대로 조정):

    ```python
    from warnings import warnpy3k
    warnpy3k("the XXX module has been removed in Python 3.0", stacklevel=2)
    del warnpy3k
    ```

*   확장 모듈(extension module)인 경우 다음을 추가합니다:

    ```c
    if (PyErr_WarnPy3k("the XXX module has been removed in " "Python 3.0", 2) < 0) return;
    ```
    ( `Misc/TextMate`에서 제공되는 Python-Dev TextMate 번들은 이 모든 것을 생성하는 명령을 포함합니다.)

*   문서를 업데이트합니다. 자체 문서 파일이 있는 모듈의 경우, `deprecated` 지시어와 함께 모듈 지시어에 `:deprecated:` 옵션을 사용하여 2.6에서 deprecated되지만 3.0에서는 모듈이 제거됨을 명시합니다.

    ```
    .. deprecated:: 2.6
       The :mod:`XXX` module has been removed in Python 3.0.
    ```

*   단순히 파일에 나열된 모듈(예: `undoc.rst`)의 경우 `warning` 지시어를 사용합니다.
*   `test_py3kwarn`에서 모듈 삭제 테스트에 모듈을 추가합니다.
*   `test.test_support.import_module(name, deprecated=True)`를 사용하여 모듈의 테스트 코드에서 경고를 억제합니다.
*   적절한 `Misc/NEWS` 항목과 함께 변경 사항을 체크인합니다 (이 체크인은 Py3K에서 차단!).
*   이 PEP를 업데이트하여 2.6 단계가 완료되었음을 기록합니다.

#### 모듈 이름 변경 (Renaming of modules)

새 모듈 이름으로 전환하는 데 도움이 되도록 2to3 리팩토링 도구의 이름 변경 지원이 사용될 것입니다. `import` 문은 `as` 키워드를 사용하여 새 이름으로 import하면서 모듈 네임스페이스를 이전 이름에 바인딩하도록 다시 작성됩니다(키워드가 이미 사용되지 않은 경우, 그렇지 않으면 재할당된 이름은 그대로 두고 import되는 모듈만 변경해야 합니다). `fix_imports` fixer는 이 접근 방식의 예시입니다.

##### Python 3.0에서

*   샌드박스에서 2to3를 업데이트하여 이름 변경을 지원합니다.
*   `svn move`를 사용하여 모듈 이름을 변경합니다.
*   stdlib의 모든 `import` 문을 새 이름을 사용하도록 업데이트합니다 (`2to3`의 `fix_imports` fixer를 가장 쉬운 해결책으로 사용).
*   모듈 자체 문서에서 이름을 변경합니다.
*   문서의 모든 참조를 이전 이름에서 새 이름으로 업데이트합니다.
*   `regrtest.py -uall`을 실행하여 이름 변경이 작동했는지 확인합니다.
*   `Misc/NEWS`에 항목을 추가합니다.
*   변경 사항을 커밋합니다.

##### Python 2.6에서

*   모듈 문서에 Python 3.0에서 모듈 이름이 변경되었음을 언급하는 메모를 추가합니다.

    ```
    .. note:: The :mod:`OLDNAME` module has been renamed to :mod:`NEWNAME` in Python 3.0.
    ```

*   문서 변경 사항을 커밋합니다.
*   Py3K에서 리비전을 차단합니다.

### 미해결 문제 (Open Issues)

#### stdlib 외부에서 유지 관리되는 모듈의 이름 변경 (Renaming of modules maintained outside of the stdlib)

`xml.etree.ElementTree`는 PEP 8 명명 표준을 충족하지 않을 뿐만 아니라 노출된 C 구현도 가지고 있습니다. PEP 360에 따라 외부에서 유지 관리되는 패키지입니다. 유지 관리자에게 PEP 8을 따르고 C 구현을 숨기도록 이름 변경을 요청할 것입니다.

### 거부된 아이디어 (Rejected Ideas)

#### 원래 제거가 제안되었던 모듈 (Modules that were originally suggested for removal)

*   `asynchat`/`asyncore`: Josiah Carlson이 모듈을 유지 관리하겠다고 했습니다.
*   `audioop`/`sunau`/`aifc`: 형식(format)이 여전히 사용되는 오디오 모듈입니다.
*   `base64`/`quopri`/`uu`: 모두 여전히 널리 사용됩니다. `codecs` 모듈은 기본 사용법에 대해 그렇게 좋은 API를 제공하지 않습니다.
*   `fileinput`: `stdin`으로 작업해야 할 때 유용합니다.
*   `linecache`: 내부적으로 여러 곳에서 사용됩니다.
*   `nis`: NIS의 새 설치가 여전히 발생하고 있다는 사람들의 증언이 있습니다.
*   `getopt`: `optparse`보다 간단합니다.
*   `repr`: 오버라이딩(overriding)의 기초로 유용합니다. 내부적으로 사용됩니다.
*   `sched`: 시뮬레이션에 유용합니다.
*   `symtable`/`_symtable`: 문서가 작성되었습니다.
*   `telnetlib`: 빠르고 간단한 원격 액세스에 정말 편리합니다. 일부 하드웨어는 구성 및 쿼리(querying)를 위해 Telnet을 지원합니다.
*   `Tkinter`: IDLE의 존재를 막을 것입니다. 기본적으로 사용 가능한 GUI 툴킷이 없을 것입니다.

#### 새로운 최상위 패키지 도입 (Introducing a new top-level package)

전체 stdlib를 자체 패키지 내에 배치해야 한다는 제안이 있었습니다. 이 PEP는 이 문제가 자체적인 설계 문제(명명, import 의미론에서 특별한 고려 사항이 필요한지 등)를 가지고 있기 때문에 다루지 않을 것입니다. 이 PEP 내의 모든 내용은 새 최상위 패키지가 도입되더라도 쉽게 처리될 수 있습니다.

#### 테마 관련 모듈을 포함할 새 패키지 도입 (Introducing new packages to contain theme-related modules)

이 PEP를 작성하는 동안 stdlib에 특정 테마가 나타나는 것이 발견되었습니다. 과거에 사람들은 유사한 테마를 공유하는 모듈(예: 오디오)을 수집하는 데 도움이 되는 새 패키지를 도입할 것을 제안했습니다. 일부 새 패키지를 제안하기 위해 "Open Issue"가 생성되었습니다.

그러나 결국 아이디어를 추진할 만큼 충분한 지지를 얻지 못했습니다. 대신 이름 단순화가 PEP를 만드는 주요 원동력으로 선택되었습니다.

### 참고 자료 (References)

*   Python-Dev email: “Py3k release schedule worries” (https://mail.python.org/pipermail/python-3000/2006-December/005130.html)
*   Python-Dev email: Autoloading? (https://mail.python.org/pipermail/python-dev/2005-October/057244.html)
*   2to3 refactoring tool (http://svn.python.org/view/sandbox/trunk/2to3/)
*   PyOpenGL (http://pyopengl.sourceforge.net/)
*   Python Imaging Library (PIL) (http://www.pythonware.com/products/pil/)
*   Twisted (http://twistedmatrix.com/trac/)
*   SGI Press Release: End of General Availability for MIPS IRIX Products – December 2006 (http://www.sgi.com/support/mips_irix.html)
*   FORMS Library by Mark Overmars (ftp://ftp.cs.ruu.nl/pub/SGI/FORMS)
*   appscript (http://appscript.sourceforge.net/)
*   _ast module (http://docs.python.org/library/ast.html)
*   python-dev email: getting compiler package failures (https://mail.python.org/pipermail/python-3000/2007-May/007615.html)

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.