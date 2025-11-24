---
title: "[Final] PEP 482 - Literature Overview for Type Hints"
excerpt: "Python Enhancement Proposal 482: 'Literature Overview for Type Hints'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/482/
toc: true
toc_sticky: true
date: 2025-09-26 22:27:40+0900
last_modified_at: 2025-09-26 22:27:40+0900
published: true
---
> **원문 링크:** [PEP 482 - Literature Overview for Type Hints](https://peps.python.org/pep-0482/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 08-Jan-2015

PEP 482 – 타입 힌트에 대한 문헌 개요

## 초록 (Abstract)
이 PEP는 타입 힌트 (Type Hinting)와 관련된 세 가지 PEP 중 하나입니다. 이 문서 (PEP 482)는 관련 연구에 대한 문헌 개요를 제공합니다. 주요 사양은 PEP 484입니다.

## Python의 기존 접근 방식 (Existing Approaches for Python)

### mypy
(이 섹션은 mypy가 본질적으로 우리가 제안하는 내용과 동일하기 때문에 아직 미완성된 내용입니다.)

### Reticulated Python
Michael Vitousek의 Reticulated Python은 Python의 점진적 타이핑 (Gradual Typing)에 대한 약간 다른 접근 방식의 예시입니다. 이는 Vitousek이 Jeremy Siek 및 Jim Baker (Jython으로 유명한)와 함께 작성한 실제 학술 논문에서 설명됩니다.

### PyCharm
JetBrains의 PyCharm은 약 4년 동안 타입을 지정하고 검사하는 방법을 제공해왔습니다. PyCharm이 제안하는 타입 시스템은 코드에서 타입 힌트를 사용한 많은 사용자의 피드백을 기반으로 단순한 클래스 타입에서 튜플 타입 (tuple types), 제네릭 타입 (generic types), 함수 타입 (function types) 등으로 발전했습니다.

### 기타 (Others)
TBD: pyflakes, pylint, numpy, Argument Clinic, pytypedecl, numba, obiwan에 대한 섹션을 추가해야 합니다.

## 다른 언어의 기존 접근 방식 (Existing Approaches in Other Languages)

### ActionScript
ActionScript는 클래스 기반의 단일 상속 객체 지향 (class-based, single inheritance, object-oriented) ECMAScript의 상위 집합입니다. 인터페이스와 강력한 런타임 검사 정적 타이핑 (strong runtime-checked static typing)을 지원합니다. 컴파일 시 타입 불일치가 컴파일 타임에 보고되는 "엄격한 방언 (strict dialect)"을 지원합니다.

**타입이 있는 예시 코드:**
```actionscript
package {
    import flash.events.Event;

    public class BounceEvent extends Event {
        public static const BOUNCE:String = "bounce";

        private var _side:String = "none";

        public function get side():String {
            return _side;
        }

        public function BounceEvent(type:String, side:String){
            super(type, true);
            _side = side;
        }

        public override function clone():Event {
            return new BounceEvent(type, _side);
        }
    }
}
```

### Dart
Dart는 C 스타일 구문을 가진 클래스 기반의 단일 상속 객체 지향 언어입니다. 인터페이스, 추상 클래스 (abstract classes), Reified Generics, 그리고 선택적 타이핑 (optional typing)을 지원합니다.

타입은 가능한 경우 추론됩니다. 런타임은 두 가지 실행 모드를 구분합니다: 개발을 위한 검사 모드 (checked mode) (런타임에 타입 오류를 포착)와 속도 실행을 권장하는 프로덕션 모드 (production mode) (타입 및 assert 무시).

**타입이 있는 예시 코드:**
```dart
class Point {
    final num x, y;
    Point(this.x, this.y);

    num distanceTo(Point other) {
        var dx = x - other.x;
        var dy = y - other.y;
        return math.sqrt(dx * dx + dy * dy);
    }
}
```

### Hack
Hack은 PHP와 원활하게 상호 운용되는 프로그래밍 언어입니다. 옵트인 정적 타입 검사 (opt-in static type checking), 타입 별칭 (type aliasing), 제네릭 (generics), nullable 타입 (nullable types), 그리고 람다 (lambdas)를 제공합니다.

**타입이 있는 예시 코드:**
```php
<?hh
class MyClass {
    private ?string $x = null;

    public function alpha(): int {
        return 1;
    }

    public function beta(): string {
        return 'hi test';
    }
}

function f(MyClass $my_inst): string {
    // Will generate a hh_client error
    return $my_inst->alpha();
}
```

### TypeScript
TypeScript는 JavaScript의 Typed Supersets로, 언어에 인터페이스, 클래스, 믹스인 (mixins) 및 모듈을 추가합니다.

타입 검사는 덕 타이핑 (duck typed) 방식으로 이루어집니다. 여러 유효한 함수 시그니처는 오버로드된 함수 선언을 제공함으로써 지정됩니다. 함수와 클래스는 제네릭을 타입 매개변수화 (type parameterization)로 사용할 수 있습니다. 인터페이스는 선택적 필드를 가질 수 있습니다. 인터페이스는 배열 및 딕셔너리 타입을 지정할 수 있습니다. 클래스는 인수를 필드로 암시적으로 추가하는 생성자를 가질 수 있습니다. 클래스는 정적 필드를 가질 수 있습니다. 클래스는 private 필드를 가질 수 있습니다. 클래스는 필드에 대한 getter/setter (property와 유사)를 가질 수 있습니다. 타입은 추론됩니다.

**타입이 있는 예시 코드:**
```typescript
interface Drivable {
    start(): void;
    drive(distance: number): boolean;
    getPosition(): number;
}

class Car implements Drivable {
    private _isRunning: boolean;
    private _distanceFromStart: number;

    constructor() {
        this._isRunning = false;
        this._distanceFromStart = 0;
    }

    public start() {
        this._isRunning = true;
    }

    public drive(distance: number): boolean {
        if (this._isRunning) {
            this._distanceFromStart += distance;
            return true;
        }
        return false;
    }

    public getPosition(): number {
        return this._distanceFromStart;
    }
}
```

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.