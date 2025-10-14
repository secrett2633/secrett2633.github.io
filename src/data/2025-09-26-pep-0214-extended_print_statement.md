---
title: "[Final] PEP 214 - Extended Print Statement"
excerpt: "Python Enhancement Proposal 214: 'Extended Print Statement'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/214/
toc: true
toc_sticky: true
date: 2025-09-26 16:31:25+0900
last_modified_at: 2025-09-26 16:31:25+0900
published: true
---
> **원문 링크:** [PEP 214 - Extended Print Statement](https://peps.python.org/pep-0214/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 24-Jul-2000

## PEP 214 – `print` 문 확장 (Extended Print Statement)

### 개요
이 PEP (Python Enhancement Proposal)는 Python의 표준 `print` 문을 확장하여 기본 `sys.stdout` 대신 모든 파일류(file-like) 객체로 출력을 보낼 수 있는 새로운 구문을 도입합니다. 이는 Python 2.0에 채택되었으며, 특정 출력 스트림으로 인쇄해야 할 필요가 있을 때 유용하게 사용될 수 있습니다.

### 제안 (Proposal)

이 제안은 `print` 문에 출력 대상 파일(output file target)을 선택적으로 지정할 수 있는 구문 확장을 소개합니다.

**사용 예시:**
```python
print >> mylogfile, 'this message goes to my log file'
```
확장된 `print` 문의 정식 구문은 다음과 같습니다.
```
print_stmt: ... | '>>' test [ (',' test)+ [','] ] )
```
여기서 `...`는 기존 `print_stmt` 구문이 변경되지 않았음을 나타냅니다. 확장된 형식에서 `>>` 바로 뒤에 오는 표현식은 `write()` 메서드를 가진 객체(즉, 파일류 객체)를 반환해야 합니다.

**동등한 문장:**
```python
print 'hello world'
print >> sys.stdout, 'hello world'
```
두 문장 모두 동일하게 작동합니다.

또한, 다음 두 문장도 동등합니다.
```python
print
print >> sys.stdout
```
반면, 다음 두 문장은 문법 오류(syntax error)입니다.
```python
print ,
print >> sys.stdout,
```

### 정당성 (Justification)

`print`는 Python의 키워드이며, 언어 참조 설명서의 6.6절에 설명된 `print` 문을 소개합니다. `print` 문은 다음과 같은 특징을 가집니다.
*   항목을 자동으로 문자열로 변환합니다.
*   항목 사이에 자동으로 공백을 삽입합니다.
*   문장이 쉼표(`,`)로 끝나지 않는 한 개행 문자(newline)를 추가합니다.

`print` 문이 수행하는 포맷팅은 제한적입니다. 출력에 대한 더 많은 제어를 위해서는 `sys.stdout.write()`와 문자열 보간(string interpolation)을 함께 사용할 수 있습니다.

`print` 문은 기본적으로 `sys.stdout`으로 출력됩니다. `sys.stdout`은 `write()` 메서드를 가진 파일류 객체여야 하지만, 표준 출력(standard output)이 아닌 다른 파일로 출력을 리디렉션하기 위해 다시 바인딩(rebind)될 수 있습니다. 일반적인 관용구(idiom)는 다음과 같습니다.

```python
save_stdout = sys.stdout
try:
    sys.stdout = mylogfile
    print 'this message goes to my log file'
finally:
    sys.stdout = save_stdout
```
이 방식의 문제는 바인딩이 전역적(global)이어서 `try:` 절 내부의 모든 문장에 영향을 미친다는 것입니다. 예를 들어, 실제로 `stdout`으로 출력하려던 함수 호출이 추가되면, 이 출력도 로그 파일로 리디렉션됩니다.

또한, 이 방식은 여러 출력 스트림으로 출력을 번갈아 보내기에는 매우 불편하며, `try/except` 또는 `try/finally` 절과 같은 코드 작성을 복잡하게 만듭니다.

### 참조 구현 (Reference Implementation)

Python 2.0 소스 트리에 대한 패치 형태의 참조 구현은 SourceForge의 패치 관리자에서 확인할 수 있습니다. 이 접근 방식은 `PRINT_ITEM_TO`와 `PRINT_NEWLINE_TO`라는 두 개의 새로운 opcode를 추가하는데, 이 opcode들은 스택(stack) 상단에서 파일류 객체를 팝(pop)하여 `sys.stdout` 대신 출력 스트림으로 사용합니다. 이 참조 구현은 Python 2.0에 채택되었습니다.

### 대안적 접근 방식 (Alternative Approaches)

이 구문 변경에 대한 대안으로 Python 구문 변경이 필요 없는 방식이 제안되었습니다 (원래 Moshe Zadka). `writeln()` 함수가 제공될 수 있으며 (내장 함수로도 가능), 몇 가지 추가 기능을 가진 확장된 `print`와 매우 유사하게 작동합니다.

```python
def writeln(*args, **kws):
    import sys
    file = sys.stdout
    sep = ' '
    end = '\n'
    if kws.has_key('file'):
        file = kws['file']
        del kws['file']
    if kws.has_key('nl'):
        if not kws['nl']:
            end = ' '
        del kws['nl']
    if kws.has_key('sep'):
        sep = kws['sep']
        del kws['sep']
    if kws:
        raise TypeError('unexpected keywords')
    file.write(sep.join(map(str, args)) + end)
```
`writeln()`은 세 개의 선택적 키워드 인자(keyword arguments)를 받습니다. 이 제안의 맥락에서 관련 있는 인자는 `write()` 메서드를 가진 파일류 객체로 설정될 수 있는 `file`입니다.

따라서, `print >> mylogfile, 'this goes to my log file'`은 다음과 같이 작성될 수 있습니다.
```python
writeln('this goes to my log file', file=mylogfile)
```
`writeln()`은 `nl` 키워드 인자를 통해 개행 문자를 추가할지 여부를 지정하고, `sep` 인자를 통해 각 항목 사이에 출력할 구분자를 지정하는 추가 기능을 가지고 있습니다.

### BDFL의 추가 정당성 (More Justification by the BDFL)

이 제안은 뉴스그룹에서 이의가 제기되었습니다. 일부는 `>>` 기호를 싫어하며 다른 기호를 선호했습니다.

**이의 제기:** 왜 다른 기호들을 사용하지 않는가? (`print in stderr`, `print + stderr`, `print[stderr]`, `print to stderr` 등)
**응답:** 특별한 기호(`print <symbol> expression`)를 사용하려면, Python 파서는 해당 기호가 이미 표현식을 시작할 수 있는 기호가 아니어야 합니다. 그렇지 않으면 어떤 형태의 `print` 문이 사용되는지 결정할 수 없습니다. 이는 식별자가 표현식을 시작할 수 있기 때문에 "`import as`"에 사용된 "컨텍스트에서만 키워드 트릭(keyword only in context trick)"을 사용할 수 없음을 의미합니다. 이는 `+stderr`, `[stderr]`, `to stderr`를 제외시키고, `>>`와 같은 이항 연산자 기호나 현재 이곳에서 불법인 다른 잡다한 기호(예: `import`)를 남깁니다.
`'print in file'`과 `'print >> file'` 중에서 선택해야 한다면, `>>`를 선택할 것입니다. 부분적으로는 `'in'`이 새로운 발명품일 것이고 (다른 언어에서 사용하는 것을 알지 못함), `'>>'`는 `sh`, `awk`, Perl, C++에서 사용되기 때문입니다. 또한, `>>`는 알파벳이 아니므로 더 눈에 띄어 독자의 주의를 끌 가능성이 높습니다.

**이의 제기:** 파일과 나머지 항목 사이에 쉼표가 있어야 하는 이유는 무엇인가?
**응답:** 파일을 다음 표현식과 분리하는 쉼표는 필수적입니다! 파일이 단순히 단일 단어가 아닌 임의의 표현식이 되기를 원할 것입니다. (`print >>sys.stderr`와 같이 작성할 수 있기를 원할 것입니다.) 표현식이 없으면 파서는 해당 표현식이 어디서 끝나고 다음 표현식이 어디서 시작하는지 구별할 수 없을 것입니다.

**이의 제기:** 왜 구문 확장이 필요한가? `writeln(file, item, …)`으로는 충분하지 않은가?
**응답:** 우선, `print` 문의 한 가지 기능인 마지막 개행을 억제하는 후행 쉼표(trailing comma)가 부족합니다. `'print a,'`가 여전히 `'sys.stdout.write(a)'`와 동등하지 않다는 점에 유의하십시오. `print`는 항목 사이에 공백을 삽입하고 임의의 객체를 인자로 받습니다. `write()`는 공백을 삽입하지 않으며 단일 문자열을 요구합니다.
`print` 문에 대한 확장을 고려할 때, 한 차원(출력이 어디로 가는지)에서는 새로운 기능을 추가하지만 다른 차원(항목 사이의 공백, 후행 개행 선택 여부)에서는 기능을 제거하는 함수나 메서드를 추가하는 것은 올바르지 않습니다. 다양한 경우를 처리하기 위해 많은 메서드나 함수를 추가할 수도 있지만, 이는 불필요한 혼란을 가중시킬 뿐이며, `print` 문을 완전히 비권장(deprecate)하는 경우에만 의미가 있을 것입니다.
이 논쟁은 사실 `print`가 문(statement)이 아닌 함수나 메서드였어야 하는지에 대한 것이라고 생각합니다. 함수 진영에 있다면, 기존 `print` 문에 특수 구문을 추가하는 것을 좋아하지 않을 것입니다. 새로운 구문에 대한 반대는 주로 `print` 문이 애초에 나쁜 생각이었다고 생각하는 사람들로부터 나온다고 짐작합니다.
약 10년 전, 가장 기본적인 출력 형태를 함수로 만들지 문으로 만들지 스스로 고민했습니다. 기본적으로 `'print(item, …)'`와 `'print item, …'` 중에서 결정하려 했습니다. `print`는 초기에 가르쳐야 하고 초보자가 작성하는 프로그램에서 매우 중요하기 때문에 문으로 만들기로 결정했습니다. 또한, 많은 것들의 선구자였던 ABC가 그것을 문으로 만들었기 때문입니다. ABC와 Python의 상호작용에서 전형적인 움직임으로, 저는 이름을 WRITE에서 `print`로 바꾸고, 개행을 추가하기 위한 추가 구문(ABC는 후행 슬래시를 사용하여 개행을 나타냄)을 요구하는 것에서 개행을 억제하기 위한 추가 구문(후행 쉼표)을 요구하는 것으로 개행 추가 규칙을 역전시켰습니다. 저는 항목들이 출력 시 공백으로 구분되는 기능을 유지했습니다.

**전체 예시:** ABC에서 `WRITE 1` `WRITE 2/`는 Python에서 `print 1,` `print 2`와 동일한 효과를 가지며, 결과적으로 "1 2\n"을 출력합니다.

저는 문으로 선택한 것이 100% 옳았는지 확신하지 못하지만 (ABC는 부작용이 있는 모든 것에 문법을 사용해야 하는 설득력 있는 이유가 있었지만, Python은 이런 관습이 없음), 틀렸다고 확신하지도 않습니다. 저는 `print` 문의 간결함을 분명히 좋아합니다. 어쨌든, 저는 `print` 문을 비권장할 준비가 되어 있지 않으며, 지난 몇 년 동안 파일을 지정하는 옵션에 대한 많은 요청이 있었습니다.

**이의 제기:** 왜 `>>` 대신 `>`를 사용하지 않는가?
**응답:** DOS 및 Unix 사용자에게 `>>`는 "추가(append)"를, `>`는 "덮어쓰기(overwrite)"를 제안합니다. 의미론적으로는 "추가"에 가장 가깝습니다. 또한, C++ 프로그래머에게 `>>`와 `<<`는 I/O 연산자입니다.

**이의 제기:** 하지만 C++에서 `>>`는 입력이고 `<<`는 출력이다!
**응답:** 중요하지 않습니다. C++은 분명히 Unix에서 가져와서 화살표 방향을 바꿨습니다. 중요한 것은 출력의 경우 화살표가 파일을 가리킨다는 것입니다.

**이의 제기:** `print >> file`이 할 수 있는 모든 것을 `println()` 함수로 설계할 수 있을 텐데, 왜 그것으로는 충분하지 않은가?
**응답:** 저는 이것을 간단한 프로그래밍 연습의 관점에서 생각합니다. 초보 프로그래머에게 곱셈표를 출력하는 함수를 작성하도록 요청받았다고 가정해 봅시다. 합리적인 해결책은 다음과 같습니다.

```python
def tables(n):
    for j in range(1, n+1):
        for i in range(1, n+1):
            print i, 'x', j, '=', i*j
        print # 줄 바꿈
```
이제 두 번째 연습으로 다른 파일에 출력하는 것을 추가해야 한다고 가정해 봅시다. 새로운 구문을 사용하면 프로그래머는 `print >> file,`이라는 한 가지 새로운 것만 배우면 됩니다. 답은 다음과 같습니다.

```python
def tables(n, file=sys.stdout):
    for j in range(1, n+1):
        for i in range(1, n+1):
            print >> file, i, 'x', j, '=', i*j
        print >> file # 줄 바꿈
```
`print` 문과 `println()` 함수만 있다면, 프로그래머는 먼저 `println()`에 대해 배우고, 원본 프로그램을 `println()`을 사용하도록 변환해야 합니다.

```python
def tables(n):
    for j in range(1, n+1):
        for i in range(1, n+1):
            println(i, 'x', j, '=', i*j)
        println()
```
그리고 나서 `file` 키워드 인자에 대해 배워야 합니다.

```python
def tables(n, file=sys.stdout):
    for j in range(1, n+1):
        for i in range(1, n+1):
            println(i, 'x', j, '=', i*j, file=sys.stdout)
        println(file=sys.stdout)
```
따라서, 변환 경로가 더 깁니다.
`(1) print` → `(2) print >> file`
vs.
`(1) print` → `(2) println()` → `(3) println(file=...)`

**참고:** `file` 인자를 컴파일 시점에 `sys.stdout`으로 기본 설정하는 것은 잘못된 것입니다. 호출자가 `sys.stdout`에 할당한 후 파일을 지정하지 않고 `tables()`를 사용하면 제대로 작동하지 않기 때문입니다. 이는 흔한 문제이며 (`println()` 함수에서도 발생할 수 있습니다). 지금까지의 표준 해결책은 다음과 같습니다.

```python
def tables(n, file=None):
    if file is None:
        file = sys.stdout
    for j in range(1, n+1):
        for i in range(1, n+1):
            print >> file, i, 'x', j, '=', i*j
        print >> file
```
저는 구현에 기능을 추가했는데 (`println()`에도 권장), `file` 인자가 `None`이면 `sys.stdout`이 자동으로 사용됩니다. 따라서,
`print >> None, foo bar` (또는 `x`의 값이 `None`인 변수 `x`를 사용하는 `print >> x`)는 `print foo, bar`와 같은 의미입니다. `tables()` 함수는 다음과 같이 작성될 수 있습니다.

```python
def tables(n, file=None):
    for j in range(1, n+1):
        for i in range(1, n+1):
            print >> file, i, 'x', j, '=', i*j
        print >> file
```

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.