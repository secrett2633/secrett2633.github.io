---
title: "[Final] PEP 428 - The pathlib module – object-oriented filesystem paths"
excerpt: "Python Enhancement Proposal 428: 'The pathlib module – object-oriented filesystem paths'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/428/
toc: true
toc_sticky: true
date: 2025-09-26 21:42:10+0900
last_modified_at: 2025-09-26 21:42:10+0900
published: true
---
> **원문 링크:** [PEP 428 - The pathlib module – object-oriented filesystem paths](https://peps.python.org/pep-0428/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 30-Jul-2012

PEP 428은 `pathlib` 모듈을 표준 라이브러리에 포함할 것을 제안합니다. 이 모듈의 목표는 파일 시스템 경로와 관련된 일반적인 작업을 처리하기 위한 간단한 클래스 계층을 제공하는 것입니다.

## 개요
기존 `os.path` 모듈이 문자열 기반으로 파일 경로를 처리하는 데 비해, `pathlib`는 객체 지향적인 접근 방식을 제공하여 파일 경로를 더욱 직관적이고 안전하게 다룰 수 있도록 합니다. 이 제안은 PEP 355에서 객체 지향 API가 거부되었던 경험과 `path.py`, Twisted의 `FilePath`, Unipath 등 여러 서드파티 구현체들의 장점을 학습하여 만들어졌습니다.

## 객체 지향 API의 필요성
파일 시스템 경로를 전용 클래스로 표현하는 이유는 날짜, 시간, IP 주소와 같은 다른 종류의 상태 없는(stateless) 객체와 동일합니다. Python은 C 언어의 API를 엄격하게 복제하는 방식에서 벗어나, 일반적인 기능에 대해 더 나은, 더 유용한 추상화를 제공하는 방향으로 발전해왔습니다. `datetime` 모듈을 사용하여 날짜와 시간을 다루는 것이 숫자 타임스탬프와 `time` 모듈 API를 사용하는 것보다 선호되는 것처럼, 전용 클래스를 사용하면 Windows 경로의 대소문자 무시(case insensitivity)와 같이 바람직한 동작을 기본적으로 활성화할 수 있습니다.

## 제안 내용

### 클래스 계층 (Class hierarchy)
`pathlib` 모듈은 다음과 같은 간단한 클래스 계층을 구현합니다.

```
+----------+
|          |
---------| PurePath |--------
|          |
|          |
+----------+
|          |
|          |
v          v
+---------------+    +-----------------+
|               |    |                 |
| PurePosixPath |    | PureWindowsPath |
|               |    |                 |
+---------------+    +-----------------+
v                    v
+------+
|      |
-------| Path |------
|      |
|      |
+------+
|      |
|      |
v      v
+-----------+    +-------------+
|           |    |             |
| PosixPath |    | WindowsPath |
|           |    |             |
+-----------+    +-------------+
```

이 계층은 경로 클래스를 두 가지 차원으로 나눕니다.
1.  **순수(Pure) 또는 구체(Concrete):**
    *   **순수 클래스 (`PurePath`, `PurePosixPath`, `PureWindowsPath`):** 실제 I/O 작업이 필요 없는 경로 조작 작업만 지원합니다.
    *   **구체 클래스 (`Path`, `PosixPath`, `WindowsPath`):** 순수 클래스의 모든 작업에 더하여 I/O 작업을 지원합니다.
2.  **운영 체제 종류(Flavour):**
    *   **Windows 경로 (`PureWindowsPath`, `WindowsPath`):** Windows 시스템의 파일 시스템 의미론을 따릅니다.
    *   **POSIX 경로 (`PurePosixPath`, `PosixPath`):** 다른 시스템(Unix-like)의 파일 시스템 의미론을 따릅니다.

어떤 시스템에서도 순수 클래스는 인스턴스화할 수 있습니다. 예를 들어, Windows에서 `PurePosixPath` 객체를, Unix에서 `PureWindowsPath` 객체를 조작할 수 있습니다. 그러나 구체 클래스는 해당 시스템에서만 인스턴스화할 수 있습니다.

`PurePath`는 운영 체제에 따라 `PurePosixPath` 또는 `PureWindowsPath`를 인스턴스화하며, `Path`는 `PosixPath` 또는 `WindowsPath`를 인스턴스화하는 시스템 의존적인 팩토리 역할을 하는 두 개의 기본 클래스가 있습니다. 대부분의 경우 `Path` 클래스를 사용하는 것이 적합하다고 예상됩니다.

### 내장 타입과의 혼동 방지 (No confusion with builtins)
`pathlib`의 경로 클래스는 내장 타입에서 파생되지 않습니다. 이는 `str`을 상속하는 일부 다른 `Path` 클래스 제안과 대조됩니다. 또한, 시퀀스 프로토콜을 구현하지 않습니다. 경로를 시퀀스처럼 다루려면 전용 속성인 `parts`를 사용해야 합니다. `str`을 상속하지 않는 주된 이유는 경로를 나타내는 문자열과 그렇지 않은 문자열 간의 우발적인 연산을 방지하기 위함입니다.

### 불변성 (Immutability)
`Path` 객체는 불변(immutable)하며, 이는 해시 가능(hashable)하게 만들고 특정 종류의 프로그래밍 오류를 방지합니다.

### 합리적인 동작 (Sane behaviour)
`os.path`의 기능 중 많은 부분이 재사용되지 않습니다. `os.path`의 많은 함수는 하위 호환성 때문에 혼란스럽거나 잘못된 동작에 묶여 있습니다(예: `os.path.abspath()`가 심볼릭 링크를 먼저 해석하지 않고 ".." 경로 구성 요소를 단순화하는 사실).

### 비교 (Comparisons)
동일한 `flavour`의 경로는 순수(pure) 여부와 관계없이 비교 및 정렬 가능합니다. Windows 경로 객체는 대소문자를 구분하지 않고 비교됩니다. 다른 `flavour`의 경로는 항상 같지 않게 비교되며, 정렬할 수 없습니다.

```python
>>> PurePosixPath('a') == PurePosixPath('b')
False
>>> PurePosixPath('a') < PurePosixPath('b')
True
>>> PurePosixPath('a') == PosixPath('a')
True

>>> PureWindowsPath('a') == PureWindowsPath('A')
True

>>> PurePosixPath('a') == PureWindowsPath('a')
False
>>> PurePosixPath('a') < PureWindowsPath('a')
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: unorderable types: PurePosixPath() < PureWindowsPath()
```

### 유용한 표기법 (Useful notations)
API는 마법적인(magic) 요소를 피하면서도 유용한 표기법을 제공합니다.

```python
>>> p = Path('/home/antoine/pathlib/setup.py')
>>> p.name # 파일 또는 디렉토리의 마지막 구성 요소
'setup.py'
>>> p.suffix # 파일 확장자
'.py'
>>> p.root # 경로의 루트 부분
'/'
>>> p.parts # 경로의 구성 요소를 나타내는 튜플
('/', 'home', 'antoine', 'pathlib', 'setup.py')
>>> p.relative_to('/home/antoine') # 특정 경로에 대한 상대 경로
PosixPath('pathlib/setup.py')
>>> p.exists() # 경로 존재 여부 (구체 경로에서만 가능)
True
```

## Pure paths API

`PurePath` API의 철학은 `os.path`처럼 기능들을 뒤죽박죽으로 노출하는 대신, 일관되고 유용한 경로 조작 작업 배열을 제공하는 것입니다.

### 정의 (Definitions)
*   모든 경로는 드라이브(drive)와 루트(root)를 가질 수 있습니다. POSIX 경로의 경우 드라이브는 항상 비어 있습니다.
*   상대 경로(relative path)는 드라이브와 루트를 모두 갖지 않습니다.
*   POSIX 경로는 루트를 가지면 절대 경로(absolute path)입니다. Windows 경로는 드라이브와 루트를 모두 가지면 절대 경로입니다.
*   Windows UNC 경로(예: `\\host\share\myfile.txt`)는 항상 드라이브와 루트를 가집니다.
*   드라이브 또는 루트를 가지는 경로는 "앵커링(anchored)"되었다고 합니다. 앵커(anchor)는 드라이브와 루트의 연결입니다. POSIX에서는 "앵커링"이 "절대 경로"와 동일합니다.

### 생성 (Construction)
경로를 생성하는 가장 간단한 방법은 문자열 표현을 전달하는 것입니다. 여러 인수를 전달하면 자동으로 조인(join)됩니다. `os.path.join`과 유사하게, 앵커링된 경로는 이전에 조인된 구성 요소의 정보를 무시합니다.

```python
>>> PurePath('setup.py')
PurePosixPath('setup.py')
>>> PurePath('a///b/c/./d/') # 불필요한 경로 구분자와 "." 구성 요소는 제거됩니다.
PurePosixPath('a/b/c/d')
>>> PurePath('docs', 'Makefile')
PurePosixPath('docs/Makefile')
>>> PurePath('/etc', '/usr', 'bin') # 앵커링된 경로는 이전 정보를 무시
PurePosixPath('/usr/bin')
>>> PureWindowsPath('c:/foo', '/Windows') # Windows 경로의 경우 드라이브는 유지
PureWindowsPath('c:/Windows')
>>> PureWindowsPath('c:/foo', 'd:')
PureWindowsPath('d:')
>>> PureWindowsPath('a/b') == PureWindowsPath('a\\b') # 경로 구분자는 플랫폼 기본값으로 정규화됩니다.
True
>>> PurePosixPath('a/../b') # ".." 구성 요소는 제거되지 않습니다.
PurePosixPath('a/../b')
```

UNC 표기법 때문에 Windows 경로에서는 여러 개의 선행 슬래시가 항상 유지됩니다. POSIX에서는 정확히 두 개의 선행 슬래시가 있는 경우를 제외하고는 단일 슬래시로 축약됩니다.

### 표현 (Representing)
경로를 문자열로 표현하려면 `str()`을 호출합니다. 항상 슬래시(`as_posix()`)로 표현하거나, 바이트 표현(`bytes()`), 파일 URI(`as_uri()`)로도 얻을 수 있습니다. `repr()`은 Windows에서도 항상 가독성을 위해 슬래시를 사용합니다.

### 속성 (Properties)
모든 경로에 여러 간단한 속성이 제공됩니다 (각각 비어 있을 수 있음).

```python
>>> p = PureWindowsPath('c:/Downloads/pathlib.tar.gz')
>>> p.drive
'c:'
>>> p.root
'\\'
>>> p.anchor
'c:\\'
>>> p.name
'pathlib.tar.gz'
>>> p.stem
'pathlib.tar'
>>> p.suffix
'.gz'
>>> p.suffixes
['.tar', '.gz']
```

### 새 경로 파생 (Deriving new paths)

#### 조인 (Joining)
`/` 연산자를 사용하여 경로를 다른 경로와 조인할 수 있습니다. `joinpath()` 메서드도 동일한 동작으로 제공됩니다.

```python
>>> p = PurePosixPath('foo')
>>> p / 'bar'
PurePosixPath('foo/bar')
>>> p / 'bar' / 'xyzzy'
PurePosixPath('foo/bar/xyzzy')
>>> p.joinpath('Python')
PurePosixPath('foo/Python')
```

#### 경로의 마지막 구성 요소 변경 (Changing the path's final component)
`with_name()` 메서드는 이름이 변경된 새 경로를 반환합니다. 경로에 실제 이름이 없으면 `ValueError`가 발생합니다. `with_suffix()` 메서드는 확장자가 변경된 새 경로를 반환합니다.

#### 경로를 상대적으로 만들기 (Making the path relative)
`relative_to()` 메서드는 한 경로에 대한 다른 경로의 상대적 차이를 계산합니다. 의미 있는 값을 반환할 수 없는 경우 `ValueError`가 발생합니다.

```python
>>> PurePosixPath('/usr/bin/python').relative_to('/usr')
PurePosixPath('bin/python')
```

### 시퀀스 유사 접근 (Sequence-like access)
`parts` 속성은 경로 구성 요소에 대한 읽기 전용 시퀀스 접근을 제공하는 튜플을 반환합니다. `parent` 속성은 경로의 논리적 부모를 반환하며, `parents` 속성은 경로의 논리적 조상들의 불변 시퀀스를 반환합니다.

```python
>>> p = PurePosixPath('/etc/init.d')
>>> p.parts
('/', 'etc', 'init.d')
>>> p = PureWindowsPath('c:/python33/bin/python.exe')
>>> p.parent
PureWindowsPath('c:/python33/bin')
>>> p.parents[1]
PureWindowsPath('c:/python33')
```

### 쿼리 (Querying)
*   `is_relative()`: 경로가 상대 경로인지 여부를 반환합니다.
*   `is_reserved()`: Windows 경로가 `CON` 또는 `NUL`과 같은 예약된 경로인지 여부를 반환합니다. POSIX 경로의 경우 항상 `False`를 반환합니다.
*   `match()`: glob 패턴과 경로를 일치시킵니다. 개별 `parts`에 대해 작동하며 오른쪽부터 일치시킵니다.

```python
>>> p = PurePosixPath('/usr/bin')
>>> p.match('/usr/b*')
True
>>> p.match('b*')
True
>>> p.match('/u*')
False
```

## Concrete paths API
`concrete path`는 `pure API`의 작업 외에도 파일 시스템에 실제로 접근하여 정보를 쿼리하거나 변경하는 추가 메서드를 제공합니다.

### 생성 (Constructing)
클래스 메서드 `cwd()`는 현재 작업 디렉터리를 가리키는 절대 경로 객체를 생성합니다.

### 파일 메타데이터 (File metadata)
`stat()` 및 `lstat()` 메서드는 파일의 `stat()` 결과를 반환합니다. `exists()`, `is_file()`, `is_dir()`, `is_symlink()` 등과 같은 상위 수준 메서드는 파일의 종류를 확인하는 데 도움을 줍니다. `owner()` 및 `group()` 메서드를 통해 파일 소유자 및 그룹 이름을 쿼리할 수 있습니다.

### 경로 해석 (Path resolution)
`resolve()` 메서드는 경로를 절대 경로로 만들고, 도중에 있는 모든 심볼릭 링크를 해석합니다. 이는 ".." 경로 구성 요소를 제거하는 유일한 작업입니다. Windows에서는 이 메서드가 정식 경로(올바른 대소문자)를 반환하는 것도 처리합니다.

### 디렉터리 탐색 (Directory walking)
`iterdir()` 메서드를 호출하여 단순(비재귀적) 디렉터리 접근을 수행하며, 이는 자식 경로에 대한 이터레이터를 반환합니다. 또한, 단순 및 재귀적인 globbing도 제공됩니다.

```python
>>> p = Path('docs')
>>> for child in p.iterdir():
        print(child)
PosixPath('docs/conf.py')
# ... (다른 자식 경로들)

>>> p = Path('.')
>>> [child for child in p.iterdir() if child.is_dir()]
[PosixPath('.hg'), PosixPath('docs'), PosixPath('dist'), PosixPath('__pycache__'), PosixPath('build')]

>>> p = Path('.')
>>> for child in p.glob('**/*.py'):
        print(child)
PosixPath('test_pathlib.py')
# ... (다른 .py 파일들)
```

### 파일 열기 (File opening)
`open()` 메서드는 내장 `open()` 메서드와 유사한 파일 열기 API를 제공합니다.

```python
>>> p = Path('setup.py')
>>> with p.open() as f:
        f.readline()
'#!/usr/bin/env python3\n'
```

### 파일 시스템 수정 (Filesystem modification)
`touch()`, `mkdir()`, `rename()`, `replace()`, `unlink()`, `rmdir()`, `chmod()`, `lchmod()`, `symlink_to()`와 같은 여러 일반적인 파일 시스템 작업이 메서드로 제공됩니다.

## 논의 (Discussion)

### 나눗셈 연산자 (Division operator)
경로 조인 연산자에 대한 설문조사에서 나눗셈 연산자(`/`)가 가장 먼저 나왔습니다. 초기 `pathlib` 버전에서는 대괄호(즉, `__getitem__`)를 사용했습니다.

### joinpath()
`joinpath()` 메서드는 원래 `join()`으로 불렸으나, `str.join()`과 혼동될 수 있다는 반대 의견이 있어 `joinpath()`로 이름이 변경되었습니다.

### 대소문자 구분 (Case-sensitivity)
Windows 사용자들은 파일 시스템 경로가 대소문자를 구분하지 않는다고 생각하며, 경로 객체도 그 특성을 따르기를 기대합니다. 이는 드물게 Windows에서 일부 외부 파일 시스템 마운트가 대소문자를 구분할 수 있음에도 불구하고 그렇습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.