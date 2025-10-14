---
title: "[Rejected] PEP 355 - Path - Object oriented filesystem paths"
excerpt: "Python Enhancement Proposal 355: 'Path - Object oriented filesystem paths'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/355/
toc: true
toc_sticky: true
date: 2025-09-27 01:12:42+0900
last_modified_at: 2025-09-27 01:12:42+0900
published: true
---
> **원문 링크:** [PEP 355 - Path - Object oriented filesystem paths](https://peps.python.org/pep-0355/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 24-Jan-2006

PEP 355 – Path: 객체 지향 파일 시스템 경로 (거부됨)

## 개요
이 문서는 Python Enhancement Proposal (PEP) 355의 내용을 한국어로 번역하고 요약한 것입니다. PEP 355는 파일 시스템 경로를 객체 지향 방식으로 처리하기 위한 새로운 `Path` 클래스를 `os` 모듈에 추가할 것을 제안했습니다. 하지만 이 PEP는 최종적으로 거부되었습니다.

## 거부 고지 (Rejection Notice)
이 PEP는 현재 형태로 거부되었습니다. 제안된 `Path` 클래스는 너무 많은 기능을 포함하는 "만물상(kitchen sink)" 형태였으며, 경로를 사용하는 모든 기능을 단일 클래스의 메서드로 구현하는 방식은 안티패턴으로 간주되었습니다. (예: `open()`이나 `execfile()` 같은 기능은 왜 포함되지 않았는가?) `str`을 상속받는 것은 특히 나쁜 아이디어였습니다. 많은 문자열(string) 작업이 경로(path)에 적용될 때 의미가 없기 때문입니다. 이 PEP는 오랫동안 보류되어 왔으며, 논의가 간헐적으로 재점화되었으나, 이제 이 PEP를 종결할 때가 되었다고 결정되었습니다. 덜 과장된 제안이라면 더 받아들여질 수도 있을 것입니다.

## Abstract (요약)
이 PEP는 `os` 모듈에 새로운 `Path` 클래스를 추가하여 경로를 객체 지향 방식으로 처리할 것을 제안합니다. 또한, 관련 함수의 "약한" Deprecation (비활성화 권고)에 대해서도 논의하고 권고합니다.

## Background (배경)
이 PEP에서 제시된 아이디어는 최근의 것이 아니라, 수년 동안 Python 커뮤니티에서 논의되어 왔습니다. 많은 이들이 `os.path` 모듈에서 제공하는 파일 경로 조작 API가 부적절하다고 느꼈습니다. `Path` 객체에 대한 첫 번째 제안은 2001년 Just van Rossum이 python-dev에서 제기했습니다. 2003년, Jason Orendorff는 경로를 객체로 표현하는 최초의 공개 구현인 "path module" 버전 1.0을 발표했습니다.

`path` 모듈은 빠르게 인기를 얻었고, `path` 모듈을 Python 표준 라이브러리에 포함시키려는 수많은 시도가 있었습니다.

이 PEP는 `path` 모듈에 대해 사람들이 표현한 아이디어와 제안을 요약하고, 수정된 버전이 표준 라이브러리에 포함되어야 한다고 제안합니다.

## Motivation (동기)
파일 시스템 경로를 다루는 것은 모든 프로그래밍 언어에서 흔한 작업이며, Python과 같은 고급 언어에서는 매우 일반적입니다. 이 작업에 대한 좋은 지원이 필요한 이유는 다음과 같습니다:

*   거의 모든 프로그램이 파일을 액세스하기 위해 경로를 사용합니다. 자주 수행되는 작업은 가능한 한 직관적이고 쉽게 수행될 수 있어야 합니다.
*   이는 Python을 복잡한 셸 스크립트를 대체하기에 더 좋은 언어로 만듭니다.
*   현재 Python은 경로를 처리하기 위해 여러 모듈에 흩어져 있는 많은 함수들을 가지고 있습니다. 이로 인해 초보자와 숙련된 개발자 모두에게 올바른 메서드를 선택하기 어렵습니다.

`Path` 클래스는 현재의 일반적인 방식에 비해 다음과 같은 개선 사항을 제공합니다:

*   하나의 "통합된(unified)" 객체가 이전 함수의 모든 기능을 제공합니다.
*   **Subclassability (하위 클래스화 가능성)**: `Path` 객체는 파일 시스템 경로 외의 다른 경로를 지원하도록 확장될 수 있습니다. 프로그래머는 새로운 API를 배울 필요 없이 `Path`에 대한 지식을 재사용하여 확장된 클래스를 다룰 수 있습니다.
*   모든 관련 기능이 한곳에 있기 때문에, 올바른 접근 방식을 배우기 쉽고, 여러 모듈을 뒤져서 올바른 함수를 찾을 필요가 없습니다.
*   Python은 객체 지향 언어입니다. 파일, `datetime`, 소켓(socket)과 마찬가지로 경로는 객체이며, 단순히 함수에 전달되는 문자열이 아닙니다. `Path` 객체는 본질적으로 Pythonic한 아이디어입니다.
*   `Path`는 속성(properties)을 활용합니다. 속성은 더 읽고 쉬운 코드를 만듭니:
    ```
     if imgpath.ext == 'jpg':
         jpegdecode(imgpath)
    ```
    이것은 다음보다 낫습니다:
    ```
     if os.path.splitexit(imgpath)[1] == 'jpg':
         jpegdecode(imgpath)
    ```

## Rationale (설계 원칙)
다음은 설계의 주요 요점입니다:

*   `Path`는 `str`을 상속하므로, 문자열 경로명을 기대하는 모든 코드는 수정될 필요가 없으며 기존 코드가 손상되지 않습니다.
*   `Path` 객체는 `Path.cwd()` 클래스 메서드를 사용하거나, 경로를 나타내는 문자열로 클래스를 인스턴스화하거나, `Path(".")`와 동등한 기본 생성자를 사용하여 생성할 수 있습니다.
*   `Path`는 일반적인 경로명 조작, 패턴 확장, 패턴 일치(matching) 및 복사를 포함한 다른 고수준 파일 작업을 제공합니다. 기본적으로 `Path`는 파일 내용 조작을 제외한 모든 경로 관련 기능을 제공합니다. 파일 내용 조작에는 파일 객체가 더 적합합니다.
*   플랫폼 비호환성은 시스템별 메서드를 인스턴스화하지 않음으로써 처리됩니다.

## Specification (세부 사양)
`Path` 클래스는 다음과 같은 공개 인터페이스를 정의합니다 (참조 구현에서 docstring을 추출하고 간결하게 줄였습니다. 자세한 내용은 참조 구현을 참조하십시오).

```python
class Path(str):
    # Special Python methods:
    def __new__(cls, *args) => Path
        """
        *args를 연결하여 새 Path 객체를 생성합니다.
        *args는 Path 객체 또는 문자열만 포함할 수 있습니다.
        *args가 비어 있으면 Path(os.curdir)가 생성됩니다.
        """
    def __repr__(self): ...
    def __add__(self, more): ...
    def __radd__(self, other): ...

    # Alternative constructor.
    def cwd(cls): ...

    # Operations on path strings:
    def abspath(self) => Path
        """자신의 절대 경로를 새 Path 객체로 반환합니다."""
    def normcase(self): ...
    def normpath(self): ...
    def realpath(self): ...
    def expanduser(self): ...
    def expandvars(self): ...
    def basename(self): ...
    def expand(self): ...
    def splitpath(self) => (Path, str)
        """p.splitpath() -> (p.parent, p.name)을 반환합니다."""
    def stripext(self) => Path
        """p.stripext() -> 경로에서 하나의 파일 확장자를 제거합니다."""
    def splitunc(self): ... # 각주 [1] 참조
    def splitall(self): ...
    def relpath(self): ...
    def relpathto(self, dest): ...

    # Properties about the path:
    parent => Path
        """이 Path의 부모 디렉토리를 새 Path 객체로 반환합니다."""
    name => str
        """전체 경로 없이 파일 또는 디렉토리의 이름을 반환합니다."""
    ext => str
        """파일 확장자 또는 Path가 확장자 없는 파일이나 디렉토리를 참조하는 경우 빈 문자열."""
    drive => str
        """드라이브 지정자. 드라이브 지정자를 사용하지 않는 시스템에서는 항상 비어 있습니다."""
    namebase => str
        """path.name과 동일하지만 하나의 파일 확장자가 제거됩니다."""
    uncshare # 각주 [1] 참조

    # Operations that return lists of paths:
    def listdir(self, pattern = None): ...
    def dirs(self, pattern = None): ...
    def files(self, pattern = None): ...
    def walk(self, pattern = None): ...
    def walkdirs(self, pattern = None): ...
    def walkfiles(self, pattern = None): ...
    def match(self, pattern) => bool
        """self.name이 주어진 패턴과 일치하면 True를 반환합니다."""
    def matchcase(self, pattern) => bool
        """match()와 유사하지만 대소문자를 구분하지 않는 파일 시스템에서도 대소문자 구분을 보장합니다."""
    def glob(self, pattern):

    # Methods for retrieving information about the filesystem path:
    def exists(self): ...
    def isabs(self): ...
    def isdir(self): ...
    def isfile(self): ...
    def islink(self): ...
    def ismount(self): ...
    def samefile(self, other): ... # 각주 [1] 참조
    def atime(self): ... """파일의 마지막 접근 시간."""
    def mtime(self): ... """파일의 마지막 수정 시간."""
    def ctime(self): ... """
        일부 시스템(예: Unix)에서는 마지막 변경 시간,
        다른 시스템(예: Windows)에서는 Path의 생성 시간인 시스템의 ctime을 반환합니다.
        """
    def size(self): ...
    def access(self, mode): ... # 각주 [1] 참조
    def stat(self): ...
    def lstat(self): ...
    def statvfs(self): ... # 각주 [1] 참조
    def pathconf(self, name): ... # 각주 [1] 참조

    # Methods for manipulating information about the filesystem path.
    def utime(self, times) => None
    def chmod(self, mode) => None
    def chown(self, uid, gid) => None # 각주 [1] 참조
    def rename(self, new) => None
    def renames(self, new) => None

    # Create/delete operations on directories
    def mkdir(self, mode = 0o777): ...
    def makedirs(self, mode = 0o777): ...
    def rmdir(self): ...
    def removedirs(self): ...

    # Modifying operations on files
    def touch(self): ...
    def remove(self): ...
    def unlink(self): ...

    # Modifying operations on links
    def link(self, newpath): ...
    def symlink(self, newlink): ...
    def readlink(self): ...
    def readlinkabs(self): ...

    # High-level functions from shutil
    def copyfile(self, dst): ...
    def copymode(self, dst): ...
    def copystat(self, dst): ...
    def copy(self, dst): ...
    def copy2(self, dst): ...
    def copytree(self, dst, symlinks = True): ...
    def move(self, dst): ...
    def rmtree(self, ignore_errors = False, onerror = None): ...

    # Special stuff from os
    def chroot(self): ... # 각주 [1] 참조
    def startfile(self): ... # 각주 [1] 참조
```
각주: 이 메서드는 모든 플랫폼에서 사용 가능하다고 보장되지 않습니다.

## Replacing older functions with the Path class (기존 함수를 `Path` 클래스로 대체하기)
이 섹션에서 "a ==> b"는 b가 a를 대체할 수 있음을 의미합니다.
다음 예제에서는 `from path import Path`로 `Path` 클래스가 임포트되었다고 가정합니다.

`os.path.join` 대체:
```python
os.path.join(os.getcwd(), "foobar")    ==> Path(Path.cwd(), "foobar")
os.path.join("foo", "bar", "baz")      ==> Path("foo", "bar", "baz")
```

`os.path.splitext` 대체:
```python
fname = "Python2.4.tar.gz"
os.path.splitext(fname)[1]            ==> fname = Path("Python2.4.tar.gz")
                                          fname.ext
```
두 부분을 모두 원한다면:
```python
fname = "Python2.4.tar.gz"
base, ext = os.path.splitext(fname)   ==> fname = Path("Python2.4.tar.gz")
                                          base, ext = fname.namebase, fname.ext
```

`glob.glob` 대체:
```python
lib_dir = "/lib"
libs = glob.glob(os.path.join(lib_dir, "*s.o")) ==> lib_dir = Path("/lib")
                                                    libs = lib_dir.files("*.so")
```

## Deprecations (비활성화 권고)
이 모듈을 표준 라이브러리에 도입하면 여러 기존 모듈 및 함수의 "약한" 비활성화 권고가 필요합니다. 이 모듈과 함수들은 너무 널리 사용되므로, `DeprecationWarning`을 생성하는 방식으로 완전히 비활성화할 수는 없습니다. 여기서 "약한 비활성화 권고"는 문서에만 명시하는 것을 의미합니다.

아래 표는 비활성화 권고되어야 할 기존 기능을 나열합니다.

| Path method/property | Deprecates function               |
| :------------------- | :-------------------------------- |
| `normcase()`         | `os.path.normcase()`              |
| `normpath()`         | `os.path.normpath()`              |
| `realpath()`         | `os.path.realpath()`              |
| `expanduser()`       | `os.path.expanduser()`            |
| `expandvars()`       | `os.path.expandvars()`            |
| `parent`             | `os.path.dirname()`               |
| `name`               | `os.path.basename()`              |
| `splitpath()`        | `os.path.split()`                 |
| `drive`              | `os.path.splitdrive()`            |
| `ext`                | `os.path.splitext()`              |
| `splitunc()`         | `os.path.splitunc()`              |
| `__new__()`          | `os.path.join()`, `os.curdir`     |
| `listdir()`          | `os.listdir()` `[fnmatch.filter()]` |
| `match()`            | `fnmatch.fnmatch()`               |
| `matchcase()`        | `fnmatch.fnmatchcase()`           |
| `glob()`             | `glob.glob()`                     |
| `exists()`           | `os.path.exists()`                |
| `isabs()`            | `os.path.isabs()`                 |
| `isdir()`            | `os.path.isdir()`                 |
| `isfile()`           | `os.path.isfile()`                |
| `islink()`           | `os.path.islink()`                |
| `ismount()`          | `os.path.ismount()`               |
| `samefile()`         | `os.path.samefile()`              |
| `atime()`            | `os.path.getatime()`              |
| `ctime()`            | `os.path.getctime()`              |
| `mtime()`            | `os.path.getmtime()`              |
| `size()`             | `os.path.getsize()`               |
| `cwd()`              | `os.getcwd()`                     |
| `access()`           | `os.access()`                     |
| `stat()`             | `os.stat()`                       |
| `lstat()`            | `os.lstat()`                      |
| `statvfs()`          | `os.statvfs()`                    |
| `pathconf()`         | `os.pathconf()`                   |
| `utime()`            | `os.utime()`                      |
| `chmod()`            | `os.chmod()`                      |
| `chown()`            | `os.chown()`                      |
| `rename()`           | `os.rename()`                     |
| `renames()`          | `os.renames()`                    |
| `mkdir()`            | `os.mkdir()`                      |
| `makedirs()`         | `os.makedirs()`                   |
| `rmdir()`            | `os.rmdir()`                      |
| `removedirs()`       | `os.removedirs()`                 |
| `remove()`           | `os.remove()`                     |
| `unlink()`           | `os.unlink()`                     |
| `link()`             | `os.link()`                       |
| `symlink()`          | `os.symlink()`                    |
| `readlink()`         | `os.readlink()`                   |
| `chroot()`           | `os.chroot()`                     |
| `startfile()`        | `os.startfile()`                  |
| `copyfile()`         | `shutil.copyfile()`               |
| `copymode()`         | `shutil.copymode()`               |
| `copystat()`         | `shutil.copystat()`               |
| `copy()`             | `shutil.copy()`                   |
| `copy2()`            | `shutil.copy2()`                  |
| `copytree()`         | `shutil.copytree()`               |
| `move()`             | `shutil.move()`                   |
| `rmtree()`           | `shutil.rmtree()`                 |

`Path` 클래스는 `os.path`, `shutil`, `fnmatch`, `glob` 전체와 `os` 모듈의 상당 부분을 비활성화 권고합니다.

## Closed Issues (해결된 문제)
이 PEP가 python-dev에 처음 등장한 이후 여러 논쟁적인 문제가 해결되었습니다:

*   `__div__()` 메서드가 제거되었습니다. `/`(나누기) 연산자를 오버로딩하는 것은 "지나친 마법(too much magic)"일 수 있으며, 경로 연결이 나누기로 보일 수 있습니다. 필요하다면 BDFL(Benevolent Dictator For Life)의 결정에 따라 나중에 다시 추가될 수 있습니다. 대신 `__new__()`는 `Path`와 문자열 객체 모두를 받아들이는 `*args` 인수를 받게 되었습니다. `*args`는 `os.path.join()`을 사용하여 연결되며, 이 함수는 `Path` 객체를 구성하는 데 사용됩니다. 이러한 변경으로 문제가 있던 `joinpath()` 메서드는 쓸모없어져 제거되었습니다.
*   `getatime()/atime`, `getctime()/ctime`, `getmtime()/mtime`, `getsize()/size` 메서드와 속성은 서로 중복되었습니다. 이들은 `atime()`, `ctime()`, `mtime()`, `size()`로 병합되었습니다. 이들이 속성 대신 메서드인 이유는 예상치 못하게 변경될 가능성이 있기 때문입니다. 다음 예제는 항상 어설션(assertion)을 통과한다고 보장할 수 없습니다:
    ```python
    p = Path("foobar")
    s = p.size()
    assert p.size() == s
    ```

## Open Issues (미해결 문제)
Jason Orendorff의 `path` 모듈의 일부 기능은 생략되었습니다:

*   경로를 여는 함수는 내장 `open()` 함수로 더 잘 처리됩니다.
*   전체 파일을 읽고 쓰는 함수는 파일 객체의 `read()` 및 `write()` 메서드로 더 잘 처리됩니다.
*   `chdir()` 함수는 포함할 가치가 있을 수 있습니다.
*   비활성화 권고(deprecation) 일정이 설정되어야 합니다. `Path`는 얼마나 많은 기능을 구현해야 할까요? 기존 기능 중 얼마나 많은 부분을 언제 비활성화 권고해야 할까요?
*   이름은 분명히 "path" 또는 "Path"여야 하지만, 어디에 위치해야 할까요? 자체 모듈에 있을까요, 아니면 `os`에 있을까요?
*   `Path`가 `str` 또는 `unicode`를 상속하기 때문에, 다음과 같은 비마법적(non-magic) 공개 메서드가 `Path` 객체에서 사용 가능합니다:
    `capitalize()`, `center()`, `count()`, `decode()`, `encode()`, `endswith()`, `expandtabs()`, `find()`, `index()`, `isalnum()`, `isalpha()`, `isdigit()`, `islower()`, `isspace()`, `istitle()`, `isupper()`, `join()`, `ljust()`, `lower()`, `lstrip()`, `replace()`, `rfind()`, `rindex()`, `rjust()`, `rsplit()`, `rstrip()`, `split()`, `splitlines()`, `startswith()`, `strip()`, `swapcase()`, `title()`, `translate()`, `upper()`, `zfill()`
    python-dev에서는 이러한 상속이 합리적인지에 대해 논쟁이 있었습니다. 대부분의 논의자들은 파일 시스템 경로의 맥락에서 대부분의 문자열 메서드가 의미가 없으며, 단지 불필요한 부담일 뿐이라고 말했습니다. 다른 의견은 문자열을 상속하는 것이 매우 편리하며, `Path` 객체에 대해 코드를 "그냥 작동하도록" 만들 수 있어서 적응할 필요가 없다는 것이었습니다.
    문제 중 하나는 Python 수준에서 객체가 `str` 또는 `unicode`를 상속하지 않는 한, 내장 함수 `open()` (및 문자열 또는 버퍼를 기대하는 다른 내장 함수)에 전달할 수 있을 만큼 "문자열과 유사하게" 만들 방법이 없다는 것입니다. 따라서 문자열을 상속하지 않으려면 CPython 코어를 변경해야 합니다.
*   이 새로운 모듈이 대체하려는 함수와 모듈들 (`os.path`, `shutil`, `fnmatch`, `glob`, 그리고 `os`의 일부)은 하위 호환성을 유지하기 위해 미래의 Python 버전에서도 오랫동안 사용 가능할 것으로 예상됩니다.

## Reference Implementation (참조 구현)
현재 `Path` 클래스는 표준 라이브러리 모듈인 `fnmatch`, `glob`, `os`, `os.path`, `shutil`에 대한 얇은 래퍼(thin wrapper)로 구현되어 있습니다. 이 PEP의 의도는 앞서 언급된 모듈의 기능을 `Path`로 옮기고, 이들을 비활성화 권고하는 것입니다.

자세한 내용과 구현은 다음을 참조하십시오:
http://wiki.python.org/moin/PathModule

## Examples (예시)
이 섹션에서 "a ==> b"는 b가 a를 대체할 수 있음을 의미합니다.

디렉토리 내의 모든 Python 파일을 실행 가능하게 만들기:
```python
DIR = '/usr/home/guido/bin'
for f in os.listdir(DIR):
    if f.endswith('.py'):
        path = os.path.join(DIR, f)
        os.chmod(path, 0o755)
==>
for f in Path('/usr/home/guido/bin').files("*.py"):
    f.chmod(0o755)
```

Emacs 백업 파일 삭제:
```python
def delete_backups(arg, dirname, names):
    for name in names:
        if name.endswith('~'):
            os.remove(os.path.join(dirname, name))
os.path.walk(os.environ['HOME'], delete_backups, None)
==>
d = Path(os.environ['HOME'])
for f in d.walkfiles('*~'):
    f.remove()
```

파일의 상대 경로 찾기:
```python
b = Path('/users/peter/')
a = Path('/users/peter/synergy/tiki.txt')
a.relpathto(b)
```

경로를 디렉토리와 파일명으로 분할:
```python
os.path.split("/path/to/foo/bar.txt")
==>
Path("/path/to/foo/bar.txt").splitpath()
```

현재 디렉토리 트리에서 모든 Python 스크립트 나열:
```python
list(Path().walkfiles("*.py"))
```

## References and Footnotes (참조 및 각주)
*   이 메서드는 모든 플랫폼에서 사용 가능하다고 보장되지 않습니다.
*   “(idea) subclassable string: path object?”, van Rossum, 2001.
    `https://mail.python.org/pipermail/python-dev/2001-August/016663.html`
*   “path module v1.0 released”, Orendorff, 2003.
    `https://mail.python.org/pipermail/python-announce-list/2003-January/001984.html`
*   “Some RFE for review”, Birkenfeld, 2005.
    `https://mail.python.org/pipermail/python-dev/2005-June/054438.html`
*   “path module”, Orendorff, 2003.
    `https://mail.python.org/pipermail/python-list/2003-July/174289.html`
*   “PRE-PEP: new Path class”, Roth, 2004.
    `https://mail.python.org/pipermail/python-list/2004-January/201672.html`
*   `http://wiki.python.org/moin/PathClass`

## Copyright (저작권)
이 문서는 퍼블릭 도메인에 공개되었습니다.
최종 수정: 2025-02-01 08:59:27 GMT
Source: `https://github.com/python/peps/blob/main/peps/pep-0355.rst`

---
**주의:** 이 PEP는 최종적으로 거부되었으며, 제안된 `Path` 클래스는 Python 표준 라이브러리에 포함되지 않았습니다. 하지만 이 PEP에서 다루는 아이디어와 문제점은 이후 `pathlib` 모듈과 같은 다른 솔루션의 개발에 영향을 미쳤습니다.
```

## References and Footnotes (참조 및 각주)
*   이 메서드는 모든 플랫폼에서 사용 가능하다고 보장되지 않습니다.
*   “(idea) subclassable string: path object?”, van Rossum, 2001.
    `https://mail.python.org/pipermail/python-dev/2001-August/016663.html`
*   “path module v1.0 released”, Orendorff, 2003.
    `https://mail.python.org/pipermail/python-announce-list/2003-January/001984.html`
*   “Some RFE for review”, Birkenfeld, 2005.
    `https://mail.python.org/pipermail/python-dev/2005-June/054438.html`
*   “path module”, Orendorff, 2003.
    `https://mail.python.org/pipermail/python-list/2003-July/174289.html`
*   “PRE-PEP: new Path class”, Roth, 2004.
    `https://mail.python.org/pipermail/python-list/2004-January/201672.html`
*   `http://wiki.python.org/moin/PathClass`

## Copyright (저작권)
이 문서는 퍼블릭 도메인에 공개되었습니다.
최종 수정: 2025-02-01 08:59:27 GMT
Source: `https://github.com/python/peps/blob/main/peps/pep-0355.rst`

---
**주의:** 이 PEP는 최종적으로 거부되었으며, 제안된 `Path` 클래스는 Python 표준 라이브러리에 포함되지 않았습니다. 하지만 이 PEP에서 다루는 아이디어와 문제점은 이후 `pathlib` 모듈과 같은 다른 솔루션의 개발에 영향을 미쳤습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.