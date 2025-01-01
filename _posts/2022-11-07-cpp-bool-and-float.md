---
title: "[C++] 변수 타입 : 불리언과 부동소수점"
excerpt: "다양한 변수 타입 중 '불리언'과 '부동소수점'에 대해 알아보기"

categories:
  - C/C++
tags:
  - [C/C++, C++, Visual Studio, variable, bool, float]

permalink: /cpp/bool-and-float/

toc: true
toc_sticky: true

date: 2022-11-07 16:57:13+0900
last_modified_at: 2022-11-10 22:57:14+0900
---


## 👻 불리언(Boolean)
**참/거짓**을 나타내는 변수 타입. _1바이트 정수_ 에 불과하고 참은 1, 거짓은 0으로 저장된다. 어셈블리어에서 bool이라는 것은 없다.   
bool을 사용해서 true로 세팅해도 출력해보면 **1**로 나오게 된다.

```c++
bool isHighLevel = true;
bool isPlayer = true;
bool isMale = false;
```

> 1과 0으로도 표현이 가능하지만 우리가 봤을 때 무슨 의미인 지 한 눈에 알아보기가 힘들다. 고로 **가독성 문제** 때문에 따로 타입을 지정해 둔 것이라고 볼 수 있다.

***

## 👻 실수(부동소수점)
_3.14_ 와 같은 소수를 포함한 숫자를 나타내는 말이다. **부동소수점**이라고도 부르며 ``` float ```와 ``` double ```이 있다.

```c++
float attackSpeed = 0.639f; // 4바이트
double attackSpeed2 = 123.4123; // 8바이트
```

사실상 실수는 비트로 가장 표현하기 힘든 수다. 이진수로 변환해야 하는데 한 눈에 변환이 잘 되지 않는데, 이러한 변환을 쉽게 하기 위해 부동소수점 방식을 사용하게 된다.   

> 💡 부동소수점이란?   
不動이 아닌 浮動을 사용한다. 움직이지 않는다는 뜻이 아닌 흐르듯 움직인다는 뜻이다.('뜰 부'자를 사용한다) 👉 소수점이 마음대로 흐르듯 움직인다는 뜻이라고 생각할 수 있다.

- 실수를 비트화 시키는 법   
ex) 3.14를 비트로 나타내면?   
1. 정규화 = 0.3141592 * 10
2. 3141592 (유효숫자)와 1 (지수)로 나눈다.   
<br>
**float**는 ``` 부호(1) 지수(8) 유효숫자(23) = 32비트 = 4바이트 ```로 표현하고,   
**double**은 ``` 부호(1) 지수(11) 유효숫자(52) = 64비트 = 8바이트 ```로 표현한다.   

```
ex) -3.375라는 값을 저장   

1) 2진수로 변환   
(3) + (0.375) = 0b11 + 0b0.011 = 0b11.011   
0.375 = (0.5 * 0) + (0.25 * 1) + (0.125 * 1) = 0b0.011   

2) 정규화 0b1.1011 * 2^1   
-> 1(부호) 1(지수) 1011(유효숫자)   
단 지수는 unsigned byte라고 가정하고 숫자+127 만들어줌   

결과 : 0b 1 10000000 1011000'0000'0000'0000'0000
```

> 💡 디버그 중, 조사식에서 해당 메모리 주소를 알고 싶을 때 : ``` & ```를 앞에 붙인다.   

![Alt Text](/assets/images/posts_img/basics/cpp/variable/bool-and-float/memory.PNG)   

> 💡 메모리 창 여는 법   
``` 디버그 👉 창 👉 메모리 ``` 혹은 단축키 ``` Ctrl+Alt+M ```

위의 이미지에서, attackSpeed의 주소값을 메모리에 입력해서 찾아보면 제일 앞 4바이트에 값이 나온다. 👉 **00 00 58 c0**   
현재 _리틀 엔디언 방식_ 으로 저장되어 있으므로 뒤집어서 보면 **c8 58 00 00**이라는 값이 나오고, 이 값을 계산기를 이용하여 16진수 값에 넣으면 4바이트 비트값이 나오게 된다.   

프로그래밍할 때 부동소수점은 항상 **근사값**이라는 것을 기억해야 한다.   
``` 1/3 = 0.3333333333333333... ```인 것처럼 가장 가까운 값을 찾아주는거지 정확한 값을 찾아주는 건 아니다.   
특히 수가 커질수록 오차 범위도 매우 커지게 되니 실수 2개를 ``` == ```으로 비교하는 것은 **지양**해야한다.

***

## 👻 글을 마치며
이번 시간에는 변수 타입 중, 참/거짓을 나타내는 불리언(Boolean)과 실수(부동소수점)에 대해 공부해보았다. 실수를 이진수로 변환하는 과정이 굉장히 어렵게 느껴졌다. 공부하면서 실수에 대해 더욱 자세히 알 수 있었고 정확한 값이 아닌 근사값이라 수학에 대입했을 때 중요한 부분을 차지한다는 것을 대략적으로 알 수 있었다. (예를 들어 대소 관계를 따질 때 정수처럼 값이 딱 떨어지지 않기 때문에 판단하기 모호할 수 있다는 점) 항상 경계하고 생각해야 할 부분이라는 걸 명심하게 되었다.

***

_[소스코드 보러가기](https://github.com/choi-dan-di/study_cpp/tree/main/variable/bool-and-float)_

***

_출처_   
_[인프런 Rookies님 강의](https://inf.run/bje8)_   