---
title: "[Deferred] PEP 505 - None-aware operators"
excerpt: "Python Enhancement Proposal 505: 'None-aware operators'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/505/
toc: true
toc_sticky: true
date: 2025-09-26 22:52:11+0900
last_modified_at: 2025-09-26 22:52:11+0900
published: true
---
> **원문 링크:** [PEP 505 - None-aware operators](https://peps.python.org/pep-0505/)
>
> **상태:** Deferred | **유형:** Standards Track | **작성일:** 18-Sep-2015


*   **작성자:** Mark E. Haase, Steve Dower
*   **상태:** Deferred (보류됨)
*   **유형:** Standards Track
*   **생성일:** 2015년 9월 18일
*   **Python 버전:** 3.8

---

## 개요 (Abstract)

C#, Dart, Perl, Swift, PHP(버전 7부터), 그리고 ECMAScript(JavaScript)의 드래프트 제안과 같은 여러 현대 프로그래밍 언어에는 "null-coalescing" 또는 "null-aware" 연산자가 존재합니다. 이러한 연산자들은 `null` 참조와 관련된 일반적인 패턴에 대한 문법적 설탕(syntactic sugar)을 제공합니다.

일반적으로:
*   **Null-coalescing 연산자** 는 이항 연산자로, 왼쪽 피연산자가 `null`이 아니면 왼쪽 피연산자를 반환하고, 그렇지 않으면 오른쪽 피연산자를 반환합니다.
*   **Null-aware 멤버 접근 연산자** 는 인스턴스가 `null`이 아닌 경우에만 인스턴스 멤버에 접근하며, 그렇지 않으면 `null`을 반환합니다. (이것은 "안전한 탐색(safe navigation)" 연산자라고도 불립니다.)
*   **Null-aware 인덱스 접근 연산자** 는 컬렉션이 `null`이 아닌 경우에만 컬렉션의 요소에 접근하며, 그렇지 않으면 `null`을 반환합니다. (이것도 "안전한 탐색" 연산자의 한 유형입니다.)

이 PEP는 위에서 언급된 정의와 다른 언어들의 구현을 바탕으로 Python에 세 가지 `None`-인식 연산자를 제안합니다. 구체적으로 다음과 같습니다:

1.  **`None` 코얼레싱 이항 연산자 `??`** : 왼쪽 피연산자가 `None`이 아닌 값으로 평가되면 왼쪽 피연산자를 반환하고, 그렇지 않으면 오른쪽 피연산자를 평가하여 반환합니다.
2.  **`None` 코얼레싱 할당 연산자 `??=`** : 증강 할당(augmented assignment) 연산자로 포함됩니다.
3.  **`None`-인식 속성 접근 연산자 `?.`** ("maybe dot"): 왼쪽 피연산자가 `None`이 아닌 값으로 평가될 경우에만 전체 표현식을 평가합니다.
4.  **`None`-인식 인덱싱 연산자 `?[]`** ("maybe subscript"): 왼쪽 피연산자가 `None`이 아닌 값으로 평가될 경우에만 전체 표현식을 평가합니다.

제안된 문법 변경 및 사용 예시는 아래 섹션에서 더 자세히 다룹니다.

## 구문 및 의미론 (Syntax and Semantics)

### `None`의 특수성 (Specialness of `None`)

`None` 객체는 "값이 없음"을 나타냅니다. 이 연산자들의 목적상, "값이 없음"은 표현식의 나머지 부분도 "값이 없음"을 의미하며 평가되어서는 안 된다는 것을 나타냅니다.

이전에 거부된 제안은 부울(Boolean) 컨텍스트에서 `False`로 평가되는 모든 값을 "값이 없음"으로 취급하는 것이었습니다. 그러나 이 연산자들의 목적은 "`False`" 상태보다는 "값이 없음" 상태를 전파하는 것입니다.

일부에서는 이로 인해 `None`이 특별해진다고 주장하지만, PEP는 `None`이 이미 특별하며, 이 연산자들에서 `None`을 테스트와 결과 모두로 사용하는 것이 기존 의미론을 어떤 식으로든 변경하지 않는다고 주장합니다.

대체 접근 방식에 대한 논의는 "거부된 아이디어" 섹션을 참조하십시오.

### 문법 변경 (Grammar changes)

Python 문법의 다음 규칙들이 다음과 같이 업데이트됩니다:

```
augassign: ('+=' | '-=' | '*=' | '@=' | '/=' | '%=' | '&=' | '|=' | '^=' | '<<=' | '>>=' | ' **=' | '//=' | '??=')
power: coalesce ['** ' factor]
coalesce: atom_expr ['??' factor]
atom_expr: ['await'] atom trailer*
trailer: ('(' [arglist] ')' | '[' subscriptlist ']' | '?[' subscriptlist ']' | '.' NAME | '?.' NAME)
```

#### 코얼레싱 규칙 (`??` 연산자)

`coalesce` 규칙은 `??` 이항 연산자를 제공합니다. 대부분의 이항 연산자와 달리, `??` 연산자는 왼쪽 피연산자가 `None`으로 결정될 때까지 오른쪽 피연산자를 평가하지 않습니다.

`??` 연산자는 다른 이항 연산자보다 더 강하게 바인딩됩니다. 이는 대부분의 기존 구현이 `None` 값을 전파하지 않고 `TypeError`를 발생시키기 때문입니다. 잠재적으로 `None`이 될 수 있는 표현식은 추가적인 괄호 없이 기본값으로 대체될 수 있습니다.

`??` 연산자가 있을 때 연산자 우선순위를 평가하는 몇 가지 예시는 다음과 같습니다:

```python
a, b = None, None
def c(): return None
def ex(): raise Exception()

# 괄호의 암묵적인 배치 예시
(a ?? 2 ** b ?? 3) == a ?? (2 ** (b ?? 3))
(a * b ?? c // d) == a * (b ?? c) // d
(a ?? True and b ?? False) == (a ?? True) and (b ?? False)
(c() ?? c() ?? True) == True
(True ?? ex()) == True
(c ?? ex)() == c() # c가 None이면 ex()를 평가하지 않고, None이 아니면 c() 호출
```

특히 `a ?? 2 ** b ?? 3`과 같은 경우, 다른 방식으로 부분 표현식에 괄호를 치면 `TypeError`가 발생할 수 있습니다. `int.__pow__`는 `None`으로 호출될 수 없기 때문입니다 (`??` 연산자가 사용되었다는 사실 자체가 `a` 또는 `b`가 `None`일 수 있음을 암시합니다). 그러나 평소와 같이 괄호는 필수는 아니지만 가독성 향상에 도움이 된다면 추가해야 합니다.

`??` 연산자에 대한 증강 할당 `??=`도 추가됩니다. 증강 코얼레싱 할당은 현재 값이 `None`인 경우에만 이름을 재바인딩합니다. 대상 이름이 이미 값을 가지고 있다면, 오른쪽 피연산자는 평가되지 않습니다. 예를 들어:

```python
a = None
b = ''
c = 0

a ??= 'value'
b ??= undefined_name # b는 ''이므로 undefined_name은 평가되지 않음
c ??= shutil.rmtree('/') # c는 0이므로 shutil.rmtree('/')는 평가되지 않음

assert a == 'value'
assert b == ''
assert c == 0 # and any(os.scandir('/'))
```

#### `maybe-dot` (`?.`) 및 `maybe-subscript` (`?[]`) 연산자

`maybe-dot` (`?.`) 및 `maybe-subscript` (`?[]`) 연산자는 `atom`에 대한 `trailer`로 추가되어, 일반 연산자와 동일한 모든 위치에서 사용될 수 있습니다. 여기에는 할당 대상의 일부로도 포함됩니다. 기존 평가 규칙은 문법에 직접 포함되어 있지 않으므로, 필요한 변경 사항을 아래에 명시합니다.

`atom`은 항상 성공적으로 평가된다고 가정합니다. 각 `trailer`는 왼쪽에서 오른쪽으로 평가되며, 자체 매개변수(인자, 인덱스 또는 속성 이름)를 적용하여 다음 `trailer`의 값을 생성합니다. 마지막으로, `await`가 존재하면 적용됩니다.

예를 들어, `await a.b(c).d[e]`는 현재 `['await', 'a', '.b', '(c)', '.d', '[e]']`로 파싱되고 다음과 같이 평가됩니다:

```python
_v = a
_v = _v.b
_v = _v(c)
_v = _v.d
_v = _v[e]
await _v
```

`None`-인식 연산자가 있을 때, 왼쪽에서 오른쪽으로의 평가는 단락(short-circuited)될 수 있습니다. 예를 들어, `await a?.b(c).d?[e]`는 다음과 같이 평가됩니다:

```python
_v = a
if _v is not None:
    _v = _v.b
    _v = _v(c)
    _v = _v.d
    if _v is not None:
        _v = _v[e]
await _v
```

** 참고: ** `await`는 `await None`을 시도하는 경우와 마찬가지로 이 컨텍스트에서 거의 확실히 실패할 것입니다. 이 PEP는 `None`-인식 `await` 키워드를 추가할 것을 제안하지 않으며, 단지 `atom_expr` 문법 규칙에 해당 키워드가 포함되어 있어 명세의 완전성을 위해 이 예시에 포함시킨 것입니다.

괄호로 묶인 표현식은 `atom` 규칙(위에는 표시되지 않음)에 의해 처리되며, 이는 위의 변환에서 단락 동작을 암묵적으로 종료합니다. 예를 들어, `(a?.b ?? c).d?.e`는 다음과 같이 평가됩니다:

```python
# a?.b
_v = a
if _v is not None:
    _v = _v.b
# ... ?? c
if _v is None:
    _v = c
# (...).d?.e
_v = _v.d
if _v is not None:
    _v = _v.e
```

할당 대상(assignment target)으로 사용될 때, `None`-인식 연산은 "로드(load)" 컨텍스트에서만 사용될 수 있습니다. 즉, `a?.b = 1` 및 `a?[b] = 1`은 `SyntaxError`를 발생시킵니다. 표현식 앞부분에서의 사용(`a?.b.c = 1`)은 허용되지만, 코얼레싱 연산과 결합되지 않으면 유용하지 않을 가능성이 높습니다:

```python
(a?.b ?? d).c = 1
```

### 표현식 읽기 (Reading expressions)

`maybe-dot` (`?.`) 및 `maybe-subscript` (`?[]`) 연산자를 포함하는 표현식은 이 연산자들의 일반 버전과 동일하게 읽고 해석되어야 합니다. "정상적인" 경우, `a?.b?[c]`와 `a.b[c]`와 같은 표현식의 최종 결과는 동일할 것입니다. 우리가 현재 "a.b"를 "a에 속성 b가 있다면 읽고, 그렇지 않으면 AttributeError를 발생시킨다"라고 읽지 않는 것처럼, `a?.b`를 "a가 `None`이 아니면 a에서 속성 b를 읽는다"라고 읽을 필요는 없습니다 (듣는 사람이 특정 동작을 알아야 하는 컨텍스트가 아니라면).

`??` 연산자를 사용하는 코얼레싱 표현식의 경우, 표현식은 "`None`이면 ... 또는" 또는 "`...`와 코얼레싱된다"로 읽어야 합니다. 예를 들어, `a.get_value() ?? 100`이라는 표현식은 "`a.get_value`를 호출하거나 `None`이면 100" 또는 "`a.get_value`와 100을 코얼레싱한다"로 읽을 수 있습니다.

** 참고:** 구어로 코드를 읽는 것은 항상 정보 손실이 있으므로, 이 연산자들을 명확하게 말하는 방법을 정의하려는 시도는 하지 않습니다. 이러한 제안은 새로운 문법 추가의 의미에 대한 맥락을 제공하기 위한 것입니다.

## 예시 (Examples)

이 섹션에서는 일반적인 `None` 패턴의 몇 가지 예시를 제시하고, `None`-인식 연산자를 사용하도록 변환했을 때 어떤 모습이 될지 보여줍니다.

### 표준 라이브러리 (Standard Library)

`find-pep505.py` 스크립트를 사용하여 Python 3.7 표준 라이브러리를 분석한 결과, 최대 678개의 코드 스니펫이 `None`-인식 연산자 중 하나를 사용하여 대체될 수 있음을 발견했습니다:

```
$ find /usr/lib/python3.7 -name '*.py' | xargs python3.7 find-pep505.py
<snip>
Total None-coalescing `if` blocks: 449
Total [possible] None-coalescing `or`: 120
Total None-coalescing ternaries: 27
Total Safe navigation `and`: 13
Total Safe navigation `if` blocks: 61
Total Safe navigation ternaries: 8
```

아래는 새 연산자를 사용하도록 변환하기 전후의 몇 가지 예시입니다.

`bisect.py`에서:
**이전:**
```python
def insort_right(a, x, lo=0, hi=None):
    # ...
    if hi is None:
        hi = len(a)
    # ...
```
`??=` 증강 할당문을 사용하도록 업데이트 후:
**이후:**
```python
def insort_right(a, x, lo=0, hi=None):
    # ...
    hi ??= len(a)
    # ...
```

`calendar.py`에서:
**이전:**
```python
encoding = options.encoding
if encoding is None:
    encoding = sys.getdefaultencoding()
optdict = dict(encoding=encoding, css=options.css)
```
`??` 연산자를 사용하도록 업데이트 후:
**이후:**
```python
optdict = dict(encoding=options.encoding ?? sys.getdefaultencoding(), css=options.css)
```

`email/generator.py`에서 (여기서 `or`를 `??`로 대체할 방법이 없다는 점을 중요하게 주목하십시오):
**이전:**
```python
mangle_from_ = True if policy is None else policy.mangle_from_
```
업데이트 후:
**이후:**
```
 mangle = True if policy is None else policy.mangle_from_
 # after update
 mangle_from_ = policy?.mangle_from_ ?? True
```

**이후 (오류 수정):**
```python
mangle_from_ = policy?.mangle_from_ ?? True
```

`asyncio/subprocess.py`에서:
**이전:**
```python
def pipe_data_received(self, fd, data):
    if fd == 1:
        reader = self.stdout
    elif fd == 2:
        reader = self.stderr
    else:
        reader = None
    if reader is not None:
        reader.feed_data(data)
```
`?.` 연산자를 사용하도록 업데이트 후:
**이후:**
```python
def pipe_data_received(self, fd, data):
    if fd == 1:
        reader = self.stdout
    elif fd == 2:
        reader = self.stderr
    else:
        reader = None
    reader?.feed_data(data)
```

`asyncio/tasks.py`에서:
**이전:**
```python
try:
    await waiter
finally:
    if timeout_handle is not None:
        timeout_handle.cancel()
```
`?.` 연산자를 사용하도록 업데이트 후:
**이후:**
```python
try:
    await waiter
finally:
    timeout_handle?.cancel()
```

`ctypes/_aix.py`에서:
**이전:**
```python
if libpaths is None:
    libpaths = []
else:
    libpaths = libpaths.split(":")
```
업데이트 후:
**이후:**
```python
libpaths = libpaths?.split(":") ?? []
```

`os.py`에서:
**이전:**
```python
if entry.is_dir():
    dirs.append(name)
    if entries is not None:
        entries.append(entry)
    else:
        nondirs.append(name)
```
`?.` 연산자를 사용하도록 업데이트 후:
```python
if entry.is_dir():
    dirs.append(name)
    entries?.append(entry)
else:
    nondirs.append(name)
```

`importlib/abc.py`에서:
**이전 (부분 업데이트 전):**
```python
def find_module(self, fullname, path):
    if not hasattr(self, 'find_spec'):
        return None
    found = self.find_spec(fullname, path)
    return found.loader if found is not None else None
```
부분 업데이트 후:
```python
def find_module(self, fullname, path):
    if not hasattr(self, 'find_spec'):
        return None
    return self.find_spec(fullname, path)?.loader
```
광범위하게 업데이트 후 (과하다고 볼 수도 있지만, 스타일 가이드에서 결정할 부분입니다):
```python
def find_module(self, fullname, path):
    return getattr(self, 'find_spec', None)?.__call__(fullname, path)?.loader
```

`dis.py`에서:
**이전:**
```python
def _get_const_info(const_index, const_list):
    argval = const_index
    if const_list is not None:
        argval = const_list[const_index]
    return argval, repr(argval)
```
`?[]` 및 `??` 연산자를 사용하도록 업데이트 후:
**이후:**
```python
def _get_const_info(const_index, const_list):
    argval = const_list?[const_index] ?? const_index
    return argval, repr(argval)
```

### `jsonify` 예시

이 예시는 Flask 프레임워크를 프런트엔드로 사용하는 Python 웹 크롤러에서 가져온 것입니다. 이 함수는 SQL 데이터베이스에서 웹 사이트 정보를 검색하고 HTTP 클라이언트에 보낼 JSON 형식으로 지정합니다.

`first_seen`과 `last_seen`은 데이터베이스에서 `null`이 허용되며, JSON 응답에서도 `null`이 허용됩니다. JSON은 `datetime`을 나타내는 기본 방법이 없으므로, 서버의 계약은 `null`이 아닌 모든 날짜를 ISO-8601 문자열로 표현한다고 명시합니다.

`first_seen` 및 `last_seen` 속성의 정확한 의미를 알지 못하면, 해당 속성에 안전하게 또는 성능적으로 여러 번 접근할 수 있는지 알 수 없습니다.

**이전 (조건부 표현식 사용):**
```python
class SiteView(FlaskView):
    @route('/site/<id_>', methods=['GET'])
    def get_site(self, id_):
        site = db.query('site_table').find(id_)
        return jsonify(
            first_seen=site.first_seen.isoformat() if site.first_seen is not None else None,
            id=site.id,
            is_active=site.is_active,
            last_seen=site.last_seen.isoformat() if site.last_seen is not None else None,
            url=site.url.rstrip('/')
        )
```

이 코드를 수정하는 한 가지 방법은 각 조건부 표현식을 명시적인 값 할당과 전체 `if`/`else` 블록으로 대체하는 것입니다:

**이전 (if/else 블록으로 확장):**
```python
class SiteView(FlaskView):
    @route('/site/<id_>', methods=['GET'])
    def get_site(self, id_):
        site = db.query('site_table').find(id_)
        first_seen_dt = site.first_seen
        if first_seen_dt is None:
            first_seen = None
        else:
            first_seen = first_seen_dt.isoformat()
        last_seen_dt = site.last_seen
        if last_seen_dt is None:
            last_seen = None
        else:
            last_seen = last_seen_dt.isoformat()
        return jsonify(
            first_seen=first_seen,
            id=site.id,
            is_active=site.is_active,
            last_seen=last_seen,
            url=site.url.rstrip('/')
        )
```
이는 10줄의 코드를 추가하고 함수에 4개의 새로운 코드 경로를 만들어, 외견상 복잡성을 크게 증가시킵니다. `None`-인식 속성 연산자를 사용하여 다시 작성하면 의도가 더 명확해지면서 코드가 짧아집니다:

**이후 (`None`-인식 연산자 사용):**
```python
class SiteView(FlaskView):
    @route('/site/<id_>', methods=['GET'])
    def get_site(self, id_):
        site = db.query('site_table').find(id_)
        return jsonify(
            first_seen=site.first_seen?.isoformat(),
            id=site.id,
            is_active=site.is_active,
            last_seen=site.last_seen?.isoformat(),
            url=site.url.rstrip('/')
        )
```

### `Grab` 예시

다음 예시는 Grab이라는 Python 스크래핑 라이브러리에서 가져온 것입니다.

**이전 (`if/else` 블록 사용):**
```python
class BaseUploadObject(object):
    def find_content_type(self, filename):
        ctype, encoding = mimetypes.guess_type(filename)
        if ctype is None:
            return 'application/octet-stream'
        else:
            return ctype

class UploadContent(BaseUploadObject):
    def __init__(self, content, filename=None, content_type=None):
        self.content = content
        if filename is None:
            self.filename = self.get_random_filename()
        else:
            self.filename = filename
        if content_type is None:
            self.content_type = self.find_content_type(self.filename)
        else:
            self.content_type = content_type

class UploadFile(BaseUploadObject):
    def __init__(self, path, filename=None, content_type=None):
        self.path = path
        if filename is None:
            self.filename = os.path.split(path)[1]
        else:
            self.filename = filename
        if content_type is None:
            self.content_type = self.find_content_type(self.filename)
        else:
            self.content_type = content_type
```
이 예시에는 기본값을 제공해야 하는 여러 좋은 예시가 포함되어 있습니다. 조건부 표현식을 사용하도록 다시 작성하면 전체 코드 줄 수는 줄어들지만, 반드시 가독성이 향상되는 것은 아닙니다:

**이전 (조건부 표현식 사용):**
```python
class BaseUploadObject(object):
    def find_content_type(self, filename):
        ctype, encoding = mimetypes.guess_type(filename)
        return 'application/octet-stream' if ctype is None else ctype

class UploadContent(BaseUploadObject):
    def __init__(self, content, filename=None, content_type=None):
        self.content = content
        self.filename = (self.get_random_filename() if filename is None else filename)
        self.content_type = (self.find_content_type(self.filename) if content_type is None else content_type)

class UploadFile(BaseUploadObject):
    def __init__(self, path, filename=None, content_type=None):
        self.path = path
        self.filename = (os.path.split(path)[1] if filename is None else filename)
        self.content_type = (self.find_content_type(self.filename) if content_type is None else content_type)
```
첫 번째 삼항 표현식은 깔끔하지만, 피연산자의 직관적인 순서를 뒤바꿉니다. 즉, 값이 있으면 `ctype`을 반환하고, 아니면 문자열 리터럴을 대체로 사용해야 합니다. 다른 삼항 표현식은 직관적이지 않고 너무 길어서 줄 바꿈을 해야 합니다. 전반적인 가독성은 향상되지 않고 악화되었습니다.

`None` 코얼레싱 연산자를 사용하여 다시 작성하면 다음과 같습니다:

**이후 (`None` 코얼레싱 연산자 사용):**
```python
class BaseUploadObject(object):
    def find_content_type(self, filename):
        ctype, encoding = mimetypes.guess_type(filename)
        return ctype ?? 'application/octet-stream'

class UploadContent(BaseUploadObject):
    def __init__(self, content, filename=None, content_type=None):
        self.content = content
        self.filename = filename ?? self.get_random_filename()
        self.content_type = content_type ?? self.find_content_type(self.filename)

class UploadFile(BaseUploadObject):
    def __init__(self, path, filename=None, content_type=None):
        self.path = path
        self.filename = filename ?? os.path.split(path)[1]
        self.content_type = content_type ?? self.find_content_type(self.filename)
```
이 구문은 피연산자의 순서가 직관적입니다. 예를 들어 `find_content_type`에서는 선호되는 값 `ctype`이 대체 값보다 먼저 나타납니다. 구문의 간결성은 코드 줄 수를 줄이고 시각적으로 분석할 코드를 줄이며, 왼쪽에서 오른쪽, 위에서 아래로 읽는 것이 실행 흐름을 더 정확하게 따르게 합니다.

## 거부된 아이디어 (Rejected Ideas)

이 섹션의 처음 세 가지 아이디어는 `None`을 특별하게 취급하는 것에 대한 자주 제안되는 대안입니다. 이러한 아이디어들이 왜 거부되었는지에 대한 더 자세한 배경은 PEP 531 및 PEP 532와 관련 논의를 참조하십시오.

### 값 없음 프로토콜 (No-Value Protocol)

이 연산자들은 값이 "값이 없음"을 나타내는 시기를 나타내는 프로토콜을 정의함으로써 사용자 정의 타입으로 일반화될 수 있었습니다. 이러한 프로토콜은 값이 유효한 값으로 취급되어야 할 때 `True`를 반환하고, 값이 값 없음으로 취급되어야 할 때 `False`를 반환하는 dunder 메서드 `__has_value__(self)`일 수 있습니다.

이 일반화를 통해 `object`는 다음과 동등한 dunder 메서드를 구현할 것입니다:

```python
def __has_value__(self):
    return True
```
`NoneType`은 다음과 동등한 dunder 메서드를 구현할 것입니다:

```python
def __has_value__(self):
    return False
```
명세 섹션에서 `x is None`의 모든 사용은 `not x.__has_value__()`로 대체될 것입니다.

이 일반화를 통해 도메인별 "값 없음" 객체가 `None`과 동일하게 코얼레싱될 수 있습니다. 예를 들어, `pyasn1` 패키지에는 ASN.1 `null`을 나타내는 `Null`이라는 타입이 있습니다:

```python
>>> from pyasn1.type import univ
>>> univ.Null() ?? univ.Integer(123)
Integer(123)
```
유사하게, `math.nan` 및 `NotImplemented`와 같은 값들도 "값이 없음"을 나타내는 것으로 취급될 수 있습니다.

그러나 이러한 값들의 "값 없음" 속성은 도메인별이므로 언어에 의해 값으로 취급되어야 합니다. 예를 들어, `math.nan.imag`는 잘 정의되어 있습니다(0.0입니다). 따라서 `math.nan?.imag`를 단락하여 `math.nan`을 반환하는 것은 잘못될 것입니다.

`None`은 이미 언어에 의해 "값이 없음"을 나타내는 값으로 정의되어 있으며, 현재 명세는 미래에 프로토콜로 전환하는 것을 배제하지 않으므로 (내장 객체 변경은 호환되지 않겠지만), 이 아이디어는 현재 거부됩니다.

### 부울 인식 연산자 (Boolean-aware operators)

이 제안은 "값 없음 프로토콜"을 추가하는 것과 근본적으로 동일하며, 위의 논의가 그대로 적용됩니다.

`??` 연산자와 유사한 동작은 `or` 표현식으로 달성할 수 있지만, `or`는 왼쪽 피연산자가 `None`인지 여부가 아니라 `false-y`인지 확인합니다. 이 접근 방식은 언어 변경이 적게 필요하므로 매력적이지만, 근본적인 문제를 올바르게 해결하지 못합니다.

확인이 `None`이 아닌 참(truthiness)에 대한 것이라고 가정하면 `??` 연산자는 더 이상 필요하지 않습니다. 그러나 이 확인을 `?.` 및 `?[]` 연산자에 적용하면 완벽하게 유효한 작업이 방지됩니다.

`get_log_list()`가 현재 로그 메시지를 포함하는 리스트(잠재적으로 비어 있음)를 반환하거나 로깅이 활성화되지 않은 경우 `None`을 반환할 수 있는 다음 예시를 고려하십시오:

```python
lst = get_log_list()
lst?.append('A log message')
```
만약 `?.`이 `None`이 아닌 참 값을 확인하고 로그가 어떤 항목으로도 초기화되지 않았다면, 어떤 항목도 추가되지 않을 것입니다. 이는 항목을 추가하려는 코드의 명백한 의도를 위반합니다. `append` 메서드는 빈 리스트에서도 사용 가능하며, 다른 모든 리스트 메서드도 마찬가지입니다. 리스트가 현재 비어 있다는 이유로 이러한 멤버를 사용해서는 안 된다고 가정할 이유가 없습니다.

또한, 표현식을 대체할 합리적인 결과가 없습니다. 일반적인 `lst.append`는 `None`을 반환하지만, 이 아이디어에서는 `lst?.append`가 `lst`의 값에 따라 `[]` 또는 `None`을 반환할 수 있습니다. 이전 섹션의 예시와 마찬가지로, 이것은 이치에 맞지 않습니다.

`None`이 아닌 참(truthiness)을 확인하면 겉보기에 유효한 표현식이 의도대로 실행되지 않으므로, 이 아이디어는 거부됩니다.

### 예외 인식 연산자 (Exception-aware operators)

`None`이 발생했을 때 표현식을 단락시키는 이유는 일반적으로 발생할 `AttributeError` 또는 `TypeError`를 피하기 위함이라고 주장할 수 있습니다. `None`을 테스트하는 대안으로, `?.` 및 `?[]` 연산자는 대신 작업으로 인해 발생한 `AttributeError` 및 `TypeError`를 처리하고 표현식의 나머지 부분을 건너뛸 수 있습니다.

이는 `a?.b.c?.d.e`와 유사한 변환을 생성합니다:

```python
_v = a
try:
    _v = _v.b
except AttributeError:
    pass
else:
    _v = _v.c
    try:
        _v = _v.d
    except AttributeError:
        pass
    else:
        _v = _v.e
```
열린 질문 중 하나는 예외가 처리될 때 표현식으로 어떤 값이 반환되어야 하는가입니다. 위의 예시는 단순히 부분적인 결과를 남기지만, 이는 기본값으로 대체하는 데 도움이 되지 않습니다. 다른 대안은 결과를 `None`으로 강제하는 것인데, 이는 `None`이 결과로 충분히 특별하면서도 테스트로는 충분히 특별하지 않은 이유에 대한 질문을 제기합니다.

둘째, 이 접근 방식은 표현식의 일부로 암묵적으로 실행되는 코드 내의 오류를 숨깁니다. `?.`의 경우, 속성 또는 `__getattr__` 구현 내의 모든 `AttributeError`가 숨겨질 것이며, `?[]` 및 `__getitem__` 구현도 마찬가지입니다.

유사하게, `{}.ietms()`와 같은 간단한 타이핑 오류도 눈에 띄지 않을 수 있습니다.

`getattr` 내장 함수와 `dict`가 확립한 `.get(key, default)` 메서드 패턴 형태의 이러한 종류의 오류 처리에 대한 기존 관습은 이미 이러한 동작을 명시적으로 사용할 수 있음을 보여줍니다.

이 접근 방식은 코드의 오류를 숨기므로 거부됩니다.

### `None`-인식 함수 호출 (`None`-aware Function Call `?()`)

`None`-인식 구문은 속성 및 인덱스 접근에 적용되므로, 함수 호출 구문에도 적용되어야 하는지 묻는 것이 자연스러워 보입니다. `foo?()`와 같이 작성될 수 있으며, `foo`가 `None`이 아닌 경우에만 호출됩니다.

이는 제안된 연산자들이 부분적으로 채워진 계층적 데이터 구조의 탐색을 돕기 위한 것이지, 임의의 클래스 계층 구조의 탐색을 위한 것이 아니라는 전제 하에 보류되었습니다. 이는 이미 이 구문을 제공하는 다른 주류 언어 중 어느 것도 선택적 함수 호출에 대한 유사한 구문을 지원할 가치가 있다고 생각하지 않는다는 사실에 반영됩니다.

C#에서 사용되는 것과 유사한 해결 방법은 `maybe_none?.__call__(arguments)`를 작성하는 것입니다. 호출 가능 객체가 `None`이면 표현식은 평가되지 않습니다. (C#의 해당 기능은 호출 가능 타입에서 `?.Invoke()`를 사용합니다.)

### 단항 후위 연산자 (`?` Unary Postfix Operator)

`None`-인식 동작을 일반화하고 도입되는 새 연산자의 수를 제한하기 위해 `?`로 표기되는 단항 후위 연산자가 제안되었습니다. 이 아이디어는 `?`가 `self`를 반환하는 dunder 메서드를 오버라이드할 수 있는 특별한 객체를 반환할 수 있다는 것입니다. 예를 들어, `foo?`는 `foo`가 `None`이 아니면 `foo`로 평가되고, 그렇지 않으면 `NoneQuestion`의 인스턴스로 평가됩니다.

```python
class NoneQuestion():
    def __call__(self, *args, **kwargs):
        return self
    def __getattr__(self, name):
        return self
    def __getitem__(self, key):
        return self
```
이 새로운 연산자와 새로운 타입으로, `foo?.bar[baz]`와 같은 표현식은 `foo`가 `None`이면 `NoneQuestion`으로 평가됩니다. 이것은 훌륭한 일반화이지만, 대부분의 기존 코드가 `NoneQuestion`이 무엇인지 알지 못하므로 실제로 사용하기 어렵습니다.

위에서 언급된 동기 부여 예시 중 하나로 돌아가서 다음을 고려해 보십시오:

```python
>>> import json
>>> created = None
>>> json.dumps({'created': created?.isoformat()})
```
JSON 직렬 변환기는 `NoneQuestion`을 직렬화하는 방법을 알지 못하며, 다른 API도 마찬가지입니다. 이 제안은 실제로 표준 라이브러리 및 모든 서드 파티 라이브러리 전반에 걸쳐 많은 특수 로직을 요구합니다.

동시에, `?` 연산자는 다른 어떤 연산자와도 결합될 수 있다는 점에서 너무 일반적일 수도 있습니다. 다음 표현식들은 무엇을 의미해야 할까요?:

```python
>>> x? + 1
>>> x? -= 1
>>> x? == 1
>>> ~x?
```
이러한 일반화의 정도는 유용하지 않습니다. 여기서 실제로 제안된 연산자들은 일반적인 코드 패턴을 더 쉽게 작성할 것으로 예상되는 몇 가지 연산자로 의도적으로 제한됩니다.

### 내장 `maybe` (Built-in `maybe`)

Haskell에는 `Maybe`라는 개념이 있으며, 이는 특별한 키워드(`null` 등)나 특별한 인스턴스(`None` 등)에 의존하지 않고 선택적 값의 아이디어를 캡슐화합니다. Haskell에서 `Maybe`의 목적은 "무언가(something)"와 "아무것도 아님(nothing)"을 별도로 처리하는 것을 피하는 것입니다.

`pymaybe`라는 Python 패키지는 대략적인 근사치를 제공합니다. 문서는 다음 예시를 보여줍니다:

```python
>>> maybe('VALUE').lower()
'value'
>>> maybe(None).invalid().method().or_else('unknown')
'unknown'
```
`maybe()` 함수는 `Something` 인스턴스 또는 `Nothing` 인스턴스를 반환합니다. 이전 섹션에서 설명한 단항 후위 연산자와 유사하게, `Nothing`은 누락된 값에 대한 체이닝을 허용하기 위해 dunder 메서드를 오버라이드합니다.

`or_else()`는 `pymaybe`의 래퍼에서 기본 값을 검색하기 위해 결국 필요합니다. 또한, `pymaybe`는 어떤 평가도 단락시키지 않습니다. `pymaybe`가 몇 가지 강점을 가지고 있고 그 자체로 유용할 수 있지만, 이는 또한 코얼레싱의 순수 Python 구현이 언어에 내장된 지원만큼 강력하지 않은 이유를 보여줍니다.

이 시나리오를 가능하게 하기 위해 내장 `maybe` 타입을 추가하는 아이디어는 거부됩니다.

### 단순 조건부 표현식 사용 (Just use a conditional expression)

기본값을 초기화하는 또 다른 일반적인 방법은 삼항 연산자를 사용하는 것입니다. 인기 있는 `Requests` 패키지의 발췌문은 다음과 같습니다:

** 이전 (조건부 표현식 사용): **
```python
data = [] if data is None else data
files = [] if files is None else files
headers = {} if headers is None else headers
params = {} if params is None else params
hooks = {} if hooks is None else hooks
```
이 특정 형식은 피연산자를 직관적이지 않은 순서로 배치하는 바람직하지 않은 효과를 가집니다. 즉, 뇌는 "가능하면 `data`를 사용하고, 아니면 `[]`를 대체로 사용한다"고 생각하지만, 코드는 대체 값을 선호하는 값 앞에 둡니다.

이 패키지의 작성자는 대신 다음과 같이 작성할 수 있었습니다:

** 이전 (더 직관적인 조건부 표현식): **
```python
data = data if data is not None else []
files = files if files is not None else []
headers = headers if headers is not None else {}
params = params if params is not None else {}
hooks = hooks if hooks is not None else {}
```
이 피연산자 순서는 더 직관적이지만, 4개의 추가 문자("` not `")가 필요합니다. 또한 식별자의 반복을 강조합니다: `data if data`, `files if files` 등.

`None` 코얼레싱 연산자를 사용하여 작성하면 예시는 다음과 같이 읽힙니다:

** 이후 (`None` 코얼레싱 연산자 사용):**
```python
data = data ?? []
files = files ?? []
headers = headers ?? {}
params = params ?? {}
hooks = hooks ?? {}
```
이 구문은 피연산자의 직관적인 순서를 가집니다. `find_content_type`에서와 같이 선호하는 값이 대체 값보다 먼저 나타납니다. 구문의 간결성은 코드 줄 수를 줄이고 시각적으로 분석할 코드를 줄이며, 왼쪽에서 오른쪽, 위에서 아래로 읽는 것이 실행 흐름을 더 정확하게 따르게 합니다.

## 참고 자료 (References)

*   C# Reference: Operators.
*   A Tour of the Dart Language: Operators.
*   Proposal: Nullish Coalescing for JavaScript.
*   Proposal: Optional Chaining for JavaScript.
*   Associated scripts.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 있습니다.

**소스:** `https://github.com/python/peps/blob/main/peps/pep-0505.rst`
**마지막 수정:** 2025-02-01 08:55:40 GMT
이 구문은 피연산자의 직관적인 순서를 가집니다. `find_content_type`에서와 같이 선호하는 값이 대체 값보다 먼저 나타납니다. 구문의 간결성은 코드 줄 수를 줄이고 시각적으로 분석할 코드를 줄이며, 왼쪽에서 오른쪽, 위에서 아래로 읽는 것이 실행 흐름을 더 정확하게 따르게 합니다.

## 참고 자료 (References)

*   C# Reference: Operators.
*   A Tour of the Dart Language: Operators.
*   Proposal: Nullish Coalescing for JavaScript.
*   Proposal: Optional Chaining for JavaScript.
*   Associated scripts.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 있습니다.

**소스:** `https://github.com/python/peps/blob/main/peps/pep-0505.rst`
**마지막 수정:** 2025-02-01 08:55:40 GMT

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.